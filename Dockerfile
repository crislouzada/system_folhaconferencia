FROM python:3.11-slim

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY requirements.txt .

# Instalar dependências
RUN pip install --no-cache-dir -r requirements.txt

# Copiar arquivos da aplicação
COPY server.py .
COPY index_v2.html .
COPY app_v2.js .
COPY ajuda.html .

# Expor porta
EXPOSE 5001

# Variáveis de ambiente
ENV FLASK_APP=server.py
ENV FLASK_ENV=production

# Comando para iniciar o servidor
CMD ["python", "server.py"]
