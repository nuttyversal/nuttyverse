FROM node:alpine3.18
WORKDIR /src
COPY . .
RUN npm install
RUN npx tsc
ENTRYPOINT ["node", "dist/index.js"]
