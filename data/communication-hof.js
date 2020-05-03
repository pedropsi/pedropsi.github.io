//////////////////////////////////////////////////
// HOF 

function DeployHOF(jsonstring){
	var table=LoadTableHTML(jsonstring,Identity,["Date","Game","Winner","Score"]);
	var targetID=PageIdentifier()+"-area";
	ReplaceChildren(table,targetID);
	DynamicTables();
};

function DisplayHOF(){
	var url=DisplayMacroURL({
		docId:"1tp42m_9MoMN4IHzO6H9aqTkU2wt_FtdWGK3Q7Uwb9hw",
		sheetName:"Hall-of-Fame",
		rowStart:8
	});
	LoadData(url,DeployHOF);
}

DisplayHOF();