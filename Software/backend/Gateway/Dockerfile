FROM node:17-alpine

RUN npm install -g nodemon

WORKDIR /api

COPY package.json .

RUN npm install 

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]
