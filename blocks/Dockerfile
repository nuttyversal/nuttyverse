FROM node:alpine3.18 AS build

# [NOTE] The Font Awesome NPM token is required to install the Font Awesome
# NPM package. You will need to specify the token as a build argument when
# building the Docker image (--build-arg FONT_AWESOME_NPM_TOKEN=<...>).
ARG FONT_AWESOME_NPM_TOKEN

# Install dependencies.
WORKDIR /src
COPY . .
RUN npm install -g pnpm
RUN pnpm install

# Build Storybook.
RUN pnpm build-storybook

# Serve Storybook.
FROM nginx:alpine3.18
COPY --from=build /src/storybook-static /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
