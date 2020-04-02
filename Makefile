#!make
.SILENT :
##
##
##         __   __   ___     __   ___        __
##   |\ | /  \ |  \ |__     |  \ |__   |\/| /  \
##   | \| \__/ |__/ |___    |__/ |___  |  | \__/
##
##
## Welcome to the Developer console!
##
##      usage: make <command> [service=<service_name>]
##
##      possible service_name values:
##          catalog, orders, users, nginx, db
##
##
##
## Available commands:
##
file?=''
service?='users-svc'

# Include common Make tasks
root_dir:=$(shell pwd)

help: ## This help dialog.
	    @IFS=$$'\n' ; \
    help_lines=(`fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//'`); \
    for help_line in $${help_lines[@]}; do \
        IFS=$$'#' ; \
        help_split=($$help_line) ; \
        help_command=`echo $${help_split[0]} | sed -e 's/^ *//' -e 's/ *$$//'` ; \
        help_info=`echo $${help_split[2]}` ; \
        printf "%-30s %s\n" $$help_command $$help_info ; \
    done
.PHONY: help

install: ## Installs all dependencies (docker for mac should be preinstalled)
	docker-compose build --parallel
	docker-compose up -d
	make stop
.PHONY: install

uninstall: ## Uninstalls dev environment
	docker-compose down -v
	docker-compose rm -s -v -f
.PHONY: uninstall

start: ## Starts all services
	docker-compose up
.PHONY: start

restart: ## Restarts all services
restart: stop start
.PHONY: restart

stop: ## Stops all services
	docker-compose stop
.PHONY: stop

status: ## Status for the services (alias to docker-compose ps)
	docker-compose ps
.PHONY: status

logs: ## View logs
	docker-compose logs -f ${service}
.PHONY: logs
