# Stage 1: Build
FROM node:lts-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

# Install TypeScript globally for this build stage
RUN npm install -g typescript

COPY . .

RUN npx tsc

# Stage 2: Production image
FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=build /app/dist ./dist

ENV PORT=3000
EXPOSE ${PORT}

CMD ["node", "dist/server.js"]
