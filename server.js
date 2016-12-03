var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({
    extended: false
})
app.use(express.static('public'));
app.post('/process_post', urlencodedParser, function(req, res) {
    // 输出 JSON 格式
    response = {
        first_name: req.body.first_name,
        last_name: req.body.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response, null, 4));
})
app.get('/process_get', function(req, res) {
    response = {
        first_name: req.query.first,
        last_name: req.query.last
    };
    console.log(response);
    res.end(JSON.stringify(response, null, 4));
})
var server = app.listen(8000, function() {
    var address = server.address().address;
    var host = address == '::' ? '127.0.0.1' : address;
    var port = server.address().port
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})