# Studio Site — GitHub Pages Deploy

## Quick Start

```bash
# 1. Clona/copia questi file in un nuovo repo
git init && git add . && git commit -m "init"

# 2. Installa dipendenze
npm install

# 3. Dev locale
npm run dev

# 4. Build di produzione
npm run build
```

## Deploy su GitHub Pages

### Setup (una volta sola)

1. Crea un repo su GitHub e pusha il codice
2. Vai su **Settings → Pages**
3. In "Build and deployment" → Source: seleziona **GitHub Actions**
4. In `vite.config.js`, cambia `'/your-repo-name/'` col nome del tuo repo

### Deploy automatico

Ogni push su `main` triggera la GitHub Action che builda e deploya automaticamente.

Il sito sarà disponibile su: `https://tuousername.github.io/your-repo-name/`

### Custom Domain (opzionale)

1. In **Settings → Pages → Custom domain**, inserisci il tuo dominio
2. Aggiungi nei DNS del tuo dominio un CNAME record che punta a `tuousername.github.io`
3. Cambia `base` in `vite.config.js` a `'/'`
