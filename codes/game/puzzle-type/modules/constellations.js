var StarAliases={
	"α pegasi":"markab",
	"α piscis austrini":"fomalhaut",
	"α gruis":"al nair",//"al na'ir",
	"ε pegasi":"enif",
	"α cygni":"deneb",
	"α pavonis":"peacock",
	"α aquilae":"altair",
	"σ sagittarii":"nunki",
	"α lyrae":"vega",
	"ε sagittarii":"kaus australis",
	"γ draconis":"eltanin",
	"α ophiuchi":"rasalhague",
	"λ scorpii":"shaula",
	"η ophiuchi":"sabik",
	"α trianguli australis":"atria",
	"α scorpii":"antares",
	"α corona borealis":"alphecca",
	"β ursae minoris":"kochab",
	"α librae":"zubenelgenubi",
	"α centauri":"rigil kentaurus", //α1
	"α bootis":"arcturus",
	"θ centauri":"menkent",
	"β centauri":"hadar",
	"η ursae majoris":"alkaid",
	"α virginis":"spica",
	"ε ursae majoris":"alioth",
	"capella":"alioth",
	"γ crucis":"gacrux",
	"α crucis":"acrux", //α1
	"γ corvi":"gienah",
	"β leonis":"denebola",
	"α ursae majoris":"dubhe",//α1
	"α leonis":"regulus",
	"α hydrae":"alphard",
	"β carinae":"miaplacidus",
	"λ velorum":"suhail",
	"ε carinae":"avior",//ε1
	"β geminorum":"pollux",
	"α canis minoris":"procyon",
	"ε canis majoris":"adhara",
	"α canis majoris":"sirius",
	"α carinae":"canopus",
	"α orionis":"betelgeuse",
	"ε orionis":"alnilam",
	"γ orionis":"bellatrix",
	"β tauri":"elnath",
	"α aurigae":"capella",
	"β orionis":"rigel",
	"α tauri":"aldebaran",
	"α persei":"mirfak",
	"α ceti":"menkar",
	"θ eridani":"acamar",
	"achernar":"acamar",
	"α ursae minoris":"polaris",
	"α arietis":"hamal",
	"α eridani":"achernar",
	"β ceti":"diphda",
	"α cassiopeiae":"schedar",
	"α phoenicis":"ankaa",
	"α andromedae":"alpheratz"
}

var GreekLetterNames={
"α":"alpha",
"β":"beta",
"γ":"gamma",
"δ":"delta",
"ε":"epsilon",
"ζ":"zeta",
"η":"eta",
"θ":"theta",
"ι":"iota",
"κ":"kappa",
"λ":"lambda",
"μ":"mu",
"ν":"nu",
"ξ":"xi",
"ο":"omicron",
"π":"pi",
"ρ":"rho",
"σ":"sigma",
"τ":"tau",
"υ":"upsilon",
"φ":"phi",
"χ":"chi",
"ψ":"psi",
"ω":"omega"
}

var GreekNameLetters=FlipKeysValues(GreekLetterNames);

Keys(StarAliases).map(
	function(alias){
		var	A=alias[0];
		if(In(GreekLetterNames,A)){
			var alpha=GreekLetterNames[A];
			var name=StarAliases[alias];
			delete StarAliases[alias];
				alias=alias.replace(A,alpha).replaceAll(" ","");
			StarAliases[alias]=name;		
		}
	}
);

StarHourAngles={
	"markab":14,
	"fomalhaut":16,
	"al nair":28,//"al na'ir"
	"enif":34,
	"deneb":50,
	"peacock":54,
	"altair":63,
	"nunki":76,
	"vega":81,
	"kaus australis":84,
	"eltanin":91,
	"rasalhague":96,
	"shaula":97,
	"sabik":103,
	"atria":108,
	"antares":113,
	"alphecca":127,
	"kochab":137,
	"zubenelgenubi":138,
	"rigil kentaurus":140,
	"arcturus":146,
	"menkent":149,
	"hadar":149.1,//force order
	"alkaid":153,
	"spica":159,
	"alioth":167,
	"gacrux":172,
	"acrux":174,
	"gienah":176,
	"denebola":183,
	"dubhe":194,
	"regulus":208,
	"alphard":218,
	"miaplacidus":222,
	"suhail":223,
	"avior":234,
	"pollux":244,
	"procyon":245,
	"adhara":256,
	"sirius":259,
	"canopus":264,
	"betelgeuse":271,
	"alnilam":276,
	"elnath":279,
	"bellatrix":279.1,//force order
	"capella":281,
	"rigel":282,
	"aldebaran":291,
	"mirfak":309,
	"menkar":315,
	"acamar":316,
	"polaris":319,
	"hamal":328,
	"achernar":336,
	"diphda":349,
	"schedar":350,
	"ankaa":354,
	"alpheratz":358
}

var HighlightableStars=Keys(StarHourAngles).concat(Keys(StarAliases));