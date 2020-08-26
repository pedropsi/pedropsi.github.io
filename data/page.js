//Page Build Sequence
CMSDependenciesList=[
	"data/variables.js",
	"data/cms.js",
	"data/links.js",
	"data/media.js",
	"data/people.js",
	"data/news.js"];

LoadCMS=function(){
	var cms=CMSDependenciesList;
	LoadSources(cms,LoadPrescript)
}

LoadNodeCMS=function(){
	var cms=CMSDependenciesList;
	LoadSources(cms,ConsolidateVariables);
}

if(typeof DATA==="undefined")
	DATA={};

ConsolidatedVariables=function(){
	return {
		...DATA["variables"],
		...DATA["cms"],
		...DATA["media"],
		...DATA["people"],
		...DATA["news"],
		...DATA["page"],
		...DATA["links"]
	}
}

ConsolidateVariables=function(){
	DATA["links"]=NormaliseVariables(DATA["links"],LinkTemplate);

	if(typeof v==="undefined")
		v={};

	v={
		...ConsolidatedVariables(),
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

	var LOGO=v.LOGO_SVG();

	var sources=["codes/communication.js","data/guestbook.js","codes/analytics.js"];
	LoadSources(sources,PageFeatures);

	if(v.POSTSCRIPT)
		LoadSources(v.POSTSCRIPT(),Identity);

}

PageFeatures=function(){
	PageFeaturesDOM();
	if(PageFragment()!=="")
		Navigate(document.URL,true);

	Shout("LazyLoader");
	LazyGuestbookLoad();

}

PageFeaturesDOM=function(){
	ListenOnce('beforeinstallprompt',PWAInstallAsk);
	ListenOnce('appinstalled',PWAInstallConfirm);
	DynamicTables();
	AnalyticsStart();
	StartNightMode();
	InlineSVG();
	//Capture events
	Listen("mousedown",function(e){FocusElement(e.target)});//Focus clicked items (also to escape focus by clicking in unfocusable parents)
	//Listen("click",function(e){FocusElement(e.target)});
	//ResumeCapturingKeys(CaptureComboKey);
	//PurchasedConfirm();
	Connection();
	
	
	IndexTitles();
	ListenOnce("IndexTitles",
		()=>AddTitleIndex(".main .whiteboard")//First whiteboard where main content is
	)
	
	if(PageSearch("debug"))
		RequestDebugger();

	if(PageIdentifier()==="contact")
		RequestContact();

}

	
//Minimal page HTML

DoctypeHTML=function(lang){
	var lang=lang||"en-US";
	return `<!DOCTYPE html>
<html lang="${lang}" prefix="og: http://ogp.me/ns#">`
}

PageWithMetaHTML=function(v,post){
	return `${v.HTML_DOCTYPE()}
	<head>
		${v.HEAD()}
		<script src="codes/data-transfer.js"></script>
		${post}
	</head></html>
	`
}

PageMetaReplace=function(code){
	var start='<script id="post">var v={POST:()=>`';
	var end='`};</script><script src="data/page.js"></script>';

	if(!In(code,start)||!In(code,end))
		v.POST=(()=>`
		
		`);
	else{
		var token="@-@BREAK@-@";
		var postitems=code.replace(/.*POST\:\(\)\=\>\`/mig,token);
			postitems=postitems.replace(/\`\}\;\<\/script\>\<script src\=\"data\/page\.js\"\>\<\/script\>(?:.|\n)*/ig,token);

			//Get Middle and trim spaces
			post=postitems.split(token)[1];
			post=post.replace(/^\s+/ig,"").replace(/\s+$/ig,"");
			
		var evalpost=eval("`"+post+"`");

			post=start+"\n\n"+post+"\n\n"+end;
			
		v.POST=(()=>evalpost);
	}

	return PageWithMetaHTML(v,post);
}


if(NodejsDetected()){
	ExportNodeFunctions();
	LoadNodeCMS();
}
else
	ListenOnce("load",LoadCMS);