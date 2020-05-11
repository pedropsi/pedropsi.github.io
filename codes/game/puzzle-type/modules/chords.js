
var NoteIncrements={
	"A##":"B",
	"B#":"C",
	"C##":"D",
	"D##":"E",
	"E#":"F",
	"F##":"G",
	"G##":"A"
}

function IncrementNote(note){
	return StringReplaceRulesObject(note,NoteIncrements);
}

var MajorChords={
	"CEG":"C",
	"C#FG#":"C#",
	"DF#A":"D",
	"D#GA#":"D#",
	"EG#B":"E",
	"FAC":"F",
	"F#A#C#":"F#",
	"GBD":"G",
	"G#CD#":"G#",
	"AC#E":"A",
	"A#DF":"A#",
	"BD#F#":"B"
};

ChordForward={
	"A#":"a",
	"B#":"b",
	"C#":"c",
	"D#":"d",
	"E#":"e",
	"F#":"f",
	"G#":"g"
}

ChordBackward=FlipKeysValues(ChordForward);

function PermuteChord(chord){
	var hiddenchord=StringReplaceRulesObject(chord,ChordForward);
	var permutations=StringPermutations(hiddenchord);
		permutations=permutations.map(function(ch){
			return StringReplaceRulesObject(ch,ChordBackward);
		});
	return permutations;
}

Keys(MajorChords).map(function(chord){
	var permutations=PermuteChord(chord);
	return permutations.map(function(pchord){
		MajorChords[pchord]=MajorChords[chord];
	});
})
