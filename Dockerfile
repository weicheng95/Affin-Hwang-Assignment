FROM node:12.18.2-alpine3.9 as build-step

WORKDIR /app

# Only copy the package.json file to work directory
COPY package.json ./

# Copy yarn lock
COPY yarn.lock ./

# Install all Packages
RUN yarn

# Copy all other source code to work directory
COPY . .

# TypeScript
RUN yarn build

FROM keymetrics/pm2:12-alpine

ARG ENVIRONMENT

RUN mkdir -p /var/www/cim-api

WORKDIR /var/www/cim-api
COPY --from=build-step /app /var/www/cim-api

# Environment options: ["development", "test", "staging", "prod"]
CMD pm2-runtime start ecosystem.config.js --env $ENVIRONMENT