# Dockerized Express

* Follow **Typescript with Express Guide**
* Prepare **.dockerignore** file
* Prepare **dev.Dockerfile**
    *:point_right: Note: This sample uses node 8.15.1-slim*
    ```
    FROM node:8.15.1-slim

    WORKDIR /app

    RUN npm install -g yarn

    RUN npm config set registry http://registry.npmjs.org

    ADD package.json /app/package.json

    ADD yarn.lock /app/yarn.lock

    RUN yarn

    ADD . /app

    EXPOSE 3000 9229
    ```
* Prepare the **dev.docker-compose.yml**
    ```
   version: '3'
    services:

    # Server
    backend-service:
        container_name: backend-service
        build:
        context: .
        dockerfile: dev.Dockerfile
        command: 'npm run watch-debug'
        ports:
            - '3000:3000'
            - '9229:9229'
        volumes:
            - ./:/app
            - '/app/node_modules'
    ```
* Run the server on watch-debug mode *docker-compose -f "docker/express/dev.docker-compose.yml" up --build*
* Server is running on [**localhost:3000/test**](http://localhost:3000/test)
* Attach *VS Code Debugger* by choosing **Attach Docker Express**
