///////////////////////////////////////////////////////////////////////////////
//Puzzle Type (c) Pedro PSI, 2019-2020.
//All rights reserved
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

var gameTitle="Puzzle Type";

function GameFrameHTML(){
	return "<div class='game-supra-Canvas'>\
				<div class='game' id='gameCanvas'>\
				</div>\
			</div>";
}

function GameTitleHTMLArray(){
return ["<div class='top'>\
			<h1 class='goal'>"+gameTitle+"</h1>\
		</div>",
		"<div class='middle' id='letters'>\
		</div>"];
}

function ComingHTMLArray(){
return ["<div class='top'>\
			<h1 class='goal'>"+gameTitle+"</h1>\
		</div>",
		"<div class='middle' id='letters'>Coming soon! (beta playtesting ongoing)\
		</div>"];
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
var ObtainUndo=function(){Undo();PulseSelect("#choice-"+"undo")};					//With Onscreen keyboard
var ObtainRedo=function(){Redo();PulseSelect("#choice-"+"redo")};					//With Onscreen keyboard
var ObtainRestart=function(){Restart();PulseSelect("#choice-"+"restart")};			//With Onscreen keyboard

function ObtainMainKey(action){
	if(!action)
		return {
			"undo":"Alt Z",
			"redo":"Alt Y",
			"restart":"Alt R",
			"feedback":"Alt E",
			"fullscreen":"Alt F",
			"hint":"Alt H",
			"keyboard":"Alt K",
			"levelselector":"Alt L",
			"music":"Alt M"
		}
	else
		return ObtainMainKey()[action];
}

//Echo moves
function ObtainIsUndoMove(move){return false;}
function ObtainIsRestartMove(move){return false;}
var ObtainReadMove=Identity;

//Level navigation
function ObtainNewGameCondition(){return SolvedLevels().length<1&&CurLevelNumber()<=1};
function ObtainStateScreens(){return LevelGoals;}
function ObtainLevelTitle(l){
	return FormattedTitle(LevelGoals[l-1]);
}

var ObtainLevelLoader=LevelLoader;

//Resize canvas
function ResizeCanvas(){return ;}
function ObtainXYRotateCondition(x,y){return false;}

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

var ObtainKeyboardAllowed=true;

///////////////////////////////////////////////////////////////////////////////
// Load the game bar & prepare game

var gameModulesEarly=[
"codes/game/modules/data-game-extras.js",
"codes/game/modules/data-game-moves.js",
"codes/game/modules/data-game-colours.js",
"codes/game/modules/data-game-undo.js",
"data/game-intro.js",
]

var gameModulesLater=[
"chords",
"codons",
"countries",
"lang-gender",
"lang-kana",
"letter-topology",
"morse-braille",
"nuclei",
"number-reader",
"number-roman",
"colours-names",
"audiosynth",

//"meta",

"lang-fr-adj",
"lang-fr-adv-extra",
"lang-fr-interj",
"lang-fr-names",
"lang-fr-verbes",

"lang-plurals-superlatives"
]

LoadSources(gameModulesEarly,P()?GameIntro:GameTrailer);
gameModulesLater.map(LoaderInFolder("codes/game/puzzle-type/modules"));

function GameIntro(){
	RemoveElement("game-supra-Canvas");
	PrependElement(GameFrameHTML(),".main");
	GameFocus();
	LoadStyle("codes/game/puzzle-type/puzzle-type.css");
	setTimeout(function(){PlayIntro(".game",StartGame)},100);
}

function StartGame(){
	GameFocus();
	GameTitleHTMLArray().map(function(html){OpenElement(html,"gameCanvas")});
	PrepareGame();
	ResumeCapturingKeys(CaptureComboKey);
	ObtainKeyActionsGameBar();
	LoadGame();
	ObtainTitleScreenLoader();
};



function GameTrailer(){
	var trailerHTML=`<video width="1280" height="1024" autoplay>
		<source src="media/puzzle-type/trailorial.mp4" type="video/mp4">
  		Sorry! Your browser does not support the video tag.
	</video>`;
	PreAddElement(trailerHTML,".main");
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
	var fulltokens=["PatrickEye","Plurmorant","mago314","Deusovi","minotalen","KristianHedeholm","MathWizard"];
	var semitokens=[];
	var apptokens=fulltokens.map(function(t){return "homescreen-"+t});
	var manifest=GetElement("manifest");
	manifest.href=manifest.href.replace("homescreen","homescreen-"+pagetag);
	return In(fulltokens,pagetag)||In(apptokens,PageSearch("source"))||(In(semitokens,pagetag)&&PageSearch("levels"));
}


///////////////////////////////////////////////////////////////////////////////
//Keybinding
function ObtainKeyActionsGame(){
	var keyactions={
		//"dot":InstructGameKeyF("dot"),
		//"dash":InstructGameKeyF("dash"),
		"0":InstructGameKeyF("0"),
		"1":InstructGameKeyF("1"),
		"2":InstructGameKeyF("2"),
		"3":InstructGameKeyF("3"),
		"4":InstructGameKeyF("4"),
		"5":InstructGameKeyF("5"),
		"6":InstructGameKeyF("6"),
		"7":InstructGameKeyF("7"),
		"8":InstructGameKeyF("8"),
		"9":InstructGameKeyF("9"),
		"A":InstructGameKeyF("A"),
		"B":InstructGameKeyF("B"),
		"C":InstructGameKeyF("C"),
		"D":InstructGameKeyF("D"),
		"E":InstructGameKeyF("E"),
		"F":InstructGameKeyF("F"),
		"G":InstructGameKeyF("G"),
		"H":InstructGameKeyF("H"),
		"I":InstructGameKeyF("I"),
		"J":InstructGameKeyF("J"),
		"K":InstructGameKeyF("K"),
		"L":InstructGameKeyF("L"),
		"M":InstructGameKeyF("M"),
		"N":InstructGameKeyF("N"),
		"O":InstructGameKeyF("O"),
		"P":InstructGameKeyF("P"),
		"Q":InstructGameKeyF("Q"),
		"R":InstructGameKeyF("R"),
		"S":InstructGameKeyF("S"),
		"T":InstructGameKeyF("T"),
		"U":InstructGameKeyF("U"),
		"V":InstructGameKeyF("V"),
		"W":InstructGameKeyF("W"),
		"X":InstructGameKeyF("X"),
		"Y":InstructGameKeyF("Y"),
		"Z":InstructGameKeyF("Z"),
		"Shift A":InstructGameKeyF("A"),
		"Shift B":InstructGameKeyF("B"),
		"Shift C":InstructGameKeyF("C"),
		"Shift D":InstructGameKeyF("D"),
		"Shift E":InstructGameKeyF("E"),
		"Shift F":InstructGameKeyF("F"),
		"Shift G":InstructGameKeyF("G"),
		"Shift H":InstructGameKeyF("H"),
		"Shift I":InstructGameKeyF("I"),
		"Shift J":InstructGameKeyF("J"),
		"Shift K":InstructGameKeyF("K"),
		"Shift L":InstructGameKeyF("L"),
		"Shift M":InstructGameKeyF("M"),
		"Shift N":InstructGameKeyF("N"),
		"Shift O":InstructGameKeyF("O"),
		"Shift P":InstructGameKeyF("P"),
		"Shift Q":InstructGameKeyF("Q"),
		"Shift R":InstructGameKeyF("R"),
		"Shift S":InstructGameKeyF("S"),
		"Shift T":InstructGameKeyF("T"),
		"Shift U":InstructGameKeyF("U"),
		"Shift V":InstructGameKeyF("V"),
		"Shift W":InstructGameKeyF("W"),
		"Shift X":InstructGameKeyF("X"),
		"Shift Y":InstructGameKeyF("Y"),
		"Shift Z":InstructGameKeyF("Z"),
		"Escape":InstructGameKeyF("Escape"),
		
		"Backspace":ObtainUndo,
		"Delete":ObtainUndo,
		"Ctrl U":ObtainUndo,
		"Alt Z":ObtainUndo,
		"Ctrl Z":ObtainUndo,
		
		"Shift Backspace":ObtainRedo,
		"Shift Delete":ObtainRedo,
		"Alt Y":ObtainUndo,
		"Ctrl Y":ObtainRedo,
		
		"Ctrl Backspace":ObtainRestart,
		"Ctrl Delete":ObtainRestart,

		"Spacebar":InstructGameKeyF("space"),
		"Enter":InstructGameKeyF("Enter"),
		"Left":InstructGameKeyF("left"),
		"Up":InstructGameKeyF("up"),
		"Right":InstructGameKeyF("right"),
		"Down":InstructGameKeyF("down"),
	};

	keyactions["undo"]=ObtainUndo;			//Onscreen keyboard
	keyactions["redo"]=ObtainRedo;			//Onscreen keyboard
	keyactions["restart"]=ObtainRestart;	//Onscreen keyboard

	keyactions[ObtainMainKey("undo")]=ObtainUndo;
	keyactions[ObtainMainKey("redo")]=ObtainRedo;
	keyactions[ObtainMainKey("restart")]=ObtainRestart;

	return keyactions;
};

function ObtainKeyActionsGameBar(){
	var KAGB=KeyActionsGameBar();
	KAGB[ObtainMainKey("keyboard")]=RequestKeyboard;
	return KAGB;
}

function InstructNothing(){
	return function(ev){
		ev.preventDefault();
		ForbidCaret();
	}
}

function InstructGameKeyF(key){
	return function(ev){
		if(ev)
			ev.preventDefault();
		GameKey(key);
		PulseSelect("#choice-"+key);		//Onscreen keyboard
	}
}

function GameKey(key){
	var key=ObtainSymbol(key); //accept keywords space, dot, dash
	function Action(){return InstructGameAction(key);}
	Throttle(Action,50,"Action");
}


function LevelAction(key){
	if(key==="Escape"){
		ObtainTitleScreenLoader();
		return;
	 }

	if(ForbidEnterActions(key)||ForbidNumberActions(key)||ForbidSpaceActions(key)||ForbidArrowActions(key)){
		ForbidCaret();return;
	}

	if(AllowExtraUndoKey(key)){
		Undo();return;
	}
	
	else{
		if(Letters.array.length>=50||AllowExtraRestartKey(key)){//Max Char Limit (arbitrary, to fit screen)
			Restart();return;
		}
		else{
			LevelActions[CurLevelName()](key);
			RegisterMove(key);
		}
	}
	ObtainUpdateLevel();
	CheckWin();	
}

function TitleScreenAction(key){
	if(key!=="Escape")StartLevelFromTitle();
}

function InstructGameAction(key){
	if(InputBlocked())
		return;
	
	if(TitleScreen())
		TitleScreenAction(key)
	else
		LevelAction(key)
	
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
		// "Fuchsia",
		"Odd",
		"La rapide surprise",
		"Starting buds",//"Starting anew"
		"Order is all",
		"⠍⠕⠗⠎⠑"],CurLevelName())&&In(NumberCharacters,key));
}

