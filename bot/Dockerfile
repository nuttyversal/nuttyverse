FROM node:alpine3.18 AS build
WORKDIR /src
COPY . .
RUN npm install
CMD ["npm", "run", "start"]
