///////////////////////////////////////////////////////////////////////////////
//Kudamono Editor (c) Pedro PSI, 2021
//All rights reserved.
///////////////////////////////////////////////////////////////////////////////

LoadSource("codes/game/kudamono/kudamono-styles.css");
var sources=[
	"data-game-colours",
	"data-game-canvas",
	"data-game-undo",
	"data-game-segments"
];
sources.map(LoaderInFolder("codes/game/modules"));
if(PageSearch("G")){
	LoaderInFolder("codes/game/kudamono")("genres.js");
	sources=sources.concat("kudamono-genres")
}


//Definitions
GlobalTrackRules=["trackequaliser","mintracks","maxtracks"];

///////////////////////////////////////////////////////////////////////////////
//Line Shapes

var Shape1s=["L","U","R","D"];
var Shape2Straights=["LR","UD"];
var ShapeStraights=Join(Shape1s,Shape2Straights);
var Shape2Corners=["LU","UR","RD","LD"];
var Shape2s=Join(Shape2Straights,Shape2Corners);
var Shape3s=["LUR","URD","LRD","LUD"];
var Shape4s=["LURD"];
var ShapeBranches=Join(Shape3s,Shape4s);



///////////////////////////////////////////////////////////////////////////////
//Fruits & Rules

RuleVerifiers=function(){return {
	"TrackSymmetrised":TrackSymmetrised,
	"UnTranslateTrack":UnTranslateTrack}
};


FruitIcons={
	"apple":{
		letter:"a",
		colour:"rgb(153,0,0)",
		viewBox:"0 0 1250 1250",
		shifty:0.1,
		scale:0.7,
		path:"M 482 50 C 453 117 436 224 443 298 L 449 361 L 397 334 C 303 285 168 303 103 374 C 38 444 4 573 13 715 C 20 830 40 906 87 1002 C 174 1181 338 1266 445 1188 C 462 1176 467 1176 489 1191 C 530 1218 626 1213 680 1180 C 780 1121 868 1002 917 858 C 991 645 942 501 922 457 C 898 405 859 358 825 339 C 754 301 631 302 563 342 C 545 352 530 357 530 353 C 530 348 551 332 577 317 C 679 256 800 101 800 29 L 800 1 L 768 18 C 708 48 632 111 599 158 L 565 204 L 555 130 C 547 69 521 2 506 2 C 504 2 493 23 482 50 Z",
		rule:{
			loopallowed:true,
			trackValidator:"TrackSymmetrised",
			description:"Every Apple belongs to a mirror or rotationally symmetric path (loops allowed).",
			depiction:"W=2&L=a1a2a2a3&S=1DR2DRD"
		}
	},
	"pear":{
		letter:"p",
		colour:"rgb(102,153,0)",
		viewBox:"0 0 100 100",
		scale:0.7,
		shiftx:-0.1,
		shifty:0.1,
		path:"M 20 3 L 22 2 L 28 18 Q 36 16 42 40 Q 51 42 57 65 Q 62 99 25 97 Q -4 95 1 61 Q 7 33 18 22 Q 20 19 25 17 Q 10 14 7 0 Q 17 2 25 16 L 20 3 Z",
		rule:{
			mintracks:2,
			trackequaliser:"UnTranslateTrack",
			description:"All paths under Pears are exact translations (there is more than one).",
			depiction:"W=2&L=p1p2p2p2&S=1DR2DR"
		}
	},
	"blueberry":{
		letter:"b",
		colour:"rgb(0,0,153)",
		viewBox:"0 0 1669 1100",
		path:"M 641 1062 L 645 1025 L 591 1020 C 490 1009 411 938 393 839 L 386 800 L 374 830 C 346 896 251 939 187 914 C 161 904 159 906 151 936 C 143 966 142 967 135 945 C 129 926 123 923 99 928 C 72 934 70 932 67 897 C 64 864 60 858 32 851 L 0 843 L 19 810 C 33 788 39 760 39 718 C 39 615 101 543 189 543 L 224 543 L 191 517 C 103 447 76 316 132 221 C 147 195 173 164 190 152 L 220 131 L 193 102 L 165 73 L 207 73 C 247 73 249 72 249 43 C 249 26 252 13 256 13 C 259 13 282 25 307 39 L 351 65 L 384 33 L 418 0 L 442 55 C 461 98 476 115 512 137 C 561 165 601 210 619 257 C 630 286 630 286 644 266 C 661 241 718 213 751 213 C 764 213 792 222 814 234 C 851 254 853 254 866 237 C 878 220 879 220 879 240 C 879 252 887 263 899 266 C 917 271 918 275 909 299 C 899 323 901 329 919 343 L 940 359 L 914 373 C 900 381 880 406 869 430 C 826 527 703 541 644 456 L 620 420 L 606 455 C 576 526 472 583 372 583 L 330 583 L 354 618 C 367 638 383 670 390 690 L 401 725 L 419 686 C 456 602 545 543 644 536 C 695 532 712 535 759 560 C 837 600 874 662 874 752 C 874 793 867 831 856 853 C 841 884 841 894 853 940 L 867 992 L 822 995 C 779 998 776 1000 761 1038 C 741 1090 742 1089 721 1070 C 697 1048 690 1049 661 1076 L 637 1098 L 641 1062 Z",
		rule:{
			crossforbidden:true,
			minconnectable:2,
			maxconnected:0,
			description:"Every Blueberry is connectable with at least one other (as if a path were drawn).",
			depiction:"W=2&L=b0b8&S=3DD"
		}
	},
	"cherry":{
		letter:"c",
		colour:"rgb(204,0,0)",
		viewBox:"0 0 1050 1050",
		scale:0.6,
		path:"M 526 17 L 497 30 L 499 125 C 503 296 454 446 366 541 L 320 590 L 274 575 C 184 545 76 594 28 686 C -4 746 -3 843 31 903 C 81 994 177 1038 271 1013 C 331 997 404 924 420 863 C 436 805 427 721 401 685 L 381 656 L 431 603 C 513 515 571 375 586 226 C 593 164 593 163 612 180 C 647 212 720 330 745 396 C 758 432 771 485 772 515 L 775 568 L 740 566 C 641 559 555 610 514 697 C 471 789 491 893 564 961 C 658 1048 779 1041 862 944 C 928 867 936 764 884 675 C 864 641 859 622 864 595 C 872 541 853 431 822 349 C 784 253 730 172 648 90 C 611 53 580 18 580 13 C 580 0 562 2 526 17 Z",
		rule:{
			maxconnected:2,
			description:"Cherries connect only in pairs.",
			depiction:"W=2&L=c0c2c4c2&S=0DD6DD"
		}
	},
	"coconut":{
		letter:"q",
		colour:"rgb(108,82,0)",
		viewBox:"0 0 400 400",
		scale:0.6,
		path:"M 172 3 C 74 22 2 105 2 199 C 3 228 11 263 19 263 C 21 263 27 267 32 272 C 38 278 40 279 40 276 C 40 260 64 255 76 269 C 94 291 70 315 48 297 C 40 291 40 291 40 297 C 40 304 49 311 58 311 C 65 311 80 325 80 332 C 80 336 108 349 131 355 C 236 381 357 314 386 213 C 392 191 401 111 397 108 C 396 106 394 98 394 90 C 394 79 393 74 389 71 C 385 68 383 64 383 62 C 383 59 379 55 375 53 C 370 51 366 46 365 43 C 364 40 361 37 358 37 C 355 37 349 34 344 31 C 336 25 298 14 249 4 C 225 -0 191 -1 172 3",
		rule:{
			loopallowed:true,
			fruitshapes:Shape3s,
			simpleshapes:Shape2s,
			description:"Paths branch, as T-junctions, only at every Coconut, and no branch returns to its origin.",
			depiction:"W=2&L=q3q2&S=0RDDLUU3RDDL",
			branchloop:false
		}
	},
	"date":{
		letter:"d",
		colour:"rgb(92,0,0)",
		viewBox:"0 0 520 520",
		shiftx:-0.1,
		scale:0.7,
		path:"M 186 11 C 173 22 172 24 174 42 L 176 62 L 148 67 C 58 82 0 117 0 155 C 0 200 62 205 144 166 C 173 152 175 151 180 159 C 185 166 183 167 159 175 C 59 209 1 261 21 299 C 33 320 74 326 105 310 C 117 303 117 304 97 329 C 29 414 76 489 153 418 C 161 410 164 409 166 413 C 186 481 205 511 233 516 C 288 526 293 452 244 347 L 228 313 L 258 344 C 304 393 344 406 365 381 C 391 351 358 293 278 230 L 263 219 L 290 231 C 351 260 397 246 389 201 C 383 171 323 131 253 109 C 237 104 223 98 222 94 C 219 87 220 87 239 95 C 350 141 440 110 380 45 C 349 12 213 -12 186 11",
		rule:{
			minconnected:Infinity,
			fruitshapes:Shape1s,
			simpleshapes:Join(Shape2Straights,Shape3s),
			description:"The first two Dates connect via a straight line. Non-endpoints may spawn up to one straight branch ending at a Date.",
			depiction:"W=2&L=d1d4d1d2&S=1RD3RU3D",
			//TODO
			specialstartbranch:true
		}
	},
	"melon":{
		letter:"m",
		colour:"rgb(56,87,35)",
		viewBox:"0 0 1600 1600",
		shiftx:0.1,
		shifty:0.2,
		scale:0.8,
		path:"M 523 50 C 502 77 451 131 409 171 C 346 230 315 251 239 284 C 187 307 116 334 81 344 C 46 354 15 364 13 366 C 10 370 29 462 34 470 C 35 471 113 452 207 429 L 379 386 L 398 407 C 408 418 433 451 453 479 L 489 530 L 435 583 C 376 642 315 748 284 848 C 259 928 259 1104 283 1184 C 312 1277 359 1351 435 1427 C 553 1542 683 1596 842 1595 C 1121 1594 1313 1448 1405 1166 C 1445 1043 1419 850 1345 727 C 1278 614 1238 574 1122 505 C 986 425 771 409 609 468 C 585 477 558 486 550 489 C 540 492 517 468 483 421 L 432 349 L 541 207 L 650 65 L 617 41 C 563 0 563 0 523 50 Z",
		rule:{
			loopallowed:true,
			looprequired:true,
			description:"Melons belong to closed loops.",
			depiction:"W=2&L=m0m2m4m2&S=1URRDDLLU"
		}
	},
	"grape":{
		letter:"g",
		colour:"rgb(102,0,102)",
		viewBox:"0 0 1650 1650",
		scale:0.8,
		shifty:0.1,
		shiftx:-0.1,
		path:"M 362 19 C 354 31 350 41 352 43 C 354 44 397 71 448 102 C 498 134 540 163 540 169 C 540 182 510 210 454 249 C 415 276 395 283 358 283 C 302 283 267 311 245 374 C 236 403 226 414 208 416 C 168 421 143 439 119 482 C 99 516 95 536 97 594 C 98 660 96 667 74 679 C -10 723 -24 906 50 980 C 69 998 89 1008 109 1008 C 133 1008 142 1014 155 1043 C 164 1062 178 1082 186 1089 C 196 1097 198 1115 194 1157 C 186 1229 204 1293 241 1331 C 266 1355 277 1359 310 1356 C 347 1353 350 1354 366 1393 C 375 1415 385 1455 386 1483 C 391 1552 427 1618 472 1643 C 509 1662 510 1663 544 1644 C 564 1633 586 1610 596 1589 C 614 1551 620 1471 608 1427 C 601 1403 602 1402 630 1406 C 696 1416 750 1340 750 1239 C 750 1197 756 1169 770 1145 C 810 1078 805 971 758 905 C 739 879 739 876 755 833 C 775 781 772 699 748 652 C 740 634 736 614 740 607 C 759 573 761 507 746 455 C 721 369 662 331 602 362 C 585 371 566 386 561 395 C 553 408 551 390 550 327 L 550 242 L 612 159 C 671 79 673 75 655 62 C 637 49 633 51 604 85 L 573 122 L 494 73 C 451 46 406 19 395 11 C 377 0 373 1 362 19 Z M 488 409 C 468 422 466 421 449 373 L 432 328 L 464 303 L 495 278 L 498 340 C 500 382 497 404 488 409 Z",
		rule:{
			minconnected:Infinity,
			description:"All Grapes are connected by a single path.",
			depiction:"W=2&L=g0g2g4g2&S=0DDRRUU"
		}
	},
	"blackberry":{
		letter:"k",
		colour:"rgb(0,0,66)",
		viewBox:"0 0 400 400",
		scale:0.6,
		path:"M 108 2 C 95 6 85 19 85 33 C 69 29 47 38 49 60 C 22 55 5 90 18 109 C 1 125 -5 151 9 169 C 0 182 -1 198 11 210 C -2 232 18 257 38 253 C 42 280 77 293 102 272 C 120 295 158 279 151 260 C 175 271 185 255 184 245 C 207 246 210 228 211 222 C 219 220 218 222 215 226 C 212 228 209 233 210 247 C 192 245 189 281 206 286 C 198 313 219 328 234 319 C 235 341 253 345 261 336 C 263 349 295 353 298 339 C 310 348 331 344 333 331 C 340 341 360 332 357 320 C 363 328 379 325 372 312 C 378 318 391 306 384 295 C 399 294 407 282 393 266 C 412 259 399 225 384 226 C 393 208 373 189 359 196 C 364 189 354 172 337 182 C 340 162 311 160 306 172 C 297 157 278 160 274 171 C 255 154 246 175 245 171 C 264 152 263 123 237 116 C 249 100 232 80 221 79 C 219 60 210 51 194 46 C 196 29 173 3 149 16 C 147 18 145 16 140 11 C 137 7 132 4 130 3 C 121 0 113 0 108 2",
		rule:{
			loopallowed:true,
			looprequired:true,
			fruitshapes:Shape2Straights,
			simpleshapes:Shape2Corners,
			description:"Paths cross Blackberries straight and always turn elsewhere, forming loops.",
			depiction:"W=2&L=k3k4&S=1URRDDLUL"
		}
	},
	"lemon":{
		letter:"l",
		colour:"rgb(255,192,0)",
		viewBox:"0 0 32 32",
		scale:0.5,
		path:"M 1 31 Q 4 32 6 31 Q 29 31 31 8 Q 33 4 31 1 Q 28 -1 24 1 Q 1 3 1 26 Q 0 29 1 31 Z",
		rule:{
			crossforbidden:true,
			maxconnected:0,
			description:"No path passes through a Lemon.",
			depiction:"W=2&L=l4&S=1RR"
		}
	},
	"orange":{
		letter:"o",
		colour:"rgb(255,122,31)",
		viewBox:"0 0 1050 1050",
		scale:0.65,
		path:"M 416 61 L 372 61 L 372 214 C 128 225 9 425 0 603 C -1 798 144 1021 382 1022 C 606 1024 755 866 771 658 C 780 408 656 232 408 217 L 411 150 C 579 239 691 259 883 108 C 691 -56 572 -4 411 129 Z",
		rule:{
			crossforbidden:true,
			maxconnected:0,
			maxconnectable:1,
			description:"No Orange is connectable with another (no path could be drawn).",
			depiction:"W=2&L=o0o2o6&S=3DD"
		}
	}
}


