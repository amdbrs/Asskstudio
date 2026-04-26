# ASSK Studio - Portfolio & Agency Website

## Original Problem Statement
Create a portfolio and agency website for "Assk Studio" (Amaury De Barros). Modern, smooth, animated design inspired by **chkstepan.com** with a dark minimalist aesthetic featuring #0047FF blue accents.

## Core Requirements
- Modern dark-themed landing page showcasing services (Graphisme, Sites Web, 3D & Toys)
- Portfolio section with client projects
- Admin dashboard for portfolio management
- Functional contact form with devis request
- Mobile responsive design
- Smooth animations: Lenis smooth scroll, Framer Motion page transitions

## User Personas
- **Potential Clients**: Looking for graphic design, web development, or 3D printing services
- **Admin (Amaury)**: Managing portfolio content and viewing contact messages

## Tech Stack
- **Frontend**: React.js, Tailwind CSS, Framer Motion, Lenis (smooth scroll)
- **Backend**: FastAPI, Motor (Async MongoDB)
- **Database**: MongoDB
- **Fonts**: Outfit (headings), Manrope (body), Space Mono (numbers/labels)

## Design System (chkstepan.com inspired)
- **Background**: #0a0a0a (dark)
- **Foreground**: #ffffff (white)
- **Primary/Accent**: #0047FF (blue)
- **Secondary**: #171717 (cards)
- **Border**: rgba(255,255,255,0.1)
- **Typography**: Large headlines, numbered sections (01), (02), monospace labels
- **Cards**: Dark backgrounds with subtle borders, hover lift effects
- **Animations**: Page transitions with blur/fade, smooth scroll

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

### April 2026 - Optimisations Mobile & Modernisation

**Modifications récentes :**
- [x] Suppression du curseur personnalisé (CustomCursor)
- [x] Page Réalisations mise à jour avec 12 vraies images portfolio
- [x] Page Contact avec formulaire de devis multi-étapes
- [x] Formulaire QuoteForm optimisé pour mobile (touch-friendly)
- [x] Optimisations responsive sur tout le site
- [x] Admin dashboard with portfolio management
- [x] JWT authentication for admin
- [x] Contact form API integration
- [x] SEO optimization with react-helmet-async
- [x] Responsive design (mobile, tablet, desktop)

---

## Prioritized Backlog

### P0 - Completed ✅
- [x] Dark theme redesign (chkstepan.com style)
- [x] All main pages updated (Home, Portfolio, Contact, About)
- [x] Lenis smooth scroll
- [x] Page transitions

### P1 - High Priority
- [ ] Update remaining pages (Blog, Service pages) to dark theme
- [ ] Finalize Blog API (create/edit/delete articles)

### P2 - Medium Priority  
- [ ] Deploy backend to Render/Railway for production
- [ ] Connect Vercel frontend to deployed backend
- [ ] Admin dashboard dark theme update

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
│   ├── server.py
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── App.js (Lenis + Page transitions)
    │   ├── index.css (Dark theme CSS)
    │   ├── pages/
    │   │   ├── HomePage.js (Dark redesign)
    │   │   ├── PortfolioPage.js (Dark redesign)
    │   │   ├── ContactPage.js (Dark redesign)
    │   │   ├── AboutPage.js (Dark redesign)
    │   │   └── ...
    │   └── components/
    │       ├── Header.js (Dark + glassmorphism)
    │       ├── Footer.js (Dark theme)
    │       └── ...
    └── package.json
```
