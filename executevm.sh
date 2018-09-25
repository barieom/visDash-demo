#!/bin/bash

version=$5

docker build -f ./Dockerfile -t "quay.io/__/ev:0.0.${BUILD_NUMBER}" \
-t "quay.io/__/ev:latest" .
docker login -u "${QUAY_USERNAME}" -p "${QUAY_PASSWORD}" quay.io
# While docker allows you to provide multiple tags while building, each tag must be individually pushed at the moment
docker push "quay.io/__/ev:0.0.${BUILD_NUMBER}"
docker push "quay.io/___/ev:latest"


echo vm ssh
scp ./runcontainer.sh StorefrontJenkins@___.net@ev.___.net:
ssh  StorefrontJenkins@__.net@ev.___.net "bash runcontainer.sh ${QUAY_USERNAME} ${QUAY_PASSWORD}"


