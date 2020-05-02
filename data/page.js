
//Page Build Sequence
CMSDependenciesList=["data/variables.js","data/cms.js","data/links.js","data/media.js","data/people.js","data/news.js"];;

LoadCMS=function(){
	var cms=CMSDependenciesList;
	LoadSources(CMSDependenciesList,LoadPrescript)
}

LoadNodeCMS=function(){
	var cms=CMSDependenciesList;	//path specification, depending on node loader file location
	LoadSources(cms,ConsolidateVariables);
}

DATA={};

ConsolidateVariables=function(){
	DATA["links"]=NormaliseVariables(DATA["links"],LinkTemplate);

	if(typeof v==="undefined")
		v={};

	v={
		...DATA["variables"],
		...DATA["cms"],
		...DATA["media"],
		...DATA["people"],
		...DATA["news"],
		...DATA["page"],
		...DATA["links"],
		...v
	};
	
	Shout("ConsolidateVariables");
	
}

LoadPrescript=function(){
	ConsolidateVariables()

	if(NodejsDetected())
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


if(NodejsDetected()){
	ExportNodeFunctions();
	LoadNodeCMS();
}
else
	ListenOnce("load",LoadCMS);