FROM node:18

WORKDIR /usr/src/app

RUN npm install -g typescript ts-node

COPY package*.json ./

RUN npm install

COPY . .

RUN npx tsc

EXPOSE 5000

CMD ["node", "dist/server.js"]
