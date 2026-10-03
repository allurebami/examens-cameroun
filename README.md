# Examens Cameroun - V0

Site statique pour une bibliotheque d'epreuves et de corriges destinee aux eleves de 3e, Premiere et Terminale au Cameroun.

## Structure

- `index.html` : page principale du site
- `styles.css` : design responsive
- `app.js` : donnees des epreuves, filtres et liens WhatsApp

## Modifier le numero WhatsApp

Dans `app.js`, remplace :

```js
const WHATSAPP_NUMBER = "237600000000";
```

par ton numero au format international, sans `+`.

## Ajouter une epreuve

Dans `app.js`, ajoute un objet dans le tableau `documents` :

```js
{
  level: "Terminale",
  series: "D",
  subject: "Mathematiques",
  exam: "Baccalaureat",
  year: "2025",
  paperUrl: "LIEN_GOOGLE_DRIVE_DU_PDF",
  correction: "premium"
}
```

Valeurs possibles pour `correction` :

- `free` : corrige gratuit
- `premium` : corrige payant via WhatsApp
- `coming` : corrige bientot disponible

## Deploiement Vercel

1. Cree un repository GitHub.
2. Ajoute ces fichiers.
3. Connecte le repository a Vercel.
4. Vercel detectera automatiquement un site statique.
