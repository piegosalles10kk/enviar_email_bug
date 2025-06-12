# Usa uma versão leve do Node.js
FROM node:18-alpine

WORKDIR /app
COPY . .

RUN npm install
CMD ["npm", "start"]
EXPOSE 1000