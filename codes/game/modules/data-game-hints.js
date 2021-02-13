if(typeof savePermission==="undefined")
	savePermission=true;

////////////////////////////////////////////////////////////////////////////////
//Hints

function LocalHints(){
	return LocalStorage("hintsused",undefined,Number);
}

function SaveLocalHints(usedhints){
	if(savePermission&&Hints())
		LocalStorage("hintsused",usedhints);
}

if(typeof LocalSavers==="undefined")
	var LocalSavers=[];
LocalSavers.push(SaveLocalHints);

function Hints(lvl){
	if(!Hints.cached)
		return false;
	
	if(lvl===undefined)
		return Hints.cached;
	else
		return Hints.cached[lvl-1];
}

if(typeof ObtainHintsPath==="undefined")
	var ObtainHintsPath=function(){
		if(FileLinked())
			return "https://pedropsi.github.io/hints/";
		else
			return "hints/";
	}


	
function LoadHintsFile(){
	if(Posfixed(ObtainHintsPath(),"js"))
		return LoadSource(ObtainHintsPath()); //In source must set Hints.used;
	else
		return LoadData(ObtainHintsPath()+PageIdentifier()+".txt",LoadHintTxtData);
}

function LoadHints(){
	if(!Hints.cached)
		return LoadHintsFile();
}

////////////////////////////////////////////////////////////////////////////////
//Hint images

HintImageHTML=function(opts){
	var o=opts?opts:{};
	o.tag="img";
	if(!o.attributes)
		o.attributes={src:"images/splash.png",single:true}
	return ElementHTML(o);
};

HintImage=function(fullpath){
	if(IsGif(fullpath)){
		gifID=GenerateId();
		loaded=HintImageHTML({id:gifID,src:fullpath,onload:'StartGIF('+gifID+')',tabindex:'0',class:"gif"});
	}
	else
		loaded=HintImageHTML({src:fullpath});
	
	return `<div class='hint'>${loaded}</div>`;
}

IsImageReference=function(ref){
	return ImageExtensions.some(function(ext){return Posfixed(ref,Prefix(ext,"."))});
}

//GIF Pause Support
IsGif=function(ref){
	return Posfixed(ref,".gif");
}

StartGIF=function(gid){
	var g=GetElement(gid);

	RemoveElement(GetInElement("CANVAS",g.parentElement));
	var c=AddElement("<canvas class='gif gifcanvas' tabindex='0'></canvas>",g.parentElement);

	HideElement(g);
	ResizeGIF();
	c.addEventListener('resize',ResizeGIF);
	StartGIF.e=c;
	ListenOnce('click',PlayGif(c,gid),c);

	function ResizeGIF(){
		var g=GetElement(gid);
		var c=g.nextSibling;
		var w=g.width;
		var h=g.height;
		c.width=w;
		c.height=h;
		DrawImage({
			"elem":g,
			"width":w,
			"height":h,
			"ctx":".gifcanvas"
		});

		var s=SquareRoot(w*h)/3;

		DrawCircle({
			"size":s/2,
			"fillColor":getComputedStyle(c)["color"],
			"strokeColor":getComputedStyle(c)["background-color"],
			"lineWidth":s/20,
			x:w/2,
			y:h/2,
			"target":".gifcanvas"
		});

		DrawRegularPolygon({
			"size":s/2*0.8,
			"fillColor":getComputedStyle(c)["background-color"],
			"n":3,
			x:w/2,
			y:h/2,
			"target":".gifcanvas"
		});

	}

}

PlayGif=function(c,gid){
	return function(){
		var g=GetElement(gid);
		function SG(){
			return StartGIF(gid)
		}
		StartGIF.e=g;
		ListenOnce('click',SG,g);
		UnHideElement(g);
		HideElement(c);
	}
}

PlayPauseGif=function(){
	if(StartGIF.e)
		StartGIF.e.click();
}

// Keybind(
//		{
// 		"space":PlayPauseGif,
// 		"enter":PlayPauseGif,
// 		// "X":PlayPauseGif
// 	},".gif"
// )


////////////////////////////////////////////////////////////////////////////////
//Text hints


function LoadHintTxtData(hintdata){
	if(hintdata===""){
		console.log("no hints found.");
	}
	else{
		Hints.cached=ParseHintsFile(hintdata);
		LevelInfo.info=ParseLevelInfo(hintdata);
		if(Hints.cached.every(function(h){return h.length<1}))//If no hints inside the file, don't show the button
			return Hints.cached=false;
		StartHints(Hints.cached);
	}
}

