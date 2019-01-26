FROM node:9.10.1
ENV NODE_ENV=production
COPY ./ /var/www
WORKDIR /var/www/
RUN yarn install && yarn add sequelize-cli -g
EXPOSE 3000
CMD /bin/bash ./wait-for-it.sh ufinity-mysql:3306 -- npm run docker