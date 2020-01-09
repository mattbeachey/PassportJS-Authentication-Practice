//npm dependencies
const express = require("express")
const Sequelize = require('sequelize');

//database 
const db = require("./models")

//set up express app
const app = express();
const PORT = process.env.PORT || 3000;

//data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.use(express.static("public"))

require("./routes/api-routes.js")(app);



// Starts the server to begin listening
// =============================================================

db.sequelize.sync({}).then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });
