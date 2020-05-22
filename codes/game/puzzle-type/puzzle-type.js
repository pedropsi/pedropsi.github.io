///////////////////////////////////////////////////////////////////////////////
//Puzzle Type (c) Pedro PSI, 2019-2020.
//All rights reserved
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////


function GameFrameHTML(){
	return "<div class='game-supra-Canvas'>\
				<div class='game' id='gameCanvas'>\
				</div>\
			</div>";
}

function GameTitleHTMLArray(){
return ["<div class='top'>\
			<h1 class='goal'>Puzzle Type</h1>\
		</div>",
		"<div class='middle' id='letters'>\
		</div>"];
}

function ComingHTMLArray(){
return ["<div class='top'>\
			<h1 class='goal'>Puzzle Type</h1>\
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
	return HEX(Huen(basecolour,(MaxLevel()-CurLevelNumber()+1)/(MaxLevel()-1)*360)).colour;
}

//Restart and Undo
function ObtainRestartAllowed(){return true;}
function ObtainUndoAllowed(){return true;}
var ObtainUndo=function(){Undo();PulseSelect("#choice-"+"undo")};					//With Onscreen keyboard
var ObtainRestart=function(){Restart();PulseSelect("#choice-"+"restart")};			//With Onscreen keyboard

function ObtainMainKey(action){
	if(!action)
		return {
			"undo":"Alt Z",
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
"data/game-intro.js"
]

var gameModulesLater=[
"chords",
"codons",
"countries",
"lang-gender",
"lang-kana",
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
]

LoadSources(gameModulesEarly,P()?GameIntro:Identity);
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
	var tokens=["PatrickEye","Plurmorant","mago314","Deusovi","minotalen"];
	var apptokens=tokens.map(function(t){return "homescreen-"+t});
	var manifest=GetElement("manifest");
	manifest.href=manifest.href.replace("homescreen","homescreen-"+pagetag);
	return In(tokens,pagetag)||In(apptokens,PageSearch("source"));
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
		
		"Shift Backspace":ObtainRestart,
		"Shift Delete":ObtainRestart,
		
		"Spacebar":InstructGameKeyF("space"),
		"Enter":InstructGameKeyF("Enter"),
		"Left":InstructGameKeyF("Left"),
		"Up":InstructGameKeyF("Up"),
		"Right":InstructGameKeyF("Right"),
		"Down":InstructGameKeyF("Down"),
	};

	keyactions["undo"]=ObtainUndo;			//Onscreen keyboard
	keyactions["restart"]=ObtainRestart;	//Onscreen keyboard

	keyactions[ObtainMainKey("undo")]=ObtainUndo;
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
	UpdateLevel();
	CheckWin();	
}

function TitleScreenAction(key){
	if(key!=="Escape")StartLevelFromTitle();
}

function InstructGameAction(key){
	
	if(BlockInput.blocked)
		return;
	
	if(TitleScreen())
		TitleScreenAction(key)
	else
		LevelAction(key)
	
	GameFocus();
};

function BlockInput(duration){
	var duration=duration||1000;
	BlockInput.blocked=true;
	function UnblockInput(){BlockInput.blocked=false;}
	setTimeout(UnblockInput,duration);
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
		"Topological",
		"Nokia 1998",
		// "Fuchsia",
		"Deaf",
		"Odd",
		"Mon petit ami",
		"This is it",
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
		"Deaf",
		"Dvorak",
		"Mon petit ami",
		"Just cut and paste",
		"This is it"
	],CurLevelName())&&In([" ","Space","space"],key));
}

function ForbidEnterActions(key){
	return (!In([
		"Mon petit ami",
	],CurLevelName())&&In(["Enter"],key));
}

function ForbidArrowActions(key){
	return (!In([
		"Wasd",
		"Mon petit ami",
	],CurLevelName())&&In(ArrowKeys,key));
}

var ArrowKeys=["Left","Up","Right","Down"];

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
function FormattedTitle(title){
	if(title==="Deaf")
		return title;
	else
		return title.toUpperCase();
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

	"Wasd",					//Keyboard, Emulation
	"Nokia 1998",			//Keyboard
	"Dvorak",				//Keyboard, Cyclic

	"ひらがな",				//Keyboard, Syllabe, Language, Encoding
	"Nigeria",				//Word, Mapping, Geography
	"Genetic.",				//Encoding, Word, Science
	"Anagram",				//Word, Mapping, Language, Once,
	"Ironclad",				//Encoding, Word, Science
	"Deaf",					//Encoding, Music
	"⠍⠕⠗⠎⠑",			 //Encoding, Once
	"Dividi",				//Encoding, Arithmethic, Retroactive

	//"Fuchsia",						//Encoding

	"Odd",								//Keyword, Positional, Retroactive, Subtractive
	"Latent clones",					//Keyword, Increment, Retroactive, Language
	"Shepherdess hence unladylike",		//Keyword, Swap, Retroactive, Language
	"Mon petit ami",					//Keyword, Swap, Retroactive, Language
	"Just cut and paste",				//Keyword, Proactive, Redefinition
	"This is it"						//Keyword, Proactive, Increment, Redefinition
];


