FROM rust:alpine3.18 AS build
WORKDIR /src
COPY . .
WORKDIR /src/fonts
RUN apk add --no-cache fish just musl-dev python3 py3-fonttools py3-pip 
RUN cargo build --release
RUN pip install brotli fonttools
RUN ./scripts/subset-fonts.fish

FROM alpine:3.18
COPY --from=build /src/fonts/target/release/font-force-field /usr/local/bin/
COPY --from=build /src/fonts/horcruxes /usr/local/share/fonts/
ENV FONT_DIRECTORY /usr/local/share/fonts
CMD ["font-force-field"]
