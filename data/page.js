//Page Build Sequence
CMSDependenciesList=[
	"data/variables.js",
	"data/cms.js",
	"data/links.js",
	"data/media.js",
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

HeadReAdd=function(){
	//RemoveElements("script");
	RemoveElements("meta");
	RemoveElements("title");
	GetElements("link").filter(e=>!In(e.type,"css")).map(RemoveElement);
	AddElement(v.HEAD_ITEMS(),"HEAD");
}

BuildCMSPage=function(){
	HeadReAdd();
	
	document.body.innerHTML=v.BODY();

	var sources=["codes/intercom.js","data/guestbook.js","codes/insight.js"];
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
	HearOnce('beforeinstallprompt',PWAInstallAsk);
	HearOnce('appinstalled',PWAInstallConfirm);
	DynamicTables();
	AnalyticsStart();
	StartNightMode();
	InlineSVG();
	//Capture events
	Listen("mousedown",function(e){FocusElement(e.target)});//Focus clicked items (also to escape focus by clicking in unfocusable parents)
	//Listen("click",function(e){FocusElement(e.target)});
	//ResumeCapturingKeys(CaptureComboKey);
	//PurchasedConfirm();
	ListenOnce('offline',MonitorConnection);
	
	AddElement(ScrollUpHTML(),".whiteboard");
	setTimeout(IndexTitles,5000);
	HearOnce("IndexTitles",
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
		${v.HEAD().replace(/\s+/ig," ")}
		<script src="codes/core.js"></script>
		${post}
	</head></html>
	`
}


NavbarItems=[
	"news",
	{NAME:"All posts",LINK:"tag.html?search=!Class+!Sitemap"},
	{NAME:"Puzzles",LINK:"tag.html?search=Puzzle"},
	"hall-of-fame"+(In(["selected-puzzlescript-games","puzzlescript-games-database","game-console","hall-of-fame"],PageIdentifier())?"-global":""),
	"about",
	"contact",
	"guestbook",
	"store"];

NavLinkHTML=function(link){
	return `<a href="${IsString(link)?link+".html":link.LINK}" class="nav-link">${IsString(link)?Access(link,"TITLE"):link.NAME}</a>`
}

NightModeButton=function(){
	return `<div class="nav-link" id="NightMode" onclick='ToggleNightMode()'>${ObtainSymbol("moon")}</div>`
}

NavbarHTML=function(){
	return`
	<div class="navbar">
		<a href="index.html">
			<div class="logo">${LogoSVG()} Home</div>
		</a>
		<nav>
			${NavbarItems.map(NavLinkHTML).join(`
			`)}
			${NightModeButton()}
		</nav>
		<div class="rainbowline"></div>
	</div>`
}

LogoSVG=function(Opts){
	var Opts=Opts||{};
	var cla=Opts.rectclass?(Opts.rectclass+" "):"";
	var dims=`x="-5" y="-5" width="10" height="10"`;
	var viewBox=Opts.viewBox?Opts.viewBox:"-8 -8 16 16";
	return `
<?xml version="1.0"?>
<svg viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg" width="100" height="100">
	<rect ${dims} class="${cla} darkblue"		fill="#070070"></rect>
	<rect ${dims} class="${cla} darkblue"		fill="#070070" transform="rotate(45)">					</rect>
	<rect ${dims} class="${cla} blue"			fill="#000fff" transform="scale(0.765367) rotate(22.5)"></rect>
	<rect ${dims} class="${cla} blue"			fill="#000fff" transform="scale(0.765367) rotate(67.5)"></rect>
	<rect ${dims} class="${cla} lightblue"		fill="#1982ed" transform="scale(0.585786) rotate(0)">	</rect>
	<rect ${dims} class="${cla} lightblue"		fill="#1982ed" transform="scale(0.585786) rotate(45)">	</rect>
	<rect ${dims} class="${cla} turquoise"		fill="#3bf8de" transform="scale(0.448342) rotate(22.5)"></rect>
	<rect ${dims} class="${cla} turquoise"		fill="#3bf8de" transform="scale(0.448342) rotate(67.5)"></rect>
	<rect ${dims} class="${cla} green"			fill="#46f46f" transform="scale(0.343146) rotate(0)">	</rect>
	<rect ${dims} class="${cla} green"			fill="#46f46f" transform="scale(0.343146) rotate(45)">	</rect>
	<rect ${dims} class="${cla} yellow"			fill="#f0f8af" transform="scale(0.262632) rotate(22.5)"></rect>
	<rect ${dims} class="${cla} yellow"			fill="#f0f8af" transform="scale(0.262632) rotate(67.5)"></rect>
	<rect ${dims} class="${cla} lightyellow"	fill="#fff9c9" transform="scale(0.201010) rotate(0)">	</rect>
	<rect ${dims} class="${cla} lightyellow"	fill="#fff9c9" transform="scale(0.201010) rotate(45)">	</rect>
</svg>`
}

DebuggerHTML=function(){
	return `<span onclick="RequestDebugger()">Debug</span>`
}

FooterHTML=function(){
	return `
	<footer class="footer">
		<p>${ViewCounterHTML()}</p>
		<p>${HyperText("Copyright")}. ${v.A_TERMS()}. ${A("privacy-policy")}. ${A("status")}. ${DebuggerHTML()}.</p>
		<p> ${v.A_PRESS()}. ${A("subscribe")} and ${v.A_SUPPORT()}!</p>
	</footer>`
}

TagOpenHTML=function(tagattribs){
	return `<code><span><</span>${tagattribs}<span>></span></code>`;	
}
TagCloseHTML=function(tagattribs){
	return TagOpenHTML(Prefix(UnAfterfix(tagattribs," "),"/"));
}
CHTML=function(tagattribs,close){
	return TagOpenHTML(tagattribs)+(close?TagCloseHTML(tagattribs):"");
}

//Post HTML

PagePost=function(code){
	var start='<script id="post">var v={POST:()=>`';
	var end='`};</script><script src="data/page.js"></script>';
	var post="";

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

	return post;
}


if(NodejsDetected()){
	ExportNodeFunctions();
	LoadNodeCMS();
}
else
	HearOnce("load",LoadCMS);