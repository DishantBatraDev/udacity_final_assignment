# Serverless Expense Manager
This application is helpful in managing the daily expenses occured of the user.

# Functionality of the application
This application will allow creating/removing/updating/fetching expenses. Each expense you add, you have to attach corresponding bill image. Each user only has access to Expenses that he/she has created.User can only add expense if the user has logged in, Otherwise authorization error will occur.

# Expenses
The application store Expenses, and each Expense contains the following fields:

* `expenseId` (string) - a unique id for an item
* `createdAt` (string) - date and time when an item was created
* `name` (string) - name of a expense item (e.g. "Subway sub)
* `amount` (string) - amount spend
* `attachmentUrl` (string) - a URL pointing to an image attached to a Expense item
* `userId`- identifier of the user

Each expensed added in the database has userid along with it who created it, in order to track the expenses for the user.

# Frontend

The `frontend` folder contains a web application that can use the API hosted on the AWS server.

This frontend  work with serverless application hostedd on the AWS server, you don't need to make any changes in the code.

## Authentication
In order to provide secure access of the application. User has to sign in via Google Login, otherwise user can't access the funcionlity provided by the app.

# How to run the application

## Backend

To deploy an application run the following commands:

```
cd backend
npm install
sls deploy -v
```

## Frontend

To run a client application first edit the `client/src/config.ts` file to set correct parameters. And then run the following commands:

```
cd client
npm install
npm run start
```

This should start a development server with the React application that will interact with the serverless Expense Management application API.

# Postman collection

An alternative way to test API, you can use the Postman collection that contains sample requests. You can find a Postman collection in this project. To import this collection, do the following.

Click on the import button:

![Alt text](images/import-collection-1.png?raw=true "Image 1")


Click on the "Choose Files":

![Alt text](images/import-collection-2.png?raw=true "Image 2")


Select a file to import:

![Alt text](images/import-collection-3.png?raw=true "Image 3")


Right click on the imported collection to set variables for the collection:

![Alt text](images/import-collection-4.png?raw=true "Image 4")

Provide variables for the collection (similarly to how this was done in the course):

![Alt text](images/import-collection-5.png?raw=true "Image 5")
