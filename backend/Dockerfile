FROM node:16-alpine

WORKDIR /app

# Copia o requirements.txt e instala as dependências
COPY requirements.txt ./
RUN apk add --no-cache python3 make g++ \
    && npm install -g npm@9 \
    && npm install $(cat requirements.txt | tr '\n' ' ') \
    && apk del python3 make g++

# Copia o restante dos arquivos
COPY . .

EXPOSE 3000

CMD ["node", "server.js"]