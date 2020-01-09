//npm dependencies
const express = require("express")
const Sequelize = require('sequelize');
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("./config/passport");

//database 
const db = require("./models")

//set up express app
const app = express();
const PORT = process.env.PORT || 3000;

//data parsing
// app.use(express.urlencoded({ extended: true })); 
//above is the previous app.use that was set up in sequelize burger app
app.use(bodyParser.urlencoded({ extended: false })); //For body parser
app.use(bodyParser.json());
app.use(express.static("public"))

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


//routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);



// Starts the server to begin listening
// =============================================================

db.sequelize.sync({}).then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });
