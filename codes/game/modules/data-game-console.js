//Game Console

var ConsoleExternal=function(){return PageIdentifier()==="game-console"};

if(ConsoleExternal())
	var HasGameFeedback=True;

/////////////////////
//Edit games

function GameHackURL(){
	return "https://www.puzzlescript.net/editor.html?hack="+PageSearch("game");
}

function WrenchButton(){
	if(ConsoleExternal())
		return GameBarButtonHTML("wrench",{onclick:'Navigate(GameHackURL(),false);'})
	else
		return "";
}

/////////////////////
//Related games

function MoreButton(){
	return GameBarButtonHTML("more",{onclick:'RequestMore();'});	
}

if(Memory("PGD")){
	HearOnce("GameBar",function(){ShowButton(MoreButton)});
	HearOnce("GameBar",function(){ShowButton(WrenchButton)});
}else{
	HearOnce("LoadPGD",function(){ShowButton(MoreButton)});
	HearOnce("LoadPGD",function(){ShowButton(WrenchButton)})

}

function RequestMore(){
	if(!GameEntryData)
		return;
	var id=PageSearch("game");
	var data=Memory(id);
	if(!id||!data)
		return;
	
	var author=data["author-consensus"];
	function SameAuthor(au){
		return function(d){
			var d=Memory(d);//game data hook
			return In(d["author-consensus"],au)||In(au,d["author-consensus"]);
		}
	}
	var games=Memory("PGD").filter(SameAuthor(author)).map(function(id){return GameDropDownButtonHTML(id,false)});
	var DPFields=[
			['plain',{questionname:"More games by: <b>"+author+"</b>"}],
			['plain',{questionname:games.join("\n")}],
		];

	RequestDataPack(DPFields,{
		qonclose:GameFocus,
		qdisplay:LaunchBalloon,
		qtargetid:".game-container",
		requireConnection:false,
		shortcutExtras:ObtainKeyActionsGameBar(),
		buttonSelector:"MoreButton",
		shortcutTarget:"MoreButtonWindow",
		spotlight:gameSelector
	});
}

DefinedShout("data-game-console")