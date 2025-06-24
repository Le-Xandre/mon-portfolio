# Portfolio Expert

Ce projet est un portfolio complet pour un développeur expert, prêt à être personnalisé. Il inclut :

- Page d'accueil avec Hero animé.
- Section "À propos".
- Section "Projets" avec animations Framer Motion.
- Galerie d'images interactive (Swiper + Lightbox).
- Blog statique (Markdown + Next.js).
- Page de contact avec formulaire.
- Dark mode.
- SEO de base.
- PWA (à configurer).
- Déploiement sur Vercel ou autre.

## Installation

```bash
npm install
npm run dev
```

## Ajouter des images

Place tes images dans `public/images` avec les noms :
- `hero.jpg`
- `project-a.jpg`
- `project-b.jpg`
- `gallery1.jpg`
- `gallery2.jpg`
- `gallery3.jpg`

## Ajouter des articles

Crée un fichier Markdown dans `content/blog` avec le frontmatter :

```
---
title: 'Titre de l\'article'
description: 'Courte description'
date: 'YYYY-MM-DD'
---
Contenu de l'article...
```
