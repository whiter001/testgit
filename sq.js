var mysql = require('mysql');
var connection = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'',
	database:'hello'
});
connection.connect();
connection.query('SELECT * from a',function(err,rows,fields){
	if(err) throw err;
	console.log('The result is: ',rows);
})
connection.end();