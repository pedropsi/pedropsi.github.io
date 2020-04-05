///////////////////////////////////////////////////////////////////////////////
//Puzzle Type (c) Pedro PSI, 2019-2020.
//All rights reserved
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

/*
// Level Ideas todo, maybe
--positional caret
--leetspeek
--calculatorspeak
--Fur elise must write the first notes (letters give sharps and bemol)
--phonetic alphabet?
*/

function LoadGameHTML(frameHTML){

}

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
		"<div class='middle' id='letters'>Coming soon!\
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
function ObtainNewGameCondition(){return SolvedLevels().length<1};
function ObtainStateScreens(){return LevelGoals;}
function ObtainLevelTitle(l){return LevelGoals[l-1].toUpperCase();}
var ObtainLevelLoader=LevelLoader;

//Resize canvas
function ResizeCanvas(){return ;}
function ObtainXYRotateCondition(x,y){return false;}

//Onscreen Keyboard
function ObtainKeyboardKeys(){
	return DefaultKeyboardKeys().concat(GameKeyboardKeys());
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
"data-game-colours-names",
"data-game-roman"
]

LoadSources(gameModulesEarly,GameIntro);
gameModulesLater.map(LoaderInFolder("codes/game/modules"));

function GameIntro(){
	RemoveElement("game-supra-Canvas");
	PrependElement(GameFrameHTML(),".main");
	GameFocus();
	LoadStyle(PageRoot()+"codes/game/puzzle-type/puzzle-type.css");
	if(P())
		setTimeout(function(){PlayIntro(".game",StartGame)},100);
	else
		ComingHTMLArray().map(function(html){OpenElement(html,"gameCanvas")});

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
	var pagetag=PageTag();
	var tokens=["mago314","Deusovi","minotalen","test"];
	var apptokens=tokens.map(function(t){return "homescreen-"+t});
	var manifest=GetElement("manifest");
	manifest.href=manifest.href.replace("homescreen","homescreen-"+pagetag);
	return In(tokens,pagetag)||Purchased()||In(apptokens,PageSearch("source"));
}



