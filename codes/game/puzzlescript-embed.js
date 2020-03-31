LoadAsync("cacher",".");
ListenOnce('load',ServiceWorker);

///////////////////////////////////////////////////////////////////////////////
//Load and compile the game

function PuzzlescriptPage(id){
	
	ConsoleAdd("Loading "+PageTitle()+"...");
	
	// Load the Game
	if(!id)
		LoaderInFolder("codes/game/puzzlescript")(PageIdentifier());
	else
		LoadExternalGame(id);

	if(!PuzzlescriptPage.modules){
		PuzzlescriptPage.modules=true;

		// Add the game container to the page 
		PreAddElement('<div id="puzzlescript-game" class="game">\
						<canvas id="gameCanvas"></canvas>\
					</div>',
			"body");
		
		function JLRequire(){
			return (PageIdentifier()==="gravirinth")?"-JL":"";
		}
		
		// Load the Puzzlescript engine
		var puzzlescriptModules=[
		//Puzzlescript modules
		"globalVariables",
		"debug_off",
		"font",
		"rng",
		"riffwave",
		"sfxr",
		"codemirror",
		"colors",
		"graphics",
		"engine"+JLRequire(),
		"parser"+JLRequire(),
		"compiler"+JLRequire(),
		"inputoutput",
		"mobile",
		//Extras
		"data-game-colours",
		"data-game-extras",
		"data-game-overwrite",
		"data-game-moves"
		]
	
		puzzlescriptModules.map(LoaderInFolder("codes/game/modules"));
	
	}
}

// External loads, when needed
function LoadExternalGame(id){
	var url='https://api.github.com/gists/'+id;
	function CompileReplace(data){
		if(data==="")
			return;
		var data=JSON.parse(data);
		var fileObjects=data["files"];
		var fileNames=Keys(fileObjects);
		var i=0;
		var found=false;
		while(i<fileNames.length&&!found){
			sourceCode = fileObjects[fileNames[i]]["content"];
			found=In(sourceCode,"COLLISIONLAYERS");
			i++;
		}
		if(found){
			sourceYear=data["created_at"].replace(/\-.*/g,"");
			DelayUntil(function(){return (typeof compile!=="undefined");},CompileGame);
		}
	}
	LoadData(url,CompileReplace,"application/x-www-form-urlencoded");
}

// Enable mobile
function EnableMobile(){Mobile.enable(true);}

// Compile the game
function CompileGame(){
	compile(["restart"], sourceCode);
	function P(){PrepareGame()};
	DelayUntil(function(){return (typeof PrepareGame!=="undefined");},P);
	function E(){ListenOnce('mousedown',EnableMobile,GetElement("gameCanvas"));}
	DelayUntil(function(){return (typeof Mobile!=="undefined");},E);
}


///////////////////////////////////////////////////////////////////////////////
// Start the game

if(PageTitle()=="Game Console"){
	LoaderInFolder("data")("puzzlescript-database");
	var game=PageSearch("game");
	if(game!=="")
		PuzzlescriptPage(game);
}
else{
	PuzzlescriptPage();
	DelayUntil(function(){return (typeof compile!=="undefined")&&(typeof sourceCode!=="undefined");},CompileGame);
}


