var fs= require('fs');
var http= require('http');
var iconv = require('iconv-lite');

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
		this.getPage();
	},
	getPage:function(){
		var self = this;
		if(this.page<=this.total){
			var data=[];
			http.get(this.baseUrl+this.page+'.htm',function(res){
				// res.setEncoding('utf8');
				res.on('data',function(chunk){
					data.push(chunk);
				}).on('end',function(){
					var d=iconv.decode(Buffer.concat(data),'gb2312');
					self.parseData(d);
				})
			})
		}
	},
	parseData:function(data){
		var resource= {
				res:[]
			},
			match;
		while((match=this.reg.exec(data))!=null){
			resource.res.push({
				src:'http://www.jb51.net'+match[1],
				title:match[2]
			});
		}
		this.write(resource.res);
	},
	write:function(res){
		var self = this,
			data = JSON.stringify(res,null,4);
		fs.writeFile(this.dir+this.page+'.json',data,null,function(err){
			if(err) throw err;
			console.log(self.dir+self.page+'.json,it\'s saved');
			self.page++;
			self.start();
		})
	},
}
var mzitu = new Mzitu({
	baseUrl:'http://www.jb51.net/list/list_243_',
	dir:'/git/test/',
	reg:/<DT>\s*<span>.*<\/span>\s*<a\s*href="(.*?)"\s*title="(.*?)"\s*target="_blank">\s*.*<\/a>\s*<\/DT>/g,
	total:1
})
mzitu.start();