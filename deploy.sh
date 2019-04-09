#!/bin/bash
BRANCH=$1
if [ "$BRANCH" != "master" ]
then
echo "Zipping files"
#echo $1
tar --directory=build -zcf $BRANCH.tar.gz .
echo "Sending files to prod"
sshpass -p $scp_pass scp -o StrictHostKeyChecking=no $BRANCH.tar.gz $scp_user@$scp_dest
sleep 10
curl -X POST --data-urlencode "payload={\"channel\": \"$slack_chan\", \"username\": \"travis not the band\", \"text\": \"$slack_command\", \"icon_emoji\": \":ghost:\"}" https://hooks.slack.com/services/$SLACK_TOKEN
echo "Whats the value of this:"
echo $TRAVIS_PULL_REQUEST
if [ "${TRAVIS_PULL_REQUEST}" != "false" ]
then
echo "Posting to github ..."
echo $TRAVIS_REPO_SLUG
curl -H "Authorization: token ${GITHUB_TOKEN}" -X POST -d "{\"body\": \"Magic\"}" "https://api.github.com/repos/${TRAVIS_REPO_SLUG}/issues/${TRAVIS_PULL_REQUEST}/comments"
fi
else 
#docker login -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD"
docker login -u="$2" -p="$3"
docker build -t artsdatabanken/nin-innsyn:latest .
docker images
docker push artsdatabanken/nin-innsyn:latest
fi