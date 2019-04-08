if ["$1" != "master"]
then
echo "Zipping files"
#echo $1
tar --directory=build -zcf $1.tar.gz .
echo "Sending files to prod"
sshpass -p $scp_pass scp -o StrictHostKeyChecking=no $1.tar.gz $scp_user@158.38.128.51:/tmp/test
curl -X POST --data-urlencode "payload={\"channel\": \"$2\", \"username\": \"travis not the band\", \"text\": \"$3\", \"icon_emoji\": \":ghost:\"}" https://hooks.slack.com/services/$SLACK_TOKEN
else 
docker login -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD"
docker build -t artsdatabanken/nin-innsyn:latest .
docker images
docker push artsdatabanken/nin-innsyn:latest
fi