FROM node:18.15.0

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .
ADD docker-entrypoint-dev /

ENTRYPOINT [ "/bin/bash", "/docker-entrypoint-dev" ]
