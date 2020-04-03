///////////////////////////////////////////////////////////////////////////////
// (C) Pedro PSI 2017-2020
 
///////////////////////////////////////////////////////////////////////////////
//Do nothing
function Identity(i){return i;};
function True(){return true};
function False(){return false};

///////////////////////////////////////////////////////////////////////////////
// Deep equality testing
function EqualArray(a,b){
	if (a.length!==b.length)
		return false;
	else{
		var i=0;
		var equal=true;
		while(i<a.length&&equal){
			equal=Equal(a[i],b[i]);
			i++
		}
		return equal;
	}
}

function EqualObject(a,b){
	return EqualArray(Keys(a),Keys(b))&&EqualArray(Values(a),Values(b));
}

function EqualFunction(a,b){
	return FunctionBody(a)===FunctionBody(b); //Cannot see whether two functions compute the same thing, only whether the source is equal.
}

function EqualRegex(a,b){
	return (a.source===b.source)&&(a.flags===b.flags);
}

function Equal(a,b){
	if(typeof a==="undefined"&&typeof b==="undefined")
		return true;
	else if(typeof a!==typeof b)
		return false;
	else if((typeof a==="string"&&typeof b==="string")||(typeof a==="boolean"&&typeof b==="boolean")||(typeof a==="number"&&typeof b==="number"))
		return a===b;
	else if(IsArray(a)&&IsArray(b))
		return EqualArray(a,b);
	else if(IsObject(a)&&IsObject(b))
		return EqualObject(a,b);
	else if(typeof a==="function"&&typeof b==="function")
		return EqualFunction(a,b);
	else if(IsRegex(a)&&IsRegex(b))
		return EqualRegex(a,b);
	else if(a===b)
		return true;
	else{
		console.log("check this new case:",a,b);
		return false;
	}
}

///////////////////////////////////////////////////////////////////////////////
// Math
var Min=Math.min;
var Max=Math.max;
var Floor=Math.floor;
var Ceiling=Math.ceil;
var Sin=Math.sin;
var Cos=Math.cos;
var PI=Math.PI;
var Abs=Math.abs;
var Round=Math.round;

function Quotient(n,d){
	return Floor(n/d);
}
function Remainder(n,d){
	return Max(n-d*Quotient(n,d),0);
}

function Power(n,exp){
	if(!exp)
		return function(m){return Math.pow(m,n)}
	else
		return Math.pow(n,exp);
}

function PoweredSum(vector,power){
	if(vector.length<1)
		return 0;
	else
		return vector.map(Power(power)).reduce(Accumulate);
}

function VectorOperation(vector1,vector2,F){
	if(vector1.length<1||vector2.length<1)
		return [];
	else{
		if(vector2.length<vector1.length){
			var v1=vector2;
			var v2=vector1;
		}else{
			var v1=vector1;
			var v2=vector2;
		}
		return v1.map(function(x,i){return F(x,v2[i])});
	}
}

function VectorPlus(vector1,vector2){
	return VectorOperation(vector1,vector2,function(a,b){return a+b});
}
function VectorMinus(vector1,vector2){
	return VectorOperation(vector1,vector2,function(a,b){return a-b});
}
function VectorTimes(vector1,vector2){
	return VectorOperation(vector1,vector2,function(a,b){return a*b});
}
function VectorDivide(vector1,vector2){
	return VectorOperation(vector1,vector2,function(a,b){return a/b});
}


function EuclideanDistance(vector1,vector2){
	return Power(PoweredSum(VectorMinus(vector2,vector1),2),1/2);
}

///////////////////////////////////////////////////////////////////////////////
// Lists (AS = Array or String)

function Last(AS){
	if(AS&&AS.length)
		return AS[AS.length-1];
	else
		return null;
}

function First(AS){
	if(AS&&AS.length)
		return AS[0];
	else
		return null;
}

function Rest(AS){
	if(AS&&AS.length){
		if(typeof AS==="string")
			return Rest(AS.split("")).join("");
		else{
			var A=Clone(AS);
			A.shift();
			return A;
		}
	}
	else
		return null;
}

function Most(AS){
	if(AS&&AS.length){
		if(typeof AS==="string")
			return Most(AS.split("")).join("");
		else{
			var A=Clone(AS);
			A.pop();
			return A;
		}
	}
	else
		return null;
}


//Distinguish Objects and Arrays
function IsArray(array){
	if(!array)
		return false;
	return FunctionName(array.constructor)==="Array";
}

function IsObject(obj){
	if(!obj)
		return false;
	return FunctionName(obj.constructor)==="Object";
}

function IsRegex(obj){
	if(!obj)
		return false;
	return FunctionName(obj.constructor)==="RegExp";
}

function IsString(s){
	if(!s)
		return false;
	return typeof s==="string";
}

//Apply function to Array or Object
function Apply(arrayOrObj,F){
	if(IsArray(arrayOrObj))
		return F(arrayOrObj);
	else if(IsObject(arrayOrObj))
		return F(Keys(arrayOrObj));
	else{
		console.log("error, nor array nor object");
		return undefined;
	}
};


function Keys(Obj){
	return Object.keys(Obj)||[];
};
function Values(Obj){
	return Keys(Obj).map(function(k){return Obj[k]})||[];
};

//Flips object keys and values
function FlipKeysValues(Obj){
	var k=Keys(Obj);
	var O={};
	k.map(function(x){O[Obj[x]]=x});
	return O;
};

// Does element exist?
function InArrayOrObj(arrayOrObj,n){
	if(!arrayOrObj)
		return false;
	function F(ao){return ao.indexOf(n)>=0;};
	return Apply(arrayOrObj,F)||false;
};

//Update Object Keys
function MapObject(Obj,F){
	var keys=Keys(Obj);
	for (var i in keys){
		if(Obj.hasOwnProperty(keys[i])){
			F(Obj[keys[i]],keys[i],Obj);
		}
	}
	return Obj;
};

function FilterObject(Obj,F){
	var O={};
	MapObject(Obj,function (v,k,o){
		if(F(v,k))
			O[k]=v;
	})
	return O;
}

function MapKeys(Obj,F){
	var K=[];
	MapObject(Obj,function(value,key,object){K.push(F(value,key,object))});
	return K;
}

function UpdateKeys(Obj,F){
	var keys=Keys(Obj);
	for (var i in keys){
		if(Obj.hasOwnProperty(keys[i])){
			Obj[F(keys[i])]=Obj[keys[i]];
			if(F(keys[i])!==keys[i])
				delete Obj[keys[i]];
		}
	}
	return Obj;
};

function InString(string,n){
	var s=string;
	return n===""||s.replace(n,"")!==string;
}

function In(SAO,n){
	if(typeof SAO==="string")
		return InString(SAO,n);
	else
		return InArrayOrObj(SAO,n);
}

function ContainsF(n){
	return function(SAO){return In(SAO,n)};
}

///////////////////////////////////////////////////////////////////////////////
//Set functions

function Unique(array){
	return array.filter(function(e,i){return array.indexOf(e)===i}).sort();
}

//Complement (force uniqueness, sort)
function Complement(arrayInclude,arrayExclude){
	if(!arrayExclude)
		return Unique(arrayInclude);
	return arrayInclude.filter(function(e,i){return arrayInclude.indexOf(e)===i&&arrayExclude.indexOf(e)<0}).sort();
}

//Intersection (force uniqueness, sort)
function Intersection(array1,array2){
	if(!array2)
		return Unique(array1);
	return array1.filter(function(e,i){return array1.indexOf(e)===i&&array2.indexOf(e)>=0}).sort();
}

//Union (force uniqueness, sort)
function Union(array1,array2){
	if(!array2)
		return Unique(array1);
	return Unique(array1.concat(array2));
}

//Subset (TODO: ARRAYS SUBSET=>SMALLEST===INTERSECTION LARGE WITH SMALLEST)
function Subset(Object,SubsetObject){
	var keys=Keys(SubsetObject);
	return keys.every(k=>Equal(Object[k],SubsetObject[k]));
}

//Object Arrays (BASE)
function BaseFilter(Base,GroupObject){
	return Values(FilterObject(Base,g=>Subset(g,GroupObject)));
}

///////////////////////////////////////////////////////////////////////////////
//Repetitive functions

// Fold
function FoldM(F,x0,xArray){
	if(xArray.length<1){
		return x0;
	}else if(xArray.length===1){
		return F(x0,xArray[0]);
	}else{
		var x1=xArray[0];
		xArray.shift();
		return FoldM(F,F(x0,x1),xArray);
	}
}

function Fold(F,x0,xArray){
	return FoldM(F,x0,xArray.slice());
}

// Fixed point
function FixedPoint(F,x){
	var i=x;
	while(i!==F(i)){
		i=F(i);
	}
	return i;
}



///////////////////////////////////////////////////////////////////////////////
// String Functions

// String Replace
function StringReplaceOnceRule(string,rule){
	return string.replace(rule[0],rule.length>0?rule[1]:"");
}
function StringReplaceRule(string,rule){
	return FixedPoint(function(s){return StringReplaceOnceRule(s,rule);},string);
}
function StringReplaceRuleArray(string,ruleArray){
	return Fold(StringReplaceRule,string,ruleArray);
}
function StringReplaceOnceRuleArray(string,ruleArray){
	return Fold(StringReplaceOnceRule,string,ruleArray);
}

function ObjectRules(Obj){
	var keys=Keys(Obj);
	var a=[];
	for(var i in keys){
		if (Obj.hasOwnProperty(keys[i])){
			a.push([keys[i],Obj[keys[i]]])
		}
	}
	return a;
}

function StringReplaceRulesObject(string,rulesObj){
	return FixedPoint(function(s){return StringReplaceRuleArray(s,ObjectRules(rulesObj))},string);
}

function StringReplace(string,rules){
	if(typeof rules==="string")
		return string.replace(rules,"");
	else if(IsObject(rules)){ //Inversion
		return StringReplaceRulesObject(string,rules);
	}
	else if(IsArray(rules)){
		if(IsArray(rules[0]))
			return StringReplaceRuleArray(string,rules);
		else
			return StringReplaceRule(string,rules);
	}
	else{
		console.log("error: can't make string rule from",r);
		return string;
	}
}

// Unspace

function UnWhitespace(string){
	return StringReplace(string,[[/\s/m,""],[/\t/m,""],[/\n/m,""]]);
}
function LowerSimpleString(string){
	return SafeString(UnWhitespace(string).toLowerCase());
}

// Capitalise
function Capitalise(word){
	if(word.length)
		return word[0].toUpperCase()+Rest(word).toLowerCase();
	else
		return word;
}

//Escape

function EscapeToken(token){
	if(token===" ")
		return "\\s";
	if(!In(",;.:-_~^*+´`¨«»'?!'@£§#$%&/|(){}[]=",token))
		return token;
	else
		return "\\"+token;
}

function EscapeTokens(tokenString){
	if(IsArray(tokenString))
		return Alternate(tokenString.map(EscapeTokens));
	return tokenString.split("").map(EscapeToken).join("");
}


// Prefix and Suffix
function UnPrefix(word,prefix){
	if(!prefix)
		return word;
	var prefixFind=new RegExp("^"+EscapeTokens(prefix));
	return StringReplace(word,[prefixFind,""]);
}
function UnPosfix(word,suffix){ //suffix
	if(!suffix)
		return word;
	var suffixFind=new RegExp(EscapeTokens(suffix)+"$");
	return StringReplace(word,[suffixFind,""]);
}
function Prefix(word,prefix){
	if(!prefix)
		return word;
	return prefix+UnPrefix(word,prefix);
}
function Posfix(word,suffix){ //suffix
	if(!suffix)
		return word;
	return UnPosfix(word,suffix)+suffix;
}
function Exfix(word,prefix,suffix){
	var suffix=suffix||prefix;
	return Prefix(Posfix(word,suffix),prefix);
}
function UnExfix(word,prefix,suffix){
	var suffix=suffix||prefix;
	return UnPrefix(UnPosfix(word,suffix),prefix);
}

function Parenthise(word){
	return Exfix(word,"(",")");
}
function Alternate(wordArray){
	return wordArray.map(Parenthise).join("|");
}

function InPrefix(word,prefix){
	return UnPrefix(word,prefix)!==word;
}
function InPosfix(word,suffix){
	return UnPosfix(word,suffix)!==word;
}


// Padding
function PadLR(txt,symbol,n){
	if(symbol==="")
		return "";
	
	var sylen=symbol.length;
	var d=Max(n-txt.length,0);
	var q=Quotient(d,sylen);
	var r=Remainder(d,sylen);
	
	return symbol.repeat(q)+symbol.slice(0,r);
}
function PadLeft(txt,symbol,n){
	return PadLR(txt,symbol,n)+txt;
}
function PadRight(txt,symbol,n){
	return txt+PadLR(txt,symbol,n);
}

function AddLeft(txt,symbol,n){
	return PadLeft(txt,symbol,txt.length+n);
}
function AddRight(txt,symbol,n){
	return PadRight(txt,symbol,txt.length+n);
}


//Stripping
function StripHTML(string){
	return FixedPoint(t=>t
		.replace(/\<img[^\<\>]*\>/ig,"")
		.replace(/\<(.*)[^\<\>]*\>([^\<\>]*)<\/\1\>/ig,"$2")
	,string)
}

//Shortening
function Shorten(string,maxchars){
	if(!string)
		return "";
	else{
		if(string.length<=maxchars)
			return string;
		else
			return string.split("").splice(0,maxchars-3).join("")+"...";
	}
}

//Sentence making
function Enumerate(StringArray){
	if(!StringArray.length)
		return "";
	if(StringArray.length===1)
		return StringArray[0];

	var comma=", ";
	if(StringArray.some(a=>In(a,",")))
		var comma="; ";
	
	var prelast=Last(Most(StringArray))
	var last=Last(StringArray);
	
	if(In(prelast," and ")||In(last," and "));
		var and=" & ";
	
	if(StringArray.length===2)
		return prelast+and+last;
	
	return Most(Most(StringArray)).join(comma)+comma+prelast+and+last;
}

///////////////////////////////////////////////////////////////////////////////
//Get Function Name as a string, or make up a unique one based on the function's body
function FunctionName(FunctionF){
	var name=FunctionF.toString().replace(/\(.*/,"").replace("function ","");
	name=name.replace(/\s.*/gm,"");
	if(name!=="function")
		return name;
	else{
		var body=FunctionF.toString().replace(/[^\)]*\)/,"");
		return body.replace(/[^ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890]/gi,"").replace(/^[1234567890]*/,"");
	}
}

function FunctionBody(FunctionF){
	return FunctionF.toString().replace(/[^\)]*\)/,"");
}

///////////////////////////////////////////////////////////////////////////////
//Join Objects, overwriting conflicting properties
function FuseObjects(obj,newObj){
	var O={};
	function SetValueKey(value,key){O[key]=value};
	if(obj)
		MapObject(obj,SetValueKey);
	if(newObj)
		MapObject(newObj,SetValueKey);
	return O;
}

function FuseObjectArray(objArray){
	if(objArray.length<1)
		return {};
	else{
		var O=objArray[0];
		for(var i=1;i<=objArray.length;i++){
			O=FuseObjects(O,objArray[i])
		}
		return O;
	}
}

function CloneObject(Obj){
	return FuseObjects({},Obj);
}

function CloneArray(Arr){
	return [].concat(Arr);
}

function Clone(AOS){
	if(typeof AOS==="string")
		return AOS;
	else if(IsObject(AOS))
		return CloneObject(AOS);
	else
		return CloneArray(AOS);
}


function Datafy(obj){
	var O={};
	function SetValueKey(value,key){
		var datakey=Prefix(key,"data-");
		O[datakey]=value;
	}
	MapObject(obj,SetValueKey);
	return O;
}

///////////////////////////////////////////////////////////////////////////////
//Regex
function CombineMultiRegex(exprarray,joiner){
	var j="";
	if(joiner){
		j=joiner;
	}
	var regarray=exprarray.map(function(a){return new RegExp(a)});
	regarray=regarray.map(function(a){return(a.source)});
	var comb=new RegExp("("+regarray.join(j)+")","g");
	return comb;
}

function CombineRegex(a,b){
	return CombineMultiRegex([a,b]);
}
function AlternateRegex(exprarray){
	return CombineMultiRegex(exprarray,"|");
}

function ForwardRegex(string){
	return CombineRegex(string,/[\d\D]*/);
}


///////////////////////////////////////////////////////////////////////////////
//URL MANIPULATION

//HEAD 			http://
//DOMAIN 		aaaa.bbb.com
//RELATIVEPATH	/folder1/folder2/
//IDENTIFIER 	page
//EXTENSION 	.html
//TAG			#etc
var domains=["pedropsi.github.io","combinatura.github.io"];
var predomainssoft=AlternateRegex(domains.map(function(d){return CombineRegex(/^[\d\D]*/,d)}));
var predomainshard=AlternateRegex(domains.map(function(d){return CombineRegex(/^(https?:\/\/)*/,d)}));
var posdomains=AlternateRegex(domains.map(function(d){return CombineRegex(d,/[\d\D]*$/)}));
var idomain=CombineRegex(/^/,AlternateRegex(domains));

function Domains(){
	return idomain;
}

//PRIMARY

function PageTitle(){
	return document.title;
}

function PageURL(){
	return ""+window.location;
}

