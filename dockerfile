FROM node:14

EXPOSE 8089

WORKDIR /app/src

COPY /src/ /app/src

WORKDIR /app

COPY package*.json ./
COPY server.js ./

RUN npm install

CMD ["node", "server.js"]