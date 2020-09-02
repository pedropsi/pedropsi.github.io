
/*
function EnableTestMode(){
	LoadAsync("test-behaviour","codes");
}
*/

///////////////////////////////////////////////////////////////////////////////
//Test suite saver
//Run Test() to execute and report the tests on the list of saved functions
//provided there is an element in the page labelled with the result of TestingAreaSelector()

function TestFunction(functionname,testname){
	var functionname=(typeof functionname==="string")?functionname:FunctionName(functionname);
	var verifiername="";

	var test=Test[functionname][testname];
	if(test){
		var result="___WRONGRESULT___";
		try{
			result=test["function"].apply(null,test["arguments"]);
			if(test.VerifierF){
				result=test.VerifierF(result);
				verifiername=FunctionName(test.VerifierF);
			}
		}
		catch(e){
			console.log(e);
		}
		var expect=test["expected"];
		var passed=(Equal(result,expect));
		ReportTest(functionname,testname,test,passed,result,expect,verifiername);
		return passed;
	}
}

var ErrorReport=[];

function ReportTest(functionname,testname,test,passed,result,expect,verifiername){
	if(passed)
		return;
	var testfunctionid="test-"+functionname;
	if(!GetElement(testfunctionid))
		AddElement("<h3 class='test-function' id='"+testfunctionid+"'>"+functionname+"</h3>",TestingAreaSelector());

	var testid=TocId("test-"+functionname+" "+testname);

	var verifunctionname=functionname;
	
	if(verifiername)
		verifunctionname=verifiername+"("+verifunctionname+")";

	var testtitle="<h4>"+testname+"</h4>"+"<p><code>"+verifunctionname+"("+JSON.stringify(test["arguments"]).replace(/^\[/,"").replace(/\]$/,"")+")="+JSON.stringify(result)+"</code>";
	
	var testreport=(passed?LabelHTML("Passed","test"):(LabelHTML("Failed","test Problem")+"</p><p>Expected:<code>"+JSON.stringify(expect))+"</code></p>");

	ErrorReport.push([functionname,testname]);
	
	RemoveElement(testid);
	AppendElement("<div class='test-result' id='"+testid+"'>"+testtitle+testreport+"</div>",testfunctionid);
}

function Test(functionname){
	if(!functionname&&Test.functions){
		AddElement("<p>Tests complete!</p>",TestingAreaSelector());
		var tests=Test.functions.map(Test);
		if(ErrorReport.length>0)
			RegisterStatus(ErrorReport);
		return tests;
	}

	var functionname=(typeof functionname==="string")?functionname:FunctionName(functionname);
	var tests=Test[functionname];

	return Keys(tests).map(function(testname){TestFunction(functionname,testname)});
}

function SaveTest(F,argArray,result,testname,VerifierF){

	var functionname=FunctionName(F)||String(F);

	if(!Test.functions)
		Test.functions=[];

	if(!Test[functionname]){
		Test[functionname]={};
		Test.functions.push(functionname);
	}
	var argArray=IsArray(argArray)?argArray:[argArray];
	var testname=testname?testname:(functionname+"("+argArray.map(String).join(",")+")");
	
	Test[functionname][testname]={"function":F,"arguments":argArray,"expected":result,"VerifierF":VerifierF};
}

function TestingAreaSelector(){
	return ".test-suite";
}

///////////////////////////////////////////////////////////////////////////////
//Do nothing

SaveTest(Identity,true,true,"boolean");
SaveTest(Identity,"abcd","abcd","string");
SaveTest(Identity,[["a","b","c","d"]],["a","b","c","d"],"list");
SaveTest(Identity,function(){return false},function(){return false},"function");

SaveTest(True,true,true,"boolean - true");
SaveTest(True,false,true,"boolean -false");
SaveTest(True,[undefined],true,"no arguments (undefined)");
SaveTest(True,[["a","b","c","d"]],true,"list");
SaveTest(True,function(){return false},true,"function");

SaveTest(False,true,false,"boolean - true");
SaveTest(False,false,false,"boolean -false");
SaveTest(False,[undefined],false,"no arguments (undefined)");
SaveTest(False,[["a","b","c","d"]],false,"list");
SaveTest(False,function(){return false},false,"function");

///////////////////////////////////////////////////////////////////////////////
// Deep equality testing

SaveTest(Equal,[true,true],true,"boolean - true true");
SaveTest(Equal,[true,false],false,"boolean - false false");
SaveTest(Equal,[true,false],false,"boolean - different");
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

SaveTest(Equal,[/a/g,/a/g],true,"regex - equal source and flags");
SaveTest(Equal,[/a/g,/a/gi],false,"regex - different flags");
SaveTest(Equal,[/a/g,/b/g],false,"regex - different source");

///////////////////////////////////////////////////////////////////////////////
// Math

SaveTest(Power,[2,0],1,"power of zero");
SaveTest(Power,[2,3],8,"normal power");

