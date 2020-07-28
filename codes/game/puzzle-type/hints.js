var HintsObject={
	"Direct":[
		"Use your keyboard to type the clue."
	],
	"Reverse":[
		"?tnih a deen yllaer uoy oD"
	],
	"Follow":[
		"Which letter follows you?"
	],
	"Consonant":[
		"Which letters are consonants, which ones vowels?",
		"What happens after you type a consonant? And a vowel?"
	],
	"Second":[
		"The word 'second' has more than one meaning..."
	],
	"Rotate":[
		"What is rotating?",
		"Do the letters rotate position every time?",
		"How would trace precisely the changes in position for each letter?"
	],
	"Rise":[
		"What is rising?",
		"Can you make use of the rise?"
	],
	"Falls":[
		"What is falling?",
		"What is the rate of fall?",
		"At that rate, can you find a good starting point?"
	],
	"Precedent":[
		"When are letters added? When do they modify others?",
		"What does 'precede' mean?",
		"How could you protect some of the letters?"
	],
 	"Superior":[
		"After you type a letter, where does the caret move?",
		"What does 'superior' mean, in the context of a moving caret?",
		"Why does the caret move to the end of the word, sometimes?",
		"How would you set up the letters, to later place the caret wherever you want?"
	],
	"Difference":[
		"When does the caret jump forward, and when backwards?",
		"In which situations does the caret stay in place?",
		"How many steps does the caret jump? Can you control this?",
		"Which letter combinations trap the caret in a cycle?"
	],
	"Symmetries":[
		"What can happens to the order of the already typed letters?",
		"Which letters can't you type? What do they do?",
		"About which symmetries are we thinking?"
	],
	"Fillet":[
		"Most words can't be cut in the way 'fillet' does. This was a rare find.",
		"After typing 6 letters, you may go back to the beginning to fix any mistakes.",
		"In how many different ways can you make a single letter?"
	],
	"Topological":[
		"Topology is an area of mathematics about the continuity of geometrical shapes. Here, our shapes are letters.",
		"Letters belong to different 'Homeomorphism' classes. Within the same class, letters can be deformed without gluing or cutting arms.",
		"So, you cannot cut an <b>O</b> into a <b>C</b> (different classes), but you can straighten a <b>C</b> into an <b>L</b> (same class).",
		"Adding an arm to an <b>I</b> to make a <b>Y</b> is also not allowed, as they belong to different classes.",
		"Can you split all 26 letters into different classes?"
	],
	"Nokia 1998":[
		"Nokia phones in 1998... How nostagic!",
		"How did people back then type on their phones?"
	],
	"Wasd":[
		"Which letters can you type? What do they do?",
		"Where will you write WASD?",
		"Do draw a map if you need one!"
		],
	"Dvorak":[
		"Dvorak does not refer to Antonín Dvořák, the great composer.",
		"It refers to the <b>standard</b> Dvorak keyboard layout!"
		],
	"ひらがな":[
		"Which language are we looking at?",
		"Which writing system are we facing?",
		"Which sound does each kana represent? How many different kanas belong to this writing sytem?"
	],
	"Nigeria":[
		"Have you opened the world map?",
		"How are countries geographically related?",
		"Are countries the only entities we need?"
	],
	"Genetic.":[
		"What does genetic refer to?",
		"What does each letter mean in the genetic code?",
		"How do geneticists name three-letter combinations?",
		"What happens when a codon is translated?"
	],
	"Anagram":[
		"When can we write a permanent letter?",
		"Which of the written letters becomes permanent?"
	],
	"Ironclad":[
		"What is iron, scientifically speaking?",
		"Which other elements do we need?",
		"Is there any D-element?"
	],
	"Deaf":[
		"Have you turned on the sound?",
		"Is it possible to play three identical notes?",
		"Does the order of the notes matter?",
		"How would you name a group of three notes?",
		"Why are some letters small and others large?"
	],
	"⠍⠕⠗⠎⠑":[
		"Which languages are written here?",
		"Do dots mean anything in those languages?"
	], 
	"Dividi":[
		"Which letters can you type?",
		"When do typed letters behave abnormally?",
		"What does the word 'dividi' mean and in which language?"
	],
	"Odd":[
		"What is odd about this level?",
		"Try typing even!"
	],
	"Latent clones":[
		"Which words produce effect?",
		"Can you time such effects perfectly?",
		"How much can you back, before going forward?"
	],
	"Shepherdess hence unladylike":[
		"Which words produce effect?",
		"Which <em>other</em> words produce the same effect?"
	],
	"Starting buds":[
		"When can you add a new letter?",
		"Why can you start with some letters but not others?",
		"After adding a new letter, how do the other letters rearrange themselves?",
		"Imagine you could add a space in the middle of the word. Could the left and right sides remain valid?"
	],
	"La rapide surprise":[
		"Which languages are we using?",
		"When is a translation triggered?"
	],
	"Just cut and paste":[
		"Which keywords matter?",
		"Are keywords always triggered?",
		"How do you ensure two keywords are not triggered?"
	],
	"Order is all":[
		"This level was inspired by the game Baba is you, by Hempuli.",
		"There is only one keyword: is.",
		"You may use the keyword as often as you need, to make many rules."
	]
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