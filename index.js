var express = require("express");
var app     = express();
var bodyParser = require("body-parser");

var todoRoutes = require('./routes/todos'); //path to directory where to find specifics on routes

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public')); //public call needs to be above views!!
app.use(express.static(__dirname + '/views'));


app.get("/",function(req,res){
    res.sendFile("index.html");
});

app.use('/api/todos', todoRoutes);  // under this url the API will be stored



app.listen(process.env.PORT, function(){
    console.log("Console is running on PORT" + process.env.PORT);
});