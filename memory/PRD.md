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

### April 2026 - Dark Theme Redesign (chkstepan.com inspired)

**Complete UI Overhaul**
- [x] Dark theme (#0a0a0a background) replacing bright white/blue
- [x] New typography: Outfit for headings, Manrope for body, Space Mono for labels
- [x] Numbered sections: (01) À propos, (02) Services, (03) Réalisations, etc.
- [x] Cards with #171717 background and subtle white/10 borders
- [x] Header with glassmorphism effect on scroll
- [x] Mobile menu with numbered navigation links
- [x] Lenis smooth scrolling integration

**HomePage Redesign**
- [x] Hero with animated stats (50+ Projets, 5+ Années, 98% Satisfaction)
- [x] Large headline: "On crée des marques qui marquent."
- [x] Two CTAs: "Démarrer un projet" (white) + "Voir les projets" (outline)
- [x] Marquee with services
- [x] About section with asymmetric layout
- [x] Services grid (3 cards with icons and numbered)
- [x] Portfolio grid (6 items from real projects)
- [x] "Pourquoi nous choisir" section with 4 value cards
- [x] Contact section with form and contact cards

**PortfolioPage**
- [x] Category filters (Tous, Graphisme, Site Web, 3D)
- [x] Grid layout with project cards
- [x] Real portfolio images from customer assets
- [x] CTA section at bottom

**ContactPage**
- [x] Two-column layout: contact info + form
- [x] Contact cards (Email, Phone, Instagram, Location)
- [x] Full devis form with service/budget selects
- [x] Success state after submission

**AboutPage**
- [x] Hero with ASSK logo
- [x] Story section (01)
- [x] Values section (02) with 4 cards
- [x] Timeline section (03) with company history
- [x] CTA section

**Header/Footer**
- [x] Sticky header with glassmorphism on scroll
- [x] Mobile menu with numbered links
- [x] Footer with 4-column layout
- [x] Social icons, navigation, services, contact info

**Animations & Performance**
- [x] Lenis smooth scroll
- [x] Framer Motion page transitions (fade + blur)
- [x] Staggered reveal animations
- [x] Grain texture overlay
- [x] Hover effects on cards and buttons

### Previous Features (Still Active)
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
