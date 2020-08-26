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

	
//Minimal pages

PageMinimalCodeStyleHTML=function(){
	return `
	<link href="codes/index.css" rel="stylesheet" type="text/css"/>
	<script src="codes/data-transfer.js"></script>`
}

PageMinimalPreHTML=function(){
	return `<!DOCTYPE html>
	<html prefix="og: http://ogp.me/ns#">
	${PageMinimalCodeStyleHTML()}`
}

PageMinimalPosHTML=function(){
	return `</html>`
}

PageMetaReplace=function(code){
	var start='<script id="post">var v={POST:()=>`';
	var end='`};</script><script src="data/page.js"></script>';

	var css='<link href="codes/index.css" rel="stylesheet" type="text/css"/>';
	
	code=code.replace(/\n/g,"§§SPACE§§").replace(/\<head\>.*\<\/head\>/ig,"").replace(/\§\§SPACE\§\§/g,"\n");
		
	var post=code.replace(/.*POST\:\(\)\=\>\`/mig,"");
		post=UnAfterfix(post,end);
		post=post.replace(/^\s+/m,"");
		post=eval("`"+post+"`")
		
	v.POST=(()=>post);
	var head=v.HEAD().replace(css,"").replace(/\n/ig," ").replace(/(\s)+/ig,"$1");
	
	code=code.replace(start,`<head>${head}</head>
	
	${start}`);

	code=code.replace(/\s+<head>/,"\n<head>");

	return code;
}


if(NodejsDetected()){
	ExportNodeFunctions();
	LoadNodeCMS();
}
else
	ListenOnce("load",LoadCMS);