var BlankState={
	
	//visuals
	id:"puzzle",
	render:{
		main:true,
		target:"kudamono-canvas",
		container:".game-container",
		once:false,
		reduce:0.8
	},
	visuals:{
		cursor:"pencil",
		cursorsize:80,
		monochrome:false,
		solid:false,
		skin:0.6								//fruit skin thickness
	},
	overline:{
		opacity:0.75,
		lineWidth:2,
		colour:"rgb(155,155,155)",
		dash:[1,1],
		//clearOpacity:0.75,
		//clearLineWidth:1,
		clearColour:"rgb(200,200,200)",
		clearDash:[5,5]
	},
	line:{
		dash:[1,1],
		wrongDash:[1,6],
		opacity:0.5,
		lineWidth:4,						//fruitline width
		cap:"round",
		lineJoin:"round",
		colour:"rgba(155,155,155)",			//default line colour
		excessColour:"#000000",				//path colour, too many fruit
		deficitColour:"#CCCCCC" 			//path colour, zero		fruit
	},
	metadata:{
		textColour:"#555555"				//text colour for metadata
	},
	grid:{
		strokeColor:"#BBBBBB",				//grid lines
		fillColor:"#FFFFFF",				//background
		lineWidth:2,						//width   of grid lines
		dash:[8/6,8/3,8/3,8/3,8/3,8/3,8/6], //dashing of grid lines
		border:{
			lineWidth:3,
			lineJoin:"miter",
			dash:false
		},
		edge:0.5,							//how many squares to add to the edge (to each of the shortest sides)
		scale:0.95,							//fruit scale (how large)
		nudge:0.3,							//fruit nudge (small adjustments to position)
		dual:false,							//disalign squares and grid
		scaleGrid:1,						//reduce the grid size
		offsetX:1,							//displace the grid horizontally
		offsetY:1						//displace the grid verticallly
	},
	gridEdit:{//grid in edit mode
		dash:[1,2,1,2,1,2,1,2,1,2,1],
		lineWidth:0.5,
		border:{
			strokeColor:"#BBBBBB"
		},				
	},

	//Puzzle
	W:7,
	H:7,
	level:{},
	segments:[],
	orchard:[],
	crosses:{},

	//global rules
	rules:{
		minconnected:2,
		branchallowed:false,
		loopallowed:false,
		dangleallowed:false
	},

	groups:{},// multi-fruit lines, if allowed
	win:{
		won:false
	},
	//Interaction
	mode:{
		edit:false,					//true:adding fruits, false:solving
		dragging:false,				//whether dragging
		clearing:false,				//whether clearing fruits, lines, etc...
		selection:[],				//current points selected (accumulates)
		error:false					//whether to display errors
	}
}

