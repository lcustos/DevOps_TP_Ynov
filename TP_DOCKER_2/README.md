# TP2 Docker

## 2. Créer un dockerfile qui permet de lancer une application NodeJS

```
nano dockerfile

FROM node
WORKDIR /app
COPY package*.json ./
RUN npm install -g npm@10.4.0
COPY --chown=node:node . .
EXPOSE 3000
ENV HOST=0.0.0.0 PORT=3000
CMD [ "node", "server.js" ]
```

## 3. Utilisez docker pour lancer une image de base de données

```
$ docker run --name mysql -d -e MYSQL_ROOT_PASSWORD=root --restart unless-stopped mysql
```

## 4. Adapter le fichiers models/index.js et le db.config.js pour utiliser une base mysql plutôt que sqlite3

Il suffit de décommenter les lignes pour mysql et de mettre en commentaire les lignes pour sqlite

## 5. Créer un docker-compose.yml pour avoir 2 services (node et ds)

```
version: "3.9"

services:
  mysql:
    image: mysql
    environment:
      MYSQL_ROOT_PASSWORD: "root"
    expose:
      - 3306
  node:
    depends_on:
      - mysql
    build:
       context: .
       dockerfile: dockerfile
    restart: unless-stopped
    ports:
      - 3000:3000
volumes:
  db:
```

## 7. Utilisez les variables d'environment dans votre docker-compose ET adaptez l'application (db.config.js) pour utiliser ces variables

```
version: "3.9"

services:
  mysql:
    image: mysql
    env_file:
      - ./.env
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
    expose:
      - ${MYSQL_PORT}
  node:
    depends_on:
      - mysql
    build:
       context: .
       dockerfile: dockerfile
    restart: unless-stopped
    env_file:
      - ./.env
    ports:
      - ${NODE_PORT}:${NODE_PORT}
volumes:
  db:
```
Le db.config.js:
```
module.exports = {
    hostname: "mysql",
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: "mysql",
    port: process.env.MYSQL_PORT,
}
```

## 8. Faites en sorte d'isoler vos 2 servivces docker-compose sur le meme network.

```
version: "3.9"

services:
  mysql:
    image: mysql
    env_file:
      - ./.env
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
    expose:
      - ${MYSQL_PORT}
    networks:
          - network
  node:
    depends_on:
      - mysql
    build:
       context: .
       dockerfile: dockerfile
    restart: unless-stopped
    env_file:
      - ./.env
    ports:
      - ${NODE_PORT}:${NODE_PORT}
    networks:
        - network
networks:
    network:
        driver: bridge
volumes:
  db:
  ```

##Questions:
Q1: Le service ne demarre pas car le port
est deja utilisé

Q2: npm install --only=prod

Q2bis: Pour éviter d'installer des dependances inutiles

Q3: En executant la commande npm audit

Q4: En laissant le localhost en host name, celui qui repond est le node et pas le mysql c'est pour cela qu'il faut le changer pour le nom du mysql

  