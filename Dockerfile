FROM nginx:1.27-alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy site config
COPY nginx.conf /etc/nginx/conf.d/app.conf

# Copy static files
COPY index.html factions.html units.html controls.html \
     style.css script.js \
     /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
