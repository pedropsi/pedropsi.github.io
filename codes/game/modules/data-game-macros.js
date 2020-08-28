function WinLevelMacro(screen){
	return [{
		Starter:()=>GoToScreen(screen),
		endDelay:1000
	},{
		Starter:DoWin,
		endDelay:1000
	}]
};

function WinGameRun(){
	var actions=UnSolvedLevelScreens().map(WinLevelMacro).flat();
	MacroRun(actions);
}
 