SaveTest(PoweredSum,[[],2],0,"zero-dimensional");
SaveTest(PoweredSum,[[2],2],4,"monodimensional");
SaveTest(PoweredSum,[[3,4],2],25,"tridimensional");
SaveTest(PoweredSum,[[1,2,3],1],6,"tridimensional, 1");
SaveTest(PoweredSum,[[1,2,3],2],14,"tridimensional, 2");
SaveTest(PoweredSum,[[1,2,3],3],36,"tridimensional, 3");
SaveTest(PoweredSum,[[1,2,3,4],2],30,"tetradimensional");

SaveTest(VectorPlus,[[],[]],[],"both empty");
SaveTest(VectorPlus,[[1],[2]],[3],"monodimensional");
SaveTest(VectorPlus,[[1,2],[3,4]],[4,6],"multidimensional");
SaveTest(VectorPlus,[[1,2],[3]],[4],"ragged underflow");
SaveTest(VectorPlus,[[1],[3,4]],[4],"ragged overflow");

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

SaveTest(First,"",null,"empty string");
SaveTest(Last,"",null,"empty string");
SaveTest(Rest,"",null,"empty string");
SaveTest(Most,"",null,"empty string");

SaveTest(First,[[]],null,"empty list");
SaveTest(Last,[[]],null,"empty list");
SaveTest(Rest,[[]],null,"empty list");
SaveTest(Most,[[]],null,"empty list");


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


//Apply function to Array or Object
SaveTest(Apply,[true,Identity],undefined,"boolean");
SaveTest(Apply,["abcd",Identity],undefined,"string");
SaveTest(Apply,[["a","b","c","d"],First],"a","array - normal");
SaveTest(Apply,[{a:"1",b:"2"},Identity],["a","b"],"object - normal");


// Does element exist?
SaveTest(InArrayOrObj,[true,"a"],false,"boolean");
SaveTest(InArrayOrObj,["abcd","a"],false,"string");
SaveTest(InArrayOrObj,[["a","b","c","d"],"a"],true,"present in array");
SaveTest(InArrayOrObj,[["a","b","c","d"],"e"],false,"absent from array");
SaveTest(InArrayOrObj,[{a:"1",b:"2",c:"3",d:"4"},"a"],true,"present in keys");
SaveTest(InArrayOrObj,[{a:"1",b:"2",c:"3",d:"4"},"1"],false,"absent from keys, but in values");

//Values
SaveTest(Values,{a:1,b:2,c:3,d:4},[1,2,3,4],"values");
SaveTest(Values,{},[],"empty object");

//Flip Keys with Values
SaveTest(FlipKeysValues,{a:"A",b:"B"},{"A":"a","B":"b"},"simple flip");
SaveTest(FlipKeysValues,{a:1,b:2,c:3,d:4},{"1":"a","2":"b","3":"c","4":"d"},"numeric values to string");
SaveTest(FlipKeysValues,{},{},"empty object");

//PushKeys
SaveTest(MapKeys,[{a:1,b:2},Identity],[1,2],"list the keys");
SaveTest(MapKeys,[{a:1,b:2},function(x){return x+1}],[2,3],"sum 1");


//Update Object Keys
function UpdateKeysTestA(a){if(a==="a"){return "e"}else return a};
function UpdateKeysTestE(e){if(e==="e"){return "f"}else return e};
SaveTest(UpdateKeys,[{a:"1",b:"2",c:"3",d:"4"},UpdateKeysTestA],{b:"2",c:"3",d:"4",e:"1"},"matching key");
SaveTest(UpdateKeys,[{a:"1",b:"2",c:"3",d:"4"},UpdateKeysTestE],{a:"1",b:"2",c:"3",d:"4"},"non-matching key");

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

SaveTest(InSingle,[[["b"]],["b"]],true,"deep array, present");

SaveTest(Subset,[{A:1},{B:2}],false,"non-overlapping")
SaveTest(Subset,[{A:1},{A:2}],false,"right key but wrong value")
SaveTest(Subset,[{A:1},{A:1}],true,"identical")
SaveTest(Subset,[{A:1,B:2},{B:2}],true,"strict subset")
SaveTest(Subset,[{A:1,B:2},{A:1,C:2}],false,"only partial overlap")

///////////////////////////////////////////////////////////////////////////////
//Set functions

SaveTest(Unique,[["a","b","c"]],["a","b","c"],"array of unique values");
SaveTest(Unique,[["1",1,true]],["1",1,true],"unique but similar values");
SaveTest(Unique,[["b","b","c"]],["b","c"],"array of duplicate values");
SaveTest(Unique,[[]],[],"empty array");
SaveTest(Unique,[[[1,2],[1,2]]],[[1,2]],"deep array");

SaveTest(Complement,[["a","b","c"],["b"]],["a","c"],"one element to exclude");
SaveTest(Complement,[["a","b","c"],["d"]],["a","b","c"],"no matching element to exclude");
SaveTest(Complement,[["a","b","c"],[]],["a","b","c"],"empty exclusion list");
SaveTest(Complement,[["b"],["a","b","c"]],[],"reverse argument order");
SaveTest(Complement,[["b","b","a","c","c"],["a"]],["b","c"],"eliminate duplicates");
SaveTest(Complement,[["d","c","b","a"],["b","d"]],["a","c"],"sort");
SaveTest(Complement,[[["d","c"],[["b"]],"a"],["c","d",[["b"]]]],["a",["d","c"]],"deep array");

