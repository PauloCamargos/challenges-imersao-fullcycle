FROM node:15

WORKDIR /usr/src
COPY ./app/package*.json .
RUN npm install
ENV PATH /usr/src/node_modules/.bin:$PATH

WORKDIR /usr/src/app

EXPOSE 3000