///////////////////////////////////////////////////////////////////////////////
//Keybinding
function ObtainKeyActionsGame(){
	var keyactions={
		".":InstructGameKeyF("."),
		"-":InstructGameKeyF("-"),
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
		
		"Spacebar":InstructGameKeyF("Enter"),
		"Enter":InstructGameKeyF("Enter"),
		"Left":InstructNothing,
		"Up":InstructNothing,
		"Right":InstructNothing,
		"Down":InstructNothing
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
	function Action(){return InstructGameAction(key);}
	Throttle(Action,50,"Action");
}


function LevelAction(key){
	if(key==="Escape"){
		ObtainTitleScreenLoader();
		return;
	 }	
	
	if(key==="Enter"||ForbidNumberActions(key)||ForbidSymbolActions(key)){
		ForbidCaret();return;
	}
	else{
		LevelActions[CurLevelName()](key);
		RegisterMove(key);
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
	PulseSelect(".caret","forbidden",500);
}

function ForbidNumberActions(key){
	return (!In(["Nokia 1998","Symmetric","Fuchsia"],CurLevelName())&&In(NumberCharacters,key));
}

function ForbidSymbolActions(key){
	return (!In(["-----.-....."],CurLevelName())&&In(["-","."],key));
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
var LevelGoals=[			//Required types of thinking:
	//Positional, Spacial, Alphabetical, Syllabe, Word, Adjacent, Cyclic, Mapping, Language, Knowledge, Cultural, Retroactive, Proactive,
	"Direct",				

	"Reverse",				//Positional,
//	"Alternate",			//Positional,
	"Consonant",			//Positional, Alphabetical
	"Follow",				//Positional, Retroactive
	"Second",				//Retroactive
	"Rotate",				//Positional, Spacial, Retroactive

	"Oppose",				//Alphabetical, Mapping
	"Rise",					//Alphabetical, Adjacent
	"Falls",				//Alphabetical, Adjacent, Retroactive

	"Superior",				//Alphabetical, Retroactive
	"Precedent",			//Alphabetical, Adjacent, Retroactive
	"Tangles",				//Alphabetical, Cyclic, Proactive

	"Symmetric",			//Spacial, Cyclic
	"Homeomorphic",			//Spacial, Cyclic, Proactive

	"Dvorak",				//Spacial, Cyclic, Mapping, Cultural
	"Nokia 1998",			//Spacial, Mapping, Cultural
	"-----.-.....",			//Language, Mapping
	"ひらがな",				//Syllabe, Mapping, Language

	"Nigeria",				//Spacial, Word, Mapping, Knowledge, Retroactive
	"Weightier",			//Word, Adjacent, Retroactive
	"CherishedWoman",		//Word, Retroactive
	"Odd",					//Word, Positional, Retroactive

	"Fuchsia",				//Language, Knowledge, Retroactive
	"Dividi",				//Retroactive, Mapping, Language

	"Anagram",				// Word, Mapping, Retroactive
	"Nucleus"				//Syllabe, Word, Language, Mapping, Knowledge, Retroactive
	];


var LevelActions={
	"Direct":Direct,
	"Reverse":function(L){
		InputLetterBefore(L);
	},
	"Oppose":function(A){
		var Z=NumberLetter(25-LetterNumber(A)); 
		InputLetter(Z);		
	},
	"Rise":function(L){
		var M=NumberLetter(LetterNumber(L)+1); 
		InputLetter(M);
	},
	"Second":Second,
//	"Alternate":Alternate,
	"Follow":function (L){
		if(Letters.array.length>=1){
			var last=Last(Letters.array);
			DeleteLetterAfter();
			InputLetter(L);
			InputLetter(last);
		}
		else
			InputLetter(L);
	},
	"Consonant":Consonant,
	"Falls":function (L){
		function LetterDown(Z){
			return NumberLetter(LetterNumber(Z)-1);
		}
		Letters.array=Letters.array.map(LetterDown);
		InputLetter(L);
	},
	"Superior":function (L){
		if(Letters.array.length>0&&LetterNumber(L)>=LetterNumber(Last(Letters.array)))
			DeleteLetterAfter();
		InputLetter(L);
	},
	"Nokia 1998":Nokia,
	"Rotate":function (L){
		InputLetter(L);
		if(Letters.array.length%2===0)
			Letters.array=FlipArray(Letters.array);
	},
	"Precedent":function (L){
		function ConditionF(K){return K===NumberLetter(LetterNumber(L)-1);};
		function ChangeF(K){return L;};
		var m=ModifyLetters(ChangeF,ConditionF);
		if(!m)
			InputLetter(L);
	},
	"Symmetric":Symmetric,
	"Homeomorphic":Homeomorphic,
	"Dvorak":function (P){
		var n=Letters.array.length;
		var P=P;
		for(var i=1;i<=n;i++)
			if(In(DvorakMapping,P))
				P=DvorakMapping[P];
		InputLetter(P);
	},
	"Tangles":function (L){
		if(Letters.array.length==="Tangles".length){
			Restart();
			return;
		}
		
		if(Letters.array.length<1){
			InputLetter(L);
		}
		else{
			var A=PureLetter(Last(Letters.array));
			DeleteLetterAfter();
			InputLetter(NumberLetter(LetterNumber(L)+LetterNumber(A)+1));
		}
		
		if(Letters.array.length==="Tangles".length-1)
			InputLetter(L);
		else
			InputLetter(L+"*");
		
	},
	"Dividi":Dividi,
	"Odd":function(L){
		InputLetter(L);
		if(In(Letters.array.join(""),"ODD")){
			var LA=[];
			for(var i=1;i<Letters.array.length;i=i+2){
				LA.push(Letters.array[i]);
			}
			Letters.array=LA;
		}
		PlaceEndCaret();		
	},
	"CherishedWoman":function(L){
		InputLetter(L);
		Letters.array=StringReplaceOnceRuleArray(Letters.array.join(""),GenderReplacementRules).split("");
		PlaceEndCaret();		
	},
	"Weightier":Weightier,
	"Nigeria":Nigeria,
	"ひらがな":function(L){
		InputLetter(L);
		Letters.array=StringReplaceRulesObject(Letters.array.join("").toLowerCase(),Hiragana).toUpperCase().split("");
		PlaceEndCaret();
	},
	"-----.-.....":Morse,
	"Fuchsia":Fuchsia,
	"Anagram":Anagram,
	"Nucleus":Nucleus
}

function Nokia(N){
		if(!Nokia.last)
			Nokia.last=[N,1];
		
		if(!NokiaMapping[N]){
			ForbidCaret();
			return;
		}
		else{
			var keygroup=NokiaMapping[N];
			if(Nokia.last[0]!==N||Nokia.last[1]>=keygroup.length){ //New Key
				InputLetter(keygroup[0]);
				Nokia.last=[N,1];
			}
			else {//Modify
				DeleteLetterAfter();
				InputLetter(keygroup[Nokia.last[1]]);
				Nokia.last[1]=Nokia.last[1]+1;
			}
		}
	}

function Nigeria(L){
		if(Nigeria.freeze){
			delete Nigeria.freeze;
			Restart();
			return;
		}
		
		InputLetter(L+"*");
		
		var i=Countries.indexOf(PureLetter(Letters.array.join("")))+1;
		if(i>0){
			Letters.array=Countries[Min(Max(i,0),Countries.length-1)].split("");
			Nigeria.freeze=true;
		}
		
		PlaceEndCaret();
	}

function Anagram(L){
	if(!Anagram.partial)
		Anagram.partial="";
	if(!Anagram.used)
		Anagram.used=[];
	if(!In("ANAGRAM".split(""),L)){
		PlaceEndCaret();
		return;
	}
	else{
		InputLetter(L+"*");
		Anagram.partial=Anagram.partial+L;
		var anagr=Anagram.partial.toLowerCase();
		console.log(Anagram.partial)

		if(In(Anagrams,anagr)&&!In(Anagram.used,anagr)){
			var S=Anagrams[anagr].toUpperCase();
			DeleteLetters(Anagram.partial.length);
			Anagram.partial="";
			Anagram.used.push(anagr);
			InputLetter(S);
		}
		
		if(anagr.length>4){
			DeleteLetters(Anagram.partial.length);
			Anagram.partial="";
			
		}
		PlaceEndCaret();
			return;
	}
}

function Nucleus(L){
		if(!Nucleus.partial)
			Nucleus.partial=[];

		var nulow=(Nucleus.partial.join("")+L).toLowerCase();
				
		if(InPart(Nuclei,nulow)){
			InputLetter(L+"*");	//VISUAL Feedback for temporary letters in lighter blue
			Nucleus.partial.push(L);
			if(In(Nuclei,nulow)){
				var elem=Nuclei[nulow].toUpperCase();
				DeleteLetters(nulow.length);
				Letters.array=(Letters.array.join("")+elem).split("");
				Nucleus.partial=[];
			}
		}
		else{
			DeleteLetters(nulow.length-1);
			Nucleus.partial=[];
		}
	PlaceEndCaret();
}

function Fuchsia(L){
	function Restart(){
		Fuchsia.colour=false;
		ForbidCaret();
		ClearLetters();
	}
	
	if(!Fuchsia.colour)
		Fuchsia.colour=false;
	else{
		Restart();
		return;
	}
	
	if(!In(Hexadecimal,L))
		L="#";
	
	InputLetter(L+"*");
	
	if(Letters.array.length===7){
		var letters=PureLetter(Letters.array.join(""));
		var f=First(letters);
		var r=Rest(letters);
		if(f!=="#"||r.replace("#","").length!==r.length){
			Restart();
			return;
		}
		else{
			var hex=PureLetter(Letters.array.join(""));
			var colour=NamedColour(hex);
			Letters.array=colour.toUpperCase().split("");
			
			AddSingleElement("<style class='overcolour'>.letter{color:"+hex+";border-bottom-color:"+hex+"} .letter.caret{background-color:"+hex+"}</style>",'BODY','.overcolour');
			setTimeout(function(){RemoveElement(".overcolour");},1000);

			Fuchsia.colour=true;
			return;
		}
	}
	PlaceEndCaret();
}

function DeleteLetters(n,beginning){
	var i=1;
	while(i<=n){
		if(!beginning)
			Letters.array.pop();
		else
			Letters.array=Letters.array.unshift();
		i++;
	}
}

function Direct(L){
		InputLetter(L);
};

function Second(L){
	if(!Second.n)
		Second.n=0;
	Second.n++;
	
	if(Second.n%2===0)
		DeleteLetterBefore();
	
	InputLetter(L);
}

/*
function Alternate(L){
	if(!Alternate.n)
		Alternate.n=0;
	
	if(Alternate.n){
		InputLetter(L);
		Caret(-1);
	}else{
		InputLetterBefore(L);
		Caret(Letters().length);
	}
	
	Alternate.n=1-Alternate.n;
}
*/

function Consonant(L){
	if(!Consonant.before)
		InputLetterBefore(L);
	else
		InputLetter(L)
	
	Consonant.before=!In(["A","E","I","O","U"],L);

	if(!Consonant.before)
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
	MorseCode[L.toLowerCase()].split("").map(InputLetter);
}

//Dividi

function Dividi(L){
	if(Letters.array.length>0){
		var last=Last(Letters.array);
		var q=Quotient(UnRoman(last),2);
		Letters.array.pop();
		Letters.array=(Letters.array.join("")+Roman(q)).split("");
	}
	
	if(!In(uniNumerals,L))
		ForbidCaret();
	else
		InputLetter(L);
	
	PlaceEndCaret();
}
	
//Weightier

function Weightier(L){
	InputLetter(L);
	Letters.array=InflateNumbers(Letters.array.join("").toLowerCase()).toUpperCase().split("");
	PlaceEndCaret();
	return;}

//Symmetric

function Symmetric(O){	
	if(HorizontalSymmetric(O))
		ModifyLetters(ToggleHorizontal);
	
	if(VerticalSymmetric(O))
		ModifyLetters(ToggleVertical);
	
	if(InversionSymmetric(O))
		ModifyLetters(ToggleInversion);

	
	if(In("SYMMETRIC",O)){
		InputLetter(O);
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

//Homeomorphic

function Homeomorphic(O){	
	var cla=HomeomorphicClass(O);
	
	function InHoCla(F){
		return (HomeomorphicClass(F)===cla?1:0);
	}
	
	function HomeomorphicAdvance(F,n){
		var p=Homeomorphism[cla].indexOf(F);
		return Homeomorphism[cla][(p+n)%(Homeomorphism[cla].length)];
	}
	
	var n=Letters.array.map(InHoCla);
	if(n.length===0)
		n=0
	else
		n=n.reduce(Accumulate);
	
	var O=HomeomorphicAdvance(O,n)
	
	InputLetter(O);
	
}

var Homeomorphism={
	"A":["A","R"],
	"B":["B"],
	"C":["C","G","I","J","L","M","N","S","U","V","W","Z"],
	"D":["D","O"],
	"E":["E","F","T","Y"],
	"H":["H","K"],
	"P":["P"],
	"Q":["Q"],
	"X":["X"]
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

var NumberCharacters=Object.keys(NokiaMapping);

var Hexadecimal=["A","B","C","D","E","F"].concat(NumberCharacters);

//Dvorak

var DvorakMapping={
	"A":"O",
	"B":"M",
	"C":"R",
	"D":"H",
	"E":"U",
	"F":"G",
	"G":"C",
	"H":"T",
	"I":"D",
	"J":"K",
	"K":"X",
	"L":"P",
	"M":"W",
	"N":"S",
	"O":"E",
	"P":"Y",
	"Q":"J",
	"R":"L",
	"S":"A",
	"T":"N",
	"U":"I",
	"V":"Z",
	"W":"V",
	"X":"B",
	"Y":"F",
	"Z":"Q"
}

var LetterCharacters=Object.keys(DvorakMapping);

// Weightier
var NumberPairs={
	"0":"zero",
	"1":"one",
	"2":"two",
	"3":"three",
	"4":"four",
	"5":"five",
	"6":"six",
	"7":"seven",
	"8":"eight",
	"9":"nine",
	"10":"ten",
	"11":"eleven",
	"12":"twelve",
	"13":"thirteen",
	"14":"fourteen",
	"15":"fifteen",
	"16":"sixteen",
	"17":"seventeen",
	"18":"eighteen",
	"19":"nineteen",
	"20":"twenty",
	"30":"thirty",
	"40":"fourty",
	"50":"fifty",
	"60":"sixty",
	"70":"seventy",
	"80":"eighty",
	"90":"ninety",
	"100":"hundred",
	"1000":"thousand",
	"1000000":"million",
	"1000000000":"billion",
	"1000000000000":"trillion",
	"1000000000000000":"quadrillion",
	"1000000000000000000":"quintillion" /*,
	"1000000000000000000000":"sexillion",
	"1000000000000000000000000":"septillion",
	"1000000000000000000000000000":"octillion",
	"1000000000000000000000000000000":"nonillion",
	"1000000000000000000000000000000000":"decillion",
	"1000000000000000000000000000000000000":"undecillion",
	"1000000000000000000000000000000000000000":"duodecillion",
	"1000000000000000000000000000000000000000000":"tredecillion",
	"1000000000000000000000000000000000000000000000":"quattuordecillion",
	"1000000000000000000000000000000000000000000000000":"quindecillion",
	"1000000000000000000000000000000000000000000000000000":"sexdecillion",
	"1000000000000000000000000000000000000000000000000000000":"septendecillion",
	"1000000000000000000000000000000000000000000000000000000000":"octodecillion",
	"1000000000000000000000000000000000000000000000000000000000000":"novemdecillion",
	"1000000000000000000000000000000000000000000000000000000000000000":"vingtillion",
	"10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000":"gogol"*/
};

NumberDigits=Object.keys(NumberPairs).map(Number);
NumberNames=NumberDigits.map(function(m){return NumberPairs[m]});

NumberPairsReversed={};
NumberDigits.map(function(d){NumberPairsReversed[NumberPairs[d]]=Number(d)});

function NameNumber(n){return NumberPairsReversed[n];}

function ReadNumber(n){
	var m=Number(n);
	
	if(In(NumberDigits,m))
		return NumberPairs[n];
	
	var biggest=Number(NumberDigits[0]);
	var i=0;
	while(biggest<m&&i<NumberDigits.length-1){
		if(Number(NumberDigits[i])<m)
			biggest=Number(NumberDigits[i]);
		i++;
	}
	var times=Quotient(m,biggest);
	var remainder=Remainder(m,biggest);
	
	times=ReadNumber(times);
	
	return (times==="one"?"":times)+ReadNumber(biggest)+ReadNumber(remainder);
}



function Positions(string,pattern){
	var p=[];
	var s=string;
	while(In(s,pattern)){
		s=s.replace(pattern,"~"+Rest(pattern));
		p.push(s.indexOf("~"));
		s=s.replace("~","§");
	}
	return p;
}

function NumberPositions(name){
	var name=name.toLowerCase();
	var positions=[];
	NumberNames.map(function(n){return Positions(name,n).map(function(p){positions.push([n,p]);})});
	
	positions=positions.sort(function(a,b){
		if(a[1]===b[1])
			return a[0].length>b[0].length;
		else
			return a[1]>b[1];});
	
	var i=0;
	while(i+1<positions.length){
		if(positions[i][1]===positions[i+1][1])
			positions[i]=null;
		i++;
	}
	
	positions=positions.filter(function(p){return p!==null});
	
	return positions;
}

function NumberDivisions(text){
	var positions=NumberPositions(text);
	
	var divisions=[];
	
	var i=0;
	var prev=0;
	while(i+1<positions.length){
		if(positions[i][0].length+positions[i][1]<positions[i+1][1]){
			divisions.push(text.slice(prev,positions[i+1][1]));
			prev=positions[i+1][1];
		}
		i++;
	}
	divisions.push(text.slice(prev,text.length));
	return divisions;
}
	
function InterpretNumber(name){
	var digits=NumberPositions(name).map(function(p){return NameNumber(p[0])});
	var r=0;
	while(digits.length>1){
		if(digits[0]<digits[1]){
			digits[1]=digits[0]*digits[1];
			r=r*digits[1];
		}
		else
			r=r+digits[0];
		
		digits=Rest(digits);
	}
	return r+Last(digits);
};
	
function InflateNumber(text){
	var numberstring=NumberPositions(text).map(function(p){return p[0]}).join("");
	
	if(numberstring==="")
		return text;
	else{
		return text.replace(numberstring,ReadNumber(InterpretNumber(numberstring)+1));
	}
}

function InflateNumbers(text){
	return NumberDivisions(text).map(InflateNumber).join("");
}

var Gendered={
	"he":"she",
	"his":"her",
	"him":"her",
	"mr":"miss",
	"male":"female",
	"masculine":"feminine",
	"andro":"gineco",
	"man":"woman",
	"boy":"girl",
	//sociology
	"mascularity":"feminacy",
	"masculinity":"femininity",
	"macho":"femea",
	"machism":"feminism",
	//family
	"son":"daughter",
	"brother":"sister",
	"bro":"sis",
	"father":"mother",
	"papa":"mama",
	"uncle":"aunt",
	"nephew":"niece",
	"fiancé":"fiancée",
	"bridegroom":"bride",
	//titles
	"lord":"lady",
	"prince":"princess",
	"king":"queen",
	"emperor":"empress",
	"actor":"actress",
	"duke":"duchess",
	"count":"countess",
	"earl":"countess",
	"baron":"baroness",
	"peer":"peeress",
	"marquess":"marchioness",
	"ambassador":"ambassadress"
	//etc...
}

var GenderReplacementRules=[];
MapObject(Gendered,function(f,m){
	GenderReplacementRules.push([new RegExp(m.toUpperCase()+"$"),f.toUpperCase()]);
});

var GenderedMale=Values(Gendered);

var Countries=[
"Iceland",
"Finland",
"Norway",
"Estonia",
"Sweden",
"Latvia",
"Russia",
"Denmark",
"Lithuania",
"Belarus",
"Ireland",
"Germany",
"Netherlands",
"Poland",
"United Kingdom",
"Kazakhstan",
"Belgium",
"Ukraine",
"Czech Republic",
"Luxembourg",
"France",
"Austria",
"Slovakia",
"Mongolia",
"Hungary",
"Liechtenstein",
"Moldova",
"Switzerland",
"Slovenia",
"Croatia",
"Canada",
"Serbia",
"Romania",
"San Marino",
"Bosnia and Herzegovina",
"Monaco",
"Kyrgyzstan",
"Bulgaria",
"Kosovo",
"Andorra",
"Montenegro",
"North Macedonia",
"Italy",
"Vatican City",
"Georgia",
"Albania",
"Uzbekistan",
"Azerbaijan",
"Spain",
"Armenia",
"China",
"Turkey",
"North Korea",
"United States",
"Portugal",
"Tajikistan",
"Greece",
"Turkmenistan",
"South Korea",
"Tunisia",
"Algeria",
"Malta",
"Iran",
"Japan",
"Cyprus",
"Afghanistan",
"Morocco",
"Lebanon",
"Pakistan",
"Syria",
"Iraq",
"Libya",
"Jordan",
"Israel",
"Egypt",
"Kuwait",
"India",
"Nepal",
"Bhutan",
"Bahrain",
"Qatar",
"Bahamas",
"Saudi Arabia",
"United Arab Emirates",
"Bangladesh",
"Oman",
"Cuba",
"Vietnam",
"Myanmar",
"Mexico",
"Haiti",
"Dominican Republic",
"Anguilla",
"Mauritania",
"Jamaica",
"Laos",
"Saint Kitts and Nevis",
"Belize",
"Antigua and Barbuda",
"Sudan",
"Eritrea",
"Yemen",
"Dominica",
"Cape Verde",
"Senegal",
"Guatemala",
"Philippines",
"Honduras",
"Saint Lucia",
"Thailand",
"El Salvador",
"Niger",
"Gambia",
"Saint Vincent and the Grenadines",
"Barbados",
"Mali",
"Burkina Faso",
"Nicaragua",
"Chad",
"Grenada",
"Guinea-Bissau",
"Djibouti",
"Cambodia",
"Trinidad and Tobago",
"Venezuela",
"Costa Rica",
"Guinea",
"Nigeria",
"Ethiopia",
"Panama",
"Sierra Leone",
"Palau",
"Marshall Islands",
"Federated States of Micronesia",
"Sri Lanka",
"Ivory Coast",
"Guyana",
"Benin",
"Liberia",
"Togo",
"Suriname",
"Ghana",
"Brunei",
"South Sudan",
"Colombia",
"Central African Republic",
"Maldives",
"Cameroon",
"Equatorial Guinea",
"Malaysia",
"Somalia",
"Kiribati",
"Singapore",
"Gabon",
"Sao Tome e Principe",
"Uganda",
"Ecuador",
"Nauru",
"Kenya",
"Rwanda",
"Burundi",
"Republic of the Congo",
"Democratic Republic of the Congo",
"Seychelles",
"Tanzania",
"Indonesia",
"Tuvalu",
"Timor-Leste",
"Angola",
"Solomon Islands",
"Papua New Guinea",
"Comoros",
"Peru",
"Samoa",
"Malawi",
"Zambia",
"Brazil",
"Bolivia",
"Vanuatu",
"Zimbabwe",
"Fiji",
"Madagascar",
"Mauritius",
"Tonga",
"Namibia",
"Botswana",
"Paraguay",
"Mozambique",
"Eswatini",
"Lesotho",
"Chile",
"South Africa",
"Argentina",
"Uruguay",
"Australia",
"New Zealand"
];

Countries=Countries.map(function(c){return c.replace(/[\s\-]/g,"").toUpperCase()});

var Hiragana={
'a':'あ',
'kあ':'か',
'sあ':'さ',
'tあ':'た',
'nあ':'な','んあ':'な',
'hあ':'は',
'mあ':'ま',
'yあ':'や',
'rあ':'ら',
'wあ':'わ',
'n':'ん',
'gあ':'が',
'zあ':'ざ',
'dあ':'だ',
'bあ':'ば',
'pあ':'ぱ',
'i':'い',
'kい':'き',
'sひ':'し',
'cひ':'ち',
'nい':'に','んい':'に',
'hい':'ひ',
'mい':'み',
'rい':'り',
'wい':'ゐ',
'gい':'ぎ',
'jい':'じ',
'dじ':'ぢ',
'bい':'び',
'pい':'ぴ',
'u':'う',
'kう':'く',
'sう':'す',
'tす':'つ',
'nう':'ぬ','んう':'ぬ',
'fう':'ふ',
'mう':'む',
'yう':'ゆ',
'rう':'る',
'e':'え',
'kえ':'け',
'sえ':'せ',
'tえ':'て',
'nえ':'ね','んえ':'ね',
'hえ':'へ',
'mえ':'め',
'rえ':'れ',
'wえ':'ゑ',
'o':'お',
'kお':'こ',
'sお':'そ',
'tお':'と',
'nお':'の','んお':'の',
'hお':'ほ',
'mお':'も',
'yお':'よ',
'rお':'ろ',
'wお':'を',
'kや':'きゃ',
'sは':'しゃ',
'cは':'ちゃ',
'nや':'にゃ','んや':'にゃ',
'hや':'ひゃ',
'mや':'みゃ',
'kゆ':'きゅ',
'shう':'しゅ',
'chう':'ちゅ',
'nゆ':'にゅ','んゆ':'にゅ',
'hゆ':'ひゅ',
'mゆ':'みゅ',
'kよ':'きょ',
'shお':'しょ',
'chお':'ちょ',
'nよ':'にょ','んよ':'にょ',
'hよ':'ひょ',
'mよ':'みょ',
'rや':'りゃ',
'rゆ':'りゅ',
'rよ':'りょ',
'gう':'ぐ',
'zう':'ず',
'dzう':'づ',
'bう':'ぶ',
'pう':'ぷ',
'gえ':'げ',
'zえ':'ぜ',
'dえ':'で',
'bえ':'べ',
'pえ':'ぺ',
'gお':'ご',
'zお':'ぞ',
'dお':'ど',
'bお':'ぼ',
'pお':'ぽ',
'gゆ':'ぎゅ',
'jう':'じゅ',
'dじゅ':'ぢゅ',
'bゆ':'びゅ',
'pゆ':'ぴゅ',
'gや':'ぎゃ',
'jあ':'じゃ',
'dじゃ':'ぢゃ',
'bや':'びゃ',
'pや':'ぴゃ',
'gよ':'ぎょ',
'jお':'じょ',
'dじょ':'ぢょ',
'bよ':'びょ',
'pよ':'ぴょ'
};

var Anagrams={
"agar":"r",
"agma":"a",
//"anna":"a",
//"gaga":"a",
//"gang":"g",
"gram":"m",
"gran":"n",
"maar":"r",
"maga":"a",
//"mama":"a",
"mana":"a",
"mara":"a",
"naga":"a",
"nama":"a",
"raga":"a",
"rang":"g"
}


var Nuclei={
'actinium':'ac',
'silver':'ag',
'aluminium':'al',
'americium':'am',
'argon':'ar',
'arsenic':'as',
'astatine':'at',
'gold':'au',
'boron':'b',
'barium':'ba',
'beryllium':'be',
'bohrium':'bh',
'bismuth':'bi',
'berkelium':'bk',
'bromine':'br',
'carbon':'c',
'calcium':'ca',
'cadmium':'cd',
'cerium':'ce',
'californium':'cf',
'chlorine':'cl',
'curium':'cm',
'copernicium':'cn',
'cobalt':'co',
'chromium':'cr',
'caesium':'cs',
'copper':'cu',
'dubnium':'db',
'darmstadtium':'ds',
'dysprosium':'dy',
'erbium':'er',
'einsteinium':'es',
'europium':'eu',
'fluorine':'f',
'iron':'fe',
'flerovium':'fl',
'fermium':'fm',
'francium':'fr',
'gallium':'ga',
'gadolinium':'gd',
'germanium':'ge',
'hydrogen':'h',
'helium':'he',
'hafnium':'hf',
'mercury':'hg',
'holmium':'ho',
'hassium':'hs',
'iodine':'i',
'indium':'in',
'iridium':'ir',
'potassium':'k',
'krypton':'kr',
'lanthanum':'la',
'lithium':'li',
'lawrencium':'lr',
'lutetium':'lu',
'livermorium':'lv',
'moscovium':'mc',
'mendelevium':'md',
'magnesium':'mg',
'manganese':'mn',
'molybdenum':'mo',
'meitnerium':'mt',
'nitrogen':'n',
'sodium':'na',
'natrium':'na',
'niobium':'nb',
'neodymium':'nd',
'neon':'ne',
'nihonium':'nh',
'nickel':'ni',
'nobelium':'no',
'neptunium':'np',
'oxygen':'o',
'oganesson':'og',
'osmium':'os',
'phosphorus':'p',
'protactinium':'pa',
'lead':'pb',
'palladium':'pd',
'promethium':'pm',
'polonium':'po',
'praseodymium':'pr',
'platinum':'pt',
'plutonium':'pu',
'radium':'ra',
'rubidium':'rb',
'rhenium':'re',
'rutherfordium':'rf',
'roentgenium':'rg',
'rhodium':'rh',
'radon':'rn',
'ruthenium':'ru',
'sulfur':'s',
'sulphur':'s',
'antimony':'sb',
'scandium':'sc',
'selenium':'se',
'seaborgium':'sg',
'silicon':'si',
'samarium':'sm',
'tin':'sn',
'strontium':'sr',
'tantalum':'ta',
'terbium':'tb',
'technetium':'tc',
'tellurium':'te',
'thorium':'th',
'titanium':'ti',
'thallium':'tl',
'thulium':'tm',
'tennessine':'ts',
'uranium':'u',
'vanadium':'v',
'tungsten':'w',
'xenon':'xe',
'yttrium':'y',
'ytterbium':'yb',
'zinc':'zn',
'zirconium':'zr'
}

var MorseCode={
	"0":"-----",
	"1":".----",
	"2":"..---",
	"3":"...--",
	"4":"....-",
	"5":".....",
	"6":"-....",
	"7":"--...",
	"8":"---..",
	"9":"----.",
	"a":".-",
	"b":"-...",
	"c":"-.-.",
	"d":"-..",
	"e":".",
	"f":"..-.",
	"g":"--.",
	"h":"....",
	"i":"..",
	"j":".---",
	"k":"-.-",
	"l":".-..",
	"m":"--",
	"n":"-.",
	"o":"---",
	"p":".--.",
	"q":"--.-",
	"r":".-.",
	"s":"...",
	"t":"-",
	"u":"..-",
	"v":"...-",
	"w":".--",
	"x":"-..-",
	"y":"-.--",
	"z":"--..",
	"-":"-....-",
	".":".-.-.-"
}


///////////////////////////////////////////////////////////////////////////////
//Manage letters and carets

function PlaceEndCaret(beginning){
	if(!beginning)
		Caret(Letters.array.length);
	else
		Caret(-1);
}

function Letters(letter,beginning,deleteletter){
	if(!Letters.array)
		Letters.array=[];

	if(!letter)
		return Letters.array;
	
	if(!deleteletter){
		if(!beginning){
			Letters.array.push(letter);
			Caret(Letters.array.length);
		}
		else{
			Letters.array.unshift(letter);
			Caret(-1);
		}
	}
	else{
		if(!beginning){
			Letters.array.pop();
			Caret(Letters.array.length);
		}
		else{
			Letters.array.shift();
			Caret(-1);
		}
	}
	
	return Letters.array;
}

function Caret(position){
	if(!Caret.array)
		Caret.array=[Letters().length]; //after last one

	if(typeof position==="undefined")
		return Caret.array;
	else
		Caret.array=[position];	
}

function UnDrawCaret(){

	Array.from(GetElement("#letters").children).filter(function(e){return e.innerHTML!==" "}).map(function(c){UnClass(c,"caret")});
	
	RemoveElement(".caret");
}

function DrawCaret(){
	if(Caret().length<1)
		var p=Letters().length;
	else
		var p=Caret()[0];
	
	UnDrawCaret();
	
	if(p<0)
		PreAddElement(CaretHTML(),"#letters");
	if(p>=Letters().length)
		AddElement(CaretHTML(),"#letters");
	else
		Class(GetElement("#letters").children[p],"caret")
		
}

function LetterPureHTML(L,cla){
	var cla=cla?(' '+cla):'';
	if(L===" ")
		cla=cla+' space';
	return "<div class='letter"+cla+"'>"+L+"</div>"
}

var LetterDisplay={
	"Tangles":LetterDraftHTML,
	"Symmetric":function(L){
		
		console.log(L);
		
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
	"Dividi":LetterDraftHTML,
	"Nucleus":LetterDraftHTML,
	"Anagram":LetterDraftHTML,
	"Fuchsia":LetterDraftHTML,
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
	Letters.array=[];
	Caret(0);
	UpdateLevel();
}

function DrawLetters(){
	var letters=Letters().map(LetterHTML(CurLevelName())).join("\n");
	ReplaceChildren(letters,"#letters");
}

function UpdateLevel(){
	UpdateLevelSecretly();
	SaveLevelState();
}
	
function UpdateLevelSecretly(){
	DrawLetters();
	DrawCaret();
}


function InputLetterBefore(letter){
	Letters(letter,true);
}

function InputLetter(letter){
	Letters(letter,false);
}

//Letters Delete
function DeleteLetterBefore(){
	Letters("any",true,true);
}

function DeleteLetterAfter(){
	Letters("any",false,true);
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

function ObtainTitleScreenLoader(){
	if(!TitleScreen())
		PlaySound("media/puzzle-type/sound/startgame.mp3");
	TitleScreen(true);
	ReplaceChildren("<div class='top'><div class='title'></div><div class='credits'></div></div>",".top");
	ReplaceChildren("Puzzle Type",".title");
	//ReplaceChildren("by Pedro PSI (2019)",".credits");
	if(CurLevelNumber()>1||SolvedLevels().length>0)
		Letters.array="CONTINUE".split("");
	else
		Letters.array="START".split("");
	
	PlaceEndCaret();
	UpdateLevel();
	
};

function LevelLoader(){
	TitleScreen(false);
	ReplaceChildren("<div class='top'><div class='goal'></div></div>",".top");
	ClearLetters();
	ReplaceChildren(CurLevelName(),".goal");
	UndoClear();
	ColoriseGameBar();//Change colour each level
}

function CurLevelName(){return LevelGoals[CurrentScreen()]};//placeholder

function CheckWin(){
	var win=CurLevelName().toUpperCase()===Letters().join("").toUpperCase();
	
	if(win){
		PlaySound("media/puzzle-type/sound/win"+RandomChoice("123")+".mp3");
		MarkWonScreen();
		BlockInput(1100);
		setTimeout(NextLevel,1000);
		UndoClear();
	}
}

function ObtainPlayEndGameSound(){
	PlaySound("media/puzzle-type/sound/wingame.mp3");
}

///////////////////////////////////////////////////////////////////////////////
//Undo
function Undo(){
	if(!Undo.backups)
		SaveLevelState();
	
	if(Undo.backups.length>=2){
		var u=Undo.backups.pop(); //Pop the current state
		LoadLevelState(Last(Undo.backups));
	}
	
	PulseSelect("UndoButton");
}

function SaveLevelState(){
	if(!Undo.backups)
		UndoClear();
	Undo.backups.push(LevelState());
}

function LoadLevelState(levelstate){
	Letters.array=Clone(levelstate['letters']);
	Caret(levelstate['caret']);
	Second.n=levelstate['Second'];
//	Alternate.n=levelstate['Alternate'];
	Consonant.before=levelstate['Consonant'];
	Nucleus.partial=levelstate['Nucleus'];
	Anagram.partial=First(levelstate['Anagram']);
	Anagram.used=Rest(levelstate['Anagram']);
	Nigeria.freeze=levelstate['Nigeria'];
	Fuchsia.colour=levelstate['Fuchsia'];
	Nokia.last=levelstate['Nokia 1998'];
	UpdateLevelSecretly();
}

function UndoClear(){
	Undo.backups=[LevelZeroState()];
} 

function LevelZeroState(){
	var state={
		'letters':[],
		'caret':0,
		'Second':0,
//		'Alternate':0,
		'Consonant':false,
		'Anagram':[""],
		'Nucleus':[],
		'Nigeria':false,
		'Fuchsia':false,
		'Nokia 1998':false
	};
	return state;
}

function LevelState(){
	var state={
		'letters':Clone(Letters()),
		'caret':Caret()[0],
		'Second':Second.n?Second.n:0,
//		'Alternate':Alternate.n?Alternate.n:0,
		'Consonant':Consonant.before?Consonant.before:false,
		'Nucleus':Nucleus.partial?Clone(Nucleus.partial):[],
		'Anagram':[Anagram.partial?Anagram.partial:""].concat(Anagram.used?Anagram.used:[]),
		'Nigeria':Nigeria.freeze?Nigeria.freeze:false,
		'Fuchsia':Fuchsia.colour?Fuchsia.colour:false,
		'Nokia 1998':Nokia.last?Nokia.last:false
	};
	return state;
}

function Restart(){
	LoadLevelState(LevelZeroState());
	PulseSelect("RestartButton");
}