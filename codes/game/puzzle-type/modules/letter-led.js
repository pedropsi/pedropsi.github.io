var LEDLetters={
	"A":"123456",
	"B":"0123456",
	"C":"0123",
	"D":"12XY",
	"E":"01236",
	"F":"1236",
	"G":"012356",
	"H":"12456",
	"I":"45",
	"J":"0145",
	"K":"12WZ",
	"L":"012",
	"M":"1245YZ",
	"N":"1245YW",
	"O":"012345",
	"P":"12346",
	"Q":"012345W",
	"R":"12346W",
	"S":"02356",
	"T":"345",
	"U":"01245",
	"V":"12XZ",
	"W":"1245WX",
	"X":"WXYZ",
	"Y":"2456",
	"Z":"03XZ",
	"À":"1456",
	"0":"012345",
	"1":"12",
	"2":"01346",
	"3":"03456",
	"4":"2456",
	"5":"02356",
	"6":"012356",
	"7":"345",
	"8":"0123456",
	"9":"023456"
};


var LED90Rotations={
	"0":"-5",
	"1":"-0",
	"2":"0-",
	"3":"1-",
	"4":"6-",
	"5":"-6",
	"6":"51",
	"W":"-X",
	"X":"-W",
	"Y":"X-",
	"Z":"W-"
};

var LED180Rotations={
	"0":"3",
	"1":"4",
	"2":"5",
	"3":"0",
	"4":"1",
	"5":"2",
	"6":"6",
	"W":"Y",
	"X":"Z",
	"Y":"W",
	"Z":"X"
};

var LED270Rotations={
	"0":"2-",
	"1":"3-",
	"2":"-3",
	"3":"-4",
	"4":"-6",
	"5":"6-",
	"6":"42",
	"W":"Z-",
	"X":"Y-",
	"Y":"-Z",
	"Z":"-Y"
}

var LEDCoordinates={
	"0":"M 0 0 L 1 1 L 9 1 L 10 0 L 9 -1 L 1 -1 Z",			//[[0,0],[1,0]],
	"1":"M 0 0 L -1 1 L -1 9 L 0 10 L 1 9 L 1 1 Z",			//[[0,0],[0,1]],
	"2":"M 0 10 L -1 11 L -1 19 L 0 20 L 1 19 L 1 11 Z",	//[[0,1],[0,2]],
	"3":"M 0 20 L 1 21 L 9 21 L 10 20 L 9 19 L 1 19 Z",		//[[0,2],[1,2]],
	"4":"M 10 10 L 9 11 L 9 19 L 10 20 L 11 19 L 11 11 Z",	//[[1,1],[1,2]],
	"5":"M 10 0 L 9 1 L 9 9 L 10 10 L 11 9 L 11 1 Z",		//[[1,0],[1,1]],
	"6":"M 0 10 L 1 11 L 9 11 L 10 10 L 9 9 L 1 9 Z",		//[[0,1],[1,1]],
	"W":"M 5 10 L 6.5 10 L 10 1.5 L 10 0 L 8.5 0 L 5 8.5 Z",			//[[0,1],[1,0]],
	"X":"M 0 0 L 0 1.5 L 3.5 10 L 5 10 L 5 8.5 L 1.5 0 Z",			//[[0,0],[1,1]],
	"Y":"M 0 20 L 1.5 20 L 5 11.5 L 5 10 L 3.5 10 L 0 18.5 Z",		//[[0,2],[1,1]],
	"Z":"M 5 10 L 5 11.5 L 8.5 20 L 10 20 L 10 18.7 L 6.5 10 Z"		//[[0,1],[1,2]]
}

var LEDLetterNumbers={
	"O":0,
	"0":0,
	"I":1,
	"1":1,
	"2":2,
	"E":3,
	"À":4,
	"S":5,
	"5":5,
	"9":6,
	"L":7,
	"B":8,
	"8":8,
	"6":9,
	"G":9
}

var LEDNumberLetters={
	"0":"O",
	"1":"I",
	"2":"2",
	"3":"E",
	"4":"À",
	"5":"S",
	"6":"9",
	"7":"L",
	"8":"B",
	"9":"6"
}


LEDLetterNumber=function(L){
	var L=L.toUpperCase();
	if(In(LEDLetterNumbers,L))
		return LEDLetterNumbers[L];
	else
		return L;
}


function LEDLetterSVGHTML(ledstring){
	var coordinates=ledstring.split("");
		coordinates=coordinates.map(c=>LEDCoordinates[c]);
		coordinates=coordinates.join(" ");

	return SVGHTML({
		path:coordinates,
		transform:"flip-vertical",
		cla:"bezier letter led",
		viewBox:"0 0 20 20",
	})
}


var LedShapeShifts={
	"0":1,
	"1":2,
	"2":3,
	"3":4,
	"4":5,
	"5":0
}

function LEDShapeShift(shape){
	var shape=shape.split("");
		shape=shape.map(Accesser(LedShapeShifts));
		return shape.sort().join("");
}
