var Homeomorphism={
	"A":["A","R"],
	"B":["B","8"],
	"H":["H","K"],
	"I":["C","G","I","J","L","M","N","S","U","V","W","Z","1","2","5","7"],
	"O":["D","O","0"],
	"P":["P","6","9"],
	"Q":["Q","4"],
	"X":["X"],
	"Y":["E","F","T","Y","3"],
}

var HomeomorphismRequirement={
	"A":["P","H"],
	"B":["A"],
	"H":["Y"],
	"I":[],
	"O":["I"],
	"P":["O","Y"],
	"Q":["P","X"],
	"X":["Y"],
	"Y":["I"]
}

function HomeomorphicClass(O){
	var classes=Object.keys(Homeomorphism);
	if(In(classes,O))
		return O;
	else{
		for(var i in classes){
			if(In(Homeomorphism[classes[i]],O))
				return classes[i];
		}
		return null;
	}
}

var ShapePointConnections={
	"Y":"z","z":"R",//yellow->red
	"D":"e","e":"f","f":"L",//darkblue->lightblue
	"P":"q","q":"r","r":"L",//purple->lightblue
	"G":"h","h":"R",//green->red
	"A":"L",//gray->lightblue
	"L":"m","m":"n","n":"o","o":"R",//lightblue->red
	"Z":"L"//gray->lightblue
}

var ShapePoints=Union(Keys(ShapePointConnections),Values(ShapePointConnections));

var LetterShape={
	"A":{
		"Y":[0,0],
		"R":[2,4],
		"G":[4,8],
		"D":[4,8],
		"L":[6,4],
		"P":[8,0],
	},
	"B":{
		"Y":[0,0],
		"R":[0,4],
		"G":[0,8],
		"L":[4,4],
		"e":[4,8],
		"f":[5,7],
		"fL":[5,4],//bezier
		"ef":[5,8],//bezier
		"D":[0,8],//"G",
		"q":[4,0],
		"r":[5,1],
		"rL":[5,4],//bezier
		"qr":[5,0],//bezier
		"P":[0,0],//"Y",
	},
	"C":{
		"R":[0,4],
		"G":[7,7],
		"L":[7,1],
		"m":[4,0],
		"h":[4,8],
		"Gh":[7,8],
		"hR":[0,8],
		"Lm":[7,0],
		"mn":[0,0],
	},
	"D":{
		"R":[0,0],
		"G":[0,8],
		"D":[0,8],//"G",
		"L":[5,4],
		"De":[5,8],
		"Lm":[5,0],
	},
	"E":{
		"Y":[4,0],
		"z":[0,0],
		"R":[0,4],
		"G":[4,8],
		"h":[0,8],
		"L":[4,4],
	},
	"F":{
		"Y":[0,0],
		"R":[0,4],
		"G":[4,8],
		"h":[0,8],
		"L":[4,4],
	},
	"G":{
		"R":[0,4],
		"G":[7,7],
		"L":[5,4],
		"m":[8,4],
		"n":[8,3],
		"o":[4,0],
		"h":[4,8],
		"Gh":[7,8],
		"hR":[0,8],
		"no":[8,0],
		"oR":[0,0],
	},
	"H":{
		"Y":[0,0],
		"R":[0,4],
		"G":[0,8],
		"L":[4,4],
		"D":[4,8],
		"P":[4,0],
	},
	"I":{
		"R":[0,0],
		"G":[0,8],
	},
	"J":{
		"G":[4,8],
		"h":[4,2],
		"hR":[4,0],
		"R":[2,0],
		"mL":[0,0],
		"L":[0,2],
	},
	"K":{
		"Y":[0,0],
		"R":[0,3],
		"G":[0,8],
		"L":[2,5],
		"D":[5,8],
		"P":[6,0],
	},
	"L":{
		"R":[4,0],
		"G":[0,8],
		"h":[0,0]
	},
	"M":{
		"R":[4,0],
		"G":[0,0],
		"h":[0,8],
		"L":[8,0],
		"m":[8,8],
	},
	"N":{
		"G":[0,0],
		"R":[0,8],
		"m":[4,0],
		"L":[4,8],
	},
	"O":{
		"R":[0,4],
		"G":[8,4],
		"h":[4,8],
		"L":[8,4],
		"m":[4,0],
		"Gh":[8,8],
		"hR":[0,8],
		"Lm":[8,0],
		"mn":[0,0],
	},
	"P":{
		"Y":[0,0],
		"R":[0,4],
		"G":[0,8],
		"L":[4,4],
		"D":[0,8],//"G",
		"e":[4,8],
		"f":[5,7],
		"fL":[5,4],
		"ef":[5,8],
	},
	"Q":{
		"R":[0,4],
		"G":[8,4],
		"h":[4,8],
		"Gh":[8,8],
		"hR":[0,8],
		"D":[8,4],//"G",
		"L":[7,1],
		"P":[8,0],
		"Z":[4,4],
		"m":[4,0],
		"Lm":[5,0],
		"LD":[3,8],
		"mn":[0,0],
	},
	"R":{
		"Y":[0,0],
		"R":[0,4],
		"G":[0,8],
		"L":[4,4],
		"D":[0,8],//"G",
		"e":[4,8],
		"f":[5,7],
		"fL":[5,4],
		"ef":[5,8],
		"P":[6,0]
	},
	"S":{
		"G":[4,6],
		"h":[2,8],
		"Gh":[4,8],
		"R":[0,6],
		"hR":[0,8],
		
		"L":[0,2],
		"m":[2,0],
		"Lm":[0,0],
		"n":[4,2],
		"mn":[4,0]
	},
	"T":{
		"Y":[4,0],
		"G":[0,8],
		"R":[4,8],
		"L":[8,8],
	},
	"U":{
		"G":[0,8],
		"h":[0,4],
		"hR":[0,0],
		"R":[4,0],
		"L":[8,8],
		"m":[8,4],
		"mn":[8,0],
	},
	"V":{
		"G":[0,8],
		"R":[4,0],
		"L":[8,8],
	},
	"W":{
		"G":[0,8],
		"h":[2,0],
		"R":[4,8],
		"m":[6,0],
		"L":[8,8],
	},
	"X":{
		"G":[0,8],
		"Y":[0,0],
		"R":[4,4],
		"D":[8,8],
		"P":[8,0],
	},
	"Y":{
		"G":[0,8],
		"Y":[4,0],
		"R":[4,4],
		"D":[8,8],
	},
	"Z":{
		"G":[8,0],
		"h":[0,0],
		"R":[4,4],
		"m":[8,8],
		"L":[0,8],
	},
}

