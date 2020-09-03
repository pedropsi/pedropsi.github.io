///////////////////////////////////////////////////////////////////////////////
// (C) Pedro PSI 2017-2020

// functions are always defined as "function_name=function(args){body}" to:
//		1) allow anonymous export as node modules, yet working normally in browser
//			---regular expression to convert forth: 	
//				 	\nfunction ([^\(]+)
//					\n$1=function
//			---regular expression to convert back: 	
//				 	\n([^=\n]+)=function
//					\nfunction $1
//				 	 
//  	2) avoid Safari Conditional Hoisting bugs
//				(modules ask whether a function was defined before, thus not overwriting it)

// Function naming conventions (goal: concise self-documenting code):
//		- function names are Capitalised (this avoids conflicts with most JS libraries)
//
// 		- function names can be read as self describing sentences, usually VERB-->OBJECT
//
// 		- the first word may also refer to a particular set of related functions (to be improved). 
//
// 		- the last word reveals the function return type, while completing the sentence:
//	 		- a verb: not specified (if obvious - to be improved) or without a return value, only side effects
//	 		- "-ed", an adjective			: Binary value (true/false)
//	 		- "-er"							: Function
//	 		- "-s", a plural noun, "Array"	: an array
//	 		- "Element"						: a Node or HTML code or a Selector
//	 		- "Node"						: a HTML node element
//	 		- "HTML"						: HTML code
//	 		- "String"						: a string
//	 		- "Object"						: an object
//			etc...


NodejsDetected=function(){
	return typeof window==="undefined";
}

///////////////////////////////////////////////////////////////////////////////
//Do nothing
Identity=function(i){return i;};
True=function(){return true};
False=function(){return false};

UnFunction=function(data){
	if (typeof data==="function")
		return data();
	else
		return data;
}

//Key characters
var NumberCharacters=["0","1","2","3","4","5","6","7","8","9"];
var LetterCharacters="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
var AlphanumericCharacters=LetterCharacters.concat(NumberCharacters);
var LetterSpaceCharacters=LetterCharacters.concat(" ");
var Directions=["left","up","right","down"];