var Kudamono={
	genre:"kudamono",
	designation:"Kudamono",
	description:`Draw paths of a single fruit type along the grid, each containing at least two fruits.
	Unless otherwise indicated, paths do not loop, cross, branch or dangle.`,
	author:"Pedro",
	date:"2021-12-18",
	examples:[
		"W=8&L=g0d1o1a3q1q1d5q3q1q1d2d1l4q2g1c1o2q4g3c1a1c2g4c3m9p4b1m2p4p2p1g1m1m1b1p2p1&S=0DDDDRDLDDD1DDRR3UR2URDRDLLLDDRRURUDL7DDDL15RD13DLL14URRDLDLU6DR7DR",
		"W=35&H=23&L=b37a43b67g1a4c2o3l4p3m3c210a32b25b1g3a5c5q150l21m10o24l1p6m8d2&S=37DDD2DLDRD1DDDRRUUU3RRDDDLL3URRDDD3URDRURDDD4URRDDDLLUU3URDDDRUUU3URRDDDLLUU20RDL3DD3DD7DD161URDDRURURDDLDLLDDLUUUU5URDDDDRRUUUURDDDDDLLLLUUUU5URRRRDDDDDLLLLURUUUL5URRRRDDDDDLULLDLUUUU6URDDDDDDDDDLUUUUUUUU27URDDDLUU4URRDDLLU94URRDLL70URRDRURDDDDDLULULDDLUUUU5URRRRDDDDDLLLLUUUU5URDRDRUURDDDDDLULULDDLUUUU5URRRRDDDDDLLLLUUUU27URRDDDLLUU10URRDDDLLUU113URDL",
		"W=24&H=13&L=d16d5o1b1d11d10g3g2d11g15g2a10c1c2a1a25a2o2q12q28l15o1l27k13l12k1k2k13p15p12p15p12m3m26o3b1&S=16DDDRDRUU3DD3RRRRRRR1RRRRRRRRRRRRRRRRRRRRRR10D13R1DDRRUU40RRDDDDLL1DD44DD28UULLDDRRDD15UUURRURRD1RRRRRRRRRRR24DDD16URRDDLLU43UUR27UUR14URRDDLLU"
	],
	fruits:FruitIcons,
	//visuals
	mode:{
		fruit:First(FruitIcons),	//current fruit to be added
	},
	win:{
		rule:{
			minlines:1,
			maxlines:Infinity,
			fillgrid:false
		},
		grid:{
			// dash:[3,4.5,1,4.5,3],
			fillColor:"#FFFFDD",
			strokeColor:"#FFFFFF"
		}
	}
}

MarkIcons={
	"cross":{
		letter:"x",
		path:"M 1 0 L 5 4 L 9 0 L 10 1 L 6 5 L 10 9 L 9 10 L 5 6 L 1 10 L 0 9 L 4 5 L 0 1 Z",
		viewBox:"0 0 10 10",
		colour:"rgb(155,155,155)"},
	"dot":{
		letter:"0",
		viewBox:"0 0 10 10",
		path:"M 4 5 L 5 6 L 6 5 L 5 4 Z",
		colour:"rgb(155,155,155)"}
}



///////////////////////////////////////////////////////////////////////////////
//Tracks, Segments in state

PositionValid=function(px,py,state){
	if(isNaN(px)||isNaN(py))
		return false;
	if(state.grid.dual)
		return !(px<1||px>state.W-1)&&!(py<1||py>state.H-1);
	return !(px<0||px>state.W)&&!(py<0||py>state.H);
}

PointValid=function(xy,state){
	return PositionValid(xy[0],xy[1],state);
}

SegmentValid=function(segment,state){
	return SegmentDiscretised(segment)&&SegmentPoints(segment).every(point=>PointValid(point,state));
}

ValidSegments=function(segments,state){
	return segments.filter(seg=>SegmentValid(seg,state));
}



TrackDangled=function(track,state){
	var endpoints=TrackEndpoints(track);
	return endpoints.some(point=>!In(Join(...Values(state.level)),point));
}


FruitStatePoints=function(fruit,state){
	return state.level[fruit]||[];
}

FruitTrackStatePoints=function(fruit,track,state){
	return FruitStatePoints(fruit,state).filter(point=>PointTrackContained(point,track));
}

TrackStateFruitPoints=function(track,state){
	return Apply(Union,TrackFruits(track,state).map(fruit=>FruitTrackStatePoints(fruit,track,state)));
}



FruitStateOrchard=function(fruit,state){
	var orchard=state.orchard;
	var points=FruitStatePoints(fruit,state);
	return orchard.filter(track=>points.some(point=>PointTrackContained(point,track)));
}

PointStateTrack=function(point,state){
	var orchard=state.orchard;
	return First(orchard.filter(track=>PointTrackContained(point,track)));
}

PointUnFruited=function(xy,fruits,state){
	return !XYFruit(xy,state)||In(fruits,XYFruit(xy,state));
}

PointUnFruitTracked=function(xy,fruits,state){
	var track=PointStateTrack(xy,state);
	if(!track)
		return true;
	var trackfruits=TrackFruits(track,state);
	return trackfruits.length&&Subsetted(fruits,trackfruits); //includes empty tracks
}

///////////////////////////////////////////////////////////////////////////////
//Shapes

PointStateShape=function(point,state){
	return Join(...state.orchard.map(track=>PointTrackShape(point,track)));
}

FruitStateShapes=function(fruit,state){
	return FruitPoints(fruit,state).map(point=>PointStateShape(point,state));
}

FruitTrackStateShapes=function(fruit,track,state){
	return FruitTrackStatePoints(fruit,track,state).map(point=>PointStateShape(point,state));
}

UnFruitTrackStateShapes=function(fruit,track,state){
	return Complement(TrackPoints(track),FruitTrackStatePoints(fruit,track,state)).map(point=>PointStateShape(point,state));
}




///////////////////////////////////////////////////////////////////////////////
//Connectables

PointConnectableAble=function(xy,fruits,state){
	return PointUnFruited(xy,fruits,state)&&PointUnFruitTracked(xy,fruits,state);
}

PointConnectablePoints=function(xy,fruits,state){
	var seenPoints=[];
	var plannedPoints=[xy];
	var point;
	var nextPoints;
	while(plannedPoints.length){
		point=First(plannedPoints);
		nextPoints=PointNeighbourPoints(point).filter(xy=>PointValid(xy,state)&&PointConnectableAble(xy,fruits,state)).filter(xy=>!In(plannedPoints,xy)&&!In(seenPoints,xy))
		plannedPoints=plannedPoints.concat(nextPoints);
		plannedPoints=Rest(plannedPoints);
		seenPoints.push(point);
	}
	return seenPoints;
}

PointConnectableFruitPoints=function(xy,fruit,state){
	var connectablePoints=PointConnectablePoints(xy,[fruit],state);
	var positions=(state.level[fruit]||[]);
	return positions.filter(xy=>In(connectablePoints,xy));
}




//TODO self-loop coconut - not working! (yet)
PointTrackNextNodePoints=function(xy,track,state){
	var seenPoints=[];
	var plannedPoints=[xy];
	var point;
	var nextPoints;
	var nodePoints=[];
	var fruitPoints=TrackStateFruitPoints(track,state);
	while(plannedPoints.length){
		point=First(plannedPoints);
		seenPoints.push(point);
		if(In(fruitPoints,xy)){
			nodePoints.push(xy);
		}
		nextPoints=PointContiguousTrackPoints(point,track).filter(xy=>PointValid(xy,state)).filter(xy=>!In(plannedPoints,xy)&&!In(seenPoints,xy)&&!In(nodePoints,xy))
		plannedPoints=plannedPoints.concat(nextPoints);
		plannedPoints=Rest(plannedPoints);
	}
	return nodePoints;
}


LevelFruits=function(state){
	return Keys(state.level).filter(s=>state.level[s].filter(xy=>PointValid(xy,state)).length);
}

///////////////////////////////////////////////////////////////////////////////
//Error detection

FruitStateRule=function(fruit,state){
	return state.fruits[fruit].rule;
}

TrackFruits=function(track,state){
	return Keys(state.level).filter(fruit=>state.level[fruit].some(
		point=>track.some(segment=>In(segment,point))));
}

