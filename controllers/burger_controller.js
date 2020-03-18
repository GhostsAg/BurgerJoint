const express = require("express");
const Burger = require("../models/burger");

const router = express.Router();

router.get("/", (req, res) => {
    Burger.all( (data) => {
        let good = data.filter( (el) => el.eaten === 0);
        let eaten = data.filter( (el) => el.eaten === 1);
        res.render("index", { good: good, eaten: eaten });
    });
});

router.post("/api/burgers", (req, res) => {
    console.log(req.body);
    Burger.insert([
        "bg_name"
    ], [
        req.body.burger
    ], function(result) {
        res.json({ id: result.insertId });
    });
});

router.put("/api/burgers/:id", (req, res) => {
    const condition = `id = ${req.params.id}`;
    const objColVals = {
        argOne: "eaten",
        argTwo: true
    };
    Burger.update(objColVals, condition, function(result) {
        if (result.changedRows === 0) {
            return res.status(404).end();
        }
        res.status(200).end();
    });
});

module.exports = router;