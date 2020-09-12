////////////////////////////////////////////////////////////////////////////////
// Feedback

var HasGameFeedback=True;


function FeedbackButton(){
	if(HasGameFeedback())
		GameBarButtonHTML["feedback"]={onclick:'RequestGameFeedback();'};
}


if(typeof HintTips==="undefined")
	var HintTips={};
	
if(HasGameFeedback())
	AddDictionaryArray(HintTips,"tips-interlevel",[
		"Email Pedro PSI feedback by pressing "+ActionKeyText("feedback")+", anytime!"
	]);


	//////////////////////////////////////////////////////
// Real time Feedback Requests

RequestGameFeedback=function(){

	if(!RequestGameFeedback.requests)
		RequestGameFeedback.requests=[];
	  
	function RecordAndLaunchThanksBalloon(DP){
		RequestGameFeedback.requests.push(CurrentScreen());
		LaunchConsoleThanks(DP);
		FocusAndResetFunction(RequestGameFeedback,GameFocus)();};
	
	var DPsettingsObj={
		qtargetid:ParentSelector(ObtainGameSelector()),
		qdisplay:LaunchAvatarBalloon,
		qonsubmit:RecordAndLaunchThanksBalloon,
		qonclose:FocusAndResetFunction(RequestGameFeedback,GameFocus),
		shortcutExtras:FuseObjects(ObtainKeyActionsGameBar?ObtainKeyActionsGameBar():{},{"E":CloseFeedback}),
		thanksmessage:"★ Thank you for your feedback! ★",
		buttonSelector:"FeedbackButton",
	};
	
	var DFsettingsObj={};
	var DFSnapshot=['snapshot',{}];
	  
	function HasFeedback(){return In(RequestGameFeedback.requests,CurrentScreen());};
	
	if(CurrentDatapack()&&CurrentDatapack().buttonSelector==="FeedbackButton")
		CloseCurrentDatapack();
	else if(TitleScreen()){
		DFsettingsObj.questionname="<p>Press "+ObtainSymbol("feedback")+" or <kbd>"+ObtainMainKey("feedback")+"</kbd> as soon as you start the game to Email Pedro PSI real-time feedback. Much appreciated!</p>";
		RequestDataPack([['plain',DFsettingsObj]],DPsettingsObj);
	}
	else if(HasFeedback()){
		DFsettingsObj.questionname="<p>Any further comments on <b>"+ObtainLevelTitle(CurLevelNumber())+"</b>?</p>";
		RequestDataPack([['answer',DFsettingsObj],DFSnapshot],DPsettingsObj);
	}
	else if(!IsScreenMessage(CurrentScreen())){
		DFsettingsObj.questionname="<p>What do you think of <b>"+ObtainLevelTitle(CurLevelNumber())+"</b>, so far?</p>";
		RequestDataPack([['answer',DFsettingsObj],DFSnapshot],DPsettingsObj);
	}
	else{
		DFsettingsObj.questionname="<p>Comments or ideas?</p>";
		RequestDataPack([['answer',DFsettingsObj],DFSnapshot],DPsettingsObj);
	}

}

CloseFeedback=function(){
	if(CurrentDatapack().buttonSelector==="FeedbackButton")
		CloseCurrentDatapack();
	GameFocus();
}

PrintGameState=function(){
	return GetElement("gameCanvas").toDataURL();
}

//////////////////////////////////////////////////////////////////////
//Hall of Fame

RequestHallOfFame=function(){
	if(LocalStorage("hall-of-fame")===true)
		return RequestWinnerMessage();

	if(ConsoleExternal())
		RequestDataPack([
		['alias',{
			questionname:"Enter the Global Hall of Fame:",
			qplaceholder:"Your name or alias",
			qrequired:true,
			qerrorcustom:"The Hall of Fame's guards ask for at least 2 alphanumerics!"}
		]],
		{
			destination:"hall-of-fame-global",
			qonsubmit:SuccessF
		});
	else
		RequestDataPack([
	['alias',{
		questionname:"Enter the Hall of Fame:",
		qplaceholder:"Your name or alias",
		qrequired:true,
		qerrorcustom:"The Hall of Fame's guards ask for at least 2 alphanumerics!"}
	]],
	{
		destination:"hall-of-fame",
		qonclose:RequestWinnerMessage,
		qonsubmit:function(){
			LocalStorage("hall-of-fame",true);
			Once(RequestWinnerMessage);
			console.log("call")
		}
	});
}

RequestWinnerMessage=function(){
	if(LocalStorage("winner-message")===true)
		return;
	
	function DestinationChoice(choice){
		if(choice==="Public message in Guestbook")
			return "guestbook";
		else
			return "feedback";
	}
	
	RequestDataPack([
		['answer',{
			questionname:"As a winner, what would you tell Pedro PSI?",
		}],
		['exclusivechoice',{
			questionname:"",
			qfield:"whence",
			qchoices:["Private message","Public message in Guestbook"],
			executeChoice:function(choice,id){
				SetData("destination",DestinationChoice(choice),id);
			}
		}]
	],
	{
		thanksmessage:"Thank you for your message.",
		qonclose:GameFocus,
		qonsubmit:function(){
			LocalStorage("winner-message",true);
			GameFocus();
		},
		findDestination:function(DP){return DestinationChoice(FindData("whence",DP.qid));}
	}
	);
}



Shout("data-game-hof-feedback")