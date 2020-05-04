//////////////////////////////////////////////////
// HOF 

DeployHOF=function(jsonstring){
	var table=LoadTableHTML(jsonstring,Identity,["Date","Game","Winner","Score"]);
	var targetID=PageIdentifier()+"-area";
	ReplaceChildren(table,targetID);
	DynamicTables();
};

DisplayHOF=function(){
	var url=MacroURL(Inflows("hall-of-fame"));
	LoadData(url,DeployHOF);
}

DisplayHOF();