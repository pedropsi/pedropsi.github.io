///////////////////////////////////////////////////////////////////////////////
//Kudamono Editor (c) Pedro PSI, 2021
//All rights reserved.
///////////////////////////////////////////////////////////////////////////////

var sources=["data-game-colours.js","data-game-canvas.js","data-game-undo.js"];
sources.map(LoaderInFolder("codes/game/modules"));

///////////////////////////////////////////////////////////////////////////////
//Fruits
FruitIcons={
	"apple":{
		letter:"a",
		colour:"rgb(153,0,0)",
		viewBox:"0 0 1691 1192",
		shifty:0.1,
		path:"M 482 0 C 453 67 436 174 443 248 L 449 311 L 397 284 C 303 235 168 253 103 324 C 38 394 4 523 13 665 C 20 780 40 856 87 952 C 174 1131 338 1216 445 1138 C 462 1126 467 1126 489 1141 C 530 1168 626 1163 680 1130 C 780 1071 868 952 917 808 C 942 735 945 714 945 592 C 945 472 942 451 922 407 C 898 355 859 308 825 289 C 754 251 631 252 563 292 C 545 302 530 307 530 303 C 530 298 551 282 577 267 C 679 206 800 51 800 -21 L 800 -49 L 768 -32 C 708 -2 632 61 599 108 L 565 154 L 555 80 C 547 19 521 -48 506 -48 C 504 -48 493 -27 482 0 Z",
		rule:{
			minconnected:2,
			shape:"symmetries"
		}
	},
	"pear":{
		letter:"p",
		colour:"rgb(102,153,0)",
		viewBox:"0 0 120 120",
		shifty:0.2,
		path:"M 26 5 L 28 4 L 34 20 Q 42 18 48 42 Q 57 44 63 67 Q 68 101 31 99 Q 4 95 7 63 Q 13 35 24 24 Q 26 21 31 19 Q 16 16 13 2 Q 23 4 31 18 L 26 5 Z",
		rule:{
			minconnected:2,
			mintracks:2,
			shape:"translations"
		}
	},
	"blueberry":{
		letter:"b",
		colour:"rgb(0,0,153)",
		viewBox:"0 0 1669 1100",
		path:"M 641 1062 L 645 1025 L 591 1020 C 490 1009 411 938 393 839 L 386 800 L 374 830 C 346 896 251 939 187 914 C 161 904 159 906 151 936 C 143 966 142 967 135 945 C 129 926 123 923 99 928 C 72 934 70 932 67 897 C 64 864 60 858 32 851 L 0 843 L 19 810 C 33 788 39 760 39 718 C 39 615 101 543 189 543 L 224 543 L 191 517 C 103 447 76 316 132 221 C 147 195 173 164 190 152 L 220 131 L 193 102 L 165 73 L 207 73 C 247 73 249 72 249 43 C 249 26 252 13 256 13 C 259 13 282 25 307 39 L 351 65 L 384 33 L 418 0 L 442 55 C 461 98 476 115 512 137 C 561 165 601 210 619 257 C 630 286 630 286 644 266 C 661 241 718 213 751 213 C 764 213 792 222 814 234 C 851 254 853 254 866 237 C 878 220 879 220 879 240 C 879 252 887 263 899 266 C 917 271 918 275 909 299 C 899 323 901 329 919 343 L 940 359 L 914 373 C 900 381 880 406 869 430 C 826 527 703 541 644 456 L 620 420 L 606 455 C 576 526 472 583 372 583 L 330 583 L 354 618 C 367 638 383 670 390 690 L 401 725 L 419 686 C 456 602 545 543 644 536 C 695 532 712 535 759 560 C 837 600 874 662 874 752 C 874 793 867 831 856 853 C 841 884 841 894 853 940 L 867 992 L 822 995 C 779 998 776 1000 761 1038 C 741 1090 742 1089 721 1070 C 697 1048 690 1049 661 1076 L 637 1098 L 641 1062 Z",
		rule:{
			minconnectable:2,
			maxconnected:1
		}
	},
	"cherry":{
		letter:"c",
		colour:"rgb(204,0,0)",
		viewBox:"0 0 1520 1002",
		shifty:0.1,
		path:"M 526 17 L 497 30 L 499 125 C 503 296 454 446 366 541 L 320 590 L 274 575 C 184 545 76 594 28 686 C -4 746 -3 843 31 903 C 81 994 177 1038 271 1013 C 331 997 404 924 420 863 C 436 805 427 721 401 685 L 381 656 L 431 603 C 513 515 571 375 586 226 C 593 164 593 163 612 180 C 647 212 720 330 745 396 C 758 432 771 485 772 515 L 775 568 L 740 566 C 641 559 555 610 514 697 C 471 789 491 893 564 961 C 658 1048 779 1041 862 944 C 928 867 936 764 884 675 C 864 641 859 622 864 595 C 872 541 853 431 822 349 C 784 253 730 172 648 90 C 611 53 580 18 580 13 C 580 0 562 2 526 17 Z",
		rule:{
			mayloop:false,
			minconnected:2,
			maxconnected:2
		}
	},
	"melon":{
		letter:"m",
		colour:"rgb(56,87,35)",
		viewBox:"0 0 2000 1500",
		shiftx:0.1,
		shifty:0.2,
		path:"M 523 -50 C 502 -23 451 31 409 71 C 346 130 315 151 239 184 C 187 207 116 234 81 244 C 46 254 15 264 13 266 C 10 270 29 362 34 370 C 35 371 113 352 207 329 L 379 286 L 398 307 C 408 318 433 351 453 379 L 489 430 L 435 483 C 376 542 315 648 284 748 C 259 828 259 1004 283 1084 C 312 1177 359 1251 435 1327 C 553 1442 683 1496 842 1495 C 1121 1494 1313 1348 1405 1066 C 1445 943 1419 750 1345 627 C 1278 514 1238 474 1122 405 C 986 325 771 309 609 368 C 585 377 558 386 550 389 C 540 392 517 368 483 321 L 432 249 L 541 107 L 650 -35 L 617 -59 C 563 -100 563 -100 523 -50 Z",
		rule:{
			mustloop:true,
			minconnected:2
		}
	},
	"grape":{
		letter:"g",
		colour:"rgb(102,0,102)",
		viewBox:"0 0 1600 1600",
		shifty:0.1,
		path:"M 372 -181 C 364 -169 360 -159 362 -157 C 364 -156 407 -129 458 -98 C 508 -66 550 -37 550 -31 C 550 -18 520 10 464 49 C 425 76 405 83 368 83 C 312 83 277 111 255 174 C 246 203 236 214 218 216 C 178 221 153 239 129 282 C 109 316 105 336 107 394 C 108 460 106 467 84 479 C 0 523 -14 706 60 780 C 79 798 99 808 119 808 C 143 808 152 814 165 843 C 174 862 188 882 196 889 C 206 897 208 915 204 957 C 196 1029 214 1093 251 1131 C 276 1155 287 1159 320 1156 C 357 1153 360 1154 376 1193 C 385 1215 395 1255 396 1283 C 401 1352 437 1418 482 1443 C 519 1462 520 1463 554 1444 C 574 1433 596 1410 606 1389 C 624 1351 630 1271 618 1227 C 611 1203 612 1202 640 1206 C 706 1216 760 1140 760 1039 C 760 997 766 969 780 945 C 820 878 815 771 768 705 C 749 679 749 676 765 633 C 785 581 782 499 758 452 C 750 434 746 414 750 407 C 769 373 771 307 756 255 C 731 169 672 131 612 162 C 595 171 576 186 571 195 C 563 208 561 190 560 127 L 560 42 L 622 -41 C 681 -121 683 -125 665 -138 C 647 -151 643 -149 614 -115 L 583 -78 L 504 -127 C 461 -154 416 -181 405 -189 C 387 -200 383 -199 372 -181 Z M 498 209 C 478 222 476 221 459 173 L 442 128 L 474 103 L 505 78 L 508 140 C 510 182 507 204 498 209 Z",
		rule:{
			mayloop:false,
			minconnected:"all"
		}
	},
	"orange":{
		letter:"o",
		colour:"rgb(255,122,31)",
		viewBox:"-5 -5 40 40",
		path:"M 4 26 Q 7 30 15 30 Q 28 29 30 15 Q 30 5 26 4 Q 25 0 15 0 Q 1 1 0 15 Q 0 23 4 26 Z",
		rule:{
			maxconnected:1,
			maxconnectable:1
		}
	},
	"lemon":{
		letter:"l",
		colour:"rgb(255,192,0)",
		viewBox:"-15 -15 45 45",
		path:"M 0 30 Q 3 31 5 30 Q 28 30 30 7 Q 32 3 30 0 Q 27 -2 23 0 Q 0 2 0 25 Q -1 28 0 30 Z",
		rule:{
			maxconnected:1
		}
	}
}

