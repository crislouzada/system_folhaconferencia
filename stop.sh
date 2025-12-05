#!/bin/bash

# Script para parar o sistema

echo "🛑 Parando Sistema de Conferência de Folha de Pagamento..."

# Verificar se Docker Compose está disponível
if ! command -v docker-compose &> /dev/null; then
    DOCKER_COMPOSE="docker compose"
else
    DOCKER_COMPOSE="docker-compose"
fi

# Parar containers
$DOCKER_COMPOSE down

echo "✅ Sistema parado com sucesso!"
