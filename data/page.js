
//Page Build Sequence
function LoadCMS(){
	var cms=["data/variables.js","data/cms.js","data/links.js","data/media.js","data/people.js","data/news.js"];
	LoadSources(cms,LoadPrescript)
}

function LoadPrescript(){
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

	if(v.PRESCRIPT)
		LoadSources(v.PRESCRIPT(),BuildCMSPage);
	else
		BuildCMSPage();
}

function BuildCMSPage(){
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

function PageFeatures(){
	DisplayGuestbook();
	PageFeaturesDOM();
}

function PageFeaturesDOM(){
	DynamicTables();
	StartAnalytics();
	InlineSVG();
	//Capture events
	Listen("mousedown",function(e){FocusElement(e.target)});//Focus clicked items (also to escape focus by clicking in unfocusable parents)
	Listen("click",function(e){FocusElement(e.target)});
	ResumeCapturingKeys(CaptureComboKey);
}

ListenOnce("load",LoadCMS);

//Skeleton

function PageSkeletonHTML(){
	return `
<!DOCTYPE html>
<link href="codes/index.css" rel="stylesheet" type="text/css"/>
<script src="codes/data-transfer.js"></script>
<script id="post">var Post={POST:()=>""};
try{v={...v,...Post}}catch{v=Post}</script>
`;
}


