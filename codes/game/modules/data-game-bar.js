//Portable game bar
var Portable=False;

if(typeof RequestGameFeedback==="undefined"||typeof RequestHallOfFame==="undefined")
	Portable=True;


////////////////////////////////////////////////////////////////////////////////
// Game data link defaults, for puzzlescript, overwritable

//Game selector
var gameSelector=gameSelector?gameSelector:'#gameCanvas';


if(typeof ObtainRedoAllowed==="undefined")
	var ObtainRedoAllowed=False//ObtainUndoAllowed;


//Game display Options
if(typeof ObtainInitialScroll==="undefined")
	var ObtainInitialScroll=true;
//	var ObtainInitialScroll=false;

if(typeof ObtainInitialMessages==="undefined")
	var ObtainInitialMessages=true;
//	var ObtainInitialMessages=false;

if(typeof ObtainXYRotateCondition==="undefined")
	var ObtainXYRotateCondition=function(x,y){return x<y*1.05};
//	function ObtainXYRotateCondition(x,y){return false};

if(typeof ObtainResizeCanvas==="undefined")
	var ObtainResizeCanvas=Identity;

if(typeof titleScreen==="undefined")
	var titleScreen=true;


//Game and Level Navigation
if(typeof ObtainLevelLookahead==="undefined")
	var ObtainLevelLookahead=function(){return 0; //Max number of unsolved levels shown, in linear progression. Example: 0 = all, 1 =1, 2=2, etc...
	};

if(typeof ObtainGateLevels==="undefined")
	var ObtainGateLevels=function(){return []; //Gated "boss" levels require beating all previous levels to show up; all previous levels + itself to show levels afterwards. Example: [] = no gate levels, [2,5] = levels 2 and 5 are gate levels.
	};

if(typeof ObtainLevelDescriptionTitle==="undefined")
	var ObtainLevelDescriptionTitle=LevelGatedDescription;

if(typeof ObtainLevelNotes==="undefined")
	var ObtainLevelNotes=function(lvl){return ""};




//Keybinding defaults
if(typeof ObtainKeyActionsGameBar==="undefined")
	var ObtainKeyActionsGameBar=KeyActionsGameBar;

if(typeof ObtainGameAction==="undefined")
	var ObtainGameAction=function(key){
		Context(gameSelector)[LowerCase(ComboKeystring(key))]();
		GameFocus();
	}

//On-screen keyboard
if(typeof ObtainKeyboardAllowed==="undefined")
	var ObtainKeyboardAllowed=False;

if(typeof ObtainKeyboardKeys==="undefined")
	var ObtainKeyboardKeys=GameKeyboardKeys;

if(typeof ObtainKeyboardLauncher==="undefined")
	var ObtainKeyboardLauncher=function(){
		return LaunchBalloon;
	}

if(typeof ObtainKeyboardTarget==="undefined")
	var ObtainKeyboardTarget=function(){
		return ".game-container";
	}




var MainKeys={
	"undo":"Z",
	"redo":"Y",
	"restart":"R",
	"feedback":"E",
	"fullscreen":"F",
	"hint":"H",
	"keyboard":"K",
	"levelselector":"L",
	"music":"M"
};

if(typeof ObtainMainKey==="undefined")
	var ObtainMainKey=function(action){
		return Accesser(MainKeys,undefined,a=>"")(action);
	}

function ActionKeyText(action){
	var S=ObtainSymbol(action);
	var K=ObtainMainKey(action);
	
	if(K!=="")
		K="<kbd>"+K+"</kbd>";
	if(S!=="")
		S="<kbd>"+S+"</kbd>";

	return S+((S!==""&&K!=="")?" or ":"")+K;
}

var Tooltips={
	"credits":"Credits",
	"how-to-play":"How to play?",
	"save":"Save permissions",
	"undo":"Undo",
	"redo":"Redo",
	"restart":"Restart",
	"feedback":"E-mail feedback",
	"fullscreen":"Fullscreen",
	"hint":"Hints",
	"keyboard":"Keyboard on screen",
	"music":"Music toggle",
	"wrench":"Hack this game",
	"more":"More games by the same author"
}

function ObtainActionTooltip(action){
	return Accesser(Tooltips,undefined,a=>"")(action);
}

if(typeof ObtainHints==="undefined")
	var ObtainHints=False;

if(typeof ObtainRequestHint==="undefined")
	var ObtainRequestHint=Identity;

if(typeof ObtainLevelNumberDisplay==="undefined")
	ObtainLevelNumberDisplay=Identity;

////////////////////////////////////////////////////////////////////////////////
//Hooks to Pedro PSI main site