TrackFruitNumber=function(track,fruit,state){
	return Count(state.level[fruit],point=>PointTrackContained(point,track));
}

TrackFruitsNumber=function(track,state){
	return Keys(state.level).map(fruit=>TrackFruitNumber(track,fruit,state));
}

FruitNumber=function(fruit,state){
	return state.level[fruit].length;
}

FruitTrackStateLocallyErred=function(fruit,track,state){
	var rule=Merge(state.rules,FruitStateRule(fruit,state));
	
	var wrong=false;
	if(!wrong&&rule.crossforbidden)
		wrong=true;

	if(!wrong&&rule.minconnected||rule.maxconnected){
		var min=rule.minconnected;
		if(min===Infinity)
			min=FruitNumber(fruit,state);
		var n=TrackFruitNumber(track,fruit,state);
		wrong=(n>rule.maxconnected||n<min)
	}

	if(!wrong&&rule.trackValidator&&!RuleVerifiers()[rule.trackValidator](track))
		wrong=true;
	if(!wrong&&rule.fruitshapes){
		wrong=Complement(FruitTrackStateShapes(fruit,track,state),rule.fruitshapes).length>0;
		rule.branchallowed=rule.branchallowed||Intersected(rule.fruitshapes,ShapeBranches);
	}
	if(!wrong&&rule.simpleshapes){
		wrong=Complement(UnFruitTrackStateShapes(fruit,track,state),rule.simpleshapes).length>0;
		rule.branchallowed=rule.branchallowed||Intersected(rule.simpleshapes,ShapeBranches);
	}
	if(!wrong&&rule.unconsecutiveshapes){
		wrong=TrackConsecutiveShapePairs(track).some(pair=>rule.unconsecutiveshapes.some(incompatibles=>Subsetted(incompatibles,pair)));
	}
	if(!wrong&&!rule.loopallowed&&TrackLooped(track))
		wrong=true;
		
	if(!wrong&&rule.looprequired&&!TrackLooped(track))
		wrong=true;
		
	if(!wrong&&!rule.branchallowed&&TrackBranched(track))
		wrong=true;

	if(!wrong&&Intersected(rule.simpleshapes,Shape1s))
		rule.dangleallowed=true;

	if(!wrong&&!rule.dangleallowed&&TrackDangled(track,state))
		wrong=true;
		
	return wrong;
}

FruitGroupName=function(fruit,state){
	if(!state.groups)
		return fruit;
	return Keys(state.groups).find(k=>In(state.groups[k].fruits,fruit))||fruit;
}

TrackStateErrors=function(track,state){
	var fruits=TrackFruits(track,state);
	var errors={};
	if(fruits.length<1)
		errors.deficit=true;
	else if(Gather(fruits,type=>FruitGroupName(type,state)).length>1)
		errors.excess=true;
	else{
		if(fruits.length===1) //Single-type paths
			errors.localised=FruitTrackStateLocallyErred(First(fruits),track,state);
		else
			while(!errors.equalised&&fruits.length){ //Multi-type paths
				errors.equalised=FruitTrackStateLocallyErred(First(fruits),track,state);
				fruits=Rest(fruits);
			}
	}
	return errors;
}

StateAtErrors=function(state){
	
	var orchard=state.orchard;
	if(!orchard.length)
		return {};
	
	var positionErrors={};
	var globalFruits=Keys(state.level).filter(fruit=>Intersected(Keys(state.fruits[fruit].rule),GlobalTrackRules));
	
	var globalOrchards=globalFruits.map(fruit=>FruitStateOrchard(fruit,state));
	var localOrchard=Complement(orchard,Join(...globalOrchards));

	var localOrder=Order(orchard,localOrchard);
	var localErrors=localOrchard.map(track=>TrackStateErrors(track,state));
	
		localOrder.map((p,i)=>positionErrors[p]=localErrors[i]);

	var globalErrors=Join(...globalOrchards.map((orchard,i)=>GlobalOrchardErrors(orchard,state,globalFruits[i])));
	var globalOrder=Order(orchard,Join(...globalOrchards));

		globalOrder.map((p,i)=>positionErrors[p]=globalErrors[i]);
	return positionErrors;
}

GlobalOrchardErrors=function(orchard,state,fruit){
	var globalErrors={}
	var rule=state.fruits[fruit].rule
	var Equaliser=RuleVerifiers()[rule.trackequaliser];
	if(Equaliser)
		globalErrors.equalised=Unique(orchard.map(Equaliser)).length>1;
	if(rule.mintracks)
		globalErrors.mintracks=orchard.length<rule.mintracks;
	if(rule.maxtracks)
		globalErrors.maxtracks=orchard.length>rule.maxtracks;
	
	var localErrors=orchard.map(track=>TrackStateErrors(track,state));
		localErrors=localErrors.map(errors=>Merge(errors,globalErrors));
	return localErrors;
}

FruitLoned=function(fruit,state){
	return FruitRuleLoned(state.fruits[fruit].rule)
}

FruitRuleLoned=function(rule){
	var loned=false;
	if(typeof rule.maxconnected!=="undefined")
		loned=rule.maxconnected<2;
	if(!loned&&(typeof rule.minconnected!=="undefined"))
		loned=rule.minconnected>rule.maxconnected;
	if(typeof rule.maxconnectable!=="undefined")
		loned=rule.maxconnectable<2;
	if(!loned&&(typeof rule.minconnectable!=="undefined"))
		loned=rule.minconnectable>rule.maxconnectable;	
	return loned;
}

SocialFruitsTrackContained=function(state){
	var socialfruits=Keys(state.fruits).filter(fruit=>!FruitLoned(fruit,state));
	var socialfruitpoints=socialfruits.map(fruit=>FruitStatePoints(fruit,state));
	return Join(...socialfruitpoints).every(point=>PointForestContained(point,state.orchard));
}

XYFruitStateErrors=function(xy,fruit,state){
	var errors={};
	var loned=FruitLoned(fruit,state);
	var tracked=PointForestContained(xy,state.orchard);
	
	errors.loned=(loned&&tracked)||(!loned&&!tracked);
	
	var rule=state.fruits[fruit].rule;
	if(rule.maxconnectable||rule.minconnectable){
		var connectables=PointConnectableFruitPoints(xy,fruit,state);
		errors.maxconnectable=connectables.length>rule.maxconnectable;
		errors.minconnectable=connectables.length<rule.minconnectable;
	}
	return errors;
}

///////////////////////////////////////////////////////////////////////////////
//Win

StateWon=function(state){
	var wrong=false;
	if(state.atErrors)
		wrong=Values(state.atErrors).map(errors=>Values(errors).some(Identity)).some(Identity);

	if(!wrong)
		wrong=!SocialFruitsTrackContained(state);

	if(!wrong)
		wrong=Keys(state.level).some(fruit=>state.level[fruit].some(xy=>XYFruitErred(xy,fruit,state)))
	
	var rule=state.win.rule;
	if(!wrong&&rule){
		if(!wrong&&rule.minlines&&state.orchard.length<rule.minlines)
			wrong=true;
		if(!wrong&&rule.maxlines&&state.orchard.length>rule.maxlines)
			wrong=true;
		if(!wrong&&rule.fillboard)
			wrong=!BoardFilled(state);
	}
	return !wrong;
}

StatePoints=function(state){
	var points=[];
	for(var x=0;x<state.W;x++)
		for(y=0;y<state.H;y++)
			if(PointValid([x,y],state))
				points.push([x,y])

	return points;
}

BoardFilled=function(state){
	return StatePoints(state).every(xy=>PointForestContained(xy,state.orchard))
}

///////////////////////////////////////////////////////////////////////////////
//Draw

TrackStyles=function(track,state,styles,errors){
	var errors=errors||{};
	var fruits=TrackFruits(track,state);
	var fruit=First(fruits);
	var group=FruitGroupName(fruit,state);
	
	var colour;
	
	if(errors.deficit)
		colour=state.line.deficitColour;
	else if(errors.excess)
		colour=state.line.excessColour;
	else if(group&&state.groups[group]&&fruits.length>1)
		colour=state.groups[group].colour||state.line.excessColour;
	else if(fruit)
		colour=state.fruits[fruit].colour;
	
	var lineCap="round";
	var lineWidth=styles.lineWidth||state.line.lineWidth||1;
	var opacity=styles.opacity||state.line.opacity||1;

	var dash=state.line.dash;
	if(!errors.deficit&&Values(errors).some(Identity))//global and local errors
		dash=state.line.wrongDash;
	
	if(styles.edit){
		dash=state.overline.dash||dash;
		colour=state.overline.colour;
		opacity=state.overline.opacity;
		lineWidth=state.overline.lineWidth;
		if(styles.clearing){
			dash=state.overline.clearDash||dash;
			colour=state.overline.clearColour||colour;
			opacity=state.overline.clearOpacity||opacity;
			lineWidth=state.overline.clearLineWidth||lineWidth;
		}
	}

	if(state.visuals.monochrome)
		colour=HEXSaturater(0)(styles.colour);
	
	if(typeof styles.opacity!=="undefined")
		colour=CompelRGBA(colour,styles.opacity);
	
	return {
		target:state.render.target+(styles.edit?"-overline":"-line"),
		strokeColor:colour,
		dash:dash,
		lineCap:lineCap,
		lineWidth:lineWidth
	}
}

