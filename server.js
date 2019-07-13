// require express
var express = require("express");
// path module -- try to figure out where and why we use this
var path = require("path");
//mongoose 
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ninja_gold');
// create the express app
var app = express();
var bodyParser = require('body-parser');
// use it!
app.use(bodyParser.json());
// MiddleWare: Session and Flash 
var session = require('express-session');
app.use(session({
	secret: 'cam_god',
	resave: false,
	saveUninitialized: true,
	cookie: { maxAge: 60000 }
}))
const flash = require('express-flash');
app.use(flash());
// static content
// app.use(express.static(path.join(__dirname, './public/dist')));
app.use(express.static( __dirname + '/public/dist/public' ));


// // Get sockets
// const server = app.listen(8000);
// const io = require('socket.io')(server);
// var counter = 0;

// io.on('connection', function (socket) { //2
// 	  //Insert SOCKETS 
// });

// Mongoose Schema users 
var UserSchema = new mongoose.Schema({
	name: {type: String, required: [true, "Must have name"], minlength: [2, "Name must be longer than 2 characters"]},
	coin: {type: Number, default:0}
}, {timestamps: true})
mongoose.model('User', UserSchema); // We are setting this Schema in our Models as 'Task'
var User = mongoose.model('User') // We are retrieving this Schema from our Models, named 'User'

// // ...delete all records of the User Model
// User.deleteMany({}, function(err){
// 	// This code will run when the DB has attempted to remove all matching records to {}
//    })

// root route to render the index.ejs view
app.get('/start', (req, res)=>{
	User.create({name: 'Jack'}, (err, new_user)=> {
		if (err) {
			console.log("Error creating message")
			res.json({message: "Error", error: err})	
		}else {
			console.log(new_user)
			req.session.user_id = new_user._id      //Initialize session for user id
			res.json({message: "Success", data: new_user})
		}
	})
})
app.get('/farm', (req, res) =>{ 
	// console.log(req.session.user_id)
	User.findByIdAndUpdate(req.session.user_id, {$inc : {'coin': 10}}, (err, user_update)=>{
		if (err) {
			console.log("Error adding coins")
			res.json({message: "Error", error: err})	
		}else {
			console.log(user_update)
			res.json({message: "Success", data: user_update})
		}
	})
})


//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(request, response){
	response.send("404")
});

// tell the express app to listen on port 8000
app.listen(8000, function() {
 console.log("listening on port 8000");
});