if(typeof RequestGameFeedback==="undefined"){
	var RequestGameFeedback=Identity;
	var HasGameFeedback=False;
}
if(typeof HasGameFeedback==="undefined")
	var HasGameFeedback=True;

var HasGameFeedback=False;

var HasHOF=True;
if(typeof RequestHallOfFame==="undefined"){
	var RequestHallOfFame=Identity;
	HasHOF=False;
}

if(typeof RegisterMove==="undefined")
	var RegisterMove=Identity;

//Record
if(typeof ClearLevelRecord==="undefined")
	var ClearLevelRecord=Identity;

if(typeof ClearSolvedLevelScreens==="undefined")
	var ClearSolvedLevelScreens=Identity;

if(typeof EchoSelect==="undefined")
	var EchoSelect=Identity;

if(typeof EchoHint==="undefined")
	var EchoHint=Identity;


////////////////////////////////////////////////////////////////////////////////
// Game Preparation

function WrapGame(){
	WrapElement('<div class="game-supra-container">\
					<div class="game-rotation-container">\
						<div class="game-container">\
						</div>\
					</div>\
				</div>',
				ParentSelector(gameSelector),
				".game-container");
				
	ConsoleLoad(".game-rotation-container");
}


function PrepareGame(){
	var bar=GetElement("GameBar");
	WrapGame();

	if(Portable()){
		var FOLDER=GlocalPath("https://pedropsi.github.io/game-bar-source","codes");
		LoadStyle(JoinPath(FOLDER,"game/game.css"));
		LoadStyle(JoinPath(FOLDER,"game/game-bar-pages.css"));
		LoadStyle(JoinPath(FOLDER,"lotus.css"));
		
		if(ObtainInitialMessages)
			ConsoleAddMany([
				"Puzzlescript Game bar loaded!",
				"Issues? Suggestions? Head to pedropsi.github.io/game-bar."
			]);
	}


	[250,500,1000,2000,4000,8000].map(function(t){
		setTimeout(ObtainResizeCanvas,t);
	});
	
	if(!bar){
		
		ResumeCapturingKeys(ComboKeyPressHandler);
		KeybindShortcuts();
		
		ColoriseGameBar();
		AddGameBar();
		
		AttendOnce('click',PlaylistStartPlay,gameSelector);
		AttendOnce('keydown',PlaylistStartPlay);
//		AttendOnce('touchstart',RequestKeyboard,gameSelector);
		
		if(ObtainInitialScroll)
			ScrollInto(gameSelector);
		
		GameFocus();

		setTimeout(SelectLevelFromPage,2000); //TOIMPROVE FAILS CLICKWALL
		
		Shout("GameBar");
	}
}


////////////////////////////////////////////////////////////////////////////////
// Game Bar

function GameBarTypewriterBanner(action){
	var k=ObtainMainKey(action);
	if(k)
		k=" ["+k+"]";
	else
		k="";
	return 'TypewriterBanner(this,\"'+ObtainActionTooltip(action)+k+'\",\"'+action+'\")';
}

function GameBarCancelTypewriterBanner(action){
	return 'CancelTypewriterBanner(this,StringSymbol(\"'+action+'\"),\"'+action+'\")';
}

function GameBarButtonHTML(action,attribs){
	var TWB=GameBarTypewriterBanner(action);
	var UnTWB=GameBarCancelTypewriterBanner(action);
	return ButtonHTML({
		txt:ObtainSymbol(action),
		attributes:FuseObjects(attribs,{
			onmouseover:TWB,
			onfocus:TWB,
			onmouseout:UnTWB,
			onblur:UnTWB,
			id:Capitalise(action)+'Button'
		})
	});
}

function GameBarButtonLinkHTML(title,action){
	var id='#'+IndexCaseString(title);
	var button=GameBarButtonHTML(action,{
		onclick:`FullscreenClose();Navigate("${id}");`});
	return AwaitElement(id,button);
};

function ShowButton(ButtonNameF){
	var nameButton=FunctionName(ButtonNameF);
	ReplaceElement(ButtonNameF(),nameButton);
	UnHideElement(nameButton);
	Deselect(nameButton);
}


function UndoButton(){
	if(!ObtainUndoAllowed())
		return "";
	
	UpdateHyperText("InstructionsUndo");
	return GameBarButtonHTML('undo',{
		onclick:'UndoAndFocus();',
		onmousedown:'AutoRepeat(UndoAndFocus,250);',
		ontouchstart:'AutoRepeat(UndoAndFocus,250);',
		onmouseup:'AutoStop(UndoAndFocus);',
		ontouchend:'AutoStop(UndoAndFocus);',
		ontouchcancel:'AutoStop(UndoAndFocus);'
	});
}

