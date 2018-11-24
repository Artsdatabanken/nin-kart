#!/bin/bash
if [ "$TRAVIS_BRANCH" == "master" ]; then
    curl -X POST --data-urlencode "payload={\"channel\": \"$1\", \"username\": \"travis not the band\", \"text\": \"$2\", \"icon_emoji\": \":ghost:\"}" https://hooks.slack.com/services/$SLACK_TOKEN
fi
