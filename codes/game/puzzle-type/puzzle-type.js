///////////////////////////////////////////////////////////////////////////////
//Puzzle Type (c) Pedro PSI, 2019-2020.
//All rights reserved
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

/*
// Level Ideas todo, maybe
--CARDS. 0123456789 KJQA
--CALCULATOR SPEAK 1I 2Z 3E 5S 7T 8B 0O
--GREEK OR PHONETIC ALPHABET
--INFINITY (GO DOWN INSIDE AND INSIDE AND INSIDE....)
*/

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
function ObtainNewGameCondition(){return SolvedLevels().length<1};
function ObtainStateScreens(){return LevelGoals;}
function ObtainLevelTitle(l){return LevelGoals[l-1].toUpperCase();}
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
	var tokens=["Oliver","PatrickEye","Plurmorant","mago314","Deusovi","minotalen","test"];
	var apptokens=tokens.map(function(t){return "homescreen-"+t});
	var manifest=GetElement("manifest");
	manifest.href=manifest.href.replace("homescreen","homescreen-"+pagetag);
	return In(tokens,pagetag)||Purchased()||In(apptokens,PageSearch("source"));
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
	var key=ObtainSymbol(key); //accept keywords space, dot, dash
	function Action(){return InstructGameAction(key);}
	Throttle(Action,50,"Action");
}


function LevelAction(key){
	if(key==="Escape"){
		ObtainTitleScreenLoader();
		return;
	 }
	
	if(key==="Enter"||ForbidNumberActions(key)||ForbidSpaceActions(key)){
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
	PulseSelect(".caret","forbidden",500);
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
		"Fuchsia",
		"Deaf",
		"Odd",
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
		"Dvorak"],CurLevelName())&&In([" "],key));
}

function AllowExtraUndoKey(key){
	return CurLevelName()==="Wasd"&&key==="Z";
}
function AllowExtraRestartKey(key){
	return CurLevelName()==="Wasd"&&key==="R";
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
	//Positional (caret position), Spacial (position of letters in 2D system), Alphabetical (letters are ordered, and may correspond to numbers), Syllabe (syllabes as unit of input), Word (full words as units of input), Adjacent, Cyclic, Mapping (cyphers), Language, Knowledge, Cultural, Retroactive, Proactive,
	"Direct",				

	"Reverse",				//Positional,
	"Consonant",			//Positional, Language
	"Follow",				//Positional, Monoactive
	"Second",				//Retroactive, Subtractive
	"Rotate",				//Positional, Spacial, Retroactive

	//"Oppose",				//Alphabetical
	"Rise",					//Alphabetical 
	"Falls",				//Alphabetical, Arithmethic, Retroactive

	"Precedent",			//Alphabetical, Retroactive
	"Superior",				//Positional, Alphabetical, Retroactive
	//"Tangles",			//Alphabetical, Cyclic, Arithmethic, Proactive
	"Difference",			//Positional, Alphabetical, Arithmethic, Proactive, Retroactive
	//"Photocopier",			//Positional, Alphabetical, Arithmethic, Proactive, Retroactive

	"Symmetries",			//Shape, Retroactive
	"Fillet",				//Shape, Proactive 
	"Topological",			//Shape, Growth, Monoactive

	"Wasd",					//Keyboard, Emulation
	"Nokia 1998",			//Keyboard
	"Dvorak",				//Keyboard, Cyclic
	"ひらがな",				//Keyboard, Syllabe, Language, Encoding

	"Nigeria",				//Word, Mapping, Geography
	"Anagram",				//Word, Mapping, Language, Once
	"Tennessine",			//Encoding, Word, Science
	"Genetic.",				//Encoding, Word, Science

	"Latent clones",					//Keyword, Increment, Retroactive, Language
	"Shepherdess hence unladylike",		//Keyword, Swap, Retroactive, Language

	"Fuchsia",							//Encoding
	"Deaf",								//Encoding

	"Odd",								//Keyword, Positional, Retroactive, Subtractive
	"Dividi",							// Encoding, Arithmethic, Retroactive
	"⠍⠕⠗⠎⠑"							//Encoding, Once
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
		var M=NumberLetter(LetterNumber(L)+1); 
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
			return NumberLetter(LetterNumber(Z)-1);
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
	"Odd":function(L){
		InputLetterAfter(L);
		var odd=In(Letters.array.join(""),"ODD");
		var even=In(Letters.array.join(""),"EVEN");
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
		Letters(StringReplaceOnceRuleArray(Letters.array.join(""),GenderReplacementRules));
		Caret(Infinity);		
	},
	"Latent clones":Weightier,
	"Nigeria":Nigeria,
	"ひらがな":function(L){
		InputLetterAfter(L);
		Letters(StringReplaceRulesObject(Letters.array.join("").toLowerCase(),Hiragana));
		Caret(Infinity);
	},
	"⠍⠕⠗⠎⠑":Morse,
	"Fuchsia":Fuchsia,
	"Deaf":Deaf,
	"Anagram":Anagram,
	"Tennessine":Tennessine,
	"Genetic.":Genetic,
	"Wasd":Wasd
}

