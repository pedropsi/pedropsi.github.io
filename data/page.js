//Load helpers
function UnPathExt(path){
	return UnPosfix(UnPrefix(UnPrefix(UnPrefix(path,"codes/"),"test/"),"data/"),".js");
}

function LoadSources(sourceArray,SuccessF){
	var shoutArray=sourceArray.map(UnPathExt);
	sourceArray.map(LoadSource);
	ListenAndOnce(shoutArray,SuccessF); 
}


//Page Build Sequence
function LoadCMS(){
	var cms=["data/variables.js","data/cms.js","data/links.js","data/media.js","data/people.js","data/news.js"];
	LoadSources(cms,LoadPrescript)
}

function LoadPrescript(){
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
	AddTitleIndex();

	var sources=["codes/communication.js","codes/analytics.js"];
	if(v.POSTSCRIPT)
		sources=sources.concat(v.POSTSCRIPT());
	LoadSources(sources,PageFeatures);
}

function PageFeatures(){
	DynamicTables();
	StartAnalytics();
}

ListenOnce("load",LoadCMS);

//Skeleton

function PageSkeletonHTML(){
	return `
<script src="codes/data-transfer.js"></script>
<script src="data/page.js"></script>
<script id="post">var Post={POST:()=>""};
try{v={...v,...Post}}catch{v=Post}</script>
`;
}

