FROM node:alpine3.18 AS build
COPY . .
WORKDIR /src

# [NOTE] The Font Awesome NPM token is required to install the Font Awesome NPM
# package. You will need to specify the token as a secret when building the
# Docker image (--mount=type=secret,id=npm_token).
RUN --mount=type=secret,id=npm_token \
  echo "@fortawesome:registry=https://npm.fontawesome.com/" > ~/.npmrc && \
  echo "//npm.fontawesome.com/:_authToken=$(cat /run/secrets/npm_token)" >> ~/.npmrc

# Install dependencies.
RUN npm install -g pnpm
RUN pnpm install

# Build Storybook.
RUN pnpm build-storybook

# Serve Storybook.
FROM nginx:alpine3.18
COPY --from=build /src/storybook-static /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
