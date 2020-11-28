#!/bin/bash

echo What is the docker container version number?
read VERSION

docker build -t stevenmchenry01/whisker:$VERSION .
docker push stevenmchenry01/whisker:$VERSION

ssh root@138.68.9.107 "docker pull stevenmchenry01/whisker:$VERSION && docker tag stevenmchenry01/whisker:$VERSION dokku/whisker_server:$VERSION && dokku deploy whisker_server $VERSION"