function ForbidSpaceActions(key){
	return (!In([
		"Direct",
		"Reverse",
		"Second",
		"Follow",
		"Rotate",
		"Latent clones",
		"Shepherdess hence unladylike",
		"Nigeria",
		"Odd",
		"Dvorak",
		"La rapide surprise",
		"Starting buds",
		"Just cut and paste",
		"Order is all"
	],CurLevelName())&&In([" ","Space","space"],key));
}

function ForbidEnterActions(key){
	return (!In([
		"La rapide surprise",
		"Starting buds"
	],CurLevelName())&&In(["Enter"],key));
}

function ForbidArrowActions(key){
	return (!In([
		"Wasd",
		"La rapide surprise",
		"Starting buds",
	],CurLevelName())&&In(ArrowKeys,key));
}

var ArrowKeys=["left","up","right","down"].map(ObtainSymbol);

function AllowExtraUndoKey(key){
	return CurLevelName()==="Wasd"&&key==="Z";
}
function AllowExtraRestartKey(key){
	return CurLevelName()==="Wasd"&&key==="R";
}

function LevelWinSound(){
	var leveltitle=CurLevelName();
	var customsounds={
		"Deaf":function(){PlayChord("FACFACEGAC",750,0.5)}
	}
	if(In(customsounds,leveltitle))
		return customsounds[leveltitle];
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

function FormattedTitle(title){
	var level=title;
	if(title!=="Deaf")
		var title=title.toUpperCase();
	return "<p>"+title+"</p><p>"+LevelNotes(level)+"</p>";
}

function FormattedGoal(title){
	if(title==="Topological")
		return title.toUpperCase().split("").map(LetterHTML(title)).join("");
	else
		return title;
}

var LevelDifficulty={
	"Direct":1,				
	"Reverse":1,
	"Follow":1,
	"Consonant":2,
	"Second":2,
	"Rotate":3,
	//"Oppose":2,
	"Rise":1,
	"Falls":2,
	"Precedent":3,
	"Superior":4,
	//"Tangles":3,
	"Difference":5,
	//"Photocopier":???,
	"Symmetries":2,
	"Fillet":3,
	"Topological":4,
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
	//"Fuchsia":1,
	"Odd":3,
	"Latent clones":3,
	"Shepherdess hence unladylike":3,
	"Starting buds":4,
	"La rapide surprise":5,
	"Just cut and paste":3,
	"Order is all":4
};

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
	//"Fuchsia",
]

