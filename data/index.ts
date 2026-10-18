// ============================================================
// CRCI — Fichier de données centralisé
// Modifiez ce fichier pour mettre à jour le contenu fixe du site.
// Les actualités et la galerie peuvent aussi être gérées dans Sanity (/studio).
// ============================================================

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://crci-nextjs.vercel.app'

/** Site du CIFS, centre de formation de la Croix-Rouge de Côte d'Ivoire */
export const CIFS_URL = 'https://cifs-site.vercel.app'

export const FOUNDATION_YEAR = 1960
export const yearsOfService = () => new Date().getFullYear() - FOUNDATION_YEAR

// ---- NAVIGATION ----
export const NAV_ITEMS = [
  { href: '/', label: 'Accueil' },
  { href: '/qui-sommes-nous', label: 'Qui sommes-nous' },
  { href: '/actualites', label: 'Actualités' },
  { href: CIFS_URL, label: 'Formations', external: true },
  { href: '/galerie', label: 'Galerie' },
  { href: '/volontariat', label: 'Volontariat' },
  { href: '/contact', label: 'Contact' },
]

// ---- STATISTIQUES CLÉS ----
export const STATS = [
  { value: 4200, suffix: '', label: 'Volontaires actifs', description: 'Engagés sur tout le territoire national' },
  { value: 107, suffix: '', label: 'Comités locaux', description: "Répartis sur l'ensemble du territoire" },
  { value: 370000, suffix: '+', label: 'Personnes assistées', description: 'En 2025' },
  { value: yearsOfService(), suffix: ' ans', label: "D'engagement", description: "Au service de l'humanité depuis 1960" },
]

// ---- ACTUALITÉS ----
// Les actualités sont publiées depuis Sanity (/studio). Aucun article fixe.
export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime?: string
  image: string
  author?: string
}

// ---- DOMAINES D'ACTION (page d'accueil) ----
export const ACTIONS = [
  { title: "Secours d'urgence", description: 'Premiers secours, évacuation des victimes et postes de secours lors des urgences et des grands événements.', image: '/images/crci/secours-evacuation.jpg', href: '/qui-sommes-nous#actions' },
  { title: 'Santé et don de sang', description: 'Promotion de la santé communautaire et mobilisation de donneurs de sang bénévoles.', image: '/images/crci/don-de-sang.jpg', href: '/galerie' },
  { title: 'Eau, hygiène et assainissement', description: "Accès à l'eau, kits d'hygiène et promotion du lavage des mains, à l'école et dans les communautés.", image: '/images/crci/wash-ecole.jpg', href: '/galerie' },
  { title: 'Assistance aux ménages vulnérables', description: "Appui aux familles touchées par les crises, notamment par l'assistance monétaire.", image: '/images/crci/assistance-monetaire.jpg', href: '/galerie' },
  { title: 'Sensibilisation communautaire', description: 'Séances de proximité animées par nos volontaires pour prévenir les risques et informer les populations.', image: '/images/crci/sensibilisation-communautaire.jpg', href: '/galerie' },
  { title: 'Formation aux premiers secours', description: "Les formations sont assurées par le CIFS, centre de formation de la Croix-Rouge de Côte d'Ivoire.", image: '/images/crci/formation-premiers-secours.jpg', href: CIFS_URL, external: true },
]

// ---- GALERIE (photos CRCI) ----
export interface Photo {
  id: string
  src: string
  alt: string
  category: string
  caption: string
  year?: string
}

