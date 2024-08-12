# @tk/server-api

## Introduction

This project is a server API built with TypeScript and Express, supporting multiple environments for development, testing, and production.

## Multi-Environment Setup

To configure different environments, follow these steps:

1. Create an `.env` file in the `src/secrets/env/` folder for each environment (e.g., `.env.dev`, `.env.prod`, etc.).
2. Copy the contents of the `env.example` file into the new `.env` files and update the values as needed for each environment.

### Example `.env` Files

- `env.dev`

  PORT="your_system_port"
  NODE_ENV="development"
  DB_ADDRESS="your_mongodb_address"

## Environment Variables

The env.example file contains the following variables:

PORT: The port number the server will run on.
NODE_ENV: The environment mode (development, production, etc.).
DB_ADDRESS: The address of the MongoDB database.

## NPM Commands

The following npm commands are available for building, starting, and testing the application:

## Start in Production (Development Mode)

npm run start:prod
This command sets the environment to production and starts the server using ts-node-dev for hot-reloading.

## Build the Project

npm run build
This command compiles the TypeScript code into JavaScript.

## Build and Start in Production

npm run build:start:prod

This command uses env-cmd to load the .env.prod file and then starts the server with the built code.

## Lint the Code

npm run lint
This command runs ESLint to check for code quality and style issues.

## Getting Started

npm install
npm run start:example

## Customizing Scripts for Different Environments

You can create custom scripts for different environments by modifying the scripts section of your package.json file. Here’s how you can set up scripts for various environments:

## Create a New Script

To create a new script for an environment, add an entry to the scripts section of package.json with a name indicating the environment. Use env-cmd to load the appropriate .env file, and nodemon or node to start the server.

"scripts": {
"build:start:example": "env-cmd -f ./src/secrets/env/.env.example node ./dist/server.js",
"start:example": "cross-env ENVIRONMENT=example nodemon --exec ts-node-dev -r tsconfig-paths/register src/server.ts",
"build:start:dev": "env-cmd -f ./src/secrets/env/.env.dev node ./dist/server.js",
"start:dev": "cross-env ENVIRONMENT=dev nodemon --exec ts-node-dev -r tsconfig-paths/register src/server.ts"
}

## Block src/secrets folder in .gitignore file

Remember to block the secrets folder in .gitignore file.
