
//Page Build Sequence
CMSDependenciesList=["data/variables.js","data/cms.js","data/links.js","data/media.js","data/people.js","data/news.js"];;

LoadCMS=function(){
	var cms=CMSDependenciesList;
	LoadSources(CMSDependenciesList,LoadPrescript)
}

LoadNodeCMS=function(){
	var cms=CMSDependenciesList.map(s=>Prefix(s,"../"));
	LoadSources(cms,ConsolidateVariables);
}

ConsolidateVariables=function(){
	v={
		...DATA["Variables"],
		...DATA["CMS"],
		...DATA["Media"],
		...DATA["People"],
		...DATA["News"],
		...DATA["Page"],
		...v
	};

	DATA["Links"]=NormaliseVariables(DATA["Links"],LinkTemplate);
	v={...v,...DATA["Links"]}
}

LoadPrescript=function(){
	ConsolidateVariables()

	if(UnderNodeJS())
		return;

	if(v.PRESCRIPT)
		LoadSources(v.PRESCRIPT(),BuildCMSPage);
	else
		BuildCMSPage();
}

BuildCMSPage=function(){
	document.head.innerHTML=v.HEAD();
	document.body.innerHTML=v.BODY();
	//document.body.id=PageIdentifier();
	var LOGO=v.LOGO_SVG();
	
	IndexTitles();
	AddTitleIndex(".main .whiteboard");//First whiteboard where main content is
	

	var sources=["codes/communication.js","data/guestbook.js","codes/analytics.js"];
	LoadSources(sources,PageFeatures);

	if(v.POSTSCRIPT)
		LoadSources(v.POSTSCRIPT(),Identity);

}

PageFeatures=function(){
	DisplayGuestbook();
	PageFeaturesDOM();
}

PageFeaturesDOM=function(){
	DynamicTables();
	StartAnalytics();
	InlineSVG();
	//Capture events
	Listen("mousedown",function(e){FocusElement(e.target)});//Focus clicked items (also to escape focus by clicking in unfocusable parents)
	Listen("click",function(e){FocusElement(e.target)});
	ResumeCapturingKeys(CaptureComboKey);
}


if(UnderNodeJS())
	LoadNodeCMS();
else
	ListenOnce("load",LoadCMS);

//Skeleton

PageSkeletonHTML=function(){
	return `
<!DOCTYPE html>
<link href="codes/index.css" rel="stylesheet" type="text/css"/>
<script src="codes/data-transfer.js"></script>
<script id="post">var Post={POST:()=>""};
try{v={...v,...Post}}catch{v=Post}</script>
`;
}
