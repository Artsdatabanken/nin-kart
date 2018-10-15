FROM node:10
#FROM mhart/alpine-node:10
#FROM halverneus/static-file-server

WORKDIR /app
RUN apt update \
    && apt install -y apt-utils curl
#RUN apk update \
#    && RUN apk add --no-cache curl
RUN curl -o- -L https://yarnpkg.com/install.sh | /bin/bash

COPY package.json yarn.lock ./

#RUN npm install -g -s --no-progress yarn && \
RUN yarn install --frozen-lockfile --no-cache --production
RUN yarn test && \
    yarn build && \
    yarn prune && \
    yarn cache clean


COPY . .
CMD [ "yarn", "start" ]
EXPOSE 3000
