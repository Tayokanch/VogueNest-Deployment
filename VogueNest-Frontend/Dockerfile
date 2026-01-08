# Stage 1: Build
FROM node:lts-alpine AS build

WORKDIR /app

# Install all dependencies (including dev)
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Compile TypeScript
RUN npx tsc

# Stage 2: Production image
FROM node:lts-alpine

WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy compiled JS from build stage
COPY --from=build /app/dist ./dist

COPY ./nginx/vogueshopping.conf /etc/nginx/conf.d/vogueshopping.conf

ENV PORT=3000

EXPOSE ${PORT}


CMD ["nginx", "-g", "daemon off;"]
