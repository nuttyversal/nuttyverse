FROM node:alpine3.18 AS build

# [NOTE] The build context must be the root of the repository in order to
# include the hoisted TypeScript configuration file (b/c monorepo lol).
COPY . .
WORKDIR /blocks

# [NOTE] The Font Awesome NPM token is required to install the Font Awesome NPM
# package. You'll need to specify the token as a secret when building the image.
RUN --mount=type=secret,id=FONT_AWESOME_NPM_TOKEN,required \
  echo "@fortawesome:registry=https://npm.fontawesome.com/" > .npmrc && \
  echo "//npm.fontawesome.com/:_authToken=$(cat /run/secrets/FONT_AWESOME_NPM_TOKEN)" >> .npmrc

# Install dependencies.
RUN npm install

# Build Storybook.
RUN npm run build-storybook

# Serve Storybook.
FROM nginx:alpine3.18
COPY --from=build /blocks/storybook-static /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
