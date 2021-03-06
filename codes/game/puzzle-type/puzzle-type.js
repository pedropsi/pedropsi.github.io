///////////////////////////////////////////////////////////////////////////////
//Puzzle Type (c) Pedro PSI, 2019-2020.
//All rights reserved
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

if(PageIdentifier()!=="puzzle-type")
	AppendToElement("<style>html{overflow-y:hidden};</style>","HEAD")

var gameTitle="Puzzle Type";


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
var ObtainUndo=GameKeyHandler("undo");
var ObtainRedo=GameKeyHandler("redo");
var ObtainRestart=GameKeyHandler("redo");
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
		title=GoalDisplayLetters(title);
	if(!title||title.length<3)
		return m;
	var star=LevelHintStar(n);
	return `<span class="number-initials">${title[0]+title[1]+title[2]+star}</span>`;
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
"codes/game/modules/data-game-intro.js",
"codes/game/modules/data-game-save.js",
"codes/game/modules/data-game-fullscreen.js",
"codes/game/modules/data-game-bar.js",
"codes/game/modules/data-game-level.js",
"codes/game/modules/data-game-moves.js",
"codes/game/modules/data-game-colours.js",
"codes/game/modules/data-game-undo.js",
"codes/game/modules/data-game-hints.js",
"codes/game/modules/data-game-gestures.js",
"codes/game/modules/data-game-music.js",
// "codes/game/modules/data-game-hud.js"
]

var gameModulesLater=[
"chords",
"codons",
"countries",
"lang-gender",
"lang-kana",
"lang-cyrillic",
"letter-topology",
"letter-led",
"morse-braille",
"nuclei",
"number-reader",
"number-roman",
"colours-names",
"constellations",

//"meta",
"lang-past",

"lang-fr-adj",
"lang-fr-adv-extra",
"lang-fr-interj",
"lang-fr-names",
"lang-fr-verbes",

"lang-plurals-superlatives"
]

function ModulesPath(){return "codes/game/puzzle-type"};
function MediaPath(){return "media/puzzle-type"};

LoadStyle(ModulesPath()+"/puzzle-type.css");
LoadSources(gameModulesEarly,P()?()=>GameIntro(StartGame):Identity);//GameTrailer);
gameModulesLater.map(LoaderInFolder(ModulesPath()+"/modules"));
["tone.js","tippy.js"].map(LoaderInFolder("codes/libraries"));
LoaderInFolder("../puzzle-type")("solutions.js");



function StartGame(){
	PrepareGame();
	ObtainLoadGame();
	InitialiseGameCanvas();
	ObtainTitleScreenReLoader();
	PlaylistStartPlay();
};


