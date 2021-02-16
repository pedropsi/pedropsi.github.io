///////////////////////////////////////////////////////////////////////////////
// (C) Pedro PSI 2017-2021
// Conventions for concise, self-documenting, self-testing code
// (and memorable function names, in the thousands range)
///////////////////////////////////////////////////////////////////////////////
//
// Naming conventions
//
// 	1)	the last word reveals the return type:
//		- verb					: side effects	(may optionally return a value)
//	 	- "-ed", an adjective	: binary 		(true/false)
//	 	- "-er", "-or", "F"		: another function
//	 	- "Array", "A"			: an array
//	 	- "String", "S"			: a string
//	 	- "Object", "Obj", "O"	: an object
//
//	 	- "-s", a plural noun	: an array		(occasionally an object)
//
//	 	- "Element"				: a Node or HTML code or a Selector
//	 	- "Node"				: a HTML node element
//	 	- "HTML"				: HTML code, as a string
//		- ...
//
//	 	- "Draw"				: Draws something on the screen (side-effect)
//		- ...
//
// 	2)	modifiers:
//		-"Un-"					: returns the Opposite / Complementary value
//		-"Re-"					: enforces/coerces/compels a particular type or format
//
//	3) self-describing names are preferred. For instance "FirstSecond...Type" receives those "First","Second",... as arguments and returns "Type"
//
//  4) the first word may also refer to a particular set of related functions (to be improved). 
//
//  5) Forbidden names: anything vague, such as: "data" (to be improved)
//
//	6) function names are Capitalised (and camel-cased):
//		- avoids conflicts with most JS libraries
//		- feels natural
//		- marks functions as distinct from other variable types
//
///////////////////////////////////////////////////////////////////////////////
//
// Unit testing
//
//   All unit tests of a given function are stored as comments after its return statement, to:
//		-explain the function by example, right there
//		-keep code organised (what belongs together stays together)
//		-be extracted automatically by the unit testing framework (also in core.js)
//
///////////////////////////////////////////////////////////////////////////////
//
// Other technical considerations
//
// 1) Functions are defined with "function_name=function(args){body}" to:
//		1.1) allow anonymous export as node modules, while working normally in browser too
//			---regular expression to convert forth: 	
//				 	\nfunction ([^\(]+)
//					\n$1=function
//			---regular expression to convert back: 	
//				 	\n([^=\n]+)=function
//					\nfunction $1
//				 	 
			NodejsDetected=function(){
				return typeof window==="undefined";
			}
//
//  	1.2) avoid Safari Conditional Hoisting bugs
//				(modules ask whether a function was defined before, thus not overwriting it)
//
// 2) Modern ES Syntax is avoided, to avoid the need for a transpiler.
//		2.1) The "spread operator" (...) is replaced with the function "Merge"
//		2.1) The "arrow notation" (=>) is replaced with function(...){...} ------------------TODO
//




///////////////////////////////////////////////////////////////////////////////
//Get Function Name as a string, or make up a unique one based on the function's body
FunctionName=function(FunctionF){
	if(FunctionF.name)
		return FunctionF.name;
	var head=FunctionHead(FunctionF);
	if(head!=="function")
		return head;
	else{
		var body=FunctionBody(FunctionF);
		return body.replace(/[^ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890]/gi,"").replace(/^[1234567890]*/,"");
	}
}

FunctionNamecode=function(F){
	return FunctionName(F)||String(F);
}

FunctionBody=function(FunctionF){
	return UnUnderfix(FunctionF.toString(),")");
}

FunctionHead=function(FunctionF){
	if(FunctionF.name)
		return FunctionF.name;
	return UnPrefix(UnPrefix(UnAfterfix(FunctionF.toString(),"("),"function")," ");
}





///////////////////////////////////////////////////////////////////////////////
//Do nothing
Identity=function(i){return i;
/*
a boolean
Identity(false)
false

a string
Identity("abcd")
"abcd"

an array
Identity([])
[]

a function
Identity(Identity)
Identity
*/
};

True=function(){return true};
False=function(){return false};
Flipped=function(a){return !a};
Trued=function(a){return a===true};
Falsed=function(a){return a===false};


Apply=function(Function,Array){
	return Function.apply(null, Array);
/*
to any number of arguments
Apply(Plus,[1,2,3])
6

to an empty list
Apply(Plus,[])
0
*/
}

Applier=function(Function){
	return function(arg){
		return Apply(Function,arg);
	}
}

Evaluate=function(data){
	if (typeof data==="function"){
		args=Rest(Values(arguments))||[];
		return Apply(data,args);
	}
	else
		return data;
/*
Simple string
Evaluate("hi")
"hi"

A function
Evaluate(function(){return "wait"})
"wait"
*/
}

Empty=function(SAO){
	if(IsArray(SAO))
		return [];
	if(IsObject(SAO))
		return {};
	if(IsString(SAO))
		return "";
	
	Wtyp(SAO);
	return SAO;
}

ArgumentExtender=function(F){ // From pairs to infinite number of arguments
	return function(){
		var args=Values(arguments);
		if(args.length<=2)
			return Apply(F,args);
		else
			return Fold(F,args[0],Rest(args));
	}
}


LazyPasser=function(F){
	return function(){
		var args=Values(arguments);
		return function(){return Apply(F,args)}
	}
}

MapThread=function(F){
	var args=Rest(Values(arguments));
	if(!args.length)
		return [];
	var l=Min(args.map(list=>list.length));
	var result=[];
	for(var i=0;i<l;i++){
		result.push(Apply(F,args.map(li=>li[i])));
	}
	return result;
/*
Variable number of arguments, fixed size
MapThread(Plus,[1,2,3],[4,5,6],[7,8,9])
[12,15,18]

Uneven sizes, select shortest
MapThread(Plus,[1,2],[4,5,6],[7])
[12]
*/
}

///////////////////////////////////////////////////////////////////////////////
//Error report
Warner=function(type){
	var font="font-family:Calibri,Arial; ";
	var yellowfont="color:lightyellow; "+font;
	var bold="font-weight:bold; ";
	var types={
		"error":[
			yellowfont+bold+' background: gray;',
			yellowfont+' background: gray;'
		],
		"type error":[
			yellowfont+bold+' background: darkred;',
			yellowfont+' background: darkred;'
		],
		"info":[
			yellowfont+bold+' background: darkgreen;',
			yellowfont+' background: darkgreen;'
		],
		"network":[
			yellowfont+bold+' background: blue;',
			yellowfont+' background: blue;'
		],
		"debug":[
			yellowfont+bold+' background: purple',
			yellowfont+' background: purple'
		]
	};
	return function W(message){
		if(typeof message==="undefined")
			var message="";
		var caller=FindCallerName(W.caller||"")||"top level";
		
		var styles=types[type]||types[error];

		var values=Rest(Values(arguments));
			values=[`%c ${caller} %c ${type} `].concat(styles).concat([message]).concat(values);

		Apply(console.warn,values);
	}
}

Warn=Warner("error");
Wtyp=Warner("type error");
Winf=Warner("info");
Wnet=Warner("network");
Wbug=Warner("debug");

FindCallerName=function(code){
	if(FunctionHead(code))
		return FunctionHead(code);
	if(!FindCallerName["caller-code-bodies"]){
		FindCallerName["caller-code-bodies"]=ReValueObject(globalThis,(v,x)=>IsFunction(x)?UnWhitespace(FunctionBody(v)):"");
		FindCallerName["caller-code-bodies"]=FlipKeysValues(FindCallerName["caller-code-bodies"])
	}
	if(!code)
		return "";
	var code=UnWhitespace(code);
	if(FindCallerName[code])
		return FindCallerName[code]
	return "";
}

//Functional Sorting

Comparer=function(F){
	var F=F||Number;
	return function(a,b){
		Fa=F(a);
		Fb=F(b);
		return Fa<Fb?-1:(Equal(Fa,Fb)?0:1);
	}
}

Sorter=function(){
	var funs=Values(arguments);
	if(!funs.length)
		funs=[Identity];
	return function(array){
		funs.map(f=>(array=Clone(array).sort(Comparer(f))));
		return array;
	}
}

SortArray=function(v){
	var Sorters=Rest(Values(arguments));
	return Apply(Sorter,Sorters)(v);
}

SortObjectKeys=function(Obj){
	var Sorters=Rest(Values(arguments));
	var sortedkeys=Apply(Sorter,Sorters)(Keys(Obj));
	var o={};
		sortedkeys.map(k=>o[k]=Obj[k]);
		return o;
}

SortObjectValues=function(Obj){
	var Sorters=Rest(Values(arguments));
	var sortedkeys=Apply(Sorter,Sorters)(Values(Obj));
	var o={};
		sortedkeys.map(k=>o[k]=Obj[k]);
		return o;
}


SortBy=function(AO){
//SortBy=function(AO,...Sorters){
	var Sorters=Rest(Values(arguments));
	if(IsArray(AO))
		return Apply(function(S){return SortArray(AO,S)},Sorters);
	if(IsObject(AO))
		return Apply(function(S){return SortObjectKeys(AO,S)},Sorters);
	return AO;
}

Sort=function(AO){
	return SortBy(AO,Identity);
}

MinimalPosition=function(array,Switcher){
	var i=0;
	var Switcher=Switcher||Smaller;
	var l=array.length;
	var p=i;
	while(i<l){
		if(Switcher(array[i],array[p]))
			p=i;
		i++
	}
	return p;
}
	
CycleSort=function(array,Switcher){
	var l=array.length;
	var p=MinimalPosition(array,Switcher||Smaller);
	return array.map((t,j)=>array[(j+p+l)%l]);
}

//Key characters
NumberCharacters=["0","1","2","3","4","5","6","7","8","9"];
LetterCharacters="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
AlphanumericCharacters=LetterCharacters.concat(NumberCharacters);
LetterSpaceCharacters=LetterCharacters.concat(" ");
Directions=["left","up","right","down"];


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
/*
Equal source and flags
EqualRegex(/a/g,/a/g)
true

Different flags
EqualRegex(/a/g,/a/gi)
false

Different source
EqualRegex(/a/g,/b/g)
false
*/
}

Equal=function(a,b){
	if(typeof a==="undefined"&&typeof b==="undefined")
		return true;
	else if(typeof a!==typeof b)
		return false;
	else if(IsNan(a)&&IsNan(b))
		return true;
	else if((typeof a==="string"&&typeof b==="string")||(typeof a==="boolean"&&typeof b==="boolean"))
		return a===b;
	else if((typeof a==="number"&&typeof b==="number"))
		return (a===Infinity&&b===Infinity)||Abs(b-a)<1e-10;//precision limit
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
	else if(IsDate(a)&&IsDate(b))
		return a===b;
	else{
		Warn("check this new case:",a,b);
		return false;
	}
}

///////////////////////////////////////////////////////////////////////////////
// Math

ArgumentFlattener=function(Operation){
	var Op=function(){
		var args=Values(arguments);
		args=args.map(arr=>IsArray(arr)?Apply(Op,arr):arr)
		return Operation(args);
	}
	return Op;
}

Max=ArgumentFlattener(Applier(Math.max));
Min=ArgumentFlattener(Applier(Math.min));
Mean=ArgumentFlattener(function(args){return Apply(Plus,args)/args.length})


BiPlus=function(a,b){
	if(!b)
		return a||0;
	if(IsNumber(a)&&IsNumber(b))
		return a+b;
	if(IsArray(a)&&IsArray(b))
		return MapThread(Plus,a,b);
	else if(IsArray(a))
		return a.map(n=>Plus(b,n));
	else if(IsArray(b))
		return b.map(n=>Plus(a,n));
	else{
		Warn("Plus error",a,b)
		return 0;
	}
}

BiTimes=function(a,b){
	if(typeof a==="undefined")
		return 1;
	if(typeof b==="undefined")
		return a;
	if(IsNumber(a)&&IsNumber(b))
		return a*b;
	if(IsArray(a)&&IsArray(b))
		return MapThread(Times,a,b);
	else if(IsArray(a))
		return a.map(n=>Times(b,n));
	else if(IsArray(b))
		return b.map(n=>Times(a,n));
	else{
		Wtyp(a,b);
		return 1;
	}
}

Plus=ArgumentExtender(BiPlus);
Times=ArgumentExtender(BiTimes);


Symmetric=function(a){
	if(IsNumber(a))
		return -a;
	if(IsArray(a))
		return a.map(Symmetric);
	else{
		Wtyp(a,b);
		return a;
	}
}

Minus=function(a,b){
	return Plus(a,Symmetric(b));
}

Inverse=function(a){
	if(a===0)
		return Infinity;
	if(a===Infinity)
		return 0;
	if(IsNumber(a))
		return 1/a;
	if(IsArray(a))
		return a.map(Inverse);
	else{
		Wtyp(a);
		return a;
	}
}

Divide=function(a,b){
	return Times(a,Inverse(b));
}



Floor=Math.floor;
Ceiling=Math.ceil;
FractionalPart=function(n){return n-Floor(n)};
Sin=Math.sin;
Cos=Math.cos;
PI=Math.PI;
Abs=Math.abs;
SquareRoot=Math.sqrt;

Sign=function(n){
	if(n>0)
		return 1
	else if(n<0)
		return -1
	else
		return 0;
}
Log10=Math.log10;
Log=function(a,b){
	return Math.log(a)/Math.log(b);
}

Smaller=function(n,m){
	return n<m;
}


Round=function(n,m){
	if(IsArray(n))
		return n.map(a=>Round(a,m));
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
	return Math.pow(n,exp);
/*
of zero
Power(2,0)
1

of a positive exponent
Power(2,3)
8
*/
}

PoweredSum=function(vector,power){
	return Apply(Plus,vector.map(v=>Power(v,power)));
/*
zero-dimensional
PoweredSum([],2)
0

monodimensional
PoweredSum([2],2)
4

bidimensional
PoweredSum([3,4],2)
25

tridimensional
PoweredSum([1,2,3],1)
6

tetradimensional
PoweredSum([1,2,3,4],2)
30
*/
}

VectorOperation=function(Operation,vector1,vector2){
	if(typeof vector2==="undefined")
		return vector1;
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
		return [].concat(v1).map(function(x,i){return Operation(x,v2[i])});
	}
}

Vectoriser=function(Operation){
	return function(vector1,vector2){
		return VectorOperation(Operation,vector1,vector2);
	}
}

var VectorBiPlus=Vectoriser(Plus);
var VectorBiTimes=Vectoriser(Times);

VectorPlus=ArgumentExtender(VectorBiPlus);
VectorTimes=ArgumentExtender(VectorBiTimes);

var VectorMinus=Vectoriser(Minus);
var VectorDivide=Vectoriser(Divide);
var VectorMean=Vectoriser(Mean);
var VectorMax=Vectoriser(Max);
var VectorMin=Vectoriser(Min);


EuclideanDistance=function(vector1,vector2){
	return SquareRoot(PoweredSum(VectorMinus(vector2,vector1),2));
}

UnitVector=function(vector){
	if(Equal(vector,[0,0]))
		return [0,0];
	var d=EuclideanDistance([0,0],vector);
	return Divide(vector,d);
}

///////////////////////////////////////////////////////////////////////////////
// Array, Object, String (SAO)

Length=function(SAO){
	if(IsArray(SAO)||IsString(SAO)){
		return SAO.length
	}
	if(IsObject(SAO)){
		return Keys(SAO).length;
	}
	Wtyp("no string, array or object")
	return 1;
/*
Empty list
Length([])
0

Empty object
Length({})
0

Empty string
Length("")
0

a function
Length(Identity)
1
*/
}

First=function(SAO){
	if(IsArray(SAO)||IsString(SAO)){
		if(SAO.length)
			return SAO[0];
		return null;
	}
	if(IsObject(SAO)){
		var k=First(Keys(SAO));
		return k?SAO[k]:null;
	}
	Wtyp("no string, array or object")
	return null;
/*
Empty list
First([])
null

Empty string
First("")
null
*/
}

Last=function(SAO){
	if(IsArray(SAO)||IsString(SAO)){
		if(SAO.length)
			return SAO[SAO.length-1];
		return null;
	}
	if(IsObject(SAO)){
		var k=Last(Keys(SAO));
		return k?SAO[k]:null;
	}
	Wtyp("no string, array or object")
	return null;
/*
Empty list
Last([])
null

Empty string
Last("")
null
*/
}

Rest=function(SAO){
	if(IsArray(SAO)){
		var A=CloneArray(SAO);
		A.shift();
		return A;
	}
	if(IsObject(SAO))
		return FilterKeysObject(SAO,k=>In(Rest(Keys(SAO)),k));
	if(IsString(SAO))
		return Rest(SAO.split("")).join("");
	Wtyp("no string, array or object")
	return null;
/*
Empty list
Rest([])
[]

Empty string
Rest("")
""
*/
}

Most=function(SAO){
	if(IsArray(SAO)){
		var A=CloneArray(SAO);
		A.pop();
		return A;
	}
	if(IsObject(SAO))
		return FilterKeysObject(SAO,k=>In(Most(Keys(SAO)),k));
	if(IsString(SAO))
		return Most(SAO.split("")).join("");
	Wtyp("no string, array or object")
	return null;
/*
Empty list
Most([])
[]

Empty string
Most("")
""
*/
}

Take=function(SAO,n){
	if(IsObject(SAO))
		return FilterKeysObject(SAO,k=>In(Take(Keys(SAO),n),k));
	if(n<0)
		return SAO.slice(SAO.length-1*Floor(Abs(n)),SAO.length);
	return SAO.slice(0,Floor(n));

/*
from beginning
Take([5,6,7,8,9],2)
[5,6];

from end
Take([5,6,7,8,9],-1)
[9]

zero
Take([5,6,7,8,9],0)
[]

over bounds
Take([5,6,7,8,9],-10)
[5,6,7,8,9]

Infinity
Take([5,6,7,8,9],Infinity)
[5,6,7,8,9]

Objects
Take({a:1,b:4,c:7},2)
{a:1,b:4}

Incomplete, beginning
Take([1,2,3],1.5)
[1]

Incomplete, end
Take([1,2,3],-1.5)
[3]
*/
}

UnTake=function(SAO,n){
	if(IsObject(SAO))
		return FilterKeysObject(SAO,k=>In(UnTake(Keys(SAO),n),k));
	if(n<0)
		return SAO.slice(0,SAO.length+Ceiling(n));
	return SAO.slice(Floor(n),SAO.length);
/*
remove from beginning
UnTake([5,6,7,8,9],2)
[7,8,9];

remove from end
UnTake([5,6,7,8,9],-1)
[5,6,7,8]

zero
UnTake([5,6,7,8,9],0)
[5,6,7,8,9]

over bounds
UnTake([5,6,7,8,9],-10)
[]

Infinity
UnTake([5,6,7,8,9],Infinity)
[]

Objects
UnTake({a:1,b:4,c:7},2)
{c:7}

Incomplete, beginning
UnTake([1,2,3],1.5)
[2,3]

Incomplete, end
UnTake([1,2,3],-1.5)
[1,2]
*/
}

Insert=function(array,n,p){
	if(typeof array==="string")
		return Insert(array.split(""),n,p).join("");

	var p=Max(Min(p,array.length),0);
	array.splice(p,0,n);
	return array;
}

Append=function(A,item){
	if(typeof item==="undefined")
		return A;
	return Insert(A,item,A.length);
/*
add
Append([1],2)
[1,2];
*/
}

Prepend=function(A,item){
	if(typeof item==="undefined")
		return A;
	return Insert(A,item,0);
/*
add
Prepend([1],2)
[2,1];
*/
}

InsertCut=function(array,item,p){
	if(p>0)
		return Append(Take(array,p),item)
	else
		return Prepend(Take(array,p),item);
/*
remove tail and add element
InsertCut([1,2,3,4,5],"a",3)
[1,2,3,"a"]

remove head and add element
InsertCut([1,2,3,4,5],"a",-3)
["a",3,4,5]

both
InsertCut([1,2,3,4,5],"a",0)
["a"]
*/
}

//Distinguish Objects and Arrays
IsArray=function(array){
	if(!array)
		return false;
	return FunctionName(array.constructor)==="Array";
}

IsObject=function(obj){
	return obj&&In(String(obj.constructor),"Object");
}

IsRegex=function(obj){
	if(!obj)
		return false;
	return FunctionName(obj.constructor)==="RegExp";
}

IsString=function(s){
	if(typeof s==="undefined")
		return false;
	return typeof s==="string";
/*
Empty string
IsString("")
true

*/
}

