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

FROM python:alpine AS build-fonts
COPY . .
WORKDIR /nut/fonts
RUN apk add --no-cache fish git
RUN pip install fonttools brotli
RUN fish subset-fonts.fish

FROM alpine
WORKDIR /nuttyverse
COPY --from=build-frontend /app/dist /nuttyverse/frontend
COPY --from=build-backend /nut/target/release/nut /nuttyverse/backend
COPY --from=build-fonts /nut/fonts/fragments /nuttyverse/fonts/

EXPOSE 4000
CMD ["/nuttyverse/backend"]