///////////////////////////////////////////////////////////////////////////////
//Path segments
//A track is a set of segments. A segment is a pair of points (x,y).

OrthoXY=function(xy){
	var dir=xy;
	if(Abs(dir[0])>=Abs(dir[1])){
		dir[0]=Sign(dir[0])
		dir[1]=0;
	}else{
		dir[1]=Sign(dir[1])
		dir[0]=0;
	}
	return dir;
}

OrthonormalXYDir=function(xyza){
	var xy=Round(xyza[0],0);
	var dir=VectorMinus(xy,Round(xyza[1],0));
		dir=OrthoXY(dir);
	if(dir[0]<0||dir[0]===0&&dir[1]<0)
		return [za,VectorMinus(za,dir)]
	else
		return [xy,VectorPlus(xy,dir)];
}

PathTrack=function(path){
	var track=Rest(path).map((xy,i)=>[path[i],xy]);
	return SortTrack(track);
}


SortTrack=function(track){
	function Switcher(segmin,segment){
		return segmin[0]>segment[0]||(segmin[0]===segment[0]&&segmin[1]>segment[1])}
	return CycleSort(track.map(segment=>segment.sort()),Switcher)
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

SegmentTrackContained=function(segment,track){
	return In(track,segment)||In(track,Reverse(segment));
}

SegmentPoints=function(segment,points){
	//return [segment[0],segment[1]]
	return segment;
}

TrackPoints=function(track){
	return Union(Join(...track.map(SegmentPoints)));
}

// SegmentTrackTouched=function(segment,track){
// 	return SegmentContiguousTrackSegments(segment,track).length>0;
// }

DeletePointTrack=function(point,track){
	return track.filter(seg=>!PointSegmentContained(point,seg));
}

DeleteSegmentTrack=function(segment,track){
	return track.filter(seg=>!In([segment,Reverse(segment)],seg));
}

SegmentContiguousTrackSegments=function(segment,track){
	var intrack=DeleteSegmentTrack(segment,track);
	return Join(...SegmentPoints(segment).map(point=>PointContiguousTrackSegments(point,intrack)))
}

PointContiguousTrackSegments=function(point,track){
	return track.filter(seg=>In(SegmentPoints(seg),point));
}

TrackEndsegments=function(track){
	var endsegments=track.filter(endsegment=>
		SegmentPoints(endsegment).some(
			point=>(PointContiguousTrackSegments(point,DeleteSegmentTrack(endsegment,track)).length===0)
		));
	return endsegments;
}

TrackEndpoints=function(track){
	var endsegments=TrackEndsegments(track);
	if(!endsegments.length)
		return [];
	else
		return Join(...endsegments).filter(xy=>track.filter(segment=>In(segment,xy)).length===1);
}

TrackBranchpoints=function(track){
	return TrackPoints(track).filter(point=>PointContiguousTrackSegments(point,track).length>=3);
}

TrackLooped=function(track){
	return track.length>0&&TrackEndpoints(track).length===0&&TrackBranchpoints(track).length===0;
}

TrackBranched=function(track){
	return TrackBranchpoints(track).length>0;
}

TrackStartPoint=function(track){
	var endpoints=TrackEndpoints(track);
	return First(endpoints)||First(First(track));
}

SplitContiguousTracks=function(segments,state){
	if(!segments.length)
		return [];
	var segments=CanonicalSegments(segments,state);
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
	return contiguoustracks.map(track=>CanonicalSegments(track,state));
}

LinearTracks=function(contiguouscanonicalsegments){
	var segments=contiguouscanonicalsegments;
	if(!segments.length)
		return [];

	var track=[];
	var lineartracks=[];
	var segment=First(segments);
	while(segment&&segments.length){
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
			segment=First(segments);
		}
		else{
			segment=First(next);
		}

	}
	return lineartracks;
}


