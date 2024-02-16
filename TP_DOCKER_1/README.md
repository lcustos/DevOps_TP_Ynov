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



