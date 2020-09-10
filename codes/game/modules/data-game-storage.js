/////////////////////////////////////////////////////////////////////////////////////
// Save permissions

if(typeof DATAVERSION==="undefined")
	var DATAVERSION=5;

var savePermission=true;

function SaveButton(){
	if(!LocalStored())
		GameBarButtons["save"]={
			onclick:'ToggleSavePermission(this);GameFocus();',
			class:savePermission?'selected':''
		};
};

function ToggleSavePermission(thi){
	Deselect(thi);
	if(savePermission){
		savePermission=false;
		EraseLocalsave();
		ConsoleAdd("All "+LocalStorageName['list'].length+" cookies erased for "+PageTitle()+": Localsave is OFF across sessions.");
	}
	else 
		ActivateSavePermission(thi);
}

function ActivateSavePermission(thi){
	savePermission=true;
	Localsave();
	ConsoleAddMany([
		"Localsave is ON for "+PageTitle()+".",
		"To stop localsaving and erase all "+LocalStorageName['list'].length+" cookies, please deselect "+ObtainSymbol("Save")+"."
		]);
	Select(thi);
}


/////////////////////////////////////////////////////////////////////////////////////
// Save Level & Checkpoint

function LocalStored(){
	try{return window.localStorage;}
	catch(e){return false;} //Log error
}

if(typeof ObtainStorageURL==="undefined")
	function ObtainStorageURL(){
		if (typeof PageUnFragment==="undefined")
			return document.URL;
		else
			return PageUnFragment(document.URL);
	}

function LocalStorageName(name){
	if(!name)
		return ObtainStorageURL();
	else{
		if(!LocalStorageName['list'])
			LocalStorageName['list']=[];
		
		if(!In(LocalStorageName['list'],name))
			LocalStorageName['list'].push(name);
		
		return ObtainStorageURL()+"_"+name.toLowerCase();
	}	
}
function LocalStorage(name,set,TransformF){ //Getter-setter
	if(!set){
		var data=false;
		try{
			var data=localStorage[LocalStorageName(name)];
		}
		catch(err){};
		
		if(!data)
			return [];
		data=JSON.parse(data);
		
		if(data['data']){ //unwrap capsule
			var vers=data['vers'];
			data=data['data'];
			if(!vers||vers<DATAVERSION) //legacy conversion
				data=LegacyConversion(name,data,vers);
		}		
		
		if(TransformF&&data.length)
			data=data.map(TransformF);
		return data;
	}
	else{
		if(name==="")
			var capsule=set; //no capsule, for compatibility
		else 
			var capsule={  //wrap in capsule
				'data':set,
				'vers':DATAVERSION,
				'name':name
			};
	}
	try{
		return localStorage[LocalStorageName(name)]=JSON.stringify(capsule);
	}
	catch(err){};
}




////////////////////////////////////////////////////////////////////////////////
Shout("data-game-storage")