///////////////////////////////////////////////////////////////////////////////
// Deep equality testing
EqualArray=function(a,b){
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

EqualObject=function(a,b){
	return EqualArray(SortedKeys(a),SortedKeys(b))&&EqualArray(SortedValues(a),SortedValues(b));
}

EqualFunction=function(a,b){
	return FunctionBody(a)===FunctionBody(b); //Cannot see whether two functions compute the same thing, only whether the source is equal.
}

EqualRegex=function(a,b){
	return (a.source===b.source)&&(a.flags===b.flags);
}

Equal=function(a,b){
	if(typeof a==="undefined"&&typeof b==="undefined")
		return true;
	else if(typeof a!==typeof b)
		return false;
	else if(IsNan(a)&&IsNan(b))
		return true;
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
	else if(IsNode(a)&&IsNode(b))
		return a.isEqualNode(b);
	else{
		console.log("check this new case:",a,b);
		return false;
	}
}

///////////////////////////////////////////////////////////////////////////////
// Math

Max=function(){
	var args=[...arguments];
	args=args.map(arr=>IsArray(arr)?Max(...arr):arr)
	return Math.max(...args);
}

Min=function(){
	var args=[...arguments];
	args=args.map(arr=>IsArray(arr)?Min(...arr):arr)
	return Math.min(...args);
}


Floor=Math.floor;
Ceiling=Math.ceil;
Sin=Math.sin;
Cos=Math.cos;
PI=Math.PI;
Abs=Math.abs;
Log10=Math.log10;
Log=function(a,b){
	return Math.log(a)/Math.log(b);
}
Round=function(n,m){
	var m=m||0;
	return Floor(n*Power(10,m)+0.5)/Power(10,m);
}

PercentageText=function(n,m){
	var m=m||0;
	return ""+Round(n*100,m)+"%";
}

Quotient=function(n,d){
	return Floor(n/d);
}
Remainder=function(n,d){
	return Max(n-d*Quotient(n,d),0);
}

Power=function(n,exp){
	if(typeof exp==="undefined")
		return function(m){return Math.pow(m,n)}
	else
		return Math.pow(n,exp);
}

PoweredSum=function(vector,power){
	if(vector.length<1)
		return 0;
	else
		return vector.map(Power(power)).reduce(Accumulate);
}

VectorOperation=function(vector1,vector2,F){
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

VectorPlus=function(vector1,vector2){
	return VectorOperation(vector1,vector2,function(a,b){return a+b});
}
VectorMinus=function(vector1,vector2){
	return VectorOperation(vector1,vector2,function(a,b){return a-b});
}
VectorTimes=function(vector1,vector2){
	return VectorOperation(vector1,vector2,function(a,b){return a*b});
}
VectorDivide=function(vector1,vector2){
	return VectorOperation(vector1,vector2,function(a,b){return a/b});
}
VectorMean=function(vector1,vector2){
	return VectorOperation(vector1,vector2,function(a,b){return (a+b)/2});
}

VectorMax=function(vector1,vector2){
	return VectorOperation(vector1,vector2,Max);
}
VectorMin=function(vector1,vector2){
	return VectorOperation(vector1,vector2,Min);
}


EuclideanDistance=function(vector1,vector2){
	return Power(PoweredSum(VectorMinus(vector2,vector1),2),1/2);
}

///////////////////////////////////////////////////////////////////////////////
// Lists (AS = Array or String)

Last=function(AS){
	if(AS&&AS.length)
		return AS[AS.length-1];
	else
		return null;
}

First=function(AS){
	if(AS&&AS.length)
		return AS[0];
	else
		return null;
}

Rest=function(AS){
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

Most=function(AS){
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

Insert=function(array,n,p){
	if(typeof array==="string")
		return Insert(array.split(""),n,p).join("");

	var p=Max(Min(p,array.length),0);
	array.splice(p,0,n);
	return array;
}

InsertCut=function(array,n,p){
	var p=Max(Min(p,array.length),0);
	array.splice(p,array.length-p,n);
	return array;
}

//Distinguish Objects and Arrays
IsArray=function(array){
	if(!array)
		return false;
	return FunctionName(array.constructor)==="Array";
}

IsObject=function(obj){
	if(!obj)
		return false;
	return FunctionName(obj.constructor)==="Object";
}

IsRegex=function(obj){
	if(!obj)
		return false;
	return FunctionName(obj.constructor)==="RegExp";
}

IsString=function(s){
	if(!s)
		return false;
	return typeof s==="string";
}

IsNode=function(node){
	return typeof node==="object"&&node.isEqualNode;
}

IsNan=function(nan){
	return (typeof nan==="number")&&!(nan<0)&&!(nan===0)&&!(nan>0);
}

EnArray=function(a){
	if(typeof a==="undefined")
		return []
	else if(IsArray(a))
		return a;
	else
		return [a];
}

EnString=function(a){
	if(IsString(a))
		return `'${a}'`;
	if(IsArray(a))
		return `[${a.map(EnString).join(",")}]`;
	if(IsObject(a))
		return `{${ThreadKeysValues(a,(k,v)=>(EnString(k)+":"+EnString(v))).join(",")}}`;
	return String(a);
}

//Apply function to Array or Object
Apply=function(arrayOrObj,F){
	if(IsArray(arrayOrObj))
		return F(arrayOrObj);
	else if(IsObject(arrayOrObj))
		return F(Keys(arrayOrObj));
	else{
		console.log("error, nor array nor object");
		return undefined;
	}
};

Keys=function(Obj){
	return Object.keys(Obj)||[];
};
Values=function(Obj){
	return Keys(Obj).map(function(k){return Obj[k]})||[];
};

SortedKeys=function(Obj){
	return Keys(Obj).sort();
};
SortedValues=function(Obj){
	return SortedKeys(Obj).map(function(k){return Obj[k]});
};

//Flips object keys and values
FlipKeysValues=function(Obj){
	var k=Keys(Obj);
	var O={};
	k.map(function(x){O[Obj[x]]=x});
	return O;
};

// Does element exist?
InArrayOrObj=function(arrayOrObj,n){
	if(!arrayOrObj)
		return false;
	function F(array){
		var i=0;
		var found=false;
		while(!found&&i<array.length){
			found=Equal(array[i],n);
			i++;
		}
		return found;	
	};
	return Apply(arrayOrObj,F)||false;
};

//Update Object Keys
MapObject=function(Obj,F){
	var keys=Keys(Obj);
	for (var i in keys){
		if(Obj.hasOwnProperty(keys[i])){
			//F(value, key, obj)
			F(Obj[keys[i]],keys[i],Obj);
		}
	}
	return Obj;
};

/*function MapKeysValues(Object,F){
	MapObject(Object,function(v,k,o){
		delete o[k];
		o[F(k)]=F(v);
	});
	return Object;
}*/

FilterObject=function(Obj,F){
	var O={};
	MapObject(Obj,function (v,k,o){
		if(F(v,k))
			O[k]=v;
	})
	return O;
}

ThreadKeysValues=function(Obj,KeyValuer){
	return Keys(Obj).map(k=>KeyValuer(k,Obj[k]));
}

UpdateKeysObject=function(Obj,KeyModifier){
	var KeyModifier=KeyModifier||Identity;
	var Omod={};
	Keys(Obj).map(k=>(Omod[KeyModifier(k)]=Obj[k]));
	return Omod;
};

InString=function(string,n){
	var s=string;
	return n===""||s.replace(n,"")!==string;
}

InLazyString=function(string,n){ //Lazy matching, 1 error 
	var matchers=[];
	if(n.length>string.length+1)
		return false;

	if(n==="")
		return true;

	var l=n.length;
	if(l===1)
		return string.replace(n,"")!==string;

	for(var i=0;i<l;i++){ //(wrong letter or deleted)
		matchers[i]=n.split("");
		matchers[i][i]=".?";
		matchers[i]=new RegExp(matchers[i].join(""));
	}

	for(var i=1;i<l;i++){ //(flip)
		matchers[l+i]=n.split("");
		matchers[l+i][i]=n[i-1];
		matchers[l+i][i-1]=n[i];
		matchers[l+i]=matchers[l+i].join("");
	}

	return matchers.some(m=>string.replace(m,"")!==string);
}

InSingle=function(SAO,n){
	if(typeof SAO==="string")
		return InString(SAO,n);
	else
		return InArrayOrObj(SAO,n);
}

In=function(SAO,n){
	if(IsArray(n))
		return n.map(m=>In(SAO,m)).some(Identity);
	return InSingle(SAO,n);
}

ContainsF=function(n){
	return function(SAO){return In(SAO,n)};
}

Count=function(array,itemOrF){
	if(typeof array==="string"&&typeof itemOrF==="string"){
		var r=array.replace(itemOrF,"");
		if(r!==array)
			return Count(r,itemOrF)+1;
		else
			return 0;
	}
	if(typeof array==="string")
		return Count(array.split(""),itemOrF);
	if(typeof itemOrF==="function")
		return array.filter(itemOrF).length;
	else
		return array.filter(function(e){return Equal(e,itemOrF)}).length;
}


ObjectArrayF=function(ArrayF,ObjectF){
	return function(AOInclude,AOExclude){
		if(IsArray(AOInclude)&&IsArray(AOExclude))
			return ArrayF(AOInclude,AOExclude);

		if(IsObject(AOInclude)&&IsObject(AOExclude))
			return ObjectF(AOInclude,AOExclude);

		return console.log("error: mismatch obj and array in "+FunctionName(ArrayF)+"/"+FunctionName(ArrayF));
	}
}

DictionaryAccesser=function(Dictionary,Rewriter){
	var Rewriter=Rewriter||Identity;
	return function(name){
		if(name===undefined)
			return Dictionary;
		else if(In(Dictionary,name.toLowerCase()))
			return Dictionary[name.toLowerCase()];
		else
			return Rewriter(name);
	}
}

///////////////////////////////////////////////////////////////////////////////
//Set functions

Unique=function(AO){
	return Intersection(AO,AO);
}

//Complement (force uniqueness, sort)
ArrayComplement=function(arrayInclude,arrayExclude){
	var unique=[];
	var value;
	for(var i=0;i<arrayInclude.length;i++){
		value=arrayInclude[i];
		if(!InSingle(arrayExclude,value)&&!InSingle(unique,value))
			unique.push(value);
	}
	return unique.sort();
}

ObjectComplement=function(objInclude,objExclude){
	var unique={};
	var value;
	for(var i in objInclude){
		value=objInclude[i];
		if(!Equal(objExclude[i],value))
			unique[i]=value;
	}
	return unique;
}

Complement=function(){
	return ObjectArrayF(ArrayComplement,ObjectComplement)(...arguments);
}

//Intersection (force uniqueness, sort)
ArrayIntersection=function(array1,array2){
	var unique=[];
	var value;
	for(var i=0;i<array1.length;i++){
		value=array1[i];
		if(InSingle(array2,value)&&!InSingle(unique,value))
			unique.push(value);
	}
	return unique.sort();
}

ObjectIntersection=function(array1,array2){
	var unique={};
	var value;
	for(var i in array1){
		value=array1[i];
		if(Equal(array2[i],value))
			unique[i]=value;
	}
	return unique;
}

Intersection=function(){
	return ObjectArrayF(ArrayIntersection,ObjectIntersection)(...arguments);
}

//Union (force uniqueness, sort)
Union=function(AO1,AO2){
	if(!AO2)
		return Unique(AO1);
	return Unique(AO1.concat(AO2));
}

//Permutations of a set (enforces uniqueness or sort)
// Permutations=function(array){
// 	var array=Unique(array);
// 	if(array.length===1)
// 		return [array];
	
// 	var subpermutations=[];
// 	var permutations=[];
// 	for(var i=0;i<array.length;i++){
// 		subpermutations=Permutations(Delete(array,i));
// 		subpermutations=subpermutations.map(function(s){return [array[i]].concat(s)});
// 		permutations=permutations.concat(subpermutations);
// 	}
// 	return permutations;
// }

StringPermutations=function(string){
	return Permutations(string.split("")).map(function(p){return p.join("");});
}


//Factorial numbers and arrays
Factorial=function(n){
	if(n<=1)
		return 1;
	if(Factorial[n])
		return Factorial[n];
	else
		return Factorial[n]=n*Factorial(n-1);
}


//Permutations of a set (enforces uniqueness or sort)
Permutations=function(array,n,unique){
	if(!array||n===0)
		return [];

	if(!unique)
		var array=Unique(array);

	if(array.length<1)
		return [];

	var l=array.length;
	if(typeof n==="undefined"||n>array.length)
		var n=l;
	
	
	if(n===1)
		return array.map(a=>[a]);

	var permutations=[];
	var pretuples=Permutations(array,n-1,true);
	function AddTuple(pretuple,j){
		if(!In(pretuple,j))
		permutations.push(pretuple.concat([j]));
	}
	Outer(pretuples,array,AddTuple);
	return permutations;
}

AccPermutations=function(array,n){
	var permutations=[];
	var array=Unique(array);
	if(typeof n==="undefined"||n>array.length)
		var n=array.length;
	for(var i=1;i<=n;i++){
		permutations=permutations.concat(Permutations(array,i,true));
	}
	return permutations;
}

Outer=function(array1,array2,F){
	for(var i=0;i<array1.length;i++)
		for(var j=0;j<array2.length;j++)
			F(array1[i],array2[j])
}

Substrings=function(string){
	var subs=[];
	for(var i=0;i<string.length;i++)
		for(var j=string.length;j>i;j--)
			subs.push(string.slice(i,j));
	return subs;
}

//delete from array
Delete=function(array,i){
	if(!array||typeof i!=="number"||i<0||i>=array.length)
		return array;
	var a=[].concat(array);
	return a.slice(0,i).concat(a.slice(i+1,a.length));
}

Invert=function(as){
	if(IsString(as))
		return as.split("").reverse().join("");
	else
		return as.reverse();
}

RotateMatrix=function(as,left){
	var width=as.map(function(line){return line.length});
		width=Min(width);
	var height=as.length;
	var matrix=[];
	var line;
	for(var w=0;w<width;w++){
		line=[];
		for(var h=0;h<height;h++){
			if(!!left)
				line.push(as[h][width-w-1]);
			else
				line.push(as[height-h-1][w]);
		}
		matrix.push(line);
	}
	return matrix;
}

RotateString=function(string,left){
	var matrix=string.split("\n");
	matrix=matrix.map(function(char){return char.split("")});
	matrix=RotateMatrix(matrix,left);
	var string=matrix.map(function(line){return line.join("")});
	return string.join("\n");
}


//Subset (TODO: ARRAYS SUBSET=>SMALLEST===INTERSECTION LARGE WITH SMALLEST)
Subset=function(Object,SubsetObject){
	var keys=Keys(SubsetObject);
	return keys.every(k=>Equal(Object[k],SubsetObject[k]));
}

//Object Arrays (BASE)
BaseFilter=function(Base,GroupObject){
	if(IsObject(GroupObject))
		return Values(FilterObject(Base,g=>Subset(g,GroupObject)));
	else
		return Values(FilterObject(Base,GroupObject));
}

///////////////////////////////////////////////////////////////////////////////
//Repetitive functions

// Fold
FoldM=function(F,x0,xArray){
	if(!xArray||xArray.length<1){
		return x0;
	}else if(xArray.length===1){
		return F(x0,xArray[0]);
	}else{
		var x1=xArray[0];
		xArray.shift();
		return FoldM(F,F(x0,x1),xArray);
	}
}

Fold=function(F,x0,xArray){
	return FoldM(F,x0,Clone(xArray));
}

// Fixed point
FixedPoint=function(F,x){
	var i=x;
	while(i!==F(i)){
		i=F(i);
	}
	return i;
}



///////////////////////////////////////////////////////////////////////////////
// String Functions

// String Replace
StringReplaceOnceRule=function(string,rule){
	return string.replace(rule[0],rule.length>0?rule[1]:"");
}
StringReplaceRule=function(string,rule){
	return FixedPoint(function(s){return StringReplaceOnceRule(s,rule);},string);
}
StringReplaceRuleArray=function(string,ruleArray){
	return Fold(StringReplaceRule,string,ruleArray);
}
StringReplaceOnceRuleArray=function(string,ruleArray){
	return Fold(StringReplaceOnceRule,string,ruleArray);
}

ObjectRules=function(Obj){
	var keys=Keys(Obj);
	var a=[];
	for(var i in keys){
		if (Obj.hasOwnProperty(keys[i])){
			a.push([keys[i],Obj[keys[i]]])
		}
	}
	return a;
}

StringReplaceRulesObject=function(string,rulesObj){
	return FixedPoint(function(s){return StringReplaceRuleArray(s,ObjectRules(rulesObj))},string);
}

StringReplace=function(string,rules){
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

UnWhitespace=function(string){
	return string.replace(/\s*/gi,"");
	//StringReplace(string,[[/\s/m,""],[/\t/m,""],[/\n/m,""]]);
}
LowerSimpleString=function(string){
	return SafeString(UnWhitespace(string).toLowerCase());
}
LowerSpacedString=function(string){
	return string.toLowerCase().replace(new RegExp("["+EscapeTokens(Tokens())+"]+","g")," ").replace(/[\n\s\t]+/g," ");
}

// Capitalise
Capitalise=function(word){
	if(word.length)
		return word[0].toUpperCase()+Rest(word).toLowerCase();
	else
		return word;
}


CommonWords=function(){
	var prepositions=["aboard","about","above","across","after","against","along","amid","among","anti","around","as","at","before","behind","below","beneath","beside","besides","between","beyond","but","by","concerning","considering","de","despite","down","during","except","excepting","excluding","following","for","from","in","inside","into","like","minus","near","of","off","on","onto","opposite","outside","over","past","per","plus","regarding","round","save","since","than","through","to","toward","towards","under","underneath","unlike","until","up","upon","versus","vs","via","with","within","without"];
	if(!CommonWords.list)
		return CommonWords.list=["a","an","the"].concat(prepositions);
	else
		return CommonWords.list;
}

CapitaliseNoble=function(word){
	if(In(CommonWords(),word))
		return word;
	else
		return Capitalise(word);
}

CapitaliseSentence=function(sentence){
	return sentence.split(" ").map(CapitaliseNoble).join(" ");
}

CapitaliseSlug=function(slug){
	return CapitaliseSentence(slug.replace("-"," "));
}

//Escape

Tokens=function(){
	return ",;.:-_~^*+´`¨«»'?!'@£§#$%&/|(){}[]=";
}

EscapeToken=function(token){
	if(token===" ")
		return "\\s";
	if(!In(Tokens(),token))
		return token;
	else
		return "\\"+token;
}

EscapeTokens=function(tokenString){
	if(IsArray(tokenString))
		return Alternate(tokenString.map(EscapeTokens));
	return tokenString.split("").map(EscapeToken).join("");
}


// Prefix and Suffix
// a#bc#d
// UnPrefix	# 		a#bc#d
// UnPosfix	# 		a#bc#d

// UnOverfix	# 		a#bc
// UnUnderfix	# 		  bc#d
// UnAfterfix	# 		a     
// UnBeforfix	# 		     d


// UnOncePrefix=function(word,prefix){
// 	if(!prefix)
// 		return word;
// 	var prefixFind=new RegExp("^"+EscapeTokens(prefix));
// 	return word.replace(prefixFind,"");
// }
// UnOncePosfix=function(word,suffix){ //suffix
// 	if(!suffix)
// 		return word;
// 	var suffixFind=new RegExp(EscapeTokens(suffix)+"$");
// 	return word.replace(suffixFind,"");
// }

UnPrefix=function(word,prefix){
	if(!word)
		var word="";
	if(!prefix)
		return word;
	var prefixFind=new RegExp("^"+EscapeTokens(prefix));
	return FixedPoint(
		word=>word.replace(prefixFind,""),
		word
	)
		//StringReplace(word,[prefixFind,""]);
}
UnPosfix=function(word,suffix){ //suffix
	if(!word)
		var word="";
	if(!suffix)
		return word;
	var suffixFind=new RegExp(EscapeTokens(suffix)+"$");
	return FixedPoint(
		word=>word.replace(suffixFind,""),
		word
	)
		//StringReplace(word,[suffixFind,""]);
}
Prefix=function(word,prefix){
	if(!word)
		var word="";
	if(!prefix)
		return word;
	return prefix+UnPrefix(word,prefix);
}
Posfix=function(word,suffix){ //suffix
	if(!word)
		var word="";
	if(!suffix)
		return word;
	return UnPosfix(word,suffix)+suffix;
}
Exfix=function(word,prefix,suffix){
	if(!word)
		var word="";
	var suffix=suffix||prefix;
	return Prefix(Posfix(word,suffix),prefix);
}
UnExfix=function(word,prefix,suffix){
	if(!word)
		var word="";
	var suffix=suffix||prefix;
	return UnPrefix(UnPosfix(word,suffix),prefix);
}

Parenthise=function(word){
	return Exfix(word,"(",")");
}
Alternate=function(wordArray){
	return wordArray.map(Parenthise).join("|");
}

Prefixed=function(word,prefix){
	if(!word)
		var word="";
	return UnPrefix(word,prefix)!==word;
}
Posfixed=function(word,suffix){
	if(!word)
		var word="";
	return UnPosfix(word,suffix)!==word;
}




UnOnceBeforfix=function(word,prefix){
	if(!word)
		var word="";
	var prefixFind=new RegExp(".*"+EscapeTokens(prefix));
	return word.replace(prefixFind,"");
}
UnBeforfix=function(word,prefix){
	if(!word)
		var word="";
	if(!prefix)
		return word;
	if(IsArray(prefix))
		return Fold(UnOnceBeforfix,word,prefix);
	else
		return UnOnceBeforfix(word,prefix);
}

UnAfterfix=function(word,posfix){
	if(!word)
		var word="";
	if(!posfix)
		return word;
	var posfixFind=new RegExp(EscapeTokens(posfix)+".*");
	return word.replace(posfixFind,"");
}

Afterfix=function(word,posfix){
	if(!word)
		var word="";
	if(!posfix)
		return "";
	return UnPrefix(word.replace(UnAfterfix(word,posfix),""),posfix);
}

UnOverfix=function(word,posfix){
	if(!word)
		var word="";
	if(!posfix)
		return word;
	return UnPosfix(word.replace(UnBeforfix(word,posfix),""),posfix);
}

Overfix=function(word,posfix){
	if(!word)
		var word="";
	if(!posfix)
		return "";
	return UnPrefix(word.replace(UnOverfix(word,posfix),""),posfix);
}

UnUnderfix=function(word,prefix){
	if(!word)
		var word="";
	if(!prefix)
		return word;
	return UnPrefix(word.replace(UnAfterfix(word,prefix),""),prefix);
}

Underfix=function(word,prefix){
	if(!word)
		var word="";
	if(!prefix)
		return "";
	return UnPosfix(word.replace(UnUnderfix(word,prefix),""),prefix);
}

/* redundant
UnAfterfix=function(word,posfix){
	if(!word)
		var word="";
	if(!posfix)
		return word;
	if(IsArray(posfix))
		return Fold(UnOnceAfterfix,word,posfix);
	else
		return UnOnceAfterfix(word,posfix);
}
*/

// Padding
PadLR=function(txt,symbol,n){
	if(symbol==="")
		return "";
	
	var sylen=symbol.length;
	var d=Max(n-txt.length,0);
	var q=Quotient(d,sylen);
	var r=Remainder(d,sylen);
	
	return symbol.repeat(q)+symbol.slice(0,r);
}
PadLeft=function(txt,symbol,n){
	return PadLR(txt,symbol,n)+txt;
}
PadRight=function(txt,symbol,n){
	return txt+PadLR(txt,symbol,n);
}

AddLeft=function(txt,symbol,n){
	return PadLeft(txt,symbol,txt.length+n);
}
AddRight=function(txt,symbol,n){
	return PadRight(txt,symbol,txt.length+n);
}


//Stripping
StripHTML=function(string){
	//.replace(/\<(.*)[^\<\>]*\>([^\<\>]*)<\/\1\>/ig,"$2")
	var string=string.replace(/\<(img|svg|script|style|meta|link)[^\<\>]*\>/ig,"");
		string=string.replace(/\<[^\<\>]*\>/ig," ");
		string=string.replace(/(\n)+/ig,"$1").replace(/( +)/ig,"$1");
	return string;
}

//Shortening
ShortenString=function(string,maxchars){
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
Enumerate=function(StringArray,and){
	var and=and||"and";
	if(!StringArray.length)
		return "";
	if(StringArray.length===1)
		return StringArray[0];

	var comma=", ";
	if(StringArray.some(a=>In(a,",")))
		var comma="; ";
	
	var prelast=Last(Most(StringArray));
	var last=Last(StringArray);
	
	if(In(prelast,Exfix(and," "))||In(last,Exfix(and," ")))
		and=DictionaryAccesser(EnumerationSynonyms)(and);
	
	and=Exfix(and," ");
	if(StringArray.length===2)
		return prelast+and+last;
	
	return Most(Most(StringArray)).join(comma)+comma+prelast+and+last;
}

var EnumerationSynonyms={
	"and":"&",
	"or":"/",
	",":";"
}

EnumerationSynonyms={...EnumerationSynonyms,...FlipKeysValues(EnumerationSynonyms)};

///////////////////////////////////////////////////////////////////////////////
//Get Function Name as a string, or make up a unique one based on the function's body
FunctionName=function(FunctionF){
	if(FunctionF.name)
		return FunctionF.name;
	var name=FunctionF.toString().replace(/\(.*/,"").replace("function ","");
	name=name.replace(/\s.*/gm,"");
	if(name!=="function")
		return name;
	else{
		var body=FunctionF.toString().replace(/[^\)]*\)/,"");
		return body.replace(/[^ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890]/gi,"").replace(/^[1234567890]*/,"");
	}
}

FunctionNamecode=function(F){
	return FunctionName(F)||String(F);
}

FunctionBody=function(FunctionF){
	return FunctionF.toString().replace(/[^\)]*\)/,"");
}

///////////////////////////////////////////////////////////////////////////////
//Join Objects, overwriting conflicting properties
FuseObjects=function(obj,newObj){
	var O={};
	function SetValueKey(value,key){O[key]=value};
	if(obj)
		MapObject(obj,SetValueKey);
	if(newObj)
		MapObject(newObj,SetValueKey);
	return O;
}

FuseObjectArray=function(objArray){
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

CloneObject=function(Obj){
	var O={};
	Keys(Obj).map(k=>O[k]=Clone(Obj[k]));
	return O;
}

CloneArray=function(Arr){
	return [...Arr].map(Clone);
}

Clone=function(AOS){
	if(IsObject(AOS))
		return CloneObject(AOS);
	if(IsArray(AOS))
		return CloneArray(AOS);
	return AOS;
}


Datafy=function(obj){
	var O={};
	function SetValueKey(value,key){
		var datakey=Prefix(key,"data-");
		O[datakey]=value;
	}
	MapObject(obj,SetValueKey);
	return O;
}

//////////////////////////////////////////////////
//Promises

AsyncResolver=function(F){
	return async function(a){
		F(a);
		return Promise.resolve('ok');
	}
}

MapThen=function(array,F,G){
	Promise.all(array.map(AsyncResolver(F))).then(G);
}

///////////////////////////////////////////////////////////////////////////////
// URL MANIPULATION
// Core

PageTitle=function(){
	return document.title;
}

DefaultURL=function(url){//Default to the current page url
	if(NodejsDetected()&&typeof url==="undefined")
		return "https://pedropsi.github.io";
	if(typeof url==="undefined")
		return window.location.href;
	else
		return url;
}

PageProtocol=function(url){
	var url=DefaultURL(url);
	if(!In(url,"://"))
		return "";
	return new URL(url).protocol;
}

PageUnProtocol=function(url){
	var url=DefaultURL(url);
	url=UnPrefix(url,PageProtocol(url));
	url=UnPrefix(url,"/");
	return url;
}

//Relative pages don't have a domain and vice versa
PageRelative=function(url){
	var url=DefaultURL(url);
	return PageProtocol(url)==="";
}

PageDomain=function(url){
	var url=DefaultURL(url);
	
	if(!PageProtocol(url)||!In(url,"."))
		return "";

	url=PageUnProtocol(url);

	var anchor=UnAfterfix(url,".");//Up to first .
		anchor=UnOverfix(anchor,"/");//Up to closest / before .
		url=UnPrefix(url,anchor);
		url=UnPrefix(url,"/");
		url=UnAfterfix(url,"/");
	
	return url;
}


PageFragment=function(url){
	var url=DefaultURL(url);
	return Afterfix(url,"#");
}

PageUnFragment=function(url){
	var url=DefaultURL(url);
	return UnAfterfix(url,"#");
}

PageUnSearch=function(url){
	var url=DefaultURL(url);

	var fragment=PageFragment(url);
		url=PageUnFragment(url);
		url=UnAfterfix(url,"?");
		if(fragment)
			url=url+Prefix(fragment,"#");
	return url;
}


PageRelativePath=function(url){//folder + file
	var url=DefaultURL(url);
		url=PageUnFragment(url);
		url=PageUnSearch(url);

	if(PageRelative(url))
		return url;

	var domain=PageDomain(url);
		url=UnBeforfix(url,domain);
	
	return UnPrefix(url,"/");
}

PageFile=function(url){//file only
	var url=DefaultURL(url);
		url=PageRelativePath(url);
	return UnBeforfix(url,"/");
}

PageRelativeFolder=function(url){//folder only
	var url=DefaultURL(url);
		url=PageRelativePath(url||"");
		url=UnAfterfix(url,PageFile(url));
	return UnPosfix(url,"/");
}

PageShallowPath=function(url){
	var url=DefaultURL(url);
		url=Posfix(PageDomain(url),"/")+PageFile(url);
	return url
}

PageShallowURL=function(url){
	return PageProtocol(url)+PageDomain(url)+PageShallowPath(url)+PageSearch(url)+PageFragment(url);
}

PageSimpleIdentifier=function(url){
	var url=DefaultURL(url);
	var file=PageFile(url);
	return UnAfterfix(file,".");
}

//Node current identifier
CurrentIdentifier=function(identifier){
	if(!identifier)
		return CurrentIdentifier.identifier||"index";
	else
		return CurrentIdentifier.identifier=identifier;
}

PageIdentifier=function(url){
	if(NodejsDetected())
		return CurrentIdentifier();

	var url=DefaultURL(url);
	var identifier=PageSimpleIdentifier(url);
	return identifier||"index";
}



//Search

PageSearch=function(parameter,page){
	if(In(parameter,"?")){//inverted
		var page=parameter;
		var parameter=undefined;
	}
	if(PageRelative(page))
		page=Prefix(page,"https://")//fake url
	if(NodejsDetected())
		var l=new URL("https://pedropsi.github.io");
	else
		var l=new URL(page||document.URL);
	l=l.search;
	if(!parameter)
		return l;
	var token=new RegExp(".*\\?.*"+parameter+"\\=");
	var id=l.replace(token,"");
	if(id===l)
		id="";
	return decodeURI(id.replace(/\&.*/,""));
}


// FromUTF8=function(string){
// 	return StringReplace(string,UTF8());
// }

// UTF8=function(){
// 	return {
// 		"%00":" ","%01":" ","%02":" ","%03":" ","%04":" ","%05":" ","%06":" ","%07":" ","%08":" ","%09":" ","%0A":" ","%0B":" ","%0C":" ","%0D":" ","%0E":" ","%0F":" ","%10":" ","%11":" ","%12":" ","%13":" ","%14":" ","%15":" ","%16":" ","%17":" ","%18":" ","%19":" ","%1A":" ","%1B":" ","%1C":" ","%1D":" ","%1E":" ","%1F":" ","%20":" ","%21":"!","%22":'"',"%23":"#","%24":"$","%25":"%","%26":"&","%27":"'","%28":"(","%29":")","%2A":"*","%2B":"+","%2C":",","%2D":"-","%2E":".","%2F":"/","%30":"0","%31":"1","%32":"2","%33":"3","%34":"4","%35":"5","%36":"6","%37":"7","%38":"8","%39":"9","%3A":":","%3B":";","%3C":"<","%3D":"=","%3E":">","%3F":"?","%40":"@","%41":"A","%42":"B","%43":"C","%44":"D","%45":"E","%46":"F","%47":"G","%48":"H","%49":"I","%4A":"J","%4B":"K","%4C":"L","%4D":"M","%4E":"N","%4F":"O","%50":"P","%51":"Q","%52":"R","%53":"S","%54":"T","%55":"U","%56":"V","%57":"W","%58":"X","%59":"Y","%5A":"Z","%5B":"[","%5C":"\\","%5D":"]","%5E":"^","%5F":"_","%60":"`","%61":"a","%62":"b","%63":"c","%64":"d","%65":"e","%66":"f","%67":"g","%68":"h","%69":"i","%6A":"j","%6B":"k","%6C":"l","%6D":"m","%6E":"n","%6F":"o","%70":"p","%71":"q","%72":"r","%73":"s","%74":"t","%75":"u","%76":"v","%77":"w","%78":"x","%79":"y","%7A":"z","%7B":"{","%7C":"|","%7D":"}","%7E":"~","%7F":" ","%C2%80":" ","%C2%81":" ","%C2%82":" ","%C2%83":" ","%C2%84":" ","%C2%85":" ","%C2%86":" ","%C2%87":" ","%C2%88":" ","%C2%89":" ","%C2%8A":" ","%C2%8B":" ","%C2%8C":" ","%C2%8D":" ","%C2%8E":" ","%C2%8F":" ","%C2%90":" ","%C2%91":" ","%C2%92":" ","%C2%93":" ","%C2%94":" ","%C2%95":" ","%C2%96":" ","%C2%97":" ","%C2%98":" ","%C2%99":" ","%C2%9A":" ","%C2%9B":" ","%C2%9C":" ","%C2%9D":" ","%C2%9E":" ","%C2%9F":" ","%C2%A0":" ","%C2%A1":"¡","%C2%A2":"¢","%C2%A3":"£","%C2%A4":"¤","%C2%A5":"¥","%C2%A6":"¦","%C2%A7":"§","%C2%A8":"¨","%C2%A9":"©","%C2%AA":"ª","%C2%AB":"«","%C2%AC":"¬","%C2%AD":"­","%C2%AE":"®","%C2%AF":"¯","%C2%B0":"°","%C2%B1":"±","%C2%B2":"²","%C2%B3":"³","%C2%B4":"´","%C2%B5":"µ","%C2%B6":"¶","%C2%B7":"·","%C2%B8":"¸","%C2%B9":"¹","%C2%BA":"º","%C2%BB":"»","%C2%BC":"¼","%C2%BD":"½","%C2%BE":"¾","%C2%BF":"¿","%C3%80":"À","%C3%81":"Á","%C3%82":"Â","%C3%83":"Ã","%C3%84":"Ä","%C3%85":"Å","%C3%86":"Æ","%C3%87":"Ç","%C3%88":"È","%C3%89":"É","%C3%8A":"Ê","%C3%8B":"Ë","%C3%8C":"Ì","%C3%8D":"Í","%C3%8E":"Î","%C3%8F":"Ï","%C3%90":"Ð","%C3%91":"Ñ","%C3%92":"Ò","%C3%93":"Ó","%C3%94":"Ô","%C3%95":"Õ","%C3%96":"Ö","%C3%97":"×","%C3%98":"Ø","%C3%99":"Ù","%C3%9A":"Ú","%C3%9B":"Û","%C3%9C":"Ü","%C3%9D":"Ý","%C3%9E":"Þ","%C3%9F":"ß","%C3%A0":"à","%C3%A1":"á","%C3%A2":"â","%C3%A3":"ã","%C3%A4":"ä","%C3%A5":"å","%C3%A6":"æ","%C3%A7":"ç","%C3%A8":"è","%C3%A9":"é","%C3%AA":"ê","%C3%AB":"ë","%C3%AC":"ì","%C3%AD":"í","%C3%AE":"î","%C3%AF":"ï","%C3%B0":"ð","%C3%B1":"ñ","%C3%B2":"ò","%C3%B3":"ó","%C3%B4":"ô","%C3%B5":"õ","%C3%B6":"ö","%C3%B7":"÷","%C3%B8":"ø","%C3%B9":"ù","%C3%BA":"ú","%C3%BB":"û","%C3%BC":"ü","%C3%BD":"ý","%C3%BE":"þ","%C3%BF":"ÿ"
// 	}
// }

// Safe string loading
SafeString=function(tex){
	return String(tex).replace(/[\<\>\=\+\-\(\)\*\'\"]/g,"");
}

SafeUrl=function(tex){
	tex=String(tex||"").replace(/[\<\>\+\(\)\*\'\"\#\\\s]+.*/g,"");
	if(!tex)
		return "";
	var prefix="https://";
	if(In(tex,"http:"))
		prefix="http://";
	return Prefix(tex,prefix);
}

//SECONDARY

RelativeLinked=function(url){
	return PageRelativePath(url)===url;
}
FileLinked=function(url){
	return PageProtocol(url)==="file:";
}
LocalLinked=function(url){
	return RelativeLinked(url)||FileLinked(url);
}

OwnLinked=function(url){
	return PageDomain(url)===PageDomain();
}
FragmentLinked=function(url){
	return PageFragment(url)&&PageUnFragment(url)==="";
}

InnerLinked=function(url){
	return !FragmentLinked(url)&&(LocalLinked(url)||OwnLinked(url));
}
OuterLinked=function(url){
	return !FragmentLinked(url)&&!(LocalLinked(url)||OwnLinked(url));
}

ShallowableLinked=function(url){
	return !FragmentLinked(url)&&(RelativeLinked(url)||OwnLinked(url));
}

//Glocal Files
if(typeof Local==="undefined")
	function Local(){
		return /^file\:.*/.test(document.URL);
	}
	
JoinPath=function(path,subpath){
	return path.replace(/\\*$/,"")+"/"+subpath.replace(/^\\*/,"");
}
GlocalPath=function(urlpath,relativepath){
	if(Local())
		var u="..";
	else
		var u=urlpath;
	return JoinPath(u,relativepath);
}

//NavigateGoToPage

function RightPath(url){
	if(!PageRelative(url))
		return url;
	else{
		var search=PageSearch(url);
		var frag=PageFragment(url);
			frag=frag?Prefix(frag,"#"):"";
		var url=PageUnSearch(url);
			url=Posfix(Posfix(url,".html"),search)+frag;
		return url
	}
}

Navigate=function(url,samewindow){
	if(PageRelative(url)){
		var samewindow=true;
	}

	var url=RightPath(url);

	if(samewindow)
		window.location.href=url;
	else{//NewTab
		AClick(url,{"target":"_blank"})
	}
}

AClick=function(url,opts){
	var id=GenerateId();
	var opts=opts||{};
	opts.id=id;
	PreAddElement(AHTML(" ",url,opts),"body");
	GetElement(id).click();
	RemoveElement(id);
}


///////////////////////////////////////////////////////////////////////////////
//Page auto index
TocId=function(s){
	return UnExfix(s.replace(/([^A-Za-z0-9\_])+/g,"-"),"-");
}

TitleIndexer=function(h){
	return function(t){return IndexSubTitle(t,h)};
}

IndexSubTitle=function(t,h){
	t.setAttribute("data-index-depth",h);
	Class(t,"index-item");
	t.id=t.id?t.id:TocId(t.innerText); 
	TitleSelfLink(t);
	return t.id;
}

IndexTag=function(h){
	return GetElements(".main .prose "+h).map(TitleIndexer(h));
}

IndexTitles=function(){
	var indexed=["h1","h2","h3","h4","h5","h6"].map(IndexTag);
	Shout("IndexTitles");
	return indexed;
}

PageIndexHTML=function(indexArray){
	return "<div class='index'><a class='index-link h1' id='Table-of-Contents' href='#Table-of-Contents' onclick='ShowHideIndex()'>Table of contents</a>"+indexArray.map(IndexItemHTML).join("\
	")+"</div>";
}

IndexItemHTML=function(e){
	if(!e||!Classed(e,"index-item"))
		return "";
	else{
		var depth=e.getAttribute("data-index-depth")||"";
		return "<a class='index-link "+depth+"' href='#"+e.id+"'>"+e.textContent+"</a>";
	}
}



AddTitleIndex=function(section){
	var indexArray=GetElements(".index-item",section);
	if(indexArray.length<=1)
		return;
	RemoveElement(".index",section);
	PreAddElement(PageIndexHTML(indexArray),section);
	Class(".h1","collapse");
	ShowHideIndex();
}

ShowHideIndex=function(){
	Toggle(".h1","uncollapse");
	Toggle(".h1","collapse");
	ShowHide(".h2");
	ShowHide(".h3");
	ShowHide(".h4");
	ShowHide(".h5");
	ShowHide(".h6");
}

TitleSelfLink=function(t){
	var title=t.innerText;
	t.innerHTML=HeaderAHTML(title);
}

HeaderAHTML=function(title,page,Opts){
	var page=PageUnFragment(page);
	return AHTML(title,page+"#"+TocId(title),Opts);
}

///////////////////////////////////////////////////////////////////////////////
//Unique random identifier

UserId=function(){
	if(!UserId.id)
		UserId.id=GenerateId();
	return UserId.id;
}

RandomInteger=function(n){return Floor(Math.random()*n)};
RandomChoice=function(v){return v[RandomInteger(v.length)]};


GenerateId=function(){
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


////////////////////////////////////////////////////////////////////////////////
//Load resources

SourceIdentifier=function(path){
	return PageIdentifier(UnPosfix(UnPosfix(path,".js"),".css"));
}

LoadSources=function(sourceArray,SuccessF){
	if(NodejsDetected()){
		var shoutArray=sourceArray;
		HearAll(shoutArray,SuccessF); 									//waits until the last one is loaded before firing SuccessF
		sourceArray.map(LoadNodeSource);
	}									
	else{
		var shoutArray=sourceArray.filter(function(f){return Posfixed(f,".js")}).map(SourceIdentifier);		//discards non-js files plus the folder structure to preserve file name
		HearAll(shoutArray,SuccessF); 									//waits until the last one is loaded before firing SuccessF
		sourceArray.map(LoadSource);											//loads asynchronously (each file MUST "Shout" its own identifier upon loading)
	}
	
}

LoadNodeSource=function(source){
	var source=UnPosfix(source,".js");
	if(!Prefixed(source,"."))
		source=Prefix(UnPrefix(source,"/"),"../");
	//console.log("loading source ",source);
	require(source);
}

//Load scripts
LoadSource=function(source){
	if(Posfixed(source,".js"))
		LoadScript(source);
	if(Posfixed(source,".css"))
		LoadStyle(source);
}

LoadScript=function(source){
	var head=GetElement('head');
	var script=document.createElement('script');
	script.src=Posfix(source,".js");
	script.async=false;
	head.appendChild(script);
}

LoadCode=function(code){
	var g = document.createElement('script');
		g.text = code;
	AddElement(g,"BODY");
}

LoadAsync=function(sourcename,folder){
	var head=GetElement('head');
	var script=document.createElement('script');

	var folder=((folder+"/").replace(/\/\//,"/"))||"codes/";
	var ext=Posfixed(sourcename,".txt")?"":'.js';
	script.src=folder+Posfix(sourcename,ext);

	script.async=false;
	head.appendChild(script);
}

LoaderInFolder=function(folder){
	return function(sourcename){return LoadAsync(sourcename,folder)};
}

//Load styles

LoadStyle=function(sourcename){
	var head=document.getElementsByTagName('head')[0];

	//Load
	var styleelement=document.createElement('link');
	styleelement.href=Posfix(sourcename,".css");
	styleelement.rel="stylesheet";
	styleelement.type="text/css";
	head.appendChild(styleelement);
}

ReplaceStyleElement=function(stylesource,id){
	RemoveElement(id);
	AddElement("<style id='"+id+"'>"+stylesource+"</style>",'head');
}

///////////////////////////////////////////////////////////////////////////////
//Data Reception

//Network status
Online=function(){return navigator.onLine};
Offline=function(){return !Online()};

//Parameter requests
ParameterPairString=function(key,value){
	return encodeURIComponent(key)+'='+encodeURIComponent(value);
}

ParameterString=function(parametersObject){
	return ThreadKeysValues(parametersObject,ParameterPairString).join("&");
}

Parameters=function(url){
	var l=document.createElement("a");
	l.href=url;
	l=l.search;
	var parameters=UnPrefix(l,"?").split("&");
	var data={};
	StringParameterPair=function(string){
		data[decodeURIComponent(UnAfterfix(p,"="))]=decodeURIComponent(UnBeforfix(p,"="))
	};
	parameters.map(StringParameterPair);
	return data;
}

//External resources
MacroBareURL=function(c,parametersObject){
	var p="";
	if(parametersObject)
		p=ParameterString(parametersObject);
	if(p)
		p=Prefix(p,"?");
	return "https://script.google.com/macros/s/"+c+"/exec"+p;
};

MacroURL=function(parameters){
	return MacroBareURL("AKfycbyvKrxqk9mHkpmVqsmHN0y2jO-8x40zurf4tdS7p2H-KExfnvM",parameters);
}

//Fetch data from url
LoadDataFromNetwork=function(url,SuccessF,header,FailureF){
	var FailureF=FailureF||Identity;
	var rawFile=new XMLHttpRequest();
	rawFile.open("GET",url,true);
	rawFile.onreadystatechange=function(){
		if(rawFile.readyState===4){
			if(rawFile.status===404){
				console.log("Nothing found at: ",url,", not necessarily an error!");
				FailureF();
			}
			else if(rawFile.status===200||rawFile.status==0){
				var data=rawFile.responseText;
				if(data===""){
					console.log("No data received from: ",url,". Connection problems?");
					FailureF();
				}
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

LoadData=function(url,SuccessF,header,FailureF){
	var saved=Memory(url);
	if(saved&&!MemoryExpired(url))
		return SuccessF(saved);
	else
		return LoadDataFromNetwork(url,SuccessF,header,FailureF);
}

///////////////////////////////////////////////////////////////////////////////
// Persistent Memory

MemorySlot=function(name){
	if(!MemorySlot['_list'])
		MemorySlot['_list']=[];

	if(!name)
		return MemorySlot['_list'];
	
	if(!In(MemorySlot['_list'],name))
		MemorySlot['_list'].push(name);
	
	return "__"+name.toLowerCase();
}

Memory=function(name,data,days){
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

LiveLoad=function(){
	return !!LiveLoad.saved||(LiveLoad.saved=!!PageSearch("live"));
}

MemoryExpired=function(name){
	if(LiveLoad())
		return true;
	var expired=true;
	try{
		expired=localStorage[MemorySlot(name+"_exp")];
		expired=Days(new Date(expired))>MemoryDuration();
	}
	catch(err){};
	return expired;
}

MemoryDuration=function(name,days){
	if(days){//SET
		try{localStorage[MemorySlot(name+"_days")]=Number(days)}
		catch(err){}
		return days;
	}
	else{//GET
		var days=1;
		try{
			days=localStorage[MemorySlot(name+"_days")];
			if(days)
				days=Number(days);
			else
				days=1;
		}
		catch(err){};
		return days;
	}
}
///////////////////////////////////////////////////////////////////////////////
// Data Download
//(https://stackoverflow.com/questions/13405129/javascript-create-and-save-file)

Download=function(data,filename,typ){
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

MakeElement=function(html){
	var e=document.createElement("div");
	e.innerHTML=html;
	return e.children[0];
}

HTMLTags=['!DOCTYPE','a','abbr','acronym','abbr','address','applet','embed','object','area','article','aside','audio','b','base','basefont','bdi','bdo','big','blockquote','body','br','button','canvas','caption','center','cite','code','col','colgroup','colgroup','data','datalist','dd','del','details','dfn','dialog','dir','ul','div','dl','dt','em','embed','fieldset','figcaption','figure','figure','font','footer','form','frame','frameset','h1','h2','h3','h4','h5','h6','head','header','hr','html','i','iframe','img','input','ins','kbd','label','input','legend','fieldset','li','link','main','map','mark','meta','meter','nav','noframes','noscript','object','ol','optgroup','option','output','p','param','picture','pre','progress','q','rp','rt','ruby','s','samp','script','section','select','small','source','video','audio','span','strike','del','s','strong','style','sub','summary','details','sup','svg','table','tbody','td','template','textarea','tfoot','th','thead','time','title','tr','track','video','audio','tt','u','ul','var','video','wbr'];
HTMLTags=HTMLTags.map(function(s){return s.toUpperCase()});

IsTag=function(selector){
	if(!IsString(selector))
		return false;
	return In(HTMLTags,selector.toUpperCase());
}
IsClass=function(selector){
	if(!IsString(selector))
		return false;
	return Prefixed(selector,".");
}
IsID=function(selector){
	if(!IsString(selector))
		return false;
	return Prefixed(selector,"#");
}

IsQuerySelector=function(selector){
	return IsID(selector)||IsClass(selector)||IsTag(selector);
}

ParentSelector=function(targetIDsel){
	var parentElement=ParentElement(targetIDsel);
	if(parentElement)
		return Prefix(UniqueId(parentElement),"#");
}

QuerySelector=function(selector){
	if(IsQuerySelector(selector))
		return selector;
	else
		return Prefix(selector,"#");
}

// Get element based on selectors: .class, #id, idsring, or the element itself
GetElementFromTextSelector=function(selector,parentElement){
	if(!selector)
		return document.body;
	if(parentElement===null)
		return null;
	selector=QuerySelector(selector);

	if(!parentElement||!parentElement.querySelector)
		var parentElement=document.body;

	try{
		return parentElement.querySelector(selector);
	}
	catch{
		return null;
	}
};

GetElementIn=function(selector,parentElement){
	if(typeof selector==="string")
		return GetElementFromTextSelector(selector,parentElement);
	else
		return selector; //in case the actual element is given in the beginning
};

GetElement=function(selector,pSelector){
	if(!selector)
		return;
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
QueryAll=function(selector){
	return Array.from(document.querySelectorAll(QuerySelector(selector)));
}

Match=function(elem,selector){
	return In(QueryAll(selector),elem);
}

MatchAnyElement=function(elemArray,selector){
	return elemArray.some(function(e){return Match(e,selector)});
}

//Find first Element matching selector
FindFirstMatch=function(selectorArray,elem){
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
Siblings=function(thi,depth,maxParent){
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

InsideAt=function(parentSelector,selector){
	if(GetElement(parentSelector)===null||GetElement(selector)===null)
		return undefined;
	return Inside(parentSelector,selector)||GetElement(parentSelector).isEqualNode(GetElement(selector));
}

Inside=function(parentSelector,selector){
	if(GetElement(parentSelector)===null||GetElement(selector)===null)
		return undefined;
	return GetElement(parentSelector).contains(GetElement(selector));
}

Outside=function(parentSelector,selector){
	if(GetElement(parentSelector)===null||GetElement(selector)===null)
		return undefined;
	return !InsideAt(parentSelector,selector);
}

// Get element based on selectors: .class, tag, or the element itself
GetElements=function(selectorString,parentIDsel){
	var HTMLCollect;
	var parentElement=GetElement(parentIDsel)||document;
	if(IsString(selectorString)){
		HTMLCollect=parentElement.querySelectorAll(selectorString);
		return Array.prototype.slice.call(HTMLCollect);
	}
};

// Get Children Elements
FirstChildren=function(targetIDsel){
	if(IsArray(targetIDsel))
		return targetIDsel.map(FirstChildren).flat();
	var e=GetElement(targetIDsel);
	if(e)
		return Array.from(e.children);
}

// Get Children Elements matching particular selector
Children=function(targetIDsel,childIDselString){
	if(typeof childIDselString==="undefined")
		return FirstChildren(targetIDsel);

	var es=[GetElement(targetIDsel)];
	var match=MatchAnyElement(es,childIDselString);
	while(es.length>0&&FirstChildren(es).length>0&&!match){
		es=FirstChildren(es);
		match=MatchAnyElement(es,childIDselString);
	}
	return match?es:undefined;
}


MapChildren=function(targetIDsel,childIDselString,F){
	var c=Children(targetIDsel,childIDselString);
	if(c)
		return c.map(F);
}

// Get Parent Element
FirstParentElement=function(targetIDsel){
	var e=GetElement(targetIDsel);
	if(e)
		return e.parentElement;
}

// Get Parent Element matching particular sleector

FirstMatchingElement=function(type,targetE,priorIDselString){
	var e=GetElement(targetE);
	if(!priorIDselString)
		return e[type];
	
	var match=Match(e,priorIDselString);
	while(e&&e[type]&&!match){
		e=e[type];
		match=Match(e,priorIDselString);
	}	

	return match?e:undefined;
}

ParentElement=function(targetIDsel,parentIDselString){
	if(!parentIDselString)
		return FirstParentElement(targetIDsel);
	FirstMatchingElement("parentElement",targetIDsel,parentIDselString);
}

PriorElement=function(targetE,priorIDselString){
	return FirstMatchingElement("previousSibling",targetE,priorIDselString);
}

PosteriorElement=function(targetE,priorIDselString){
	return FirstMatchingElement("nextSibling",targetE,priorIDselString)
}

// Add new element to page, under a parent element
NewNode=function(htmlOrElement){
	var e=htmlOrElement;
	if (typeof htmlOrElement==="string")
		e=MakeElement(htmlOrElement);
	return e;
}

// Add new element to page, after a sibling element
ElementAdder=function(Adder){
	return function(htmlOrElement,parentIDsel){
		var s=GetElement(parentIDsel);
		if(!s)
			return;

		var e=GetElement(htmlOrElement);

		if(IsString(htmlOrElement)&&!e){
			var id=GenerateId();
			var e=NewNode(`<div id="${id}"></div>`);
			Adder(s,e);
			return e.outerHTML=htmlOrElement;
		}

		if(!e) //actual HTML code
			e=NewNode(htmlOrElement);

		return Adder(s,e);
	};
};

AddElement=function(htmlOrElement,parentIDsel){
	function Adder(s,e){
		return s.appendChild(e);
	};
	return ElementAdder(Adder)(htmlOrElement,parentIDsel);
};

PreAddElement=function(htmlOrElement,parentIDsel){
	function Adder(s,e){
		return s.prepend(e);
	};
	return ElementAdder(Adder)(htmlOrElement,parentIDsel);
};

AppendElement=function(htmlOrElement,parentIDsel){
	function Adder(s,e){
		return s.insertAdjacentElement('afterend',e);
	};
	return ElementAdder(Adder)(htmlOrElement,parentIDsel);
};

PrependElement=function(htmlOrElement,parentIDsel){
	function Adder(s,e){
		return s.insertAdjacentElement('beforebegin',e);
	};
	return ElementAdder(Adder)(htmlOrElement,parentIDsel);	
};


// Replace parent element contents with new element
ReplaceChildren=function(html,parentIDsel){
	var p=GetElement(parentIDsel);
	if(p)
		p.innerHTML=html;
};

// Replace element with new element
ReplaceElement=function(htmlOrElement,elemIDsel){
	var a=AppendElement(htmlOrElement,elemIDsel);
	RemoveElement(elemIDsel);
	return a;
};

ReplaceElements=function(htmlOrElement,elemIDsel){
	var els=GetElements(elemIDsel);
	if(els.length)
		GetElements(elemIDsel).map(function(e){ReplaceElement(htmlOrElement,e)});
};


//Wrap Element
WrapElement=function(html,elemIDsel,newparentIdsel){
	AppendElement(html,elemIDsel);
	AddElement(GetElement(elemIDsel),newparentIdsel);
}


// Remove Children
RemoveChildren=function(parentID){
	ReplaceChildren("",parentID)
}

// Remove Element
RemoveElement=function(elementIDsel,parentIDsel){
	var e=GetElement(elementIDsel,parentIDsel);
	if(e&&e.parentNode){
		e.parentNode.removeChild(e);
	}
}

// Remove Multiple Elements
RemoveElements=function(elementIDsel,parentIDsel){
	var eList=GetElements(elementIDsel,parentIDsel);
	eList.map(RemoveElement);
}

//////////////////////////////////////////////////
// Element Unique ID

UniqueId=function(elementIDsel){
	var e=GetElement(elementIDsel);
	if(!e)
		return false;

	if(!e.id)
		e.id=GenerateId();

	return e.id;
}

//////////////////////////////////////////////////
// Apply to Child Elements

ApplyChildren=function(F,elem,children){
	if(!children)
		return;
	var children=F(children);
	children.map(function(c){return c.cloneNode&&c.cloneNode(true)});
	RemoveChildren(elem);
	children.map(function(c){AddElement(c,elem)});
}

ApplyOriginalChildren=function(F,parentSelector,childselector,subparentSelector){
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
// Filter table

FilterChildren=function(filterF,parentSelector,childSelector,subparentSelector){
	function FilterCh(children){
		return children.filter(filterF);
	}
	ApplyOriginalChildren(FilterCh,parentSelector,childSelector,subparentSelector);
}

InSubPart=function(celltxt,subparts){
	var celltxt=UnWhitespace(celltxt);
	var subparts=AccPermutations(subparts,3).map(p=>p.join(""));
	return subparts.some(txt=>InString(celltxt,txt));
}

RowFilterer=function(row,patterntxt){
	var patterntxt=LowerSpacedString(patterntxt);
	if(patterntxt.replace(/\s*/g,"")==="")
		return true;
	var cells=GetElements("td",row).map(function(r){return LowerSpacedString(r.innerText)});
	var subparts=patterntxt.split(" ").filter(Identity);
	var cellstring=UnWhitespace(cells.join(""));
	return cells.some(celltxt=>InSubPart(celltxt,subparts))&&subparts.every(part=>InString(cellstring,part));
}


TableFilter=function(patterntxt,table){
	var rows=GetElements("TR",GetElement("TBODY",table));
	rows.map(row=>RowFilterer(row,patterntxt)?UnHideElement(row):HideElement(row));
	AddShareSearch(patterntxt,table);
}

PrependFilterInput=function(InputFilterF,parentSelector){
	var input=PriorElement(parentSelector,".search");
	var value="";
	if(input){
		value=input.value;
		RemoveElement(input);
	}

	var uid=UniqueId(parentSelector);
	filterHTML="<input class='input search filter-"+uid+"' placeholder='search "+StringSymbol("search")+"' onkeyup='"+FunctionName(InputFilterF)+"(\""+uid+"\",\".filter-"+uid+"\")'></input>";
	input=PrependElement(filterHTML,parentSelector);
	if(value!==""&&input.value===""){
		input.value=value;
	}
}

AddShareSearch=function(patterntxt,elementSelector){	
	var tableid="";
	var tables=GetElements("TABLE");
	if(tables.length>1){
		tableid=tables.indexOf(elementSelector);
		if(tableid)
			tableid="&table="+tableid;
		else
			tableid="";
	}

	var shareLink=PageUnSearch()+"?search="+patterntxt+tableid;
	RemoveElement(PosteriorElement(elementSelector,".share-link"));
	AppendElement("<div class='share-link'><b>Share this search:</b>"+AHTML(shareLink,shareLink)+"</div>",elementSelector);
}

// Recognise filter table

FilterSearchURL=function(){
	var search=PageSearch("search");
	if(search==="")
		return;
	
	var table;

	var tableid=PageSearch("table");
	if(tableid==="")									//Get the first table
		table=GetElement("TABLE");
	else if(!IsNan(Number(tableid))){ 					//Or the nth table
		tableid=Number(tableid);
		table=GetElements("TABLE")[tableid];
		table=table||GetElement("TABLE");
	}
	else{												//Or the one specified by an id, if avaiable
		table=GetElement(tableid);
		table=table||GetElement("TABLE");
	}

	if(table){
		TableFilter(search,table);
		var input=PriorElement(table,".search");
		if(input){
			input.value=search;
			ScrollInto(input);
		}		
	}
}

InputFilter=function(parentSelector,filterSelector){
	var textfilter=GetElement(filterSelector).value;
	var parentSelector=GetElement(parentSelector);
	TableFilter(textfilter,parentSelector);
}

FilterableTable=function(tableSelector){
	if(GetElements("TR",tableSelector).length>10){//Only big tables need filtering
		PrependFilterInput(InputFilter,tableSelector);
	}
}


//////////////////////////////////////////////////
// Scroll into

ScrollInto=function(elementIDsel){
	var e=GetElement(elementIDsel);
	e.scrollIntoView();
}



////////////////////////////////////////////////////////////////////////////////
// Element Generator

ReadAttributes=function(attributesObj){
	function Attrib(k){return k+"='"+attributesObj[k]+"'";};
	return Keys(attributesObj).map(Attrib).join(" ");
}

ElementHTML=function(optionsObj){
	var tag=optionsObj.tag?optionsObj.tag:"div";
	var attributes=(optionsObj.attributes)?' '+ReadAttributes(optionsObj.attributes):'';	//attributes is an Object
	var txt=optionsObj.txt?optionsObj.txt:"???";
	return "<"+tag+attributes+">"+txt+"</"+tag+">";		//txt and tag
};

SingleElementHTML=function(optionsObj){
	var tag=optionsObj.tag?optionsObj.tag:"div";
	var attributes=(optionsObj.attributes)?' '+ReadAttributes(optionsObj.attributes):'';	//attributes is an Object
	return "<"+tag+attributes+"/>";
};


// Basic Elements

ImageHTML=function(optionsObj){
	var o=optionsObj?optionsObj:{};
	o.tag="img";
	if(!o.attributes)
		o.attributes={src:"images/splash.png"}
	return SingleElementHTML(o);
};

PlaceholderImageHTML=function(){
	return ImageHTML();
};

FigureHTML=function(source,caption){
	if(caption)
		caption=`<figcaption class="legend">${caption}</figcaption>`;
	else
		caption="";
	
	var source=Prefix(source,"images/");
	return `<figure class="figure">
				${ImageHTML({attributes:{src:source}})}
				${caption}
			</figure>`;
}

IconHTML=function(Opts){
	var path=IsString(Opts)?Opts:(Opts.path||"M 10 10 L 20 10 L 10 20 Z");
	
	var name=Opts.name||"unnamed";

	var height=Opts.height||Opts.width||"20";
	var width=Opts.width||Opts.height||"20";

	var vbmin=Opts.vbmin||`0 0`;
	var vbmax=Opts.vbmax||`400 400`;

	var viewbox=Opts.viewbox||`${vbmin} ${vbmax}`;

	if(Opts.transform) //transform name, that is
		path=SVGPathTransform(path,Opts.transform,viewbox);

	var svghtml=`
		<svg class='iconpath icon-${name}' width='${width}' height='${height}' viewBox='${viewbox}'>
			<path d='${path}'/>
		</svg>`;
	return SpanHTML(svghtml,"icon");
}

SpanHTML=function(html,clas){
	if(clas)
		var clas=Exfix(clas," class='","'");
	else
		var clas="";
	return "<span"+clas+">"+html+"</span>";
}

ButtonHTML=function(optionsObj){
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

AHTML=function(title,ref,attribs){
	if(typeof ref==="undefined"){
		if(Prefixed(title,"#"))
			return HeaderAHTML(UnPrefix(title,"#"),undefined,{class:"innerlink"}); //self-anchors
		
		if(In(title,".html"))
			return AHTML(title,title);
		
		var ref=title;
		var title=CapitaliseSlug(title.replace("-"," "));
			ref=RightPath(ref);
	}
	var external=Prefixed(ref,"http");
	var attribs=attribs||{};
	attribs["href"]=ref;
	if(external)
		attribs["rel"]="noreferrer noopener";
	return ElementHTML({tag:"a",txt:title,attributes:attribs});
}


LabelHTML=function(text,type){
	var type=type||text||"";
	return "<sup class='label "+type+"'>"+text+"</sup>";
}

ScrollUpHTML=function(){
	return ButtonHTML({txt:ObtainSymbol("scroll-up"),attributes:{class:"scrollTop",onclick:"window.scrollTo(0,0)"}});
}

ViewCounterHTML=function(){
	return DynamicTextHTML("view-counter"," ");
}

//Hidden Elements
GhostHTML=function(id){
	"<span id='"+id+"' class='hidden'></span>";
}


// Table Elements

TDHTML=function(d){
	if(!d||d==="")
		return "<td></td>";
	return "\t\t<td>"+d+"</td>";
}

TRHTML=function(dataArray){
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

TableHTML=function(caption,headers,rows){
	
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
		
	return `
	<div class="table">
		<caption><span class="caption">${caption}</span></caption>
		<table>
			<thead>${headersHTML}</thead>
			<tbody>
				${rowsHTML}
			</tbody>
		</table>
	</div>
	`;
}


SectionHTML=function(SettingsObj){
	var Source=SettingsObj.Source;

	var header=SettingsObj.header||"";
	var footer=SettingsObj.footer||"";
	var InnerWrapper=SettingsObj.InnerWrapper||Identity;
	var OuterWrapper=SettingsObj.OuterWrapper||Identity;
	
	var Sorter=SettingsObj.Sorter;
	var ItemHTML=SettingsObj.ItemHTML;
	var include=SettingsObj.include||{};
	var exclude=SettingsObj.exclude||false;
	var FilterF=SettingsObj.FilterF;
	var max=SettingsObj.max||false;

	var changes=Source;
	if(FilterF)
		changes=Values(FilterObject(changes,FilterF));
	if(include)
		changes=BaseFilter(changes,include);
	
	if(exclude){
		var unchanges=BaseFilter(changes,exclude);
		changes=Complement(changes,unchanges);
	}

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

ButtonOnClickHTML=function(title,onclicktxt){
	return ButtonHTML({txt:title,attributes:{onclick:onclicktxt}});
}

ButtonLinkHTML=function(title,symbol,attribs){
	var id='#'+TocId(title);
	var attribs=attribs||{};
	if(!symbol)
		var symbol=title;
	if(GetElement(id))
		return ButtonHTML({txt:symbol,tag:"a",attributes:FuseObjects({href:id,onclick:'FullscreenClose()'},attribs)});
	else
		return GhostHTML(id);
}

CloseButtonHTML=function(targetid){
	return "<div class='closer'>"+ButtonHTML({tag:"span",txt:"&times;",attributes:{onclick:'CloseCurrentDatapack();CloseWindow(this);'}})+"</div>";
}

OkButtonHTML=function(targetid){
	return ButtonOnClickHTML("OK",'Close(\"'+targetid+'\")');
}
SubmitButtonHTML=function(DP){
	return ButtonOnClickHTML(DP.actionText,FunctionName(DP.action)+"(\""+DP.qid+"\")");
}
NavigationButtonHTML=function(pageName){
	return `<div class="button centered" tabindex="0" onclick="Navigate('${pageName}')">${Capitalise(pageName)}</div>`
}


MessageHTML=function(message,clas){
	var clas=clas||"question";
	return "<div class='"+clas+"'>"+message+"</div>";
}

ErrorHTML=function(message,id){
	return "<div class='error' id='"+id+"'>"+PHTML(message)+"</div>";
}

PHTML=function(message){
	return "<p>"+message+"</p>";
}


PlainMessageHTML=function(message){
	return message;
}

//Button Bar
ButtonBar=function(buttonshtml,id){return '<div id="'+id+'" class="buttonbar buttonrow">'+buttonshtml+'</div>';}

////////////////////////////////////////////////////////////////////////////////
// DataField and DataPack system : default DataField (customisable), many of which constitute a DataPack 

DefaultDataField=function(){
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
		qplaceholder:"Dear Pedro PSI...",//Placeholder answer

		shortcuts:Identity,				//Special shortcuts

		qsubmittable:true, 				//whether the element expects submission (true) or merely presents information (false)
		qrequired:true,
		qvalidator:IdentityValidator,	//Receives a DataField
		qerrorcustom:''
	}
}

DefaultChoice=function(index,choicetxt){return String(index)===String(0);}//choicetxt gives this function flexibility

DefaultDataPack=function(){
	return {
		fields:[],

		qid:GenerateId(),				//id
		qclass:"",						//class

		destination:'',					//Name of data repository (empty means non-submittable)
		findDestination:FindDestination,//Get Destination
		requireConnection:true,			//Does it need a connection?

		action:CheckSubmit, 			//action on submit :receives a qid
		actionvalid:SubmitValidAnswer,	//action on valid submit: receives a DataPack
		actionText:'Submit',			//text to display instead of "Submit"

		qtargetid:"BODY",				//Where to introduce form in page?
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

FindDestination=function(DP){return FindData("destination",DP.qid)};


DataFieldTypes=function(){
	return {
	plain:{
		qsubmittable:false},
	message:{
		action:Close,
		qtype:LongAnswerHTML,
		qdisplay:LaunchConsoleThanks},
	email:{
		qtype:ShortAnswerHTML,
		qfield:"address",
		qplaceholder:"_______@___.___",
		questionname:"Your email address",
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
		qchoices:[StringSymbol("left"),"OK",StringSymbol("right")],
		qtype:ExclusiveChoiceButtonRowHTML,
		defaultChoice:function(i,txt){return txt==="OK";},
		qsubmittable:false},
	keyboard:{
		qfield:"keyboard",
		questionname:"",
		qchoices:DefaultKeyboardKeys(),
		qtype:KeyboardHTML,
		defaultChoice:function(i,txt){return txt==="⮐";},//Defaults to enter
		qsubmittable:false},
	password:{
		questionname:"What is the password?",
		qfield:'password',
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
}

CustomDataField=function(type,obj){
	var DF=DefaultDataField();
	var dataFieldTypes=DataFieldTypes();
	if(In(dataFieldTypes,type))
		DF=FuseObjects(DF,dataFieldTypes[type]);
	return FuseObjects(DF,obj);
}

UpdateDataPack=function(DP,obj){
	return FuseObjects(DP,obj);
}

NewDataPack=function(obj){
	return UpdateDataPack(DefaultDataPack(),obj);
}

NewDataPackFields=function(NamedFieldArray){
	function CusDaFiel(ndf){return CustomDataField(ndf[0],ndf[1])};
	var f=NamedFieldArray.map(CusDaFiel);
	return {fields:f};
}

RequestDataPack=function(NamedFieldArray,Options){
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

PlainHTML=function(dataField){
	return "<span class='field-"+dataField.qfield+"' data-"+dataField.qfield+"='"+dataField.qvalue+"'>"+PlainMessageHTML(dataField.questionname)+"</span>";
}

ExclusiveChoiceButtonHTML=function(choice,dataField,i){
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

MultiChoiceButtonHTML=function(choice,dataField,i){
		var args='(\''+dataField.qfield+'\',\''+choice+'\',\''+dataField.pid+'\')';
		var SelectF='ToggleThis(event,this);ToggleData'+args;
		var buAttribs={'onclick':SelectF,'onfocus':SelectF,id:"choice-"+choice};

		return ButtonHTML({txt:dataField.qchoicesViewF(choice),attributes:buAttribs});
	};

ChoiceRowHTML=function(dataField,buttontype){
	var choi="";
	for(var i in dataField.qchoices)
		choi=choi+buttontype(dataField.qchoices[i],dataField,i);
	return choi;
}

SectionRowsHTML=function(sectionArray){
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

LayoutHTML=function(dataField,buttontype,layoutclass,LayoutF){
	ClearData(dataField.qfield,dataField.pid);
	var clear='onload="ClearData(\''+dataField.qfield+'\',\''+dataField.pid+'\')" ';
	var questionclass=dataField.qclass||"";
	var choi=LayoutF(dataField,buttontype);
	return '<div class="'+layoutclass+' '+questionclass+' field-'+dataField.qfield+'" '+clear+'id="'+dataField.qid+'">'+choi+'</div>';
}


ExclusiveChoiceButtonRowHTML=function(dataField){
	return LayoutHTML(dataField,ExclusiveChoiceButtonHTML,'buttonrow',ChoiceRowHTML);
}

ExclusiveChoiceSectionsHTML=function(sections){
	function ExChS(dataField){
		return LayoutHTML(dataField,ExclusiveChoiceButtonHTML,'buttonrow',SectionRowsHTML(sections));
	};
	return ExChS;
}

ChoicesButtonRowHTML=function(dataField){
	return LayoutHTML(dataField,MultiChoiceButtonHTML,'buttonrow',ChoiceRowHTML);
}


ShortAnswerHTML=function(dataField){
	return "<input class='input field-"+dataField.qfield+"' data-"+dataField.qfield+"='' placeholder='"+dataField.qplaceholder+"' id='"+dataField.qid+"' tabindex='0' value='"+dataField.qvalue+"'></input>";
}

LongAnswerHTML=function(dataField){
	return "<textarea class='input field-"+dataField.qfield+"' data-"+dataField.qfield+"='' placeholder='"+dataField.qplaceholder+"' id='"+dataField.qid+"' tabindex='0' value='"+dataField.qvalue+"'></textarea>";
}

SubQuestionHTML=function(dataField){
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

QuestionHTML=function(DP){
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

LaunchThanksBalloon=function(DP){
	RequestDataPack(
		[['plain',{questionname:DP.thanksmessage}]],
		{qtargetid:DP.qtargetid,
		qdisplay:LaunchAvatarBalloon,
		requireConnection:false});
}

LaunchBalloon=function(DP){
	OpenBalloon(QuestionHTML(DP),DP.qid,DP.qtargetid);
}

LaunchAvatarBalloon=function(DP){
	OpenBalloon(QuestionHTML(DP),DP.qid,DP.qtargetid,true);
}

BalloonHTML=function(avatarHTML,content,id,classExtra){
	var classExtra=classExtra||"";
	var b='<div class="balloon window '+classExtra+'" id='+id+'>'+CloseButtonHTML(id)+'<div class="baloon-content">'+avatarHTML+'<div class="subtitle">'+content+'</div></div></div>';
	return b;
}

OpenBalloon=function(content,id,targetid,avatar){
	if(!avatar||typeof LOGO==="undefined")
		var avatar="";
	else
		var avatar='<div class="logo avatar">'+LOGO+'</div>';
	AddElement(BalloonHTML(avatar,content,id),targetid);
}

//Banner (e.g for keyboard)
BannerHTML=function(content,id,classExtra){
	var classExtra=classExtra||"";
	var b='<div class="banner window '+classExtra+'" id='+id+'><div class="banner-content">'+content+'</div></div>';
	return b;
}

OpenKeyboardBanner=function(content,id,targetid){
	return AddElement(BannerHTML(content,id,"keyboard"),targetid);
}

LaunchKeyboardBanner=function(DP){
	OpenKeyboardBanner(QuestionHTML(DP),DP.qid,DP.qtargetid);
}

OpenKeyboardBalloon=function(content,id,targetid){
	return AddElement(BalloonHTML("",content,id,"keyboard"),targetid);
}

LaunchKeyboardBalloon=function(DP){
	OpenKeyboardBalloon(QuestionHTML(DP),DP.qid,DP.qtargetid);
}

// On-screen Keyboard
DefaultKeyboardKeys=function(){
	return [["1","2","3","4","5","6","7","8","9","0"],["Q","W","E","R","T","Y","U","I","O","P"],["A","S","D","F","G","H","J","K","L"],["Z","X","C","V","B","N","M"/*,"dot","dash"*/],["undo","redo","space","restart","close"]]};

KeyboardRowsHTML=function(dataField,buttontype){
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

KeyboardHTML=function(dataField){
	return LayoutHTML(dataField,KeyboardButtonHTML,'keyboard',KeyboardRowsHTML)
}


KeyboardButtonHTML=function(choice,dataFiel,i){
	var buID='kb'+i;
	var ID="choice-"+choice;
	KeyboardButtonHTML[buID]=function(){
		ExecuteChoice(dataFiel.qfield,choice,dataFiel.pid);
		PulseSelect(ID);
	};

	var Kargs='(KeyboardButtonHTML.'+buID+',250,"'+buID+'");';
	var Start='AutoRepeat'+Kargs;
	var Stop='AutoStop'+Kargs+'FadeSelect("'+ID+'");';

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

FadeSelect=function(targetIDsel){
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
FocusAndResetFunction=function(RequestF,FocusF){
	return function(){
		if(RequestF.id)
			RequestF.id=undefined;
		FocusF();
	};
};


////////////////////////////////////////////////////////////////////////////////
// Toggling class & buttons

ToggleThis=function(ev,thi){
	if(ev.target.id===thi.id)
		Toggle(thi);
}

ToggleThisOnly=function(ev,thi,maxparent){
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

Class=function(selectorE,clas){
	var clas=UnPrefix(clas,".")||'selected';
	var e=GetElement(selectorE);
	if(e){
		e.classList.remove(clas);
		e.classList.add(clas);
	}
	return e;
}

UnClass=function(selectorE,clas){
	var clas=UnPrefix(clas,".")||'selected';
	var e=GetElement(selectorE);
	if(e)
		e.classList.remove(clas);
	return e;
}

Classes=function(selectorE){
	var e=GetElement(selectorE);
	if(e)
		return Array.from(e.classList);
	else
		return [];
}

Select=function(selectorE){ //With Pulse by default
	var e=Class(selectorE,'selected');
	PulseSelect(selectorE);
	return e;
}

Deselect=function(selectorE){ 
	UnClass(selectorE,'selected');
}

Selected=function(selectorE){
	return Classed(selectorE,'selected');
}

Classed=function(selectorE,clas){
	var clas=clas||'selected';
	var e=GetElement(selectorE);
	return e&&e.classList&&e.classList.contains(clas);
}

Toggle=function(selectorE,clas){
	var clas=clas||'selected';
	if(IsString(clas))
		clas=[clas];
	var e=GetElement(selectorE);
	if(e)
		clas.map(c=>e.classList.toggle(c));
	return e;
}

ToggleClass=Toggle;

// Select Pulse

PulseSelect=function(selectorE,clas,delay){
	var delay=delay||100;
	var clas=clas||"pulsating";
	UnClass(selectorE,clas);//cyclical pulse effect on long taps
	Class(selectorE,clas);
	setTimeout(function(){UnClass(selectorE,clas);},delay);
}

// Fade/Unfade (opacity only)

FadeElement=function(e){
	var e=GetElement(e);
	if(!e||Classed(e,"faded"))
		return;

	setTimeout(function(){
		UnClass(e,"closing");
		Class(e,"faded");
	},1000)
	
	Class(e,"closing");
}

UnFadeElement=function(e){
	var e=GetElement(e);
	if(!e)
		return;

	setTimeout(function(){
		UnClass(e,"opening");
		UnClass(e,"faded");
	},1000)

	Class(e,"opening");
}

ShrinkElement=function(e){
	Class(e,"shrinked");
}
UnShrinkElement=function(e){
	UnClass(e,"shrinked");
}

// Hide


HiddenHTML=function(id){
	return "<span id='"+UnPrefix(id,"#")+"' class='hidden'></span>"
}

UnHideElement=function(selectorE){
	var e=GetElement(selectorE);

	//Restore tabindex
	if(e&&e.dataset.tabindex)
		e.tabindex=e.dataset.tabindex;

	UnClass(e,"hidden");
	return e;
}

UnHideUnFadeElement=function(e){
	UnHideElement(e);
	UnFadeElement(e);
}

HideElement=function(selectorE){
	var e=GetElement(selectorE);

	//Hide tabindex
	if(e&&e.tabindex){
		e.removeAttribute(tabindex);
		e.dataset.tabindex=e.tabindex;
	}

	//Hide selection
	Deselect(e);

	Class(e,"hidden");
	return e;
}

ShowHideElement=function(selectorE){
	var e=GetElement(selectorE);
	if(!e)
		return;

	if(Classed(e,"hidden"))
		UnHideElement(e);
	else
		HideElement(e);
}

ShowHide=function(selectorE){
	var e=GetElements(selectorE);
	if(e.length)
		e.map(ShowHideElement);
}

////////////////////////////////////////////////////////////////////////////////
// Opening / Closing functions

OpenElement=function(e,parentIDsel){
	if(!e)
		return;
	e=NewNode(e);
	UnHideUnFadeElement(e);
	AddElement(e,parentIDsel);
}

CloseElement=function(targetIDsel,parentIDsel){
	var e=GetElement(targetIDsel,parentIDsel);
	if(e){
		FadeElement(e);
		setTimeout(function(){RemoveElement(targetIDsel,parentIDsel)},1000);
	}
}

CloseWindow=function(e){
	CloseElement(ParentElement(e,".window"));
}

Close=function(targetid){
	var DP=GetDataPack(targetid);
	if(DP)
		CloseDatapack(DP);
	else
		CloseElement(targetid);
}

CloseAndContinue=function(DP){
	Deselect(DP.buttonSelector);
	if(DP.qonsubmit)
		DP.qonsubmit(DP);
	CloseElement(DP.qid);
}

// Current Datapack
CurrentDatapack=function(ConditionF){
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

CloseDatapack=function(DP){
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

CloseCurrentDatapack=function(){
	CloseDatapack(CurrentDatapack());
}

ClosePreviousDatapacks=function(ConditionF){
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

SubmitCurrentDatapack=function(){
	var DP=CurrentDatapack();
	DP.action(DP.qid);
}

////////////////////////////////////////////////////////////////////////////////
// Focus functions

// Spotlight (context shifting)
Spotlight=function(){
	if(!Spotlight.s)
		Spotlight.s=[document.body];
	return Last(Spotlight.s);
}

AddSpotlight=function(element){
	if(Spotlight()!==element){
		Spotlight.s.push(element);
	}
	return element;
}

// Focus Element
FocusElement=function(targetIDsel){
	var focussing=GetElement(targetIDsel);
	if(focussing){
		focussing.focus();
		AddSpotlight(focussing);
		//ListenOnce('blur',FocusActive,focussing);
	}
	return focussing;
};


// Which elements are focusable?
FocusableInput=function(e){
	return Classed(e,"input")||In(["INPUT","TEXTAREA"],e.tagName);
}
Focusable=function(e){
	return FocusableInput(e)||Classed(e,"button")||Classed(e,"gif")||e.tagName==="A";//List of element and classes
}
UnFocusable=function(e){
	return Classed(e,"closer")||Classed(e,"logo");
}

// Focus Inside Element, looking for focusables
FocusInside=function(targetIDsel,backward){
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


FocusAdjacentElement=function(elem,backward,bounded){

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
FocusNext=function(F){
	var e=FocusAdjacentElement(document.activeElement,false);
	if(F&&typeof F==="function")
		F(e);
	return e;
}

FocusPrev=function(F){
	var e=FocusAdjacentElement(document.activeElement,true);
	if(F&&typeof F==="function")
		F(e);
	return e;
}

FocusStay=function(F){
	var e=document.activeElement;
	if(F&&typeof F==="function")
		F(e);
	return e;
}

FocusNextBounded=function(F){
	var e=FocusAdjacentElement(document.activeElement,false,true);
	if(F&&typeof F==="function")
		F(e);
	return e;
}

FocusPrevBounded=function(F){
	var e=FocusAdjacentElement(document.activeElement,true,true);
	if(F&&typeof F==="function")
		F(e);
	return e;
}

//Focus NextParent
FocusNextParent=function(F){
	var e=FocusAdjacentElement(document.activeElement.parentElement,false);
	if(F&&typeof F==="function")
		F(e);
	return e;
}

FocusPrevParent=function(F){
	var e=FocusAdjacentElement(document.activeElement.parentElement,true);
	if(F&&typeof F==="function")
		F(e);
	return e;
}


//Click
ClickElement=function(elem){
	var elem=GetElement(elem);
	elem.click();
}

ClickPrevBounded=function(){
	FocusPrevBounded(ClickElement);
}

ClickNextBounded=function(){
	FocusNextBounded(ClickElement);
}

ClickStay=function(){
	FocusStay(ClickElement);
}

///////////////////////////////////////////////////////////////////////////////
// Custom events 

Shout=function(name,targetSelector){
	Shout[name]=targetSelector;	//register Shouts
	
	if(NodejsDetected()){
		ShoutNode(name);
		return;
	}

	var ev=new CustomEvent(name);
	var e=GetElement(targetSelector)||window;
	e.dispatchEvent(ev);
}

Shouted=function(eventName){
	In(Keys(Shout),eventName)
}

//polyfill
if(!NodejsDetected()&&typeof window.CustomEvent!=="function"&&window.CustomEvent){
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
//Event Listeners

Listen=function(eventName,F,target){
	if(NodejsDetected()){
		var eventName=UnPosfix(eventName,".js").replace(/.*\//g,"");
		return ListenNode(eventName,F);
	}

	var target=GetElement(target)||window;
	if(!target.addEventListener)
		return;
		
	if(In(['click','mousedown'],eventName))
		target.addEventListener(eventName,F,{"passive":true})
	else
		target.addEventListener(eventName,F)
};

ListenOnce=function(eventName,F,target){
	var EFTC={
		name:eventName,
		F:F,
		target:target,
		ConditionF:True
	}

	return ListenF(EFTC);
}


HearOnce=function(eventName,F,target){ //execute if heard or keep listening
	if(Shouted(eventName)&&!target)
		F();
	else
		ListenOnce(eventName,F,target);
}

ListenOutside=function(eventName,F,target){
	var EFTC={
		name:eventName,
		F:F,
		ConditionF:function(ev){return Outside(target,ev.target);},
		target:window};

	return ListenF(EFTC);
}

ListenF=function(EFTC){
	var EFTC=EFTC;
	if(!IsArray(EFTC.name))
		EFTC.name=[EFTC.name];

	if(!NodejsDetected())
		EFTC.target=GetElement(EFTC.target)||window;

	var fun=EFTC.F;
	var ConditionF=EFTC.ConditionF;
	function F(ev){
		if(ConditionF(ev)){
			fun();
			UnListen(EFTC);
		}
	};
	EFTC.F=F;

	ListenIndeed(EFTC);
	return EFTC;
}

UnListen=function(EFTC){
	if(NodejsDetected())
		return ListenNoMoreNode(EFTC);
	
	EFTC.name.map(function(name){EFTC.target.removeEventListener(name,EFTC.F)});
}

ListenIndeed=function(EFTC){
	EFTC.name.map(function(name){Listen(name,EFTC.F,EFTC.target)});
}

//Listen for all events in array before firing
HearAll=function(shoutArray,SuccessF){
	function Heard(shoutcode){
		if(!Heard.array)
			Heard.array=[];

		Heard.array.push(shoutcode);
		Heard.array=Unique(Heard.array);

		//console.log("heard so far:",Heard.array)

		if(Equal(Heard.array,Unique(shoutArray)))
			SuccessF();
	}

	function Hear(shoutcode){
		HearOnce(shoutcode,function(){Heard(shoutcode)});
	}

	shoutArray.map(Hear);
}

ShoutAnd=function(shoutArray,SuccessShout){
	HearAll(shoutArray,function(){Shout(SuccessShout)});
}


//Node specific events
RequireEventsNode=function(){
	if(!Listen.events)
		Listen.events = require('events');
	if(!Listen.node){
		Listen.node = new Listen.events();
	}
	RequireEventsNode=True;
	return true;
}

ListenNode=function(eventName,F){
	if(RequireEventsNode()){
		Listen.node.on(eventName,F);
		//console.log("###}}} listening to ",eventName);
	}
}

ShoutNode=function(eventName,F){
	if(RequireEventsNode()){
		Listen.node.emit(eventName);
		//console.log("O)-)--)---) emitted ",eventName);
	}
}

ListenNoMoreNode=function(lobj){
	return RequireEventsNode();
}


////////////////////////////////////////////////////////////////////////////////
// Data submission in forms

SubmitData=function(outflowData){
	var data=outflowData;

	if(!PreviousSubmission.history)
		PreviousSubmission.history=[];
	PreviousSubmission.history.push(data);
	
	if(data.post)
		EchoData(data);
	else // delete
		EchoData(data,data.url);
}

SubmitValidAnswer=function(DP){
	var destinationName=DP.findDestination(DP);
	var outflowData=Outflows(destinationName);
	if(outflowData)
		SubmitData(outflowData);

	/*Legacy method, todo delete
	var destinationObject=GetDestination(destination);
	var dataObject=(destinationObject.Data)(DP.qid);
	SubmitData(dataObject,destinationObject);*/
}

InvalidateAnswer=function(DF){
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

CheckSubmit=function(qid){
	var DP=GetDataPack(qid);
	if(typeof DP!=="undefined"){
		RemoveElements("error",qid);
		var invalidation=DP.fields.map(InvalidateAnswer);
		if(!invalidation.some(Identity)){
			SubmitAnswerSet(DP);
		}
	}
};

SubmitAnswerSet=function(DP){
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


PreviousSubmission=function(field){
	if(!PreviousSubmission.history)
		PreviousSubmission.history=[];

	var s=PreviousSubmission.history.filter(function(datasub){return ((typeof datasub[field])!=="undefined")});

	if(s.length>0)
		return Last(s)[field];
	else
		return undefined;
}


// Data finding in forms

FindDataExternally=function(field,pid){
	return GetDefaultNodeData(field,pid)||PreviousSubmission(field);
};

FindData=function(field,pid){
	var e=GetElement(".field-"+field,pid);
	if(!e)
		return FindDataExternally(field,pid);

	var data=GetNodeData(field,e);
	if(typeof data==="undefined")
		data=FindDataExternally(field,pid);
	return data;
};

GetNodeData=function(field,elem){
	if(FocusableInput(elem)&&elem.dataset&&(typeof elem.dataset[field]!=="undefined"))
		return elem.value;
	else
		return elem.dataset[field];
}


///////////////////////

GetDataPack=function(id){
	if(!GetDataPack.history)
		GetDataPack.history=[];

	return GetDataPack.history.find(
		function(DP){return DP.qid===id;}
		);
};

GetDefaultNodeData=function(field,id){
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

SetData=function(field,value,id){
	//console.log(field,value,id);
	var DP=GetDataPack(id);
	if(DP!==undefined){
		GetDataPack(id)[field]=value;
		Shout("Set "+field);
	}
};

ClearData=function(field,id){
	SetData(field,"",id);
};

GetField=function(field,parentid){
	var DP=GetDataPack(parentid);
	if(DP!==undefined){
		var fis=DP.fields.filter(function(f){return (f.qfield===field)});
		if(fis.length>0)
			return fis[0];
	}
}

GetFieldValue=function(field,parentid){
	var fi=GetField(field,parentid);
	if(fi!==undefined)
		return	fi.qvalue;
}

ExecuteChoice=function(field,value,pid){
	GetField(field,pid).executeChoice(value,pid); //Not dynamically updated. And why should it be?
};



///////////////////////////////////////////////////////////////////////////////
// Modals

ModalHTML=function(content,id,type){
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

OpenModal=function(content,id,targetid){
	AddElement(ModalHTML(content,id),targetid);
	FocusInside(id);
}

//Modal self-laucher for questions (datapacks)
LaunchModal=function(DP){
	OpenModal(QuestionHTML(DP),DP.qid,DP.qtargetid);
}


///////////////////////////////////////////////////////////////////////////////
//Embedded info
LaunchEmbed=function(DP){
	AddElement(QuestionHTML(DP),DP.qtargetid);
}


///////////////////////////////////////////////////////////////////////////////
//Video modal

VideoEmbedHTML=function(ytid,origin){
	var ori=origin?"&origin="+origin:"";
	return '<iframe frameborder="0" scrolling="no" marginheight="0" marginwidth="0"width="100%" height="100%" type="text/html" src="https://www.youtube.com/embed/'+ytid+'?autoplay=1&fs=1&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0'+ori+'"></iframe>'};

OpenVideoModal=function(ytid){
	AddElement(ModalHTML(VideoEmbedHTML(ytid,PageFragment()),GenerateId(),"gallery-video"),document.body.id);
}

///////////////////////////////////////////////////////////////////////////////
// Form Validators and Modifiers

// Pattern Validator Generator
PatternValidatorGenerator=function(pattern,errormessage){
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

IdentityValidator=function(DF){return {valid:true,error:"no errors"};}

EmailValidator=function(DF){
	var pattern=/(?:[\u00A0-\uD7FF\uE000-\uFFFF-a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[\u00A0-\uD7FF\uE000-\uFFFF-a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[\u00A0-\uD7FF\uE000-\uFFFF-a-z0-9](?:[\u00A0-\uD7FF\uE000-\uFFFF-a-z0-9-]*[\u00A0-\uD7FF\uE000-\uFFFF-a-z0-9])?\.)+[\u00A0-\uD7FF\uE000-\uFFFF-a-z0-9](?:[\u00A0-\uD7FF\uE000-\uFFFF-a-z0-9-]*[\u00A0-\uD7FF\uE000-\uFFFF-a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/ig;
	var errormessage="Please verify your e-mail address!";
	return PatternValidatorGenerator(pattern,errormessage)(DF);
}

SomeTextValidator=function(DF){
	var pattern=/[\d\w]/;
	var errormessage="Please write something!";
	return PatternValidatorGenerator(pattern,errormessage)(DF);
}

NameValidator=function(DF){
	var pattern=/[\d\w][\d\w]+/;
	var errormessage="Please write at least 2 alphanumerics!";
	return PatternValidatorGenerator(pattern,errormessage)(DF);
}

URLValidator=function(DF){
	var pattern=/((https?:\/\/(www\.)?)|(www\.))(.*)\.(.*)/;
	var errormessage="Please write a valid url, starting with e.g. https:// or www.";
	return PatternValidatorGenerator(pattern,errormessage)(DF);
}

// Utility
SomeTextValidate=function(name){
	var pattern=/[\d\w]/;
	return name.match(pattern)!==null;
}


///////////////////////////////////////////////////////////////////////////////
//Message Console 

Console=function(){
	if(!Console.buffer)
		return Console.buffer=[];
	else
		return Console.buffer;
}

ConsoleClear=function(){
	RemoveChildren("Console");
}

ConsoleRemove=function(mID){
	RemoveElement(mID);
	if(!Console.buffer)
		Console.buffer=[];
	var i=Console.buffer.indexOf(mID);
	if(i>=0)
		Console.buffer.splice(i,1);
}

ConsoleMessageHTML=function(message,mID,mclass){
	var mclass=mclass||"";
	return '<div class="message '+mclass+'" id='+mID+'>'+message+'</div>';
}

TextReadDuration=function(textstring){ //by counting number of words, 250ms per word
	var textstring=textstring.replace(/\<(span|svg).*\<\/\1\>/ig,""); //remove svg and span contents (text icons)
	return Min(Max(1000,(textstring.split(" ").length)*250),10000);
}

ConsoleAdd=function(messageHTML,wait,duration,mID,consoleID,mClass){
	var consolemax=3;
	var consoleID=consoleID||"Console";
	if(GetElement(consoleID)===null)
		ConsoleLoad(undefined,consoleID);

	var duration=duration?Max(1000,duration):TextReadDuration(messageHTML);
	var wait=wait?wait:0;
	var mID=mID?mID:"c-"+GenerateId();//random id
	setTimeout(function(){AddElement(ConsoleMessageHTML(messageHTML,mID,mClass),consoleID)},wait)
	setTimeout(function(){CloseElement(mID)},duration+wait);
	if(!Console.buffer)
		Console.buffer=[];
	Console.buffer.push(mID);
	while(Console.buffer.length>consolemax){
		ConsoleRemove(Console.buffer[0]);
	}
}

ConsoleLoad=function(selector,consoleID){
	var consoleID=consoleID||"Console";
	var selector=selector||'.main';
	RemoveElement(consoleID,selector);
	AddElement('<div class="Console" id="'+consoleID+'"></div>',selector);
}

ConsoleAddMany=function(messagesArray,consoleID,mClass){
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

ConsoleAddOnce=function(messageHTML,wait,duration){
	if(!ConsoleAddOnce.messages)
		ConsoleAddOnce.messages=[];

	if(!In(ConsoleAddOnce.messages,messageHTML)){
		ConsoleAdd(messageHTML,wait,duration)
		ConsoleAddOnce.messages.push(messageHTML);
	}
}


//DataPack integration in console
LaunchConsoleMessage=function(DP){
	ConsoleAdd(QuestionHTML(DP),undefined,undefined,DP.qid);
}

LaunchConsoleThanks=function(DP){
	ConsoleAdd(DP.thanksmessage);
}


///////////////////////////////////////////////////////////////////////////////
//Sounds Control

SoundHTML=function(sourcepath,data,id){
	return ElementHTML({
		tag:"audio",
		txt:" ",
		attributes:FuseObjects({'class':'sound',type:'audio/mpeg',preload:'auto','src':sourcepath,'id':(id?id:TocId(sourcepath))},data?Datafy(data):{})
	});
}

LoadSound=function(soundpath,data,id,parentElement){
	return AddElement(SoundHTML(soundpath,data,id),parentElement);
}

LS=function(soundobject,id,parentElement){
	var src=soundobject.src;
	var opts=FuseObjects(soundobject,{});
	delete opts.src;
	LoadSound(src,opts,id,parentElement);
};

LoadSounds=function(soundtrack,parentElement){
	var names=Keys(soundtrack);
	names.map(function(name){LS(soundtrack[name],name,parentElement)});
}

PlaySound=function(src){
	var s=new Audio(src);
	s.play();
	return;
}

///////////////////////////////////////////////////////////////////////////////
//Music Control

//Playlist
Playlist=function(i){
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

PlaylistStartPlay=function(){
	PlaySong(Playlist(0));
	//console.log("Music on");
}


//Song
Muted=function(){
	var mutebutton=GetElement("MusicButton");
	if(mutebutton)
		return !Selected(mutebutton);
	else
		return false;
}
Mute=function(){
	Deselect("MusicButton");
}
Unmute=function(){
	Select("MusicButton");
}

SongName=function(song){
	return UnPosfix(FileSong(song),[".mp3",".wav",".ogg"]);
}

ValidSong=function(song){
	return (typeof song!=="undefined")&&(SongName(song)!==FileSong(song));
}


PlaySong=function(song){
	if(ValidSong(song)&&song.paused){
		song.play();
		ListenOnce('ended',PlayNextF(song),song);
		Unmute();
		Listen("blur", PlaylistSleep);
		//console.log("Now playing: "+song);
	}
}

PauseSong=function(song){
	if(ValidSong(song)&&!song.paused){
		song.pause();
		ConsoleAdd("Music paused...");
		Mute();
		window.removeEventListener("blur", PlaylistSleep);
	}
}

ResumeSong=function(song){
	if(ValidSong(song)&&song.paused){
		song.play();
		ConsoleAdd("Resumed playing ♫♪♪ "+SongTitle(song));
		Unmute();
		Listen("blur", PlaylistSleep);
	}
}

SongTitle=function(song){
	return SongName(song).replace(/\%20/g," ");
}

FileSong=function(song){
	return decodeURI(PageFile(song.src)).replace(/.*\//,"");
}

PlayNextF=function(song){
	return function(){
		PlaySong(Playlist(Playlist.current+1));
		song.removeEventListener('ended',PlayNextF);
		//console.log("Finished playing: "+song);
	}
}


//Player

CurrentSong=function(){
	return Playlist.p[Playlist.current];
}

HasSong=function(){
	return (typeof Playlist.current)!=="undefined";
}

ToggleCurrentSong=function(){
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

PlaylistSleep=function(){
	if(!Playlist.sleep){
		Playlist.sleep=true;
		PauseSong(CurrentSong());
		Listen("focus", PlaylistAwaken);
	}
}

PlaylistAwaken=function(){
	if(Playlist.sleep){
		Playlist.sleep=false;
		ResumeSong(CurrentSong());
		window.removeEventListener("focus", PlaylistAwaken);
	}
}



///////////////////////////////////////////////////////////////////////////////
//Fullscreen

FullscreenAllowed=function(){
	return (document.exitFullscreen||document.mozCancelFullScreen||document.webkitExitFullscreen||document.msExitFullscreen||(document.webkitFullscreenElement&&document.webkitExitFullscreen)||false)!==false;
}

FullscreenActivate=function(browserprefix){
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

FullscreenOpen=function(targetIDsel){
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

FullscreenClose=function(){
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

FullscreenToggle=function(targetIDsel){
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

FullscreenElement=function(){
	return GetElement(FullscreenElement.selector);
}

//Fullscreen cursor
HiddenFullscreenCursor=function(){
	return Classed(FullscreenElement(),"hideCursor");
}
HideFullscreenCursor=function(){
	if(!HiddenFullscreenCursor()){
		Class(FullscreenElement(),"hideCursor");
		HideFullscreenCursor.last=ListenOnce('mousemove',ShowFullscreenCursor,FullscreenElement());
	}
}
ShowFullscreenCursor=function(){
	UnClass(FullscreenElement(),"hideCursor");
	FreeFullscreenCursor.timeout=setTimeout(HideFullscreenCursor,3000);
}
FreeFullscreenCursor=function(){
	UnClass(FullscreenElement(),"hideCursor");
	clearTimeout(FreeFullscreenCursor.timeout);
	if(HideFullscreenCursor.last)
		UnListen(HideFullscreenCursor.last);
}


///////////////////////////////////////////////////////////////////////////////
//Contextual Shortcuts

ContextualDefaultShortcuts=function(){
	return{
	"BODY":{
		"tab":FocusNext,
		"shift tab":FocusPrev,
		"up":FocusPrev,
		"down":FocusNext,
		"left":FocusPrev,
		"right":FocusNext
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
		"down":FocusNext
	},
	".navi":{
		"up":FocusPrevParent,
		"down":FocusNextParent,
		"left":ClickPrevBounded,
		"right":ClickNextBounded
	},
	".buttonrow":{
		"up":FocusPrevParent,
		"down":FocusNextParent,
		"left":FocusPrevBounded,
		"right":FocusNextBounded
	},
	".button":{
		"enter":ClickStay,
		"space":ClickStay,
		// "X":ClickStay
	},
	"A":{
		"space":ClickStay
	},
	".input":{
		//"alt enter":EnterLine, or dispatch event (enter?)
		//"shift enter":EnterLine,		"escape":CloseCurrentDatapack,
		"escape":CloseCurrentDatapack,
		"ctrl w":CloseCurrentDatapack,
		"enter":FocusNext,
		"ctrl enter":SubmitCurrentDatapack,
		"tab":FocusNext,
		"shift tab":FocusPrev
	},
	".gif":{
		"space":PlayPauseGif,
		"enter":PlayPauseGif,
		// "X":PlayPauseGif
	}
	}
}

Contextual=function(){
	if(!Contextual.shortcuts)
		return Contextual.shortcuts=ContextualDefaultShortcuts();
	else
		return Contextual.shortcuts;
}


//Context finding
Context=function(targetSelector){
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

ElementContext=function(targetSelector){
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

ContextBlocker=function(e){
	return FocusableInput(e)||Classed(e,"window");
}

SubContext=function(elem){
	Contextual();
	var keyActions=FindFirstMatch(Contextual.shortcuts,elem);
	if(keyActions)
		return UpdateKeysObject(keyActions,ComboKeystring);
	else
		return undefined;
}


//Add Shortcuts
OverwriteShortcuts=function(selector,keyActions){
	var keyActions=UpdateKeysObject(Clone(keyActions),ComboKeystring);
	Contextual();
	if(!Contextual.shortcuts[selector])
		Contextual.shortcuts[selector]=keyActions;
	else
		Contextual.shortcuts[selector]=FuseObjects(keyActions,UpdateKeysObject(Contextual.shortcuts[selector],ComboKeystring));

	return Contextual.shortcuts[selector];
}

DeleteShortcuts=function(selector){
	Contextual();
	if(Contextual.shortcuts[selector])
		delete Contextual.shortcuts[selector];
	return Contextual.shortcuts;
}



///////////////////////////////////////////////////////////////////////////////
//Keyboard input
UnCtrlKeyString=function(keystring){
	return keystring.replace(/co?n?tro?l/i,"").replace(/co?mm?a?n?d/i,"");
}
UnShiftKeyString=function(keystring){
	return keystring.replace(/sh?i?ft?/i,"");
}
UnAltKeyString=function(keystring){
	return keystring.replace(/alt/i,"");
}
UnEnterKeyString=function(keystring){
	return keystring.replace(/ente?r/i,"").replace(/re?tu?rn/i,"");
}


UnSpaceKeyString=function(keystring){
	return keystring.replace(/spa?ce?b?a?r?/i,"");
}

CtrlKey=function(keystring){
	return keystring!==UnCtrlKeyString(keystring);
}
ShiftKey=function(keystring){
	return keystring!==UnShiftKeyString(keystring);
}
AltKey=function(keystring){
	return keystring!==UnAltKeyString(keystring);
}
EnterKey=function(keystring){
	return keystring!==UnEnterKeyString(keystring);
}
SpaceKey=function(keystring){
	return keystring!==UnSpaceKeyString(keystring);
}


//Canonical Keystring Combo
EventKeystring=function(event){
	var keystring=
	(event.ctrlKey? "ctrl " :"")+
	(event.altKey?  "alt "  :"")+
	(event.shiftKey?"shift ":"")+
	KeyNumberLookup(event.keyCode);
	return ComboKeystring(keystring);
}

ComboKeystring=function(key){
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

KeyNumberLookup=function(keynumber){
	var keyCodes=KeyCodes();
	for(var i in keyCodes){
		if(keyCodes[i]===keynumber)
			return i;
	}
	//console.log("no key for number:",keynumber);
	return "";
}

KeyCodes=function(){
	return{
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
}


//Key Capturing
CaptureComboKey=function(event){
	event=event||window.event;
	var keystring=EventKeystring(event);
	var context=Context();
	if(In(context,keystring)){
		event.preventDefault();
		context[keystring](event);
	}
}

//Key Capturing Setters
StopCapturingKeys=function(OnKeyDown){
	document.removeEventListener('keydown',OnKeyDown); // TODO improve
}
ResumeCapturingKeys=function(OnKeyDown){ // TODO improve
	StopCapturingKeys(OnKeyDown);
	document.addEventListener('keydown',OnKeyDown);
}

//Datapack Integration
SetDatapackShortcuts=function(DP){
	return OverwriteShortcuts("#"+DP.qid,DP.shortcutExtras);
}
 


///////////////////////////////////////////////////////////////////////////////
// Time-based functions

AutoRepeat=function(RepeatF,delay,name){
	var name=name||FunctionName(RepeatF);
	clearTimeout(AutoRepeat[name]);
	AutoRepeat[name]=setTimeout(function(){
		RepeatF();
		AutoRepeat(RepeatF,delay,name);
	},delay);
}

AutoStop=function(RepeatF,delay,name){
	var name=name||FunctionName(RepeatF);
	clearTimeout(AutoRepeat[name]);
	setTimeout(function(){
		clearTimeout(AutoRepeat[name]);
	},delay);
}

Monitor=function(MonitorF,delay,DisplayF){
	var DisplayF=DisplayF?DisplayF:console.log;
	function M(){
		DisplayF(MonitorF());
	}
	AutoRepeat(M,delay);
}


//Prevent execution unless time cooldown exceeded, in ms
Throttle=function(F,cooldown,name){
	var name=name||FunctionName(F);
	if(!Throttle[name]||Date.now()-Throttle[name]>=cooldown){
		Throttle[name]=Date.now();
		return F();
	}
	return false;
}

//Delay execution until certain condition is met
DelayUntil=function(Condition,F,i){
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
Once=function(F,name){
	var name=name||FunctionName(F);
	if(!Once[name]){
		Once[name]=true;
		return F();
	}
	return false;
}

//Schedule and UnSchedule

Schedule=function(actionF,time,queueName){
	if(!Schedule[queueName])
		Schedule[queueName]={};
	var id=setTimeout(actionF,time);
	Schedule[queueName][time]=id;
}

UnSchedule=function(unactionF,time,queueName){
	if(!Schedule[queueName]||!Schedule[queueName][time])
		return;
	unactionF();
	UnScheduleF(queueName)(time);
}

UnScheduleF=function(queueName){
	return function(time){clearTimeout(time);delete Schedule[queueName][time];};
}

UnScheduleAll=function(queueName){
	if(!Schedule[queueName])
		return;
	MapObject(Schedule[queueName],UnScheduleF(queueName))
	delete Schedule[queueName];
}


//Schedule Sequences of Actions
function SequenceSchedule(Obj){
	
	var steps=Obj.steps||0;
	var interval=Obj.interval||500;

	var Iterator=Obj.Iterator||Identity;
	var Starter=Obj.Starter||Identity;
	var Ender=Obj.Ender||Identity;

	var endwait=Obj.endDelay||0;
	var stawait=Obj.startDelay||0;

	var name=Obj.id||GenerateId();

	if(!SequenceSchedule[name])
		SequenceSchedule[name]=[];

	function ScheduleAnim(i,startTime){
		var expectedTime=startTime+stawait+interval*i+(i===steps?endwait:0);
		ScheduleAnim.delay=0;
		
		function TimedIterator(){
			var actualTime=Date.now();
			ScheduleAnim.delay=Max(actualTime-expectedTime,0);
			
			var t=setTimeout(i!==steps?Iterator(i):Ender,ScheduleAnim.delay);
			SequenceSchedule[name].push(t);
		}

		var T=setTimeout(TimedIterator,+stawait+interval*i+(i===steps?endwait:0));
		SequenceSchedule[name].push(T);
	}

	Starter();
	var startTime=Date.now();

	var buffer=interval-startTime%interval;
	var phase=Obj.phase||0;
		startTime=startTime+buffer+Round(phase*interval);
	
	for(var i=0;i<=steps;i=i+1){ScheduleAnim(i,startTime)};
}

function ScheduleList(name){
	return SequenceSchedule[name]||[];
}

function ClearSchedule(name){
	if(SequenceSchedule[name]){
		SequenceSchedule[name].map(clearTimeout);
		SequenceSchedule[name]=[];
	}
}


function Kinemate(Objs){
	var actions=Clone(Objs);

	function Chain(PrevEnder,ThisAction){
		return function(){
			PrevEnder();
			SequenceSchedule(ThisAction);
		}
	}

	for(var j=actions.length-1;j>0;j--){
		actions[j-1].Ender=Chain(Objs[j-1].Ender||Identity,actions[j]);
	}
	
	var FinalEnder=actions[actions.length-1].Ender||Identity;
	actions[actions.length-1].Ender=function(){
		FinalEnder();
		// Kinemate.running=false;
	}
	
	SequenceSchedule(actions[0]);
}

///////////////////////////////////////////////////////////////////////////////
// Cycle

ArrayHash=function(array){
	return "hash"+JSON.stringify(array).replace(/[^\w]|\d/g,"");
}

CyclePosition=function(array){
	var arrayhash=ArrayHash(array);
	if(!Cycle.hashArray||!In(Cycle.hashArray,arrayhash))
		return 0;
	else
		return Cycle.hashArray[arrayhash];
}

Cycle=function(array,n,bounded){
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

CycleStay=function(array){
	return Cycle(array,0);
}

CycleNext=function(array){
	return Cycle(array,1);
}

CyclePrev=function(array){
	return Cycle(array,-1);
}

CycleNextBounded=function(array){
	return Cycle(array,1,true);
}

CyclePrevBounded=function(array){
	return Cycle(array,-1,true);
}


///////////////////////////////////////////////////////////////////////////////
//Image
ImageExtensions=function(){
	return ["apng","bmp","gif","ico","cur","jpg","jpeg","jfif","pjpeg","pjp","png","svg","tif","tiff","webp"];
}

LoadImage=function(fullpath,parentIDsel){

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

IsImageReference=function(ref){
	return ImageExtensions().some(function(ext){return Posfixed(ref,"."+ext)});
}

//GIF Pause Support
IsGif=function(ref){
	return Posfixed(ref,".gif");
}

StartGIF=function(gid){
	var g=GetElement(gid);

	RemoveElement(GetElementIn("CANVAS",g.parentElement));
	var c=AddElement("<canvas class='gif gifcanvas' tabindex='0'></canvas>",g.parentElement);

	HideElement(g);
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

PlayGif=function(c,gid){
	return function(){
		var g=GetElement(gid);
		function SG(){
			return StartGIF(gid)
		}
		StartGIF.e=g;
		ListenOnce('click',SG,g);
		UnHideElement(g);
		HideElement(c);
	}
}

PlayPauseGif=function(){
	if(StartGIF.e)
		StartGIF.e.click();
}

///////////////////////////////////////////////////////////////////////////////
// Canvas Drawing

GetContext=function(targetIDsel){
	var targetIDsel=targetIDsel||"CANVAS";
	return GetElement(targetIDsel).getContext("2d");
}

DrawImage=function(txtObj){
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

DrawPolygon=function(txtObj){
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

Accumulate=function(acc,val){return acc+val};



///////////////////////////////////////////////////////////////////////////////
// Dates

Today=function(){return new Date()};

Month=function(date){
	var date=date||Today();
	return Number(date.toLocaleDateString().replace(/(\d)*\//,"").replace(/\/(\d)*/,""));
};

Shorten3=function(name){
	return name.slice(0,3);
}

Months=function(){
	return ["January","February","March","April","May","June","July","August","September","October","November","December"];
}
MonthsShort=function(){
	return Months().map(Shorten3);
}
DayNames=function(){
	return ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
}
DayNamesShort=function(){
	return DayNames().map(Shorten3);
}


DayName=function(n,dayNamesArray){
	var dayNamesArray=dayNamesArray||DayNames();
	return dayNamesArray[n];
}

MonthName=function(n,monthArray){
	return monthArray[n-1];
}

Year=function(date){
	var date=date||Today();
	return date.getFullYear();
}
Month=function(date){
	var date=date||Today();
	return date.getMonth()+1;
}
Day=function(date){
	var date=date||Today();
	return date.getDate();
}
DayST=function(day){
	st=(day===1||day===21||day===31)?"st":(day===2||day===22)?"nd":(day===3||day===23)?"rd":"th";
	return st;
}
WeekDay=function(date,dayNamesArray){
	var date=date||Today();
	var dayNamesArray=dayNamesArray||DayNames();
	return DayName(date.getDay(),dayNamesArray);
}

Days=function(date1,date2){
	var date2=date2||Today();
	return (date2-date1)/1000/60/60/24
};

DaysSortF=function(date1,date2){
	var d=Days(date1,date2);
	return d>0?1:d<0?-1:0;
};

DateDate=function(day,month,year){
	if(typeof day==="undefined")
		return Today();
	return 	new Date(Number(year),Number(month)-1,Number(day));
}

YearsString=function(start,end){
	if(start<end)
		return start+"-"+end;
	else if(end<start)
		return end+"-"+start;
	else
		return start;
}

DateNamer=function(date){
	if(!date)
		return DateNamer(Today());
	return `${WeekDay(date,DayNames())}, ${Day(date)}<sup>${DayST(Day(date))}</sup> of ${MonthName(Month(date),Months())} ${Year(date)}`;
}

DateRSS=function(date){
	if(!date)
		return DateRSS(Today());
	return `${WeekDay(date,DayNamesShort())}, ${Day(date)} ${MonthName(Month(date),MonthsShort())} ${Year(date)}`;
}

DateName=function(day,month,year){
	date=DateDate(day,month,year);
	return DateNamer(date);
}

///////////////////////////////////////////////////////////////////////////////
// Range, in different order
Range=function(min,max){
	if(typeof max==="undefined")
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

PropertyF=function(propertyName){
	return function(obj){return obj[propertyName];}
}

PropertyEqualsF=function(propertyName,propertyValue){
	return function(obj){return obj[propertyName]===propertyValue;};
}




///////////////////////////////////////////////////////////////////////////////
// Banner Typewriter Effect
MaxCharacters=function(e){
	var width=Number(UnPosfix(getComputedStyle(e).getPropertyValue("width"),"px"));
	var fontwidth=Number(UnPosfix(getComputedStyle(e).getPropertyValue("font-size"),"px"));
	return Quotient(width,fontwidth);
}

BannerEffect=function(parentElement,txt,maxchars,duration){
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

CancelBannerEffectF=function(parentElement,originaltext,queuename){
	return function(){
		ReplaceChildren(originaltext,parentElement);
		TypewriterBanner["running"]=false;
		UnScheduleAll(queuename);
	}
}


TypewriterBanner=function(thi,txt,queuename){
	if(!TypewriterBanner["running"]&&!TypewriterBanner["blocked-"+queuename]){
		TypewriterBanner["planned-"+queuename]=setTimeout(function(){Once(function(){
			BannerEffect(thi,txt)},txt);
			//console.log("plan","planned-"+queuename);
			TypewriterBanner["planned-"+queuename]=false;
		},750);
	}
}

CancelTypewriterBanner=function(thi,originaltext,queuename){
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

var StringSymbols={
	"music":"♫",
	"more":"+",
	"scroll-up":"▵",
	"space":" ",	//keyboard useful
	"dot":".",		//keyboard useful
	"dash":"-",		//keyboard useful
	"loz":"◊",
	"left":"◀",
	"up":"▲",
	"right":"▶",
	"down":"▼",
	"star":"★",
	"asterisk-heavy":"✲",
	"star-empty":"☆",
	"search":"⌕",
	"cmd":"⌘",
	"opt":"⌥",
	"shift":"⇧",
	"tab":"↹",
	"interpunkt":"·",
	"close":"×"
};

var Icons={
	"left":	{path:"M 5 8 L 5 9 L 0 5 L 5 1 L 5 2 L 3 5 Z M 4 5 L 5 6 L 10 5 L 5 4 Z",vbmax:"10 10"},
	"up":	{primitive:"left",transform:"rotate-270"},
	"right":{primitive:"left",transform:"flip-horizontal"},
	"down":	{primitive:"left",transform:"rotate-90"},

	"cursor":{path:" M 10 0 L 2 30 L 8 29 L 9 40 L 11 40 L 12 29 L 18 30 Z",vbmin:"-10 -10",vbmax:"40 40"},
	"hand":{path:"M 7 25 Q 6 0 9 0 Q 12 0 12 3 L 12 20 Q 12 17 15 17 Q 18 17 18 22 Q 18 18 21 18 Q 24 18 24 24 Q 24 21 26 21 Q 28 21 28 30 Q 27 39 17 40 Q 8 41 6 37 Q -1 23 1 17 Q 3 13 6 22 Z",vbmin:"-10 -10",vbmax:"40 40"},
	
	"tap"	:{primitive:"hand",path:"M 6 10 Q 0 10 0 0 Q 0 -10 10 -10 Q 20 -10 20 0 Q 20 10 13 10 L 13 9 Q 19 9 19 0 Q 19 -9 10 -9 Q 1 -9 1 0 Q 1 9 6 9 Z",vbmax:"50 50"},
	"swipeleft"	:{primitive:"hand",path:"M 6 10 Q 0 10 0 0 Q 0 -7 13 -6 Q 46 0 38 2 Q 18 2 13 10 L 13 9 Q 17 1 38 1 Q 42 0 13 -5 Q 4 -5 3 0 Q 2 8 6 9 Z",vbmax:"50 50"},
	"swipeup":{primitive:"swipeleft",transform:"rotate-270"},
	"swiperight":{primitive:"swipeleft",transform:"flip-horizontal"},
	"swipedown":{primitive:"swipeleft",transform:"rotate-90"},

	"mouseclick":{primitive:"cursor",path:"M 6 10 Q 0 10 0 0 Q 0 -10 10 -10 Q 20 -10 20 0 Q 20 10 13 10 L 13 9 Q 19 9 19 0 Q 19 -9 10 -9 Q 1 -9 1 0 Q 1 9 6 9 Z",vbmax:"50 50"},

	"enter":{path:"M 7 6 L 7 0 L 9 0 L 9 8 L 4 8 L 4 10 L 0 7 L 4 4 L 4 6 Z",vbmax:"10 10"},
	"backsp":{path:"M 4 15 L 10 23 L 28 23 L 28 7 L 10 7 L 8 5 L 30 5 L 30 25 L 8 25 L 0 15 L 8 5 L 10 7 Z M 22 21 L 24 19 L 20 15 L 24 11 L 22 9 L 18 13 L 14 9 L 12 11 L 16 15 L 12 19 L 14 21 L 18 17 Z",vbmax:"30 30"},
	"delete":{primitive:"backsp",transform:"flip-horizontal"},

	"how-to-play":{path:"M 18 1 C 10 1 7 7 9 14 C 9 14 13 13 13 13 C 12 8 14 5 18 5 C 23 5 25 12 19 15 C 15 17 14 19 13 24 L 17 25 C 18 21 18 19 21 18 C 30 15 29 1 18 1 Z M 14 28 C 9 28 9 35 14 35 C 19 35 19 28 14 28 Z",vbmax:"36 36"},
	"credits":{path:"M 7 1 Q 13 1 13 7 Q 13 13 7 13 Q 1 13 1 7 Q 1 1 7 1 L 7 2 Q 2 2 2 7 Q 2 12 7 12 Q 9 12 11 10 L 9 8 Q 8 9 7 9 Q 5 9 5 7 Q 5 5 7 5 Q 8 5 9 6 L 11 4 Q 9 2 7 2 Z",vbmax:"14 14"},
	"undo":{path:"M 106 149 L 58 127 L 85 242 L 194 192 L 152 170 C 240 56 333 138 346 248 L 394 246 C 377 59 215 7 106 149",vbmin:"0 -50"},
	"redo":{primitive:"undo",transform:"flip-horizontal"},
	"restart":{path:"M 180 90 L 252 188 L 264 145 C 348 211 307 320 225 340 C 144 360 40 267 129 139 L 92 118 C -23 262 110 418 238 384 C 370 350 398 174 277 98 L 291 42 Z"},
	"fullscreen":{path:"M 236 85 L 309 85 L 309 154 L 346 154 L 346 48 L 236 48 L 236 85 M 38 200 L 75 200 L 75 121 L 148 121 L 148 84 L 38 84 L 38 200 M 38 363 L 148 363 L 148 326 L 75 326 L 75 253 L 38 253 L 38 363 M 272 326 L 199 326 L 199 363 L 309 363 L 309 253 L 272 253 L 272 326"},
	"save":{path:"M 0 0 L 0 23 L 23 23 L 23 0 Z M 6 1 L 6 8 L 20 8 L 20 1 L 22 1 L 22 22 L 20 22 L 20 11 L 3 11 L 3 22 L 1 22 L 1 1 Z M 14 1 L 14 6 L 16 6 L 16 1 L 19 1 L 19 7 L 7 7 L 7 1 Z M 19 12 L 19 22 L 4 22 L 4 12 Z M 6 13 L 6 15 L 17 15 L 17 13 Z M 6 16 L 6 18 L 17 18 L 17 16 Z M 6 20 L 6 21 L 17 21 L 17 19 L 6 19",vbmax:"24 24"},
	"feedback":{path:"M 7 139 L 7 274 L 393 274 L 393 4 L 7 4 L 7 139 M 301 42 L 198 146 L 94 41 L 301 41 M 355 41 L 355 237 L 44 237 L 44 47 L 197 200 L 355 42 M 58 307 L 58 379 L 95 379 L 95 307 L 58 307 M 305 307 L 304 379 L 341 379 L 341 307 L 304 307 M 181 337 L 181 392 L 218 392 L 218 337 L 181 337"},
	"hint":{path:"M 327 36 L 152 207 C 128 190 88 188 59 203 C -16 240 -8 352 71 379 C 153 406 225 319 181 235 L 228 188 L 252 211 L 279 185 L 255 161 L 278 139 L 316 177 L 343 150 L 308 117 L 332 93 L 366 127 L 393 100 L 327 37 M 118 234 C 162 248 172 305 136 333 C 100 363 44 336 44 288 C 44 250 82 222 118 234"},
	"keyboard":{path:"M 0 88 L 0 177 200 177 L 400 177 400 88 L 400 0 200 0 L 0 0 0 88 M384 88 L 384 161 200 161 L 15 161 15 88 L 15 15 200 15 L 384 15 384 88 M30 41 L 30 53 42 53 L 55 53 55 41 L 55 29 42 29 L 30 29 30 41 M69 41 L 69 53 81 53 L 94 53 94 41 L 94 29 81 29 L 69 29 69 41 M108 41 L 108 53 121 53 L 133 53 133 41 L 133 29 121 29 L 108 29 108 41 M148 41 L 148 53 160 53 L 173 53 173 41 L 173 29 160 29 L 148 29 148 41 M187 41 L 187 53 199 53 L 212 53 212 41 L 212 29 199 29 L 187 29 187 41 M226 41 L 226 53 239 53 L 251 53 251 41 L 251 29 239 29 L 226 29 226 41 M266 41 L 266 53 278 53 L 291 53 291 41 L 291 29 278 29 L 266 29 266 41 M305 41 L 305 53 317 53 L 330 53 330 41 L 330 29 317 29 L 305 29 305 41 M344 41 L 344 53 357 53 L 369 53 369 41 L 369 29 357 29 L 344 29 344 41 M30 87 L 30 98 42 98 L 55 98 55 87 L 55 75 42 75 L 30 75 30 87 M69 87 L 69 98 81 98 L 94 98 94 87 L 94 75 81 75 L 69 75 69 87 M108 87 L 108 98 121 98 L 133 98 133 87 L 133 75 121 75 L 108 75 108 87 M148 87 L 148 98 160 98 L 173 98 173 87 L 173 75 160 75 L 148 75 148 87 M187 87 L 187 98 199 98 L 212 98 212 87 L 212 75 199 75 L 187 75 187 87 M226 87 L 226 98 239 98 L 251 98 251 87 L 251 75 239 75 L 226 75 226 87 M266 87 L 266 98 278 98 L 291 98 291 87 L 291 75 278 75 L 266 75 266 87 M305 87 L 305 98 317 98 L 330 98 330 87 L 330 75 317 75 L 305 75 305 87 M344 87 L 344 98 357 98 L 369 98 369 87 L 369 75 357 75 L 344 75 344 87 M30 134 L 30 147 53 147 L 77 147 77 134 L 77 121 53 121 L 30 121 30 134 M93 134 L 93 147 200 147 L 307 147 307 134 L 307 121 200 121 L 93 121 93 134 M322 134 L 322 147 346 147 L 369 147 369 134 L 369 121 346 121 L 322 121 322 134",vbmax:"400 180"},
	"wrench":{path:"M 20 1 L 14 4 L 14 13 L 1 27 L 3 29 L 17 16 L 26 16 L 29 10 L 27 10 L 24 13 L 19 13 L 17 11 L 17 6 L 20 3 Z",vbmax:"30 30"},
	"edit":{path:"M 326 10 L 85 252 L 151 317 L 392 75 L 327 10 M 339 75 L 151 263 L 139 252 L 327 64 L 339 75 M 81 257 L 21 383 L 145 321 L 81 257"},

	"sun":{path:"M 14 10 Q 14 6 10 6 Q 6 6 6 10 Q 6 14 10 14 Q 14 14 14 10 Z M 11 0 L 11 4 L 9 4 L 9 0 Z M 11 20 L 11 16 L 9 16 L 9 20 Z M 20 11 L 16 11 L 16 9 L 20 9 Z M 0 11 L 4 11 L 4 9 L 0 9 M 3 2 L 6 5 L 5 6 L 2 3 Z M 20 11 L 16 11 L 16 9 L 20 9 M 17 2 L 14 5 L 15 6 L 18 3 Z M 17 18 L 14 15 L 15 14 L 18 17 Z M 3 18 L 6 15 L 5 14 L 2 17 Z",vbmax:"20 20"},
	"moon":{path:"M 3 10 Q 3 0 16 0 Q 10 1 8 6 Q 6 10 8 14 Q 10 19 16 20 Q 3 20 3 10",vbmax:"20 20"},

	"eye":{path:"M 32 21 L 32 32 L 36 22 Q 41 23 41 30 Q 41 39 32 39 Q 23 39 23 30 Q 23 21 32 21 M 39 16 Q 46 18 47 30 Q 46 44 32 45 Q 18 44 17 30 Q 18 16 32 15 L 32 16 Q 19 17 18 30 Q 19 43 32 44 Q 45 43 46 30 Q 45 19 38 17 L 39 16 M 32 11 Q 52 11 64 30 Q 52 49 32 49 Q 13 49 0 30 Q 12 11 32 11 L 32 15 Q 14 15 5 30 Q 14 45 32 45 Q 50 45 59 30 Q 50 15 32 15 Z",vbmax:"65 65"},//"👁",
	"magnifying-glass":{path:"M 1 24 L 3 26 L 11 18 L 12 16 Q 19 20 24 14 Q 28 8 23 3 Q 16 -2 11 4 Q 6 9 11 15 M 11 15 L 9 16 L 1 24 M 13 15 Q 8 10 12 5 Q 17 0 22 4 Q 26 8 23 13 Q 18 18 13 15 M 14 13 Q 19 15 22 11 Q 19 14 14 13",vbmax:"27 27"},//"Ϙ"//"⚲",
    "book":{path:"M 10 26 L 10 90 Q 40 80 50 90 Q 60 80 90 90 L 90 26 Q 63 13 50 23 Q 36 13 10 26 M 15 25 Q 35 15 50 25 Q 65 15 85 25 L 85 87 Q 65 78 50 87 Q 35 78 15 87 L 15 25 M 15 75 Q 25 69 50 77 Q 75 70 85 75 L 85 78 Q 72 72 50 80 Q 28 71 15 78 L 15 75 M 15 80 Q 29 74 50 82 Q 71 75 85 80 L 85 85 Q 70 77 50 85 Q 30 77 15 85 L 15 78 M 49 25 L 49 76 L 50 77 L 50 26 L 49 25",vbmax:"100 100"},//"🕮"

	"body-arm-left-down":{path:"M 5 7 L 5 3 Q 3 3 2 4 Q 1 5 1 6 Q 1 8 3 5 Q 3 7 4 7 Z",vbmax:"10 10"},
	"body-arm-left-up":{path:"M 5 7 L 5 3 Q 4 3 3 3 Q 1 0 1 2 Q 1 3 3 5 Q 3 7 4 7 Z",vbmax:"10 10"},
	"body-leg-left-down":{path:"M 5 7 L 5 8 Q 5 10 4 10 Q 3 10 4 7 Z",vbmax:"10 10"},
	"body-leg-left-up":{path:"M 5 7 L 5 8 Q 3 9 2 8 Q 1 7 4 7 Z",vbmax:"10 10"},
	"body-head":{path:"M 5 0 Q 3 0 3 2 Q 3 4 5 4 Q 7 4 7 2 Q 7 0 5 0 Z",vbmax:"10 10"},

	"human-hello":{primitive:["body-head","body-arm-left-up","body-leg-left-up"]}
}

var MacKeys={
	"ctrl":"cmd",
	"alt":"opt"
}

StringSymbol=function(name){
	return DictionaryAccesser(StringSymbols)(name);
}

var SymbolsNames=FlipKeysValues(StringSymbols);

SymbolName=function(symbol){
	return DictionaryAccesser(SymbolsNames)(symbol)
}

ElementSymbolName=function(e){
	var n=Keys(Symbols).filter(name=>(SymbolName(e.innerHTML)===NewNode("<span>"+SymbolIcon(name)+"</span>").innerHTML));
	if(n.length)
		return n[0];
}

SymbolIcon=function(name){
	var name=SymbolName(StringSymbol(name));
	var symbolObj=DictionaryAccesser(Icons)(name);
	
	if(symbolObj===name)
		return name;
	
	var primitive=symbolObj.primitive?SymbolIcon(symbolObj.primitive):{};
	if(primitive.path){
		var derivative=primitive.path+" "+symbolObj.path||"";
		delete derivative["primitive"]; //stop copying forever
		return {...primitive,...symbolObj,path:derivative};
	}
	else
		return {...primitive,...symbolObj};
}

ObtainSymbol=function(name){
	var i=SymbolIcon(StringSymbol(name));
	if(i===name||i===StringSymbol(name))
		return StringSymbol(name);
	else{
		i.name=name;//name the icon in a class
		if(ObtainSymbol[name])
			return ObtainSymbol[name];
		return ObtainSymbol[name]=IconHTML(i);
	}
}

IconName=function(iconElement){
	var names=iconElement.classList.filter(c=>Prefixed(c,"icon-"));
	if(names.length)
		return UnPrefix(names[0],"icon-");
}

//SVG Path Parsing
SVGSpacePattern="\\s+";
SVGNumberPattern="\\-?\\d+(?:\\.\\d)*";
SVGPairPattern=SVGNumberPattern+SVGSpacePattern+SVGNumberPattern+SVGSpacePattern;
var SVGLetterPattern={
	0:"Z",
	1:"(?:V|H)",
	2:"(?:L|M|T)",
	4:"(?:Q|S)",
	6:"C",
	7:"A"
}
function SVGLinePattern(n){
	if(In(SVGLetterPattern,String(n)))
		return "(?:("+SVGLetterPattern[n]+")"+SVGSpacePattern+"("+(SVGNumberPattern+SVGSpacePattern).repeat(n)+"))";
	else
		return false;
}

function SVGPattern(){
	var fullpattern=Keys(SVGLetterPattern).map(SVGLinePattern);
		fullpattern=fullpattern.map(p=>"(?:"+p+")").join("|");
	return fullpattern;
}

function SVGPathSplit(path){
	var pattern=new RegExp(SVGPattern(),"g");
	return (path+" ").match(pattern);
}

function SVGLinePairs(svgline){ //misses odd number off coords
	var pairs=(svgline+" ").match(new RegExp(SVGPairPattern,"g"));
		pairs=pairs.map(pair=>pair.match(new RegExp(SVGNumberPattern,"g")));
		pairs=pairs.map(pair=>pair.map(Number));
	return pairs;
}

function SVGLineApply(svgline,CoordinatesF){
	var svgline=svgline.trim();
	var linetype=First(svgline);
	var xyArray=Rest(svgline);
	if(xyArray){
		xyArray=SVGLinePairs(xyArray);
		xyArray=xyArray.map(CoordinatesF);
		xyArray=xyArray.flat().join(" ");
	}
	return linetype+" "+xyArray+" ";
}

function SVGPathApply(path,CoordinatesF){
	var svglineArray=SVGPathSplit(path);
	return svglineArray.map(svgline=>SVGLineApply(svgline,CoordinatesF)).join("");
}

function ViewboxCoordinates(viewbox){
	return viewbox.split(new RegExp(SVGSpacePattern,"g")).map(Number);
}

function FlipN(x,min,max){
	var xdelta=(max-min)/2;
	var xcentre=max-xdelta;
	return -(x-xcentre)+xcentre;
}

function RotateXY(x,y,xmin,ymin,xmax,ymax,wise){
	var xdelta=(xmax-xmin)/2;
	var xcentre=xmax-xdelta;
	var ydelta=(ymax-ymin)/2;
	var ycentre=ymax-ydelta;
	var wise=wise?1:-1;
	return [-(y-ycentre)*wise+xcentre,(x-xcentre)*(-wise)+ycentre];
}

var SVGTransforms={
	"flip-horizontal":(x,y,vbArray)=>[FlipN(x,vbArray[0],vbArray[2]),y],
	"flip-vertical":(x,y,vbArray)=>[x,FlipN(y,vbArray[1],vbArray[3])],
	"flip-both":(x,y,vbArray)=>[FlipN(x,vbArray[0],vbArray[2]),FlipN(y,vbArray[1],vbArray[3])],
	"rotate-90":(x,y,vbArray)=>RotateXY(x,y,vbArray[0],vbArray[1],vbArray[2],vbArray[3],true),
	"rotate-270":(x,y,vbArray)=>RotateXY(x,y,vbArray[0],vbArray[1],vbArray[2],vbArray[3],false)
}

function SVGPathTransform(path,name,viewbox){
	if(!In(SVGTransforms,name))
		return path;

	var T=SVGTransforms[name];
	var viewboxArray=ViewboxCoordinates(viewbox);
	
	function SVGCoordinatesF(xy){
		return T(xy[0],xy[1],viewboxArray)
	}

	return SVGPathApply(path,SVGCoordinatesF);
}



//Keyboard Keys Description
// 0: multiple actions
// 1: symbols explained
// 2: key combos
// 3: symbols per key, or text
// 4: mac vs win variants
// 5: keyboard wrapper

//5
KBDPureHTML=function(key){
	return `<kbd data-key="${key}">${key}</kbd>`;
}

//4+3
KBDSymbol=function(key){
	var mac="";
	if(In(MacKeys,key))
		mac=" / "+ObtainSymbol(MacKeys[key]);
	return ObtainSymbol(key)+mac;
}

//2
KBDCombo=function(keystring){
	return ComboKeystring(keystring).split(" ");
}

//All

KBDHTML=function(keystring){
	var combo=KBDCombo(keystring);
	var	keys=combo.map(KBDSymbol);
		keys=keys.map(KBDPureHTML);
	return keys.join("")+ExplainCombo(combo);
}

ExplainCombo=function(combo){
	if(combo.some(KeyExplainable)){
		var explanation=combo.map(ExplainKey).join("+");
		return " "+Parenthise(explanation);
	}
	else
		return "";
}

KeyExplainable=function(key){
	return key!==ObtainSymbol(key);
}

ExplainKey=function(key){
	return DictionaryAccesser(KeyExplanations)(key);
}

var KeyExplanations={
	"swipeleft":"swipe left",
	"swipeup":"swipe up",
	"swiperight":"swipe right",
	"swipedown":"swipe down",
	"backsp":"backspace",
	"mouseclick":"click"
}


KB=function(string,Opts){
	var Opts=Opts||{};
	var options=DictionaryAccesser(TypeSwipeKeys,EnArray)(string);
	return Enumerate(options.map(o=>KBDHTML(o,Opts)),"or");
}

var TypeSwipeKeys={
	"click":["tap","mouseclick"],
	"previous":["swipeleft","shift tab"],
	"next":["swiperight","tab"]
}


///////////////////////////////////////////////////////////////////////////////
//Dynamic text

Hypertexts={};

Hypertext=function(name,text){
	if(typeof text==="undefined"){
		if(typeof Hypertexts[name]==="undefined"){
			ListenOnce("hypertext-"+name,function(){ReplaceElement(Hypertexts[name],id)});
			var id=GenerateId();
			return `<span class="hypertext" id="${id}" data="${name}">Loading <em>${name}</em>...</span>`;
		}else
			return Hypertexts[name];
	}
	else{
		Hypertexts[name]=text;
		Shout("hypertext-"+name);
		return text;
	}
}

DynamicTextHTML=function(label,text){
	var label=Prefix(label,"dynamic-");
	return `<span class="${label}">
					${text||"[------updating...---]"}
			</span>`;
}

DynamicText=function(label,text){
	if(!label||NodejsDetected())
		return;
	var label=Prefix(label,"dynamic-");
	if(typeof text==="undefined"){//Getter
		var e=GetElement("."+label);
		if(e)
			return GetElement("."+label).innerText;
		else
			return DynamicTextHTML(label);
	}
	else{//Setter
		var e=DynamicTextHTML(label,text);
		ReplaceElements(e,"."+label);
		return e;
	}
}

Toggler=function(StatusReporterName){
	return function(){
		var status=globalThis[StatusReporterName]();
		if(status){
			globalThis[StatusReporterName]=False;
			Memory(StatusReporterName,False());
		}else{
			globalThis[StatusReporterName]=True;
			Memory(StatusReporterName,True());
		}
		return DynamicText(StatusReporterName,TogglerButtonHTML(StatusReporterName));
	}
}

TogglerButtonHTML=function(StatusReporterName,opts){
	if(!globalThis[StatusReporterName]||typeof globalThis[StatusReporterName]!=="function")
		return DynamicText(StatusReporterName);

	var status=ButtonHTML({
		txt:globalThis[StatusReporterName]()?"active":"inactive",
		attributes:{href:"",onclick:'Toggler("'+StatusReporterName+'")()',class:"inline"}
	});
	
	return DynamicText(StatusReporterName,status);
}


StatusReporter=function(name,DefaultStatusReporter){
	return function(){
		var status=DefaultStatusReporter();
		if(Memory(name)!==null)
			return Memory(name);
		else
			return status;
	}
}

///////////////////////////////////////////////////////////////////////////////
//Patterns
function WallpaperHTML(Opts){
	if(IsString(Opts)){
		var w=Wallpaper(Opts);
		w?Opts=w:{path:Opts}
	}
	
	var path=Opts.path||"M 0 0 L 100 0 L 100 100 Z";

	var name=Opts.name||GenerateId();
	var cla=Opts.class?Opts.class:"";

	var height=Opts.height||Opts.width||"100";
	var width=Opts.width||Opts.height||"100";

	var viewbox=Opts.viewbox||`0 0 ${width} ${height}`;
	
	var scale=Opts.scale||1;

	return `<svg class='wallpaper ${cla}' width="100%" height="100%">
				<pattern id="${name}" x="0" y="0" width="${width*scale}" height="${height*scale}" patternUnits="userSpaceOnUse" viewBox="${viewbox}"> 
					<g>
						<path d="${path}" class="layer"/>
					</g>
				</pattern>
				<rect x="0" y="0" width="100%" height="100%" fill="url(#${name})" />
			</svg>`;
}

function AddWallpaper(patternObj,e){
	AddElement(NewNode(WallpaperHTML(patternObj)),e);
}

function RemoveWallpaper(name,e){
	if(name)
		RemoveElement(GetElement(Prefix(name,"."),e));
	else
		GetElements(".wallpaper",e).map(RemoveElement);
}

var WallpaperPatterns={
	"grid-mini":{path:"M 0 0 L 0 50 L 50 50 L 50 49 L 1 49 L 1 0 Z",width:50,scale:0.1},
	"grid-cross":{path:"M 49 41 L 49 50 L 40 50 L 40 51 L 49 51 L 49 59 L 50 59 L 50 51 L 59 51 L 59 50 L 50 50 L 50 41 Z",width:200,scale:0.25},
	"triangle-5":{path:"M 0 0 L 20 0 L 20 20 Z",width:20},
	//"grid-5":{path:"M 0 0 L 1 0 L 1 7 L 0 7 M 0 8 L 1 8 L 1 9 L 0 9 M 2 9 L 9 9 L 9 8 L 2 8 Z",width:10}
};

function Wallpaper(name){
	if(In(WallpaperPatterns,name)){
		var pattern=WallpaperPatterns[name];
			pattern.class=name;
			return pattern;
	}
	else
		return undefined;
}

///////////////////////////////////////////////////////////////////////////////
//SVG Drawing

SVGHTML=function(opts){
	var x0=opts.x0||0;
	var x1=typeof opts.x1==="undefined"?1:opts.x1;
	var y0=opts.y0||0;
	var y1=typeof opts.y1==="undefined"?1:opts.y1;
	var cla=opts.cla||"";
	return `<svg ${cla?`class="${cla}"`:""} viewbox="${x0} ${y0} ${x1} ${y1}" ></svg>`;
}

SVGLineHTML=function(opts){
	if(opts.horizontal){
		var y0=opts.x0||0;
		var y1=typeof opts.x1==="undefined"?1:opts.x1;
		var x0=opts.y0||0;
		var x1=typeof opts.y1==="undefined"?1:opts.y1;
	}else{//default
		var x0=opts.x0||0;
		var x1=typeof opts.x1==="undefined"?1:opts.x1;
		var y0=opts.y0||0;
		var y1=typeof opts.y1==="undefined"?1:opts.y1;
	}
	var cla=opts.cla||"";
	return `<line ${cla?`class="${cla}"`:""} x1="${x0}" y1="${y0}" x2="${x1}" y2="${y1}"/>`;
}

SVGBarHTML=function(opts){
	var x0=opts.x0||0;
	var x1=typeof opts.x1==="undefined"?1:opts.x1;
	var y0=opts.y0||0;
	var y1=typeof opts.y1==="undefined"?1:opts.y1;
	var width=x1-x0;
	var height=y1-y0;
	var cla=opts.cla||"";
	return `<rect ${cla?`class="${cla}"`:""} x="${x0}" y="${y0}" width="${width}" height="${height}"/>`;
}

SVGTextHTML=function(opts){
	var x0=typeof opts.x0==="undefined"?0:opts.x0;
	var y0=typeof opts.y0==="undefined"?0:opts.y0;
	var cla=opts.cla||"";
	var txt=opts.txt||"";
	var size=opts.size||"";
	return `<text ${cla?`class="${cla}"`:""} x="${x0}" y="${y0}" ${size?`font-size="${size}"`:""}>${txt}</text>`;
}

RefreshSVG=function(svge){// trick to force rerendering
	var svg=GetElement(svge);
	var html=svg.innerHTML;
	svg.innerHTML=" "+html;
}

//Chart Elements

AddChartGridline=function(opts,chart){
	var opts=opts;
	opts.scale=1;
	opts.up=1;
	opts.down=0;
	opts.type="grid";
	AddChartLine(opts,chart);
}

AddChartTick=function(opts,chart){
	var opts=opts;
	opts.scale=0.5;
	opts.up=1/100;
	opts.down=1/100;
	opts.type="tick";
	AddChartLine(opts,chart);
}

AddChartAxis=function(opts,chart){
	var opts=opts;
	opts.scale=1;
	opts.up=0;
	opts.down=0;
	opts.type="axis";
	opts.minor=1;
	opts.major=1;
	AddChartLine(opts,chart);
}

AddChartLine=function(opts,chart){
	var major=typeof opts.major==="undefined"?4:opts.major;
	var minor=typeof opts.minor==="undefined"?5:opts.minor;
	var horizontal=!!opts.horizontal;
	var invert=!!opts.invert;
	var xview=horizontal?GetElement(chart).viewBox.baseVal.width:GetElement(chart).viewBox.baseVal.width;
	var yview=horizontal?GetElement(chart).viewBox.baseVal.height:GetElement(chart).viewBox.baseVal.height;
	xview=xview/1.1;
	yview=yview/1.1;
	var up=typeof opts.up==="undefined"?(1/100):opts.up;
	var down=typeof opts.down==="undefined"?(-1/100):-Abs(opts.down);
	var scale=typeof opts.scale==="undefined"?0.5:opts.scale;
	var type=opts.type;
	for(var i=0;i<=major;i++){
		var I=invert?(major-i):i;
		AddElement(SVGLineHTML({
			x0:Round(I/major*xview,5),
			x1:Round(I/major*xview,5),
			y0:Round(down*yview,5),
			y1:Round(up*yview,5),
			cla:type+" line major "+(horizontal?"y":"x"),
			horizontal:horizontal
		}),chart);

		if(i===major)
			break;

		for(var j=1;j<minor;j++){
			var J=invert?(minor-j):j;
			AddElement(SVGLineHTML({
				x0:Round((I+J/minor)/major*xview,5),
				x1:Round((I+J/minor)/major*xview,5),
				y0:Round(down*yview*scale,5),
				y1:Round(up*yview*scale,5),
				cla:type+" line minor "+(horizontal?"y":"x"),
				horizontal:horizontal
			}),chart);
		}
	}
	RefreshSVG(chart);
}

AddChartAxisLegend=function(opts,chart){
	var major=typeof opts.major==="undefined"?4:opts.major;
	var horizontal=!!opts.horizontal;
	var invert=!!opts.invert;
	var xview=horizontal?GetElement(chart).viewBox.baseVal.width:GetElement(chart).viewBox.baseVal.width;
	var yview=horizontal?GetElement(chart).viewBox.baseVal.height:GetElement(chart).viewBox.baseVal.height;
	xview=xview/1.1;
	yview=yview/1.1;
	var down=typeof opts.down==="undefined"?(-20/100):-Abs(opts.down);
	var right=typeof opts.right==="undefined"?0:opts.right;
	var scale=typeof opts.scale==="undefined"?0.5:opts.scale;
	var type=opts.type;

	var min=typeof opts.min==="undefined"?0:opts.min;
	var max=typeof opts.max==="undefined"?1:opts.max;
	var fontsize=typeof opts.size==="undefined"?xview/20:opts.size;

	for(var i=0;i<=major;i++){
		var I=invert?(major-i):i;
		AddElement(SVGTextHTML({
			x0:horizontal?Round(down*xview*scale,5):Round((I-right)/major*yview,5),
			y0:horizontal?Round((I-right)/major*yview,5):Round(xview-down*xview*scale,5),
			cla:"legend major "+(horizontal?"y":"x"),
			txt:Round((horizontal?(major-I):I)/major*(max-min)+min,1),//todo improve rounding
			size:fontsize,
			horizontal:horizontal
		}),chart);

	}
	RefreshSVG(chart);
}



AddChartLegend=function(opts,chart){
	var horizontal=!!opts.horizontal;
	var xview=horizontal?GetElement(chart).viewBox.baseVal.width:GetElement(chart).viewBox.baseVal.width;
	var yview=horizontal?GetElement(chart).viewBox.baseVal.height:GetElement(chart).viewBox.baseVal.height;
	xview=xview/1.1;
	yview=yview/1.1;

	var fontsize=typeof opts.size==="undefined"?xview/Min(opts.txt.length*1.5,20):opts.size;

	var x=typeof opts.x==="undefined"?(0+xview)/2:opts.x;
	var y=typeof opts.y==="undefined"?(0+yview)/2:opts.y;
	
	AddElement(SVGTextHTML({
		x0:x,
		y0:y,
		txt:opts.txt,
		size:fontsize,
		cla:"legend "+(horizontal?"y":"x")
	}),chart);
}


AddChartBars=function(opts,chart){
	var horizontal=!!opts.horizontal;
	var invert=!!opts.invert;
	var xview=horizontal?GetElement(chart).viewBox.baseVal.width:GetElement(chart).viewBox.baseVal.width;
	var yview=horizontal?GetElement(chart).viewBox.baseVal.height:GetElement(chart).viewBox.baseVal.height;
	xview=xview/1.1;
	yview=yview/1.1;
	
	var values=opts.values;
	var xdivisions=values.length;
	var widthmax=xview/xdivisions;
	var xspacing=(opts.spacing||0)*widthmax/2;
	var ymax=typeof opts.max==="undefined"?Max(values):opts.max;
	var yvalues=values.map(function(v){return v/ymax*yview});
	
	for(var i=0;i<yvalues.length;i++){
		var I=invert?(yvalues.length-i):i;
		if(horizontal)
			AddElement(SVGBarHTML({
				x0:Round(I*widthmax+xspacing,5),
				x1:Round((I+1)*widthmax-xspacing,5),
				y0:Round(yview-yvalues[I],5),
				y1:Round(yview,5),
				cla:"bar"
			}),chart)
		else
			AddElement(SVGBarHTML({
				y0:Round(I*widthmax+xspacing,5),
				y1:Round((I+1)*widthmax-xspacing,5),
				x0:Round(yview-yvalues[I],5),
				x1:Round(yview,5),
				cla:"bar"
			}),chart)
	}
	RefreshSVG(chart)
}

ChartComponents=function(){
		return ["XGridline","YGridline","XAxis","YAxis","XTick","YTick","XLegend","YLegend","XAxisLegend","YAxisLegend","Bar"];
}

AddChartComponent=function(component,opts,chart){

	if(component==="XGridline")
		return AddChartGridline(opts,chart);
	if(component==="YGridline")
		return AddChartGridline(opts,chart);
	if(component==="XAxis")
		return AddChartAxis(opts,chart);
	if(component==="YAxis")
		return AddChartAxis(opts,chart);
	if(component==="XTick")
		return AddChartTick(opts,chart);
	if(component==="YTick")
		return AddChartTick(opts,chart);
	if(component==="Bar")
		return AddChartBars(opts,chart);
	if(component==="XLegend")
		return AddChartLegend(opts,chart);
	if(component==="YLegend")
		return AddChartLegend(opts,chart);
	if(component==="XAxisLegend")
		return AddChartAxisLegend(opts,chart);
	if(component==="YAxisLegend")
		return AddChartAxisLegend(opts,chart);
}

AddChart=function(opts,target){
	var cla=opts.cla||"chart";
	var chart=AddElement(SVGHTML({cla:cla}),target);
	
	ChartComponents().map(function(c){
		if(opts[c]){AddChartComponent(c,opts[c],Prefix(cla,"."))};
	});
	
	chart.viewBox.baseVal.x+=-chart.viewBox.baseVal.width/4;
	chart.viewBox.baseVal.y+=-chart.viewBox.baseVal.height/4;
	chart.viewBox.baseVal.width*=1.25;
	chart.viewBox.baseVal.height*=1.25;

	return chart;
}

//Selects the right display scale - todo improve, for decimal numbers...
ScaleMax=function(max){
	var a=Power(10,Ceiling(Log10(max)));
	var b=a*3/4;
	var c=a*1/2;
	var d=a*1/4;
	return(c>max?(d>max?d:c):(b>max?b:a));
}

///////////////////////////////////////////////////////////////////////////////
//LazyLoader with Intersection Observer

function LazyLoader(target,Loader){
	HearOnce("LazyLoader",function(){LazyLoad(target,Loader)});
}

function LazyLoad(targe,Loader){
	var target=GetElement(targe);
	if(!target)
		return;// console.log("Observer error:",targe);

	var opts={
		root: null,
		rootMargin: "0px",
		threshold: [0]
	};
	
	function HandleInview(obj){
		if(obj[0].isIntersecting===true){
			Loader();
			Observer.disconnect();
		}
	}

	var Observer=new IntersectionObserver(HandleInview,opts);
	Observer.observe(target);

}

LazyImageLoader=function(id,src){
	LazyLoader(id,function(){TriggerImageLoad(id,src)});
}

TriggerImageLoad=function(id,src){
	var img=GetElement(id);
	img.setAttribute("src",src);
}

///////////////////////////////////////////////////////////////////////////////
//Clipboard

CopyHandler = function(Extractor){
	return async function(event){
		if (!navigator.clipboard)
			return;
		var text=Extractor(event.target);
		if(!text)
			return;
		try{
			await navigator.clipboard.writeText(text);
			ConsoleAdd(`"${text}" copied to clipboard!`);
		}
		catch(err){	}
	};
}

function SelectedNode(e){
	var selection=window.getSelection();
	return selection.containsNode(e,true);
}

///////////////////////////////////////////////////////////////////////////////
//Introspection - lists all defined functions!

Introspect=function(){ 
	if(!Introspect.list)
		Introspect.list=[];
	else
		return Introspect.list;


	if(NodejsDetected())
		for (var i in globalThis){
			var f=globalThis[i];
			if(typeof f==="function"&&f.toString().indexOf("native code")==-1){
				Introspect.list.push(f.name);
			}
			if(typeof f==="object"){
				Introspect.list.push(f.name);
			}
		}
	else
		for (var i in globalThis){
			var f=globalThis[i];
			if(typeof f==="function"&&f.toString().indexOf("native code")==-1){
				Introspect.list.push(i);
			}
		}
	
	return Introspect.list;
}

var JavascriptFunctions=["RegExp","Array","Object","Date","String","Number","Set","Math"];


FunctionSourceTokens=function(F){
	if(!F)
		return [];

	var source=F.toString();
	var separator="SecretSePaRaToR"; //must not be confoundable
	var symbols=Tokens().split("").concat([" ","\n","\t","\r"]); //things to ignore

	var tokens=StringReplace(F.toString(),symbols.map(t=>[t,separator])).split(separator);
	tokens=tokens.filter(t=>t&&t[0].toLowerCase()!==t[0])
	tokens=Complement(tokens,JavascriptFunctions);
	
	return tokens;
}

FunctionDirectDependencies=function(F){
	var Fname=IsString(F)?F:FunctionName(F);
	var F=IsString(F)?globalThis[F]:F;

	if(!FunctionDirectDependencies.o)
		FunctionDirectDependencies.o={};

	var dependencies=FunctionDirectDependencies.o;

	if(dependencies[Fname])
		return dependencies[Fname];

	return dependencies[Fname]=FunctionSourceTokens(F);
}

var FunctionDependents={};
AddDependent=function(ascendent,dependent){
	if(!FunctionDependents[ascendent])
		FunctionDependents[ascendent]=[dependent];
	else if(!In(FunctionDependents[ascendent],dependent))
		FunctionDependents[ascendent].push(dependent);
	
	return FunctionDependents[ascendent];
}

FunctionDependencies=function(F){

	var dependencies=FunctionDirectDependencies(F);
	var newd=dependencies.map(FunctionDirectDependencies).flat();
		newd=Complement(newd,dependencies);
		dependencies=Union(newd,dependencies);
	while(newd.length>0){
		newd=newd.map(FunctionDirectDependencies).flat();
		newd=Complement(newd,dependencies);
		dependencies=Union(newd,dependencies);
	}

	var Fname=IsString(F)?F:FunctionName(F);
	dependencies.map(d=>AddDependent(d,Fname))

	if(FunctionDependencies[Fname])
		return FunctionDependencies[Fname];

	return FunctionDependencies[Fname]=dependencies;
}

FunctionImportance=function(F){
	return FunctionDependencies(F).length;
}

CoreFunctionNames=[
	"In","InString","InArrayOrObj",
	"Capture",
	"Union","Unique","Intersection",
	"Equal","EqualFunction","EqualRegex",
	"IsNan","IsArray",
	"FunctionName","FunctionBody",
	"IsObject","IsRegex","IsNode",
	"Apply",
	"Memory","MemorySlot"
]

Capture=function(functionName){
	if(In(CoreFunctionNames,functionName))
		return;

	if(!Capture["list"])
		Capture["list"]=[];

	Capture[functionName]=globalThis[functionName];
	globalThis[functionName]=function(){
		Capture["list"].push(functionName);
		Capture["list"]=Union(Capture["list"]);
		globalThis[functionName]=Capture[functionName];
		return (globalThis[functionName])(...arguments);
	}
}

UsedFunctions=function(){
	if(!Capture["list"]){
		Introspect().map(Capture);
		return [];
	}
	else{
		used=Capture["list"];
		if(!Memory("UsedFunctions"))
			Memory("UsedFunctions",used)
		else
			Memory("UsedFunctions",Union(Memory("UsedFunctions"),used));

		return Memory("UsedFunctions");
	}
}

UnusedFunctions=function(){
	return Complement(Complement(Introspect(),UsedFunctions()),CoreFunctionNames);
}

//Node mass exporter (one-liner)
ExportFunction=function(name){
	exports[name]=globalThis[name];
}

ExportNodeFunctions=function(){
	if(NodejsDetected())
		Introspect().map(ExportFunction);
}

ExportNodeFunctions();