FROM node:alpine AS build-frontend
COPY . .
WORKDIR /app
RUN npm install
RUN npm run build

FROM python:alpine AS build-fonts
COPY . .
WORKDIR /app
RUN apk add --no-cache fish git
RUN pip install fonttools brotli
RUN fish scripts/subset-fonts.fish

FROM rust:bookworm AS build-backend
COPY . .
WORKDIR /nut
RUN cargo build --release

FROM debian:bookworm-slim
WORKDIR /nuttyverse
COPY --from=build-frontend /app/dist /nuttyverse/frontend
COPY --from=build-fonts /app/public/fonts /nuttyverse/fonts/
COPY --from=build-backend /nut/target/release/nut /nuttyverse/backend

EXPOSE 4000
CMD ["/nuttyverse/backend"]
