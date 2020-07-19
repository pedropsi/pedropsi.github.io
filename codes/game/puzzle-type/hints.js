var HintsObject={
// "Direct",
// "Reverse",
// "Follow",
// "Consonant",
// "Second",
// "Rotate",
// "Rise",
// "Falls",
// "Precedent",
// "Superior",
// "Difference",
// "Symmetries",
// "Fillet",
// "Topological",
// "Nokia 1998",
// "Wasd",
"Dvorak":[
	"Dvorak does not refer to Antonín Dvořák, the great composer.",
	"It refers to the <b>standard</b> Dvorak keyboard layout!"
],
// "ひらがな",
"Nigeria":[
	"Have you opened the world map?",
	"How are countries geographically related?",
	"Try cities!"
],
"Genetic.":[
	"What does genetic refer to?",
	"What does each letter mean in the genetic code?",
	"How do geneticists name three-letter combinations?",
	"What happens when a codon is translated?"
],
// "Anagram",
// "Ironclad",
"Deaf":[
	"First, turn on the sound!",
	"Is it possible to play three identical notes?",
	"Does the order of the notes matter?",
	"How would you name a group of three notes?",
	"Why are some letters small and others large?"
],
// "⠍⠕⠗⠎⠑", 
// "Dividi",
"Odd":[
	"What is odd about this level?",
	"Try typing even!"
],
// "Latent clones",
// "Shepherdess hence unladylike",
"Starting buds":[
	"Why can you start with some letters but not others?",
	"When can you add a new letter?",
	"After adding a new letter, what happens to the old letter positions?",
	"To add a space, like any other letter, what must happen?",
],
// "La rapide surprise",
// "Just cut and paste",
// "Order is all"
};

Hints.cached=LevelGoals.map(
	function(goal){
		var hints=HintsObject[goal];
		if(hints)
			return hints;
		else
			return [];
	}
)

StartHints(Hints.cached);