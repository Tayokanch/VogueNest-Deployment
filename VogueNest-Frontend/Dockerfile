# -------- Build stage --------
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package.json files first for caching
COPY package*.json ./
RUN npm install

# Copy the rest of the project
COPY . .

# Build the React app (produces /dist folder)
RUN npm run build

# -------- Production stage --------
FROM nginx:alpine

# Copy built React files into Nginx html folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: copy custom Nginx config
COPY ./nginx/vogueshopping.conf /etc/nginx/conf.d/vogueshopping.conf

# Expose port 80 for HTTP
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
