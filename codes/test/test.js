
SaveTest=function(F,argArray,expected,testname,VerifierF){
	var callerName=FunctionNamecode(F);
	var argArray=IsArray(argArray)?argArray:[argArray];
	var call=callerName+JSON.stringify(argArray).replace(/^\[/,"(").replace(/\]$/,")")

	UnitTestSave({
		title:testname,
		call:call,
		callerName:callerName,
		expected:expected,
		VerifierF:VerifierF
	})
}

//SaveTestableFunctionsTests()


///////////////////////////////////////////////////////////////////////////////
// Deep equality testing

SaveTest(Equal,[true,true],true,"boolean - true true");
SaveTest(Equal,[true,false],false,"boolean - false false");
SaveTest(Equal,[false,0],false,"type mixture - false and zero");
SaveTest(Equal,[false,""],false,"type mixture - false and nostring");
SaveTest(Equal,[null,false],false,"type mixture - false and null");
SaveTest(Equal,[undefined,false],false,"type mixture - false and undefined");

SaveTest(Equal,["a","a"],true,"strings - equal");
SaveTest(Equal,["a","A"],false,"strings - different, case sensisive");

SaveTest(Equal,[[1,2],[1,2]],true,"arrays - equal, shallow");
SaveTest(Equal,[[1,2,3],[1,2]],false,"arrays - different length, shallow");
SaveTest(Equal,[[1,3],[1,2]],false,"arrays - different values, shallow");
SaveTest(Equal,[[1,[2],["3",[4]]],[1,[2],["3",[4]]]],true,"arrays - equal, deep");
SaveTest(Equal,[[1,[2],["3",[4]]],[1,[2],["3",4]]],false,"arrays - different, deep");

SaveTest(Equal,[{a:1,b:2},{a:1,b:2}],true,"object - equal, shallow");
SaveTest(Equal,[{a:1,b:3},{a:1,b:2}],false,"object - different value, shallow");
SaveTest(Equal,[{a:1,c:2},{a:1,b:2}],false,"object - different key, shallow");
SaveTest(Equal,[{a:1,b:2,c:3},{a:1,b:2}],false,"object - different length, shallow");
SaveTest(Equal,[{a:1,b:{bb:2},c:{cc:"3",d:{dd:4}}},{a:1,b:{bb:2},c:{cc:"3",d:{dd:4}}}],true,"object - equal, deep");
SaveTest(Equal,[{a:1,b:{bb:2},c:{cc:"3",d:{dd:4}}},{a:1,b:{bb:2},c:{cc:"3",d:{dd:5}}}],false,"object - different, deep");



///////////////////////////////////////////////////////////////////////////////
// Math


SaveTest("VectorPlus",[[],[]],[],"both empty");
SaveTest("VectorPlus",[[1],[2]],[3],"monodimensional");
SaveTest("VectorPlus",[[1,2],[3,4]],[4,6],"multidimensional");
SaveTest("VectorPlus",[[1,2],[3]],[4],"ragged underflow");
SaveTest("VectorPlus",[[1],[3,4]],[4],"ragged overflow");

SaveTest(EuclideanDistance,[[],[]],0,"both empty");
SaveTest(EuclideanDistance,[[1],[2]],1,"monodimensional");
SaveTest(EuclideanDistance,[[0,3],[4,0]],5,"bidimensional");
SaveTest(EuclideanDistance,[[0,0,3],[4,0,0]],5,"tridimensional");

SaveTest(Round,[12.3456789,0],12,"no decimal places, down");
SaveTest(Round,[98.7654321,0],99,"no decimal places, up");
SaveTest(Round,[12.3456789,3],12.346,"3 decimal places, up");
SaveTest(Round,[98.7654321,3],98.765,"3 decimal places, down");

SaveTest(PercentageText,[0.123456789],"12%","no decimal places, down");
SaveTest(PercentageText,[0.987654321],"99%","no decimal places, up");
SaveTest(PercentageText,[0.123456789,3],"12.346%","3 decimal places, up");
SaveTest(PercentageText,[0.987654321,3],"98.765%","3 decimal places, down");


///////////////////////////////////////////////////////////////////////////////
// Lists (AS = Array or String)

SaveTest(First,"abcd","a","normal string");
SaveTest(Last,"abcd","d","normal string");
SaveTest(Most,"abcd","abc","normal string");
SaveTest(Rest,"abcd","bcd","normal string");

