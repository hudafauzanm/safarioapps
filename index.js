var http = require("http");
var express = require('express');
var app = express();
var mysql      = require('mysql');
var bodyParser = require('body-parser');

//start mysql connection
var db = mysql.createConnection({
    host: "us-cdbr-iron-east-02.cleardb.net",
    user: "b1af23b89da3a7",
    password: "c5d4e8b0",
    database: "heroku_327ce4da905106c"
});

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});
//end mysql connection

//start body-parser configuration
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
//end body-parser configuration

//create app server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

app.get('/', function (req, res) {
  res.send('hello world')
})

//rest api to get all customers
app.get('/api/login/:username/:password', function (req, res) {
   connection.query('select * from user where username=? and password=?',
   [req.params.username,req.params.password], function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

app.post('/api/tambahmahasiswa', function (req, res) {
   var params  = req.body;
   console.log(params);
   connection.query('INSERT INTO user SET ?', params, function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

//rest api to get a single customer data
app.get('/customer/:id', function (req, res) {
   connection.query('select * from customers where Id=?', [req.params.id], function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

//rest api to create a new customer record into mysql database


//rest api to update record into mysql database
app.put('/customer', function (req, res) {
   connection.query('UPDATE `customer` SET `Name`=?,`Address`=?,`Country`=?,`Phone`=? where `Id`=?', [req.body.Name,req.body.Address, req.body.Country, req.body.Phone, req.body.Id], function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

//rest api to delete record from mysql database
app.delete('/customer', function (req, res) {
   console.log(req.body);
   connection.query('DELETE FROM `customer` WHERE `Id`=?', [req.body.Id], function (error, results, fields) {
	  if (error) throw error;
	  res.end('Record has been deleted!');
	});
});