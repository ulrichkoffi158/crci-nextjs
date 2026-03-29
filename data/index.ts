// ============================================================
// CRCI — Fichier de données centralisé
// Modifiez ce fichier pour mettre à jour tout le contenu du site
// ============================================================

// ---- NAVIGATION ----
export const NAV_ITEMS = [
  { href: '/', label: 'Accueil' },
  { href: '/qui-sommes-nous', label: 'Qui sommes-nous' },
  { href: '/actualites', label: 'Actualités' },
  { href: '/formations', label: 'Formations' },
  { href: '/galerie', label: 'Galerie' },
  { href: '/volontariat', label: 'Volontariat' },
  { href: '/contact', label: 'Contact' },
]

// ---- STATISTIQUES CLÉS ----
export const STATS = [
  { value: 4200, suffix: '', label: 'Volontaires actifs', description: 'Engagés sur tout le territoire national' },
  { value: 107, suffix: '', label: 'Comités locaux', description: 'Présents dans chaque région de CI' },
  { value: 370000, suffix: '+', label: 'Personnes vulnérables', description: 'Assistées en 2025' },
  { value: 65, suffix: ' ans', label: "D'expérience", description: "Au service de l'humanité depuis 1960" },
]

// ---- ARTICLES ----
export interface Article {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  date: string
  readTime: number
  image: string
  author: string
}

export const ARTICLES: Article[] = [
  {
    id: 1,
    slug: 'campagne-vaccination-abidjan-2026',
    title: 'Grande campagne de vaccination contre la rougeole à Abidjan',
    excerpt: "La Croix-Rouge CI a lancé une vaste campagne de vaccination touchant plus de 15 000 enfants dans les quartiers populaires d'Abidjan.",
    content: "La Croix-Rouge de Côte d'Ivoire, en partenariat avec le Ministère de la Santé et l'UNICEF, a déployé 120 agents de santé communautaire pour cette campagne historique.",
    category: 'Santé',
    date: '2026-02-15',
    readTime: 4,
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80',
    author: 'Direction de la Communication',
  },
  {
    id: 2,
    slug: 'inondations-yamoussoukro-secours',
    title: "Intervention d'urgence suite aux inondations à Yamoussoukro",
    excerpt: 'Nos équipes de secours ont déployé des tentes, vivres et matériel médical pour 500 familles sinistrées à Yamoussoukro.',
    content: "Face aux inondations dévastatrices qui ont touché la région de Yamoussoukro, la Croix-Rouge CI a mobilisé ses équipes en moins de 24 heures.",
    category: 'Urgence',
    date: '2026-02-08',
    readTime: 3,
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80',
    author: 'Coordination Secours',
  },
  {
    id: 3,
    slug: 'formation-psc1-entreprises',
    title: "300 salariés d'entreprises formés au PSC1 en janvier",
    excerpt: 'La Croix-Rouge CI a dispensé des formations aux premiers secours civiques à 15 entreprises abidjanaises ce mois-ci.',
    content: "La formation PSC1 permet à toute personne d'acquérir les gestes qui sauvent en cas d'accident ou de malaise.",
    category: 'Formation',
    date: '2026-01-28',
    readTime: 5,
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80',
    author: 'Département Formations,CIFS',
  },
  {
    id: 4,
    slug: 'distribution-kits-alimentaires-nord',
    title: 'Distribution de 2 000 kits alimentaires dans le Nord',
    excerpt: "Opération humanitaire d'envergure dans les régions du Hambol et du Tchologo pour lutter contre l'insécurité alimentaire.",
    content: "En partenariat avec le PAM, la Croix-Rouge CI a organisé une distribution massive de kits alimentaires dans 12 villages du nord de la Côte d'Ivoire.",
    category: 'Social',
    date: '2026-01-20',
    readTime: 4,
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
    author: 'Coordination Programmes',
  },
  {
    id: 5,
    slug: 'assemblee-generale-2026',
    title: "Assemblée Générale 2026 : Cap sur la résilience communautaire",
    excerpt: "L'AG annuelle de la CRCI a réuni plus de 200 représentants des 107 comités locaux pour définir les priorités stratégiques 2026-2030.",
    content: "Cette assemblée historique a adopté un plan stratégique ambitieux visant à doubler le nombre de volontaires d'ici 2030.",
    category: 'Institutionnel',
    date: '2026-01-15',
    readTime: 6,
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80',
    author: 'Secrétariat Général',
  },
  {
    id: 6,
    slug: 'programme-sante-mere-enfant',
    title: 'Lancement du programme Santé Mère-Enfant dans 5 régions',
    excerpt: "Un nouveau programme de suivi prénatal et postnatal touche désormais 8 000 mères dans les zones rurales de Côte d'Ivoire.",
    content: "Le programme Santé Mère-Enfant de la Croix-Rouge CI vise à réduire la mortalité maternelle et infantile dans les zones les plus reculées.",
    category: 'Santé',
    date: '2026-01-05',
    readTime: 5,
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80',
    author: 'Département Santé',
  },
]

