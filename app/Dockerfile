# ----------------------------------------------------------------------------------------------------------------------
#
#     ____             __             _____ __   
#    / __ \____  _____/ /_____  _____/ __(_) /__ 
#   / / / / __ \/ ___/ //_/ _ \/ ___/ /_/ / / _ \
#  / /_/ / /_/ / /__/ ,< /  __/ /  / __/ / /  __/
# /_____/\____/\___/_/|_|\___/_/  /_/ /_/_/\___/                                           
#
#
# For official documentation, see:
# https://docs.docker.com/engine/reference/builder/
#
# ----------------------------------------------------------------------------------------------------------------------

# ----------------------------------------------------------------------------------------------------------------------
# BUILD ENVIRONMENT
# ----------------------------------------------------------------------------------------------------------------------

# Set base image for build environment
# See available images at https://hub.docker.com/_/node
FROM node:16-alpine AS builder

# Set arguments
ARG ARG_APP_VERSION=0.0.1
ARG NODE_ENV=development

# Set environmental variables
ENV VERSION=${VERSION}
ENV NODE_ENV=${NODE_ENV}

# Install required packages
RUN apk update && apk add git && apk add -U tzdata && \
  cp /usr/share/zoneinfo/Europe/Helsinki /etc/localtime

# Set working directory
WORKDIR /opt/food-is-good

# Copy files from ./ to WORKDIR
COPY . .

# Add ./node_modules/.bin to $PATH
ENV PATH /opt/food-is-good/node_modules/.bin:$PATH

# Install required dependencies inside the container
RUN yarn install
RUN yarn cache clean --force
RUN yarn build:prod

# ----------------------------------------------------------------------------------------------------------------------
# SERVER ENVIRONMENT
# ----------------------------------------------------------------------------------------------------------------------

# Set base image for server environment
# See available images at https://hub.docker.com/_/nginx
FROM nginx:stable-alpine

# Set image labels
LABEL MAINTAINER="Matvei Kinner"
LABEL MAINTAINER_EMAIL="hello@matveikinner.com"

ARG APP_DIR=/opt/food-is-good

# Copy optimized React prodcution build to be served by the Nginx
COPY --from=0 ${APP_DIR}/dist /usr/share/nginx/html

# Copy Nginx configuration file
COPY --from=0 ${APP_DIR}/nginx.conf /etc/nginx/conf.d/default.conf

# Validate Nginx configuration file
RUN nginx -t

# For Docker container use "daemon off" as the directive tells Nginx to stay in the foreground
CMD ["nginx", "-g", "daemon off;"]

# Run healthcheck to see that the server responds
HEALTHCHECK --interval=30s --timeout=5s \
  CMD curl -f http://localhost:80 || exit 1