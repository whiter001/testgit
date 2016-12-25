//nodejs 导出特定格式xls文件为json
// 按照 fastReply.json的格式输出xls；注意先修改xls表里类型和表里的引号为中文的引号;
//npm install -g cnpm --registry=https://registry.npm.taobao.org
//cnpm install xls-to-json
var xls = require('xls-to-json'),
    fs = require('fs'),
    d = {},
    n = 0;
xls({
    input: 'test/12-14.xlsx',//路径位置，直接执行和cmd执行的区别；
    output: 'test/12-14.json'
}, function(err, result) {
    if (err) throw err;
    for (var i = 0, len = result.length; i < len; i++) {
        if (result[i].type) {
            d['data' + ++n] = [];
        }
        var obj = {};
        obj.content = result[i].content;
        d['data' + n].push(obj);
    }
    var data = JSON.stringify(d, null, 4);
    fs.writeFile('a.json', data, function(err) {
        console.log(err);
    })
})