function Wasd(W){
	if(!In("WASD",W)){
		ForbidCaret();
		return;
	}

	if(!Wasd.level)
		Wasd.level=LevelZeroState('Wasd');

	if(W==="W")
		Wasd.level=EmulateUp(Wasd.level);
	if(W==="A")
		Wasd.level=EmulateLeft(Wasd.level);
	if(W==="S")
		Wasd.level=EmulateDown(Wasd.level);
	if(W==="D")
		Wasd.level=EmulateRight(Wasd.level);
	
	var line=EmulateLine(Wasd.level);
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

	if(!Difference.last){
		InputLetterAfter(L);
		Difference.last=L;
		Caret(0);
		return;
	}

	var pre=Caret()[0];
	Letter(pre,L);
	
	var pos=Max(pre,0)+LetterNumber(L)-LetterNumber(Difference.last);
	pos=Max(Min(pos,Letters.array.length),-1);
	Difference.last=L;
	Caret(pos);
	DrawLetters();
}

function Nokia(N){
		if(!NokiaMapping[N]){
			ForbidCaret();
			return;
		}
		
		var now=Date.now();
		if(!Nokia.time)
			Nokia.time=now;

		Nokia.eventF=function(){
			if(Nokia.caretevent){
				Nokia.caretevent.map(clearTimeout);
			}
			Nokia.caretevent=[];
			Nokia.caretevent.push(setTimeout(DrawLettersEndCaret,2000));
			Nokia.time=Date.now();
		};
		
		function NokiaInput(L){
			InputLetterAfter(L);
			Caret("Last");
			Nokia.eventF();
		}

		if(!Letters.array.length){ //Start
			var L=NokiaMapping[N][0];
			NokiaInput(L);
		}
		else{
			var last=Last(Letters.array);
			var lastN=NokiaGroupNumber(last);
			var lastGroup=NokiaMapping[lastN];
			var lastPos=lastGroup.indexOf(last);
			if(N!==lastN||lastPos>=lastGroup.length-1||(now-Nokia.time)>2000){ //New Key or timing exceeded
				var L=NokiaMapping[N][0];
				NokiaInput(L);
			}
			else {//Modify
				DeleteLetterAfter();
				var M=lastGroup[lastPos+1];
				if(lastPos+1<lastGroup.length-1){
					NokiaInput(M);
				}
				else{
					InputLetterAfter(M);
					Caret(Infinity);
				}
			}
		}
}

function Nigeria(L){
		if(Nigeria.freeze){
			delete Nigeria.freeze;
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
		console.log(c,i);

		var city=(c>=0)&&!(i>=0);// Is it a city and not a country?
	
		if(i>=0||c>=0){
			if(city)
				var NEXTAREA=Capitals[Min(Max(c+1,0),Capitals.length-1)];
			else
				var NEXTAREA=Countries[Min(Max(i+1,0),Countries.length-1)];
				
			Letters(NEXTAREA);
			Nigeria.freeze=true;
		}
		
		Caret(Infinity);
	}

function Anagram(L){

	if(!Anagram.used)
		Anagram.used=[];
	if(!In("ANAGRAM".split(""),L)){
		Caret(Infinity);
		return;
	}
	else{
		InputLetterAfter(L+"*");
		var saved=SavedLetters();
		var anagr=TemporaryWord().toLowerCase();

		if(In(Anagrams,anagr)&&!In(Anagram.used,anagr)){
			var S=Anagrams[anagr].toUpperCase();
			Anagram.used.push(anagr);
			Letters(saved);
			InputLetterAfter(S);
		}
		else if(anagr.length>4){
			Letters(saved);
		}

		Caret(Infinity);
	}
}

function Tennessine(L){
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
	
	InputLetterAfter(L+"*");
	
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
			Letters(NamedColour(hex));
			
			Caret(Infinity);
			AddSingleElement("<style class='overcolour'>.letter{color:"+hex+";border-bottom-color:"+hex+"} .letter.caret{background:"+hex+" !important}</style>",'BODY','.overcolour');
			setTimeout(function(){RemoveElement(".overcolour");},1000);

			Fuchsia.colour=true;
			
			return;
		}
	}
	Caret(Infinity);
}

function Deaf(L){

	var savednotes=SavedLetters();
	var tempnotes=TemporaryLetters();

	function AddSharp(){
		if(Last(tempnotes)!=="#*")
			InputLetterAfter("#*");
		else
			ForbidCaret();
	}

	if(!In("ABCDEFG",L))
		AddSharp();
	else
		InputLetterAfter(L+"*");
		
	var tempnotes=TemporaryLetters();

	if(tempnotes.length-Count(tempnotes,"#*")===3){//3 notes
		var chord=tempnotes.map(PureLetter).join("");
			chord=FixedPoint(IncrementNote,chord);

		if(In(MajorChords,chord)){
			Letters(savednotes);
			InputLetterAfter(MajorChords[chord]);
		}
		else if(Last(tempnotes)==="#*"){
			Letters(savednotes);
		}
	}
	else if(tempnotes.length-Count(tempnotes,"#*")>3){//3 notes
		Letters(savednotes);
	}
	Caret(Infinity);
}


