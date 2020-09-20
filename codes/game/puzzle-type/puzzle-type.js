///////////////////////////////////////////////////////////////////////////////
//Puzzle Type (c) Pedro PSI, 2019-2020.
//All rights reserved
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

if(PageIdentifier()!=="puzzle-type")
	AddElement("<style>html{overflow-y:hidden};</style>","HEAD")

var gameTitle="Puzzle Type";

function GameFrameHTML(){
	return `<div class='game-supra-Canvas'>
				<div class='game' id='gameCanvas'>
				</div>
			</div>`;
}


///////////////////////////////////////////////////////////////////////////////
// Game module hooks

//Colour
function ObtainBGColor(){return ShiftBaseColour(window.getComputedStyle(document.body)["background-color"]);}
function ObtainFGColor(){return ShiftBaseColour(window.getComputedStyle(document.body)["color"]);}

function ShiftBaseColour(basecolour){
	return HEX(Huen(basecolour,(MaxLevel()-CurLevelNumber()+1)/(MaxLevel())*360)).colour;
}

//Restart and Undo
function ObtainRestartAllowed(){return true;}
function ObtainUndoAllowed(){return true;}
function ObtainRedoAllowed(){return true;}
var ObtainUndo=function(){if(!InputBlocked()) Undo();PulseSelect("#choice-"+"undo");GameFocus()};					//With Onscreen keyboard
var ObtainRedo=function(){if(!InputBlocked()) Redo();PulseSelect("#choice-"+"redo");GameFocus()};					//With Onscreen keyboard
var ObtainRestart=function(){if(!InputBlocked())Restart();PulseSelect("#choice-"+"restart");GameFocus()};			//With Onscreen keyboard

function ObtainMainKey(action){
	if(!action)
		return {
			"undo":"Ctrl Z",
			"redo":"Ctrl Y",
			"restart":"Ctrl R",
			"feedback":"Ctrl E",
			"fullscreen":"Ctrl F",
			"hint":"Ctrl H",
			"keyboard":"Ctrl K",
			"levelselector":"Ctrl L",
			"music":"Ctrl M"
		}
	else
		return ObtainMainKey()[action];
}


//Level navigation
function ObtainStateScreens(){return LevelGoals;}


function ObtainLevelTitle(lvl){
	return LevelTitle(lvl);
}

function LevelTitle(lvl){
	return LevelGoals[lvl-1];
}

function CurLevelTitle(){
	return LevelTitle(CurLevelNumber());
}

function ObtainLevelDescription(lvl){
	return LevelDescription(LevelTitle(lvl));
}

function ObtainLevelNumberDisplay(m){
	var n=UnstarLevel(m);
	var title=LevelTitle(n);
	if(!title||title.length<3)
		return m;
	title=title.toUpperCase();
	var star=LevelHintStar(n);
	return title[0]+title[1]+title[2]+star;
}

var ObtainLevelLoader=LevelLoader;


//Resize canvas
function ObtainXYRotateCondition(x,y){return y>x;}

//Onscreen Keyboard
function ObtainKeyboardKeys(){
	return DefaultKeyboardKeys();
}
function ObtainKeyboardLauncher(){
	return LaunchKeyboardBanner;
}
function ObtainKeyboardTarget(){
	return gameSelector;
}

var ObtainKeyboardAllowed=True;

function ObtainHintsPath(){
	return ModulesPath()+"/hints.js"
}

var ObtainRequestHint=ObtainRequestHint?ObtainRequestHint:Identity;

// function ObtainHUDPicker(radius,angle){
// 	var dialring=CurrentDialRing(radius,angle);
// 	var ringSelector="."+dialring[0]+" .ring"+dialring[1];
	
// 	var e=GetElement(ringSelector);
// 	if(!e){
// 		ForbidCaret();
// 		return;
// 	}

// 	var letter=e.innerHTML.toUpperCase().replace("_","space");
// 	GameKeyHandler(letter)();
// }

// ObtainHUDElement=function(){
// 	return GetElement("gameCanvas");
// }

///////////////////////////////////////////////////////////////////////////////
// Load the game bar & prepare game

var gameModulesEarly=[
"codes/game/game.css",
"codes/game/modules/data-game-fullscreen.js",
"codes/game/modules/data-game-extras.js",
"codes/game/modules/data-game-moves.js",
"codes/game/modules/data-game-colours.js",
"codes/game/modules/data-game-undo.js",
"codes/game/game-intro.js",
"codes/game/modules/data-game-hints.js",
"codes/game/modules/data-game-gestures.js",
// "codes/game/modules/data-game-hud.js"
]

var gameModulesLater=[
"chords",
"codons",
"countries",
"lang-gender",
"lang-kana",
"letter-topology",
"letter-led",
"morse-braille",
"nuclei",
"number-reader",
"number-roman",
"colours-names",

//"meta",

"lang-fr-adj",
"lang-fr-adv-extra",
"lang-fr-interj",
"lang-fr-names",
"lang-fr-verbes",

"lang-plurals-superlatives"
]

function ModulesPath(){return "codes/game/puzzle-type"};
function MediaPath(){return "media/puzzle-type"};


LoadSources(gameModulesEarly,P()?GameIntro:GameTrailer);
gameModulesLater.map(LoaderInFolder(ModulesPath()+"/modules"));
LoaderInFolder("codes/libraries")("tone.js");
LoaderInFolder("codes/game/puzzle-type")(".solutions.js");

function GameIntro(){
	RemoveElement("game-supra-Canvas");
	PreAddElement(GameFrameHTML(),"BODY");
	GameFocus();
	LoadStyle(ModulesPath()+"/puzzle-type.css");
	setTimeout(function(){PlayIntro(".game",Clickwall)},300);
}

function Clickwall(){
	AddElement(`
		<div class="clickwall faded">
			<div class="circular">${ObtainSymbol("play")}</div>
			<p>Please turn on the sound ${ObtainSymbol("music")}.</p><p><b>Click anywhere to start!</b></p>
		</div>`,".game");
	UnFadeElement(".clickwall",500);
	function Start(){
		CloseElement(".game .clickwall",500);
		setTimeout(StartGame,500)
	}
	AttendOnce("click",Start,".clickwall");
}

function StartGame(){
	PrepareGame();
	ObtainLoadGame();
	InitialiseGameCanvas();
	ObtainTitleScreenReLoader();
};


TouchActionsTitlescreen=function(){
	return{
	"swipe-tap":LevelLoader,
	"swipe-left":LevelLoader,
	"swipe-up":LevelLoader,
	"swipe-right":LevelLoader,
	"swipe-down":LevelLoader
	}
}

TouchActionsMiddle=function(){
	return{
	"swipe-tap":RequestKeyboard,
	"swipe-up":RequestKeyboard,
	"swipe-left":ObtainUndo,
	"swipe-right":ObtainRedo,
	}
}

TouchActionsTop=function(){
	return{
	"swipe-tap":RequestLevelSelector,
	"swipe-up":ObtainTitleScreenReLoader,
	"swipe-left":SelectPreviousLevel,
	"swipe-right":SelectNextLevel
	}
}


function GameTrailer(){
	var trailerHTML=`<video width="1280" height="1024" autoplay>
		<source src="${MediaPath()}/trailorial.mp4" type="video/mp4">
  		Sorry! Your browser does not support the video tag.
	</video>`;
	PreAddElement(trailerHTML,"BODY");
}
//LoadAsync("cacher",".");
//ServiceWorker();

/*
function P(){
	ServiceWorkerCache([
		"media/puzzle-type/sound/startgame.mp3",
		"media/puzzle-type/sound/wingame.mp3",
		"media/puzzle-type/sound/win1.mp3",
		"media/puzzle-type/sound/win2.mp3",
		"media/puzzle-type/sound/win3.mp3"
	]);
}
*/


function P(){
	var pagetag=PageFragment();
	var fulltokens=["PatrickEye","Plurmorant","mago314","Deusovi","minotalen","KristianHedeholm","builder17","blubberquark"];
	var semitokens=[];
	var apptokens=fulltokens.map(function(t){return "homescreen-"+t});
	var manifest=GetElement("manifest");
	if(manifest)
		manifest.href=manifest.href.replace("homescreen","homescreen-"+pagetag);
	return In(fulltokens,pagetag)||In(apptokens,PageSearch("source"))||(In(semitokens,pagetag)&&PageSearch("levels"));
}


///////////////////////////////////////////////////////////////////////////////
//Keybinding

function KeyActions(){
	var keyactions={};
	
	Keybinder=function(F){
		return function(c){
			keyactions[c]=F;
		}
	}

	DirectKeybinder=function(c){
		keyactions[c]=GameKeyHandler(c);
	}

	AlphanumericCharacters.map(DirectKeybinder);
	LetterCharacters.map(c=>(keyactions["Shift "+c]=GameKeyHandler(c)));
	
	Directions.map(DirectKeybinder);
	["·","interpunkt"].map(Keybinder(Identity));//Do nothing

	["Ctrl down","Ctrl left","page up"].map(Keybinder(SelectPreviousLevel));
	["Ctrl up","Ctrl right","page down"].map(Keybinder(SelectNextLevel));

	Keybinder(ObtainTitleScreenReLoader)("home");

	["Escape","Enter"].map(DirectKeybinder);
	["undo",ObtainMainKey("undo"),"Backspace","Delete","Ctrl U","Ctrl Z"].map(Keybinder(ObtainUndo));
	["redo",ObtainMainKey("redo"),"Shift Backspace","Shift Delete","Ctrl Y"].map(Keybinder(ObtainRedo));
	["restart",ObtainMainKey("restart"),"Ctrl Backspace","Ctrl Delete"].map(Keybinder(ObtainRestart));
	["Spacebar","Space","_"].map(Keybinder(GameKeyHandler("space")));
	
	keyactions["close"]=CloseKeyboard;
	
	return keyactions;
}


function ObtainKeyActionsGame(){
	if(ObtainKeyActionsGame.keyactions)
		return ObtainKeyActionsGame.keyactions;
	return ObtainKeyActionsGame.keyactions=KeyActions();
};

function ObtainKeyActionsGameBar(){
	var KAGB=KeyActionsGameBar();
	KAGB[ObtainMainKey("keyboard")]=RequestKeyboard;
	KAGB[ObtainMainKey("hint")]=ObtainRequestHint;
	return KAGB;
}


function GameKeyHandler(key){
	return function(ev){
		if(ev)
			ev.preventDefault();
		GameKey(key);
		PulseSelect("#choice-"+key);		//Onscreen keyboard
	}
}

function GameKey(key){
	var key=StringSymbol(key); //accept keywords space, dot, dash
	function KeyInput(){
		return InstructGameInput(key);
	}
	Throttle(KeyInput,50,"Action");
}


function GameInput(key){
	if(key==="Escape"){
		ObtainTitleScreenReLoader();
		return;
	 }

	if(key===StringSymbol("interpunkt")){//neuter separator
		ForbidCaret();
		return;
	}

	if(ForbidEnterActions(key)||ForbidNumberActions(key)||ForbidSpaceActions(key)||ForbidArrowActions(key)){
		ForbidCaret();return;
	}

	if(AllowExtraUndoKey(key)){
		Undo();return;
	}
	
	else{
		if(Letters.array.length>=CharLimit(CurLevelTitle())||AllowExtraRestartKey(key)){//Max Char Limit (arbitrary, to fit screen)
			Restart();return;
		}
		else{
			LevelInstructions[CurLevelTitle()](key);
			RegisterMove(key);
		}
	}
	ObtainUpdateLevel();
	CheckWin();	
}

function CharLimit(title){
	if(In(CharLimits,title))
		return CharLimits[title]
	else
		return 50;
}

var CharLimits={
	"Loosely less":15
};

