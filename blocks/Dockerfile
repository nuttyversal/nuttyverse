FROM node:bookworm AS build
WORKDIR /src
COPY . .
RUN npm install --global pnpm && \
	pnpm --force install && \
	pnpm run build-storybook

FROM nginx:alpine3.18
COPY --from=build /src/storybook-static /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
