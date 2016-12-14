// 按照 fastReply.json的格式输出xls；
var xls=require('xls-to-json'),
	fs=require('fs'),
	d={},
	n=0;
xls({
	input:'12-14.xlsx',
	// output:'12-14.json'
},function(err,result){
	if (err) throw err;
	for(var i=0,len=result.length;i<len;i++){
		if(result[i].type){
			d['data'+ ++n] = [];
		}
		var  obj={};
		obj.content=result[i].content;
		d['data'+n].push(obj);
	}
	var data=JSON.stringify(d,null,4);
	fs.writeFile('a.json',data,function(err){
		console.log(err);
	})
})