function TitleScreenInput(key){
	if(key!=="Escape")
		StartLevelFromTitle();
}

function InstructGameInput(key){
	if(InputBlocked())
		return;
	
	if(TitleScreen())
		TitleScreenInput(key);
	else
		GameInput(key);
	
	GameFocus();
};

function InputBlocked(){
	return BlockInput.blocked||false;
}

function BlockInput(duration){
	BlockInput.blocked=true;
	if(typeof duration!=="undefined")
		setTimeout(UnBlockInput,duration);
}
function UnBlockInput(){
	BlockInput.blocked=false;
}

function ForbidCaret(){
	Throttle(BumpSound,250);
	var c=GetElements(".caret");
	c.map(function(caret){PulseSelect(caret,"forbidden",500)});
}

function ForbidNumberActions(key){
	return (!In([
		"Direct",
		"Reverse",
		"Second",
		"Follow",
		"Rotate",
		"Fillet",
		"Symmetries",
		// "Topological",
		"Nokia 1998",
		"Loosely less",
		// "Fuchsia",
		"Odd",
		"La rapide surprise",
		"Starting buds",
		"Order is all",
		"⠍⠕⠗⠎⠑"],CurLevelTitle())&&In(NumberCharacters,key));
}

function ForbidSpaceActions(key){
	return (!In([
		"Direct",
		"Reverse",
		"Second",
		"Follow",
		"Rotate",
		"Loosely less",
		"Latent clones",
		"Shepherdess hence unladylike",
		"Nigeria",
		"Odd",
		"Dvorak",
		"La rapide surprise",
		"Starting buds",
		"Just cut and paste",
		"Order is all"
	],CurLevelTitle())&&In([" ","Space","space"],key));
}

function ForbidEnterActions(key){
	return (!In([
		//"La rapide surprise"
		//"Starting buds"
	],CurLevelTitle())&&In(["Enter"],key));
}

function ForbidArrowActions(key){
	return (!In([
		"Wasd",
		"La rapide surprise",
		"Starting buds",
	],CurLevelTitle())&&In(ArrowKeys,key));
}

var ArrowKeys=Directions.map(StringSymbol);

function AllowExtraUndoKey(key){
	return CurLevelTitle()==="Wasd"&&key==="Z";
}
function AllowExtraRestartKey(key){
	return CurLevelTitle()==="Wasd"&&key==="R";
}

function LevelWinSound(){
	var title=CurLevelTitle();
	var customsounds={
		"Deaf":function(){/*PlayChord("FACFACEGAC",true,3)*/}
	}
	if(In(customsounds,title))
		return customsounds[title];
	else
		return false;
}

function PlayWinSound(){
	var Sound=LevelWinSound();
	if(Sound)
		Sound();
}

///////////////////////////////////////////////////////////////////////////////

function InPart(arrayOrObj,n){
	if(!arrayOrObj)
		return false;
	var m=a=new RegExp("^"+n,"i");
	function F(ao){return ao.some(function(s){return InString(s,m)})};
	return Apply(arrayOrObj,F)||false;
};

///////////////////////////////////////////////////////////////////////////////
//Levels & Actions
function WinnerTitle(title){
	if(title==="Deaf")
		return title;
	else
		return title.toUpperCase();
}

function ObtainLevelDescriptionTitle(lvl){
	var title=LevelTitle(lvl);
	return (title!=="Deaf")?title.toUpperCase():title;
}


function GoalHTML(title){
	function GoalDisplayer(L){return LetterPureHTML(L.toUpperCase())};
	if(In(GoalDisplayers,title))
		GoalDisplayer=GoalDisplayers[title];
	return title.split("").map(GoalDisplayer).join("");
}

var LevelDifficulty={
	"Direct":1,				
	"Reverse":1,
	"Follow":2,
	"Consonant":2,
	"Second":2,
	"Rotate":3,
	//"Oppose":2,
	"Rise":1,
	"Falls":2,
	"Precedent":3,
	"Teleporter":3,
	"Superior":4,
	//"Tangles":3,
	"Difference":5,
	//"Photocopier":???,
	"Symmetries":2,
	"Fillet":3,
	"Topological":4,
	"Loosely less":4,
	"Wasd":2,
	"Nokia 1998":1,
	"Dvorak":4,
	"ひらがな":2,
	"Nigeria":3,
	"Anagram":2,
	"Genetic.":2,
	"Ironclad":2,
	"Deaf":3,
	"⠍⠕⠗⠎⠑":3,
	"Dividi":5,
	"Magnetism":2,
	//"Fuchsia":1,
	"Odd":3,
	"Latent clones":3,
	"Shepherdess hence unladylike":3,
	"Starting buds":5,
	"La rapide surprise":5,
	"Just cut and paste":3,
	"Order is all":4
};


function GoToLevel(title){
	var n=LevelTitleNumber(title)-1;
	GoToScreen(n);
}

function LevelWon(title){
	return LevelSolved(LevelTitleNumber(title));
}

function LevelDifficultyStars(title){
	return ObtainSymbol("asterisk-heavy").repeat(LevelDifficulty[title]||0);
}

var ExternalLevels=[
	"Topological",
	"Nokia 1998",
	"Dvorak",
	"Nigeria",
	"Genetic.",
	"Ironclad",
	"Deaf",
	"⠍⠕⠗⠎⠑",
	"Dividi",
	"Magnetism"
	//"Fuchsia",
]

var SoundLevels=[
	// "Wasd",
	"Deaf",
]

var VisualLevels=[
	"Rotate",
	"Symmetries",
	"Fillet",
	"Topological",
	"Loosely less",
	"Wasd",
	"Nigeria",
	"Dvorak",
]

var LanguageLevels=[
	"ひらがな",
	"Anagram",
	"Latent clones",
	"Shepherdess hence unladylike",
	"Starting buds",
	"La rapide surprise",
]

var MathematicalLevels=[
	"Rise",
	"Falls",
	"Precedent",
	"Superior",
	"Difference"
]

var StructuralLevels=[
	"Superior",
	"La rapide surprise",
	"Just cut and paste",
	"Order is all",
	"Loosely less"
]

function ObtainLevelNotes(lvl){
	var title=LevelTitle(lvl);
	var extras="";
	if(In(SoundLevels,title))
		extras+=" "+ObtainSymbol("music");
	if(In(VisualLevels,title))
		extras+=" "+ObtainSymbol("eye");
	if(In(LanguageLevels,title))
		extras+=" "+ObtainSymbol("book");
	if(In(ExternalLevels,title))
		extras+=" "+ObtainSymbol("magnifying-glass");
	if(In(MathematicalLevels,title))
		extras+=" "+ObtainSymbol("math");
	if(In(StructuralLevels,title))
		extras+=" "+ObtainSymbol("structure");

	return 	LevelDifficultyStars(title)+extras;
}


function LevelNumberNotes(n){
	return String(n)+" "+(LevelSolved(n)?LevelHintStar(n):"");
}

var LevelGoals=[			//Required types of thinking:
	//Positional (caret position), Spacial (position of letters in 2D system), Alphabetical (letters are ordered, and may correspond to numbers), Syllabe (syllabes as unit of input), Word (full words as units of input), Adjacent, Cyclic, Mapping (cyphers), Language, Knowledge, Cultural, Retroactive, Proactive,
	"Direct",				

	"Reverse",				//Positional,
	"Follow",				//Positional, Monoactive
	"Consonant",			//Positional, Language
	"Second",				//Retroactive, Subtractive
	"Rotate",				//Positional, Spacial, Retroactive

	//"Oppose",				//Alphabetical
	"Rise",					//Alphabetical 
	"Falls",				//Alphabetical, Arithmethic, Retroactive
	"Precedent",			//Alphabetical, Retroactive
	
	"Symmetries",			//Shape, Retroactive
	"Fillet",				//Shape, Proactive 
	"Topological",			//Shape, Growth, Monoactive
	
	"Nokia 1998",			//Keyboard
	"Wasd",					//Keyboard, Emulation
	"Dvorak",				//Keyboard, Cyclic

	"ひらがな",				//Keyboard, Syllabe, Language, Encoding

	"Nigeria",				//Word, Mapping, Geography
	
	"Magnetism",			//Positional, Retroactive, Science
	"Genetic.",				//Encoding, Word, Science
	"Anagram",				//Word, Mapping, Language, Once,
	"Ironclad",				//Encoding, Word, Science
	//"Fuchsia",			//Encoding
	"Deaf",					//Encoding, Music
	"⠍⠕⠗⠎⠑",			  //Encoding, Once
	"Dividi",				//Encoding, Arithmethic, Retroactive

	"Odd",								//Keyword, Positional, Retroactive, Subtractive
	"Latent clones",					//Keyword, Increment, Retroactive, Language
	"Shepherdess hence unladylike",		//Keyword, Swap, Retroactive, Language
	"Starting buds",					//Language
	"La rapide surprise",				//Keyword, Swap, Retroactive, Language
	"Just cut and paste",				//Keyword, Proactive, Redefinition
	"Order is all",						//Keyword, Proactive, Increment, Redefinition

	"Teleporter",				//Positional, Retroactive
	"Superior",				//Positional, Alphabetical, Retroactive
	//"Tangles",			//Alphabetical, Cyclic, Arithmethic, Proactive
	"Difference",			//Positional, Alphabetical, Arithmethic, Proactive, Retroactive
	//"Photocopier",		//Positional, Alphabetical, Arithmethic, Proactive, Retroactive
	"Loosely less",			//Keyboard, Shape, Proactive
];

function RestrictPlayableLevels(){
	var restricted=PageSearch("levels");
	if(restricted){
		LevelGoals=LevelGoals.filter(g=>In(restricted,g));
		gameTitle="Puzzle Type Demo";
		return true;
	}
	else
		return false;
}

RestrictPlayableLevels();

var LevelGoalAliases={
	"Vowel":"Consonant",
	"Homeomorphic":"Topological",
	"Loosely less":"Calculator",
	"Loosely less":"Cooked books",
	"Loosely less":"Time to cook",
	"Loosely less":"Timed cooldown",
	"Loosely less":"Less cool",
	"White":"Fuchsia",
	"Nucleus":"Ironclad",
	"Tennessine":"Ironclad",
	"Carbonate":"Ironclad",
	"Weightier":"Latent Clones",
	"German Shepherd":"Shepherdess hence unladylike",
	"Cherished Woman":"Shepherdess hence unladylike",
	"Baba is you":"Order is all",
	"Copypaste":"Just cut and paste",
	"Finest vernissage":"La rapide surprise",
	"Mon petit ami":"La rapide surprise",
	"Starting anew":"Starting buds",
	"String completing":"Starting buds",
	"Starting strings":"Starting buds"
}

function ObtainCanonicalTitle(title){
	if(In(LevelGoalAliases,title)&&!In(LevelGoals,title))
		return LevelGoalAliases[title];
	else
		return title;
}

function ObtainLevelReader(level){
	if(typeof level==="string"){
		var title=ObtainCanonicalTitle(level);
		return LevelGoals.indexOf(title)+1;
	}else
		return level;
}

function ObtainLevelsWriter(solvedlevels){
	return solvedlevels.map(LevelTitle).filter(Identity);
}

var LevelInstructions={
	"Direct":Direct,
	"Reverse":function(L){
		InputLetterBefore(L);
		AddStrokeValid(L);
	},
	// "Oppose":function(A){
	// 	var Z=NumberLetter(25-LetterNumber(A)); 
	// 	InputLetterAfter(Z);		
	// },
	"Rise":function(L){
		var M=NumberLetter(Min(LetterNumber(L)+1,25)); 
		InputLetterAfter(M);
		AddStrokeValid(L);
	},
	"Second":Second,

	"Follow":function (L){
		if(Letters.array.length>=1){
			var last=Last(Letters.array);
			DeleteLetterAfter();
			InputLetterAfter(L);
			InputLetterAfter(last);
			AddStrokeValid(L);
		}
		else{
			InputLetterAfter(L);
			AddStrokeUnderline(L);
		}
		
		
	},
	"Consonant":Consonant,
	"Falls":function (L){
		function LetterDown(Z){
			return NumberLetter(Max(LetterNumber(Z)-1,0));
		}
		Letters(Letters.array.map(LetterDown));
		InputLetterAfter(L);
		AddStrokeValid(L);
	},
	"Teleporter":function (L){
		var pre=Caret()[0];
		
		var word=Clone(Letters.array);
		var l=word.length;

		Letter(pre,L);
		
		var i=1;
		var moved=false;
		while(!moved&&i<=l){
			if(word[(i+pre)%l]===L&&(i+pre)%l!==pre){
				Caret((i+pre+1)%l);
				moved=true;
				AddStrokeUnderline(L);
			}
			i++;
		}
		if(!moved){
			Caret(pre+1);
			AddStrokeValid(L);
		}
	},
	"Superior":function (L){
		var pre=Caret()[0];
		Letter(pre,L);
		var min=Infinity;
		var pos=pre+1;
		for(var i=0;i<Letters.array.length;i++){
			if(LetterNumber(Letters.array[i])>LetterNumber(L)&&LetterNumber(Letters.array[i])<min){
				min=LetterNumber(Letters.array[i]);
				pos=i;
			}
		}
		Caret(pos);
		AddStrokeValid(L);
	},
/*	"Photocopier":function (L){
		var pre=Caret();
		var pos=[];
		for(var i=Letters.array.length-1;i>=0;i--){
				pos.push(i+1);
			if(lengthLetters.array[i]===L)
				pos.push(i+1);
		}
		pre.map(function(p){Letter(p,L)});

		pos=Union(pos,[Infinity]);
		Caret(pos);
		
	},*/
	"Difference":Difference,
	"Nokia 1998":Nokia,
	"Rotate":function (L){
		InputLetterAfter(L);
		if(Letters.array.length%2===0)
			Letters(FlipArray(Letters.array));
		AddStrokeValid(L);
	},
	"Precedent":function (L){
		function ConditionF(K){return LetterNumber(K)===LetterNumber(L)-1;};
		function ChangeF(K){return L;};
		var m=ModifyLetters(ChangeF,ConditionF);
		if(!m){
			InputLetterAfter(L);
			AddStrokeValid(L);
		}
		else
			AddStrokeUnderline(L);
	},
	"Symmetries":Symmetries,
	"Fillet":Fillet,
	"Topological":Topological,
	"Loosely less":Loosely,
	"Dvorak":function (L){
		AddStrokeValid(L);
		var n=Letters.array.map(function(M){return DvorakMapping["row_"+M]});
			n=Count(n,DvorakMapping["row_"+L]);
		var L=L;
		for(var i=1;i<=n;i++)
			if(In(DvorakMapping,L))
				L=DvorakMapping[L];
		InputLetterAfter(L);
	},
	/*"Tangles":function (L){
		if(Letters.array.length==="Tangles".length){
			Restart();
			return;
		}
		
		if(Letters.array.length<1){
			InputLetterAfter(L);
		}
		else{
			var A=PureLetter(Last(Letters.array));
			DeleteLetterAfter();
			InputLetterAfter(NumberLetter(LetterNumber(L)+LetterNumber(A)+1));
		}
		
		if(Letters.array.length==="Tangles".length-1)
			InputLetterAfter(L);
		else
			InputLetterAfter(L+"*");
		
	},*/
	"Dividi":Dividi,
	"Magnetism":Magnetism,
	"Order is all":Baba,
	"Just cut and paste":Copypaste,
	"Odd":function(L){
		InputLetterAfter(L);
		var odd=In(Word(),"ODD");
		var even=In(Word(),"EVEN");
		var offset=odd?1:0;
		if(odd||even){
			var LA=[];
			for(var i=offset;i<Letters.array.length;i=i+2){
				LA.push(Letters.array[i]);
			}
			Letters(LA);
		}
		Caret(Infinity);
		AddStrokeValid(L);
	},
	"Shepherdess hence unladylike":function(L){
		InputLetterAfter(L);
		AddStrokeValid(L);
		Letters(StringReplaceOnceRuleArray(Word(),GenderReplacementRules));
		Caret(Infinity);		
	},
	"Latent clones":Weightier,
	"Starting buds":StartingBuds,
	"La rapide surprise":Translate,
	"Nigeria":Nigeria,
	"ひらがな":function(L){
		InputLetterAfter(L);
		AddStrokeValid(L);
		Letters(StringReplaceRulesObject(Word().toLowerCase(),Hiragana).toUpperCase());
		Caret(Infinity);
	},
	"⠍⠕⠗⠎⠑":Morse,
	//"Fuchsia":Fuchsia,
	"Deaf":Deaf,
	"Anagram":Anagram,
	"Ironclad":Ironclad,
	"Genetic.":Genetic,
	"Wasd":Wasd
}

function Wasd(L){
	if(!In("WASD",L)&&!In(ArrowKeys,L)){
		ForbidCaret();
		AddStrokeInvalid(L);
		return;
	}

	var level=Memo();
	
	if(L==="W"||L===StringSymbol("up"))
		level=EmulateUp(level);
	if(L==="A"||L===StringSymbol("left"))
		level=EmulateLeft(level);
	if(L==="S"||L===StringSymbol("down"))
		level=EmulateDown(level);
	if(L==="D"||L===StringSymbol("right"))
		level=EmulateRight(level);

	Memo(level);
	
	var line=EmulateLine(level);
		line=line.replace(/\./g," ");

	if(Word()===line){
		Throttle(BumpSound,250);
		AddStrokeInvalid(L);
		ForbidCaret();
	}
	else
		AddStrokeValid(L);

	Letters(line);
	Caret(line.indexOf("W"));
}

function BumpSound(){
	if(PlayBump);
		PlayBump();
}

function EmulatePushRight(levelline){
	return levelline.replace(/(W[ASD]*)\.(\.*)/g,".$1$2");//All sokobaning happens here
}
function EmulateRight(levelstring){
	return EmulatePushRight(levelstring);	
}
function EmulateLeft(levelstring){
	return Invert(EmulatePushRight(Invert(levelstring)));	
}
function EmulateDown(levelstring){
	return EmulateVertical(levelstring,true);
}
function EmulateUp(levelstring){
	return EmulateVertical(levelstring,false);
}
function EmulateVertical(levelstring,down){
	var down=!!down;
	var levelstring=RotateString(levelstring,down);
	levelstring=EmulatePushRight(levelstring);
	levelstring=RotateString(levelstring,!down);
	return levelstring;
}
function EmulateLine(levelstring){
	var lines=levelstring.split("\n");
	return lines.filter(function(line){return In(line,"W")})[0];//Returns the line where the player is
}


function Difference(L){

	var last=Memo();

	if(!last){
		InputLetterAfter(L);
		AddStrokeValid(L);
		last=L;
		Memo(last);
		Caret(0);
		return;
	}

	var pre=Caret()[0];
	Letter(pre,L);
	AddStrokeValid(L);
	
	var pos=Max(pre,0)+LetterNumber(L)-LetterNumber(last);
	pos=Max(Min(pos,Letters.array.length),-1);
	last=L;
	Memo(last);
	Caret(pos);
	DrawLetters();
}

function Nokia(N){
		if(!NokiaMapping[N]){
			AddStrokeInvalid(N);
			ForbidCaret();
			return;
		}

		function NokiaInput(L){
			InputLetterAfter(L);
			Caret("Last");	
		}

		var delta=2000;

		if(!Letters.array.length||Caret()[0]===Letters.array.length){ //Start or advance
			var L=NokiaMapping[N][0];
			NokiaInput(L);
			AddStrokeValid(N);
		}
		else{
			var last=Last(Letters.array);
			var lastN=NokiaGroupNumber(last);
			var lastGroup=NokiaMapping[lastN];
			var lastPos=lastGroup.indexOf(last);
			if(N!==lastN||lastPos>=lastGroup.length-1){ //New Key or timing exceeded
				var L=NokiaMapping[N][0];
				NokiaInput(L);
				AddStrokeSeparator();
				AddStrokeValid(N);				
			}
			else {//Modify
				DeleteLetterAfter();
				var M=lastGroup[lastPos+1];
				if(lastPos+1<lastGroup.length-1){
					NokiaInput(M);
					AddStrokeValid(N);
					delta=500+1500*(lastGroup.length-1-lastPos)/lastGroup.length
				}
				else{
					InputLetterAfter(M);
					AddStrokeValid(N);
					AddStrokeSeparator();
					Caret(Infinity);
				}
			}
		}
	
		NokiaTimer.blocked=false;
		NokiaTimer(delta);
}

function NokiaTimer(delta){

	if(!NokiaTimer.timeouts)
		NokiaTimer.timeouts=[];

	NokiaTimer.timeouts.push(Memo());
	NokiaTimer.timeouts.map(clearTimeout);

	function Redraw(){
		if(!NokiaTimer.blocked&&!CurLevelWon()){
			AddStrokeSeparator();
			Caret(Infinity);
			DrawLevel();
		}
	}
	var newtimeout=setTimeout(Redraw,delta);
	Memo(newtimeout);
}

function Nigeria(L){
		var freeze=Memo();
		
		if(freeze){
			Memo(false);
			Letters([]);
			Caret(0);
			AddStrokeSeparator();
			return;
		}
		
		InputLetterAfter(L+"*");
		AddStrokeValid(L);
		
		function UnSpace(string){
			return string.replace(/\s*/g,"").replace(/^THE/,"").replace(/^REPUBLICOF/,"").replace(/^KINGDOMOF/,"").replace(/^THE/,"");
		}

		var AREA=UnSpace(TemporaryWord());
		
		var c=Capitals.map(UnSpace).indexOf(AREA);
		var i=Countries.map(UnSpace).indexOf(AREA);

		var city=(c>=0)&&!(i>=0);// Is it a city and not a country?
	
		if(i>=0||c>=0){
			if(city)
				var NEXTAREA=Capitals[Min(Max(c+1,0),Capitals.length-1)];
			else
				var NEXTAREA=Countries[Min(Max(i+1,0),Countries.length-1)];
				
			Letters(NEXTAREA);
			Memo(true);
		}
		
		Caret(Infinity);
	}

function Anagram(L){
	var used=Memo();
	var saved=SavedLetters();
	var anagr=TemporaryWord().toLowerCase();

	if(!In("ANAGRAM".split(""),L)){
		ForbidCaret();
		AddStrokeInvalid(L);
	}
	else if(anagr.length===3){
		anagr=anagr+L.toLowerCase();
		if(In(Anagrams,anagr)&&!In(used,anagr)){
			var S=Anagrams[anagr].toUpperCase();
			used.push(anagr);
			Memo(used);

			Letters(saved);
			InputLetterAfter(S);
			
			AddStrokeValid(L);
			ModifyLastStroke(UnderlineValidStroke);
		}
		else{
			Letters(saved);
			AddStrokeValid(L);
			ModifyLastStroke(InvalidateStroke);
		}
		AddStrokeSeparator();
	}	
	else{
		InputLetterAfter(L+"*");
		AddStrokeValid(L);
	}
	Caret(Infinity);
}

function Ironclad(L){
	InputLetterAfter(L+"*");
	AddStrokeValid(L);
	
	var saved=SavedLetters();
	var nulow=TemporaryWord().toLowerCase();

	if(In(Nuclei,nulow)){
		var elem=Nuclei[nulow].toUpperCase();
		Letters(saved.join("")+elem);
		AddStrokeSeparator();
	}

	Caret(Infinity);
}