export const GALLERY: Photo[] = [
  { id: 'g1', src: '/images/crci/secours-evacuation.jpg', alt: 'Secouristes CRCI évacuant une victime sur brancard', category: 'Secours', caption: "Évacuation d'une victime par les secouristes" },
  { id: 'g2', src: '/images/crci/formation-premiers-secours.jpg', alt: 'Exercice de premiers secours', category: 'Formation', caption: 'Formation aux gestes de premiers secours' },
  { id: 'g3', src: '/images/crci/journee-8-mai.jpg', alt: 'Volontaires CRCI rassemblés le 8 mai', category: 'Vie associative', caption: 'Journée mondiale de la Croix-Rouge, 8 mai' },
  { id: 'g4', src: '/images/crci/don-de-sang.jpg', alt: 'Prélèvement lors d’une collecte de sang', category: 'Santé', caption: 'Collecte de sang' },
  { id: 'g5', src: '/images/crci/wash-ecole.jpg', alt: 'Volontaire CRCI et élève au point de lavage des mains', category: 'Eau et hygiène', caption: "Promotion de l'hygiène à l'école" },
  { id: 'g6', src: '/images/crci/remise-kits-hygiene.jpg', alt: "Remise de kits d'hygiène", category: 'Eau et hygiène', caption: "Remise de kits d'hygiène" },
  { id: 'g7', src: '/images/crci/wash-kits.jpg', alt: "Volontaires avec kits de lavage des mains", category: 'Eau et hygiène', caption: "Kits d'hygiène pour les communautés" },
  { id: 'g8', src: '/images/crci/wash-eau.jpg', alt: "Femme portant une bassine d'eau avec une volontaire", category: 'Eau et hygiène', caption: "Accès à l'eau" },
  { id: 'g9', src: '/images/crci/assistance-monetaire.jpg', alt: 'Enregistrement de bénéficiaires', category: 'Assistance', caption: 'Assistance aux ménages vulnérables' },
  { id: 'g10', src: '/images/crci/seance-information.jpg', alt: 'Séance d’information avec la population', category: 'Assistance', caption: "Séance d'information des bénéficiaires" },
  { id: 'g11', src: '/images/crci/sensibilisation-communautaire.jpg', alt: 'Sensibilisation communautaire', category: 'Santé', caption: 'Sensibilisation communautaire' },
  { id: 'g12', src: '/images/crci/atelier.jpg', alt: 'Participants à un atelier de la CRCI', category: 'Vie associative', caption: "Atelier de la Croix-Rouge de Côte d'Ivoire" },
]

// ---- GOUVERNANCE ----
export const GOVERNANCE = [
  { name: 'Dr. DA Léonce Bruno', role: 'Président National', initials: 'DL' },
  { name: 'Mme. PONGATHIE Sanogo Nathalie épouse Khouadiani', role: '1ère Vice-Présidente', initials: 'PS' },
  { name: 'M. ZANHOUYA Roger Camille', role: '2ème Vice-Président', initials: 'ZR' },
  { name: 'M. YRA Bruno', role: '3ème Vice-Président', initials: 'YB' },
  { name: 'M. KOUACOU Ebrottié Mathurin', role: 'Trésorier Général Adjoint', initials: 'KE' },
  { name: 'Dr. DEZAI Paule Marina', role: 'Secrétaire Générale Nationale', initials: 'DP' },
]

// ---- TIMELINE HISTORIQUE ----
export const TIMELINE = [
  { year: '13 octobre 1960', title: 'Fondation de la CRCI', description: "Création de la Croix-Rouge de Côte d'Ivoire, peu après l'indépendance du pays." },
  { year: '18 avril 1963', title: "Reconnaissance officielle par l'État", description: "Par le décret N°63-169 du 18 avril 1963, l'État ivoirien reconnaît la CRCI comme auxiliaire des pouvoirs publics dans le domaine humanitaire. La même année, elle rejoint le Mouvement international de la Croix-Rouge et du Croissant-Rouge." },
  { year: '2002', title: 'Crise ivoirienne', description: "La CRCI se mobilise auprès des populations déplacées, avec l'appui du CICR et de la FICR." },
  { year: '2014', title: 'Prévention Ebola', description: 'Les volontaires participent à la sensibilisation et à la prévention dans le cadre de la riposte régionale contre Ebola.' },
  { year: '2020', title: 'COVID-19', description: 'Campagnes nationales de sensibilisation et distribution de kits d’hygiène.' },
]

