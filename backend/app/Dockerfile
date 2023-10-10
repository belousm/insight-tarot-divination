# syntax=docker/dockerfile:1
FROM node:18-alpine

WORKDIR /app

RUN npm install -g nodemon

COPY ["package.json", "package-lock.json*", "./"]
RUN npm install

COPY ["*.js", "./"]

CMD ["node", "index.js"]