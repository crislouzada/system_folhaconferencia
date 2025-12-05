#!/bin/bash

# Script de teste para verificar funcionamento completo

echo "🧪 TESTE DE FUNCIONAMENTO COMPLETO"
echo "=================================="
echo ""

# 1. Verificar arquivos
echo "📁 Verificando arquivos necessários..."
files=("server.py" "index_v2.html" "app_v2.js" "ajuda.html" "Dockerfile" "docker-compose.yml")
missing=0

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file - FALTANDO"
        missing=$((missing + 1))
    fi
done

if [ $missing -gt 0 ]; then
    echo ""
    echo "❌ $missing arquivo(s) faltando!"
    exit 1
fi

echo ""
echo "✅ Todos os arquivos encontrados!"
echo ""

# 2. Testar Docker Build
echo "🐳 Testando Docker build..."
if docker build -t sistema-folha-test . > /dev/null 2>&1; then
    echo "✅ Build Docker bem-sucedido"
else
    echo "❌ Falha no build Docker"
    exit 1
fi

echo ""

# 3. Testar execução do container
echo "🚀 Testando execução do container..."
docker run -d --name folha-test-final -p 5003:5001 sistema-folha-test > /dev/null 2>&1

echo "⏳ Aguardando servidor iniciar..."
sleep 6

# 4. Testar health check
echo "🔍 Testando health check..."
if curl -s http://localhost:5003/health | grep -q "healthy"; then
    echo "✅ Health check OK"
else
    echo "❌ Health check falhou"
    docker stop folha-test-final > /dev/null 2>&1
    docker rm folha-test-final > /dev/null 2>&1
    exit 1
fi

echo ""

# 5. Verificar logs
echo "📋 Verificando logs do servidor..."
if docker logs folha-test-final 2>&1 | grep -q "SERVIDOR DE PROCESSAMENTO"; then
    echo "✅ Servidor iniciou corretamente"
else
    echo "❌ Servidor não iniciou corretamente"
    docker stop folha-test-final > /dev/null 2>&1
    docker rm folha-test-final > /dev/null 2>&1
    exit 1
fi

echo ""

# 6. Limpar
echo "🧹 Limpando containers de teste..."
docker stop folha-test-final > /dev/null 2>&1
docker rm folha-test-final > /dev/null 2>&1
docker rmi sistema-folha-test > /dev/null 2>&1

echo ""
echo "════════════════════════════════════════"
echo "✅ TODOS OS TESTES PASSARAM!"
echo "════════════════════════════════════════"
echo ""
echo "Sistema pronto para uso em Docker:"
echo "  ./start.sh  - Iniciar sistema"
echo "  ./stop.sh   - Parar sistema"
echo ""
echo "Ou usar Docker Compose:"
echo "  docker-compose up -d"
echo "  docker-compose down"
echo ""