function StartHints(hints){
	if(!hints)
		return;

	Hints.used=LocalHints();

	if((IsArray(hints)&&hints.length===0)||Hints.used.length===0)
		Hints.used=hints.map(function(x){return 0}); //will add 1s progressively as used

	ShowButton(HintButton);
	UpdateHyperText("InstructionsHints")
}


function HintDisplay(reference){
	var fullpath=ObtainHintsPath()+PageIdentifier()+"/"+reference.replace(/\s*/,"");
	if(IsImageReference(fullpath)){
		return HintImage(fullpath);
	}
	return "<div class='hint'><p>"+reference+"</p></div>";
}

function HintParagraphArray(hintstxt){
	var hintsperlevel=hintstxt.split(/(?:\n\s*)(?:\n\s*)+/); //Two or more newlines separate level items. Lines starting by level... are ignored
	return hintsperlevel.filter(function(h){return h!=="";}); //ignore empty blocks
}

function ParseDenumberLine(hintline){ //Remove numeric indicators, optionally split by full stops
	return hintline.replace(/^(\d+)(\.\d+)*\s*/,"");
}


function ParseHintsFile(hintstxt){//ignore most whitespace at junctions

	hintsperlevel=HintParagraphArray(hintstxt);
	
	function ParseHintParagraph(hintparagraph){ //One hint per line
		var hintslines=hintparagraph.replace(/(?:^level.*)/i,"");
		hintslines=hintslines.split(/\n\s*/);
		
		hintslines=hintslines.map(ParseDenumberLine);
		hintslines=hintslines.filter(function(l){return l!==""});
		
		return hintslines;
	}
	
	hintsperlevel=hintsperlevel.map(ParseHintParagraph);
	
	for(var i=hintsperlevel.length;i<Levels().length;i++)
		hintsperlevel[i]=[];
	
	return hintsperlevel;
}

function ExtractLevelLine(hintparagraph){
	var titleline=hintparagraph.replace(/\n.*/mgi,""); //remove all but the first line
		titleline=titleline.replace(/(?:\-\-?.*)/i,""); //remove comments : ----etc....

	var title=titleline.replace(/(?:^level\s*)/i,""); //isolate level title and subsequent info
	if(titleline===title)
		return "";
	
	return title;
}

function ParseAssignLevelInfo(hintparagraph){
	var info={};
	var titleline=ExtractLevelLine(hintparagraph);
	
	var unclockconditions=titleline.replace(/.*\brequire\:/i,"");
	if(unclockconditions!==titleline)
		info["unlock"]=TrimWhitespaceString(unclockconditions);
	
	titleline=titleline.replace(/\brequire\:.*/i,""); //remove unlock conditions
	
	var section=titleline.replace(/.*\§\s*/g,"");
	if(section!==titleline)
		info["section"]=TrimWhitespaceString(section);

	titleline=titleline.replace(/\§.*/g,"");//remove section

	var title=TrimWhitespaceString(titleline);
		title=ParseDenumberLine(title);
		title=TrimWhitespaceString(title);
	if(title)
		info["title"]=title;

	return info;
}


function ParseLevelInfo(hintdata){
	var titlesperlevel=HintParagraphArray(hintdata);
	return titlesperlevel.map(ParseAssignLevelInfo);
}



////////////////////////////////////////////////////////////////////////////////
//Hints UI

function CurrentLevelHints(){
	return Hints(CurLevelNumber());
}

function SeeHint(lvl,hintN){
	if(UsedHints(lvl)<hintN&&Hints(lvl).length>=hintN&&!LevelSolved(lvl)){
		UseHint(lvl,hintN);
		EchoHint(lvl,hintN);
	}
}

function UseHint(lvl,hintN){
	if(typeof lvl==="string")
		Hints.used[lvl]=hintN;
	else
		Hints.used[lvl-1]=hintN;
	
	SaveLocalHints(Hints.used);
}

function AvailableHints(lvl){
	if(lvl===undefined) //Global
		return Levels().map(AvailableHints).reduce(Accumulate);
	else				//In particular level
		return	Hints(lvl).length;
}

function UsedHints(lvl){
	if(lvl===undefined) //Global
		return Levels().map(UsedHints).reduce(Accumulate);
	else if(typeof lvl==="string")				//In particular level
		return 	Hints.used[lvl];
	else
		return	Hints.used[lvl-1];
}

function HintProgress(lvl,hintN){
	var a=AvailableHints(lvl);
	return "★".repeat(hintN)+"☆".repeat(Max(a-hintN,0));
}

function HintButton(){
	return GameBarButtonHTML("hint",{onclick:'RequestHint();'});	
}

