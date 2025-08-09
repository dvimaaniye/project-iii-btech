# Project Management System (PMS) API using NestJs

## Prerequisites
- docker

## Development Environment
Step 1. To start the dev env, run the following command:
```sh
docker compose up -d
```

Step 2. To complete the setup, we need to install the dependencies of the node app and generate client output for Prisma inside the container:
```sh
docker compose exec node sh
# executed inside container from here on
./docker/node/setup.sh
```

Step 3. Once the setup is done, you can start the Nest application in the same container by:
```sh
pnpm run start:dev 
# or `pnpm run start` if you don't want watch mode
```

### Stopping the containers
Once you are done, use the following command on the host to stop and remove the containers:
```sh
docker compose down
```

### Need to rebuild the image?
If you edit the Dockerfile or want to rebuild for some reason, then you can run the following command on the host without manually removing the old builds:
```sh
docker compose up --build -d
```

### MySQL and Redis Data
For persistence, the MySQL and Redis data is mounted in the container from `./docker/mysql/data` and `./docker/redis/data` respectively. See `docker-compose.yml` for exact details.
