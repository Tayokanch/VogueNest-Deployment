# -------- Stage 1: Build --------
FROM node:lts-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files and install all dependencies
COPY package*.json ./
RUN npm install

# Install TypeScript globally for this build stage
RUN npm install -g typescript

# Copy the rest of your source code
COPY . .

# Compile TypeScript into JavaScript
RUN tsc

# -------- Stage 2: Production --------
FROM node:lts-alpine

# Set working directory
WORKDIR /app

# Copy only production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy compiled JavaScript from build stage
COPY --from=build /app/dist ./dist

# Optional: custom Nginx config
COPY ./nginx/vogueshopping.conf /etc/nginx/conf.d/vogueshopping.conf

# Expose port
EXPOSE 80

# Start the server
CMD ["nginx", "-g", "daemon off;"]