TrackDraw=function(track,state,styles,errors){
	if(!track.length)
		return false;
	
	var trackStyles=TrackStyles(track,state,styles,errors||{});
	
	var track=track.filter(segment=>SegmentValid(segment,state));
		track=UnDiscretiseTrack(track);
	
	track.map(segment=>SegmentDraw({
		px0:segment[0][0],
		px1:segment[1][0],
		py0:segment[0][1],
		py1:segment[1][1],
		...trackStyles
	},state))

	return errors;
}

SegmentDraw=function(opts,state){
	var gridOpts={
		...state.grid,
		rows:state.H,
		cols:state.W
	}
	var opts={
		...gridOpts,
		...GridExtremes(gridOpts),
		...opts
	}
	GridLineDraw(opts);
}




XYFruitErred=function(xy,fruit,state){
	var errors=XYFruitStateErrors(xy,fruit,state);
	return Values(errors).some(Identity);
}

StateFruitDraw=function(state,fruit,xy,Opts){
	if(!fruit||!xy||!PositionValid(xy[0],xy[1],state)||!fruit)
		return;

	var Opts={
		...Opts,
		...state.grid,
		...state.fruits[fruit],
		rows:state.H,
		cols:state.W,
		px:xy[0],
		py:xy[1]
	};

	var wrong=XYFruitErred(xy,fruit,state);

	var primarycolour=Opts.colour;
	if(primarycolour&&Opts.coloriser)
		primarycolour=Opts.coloriser(primarycolour);

	var colour=primarycolour;
	var strokeStyle=primarycolour;
	var lineWidth=state.visuals.skin||0.1;

	if(In(state.mode.selection,[Opts.px,Opts.py])){
		colour=HEXLightener(0.9)(colour);
		lineWidth=2*lineWidth;
	}
	else{
		if(wrong&&!state.visuals.solid)
			colour=HEXLightener(0.95)(colour);
		else
			lineWidth=0.1;
	}


	if(state.visuals.monochrome){
		strokeStyle=HEXSaturater(0)(strokeStyle);
		colour=HEXSaturater(0)(colour);
	}

	if(typeof Opts.shiftx==="undefined")
		Opts.shiftx=0;
	if(typeof Opts.shifty==="undefined")
		Opts.shifty=0;

	Opts.shiftx+=Opts.nudge;
	Opts.shifty+=Opts.nudge;

	Opts.colour=colour;
	Opts.strokeStyle=strokeStyle;

	Opts.dash=false;
	Opts.lineWidth=lineWidth;
	
	SVGDraw(Opts);
}

DrawFruits=function(fruit,coordinates,Opts,state){
	var Opts=Opts||{};
	(coordinates||[]).map(xy=>StateFruitDraw(state,fruit,xy,Opts));
}

OverLevelDraw=function(state){
	var target=state.render.target+"-overlevel";
	ClearCanvas(target);
	if(state.mode.dragging&&state.mode.edit)
		DrawFruits(
			state.mode.fruit,
			state.mode.selection,
			{
				coloriser:state.mode.clearing?HEXLightener(0.9):HEXDarkener(0.8),
				target:target
			},
			state);
}

LevelDraw=function(state){
	var target=state.render.target+"-level";
	ClearCanvas(target);
	var fruits=Keys(state.level);
		fruits.map(fruit=>DrawFruits(fruit,state.level[fruit],{target:target},state));
}

GridDraw=function(state){
	var target=state.render.target+"-grid";
	var gridOpts={
		...state.grid,
		rows:state.H,
		cols:state.W,
	}
	if(state.grid.dual){
		gridOpts.rows-=1;
		gridOpts.cols-=1;
		gridOpts.edge=1;
	}
	if(state.mode.edit&&state.gridEdit)
		gridOpts=Merge(gridOpts,state.gridEdit);
	if(state.win.won)
		gridOpts=Merge(gridOpts,state.win.grid);

	if(state.visuals.monochrome){
		if(gridOpts.strokeColor)
			gridOpts.strokeColor=HEXSaturater(0)(gridOpts.strokeColor);
		if(gridOpts.fillColor)
			gridOpts.fillColor=HEXSaturater(0)(gridOpts.fillColor);

	}
	ClearCanvas(target);
	gridOpts.target=target;
	SquaresGridDraw(gridOpts);
}


ForestDraw=function(forest,state,Opts){
	var positionErrors=state.atErrors;

	var target=state.render.target+"-line";
	if(state.mode.edit)
		target=state.render.target+"-overline";
	
	forest.map((track,i)=>TrackDraw(track,state,Opts,positionErrors[i]));
}

OrchardDraw=function(state){
	var orchard=state.orchard;
	var Opts=Extremes(state);
	Opts={
		...Opts,
		opacity:state.line.opacity,
		lineWidth:state.line.lineWidth,
	}
	ClearCanvas(state.render.target+"-line");
	ForestDraw(orchard,state,Opts);
}

OverlineDraw=function(state){
	var seltrack=PathTrack(state.mode.selection);
	Opts={
		edit:true,
		clearing:state.mode.clearing,
		...state.overline,
	}

	var target=state.render.target+"-overline";
	ClearCanvas(target);
	if(!state.mode.edit&&state.mode.dragging)
		TrackDraw(seltrack,state,Opts)
}


RulesDraw=function(state){
	var levelFruits=LevelFruits(state);
	var n=levelFruits.length;

	var dH=1/4;
	var dV=2/7;
	var cols=2;
	var x=1/3;
	var y=1/2;
	var scale=0.15;

	for(var i=0;i<levelFruits.length;i++){
		var fruit=levelFruits[i];
		var rule=state.fruits[fruit].rule;
		
		var rendering={
			grid:{
				scaleGrid:scale,
				offsetX:x+dH*((n-i)%cols),
				offsetY:y+Ceiling((i+1)/cols)*dV
			},
			render:{
				main:false,
				target:state.target
			}
		}

	
		var miniboard=FruitSerialState(fruit,rule.depiction,state);
			miniboard=CompleteState(Join(miniboard,rendering));

		//BoardDraw(miniboard,"rules");
		
		var s={
			dH:dH,
			dV:dV,
			x:x,
			y:y,
			cols:cols,
			offsetX:x+dH*((n-i)%cols),
			offsetY:y+Ceiling((i+1)/cols)*dV
		};
		var description=rule.description;
		//RuleDescriptionDraw(description,miniboard,s);
		
	}
}



RuleDescriptionDraw=function(subtitle,state,subs){
	var ext=Extremes(state);
	var opts={
		...opts,
		txt:subtitle,
		fontWeight:"italic",
		fontSize:"calc(var(--fontheight))",
		x:subs.offsetX,
		y:subs.offsetY
	}
	
	DrawText(opts);
}



MetadataColophon=function(metadata){
	var number=metadata.number?(Prefix(metadata.number,"#")+" "):"";
	var difficulty=metadata.difficulty?(ObtainSymbol("asterisk-heavy").repeat(metadata.difficulty)+" "):"";
	
	var title=metadata.title?(Exfix(metadata.title,'"')+" "):"";
	var author=metadata.author?("by "+metadata.author):"";
	var date=metadata.date||"";
	if(date){
		date=" — "+TrimWhitespaceString(SpacedString(StripHTML(StringDateName(date,{simplified:true}))))
	}
	return number+title+difficulty+author+date;
}

MetadataTitleDraw=function(state){
	var title=Capitalise(state.designation||state.genre);
	var subtitle=state.description;

	ReplaceChildren(`
		<div class="title">${title}</div>
		<div class="subtitle">${subtitle}</div>`,
		state.render.target+"-metadatatitle");
}

MetadataColophonDraw=function(state){
	var url=state.metadata.url||"";
	var colophon=MetadataColophon(state.metadata);
	
	var thanks=state.metadata.thanks?("With thanks to "+P(state.metadata.thanks)+"."):"";

	ReplaceChildren(`
	<div class="colophon">
		<div class="authorship">
			<div class="author">${colophon}</div>
			<div class="url">${url}</div>
		</div>
		<div class="thanks">${thanks}</div>
	</div>
	`,
	state.render.target+"-metadatacolophon");
}



///////////////////////////////////////////////////////////////////////////////
//Serials
//serials represent the state of the board as an URL, compact and exactly



