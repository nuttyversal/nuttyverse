FROM nixos/nix AS build
WORKDIR /src
COPY . .
WORKDIR /src/fonts
RUN nix-shell --run "just build"
RUN nix-shell --run "just subset"

FROM alpine:3.18
COPY --from=build /src/fonts/target/release/font-force-field /usr/local/bin/
COPY --from=build /src/fonts/horcruxes /usr/local/share/fonts

ENV FONT_DIRECTORY /usr/local/share/fonts
CMD ["font-force-field"]
