FROM node:10
#FROM mhart/alpine-node:10
#FROM halverneus/static-file-server

WORKDIR /app
RUN apt update && apt install -y --no-install-recommends apt-utils curl
RUN curl -o- -L https://yarnpkg.com/install.sh | /bin/bash

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --no-cache
COPY . .
RUN yarn test && \
    yarn build && \
    yarn prune && \
    yarn cache clean


CMD [ "yarn", "start" ]
EXPOSE 3000
