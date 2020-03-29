function Translate(n,languagecodes){
	if(!languagecodes)
		return Translate(n,Last(languages));
	else{
		var transnames=TransNames(n);
		var TransCode=function(code){return TranslateChoose(transnames,code)};
		if(!IsArray(languagecodes))
			languagecodes=[languagecodes];
		return languagecodes.map(TransCode);
	}
}

function TransNames(n){
	return First(translations.filter(PropertyEqualsF("number",n))).names;
}

function TranslateChoose(names,code){
	return names[code]||"???";
}

function MessagePick(codename){
	var ms=messagecodes[codename];
	return TranslateChoose(ms,Last(languages));
}

var translations=[
{number:1,names:{EN:"Water",DE:"Wasser",PT:"Água",FR:"Eau"}},
{number:2,names:{EN:"Fire",DE:"Feuer",PT:"Fogo",FR:"Feu"}},
{number:3,names:{EN:"Cloud",DE:"Wolke",PT:"Nuvem",FR:"Nuage"}},
{number:4,names:{EN:"Air",DE:"Luft",PT:"Ar",FR:"Air"}},
{number:5,names:{EN:"Wind",DE:"Wind",PT:"Vento",FR:"Vent"}},
{number:6,names:{EN:"Tornado",DE:"Tornado",PT:"Tornado",FR:"Tornade"}},
{number:7,names:{EN:"Waterspout",DE:"Wasserhose",PT:"Tromba d'água",FR:"Trombe marine"}},
{number:8,names:{EN:"Fire whirl",DE:"Feuertornado",PT:"Tornado de fogo",FR:"Tourbillon de feu"}},
{number:9,names:{EN:"Earth",DE:"Erde",PT:"Terra",FR:"Terre"}},
{number:10,names:{EN:"Seed",DE:"Samen",PT:"Semente",FR:"Semence"}},
{number:11,names:{EN:"Plant",DE:"Pflanze",PT:"Planta",FR:"Plante"}},
{number:12,names:{EN:"Storm",DE:"Sturm",PT:"Tempestade",FR:"Tempête"}},
{number:13,names:{EN:"Sand",DE:"Sand",PT:"Areia",FR:"Sable"}},
{number:14,names:{EN:"Sandstorm",DE:"Sandsturm",PT:"Tempestade de areia",FR:"Tempête de sable"}},
{number:15,names:{EN:"Rain",DE:"Regen",PT:"Chuva",FR:"Pluie"}},
{number:16,names:{EN:"Lightning",DE:"Blitz",PT:"Relâmpago",FR:"Foudre"}},
{number:17,names:{EN:"River",DE:"Fluss",PT:"Rio",FR:"Rivière"}},
{number:18,names:{EN:"River delta",DE:"Flussdelta",PT:"Delta",FR:"Delta"}},
{number:19,names:{EN:"Waterfall",DE:"Wasserfall",PT:"Cascata",FR:"Chute d'eau"}},
{number:20,names:{EN:"Sea",DE:"Meer",PT:"Mar",FR:"Mer"}},
{number:21,names:{EN:"Beach",DE:"Strand",PT:"Praia",FR:"Plage"}},
{number:22,names:{EN:"Mountain",DE:"Berg",PT:"Montanha",FR:"Montagne"}},
{number:23,names:{EN:"Ice",DE:"Eis",PT:"Gelo",FR:"Glace"}},
{number:24,names:{EN:"Blizzard",DE:"Schneesturm",PT:"Nevão",FR:"Blizzard"}},
{number:25,names:{EN:"Snow",DE:"Schnee",PT:"Neve",FR:"Neige"}},
{number:26,names:{EN:"Hail",DE:"Hagel",PT:"Granizo",FR:"Grêle"}},
{number:27,names:{EN:"Glacier",DE:"Gletscher",PT:"Glaciar",FR:"Glacier"}},
{number:28,names:{EN:"Iceberg",DE:"Eisberg",PT:"Icebergue",FR:"Iceberg"}},
{number:29,names:{EN:"Planet",DE:"Planet",PT:"Planeta",FR:"Planète"}},
{number:30,names:{EN:"Dune",DE:"Düne",PT:"Duna",FR:"Dune"}},
{number:31,names:{EN:"Desert",DE:"Wüste",PT:"Deserto",FR:"Désert"}},
{number:32,names:{EN:"Oasis",DE:"Oase",PT:"Oásis",FR:"Oasis"}},
{number:33,names:{EN:"Comet",DE:"Komet",PT:"Cometa",FR:"Comète"}},
{number:34,names:{EN:"Atmosphere",DE:"Atmosphäre",PT:"Atmosfera",FR:"Atmosphère"}},
{number:35,names:{EN:"Avalanche",DE:"Lawine",PT:"Avalanche",FR:"Avalanche"}},
{number:36,names:{EN:"Ripple",DE:"Undulation",PT:"Ondulação",FR:"Ondulation"}},
{number:37,names:{EN:"Wave",DE:"Wasserwelle",PT:"Onda",FR:"Vague"}},
{number:38,names:{EN:"Breaking wave",DE:"brechende Welle",PT:"Vagalhão",FR:"Déferlante"}},
{number:39,names:{EN:"Tsunami",DE:"Tsunami",PT:"Tsunami",FR:"Tsunami"}},
{number:40,names:{EN:"Lava",DE:"Lava",PT:"Lava",FR:"Lave"}},
{number:41,names:{EN:"Hydrothermal vent",DE:"hydrothermale Quelle",PT:"Fonte hidrotermal",FR:"Mont hydrothermal"}},
{number:42,names:{EN:"Volcano",DE:"Vulkan",PT:"Vulcão",FR:"Volcan"}},
{number:43,names:{EN:"Ash plume",DE:"Aschewolke",PT:"Nuvem de cinzas",FR:"nuage de tephras"}},
{number:44,names:{EN:"Caldera",DE:"Caldera",PT:"Caldeira vulcânica",FR:"Caldeira"}},
{number:45,names:{EN:"Seaweed",DE:"Algen",PT:"Alga",FR:"Algues"}},
{number:46,names:{EN:"Kelp Forest",DE:"Tangwald",PT:"Floresta de kelp",FR:"Forêt de kelp"}},
{number:47,names:{EN:"Phytoplankton",DE:"Phytoplankton",PT:"Fitoplâncton",FR:"Phytoplancton"}},
{number:48,names:{EN:"Pond",DE:"Teich",PT:"Charco",FR:"Étang"}},
{number:49,names:{EN:"Lake",DE:"See",PT:"Lago",FR:"Lac"}},
{number:50,names:{EN:"Tidal bore",DE:"Gezeitenwelle",PT:"Macaréu",FR:"Mascaret"}},
{number:51,names:{EN:"Eutrophication",DE:"Eutrophierung",PT:"Eutrofização",FR:"Eutrophisation"}},
{number:52,names:{EN:"Inselberg",DE:"Inselberg",PT:"Inselbergue",FR:"Inselberg"}},
{number:53,names:{EN:"Mangrove swamp",DE:"Mangrove",PT:"Mangal",FR:"Mangrove"}},
{number:54,names:{EN:"Ocean",DE:"Ozean",PT:"Oceano",FR:"Océan"}},
{number:55,names:{EN:"Island",DE:"Insel",PT:"Ilha",FR:"Île"}},
{number:56,names:{EN:"Archipelago",DE:"Archipel",PT:"Arquipélago",FR:"Archipel"}},
{number:57,names:{EN:"Atoll",DE:"Atoll",PT:"Atol",FR:"Atoll"}},
{number:58,names:{EN:"Dust devil",DE:"Staubteufel",PT:"Tornado de poeira",FR:"Tourbillon de poussière"}},
{number:59,names:{EN:"Ashes",DE:"Asche",PT:"Cinzas",FR:"Cendres"}},
{number:60,names:{EN:"Embers",DE:"Glut",PT:"Brasas",FR:"Braises"}},
{number:61,names:{EN:"Glass",DE:"Glas",PT:"Vidro",FR:"Verre"}},
{number:62,names:{EN:"Rock",DE:"Felsen",PT:"Rocha",FR:"Rock"}},
{number:63,names:{EN:"Pebble",DE:"Kieselstein",PT:"Seixo",FR:"Galet"}},
{number:64,names:{EN:"Hillock",DE:"Hügel",PT:"Outeiro",FR:"Tertre"}},
{number:65,names:{EN:"Hill",DE:"Anhöhe",PT:"Colina",FR:"Colline"}},
{number:66,names:{EN:"Mountain chain",DE:"Gebirgszug",PT:"Serra",FR:"Chaîne de montagnes"}},
{number:67,names:{EN:"Mountain range",DE:"Gebirge",PT:"Cordilheira",FR:"Cordillère"}},
{number:68,names:{EN:"Stream",DE:"Nebenfluss",PT:"Riacho",FR:"Ruisseau"}},
{number:69,names:{EN:"Rapids",DE:"Stromschnelle",PT:"Rápidos",FR:"Rapides"}},
{number:70,names:{EN:"Whirlpool",DE:"Strudel",PT:"Turbilhão",FR:"Tourbillon"}},
{number:71,names:{EN:"Cliff",DE:"Klippe",PT:"Falésia",FR:"Falaise"}},
{number:72,names:{EN:"Sun",DE:"Sonne",PT:"Sol",FR:"Soleil"}},
{number:73,names:{EN:"Salt",DE:"Salz",PT:"Sal",FR:"Sel"}},
{number:74,names:{EN:"Cataract",DE:"Katarakt",PT:"Catarata",FR:"Cataracte"}},
{number:75,names:{EN:"Valley",DE:"Tal",PT:"Vale",FR:"Vallée"}},
{number:76,names:{EN:"Canyon",DE:"Canyon",PT:"Desfiladeiro",FR:"Gorge"}},
{number:77,names:{EN:"Fjord",DE:"Fjord",PT:"Fiorde",FR:"Fjord"}},
{number:78,names:{EN:"Fault",DE:"Verwerfung",PT:"Falha",FR:"Faille"}},
{number:79,names:{EN:"Continental plate",DE:"tektonische Platte",PT:"Placa tectónica",FR:"Plaque continentale"}},
{number:80,names:{EN:"Solar system",DE:"Sonnensystem",PT:"Sistema solar",FR:"Système solaire"}},
{number:81,names:{EN:"Firestorm",DE:"Feuersturm",PT:"Tempestade ígnea",FR:"Tempête de feu"}},
{number:82,names:{EN:"Solar flare",DE:"Sonneneruption",PT:"Erupção solar",FR:"Éruption solaire"}},
{number:83,names:{EN:"Aurora",DE:"Aurora",PT:"Aurora",FR:"Aurora"}},
{number:84,names:{EN:"Asteroid",DE:"Asteroid",PT:"Asteróide",FR:"Astéroïde"}},
{number:85,names:{EN:"Crater",DE:"Krater",PT:"Cratera",FR:"Cratère"}},
{number:86,names:{EN:"Frozen lake",DE:"gefrorener See",PT:"Lago congelado",FR:"Lac gelé"}},
{number:87,names:{EN:"Frozen river",DE:"gefrorener Fluss",PT:"Rio congelado",FR:"Rivière gelée"}},
{number:88,names:{EN:"Peninsula",DE:"Halbinsel",PT:"Península",FR:"Péninsule"}},
{number:89,names:{EN:"Shrub",DE:"Bush",PT:"Arbusto",FR:"Bush"}},
{number:90,names:{EN:"Tree",DE:"Baum",PT:"Árvore",FR:"Arbre"}},
{number:91,names:{EN:"Forest",DE:"Wald",PT:"Floresta",FR:"Forest"}},
{number:92,names:{EN:"Tropical forest",DE:"Tropischer Wald",PT:"Floresta tropical",FR:"Forêt tropicale"}},
{number:93,names:{EN:"Savannah",DE:"Savanne",PT:"Savana",FR:"Savane"}},
{number:94,names:{EN:"Bush",DE:"Mato",PT:"Mato",FR:"Mato"}},
{number:95,names:{EN:"Estuary",DE:"Mündung",PT:"Estuário",FR:"Estuaire"}},
{number:96,names:{EN:"Breeze",DE:"Brise",PT:"Brisa",FR:"Brise"}},
{number:97,names:{EN:"Glass pebble",DE:"Kieselstein aus Glas",PT:"Seixo de vidro",FR:"Galet de verre"}},
{number:98,names:{EN:"Gale",DE:"Starkwind",PT:"Vendaval",FR:"Bourrasque"}},
{number:99,names:{EN:"Thunderstorm",DE:"Gewitter",PT:"Trovoada",FR:"Orage"}},
{number:100,names:{EN:"Snowstorm",DE:"Schneefall",PT:"Nevada",FR:"Tempête de neige"}},
{number:101,names:{EN:"Volcanic lightning",DE:"Vulkanischer Blitz",PT:"Tempestade vulcânica",FR:"Tempête volcanique"}},
{number:102,names:{EN:"Volcanic island",DE:"Vulkaninsel",PT:"Ilha vulcânica",FR:"Île volcanique"}},
{number:103,names:{EN:"Fulgurite",DE:"Fulgurit",PT:"Fulgurite",FR:"Fulgurite"}},
{number:104,names:{EN:"Lava river",DE:"Lavafluss",PT:"Rio de lava",FR:"Rivière de lave"}},
{number:105,names:{EN:"Submarine volcano",DE:"Unterwasservulkan",PT:"Vulcão submarino",FR:"Volcan sous-marin"}},
{number:106,names:{EN:"Moulin",DE:"Gletschermühle",PT:"Moinho glaciar",FR:"Moulin glaciaire"}},
{number:107,names:{EN:"Brinicle",DE:"Eisstalaktit",PT:"Estalactite de gelo",FR:"Brinicle"}},
{number:108,names:{EN:"Pit cave",DE:"Schachthöhle",PT:"Algar",FR:"Gouffre"}},
{number:109,names:{EN:"Frozen waterfall",DE:"gefrorene Wasserfall",PT:"Cascata congelada",FR:"Chute d'eau gelée"}},
{number:110,names:{EN:"Plasma",DE:"Plasma",PT:"Plasma",FR:"Plasma"}},
{number:111,names:{EN:"Vacuum",DE:"Vakuum",PT:"Vácuo",FR:"Vide"}},
{number:112,names:{EN:"Drainage basin",DE:"Einzugsgebiet",PT:"Bacia hidrográfica",FR:"Bassin versant"}},
{number:113,names:{EN:"Mist",DE:"Dunst",PT:"Névoa",FR:"Brume"}},
{number:114,names:{EN:"Snow tornado",DE:"Schneetornado",PT:"Tornado de neve",FR:"Tourbillon de neige"}},
{number:115,names:{EN:"Frozen pond",DE:"gefrorene Pfütze",PT:"Charco congelado",FR:"Flaque d'eau glacée"}},
{number:116,names:{EN:"Supraglacial lake",DE:"supraglazialer See",PT:"Lago supraglaciar",FR:"Lac supraglaciaire"}},
{number:117,names:{EN:"Penitente",DE:"Büßereis",PT:"Penitente de neve",FR:"Pénitents de neige"}},
{number:118,names:{EN:"Islet",DE:"Eiland",PT:"Ilhéu",FR:"Îlot"}},
{number:119,names:{EN:"Coral reef",DE:"Korallenriff",PT:"Recife de coral",FR:"Récif corallien"}},
{number:120,names:{EN:"Shoal",DE:"Sandbank",PT:"Banco de areia",FR:"Banc de sable"}},
{number:121,names:{EN:"Lagoon",DE:"Lagune",PT:"Lagoa",FR:"Lagune"}},
{number:122,names:{EN:"Cay",DE:"Cay",PT:"Cayo",FR:"Caye"}},
{number:123,names:{EN:"Bay",DE:"Bucht",PT:"Baía",FR:"Baie"}},
{number:124,names:{EN:"Skerry",DE:"Schäre",PT:"Escolho",FR:"Écueil"}},
{number:125,names:{EN:"Cove",DE:"Cala",PT:"Enseada",FR:"Crique"}},
{number:126,names:{EN:"River island",DE:"Flussinsel",PT:"Ilha fluvial",FR:"Île fluviale"}},
{number:127,names:{EN:"Sea stack",DE:"Brandungspfeiler",PT:"Roca",FR:"Stack"}},
{number:128,names:{EN:"Pillow lava",DE:"Kissenlava",PT:"Lava em almofada",FR:"lave en coussins"}},
{number:129,names:{EN:"Supercell",DE:"Superzellengewitter",PT:"Tempestade girante",FR:"Orage supercellulaire"}},
{number:130,names:{EN:"Mud",DE:"Schlemm",PT:"Lama",FR:"Boue"}},
{number:131,names:{EN:"Slush",DE:"Schneematsch",PT:"Neve suja",FR:"Neige fondante"}},
{number:132,names:{EN:"Puddle",DE:"Pfütze",PT:"Poça",FR:"Flaque"}},
{number:133,names:{EN:"Swamp",DE:"Sumpf",PT:"Pântano",FR:"Marais"}},
{number:134,names:{EN:"Marsh",DE:"Marschland",PT:"Marisma",FR:"Marrécage"}},
{number:135,names:{EN:"Bog",DE:"Moor",PT:"Paúl",FR:"Tourbière"}},
{number:136,names:{EN:"Moss",DE:"Moose",PT:"Musgo",FR:"Mousse"}},
{number:137,names:{EN:"Calm",DE:"Ruhe",PT:"Calmaria",FR:"Calme"}},
{number:138,names:{EN:"Dust",DE:"Staub",PT:"Poeira",FR:"Poussière"}},
{number:139,names:{EN:"Mirage",DE:"Fata morgana",PT:"Miragem",FR:"Mirage"}},
{number:140,names:{EN:"Cay sand",DE:"Korallensand",PT:"Areia de coral",FR:"Sable corallien"}},
{number:141,names:{EN:"Plain",DE:"Ebene",PT:"Planície",FR:"Plaine"}},
{number:142,names:{EN:"Plateau",DE:"Hochebene",PT:"Planalto",FR:"Plateau"}},
{number:143,names:{EN:"Maelstrom",DE:"Maelstrom",PT:"Maelstrom",FR:"Maelstrom"}},
{number:144,names:{EN:"Vortex",DE:"Vortex",PT:"Vórtice",FR:"Vortex"}},
{number:145,names:{EN:"Von Kárman vortex street",DE:"Kármánsche Wirbelstraße",PT:"Rua de vórtices de Kármán",FR:"Allée de tourbillons de Karman"}},
{number:146,names:{EN:"Cosmic dust",DE:"Kosmischer Staub",PT:"Poeira cósmica",FR:"Poussière cosmique"}},
{number:147,names:{EN:"Nabkha",DE:"Nabkha",PT:"Nabkha",FR:"Nabkha"}},
{number:148,names:{EN:"Rainbow",DE:"Regenbogen",PT:"Arco-íris",FR:"Arc en ciel"}},
{number:149,names:{EN:"Nebula",DE:"Nebel",PT:"Nebulosa",FR:"Nébuleuse"}},
{number:150,names:{EN:"Dew",DE:"Tau",PT:"Orvalho",FR:"Rosée"}},
{number:151,names:{EN:"Frost",DE:"Reif",PT:"Geada",FR:"Gelée blanche"}},
{number:152,names:{EN:"Salt flat",DE:"Salztonebene",PT:"Salar",FR:"Salar"}},
{number:153,names:{EN:"Spark",DE:"Funke",PT:"Faísca",FR:"Étincelle"}},
{number:154,names:{EN:"Magma",DE:"Magma",PT:"Magma",FR:"Magma"}},
{number:155,names:{EN:"Steppe",DE:"Steppe",PT:"Estepe",FR:"Steppe"}},
{number:156,names:{EN:"Explosion",DE:"Explosion",PT:"Explosão",FR:"Explosion"}},
{number:157,names:{EN:"Floodplain",DE:"Flussaue",PT:"Várzea",FR:"Lit majeur"}},
{number:158,names:{EN:"Mid-ocean ridge",DE:"Mittelozeanischer Rücken",PT:"Dorsal oceânica",FR:"Dorsale"}},
{number:159,names:{EN:"Meadow",DE:"Wiese",PT:"Prado",FR:"Prairie"}},
{number:160,names:{EN:"Air bubble ring",DE:"Blasenring",PT:"Anel de bolhas de ar",FR:"Anneau de bulles"}},
{number:161,names:{EN:"Air bubble",DE:"Luftblase ",PT:"Bolha de ar",FR:"Bulle"}}

];


