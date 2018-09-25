version=$3
docker stop $(docker ps -aq)
docker rm $(docker ps -aq)
docker rmi $(docker images -aq)
docker login -u "$1" -p "$2" quay.io

docker run -d -p 80:5000 quay.io/____/ev:latest