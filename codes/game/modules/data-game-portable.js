///////////////////////////////////////////////////////////////////////////////
//Portable game bar
var Portable=False;

if(typeof RequestGameFeedback==="undefined"||typeof RequestHallOfFame==="undefined")
	Portable=True;

ObtainGameBarParentSelector=function(){ //Overwrite for portable
	return ParentSelector(ObtainGameSelector());
}

ObtainLoadPortable=function(){
	if(Portable()){
		var FOLDER=GlocalPath("https://pedropsi.github.io/game-bar-source","codes");
		LoadStyle(JoinPath(FOLDER,"game/game.css"));
		LoadStyle(JoinPath(FOLDER,"game/game-bar-pages.css"));
		LoadStyle(JoinPath(FOLDER,"index.css"));
		
		if(ObtainInitialMessages)
			ConsoleAddMany([
				"Puzzlescript Game bar loaded!",
				"Issues? Suggestions? Head to pedropsi.github.io/game-bar."
			//	"Localsave is ON for "+PageTitle()+".",
			//	"To stop saving and erase all 2 cookies, please deselect "+ObtainSymbol("Save")+"."
			]);
	}
}

Shout("data-game-portable")