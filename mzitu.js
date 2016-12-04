var fs = require('fs');
var http = require('http');

function Mzitu(options) {
    this.initialize.call(this, options);
    return this;
}
Mzitu.prototype = {
    constructor: Mzitu,
    initialize: function(options) {
        this.baseUrl = options.baseUrl,
            this.dir = options.dir || '',
            // this.reg = options.reg,
            this.page = options.from || 1,
            this.total = options.total;
    },
    start: function() {
        if (this.page <= this.total) {
            this.down();
        }
    },
    down: function() {
        var num = this.page<10 ? "0"+this.page : this.page,
        	filename = num+ '.jpg',
            src = this.baseUrl + num + '.jpg',
            writestream = fs.createWriteStream(this.dir + filename);	
        var req=http.get(src, function(res) {
            res.on('data', function(data) {
                writestream.write(data);
            }).on('end', function() {
                writestream.end();
                console.log('download success: ' + filename);
            })
        });
        req.on('error',function(e){
        	console.log(e.message);
        })
        this.page++;
        this.start();
    }
}
var mzitu = new Mzitu({
    baseUrl: 'http://i.meizitu.net/2016/10/21a',
    dir: 'd:/vedio/pic/b',
    total: 9
})
mzitu.start();