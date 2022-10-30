FROM node:latest

ARG DATABASE_URL
WORKDIR /reunion-api

COPY package*.json /reunion-api/

RUN npm install 

COPY . .

RUN npm run db-generate

RUN npm run build

ENV PORT=3000
ENV DATABASE_URL=postgres://reunion:k4luKr043MqYFxwaQcfKSfLUKYHM8g6t@dpg-cdfcos4gqg4d3ghj8p8g-a.oregon-postgres.render.com/reunion
ENV JWT_SECRET_KEY=06250810f24bc862f4b519429dcef83580eaab9af9ef36ccaf0aaa6785fd46b50cd4200db837602097c1ba6c8d591f434bd49cc7c31d0b0df69666f37f788d6b

EXPOSE 3000

RUN npm run db-migrate

CMD ["npm", "start"]