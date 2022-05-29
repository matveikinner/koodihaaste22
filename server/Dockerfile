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
# See available options at https://hub.docker.com/_/gradle
FROM gradle:7-jdk11 AS builder

# Set working directory
WORKDIR /opt/solidabis-server

# Copy files from ./ to WORKDIR
COPY build.gradle settings.gradle ./

COPY gradle ./gradle
COPY --chown=gradle:gradle . /home/gradle/src

USER root
RUN chown -R gradle /home/gradle/src

RUN gradle build || return 0
COPY . .
RUN gradle clean build

# ----------------------------------------------------------------------------------------------------------------------
# SERVER ENVIRONMENT
# ----------------------------------------------------------------------------------------------------------------------

# Set base image for server environment
# See available images at https://hub.docker.com/_/openjdk
FROM openjdk:11

# Set image labels
LABEL MAINTAINER="Matvei Kinner"
LABEL MAINTAINER_EMAIL="hello@matveikinner.com"

# Set Docker build variables
ENV ARTIFACT_NAME=koodihaaste22-0.0.1-SNAPSHOT.jar
ENV ROOT_DIR=/opt/solidabis-server

# Set working directory
WORKDIR $ROOT_DIR

COPY --from=0 /opt/solidabis-server/build/libs/$ARTIFACT_NAME .

ENTRYPOINT exec java -jar ${ARTIFACT_NAME}

# Run healthcheck to see that the server responds
HEALTHCHECK --interval=30s --timeout=5s \
  CMD curl -f http://localhost:8080 || exit 1