
CoreFunctionNames=[
	"In","InString","InArrayOrObj",
	"Capture",
	"Union","Unique","Intersection",
	"Equal","EqualFunction","EqualRegex",
	"IsNan","IsArray",
	"FunctionName","FunctionBody",
	"IsObject","IsRegex","IsNode","IsDate",
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
		var args=Values(arguments);
		Capture["list"].push(functionName);
		Capture["list"]=Union(Capture["list"]);
		globalThis[functionName]=Capture[functionName];
		return Apply(globalThis[functionName],args);
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


FunctionSourceTokens=function(F){
	if(!F)
		return [];

	var separator="SecretSePaRaToR"; //must not be confoundable
	var symbols=Tokens().split("").concat([" ","\n","\t","\r"]); //things to ignore

	var tokens=StringReplace(F.toString(),symbols.map(t=>[t,separator])).split(separator);
	tokens=tokens.filter(t=>t&&t[0].toLowerCase()!==t[0])
	tokens=Complement(tokens,JavascriptFunctionNames);
	
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
