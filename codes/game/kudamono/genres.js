
var Genres={
	"bonsai":{
		letter:"bonsai",
		author:"Lucas Le Slo",
		date:"2021-01-18",
		visuals:{
			solid:true
		},
		line:{
			lineJoin:"miter",
			cap:"square",
			opacity:1,
			lineWidth:4,
			colour:"rgb(134,0,16)",
			excessColour:"rgb(134,0,16)",
			dash:[1,0],
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
			simpleshapes:Join(Shape1s,Shape2s,Shape3s),
			maxtracks:1
		},
		symbolgroups:{
			"bonsai":["flower","fruit"]
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
				colour:"rgb(153,0,0)",
				viewBox:"0 0 1691 1192",
				shifty:0.1,
				path:"M 482 0 C 453 67 436 174 443 248 L 449 311 L 397 284 C 303 235 168 253 103 324 C 38 394 4 523 13 665 C 20 780 40 856 87 952 C 174 1131 338 1216 445 1138 C 462 1126 467 1126 489 1141 C 530 1168 626 1163 680 1130 C 780 1071 868 952 917 808 C 942 735 945 714 945 592 C 945 472 942 451 922 407 C 898 355 859 308 825 289 C 754 251 631 252 563 292 C 545 302 530 307 530 303 C 530 298 551 282 577 267 C 679 206 800 51 800 -21 L 800 -49 L 768 -32 C 708 -2 632 61 599 108 L 565 154 L 555 80 C 547 19 521 -48 506 -48 C 504 -48 493 -27 482 0 Z",
				rule:{
					symbolshapes:Shape2Straights,
					minconnected:Infinity
				}
			}
		}
	},
	"subway":{
		letter:"subway",
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
		symbolgroups:{
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

Shout("kudamono/genres")
console.log("g")