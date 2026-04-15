# ASSK Studio - Portfolio & Agency Website

## Original Problem Statement
Create a portfolio and agency website for "Assk Studio" (Amaury De Barros). Modern, smooth, animated design inspired by daveholloway.uk with cobalt blue (#0047FF) and white color scheme.

## Core Requirements
- Modern landing page showcasing services (Graphisme, Sites Web, 3D & Toys)
- Portfolio section with 6 items + "Voir plus" button linking to external portfolio (www.amdbrs.com)
- Admin dashboard with drag-and-drop image upload for portfolio management
- Functional contact form
- Mobile responsive design
- Smooth animations: preloader, custom cursor, parallax effects

## User Personas
- **Potential Clients**: Looking for graphic design, web development, or 3D printing services
- **Admin (Amaury)**: Managing portfolio content and viewing contact messages

## Tech Stack
- **Frontend**: React.js, Tailwind CSS, Shadcn UI, react-helmet-async (SEO)
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

### December 2025 - January 2026 (Latest Updates)

**Animations & Effects (Latest - Jan 2026)**
- [x] **Preloader** - Animated logo with progress bar (0-100%), ~3s duration, appears once per session
- [x] **Custom Cursor** - White dot (8px) + ring (40px→80px on hover) with mix-blend-difference
  - Shows text from `data-cursor-text` attribute on hover
  - Hidden on touch devices
  - CSS `cursor: none !important` for all elements
- [x] **MouseParallax** - Hero logo follows mouse movement with smooth easing
- [x] **TiltCard** - Portfolio cards have 3D perspective rotation on hover (maxTilt=8, scale=1.02)
- [x] **Scroll animations** - fadeInUp, slideLeft, slideRight with staggered delays

**SEO & Performance**
- [x] **react-helmet-async** - Dynamic meta tags per page
- [x] **sitemap.xml & robots.txt** - For Google indexing
- [x] **404 page** - Custom NotFoundPage with navigation
- [x] **Static portfolio fallback** - Unsplash images for Vercel deployment (backend not deployed)

**UI/UX**
- [x] Mobile responsiveness and layout adaptation
- [x] Admin authentication and Drag & Drop image upload
- [x] "Sites Web" service category
- [x] Stats compact banner with 4 key metrics
- [x] FAQ SEO section with 8 questions (Schema.org markup)
- [x] WhatsApp floating button (+33 6 65 09 70 08)
- [x] "Notre Processus" timeline section (4 steps)
- [x] "Ils nous font confiance" marquee slider (6 clients)
- [x] Blog page with search and filters
- [x] About page with founder info
- [x] 3 dedicated service pages (Graphisme, Sites Web, 3D)
- [x] ScrollToTop on navigation
- [x] Favicon (ASSK logo)

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

### P0 - Completed ✅
- [x] Custom cursor + parallax effects (daveholloway.uk inspiration)
- [x] Preloader with logo animation
- [x] SEO optimization (local keywords)

### P1 - High Priority
- [ ] Finalize Blog API (create/edit/delete articles via admin dashboard)

### P2 - Medium Priority  
- [ ] Deploy backend to Render/Railway for production admin dashboard
- [ ] Connect Vercel frontend to deployed backend

### P3 - Low Priority / Future
- [ ] Client testimonials section
- [ ] 3D printing gallery showcase
- [ ] "Zone d'intervention" map section for local SEO
