HyperText("People",function(){return ""})

var PeopleObj={
	// FERNANDES:{TYPE:"Developer",name:"William Fernandes",alias:"10c8",TWITTER:"10c8_",PERSONAL_PAGE:"https://10c8.github.io"},
	// HESKHWIS:{TYPE:"Developer",name:"Rémi Töötätä",alias:"HeskHwis",TWITTER:"HeskHwis",ITCH:"heskhwis"},
	// LESLO:{TYPE:"Developer",name:"Lucas LeSlo",TWITTER:"leslodev"},
	// HAZELDEN:{TYPE:"Developer",name:"Alan Hazelden",alias:"Draknek",TWITTER:"draknek"},
	// LAVELLE:{TYPE:"Developer",name:"Stephen Lavelle",alias:"Increpare",TWITTER:"increpare"},
	// PUZZLESCRIPT_COMMUNITY:{TYPE:"Community",name:"Puzzlescript forum community members",PERSONAL_PAGE:"https://groups.google.com/forum/#!forum/puzzlescript"},
	// THINKY:{TYPE:"Community",name:"Thinky Puzzle Games discord server",PERSONAL_PAGE:"https://discord.gg/ZkV2zdb"},
	// HUNKYDORY:{TYPE:"Developer",name:"Hunkydory"},
	// MOKESMOE:{TYPE:"Developer",name:"Tim Nicholson",alias:"mokesmoe",TWITTER:"mokesmoe"},
	// THATSCAR:{TYPE:"Developer",name:"Skalmantas Šimenas",alias:"that Scar"},
	// JOEL:{TYPE:"Developer",name:"Joel Fox",GITHUB_IO:"joelthefox"},
	// MARCOSD:{TYPE:"Developer",name:"Marcos Donnantuoni",TWITTER:"marcos_don"},
	// RICHARDSON:{TYPE:"Developer",name:"Mark Richardson",alias:"Hand-e-food",GOOGLE_PLUS:"112121953522427737858"},
	// MATTISON:{TYPE:"Developer",name:"S. Mattison",GOOGLE_PLUS:"116049570908402327989"},
	// CHZ:{TYPE:"Developer",name:"Ili Butterfield",alias:"Chz",ITCH:"chz"},
	// PERCONTI:{TYPE:"Developer",name:"Jamie Perconti",TWITTER:"InfinitNutshell"},
	// ESCAPER:{TYPE:"Developer",name:"William Hu",alias:"TheGreatEscaper",PERSONAL_PAGE:"http://warpdoor.com/tag/thegreatescaper/"},
	// VANDEVANDER:{TYPE:"Developer",name:"Matthew VanDevander",TWITTER:"mvandevander"},
	// GRANT:{TYPE:"Developer",name:"Elyot Grant",PERSONAL_PAGE:"http://lunarchstudios.com/"},
	// AHLMAN:{TYPE:"Developer",name:"Ove Ahlman",TWITTER:"ahlmanove"},
	// EDDERIOFER:{TYPE:"Developer",alias:"Edderiofer",TWITTER:"edderiofer"},
	// PERSONMAN:{TYPE:"Developer",name:"Personman"},
	// ONE:{TYPE:"Developer",name:"Doomsday One"},
	// WAINWRIGHT:{TYPE:"Publikum",name:"Mark Wainwright"},
	// QUESTIONER:{TYPE:"Publikum",alias:"Questioner"},
	// JUNG:{TYPE:"Developer",name:"Nils Jung"},
	// SCHUELLER:{TYPE:"Developer",name:"Lukas Schüller"},
	// BONTE:{TYPE:"Developer",name:"Bart Bonte",TWITTER:"bartbonte"},
	// KNAUF:{TYPE:"Developer",name:"Tim Knauf",TWITTER:"timknauf"},
	// LANCE:{TYPE:"Developer",name:"Jack Lance",TWITTER:"Jack_L_Lance"},
	// SHADOW:{TYPE:"Developer",name:"Mark Signorelli",alias:"Rosden Shadow",TWITTER:"Rosden_Shadow"},
	// CYATHEA:{TYPE:"Developer",name:"Cyathea Tree Studio",TWITTER:"cyatheatree",PERSONAL_PAGE:"http://cyatheatree.com/"},
	// PICKEL:{TYPE:"Developer",name:"Chris Pickel",alias:"Sfiera",GOOGLE_PLUS:"103135105268961087396"},
	// CHYME:{TYPE:"Developer",alias:"Chyme",ITCH:"chyme"},
	// TYRRELL:{TYPE:"Developer",name:"Malcolm Tyrrell",PERSONAL_PAGE:"https://sites.google.com/site/malcolmsprojects/"},
	// KOSWARA:{TYPE:"Developer",name:"Ivan Koswara",alias:"Chaotic Iak",TWITTER:"chaotic_puzzles",PERSONAL_PAGE:"https://chaosatthesky.wordpress.com/"},
	// HUGO:{TYPE:"Developer",name:"Hugo B.",TWITTER:"HugoBDesigner",PERSONAL_PAGE:"https://hugobdesigner.blogspot.com/"},
	// NIKKAH:{TYPE:"Developer",name:"Ali Nikkah",TWITTER:"alinikk_"},
	// LOCKE:{TYPE:"Developer",name:"Richard Locke",PERSONAL_PAGE:"http://www.richardlocke.co.uk"},
	// GASHLIN:{TYPE:"Developer",name:"Adam Gashlin",PERSONAL_PAGE:"https://gashlin.net/"},
	// MAJAVA:{TYPE:"Developer",name:"Jere Majava"},
	// REILLY:{TYPE:"Developer",name:"Ben Reilly",PERSONAL_PAGE:"https://www.ben-reilly.com/"},
	// CONNORSES:{TYPE:"Developer",name:"Connor McHarney",GOOGLE_PLUS:"+Connorses"},
	// CUBESTUDIO:{TYPE:"Developer",name:"Noa Hoffmann",alias:"Noa Cube Studio",TWITTER:"noa_cubestudio"},
	// Whitesand:{TYPE:"Musician",name:"Martyn Laur",alias:"Whitesand",TWITTER:"martynlaur"},
	// Stellardrone:{TYPE:"Musician",name:"Edgaras",alias:"Stellardrone",PERSONAL_PAGE:"https://stellardrone.bandcamp.com/"},
	// Kevin_MacLeod:{TYPE:"Musician",name:"Kevin MacLeod",PERSONAL_PAGE:"https://incompetech.com/"},
	// Tim_Beek:{TYPE:"Musician",name:"Tim Beek",PERSONAL_PAGE:"http://timbeek.com"},
	// Longzijun:{TYPE:"Musician",name:"Longzijun",PERSONAL_PAGE:"https://longzijun.wordpress.com/"},
	// KUTILEK:{TYPE:"Developer",name:"Jack Kutilek",ITCH:"jackkutilek"},
	// PATRICK:{TYPE:"Developer",name:"Patrick Traynor",alias:"Patrickgh3",TWITTER:"clockworkpat"},
	// Sappheiros:{TYPE:"Musician",name:"Sappheiros",TWITTER:"sappheirosmusic"},
	// ZABEL:{TYPE:"Developer",name:"Zachary Abel",alias:"Zabel"},
	// MJAU:{TYPE:"Developer",name:"Mjau",TWITTER:"kamjau"},
	// Ju_nya:{TYPE:"Musician",name:"Ju-nya",PERSONAL_PAGE:"https://soundcloud.com/ju-nya/"},
	// REGEHR:{TYPE:"Developer",name:"Blake Regehr"},
	// Sei_Mutsuki:{TYPE:"Musician",name:"Sei Mutsuki",PERSONAL_PAGE:"https://seimutsuki.bandcamp.com/"},
	// Camille_Saint_Saens:{TYPE:"Musician",name:"Camille Saint-Saëns",PERSONAL_PAGE:"https://en.wikipedia.org/wiki/Camille_Saint-Saëns"},
	// Gustav_Holst:{TYPE:"Musician",name:"Gustav Holst",PERSONAL_PAGE:"https://en.wikipedia.org/wiki/Gustav_Holst"},
	// MINOTALEN:{TYPE:"Developer",alias:"minotalen",TWITTER:"minotalen"},
	// LKREJG:{TYPE:"Press",alias:"Lkrejg",TWITTER:"lkrejg"},
	// LEXALOFFLE:{TYPE:"Developer",name:"Joseph White",alias:"Lexaloffle",PERSONAL_PAGE:"https://www.lexaloffle.com/"},
	// GAHR:{TYPE:"Developer",name:"Joel Gahr",ITCH:"joelgahr"},
	// SKYCHAN:{TYPE:"Developer",name:"Sky Chan",ITCH:"skyychann"},
	// WILLIAMS:{TYPE:"Developer",name:"John M. Williams",alias:"Gate 88",TWITTER:"gateeightyeight",ITCH:"gate"},
	// ZUBOVIC:{TYPE:"Developer",name:"Dario Zubovic",TWITTER:"dario_zubovic"},
	// SPLEEEN:{TYPE:"Developer",alias:"Spleeen",ITCH:"spleeen"},
	// CLARK:{TYPE:"Developer",name:"Ethan Clark",alias:"EPGA Studios",TWITTER:"EthanIClark1"},
	// NCRECC:{TYPE:"Developer",name:"Nathan Recchia",alias:"Ncrecc"},
	// DANWILLIAMS:{TYPE:"Developer",name:"Dan Williams",TWITTER:"videospacegames"},
	// JCMILLER:{TYPE:"Developer",name:"J. C. Miller",alias:"jcGyo",GITHUB_COM:"jcmiller11"},
	// OBSCURE:{TYPE:"Developer",name:"Xavier Direz",alias:"Narkhos",PERSONAL_PAGE:"http://lafaceobscuredupixel.fr/"},
	// WELLS:{TYPE:"Developer",name:"Cristopher Wells",alias:"Toph Wells",ITCH:"tophwells"},
	// DAVIDPFX:{TYPE:"Developer",name:"David PFX",GITHUB_COM:"david-pfx"},
	// TOWS:{TYPE:"Developer",name:"Guilherme Stutz Töws",alias:"Zaratustra Productions",GITHUB_COM:"zarawesome",ITCH:"zaratustra"},
	// FARBS:{TYPE:"Developer",alias:"Farbs",TWITTER:"FarbsMcFarbs",PERSONAL_PAGE:"farbs.org"},
	// HITCHMAN:{TYPE:"Developer",name:"Ryan Hitchman",PERSONAL_PAGE:"https://the8bitpimp.wordpress.com/"},
	// WHITEHEAD:{TYPE:"Developer",name:"Nathan Whitehead",GITHUB_COM:"nwhitehead"},
	// JD:{TYPE:"Developer",name:"Jonathan",alias:"JD",ITCH:"jdersch"},
	// DEUSOVI:{TYPE:"Developer",alias:"Deusovi",TWITTER:"deusovi",PERSONAL_PAGE:"https://puzzling.stackexchange.com/users/11876/deusovi"},
	// MAGO:{TYPE:"Developer",alias:"mago314"},
	// KNEXATOR:{TYPE:"Developer",name:"Daniel Hurtado",alias:"knexator"},
	// JOSHUASTONE:{TYPE:"Developer",name:"Joshua Stone",TWITTER:"IAmJoshuaStone"},
	// ANTHROPY:{TYPE:"Developer",name:"Anna Anthropy",ITCH:"w"},
	// SCHATZ:{TYPE:"Developer",name:"Phil Schatz",PERSONAL_PAGE:"https://philschatz.com/"},
	// BUILDER17:{TYPE:"Developer",alias:"Builder17"},
	// SCHOOTEN:{TYPE:"Developer",name:"Boris van Schooten"},
	// AGUST:{TYPE:"Developer",name:"Thordur Agust",ITCH:"thordur"},
	// SEGREE:{TYPE:"Developer",name:"Jonah Segree"},
	// DAVIS:{TYPE:"Developer",name:"Benjamin Davis",GITHUB_COM:"raggy"},
	// FITZPATRICK:{TYPE:"Developer",name:"Ian Fitzpatrick",PERSONAL_PAGE:"http://ianfitzpatrick.com/"},
	// AU:{TYPE:"Developer",name:"Dennis Au"},
	// PALMERI:{TYPE:"Developer",name:"Jim Palmeri",TWITTER:"jimpalmeri"},
	// PIXELARTM:{TYPE:"Developer",alias:"Pixelartm",ITCH:"pixelartm"},
	// DABRILA:{TYPE:"Developer",name:"Justas Dabrila",ITCH:"ssstormy",TWITTER:"justas_dabrila"},
	// PRAUSE:{TYPE:"Developer",name:"Denis Prause",alias:"Zejety",GITHUB_COM:"zejety"},
	// PARACHOR:{TYPE:"Developer",alias:"Parachor",ITCH:"parachor"},
	// CROUBBLE:{TYPE:"Developer",name:"Crouble",alias:"NarrowAdder",TWITTER:"Croubble",ITCH:"dazed-pidgeon"},
	// PLURMORANT:{alias:"Plurmorant",TWITTER:"schulzy12"},
	// COLLINEYE:{TYPE:"Developer",name:"Patrick Collin Eye",TWITTER:"collin_eye"},
	// ZENOROGUE:{TYPE:"Developer",alias:"ZenoRogue",TWITTER:"ZenoRogue"},
	// ZARFEBLONG:{TYPE:"Developer",name:"Andrew Plotkin",alias:"zarfeblong",TWITTER:"zarfeblong"},
	// UBUNTOR:{TYPE:"Developer",name:"Samuel Kim",alias:"ubuntor",GITHUB_COM:"ubuntor"},
	// HEDEHOLM:{TYPE:"Developer",name:"Kristian Hedeholm",TWITTER:"kristianhede"},
	// PORTPONKY:{TYPE:"Developer",alias:"Portponky",TWITTER:"portponky"},
	// BLUBBERQUARK:{TYPE:"Developer",name:"Blubberquark",TWITTER:"blubberquark"},
	// DELTA:{name:"Katelyn Delta"},
	// SKYMOO:{alias:"Skymoo"},
	// VELLEIC:{alias:"Velleic"},
	// SOFTFRO:{name:"SoftFro",PERSONAL_PAGE:"https://cryptics.jackbrounstein.com/user/27"},
	"mansfield":{name:"Robert Mansfield",alias:"sftrabbit",TWITTER:"sftrabbit"},
	// KAROO:{name:"Karoo"},
	// HEMPULI:{name:"Arvi Teikari",alias:"Hempuli",PERSONAL_PAGE:"https://www.hempuli.com/"},
	// PANCELOR:{alias:"Pancelor",ITCH:"pancelor"},
	"dohz":{alias:"dohz",ITCH:"dohz"},
	"toomblercatz":{alias:"toomblercatz",ITCH:"toombler"},
}