IsFunction=function(F){
	return F&&(typeof F==="function");
}

IsNode=function(node){
	return node&&(typeof node==="object")&&node.isEqualNode;
}

IsNan=function(nan){
	return (typeof nan==="number")&&!(nan<0)&&!(nan===0)&&!(nan>0);
}

IsNumber=function(n){
	return (typeof n==="number");
}

IsDate=function(n){
	return n&&(typeof n==="object")&&n.getDate;
}


ReArray=function(a){
	if(typeof a==="undefined")
		return []
	else if(IsArray(a))
		return a;
	else
		return [a];
}

ReString=function(a){
	if(IsString(a))
		return `'${a}'`;
	if(IsArray(a))
		return `[${a.map(ReString).join(",")}]`;
	if(IsObject(a))
		return `{${ThreadKeysValues(a,(k,v)=>(ReString(k)+":"+ReString(v))).join(",")}}`;
	return String(a);

/*
string of string
ReString("1")
"'1'"

array with string
ReString(["1",1])
"['1',1]"

object with string
ReString({a:"1","b":1})
"{'a':'1','b':1}"

Nans
ReString(NaN)
"NaN";
*/
}

//Apply function to Array or Object
AOApply=function(arrayOrObj,F){
	if(IsArray(arrayOrObj))
		return F(arrayOrObj);
	else if(IsObject(arrayOrObj))
		return F(Keys(arrayOrObj));
	else{
		Wtyp(arrayOrObj);
		return undefined;
	}
};

