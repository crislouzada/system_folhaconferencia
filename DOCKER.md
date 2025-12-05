# Docker - Sistema de Conferência de Folha

## 🐳 Executar com Docker

### Opção 1: Docker Compose (Recomendado)

```bash
# Build e iniciar
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar
docker-compose down
```

### Opção 2: Docker direto

```bash
# Build da imagem
docker build -t sistema-folha-conferencia .

# Executar container
docker run -d \
  --name folha-conferencia \
  -p 5001:5001 \
  sistema-folha-conferencia

# Ver logs
docker logs -f folha-conferencia

# Parar container
docker stop folha-conferencia
docker rm folha-conferencia
```

## 📂 Acessar a Aplicação

Após iniciar o container:

1. **Backend API**: http://localhost:5001
2. **Interface Web**: Abra o arquivo `index_v2.html` no navegador
3. **Central de Ajuda**: Abra o arquivo `ajuda.html` no navegador

## 🔍 Verificar Status

```bash
# Health check
curl http://localhost:5001/health

# Status do container
docker ps | grep folha

# Logs em tempo real
docker logs -f sistema-folha-conferencia
```

## 🛠️ Comandos Úteis

```bash
# Reiniciar container
docker-compose restart

# Ver uso de recursos
docker stats sistema-folha-conferencia

# Acessar shell do container
docker exec -it sistema-folha-conferencia /bin/bash

# Remover container e imagem
docker-compose down --rmi all
```

## 📊 Variáveis de Ambiente

Você pode personalizar através do `docker-compose.yml`:

```yaml
environment:
  - FLASK_APP=server.py
  - FLASK_ENV=production  # ou development
  - MAX_CONTENT_LENGTH=50000000  # 50MB
```

## 🔒 Segurança

- O container roda em modo produção
- CORS configurado para localhost
- Uploads limitados a 50MB
- Health check automático

## 📝 Notas

- O servidor roda na porta 5001 (mapeada para host)
- Arquivos HTML devem ser abertos diretamente no navegador
- Não é necessário instalar Python ou dependências no host
- Dados não são persistidos (processamento em memória)
