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
		InsertCut(Undo.backups,state,Undo.pointer);
		Undo.pointer=Undo.pointer+1;
	}
}


function Undo(){
	if(Undo.blocked)
		return;

	Undo.pointer=Max(1,Undo.pointer-1);

	var state=Undo.backups[Undo.pointer-1];
	
	ObtainSetLevelState(state);
	
	PulseSelect("UndoButton");
}


function Redo(){
	if(Redo.blocked)
		return;

	Undo.pointer=Min(Undo.backups.length,Undo.pointer+1);

	var state=Undo.backups[Undo.pointer-1];
	
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

//Game bar buttons

if(typeof GameBarButtons==="undefined")
	var GameBarButtons={};

if(typeof GameBarButtonTooltips==="undefined")
	var GameBarButtonTooltips={};

if(typeof ObtainUndoAllowed==="undefined")
	var ObtainUndoAllowed=True;

if(typeof ObtainRedoAllowed==="undefined")
	var ObtainRedoAllowed=True;

if(typeof ObtainRestartAllowed==="undefined")
	var ObtainRestartAllowed=True;


if(ObtainUndoAllowed()){
	GameBarButtons['undo']={
		onclick:'UndoAndFocus();',
		onmousedown:'AutoRepeat(UndoAndFocus,250);',
		ontouchstart:'AutoRepeat(UndoAndFocus,250);',
		onmouseup:'AutoStop(UndoAndFocus);',
		ontouchend:'AutoStop(UndoAndFocus);',
		ontouchcancel:'AutoStop(UndoAndFocus);'
	}
	GameBarButtonTooltips["undo"]="Undo";
}

if(ObtainRedoAllowed()){
	GameBarButtons['redo']={
		onclick:'RedoAndFocus();',
		onmousedown:'AutoRepeat(RedoAndFocus,250);',
		ontouchstart:'AutoRepeat(RedoAndFocus,250);',
		onmouseup:'AutoStop(RedoAndFocus);',
		ontouchend:'AutoStop(RedoAndFocus);',
		ontouchcancel:'AutoStop(RedoAndFocus);'
	};
	GameBarButtonTooltips["redo"]="Redo";
}

if(ObtainRestartAllowed()){
	GameBarButtons['restart']={
		onclick:'ObtainRestart();GameFocus();'
	};
	GameBarButtonTooltips["restart"]="Restart";
}

Shout("data-game-undo")