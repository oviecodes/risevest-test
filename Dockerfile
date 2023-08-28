FROM --platform=linux/amd64 node:20-alpine3.17

WORKDIR /app
COPY ./package.json /app
RUN npm install
RUN npm install knex -g
COPY . .
RUN npm run build
CMD ["node", "dist/index.js"]

EXPOSE 4003