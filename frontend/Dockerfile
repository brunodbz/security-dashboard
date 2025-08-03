FROM node:16-alpine AS build

WORKDIR /app

# Copia o package.json e package-lock.json
COPY package*.json ./

# Instala as dependências com --legacy-peer-deps para evitar conflitos
RUN npm install --legacy-peer-deps

# Copia o restante dos arquivos
COPY . .

# Constrói o projeto
RUN npm run build

# Estágio de produção
FROM nginx:alpine

# Copia os arquivos construídos
COPY --from=build /app/build /usr/share/nginx/html

# Copia a configuração do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]