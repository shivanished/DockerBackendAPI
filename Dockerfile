FROM node:18.17.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ARG MONGODB_URI

ENV MONGODB_URI=$MONGODB_URI

EXPOSE 8080

CMD ["node", "server.js"]
