const express = require("express");
const Burger = require("../models/burger");

const router = express.Router();

router.get("/", (req, res) => {
    Burger.all( (data) => {
        let good = data.filter( (el) => el.eaten === false);
        let eaten = data.filter( (el) => el.eaten === true);
        const hbsObject = {
            good: good,
            eaten: eaten
        };
        console.log("good:", good);
        res.render("index", hbsObject);
    });
});

router.post("/api/burgers", (req, res) => {
    Burger.insert([
        "bg_name", "eaten"
    ], [
        req.body.bg_name, req.body.eaten
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