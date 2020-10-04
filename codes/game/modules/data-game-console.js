//Game Console
var ConsoleExternal=function(){return PageIdentifier()==="game-console"};

function GameHackURL(){
	return "https://www.puzzlescript.net/editor.html?hack="+PageSearch("game");
}


/////////////////////
//Related games
function MoreButton(){
	return GameBarButtonHTML("more",{onclick:'RequestMore();'});	
}

if(Memory("PGD")){
	HearOnce("GameBar",function(){ShowButton(MoreButton)});
}else{
	HearOnce("LoadPGD",function(){ShowButton(MoreButton)});
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
		spotlight:gameSelector
	});
}