function RedoButton(){
	if(ObtainRedoAllowed())
		return GameBarButtonHTML('redo',{
			onclick:'RedoAndFocus();',
			onmousedown:'AutoRepeat(RedoAndFocus,250);',
			ontouchstart:'AutoRepeat(RedoAndFocus,250);',
			onmouseup:'AutoStop(RedoAndFocus);',
			ontouchend:'AutoStop(RedoAndFocus);',
			ontouchcancel:'AutoStop(RedoAndFocus);'
		})
	else
		return "";
}

function RestartButton(){
	if(!ObtainRestartAllowed())
		return "";

	UpdateHyperText("InstructionsRestart");
	return GameBarButtonHTML('restart',{onclick:'ObtainRestart();GameFocus();'});
}

function FeedbackButton(){
	if(HasGameFeedback())
		return GameBarButtonHTML("feedback",{onclick:'RequestGameFeedback();'});
	else
		return "";
}

function MusicButton(){
	if(typeof Playlist==="undefined")
		return "";
	else{
		canYoutube=false;
		return GameBarButtonHTML("music",{onclick:'PlaylistToggle();GameFocus();'});
	}
}

function KeyboardButton(){
	if(ObtainKeyboardAllowed())
		return GameBarButtonHTML("keyboard",{onclick:'RequestKeyboard();'})
	else
		return "";
}


function LevelSelectorAllowed(){
	if(typeof ObtainLevelSelectorAllowed!=="undefined")
		return ObtainLevelSelectorAllowed();
	else
		return MaxLevel()>1;
}

function LevelselectorButton(){
	if(LevelSelectorAllowed())
		return ButtonHTML({txt:"Level selector",attributes:{onclick:'RequestLevelSelector();',id:"LevelselectorButton"}});
	else
		return "";
}

function FullscreenButton(){
	return GameBarButtonHTML("fullscreen",{onclick:'RequestGameFullscreen();GameFocus();'});
}

function GameBar(){
	
	var buttons=[
		HiddenHTML('SaveButton'),
		GameBarButtonLinkHTML("How to play?","how-to-play"),
		HiddenHTML('HintButton'),
		UndoButton(),
		RedoButton(),
		RestartButton(),
		KeyboardButton(),
		LevelselectorButton(),
		FeedbackButton(),
		GameBarButtonLinkHTML("Credits","credits"),
		HiddenHTML('WrenchButton'),
		HiddenHTML('MoreButton'),
		MusicButton(),
		FullscreenButton()
	].join("");
	
	return ButtonBar(buttons,"GameBar");
}

function AddGameBar(){
	RemoveElement("GameBar");
	if(Portable())
		AddElement(GameBar(),ParentSelector(gameSelector));
	else
		AddElement(GameBar(),".game-container");
}


/////////////////////////////////////////////////////////////////////////////////////
// Focus on Game Canvas
function GameFocus(DP){
	if(document.activeElement)
		document.activeElement.blur();
	if(window.Mobile&&window.Mobile.GestureHandler)
		window.Mobile.GestureHandler.prototype.fakeCanvasFocus();
	setTimeout(function(){FocusElement(gameSelector);},100);
};

function UndoAndFocus(){
	ObtainUndo();
	GameFocus();
}

function RedoAndFocus(){
	ObtainRedo();
	GameFocus();
}

////////////////////////////////////////////////////////////////////////////////
// Screen rotation

if(typeof ObtainRotateControls==="undefined")
	var ObtainRotateControls=Identity;

function GameRotation(){
	var x=window.innerWidth;
	var y=window.innerHeight;
	
	if(ObtainXYRotateCondition(x,y)){
		Class('.game-rotation-container','rotate90');
		ObtainRotateControls(true);
	}
	else{
		UnClass('.game-rotation-container','rotate90');
		ObtainRotateControls(false);
	}
	
	ObtainResizeCanvas();
	setTimeout(ObtainResizeCanvas,1000); //It takes 1 second to rotate
	return true;
}

AttendOnce("GameBar",GameRotation);
Attend('resize',GameRotation);



////////////////////////////////////////////////////////////////////////////////
//Key capturing

