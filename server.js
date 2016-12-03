var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/hello',function(req,res){
	res.send('hello');
})

var server = app.listen(8000,function(){
	var address = server.address().address;
	var host = address == '::' ? "127.0.0.1" : address;
	var port = server.address().port

	console.log('server running at http://%s:%s',host,port);
})