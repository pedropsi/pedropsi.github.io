///////////////////////////////////////////////////////////////////////////////
//Kudamono Editor (c) Pedro PSI, 2021
///////////////////////////////////////////////////////////////////////////////

var sources=["data-game-colours.js","data-game-canvas.js"];
sources.map(LoaderInFolder("codes/game/modules"));

///////////////////////////////////////////////////////////////////////////////
FruitIcons={
	"apple":{
		letter:"a",
		colour:"rgb(153,0,0)",
		viewBox:"0 0 1691 1192",
		path:"M 482 0 C 453 67 436 174 443 248 L 449 311 L 397 284 C 303 235 168 253 103 324 C 38 394 4 523 13 665 C 20 780 40 856 87 952 C 174 1131 338 1216 445 1138 C 462 1126 467 1126 489 1141 C 530 1168 626 1163 680 1130 C 780 1071 868 952 917 808 C 942 735 945 714 945 592 C 945 472 942 451 922 407 C 898 355 859 308 825 289 C 754 251 631 252 563 292 C 545 302 530 307 530 303 C 530 298 551 282 577 267 C 679 206 800 51 800 -21 L 800 -49 L 768 -32 C 708 -2 632 61 599 108 L 565 154 L 555 80 C 547 19 521 -48 506 -48 C 504 -48 493 -27 482 0 Z",
	},
	"pear":{
		letter:"p",
		colour:"rgb(102,153,0)",
		viewBox:"0 0 120 120",
		shifty:0.2,
		path:"M 26 5 L 28 4 L 34 20 Q 42 18 48 42 Q 57 44 63 67 Q 68 101 31 99 Q 4 95 7 63 Q 13 35 24 24 Q 26 21 31 19 Q 16 16 13 2 Q 23 4 31 18 L 26 5 Z",
	},
	"blueberry":{
		letter:"b",
		colour:"rgb(0,0,153)",
		viewBox:"0 0 1669 1100",
		path:"M 641 1062 L 645 1025 L 591 1020 C 490 1009 411 938 393 839 L 386 800 L 374 830 C 346 896 251 939 187 914 C 161 904 159 906 151 936 C 143 966 142 967 135 945 C 129 926 123 923 99 928 C 72 934 70 932 67 897 C 64 864 60 858 32 851 L 0 843 L 19 810 C 33 788 39 760 39 718 C 39 615 101 543 189 543 L 224 543 L 191 517 C 103 447 76 316 132 221 C 147 195 173 164 190 152 L 220 131 L 193 102 L 165 73 L 207 73 C 247 73 249 72 249 43 C 249 26 252 13 256 13 C 259 13 282 25 307 39 L 351 65 L 384 33 L 418 0 L 442 55 C 461 98 476 115 512 137 C 561 165 601 210 619 257 C 630 286 630 286 644 266 C 661 241 718 213 751 213 C 764 213 792 222 814 234 C 851 254 853 254 866 237 C 878 220 879 220 879 240 C 879 252 887 263 899 266 C 917 271 918 275 909 299 C 899 323 901 329 919 343 L 940 359 L 914 373 C 900 381 880 406 869 430 C 826 527 703 541 644 456 L 620 420 L 606 455 C 576 526 472 583 372 583 L 330 583 L 354 618 C 367 638 383 670 390 690 L 401 725 L 419 686 C 456 602 545 543 644 536 C 695 532 712 535 759 560 C 837 600 874 662 874 752 C 874 793 867 831 856 853 C 841 884 841 894 853 940 L 867 992 L 822 995 C 779 998 776 1000 761 1038 C 741 1090 742 1089 721 1070 C 697 1048 690 1049 661 1076 L 637 1098 L 641 1062 Z",
	},
	"cherry":{
		letter:"c",
		colour:"rgb(204,0,0)",
		viewBox:"0 0 1520 1002",
		shifty:0.1,
		path:"M 526 17 L 497 30 L 499 125 C 503 296 454 446 366 541 L 320 590 L 274 575 C 184 545 76 594 28 686 C -4 746 -3 843 31 903 C 81 994 177 1038 271 1013 C 331 997 404 924 420 863 C 436 805 427 721 401 685 L 381 656 L 431 603 C 513 515 571 375 586 226 C 593 164 593 163 612 180 C 647 212 720 330 745 396 C 758 432 771 485 772 515 L 775 568 L 740 566 C 641 559 555 610 514 697 C 471 789 491 893 564 961 C 658 1048 779 1041 862 944 C 928 867 936 764 884 675 C 864 641 859 622 864 595 C 872 541 853 431 822 349 C 784 253 730 172 648 90 C 611 53 580 18 580 13 C 580 0 562 2 526 17 Z"
	},
	"melon":{
		letter:"m",
		colour:"rgb(56,87,35)",
		viewBox:"0 0 2000 1500",
		shiftx:0.1,
		shifty:0.2,
		path:"M 523 -50 C 502 -23 451 31 409 71 C 346 130 315 151 239 184 C 187 207 116 234 81 244 C 46 254 15 264 13 266 C 10 270 29 362 34 370 C 35 371 113 352 207 329 L 379 286 L 398 307 C 408 318 433 351 453 379 L 489 430 L 435 483 C 376 542 315 648 284 748 C 259 828 259 1004 283 1084 C 312 1177 359 1251 435 1327 C 553 1442 683 1496 842 1495 C 1121 1494 1313 1348 1405 1066 C 1445 943 1419 750 1345 627 C 1278 514 1238 474 1122 405 C 986 325 771 309 609 368 C 585 377 558 386 550 389 C 540 392 517 368 483 321 L 432 249 L 541 107 L 650 -35 L 617 -59 C 563 -100 563 -100 523 -50 Z"
	},
	"grape":{
		letter:"g",
		colour:"rgb(102,0,102)",
		viewBox:"0 0 1600 1600",
		shifty:0.1,
		path:"M 372 -181 C 364 -169 360 -159 362 -157 C 364 -156 407 -129 458 -98 C 508 -66 550 -37 550 -31 C 550 -18 520 10 464 49 C 425 76 405 83 368 83 C 312 83 277 111 255 174 C 246 203 236 214 218 216 C 178 221 153 239 129 282 C 109 316 105 336 107 394 C 108 460 106 467 84 479 C 0 523 -14 706 60 780 C 79 798 99 808 119 808 C 143 808 152 814 165 843 C 174 862 188 882 196 889 C 206 897 208 915 204 957 C 196 1029 214 1093 251 1131 C 276 1155 287 1159 320 1156 C 357 1153 360 1154 376 1193 C 385 1215 395 1255 396 1283 C 401 1352 437 1418 482 1443 C 519 1462 520 1463 554 1444 C 574 1433 596 1410 606 1389 C 624 1351 630 1271 618 1227 C 611 1203 612 1202 640 1206 C 706 1216 760 1140 760 1039 C 760 997 766 969 780 945 C 820 878 815 771 768 705 C 749 679 749 676 765 633 C 785 581 782 499 758 452 C 750 434 746 414 750 407 C 769 373 771 307 756 255 C 731 169 672 131 612 162 C 595 171 576 186 571 195 C 563 208 561 190 560 127 L 560 42 L 622 -41 C 681 -121 683 -125 665 -138 C 647 -151 643 -149 614 -115 L 583 -78 L 504 -127 C 461 -154 416 -181 405 -189 C 387 -200 383 -199 372 -181 Z M 498 209 C 478 222 476 221 459 173 L 442 128 L 474 103 L 505 78 L 508 140 C 510 182 507 204 498 209 Z"
	},
	"orange":{
		letter:"o",
		colour:"rgb(255,122,31)",
		viewBox:"-5 -5 40 40",
		path:"M 4 26 Q 7 30 15 30 Q 28 29 30 15 Q 30 5 26 4 Q 25 0 15 0 Q 1 1 0 15 Q 0 23 4 26 Z"
	},
	"lemon":{
		letter:"l",
		colour:"rgb(255,192,0)",
		viewBox:"-15 -15 45 45",
		path:"M 0 30 Q 3 31 5 30 Q 28 30 30 7 Q 32 3 30 0 Q 27 -2 23 0 Q 0 2 0 25 Q -1 28 0 30 Z"
	}
}





