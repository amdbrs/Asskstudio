# ASSK Studio - Portfolio & Agency Website

## Original Problem Statement
Create a portfolio and agency website for "Assk Studio" (Amaury De Barros). Modern, smooth, animated design with a **blue (#0047FF) and white** premium aesthetic.

## Core Requirements
- Modern landing page with hero banner image
- Portfolio section with client projects (horizontal scroll carousel)
- Admin dashboard for portfolio management
- Functional contact form with multi-step devis request (connected to Resend API)
- Mobile responsive design
- Framer Motion page transitions
- Custom cursor (black dot)
- WhatsApp floating button
- Blog with dedicated article pages

## User Personas
- **Potential Clients**: Looking for graphic design, web development, or 3D printing services
- **Admin (Amaury)**: Managing portfolio content and viewing contact messages

## Tech Stack
- **Frontend**: React.js, Tailwind CSS, Framer Motion
- **Backend**: FastAPI, Motor (Async MongoDB)
- **Database**: MongoDB
- **External Services**: Resend (Email delivery)
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

### May 25, 2026 - Major Updates
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
- [x] Custom black dot cursor (DotCursor.js)
- [x] WhatsApp floating button with chat popup
- [x] Multi-step QuoteForm connected to user email via Resend API
- [x] Horizontal scroll carousel for portfolio (drag & drop support)
- [x] Preloader with ASSK branding
- [x] SEO optimization with react-helmet-async
- [x] Blog with local SEO articles (Clermont-Ferrand, Vichy, Moulins)
- [x] Admin dashboard with JWT authentication
- [x] Responsive design (mobile, tablet, desktop)
- [x] Vercel deployment build fixes

---

## Prioritized Backlog

### P0 - Completed ✅
All core features implemented

### P1 - High Priority
- [ ] Deploy backend to Render/Railway for production
- [ ] Connect Vercel frontend to deployed backend

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
├── backend/
│   ├── server.py
│   └── .env (RESEND_API_KEY, MONGO_URL)
└── frontend/
    ├── src/
    │   ├── App.js
    │   ├── pages/
    │   │   ├── HomePage.js
    │   │   ├── BlogPage.js
    │   │   ├── BlogPostPage.js (NEW)
    │   │   └── ...
    │   └── components/
    │       ├── AnimatedProcessSection.js
    │       └── ...
    └── package.json
```

## Important Notes
- **Theme**: Blue/white theme - do NOT change to dark
- **Vercel**: Fix ESLint warnings before finishing tasks
- **Email**: Contact form → amaurydebarros1607@gmail.com via Resend
