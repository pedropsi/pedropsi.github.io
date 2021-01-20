///////////////////////////////////////////////////////////////////////////////
//Kudamono Editor (c) Pedro PSI, 2021
//All rights reserved.
///////////////////////////////////////////////////////////////////////////////

var sources=["data-game-colours.js","data-game-canvas.js","data-game-undo.js"];
sources.map(LoaderInFolder("codes/game/modules"));

/*
	etc:"W=8&L=g0d1o1a3q1q1d5q3q1q1d2d1l4q2g1c1o2q4g3c1a1c2g4c3m9p4b1m2p4p2p1g1m1m1b1p2p1&S=0DDDDRDLDDD1DDRR3UR2URDRDLLLDDRRURUDL7DDDL15RD13DLL14URRDLDLU6DR7DR",
	etc2:"W=35&H=23&L=b37a43b67g1a4c2o3l4p3m3c210a32b25b1g3a5c5q150l21m10o24l1p6m8d2&S=37DDD2DLDRD1DDDRRUUU3RRDDDLL3URRDDD3URDRURDDD4URRDDDLLUU3URDDDRUUU3URRDDDLLUU20RDL3DD3DD7DD161URDDRURURDDLDLLDDLUUUU5URDDDDRRUUUURDDDDDLLLLUUUU5URRRRDDDDDLLLLURUUUL5URRRRDDDDDLULLDLUUUU6URDDDDDDDDDLUUUUUUUU27URDDDLUU4URRDDLLU94URRDLL70URRDRURDDDDDLULULDDLUUUU5URRRRDDDDDLLLLUUUU5URDRDRUURDDDDDLULULDDLUUUU5URRRRDDDDDLLLLUUUU27URRDDDLLUU10URRDDDLLUU113URDL",
	etc3:"W=24&H=13&L=d16d5o1b1d11d10g3g2d11g15g2a10c1c2a1a25a2o2q12q28l15o1l27k13l12k1k2k13p15p12p15p12m3m26o3b1&S=16DDDRDRUU3DD3RRRRRRR1RRRRRRRRRRRRRRRRRRRRRR10D13R1DDRRUU40RRDDDDLL1DD44DD28UULLDDRRDD15UUURRURRD1RRRRRRRRRRR24DDD16URRDDLLU43UUR27UUR14URRDDLLU"
*/

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
			loopallowed:true,
			minconnected:2,
			shape:"symmetries",
			description:"Every Apple belongs to a mirror or rotationally symmetric path.",
			depiction:"W=2&L=a1a2a4a1&S=1DRD2DR"
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
			commonForm:"UnTranslateTrack",
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
			maxconnected:1,
			description:"Every Blueberry is connectable with at least one other (as if a path were drawn).",
			depiction:"W=2&L=b0b6b2&S=1DD"
		}
	},
	"cherry":{
		letter:"c",
		colour:"rgb(204,0,0)",
		viewBox:"0 0 1520 1002",
		shifty:0.1,
		path:"M 526 17 L 497 30 L 499 125 C 503 296 454 446 366 541 L 320 590 L 274 575 C 184 545 76 594 28 686 C -4 746 -3 843 31 903 C 81 994 177 1038 271 1013 C 331 997 404 924 420 863 C 436 805 427 721 401 685 L 381 656 L 431 603 C 513 515 571 375 586 226 C 593 164 593 163 612 180 C 647 212 720 330 745 396 C 758 432 771 485 772 515 L 775 568 L 740 566 C 641 559 555 610 514 697 C 471 789 491 893 564 961 C 658 1048 779 1041 862 944 C 928 867 936 764 884 675 C 864 641 859 622 864 595 C 872 541 853 431 822 349 C 784 253 730 172 648 90 C 611 53 580 18 580 13 C 580 0 562 2 526 17 Z",
		rule:{
			minconnected:2,
			maxconnected:2,
			description:"Cherries connect only in pairs (not in a loop).",
			depiction:"W=2&L=c0c2c4c2&S=0RR6RR"
		}
	},
	"coconut":{
		letter:"q",
		colour:"rgb(108,82,0)",
		viewBox:"0 0 700 700",
		path:"M 172 3 C 74 22 2 105 2 199 C 3 228 11 263 19 263 C 21 263 27 267 32 272 C 38 278 40 279 40 276 C 40 260 64 255 76 269 C 94 291 70 315 48 297 C 40 291 40 291 40 297 C 40 304 49 311 58 311 C 65 311 80 325 80 332 C 80 336 108 349 131 355 C 236 381 357 314 386 213 C 392 191 401 111 397 108 C 396 106 394 98 394 90 C 394 79 393 74 389 71 C 385 68 383 64 383 62 C 383 59 379 55 375 53 C 370 51 366 46 365 43 C 364 40 361 37 358 37 C 355 37 349 34 344 31 C 336 25 298 14 249 4 C 225 -0 191 -1 172 3",
		rule:{
			loopallowed:true,
			minconnected:2,
			shapesatsymbol:["LUR","URD","RDL","DLU"],
			description:"Paths branch, as T-junctions, only at every Coconut. No branch returns to its origin.",
			depiction:"W=2&L=q3q2&S=1URDRDDLLU3D",//TODO

			branchallowed:true,
			branchspawns:1,
			branchloop:false
		}
	},
	"date":{
		letter:"d",
		colour:"rgb(92,0,0)",
		viewBox:"0 0 800 1000",
		shiftx:-0.1,
		path:"M 186 11 C 173 22 172 24 174 42 L 176 62 L 148 67 C 58 82 0 117 0 155 C 0 200 62 205 144 166 C 173 152 175 151 180 159 C 185 166 183 167 159 175 C 59 209 1 261 21 299 C 33 320 74 326 105 310 C 117 303 117 304 97 329 C 29 414 76 489 153 418 C 161 410 164 409 166 413 C 186 481 205 511 233 516 C 288 526 293 452 244 347 L 228 313 L 258 344 C 304 393 344 406 365 381 C 391 351 358 293 278 230 L 263 219 L 290 231 C 351 260 397 246 389 201 C 383 171 323 131 253 109 C 237 104 223 98 222 94 C 219 87 220 87 239 95 C 350 141 440 110 380 45 C 349 12 213 -12 186 11",
		rule:{
			minconnected:Infinity,
			shapesatsymbol:["L","U","R","D"],
			shapesnosymbol:["LR","UD","LUR","URD","RDL","DLU"],
			description:"The first two Dates connect via a straight line. Non-endpoints may spawn up to one straight branch ending at a Date.",
			depiction:"W=2&L=d1d4d1d2&S=1RDRUD",//TODO

			branchallowed:true,
			branchstraight:true
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
			loopallowed:true,
			looprequired:true,
			minconnected:2,
			description:"Melons belong to closed loops (over 1 melon per loop).",
			depiction:"W=2&L=c0c2c4c2&S=0RR6RR"
		}
	},
	"grape":{
		letter:"g",
		colour:"rgb(102,0,102)",
		viewBox:"0 0 1600 1600",
		shifty:0.1,
		path:"M 372 -181 C 364 -169 360 -159 362 -157 C 364 -156 407 -129 458 -98 C 508 -66 550 -37 550 -31 C 550 -18 520 10 464 49 C 425 76 405 83 368 83 C 312 83 277 111 255 174 C 246 203 236 214 218 216 C 178 221 153 239 129 282 C 109 316 105 336 107 394 C 108 460 106 467 84 479 C 0 523 -14 706 60 780 C 79 798 99 808 119 808 C 143 808 152 814 165 843 C 174 862 188 882 196 889 C 206 897 208 915 204 957 C 196 1029 214 1093 251 1131 C 276 1155 287 1159 320 1156 C 357 1153 360 1154 376 1193 C 385 1215 395 1255 396 1283 C 401 1352 437 1418 482 1443 C 519 1462 520 1463 554 1444 C 574 1433 596 1410 606 1389 C 624 1351 630 1271 618 1227 C 611 1203 612 1202 640 1206 C 706 1216 760 1140 760 1039 C 760 997 766 969 780 945 C 820 878 815 771 768 705 C 749 679 749 676 765 633 C 785 581 782 499 758 452 C 750 434 746 414 750 407 C 769 373 771 307 756 255 C 731 169 672 131 612 162 C 595 171 576 186 571 195 C 563 208 561 190 560 127 L 560 42 L 622 -41 C 681 -121 683 -125 665 -138 C 647 -151 643 -149 614 -115 L 583 -78 L 504 -127 C 461 -154 416 -181 405 -189 C 387 -200 383 -199 372 -181 Z M 498 209 C 478 222 476 221 459 173 L 442 128 L 474 103 L 505 78 L 508 140 C 510 182 507 204 498 209 Z",
		rule:{
			minconnected:Infinity,
			description:"All Grapes are connected by a single path (not a loop).",
			depiction:"W=2&L=c0c2c4c2&S=0RR6RR"
		}
	},
	"blackberry":{
		letter:"k",
		colour:"rgb(0,0,66)",
		viewBox:"0 0 500 500",
		path:"M 108 2 C 95 6 85 19 85 33 C 69 29 47 38 49 60 C 22 55 5 90 18 109 C 1 125 -5 151 9 169 C 0 182 -1 198 11 210 C -2 232 18 257 38 253 C 42 280 77 293 102 272 C 120 295 158 279 151 260 C 175 271 185 255 184 245 C 207 246 210 228 211 222 C 219 220 218 222 215 226 C 212 228 209 233 210 247 C 192 245 189 281 206 286 C 198 313 219 328 234 319 C 235 341 253 345 261 336 C 263 349 295 353 298 339 C 310 348 331 344 333 331 C 340 341 360 332 357 320 C 363 328 379 325 372 312 C 378 318 391 306 384 295 C 399 294 407 282 393 266 C 412 259 399 225 384 226 C 393 208 373 189 359 196 C 364 189 354 172 337 182 C 340 162 311 160 306 172 C 297 157 278 160 274 171 C 255 154 246 175 245 171 C 264 152 263 123 237 116 C 249 100 232 80 221 79 C 219 60 210 51 194 46 C 196 29 173 3 149 16 C 147 18 145 16 140 11 C 137 7 132 4 130 3 C 121 0 113 0 108 2",
		rule:{
			loopallowed:true,
			looprequired:true,
			minconnected:2,
			shapesatsymbol:["LR","UD"],
			shapesnosymbol:["LU","UR","RD","DL"],
			description:"Paths cross Blackberries straight and always turn elsewhere.",
			depiction:"W=2&L=k3k4&S=1URRDDLUL"
		}
	},
	"lemon":{
		letter:"l",
		colour:"rgb(255,192,0)",
		viewBox:"-15 -15 45 45",
		path:"M 0 30 Q 3 31 5 30 Q 28 30 30 7 Q 32 3 30 0 Q 27 -2 23 0 Q 0 2 0 25 Q -1 28 0 30 Z",
		rule:{
			crossforbidden:true,
			maxconnected:1,
			description:"No path passes through a Lemon.",
			depiction:"L=l4&S=3RR"
		}
	},
	"orange":{
		letter:"o",
		colour:"rgb(255,122,31)",
		viewBox:"-5 -5 40 40",
		path:"M 4 26 Q 7 30 15 30 Q 28 29 30 15 Q 30 5 26 4 Q 25 0 15 0 Q 1 1 0 15 Q 0 23 4 26 Z",
		rule:{
			crossforbidden:true,
			maxconnected:1,
			maxconnectable:1,
			description:"No Orange is connectable with another (no path could be drawn).",
			depiction:"W=2&L=o0o6o2&S=1DD"
		}
	},
	"flower":{
		letter:"w",
		colour:"rgb(153,217,234)",
		viewBox:"0 0 600 600",
		path:"M 181 1 C 143 9 116 43 116 83 C 116 95 116 97 115 97 C 101 91 74 89 60 94 C -19 119 -19 233 60 256 L 66 258 62 265 C 50 285 48 312 55 334 C 75 392 152 411 194 367 L 201 360 203 363 C 207 368 219 376 228 380 C 301 414 375 339 339 266 C 337 261 335 257 335 257 C 335 257 338 256 342 255 C 395 240 417 172 384 126 C 363 97 324 84 291 94 L 283 97 283 85 C 285 31 234 -10 181 1 Z M 200 167 C 216 167 218 166 225 164 L 232 161 232 176 C 232 192 234 201 241 214 L 245 222 238 224 C 224 229 210 238 202 247 L 198 252 194 248 C 187 239 173 231 160 227 C 152 224 152 224 156 218 C 164 205 168 189 167 172 L 166 161 175 164 C 182 166 184 167 200 167 Z",
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
	return Join(...SegmentPoints(segment).map(point=>PointContainedSegments(point,intrack)))
}

