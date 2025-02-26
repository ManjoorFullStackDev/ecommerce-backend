FROM node:18

WORKDIR /app

RUN wget -qO - https://pgp.mongodb.com/server-6.0.asc | tee /etc/apt/trusted.gpg.d/mongodb-server-6.0.asc \
    && echo "deb http://repo.mongodb.org/apt/debian bookworm/mongodb-org/6.0 main" | tee /etc/apt/sources.list.d/mongodb-org-6.0.list \
    && apt update \
    && apt install -y mongodb-mongosh

COPY package*.json ./

RUN rm -rf node_modules && yarn install

COPY . .

EXPOSE 5001

CMD ["sh", "-c", "node run-migrations.js && yarn start"]