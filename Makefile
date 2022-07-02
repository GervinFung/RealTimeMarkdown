## declare PHONY
.PHONY: build all
MAKEFLAGS += --silent
# ref: https://stackoverflow.com/questions/27282660/setting-environment-variables-in-a-makefile
# export NODE_ENV=development

all:
	make lint &&\
		make typecheck &&\
		make format-check &&\
		make build

NODE_BIN=node_modules/.bin/

## install dev server
install-server:
	cd server && yarn

## type check
typecheck:
	$(NODE_BIN)tsc -p tsconfig.json $(arguments) 

typecheck-watch:
	make typecheck arguments=--w

## serve
serve:
	node server

## start
start:
	(trap 'kill 0' INT; make serve & make build & make typecheck-watch)

## transpile
transpile:
	node script/esbuild.js
		&& cd build/ && cp index.html 200.html && cd ../

## build
pre-build:
	rm -rf build && cp -R public build

build: pre-build
	make transpile

## format
prettier=$(NODE_BIN)prettier
prettify:
	$(prettier) --$(type) src/

format-check:
	make prettify type=check

format:
	make prettify type=write

## lint
lint:
	$(NODE_BIN)eslint src/** -f='stylish' --color
