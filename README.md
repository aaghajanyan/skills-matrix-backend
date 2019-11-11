This is the README file of the Skills Matrix Backend.

CONTENTS

        1. AUTHOR
        2. INTRODUCTION
        3. USAGE
        4. DIRECTORY STRUCTURE

1. AUTHOR

Instigate Mobile CJSC
E-mail: info@instigatemobile.com
Tel: +1-408-454-6172
     +49-893-8157-1771
     +374-60-445500
www.instigatemobile.com

2. INTRODUCTION

//TODO

3. USAGE

3.1 Dependencies

//TODO

3.2 Configuration

Create DB in PostgreSql shell - createdb skills-matrix

Change configs in config/env-settings.json config file.

Install the node modules - npm ci

3.3 Run

Run the service - npm run start-dev

Run the service - npm run start-prod

3.4 Call example

curl -w "\n" -X GET 'http://localhost:3002/users'

4. DIRECTORY STRUCTURE

```
├── app
│   ├── controllers - Defines app routes logic.
│   │   ├── invitation.js
│   │   └── user.js
│   ├── models - Represents data, implements business logic and handles storage.
│   │   └── user.js
│   ├── routes - All routes for different entities in different files.
│   │   ├── index.js
│   │   ├── invitations.js
│   │   └── users.js
│   ├── sequelize
│   │   ├── config - Contains sequelize configuration settings such as database configuration.
│   │   │   └── config.js
│   │   ├── migrations - Contains the application migration data.
│   │   │   ├── invitation.js
│   │   │   └── user.js
│   │   ├── models - Contains database models.
│   │   │   ├── index.js
│   │   │   ├── invitation.js
│   │   │   └── user.js
│   │   └── seeders
│   └── validation - Defines requests validation logic.
│       ├── invitations.js
│       └── users.js
├── config - Contains application configuration settings such as database configuration.
│   └── env-settings.json
├── package.json
├── package-lock.json
├── README.md
└── server.js
```
