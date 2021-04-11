#!/bin/bash

docker stop muselab_server
docker rm muselab_server
docker build . -t muselab_server
docker run -it --init -p 8080:8080 --name muselab_server -d muselab_server
docker logs muselab_server
