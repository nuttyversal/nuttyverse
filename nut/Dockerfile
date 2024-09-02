FROM node:alpine AS build-frontend
COPY . .
WORKDIR /app
RUN npm install
RUN npm run build

FROM rust:alpine AS build-backend
COPY . .
WORKDIR /nut
RUN apk add --no-cache musl-dev
RUN cargo build --release

FROM alpine
WORKDIR /nuttyverse
COPY --from=build-frontend /app/dist /nuttyverse/frontend
COPY --from=build-backend /nut/target/release/nut /backend

EXPOSE 4000
CMD ["/nuttyverse/backend"]
