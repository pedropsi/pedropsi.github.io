///////////////////////////////////////////////////////////////////////////////
//Kudamono Editor (c) Pedro PSI, 2021
//All rights reserved.
///////////////////////////////////////////////////////////////////////////////

var sources=["data-game-colours","data-game-canvas","data-game-undo"];
sources.map(LoaderInFolder("codes/game/modules"));
if(PageSearch("G")){
	LoaderInFolder("codes/game/kudamono")("genres.js");
	sources=sources.concat("kudamono-genres")
}


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


TrackGeometricCentrePoint=function(track){
	var points=TrackPoints(track);
	return Round([Mean(PathXs(points)),Mean(PathYs(points))],3);
}

PathXs=function(points){return points.map(First)};
PathYs=function(points){return points.map(Last)};

TrackPointwiseSymmetrised=function(track,XY){
	var X=XY[0];
	var Y=XY[1];
	var VHMirrorer=function(point){
		var dx=X-point[0];
		var dy=Y-point[1];
		return [point[0]+2*dx,point[1]+2*dy];
	}
	var Dsegments=track.filter(segment=>PathYs(SegmentPoints(segment)).every(y=>y<=Y));
	var Usegments=track.filter(segment=>PathYs(SegmentPoints(segment)).every(y=>y>=Y));
	
	Usegments=Usegments.map(segment=>TransformSegment(segment,VHMirrorer));
	Usegments=Sort(Usegments.map(CanonicalSegment));
	Dsegments=Sort(Dsegments.map(CanonicalSegment));
		
	return Equal(Dsegments,Usegments)
}

SymmetriseVerticallyTrack=function(track,Y){
	var VMirrorer=function(point){
		var dy=Y-point[1];
		return [point[0],point[1]+2*dy];
	}
	return track.map(segment=>TransformSegment(segment,VMirrorer));
}

TrackVerticallySymmetrised=function(track,XY){
	var Y=XY[1];
	var Dsegments=track.filter(segment=>PathYs(SegmentPoints(segment)).every(y=>y<=Y));
	var Usegments=track.filter(segment=>PathYs(SegmentPoints(segment)).every(y=>y>=Y));
	
	Usegments=SymmetriseVerticallyTrack(Usegments,Y);
	Usegments=Sort(Usegments.map(CanonicalSegment));
	Dsegments=Sort(Dsegments.map(CanonicalSegment));
	return Equal(Dsegments,Usegments)
}

SymmetriseHorizontallyTrack=function(track,X){
	var HMirrorer=function(point){
		var dx=X-point[0];
		return [point[0]+2*dx,point[1]];
	}
	return track.map(segment=>TransformSegment(segment,HMirrorer));
}


TrackHorizontallySymmetrised=function(track,XY){
	var X=XY[0];
	var Lsegments=track.filter(segment=>PathXs(SegmentPoints(segment)).every(x=>x<=X));
	var Rsegments=track.filter(segment=>PathXs(SegmentPoints(segment)).every(x=>x>=X));
	
	Rsegments=SymmetriseHorizontallyTrack(Rsegments,X);
	Rsegments=Sort(Rsegments.map(CanonicalSegment));
	Lsegments=Sort(Lsegments.map(CanonicalSegment));
		
	return Equal(Lsegments,Rsegments)
}

UnTranslateTrack=function(track){
	var XY=TrackGeometricCentrePoint(track);
	var X=XY[0];
	var Y=XY[1];
	return Clone(track).map(segment=>TranslateSegment(segment,-1*X,-1*Y));
}

TrackDiagonallySymmetrised=function(track){
	var track=UnTranslateTrack(track);

	var Flipper=function(point){
		return [point[1],point[0]];
	}

	fliptrack=Clone(track).map(segment=>TransformSegment(segment,Flipper));
		
	return Equaliser(track=>Sort(track.map(CanonicalSegment)))(fliptrack,track);
}

TrackSlantlySymmetrised=function(track){
	var track=UnTranslateTrack(track);

	var Flipper=function(point){
		return [-point[1],-point[0]];
	}

	fliptrack=Clone(track).map(segment=>TransformSegment(segment,Flipper));
		
	return Equaliser(track=>Sort(track.map(CanonicalSegment)))(fliptrack,track);
}


TrackSymmetrised=function(track){
	var XY=TrackGeometricCentrePoint(track);
	return TrackHorizontallySymmetrised(track,XY)||TrackVerticallySymmetrised(track,XY)||TrackPointwiseSymmetrised(track,XY)||TrackDiagonallySymmetrised(track)||TrackSlantlySymmetrised(track);
}

///////////////////////////////////////////////////////////////////////////////
//Fruits
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
			trackValidator:TrackSymmetrised,
			description:"Every Apple belongs to a mirror or rotationally symmetric path.",
			depiction:"W=2&L=a1a2a4a1&S=1DRD2DR"
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
			equaliser:UnTranslateTrack,
			description:"All Pear paths are exactly alike, and there is more than one.",
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
			depiction:"W=2&L=b0b6b2&S=1DD"
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
			description:"Cherries connect only in pairs (not in a loop).",
			depiction:"W=2&L=c0c2c4c2&S=0RR6RR"
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
			symbolshapes:Shape3s,
			simpleshapes:Shape2s,
			description:"Paths branch, as T-junctions, only at every Coconut. No branch returns to its origin.",
			depiction:"W=2&L=q3q2&S=1URDRDDLLU3D",//TODO
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
			symbolshapes:Shape1s,
			simpleshapes:Join(Shape2Straights,Shape3s),
			description:"The first two Dates connect via a straight line. Non-endpoints may spawn up to one straight branch ending at a Date.",
			depiction:"W=2&L=d1d4d1d2&S=1RDRUD",//TODO
			
			branchstraight:true,
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
			description:"Melons belong to closed loops (over 1 melon per loop).",
			depiction:"W=2&L=c0c2c4c2&S=0RR6RR"
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
			description:"All Grapes are connected by a single path (not a loop).",
			depiction:"W=2&L=c0c2c4c2&S=0RR6RR"
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
			symbolshapes:Shape2Straights,
			simpleshapes:Shape2Corners,
			description:"Paths cross Blackberries straight and always turn elsewhere.",
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
			depiction:"L=l4&S=3RR"
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
			depiction:"W=2&L=o0o6o2&S=1DD"
		}
	}
}

