//////////////////////////////////////////////////
// HOF 

var DisplayIDs={
	"hall-of-fame":"AKfycbx3VJTScX-y6L3I4KMql10hVBx_MpjoDfocNHzhR9nuRAQkedFi"
};

var identifier=PageIdentifier();

function DeployHOF(jsonstring){
	var table=LoadTableHTML(jsonstring,Identity,["Date","Game","Winner","Score"]);
	var targetID=identifier+"-area";
	ReplaceChildren(table,targetID);
	DynamicTables()
};

function DisplayHOF(){
	var url=MacroURL(DisplayIDs[identifier]);
	LoadData(url,DeployHOF);
}

if(In(DisplayIDs,identifier))
	DisplayHOF();