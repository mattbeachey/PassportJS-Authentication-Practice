const db = require("../models")

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
    app.put("/api/burgers/:id", async function (req, res){
        const burger = await db.Burgers.update({eaten: true}, { where: {id: req.params.id}})
        console.log(req.params.id)
        res.json(burger)
    })

    //delete route
    app.delete("/api/burgers/:id", async function(req, res){
        console.log(req.params.id)
        const burger = await db.Burgers.destroy({where: {id: req.params.id}})
        res.json(burger);
    })

};
