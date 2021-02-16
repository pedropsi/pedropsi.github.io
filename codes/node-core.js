////////////////////////////////////////////////////////////////////////////////
// File utils

var DIR="../";
require(DIR+'codes/core');
require(DIR+'data/page');
// require(DIR+'codes/core/search');
var fs = require('fs');

//Compatibilities
SelectedGamesHTML=Identity;
StoreHTML=Identity;


function FilenameMapper(Modifier,FileFilter){
	var FileFilter=FileFilter||True;
	return function F(err,filenames){
				if(err){
					return console.log('Unable to scan directory: ' + err);
				}
				filenames.filter(f=>(Posfixed(f,".html")&&FileFilter(f))).map(Modifier);
	};
}


////////////////////////////////////////////////////////////////////////////////
// Meta tags auto updater in HTML

function SetPage(file){
	CurrentIdentifier(UnPosfix(file,".html"));
	ExportCMSProperties();
	//Global variable
	v=ConsolidatedVariables();
}

function UpdateFileMeta(file){
	var path=DIR+file;
	console.log("..............",file);
	SetPage(file);

	UpdateMetaCode=function(){
		var oldcode=fs.readFileSync(path,"utf8");
		var newcode=PageWithMetaHTML(v,PagePost(oldcode));

		if(oldcode!==newcode){
			var saved=true;
			fs.writeFileSync(path,newcode,function(err){if(err)saved=false});
			console.log(saved?'>>> Saved ':"Error: can't save ",file,"!");
		}else
			console.log('Skipped '+file+"...");
	}

	if(CMSObject(CurrentIdentifier()))
		UpdateMetaCode();
	else
		console.log("jumped "+file+" with id: ",CurrentIdentifier());
}


function RefreshDirectoryMeta(){
	LoadNodeSource(DIR+'data/page');

	fs.readdir(DIR,FilenameMapper(UpdateFileMeta));
}

function ExtractText(file){
	SetPage(file);
	var code=fs.readFileSync(DIR+file,"utf8");
		code=PagePost(code);

	var text=`
		${v.TITLE()}
		${v.ONE_LINER()}
		${StripHTML(v.POST())}
	`;

	return text;
}


// function ExportSearchTree(){
// 	var Database={};
// 	function UpdateSearchDatabase(file){
// 		console.log(">>",file);
// 		Database=AppendSearchTree(ExtractText(file),file,Database);
// 	}
// 	fs.readdir(DIR,FilenameMapper(UpdateSearchDatabase,True));
	
// 	setTimeout(()=>fs.writeFileSync(DIR+"data/search.js","var SearchDatabase="+ReString(Database),function(err){if(err)saved=false}),5000);
// 	console.log(">>>>> exporting search database in 5 secs");
// }

//ExportSearchTree()
RefreshDirectoryMeta()