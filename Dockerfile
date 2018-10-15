FROM node:10
#FROM mhart/alpine-node:10
#FROM halverneus/static-file-server

EXPOSE 3000

WORKDIR /app
RUN apt update \
    && apt install -y curl
#RUN apk update \
#    && RUN apk add --no-cache curl
RUN curl -o- -L https://yarnpkg.com/install.sh | /bin/bash \
    && apt remove git curl tar binutils
COPY package.json yarn.lock ./

#RUN npm install -g -s --no-progress yarn && \
RUN yarn install --frozen-lockfile --no-cache --production
RUN yarn test && \
    yarn build && \
    yarn prune && \
    yarn cache clean


COPY . .
CMD [ "yarn", "start" ]
