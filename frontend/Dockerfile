# Usando a imagem oficial do Node.js
FROM node:18-alpine

# Definindo o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiando o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instalando as dependências da aplicação
RUN npm install

# Copiando todo o código-fonte para o diretório de trabalho
COPY . .

# Exposição da porta 3007 para o frontend
EXPOSE 3007

# Comando para iniciar a aplicação
CMD ["npm","run","start"]

