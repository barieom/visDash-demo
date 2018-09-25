#!/bin/bash

version=$5

echo vm ssh
# apt-get install sshpass
# sshpass -p $2 ssh -o StrictHostKeyChecking=no $1
ssh $1@machine

# ssh $1
# expect "password"
# send $2
# interact

#!/bin/bash
echo setting up docker to pull
docker login -u $3 -p $4 quay.io
# docker stop $(docker ps -aq)
# docker rm $(docker ps -aq)
# docker rmi $(docker images -aq)

# echo docker pull and run
# docker pull quay.io/++++/ev
# docker run -p 80:5000 
