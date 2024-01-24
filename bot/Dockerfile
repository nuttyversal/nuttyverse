FROM node:alpine3.18
LABEL com.centurylinklabs.watchtower.stop-signal="SIGINT"
WORKDIR /src
COPY . .
RUN npm install
CMD ["npm", "run", "start"]
