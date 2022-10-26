FROM node:18-alpine

WORKDIR /opt/restapi

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install --omit=dev

COPY ./app.js .
COPY ./src ./src/

EXPOSE 3000

CMD ["npm", "run", "serve"]
