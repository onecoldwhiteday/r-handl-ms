FROM node:8-alpine

ENV NODE_ENV=production

RUN mkdir /app
WORKDIR /app

COPY ../../Desktop/Новая%20папка/consumer/package.json .

RUN npm install --production

COPY ../../Desktop/Новая%20папка/consumer .

CMD ["npm", "start"]
