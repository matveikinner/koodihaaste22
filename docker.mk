# ----------------------------------------------------------------------------------------------------------------------
#
#        __           __                       __  
#   ____/ /___  _____/ /_____  _________ ___  / /__
#  / __  / __ \/ ___/ //_/ _ \/ ___/ __ `__ \/ //_/
# / /_/ / /_/ / /__/ ,< /  __/ /  / / / / / / ,<   
# \__,_/\____/\___/_/|_|\___/_(_)/_/ /_/ /_/_/|_|  
#                                                  
#
# For official documentation, see
# https://docs.docker.com/reference/
#
# ----------------------------------------------------------------------------------------------------------------------

# ----------------------------------------------------------------------------------------------------------------------
# VARIABLES
# ----------------------------------------------------------------------------------------------------------------------

DOCKER_TAG ?= latest
DOCKERFILE ?= Dockerfile
DOCKER_COMPOSE_DEVELOPMENT ?= compose.development.yml

# ----------------------------------------------------------------------------------------------------------------------
# GENERAL
# ----------------------------------------------------------------------------------------------------------------------

docker_label:
	@echo '    ____             __                _       ___                      __'
	@echo '   / __ \____  _____/ /_____  _____   | |     / (_)___  ____ __________/ /'
	@echo '  / / / / __ \/ ___/ //_/ _ \/ ___/   | | /| / / /_  / / __ `/ ___/ __  / '
	@echo ' / /_/ / /_/ / /__/ ,< /  __/ /       | |/ |/ / / / /_/ /_/ / /  / /_/ /  '
	@echo '/_____/\____/\___/_/|_|\___/_/        |__/|__/_/ /___/\__,_/_/   \__,_/   '

docker_init:
	@while [ -z "$$CONTINUE" ] && [ "$$CONTINUE" != "1" ] && [ "$$CONTINUE" != "2" ] && [ "$$CONTINUE" != "3" ] && \
	[ "$$CONTINUE" != "4" ]; do \
		echo ""; \
		echo "1. Build"; \
		echo "2. Run"; \
		echo "3. Compose"; \
		echo "4. Exit"; \
		echo ""; \
		read -r -p "> Select option to continue: $$CONTINUE" CONTINUE; \
		if [ "$$CONTINUE" = "1" ]; then \
			make docker_build; \
		elif [ "$$CONTINUE" = "2" ]; then \
			make docker_run; \
		elif [ "$$CONTINUE" = "3" ]; then \
			make docker_compose; \
		elif [ "$$CONTINUE" = "4" ]; then \
			echo "Exiting..."; \
		else \
			CONTINUE=""; \
		fi ; \
	done; \

docker_help:
	@echo ""
	@echo "Usage: make [TARGET]"
	@echo ""
	@echo "Docker Wizard:"
	@echo "  docker				Docker Wizard terminal CLI"
	@echo "  docker_build				Builds Docker image"
	@echo "  docker_run				Runs Docker image as container"
	@echo "  docker_compose				Docker Wizard utilities to interact with Docker compose commands"
	@echo ""

# ----------------------------------------------------------------------------------------------------------------------
# BUILD
#
# Description
# Build an image from a Dockerfile
#
# For official documentation, see
# https://docs.docker.com/engine/reference/commandline/build/
# ----------------------------------------------------------------------------------------------------------------------

docker_build:
	@echo "> Attempting to build Docker image ${PROJECT_NAME}:${DOCKER_TAG}..."; \
	docker build -t ${PROJECT_NAME}:${DOCKER_TAG} .; \
	make docker_init; \

# ----------------------------------------------------------------------------------------------------------------------
# RUN
#
# Description
# Run a command in a new container
#
# For official documentation, see
# https://docs.docker.com/engine/reference/commandline/run/
# ----------------------------------------------------------------------------------------------------------------------

docker_run:
	@while [ -z $$CONTINUE ]; do \
		read -r -p "Select port to continue (80 - 65535): $$CONTINUE" CONTINUE; \
		if [ $$CONTINUE -gt 79 ] && [ $$CONTINUE -lt 65536 ]; then \
			echo "> Running Docker container ${PROJECT_NAME}:${DOCKER_TAG} on localhost:$$CONTINUE"; \
			docker run -d -p $$CONTINUE:${PORT} ${PROJECT_NAME}:${DOCKER_TAG}; \
			make docker_init; \
		else \
			CONTINUE=""; \
		fi; \
	done; \

# ----------------------------------------------------------------------------------------------------------------------
# COMPOSE
#
# Description
# Define and run multi-container applications with Docker
#
# For official documentation, see
# https://docs.docker.com/compose/reference/overview/
# ----------------------------------------------------------------------------------------------------------------------

docker_compose:
	@while [ -z "$$CONTINUE" ] && [ "$$CONTINUE" != "1" ] && [ "$$CONTINUE" != "2" ] && [ "$$CONTINUE" != "3" ]; do \
		echo ""; \
		echo "1. Up"; \
		echo "2. Down"; \
		echo "3. Exit"; \
		echo ""; \
		read -r -p "> Select option to continue: $$CONTINUE" CONTINUE; \
		if [ "$$CONTINUE" = "1" ]; then \
			make docker_compose_up; \
		elif [ "$$CONTINUE" = "2" ]; then \
			make docker_run; \
		elif [ "$$CONTINUE" = "3" ]; then \
			echo "Exiting..."; \
		else \
			CONTINUE=""; \
		fi ; \
	done; \

docker_compose_up:
	@echo "> Attempting to build and compose docker images..."; \
	docker-compose -f ${DOCKER_COMPOSE_DEVELOPMENT} up; \
	make docker_compose; \

docker_compose_down:
	@echo "> Attempting to stop and remove docker images..."; \
	docker-compose -f ${DOCKER_COMPOSE_DEVELOPMENT} down; \
	make docker_compose; \