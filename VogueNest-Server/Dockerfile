FROM node:lts-alpine

WORKDIR /app

COPY package*.json .

RUN npm install --omit=dev

COPY . .

# Compile TypeScript
RUN npx tsc

ENV PORT=3100

EXPOSE ${PORT}

# Run compiled JS
CMD ["node", "dist/server.js"]