function Genetic(L){
	
	if(!In("ACGUT",L)){
		ForbidCaret();
		AddStrokeInvalid(L);
		return;
	}

	AddStrokeValid(L);
	var L=L.replace("T","U");

	var saved=SavedLetters();
	var codon=TemporaryWord();
		codon=codon+L;
	
	if(codon.length<3){
		InputLetterAfter(L+"*");
	}
	else {
		Letters(saved);
		if(In(RNACodonsAminoacids,codon)){
			InputLetterAfter(RNACodonsAminoacids[codon]);
			ModifyLastStroke(UnderlineValidStroke);
			AddStrokeSeparator();
		}
	}
	
	Caret(Infinity);
}


//var Hexadecimal=["A","B","C","D","E","F"].concat(NumberCharacters);

// function Fuchsia(L){
// 	var colour=Memo().colour;
// 	var used=Memo().used;
// 	var freeze=Memo().freeze;


// 	function NewColour(){
// 		ClearLetters();
// 		ForbidCaret();
// 		Memo({
// 			colour:colour,
// 			used:used,
// 			freeze:false
// 		});
// 	}
	
	
// 	if(freeze){
// 		NewColour();
// 		return;
// 	}
	
// 	if(!In(Hexadecimal,L))
// 		L="#";
// 	// else if(In(Hexadecimal,L)&&In(used,L)){
// 	//  	ForbidCaret();
// 	//  	return;
// 	// }
// 	// else {
// 	// 	used=used+L;
// 	// 	Memo({
// 	// 		colour:colour,
// 	// 		used:used,
// 	// 		freeze:freeze
// 	// 	});
// 	// }
	
// 	InputLetterAfter(L+"*");
	
// 	if(Letters.array.length===7){
// 		var letters=PureLetter(Word());
// 		var f=First(letters);
// 		var r=Rest(letters);
// 		if(f!=="#"||r.replace("#","").length!==r.length){
// 			ClearLetters();
// 			ForbidCaret();
// 			return;
// 		}
// 		else{
// 			SkipUndo();
// 			var hex=PureLetter(Word());
// 			console.log(hex,colour,MultiplyHEX(hex,colour));
// 				hex=PlusHEX(hex,RotateHEX(colour));
// 			var colourname=NamedColour(hex);
// 				colourname=ColourApproximationString(hex,colourname);
// 			Letters(colourname.toUpperCase());
// 			Caret(Infinity);
// 			CaretColour(hex);
// 			Memo({
// 				colour:hex,
// 				used:used,
// 				freeze:true
// 			});
// 			return;
// 		}
// 	}
// 	Caret(Infinity);
// }

// function ColourApproximationString(colorstring,name){
// 	var chosen=ColourNames.filter(function(c){return c[3]===name})[0];
// 	var rgb=RGB(Colour(colorstring)).colour;
// 	if(!Equal(rgb,Most(chosen)))
// 		return "almost "+name+" ("+colorstring+")";
// 	else
// 		return name;
// }


function Deaf(L){

	var savednotes=SavedLetters();
	var tempnotes=TemporaryLetters();

	function AddSharp(){
		if(Last(tempnotes)!=="#*"&&tempnotes.length>0){
			PlayNote(Last(tempnotes).replace("*","#"));
			InputLetterAfter("#*");
			AddStrokeValid(L);
			
		}else{
			ForbidCaret();
			AddStrokeInvalid(L);
		}
	}

	function NotesLength(){
		return tempnotes.length-Count(tempnotes,"#*");
	}

	if(!In("ABCDEFG",L))
		AddSharp();
	else if(NotesLength()<3){
		InputLetterAfter(L+"*");
		AddStrokeValid(L);
		PlayNote(L);
	}
		
	var tempnotes=TemporaryLetters();
	var chord=tempnotes.map(PureLetter).join("");
		chord=FixedPoint(IncrementNote,chord);

	if(NotesLength()===3){
		Letters(savednotes);
		// if(Prefixed(chord,"#")){
		// 	AddStrokeSeparator();
		// 	return;
		// }

		PlayChord(chord,false,0.5);
		if(In(MajorChords,chord)){
			InputLetterAfter(MajorChords[chord]);
			ModifyLastStroke(UnderlineValidStroke);
		}
		else if(In(MinorChords,chord)){
			InputLetterAfter(MinorChords[chord].toLowerCase());
		}
		else
			ModifyLastStroke(InvalidateStroke);
		
		AddStrokeSeparator();
	}

	Caret(Infinity);
}


function Direct(L){
	InputLetterAfter(L);
	AddStrokeValid(L);
};

function Second(L){
	var nd=Memo();
	Memo(!nd);
	
	if(nd)
		DeleteLetterBefore();
	
	InputLetterAfter(L);
	AddStrokeValid(L);
	
	var l=Keystrokes.array.length;
	Keystrokes.array=Keystrokes.array.map((k,i)=>((i+1)<=(l/2))?Posfix(k,"-"):k)
}

function Consonant(L){
	if(L==="Y"){//semi-vowel
		ForbidCaret();
		AddStrokeInvalid(L);
		return;
	}

	var before=Memo();
	if(!before)
		InputLetterBefore(L);
	else
		InputLetterAfter(L)
	
	before=!In(["A","E","I","O","U"],L);
	Memo(before);

	if(!before){
		Caret(-1);
		AddStrokeValid(L);
	}
	else{
		Caret(Letters().length);
		AddStrokeUnderline(L);
	}
}

function FlipArray(array){
	var a=[];
	var j;
	for (var i=0;i<array.length;i++){
		if(i<array.length/2)
			j=i+Floor(array.length/2);
		else
			j=i-Ceiling(array.length/2);
		
		a.push(array[j]);
	}
	return a;
}

//Morse
function Morse(L){
	var s="⠍⠕⠗⠎⠑".length*2;
	var used=Memo();
	
	var position=used.map(function(d){return MorseCode[d.toLowerCase()].length});
	position=[0].concat(position).reduce(Accumulate);


	if(In(used,L)){
		ForbidCaret();
		AddStrokeInvalid(L);
		return;
	}

	AddStrokeValid(L);
	
	used.push(L);
	Memo(used);

	var dotdash=MorseCode[L.toLowerCase()].split("");

	// if(PlayMorse)
	// 	PlayMorse(dotdash);
	
	var p,n,l,even, pa;
	for(var i=0;i<dotdash.length;i++){		
		p=position+i;							//start horizontal position with caret
		l=Floor(p/s);								//line number (0, 1 or 2)
		even=(p+1)%2;						
		pa=Floor((p%s)/2);							//caret horizontal position
		n=(pa<Letters.array.length)?BrailleNumber(Letters.array[pa]):0; //prior information
		n=Min(n+(dotdash[i]==="."?1:0)*Power(2,l+3*(1-even)),63);	//dot=1, dash=0
		Letters.array[pa]=Braille(n);
	}

	if(p>3*s){//Restart
		Restart();
		return;
	}
	else
		Caret(Floor(((p+1)%s)/2));

}

function Braille(n){
	return BrailleSorted[n];
}
function BrailleNumber(braille){
	return BrailleSorted.indexOf(braille.toLowerCase());
}

//Magnetism

function Magnetism(L){
	if(In("NS",L)){
		if(In(Word(),L)){
			AddStrokeInvalid(L);
			ForbidCaret();
			return;
		}
		InputLetterAfter(L);
		AddStrokeUnderline(L);
	}
	else{
		InputLetterAfter(L);
		AddStrokeValid(L);
	}

	letters=Letters();

	var north=letters.indexOf("N");
	var south=letters.indexOf("S");

	if(north<0||south<0)
		return;

	var midpoint=(north+south)/2;
	if(Abs(south-midpoint)>1){
		if(north>south){
			letters[north]=letters[north-1];
			letters[north-1]="N";
			letters[south]=letters[south+1];
			letters[south+1]="S";
		}
		else{
			letters[north]=letters[north+1];
			letters[north+1]="N";
			letters[south]=letters[south-1];
			letters[south-1]="S";
		}
	}

		
	
}

//Dividi

function Dividi(L){
	if(!In(uniNumerals,L)){
		ForbidCaret();
		AddStrokeInvalid(L);
		return;
	}

	word=Word();
	last=LastValidRoman(word);
		
	if(!ValidRoman(last+L)){
		DeleteLetterAfter(last.length);
		var q=Quotient(UnRoman(last),2);
		Letters(Word()+Roman(q));
		AddStrokeSeparator();
		AddStrokeUnderline(L);
	}
	else
		AddStrokeValid(L);

		
	InputLetterAfter(L);
}
	
//Copypaste

function Copypaste(L){
	InputLetterAfter(L);
	AddStrokeValid(L);

	var word=Letters().join("");
	
	if(Posfixed(word,"COPY")){
		word=UnPosfix(word,"COPY");
		Memo(word);
		Letters(word);
	}else if(Posfixed(word,"PASTE")){
		word=UnPosfix(word,"PASTE");
		word=word+Memo();
		Letters(word);
	}else if(Posfixed(word,"CUT")){
		word=UnPosfix(word,"CUT");
		Memo(word);
		Letters([]);
	}
	Caret(Infinity);
}

//Copypaste

function Baba(L){
	var rules=Memo();

	InputLetterAfter(L);
	AddStrokeValid(L);

	var word=Letters().join("");
	var pattern=/\s*([^\s]+)\s+IS\s+([^\s]+)\s*/;
	if(pattern.test(word)){
		var subject=word.replace(pattern,"$1");
		var object=word.replace(pattern,"$2");
		rules.push([subject,object]);
		word=word.replace(pattern,"");
		AddStrokeSeparator();
		Letters(word);
	}
	
	for (var i=0;i<rules.length;i++){
		word=StringReplace(word,[rules[i][0],"#"]);
		word=StringReplace(word,["#",rules[i][1]]);
	}

	Memo(rules);
	Letters(word);
	Caret(Infinity);
}

//Weightier

function Weightier(L){
	
	InputLetterAfter(L);
	AddStrokeValid(L);
	Letters(InflateNumbers(Word().toLowerCase()).toUpperCase());
	Caret(Infinity);
	return;
}

function ArrowDisplay(word,type){
	var left=(!type||type==="left")?StringSymbol("left"):"";
	var right=(!type||type==="right")?StringSymbol("right"):"";
	// var left=StringSymbol("left");
	// var right=StringSymbol("right");
	return left+word+right;
}

function ArrowDisplayDirection(p,l){
	var dir=false;
	if(p>0&&p===l)
		dir="left";
	if(p===0&&p<l)
		dir="right";
	return dir;
}

function Translate(L){
	var insertions=Memo();
	var choosing=insertions.choosing;
	var word=Word();

	if(!choosing){
		insertions=WordTranslations(L,Word());
		if(In(LetterSpaceCharacters,L))
			AddStrokeValid(L)
	}
	else{
		if(In(LetterSpaceCharacters,L))
			insertions=WordTranslations(L,Word());
		insertions=CyclePossibilities(L,insertions);

		if(insertions.block){
			ForbidCaret();
			AddStrokeInvalid(L);
			return;
		}

		AddStrokeValid(L)
	}
	

	var possibilities=insertions.possibilities;
		choosing=possibilities.length>1;
	var p=insertions.p;
	var prefix=insertions.prefix;
	var suffix=insertions.suffix;

	

	if(possibilities.length){
		suffix=possibilities[p];
	}	
	
	insertions.choosing=choosing;
	Memo(insertions);

	if(possibilities.length>1){
		suffix=ArrowDisplay(suffix,ArrowDisplayDirection(p,possibilities.length-1));
	}

	word=prefix+suffix;
	Letters(word.toUpperCase());
	
	if(choosing)
		Caret(Range(prefix.length,word.length-1));
	else
		Caret(Infinity)
}