var SoundLevels=[
	"Wasd",
	"Deaf",
]

var VisualLevels=[
	"Rotate",
	"Symmetries",
	"Fillet",
	"Topological",
	"Wasd",
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

function LevelNotes(title){
	var extras="";
	if(In(SoundLevels,title))
		extras+=" "+ObtainSymbol("music");
	if(In(VisualLevels,title))
		extras+=" "+ObtainSymbol("eye");
	if(In(LanguageLevels,title))
		extras+=" "+ObtainSymbol("book");
	if(In(ExternalLevels,title))
		extras+=" "+ObtainSymbol("search");
	return LevelDifficultyStars(title)+extras;
}

function DisplayLevelNotes(){
	ConsoleAdd(LevelNotes(CurLevelName()));
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
	"Superior",				//Positional, Alphabetical, Retroactive
	//"Tangles",			//Alphabetical, Cyclic, Arithmethic, Proactive
	"Difference",			//Positional, Alphabetical, Arithmethic, Proactive, Retroactive
	//"Photocopier",		//Positional, Alphabetical, Arithmethic, Proactive, Retroactive

	"Symmetries",			//Shape, Retroactive
	"Fillet",				//Shape, Proactive 
	"Topological",			//Shape, Growth, Monoactive

	"Nokia 1998",			//Keyboard
	"Wasd",					//Keyboard, Emulation
	"Dvorak",				//Keyboard, Cyclic
	"ひらがな",				//Keyboard, Syllabe, Language, Encoding

	"Nigeria",				//Word, Mapping, Geography
	"Genetic.",				//Encoding, Word, Science
	"Anagram",				//Word, Mapping, Language, Once,
	"Ironclad",				//Encoding, Word, Science
	//"Fuchsia",			//Encoding
	"Deaf",					//Encoding, Music
	"⠍⠕⠗⠎⠑",			 //Encoding, Once
	"Dividi",				//Encoding, Arithmethic, Retroactive


	"Odd",								//Keyword, Positional, Retroactive, Subtractive
	"Latent clones",					//Keyword, Increment, Retroactive, Language
	"Shepherdess hence unladylike",		//Keyword, Swap, Retroactive, Language
	"Starting buds",				//Language
	"La rapide surprise",					//Keyword, Swap, Retroactive, Language
	"Just cut and paste",				//Keyword, Proactive, Redefinition
	"Order is all"						//Keyword, Proactive, Increment, Redefinition
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
	"Mon petit ami":"La rapide surprise"
}

function GoalCanonicalName(title){
	if(In(LevelGoalAliases,title)&&!In(LevelGoals,title))
		return LevelGoalAliases[title];
	else
		return title;
}

function ObtainLevelReader(level){
	if(typeof level==="string"){
		var levelname=GoalCanonicalName(level);
		return LevelGoals.indexOf(levelname);
	}else
		return level;
}

function ObtainLevelsWriter(solvedlevels){
	return solvedlevels.map(l=>LevelGoals[l]);
}

var LevelActions={
	"Direct":Direct,
	"Reverse":function(L){
		InputLetterBefore(L);
	},
	// "Oppose":function(A){
	// 	var Z=NumberLetter(25-LetterNumber(A)); 
	// 	InputLetterAfter(Z);		
	// },
	"Rise":function(L){
		var M=NumberLetter(Min(LetterNumber(L)+1,25)); 
		InputLetterAfter(M);
	},
	"Second":Second,

	"Follow":function (L){
		if(Letters.array.length>=1){
			var last=Last(Letters.array);
			DeleteLetterAfter();
			InputLetterAfter(L);
			InputLetterAfter(last);
		}
		else
			InputLetterAfter(L);
	},
	"Consonant":Consonant,
	"Falls":function (L){
		function LetterDown(Z){
			return NumberLetter(Max(LetterNumber(Z)-1,0));
		}
		Letters(Letters.array.map(LetterDown));
		InputLetterAfter(L);
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
		Caret(pos)
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
	},
	"Precedent":function (L){
		function ConditionF(K){return K===NumberLetter(Max(LetterNumber(L)-1,0));};
		function ChangeF(K){return L;};
		var m=ModifyLetters(ChangeF,ConditionF);
		if(!m)
			InputLetterAfter(L);
	},
	"Symmetries":Symmetries,
	"Fillet":Fillet,
	"Topological":Topological,
	"Dvorak":function (P){
		var n=Letters.array.map(function(L){return DvorakMapping["row_"+L]});
			n=Count(n,DvorakMapping["row_"+P]);
		var P=P;
		for(var i=1;i<=n;i++)
			if(In(DvorakMapping,P))
				P=DvorakMapping[P];
		InputLetterAfter(P);
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
	},
	"Shepherdess hence unladylike":function(L){
		InputLetterAfter(L);
		Letters(StringReplaceOnceRuleArray(Word(),GenderReplacementRules));
		Caret(Infinity);		
	},
	"Latent clones":Weightier,
	"Starting buds":StartingString,
	"La rapide surprise":Translate,
	"Nigeria":Nigeria,
	"ひらがな":function(L){
		InputLetterAfter(L);
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

function Wasd(W){
	if(!In("WASD",W)&&!In(ArrowKeys,W)){
		ForbidCaret();
		return;
	}

	var level=Memo();
	
	if(W==="W"||W===ObtainSymbol("up"))
		level=EmulateUp(level);
	if(W==="A"||W===ObtainSymbol("left"))
		level=EmulateLeft(level);
	if(W==="S"||W===ObtainSymbol("down"))
		level=EmulateDown(level);
	if(W==="D"||W===ObtainSymbol("right"))
		level=EmulateRight(level);

	Memo(level);
	
	var line=EmulateLine(level);
		line=line.replace(/\./g," ");

	if(Word()===line)
		Throttle(BumpSound,250);

	Letters(line);
	Caret(line.indexOf("W"));
}

function BumpSound(){
	Bump.play("C",2,0.2);
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
		last=L;
		Memo(last);
		Caret(0);
		return;
	}

	var pre=Caret()[0];
	Letter(pre,L);
	
	var pos=Max(pre,0)+LetterNumber(L)-LetterNumber(last);
	pos=Max(Min(pos,Letters.array.length),-1);
	last=L;
	Memo(last);
	Caret(pos);
	DrawLetters();
}

function Nokia(N){
		if(!NokiaMapping[N]){
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
		}
		else{
			var last=Last(Letters.array);
			var lastN=NokiaGroupNumber(last);
			var lastGroup=NokiaMapping[lastN];
			var lastPos=lastGroup.indexOf(last);
			if(N!==lastN||lastPos>=lastGroup.length-1){ //New Key or timing exceeded
				var L=NokiaMapping[N][0];
				NokiaInput(L);
			}
			else {//Modify
				DeleteLetterAfter();
				var M=lastGroup[lastPos+1];
				if(lastPos+1<lastGroup.length-1){
					NokiaInput(M);
					delta=500+1500*(lastGroup.length-1-lastPos)/lastGroup.length
				}
				else{
					InputLetterAfter(M);
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
		if(!NokiaTimer.blocked)
			DrawLettersEndCaret()
	}
	var newtimeout=setTimeout(Redraw,delta);
	Memo(newtimeout);
}

function Nigeria(L){
		var freeze=Memo();
		
		if(freeze){
			Memo(false);
			Restart();
			return;
		}
		
		InputLetterAfter(L+"*");
		
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

	if(!In("ANAGRAM".split(""),L)){
		Caret(Infinity);
		return;
	}
	else{
		InputLetterAfter(L+"*");
		var saved=SavedLetters();
		var anagr=TemporaryWord().toLowerCase();

		if(In(Anagrams,anagr)&&!In(used,anagr)){
			var S=Anagrams[anagr].toUpperCase();
			used.push(anagr);
			Letters(saved);
			InputLetterAfter(S);
		}
		else if(anagr.length>4){
			Letters(saved);
		}

		Memo(used);
		Caret(Infinity);
	}
}

function Ironclad(L){
	InputLetterAfter(L+"*");
	
	var saved=SavedLetters();
	var nulow=TemporaryWord().toLowerCase();

	if(In(Nuclei,nulow)){
		var elem=Nuclei[nulow].toUpperCase();
		Letters(saved.join("")+elem);
	}

	Caret(Infinity);
}

function Genetic(L){
	var L=L.replace("T","U");
	
	if(!In("ACGU",L)){
		ForbidCaret();
		return;
	}

	var saved=SavedLetters();
	var codon=TemporaryWord();
		codon=codon+L;
	
	if(codon.length<3){
		InputLetterAfter(L+"*")
	}
	else {
		Letters(saved);
		if(In(RNACodonsAminoacids,codon))
			InputLetterAfter(RNACodonsAminoacids[codon]);
	}

	Caret(Infinity);
}


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
	var piano = Synth.createInstrument('piano');

	var savednotes=SavedLetters();
	var tempnotes=TemporaryLetters();

	function AddSharp(){
		if(Last(tempnotes)!=="#*")
			InputLetterAfter("#*");
		else
			ForbidCaret();
	}

	function NotesLength(){
		return tempnotes.length-Count(tempnotes,"#*");
	}

	if(!In("ABCDEFG",L))
		AddSharp();
	else if(NotesLength()<3)
		InputLetterAfter(L+"*");
		
	var tempnotes=TemporaryLetters();
	var chord=tempnotes.map(PureLetter).join("");
		chord=FixedPoint(IncrementNote,chord);

	if(NotesLength()===3){
		Letters(savednotes);
		if(Prefixed(chord,"#"))
			return;

		PlayChord(chord);
		if(In(MajorChords,chord)){
			InputLetterAfter(MajorChords[chord]);
		}
		else if(In(MinorChords,chord)){
			InputLetterAfter(MinorChords[chord].toLowerCase());
		}
	}

	Caret(Infinity);
}


function Direct(L){
		InputLetterAfter(L);
};

function Second(L){
	var nd=Memo();
	Memo(!nd);
	
	if(nd)
		DeleteLetterBefore();
	
	InputLetterAfter(L);
}

function Consonant(L){
	if(L==="Y"){//semi-vowel
		ForbidCaret();
		return;
	}

	var before=Memo();
	if(!before)
		InputLetterBefore(L);
	else
		InputLetterAfter(L)
	
	before=!In(["A","E","I","O","U"],L);
	Memo(before);

	if(!before)
		Caret(-1);
	else
		Caret(Letters().length);
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
		return;
	}
	
	used.push(L);
	Memo(used);

	var dotdash=MorseCode[L.toLowerCase()].split("");

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

//Dividi

function Dividi(L){
	if(!In(uniNumerals,L))
		return ForbidCaret();

	word=Word();
	last=LastValidRoman(word);
		
	if(!ValidRoman(last+L)){
		DeleteLetterAfter(last.length);
		var q=Quotient(UnRoman(last),2);
		Letters(Word()+Roman(q));
	}
		
	InputLetterAfter(L);
}
	
//Copypaste

function Copypaste(L){
	InputLetterAfter(L);

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

	var word=Letters().join("");
//	var pattern=/(.+)IS(.+)/;
	var pattern=/\s*([^\s]+)\s+IS\s+([^\s]+)\s*/;
	if(pattern.test(word)){
		var subject=word.replace(pattern,"$1");
		var object=word.replace(pattern,"$2");
		rules.push([subject,object]);
		word=word.replace(pattern,"");
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
	Letters(InflateNumbers(Word().toLowerCase()).toUpperCase());
	Caret(Infinity);
	return;
}

function ArrowDisplay(word){
	return ObtainSymbol("left")+word+ObtainSymbol("right");
}

function Translate(L){
	var choosing=false;
	if(Memo()){
		
		SkipUndo();//convenience

		choosing=Memo();
		var interpretations=choosing.interpretations;
		var prefix=choosing.prefix;
		var p=choosing.p;
		
		if(In([" ","Enter"],L))//,"X","C"
			choosing=false;
		else if(In(NumberCharacters,L))
			p=(Number(L)-1)%interpretations.length;
		else if(In(["left","up"].map(ObtainSymbol),L))//In("WAQZERTYUIOP",L)||
			p=(p+interpretations.length-1)%interpretations.length;
		else if(In(["right","down"].map(ObtainSymbol),L))//In("SDFGHJKLVBNM",L)||
			p=(p+interpretations.length+1)%interpretations.length;
		else	
			choosing=false;

		if(interpretations.length===1)
			choosing=false;
		
		choosing.p=p;
		
		Memo(choosing);
		var word=prefix+interpretations[p];

		if(choosing&&interpretations.length>1)
			word=prefix+ArrowDisplay(interpretations[p]);

	}else{
		if(In(NumberCharacters,L)||L==="Enter"||In(ArrowKeys,L))
			return;
		InputLetterAfter(L);
		var word=Word().toLowerCase();

		var i=0;
		var found=false;
		var suffix=word;
		var prefix="";

		while(!found&&i<word.length){
			suffix=word.slice(i,Infinity);
			prefix=word.slice(0,i);
			var interpretations=Translator(suffix);
			
			//Multiple translation convenient ordering:
			//Suffix first
			if(In(interpretations,suffix)){
				interpretations=interpretations.filter(x=>x!==suffix);
				interpretations=[suffix].concat(interpretations);
			}
			//Near goal first
			var goal="La rapide surprise".toLowerCase();
			interpretations=interpretations.filter(i=>Prefixed(goal,prefix+i)).concat(interpretations.filter(i=>!Prefixed(goal,prefix+i)))
			
			found=(IsArray(interpretations)&&interpretations.length>0);
			if(found){
				if(interpretations.length>1)
					word=prefix+ArrowDisplay(interpretations[0]);
				else
					word=prefix+interpretations[0];
				var p=0;
				Memo({
					interpretations:interpretations,
					prefix:prefix,
					p:p
				});
				choosing=true
			}
			else
				i++;
		}
	}

	word=word.toUpperCase();
	Letters(word);

	if(choosing){
		var i=prefix.length;
		var arrowextend=(interpretations.length>1?2:0);
		Caret(Range(i,i+interpretations[p].length-1+arrowextend));
	} else
		Caret(Infinity);
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

//String Completing

function StartingString(L){
	var choosing=false;
	if(Memo()){		
		
		SkipUndo();//convenience

		choosing=Memo();
		var possibilities=choosing.possibilities;
		var p=choosing.p;
		
		if(In([" ","Enter"],L))
			choosing=false;
		else if(In(NumberCharacters,L))
			p=(Number(L)-1)%possibilities.length;
		else if(In(["left","up"].map(ObtainSymbol),L))
			p=(p+possibilities.length+1)%possibilities.length;
		else if(In(["right","down"].map(ObtainSymbol),L))
			p=(p+possibilities.length-1)%possibilities.length;
		else	
			choosing=false;

		if(possibilities.length===1)
			choosing=false;
		
		choosing.p=p;
		
		Memo(choosing);
		var word=possibilities[p];

		if(choosing&&possibilities.length>1)
			word=ArrowDisplay(possibilities[p]);

	}
	else{			
		if(In(NumberCharacters,L)||L==="Enter"||In(ArrowKeys,L))
			return;

		var L=L.toLowerCase();
		var sentence=Word().toLowerCase();
		function ValidWord(word){return In(EnDictionary(),word)};
		var possibilities=[];
		var inserted;
		for(var i=0;i<=sentence.length;i++){
			inserted=Insert(sentence,L,i);
			if(inserted.split(" ").map(ValidWord).every(Identity))
				possibilities.push(inserted);
		}
		possibilities=Unique(possibilities);
		if(possibilities.length===0){
			ForbidCaret();
			return;
		}

		word=possibilities[0];
		if(possibilities.length>1){
			word=ArrowDisplay(word);
			Memo({
				possibilities:possibilities,
				p:0
			});
		}
		else
			Memo(false)
			
	}

	Letters(word.toUpperCase());
	Caret(Range(0,word.length-1));
}

function EnDictionary(){
	if(!EnDictionary.list){
		EnDictionary.list=Plurals.concat(Superlatives).concat(Keys(NamesEnFr)).concat(Keys(AdjectivesEnFr)).concat(Keys(VerbsEnFr)).concat(Keys(InterjEnFr)).concat(Keys(AdverbsExtrasEnFr));
		EnDictionary.list=EnDictionary.list.concat([
			"starring",
			"si",
			//"tinging",//ingling	"tining",
			// "ar",
			// "irs",
			// "ing","ings","si","ting","tings","rin","rins","ping","pings","oping","pring","pling","plings","piling","pilings","til","tint","tints","comping","compting"
		]);
	}
	return EnDictionary.list;
}



//Fillet

function Fillet(E){
	var p=Memo();

	var max="Fillet".length;
	var pnext=(p+1)%max;

	Letters.array[p]=FilletHalves[E][0]+(Letters.array[p]?SplitHalves(Letters.array[p])[1]:"_");
	Letters.array[pnext]=(Letters.array[pnext]?SplitHalves(Letters.array[pnext])[0]:"_")+FilletHalves[E][1];

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

function Symmetries(O){
	var direction=Memo();

	if(In("SYMMETRIES",O)){
		if(direction)
			InputLetterAfter(O);
		else
			InputLetterBefore(O);
	}

	if(InversionSymmetric(O)){
		ModifyLetters(ToggleInversion);
		Letters.array=Letters.array.reverse();
		direction=!direction;
		Memo(direction);

		if(direction)
			Caret(Infinity);
		else
			Caret(-1);
	}
	if(HorizontalSymmetric(O)){
		ModifyLetters(ToggleHorizontal);
		Letters.array=Letters.array.reverse();
		
		direction=!direction;
		Memo(direction);

		if(direction)
			Caret(Infinity);
		else
			Caret(-1);
	}
	if(VerticalSymmetric(O)){
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

function Topological(O){	
	if(Letters.array.length===0){
		InputLetterAfter(O);
	}
	else{
		var classO=HomeomorphicClass(O);
		var letters=Clone(Letters());

		function MorphInferior(i){
			var L=Letter(i);
			var classL=HomeomorphicClass(L);
			if(In(TopologyRequirement[classL],classO)){
				MorphLetter(L,O,"letters",Starter,Ender);
				function Starter(){
					BlockInput();
					BlockUndo();
				}
				function Ender(){
					Letter(i,O);
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
		if(!morphed)
			InputLetterAfter(O);
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


var NumberCharacters=["0","1","2","3","4","5","6","7","8","9"];
var Hexadecimal=["A","B","C","D","E","F"].concat(NumberCharacters);

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
	return Letters.array.join("");
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
	if(!Caret.array)
		Caret.array=[Letters().length]; //after last one

	if(typeof position==="undefined")
		return Caret.array;

	if(position==="Last")
		var position=Letters().length-1;
	if(position==="First")
		var position=0;

	if(IsArray(position))
		Caret.array=position;
	else{
		var position=Max(-1,Min(position,Letters().length));
		Caret.array=[position];	
	}
}

function UnDrawCaret(){
	Array.from(GetElement("#letters").children).filter(function(e){return e.innerHTML!==" "}).map(function(c){UnClass(c,"caret")});
	RemoveElement(".caret");
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
		Class(GetElement("#letters").children[p],"caret")
}

function DrawLettersEndCaret(){
	DrawLetters();
	Caret(Infinity);
	DrawCaret();
}

function LetterPureHTML(L,cla){
	var cla=cla?(' '+cla):'';
	if(L===" ")
		cla=cla+' space';
	if(L==="_"){
		cla=cla+' invisible';
		var L=" "}
	return "<div class='letter"+cla+"'>"+L+"</div>"
}


var LetterDisplay={
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
		S=MakeElement("<div class='superimpose'><div class='symmetry superimposed"+simclass+"'>"+PureLetter(L)+"</div><div>"+PureLetter(L)+"</div></div>");
		
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
			S=MakeElement("<div class='superimpose'><div class='superimposed half upper'>"+PureLetter(E[0])+"</div><div class='half lower'>"+PureLetter(E[1])+"</div></div>");
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
	"Topological":BezierLetterSVG
}

function BezierLetterSVG(L){
	return BezierLetter(L);
}

function LetterDraftHTML(L){
	if(In(L,"*"))
		return LetterPureHTML(PureLetter(L),'draft');
	else
		return LetterPureHTML(L);
}

function LetterHTML(levelName){
	if(TitleScreen()||!In(LetterDisplay,levelName))
		return LetterPureHTML;
	else
		return LetterDisplay[levelName];
}

function CaretHTML(){
	return "<div class='letter caret'> </div>"
}


function ClearLetters(){
	Letters([]);
	Caret(0);
	ObtainUpdateLevel();
}

function DrawLetters(){
	var letters=Letters().map(LetterHTML(CurLevelName())).join("\n");
	ReplaceChildren(letters,"#letters");
}


function DrawLevel(){
	DrawLetters();
	DrawCaret();
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
function CurLevelName(){return LevelGoals[CurLevelNumber()-1]};//placeholder

function ObtainTitleScreenLoader(){
	if(!TitleScreen())
		PlaySound("media/puzzle-type/sound/startgame.mp3");
	TitleScreen(true);
	ReplaceChildren("<div class='top'><div class='title'></div><div class='credits'></div></div>",".top");
	ReplaceChildren(gameTitle,".title");

	if(SolvedLevels().length>0)
		Letters("CONTINUE");
	else
		Letters("START");
	
	Caret(Infinity);
	DrawLevel();
	
};

function LevelLoader(){
	if(!CurLevelName())
		return ConsoleAdd("Error: no levels were loaded!");
	TitleScreen(false);
	ReplaceChildren("<div class='top'><div class='goal'></div></div>",".top");
	ClearLetters();
	var goal=FormattedGoal(CurLevelName());
	
	ReplaceChildren(goal,".goal");
	if(goal==="Deaf")
		Class(".goal","uncase");
	else
		UnClass(".goal","uncase");
	ClearLevel();
	ColoriseGameBar();//Change colour each level
	//DisplayLevelNotes();
}


function ObtainUpdateLevel(state){
	
	if(typeof state==="undefined")
		var state={
			letters:Letters(),
			caret:Caret(),
			memo:Memo()
			// colour:CaretColour()
		}

	
	LevelState(state);
	AddUndo(state);
	DrawLevel();
}

function CheckWin(){
	var win=WinnerTitle(CurLevelName())===Letters().join("").replace(/\_/g,"");
	
	if(win){
		if(!LevelWinSound())
			PlaySound("media/puzzle-type/sound/win"+RandomChoice("123")+".mp3");
		else
			PlayWinSound();
		MarkWonScreen();
		BlockInput(1100);
		setTimeout(NextLevel,1000);
		ClearLevel();
	}
}

function ObtainPlayEndGameSound(){
	PlaySound("media/puzzle-type/sound/wingame.mp3");
}

// function CaretColour(hex){
// 	if(!CaretColour.colour)
// 		CaretColour.colour=false;

// 	if(typeof hex==="undefined")
// 		return CaretColour.colour;

// 	CaretColour.colour=hex;

// 	RemoveElement(".overcolour");
// 	if(CaretColour.colour)
// 		AddSingleElement("<style class='overcolour'>.letter{--letterOn:"+CaretColour.colour+";--letterMid:"+CaretColour.colour+"}</style>",'BODY','.overcolour');

// 	return CaretColour.colour;
// }

// function StartingColour(title){
// 	var colours={
// 		"Fuchsia":ObtainFGColor()
// 	}
// 	if(In(colours,title))
// 		return colours[title]
// 	else
// 		return false;
// }

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
//Level states

function Memo(m){

	if(typeof Memo.memo==="undefined")
		Memo.memo=StartingMemo(CurLevelName());

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
		'La rapide surprise':false,
		'Starting buds':false
	};
	return zeromemo[level];
}

function EffectRenderer(level){
	var timers={
		'Nokia 1998':function(){NokiaTimer.blocked=true},
	};
	if(!level)
		return EffectRenderer(CurLevelName());
	if(In(timers,level))
		return timers[level]();
	else
		return;
}


function ObtainStartingLevelState(){
	var state={
		'letters':[],
		'caret':0,
		'memo':StartingMemo(CurLevelName())
		// 'colour':StartingColour(CurLevelName())
	};
	return state;
}

function CurrentLevelState(){
	var state={
		'letters':Letters(),
		'caret':Caret(),
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
	Memo(state.memo);
	// CaretColour(state.colour);

}
