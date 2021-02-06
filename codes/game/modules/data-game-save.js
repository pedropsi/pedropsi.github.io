/////////////////////////////////////////////////////////////////////////////////////
// Save permissions
if(typeof DATAVERSION==="undefined")
	var DATAVERSION=5;

var savePermission=true;

function ToggleSavePermission(thi){
	Deselect(thi);
	if(savePermission){
		savePermission=false;
		EraseLocalsave();
		ConsoleAdd(`The local save file for ${PageTitle()} is OFF. Reload the page to erase it.`);
	}
	else 
		ActivateSavePermission(thi);
}

function ActivateSavePermission(thi){
	savePermission=true;
	Localsave();
	ConsoleAddMany([
		`The local save file is ON for ${PageTitle()}.`,
		`To erase the save file, deselect ${ObtainSymbol("Save")} and reload the page.`
		]);
	Select(thi);
}




/////////////////////////////////////////////////////////////////////////////////////
// Save Level

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

function LegacyConversion(name,data,vers){
	var Converter=LegacyConversion[name];
	if(!Converter)
		return data;
	else
		return Converter(data,vers);
}

function ArrayRemap(wrongarray,rightarray){
	var i=0;
	var j=0;
	var newarray=[];
	while(i<wrongarray.length){
		if(In(rightarray,wrongarray[i])){
			newarray.push(wrongarray[i]);
			j=rightarray.indexOf(wrongarray[i])+1;
		}
		else{
			newarray.push(rightarray[j])
			j++;
		}
		i++;
	}
	return newarray;
}

LegacyConversion["solvedlevels"]=function(solvedlevels,vers){

	if(!vers||vers<5)	 					//Previous data format;
		solvedlevels=solvedlevels.map(LevelNumber);
	
	if(solvedlevels.some(IsScreenMessage))	//Case of added/removed interlevel messages;
		solvedlevels=ArrayRemap(solvedlevels,Levels());
	
	return solvedlevels;
};

LegacyConversion["checkpoint"]=function(sta,vers){
	if(!vers||vers<5)
		if(sta.dat)
			return [sta];
	return sta;
};

function CanSaveLocally(){
	try{
		return window.localStorage;
		}
	catch(e){return false;} //Log error
}

function HasLevel(){
	return CanSaveLocally()&&!(LocalStorage("").length===0);
}


// Localsave = save in local storage
if(typeof ObtainLevelsWriter==="undefined")
	var ObtainLevelsWriter=Identity;

function LocalsaveLevel(lvl){
	if(!lvl)
		var lvl=CurLevelNumber();
	if(savePermission){
		LocalStorage("solvedlevels",ObtainLevelsWriter(SolvedLevels()));
		return LocalStorage("",LevelScreen(lvl));
	}
	else
		EraseLocalsaveLevel();
};

if(typeof ObtainLocalsaveLevel==="undefined")
	var ObtainLocalsaveLevel=LocalsaveLevel;

if(typeof LocalSavers==="undefined")
	var LocalSavers=[];
LocalSavers.push(LocalsaveLevel);

function Localsave(){
	LocalSavers.map(f=>f());
}	

function EraseLocalStorage(name){
	if(name){
		try{
			return localStorage.removeItem(LocalStorageName(name));
		}
		catch(err){};
	}
	else if(LocalStorageName['list'])
		LocalStorageName['list'].map(EraseLocalStorage);
}

function EraseLocalsaveLevel(){
	EraseLocalStorage("solvedlevels");
	return EraseLocalStorage("");
};


function EraseLocalsave(){
	if(CanSaveLocally())
		EraseLocalStorage();
}

//Load Game

// Load from memory
if(typeof ObtainLevelReader==="undefined")
	var ObtainLevelReader=Number;

function LocalloadLevel(){
	SolvedLevels.levels=LocalStorage("solvedlevels",undefined,ObtainLevelReader);
	return CurrentScreen(LocalStorage(""));
}

if(typeof ObtainLoadGame==="undefined"){
	var ObtainLoadGame=LocalloadLevel;
}

//Game bar integration

function SaveButton(){
	if(!CanSaveLocally())
		return "";
	return GameBarButtonHTML('save',{
		onclick:'ToggleSavePermission(this);GameFocus();',
	})
};



AttendOnce("GameBar",function(){
	ShowButton(SaveButton);
	if(savePermission)
		Select("SaveButton")
});


Shout("data-game-save")