////////////////////////////////////////////////////////////////////////////////
// File operations 
// (node.js)

var http = require('http');
var fs = require('fs');

// Save files

function WriteFile(data,source){
	fs.writeFile(source,data,Reporter(`Saved file ${source} with ${data}`));
}

function Reporter(successtext){
	return function(err){
		if(err)
			throw err;
  		console.log(successtext);
	};
}

// Site specific

UpdateSitemap=function(){
	var data=SitemapXML();
	WriteFile(data,"../sitemap.xml");
}

UpdateRSS=function(){
	var data=RSSXML();
	WriteFile(data,"../rss.xml");
}

UpdateAll=function(){
	UpdateSitemap();
	UpdateRSS();
}

// Do it

require('../codes/data-transfer');
Listen("ConsolidateVariables",UpdateAll);
LoadNodeSource('../data/page');
