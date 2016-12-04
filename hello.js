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
		this.reg = options.reg,
		this.page = options.from || 1,
		this.total = options.total;
	},
	start:function(){
		if(this.page<=this.total){
			this.getPage();
		}
	},
	getPage:function(){
		var data='',
			self=this;
		http.get(this.baseUrl+this.page,function(res){
			res.on('data',function(chunk){
				data+=chunk;
			}).on('end',function(){
				self.parseData(data);
			})
		})
	},
	parseData:function(data){
		var res=[],
			match;
		while((match=this.reg.exec(data))!=null){
			res.push(match[1]);
		}
		this.down(res);
	},
	down:function(resource){
		var self=this;
		resource.forEach(function(src,idx){
			var filename=self.page+'_'+idx+'.jpg',
				writestream = fs.createWriteStream(self.dir+filename);
			http.get(src,function(res){
				res.pipe(writestream);
			})
			writestream.on('finish',function(){
				console.log('download the pic is:'+filename);
			})
		})
		
		this.page++;
		setTimeout(this.start(),2000);
	}
}
var mzitu = new Mzitu({
	baseUrl:'http://www.mzitu.com/share/comment-page-',
	dir:'d:/vedio/pic/',
	total:237,
	reg:/<img\s*src="(.*?)"\s*alt=".*"\s*\/>/g,
})
mzitu.start();