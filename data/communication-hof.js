//////////////////////////////////////////////////
// HOF 

var DisplayIDs={
	"hall-of-fame":"AKfycbx3VJTScX-y6L3I4KMql10hVBx_MpjoDfocNHzhR9nuRAQkedFi"
};

function MakeHOF(jsonstring){
	return LoadTableHTML(jsonstring,Identity,["Date","Game","Winner","Score"])
};

function DisplayTable(){
	var identifier=PageIdentifier();
	if(!In(DisplayIDs,identifier))
		return;
	var url=DisplayFullURL(DisplayIDs[identifier]);
	OverwriteData(url,identifier+"-area",MakeHOF);
	ListenOnce("updated-"+identifier+"-area",DynamicTables);
}

DisplayTable()