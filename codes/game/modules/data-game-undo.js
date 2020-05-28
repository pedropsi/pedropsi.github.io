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
	if(!Undo.backups)
		EmptyUndo();

	if(!Equal(Last(Undo.backups),state)){
		InsertCut(Undo.backups,state,Undo.pointer);
		Undo.pointer=Undo.pointer+1;
	}
}


function Undo(){
	Undo.pointer=Max(1,Undo.pointer-1);

	var state=Undo.backups[Undo.pointer-1];
	
	ObtainSetLevelState(state);
	
	PulseSelect("UndoButton");
}


function Redo(){
	Undo.pointer=Min(Undo.backups.length,Undo.pointer+1);

	var state=Undo.backups[Undo.pointer-1];
	
	ObtainSetLevelState(state);
	
	PulseSelect("RedoButton");
}


Shout("data-game-undo")