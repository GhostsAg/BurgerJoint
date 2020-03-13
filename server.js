const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql");
require("dotenv").config(); 

var app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.myPassword,
    database: "burgers_db"
});

connection.connect( (err) => {
    if (err) {
        console.error(`Error connecting: ${err.stack}`);
        return;
    }
    console.log(`Connected as id ${connection.threadId}`);
});

app.get("/", (req, res) => {
    connection.query("SELECT * FROM burgers WHERE eaten = ?", [false],
    (err, data) => {
        if (err) {
            return res.status(500).end();
        }
        connection.query("SELECT * FROM burgers WHERE eaten = ?", [true],
        (err, moreData) => {
        if (err) {
            return res.status(500).end();
        }

        res.render("index", { good: data, eaten: moreData });
        });
    });
});

app.post("/api/burgers", (req, res) => {
    connection.query("INSERT INTO burgers (bg_name, eaten) VALUES (?,?)", [req.body.burger, false],
    (err, result) => {
        if (err) {
            return res.status(500).end();
        }
        console.log(result);

        res.json({ id: result.insertId });
        console.log({ id: result.insertId });
    });
});

app.put("/api/burgers/:id", (req, res) => {
    connection.query("UPDATE burgers SET eaten = ? WHERE id = ?", [true, req.params.id], 
    (err, result) => {
        if (err) {
            return res.status(500).end();
        }

        res.status(200).end();
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on: http://localhost:${PORT}`);
});

