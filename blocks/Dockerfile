FROM node:alpine3.18 AS build
WORKDIR /src
COPY . .

# [NOTE] The Font Awesome NPM token is required to install the Font Awesome NPM
# package. You'll need to specify the token as a secret when building the image.
RUN --mount=type=secret,id=FONT_AWESOME_NPM_TOKEN,required \
  echo "@fortawesome:registry=https://npm.fontawesome.com/" > .npmrc && \
  echo "//npm.fontawesome.com/:_authToken=$(cat /run/secrets/FONT_AWESOME_NPM_TOKEN)" >> .npmrc

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
