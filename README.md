# authenticate.js
Provides a lightweight authentication service based on an Express server and token-based authentication with JWTs. Uses Bcrypt for encryption and is intended to be used with the MongoDB database.
## Docker Hub
The repository is available on Docker Hub: [Authenticate.js](https://registry.hub.docker.com/r/auldo99/authenticate.js)
## Usage
Usage with docker is strongly recommended. An example docker-compose file including a database is shown in the following.
```
version: '3.7'
services:

  authenticationdb:
    container_name: authenticationdb
    image: mongo:latest
    restart: always
    environment:
      - MONGO_INITDB_ROOT_USERNAME=root
      - MONGO_INITDB_ROOT_PASSWORD=pword

  authenticationserver:
    container_name: authenticationserver
    image: auldo99/authenticate.js
    restart: always
    environment:
      - DB_HOST=authenticationdb
      - DB_PORT=27017
      - DB_USER=root
      - DB_PW=pword
    ports:
      - "3000:3000"
    depends_on:
      - authenticationdb
```