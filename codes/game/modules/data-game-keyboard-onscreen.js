//Onscreen keyboard

function RequestKeyboard(){
	
	if(!ObtainKeyboardAllowed)
		return;
	
	var DFOpts={
		executeChoice:ObtainGameAction,
		qchoices:ObtainKeyboardKeys(),
		qchoicesViewF:ObtainSymbol
	}
	
	var Shortcuts=ObtainKeyActionsGameBar();
	
	RequestDataPack([
			['keyboard',DFOpts]
		],
		{
			action:console.log,
			qonsubmit:Identity,
			qonclose:GameFocusAndRestartUndoButtons,
			qdisplay:ObtainKeyboardLauncher(),
			qtargetid:ObtainKeyboardTarget(),
			shortcutExtras:Shortcuts,
			requireConnection:false,
			buttonSelector:"KeyboardButton",
			spotlight:gameSelector,
			closeonblur:false,
			layer:-1
	});
	
	function HideButtons(){
		ReplaceElement(HiddenHTML("RestartButton"),"RestartButton");
		ReplaceElement(HiddenHTML("UndoButton"),"UndoButton");
		ReplaceElement(HiddenHTML("RedoButton"),"RedoButton");
	}
	
	HideButtons();
}

function GameFocusAndRestartUndoButtons(){
	GameFocus();
	
	function RestoreButtons(){
		ReplaceElement(RestartButton(),"RestartButton");
		ReplaceElement(UndoButton(),"UndoButton");
		ReplaceElement(RedoButton(),"RedoButton");
	}
	
	setTimeout(RestoreButtons,100); //Needed
}

function GameKeyboardKeys(){
	return [["undo","redo","restart"]]; // Undo and Restart
}

function CloseKeyboard(){
	if(CurrentDatapack().buttonSelector==="KeyboardButton")
		CloseCurrentDatapack();
	GameFocus();
}

//Game bar button

function KeyboardButton(){
	if(ObtainKeyboardAllowed)
		return GameBarButtonHTML("keyboard",{onclick:'RequestKeyboard();'})
	else
		return "";
}

if(typeof KeyActionsGameBar==="undefined")
	KeyActionsGameBar={};
	
KeyActionsGameBar[ObtainMainKey("keyboard")]=ObtainKeyboardAllowed?RequestKeyboard:Identity;


Shout("data-game-keyboard-onscreen")