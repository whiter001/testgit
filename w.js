var fs= require('fs');
var http= require('http');

function Mzitu(options){
	this.initialize.call(this,options);
	return this;
}
Mzitu.prototype={
	constructor:Mzitu,
	initialize:function(options){
		this.host=options.host,
		this.baseUrl = options.baseUrl,
		this.dir = options.dir || '',
		this.reg = options.reg,
		this.pageReg = options.pageReg,
		this.page = options.from || 1,
		this.p = options.start || 0,
		this.doc=options.doc,
		this.total = options.total;
	},
	start:function(){
		if(this.page<=this.total){
			this.getPageUrl();
		}
	},
	getPageUrl:function(){
		var data='',
			self=this;
		http.get(this.baseUrl+this.page+'.html',function(res){
			res.on('data',function(chunk){
				data+=chunk;
			}).on('end',function(){
				self.parsePageData(data);
			})
		})
	},
	parsePageData:function(data){
		var res=[],
			match,
			self=this;
		while((match=self.pageReg.exec(data))!=null){
			res.push(match[1]);
		}
		this.doc=res;
		this.getPage();
	},
	getPage:function(){
		var data='',
			self=this,
			len=self.doc.length;
			if(self.p<len){
				http.get(self.host+self.doc[self.p],function(res){
					res.on('data',function(chunk){
						data+=chunk;
					}).on('end',function(){
						self.parseData(data);
					})
				})
			}else{
				// self.page++;
				// self.start();
			}
	},
	parseData:function(data){
		var res=[],
			match;
		while((match=this.reg.exec(data))!=null){
			res.push(match[1]);
		}
		res.slice(0,1);
		console.log(res);
		this.down(res);
	},
	down:function(resource){
		var self=this;
		resource.forEach(function(src,idx){
			var filename=src.substring(src.lastIndexOf('/')+1),
				writestream = fs.createWriteStream(self.dir+filename);
			http.get(src,function(res){
				res.pipe(writestream);
			})
			writestream.on('finish',function(){
				console.log('download the pic is:'+filename +' num: '+self.p++);
			})
			writestream.on('error',function(e){
				console.log(e.stack);
			})
			
		})
		
		// self.getPage();
	}
}
var mzitu = new Mzitu({
	host:'http://www.10xxoo.com',
	baseUrl:'http://www.10xxoo.com/news/other/10_',	
	start:0,
	// Url:'http://www.10xxoo.com/news/class/',
	dir:'d:/vedio/img/',
	from:2,
	total:2,
	doc:[],
	pageReg:/<li>\s*<a\s*href="(.*?)"\s*title=".*"\s*target="_blank">/g,
	reg:/<img\s*src="(.*?)"\s*\/>/g,
})
mzitu.start();