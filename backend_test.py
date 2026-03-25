import requests
import sys
import json
from datetime import datetime

class AsskStudioAPITester:
    def __init__(self, base_url="https://leave-your-mark.preview.emergentagent.com"):
        self.base_url = base_url
        self.token = None
        self.tests_run = 0
        self.tests_passed = 0
        self.admin_id = None
        self.product_id = None
        self.portfolio_id = None
        self.contact_id = None
        self.order_id = None

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/api/{endpoint}"
        test_headers = {'Content-Type': 'application/json'}
        
        if self.token:
            test_headers['Authorization'] = f'Bearer {self.token}'
        
        if headers:
            test_headers.update(headers)

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=test_headers)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=test_headers)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=test_headers)
            elif method == 'DELETE':
                response = requests.delete(url, headers=test_headers)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    return True, response.json() if response.content else {}
                except:
                    return True, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_detail = response.json()
                    print(f"   Error: {error_detail}")
                except:
                    print(f"   Response: {response.text}")
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test root API endpoint"""
        return self.run_test("Root API", "GET", "", 200)

    def test_seed_data(self):
        """Test seeding initial data"""
        return self.run_test("Seed Data", "POST", "seed", 200)

    def test_admin_register(self):
        """Test admin registration"""
        admin_data = {
            "email": f"test_admin_{datetime.now().strftime('%H%M%S')}@test.com",
            "password": "TestPass123!",
            "name": "Test Admin"
        }
        success, response = self.run_test("Admin Register", "POST", "admin/register", 200, admin_data)
        if success and 'token' in response:
            self.token = response['token']
            self.admin_id = response['admin']['id']
            print(f"   Admin registered with ID: {self.admin_id}")
        return success

    def test_admin_login(self):
        """Test admin login with existing admin"""
        # First register an admin
        admin_data = {
            "email": f"login_test_{datetime.now().strftime('%H%M%S')}@test.com",
            "password": "TestPass123!",
            "name": "Login Test Admin"
        }
        reg_success, reg_response = self.run_test("Admin Register for Login", "POST", "admin/register", 200, admin_data)
        
        if reg_success:
            # Now test login
            login_data = {
                "email": admin_data["email"],
                "password": admin_data["password"]
            }
            success, response = self.run_test("Admin Login", "POST", "admin/login", 200, login_data)
            if success and 'token' in response:
                print(f"   Login successful with token")
            return success
        return False

    def test_admin_me(self):
        """Test getting current admin info"""
        if not self.token:
            print("❌ No token available for admin/me test")
            return False
        return self.run_test("Admin Me", "GET", "admin/me", 200)[0]

    def test_products_crud(self):
        """Test products CRUD operations"""
        # Test GET products (should work without auth)
        success, products = self.run_test("Get Products", "GET", "products", 200)
        if not success:
            return False

        # Test CREATE product (requires auth)
        if not self.token:
            print("❌ No token available for product creation")
            return False

        product_data = {
            "name": "Test Product",
            "description": "A test product for API testing",
            "price": 29.99,
            "category": "test",
            "image_url": "https://via.placeholder.com/300",
            "stock": 10,
            "active": True
        }
        success, response = self.run_test("Create Product", "POST", "products", 200, product_data)
        if success and 'id' in response:
            self.product_id = response['id']
            print(f"   Product created with ID: {self.product_id}")

            # Test GET single product
            success = self.run_test("Get Single Product", "GET", f"products/{self.product_id}", 200)[0]
            if not success:
                return False

            # Test UPDATE product
            update_data = {
                "name": "Updated Test Product",
                "price": 39.99
            }
            success = self.run_test("Update Product", "PUT", f"products/{self.product_id}", 200, update_data)[0]
            if not success:
                return False

            # Test DELETE product
            success = self.run_test("Delete Product", "DELETE", f"products/{self.product_id}", 200)[0]
            return success

        return False

    def test_portfolio_crud(self):
        """Test portfolio CRUD operations"""
        # Test GET portfolio (should work without auth)
        success, portfolio = self.run_test("Get Portfolio", "GET", "portfolio", 200)
        if not success:
            return False

        # Test CREATE portfolio item (requires auth)
        if not self.token:
            print("❌ No token available for portfolio creation")
            return False

        portfolio_data = {
            "title": "Test Portfolio Item",
            "description": "A test portfolio item",
            "category": "test",
            "image_url": "https://via.placeholder.com/300",
            "link": "https://example.com"
        }
        success, response = self.run_test("Create Portfolio Item", "POST", "portfolio", 200, portfolio_data)
        if success and 'id' in response:
            self.portfolio_id = response['id']
            print(f"   Portfolio item created with ID: {self.portfolio_id}")

            # Test GET single portfolio item
            success = self.run_test("Get Single Portfolio Item", "GET", f"portfolio/{self.portfolio_id}", 200)[0]
            if not success:
                return False

            # Test UPDATE portfolio item
            update_data = {
                "title": "Updated Test Portfolio Item"
            }
            success = self.run_test("Update Portfolio Item", "PUT", f"portfolio/{self.portfolio_id}", 200, update_data)[0]
            if not success:
                return False

            # Test DELETE portfolio item
            success = self.run_test("Delete Portfolio Item", "DELETE", f"portfolio/{self.portfolio_id}", 200)[0]
            return success

        return False

    def test_contact_form(self):
        """Test contact form submission"""
        contact_data = {
            "name": "Test User",
            "email": "test@example.com",
            "subject": "Test Contact",
            "message": "This is a test message from the API tester."
        }
        success, response = self.run_test("Submit Contact Form", "POST", "contact", 200, contact_data)
        if success and 'id' in response:
            self.contact_id = response['id']
            print(f"   Contact created with ID: {self.contact_id}")
        return success

    def test_contacts_management(self):
        """Test contacts management (admin only)"""
        if not self.token:
            print("❌ No token available for contacts management")
            return False

        # Test GET contacts
        success = self.run_test("Get Contacts", "GET", "contacts", 200)[0]
        if not success:
            return False

        if self.contact_id:
            # Test mark contact as read
            success = self.run_test("Mark Contact Read", "PUT", f"contacts/{self.contact_id}/read", 200)[0]
            if not success:
                return False

            # Test delete contact
            success = self.run_test("Delete Contact", "DELETE", f"contacts/{self.contact_id}", 200)[0]
            return success

        return True

    def test_checkout_session(self):
        """Test checkout session creation"""
        # First ensure we have products
        success, products = self.run_test("Get Products for Checkout", "GET", "products", 200)
        if not success or not products:
            print("❌ No products available for checkout test")
            return False

        # Use first available product
        product = products[0]
        checkout_data = {
            "items": [
                {
                    "product_id": product['id'],
                    "quantity": 1
                }
            ],
            "customer_email": "test@example.com",
            "customer_name": "Test Customer",
            "origin_url": "https://leave-your-mark.preview.emergentagent.com"
        }
        
        success, response = self.run_test("Create Checkout Session", "POST", "checkout/session", 200, checkout_data)
        if success and 'session_id' in response:
            session_id = response['session_id']
            self.order_id = response.get('order_id')
            print(f"   Checkout session created: {session_id}")
            
            # Test checkout status
            success = self.run_test("Get Checkout Status", "GET", f"checkout/status/{session_id}", 200)[0]
            return success

        return False

    def test_orders_management(self):
        """Test orders management (admin only)"""
        if not self.token:
            print("❌ No token available for orders management")
            return False

        # Test GET orders
        success = self.run_test("Get Orders", "GET", "orders", 200)[0]
        if not success:
            return False

        if self.order_id:
            # Test GET single order
            success = self.run_test("Get Single Order", "GET", f"orders/{self.order_id}", 200)[0]
            if not success:
                return False

            # Test update order status
            success = self.run_test("Update Order Status", "PUT", f"orders/{self.order_id}/status", 200, "confirmed")[0]
            return success

        return True

    def test_stats(self):
        """Test admin stats endpoint"""
        if not self.token:
            print("❌ No token available for stats")
            return False

        success, stats = self.run_test("Get Stats", "GET", "stats", 200)
        if success:
            print(f"   Stats: {stats}")
        return success

def main():
    print("🚀 Starting ASSK Studio API Tests")
    print("=" * 50)
    
    tester = AsskStudioAPITester()
    
    # Test sequence
    tests = [
        ("Root Endpoint", tester.test_root_endpoint),
        ("Seed Data", tester.test_seed_data),
        ("Admin Registration", tester.test_admin_register),
        ("Admin Login", tester.test_admin_login),
        ("Admin Me", tester.test_admin_me),
        ("Products CRUD", tester.test_products_crud),
        ("Portfolio CRUD", tester.test_portfolio_crud),
        ("Contact Form", tester.test_contact_form),
        ("Contacts Management", tester.test_contacts_management),
        ("Checkout Session", tester.test_checkout_session),
        ("Orders Management", tester.test_orders_management),
        ("Admin Stats", tester.test_stats),
    ]
    
    failed_tests = []
    
    for test_name, test_func in tests:
        print(f"\n{'='*20} {test_name} {'='*20}")
        try:
            if not test_func():
                failed_tests.append(test_name)
        except Exception as e:
            print(f"❌ {test_name} failed with exception: {str(e)}")
            failed_tests.append(test_name)
    
    # Print results
    print(f"\n{'='*50}")
    print(f"📊 Test Results:")
    print(f"   Tests run: {tester.tests_run}")
    print(f"   Tests passed: {tester.tests_passed}")
    print(f"   Tests failed: {tester.tests_run - tester.tests_passed}")
    print(f"   Success rate: {(tester.tests_passed/tester.tests_run*100):.1f}%")
    
    if failed_tests:
        print(f"\n❌ Failed test categories:")
        for test in failed_tests:
            print(f"   - {test}")
    else:
        print(f"\n✅ All test categories passed!")
    
    return 0 if len(failed_tests) == 0 else 1

if __name__ == "__main__":
    sys.exit(main())