var BlankState={
	
	//visuals
	target:"kudamono-canvas",
	visuals:{
		cursor:"pencil",
		cursorsize:80,
		monochrome:false,
		solid:false,
		skin:1								//fruit skin thickness
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
		border:0.5,							//how many squares to add to the border (to each of the shortest sides)
		scale:0.95,							//fruit scale (how large)
		nudge:0.3,							//fruit nudge (small adjustments to position)
		dual:false,							//disalign squares and grid
		scaleGrid:0.75,						//reduce the grid size
		offsetX:0,							//displace the grid horizontally
		offsetY:1.15,						//displace the grid verticallly
	},	

	//Puzzle
	W:7,
	H:7,
	level:{},
	segments:[],
	tracks:[],
	crosses:{},

	//global rules
	rules:{
		minconnected:2,
		branchallowed:false,
		loopallowed:false,
		dangleallowed:false
	},

	groups:{},// multi-symbol lines, if allowed
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
	description:`Draw paths of a single fruit type along the grid, each containing at least two fruits.
	Unless otherwise indicated, paths do not loop, cross, branch or dangle.`,
	author:"Pedro",
	date:"2021-12-18",
	examples:[
		"W=8&L=g0d1o1a3q1q1d5q3q1q1d2d1l4q2g1c1o2q4g3c1a1c2g4c3m9p4b1m2p4p2p1g1m1m1b1p2p1&S=0DDDDRDLDDD1DDRR3UR2URDRDLLLDDRRURUDL7DDDL15RD13DLL14URRDLDLU6DR7DR",
		"W=35&H=23&L=b37a43b67g1a4c2o3l4p3m3c210a32b25b1g3a5c5q150l21m10o24l1p6m8d2&S=37DDD2DLDRD1DDDRRUUU3RRDDDLL3URRDDD3URDRURDDD4URRDDDLLUU3URDDDRUUU3URRDDDLLUU20RDL3DD3DD7DD161URDDRURURDDLDLLDDLUUUU5URDDDDRRUUUURDDDDDLLLLUUUU5URRRRDDDDDLLLLURUUUL5URRRRDDDDDLULLDLUUUU6URDDDDDDDDDLUUUUUUUU27URDDDLUU4URRDDLLU94URRDLL70URRDRURDDDDDLULULDDLUUUU5URRRRDDDDDLLLLUUUU5URDRDRUURDDDDDLULULDDLUUUU5URRRRDDDDDLLLLUUUU27URRDDDLLUU10URRDDDLLUU113URDL",
		"W=24&H=13&L=d16d5o1b1d11d10g3g2d11g15g2a10c1c2a1a25a2o2q12q28l15o1l27k13l12k1k2k13p15p12p15p12m3m26o3b1&S=16DDDRDRUU3DD3RRRRRRR1RRRRRRRRRRRRRRRRRRRRRR10D13R1DDRRUU40RRDDDDLL1DD44DD28UULLDDRRDD15UUURRURRD1RRRRRRRRRRR24DDD16URRDDLLU43UUR27UUR14URRDDLLU"
	],
	symbols:FruitIcons,
	//visuals
	mode:{
		symbol:First(FruitIcons),	//current fruit to be added
	},
	win:{
		rule:{
			minlines:1,
			maxlines:Infinity,
			fillgrid:false
		},
		grid:{
			dash:[3,4.5,1,4.5,3],
			//fillColor:"rgb(240,255,255)",
			strokeColor:"#55BB55"
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
//Path segments
//A track is a set of segments. A segment is a pair of points (x,y).


PathTrack=function(path){
	var path=Clone(path);
	var track=[];
	if(path.length<2)
		return [];
	
	var segments=Rest(path).map((xy,i)=>[path[i],xy]);
	var i=0;
	var seg;
	while(i<segments.length){
		seg=SegmentDiscretiseTrack(Clone(segments[i]));
		track.push(seg);
		i++
	}
	return Join(...track);
}


SortTrack=function(track){
	function Switcher(segmin,segment){
		return segmin[0]>segment[0]||(segmin[0]===segment[0]&&segmin[1]>segment[1])}
	return CycleSort(track.map(t=>Sort(t)),Switcher)
}


TrackPath=function(track){
	var stas=track.map(First);
	return stas.concat([Last(Last(track))]);
}

PointSegmentContained=function(point,segment){
	return In(segment,point);
}

PointTrackContained=function(point,track){
	return track.some(segment=>PointSegmentContained(point,segment));
}

PointTracksContained=function(point,tracks){
	return tracks.some(track=>PointTrackContained(point,track));
}

SegmentTrackContained=function(segment,track){
	return In(track,segment)||In(track,Reverse(segment));
}

SegmentPoints=function(segment){
	return segment;
}

TrackPoints=function(track){
	return Union(Join(...track.map(SegmentPoints)));
}

SegmentTouched=function(segment1,segment2){
 	return SegmentPoints(segment1).some(point=>PointSegmentContained(point,segment2));
}

DeletePointTrack=function(point,track){
	return track.filter(seg=>!PointSegmentContained(point,seg));
}

DeleteSegmentTrack=function(segment,track){
	return track.filter(seg=>!In([segment,Reverse(segment)],seg));
}

SegmentContiguousTrackSegments=function(segment,track){
	var intrack=DeleteSegmentTrack(segment,track);
	return Join(...SegmentPoints(segment).map(point=>PointContainedTrackSegments(point,intrack)))
}

PointContainedTrackSegments=function(point,track){
	return track.filter(seg=>In(SegmentPoints(seg),point));
}

PointContainedTracksSegments=function(point,tracks){
	var pointsets=tracks.map(track=>PointContainedTrackSegments(point,track));
	return Union(...pointsets);
}

PointContiguousTrackPoints=function(point,track){
	var points=Join(...PointContainedTrackSegments(point,track).map(SegmentPoints));
	return Complement(points,[point]);
}

TrackEndsegments=function(track){
	return track.filter(segment=>SegmentContiguousTrackSegments(segment,track).length<=1);
}

TrackDangled=function(track,state){
	var endpoints=TrackEndpoints(track);
	return endpoints.some(point=>!In(Join(...Values(state.level)),point));
}

TrackDegreePoints=function(track,n){
	return TrackPoints(track).filter(point=>PointContainedTrackSegments(point,track).length===n);
}

TrackOverDegreePoints=function(track,n){
	return TrackPoints(track).filter(point=>PointContainedTrackSegments(point,track).length>=n);
}

TrackBranchpoints=function(track){
	return TrackOverDegreePoints(track,3);
}

TrackEndpoints=function(track){
	return TrackDegreePoints(track,1);
}

TrackLooped=function(track){
	if(!track.length)
		return false;
	var singles=TrackDegreePoints(track,1).length;
	var threes=TrackDegreePoints(track,3).length;
	var fours=TrackDegreePoints(track,4).length;
	
	return singles===0||(threes*3+fours*4-singles*1)/(threes+fours)>=2;
}

TrackBranched=function(track){
	return TrackBranchpoints(track).length>0;
}

TrackStartPoint=function(track){
	var endpoints=TrackEndpoints(track);
	return First(endpoints)||First(First(track));
}

TranslateTrack=function(track,x,y){
	return track.map(segment=>TranslateSegment(segment,x,y));
}

TranslateSegment=function(segment,x,y){
	return segment.map(point=>VectorPlus(point,[x,y]));
}
TransformSegment=function(segment,Transformer){
	return Clone(segment).map(point=>Transformer(point));
}

SplitContiguousTracks=function(segments){
	if(!segments.length)
		return [];
	var segments=CanonicalTrack(segments);
	var track=[];
	var contiguoustracks=[];
	var segment=First(segments);
	while(segment&&segments.length){
		track.push(segment);
		
		segments=Remove(segments,segment);
		if(!segments.length){
			contiguoustracks.push(track);
			break;
		}

		var next=SegmentContiguousTrackSegments(segment,segments);

		if(!next.length){
			next=track.map(seg=>SegmentContiguousTrackSegments(seg,segments));
			next=Join(...next);
		}

		if(!next.length){
			contiguoustracks.push(track);
			track=[];
			segment=First(segments);
		}
		else{
			segment=First(next);
		}

	}
	return contiguoustracks.map(CanonicalTrack);
}

EndsegmentsFirst=function(endsegments,segments){
	if(endsegments.length)
		return First(endsegments);
	else
		return First(segments);
}

LinearTracks=function(trackset){
	var lineartrackset=trackset.map(TrackLinearTracks);
	return Join(...lineartrackset);
}

TrackLinearTracks=function(contiguousTrack){
	if(!contiguousTrack.length)
		return [];
	var segments=Clone(contiguousTrack);
	var endsegments=TrackEndsegments(segments);
	var segment=EndsegmentsFirst(endsegments,segments);

	var track=[];
	var lineartracks=[];
	
	while(segments.length){
		track.push(segment);
		segments=Remove(segments,segment);
		if(!segments.length){
			lineartracks.push(track);
			break;
		}

		var next=SegmentContiguousTrackSegments(segment,segments);

		if(!next.length){
			lineartracks.push(track);
			track=[];
			endsegments=TrackEndsegments(segments);
			segment=EndsegmentsFirst(endsegments,segments);
		}
		else{
			segment=First(next);
		}

	}
	return lineartracks;
}

OrientedTrack=function(lineartrack){
	var orientedtrack=Clone(lineartrack);
	if(!orientedtrack.length)
		return orientedtrack;
	if(orientedtrack.length<2){
		return OrderedTrack(orientedtrack);
	}
	var i=0;
	var l=orientedtrack.length;
	while(i<l-1){
		if(PointSegmentContained(First(orientedtrack[i]),orientedtrack[i+1]))
			orientedtrack[i]=Reverse(orientedtrack[i]);
		i++
	}
		
	if(PointSegmentContained(Last(orientedtrack[l-1]),orientedtrack[l-2]))
		orientedtrack[l-1]=Reverse(orientedtrack[l-1]);
	
	// if(TrackLooped(orientedtrack))
	// 	orientedtrack=OrientedLoopTrack(orientedtrack);

	return OrderedTrack(orientedtrack);
}

ReverseTrack=function(track){
	return Reverse(track.map(Reverse))
}

PointsOrdered=function(points1,points2){
	return Equal([points1,points2],Sort([points1,points2]))
}

OrderedTrack=function(orientedtrack){
	if(!PointsOrdered(First(First(orientedtrack)),Last(Last(orientedtrack)))){
		return ReverseTrack(orientedtrack);
	}
	else return orientedtrack;
}

CanonicalContiguousTrack=function(track,Posit){
	var endsegments=TrackEndsegments(track);
	var endpoints=TrackEndpoints(track);

	if(!endpoints.length)	//a loop
		endpoints=track.map(First);

	startpoint=First(Sorter(Posit)(endpoints));

	if(endsegments.length<1)
		endsegments=track;

	endsegments=endsegments.filter(s=>In(s,startpoint));
	
	if(endsegments.length>1)
		endsegments=endsegments.filter(s=>(In([[1,0],[-1,0]],VectorMinus(s[0],s[1])))); //TODO minimise with POSIT on both vertexes instead, generalises better
	
	var	nextsegment=First(endsegments);
	
	if(Equal(Last(nextsegment),startpoint)){
		nextsegment=Reverse(First(endsegments));
	}
	var previoussegment=null;

	var canonicaltrack=[];
	var oldtrack=track;
	while(oldtrack.length>0&&nextsegment!==previoussegment){
		previoussegment=nextsegment;
		oldtrack=DeleteSegmentTrack(previoussegment,oldtrack);
		nextsegment=First(SegmentContiguousTrackSegments(previoussegment,oldtrack));
		if(!nextsegment||In(nextsegment,previoussegment[1]))
			canonicaltrack.push(previoussegment);
		else
			canonicaltrack.push(Reverse(previoussegment));
		
	}
	return canonicaltrack;
}


SegmentValid=function(segment,state){
	return SegmentDiscretised(segment)&&SegmentPoints(segment).every(point=>PointValid(point,state));
}

ValidSegments=function(segments,state){
	return segments.filter(seg=>SegmentValid(seg,state));
}

SegmentDiscretised=function(segment){
	return In(Values(DirectionsCoordinates),SegmentDirection(segment));
}

SegmentDirection=function(segment){
	return VectorMinus(segment[1],segment[0]);
}

SegmentUnitDirection=function(segment){
	return UnitVector(SegmentDirection(segment));
}

SegmentDiscretiseTrack=function(segment){
	var previousPoint=segment[0];
	var nextPoint;
	var direction=SegmentUnitDirection(segment);
	var i=0;
	var disctrack=[];
	var dx=Sign(direction[0]);
	var dy=Sign(direction[1]);
	while(Abs(i)<Abs(direction[0])){
		nextPoint=VectorPlus(previousPoint,[dx,0]);
		disctrack.push([previousPoint,nextPoint]);
		previousPoint=Clone(nextPoint);
		i+=dx;
	}
	var j=0;
	while(Abs(j)<Abs(direction[1])){
		nextPoint=VectorPlus(previousPoint,[0,dy]);
		disctrack.push([previousPoint,nextPoint]);
		previousPoint=Clone(nextPoint);
		j+=dy;
	}
	return disctrack;
}

UnDiscretiseTrack=function(track){
	var track=track;
	var l=track.length;
	var i=0;
	while(i<l-1){
		j=i+1;
		while(j<l){
			if(SegmentFollowed(track[i],track[j])){
				track[i]=FuseFollowedSegment(track[i],track[j]);
				track=Delete(track,j);
				i=0;
				j=i+1;
				l=l-1;
			}
			else{
				j++
			}
		}
		i++
	}
	return track;
}

SegmentEquidirected=function(segment1,segment2){
	return Equal(SegmentUnitDirection(segment1),SegmentUnitDirection(segment2));
}

SegmentAligned=function(segment1,segment2){
	return SegmentEquidirected(segment1,segment2)||SegmentEquidirected(Times(-1,segment1),segment2);
}

SegmentFollowed=function(segment1,segment2){
	return SegmentEquidirected(segment1,segment2)&&SegmentTouched(segment1,segment2);
}

FuseFollowedSegment=function(segment1,segment2){
	var s=[...Complement(segment1,segment2),...Complement(segment2,segment1)];
	if(!s.length)
		return segment1;
	else
		return s;
}

var DirectionSort=Sorter(d=>Keys(LetterDirections).findIndex(D=>D===d))

PointTrackShape=function(point,track){
	var segments=PointContainedTrackSegments(point,track);
	if(!segments||!segments.length){
		return "";
	}
	var directions=segments.map(s=>TranslateSegment(s,-1*point[0],-1*point[1]));
		directions=directions.map(s=>First(Remove(s,[0,0])));
		directions=directions.map(DirectionCode);
	return DirectionSort(directions).join("");
}

PointStateShape=function(point,state){
	return Join(...state.tracks.map(track=>PointTrackShape(point,track)));
}

FruitStatePoints=function(fruit,state){
	return state.level[fruit];
}

FruitTrackStatePoints=function(fruit,track,state){
	return FruitStatePoints(fruit,state).filter(point=>PointTrackContained(point,track));
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

PointConsecutiveShapePairs=function(point,track){//Todo slash points in half
	var consecutivepoints=PointContiguousTrackPoints(point,track);
	var shape=PointTrackShape(point,track);
	return consecutivepoints.map(point=>[shape,PointTrackShape(point,track)]);
}

TrackConsecutiveShapePairs=function(track){
	return DistinctArray(Join(...TrackPoints(track).map(point=>PointConsecutiveShapePairs(point,track))),Sort);
}


FruitStateTracks=function(fruit,state){
	var tracks=state.tracks;
	var points=FruitStatePoints(fruit,state);
	return tracks.filter(track=>points.some(point=>PointTrackContained(point,track)));
}

///////////////////////////////////////////////////////////////////////////////
//Error detection


FruitStateRule=function(fruit,state){
	return state.symbols[fruit].rule;
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
	if(!wrong&&rule.trackValidator&&!rule.trackValidator(track))
		wrong=true;
	if(!wrong&&rule.symbolshapes){
		wrong=Complement(FruitTrackStateShapes(fruit,track,state),rule.symbolshapes).length>0;
		rule.branchallowed=rule.branchallowed||Intersection(rule.symbolshapes,ShapeBranches).length>0;
	}
	if(!wrong&&rule.simpleshapes){
		wrong=Complement(UnFruitTrackStateShapes(fruit,track,state),rule.simpleshapes).length>0;
		rule.branchallowed=rule.branchallowed||Intersection(rule.simpleshapes,ShapeBranches).length>0;
	}
	if(!wrong&&rule.unconsecutiveshapes){
		wrong=TrackConsecutiveShapePairs(track).some(pair=>rule.unconsecutiveshapes.some(incompatibles=>Subset(incompatibles,pair)));
	}
	if(!wrong&&!rule.loopallowed&&TrackLooped(track))
		wrong=true;
		
	if(!wrong&&rule.looprequired&&!TrackLooped(track))
		wrong=true;
		
	if(!wrong&&!rule.branchallowed&&TrackBranched(track))
		wrong=true;

	if(!wrong&&Intersection(rule.simpleshapes,Shape1s).length)
		rule.dangleallowed=true;

	if(!wrong&&!rule.dangleallowed&&TrackDangled(track,state))
		wrong=true;
		
	return wrong;
}

SymbolGroupName=function(symbol,state){
	if(!state.groups)
		return symbol;
	return Keys(state.groups).find(k=>In(state.groups[k].symbols,symbol))||symbol;
}

TrackStateErrors=function(track,state){
	var fruits=TrackFruits(track,state);
	var errors={};
	if(fruits.length<1)
		errors.deficit=true;
	else if(Gather(fruits,type=>SymbolGroupName(type,state)).length>1)
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
	var positionErrors={};
	var tracks=state.tracks;
	var globalSymbols=Keys(state.level).filter(symbol=>state.symbols[symbol].rule.equaliser);

	var globalTracksPool=globalSymbols.map(symbol=>FruitStateTracks(symbol,state));
	var localTracks=Complement(tracks,Join(...globalTracksPool));
	var localOrder=Order(tracks,localTracks);
	var localErrors=localTracks.map(track=>TrackStateErrors(track,state));
	
		localOrder.map((p,i)=>positionErrors[p]=localErrors[i]);

	var globalErrors=Join(...globalTracksPool.map((tracks,i)=>GlobalTracksErrors(tracks,state,globalSymbols[i])));
	var globalOrder=Order(tracks,Join(...globalTracksPool));

		globalOrder.map((p,i)=>positionErrors[p]=globalErrors[i]);

	return positionErrors;
}

GlobalTracksErrors=function(tracks,state,symbol){
	var globalerrors={}
	var Equaliser=state.symbols[symbol].rule.equaliser;
	if(Equaliser)
		globalerrors.equalised=Unique(tracks.map(Equaliser)).length>1;

	var localErrors=tracks.map(track=>TrackStateErrors(track,state));
		localErrors=localErrors.map(errors=>Merge(errors,globalerrors));
	return localErrors;
}

SymbolRuleLonely=function(rule){
	var lonely=false;
	if(typeof rule.maxconnected!=="undefined")
		lonely=rule.maxconnected<2;
	if(!lonely&&(typeof rule.minconnected!=="undefined"))
		lonely=rule.minconnected>rule.maxconnected;
	if(typeof rule.maxconnectable!=="undefined")
		lonely=rule.maxconnectable<2;
	if(!lonely&&(typeof rule.minconnectable!=="undefined"))
		lonely=rule.minconnectable>rule.maxconnectable;	
	return lonely;
}

SocialSymbolsTrackContained=function(state){
	var socialsymbols=Keys(state.symbols).filter(symbol=>!SymbolRuleLonely(state.symbols[symbol].rule));
	console.log(socialsymbols);
	var socialsymbolpoints=Join(...socialsymbols.map(fruit=>FruitStatePoints(fruit,state)));
	return socialsymbolpoints.every(point=>PointTracksContained(point,state.tracks));
}


StateWon=function(state){
	var wrong=false;
	if(state.atErrors)
		wrong=Values(state.atErrors).map(errors=>Values(errors).some(Identity)).some(Identity);

	if(!wrong)
		wrong=!SocialSymbolsTrackContained(state);
	
	if(!wrong&&state.win.rule){
		var rule=state.win.rule;
		if(!wrong&&rule.minlines&&state.tracks.length<rule.minlines)
			wrong=true;
		if(!wrong&&rule.maxlines&&state.tracks.length>rule.maxlines)
			wrong=true;
		// if(!wrong&&rule.fillboard)
		// wrong=;
	}
	return !wrong;
}

///////////////////////////////////////////////////////////////////////////////
//Draw

TrackStyles=function(track,state,styles,errors){
	var errors=errors||{};
	var fruits=TrackFruits(track,state);
	var fruit=First(fruits);
	var group=SymbolGroupName(fruit,state);
	
	var colour;
	
	if(errors.deficit)
		colour=state.line.deficitColour;
	else if(errors.excess)
		colour=state.line.excessColour;
	else if(group&&state.groups[group])
		colour=state.groups[group].colour||state.line.excessColour;
	else if(fruit)
		colour=state.symbols[fruit].colour;
	
	var lineCap="round";
	var lineWidth=styles.lineWidth||state.line.lineWidth||1;
	var opacity=styles.opacity||state.line.opacity||1;

	var dash=state.line.dash;
	if(errors.localised||errors.equalised)
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
		strokeColor:colour,
		dash:dash,
		lineCap:lineCap,
		lineWidth:lineWidth,
	}
}

DrawTrack=function(track,state,styles,errors){
	if(!track.length)
		return false;
	
	var trackStyles=TrackStyles(track,state,styles,errors||{});

	var track=track.filter(segment=>SegmentValid(segment,state));
		track=UnDiscretiseTrack(track);
		
	track.map(segment=>DrawSegment({
		px0:segment[0][0],
		px1:segment[1][0],
		py0:segment[0][1],
		py1:segment[1][1],
		...trackStyles
	},state))

	return errors;
}

DrawSegment=function(opts,state){
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
	DrawGridLine(opts);
}


PointValid=function(xy,state){
	return PositionValid(xy[0],xy[1],state);
}

PositionValid=function(px,py,state){
	if(state.grid.dual)
		return !(px<1||px>state.W-1)&&!(py<1||py>state.H-1);
	return !(px<0||px>state.W)&&!(py<0||py>state.H);
}

DrawFruit=function(Opts,state){
	if(!PositionValid(Opts.px,Opts.py,state)||!Opts.fruit)
		return;
	var fruit=Opts.fruit;
	var colour=Opts.colour;
	var Opts={
		...Opts,
		...state.grid,
		...state.symbols[fruit],
		rows:state.H,
		cols:state.W
	};

	if(colour){
		if(IsFunction(colour))
			Opts.colour=colour(Opts.colour)
		else
			Opts.colour=colour;
	}

	if(state.visuals.monochrome&&!state.mode.dragging)
		Opts.colour=HEXSaturater(0)(Opts.colour);

	Opts.dash=false;
	Opts.lineWidth=state.visuals.skin||0;

	if(!state.visuals.solid){
		if(PointTrackContained([Opts.px,Opts.py],state.segments)){
			//Opts.strokeStyle=HEXLightener(1)(Opts.colour);
		}
		else if(In(state.mode.selection,[Opts.px,Opts.py])){
			Opts.strokeStyle=Opts.colour;
			Opts.colour=HEXLightener(0.9)(Opts.colour);		
		}
		else{
			Opts.strokeStyle=Opts.colour;
				Opts.colour=HEXLightener(1)(Opts.colour);		
		}
	}

	if(typeof Opts.shiftx==="undefined")
		Opts.shiftx=0;
	if(typeof Opts.shifty==="undefined")
		Opts.shifty=0;
	Opts.shiftx+=Opts.nudge;
	Opts.shifty+=Opts.nudge;
	
	DrawSVG(Opts);
}

DrawFruits=function(fruit,coordinates,Opts,state){
	var Opts=Opts||{};
	coordinates.map(xy=>DrawFruit({...Opts,fruit:fruit,px:xy[0],py:xy[1]},state));

}

DrawLevel=function(state){
	var types=Keys(state.level);
	types.map(fruit=>DrawFruits(fruit,state.level[fruit],undefined,state));

	if(state.mode.edit)
		if(state.mode.clearing)
			DrawFruits(state.mode.symbol,state.mode.selection,{colour:HEXLightener(0.9)},state);
		else
			DrawFruits(state.mode.symbol,state.mode.selection,{colour:HEXDarkener(0.8)},state);
}

///////////////////////////////////////////////////////////////////////////////
//Serials
//serials represent the state of the board as an URL, compact and exactly

ExportSerial=function(){
	ClipboardCopy(PageURL(),"Copied this puzzle's URL to clipboard, for saving!")
}

FruitStateLetter=function(fruit,state){
	var symbol=state.symbols[fruit]||First(state.symbols);
	return symbol.letter.toLowerCase();
}


Linearise=function(xy,H){
	return xy[0]*(H+1)+xy[1];
}


LineariseSegment=function(segment,H){
	return Linearise(First(segment),H);
}

SegmentLineariser=function(H){
	return function(segment){
		return LineariseSegment(segment,H);
	}
}

TrackLineariser=function(H){
	return function(track){
		return LineariseSegment(First(track),H);
	}
}

CanonicalSegment=function(segment){
	if(!In([[0,1],[1,0]],SegmentUnitDirection(segment)))
		return Reverse(segment);
	else
		return segment;
}

CanonicalTrack=function(track){
	var track=Clone(track).map(CanonicalSegment);
	track=Sort(Unique(track));
	track=track.filter(SegmentDiscretised);
	return track;
}


UnLinearise=function(n,H){
	return [Floor(n/H),n%H]
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

FruitSerialPattern=/(\w)(\d+)/g;

AccumulateTokenCoords=function(tokendiffs,H){
	var differences=tokendiffs.map(Last);
	var accumulated=tokendiffs.map((td,i)=>[td[0],Apply(Plus,Take(differences,i+1))]);
	return accumulated.map(td=>[td[0],UnLinearise(td[1],H)]);
}



SerialLevel=function(serial,state){
	var fruitserials=serial.match(FruitSerialPattern);
	var fruitdiffs=fruitserials.map(s=>[s[0],Number(Rest(s))]);
	var accumulated=AccumulateTokenCoords(fruitdiffs,state.H+1);
	var level={};
	Keys(state.symbols).map(fruit=>(level[fruit]=accumulated.filter(a=>a[0]===FruitStateLetter(fruit,state)).map(Last)));
	return level;
}

PathSerialPattern=/\d+\D+/ig;

DirectionsLetter={
	"LLL":"a",
	"LLU":"b",
	"LLD":"c",
	"LUL":"d",
	"LUU":"e",
	"LUR":"f",
	"LDL":"g",
	"LDR":"h",
	"LDD":"i",
	"ULL":"j",
	"ULU":"k",
	"ULD":"l",
	"UUL":"m",
	"UUU":"n",
	"UUR":"o",
	"URU":"p",
	"URR":"q",
	"URD":"r",
	"RUL":"s",
	"RUU":"t",
	"RUR":"u",
	"RRU":"v",
	"RRR":"w",
	"RRD":"x",
	"RDL":"y",
	"RDR":"z",
	"RDD":"A",
	"DLL":"B",
	"DLU":"C",
	"DLD":"E",
	"DRU":"F",
	"DRR":"G",
	"DRD":"H",
	"DDL":"I",
	"DDR":"J",
	"DDD":"K",

	"LL":"M",
	"LU":"N",
	"LD":"O",
	"UL":"P",
	"UU":"Q",
	"UR":"S",
	"RU":"T",
	"RR":"V",
	"RD":"W",
	"DL":"X",
	"DR":"Y",
	"DD":"Z",

	"L":"L",
	"U":"U",
	"R":"R",
	"D":"D"
}

DirectionsCoordinates={
	"L":[-1,0],
	"U":[0,-1],
	"R":[1,0],
	"D":[0,1]
}

LetterDirections=FlipKeysValues(DirectionsLetter);
CoordinatesDirections=FlipKeysValues(DirectionsCoordinates);

LetterContiguousPath=function(letters,startxy){
	var directions=letters.split("").map(Accesser(LetterDirections)).join("").split("");
		directions=directions.map(Accesser(DirectionsCoordinates));
	var coordinates=directions;
		coordinates=coordinates.map((c,i)=>Apply(VectorPlus,Take(directions,i+1)));
		coordinates.unshift([0,0]);
		coordinates=coordinates.map(c=>VectorPlus(c,startxy))
	return SortTrack(PathTrack(coordinates));
}

SerialSegments=function(serial,state){
	var pathserials=serial.match(PathSerialPattern);
	var pathdiffs=pathserials.map(s=>[First(s.match(/\D+/ig)),Number(First(s.match(/\d+/ig)))]);
	var accumulated=AccumulateTokenCoords(pathdiffs,state.H+1);
	var tracks=accumulated.map(lp=>LetterContiguousPath(lp[0],lp[1]));
	return Join(...tracks);
}


SegmentsSerial=function(state){
	if(!state.tracks||!state.tracks.length)
		return "";
	var	lineartracks=LinearTracks(state.tracks);
	var	orientedlineartracks=lineartracks.map(OrientedTrack);
	var H=state.H;
	var	orientedtracks=Sorter(TrackLineariser(H))(orientedlineartracks);
	var overpath=orientedtracks.map(TrackLineariser(H));
	var differences=[0].concat(overpath);
		differences=Rest(differences).map((d,i)=>d-differences[i]);
	var pointtracks=orientedtracks.map((l,i)=>[differences[i],l]);
	var serials=pointtracks.map(PointTrackSerial);
		return serials.join("");
}

GenreSerial=function(state){
	if(typeof GenreLetters==="undefined"||!In(GenreLetters,state.genre))
		return "";
	return GenreLetters[state.genre];
}

PointTrackSerial=function(pointtrack){
	return String(pointtrack[0])+TrackDirectionSerial(pointtrack[1]);
}

TrackDirectionSerial=function(track){
	if(!track.length)
		return "";
	var track=Clone(track);
	var directions;
	if(track.length<2){
		directions=[SegmentUnitDirection(First(track))]
	}else{
		directions=Rest(track).map(function(segment,i){
			var dir=SegmentPairNextDirection(track[i],segment);
			return dir;
		});
		directions.unshift(SegmentPairSelfNextDirection(track[0],track[1]));
	}
	
	//directions=directions.map(DirectionCode).join("").split(/(\D\D\D)/g).filter(Identity);
	directions=directions.map(DirectionCode).filter(Identity);
	directions=directions.map(Accesser(DirectionsLetter))
	return directions.join("");
}

SegmentPairNextDirection=function(segment1,segment2){
	var p10=First(segment1);
	var p11=Last(segment1);
	var p20=First(segment2);
	var p21=Last(segment2);
	if(Equal(p10,p20)||Equal(p11,p20))
		return VectorMinus(p21,p20);
	if(Equal(p10,p21)||Equal(p11,p21))
		return VectorMinus(p20,p21);
}

SegmentPairSelfNextDirection=function(segment1,segment2){
	return VectorTimes([-1,-1],SegmentPairNextDirection(segment2,segment1));
}



DirectionCode=function(direction){
	return Accesser(CoordinatesDirections)(String(direction));
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
		if(serialObj.s)
			state.segments=SerialSegments(serialObj.s,state);
		state.metadata=Merge(state.metadata||{},SerialMetadata(serialObj))
	return state;
}

var MetadataAbbreviations={
	"author":"a",
	"date":"d",
	"title":"t",
	"url":"u",
	"thanks":"k"
}

var AbbreviationsMetadata=FlipKeysValues(MetadataAbbreviations);

SerialMetadata=function(serialObj){
	var metadata=ObjectKeyIntersection(serialObj,AbbreviationsMetadata);
		metadata=ReKeyObject(metadata,Accesser(AbbreviationsMetadata));
		Keys(metadata).map(k=>metadata[k]=decodeURIComponent(metadata[k]));
	return metadata;
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
	var s=SegmentsSerial(state);
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







///////////////////////////////////////////////////////////////////////////////
//Interactive UI (for quick iteration)

DrawStateGrid=function(state){
	var gridOpts={
		...state.grid,
		rows:state.H,
		cols:state.W
	}
	if(state.grid.dual){
		gridOpts.rows-=1;
		gridOpts.cols-=1;
		gridOpts.border=1;
	}
	if(state.win.won)
		gridOpts=Merge(gridOpts,state.win.grid);

	if(state.visuals.monochrome){
		if(gridOpts.strokeColor)
			gridOpts.strokeColor=HEXSaturater(0)(gridOpts.strokeColor);
		if(gridOpts.fillColor)
			gridOpts.fillColor=HEXSaturater(0)(gridOpts.fillColor);

	}
	DrawSquaresGrid(gridOpts);
}


DrawTracks=function(tracks,state,Opts){
	var positionErrors=state.atErrors;
	tracks.map((track,i)=>DrawTrack(track,state,Opts,positionErrors[i]));
}



DrawStatePaths=function(state){
	var tracks=state.tracks;
	var Opts=Extremes(state);
	
	Opts={
		...Opts,
		opacity:state.line.opacity,
		lineWidth:state.line.lineWidth
	}

	var wrong=DrawTracks(tracks,state,Opts);

	if(!state.mode.edit&&state.mode.selection.length>1){
		var seltrack=PathTrack(state.mode.selection);
		Opts={
			...Opts,
			edit:true,
			clearing:state.mode.clearing,
			...state.overline
		}
		DrawTrack(seltrack,state,Opts)
	}
	return wrong;
}

DrawState=function(state){
	UnDraw();
	DrawBoard(state);
	DrawMetadata(state);
}

DrawBoard=function(state){
	UnDrawBoard(state);
	DrawStateGrid(state);
	DrawStatePaths(state);
	DrawLevel(state);
}

UnDrawBoard=function(state){
	var gridExtremes=Extremes(state);
	var c=1.05;//small correction
	gridExtremes.x0-=gridExtremes.square/2*c;
	gridExtremes.y0-=gridExtremes.square/2*c;
	gridExtremes.x1+=gridExtremes.square/2*c;
	gridExtremes.y1+=gridExtremes.square/2*c;
	UnDraw(gridExtremes);
}

DrawMetadata=function(state){
	var Opts={
		target:state.target,
		colour:state.metadata.textColour,
		fontWeight:"bold"
	}
	DrawText({
		...Opts,
		txt:Capitalise(state.genre),
		fontSize:"calc(var(--h4) + var(--w4))",
		y:0.1
	})

	Opts={
		...Opts,
		fontSize:"calc(var(--h1) + var(--w1))"
	};

	state.description.split(/\n/).map((line,i)=>DrawText({
		...Opts,
		txt:line,
		fontWeight:"italic",
		y:0.15+0.04*i
	}))
	


	Opts={
		...Opts,
		textAlign:"right",
		x:0.95
	};

	var title=state.metadata.title?(Exfix(state.metadata.title,'"')+" "):"";
	var author=state.metadata.author?("by "+state.metadata.author):"";
	var date=state.metadata.date||"";
	if(date){
		date=" — "+TrimWhitespaceString(SpacedString(StripHTML(StringDateName(date,{simplified:true}))))
	}
	var url=state.metadata.url||""

	var y=0.98;
	if(url){
		y=0.94;
		DrawText({
			...Opts,
			txt:url,
			y:y+0.04,
			fontWeight:"italic"
		})
	}

	if(title+author+date)
		DrawText({
			...Opts,
			txt:title+author+date,
			y:y
		})	

	var thanks=state.metadata.thanks?("With thanks to "+Enumerate(state.metadata.thanks.split(","))+"."):"";
	if(thanks)
		DrawText({
			...Opts,
			txt:thanks,
			fontWeight:"bold italic",
			x:0.05,
			textAlign:"left",
			y:y
		})	
	
}


StateUpdater=function(opts){
	return function(){
		if(opts.W||opts.H)
			UnDrawBoard(STATE)
		UpdateState(opts);
	}
}

UpdateState=function(opts){
	if(opts)
		Keys(opts).map(k=>STATE[k]=opts[k](STATE[k]));
	STATE.tracks=SplitContiguousTracks(STATE.segments);
	STATE.atErrors=StateAtErrors(STATE);
	STATE.win.won=StateWon(STATE);
	DrawCursor(STATE);
	DrawBoard(STATE);
	AddUndo(STATE);
	NavigateSerial(StateSerial(STATE));
}

DrawCursor=function(state){
	if(!state.mode.edit)
		STATE=CursorStateUpdate("pencil",STATE)
	else if(state.mode.symbol)
		STATE=CursorStateUpdate(state.mode.symbol,STATE)
}

CursorStateUpdate=function(name,state){
	var state=Clone(state);
	if(!state.visuals.cursor||state.visuals.cursor!==name){
		state.visuals.cursor=name;
		var cursor=name;
		var opts={};
		var Icons=state.symbols;
		if(In(Icons,name)){
			cursor=Icons[name];
			cursor=RescalePath({...cursor,scale:1,square:100},true);
			cursor=DisplacePath({...cursor,px:10,py:10});
			cursor.viewBox="0 0 110 110",
			cursor=BuildSymbolIcon({...cursor,primitive:"cursor-triangle"});
			opts.fill=Icons[name].colour;
		}
		opts.width=state.visuals.cursorsize||80;
		opts.height=state.visuals.cursorsize||80;
		SetCursor(state.target,cursor,opts);
	}
	return state;
}

//Undo
ObtainSetLevelState=function(state){
	STATE=state;
	DrawBoard(state);
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


XYFruit=function(xy,state){
	var fruits=Keys(state.level).filter(k=>In(state.level[k],xy));
	if(fruits.length)
		return First(fruits);
	else
		return false;
}


XYMark=function(xy,state){
	var marks=Keys(state.marks).filter(k=>In(state.marks[k],xy));
	if(marks.length)
		return First(marks);
	else
		return false;
}

XYMarkRemove=function(xy){
	var oldmark=XYMark(xy,STATE);
	if(oldmark)
		STATE.marks[oldmark]=STATE.marks[oldmark].filter(cr=>!Equal(cr,xy));
	return STATE;
}

XYFruitRemove=function(xy){
	var oldfruit=XYFruit(xy,STATE);
	if(oldfruit)
		STATE.level[oldfruit]=STATE.level[oldfruit].filter(cr=>!Equal(cr,xy));
	return STATE;
}

XYFruitAdd=function(xy){

	if(!PointValid(xy,STATE))
		return;

	XYFruitRemove(xy);

	var overfruit=STATE.mode.symbol;
	if(!STATE.level[overfruit])
		STATE.level[overfruit]=[];

	STATE.level[overfruit].push(xy);
	STATE.level[overfruit]=Sort(STATE.level[overfruit]);
}

XYMarkAdd=function(xy){

	if(!PointValid(xy,STATE))
		return;

	XYMarkRemove(xy);

	var overmark=STATE.mode.symbol;
	if(!STATE.marks[overmark])
		STATE.marks[overmark]=[];

	STATE.marks[overmark].push(xy);
	STATE.marks[overmark]=Sort(STATE.marks[overmark]);
}

XYSegments=function(xy,state){
	var segments=state.segments.filter(s=>In(s,xy));
	return segments;
}

XYSegmentAdd=function(segment){
	if(!SegmentValid(segment,STATE))
		return;
	var segment=CanonicalSegment(segment);
	if(!In(STATE.segments,segment))
		STATE.segments.push(segment);
}

XYSegmentRemove=function(segment){
	if(!SegmentValid(segment,STATE))
		return;
	var segment=CanonicalSegment(segment);
	STATE.segments=Remove(STATE.segments,segment);
}

DragActionDrawStarter=function(x,y){
	STATE.mode.edit=false;
	DragActionStarter(x,y);
}

DragActionAltStarter=function(x,y){
	STATE.mode.edit=!STATE.mode.edit;
	DragActionStarter(x,y);
}

DragActionStarter=function(x,y,w,h){
	var xy=CanvasPoint(x,y,w,h,STATE);
	if(!PointValid(xy,STATE))
		return;//TODO OTHER OPTIONS
	STATE.mode.symbol=XYFruit(xy,STATE)||STATE.mode.symbol;
	STATE.mode.dragging=true;
	STATE.mode.selection=[xy];
	if(STATE.mode.edit){
		STATE.mode.clearing=!!XYFruit(xy,STATE);
		DrawBoard(STATE);
	}
}
DragActionContinuer=function(x,y,w,h){
	var xy=CanvasPoint(x,y,w,h,STATE);
	if(!PointValid(xy,STATE))
		return;
	if(!STATE.mode.selection)
		STATE.mode.selection=[];
	if(!In(STATE.mode.selection,xy)){
		STATE.mode.selection=AddOnce(STATE.mode.selection,xy);
		DrawBoard(STATE);
	}
	else if(STATE.mode.selection.length>1&&Equal(First(Take(STATE.mode.selection,-2)),xy)){
		STATE.mode.selection=Remove(STATE.mode.selection,Last(STATE.mode.selection));
		DrawBoard(STATE);
	}

	if(!STATE.mode.edit){
		var selected=STATE.mode.selection;
		STATE.mode.clearing=Intersection(XYSegments(selected[0],STATE),XYSegments(selected[1],STATE)).length>=1;
		if(STATE.mode.clearing)
			STATE=CursorStateUpdate("pencil-erase",STATE)
		else
			STATE=CursorStateUpdate("pencil",STATE)
	}

}
DragActionEnder=function(x,y){
	STATE.mode.dragging=false;
	var selected=STATE.mode.selection||[];
	var segments=PathTrack(selected);

	if(STATE.mode.edit){
		if(STATE.mode.clearing)
			selected.map(XYFruitRemove);
		else
			selected.map(XYFruitAdd);
	}
	else {
		selected=STATE.mode.selection||[];
		if(selected.length>1){
			if(STATE.mode.clearing)
				segments.map(XYSegmentRemove);
			else{
				segments.map(XYSegmentAdd);
			}
		}
	}
	STATE.mode.selection=[];
	UpdateState();
}


TransformLevel=function(level,CoordinateTransform){
	var newlevel={};
	Keys(level).map(k=>newlevel[k]=level[k].map(CoordinateTransform));
	return newlevel;
};

DecrementCanvasWidth	=StateUpdater({W:W=>Max(W-1,2)});
DecrementCanvasHeight	=StateUpdater({H:H=>Max(H-1,2)});
IncrementCanvasWidth	=StateUpdater({W:W=>Max(W+1,2)});
IncrementCanvasHeight	=StateUpdater({H:H=>Max(H+1,2)});

BoardShifter=function(L){
	return function(){
		LevelShifter(L)();
		SegmentsShifter(L)();
	};
}

LevelShifter=function(L){
	return StateUpdater({level:level=>TransformLevel(level,LetterCoordinatesShifter(L))});
}
SegmentsShifter=function(L){
	return StateUpdater({
		segments:segments=>segments.map(seg=>seg.map(LetterCoordinatesShifter(L)))});
}

LetterCoordinatesShifter=function(L){
	return function(xy){
		return VectorPlus(xy,DirectionsCoordinates[L])
	}
}


var ClearBoard=StateUpdater({segments:segments=>[],level:level=>Empty({})});
var ClearSegments=StateUpdater({segments:segments=>[]});
var ClearFruit=StateUpdater({level:level=>Empty({})});

FruitSetter=function(fruit){
	KeyboardActions[STATE.symbols[fruit].letter]=function(){
		STATE.mode.edit=true;
		STATE.mode.symbol=fruit;
		DrawCursor(STATE);
	}
}

CycleStateSymbol=function(state,n){
	var state=Clone(state);
	if(!n)
		var n=1;
	if(!state.mode.edit)
		state.mode.edit=true;
	var symbols=Sort(Keys(state.symbols));
	if(!state.mode.symbol)
		state.mode.symbol=First(symbols);
	else{
		symbols=CycleSort(symbols,a=>a===state.mode.symbol)
		state.mode.symbol=symbols[(symbols.length+n)%symbols.length];
	}
	return state
}

var KeyboardActions={
	"alt left":LevelShifter("L"),
	"alt up":LevelShifter("U"),
	"alt right":LevelShifter("R"),
	"alt down":LevelShifter("D"),
	
	"shift left":BoardShifter("L"),
	"shift up":BoardShifter("U"),
	"shift right":BoardShifter("R"),
	"shift down":BoardShifter("D"),

	"shift alt left":SegmentsShifter("L"),
	"shift alt up":SegmentsShifter("U"),
	"shift alt right":SegmentsShifter("R"),
	"shift alt down":SegmentsShifter("D"),
	
	"ctrl left":DecrementCanvasWidth,
	"ctrl up":IncrementCanvasHeight,
	"ctrl right":IncrementCanvasWidth,
	"ctrl down":DecrementCanvasHeight,
	
	"ctrl shift up":StateUpdater({H:H=>BlankState.H}),
	"ctrl shift right":StateUpdater({W:W=>BlankState.W}),
	"ctrl shift left":StateUpdater({H:H=>2}),
	"ctrl shift down":StateUpdater({W:W=>2}),

	"ctrl b":function(){STATE.visuals.monochrome=!!!STATE.visuals.monochrome;UpdateState();},
	"ctrl shift b":function(){STATE.visuals.solid=!!!STATE.visuals.solid;UpdateState();},
	"ctrl s":ExportSerial,

	"space":function(){STATE.mode.edit=!STATE.mode.edit;UpdateState();},

	"ctrl r":ClearSegments,
	"ctrl shift r":ClearFruit,
	"ctrl alt r":ClearBoard,

	"ctrl z":function(){Undo()},
	"ctrl shift z":function(){Redo()},
	"backspace":function(){Undo()},
	"shift backspace":function(){Redo()},
	"ctrl shift y":function(){Undo()},
	"ctrl y":function(){Redo()},

	"delete":ClearSegments,
	"ctrl delete":ClearFruit,
	"shift delete":ClearBoard

};

var WheelActions={
	"wheel-up":function(){
		STATE=CycleStateSymbol(STATE,-1);
		UpdateState();
	},
	"wheel-down":function(){
		STATE=CycleStateSymbol(STATE,1);
		UpdateState();
	}
}

var DragActions={
	"drag-on":DragActionStarter,
	"drag-on-alt":DragActionDrawStarter,
	"drag-on-2":WheelActions["wheel-down"],
	"drag-on-3":DragActionDrawStarter,
	"drag-on-4":ClearSegments,
	"drag-on-5":ClearFruit,
	"drag-on-6":()=>ScrollInto(".main"),
	"drag-continue":DragActionContinuer,
	"drag-off":DragActionEnder
}

CanvasResize=function(){
	var e=GetElement(STATE.target);
	e.width=Max(window.innerWidth,e.width||0,e.scrollWidth||0);
	e.height=Max(window.innerHeight,e.height||0,e.scrollHeight||0);
	DrawState(STATE);
}


///////////////////////////////////////////////////////////////////////////////
//State
//a friendly representation of the board state.
//The source of truth: updating STATE must update everything.

ObtainStartingLevelState=function(){
	var state=Clone(BlankState);
	if(PageSearch("W")||PageSearch("H"))
		state=SerialState(PageSearchObject(),state);		
	return state;
}

PreAddStateCanvas=function(state,target){
	PreAddElement(`
	<canvas 
		id="${state.target}" 
		oncontextmenu="return false;" 
		width="${state.width}" 
		height="${state.height}"
	>`,target);
}

InitialisePuzzle=function(){
	STATE=ObtainStartingLevelState();
	STATE.width=window.innerWidth;
	STATE.height=window.innerHeight*0.9;
	PreAddStateCanvas(STATE,"body");

	AttendDrag(DragActions,STATE.target);
	AttendWheel(WheelActions,STATE.target,75);
	Attend('resize',CanvasResize);
	Keys(STATE.symbols).map(FruitSetter);
	Keybind(KeyboardActions,STATE.target);
	ResumeCapturingKeys(ComboKeyPressHandler);

	UpdateState();
	SetCursor(STATE.target,STATE.visuals.cursor);
	setTimeout(()=>FocusElement(STATE.target),500);

	CanvasResize();
	//Auto instructions
	AutoInstructions(STATE.symbols)
	
}

StateImage=function(state){
	var target=state.target;
	var e=GetElement(target);
	var href=e.toDataURL("image/png");
	return ImageHTML({src:href,alt:"kudamono",title:"kudamono"})
}


AutoInstructions=function(symbols){
	HyperText("KudamonoFruitShortcuts",function(){
		return TableHTML({
		headers:["Shortcut","Symbol"],
		caption:"Choose a symbol by pressing:",
		rows:Sort(Keys(symbols)).map(name=>[KB(symbols[name].letter),name])
		})});
}

AutoInstructions(FruitIcons)

if(PageSearch("W")||PageSearch("H")){
	HearAll(sources,InitialisePuzzle)
}