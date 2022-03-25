FROM node:16.14.0

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install --silent

ARG DB_USER
ARG DB_PW
ARG DB_HOST
ARG DB_PORT

ENV DB_USER $DB_USER
ENV DB_PW $DB_PW
ENV DB_HOST $DB_HOST
ENV DB_PORT $DB_PORT

COPY ./core ./core
COPY ./model ./model
COPY ./routes ./routes
COPY ./util ./util

CMD ["npm", "start"]