const express = require("express");
const exphbs = require("express-handlebars");
const connection = require("./config/connection");

require("dotenv").config(); 

var app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
    
});

app.post("/api/burgers", (req, res) => {
    
});

app.put("/api/burgers/:id", (req, res) => {
    
});

app.listen(PORT, () => {
    console.log(`Server listening on: http://localhost:${PORT}`);
});

