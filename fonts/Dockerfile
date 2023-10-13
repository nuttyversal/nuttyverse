FROM rust:alpine3.18 AS build
WORKDIR /src
COPY . .
RUN apk add --no-cache musl-dev && \
	cargo build --release

FROM alpine:3.18
COPY --from=build /src/target/release/font-force-field /usr/local/bin/
CMD ["font-force-field"]