function WordTranslations(L,sentence){
	if(In(NumberCharacters,L)||In(ArrowKeys,L))//||L==="Enter"
		return;

	var L=L.toLowerCase();
	var sentence=sentence.toLowerCase()+L;

	var i=0;
	var found=false;
	var suffix=sentence;
	var prefix="";

	while(!found&&i<sentence.length){
		suffix=sentence.slice(i,Infinity);
		prefix=sentence.slice(0,i);
		var possibilities=Translator(suffix);
		
		//Place the identical word forward
		if(In(possibilities,suffix)){
			possibilities=possibilities.filter(x=>x!==suffix);
			possibilities=[suffix].concat(possibilities);
		}
		// closest to the goal
		var goal=CurLevelTitle().toLowerCase();
		possibilities=possibilities.filter(i=>Prefixed(goal,prefix+i)).concat(possibilities.filter(i=>!Prefixed(goal,prefix+i)))
		
		found=(IsArray(possibilities)&&possibilities.length>0);
		i++;
	}
		
	return {
			possibilities:possibilities,
			prefix:prefix,
			suffix:suffix,
			p:0,
			choosing:possibilities.length>1,
			animate:true
	}
}


function Translator(en){
	if(!NamesEnFr||!AdjectivesEnFr||!AdverbsExtrasEnFr)
		return ["LEVEL DATA STILL LOADING, PLEASE WAIT..."];
	var en=en.toLowerCase();
	var translations=[].concat(NamesEnFr[en]||[])
						.concat(AdjectivesEnFr[en]||[])
						.concat(VerbsEnFr[en]||[])
						.concat(InterjEnFr[en]||[])
						.concat(AdverbsExtrasEnFr[en]||[]);
						
	return Unique(translations);
}

FollowDBLinks=function(en,tries,DB){
	var en=UnPrefix(en,"*");

	if(!tries||!In(Keys(DB),en))
		return [];

	var fr=DB[en];

	fr=fr.map(function(x){
		if(Prefixed(x,"*")){
			return FollowDBLinks(x,tries-1,DB);
		}
		else
			return [x];
	});
	fr=fr.reduce((x,y)=>(x.concat(y)));
	fr=fr.filter(x=>!Prefixed(x,"*"));
	
	return Unique(fr);
}

function CleanDB(NewDB,DB){
	var enList=Keys(DB);
	var l=enList.length;
	var frList;
	for(var i=0;i<l;i++){
		frList=FollowDBLinks(enList[i],5,DB);
		frList=frList.map(f=>f.toLowerCase()).flat();
		frList=frList.map(x=>UnPrefix(x," "));
		if(i%1000===0)
			console.log(PercentageText(i/l,2),":",enList[i],frList);
		if(frList.length)
			NewDB[enList[i].toLowerCase()]=Unique(frList);
	}
}


//
function StartingBuds(L){
	var memo=Memo();
	var word=Word();

	if(!memo.choosing)
		var insertions=LetterInsertions(L,word);
	else{
		if(In(LetterSpaceCharacters,L))
			var insertions=LetterInsertions(L,word);
		else
			var insertions=Memo();

		var insertions=CyclePossibilities(L,insertions);
	}

	
	if(!insertions||insertions.block){
		AddStrokeInvalid(L);
		ForbidCaret();
		return;
	}

	var possibilities=insertions.possibilities;
	var p=insertions.p;
	var choosing=insertions.choosing;
	word=possibilities[p];

	if(possibilities.length===0){
		ForbidCaret();
		AddStrokeInvalid(L);
		insertions=Memo();
		Memo(insertions);
		return;
	}

	AddStrokeValid(L);

	Memo(insertions);
	
	if(possibilities.length>1&&choosing===true)
		word=ArrowDisplay(word,ArrowDisplayDirection(p,possibilities.length-1));
		
	Letters(word.toUpperCase());
	Caret("Full");
}



function CyclePossibilities(L,insertions){

	var possibilities=insertions.possibilities;
	var	p=insertions.p;

	if(!In(LetterSpaceCharacters,L)){
		if(In(NumberCharacters,L))
			p=Number(L);
		else if(In(["left","up"].map(StringSymbol),L))
			p=(p-1);
		else if(In(["right","down"].map(StringSymbol),L))
			p=(p+1);
	
		p=Max(Min(p,possibilities.length-1),0);

		if(insertions.choosing){
			SkipUndo();
		}

		if(insertions.p===p) //unchanged menas wrong input
			insertions.block=true;
		
		insertions.p=p;
	}

	return insertions;
}

function LetterInsertions(L,word){		
	if(In(NumberCharacters,L)||In(ArrowKeys,L))//||L==="Enter"
		return;

	var L=L.toLowerCase();
	var sentence=word.toLowerCase();

	function ValidWord(word){
		return In(EnDictionary(),word)
	};

	var possibilities=[];
	var positions=[];
	var inserted;
	for(var i=0;i<=sentence.length;i++){
		inserted=Insert(sentence,L,i);
		if(inserted.split(" ").map(ValidWord).every(Identity)&&!In(possibilities,inserted)){
			possibilities.push(inserted);
			positions.push(i);
		}
	}
	
	return {
		possibilities:possibilities,
		positions:positions,
		p:0,
		choosing:possibilities.length>1,
		animate:true
	}
}

function EnDictionary(){
	if(!EnDictionary.list){
		EnDictionary.list=Plurals.concat(Superlatives).concat(Keys(NamesEnFr)).concat(Keys(AdjectivesEnFr)).concat(Keys(VerbsEnFr)).concat(Keys(InterjEnFr)).concat(Keys(AdverbsExtrasEnFr));
		EnDictionary.list=EnDictionary.list.concat([
			"starring",
			"si",
			"anti",
			"sate","sated","sating",
			"wares","thane","thana",
			"bing",
			"gratin","gratins",
			"git","gits",
			"rin","rins",
			"artsy"
			//"tinging",//ingling	"tining",
			// "ar",
			// "irs",
			// "ing","ings","si","ting","tings","rin","rins","ping","pings","oping","pring","pling","plings","piling","pilings","til","tint","tints","comping","compting"
		]);
		var exclusions=["ins","ger"]
		EnDictionary.list=EnDictionary.list.filter(w=>!In(exclusions,w))
	}
	return EnDictionary.list;
}



//Fillet

function Fillet(L){
	AddStrokeValid(L);
	var p=Memo();

	var max="Fillet".length;
	var pnext=(p+1)%max;

	Letters.array[p]=FilletHalves[L][0]+(Letters.array[p]?SplitHalves(Letters.array[p])[1]:"_");
	Letters.array[pnext]=(Letters.array[pnext]?SplitHalves(Letters.array[pnext])[0]:"_")+FilletHalves[L][1];

	Letters.array=Letters.array.map(CombineHalves);

	Memo(pnext);
	Caret(pnext);
}

function CombineHalves(AB){
	if(AB.length===1)
		return AB;
	
	var A=AB[0];
	var B=AB[1];
	if(!FilletHalves[A]||!FilletHalves[B])
		return AB;

	var halves=FilletHalves[A][0]+FilletHalves[B][1];
	if(In(FilletWholes,halves))
		return FilletWholes[halves];

	return AB;
}

function SplitHalves(E){
	if(E.length===1)
		return FilletHalves[E];
	else
		return E
}

FilletHalves={
	"_":"__",
	"A":"AA",
	"B":"PD",
	"C":"CO",
	"D":"DD",
	"E":"EE",
	"F":"EI",
	"G":"CG",
	"H":"HH",
	"I":"II",
	"J":"IO",
	"K":"KK",
	"L":"IE",
	"M":"MM",
	"N":"NN",
	"O":"OO",
	"Q":"OQ",
	"P":"PI",
	"R":"PK",
	"S":"SS",
	"T":"TI",
	"U":"UO",
	"V":"VV",
	"W":"WW",
	"X":"YX",
	"Y":"YI",
	"Z":"ZZ",
	"0":"08",
	"1":"1I",
	"2":"2Z",
	"3":"33",
	"4":"44",
	"5":"E3",
	"6":"68",
	"7":"Z7",
	"8":"88",
	"9":"93"
}

var FilletWholes=FlipKeysValues(FilletHalves);


//Symmetric

function Symmetries(L){
	
	var direction=Memo();

	if(In("SYMMETRIES",L)){
		AddStrokeValid(L);
		if(direction)
			InputLetterAfter(L);
		else
			InputLetterBefore(L);
	}else{
		AddStrokeUnderline(L)
	}

	if(InversionSymmetric(L)){
		ModifyLetters(ToggleInversion);
		Letters.array=Letters.array.reverse();
		direction=!direction;
		Memo(direction);

		if(direction)
			Caret(Infinity);
		else
			Caret(-1);
	}
	if(HorizontalSymmetric(L)){
		ModifyLetters(ToggleHorizontal);
		Letters.array=Letters.array.reverse();
		
		direction=!direction;
		Memo(direction);

		if(direction)
			Caret(Infinity);
		else
			Caret(-1);
	}
	if(VerticalSymmetric(L)){
		ModifyLetters(ToggleVertical);
	}
	
}



function PureLetter(O){
	return O.replace(/\-/g,"").replace(/\|/g,"").replace(/\*/g,"").replace(/\%/g,"");
}

function ToggleVertical(W){
	return NormaliseSymmetry(W+"-");
}

function ToggleHorizontal(W){
	return NormaliseSymmetry(W+"|");
}

function ToggleInversion(W){
	return NormaliseSymmetry(W+"%");
}

function SubNormaliseSymmetry(W){
	return W.replace("-|","%").replace("|-","%").replace("%-","|").replace("%|","-").replace("-%","|").replace("|%","-").replace("||","").replace("--","").replace("%%","");
}

function NormaliseSymmetry(W){
	var W=W;

	//Cancel out repeated symmetries
	W=FixedPoint(SubNormaliseSymmetry,W);
	
	//Apply single symmetries
	if(InversionSymmetric(W)&&(In(W,"%")))
		return PureLetter(W);
		
	if(HorizontalSymmetric(W)&&In(W,"|"))
		return W.replace(/\|/g,"");
		
	if(VerticalSymmetric(W)&&In(W,"-"))
		return W.replace(/\-/g,"");
	
	return W;
}

function HorizontalSymmetric(O){
	return In(["A","H","I","M","O","T","U","V","W","X","Y","0","8"],PureLetter(O));
}

function VerticalSymmetric(O){
	return In(["B","C","D","E","H","I","K","O","X","0","3","8"],PureLetter(O));
}

function InversionSymmetric(O){
	return In(["I","N","O","S","X","Z","0","8"],PureLetter(O));
}

//Topological

function Topological(L){	
	
	if(Letters.array.length===0){
		InputLetterAfter(L);
		AddStrokeValid(L);
	}
	else{
		var classL=HomeomorphicClass(L);
		var letters=Clone(Letters());

		function MorphInferior(i){
			var M=Letter(i);
			var classM=HomeomorphicClass(M);
			if(In(TopologyRequirement[classM],classL)){
				MorphLetter(M,L,"letters",Starter,Ender);
				function Starter(){
					BlockInput();
					BlockUndo();
				}
				function Ender(){
					Letter(i,L);
					UnBlockInput();
					UnBlockUndo();
					if(i===letters.length-1)
						ObtainUpdateLevel();
					CheckWin();
				}
			return true;
			}
			else return false;
		}

		var morphed=false;
		for(var i=0;i<letters.length;i++){
			morphed=MorphInferior(i)||morphed;
		}
		if(!morphed){
			InputLetterAfter(L);
			AddStrokeValid(L);
		}
		else{
			AddStrokeUnderline(L);
		}
	}
	Caret(Infinity);
}



//Nokia 1998

