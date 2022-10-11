FROM node:16-alpine3.16
WORKDIR /app

RUN apk update 

COPY ./package.json ./yarn.lock ./
RUN yarn install

COPY . .

# デフォルトで用意されているnodeユーザーに切り替える
COPY --chown=node:node . .
ENV PATH $PATH:/app/app/node_modules/.bin
EXPOSE 5173