PositionValid=function(px,py,state){
	return !(px<0||px>state.W||py<0||py>state.H);
}

DrawFruit=function(Opts,state){
	if(!PositionValid(Opts.px,Opts.py,state)||!Opts.type)
		return;
	var type=Opts.type;
	var colour=Opts.colour;
	var Opts={
		...Opts,
		...state.grid,
		...FruitIcons[type],
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

	if(typeof Opts.shiftx==="undefined")
		Opts.shiftx=0;
	if(typeof Opts.shifty==="undefined")
		Opts.shifty=0;
	Opts.shiftx+=0.3;
	Opts.shifty+=0.3;

	Opts=ReKeyObject(Opts,x=>(x==="fruitScale"?"scale":x));
	DrawSVG(Opts);
}

DrawFruits=function(type,coordinates,Opts){
	var Opts=Opts||{};
	if(!coordinates)
		var coordinates=STATE.level[type]||[];
	coordinates.map(xy=>DrawFruit({...Opts,type:type,px:xy[0],py:xy[1]},STATE));

}

DrawLevel=function(state){
	var types=Keys(state.level);
	types.map(fruit=>DrawFruits(fruit));

	if(state.mode.clearing)
		DrawFruits(state.mode.symbol,state.mode.selection,{colour:HEXLightener(0.9)});
	else
		DrawFruits(state.mode.symbol,state.mode.selection,{colour:HEXDarkener(0.8)});
}


//Generate Serial

FruitSerial=function(fruit,state){
	var coordinates=state.level[fruit].sort().filter((xy)=>PositionValid(xy[0],xy[1],STATE));
	if(!coordinates.length)
		return "";
	var differences=CoordinateHorizontalDifferences(coordinates,state.W+1);
	var letter=FruitIcons[fruit].letter.toLowerCase();
	return differences.map(d=>letter+d).join("")
}

CoordinateHorizontalDifferences=function(coordinates,W){
	var linepositions=coordinates.map(xy=>xy[0]+xy[1]*W);
		linepositions=Sort(linepositions);
		linepositions.unshift(0);
	return Rest(linepositions).map((p,i)=>p-linepositions[i]);
}

DifferencesHorizontalCoordinates=function(differences,W){
	var accumulated=differences.map((n,i)=>Apply(Plus,Take(differences,i+1)));
	return accumulated.map(a=>[a%W,Floor(a/W)]);
}

StateLevelSerial=function(state){
	return Keys(state.level).map(fruit=>FruitSerial(fruit,state)).join("");
}


StateSerial=function(state){
	var Opts={};
		Opts.W=state.W;
	if(state.H!==state.W)
		Opts.H=state.H;
		Opts.L=StateLevelSerial(state);
		// Opts.P=StatePathSerial(state);
	return ParameterString(Opts);
}

//Read Serial

FruitSerialPattern=/(\w)(\d+)/g;

LetterFruit=function(l){
	var fruits=Keys(FruitIcons).filter(fruit=>FruitIcons[fruit].letter===l);
	if(fruits.length)
		return First(fruits);
}

FruitSerialsCoordinates=function(serials,W){
	var fruit=LetterFruit(First(First(serials)));
	var differences=serials.map(s=>Number(Rest(s)));
	var coordinates=DifferencesHorizontalCoordinates(differences,W+1);
	var fsc={};
		fsc[fruit]=coordinates;
	return fsc;
}

SerialLevel=function(serial,state){
	var fruitserials=Gather(serial.match(FruitSerialPattern),First);
	var coordinates=fruitserials.map(s=>FruitSerialsCoordinates(s,state.W));
	return Apply(Join,coordinates);
}


SerialState=function(serialObj,state){
	var state={...state};
	var serialObj=ReKeyObject(serialObj,LowerCase);
		state.W=Number(serialObj.w||serialObj.h);
		state.H=Number(serialObj.h||serialObj.w);
		state.level=SerialLevel(serialObj.l,state);
	return state;
}

StateSerial=function(state){
	var Opts={};
		Opts.W=state.W;
	if(state.H!==state.W)
		Opts.H=state.H;
		Opts.L=StateLevelSerial(state);
	return ParameterString(Opts);
}





///////////////////////////////////////////////////////////////////////////////


// function BWCellId(w,h,d,horizDivided){
// 	return ""+w+" "+h+" "+d+" "+(HorizontallyDivided(w,h,horizDivided)?"-":"|");
// }

// function BWCellPolygon(w,h,d,width,height,divisions,horizDivided,cwidth,cheight){
// 	if(HorizontallyDivided(w,h,horizDivided))
// 		return [
// 			w*cwidth/width,
// 			(h+d/divisions)*cheight/height,
// 			(1)*cwidth/width,
// 			(1/divisions)*cheight/height
// 		].map(n=>Round(n,1));
// 	else
// 		return [
// 			(w+d/divisions)*cwidth/width,
// 			h*cheight/height,
// 			(1/divisions)*cwidth/width,
// 			(1)*cheight/height
// 		].map(n=>Round(n,1));
// }

// function BWPolygons(width,height,divisions,horizDivided,cwidth,cheight){
// 	var polygons={};
// 	for(var w=0;w<width;w++){
// 		for(var h=0;h<height;h++){
// 			for(var d=0;d<divisions;d++){
// 				polygons[BWCellId(w,h,d,horizDivided)]=BWCellPolygon(w,h,d,width,height,divisions,horizDivided,cwidth,cheight);
// 			}
// 		}
// 	}
// 	return polygons;
// }

// function HorizontallyDivided(w,h,horizDivided){
// 	return horizDivided&&(w+h)%2===1||!horizDivided&&(w+h)%2!==1
// }

// function BWCellAdjacencies(w,h,d,width,height,divisions,horizDivided){
// 	var adjacencies=[];
// 	function AdjPush(ww,hh,dd){
// 		adjacencies.push(BWCellId(ww,hh,dd,horizDivided));
// 	}
// 	if(HorizontallyDivided(w,h,horizDivided)){ //horizontal
// 		if(h>=1&&d===0){
// 			//above, prev line
// 			Range(0,divisions-1).map(di=>AdjPush(w,h-1,di));
// 			//corners
// 			if(w>0)
// 				AdjPush(w-1,h-1,divisions-1);
// 			if(w<width-1)
// 				AdjPush(w+1,h-1,divisions-1);
			
// 		}
// 		if(d>=1)//above, within
// 			AdjPush(w,h,d-1);
// 		if(h<height-1&&d===divisions-1){
// 			//below, next line
// 			Range(0,divisions-1).map(di=>AdjPush(w,h+1,di));
// 			//corners
// 			if(w>0)
// 				AdjPush(w-1,h+1,0);
// 			if(w<width-1)
// 				AdjPush(w+1,h+1,0);
			
// 		}
// 		if(d<divisions-1)//below, within
// 			AdjPush(w,h,d+1);

// 		if(w>=1)//left
// 			AdjPush(w-1,h,divisions-1);
// 		if(w<width-1)//right
// 			AdjPush(w+1,h,0);
	
// 	}else{ //vertically divided
// 		if(w>=1&&d===0){
// 			//left, prev column
// 			Range(0,divisions-1).map(di=>AdjPush(w-1,h,di));
// 			//corners
// 			if(h>0)
// 				AdjPush(w-1,h-1,divisions-1);
// 			if(h<height-1)
// 				AdjPush(w-1,h+1,divisions-1);
// 		}
// 		if(d>=1)//left, within
// 			AdjPush(w,h,d-1);
// 		if(w<width-1&&d===divisions-1){
// 			//right, next column
// 			Range(0,divisions-1).map(di=>AdjPush(w+1,h,di));
// 			//corners
// 			if(h>0)
// 				AdjPush(w+1,h-1,0);
// 			if(h<height-1)
// 				AdjPush(w+1,h+1,0);
// 		}
// 		if(d<divisions-1)//right, within
// 			AdjPush(w,h,d+1);

// 		if(h>=1)//above
// 			AdjPush(w,h-1,divisions-1);
// 		if(h<height-1)//below
// 			AdjPush(w,h+1,0);
// 	}

// 	return adjacencies;
// }

// function BWCellVLine(w,h,d,width,height,divisions,horizDivided){
// 	var line=[];
// 	function LinePush(ww,hh,dd){
// 		line.push(BWCellId(ww,hh,dd,horizDivided));
// 	}
// 	if(HorizontallyDivided(w,h,horizDivided)){
// 		// //Vertical line
// 		// for(var hi=0;hi<height;hi++){
// 		// 	Range(0,divisions-1).map(di=>LinePush(w,hi,di));
// 		// }
// 	}
// 	else{
// 		//Vertical line
// 		for(var hi=0;hi<height;hi++){
// 			if(!HorizontallyDivided(w,hi,horizDivided))
// 				LinePush(w,hi,d)
// 			else
// 				Range(0,divisions-1).map(di=>LinePush(w,hi,di));
// 		}
// 	}
// 	return line;
// }

// function BWCellHLine(w,h,d,width,height,divisions,horizDivided){
// 	var line=[];
// 	function LinePush(ww,hh,dd){
// 		line.push(BWCellId(ww,hh,dd,horizDivided));
// 	}
// 	if(HorizontallyDivided(w,h,horizDivided)){
// 		//Horizontal line
// 		for(var wi=0;wi<width;wi++){
// 			if(HorizontallyDivided(wi,h,horizDivided))
// 				LinePush(wi,h,d)
// 			else
// 				Range(0,divisions-1).map(di=>LinePush(wi,h,di));
// 		}
// 	}
// 	else{
// 		// //Horizontal line
// 		// for(var wi=0;wi<width;wi++){
// 		// 	Range(0,divisions-1).map(di=>LinePush(wi,h,di));
// 		// }
// 	}
// 	return line;
// }

// function BWState(width,height,divisions,horizDivided){
// 	var state={
// 		geometry:"basket weave",
// 		Aligners:{
// 			vlines:BWCellVLine,
// 			hlines:BWCellHLine,
// 		},
// 		Polygoner:BWCellPolygon,
// 		lines:{},
// 		adjacencies:{}
// 	};
// 	var cell="";
// 	var horizDivided=horizDivided?1:0;
// 	var linetypes=Keys(state.Aligners);
// 		linetypes.map(type=>state.lines[type]={});
// 	for(var w=0;w<width;w++){
// 		for(var h=0;h<height;h++){
// 			for(var d=0;d<divisions;d++){
// 				cell=BWCellId(w,h,d,horizDivided);
// 				state.adjacencies[cell]=BWCellAdjacencies(w,h,d,width,height,divisions,horizDivided);
// 				linetypes.map(function(type){
// 					if(!Values(state.lines[type]).some(line=>In(line,cell)))
// 						state.lines[type][cell]=state.Aligners[type](w,h,d,width,height,divisions,horizDivided);
// 				})
// 			}
// 		}
// 	}
// 	linetypes.map(function(type){
// 		var l=state.lines[type];
// 		var emptylines=Keys(l).filter(k=>l[k].length<1);
// 		emptylines.map(k=>delete l[k]);
// 	});

// 	return state;
// }


///////////////////////////////////////////////////////////////////////////////
//Initialise

// function ColoursRegions(colours){
// 	var regions={};
// 	Unique(Values(colours)).map(c=>regions[c]=[]);
// 	Keys(colours).map(k=>regions[colours[k]].push(k));
// 	return regions;
// }

var STATE={
	//visuals
	target:"kudamono-canvas",
	visuals:{
		monochrome:false
	},
	line:{
		opacity:0.5,
		lineWidth:"10px",
		cap:"round",
		corners:"round",
		colour:"gray"		//current line colour (defaults to gray)
	},
	grid:{
		colour:"#DDDDDD",
		lineWidth:2,
		dash:[6,12],
		background:"#FFFFFF",
		width:1200,
		height:1200,
		border:0.5,
		fruitScale:100
	},	

	//Puzzle
	W:7,
	H:7,
	level:{
		"apple":[[1,1],[5,5]],
		"pear":[[3,3]],
		"cherry":[[2,2],[1,4]],
		"blueberry":[[3,1]],
		"grape":[[5,1],[1,2]],
		"lemon":[[6,1],[6,2]],
		"melon":[[4,4],[3,4]],
		"orange":[[2,1],[2,5]],
	},
	paths:{},
	crosses:{},

	//Interaction
	mode:{
		edit:true,			//true:adding fruits, false:solving
		dragging:false,		//whether dragging
		clearing:false,		//whether clearing fruits, lines, etc...
		symbol:"cherry",	//current fruit to be added
		line:false,			//whether adding lines,
		fruitline:false,	//which fruit the path connects to (defaults to none)
		selection:[],		//current points selected (accumulates)
		error:false			//whether to display errors
	}
}


///////////////////////////////////////////////////////////////////////////////
//Validator

// function KudamonoFull(state){
// 	return Keys(state.adjacencies).every(cell=>In(state.lines,cell)||In(state.crosses,cell));
// }


// function KudamonoSolved(state){
// 	return KudamonoLinesSolved(state)&&KudamonoRegionsSolved(state)&&KudamonoAdjacenciesValid(state);
// }

// //Regions
// function KudamonoRegionsApply(Transform,state){
// 	var lines=Keys(state.lines);
// 	var n=state.conditions.regions;
// 	var groups=Values(state.Regions());
// 	return Transform(groups,lines,n);
// }

// function KudamonoRegionsSolved(state){
// 	function Test(regionstars,lines,n){return regionstars.every(region=>Count(region,cell=>In(lines,cell))===n)}
// 	return KudamonoRegionsApply(Test,state);
// }

// function KudamonoLongRegions(state){
// 	var Filter=function(regionstars,lines,n){return regionstars.filter(region=>Count(region,cell=>In(lines,cell))>n)}
// 	return KudamonoRegionsApply(Filter,state);
// }

// function KudamonoShortRegions(state){
// 	var Filter=function(regionstars,lines,n){return regionstars.filter(region=>Count(region,cell=>In(lines,cell))<n)}
// 	return KudamonoRegionsApply(Filter,state);
// }

// //Adjacencies
// function KudamonoAdjacenciesApply(Transform,state){
// 	var lines=Keys(state.lines);
// 	var n=state.conditions.adjacencies;
// 	var groups=lines.map(s=>state.adjacencies[s]);
// 	return Transform(groups,lines,n);
// }

// function KudamonoAdjacenciesValid(state){
// 	function Test(activeadjacencies,lines,n){return activeadjacencies.every(adja=>Count(adja,cell=>In(lines,cell))===n);}
// 	return KudamonoAdjacenciesApply(Test,state);
// }

// function KudamonoInvalidAdjacencies(state){
// 	function Filter(activeadjacencies,lines,n){
// 		adjacencies=activeadjacencies.filter(adja=>Count(adja,cell=>In(lines,cell))>n);
// 		return Intersection(Union(...adjacencies),lines);
// 	}
// 	return KudamonoAdjacenciesApply(Filter,state);
// }


// //Lines
// function KudamonoLinesSolved(state){
// 	return Keys(state.lines).every(type=>KudamonoLinesValid(state,state.lines[type]));
// }

// function KudamonoLinesApply(Transform,state,lines){
// 	var lines=Keys(state.lines);
// 	var n=state.conditions.lines;
// 	var lines=Values(lines);
// 	return Transform(lines,lines,n);
// }

// function KudamonoLinesValid(state,lines){
// 	function Test(lines,lines,n){return lines.every(line=>Count(line,cell=>In(lines,cell))===n)};
// 	return KudamonoLinesApply(Test,state,lines);
// }

// function KudamonoLongSubLines(state,lines){
// 	function Filter(lines,lines,n){return lines.filter(line=>Count(line,cell=>In(lines,cell))>n)};
// 	return KudamonoLinesApply(Filter,state,lines);
// }

// function KudamonoShortSubLines(state,lines){
// 	function Filter(lines,lines,n){return lines.filter(line=>Count(line,cell=>In(lines,cell))<n)};
// 	return KudamonoLinesApply(Filter,state,lines);
// }

// function KudamonoLongLines(state){
// 	return Keys(state.lines).map(type=>KudamonoLongSubLines(state,state.lines[type]));
// }

// function KudamonoShortLines(state){
// 	return Keys(state.lines).map(type=>KudamonoShortSubLines(state,state.lines[type]));
// }


//Highlight errors

// function MarkWrongCell(cell){
// 	if(In(STATE.highlights,cell))
// 		return;
// 	STATE.highlights.push(cell);
// 	var colour=STATE.colours[cell];
// 	MarkPolygons([cell],{
// 		strokeColor:HEX(Lighten(colour,2)).colour,
// 		fillColor:HEX(Darken(colour,2)).colour
// 	})

// 	if(STATE.lines[cell])
// 		MarkStar(cell);
// 	if(STATE.crosses[cell])
// 		MarkCross(cell);
// }

// function UnMarkWrongCell(cell){
// 	if(!In(STATE.highlights,cell))
// 		return;
// 	STATE.highlights=Complement(STATE.highlights,[cell]);
// 	var colour=STATE.colours[cell];
// 	MarkPolygons([cell],{
// 		strokeColor:HEX(Darken(colour,2)).colour,
// 		fillColor:colour
// 	})

// 	if(STATE.lines[cell])
// 		MarkStar(cell);
// 	if(STATE.crosses[cell])
// 		MarkCross(cell);
// }

// function MarkWrongArea(area){
// 	return area.map(MarkWrongCell);
// }
// function UnMarkWrongArea(area){
// 	return area.map(UnMarkWrongCell);
// }


// function MarkWrongLines(){
// 	MarkWrongArea(KudamonoLongLines(STATE).flat().flat());
// 	MarkWrongArea(KudamonoShortLines(STATE).flat().flat());
// }
// function MarkWrongRegions(){
// 	KudamonoLongRegions(STATE).map(MarkWrongArea);
// 	KudamonoShortRegions(STATE).map(MarkWrongArea);
// }
// function UnMarkWrongLines(){
// 	UnMarkWrongArea(KudamonoLongLines(STATE).flat().flat());
// 	UnMarkWrongArea(KudamonoShortLines(STATE).flat().flat());
// }
// function UnMarkWrongRegions(){
// 	KudamonoLongRegions(STATE).map(UnMarkWrongArea);
// 	KudamonoShortRegions(STATE).map(UnMarkWrongArea);
// }

// function MarkWrongAdjacencies(){
// 	MarkWrongArea(KudamonoInvalidAdjacencies(STATE));
// }
// function UnMarkWrongAdjacencies(){
// 	UnMarkWrongArea(KudamonoInvalidAdjacencies(STATE));
// }

// function MarkErrors(){
// 	if(!STATE.errormode)
// 		return;
// 	MarkWrongAdjacencies();
// 	MarkWrongLines();
// 	MarkWrongRegions();
// }

// function UnMarkErrors(){
// 	UnMarkWrongAdjacencies();
// 	UnMarkWrongLines();
// 	UnMarkWrongRegions();
// }


///////////////////////////////////////////////////////////////////////////////
//Interactive UI (for quick iteration)


DrawStateGrid=function(state){
	var w=state.grid.width;
	var h=state.grid.height;
	var b=state.grid.border;

	var gridOpts={
		border:state.grid.border,
		rows:state.H,
		cols:state.W,
		strokeColor:state.grid.colour,
		dash:state.grid.dash,
		lineWidth:state.grid.lineWidth,
		background:"#FFFFFF"
	}

	DrawSquaresGrid(gridOpts);	
}

DrawState=function(){
	UnDraw();
	DrawStateGrid(STATE);
	DrawLevel(STATE);
}

StateUpdater=function(opts){
	return function(){
		UpdateState(opts);
	}
}

UpdateState=function(opts){
	if(opts)
		Keys(opts).map(k=>STATE[k]=opts[k](STATE[k]));
	DrawState();
	NavigateSerial(StateSerial(STATE));
}


// function MarkCross(cell,opts){
// 	var opts={
// 		lineWidth:`${STATE.LW}px`,
// 		fillColor:"red",
// 		strokeColor:"transparent",
// 		cross:true,
// 		n:4,
// 		size:STATE.starsize,
// 		...opts,
// 		...StarXY(cell)
// 	};
// 	DrawStar(opts);
// }

// function UnMarkCross(cell,opts){
// 	MarkCross(cell,{
// 		...opts,
// 		lineWidth:`${2*STATE.LW}px`,
// 		fillColor:STATE.colours[cell],
// 		strokeColor:STATE.colours[cell]
// 	})
// }

// function StarXY(cell){
// 	var p=STATE.polygons[cell];
// 	return {x:p[0]+p[2]/2,y:p[1]+p[3]/2}
// }



// RegionModeActive=StatusReporter(
// 	"RegionModeActive",
// 	function(){return STATE.regionmode}
// )

// RegionModeToggle=function(mode){
// 	return STATE.regionmode=!mode;
// }

// ErrorModeActive=StatusReporter(
// 	"ErrorModeActive",
// 	function(){return STATE.errormode}
// )

// ErrorModeToggle=function(mode){
// 	if(STATE.errormode)
// 		UnMarkErrors();
// 	else
// 		MarkErrors();
// 	return STATE.errormode=!mode;
// }


// PathGrower=function(dx,dy){
// 	if(!STATE.mode.selection||!STATE.mode.selection.length)
// 		STATE.mode.selection=[[0,0]];

// 	var xy=Last(STATE.mode.selection);
// 	var x=Max(Min(xy[0]+dx||0,STATE.W),0);
// 	var y=Max(Min(xy[1]+dy||0,STATE.H),0);

// 	if(xy[0]!==x||xy[1]!==y)
// 		STATE.mode.selection.push([x,y]);
	
// 	return [x,y];
// }

CanvasPosition=function(x,y,state){
	var extremes=GridExtremes({
		rows:state.H,
		cols:state.W,
		target:state.target
	})

	var col=Floor(state.W*(x-extremes.x0*extremes.width)/(extremes.x1-extremes.x0)/extremes.width+0.5);
	var row=Floor(state.H*(y-extremes.y0*extremes.height)/(extremes.y1-extremes.y0)/extremes.height+0.5);
	return [col,row];
}

XYFruit=function(xy,state){
	var fruits=Keys(state.level).filter(k=>In(state.level[k],xy));
	if(fruits.length)
		return First(fruits);
	else
		return false;
}

XYFruitRemove=function(xy){
	var oldfruit=XYFruit(xy,STATE);
	if(oldfruit)
		STATE.level[oldfruit]=STATE.level[oldfruit].filter(cr=>!Equal(cr,xy));
	return STATE;
}

XYFruitAdd=function(xy){

	if(!PositionValid(xy[0],xy[1],STATE))
		return;

	XYFruitRemove(xy);

	var overfruit=STATE.mode.symbol;
	if(!STATE.level[overfruit])
		STATE.level[overfruit]=[];

	STATE.level[overfruit].push(xy);
	STATE.level[overfruit]=STATE.level[overfruit].sort();
}

function DragActionStarter(x,y){
	var xy=CanvasPosition(x,y,STATE);
	STATE.mode.symbol=XYFruit(xy,STATE)||STATE.mode.symbol;
	STATE.mode.dragging=true;
	if(STATE.mode.edit){
		STATE.mode.clearing=!!XYFruit(xy,STATE);
		STATE.mode.selection=[xy];
		DrawState();
	}
}
function DragActionAltStarter(x,y){
	//return 	RegionModeActive()?PickRegionCells(x,y):AddCrossCells(x,y);
}
function DragActionContinuer(x,y){
	var xy=CanvasPosition(x,y,STATE);
	if(STATE.mode.edit){
		if(!STATE.mode.selection)
			STATE.mode.selection=[];
		
		if(!In(STATE.mode.selection,xy)){
			STATE.mode.selection=Union(STATE.mode.selection,[xy]);
			DrawState();
		}

	}
	//return RegionModeActive()?ContinueRegionCells(x,y):ContinueStarCrossCells(x,y);
}
function DragActionEnder(x,y){
	var xy=CanvasPosition(x,y,STATE);
	STATE.mode.dragging=false;
	if(STATE.mode.edit){
		if(STATE.mode.clearing)
			STATE.mode.selection.map(XYFruitRemove);
		else
			STATE.mode.selection.map(XYFruitAdd);

		STATE.mode.selection=[];
	}
	UpdateState()	
}

TransformLevel=function(level,CoordinateTransform){
	var newlevel={};
	Keys(level).map(k=>newlevel[k]=level[k].map(CoordinateTransform));
	return newlevel;
};

DecrementCanvasWidth	=StateUpdater({W:W=>Max(W-1,3)});
DecrementCanvasHeight	=StateUpdater({H:H=>Max(H-1,3)});
IncrementCanvasWidth	=StateUpdater({W:W=>Max(W+1,3)});
IncrementCanvasHeight	=StateUpdater({H:H=>Max(H+1,3)});

UnShiftCanvasHeight	=StateUpdater({level:level=>TransformLevel(level,xy=>[xy[0]  ,xy[1]+1])});
UnShiftCanvasWidth	=StateUpdater({level:level=>TransformLevel(level,xy=>[xy[0]+1,xy[1]  ])});
ShiftCanvasHeight	=StateUpdater({level:level=>TransformLevel(level,xy=>[xy[0]  ,xy[1]-1])});
ShiftCanvasWidth	=StateUpdater({level:level=>TransformLevel(level,xy=>[xy[0]-1,xy[1]  ])});

var KeyboardActions={
	"shift left":ShiftCanvasWidth,
	"shift up":ShiftCanvasHeight,
	"shift right":UnShiftCanvasWidth,
	"shift down":UnShiftCanvasHeight,
	"ctrl left":DecrementCanvasWidth,
	"ctrl up":IncrementCanvasHeight,
	"ctrl right":IncrementCanvasWidth,
	"ctrl down":DecrementCanvasHeight,
	
	"ctrl b":function(){STATE.visuals.monochrome=!!!STATE.visuals.monochrome;UpdateState();},
	"ctrl s":ExportSerial,
	// "left":PathGrower(-1,0),
	// "up":PathGrower(0,1),
	// "right":PathGrower(1,0),
	// "down":PathGrower(0,-1)
};

FruitSetter=function(fruit){
	KeyboardActions[FruitIcons[fruit].letter]=function(){STATE.mode.symbol=fruit}
}

Keys(FruitIcons).map(FruitSetter);


var DragActions={
	Starter:DragActionStarter,
	AltStarter:DragActionAltStarter,
	Executer:DragActionContinuer,
	Ender:DragActionEnder
}

CanvasResize=function(){
	GetElement(STATE.target).width=window.innerWidth;
	GetElement(STATE.target).height=window.innerHeight;
	DrawState();
}

InitialiseKudamono=function(){
	PreAddElement(`
		<canvas 
			id="${STATE.target}" 
			oncontextmenu="return false;" 
			width="${window.innerWidth}" 
			height="${window.innerHeight}"
		></div>`,"body");
	AttendDrag(DragActions,"canvas");
	Attend('resize',CanvasResize)
	if(PageSearch("l")||PageSearch("L")){
		STATE=SerialState(PageSearchObject(),STATE);
	}
	UpdateState();
	Keybind(KeyboardActions,STATE.target);
	ResumeCapturingKeys(CaptureComboKey);
}


function ExportSerial(){
	ClipboardCopy(PageURL(),"Copied this puzzle's URL to clipboard, for saving!")
}

if(PageSearch("W")&&PageSearch("L"))
	setTimeout(InitialiseKudamono,500)