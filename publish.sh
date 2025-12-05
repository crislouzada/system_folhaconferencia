#!/usr/bin/env zsh
set -e

echo "🚀 Publicando Sistema de Conferência de Folha"

# Descobrir IP local para link externo
LOCAL_IP=$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null || ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -1)

echo "🔧 Parando instâncias antigas (se houver)"
docker-compose down || true

echo "🔨 Build e subida do container"
docker-compose up -d --build

echo "⏳ Aguardando health check..."
for i in {1..20}; do
  STATUS=$(curl -s http://localhost:5001/health || true)
  echo $STATUS | grep -q 'healthy' && break
  sleep 1
done

echo "✅ Pronto!"
echo "   - Local:   http://localhost:5001"
echo "   - Externo: http://${LOCAL_IP}:5001"

exit 0
