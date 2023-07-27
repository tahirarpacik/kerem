# Stage 1
FROM node:14-alpine as build-stage
RUN mkdir -p /app
WORKDIR /app
COPY package*.json /app
# Copy our default nginx config

RUN npm install
COPY . /app
ARG configuration=production
RUN npm run build -- --output-path=./dist/out --configuration 

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*
# Stage 2
FROM nginx
COPY --from=build-stage /app/dist/out /usr/share/nginx/html

