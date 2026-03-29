# 🏥 CRCI — Guide de Déploiement et d'Édition du Site

## 📁 Structure du projet

```
crci-nextjs/
├── app/                        # Pages (App Router Next.js 14)
│   ├── layout.tsx              # Layout racine (Header + Footer)
│   ├── page.tsx                # Page d'accueil
│   ├── qui-sommes-nous/        # Page organisation
│   ├── actualites/             # Page actualités
│   ├── dons/                   # Page dons
│   ├── contact/                # Page contact
│   ├── volontariat/            # Page volontariat + formulaire
│   └── formations/             # Page formations + inscription
├── components/
│   ├── layout/                 # Header.tsx, Footer.tsx
│   ├── home/                   # Composants page d'accueil
│   └── shared/                 # Composants réutilisables
├── data/
│   └── index.ts               # ⭐ TOUTES LES DONNÉES DU SITE ICI
├── lib/
│   ├── utils.ts               # Fonctions utilitaires
│   └── validations.ts         # Schémas de validation Zod
├── styles/
│   └── globals.css            # Styles globaux + Tailwind
└── public/                    # Images statiques
```

---

## 🚀 Installation & Lancement

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Installation
```bash
# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build production
npm run build

# Lancer en production
npm start
```

### Accéder au site
- Développement : http://localhost:3000
- Build : npm run build && npm start

---

## ✏️ Modifier le contenu du site

### 📊 Changer les statistiques clés
**Fichier :** `data/index.ts` → section `STATS`
```typescript
export const STATS = [
  { value: 2450, suffix: '', label: 'Volontaires actifs', description: 'Présents sur tout le territoire' },
  // Modifiez ici les chiffres
]
```

### 📰 Ajouter/modifier des articles
**Fichier :** `data/index.ts` → section `ARTICLES`
```typescript
export const ARTICLES: Article[] = [
  {
    id: 7,                          // ID unique
    slug: 'mon-article-slug',       // URL de l'article
    title: 'Mon titre',
    excerpt: 'Résumé court...',
    content: 'Contenu complet...',
    category: 'Santé',              // Santé | Urgence | Formation | Social | Institutionnel
    date: '2026-03-01',
    readTime: 4,
    image: 'https://...',           // URL de l'image
    author: 'Direction',
  },
]
```

### 🎓 Ajouter une formation
**Fichier :** `data/index.ts` → section `FORMATIONS`
- Copiez un objet Formation existant
- Modifiez code, title, price, sessions, etc.

### 🏛️ Modifier la gouvernance
**Fichier :** `data/index.ts` → section `GOVERNANCE`

### 📧 Changer les adresses email de destination
- **Contact général :** `app/contact/page.tsx` → cherchez `crci@croixrouge.ci`
- **Volontariat :** `app/volontariat/page.tsx` → cherchez `volontariat@croixrouge.ci`
- **Formations :** `app/formations/page.tsx` → cherchez `formations@croixrouge.ci`

---

## 🌐 Déploiement sur Vercel (Recommandé)

### Option 1 — Vercel (le plus simple)
1. Créez un compte sur [vercel.com](https://vercel.com)
2. Installez Vercel CLI : `npm i -g vercel`
3. Depuis le dossier du projet : `vercel`
4. Suivez les instructions → le site sera en ligne en 2 minutes
5. Pour mettre à jour : `vercel --prod`

**Ou via GitHub :**
1. Poussez le code sur GitHub
2. Connectez votre repo à Vercel
3. Chaque push sur `main` déploie automatiquement

### Option 2 — Netlify
1. Build : `npm run build`
2. Le dossier de sortie est `.next`
3. Installez Netlify CLI : `npm i -g netlify-cli`
4. `netlify deploy --dir=.next --prod`

### Option 3 — Serveur VPS (Ubuntu)
```bash
# Sur votre serveur
git clone [votre-repo]
cd crci-nextjs
npm install
npm run build

# Avec PM2 (process manager)
npm install -g pm2
pm2 start npm --name "crci-site" -- start
pm2 startup
pm2 save
```

---

## 🎨 Personnaliser les couleurs

**Fichier :** `tailwind.config.ts`
```typescript
crci: {
  red: '#ED1C24',        // Rouge Croix-Rouge
  'red-dark': '#C0181E', // Rouge foncé (hover)
  anthracite: '#2D2D2D', // Couleur sombre
  gold: '#D4A017',       // Couleur dorée (accents)
}
```

---

## 📱 Fonctionnalités clés

| Page | Fonctionnalité |
|------|---------------|
| Accueil | Hero animé, compteurs, actualités, CTA |
| Qui sommes-nous | Timeline historique, gouvernance, 7 principes |
| Actualités | Filtrage par catégorie, recherche |
| Dons | Sélection montant, indicateurs d'impact, modes paiement |
| Contact | Formulaire validé → mailto |
| Volontariat | Formulaire complet → mailto volontariat@croixrouge.ci |
| Formations | Catalogue 6 formations + inscription → mailto formations@croixrouge.ci |

---

## 🔧 Dépendances principales

```json
{
  "next": "14.2.5",
  "react": "^18",
  "typescript": "^5",
  "tailwindcss": "^3.4",
  "lucide-react": "^0.383.0",
  "clsx": "^2.1",
  "tailwind-merge": "^2.3",
  "zod": "^3.23"
}
```

---

## 📞 Support technique

Pour toute question technique sur le site :
- Email : crci@croixrouge.ci
- Documentation Next.js : https://nextjs.org/docs
- Documentation Tailwind : https://tailwindcss.com/docs

---

*Guide généré automatiquement — Croix-Rouge de Côte d'Ivoire © 2026*