SaveTest(First,[["a","b","c","d"]],"a","normal list");
SaveTest(Last,[["a","b","c","d"]],"d","normal list");
SaveTest(Rest,[["a","b","c","d"]],["b","c","d"],"normal list");
SaveTest(Most,[["a","b","c","d"]],["a","b","c"],"normal list");

SaveTest(First,"a","a","mono-letter list");
SaveTest(Last,"a","a","mono-letter string");
SaveTest(Rest,"a","","mono-letter list");
SaveTest(Most,"a","","mono-letter string");

SaveTest(First,[["a"]],"a","mono-element list");
SaveTest(Last,[["a"]],"a","mono-element list");
SaveTest(Rest,[["a"]],[],"mono-element list");
SaveTest(Most,[["a"]],[],"mono-element list");


//Distinguish Objects and Arrays

SaveTest(IsArray,true,false,"boolean - true");
SaveTest(IsArray,false,false,"boolean -false");
SaveTest(IsArray,[undefined],false,"no arguments (undefined)");
SaveTest(IsArray,[["a","b","c","d"]],true,"array - normal");
SaveTest(IsArray,[[]],true,"array - empty");
SaveTest(IsArray,{a:"1",b:"2",c:"3",d:"4"},false,"object - normal");
SaveTest(IsArray,{},false,"object - empty");
SaveTest(IsArray,"abcd",false,"string");

SaveTest(IsObject,true,false,"boolean - true");
SaveTest(IsObject,false,false,"boolean -false");
SaveTest(IsObject,[undefined],false,"no arguments (undefined)");
SaveTest(IsObject,[["a","b","c","d"]],false,"array - normal");
SaveTest(IsObject,[[]],false,"array - empty");
SaveTest(IsObject,{a:"1",b:"2",c:"3",d:"4"},true,"object - normal");
SaveTest(IsObject,{},true,"object - empty");
SaveTest(IsObject,"abcd",false,"string");





//Values
SaveTest(Values,{a:1,b:2,c:3,d:4},[1,2,3,4],"values");
SaveTest(Values,{},[],"empty object");

//Flip Keys with Values
SaveTest(FlipKeysValues,{a:"A",b:"B"},{"A":"a","B":"b"},"simple flip");
SaveTest(FlipKeysValues,{a:1,b:2,c:3,d:4},{"1":"a","2":"b","3":"c","4":"d"},"numeric values to string");
SaveTest(FlipKeysValues,{},{},"empty object");



//Update Object Keys
SaveTest(ReKeyObject,[{a:"1",b:"2",c:"3",d:"4"},(a)=>(a==="a"?"e":a)],{b:"2",c:"3",d:"4",e:"1"},"matching key");
SaveTest(ReKeyObject,[{a:"1",b:"2",c:"3",d:"4"},(e)=>(e==="e"?"f":e)],{a:"1",b:"2",c:"3",d:"4"},"non-matching key");

SaveTest(InString,["","a"],false,"empty string");
SaveTest(InString,["abcd","a"],true,"matching");
SaveTest(InString,["abcd","e"],false,"non-matching");
SaveTest(InString,["abcd","A"],false,"case-sensitive");


SaveTest(In,[true,"a"],false,"boolean");
SaveTest(In,[["a","b"],"a"],true,"array - present");
SaveTest(In,[["a","b"],"c"],false,"array - absent");
SaveTest(In,[{a:"1",b:"2"},"a"],true,"object - has key");
SaveTest(In,[{a:"1",b:"2"},"c"],false,"object - hasn't key");
SaveTest(In,[{a:"1",b:"2"},"1"],false,"object - hasn't key, has value");
SaveTest(In,["","a"],false,"in empty string");
SaveTest(In,["abcd","a"],true,"matching");
SaveTest(In,["abcd","e"],false,"non-matching");
SaveTest(In,["abcd","A"],false,"case-sensitive");
SaveTest(In,[[["b"]],["b"]],true,"deep array, present");



///////////////////////////////////////////////////////////////////////////////
//Set functions



SaveTest(Permutations,[[]],[],"empty array");
SaveTest(Permutations,[[1]],[[1]],"one symbol array");
SaveTest(Permutations,[[1,2,3]],[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]],"actual permutations, 3 elements");
SaveTest(Permutations,[[1,2,2]],[[1,2],[2,1]],"force uniqueness");

SaveTest(StringPermutations,["HI"],["HI","IH"],"actual permutations");
SaveTest(StringPermutations,[""],[],"empty string");

