#echo $1 $2
#docker login -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD"
#docker build -t artsdatabanken/nin-innsyn:latest .
#docker images
#docker push artsdatabanken/nin-innsyn:latest
tar -zcf nin-kart-frontend.tar.gz /master
echo Sending files to prod
sshpass -p $scp_pass scp -o StrictHostKeyChecking=no nin-kart-frontend.tar.gz $scp_user@158.38.128.51:/tmp