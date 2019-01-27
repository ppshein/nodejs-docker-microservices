#!/bin/bash
# update yum just in case
yum update -y

# get node into yum
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash

# install node and npm in one line
nvm install node

# install forever to restart node app
npm install -g forever

npm install && npm -g sequelize-cli