# 🚀 Guide de Déploiement Vercel - ASSK Studio

## Prérequis
- Compte Vercel (gratuit)
- Compte GitHub avec le code pushé
- Backend hébergé (Railway, Render, ou Vercel Serverless)

---

## 📦 Déploiement du Frontend (React)

### Méthode 1 : Via GitHub (Recommandé)

1. **Pousse ton code sur GitHub**
   ```bash
   git add .
   git commit -m "Prêt pour Vercel"
   git push origin main
   ```

2. **Connecte-toi à Vercel**
   - Va sur [vercel.com](https://vercel.com)
   - Clique "Add New Project"
   - Importe ton repo GitHub

3. **Configure le projet**
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `yarn build`
   - **Output Directory**: `build`

4. **Variables d'environnement**
   Dans les settings Vercel, ajoute :
   ```
   REACT_APP_BACKEND_URL = https://ton-backend-url.com
   ```

5. **Déploie !**
   Clique "Deploy" et attends ~2 minutes

---

### Méthode 2 : Via Vercel CLI

1. **Installe Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Déploie**
   ```bash
   cd frontend
   vercel
   ```

3. **Suis les instructions**
   - Lie ton compte
   - Configure le projet
   - Ajoute les variables d'environnement

---

## 🔧 Configuration Backend

### Option A : Vercel Serverless Functions
Convertis ton FastAPI en serverless (plus complexe)

### Option B : Railway (Recommandé pour FastAPI)
1. Va sur [railway.app](https://railway.app)
2. "New Project" → "Deploy from GitHub"
3. Sélectionne le dossier `backend`
4. Ajoute les variables :
   ```
   MONGO_URL = ta_connection_mongodb
   DB_NAME = assk_studio
   JWT_SECRET = ton_secret_jwt
   ```

### Option C : Render
1. Va sur [render.com](https://render.com)
2. "New Web Service"
3. Connecte GitHub et sélectionne `backend`
4. Configure les variables d'environnement

---

## 🌐 Configuration DNS (Domaine personnalisé)

1. Dans Vercel, va dans **Settings → Domains**
2. Ajoute `assk.studio` (ou ton domaine)
3. Configure les DNS chez ton registrar :
   ```
   Type: CNAME
   Name: @
   Value: cname.vercel-dns.com
   ```

---

## ✅ Checklist avant déploiement

- [ ] Variables d'environnement configurées
- [ ] Backend déployé et accessible
- [ ] CORS configuré sur le backend pour ton domaine
- [ ] Images optimisées (WebP recommandé)
- [ ] Meta tags SEO vérifiés
- [ ] Favicon et manifest.json présents

---

## 🔒 Sécurité

- Ne commite JAMAIS les fichiers `.env` avec des secrets
- Utilise les variables d'environnement Vercel
- Active la protection HTTPS (automatique sur Vercel)

---

## 📊 Performance

Le site est déjà optimisé avec :
- ✅ Source maps désactivés en production
- ✅ Cache headers pour assets statiques
- ✅ Lazy loading des images
- ✅ Code splitting automatique (React)

---

## 🆘 Support

En cas de problème :
1. Vérifie les logs dans le dashboard Vercel
2. Vérifie que `REACT_APP_BACKEND_URL` est correct
3. Teste l'API backend directement avec curl
