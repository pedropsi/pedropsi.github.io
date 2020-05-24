//////////////////////////////////////////////////
// HOF 

DeployHOF=function(jsonstring){
	var header=["Date","Game","Winner"];
	if(PageIdentifier()==="hall-of-fame")
		header.push("Score");
	var table=LoadTableHTML(jsonstring,Identity,header);
	var targetID=PageIdentifier()+"-area";
	ReplaceChildren(table,targetID);
	DynamicTables();
};

DisplayHOF=function(){
	var url=MacroURL(Inflows(PageIdentifier())); //hall-of-fame, hall-of-fame-global 
	LoadData(url,DeployHOF);
}

DisplayHOF();