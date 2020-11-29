//Game Options
function ObtainBGColor(){return state.bgcolor;}
function ObtainFGColor(){return state.fgcolor;}

function ObtainRestartAllowed(){return !state.metadata.norestart;}
function ObtainUndoAllowed(){return !state.metadata.noundo;}

function ObtainStateScreens(){return state.levels;}
function ObtainNewGameCondition(){return titleSelection===0}

function ObtainLevelTransition(){
	textMode=false;
	titleScreen=false;
	quittingMessageScreen=false;
	messageselected=false;
}

function ObtainTitleScreenReLoader(){goToTitleScreen()};

function ObtainPlayEndLevelSound(){tryPlayEndLevelSound()};

function ObtainUndo(){
	PulseSelect("UndoButton");
	CheckRegisterKey({keyCode:85});
}

function ObtainRedo(){
	PulseSelect("RedoButton");
	CheckRegisterKey({keyCode:89}); //TODO REDO
}

function ObtainRestart(){
	PulseSelect("RestartButton");
	CheckRegisterKey({keyCode:82});
}

function ObtainAction(){
		CheckRegisterKey({keyCode:88});
}

function ObtainLoadGame(){
	if(HasLevel()){
		if(Checkpointed()){
			LocalloadCheckpoint();
		}
		return LocalloadLevel();
	}
}

function ObtainLevelLoader(){
	if ((typeof curlevelTarget!=="undefined")&&(curlevelTarget!==null)){
		loadLevelFromStateTarget(state,CurrentScreen(),curlevelTarget);
		curlevelTarget=null;
	}
	else loadLevelFromState(state,curlevel)
};

function ObtainLevelSelectorAllowed(){
	return MaxLevel()>1||(typeof sourceCode!=="undefined"&&In(sourceCode,"checkpoint"));
}

//Read 'Previous' titles
if(ObtainLevelTitle==="Previous"){ //Case for title specified in message before the level
	var ObtainLevelTitle=function(lvl){
		var title= ObtainStateScreens()[LevelScreen(lvl)-1].message;
		if(!title)
			return "";
		title=title.replace(/^[\-\"\_\:\'\s\n]*(level\s*\d*)*[\-\"\_\:\'\s\n]*/im,"").replace(/[\-\"\_\:\'\s\n]*$/im,"");
		return title.replace(/[\-][\-\s]?/gi," ");
	}
}

function ObtainResizeCanvas(){canvasResize();}

//Read move defaults
function ObtainIsUndoMove(move){return move==="Z"}
function ObtainIsRedoMove(move){return move==="Y"}
function ObtainIsRestartMove(move){return move==="R"}
function ObtainReadMove(move){
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


////////////////////////////////////////////////////////////////////////////////
//Puzzlescript overwrite

function consoleError(str){
	ConsoleAdd(str);
}


//doSetupTitleScreenLevelContinue - Level selector - start saving a stack of checkpoints
function doSetupTitleScreenLevelContinue(){	ObtainLoadGame();};

doSetupTitleScreenLevelContinue()

//DoWin - Level selector - keep track of solved levels and echo win
function DoWin() {
	if (!winning) {
		MarkWonLevel();
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
	
	ResetStory();
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


//playSound - custom sound effects, if available
function playSound(seed) {
	if (typeof Muted!=="undefined"&&Muted())
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


//Story
if(typeof ShoutStory==="undefined")
	function ShoutStory(){return;}; 

function ResetStory(){
	if(ShoutStory)
		ShoutStory["list"]=LocalStorage("story");
	EraseLocalStorage('story');
}


// Preserve this function as is
function AdjustFlickscreen(){
	if (state!==undefined && state.metadata.flickscreen!==undefined){
		oldflickscreendat=[0,0,Min(state.metadata.flickscreen[0],level.width),Min(state.metadata.flickscreen[1],level.height)];
	}
}


//Puzzlescript keybindings

//Game keybinding profile
var ObtainKeyActionsGame=function(){
	return {
		//Arrows
		"left"		:GameKeyHandler(37),
		"up"		:GameKeyHandler(38),
		"right"		:GameKeyHandler(39),
		"down"		:GameKeyHandler(40),
		"W"			:GameKeyHandler(37),
		"A"			:GameKeyHandler(38),
		"S"			:GameKeyHandler(39),
		"D"			:GameKeyHandler(40),
		//Action / Select
		"enter"		:ObtainAction,	//GameKeyHandler(88),
		"C"			:ObtainAction,	//GameKeyHandler(88),
		"X"			:ObtainAction,	//GameKeyHandler(88),
		"spacebar"	:ObtainAction,	//GameKeyHandler(88),
		// Undo	 
		"Z"			:ObtainUndo,	//GameKeyHandler(85),
		"U"			:ObtainUndo,	//GameKeyHandler(85),
		"Y"			:ObtainRedo,	//GameKeyHandler(85),
		/*"backspace"	:GameKeyHandler(85),*/
		// Restart
		"R"			:ObtainRestart,	//GameKeyHandler(82),
		// Quit
		"escape"	:GameKeyHandler(27),
		"Q"			:GameKeyHandler(27)
	};
}
	

if(typeof GameKeyHandler==="undefined")
	var GameKeyHandler=function(newkey){
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
		

window.Mobile.GestureHandler.prototype.toggleMenu=RequestLevelSelector;
if(typeof MobileInitialise!=="undefined")
	MobileInitialise(window.Mobile.GestureHandler.prototype);

if(typeof onKeyDown!=="undefined")
	StopCapturingKeys(onKeyDown);



////////////////////////////////////////////////////////////////////////////////
Shout("data-game-overwrite-puzzlescript")