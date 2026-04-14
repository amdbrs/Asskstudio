# ASSK Studio - Portfolio & Agency Website

## Original Problem Statement
Create a portfolio and agency website for "Assk Studio" (Amaury De Barros). Modern, smooth, animated design inspired by webhero.co with cobalt blue (#0047FF) and white color scheme.

## Core Requirements
- Modern landing page showcasing services (Graphisme, Sites Web, 3D & Toys)
- Portfolio section with 6 items + "Voir plus" button linking to external portfolio (www.amdbrs.com)
- Admin dashboard with drag-and-drop image upload for portfolio management
- Functional contact form
- Mobile responsive design

## User Personas
- **Potential Clients**: Looking for graphic design, web development, or 3D printing services
- **Admin (Amaury)**: Managing portfolio content and viewing contact messages

## Tech Stack
- **Frontend**: React.js, Tailwind CSS, Shadcn UI, Framer Motion (CSS animations)
- **Backend**: FastAPI, Motor (Async MongoDB)
- **Database**: MongoDB

## Key DB Schema
- `portfolio`: {title, desc, image_url, category, created_at}
- `admins`: {username, email, password_hash}
- `contact_messages`: {name, email, subject, message, created_at}

## Key API Endpoints
- POST /api/admin/login
- GET/POST/DELETE /api/portfolio
- POST /api/contact

---

## What's Been Implemented

### December 2025 - January 2026
- [x] Modern redesign inspired by webhero.co with smooth CSS animations
- [x] Mobile responsiveness and layout adaptation
- [x] Admin authentication and Drag & Drop image upload for Portfolio
- [x] Backend CRUD for Portfolio and Contact Messages
- [x] Addition of "Sites Web" service category
- [x] Shop/Cart completely removed from frontend
- [x] Stats updated: "+50 projets", "+10 art toys"
- [x] "On travaille en famille" text in Why Us section
- [x] Header: Removed "ASSK" text, logo only
- [x] 3D section: "Impression 3D Filament - Sur devis" (porte-clés, totems, objets sur demande)
- [x] Portfolio shows 6 items with "Voir plus" → www.amdbrs.com
- [x] **Sellerie Garcia** added to portfolio (1st position) with link to selleriegarcia.fr
- [x] **FAQ SEO section** with 8 questions targeting Clermont-Ferrand, Vichy, Moulins, Allier, Auvergne
- [x] Schema.org FAQPage markup for Google rich snippets
- [x] SEO optimized with local keywords in meta tags
- [x] Backend cleaned - removed all e-commerce routes
- [x] **Floating WhatsApp button** linked to 06 65 09 70 08
- [x] **Dark mode** with toggle in header (persisted in localStorage) - REMOVED per user request
- [x] **"Notre Processus" section** - 4 creative process steps with vertical timeline (PC)
- [x] **"Ils nous font confiance" section** - 6 client names with continuous marquee slider
- [x] **Blog page** with search, category filters, and 6 demo articles
- [x] **About page** created with founder info from CV
- [x] **Stats section** redesigned with Kitemi.studio style (4 cards with hover effects)
- [x] **3 dedicated service pages**: GraphismePage, SiteWebPage, Modelisation3DPage
- [x] **ScrollToTop component** - automatic scroll to top on page navigation
- [x] **White header on sub-pages** - conditional bg-white for non-home pages
- [x] **Formation section removed** from About page (per user request)
- [x] **Modern animations added** - Scroll-triggered animations, enhanced hover effects, micro-interactions
  - New `useScrollAnimation` hook for scroll-triggered visibility
  - `AnimatedSection` component for staggered reveal animations
  - Enhanced CSS with fadeInUp, slideLeft, slideRight, scaleIn animations
  - Improved hover states with smoother transitions (cubic-bezier)
  - Active states with scale feedback on buttons

## Pricing (Current)
### Graphisme
- Pack Logo Signature: 450€
- Identité Visuelle Complète: 950€
- Papeterie & Édition: 200€

### Sites Web
- Site Vitrine: 1200€
- Site Web 5-10 pages: 2200€
- E-commerce: 3000€

### 3D & Toys
- Modélisation 3D (ZBrush): 250€
- Impression 3D Filament: Sur devis
- Pack Art Toy Custom: 490€

---

## Prioritized Backlog

### P0 - Completed
- [x] SEO optimization with local keywords (Clermont-Ferrand, Vichy, Moulins, Allier, Auvergne)
- [x] Backend cleanup - removed all e-commerce routes (products, orders, checkout, stripe)
- [x] Deleted orphaned files (CartContext, ShopPage, CheckoutSuccessPage, CartDrawer, ProductCard)

### P1 - High Priority
- All P1 tasks completed ✅

### P2 - Medium Priority  
- All P2 tasks completed ✅

### P3 - Low Priority / Future
- [ ] Client testimonials section
- [ ] 3D printing gallery showcase
- [ ] "Zone d'intervention" map section for local SEO
