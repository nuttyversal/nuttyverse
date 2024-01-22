FROM node:alpine3.18 AS build
WORKDIR /src
COPY . .
RUN npm install --global pnpm
RUN rm -rf node_modules
RUN pnpm --force install
RUN pnpm run build-storybook

FROM nginx:alpine3.18
COPY --from=build /src/storybook-static /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
