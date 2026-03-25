from fastapi import FastAPI, APIRouter, HTTPException, Depends, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone
import jwt
import bcrypt
import resend

# Stripe Integration
from emergentintegrations.payments.stripe.checkout import StripeCheckout, CheckoutSessionResponse, CheckoutStatusResponse, CheckoutSessionRequest

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Stripe setup
STRIPE_API_KEY = os.environ.get('STRIPE_API_KEY', 'sk_test_emergent')

# Resend setup
RESEND_API_KEY = os.environ.get('RESEND_API_KEY', '')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
RECIPIENT_EMAIL = "amaurydebarros1607@gmail.com"
if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

# JWT Config
JWT_SECRET = os.environ.get('JWT_SECRET', 'assk-studio-secret-key-2024')
JWT_ALGORITHM = 'HS256'

# Create the main app
app = FastAPI()

# Create routers
api_router = APIRouter(prefix="/api")
security = HTTPBearer()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ==================== MODELS ====================

class AdminCreate(BaseModel):
    email: EmailStr
    password: str
    name: str

class AdminLogin(BaseModel):
    email: EmailStr
    password: str

class AdminResponse(BaseModel):
    id: str
    email: str
    name: str
    created_at: str

class ProductCreate(BaseModel):
    name: str
    description: str
    price: float
    category: str
    image_url: str
    stock: int = 10
    active: bool = True

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    category: Optional[str] = None
    image_url: Optional[str] = None
    stock: Optional[int] = None
    active: Optional[bool] = None

class ProductResponse(BaseModel):
    id: str
    name: str
    description: str
    price: float
    category: str
    image_url: str
    stock: int
    active: bool
    created_at: str

class PortfolioCreate(BaseModel):
    title: str
    description: str
    category: str
    image_url: str
    link: Optional[str] = None

class PortfolioUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    image_url: Optional[str] = None
    link: Optional[str] = None

class PortfolioResponse(BaseModel):
    id: str
    title: str
    description: str
    category: str
    image_url: str
    link: Optional[str]
    created_at: str

class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

class ContactResponse(BaseModel):
    id: str
    name: str
    email: str
    subject: str
    message: str
    read: bool
    created_at: str

class CartItem(BaseModel):
    product_id: str
    quantity: int

class CheckoutRequest(BaseModel):
    items: List[CartItem]
    customer_email: EmailStr
    customer_name: str
    origin_url: str

class OrderResponse(BaseModel):
    id: str
    customer_email: str
    customer_name: str
    items: List[Dict[str, Any]]
    total: float
    status: str
    payment_status: str
    session_id: Optional[str]
    created_at: str

# ==================== AUTH HELPERS ====================

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

