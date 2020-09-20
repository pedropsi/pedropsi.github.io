var curcheckpoint=0;


function LocalsaveCheckpoints(newstack){
	if(savePermission)
		return LocalStorage("checkpoint",newstack);
	else
		EraseLocalsaveCheckpoints();
}

// if(typeof LocalSavers==="undefined")
// 	var LocalSavers=[];
// LocalSavers.push(LocalsaveCheckpoints);

function EraseLocalsaveCheckpoints(){
	return EraseLocalStorage("checkpoint");
};

function LocalloadCheckpoints(){
	return LocalStorage("checkpoint");
}



function Checkpointed(){
	return LocalStorage("checkpoint").length>0;
}



function GetCheckpoints(){
	if(GetCheckpoints.stack)
		return GetCheckpoints.stack;
	else
		return GetCheckpoints.stack=LocalloadCheckpoints();
}

function LoadCheckpoint(n){
	var stack=GetCheckpoints();

	if(n<stack.length)
		ConsoleAddOnce("Beware! Saving at a past checkpoint will erase former future progress...");
	
	curcheckpoint=Min(Max(n-1,0),stack.length-1); //decrement 1 unit
	return curlevelTarget=stack[curcheckpoint];
}


function PushSaveCheckpoint(levelTarget){
	var stack=GetCheckpoints();
	
	function EvacuateCheckpoints(stack,n){
		var s=stack;
		var i=s.length-1;
		while(n<i){
			i--;
			s.pop();
		}
		return s;
	};
	
	if(curcheckpoint+1<stack.length){
		stack=EvacuateCheckpoints(stack,curcheckpoint);
		ConsoleAdd("Saved in a past checkpoint. Future progress erased.")
	}
	
	stack=stack.concat([levelTarget]);
	curcheckpoint=stack.length-1;
	
	return GetCheckpoints.stack=stack;
}



function LocalloadCheckpoint(){
	if(Checkpointed()){
		var stack=GetCheckpoints();
		curcheckpoint=stack.length-1;
		curlevelTarget=stack[curcheckpoint];
	}
}

function ResetCheckpoints(){
	curcheckpoint=0;
	EraseLocalsaveCheckpoints();
	GetCheckpoints.stack=[];
}


function GoToScreenCheckpoint(n){
	LoadCheckpoint(n);
	loadLevelFromStateTarget(state,CurrentScreen(),curlevelTarget);
	ResizeCanvas();
	
	EchoSelect(n,"checkpoint");
};


ObtainResetLevel=function(){
	ResetLevel();
	ResetCheckpoints();
	curlevelTarget=null;
}







function ObtainLevelSelectorOptions(){
	if(!Checkpointed())
		return LevelSelectorOptions();
	else {
		var checkpointIndices=Object.keys(GetCheckpoints());
		return {
			questionname:"Reached checkpoints:",
			qchoices:checkpointIndices.map(function(l){return (Number(l)+1)+"";}),
			defaultChoice:function(i,c){return Number(c)===checkpointIndices.length}
		}
	}
}

function ObtainSelectLevel(lvl){
	if(Checkpointed())
		GoToScreenCheckpoint(lvl);
	else 
		SelectPureLevel(lvl);
};


function ObtainLevelDescriptionTitle(lvl){
	if(!lvl)
		return "";
	if(Checkpointed())
		return "Select checkpoint "+lvl;
	else
		return LevelGatedDescription(lvl);
}