var LevelActions={
	"Direct":Direct,
	"Reverse":function(L){
		InputLetterBefore(L);
	},
	"Oppose":function(A){
		var Z=NumberLetter(25-LetterNumber(A)); 
		InputLetterAfter(Z);		
	},
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
		function ConditionF(K){return K===NumberLetter(LetterNumber(L)-1);};
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
	"This is it":Baba,
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
	"Mon petit ami":Translate,
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
	
	if(W==="W"||W==="Up")
		level=EmulateUp(level);
	if(W==="A"||W==="Left")
		level=EmulateLeft(level);
	if(W==="S"||W==="Down")
		level=EmulateDown(level);
	if(W==="D"||W==="Right")
		level=EmulateRight(level);

	Memo(level);
	
	var line=EmulateLine(level);
	Letters(line.replace(/\./g," "));
	Caret(line.indexOf("W"));
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


function Fuchsia(L){
	var colour=Memo().colour;
	var used=Memo().used;
	var freeze=Memo().freeze;


	function NewColour(){
		ClearLetters();
		ForbidCaret();
		Memo({
			colour:colour,
			used:used,
			freeze:false
		});
	}
	
	
	if(freeze){
		NewColour();
		return;
	}
	
	if(!In(Hexadecimal,L))
		L="#";
	// else if(In(Hexadecimal,L)&&In(used,L)){
	//  	ForbidCaret();
	//  	return;
	// }
	// else {
	// 	used=used+L;
	// 	Memo({
	// 		colour:colour,
	// 		used:used,
	// 		freeze:freeze
	// 	});
	// }
	
	InputLetterAfter(L+"*");
	
	if(Letters.array.length===7){
		var letters=PureLetter(Word());
		var f=First(letters);
		var r=Rest(letters);
		if(f!=="#"||r.replace("#","").length!==r.length){
			ClearLetters();
			ForbidCaret();
			return;
		}
		else{
			PopUndo();
			var hex=PureLetter(Word());
			console.log(hex,colour,MultiplyHEX(hex,colour));
				hex=PlusHEX(hex,RotateHEX(colour));
			var colourname=NamedColour(hex);
				colourname=ColourApproximationString(hex,colourname);
			Letters(colourname.toUpperCase());
			Caret(Infinity);
			CaretColour(hex);
			Memo({
				colour:hex,
				used:used,
				freeze:true
			});
			return;
		}
	}
	Caret(Infinity);
}

function ColourApproximationString(colorstring,name){
	var chosen=ColourNames.filter(function(c){return c[3]===name})[0];
	var rgb=RGB(Colour(colorstring)).colour;
	if(!Equal(rgb,Most(chosen)))
		return "almost "+name+" ("+colorstring+")";
	else
		return name;
}


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
	var pattern=/\s*([^\s]+)\s+IS\s+([^\s]+)\s*/;
	if(pattern.test(word)){
		var subject=word.replace(pattern,"$1");
		var object=word.replace(pattern,"$2");
		rules.push([subject,object]);
		word=word.replace(pattern,"");
		Letters(word);
	}
	
	for (var i=0;i<rules.length;i++){
		word=StringReplace(word,rules[i]);
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

function Translate(L){
	var choosing=false;
	if(Memo()){
		
		PopUndo();//convenience

		choosing=Memo();
		var interpretations=choosing.interpretations;
		var prefix=choosing.prefix;
		var p=choosing.p;
		
		if(In([" ","Enter"],L))//,"X","C"
			choosing=false;
		else if(In(NumberCharacters,L))
			p=(Number(L)-1)%interpretations.length;
		else if(In(["Left","Up"],L))//In("WAQZERTYUIOP",L)||
			p=(p+interpretations.length-1)%interpretations.length;
		else if(In(["Right","Down"],L))//In("SDFGHJKLVBNM",L)||
			p=(p+interpretations.length+1)%interpretations.length;
		else	
			choosing=false;

		if(interpretations.length===1)
			choosing=false;
		
		choosing.p=p;
		
		Memo(choosing);
		var word=prefix+interpretations[p];

		if(choosing&&interpretations.length>1)
			word=prefix+"◀"+interpretations[p]+"▶";

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
			var interpretations=interpretations.filter(i=>!Prefixed(i,"-")).filter(i=>!In(i," "));
			found=(IsArray(interpretations)&&interpretations.length>0)//&&!In(interpretations,suffix))
			if(found){
				if(interpretations.length>1)
					word=prefix+"◀"+interpretations[0]+"▶";
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

function MiniWordSearch(){
	var words=Keys(NamesEnFr).filter(n=>
		!In(n,"a")&&
		!In(n,"i")&&
		!In(n,"be")&&
		NamesEnFr[n].filter(m=>In([3,4,5],m.length)).length);
	return Unique(words.map(w=>NamesEnFr[w].filter(m=>In([3,4,5],m.length))).flat());
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
	function InputBaseLetter(L){
		if(In(["I"],HomeomorphicClass(L)))
			InputLetterAfter(L);
		//else
		//	InputLetterAfter("I");
	}

	if(Letters.array.length===0){
		InputBaseLetter(O);
	}
	else{
		var L=Last(Letters.array);
		var classO=HomeomorphicClass(O);
		var classL=HomeomorphicClass(L);
		if(In(HomeomorphismRequirement[classO],classL)){
			DeleteLetterAfter();
			InputLetterAfter(O);
		}
		else
			InputBaseLetter(O);
	}
	Caret(Infinity);
}

var Homeomorphism={
	"A":["A","R"],
	"B":["B","8"],
	"H":["H","K"],
	"I":["C","G","I","J","L","M","N","S","U","V","W","Z","1","2","5","7"],
	"O":["D","O","0"],
	"P":["P","6","9"],
	"Q":["Q","4"],
	"X":["X"],
	"Y":["E","F","T","Y","3"],
}

var HomeomorphismRequirement={
	"A":["P","H"],
	"B":["A"],
	"H":["Y"],
	"I":[],
	"O":["I"],
	"P":["O","Y"],
	"Q":["P","X"],
	"X":["Y"],
	"Y":["I"]
}

function HomeomorphicClass(O){
	var classes=Object.keys(Homeomorphism);
	if(In(classes,O))
		return O;
	else{
		for(var i in classes){
			if(In(Homeomorphism[classes[i]],O))
				return classes[i];
		}
		return null;
	}
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
	"Nigeria":LetterDraftHTML
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
	UpdateLevel();
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
	ReplaceChildren("Puzzle Type",".title");

	if(CurLevelNumber()>1||SolvedLevels().length>0)
		Letters("CONTINUE");
	else
		Letters("START");
	
	Caret(Infinity);
	DrawLevel();
	
};

function LevelLoader(){
	TitleScreen(false);
	ReplaceChildren("<div class='top'><div class='goal'></div></div>",".top");
	ClearLetters();
	var title=CurLevelName();
	ReplaceChildren(title,".goal");
	if(title==="Deaf")
		Class(".goal","uncase");
	else
		UnClass(".goal","uncase");
	ClearLevel();
	ColoriseGameBar();//Change colour each level
}


function UpdateLevel(state){
	
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
	var win=FormattedTitle(CurLevelName())===Letters().join("").replace(/\_/g,"");
	
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
		'This is it':[],
		'Mon petit ami':false
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


function StartingLevelState(){
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
		LevelState.level=StartingLevelState();

	if(typeof state==="undefined")
		state=LevelState.level;
	else
		LevelState.level=state;
		
	Letters(state.letters);
	Caret(state.caret);
	Memo(state.memo);
	// CaretColour(state.colour);

}



///////////////////////////////////////////////////////////////////////////////
//Undo & Restart

function Restart(){
	UpdateLevel(StartingLevelState());

	PulseSelect("RestartButton");
}


function EmptyUndo(){
	Undo.backups=[StartingLevelState()];
}

function AddUndo(state){
	if(!Undo.backups)
		EmptyUndo();

	if(!Equal(Last(Undo.backups),state))
		Undo.backups.push(state);
}

function PopUndo(){
	if(!Undo.backups||Undo.backups.length<=1)
		EmptyUndo();
	else
		Undo.backups.pop(); 

	return Last(Undo.backups);
}

function Undo(){
	var laststate=PopUndo();
	
	LevelState(laststate);
	
	EffectRenderer();
	DrawLevel();
	
	PulseSelect("UndoButton");
}

function ClearLevel(){
	EmptyUndo();
	LevelState(StartingLevelState());
}
