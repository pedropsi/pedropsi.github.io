////////////////////////////////////////////////////////////////////////////////
// Analytics and Actions
var analyticsURL="https://script.google.com/macros/s/AKfycbwuyyGb7XP7H91GH_8tZrXh6y_fjbZg4vSxl6S8xvAAEdyoIHcS/exec";
var clearance = "test";
var dataHeaders={
	"analytics":	"[\"identifier\",\"language\",\"timezone\",\"screen\",\"agent\",\"from\",\"campaign\",\"name\"]",
	"actions":		"[\"identifier\",\"type\",\"target\",\"name\"]",
	"status":		"[\"identifier\",\"agent\",\"errors\",\"name\"]"
}

function DataUnitHeaders(){
	return {
		formGoogleSendEmail:"",
		"identifier":PageIdentifier(PageURL()),
		"name":UserId()
	};		
}

function DataUnit(datatype){
	var type=datatype.toLowerCase();
	var headers=dataHeaders[type];
	if(headers)
		return FuseObjects(DataUnitHeaders(),{
			formDataNameOrder:headers,
			formGoogleSheetName:type
			});
}

 function FingerprintOpen(){
	var data=DataUnit("Analytics");
	
	function LangUpperCase(s){
		var pos=s.replace(/(.*-)/,"").replace(s,"");
		var pre=s.replace(/(-.*)/,"").replace(s,"");
		return pos.length?(pre+"-"+pos.toUpperCase()):s
	};
	
	var referrer=document.referrer;
	
	var source=PageSearch("source");
		source=source?source:PageTag();
	
	return FuseObjects(data,{
		"language":LangUpperCase(window.navigator.language),
		"timezone":Date(),
		"screen":[	window.screen.height,
					window.screen.width,
					window.screen.colorDepth].join("x"),
		"agent":window.navigator.userAgent,
		"from":IsInnerLink(referrer)?PageIdentifier(referrer):referrer,
		"campaign":source?source:"none"
		});		
}

function FingerprintAction(type,target){
	var data=DataUnit("Actions");
	return FuseObjects(data,{
		"target":target,
		"type":type
	});
}

function FingerprintLink(ref){
	var p=PageIdentifier(ref);
	if(p==="game-console")
		p=p+"?game="+PageSearch("game",ref);
	
	return FingerprintAction(
		IsInnerLink(ref)?"InLink":"OutLink",
		IsInnerLink(ref)?p:ref
	)
}

function FingerprintStatus(error){
	var data=DataUnit("Status");
	return FuseObjects(data,{
		"errors":error,
		"agent":window.navigator.userAgent
	});
}

// Echoes
 
function EchoAnalytics(data){
	if(AnalyticsClearance())
		EchoData(data,analyticsURL);
}
 
function RegisterOpen(){
	EchoAnalytics(FingerprintOpen());
}
function RegisterLink(l){
	EchoAnalytics(FingerprintLink(l));
};
function RegisterElementClicked(b){
	EchoAnalytics(FingerprintAction("Click",b.innerText));
}
function RegisterMosaicToggled(b){ //Mosaic change
	EchoAnalytics(FingerprintAction("BG toggle","---"));
}
function RegisterNightModeToggled(b){
	EchoAnalytics(FingerprintAction("NM toggle",b.innerText));
}

function RegisterPWA(status){
	EchoAnalytics(FingerprintAction("PWA Prompt",status));
}

function RegisterStatus(errordata){
	EchoAnalytics(FingerprintStatus(JSON.stringify(errordata)));
}

////////////////////////////////////////////////////////////////////////////////
// Links Management

function ChangeLinks(f){
	MarkElements("a",f);
}

function OutLinks(){
	function PrepareLink(l){
		var ref=l.href;
		if(IsOuterLink(ref)){
			l.setAttribute("target","_blank");};
		l.addEventListener("mousedown", (function(){RegisterLink(ref)}),false);
	};
	ChangeLinks(PrepareLink);
};

////////////////////////////////////////////////////////////////////////////////
// Link reformatting
/*
function AnonimiseLinks(){
	function PrepareLink(l){
		var ref=l.href;
		if(IsInnerLink(ref))
			l.href= PageUnTag(ref)+"#"+clearance;
		};
	ChangeLinks(PrepareLink);
}*/
 
function AbsolutiseLinks(){
	function PrepareLink(l){
		var ref=l.href;
		console.log("ABS!",ref);
		if(IsAbsolutableLink(ref))
			l.href=PageAbsolute(PageUnTag(ref));
		};
	ChangeLinks(PrepareLink);
}



////////////////////////////////////////////////////////////////////////////////
// Analytics: custom actions

function ElementClicked(b){Listen("click", function(){RegisterElementClicked(this)},b); return b};
function MosaicToggled(b){Listen("click", function(){RegisterMosaicToggled(this)},b); return b};
function NightModeToggled(b){Listen("click", function(){RegisterNightModeToggled(this)},b); return b};


///////////////////////////////////////////////////////////////////////////////
// Analytics Behaviour

function AnalyticsClearance(){
	return ((PageTag()!==clearance)&&!isFileLink(PageURL()))||(PageSearch("source")==="homescreen");
}

function StartAnalytics(){
	if(AnalyticsClearance()){
		RegisterOpen();
		MarkElements(".button",ElementClicked);
		MarkElements(".mosaic",MosaicToggled);
		MarkElements("#NightMode",NightModeToggled);
		OutLinks();
	}
	else{
	////AnonimiseLinks();
	};
}

//////////////////////////////////////////////////////////////////////
Shout("analytics")