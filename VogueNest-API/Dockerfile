# ---------- Build stage ----------
FROM node:20-slim AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build  

# ---------- Runtime stage ----------
FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=build /app/dist ./dist

ENV PORT=3000

EXPOSE 3000

CMD ["node", "dist/server.js"]