Keys=function(Obj){
	return Object.keys(Obj)||[];
};
Values=function(Obj){
	return Object.values(Obj)||[];
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

ReKeyObject=function(Obj,Modifier){//key, then value (optional)
	var Modifier=Modifier||Identity;
	var O={};
	Keys(Obj).map(k=>(O[Modifier(k,Obj[k])]=Obj[k]));
	return O;
};

ReValueObject=function(Obj,Modifier){//value, then key (optional)
	if(IsObject(Modifier))
		return ReValueObject(Obj,function(v,k){
			if(In(Modifier,k)){
				return Evaluate(Modifier[k],Obj[k])
			}
			else
				return Obj[k];
		});
	var Modifier=Modifier||Identity;
	var O={};
	Keys(Obj).map(k=>(O[k]=Modifier(Obj[k],k)));
	return O;

/*
Change values based on keys and values
ReValueObject({a:1,b:2},(x,l)=>l.repeat(2*x))
{a:"aa",b:"bbbb"}

Modify Object Values based on a special object
ReValueObject({a:1,b:1},{a:x=>x+1,b:x=>x-1})
{a:2,b:0}

Modify Object Values based on a special object
ReValueObject({a:1,b:1},{a:x=>100,b:x=>10})
{a:100,b:10}

Modify Object Values based on a special object
ReValueObject({a:1,b:1},{a:x=>x+1})
{a:2,b:1}

Modify Object Values based on function
ReValueObject({a:1,b:1},{a:x=>100,b:x=>10})
{a:100,b:10}
*/
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
	return AOApply(arrayOrObj,F)||false;
};

//Update Object Keys
MapObject=function(Obj,ValueKeyer){
	var keys=Keys(Obj);
	for (var i in keys){
		if(Obj.hasOwnProperty(keys[i])){
			//F(value, key, obj)
			ValueKeyer(Obj[keys[i]],keys[i],Obj);
		}
	}
	return Obj;
};


FilterKeysObject=function(Obj,Validator){
	if(!Validator)
		return Obj;
	var O={};
	Keys(Obj).filter(k=>Validator(k,Obj[k])).map(k=>O[k]=Obj[k]);
	return O;
/*
Simple filter
FilterKeysObject({a:1,b:2,c:3,d:4},l=>l==="b")
{b:2}
*/
}

FilterValuesObject=function(Obj,Validator){
	if(!Validator)
		return obj;
	var O={};
	Keys(Obj).filter(k=>Validator(Obj[k],k)).map(k=>O[k]=Obj[k]);
	return O;
/*
Simple filter2
FilterValuesObject({a:1,b:2,c:3,d:4},v=>v%2)
{a:1,c:3}
*/
}

FilterArray=function(A,Validator){
	return A.filter(Validator||Identity);
}

Filter=function(AO,Validator){
	if(IsArray(AO))
		return FilterArray(AO,Validator);
	if(IsObject(AO))
		return FilterValuesObject(AO,Validator);
	Wtyp("no object or array");
	return AO;
}



TreeKeys=function(Obj,separator){
	var separator=String(separator||".");
	var full=[];
	var keys=Keys(Obj);
		keys.map(function(k){
			if(IsObject(Obj[k]))
				full=full.concat(TreeKeys(Obj[k],separator).map(f=>k+separator+f));	
			else
				full.push(k);
		})
	return full;
/*
Shallow Object
TreeKeys({a:1,b:2})
["a","b"]

Deep Object
TreeKeys({a:1,b:{c:3,d:{e:5}}})
["a","b.c","b.d.e"]

Custom separator
TreeKeys({a:1,b:{c:3}},"»»")
["a","b»»c"]
*/
}


ThreadKeysValues=function(Obj,KeyValuer){
	return Keys(Obj).map(k=>KeyValuer(k,Obj[k]));
/*
list keys
ThreadKeysValues({a:1,b:2},(a,b)=>b)
[1,2]

list values
ThreadKeysValues({a:1,b:2},(a,b)=>a)
["a","b"]

combine keys and values
ThreadKeysValues({a:1,b:2},(a,b)=>a+b)
["a1","b2"]
*/
}



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

In=function(SAO,n){
	if(typeof SAO==="string")
		return InString(SAO,n);
	else
		return InArrayOrObj(SAO,n);
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


ArrayObjectF=function(ArrayF,ObjectF){
	return function(AOInclude,AOExclude){
		if(IsArray(AOInclude)&&IsArray(AOExclude))
			return ArrayF(AOInclude,AOExclude);

		if(IsObject(AOInclude)&&IsObject(AOExclude))
			return ObjectF(AOInclude,AOExclude);

		return Wtyp(ArrayF,ObjectF);
	}
}

///////////////////////////////////////////////////////////////////////////////
//Dictionaries

LowerAccesser=function(Dictionary,Rewriter){
	return TransformAccesser(Dictionary,LowerCase,Identity,Rewriter);
}

Accesser=function(Dictionary,Renamer,Failform){
	return TransformAccesser(Dictionary,Renamer,Identity,Failform);
}

TransformAccesser=function(Dictionary,Transform,Retroform,Failform){
	var Transform=Transform||Identity;
	var Retroform=Retroform||Transform;
	var Failform=Failform||Identity;
	var keyst=Keys(Dictionary).map(Retroform);
	var values=Values(Dictionary);
	return function(name){
		if(name===undefined)
			return Dictionary;
		var namet=Transform(name);
		if(In(keyst,namet))
			return values[keyst.indexOf(namet)];
		else
			return Failform(name);
	}
}

Register=function(Dict,Renamer){
	var Renamer=Renamer||LowerCase;
	return function(Name,Value){
		var name=Renamer(Name);
		Dict[name]=Value;
		return Dict;
	}
}

UnRegister=function(Dict,Renamer){
	var Renamer=Renamer||LowerCase;
	return function(Name){
		var name=Renamer(Name);
		delete Dict[name];
		return Dict;
	}
}


CanonicalObject=function(Obj,CanonicalName){
	if(!CanonicalName)
		return Obj;
	var keys=Keys(Obj).filter(k=>(k!==CanonicalName(k)));
		keys.map(function(k){
			Obj[CanonicalName(k)]=Obj[k];
			delete Obj[k];
		})
	return Obj;
}

///////////////////////////////////////////////////////////////////////////////
//Set functions

DistinctArray=function(A,Equaliser){
	var Equaliser=Equaliser||Identity;
	var B=[];
	var C=[];
	var i=0;
	while(i<A.length){
		var a=A[i];
		var b=Equaliser(a)
		if(!In(B,b)){
			B.push(b);
			C.push(a);
		}
		i++;	
	}
	return C;
}

UnDistinctArray=function(A,Equaliser){
	var Equaliser=Equaliser||Identity;
	var B=[];
	var C=[];
	var i=0;
	while(i<A.length){
		var a=A[i];
		var b=Equaliser(a)
		if(!In(B,b))
			B.push(b);
		else
			C.push(a);
		i++;	
	}
	return C;
}

DistinctKeysObject=function(O,Equaliser){
	var Ob={};
	DistinctArray(Keys(O),Equaliser).map(k=>Ob[k]=Clone(O[k]));
	return Ob;
}

Equaliser=function(Standardise){
	var Standardise=Standardise||Identity;
	return function(a,b){
		return Equal(Standardise(a),Standardise(b))
	}
}

Order=function(canon,list,Standardise){
	if(!list)
		return [];
	var Standardise=Standardise||Identity;
	return list.map(item=>canon.findIndex(c=>Equaliser(Standardise)(item,c)))
}

Pick=function(list,order){
	var picked=[];
	for(var i=0;i<order.length;i++){
		var o=order[i];
		if(0<o<list.length)
			picked=Append(picked,list[o])
	}
	return picked;
}

Unique=function(AO){
	return Intersection(AO,AO);
}

//Complement (force uniqueness, sort)
ComplementArray=function(arrayInclude,arrayExclude){
	var unique=[];
	var value;
	for(var i=0;i<arrayInclude.length;i++){
		value=arrayInclude[i];
		if(!In(arrayExclude,value)&&!In(unique,value))
			unique.push(value);
	}
	return unique.sort();
}

ComplementObject=function(objInclude,objExclude){
	if(typeof objExclude==="undefined"||!IsObject(objInclude)||!IsObject(objExclude))
		return objInclude;

	var unique={};
	for(var i in objInclude){
		if(!Equal(objInclude[i],objExclude[i]))
			unique[i]=ComplementObject(objInclude[i],objExclude[i]);
	}
	return unique;
/*
Simple complement
ComplementObject({a:1,b:2},{a:1})
{b:2}

Different value for same key, still distinct
ComplementObject({a:1,b:2},{a:2})
{a:1,b:2}

Deep removal, keep structure
ComplementObject({a:1,b:{c:3,d:4}},{a:1,b:{c:3}})
{b:{d:4}}
*/
}

ComplementKeysObject=function(keys,Obj){
	var O={};
	var keys=keys||[];
	Keys(Obj).map(function(k){
		if(!In(keys,k))
			O[k]=Obj[k];
	})
	return O;
}


BiComplement=function(AO1,AO2){
	if(!AO2)
		return AO1;
	if(!AO1)
		return Empty(AO2);
	
	var args=Values(arguments);
	return Apply(ArrayObjectF(ComplementArray,ComplementObject),args);
}

Complement=ArgumentExtender(BiComplement);




//Intersection (force uniqueness, sort)
ArrayIntersection=function(array1,array2){
	var unique=[];
	var value;
	for(var i=0;i<array1.length;i++){
		value=array1[i];
		if(In(array2,value)&&!In(unique,value))
			unique.push(value);
	}
	return unique.sort();
}

ObjectIntersection=function(O1,O2){
	var unique={};
	var value;
	for(var i in O1){
		value=O1[i];
		if(Equal(O2[i],value))
			unique[i]=value;
	}
	return unique;
}

ObjectKeyIntersection=function(O1,O2){
	var O={};
	for(var i in O1){
		if(typeof O2[i]!=="undefined")
			O[i]=O1[i];
	}
	return O;
}


BiIntersection=function(A1,A2){
	if(!A1&&!A2)
	return [];
	if(!A2)
		return A1;
	if(!A1)
		return A2;
	return ArrayIntersection(A1,A2);
}
var Intersection=ArgumentExtender(BiIntersection);

Intersected=function(){
	var args=Values(arguments);
	return (Apply(Intersection,args)).length>0
}

//Union (force uniqueness, sort)
BiUnion=function(A1,A2){
	if(!A1&&!A2)
		return [];
	if(!A2)
		return Unique(A1);
	if(!A1)
		return Unique(A2);
	return Unique(A1.concat(A2));
}

Union=ArgumentExtender(BiUnion);

JoinObjects=function(O1,O2){
	var O=Clone(O1);
	Keys(O2).map(
		function(k){
			if(!O1[k])
				O[k]=O2[k]
			else
				O[k]=Join(O1[k],O2[k])
		}
	)
	return O;
}

BiJoinAO=function(AO1,AO2){
	// if(IsString(AO1)&&IsString(AO2))
	// 	return AO1+AO2;
	if(IsObject(AO1)&&IsObject(AO2))
		return JoinObjects(AO1,AO2);
	else if(IsArray(AO1)&&IsArray(AO2))
		return AO1.concat(AO2);
	else
		return AO2; //overwrites if joining impossible
}

BiJoin=function(AO1,AO2){
	if(!AO2)
		return AO1;
	if(!AO1)
		return AO2;
	return BiJoinAO(AO1,AO2);
/*
recursive
BiJoin({a:{c:3,d:4}},{a:{e:5}})
{a:{c:3,d:4,e:5}}

also combines arrays
BiJoin({a:[1,2,3]},{a:[4,5]})
{a:[1,2,3,4,5]}
*/
}

Join=ArgumentExtender(BiJoin);



MergeObjects=function(O1,O2){
	var O=Clone(O1);
	Keys(O2).map(
		function(k){
			if(typeof O1[k]!=="undefined")
				O[k]=O2[k]
			else
				O[k]=BiMerge(O1[k],O2[k]) //overwrites if joining impossible
		}
	)
	return O;
}

BiMerge=function(AO1,AO2){
	if(typeof AO1==="undefined"&&typeof AO2==="undefined")
		return {};
	if(typeof AO2==="undefined")
		return AO1;
	if(typeof AO1==="undefined")
		return AO2;
	if(IsObject(AO1)&&IsObject(AO2))
		return MergeObjects(AO1,AO2);
	else
		return AO2; //overwrites if merging impossible

/*
object with key
BiMerge({a:1,b:2},{a:3})
{a:3,b:2}

object no key
BiMerge({a:1,b:2},{c:3})
{a:1,b:2,c:3}

object hasn't key
BiMerge({a:1,b:2},{c:3,d:4})
{a:1,b:2,c:3,d:4}

multiple properties
BiMerge({a:3},{a:1,b:2})
{a:1,b:2}

add empty object
BiMerge({a:1,b:2},{})
{a:1,b:2}

add to empty object
BiMerge({},{a:1,b:2})
{a:1,b:2}

only one argument
BiMerge({a:1,b:2})
{a:1,b:2}

zero argument
BiMerge()
{}

not recursive (use join for that)
BiMerge({a:{c:3,d:4}},{a:{e:5}})
{a:{e:5}}
*/
}

Merge=ArgumentExtender(BiMerge);


MergeEvaluateObject=function(Obj,SubObj){
	var Obj=Clone(Obj||{})
	if(!SubObj)
		return Obj;
	Keys(SubObj).map(
		function(k){
			var v=Evaluate(SubObj[k],Obj[k]);
			if(IsObject(v)&&IsObject(Obj[k])){
				v=MergeEvaluateObject(Obj[k],v);
			}
			v=Merge(Obj[k],v);
			if(Obj[k]!==v){
				Obj[k]=v;
			}
		})
	return Obj;
/*
deep evaluation
MergeEvaluateObject({a:1,b:2,c:{d:3}},{a:x=>x+1,c:{d:x=>2*x}})
{a:2,b:2,c:{d:6}}
*/
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

//Gather Objects

GatherArray=function(Arr,Equaliser){
	var Equaliser=Equaliser||Identity;
	var uniquekeys=Unique(Arr.map(Equaliser));
	var o=[];
		uniquekeys.map(k=>(o.push(Arr.filter(v=>(Equaliser(v)===k)))));
	return o;
}

GatherObject=function(Obj,Equaliser){
	var Equaliser=Equaliser||Identity;
	var uniquekeys=Unique(Values(Obj).map(Equaliser).map(String));
	var o={};
		uniquekeys.map(k=>(o[k]=FilterValuesObject(Obj,v=>(String(Equaliser(v))===k))));
	return o;
/*
Custom equaliser
GatherObject({a:1,b:2,c:3,d:3},x=>x%2)
{0:{b:2},1:{a:1,c:3,d:3}}
*/
}

Gather=function(AO,Equaliser){
	if(IsObject(AO))
		return GatherObject(AO,Equaliser);
	else
		return GatherArray(AO,Equaliser);
}


//delete from array
Delete=function(array,i){
	if(!array||typeof i!=="number"||i<0||i>=array.length)
		return array;
	var a=[].concat(array);
	return a.slice(0,i).concat(a.slice(i+1,a.length));
}

RemoveFirst=function(array,item){
	var i=array.findIndex(x=>Equal(x,item));
	if(i>=0)
		return Delete(array,i);
	else
		return array;
}

RemoveItemArray=function(array,item){
	return FixedPoint(arr=>RemoveFirst(arr,item),array);
}

RemoveKeyObject=function(O,key){
	var P=Clone(O);
	delete P[key];
	return P;
}

Remove=function(AO,key){
	if(IsObject(AO))
		return RemoveKeyObject(AO,key);
	else
		return RemoveItemArray(AO,key);
/*
From array, multiple values
Remove([1,2,3,3,2,8],2)
Array(4) [ 1, 3, 3, 8 ]

From object, key present
Remove({a:1,b:2},"a")
Object { b: 2 }

From object, key absent
Remove({a:1,b:2},2)
Object { a: 1, b: 2 }
*/
}


AddOnce=function(array,item){
	if(!In(array,item))
		return array.concat([item]);
	else
		return array;
}

Reverse=function(SAO){
	if(IsString(SAO))
		return SAO.split("").reverse().join("");
	else if(IsObject(SAO))
		return ReverseKeysObject(SAO);
	else
		return Clone(SAO).reverse();
}

ReverseKeysObject=function(Obj){ //Reverse key order
	var k=Keys(Obj).reverse();
	var O={};
	k.map(function(x){O[x]=Obj[x]});
	return O;
};


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

SubsetArray=function(ASuper,ASub){
	return Complement(ASub,ASuper).length===0
}

SubsetObject=function(OSuper,OSub){
	var keys=Keys(OSub);
	return keys.every(k=>Equal(OSuper[k],OSub[k]));
}

Subsetted=function(AOSuper,AOSub){
	return ArrayObjectF(SubsetArray,SubsetObject)(AOSuper,AOSub);
}

SupersetsArray=function(list){
	return list.filter(item=>Remove(list,item).every(other=>!Subsetted(other,item)));
}

//Object Arrays (BASE)
FilterBase=function(Base,GroupObject){
	var Filterer=GroupObject;
	if(IsObject(GroupObject))
		Filterer=function(g){return Subsetted(g,GroupObject)};
	
	return Values(FilterValuesObject(Base,Filterer));
}

///////////////////////////////////////////////////////////////////////////////
//Repetitive functions

// Fold
FoldM=function(F,x0,array){
	if(!array||array.length<1){
		return x0;
	}else if(array.length===1){
		return F(x0,array[0]);
	}else{
		var x1=array[0];
		array.shift();
		return FoldM(F,F(x0,x1),array);
	}
}

Fold=function(F,x0,array){
	return FoldM(F,x0,Clone(array));

/*
function, initial value and array
Fold(Plus,1,[2,3,4])
10

empty array
Fold(Plus,1,[])
1
*/
}

// Fixed point
FixedPoint=function(F,x){
	var i=x;
	var j=100;
	while(!Equal(i,F(i))&&j>0){
		j--;
		i=F(i);
	}
	if(j<=0)
		Warn("Iteration  limit exceeded. Result:",i);
	return i;

/*
do until nothing changes
FixedPoint(Identity,"ended")
"ended"

robust comparison (e.g. for arrays)
FixedPoint(Rest,[1,2,3])
[]
*/
}

ItemPrecedents=function(item,precedentsObj){
	if(typeof item==="undefined")
		return [];
	var item=item;
	var levels=[item];
	var precedentsObj=precedentsObj||{};
	while(In(precedentsObj,item)&&!In(levels,precedentsObj[item])){
		item=precedentsObj[item];
		levels.push(item);
	}
	return levels;
/*
No precedents
ItemPrecedents("a",{b:"c"})
["a"]

Break infinite loops
ItemPrecedents("a",{a:"b",b:"c",c:"a"})
["a","b","c"]
*/
}

///////////////////////////////////////////////////////////////////////////////
//Join Objects, overwriting conflicting properties
BiFuseObjects=function(obj,newObj){
	var O={};
	function SetValueKey(value,key){O[key]=value};
	if(obj)
		MapObject(obj,SetValueKey);
	if(newObj)
		MapObject(newObj,SetValueKey);
	return O;
}

FuseObjects=ArgumentExtender(BiFuseObjects);

CloneObject=function(Obj){
	var O={};
	Keys(Obj).map(k=>O[k]=Clone(Obj[k]));
	return O;
}

CloneArray=function(A){
	var B=[];
	var i=0;
	var l=A.length;
	while(i<l){
		B.push(Clone(A[i]));
		i++;
	}
	return B;
}

Clone=function(SAO){
	if(IsArray(SAO))
		return CloneArray(SAO);
	if(IsObject(SAO))
		return CloneObject(SAO);
	return SAO;
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

FirstReplaceString=function(string,ruleArray){
	var i=0;
	var found=false;
	var replaced;
	while(!found&&i<ruleArray.length){
		rule=ruleArray[i];
		replaced=StringReplaceOnceRule(string,rule);
		found=(replaced!==string);
		if(!found)
			i++;
	}
	return found?replaced:string;
}

StringPrefixes=function(string){
	return Range(1,string.length).map(i=>string.slice(0,i))}

StringSuffixes=function(string){
	var l=string.length;
	return Range(0,l-1).map(i=>string.slice(i,l))}

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

// StringReplaceRulesObjectOnce=function(string,rulesObj){
// 	return StringReplaceOnceRuleArray(string,ObjectRules(rulesObj));
// }

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
		Wtyp(r);
		return string;
	}
}

// Unspace

TrimWhitespaceString=function(string){
	return string.replace(/^(\r|\s)+/gi,"").replace(/(\r|\s)+$/gi,"");
}

UnWhitespace=function(string){
	return string.replace(/(\s|\r)*/gi,"");
}

CharacterUniformisations={
	"æ":"ae","ß":"ss","ĳ":"ij","ø":"o","œ":"oe","þ":"th",
	
	"ä":"a","ë":"e","ï":"i","ö":"o","ü":"u","ÿ":"y",
	"á":"a","é":"e","í":"i","ó":"o","ú":"u","ý":"y",
	"à":"a","è":"e","ì":"i","ò":"o","ù":"u",
	"â":"a","ê":"e","î":"i","ô":"o","û":"u","ŷ":"y",
	"ã":"a",		"ĩ":"i","õ":"o","ũ":"u",		"ñ":"n",
	
	"ā":"a","ă":"a","ą":"a",
	"ç":"c","ć":"c","ĉ":"c","ċ":"c","č":"c",
	"ď":"d","đ":"d",
	"ē":"e","ĕ":"e","ė":"e","ę":"e","ě":"e",
	"ĝ":"g","ğ":"g","ġ":"g","ģ":"g",
	"ĥ":"h","ħ":"h",
	"ī":"i","ĭ":"i","į":"i","ı":"i",
	"ĵ":"j",
	"ķ":"k",
	"ĺ":"l","ļ":"l","ľ":"l","ŀ":"l","ł":"l",
	"ń":"n","ņ":"n","ň":"n","ŉ":"n","ŋ":"n",
	"ō":"o","ŏ":"o","ő":"o",
	"ŕ":"r","ŗ":"r","ř":"r",
	"ś":"s","ŝ":"s","ş":"s","š":"s",
	"ţ":"t","ť":"t","ŧ":"t",
	"ũ":"u","ū":"u","ŭ":"u","ů":"u","ű":"u","ų":"u",
	"ŵ":"w",
	"ź":"z","ż":"z","ž":"z"
}

UniformString=function(string){
	return StringReplace(LowerSimpleString(string),CharacterUniformisations);
}

LowerSimpleString=function(string){
	return SafeString(UnWhitespace(string).toLowerCase());
}

SpacedString=function(string){
	return string.replace(/[\n\s\t]+/g," ");
}

LowerSpacedString=function(string){
	return SpacedString(string.toLowerCase().replace(new RegExp("["+EscapeTokens(Tokens())+"]+","g")," "));
}

LowerTrimmedString=function(string){
	return TrimWhitespaceString(SpacedString(string.toLowerCase()));
}

UnquoteString=function(string){
	return string.replaceAll(/\"/ig,"");
}

// Capitalise
LowerCase=function(string){
	if(!string||!string.toLowerCase)
		return "";
	else
		return string.toLowerCase();
}

UpperCase=function(string){
	if(!string||!string.toUpperCase)
		return "";
	else
		return string.toUpperCase();
}


Capitalise=function(word){
	if(word.length)
		return word[0].toUpperCase()+Rest(word).toLowerCase();
	else
		return word;
}

KebabCaseString=function(s){
	return UnExfix(s.replace(/([^A-Za-z0-9\_])+/g,"-"),"-");
/*
simple text
KebabCaseString("How to play")
"How-to-play"

starting hashtag removed
KebabCaseString("#How to play")
"How-to-play"

trailing spaces)
 multiple spaces
KebabCaseString("     How      to    play      ")
"How-to-play"

symbol mash
KebabCaseString("|!\/!How\"#$%&/()=@£§€{[]}'to+*¨¨´´``~~-playçãôÒÌ")
"How-to-play"
*/
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
	return CapitaliseSentence(slug.replaceAll("-"," "));
}

//Escape

PunctuationSeparCharacters=",;.:-?!".split("");
PunctuationParenCaracters="(){}[]«»".split("");
OtherCharacters="_~^*+´`¨''@£§#$%&/|=".split("");

TokenCharacters=PunctuationSeparCharacters.join("")+PunctuationParenCaracters.join("")+OtherCharacters.join("");

Tokens=function(){
	return TokenCharacters;
}

EscapeToken=function(token){
	if(token===" ")
		return "\\s";
	if(!In(Tokens(),token))
		return token;
	else
		return "\\"+token;
}

EscapeTokensString=function(tokenString){
	//var tokenString=tokenString.replaceAll("\\\\","\\");
	return tokenString.split("").map(EscapeToken).join("");
}

EscapeTokens=function(AS){
	if(IsArray(AS))
		return Alternate(AS.map(EscapeTokens));
	return EscapeTokensString(AS);
}


// Prefix and Suffix
// a#bc#d
// UnPrefix	# 		a#bc#d
// UnPosfix	# 		a#bc#d

// UnOverfix	# 		a#bc
// UnUnderfix	# 		  bc#d
// UnAfterfix	# 		a     
// UnBeforfix	# 		     d


UnFixer=function(word,sfix,befor,after,flags){
	if(typeof flags==="undefined")
		var flags="sig";
	if(!word)
		var word="";
	if(!sfix)
		return word;
	if(!IsArray(sfix))
		var sfix=[sfix];
	var pattern=new RegExp(befor+"(("+sfix.map(EscapeTokens).join(")|(")+"))+"+after,flags);
	return word.replace(pattern,"");
}

UnPrefix=function(word,prefix,flags){
	return UnFixer(word,prefix,"^","",flags);
/*
repeated prefix
UnPrefix("antiantiantiall","anti")
"all"
*/
}

UnPosfix=function(word,suffix,flags){
	return UnFixer(word,suffix,"","$",flags);
/*
repeated end, also spaces
UnPosfix("all is well well well"," well")
"all is"

multiple terminations, one
UnPosfix("song.mp3",[".mp3",".wav"])
"song"

multiple terminations, many
UnPosfix("song.mp3.wav",[".mp3",".wav"])
"song"

multiple terminations, many reverse ordered
UnPosfix("song.wav.mp3",[".mp3",".wav"])
"song"

empty suffix list
UnPosfix("song.mp3",[])
"song.mp3"

Repeating sequence
UnPosfix("What !!!?!?.?.?.?",".?")
"What !!!?!?"

Must be at end
UnPosfix("What !!!?!?.?.?.?","?.")
"What !!!?!?.?.?.?"

Any order
UnPosfix("What !!!?!?.?.?.?",[".","?","!"])
"What "
*/
}

Prefix=function(word,prefix){
	if(!word)
		var word="";
	if(!prefix)
		return word;
	return prefix+UnPrefix(word,prefix);
/*
no prefix
Prefix("rie")
"rie"

empty prefix
Prefix("rie","")
"rie"

no name, just prefix
Prefix("","Ma")
"Ma"

prefix absent
Prefix("rie","Ma")
"Marie"

prefix already present, don't duplicate
Prefix("Marie","Ma")
"Marie"
*/
}

Posfix=function(word,suffix){ //suffix
	if(!word)
		var word="";
	if(!suffix)
		return word;
	return UnPosfix(word,suffix)+suffix;
/*
no posfix
Posfix("rie")
"rie"

empty posfix
Posfix("rie","")
"rie"

no name, just posfix
Posfix("","Ma")
"Ma"

posfix absent
Posfix("Ma","rie")
"Marie"

posfix already present, don't duplicate
Posfix("Marie","rie")
"Marie"

posfix with spaces, a clever regex
Posfix("blue"," button")
"blue button"

posfix with spaces, a clever regex (present)
Posfix("blue button"," button")
"blue button"
*/
}

Exfix=function(word,prefix,suffix){
	if(!word)
		var word="";
	var suffix=suffix||prefix;
	return Prefix(Posfix(word,suffix),prefix);
/*
different prefix and suffix
Exfix("ok","(",")")
"(ok)"

same prefix and suffix
Exfix("__","-")
"-__-"
*/
}

UnExfix=function(word,prefix,suffix,flags){
	if(!word)
		var word="";
	var suffix=suffix||prefix;
	return UnPrefix(UnPosfix(word,suffix,flags),prefix,flags);
/*
different prefix and suffix
UnExfix("(ok)","(",")")
"ok"

same prefix and suffix
UnExfix("-__-","-")
"__"
*/
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


UnBeforfix=function(word,prefix,flags){
	return UnFixer(word,prefix,"^.*","",flags);
/*
basic
UnBeforfix("a#bc#d","#")
"d"

repeated
UnBeforfix("a##bc##d","#")
"d"

long prefix
UnBeforfix("somethingantiantiantiall","anti")
"all"
*/
}

UnAfterfix=function(word,suffix,flags){
	return UnFixer(word,suffix,"",".*$",flags);
/*
basic
UnAfterfix("a#bc#d","#")
"a"

repeated
UnAfterfix("a##bc##d","#")
"a"

long prefix
UnAfterfix("all is well well well something"," well")
"all is"
*/
}

Afterfix=function(word,posfix){
	if(!word)
		var word="";
	if(!posfix)
		return "";
	return UnPrefix(word.replace(UnAfterfix(word,posfix),""),posfix);
}

UnOverfix=function(word,posfix,flags){
	if(!word)
		var word="";
	if(!posfix)
		return word;
	var fin=UnBeforfix(word,posfix,flags);
	return UnPosfix(UnPosfix(word,fin,flags),posfix,flags);
/*
basic
UnOverfix("a#bc#d","#")
"a#bc"

repeated
UnOverfix("a##bc##d","#")
"a##bc"
*/
}

Overfix=function(word,posfix){
	if(!word)
		var word="";
	if(!posfix)
		return "";
	return UnPrefix(word.replace(UnOverfix(word,posfix),""),posfix);
}

UnUnderfix=function(word,prefix,flags){
	if(!word)
		var word="";
	if(!prefix)
		return word;
	var ini=UnAfterfix(word,prefix,flags);
	return UnPrefix(UnPrefix(word,ini,flags),prefix,flags);
/*
basic
UnUnderfix("a#bc#d","#")
"bc#d"

repeated
UnUnderfix("a##bc##d","#")
"bc##d"
*/
}

Underfix=function(word,prefix){
	if(!word)
		var word="";
	if(!prefix)
		return "";
	return UnPosfix(word.replace(UnUnderfix(word,prefix),""),prefix);
}



UnLastfix=function(word,prefix,suffix){
	if(!word)
		return "";
	var suffix=suffix||prefix;
	return UnOverfix(UnOverfix(word,suffix),prefix)+Overfix(word,suffix);
/*
Last of several
UnLastfix("ok<maybe>very<not>useful","<",">")
"ok<maybe>veryuseful"

nothing
UnLastfix("ok","<",">")
"ok"

equal prefix and suffix
UnLastfix("ok!maybe!very!not!useful","!")
"ok!maybe!veryuseful"
*/
}

Lastfix=function(word,prefix,suffix){
	if(!word)
		return "";
	var suffix=suffix||prefix;
	return UnBeforfix(UnPosfix(UnPosfix(word,Overfix(word,suffix)),suffix),prefix);
/*
Last of several
Lastfix("ok<maybe>very<not>useful","<",">")
"not"

nothing
Lastfix("ok","<",">")
""

equal prefix and suffix
Lastfix("ok!maybe!very!not!useful","!")
"not"
*/
}

UnFirstfix=function(word,prefix,suffix){
	if(!word)
		return "";
	var suffix=suffix||prefix;
	return Underfix(word,prefix)+UnUnderfix(UnUnderfix(word,prefix),suffix);

/*
Last of several
UnFirstfix("ok<maybe>very<not>useful","<",">")
"okvery<not>useful"

nothing
UnFirstfix("ok","<",">")
"ok"

equal prefix and suffix
UnFirstfix("ok!maybe!very!not!useful","!")
"okvery!not!useful"
*/
}

UnInfix=function(word,prefix,suffix){
	if(!word)
		return "";
	return FixedPoint(word=>UnLastfix(word,prefix,suffix),word);

/*
remove all, keep stuff in between
UnInfix("ok<maybe>very<not>useful","<",">")
"okveryuseful"

nothing
UnInfix("ok","<",">")
"ok"

equal prefix and suffix
UnInfix("ok!maybe!very!not!useful","!")
"okveryuseful"
*/
}



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
ShortenSentence=function(string,maxchars,stoppers,ender){
	var stoppers=stoppers||" ";
	var ender=ender||"..."
	var E=ender.length;
	var LIMIT=Max(0,maxchars-E);
	if(!string)
		return "";
	else{
		if(string.length<=maxchars)
			return string;
		if(LIMIT===0)
			return Take(string,maxchars);
		else{
			if(!In(string,stoppers))
				return Take(string,LIMIT)+ender;
			var unoverstring=Take(string,maxchars);
			var i=maxchars;
			while(i>0&&unoverstring.length>LIMIT){
				unoverstring=UnOverfix(unoverstring,stoppers);
				i++;
			}
			if((unoverstring.length<=LIMIT))
				return unoverstring+ender;
			else
				return Take(string,LIMIT)+ender;
		}
	}
/*
Below limit
ShortenSentence("1234567890",20)
"1234567890"

Exactly at limit
ShortenSentence("1234567890",10)
"1234567890"

Limit below 3 characters
ShortenSentence("1234567890",2)
"12"

No stoppers
ShortenSentence("1234567890",5)
"12..."

Different ender, with different length
ShortenSentence("1234567890",8," ","*****")
"123*****"

Limit at end of word
ShortenSentence("That was fantastic!",11)
"That was..."

Limit inside word
ShortenSentence("That was fantastic!",10)
"That..."

*/
}

DescriptionString=function(html,maxchars){
	var text=StripHTML(html);
		text=UnquoteString(text);
		text=SpacedString(text).replaceAll(/\s([\.\,\!\?])+/ig,"$1");
		text=TrimWhitespaceString(text);
	return ShortenSentence(text,maxchars," ");
}

//Sentence making
Enumerate=function(StringArray,and){
	var and=and||"and";
	if(!StringArray||!StringArray.length)
		return "";
	if(StringArray.length===1)
		return StringArray[0];

	var comma=", ";
	if(StringArray.some(a=>In(a,",")))
		var comma="; ";
	
	var prelast=Last(Most(StringArray));
	var last=Last(StringArray);
	
	if(In(prelast,Exfix(and," "))||In(last,Exfix(and," ")))
		and=LowerAccesser(EnumerationSynonyms)(and);
	
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

EnumerationSynonyms=Merge(EnumerationSynonyms,FlipKeysValues(EnumerationSynonyms));

EnumerateSentence=function(list,and){
	var list=(list||[]).map(s=>UnPosfix(s,PunctuationSeparCharacters));
	var sentence=Enumerate(list,and||"");
	if(sentence)
		sentence=Posfix(sentence,".");
	return Capitalise(sentence);
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
/*
file:///
PageProtocol("file:///D:/Robert/pedropsi.github.io/folder/guestbook.html")
"file:"

https://
PageProtocol("https://pedropsi.github.io/folder/guestbook.html")
"https:"

file://
PageProtocol("http://pedropsi.github.io/folder/guestbook.html")
"http:"

relative
PageProtocol("folder/guestbook.html")
""

www yet relative
PageProtocol("www.xxx.yyy")
""
*/
}

PageUnProtocol=function(url){
	var url=DefaultURL(url);
	url=UnPrefix(url,PageProtocol(url));
	url=UnPrefix(url,"/");
	return url;
/*
file:///
PageUnProtocol("file:///D:/Robert/pedropsi.github.io/folder/guestbook.html")
"D:/Robert/pedropsi.github.io/folder/guestbook.html"

https://
PageUnProtocol("https://pedropsi.github.io/folder/guestbook.html")
"pedropsi.github.io/folder/guestbook.html"

http://
PageUnProtocol("http://pedropsi.github.io/folder/guestbook.html")
"pedropsi.github.io/folder/guestbook.html"

relative
PageUnProtocol("folder/guestbook.html")
"folder/guestbook.html"

www yet relative
PageUnProtocol("www.xxx.yyy")
"www.xxx.yyy"
*/
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
/*
simple html
PageDomain("https://pedropsi.github.io/guestbook.html")
"pedropsi.github.io"

buried file folder
PageDomain("file://E:/Folder1/pedropsi.github.io/status.html")
"pedropsi.github.io"

earliest
PageDomain("https://www.first.com/Folder1/pedropsi.github.io/status.html")
"www.first.com"

nothing but folders
PageDomain("just/folders/and/folders")
""

a final file
PageDomain("just/folders/and/a.file")
""
*/
}


PageFragment=function(url){
	var url=DefaultURL(url);
	return decodeURI(Afterfix(url,"#"));
/*
local tag
PageFragment("file:///D:/Robert/pedropsi.github.io/folder/guestbook.html#one")
"one"

online tag
PageFragment("http://pedropsi.github.io/folder/guestbook.html#one")
"one"

double chained tags
PageFragment("folder/guestbook.html#one#more")
"one#more"

empty tag
PageFragment("https://pedropsi.github.io/folder/guestbook.html#")
""
*/
}

PageUnFragment=function(url){
	var url=DefaultURL(url);
	return UnAfterfix(url,"#");
/*
strange tag
PageUnFragment("https://pedropsi.github.io/gravirinth.html#$%F0%9F%93%B0%C2%BB")
"https://pedropsi.github.io/gravirinth.html"
*/
}

PageReFragment=function(url,fragment){
	return PageUnFragment(url)+(fragment?("#"+fragment):"");
}

PageUnSearch=function(url){
	var url=DefaultURL(url);

	var fragment=PageFragment(url);
		url=PageUnFragment(url);
		url=UnAfterfix(url,"?");
		if(fragment)
			url=url+Prefix(fragment,"#");
	return url;
/*
simple
PageUnSearch("pedropsi.github.io/console.html?game=2")
"pedropsi.github.io/console.html"

with tag
PageUnSearch("pedropsi.github.io/console.html?game=2&level=3#tag")
"pedropsi.github.io/console.html#tag"
*/
}

PageReSearch=function(url,searchstring){
	if(!searchstring)
		return url;
	if(IsObject(searchstring))
		var searchstring=ParameterString(searchstring);
	var fragment=PageFragment(url);
	var url=PageUnSearchFragment(url);
		url=url+Prefix(searchstring,"?");
		url=PageReFragment(url,fragment);
	return url;
}

PageUnSearchFragment=function(url){
	return PageUnFragment(PageUnSearch(url));
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
/*
convoluted folder structure
PageRelativePath("file://E:/Folder1/pedropsi.github.io/important/status.html")
"important/status.html"

convoluted folder structure
PageRelativeFolder("file://E:/Folder1/pedropsi.github.io/important/status.html")
"important"

already relative
PageRelativePath("data/one/two/three.js")
"data/one/two/three.js"

relative with tag
PageRelativePath("data/variables/a.ext#lol")
"data/variables/a.ext"
*/
}

PageFile=function(url){//file only
	var url=DefaultURL(url);
		url=PageRelativePath(url);
	return UnBeforfix(url,"/");
/*
convoluted folder structure
PageFile("file://E:/Folder1/pedropsi.github.io/important/status.html")
"status.html"

relative file
PageFile("data/one/two/three.js")
"three.js"

relative with tag
PageFile("data/variables/a.ext#lol")
"a.ext"
*/
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
/*
file:///
PageIdentifier("file:///D:/Robert/pedropsi.github.io/folder/guestbook.html")
"guestbook"

https://
PageIdentifier("https://pedropsi.github.io/folder/guestbook.html")
"guestbook"

http://
PageIdentifier("http://pedropsi.github.io/folder/guestbook.html")
"guestbook"

relative
PageIdentifier("folder/guestbook.html")
"guestbook"

http no subfolder
PageIdentifier("http://www.xxx.yyy")
"index"

http subfolder
PageIdentifier("http://www.xxx.yyy/great/greater.htm")
"greater"

http file in root folder
PageIdentifier("http://www.xxx.yyy/greater.htm")
"greater"

psi file in root folder
PageIdentifier("https://pedropsi.github.io/guestbook.html")
"guestbook"

UTF
PageIdentifier("https://pedropsi.github.io/gravirinth.html#$%F0%9F%93%B0%C2%BB")
"gravirinth"

duplication of tag in title
PageIdentifier("https://pedropsi.github.io/puzzlescript-games-database#puzzlescript")
"puzzlescript-games-database"

nothing but search
PageIdentifier("https://pedropsi.github.io/?test=true")
"index"
*/
}

PageURL=function(url){
	if(!url)
		return document.URL;
	return url
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
		var l=new URL(page||PageURL());
	l=l.search;
	if(!parameter)
		return l;
	var token=new RegExp(".*\\?.*"+parameter+"\\=");
	var id=l.replace(token,"");
	if(id===l)
		id="";
	return decodeURI(id.replace(/\&.*/,""));
/*
present query string
PageSearch("source","https://pedropsi.github.io/anypage.html?source=homepage")
"homepage"

duplicates, prefer last parameter)
PageSearch("source","https://pedropsi.github.io/anypage.html?source=homepage&source=elsewhere")
"elsewhere"

no string (absent)
PageSearch("source","https://pedropsi.github.io/anypage.html")
""

no wanted string (absent)
PageSearch("source","https://pedropsi.github.io/anypage.html&y=z")
""

no wanted string (absent)
PageSearch("source","https://pedropsi.github.io/puzzle-type?source=homepage&result=success")
"homepage"
*/
}

PageSearchParameters=function(page){
	return SearchParameters(PageSearch(page));
/*
Read Parameters Object from page
PageSearchParameters("www.xxx.yyy?b=a&a=2")
{b:"a",a:"2"}

*/
}

SearchParameters=function(searchString){
	var searchObj={};
	UnPrefix(searchString,"?").split("&").map(parval=>searchObj[UnAfterfix(parval,"=")]=UnBeforfix(parval,"="));
	return searchObj;
}

// Safe string loading
SafeString=function(tex){
	return String(tex).replace(/[\<\>\=\+\-\(\)\*\'\"]/g,"");
/*
no dangers
SafeString("abcd")
"abcd"

tame dangers
SafeString("<script>a=1;b=2-3;function c(){return d}</script>")
"scripta1;b23;function c{return d}/script"
*/
}

SafeUrl=function(tex){
	tex=String(tex||"").replace(/[\<\>\+\(\)\*\'\"\#\\\s]+.*/g,"");
	if(!tex)
		return "";
	var prefix="https://";
	if(In(tex,"http:"))
		prefix="http://";
	return Prefix(tex,prefix);
/*
don't enforce http:
SafeUrl("http://google.com")
"http://google.com"

don't enforce http:
SafeUrl("https://google.com")
"https://google.com"

script attempt
SafeUrl("<script>tame(dangers)</script>")
""
*/
}

//SECONDARY

RelativeLinked=function(url){
	return PageRelativePath(url)===url;
/*
local
RelativeLinked("file:///D:/Robert/pedropsi.github.io/folder/guestbook.html")
false

online
RelativeLinked("http://pedropsi.github.io/folder/guestbook.html")
false

relative domain
RelativeLinked("folder/guestbook.html")
true
*/
}
FileLinked=function(url){
	return PageProtocol(url)==="file:";
}
LocalLinked=function(url){
	return RelativeLinked(url)||FileLinked(url);
/*
local
LocalLinked("file:///D:/Robert/pedropsi.github.io/folder/guestbook.html")
true

online
LocalLinked("http://pedropsi.github.io/folder/guestbook.html")
false

relative domain
LocalLinked("folder/guestbook.html")
true
*/
}

OwnLinked=function(url){
	return PageDomain(url)===PageDomain();
}
FragmentLinked=function(url){
	return !!(PageFragment(url)&&PageUnFragment(url)==="");
/*
Just fragment
FragmentLinked("#Section")
true

No fragment, domain
FragmentLinked("www.xx.yyy")
false

No fragment, parameter
FragmentLinked("?what=1")
false
*/
}

InnerLinked=function(url){
	return LocalLinked(url)||OwnLinked(url)||!PageDomain(url);
/*
local
InnerLinked("file:///D:/Robert/pedropsi.github.io/folder/guestbook.html")
true

absolute domain
InnerLinked("http://pedropsi.github.io/folder/guestbook.html")
true

relative domain
InnerLinked("folder/guestbook.html")
true

online external www
InnerLinked("www.xxx.yyy")
false

online external full http
InnerLinked("http://www.xxx.yyyl")
false

from google
InnerLinked("https://www.google.com/url?q=https%3A%2F%2Fpedropsi.github.io%2Fguestbook.html%23randomsomething")
false

Inner links with fragment
InnerLinked("page.html#Section")
true

Inner links, simple
InnerLinked("page.html")
true

Inner links, parameters
InnerLinked("?p=1")
true
*/
}
OuterLinked=function(url){
	return !InnerLinked(url);
}

ShallowableLinked=function(url){
	return !FragmentLinked(url)&&(RelativeLinked(url)||OwnLinked(url));
}

	
BiJoinPath=function(path,subpath){
	return UnPosfix(path,"/")+"/"+UnPrefix(subpath,"/");
}

JoinPath=ArgumentExtender(BiJoinPath);

GlocalPath=function(urlpath,relativepath){
	if(FileLinked(PageURL()))
		var u="..";
	else
		var u=urlpath;
	return JoinPath(u,relativepath);
}

//NavigateGoToPage

RightPath=function(url){
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
	if(Prefixed(url,"#"))
		return window.location.href=url;
	
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

function NavigateSerial(serial){
	if(history)
		history.pushState({},"",PageReSearch(PageURL(),serial));
	else
		Wnet("cannot navigate to: ",serial);
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


TitleIndexer=function(h){
	return function(t){return IndexSubTitle(t,h)};
}

IndexCaseString=function(text){
	return KebabCaseString(CapitaliseSentence(text));
}

ClosestFragment=function(fragment){
	var fragment=IndexCaseString(fragment);
	if(!fragment)
		return "";
	var matches=IndexTitles.filter(t=>Prefixed(LowerSimpleString(t),LowerSimpleString(fragment))||Prefixed(LowerSimpleString(fragment),LowerSimpleString(t)));
	if(matches.length)
		return First(matches);
	else
		return "";
}

IndexSubTitle=function(t,h){
	t.setAttribute("data-index-depth",h);
	Class(t,"index-item");
	t.id=t.id?t.id:IndexCaseString(t.innerText);
	TitleSelfLink(t);
	return t.id;
}

IndexTag=function(h){
	return GetElements(".main .prose "+h).map(TitleIndexer(h));
}

IndexTitles=[];

TitlesIndex=function(){
	IndexTitles=["h1","h2","h3","h4","h5","h6"].map(IndexTag).flat();
	Shout("TitlesIndex");
	return IndexTitles;
}

PageIndexHTML=function(indexArray){
	return `
		<div class='index'>
			<a class='index-link h1' id='Table-of-Contents' href='#Table-of-Contents' onclick='ShowHideIndex()'>
				Table of contents
			</a>
			${indexArray.map(IndexItemHTML).join(`
			`)}
		</div>`;
}

IndexItemHTML=function(e){
	if(!e||!Classed(e,"index-item"))
		return "";
	else{
		var depth=e.getAttribute("data-index-depth")||"";
		return HeaderAHTML(e.textContent,Prefix(e.id,"#"),{class:"index-link "+depth});
	}
}



AddTitleIndex=function(section){
	var indexArray=GetElements(".index-item",section);
	if(indexArray.length<=1)
		return;
	RemoveElement(".index",section);
	PrependElement(PageIndexHTML(indexArray),section);
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

HTMLIder=function(id){
	return function(content){
		return `<div id="${id}">${content}</span>`;
	}
}

////////////////////////////////////////////////////////////////////////////////
//Load resources

ImageExtensions=["apng","bmp","gif","ico","cur","jpg","jpeg","jp2","jpx","j2k","j2c","jif","jfif","pjpeg","pjp","png","svg","tif","tiff","webp"];

ReSourceExtension=function(src,extensions,defaultext){
	var defaultext=Prefix(defaultext,".");
	if(!extensions.some(ex=>Posfixed(src,Prefix(ex,"."))))
		return Posfix(src,defaultext);
	else
		return src;
}

SourceIdentifier=function(path){
	return PageIdentifier(UnPosfix(UnPosfix(path,".js"),".css"));
}

LoadSource=function(){
	var args=Values(arguments);
	if(NodejsDetected())
		Apply(LoadNodeSource,args);
	else
		Apply(LoadWebSource,args);
}

LoadSources=function(sourceArray,Successer){
	var shoutArray=sourceArray;
	if(!NodejsDetected())
		shoutArray=shoutArray.filter(function(f){return Posfixed(f,".js")}).map(SourceIdentifier);		//discards non-js files plus the folder structure to preserve file name

	HearAll(shoutArray,Successer); 									//waits until the last one is loaded before firing Successer
	sourceArray.map(LoadSource);											//loads asynchronously (each file MUST "Shout" its own identifier upon loading)
	
}

LoadNodeSource=function(source){
	if(Posfixed(source,".css"))
		return;
	var source=UnPosfix(source,".js");
	if(!Prefixed(source,"."))
		source=Prefix(UnPrefix(source,"/"),"../");
	require(source);
}

//Load scripts
LoadWebSource=function(source){
	if(LoadWebSource[source])
		return;

	LoadWebSource[source]=true;
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
	AddElement(`<style id="${id}">${stylesource}</style>`,'head');
}

//Load objects from HTML pages

LoadHTMLObject=function(Obj,Successer){
	var source=Obj.source;
	var name=Obj.name;
	var Successer=Successer||Identity;
	if(!source||!name)
		return "";
	var Reader=function(code){
		var code=IsolateCode(code,name+"=","}}")+"}}";
		LoadCode(`
			${name}=${code};
		`);
		Successer(globalThis[name]);
	}
	LoadData(source,Reader);	
}

///////////////////////////////////////////////////////////////////////////////
//Data Reception

//Network status
Online=function(){return !!navigator.onLine};
Offline=function(){return !Online()};

//Parameter requests
ParameterPairString=function(key,value){
	return encodeURIComponent(key)+'='+encodeURIComponent(value);

/*
Form a parameter pair
ParameterPairString("a",1)
"a=1"
	
Convert spaces to UTF
ParameterPairString("a","how fascinating")
"a=how%20fascinating"
*/
}

ParameterString=function(parametersObject){
	return ThreadKeysValues(parametersObject,ParameterPairString).join("&");

/*
empty string
ParameterString({})
""

From a multi-parameter string
ParameterString({"a":1,"b":2})
"a=1&b=2"
*/
}

//External resources
MacroBareURL=function(c,parametersObject){
	return PageReSearch("https://script.google.com/macros/s/"+c+"/exec",parametersObject);
};

MacroURL=function(parameters){
	return MacroBareURL("AKfycbyvKrxqk9mHkpmVqsmHN0y2jO-8x40zurf4tdS7p2H-KExfnvM",parameters);
}

//Fetch data from url
LoadDataFromNetwork=function(url,Successer,header,FailureF){
	var FailureF=FailureF||Identity;
	var rawFile=new XMLHttpRequest();
	rawFile.open("GET",url,true);
	rawFile.onreadystatechange=function(){
		if(rawFile.readyState===4){
			if(rawFile.status===404){
				Wnet("Nothing found at: ",url,", not necessarily an error!");
				FailureF();
			}
			else if(rawFile.status===200||rawFile.status==0){
				var data=rawFile.responseText;
				if(data===""){
					Wnet("No data received from: ",url,". Connection problems?");
					FailureF();
				}
				else{
					Memory(url,rawFile.responseText,new Date());
					Successer(data);
				}
			}
		}
	}
	if(header)
		rawFile.setRequestHeader("Content-type", header);
	rawFile.send(null);
};

LoadData=function(url,Successer,header,FailureF){
	var saved=Memory(url);
	if(saved&&!MemoryExpired(url))
		return Successer(saved);
	else
		return LoadDataFromNetwork(url,Successer,header,FailureF);
}

///////////////////////////////////////////////////////////////////////////////
// Parsing

IsolateCode=function(code,startstring,endstring){
	var code=code.split("\n").join("").split(/\n/).join("").split(/\t/).join("");
	if(startstring)
		code=UnBeforfix(code,startstring);
	if(endstring)
		code=UnAfterfix(code,endstring);
	return code;
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
/*
IsTag("BODY")
true

IsTag(".random-class")
false

IsTag("#randomid")
false
*/
}
IsClass=function(selector){
	if(!IsString(selector))
		return false;
	return Prefixed(selector,".");
/*
IsClass("BODY")
false

IsClass(".random-class")
true

IsClass("#randomid")
false
*/
}
IsID=function(selector){
	if(!IsString(selector))
		return false;
	return Prefixed(selector,"#");
/*
IsID("BODY")
false

IsID(".random-class")
false

IsID("#randomid")
true
*/
}

IsQuerySelector=function(selector){
	return IsID(selector)||IsClass(selector)||IsTag(selector);
/*
IsQuerySelector("BODY")
true

IsQuerySelector(".random-class")
true

IsQuerySelector("#randomid")
true
*/
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
GetSelectorElement=function(selector,parentElement){
	if(!selector)
		return document.body;
	if(parentElement===null)
		return null;

	if(!parentElement||!parentElement.querySelector)
		var parentElement=document.body;

	try{
		var selector=QuerySelector(selector);
		return parentElement.querySelector(selector);
	}
	catch{
		return null;
	}
};

GetInElement=function(selector,parentElement){
	if(typeof selector==="string")
		return GetSelectorElement(selector,parentElement);
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
			parentElement=GetInElement(pSelector,document);
		else
			parentElement=pSelector;
	}
	return GetInElement(selector,parentElement);
}

//Match Element to selector
QueryAll=function(selector){
	return Array.from(document.querySelectorAll(QuerySelector(selector)));
}

Match=function(node,selector){
	return node.matches&&node.matches(QuerySelector(selector));
}

Matcher=function(selector){
	return function NodeMatch(node){
		return Match(node,selector)
	}
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
GetElements=function(selector,parentIDsel){
	if(!selector||!IsString(selector))
		return [];

	var parent=GetElement(parentIDsel)||document;
	var selector=QuerySelector(selector);

	return Array.from(parent.querySelectorAll(selector));
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
	var match=es.some(Matcher(childIDselString));
	while(es.length>0&&FirstChildren(es).length>0&&!match){
		es=FirstChildren(es);
		match=es.some(Matcher(childIDselString));
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

// Get Parent Element matching particular selector

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
	var p=FirstParentElement(targetIDsel);
	if(!parentIDselString)
		return p;
	while(p&&!In(QueryAll(parentIDselString),p)){
		p=FirstParentElement(p)
	}
	return p
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
			e.outerHTML=htmlOrElement;
			return e;
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
	return p;
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

UnWrapElement=function(elemIDsel,wrapIDsel){
	var e=GetElement(elemIDsel);
	if(!e)
		return null;
	var i=GetElement(wrapIDsel)||e;
	e.outerHTML=i.innerHTML;
}


// Remove Children
RemoveChildren=function(parentIDsel){
	var e=GetElement(parentIDsel);
	while (e&&e.hasChildNodes()){  
		e.removeChild(e.firstChild);
	}
	return e;
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

InSubPart=function(string,subparts){
	var string=UnWhitespace(string);
	var subparts=AccPermutations(subparts,3).map(p=>p.join(""));
	return subparts.some(txt=>InString(string,txt));
}

StringsContained=function(strings,patterntxt){
	var patterntxt=LowerSpacedString(patterntxt);
	if(patterntxt.replace(/\s*/g,"")==="")
		return true;
	var strings=strings.map(LowerSpacedString);
	var subparts=patterntxt.split(" ").filter(Identity);
	var whole=UnWhitespace(strings.join(""));
	return strings.some(celltxt=>InSubPart(celltxt,subparts))&&subparts.every(part=>InString(whole,part));
}

RowFiltered=function(row,patterntxt){
	var strings=GetElements("td",row).map(r=>r.innerText);
	return StringsContained(strings,patterntxt);
}

RowFilterer=function(patterntxt){
	return function(row){
		if(RowFiltered(row,patterntxt))
			UnHideElement(row);
		else
			HideElement(row);
	};
}

TableFilter=function(patterntxt,table){
	var table=GetElement("TBODY",table);
	var rows=GetElements("TR",table);
	rows.map(RowFilterer(patterntxt));
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
	filterHTML=FilterHTML(FunctionName(InputFilterF),uid);
	input=PrependElement(filterHTML,parentSelector);
	if(value!==""&&input.value===""){
		input.value=value;
	}
}

FilterHTML=function(functionname,uid){
	return `
	<input 
		class='input search filter-${uid}'
		placeholder='search ${StringSymbol("search")}'
		onkeyup='${functionname}("${uid}",".filter-${uid}")'>
	</input>`;
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
	if(patterntxt)
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
	var filterString=GetElement(filterSelector).value;
	var parent=GetElement(parentSelector);

	var oldpattern=parent.getAttribute("data-filter");
	if(oldpattern&&TrimWhitespaceString(oldpattern)===TrimWhitespaceString(filterString))
		return;
	else
		parent.setAttribute("data-filter",filterString);

	TableFilter(filterString,parent);
}

FilterableTable=function(tableSelector){
	if(GetElements("TR",tableSelector).length>10){//Only big tables need filtering
		PrependFilterInput(InputFilter,tableSelector);
	}
}


//////////////////////////////////////////////////
// Scroll into (even if the page changes meanwhile)

ScrollOnto=function(elementIDsel){
	var e=GetElement(elementIDsel);
	if(!e)
		return;
	e.scrollIntoView();
	BlinkSelect(e);
	WhileOutViewExecute(e,()=>e.scrollIntoView(),{delay:250,max:10,end:true,enddelay:1000});
}

ScrollInto=function(elementIDsel){
	var e=GetElement(elementIDsel);
	if(e)
		ScrollOnto(e);	
	else if(IsString(elementIDsel)){
		e=ClosestFragment(elementIDsel);
		if(e)
			ScrollOnto(e);
	}
}



////////////////////////////////////////////////////////////////////////////////
// Element Generator

AttributesHTML=function(opts){
	var opts=opts||{};
	delete opts["tag"];
	delete opts["txt"];
	return Keys(opts).map(k=>`${k}='${opts[k]}'`).join(" ");
}

ElementHTML=function(opts){
	var tag=opts.tag?opts.tag:"div";
	var txt=opts.txt?opts.txt:"";
	
	var attribs=AttributesHTML(opts);
	var start=`<${tag} ${attribs}>`
	var end=`</${tag}>`
	if(opts.single)
		return start.replace(/\>$/ig,"/>");
	return `${start}${txt}${end}`;		//txt and tag
};


// Basic Elements

SVGObject=function(opts){
	var path=IsString(opts)?opts:(opts.path||"M 10 10 L 20 10 L 10 20 Z");
	
	var name=opts.name||"unnamed";

	var height=opts.height||opts.width||"20";
	var width=opts.width||opts.height||"20";

	var vbmin=opts.vbmin||SVGPathViewboxMin(path)||`0 0`;
	var vbmax=opts.vbmax||SVGPathViewboxMax(path)||`400 400`;

	var viewBox=opts.viewBox||`${vbmin} ${vbmax}`;

	var cla=opts.cla||"";

	if(opts.transform)
		path=SVGPathTransform(path,opts.transform,viewBox);

	return {
		name:name,
		cla:cla,
		path:path,
		width:width,
		height:height,
		viewBox:viewBox
	}
}

SVGHTML=function(opts){
	var opts=SVGObject(opts);
	return `
		<svg class='iconpath icon-${opts.name} ${opts.cla}' width='${opts.width}' height='${opts.height}' viewBox='${opts.viewBox}'>
			<path d='${opts.path}'/>
		</svg>`;
}

SVGEncodedURL=function(opts){
	var fill=opts.fill?`fill='${opts.fill}' `:"";
	return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' ${fill} width='${opts.width}' height='${opts.height}' viewBox='${opts.viewBox}'%3E%3Cpath d='${opts.path}'/%3E%3C/svg%3E")`
}

SetCursor=function(element,nameSO,Opts){
	var e=GetElement(element);
	if(!e)
		return;
	var Opts=Opts||{};
	if(!nameSO)
		e.style["cursor"]="auto";
	e.style["cursor"]=`${IconEncodedURL(nameSO,Merge({width:40,height:40},Opts))},auto`;
}

IconEncodedURL=function(nameSO,Opts){
	var Opts=Opts||{};
	var Obj=IsString(nameSO)?SymbolIcon(StringSymbol(nameSO)):nameSO;
	var icon=Merge(SVGObject(Obj),Opts);
	return SVGEncodedURL(icon);
}

IconHTML=function(opts){
	return SpanHTML(SVGHTML(opts),"icon");
}

SpanHTML=function(html,clas){
	if(clas)
		var clas=Exfix(clas," class='","'");
	else
		var clas="";
	return "<span"+clas+">"+html+"</span>";
}

HTMLIder=function(id){
	return function(content){
		return `<div class="${id}">${content}</span>`;
	}
}

ButtonHTML=function(attribs){
	var overwritableAttribs={
		tag:"div",
		txt:"???",
		//Context Menu and Select prevention
		oncontextmenu:"(function(e){e.preventDefault()})(event);",
		unselectable:"on",
		onselectstart:"return false;",
		tabindex:"0",
		//Pulse
	}
	var joinableAttribs={
		class:"button selectable underborderable ",
		onclick:"PulseSelect(this); "
	}
	if(attribs.href){
		joinableAttribs.onclick+=`Navigate("${attribs.href}")`;
		delete joinableAttribs["href"];
	}
	var mergedAttribs=Join(joinableAttribs,Merge(overwritableAttribs,attribs));
	return ElementHTML(mergedAttribs);
};

//Links 
AnchorHTML=function(content,ref,attribs){
	var attribs=attribs||{};
		attribs["href"]=ref;
	if(Prefixed(ref,"http"))
		attribs["rel"]="noreferrer noopener";
	if(OuterLinked(ref))
		attribs.class=Posfix(attribs.class||""," outerlink");
	attribs.class=Posfix(attribs.class||""," selectable");
	return ElementHTML(Merge(attribs,{tag:"a",txt:content}));
}

InnerAHTML=function(title,ref,attribs,header){
	var attribs=attribs||{};
	var title=UnPrefix(title,"#");
	if(!header)
		attribs.class=(attribs.class||"")+" innerlink";
	var fragment=PageFragment(ref);
	if(fragment){
		fragment=Prefix(fragment,"#");
		attribs.onclick=`ScrollInto("${fragment}")`;
		return AnchorHTML(title,fragment,attribs)
	}
	else{
		attribs.class=UnPosfix(attribs.class," innerlink");
		return AnchorHTML(title,ref,attribs);
	}
}


HeaderAHTML=function(title,page,attribs){
	var page=PageUnFragment(page);
	var fragment=Prefix(IndexCaseString(title),"#");
	return InnerAHTML(title,page+fragment,attribs,true);
}

FragmentAHTML=function(title,ref,attribs){
	var attribs=attribs||{};
	var title=UnPrefix(title,"#");
		attribs.class=(attribs.class||"")+" innerlink";
	return HeaderAHTML(title,ref,attribs); //self-anchors
}

AHTML=function(title,ref,attribs){
	if(Prefixed(ref,"?")){
		var ref=PageReSearch(PageURL(),ref);
		return AnchorHTML(title,PageUnFragment(ref),Merge(attribs,{class:"innerlink"}));
	}

	if(Prefixed(title,"#"))
		return FragmentAHTML(title,ref,attribs);

	if(typeof ref==="undefined"){
		if(In(title,".html"))
			return AHTML(title,title);
		
		var ref=title;
		var title=CapitaliseSlug(title);
			ref=RightPath(ref);
	}
	
	return AnchorHTML(title,ref,attribs)
}


LabelHTML=function(text,type){
	var type=type||Labels[type]||text;
	return "<sup class='label "+type+"'>"+text+"</sup>";
}

var Labels={
	"New":"",
	"Done":"",
	"Partly":"",
	"Problem":"",
	"Experimental":"Problem"
}

//Abbreviation - Label
L=LabelHTML;

ScrollUpHTML=function(){
	return ButtonHTML({
		txt:ObtainSymbol("scroll-up"),
		class:"scrollTop",
		onclick:"window.scrollTo(0,0)"
	});
}

ViewCounterHTML=function(){
	return DynamicTextHTML("view-counter"," ");
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

TheadHTML=function(headers){
	var headersHTML="";
	if(!headers)
		return "";
	if(IsString(headers))
		headersHTML=headers;
	if(IsArray(headers))
		headersHTML="<th>"+headers.join("</th><th>")+"</th>";
	if(headersHTML)
		headersHTML=`<thead>${headersHTML}</thead>`;
	return headersHTML;
}

TbodyHTML=function(rows){
	var rowsHTML="";
	if(!rows)
		return "";
	if(IsString(rows))
		rowsHTML=rows;
	if(IsArray(rows))
		rowsHTML=rows.map(TRHTML).join("\n")
	if(rowsHTML)
		rowsHTML=`<tbody>${rowsHTML}</tbody>`;
	return rowsHTML;
}

TableHTML=function(Opts){
	var caption=Opts.caption?`<caption><span class="caption">${Opts.caption}</span></caption>`:"";
	return `
	<div class="${Opts.cla||"table"}">
		${caption}
		<table>
			${TheadHTML(Opts.headers||"")}
			${TbodyHTML(Opts.rows||"")}
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
	
	var Orderer=SettingsObj.Orderer;
	var ItemHTML=SettingsObj.ItemHTML;
	var include=SettingsObj.include||{};
	var exclude=SettingsObj.exclude||false;
	var FilterF=SettingsObj.FilterF;
	var max=SettingsObj.max||false;

	var changes=Source;
	if(FilterF)
		changes=Values(FilterValuesObject(changes,FilterF));
	if(include)
		changes=FilterBase(changes,include);
	
	if(exclude){
		var unchanges=FilterBase(changes,exclude);
		changes=Complement(changes,unchanges);
	}

	if(Orderer){
		changes=Sorter(Orderer)(changes);
	}
	
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

CloseButtonHTML=function(targetid){
	return "<div class='closer'>"+ButtonHTML({tag:"span",txt:"&times;",onclick:'CloseCurrentDatapack();CloseWindow(this);'})+"</div>";
}

OkButtonHTML=function(targetid){
	return ButtonHTML({txt:"OK",onclick:'Close(\"'+targetid+'\")'});
}

SubmitButtonHTML=function(DP){
	return ButtonHTML({
		txt:DP.actionText,
		onclick:FunctionName(DP.action)+"(\""+DP.qid+"\")"
	});
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

			HearElement(DP.qid,function(){
				if(DP.shortcutTarget)
					Class(DP.qid,DP.shortcutTarget);
				FocusInside(DP.qid);											//Focus on first question
				if(DP.closeonblur){
					AttendOnce("click",
						function(e){
							if(Outside(DP.qid,e.target)&&Outside(DP.buttonSelector,e.target)){
								Close(DP.qid);
								return true;
							}
						});
				}
			})
			
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
	buAttribs.txt=dataField.qchoicesViewF(choice);
	return ButtonHTML(buAttribs);
};

MultiChoiceButtonHTML=function(choice,dataField,i){
		var args='(\''+dataField.qfield+'\',\''+choice+'\',\''+dataField.pid+'\')';
		var SelectF='ToggleThis(event,this);ToggleData'+args;
		var buAttribs={
			'onclick':SelectF,
			'onfocus':SelectF,
			id:"choice-"+choice,
			txt:dataField.qchoicesViewF(choice)};
		return ButtonHTML(buAttribs);
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
		qdisplay:LaunchBalloon,
		requireConnection:false});
}

LaunchBalloon=function(DP){
	OpenBalloon(QuestionHTML(DP),DP.qid,DP.qtargetid);
}


BalloonHTML=function(avatarHTML,content,id,classExtra){
	var classExtra=classExtra||"";
	var b='<div class="balloon window '+classExtra+'" id='+id+'>'+CloseButtonHTML(id)+'<div class="baloon-content">'+avatarHTML+'<div class="subtitle">'+content+'</div></div></div>';
	return b;
}

OpenBalloon=function(content,id,targetid){
	AddElement(BalloonHTML("",content,id),targetid);
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
	return [["1","2","3","4","5","6","7","8","9","0"],["Q","W","E","R","T","Y","U","I","O","P"],["A","S","D","F","G","H","J","K","L"],["Z","X","C","V","B","N","M"],["undo","redo","space","restart","close"]]};

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
	buAttribs.txt=dataFiel.qchoicesViewF(choice);
	return ButtonHTML(buAttribs);
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

BlinkSelect=function(e){
	Select(e);
	setTimeout(()=>Deselect(e),2000);
}

Deselect=function(selectorE){ 
	UnClass(selectorE,'selected');
}

Selected=function(selectorE){
	return Classed(selectorE,'selected');
}

Classed=function(selectorE,clas){
	var clas=UnPrefix(clas,".")||'selected';
	var e=GetElement(selectorE);
	return e&&e.classList&&e.classList.contains(clas);
}

Toggle=function(selectorE,clas){
	var clas=clas||'selected';
	if(IsString(clas))
		clas=[clas];
	var e=GetElement(selectorE);
	if(e)
		clas.map(c=>e.classList.toggle(UnPrefix(c,".")));
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

FadeElement=function(e,duration){
	var e=GetElement(e);
	if(!e||Classed(e,"faded"))
		return;

	var duration=FadeDuration(duration)

	setTimeout(function(){
		UnClass(e,"closing");
		Class(e,"faded");
	},duration)
	
	e.style.setProperty("--durationFade",""+duration);

	Class(e,"closing");
}

UnFadeElement=function(e,duration){
	var e=GetElement(e);
	if(!e)
		return;

	var duration=FadeDuration(duration)

	setTimeout(function(){
		UnClass(e,"opening");
		UnClass(e,"faded");
	},MillisecondsDuration(duration))

	e.style.setProperty("--durationFade",""+duration);

	Class(e,"opening");
}

ShrinkElement=function(e){
	Class(e,"shrinked");
}
UnShrinkElement=function(e){
	UnClass(e,"shrinked");
}

// Hide

HiddenHTML=function(id,text,fromview){
	var text=text||";"
	var fromview=fromview?"-from-view":"";
	return `<span id='${UnPrefix(id,"#")}' class='hidden${fromview}'>${text}</span>`;
}

UnHideElement=function(selectorE){
	var e=GetElement(selectorE);

	//Restore tabindex
	if(e&&e.dataset.tabindex)
		e.tabindex=e.dataset.tabindex;

	UnClass(e,"hidden");
	return e;
}

UnHideUnFadeElement=function(e,duration){
	UnHideElement(e);
	UnFadeElement(e,duration);
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

FadeDuration=function(n){
	if(typeof n==="undefined")
		return "1s";
	if(IsNumber(n))
		return n+"ms";
	else
		return n;
}

MillisecondsDuration=function(n){
	if(typeof n==="undefined")
		return 1000;
	if(IsNumber(n))
		return n;
	else if(Posfixed(n,"ms"))
		return Number(UnPosfix(n,"ms"));
	else if(Posfixed(n,"s"))
		return Number(UnPosfix(n,"s"))*1000;
	else
		return 1000;
}

OpenElement=function(e,parentIDsel,duration){
	if(!e)
		return;
	e=NewNode(e);
	var duration=FadeDuration(duration)
	UnHideUnFadeElement(e,duration);
	AddElement(e,parentIDsel);
}

CloseElement=function(targetIDsel,parentIDsel,duration,Callback){
	var e=GetElement(targetIDsel,parentIDsel);
	if(e){
		var duration=FadeDuration(duration);
		FadeElement(e,duration);
		setTimeout(function(){
			RemoveElement(targetIDsel,parentIDsel);
			(Callback||Identity)();
		},MillisecondsDuration(duration));
	}
}

CloseWindow=function(e){
	CloseElement(ParentElement(e,".window"));
}

Close=function(targetid,Callback){
	var DP=GetDataPack(targetid);
	if(DP)
		CloseDatapack(DP,Callback);
	else
		CloseElement(targetid,undefined,undefined,Callback);
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

CloseDatapack=function(DP,Callback){
	if(DP){
		Deselect(DP.buttonSelector);
		PulseSelect(DP.qid+" .closer .button");
		UnKeybind(DP.qid);
		DP.closed=true;
		if(DP.qonclose)
			DP.qonclose(DP);
		if(DP.spotlight)
			FocusElement(DP.spotlight);

		CloseElement(DP.qid,undefined,undefined,Callback);
	}
}

CloseCurrentDatapack=function(Callback){
	CloseDatapack(CurrentDatapack(),Callback);
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
	if(DP)
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
InputFocusable=function(e){
	return Classed(e,"input")||In(["INPUT","TEXTAREA"],e.tagName);
}
Focusable=function(e){
	return InputFocusable(e)||Classed(e,"button")||Classed(e,"gif")||e.tagName==="A";//List of element and classes
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

Attend=function(eventName,F,selector){
	var name=eventName+"-"+selector;

	UnAttend(eventName,selector);

	var target=GetElement(selector)||window;
	if(!target.addEventListener)
		return;
		
	if(In(['click','mousedown'],eventName))
		target.addEventListener(eventName,F,{"passive":true})
	else
		target.addEventListener(eventName,F)

	Attend[name]=F;
};

AttendOnce=function(eventName,F,selector){
	var name=eventName+"-"+selector;
	Attend[name]=G;	
	function G(){
		var args=arguments;
		var result=Apply(F,args);
		if(result)
			UnAttend(eventName,selector);
		return result;
	}
	Attend(eventName,G,selector,true);

};

UnAttend=function(eventName,selector){
	var name=eventName+"-"+selector;

	if(!Attend[name])
		return;

	var target=GetElement(selector)||window;
	if(!target.removeEventListener)
		return;
		
	var F=Attend[name];
	delete Attend[name];

	if(In(['click','mousedown'],eventName))
		target.removeEventListener(eventName,F,{"passive":true})
	else
		target.removeEventListener(eventName,F)
};


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

Hear=function(eventName,F,target){ //execute if heard or keep listening
	if(Shouted(eventName)&&!target)
		F();
	else
		Listen(eventName,F,target);
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
HearAll=function(shoutArray,Successer){
	function Heard(shoutcode){
		if(!Heard.array)
			Heard.array=[];

		Heard.array.push(shoutcode);
		Heard.array=Unique(Heard.array);

		//console.log("heard so far:",Heard.array)

		if(Equal(Heard.array,Unique(shoutArray)))
			Successer();
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
// Drag Action

ElementComputedHeight=function(e){
	var e=GetElement(e);
	if(e===Window)
		return window.innerHeight;
	if(!e)
		return 0;
	var px=window.getComputedStyle(e).getPropertyValue('height');
	return Number(UnPosfix(px,"px"));
}

ElementComputedWidth=function(e){
	var e=GetElement(e);
	if(e===Window)
		return window.innerWidth;
	if(!e)
		return 0;
	var px=window.getComputedStyle(e).getPropertyValue('width');
	return Number(UnPosfix(px,"px"));
}

XYHandler=function(Action){
	if(!Action)
		return Identity;
	return function(e){
		if(e.cancelable)
			e.preventDefault();
		
		var el=GetElement(e.target);

		var r=el.getBoundingClientRect();
		if(e.touches&&e.touches[0])
			var e=e.touches[0];
		var X=(e.clientX-r.left);
		var Y=(e.clientY-r.top);

		Action(X,Y,r.right-r.left,r.bottom-r.top,e.target);
	}
}

AttendDrag=function(Actions,target){
	if(!Actions||!Actions["drag-on"]&&!Actions["drag-on-alt"])
		return;
	var Actions=Clone(Actions);
	var Starter=function(ev){
		if(ev.cancelable)
			ev.preventDefault();

		var name=false;
		if(ev.touches&&ev.touches.length>=2)//multi-finger touch
			name="drag-on-"+ev.touches.length;
		else if(ev.buttons>2)
			name="drag-on-mid";
		else if(ev.which===1||ev.touches)
			name="drag-on";
		else
			name="drag-on-alt";
		
		//Start
		XYHandler(Actions[name]||Identity)(ev);
		
		var Executer=XYHandler(Actions["drag-continue"]||Identity);

		Attend("mousemove",Executer,target);
		Attend("touchmove",Executer,target);
		var Ender=function(ev){
			ev.preventDefault();
			XYHandler(Actions["drag-off"]||Identity)(ev);
			UnAttend("mousemove",target);
			UnAttend("touchmove",target);
			UnAttend("mouseup",target);
			UnAttend("touchend",target);
		}
		Attend("mouseup",Ender,target);
		Attend("touchend",Ender,target);
	}
	Attend("mousedown",Starter,target);
	Attend("touchstart",Starter,target);
};

// Wheel
 

AttendWheel=function(Actions,target,delay){
	if(!Actions["wheel-up"]&&!Actions["wheel-down"])
		return;
	function Wheeler(event){	
		var name=false;
		if(event.deltaY>0)
			name="wheel-down";
		else if(event.deltaY<0)
			name="wheel-up";
		else if(event.deltaX>0)
			name="wheel-right";
		else if(event.deltaX<0)
			name="wheel-left";
		if(name){
			Executer=function(){
				event.preventDefault();
				Evaluate(Accesser(Actions)(name),target);
			}
			FastExecuter=function(){
				//do not event.preventDefault() so users can escape with the mouse wheel
				Evaluate(Accesser(Actions)("fast-"+name),target);
			}
			if(delay)
				Throttle(Executer,delay,name,FastExecuter);
			else
				Executer();
		}
	}
	Attend("wheel",Wheeler,target);
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
			ConsoleAdd("<b>Network offline...</b> Submission saved - will be re-sent when back online.");
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
	if(InputFocusable(elem)&&elem.dataset&&(typeof elem.dataset[field]!=="undefined"))
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
	var type=type?(" "+type):"";
	var id=id||GenerateId();
	return `<div class="modal window ${type}" id="${id}">
			<div class="modal-frame">
				${CloseButtonHTML(id)}
				<div class="modal-content">
					${content}
				</div>
			</div>
		</div>`;
}

OpenModal=function(content,id,target){
	var id=id||GenerateId();
	var target=target||"body"
	AddElement(ModalHTML(content,id),target);
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

HTMLPattern=function(tags){
	if(IsString(tags))
		var tags=[tags];
	tags=Alternate(tags.map(t=>Prefix(t,"?:")));
	return new RegExp(`\\<(${tags})(?:.|\\n)*\\<\\/\\1\\>`,"mig");
}

TextReadDuration=function(textstring){ //by counting number of words, 250ms per word
	var textstring=textstring.replace(HTMLPattern(["span","svg"])," oneword ");
	return Min(Max(1000,(textstring.split(/\s+/).length)*250),10000);
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



//DataPack integration in console
LaunchConsoleMessage=function(DP){
	ConsoleAdd(QuestionHTML(DP),undefined,undefined,DP.qid);
}

LaunchConsoleThanks=function(DP){
	ConsoleAdd(DP.thanksmessage);
}



///////////////////////////////////////////////////////////////////////////////
//Contextual Shortcuts

DefaultKeybindings={
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
	".buttonrow":{
		"up":FocusPrevBounded,
		"down":FocusNextBounded,
		"left":FocusPrevBounded,
		"right":FocusNextBounded
	},
	".button":{
		"enter":ClickStay,
		"space":ClickStay,
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
	}
}

var BlockedKeylists={
	".input":["space"]
}

BlockedKeylists[".input"]=Join(BlockedKeylists[".input"],AlphanumericCharacters);

var Keybindings={};


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

	return ReKeyObject(context,LowerCase);
}

ElementContext=function(targetSelector){
	var elem=GetElement(targetSelector);
	if(!elem){
		return Warn("no element for context",targetSelector); //Add last context
	}

	var e=elem;
	var context=SubContext(e)||{};
	var subcontext;

	while(e.parentElement&&!ContextLimited(e)){
		e=e.parentElement;
		subcontext=SubContext(e);
		if(!subcontext)
			subcontext={};
		context=Merge(subcontext,context);
	}

	context=ExcludeContext(context,elem);

	return context;
}

ContextLimited=function(e){
	return Classed(e,"window")//||InputFocusable(e);
}

ExcludeContext=function(context,elem){
	var exclusions=Keys(BlockedKeylists).filter(sel=>Match(elem,sel));
	if(exclusions.length){
		exclusions=exclusions.map(b=>BlockedKeylists[b].map(ComboKeystring));
		exclusions=Appy(Union,exclusions);
		exclusions.map(b=>delete context[b]);
	}
	return context;
}


SubContext=function(elem){
	var bindings=Join(DefaultKeybindings,Keybindings);
	var matches=Keys(bindings).filter(sel=>Match(elem,sel));
	if(!matches.length)
		return undefined;

	var keyActions=matches.map(k=>bindings[k]);
		keyActions=Apply(Join,keyActions);

		keyActions=ReKeyObject(keyActions,ComboKeystring);
		
	return keyActions;
}


//Add Shortcuts
Keybind=function(keyActions,selector){
	var selector=selector||"BODY";
	var keyActions=ReKeyObject(keyActions,ComboKeystring);
	var bindings={}
		bindings[selector]=keyActions;
	return Keybindings=Join(Keybindings,bindings);
}

UnKeybind=function(selector){
	if(Keybindings[selector])
		delete Keybindings[selector];
	return Keybindings;
}



///////////////////////////////////////////////////////////////////////////////
//Keyboard input

ActionPatterns={
	"ctrl":/(co?n?tro?l)|(co?mm?a?n?d)/ig,
	"shift":/(sh?i?ft?)|(uppe?r)/ig,
	"alt":/(alt)|(opti?o?n?)/ig,
	"enter":/(ente?r)|(re?tu?rn)/ig,
	"backspace":/ba?c?k?spa?ce?/ig,
	"space":/(^|[^ck])spa?ce?b?a?r?/ig,
	"rightclick":/ri?g?h?t?clic?k?/ig, //solve issue
	"click":/((le?f?t?)|[^rightmouse\-]|^)clic?k?/ig,
	"drag":/([^tp2mouse\-]|^)dra?g?/ig,
	"move":/mo?ve?/ig,
	"wheelup":/wh?e?e?l?up?/ig,
	"wheeldown":/wh?e?e?l?do?w?n?/ig
}

ActionKeys=function(keystring){
	if(!keystring)
		return [];
	return Keys(ActionPatterns).filter(
		key=>keystring.replace(ActionPatterns[key],"")!==keystring
	);
}

UnActionsKeyString=function(keystring){
	if(!keystring)
		return "";
	return Fold(UnActionKeyString,keystring,ActionKeys(keystring));
}

UnActionKeyString=function(keystring,actionKey){
	var actionKey=First(ActionKeys(actionKey));
	var keystring=keystring.replaceAll(ActionPatterns[actionKey],"");
	return LowerTrimmedString(keystring);
}

ReActionsKeyString=function(keystring){
	if(!keystring)
		return "";
	return Fold(ReActionKeyString,keystring,ActionKeys(keystring));
}

ReActionKeyString=function(keystring,actionKey){
	var actionKey=First(ActionKeys(actionKey));
	var keystring=Prefix(UnActionKeyString(keystring,actionKey),actionKey+" ");
	return LowerTrimmedString(keystring);
}


//Canonical Keystring Combo
EventKeystring=function(event){
	var keystring=
	(event.ctrlKey? "ctrl " :"")+
	(event.altKey?  "alt "  :"")+
	(event.shiftKey?"shift ":"")+
	KeyNumberLookup(event.keyCode);
	keystring=ComboKeystring(keystring);
	return keystring;
}

ComboKeystring=function(key){
	if(typeof key==="number")
		return ComboKeystring(KeyNumberLookup(key));
	else
		return ReActionsKeyString(key);
}

KeyNumberLookup=function(keynumber){
	return Accesser(CodeKeys,String,()=>"")(keynumber);
}

KeyCodes={
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
	'up':38,
	'right':39,
	'down':40,
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
};

CodeKeys=FlipKeysValues(KeyCodes);


//Key Capturing
ComboKeyPressHandler=function(event){
	event=event||window.event;
	var keystring=EventKeystring(event);
	var context=Context();

	if(In(context,keystring)){
		event.preventDefault();
		context[keystring](event);
	}
	PressingComboKeys(keystring);
}

PressingComboKeys=function(keystring,excluded){
	if(!PressingComboKeys.list)
		PressingComboKeys.list=[];
	var keys=keystring.split(" ");
	if(!excluded)
		PressingComboKeys.list=Union(PressingComboKeys.list,keys);
	else
		PressingComboKeys.list=Complement(PressingComboKeys.list,keys);
	return PressingComboKeys.list;
}

UnPressingComboKeys=function(){
	PressingComboKeys.list=[];
}

ComboKeyUnPressHandler=function(event){
	event=event||window.event;
	var keystring=EventKeystring(event);
	PressingComboKeys(keystring,true);
}

KeyHeld=function(key){
	return In(PressingComboKeys.list||[],key)
}

KeyComboHeld=function(keycombo){
	var keys=ComboKeystring(keycombo);
	return keys.split(" ").every(KeyHeld);
}

//Key Capturing Setters
StopCapturingKeys=function(OnKeyDown){
	document.removeEventListener('keydown',OnKeyDown);
	document.removeEventListener('keyup',ComboKeyUnPressHandler);
	document.addEventListener('blur',UnPressingComboKeys);
}
ResumeCapturingKeys=function(OnKeyDown){
	StopCapturingKeys(OnKeyDown);
	document.addEventListener('keydown',OnKeyDown);
	document.addEventListener('keyup',ComboKeyUnPressHandler);
	document.addEventListener('blur',UnPressingComboKeys);
}



//Datapack Integration
SetDatapackShortcuts=function(DP){
	if(DP.shortcutTarget)
		var target="."+DP.shortcutTarget;
	else
		var target=DP.qid;
	return Keybind(DP.shortcutExtras,target);
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

//Prevent execution unless time cooldown exceeded, in ms
Throttle=function(F,cooldown,name,AltF){
	var name=name||FunctionName(F);
	var AltF=AltF||False;
	if(!Throttle[name]||Date.now()-Throttle[name]>=cooldown){
		Throttle[name]=Date.now();
		return F();
	}
	return AltF();
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
			Wnet("Timed out: ",n);
	}
}

function OnceDelayer(Executer){
	var name=FunctionName(Executer);
	if(!OnceDelayer[name]){
		OnceDelayer[name]=true;
		return function(){
			var args=Values(arguments);
			setTimeout(function(){Apply(Executer,args)});
		}
	}
	else
		return Identity;
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
SequenceSchedule=function(Obj){
	
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

ScheduleList=function(name){
	return SequenceSchedule[name]||[];
}

ClearSchedule=function(name){
	if(SequenceSchedule[name]){
		SequenceSchedule[name].map(clearTimeout);
		SequenceSchedule[name]=[];
	}
}


Kinemate=function(Objs){
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

DateName=function(date,opts){
	return `${DayNamer(date,opts||{})} of ${MonthYearNamer(date)}`;
}

DayNamer=function(date,opts){
	if(!date)
		return MonthYearNamer(Today());
	var st=DayST(Day(date));
	if(!opts||!opts.simplified)
		st=`<sup>${st}</sup>`;
	return `${WeekDay(date,DayNames())}, ${Day(date)}${st}`;
}

MonthYearNamer=function(date){
	if(!date)
		return MonthYearNamer(Today());
	return `${MonthName(Month(date),Months())} ${Year(date)}`;
}

DateRSS=function(date){
	if(!date)
		return DateRSS(Today());
	return `${WeekDay(date,DayNamesShort())}, ${Day(date)} ${MonthName(Month(date),MonthsShort())} ${Year(date)}`;
}


var DatePatterns={
	"DMY":{
		pattern:/^((?:[012]\d)|(?:30|31))[-\/\\\s\.]((?:0\d)|(?:10)|(?:11)|(?:12))[-\/\\\s\.](\d\d\d\d)$/ig,
		order:["$1","$2","$3"]
	},
	"YMD":{
		pattern:/^(\d\d\d\d)[-\/\\\s\.]((?:0\d)|(?:10)|(?:11)|(?:12))[-\/\\\s\.]((?:[012]\d)|(?:30|31))$/ig,
		order:["$3","$2","$1"]
	}
	//Month name patterns to do
}
StringPatternDate=function(string,patternObj){
	var p=patternObj.pattern;
	if(string.match(p)){
		var dmy=patternObj.order.map(s=>string.replace(p,s));
		return Apply(DateDate,dmy);
	}
	else
		return false;
}

StringDate=function(string){
	var patternNames=Keys(DatePatterns);
	var i=0;
	var found=false;
	while(!found&&i<patternNames.length){
		found=StringPatternDate(string,DatePatterns[patternNames[i]]);
		i++;
	}
	return found;
}

StringDateName=function(string,opts){
	return DateName(StringDate(string),opts||{});
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

	//Pointers
	"cursor":{path:"M 10 0 L 0 30 L 8 29 L 9 40 L 11 40 L 12 29 L 20 30 Z",vbmin:"-10 -10",vbmax:"40 40"},
	"cursor2":{path:"M 11 0 L 0 30 L 8 29 L 9 40 L 11 40 L 12 29 L 15 20 Z M 20 6 L 14 31 L 19 30 L 21 37 L 22 30 L 27 31 L 20 6 Z",vbmin:"-10 -10",vbmax:"40 40"},
	"hand":{path:"M 7 25 Q 6 0 9 0 Q 12 0 12 3 L 12 20 Q 12 17 15 17 Q 18 17 18 22 Q 18 18 21 18 Q 24 18 24 24 Q 24 21 26 21 Q 28 21 28 30 Q 27 39 17 40 Q 8 41 6 37 Q -1 23 1 17 Q 3 13 6 22 Z",vbmin:"-10 -10",vbmax:"40 40"},
	"hand2":{path:"M 7 25 Q 6 0 9 0 Q 12 0 12 3 L 12 20 Q 12 17 15 17 Q 18 17 18 22 Q 18 5 21 6 Q 23 6 24 24 Q 24 21 26 21 Q 28 21 28 30 Q 27 39 17 40 Q 8 41 6 37 Q -1 23 1 17 Q 3 13 6 22 Z",vbmin:"-10 -10",vbmax:"40 40"},
	"wheel":{path:"M 1 3 L 1 21 Q 1 25 5 23 Q 12 20 7 8 Q 9 7 8 5 Q 7 3 5 4 Q 1 -2 1 3 Z",vbmax:"25 25"},
	
	//Effects
	"clickld":{path:"M 4 3 Q 4 6 0 8 Q 1 3 4 3 Z",vbmin:"0 -10",vbmax:"20 10"},
	"clicklu":{primitive:"clickld",transform:"flip-vertical"},
	"clickru":{primitive:"clicklu",transform:"flip-horizontal"},
	"clickrd":{primitive:"clickru",transform:"flip-vertical"},
	"clicklurd":{primitive:["clickld","clicklu","clickrd","clickru"]},

	"click2ld":{path:"M 18 6 Q 18 9 13 11 Q 15 6 18 6 Z",vbmin:"0 -10",vbmax:"45 15"},
	"click2lu":{primitive:"click2ld",transform:"flip-vertical"},
	"click2ru":{primitive:"click2lu",transform:"flip-horizontal"},
	"click2rd":{primitive:"click2ru",transform:"flip-vertical"},
	"click2lurd":{primitive:["click2ld","click2lu","click2rd","click2ru"]},

	"dragl":{path:"M 6 10 Q 0 10 0 0 Q 0 -7 13 -6 Q 46 0 38 2 Q 18 2 13 10 L 13 9 Q 17 1 38 1 Q 42 0 13 -5 Q 4 -5 3 0 Q 2 8 6 9 Z",vbmax:"50 50"},
	"dragu":{primitive:"dragl",transform:"rotate-270"},
	"dragr":{primitive:"dragl",transform:"flip-horizontal"},
	"dragd":{primitive:"dragu",transform:"flip-vertical"},

	"swipel":{path:"M 17 2 Q 26 9 62 3 Q 11 20 17 2 Z",vbmax:"50 50"},
	"swipeu":{primitive:"swipel",transform:"rotate-270"},
	"swiper":{primitive:"swipel",transform:"flip-horizontal"},
	"swiped":{primitive:"swipeu",transform:"flip-vertical"},

	"hold":{path:"M 6 10 Q 0 10 0 0 Q 0 -10 10 -10 Q 20 -10 20 0 Q 20 10 13 10 L 13 9 Q 19 9 19 0 Q 19 -9 10 -9 Q 1 -9 1 0 Q 1 9 6 9 Z",vbmax:"50 50"},
	
	"wheel-arrow-u":{path:"M 9 0 L 17 2 L 14 3 Q 20 12 10 11 Q 17 11 12 5 L 11 7 Z",vbmax:"25 25"},
	"wheel-arrow-d":{primitive:"wheel-arrow-u",transform:"flip-vertical"},
	"wheel-arrow-ud":{path:"M 9 0 L 17 2 L 14 3 Q 22 10 15 14 L 18 15 L 12 15 L 14 10 L 14 13 Q 19 10 12 5 L 11 7 Z",vbmax:"25 25"},

	//Gestures 
	"tap":{primitive:["hand","clicklurd"],vbmax:"50 50"},
	"tap2":{primitive:["hand2","click2lurd"],vbmax:"50 50"},
	
	"tapdrag":{primitive:["hand","dragl"],vbmax:"50 50"},
	"tap2drag":{primitive:["hand2","dragl"],vbmax:"50 50"},
	
	"taphold":{primitive:["hand","hold"],vbmax:"50 50"},
	"mousehold":{primitive:["cursor","hold"],vbmax:"50 50"},

	"wheel-up":{primitive:["wheel","wheel-arrow-u"]},
	"wheel-down":{primitive:"wheel-up",transform:"flip-vertical"},

	"swipe-left"	:{primitive:["hand","swipel"],vbmax:"50 50"},
	"swipe-up":{primitive:"swipe-left",transform:"rotate-270"},
	"swipe-right":{primitive:"swipe-left",transform:"flip-horizontal"},
	"swipe-down":{primitive:"swipe-up",transform:"flip-vertical"},

	"cursor-click":{primitive:["cursor","clicklurd"],vbmax:"50 50"},
	"cursor-click2":{primitive:["cursor2","click2lurd"],vbmax:"50 50"},
	"mousedrag":{primitive:["cursor","dragl"],vbmax:"50 50"},
	"mouse2drag":{primitive:["cursor2","dragl"],vbmax:"50 50"},
	"mousehold":{primitive:["cursor","hold"],vbmax:"50 50"},

	//Other
	"left":	{path:"M 5 8 L 5 9 L 0 5 L 5 1 L 5 2 L 3 5 Z M 4 5 L 5 6 L 10 5 L 5 4 Z",vbmax:"10 10"},
	"up":	{primitive:"left",transform:"rotate-270"},
	"right":{primitive:"left",transform:"flip-horizontal"},
	"down":	{primitive:"left",transform:"rotate-90"},

	"enter":{path:"M 7 6 L 7 0 L 9 0 L 9 8 L 4 8 L 4 10 L 0 7 L 4 4 L 4 6 Z",vbmax:"10 10"},
	"backsp":{path:"M 4 15 L 10 23 L 28 23 L 28 7 L 10 7 L 8 5 L 30 5 L 30 25 L 8 25 L 0 15 L 8 5 L 10 7 Z M 22 21 L 24 19 L 20 15 L 24 11 L 22 9 L 18 13 L 14 9 L 12 11 L 16 15 L 12 19 L 14 21 L 18 17 Z",vbmax:"30 30"},
	"delete":{primitive:"backsp",transform:"flip-horizontal"},

	"how-to-play":{path:"M 18 1 C 10 1 7 7 9 14 C 9 14 13 13 13 13 C 12 8 14 5 18 5 C 23 5 25 12 19 15 C 15 17 14 19 13 24 L 17 25 C 18 21 18 19 21 18 C 30 15 29 1 18 1 Z M 14 28 C 9 28 9 35 14 35 C 19 35 19 28 14 28 Z",vbmax:"36 36"},
	"credits":{path:"M 7 1 Q 13 1 13 7 Q 13 13 7 13 Q 1 13 1 7 Q 1 1 7 1 L 7 2 Q 2 2 2 7 Q 2 12 7 12 Q 9 12 11 10 L 9 8 Q 8 9 7 9 Q 5 9 5 7 Q 5 5 7 5 Q 8 5 9 6 L 11 4 Q 9 2 7 2 Z",vbmax:"14 14"},
	"undo":{path:"M 106 149 L 58 127 L 85 242 L 194 192 L 152 170 C 240 56 333 138 346 248 L 394 246 C 377 59 215 7 106 149",vbmin:"0 -50",vbmax:"400 400"},
	"redo":{primitive:"undo",transform:"flip-horizontal"},
	"restart":{path:"M 180 90 L 252 188 L 264 145 C 348 211 307 320 225 340 C 144 360 40 267 129 139 L 92 118 C -23 262 110 418 238 384 C 370 350 398 174 277 98 L 291 42 Z"},
	"fullscreen":{path:"M 236 85 L 309 85 L 309 154 L 346 154 L 346 48 L 236 48 L 236 85 M 38 200 L 75 200 L 75 121 L 148 121 L 148 84 L 38 84 L 38 200 M 38 363 L 148 363 L 148 326 L 75 326 L 75 253 L 38 253 L 38 363 M 272 326 L 199 326 L 199 363 L 309 363 L 309 253 L 272 253 L 272 326"},
	"save":{path:"M 0 0 L 0 23 L 23 23 L 23 0 Z M 6 1 L 6 8 L 20 8 L 20 1 L 22 1 L 22 22 L 20 22 L 20 11 L 3 11 L 3 22 L 1 22 L 1 1 Z M 14 1 L 14 6 L 16 6 L 16 1 L 19 1 L 19 7 L 7 7 L 7 1 Z M 19 12 L 19 22 L 4 22 L 4 12 Z M 6 13 L 6 15 L 17 15 L 17 13 Z M 6 16 L 6 18 L 17 18 L 17 16 Z M 6 20 L 6 21 L 17 21 L 17 19 L 6 19",vbmax:"24 24"},
	"feedback":{path:"M 7 139 L 7 274 L 393 274 L 393 4 L 7 4 L 7 139 M 301 42 L 198 146 L 94 41 L 301 41 M 355 41 L 355 237 L 44 237 L 44 47 L 197 200 L 355 42 M 58 307 L 58 379 L 95 379 L 95 307 L 58 307 M 305 307 L 304 379 L 341 379 L 341 307 L 304 307 M 181 337 L 181 392 L 218 392 L 218 337 L 181 337"},
	"hint":{path:"M 327 36 L 152 207 C 128 190 88 188 59 203 C -16 240 -8 352 71 379 C 153 406 225 319 181 235 L 228 188 L 252 211 L 279 185 L 255 161 L 278 139 L 316 177 L 343 150 L 308 117 L 332 93 L 366 127 L 393 100 L 327 37 M 118 234 C 162 248 172 305 136 333 C 100 363 44 336 44 288 C 44 250 82 222 118 234"},
	"keyboard":{path:"M 0 88 L 0 177 200 177 L 400 177 400 88 L 400 0 200 0 L 0 0 0 88 M384 88 L 384 161 200 161 L 15 161 15 88 L 15 15 200 15 L 384 15 384 88 M30 41 L 30 53 42 53 L 55 53 55 41 L 55 29 42 29 L 30 29 30 41 M69 41 L 69 53 81 53 L 94 53 94 41 L 94 29 81 29 L 69 29 69 41 M108 41 L 108 53 121 53 L 133 53 133 41 L 133 29 121 29 L 108 29 108 41 M148 41 L 148 53 160 53 L 173 53 173 41 L 173 29 160 29 L 148 29 148 41 M187 41 L 187 53 199 53 L 212 53 212 41 L 212 29 199 29 L 187 29 187 41 M226 41 L 226 53 239 53 L 251 53 251 41 L 251 29 239 29 L 226 29 226 41 M266 41 L 266 53 278 53 L 291 53 291 41 L 291 29 278 29 L 266 29 266 41 M305 41 L 305 53 317 53 L 330 53 330 41 L 330 29 317 29 L 305 29 305 41 M344 41 L 344 53 357 53 L 369 53 369 41 L 369 29 357 29 L 344 29 344 41 M30 87 L 30 98 42 98 L 55 98 55 87 L 55 75 42 75 L 30 75 30 87 M69 87 L 69 98 81 98 L 94 98 94 87 L 94 75 81 75 L 69 75 69 87 M108 87 L 108 98 121 98 L 133 98 133 87 L 133 75 121 75 L 108 75 108 87 M148 87 L 148 98 160 98 L 173 98 173 87 L 173 75 160 75 L 148 75 148 87 M187 87 L 187 98 199 98 L 212 98 212 87 L 212 75 199 75 L 187 75 187 87 M226 87 L 226 98 239 98 L 251 98 251 87 L 251 75 239 75 L 226 75 226 87 M266 87 L 266 98 278 98 L 291 98 291 87 L 291 75 278 75 L 266 75 266 87 M305 87 L 305 98 317 98 L 330 98 330 87 L 330 75 317 75 L 305 75 305 87 M344 87 L 344 98 357 98 L 369 98 369 87 L 369 75 357 75 L 344 75 344 87 M30 134 L 30 147 53 147 L 77 147 77 134 L 77 121 53 121 L 30 121 30 134 M93 134 L 93 147 200 147 L 307 147 307 134 L 307 121 200 121 L 93 121 93 134 M322 134 L 322 147 346 147 L 369 147 369 134 L 369 121 346 121 L 322 121 322 134",vbmax:"400 180"},
	"wrench":{path:"M 20 1 L 14 4 L 14 13 L 1 27 L 3 29 L 17 16 L 26 16 L 29 10 L 27 10 L 24 13 L 19 13 L 17 11 L 17 6 L 20 3 Z",vbmax:"30 30"},
	"edit":{path:"M 326 10 L 85 252 L 151 317 L 392 75 L 327 10 M 339 75 L 151 263 L 139 252 L 327 64 L 339 75 M 81 257 L 21 383 L 145 321 L 81 257"},
	"pencil":{path:"M 305 373 L 64 131 L 130 66 L 371 308 Z M 318 308 L 130 120 L 118 131 L 306 319 Z M 60 126 L 0 0 L 124 62 Z M 310 379 Q 346 414 381 379 Q 412 348 376 313 Z"},
	"pencil-erase":{path:"M 91 24 L 332 266 L 266 331 L 25 89 Z M 78 89 L 266 277 L 278 266 L 90 78 Z M 336 271 L 396 397 L 272 335 Z M 86 18 Q 50 -17 15 18 Q -16 49 20 84 Z"},
	"eraser":{path:"M 41 11 L 15 2 L 13 8 L 39 17 Z M 38 20 L 12 11 L 8 23 L 34 32 Z M 14 2 L 11 1 Q 5 -1 3 5 L 1 12 Q -1 19 5 21 L 8 22 Z M 35 31 L 38 32 L 45 13 L 42 12 Z"},
	"cursor-triangle":{path:"M 0 0 L 25 0 L 0 25 Z"},

	"sun":{path:"M 14 10 Q 14 6 10 6 Q 6 6 6 10 Q 6 14 10 14 Q 14 14 14 10 Z M 11 0 L 11 4 L 9 4 L 9 0 Z M 11 20 L 11 16 L 9 16 L 9 20 Z M 20 11 L 16 11 L 16 9 L 20 9 Z M 0 11 L 4 11 L 4 9 L 0 9 M 3 2 L 6 5 L 5 6 L 2 3 Z M 20 11 L 16 11 L 16 9 L 20 9 M 17 2 L 14 5 L 15 6 L 18 3 Z M 17 18 L 14 15 L 15 14 L 18 17 Z M 3 18 L 6 15 L 5 14 L 2 17 Z",vbmax:"20 20"},
	"moon":{path:"M 3 10 Q 3 0 16 0 Q 10 1 8 6 Q 6 10 8 14 Q 10 19 16 20 Q 3 20 3 10",vbmax:"20 20"},

	"eye":{path:"M 32 21 L 32 32 L 36 22 Q 41 23 41 30 Q 41 39 32 39 Q 23 39 23 30 Q 23 21 32 21 M 39 16 Q 46 18 47 30 Q 46 44 32 45 Q 18 44 17 30 Q 18 16 32 15 L 32 16 Q 19 17 18 30 Q 19 43 32 44 Q 45 43 46 30 Q 45 19 38 17 L 39 16 M 32 11 Q 52 11 64 30 Q 52 49 32 49 Q 13 49 0 30 Q 12 11 32 11 L 32 15 Q 14 15 5 30 Q 14 45 32 45 Q 50 45 59 30 Q 50 15 32 15 Z",vbmax:"65 65"},//"👁",
	"magnifying-glass":{path:"M 1 24 L 3 26 L 11 18 L 12 16 Q 19 20 24 14 Q 28 8 23 3 Q 16 -2 11 4 Q 6 9 11 15 M 11 15 L 9 16 L 1 24 M 13 15 Q 8 10 12 5 Q 17 0 22 4 Q 26 8 23 13 Q 18 18 13 15 M 14 13 Q 19 15 22 11 Q 19 14 14 13",vbmax:"27 27"},//"Ϙ"//"⚲",
    "book":{path:"M 10 26 L 10 90 Q 40 80 50 90 Q 60 80 90 90 L 90 26 Q 63 13 50 23 Q 36 13 10 26 M 15 25 Q 35 15 50 25 Q 65 15 85 25 L 85 87 Q 65 78 50 87 Q 35 78 15 87 L 15 25 M 15 75 Q 25 69 50 77 Q 75 70 85 75 L 85 78 Q 72 72 50 80 Q 28 71 15 78 L 15 75 M 15 80 Q 29 74 50 82 Q 71 75 85 80 L 85 85 Q 70 77 50 85 Q 30 77 15 85 L 15 78 M 49 25 L 49 76 L 50 77 L 50 26 L 49 25",vbmax:"100 100"},//"🕮"
	"math":{path:"M 5 15 L 8 4 L 19 4 L 18 5 L 9 5 L 5 18 L 3 11 L 1 11 L 1 9 L 4 9 Z M 13 11 L 13 11 L 16 8 L 16 17 L 17 17 L 18 18 L 13 18 L 14 17 L 15 17 L 15 11 Z M 9 14 L 12 14 L 12 15 L 9 15 L 9 14 Z",vbmax:"20 20"},
	"structure":{path:"M 10 12 L 13 2 L 16 12 L 17 22 L 20 17 L 24 24 L 22 24 L 20 20 L 18 24 L 16 24 L 15 21 L 13 19 L 11 21 L 10 24 L 8 24 L 6 20 L 4 24 L 2 24 L 6 17 L 9 22 Z M 13 5 L 11 12 L 15 12 Z M 13 15 L 16 19 L 15 14 L 11 14 L 10 19 Z",vbmax:"25 25"},

	"play":{path:"M 1 1 L 3 2 L 1 3 Z",vbmax:"4 4"},
	"link-outer":{path:"M 0 1 L 2 1 L 2 2 L 1 2 L 1 3 L 0 3 Z M 8 0 L 7 1 L 9 1 L 6 5 L 6 5 L 10 2 L 10 4 L 11 3 L 11 0 Z M 10 9 L 10 11 L 8 11 L 8 10 L 9 10 L 9 9 Z M 0 9 L 1 9 L 1 10 L 2 10 L 2 11 L 0 11 Z",vbmax:"15 15"},

	"body-arm-left-down":{path:"M 5 7 L 5 3 Q 3 3 2 4 Q 1 5 1 6 Q 1 8 3 5 Q 3 7 4 7 Z",vbmax:"10 10"},
	"body-arm-left-up":{path:"M 5 7 L 5 3 Q 4 3 3 3 Q 1 0 1 2 Q 1 3 3 5 Q 3 7 4 7 Z",vbmax:"10 10"},
	"body-leg-left-down":{path:"M 5 7 L 5 8 Q 5 10 4 10 Q 3 10 4 7 Z",vbmax:"10 10"},
	"body-leg-left-up":{path:"M 5 7 L 5 8 Q 3 9 2 8 Q 1 7 4 7 Z",vbmax:"10 10"},
	"body-head":{path:"M 5 0 Q 3 0 3 1 Q 3 3 5 3 Q 7 3 7 1 Q 7 0 5 0 Z",vbmax:"10 10"},

	"human-half-left":{primitive:["body-arm-left-up","body-leg-left-down"]},
	"human-half-right":{primitive:"human-half-left",transform:"flip-horizontal"},
	"human-hello":{primitive:["human-half-left","human-half-right","body-head"]}
}

var MacKeys={
	"ctrl":"cmd",
	"alt":"opt"
}

StringSymbol=function(name){
	return LowerAccesser(StringSymbols)(name);
}

var SymbolsNames=FlipKeysValues(StringSymbols);

SymbolName=function(symbol){
	return LowerAccesser(SymbolsNames)(symbol)
}

ElementSymbolName=function(e){
	var n=Keys(Symbols).filter(name=>(SymbolName(e.innerHTML)===NewNode("<span>"+SymbolIcon(name)+"</span>").innerHTML));
	if(n.length)
		return n[0];
}

SymbolIcon=function(name){
	if(SymbolIcon[name])
		return SymbolIcon[name];

	var name=SymbolName(StringSymbol(name));
	var symbolObj=LowerAccesser(Icons)(name);
	
	if(symbolObj===name)
		return name;
	
	return SymbolIcon[name]=BuildSymbolIcon(symbolObj);
}

BuildSymbolIcon=function(symbolObj){
	var symbolObj=Clone(symbolObj);
	var primitives=symbolObj.primitive?ReArray(symbolObj.primitive).map(SymbolIcon):[];
		delete symbolObj["primitive"];
	
	symbolObj=ComposeSymbols(symbolObj,primitives);

	var viewBox=symbolObj.viewBox||`${symbolObj.vbmin||"0 0"} ${symbolObj.vbmax||"400 400"}`;
	if(symbolObj.transform) //transform name, that is
		symbolObj.path=SVGPathTransform(symbolObj.path,symbolObj.transform,viewBox);
	delete symbolObj.transform;
	return symbolObj;
}

ComposeSymbols=function(symbolObj,primitives){
	if(!primitives.length)
		return symbolObj;
	return Fold(ComposeSymbol,Clone(symbolObj),primitives);
}

ComposeSymbol=function(symbolObj,primitive){
	var primitive=Clone(primitive);
	if(primitive.path){
		var derivative=(primitive.path||"")+" "+(symbolObj.path||"");
		delete(primitive["primitive"]);
		return Merge(primitive,symbolObj,{path:derivative});
	}
	else
		return Merge(primitive,symbolObj);
}

ObtainSymbol=function(name){
	var i=SymbolIcon(StringSymbol(name));
	if(i===name||i===SymbolName(name)||i===StringSymbol(name))
		return StringSymbol(name);
	else{
		i.name=name;//name the icon in a class
		if(ObtainSymbol[name])
			return ObtainSymbol[name];
		return ObtainSymbol[name]=IconHTML(i);
	}
}

IconName=function(iconElement){
	var names=Classes(GetElement(".iconpath",iconElement)).filter(c=>Prefixed(c,"icon-"));
	if(names.length)
		return UnPrefix(names[0],"icon-");
}

//SVG Path Parsing
SVGSpacePattern="\\s+";
SVGNumberPattern="\\-?\\d+(?:\\.\\d+)*";
SVGPairPattern=SVGNumberPattern+SVGSpacePattern+SVGNumberPattern+SVGSpacePattern;
var SVGLetterPattern={
	0:"Z",
	1:"(?:V|H)",
	2:"(?:L|M|T)",
	4:"(?:Q|S)",
	6:"C",
	7:"A"
}
SVGLinePattern=function(n){
	if(In(SVGLetterPattern,String(n)))
		return "(?:("+SVGLetterPattern[n]+")"+SVGSpacePattern+"("+(SVGNumberPattern+SVGSpacePattern).repeat(n)+"))";
	else
		return false;
}

SVGPattern=function(){
	var fullpattern=Keys(SVGLetterPattern).map(SVGLinePattern);
		fullpattern=fullpattern.map(p=>"(?:"+p+")").join("|");
	return fullpattern;
}

SVGPathSplit=function(path){
	var pattern=new RegExp(SVGPattern(),"g");
	return (path+" ").match(pattern)||[];
/*
split path, multiple components
SVGPathSplit("M 1 2 L 3 4 Q 5 6 7 8 Z")
["M 1 2 ","L 3 4 ","Q 5 6 7 8 ","Z "]
*/
}

SVGLinePairs=function(svgline){ //misses odd number off coords
	var pairs=(svgline+" ").match(new RegExp(SVGPairPattern,"g"));
		pairs=pairs.map(pair=>pair.match(new RegExp(SVGNumberPattern,"g")));
		pairs=pairs.map(pair=>pair.map(Number));
	return pairs;
/*
make string pairs
SVGLinePairs("M 1 2 3 4")
[[1,2],[3,4]]
*/
}

SVGLineApply=function(svgline,CoordinatesF){
	var svgline=svgline.trim();
	var linetype=First(svgline);
	var xyArray=Rest(svgline);
	if(xyArray.length){
		xyArray=SVGLinePairs(xyArray);
		xyArray=xyArray.map(CoordinatesF);
		xyArray=xyArray.flat().join(" ");
	}
	return linetype+" "+xyArray+" ";
/*
modify numbers
SVGLineApply("M 1 2 3 4",xy=>[xy[1],xy[0]])
"M 2 1 4 3 "
*/
}

SVGPathApply=function(path,CoordinatesF){
	var svglineArray=SVGPathSplit(path);
	return svglineArray.map(svgline=>SVGLineApply(svgline,CoordinatesF)).join("");
}

ViewboxCoordinates=function(viewBox){
	if(!viewBox)
		return [0,0,1,1];
	if(IsArray(viewBox))
		return viewBox;
	return TrimWhitespaceString(viewBox).split(new RegExp(SVGSpacePattern,"g")).map(Number);
}

ViewboxString=function(viewBox){
	return ViewboxCoordinates(viewBox).join(" ");
}


MirrorXY=function(x,min,max){
	var xdelta=(max-min)/2;
	var xcentre=max-xdelta;
	return -(x-xcentre)+xcentre;
}

RotateXY=function(x,y,xmin,ymin,xmax,ymax,wise){
	var xdelta=(xmax-xmin)/2;
	var xcentre=xmax-xdelta;
	var ydelta=(ymax-ymin)/2;
	var ycentre=ymax-ydelta;
	var wise=wise?1:-1;
	return [-(y-ycentre)*wise+xcentre,(x-xcentre)*(-wise)+ycentre];
}

RescaleWidthXYer=function(W){
	return function(x,y,vbArray){
		var width=vbArray[2]-vbArray[0];
		var n=Ceiling(Log(width/W,10));
		return [Round(x*W/width,n),Round(y*W/width,n)];
	}
};

RescaleHeightXYer=function(H){
	return function(x,y,vbArray){
		var height=vbArray[3]-vbArray[1];
		var n=Ceiling(Log(height/H,10));
		return [Round(x*H/height,n),Round(y*H/height,n)];
	}
};

DisplaceXYer=function(dx,dy){
	return function(x,y,vbArray){
		return [x+dx,y+dy];
	}
};


var SVGTransforms={
	"rescale-width-20":RescaleWidthXYer(20),
	"rescale-height-20":RescaleHeightXYer(20),
	"flip-horizontal":(x,y,vbArray)=>[MirrorXY(x,vbArray[0],vbArray[2]),y],
	"flip-vertical":(x,y,vbArray)=>[x,MirrorXY(y,vbArray[1],vbArray[3])],
	"flip-both":(x,y,vbArray)=>[MirrorXY(x,vbArray[0],vbArray[2]),MirrorXY(y,vbArray[1],vbArray[3])],
	"rotate-90":(x,y,vbArray)=>RotateXY(x,y,vbArray[0],vbArray[1],vbArray[2],vbArray[3],true),
	"rotate-270":(x,y,vbArray)=>RotateXY(x,y,vbArray[0],vbArray[1],vbArray[2],vbArray[3],false)
}

SVGPathDirectTransform=function(path,Transform,viewBox){
	
	var viewBoxArray=ViewboxCoordinates(viewBox);

	function SVGCoordinatesF(xy){
		return Transform(xy[0],xy[1],viewBoxArray)
	}

	return SVGPathApply(path,SVGCoordinatesF);
}

SVGPathTransform=function(path,nameorf,viewBox){
	if(!IsString(nameorf))
		var Transform=nameorf;
	else{
		if(!In(SVGTransforms,nameorf))
			return path;
		
		var Transform=SVGTransforms[nameorf];
	}

	return SVGPathDirectTransform(path,Transform,viewBox);
}

SVGLineChange=function(svgline,F){
	var F=F||Identity;
	var svgline=svgline.trim();
	var xyArray=Rest(svgline);
	if(!xyArray.length)
		return "";
	else{
		xyArray=SVGLinePairs(xyArray);
		xyArray=F(xyArray);
		return xyArray;
	}
}

SVGSplitLineMap=function(path,First){
	return SVGPathSplit(path).map(line=>SVGLineChange(line,p=>p.map(First).flat())).flat();
}

SVGPathViewboxMin=function(path){
	var xs=SVGSplitLineMap(path,First);
	var ys=SVGSplitLineMap(path,Last);
	return Min(xs)+" "+Min(ys);
}

SVGPathViewboxMax=function(path){
	var xs=SVGSplitLineMap(path,First);
	var ys=SVGSplitLineMap(path,Last);
	return Max(xs)+" "+Max(ys);
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
	return LowerAccesser(KeyExplanations)(key);
}

var KeyExplanations={
	"cursor-click":"click",
	"cursor-click2":"right click",
	"swipe-left":"swipe left",
	"swipe-up":"swipe up",
	"swipe-right":"swipe right",
	"swipe-down":"swipe down",
	"wheel-up":"scroll up with the mouse wheel",
	"wheel-down":"scroll down with the mouse wheel",
	"wheel-click":"wheel click",
	"bifinger-up":"scroll up with two fingers",
	"bifinger-down":"scroll down with two fingers",
	"bifinger-click":"click with two fingers",
	"backsp":"backspace",
	"handclick":"tap",
	"mouse2drag":"right click drag",
	"tap2drag":"right tap drag",
	"tap2":"right tap",
	"rightclick":"right click",
	"taphold":"long tap",
	"mousehold":"long click",
	"tapdrag":"tap and drag",
	"mousedrag":"click and drag"
}


KB=function(string,opts){
	var opts=opts||{};
	var options=LowerAccesser(MultimediaKeys,ReArray)(string);
	return Enumerate(options.map(o=>KBDHTML(o,opts)),"or");
}

var MultimediaKeys={
	"click":["tap","cursor-click"],
	"rightclick":["tap2","cursor-click2"],
	"drag":["tapdrag","mousedrag"],
	"rightdrag":["tap2drag","mouse2drag"],
	"hold":["taphold","mousehold"],
	"previous":["swipe-left","shift tab"],
	"next":["swipe-right","tab"]
}


///////////////////////////////////////////////////////////////////////////////
//Dynamic people

HyperPerson=function(name){
	var alias=UniformString(name);
	if(In(HyperPerson.ambiguous,alias))
		Winf("warning, ambiguous name:",name);
	return HyperText("People/"+UniformString(name));
}

HyperPerson.ambiguous=[];


//Abbreviation - People
P=function(){
	var names=Values(arguments);
	names=Apply(Join,names.map(n=>n.split(",")));
	if(names.length>1)
		return Enumerate(names.map(HyperPerson));
	else
		return HyperPerson(First(names));
}




//Dynamic text and HyperText 

HyperText=function(name,value){
	if(NodejsDetected()){
		if(value){return globalThis[name]=value;}
		return NodeHyperText(name);
	}
	else
		return WebHyperText(name,value);
}

LoadHyperTextSource=function(name){
	return LoadSource("data/hypertext/"+UnAfterfix(name,"/")+".js");
}

NodeHyperText=function(name){
	LoadHyperTextSource(name);
	while(!globalThis[name]){}
	var text=globalThis[name]();
	return text.replace(/\s+/ig," ");
}


WebHyperText=function(name,value){
	if(value){
		HyperText[name]=value;
		return Shout(KebabCaseString("hypertext-"+name));
	}
	if(globalThis[name]){
		var text=Evaluate(globalThis[name]);
		return text;
	}
	else{
		if(!HyperText[name]){
			LoadHyperTextSource(name);
			HyperText[name]=true;
		}
		return AwaitHypertext(name);
	}
}

AwaitHypertext=function(name){
	var cla=KebabCaseString("hypertext-"+name);
	function ReplaceHT(){
		var t=Evaluate(HyperText[name]);
		var targets=GetElements("."+cla);
		var Replacer=ReplaceChildren;
		var m=MakeElement(t);
		if(m&&Classed(m,".announce")){
			Replacer=function(content,target){
				e=ReplaceElement(m,target);
				e=Class(e,cla);
			}
		}
		targets.map(a=>Replacer(t,a));
	}
	Hear(cla,ReplaceHT);
	return `<span class="hypertext ${cla}" data="${name}">Loading <em>${name}</em>...</span>`;
}

DynamicTextHTML=function(label,text){
	var label=Prefix(label,"dynamic-");
	var placeholder="";//"[------updating...---]"
	return `<span class="${label}">
				${text||placeholder}
			</span>`;
}

AwaitText=function(label,text){
	if(!label||NodejsDetected())
		return;
	var label=Prefix(label,"dynamic-");
	if(!text){
		RemoveElements("."+label);
		return DynamicTextHTML(label);
	}
	else
		ReplaceElement(text,"."+label);
}

UpdateHyperText=function(name){
	AwaitText(name,HyperText(name));
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
		var e=DynamicTextHTML(label,Evaluate(text));
		ReplaceElements(e,"."+label);
		return e;
	}
}


Toggler=function(StatusReporterName,StatusChangerName){
	return function(){
		var status=globalThis[StatusReporterName]();
		var Changer=globalThis[StatusChangerName]||Identity;
			Changer(status);
		if(status){
			globalThis[StatusReporterName]=False;
		}else
			globalThis[StatusReporterName]=True;
		Memory(StatusReporterName,globalThis[StatusReporterName]());
		return DynamicText(StatusReporterName,TogglerButtonHTML(StatusReporterName));
	}
}

TogglerButtonHTML=function(StatusReporterName,StatusChangerName){
	if(!globalThis[StatusReporterName]||typeof globalThis[StatusReporterName]!=="function")
		return DynamicText(StatusReporterName);

	var status=ButtonHTML({
		txt:globalThis[StatusReporterName]()?"active":"inactive",
		href:"",onclick:'Toggler("'+StatusReporterName+'","'+StatusChangerName+'")()',class:"inline"
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
WallpaperHTML=function(opts){
	if(IsString(opts)){
		var w=Wallpaper(opts);
		w?opts=w:{path:opts}
	}
	
	var path=opts.path||"M 0 0 L 100 0 L 100 100 Z";

	var name=opts.name||GenerateId();
	var cla=opts.class?opts.class:"";

	var height=opts.height||opts.width||"100";
	var width=opts.width||opts.height||"100";

	var viewBox=opts.viewBox||`0 0 ${width} ${height}`;
	
	var scale=opts.scale||1;

	return `<svg class='wallpaper ${cla}' width="100%" height="100%">
				<pattern id="${name}" x="0" y="0" width="${width*scale}" height="${height*scale}" patternUnits="userSpaceOnUse" viewBox="${viewBox}"> 
					<g>
						<path d="${path}" class="layer"/>
					</g>
				</pattern>
				<rect x="0" y="0" width="100%" height="100%" fill="url(#${name})" />
			</svg>`;
}

AddWallpaper=function(patternObj,e){
	AddElement(NewNode(WallpaperHTML(patternObj)),e);
}

RemoveWallpaper=function(name,e){
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

Wallpaper=function(name){
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

SVGHTML2=function(opts){
	var x0=opts.x0||0;
	var x1=typeof opts.x1==="undefined"?1:opts.x1;
	var y0=opts.y0||0;
	var y1=typeof opts.y1==="undefined"?1:opts.y1;
	var cla=opts.cla||"";
	return `<svg ${cla?`class="${cla}"`:""} viewBox="${x0} ${y0} ${x1} ${y1}" ></svg>`;
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

ChartGridline=function(opts){
	return Merge(opts||{},{
		scale:1,
		up:1,
		down:1,
		type:"grid"
	});
};

ChartTick=function(opts){
	return Merge(opts||{},{
		scale:1,
		scale:0.5,
		up:1/100,
		down:1/100,
		type:"tick"
	});
}

ChartAxis=function(opts){
	return Merge(opts||{},{
		scale:1,
		up:0,
		down:0,
		type:"axis",
		minor:1,
		major:1
	});
}


AddChartAxis=function(opts,chart){
	AddChartLine(ChartAxis(opts),chart);
}

AddChartGridline=function(opts,chart){
	AddChartLine(ChartGridline(opts),chart);
}

AddChartTick=function(opts,chart){
	AddChartLine(ChartTick(opts),chart);
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
		var opts={
			x0:Round(I*widthmax+xspacing,5),
			x1:Round((I+1)*widthmax-xspacing,5),
			y0:Round(yview-yvalues[I],5),
			y1:Round(yview,5),
			cla:"bar"
		}
		if(!horizontal){
			var mem0=opts.x0;
				opts.x0=opts.y0;
				opts.y0=mem0;
			var mem1=opts.x1;
				opts.x1=opts.y1;
				opts.y1=mem1;
		}
		AddElement(SVGBarHTML(opts),chart)
	}
	RefreshSVG(chart);
}

var ChartComponents={
	"XGridline":AddChartGridline,
	"YGridline":AddChartGridline,
	"XAxis":AddChartAxis,
	"YAxis":AddChartAxis,
	"XTick":AddChartTick,
	"YTick":AddChartTick,
	"XLegend":AddChartLegend,
	"YLegend":AddChartLegend,
	"XAxisLegend":AddChartAxisLegend,
	"YAxisLegend":AddChartAxisLegend,
	"Bar":AddChartBars
};

AddChartComponent=function(component,opts,chart){
	if(!In(ChartComponents,component))
		return;
	else
		return ChartComponents[component](opts,chart);
}

AddChart=function(opts,target){
	var cla=opts.cla||"chart";
	var chart=AddElement(SVGHTML2({cla:cla}),target);
	
	Keys(opts).map(c=>AddChartComponent(c,opts[c],Prefix(cla,".")));
	
	chart=GetElement(".chart",target);
	chart.viewBox.baseVal.x+=-chart.viewBox.baseVal.width/4;
	chart.viewBox.baseVal.y+=-chart.viewBox.baseVal.height/4;
	chart.viewBox.baseVal.width*=1.25;
	chart.viewBox.baseVal.height*=1.25;

	return chart;
}

//Selects the right display scale - todo improve, for decimal numbers
ScaleMax=function(max){
	var a=Power(10,Ceiling(Log10(max)));
	var b=a*3/4;
	var c=a*1/2;
	var d=a*1/4;
	return(c>max?(d>max?d:c):(b>max?b:a));
}

///////////////////////////////////////////////////////////////////////////////
// Intersection Observer


InViewExecute=function(){
	var args=Append(Values(arguments),Trued);
	Apply(ObserveExecute,args);
}

OutViewExecute=function(){
	var args=Append(Values(arguments),Falsed);
	Apply(ObserveExecute,args);
}

WhileOutViewExecute=function(target,Executer,Opts){
	var id=GenerateId();

	var Opts=Opts||{};
	var delay=Opts.delay||500;
	var maxtime=Opts.maxtime||((Opts.max||10)*delay);
	var end=Opts.end||false;
	var enddelay=Opts.enddelay||(delay*4)

	//Stopping
	InViewExecute(target,function(){
		AutoStop(undefined,delay,id);
		if(end)
			setTimeout(Executer,enddelay);
	});

	//Trying
	AutoRepeat(function(){OutViewExecute(target,Executer)},delay,id);

	//Cleaning
	setTimeout(()=>AutoStop(undefined,delay,id),maxtime);
}


ObserveExecute=function(targe,Executer,Conditioner){
	var target=GetElement(targe);
	if(!target)
		return;// console.log("Observer error:",targe);

	var opts={
		root: null,
		rootMargin: "0px",
		threshold: [0]
	};
	
	function HandleInview(obj){
		if(Conditioner(obj[0].isIntersecting)){
			Executer();
			Observer.disconnect();
		}
	}

	var Observer=new IntersectionObserver(HandleInview,opts);
	Observer.observe(target);

}


///////////////////////////////////////////////////////////////////////////////
// Lazy loader

LazyLoader=function(target,Loader){
	HearOnce("LazyLoader",function(){InViewExecute(target,Loader)});
}

LazyImageLoader=function(id,src){
	LazyLoader(id,function(){TriggerImageLoad(id,src)});
}

TriggerImageLoad=function(id,src){
	var img=GetElement(id);
	img.setAttribute("src",src);
}

///////////////////////////////////////////////////////////////////////////////
//Mutation Observer

Observe=function(selector,Look,opts,name){
	var e=GetElement(selector)
	if(!selector||!e)
		return;
	
	var Look=Look||console.log;

	var name=name||(selector+FunctionName(Look));

	var opts=opts||{};
		opts=Merge({attributes: true, childList: true, subtree: true},opts);


	var Observant = new MutationObserver(Look);
	Observant.observe(e,opts);
	
	if(!Observe.list) //registration
		Observe.list={};
	Observe.list[name]=Observant;

	return Observant;
}

UnObserve=function(name){
	if(!Observe.list)
		return;
	var Observant=Observe.list[name];
	
	if(Observant){
		Observant.disconnect();
		delete Observe.list[name];
		return true;
	}

}

ObserveOnce=function(selector,Look,opts){
	var Look=Look||console.log;
	var name=GenerateId();
	function See(){
		var args=Values(arguments);
		var result=Apply(Look,args);
		if(result!==false)
			UnObserve(name);
	}
	return Observe(selector,See,opts,name)
}

MutationClassed=function(mutation,classSelector){
	var m=mutation;
	return m.type="attributes"&&m.attributeName==="class"&&Classed(m.target,classSelector)
}

MutationIded=function(mutation,id){
	var m=mutation;
	return m.type="attributes"&&m.attributeName==="id"&&m.target.id===UnPrefix(id,"#");
}

UponMutator=function(ObserveF){
	return function(elementSelector,Action,parentSelector){
		function Upon(mutations){
			var addedNodes=Array.from(mutations[0].addedNodes)||[];
			if(addedNodes.some(Matcher(elementSelector)))
				return Action();
			
			if(IsClass(elementSelector)&&mutations.some(m=>MutationClassed(m,elementSelector)))
				return Action();

			if(!IsClass(elementSelector)&&mutations.some(m=>MutationIded(m,elementSelector)))
				return Action();	

			return false;				
		}
		var parentSelector=parentSelector||"body"
		ObserveF(parentSelector,Upon)
	}
}

UponElement=function(){
	var args=Values(arguments);
	return Apply(UponMutator(Observe),args);
}

UponElementOnce=function(){
	var args=Values(arguments);
	return Apply(UponMutator(ObserveOnce),args);
}

//Execute whenever the element is ready
HearElement=function(elementSelector,Action){
	if(GetElement(elementSelector))
		Action();
	else
		UponElementOnce(elementSelector,Action);
}

//Replace whenever the element is ready
AwaitElement=function(selector,result){
	if(GetElement(selector))
		return result;
	else{
		var id=GenerateId();
		function Replacer(){return ReplaceElement(result,id);}
		UponElementOnce(selector,Replacer);
		return HiddenHTML(id);
	}
}

///////////////////////////////////////////////////////////////////////////////
//Clipboard

function ClipboardCopy(text,notice){
	if (!navigator.clipboard)
			return;
	if(!text)
		return;
	navigator.clipboard.writeText(text);
	ConsoleAdd(notice||`"${text}" copied to clipboard!`);
};

CopyHandler = function(Extractor,parentSelector){
	return function(event){
		if(parentSelector&&!GetElement(parentSelector).contains(event.target))
			return;
		var text=Extractor(event.target);
		if(!text)
			return;
		function CopyLogger(){ClipboardCopy(text)};
		try{Throttle(CopyLogger,500)}
		catch(err){	}
	};
}

SelectedNode=function(e){
	var selection=window.getSelection();
	return selection.containsNode(e,true);
}
///////////////////////////////////////////////////////////////////////////////

Monitor=function(Opts){
	if(!GetElement(".monitor")){
		AddElement(`<div class="monitor"></div>`,"BODY")
	}
	report=Keys(Opts).map(name=>`<div>${name}:${Opts[name]}</div>`).join("");
	ReplaceChildren(report,".monitor");
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//Test suite saver

//Self-tests

UnInlineCommentCode=function(code){
	return UnAfterfix(code,"//","mig");
}

UnMultilineCommentCode=function(code){
	return UnInfix(code,"/"+"*","*"+"/");
}

UnCommentCode=function(code){
	var code=UnMultilineCommentCode(UnInlineCommentCode(code));
	return code;
}

FunctionRoll=function(F){
	var body=FunctionBody(F);
	var lastComment=UnBeforfix(body,"/"+"*");		 //Finds the comment inbetween
	if(lastComment===body)
		return "";
	
	lastComment=lastComment.replaceAll(/\r/sig,"").replaceAll(/\t/sig,"");
	
	lastComment=UnAfterfix(lastComment,"*"+"/");
	lastComment=UnPrefix(UnPosfix(lastComment,"*"),"*");	//Cleans excess symbols
	
	lastComment=UnExfix(lastComment," ","mig");

	return lastComment;
}

FunctionNameRoll=function(fname){
	if(!window[fname])
		return "";
	return FunctionRoll(window[fname]);
}


RollUnitTexts=function(roll){
	//split on two or more paragraphs
	return roll.split(/\n((\s|\t|\r)+)?(\n((\s|\t)+)?)+/).filter(x=>x&&x.replace(/(\n((\s|\t)+)?)/,"").length);
}

UnitTextUnitTest=function(unitText){
	if(!unitText)
		return;
	var lines=unitText.split("\n").filter(Identity);
		lines=lines.map(TrimWhitespaceString);
		lines=lines.map(line=>UnPosfix(line,[";",","]));
	if(lines.length<2){
		Warn("missing either the call or the expected result",lines,unitText)
		return {};
	}
	var title=lines[0];
	
	if(lines.length===2){
		var title="missing title";
		lines=Prepend(lines,title);
	}
	var call=lines[1];
	var callerName=UnAfterfix(call,"(");
	if(!globalThis[callerName]){
		Warn("caller function is undefined:",callerName)
		return {};
	}
	
	try{
		var expected=lines[2];
		expected=expected.replace(/^(\s|\t|\n)?(Object|Array|function)(\s|\t|\n)?(\(\d+\))?/,"");
		expected=eval("Identity("+expected+")");//prevents error with lone objects
		return {
			title:title,
			call:call,
			callerName:callerName,
			expected:expected
		};
	}
	catch(e){
		Warn("couldnt eval test",expected,unitText);
		return null
	}
}

FunctionNameUnitTests=function(fname){
	return FunctionUnitTests(window[fname]);
}

FunctionUnitTests=function(F){
	return RollUnitTests(FunctionRoll(F));
}

RollUnitTests=function(roll){
	return RollUnitTexts(roll).map(UnitTextUnitTest);
}


UnitTests=[];

UnitTestSave=function(unitObj){
	if(!unitObj)
		return;
	var callerName=unitObj.callerName;

	if(!UnitTests[callerName]){
		UnitTests[callerName]={};
		UnitTests.push(callerName);
	}

	return UnitTests[callerName][unitObj.call]=unitObj;
}


FunctionTestsSave=function(F){
	return FunctionUnitTests(F).map(UnitTestSave);
}

FunctionNameTestsSave=function(fname){
	if(window[fname])
		return FunctionTestsSave(window[fname]);
}

Rolls=function(){
	return Introspect().map(FunctionNameTestsSave);
}

RollSave=function(roll){
	return RollUnitTests(roll).map(UnitTestSave);
}

RollsSave=function(){
	return Rolls().map(RollSave);
}




//Run Test() to execute and report the tests on the list of saved functions
//provided there is an element in the page labelled with TestingAreaSelector

TestingAreaSelector=".test-suite";

UnitTestEvaluate=function(unitObj){
	if(!unitObj)
		return;
	
	var passed=false;
	var result=null;
	try{
		result=eval(unitObj.call);
		passed=Equal(result,unitObj.expected)||!!Evaluate(unitObj.VerifierF)
	}
	catch(e){
		passed=false;
	}

	unitObj.passed=passed;
	unitObj.result=result;
	
	return unitObj;
}


UnitTestReportHTML=function(unitTest){
	if(!unitTest)
		return null;
	
	if(unitTest.passed)
		return "";

	var callerName=unitTest.callerName;
	var tID="test-"+callerName;
	var header=`
		<h3 class='test-function' id='${tID}'>
			${callerName}
		</h3>`;

	if(!GetElement(tID))
		AddElement(header,TestingAreaSelector);

	var callresult=`${unitTest.call}===${ReString(unitTest.result)}`;
	var expected="";

	if(unitTest.verifierName)
		callresult=callresult+` (verified)`;
	else
		expected="<p>Expected:<code>"+JSON.stringify(unitTest.expected)+"</code></p>"
	
	var title=unitTest.title;
	var label=LabelHTML("Failed","test Problem");
	var tried=`
		<h4>${title}</h4>
		<p>
			<code>${callresult}</code>${label}
		</p>
	`
	var testid=KebabCaseString("test-"+callerName+" "+title);
	RemoveElement(testid);

	var report=`
		<div class='test-result' id='${testid}'>
			${tried}
			${expected}
		</div>`;

	AppendElement(report,tID);
}

TestReportHTML=function(){
	var functionNames=Introspect();
	var unitTests=functionNames.map(FunctionNameUnitTests).filter(Length);
	
	var report=unitTests.flat().map(UnitTestEvaluate).map(UnitTestReportHTML).filter(Identity).join("");
	
	AddElement("<p>Tests complete!</p>",TestingAreaSelector);

	var testedFunctionNames=unitTests.map(t=>First(t).callerName);
	var untestedFunctionNames=Complement(functionNames,testedFunctionNames);
	
	DynamicText("code-coverage",PercentageText(Length(testedFunctionNames)/Length(untestedFunctionNames),2));
	DynamicText("code-coverage-included",Enumerate(testedFunctionNames));
	DynamicText("code-coverage-excluded",Enumerate(untestedFunctionNames));

	return report;
}


///////////////////////////////////////////////////////////////////////////////
//Introspection - lists all defined functions, and analyses them

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

FunctionCalledFunctions=function(F){
	var code=UnCommentCode(FunctionBody(F));
	var callers=code.match(new RegExp("(\\w+)\\(","sig"));
	if(callers===null){
		return [];
	}
	callers=callers.map(s=>UnPosfix(s,"("));
	callers=DistinctArray(callers);
	return callers;
/*
self-inspect
FunctionCalledFunctions(FunctionCalledFunctions)
["UnCommentCode","FunctionBody","match","RegExp","if","map","UnPosfix","DistinctArray"]
*/
}

JavascriptFunctionNames=["RegExp","Array","Object","Date","String","Number","Set","Math"];

FunctionCalledDependents=function(F){
	var selfName=FunctionName(this);
	return FunctionCalledFunctions(F).filter(Name=>Capitalise(Name[0])===Name[0]&&!In(JavascriptFunctionNames,Name)&&Name!==selfName);
/*
self-inspect, removing itself
FunctionCalledDependents(FunctionCalledDependents)
["FunctionName","FunctionCalledFunctions","Capitalise","In"]
*/
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