function PageTag(url){
	if(typeof url==="undefined")
		return PageTag(PageURL());
	else
		return url.replace(/([^#]*#)/,"").replace(url,"");
}

function PageUnTag(url){
	if(typeof url==="undefined")
		return PageUnTag(PageURL());
	else{
		var tag="#"+PageTag(url);
		return UnPosfix(url,tag);
	}
}

function PageIdentifier(url){
	if(typeof url==="undefined")
		return PageIdentifier(PageURL());
	else{
		var urlAfter=PageUnTag(url).replace(/(.*\/)/,"");
		if(IsMaybeRoot(urlAfter))
			return "";
		else
			return urlAfter.replace(".html","").replace(".htm","").replace(/\?.*/g,"");
	}
}

function PageUnHead(url){
	if(typeof url==="undefined")
		return PageUnHead(PageURL());
	else
		return url.replace(/[\w\d]*\:(\/\/+)/g,"");
}

function PageHead(url){
	if(typeof url==="undefined")
		return PageHead(PageURL());
	else
		return url.replace(PageUnHead(url),"");
}

function PageAfterOwnDomain(url){
	if(typeof url==="undefined")
		return PageAfterOwnDomain(PageURL());
	else
		return url.replace(predomainssoft,"").replace(/^\//,"");
}

function IsMaybeRoot(urlAfter){
	return (urlAfter.replace(".htm","")===urlAfter)&&(urlAfter.replace(".","")!==urlAfter);
}
function IsSingleton(urlAfter){
	return (urlAfter.replace("/","")===urlAfter);
}
function PageRelativePath(url){
	if(typeof url==="undefined")
		return PageRelativePath(PageURL());
	else{
		var urlAfter=PageUnHead(PageAfterOwnDomain(url));
		if(IsSingleton(urlAfter)){
			if(IsMaybeRoot(urlAfter))
				return "";
			else
				return urlAfter;
		}
		else
			return urlAfter.replace(/\/*$/,"/").replace(/^([\d\w]+\.)+([\d\w]*)/,"").replace(/\/*$/,"").replace(/^\//,"");
	}
}

function PageRoot(url){
	if(typeof url==="undefined")
		return PageRoot(PageURL());
	else{
		return url.replace(PageRelativePath(url),"");
	}
}

function PageIdentifierExtension(url){
	if(typeof url==="undefined")
		return PageIdentifierExtension(PageURL());
	else{
		return url.replace(url.replace(ForwardRegex(PageIdentifier(url)),""),"");
	}
}


function PageAbsolute(url){
	if(typeof url==="undefined")
		return PageAbsolute(PageURL());
	else{
		return PageRoot(url)+PageIdentifierExtension(url);
	}
}



// Safe string loading
function SafeString(tex){
	return String(tex).replace(/[\<\>\=\+\-\(\)\*\'\"]/g,"");
}

function SafeUrl(tex){
	tex=String(tex||"").replace(/[\<\>\+\(\)\*\'\"\#\\\s]+.*/g,"");
	if(!tex)
		return "";
	var prefix="https://";
	if(In(tex,"http:"))
		prefix="http://";
	return Prefix(tex,prefix);
}

//Search queries
function PageSearch(parameter,page){
	var l=document.createElement("a");
	l.href=page||document.URL;
	l=l.search;
	var token=new RegExp(".*\\?.*"+parameter+"\\=");
	var id=l.replace(token,"");
	if(id===l)
		id="";
	return FromUTF8(id.replace(/\&.*/,""));
}

function FromUTF8(string){
	return StringReplace(string,UTF8);
}

var UTF8={
	"%00":" ",
	"%01":" ",
	"%02":" ",
	"%03":" ",
	"%04":" ",
	"%05":" ",
	"%06":" ",
	"%07":" ",
	"%08":" ",
	"%09":" ",
	"%0A":" ",
	"%0B":" ",
	"%0C":" ",
	"%0D":" ",
	"%0E":" ",
	"%0F":" ",
	"%10":" ",
	"%11":" ",
	"%12":" ",
	"%13":" ",
	"%14":" ",
	"%15":" ",
	"%16":" ",
	"%17":" ",
	"%18":" ",
	"%19":" ",
	"%1A":" ",
	"%1B":" ",
	"%1C":" ",
	"%1D":" ",
	"%1E":" ",
	"%1F":" ",
	"%20":" ",
	"%21":"!",
	"%22":'"',
	"%23":"#",
	"%24":"$",
	"%25":"%",
	"%26":"&",
	"%27":"'",
	"%28":"(",
	"%29":")",
	"%2A":"*",
	"%2B":"+",
	"%2C":",",
	"%2D":"-",
	"%2E":".",
	"%2F":"/",
	"%30":"0",
	"%31":"1",
	"%32":"2",
	"%33":"3",
	"%34":"4",
	"%35":"5",
	"%36":"6",
	"%37":"7",
	"%38":"8",
	"%39":"9",
	"%3A":":",
	"%3B":";",
	"%3C":"<",
	"%3D":"=",
	"%3E":">",
	"%3F":"?",
	"%40":"@",
	"%41":"A",
	"%42":"B",
	"%43":"C",
	"%44":"D",
	"%45":"E",
	"%46":"F",
	"%47":"G",
	"%48":"H",
	"%49":"I",
	"%4A":"J",
	"%4B":"K",
	"%4C":"L",
	"%4D":"M",
	"%4E":"N",
	"%4F":"O",
	"%50":"P",
	"%51":"Q",
	"%52":"R",
	"%53":"S",
	"%54":"T",
	"%55":"U",
	"%56":"V",
	"%57":"W",
	"%58":"X",
	"%59":"Y",
	"%5A":"Z",
	"%5B":"[",
	"%5C":"\\",
	"%5D":"]",
	"%5E":"^",
	"%5F":"_",
	"%60":"`",
	"%61":"a",
	"%62":"b",
	"%63":"c",
	"%64":"d",
	"%65":"e",
	"%66":"f",
	"%67":"g",
	"%68":"h",
	"%69":"i",
	"%6A":"j",
	"%6B":"k",
	"%6C":"l",
	"%6D":"m",
	"%6E":"n",
	"%6F":"o",
	"%70":"p",
	"%71":"q",
	"%72":"r",
	"%73":"s",
	"%74":"t",
	"%75":"u",
	"%76":"v",
	"%77":"w",
	"%78":"x",
	"%79":"y",
	"%7A":"z",
	"%7B":"{",
	"%7C":"|",
	"%7D":"}",
	"%7E":"~",
	"%7F":" ",
	"%C2%80":" ",
	"%C2%81":" ",
	"%C2%82":" ",
	"%C2%83":" ",
	"%C2%84":" ",
	"%C2%85":" ",
	"%C2%86":" ",
	"%C2%87":" ",
	"%C2%88":" ",
	"%C2%89":" ",
	"%C2%8A":" ",
	"%C2%8B":" ",
	"%C2%8C":" ",
	"%C2%8D":" ",
	"%C2%8E":" ",
	"%C2%8F":" ",
	"%C2%90":" ",
	"%C2%91":" ",
	"%C2%92":" ",
	"%C2%93":" ",
	"%C2%94":" ",
	"%C2%95":" ",
	"%C2%96":" ",
	"%C2%97":" ",
	"%C2%98":" ",
	"%C2%99":" ",
	"%C2%9A":" ",
	"%C2%9B":" ",
	"%C2%9C":" ",
	"%C2%9D":" ",
	"%C2%9E":" ",
	"%C2%9F":" ",
	"%C2%A0":" ",
	"%C2%A1":"¡",
	"%C2%A2":"¢",
	"%C2%A3":"£",
	"%C2%A4":"¤",
	"%C2%A5":"¥",
	"%C2%A6":"¦",
	"%C2%A7":"§",
	"%C2%A8":"¨",
	"%C2%A9":"©",
	"%C2%AA":"ª",
	"%C2%AB":"«",
	"%C2%AC":"¬",
	"%C2%AD":"­",
	"%C2%AE":"®",
	"%C2%AF":"¯",
	"%C2%B0":"°",
	"%C2%B1":"±",
	"%C2%B2":"²",
	"%C2%B3":"³",
	"%C2%B4":"´",
	"%C2%B5":"µ",
	"%C2%B6":"¶",
	"%C2%B7":"·",
	"%C2%B8":"¸",
	"%C2%B9":"¹",
	"%C2%BA":"º",
	"%C2%BB":"»",
	"%C2%BC":"¼",
	"%C2%BD":"½",
	"%C2%BE":"¾",
	"%C2%BF":"¿",
	"%C3%80":"À",
	"%C3%81":"Á",
	"%C3%82":"Â",
	"%C3%83":"Ã",
	"%C3%84":"Ä",
	"%C3%85":"Å",
	"%C3%86":"Æ",
	"%C3%87":"Ç",
	"%C3%88":"È",
	"%C3%89":"É",
	"%C3%8A":"Ê",
	"%C3%8B":"Ë",
	"%C3%8C":"Ì",
	"%C3%8D":"Í",
	"%C3%8E":"Î",
	"%C3%8F":"Ï",
	"%C3%90":"Ð",
	"%C3%91":"Ñ",
	"%C3%92":"Ò",
	"%C3%93":"Ó",
	"%C3%94":"Ô",
	"%C3%95":"Õ",
	"%C3%96":"Ö",
	"%C3%97":"×",
	"%C3%98":"Ø",
	"%C3%99":"Ù",
	"%C3%9A":"Ú",
	"%C3%9B":"Û",
	"%C3%9C":"Ü",
	"%C3%9D":"Ý",
	"%C3%9E":"Þ",
	"%C3%9F":"ß",
	"%C3%A0":"à",
	"%C3%A1":"á",
	"%C3%A2":"â",
	"%C3%A3":"ã",
	"%C3%A4":"ä",
	"%C3%A5":"å",
	"%C3%A6":"æ",
	"%C3%A7":"ç",
	"%C3%A8":"è",
	"%C3%A9":"é",
	"%C3%AA":"ê",
	"%C3%AB":"ë",
	"%C3%AC":"ì",
	"%C3%AD":"í",
	"%C3%AE":"î",
	"%C3%AF":"ï",
	"%C3%B0":"ð",
	"%C3%B1":"ñ",
	"%C3%B2":"ò",
	"%C3%B3":"ó",
	"%C3%B4":"ô",
	"%C3%B5":"õ",
	"%C3%B6":"ö",
	"%C3%B7":"÷",
	"%C3%B8":"ø",
	"%C3%B9":"ù",
	"%C3%BA":"ú",
	"%C3%BB":"û",
	"%C3%BC":"ü",
	"%C3%BD":"ý",
	"%C3%BE":"þ",
	"%C3%BF":"ÿ"
}

//SECONDARY

function isRelativeLink(url){
	return PageRelativePath(url)===url;
}

function isFileLink(url){
	return PageHead(url)==="file:///";
}

function isLocalLink(url){
	return isRelativeLink(url)||isFileLink(url);
}

function isInOwnDomain(url){
	return url.replace(predomainshard,"")!==url;
}

function isIntraPageLink(url){
	var inpage=UnPrefix(url,"#");
	return url!=inpage;
}

function isExtraPageLink(url){
	return !isIntraPageLink(url);
}

function IsInnerLink(url){
	return isExtraPageLink(url)&&(isLocalLink(url)||isInOwnDomain(url));
}

function IsOuterLink(url){
	return isExtraPageLink(url)&&!(isLocalLink(url)||isInOwnDomain(url));
}

function IsAbsolutableLink(url){
	return isExtraPageLink(url)&&(isRelativeLink(url)||isInOwnDomain(url));
}

//Glocal Files
if(typeof Local==="undefined")
	function Local(){
		return /^file\:.*/.test(document.URL);
	}
	
function JoinPath(path,subpath){
	return path.replace(/\\*$/,"")+"/"+subpath.replace(/^\\*/,"");
}
function GlocalPath(urlpath,relativepath){
	if(Local())
		var u="..";
	else
		var u=urlpath;
	return JoinPath(u,relativepath);
}

//NavigateGoToPage

function Navigate(url,samewindow){
	if(samewindow)
		window.location.href=url;
	else{//NewTab
		var id=GenerateId();
		PreAddElement("<a href='"+url+"'target='_blank' id='"+id+"'> </a>","body");
		GetElement(id).click();
		RemoveElement(id);
	}
}

///////////////////////////////////////////////////////////////////////////////
//Page traversal

function MarkElements(selector,markfunction){
	return QueryAll(selector).map(markfunction);
}

///////////////////////////////////////////////////////////////////////////////
//Page auto index
function IDfy(s){
	return UnExfix(s.replace(/([^A-Za-z0-9\_])+/g,"-"),"-");
}

function IndexTitle(h){
	return function(t){return IndexSubTitle(t,h)};
}

function IndexSubTitle(t,h){
	t.setAttribute("data-index-depth",h);
	Class(t,"index-item");
	t.id=t.id?t.id:IDfy(t.innerText); 
	return t.id;}

function IndexTag(h){
	return MarkElements(".main "+h,IndexTitle(h));
}

function IndexTitles(){
	var indexed=["h1","h2","h3","h4","h5","h6"].map(IndexTag);
	Shout("IndexTitles");
	return indexed;
}

function PageIndexHTML(indexArray){
	return "<div class='index'><a class='index-link h1' id='Table-of-Contents' href='#Table-of-Contents' onclick='ShowHideIndex()'>Table of contents</a>"+indexArray.map(IndexItemHTML).join("\
	")+"</div>";
}

function IndexItemHTML(e){
	if(!e||!Classed(e,"index-item"))
		return "";
	else{
		var depth=e.getAttribute("data-index-depth")||"";
		var title=Shorten(e.textContent,50);
		return "<a class='index-link "+depth+"' href='#"+e.id+"'>"+title+"</a>";
	}
}



function AddTitleIndex(section){
	var indexArray=GetElements(".index-item",section);
	if(indexArray.length<=1)
		return;
	RemoveElement(".index",section);
	PreAddElement(PageIndexHTML(indexArray),section);
	Class(".h1","collapse");
	ShowHideIndex();
}

function ShowHideIndex(){
	Toggle(".h1","uncollapse");
	Toggle(".h1","collapse");
	ShowHide(".h2");
	ShowHide(".h3");
	ShowHide(".h4");
	ShowHide(".h5");
	ShowHide(".h6");
}

///////////////////////////////////////////////////////////////////////////////
//Unique random identifier
var UID=""
function UserId(){
	if(UID==="")
		UID=GenerateId();
	return UID;
}

function RandomInteger(n){return Floor(Math.random()*n)};
function RandomChoice(v){return v[RandomInteger(v.length)]};


function GenerateId(){
	var preconsonants="bcdfghjklmnpqrstvwxz";
	var preconsonants2="hjlnrs";
	var vowels="aeiouyáéíóúàèìòùýäëïöüÿãõâêîôû";
	var posconsonants2="pkstm";
	var posconsonants="bcdglmnrstxz";

	function PreSyllabe(){
		return RandomInteger(5)<=3?RandomChoice(preconsonants)+(RandomInteger(5)<=1?RandomChoice(preconsonants2):""):"";
	}
	function PosSyllabe(){
		return RandomInteger(5)<=3?RandomChoice(posconsonants)+(RandomInteger(5)<=1?RandomChoice(posconsonants2):""):"";
	}
	function MidSyllabe(){
		return RandomChoice(vowels)+(RandomInteger(5)<=2?RandomChoice(vowels):"");
	}
	function Syllabe(){
		return PreSyllabe()+MidSyllabe()+PosSyllabe();
	}
	return Syllabe()+Syllabe()+Syllabe()+Syllabe()+Syllabe();
};



///////////////////////////////////////////////////////////////////////////////
// Self-awareness

var FunctionDefinitionPattern=/\s*function\s+([^\(\)]*)\([^\(\)]*\)\s*\{.*/;

function HavingFunctionDefinition(line){
	return FunctionDefinitionPattern.test(line);
};
function FunctionDefinitionName(line){
	var name=line.replace(FunctionDefinitionPattern,"$1");
	if(name!==line){
		Shout("function "+name);
		return name;
	}
	else
		return ""; 
};

function FunctionsDefined(filetxt){
	var flist=filetxt.split("\n");
	flist=flist.filter(HavingFunctionDefinition);
	flist=flist.map(FunctionDefinitionName);

	if(!FunctionsDefined.list)
		FunctionsDefined.list=[];

	FunctionsDefined.list=FunctionsDefined.list.concat(flist);
	return flist;
}

function FunctionDefined(name){
	return In(FunctionsDefined.list,name);
}

////////////////////////////////////////////////////////////////////////////////
//Load scripts

function LoadSource(source){
	if(InPosfix(source,".js"))
		LoadScript(source);
	if(InPosfix(source,".css"))
		LoadStyle(source);
}

function LoadScript(source){
	var head=GetElement('head');
	var script=document.createElement('script');
	script.src=Posfix(source,".js");
	script.async=false;
	head.appendChild(script);
}

function LoadAsync(sourcename,folder){
	var head=GetElement('head');
	var script=document.createElement('script');

	var folder=((folder+"/").replace(/\/\//,"/"))||"codes/";
	var ext=InPosfix(sourcename,".txt")?"":'.js';
	script.src=folder+Posfix(sourcename,ext);

	script.async=false;
	head.appendChild(script);

	//LoadData(script.src,FunctionsDefined);//self-awareness
}

function LoaderInFolder(folder){
	return function(sourcename){return LoadAsync(sourcename,folder)};
}

//Load styles

function LoadStyle(sourcename){
	var head=document.getElementsByTagName('head')[0];

	//Load
	var styleelement=document.createElement('link');
	styleelement.href=Posfix(sourcename,".css");
	styleelement.rel="stylesheet";
	styleelement.type="text/css";
	head.appendChild(styleelement);
}

/*
function LoadSVG(source){
	var head=GetElement('head');
	var script=document.createElement('script');
	script.src=Posfix(UnPosfix(source,".js"),".svg");
	script.id="svg-"+source.replace("/","").replace(".","");
	head.appendChild(script);
	return "<span id='"+source.replace("/","").replace(".","")+"'></span>";
}

function ReplaceSVG(svg,source){
	GetElement(source.replace("/","").replace(".","")).innerHTML=svg;
}*/

///////////////////////////////////////////////////////////////////////////////
//Data Reception

//Network status
function Online(){return navigator.onLine};
function Offline(){return !Online()};

//External resources
function MacroURL(c){return "https://script.google.com/macros/s/"+c+"/exec";};

//Fetch data from url
function LoadDataFromNetwork(url,SuccessF,header){
	var rawFile=new XMLHttpRequest();
	rawFile.open("GET",url,true);
	rawFile.onreadystatechange=function(){
		if(rawFile.readyState===4){
			if(rawFile.status===404)
				console.log("Nothing found at: ",url,", not necessarily an error!");
			else if(rawFile.status===200||rawFile.status==0){
				var data=rawFile.responseText;
				if(data==="")
					console.log("No data received from: ",url,". Connection problems?");
				else{
					Memory(url,rawFile.responseText,new Date());
					SuccessF(data);
				}
			}
		}
	}
	if(header)
		rawFile.setRequestHeader("Content-type", header);
	rawFile.send(null);
};

function LoadData(url,SuccessF,header){
	var saved=Memory(url);
	if(saved&&!MemoryExpired(url))
		return SuccessF(saved);
	else
		return LoadDataFromNetwork(url,SuccessF,header);
}

///////////////////////////////////////////////////////////////////////////////
// Persistent Memory

function MemorySlot(name){
	if(!name)
		return MemorySlot['_list'];
	
	MemorySlot['_list']=Union([name],MemorySlot['_list']||[]);
	
	return PageRoot()+"_"+name.toLowerCase();
}

function Memory(name,data,days){
	if(typeof data==="undefined"){
		var data=null;
		try{data=JSON.parse(localStorage[MemorySlot(name)])}
		catch(err){}
		return data;
	}
	try{
		localStorage[MemorySlot(name)]=JSON.stringify(data);
		//Set expiry date
		try{localStorage[MemorySlot(name+"_exp")]=JSON.stringify(new Date())}
		catch(err){}
	}
	catch(err){};
}

function MemoryExpired(name){
	var expired=true;
	try{
		expired=localStorage[MemorySlot(name+"_exp")];
		expired=Days(new Date(expired))>MemoryDuration();
	}
	catch(err){};
	return expired;
}

function MemoryDuration(name,days){
	if(days){//SET
		try{localStorage[MemorySlot(name+"_days")]=Number(days)}
		catch(err){}
		return days;
	}
	else{//GET
		var days=15;
		try{
			days=localStorage[MemorySlot(name+"_days")];
			if(days)
				days=Number(days);
			else
				days=15;
		}
		catch(err){};
		return days;
	}
}
///////////////////////////////////////////////////////////////////////////////
// Data Download
//(https://stackoverflow.com/questions/13405129/javascript-create-and-save-file)

function Download(data,filename,typ){
	var file = new Blob([data],{type:typ});
	if (window.navigator.msSaveOrOpenBlob) // IE10+
		window.navigator.msSaveOrOpenBlob(file, filename);
	else { // Others
		var a = document.createElement("a"),
				url = URL.createObjectURL(file);
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		setTimeout(function() {
			document.body.removeChild(a);
			window.URL.revokeObjectURL(url);  
		}, 0); 
	}
}



///////////////////////////////////////////////////////////////////////////////
// DOM Manipulation

function MakeElement(html){
	var e=document.createElement("div");
	e.innerHTML=html;
	return e.children[0];
}

HTMLTags=['!DOCTYPE','a','abbr','acronym','abbr','address','applet','embed','object','area','article','aside','audio','b','base','basefont','bdi','bdo','big','blockquote','body','br','button','canvas','caption','center','cite','code','col','colgroup','colgroup','data','datalist','dd','del','details','dfn','dialog','dir','ul','div','dl','dt','em','embed','fieldset','figcaption','figure','figure','font','footer','form','frame','frameset','h1','h2','h3','h4','h5','h6','head','header','hr','html','i','iframe','img','input','ins','kbd','label','input','legend','fieldset','li','link','main','map','mark','meta','meter','nav','noframes','noscript','object','ol','optgroup','option','output','p','param','picture','pre','progress','q','rp','rt','ruby','s','samp','script','section','select','small','source','video','audio','span','strike','del','s','strong','style','sub','summary','details','sup','svg','table','tbody','td','template','textarea','tfoot','th','thead','time','title','tr','track','video','audio','tt','u','ul','var','video','wbr'];

HTMLTags=HTMLTags.map(function(s){return s.toUpperCase()});

function IsTag(selector){
	if(!IsString(selector))
		return false;
	return In(HTMLTags,selector.toUpperCase());
}
function IsClass(selector){
	if(!IsString(selector))
		return false;
	return InPrefix(selector,".");
}
function IsID(selector){
	if(!IsString(selector))
		return false;
	return InPrefix(selector,"#");
}

function IsQuerySelector(selector){
	return IsID(selector)||IsClass(selector)||IsTag(selector);
}

function ParentSelector(targetIDsel){
	var parentElement=ParentElement(targetIDsel);
	return "#"+UniqueId(parentElement);
}

function MakeQuerySelector(selector){
	if(IsQuerySelector(selector))
		return selector;
	else
		return Prefix(selector,"#");
}

// Get element based on selectors: .class, #id, idsring, or the element itself
function GetElementFromTextSelector(selector,parentElement){
	if(!selector)
		return document.body;
	if(parentElement===null)
		return null;
	selector=MakeQuerySelector(selector);

	if(!parentElement||!parentElement.querySelector)
		var parentElement=document.body;

	return parentElement.querySelector(selector);
};

function GetElementIn(selector,parentElement){
	if(typeof selector==="string")
		return GetElementFromTextSelector(selector,parentElement);
	else
		return selector; //in case the actual element is given in the beginning
};

function GetElement(selector,pSelector){
	var parentElement;
	if(!pSelector)
		parentElement=document;
	else{
		if(typeof pSelector==="string")
			parentElement=GetElementIn(pSelector,document);
		else
			parentElement=pSelector;
	}
	return GetElementIn(selector,parentElement);
}

//Match Element to selector
function QueryAll(selector){
	return Array.from(document.querySelectorAll(MakeQuerySelector(selector)));
}

function Match(elem,selector){
	return In(QueryAll(selector),elem);
}

function MatchAnyElement(elemArray,selector){
	return elemArray.some(function(e){return Match(e,selector)});
}

//Find first Element matching selector
function FindFirstMatch(selectorArray,elem){
	var elem=GetElement(elem);

	function F(a){
		return a.find(function(sel){return Match(elem,sel);});
	};

	var item=Apply(selectorArray,F);
	if(IsObject(selectorArray))
		return selectorArray[item];
	else 
		return item;
}


//Siblings of any depth
function Siblings(thi,depth,maxParent){
	var depth=depth||1;
	var maxParent=GetElement(maxParent)||document.body;
	var d=0;
	var parent=GetElement(thi);

	if(!parent)
		return [];

	while(d<depth&&parent!==maxParent&&parent.parentNode){
		parent=parent.parentNode;
		d=d+1;
	}

	var chi=[[parent]];
	while(d>0){
		var sib=[];
		Last(chi).map(function(c){sib=sib.concat(Array.from(c.childNodes).filter(function(n){return n.nodeName!=="#text";}))})
		chi.push(sib);
		d=d-1;
	}
	return Last(chi);
}

//Inside

function InsideAt(parentSelector,selector){
	if(GetElement(parentSelector)===null||GetElement(selector)===null)
		return undefined;
	return Inside(parentSelector,selector)||GetElement(parentSelector).isEqualNode(GetElement(selector));
}

function Inside(parentSelector,selector){
	if(GetElement(parentSelector)===null||GetElement(selector)===null)
		return undefined;
	return GetElement(parentSelector).contains(GetElement(selector));
}

function Outside(parentSelector,selector){
	if(GetElement(parentSelector)===null||GetElement(selector)===null)
		return undefined;
	return !InsideAt(parentSelector,selector);
}

// Get element based on selectors: .class, tag, or the element itself
function GetElements(selectorString,parentIDsel){
	var HTMLCollect;
	var parentElement=GetElement(parentIDsel)||document;
	if(IsClass(selectorString))
		HTMLCollect=parentElement.getElementsByClassName(UnPrefix(selectorString,"."));
	else if (IsTag(selectorString))
		HTMLCollect=parentElement.getElementsByTagName(selectorString);
	else //ID
		HTMLCollect=[GetElement(selectorString,parentElement)];
	return Array.prototype.slice.call(HTMLCollect);
};

// Get Children Elements
function FirstChildren(targetIDsel){
	if(IsArray(targetIDsel))
		return targetIDsel.map(FirstChildren).flat();
	var e=GetElement(targetIDsel);
	if(e)
		return Array.from(e.children);
}

// Get Children Elements matching particular sleector
function Children(targetIDsel,childIDselString){
//	if(!childIDselString)
//		return FirstChildren(targetIDsel);
	var es=[GetElement(targetIDsel)];
	var match=MatchAnyElement(es,childIDselString);
	while(es.length>0&&FirstChildren(es).length>0&&!match){
		es=FirstChildren(es);
		match=MatchAnyElement(es,childIDselString);
	}
	return match?es:undefined;
}


function MapChildren(targetIDsel,childIDselString,F){
	var c=Children(targetIDsel,childIDselString);
	if(c)
		return c.map(F);
}

// Get Parent Element
function FirstParentElement(targetIDsel){
	var e=GetElement(targetIDsel);
	if(e)
		return e.parentElement;
}

// Get Parent Element matching particular sleector
function ParentElement(targetIDsel,parentIDselString){
	if(!parentIDselString)
		return FirstParentElement(targetIDsel);
	var e=GetElement(targetIDsel);
	var match=Match(e,parentIDselString);
	while(e&&e.parentElement&&!match){
		e=e.parentElement;
		match=Match(e,parentIDselString);
	}
	return match?e:undefined;
}

// Add new element to page, under a parent element
function Element(htmlOrElement){
	var e=htmlOrElement;
	if (typeof htmlOrElement==="string")
		e=MakeElement(htmlOrElement);
	return e;
}

function AddElement(htmlOrElement,parentIDsel){
	var e=Element(htmlOrElement);
	var p=GetElement(parentIDsel);
	if(p)
		p.appendChild(e);
	return e;
};

function PreAddElement(htmlOrElement,parentIDsel){
	var e=Element(htmlOrElement);
	var p=GetElement(parentIDsel);
	if(p)
		p.prepend(e);
	return e;
};

// Add new element to page, after a sibling element
function AppendElement(htmlOrElement,selector){
	var e=Element(htmlOrElement);
	var s=GetElement(selector);
	if(s)
		return s.insertAdjacentElement('afterend',e);
};

function PrependElement(htmlOrElement,selector){
	var e=Element(htmlOrElement);
	var s=GetElement(selector);
	if(s)
		return s.insertAdjacentElement('beforebegin',e);
};


// Replace parent element contents with new element
function ReplaceChildren(html,parentIDsel){
	var p=GetElement(parentIDsel);
	if(p)
		p.innerHTML=html;
};

// Replace element with new element
function ReplaceElement(htmlOrElement,elemIDsel){
	var a=AppendElement(htmlOrElement,elemIDsel);
	RemoveElement(elemIDsel);
	return a;
};

function AddSingleElement(html,parentIDsel,selfSel){
	if(GetElement(selfSel))
		return ReplaceElement(html,selfSel);
	else
		return AddElement(html,parentIDsel);
};

//Wrap Element
function WrapElement(html,elemIDsel,newparentIdsel){
	AppendElement(html,elemIDsel);
	AddElement(GetElement(elemIDsel),newparentIdsel);
}


// Remove Children
function RemoveChildren(parentID){
	ReplaceChildren("",parentID)
}

// Remove Element
function RemoveElement(elementIDsel,parentIDsel){
	var e=GetElement(elementIDsel,parentIDsel);
	if(e!==null){
		e.parentNode.removeChild(e);
	}
}

// Remove Multiple Elements
function RemoveElements(elementIDsel,parentIDsel){
	var eList=GetElements(elementIDsel,parentIDsel);
	eList.map(RemoveElement);
}

//////////////////////////////////////////////////
// Element Unique ID

function UniqueId(elementIDsel){
	var e=GetElement(elementIDsel);
	if(!e)
		return false;

	if(!e.id)
		e.id=GenerateId();

	return e.id;
}

//////////////////////////////////////////////////
// Apply to Child Elements

function ApplyChildren(F,elem,children){
	if(!children)
		return;
	var children=F(children);
	children.map(function(c){return c.cloneNode&&c.cloneNode(true)});
	RemoveChildren(elem);
	children.map(function(c){AddElement(c,elem)});
}

function ApplyOriginalChildren(F,parentSelector,childselector,subparentSelector){
	if(!subparentSelector)
		var spElem=GetElement(parentSelector);
	else
		var spElem=GetElement(subparentSelector,parentSelector);
	
	var children=GetElements(childselector,spElem);
		
	var uid=UniqueId(parentSelector);
	if(!ApplyOriginalChildren[uid]){
		ApplyOriginalChildren[uid]=children.map(function(c){return c.cloneNode(true)});
	}
	
	children=ApplyOriginalChildren[uid];
	ApplyChildren(F,spElem,children);
}

//////////////////////////////////////////////////
// Filter

function FilterChildren(filterF,parentSelector,childSelector,subparentSelector){
	function FilterCh(children){
		return children.filter(filterF);
	}
	ApplyOriginalChildren(FilterCh,parentSelector,childSelector,subparentSelector);
}

function InSimple(childtxt,patterntxt){
	return In(LowerSimpleString(childtxt),LowerSimpleString(patterntxt));
}

function TextFilterChildren(patterntxt,parentSelector,childSelector,subparentSelector){
	function TextFilter(child){
		
		var childtxt=LowerSimpleString(child.textContent);
		return InSimple(childtxt,patterntxt)
	}
	FilterChildren(TextFilter,parentSelector,childSelector,subparentSelector);
	AddShareSearch(patterntxt,parentSelector);
}

function PrependFilterInput(InputFilterF,parentSelector,childrenSelector,subparentSelector){
	var uid=UniqueId(parentSelector);
	RemoveElement("INPUT",ParentElement(parentSelector,"DIV"));//Removes any previous inputs
	filterHTML="<input class='input filter filter-"+uid+"' placeholder='search Ϙ' onkeyup='"+FunctionName(InputFilterF)+"(\""+uid+"\",\".filter-"+uid+"\",\""+childrenSelector+"\",\""+subparentSelector+"\")'></input>";
	PrependElement(filterHTML,parentSelector);
	//Shout("FillInput");
}

function AddShareSearch(patterntxt,elementSelector){
	var parentElement=ParentElement(GetElement(elementSelector),"DIV");
	var id=1;
	var shareLink=PageUnTag()+"?"+"search="+LowerSimpleString(patterntxt)+"&table="+id;
	RemoveElement(".share-link",parentElement);
	AppendElement("<div class='share-link'><b>Share this search:</b>"+AHTML(shareLink,shareLink)+"</div>",elementSelector);
}

//////////////////////////////////////////////////
// Scroll into

function ScrollInto(elementIDsel){
	var e=GetElement(elementIDsel);
	e.scrollIntoView();
}



////////////////////////////////////////////////////////////////////////////////
// Element Generator

function ReadAttributes(attributesObj){
	function Attrib(k){return k+"='"+attributesObj[k]+"'";};
	return Keys(attributesObj).map(Attrib).join(" ");
}

function ElementHTML(optionsObj){
	var tag=optionsObj.tag?optionsObj.tag:"div";
	var attributes=(optionsObj.attributes)?' '+ReadAttributes(optionsObj.attributes):'';	//attributes is an Object
	var txt=optionsObj.txt?optionsObj.txt:"???";
	return "<"+tag+attributes+">"+txt+"</"+tag+">";		//txt and tag
};

function SingleElementHTML(optionsObj){
	var tag=optionsObj.tag?optionsObj.tag:"div";
	var attributes=(optionsObj.attributes)?' '+ReadAttributes(optionsObj.attributes):'';	//attributes is an Object
	return "<"+tag+attributes+"/>";
};


// Basic Elements

function ImageHTML(optionsObj){
	var o=optionsObj?optionsObj:{};
	o.tag="img";
	if(!o.attributes)
		o.attributes={src:"images/splash.png"}
	return SingleElementHTML(o);
};

function PlaceholderImageHTML(){
	return ImageHTML();
};

function IconHTML(path,vbmax,vbmin){
	var vbmin=vbmin||"0 0";
	var vbmax=vbmax||"400 400";
	return SpanHTML("<svg class='iconpath' width='20px' height=''20px' viewBox='"+vbmin+" "+vbmax+"'><path d='"+path+"'/></svg>","icon");
}

function SpanHTML(html,clas){
	if(clas)
		var clas=Exfix(clas," class='","'");
	else
		var clas="";
	return "<span"+clas+">"+html+"</span>";
}

function ButtonHTML(optionsObj){
	var o=optionsObj?optionsObj:{};
	o.tag=o.tag?o.tag:"div";			//defaults to div
	if(!o.attributes)
		o.attributes={class:"button"}
	else if(!o.attributes['class'])
		o.attributes['class']="button";
	else
		o.attributes['class']=Posfix(o.attributes['class']," button");
	o.txt=o.txt?o.txt:"???";

	var ao=o.attributes['onclick'];
	o.attributes['onclick']="PulseSelect(this);"+(ao?ao:"");

	//Context Menu and Select prevention
	o.attributes['oncontextmenu']="(function(e){e.preventDefault()})(event);";
	o.attributes['unselectable']="on";
	o.attributes['onselectstart']="return false;";

	o.attributes['tabindex']="0";

	return ElementHTML(o);
};

function AHTML(title,ref){
	var external=InPrefix(ref,"http");
	var attribs={href:ref};
	if(external)
		attribs["rel"]="noreferrer noopener";
	return ElementHTML({tag:"a",txt:title,attributes:attribs});
}

function LabelHTML(text,type){
	var type=type||text||"";
	return "<sup class='label "+type+"'>"+text+"</sup>";
}

//Hidden Elements
function GhostHTML(id){
	"<span id='"+id+"' class='hidden'></span>";
}

/*
SuperimposedHTML(A,B){
	return "<span class='superimposed'>"+A+"</span>"+B;
}
*/

// Table Elements

function TDHTML(d){
	if(!d||d==="")
		return "<td></td>";
	return "\t\t<td>"+d+"</td>";
}

function TRHTML(dataArray){
	if(!dataArray||dataArray.length<1)
		return "";
	
	if(IsString(dataArray))
		return dataArray;

	if(IsArray(dataArray))
		var dataArray=dataArray.map(TDHTML).join("\n");
	if(dataArray==="\n")
		return "";
	
	return "\t<tr>\n"+dataArray+"</tr>";
};

function TableHTML(caption,headers,rows){
	var headersHTML="";
	if(IsString(headers))
		headersHTML=headers;
	if(IsArray(headers))
		headersHTML="<th>"+headers.join("</th><th>")+"</th>";

	var rowsHTML="";
	if(IsString(rows))
		rowsHTML=rows;
	if(IsArray(rows))
		rowsHTML=rows.map(TRHTML).join("\n")
		
	return "<caption>"+caption+"</caption><table><thead>"+headersHTML+"</thead><tbody>\n"+rowsHTML+"</tbody></table>";
}


function SectionHTML(SettingsObj){
	var Source=SettingsObj.Source;

	var header=SettingsObj.header||"";
	var footer=SettingsObj.footer||"";
	var InnerWrapper=SettingsObj.InnerWrapper||Identity;
	var OuterWrapper=SettingsObj.OuterWrapper||Identity;
	
	var Sorter=SettingsObj.Sorter;
	var ItemHTML=SettingsObj.ItemHTML;
	var include=SettingsObj.include||{};
	var FilterF=SettingsObj.FilterF;
	var max=SettingsObj.max||false;

	var changes=Source;
	if(FilterF)
		changes=Values(FilterObject(changes,FilterF));
	else if(include)
		changes=BaseFilter(changes,include);

	if(Sorter)
		changes=changes.sort(Sorter);
	if(max)
		changes=changes.slice(0,max);
	changes=changes.map(ItemHTML).join("\n")
	if(changes.length<1)
		return"";
	return OuterWrapper(`
		${header}
		${InnerWrapper(changes)}
		${footer}
		`);
}

// Basic Buttons

function ButtonOnClickHTML(title,onclicktxt){
	return ButtonHTML({txt:title,attributes:{onclick:onclicktxt}});
}

function ButtonLinkHTML(title,symbol,attribs){
	var id='#'+IDfy(title);
	var attribs=attribs||{};
	if(!symbol)
		var symbol=title;
	if(GetElement(id))
		return ButtonHTML({txt:symbol,tag:"a",attributes:FuseObjects({href:id,onclick:'FullscreenClose()'},attribs)});
	else
		return GhostHTML(id);
}

function CloseButtonHTML(targetid){
	return "<div class='closer'>"+ButtonHTML({tag:"span",txt:"&times;",attributes:{onclick:'CloseCurrentDatapack();CloseWindow(this);'}})+"</div>";
}

function OkButtonHTML(targetid){
	return ButtonOnClickHTML("OK",'Close(\"'+targetid+'\")');
}
function SubmitButtonHTML(DP){
	return ButtonOnClickHTML(DP.actionText,FunctionName(DP.action)+"(\""+DP.qid+"\")");
}

function MessageHTML(message,clas){
	var clas=clas||"question";
	return "<div class='"+clas+"'>"+message+"</div>";
}

function ErrorHTML(message,id){
	return "<div class='error' id='"+id+"'>"+PHTML(message)+"</div>";
}

function PHTML(message){
	return "<p>"+message+"</p>";
}


function PlainMessageHTML(message){
	return message;
}

//Button Bar
function ButtonBar(buttonshtml,id){return '<div id="'+id+'" class="buttonbar buttonrow">'+buttonshtml+'</div>';}

////////////////////////////////////////////////////////////////////////////////
// DataField and DataPack system : default DataField (customisable), many of which constitute a DataPack 

function DefaultDataField(){
	return {
		questionname:"???",				//Display name of the field question
		questioninfo:"",				//Display info below the field question
		qfield:"question",				//Field name must be unique
		qvalue:"",						//Field value, by default

		qid:GenerateId(),				//id of the field question

		qchoices:"",					//answer options list
		qchoicesViewF:Identity,			//modifies each choice, for display purposes
		executeChoice:Identity,			//immediate changes on toggle receives (id, choice)
		defaultChoice:DefaultChoice,	//choice formatting, based on itself, receives (index,choicetxt)

		qtype:PlainHTML,				//Format of question :receives a DataField
		qplaceholder:"❤ Pedro PSI ❤",	//Placeholder answer

		shortcuts:Identity,				//Special shortcuts

		qsubmittable:true, 				//whether the element expects submission (true) or merely presents information (false)
		qrequired:true,
		qvalidator:IdentityValidator,	//Receives a DataField
		qerrorcustom:''
	}
}

function DefaultChoice(index,choicetxt){return String(index)===String(0);}//choicetxt gives this function flexibility

function DefaultDataPack(){
	return {
		fields:[],

		qid:GenerateId(),				//id
		qclass:"",						//class

		destination:'Feedback',			//Name of data repository (default)
		findDestination:FindDestination,//Get Destination
		requireConnection:true,			//Does it need a connection?

		action:CheckSubmit, 			//action on submit :receives a qid
		actionvalid:SubmitValidAnswer,	//action on valid submit: receives a DataPack
		actionText:'Submit',			//text to display instead of "Submit"

		qtargetid:document.body.id,		//Where to introduce form in page?
		qdisplay:LaunchModal,			//Question display function :receives a DataPack

		qonsubmit:LaunchConsoleThanks,	//Next modal on successful submit: receives a DataPack
		qonclose:Identity,				//Next modal on close (defaults to nothing): receives a DataPack
		thanksmessage:"Submitted. Thank you!",

		closeonblur:true,				//Whether to close the DP on losing focus (e.g. clicking outside)
		closeOthersCondition:True,		//Condition for other DPs to close
		layer:0,						//Independent Layers for closing

		shortcutExtras:{},				//Extended shortcuts, to use ad-hoc
		spotlight:document.body,		//Spotlight after closing
		closed:false,

		buttonSelector:"none"			//Selector for button requesting the datapack
	}

}

function FindDestination(DP){return FindData("destination",DP.qid)};


var dataFieldTypes={
	plain:{
		qsubmittable:false},
	message:{
		action:Close,
		destination:'',
		qtype:LongAnswerHTML,
		qdisplay:LaunchConsoleThanks},
	email:{
		qtype:ShortAnswerHTML,
		qfield:"address",
		qplaceholder:"_______@___.___",
		qvalidator:EmailValidator},
	url:{
		qtype:ShortAnswerHTML,
		qfield:"url",
		qplaceholder:"https://www.example.org",
		qvalidator:URLValidator},
	name:{
		qrequired:false,
		qvalidator:NameValidator,
		qfield:"name",
		qtype:ShortAnswerHTML,
		questionname:"Your name",
		qplaceholder:"(optional)"},
	alias:{
		qrequired:false,
		qvalidator:NameValidator,
		qfield:"name",
		qtype:ShortAnswerHTML,
		questionname:"Your name",
		qplaceholder:"(or alias)"},
	answer:{
		qfield:"answer",
		qtype:LongAnswerHTML,
		qvalidator:SomeTextValidator},
	shortanswer:{
		qfield:"shortanswer",
		qtype:ShortAnswerHTML,
		qvalidator:SomeTextValidator},
	exclusivechoice:{
		qfield:'answer',
		questionname:"Which one?",
		qchoices:["on","off"],
		qtype:ExclusiveChoiceButtonRowHTML},
	multiplechoice:{
		qfield:'answer',
		questionname:"Which ones?",
		qchoices:["1","2","3","4","5"],
		qtype:ChoicesButtonRowHTML},
	navi:{
		qfield:"navi",
		qclass:"nowrap",
		questionname:"",
		qchoices:["◀","OK","▶"],
		qtype:ExclusiveChoiceButtonRowHTML,
		defaultChoice:function(i,txt){return txt==="OK";},
		qsubmittable:false},
	keyboard:{
		qfield:"keyboard",
		questionname:"",
		qchoices:DefaultKeyboardKeys(),
		//["Ctrl","Alt","\t\t\t\t\t\t\t\t\t","Shift"]["🠴","␡","⮐"]
		qtype:KeyboardHTML,
		defaultChoice:function(i,txt){return txt==="⮐";},//Defaults to enter
		qsubmittable:false},
	pass:{
		questionname:"What is the password?",
		qfield:'answer',
		qtype:ShortAnswerHTML,
		qvalidator:SomeTextValidator,
		qplaceholder:"(top-secret)"},
	snapshot:{
		questionname:"Attach a snapshot?",
		qfield:'snapshot',
		qtype:ExclusiveChoiceButtonRowHTML,
		qchoices:["no","yes"]},
	secret:{
		questionname:"",
		qsubmittable:false}
}

function CustomDataField(type,obj){
	var DF=DefaultDataField();
	if(In(dataFieldTypes,type))
		DF=FuseObjects(DF,dataFieldTypes[type]);
	return FuseObjects(DF,obj);
}

function UpdateDataPack(DP,obj){
	return FuseObjects(DP,obj);
}

function NewDataPack(obj){
	return UpdateDataPack(DefaultDataPack(),obj);
}

function NewDataPackFields(NamedFieldArray){
	function CusDaFiel(ndf){return CustomDataField(ndf[0],ndf[1])};
	var f=NamedFieldArray.map(CusDaFiel);
	return {fields:f};
}

function RequestDataPack(NamedFieldArray,Options){
	if(NamedFieldArray.length<1)
		return;
	else{
		var o=Options;
		if(typeof o==="undefined")
			o={};
		var DP=NewDataPack(NewDataPackFields(NamedFieldArray));
		DP=UpdateDataPack(DP,o);
		DP.fields=DP.fields.map(function(f){var fi=f;fi.pid=DP.qid;return fi});

		function SameType(DP1){return function(DP2){return DP1.buttonSelector===DP2.buttonSelector}};
		function SameLayer(DP1){return function(DP2){return DP1.layer===DP2.layer}};

		if(DP.buttonSelector!=="none"&&CurrentDatapack(SameType(DP)))
			ClosePreviousDatapacks(SameType(DP));
		else{
			ClosePreviousDatapacks(SameLayer(DP));

			if(!GetDataPack.history)
				GetDataPack.history=[];
			GetDataPack.history.push(DP);

			DP.qdisplay(DP);
			Select(DP.buttonSelector);		//Activate button
			setTimeout(function(){FocusInside(DP.qid);},100);		//Focus on first question

			if(DP.closeonblur)
				setTimeout(function(){ListenOutside("click",function(){Close(DP.qid)},DP.qid)},500); //Click outside to close
			SetDatapackShortcuts(DP);

			return DP;
		}
	}
};

// DataField HTML Components

function PlainHTML(dataField){
	return "<span class='field-"+dataField.qfield+"' data-"+dataField.qfield+"='"+dataField.qvalue+"'>"+PlainMessageHTML(dataField.questionname)+"</span>";
}

function ExclusiveChoiceButtonHTML(choice,dataField,i){
	var args='(\"'+dataField.qfield+'\",\"'+choice+'\",\"'+dataField.pid+'\");';
	var SetF='SetData'+args;
	var ExecuteF='ExecuteChoice'+args;
	var SelectF='ToggleThisOnly(event,this,'+dataField.pid+');'+SetF;

	var buAttribs={
		'onfocus':SelectF,
		'onmouseover':SelectF,
		'ontouchstart':SelectF,
		'onclick':ExecuteF,
		'ondblclick':ExecuteF,
		id:"choice-"+choice};

	if(dataField.defaultChoice(i,choice)){
		buAttribs=FuseObjects(buAttribs,{class:"selected",onload:SetF});
		SetData(dataField.qfield,choice,dataField.pid);//Actualy choose it
	}

	return ButtonHTML({txt:dataField.qchoicesViewF(choice),attributes:buAttribs});
};

function MultiChoiceButtonHTML(choice,dataField,i){
		var args='(\''+dataField.qfield+'\',\''+choice+'\',\''+dataField.pid+'\')';
		var SelectF='ToggleThis(event,this);ToggleData'+args;
		var buAttribs={'onclick':SelectF,'onfocus':SelectF,id:"choice-"+choice};

		return ButtonHTML({txt:dataField.qchoicesViewF(choice),attributes:buAttribs});
	};

function ChoiceRowHTML(dataField,buttontype){
	var choi="";
	for(var i in dataField.qchoices)
		choi=choi+buttontype(dataField.qchoices[i],dataField,i);
	return choi;
}

function SectionRowsHTML(sectionArray){
	if(!sectionArray||sectionArray.length<0)
		return ChoiceRowHTML;

	function ChoiceSectionRowHTML(dataField,buttontype){
		var s=-1;
		var choi="";
		for(var i=0;i<dataField.qchoices.length;i++){
			if(sectionArray[s+1]&&(i+1)===sectionArray[s+1].number){
				choi=choi+"<h4 class='section-title'>"+sectionArray[s+1].section+"</h4>";
				s=s+1;
			}
			choi=choi+buttontype(dataField.qchoices[i],dataField,i);
		}
		return choi;
	}

	return ChoiceSectionRowHTML;
}

function LayoutHTML(dataField,buttontype,layoutclass,LayoutF){
	ClearData(dataField.qfield,dataField.pid);
	var clear='onload="ClearData(\''+dataField.qfield+'\',\''+dataField.pid+'\')" ';
	var questionclass=dataField.qclass||"";
	var choi=LayoutF(dataField,buttontype);
	return '<div class="'+layoutclass+' '+questionclass+' field-'+dataField.qfield+'" '+clear+'id="'+dataField.qid+'">'+choi+'</div>';
}


function ExclusiveChoiceButtonRowHTML(dataField){
	return LayoutHTML(dataField,ExclusiveChoiceButtonHTML,'buttonrow',ChoiceRowHTML);
}

function ExclusiveChoiceSectionsHTML(sections){
	function ExChS(dataField){
		return LayoutHTML(dataField,ExclusiveChoiceButtonHTML,'buttonrow',SectionRowsHTML(sections));
	};
	return ExChS;
}

function ChoicesButtonRowHTML(dataField){
	return LayoutHTML(dataField,MultiChoiceButtonHTML,'buttonrow',ChoiceRowHTML);
}


function ShortAnswerHTML(dataField){
	return "<input class='input field-"+dataField.qfield+"' data-"+dataField.qfield+"='' placeholder='"+dataField.qplaceholder+"' id='"+dataField.qid+"' tabindex='0' value='"+dataField.qvalue+"'></input>";
}

function LongAnswerHTML(dataField){
	return "<textarea class='input field-"+dataField.qfield+"' data-"+dataField.qfield+"='' placeholder='"+dataField.qplaceholder+"' id='"+dataField.qid+"' tabindex='0' value='"+dataField.qvalue+"'></textarea>";
}

function SubQuestionHTML(dataField){
	var qname=dataField.questionname;
	var questiontitle="";
	var questioninfo="";
	if(qname!==""&&dataField.qtype!==PlainHTML)
		questiontitle=MessageHTML(qname);
	if(dataField.questioninfo!==""&&dataField.qtype!==PlainHTML)
		questioninfo=MessageHTML(PHTML(dataField.questioninfo),"question-info");
	var answerfields=dataField.qtype(dataField);
	return questiontitle+questioninfo+answerfields;
}


// DataPack HTML Components

function QuestionHTML(DP){
	var Fields=DP.fields;
	//!!! Outgrow for simple DP
	var SubQuestions=Fields.map(SubQuestionHTML).join("");
	var SubmissionButton="";
	if(Fields.some(function(dp){return dp.qsubmittable}))
		SubmissionButton=SubmitButtonHTML(DP);
	return '<div id="'+DP.qid+'">'+SubQuestions+SubmissionButton+"</div>";
}


////////////////////////////////////////////////////////////////////////////////
// Balloons

function LaunchThanksBalloon(DP){
	RequestDataPack(
		[['plain',{questionname:DP.thanksmessage,destination:""}]],
		{qtargetid:DP.qtargetid,
		qdisplay:LaunchAvatarBalloon,
		requireConnection:false});
}

function LaunchBalloon(DP){
	OpenBalloon(QuestionHTML(DP),DP.qid,DP.qtargetid);
}

function LaunchAvatarBalloon(DP){
	OpenBalloon(QuestionHTML(DP),DP.qid,DP.qtargetid,true);
}

function BalloonHTML(avatarHTML,content,id,classExtra){
	var classExtra=classExtra||"";
	var b='<div class="balloon window '+classExtra+'" id='+id+'>'+CloseButtonHTML(id)+'<div class="baloon-content">'+avatarHTML+'<div class="subtitle">'+content+'</div></div></div>';
	return b;
}

function OpenBalloon(content,id,targetid,avatar){
	if(!avatar||typeof LOGO==="undefined")
		var avatar="";
	else
		var avatar='<div class="logo avatar">'+LOGO+'</div>';
	AddElement(BalloonHTML(avatar,content,id),targetid);
}

//Banner (e.g for keyboard)
function BannerHTML(content,id,classExtra){
	var classExtra=classExtra||"";
	var b='<div class="banner window '+classExtra+'" id='+id+'><div class="banner-content">'+content+'</div></div>';
	return b;
}

function OpenKeyboardBanner(content,id,targetid){
	return AddElement(BannerHTML(content,id,"keyboard"),targetid);
}

function LaunchKeyboardBanner(DP){
	OpenKeyboardBanner(QuestionHTML(DP),DP.qid,DP.qtargetid);
}

function OpenKeyboardBalloon(content,id,targetid){
	return AddElement(BalloonHTML("",content,id,"keyboard"),targetid);
}

function LaunchKeyboardBalloon(DP){
	OpenKeyboardBalloon(QuestionHTML(DP),DP.qid,DP.qtargetid);
}

// On-screen Keyboard
function DefaultKeyboardKeys(){
	return [["1","2","3","4","5","6","7","8","9","0"],["Q","W","E","R","T","Y","U","I","O","P"],["A","S","D","F","G","H","J","K","L"],["Z","X","C","V","B","N","M",".","-"]]};

function KeyboardRowsHTML(dataField,buttontype){
	var kblines="";
	var i=0;
	for(var keyboardline in dataField.qchoices){
		var k="";
		for (var key in dataField.qchoices[keyboardline]){
			i=i+1;
			k=k+buttontype(dataField.qchoices[keyboardline][key],dataField,i);
		}
		kblines=kblines+"<div class='keyline'>"+k+"</div>";
	}
	return kblines;
}

function KeyboardHTML(dataField){
	return LayoutHTML(dataField,KeyboardButtonHTML,'keyboard',KeyboardRowsHTML)
}

function KeyboardButtonHTML(choice,dataFiel,i){
	var buID='kb'+i;
	var ID="choice-"+choice;
	KeyboardButtonHTML[buID]=function(){
		ExecuteChoice(dataFiel.qfield,choice,dataFiel.pid);
		PulseSelect(ID);
	};

	var Kargs='(KeyboardButtonHTML.'+buID+',250,"'+buID+'");';
	var Start='AutoRepeat'+Kargs;
	var Stop='AutoStop'+Kargs+'FadeSelect('+'"choice-"+"'+choice+'");';

	var buAttribs={
		'onclick':'KeyboardButtonHTML.'+buID+'()',
		'ontouchstart':Start,
		'onmousedown':Start,
		'onmouseout':Stop,
		'onmouseup':Stop,
		'ontouchend':Stop,
		'ontouchcancel':Stop,
		id:ID};

	return ButtonHTML({txt:dataFiel.qchoicesViewF(choice),attributes:buAttribs});
};

function FadeSelect(targetIDsel){
	var e=GetElement(targetIDsel);
	if(e){
		function DeF(){
			Deselect(e);
			e.blur();
		}
		setTimeout(DeF,500);
	}
}


////////////////////////////////////////////////////////////////////////////////
// Opener & Closer Functions with focus option, 
// -> to use within Datapack RequestFunctions
function FocusAndResetFunction(RequestF,FocusF){
	return function(){
		if(RequestF.id)
			RequestF.id=undefined;
		FocusF();
	};
};


////////////////////////////////////////////////////////////////////////////////
// Toggling class & buttons

function ToggleThis(ev,thi){
	if(ev.target.id===thi.id)
		Toggle(thi);
}

function ToggleThisOnly(ev,thi,maxparent){
	var siblings=Siblings(thi,999,maxparent);
	var i=0;
	while (i<siblings.length){
		if(siblings[i]!==thi)
			Deselect(siblings[i]);
		else{
			Select(siblings[i]);
		}
		i++;
	}
}


// Select, Deselect and Toggle - given selector or element itself

function Class(selectorE,clas){
	var clas=clas||'selected';
	var e=GetElement(selectorE);
	if(e){
		e.classList.remove(clas);
		e.classList.add(clas);
	}
	return e;
}

function UnClass(selectorE,clas){
	var clas=clas||'selected';
	var e=GetElement(selectorE);
	if(e)
		e.classList.remove(clas);
	return e;
}

function Select(selectorE){ //With Pulse by default
	var e=Class(selectorE,'selected');
	PulseSelect(selectorE);
	return e;
}

function Deselect(selectorE){ 
	UnClass(selectorE,'selected');
}

function Selected(selectorE){
	return Classed(selectorE,'selected');
}

function Classed(selectorE,clas){
	var clas=clas||'selected';
	var e=GetElement(selectorE);
	return e&&e.classList&&e.classList.contains(clas);
}

function Toggle(selectorE,clas){
	var clas=clas||'selected';
	var e=GetElement(selectorE);
	if(e)
		e.classList.toggle(clas);
	return e;
}

// Select Pulse

function PulseSelect(selectorE,clas,delay){
	var delay=delay||100;
	var clas=clas||"pulsating";
	UnClass(selectorE,clas);//cyclical pulse effect on long taps
	Class(selectorE,clas);
	setTimeout(function(){UnClass(selectorE,clas);},delay);
}

// Show/Hide

function HiddenHTML(id){
	return "<span id='"+UnPrefix(id,"#")+"' class='hidden'></span>"
}

function ShowElement(selectorE){
	var e=GetElement(selectorE);

	//Restore tabindex
	if(e&&e.dataset.tabindex)
		e.tabindex=e.dataset.tabindex;

	UnClass(selectorE,"hidden");
}

function Show(selectorE){
	var e=GetElements(selectorE);
	if(e.length)
		e.map(ShowElement);
}

function HideElement(selectorE){
	var e=GetElement(selectorE);

	//Hide tabindex
	if(e&&e.tabindex){
		e.removeAttribute(tabindex);
		e.dataset.tabindex=e.tabindex;
	}

	Deselect(selectorE);
	Class(selectorE,"hidden");
}

function Hide(selectorE){
	var e=GetElements(selectorE);
	if(e.length)
		e.map(HideElement);
}

function ShowHideElement(selectorE){
	var e=GetElement(selectorE);
	if(!e)
		return;

	if(Classed(e,"hidden"))
		ShowElement(e);
	else
		HideElement(e);
}

function ShowHide(selectorE){
	var e=GetElements(selectorE);
	if(e.length)
		e.map(ShowHideElement);
}

////////////////////////////////////////////////////////////////////////////////
// Closing functions

function CloseWindow(e){
	CloseElement(ParentElement(e,".window"));
}

function CloseElement(targetIDsel){
	var fading=GetElement(targetIDsel);
	if(fading){
		fading.classList.add("closing");
		setTimeout(function(){fading.remove();},1000);
	}
}

function CloseElementNow(targetIDsel){
	var fading=GetElement(targetIDsel);
	if(fading!==null){
		fading.remove();
	}
}

function Close(targetid){
	var DP=GetDataPack(targetid);
	if(DP)
		CloseDatapack(DP);
	else
		CloseElement(targetid);
}

function CloseAndContinue(DP){
	Deselect(DP.buttonSelector);
	if(DP.qonsubmit)
		DP.qonsubmit(DP);
	CloseElement(DP.qid);
}

// Current Datapack
function CurrentDatapack(ConditionF){
	var ConditionF=ConditionF||True;
	var h=GetDataPack.history;
	if(h)
		h=h.filter(ConditionF);
	if(h&&h.length>0){
		var DP=Last(h);
		if(DP.closed)
			return undefined;
		else
			return DP;
	}
	else
		return undefined;
}

function CloseDatapack(DP){
	if(DP){
		Deselect(DP.buttonSelector);
		PulseSelect(DP.qid+" .closer .button");
		DeleteShortcuts(DP.qid);
		DP.closed=true;
		if(DP.qonclose)
			DP.qonclose(DP);
		if(DP.spotlight)
			FocusElement(DP.spotlight);

		CloseElement(DP.qid);
	}
}

function CloseCurrentDatapack(){
	CloseDatapack(CurrentDatapack());
}

function ClosePreviousDatapacks(ConditionF){
	var h=GetDataPack.history;
	if(!h)
		return;
	h=h.filter(ConditionF).filter(function(DP){return !DP.closed});

	var l=Last(h);

	h=Most(h); //Close previous ones without firing onclose event
	if(h)
		h.map(function(DP){DP.qonclose=Identity;CloseDatapack(DP)});

	CloseDatapack(l); //the last one should fire it
}

function SubmitCurrentDatapack(){
	var DP=CurrentDatapack();
	DP.action(DP.qid);
}

////////////////////////////////////////////////////////////////////////////////
// Focus functions

// Spotlight (context shifting)
function Spotlight(){
	if(!Spotlight.s)
		Spotlight.s=[document.body];
	return Last(Spotlight.s);
}

function AddSpotlight(element){
	if(Spotlight()!==element){
		Spotlight.s.push(element);
	}
	return element;
}


//Focus clicked items (also to escape focus by clicking in unfocusable parents)
Listen("mousedown",function(e){FocusElement(e.target)});
Listen("click",function(e){FocusElement(e.target)});

// Focus Element
function FocusElement(targetIDsel){
	var focussing=GetElement(targetIDsel);
	if(focussing){
		focussing.focus();
		AddSpotlight(focussing);
		//ListenOnce('blur',FocusActive,focussing);
	}
	return focussing;
};


// Which elements are focusable?
function FocusableInput(e){
	return Classed(e,"input")||In(["INPUT","TEXTAREA"],e.tagName);
}
function Focusable(e){
	return FocusableInput(e)||Classed(e,"button")||Classed(e,"gif")||e.tagName==="A";//List of element and classes
}
function UnFocusable(e){
	return Classed(e,"closer")||Classed(e,"logo");
}

// Focus Inside Element, looking for focusables
function FocusInside(targetIDsel,backward){
	var e=GetElement(targetIDsel);
	if(!e)
		return false;

	if(!backward)
		var backward=false;

	if(Focusable(e)){
		return FocusElement(e); //doubles as true
	}

	var selElem=GetElement(".selected",targetIDsel);

	if(Selected(selElem)&&selElem.parentNode.isEqualNode(e)){
		return FocusElement(selElem); //doubles as true
	}
	else {
		var children=e.children;
		var found=false;
		var i=0;
		var j,c;
		while(!found&&children&&i<children.length){
			j=backward?(children.length-1-i):i;
			c=children[j];
			if(UnFocusable(c))
				found=false;
			else 
				found=FocusInside(c,backward);
			i++;
		}
		return found;
	}
};


function FocusAdjacentElement(elem,backward,bounded){

	if(!backward)
		var backward=false;

	if(!elem)
		return FocusInside(document.body,backward);

	var next=backward?elem.previousSibling:elem.nextSibling;

	if(!next){
		if(bounded)
			return false;
		else
			return FocusAdjacentElement(elem.parentElement,backward);
	}

	var f=false;
	while(next&&!f){
		f=FocusInside(next,backward);
		next=backward?next.previousSibling:next.nextSibling;
	}

	if(f)
		return f;
	else
		return FocusAdjacentElement(elem.parentElement,backward);
}


//Focus Next, Prev, Stay: bounded or not
function FocusNext(F){
	var e=FocusAdjacentElement(document.activeElement,false);
	if(F&&typeof F==="function")
		F(e);
	return e;
}

function FocusPrev(F){
	var e=FocusAdjacentElement(document.activeElement,true);
	if(F&&typeof F==="function")
		F(e);
	return e;
}

function FocusStay(F){
	var e=document.activeElement;
	if(F&&typeof F==="function")
		F(e);
	return e;
}

function FocusNextBounded(F){
	var e=FocusAdjacentElement(document.activeElement,false,true);
	if(F&&typeof F==="function")
		F(e);
	return e;
}

function FocusPrevBounded(F){
	var e=FocusAdjacentElement(document.activeElement,true,true);
	if(F&&typeof F==="function")
		F(e);
	return e;
}

//Focus NextParent
function FocusNextParent(F){
	var e=FocusAdjacentElement(document.activeElement.parentElement,false);
	if(F&&typeof F==="function")
		F(e);
	return e;
}

function FocusPrevParent(F){
	var e=FocusAdjacentElement(document.activeElement.parentElement,true);
	if(F&&typeof F==="function")
		F(e);
	return e;
}


//Click
function ClickElement(elem){
	var elem=GetElement(elem);
	elem.click();
}

function ClickPrevBounded(){
	FocusPrevBounded(ClickElement);
}

function ClickNextBounded(){
	FocusNextBounded(ClickElement);
}

function ClickStay(){
	FocusStay(ClickElement);
}

///////////////////////////////////////////////////////////////////////////////
//Event Listeners

function ListenOnce(ev,fun,target){
	return ListenF(ev,fun,target?target:window,function(eve){return true;});
}

function ListenOutside(ev,fun,target){
	return ListenF(ev,fun,window,function(eve){return Outside(target,eve.target);});
}

function ListenF(ev,fun,target,ConditionF){
	var evObj={
		"ev":IsArray(ev)?ev:[ev],
		"F":F,
		"target":GetElement(target)
	};

	function F(eve){
		if(ConditionF(eve)){
			fun();
			ListenNoMore(evObj);
		}
	};

	ListenIndeed(evObj);
	return evObj;
}

function ListenNoMore(evObj){
	evObj["ev"].map(function(e){evObj["target"].removeEventListener(e,evObj["F"])});
}

function ListenIndeed(evObj){
	evObj["ev"].map(function(e){Listen(e,evObj["F"],evObj["target"])});
}

function Listen(eString,F,target){
	var target=GetElement(target)||window;
	if(In(['click','mousedown'],eString))
		target.addEventListener(eString,F,{"passive":true})
	else
		target.addEventListener(eString,F)
};

//Listen for all events in array before firing
function ListenAndOnce(shoutArray,SuccessF){
	function Heard(shoutcode){
		if(!Heard.array)
			Heard.array=[];

		Heard.array.push(shoutcode);
		Heard.array=Unique(Heard.array);

		if(Equal(Heard.array,Unique(shoutArray)))
			SuccessF();
	}

	function Hear(shoutcode){
		ListenOnce(shoutcode,function(){Heard(shoutcode)});
	}

	shoutArray.map(Hear);
}

function ShoutAnd(shoutArray,SuccessShout){
	ListenAndOnce(shoutArray,function(){Shout(SuccessShout)});
}

////////////////////////////////////////////////////////////////////////////////
// Data submission in forms

function SubmitData(dataObject,destinationObj){
	var data=dataObject;
	data.formDataNameOrder=destinationObj.headers;		//to delete
	data.formGoogleSendEmail="";						//to delete
	data.formGoogleSheetName=destinationObj.sheet;

	console.log(data);

	if(!PreviousSubmission.history)
		PreviousSubmission.history=[];
	PreviousSubmission.history.push(data);

	EchoData(data,destinationObj.url);
}

function SubmitValidAnswer(DP){
	var formDestination=DP.findDestination(DP);
	var destinationObject=GetDestination(formDestination);
	var dataObject=(destinationObject.Data)(DP.qid);
	SubmitData(dataObject,destinationObject);
}

function InvalidateAnswer(DF){
	var filled=FindData(DF.qfield,DF.pid)!=="";
	var validator=DF.qvalidator(DF);
	var invalid=((DF.qrequired||filled)&&!validator.valid);
	var qid=DF.qid;
	var errorid="error-"+qid;
	RemoveElement(errorid);
	if(invalid){
		FocusElement(qid);
		var errormessage=validator.error;
		if(!DF.qrequired)
			errormessage=errormessage+" Or leave this field empty instead...";
		AppendElement(ErrorHTML(errormessage,errorid),qid);
	}
	return invalid;
}

function CheckSubmit(qid){
	var DP=GetDataPack(qid);
	if(typeof DP!=="undefined"){
		RemoveElements("error",qid);
		var invalidation=DP.fields.map(InvalidateAnswer);
		if(!invalidation.some(Identity)){
			SubmitAnswerSet(DP);
		}
	}
};

function SubmitAnswerSet(DP){
	if(typeof DP!=="undefined"){
		function SubAndContinue(){
			DP.actionvalid(DP);
			CloseAndContinue(DP);
		}
		if(DP.requireConnection&&!Online()){
			ListenOnce("online",SubAndContinue);
			ConsoleAdd("<b>Network offline...</b>Submission saved - will be re-sent when back online.");
		}
		else
			SubAndContinue();
	}
}


function PreviousSubmission(field){
	if(!PreviousSubmission.history)
		PreviousSubmission.history=[];

	var s=PreviousSubmission.history.filter(function(datasub){return ((typeof datasub[field])!=="undefined")});

	if(s.length>0)
		return Last(s)[field];
	else
		return undefined;
}


// Data finding in forms

function FindDataExternally(field,pid){
	return GetDefaultNodeData(field,pid)||PreviousSubmission(field);
};

function FindData(field,pid){
	var e=GetElement(".field-"+field,pid);
	if(!e)
		return FindDataExternally(field,pid);

	var data=GetNodeData(field,e);
	if(typeof data==="undefined")
		data=FindDataExternally(field,pid);
	return data;
};

function GetNodeData(field,elem){
	if(FocusableInput(elem)&&elem.dataset&&(typeof elem.dataset[field]!=="undefined"))
		return elem.value;
	else
		return elem.dataset[field];
}


///////////////////////

function GetDataPack(id){
	if(!GetDataPack.history)
		GetDataPack.history=[];

	return GetDataPack.history.find(
		function(DP){return DP.qid===id;}
		);
};

function GetDefaultNodeData(field,id){
	if(id)
		var DP=GetDataPack(id);
	else
		var DP=CurrentDatapack();

	var data=DP[field];
	if(data!==undefined)
		return data;
	else{
		data=GetFieldValue(field,id);
		if(data!==undefined)
			return data;
		return PreviousSubmission(field);
	}
};

function SetData(field,value,id){
	//console.log(field,value,id);
	var DP=GetDataPack(id);
	if(DP!==undefined){
		GetDataPack(id)[field]=value;
		Shout("Set "+field);
	}
};

function ClearData(field,id){
	SetData(field,"",id);
};

function GetField(field,parentid){
	var DP=GetDataPack(parentid);
	if(DP!==undefined){
		var fis=DP.fields.filter(function(f){return (f.qfield===field)});
		if(fis.length>0)
			return fis[0];
	}
}

function GetFieldValue(field,parentid){
	var fi=GetField(field,parentid);
	if(fi!==undefined)
		return	fi.qvalue;
}

function ExecuteChoice(field,value,pid){
	GetField(field,pid).executeChoice(value,pid); //Not dynamically updated. And why should it be?
};


///////////////////////////////////////////////////////////////////////////////
// Global Data Transmission Variables


function GetDestination(dname){
	return DESTINATIONS[dname];
}

///////////////////////////////////////////////////////////////////////////////
// Modals

function ModalHTML(content,id,type){
	var t=type?(" "+type):"";
	return'<div class="modal window'+t+'" id="'+id+'">\
			<div class="modal-frame">\
				'+CloseButtonHTML(id)+'\
				<div class="modal-content">\
					'+content+'\
				</div>\
			</div>\
		</div>';
}

function OpenModal(content,id,targetid){
	AddElement(ModalHTML(content,id),targetid);
	FocusInside(id);
}

function OpenMessageModal(message,id,targetid){
	var qid=id?id:GenerateId();
	var targetid=targetid?targetid:document.body.id;
	OpenModal(MessageHTML(message)+OkButtonHTML(qid),qid,targetid);
}

//Modal self-laucher for questions (datapacks)
function LaunchModal(DP){
	OpenModal(QuestionHTML(DP),DP.qid,DP.qtargetid);
}


///////////////////////////////////////////////////////////////////////////////
//Embedded info
function LaunchEmbed(DP){
	AddElement(QuestionHTML(DP),DP.qtargetid);
}


///////////////////////////////////////////////////////////////////////////////
//Video modal

function VideoEmbedHTML(ytid,origin){
	var ori=origin?"&origin="+origin:"";
	return '<iframe frameborder="0" scrolling="no" marginheight="0" marginwidth="0"width="100%" height="100%" type="text/html" src="https://www.youtube.com/embed/'+ytid+'?autoplay=1&fs=1&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0'+ori+'"></iframe>'};

function OpenVideoModal(ytid){
	AddElement(ModalHTML(VideoEmbedHTML(ytid,PageTag()),GenerateId(),"gallery-video"),document.body.id);
}

///////////////////////////////////////////////////////////////////////////////
// Form Validators and Modifiers

// Pattern Validator Generator
function PatternValidatorGenerator(pattern,errormessage){
	function ValidatorFunction(DF){
		var string=FindData(DF.qfield,DF.pid);
		if((typeof string!=="undefined")&&(string.match(pattern)!==null))
			return {valid:true,error:"none"}
		else if(DF.qerrorcustom!=='')
			return {valid:false,error:DF.qerrorcustom}
		else
			return {valid:false,error:errormessage}
		};
	return ValidatorFunction;
}

// Form Validators

function IdentityValidator(DF){return {valid:true,error:"no errors"};}

function EmailValidator(DF){
	var pattern=/(?:[\u00A0-\uD7FF\uE000-\uFFFF-a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[\u00A0-\uD7FF\uE000-\uFFFF-a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[\u00A0-\uD7FF\uE000-\uFFFF-a-z0-9](?:[\u00A0-\uD7FF\uE000-\uFFFF-a-z0-9-]*[\u00A0-\uD7FF\uE000-\uFFFF-a-z0-9])?\.)+[\u00A0-\uD7FF\uE000-\uFFFF-a-z0-9](?:[\u00A0-\uD7FF\uE000-\uFFFF-a-z0-9-]*[\u00A0-\uD7FF\uE000-\uFFFF-a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/ig;
	var errormessage="Please verify your e-mail address!";
	return PatternValidatorGenerator(pattern,errormessage)(DF);
}

function SomeTextValidator(DF){
	var pattern=/[\d\w]/;
	var errormessage="Please write something!";
	return PatternValidatorGenerator(pattern,errormessage)(DF);
}

function NameValidator(DF){
	var pattern=/[\d\w][\d\w]+/;
	var errormessage="Please write at least 2 alphanumerics!";
	return PatternValidatorGenerator(pattern,errormessage)(DF);
}

function URLValidator(DF){
	var pattern=/((https?:\/\/(www\.)?)|(www\.))(.*)\.(.*)/;
	var errormessage="Please write a valid url, starting with e.g. https:// or www.";
	return PatternValidatorGenerator(pattern,errormessage)(DF);
}

// Utility
function SomeTextValidate(name){
	var pattern=/[\d\w]/;
	return name.match(pattern)!==null;
}


///////////////////////////////////////////////////////////////////////////////
//Message Console 

var consolebuffer=[];
var consolemax=3;

function ConsoleClear(){
	RemoveChildren("Console");
}

function ConsoleRemove(mID){
	RemoveElement(mID);
	var i=consolebuffer.indexOf(mID);
	if(i>=0)
		consolebuffer.splice(i,1)
}

function ConsoleMessageHTML(message,mID,mclass){
	var mclass=mclass||"";
	return '<div class="message '+mclass+'" id='+mID+'>'+message+'</div>';
}

function TextReadDuration(textstring){ //by counting number of words, 250ms per word
	var textstring=textstring.replace(/\<(span|svg).*\<\/\1\>/ig,""); //remove svg and span contents (text icons)
	return Min(Max(1000,(textstring.split(" ").length)*250),10000);
}

function ConsoleAdd(messageHTML,wait,duration,mID,consoleID,mClass){
	var consoleID=consoleID||"Console";
	if(GetElement(consoleID)===null)
		ConsoleLoad(undefined,consoleID);

	var duration=duration?Max(1000,duration):TextReadDuration(messageHTML);
	var wait=wait?wait:0;
	var mID=mID?mID:"c-"+GenerateId();//random id
	setTimeout(function(){AddElement(ConsoleMessageHTML(messageHTML,mID,mClass),consoleID)},wait)
	setTimeout(function(){CloseElement(mID)},duration+wait);
	consolebuffer.push(mID);
	while(consolebuffer.length>consolemax){
		ConsoleRemove(consolebuffer[0]);
	}
}

function ConsoleLoad(selector,consoleID){
	var consoleID=consoleID||"Console";
	var selector=selector||'.main';
	RemoveElement(consoleID,selector);
	AddElement('<div class="Console" id="'+consoleID+'"></div>',selector);
}

function ConsoleAddMany(messagesArray,consoleID,mClass){
	if(!messagesArray)
		return;
	var consoleID=consoleID||"Console";
	
	if(!ConsoleAddMany[consoleID])
		ConsoleAddMany[consoleID]=Date.now();
	
	var delay=Max(0,ConsoleAddMany[consoleID]-Date.now());
	
	for (var i=0;i<messagesArray.length;i++){
		ConsoleAdd(messagesArray[i],delay,undefined,undefined,consoleID,mClass);
		delay=delay+TextReadDuration(messagesArray[i]);
	}
	
	ConsoleAddMany[consoleID]=Date.now()+delay;
}

function ConsoleAddOnce(messageHTML,wait,duration){
	if(!ConsoleAddOnce.messages)
		ConsoleAddOnce.messages=[];

	if(!In(ConsoleAddOnce.messages,messageHTML)){
		ConsoleAdd(messageHTML,wait,duration)
		ConsoleAddOnce.messages.push(messageHTML);
	}
}


//DataPack integration in console
function LaunchConsoleMessage(DP){
	ConsoleAdd(QuestionHTML(DP),undefined,undefined,DP.qid);
}

function LaunchConsoleThanks(DP){
	ConsoleAdd(DP.thanksmessage);
}


///////////////////////////////////////////////////////////////////////////////
//Sounds Control

function MakeSound(sourcepath,data,id){
	return ElementHTML({
		tag:"audio",
		txt:" ",
		attributes:FuseObjects({'class':'sound',type:'audio/mpeg',preload:'auto','src':sourcepath,'id':(id?id:IDfy(sourcepath))},data?Datafy(data):{})
	});
}

function LoadSound(soundpath,data,id,parentElement){
	return AddElement(MakeSound(soundpath,data,id),parentElement);
}

function LS(soundobject,id,parentElement){
		var src=soundobject.src;
		var opts=FuseObjects(soundobject,{});
		delete opts.src;
		LoadSound(src,opts,id,parentElement);
};

function LoadSounds(soundtrack,parentElement){
	var names=Keys(soundtrack);
	names.map(function(name){LS(soundtrack[name],name,parentElement)});
}

function PlaySound(src){
	var s=new Audio(src);
	s.play();
	return;
}

///////////////////////////////////////////////////////////////////////////////
//Music Control

//Playlist
function Playlist(i){
	if(typeof Playlist.p==="undefined"){
		Playlist.p=GetElements('.music');
		Playlist.l=Playlist.p.length;
	}
	if(typeof i==="undefined"){
		return Playlist.p;
	}
	else{
		Playlist.current=i%Playlist.l;
		return Playlist.p[Playlist.current];
	}
}

function PlaylistStartPlay(){
	PlaySong(Playlist(0));
	//console.log("Music on");
}


//Song
function Muted(){
	var mutebutton=GetElement("MusicButton");
	if(mutebutton)
		return !Selected(mutebutton);
	else
		return false;
}
function Mute(){
	Deselect("MusicButton");
}
function Unmute(){
	Select("MusicButton");
}

function SongName(song){
	return UnPosfix(FileSong(song),[".mp3",".wav",".ogg"]);
}

function ValidSong(song){
	return (typeof song!=="undefined")&&(SongName(song)!==FileSong(song));
}


function PlaySong(song){
	if(ValidSong(song)&&song.paused){
		song.play();
		ListenOnce('ended',PlayNextF(song),song);
		Unmute();
		Listen("blur", PlaylistSleep);
		//console.log("Now playing: "+song);
	}
}

function PauseSong(song){
	if(ValidSong(song)&&!song.paused){
		song.pause();
		ConsoleAdd("Music paused...");
		Mute();
		window.removeEventListener("blur", PlaylistSleep);
	}
}

function ResumeSong(song){
	if(ValidSong(song)&&song.paused){
		song.play();
		ConsoleAdd("Resumed playing ♫♪♪ "+SongTitle(song));
		Unmute();
		Listen("blur", PlaylistSleep);
	}
}

function SongTitle(song){
	return SongName(song).replace(/\%20/g," ");
}

function FileSong(song){
	return PageRelativePath(song.src).replace(/.*\//,"");
}

function PlayNextF(song){
	return function(){
		PlaySong(Playlist(Playlist.current+1));
		song.removeEventListener('ended',PlayNextF);
		//console.log("Finished playing: "+song);
	}
}


//Player

function CurrentSong(){
	return Playlist.p[Playlist.current];
}

function HasSong(){
	return (typeof Playlist.current)!=="undefined";
}

function ToggleCurrentSong(){
	var song=CurrentSong();
	if(typeof song==="undefined")
		ConsoleAdd("Error: can't find the jukebox...");
	else if(song.paused){
		ResumeSong(song);
	}
	else {
		PauseSong(song);
	}
}

function PlaylistSleep(){
	if(!Playlist.sleep){
		Playlist.sleep=true;
		PauseSong(CurrentSong());
		Listen("focus", PlaylistAwaken);
	}
}

function PlaylistAwaken(){
	if(Playlist.sleep){
		Playlist.sleep=false;
		ResumeSong(CurrentSong());
		window.removeEventListener("focus", PlaylistAwaken);
	}
}



///////////////////////////////////////////////////////////////////////////////
//Fullscreen

function FullscreenAllowed(){
	return (document.exitFullscreen||document.mozCancelFullScreen||document.webkitExitFullscreen||document.msExitFullscreen||(document.webkitFullscreenElement&&document.webkitExitFullscreen)||false)!==false;
}

function FullscreenActivate(browserprefix){
	function Deactivate(){
		if(!(document.fullscreenElement||document.webkitFullscreenElement)){
			Deselect("FullscreenButton");
			FreeFullscreenCursor();
		}
	}
	//If a change is detected within the next 512 ms, trigger the button
	[0,1,2,4,8,16,32,64,128,256,512].map(function(timedelay){
		setTimeout(function(){ListenOnce(browserprefix,Deactivate,document)},timedelay);
	});
	return
};

function FullscreenOpen(targetIDsel){
	var e=GetElement(targetIDsel);
	var f;
	if(f=e.requestFullscreen){
		e.requestFullscreen();
		FullscreenActivate("fullscreenchange");
	} else if(f=e.mozRequestFullScreen){ /* Firefox */
		e.mozRequestFullScreen();
		FullscreenActivate("mozfullscreenchange");
	} else if(f=e.webkitRequestFullscreen){ /* Chrome, Safari and Opera */
		e.webkitRequestFullscreen();
		FullscreenActivate("webkitfullscreenchange");
	} else if(f=e.msRequestFullscreen){ /* IE/Edge */
		e.msRequestFullscreen();
		FullscreenActivate("msfullscreenchange");
	} 

	//Place the console correctly
	if(f){
		Select("FullscreenButton");
		ConsoleLoad(targetIDsel);
		ShowFullscreenCursor();
	};
}

function FullscreenClose(){
	var f;
	if(document.fullscreenElement){
		if(f=document.exitFullscreen){
			document.exitFullscreen();
		} else if(f=document.mozCancelFullScreen){ /* Firefox */
			document.mozCancelFullScreen();
		} else if(f=document.webkitExitFullscreen){ /* Chrome, Safari and Opera */
			document.webkitExitFullscreen();
		} else if(f=document.msExitFullscreen){ /* IE */
			document.msExitFullscreen();
		}
	}
	if(document.webkitFullscreenElement&&document.webkitExitFullscreen){ /*Edge*/
		document.webkitExitFullscreen();
		f=true;
	}

	if(f) {
		Deselect("FullscreenButton");
		FreeFullscreenCursor();
	};
}

function FullscreenToggle(targetIDsel){
	FullscreenElement.selector=targetIDsel;
	if(FullscreenAllowed()){
		if(document.fullscreenElement||document.webkitFullscreenElement){
			FullscreenClose();
		}
		else{
			FullscreenOpen(targetIDsel);
		}
	}
	else
		ConsoleAdd("Fullscreen: Please inform Pedro PSI that your browser is not yet supported!");
};

function FullscreenElement(){
	return GetElement(FullscreenElement.selector);
}

//Fullscreen cursor
function HiddenFullscreenCursor(){
	return Classed(FullscreenElement(),"hideCursor");
}
function HideFullscreenCursor(){
	if(!HiddenFullscreenCursor()){
		Class(FullscreenElement(),"hideCursor");
		HideFullscreenCursor.last=ListenOnce('mousemove',ShowFullscreenCursor,FullscreenElement());
	}
}
function ShowFullscreenCursor(){
	UnClass(FullscreenElement(),"hideCursor");
	FreeFullscreenCursor.timeout=setTimeout(HideFullscreenCursor,3000);
}
function FreeFullscreenCursor(){
	UnClass(FullscreenElement(),"hideCursor");
	clearTimeout(FreeFullscreenCursor.timeout);
	if(HideFullscreenCursor.last)
		ListenNoMore(HideFullscreenCursor.last);
}


///////////////////////////////////////////////////////////////////////////////
//Contextual Shortcuts

var ContextualShortcuts={
	"BODY":{
		"tab":FocusNext,
		"shift tab":FocusPrev,
		"up":FocusPrev,
		"down":FocusNext,
		"left":FocusPrev,
		"right":FocusNext,
		"W":FocusPrev,
		"S":FocusNext,
		"A":FocusPrev,
		"D":FocusNext
	},
	".window":{
		"escape":CloseCurrentDatapack,
		"ctrl w":CloseCurrentDatapack,
		"ctrl enter":SubmitCurrentDatapack,
		"enter":SubmitCurrentDatapack,
		"tab":FocusNext,
		"shift tab":FocusPrev,
		"left":FocusPrev,
		"right":FocusNext,
		"up":FocusPrev,
		"down":FocusNext,
		"W":FocusPrev,
		"S":FocusNext,
		"A":FocusPrev,
		"D":FocusNext
	},
	".navi":{
		"up":FocusPrevParent,
		"down":FocusNextParent,
		"left":ClickPrevBounded,
		"right":ClickNextBounded,
		"W":FocusPrevParent,
		"S":FocusNextParent,
		"A":ClickPrevBounded,
		"D":ClickNextBounded
	},
	".buttonrow":{
		"up":FocusPrevParent,
		"down":FocusNextParent,
		"left":FocusPrevBounded,
		"right":FocusNextBounded,
		"W":FocusPrevParent,
		"S":FocusNextParent,
		"A":FocusPrevBounded,
		"D":FocusNextBounded
	},
	".button":{
		"enter":ClickStay,
		"space":ClickStay,
		"X":ClickStay
	},
	"A":{
		"space":ClickStay
	},
	".input":{
		//"alt enter":EnterLine, or dispatch event (enter?)
		//"shift enter":EnterLine,		"escape":CloseCurrentDatapack,
		"escape":CloseCurrentDatapack,
		"enter":FocusNext,
		"ctrl enter":SubmitCurrentDatapack,
		"tab":FocusNext,
		"shift tab":FocusPrev
	},
	".gif":{
		"space":PlayPauseGif,
		"enter":PlayPauseGif,
		"X":PlayPauseGif
	}
}


//Context finding
function Context(targetSelector){
	var context;
	if(typeof targetSelector==="undefined")
		context=ElementContext(Spotlight());
	else
		context=ElementContext(targetSelector);

	if(!context){
		var e=FocusElement(document.activeElement);
		context=ElementContext(e)||ElementContext("BODY");
	}

	return context;
}

function ElementContext(targetSelector){
	var e=GetElement(targetSelector);
	if(!e){
		return console.log("no element for context",targetSelector); //Add last context
	}

	var context=SubContext(e);
	var subcontext;

	while(e.parentElement&&!ContextBlocker(e)){
		e=e.parentElement;
		subcontext=SubContext(e);
		if(!subcontext)
			subcontext={};
		context=FuseObjects(Clone(subcontext),context);
	}
	return context;
}

function ContextBlocker(e){
	return FocusableInput(e)||Classed(e,"window");
}

function SubContext(elem){
	var keyActions=FindFirstMatch(ContextualShortcuts,elem);
	if(keyActions)
		return UpdateKeys(keyActions,ComboKeystring);
	else
		return undefined;
}


//Add Shortcuts
function OverwriteShortcuts(selector,keyActions){
	var keyActions=UpdateKeys(Clone(keyActions),ComboKeystring);

	if(!ContextualShortcuts[selector])
		ContextualShortcuts[selector]=keyActions;
	else
		ContextualShortcuts[selector]=FuseObjects(keyActions,UpdateKeys(ContextualShortcuts[selector],ComboKeystring));

	return ContextualShortcuts[selector];
}

function DeleteShortcuts(selector){
	if(ContextualShortcuts[selector])
		delete ContextualShortcuts[selector];
	return ContextualShortcuts;
}



///////////////////////////////////////////////////////////////////////////////
//Keyboard input
function UnCtrlKeyString(keystring){
	return keystring.replace(/co?n?tro?l/i,"").replace(/co?mm?a?n?d/i,"");
}
function UnShiftKeyString(keystring){
	return keystring.replace(/sh?i?ft?/i,"");
}
function UnAltKeyString(keystring){
	return keystring.replace(/alt/i,"");
}
function UnEnterKeyString(keystring){
	return keystring.replace(/ente?r/i,"").replace(/re?tu?rn/i,"");
}


function UnSpaceKeyString(keystring){
	return keystring.replace(/spa?ce?b?a?r?/i,"");
}

function CtrlKey(keystring){
	return keystring!==UnCtrlKeyString(keystring);
}
function ShiftKey(keystring){
	return keystring!==UnShiftKeyString(keystring);
}
function AltKey(keystring){
	return keystring!==UnAltKeyString(keystring);
}
function EnterKey(keystring){
	return keystring!==UnEnterKeyString(keystring);
}
function SpaceKey(keystring){
	return keystring!==UnSpaceKeyString(keystring);
}


//Canonical Keystring Combo
function EventKeystring(event){
	var keystring=
	(event.ctrlKey? "ctrl " :"")+
	(event.altKey?  "alt "  :"")+
	(event.shiftKey?"shift ":"")+
	KeyNumberLookup(event.keyCode);
	return ComboKeystring(keystring);
}

function ComboKeystring(key){
	if(typeof key==="number")
		return ComboKeystring(KeyNumberLookup(key));
	else {//reduce to one space, lowercase, order: ctrl alt shift
		var keystring=key.toLowerCase();

		keystring=UnShiftKeyString(keystring);
		keystring=UnAltKeyString(keystring);
		keystring=UnCtrlKeyString(keystring);
		keystring=UnEnterKeyString(keystring);
		keystring=UnSpaceKeyString(keystring);

		keystring=keystring.replace(/[\+\.\-\ ]*/g,"");

		if(SpaceKey(key))
			keystring="space "+keystring;
		if(EnterKey(key))
			keystring="enter "+keystring;
		if(ShiftKey(key))
			keystring="shift "+keystring;
		if(AltKey(key))
			keystring="alt "+keystring;
		if(CtrlKey(key))
			keystring="ctrl "+keystring;

		keystring=UnPosfix(keystring," ");

		return keystring;
	}
}

function KeyNumberLookup(keynumber){
	for(var i in KeyCodes){
		if(KeyCodes[i]===keynumber)
			return i;
	}
	//console.log("no key for number:",keynumber);
	return "";
}

var KeyCodes={
	'none':0,
	'break':3,
	'backspace':8,
	'tab':9,
	'clear':12,
	'enter':13,
	'shift':16,
	'ctrl':17,
	'alt':18,
	'pause':19,
	'caps lock':20,
	'escape':27,
	'spacebar':32,
	'page up':33,
	'page down':34,
	'end':35,
	'home':36,
	'left':37,
	'arrowleft':37,
	'up':38,
	'arrowup':38,
	'right':39,
	'arrowright':39,
	'down':40,
	'arrowdown':40,
	'select':41,
	'print':42,
	'execute':43,
	'print screen':44,
	'insert':45,
	'delete':46,
	'help':47,
	'0':48,
	'1':49,
	'2':50,
	'3':51,
	'4':52,
	'5':53,
	'6':54,
	'7':55,
	'8':56,
	'9':57,
	'ß':63,
	'a':65,
	'b':66,
	'c':67,
	'd':68,
	'e':69,
	'f':70,
	'g':71,
	'h':72,
	'i':73,
	'j':74,
	'k':75,
	'l':76,
	'm':77,
	'n':78,
	'o':79,
	'p':80,
	'q':81,
	'r':82,
	's':83,
	't':84,
	'u':85,
	'v':86,
	'w':87,
	'x':88,
	'y':89,
	'z':90
}


//Key Capturing
function CaptureComboKey(event){
	event=event||window.event;
	var keystring=EventKeystring(event);
	var context=Context();
	if(In(context,keystring)){
		event.preventDefault();
		context[keystring](event);
	}
}

//Key Capturing Setters
function StopCapturingKeys(OnKeyDown){
	document.removeEventListener('keydown',OnKeyDown); // TODO improve
}
function ResumeCapturingKeys(OnKeyDown){ // TODO improve
	StopCapturingKeys(OnKeyDown);
	document.addEventListener('keydown',OnKeyDown);
}

//Start Keys
ResumeCapturingKeys(CaptureComboKey);


//Datapack Integration
function SetDatapackShortcuts(DP){
	return OverwriteShortcuts("#"+DP.qid,DP.shortcutExtras);
}
 


///////////////////////////////////////////////////////////////////////////////
// Time-based functions

function AutoRepeat(RepeatF,delay,name){
	var name=name||FunctionName(RepeatF);
	clearTimeout(AutoRepeat[name]);
	AutoRepeat[name]=setTimeout(function(){
		RepeatF();
		AutoRepeat(RepeatF,delay,name);
	},delay);
}

function AutoStop(RepeatF,delay,name){
	var name=name||FunctionName(RepeatF);
	clearTimeout(AutoRepeat[name]);
	setTimeout(function(){
		clearTimeout(AutoRepeat[name]);
	},delay);
}

function Monitor(MonitorF,delay,DisplayF){
	var DisplayF=DisplayF?DisplayF:console.log;
	function M(){
		DisplayF(MonitorF());
	}
	AutoRepeat(M,delay);
}


//Prevent execution unless time cooldown exceeded, in ms
function Throttle(F,cooldown,id){
	if(!Throttle[id]||Date.now()-Throttle[id]>=cooldown){
		Throttle[id]=Date.now();
		return F();
	}
	return false;
}

//Delay execution until certain condition is met
function DelayUntil(Condition,F,i){
	var n=Condition.name+F.name+(i?i:0);

	if(!DelayUntil[n])
		DelayUntil[n]=0;
	DelayUntil[n]++;

	if(Condition()){
		DelayUntil[n]=0;
		return F();
	}
	else{
		//console.log(DelayUntil[n]);

		if(DelayUntil[n]<10){
			function D(){return DelayUntil(Condition,F,i);};
			setTimeout(D,100*(Power(2,DelayUntil[n])));
		}
		else
			console.log("Timed out: ",n);
	}
}

//ExecuteOnce
function Once(F,id){
	if(!Once[id]){
		Once[id]=true;
		return F();
	}
	return false;
}

//Schedule and UnSchedule

function Schedule(actionF,time,queueName){
	if(!Schedule[queueName])
		Schedule[queueName]={};
	var id=setTimeout(actionF,time);
	Schedule[queueName][time]=id;
}

function UnSchedule(unactionF,time,queueName){
	if(!Schedule[queueName]||!Schedule[queueName][time])
		return;
	unactionF();
	UnScheduleF(queueName)(time);
}

function UnScheduleF(queueName){
	return function(time){clearTimeout(time);delete Schedule[queueName][time];};
}

function UnScheduleAll(queueName){
	if(!Schedule[queueName])
		return;
	MapObject(Schedule[queueName],UnScheduleF(queueName))
	delete Schedule[queueName];
}


///////////////////////////////////////////////////////////////////////////////
// Cycle

function ArrayHash(array){
	return "hash"+JSON.stringify(array).replace(/[^\w]|\d/g,"");
}

function CyclePosition(array){
	var arrayhash=ArrayHash(array);
	if(!Cycle.hashArray||!In(Cycle.hashArray,arrayhash))
		return 0;
	else
		return Cycle.hashArray[arrayhash];
}

function Cycle(array,n,bounded){
	var arrayhash=ArrayHash(array);
	if(!Cycle.hashArray)
		Cycle.hashArray={};

	if(!In(Cycle.hashArray,arrayhash))
		Cycle.hashArray[arrayhash]=0;
	else{
		var i=(Cycle.hashArray[arrayhash]+n);

		if(bounded===true)
			i=Max(Min(i,array.length-1),0);
		else
			i=i%(array.length);

		Cycle.hashArray[arrayhash]=i;
	}
	return array[Cycle.hashArray[arrayhash]];
}

function CycleStay(array){
	return Cycle(array,0);
}

function CycleNext(array){
	return Cycle(array,1);
}

function CyclePrev(array){
	return Cycle(array,-1);
}

function CycleNextBounded(array){
	return Cycle(array,1,true);
}

function CyclePrevBounded(array){
	return Cycle(array,-1,true);
}


///////////////////////////////////////////////////////////////////////////////
//Image
var ImageExtensions=["apng","bmp","gif","ico","cur","jpg","jpeg","jfif","pjpeg","pjp","png","svg","tif","tiff","webp"];

function LoadImage(fullpath,parentIDsel){

	function ImageReplace(data){
		if(data==="")
			return console.log("no image found at: "+fullpath);

		if(IsGif(fullpath)){
			gifID=GenerateId();
			loaded=ImageHTML({attributes:{id:gifID,src:fullpath,onload:'StartGIF('+gifID+')',tabindex:'0',class:"gif"}});
		}
		else
			loaded=ImageHTML({attributes:{src:fullpath}});

		ReplaceChildren(loaded,parentIDsel);
	}

	LoadData(fullpath,ImageReplace);
}

function IsImageReference(ref){
	return ImageExtensions.some(function(ext){return InPosfix(ref,"."+ext)});
}

//GIF Pause Support
function IsGif(ref){
	return InPosfix(ref,".gif");
}

function StartGIF(gid){
	var g=GetElement(gid);

	RemoveElement(GetElementIn("CANVAS",g.parentElement));
	var c=AddElement("<canvas class='gif gifcanvas' tabindex='0'></canvas>",g.parentElement);

	Hide(g);
	ResizeGIF();
	c.addEventListener('resize',ResizeGIF);
	StartGIF.e=c;
	ListenOnce('click',PlayGif(c,gid),c);

	function ResizeGIF(){
		var g=GetElement(gid);
		var c=g.nextSibling;
		var w=g.width;
		var h=g.height;
		c.width=w;
		c.height=h;
		DrawImage({
			"elem":g,
			"width":w,
			"height":h,
			"ctx":".gifcanvas"
		});

		var s=Power(w*h,0.5)/3;

		DrawPolygon({
			"size":s/2,
			"fillColor":getComputedStyle(c)["color"],
			"strokeColor":getComputedStyle(c)["background-color"],
			"lineWidth":s/20,
			"n":1,
			x:w/2,
			y:h/2,
			"ctx":".gifcanvas"
		});

		DrawPolygon({
			"size":s/2*0.8,
			"fillColor":getComputedStyle(c)["background-color"],
			"n":3,
			x:w/2,
			y:h/2,
			"ctx":".gifcanvas"
		});

	}

}

function PlayGif(c,gid){
	return function(){
		var g=GetElement(gid);
		function SG(){
			return StartGIF(gid)
		}
		StartGIF.e=g;
		ListenOnce('click',SG,g);
		Show(g);
		Hide(c);
	}
}

function PlayPauseGif(){
	if(StartGIF.e)
		StartGIF.e.click();
}

///////////////////////////////////////////////////////////////////////////////
// Canvas Drawing

function GetContext(targetIDsel){
	var targetIDsel=targetIDsel||"CANVAS";
	return GetElement(targetIDsel).getContext("2d");
}

function DrawImage(txtObj){
	var ctx=GetContext(txtObj.ctx);
	if(!txtObj.elem)
		return console.log("no image element in",txtObj);

	var elem=txtObj.elem;
	var x=txtObj.x?txtObj.x:0;
	var y=txtObj.y?txtObj.y:0;
	var width=txtObj.width?txtObj.width:100; //Improve these defaults
	var height=txtObj.height?txtObj.height:100;

	ctx.drawImage(elem,x,y,width,height);
}

function DrawPolygon(txtObj){
	var ctx=GetContext(txtObj.ctx);
	var strokeColor=txtObj.strokeColor?txtObj.strokeColor:getComputedStyle(document.body)["strokeColor"];
	var fillColor=txtObj.fillColor?txtObj.fillColor:getComputedStyle(document.body)["background-strokeColor"];

	var x=txtObj.x?txtObj.x:0;
	var y=txtObj.y?txtObj.y:0;
	var size=txtObj.size?txtObj.size:100;

	var lineWidth=txtObj.lineWidth?txtObj.lineWidth:size/20;

	var n=txtObj.n?txtObj.n:3;				//Number of sides
	var startAngle=txtObj.startAngle?txtObj.startAngle:0;		//StartAngle

	ctx.beginPath();
	if(n>=3){
		for (var i=0;i<n;i++){
			var angle=startAngle+i*PI*2/n;
			var xpos=x+size*Cos(angle);
			var ypos=y+size*Sin(angle);
			ctx.lineTo(xpos,ypos);
		}
	}
	else{
		ctx.arc(x,y,size,0,PI*2);
	}
	ctx.closePath();
	ctx.fillStyle=fillColor;
	ctx.fill();

	if(txtObj.lineWidth){
		ctx.lineWidth=lineWidth;
		ctx.strokeStyle=strokeColor;
		ctx.stroke();
	}
}

///////////////////////////////////////////////////////////////////////////////
//Reduce

function Accumulate(acc,val){return acc+val};

///////////////////////////////////////////////////////////////////////////////
// Custom events 

function Shout(name,targetSelector){
	Shout[name]=targetSelector;//save memory
	var ev=new CustomEvent(name);
	var e=GetElement(targetSelector)||window;
	e.dispatchEvent(ev);
}

//polyfill
if(typeof window.CustomEvent!=="function"){
	function CustomEvent(event,optObj){
		optObj=optObj||{
			bubbles:false,
			detail:undefined,
			cancelable:false
			};
		var ev=document.createEvent('CustomEvent');
		ev.initCustomEvent(event,optObj.bubbles,optObj.cancelable,optObj.detail);
		return ev;
	}
	CustomEvent.prototype=window.Event.prototype;
	window.CustomEvent=CustomEvent;
}

///////////////////////////////////////////////////////////////////////////////
// Dates

function Today(){return new Date()};

function Month(date){
	var date=date||Today();
	return Number(date.toLocaleDateString().replace(/(\d)*\//,"").replace(/\/(\d)*/,""));
};

function Shorten3(name){
	return name.slice(0,3);
}

var Months=["January","February","March","April","May","June","July","August","September","October","November","December"];
var MonthsShort=Months.map(Shorten3);
var DayNames=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var DayNamesShort=DayNames.map(Shorten3);


function DayName(n,dayNamesArray){
	var dayNamesArray=dayNamesArray||DayNames;
	return dayNamesArray[n];
}

function MonthName(n,monthArray){
	return monthArray[n-1];
}

function Year(date){
	var date=date||Today();
	return Number(date.toLocaleDateString().replace(/.*\//,""));
}
function Month(date){
	var date=date||Today();
	return date.getMonth()+1;
}
function Day(date){
	var date=date||Today();
	return date.getDate();
}
function DayST(day){
	st=(day===1||day===21||day===31)?"st":(day===2||day===22)?"nd":(day===3||day===23)?"rd":"th";
	return st;
}
function WeekDay(date,dayNamesArray){
	var date=date||Today();
	var dayNamesArray=dayNamesArray||DayNames;
	return DayName(date.getDay(),dayNamesArray);
}

function Days(date1,date2){
	var date2=date2||Today();
	return (date2-date1)/1000/60/60/24
};

function DaysSortF(date1,date2){
	var d=Days(date1,date2);
	return d>0?1:d<0?-1:0;
};

function DateDate(day,month,year){
	if(typeof day==="undefined")
		return Today();
	return 	new Date(Number(year),Number(month)-1,Number(day));
}

function DateNamer(date){
	if(!date)
		return DateNamer(Today());
	return `${WeekDay(date,DayNames)}, ${Day(date)}<sup>${DayST(Day(date))}</sup> of ${MonthName(Month(date),Months)} ${Year(date)}`;
}

function DateRSS(date){
	if(!date)
		return DateRSS(Today());
	return `${WeekDay(date,DayNamesShort)}, ${Day(date)} ${MonthName(Month(date),MonthsShort)} ${Year(date)}`;
}

function DateName(day,month,year){
	date=DateDate(day,month,year);
	return DateNamer(date);
}

///////////////////////////////////////////////////////////////////////////////
// Range, in different order
function Range(min,max){
	if(!max)
		return Range(0,min);
	else{
		var r=[];
		if(min<=max)
			for(var i=min;i<=max;i++){
				r.push(i);
			}
		else
			for(var i=min;i>=max;i--){
				r.push(i);
			}
		return r;
	}
}

///////////////////////////////////////////////////////////////////////////////
// Object Props

function PropertyF(propertyName){
	return function(obj){return obj[propertyName];}
}

function PropertyEqualsF(propertyName,propertyValue){
	return function(obj){return obj[propertyName]===propertyValue;};
}




///////////////////////////////////////////////////////////////////////////////
// Banner Typewriter Effect
function MaxCharacters(e){
	var width=Number(UnPosfix(getComputedStyle(e).getPropertyValue("width"),"px"));
	var fontwidth=Number(UnPosfix(getComputedStyle(e).getPropertyValue("font-size"),"px"));
	return Quotient(width,fontwidth);
}

function BannerEffect(parentElement,txt,maxchars,duration){
	var queuename=txt;
	TypewriterBanner["running"]=queuename;

	var e=GetElement(parentElement);
	var originaltext=e.innerHTML;
	var maxchars=maxchars||MaxCharacters(e)+1;

	var j=0;
	var curtxt;
	var duration=duration||200;
	var txt=AddLeft(txt," ",maxchars);
		txt=AddRight(txt," ",txt.maxchars);

	function BannerTypeF(j,curtxt){return function(){
		if(TypewriterBanner["running"])
			ReplaceChildren(SpanHTML(curtxt,"typewriter-effect"),parentElement);
		else
			CancelBannerEffectF(parentElement,originaltext,queuename)();
		}};

	while(j<=txt.length){
		curtxt=txt.slice(Max(j,maxchars),Min(j+maxchars,txt.length));
		Schedule(BannerTypeF(j,curtxt),j*duration,queuename);
		j++;
	}
	Schedule(CancelBannerEffectF(parentElement,originaltext,queuename),j*duration,queuename);
}

function CancelBannerEffectF(parentElement,originaltext,queuename){
	return function(){
		ReplaceChildren(originaltext,parentElement);
		TypewriterBanner["running"]=false;
		UnScheduleAll(queuename);
	}
}


function TypewriterBanner(thi,txt,queuename){
	if(!TypewriterBanner["running"]&&!TypewriterBanner["blocked-"+queuename]){
		TypewriterBanner["planned-"+queuename]=setTimeout(function(){Once(function(){
			BannerEffect(thi,txt)},txt);
			//console.log("plan","planned-"+queuename);
			TypewriterBanner["planned-"+queuename]=false;
		},750);
	}
}

function CancelTypewriterBanner(thi,originaltext,queuename){
	clearTimeout(TypewriterBanner["planned-"+queuename]);

	//console.log("unplan and block","planned-"+queuename,TypewriterBanner["planned-"+queuename],TypewriterBanner["blocked-"+queuename]);

	if(TypewriterBanner["running"]){
		setTimeout(function(){
			CancelBannerEffectF(thi,originaltext,queuename);
			TypewriterBanner["blocked-"+queuename]=true;
			setTimeout(function(){TypewriterBanner["blocked-"+queuename]=false},500);
		},250);
	}
}


///////////////////////////////////////////////////////////////////////////////
//Symbol designs
function ObtainSymbol(name){
	var symbols={
		"how-to-play":IconHTML("M182 32 C 131 42,96 91,105 142 C 106 149,110 166,110 166 C 110 166,154 156,154 156 C 154 156,153 151,151 144 C 143 106,163 77,199 76 C 255 76,270 151,218 173 C 209 177,204 180,204 181 C 204 181,202 184,199 186 C 181 199,168 218,163 239 C 161 246,158 262,158 263 C 158 263,201 271,201 271 C 201 271,202 266,203 261 C 209 235,217 224,238 214 C 322 175,311 57,222 33 C 213 31,192 30,182 32 M155 304 C 118 318,127 372,167 372 C 203 372,217 326,187 307 C 178 302,164 300,155 304"),
		"credits":IconHTML("M178 0 C 34 15,-46 177,27 302 C 109 438,310 430,379 288 C 449 146,335 -15,178 0 M218 38 C 327 50,394 169,346 269 C 291 383,133 394,64 289 C -10 174,81 24,218 38 M185 78 C 104 88,56 172,87 248 C 117 320,209 344,273 297 C 284 289,310 260,309 257 C 308 256,273 229,271 229 C 271 229,267 233,263 238 C 232 280,183 286,148 252 C 89 195,156 98,230 132 C 244 139,253 146,267 167 L 271 171 274 169 C 275 168,284 162,293 155 L 310 143 308 141 C 282 104,259 87,224 80 C 217 78,192 77,185 78"),
		"undo":IconHTML("M216 78 C 174 84,137 106,112 139 L 106 148 100 145 C 97 144,87 139,77 134 C 58 125,58 125,58 127 C 58 127,64 153,71 184 C 78 215,84 241,85 242 C 85 244,194 194,194 192 C 194 191,185 186,173 181 C 161 175,152 170,152 170 C 151 168,164 155,170 150 C 221 110,293 122,328 177 C 339 194,343 211,344 237 L 345 248 355 247 C 360 247,371 246,379 246 L 394 246 394 240 C 394 192,379 153,348 122 C 313 88,262 71,216 78","400 400","0 -050"),
		"restart":IconHTML("M235 65 C 205 79,180 90,180 90 C 180 90,196 112,216 139 C 235 166,252 188,252 188 C 252 187,255 178,258 167 C 261 156,263 146,264 145 C 264 143,269 147,278 157 C 337 218,307 320,225 340 C 144 360,71 285,93 204 C 97 187,105 174,121 155 L 127 148 125 146 C 122 143,92 118,92 118 C 89 118,65 151,59 164 C 1 284,110 418,238 384 C 370 350,398 174,283 101 C 278 98,277 96,277 95 C 277 95,280 83,284 69 C 288 55,291 43,291 42 C 292 40,295 39,235 65"),
		"levelselector":IconHTML("M20 66 L 20 120 72 120 L 124 120 124 66 L 124 12 72 12 L 20 12 20 66 M147 66 L 147 120 200 120 L 252 120 252 66 L 252 12 200 12 L 147 12 147 66 M275 66 L 275 120 327 120 L 378 120 378 66 L 378 12 327 12 L 275 12 275 66 M87 66 L 87 83 72 83 L 57 83 57 66 L 57 50 72 50 L 87 50 87 66 M214 66 L 214 83 200 83 L 185 83 185 66 L 185 50 200 50 L 214 50 214 66 M341 66 L 341 83 327 83 L 312 83 312 66 L 312 50 327 50 L 341 50 341 66 M20 200 L 20 254 72 254 L 124 254 124 200 L 124 146 72 146 L 20 146 20 200 M147 200 L 147 254 200 254 L 252 254 252 200 L 252 146 200 146 L 147 146 147 200 M275 200 L 275 254 327 254 L 378 254 378 200 L 378 146 327 146 L 275 146 275 200 M87 200 L 87 216 72 216 L 57 216 57 200 L 57 183 72 183 L 87 183 87 200 M214 200 L 214 216 200 216 L 185 216 185 200 L 185 183 200 183 L 214 183 214 200 M341 200 L 341 216 327 216 L 312 216 312 200 L 312 183 327 183 L 341 183 341 200 M20 333 L 20 387 72 387 L 124 387 124 333 L 124 279 72 279 L 20 279 20 333 M147 333 L 147 387 200 387 L 252 387 252 333 L 252 279 200 279 L 147 279 147 333 M275 333 L 275 387 327 387 L 378 387 378 333 L 378 279 327 279 L 275 279 275 333 M87 333 L 87 349 72 349 L 57 349 57 333 L 57 316 72 316 L 87 316 87 333 M214 333 L 214 349 200 349 L 185 349 185 333 L 185 316 200 316 L 214 316 214 333 M341 333 L 341 349 327 349 L 312 349 312 333 L 312 316 327 316 L 341 316 341 333"),
		"fullscreen":IconHTML("M236 66 L 236 85 272 85 L 309 85 309 120 L 309 154 327 154 L 346 154 346 101 L 346 48 291 48 L 236 48 236 66 M38 142 L 38 200 57 200 L 75 200 75 160 L 75 121 112 121 L 148 121 148 102 L 148 84 93 84 L 38 84 38 142 M38 308 L 38 363 93 363 L 148 363 148 345 L 148 326 112 326 L 75 326 75 290 L 75 253 57 253 L 38 253 38 308 M272 290 L 272 326 236 326 L 199 326 199 345 L 199 363 254 363 L 309 363 309 308 L 309 253 291 253 L 272 253 272 290"),
		"save":IconHTML("M0 200 L 0 400 200 400 L 400 400 400 200 L 400 0 200 0 L 0 0 0 200 M56 99 L 56 165 200 165 L 344 165 344 99 L 344 34 355 34 L 365 34 365 200 L 365 365 355 365 L 344 365 344 277 L 344 189 200 189 L 56 189 56 277 L 56 365 45 365 L 34 365 34 200 L 34 34 45 34 L 56 34 56 99 M240 73 L 240 112 260 112 L 279 112 279 73 L 279 34 295 34 L 310 34 310 82 L 310 131 200 131 L 90 131 90 82 L 90 34 165 34 L 240 34 240 73 M310 294 L 310 365 200 365 L 90 365 90 294 L 90 223 200 223 L 310 223 310 294 M118 253 L 118 271 200 271 L 282 271 282 253 L 282 236 200 236 L 118 236 118 253 M118 296 L 118 313 200 313 L 282 313 282 296 L 282 279 200 279 L 118 279 118 296 M118 337 L 118 354 200 354 L 282 354 282 337 L 282 320 200 320 L 118 320 118 337"),
		"feedback":IconHTML("M7 139 L 7 274 200 274 L 393 274 393 139 L 393 4 200 4 L 7 4 7 139 M301 42 C 301 42,278 65,249 94 L 198 146 146 94 L 94 41 197 41 C 255 41,301 42,301 42 M355 140 L 355 237 200 237 L 44 237 44 142 L 44 47 121 123 L 197 200 276 121 C 319 78,355 42,355 42 C 355 42,355 86,355 140 M58 343 L 58 379 77 379 L 95 379 95 343 L 95 307 77 307 L 58 307 58 343 M304 343 L 304 379 322 379 L 341 379 341 343 L 341 307 322 307 L 304 307 304 343 M181 365 L 181 392 200 392 L 218 392 218 365 L 218 337 200 337 L 181 337 181 365"),
		"music":"♫",
		"more":"+",
		"hint":IconHTML("M240 122 L 154 209 152 207 C 128 190,88 188,59 203 C -16 240,-8 352,71 379 C 153 406,225 319,185 243 L 181 236 205 212 L 228 188 240 200 L 252 211 258 205 C 262 202,268 196,272 192 L 279 185 267 173 L 255 161 267 150 L 278 139 297 158 C 307 168,316 177,316 177 C 316 176,323 170,330 163 L 343 150 328 135 L 312 119 324 108 L 335 97 350 112 L 366 127 379 114 L 393 100 361 68 C 343 50,328 36,328 36 C 327 36,288 75,240 122 M118 234 C 162 248,172 305,136 333 C 100 363,44 336,44 288 C 44 250,82 222,118 234"),
		"keyboard":IconHTML("M0 88 L 0 177 200 177 L 400 177 400 88 L 400 0 200 0 L 0 0 0 88 M384 88 L 384 161 200 161 L 15 161 15 88 L 15 15 200 15 L 384 15 384 88 M30 41 L 30 53 42 53 L 55 53 55 41 L 55 29 42 29 L 30 29 30 41 M69 41 L 69 53 81 53 L 94 53 94 41 L 94 29 81 29 L 69 29 69 41 M108 41 L 108 53 121 53 L 133 53 133 41 L 133 29 121 29 L 108 29 108 41 M148 41 L 148 53 160 53 L 173 53 173 41 L 173 29 160 29 L 148 29 148 41 M187 41 L 187 53 199 53 L 212 53 212 41 L 212 29 199 29 L 187 29 187 41 M226 41 L 226 53 239 53 L 251 53 251 41 L 251 29 239 29 L 226 29 226 41 M266 41 L 266 53 278 53 L 291 53 291 41 L 291 29 278 29 L 266 29 266 41 M305 41 L 305 53 317 53 L 330 53 330 41 L 330 29 317 29 L 305 29 305 41 M344 41 L 344 53 357 53 L 369 53 369 41 L 369 29 357 29 L 344 29 344 41 M30 87 L 30 98 42 98 L 55 98 55 87 L 55 75 42 75 L 30 75 30 87 M69 87 L 69 98 81 98 L 94 98 94 87 L 94 75 81 75 L 69 75 69 87 M108 87 L 108 98 121 98 L 133 98 133 87 L 133 75 121 75 L 108 75 108 87 M148 87 L 148 98 160 98 L 173 98 173 87 L 173 75 160 75 L 148 75 148 87 M187 87 L 187 98 199 98 L 212 98 212 87 L 212 75 199 75 L 187 75 187 87 M226 87 L 226 98 239 98 L 251 98 251 87 L 251 75 239 75 L 226 75 226 87 M266 87 L 266 98 278 98 L 291 98 291 87 L 291 75 278 75 L 266 75 266 87 M305 87 L 305 98 317 98 L 330 98 330 87 L 330 75 317 75 L 305 75 305 87 M344 87 L 344 98 357 98 L 369 98 369 87 L 369 75 357 75 L 344 75 344 87 M30 134 L 30 147 53 147 L 77 147 77 134 L 77 121 53 121 L 30 121 30 134 M93 134 L 93 147 200 147 L 307 147 307 134 L 307 121 200 121 L 93 121 93 134 M322 134 L 322 147 346 147 L 369 147 369 134 L 369 121 346 121 L 322 121 322 134","400 180"),
		"wrench":IconHTML("M152 112 L 121 147 124 188 L 127 228 75 280 L 23 332 32 341 C 37 346,40 349,40 350 C 39 351,44 356,53 365 L 66 378 122 323 L 177 267 213 266 C 242 265,250 265,250 264 C 251 263,251 263,252 264 C 253 265,253 265,254 263 C 255 263,269 247,285 228 C 301 210,315 195,315 194 C 315 194,287 169,286 169 C 286 169,279 177,271 186 L 256 203 246 203 C 240 204,231 204,225 204 L 214 204 198 190 C 190 183,183 176,183 175 C 183 174,182 166,182 156 L 180 138 196 121 C 205 111,212 102,212 102 C 212 102,185 77,184 77 C 184 77,169 93,152 112"),
		"edit":IconHTML("M206 131 L 85 252 118 284 L 151 317 272 196 L 392 75 360 43 L 327 10 206 131 M245 169 L 151 263 145 257 L 139 252 233 158 L 327 64 333 70 L 338 75 245 169 M51 321 C 34 355,20 383,21 383 C 21 383,144 322,145 321 C 145 321,83 258,83 258 C 82 258,68 286,51 321"),
		"sun":SpanHTML(`<svg class='iconpath' viewBox="0 0 1012 1012" width="20" height="20" ><defs><clipPath id="pathsun"><path d="M96 46 1109 46 1109 1058 96 1058Z" fill-rule="evenodd" clip-rule="evenodd"/></clipPath></defs><g clip-path="url(#pathsun)" transform="translate(-96 -46)"><path d="M418.5 552C418.5 450.103 501.103 367.5 603 367.5 704.897 367.5 787.5 450.103 787.5 552 787.5 653.897 704.897 736.5 603 736.5 501.103 736.5 418.5 653.897 418.5 552Z"  stroke-width="80" stroke-linecap="round" stroke-miterlimit="8" fill="none" fill-rule="evenodd"/><path d="M603.5 81.5 603.5 220.563"  stroke-width="80" stroke-linecap="round" stroke-miterlimit="8" fill="none" fill-rule="evenodd"/>			<path d="M603.5 1022.56 603.5 883.5"  stroke-width="80" stroke-linecap="round" stroke-miterlimit="8" fill="none" fill-rule="evenodd"/>			<path d="M1073.56 552.5 934.5 552.5"  stroke-width="80" stroke-linecap="round" stroke-miterlimit="8" fill="none" fill-rule="evenodd"/>			<path d="M132.5 552.5 271.562 552.5"  stroke-width="80" stroke-linecap="round" stroke-miterlimit="8" fill="none" fill-rule="evenodd"/>			<path d="M935.135 218.928 836.803 317.26"  stroke-width="69.2708" stroke-linecap="round" stroke-miterlimit="8" fill="none" fill-rule="evenodd"/>			<path d="M269.865 884.197 368.197 785.865"  stroke-width="69.2708" stroke-linecap="round" stroke-miterlimit="8" fill="none" fill-rule="evenodd"/>			<path d="M935.135 884.197 836.803 785.866"  stroke-width="69.2708" stroke-linecap="round" stroke-miterlimit="8" fill="none" fill-rule="evenodd"/><path d="M269.865 218.928 368.197 317.26"  stroke-width="69.2708" stroke-linecap="round" stroke-miterlimit="8" fill="none" fill-rule="evenodd"/></g></svg>`),
		"moon":SpanHTML(`<svg class='iconpath' viewBox="-150 0 660 809" width="20" height="20" ><defs><clipPath id="pathmoon"><path d="M1250 158 1760 158 1760 967 1250 967Z" fill-rule="evenodd" clip-rule="evenodd"/></clipPath></defs><g clip-path="url(#pathmoon)" transform="translate(-1250 -158)"><path d="M1655.5 931.5C1451.71 931.5 1286.5 766.517 1286.5 563 1286.5 359.483 1451.71 194.5 1655.5 194.5 1451.71 347.138 1410.41 635.858 1563.25 839.375 1589.47 874.293 1620.53 905.312 1655.5 931.5Z"  stroke-width="80" stroke-linecap="round" stroke-miterlimit="8" fill="none" fill-rule="evenodd"/></g></svg>`)
		};
	if(!name)
		return symbols;
	else if(In(symbols,name.toLowerCase()))
		return symbols[name.toLowerCase()];
	else
		return name;
}


///////////////////////////////////////////////////////////////////////////////
//SVG Inliner