var NokiaMapping={
	"1":["1"],
	"2":["A","B","C","2"],
	"3":["D","E","F","3"],
	"4":["G","H","I","4"],
	"5":["J","K","L","5"],
	"6":["M","N","O","6"],
	"7":["P","Q","R","S","7"],
	"8":["T","U","V","8"],
	"9":["W","X","Y","Z","9"],
	"0":[" ","0"]
}

function NokiaGroupNumber(L){
	return Keys(NokiaMapping).filter(
		function(k){return In(NokiaMapping[k],L)}
	)[0];
}


//Loosely
function LooselyMath(digitstring){
	var n=Max(0,Number(digitstring.split("").reverse().join(""))-1);
	return String(n).split("").reverse().join("");
}

function Loosely(L){
	var word=Word().split("").map(LEDLetterNumber).join("");
		word=word.replace(/\d+/g,LooselyMath);
		word=word+L;
		word=word.split("").map(DictionaryAccesser(LEDNumberLetters)).join("");
	if(In(LEDNumberLetters,L)||In(LEDLetterNumbers,L))
		AddStrokeUnderline(L);
	else
		AddStrokeValid(L);
	Letters(word);
	Caret(Infinity);
}


//Dvorak

var DvorakRows=[
	"1234567890",
	"PYFGCRL",
	"AOEUIDHTNS",
	"QJKXBMWVZ",
	" "
];

function CyclicMapping(rowsArray){
	var mapping={};
	var row;
	for(var i=0;i<rowsArray.length;i++){
		row=rowsArray[i];
		for(var j=0;j<row.length;j++){
			var A=row[j]
			mapping[A]=row[(j+1)%(row.length)];
			mapping["row_"+A]=i;
		}
	}
	return mapping
}

var DvorakMapping=CyclicMapping(DvorakRows);




var Anagrams={
//anna, gaga, gang are excluded because anagram has only 1 n, 1 g, etc...
"agar":"r",
"agma":"a",
//"anna":"a",
//"gaga":"a",
//"gang":"g",
"gram":"m",
"gran":"n",
"maar":"r",
"maga":"a",
"mana":"a",
"mara":"a",
"naga":"a",
"nama":"a",
"raga":"a",
"rang":"g",
//proper names
"nara":"a",
"agra":"a",
"amna":"a",
"rama":"a"
}





///////////////////////////////////////////////////////////////////////////////
//Manage letters and carets

function SavedLetters(){
	return Letters.array.filter(function(n){return !Posfixed(n,"*")});
}
function TemporaryLetters(){
	return Letters.array.filter(function(n){return Posfixed(n,"*")});
}
function TemporaryWord(){
	return TemporaryLetters().map(PureLetter).join("");
}

function Word(){
	var word=Letters.array.join("");
	return word.replace(StringSymbol("left"),"").replace(StringSymbol("right"),"");
}

function Letters(array){
	if(!Letters.array)
		Letters.array=[];
	if(typeof array==="undefined")
		return Letters.array;
	
	if(typeof array==="string")
		return Letters.array=array.split("");
	else
		return Letters.array=Clone(array);
}

function Letter(position,letter){
	Letters();
	
	if(typeof position==="string"||typeof position==="undefined")//default to end
		var position=Letters.array.length+1;
	
	del=false;
	if(!letter){//show or delete letter
		position=Max(0,Min(Letters.array.length-1,position));
		del=true;
	}
	
	if(typeof letter==="undefined") //show
		return Letters.array[position];

	var letter=letter;

	if(del)
		return Letters.array=Delete(Letters.array,position);

	position=Max(-1,Min(Letters.array.length,position));

	if(position===-1)
		Letters.array.unshift(letter);
	else
		Letters.array[position]=letter;

	return letter;
}

function Caret(position){
	var l=Letters().length;
	if(!Caret.array)
		Caret.array=[l]; //after last one

	if(typeof position==="undefined")
		return Caret.array;

	if(position==="Last")
		var position=l-1;
	if(position==="First")
		var position=0;
	if(position==="Full")
		return Caret.array=Range(0,l-1);
	// if(position==="NoArrows")
	// 	return Caret.array=Range(0,l-1).filter(function(l,i){return !In(ArrowKeys,Letters()[i])});

	if(IsArray(position))
		Caret.array=position;
	else{
		var position=Max(-1,Min(position,l));
		Caret.array=[position];	
	}
}

function UnDrawCaret(){
	GetElements(".caret").map(function(c){UnClass(c,"caret")});
	GetElements(".caret-inside").map(function(c){RemoveElement(ParentElement(c))});
}

function DrawCaret(){
	var positions=Caret();
	UnDrawCaret();
	positions.map(DrawSingleCaret);	
}

function DrawSingleCaret(p){
	if(p<0)
		PreAddElement(CaretHTML(),"#letters");
	if(p>=Letters().length)
		AddElement(CaretHTML(),"#letters");
	else
		Class("#letters .letter-"+p,"caret");
}

function LetterPureHTML(L,cla){
	if(cla===undefined)
		var cla="";
	
	cla=' '+cla;
	
	if(L===" ")
		cla=cla+' space';
	else if(L==="_"){
		cla=cla+' invisible';
		var L=" "}
	return "<div class='letter"+cla+"'>"+L+"</div>"
}


var LetterDisplayers={
	//"Tangles":LetterDraftHTML,
	"Symmetries":function(L){
		
		var simclass="";
		if(VerticalSymmetric(L))
			simclass=simclass+" vertical"
		if(HorizontalSymmetric(L))
			simclass=simclass+" horizontal"
		if(InversionSymmetric(L))
			simclass=simclass+" inversion"
		
		//Superimpose Inversion symmetric letters to correct font assymetries
		S=NewNode("<div class='superimpose'><div class='symmetry superimposed"+simclass+"'>"+PureLetter(L)+"</div><div>"+PureLetter(L)+"</div></div>");
		
		if(In(L,"-"))
			Class(S,"vertical");
		
		if(In(L,"|"))
			Class(S,"horizontal");
	
		if(In(L,"%"))
			Class(S,"inversion");
	
	
		if(Classed(S,"vertical")||Classed(S,"horizontal")||Classed(S,"inversion")){
			Class(S,"symmetry");
		}
		
		return LetterPureHTML(S.outerHTML);
		
	},
	"Fillet":function(E){
		var combined=CombineHalves(E);
		//Superimpose two halves
		if(combined.length>1){
			S=NewNode("<div class='superimpose'><div class='superimposed half upper'>"+PureLetter(E[0])+"</div><div class='half lower'>"+PureLetter(E[1])+"</div></div>");
			return LetterPureHTML(S.outerHTML);
		}
		else
			return LetterPureHTML(combined);
	},
	"Ironclad":LetterDraftHTML,
	"Genetic.":LetterDraftHTML,
	"Anagram":LetterDraftHTML,
	// "Fuchsia":LetterDraftHTML,
	"Deaf":LetterDraftHTML,
	"Nigeria":LetterDraftHTML,
	"Topological":BezierLetterSVG,
	"Loosely less":LEDLetterSVG
}

var GoalDisplayers={
	"Topological":BezierLetterSVG,
	"Loosely less":LEDLetterSVG,
	"Deaf":LetterPureHTML
}

function BezierLetterSVG(L){
	return BezierLetter(L.toUpperCase());
}

function LEDLetterSVG(L){
	if(L===" ")
		return LetterPureHTML(" ");
	else
		return LEDLetterSVGHTML(LEDLetters[L.toUpperCase()]);
}

function LetterDraftHTML(L){
	if(In(L,"*"))
		return LetterPureHTML(PureLetter(L),'draft');
	else
		return LetterPureHTML(L);
}

function LetterHTML(title){
	if(TitleScreen()||!In(LetterDisplayers,title))
		return LetterPureHTML;
	else
		return LetterDisplayers[title];
}

function CaretHTML(){
	return "<div class='letter caret'><span class='caret-inside'></span></div>"
}


function ClearLetters(){
	Letters([]);
	Caret(0);
	Keystrokes([]);
	ObtainUpdateLevel();
}

function DrawLetters(){
		
	var letters=Letters();
		letters=letters.map(ObtainSymbol);//Replace any icons
		letters=letters.map(LetterHTML(CurLevelTitle())).join("\n");
	ReplaceChildren(letters,"#letters");
	NumberLetterElements();

	//Transitions, only if different
	if(!Equal(DrawLetters.last,Letters()))
		TransitionLetters(CurLevelTitle());
	
	DrawLetters.last=Letters();	
}

function NumberLetterElements(target){
	var target=target||"#letters .letter";
	GetElements(target).map(function(e,n){
		UnClass(".letter-"+n,".letter-"+n);
	});
	GetElements(target).map(function(e,n){
		Class(e,"letter-"+n);
	});
}


function TransitionLetters(title){
	if(LevelLetterTransitions[title])
		LevelLetterTransitions[title]();
}

LevelLetterTransitions={
	"Starting buds":TransitionExpansion
}

function TransitionExpansion(){
	var memo=Memo();
	if(!memo||!memo.positions||memo.p===undefined||!memo.animate)
		return;
	
	var p=memo.positions[memo.p]+(In(Letters(),StringSymbol("left"))?1:0);

	var letterE=GetElement("#letters .letter-"+p);
	if(letterE){
		var LeHTML=letterE.outerHTML;
		letterE.outerHTML=`<div class="expanding">${LeHTML}</div>`
		Class(letterE,"expanding");
	}
}

function DrawKeystrokes(){
	HighlightableWords(CurLevelTitle());
	var keystrokes="<p> "+(Keystrokes().map(KeystrokeHTML).join(""))+" </p>";
	ReplaceChildren(keystrokes,".keystrokes");
}

function KeystrokeHTML(K){
	var type=StrokeInvalid(K)?"invalid":(StrokeUnderlined(K)?"combo":"valid");
	var K=CleanStroke(K);
		K=ObtainSymbol(K);//replace with icon, if available
	return `<span class="keystroke keystroke-${type}">${K}</span>`;
}

function DrawLevel(){
	DrawLetters();
	DrawCaret();
	DrawKeystrokes();
}


function InputLetterBefore(letter){
	Letter(-1,letter);
	Caret(-1);
}

function InputLetterAfter(letter){
	Letter(Infinity,letter);
	Caret(Infinity);
}

//Letters Delete
function DeleteLetterBefore(){
	Letter(0,false);
	Caret(-1);
}

function DeleteLetterAfter(n){
	if(typeof n==="undefined")
		DeleteLetterAfter(1);
	else{
		for(var i=0;i<n;i++)
			Letter(Infinity,false);
		Caret(Infinity);
	}
}

function DeleteLetters(array){
	var positions=Unique(array).reverse();
		positions=positions.filter(p=>(p===Max(0,Min(Letters().length-1,p))));
		
		positions.map(l=>Letter(l,false));
}

//Letters and Numbers
function LetterNumber(A){
	return (A.charCodeAt()-65)%26;
}
function NumberLetter(n){
	return String.fromCharCode(((n%26)+26)%26+65);
}


function ModifyLetters(ChangeF,ConditionF){
	var ConditionF=ConditionF||(function(){return true});
	var p=0;
	var modified=false;
	while(p<Letters.array.length){
		if(ConditionF(Letters.array[p])){
			modified=true;
			Letters.array[p]=ChangeF(Letters.array[p]);
		}
		p++;
	}
	return modified;
}


///////////////////////////////////////////////////////////////////////////////
//Game execution

function InitialiseGameCanvas(){
	RemoveChildren("gameCanvas");
	AddElement(`<div class='top faded'></div>`,"gameCanvas");
	AddElement(`<div class='middle faded'><div id='letters'></div></div>`,"gameCanvas");
	UnFadeElement(".top",500);
	UnFadeElement(".middle",500);
}