SaveTest(Intersection,[["a","b","c"],["b"]],["b"],"one common element");
SaveTest(Intersection,[["a","b","c"],["d"]],[],"no common element");
SaveTest(Intersection,[["a","b","c"],[]],[],"empty list");
SaveTest(Intersection,[["b"],["a","b","c"]],["b"],"reverse argument order");
SaveTest(Intersection,[["b","b","a","c"],["b","c","c"]],["b","c"],"eliminate duplicates");
SaveTest(Intersection,[["d","c","b","a"],["a","c","b","d"]],["a","b","c","d"],"sort");

SaveTest(Union,[["a","b","c"],["b"]],["a","b","c"],"one common element");
SaveTest(Union,[["a","b","c"],["d"]],["a","b","c","d"],"new element");
SaveTest(Union,[["a","b","c"],[]],["a","b","c"],"empty list");
SaveTest(Union,[["b"],["a","b","c"]],["a","b","c"],"reverse argument order");
SaveTest(Union,[["b","b","a","c","c"],["a"]],["a","b","c"],"eliminate duplicates and sort");

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
//Repetitive functions

function TestFoldA(a,b){return a+b;};
SaveTest(Fold,[TestFoldA,1,[2,3,4]],10,"simple sum");
SaveTest(Fold,[TestFoldA,1,[]],1,"empty array");

function TestFoldB(a){return a.replace("ab","a")};
SaveTest(FixedPoint,[TestFoldB,"abbbbbba"],"aa","fixed point");

///////////////////////////////////////////////////////////////////////////////
// String Replace

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



///////////////////////////////////////////////////////////////////////////////
//Join Objects, overwriting conflicting properties

SaveTest(FuseObjects,[{a:1,b:2},{a:3}],{a:3,b:2},"object - has key");
SaveTest(FuseObjects,[{a:1,b:2},{c:3}],{a:1,b:2,c:3},"object - hasn't key");
SaveTest(FuseObjects,[{a:1,b:2},{c:3,d:4}],{a:1,b:2,c:3,d:4},"object - hasn't key");
SaveTest(FuseObjects,[{a:3},{a:1,b:2}],{a:1,b:2},"multiple properties");
SaveTest(FuseObjects,[{a:1,b:2},{c:3}],{a:1,b:2,c:3},"object - hasn't key");
SaveTest(FuseObjects,[{a:1,b:2},{}],{a:1,b:2},"add empty object");
SaveTest(FuseObjects,[{},{a:1,b:2}],{a:1,b:2},"add to empty object");
SaveTest(FuseObjects,[{a:1,b:2}],{a:1,b:2},"only one argument");
SaveTest(FuseObjects,[],{},"zero argument");

SaveTest(Clone,{a:1,b:2},{a:1,b:2},"object - hasn't key"); //Improve - How to test cloning?
SaveTest(Clone,{},{},"empty object");
SaveTest(Clone,[[1,2]],[1,2],"array");
SaveTest(Clone,[[]],[],"empty array");
SaveTest(Clone,"ab","ab",2,"string");
SaveTest(Clone,"","","empty string");



SaveTest(Datafy,{a:1,b:2},{"data-a":1,"data-b":2},"object - has key");
SaveTest(Datafy,{},{},"empty object");


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

SaveTest(Prefix,["rie"],"rie","no prefix");
SaveTest(Prefix,["rie",""],"rie","empty prefix");
SaveTest(Prefix,["","Ma"],"Ma","no name, just prefix");
SaveTest(Prefix,["rie","Ma"],"Marie","prefix absent");
SaveTest(Prefix,["Marie","Ma"],"Marie","prefix already present, don't duplicate");

SaveTest(Posfix,["rie"],"rie","no posfix");
SaveTest(Posfix,["rie",""],"rie","empty posfix");
SaveTest(Posfix,["","Ma"],"Ma","no name, just posfix");
SaveTest(Posfix,["Ma","rie"],"Marie","posfix absent");
SaveTest(Posfix,["Marie","rie"],"Marie","posfix already present, don't duplicate");

SaveTest(Posfix,["blue"," button"],"blue button","posfix with spaces, a clever regex");
SaveTest(Posfix,["blue button"," button"],"blue button","posfix with spaces, a clever regex (present)");


SaveTest(UnPosfix,["song.mp3",[".mp3",".wav"]],"song","multiple terminations, one");
SaveTest(UnPosfix,["song.mp3.wav",[".mp3",".wav"]],"song","multiple terminations, many");
SaveTest(UnPosfix,["song.wav.mp3",[".mp3",".wav"]],"song","multiple terminations, many reverse ordered");
SaveTest(UnPosfix,["song.mp3",[]],"song.mp3","empty suffix list");

