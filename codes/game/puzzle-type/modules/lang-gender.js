var Gendered={//cherished woman//
	//grammatical
	"he":"she",
	"his":"her",
	"him":"her",
	"male":"female",
	"masculine":"feminine",
	"andro":"gineco",
	//animals
	"cob":"pen",	//swan
	"bull":"cow",
	"ox":"cow",
	"fox":"vixen",
	"pig":"sow",
	"ram":"ewe",
	"horse":"mare",
	"stallion":"mare",
	"cock":"hen",
	"colt":"filly",
	"stag":"hind",
	"gander":"goose",
	"dog":"bitch",
	"drone":"bee",
	"drake":"duck",
	"tiger":"tigress",
	"lion":"lioness",
	//religion
	"adam":"eve",
	"god":"goddess",
	//sociology
	"mascularity":"feminacy",
	"masculinity":"femininity",
	"macho":"femea",
	"machism":"feminism",
	//family, people
	"man":"woman",
	"men":"women",
	"boy":"girl",
	"lad":"lass",
	"son":"daughter",
	"brother":"sister",
	"bro":"sis",
	"father":"mother",
	"papa":"mama",
	"grandpa":"grandma",
	"husband":"wife",
	"uncle":"aunt",
	"nephew":"niece",
	"fiancé":"fiancée",
	"bridegroom":"bride",
	//titles
	"emperor":"empress",
	"king":"queen",
	"prince":"princess",
	"duke":"duchess",
	"marquess":"marchioness",
	"count":"countess",
	"earl":"countess",
	"baron":"baroness",
	"baronet":"baronetess",
	"peer":"peeress",
	"lord":"lady",
	"gentleman":"lady",
	"sir":"dame",//sire:dame
	"monsieur":"madame",
	"master":"mistress",
	"mr":"miss",
	//other titles,
	"tsesarevich":"tsesarevna",
	"graf":"grafin",
	"margrave":"margravine",
	"palsgrave":"palsgravine",
	"burgrave":"burgravine",
	"herzog":"herzogin",
	"fuerst":"fuerstin",
	"dauphan":"dauphine",
	"infante":"infanta",
	"krolewicz":"krolewna",//"królewicz":"królewna",
	"knyaz":"knyaginya",
	"herr":"frau",// junkherr, junkfrau
	"viceroy":"vicereine",
	"tsar":"tsaritsa",
	"czar":"czaritsa",
	"kaiser":"kaiserin",
	"raja":"rani",//"maharaja":"maharani",
	"sheik":"sheika",
	"sultan":"sultana",
	"khan":"khatun",
	"rey":"reina",
	"rei":"rainha",
	//occupations
	"ambassador":"ambassadress",
	"shepherd":"shepherdess",
	"actor":"actress",
	"milkman":"milkmaid"
	//etc...
}

var GenderReplacementRules=[];
MapObject(Gendered,function(f,m){
	GenderReplacementRules.push([new RegExp(m.toUpperCase()+"$"),f.toUpperCase()]);
});

var GenderedMale=Values(Gendered);
