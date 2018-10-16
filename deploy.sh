echo $1 $2
docker login -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD"
docker build -t ratatouille .
docker images
docker push Artsdatabanken/ratatouille:latest