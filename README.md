# Kanggo API
[![Npm Badge](https://badgen.net/badge/icon/npm?icon=npm&label)
](https://www.npmjs.com/)

> RESTful API Services for Kanggo Applications, build with Javascript and Mysql database
## Installation - Local
1. Open your terminal and run command
`git clone https://github.com/fhyfr/kanggo-api.git`
for install the project into your local computer

2.  Install all dependencies by running `npm install` command

3. Create new `.env` file and set up all configuration below
```
# server config
HOST=<Your Application Host>
PORT=<Your Application Port>

# mysql database config
DB_HOST = <Database Host>
DB_USER = <Database User>
DB_PW = <Database Password>
DB_NAME = <Database Name>

# JWT
ACCESS_TOKEN_KEY=<JWT Access Token Key>
REFRESH_TOKEN_KEY=<JWT Access Refresh Token Key>
ACCESS_TOKEN_AGE=<JWT Access Token Age>
```

4. Create new database and insert database name to `DB_NAME` config
5. Run command `npm run migrate` for migrations all table and its structure into database
6. You can generate `ACCESS_TOKEN_KEY` and `REFRESH_TOKEN_KEY` from Node CLI using function `require('crypto').randomBytes(64).toSting('hex')`, this function will generate random strings.
7. Now you can run your application by running `npm run dev` command, and copy the url to browser. If success you will get response

```
{
   status:  "OK",
   message:  "Server Up"   
}
```

All set, congratulation...

## API Documentation
For testing the application you can see the documentation of Kanggo API in here [Kanggo API Documentation](https://documenter.getpostman.com/view/13625436/U16jP6kK)

