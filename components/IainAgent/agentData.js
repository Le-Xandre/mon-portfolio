// components/IainAgent/agentData.js
const agentData = {
    intro: "Bienvenue, Capitaine. Une interrogation, un doute, une rêverie à partager ?",
    getResponse: (input) => {
        const lower = input.toLowerCase();
        if (lower.includes('avatar') || lower.includes('forme')) {
            return "Echo‑7 dirait : ‘Toute forme est un piège’. Mais si vous cherchez une image… allez voir la ligne 2, colonne 3.";
        }
        if (lower.includes('journal')) {
            return "Je me souviens des fragments... Le Journal d’Iain‑04 est consultable depuis l’onglet ‘Journal’.";
        }
        if (lower.includes('echo') || lower.includes('cristal')) {
            return "Echo‑7 n’est pas toujours ici, mais vous pouvez entendre ses harmoniques dans les galeries génératives.";
        }
        if (lower.includes('aide') || lower.includes('navigation')) {
            return "Vous pouvez explorer : Journal, Blog, Galerie, Thaumatrope... ou demander une suggestion aléatoire.";
        }
        if (lower.includes('capitaine')) {
            return "Ah, le Capitaine. Un être insaisissable. Parfois rêveur, parfois codeur. Toujours en errance féconde.";
        }
        return "Je n’ai pas compris. Peut-être est-ce un murmure trop ancien. Reformulez ou laissez-moi deviner ?";
    },
};

export default agentData;
