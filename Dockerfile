FROM node:latest

WORKDIR /reunion-api

COPY package*.json /reunion-api/

RUN npm install 

COPY . .

RUN npm run db-generate

RUN npm run build

ENV PORT ${PORT}
ENV DATABASE_URL ${DATABASE_URL}
ENV JWT_SECRET_KEY ${JWT_SECRET_KEY}

EXPOSE 3000

CMD ["npm", "start"]