SaveTest(RotateMatrix,[[[1]]],[[1]],"mono square");
SaveTest(RotateMatrix,[[[1,2],[3,4]]],[[3,1],[4,2]],"rotate right, square");
SaveTest(RotateMatrix,[[[1,2],[3,4]],true],[[2,4],[1,3]],"rotate left, square");
SaveTest(RotateMatrix,[[[1,2],[3,4],[5,6]]],[[5,3,1],[6,4,2]],"rotate right, vertical rectangle");
SaveTest(RotateMatrix,[[[1,2,7],[3,4,8]]],[[3,1],[4,2],[8,7]],"rotate right, horizontal rectangle");

SaveTest(RotateString,["Hi!"],"H\ni\n!","rotate right, monoline");
SaveTest(RotateString,["NE\nWS"],"WN\nSE","rotate right, square");
SaveTest(RotateString,[""],"","empty string");




///////////////////////////////////////////////////////////////////////////////
//Get Function Name as a string, or make up a unique one based on the function's body


function TestFunctionNameF(){return true;};
SaveTest(FunctionName,Identity,"Identity","named function");
SaveTest(FunctionName,TestFunctionNameF,"TestFunctionNameF","named function, inline");
SaveTest(FunctionName,function(){return true;},"returntrue","anonymous function, inline");
SaveTest(FunctionName,function(){1===1;},"","anonymous function, inline, no letters"); //Improve

SaveTest(FunctionBody,Identity,"{return i;}","by reference to function name only");
SaveTest(FunctionBody,TestFunctionNameF,"{return true;}","named function, inline");
SaveTest(FunctionBody,function(){return true;},"{return true;}","anonymous function, inline");
SaveTest(FunctionBody,function(){(1)===(1);},"{(1)===(1);}","regex ignores subsequent parentheses");

SaveTest(FunctionNamecode,Identity,"Identity","named function");
SaveTest(FunctionNamecode,"Identity","Identity","function name");
SaveTest(FunctionNamecode,(i)=>i,"(i)=>i","function code");


///////////////////////////////////////////////////////////////////////////////
//Join Objects, overwriting conflicting properties

SaveTest(Clone,{a:1,b:2},{a:1,b:2},"object - hasn't key"); //Improve - How to test cloning?
SaveTest(Clone,{},{},"empty object");
SaveTest(Clone,[[1,2]],[1,2],"array");
SaveTest(Clone,[[]],[],"empty array");
SaveTest(Clone,"ab","ab",2,"string");
SaveTest(Clone,"","","empty string");


// String 

SaveTest(ObjectRules,{},[],"empty rule");
SaveTest(ObjectRules,{a:1},[["a",1]],"make rule");
SaveTest(ObjectRules,{a:1,b:2},[["a",1],["b",2]],"make rule");


SaveTest(EscapeToken,"(","\\(","escapable character");
SaveTest(EscapeToken,".","\\.","escapable character");
SaveTest(EscapeToken ,"a","a","unescapable character");
SaveTest(EscapeToken ,"A","A","unescapable uppercase character");
SaveTest(EscapeToken ,"a","a","unescapable digit");
SaveTest(EscapeToken ,"à","à","unescapable accented");

SaveTest(EscapeTokens ,"(a-à)+b","\\(a\\-à\\)\\+b","mixture");


SaveTest(Capitalise,"","","empty string");
SaveTest(Capitalise,"marie","Marie","simple");
SaveTest(Capitalise,"Marie","Marie","already capitalised");
SaveTest(Capitalise,"mARIE","Marie","inversely capitalised");



SaveTest(Parenthise,"ok","(ok)","parenthesis absent");
SaveTest(Parenthise,"(ok)","(ok)","parenthesis present");

SaveTest(Alternate,[["singleoption"]],"(singleoption)","alternate single");
SaveTest(Alternate,[["option","alternative","extra"]],"(option)|(alternative)|(extra)","alternate many");



SaveTest(PadLeft,["hi","-","4"],"--hi","smaler left");
SaveTest(PadLeft,["hi there","-","4"],"hi there","larger left");
SaveTest(PadLeft,["hi","-_","8"],"-_-_-_hi","multisymbol");
SaveTest(PadLeft,["hi","-_","0"],"hi","zero");
SaveTest(PadLeft,["hi","","8"],"hi","nosymbol");



TestReportHTML();
//setTimeout(()=>DynamicText("code-orphan-functions",Enumerate(OrphanFunctions())),2000);
