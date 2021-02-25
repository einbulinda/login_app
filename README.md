# login_app

Simple Node JS Login App with Node JS, mySQL.

Steps and Procedures:

1. Create folders for Public (hosting static files), Routes(defining route paths) and Views(to contain view engine files rendered by the app)
2. install express module as a dependency
3. Create app.js and create a server for the app, defining port for express to listen to and serve files
4. Install nodemon - restarting server when changes are made automatically.
5. Provide a start script in package.json to be executed when npm start is called from terminal.
6. Install ejs templating engine for injecting data in html
7. Designing the registration page
8. Designing login page
9. create connection to the server
10. Store server login credentials in a dotenv file
11. Authentication of form details. Does email exist in DB, avoid duplicate users
12. hash the password before storing in DB for security reasons. using bcrypt
13. login form routes   
