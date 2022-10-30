# Reunion Social Media API

This is challenge-1 I got while applying for internship at reunion.

## Problem Statement

Develop a social media REST API, with given endpoints.

## Tech stack

1. Node.js 
2. Typescript
3. Express.js
4. PostgreSQL
5. Prisma (ORM)
6. Docker

 ## Setup in your environment

 NOTE: Make sure you have docker and docker-compose installed in your system.

 1. At the root of the project ccreate  a ``.env ` file, and add the following code to it: 

 ```
 DATABASE_URL="postgresql://reunion:reunion@database:5431/reunion"
PORT=3000
JWT_SECRET_KEY=06250810f24bc862f4b519429dcef83580eaab9af9ef36ccaf0aaa6785fd46b50cd4200db837602097c1ba6c8d591f434bd49cc7c31d0b0df69666f37f788d6b
```

2. Run the following command to run the project.

```sh
docker-compose up -d --build
```

## Testing

> Use this postman [collection](https://app.getpostman.com/join-team?invite_code=6218e2c3106f8ede21d362e5ac384de6&target_code=4e2a42d0792be2d7c4b0d5f7ae2d0d6d) to test  the project, this workspace has all the essentials setted up for testing the api.

> If this postman collection is not accessible, please import [collection](./reunion.postman_collection.json) and [environment](./Reunion.postman_environment.json) to your postman app, using the files given at the root of the project.
