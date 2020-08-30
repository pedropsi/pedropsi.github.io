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
	Kinemate(actions);
}

function HallOfFameMacro(){
	return [{
		Starter:RequestHallOfFame,
		endDelay:1000
	},{
		Starter:()=>GetElement("INPUT").value="PSI (test)",
		endDelay:1000
	},{
		Starter:()=>GetElement(".button").click(),
		endDelay:1000
	}]
}
 