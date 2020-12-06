function GenericInclusionCondition(word,alphabet){
	return word.toUpperCase().split("").every(w=>In(alphabet,w));
}

//Genetic
var InclusionConditions={
	"Genetic":function(word){
		return GenericInclusionCondition(word,["A","C","D","E","F","G","H","I","K","L","M","N","P","Q","R","S","T","V","W","Y"])
	},
	"Dividi":function(word){
		return GenericInclusionCondition(word,"IVXLCDM");
	},
	"Deaf":function(word){
		return GenericInclusionCondition(word,"ABCDEF");
	},
	"Odd":function(word){
		return !In(word,"ODD")&&!In(word,"EVEN");
	},
	"WASD":function(word){
		var a=word.split("");
		return GenericInclusionCondition(word,"WASD")&&Count(a,"W")<=1&&Count(a,"A")<=1&&Count(a,"S")<=1&&Count(a,"D")<=1;
	},
	"Anagram":function(word){
		return GenericInclusionCondition(word,"ANAGRAM");
	},
	"Hiragana":function(word){
		return GenericInclusionCondition(word,"BCDFGHJKLMNPQRSTVWXYZ");
	},
	// "Consonant":function(word){
	// 	return !In(word,"Y")&&;
	// },
	"Nigeria":function(word){
		return In(Countries,word)||In(Capitals,word);
	},
	"Rise":function(word){
		return !In(word,"A");
	},
	"Falls":function FallsInclusionCondition(word){
		var alphabet="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		var al=alphabet.length;
		var l=word.length;
		var ok=true;
		for(var i=1;ok&&i<=l;i++){
			ok=In(alphabet.slice(0,al-(l-i)),word[i-1]);
		}
		return ok;
	},
	"Ironclad":function(w){return DivideElementName(w.toLowerCase())},
	"Shepherdess hence unladylike":function(word){
		return Keys(Gendered).every(g=>!In(word.toLowerCase(),g.toLowerCase()));
	},
	"Latent clones":function(word){
		return ["thirteen"].every(g=>!In(word.toLowerCase(),g.toLowerCase()));
	},
	"Consonant":function(word){
		return !In(conso,word.toLowerCase())&&!In(word,"Y");
	}
}

function IncludedLevels(word){
	var w=word.toUpperCase();
	return Keys(InclusionConditions).filter(k=>InclusionConditions[k](w));
}


