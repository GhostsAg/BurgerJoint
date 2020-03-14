const express = require("express");
const Burger = require("../models/burger");

const router = express.Router();

router.get("/", (req, res) => {
    Burger.all( (data) => {
        const hbsObject = {
            burgers: data
        };
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
    Burger.update({
        
    })
})