var Pieces={
	"PonkyEnd":{
		letter:"e",
		colour:"rgb(150,150,150)",
		viewBox:"0 0 20 20",
		path:"M 10 0 Q 20 0 20 10 Q 20 20 10 20 Q 0 20 0 10 Q 0 0 10 0",
		rule:{
			fruitshapes:Shape1s,
			minconnected:Infinity,
			description:"Connect all ends."
		}
	}
}

var PonkyPipes=["junction-right"];


var Genres={
	"bonsai":{
		letter:"b",
		designation:"Bonsai Gardening",
		author:"Le Slo",
		date:"2021-01-18",
		description:`Pave the whole grid with a continuous path, rooted to the bottom via a straight trunk (2-piece).
		Use the given pieces (rotations allowed), without repeating them consecutively.`,
		examples:[
			"W=7&L=f11f2f4w1w3w1f4f2f5f4f6w1w1f1f4f2&S=10R2R7RUDDLD3LUUUUURRDRRDRDDLLU22LDDRRULUU&G=b&A=Pedro PSI&D=26-01-2021&T=4-way Bonsai",
			"W=6&L=w8f15f1f1&S=8DRUR8RRDLLDLDDR2RRDRD8R3RDDL&G=b&T=Triparityte&A=Pedro PSI&D=30-01-2021"
		],
		visuals:{
			solid:true,
		},
		overline:{
			lineWidth:1,
			clearLineWidth:3,
			clearColour:"rgb(230,230,230)",
			clearOpacity:1,
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
			deficitColour:"#CCCCCC",
			dash:[1,0],
			wrongDash:[1,3],
		},
		grid:{
			strokeColor:"rgb(77,77,77)",
			dual:true,
			edge:0.5,
			dash:[1,0],
			scale:0.75,
			nudge:0.25,
		},
		rules:{
			dangleallowed:true,
			loopallowed:false,
			simpleshapes:Join(Shape1s,Shape2s,Shape3s),
			unconsecutiveshapes:[ShapeStraights,Shape2Corners,Shape3s],
			maxtracks:1
		},
		win:{
			rule:{
				fillboard:true
			},
			grid:{
				fillColor:"#FFFFED",
				strokeColor:"#FFFFED"
			}
		},
		groups:{
			"tree":{
				fruits:["flower","fruit","hummingbird","question"],
				colour:"rgb(134,0,16)"
			}
		},
		fruits:{
			"flower":{
				letter:"w",
				colour:"rgb(153,217,234)",
				viewBox:"0 0 600 600",
				path:"M 181 1 C 143 9 116 43 116 83 C 116 95 116 97 115 97 C 101 91 74 89 60 94 C -19 119 -19 233 60 256 L 66 258 62 265 C 50 285 48 312 55 334 C 75 392 152 411 194 367 L 201 360 203 363 C 207 368 219 376 228 380 C 301 414 375 339 339 266 C 337 261 335 257 335 257 C 335 257 338 256 342 255 C 395 240 417 172 384 126 C 363 97 324 84 291 94 L 283 97 283 85 C 285 31 234 -10 181 1 Z M 200 167 C 216 167 218 166 225 164 L 232 161 232 176 C 232 192 234 201 241 214 L 245 222 238 224 C 224 229 210 238 202 247 L 198 252 194 248 C 187 239 173 231 160 227 C 152 224 152 224 156 218 C 164 205 168 189 167 172 L 166 161 175 164 C 182 166 184 167 200 167 Z",
				rule:{
					fruitshapes:Shape1s,
					minconnected:Infinity,
					description:"flowers are at 1-pieces (endpoints)",
					depiction:"W=4&L=w7w4&S=7DRRUUL&G=b"
				},
			},
			"fruit":{
				letter:"f",
				colour:"rgb(243,105,113)",
				viewBox:"0 0 1500 1500",
				path:"M 460 58 L 412 61 L 412 214 C 168 225 49 425 40 603 C 39 798 184 1021 422 1022 C 646 1024 795 866 811 658 C 820 408 696 232 454 216 L 454 159 C 619 239 731 259 923 108 C 731 -56 612 -4 454 124 Z",
				rule:{
					fruitshapes:Shape2Straights,
					minconnected:Infinity,
					description:"fruits are at straight 2-pieces (trunks)",
					depiction:"W=4&L=f13f4&S=7DRRUUL&G=b"
				},
			},
			"hummingbird":{
					letter:"h",
					colour:"rgb(173,107,178)",
					viewBox:"0 0 42 42",
					scale:0.7,
					shiftx:0.1,
					path:"M 6 4 Q 5 3 5 3 Q 4 3 3 2 Q 2 2 1 1 Q -2 0 0 0 Q 9 0 19 6 Q 21 2 23 1 Q 27 0 29 3 Q 30 5 33 5 Q 63 5 33 6 Q 30 7 29 8 Q 26 11 25 14 Q 23 18 18 21 Q 15 23 13 23 Q 11 24 9 23 Q -1 29 8 23 Q -2 29 7 22 Q -3 30 6 21 Q -4 31 5 20 Q 8 14 12 12 Q 10 12 10 11 Q 8 11 8 10 Q 6 10 6 9 Q 5 9 4 8 Q 3 8 2 7 Q 1 7 0 6 Q -1 6 -2 5 Q -3 5 -4 4 Q -7 3 -4 3 Q 1 2 6 4 Z",
					rule:{
						fruitshapes:Shape2Corners,
						minconnected:Infinity,
						description:"hummingbirds are at corner 2-pieces",
						depiction:"W=4&L=h8h8h2&S=7DRRUUL&G=b"
					},
			},
			"question":{
				letter:"q",
				colour:"rgb(100,100,100)",
				viewBox:"0 0 36 36",
				scale:0.5,
				path:"M 18 1 C 10 1 7 7 9 14 C 9 14 13 13 13 13 C 12 8 14 5 18 5 C 23 5 25 12 19 15 C 15 17 14 19 13 24 L 17 25 C 18 21 18 19 21 18 C 30 15 29 1 18 1 Z M 14 28 C 9 28 9 35 14 35 C 19 35 19 28 14 28 Z",
				rule:{
					fruitshapes:Join(Shape2Straights,Shape1s,Shape2Corners),
					minconnected:Infinity,
					description:"a question mark replaces a flower, fruit or hummingbird",
					depiction:"W=4&L=q7q6q3&S=7DRRUUL&G=b"
				},
			},
			// "monkey":{
			// 	letter:"m",
			// 	colour:"rgb(173,107,178)",
			// 	viewBox:"0 0 18 18",
			// 	scale:0.65,
			// 	path:"M 1 1 Q 5 -1 6 2 Q 9 6 12 6 Q 14 3 16 5 Q 18 8 17 10 Q 16 11 16 10 Q 17 8 15 6 Q 13 5 13 8 Q 12 13 14 15 Q 15 16 14 16 Q 10 16 13 15 Q 11 14 11 11 Q 10 11 10 11 Q 8 13 8 15 Q 9 16 7 16 Q 5 16 7 15 Q 7 13 8 11 Q 6.5 11 5 8 Q 3 11 3 15 Q 6 15 3 16 Q 2 16 2 15 Q 2 10 3 5 Q 2 7 0 5 q 0 -1 1 -2 Z",
			// 	rule:{
			// 		fruitshapes:Shape2Corners,
			// 		minconnected:Infinity
			// 	},
			// 	description:"monkeys are at corner 2-pieces"
			// }
		}
	},
	"ponkysplumbers":{
		letter:"pp",
		designation:"Ponky's Plumbers",
		author:"Portponky",
		date:"2021-02-02",
		description:`Fill the entire grid with non-branching pipes, connecting endings of the same colour.`,
		examples:[
			"W=8&L=v10g13r1v6v11b11g5v2r1b4&G=pp&D=02-02-2021&T=Mario, Luigi and a brother&A=Pedro PSI&N=49",
			//"W=8&L=v10g13r1v6v11b11g5v2r1b4&S=23RURURURRDL1RRRUURRDDDLU28LLLLUUURULURURDRURRR&G=pp&D=02-02-2021&T=Mario, Luigi and a brother&A=Pedro PSI&N=49"
		],
		visuals:{
			solid:true,
		},
		overline:{
			lineWidth:1,
			clearLineWidth:3,
			clearColour:"rgb(230,230,230)",
			clearOpacity:1,
			dash:[1,0],
			colour:"rgb(153,0,0)",
		},
		line:{
			lineJoin:"miter",
			cap:"round",
			opacity:0.95,
			lineWidth:5,
			colour:"#BBBBBB",
			excessColour:"#555555",
			deficitColour:"#CCCCCC",
			dash:[1,0],
			wrongDash:[1,6],
		},
		grid:{
			strokeColor:"rgb(77,77,77)",
			dual:true,
			edge:0.5,
			dash:[1,0],
			scale:0.75,
			nudge:0.35,
			scaleGrid:0.7,
			offsetY:1.1
		},
		rules:{
			dangleallowed:false,
			loopallowed:false,
			simpleshapes:Shape2s
		},
		win:{
			rule:{
				fillboard:true
			},
			grid:{
				fillColor:"#FFFFED",
				strokeColor:"#FFFFED"
			}
		},
		groups:{
			"red":{fruits:Join(["end-red"],PonkyPipes),colour:"rgb(200,0,0)"},
			"green":{fruits:Join(["end-green"],PonkyPipes),colour:"rgb(0,200,0)"},
			"blue":{fruits:Join(["end-blue"],PonkyPipes),colour:"rgb(0,0,200)"},
		},
		fruits:{
			"valve":{
				letter:"v",
				colour:"rgb(153,0,0)",
				viewBox:"0 0 20 20",
				path:"M 9 2 L 9 2 Q 2 2 2 10 Q 2 18 10 18 Q 18 18 18 10 Q 18 2 11 2 L 11 0 Q 20 0 20 10 Q 20 20 10 20 Q 0 20 0 10 Q 0 0 9 0 L 11 0 L 11 8 Q 12 8 12 9 L 18 9 L 18 11 L 12 11 Q 12 12 11 12 L 11 18 L 9 18 L 9 12 Q 8 12 8 11 L 2 11 L 2 9 L 8 9 Q 8 8 9 8 L 9 2 Z",
				rule:{
					crossforbidden:true,
					maxconnected:0,
					description:"No pipe passes through a valve."
				},
			},
			"end-red":Merge(Pieces["PonkyEnd"],{
				letter:"r",
				colour:"rgb(255,0,0)"
				}),
			"end-green":Merge(Pieces["PonkyEnd"],{
				letter:"g",
				colour:"rgb(0,255,0)",
				}),
			"end-blue":Merge(Pieces["PonkyEnd"],{
				letter:"b",
				colour:"rgb(0,0,255)",
				}),
			"junction-right":{
				letter:"d",
				colour:"rgb(153,0,0)",
				viewBox:"0 0 20 20",
				scale:1.1,
				shiftx:0.2,
				shifty:0.2,
				path:"M 13 7 L 17 7 L 18 6 L 20 6 L 20 14 L 18 14 L 17 13 L 13 13 L 13 17 L 14 18 L 14 20 L 6 20 L 6 18 L 7 17 L 7 3 L 6 2 L 6 0 L 14 0 L 14 2 L 13 3 Z",
				rule:{
					fruitshapes:["URD"],
					description:"Three pipes connect at triple junctions."
				}
			}
		}
	},
	"subway":{
		letter:"s",
		designation:"Subway",
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
		fruits:{
			"station":{
				letter:"t",
				colour:"rgb(255,255,0)",
				viewBox:"0 0 10 10",
				path:"M 0 5 Q 0 0 5 0 Q 10 0 10 5 Q 10 10 5 10 Q 0 10 0 5 Z",
				rule:{
					fruitshapes:["LU","UD","NS","EW"],
					minconnected:Infinity
				}
			},
			"park-N":{
				letter:"n",
				colour:"rgb(255,255,0)",
				viewBox:"0 0 10 10",
				path:"M 5 5 L 0 5 L 0 0 L 5 0 L 5 5 Z",
				rule:{
					shapesatfruitdisallowed:["NS","ND","DR"]
				}
			},
			"park-S":{
				letter:"s",
				colour:"rgb(255,255,0)",
				viewBox:"0 0 10 10",
				path:"M 5 5 L 10 5 L 10 10 L 5 10 L 5 5 Z",
				rule:{
					shapesatfruitdisallowed:["NS","SU","SL"]
				}
			}
			//etc...
		}
	}
}

var LettersGenre={};
Keys(Genres).map(function(name){
	LettersGenre[Genres[name].letter]=name;
	Genres[name.genre]=name;
});
var GenreLetters=FlipKeysValues(LettersGenre);

Shout("kudamono-genres")