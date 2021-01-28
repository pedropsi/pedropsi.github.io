
var Genres={
	"bonsai":{
		letter:"b",
		genre:"bonsai",
		author:"Lucas Le Slo",
		date:"2021-01-18",
		description:`Pave the whole grid with the given pieces (rotations allowed) such to form a continuous path that. No two consecutive pieces belong to the same type.
		a) flowers are at endpoints (1-pieces); b) fruits are at straight 2-pieces; c) the trunk is a straight 2-piece, rooted outside the bottom of the board.`,
		examples:[
			
		],
		visuals:{
			solid:true,
		},
		overline:{
			lineWidth:1,
			dash:[1,0],
			colour:"rgb(16,134,0)",
		},
		line:{
			lineJoin:"miter",
			cap:"square",
			opacity:0.9,
			lineWidth:1.5,
			colour:"rgb(134,0,16)",
			excessColour:"rgb(134,0,16)",
			dash:[1,0],
			wrongDash:[1,3],
		},
		grid:{
			strokeColor:"rgb(77,77,77)",
			dual:true,
			border:0.5,
			dash:[1,0],
			scale:0.75,
			nudge:0.25	
		},
		rules:{
			dangleallowed:true,
			loopallowed:false,
			simpleshapes:Join(Shape1s,Shape2s,Shape3s),
			unconsecutiveshapes:[ShapeStraights,Shape2Corners,Shape3s],
			maxtracks:1
		},
		groups:{
			"tree":{
				symbols:["flower","fruit"],
				colour:"rgb(134,0,16)"
			}
		},
		symbols:{
			"flower":{
				letter:"w",
				colour:"rgb(153,217,234)",
				viewBox:"0 0 600 600",
				path:"M 181 1 C 143 9 116 43 116 83 C 116 95 116 97 115 97 C 101 91 74 89 60 94 C -19 119 -19 233 60 256 L 66 258 62 265 C 50 285 48 312 55 334 C 75 392 152 411 194 367 L 201 360 203 363 C 207 368 219 376 228 380 C 301 414 375 339 339 266 C 337 261 335 257 335 257 C 335 257 338 256 342 255 C 395 240 417 172 384 126 C 363 97 324 84 291 94 L 283 97 283 85 C 285 31 234 -10 181 1 Z M 200 167 C 216 167 218 166 225 164 L 232 161 232 176 C 232 192 234 201 241 214 L 245 222 238 224 C 224 229 210 238 202 247 L 198 252 194 248 C 187 239 173 231 160 227 C 152 224 152 224 156 218 C 164 205 168 189 167 172 L 166 161 175 164 C 182 166 184 167 200 167 Z",
				rule:{
					symbolshapes:Shape1s,
					minconnected:Infinity
				},
			},
			"fruit":{
				letter:"f",
				colour:"rgb(243,105,113)",
				viewBox:"0 0 1500 1500",
				path:"M 460 58 L 412 61 L 412 214 C 168 225 49 425 40 603 C 39 798 184 1021 422 1022 C 646 1024 795 866 811 658 C 820 408 696 232 454 216 L 454 159 C 619 239 731 259 923 108 C 731 -56 612 -4 454 124 Z",
				rule:{
					symbolshapes:Shape2Straights,
					minconnected:Infinity
				}
			}
		}
	},
	"subway":{
		letter:"s",
		genre:"subway",
		author:"Portponky",
		date:"2020-12-29",
		line:{
			opacity:1,
			lineWidth:4,
			colour:"rgb(255,0,0)",
			excessColour:"rgb(255,0,0)",
			dash:[1,0],
		},
		grid:{
			strokeColor:"rgb(0,0,0)",
			dash:[1,0],
			scale:0.75,
			nudge:0.25	
		},
		rules:{
			simpleshapes:["LR","LE","LS","RN","RW","UD","UW","US","DN","DE","NS","EW","LURD","NESW"],
			maxtracks:1
		},
		groups:{
			"subway":["station","park-N","park-E","park-S","park-W"]
		},
		symbols:{
			"station":{
				letter:"t",
				colour:"rgb(255,255,0)",
				viewBox:"0 0 10 10",
				path:"M 0 5 Q 0 0 5 0 Q 10 0 10 5 Q 10 10 5 10 Q 0 10 0 5 Z",
				rule:{
					symbolshapes:["LU","UD","NS","EW"],
					minconnected:Infinity
				}
			},
			"park-N":{
				letter:"n",
				colour:"rgb(255,255,0)",
				viewBox:"0 0 10 10",
				path:"M 5 5 L 0 5 L 0 0 L 5 0 L 5 5 Z",
				rule:{
					shapesatsymboldisallowed:["NS","ND","DR"]
				}
			},
			"park-S":{
				letter:"s",
				colour:"rgb(255,255,0)",
				viewBox:"0 0 10 10",
				path:"M 5 5 L 10 5 L 10 10 L 5 10 L 5 5 Z",
				rule:{
					shapesatsymboldisallowed:["NS","SU","SL"]
				}
			}
			//etc...
		}
	}
}

var LettersGenre={};
Keys(Genres).map(name=>LettersGenre[Genres[name].letter]=name);
var GenreLetters=FlipKeysValues(LettersGenre);

Shout("kudamono-genres")