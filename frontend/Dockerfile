FROM node:16-alpine AS build

WORKDIR /app

# Copia o requirements.txt e instala as dependências
COPY requirements.txt ./
RUN apk add --no-cache python3 make g++ \
    && npm install -g npm@9 \
    && npm install $(cat requirements.txt | tr '\n' ' ') \
    && apk del python3 make g++

# Copia o restante dos arquivos e constrói o projeto
COPY . .
RUN npm run build

# Estágio de produção
FROM nginx:alpine

# Copia os arquivos construídos
COPY --from=build /app/build /usr/share/nginx/html

# Copia a configuração do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]