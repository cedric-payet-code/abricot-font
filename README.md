# Abricot – Front-end

Front-end d'**Abricot**, un outil de gestion de projet collaboratif pour les freelances : projets, tâches, contributeurs, commentaires et tableau de bord.

Projet réalisé dans le cadre de la formation OpenClassrooms, branché sur l'API fournie [`dev-react-P10`](https://github.com/OpenClassrooms-Student-Center/dev-react-P10).

**Stack :** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4

---

## Sommaire

- [Prérequis](#prérequis)
- [Installation](#installation)
- [Lancement](#lancement)
- [Comptes de test](#comptes-de-test)
- [À savoir avant de tester](#à-savoir-avant-de-tester)
- [Fonctionnalités](#fonctionnalités)
- [Organisation du code](#organisation-du-code)
- [Choix techniques](#choix-techniques)
- [Scripts](#scripts)

---

## Prérequis

- **Node.js 20.9** ou plus récent, et **npm**
- **Git**

---

## Installation

Le front-end et le back-end sont deux dépôts distincts, à cloner **dans le même dossier** :

```
abricot/
├── dev-react-P10/    ← back-end (API)
└── abricot-front/    ← front-end (ce dépôt)
```

```bash
mkdir abricot && cd abricot
git clone https://github.com/OpenClassrooms-Student-Center/dev-react-P10.git
git clone https://github.com/cedric-payet-code/abricot-font.git abricot-front
```

### 1. Back-end

```bash
cd dev-react-P10
mv .env.example .env
```

Ouvrir `.env` et remplacer la valeur de `JWT_SECRET` par une chaîne secrète de votre choix.

```bash
npm install
npx prisma generate
npx prisma migrate deploy
npm run seed
```

`npm run seed` remplit la base avec des données de test (utilisateurs, projets, tâches, commentaires).

### 2. Front-end

```bash
cd ../abricot-front
cp .env.example .env.local
npm install
```

`.env.local` contient l'adresse de l'API :

```
API_URL=http://localhost:8000
```

La valeur par défaut convient si le back-end tourne sur son port d'origine (8000).

---

## Lancement

Le back-end doit être démarré **avant** le front-end. Dans deux terminaux :

```bash
# Terminal 1 – back-end
cd abricot/dev-react-P10
npm run dev
```

```bash
# Terminal 2 – front-end
cd abricot/abricot-front
npm run dev
```

| Service | Adresse |
|---|---|
| Application | http://localhost:3000 |
| API | http://localhost:8000 |
| Documentation de l'API (Swagger) | http://localhost:8000/api-docs |

---

## Comptes de test

Créés par `npm run seed`. **Mot de passe pour tous les comptes : `P@ssword123`**

| Nom | Email |
|---|---|
| Alice Martin | alice@example.com |
| Bob Dupont | bob@example.com |
| Caroline Leroy | caroline@example.com |
| David Moreau | david@example.com |
| Emma Rousseau | emma@example.com |
| François Dubois | francois@example.com |
| Gabrielle Simon | gabrielle@example.com |
| Henri Laurent | henri@example.com |
| Isabelle Petit | isabelle@example.com |
| Jacques Durand | jacques@example.com |

Pour tester les droits d'accès : **Alice** est propriétaire du projet « Application E-commerce » et simple contributrice de « Plateforme de Formation » (propriétaire : Jacques).

Le détail des données générées et des permissions par rôle est décrit dans le [README du back-end](https://github.com/OpenClassrooms-Student-Center/dev-react-P10#readme).

---

## À savoir avant de tester

- **`npm run seed` remet la base à zéro** : il supprime tous les utilisateurs, projets et tâches avant de recréer les données de test. Les comptes créés et les modifications faites entre-temps sont perdus.
- **Le Kanban du tableau de bord n'affiche que les tâches du mois en cours.** Les échéances des données de test étant passées, il est vide au départ : créez une tâche à échéance dans le mois pour le voir se remplir.
- Les boutons **IA** et **Calendrier** de la page projet sont présents dans la maquette mais hors du périmètre demandé : ils n'ont pas d'effet.

---

## Fonctionnalités

- **Authentification** : inscription, connexion, déconnexion ; pages protégées et session expirée gérée
- **Mon compte** : modifier son nom, son email et son mot de passe
- **Tableau de bord** : mes tâches assignées, en **liste** (triée par urgence, avec recherche) ou en **Kanban** du mois par statut
- **Projets** : liste des projets dont je suis membre, avec progression, triée par urgence
- **Projet** : créer, modifier, supprimer ; ajouter et retirer des contributeurs
- **Tâches** : créer, modifier, supprimer ; assigner à plusieurs personnes ; statut et priorité ; filtre par statut et recherche
- **Commentaires** sur les tâches
- **Droits d'accès** selon le rôle : seuls les administrateurs modifient un projet, seul le propriétaire le supprime, un non-membre n'y a pas accès
- **Page 404**

---

## Organisation du code

```
abricot-front/
├── app/
│   ├── (auth)/           ← connexion, inscription + actions login, register, logout
│   ├── (main)/           ← pages connectées (header + footer)
│   │   ├── dashboard/
│   │   ├── projects/     ← liste des projets + actions des projets
│   │   │   └── [id]/     ← détail d'un projet + actions des tâches et commentaires
│   │   └── account/      ← Mon compte + action de mise à jour
│   ├── logout/           ← supprime le cookie d'une session expirée
│   └── not-found.tsx     ← page 404
├── components/           ← composants par domaine (auth, dashboard, projects, tasks, ui…)
├── lib/                  ← accès à l'API, session, règles partagées (tri, validation, format)
└── proxy.ts              ← protection des pages
```

---

## Choix techniques

- **Sécurité** : le token JWT est stocké dans un **cookie `httpOnly`**, inaccessible au JavaScript du navigateur. Tous les appels à l'API passent par le serveur Next.js (composants serveur et Server Actions) ; `API_URL` n'est jamais exposée au navigateur.
- **Protection des pages** : `proxy.ts` redirige vers `/login` tout visiteur non connecté.
- **Aucune bibliothèque en plus de Next.js** : modales avec `<dialog>` natif, formulaires avec `useActionState` et les Server Actions, cache avec `cache()` de React et `revalidatePath()`.
- **Accessibilité (WCAG AA)** : structure sémantique, labels reliés aux champs, navigation au clavier avec focus visible, attributs ARIA, contrastes vérifiés. Pour atteindre le niveau AA, l'orange des textes et des boutons pleins est légèrement plus foncé que celui de la maquette.
- **Responsive** : du mobile (375 px) au grand écran.
- **Qualité** : TypeScript, ESLint (avec les règles d'accessibilité `jsx-a11y`) et Prettier.

---

## Scripts

| Commande | Rôle |
|---|---|
| `npm run dev` | Lance le serveur de développement (http://localhost:3000) |
| `npm run build` | Construit la version de production |
| `npm run start` | Lance la version de production (après `build`) |
| `npm run lint` | Vérifie le code avec ESLint |