// ---- PRINCIPES FONDAMENTAUX ----
export const VALUES = [
  { title: 'Humanité', description: 'Prévenir et alléger en toutes circonstances les souffrances des hommes.' },
  { title: 'Impartialité', description: 'Aucune distinction de nationalité, de race, de religion, de condition sociale ou d’appartenance politique.' },
  { title: 'Neutralité', description: 'Ne prendre part ni aux hostilités ni aux controverses d’ordre politique, racial, religieux ou idéologique.' },
  { title: 'Indépendance', description: 'Garder une autonomie qui permette d’agir toujours selon les principes du Mouvement.' },
  { title: 'Volontariat', description: 'Une institution de secours volontaire et désintéressée.' },
  { title: 'Unité', description: 'Une seule Société de la Croix-Rouge ou du Croissant-Rouge par pays, ouverte à tous.' },
  { title: 'Universalité', description: 'Un Mouvement universel, au sein duquel toutes les Sociétés ont des droits égaux.' },
]

// ---- DONS ----
export const DONATION_AMOUNTS = [
  { amount: 5000, impact: 'Contribue à l’achat de trousses de premiers secours.' },
  { amount: 10000, impact: 'Contribue à former un citoyen aux gestes qui sauvent.' },
  { amount: 25000, impact: 'Contribue à l’aide d’urgence aux familles sinistrées.' },
  { amount: 50000, impact: 'Contribue à équiper nos volontaires en matériel de secours.' },
  { amount: 100000, impact: 'Contribue à une campagne de sensibilisation sanitaire.' },
  { amount: 500000, impact: 'Contribue au fonctionnement de nos postes de secours.' },
]

export const WAVE_INFO = {
  payUrl: 'https://pay.wave.com/m/M_ci_-7GK5PGhLtHC/c/ci',
  qrImage: '/images/qr-wave-crci.png',
}

export const BANK_INFO = {
  bankName: 'SIB — Société Ivoirienne de Banque',
  branch: 'Agence Plateau',
  accountName: 'ASSOCIATION CRCI / CONNECTIK / MOBILISATION DE RESSOURCES',
  accountType: 'Compte courant',
  accountNumber: '90000708966043',
  iban: 'CI93CI0070102590000708966043',
  bic: 'SIVBCIABXXX',
  reference: 'DON CRCI',
  note: 'Indiquez votre nom et la mention « DON CRCI » dans le libellé du virement, puis prévenez-nous avec le formulaire ci-dessous pour recevoir votre reçu.',
}

/** Affiche un IBAN par groupes de 4 caractères */
export const formatIban = (iban: string) => iban.replace(/\s+/g, '').replace(/(.{4})/g, '$1 ').trim()

