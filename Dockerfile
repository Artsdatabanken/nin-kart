FROM halverneus/static-file-server

EXPOSE 8080

WORKDIR /app
COPY package.json yarn.lock ./
RUN apt-get install yarn
RUN yarn install --frozen-lockfile --no-cache --production
RUN yarn test
RUN yarn build
COPY . .
