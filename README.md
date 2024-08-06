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