function CloseHint(Callback){
	if(CurrentDatapack().buttonSelector==="HintButton")
		CloseCurrentDatapack(Callback);
	GameFocus();
}

function RequestNextHint(){
	CycleNextBounded(CurrentLevelHints());
	CloseHint(RequestHint);
}

function RequestPrevHint(){
	CyclePrevBounded(CurrentLevelHints());
	CloseHint(RequestHint);	
}

if(typeof IsScreenMessage==="undefined")
	var IsScreenMessage=False;

function RequestHint(){
	if(!Hints())
		return console.log("hints file not found");
	
	if(!RequestHint.requested||TitleScreen()){
		RequestHint.requested=Hints().map(function(hl){return hl.map(function(x){return false;})});
		var tip=CycleNextBounded(RequestHint["tips-welcome"]);
		var DFOpts={questionname:tip};
		var DPFields=[['plain',DFOpts]];
	}
	else if(IsScreenMessage(CurrentScreen())){
		var tip=CycleNext(RequestHint["tips-interlevel"]);
		var DFOpts={questionname:"<b>General tip:</b> "+HintDisplay(tip)};
		var DPFields=[['plain',DFOpts]];
	}
	else{
		var curlevelHints=CurrentLevelHints();
		
		if(curlevelHints.length===0) //Substitute for no hints
			curlevelHints=["Sorry! No hints for this level... but you can do it!"];
		
		var tip=CycleStay(curlevelHints);
		tip=HintDisplay(tip);
		
		var p=CyclePosition(curlevelHints);
		SeeHint(CurLevelNumber(),p+1);
		
		var left=StringSymbol("left");
		var right=StringSymbol("right");
		var navichoices=[left,"OK",right];
		var naviactions={
			"OK":CloseHint
		};
		naviactions[left]=RequestPrevHint;
		naviactions[right]=RequestNextHint;

		if(p===0){
			navichoices.shift();
			delete naviactions[left];
		}
		if(p===curlevelHints.length-1){
			navichoices.pop();
			delete naviactions[right];
		}
		
		var DFOpts={questionname:tip};
		var DFHintCounter={questionname:"<b>"+HintProgress(CurLevelNumber(),p+1)+"</b>"};
		var DPFields=[
			['plain',DFHintCounter],
			['plain',DFOpts],
			['navi',{
				qchoices:navichoices,
				qchoicesViewF:ObtainSymbol,
				executeChoice:function(choice,pid){
					if(In(naviactions,choice))
						naviactions[choice]();
				}
			}]
		];
		
	}
	
	RequestDataPack(DPFields,{
		actionvalid:CloseHint,
		qonsubmit:CloseHint,
		qonclose:GameFocus,
		qdisplay:LaunchBalloon,
		qtargetid:".game-container",
		requireConnection:false,
		shortcutExtras:FuseObjects(ObtainKeyActionsGameBar(),{"H":CloseHint}),
		buttonSelector:"HintButton",
		shortcutTarget:"HintWindow",
		spotlight:gameSelector
	});
}


//Hints Honours

function HintsHonour(){
	if(!Hints())
		return "";
	else if(UsedHints()===0)
		return "no hints ★";
	else{
		var h=UsedHints();
		if(h===1)
			return "1 hint ☆";
		else if(h<=AvailableHints()/7)
			return h+" hints ☆";
		else
			return h+" hints  ";
	}
}




//External hook
var ObtainHints=Hints;


RequestHint["tips-welcome"]=[
	"<p>Welcome to the <b>Hint Service</b>.</p><p>Press "+ActionKeyText("hint")+" anytime to reveal a hint!</p>",
	"You got this! Now go ahead and play!"
]

if(HasHOF()){
RequestHint["tips-welcome"].splice(1,0,"Please note that <b>Hall of Fame</b> entries now count how many hints are used!");
}

RequestHint["tips-interlevel"]=[
	"Just relax and have fun!",
	"Remember to pause once in a while!",
	"If you like this game, share it with your friends!",
	"Open the level selector by pressing "+ActionKeyText("levelselector")+", then type a <kbd>number</kbd>.",
	"Go Fullscreen by pressing "+ActionKeyText("fullscreen")+"!",
	"Play or pause the music by pressing "+ActionKeyText("music")+"!"
]

if(HasGameFeedback()){
RequestHint["tips-interlevel"].splice(1,0,"Email Pedro PSI feedback by pressing "+ActionKeyText("feedback")+", anytime!");
}

var ObtainRequestHint=RequestHint;


HearOnce("GameBar",LoadHints);

Shout("data-game-hints")