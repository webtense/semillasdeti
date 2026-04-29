#!/usr/bin/env bash
# Deploy semillasdeti.com → webtenseenergy.com
# Uso: ./ops/deploy.sh
set -euo pipefail

SERVER="root@webtenseenergy.com"
SSHPASS_CMD="sshpass -p '3802Z0ra!'"
REMOTE_DIR="/var/www/semillasdeti"
SERVICE="semillasdeti"
WEB_DIR="$(cd "$(dirname "$0")/../web" && pwd)"

echo "▶ Building..."
cd "$WEB_DIR"
npm run build

echo "▶ Packaging..."
tar -czf /tmp/semillas-deploy.tar.gz dist/ src/data/

echo "▶ Uploading..."
sshpass -p "3802Z0ra!" scp /tmp/semillas-deploy.tar.gz "$SERVER:/tmp/"

echo "▶ Deploying..."
sshpass -p "3802Z0ra!" ssh "$SERVER" "
  cd $REMOTE_DIR
  tar -xzf /tmp/semillas-deploy.tar.gz
  chown -R $SERVICE:$SERVICE src/ dist/
  systemctl restart $SERVICE
  sleep 2
  systemctl is-active $SERVICE && echo '✓ Service running' || echo '✗ Service failed'
  rm /tmp/semillas-deploy.tar.gz
"

rm /tmp/semillas-deploy.tar.gz
echo "✓ Deploy completed"