var messagecodes={
	"GameReset":{
		"DE":"Willkommen zu Combinatura! [Alpha Version]",
		"EN":"Welcome to Combinatura! [Alpha version]",
		"FR":"Bienvenu a Combinatura! [version Alpha]",
		"PT":"Bem-vindo à Combinatura! [versão Alfa]"},
	"GameLoad":{
		"DE":"Willkommen nochmal zu Combinatura! [Alpha Version]",
		"EN":"Welcome back to Combinatura! [Alpha version].",
		"FR":"Bienvenu encore a Combinatura! [version Alpha]",
		"PT":"Bem-vindo novamente à Combinatura! [versão Alfa]"},
	"FoundNew":{
		"DE":"entdeckt!",
		"EN":"uncovered!",
		"FR":"trouvé!",
		"PT":"é uma nova descoberta!"},
	"AllCombos":{
		"DE":" hat keine anderen Kombinationen und wurde versteckt!",
		"EN":" has no more combinations so it was hidden!",
		"FR":" n'a plus de combinaisons donc était caché!",
		"PT":" não possui mais combinações logo foi retirado!"},
	"Win":{
		"DE":"Alle Elemente wurden gefunden!",
		"EN":"All elements found! Enter the",
		"FR":"Tous les élements sont trouvés!",
		"PT":"Todos os elementos foram encontrados!"},
	"languageadded":{
		"DE":"Deutsche Sprache wurde gewählt.",
		"EN":"English language selected.",
		"FR":"Langue française choisi.",
		"PT":"Língua portuguesa seleccionada."},
	"languageremoved":{
		"DE":"Deutsche Sprache wurde entfernt.",
		"EN":"English language removed.",
		"FR":"Langue française oublié.",
		"PT":"Língua portuguesa removida."},
	"zen":{
		"DE":"           Zen Modus            ",
		"EN":"           Zen Mode            ",
		"FR":"           Mode Zen            ",
		"PT":"           Modo Zen            "},
	"wrongcombo":{
		"DE":"Ich erwartete einen anderen Element:",
		"EN":"I expected to get a different element:",
		"FR":"J'espérerais d'obtenir un autre élement:",
		"PT":"Esperava obter outro elemento:"},
	"newcombo":{
		"DE":"Ich erwartete:",
		"EN":"I expected to get:",
		"FR":"J'espérerais d'obtenir:",
		"PT":"Esperava obter:"}
}

/*
function TranslateNameLegacy(name){
	if(Card(name))
		return TranslateChoose(TransNames(CardNumber(Card(name))),"EN");
	else
		return name;
}

function TranslateCardLegacy(card){
	card.name=TranslateNameLegacy(card);
	card=CardEvoMap(card,function(e){e.result=TranslateNameLegacy(e.result);return e;})
	return card;
}

function TranslateLegacy(){
	var r=[];
	for(var i=0;i<cards.length;i++)
		r.push(TranslateCardLegacy(Clone(cards[i])))
	return r;
}

function CardEvo(n){
	return Card(n).evo;
}
function CardEvoMap(card,F){
	var evo=CardEvo(card);
	if(evo.length)
		evo.map(F);
	return card;
}
*/