function KeyActionsGameBar(){
	var KAGB={};
		KAGB[ObtainMainKey("feedback")]=RequestGameFeedback;
		KAGB["ctrl "+ObtainMainKey("feedback")]=RequestGameFeedback;
		
		KAGB[ObtainMainKey("fullscreen")]=RequestGameFullscreen;
		KAGB["ctrl "+ObtainMainKey("fullscreen")]=RequestGameFullscreen;
		
		KAGB[ObtainMainKey("hint")]=ObtainRequestHint;
		KAGB["ctrl "+ObtainMainKey("hint")]=ObtainRequestHint;
		
		if(ObtainKeyboardAllowed()){
			KAGB[ObtainMainKey("keyboard")]=RequestKeyboard;
			KAGB["ctrl "+ObtainMainKey("keyboard")]=RequestKeyboard;
		}
		
		if(LevelSelectorAllowed()){
			KAGB[ObtainMainKey("levelselector")]=RequestLevelSelector;
			KAGB["ctrl "+ObtainMainKey("levelselector")]=RequestLevelSelector;
		
		}
		KAGB[ObtainMainKey("music")]=PlaylistToggle;
		KAGB["ctrl +",ObtainMainKey("music")]=PlaylistToggle;

	return KAGB;
}

if(typeof ObtainKeyActionsGame==="undefined")
	var ObtainKeyActionsGame=function(){return {}};

//Keybind to game element
function KeybindShortcuts(){
	var FullShortcuts={...ObtainKeyActionsGameBar(),...ObtainKeyActionsGame()};
	Keybind(FullShortcuts,ParentSelector(gameSelector));
}


function RequestGameFullscreen(){
	FullscreenToggle(".game-supra-container");
	setTimeout(GameRotation,500);
}


////////////////////////////////////////////////////////////////////////////////
//Colorise game bar

function GamebarColours(){
	var PrimaryDark=ObtainBGColor();
	var PrimaryLight=ObtainFGColor();

	// Pick the most saturated colour as text colour
	if(Saturation(ObtainBGColor())===0)
		PrimaryLight=ObtainFGColor();
	if(Saturation(ObtainFGColor())===0)
		PrimaryLight=ObtainBGColor();
	
	var inverted=Lightness(PrimaryDark)<Lightness(PrimaryLight);

	return `
	.game-supra-container *{
		--alp:1;
		
		--hue1:${Round(Hue(PrimaryDark))};
		--hue2:${Round(Hue(PrimaryLight))};
		--hue3:${Round(Hue(PrimaryLight))};

		--lig1:${Min(50,2*Round(Lightness(PrimaryDark)*100))}%;
		--lig2:50%;
		--lig3:50%;

		--sat1:${Round(Saturation(PrimaryDark),2)*100}%;
		--sat2:${Round(Saturation(PrimaryLight),2)*100}%;
		--sat3:${Round(Saturation(PrimaryLight),2)*100}%;

		--white:var(--pri${inverted?2:8})      ;		
		--smokewhite:var(--pri${inverted?3:7}) ;
		
		--darkblue:var(--sec${inverted?8:1})	;
		--blue:var(--sec${inverted?7:3})		;
		--lightblue:var(--sec5)					;
		
		--turquoise:var(--sec${inverted?2:8})	;
		--green:var(--sec${inverted?3:7})		;
		--lightgreen:var(--sec${inverted?2:8})	;
		
		--beije:var(--ter${inverted?4:6})     	;
		--yellow:var(--ter${inverted?3:7})	 	;
		--lightyellow:var(--ter${inverted?2:8})	;
	}`;

}

function ColoriseGameBar(){
	var stylesource=GamebarColours();
	ReplaceStyleElement(stylesource,"game-bar-colours");
}

////////////////////////////////////////////////////////////////////////////////
//Load Level Info

function LevelInfo(){
	return LevelInfo.info||false;
}

function LevelLoadedTitles(){
	if(!LevelLoadedTitles.titles){
		if(!LevelInfo())
			return false;
		else
			return LevelLoadedTitles.titles=LevelInfo().map(function(x){return x.title});
	}
	else
		return LevelLoadedTitles.titles;
}

if(typeof ObtainLevelTitle==="undefined")
	function ObtainLevelTitle(lvl){
		return LevelLoadedTitles()[lvl-1];
	}

function LevelSections(){
	if(!LevelSections.sections){
		if(!LevelInfo())
			return false;
		else{
			LevelSections.sections=[];
			var s;
			for(var i=0;i<LevelInfo().length;i++){
				if(s=LevelInfo()[i].section)
					LevelSections.sections.push({section:s,number:i+1});
			}
			return LevelSections.sections;
		}
	}
	else
		return LevelSections.sections;
}


//Onscreen keyboard

