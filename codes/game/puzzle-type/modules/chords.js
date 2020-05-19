
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

var MinorChords={
	"CD#G":"C",
	"C#EG#":"C#",
	"DFA":"D",
	"D#F#A#":"D#",
	"EGB":"E",
	"FG#C":"F",
	"F#AC#":"F#",
	"GA#D":"G",
	"G#BD#":"G#",
	"ACE":"A",
	"A#C#F":"A#",
	"BDF#":"B"
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

Keys(MinorChords).map(function(chord){
	var permutationsMinor=PermuteChord(chord);
	return permutationsMinor.map(function(pchord){
		MinorChords[pchord]=MinorChords[chord];
	});
})

var Notes=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];

function NoteNumber(note){
	return Notes.indexOf(note);
}

function NumberNote(number){
	return Notes[number];
}

function NotePlayer(n,o){
	return function(){
		var note=IncrementNote(n);
		var octave=o+(In("A A# B B#",note)?0:0);
		Piano.play(note,octave,2);
	}
}

function PlayChord(chord,delay,speed){
	var i=0;
	var delay=delay||0;
	var speed=(typeof speed==="undefined"?1:speed);

	if(typeof Piano!=="undefined"){
		var ch=chord.replace(/([ABCDEFG])/g,"-$1").split("-");
			ch=ch.filter(x=>!In(["","#"],x));
		var octave=3;
		var last="";
		for(var n=0;n<ch.length;n++){
			note=ch[n];
			if(last&&NoteNumber(last)>=NoteNumber(note))
				octave++;
			setTimeout(NotePlayer(note,octave),n*250*speed+delay)
			last=note;
		}
	}
	else{
		console.log("no Piano!")
	}

}

var Piano;
function PianoStart(){
	Piano=Synth.createInstrument('piano');
}
ListenOnce("audiosynth",PianoStart);