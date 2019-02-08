echo $1 $2
docker login -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD"
docker build -t artsdatabanken/nin-innsyn:latest .
docker images
docker push artsdatabanken/nin-innsyn:latest