TouchActionsTitlescreen=function(){
	return{
	"mouseup":TitleScreenInput,
	"swipe-tap":TitleScreenInput,
	"swipe-left":TitleScreenInput,
	"swipe-up":TitleScreenInput,
	"swipe-right":TitleScreenInput,
	"swipe-down":TitleScreenInput
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
	PrependToElement(trailerHTML,"BODY");
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
	var fulltokens=["PatrickEye","Plurmorant","knexator","Deusovi","minotalen","KristianHedeholm","builder17","blubberquark"];
	var semitokens=[];
	var apptokens=fulltokens.map(function(t){return "homescreen-"+t});
	var manifest=GetElement("manifest");
	if(manifest)
		manifest.href=manifest.href.replace("homescreen","homescreen-"+pagetag);
	return In(fulltokens,pagetag)||In(apptokens,PageSearch("source"))||(In(semitokens,pagetag)&&PageSearch("levels"))||(PageSearch("code")==="IGF2021"&&In(["WIN","MAC"],PageSearch("build")));
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
	["??","interpunkt"].map(Keybinder(Identity));//Do nothing

	["Ctrl up","Ctrl left","page up"].map(Keybinder(SelectPreviousLevel));
	["Ctrl down","Ctrl right","page down"].map(Keybinder(SelectNextLevel));

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
	var key=StringGlyph(key); //accept keywords space, dot, dash
	function KeyInput(){
		return InstructGameInput(key);
	}
	Throttle(KeyInput,50,"Action");
}


function GameInput(key){
	if(key==="Escape"){
		CloseKeyboard();//if needed
		ObtainTitleScreenReLoader();
		return;
	}

	if(key==="undo"||AllowExtraUndoKey(key)){
		Undo();
		return;
	}

	if(key==="redo"||AllowExtraRedoKey(key)){
		Redo();
		return;
	}

	if(key==="restart"||AllowExtraRestartKey(key)){
		Restart();
		return;
	}

	if(key===StringGlyph("interpunkt")){//neuter separator
		ForbidCaret();
		return;
	}

	if(ForbidEnterActions(key)||ForbidNumberActions(key)||ForbidSpaceActions(key)||ForbidArrowActions(key)){
		ForbidCaret();return;
	}
	
	else{
		if(Letters.array.length>=CharLimit(CurLevelTitle())){//Max Char Limit (arbitrary, to fit screen)
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

ForbidKeystrokesLevels=[
	"Type this",
	"Reverse"
];

function ForbidNumberActions(key){
	return (!In([
		"Type this",
		"Reverse",
		"Second",
		"Follow",
		"Rotate",
		"Fillet",
		"Symmetries",
		// "Topological",
		"Nokia 1998",
		"Loosely less",
		"Reshape",
		"White chocolate mint",
		"Polaris Australis",
		"Odd",
		"La rapide surprise",
		"Starting buds",
		"Order is all",
		"EnactLawsMama"],CurLevelTitle())&&In(NumberCharacters,key));
}

function ForbidSpaceActions(key){
	return (!In([
		"Type this",
		"Reverse",
		"Second",
		"Follow",
		"Rotate",
		"Loosely less",
		"Latent clones",
		"Shepherdess hence unladylike",
		"June got before late summer",
		"White chocolate mint",
		"Nigeria",
		"Polaris Australis",
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

var ArrowKeys=Directions.map(StringGlyph);

function AllowExtraUndoKey(key){
	return CurLevelTitle()==="Wasd"&&key==="Z";
}
function AllowExtraRedoKey(key){
	return CurLevelTitle()==="Wasd"&&key==="Y";
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
//Levels & Actions
function WinnerTitle(title){
	if(In(WinnerTitles,title))
		return WinnerTitles[title](title);
	else
		return title.toUpperCase();
}

var WinnerTitles={
	"Deaf":Identity,
	"Reshape":function(title){return title.toUpperCase().split("").map(Accesser(LEDLetters,Identity)).join("")}
};



function ObtainLevelDescriptionTitle(lvl){
	var title=LevelTitle(lvl);
		title=GoalHTML(title);
	return `<div class="description-title">${title}</div>`;
}

function GoalDisplayLetters(title){
	function GoalDisplayer(L){return LetterPureHTML(L.toUpperCase())};
	if(In(GoalDisplayers,title))
		GoalDisplayer=GoalDisplayers[title];
	
	if(In(GoalSplitters,title))
		var title=GoalSplitters[title](title);
	else
		var title=title.split("");
	return title.map(GoalDisplayer);
}

function GoalHTML(title){
	return GoalDisplayLetters(title).join("");
}

var LevelDifficulty={
	"Type this":0,				
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
	"Fillet":2,
	"Symmetries":3,
	"Reshape":3,
	"Topological":4,
	"Loosely less":4,
	"Wasd":2,
	"Nokia 1998":1,
	"Dvorak":3,
	"??????????????":1,
	"????????????":2,
	"Nigeria":3,
	"Polaris Australis":3,
	"Anagram":2,
	"Genetic.":2,
	"Ironclad":2,
	"Deaf":3,
	"EnactLawsMama":3,
	"Dividi":5,
	"Magnetism":2,
	"Odd":3,
	"Latent clones":3,
	"Shepherdess hence unladylike":3,
	"June got before late summer":4,
	"La rapide surprise":5,
	"White chocolate mint":2,
	"Starting buds":5,
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
	return Glyph("asterisk-heavy").repeat(LevelDifficulty[title]||0);
}

var ExternalLevels=[
	"Topological",
	"Nokia 1998",
	"Dvorak",
	"Nigeria",
	"Polaris Australis",
	"Genetic.",
	"Ironclad",
	"Deaf",
	"EnactLawsMama",
	"Dividi",
	"Magnetism",
	"White chocolate mint"
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
	"Reshape",
	"Wasd",
	"Nigeria",
	"Polaris Australis",
	"Dvorak",
	"White chocolate mint"
]

var LanguageLevels=[
	"??????????????",
	"????????????",
	"Anagram",
	"Latent clones",
	"Shepherdess hence unladylike",
	"June got before late summer",
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
		extras+=" "+Glyph("music");
	if(In(VisualLevels,title))
		extras+=" "+Glyph("eye");
	if(In(LanguageLevels,title))
		extras+=" "+Glyph("book");
	if(In(ExternalLevels,title))
		extras+=" "+Glyph("magnifying-glass");
	if(In(MathematicalLevels,title))
		extras+=" "+Glyph("math");
	if(In(StructuralLevels,title))
		extras+=" "+Glyph("structure");

	return 	LevelDifficultyStars(title)+extras;
}


function LevelNumberNotes(n){
	return String(n)+" "+(LevelSolved(n)?LevelHintStar(n):"");
}

var LevelGoals=[			//Required types of thinking:
	//Positional (caret position), Spacial (position of letters in 2D system), Alphabetical (letters are ordered, and may correspond to numbers), Syllabe (syllabes as unit of input), Word (full words as units of input), Adjacent, Cyclic, Mapping (cyphers), Language, Knowledge, Cultural, Retroactive, Proactive,
	"Type this",				

	"Reverse",				//Positional,
	"Follow",				//Positional, Monoactive
	"Consonant",			//Positional, Language
	"Second",				//Retroactive, Subtractive
	"Rotate",				//Positional, Spacial, Retroactive

	//"Oppose",				//Alphabetical
	"Rise",					//Alphabetical 
	"Falls",				//Alphabetical, Arithmethic, Retroactive
	"Precedent",			//Alphabetical, Retroactive
	
	"Fillet",				//Shape, Proactive 
	"Symmetries",			//Shape, Retroactive
	"Reshape",				//Shape, Proactive 
	"Topological",			//Shape, Growth, Monoactive
	
	"Nokia 1998",			//Keyboard
	"Wasd",					//Keyboard, Emulation
	"Dvorak",				//Keyboard, Cyclic

	"??????????????",				//Language, Encoding
	"????????????",				//Keyboard, Syllabe, Language, Encoding

	"Nigeria",				//Word, Mapping, Geography
	"Polaris Australis",	//Word, Mapping, Astronomy
	
	"Genetic.",				//Encoding, Word, Science
	"Anagram",				//Word, Mapping, Language, Once,
	"Ironclad",				//Encoding, Word, Science
	"White chocolate mint",	//Encoding, Colour
	"Deaf",					//Encoding, Music

	"EnactLawsMama",		//Encoding, Languages
	
	"Latent clones",					//Keyword, Increment, Retroactive, Language
	"Shepherdess hence unladylike",		//Keyword, Swap, Retroactive, Language
	"June got before late summer",	//Keyword, Swap, Retroactive, Language
	"La rapide surprise",				//Keyword, Swap, Retroactive, Language
	"Starting buds",					//Language

	"Teleporter",			//Positional, Retroactive
	"Superior",				//Positional, Alphabetical, Retroactive
	//"Tangles",			//Alphabetical, Cyclic, Arithmethic, Proactive
	"Difference",			//Positional, Alphabetical, Arithmethic, Proactive, Retroactive
	//"Photocopier",		//Positional, Alphabetical, Arithmethic, Proactive, Retroactive

	"Loosely less",			//Keyboard, Shape, Proactive, Arithmetic

	"Magnetism",						//Keyword, Positional, Retroactive
	"Odd",								//Keyword, Positional, Retroactive, Subtractive
	"Just cut and paste",				//Keyword, Proactive, Redefinition
	"Order is all",						//Keyword, Proactive, Increment, Redefinition
	"Dividi",					//Encoding, Arithmethic, Retroactive
	
];

function RestrictPlayableLevels(){
	var restricted=PageSearch("levels");
	if(restricted){
		LevelGoals=LevelGoals.filter(Iner(restricted));
		gameTitle="Puzzle Type Demo";
		return true;
	}
	else
		return false;
}

RestrictPlayableLevels();


var LevelGoalAliases={
	"Direct":"Type this",
	"Morse":"EnactLawsMama",
	"???????????????":"EnactLawsMama",
	"Vowel":"Consonant",
	"Homeomorphic":"Topological",
	"Loosely less":"Calculator",
	"Loosely less":"Cooked books",
	"Loosely less":"Time to cook",
	"Loosely less":"Timed cooldown",
	"Loosely less":"Less cool",
	"Nucleus":"Ironclad",
	"Tennessine":"Ironclad",
	"Carbonate":"Ironclad",
	"Weightier":"Latent Clones",
	"German Shepherd":"Shepherdess hence unladylike",
	"Cherished Woman":"Shepherdess hence unladylike",
	"Today doves flit before sunset":"June got before late summer",
	"Today doves flit before winter":"June got before late summer",
	"Playmate resents flit":"June got before late summer",
	"Store delay corrodes present":"June got before late summer",
	"Present state delays":"June got before late summer",
	"Doves flit past":"June got before late summer",
	"Doves flit before winter":"June got before late summer",
	"Denebola":"Polaris Australis",
	"Fuchsia":"White chocolate mint",
	"White":"White chocolate mint",
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
	"Type this":Direct,
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
		
		var word=Letters();
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
	"Reshape":Reshape,
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
		return EndSubstitutor(GenderReplacementRules)(L)	
	},
	"June got before late summer":function(L){
		return EndSubstitutor(PastReplacementRules)(L)
	},
	"Latent clones":Weightier,
	"Starting buds":StartingBuds,
	"La rapide surprise":Translate,
	"Nigeria":Nigeria,
	"Polaris Australis":PolarisAustralis,
	"??????????????":Cyrillic,
	"????????????":function(L){
		InputLetterAfter(L);
		AddStrokeValid(L);
		Letters(StringReplaceRulesObject(Word().toLowerCase(),Hiragana).toUpperCase());
		Caret(Infinity);
	},
	"EnactLawsMama":Morse,
	"White chocolate mint":Fuchsia,
	"Deaf":Deaf,
	"Anagram":Anagram,
	"Ironclad":Ironclad,
	"Genetic.":Genetic,
	"Wasd":Wasd
}

function EndSubstitutor(ReplacementRules){
	return function(L){
		InputLetterAfter(L);
		AddStrokeValid(L);
		var word=Word();
		var matched=false;
		var i=0;
		var rule;
		while(!matched&&i<ReplacementRules.length){
			rule=ReplacementRules[i];
			matched=!!(word.match(rule[0]));
			i++;
		}
		if(matched){
			var newword=Word().replace(rule[0],rule[1]);
			var stem=UnPosfix(rule[0].source,"$");
			ScatteredWordstroke(stem,UnderlineStroke,StrokeUnderlined);
			AddStrokeReduced(rule[1]);
		}
		Letters(newword);
		Caret(Infinity);
	}		
}


function Wasd(L){
	if(!In("WASD",L)&&!In(ArrowKeys,L)){
		ForbidCaret();
		AddStrokeInvalid(L);
		return;
	}

	var level=Memo();
	
	if(L==="W"||L===StringGlyph("up"))
		level=EmulateUp(level);
	if(L==="A"||L===StringGlyph("left"))
		level=EmulateLeft(level);
	if(L==="S"||L===StringGlyph("down"))
		level=EmulateDown(level);
	if(L==="D"||L===StringGlyph("right"))
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
	return Reverse(EmulatePushRight(Reverse(levelstring)));	
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

function PolarisAustralis(L){
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

	var star=TemporaryWord();
	var next=NextStar(star);

	if(next){
		Letters(next.toUpperCase());
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
			ModifyLatterStroke(UnderlineValidStroke);
		}
		else{
			Letters(saved);
			AddStrokeValid(L);
			ModifyLatterStroke(InvalidateStroke);
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
			ModifyLatterStroke(UnderlineValidStroke);
			AddStrokeSeparator();
		}
	}
	
	Caret(Infinity);
}

function Fuchsia(L){
	var saved=SavedLetters();
	var colour=TemporaryWord().toLowerCase();

	//Spacing between words
	if(!colour.length&&saved.length)
		InputLetterAfter(" ");

	if(colour.length<1){
		InputLetterAfter("#*");
		AddStrokeValid(L);
	}
	else if(!In(Hexadecimal,L)){
		ForbidCaret();
		AddStrokeInvalid(L);
	}
	else if(colour.length===6){
		var colour=Rest(colour+L);
			colour=NamedColour(colour);
			colour=TransformAccesser(ColorSynonyms,LowerCase)(colour)
			colour=colour.toUpperCase();
		Letters(saved.join("")+colour);
		AddStrokeSeparator();
	}
	else{
		InputLetterAfter(L+"*");
		AddStrokeValid(L);
	}
	Caret(Infinity);
}

var Hexadecimal=["A","B","C","D","E","F"].concat(NumberCharacters);
	
function ColourApproximationString(colorstring,name){
	var chosen=ColourCoordinateNames.filter(function(c){return c[3]===name})[0];
	var rgb=RGB(Colour(colorstring)).colour;
	if(!Equal(rgb,Most(chosen)))
		return "almost "+name+" ("+colorstring+")";
	else
		return name;
}


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

		PlayChord(chord,false,0.5);
		if(In(MajorChords,chord)){
			InputLetterAfter(MajorChords[chord]);
			ModifyLatterStroke(UnderlineValidStroke);
		}
		else if(In(MinorChords,chord)){
			InputLetterAfter(MinorChords[chord].toLowerCase());
		}
		else
			ModifyLatterStroke(InvalidateStroke);
		
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
	var bimorse=BiMorseAdd(Word(),L);
	AddStrokeValid(L);
	Letters(BiMorseLetters(bimorse));
	Caret(Floor((bimorse.length)/6));
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
		Letters(letters)
	}

}


//Cyrillic

function Cyrillic(L){
	var last=Last(Letters());
	if(last&&Posfixed(last,"*"))
		CyrillicSyllabe(UnPosfix(last,"*"),L)
	else
		CyrillicLetter(L);
}

function CyrillicSyllabe(last,L){
	var syllabe=LatinCyrillic[last+L];
	if(syllabe){
		DeleteLetterAfter();
		InputLetterAfter(syllabe);
		ModifyLastStroke(ValidateStroke);
		AddStrokeValid(L);
		Caret(Infinity);
		return;
	}
	else{
		var Y=LatinCyrillic[last]
		if(Y){
			DeleteLetterAfter();
			InputLetterAfter(Y);
			ModifyLastStroke(ValidateStroke);
		}
		else{
			DeleteLetterAfter();
			ModifyLastStroke(InvalidateStroke);
		}
		return CyrillicLetter(L);
	}
}

function CyrillicLetter(L){
	var syllabe=Keys(LatinCyrillic).filter(le=>le[0]==L&&le.length>1);
	if(!syllabe.length){
		var M=LatinCyrillic[L];
		if(M){
			InputLetterAfter(M);
			AddStrokeValid(L);
		}
		else
			AddStrokeInvalid(L);
	}
	else{
		InputLetterAfter(L+"*");
		AddStrokeValid(L);
	}
	Caret(Infinity);
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

	var word=Word();
	
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

	var word=Word();
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
	var left=(!type||type==="left")?StringGlyph("left"):"";
	var right=(!type||type==="right")?StringGlyph("right"):"";
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
		
		found=(Arrayed(possibilities)&&possibilities.length>0);
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
		else if(In(["left","up"].map(StringGlyph),L))
			p=(p-1);
		else if(In(["right","down"].map(StringGlyph),L))
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
		EnDictionary.list=EnDictionary.list.filter(UnIner(exclusions))
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
		Letters.array=Reverse(Letters.array);
		direction=!direction;
		Memo(direction);

		if(direction)
			Caret(Infinity);
		else
			Caret(-1);
	}
	if(HorizontalSymmetric(L)){
		ModifyLetters(ToggleHorizontal);
		Letters.array=Reverse(Letters.array);
		
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

function TopoMorphed(M,L){
	var classL=HomeomorphicClass(L);
	var classM=HomeomorphicClass(M);
	return In(TopologyRequirement[classM],classL)
};

function Topological(L){
	var letters=Letters();	
	function Morpher(i){
		var M=Letter(i);
		if(TopoMorphed(M,L)){
			MorphLetter(M,L,"letters",Identity,function(){
				Letter(i,L);
			});
		}
	}
	if(Letters.array.length===0){
		InputLetterAfter(L);
		AddStrokeValid(L);
	}
	else{
		if(Letters.array.some(M=>TopoMorphed(M,L))){
			Kinemate([
				{Starter:BlockInput},
				{Starter:
					function(){
						for(var i=0;i<letters.length;i++)
							Morpher(i)
					},
				endDelay:400,
				Ender:
					function(){
						AddStrokeUnderline(L);
						ObtainUpdateLevel();
						UnBlockInput();
						CheckWin();
					}
				}
			])	
		}
		else{
			InputLetterAfter(L);
			AddStrokeValid(L);
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
	var n=Max(0,Number(Reverse(digitstring.replaceAll("_","")))-1);
	return Reverse(String(n).split("")).map(LowerAccesser(LEDNumberLetters)).join("");

}

function Loosely(L){
	var word=Word().split("");
		word=word.map(l=>In(LEDLetterNumbers,l)?(LEDLetterNumber(l)+"_"):l).join("");
		word=word.replace(/(\d\_)+/g,LooselyMath);
		word=word+L;

	if(In(LEDLetterNumbers,L))
		AddStrokeUnderline(L);
	else
		AddStrokeValid(L);
	Letters(word);
	Caret(Infinity);
}

function Reshape(L){
	var letters=Letters().map(LEDShapeShift);
		letters.push(LEDLetters[L.toUpperCase()]);
		Letters(letters);
	AddStrokeValid(L);
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
"garm":"m",//Mythological
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
	return word.replace(StringGlyph("left"),"").replace(StringGlyph("right"),"");
}

function Letters(array){
	if(!Letters.array)
		Letters.array=[];
	if(typeof array==="undefined")
		return Clone(Letters.array);
	
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

	if(Arrayed(position))
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
		PrependToElement(CaretHTML(),"#letters");
	if(p>=Letters().length)
		AppendToElement(CaretHTML(),"#letters");
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

function LetterHalvesHTML(E){
	var combined=CombineHalves(E);
	//Superimpose two halves
	if(combined.length>1){
		S=NewNode("<div class='superimpose'><div class='superimposed half upper'>"+PureLetter(E[0])+"</div><div class='half lower'>"+PureLetter(E[1])+"</div></div>");
		return LetterPureHTML(S.outerHTML);
	}
	else
		return LetterPureHTML(combined);
}

function LetterSymmetryHTML(L){
	var L=UpperCase(L);
	var simclass="topological symmetry";
	if(VerticalSymmetric(L)||In(L,"-")){
		simclass=simclass+" vertical";
	}
	if(HorizontalSymmetric(L)||In(L,"|")){
		simclass=simclass+" horizontal";
	}
	if(InversionSymmetric(L)||In(L,"%")){
		simclass=simclass+" inversion";
	}
	return LetterPureHTML(BezierLetter(PureLetter(L),undefined,simclass));
}

var LetterDisplayers={
	"??????????????":LetterDraftHTML,
	//"Tangles":LetterDraftHTML,
	"Symmetries":LetterSymmetryHTML,
	"Fillet":LetterHalvesHTML,
	"Ironclad":LetterDraftHTML,
	"Genetic.":LetterDraftHTML,
	"Anagram":LetterDraftHTML,
	"White chocolate mint":LetterDraftHTML,
	"Deaf":LetterDraftHTML,
	"EnactLawsMama":BrailleSVG,
	"Nigeria":LetterDraftHTML,
	"Polaris Australis":LetterDraftHTML,
	"Topological":TopologicalLetterSVG,
	"Loosely less":LEDLetterSVG,
	"Reshape":LEDLetterShapeSVG
}

var GoalDisplayers={
	"EnactLawsMama":BrailleSVG,
	"Symmetries":LetterSymmetryHTML,
	"Topological":TopologicalLetterSVG,
	"Loosely less":LEDLetterSVG,
	"Reshape":LEDLetterSVG,
	"Deaf":LetterPureHTML,
}

var GoalSplitters={
	"EnactLawsMama":function(title){return WordBiMorseArray(title)},
}

function TopologicalLetterSVG(L){
	return BezierLetter(L.toUpperCase(),undefined,"letter topological");
}

function LEDLetterSVG(L){
	if(L===" ")
		return LetterPureHTML(" ");
	else
		return LEDLetterShapeSVG(LEDLetters[L.toUpperCase()]);
}

function LEDLetterShapeSVG(shape){
	return LEDLetterSVGHTML(shape);
}

function BrailleSVG(bimorse){
	return BrailleLetterSVGHTML(bimorse);
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
		letters=letters.map(Glyph);//Replace any icons
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
	
	var p=memo.positions[memo.p]+(In(Letters(),StringGlyph("left"))?1:0);

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
	var styles="";
	if(StrokeInvalid(K))
		styles+=" keystroke-invalid";
	else
		styles+=" keystroke-valid";
	if(StrokeUnderlined(K))
		styles+=" keystroke-combo";
	if(StrokeReduced(K))
		styles+=" keystroke-reduced";

	var K=CleanStroke(K);
		K=Glyph(K);//replace with icon, if available
	return `<span class="keystroke ${styles}">${K}</span>`;
}

function DrawLevel(){
	DrawLetters();
	DrawCaret();
	if(!In(ForbidKeystrokesLevels,CurLevelTitle()))
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
	var positions=Reverse(Unique(array));
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
	AppendToElement(`<div class='top faded'></div>`,"gameCanvas");
	AppendToElement(`<div class='middle faded'><div id='letters'></div></div>`,"gameCanvas");
	UnFadeElement(".top",500);
	UnFadeElement(".middle",500);
}


function ObtainTitleScreenReLoader(){
	BlockInput();
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
		}
	
	LevelState(state);
	AddUndo(state);
	DrawLevel();
}

function CurLevelWon(){
	return LevelPassed(CurLevelTitle());
}

function LevelPassed(title){
	if(In(WinPassers,title))
		return WinPassers[title](Word());
	else
		return WinnerTitle(CurLevelTitle())===Word().replace(/\_/g,"");
}

WinPassers={
	"EnactLawsMama":function(word){
		return WordBiMorseArray(CurLevelTitle()).join("").replaceAll("-","_")===word.replaceAll("-","_");
	}
}

function ObtainWonMoves(){
	return Keystrokes().filter(s=>!StrokeReduced(s)).map(CleanStroke).join("");
}

function CheckWin(){
	var win=CurLevelWon();
	
	if(win){
		MarkWonLevel();
		BestMove(CurLevelTitle(),ObtainWonMoves());

		if(CurLevelTitle()!=="Deaf")
			PlaylistAwaken();

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
		PrependToElement(`<div class='notes faded'><p class="level-number">${LevelNumberNotes(CurLevelNumber())}</p><p class="best">${BestMove(CurLevelTitle())||""}</p><p class="level-notes">${ObtainLevelNotes(CurLevelNumber())}</p></div>`,".top")
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
		AppendAfterElement(`<div class='goal goaly faded'>${goal}</div>`,".top .notes")
	}
	else{
		Class(".goal",".goaly");
		goalE.innerHTML=goal;
	}
	UnFadeElement(".top .goal",duration);

	if(In(UnCapitalisedGoals,CurLevelTitle()))
		UnClass(".goal","capitalise");
	else
		Class(".goal","capitalise");

}

var UnCapitalisedGoals=[
	"Reshape",
	"EnactLawsMama",
	"Loosely less"
];

function TransitionKeystrokesIn(duration){
	var duration=duration||200;
	if(!GetElement(".top .keystrokes")){
		AppendToElement(`<div class='keystrokes faded'></div>`,".top");
	}
	UnFadeElement(".top .keystrokes",duration);
}

function TransitionTitlescreenTitleIn(duration){
	var duration=duration||200;
	if(!GetElement(".top .game-title"))
		AppendToElement(`<div class='game-title faded'>${gameTitle}</div>`,".top")
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
				if(CurLevelTitle()!=="Deaf"){
					PlaylistUnBlock();
					PlaylistAwaken();
				}
				else{
					PlaylistSleep();
					PlaylistBlock();
				}
			}
		},
		{Starter:function(){
			UnLaunchTouchActions(gameSelector,TouchActionsTitlescreen());
			LaunchTouchActions(".top",TouchActionsTop());
			LaunchTouchActions(".middle",TouchActionsMiddle());
			Attend("mouseup",CopyHandler(LetterExtractor("#letters"),"#letters"),"#letters");
			Attend("mouseup",CopyHandler(ExtractKeystrokes,".keystrokes"),".keystrokes");
			Attend("mouseup",CopyHandler(LetterExtractor(".goal"),".goal"),".goal");
			Attend("mouseup",CopyHandler(best=>best.innerText,".best"),".best");
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
			GetElements("#letters .icon-"+StringGlyph("left")).map(e=>ParentElement(e,".letter")).map(ShrinkElement);
			GetElements("#letters .icon-"+StringGlyph("right")).map(e=>ParentElement(e,".letter")).map(ShrinkElement);
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
		'Polaris Australis':false,
		'Nokia 1998':0,
		'Just cut and paste':"",
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
	if(!Arrayed(word))
		word=word.split("");
		word.map(L=>AddLetterStroke(L,symbol));
}

function AddStroke(L,symbol){
	AddWordStroke(L,symbol);
}

var separator=StringGlyph("interpunkt");

function CleanStroke(L){
	return L.replace(/\*|\-|\~|!/g,"");
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
function StrokeReduced(L){
	return InString(L,"!");
}


function AddStrokeSeparator(){
	var l=Keystrokes().length;
	if(l&&l!==LastSeparatorIndex(Keystrokes()))
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
function AddStrokeReduced(L){
	var L=L.replace(" ","_");
	AddStroke(L,"!");
}

function UnderlineWordstroke(word){
	ModifyStroke(word,"*");
}

function ScatteredWordstroke(word,Modifier,Modified){
	var keystrokes=Keystrokes();
	var o=0;
	var s=0;
	var k;
	while((o+s<keystrokes.length)&&o<word.length){
		k=keystrokes.length-1-o-s;
		w=word.length-1-o;
		while(Modified(keystrokes[k])){
			s++;
			k=keystrokes.length-1-o-s;
		}
		if(word[w]===CleanStroke(keystrokes[k]))
			keystrokes[k]=Modifier(keystrokes[k])
		o++
	}
	Keystrokes.array=keystrokes;
}


function LastSeparatorIndex(array){
	var i=Reverse(array).indexOf(separator);
	if(i===-1)
		return -1;
	else
		return array.length-i;
}

function RemoveLatterStrokeSeparator(){
	Keystrokes.array.splice(LastSeparatorIndex(Keystrokes.array,1));
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
	var word=Reverse(word.toUpperCase().split("")).join("~");
	var strokes=Reverse(Keystrokes.array).join("~");
	strokes=strokes.replace(word,word.replace(/\~/g,symbol+"~"+symbol)).split("~");
	strokes=strokes.map(k=>In(k,symbol)?Posfix(UnPrefix(k,symbol),symbol):k);
	strokes=Reverse(strokes);
	Keystrokes(strokes)
}


function ModifiedLatterStroke(Modifier){
	var most=MostWordstroke();
	var last=LastWordstroke().map(Modifier);
	if(most.length)
		most.push(separator);
	return most.concat(last);
}

function ModifyLatterStroke(Modifier){
	Keystrokes(ModifiedLatterStroke(Modifier));
}

function ModifyLastStroke(Modifier){
	if(Keystrokes.array.length)
		Keystrokes.array[Keystrokes.array.length-1]=Modifier(Keystrokes.array[Keystrokes.array.length-1])
}


function LevelHighlightableWords(title){
	var LKC={
		"Nigeria":Countries.concat(Capitals),
		"Polaris Australis":HighlightableStars,
		"Ironclad":NucleiNames,
		"Odd":["Odd","Even"],
		"Latent clones":NumberNames,
		//"Shepherdess hence unladylike":GenderedMale,
		"White chocolate mint":ColourNames,
		"Just cut and paste":["cut","copy","paste"],
		"Order is all":["is"]
	}
	if(LKC[title])
		return LKC[title]
	else
		return [];
}

function HighlightableWords(title){
	var keystrokes=Keystrokes().map(First).filter(Identity).join("").toLowerCase();
	var combos=LevelHighlightableWords(title).filter(Iner(keystrokes));
	combos.map(UnderlineWordstroke);
}

function ExtractKeystrokes(el){
	var parent=ParentElement(el,".keystrokes");
	var strokes=GetElements(".keystroke",parent);
		strokes=strokes.filter(s=>!Classed(s,"keystroke-invalid")&&!Classed(s,"keystroke-reduced")&&SelectedNode(s));
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
		return StringGlyph(IconName(e));
}

function SimplerArrowCycleString(text){
	var lr=StringGlyph("left")+StringGlyph("right");
	var rl=StringGlyph("right")+StringGlyph("left");	
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

function TypingAction(string,opts){
	var opts=opts||{};
	return {
		interval:300,
		startDelay:2000,
		...opts,
		steps:string.length,
		Iterator:LetterIterator(string)
	};
}

function UnTypingAction(string,opts){
	var opts=opts||{};
	return {
		interval:200,
		startDelay:1000,
		...opts,
		steps:string.length,
		Iterator:UndoIterator
	};
}

function LettersAction(opts){
	var opts=opts||{};
	return {
		interval:100,
		...opts,
		steps:GetElements("#letters .letter").length
	};
}

function MirrorAction(opts){
	var opts=opts||{};
		opts.Iterator=function(i){
			var middleletters=GetElements("#letters .letter");
			var goalletters=GetElements(".goal .letter");
			Class(middleletters[i],"downwards");
			Class(goalletters[i],"downwards");
		};
	return LettersAction(opts);
}

function BorderlessAction(opts){
	var opts=opts||{};
		opts.interval=50;
		opts.Iterator=function(i){
			var middleletters=GetElements("#letters .letter");
			Class(middleletters[i],"borderless")};
	return LettersAction(opts);
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
	var solAction=TypingAction(LevelSolution(title).replaceAll("_"," "));
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
		{Starter:()=>GoToLevel("Type this")},
		...OverlayTutorialMacro(),
		...ZoomMacro,
		TypingAction("TYPE THE CLUE",{endDelay:2000}),
		UnTypingAction("HE CLUE",{endDelay:0}),
		...UnZoomMacro,
		...UnOverlayTutorialMacro(),
		TypingAction("IS",{endDelay:4000})
	];
}

function TutorialRuleMacro(){
	return [
		{Starter:()=>GoToLevel("Reverse")},
		...OverlayTutorialMacro(),
		...ZoomMacro,
		TypingAction("TERCES EHT DNIF",{startDelay:1500,endDelay:2000}),
		UnTypingAction("TERCES EHT DNIF",{endDelay:1500}),
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

function WaitAction(duration){
	return {endDelay:duration};
}
function TipAction(selector,text){
	return {Starter:Tipper(selector,text),endDelay:TextReadDuration(text)*2};
}
function HighlightAction(selector,text){
	return {Starter:Highlighter(selector,text),endDelay:TextReadDuration(text)*2};
}
function UnHighlightAction(){
	return {Starter:function(){UnClass(".highlight","highlight")}}
}

function OnboardMacro(){
	return [
		{Starter:()=>GoToLevel("Type this")},
		{Starter:BlockInput},
		TipAction(".middle","Welcome to Puzzle Type!"),
		HighlightAction(".level-number","Level 1 is a tutorial."),
		HighlightAction(".goal",`TYPE THIS is the clue.`),
		HighlightAction("#letters","Your goal is to type this clue."),
		TypingAction("TYPE THIS"),
		UnHighlightAction(),
		WaitAction(6000),
		HighlightAction(".goal",`The next clue is REVERSE...`),
		HighlightAction(".level-notes","It should be easy (1 star)."),
		HighlightAction("#letters",`Let's try typing REVERSE...`),
		TypingAction("REVERSE",{endDelay:1000}),
		HighlightAction(".keystrokes",`Oh! We typed REVERSE correctly...`),
		HighlightAction("#letters",`... but it was reversed?`),
		HighlightAction("#UndoButton","Luckily, it's easy to undo..."),
		UnTypingAction("REV",{endDelay:2000}),
		HighlightAction("#RestartButton","... or to restart altogether."),
		{Starter:Restart},
		WaitAction(1000),
		UnHighlightAction(),
		TipAction(".middle","Now it's your turn. What will you do?"),
		{Starter:UnBlockInput}
	];
}

function Tipper(selector,text){
	var opts=opts||{};
	return function(){
		var instance=First(tippy(selector,{
			content:text,
			delay: 500,
			placement:"top",
			showOnCreate: true,
			arrow: false
		}))
		setTimeout(function(){if(instance)instance.destroy()},500+TextReadDuration(text)*1.5);
	}
}

function Highlighter(selector,text){
	return function(){
		UnClass(".highlight","highlight");
		Class(selector,"highlight");
		Tipper(selector,text)()
	}
}