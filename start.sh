#!/bin/bash

docker-compose down
docker-compose up -d --build --force-recreate --no-deps