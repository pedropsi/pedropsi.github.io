
canYoutube=false;


////////////////////////////////////////////////////////////////////////////////
// Game data link defaults, for puzzlescript, overwritable

//Game selector
if(typeof ObtainGameSelector==="undefined")
	var ObtainGameSelector=function(){return '#gameCanvas'};

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

if(typeof ObtainInitialMessages==="undefined")
	var ObtainInitialMessages=true;
//	var ObtainInitialMessages=false;


function ResizeCanvas(){canvasResize();}

if(typeof titleScreen==="undefined")
	var titleScreen=true;


//Game and Level Navigation

if(typeof ObtainStateScreens==="undefined")
	var ObtainStateScreens=function(){return state.levels;}

if(typeof ObtainNewGameCondition==="undefined")
	var ObtainNewGameCondition=function(){return titleSelection===0}



ObtainLevelTransition=function(){
	textMode=false;
	titleScreen=false;
	quittingMessageScreen=false;
	messageselected=false;
}

if(typeof ObtainTitleScreenReLoader==="undefined")
	var ObtainTitleScreenReLoader=function(){goToTitleScreen()};

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

if(typeof ObtainLevelNotes==="undefined")
	var ObtainLevelNotes=function(lvl){return ""};

if(typeof ObtainLevelDescriptionTitle==="undefined")
	var ObtainLevelDescriptionTitle=ObtainLevelTitle;

