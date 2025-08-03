FROM node:16-alpine

WORKDIR /app

# Copia o package.json e package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos
COPY . .

EXPOSE 3000

CMD ["node", "server.js"]