
# Contact Manager Application

This is contact manager application - a backend app that helps you store your contacts, create new ones and modify existing contacts. The project uses CRUD (Create \ Read \ Update \ Delete) RestAPIs to manage your contacts.

```
Please don't forget to ⭐ this repo if you found it helful. Means a lot!
```

**Live Demo App**: Coming soon...

## Tech Stack

- NodeJS
- ExpressJS
- MongoDB
## App Features

This project will help you get familiarized with CRUD operations using RestAPIs in NodeJs and will help you get hands-on with topics/ concepts like:

- Creating Express server
- Using Express Routers
- Error handling/ Async Handler
- Using Express Middlewares
- Setting up MongoDB
- Creating Mongoose Schema
- Using CRUD RestAPIs
- User Authentication
- User registration & login
- Express Controllers and DB Operations
- Password Hashing & Comparing
- Signing/ Verifying JWT
- Handling Relationships
- Protecting Routes
## Installation and Setup

1. Clone this repository to yopure local machine.
2. Go into the project folder and in termainal, run the below npm command.

```
cd <my-project-directory>
npm install
```

3. Create a ```.env``` file and define below environment variables:

```
PORT
CONNECTION_STRING
ACCESS_TOKEN_SECRET
```
PORT - Define the port on which you want to run the server. \
CONNECTION_STRING - Connection string from the mongodb server. Just login to mongodb and create a cluster to get the connection string.\
ACCESS_TOKEN_SECRET - Secret token that is used to sign and verify a JWT token.

4. Run the project server
```
npm start
or
npm run dev (runs the nodemon server)
```

