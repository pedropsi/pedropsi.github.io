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

/*
var Permutators={
	"vertical":function(hsize){
		return function(string){
			var s=string.split("");
			var vsize=Round(s.length/hsize);
			for(var i=0;i<s.length;i++)
				s[i]=string[(vsize-Round(i/hsize))*hsize+i%hsize];
			return s;
		}
	},
	"horizontal":function(hsize){
		return function(string){
			var s=string.split("");
			for(var i=0;i<s.length;i++){
				s[i]=string[Round(i/hsize)*hsize+hsize-i%hsize];
			}
			return s;
		}
	},
	"inversion":function(hsize){
		return function(string){
			var s=string.split("");
			for(var i=0;i<s.length;i++){
				if(i%(2*hsize)>=hsize)
					s[i]=string[Round(i/hsize)*hsize+hsize-i%hsize];
			}
			return s;
		}
	},
	"modular":function(hsize){
		return function(string){
			var s=string.split("");
			for(var i=0;i<s.length;i++){
				if(i%2*hsize>=hsize)
					s[i]=string[Round(i/hsize)*hsize+hsize-i%hsize];
			}
			return s;
		}
	}
}

function Permutator(text,opts){
	var string=text;
	if(opts.flipvertical&&opts.vsize)
		string
}
*/