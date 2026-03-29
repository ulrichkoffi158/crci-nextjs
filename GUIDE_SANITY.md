# Guide d'intégration Sanity CMS — Site CRCI

Ce guide vous explique comment connecter le site CRCI à Sanity.io pour gérer
les actualités, la galerie photos et les formations depuis une interface web.

---

## 1. Créer votre projet Sanity

1. Rendez-vous sur **[sanity.io](https://www.sanity.io)** et créez un compte gratuit.
2. Créez un nouveau projet :
   - Cliquez sur **"New project"**
   - Donnez-lui un nom (ex: `crci-cms`)
   - Choisissez le plan **Free** (largement suffisant)
   - Dataset : laissez **`production`**
3. Notez votre **Project ID** (visible dans l'URL ou le tableau de bord).

---

## 2. Configurer les variables d'environnement

Dans le dossier du projet, copiez le fichier exemple :

```bash
cp .env.local.example .env.local
```

Ouvrez `.env.local` et remplacez `votre_project_id_ici` par votre Project ID Sanity.

---

## 3. Installer les dépendances

```bash
npm install sanity next-sanity @sanity/image-url @sanity/vision
```

---

## 4. Déployer les schémas dans Sanity

```bash
npx sanity deploy
```

Ou lancez le studio localement pour tester :

```bash
npm run dev
```

Puis allez sur **[http://localhost:3000/studio](http://localhost:3000/studio)**

---

## 5. Configurer les CORS dans Sanity

Pour que votre site puisse accéder aux données :

1. Allez sur [sanity.io/manage](https://sanity.io/manage)
2. Sélectionnez votre projet → **API** → **CORS Origins**
3. Ajoutez :
   - `http://localhost:3000` (développement)
   - `https://votre-domaine.ci` (production)

---

## 6. Ajouter du contenu

Une fois le Studio ouvert (`/studio`) :

### Actualités
- Cliquez sur **Actualités** → **Créer un article**
- Remplissez : titre, catégorie, date, résumé, contenu riche (texte + images)
- Publiez → Le site affichera automatiquement le nouvel article

### Galerie photos
- Cliquez sur **Galerie photos** → **Créer une photo**
- Uploadez l'image, choisissez la catégorie, ajoutez une légende et l'année
- L'ordre d'affichage se contrôle avec le champ "Ordre" (nombre faible = premier)

### Formations
- Cliquez sur **Formations** → **Créer une formation**
- Remplissez tous les champs : code, titre, description, objectifs, sessions, prix
- Les sessions s'affichent comme boutons cliquables sur le site

---

## 7. Fonctionnement du site

Le site utilise une **stratégie de repli (fallback)** :

- Si Sanity est configuré et contient du contenu → le contenu Sanity est affiché
- Si Sanity n'est pas encore configuré → les données statiques du fichier `data/index.ts` sont affichées

Cette approche garantit que le site reste fonctionnel même pendant la migration.

---

## Structure des fichiers créés

```
crci-nextjs/
├── sanity.config.ts          # Configuration du Studio Sanity
├── sanity.cli.ts             # CLI Sanity
├── schemas/
│   ├── index.ts              # Export de tous les schémas
│   ├── article.ts            # Schéma Actualités
│   ├── photo.ts              # Schéma Galerie
│   └── formation.ts          # Schéma Formations
├── lib/
│   ├── sanity.client.ts      # Client Sanity + générateur d'URL images
│   └── sanity.queries.ts     # Requêtes GROQ + types TypeScript
├── app/
│   └── studio/
│       ├── layout.tsx        # Layout isolé pour le Studio
│       └── [[...tool]]/
│           └── page.tsx      # Page Studio embarqué
└── .env.local.example        # Modèle de variables d'environnement
```

---

## Commandes utiles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Démarrer le site + Studio en local |
| `npx sanity deploy` | Déployer le Studio en ligne |
| `npx sanity dataset export production backup.tar.gz` | Sauvegarder les données |

---

## Besoin d'aide ?

- Documentation Sanity : [sanity.io/docs](https://www.sanity.io/docs)
- Intégration Next.js : [sanity.io/docs/next-js](https://www.sanity.io/docs/next-js)
