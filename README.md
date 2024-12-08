### Built With

 [![NodeJS](https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white)](#)
 [![Express.js](https://img.shields.io/badge/Express.js-%23404d59.svg?logo=express&logoColor=%2361DAFB)](#)
 [![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?logo=mongodb&logoColor=white)](#) 
 [![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?&logo=swagger&logoColor=white)](#)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# Environment vars
This project uses the following environment variables:

| Name                          | Description                         |
| ----------------------------- | ------------------------------------| 
|NODE_ENV          | Toggle between Node mode (production/development) 
|PORT          | Port     |
|HOST_NAME         | Host name    | 
|DB_URI | MongoDB's connection string |
|DB_NAME | Name of the database |
|DB_USER | Name of the database's user |
| DB_PASS | Password of the database |
| TOKEN_SECRET | For implementation of auth and refresh token|
| JWT_SECRET | For implementation of JWT |
| JWT_ACCESS_EXPIRATION_MINUTES=30 | Number of minutes after which an access token expires |
| JWT_REFRESH_EXPIRATION_DAYS |  Number of days after which a refresh token expires |
| JWT_RESET_PASSWORD_EXPIRATION_MINUTES=10 | Number of minutes after which a reset password token expires |
| JWT_VERIFY_EMAIL_EXPIRATION_MINUTES=5 | Number of minutes after which a verify email token expires |
| VNPAY_TMNCODE | Contact VNPay to get tmn code |
| VNPAY_HASHSECRET | Contact VNPay to get the secret| 
| VNPAY_HASH_ALG | Hashing algo of your choice (VNPay uses SHA1) |
| VNPAY_PAYURL_SBOX | https://sandbox.vnpayment.vn/paymentv2/vpcpay.html | 
| VNPAY_PAYQUERY_SBOX | https://sandbox.vnpayment.vn/merchant_webapi/api/transaction | 
| HOST | Mail server | 
| SERVICE | Mail service | 
| EMAIL_PORT | |
| USER | Your mail |
| PASS | Service's password | 


# Pre-requisites
- Install [Node.js](https://nodejs.org/en/) version 20.11.1 and above


# Getting started
- Clone the repository
```
git clone  <git lab template url> <project_name>
```
- Install dependencies
```
cd <project_name>
npm install
```
- Build and run the project
```
npm start
```
or
```
npm run dev
```
  Navigate to `http://localhost:[PORT]`

- API Document endpoints

  swagger spec Endpoint : http://localhost:[PORT]/v1 

## Project Structure
The folder structure of this app is explained below:

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **node_modules**         | Contains all  npm dependencies                                                            |
| **src**                  | Contains  source code                             |
| **src/config**        | Application configuration including environment-specific configs |
| **src/controllers**      | Controllers define functions to serve various express routes. 
| **src/constants**              | Constants
| **src/middlewares**      | Express middlewares which process the incoming requests before handling them down to the routes
| **src/helpers** | Functions related to model logic | 
| **src/routes**           | Contain all express routes, separated by module/area of application                       
| **src/models**           | Models define schemas that will be used in storing and retrieving data from Application database  |
| **src**/index.js         | Entry point to express app                                                               |
| package.json             | Contains npm dependencies as well as [build scripts](#what-if-a-library-isnt-on-definitelytyped)   | 
| **test** | Contains dataset used for testing and seeders |
| eslint.config.mjs            | Config settings for ESLint code style checking                                                |
| .prettierrc.json | Config for prettier |
| **.husky** | Husky's git hooks | 


# Common Issues