ExportSerial=function(){
	ClipboardCopy(PageURL(),"Copied this puzzle's URL to clipboard, for saving!")
}

FruitStateLetter=function(fruit,state){
	var fruit=state.fruits[fruit]||First(state.fruits);
	return fruit.letter.toLowerCase();
}


LevelSerial=function(state){
	if(!state.level||Keys(state.level).length<1)
		return "";
	var xyfruits=Keys(state.level).map(fruit=>state.level[fruit].map(xy=>[xy[0],xy[1],FruitStateLetter(fruit,state)]));
		xyfruits=Join(...xyfruits);
		xyfruits=xyfruits.filter(fxy=>PointValid(fxy,state));

	var	fruitsxys=xyfruits.map(fxy=>[fxy[2],Linearise(fxy,(state.H))]);
		fruitsxys=Sorter(Last)(fruitsxys);
		fruitsxys=Join([["",0]],fruitsxys);
		fruitsxys=Rest(fruitsxys).map((p,i)=>p[0]+(p[1]-fruitsxys[i][1]));
	
	return fruitsxys.join("");
}


SerialLevel=function(serial,state){
	var fruitserials=serial.match(FruitSerialPattern);
	var fruitdiffs=fruitserials.map(s=>[s[0],Number(Rest(s))]);
	var accumulated=AccumulateTokenCoords(fruitdiffs,state.H+1);
	var level={};
	Keys(state.fruits).map(fruit=>(level[fruit]=accumulated.filter(a=>a[0]===FruitStateLetter(fruit,state)).map(Last)));
	return level;
}

FruitSerialPattern=/(\w)(\d+)/g;

GenreSerial=function(state){
	if(typeof GenreLetters==="undefined"||!In(GenreLetters,state.genre))
		return "";
	return GenreLetters[state.genre];
}
SerialState=function(serialObj,state){
	var state=Clone(state);
	var serialObj=ReKeyObject(serialObj,LowerCase);
		state.W=Max(Number(serialObj.w||serialObj.h)||0,2);
		state.H=Max(Number(serialObj.h||serialObj.w)||0,2);
		if(serialObj.g){
			state=SerialGenreState(serialObj.g,state)
		}
		else
			state=Merge(state,Kudamono);
		if(serialObj.l)
			state.level=SerialLevel(serialObj.l,state);
		else{
			state.mode.edit=true;
			state.mode.fruit=First(Keys(state.fruits));
		}

		if(serialObj.s)
			state.segments=SerialOrchard(serialObj.s,state.H);

		state.metadata=Merge(state.metadata||{},SerialMetadata(serialObj))
	return state;
}

var MetadataAbbreviations={
	"author":"a",
	"date":"d",
	"difficulty":"f",
	"thanks":"k",
	"number":"n",	
	"title":"t",
	"url":"u"
}

var AbbreviationsMetadata=FlipKeysValues(MetadataAbbreviations);

SerialMetadata=function(serialObj){
	var metadata=ObjectKeyIntersection(serialObj,AbbreviationsMetadata);
		metadata=ReKeyObject(metadata,Accesser(AbbreviationsMetadata));
		Keys(metadata).map(k=>metadata[k]=decodeURIComponent(metadata[k]));
	return metadata;
/***
sort, ignore capitalised abbreviations, anything not in abbreviations
SerialMetadata({T:"Title",a:"Name Surname",thrash:"Thrash"})
"a=Name%20Surnams&t=Title"
***/
}

MetadataSerial=function(metadata){
	var serialObj=ObjectKeyIntersection(metadata,MetadataAbbreviations);
		serialObj=ReKeyObject(serialObj,Accesser(MetadataAbbreviations,LowerCase));
	return serialObj;
}



SerialGenreState=function(g,state){
	if(typeof LettersGenre==="undefined")
		return Merge(state,Kudamono);//Default to kudamono;
	var state=Clone(state);
	if(In(LettersGenre,g)){
		state.genre=LettersGenre[g];
		state=Merge(state,Genres[state.genre])
	}
	else
		state=Merge(state,Kudamono);//Default to kudamono
	return state
}

StateSerial=function(state){
	var Opts={};
		Opts.W=state.W;
	if(state.H!==state.W)
		Opts.H=state.H;
	var l=LevelSerial(state);
	if(l)
		Opts.L=l;
	var s=OrchardSerial(state.orchard,state.H);
	if(s)
		Opts.S=s;
	var g=GenreSerial(state);
	if(g)
		Opts.G=g;
	if(state.metadata)
		Opts=Merge(Opts,MetadataSerial(state.metadata))
	Opts=ReKeyObject(Opts,UpperCase);
	return ParameterString(Opts);
}


FruitSerialState=function(fruit,serial,suprastate){
	var state=SerialState(SearchParameters(serial),Clone(suprastate));
		state.id="rule-"+fruit;
		state.render={main:false,target:suprastate.render.target,once:true};
		state.mode.selection=[];
		state=ComplementKeysObject(["examples","designation"],state);	
	return state;
}

///////////////////////////////////////////////////////////////////////////////


//Undo
ObtainSetLevelState=function(state){
	state.mode.selection=BlankState.mode.selection;
	state.mode.dragging=BlankState.mode.dragging;
	state.mode.clearing=BlankState.mode.clearing;
	SaveState(state);
	StateDraw(state);
}

CompleteState=function(state){
	if(state.render.once&&state.render.expanded)
		return state;
	var state=Clone(state);
	state.orchard=SegmentsOrchard(ValidSegments(state.segments,state));
	state.atErrors=StateAtErrors(state);
	if(state.render.main)
		state.win.won=StateWon(state);
	state.render.expanded=true;
	return state;
}

AdvanceState=function(substate,options){
	var options=options||{}	;
	var state=IdState(options.id);
	var OLDSTATE=Clone(state);
	
	var overwrSubstate=FilterKeysObject(substate,p=>In(OverwritableProperties,p));
	var normalSubstate=FilterKeysObject(substate,p=>!In(OverwritableProperties,p));
	
	state={...state,...overwrSubstate};
	state=MergeEvaluateObject(state,normalSubstate);
	changed=ComplementObject(state,OLDSTATE);

	if(Intersected(Keys(changed),CompletableProperties)||options.initialise){
		state=CompleteState(state);
		changed=Join(changed,ComplementObject(state,OLDSTATE));
	}

	if(Intersected(changed,LayersChanged["cursor"])||options.initialise){
		state.visuals.cursor=StateCursorName(state);
	}

	state.changed=changed;
	return state;
}

CompletableProperties=["segments","level","W","H"];
UndoableProperties=CompletableProperties;
DrawableProperties=Join(UndoableProperties,["mode","visuals","win"]);
OverwritableProperties=["level"]

LayerPainter=function(layer){
	var layerspainters={
	"grid":GridDraw,
	"line":OrchardDraw,
	"overline":OverlineDraw,
	"level":LevelDraw,
	"overlevel":OverLevelDraw,
	"rules":RulesDraw,
	"metadatatitle":MetadataTitleDraw,
	"metadatacolophon":MetadataColophonDraw,
	"cursor":CursorDraw
	}
	if(In(layerspainters,layer))
		return layerspainters[layer];
	else
		return Identity;
}

LayersChanged={
	grid:["force-grid","W","H","visuals.monochrome","win.won","grid","mode.edit"],
	level:["force-level","W","H","visuals.monochrome","orchard","level"],
	overlevel:["force-overlevel","W","H","visuals.monochrome","mode.edit","mode.selection","mode.dragging","mode.fruit"],
	line:["force-line","W","H","visuals.monochrome","orchard"],
	overline:["force-overline","W","H","visuals.monochrome","mode.edit","mode.selection"],
	rules:["force-rules","visuals.monochrome","rules"],
	metadatatitle:["force-metadata","force-metadatatitle"],
	metadatacolophon:["force-metadata","force-metadatacolophon"],
	cursor:["visuals.monochrome","mode.fruit","mode.edit","mode.clearing"]
}

LayerSubsequents={
	grid:"level",
	level:"overlevel",
	overlevel:"line",
	line:"overline"
}




ChangedLayers=function(changed,state){
	var layerschanged=Clone(LayersChanged);

	
	var changes=layerschanged;
	if(changed){
		changed=changed.map(cha=>UnPosfix(cha,Afterfix(cha,"level")));
		changes=FilterValuesObject(layerschanged,changes=>Intersected(changed,changes));
	}
	var layers=Keys(changes);
		layers=layers.map(l=>ItemPrecedents(l,LayerSubsequents));
		layers=Apply(Union,layers)||[];
	return layers;
}

StateDraw=function(state,changed){
	var layers=Keys(LayersChanged);
	if(changed)
		layers=ChangedLayers(changed,state);
	layers.map(layer=>LayerPainter(layer)(state));
}




