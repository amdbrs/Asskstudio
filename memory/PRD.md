# ASSK Studio - Portfolio & Agency Website

## Original Problem Statement
Create a portfolio and agency website for "Assk Studio" (Amaury De Barros). Modern, smooth, animated design with a **blue (#0047FF) and white** premium aesthetic.

## Core Requirements
- Modern landing page with hero banner image
- ~~Portfolio section~~ (REMOVED per user request - June 2026)
- Admin dashboard for portfolio management
- Functional contact form with multi-step devis request (EmailJS - Frontend only)
- Mobile responsive design
- Framer Motion page transitions
- Custom cursor (adaptive: white on dark, black on light)
- WhatsApp floating button
- Blog with dedicated article pages

## User Personas
- **Potential Clients**: Looking for graphic design, web development, or 3D printing services
- **Admin (Amaury)**: Managing portfolio content and viewing contact messages

## Tech Stack
- **Frontend**: React.js, Tailwind CSS, Framer Motion
- **Backend**: FastAPI (DEPRECATED - Not needed for Vercel deployment)
- **Database**: MongoDB (Optional - only for admin features)
- **External Services**: EmailJS (Email delivery - Frontend only), Google Analytics
- **Fonts**: Anton (headings), Futura (body)

## Design System (Blue/White Theme)
- **Background**: #ffffff (white)
- **Primary/Accent**: #0047FF (blue)
- **Text**: #0047FF (blue headings), gray-500 (body)
- **Hero**: Background image with blue filter overlay

## Key DB Schema
- `portfolio`: {title, desc, image_url, category, created_at}
- `admins`: {username, email, password_hash}
- `contact_messages`: {name, email, subject, message, created_at}

## Key API Endpoints
- POST /api/admin/login
- GET/POST/DELETE /api/portfolio
- POST /api/contact (connected to Resend API → amaurydebarros1607@gmail.com)

---

## What's Been Implemented

### June 25, 2026 - Latest Updates
- [x] CTAs already present on all 3 service pages (Graphisme, Site Web, 3D) - Confirmed working
- [x] Portfolio/Réalisations page content cleared - Now shows "Portfolio en construction" with CTAs
- [x] "Réalisations" removed from Header menu

### June 2026 - Major Updates  
- [x] Migrated email system from Resend/Backend to **EmailJS (Frontend-only)**
- [x] Adaptive cursor color (white on dark backgrounds, black on light)
- [x] Adaptive logo in Header (white version on dark backgrounds)
- [x] Google Analytics integrated (G-ESES6LW1WF)
- [x] Mobile fluidity optimizations (touch-action, snap-carousel)

### May 25, 2026 - Updates
- [x] Hero banner image with blue filter overlay
- [x] Removed background marquee text from hero
- [x] Removed stats banner section
- [x] Optimized mobile services carousel (native scroll)
- [x] Removed "Experience" section from About page
- [x] Blog articles now clickable with dedicated pages (/blog/:slug)
- [x] Contact form simplified to 3 project types: Graphisme, Site Web, 3D
- [x] Horizontal process timeline on desktop and mobile

### April 2026 - Core Features
- [x] Blue curtain page transitions with ASSK logo (Framer Motion)
- [x] Custom dot cursor (DotCursor.js)
- [x] WhatsApp floating button with chat popup
- [x] Multi-step QuoteForm connected via EmailJS
- [x] Preloader with ASSK branding
- [x] SEO optimization with react-helmet-async
- [x] Blog with local SEO articles (Clermont-Ferrand, Vichy, Moulins)
- [x] Admin dashboard with JWT authentication
- [x] Responsive design (mobile, tablet, desktop)
- [x] Vercel deployment build fixes

---

## Prioritized Backlog

### P0 - Completed ✅
- All core features implemented
- CTAs on service pages - DONE
- Portfolio content cleared - DONE

### P1 - High Priority
- [ ] Confirm with user: Remove backend entirely? (Not needed for Vercel deployment)
- [ ] Remove "Réalisations" link from Footer navigation

### P2 - Medium Priority  
- [ ] Admin dashboard for blog management
- [ ] Dynamic blog articles from database

### P3 - Low Priority / Future
- [ ] Client testimonials section
- [ ] "Zone d'intervention" map for local SEO

---

## File Structure
```
/app/
├── backend/              # DEPRECATED - EmailJS replaces Resend
│   └── server.py
└── frontend/
    ├── src/
    │   ├── App.js
    │   ├── pages/
    │   │   ├── HomePage.js
    │   │   ├── BlogPage.js
    │   │   ├── BlogPostPage.js
    │   │   ├── GraphismePage.js (CTAs ✓)
    │   │   ├── SiteWebPage.js (CTAs ✓)
    │   │   ├── Modelisation3DPage.js (CTAs ✓)
    │   │   ├── PortfolioPage.js (Cleared)
    │   │   └── ...
    │   └── components/
    │       ├── QuoteForm.js (EmailJS integration)
    │       ├── DotCursor.js (Adaptive color)
    │       ├── Header.js (Adaptive logo)
    │       └── ...
    ├── public/
    │   └── index.html (Google Analytics)
    └── package.json
```

## Important Notes
- **Theme**: Blue/white theme - do NOT change to dark
- **Vercel**: Fix ESLint warnings before finishing tasks
- **Email**: Contact form → EmailJS (Service: service_6binlv4, Template: template_usg6x09)
- **Backend**: DEPRECATED - All features work frontend-only now