// ---- VOLONTARIAT ----
// Définitions reprises des Statuts de la Croix-Rouge de Côte d'Ivoire (articles 6 à 14)
export const VOLUNTEER_CATEGORIES = [
  {
    title: 'Volontaire',
    reference: 'Statuts, art. 12.1',
    description:
      "Toute personne qui s'engage de son plein gré, de manière désintéressée, sans chercher un profit ni une récompense matérielle ou financière, dans une action organisée par la Croix-Rouge de Côte d'Ivoire en faveur de la communauté, et qui est enregistrée comme telle auprès de la Société nationale.",
    requirements: [
      'Participe aux activités selon sa disponibilité, à titre bénévole',
      "N'est pas soumis à un contrat de travail",
      'Ne bénéficie pas du droit de vote et d’éligibilité',
      "Ne pas avoir fait l'objet d'une condamnation pénale pour crime ou délit",
    ],
  },
  {
    title: 'Secouriste',
    reference: 'Statuts, art. 12.2',
    description:
      "Volontaire formé en secourisme, capable — lorsque les conditions sécuritaires le permettent — de poser rapidement et efficacement les gestes qui sauvent en faveur d'une victime en danger physique, et de participer aux opérations de secours en situation de crise et de catastrophes naturelles.",
    requirements: ['Être volontaire de la Croix-Rouge de Côte d’Ivoire', 'Être formé en secourisme'],
  },
  {
    title: 'Membre actif',
    reference: 'Statuts, art. 6',
    description:
      "Toute personne physique qui a accepté de prêter son service à la Croix-Rouge de Côte d'Ivoire et de verser une contribution dont le montant est fixé par l'Assemblée générale, et qui est enregistrée comme telle auprès de l'entité de base dont elle dépend.",
    requirements: [
      "Verse la contribution fixée par l'Assemblée générale",
      "N'est pas soumis à un contrat de travail",
      "Participe aux délibérations, avec le droit d'élire et d'être élu",
      'Membre actif dans une seule branche locale à la fois',
    ],
  },
  {
    title: "Membre d'honneur",
    reference: 'Statuts, art. 7',
    description:
      "Toute personne physique ou morale à laquelle l'Assemblée générale de la Croix-Rouge de Côte d'Ivoire a conféré ce titre en reconnaissance des services exceptionnels rendus à la Société nationale.",
    requirements: ["Titre conféré par l'Assemblée générale", 'Sans droit de vote ni d’éligibilité'],
  },
]

/** Catégories auxquelles on peut postuler via le formulaire */
export const APPLICATION_CATEGORIES = ['Volontaire', 'Secouriste (volontaire formé en secourisme)', 'Membre actif']

/** Droits des volontaires (Statuts, art. 13) */
export const VOLUNTEER_RIGHTS = [
  { title: 'Activités et formations', description: 'Participer aux activités et aux formations organisées par la Société nationale.' },
  { title: 'Assurance', description: 'Être couvert par une assurance lors des interventions organisées par la Société nationale.' },
  { title: 'Protection', description: 'Bénéficier d’une protection : sûreté, sécurité, protection contre les abus et le harcèlement.' },
  { title: 'Participation', description: 'Participer à la définition des tâches et des fonctions dans lesquelles on est impliqué.' },
]

/** Obligations des volontaires (Statuts, art. 14) */
export const VOLUNTEER_DUTIES = [
  'Signer et respecter le code de conduite',
  'Respecter les Principes fondamentaux et les règlements de la Société nationale, y compris pour l’usage de l’emblème et du logo',
  'S’abstenir de tout militantisme actif dans les partis ou autres activités politiques',
  'S’abstenir de tout engagement pouvant nuire à l’image de la Société nationale',
  'Respecter la confidentialité, notamment dans l’assistance aux personnes vulnérables',
]

export const DOMAINES_VOLONTARIAT = [
  "Secours et interventions d'urgence",
  'Santé communautaire et prévention',
  'Eau, hygiène et assainissement',
  'Action sociale et solidarité',
  'Collecte de sang',
  'Jeunesse et éducation',
  'Communication et médias',
  'Logistique et administration',
]

// ---- CONTACT ----
export const CONTACT_INFO = {
  address: "Angle du boulevard Botreau-Roussel et de l'avenue Lamblin, Le Plateau — 01 BP 1244 Abidjan 01, Côte d'Ivoire",
  addressShort: 'Le Plateau, Abidjan',
  phone: '(+225) 27 20 21 72 40',
  phoneHref: 'tel:+2252720217240',
  fax: '(+225) 27 20 21 72 44',
  email: 'info@croix-rougeci.org',
  hours: 'Lundi – jeudi : 8h – 17h30 · Vendredi : 8h – 13h',
  mapsUrl: 'https://maps.google.com/?q=Croix-Rouge+de+C%C3%B4te+d%27Ivoire+si%C3%A8ge+Abidjan',
  social: {
    facebook: 'https://www.facebook.com/CroixRouge225',
  },
}
