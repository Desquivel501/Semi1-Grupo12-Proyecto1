# Version node
FROM node:19.7

#Creacion del directorio de trabajo
WORKDIR /app

COPY . .

#Comando para instalar dependencias
RUN npm install

#Puerto a exponer
EXPOSE 3000

CMD ["npm", "run","dev"]
