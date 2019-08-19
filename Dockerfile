FROM node:latest
WORKDIR /usr/src/app

COPY .env /usr/src/app/
COPY package*.json /usr/src/app/
COPY server.js /usr/src/app/

RUN npm install

COPY ./src /usr/src/app

EXPOSE 8080
CMD [ "npm", "start" ]