PersonalPage=function(linkObj){
	if(linkObj.ITCH)
		return "https://"+UnFunction(linkObj.ITCH)+v.ITCH_URL();
	if(linkObj.TWITTER)
		return v.TWITTER_URL()+UnFunction(linkObj.TWITTER);
	if(linkObj.GITHUB_IO)
		return "https://"+UnFunction(linkObj.GITHUB_IO)+v.GITHUB_IO_URL();
	if(linkObj.GITHUB_COM)
		return "https://"+UnFunction(linkObj.GITHUB_COM)+v.GITHUB_COM_URL();
	if(linkObj.PERSONAL_PAGE)
		return UnFunction(linkObj.PERSONAL_PAGE);
	if(linkObj.GOOGLE_PLUS)
		return v.GOOGLE_PLUS_URL()+UnFunction(linkObj.GOOGLE_PLUS);
	else
		return "";
}
	
NameAliasString=function(linkObj){
	var name=UnFunction(linkObj.name);
	var alias=UnFunction(linkObj.alias||"");
	
	if(!name&&alias)
		return alias;
	else if(alias)
		return `${name} (${alias})`;
}

PersonHTML=function(linkObj){
	var page=PersonalPage(linkObj);
	var name=`<span class="name">${NameAliasString(linkObj)}</span>`;

	if(page!=="")
		return AHTML(name,page);
	else
		return name;
}
	
Keys(PeopleObj).map(k=>HyperText("People/"+k,()=>PersonHTML(PeopleObj[k])));