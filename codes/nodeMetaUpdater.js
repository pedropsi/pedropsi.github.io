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

		if(oldcode!==newcode){
			var saved=true;
			fs.writeFileSync(path,newcode,function(err){if(err)saved=false});
			console.log(saved?'>>> Saved ':"Error: can't save ",file,"!");
		}else
			console.log('Skipped '+file+"...");
	}

	if(CMSObject(CurrentIdentifier()))
		UpdateMetaCode();
}



LoadNodeSource('../data/page');

//Compatibilities
SelectedGamesHTML=Identity;
StoreHTML=Identity;

fs.readdir("../",FilterHTMLFiles)



