FROM nginx:alpine

# Copy backend proxy config into conf.d/
COPY conf.d/backend.conf /etc/nginx/conf.d/backend.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