CanonicalContiguousTrack=function(track,Posit){
	var endsegments=TrackEndsegments(track);
	var endpoints=TrackEndpoints(track);

	if(!endpoints.length)	//a loop
		endpoints=track.map(First);

	startpoint=First(Sort(endpoints,Posit));

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
	return In(Values(DirectionsCoordinates),VectorMinus(segment[0],segment[1]))&&SegmentPoints(segment).every(point=>PointValid(point,state));
}


///////////////////////////////////////////////////////////////////////////////
//Draw
//draws the board


TrackFruits=function(track,state){
	return Keys(state.level).filter(fruit=>state.level[fruit].some(
		point=>track.some(segment=>In(segment,point))));
}

TrackStyleOpts=function(track,state,Opts){
	var fruits=TrackFruits(track,state);
	var s=Opts.lineScale||1;
	var dash=[1,1];

	var lineCap="round";
	if(TrackLooped(track))
		lineCap="square";

	if(TrackBranched(track))
		dash=[1,20];
	
	var colour;
	if(fruits.length<1)
		colour=state.line.deficitColour;
	else if(fruits.length>1)
		colour=state.line.excessColour;
	else
		colour=FruitIcons[First(fruits)].colour;

	
	return {
		strokeColor:CompelRGBA(colour,0.5),
		dash:dash,
		lineCap:lineCap,
		lineWidth:5*s,
	}

}

