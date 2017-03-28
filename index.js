var express = require("express");

var app = express();

// set up req.body
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

var messages = [];

app.get("/", function(req, res) {
	res.sendFile( __dirname + "/index.html");
});

//get /chat
app.get("/chat", function(req, res) {
	res.send(JSON.stringify(messages)); //send out messages array in string form
});


//get /log + username
app.get("/log/:username", function(req, res) { 
	var userMsgs = [];
	for (var msg of messages){
		if (msg.username === req.params.username){
			userMsgs.push(msg);
		}
	}
	res.send(JSON.stringify(userMsgs)); //send out ???????
});

//post /chat
app.post("/chat", function(req, res) {
	// see above for body-parser
	if(req.body) {
		messages.push({
			username: req.body.username,
			message: req.body.message,
			timestamp: Date.now()
		});
		res.send("success");
	} else{
		res.send("error");
	}
});


app.use(function(req, res, next) {
	res.status(404);
	res.send("404 File Not Found");
});

app.use(function(err, req, res, next) {
	console.log(err);
	res.status(500);
	res.send("500 Internal Server Error");
});

app.listen(8080, function() {
	console.log("Server started!");
});