if(typeof ObtainLevelSelectorAllowed==="undefined")
	function ObtainLevelSelectorAllowed(){
		return MaxLevel()>1||(typeof sourceCode!=="undefined"&&In(sourceCode,"checkpoint"));
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

if(typeof ObtainPlayEndLevelSound==="undefined")
	var ObtainPlayEndLevelSound=function(){tryPlayEndLevelSound()};


////////////////////////////////////////////////////////////////////////////////
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
	


////////////////////////////////////////////////////////////////////////////////
//Related games

function GameHackURL(){
	return "https://www.puzzlescript.net/editor.html?hack="+PageSearch("game");
}

function WrenchButton(){
	if(ConsoleExternal())
		return GameBarButtonHTML("wrench",{onclick:'Navigate(GameHackURL(),false);'})
	else
		return "";
}

function MoreButton(){
	return GameBarButtonHTML("more",{onclick:'RequestMore();'});	
}

if(Memory("PGD")){
	HearOnce("GameBar",function(){ShowButton(MoreButton)});
}else{
	HearOnce("LoadPGD",function(){ShowButton(MoreButton)});
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
//Puzzlescript overwrite

function consoleError(str){
	ConsoleAdd(str);
}


//doSetupTitleScreenLevelContinue - Level selector - start saving a stack of checkpoints
function doSetupTitleScreenLevelContinue(){	LoadGame();};

doSetupTitleScreenLevelContinue()

//DoWin - Level selector - keep track of solved levels and echo win
function DoWin() {
	if (!winning) {
		MarkWonScreen();
		ObtainPlayEndLevelSound();
		againing = false;
		if (unitTesting){
			return void nextLevel();
		}
		winning = true, timer = 0
	}
}

//nextLevel
function nextLevel(){
	againing=false;
	messagetext="";
	
	NextLevel();
	
	AdjustFlickscreen();
	canvasResize();
}


//level4Serialization - save a full checkpoint stack and echo
function level4Serialization() { //Intercept
	EchoCheckpoint();
	
	var stack=GetCheckpoints();
	console.log("restarting",restarting,stack);
	
	setTimeout(function(){
		console.log("saving...",stack);
		if(!restarting)
			stack=PushSaveCheckpoint(restartTarget)
		LocalsaveCheckpoints(stack);
		LocalsaveLevel(curlevel);
	},500)
	
	return FormerLevel4Serialization();
}


//playSound - custom sound effects, if available
function playSound(seed) {
	if (Muted())
		return;
	
	//Play if memorised
	if(playSound[seed]){
		function P(){PlaySound(playSound[seed])};
		Throttle(P,500,seed);
		return;
	}

	//Play if overwritten
	var sounds=GetElements('.sound');	
	if(sounds){
		sounds=sounds.filter(function(s){return s.dataset.sfx===String(seed)});
		if(sounds.length>0){
			playSound[seed]=sounds[0].src; //memorise
			PlaySound(playSound[seed]);
			return;
		}
	}

	//Default play if not played before
	checkAudioContextExists();
	if (unitTesting) return;
	var sound = cacheSeed(seed);
	sound.play();
}


// Preserve this function as is
function AdjustFlickscreen(){
	if (state!==undefined && state.metadata.flickscreen!==undefined){
		oldflickscreendat=[0,0,Min(state.metadata.flickscreen[0],level.width),Min(state.metadata.flickscreen[1],level.height)];
	}
}


window.Mobile.GestureHandler.prototype.toggleMenu=RequestLevelSelector;
if(typeof MobileInitialise!=="undefined")
	MobileInitialise(window.Mobile.GestureHandler.prototype);


////////////////////////////////////////////////////////////////////////////////
//Puzzlescript connection modules



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

//Checkpoints
var curcheckpoint=0;

function Checkpointed(){
	return LocalStorage("checkpoint").length>0;
}

function LocalsaveCheckpoints(newstack){
	if(savePermission)
		return LocalStorage("checkpoint",newstack);
	else
		EraseLocalsaveCheckpoints();
}

function EraseLocalsaveCheckpoints(){
	return EraseLocalStorage("checkpoint");
};

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



function LoadLastCheckpoint(){
	if(Checkpointed()){
		var stack=GetCheckpoints();
		curcheckpoint=stack.length-1;
		curlevelTarget=stack[curcheckpoint];
	}
}


////////////////////////////////////////////////////////////////////////////////
//Level selector

ObtainLevelSelectorOptions=function(){
	if(!Checkpointed())
		return {
			questionname:ChosenLevelDescriptionHTML(),
			qchoices:UnlockedLevels().map(StarLevelNumber),
			qchoicesViewF:ObtainLevelNumberDisplay,
			defaultChoice:function(i,c){return UnstarLevel(c)===CurLevelNumber()}
		};

	var checkpointIndices=Object.keys(GetCheckpoints());
	return {
			questionname:"Reached checkpoints:",
			qchoices:checkpointIndices.map(function(l){return (Number(l)+1)+"";}),
			defaultChoice:function(i,c){return Number(c)===checkpointIndices.length}
		};
}


function ObtainLoadGame(){
	if(HasLevel()){
		if(Checkpointed()){
			LoadLastCheckpoint();
		}
		return LoadLevel();
	}
}

function ObtainLeverLoader(){
	LoadLastCheckpoint();
	
	if ((typeof curlevelTarget!=="undefined")&&(curlevelTarget!==null)){
		loadLevelFromStateTarget(state,CurrentScreen(),curlevelTarget);
		curlevelTarget=null;
	}
	else
		loadLevelFromState(state,curlevel);
}

function ObtainSelectLevel(lvl){
	if(Checkpointed())
		GoToScreenCheckpoint(lvl);
	else SelectLevel(lvl);
}



function GoToScreenCheckpoint(n){
	LoadCheckpoint(n);
	loadLevelFromStateTarget(state,CurrentScreen(),curlevelTarget);
	ResizeCanvas();
	
	EchoSelect(n,"checkpoint");
};

function ObtainResetLevel(){
	ResetCheckpoints();
	ResetLevel();
	ResetStory();
}

function ResetCheckpoints(){
	curlevelTarget=null;
	curcheckpoint=0;
	EraseLocalsaveCheckpoints();
	GetCheckpoints.stack=[];
}

function ObtainCurrentLevel(){
	if(Checkpointed())
		return CurCheckpointString();
	else
		return CurLevelNumber();
}

if(typeof curlevel==="undefined")
	var curlevel=0;

function CurrentScreen(s){
	if(typeof s==="undefined")
		return curlevel;
	else
		return curlevel=s;
}

if(typeof ShoutStory==="undefined")
	function ShoutStory(){return;}; 

function ResetStory(){
	if(ShoutStory)
		ShoutStory["list"]=LocalStorage("story");
	EraseLocalStorage('story');
}


////////////////////////////////////////////////////////////////////////////////
Shout("data-game-overwrite-puzzlescript")