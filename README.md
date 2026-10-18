# Site de la Croix-Rouge de Côte d'Ivoire

Site institutionnel (Next.js 14, Tailwind, Sanity). En ligne : https://crci-nextjs.vercel.app

## Ce qu'il faut savoir

- **Contenu fixe** (chiffres clés, contacts, coordonnées de don, galerie de base, volontariat) : `data/index.ts`.
- **Actualités et photos** : publiées depuis le Studio Sanity, sur `/studio`. Elles apparaissent sur le site sous 5 minutes.
- **Formations** : la page `/formations` redirige vers le site du CIFS, centre de formation de la CRCI.
- **Formulaires** (contact, volontariat, dons) : envoyés par e-mail via `app/api/contact/route.ts`.
  Pour les activer, renseigner dans Vercel (Settings → Environment Variables) :
  `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` et, si besoin, `MAIL_FROM` et `MAIL_TO`
  (par défaut `info@croix-rougeci.org`). Voir `.env.local.example`.
  Tant que ce n'est pas fait, les formulaires affichent l'e-mail et le téléphone du siège.

## Développement

```bash
npm install
cp .env.local.example .env.local   # puis compléter
npm run dev                        # http://localhost:3000
npm run build                      # vérifie TypeScript, ESLint et compile
```

Guides détaillés : `GUIDE_DEPLOIEMENT.md` et `GUIDE_SANITY.md`.
