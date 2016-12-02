var fs= require('fs');
var http= require('http');

function Mzitu(options){
	this.initialize.call(this,options);
	return this;
}
Mzitu.prototype={
	constructor:Mzitu,
	initialize:function(options){
		this.baseUrl = options.baseUrl,
		this.dir = options.dir || '',
		// this.reg = options.reg,
		this.page = options.from || 1,
		this.total = options.total;
	},
	start:function(){
		if(this.page<=this.total){
			this.down();
		}
	},
	down:function(){
		var filename=this.page+'.jpg',
			writestream = fs.createWriteStream(this.dir+filename);
		http.get(this.baseUrl+this.page+'.jpg',function(res){
			res.pipe(writestream);
		})
		writestream.on('finish',function(){
			console.log('download the pic is:'+filename);
		})
		this.page++;
		this.start();
	}
}
var mzitu = new Mzitu({
	baseUrl:'http://img1.mm131.com/pic/2723/',
	dir:'pic/',
	total:23
})
mzitu.start();