function RequestKeyboard(){
	
	if(!ObtainKeyboardAllowed())
		return;
	
	var DFOpts={
		executeChoice:ObtainGameAction,
		qchoices:ObtainKeyboardKeys(),
		qchoicesViewF:ObtainSymbol
	}
	
	var Shortcuts=ObtainKeyActionsGameBar();
	
	RequestDataPack([
			['keyboard',DFOpts]
		],
		{
			action:console.log,
			qonsubmit:Identity,
			qonclose:GameFocusAndRestartUndoButtons,
			qdisplay:ObtainKeyboardLauncher(),
			qtargetid:ObtainKeyboardTarget(),
			shortcutExtras:Shortcuts,
			requireConnection:false,
			buttonSelector:"KeyboardButton",
			shortcutTarget:"KeyboardWindow",
			spotlight:gameSelector,
			closeonblur:false,
			layer:-1
	});
	
	function HideButtons(){
		ReplaceElement(HiddenHTML("RestartButton"),"RestartButton");
		ReplaceElement(HiddenHTML("UndoButton"),"UndoButton");
		ReplaceElement(HiddenHTML("RedoButton"),"RedoButton");
	}
	
	HideButtons();
	GameFocus();
}

function GameFocusAndRestartUndoButtons(){
	GameFocus();
	
	function RestoreButtons(){
		ReplaceElement(RestartButton(),"RestartButton");
		ReplaceElement(UndoButton(),"UndoButton");
		ReplaceElement(RedoButton(),"RedoButton");
	}
	
	setTimeout(RestoreButtons,100); //Needed
}

function GameKeyboardKeys(){
	return [["undo","redo","restart"]]; // Undo and Restart
}

function CloseKeyboard(){
	if(CurrentDatapack()&&CurrentDatapack().buttonSelector==="KeyboardButton")
		CloseCurrentDatapack();
	GameFocus();
}



///////////////////////////////////////////////////////////////////////////////
// Banner Typewriter Effect
MaxCharacters=function(e){
	var width=Number(UnPosfix(getComputedStyle(e).getPropertyValue("width"),"px"));
	var fontwidth=Number(UnPosfix(getComputedStyle(e).getPropertyValue("font-size"),"px"));
	return Quotient(width,fontwidth);
}

BannerEffect=function(parentElement,txt,maxchars,duration){
	var queuename=txt;
	TypewriterBanner["running"]=queuename;

	var e=GetElement(parentElement);
	var originaltext=e.innerHTML;
	var maxchars=maxchars||MaxCharacters(e)+1;

	var j=0;
	var curtxt;
	var duration=duration||200;
	var txt=AddLeft(txt," ",maxchars);
		txt=AddRight(txt," ",txt.maxchars);

	function BannerTypeF(j,curtxt){return function(){
		if(TypewriterBanner["running"])
			ReplaceChildren(SpanHTML(curtxt,"typewriter-effect"),parentElement);
		else
			CancelBannerEffectF(parentElement,originaltext,queuename)();
		}};

	while(j<=txt.length){
		curtxt=txt.slice(Max(j,maxchars),Min(j+maxchars,txt.length));
		Schedule(BannerTypeF(j,curtxt),j*duration,queuename);
		j++;
	}
	Schedule(CancelBannerEffectF(parentElement,originaltext,queuename),j*duration,queuename);
}

CancelBannerEffectF=function(parentElement,originaltext,queuename){
	return function(){
		ReplaceChildren(originaltext,parentElement);
		TypewriterBanner["running"]=false;
		UnScheduleAll(queuename);
	}
}


TypewriterBanner=function(thi,txt,queuename){
	if(!TypewriterBanner["running"]&&!TypewriterBanner["blocked-"+queuename]){
		TypewriterBanner["planned-"+queuename]=setTimeout(function(){Once(function(){
			BannerEffect(thi,txt)},txt);
			//console.log("plan","planned-"+queuename);
			TypewriterBanner["planned-"+queuename]=false;
		},750);
	}
}

CancelTypewriterBanner=function(thi,originaltext,queuename){
	clearTimeout(TypewriterBanner["planned-"+queuename]);

	//console.log("unplan and block","planned-"+queuename,TypewriterBanner["planned-"+queuename],TypewriterBanner["blocked-"+queuename]);

	if(TypewriterBanner["running"]){
		setTimeout(function(){
			CancelBannerEffectF(thi,originaltext,queuename);
			TypewriterBanner["blocked-"+queuename]=true;
			setTimeout(function(){TypewriterBanner["blocked-"+queuename]=false},500);
		},250);
	}
}


////////////////////////////////////////////////////////////////////////////////
//Collapse Game Bar

CollapseGameBar=function(){
	return Class(".game-supra-Canvas",".game-bar-collapse");
}

UnCollapseGameBar=function(){
	return UnClass(".game-supra-Canvas",".game-bar-collapse")
}

////////////////////////////////////////////////////////////////////////////////
Shout("data-game-bar");