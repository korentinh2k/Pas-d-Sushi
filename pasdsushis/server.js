//server .js

const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const port = 8000

var fs = require('fs')

app.use(bodyParser.json())

app.use(express.static('public'));

//routes
app.get('/', function (req, res) {
   res.sendFile(__dirname + "/" + "public/html/index.html" );
})

app.get('/commande.html', function (req, res) {
   res.sendFile(__dirname + "/" + "public/html/commande.html" );
})

app.post('/users', function(req,res) {
	console.log('Request Payload: ' + req.body.username +' '+ req.body.password);
	fs.readFile(__dirname + '/public/json/users.json',function (err,data){
		var json = JSON.parse(data);
		json.push({
			"username": req.body.username, 
			"password": req.body.password,
		});

	  fs.writeFileSync(__dirname + "/public/json/users.json", JSON.stringify(json));
	});
});

app.get('/users', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/json/users.json'));
});

//listener
var server = app.listen(8000, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)

})