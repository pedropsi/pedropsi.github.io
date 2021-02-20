///////////////////////////////////////////////////////////////////////////////
//Undo & Restart

function Restart(){
	ObtainUpdateLevel(ObtainStartingLevelState());
	PulseSelect("RestartButton");
}


function EmptyUndo(){
	Undo.backups=[ObtainStartingLevelState()];
	Undo.pointer=1;
}

function SkipUndo(){//not working
	if(!Undo.backups||Undo.pointer===1)
		EmptyUndo();
	else{
		Undo.pointer=Undo.pointer-1;
		Undo.backups=Delete(Undo.backups,Undo.pointer);
	}
}

function AddUndo(state){
	var state=Clone(state);
	if(!Undo.backups)
		EmptyUndo();

	if(!Equal(Undo.backups[Undo.pointer-1],state)){
		Undo.backups=InsertCut(Undo.backups,state,Undo.pointer);
		Undo.pointer=Undo.pointer+1;
	}
}


function Undo(){
	if(Undo.blocked)
		return;

	if(!Undo.backups)
		EmptyUndo();

	Undo.pointer=Max(1,Undo.pointer-1);

	var state=Clone(Undo.backups[Undo.pointer-1]);
	
	ObtainSetLevelState(state);
	
	PulseSelect("UndoButton");
}


function Redo(){
	if(Redo.blocked)
		return;
	
	if(!Undo.backups)
		EmptyUndo();

	Undo.pointer=Min(Undo.backups.length,Undo.pointer+1);

	var state=Clone(Undo.backups[Undo.pointer-1]);
	
	ObtainSetLevelState(state);
	
	PulseSelect("RedoButton");
}


function BlockUndo(){
	Undo.blocked=true;
	Redo.blocked=true;
}

function UnBlockUndo(){
	Undo.blocked=false;
	Redo.blocked=false;
}

DefinedShout("data-game-undo")