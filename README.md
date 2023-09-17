## Installation

```bash
$ yarn install
```

## Environment variables

Create ```.env``` file in the root of the project and fill it with the variables from ```.env.example```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run with docker

```bash
# Start PostgreSQL database
$ docker-compose -f docker-compose.database.yml up -d

# Start application in watch mode
$ yarn run test:cov
```



## Project structure

The project is based on the [NestJS](https://docs.nestjs.com/) framework.
It is divided into 3 main modules:

### Api

This module contains all the controllers and Resolvers for the API endpoints. Each database model has its own module with graphql endpoints, sequelize models and services.

### Common

This module contains all the common code, abstraction, utilities that are used in multiple places in the application.

### Core

This module contains all the business logic of the application. Here took place initialization of ```Graphql Configuration```, ```Sequelize Configuration``` and ```Environment variables configuration```
