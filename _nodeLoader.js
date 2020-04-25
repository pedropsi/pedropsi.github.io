////////////////////////////////////////////////////////////////////////////////
// File operations 
// (node.js)

var http = require('http');
var fs = require('fs');

require('./codes/data-transfer');
LoadNodeSource('../data/page');

console.log(DownloadSitemap.toString())

/*
http.createServer(function(req,res){
	fs.readFile('b.html',function(err,data){
		res.writeHead(200,{'Content-Type':'text/html'});
		res.write(data);
		res.write("hi");
		return res.end();
 	 });
}).listen(8080); 

*/

// Save files
/*
function WriteFile(data,source){
	fs.writeFile(source,data,Reporter("Saved file ",source,":",data))
}

function Reporter(successtext){
	return function(err){
		if(err)
			throw err;
  		console.log(successtext);
	};
}
*/
//WriteFile("hi not again","hi.txt")
//console.log(imported);

