FROM node:alpine

WORKDIR /app

COPY package.json package-lock.json jsconfig.json /app

RUN npm install

COPY src/ /app/src
COPY public/ /app/public

EXPOSE 8080

CMD ["npm", "run", "start"]