DrawTrack=function(track,state,Opts){
	var trackStyleOpts=TrackStyleOpts(track,state,Opts);
	track.filter(segment=>SegmentValid(segment,state)).map(segment=>DrawSegment({
		px0:segment[0][0],
		px1:segment[1][0],
		py0:segment[0][1],
		py1:segment[1][1],
		cols:state.W,
		rows:state.H,
		...trackStyleOpts
	},state))
}

DrawSegment=function(opts,state){
	var gridOpts={
		...state.grid,
		rows:state.H,
		cols:state.W
	}
	DrawGridLine({
		...gridOpts,
		...opts
	})
}


PointValid=function(xy,state){
	return PositionValid(xy[0],xy[1],state);
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
	Opts.shiftx+=Opts.nudge;
	Opts.shifty+=Opts.nudge;
	
	DrawSVG(Opts);
}

DrawFruits=function(type,coordinates,Opts){
	var Opts=Opts||{};
	coordinates.map(xy=>DrawFruit({...Opts,type:type,px:xy[0],py:xy[1]},STATE));

}

DrawLevel=function(state){
	var types=Keys(state.level);
	types.map(fruit=>DrawFruits(fruit,state.level[fruit]));

	if(state.mode.edit)
		if(state.mode.clearing)
			DrawFruits(state.mode.symbol,state.mode.selection,{colour:HEXLightener(0.9)});
		else
			DrawFruits(state.mode.symbol,state.mode.selection,{colour:HEXDarkener(0.8)});
}

///////////////////////////////////////////////////////////////////////////////
//Serials
//serials represent the state of the board as an URL, compact and exactly

ExportSerial=function(){
	ClipboardCopy(PageURL(),"Copied this puzzle's URL to clipboard, for saving!")
}

FruitLetter=function(fruit){
	return FruitIcons[fruit].letter.toLowerCase();
}


Linearise=function(xy,W){
	return xy[0]+xy[1]*(W+1);
}

SegmentLineariser=function(W){
	return function(segment){
		return Linearise(First(CanonicalSegment(segment,W)),W);
	}
}

CanonicalSegment=function(segment,W){
	var a=Linearise(First(segment),W);
	var b=Linearise(Last(segment),W);
	if(a<b)
		return segment;
	else if(a>b)
		return Reverse(segment);
	else{
		console.log("error: degenerate segment",segment,W);
		return segment;
	}	
}

CanonicalSegments=function(segments,state){
	var segments=segments.filter(seg=>SegmentValid(seg,state));
	segments=segments.map(seg=>CanonicalSegment(seg,state.W));
	segments=Unique(segments);
	segments=Sort(segments,SegmentLineariser(state.W));
	return segments;
}




UnLinearise=function(n,W){
	return [n%W,Floor(n/W)]
}

