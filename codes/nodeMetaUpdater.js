////////////////////////////////////////////////////////////////////////////////
// File operations 
// (node.js)
require('../codes/data-transfer');

var http = require('http');
var fs = require('fs');

// Save files

function WriteFile(data,source){
	fs.writeFile(source,data,Reporter(`Saved file ${source} with ${data}`));
}

function FilterHTMLFiles(err,files){
	if(err){
		return console.log('Unable to scan directory: ' + err);
	} 

	files.filter(f=>Posfixed(f,".html")).map(UpdateMeta);
}


function UpdateMeta(file){
	var identifier=UnPosfix(file,".html");
	var path="../"+file;

		console.log(identifier,"!")
		//overwrite the default url to the current page
		DefaultURL=function(){return "https://pedropsi.github.io/"+file};
		LoadNodeSource('../data/page');
		
		var start='<script id="post">var v={POST:()=>`';
		var end='`};</script><script src="data/page.js"></script>';

		var css='<link href="codes/index.css" rel="stylesheet" type="text/css"/>';
		
		var code=fs.readFileSync(path,"utf8");
			code=code.replace(/\n/g,"§§SPACE§§").replace(/\<head\>.*\<\/head\>/ig,"").replace(/\§\§SPACE\§\§/g,"\n");
			
		var post=code.replace(/.*POST\:\(\)\=\>\`/mig,"");
			post=UnAfterfix(post,end);
			post=post.replace(/^\s+/m,"");
			post=eval("`"+post+"`")
			
		v.POST=(()=>post);
		var head=v.HEAD().replace(css,"").replace(/\n/ig," ").replace(/(\s)+/ig,"$1");
		
		code=code.replace(start,`<head>${head}</head>
		
		${start}`
		);

		code=code.replace(/\s+<head>/,"\n<head>");
		
		fs.writeFile(path,code,function(err){
			if(err)
				console.log("Error: can't save "+file,err)
			else
				console.log('Saved '+file+"!");
		  });

}



fs.readdir("../",FilterHTMLFiles)

// function Reporter(successtext){
// 	return function(err){
// 		if(err)
// 			throw err;
//   		console.log(successtext);
// 	};
// }

// // Site specific

// UpdateSitemap=function(){
// 	var data=SitemapXML();
// 	WriteFile(data,"../sitemap.xml");
// }

// UpdateRSS=function(){
// 	var data=RSSXML();
// 	WriteFile(data,"../rss.xml");
// }

// UpdateAll=function(){
// 	UpdateSitemap();
// 	UpdateRSS();
// }

// // Do it


// Listen("ConsolidateVariables",UpdateAll);
// LoadNodeSource('../data/page');
