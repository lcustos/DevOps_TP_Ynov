# TP Docker

## III/ Executer un serveur web dans un container docker

###  a) Recuperer l'image nginx

```
$ docker pull nginx
Using default tag: latest
latest: Pulling from library/nginx
Digest: sha256:c26ae7472d624ba1fafd296e73cecc4f93f853088e6a9c13c0d52f6ca5865107
Status: Image is up to date for nginx:latest
docker.io/library/nginx:latest
```

### b) Lister les images docker

```
$ docker image ls
REPOSITORY               TAG       IMAGE ID       CREATED         SIZE
nginx                    latest    e4720093a3c1   40 hours ago    187MB
docker/getting-started   latest    3e4394f6b72f   14 months ago   47MB
```
### c) Creer un fichier dans votre repo local ./html/index.html qui contient "Hello World"

```
$ mkdir ./html
$ echo "Hello World" > ./html/index.html
```

### d) Démarrer un nouveau container et servir la page html créée précédemment à l'aide d'une référence absolue

```
$ docker run -d -p 80:80 --name web_serv -v C:/Users/custo/Documents/ynov/Devops/DevOps_TP_Ynov/TP_DOCKER_1/html:/usr/share/nginx/html nginx
```
### e) Supprimer le container

```
docker stop web_serv
docker rm web_serv
```

###  f) Relancez le même container sans l'option -v puis utilisez la commande cp pour servir votre fichier (docker cp ARGS)

```
$ docker run --name web_serv -p 80:80 -d nginx
$ $ docker cp C:/Users/custo/Documents/ynov/Devops/DevOps_TP_Ynov/TP_DOCKER_1/html web_serv:/usr/share/nginx
```

## IV/ Builder une image

### a) A l'aide d'un Dockerfile, créer une image qui permet d'exécuter un serveur web (apache, nginx)

```
$ touch dockerfile

$ echo FROM nginx:1.10.1-alpine >> dockerfile
 
```
```
$ cat dockerfile
FROM nginx

```
```
$ docker build -t webserv .

$ docker image ls
REPOSITORY               TAG       IMAGE ID       CREATED         SIZE
mapremiereimage          latest    c90a96d3f215   42 hours ago    187MB
nginx                    latest    e4720093a3c1   42 hours ago    187MB
docker/getting-started   latest    3e4394f6b72f   14 months ago   47MB
webserv                  latest    99a9580dc363   7 years ago     54MB

$ docker run -d --name web_serv -p 80:80 webserv
```

### b) Exécuter cette nouvelle image de manière à servir ./html/index.html

```
$ echo COPY html/index.html /usr/share/nginx/html >> dockerfile

$ cat dockerfile
FROM nginx
COPY html/index.html /usr/share/nginx/html >> dockerfile

$ docker build -t webserv2 .

$ docker run -d --name web_serv2 -p 80:80 webserv2
```

### c) Quelles différences observez-vous entre les questions 3. et 4., trouvez les avantages & inconvénients de chaque procédure (mount volume VS copy)

Volume Mount (Question 3) :

Avantages :

Les fichiers peuvent être modifiés sur l'hôte et les modifications seront immédiatement reflétées dans le container. Il n'est pas nécessaire de reconstruire l'image pour les mises à jour de contenu. Utile pour le développement où le code change fréquemment.

Inconvénients :

Le chemin doit être correct sur l'hôte, ce qui peut introduire des erreurs ou des problèmes de compatibilité entre les environnements. Les volumes peuvent parfois poser des problèmes de permissions entre l'hôte et le container.

Image avec COPY (Question 4) :

Avantages :

L'image est autonome et peut être transférée ou déployée sans dépendre des chemins de l'hôte. Plus sécurisé car il n'y a pas de montage direct de fichiers hôte-container qui pourrait exposer votre système hôte.

Inconvénients :

Pour chaque modification du fichier, l'image doit être reconstruite et le container redémarré. Moins pratique pour le développement rapide car cela implique un cycle de reconstruction.

## V/ Utiliser une base de données dans un container docker

### a) Récuperer les images mysql (ou mariaDb) et phpmyadmin/phpymyadmin depuis le docker hub

```
docker pull mysql
docker pull phpmyadmin
```

## b) Lancer 2 container à partir des images

```
$ docker run --name mysql -d -e MYSQL_ROOT_PASSWORD=root --resta
rt unless-stopped mysql
$ docker run --name phpmyadmin -d -p 80:80 -e PMA_HOST=mysql phpmyadmin

$ docker network create my-network
$ docker network connect my-network mysql
$ docker network connect my-network phpmyadmin
```

## VI/ Utilisation de docker-compose.yml

### a) Allez lire le document de docker-compose et essayer de decrire à quoi sert cette commande VS la commande docker run.

Docker run est entièrement basé sur la ligne de commande, tandis que docker-compose lit les données de configuration à partir d'un fichier YAML. La deuxième différence majeure est que docker run ne peut démarrer qu'un conteneur à la fois, tandis que docker-compose configurera et exécutera plusieurs conteneurs.

### b)Quelle commande permet de lancer tous les containers du fichier yml ? Quelle commande permet de les stopper ?
```
 docker-compose up -d

 docker-compose stop
```

### c) Ecrivez un fichier docker-compose.yml pour servir votre base de données (mysql, mariadb, etc.) ET phpmyadmin

```
version: "3.9"
services:
  mysql:
    image: mysql
    environment:
      MYSQL_ROOT_PASSWORD: "super-secret-password"
    volumes:
      - dbData:/var/lib/mysql
  phpmyadmin:
    image: phpmyadmin
    environment:
      PMA_HOST: mysql
      PMA_PORT: 3306
    restart: always
    ports:
      - 80:80
volumes:
  dbData:
```





