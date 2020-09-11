if(typeof ObtainGameSelector==="undefined")
	var ObtainGameSelector=function(){return '#gameCanvas'};



if(typeof ObtainGameAction==="undefined")
	var ObtainGameAction=function(key){
		Context(ObtainGameSelector())[ComboKeystring(key)]();
		GameFocus();
	}

//On-screen keyboard
if(typeof ObtainKeyboardAllowed==="undefined")
	var ObtainKeyboardAllowed=false;


if(typeof ObtainKeyboardLauncher==="undefined")
	var ObtainKeyboardLauncher=function(){
		return LaunchBalloon;
	}

if(typeof ObtainKeyboardTarget==="undefined")
	var ObtainKeyboardTarget=function(){
		return ".game-container";
	}

if(typeof ObtainMainKey==="undefined")
	var ObtainMainKey=function(action){
		if(!action)
			return {
				"undo":"Z",
				"redo":"Y",
				"restart":"R",
				"feedback":"E",
				"fullscreen":"F",
				"hint":"H",
				"keyboard":"K",
				"levelselector":"L",
				"music":"M"
			}
		else
			return ObtainMainKey()[action.toLowerCase()]||"";
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

var GameBarButtonTooltips={
	"credits":"Credits",
	"how-to-play":"How to play?",
	"save":"Save permissions",
	"feedback":"E-mail feedback",
	"fullscreen":"Fullscreen",
	"hint":"Hints",
	"keyboard":"Keyboard on screen",
	"music":"Music toggle",
	"wrench":"Hack this game",
	"more":"More games by the same author"
};

function GameBarButtonTooltip(action){
	return DictionaryAccesser(GameBarButtonTooltips)(action.toLowerCase());
}

function RegisterGameBarButtonTooltip(name,tooltip){
	GameBarButtonTooltips[name.toLowerCase()]=tooltip;
}

if(typeof ObtainHints==="undefined")
	var ObtainHints=False;

if(typeof ObtainRequestHint==="undefined")
	var ObtainRequestHint=Identity;

if(typeof ObtainLevelNumberDisplay==="undefined")
	ObtainLevelNumberDisplay=Identity;

////////////////////////////////////////////////////////////////////////////////
//Hooks to Pedro PSI main site



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

if(typeof EchoLevelWin==="undefined")
	var EchoLevelWin=Identity;

if(typeof EchoSelect==="undefined")
	var EchoSelect=Identity;

if(typeof EchoHint==="undefined")
	var EchoHint=Identity;


////////////////////////////////////////////////////////////////////////////////
// Game Preparation

function WrapGame(){
	WrapElement(`<div class="game-supra-container">
					<div class="game-rotation-container">
						<div class="game-container">
						</div>
					</div>
				</div>`,
				ParentSelector(ObtainGameSelector()),
				".game-container");
				
	ConsoleLoad(".game-rotation-container");
}

if(typeof ObtainLoadPortable==="undefined")
	var ObtainLoadPortable=Identity;

if(typeof ResizeCanvas==="undefined")
	var ResizeCanvas=Identity;

function PrepareGame(){
	var bar=GetElement("GameBar");
	WrapGame();
	ObtainLoadPortable();

	[250,500,1000,2000,4000,8000].map(function(t){
		setTimeout(ResizeCanvas,t);
	});
	
	if(!bar){

		ResumeCapturingKeys(CaptureComboKey);
		KeybindShortcuts();
		
		ColoriseGameBar();
		AddGameBar();
		
		ListenOnce('click',PlaylistStartPlay,ObtainGameSelector());
		
		if(ObtainInitialScroll)
			ScrollInto(ObtainGameSelector());
		
		GameFocus();

		setTimeout(ObtainSelectLevelFromPage,2000);
		
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
	return 'TypewriterBanner(this,\"'+GameBarButtonTooltip(action)+k+'\",\"'+action+'\")';
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
	var TWB=GameBarTypewriterBanner(action);
	var UnTWB=GameBarCancelTypewriterBanner(action);
	return ButtonLinkHTML(title,ObtainSymbol(action),{
			onmouseover:TWB,
			onfocus:TWB,
			onmouseout:UnTWB,
			onblur:UnTWB,
			id:Capitalise(action)+'Button'
		})
};

function ShowButton(ButtonNameF){
	var nameButton=FunctionName(ButtonNameF);
	ReplaceElement(ButtonNameF(),nameButton);
	UnHideElement(nameButton);
	Deselect(nameButton);
}

var GameBarButtons={}



function MusicButton(){
	if(Playlist().length>0)
		GameBarButtons["music"]={
			onclick:'ToggleCurrentSong();GameFocus();'
		};
}


if(typeof ObtainLevelSelectorAllowed==="undefined")
	function ObtainLevelSelectorAllowed(){return MaxLevel()>1};

function LevelselectorButton(){
	if(ObtainLevelSelectorAllowed())
		return ButtonHTML({txt:"Level selector",attributes:{onclick:'RequestLevelSelector();',id:"LevelselectorButton"}});
	else
		return "";
}

function FullscreenButton(){
	return GameBarButtonHTML("fullscreen",{onclick:'RequestGameFullscreen();GameFocus();'});
}

var GameBarButtons={};

function AddGameBarButton(name,Opts){
	GameBarButtons[name]=Opts;
}


function GameBar(){
	var buttons=Keys(GameBarButtons).map(k=>AddGameBarButton(k,GameBarButtons[k]));
	
	/*[
		SaveButton(),
		GameBarButtonLinkHTML("How to play?","how-to-play"),
		HiddenHTML('HintButton'),
		KeyboardButton(),
		LevelselectorButton(),
		FeedbackButton(),
		GameBarButtonLinkHTML("Credits","credits"),
		WrenchButton(),
		ConsoleExternal()?HiddenHTML('MoreButton'):"",
		MusicButton(),
		FullscreenButton()
	].join("");*/
	
	return ButtonBar(buttons,"GameBar");
}

if(typeof ObtainGameBarParentSelector==="undefined")
	ObtainGameBarParentSelector=function(){
		return ".game-container";
	}

function AddGameBar(){
	RemoveElement("GameBar");
	AddElement(GameBar(),ObtainGameBarParentSelector());
}


/////////////////////////////////////////////////////////////////////////////////////
// Focus on Game Canvas
function GameFocus(DP){
	if(document.activeElement)
		document.activeElement.blur();
	if(window.Mobile&&window.Mobile.GestureHandler)
		window.Mobile.GestureHandler.prototype.fakeCanvasFocus();
	setTimeout(function(){FocusElement(ObtainGameSelector());},100);
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
//Game display Options
if(typeof ObtainInitialScroll==="undefined")
	var ObtainInitialScroll=true;

if(typeof ObtainInitialMessages==="undefined")
	var ObtainInitialMessages=true;
//	var ObtainInitialMessages=false;

if(typeof ObtainXYRotateCondition==="undefined")
	var ObtainXYRotateCondition=function(x,y){return x<y*1.05};


// Screen rotation
function GameRotation(){
	var x=window.innerWidth;
	var y=window.innerHeight;
	
	if(ObtainXYRotateCondition(x,y))
		Class('.game-rotation-container','rotate90');
	else
		UnClass('.game-rotation-container','rotate90');
	
	ResizeCanvas();
	setTimeout(ResizeCanvas,1000);
}

GameRotation();
Listen('resize',GameRotation);



////////////////////////////////////////////////////////////////////////////////
//Key capturing

var KeyActionsGameBar={};

KeyActionsGameBar[ObtainMainKey("feedback")]=RequestGameFeedback;
KeyActionsGameBar[ObtainMainKey("fullscreen")]=RequestGameFullscreen;
KeyActionsGameBar[ObtainMainKey("hint")]=ObtainRequestHint;
KeyActionsGameBar[ObtainMainKey("levelselector")]=ObtainLevelSelectorAllowed?RequestLevelSelector:Identity;
KeyActionsGameBar[ObtainMainKey("music")]=ToggleCurrentSong;

//Keybinding defaults
if(typeof ObtainKeyActionsGameBar==="undefined")
	var ObtainKeyActionsGameBar=function(){return KeyActionsGameBar};


//Keybind to game element
function KeybindShortcuts(){
	var FullShortcuts=FuseObjects(ObtainKeyActionsGameBar(),ObtainKeyActionsGame());
	OverwriteShortcuts(ParentSelector(ObtainGameSelector()),FullShortcuts);
}


function RequestGameFullscreen(){
	FullscreenToggle(".game-supra-container");
	setTimeout(GameRotation,500);
}




////////////////////////////////////////////////////////////////////////////////
//Colorise game bar

function Stylesheet(){return".game-supra-container{\
	--white:rgba(255,255,255,var(--t));			/*#FFF*/\
	--smokewhite:rgba(241,241,241,var(--t))		/*#f1f1f1*/;\
	--darkblue:rgba(7,0,112,var(--t))			/*#070070*/;\
	--blue:rgba(0,15,255,var(--t))				/*#000FFF*/;\
	--lightblue:rgba(25,130,237,var(--t))		/*#1982ed*/;\
	--turquoise:rgba(59,248,222,var(--t))		/*#3bf8de*/;\
	--green: rgba(70,244,111,var(--t))			/*#46f46f*/;\
	--lightgreen:rgba(12,252,189,var(--t))				   ;\
	--yellow: rgba(240,248,175,var(--t))		/*#f0f8af*/;\
	--lightyellow:rgba(255,249,201,var(--t))	/*#fff9c9*/;\
	--beije:rgba(255,240,229,var(--t))					   ;\
	--bgcolour:"+ObtainBGColor()+"	/*#fff9c9*/;\
	--fgcolour:"+ObtainFGColor()+"	/*#fff9c9*/;\
	}";
}


function ReplaceColours(stylesheet,BackgroundColour,ForegroundColour){
	var styleSheet=stylesheet;
	var Lmax=Lightness(BackgroundColour);
	
	var PrimaryDark=(ForegroundColour=ObtainFGColor());
	var PrimaryLight=(BackgroundColour=ObtainBGColor());
	
	// Pick the most saturated colour as text colour
	if(Saturation(BackgroundColour)===0){
		PrimaryLight=ForegroundColour;
	}
	if(Saturation(ForegroundColour)===0){
		PrimaryDark=BackgroundColour;
	}
	
	//Invert in case of dark background
	if(Lightness(BackgroundColour)<0.5){
		styleSheet=styleSheet.replace("rgba(255,255,255,var(--t))",	HEX(DarkenTo(PrimaryLight,-Lmax*0.50+0.950)).colour);
		styleSheet=styleSheet.replace("rgba(241,241,241,var(--t))",	HEX(DarkenTo(PrimaryLight,-Lmax*0.50+0.925)).colour);

		styleSheet=styleSheet.replace("rgba(7,0,112,var(--t))",		HEX(DarkenTo(PrimaryDark, -Lmax*0.22+0.22 )).colour);
		styleSheet=styleSheet.replace("rgba(0,15,255,var(--t))",	HEX(DarkenTo(PrimaryDark, -Lmax*0.40+0.40 )).colour);
		styleSheet=styleSheet.replace("rgba(25,130,237,var(--t))",	HEX(DarkenTo(PrimaryDark, -Lmax*0.51+0.51 )).colour);
		styleSheet=styleSheet.replace("rgba(59,248,222,var(--t))",	HEX(DarkenTo(PrimaryDark, -Lmax*0.89+0.89 )).colour);
		styleSheet=styleSheet.replace("rgba(70,244,111,var(--t))",	HEX(DarkenTo(PrimaryDark, -Lmax*0.91+0.91 )).colour);
		styleSheet=styleSheet.replace("rgba(12,252,189,var(--t))",	HEX(DarkenTo(PrimaryDark, -Lmax*0.92+0.92 )).colour);
		styleSheet=styleSheet.replace("rgba(240,248,175,var(--t))",	HEX(DarkenTo(PrimaryDark, -Lmax*0.93+0.93 )).colour);
		styleSheet=styleSheet.replace("rgba(255,249,201,var(--t))",	HEX(DarkenTo(PrimaryDark, -Lmax*0.95+0.95 )).colour);
		styleSheet=styleSheet.replace("rgba(255,240,229,var(--t))",	HEX(DarkenTo(PrimaryDark, -Lmax*0.97+0.97 )).colour);
		
	}
	else{
		styleSheet=styleSheet.replace("rgba(255,255,255,var(--t))",	HEX(LightenTo(PrimaryLight,Lmax*0.925)).colour);
		styleSheet=styleSheet.replace("rgba(241,241,241,var(--t))",	HEX(LightenTo(PrimaryLight,Lmax*0.900)).colour);

		styleSheet=styleSheet.replace("rgba(7,0,112,var(--t))",		HEX(LightenTo(PrimaryDark,(Lmax*0.22))).colour);
		styleSheet=styleSheet.replace("rgba(0,15,255,var(--t))",	HEX(LightenTo(PrimaryDark,(Lmax*0.40))).colour);
		styleSheet=styleSheet.replace("rgba(25,130,237,var(--t))",	HEX(LightenTo(PrimaryDark,(Lmax*0.51))).colour);
		styleSheet=styleSheet.replace("rgba(59,248,222,var(--t))",	HEX(LightenTo(PrimaryDark,(Lmax*0.92))).colour);
		styleSheet=styleSheet.replace("rgba(70,244,111,var(--t))",	HEX(LightenTo(PrimaryDark,(Lmax*0.93))).colour);
		styleSheet=styleSheet.replace("rgba(12,252,189,var(--t))",	HEX(LightenTo(PrimaryDark,(Lmax*0.92))).colour);
		styleSheet=styleSheet.replace("rgba(240,248,175,var(--t))",	HEX(LightenTo(PrimaryDark,(Lmax*0.94))).colour);
		styleSheet=styleSheet.replace("rgba(255,249,201,var(--t))",	HEX(LightenTo(PrimaryDark,(Lmax*0.95))).colour);
		styleSheet=styleSheet.replace("rgba(255,240,229,var(--t))",	HEX(LightenTo(PrimaryDark,(Lmax*0.97))).colour);
	}
		
	return styleSheet;
}

function ColoriseGameBar(){
	var stylesource=ReplaceColours(Stylesheet(),ObtainBGColor(),ObtainFGColor());
	RemoveElement("game-bar-colours");
	ReplaceStyleElement(stylesource,"game-bar-colours");
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