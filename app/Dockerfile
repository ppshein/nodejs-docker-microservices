FROM node:9.10.1
ENV NODE_ENV=docker
COPY ./ /var/www
WORKDIR /var/www/
RUN yarn install && yarn add sequelize-cli -g
EXPOSE 3000
ENTRYPOINT [ "npm", "run", "docker" ]