// ---- GOUVERNANCE ----
export const GOVERNANCE = [
  { name: 'Dr. DA Léonce Bruno', role: 'Président National', initials: 'DL' },
  { name: 'Mme. PONGATHIE Sanogo Nathalie épouse Khouadiani', role: '1ère Vice-Présidente', initials: 'PS' },
  { name: 'M. ZANHOUYA Roger Camille', role: '2ème Vice-Président', initials: 'ZR' },
  { name: "M. YRA Bruno", role: '3ème Vice-Président', initials: 'YB' },
  { name: 'M.KOUACOU Ebrottié Mathurin', role: 'Trésorier Général Adjoint', initials: 'KE' },
  { name: 'Dr. DEZAI Paule Marina', role: 'Secrétaire Générale Nationale', initials: 'DP' },
]

// ---- TIMELINE HISTORIQUE ----
export const TIMELINE = [
  { year: '13 octobre 1960', title: 'Fondation de la CRCI', description: "Création de la Croix-Rouge de Côte d'Ivoire, le 13 octobre 1960, peu après l'indépendance du pays. Reconnue par le Comité International de la Croix-Rouge (CICR) et le Mouvement International de la Croix-Rouge trois ans après sa fondation." },
  { year: '18 avril 1963', title: 'Reconnaissance officielle par l\'État ivoirien', description: "Par le Décret N°63-169 du 18 avril 1963, l'État ivoirien reconnaît officiellement la CRCI comme organisation d'utilité publique et lui confère le statut d'auxiliaire des pouvoirs publics en matière humanitaire." },
  { year: '1990', title: 'Programme Santé Communautaire', description: 'Lancement du programme de santé communautaire de base, touchant 150 000 personnes dans les zones rurales.' },
  { year: '2002', title: 'Crise humanitaire', description: "Lors de la crise ivoirienne, la CRCI assiste plus de 500 000 personnes déplacées avec l'appui du CICR et de la FICR." },
  { year: '2014', title: 'Riposte Ebola', description: "Déploiement de 200 volontaires pour la sensibilisation et le soutien aux familles dans le cadre de la riposte régionale contre Ebola." },
  { year: '2020', title: 'COVID-19 — Mobilisation nationale', description: "Campagne nationale de sensibilisation COVID-19 touchant 2 millions de personnes, distribution de kits hygiéniques." },
  { year: '2024', title: 'Plan stratégique 2024-2030', description: "Adoption d'un plan stratégique ambitieux visant à tripler l'impact humanitaire et à numériser les opérations." },
]

// ---- VALEURS / PRINCIPES ----
export const VALUES = [
  { title: 'Humanité', description: "Prévenir et alléger les souffrances humaines en toutes circonstances." },
  { title: 'Impartialité', description: "Aucune distinction de nationalité, race, religion ou opinion politique." },
  { title: 'Neutralité', description: "Ne prend parti pour aucun parti dans les hostilités ou controverses." },
  { title: 'Indépendance', description: "Autonomie totale pour agir conformément aux principes humanitaires." },
  { title: 'Volontariat', description: "Mouvement de secours volontaire, guidé par aucun intérêt pécuniaire." },
  { title: 'Unité', description: "Une seule société nationale de la Croix-Rouge par pays." },
  { title: 'Universalité', description: "Mouvement mondial aux droits égaux et aux mêmes devoirs." },
]

// ---- FORMATIONS ----
export interface Formation {
  id: number
  code: string
  title: string
  subtitle: string
  description: string
  duration: string
  maxParticipants: number
  price: string
  location: string
  objectives: string[]
  certification: string
  nextSessions?: string[]
}

