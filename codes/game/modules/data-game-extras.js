if(typeof DATAVERSION==="undefined")
	var DATAVERSION=5;

//Portable game bar
var Portable=False;

if(typeof RequestGameFeedback==="undefined"||typeof RequestHallOfFame==="undefined")
	Portable=True;

//Game Console
var ConsoleExternal=function(){return PageIdentifier()==="game-console"};

function GameHackURL(){
	return "https://www.puzzlescript.net/editor.html?hack="+PageSearch("game");
}

////////////////////////////////////////////////////////////////////////////////
// Game data link defaults, for puzzlescript, overwritable

//Game selector
var gameSelector=gameSelector?gameSelector:'#gameCanvas';


//Game Options
if(typeof ObtainBGColor==="undefined")
	var ObtainBGColor=function(){return state.bgcolor;}

if(typeof ObtainFGColor==="undefined")
	var ObtainFGColor=function(){return state.fgcolor;}


if(typeof ObtainRestartAllowed==="undefined")
	var ObtainRestartAllowed=function(){return !state.metadata.norestart;}

if(typeof ObtainUndoAllowed==="undefined")
	var ObtainUndoAllowed=function(){return !state.metadata.noundo;}

if(typeof ObtainRedoAllowed==="undefined")
	var ObtainRedoAllowed=False//ObtainUndoAllowed;

if(typeof ObtainUndo==="undefined")
	var ObtainUndo=function(){
		PulseSelect("UndoButton");
		CheckRegisterKey({keyCode:85});}

if(typeof ObtainRedo==="undefined")
	var ObtainRedo=function(){
		PulseSelect("RedoButton");
		CheckRegisterKey({keyCode:89}); //TODO REDO
}

if(typeof ObtainRestart==="undefined")
	var ObtainRestart=function(){
		PulseSelect("RestartButton");
		CheckRegisterKey({keyCode:82});}

if(typeof ObtainAction==="undefined")
	var ObtainAction=function(){
		CheckRegisterKey({keyCode:88});}

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

if(typeof ResizeCanvas==="undefined")
	var ResizeCanvas=function(){canvasResize();}

if(typeof titleScreen==="undefined")
	var titleScreen=true;


//Game and Level Navigation
if(typeof ObtainLevelLookahead==="undefined")
	var ObtainLevelLookahead=function(){return 0; //Max number of unsolved levels shown, in linear progression. Example: 0 = all, 1 =1, 2=2, etc...
	};

if(typeof ObtainGateLevels==="undefined")
	var ObtainGateLevels=function(){return []; //Gated "boss" levels require beating all previous levels to show up; all previous levels + itself to show levels afterwards. Example: [] = no gate levels, [2,5] = levels 2 and 5 are gate levels.
	};

if(typeof ObtainStateScreens==="undefined")
	var ObtainStateScreens=function(){return state.levels;}

if(typeof ObtainNewGameCondition==="undefined")
	var ObtainNewGameCondition=function(){return titleSelection===0}

if(typeof ObtainLevelLoader==="undefined")
	var ObtainLevelLoader=function(){loadLevelFromState(state,curlevel)};

if(typeof ObtainLevelTransition==="undefined")
	var ObtainLevelTransition=function(){
		textMode=false;
		titleScreen=false;
		quittingMessageScreen=false;
		messageselected=false;
	}

if(typeof ObtainTitleScreenLoader==="undefined")
	var ObtainTitleScreenLoader=function(){goToTitleScreen()};

if(typeof ObtainPlayEndGameSound==="undefined")
	var ObtainPlayEndGameSound=function(){tryPlayEndGameSound()};

