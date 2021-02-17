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

function BiMorse(morse){
	var bimorse="";
	var flip=false;
	var morse=MonospaceString(morse);
	for(var i=0;i<morse.length;i++){
		if(morse[i]===" ")
			flip=!flip;
		else
			bimorse=bimorse+morse[i].replaceAll((flip)?".":"nothing","!").replaceAll((flip)?"-":"nothing","~").replaceAll((!flip)?"!":"nothing",".").replaceAll((!flip)?"~":"nothing","-");
	}
	return bimorse;
}

function BiMorseAdd(bimo,L){
	var Flipper=Identity;
	if(bimo&&In(".-",Last(bimo)))
		Flipper=function(c){return c.replaceAll(".","!").replaceAll("-","~")};
	var L=Flipper(Accesser(MorseCode,LowerCase)(L));
	return bimo+L;
}

function BiMorseLetters(bimorse){
	var letters=[];
	for(var j=0;j<=Floor(bimorse.length/6);j++){
		letters[j]=bimorse.split("").slice(6*j,6*(j+1)).join("");
	}
	return letters.filter(Identity);
}

BiBrailleShapes={
	".":"M 0 1 Q 0 0 1 0 Q 2 0 2 1 Q 2 2 1 2 Q 0 2 0 1 Z",
	"!":"M 0 1 L 1 2 L 2 1 L 1 0 Z",
	"-":"M 0 1 L 1 1 L 1 1.1 L 0 1.1 L 0 1 Z",
	"~":"M 1 0 L 1 1 L 1.1 1 L 1.1 0 L 1 0 Z"
}

function BrailleCoordinates(code,position){
	var hdist=4;
	var vdist=4;
	var shape=BiBrailleShapes[code];
		shape=SVGPathDirectTransform(shape,(x,y)=>[x+Floor(position/3)*hdist,y+(position%3)*vdist]);
	return shape;
}

function BrailleLetterSVGHTML(bimorsestring){
	var path="M 0 0";
	for(var j=0;j<bimorsestring.length;j++){
		path=path+" "+BrailleCoordinates(bimorsestring[j],j);
	}

	return SVGHTML({
		path:path,
		cla:"bezier letter morse",
		viewBox:"0 0 8 12",
	})
}

function WordBiMorseArray(word){
	var bimorse=Fold(BiMorseAdd,"",word.split(""));
	var letters=BiMorseLetters(bimorse).filter(Identity);
	return letters;
}


/*

//Morse
function MorseLegacy(L){
	
	var used=Memo();
	
	var position=used.map(function(d){return MorseCode[d.toLowerCase()].length});
	position=[0].concat(position).reduce(Accumulate);

	AddStrokeValid(L);
	
	used.push(L);
	Memo(used);

	var morsestring=MorseCode[L.toLowerCase()].split("");

	var charlenh=2;
	var charlenv=3;
	var chardots=charlenh*charlenv;

	var p,n,line,column,wordp,charp;
	for(var i=0;i<morsestring.length;i++){		
		p=position+i;		  					//full position
		wordp=Floor(p/chardots);
		charp=(p-wordp*chardots);
		column=Floor(charp/charlenv);						
		line=charp%charlenv;

		console.log(position,p,wordp,charp,column,line);

		n=(wordp<Letters.array.length)?BrailleNumber(Letters.array[wordp]):0; //prior information
		n=Min(n+(morsestring[i]==="."?1:0)*Power(2,line+charlenv*column),63);		//dot=1, dash=0
		Letters.array[wordp]=NumberBraille(n);
	}

	Caret(Floor((p+1)/chardots));

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

function NumberBraille(n){
	return BrailleSorted[n];
}
function BrailleNumber(braille){
	return BrailleSorted.indexOf(braille.toLowerCase());
}

*/