function NextExplicitCoordinate(){

}

function LetterCoordinates(Z){
	var explicitCoordinates=Clone(LetterShape[Z]);
	var implicitPoints=ShapePoints.filter(c=>!In(explicitCoordinates,c));
	
	for (var i=0;i<implicitPoints.length;i++){
		var c=ShapePointConnections[implicitPoints[i]];
		while(!explicitCoordinates[c]&&ShapePointConnections[c]){c=ShapePointConnections[c]}
		explicitCoordinates[implicitPoints[i]]=explicitCoordinates[c];
	}
	return explicitCoordinates;
}

function BezierTrack(coordinates,c){
		
	var sta=c;
	var end=ShapePointConnections[c];

	var mid=false;
	if(coordinates[sta+end])
		mid=coordinates[sta+end];
	else if(coordinates[end+sta])
		mid=coordinates[end+sta];
	
	sta=coordinates[c];
	end=coordinates[end];

	return BezierPathHTML(sta,end,mid);
}

function LetterPaths(Z){
	var coordinates=LetterCoordinates(Z);
	var visiblepoints=Keys(coordinates).filter(k=>k.length===1&&k!=="R");//Origin
	var paths=visiblepoints.map(c=>BezierTrack(coordinates,c));
	return paths;
}	

var BezierHeight=10;
var BezierPadding=1;

function BezierPathHTML(sta,end,mid){
	var sta=[sta[0]+BezierPadding,BezierHeight-BezierPadding-sta[1]];
	var end=[end[0]+BezierPadding,BezierHeight-BezierPadding-end[1]];
	if(mid){
		var mid=[mid[0]+BezierPadding,BezierHeight-BezierPadding-mid[1]];
		return `<path  d="M${sta} Q${mid} ${end}"/>`;
	}
	else
		return `<path  d="M${sta} L${VectorMean(sta,end)} L${end}"/>`;
}

function BezierLetter(Z){
	if(BezierLetter[Z])
		return BezierLetter[Z];
	else{
		var xs=Values(LetterCoordinates(Z)).map(First);
		var BezierWidth=Max.apply(null,xs);
		return BezierLetter[Z]=`<svg viewbox="0 0 ${BezierWidth+2} ${BezierHeight}"	class="bezier letter"> ${LetterPaths(Z).join("")}</svg>`
	}
}