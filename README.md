# BiteSpeed
## File Structure
```
├── README.md
├── index.js
├── package-lock.json
├── package.json
├── src
│   ├── config
│   │   └── database.js
│   ├── constants
│   │   └── enum_constants.js
│   ├── middlewares
│   │   ├── http_logger.js
│   │   ├── logger.js
│   │   └── response.js
│   ├── modules
│   │   └── contact
│   │       ├── controller
│   │       │   └── contact_controller.js
│   │       ├── model
│   │       │   └── contact_model.js
│   │       ├── repository
│   │       │   └── contact_repository.js
│   │       └── service
│   │           └── contact_service.js
│   ├── router.js
│   ├── server.js
│   └── utils
│       └── utils.js
└── vercel.json

```
```index.js```
is the entry point of the application
<br>
``` src/modules``` contains individual modules
each having its own controller, model, repository, and service.
```
src/modules/contact
├── controller
│   └── contact_controller.js
├── model
│   └── contact_model.js
├── repository
│   └── contact_repository.js
└── service
    └── contact_service.js
```


## How to run locally
1. clone the repo
2. ```npm install```
3. make sure mysql is running
4. create the database
4. create ```.env``` 
    1. PORT =  
    1. dbName = 
    1. dbUser =
    1. dbHost= 
    1. dbDriver= 
    1. dbPassword= 

4. ```npm run start_dev```
<br>
## How to test
Use this as curl 
```
curl --location 'https://bite-speed-assignment-git-main-vikash-6057.vercel.app/api/v1/contacts/identify' \
--header 'Content-Type: application/json' \
--data '{
    "email": "v3185",
    "phoneNumber": 76679
}'
```
or hit this end point


POST

https://bite-speed-assignment-git-main-vikash-6057.vercel.app/api/v1/contacts/identify

pass request body in json format
```
{
    "email": "v3185",
    "phoneNumber": 76679
}
```

# Link to resume

[Resume](https://drive.google.com/file/d/1IWBCA7EyvNFNJVqh1fvcMSBD_w2TRW6D/view?usp=sharing)