SaveTest(UnPrefix,["antiantiantiall","anti"],"all","repeated prefix");
SaveTest(UnPosfix,["all is well well well"," well"],"all is","repeated end, also spaces");

SaveTest(Exfix,["ok","(",")"],"(ok)","different prefix and suffix");
SaveTest(Exfix,["__","-"],"-__-","same prefix and suffix");

SaveTest(UnExfix,["(ok)","(",")"],"ok","different prefix and suffix");
SaveTest(UnExfix,["-__-","-"],"__","same prefix and suffix");


SaveTest(UnOverfix,["a#bc#d","#"],"a#bc","basic"),
SaveTest(UnUnderfix,["a#bc#d","#"],"bc#d","basic"),
SaveTest(UnAfterfix,["a#bc#d","#"],"a","basic"),
SaveTest(UnBeforfix,["a#bc#d","#"],"d","basic"),

SaveTest(UnOverfix,["a##bc##d","#"],"a##bc","repeated"),
SaveTest(UnUnderfix,["a##bc##d","#"],"bc##d","repeated"),
SaveTest(UnAfterfix,["a##bc##d","#"],"a","repeated"),
SaveTest(UnBeforfix,["a##bc##d","#"],"d","repeated"),

SaveTest(UnBeforfix,["somethingantiantiantiall","anti"],"all","long prefix");
SaveTest(UnAfterfix,["all is well well well something"," well"],"all is","long prefix");


/*SaveTest(UnExfix,["a##b##ef##c##d","#"],"b##ef##c","shallowest"),
SaveTest(UnInfix,["a##b##ef##c##d","#"],"ad","shallowest"),
SaveTest(UnExtrafix,["a##b##ef##c##d","#"],"ef","deepest"),
SaveTest(UnIntrafix,["a##b##ef##c##d","#"],"a##bc##d","deepest"),*/


SaveTest(Parenthise,"ok","(ok)","parenthesis absent");
SaveTest(Parenthise,"(ok)","(ok)","parenthesis present");

SaveTest(Alternate,[["singleoption"]],"(singleoption)","alternate single");
SaveTest(Alternate,[["option","alternative","extra"]],"(option)|(alternative)|(extra)","alternate many");



SaveTest(PadLeft,["hi","-","4"],"--hi","smaler left");
SaveTest(PadLeft,["hi there","-","4"],"hi there","larger left");
SaveTest(PadLeft,["hi","-_","8"],"-_-_-_hi","multisymbol");
SaveTest(PadLeft,["hi","-_","0"],"hi","zero");
SaveTest(PadLeft,["hi","","8"],"hi","nosymbol");


///////////////////////////////////////////////////////////////////////////////
//Regex

///////////////////////////////////////////////////////////////////////////////
//URL MANIPULATION

SaveTest(PageProtocol,"file:///D:/Robert/pedropsi.github.io/folder/guestbook.html","file:","file:///");
SaveTest(PageProtocol,"https://pedropsi.github.io/folder/guestbook.html","https:","https://");
SaveTest(PageProtocol,"http://pedropsi.github.io/folder/guestbook.html","http:","file://");
SaveTest(PageProtocol,"folder/guestbook.html","","relative");
SaveTest(PageProtocol,"www.xxx.yyy","","www yet relative");

SaveTest(PageUnProtocol,"file:///D:/Robert/pedropsi.github.io/folder/guestbook.html","D:/Robert/pedropsi.github.io/folder/guestbook.html","file:///");
SaveTest(PageUnProtocol,"https://pedropsi.github.io/folder/guestbook.html","pedropsi.github.io/folder/guestbook.html","https://");
SaveTest(PageUnProtocol,"http://pedropsi.github.io/folder/guestbook.html","pedropsi.github.io/folder/guestbook.html","http://");
SaveTest(PageUnProtocol,"folder/guestbook.html","folder/guestbook.html","relative");
SaveTest(PageUnProtocol,"www.xxx.yyy","www.xxx.yyy","www yet relative");


SaveTest(PageFragment,"file:///D:/Robert/pedropsi.github.io/folder/guestbook.html#one","one","local tag");
SaveTest(PageFragment,"http://pedropsi.github.io/folder/guestbook.html#one","one","online tag");
SaveTest(PageFragment,"folder/guestbook.html#one#more","one#more","double chained tags");
SaveTest(PageFragment,"https://pedropsi.github.io/folder/guestbook.html#","","empty tag");

SaveTest(PageUnFragment,"https://pedropsi.github.io/gravirinth.html#$%F0%9F%93%B0%C2%BB","https://pedropsi.github.io/gravirinth.html","strange tag");

