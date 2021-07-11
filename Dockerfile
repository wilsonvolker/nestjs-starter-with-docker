# PRODUCTION DOCKERFILE
# ---------------------
# This Dockerfile allows to build a Docker image of the NestJS application
# and based on a NodeJS 14 image. The multi-stage mechanism allows to build
# the application in a "builder" stage and then create a lightweight production
# image containing the required dependencies and the JS build files.
#
# Dockerfile best practices
# https://docs.docker.com/develop/develop-images/dockerfile_best-practices/
# Dockerized NodeJS best practices
# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md
# https://www.bretfisher.com/node-docker-good-defaults/
# http://goldbergyoni.com/checklist-best-practice-of-node-js-in-production/

# Build stage
FROM node:14.17.3-alpine3.14 as builder

COPY . /usr/src/app

RUN chown -R node:node /usr/src/app

USER node
WORKDIR /usr/src/app

RUN yarn install --forzen-lockfile --production=false && yarn run build

FROM node:14.17.3-alpine3.14

# For handling Kernel signals properly
RUN apk add --no-cache tini

# Create the working directory, including the node_modules folder for the sake of assigning ownership in the next command
RUN mkdir -p /usr/src/app/node_modules

# Change ownership of the working directory to the node:node user:group
# This ensures that npm install can be executed successfully with the correct permissions
RUN chown -R node:node /usr/src/app

# Set the user to use when running this image
# Non previlage mode for better security (this user comes with official NodeJS image).
USER node

# Set the default working directory for the app
# It is a best practice to use the /usr/src/app directory
WORKDIR /usr/src/app

# Copy package.json, package-lock.json
# Copying this separately prevents re-running npm install on every code change.
#COPY --chown=node:node package*.json ./

COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/dist ./dist/

# Install dependencies.
# RUN yarn add -g @nestjs/cli
RUN yarn install --frozen-lockfile --production=true

# Necessary to run before adding application code to leverage Docker cache
#RUN yarn cache clean --force

# Bundle app source
COPY --chown=node:node . ./

# Build the app
#RUN yarn run build

# Run the web service on container startup
CMD [ "yarn", "start:prod" ]