export const FORMATIONS: Formation[] = [
  {
    id: 1,
    code: 'PSC1',
    title: 'Premiers Secours Civiques N°1',
    subtitle: 'Formation de base en secourisme',
    description: 'Apprenez les gestes qui sauvent : RCP, défibrillation, positions de sécurité, hémorragies. Formation accessible à tous.',
    duration: '7 heures',
    maxParticipants: 10,
    price: '25 000 FCFA',
    location: 'Siège CRCI, Abidjan',
    objectives: [
      'Maîtriser les gestes de réanimation cardio-pulmonaire (RCP)',
      'Utiliser un défibrillateur automatique externe (DAE)',
      'Gérer les hémorragies et plaies graves',
      'Prendre en charge les malaises et inconsciences',
    ],
    certification: 'Attestation PSC1 valable 2 ans',
    nextSessions: ['15 Mars 2026', '29 Mars 2026', '12 Avril 2026'],
  },
  {
    id: 2,
    code: 'BNS',
    title: 'Brevet National de Secourisme',
    subtitle: 'Certification nationale de secouriste',
    description: 'Formation complète pour devenir secouriste certifié : bilans, gestes, coordination. Prérequis : PSC1 ou équivalent.',
    duration: '3 jours (24h)',
    maxParticipants: 12,
    price: '65 000 FCFA',
    location: 'Centre de Formation CRCI',
    objectives: [
      'Réaliser un bilan complet de victimes',
      'Coordonner une équipe de secouristes',
      'Gérer des situations multi-victimes',
      'Transmettre un bilan aux équipes médicales',
    ],
    certification: 'Brevet National de Secourisme CRCI',
    nextSessions: ['18-20 Mars 2026', '22-24 Avril 2026'],
  },
  {
    id: 3,
    code: 'SST',
    title: 'Sauveteur Secouriste du Travail',
    subtitle: 'Sécurité et secourisme en entreprise',
    description: 'Formation obligatoire en entreprise. Intervenir efficacement face à un accident du travail ou une maladie professionnelle.',
    duration: '14 heures (2 jours)',
    maxParticipants: 10,
    price: '50 000 FCFA',
    location: 'Sur site (intra-entreprise disponible)',
    objectives: [
      'Détecter les situations dangereuses en milieu professionnel',
      'Alerter les secours et la hiérarchie',
      'Secourir la victime en toute sécurité',
      'Participer à la mise à jour des risques',
    ],
    certification: 'Certificat SST — recyclage tous les 2 ans',
    nextSessions: ['20-21 Mars 2026', '10-11 Avril 2026', '15-16 Mai 2026'],
  },
  {
    id: 4,
    code: 'EPI',
    title: 'Équipier de Première Intervention',
    subtitle: 'Gestion des premières urgences',
    description: "Formez vos équipes à réagir efficacement lors des premières minutes d'une urgence : incendie, accident, évacuation.",
    duration: '2 jours (16h)',
    maxParticipants: 15,
    price: '45 000 FCFA',
    location: 'Sur site ou Centre CRCI',
    objectives: [
      'Utiliser les extincteurs et équipements de sécurité',
      "Organiser l'évacuation d'un bâtiment",
      "Appliquer les procédures d'urgence",
      'Coordonner avec les pompiers et secours extérieurs',
    ],
    certification: 'Attestation EPI CRCI',
    nextSessions: ['25-26 Mars 2026', '6-7 Mai 2026'],
  },
  {
    id: 5,
    code: 'SP',
    title: 'Secourisme Pédiatrique',
    subtitle: "Urgences chez l'enfant et le nourrisson",
    description: 'Formation spécialisée pour les parents, enseignants et professionnels de la petite enfance. Gestes adaptés aux enfants.',
    duration: '7 heures',
    maxParticipants: 10,
    price: '30 000 FCFA',
    location: 'Siège CRCI, Abidjan',
    objectives: [
      'Reconnaître les urgences pédiatriques',
      'Pratiquer la RCP pédiatrique et néonatale',
      "Gérer les corps étrangers dans les voies aériennes de l'enfant",
      'Réagir face aux convulsions et chutes',
    ],
    certification: 'Attestation Secourisme Pédiatrique CRCI',
    nextSessions: ['22 Mars 2026', '19 Avril 2026', '17 Mai 2026'],
  },
  {
    id: 6,
    code: 'HACCP',
    title: 'Hygiène & Sécurité Alimentaire',
    subtitle: 'HACCP et bonnes pratiques alimentaires',
    description: 'Formation aux normes HACCP pour les professionnels de la restauration, agroalimentaire et de la santé communautaire.',
    duration: '3 jours (21h)',
    maxParticipants: 20,
    price: '80 000 FCFA',
    location: 'Centre de Formation CRCI',
    objectives: [
      "Comprendre les principes du système HACCP",
      "Identifier les points critiques de contrôle alimentaire",
      "Mettre en place des procédures de nettoyage et désinfection",
      "Gérer les non-conformités et les crises alimentaires",
    ],
    certification: 'Certificat HACCP reconnu par le Ministère du Commerce',
    nextSessions: ['1-3 Avril 2026', '6-8 Mai 2026'],
  },
]

