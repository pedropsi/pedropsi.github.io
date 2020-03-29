////////////////////////////////////////////////////////////////////////////////
//Behaviour Tests

function TestPSWin(){
	var i=CurrentScreen();
	var l=ObtainStateScreens().length;
	ObtainAction();
	while(i<=l){
		setTimeout(TestPSNext,i*1000);
		i++;
	}
	setTimeout(TestHOFSub,i*1000);
}

function TestHOFSub(){
	setTimeout(function(){GetElement(".modal INPUT").value="PSI"},1000);
	setTimeout(function(){GetElement(".modal-content .button").click();},2000);
}

function TestPSNext(){
	if(IsScreenMessage(CurrentScreen()))
		ObtainAction();
	else
		DoWin();
}