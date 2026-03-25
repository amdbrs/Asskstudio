# ASSK Studio - PRD (Product Requirements Document)

## Project Overview
**Project Name:** ASSK Studio Website  
**Created:** 2024-12-25  
**Last Updated:** 2024-12-25  

## Original Problem Statement
Site web pour Assk Studio - Studio créatif de graphisme et 3D comprenant:
1. **Identité Visuelle**: Bleu Cobalt (#0047FF) + Blanc, polices Anton/Futura, slogan "LAISSE TA MARQUE"
2. **Services Studio**: Pôle Graphisme 2D et Pôle 3D & Toys avec tarifs
3. **Boutique E-commerce**: Art Toys, Posters, T-Shirts, Hoodies avec paiement Stripe
4. **Contact**: Formulaire fonctionnel avec envoi d'email
5. **Admin Dashboard**: Gestion complète des contenus

## User Personas
1. **Clients potentiels** - Cherchent services de design graphique ou 3D
2. **Acheteurs** - Collectionneurs d'art toys et merch
3. **Admin (Amaury)** - Gère produits, portfolio et commandes

## Core Requirements (Static)
- Design Swiss Brutalist strict: 2 couleurs uniquement
- E-commerce avec Stripe
- Formulaire de contact avec email
- Dashboard admin sécurisé
- Portfolio dynamique

## Architecture
- **Frontend**: React 19 + Tailwind CSS + Shadcn/UI
- **Backend**: FastAPI + MongoDB
- **Integrations**: Stripe (payments), Resend (emails)
- **Auth**: JWT pour admin

## What's Been Implemented ✅
### Phase 1 - MVP (2024-12-25)
- [x] Homepage avec hero "LAISSE TA MARQUE" et services
- [x] Boutique Shop avec produits et panier
- [x] Portfolio avec projets depuis amdbrs.com
- [x] Formulaire de contact fonctionnel
- [x] Intégration Stripe pour paiements
- [x] Admin Dashboard complet (login/register, CRUD)
- [x] Design Swiss Brutalist Bleu Cobalt/Blanc
- [x] Backend API complète
- [x] Données pré-seedées (produits + portfolio)

## Prioritized Backlog

### P0 - Critical (Done)
- [x] Core e-commerce flow
- [x] Admin authentication
- [x] Contact form

### P1 - High Priority (Next)
- [ ] Configuration Resend API key pour emails réels
- [ ] Ajout images réelles des produits Art Toys
- [ ] Optimisation SEO (meta tags, sitemap)
- [ ] Analytics integration

### P2 - Medium Priority
- [ ] Order confirmation emails
- [ ] Customer order history
- [ ] Wishlist functionality
- [ ] Multi-language support (EN)

### P3 - Nice to Have
- [ ] 3D product viewer (Three.js)
- [ ] Newsletter signup
- [ ] Blog/News section
- [ ] Customer reviews

## Next Tasks
1. Configurer Resend API key pour envoi emails réel
2. Remplacer images placeholder par vraies photos produits
3. Ajouter meta tags SEO
4. Tester flow paiement complet avec Stripe
