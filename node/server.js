var express = require('express'),
     path = require('path'),
    bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client'));

app.get('/', function(req, res){
    
    res.render('index.html');
});


var server = app.listen(8090, function () {
    
    console.log('node server connected...');
    console.log('listening on port 8090...');
});
   
