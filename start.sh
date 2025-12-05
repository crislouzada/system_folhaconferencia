#!/bin/bash

# Script para iniciar o sistema completo

echo "🚀 Iniciando Sistema de Conferência de Folha de Pagamento..."
echo ""

# Verificar se Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker não encontrado. Por favor, instale o Docker primeiro."
    exit 1
fi

# Verificar se Docker Compose está disponível
if ! command -v docker-compose &> /dev/null; then
    echo "⚠️  docker-compose não encontrado. Usando docker compose..."
    DOCKER_COMPOSE="docker compose"
else
    DOCKER_COMPOSE="docker-compose"
fi

# Parar containers antigos se existirem
echo "🛑 Parando containers antigos..."
$DOCKER_COMPOSE down 2>/dev/null

# Build e iniciar
echo "🔨 Construindo imagem Docker..."
$DOCKER_COMPOSE build

echo "🚀 Iniciando container..."
$DOCKER_COMPOSE up -d

# Aguardar servidor iniciar
echo "⏳ Aguardando servidor iniciar..."
sleep 5

# Verificar health
echo "🔍 Verificando status..."
for i in {1..10}; do
    if curl -s http://localhost:5001/health > /dev/null 2>&1; then
        echo ""
        echo "✅ Servidor iniciado com sucesso!"
        echo ""
        echo "════════════════════════════════════════════════════════"
        echo "📊 SISTEMA DE CONFERÊNCIA DE FOLHA - PRONTO PARA USO"
        echo "════════════════════════════════════════════════════════"
        echo "🌐 Backend API: http://localhost:5001"
        echo "📄 Interface:   Abra o arquivo index_v2.html no navegador"
        echo "🆘 Ajuda:       Abra o arquivo ajuda.html no navegador"
        echo "════════════════════════════════════════════════════════"
        echo ""
        echo "📝 Comandos úteis:"
        echo "   Ver logs:    $DOCKER_COMPOSE logs -f"
        echo "   Parar:       $DOCKER_COMPOSE down"
        echo "   Reiniciar:   $DOCKER_COMPOSE restart"
        echo ""
        
        # Tentar abrir interface automaticamente (macOS)
        if [[ "$OSTYPE" == "darwin"* ]]; then
            echo "🌐 Abrindo interface no navegador..."
            open index_v2.html
        fi
        
        exit 0
    fi
    echo -n "."
    sleep 2
done

echo ""
echo "⚠️  Servidor demorou para iniciar. Verificando logs..."
$DOCKER_COMPOSE logs --tail=50

exit 1
