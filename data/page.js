//Page Build Sequence
CMSModules=["variables","cms","links","media","news"];
PageDependencyPaths=["codes/intercom.js","data/guestbook.js","codes/insight.js"];

CMSDependencyPaths=CMSModules.map(name=>JoinPath("data",Posfix(name,".js")));
PageModules=PageDependencyPaths.map(path=>UnPosfix(UnBeforfix(path,"/"),".js"));


LoadCMS=function(){
	LoadSources(CMSDependencyPaths,LoadPrescript)
}

LoadNodeCMS=function(){
	LoadSources(CMSDependencyPaths,ConsolidateVariables);
}

if(typeof DATA==="undefined")
	DATA={};

ConsolidatedVariables=function(){
	return Merge(
		DATA["variables"],
		DATA["cms"],
		DATA["media"],
		DATA["news"],
		DATA["page"],
		DATA["links"]
	)
}


ConsolidateVariables=function(){
	DATA["links"]=ReValueObject(DATA["links"],function(v){return ()=>LinkTemplate(v)});

	if(typeof v==="undefined")
		v={};

	v=Merge(ConsolidatedVariables(),v);

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
	AppendToElement(v.HEAD_ITEMS(),"HEAD");
}

BuildCMSPage=function(){
	HeadReAdd();
	
	document.body.innerHTML=v.BODY();

	LoadSources(PageDependencyPaths,PageFeatures);

	if(v.POSTSCRIPT)
		LoadSources(v.POSTSCRIPT(),Identity);

}

DomainLock=function(){
	var link=JoinPath(v.SITE(),PageIdentifier());
	var linkredir=PageRedirect();
	var announce=AnnounceHTML({
		txt:`
			<p>This site is not authorised by ${v.NAME()}, the copyright owner, to reproduce ${PageTitle()}.<p>
			<p>Prefer the original. Prefer ${v.SITE_SHORT()}.</p>
			`,
		link:linkredir,
		fragment:"redirect",
		buttonTxt:link,
		target:"_blank",
		id:"redirect"
	})
	RedirectSelf();
	setTimeout(()=>ReplaceChildren(announce,"BODY"),10000);
	setTimeout(()=>GetElement("redirect").click(),12000); 
}

RedirectSelf=function(){
	try{
		return top.location.href=PageRedirect();
	}
	catch(e){
		return;
	}
}

PageRedirect=function(){
	return PageReFragment(JoinPath(v.SITE(),PageIdentifier()+".html?from="+document.referrer),"redirect");
}

PageFeatures=function(){
	//Redirect
	try{
		if(top!==self)
			return DomainLock()
	}catch(e){
		return DomainLock()
	}

	PageFeaturesDOM();
	if(PageFragment()!=="")
		Navigate(document.URL,true);

	Shout("LazyLoader");
	LazyGuestbookLoad();

}

PageIndex=function(){
	HearOnce("TitlesIndex",function(){
		AddTitleIndex(".main .whiteboard")//First whiteboard where main content is
		var fragment=ClosestFragment(PageFragment()); //required for dynamism
		if(fragment)
			ScrollInto(fragment)
	})
	TitlesIndex();
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

	ListenOnce('offline',MonitorConnection);
	
	AppendToElement(ScrollUpHTML(),".whiteboard");
	AppendToElement(Glyph("shards"),Last(GetElements(".whiteboard p")))
	setTimeout(PageIndex,2000);

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
		${MonospaceString(v.HEAD())}
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
	return AnchorHTML(
		Stringed(link)?Access(link,"TITLE"):link.NAME,
		Stringed(link)?link+".html":link.LINK,
		{class:"nav-link"}
	);
}

NightModeButton=function(){
	return `<div class="nav-link selectable" id="NightMode" onclick='ToggleNightMode()'>${Glyph("moon")}</div>`
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


//Logo

LogoSVG=function(Opts){
	var Opts=Opts||{};
	var cla=Opts.rectclass?(Opts.rectclass+" "):"";
	var dims=`x="-5" y="-5" width="10" height="10"`;
	var viewBox=Opts.viewBox?Opts.viewBox:"-8 -8 16 16";
	return `
<?xml version="1.0"?>
<svg viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg" width="100" height="100">
	${LogoGeometry.map(c=>LogoRect(c,dims,cla))}
</svg>`
}

LogoGeometry=[
	["darkblue"		,"#070070",1.000000,[0,45]],
	["blue"			,"#000fff",0.765367,[22.5,67.5]],
	["lightblue"	,"#1982ed",0.585786,[0,45]],
	["turquoise"	,"#3bf8de",0.448342,[22.5,67.5]],
	["green"		,"#46f46f",0.343146,[0,45]],
	["yellow"		,"#f0f8af",0.262632,[22.5,67.5]],
	["lightyellow"	,"#fff9c9",0.201010,[0,45]]
]

LogoRect=function(Arr,dims,cla){
	return Arr[3].map(rot=>`<rect ${dims} class="${cla} ${Arr[0]}" fill="${Arr[1]}" transform="scale(${Arr[2]}) rotate(${rot})"></rect>`).join(`
	`);
}


DebuggerHTML=function(){
	return `<span onclick="RequestDebugger()">Debug</span>`
}

PageTestReport=function(){
	var coreModules=Join(["core"],CMSModules,PageModules);
	if(PageIdentifier()==="status")
		var modules=coreModules;
	else
		var modules=Complement(Keys(DefinedVariableNames),Append(coreModules,"pre"));
	Wbug(modules);
	TestHTMLReport(".whiteboard .post",modules);
	setTimeout(function(){ScrollInto("#Problems-Found")},10000)
}

AutoTestButtonHTML=function(excludedModules){
	var b=InlineButtonHTML({
		txt:"test",
		onclick:`PageTestReport()`
	});
	return b;
}

FooterHTML=function(){
	return `
	<footer class="footer">
		<p>${ViewCounterHTML()}</p>
		<p>${HyperText("Copyright")}. ${v.A_TERMS()}. ${A("privacy-policy")}. ${A("status")} ${AutoTestButtonHTML()}. ${DebuggerHTML()}.</p>
		<p> ${A("press")}. ${A("subscribe")} and ${v.A_SUPPORT()}!</p>
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

AnnounceHTML=function(Opts){
	o={class:"announce"};
	if(Opts.target)
		o.target=Opts.target
	return AHTML(`
	<div>
		${Opts.txt}
		${ButtonHTML({txt:Opts.buttonTxt||"Learn more"})}
	</div>`,
	PageReFragment(Opts.link,Opts.fragment||"announce"),
	o)
}

//Post HTML

PagePost=function(code){
	var start='<script id="post">var v={POST:()=>v.POST=`';
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
			post=TrimWhitespaceString(post);
			
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