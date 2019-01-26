# NodeJS-Ufinity
NodeJS knowledge test. 


## Folder Structure
```
.
├── README.md
├── app
│   ├── Dockerfile
│   ├── app.js
│   ├── bin
│   │   ├── server.js
│   │   └── www
│   ├── config
│   │   └── config.json
│   ├── migrations
│   │   ├── 20190125095505-create-teacher.js
│   │   └── 20190125100750-create-student.js
│   ├── models
│   │   ├── index.js
│   │   ├── student.js
│   │   └── teacher.js
│   ├── package.json
│   ├── routes
│   │   └── api
│   │       └── ufinity
│   │           ├── index.js
│   │           ├── ufinity.controller.js
│   │           └── ufinity.controller.spec.js
│   ├── seeders
│   ├── services
│   │   └── ufinity.services.js
│   ├── utils
│   │   └── validation.js
│   └── wait-for-it.sh
├── db
│   ├── Dockerfile
│   └── init_db.sql
└── docker-compose.yml
```

## Stack
* Node.js (v9.10.1)
* MySQL (v8.0.14 for macos10.14 on x86_64 (MySQL Community Server - GPL))
* Yarn
* Docker

## Installation
1. To run NodeJS locally, you must have to install `yarn` first and install all dependencies
```
    yarn install
    yarn add sequelize-cli -g
```

## Database Configuration
There is called `config.json` inside `\app\config\`. We can configure database configuration inside that configuration file.

## Build, Run and Test
To run this project, `npm start`

To unit testing, `npm test`

To build docker images, `docker-compose build` & `docker-compose up`
