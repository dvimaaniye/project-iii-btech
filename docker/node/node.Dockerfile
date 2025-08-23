FROM node:22-alpine3.21 AS node

RUN npm i -g pnpm

USER node

WORKDIR /home/app

EXPOSE 3000
EXPOSE 5555
