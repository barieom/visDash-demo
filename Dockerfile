FROM node:8.9.1

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 80
CMD ["node", "server.js"]