SaveTest(PageIdentifier,"file:///D:/Robert/pedropsi.github.io/folder/guestbook.html","guestbook","file:///");
SaveTest(PageIdentifier,"https://pedropsi.github.io/folder/guestbook.html","guestbook","https://");
SaveTest(PageIdentifier,"http://pedropsi.github.io/folder/guestbook.html","guestbook","http://");
SaveTest(PageIdentifier,"folder/guestbook.html","guestbook","relative");
SaveTest(PageIdentifier,"http://www.xxx.yyy","index","http no subfolder");
SaveTest(PageIdentifier,"http://www.xxx.yyy/great/greater.htm","greater","http subfolder");
SaveTest(PageIdentifier,"http://www.xxx.yyy/greater.htm","greater","http file in root folder");
SaveTest(PageIdentifier,"https://pedropsi.github.io/guestbook.html","guestbook","psi file in root folder");
SaveTest(PageIdentifier,"https://pedropsi.github.io/gravirinth.html#$%F0%9F%93%B0%C2%BB","gravirinth","UTF");
SaveTest(PageIdentifier,"https://pedropsi.github.io/puzzlescript-games-database#puzzlescript","puzzlescript-games-database","duplication of tag in title");
SaveTest(PageIdentifier,"https://pedropsi.github.io/?test=true","index","nothing but search");

SaveTest(PageDomain,"https://pedropsi.github.io/guestbook.html","pedropsi.github.io","simple html");
SaveTest(PageDomain,"file://E:/Folder1/pedropsi.github.io/status.html","pedropsi.github.io","buried file folder");
SaveTest(PageDomain,"https://www.first.com/Folder1/pedropsi.github.io/status.html","www.first.com","earliest");
SaveTest(PageDomain,"just/folders/and/folders","","nothing but folders");
SaveTest(PageDomain,"just/folders/and/a.file","","a final file");


SaveTest(PageRelativePath,"file://E:/Folder1/pedropsi.github.io/important/status.html","important/status.html","convoluted folder structure");
SaveTest(PageRelativeFolder,"file://E:/Folder1/pedropsi.github.io/important/status.html","important","convoluted folder structure");
SaveTest(PageFile,"file://E:/Folder1/pedropsi.github.io/important/status.html","status.html","convoluted folder structure");

SaveTest(PageRelativePath,"data/one/two/three.js","data/one/two/three.js","already relative");
SaveTest(PageFile,"data/one/two/three.js","three.js","relative file");

SaveTest(PageRelativePath,"data/variables/a.ext#lol","data/variables/a.ext","relative with tag");
SaveTest(PageFile,"data/variables/a.ext#lol","a.ext", "relative with tag");

SaveTest(PageUnSearch,"pedropsi.github.io/console.html?game=2","pedropsi.github.io/console.html","simple");
SaveTest(PageUnSearch,"pedropsi.github.io/console.html?game=2&level=3#tag","pedropsi.github.io/console.html#tag","with tag");



SaveTest(RelativeLinked,"file:///D:/Robert/pedropsi.github.io/folder/guestbook.html",false,"local");
SaveTest(RelativeLinked,"http://pedropsi.github.io/folder/guestbook.html",false,"online");
SaveTest(RelativeLinked,"folder/guestbook.html",true,"relative domain");

SaveTest(LocalLinked,"file:///D:/Robert/pedropsi.github.io/folder/guestbook.html",true,"local");
SaveTest(LocalLinked,"http://pedropsi.github.io/folder/guestbook.html",false,"online");
SaveTest(LocalLinked,"folder/guestbook.html",true,"relative domain");

SaveTest(InnerLinked,"file:///D:/Robert/pedropsi.github.io/folder/guestbook.html",true,"local");
SaveTest(InnerLinked,"http://pedropsi.github.io/folder/guestbook.html",true,"absolute domain");
SaveTest(InnerLinked,"folder/guestbook.html",true,"relative domain");
SaveTest(InnerLinked,"www.xxx.yyy",false,"online external www");
SaveTest(InnerLinked,"http://www.xxx.yyyl",false,"online external full http");
SaveTest(InnerLinked,"https://www.google.com/url?q=https%3A%2F%2Fpedropsi.github.io%2Fguestbook.html%23randomsomething",false,"from google");

SaveTest(PageSearch,["source","https://pedropsi.github.io/anypage.html?source=homepage"],"homepage","present query string");
SaveTest(PageSearch,["source","https://pedropsi.github.io/anypage.html?source=homepage&source=elsewhere"],"elsewhere","duplicates, prefer last parameter)");
SaveTest(PageSearch,["source","https://pedropsi.github.io/anypage.html"],"","no string (absent)");
SaveTest(PageSearch,["source","https://pedropsi.github.io/anypage.html&y=z"],"","no wanted string (absent)");
SaveTest(PageSearch,["source","https://pedropsi.github.io/puzzle-type?source=homepage&result=success"],"homepage","no wanted string (absent)");

//SECONDARY


// SaveTest(FromUTF8,"%20"," ","single character");
// SaveTeest(FromUTF8,"%20"," ","single character");
// SaveTest(FromUTF8,"%20%21"," !","multiple characters");


//Glocal Files

///////////////////////////////////////////////////////////////////////////////
//Page traversal


