# -------- Stage 1: Build React --------
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build   

# -------- Stage 2: Nginx --------
FROM nginx:alpine

# Copy React build
COPY --from=build /app/dist /usr/share/nginx/html

# Copy site config (used by CENTRAL nginx routing)
COPY nginx/default /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
