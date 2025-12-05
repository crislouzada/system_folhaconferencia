# 🚀 Guia Rápido - Docker

## Iniciar Sistema (Automático)

```bash
./start.sh
```

Este script:
- ✅ Constrói a imagem Docker
- ✅ Inicia o container
- ✅ Verifica o health check
- ✅ Abre a interface no navegador (macOS)

## Parar Sistema

```bash
./stop.sh
```

## Testar Funcionamento

```bash
./test-docker.sh
```

## Comandos Docker Compose

```bash
# Iniciar
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar
docker-compose down

# Reiniciar
docker-compose restart
```

## Acessar Aplicação

Após iniciar:
1. **Backend**: http://localhost:5001
2. **Interface**: Abra `index_v2.html` no navegador
3. **Ajuda**: Clique no botão **?** ou abra `ajuda.html`

## Verificar Status

```bash
# Health check
curl http://localhost:5001/health

# Logs
docker logs -f sistema-folha-conferencia

# Status do container
docker ps | grep folha
```

## Solução de Problemas

### Container não inicia
```bash
docker-compose down
docker-compose up -d
docker-compose logs -f
```

### Porta 5001 ocupada
Edite `docker-compose.yml` e altere:
```yaml
ports:
  - "5002:5001"  # Ou outra porta disponível
```

### Reconstruir imagem
```bash
docker-compose down --rmi all
docker-compose build --no-cache
docker-compose up -d
```

---

📖 **Documentação completa**: [DOCKER.md](DOCKER.md)
