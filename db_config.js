var mysql = require('mysql');

var db = mysql.createConnection({
    host: "us-cdbr-iron-east-02.cleardb.net",
    user: "b1af23b89da3a7",
    password: "c5d4e8b0@us",
    database: "heroku_327ce4da905106c"
});

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = db;