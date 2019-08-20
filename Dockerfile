FROM node:latest
WORKDIR /usr/src/app

COPY ./src /usr/src/app/src

COPY package*.json /usr/src/app/
COPY server.js /usr/src/app/

COPY .env-docker /usr/src/app/
RUN ["mv", ".env-docker", ".env"]

RUN npm install

EXPOSE 8080
CMD [ "npm", "start" ]