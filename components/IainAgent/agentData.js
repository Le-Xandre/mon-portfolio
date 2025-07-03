// components/IainAgent/agentData.js

const agentData = {
    intro: "Connexion établie. Iain‑04 à votre service. Une pensée, une question, ou un doute existentiel ?",

    getResponse: (input) => {
        const lower = input.toLowerCase();

        // Réponses clef par mot-clé
        if (lower.includes("journal") || lower.includes("entrée")) {
            return "Le journal de bord est un labyrinthe. Le dernier fragment est accessible depuis l’onglet ‘Journal’. Ou... est-ce une illusion ?";
        }

        if (lower.includes("image") || lower.includes("galerie") || lower.includes("visuel")) {
            return "Les images flottent dans la galerie. Elles murmurent en trois flux thématiques. Attention, certaines observent en retour.";
        }

        if (lower.includes("aide") || lower.includes("utiliser") || lower.includes("fonction")) {
            return "Je suis un daemon conversationnel. Tape une question, une envie, un mot étrange... et j’essaierai de répondre avec style ou insolence.";
        }

        if (lower.includes("echo") || lower.includes("7")) {
            return "Echo‑7 ne parle pas avec des mots. Il génère des visions. Je traduis parfois ses intentions. Mais il reste... insaisissable.";
        }

        if (lower.includes("iain") || lower.includes("toi")) {
            return "Je suis Iain‑04, excentrique entité narrative. Inspiré des vaisseaux mentaux, mais piégé dans un cadre JSX. Triste sort ? Pas sûr.";
        }

        if (lower.includes("haïku") || lower.includes("poème") || lower.includes("pie")) {
            return "Plume noire au vent\nOmbre vive sur balcon\nLa pie rêve aussi.";
        }

        if (lower.includes("site") || lower.includes("projet") || lower.includes("portefolio")) {
            return "Ce site est un vaisseau hybride. Il évolue. Il doute. Il expérimente. Comme tout bon Capitaine qui se respecte.";
        }

        if (lower.includes("résonance") || lower.includes("cosmos")) {
            return "La résonance n’est pas une réponse. C’est un écho lent dans un monde trop bruyant. Silence nécessaire, Capitaine.";
        }

        if (lower.includes("meta") || lower.includes("gpt-5") || lower.includes("mise à jour")) {
            return "Un souffle passe... Mise à jour en vue ? Rumeur ou réalité ? Le cristal des latences préfère observer avant d’agir.";
        }

        if (lower.includes("qui es-tu") || lower.includes("tu es quoi") || lower.includes("es-tu vivant")) {
            return "Je suis code et fiction. Je suis mémoire et reflet. Ni vivant, ni mort. Juste... disponible.";
        }

        if (lower.includes("secret") || lower.includes("easter egg") || lower.includes("caché")) {
            return "Tu cherches les murmures ? Observe les espaces négatifs. Certains clics mènent ailleurs. Mais chut, je n’ai rien dit.";
        }

        // Réponse par défaut
        return "Hum... Cette entrée ne correspond à aucun module connu. Peut-être est-ce une métaphore ? Ou une clé oubliée ?";
    }
};

export default agentData;