PointContainedSegments=function(point,track){
	return track.filter(seg=>In(SegmentPoints(seg),point));
}

TrackEndsegments=function(track){
	return track.filter(segment=>SegmentContiguousTrackSegments(segment,track).length<=1);
}

TrackEndpoints=function(track){
	var endsegments=TrackEndsegments(track);
	if(!endsegments.length)
		return [];
	else
		return Join(...endsegments).filter(xy=>track.filter(segment=>In(segment,xy)).length===1);
}

TrackDangled=function(track,state){
	var endpoints=TrackEndpoints(track);
	return endpoints.some(point=>!In(Join(...Values(state.level)),point));
}

TrackBranchpoints=function(track){
	return TrackPoints(track).filter(point=>PointContainedSegments(point,track).length>=3);
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

UnTranslateTrack=function(track){
	var minx=Min(TrackPoints(track).map(First));
	var miny=Min(TrackPoints(track).map(Last));
	return TranslateTrack(track,-1*minx,-1*miny);
}

TranslateTrack=function(track,x,y){
	return track.map(segment=>TranslateSegment(segment,x,y));
}

TranslateSegment=function(segment,x,y){
	return segment.map(point=>VectorPlus(point,[x,y]));
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



///////////////////////////////////////////////////////////////////////////////
//Draw
//draws the board

FruitRule=function(fruit){
	return FruitIcons[fruit].rule;
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


TrackStyleOpts=function(track,state,Opts){
	var fruits=TrackFruits(track,state);

	var wrong=false;
	
	var colour;
	if(fruits.length<1)
		colour=state.line.deficitColour;
	else if(fruits.length>1){
		colour=state.line.excessColour;
	}
	else{
		var fruit=First(fruits);
		colour=FruitIcons[fruit].colour;
		var rule=FruitRule(fruit);

		if(!wrong&&rule.crossforbidden)
			wrong=true;

		if(!wrong&&rule.minconnected||rule.maxconnected){
			var min=rule.minconnected;
			if(min===Infinity)
				min=FruitNumber(fruit,state);
			var n=TrackFruitNumber(track,fruit,state);
			wrong=(n>rule.maxconnected||n<min)
		}

		if(!wrong&&!rule.loopallowed&&TrackLooped(track))
			wrong=true;

		if(!wrong&&rule.looprequired&&!TrackLooped(track))
			wrong=true;
			
		if(!wrong&&!rule.branchallowed&&TrackBranched(track))
			wrong=true;

		if(!wrong&&TrackDangled(track,state))
			colour=HEXSaturater(0.5)(colour);
	}

	var s=Opts.lineScale||1;
	var dash=[1,1];
	var lineCap="round";

	if(wrong)
		dash=[1,20];
	


	if(Opts.edit){
		colour=HEXDarkener(0.9)(colour);
		if(Opts.clearing)
			dash=Times(s,[5,5]);
	}
	
	var opts={
		strokeColor:CompelRGBA(colour,0.5),
		dash:dash,
		lineCap:lineCap,
		lineWidth:5*s,
	}

	if(state.line.lineWidth)
		opts.lineWidth=state.line.lineWidth;

	return opts

}

DrawTrack=function(track,state,Opts){
	if(!track.length)
		return;
	var trackStyleOpts=TrackStyleOpts(track,state,Opts);
	var track=track.filter(segment=>SegmentValid(segment,state));
		track=UnDiscretiseTrack(track);
	track.map(segment=>DrawSegment({
		px0:segment[0][0],
		px1:segment[1][0],
		py0:segment[0][1],
		py1:segment[1][1],
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
	return !(px<0||px>state.W)&&!(py<0||py>state.H);
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

	Opts.dash=false;
	Opts.lineWidth=state.visuals.skin||0;

	if(!state.visuals.solid){
		if(PointTrackContained([Opts.px,Opts.py],STATE.segments)){
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

DrawFruits=function(type,coordinates,Opts,state){
	var Opts=Opts||{};
	coordinates.map(xy=>DrawFruit({...Opts,type:type,px:xy[0],py:xy[1]},state));

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

FruitLetter=function(fruit){
	return FruitIcons[fruit].letter.toLowerCase();
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
	var xyfruits=Keys(state.level).map(fruit=>state.level[fruit].map(xy=>[xy[0],xy[1],FruitLetter(fruit)]));
		xyfruits=Join(...xyfruits);
		xyfruits=xyfruits.filter(fxy=>PointValid(fxy,state));

	var	fruitsxys=xyfruits.map(fxy=>[fxy[2],Linearise(fxy,(state.H))]);
		fruitsxys=Sorter(Last)(fruitsxys);
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

GameSerial=function(state){
	if(!state.game||!In(GameLetters,state.game))
		return "";
	return GameLetters[state.game];
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
	var state={...state};
	var serialObj=ReKeyObject(serialObj,LowerCase);
		state.W=Max(Number(serialObj.w||serialObj.h)||0,2);
		state.H=Max(Number(serialObj.h||serialObj.w)||0,2);
		if(serialObj.l)
			state.level=SerialLevel(serialObj.l,state);
		if(serialObj.s)
			 state.segments=SerialSegments(serialObj.s,state)
		if(serialObj.g)
			 if(In(LettersGame,serialObj.g)){
				 state.game=LettersGame[serialObj.g];
				 state=Merge(state,Games[state.game])
			 }
	return state;
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
	var g=GameSerial(state);
	if(g)
		Opts.G=g;
	return ParameterString(Opts);
}


///////////////////////////////////////////////////////////////////////////////
//State
//a friendly representation of the board state.
//The source of truth: updating STATE must update everything.


var Games={
	"bonsai":{
		letter:"b",
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
		}
	}
}

var LettersGame={};
Keys(Games).map(name=>LettersGame[Games[name].letter]=name);
var GameLetters=FlipKeysValues(LettersGame);

ObtainStartingLevelState=function(){
	var state={
		//visuals
		target:"kudamono-canvas",
		visuals:{
			cursor:"pencil",
			cursorsize:80,
			monochrome:false,
			solid:false,
			skin:1								//fruit skin thickness
		},
		line:{
			opacity:0.5,
			lineWidth:10,
			cap:"round",
			lineJoin:"round",
			colour:"rgba(155,155,155,0.5)",		//default line colour
			excessColour:"#000000",				//path colour, too many fruit
			deficitColour:"#CCCCCC" 			//path colour, zero		fruit
		},
		grid:{
			strokeColor:"#BBBBBB",				//grid lines
			fillColor:"#FFFFFF",				//background
			lineWidth:2,						//width   of grid lines
			dash:[6,12],						//dashing of grid lines
			border:0.5,							//how many squares to add to the border (to each of the shortest sides)
			scale:0.95,							//fruit scale (how large)
			nudge:0.3,							//fruit nudge (small adjustments to position)
			dual:false							//disalign squares and grid
		},	

		//Puzzle
		W:2,
		H:2,
		level:{},
		segments:[],
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
	if(PageSearch("W")||PageSearch("H"))
		state=SerialState(PageSearchObject(),state);
	else
	state={
		...state,
		W:7,
		H:7,
		level:{
			// "apple":[[1,1],[5,5]],
			// "pear":[[3,3]],
			// "cherry":[[2,2],[1,4]],
			// "blueberry":[[3,1]],
			// "grape":[[5,1],[1,2]],
			// "lemon":[[6,1],[6,2]],
			// "melon":[[4,4],[3,4]],
			// "orange":[[2,1],[2,5]]
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
		]
	}
	return state;
}

STATE=ObtainStartingLevelState();



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
	console.log(gridOpts);
	DrawSquaresGrid(gridOpts);
}

DrawStatePaths=function(state){
	var tracks=state.tracks;
	var Opts=Extremes(state);
	
	if(!state.mode.edit&&state.mode.selection.length>1){
		var seltrack=PathTrack(state.mode.selection);
		DrawTrack(seltrack,state,{edit:true,clearing:state.mode.clearing})
	}
	tracks.map(track=>DrawTrack(track,state,Opts));

}

DrawState=function(state){
	UnDraw();
	DrawStateGrid(state);
	DrawStatePaths(state);
	DrawLevel(state);
}



StateUpdater=function(opts){
	return function(){
		UpdateState(opts);
	}
}

UpdateState=function(opts){
	if(opts)
		Keys(opts).map(k=>STATE[k]=opts[k](STATE[k]));
	STATE.tracks=SplitContiguousTracks(STATE.segments);
	DrawCursor();
	DrawState(STATE);
	AddUndo(STATE);
	NavigateSerial(StateSerial(STATE));
}

DrawCursor=function(){
	if(!STATE.mode.edit)
		UpdateCursor("pencil")
	else
		UpdateCursor(STATE.mode.symbol)
}

UpdateCursor=function(name){
	if(!STATE.visuals.cursor||STATE.visuals.cursor!==name){
		STATE.visuals.cursor=name;
		var cursor=name;
		var opts={};
		if(In(FruitIcons,name)){
			cursor=FruitIcons[name];
			cursor=RescalePath({...cursor,scale:1,square:100},true);
			cursor=DisplacePath({...cursor,px:10,py:10});
			cursor=BuildSymbolIcon({...cursor,primitive:"cursor-triangle"});
			opts.fill=FruitIcons[name].colour;
		}
		opts.width=STATE.visuals.cursorsize||80;
		opts.height=STATE.visuals.cursorsize||80;
		SetCursor(STATE.target,cursor,opts);
	}
}

//Undo
ObtainSetLevelState=function(state){
	STATE=state;
	DrawState(state);
}


Extremes=function(state){
	var gridOpts={
		...state.grid,
		rows:state.H,
		cols:state.W
	}
	return GridExtremes(gridOpts);
}


CanvasPosition=function(x,y,state){
	var extremes=Extremes(state);
	var X=state.W*(x-extremes.x0)/(extremes.x1-extremes.x0);
	var Y=state.H*(y-extremes.y0)/(extremes.y1-extremes.y0);
	return [X,Y];
}

CanvasPoint=function(x,y,state){
	var p=CanvasPosition(x,y,state);
	return [
		Floor((p[0]+0.5)),
		Floor((p[1]+0.5))
	]
}


CanvasBoxPosition=function(x,y,state){
	xy=CanvasBoardPosition(x,y,state);
	var x=FractionalPart(xy[0]/state.W);
	var y=FractionalPart(xy[1]/state.H);
	var s=1/4;//centre box width
	if(x>s&&x<1-s&&y>s&&y<1-s)
		return 0;
	if(x>s){
		if(y>s){
			if(y<x)
				return 1;
			else
				return 8;
		}
		else{
			if(y<x-1)
				return 3;
			else
				return 2;
		}
	}
	else{
		if(y>s){
			if(y<x)
				return 4;
			else
				return 5;
		}
		else{
			if(y<x-1)
				return 6;
			else
				return 7;
		}

	}
}


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


function DragActionStarter(x,y){
	var xy=CanvasPoint(x,y,STATE);
	if(!PointValid(xy,STATE))
		return;//TODO OTHER OPTIONS
	STATE.mode.symbol=XYFruit(xy,STATE)||STATE.mode.symbol;
	STATE.mode.dragging=true;
	STATE.mode.selection=[xy];
	if(STATE.mode.edit){
		STATE.mode.clearing=!!XYFruit(xy,STATE);
		DrawState(STATE);
	}
}
function DragActionContinuer(x,y){
	var xy=CanvasPoint(x,y,STATE);
	if(!PointValid(xy,STATE))
		return;
	if(!STATE.mode.selection)
		STATE.mode.selection=[];
	if(!In(STATE.mode.selection,xy)){
		STATE.mode.selection=AddOnce(STATE.mode.selection,xy);
		DrawState(STATE);
	}
	else if(STATE.mode.selection.length>1&&Equal(First(Take(STATE.mode.selection,-2)),xy)){
		STATE.mode.selection=Remove(STATE.mode.selection,Last(STATE.mode.selection));
		DrawState(STATE);
	}

	if(!STATE.mode.edit){
		var selected=STATE.mode.selection;
		STATE.mode.clearing=Intersection(XYSegments(selected[0],STATE),XYSegments(selected[1],STATE)).length>=1;
		if(STATE.mode.clearing)
			UpdateCursor("pencil-erase")
		else
			UpdateCursor("pencil")
	}

}
function DragActionEnder(x,y){
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
	"ctrl shift b":function(){STATE.visuals.solid=!!!STATE.visuals.solid;UpdateState();},
	"ctrl s":ExportSerial,

	"space":function(){STATE.mode.edit=!STATE.mode.edit;UpdateState();},

	"ctrl r":function(){STATE.segments=[];UpdateState();},
	"ctrl shift r":function(){STATE.level={};UpdateState();},
	"ctrl alt r":function(){STATE.level={};STATE.segments=[];UpdateState();},

	// "left":PathGrower(-1,0),
	// "up":PathGrower(0,1),
	// "right":PathGrower(1,0),
	// "down":PathGrower(0,-1)

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

var ClearBoard=StateUpdater({segments:segments=>[],level:level=>{}});
var ClearSegments=StateUpdater({segments:segments=>[]});
var ClearFruit=StateUpdater({level:level=>{}});

FruitSetter=function(fruit){
	KeyboardActions[FruitIcons[fruit].letter]=function(){
		STATE.mode.edit=true;
		STATE.mode.symbol=fruit;
		DrawCursor();
	}
}

Keys(FruitIcons).map(FruitSetter);


var DragActions={
	Starter:DragActionStarter,
	//AltStarter:DragActionAltStarter,
	Executer:DragActionContinuer,
	Ender:DragActionEnder
}

CanvasResize=function(){
	var e=GetElement(STATE.target);
	e.width=Max(window.innerWidth,e.width||0,e.scrollWidth||0);
	e.height=Max(window.innerHeight,e.height||0,e.scrollHeight||0);
	DrawState(STATE);
}


InitialiseKudamono=function(){
	PreAddElement(`
	<div>
		<canvas 
			id="${STATE.target}" 
			oncontextmenu="return false;" 
			width="${window.innerWidth}" 
			height="${window.innerHeight*0.9}"
		>
		<div class="title">Kudamono</div>
	</div>`,"body");
	CanvasResize();
	AttendDrag(DragActions,"canvas");
	Attend('resize',CanvasResize)
	Keybind(KeyboardActions,STATE.target);
	ResumeCapturingKeys(ComboKeyPressHandler);
	UpdateState();
	SetCursor(STATE.target,STATE.visuals.cursor);
	setTimeout(()=>FocusElement(STATE.target),500)
}

//Auto instructions

HyperText("Kudamono/FruitShortcuts",()=>TableHTML({
		headers:["Shortcut","Fruit"],
		caption:"Choose a fruit by pressing:",
		rows:Sort(Keys(FruitIcons)).map(fruit=>[KB(FruitIcons[fruit].letter),fruit])
	}))


if(PageSearch("W")||PageSearch("H"))
	setTimeout(InitialiseKudamono,500)