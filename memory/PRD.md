# ASSK Studio - Portfolio & Agency Website

## Original Problem Statement
Create a portfolio and agency website for "Assk Studio" (Amaury De Barros). Modern, smooth, animated design with a **blue (#0047FF) and white** premium aesthetic.

## Core Requirements
- Modern landing page showcasing services (Graphisme, Sites Web, 3D & Toys)
- Portfolio section with client projects (horizontal scroll carousel)
- Admin dashboard for portfolio management
- Functional contact form with multi-step devis request (connected to Resend API)
- Mobile responsive design
- Smooth animations: Lenis smooth scroll, Framer Motion page transitions
- Custom cursor (black dot)
- WhatsApp floating button

## User Personas
- **Potential Clients**: Looking for graphic design, web development, or 3D printing services
- **Admin (Amaury)**: Managing portfolio content and viewing contact messages

## Tech Stack
- **Frontend**: React.js, Tailwind CSS, Framer Motion, @studio-freight/lenis (smooth scroll)
- **Backend**: FastAPI, Motor (Async MongoDB)
- **Database**: MongoDB
- **External Services**: Resend (Email delivery)
- **Fonts**: Anton (headings), Futura (body)

## Design System (Blue/White Theme)
- **Background**: #ffffff (white)
- **Primary/Accent**: #0047FF (blue)
- **Text**: #0047FF (blue headings), gray-500 (body)
- **Cards**: White backgrounds with subtle blue borders, hover lift effects
- **Animations**: Blue curtain page transitions with ASSK logo, smooth scroll

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

### April 29, 2026 - Smooth Scrolling
- [x] Lenis smooth scroll integration via SmoothScroll.js wrapper
- [x] Buttery-smooth scrolling experience across all pages
- [x] Compatible with Framer Motion page transitions
- [x] Works on both desktop and mobile

### April 2026 - Core Features
- [x] Blue curtain page transitions with ASSK logo (Framer Motion)
- [x] Custom black dot cursor (DotCursor.js)
- [x] WhatsApp floating button with chat popup
- [x] Multi-step QuoteForm connected to user email via Resend API
- [x] Horizontal scroll carousel for portfolio (drag & drop support)
- [x] Preloader with ASSK branding
- [x] Grain overlay effect
- [x] SEO optimization with react-helmet-async
- [x] Schema.org enrichi (LocalBusiness, BlogPosting, FAQ)
- [x] Blog with local SEO articles (Clermont-Ferrand, Vichy, Moulins)
- [x] Admin dashboard with JWT authentication
- [x] Responsive design (mobile, tablet, desktop)
- [x] Vercel deployment build fixes (ESLint CI=true compatibility)

---

## Prioritized Backlog

### P0 - Completed ✅
- [x] Blue/white premium design
- [x] All main pages (Home, Portfolio, Contact, About, Blog)
- [x] Lenis smooth scroll
- [x] Page transitions
- [x] Contact form email delivery
- [x] Vercel build compatibility

### P1 - High Priority
- [ ] Deploy backend to Render/Railway for production (currently portfolio uses static fallback images on Vercel)
- [ ] Finalize Blog API (create/edit/delete articles dynamically)

### P2 - Medium Priority  
- [ ] Connect Vercel frontend to deployed backend
- [ ] Admin dashboard enhancements

### P3 - Low Priority / Future
- [ ] Client testimonials section
- [ ] 3D printing gallery showcase
- [ ] "Zone d'intervention" map section for local SEO
- [ ] Blog articles management in admin

---

## File Structure
```
/app/
├── backend/
│   ├── server.py (FastAPI + Resend email)
│   ├── .env (RESEND_API_KEY, MONGO_URL)
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── App.js (Lenis + Page transitions)
    │   ├── App.css (Global styles)
    │   ├── pages/
    │   │   ├── HomePage.js
    │   │   ├── PortfolioPage.js
    │   │   ├── ContactPage.js
    │   │   ├── AboutPage.js
    │   │   ├── BlogPage.js
    │   │   └── ...
    │   └── components/
    │       ├── SmoothScroll.js (Lenis wrapper)
    │       ├── DotCursor.js (Custom cursor)
    │       ├── WhatsAppButton.js
    │       ├── HorizontalScrollCarousel.js
    │       ├── QuoteForm.js
    │       ├── Header.js
    │       ├── Footer.js
    │       └── ...
    └── package.json
```

## Important Notes
- **Theme**: User explicitly requested blue/white theme. Do NOT change to dark theme.
- **Vercel**: Project deploys to Vercel with CI=true, fix all ESLint warnings before finishing tasks.
- **Email**: Contact form connected to amaurydebarros1607@gmail.com via Resend API.
