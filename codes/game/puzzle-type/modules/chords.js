
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
	if(!PlayChord.synth)
		PlayChord.synth = new Tone.PolySynth(Tone.Synth).toDestination();
	
	var now = Tone.now()+delay;

	notes.map((n,i)=>{
		if(!alone){
			PlayChord.synth.triggerAttack(n,now);
			PlayChord.synth.triggerRelease([n],now+0.4);
		}
		else{
			PlayChord.synth.triggerAttack(n,now+i/2);
			PlayChord.synth.triggerRelease([n],(now+i/2)+0.2);
		}
	});
}

function PlayNote(A){
	PlayChord(A,true)
}

function PlayBump(){
	const synth = new Tone.MembraneSynth().toDestination();
	var note=RandomChoice(["A","B","C","D","E","F","G"])+"1";
	PlaylistCrossFade(Tone.Time("8n").toMilliseconds(),()=>synth.triggerAttackRelease(note,"8n"));
}

function PlayMorse(morsearray){
	if(!PlayMorse.synth)
		PlayMorse.synth = new Tone.PolySynth(Tone.Synth).toDestination();
	else
		PlayInterruptMorse();
	
	var notes=morsearray;
	var now = Tone.now();

	var n;
	PlayMorse.pitch="A4";
	var pitch=PlayMorse.pitch;
	for(var i=0;i<notes.length;i++){
		n=notes[i];
		PlayMorse.synth.triggerAttack(pitch,now);
			if(n===".")
				now+=0.1
			else
				now+=0.3
		PlayMorse.synth.triggerRelease(pitch,now);
		now+=0.1
	}
};

function PlayInterruptMorse(){
	var now = Tone.now();
	var pitch = PlayMorse.pitch;
	if(PlayMorse.synth)
		PlayMorse.synth.triggerRelease(pitch,now)
}