function Direct(L){
		InputLetterAfter(L);
};

function Second(L){
	if(!Second.n)
		Second.n=0;
	Second.n++;
	
	if(Second.n%2===0)
		DeleteLetterBefore();
	
	InputLetterAfter(L);
}

function Consonant(L){
	if(L==="Y"){//semi-vowel
		ForbidCaret();
		return;
	}

	if(!Consonant.before)
		InputLetterBefore(L);
	else
		InputLetterAfter(L)
	
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
	var s="⠍⠕⠗⠎⠑".length*2;
	Morse.used=Morse.used||[];
	var position=Morse.used.map(function(d){return MorseCode[d.toLowerCase()].length});
	position=[0].concat(position).reduce(Accumulate);


	if(In(Morse.used,L)){
		ForbidCaret();
		return;
	}
	
	Morse.used.push(L);

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
	if(Letters.array.length>0){
		var last=Last(Letters.array);
		var q=Quotient(UnRoman(last),2);
		Letters.array.pop();
		Letters(Letters.array.join("")+Roman(q));
	}
	
	if(!In(uniNumerals,L))
		ForbidCaret();
	else
		InputLetterAfter(L);
	
	Caret(Infinity);
}
	
//Weightier

function Weightier(L){
	
	InputLetterAfter(L);
	Letters(InflateNumbers(Letters.array.join("").toLowerCase()));
	Caret(Infinity);
	return;}


//Fillet

