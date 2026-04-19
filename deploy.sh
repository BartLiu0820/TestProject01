#!/bin/bash
# Direct VPS deployment — Ubuntu 24.04, no Docker
# Usage: sudo bash deploy.sh
# Installs nginx + certbot, deploys files, issues SSL cert for brokenarrow.top

set -e

DOMAIN="brokenarrow.top"
EMAIL="barthlolmewjojo0820@gmail.com"
SITE_DIR=/var/www/broken-arrow
NGINX_CONF=/etc/nginx/sites-available/broken-arrow

echo "==> Installing nginx and certbot..."
apt-get update -qq
apt-get install -y -qq nginx python3-certbot-nginx

echo "==> Creating site directory..."
mkdir -p "$SITE_DIR"

echo "==> Copying files..."
cp index.html factions.html units.html controls.html \
   style.css script.js \
   "$SITE_DIR/"

echo "==> Writing HTTP nginx config..."
cat > "$NGINX_CONF" <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN www.$DOMAIN;

    root $SITE_DIR;
    index index.html;
    charset utf-8;
    server_tokens off;

    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/javascript application/javascript image/svg+xml;

    location ~* \.(css|js|svg|png|jpg|ico|woff2?)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    location ~* \.html$ {
        expires -1;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    location / {
        try_files \$uri \$uri/ \$uri.html =404;
    }

    error_page 404 /index.html;
}
EOF

echo "==> Enabling site..."
ln -sf "$NGINX_CONF" /etc/nginx/sites-enabled/broken-arrow
rm -f /etc/nginx/sites-enabled/default

nginx -t && systemctl reload nginx

echo "==> Issuing SSL certificate via Let's Encrypt..."
certbot --nginx \
  -d "$DOMAIN" -d "www.$DOMAIN" \
  --email "$EMAIL" \
  --agree-tos \
  --no-eff-email \
  --redirect

echo "==> Enabling certbot auto-renewal timer..."
systemctl enable --now certbot.timer

echo ""
echo "Done! Site is live at https://$DOMAIN"
echo "Certificate will auto-renew via systemd certbot.timer."