if(typeof ObtainLevelTitle==="undefined"){
	var ObtainLevelTitle=function(lvl){
		if(!lvl)
			return "";
		if(Checkpointed())
			return "Select checkpoint "+lvl;
		else
			return LevelGatedTitle(lvl);
	}
}
else if(ObtainLevelTitle==="Previous"){ //Case for title specified in message before the level
	var ObtainLevelTitle=function(lvl){
		var title= ObtainStateScreens()[LevelScreen(lvl)-1].message;
		title=title.replace(/^[\-\"\_\:\'\s\n]*(level\s*\d*)*[\-\"\_\:\'\s\n]*/im,"").replace(/[\-\"\_\:\'\s\n]*$/im,"");
		return title.replace(/[\-][\-\s]?/gi," ");
	}
}
//Read move defaults
if(typeof ObtainIsUndoMove==="undefined")
	var ObtainIsUndoMove=function(move){return move==="Z"}

if(typeof ObtainIsRedoMove==="undefined")
	var ObtainIsRedoMove=function(move){return move==="Y"}

if(typeof ObtainIsRestartMove==="undefined")
	var ObtainIsRestartMove=function(move){return move==="R"}

if(typeof ObtainReadMove==="undefined")
	var ObtainReadMove=function(move){
		switch (move) {
			case 27:return "Q";break;
			case 37:return "A";break;
			case 38:return "W";break;
			case 39:return "D";break;
			case 40:return "S";break;
			case 82:return "R";break;
			case 88:return "X";break;
			case 85:return "Z";break;
			case 89:return "Y";break;
			default: return move;break;
		}
	};

//Keybinding defaults
if(typeof ObtainKeyActionsGameBar==="undefined")
	var ObtainKeyActionsGameBar=KeyActionsGameBar;

if(typeof ObtainGameAction==="undefined")
	var ObtainGameAction=function(key){
		Context(gameSelector)[ComboKeystring(key)]();
		GameFocus();
	}

//On-screen keyboard
if(typeof ObtainKeyboardAllowed==="undefined")
	var ObtainKeyboardAllowed=false;

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


var ObtainInterlevelMessage=False;
if(!Portable())
	ObtainInterlevelMessage=True;
if(ConsoleExternal())
	ObtainInterlevelMessage=False;

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

function ObtainActionTooltip(action){
	if(!action)
		return {
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
	else
		return ObtainActionTooltip()[action.toLowerCase()]||"";
}

if(typeof ObtainHints==="undefined")
	var ObtainHints=False;

if(typeof ObtainRequestHint==="undefined")
	var ObtainRequestHint=Identity;

////////////////////////////////////////////////////////////////////////////////
//Hooks to Pedro PSI main site

var HasGameFeedback=True;
if(typeof RequestGameFeedback==="undefined"||ConsoleExternal()){
	var RequestGameFeedback=Identity;
	HasGameFeedback=False;
}

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
		LoadStyle(JoinPath(FOLDER,"index.css"));
		
		if(ObtainInitialMessages)
			ConsoleAddMany([
				"Puzzlescript Game bar loaded!",
				"Issues? Suggestions? Head to pedropsi.github.io/game-bar."
			//	"Localsave is ON for "+PageTitle()+".",
			//	"To stop saving and erase all 2 cookies, please deselect "+ObtainSymbol("Save")+"."
			]);
	}


	[250,500,1000,2000,4000,8000].map(function(t){
		setTimeout(ResizeCanvas,t);
	});
	
	if(!bar){
		
		if(typeof onKeyDown!=="undefined")
			StopCapturingKeys(onKeyDown);
		ResumeCapturingKeys(CaptureComboKey);
		
		ColoriseGameBar();
		AddGameBar();
		
		ListenOnce('click',PlaylistStartPlay,gameSelector);
//		ListenOnce('touchstart',RequestKeyboard,gameSelector);
		
		if(ObtainInitialScroll)
			ScrollInto(gameSelector);
		
		GameFocus();

		SelectLevelFromPage();
		
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
	return 'CancelTypewriterBanner(this,ObtainSymbol(\"'+action+'\"),\"'+action+'\")';
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
	Show(nameButton);
	Deselect(nameButton);
}

function SaveButton(){
	if(!CanSaveLocally())
		return "";
	return GameBarButtonHTML('save',{
		onclick:'ToggleSavePermission(this);GameFocus();',
		class:savePermission?'selected':''
	})
};

function UndoButton(){
	if(ObtainUndoAllowed())
		return GameBarButtonHTML('undo',{
			onclick:'UndoAndFocus();',
			onmousedown:'AutoRepeat(UndoAndFocus,250);',
			ontouchstart:'AutoRepeat(UndoAndFocus,250);',
			onmouseup:'AutoStop(UndoAndFocus);',
			ontouchend:'AutoStop(UndoAndFocus);',
			ontouchcancel:'AutoStop(UndoAndFocus);'
		})
	else
		return "";
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
	if(ObtainRestartAllowed())
		return GameBarButtonHTML('restart',{onclick:'ObtainRestart();GameFocus();'});
	else
		return "";
}

function FeedbackButton(){
	if(HasGameFeedback())
		return GameBarButtonHTML("feedback",{onclick:'RequestGameFeedback();'});
	else
		return "";
}

function MusicButton(){
	if(Playlist().length<1)
		return "";
	else{
		canYoutube=false;
		return GameBarButtonHTML("music",{onclick:'ToggleCurrentSong();GameFocus();'});
	}
}

function KeyboardButton(){
	if(ObtainKeyboardAllowed)
		return GameBarButtonHTML("keyboard",{onclick:'RequestKeyboard();'})
	else
		return "";
}

function WrenchButton(){
	if(ConsoleExternal())
		return GameBarButtonHTML("wrench",{onclick:'Navigate(GameHackURL(),false);'})
	else
		return "";
}

if(typeof ObtainLevelSelectorAllowed==="undefined")
	function ObtainLevelSelectorAllowed(){
		return MaxLevel()>1||(typeof sourceCode!=="undefined"&&In(sourceCode,"checkpoint"));
	}

function LevelselectorButton(){
	if(ObtainLevelSelectorAllowed())
		return ButtonHTML({txt:"Level selector",attributes:{onclick:'RequestLevelSelector();',id:"LevelselectorButton"}});
	else
		return "";
}

function FullscreenButton(){
	return GameBarButtonHTML("fullscreen",{onclick:'RequestGameFullscreen();GameFocus();'});
}

function GameBar(){
	
	var buttons=[
		SaveButton(),
		GameBarButtonLinkHTML("How to play?","how-to-play"),
		HiddenHTML('HintButton'),
		UndoButton(),
		RedoButton(),
		RestartButton(),
		KeyboardButton(),
		LevelselectorButton(),
		FeedbackButton(),
		GameBarButtonLinkHTML("Credits","credits"),
		WrenchButton(),
		ConsoleExternal()?HiddenHTML('MoreButton'):"",
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

/////////////////////////////////////////////////////////////////////////////////////
// Save permissions

var curcheckpoint=0;
var savePermission=true;

function ToggleSavePermission(thi){
	Deselect(thi);
	if(savePermission){
		savePermission=false;
		EraseLocalsave();
		ConsoleAdd("All "+LocalStorageName['list'].length+" cookies erased for "+PageTitle()+": Localsave is OFF across sessions.");
	}
	else 
		ActivateSavePermission(thi);
}

function ActivateSavePermission(thi){
	savePermission=true;
	Localsave();
	ConsoleAddMany([
		"Localsave is ON for "+PageTitle()+".",
		"To stop localsaving and erase all "+LocalStorageName['list'].length+" cookies, please deselect "+ObtainSymbol("Save")+"."
		]);
	Select(thi);
}

/////////////////////////////////////////////////////////////////////////////////////
// Current Level

if(typeof curlevel==="undefined")
	var curlevel=0;

function CurrentScreen(s){
	if(typeof s==="undefined")
		return curlevel;
	else
		return curlevel=s;
}


/////////////////////////////////////////////////////////////////////////////////////
// Save Level & Checkpoint

if(typeof ObtainStorageURL==="undefined")
	function ObtainStorageURL(){
		if (typeof PageUnFragment==="undefined")
			return document.URL;
		else
			return PageUnFragment(document.URL);
	}

function LocalStorageName(name){
	if(!name)
		return ObtainStorageURL();
	else{
		if(!LocalStorageName['list'])
			LocalStorageName['list']=[];
		
		if(!In(LocalStorageName['list'],name))
			LocalStorageName['list'].push(name);
		
		return ObtainStorageURL()+"_"+name.toLowerCase();
	}	
}
function LocalStorage(name,set,TransformF){ //Getter-setter
	if(!set){
		var data=false;
		try{
			var data=localStorage[LocalStorageName(name)];
		}
		catch(err){};
		
		if(!data)
			return [];
		data=JSON.parse(data);
		
		if(data['data']){ //unwrap capsule
			var vers=data['vers'];
			data=data['data'];
			if(!vers||vers<DATAVERSION) //legacy conversion
				data=LegacyConversion(name,data,vers);
		}		
		
		if(TransformF&&data.length)
			data=data.map(TransformF);
		return data;
	}
	else{
		if(name==="")
			var capsule=set; //no capsule, for compatibility
		else 
			var capsule={  //wrap in capsule
				'data':set,
				'vers':DATAVERSION,
				'name':name
			};
	}
	try{
		return localStorage[LocalStorageName(name)]=JSON.stringify(capsule);
	}
	catch(err){};
}

function LegacyConversion(name,data,vers){
	var Converter=LegacyConversion[name];
	if(!Converter)
		return data;
	else
		return Converter(data,vers);
}

function ArrayRemap(wrongarray,rightarray){
	var i=0;
	var j=0;
	var newarray=[];
	while(i<wrongarray.length){
		if(In(rightarray,wrongarray[i])){
			newarray.push(wrongarray[i]);
			j=rightarray.indexOf(wrongarray[i])+1;
		}
		else{
			newarray.push(rightarray[j])
			j++;
		}
		i++;
	}
	return newarray;
}

LegacyConversion["solvedlevels"]=function(solvedlevels,vers){

	if(!vers||vers<5)	 					//Previous data format;
		solvedlevels=solvedlevels.map(LevelNumber);
	
	if(solvedlevels.some(IsScreenMessage))	//Case of added/removed interlevel messages;
		solvedlevels=ArrayRemap(solvedlevels,Levels());
	
	return solvedlevels;
};

LegacyConversion["checkpoint"]=function(sta,vers){
	if(!vers||vers<5)
		if(sta.dat)
			return [sta];
	return sta;
};

function CanSaveLocally(){
	try{
		return window.localStorage;
		}
	catch(e){return false;} //Log error
}
function Checkpointed(){
	return LocalStorage("checkpoint").length>0;
}
function HasLevel(){
	return CanSaveLocally()&&!(LocalStorage("").length===0);
}


// Localsave = save in local storage
if(typeof ObtainLevelsWriter==="undefined")
	var ObtainLevelsWriter=Identity;

function LocalsaveLevel(curscreen){
	if(savePermission){
		LocalStorage("solvedlevels",ObtainLevelsWriter(SolvedLevels()));
		return LocalStorage("",curscreen);
	}
	else
		EraseLocalsaveLevel();
};

function LocalsaveCheckpoints(newstack){
	if(savePermission)
		return LocalStorage("checkpoint",newstack);
	else
		EraseLocalsaveCheckpoints();
}

if(typeof SaveLocalHints==="undefined")
	SaveLocalHints=False;
	
function Localsave(){
	LocalsaveLevel(CurrentScreen());
	SaveLocalHints();
	//LocalsaveCheckpoints();
}	

function EraseLocalStorage(name){
	if(name){
		try{
			return localStorage.removeItem(LocalStorageName(name));
		}
		catch(err){};
	}
	else
		LocalStorageName['list'].map(EraseLocalStorage);
}

function EraseLocalsaveLevel(){
	EraseLocalStorage("solvedlevels");
	return EraseLocalStorage("");
};

function EraseLocalsaveCheckpoints(){
	return EraseLocalStorage("checkpoint");
};


function EraseLocalsave(){
	if(CanSaveLocally())
		EraseLocalStorage();
}


// Load from memory
if(typeof ObtainLevelReader==="undefined")
	var ObtainLevelReader=Number;

function LoadLevel(){
	SolvedLevels.levels=LocalStorage("solvedlevels",undefined,ObtainLevelReader);
	return CurrentScreen(LocalStorage(""));
}

function LocalloadCheckpoints(){
	return LocalStorage("checkpoint");
}


function GetCheckpoints(){
	if(GetCheckpoints.stack)
		return GetCheckpoints.stack;
	else
		return GetCheckpoints.stack=LocalloadCheckpoints();
}

function LoadCheckpoint(n){
	var stack=GetCheckpoints();

	if(n<stack.length)
		ConsoleAddOnce("Beware! Saving at a past checkpoint will erase former future progress...");
	
	curcheckpoint=Min(Max(n-1,0),stack.length-1); //decrement 1 unit
	return curlevelTarget=stack[curcheckpoint];
}


function PushSaveCheckpoint(levelTarget){
	var stack=GetCheckpoints();
	
	function EvacuateCheckpoints(stack,n){
		var s=stack;
		var i=s.length-1;
		while(n<i){
			i--;
			s.pop();
		}
		return s;
	};
	
	if(curcheckpoint+1<stack.length){
		stack=EvacuateCheckpoints(stack,curcheckpoint);
		ConsoleAdd("Saved in a past checkpoint. Future progress erased.")
	}
	
	stack=stack.concat([levelTarget]);
	curcheckpoint=stack.length-1;
	
	return GetCheckpoints.stack=stack;
}



function LoadGame(){
	if(HasLevel()){
		if(Checkpointed()){
			LoadLastCheckpoint();
		}
		return LoadLevel();
	}
}


// Preserve original level save format (within checkpoint stack)

function FormerLevel4Serialization() { //The original one
	var ret = {
		dat : Array.from(level.objects),
		width : level.width,
		height : level.height,
		oldflickscreendat: oldflickscreendat.concat([]),
		//New
		lvl:CurrentScreen()
	};
	return ret;
}


////////////////////////////////////////////////////////////////////////////////
// Winning Logic (non-linear level navigation "jumping")

function MarkWonScreen(screen){
	var screen=screen||CurrentScreen();
	
	EchoLevelWin(screen);
	AddToSolvedScreens(screen);
	LocalsaveLevel(screen);
	
	if(typeof RegisterLevelHonour!=="undefined")
		RegisterLevelHonour();
}

function NextLevel(){
	var curscreen=Min(CurrentScreen(),LastScreen()?LastScreen():CurrentScreen());
	CurrentScreen(curscreen);
	HideLevelMessage();
	ResetStory();
	
	if (TitleScreen())
		StartLevelFromTitle();
	else {
		if(!SolvedAllLevels())
			AdvanceUnsolvedScreen();
		else if(curscreen<LastScreen())
			AdvanceEndScreen();
		else{
			RequestHallOfFame();
			ResetGame();
		}
	}
}

function TitleScreen(t){
	if(typeof t==="undefined")
		return titleScreen;
	else
		return titleScreen=t?true:false;
}

////////////////////////////////////////////////////////////////////////////////
// Level/Message Screen navigation

// Keep track of solved levels

function ScreenMessage(lvlscreen){
	return ObtainStateScreens()[lvlscreen].message;
}
function CurrentScreenMessage(){
	return ScreenMessage(CurrentScreen());
}

function IsScreenMessage(lvlscreen){
	return typeof ScreenMessage(lvlscreen)!=="undefined"
}

function ScreenType(level){
	return typeof level.message==="undefined";	
}

function LevelScreens(){
	if(LevelScreens.l!==undefined)
		return LevelScreens.l;
	else{
		var l=[];
		for(var i=0;i<ObtainStateScreens().length;i++){
			if(ScreenType(ObtainStateScreens()[i]))
				l.push(i);
		}
		return LevelScreens.l=l;
	}
}

function Levels(){
	return LevelScreens().map(LevelNumber);
}

function LevelScreen(n){
	return LevelScreens()[n-1];
}

function SolvedLevels(){
	if(SolvedLevels.levels===undefined)
		SolvedLevels.levels=[];
	return SolvedLevels.levels;
}

function AddToSolvedScreens(curscreen){
	function SortNumber(a,b){return a-b};
	if(!IsScreenMessage(curscreen)&&!LevelScreenSolved(curscreen)){
		SolvedLevels.levels.push(LevelNumber(curscreen));
		SolvedLevels.levels=SolvedLevels.levels.sort(SortNumber);
	}
	return SolvedLevels();
}

function LevelSolved(n){
	return LevelScreenSolved(LevelScreen(n));
}

function LevelScreenSolved(curscreen){
	return In(SolvedLevels(),LevelNumber(curscreen));
}

function UnSolvedLevelScreens(){
	return LevelScreens().filter(function(l){return !LevelScreenSolved(l)});
}

function FirstUnsolvedScreen(){
	if(UnSolvedLevelScreens().length===0)
		return 1+LevelScreens()[MaxLevel()-1];
	else{
		var c=LevelScreens().indexOf(UnSolvedLevelScreens()[0]);
		if(c===0)
			return 0;
		else
			return 1+LevelScreens()[c-1];
	}
}

function NextUnsolvedScreen(curscreen){
	var firstusolve=UnSolvedLevelScreens().filter(function(x){return x>=curscreen;})[0];
	var lastsolvebefore=UnlockedLevelScreens().filter(function(x){return x<firstusolve;});
	return Last(lastsolvebefore)+1;
}

function LastScreen(){return ObtainStateScreens().length-1;};

function FinalLevelScreen(){
	var li=UnlockedLevelScreens(); 
	return Last(li);
};

function ClearSolvedLevelScreens(){
	return SolvedLevels.levels=[];
}

function SolvedAllLevels(){
	return LevelScreens().every(LevelScreenSolved);
}

function LevelNumber(curscreen){
	return LevelScreens().filter(function(l){return l<curscreen}).length+1;
}

function CurLevelNumber(){
	return LevelNumber(CurrentScreen());
}


function UnlockedLevels(){
	var LevelLookahead=ObtainLevelLookahead();
	var gateLevels=ObtainGateLevels(); 
	
	if(LevelLookahead<1){
		return Levels();
	}else{
		var showlevels=SolvedLevels();
		var lvl=LevelNumber(FirstUnsolvedScreen());
		var lookahead=1;
		while(lookahead<=LevelLookahead&&lvl<=Levels().length){
			if(In(gateLevels,lvl)&&lookahead>1) //Don't reveal gate level until all previous levels are solved
				break;
			else if(!LevelSolved(lvl)){
				showlevels=showlevels.concat(lvl);
				if(In(gateLevels,lvl))		  //Don't reveal more levels while gate level unsolved
					break;
				else
					lookahead++;
			}
			lvl++;
		}
		//console.log(showlevels);
		return showlevels.sort(function(a,b){return a>b;});
	}
}

function UnlockedLevelScreens(){
	return UnlockedLevels().map(LevelScreen);
}

function MaxLevel(){
	return LevelScreens().length;
}


//Level Title
function LevelTitle(lvl){
	var leveltitles=LevelLoadedTitles();
	if(!leveltitles||!leveltitles[lvl-1])
		return UnnamedLevelTitle(lvl)
	else
		return leveltitles[lvl-1];
}

function UnnamedLevelTitle(lvl){
	return "Select level "+LevelNumberFromTotal(lvl);
}

function LevelGatedTitle(lvl){
	var LevelLookahead=ObtainLevelLookahead();
	if(In(ObtainGateLevels(),lvl)&&!SolvedAllLevelsBefore(lvl))
		return "Level locked: all previous levels required.";
	else if(LevelLookahead>0&&!SolvedRequiredLevelsBefore(lvl,LevelLookahead))
		return "Level locked: all but "+(LevelLookahead-1)+" earlier levels required.";
	else
		return LevelTitle(lvl);
}

function LevelsBefore(lvl,howmany){
	return Levels().filter(function(l){return lvl-howmany<=l&&l<lvl});
}

function SolvedAllLevelsBefore(lvl){
	return LevelsBefore(lvl,lvl).every(function(lvl){return In(SolvedLevels(),lvl)});
}

function SolvedRequiredLevelsBefore(lvl,howmany){
	return LevelsBefore(lvl,lvl).length-LevelsBefore(lvl,lvl).filter(function(lvl){return In(SolvedLevels(),lvl)}).length<howmany;
}


// Level Selector

function ChosenLevelDescription(){
	var DP=CurrentDatapack();
	if(DP){
		var l=FindData("level",CurrentDatapack().qid);
		if(l)
			return ChosenLevelDescription.last=ObtainLevelTitle(UnstarLevel(l));
	}
	
	if(ChosenLevelDescription.last)
		return ChosenLevelDescription.last;
	else
		return ObtainLevelTitle(CurLevelNumber());
}

function LevelSelectorMessage(){
	if(UnlockedLevels().length!==MaxLevel())
		return "Select from "+UnlockedLevels().length+" out of "+MaxLevel()+" levels";
	else
		return "Select one of the "+MaxLevel()+" levels";
}

function RequestLevelSelector(){
	if(!Checkpointed()){
		var DPOpts={
			questionname:ChosenLevelDescription(),
			qchoices:UnlockedLevels().map(StarLevelNumber),
			defaultChoice:function(i,c){return UnstarLevel(c)===CurLevelNumber()}
		}
	}
	else{
		var checkpointIndices=Object.keys(GetCheckpoints());
		var DPOpts={
			questionname:"Reached checkpoints:",
			qchoices:checkpointIndices.map(function(l){return (Number(l)+1)+"";}),
			defaultChoice:function(i,c){return Number(c)===checkpointIndices.length}
		}
	}
	
	var LevelSelectorShortcuts=FuseObjects(ObtainKeyActionsGameBar(),{
		"1":function(){DelayLevel(1)},
		"2":function(){DelayLevel(2)},
		"3":function(){DelayLevel(3)},
		"4":function(){DelayLevel(4)},
		"5":function(){DelayLevel(5)},
		"6":function(){DelayLevel(6)},
		"7":function(){DelayLevel(7)},
		"8":function(){DelayLevel(8)},
		"9":function(){DelayLevel(9)},
		"0":function(){DelayLevel(0)}
	});
	
	LevelSelectorShortcuts[ObtainMainKey("levelselector")]=CloseLevelSelector;
	
	RequestDataPack([
			['exclusivechoice',FuseObjects(DPOpts,{
				qsubmittable:false,
				qfield:"level",
				qclass:"level-selector",
				executeChoice:ChooseLevelClose,
				qtype:ExclusiveChoiceSectionsHTML(LevelSections())
			})]
		],
		{
			action:LoadFromLevelSelectorButton,
			qonsubmit:CloseLevelSelector,
			qonclose:GameFocus,
			qdisplay:LaunchBalloon,
			qtargetid:".game-container",
			shortcutExtras:LevelSelectorShortcuts,
			requireConnection:false,
			buttonSelector:"LevelselectorButton",
			spotlight:gameSelector
	});
}

function CloseLevelSelector(){
	if(CurrentDatapack().buttonSelector==="LevelselectorButton")
		CloseCurrentDatapack();
	GameFocus();
}


function MaxLevelDigits(){
	if(MaxLevelDigits.m)
		return MaxLevelDigits.m;
	return MaxLevelDigits.m=Ceiling(Math.log10(1+MaxLevel()));
};

function PadLevelNumber(n){
	return PadLeft(String(n),"0",MaxLevelDigits());
}

function LevelHintStar(n){
	var star="★";
	if(ObtainHints()&&UsedHints(n)!==0)
		star="☆";
	return LevelSolved(n)?star:"";
}

function StarLevelNumber(n){
	return PadLevelNumber(n)+LevelHintStar(n);
}

function StarLevel(l){
	var n=LevelNumber(l);
	return StarLevelNumber(n);
}
function UnstarLevel(l){
	return Number(l.replace("★","").replace("☆",""));
}

function UpdateAccessLevelMessage(){
	ReplaceChildren(ChosenLevelDescription(),".question");
}

Listen("Set level",UpdateAccessLevelMessage);

function LevelNumberFromTotal(lvl){
	return PadLevelNumber(lvl)+"/"+MaxLevel()+LevelHintStar(lvl)
}

function UpdateLevelSelectorButton(lvl){
	if(!lvl)
		lvl=CurLevelNumber(); 
	if(TitleScreen())
		var leveltext="Select level";
	else if(lvl<=MaxLevel())
		var leveltext="Level "+LevelNumberFromTotal(lvl)
	else
		var leveltext="★ All levels ★";
	ReplaceChildren(leveltext,"LevelselectorButton");
}

function LoadFromLevelSelectorButton(qid){
	var levelChoice=FindData("level",qid);
	ChooseLevelClose(levelChoice,qid);
}

function ChooseLevelClose(choice,pid){
	ChooseLevel(choice);
	Close(pid);
	setTimeout(GameFocus,100);
};

function ChooseLevel(choice){
	SelectLevel(UnstarLevel(choice));
};

function SelectLevelFromPage(){
	var level=PageSearch("level");
	if(!level)
		return;
	if(IsNan(Number(level)))
		SelectLevelFromTitle(level);
	else
		SelectLevel(Round(Number(level),0));
}

function SelectLevelFromTitle(leveltitle){
	var level=-Infinity;
	Levels().map(
		function(n){
			if(LowerSimpleString(ObtainLevelTitle(n))===LowerSimpleString(leveltitle))
				level=n;
		}
	);
	if(level>0)
		SelectLevel(level);
}

function SelectLevel(lvl){
	if(Checkpointed())
		GoToScreenCheckpoint(lvl);
	else if(In(UnlockedLevels(),lvl))
		SelectUnlockedLevel(lvl);
	else
		console.log("Level "+lvl+" locked!");
}

function SelectUnlockedLevel(lvl){
	//Don't return to same level
	if(lvl===CurLevelNumber()&&!TitleScreen())
		return console.log("stay in lvl ",lvl);
		
	//Go to exactly after the level prior to the chosen one, to read all useful messages, including level title
	var n=lvl<2?0:(LevelScreens()[lvl-2]+1);
	GoToScreen(n);
	
	EchoSelect(lvl,"level");
};


function GoToScreenCheckpoint(n){
	LoadCheckpoint(n);
	loadLevelFromStateTarget(state,CurrentScreen(),curlevelTarget);
	ResizeCanvas();
	
	EchoSelect(n,"checkpoint");
};

function GoToScreen(lvl){
	CurrentScreen(lvl);
	AdvanceLevel();
	ResizeCanvas();
};

// Keyboard to Pick Level - records multiple digits within a 2000 ms timeframe to select the level

function IsUnlockedLevel(n){
	return In(UnlockedLevels(),Number(n));
}

function DelayLevel(n){
	clearTimeout(DelayLevel.timer);
	var t=Date.now();
	if((!DelayLevel.lastTime)||(t-DelayLevel.lastTime>2000)||!IsUnlockedLevel(DelayLevel.level+""+n)){ //Restart
		DelayLevel.level=""+n;
		DelayLevel.lastTime=Date.now();
		var n=Number(DelayLevel.level);
	}
	else{
		DelayLevel.level=DelayLevel.level+""+n;
		DelayLevel.lastTime=Date.now();
		var n=Number(DelayLevel.level);
	}
	
	FocusElement("choice-"+StarLevelNumber(n));
	
}	
	

// Level Progression

function StartLevelFromTitle(){
	if(ObtainNewGameCondition()){//new game
		ResetLevel();
		ResetCheckpoints();
	}
	
	LoadLastCheckpoint();
	LoadLevelOrCheckpoint();
}

function ResetLevel(){
	CurrentScreen(0);
	curlevelTarget=null;
	ClearSolvedLevelScreens();
	ClearLevelRecord();
}


function LoadLastCheckpoint(){
	if(Checkpointed()){
		var stack=GetCheckpoints();
		curcheckpoint=stack.length-1;
		curlevelTarget=stack[curcheckpoint];
	}
}

function ResetCheckpoints(){
	curcheckpoint=0;
	EraseLocalsaveCheckpoints();
	GetCheckpoints.stack=[];
}

if(typeof ShoutStory==="undefined")
	function ShoutStory(){return;}; 

function ResetStory(){
	if(ShoutStory)
		ShoutStory["list"]=LocalStorage("story");
	EraseLocalStorage('story');
}

function ResetGame(){
	EraseLocalsave();
	ClearSolvedLevelScreens();
	ResetLevel();
	ResetCheckpoints();
	ObtainTitleScreenLoader();
	ObtainPlayEndGameSound();
	ClearLevelRecord();
	UpdateLevelSelectorButton()
}

function AdvanceLevel(){
	ObtainLevelTransition();
	LocalsaveLevel(CurrentScreen());
	LoadLevelOrCheckpoint();
	ClearLevelRecord();
	UpdateLevelSelectorButton();
}

function AdvanceUnsolvedScreen(){
	var curscreen=CurrentScreen();
	if(IsScreenMessage(curscreen)&&curscreen<FinalLevelScreen()){
		//console.log("from message");
		CurrentScreen(curscreen+1);
	}
	else if(curscreen>=FinalLevelScreen()||!NextUnsolvedScreen(curscreen)){
		//console.log("from last level");
		CurrentScreen(FirstUnsolvedScreen());
	}
	else{
		//console.log("from anywhere in the middle");
		CurrentScreen(NextUnsolvedScreen(curscreen));
	}		
	AdvanceLevel();	
}

function AdvanceEndScreen(){
	if(CurrentScreen()>=FinalLevelScreen())
		CurrentScreen(CurrentScreen()+1);
	else
		CurrentScreen(FinalLevelScreen()+1);
	
	AdvanceLevel();		
}

function LoadLevelOrCheckpoint(){
	if ((typeof curlevelTarget!=="undefined")&&(curlevelTarget!==null)){
		loadLevelFromStateTarget(state,CurrentScreen(),curlevelTarget);
		curlevelTarget=null;
	}
	else
		ObtainLevelLoader();
}



////////////////////////////////////////////////////////////////////////////////
//Key capturing

function KeyActionsGameBar(){
	var KAGB={};
		KAGB[ObtainMainKey("feedback")]=RequestGameFeedback;
		KAGB[ObtainMainKey("fullscreen")]=RequestGameFullscreen;
		KAGB[ObtainMainKey("hint")]=ObtainRequestHint;
		KAGB[ObtainMainKey("keyboard")]=ObtainKeyboardAllowed?RequestKeyboard:Identity;
		KAGB[ObtainMainKey("levelselector")]=ObtainLevelSelectorAllowed?RequestLevelSelector:Identity;
		KAGB[ObtainMainKey("music")]=ToggleCurrentSong;
	return KAGB;
}

//Game keybinding profile
if(typeof ObtainKeyActionsGame==="undefined")
	var ObtainKeyActionsGame=function(){
		return {
			//Arrows
			"left"		:InstructGameKeyF(37),
			"up"		:InstructGameKeyF(38),
			"right"		:InstructGameKeyF(39),
			"down"		:InstructGameKeyF(40),
			"W"			:InstructGameKeyF(37),
			"A"			:InstructGameKeyF(38),
			"S"			:InstructGameKeyF(39),
			"D"			:InstructGameKeyF(40),
			//Action / Select
			"enter"		:ObtainAction,	//InstructGameKeyF(88),
			"C"			:ObtainAction,	//InstructGameKeyF(88),
			"X"			:ObtainAction,	//InstructGameKeyF(88),
			"spacebar"	:ObtainAction,	//InstructGameKeyF(88),
			// Undo	 
			"Z"			:ObtainUndo,	//InstructGameKeyF(85),
			"U"			:ObtainUndo,	//InstructGameKeyF(85),
			"Y"			:ObtainRedo,	//InstructGameKeyF(85),
			/*"backspace"	:InstructGameKeyF(85),*/
			// Restart
			"R"			:ObtainRestart,	//InstructGameKeyF(82),
			// Quit
			"escape"	:InstructGameKeyF(27),
			"Q"			:InstructGameKeyF(27)
		};
	}
	
if(typeof InstructGameKeyF==="undefined")
	var InstructGameKeyF=function(newkey){
		return function(ev){ev.keyCode=newkey;InstructGame(ev)}
	}
	
if(typeof InstructGame==="undefined")
	var InstructGame=function(event){
		event.preventDefault();
		var key=event.keyCode;
	
		//Avoid repetition?
		if (In(keybuffer,key))
			return;
		
		//Instruct the game
		if (!In(keybuffer,key)){
			keybuffer.splice(keyRepeatIndex,0,key);
			keyRepeatTimer=0;
			CheckRegisterKey(event);
			}
	}
	
	//Execute key instructions
if(typeof CheckRegisterKey==="undefined")
	var CheckRegisterKey=function(event){
		checkKey(event,true);
		RegisterMove(event.keyCode);
	}
		



//Keybind to game element
var FullShortcuts=FuseObjects(ObtainKeyActionsGameBar(),ObtainKeyActionsGame());
OverwriteShortcuts(ParentSelector(gameSelector),FullShortcuts);


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
	
	if(!ObtainKeyboardAllowed)
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



////////////////////////////////////////////////////////////////////////////////
//Better inter-level messages
function ShowLevelMessage(lvlscreen){
	if(!lvlscreen)
		lvlscreen=CurrentScreen();
	
	HideLevelMessage();
	AppendElement("<div class='game-message-container'><div class='game-message'><p>"+CurrentScreenMessage()+"</p></div></div>",gameSelector);
	GameFocus();
}

function HideLevelMessage(){
	RemoveElements('.game-message-container');
}


////////////////////////////////////////////////////////////////////////////////
//Related games
function MoreButton(){
	return GameBarButtonHTML("more",{onclick:'RequestMore();'});	
}

if(Memory("PGD")){
	ListenOnce("GameBar",function(){ShowButton(MoreButton)});
}else{
	ListenOnce("LoadPGD",function(){ShowButton(MoreButton)});
}

function RequestMore(){
	if(!GameEntryData)
		return;
	var id=PageSearch("game");
	var data=Memory(id);
	if(!id||!data)
		return;
	
	var author=data["author-consensus"];
	function SameAuthor(au){
		return function(d){
			var d=Memory(d);//game data hook
			return In(d["author-consensus"],au)||In(au,d["author-consensus"]);
		}
	}
	var games=Memory("PGD").filter(SameAuthor(author)).map(function(id){return GameDropDownButtonHTML(id,false)});
	var DPFields=[
			['plain',{questionname:"More games by: <b>"+author+"</b>"}],
			['plain',{questionname:games.join("\n")}],
		];

	RequestDataPack(DPFields,{
		qonclose:GameFocus,
		qdisplay:LaunchAvatarBalloon,
		qtargetid:".game-container",
		requireConnection:false,
		shortcutExtras:ObtainKeyActionsGameBar(),
		buttonSelector:"MoreButton",
		spotlight:gameSelector
	});
}


////////////////////////////////////////////////////////////////////////////////
Shout("data-game-extras");