# Usando a imagem oficial do Node.js
FROM node:latest

# Definindo o diretório de trabalho dentro do contêiner
WORKDIR /api

# Copiando todo o código-fonte para o diretório de trabalho
COPY . .

# Instalando as dependências da aplicação
RUN rm -rf node_modules
RUN npm i

# Comando para iniciar a aplicação
CMD ["npm", "start"]

# Expondo a porta que a api usará
EXPOSE 3000