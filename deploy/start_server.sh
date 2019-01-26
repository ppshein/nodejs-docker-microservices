#!/bin/bash

echo "Configuration"

export NODE_ENV=production

BASE_DIR=/home/ec2-user/
APPLICATION_DIRECTORY=$BASE_DIR/ufinity-test/app

echo "cd"

cd "$APPLICATION_DIRECTORY"

#sequelize db:create && sequelize db:migrate

# actually start the server
sudo pm2 start $APPLICATION_DIRECTORY/bin/server.js -i 0 --name "ufinity-test"