const connection = require("./connection");

const toQuests = (num) => {
    const arr = new Array();
    for (let i=0; i<num; i++) {
        arr.push("?");
    }
    return arr.toString();
}

const orm = {
    selectAll: function(table, cb) {
        const queryString = `SELECT * FROM ${table}`;
        connection.query(queryString, (err, res) => {
            if (err) throw err;
            cb(res);
        });
    },
    insertOne: function(table, columns, values, cb) {
        const queyString = `INSERT INTO ${table} (${columns}) VALUES (${toQuests(values.length)})`;
        connection.query(queyString, values, (err, res) => {
            if (err) throw err;
            cb(res);
        });
    },
    updateOne: function(table, objColumnValues, condition, cb) {
        const queryString = `UPDATE ${table} SET ${objColumnValues.argOne} = ${objColumnValues.argTwo} WHERE ${condition}`;
        connection.query(queryString, (err, res) => {
            if (err) throw err;
            cb(res);
        });
    }
}

module.exports = orm;