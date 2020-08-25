////////////////////////////////////////////////////////////////////////////////
// Meta tags auto updater in HTML

require('../codes/data-transfer');
var fs = require('fs');


function FilterHTMLFiles(err,files){
	if(err){
		return console.log('Unable to scan directory: ' + err);
	}
	files.filter(f=>Posfixed(f,".html")).map(UpdateMeta);
}


function UpdateMeta(file){
	var path="../"+file;
	CurrentIdentifier(UnPosfix(file,".html"));
	ExportCMSProperties();
	v=ConsolidatedVariables();

	UpdateMetaCode=function(){
		var code=PageMetaCode(fs.readFileSync(path,"utf8"))

		fs.writeFileSync(path,code,function(err){
			if(err)
				console.log("Error: can't save "+file,err)
			else
				console.log('Saved '+file+"!");
		});
	}

	UpdateMetaCode();
}



LoadNodeSource('../data/page');

//Compatibilities
SelectedGamesHTML=Identity;
StoreHTML=Identity;

fs.readdir("../",FilterHTMLFiles)