LevelSerial=function(state){
	var xyfruits=Keys(state.level).map(fruit=>state.level[fruit].map(xy=>[xy[0],xy[1],FruitLetter(fruit)]));
		xyfruits=Join(...xyfruits);
		xyfruits=xyfruits.filter(fxy=>PointValid(fxy,state));

	var	fruitsxys=xyfruits.map(fxy=>[fxy[2],Linearise(fxy,(state.W))]);
		fruitsxys=Sort(fruitsxys,Last);
		fruitsxys=Join([["",0]],fruitsxys);
		fruitsxys=Rest(fruitsxys).map((p,i)=>p[0]+(p[1]-fruitsxys[i][1]));
	
	return fruitsxys.join("");
}

FruitSerialPattern=/(\w)(\d+)/g;

LetterFruit=function(l){
	var fruits=Keys(FruitIcons).filter(fruit=>FruitIcons[fruit].letter===l);
	if(fruits.length)
		return First(fruits);
}

AccumulateTokenCoords=function(tokendiffs,W){
	var differences=tokendiffs.map(Last);
	var accumulated=tokendiffs.map((td,i)=>[td[0],Apply(Plus,Take(differences,i+1))]);
	return accumulated.map(td=>[td[0],UnLinearise(td[1],W)]);
}



SerialLevel=function(serial,state){
	var fruitserials=serial.match(FruitSerialPattern);
	var fruitdiffs=fruitserials.map(s=>[s[0],Number(Rest(s))]);
	var accumulated=AccumulateTokenCoords(fruitdiffs,state.W+1);
	var level={};
	Keys(FruitIcons).map(fruit=>(level[fruit]=accumulated.filter(a=>a[0]===FruitLetter(fruit)).map(Last)));
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
	return PathTrack(coordinates);
}

SerialSegments=function(serial,state){
	var pathserials=serial.match(PathSerialPattern);
	var pathdiffs=pathserials.map(s=>[First(s.match(/\D+/ig)),Number(First(s.match(/\d+/ig)))]);
	var accumulated=AccumulateTokenCoords(pathdiffs,state.W+1);
	var tracks=accumulated.map(lp=>LetterContiguousPath(lp[0],lp[1]));
	return Join(...tracks);
}


PathsSerial=function(state){
	var lineartracksets=STATE.tracks.map(LinearTracks);
	var	lineartracks=Join(...lineartracksets);
	var W=state.W;
	var pointtracks=lineartracks.map(track=>[SegmentLineariser(W)(First(track)),track]);
		pointtracks=Sort(pointtracks,First);
	var differences=[0].concat(pointtracks.map(First));
		pointtracks=pointtracks.map((pt,i)=>[pt[0]-differences[i],pt[1]]);
	var serials=pointtracks.map(PointTrackSerial);
		return serials.join("");
}

PointTrackSerial=function(pointtrack){
	return String(pointtrack[0])+TrackDirectionSerial(pointtrack[1]);
}

