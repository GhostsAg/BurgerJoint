const orm = require("../config/orm");

const Burger = {
    all: function(cb) {
        orm.selectAll("burgers", (res) => {
            cb(res);
        });
    },
    insert: function(columns, values, cb) {
        orm.insertOne("burgers", columns, values, (res) => {
            cb(res);
        });
    },
    update: function(objColumnValues, condition, cb) {
        orm.updateOne("burgers", objColumnValues, condition, (res) => {
            cb(res);
        });
    }
}

module.exports = Burger;