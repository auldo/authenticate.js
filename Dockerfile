FROM node:16.14.0

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install --silent

COPY ./core ./core
COPY ./model ./model
COPY ./routes ./routes
COPY ./util ./util

CMD ["npm", "start"]