function ObtainTitleScreenReLoader(){
	TitleScreen(true);
	Kinemate(TitleScreenLoaderMacro());
	PlaySound(MediaPath()+"/sound/startgame.mp3");
	GameFocus();
};

function CleanTitleScreen(){
	TitleScreen(true);
	Class(".top","titlescreen");UnClass(".top","levelscreen");
	ClearLetters();
}



function LevelLoader(){
	if(!CurLevelTitle()){ //no loaded levels
		return ObtainTitleScreenReLoader();
	}
	Kinemate(LevelLoadMacro());
	GameFocus();
}

function CleanLevel(){
	TitleScreen(false);
	UnClass(".top","titlescreen");Class(".top","levelscreen");
	ClearLetters();
}


function ObtainUpdateLevel(state){
	
	if(typeof state==="undefined")
		var state={
			letters:Letters(),
			caret:Caret(),
			keystrokes:Keystrokes(),
			memo:Memo()
			// colour:CaretColour()
		}
	
	LevelState(state);
	AddUndo(state);
	DrawLevel();
}

function CurLevelWon(){
	return WinnerTitle(CurLevelTitle())===Word().replace(/\_/g,"");
}

function ObtainWonMoves(){
	return Keystrokes().map(CleanStroke).join("");
}

function CheckWin(){
	var win=CurLevelWon();
	
	if(win){
		MarkWonLevel();
		BestMove(CurLevelTitle(),ObtainWonMoves());

		if(!LevelWinSound()&&!SolvedAllLevels())
			PlaySound(MediaPath()+"/sound/win"+RandomChoice("123")+".mp3");
		else
			PlayWinSound();
		
		Kinemate(LevelWinMacro());
	}
}

function ObtainPlayEndGameSound(){
	PlaySound(MediaPath()+"/sound/wingame.mp3");
}

//Undo / Restart related
function ObtainSetLevelState(state){
	LevelState(state);
	EffectRenderer();
	DrawLevel();
}

function ClearLevel(){
	EmptyUndo();
	LevelState(ObtainStartingLevelState());
}


///////////////////////////////////////////////////////////////////////////////
//Timed Transitions

function TransitionTitleScreenOptions(duration){
	var duration=duration||200;
	if(ObtainNewGameCondition())
		Letters("START");
	else
		Letters("CONTINUE");

	Caret(Range(0,Letters().length-1));
	DrawLevel();

	TransitionLettersIn(duration);
}

function TransitionLettersIn(duration){
	var duration=duration||200;
	UnFadeElement("#letters",duration);
}

function TransitionLevelTopOut(duration){
	var duration=duration||200;
	CloseElement(".top .keystrokes",undefined,duration);
	CloseElement(".top .notes",undefined,duration);
	CloseElement(".top .goal",undefined,duration);
	FadeElement("#letters",duration);
}

function TransitionLevelOut(duration){
	var duration=duration||200;
	TransitionLevelTopOut(duration);
	FadeElement("#letters",duration);
}

function TransitionNotesIn(duration){
	var duration=duration||200;
	var notes=GetElement(".top .notes");
	if(!notes)
		PreAddElement(`<div class='notes faded'><p class="level-number">${LevelNumberNotes(CurLevelNumber())}</p><p class="best">${BestMove(CurLevelTitle())||""}</p><p class="level-notes">${ObtainLevelNotes(CurLevelNumber())}</p></div>`,".top")
	else{
		GetElement(".level-number").innerHTML=LevelNumberNotes(CurLevelNumber());
		GetElement(".level-notes").innerHTML=ObtainLevelNotes(CurLevelNumber());
	}
	UnFadeElement(".top .notes",duration);
}

function TransitionGoalIn(duration){
	var duration=duration||200;
	var goalE=GetElement(".top .goal");
	var goal=GoalHTML(CurLevelTitle());
	if(!goalE){
		AppendElement(`<div class='goal goaly faded'>${goal}</div>`,".top .notes")
	}
	else{
		Class(".goal",".goaly");
		goalE.innerHTML=goal;
	}
	UnFadeElement(".top .goal",duration);

	if(goal==="Deaf")
		Class(".goal","uncase");
	else
		UnClass(".goal","uncase");

}

function TransitionKeystrokesIn(duration){
	var duration=duration||200;
	if(!GetElement(".top .keystrokes")){
		AddElement(`<div class='keystrokes faded'></div>`,".top");
	}
	UnFadeElement(".top .keystrokes",duration);
}

function TransitionTitlescreenTitleIn(duration){
	var duration=duration||200;
	if(!GetElement(".top .game-title"))
		AddElement(`<div class='game-title faded'>${gameTitle}</div>`,".top")
	UnFadeElement(".top .game-title",duration);
}

function TransitionTitlescreenOut(duration){
	var duration=duration||200;
	CloseElement(".game-title",undefined,duration);
	FadeElement("#letters",duration);
}

///////////////////////////////////////////////////////////////////////////////
//Macros

function TitleScreenLoaderMacro(){
	return [
		{Starter:BlockInput},
		{Starter:TransitionLevelOut,endDelay:200},
		{Starter:function(){
			CleanTitleScreen();
			ColoriseGameBar();
		}},
		{Starter:TransitionTitlescreenTitleIn,endDelay:200},
		{Starter:TransitionTitleScreenOptions,endDelay:200},
		{Starter:function(){
			LaunchTouchActions(gameSelector,TouchActionsTitlescreen());
			UnLaunchTouchActions(".top",TouchActionsTop());
			UnLaunchTouchActions(".middle",TouchActionsMiddle());
			Attend("mouseup",LevelLoader,gameSelector);
			UnAttend("mouseup","#letters");
			UnAttend("mouseup",".goal");
			UnAttend("mouseup",".keystrokes");
			UnAttend("mouseup",".best");
		}},
		{Starter:UnBlockInput}
	]
};

function LevelTopInMacro(){
	return [
	{Starter:TransitionNotesIn,endDelay:200},
	{Starter:TransitionKeystrokesIn,endDelay:100},
	{Starter:TransitionGoalIn,endDelay:200}
	];
}

function LevelLoadMacro(){
	return [
		{Starter:BlockInput},
		{Starter:TransitionTitlescreenOut,endDelay:0},
		{Starter:TransitionLevelTopOut,endDelay:200},
		{Starter:function(){
			ClearLevel();
			CleanLevel();
			ColoriseGameBar();//Change colour each level
		}},
		...LevelTopInMacro(),
		{Starter:TransitionLettersIn,endDelay:200},
		{Starter:function(){
			UnLaunchTouchActions(gameSelector,TouchActionsTitlescreen());
			LaunchTouchActions(".top",TouchActionsTop());
			LaunchTouchActions(".middle",TouchActionsMiddle());
			UnAttend("mouseup",gameSelector);
			Attend("mouseup",CopyHandler(LetterExtractor("#letters")),"#letters");
			Attend("mouseup",CopyHandler(ExtractKeystrokes),".keystrokes");
			Attend("mouseup",CopyHandler(LetterExtractor(".goal")),".goal");
			Attend("mouseup",CopyHandler(best=>best.innerText),".best");
			}
		},
		{Starter:UnBlockInput}
	]
};



function LevelWinMacro(){
	return [
		{Starter:BlockInput},
		{Starter:function(){
			FadeElement(".top .notes",200);
			FadeElement(".top .keystrokes",200);
			Class(".top",".downwards");
		},endDelay:200},
		...GoalMatchedMacro(),
		{Starter:function(){
			UnClass(".top",".downwards");
			NextLevel();//may need delay
			ClearLevel();}},
		{Starter:UnBlockInput},
	]
}


function GoalMatchedMacro(){
	return [
		{Starter:function(){
			GetElements("#letters .icon-"+StringSymbol("left")).map(e=>ParentElement(e,".letter")).map(ShrinkElement);
			GetElements("#letters .icon-"+StringSymbol("right")).map(e=>ParentElement(e,".letter")).map(ShrinkElement);
			GetElements(".invisible").map(ShrinkElement);
			UnWrapElement(".expanding");
		},endDelay:500},
		{Starter:function(){
			Caret(Infinity);
			DrawCaret();
		},endDelay:500},
		{Starter:function(){
			Class(".middle #letters","downwards");
			UnClass(".goal",".goaly");
			Class(".goal",".letters");
			ShrinkElement(".caret");
		}
		,endDelay:500},
		{Starter:function(){
			FadeElement(".caret");
			RemoveElements(".shrinked");
		},endDelay:100},
		BorderlessAction({endDelay:1000}),
		MirrorAction({endDelay:Letters().length*100}),
		{Starter:function(){
			UnClass(".middle #letters","downwards");
		}}
	];
}


///////////////////////////////////////////////////////////////////////////////
//Level states

function Memo(m){

	if(typeof Memo.memo==="undefined")
		Memo.memo=StartingMemo(CurLevelTitle());

	if(typeof m==="undefined")
		return Clone(Memo.memo);
	else
		return Memo.memo=Clone(m);
}

function StartingMemo(level){
	var zeromemo={
		'Second':false,
		'Consonant':false,
		'Difference':"",
		'Symmetries':true,
		'Fillet':0,
		'Anagram':[],
		'Nigeria':false,
		// 'Fuchsia':{
		// 		colour:ObtainFGColor(),
		// 		used:"",
		// 		freeze:false
		// 	},
		'Nokia 1998':0,
		'Just cut and paste':"",
		'⠍⠕⠗⠎⠑':[],
		'Wasd':`_____...D_____
				..S......_____
				.....A._______
				..____________
				W_____________`.replace(/\t*/g,""),
		'Order is all':[],
		'La rapide surprise':{
			choosing:false,
			possibilities:[""],
			p:0,
			prefix:"",
			animate:true
		},
		'Starting buds':{
			choosing:false,
			possibilities:[""],
			p:0,
			positions:[0],
			animate:true
		}
	};
	return zeromemo[level];
}

function EffectRenderer(level){
	var timers={
		'Nokia 1998':function(){NokiaTimer.blocked=true},
	};
	if(!level)
		return EffectRenderer(CurLevelTitle());
	if(In(timers,level))
		return timers[level]();
	else
		return;
}

function ObtainStartingLevelState(){
	var state={
		'letters':[],
		'caret':0,
		'keystrokes':[],
		'memo':StartingMemo(CurLevelTitle())
		// 'colour':StartingColour(CurLevelTitle())
	};
	return state;
}

function CurrentLevelState(){
	var state={
		'letters':Letters(),
		'caret':Caret(),
		'keystrokes':Keystrokes(),
		'memo':Memo()
		// 'colour':CaretColour()
	};
	return state;
}


function LevelState(state){
	if(!LevelState.level)
		LevelState.level=ObtainStartingLevelState();

	if(typeof state==="undefined")
		state=LevelState.level;
	else
		LevelState.level=state;
		
	Letters(state.letters);
	Caret(state.caret);
	Keystrokes(state.keystrokes);
	Memo(state.memo);
	// CaretColour(state.colour);

}

//Keystroke list

function Keystrokes(array){
	if(!Keystrokes.array)
	Keystrokes.array=[];
	if(typeof array==="undefined")
		return Keystrokes.array;
	
	if(typeof array==="string")
		return Keystrokes.array=array.split("");
	else
		return Keystrokes.array=Clone(array);
}

function AddLetterStroke(L,symbol){
	Keystrokes();
	var L=Posfix(CleanStroke(L),symbol);
	Keystrokes.array.push(L);
}

function AddWordStroke(word,symbol){
	Keystrokes();
	word=CleanStroke(word);
	if(!IsArray(word))
		word=word.split("");
		word.map(L=>AddLetterStroke(L,symbol));
}

function AddStroke(L,symbol){
	AddWordStroke(L,symbol);
}

