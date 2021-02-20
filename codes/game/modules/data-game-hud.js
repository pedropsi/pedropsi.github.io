
if(typeof ObtainHUDPicker==="undefined")
	ObtainHUDPicker=Identity;

if(typeof ObtainHUDElement==="undefined")
	ObtainHUDElement=function(){return document.body};

HUDRadius=function(){
	return Min(window.innerWidth,window.innerHeight,ObtainHUDElement().clientWidth,ObtainHUDElement().clientHeight)*0.4;
}

HUDScale=function(dial){
	var scales={
		"hud-inn":0.5,
		"hud-mid":0.75,
		"hud-out":1
	}
	return HUDRadius()*scales[dial]
}

HUDOffset=function(dial){
	var offsets={
		"hud-inn":-PI/2,
		"hud-mid":-PI/2-2*PI/13/2,
		"hud-out":-PI/2
	}
	return offsets[dial]
}

HUDHtml=function(id){
	return `
		<div class="hud" id="${id}">
		${DialHTML(["0","1","2","3","4","5","6","7","8","9","_","_","_"],"hud-inn")}
		${DialHTML("ABCDEFGHIJKLM","hud-mid")}
		${DialHTML("NOPQRSTUVWXYZ","hud-out")}
		</div>
	`
}

RenderHUD=function(id,target){
	var id=id?id:GenerateId();
	ListenOnce("resize",function(){if(GetElement(id))RenderHUD(id,target)});
	UnRenderHUD(id);
	PrependToElement(HUDHtml(id),target);
	ListenOnce("touchstart",UnRenderHUD,id);
}

UnRenderHUD=function(id){
	if(id)
		RemoveElement(id);
	else
		RemoveElement(".hud")
}

DialHTML=function(letters,clas){
	if(typeof letters==="string")
		letters=letters.split("");
	
	var radius=HUDScale(clas);
	var offset=HUDOffset(clas);

	var numbers="";
	var d=letters.length;
	for(var n=0;n<d;n++)
		numbers=numbers+RingHTML(letters[n],radius,d,n,offset);
	return `<div class="dial ${clas}">${numbers}</div>`;
}

RingHTML=function(digit,radius,d,n,offset){
	var xy=RadialXY(radius,d,n,offset);
	var	x=Floor(xy[0]);
	var	y=Floor(xy[1])-20;
	return `<div class="ring ring${n}" style="transform: translateX(${x}px) translateY(${y}px)">${digit}</div>`;
}

RadialXY=function(radius,divisions,n,offset){
	var theta= 2*PI*(n/divisions) +offset;
	return [radius*Cos(theta),radius*Sin(theta)];
}

LaunchHUD=function(touchSel,renderSel){
	var hudid=GenerateId();

	Listen('touchmove',function(e){  
		e.preventDefault();
		HandleTouchMover(HighlightRing)(e);
	},touchSel);

	Listen('touchend' ,function(e){
		e.preventDefault();
		HandleTouchEnder(ObtainHUDPicker)(e);
		UnRenderHUD(hudid);
	},touchSel);

	Listen('touchstart',function(e){
		e.preventDefault();
		HandleTouchStart(e);
		RenderHUD(hudid,renderSel);
	},touchSel);
}

CurrentDialRing=function(radius,angle){
	var outmid=(HUDScale("hud-out")-HUDScale("hud-mid"))/2;
	var innmid=(HUDScale("hud-mid")-HUDScale("hud-inn"))/2;

		 if(radius>=(HUDScale("hud-out")-outmid))
		var dial="hud-out";
	else if(radius>=(HUDScale("hud-mid")-innmid))
		var dial="hud-mid";
	else if(radius>=(HUDScale("hud-inn")-innmid))
		var dial="hud-inn";
	else	
		return["none","none"];

	var offset=HUDOffset(dial);
	if(GetElement(".rotate90"))
		offset=offset+PI/2

	var ring=Floor((2*PI-angle-offset+(2*PI)/26)%(2*PI)/(2*PI)*13)

	return [dial,ring];
}

HighlightRing=function(radius,angle){
	dialring=CurrentDialRing(radius,angle);

	GetElements(".dial").map(Deselect);
	Select("."+dialring[0]);

	GetElements(".ring").map(Deselect);
	Select("."+dialring[0]+" .ring"+dialring[1]);
}

LoadSource("codes/game/modules/data-game-hud.css");
DefinedShout("data-game-hud")


