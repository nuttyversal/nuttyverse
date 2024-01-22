FROM node:alpine3.18 AS build
RUN npm install --global pnpm
WORKDIR /src
COPY . .
RUN pnpm install && \
	pnpm run build-storybook

FROM nginx:alpine3.18
COPY --from=build /src/storybook-static /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
