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
		var oldcode=fs.readFileSync(path,"utf8");
		var newcode=PageMetaReplace(oldcode);

		if(oldcode!==newcode)
			fs.writeFileSync(path,newcode,function(err){
				if(err)
					console.log("Error: can't save "+file,err)
				else
					console.log('>>> Saved '+file+"!");
			});
		else
			console.log('Skipped '+file+"...");
	}

	UpdateMetaCode();
}



LoadNodeSource('../data/page');

//Compatibilities
SelectedGamesHTML=Identity;
StoreHTML=Identity;

fs.readdir("../",FilterHTMLFiles)



