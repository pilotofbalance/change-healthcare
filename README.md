## Description

The mini-MS system contains 3 microservices that communicates with each other.
All 3 services dockerized and can be run with docker-compose.

- Ui-Client is available under http://localhost:80

- Client-Arrays-Service is available under http://localhost:3001, you can find API documentation under
http://localhost:3001/swagger

- Log-Service is available under http://localhost:3002, you can find API documentation under
http://localhost:3002/swagger

## Installation
Make sure you have Docker and docker compose installed on your pc.

```bash
$ docker-compose build
```

## Running the app

```bash
$ docker-compose up
# development
make sure switch to Dockerfile.dev

# production mode
$ make sure switch to Dockerfile
```