var separator=StringSymbol("interpunkt");

function CleanStroke(L){
	return L.replace(/\*|\-|\~/g,"");
}
function ValidateStroke(L){
	return CleanStroke(L);
}

function InvalidateStroke(L){
	if(L===separator)
		return separator;
	return Posfix(UnInvalidateStroke(L),"-");
}
function UnderlineStroke(L){
	if(L===separator)
		return separator;
	return Posfix(UnUnderlineStroke(L),"*");
}
function UnInvalidateStroke(L){
	if(L===separator)
		return separator;
	return L.replace(/\-/g,"");
}
function UnUnderlineStroke(L){
	if(L===separator)
		return separator;
	return L.replace(/\*/g,"");
}


function UnderlineValidStroke(L){
	if(StrokeInvalid(L))
		return L;
	else
		return UnderlineStroke(L);
}

function StrokeInvalid(L){
	return UnInvalidateStroke(L)!==L;
}
function StrokeUnderlined(L){
	return UnUnderlineStroke(L)!==L;
}

function AddStrokeSeparator(){
	AddStroke(separator);
}
function AddStrokeValid(L){
	var L=L.replace(" ","_");
	AddStroke(L);
}
function AddStrokeInvalid(L){
	var L=L.replace(" ","_");
	AddStroke(L,"-");
}
function AddStrokeUnderline(L){
	var L=L.replace(" ","_");
	AddStroke(L,"*");
}

function UnderlineWordstroke(word){
	ModifyStroke(word,"*");
}

function LastSeparatorIndex(array){
	var i=[...array].reverse().indexOf(separator);
	if(i===-1)
		return -1;
	else
		return array.length-i;
}

function LastWordstroke(){
	var keystrokes=Keystrokes();
	var i=LastSeparatorIndex(keystrokes);
	if(i===-1)
		return keystrokes;
	return keystrokes.slice(i,Infinity);
}

function MostWordstroke(){
	var keystrokes=Keystrokes();
	var i=LastSeparatorIndex(keystrokes);
	if(i==-1)
		return [];
	return keystrokes.slice(0,i-1);
}

function ModifyStroke(word,symbol){
	Keystrokes();
	var word=word.toUpperCase().split("").reverse().join("~");
	var strokes=Keystrokes.array.reverse().join("~");
	//console.log(word,strokes);
	strokes=strokes.replace(word,word.replace(/\~/g,symbol+"~"+symbol)).split("~");
	//console.log(strokes);
	strokes=strokes.map(k=>In(k,symbol)?Posfix(UnPrefix(k,symbol),symbol):k).reverse();
	//console.log(strokes);
	Keystrokes(strokes)
}

// function UnderlineLastWordstroke(word){
// 	var strokes=CleanStroke(Keystrokes().join(""));
// 	var last=word.toUpperCase();
// 	var most=UnOverfix(strokes,last);
// 		strokes=[].concat(most.split("")).concat(last.split("").map(UnderlineStroke));
// 	Keystrokes(strokes);
	
// }


function ModifiedLastStroke(Modifier){
	var most=MostWordstroke();
	var last=LastWordstroke().map(Modifier);
	if(most.length)
		most.push(separator);
	return most.concat(last);
}

function ModifyLastStroke(Modifier){
	Keystrokes(ModifiedLastStroke(Modifier));
}



function LevelHighlightableWords(title){
	var LKC={
		"Nigeria":Countries.concat(Capitals),
		"Ironclad":NucleiNames,
		"Odd":["Odd","Even"],
		"Latent clones":NumberNames,
		"Shepherdess hence unladylike":GenderedMale,
		"Just cut and paste":["cut","copy","paste"],
		"Order is all":["is"]
	}
	if(LKC[title])
		return LKC[title]
	else
		return [];
}

function HighlightableWords(title){
	var combos=LevelHighlightableWords(title);
	combos.map(UnderlineWordstroke);
}

function ExtractKeystrokes(el){
	var parent=ParentElement(el,".keystrokes");
	var strokes=GetElements(".keystroke",parent);
		strokes=strokes.filter(s=>!Classed(s,"keystroke-invalid")&&SelectedNode(s));
	var text=strokes.map(LetterString).join("");	
		text=KeystrokeSimplifier(CurLevelTitle())(text);
		text=text.replace(/\n+/gmi,"");//ensure single line
		text=text.replace(/\_/gmi," ");//revert underscore -> space
	return text;
}

function LetterExtractor(parentSelector,letterSelector,Acceptor,Simplifier){
	var letterSelector=letterSelector||".letter";
	var Acceptor=Acceptor||True;
	var Simplifier=Simplifier||Identity;
	return function(el){
		var parent=ParentElement(el,parentSelector);
		var strokes=GetElements(letterSelector,parent);
			strokes=strokes.filter(s=>Acceptor(s)&&SelectedNode(s));
		var text=strokes.map(LetterString).join("");	
			text=Simplifier(text);
			text=text.replace(/\n+/gmi,"");//ensure single line
			text=text.replace(/\_/gmi," ");//revert underscore -> space
		return text;
	}
}


function LetterString(e){
	if(!GetElement(".iconpath",e))
		return e.innerText;
	else
		return StringSymbol(IconName(e));
}

function SimplerArrowCycleString(text){
	var lr=StringSymbol("left")+StringSymbol("right");
	var rl=StringSymbol("right")+StringSymbol("left");	
	return FixedPoint(t=>t.replace(lr,"").replace(rl,""),text);
}

function KeystrokeSimplifier(title){
	if(In(KeystrokeSimplifiers,title))
		return KeystrokeSimplifiers[title];
	else
		return Identity;
}

var KeystrokeSimplifiers={
	"Starting buds":SimplerArrowCycleString,
	"La rapide surprise":SimplerArrowCycleString
}

///////////////////////////////////////////////////////////////////////////////
//Macros

function UndoIterator(i){
	return function(){
		Throttle(Undo,100);
	}
}
function LetterIterator(string){
	return function (i){
		return function(){
			GameKey(string[i]);
		}
	}
}

function TypingAction(string,Opts){
	var Opts=Opts||{};
	return {
		interval:300,
		startDelay:2000,
		...Opts,
		steps:string.length,
		Iterator:LetterIterator(string)
	};
}

function UnTypingAction(string,Opts){
	var Opts=Opts||{};
	return {
		interval:200,
		startDelay:1000,
		...Opts,
		steps:string.length,
		Iterator:UndoIterator
	};
}

function LettersAction(Opts){
	var Opts=Opts||{};
	return {
		interval:100,
		...Opts,
		steps:GetElements("#letters .letter").length
	};
}

function MirrorAction(Opts){
	var Opts=Opts||{};
		Opts.Iterator=function(i){
			var middleletters=GetElements("#letters .letter");
			var goalletters=GetElements(".goal .letter");
			Class(middleletters[i],"downwards");
			Class(goalletters[i],"downwards");
		};
	return LettersAction(Opts);
}

function BorderlessAction(Opts){
	var Opts=Opts||{};
		Opts.interval=50;
		Opts.Iterator=function(i){
			var middleletters=GetElements("#letters .letter");
			Class(middleletters[i],"borderless")};
	return LettersAction(Opts);
}

//Winning automation

function LevelSolution(title){ //In a separate file
	if(In(LevelSolutions,title))
		return LevelSolutions[title]
	else
		return "";
};

function SolutionTypingInterval(title){
	var intervals={
		"Topological":"1000",
		"Nokia 1998":"1000",
		"Loosely less":"100"
	}
	if(In(intervals,title))
		return intervals[title];
	else
		return 300;
}

function WinLevelAction(title){
	var solAction=TypingAction(LevelSolution(title));
		solAction.interval=SolutionTypingInterval(title);
	return solAction;
}

function GotoAndWinLevelActions(title){
	return [
		{startDelay:4000},
		{Starter:()=>GoToLevel(title)},
		{startDelay:2000},
		WinLevelAction(title)
	]
}


function CurLevelWin(){
	Kinemate(GotoAndWinLevelActions(CurLevelTitle()));
}

function GotoLevelWin(title){
	Kinemate(GotoAndWinLevelActions(title));
}

function NextLevelsWin(title){
	if(title)
		var n=LevelTitleNumber(title);
	else
		n=CurLevelNumber();
		
	var remainingGoals=Range(n,MaxLevel()).map(n=>LevelTitle(n));
		remainingGoals=remainingGoals.filter(g=>!LevelWon(g));

	var actions=remainingGoals.map(GotoAndWinLevelActions).flat();
	
	Kinemate(actions);
}
 
//Tutorial Mode

function OverlayTutorial(){
	Class(".middle","tutor");
	Class(".top","tutor");
	UnClass(".middle .grid-mini","faded");
	UnClass(".middle .grid-cross","faded");
	UnClass(".middle .grid-mini","opening");
	UnClass(".middle .grid-cross","opening");	
}

function UnOverlayTutorial(){
	UnClass(".middle","tutor");
	UnClass(".top","tutor");
	CloseElement(".middle .grid-mini");
	CloseElement(".middle .grid-cross");
}

function OverlayTutorialMacro(){return [
	{Starter:()=>FadeElement(".top .notes")},
	{Starter:()=>FadeElement(".top .keystrokes"),endDelay:500},
	{Starter:()=>FadeElement(".top .goal"),endDelay:500},
	{Starter:function(){
		AddWallpaper("grid-mini",".middle");
		AddWallpaper("grid-cross",".middle");
		Class(".middle .grid-mini","faded");
		Class(".middle .grid-cross","faded");
		Class(".middle .grid-mini","opening");
		Class(".middle .grid-cross","opening");	
	},endDelay:500},
	{Starter:OverlayTutorial}
	];
}

function UnOverlayTutorialMacro(){return [
	{Starter:UnOverlayTutorial,endDelay:100},
	...LevelTopInMacro(),
	{Starter:function(){
		FadeElement(".middle .grid-mini");
		FadeElement(".middle .grid-cross");
		UnClass(".middle .grid-mini","opening");
		UnClass(".middle .grid-cross","opening");	
	},endDelay:1000},
	{Starter:UnOverlayTutorial}
	];
}


var ZoomMacro=[
	{Starter:function(){
		Class(".game-supra-Canvas","zoom"),
		UnClass(".game-supra-Canvas","unzoom")},
	endDelay:500}
]


var UnZoomMacro=[
	{Starter:function(){
		Class(".game-supra-Canvas","unzoom"),
		UnClass(".game-supra-Canvas","zoom")}
	}
]

function TutorialClueMacro(){
	return [
		{Starter:()=>GoToLevel("Direct")},
		...OverlayTutorialMacro(),
		...ZoomMacro,
		TypingAction("TYPE THE CLUE",{endDelay:2000}),
		UnTypingAction("TYPE THE CLUE",{endDelay:0}),
		...UnZoomMacro,
		...UnOverlayTutorialMacro(),
		TypingAction("DIRECT",{endDelay:4000})
	];
}

function TutorialRuleMacro(){
	return [
		{Starter:()=>GoToLevel("Reverse")},
		...OverlayTutorialMacro(),
		...ZoomMacro,
		TypingAction("ELUR NEDDIH EHT DNIF",{startDelay:1500,endDelay:2000}),
		UnTypingAction("ELUR NEDDIH EHT DNIF",{endDelay:1500}),
		...UnZoomMacro,
		...UnOverlayTutorialMacro(),
		TypingAction("REVERS",{endDelay:2000}),
		UnTypingAction("REVERS",{endDelay:1500}),
		TypingAction("ESREVER")
	];
}

function TutorialMacro(){
	return [
		{Starter:CollapseGameBar,endDelay:500},
		...TutorialClueMacro(),
		...TutorialRuleMacro(),
		{endDelay:5000},
		{Starter:UnCollapseGameBar},
	];
}


