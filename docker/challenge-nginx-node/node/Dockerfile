FROM node:15-alpine

WORKDIR /usr/src
ENV PATH /usr/src/node_modules/.bin:$PATH
COPY ./node/app/package*.json .
RUN npm install