var oddeven=["clodded","clodding","cloddish","codded","codding","coddle","coddled","coddles","coddling","demigoddess","demigoddesses","dodder","doddered","doddering","dodders","doddery","doddle","downtrodden","fodder","fodders","Goddard","goddaughter","goddaughters","goddess","goddesses","mollycoddle","mollycoddled","mollycoddles","mollycoddling","nodded","nodding","noddle","noddled","noddles","noddling","noddy","odd","oddball","oddballs","odder","oddest","oddities","oddity","oddly","oddment","oddments","oddness","odds","plodded","plodder","plodders","plodding","ploddings","podded","podding","prodded","prodding","ramrodded","ramrodding","retrodden","Roddenberry","shoddier","shoddiest","shoddily","shoddiness","shoddy","sodded","sodden","soddenly","sodding","Soddy","Todd","toddies","toddle","toddled","toddler","toddlers","toddles","toddling","toddy","trodden","untrodden","eleven","elevens","elevenses","eleventh","elevenths","even","evened","evener","evenest","evenhanded","evenhandedly","evening","evenings","evenly","evenness","evens","evensong","event","eventful","eventfully","eventfulness","eventide","eventing","events","eventual","eventualities","eventuality","eventually","eventuate","eventuated","eventuates","eventuating","Keven","nonevent","nonevents","prevent","preventable","preventative","preventatives","prevented","preventing","prevention","preventions","preventive","preventives","prevents","revenge","revenged","revengeful","revengefully","revenges","revenging","revenue","revenuer","revenuers","revenues","seven","sevenfold","sevenpence","sevens","seventeen","seventeens","seventeenth","seventeenths","seventh","sevenths","seventies","seventieth","seventieths","seventy","Steven","Stevens","Stevenson","uneven","unevener","unevenest","unevenly","unevenness","uneventful","uneventfully","unpreventable","cloddishnesses","demigoddesses","boddhisattvas","mollycoddling","mollycoddlers","goddamnedest","goddaughters","boddhisattva","cloddishness","shoddinesses","mollycoddled","mollycoddler","mollycoddles","toddlerhoods","soddennesses","downtrodden","goddaughter","mollycoddle","demigoddess","goddamndest","outplodding","toddlerhood","goddamning","goddamming","flyrodders","shoddiness","ramrodding","oddsmakers","outplodded","ploddingly","soddenness","goddamned","doddering","oddsmaker","oddnesses","ramrodded","resodding","shoddiest","noddingly","dodderers","cloddiest","goddammed","foddering","flyrodder","goddesses","soddening","untrodden","doddered","dodderer","cloddier","coddling","coddlers","cloddish","foddered","goddamns","prodders","prodding","resodded","shoddier","shoddies","shoddily","plodders","plodding","oddballs","oddments","oddities","noddling","soddened","soddenly","toddlers","toddling","toddler","goddess","oddball","trodden","goddamn","doddery","oddment","shodden","rodding","prodded","prodder","podding","plodded","plodder","oddness","noddies","nodding","nodders","noddled","noddles","dodders","codders","codding","coddled","coddler","coddles","goddams","fodders","godding","hoddens","hoddins","toddled","toddles","soddens","soddies","sodding","toddies","fodder","shoddy","oddity","sodden","goddam","coddle","noddle","dodder","toddle","oddish","hodden","godded","hoddin","cloddy","codded","codder","oddest","nodded","nodder","podded","sodded","noddy","toddy","soddy","odder","oddly","odds","preventability","revengefulness","preventiveness","eventfulnesses","evenhandedness","uneventfulness","preventatives","eventualities","preventative","preveniently","revengefully","preventively","seventeenths","eventfulness","evenhandedly","uneventfully","unevennesses","seventeenth","eventuality","eventuating","seventieths","preventible","preventions","preventives","preventable","eventually","prevention","preventive","uneventful","evenhanded","seventieth","revengeful","prevenient","preventing","preventers","seventeens","evennesses","breakevens","eventuated","eventuates","eventfully","unevenness","seventeen","breakeven","sevenfold","eventuate","elevenses","evensongs","evenfalls","elevenths","eventless","eventides","revenuers","revenging","seventies","seventhly","misevents","nonevents","revengers","revenants","prevented","preventer","unevenest","eventual","eleventh","eventful","evensong","nonevent","eventide","revenant","evenfall","revenuer","revenues","revenges","revenued","revenual","sevenths","prevents","revenged","revenger","misevent","evenings","evenness","unevener","unevenly","revenue","evening","prevent","seventh","seventy","revenge","swevens","eveners","evenest","elevens","eleven","uneven","evened","evener","evenly","events","sevens","sweven","seven","event","evens"];
var conso=["aah","abs","act","acts","ad","add","adds","ads","adz","aft","ah","aid","aids","ail","ails","aim","aims","air","airs","aitch","alb","albs","all","alms","alp","alps","alts","am","amp","amps","an","and","ands","angst","ankh","ankhs","ans","ant","ants","apt","arc","arch","arcs","ark","arks","arm","arms","art","arts","as","ash","ask","asks","asp","asps","ass","at","aught","aughts","auk","auks","aunt","aunts","awl","awls","awn","awns","ax","each","ear","earl","earls","earn","earns","ears","earth","earths","east","eat","eats","ebb","ebbs","eek","eeks","eel","eels","eff","effs","egg","eggs","eh","eight","eighth","eighths","eights","elf","elk","elks","ell","ells","elm","elms","em","emfs","ems","en","end","ends","ens","eon","eons","er","erg","ergs","err","errs","erst","es","etch","ex","iamb","iambs","id","ids","if","ifs","ilk","ilks","ill","ills","imp","imps","in","inch","ink","inks","inn","inns","ins","ion","ions","irk","irks","is","ism","isms","it","itch","its","oaf","oafs","oak","oaks","oar","oars","oat","oath","oaths","oats","och","odd","odds","of","off","offs","oft","oh","ohm","ohms","ohs","oik","oiks","oil","oils","oink","oinks","old","om","oms","on","ooh","oohs","oomph","oops","ops","opt","opts","or","orb","orbs","ouch","ought","our","ours","oust","ousts","out","outs","ow","owl","owls","own","owns","ox","ugh","uh","um","ump","umps","up","ups","urn","urns","us"];

/*
ODD

HIRAGANA
{brr,by,cry,crypt,crypts,cs,cw,cyst,cysts,db,dc,dry,dryly,drys,fly,flyby,flybys,fry,glyph,glyphs,gs,gym,gyms,gyp,gyps,gypsy,hm,hymn,hymns,jg,kc,kph,ks,kw,ls,lymph,lynch,lynx,mks,ms,my,myrrh,mys,myth,myths,nth,nymph,nymphs,ply,ppm,pry,psst,pssts,psych,psychs,pygmy,pyx,rhythm,rhythms,rs,sh,shh,shy,shyly,sky,sly,slyly,spry,spryly,spy,ssh,sty,sylph,sylphs,sync,syncs,thy,try,tryst,trysts,ts,vhf,vs,why,whys,wry,wryly}

WASD
{a,ad,add,adds,ads,as,ass,dad,dads,sad,sass,saw,saws,wad,wads,was}
*/