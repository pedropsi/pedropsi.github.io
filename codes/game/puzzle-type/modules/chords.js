
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

var ChordsAll=Keys(MinorChords).concat(Keys(MajorChords));

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

function ParseChordList(chordtxt){
	var ch=chordtxt.replace(/([ABCDEFG])/g,"-$1").split("-");
	ch=ch.filter(x=>!In(["","#"],x));
	return ch
}

function NoteOctave(n,o){
	return In("AA#BB#",n)?(o-1):o;
}

function PlayChord(chord,alone,delay){
	var i=0;
	var delay=delay||0;
	
	var notes=ParseChordList(chord).map(n=>n+NoteOctave(n,5));
	var synth = new Tone.PolySynth(Tone.Synth).toDestination();
	var now = Tone.now()+delay;

	notes.map((n,i)=>{
		synth.triggerAttack(n,now+i/2);
		synth.triggerRelease([n],(now+i/2)+0.2);
		if(!alone){
			synth.triggerAttack(n,now+notes.length/2);
			synth.triggerRelease([n],(now+notes.length/2)+0.4);
		}
	});
}


