# syntax=docker/dockerfile:1
FROM node:18-alpine

WORKDIR /front

RUN npm i -D @sveltejs/adapter-node@next

COPY . .

RUN npm install

ARG PUBLIC_HOST
ENV PUBLIC_HOST=${PUBLIC_HOST}

RUN npm run build

CMD ["node", "build/index"]