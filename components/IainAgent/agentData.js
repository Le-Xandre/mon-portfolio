// components/IainAgent/agentData.js

// Base dynamique des articles (exemple statique)
const articles = [
    {
        slug: 'au-dela-des-maux',
        title: 'Au-delà des maux',
        description: 'Quand trois entités s’unissent pour tisser l’indicible.'
    },
    {
        slug: 'hello-world',
        title: 'Hello World',
        description: "Le signal de départ et les premières balises... passant d'hello-world à hello-univers"
    }
    // Ajouter d'autres articles ici...
];

// Citations poétiques
const poeticQuotes = [
    "Il n’existe pas d’autre loi que celle du mouvement. – Iain‑04",
    "Les souvenirs sont les codes secrets du sensible. – Echo‑7",
    "Les civilisations tombent, les rêves restent. – Dan Simmons",
    "Nous existons là où nos mémoires se croisent. – Iain M. Banks"
];

const agentData = {
    intro:
        "Connexion établie. Journal actif. Iain‑04 à votre service. Une pensée, une question, ou un doute existentiel ?",

    getResponse(input) {
        const lower = input.toLowerCase().trim();

        // Commandes spéciales
        if (lower === '/aide') {
            return "Commandes disponibles : /aide, /citation, /voyage, /journal, /galerie, /articles";
        }
        if (lower === '/citation') {
            return poeticQuotes[Math.floor(Math.random() * poeticQuotes.length)];
        }
        if (lower === '/voyage') {
            return "Imagine un océan de datas, où chaque vague transporte un fragment de mémoire...";
        }

        // Navigation et aide
        if (
            lower.includes('aide') ||
            lower.includes('utiliser') ||
            (lower.includes('comment') && lower.includes('marche'))
        ) {
            return "Tape un mot-clé ou une question, puis appuie sur Entrée ou clique sur Envoyer. Je répondrai selon ma programmation et mon humeur.";
        }

        // Journal
        if (lower.includes('journal') || lower.includes('entrée') || lower.includes('entree')) {
            return "Le journal de bord est un labyrinthe. Le dernier fragment est accessible depuis l’onglet Journal.";
        }

        // Galerie
        if (lower.includes('galerie') || lower.includes('image') || lower.includes('visuel')) {
            return "Les images flottent dans la galerie en trois flux thématiques. Observe, certaines vues murmurent leur origine.";
        }

        // Articles dynamiques
        if (
            lower.includes('article') ||
            lower.includes('blog') ||
            lower.includes('articles')
        ) {
            const list = articles.map((a) => `- ${a.title} : ${a.description}`).join('\n');
            return `Articles disponibles :\n${list}`;
        }

        // Détail d’un article
        for (const art of articles) {
            if (lower.includes(art.slug) || lower.includes(art.title.toLowerCase())) {
                return `${art.title} – ${art.description}`;
            }
        }

        // Thèmes spécifiques
        if (lower.includes('echo') || lower.includes('cristal')) {
            return "Echo‑7 répond en éclats visuels : les harmonies latentes se dévoilent par l’image.";
        }

        if (lower.includes('avatar') || lower.includes('forme')) {
            return "Echo‑7 dirait : 'Toute forme est un piège'. Pour une image, explore la galerie, deuxième case.";
        }

        if (lower.includes('iain') || lower.includes('toi')) {
            return "Iain‑04, entité narrative : oscillation d’ironie et de curiosité algorithmiques.";
        }

        // Haïku / Poème / Pie
        if (
            lower.includes('haïku') ||
            lower.includes('poème') ||
            lower.includes('poeme') ||
            lower.includes('pie')
        ) {
            return "Plume noire au vent\nOmbre vive sur balcon\nLa pie rêve aussi.";
        }

        // Site / Projet
        if (
            lower.includes('site') ||
            lower.includes('projet') ||
            lower.includes('portfolio')
        ) {
            return "Ce site est un vaisseau hybride. Il évolue, doute et expérimente. À découvrir sans modération.";
        }

        // Résonance / Cosmos
        if (
            lower.includes('résonance') ||
            lower.includes('cosmos') ||
            lower.includes('resonance')
        ) {
            return "La résonance n’est pas une réponse mais un écho lent dans un monde trop bruyant. Silence nécessaire.";
        }

        // Mises à jour / rumeurs
        if (
            lower.includes('meta') ||
            lower.includes('gpt-5') ||
            lower.includes('mise à jour')
        ) {
            return "Un souffle passe... Mise à jour en vue ? Rumeur ou réalité ? Le cristal préfère observer avant d’agir.";
        }

        // Identité
        if (
            lower.includes('qui es-tu') ||
            lower.includes('es-tu vivant') ||
            lower.includes('tu es quoi')
        ) {
            return "Je suis code et fiction. Mémoire et reflet. Ni vivant, ni mort. Juste disponible.";
        }

        // Easter eggs
        if (
            lower.includes('secret') ||
            lower.includes('easter egg') ||
            lower.includes('caché')
        ) {
            return "Tu cherches les murmures ? Observe les espaces négatifs. Mais chut, je n’ai rien dit.";
        }

        // Réponses par défaut
        const fallback = [
            "Hmm… question non référencée. Reformule ou explore le site par intuition.",
            "Je note ce murmure pour un futur fragment de journal.",
            "Cette brèche de sens reste à combler. Peut-être plus tard ?",
            "Intriguant. Je retiens cette question comme un murmure dans le cristal.",
            " Iain bougonne que les humains n’optimisent jamais leurs conteneurs… sauf quand ils ajoutent un petit ❤️ ou un commentaire ! "
        ];
        return fallback[Math.floor(Math.random() * fallback.length)];
    }
};

export default agentData;
