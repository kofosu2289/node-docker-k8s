# Specify a base image
FROM node:12.13.0-alpine AS alpine
WORKDIR /app
# Install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm ci 
COPY ./init.sql /docker-entrypoint-initdb.d/init.sql
COPY . .
EXPOSE 3000
# Default command
CMD ["npm", "start"]