///////////////////////////////////////////////////////////////////////////////
//Page auto index
SaveTest(TocId,"How to play","How-to-play","simple text");
SaveTest(TocId,"#How to play","How-to-play","starting hashtag removed");
SaveTest(TocId,"     How      to    play      ","How-to-play","trailing spaces, multiple spaces");
SaveTest(TocId,"|!\/!How\"#$%&/()=@£§€{[]}'to+*¨¨´´``~~-playçãôÒÌ","How-to-play","symbol mash");


SaveTest(ShortenString,["1234567890",20],"1234567890","wide limit");
SaveTest(ShortenString,["1234567890",10],"1234567890","exact width");
SaveTest(ShortenString,["1234567890",8],"12345...","within 3 characters...");
SaveTest(ShortenString,["1234567890",5],"12...","shorten normally");
SaveTest(ShortenString,["1234567890",2],"...","below 3");
SaveTest(ShortenString,["1234567890",0],"...","zero");

///////////////////////////////////////////////////////////////////////////////
//Unique random identifier

////////////////////////////////////////////////////////////////////////////////
//Load scripts

//Load styles

///////////////////////////////////////////////////////////////////////////////
//Data Reception

//Fetch data from url



///////////////////////////////////////////////////////////////////////////////
// Data transmission - JSON, to a script in url "url"


//Network status

///////////////////////////////////////////////////////////////////////////////
// DOM Manipulation

function GetElementV(clas){
	return function Verify(result){return Classed(result,clas)};
}

SaveTest(GetElement,".rainbowline",true,"existing element of class .rainbowline",GetElementV("rainbowline"));
SaveTest(GetElement,".rainbline",undefined,"non-existing element of class .rainbline",GetElementV("rainbline"))

//////////////////////////////////////////////////
// Scroll into


//////////////////////////////////////////////////
//Sort tables

//////////////////////////////////////////////////
// Safe string loading

SaveTest(SafeString,"abcd","abcd","no dangers")
SaveTest(SafeString,"<script>a=1;b=2-3;function c(){return d}</script>","scripta1;b23;function c{return d}/script","tame dangers")


SaveTest(SafeUrl,"http://google.com","http://google.com","don't enforce http:");
SaveTest(SafeUrl,"https://google.com","https://google.com","don't enforce http:");
SaveTest(SafeUrl,"<script>tame(dangers)</script>","","script attempt")


//////////////////////////////////////////////////
// Transformer: Table

//////////////////////////////////////////////////
// Guestbook 



////////////////////////////////////////////////////////////////////////////////
// Element Generator


////////////////////////////////////////////////////////////////////////////////
// DataField and DataPack system : default DataField (customisable), many of which constitute a DataPack 


////////////////////////////////////////////////////////////////////////////////
// Opener & Closer Functions with focus option, 
// -> to use within Datapack RequestFunctions


////////////////////////////////////////////////////////////////////////////////
// Toggling class & buttons



////////////////////////////////////////////////////////////////////////////////
// Closing functions

////////////////////////////////////////////////////////////////////////////////
// Focus functions


///////////////////////////////////////////////////////////////////////////////
//Event Listeners


////////////////////////////////////////////////////////////////////////////////
// Data submission in forms

////////////////////////////////////////////////////////////////////////////////
// Data finding in forms


///////////////////////////////////////////////////////////////////////////////
// Global Data Transmission Variables

///////////////////////////////////////////////////////////////////////////////
// Modals

///////////////////////////////////////////////////////////////////////////////
// Form Validators and Modifiers


///////////////////////////////////////////////////////////////////////////////
//Message Console 



///////////////////////////////////////////////////////////////////////////////
//Sounds Control

///////////////////////////////////////////////////////////////////////////////
//Music Control

///////////////////////////////////////////////////////////////////////////////
//Fullscreen


///////////////////////////////////////////////////////////////////////////////
//Contextual Shortcuts

///////////////////////////////////////////////////////////////////////////////
//Keyboard input

///////////////////////////////////////////////////////////////////////////////
// Time-based functions

///////////////////////////////////////////////////////////////////////////////
// Cycle

///////////////////////////////////////////////////////////////////////////////
//Image


///////////////////////////////////////////////////////////////////////////////
// Canvas Drawing

///////////////////////////////////////////////////////////////////////////////
//Reduce


///////////////////////////////////////////////////////////////////////////////
// Custom events 


//////////////////////////////////////////////////////////////////////////////
// Data transmission

SaveTest(ParameterPairString,["a",1],"a=1","parameter pair");
SaveTest(ParameterPairString,["a","how fascinating"],"a=how%20fascinating","utf");

SaveTest(ParameterString,[{"a":1,"b":2}],"a=1&b=2","full parameter string");

///////////////////////////////////////////////////////////////////////////////
////Store
///////////////////////////////////////////////////////////////////////////////
// Currencies
/*
SaveTest(IsCurrencySymbol,"EUR",false,"presence");
SaveTest(IsCurrencySymbol,"€",true,"absence");

SaveTest(IsCurrencyCode,"€",false,"absence");
SaveTest(IsCurrencyCode,"EUR",true,"presence");


SaveTest(CurrencySymbol,"EUR","€","presence");
SaveTest(CurrencySymbol,"eUr","€","lowercase");
SaveTest(CurrencySymbol,"€","€","already there");
SaveTest(CurrencySymbol,"nosuchcurrency",undefined,"absence");

SaveTest(CurrencyCode,"€","EUR","presence");
SaveTest(CurrencyCode,"د.إ","AED","multi-character");
SaveTest(CurrencyCode,"EUR","EUR","already theremulti-character");
SaveTest(CurrencyCode,"%",undefined,"absence");
}
*/
///////////////////////////////////////////////////////////////////////////////
//LUL