UpdateState=function(substate,options){
	var state=AdvanceState(substate,options);
	var changed=TreeKeys(state.changed);
		changed=Union(changed,options.draw||[])
	StateDraw(state,changed);

	if(changed.length)
		SaveState(state);
	if(Intersected(changed,UndoableProperties)){
		AddUndo(state);
		NavigateSerial(StateSerial(state));
	}
}
	


StateKeyHandlerer=function(substate){
	return function(e){
		var id=TargetState(Spotlight().id).id;
		UpdateState(substate,{id:id});
	}
};

StateCursorName=function(state){
	var cursor=state.visuals.cursor||"pencil";
	if(!state.mode.edit){
		if(state.mode.clearing)
			cursor="pencil-erase";
		else
			cursor="pencil";
	}
	else if(state.mode.fruit){
		if(state.mode.clearing)
			cursor="eraser";
		else
			cursor=state.mode.fruit;
	}
	return cursor;
}

CursorDraw=function(state){
	var name=StateCursorName(state);
	var cursor=name;
	var opts={};
	var Icons=state.fruits;
	if(In(Icons,name)){
		cursor=Icons[name];
		if(!CursorDraw[name]){
			cursor=RescalePath({...cursor,scale:1,square:100},true);
			cursor=DisplacePath({...cursor,px:10,py:10});
			cursor.viewBox="0 0 110 110",
			cursor=BuildSymbolIcon({...cursor,primitive:"cursor-triangle"});
			CursorDraw[name]=cursor;
		}
		else
			cursor=CursorDraw[name];
					
		opts.fill=Icons[name].colour;
		if(state.visuals.monochrome){
			opts.fill=CompelRGBA(HEXSaturater(0)(Icons[name].colour));
		}
	}
	opts.width=state.visuals.cursorsize||80;
	opts.height=state.visuals.cursorsize||80;
	SetCursor(state.render.target,cursor,opts);
}




Extremes=function(state){
	var gridOpts={
		...state.grid,
		rows:state.H,
		cols:state.W
	}
	return GridExtremes(gridOpts);
}


CanvasPosition=function(x,y,w,h,state){
	var extremes=Extremes(state);
	var X=state.W*(x/w*extremes.width-extremes.x0)/(extremes.x1-extremes.x0);
	var Y=state.H*(y/h*extremes.height-extremes.y0)/(extremes.y1-extremes.y0);
	return [X,Y];
}

CanvasPoint=function(x,y,w,h,state){
	var p=CanvasPosition(x,y,w,h,state);
	return [
		Floor((p[0]+0.5)),
		Floor((p[1]+0.5))
	]
}


// CanvasBoxPosition=function(x,y,state){
// 	xy=CanvasBoardPosition(x,y,state);
// 	var x=FractionalPart(xy[0]/state.W);
// 	var y=FractionalPart(xy[1]/state.H);
// 	var s=1/4;//centre box width
// 	if(x>s&&x<1-s&&y>s&&y<1-s)
// 		return 0;
// 	if(x>s){
// 		if(y>s){
// 			if(y<x)
// 				return 1;
// 			else
// 				return 8;
// 		}
// 		else{
// 			if(y<x-1)
// 				return 3;
// 			else
// 				return 2;
// 		}
// 	}
// 	else{
// 		if(y>s){
// 			if(y<x)
// 				return 4;
// 			else
// 				return 5;
// 		}
// 		else{
// 			if(y<x-1)
// 				return 6;
// 			else
// 				return 7;
// 		}

// 	}
// }

XYFruits=function(xy,state){
	return Keys(state.level).filter(k=>In(state.level[k],xy));
}

XYFruit=function(xy,state){
	var fruits=XYFruits(xy,state);
	if(fruits.length)
		return First(fruits);
	else
		return false;
}

XYFruitsRemoveLevel=function(points,state){
	var level=Clone(state.level);
	points.map(function(xy){
		if(!PointValid(xy,state))
			return;
		XYFruits(xy,state).map(oldfruit=>level[oldfruit]=level[oldfruit].filter(cr=>!Equal(cr,xy)));
	})
	return level;
}

LevelUpdate=function(level,state){
	if(!Equal(level,state.level))
		UpdateState({level:level},{id:state.id});
}

XYFruitsRemove=function(points,state){
	var level=XYFruitsRemoveLevel(points,state);
	LevelUpdate(level,state);
}

XYFruitsAdd=function(points,state){
	var level=XYFruitsRemoveLevel(points,state);
	points.map(function(xy){
		if(!PointValid(xy,state))
			return;
		var overfruit=state.mode.fruit;
		level[overfruit]=Union(level[overfruit],[xy]);
	})
	LevelUpdate(level,state);
}


XYSegments=function(xy,state){
	var segments=state.segments.filter(s=>In(s,xy));
	return segments;
}

SegmentsUpdate=function(segments,state){
	if(!Equal(segments,state.segments))
		UpdateState({segments:segments},{id:state.id});
}

XYSegmentsAdd=function(segments,state){
	var segments=ValidSegments(segments,state).map(CanonicalSegment);
	if(!segments.length)
		return;
	var newsegments=Union(state.segments,segments);
	SegmentsUpdate(newsegments,state);
}

XYSegmentsRemove=function(segments,state){
	var segments=ValidSegments(segments,state).map(CanonicalSegment);
	if(!segments.length)
		return;
	var newsegments=Complement(state.segments,segments);
	SegmentsUpdate(newsegments,state);
}

DragActionDrawStarter=function(x,y,w,h,target){
	UpdateState({mode:{edit:false}},{id:TargetState(target).id});
	DragActionStarter(x,y,w,h,target);
}

DragActionAltStarter=function(x,y,w,h,target){
	UpdateState({mode:{edit:Flipped}},{id:TargetState(target).id});
	DragActionStarter(x,y,w,h,target);
}

DragActionStarter=function(x,y,w,h,target){
	var state=TargetState(target);
	var xy=CanvasPoint(x,y,w,h,state);
	if(!PointValid(xy,state))
		return;//TODO OTHER OPTIONS
	var mode=Clone(state.mode);
	mode.fruit=XYFruit(xy,state)||mode.fruit;
	mode.dragging=true;
	mode.selection=[xy];
	if(mode.edit){
		mode.clearing=!!XYFruit(xy,state);
	}
	if(!Equal(mode,state.mode))
		UpdateState({mode:mode},{id:state.id});
}
DragActionContinuer=function(x,y,w,h,target){
	var state=TargetState(target);
	var xy=CanvasPoint(x,y,w,h,state);
	if(!PointValid(xy,state))
		return;//TODO OTHER OPTIONS
	var mode=Clone(state.mode);
	if(!mode.selection)
		mode.selection=[];
	if(!In(mode.selection,xy)){
		mode.selection=PatchedPath(AddOnce(mode.selection,xy));
	}
	else if(mode.selection.length>1&&Equal(First(Take(mode.selection,-2)),xy)){
		mode.selection=Remove(mode.selection,Last(mode.selection));
	}
	if(!mode.edit){
		var selected=mode.selection;
		mode.clearing=Intersected(XYSegments(selected[0],state),XYSegments(selected[1],state));
	}
	if(!Equal(mode,state.mode))
		UpdateState({mode:mode},{id:state.id});
}
DragActionEnder=function(x,y,w,h,target){
	var state=TargetState(target);
	var mode=state.mode;
		mode.dragging=false;
	var selected=mode.selection||[];

	if(mode.edit){
		if(mode.clearing)
			XYFruitsRemove(selected,state);
		else
			XYFruitsAdd(selected,state);
	}
	else {
		if(selected.length>1){
			var segments=PathTrack(selected);
			if(mode.clearing)
				XYSegmentsRemove(segments,state);
			else{
				XYSegmentsAdd(segments,state);
			}
		}
	}

	ClearCanvas(state.render.target+"-overlevel")
	ClearCanvas(state.render.target+"-overline")

	mode.selection=[];
	mode.clearing=false;	
	UpdateState({mode:mode},{id:state.id,draw:["force-level"]})
}


TransformLevel=function(level,CoordinateTransform){
	var newlevel={};
	Keys(level).map(k=>newlevel[k]=level[k].map(CoordinateTransform));
	return newlevel;
};

DecrementCanvasWidth	=StateKeyHandlerer({W:W=>Max(W-1,2)});
DecrementCanvasHeight	=StateKeyHandlerer({H:H=>Max(H-1,2)});
IncrementCanvasWidth	=StateKeyHandlerer({W:W=>Max(W+1,2)});
IncrementCanvasHeight	=StateKeyHandlerer({H:H=>Max(H+1,2)});

BoardShifter=function(L){
	return function(){
		LevelShifter(L)();
		SegmentsShifter(L)();
	};
}

