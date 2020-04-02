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
	
	InlineSVG();
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


function InlineSVG(){
	var images=GetElements("img");
	function ReplaceSource(img){
		var src=img.src;
		var alt=img.alt;
		var title=img.title;
		function ReplaceSVG(svgHTML){
			var palette={
				"\"#002060\"":`"#002060- class="darkblue"`,
				"\"#1A00DA\"":`"#1A00DA- class="blue"`,
				"\"#0098F6\"":`"#0098F6- class="lightblue"`,
				"\"#0CFCBD\"":`"#0CFCBD- class="turquoise"`,
				"\"#5DFF61\"":`"#5DFF61- class="green"`,
				"\"#E9FE90\"":`"#E9FE90- class="yellow"`,
				"\"#0098F6\"":`"#FFF9C8- class="lightyellow"`,
				"\"#FFF0e5\"":`"#FFF0e5- class="beije"`
			}
			svgHTML=StringReplace(StringReplace(svgHTML,palette),{"- class":"\" class"});
			var width=Number(svgHTML.replace(/.*svg width=..?(\d*)..? height=..?(\d*)..?.*/g,"$1"));
			var height=Number(svgHTML.replace(/.*svg width=..?(\d*)..? height=..?(\d*)..?.*/g,"$2"));
			svgHTML=svgHTML.replace(/svg width=..?(\d*)..? height=..?(\d*)..?/g,`svg viewbox="-${width} -${height} ${width} ${height}"`);
			ReplaceElement(svgHTML,img)
		};
		if(InPosfix(src,".svg"))
			LoadData(src,ReplaceSVG)
	}
	images.map(ReplaceSource);
}