/*

SaveTest(IsLevelAlias,"@",true,"correct alias");
SaveTest(IsLevelAlias,"1",true,"correct number");
SaveTest(IsLevelAlias,"(1 2)",false,"undesired parenthesis");
SaveTest(IsLevelAlias,"[1 2]",false,"undesired  bracket");
SaveTest(IsLevelAlias,"(1)/3",false,"undesired  divider");
SaveTest(IsLevelAlias,"[3 5]\4",false,"undesired exclusion");
SaveTest(IsLevelAlias,"#10£",false,"undesired price");
SaveTest(IsLevelAlias,"1€",false,"undesired euro");
SaveTest(IsLevelAlias,"1£",false,"undesired pound");
SaveTest(IsLevelAlias,"1¥",false,"undesired yen");
SaveTest(IsLevelAlias,"1$",false,"undesired dollar");
SaveTest(IsLevelAlias,"+1",false,"undesired +");
SaveTest(IsLevelAlias,"-1",false,"undesired -");
SaveTest(IsLevelAlias,"§",false,"undesired section sign");

SaveTest(IsCurrentLevelAlias,"@",true,"correct alias");
SaveTest(IsCurrentLevelAlias,"@@",false,"random string");
SaveTest(IsCurrentLevelAlias,"1",false,"level number");

SaveTest(IsLevelNumber,1,true,"correct alias");
SaveTest(IsLevelNumber,-1,true,"accept negative indezes temporarily");
SaveTest(IsLevelNumber,"@",false,"current level");
SaveTest(IsLevelNumber,"random",false,"random string");

SaveTest(CanonicalLevel,"1",1,"from string number");
SaveTest(CanonicalLevel,1,1,"from number");


SaveTest(CanonicalLevelGroup,[[]],[],"empty group");
SaveTest(CanonicalLevelGroup,[[1]],[1],"mono group");
SaveTest(CanonicalLevelGroup,[["1","2"]],[1,2],"mono group, string");
SaveTest(CanonicalLevelGroup,[[2,1]],[1,2],"normal groups, sort");
SaveTest(CanonicalLevelGroup,[[2,1,2,1,1,1]],[1,2],"duplicate groups");
SaveTest(CanonicalLevelGroup,[[1,2,0,3,-4]],[1,2,3],"exclude underflow");
SaveTest(CanonicalLevelGroup,[[1,2,3,9999999,4]],[1,2,3,4],"exclude overflow");


SaveTest(CombineLevelGroups,[[],[]],[],"both empty groups");
SaveTest(CombineLevelGroups,[[],[1]],[1],"one empty group");
SaveTest(CombineLevelGroups,[[1],[]],[1],"another empty group");
SaveTest(CombineLevelGroups,[[3,1],[1,2]],[1,2,3],"duplicates and unsorted");

//Tests refer to burokku konekuta maxlevel 7
SaveTest(CanonicalLevelRange,[[]],[],"empty group");
SaveTest(CanonicalLevelRange,[[1]],[1],"mono range");
SaveTest(CanonicalLevelRange,[["1","2"]],[1,2],"range as string");
SaveTest(CanonicalLevelRange,[[2,1]],[1,2],"normal groups, out of order");
SaveTest(CanonicalLevelRange,[[2,1,2,1,1,1]],[1,2],"duplicate groups");
SaveTest(CanonicalLevelRange,[[1,0,3,-4]],[1,2,3],"exclude underflow");
SaveTest(CanonicalLevelRange,[[1,3,9999999,4]],[1,2,3,4,5,6,7],"exclude overflow"); //


SaveTest(CombineLevelRanges,[[],[]],[],"both empty ranges");
SaveTest(CombineLevelRanges,[[1],[]],[1],"one empty range");
SaveTest(CombineLevelRanges,[[1,2,3],[4,5]],[1,2,3,4,5],"no overlap");
SaveTest(CombineLevelRanges,[[1,2,3],[2,3,4]],[1,2,3,4],"partial overlap");
SaveTest(CombineLevelRanges,[[2,3],[2,3]],[2,3],"total overlap");
SaveTest(CombineLevelRanges,[[2,1,3],[3,1,2]],[1,2,3],"unsorted");


SaveTest(ExcludeRanges,[[],[]],[],"both empty ranges");
SaveTest(ExcludeRanges,[[1],[]],[1],"one empty range");
SaveTest(ExcludeRanges,[[1,2,3],[4,5]],[1,2,3],"no overlap");
SaveTest(ExcludeRanges,[[1,2,3],[2,3,4]],[1],"partial overlap");
SaveTest(ExcludeRanges,[[2,3],[2,3]],[],"total overlap");
SaveTest(ExcludeRanges,[[2,1,3],[3,1,2]],[],"unsorted");


SaveTest(PickedEnoughFromLevelRange,[[1],1,[]],false,"one empty range");
SaveTest(PickedEnoughFromLevelRange,[[],0,[]],true,"empty, but nothing required anyway");
SaveTest(PickedEnoughFromLevelRange,[[1],0,[]],true,"nothing required");
SaveTest(PickedEnoughFromLevelRange,[[1,2,3],1,[1,2,3]],true,"overlap, more than enough");
SaveTest(PickedEnoughFromLevelRange,[[1,2,3],3,[1,2]],false,"overlap, not enough");
SaveTest(PickedEnoughFromLevelRange,[[1,2,3],1,[4,5,6]],false,"no overlap");
SaveTest(PickedEnoughFromLevelRange,[[1,2,3],4,[1,2,3]],true,"requested more than range allows, default to max");
SaveTest(PickedEnoughFromLevelRange,[[1,2,3],0,[4]],true,"no need to pick anything");
SaveTest(PickedEnoughFromLevelRange,[[1,2,3],-1,[4]],true,"no need to pick anything");




SaveTest(SplitA,["ana banana maria","na"],"a","multiple");
SaveTest(SplitAB,["ana banana maria","na"],"ana","multiple");
SaveTest(SplitABC,["ana banana maria","na"],"ana bana","multiple");
SaveTest(SplitABCD,["ana banana maria","na"],"ana banana","multiple");

SaveTest(SplitBCDE,["ana banana maria","na"],"na banana maria","multiple");
SaveTest(SplitCDE,["ana banana maria","na"]," banana maria","multiple");
SaveTest(SplitDE,["ana banana maria","na"],"na maria","multiple");
SaveTest(SplitE,["ana banana maria","na"]," maria","multiple");

SaveTest(SplitC,["ana banana maria","na","na"]," bana","multiple");
SaveTest(SplitBC,["ana banana maria","na","na"],"na bana","multiple");
SaveTest(SplitBCD,["ana banana maria","na","na"],"na banana","multiple");
SaveTest(SplitCD,["ana banana maria","na","na"]," banana","multiple");

SaveTest(SplitA,["ana banana maria","lol"],"","not present");
SaveTest(SplitAB,["ana banana maria","lol"],"","not present");
SaveTest(SplitABC,["ana banana maria","lol"],"","not present");
SaveTest(SplitABCD,["ana banana maria","lol"],"","not present");

SaveTest(SplitBCDE,["ana banana maria","lol"],"","not present");
SaveTest(SplitCDE,["ana banana maria","lol"],"","not present");
SaveTest(SplitDE,["ana banana maria","lol"],"","not present");
SaveTest(SplitE,["ana banana maria","lol"],"","not present");

SaveTest(SplitC,["ana banana maria","lol","lol"],"","not present");
SaveTest(SplitBC,["ana banana maria","lol","lol"],"","not present");
SaveTest(SplitBCD,["ana banana maria","lol","lol"],"","not present");
SaveTest(SplitCD,["ana banana maria","lol","lol"],"","not present");

*/

