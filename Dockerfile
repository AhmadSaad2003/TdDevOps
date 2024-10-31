# Étape de construction
FROM node:alpine AS builder

# Chemin de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application (si nécessaire)
RUN npm run build

# Étape de production
FROM alpine:3.15 AS runner

# Chemin de travail
WORKDIR /app

# Copier uniquement les fichiers nécessaires depuis l'étape de build
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Installer uniquement les dépendances de production
RUN apk add --no-cache nodejs npm && npm install --production

# Commande d'exécution
CMD ["npm", "start"]
