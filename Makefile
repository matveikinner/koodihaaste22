# ----------------------------------------------------------------------------------------------------------------------
#
#     __  ___      __        _____ __   
#    /  |/  /___ _/ /_____  / __(_) /__ 
#   / /|_/ / __ `/ //_/ _ \/ /_/ / / _ \
#  / /  / / /_/ / ,< /  __/ __/ / /  __/
# /_/  /_/\__,_/_/|_|\___/_/ /_/_/\___/ 
#
#                                                         
# For official documentation, see
# https://www.gnu.org/software/make/manual/make.html
#
# ----------------------------------------------------------------------------------------------------------------------

# ----------------------------------------------------------------------------------------------------------------------
# INCLUDE
#
# Description:
# The include directive tells make to suspend reading the current makefile and read one or more other makefiles
#
# For official documentation, see
# https://www.gnu.org/software/make/manual/make.html#Include
#
# ----------------------------------------------------------------------------------------------------------------------

include docker.mk

# ----------------------------------------------------------------------------------------------------------------------
# VARIABLES
#
# Description:
# Custom variables
#
# For official documentation, see
# https://www.gnu.org/software/make/manual/make.html#Setting
#
# ----------------------------------------------------------------------------------------------------------------------

PROJECT_NAME = $(notdir $(PWD))
PORT ?= 80

# ----------------------------------------------------------------------------------------------------------------------
# ENVIRONMENT VARIABLES
#
# Description:
# Variable values of the top-level make can be passed to the sub-make through the environment by explicit request
#
# For official documentation, see
# https://www.gnu.org/software/make/manual/make.html#Environment
#
# ----------------------------------------------------------------------------------------------------------------------

export PORT

# ----------------------------------------------------------------------------------------------------------------------
# PHONY
#
# Description:
# A phony target is one that is not really the name of a file; rather it is just a name for a recipe to be executed
#
# For official documentation, see
# https://www.gnu.org/software/make/manual/make.html#Phony-Targets
#
# ----------------------------------------------------------------------------------------------------------------------

.PHONY: help docker

docker: docker_label docker_init

label:
	@echo ''
	@echo '    ______                __   _         ______                __'
	@echo '   / ____/___  ____  ____/ /  (_)____   / ____/___  ____  ____/ /'
	@echo '  / /_  / __ \/ __ \/ __  /  / / ___/  / / __/ __ \/ __ \/ __  / '
	@echo ' / __/ / /_/ / /_/ / /_/ /  / (__  )  / /_/ / /_/ / /_/ / /_/ /  '
	@echo '/_/    \____/\____/\__,_/  /_/____/   \____/\____/\____/\__,_/   '
	@echo ''

help: label docker_help