function Fillet(E){
	if(!Fillet.position)
		Fillet.position=0;

	var p=Fillet.position;
	var max="Fillet".length;
	var pnext=(p+1)%max;

	Letters.array[p]=FilletHalves[E][0]+(Letters.array[p]?SplitHalves(Letters.array[p])[1]:"_");
	Letters.array[pnext]=(Letters.array[pnext]?SplitHalves(Letters.array[pnext])[0]:"_")+FilletHalves[E][1];

	Letters.array=Letters.array.map(CombineHalves);

	Fillet.position=pnext;
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
	if(typeof Symmetries.direction==="undefined")
		Symmetries.direction=true;

	if(In("SYMMETRIES",O)){
		if(Symmetries.direction)
			InputLetterAfter(O);
		else
			InputLetterBefore(O);
	}

	if(InversionSymmetric(O)){
		ModifyLetters(ToggleInversion);
		Letters.array=Letters.array.reverse();
		Symmetries.direction=!Symmetries.direction;
		if(Symmetries.direction)
			Caret(Infinity);
		else
			Caret(-1);
	}
	if(HorizontalSymmetric(O)){
		ModifyLetters(ToggleHorizontal);
		Letters.array=Letters.array.reverse();
		
		Symmetries.direction=!Symmetries.direction;
		if(Symmetries.direction)
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

NumberDigits=Keys(NumberPairs);

NumberPairsReversed={};
Keys(NumberPairs).map(function(d){
	NumberPairsReversed[NumberPairs[d]]=Number(d);
	NumberPairsReversed["minus"+NumberPairs[d]]=-Number(d);
});

NumberNames=Keys(NumberPairsReversed).sort(function(a,b){return Number(NumberPairsReversed[a])>Number(NumberPairsReversed[b])});

function NameNumber(n){return NumberPairsReversed[n];}

function ReadPositiveNumber(n){

	var m=Number(n);
	
	if(In(NumberDigits,String(m)))
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
	
	times=ReadPositiveNumber(times);
	
	return (times==="one"?"":times)+ReadPositiveNumber(biggest)+ReadPositiveNumber(remainder);
}

function ReadNumber(n){
	var m=Number(n);
	if(m>0)
		return ReadPositiveNumber(m);
	else if(m<0)
		return "minus"+ReadPositiveNumber(-m);
	else
		return "zero";
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
	
	positionsduplicate=positions.map(function(p){
		if(InPrefix(p[0],"minus"))return [UnPrefix(p[0],"minus"),p[1]+5]}
	)//"minus" length is 5
		
	positions=Complement(positions,positionsduplicate);

	return positions.sort(function(a,b){return Last(a)>Last(b)});
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
	
function InterpretPositiveNumber(name){
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
	return (r+Last(digits));
};

function InterpretNumber(name){
	if(InPrefix(name,"minus")){
		var name=UnPrefix(name,"minus");
		return -1*InterpretNumber(name);
	}
	else
		return InterpretPositiveNumber(name);
}

function FuseAdjacentNumberPositions(numberpositions,text){
	if(numberpositions.length<2)
		return numberpositions;

	var groups=[numberpositions[0]];
	var g=0;
	var interspace;
	var interstart;
	var interend;
	for(var i=1;i<numberpositions.length;i++){
		interstart=numberpositions[i-1][1]+numberpositions[i-1][0].length;
		interend=numberpositions[i][1];
		if(text.slice(interstart,interend).replace(/\s*(and)?\s*/,"")==="")
			groups[g][0]=groups[g][0]+numberpositions[i][0]
		else{
			g=g+1;
			groups.push(numberpositions[i])
		}
	}
	return groups;
}

function InflateNumber(text){
	var text=text.replace(/negative/g,"minus");

	var numberpositions=NumberPositions(text);
		numberpositions=FuseAdjacentNumberPositions(numberpositions,text);

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
var Gendered={//cherished woman//
	//grammatical
	"he":"she",
	"his":"her",
	"him":"her",
	"male":"female",
	"masculine":"feminine",
	"andro":"gineco",
	//animals
	"cob":"pen",	//swan
	"bull":"cow",
	"ox":"cow",
	"fox":"vixen",
	"pig":"sow",
	"ram":"ewe",
	"horse":"mare",
	"stallion":"mare",
	"cock":"hen",
	"colt":"filly",
	"stag":"hind",
	"gander":"goose",
	"dog":"bitch",
	"drone":"bee",
	"drake":"duck",
	"tiger":"tigress",
	"lion":"lioness",
	//religion
	"adam":"eve",
	//sociology
	"mascularity":"feminacy",
	"masculinity":"femininity",
	"macho":"femea",
	"machism":"feminism",
	//family, people
	"man":"woman",
	"men":"women",
	"boy":"girl",
	"lad":"lass",
	"son":"daughter",
	"brother":"sister",
	"bro":"sis",
	"father":"mother",
	"papa":"mama",
	"grandpa":"grandma",
	"husband":"wife",
	"uncle":"aunt",
	"nephew":"niece",
	"fiancé":"fiancée",
	"bridegroom":"bride",
	//titles
	"emperor":"empress",
	"king":"queen",
	"prince":"princess",
	"duke":"duchess",
	"marquess":"marchioness",
	"count":"countess",
	"earl":"countess",
	"baron":"baroness",
	"baronet":"baronetess",
	"peer":"peeress",
	"lord":"lady",
	"gentleman":"lady",
	"sir":"dame",//sire:dame
	"monsieur":"madame",
	"master":"mistress",
	"mr":"miss",
	//other titles,
	"tsesarevich":"tsesarevna",
	"graf":"grafin",
	"margrave":"margravine",
	"palsgrave":"palsgravine",
	"burgrave":"burgravine",
	"herzog":"herzogin",
	"fuerst":"fuerstin",
	"dauphan":"dauphine",
	"infante":"infanta",
	"krolewicz":"krolewna",//"królewicz":"królewna",
	"knyaz":"knyaginya",
	"herr":"frau",// junkherr, junkfrau
	"viceroy":"vicereine",
	"tsar":"tsaritsa",
	"czar":"czaritsa",
	"kaiser":"kaiserin",
	"raja":"rani",//"maharaja":"maharani",
	"sheik":"sheika",
	"sultan":"sultana",
	"khan":"khatun",
	"rey":"reina",
	"rei":"rainha",
	//occupations
	"ambassador":"ambassadress",
	"shepherd":"shepherdess",
	"actor":"actress",
	"milkman":"milkmaid"
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
"São Tomé e Príncipe",
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
//SINGAPORE CASE, VATICAN
CountrySimplifications={
	"á":"a","é":"e","í":"i","ó":"o","ú":"u",
	"-":" ",",":" ",".":" ","'":" ",
	"ş":"s","ă":"a","ã":"a"
}

CountryCitySynonyms={
	"Eswatini":"Swaziland",
	"Sahrawi Arab Democratic Republic":"Western Sahara",
	"Nur-Sultan":"Astana",
	"East Timor":"Timor-Leste",
	"São Tomé and Príncipe":"São Tomé e Príncipe"
}

MapObject(CountrySimplifications,function(v,k,o){
	delete o[k];
	o[k.toUpperCase()]=v.toUpperCase();
})

function CountrySimpler(name){
	return StringReplaceRulesObject(name.toUpperCase(),CountrySimplifications).replace(/\s+/g," ");
};

MapObject(CountryCitySynonyms,function(v,k,o){
	delete o[k];
	o[CountrySimpler(k)]=CountrySimpler(v);
})

function CountrySimple(name){
	return StringReplaceRulesObject(CountrySimpler(name),CountryCitySynonyms).replace(/\s+/g," ");
};

Countries=Countries.map(CountrySimple);

var CapitalCountry={
//"King Edward Point":"South Georgia and the South Sandwich Islands",
//"Stanley":"Falkland Islands",
"Wellington":"New Zealand",
//"Edinburgh of the Seven Seas":"Tristan da Cunha",
"Canberra":"Australia",
"Montevideo":"Uruguay",
"Buenos Aires":"Argentina",
"Cape Town":"South Africa",
"Santiago":"Chile",
//"Valparaíso":"Chile",
"Maseru":"Lesotho",
//"Bloemfontein":"South Africa",
//"Kingston":"Norfolk Island",
//"Hanga Roa":"Easter Island",
"Lobamba":"Eswatini",
//"Mbabane":"Eswatini",
"Maputo":"Mozambique",
//"Pretoria":"South Africa",
"Asunción":"Paraguay",
//"Adamstown":"Pitcairn Islands",
"Gaborone":"Botswana",
"Windhoek":"Namibia",
//"Nouméa":"New Caledonia",
//"Avarua":"Cook Islands",
"Nuku'alofa":"Tonga",
"Port Louis":"Mauritius",
//"Alofi":"Niue",
"Antananarivo":"Madagascar",
"Suva":"Fiji",
"Harare":"Zimbabwe",
"Port Vila":"Vanuatu",
//"Papeete":"French Polynesia",
//"Sucre":"Bolivia",
"La Paz":"Bolivia",
//"Jamestown":"Saint Helena",
"Brasília":"Brazil",
"Lusaka":"Zambia",
//"Pago Pago":"American Samoa",
"Lilongwe":"Malawi",
"Apia":"Samoa",
//"Mata-Utu":"Wallis and Futuna",
//"West Island":"Cocos (Keeling) Islands",
"Lima":"Peru",
"Moroni":"Comoros",
//"Flying Fish Cove":"Christmas Island",
"Port Moresby":"Papua New Guinea",
"Honiara":"Solomon Islands",
"Luanda":"Angola",
"Dili":"Timor-Leste",
"Funafuti":"Tuvalu",
//"Georgetown":"Ascension Island",
"Jakarta":"Indonesia",
"Dodoma":"Tanzania",
//"Dar es Salaam":"Tanzania",
"Victoria":"Seychelles",
"Kinshasa":"Democratic Republic of the Congo",
"Brazzaville":"Republic of the Congo",
"Gitega":"Burundi",
"Kigali":"Rwanda",
"Nairobi":"Kenya",
"Yaren":"Nauru",
"Quito":"Ecuador",
"Kampala":"Uganda",
"São Tomé":"São Tomé and Príncipe",
"Libreville":"Gabon",
"Singapore":"Singapore",
"Tarawa":"Kiribati",
"Mogadishu":"Somalia",
"Kuala Lumpur":"Malaysia",
"Putrajaya":"Malaysia",
"Malabo":"Equatorial Guinea",
"Yaoundé":"Cameroon",
"Malé":"Maldives",
"Bangui":"Central African Republic",
"Bogotá":"Colombia",
"Juba":"South Sudan",
"Bandar Seri Begawan":"Brunei",
//"Cayenne":"French Guiana",
"Accra":"Ghana",
"Paramaribo":"Suriname",
"Lomé":"Togo",
"Monrovia":"Liberia",
"Porto-Novo":"Benin",
//"Cotonou":"Benin",
"Georgetown":"Guyana",
"Yamoussoukro":"Ivory Coast",
//"Abidjan":"Ivory Coast",
"Sri Jayawardenepura Kotte":"Sri Lanka",
//"Colombo":"Sri Lanka",
"Palikir":"Federated States of Micronesia",
"Majuro":"Marshall Islands",
"Ngerulmud":"Palau",
"Freetown":"Sierra Leone",
"Panama City":"Panama",
"Addis Ababa":"Ethiopia",
"Abuja":"Nigeria",
"Conakry":"Guinea",
"San José":"Costa Rica",
//"Hargeisa":"Somaliland",
"Caracas":"Venezuela",
"Port of Spain":"Trinidad and Tobago",
"Phnom Penh":"Cambodia",
"Djibouti":"Djibouti",
"Bissau":"Guinea-Bissau",
"St. George's":"Grenada",
"N'Djamena":"Chad",
//"Willemstad":"Curaçao",
"Managua":"Nicaragua",
"Ouagadougou":"Burkina Faso",
//"Oranjestad":"Aruba",
"Bamako":"Mali",
"Bridgetown":"Barbados",
"Kingstown":"Saint Vincent and the Grenadines",
"Banjul":"Gambia",
//"Hagåtña":"Guam",
"Niamey":"Niger",
"San Salvador":"El Salvador",
"Bangkok":"Thailand",
"Castries":"Saint Lucia",
"Tegucigalpa":"Honduras",
"Manila":"Philippines",
"Guatemala City":"Guatemala",
"Dakar":"Senegal",
"Praia":"Cape Verde",
//"Saipan":"Northern Mariana Islands",
"Roseau":"Dominica",
"Sana'a":"Yemen",
"Asmara":"Eritrea",
"Khartoum":"Sudan",
//"Plymouth":"Montserrat",
//"Brades Estate":"Montserrat",
"St. John's":"Antigua and Barbuda",
"Belmopan":"Belize",
"Basseterre":"Saint Kitts and Nevis",
//"Gustavia":"Saint Barthélemy",
"Vientiane":"Laos",
"Kingston":"Jamaica",
//"Philipsburg":"Sint Maarten",
//"Marigot":"Saint Martin",
"Nouakchott":"Mauritania",
"The Valley":"Anguilla",
//"Charlotte Amalie":"United States Virgin Islands",
//"Road Town":"British Virgin Islands",
//"San Juan":"Puerto Rico",
"Santo Domingo":"Dominican Republic",
"Port-au-Prince":"Haiti",
//"George Town":"Cayman Islands",
"Mexico City":"Mexico",
"Naypyidaw":"Myanmar",
"Hanoi":"Vietnam",
"Havana":"Cuba",
"Muscat":"Oman",
"Dhaka":"Bangladesh",
"Abu Dhabi":"United Arab Emirates",
"Riyadh":"Saudi Arabia",
//"Taipei":"Taiwan",
"Nassau":"Bahamas",
"Doha":"Qatar",
"Manama":"Bahrain",
//"El Aaiún":"Sahrawi Arab Democratic Republic",
"Thimphu":"Bhutan",
"Kathmandu":"Nepal",
"New Delhi":"India",
"Kuwait City":"Kuwait",
"Cairo":"Egypt",
"Jerusalem":"Israel",
"Amman":"Jordan",
//"Hamilton":"Bermuda",
"Tripoli":"Libya",
"Baghdad":"Iraq",
"Damascus":"Syria",
"Islamabad":"Pakistan",
"Beirut":"Lebanon",
"Rabat":"Morocco",
"Kabul":"Afghanistan",
//"Episkopi Cantonment":"Akrotiri and Dhekelia",
"Nicosia":"Cyprus",
//"Nicosia":"Northern Cyprus",
"Tehran":"Iran",
"Tokyo":"Japan",
"Valletta":"Malta",
//"Gibraltar":"Gibraltar",
"Algiers":"Algeria",
"Tunis":"Tunisia",
"Seoul":"South Korea",
"Ashgabat":"Turkmenistan",
"Athens":"Greece",
"Dushanbe":"Tajikistan",
"Lisbon":"Portugal",
"Washington, D.C.":"United States",
"Pyongyang":"North Korea",
//"Stepanakert":"Nagorno-Karabakh Republic",
"Ankara":"Turkey",
"Beijing":"China",
"Yerevan":"Armenia",
"Madrid":"Spain",
"Baku":"Azerbaijan",
"Tashkent":"Uzbekistan",
"Tirana":"Albania",
"Tbilisi":"Georgia",
"Vatican City":"Vatican City",
"Rome":"Italy",
"Skopje":"North Macedonia",
//"Tskhinvali":"South Ossetia",
//"Kutaisi":"Georgia",
"Podgorica":"Montenegro",
//"Cetinje":"Montenegro",
"Andorra la Vella":"Andorra",
"Pristina":"Kosovo",
"Sofia":"Bulgaria",
"Bishkek":"Kyrgyzstan",
//"Sukhumi":"Abkhazia",
"Monaco":"Monaco",
"Sarajevo":"Bosnia and Herzegovina",
"San Marino":"San Marino",
"Bucharest":"Romania",
"Belgrade":"Serbia",
"Ottawa":"Canada",
"Zagreb":"Croatia",
"Ljubljana":"Slovenia",
//"St. Pierre":"Saint Pierre and Miquelon",
//"Tiraspol":"Transnistria",
"Bern":"Switzerland",
"Chişinău":"Moldova",
"Vaduz":"Liechtenstein",
"Budapest":"Hungary",
"Ulan Bator":"Mongolia",
"Bratislava":"Slovakia",
"Vienna":"Austria",
"Paris":"France",
//"St. Helier":"Jersey",
//"St. Peter Port":"Guernsey",
"Luxembourg":"Luxembourg",
"Prague":"Czech Republic",
"Kiev":"Ukraine",
"Brussels":"Belgium",
"Nur-Sultan":"Kazakhstan",
//"Cardiff":"Wales",
"London":"United Kingdom",//England 
"Warsaw":"Poland",
"Amsterdam":"Netherlands",
"Berlin":"Germany",
"Dublin":"Ireland",
"Minsk":"Belarus",
//"Douglas":"Isle of Man",
//"Belfast":"Northern Ireland",
"Vilnius":"Lithuania",
"Copenhagen":"Denmark",
"Moscow":"Russia",
//"Edinburgh":"Scotland",
"Riga":"Latvia",
"Stockholm":"Sweden",
"Tallinn":"Estonia",
"Oslo":"Norway",
"Helsinki":"Finland",
//"Tórshavn":"Faroe Islands",
"Reykjavík":"Iceland"
//"Nuuk":"Greenland",
//"Longyearbyen":"Svalbard"
}

CapitalCountry=MapObject(CapitalCountry,function(v,k,o){
	delete o[k];
	o[CountrySimple(k)]=CountrySimple(v);
})

var CountryCapital=FlipKeysValues(CapitalCountry);
var Capitals=Countries.map(function(c){return CountryCapital[c]});//Preserve ordering

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
//'natrium':'na',
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
/*
easyElements=`
0: "silver"				EASY
​4: "carbon"			DIRECT
​5: "copper"			DIRECT	
​9: "oganesson" 		MISLEADING (NICE)
​10: "phosphorus"		BORING
​11: "silicon"			DIRECT
​12: "tin"				EASY
​14: "xenon"			DIRECT
​`;

branchingElements=`
​1: "arsenic" 			EASY
​2: "astatine" 			DIRECT
​3: "bismuth" 			EASY
​6: "iron"				NOT BAD
​7: "krypton" 			OK
​8: "neon"				DIRECT
​13: "tennessine" 		EASY
​`

var NucleiAbbs=Values(Nuclei);
var NucleiNames=Keys(Nuclei);

function DivideElementName(element){
	var names=[element];var name;
	var i,ab;
	var found=false
	while(!found&&names.length>0){
			
			name=First(names);
			names=Rest(names);

			var i=0;
			while(i<NucleiAbbs.length){
				ab=NucleiAbbs[i];
				if(InPrefix(name,ab)){
					console.log(name,"--->",ab);
					names.push(UnPrefix(name,ab));
					found=(UnPrefix(name,ab)==="");
				}
			i++;
			}

	}
	return found;
}
*/

var RNACodonsAminoacids={
"UUU":"F",
"UUC":"F",
"UUA":"L",
"UUG":"L",
"UCU":"S",
"UCC":"S",
"UCA":"S",
"UCG":"S",
"UAU":"Y",
"UAC":"Y",
"UAA":".",
"UAG":".",
"UGU":"C",
"UGC":"C",
"UGA":".",
"UGG":"W",
"CUU":"L",
"CUC":"L",
"CUA":"L",
"CUG":"L",
"CCU":"P",
"CCC":"P",
"CCA":"P",
"CCG":"P",
"CAU":"H",
"CAC":"H",
"CAA":"Q",
"CAG":"Q",
"CGU":"R",
"CGC":"R",
"CGA":"R",
"CGG":"R",
"AUU":"I",
"AUC":"I",
"AUA":"I",
"AUG":"M",
"ACU":"T",
"ACC":"T",
"ACA":"T",
"ACG":"T",
"AAU":"N",
"AAC":"N",
"AAA":"K",
"AAG":"K",
"AGU":"S",
"AGC":"S",
"AGA":"R",
"AGG":"R",
"GUU":"V",
"GUC":"V",
"GUA":"V",
"GUG":"V",
"GCU":"A",
"GCC":"A",
"GCA":"A",
"GCG":"A",
"GAU":"D",
"GAC":"D",
"GAA":"E",
"GAG":"E",
"GGU":"G",
"GGC":"G",
"GGA":"G",
"GGG":"G"
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

var BrailleCode={
"a":"⠁",
"b":"⠃",
"c":"⠉",
"d":"⠙",
"e":"⠑",
"f":"⠋",
"g":"⠛",
"h":"⠓",
"i":"⠊",
"j":"⠚",
"k":"⠅",
"l":"⠇",
"m":"⠍",
"n":"⠝",
"o":"⠕",
"p":"⠏",
"q":"⠟",
"r":"⠗",
"s":"⠎",
"t":"⠞",
"u":"⠥",
"v":"⠧",
"w":"⠺",
"x":"⠭",
"y":"⠽",
"z":"⠵"
}

var BrailleSorted=[
"⠀",
"⠁",
"⠂",
"⠃",
"⠄",
"⠅",
"⠆",
"⠇",
"⠈",
"⠉",
"⠊",
"⠋",
"⠌",
"⠍",
"⠎",
"⠏",
"⠐",
"⠑",
"⠒",
"⠓",
"⠔",
"⠕",
"⠖",
"⠗",
"⠘",
"⠙",
"⠚",
"⠛",
"⠜",
"⠝",
"⠞",
"⠟",
"⠠",
"⠡",
"⠢",
"⠣",
"⠤",
"⠥",
"⠦",
"⠧",
"⠨",
"⠩",
"⠪",
"⠫",
"⠬",
"⠭",
"⠮",
"⠯",
"⠰",
"⠱",
"⠲",
"⠳",
"⠴",
"⠵",
"⠶",
"⠷",
"⠸",
"⠹",
"⠺",
"⠻",
"⠼",
"⠽",
"⠾",
"⠿"];

var NoteIncrements={
	"A##":"B",
	"B#":"C",
	"C##":"D",
	"D##":"E",
	"E#":"F",
	"F##":"G",
	"G##":"A"
}

function IncrementNote(note){
	return StringReplaceRulesObject(note,NoteIncrements);
}

var MajorChords={
	"CEG":"C",
	"C#FG#":"C#",
	"DF#A":"D",
	"D#GA#":"D#",
	"EG#B":"E",
	"FAC":"F",
	"F#A#C#":"F#",
	"GBD":"G",
	"G#CD#":"G#",
	"AC#E":"A",
	"A#DF":"A#",
	"BD#F#":"B"
};

ChordForward={
	"A#":"a",
	"B#":"b",
	"C#":"c",
	"D#":"d",
	"E#":"e",
	"F#":"f",
	"G#":"g"
}

ChordBackward=FlipKeysValues(ChordForward);

function PermuteChord(chord){
	var hiddenchord=StringReplaceRulesObject(chord,ChordForward);
	var permutations=StringPermutations(hiddenchord);
		permutations=permutations.map(function(ch){
			return StringReplaceRulesObject(ch,ChordBackward);
		});
	return permutations;
}

Keys(MajorChords).map(function(chord){
	var permutations=PermuteChord(chord);
	return permutations.map(function(pchord){
		MajorChords[pchord]=MajorChords[chord];
	});
})

///////////////////////////////////////////////////////////////////////////////
//Manage letters and carets

function SavedLetters(){
	return Letters.array.filter(function(n){return !InPosfix(n,"*")});
}
function TemporaryLetters(){
	return Letters.array.filter(function(n){return InPosfix(n,"*")});
}
function TemporaryWord(){
	return TemporaryLetters().map(PureLetter).join("");
}


function Letters(array){
	if(!Letters.array)
		Letters.array=[];
	if(!array)
		return Letters.array;
	
	if(typeof array==="string")
		return Letters.array=array.toUpperCase().split("");
	else
		return Letters.array=array.map(function(l){return l.toUpperCase()});
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

function DeleteLastLetters(n){
	var i=1;
	while(i<=n){
		Letters.array.pop();
		i++;
	}
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
	"Dividi":LetterDraftHTML,
	"Tennessine":LetterDraftHTML,
	"Genetic.":LetterDraftHTML,
	"Anagram":LetterDraftHTML,
	"Fuchsia":LetterDraftHTML,
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

function UpdateLevel(){
	UpdateLevelSecretly();
	SaveLevelState();
}
	
function UpdateLevelSecretly(){
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

function DeleteLetterAfter(){
	Letter(Infinity,false);
	Caret(Infinity);
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
		Letters("CONTINUE");
	else
		Letters("START");
	
	Caret(Infinity);
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
	var win=CurLevelName().toUpperCase()===Letters().join("").replace(/\_/g,"").toUpperCase();
	
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
	RevertLevelState();

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
	var state=LevelState();
	if(!Undo.backups.length||!Equal(Last(Undo.backups),state))
		Undo.backups.push(LevelState());
}

function LoadLevelState(levelstate){
	Letters(Clone(levelstate['letters']));
	Caret(levelstate['caret']);
	Second.n=levelstate['Second'];
	Consonant.before=levelstate['Consonant'];
	Difference.last=levelstate['Difference'];
	Symmetries.direction=levelstate['Symmetries'];
	Fillet.position=levelstate['Fillet'];
	Anagram.used=levelstate['Anagram'];
	Nigeria.freeze=levelstate['Nigeria'];
	Fuchsia.colour=levelstate['Fuchsia'];
	Nokia.last=levelstate['Nokia 1998'][0];
	Nokia.eventF=levelstate['Nokia 1998'][1];Nokia.eventF();//timed caret event
	Morse.used=levelstate['⠍⠕⠗⠎⠑'];
	Wasd.level=levelstate['Wasd'];

	UpdateLevelSecretly();
}

function RevertLevelState(){
	var name=CurLevelName();
	var reversions={
		"⠍⠕⠗⠎⠑":function(){Morse.used.length?Morse.used.pop():Morse.used=[]},
		"Anagram":function(){Anagram.used.length?Anagram.used.pop():Anagram.used=[]},
	}
	reversions[name]?reversions[name]():null;
}

function UndoClear(){
	Undo.backups=[LevelZeroState()];
} 

function LevelZeroState(level){
	var state={
		'letters':[],
		'caret':0,
		'Second':0,
		'Consonant':false,
		'Difference':"",
		'Symmetries':true,
		'Fillet':0,
		'Anagram':[],
		'Tennessine':[],
		'Nigeria':false,
		'Fuchsia':false,
		'Nokia 1998':[false,Identity],
		'⠍⠕⠗⠎⠑':[],
		'Wasd':`_____...D
				..S......
				.....A.__
				.._______
				W________`.replace(/\t*/g,"")
	};
	if(!level)
		return state;
	else
		return state[level];
}

function LevelState(){
	var state={
		'letters':Clone(Letters()),
		'caret':Caret(),
		'Second':Second.n?Second.n:0,
		'Consonant':Consonant.before?Consonant.before:false,
		'Difference':Difference.last?Difference.last:"",
		'Symmetries':(typeof Symmetries.direction!=="undefined")?Symmetries.direction:true,
		'Fillet':Fillet.position?Fillet.position:0,
		'Anagram':Anagram.used?Anagram.used:[],
		'Nigeria':Nigeria.freeze?Nigeria.freeze:false,
		'Fuchsia':Fuchsia.colour?Fuchsia.colour:false,
		'Nokia 1998':[Nokia.last?Nokia.last:false,Nokia.eventF?Nokia.eventF:Identity],
		'⠍⠕⠗⠎⠑':Morse.used?Morse.used:[],
		'Wasd':Wasd.level?Wasd.level:LevelZeroState('Wasd')
	};
	return state;
}

function Restart(){
	LoadLevelState(LevelZeroState());
	PulseSelect("RestartButton");
}