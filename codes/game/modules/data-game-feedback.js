////////////////////////////////////////////////////////////////////////////////
// Feedback

var HasGameFeedback=True;


function FeedbackButton(){
	if(HasGameFeedback())
		GameBarButtonHTML["feedback"]={onclick:'RequestGameFeedback();'};
}

if(typeof RequestGameFeedback==="undefined"||(ConsoleExternal&&ConsoleExternal())){
	var RequestGameFeedback=Identity;
	HasGameFeedback=False;
}

if(typeof HintTips==="undefined")
	var HintTips={};
	
if(HasGameFeedback())
	AddDictionaryArray(HintTips,"tips-interlevel",[
		"Email Pedro PSI feedback by pressing "+ActionKeyText("feedback")+", anytime!"
	]);


Shout("data-game-feedback")