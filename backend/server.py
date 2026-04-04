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

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

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

# ==================== FILE UPLOAD ====================

import base64
from pathlib import Path

UPLOAD_DIR = ROOT_DIR / 'uploads'
UPLOAD_DIR.mkdir(exist_ok=True)

class ImageUpload(BaseModel):
    filename: str
    data: str  # Base64 encoded image

@api_router.post("/upload/image")
async def upload_image(upload: ImageUpload, admin = Depends(get_current_admin)):
    try:
        # Decode base64 image
        image_data = base64.b64decode(upload.data.split(',')[1] if ',' in upload.data else upload.data)
        
        # Generate unique filename
        ext = Path(upload.filename).suffix or '.png'
        unique_filename = f"{uuid.uuid4()}{ext}"
        file_path = UPLOAD_DIR / unique_filename
        
        # Save file
        with open(file_path, 'wb') as f:
            f.write(image_data)
        
        # Return URL
        return {"url": f"/api/uploads/{unique_filename}", "filename": unique_filename}
    except Exception as e:
        logger.error(f"Upload error: {str(e)}")
        raise HTTPException(status_code=400, detail="Failed to upload image")

from fastapi.responses import FileResponse

@api_router.get("/uploads/{filename}")
async def get_upload(filename: str):
    file_path = UPLOAD_DIR / filename
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found")
    return FileResponse(file_path)

# ==================== ADMIN ROUTES ====================

@api_router.post("/admin/register", response_model=Dict[str, Any])
async def register_admin(data: AdminCreate):
    # Registration disabled for security
    raise HTTPException(status_code=403, detail="Registration is disabled. Please contact the administrator.")

@api_router.post("/admin/login", response_model=Dict[str, Any])
async def login_admin(data: AdminLogin):
    # Create default admin if none exists
    admin_count = await db.admins.count_documents({})
    if admin_count == 0:
        default_admin = {
            'id': str(uuid.uuid4()),
            'email': 'admin@assk.studio',
            'name': 'Admin ASSK',
            'password': hash_password('Assk2024!'),
            'created_at': datetime.now(timezone.utc).isoformat()
        }
        await db.admins.insert_one(default_admin)
        logger.info("Default admin created: admin@assk.studio / Assk2024!")
        
        # If trying to login with default credentials, return success
        if data.email == 'admin@assk.studio' and data.password == 'Assk2024!':
            token = create_token(default_admin['id'], default_admin['email'])
            return {
                'token': token,
                'admin': {
                    'id': default_admin['id'],
                    'email': default_admin['email'],
                    'name': default_admin['name']
                }
            }
    
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

# ==================== PORTFOLIO ROUTES ====================

@api_router.get("/portfolio", response_model=List[PortfolioResponse])
async def get_portfolio():
    items = await db.portfolio.find({}, {'_id': 0}).sort('created_at', -1).to_list(100)
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

# ==================== STATS ROUTES ====================

@api_router.get("/stats")
async def get_stats(admin = Depends(get_current_admin)):
    total_portfolio = await db.portfolio.count_documents({})
    unread_contacts = await db.contacts.count_documents({'read': False})
    
    return {
        'total_portfolio': total_portfolio,
        'unread_contacts': unread_contacts
    }

# ==================== SEED DATA ====================

@api_router.post("/seed")
async def seed_data():
    # Check if already seeded
    existing = await db.portfolio.count_documents({})
    if existing > 0:
        return {"message": "Data already seeded"}
    
    # Seed portfolio items
    portfolio_items = [
        {
            'id': str(uuid.uuid4()),
            'title': 'COACHELLA César 2024',
            'description': 'Identité visuelle soirée Coachella',
            'category': '3D',
            'image_url': 'https://cdn.myportfolio.com/15e484f1-e9ad-4dc9-8c4b-cd378379b66e/5aa6967f-7966-4a4d-9fe2-bbc35bd5b5ef.png?h=6d82cee841e694f77bc94a983e97a770',
            'link': 'https://amdbrs.com/coachella-2',
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'title': 'LIBERTY VAN',
            'description': 'Location de Vans dans l\'Allier 03',
            'category': 'Graphisme',
            'image_url': 'https://cdn.myportfolio.com/15e484f1-e9ad-4dc9-8c4b-cd378379b66e/904c84f8-385a-430e-be45-62c43fee432f.png?h=5c7646442ab09e86e84b4ef717794f55',
            'link': 'https://amdbrs.com/liberty-van',
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'title': 'CLUB FOOTBALL LAFOREST',
            'description': 'Logo et t-shirts pour le club',
            'category': 'Graphisme',
            'image_url': 'https://cdn.myportfolio.com/15e484f1-e9ad-4dc9-8c4b-cd378379b66e/441ef420-a492-4f5f-a672-d1c2974ac4b3.jpg?h=d5aee46ebbf49ee81d4d2935aee9daa2',
            'link': 'https://amdbrs.com/club-football-laforest',
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'title': 'IRIS',
            'description': 'Identité visuelle marque prêt-à-porter',
            'category': 'Graphisme',
            'image_url': 'https://cdn.myportfolio.com/15e484f1-e9ad-4dc9-8c4b-cd378379b66e/a28abccd-9456-4ec6-b19f-76b7565554f7.png?h=292e2a921b21180a35acac756fe5cdbb',
            'link': 'https://amdbrs.com/iris',
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'title': 'KATES AGENCY',
            'description': 'Logo agence au pair aux États-Unis',
            'category': 'Graphisme',
            'image_url': 'https://cdn.myportfolio.com/15e484f1-e9ad-4dc9-8c4b-cd378379b66e/b1fa2401-ea74-4d91-898b-b0c7d6084cfe.png?h=5d9232a31656e6cb1b89b2d5d80aea6f',
            'link': 'https://amdbrs.com/kates-agency',
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'title': 'BLENDED WORLDS',
            'description': 'Alliance numérique et réel',
            'category': '3D',
            'image_url': 'https://cdn.myportfolio.com/15e484f1-e9ad-4dc9-8c4b-cd378379b66e/50797ea8-e6b3-45b8-978c-7be51f47d50e.png?h=45508908a078ccb3ac83c5128a33e8ea',
            'link': 'https://amdbrs.com/blended-worlds',
            'created_at': datetime.now(timezone.utc).isoformat()
        },
        {
            'id': str(uuid.uuid4()),
            'title': 'MANGA POSTERS',
            'description': 'Posters de personnages manga',
            'category': 'Graphisme',
            'image_url': 'https://cdn.myportfolio.com/15e484f1-e9ad-4dc9-8c4b-cd378379b66e/4047834e-e027-4e9c-858c-b288c54f8d6d.png?h=d6b58408df0b9477bec8fbda2bfd588f',
            'link': 'https://amdbrs.com/brook-one-piece',
            'created_at': datetime.now(timezone.utc).isoformat()
        }
    ]
    await db.portfolio.insert_many(portfolio_items)
    
    return {"message": "Data seeded successfully", "portfolio": len(portfolio_items)}

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
