var Nuclei={
'actinium':'ac',
'silver':'ag',
'aluminium':'al',
'americium':'am',
'argon':'ar',
'arsenic':'as',
'astatine':'at',
'gold':'au',
'boron':'b',
'barium':'ba',
'beryllium':'be',
'bohrium':'bh',
'bismuth':'bi',
'berkelium':'bk',
'bromine':'br',
'carbon':'c',
'calcium':'ca',
'cadmium':'cd',
'cerium':'ce',
'californium':'cf',
'chlorine':'cl',
'curium':'cm',
'copernicium':'cn',
'cobalt':'co',
'chromium':'cr',
'caesium':'cs',
'copper':'cu',
'deuterium':'d',
'dubnium':'db',
'darmstadtium':'ds',
'dysprosium':'dy',
'erbium':'er',
'einsteinium':'es',
'europium':'eu',
'fluorine':'f',
'iron':'fe',
'flerovium':'fl',
'fermium':'fm',
'francium':'fr',
'gallium':'ga',
'gadolinium':'gd',
'germanium':'ge',
'hydrogen':'h',
'helium':'he',
'hafnium':'hf',
'mercury':'hg',
'holmium':'ho',
'hassium':'hs',
'iodine':'i',
'indium':'in',
'iridium':'ir',
'potassium':'k',
'krypton':'kr',
'lanthanum':'la',
'lithium':'li',
'lawrencium':'lr',
'lutetium':'lu',
'livermorium':'lv',
'moscovium':'mc',
'mendelevium':'md',
'magnesium':'mg',
'manganese':'mn',
'molybdenum':'mo',
'meitnerium':'mt',
'nitrogen':'n',
'sodium':'na',
//'natrium':'na',
'niobium':'nb',
'neodymium':'nd',
'neon':'ne',
'nihonium':'nh',
'nickel':'ni',
'nobelium':'no',
'neptunium':'np',
'oxygen':'o',
'oganesson':'og',
'osmium':'os',
'phosphorus':'p',
'protactinium':'pa',
'lead':'pb',
'palladium':'pd',
'promethium':'pm',
'polonium':'po',
'praseodymium':'pr',
'platinum':'pt',
'plutonium':'pu',
'radium':'ra',
'rubidium':'rb',
'rhenium':'re',
'rutherfordium':'rf',
'roentgenium':'rg',
'rhodium':'rh',
'radon':'rn',
'ruthenium':'ru',
'sulfur':'s',
'sulphur':'s',
'antimony':'sb',
'scandium':'sc',
'selenium':'se',
'seaborgium':'sg',
'silicon':'si',
'samarium':'sm',
'tin':'sn',
'strontium':'sr',
'tantalum':'ta',
'terbium':'tb',
'technetium':'tc',
'tellurium':'te',
'thorium':'th',
'titanium':'ti',
'thallium':'tl',
'thulium':'tm',
'tennessine':'ts',
'uranium':'u',
'vanadium':'v',
'tungsten':'w',
'xenon':'xe',
'yttrium':'y',
'ytterbium':'yb',
'zinc':'zn',
'zirconium':'zr'
}
/*
new ideas:carbonate, ironclad

easyElements=`
0: "silver"				EASY
​4: "carbon"			DIRECT
​5: "copper"			DIRECT	
​9: "oganesson" 		MISLEADING (NICE), yet CUMBERSOME
​10: "phosphorus"		BORING
​11: "silicon"			DIRECT
​12: "tin"				EASY
​14: "xenon"			DIRECT
​`;

branchingElements=`
​1: "arsenic" 			EASY
​2: "astatine" 			DIRECT
​3: "bismuth" 			EASY
​6: "iron"				NOT BAD
​7: "krypton" 			OK
​8: "neon"				DIRECT
​13: "tennessine" 		EASY
​`
*/
var NucleiAbbs=Values(Nuclei);
var NucleiNames=Keys(Nuclei);

function DivideElementName(element){
	var names=[element];var name;
	var i,ab;
	var found=false
	while(!found&&names.length>0){
			
			name=First(names);
			names=Rest(names);

			var i=0;
			while(i<NucleiAbbs.length){
				ab=NucleiAbbs[i];
				if(Prefixed(name,ab)){
					console.log(name,"--->",ab);
					names.push(UnPrefix(name,ab));
					found=(UnPrefix(name,ab)==="");
				}
			i++;
			}

	}
	return found;
}

