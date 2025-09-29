# Usa uma imagem Node.js leve e estável
FROM node:20-alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copia os arquivos package.json e package-lock.json (se existir)
# para instalar as dependências.
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante do código da aplicação
COPY . .

# Expõe a porta que o aplicativo usará (ex: 3000)
EXPOSE 3000

# Comando para iniciar o servidor (assumindo que seu arquivo principal seja server.js)
CMD [ "node", "server.js" ]