TrackDirectionSerial=function(track){
	if(!track.length)
		return "";

	var directions;
	if(track.length<2){
		directions=[SegmentSingleDirection(First(track))]
	}else{
		directions=Rest(track).map(function(segment,i){
			var dir=SegmentPairNextDirection(track[i],segment);
			console.log(dir,track[i],segment);
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

SegmentSingleDirection=function(segment){
	var diff=VectorMinus(segment[1],segment[2])
	return OrthoXY(diff);
}

DirectionCode=function(direction){
	return Accesser(CoordinatesDirections)(String(direction));
}

SerialState=function(serialObj,state){
	var state={...state};
	var serialObj=ReKeyObject(serialObj,LowerCase);
		state.W=Number(serialObj.w||serialObj.h);
		state.H=Number(serialObj.h||serialObj.w);
		state.level=SerialLevel(serialObj.l,state);
		if(serialObj.s)
			state.segments=SerialSegments(serialObj.s,state)
	return state;
}

StateSerial=function(state){
	var Opts={};
		Opts.W=state.W;
	if(state.H!==state.W)
		Opts.H=state.H;
		Opts.L=LevelSerial(state);
		//Opts.S=PathsSerial(state);
	return ParameterString(Opts);
}


///////////////////////////////////////////////////////////////////////////////
//State
//a friendly representation of the board state.
//The source of truth: updating STATE must update everything.


ObtainStartingLevelState=function(){
	return {
		//visuals
		target:"kudamono-canvas",
		visuals:{
			monochrome:false
		},
		line:{
			opacity:0.5,
			lineWidth:10,
			cap:"round",
			corners:"round",
			colour:"rgba(155,155,155,0.5)",		//default line colour
			excessColour:"#000000",				//path colour, too many fruit
			deficitColour:"#CCCCCC" 			//path colour, zero		fruit
		},
		grid:{
			strokeColor:"#BBBBBB",				//grid lines
			fillColor:"#FFFFFF",				//background
			lineWidth:2,						//width   of grid lines
			dash:[6,12],						//dashing of grid lines
			width:1200,							
			height:1200,						
			border:0.5,							//how many squares to add to the border (to each of the shortest sides)
			scale:0.75,							//fruit scale (how large)
			nudge:0.2							//fruit nudge (small adjustments to position)
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
		segments:[
			// [[0,0],[0,1]],
			// [[0,1],[1,1]],
			// [[2,2],[2,1]],
			// [[2,1],[2,0]],
			// [[2,0],[3,0]],
			// [[4,1],[4,2]],
			// [[4,2],[4,3]],
			// [[4,3],[4,4]],
			// [[0,3],[0,4]],
			// [[0,3],[1,3]],
			// [[1,4],[0,4]],
			// [[1,3],[1,4]]
		],
		tracks:[],
		crosses:{},

		//Interaction
		mode:{
			edit:false,			//true:adding fruits, false:solving
			dragging:false,		//whether dragging
			clearing:false,		//whether clearing fruits, lines, etc...
			symbol:"cherry",	//current fruit to be added
			line:false,			//whether adding lines,
			fruitline:false,	//which fruit the path connects to (defaults to none)
			selection:[],		//current points selected (accumulates)
			error:false			//whether to display errors
		}
	}
}

STATE=ObtainStartingLevelState()



///////////////////////////////////////////////////////////////////////////////
//Interactive UI (for quick iteration)

DrawStateGrid=function(state){
	var gridOpts={
		...state.grid,
		rows:state.H,
		cols:state.W
	}
	DrawSquaresGrid(gridOpts);
}

DrawStatePaths=function(state){
	var tracks=state.tracks;
	var Opts=Extremes(state);
	
	if(!state.mode.edit&&state.mode.selection.length>1){
		var seltrack=PathTrack(state.mode.selection);
		if(state.mode.clearing)
			DrawTrack(seltrack,STATE,{colour:HEXLightener(0.9),dash:[1,20]});//not working?
		else
			DrawTrack(seltrack,STATE,{colour:HEXDarkener(0.9)});
	}
	tracks.map(track=>DrawTrack(track,STATE,Opts));

}

DrawState=function(){
	UnDraw();
	DrawStateGrid(STATE);
	DrawStatePaths(STATE);
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
	STATE.tracks=SplitContiguousTracks(STATE.segments,STATE);
	DrawState();
	AddUndo(STATE);
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

Extremes=function(state){
	return GridExtremes({
		rows:state.H,
		cols:state.W,
		target:state.target
	});
}

CanvasPosition=function(x,y,state){
	var extremes=Extremes(state);
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

	if(!PointValid(xy,STATE))
		return;

	XYFruitRemove(xy);

	var overfruit=STATE.mode.symbol;
	if(!STATE.level[overfruit])
		STATE.level[overfruit]=[];

	STATE.level[overfruit].push(xy);
	STATE.level[overfruit]=STATE.level[overfruit].sort();
}

XYSegments=function(xy,state){
	var segments=state.segments.filter(s=>In(s,xy));
	return segments;
}

XYSegmentAdd=function(segment){
	if(!SegmentValid(segment,STATE))
		return;
	var segment=CanonicalSegment(segment,STATE.W);
	if(!In(STATE.segments,segment))
		STATE.segments.push(segment);
}

XYSegmentRemove=function(segment){
	if(!SegmentValid(segment,STATE))
		return;
	var segment=CanonicalSegment(segment,STATE.W);
	STATE.segments=Remove(STATE.segments,segment);
}





TrackAdd=function(track){
	return track.map(SegmentAdd);
}

SegmentAdd=function(segment){
	var segment1=OrthonormalXYDir(segment);
	var segment2=OrthonormalXYDir(Reverse(segment));
	var xy=segment1[0];
	var za=segment1[1];

	var tracks=STATE.paths.map(PathTrack);
	
	var extendable=tracks.filter(track=>track.some(segment=>In(segment,xy)||In(segment,za)));
	if(!extendable.length)
		STATE.paths.push(segment1);
	else if(extendable.length===1){
		var exttrack=First(extendable);
		
		//already there
		if(In(exttrack,segment1)||In(exttrack,segment2))
			return;
		
		//branching
		else if(exttrack.filter(segment=>In(segment,xy).length===2||exttrack.filter(segment=>In(segment,za).length===2)))
			return STATE.paths.push(segment1);
		
		//looping or extending
		else if(exttrack.filter(segment=>In(segment,xy).length===1||exttrack.filter(segment=>In(segment,za).length===1))){
			var i=tracks.findIndex(track=>Equal(track,exttrack));
			var path=STATE.paths[i];
			var sta=First(path);
			var end=Last(path);
			if(Equal(end,xy))
				return path.push(za);
			else if(Equal(end,za))
				return path.push(xy);
			if(Equal(sta,xy))
				return path.unshift(za);
			else if(Equal(sta,za))
				return path.unshift(xy);

		}
	}
	else{ //many possibilities -> rebuild
			
	}
}



function DragActionStarter(x,y){
	var xy=CanvasPosition(x,y,STATE);
	if(!PointValid(xy,STATE))
		return;//TODO OTHER OPTIONS
	STATE.mode.symbol=XYFruit(xy,STATE)||STATE.mode.symbol;
	STATE.mode.dragging=true;
	STATE.mode.selection=[xy];
	if(STATE.mode.edit){
		STATE.mode.clearing=!!XYFruit(xy,STATE);
		DrawState();
	}


}
function DragActionAltStarter(x,y){
	//return 	RegionModeActive()?PickRegionCells(x,y):AddCrossCells(x,y);
}
function DragActionContinuer(x,y){
	var xy=CanvasPosition(x,y,STATE);
	if(!PointValid(xy,STATE))
		return;
	if(!STATE.mode.selection)
		STATE.mode.selection=[];
	if(!In(STATE.mode.selection,xy)){
		STATE.mode.selection=AddOnce(STATE.mode.selection,xy);
		DrawState();
	}

}
function DragActionEnder(x,y){
	STATE.mode.dragging=false;
	if(STATE.mode.edit){
		if(STATE.mode.clearing)
			STATE.mode.selection.map(XYFruitRemove);
		else
			STATE.mode.selection.map(XYFruitAdd);
	}
	else {
		
		var selected=STATE.mode.selection;
	
		STATE.mode.clearing=selected.length<2||Intersection(XYSegments(selected[0],STATE),XYSegments(selected[1],STATE)).length>=1;

		var segments=PathTrack(STATE.mode.selection);

		if(STATE.mode.clearing)
			segments.map(XYSegmentRemove);
		else
			segments.map(XYSegmentAdd);
	}
	STATE.mode.selection=[];
	UpdateState()	
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
	
	"ctrl b":function(){STATE.visuals.monochrome=!!!STATE.visuals.monochrome;UpdateState();},
	"ctrl s":ExportSerial,

	"space":function(){STATE.mode.edit=!STATE.mode.edit;UpdateState();},

	"ctrl r":function(){STATE.segments=[];UpdateState();},
	"ctrl shift r":function(){STATE.level={};UpdateState();},
	"ctrl alt r":function(){STATE.level={};STATE.segments=[];UpdateState();},

	// "left":PathGrower(-1,0),
	// "up":PathGrower(0,1),
	// "right":PathGrower(1,0),
	// "down":PathGrower(0,-1)

	"ctrl z":function(){Undo()}
};

var ClearBoard=StateUpdater({segments:segments=>[],level:level=>{}});
var ClearSegments=StateUpdater({segments:segments=>[]});
var ClearFruit=StateUpdater({level:level=>{}});

FruitSetter=function(fruit){
	KeyboardActions[FruitIcons[fruit].letter]=function(){
		STATE.mode.edit=true;
		STATE.mode.symbol=fruit
	}
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
	ResumeCapturingKeys(ComboKeyPressHandler);
	setTimeout(()=>FocusElement(STATE.target),500)
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
// 	MarkWrongRegions();T
// }

// function UnMarkErrors(){
// 	UnMarkWrongAdjacencies();
// 	UnMarkWrongLines();
// 	UnMarkWrongRegions();
// }

if(PageSearch("W")&&PageSearch("L"))
	setTimeout(InitialiseKudamono,500)