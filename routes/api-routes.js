const db = require("../models")
const passport = require("../config/passport");

module.exports = function (app) {
    //use app to set up api routes
    //route to add new burger
    app.post("/api/burgers", async function (req, res) {
        console.log("thing: " + req.body.burgerName)
        const burger = await db.Burgers.create({ burgerName: req.body.burgerName })
        res.json(burger);
    })

    //route to display burgers
    app.get("/api/burgers", async function (req, res) {
        const burger = await db.Burgers.findAll({})
        // console.log(burger)
        res.json(burger);
    })

    //route to update burger_db
    app.put("/api/burgers/:id", async function (req, res) {
        const burger = await db.Burgers.update({ eaten: true }, { where: { id: req.params.id } })
        console.log(req.params.id)
        res.json(burger)
    })

    //delete route
    app.delete("/api/burgers/:id", async function (req, res) {
        console.log(req.params.id)
        const burger = await db.Burgers.destroy({ where: { id: req.params.id } })
        res.json(burger);
    })

    //Mofidy an example
    app.put("/api/examples/:email", function (req, res) {
        console.log(req.params.email + " will it work: " + req.body.newValue)
        db.User.update({ text: req.body.newValue, description: "a new description" }, { where: { email: req.params.email } })
            .then(function (dbExamples) {
                console.log(dbExamples);
                res.json(dbExamples)
            })
    })

    //BEGIN AUTHORIZATION ROUTES-----------------------------------------------------------------------------------

    // Using the passport.authenticate middleware with our local strategy.
    // If the user has valid login credentials, send them to the members page.
    // Otherwise the user will be sent an error
    app.post("/api/login", passport.authenticate("local"), function (req, res) {
        // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
        // So we're sending the user back the route to the members page because the redirect will happen on the front end
        // They won't get this or even be able to access this page if they aren't authed
        const sendBack = { url: "/members", user: req.body.email } //do this to send back the meeting ID to then display on the user's member page
        res.json(sendBack);
    });
    //
    // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
    // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
    // otherwise send back an error
    app.post("/api/signup", function (req, res) {
        console.log(req.body);
        db.User.create({
            email: req.body.email,
            password: req.body.password
        }).then(function () {
            res.redirect(307, "/api/login");
        }).catch(function (err) {
            console.log(err);
            res.json(err);
            // res.status(422).json(err.errors[0].message);
        });
    });
    //
    // Route for logging user out
    app.get("/logout", function (req, res) {
        req.logout();
        res.redirect("/");
    });
    //
    // Route for getting some data about our user to be used client side
    app.get("/api/user_data", function (req, res) {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.json({});
        }
        else {
            // Otherwise send back the user's email and id
            // Sending back a password, even a hashed password, isn't a good idea
            res.json({
                email: req.user.email,
                id: req.user.id
            });
        }
    });

};