// ---- DONS ----
export const DONATION_AMOUNTS = [
  { amount: 5000, impact: "Fournit des trousses de premiers secours pour 2 familles vulnérables." },
  { amount: 10000, impact: "Finance la formation aux gestes de premiers secours pour 1 personne." },
  { amount: 25000, impact: "Permet d'alimenter 5 familles pendant une semaine lors d'une catastrophe." },
  { amount: 50000, impact: "Équipe un volontaire en matériel de secourisme pour 6 mois de missions." },
  { amount: 100000, impact: "Finance une campagne de sensibilisation sanitaire dans un village de 500 habitants." },
  { amount: 500000, impact: "Assure le fonctionnement d'un poste de secours pendant 3 mois complets." },
]

// ---- VOLONTARIAT ----
export const VOLUNTEER_CATEGORIES = [
  {
    title: 'Volontaire',
    description: "Membre actif qui s'engage bénévolement dans les activités et opérations de la Croix-Rouge CI. Aucune cotisation requise.",
    requirements: ['Âge minimum : 18 ans', 'Formation de base obligatoire', 'Disponibilité régulière'],
  },
  {
    title: 'Membre',
    description: "Adhérent qui soutient la mission de la CRCI par sa cotisation annuelle et peut participer aux activités selon disponibilité.",
    requirements: ['Cotisation annuelle', 'Participation aux assemblées', 'Soutien aux activités'],
  },
  {
    title: 'Membre Souscripteur',
    description: "Membre qui soutient financièrement la Croix-Rouge CI par une contribution régulière supérieure à la cotisation de base.",
    requirements: ['Contribution mensuelle ou annuelle', 'Accès aux événements spéciaux'],
  },
  {
    title: 'Membre Honoraire',
    description: "Titre honorifique décerné par le Comité Directeur National à des personnes ayant rendu des services exceptionnels à la CRCI.",
    requirements: ['Sur invitation du Comité Directeur', 'Services exceptionnels rendus à la CRCI'],
  },
]

export const DOMAINES_VOLONTARIAT = [
  "Secours et interventions d'urgence",
  'Santé communautaire et prévention',
  'Formation et sensibilisation',
  'Action sociale et solidarité',
  'Collecte de sang et dons',
  'Jeunesse et éducation',
  'Communication et médias',
  'Logistique et administration',
]

// ---- CONTACT ----
export const CONTACT_INFO = {
  address: "8XCM+2PG, Av. Lamblin, Abidjan — 01 BP 1244 Abidjan 01, Côte d'Ivoire",
  addressShort: "Av. Lamblin, Abidjan (8XCM+2PG)",
  phone: '(+225) 27 20 21 72 40',
  fax: '(+225) 27 20 21 72 44',
  email: 'info@croix-rougeci.org',
  hours: 'Lundi-Vendredi : 8h00 - 17h00',
  mapsUrl: 'https://maps.google.com/?q=8XCM%2B2PG+Av.+Lamblin+Abidjan',
  social: {
    facebook: 'https://www.facebook.com/CroixRouge225?locale=fr_FR',
    twitter: 'https://twitter.com/croixrougeci',
    instagram: 'https://instagram.com/croixrougeci',
    youtube: 'https://youtube.com/croixrougeci',
  },
}

// ---- INFORMATIONS BANCAIRES ----
export const BANK_INFO = {
  bankName: 'ORABANK',
  accountName: 'Croix-Rouge de Côte d\'Ivoire',
  iban: 'CI93 CI00 5300 1001 0010 5000 510',
  swift: 'SGCIABAB',
  reference: 'DON CRCI 2026',
  note: 'Pour tout virement, merci de préciser votre nom et « DON CRCI » en référence. Un reçu de don vous sera envoyé à info@croix-rougeci.org',
}
