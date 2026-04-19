#!/bin/bash
# First-time SSL certificate setup for brokenarrow.top
# Run ONCE on a fresh server before `docker compose up -d`
# Usage: bash init-letsencrypt.sh

set -e

DOMAIN="brokenarrow.top"
EMAIL="barthlolmewjojo0820@gmail.com"   # cert expiry notifications
CERT_PATH="/etc/letsencrypt/live/$DOMAIN"

echo "==> Checking Docker..."
docker compose version >/dev/null 2>&1 || { echo "ERROR: docker compose not found"; exit 1; }

# Start nginx with HTTP-only config so ACME challenge can be served
echo "==> Starting nginx (HTTP only) for ACME challenge..."
docker compose up -d web

echo "==> Waiting for nginx to be ready..."
sleep 3

# Obtain certificate via webroot
echo "==> Requesting certificate for $DOMAIN and www.$DOMAIN..."
docker compose run --rm certbot certbot certonly \
  --webroot \
  --webroot-path /var/www/certbot \
  --email "$EMAIL" \
  --agree-tos \
  --no-eff-email \
  -d "$DOMAIN" \
  -d "www.$DOMAIN"

echo "==> Certificate obtained. Reloading nginx with HTTPS config..."
docker compose exec web nginx -s reload

echo ""
echo "Done! Site is live at https://$DOMAIN"
echo "Certbot will auto-renew every 12 h via the certbot container."