def create_token(admin_id: str, email: str) -> str:
    payload = {
        'admin_id': admin_id,
        'email': email,
        'exp': datetime.now(timezone.utc).timestamp() + 86400 * 7  # 7 days
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

async def get_current_admin(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        token = credentials.credentials
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        admin = await db.admins.find_one({'id': payload['admin_id']}, {'_id': 0})
        if not admin:
            raise HTTPException(status_code=401, detail="Admin not found")
        return admin
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

# ==================== ADMIN ROUTES ====================

@api_router.post("/admin/register", response_model=Dict[str, Any])
async def register_admin(data: AdminCreate):
    existing = await db.admins.find_one({'email': data.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    admin_id = str(uuid.uuid4())
    admin_doc = {
        'id': admin_id,
        'email': data.email,
        'name': data.name,
        'password': hash_password(data.password),
        'created_at': datetime.now(timezone.utc).isoformat()
    }
    await db.admins.insert_one(admin_doc)
    token = create_token(admin_id, data.email)
    return {
        'token': token,
        'admin': {
            'id': admin_id,
            'email': data.email,
            'name': data.name
        }
    }

@api_router.post("/admin/login", response_model=Dict[str, Any])
async def login_admin(data: AdminLogin):
    admin = await db.admins.find_one({'email': data.email}, {'_id': 0})
    if not admin or not verify_password(data.password, admin['password']):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_token(admin['id'], admin['email'])
    return {
        'token': token,
        'admin': {
            'id': admin['id'],
            'email': admin['email'],
            'name': admin['name']
        }
    }

@api_router.get("/admin/me", response_model=AdminResponse)
async def get_current_admin_info(admin = Depends(get_current_admin)):
    return AdminResponse(
        id=admin['id'],
        email=admin['email'],
        name=admin['name'],
        created_at=admin['created_at']
    )

# ==================== PRODUCTS ROUTES ====================

@api_router.get("/products", response_model=List[ProductResponse])
async def get_products(active_only: bool = True):
    query = {'active': True} if active_only else {}
    products = await db.products.find(query, {'_id': 0}).to_list(100)
    return [ProductResponse(**p) for p in products]

@api_router.get("/products/{product_id}", response_model=ProductResponse)
async def get_product(product_id: str):
    product = await db.products.find_one({'id': product_id}, {'_id': 0})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return ProductResponse(**product)

@api_router.post("/products", response_model=ProductResponse)
async def create_product(data: ProductCreate, admin = Depends(get_current_admin)):
    product_id = str(uuid.uuid4())
    product_doc = {
        'id': product_id,
        **data.model_dump(),
        'created_at': datetime.now(timezone.utc).isoformat()
    }
    await db.products.insert_one(product_doc)
    return ProductResponse(**product_doc)

@api_router.put("/products/{product_id}", response_model=ProductResponse)
async def update_product(product_id: str, data: ProductUpdate, admin = Depends(get_current_admin)):
    update_data = {k: v for k, v in data.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No data to update")
    
    result = await db.products.update_one({'id': product_id}, {'$set': update_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    
    product = await db.products.find_one({'id': product_id}, {'_id': 0})
    return ProductResponse(**product)

@api_router.delete("/products/{product_id}")
async def delete_product(product_id: str, admin = Depends(get_current_admin)):
    result = await db.products.delete_one({'id': product_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"message": "Product deleted"}

# ==================== PORTFOLIO ROUTES ====================

@api_router.get("/portfolio", response_model=List[PortfolioResponse])
async def get_portfolio():
    items = await db.portfolio.find({}, {'_id': 0}).to_list(100)
    return [PortfolioResponse(**p) for p in items]

@api_router.get("/portfolio/{item_id}", response_model=PortfolioResponse)
async def get_portfolio_item(item_id: str):
    item = await db.portfolio.find_one({'id': item_id}, {'_id': 0})
    if not item:
        raise HTTPException(status_code=404, detail="Portfolio item not found")
    return PortfolioResponse(**item)

@api_router.post("/portfolio", response_model=PortfolioResponse)
async def create_portfolio_item(data: PortfolioCreate, admin = Depends(get_current_admin)):
    item_id = str(uuid.uuid4())
    item_doc = {
        'id': item_id,
        **data.model_dump(),
        'created_at': datetime.now(timezone.utc).isoformat()
    }
    await db.portfolio.insert_one(item_doc)
    return PortfolioResponse(**item_doc)

@api_router.put("/portfolio/{item_id}", response_model=PortfolioResponse)
async def update_portfolio_item(item_id: str, data: PortfolioUpdate, admin = Depends(get_current_admin)):
    update_data = {k: v for k, v in data.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No data to update")
    
    result = await db.portfolio.update_one({'id': item_id}, {'$set': update_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Portfolio item not found")
    
    item = await db.portfolio.find_one({'id': item_id}, {'_id': 0})
    return PortfolioResponse(**item)

@api_router.delete("/portfolio/{item_id}")
async def delete_portfolio_item(item_id: str, admin = Depends(get_current_admin)):
    result = await db.portfolio.delete_one({'id': item_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Portfolio item not found")
    return {"message": "Portfolio item deleted"}

# ==================== CONTACT ROUTES ====================

@api_router.post("/contact", response_model=ContactResponse)
async def create_contact(data: ContactCreate):
    contact_id = str(uuid.uuid4())
    contact_doc = {
        'id': contact_id,
        **data.model_dump(),
        'read': False,
        'created_at': datetime.now(timezone.utc).isoformat()
    }
    await db.contacts.insert_one(contact_doc)
    
    # Send email notification
    if RESEND_API_KEY:
        try:
            params = {
                "from": SENDER_EMAIL,
                "to": [RECIPIENT_EMAIL],
                "subject": f"[ASSK Studio] Nouveau message: {data.subject}",
                "html": f"""
                <h2>Nouveau message de contact</h2>
                <p><strong>Nom:</strong> {data.name}</p>
                <p><strong>Email:</strong> {data.email}</p>
                <p><strong>Sujet:</strong> {data.subject}</p>
                <p><strong>Message:</strong></p>
                <p>{data.message}</p>
                """
            }
            await asyncio.to_thread(resend.Emails.send, params)
            logger.info(f"Email sent for contact {contact_id}")
        except Exception as e:
            logger.error(f"Failed to send email: {str(e)}")
    
    return ContactResponse(**contact_doc)

@api_router.get("/contacts", response_model=List[ContactResponse])
async def get_contacts(admin = Depends(get_current_admin)):
    contacts = await db.contacts.find({}, {'_id': 0}).sort('created_at', -1).to_list(100)
    return [ContactResponse(**c) for c in contacts]

@api_router.put("/contacts/{contact_id}/read")
async def mark_contact_read(contact_id: str, admin = Depends(get_current_admin)):
    result = await db.contacts.update_one({'id': contact_id}, {'$set': {'read': True}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Contact not found")
    return {"message": "Contact marked as read"}

@api_router.delete("/contacts/{contact_id}")
async def delete_contact(contact_id: str, admin = Depends(get_current_admin)):
    result = await db.contacts.delete_one({'id': contact_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Contact not found")
    return {"message": "Contact deleted"}

# ==================== ORDERS & CHECKOUT ROUTES ====================

@api_router.post("/checkout/session")
async def create_checkout_session(data: CheckoutRequest, request: Request):
    # Calculate total from products
    total = 0.0
    items_details = []
    
    for item in data.items:
        product = await db.products.find_one({'id': item.product_id}, {'_id': 0})
        if not product:
            raise HTTPException(status_code=404, detail=f"Product {item.product_id} not found")
        if product['stock'] < item.quantity:
            raise HTTPException(status_code=400, detail=f"Insufficient stock for {product['name']}")
        
        item_total = product['price'] * item.quantity
        total += item_total
        items_details.append({
            'product_id': item.product_id,
            'name': product['name'],
            'price': product['price'],
            'quantity': item.quantity,
            'subtotal': item_total
        })
    
    # Create order
    order_id = str(uuid.uuid4())
    order_doc = {
        'id': order_id,
        'customer_email': data.customer_email,
        'customer_name': data.customer_name,
        'items': items_details,
        'total': total,
        'status': 'pending',
        'payment_status': 'initiated',
        'session_id': None,
        'created_at': datetime.now(timezone.utc).isoformat()
    }
    
    # Create Stripe checkout session
    host_url = str(request.base_url).rstrip('/')
    webhook_url = f"{host_url}/api/webhook/stripe"
    success_url = f"{data.origin_url}/checkout/success?session_id={{CHECKOUT_SESSION_ID}}"
    cancel_url = f"{data.origin_url}/shop"
    
    stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=webhook_url)
    
    checkout_request = CheckoutSessionRequest(
        amount=total,
        currency='eur',
        success_url=success_url,
        cancel_url=cancel_url,
        metadata={
            'order_id': order_id,
            'customer_email': data.customer_email
        }
    )
    
    session: CheckoutSessionResponse = await stripe_checkout.create_checkout_session(checkout_request)
    
    # Update order with session ID
    order_doc['session_id'] = session.session_id
    await db.orders.insert_one(order_doc)
    
    # Create payment transaction record
    payment_doc = {
        'id': str(uuid.uuid4()),
        'order_id': order_id,
        'session_id': session.session_id,
        'amount': total,
        'currency': 'eur',
        'customer_email': data.customer_email,
        'payment_status': 'initiated',
        'created_at': datetime.now(timezone.utc).isoformat()
    }
    await db.payment_transactions.insert_one(payment_doc)
    
    return {'url': session.url, 'session_id': session.session_id, 'order_id': order_id}

@api_router.get("/checkout/status/{session_id}")
async def get_checkout_status(session_id: str, request: Request):
    host_url = str(request.base_url).rstrip('/')
    webhook_url = f"{host_url}/api/webhook/stripe"
    
    stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=webhook_url)
    status: CheckoutStatusResponse = await stripe_checkout.get_checkout_status(session_id)
    
    # Update order and payment transaction
    new_status = 'paid' if status.payment_status == 'paid' else status.payment_status
    
    order = await db.orders.find_one({'session_id': session_id}, {'_id': 0})
    if order and order['payment_status'] != 'paid' and new_status == 'paid':
        # Update order
        await db.orders.update_one(
            {'session_id': session_id},
            {'$set': {'payment_status': 'paid', 'status': 'confirmed'}}
        )
        # Update payment transaction
        await db.payment_transactions.update_one(
            {'session_id': session_id},
            {'$set': {'payment_status': 'paid'}}
        )
        # Decrease stock
        for item in order['items']:
            await db.products.update_one(
                {'id': item['product_id']},
                {'$inc': {'stock': -item['quantity']}}
            )
    
    return {
        'status': status.status,
        'payment_status': status.payment_status,
        'amount_total': status.amount_total,
        'currency': status.currency
    }

@api_router.post("/webhook/stripe")
async def stripe_webhook(request: Request):
    body = await request.body()
    signature = request.headers.get("Stripe-Signature")
    
    host_url = str(request.base_url).rstrip('/')
    webhook_url = f"{host_url}/api/webhook/stripe"
    
    stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=webhook_url)
    
    try:
        webhook_response = await stripe_checkout.handle_webhook(body, signature)
        
        if webhook_response.payment_status == 'paid':
            session_id = webhook_response.session_id
            order = await db.orders.find_one({'session_id': session_id}, {'_id': 0})
            
            if order and order['payment_status'] != 'paid':
                await db.orders.update_one(
                    {'session_id': session_id},
                    {'$set': {'payment_status': 'paid', 'status': 'confirmed'}}
                )
                await db.payment_transactions.update_one(
                    {'session_id': session_id},
                    {'$set': {'payment_status': 'paid'}}
                )
                for item in order['items']:
                    await db.products.update_one(
                        {'id': item['product_id']},
                        {'$inc': {'stock': -item['quantity']}}
                    )
        
        return {"status": "success"}
    except Exception as e:
        logger.error(f"Webhook error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

# ==================== ORDERS ADMIN ROUTES ====================

@api_router.get("/orders", response_model=List[OrderResponse])
async def get_orders(admin = Depends(get_current_admin)):
    orders = await db.orders.find({}, {'_id': 0}).sort('created_at', -1).to_list(100)
    return [OrderResponse(**o) for o in orders]

@api_router.get("/orders/{order_id}", response_model=OrderResponse)
async def get_order(order_id: str, admin = Depends(get_current_admin)):
    order = await db.orders.find_one({'id': order_id}, {'_id': 0})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return OrderResponse(**order)

class OrderStatusUpdate(BaseModel):
    status: str

@api_router.put("/orders/{order_id}/status")
async def update_order_status(order_id: str, data: OrderStatusUpdate, admin = Depends(get_current_admin)):
    result = await db.orders.update_one({'id': order_id}, {'$set': {'status': data.status}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Order not found")
    return {"message": "Order status updated"}

# ==================== STATS ROUTES ====================

@api_router.get("/stats")
async def get_stats(admin = Depends(get_current_admin)):
    total_products = await db.products.count_documents({})
    total_orders = await db.orders.count_documents({})
    total_portfolio = await db.portfolio.count_documents({})
    unread_contacts = await db.contacts.count_documents({'read': False})
    
    # Revenue calculation
    paid_orders = await db.orders.find({'payment_status': 'paid'}, {'_id': 0, 'total': 1}).to_list(1000)
    total_revenue = sum(o['total'] for o in paid_orders)
    
    return {
        'total_products': total_products,
        'total_orders': total_orders,
        'total_portfolio': total_portfolio,
        'unread_contacts': unread_contacts,
        'total_revenue': total_revenue
    }

# ==================== SEED DATA ====================

@api_router.post("/seed")
async def seed_data():
    # Check if already seeded
    existing = await db.products.count_documents({})
    if existing > 0:
        return {"message": "Data already seeded"}
    
    # Seed products
    products = [
        {
            'id': str(uuid.uuid4()),
            'name': 'Art Toy "Blue Edition"',
            'description': 'Figurine collector édition limitée 15cm, résine haute qualité',
            'price': 65.00,
            'category': 'toys',
            'image_url': 'https://images.unsplash.com/photo-1596708688812-32b0edc764e5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzN8MHwxfHNlYXJjaHwxNXx8ZGVzaWduZXIlMjB0b3l8ZW58MHx8fHwxNzA4NjE0MTc4fDA&ixlib=rb-4.0.3&q=85',
            'stock': 20,
            'active': True,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'Posters & Prints A3',
            'description': 'Impression haute qualité format A3, papier 250g mat',
            'price': 25.00,
            'category': 'prints',
            'image_url': 'https://images.unsplash.com/photo-1661570323628-06de800328c7?crop=entropy&cs=srgb&fm=jpg&q=85',
            'stock': 50,
            'active': True,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'T-Shirt "Studio Core"',
            'description': 'T-shirt 100% coton bio, sérigraphie artisanale',
            'price': 35.00,
            'category': 'clothing',
            'image_url': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?crop=entropy&cs=srgb&fm=jpg&q=85',
            'stock': 30,
            'active': True,
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'name': 'Hoodie Brodé "Assk"',
            'description': 'Hoodie premium brodé, 80% coton 20% polyester',
            'price': 75.00,
            'category': 'clothing',
            'image_url': 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?crop=entropy&cs=srgb&fm=jpg&q=85',
            'stock': 15,
            'active': True,
            'created_at': datetime.now(timezone.utc).isoformat()
        }
    ]
    await db.products.insert_many(products)
    
    # Seed portfolio
    portfolio_items = [
        {
            'id': str(uuid.uuid4()),
            'title': 'COACHELLA César 2024',
            'description': 'Identité visuelle soirée Coachella',
            'category': '3D',
            'image_url': 'https://cdn.myportfolio.com/15e484f1-e9ad-4dc9-8c4b-cd378379b66e/5aa6967f-7966-4a4d-9fe2-bbc35bd5b5ef_car_202x158.png',
            'link': 'https://amdbrs.com/coachella-2',
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'title': 'LIBERTY VAN',
            'description': 'Location de Vans dans l\'Allier 03',
            'category': 'Graphisme',
            'image_url': 'https://cdn.myportfolio.com/15e484f1-e9ad-4dc9-8c4b-cd378379b66e/904c84f8-385a-430e-be45-62c43fee432f_car_202x158.png',
            'link': 'https://amdbrs.com/liberty-van',
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'title': 'CLUB FOOTBALL LAFOREST',
            'description': 'Logo et t-shirts pour le club',
            'category': 'Graphisme',
            'image_url': 'https://cdn.myportfolio.com/15e484f1-e9ad-4dc9-8c4b-cd378379b66e/441ef420-a492-4f5f-a672-d1c2974ac4b3_car_202x158.jpg',
            'link': 'https://amdbrs.com/club-football-laforest',
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'title': 'IRIS',
            'description': 'Identité visuelle marque prêt-à-porter',
            'category': 'Graphisme',
            'image_url': 'https://cdn.myportfolio.com/15e484f1-e9ad-4dc9-8c4b-cd378379b66e/a28abccd-9456-4ec6-b19f-76b7565554f7_car_202x158.png',
            'link': 'https://amdbrs.com/iris',
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'title': 'KATES AGENCY',
            'description': 'Logo agence au pair aux États-Unis',
            'category': 'Graphisme',
            'image_url': 'https://cdn.myportfolio.com/15e484f1-e9ad-4dc9-8c4b-cd378379b66e/b1fa2401-ea74-4d91-898b-b0c7d6084cfe_rwc_385x125x1146x896x1146.png',
            'link': 'https://amdbrs.com/kates-agency',
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'title': 'BLENDED WORLDS',
            'description': 'Alliance numérique et réel',
            'category': '3D',
            'image_url': 'https://cdn.myportfolio.com/15e484f1-e9ad-4dc9-8c4b-cd378379b66e/50797ea8-e6b3-45b8-978c-7be51f47d50e_rwc_331x0x3837x3000x3837.png',
            'link': 'https://amdbrs.com/blended-worlds',
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'title': 'MANGA POSTERS',
            'description': 'Posters de personnages manga',
            'category': 'Graphisme',
            'image_url': 'https://cdn.myportfolio.com/15e484f1-e9ad-4dc9-8c4b-cd378379b66e/4047834e-e027-4e9c-858c-b288c54f8d6d_car_202x158.png',
            'link': 'https://amdbrs.com/brook-one-piece',
            'created_at': datetime.now(timezone.utc).isoformat()
        }
    ]
    await db.portfolio.insert_many(portfolio_items)
    
    return {"message": "Data seeded successfully", "products": len(products), "portfolio": len(portfolio_items)}

# Root endpoint
@api_router.get("/")
async def root():
    return {"message": "ASSK Studio API", "version": "1.0.0"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