SaveTest(SVGLinePairs,["M 1 2 3 4"],[[1,2],[3,4]],"make string pairs");

SaveTest(SVGLineApply,["M 1 2 3 4",xy=>[xy[1],xy[0]]],"M 2 1 4 3 ","modify numbers");

SaveTest(SVGPathSplit,["M 1 2 L 3 4 Q 5 6 7 8 Z"],["M 1 2 ","L 3 4 ","Q 5 6 7 8 ","Z "],"split path, multiple components");

///////////////////////////////////////////////////////////////////////////////
//Run Tests only after loading the external resources below
//ListenOnce("TestReady",Test);

///////////////////////////////////////////////////////////////////////////////
// To Improve
/*
(function MockLoadPuzzlescript(){
	var a=PageIdentifier;
	console.log(a.toString());
	PageIdentifier=function(){return "burokku-konekuta"};
	LoadAsync("puzzlescript-embed","./codes/game/");
	ListenOnce("GameBar",
		function(){
			RemoveElement(".game-supra-container");
			delete Window["Mobile"];
			PageIdentifier=a;
			if(Equal(PageIdentifier,a))
				Shout("TestReady")
			}
			)
})();
*/
/*
(function TestInEnvironment(PrepareF,ReadySignal,TestF,CleanupSignal,CleanupF){
	PrepareF();
	Listen(ReadySignal,TestF);
	Listen(CleanupSignal,CleanupF);
})();*/



///////////////////////////////////////////////////////////////////////////////
CodeCoverage=function(){
	return PercentageText(Test.functions.length/Introspect().length,2);
}

DynamicText("code-coverage",CodeCoverage());
DynamicText("code-coverage-included",Enumerate(Test.functions));
DynamicText("code-coverage-excluded",Enumerate(Complement(Introspect(),Test.functions)));

Test()