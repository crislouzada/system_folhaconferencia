# 🚀 Guia Rápido - Docker

## Iniciar Sistema (Automático)

```bash
./start.sh
./publish.sh   # publica e mostra os links (local/externo)
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
1. **Interface (mesmo host)**: http://localhost:5001
2. **Interface (outro computador)**: http://SEU_IP:5001
3. **Ajuda**: http://localhost:5001/ajuda.html
4. **Health**: http://localhost:5001/health

Observação: o frontend usa o mesmo host da página (`window.location.origin`).
Se acessar de outro PC, a página chamará a API no mesmo host/porta automaticamente.

## Verificar Status
## Publicar rapidamente

```bash
./publish.sh
```

O script:
- Para instâncias antigas
- Faz build e sobe o container
- Aguarda o health check
- Imprime os links `http://localhost:5001` e `http://SEU_IP:5001`

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
