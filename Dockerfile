# Use the official lightweight Nginx image
FROM nginx:alpine

# Copy your custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy your built static files to Nginx's public folder
COPY dist/ /usr/share/nginx/html

# Expose port 80 for access from host
EXPOSE 80

# Run Nginx in foreground (Docker best practice)
CMD ["nginx", "-g", "daemon off;"]