LevelShifter=function(L){
	return StateKeyHandlerer({level:level=>TransformLevel(level,LetterCoordinatesShifter(L))});
}
SegmentsShifter=function(L){
	return StateKeyHandlerer({
		segments:segments=>segments.map(seg=>seg.map(LetterCoordinatesShifter(L)))});
}

LetterCoordinatesShifter=function(L){
	return function(xy){
		return VectorPlus(xy,DirectionsCoordinates[L])
	}
}


var ClearBoard=StateKeyHandlerer({segments:[],level:{}});
var ClearSegments=StateKeyHandlerer({segments:[]});
var ClearFruit=StateKeyHandlerer({level:{}});



CycleFruitMode=function(state,n){
	var mode=Clone(state.mode);
	if(!n)
		var n=1;
	if(!mode.edit)
		mode.edit=true;
	var fruits=Sort(Keys(state.fruits));
	if(!mode.fruit)
		mode.fruit=First(fruits);
	else{
		fruits=CycleSort(fruits,a=>a===mode.fruit)
		mode.fruit=fruits[(fruits.length+n)%fruits.length];
	}
	return mode;
}

var KeyboardActions={
	"alt left"	:LevelShifter("L"),
	"alt up"	:LevelShifter("U"),
	"alt right"	:LevelShifter("R"),
	"alt down"	:LevelShifter("D"),
	
	"shift left"	:BoardShifter("L"),
	"shift up"		:BoardShifter("U"),
	"shift right"	:BoardShifter("R"),
	"shift down"	:BoardShifter("D"),

	"shift alt left"	:SegmentsShifter("L"),
	"shift alt up"		:SegmentsShifter("U"),
	"shift alt right"	:SegmentsShifter("R"),
	"shift alt down"	:SegmentsShifter("D"),
	
	"ctrl left"		:DecrementCanvasWidth,
	"ctrl up"		:IncrementCanvasHeight,
	"ctrl right"	:IncrementCanvasWidth,
	"ctrl down"		:DecrementCanvasHeight,
	
	"ctrl shift up"		:StateKeyHandlerer({H:BlankState.H}),
	"ctrl shift right"	:StateKeyHandlerer({W:BlankState.W}),
	"ctrl shift left"	:StateKeyHandlerer({H:2}),
	"ctrl shift down"	:StateKeyHandlerer({W:2}),

	"b ctrl"		:StateKeyHandlerer({visuals:{monochrome:Flipped}}),
	"b ctrl shift"	:StateKeyHandlerer({visuals:{solid:Flipped}}),

	"c ctrl":ExportSerial,
	"s ctrl":()=>SaveCanvas(),

	"space":StateKeyHandlerer({mode:{edit:Flipped}}),
	
	"escape":StateKeyHandlerer({mode:{edit:false}}),

	"r ctrl"		:ClearSegments,
	"r ctrl shift"	:ClearFruit,
	"r ctrl alt"	:ClearBoard,

	"delete"		:ClearSegments,
	"delete shift"	:ClearFruit,
	"delete alt"	:ClearBoard,

	"z ctrl"			:function(){Undo()},
	"z ctrl shift"		:function(){Redo()},
	"backspace"			:function(){Undo()},
	"shift backspace"	:function(){Redo()},
	"y ctrl shift"		:function(){Undo()},
	"y ctrl"			:function(){Redo()},

};

KeyboardFruitsActions=function(state){
	var Actions={};
	Keys(state.fruits).map(
		function(fruit){
			Actions[state.fruits[fruit].letter]=StateKeyHandlerer({mode:{edit:true,fruit:fruit},visuals:{cursor:fruit}});
	});
	return Actions;
}

FruitCycler=function(n){
	return function(target){
		var state=TargetState(target);
		UpdateState(
			{mode:CycleFruitMode(state,n)},
			{id:state.id}
		)
	}
}

var WheelActions={
	"wheel-up":FruitCycler(-1),
	"wheel-down":FruitCycler(1)
}

var DragActions={
	"drag-on":DragActionStarter,
	"drag-on-alt":DragActionDrawStarter,
	"drag-on-2":WheelActions["wheel-down"],
	"drag-on-3":DragActionDrawStarter,
	"drag-on-4":ClearSegments,
	"drag-on-5":ClearFruit,
	"drag-on-6":LazyPasser(ScrollInto)(".main"),
	"drag-continue":DragActionContinuer,
	"drag-off":DragActionEnder
}

CanvasResize=function(state){
	var canvasses=GetElements(state.render.target+" canvas");
	if(!canvasses.length)
		return;

	var container=GetElement(state.render.container);
	
	var W=ElementWidth(container);
	
	var H=ElementComputedHeight(container);
	var chi=Children(container).filter(c=>!GetElement("canvas",c));
	var h=Apply(Plus,chi.map(ElementComputedHeight))*state.render.reduce;
	
	canvasses.map(function(e){
		e.width=Floor(W);
		e.height=Floor(H-h);
		//e.height="calc(100vh - 9*var(--fontheight) - var(--h2))"
	});

	StateDraw(state)
}

ElementComputedHeight=function(e){
	var px=window.getComputedStyle(e).getPropertyValue('height');
	return Number(UnPosfix(px,"px"));
}

CanvasResizer=function(state){
	return function(){
		CanvasResize(STATES[state.id]);
		setTimeout(()=>CanvasResize(STATES[state.id]),500);
	};
}

ControlsBind=function(state){
	AttendDrag(DragActions,state.render.target);
	AttendWheel(WheelActions,state.render.target,75);

	Attend('resize',CanvasResizer(state));

	KeyboardActions=Merge(KeyboardActions,KeyboardFruitsActions(state));
	Keybind(KeyboardActions,state.render.target);
	ResumeCapturingKeys(ComboKeyPressHandler);
}

///////////////////////////////////////////////////////////////////////////////
//State
//a friendly representation of the board state, and the source of truth

ObtainStartingLevelState=function(id,blankState){
	var blankState=blankState||BlankState;
	var state=Clone(blankState);
		state=Merge(state,{
			id:id||GenerateId(),
			width:window.innerWidth,
			height:window.innerHeight*0.9
		});
		
	if(PageSearch("W")||PageSearch("H"))
		state=SerialState(PageSearchParameters(),state);
	delete state["examples"]
	return state;
}


SubBoardHTML=function(name,state){
	if(In(SpecialLayers,name))
		return `<div id="${state.render.target}-${name}" class="${name}">.</div>`;
	return `<canvas 
			id="${state.render.target}-${name}" 
			width="${state.width}" 
			height="${state.height}"
	></canvas>`;
}

SpecialLayers=["metadatacolophon","metadatatitle","rules"]

PreAddStateCanvas=function(state,target){
	var canvasLayers=Keys(LayersChanged).filter(layer=>!In(SpecialLayers,layer));
	var subBoards=canvasLayers.map(name=>SubBoardHTML(name,state)).join("");
	var BoardHTML=`<div id="${state.render.target}"
		class="game-supra-canvas"
		oncontextmenu="return false;"
		width="${state.width}" 
		height="${state.height}">${subBoards}</div>`;
	
	var GameHTML=`<div class="game-container">
		${SubBoardHTML("metadatatitle",state)}
		${BoardHTML}
		${SubBoardHTML("metadatacolophon",state)}
	</div>`;

	if(!GetElement(state.render.target))
		PreAddElement(GameHTML,GetElement(target)||"BODY");
}




InitialisePuzzle=function(id){
	
	var state=ObtainStartingLevelState(id);
		
	PreAddStateCanvas(state,"body");
	ControlsBind(state);
	setTimeout(LazyPasser(FocusElement)(state.render.target),500);
	
	SaveState(state);
	var options={initialise:true,id:state.id,draw:["force-metadata"]};
	UpdateState({},options);
	
	//Auto instructions
	AutoInstructions(state.fruits)
}



StateImage=function(state){
	var e=GetElement(state.render.target);
	var href=e.toDataURL("image/png");
	return ImageHTML({src:href,alt:"kudamono",title:"kudamono"})
}


AutoInstructions=function(fruits){
	HyperText("KudamonoFruitShortcuts",function(){
		return TableHTML({
		headers:["Shortcut","Fruit"],
		caption:"Choose a fruit by pressing:",
		rows:Sort(Keys(fruits)).map(name=>[KB(fruits[name].letter),name])
		})});
}

AutoInstructions(FruitIcons)



var STATES={};

SaveState=function(state){
	STATES[state.id]=Clone(state);
}
TargetState=function(target){
	var target=ParentElement(target).id||GetElement(target).id;
	var state=First(FilterValuesObject(STATES,state=>state.render.main&&state.render.target===target));
	return state;
}

IdState=function(id){
	return STATES[id];
}


if(PageSearch("W")||PageSearch("H")){
	HearAll(sources,InitialisePuzzle)
}