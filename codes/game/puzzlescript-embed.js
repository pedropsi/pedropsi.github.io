LoadAsync("cacher",".");
ListenOnce('load',ServiceWorker);

///////////////////////////////////////////////////////////////////////////////
//Find the Modules

function PuzzleScriptCoreModules(fork){
	function JLRequire(){return (PageIdentifier()==="gravirinth")?"-JL":"";};
	return [
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
		"mobile"
	].map(PuzzlescriptGlobalPathF(fork))
}

function PuzzleScriptExtraModules(){
	return [
		"data-game-colours",
		"data-game-extras",
		"data-game-overwrite",
		"data-game-moves"
	].map(PuzzlescriptLocalPath);
}

function PuzzlescriptLocalPath(moduleName){return "codes/game/modules/"+moduleName+".js";};

function PuzzlescriptGlobalPathF(fork){
	if(!fork||fork==="puzzlescript.net")
		return PuzzlescriptLocalPath;
	else
		return function(moduleName){return "https://raw.githubusercontent.com/"+fork+"/PuzzleScript/master/js/"+moduleName+".js";}
};

//Forks in April 2020 (todo - remove need to update this list)
var PuzzlescriptForks=["AbhijeetKrishnan","adparadise","aidansean","arpitgarg481","ASmallLemon","AStox","atapia2","Ayelis","baagii04","ben-reilly","BentSm","Bhanditz","bqqbarbhg","bvoq","calebjenkins","campugnatus","ckriech","ClementCariou","ColtonPhillips","crb233","crust","cyatheatree","dario-zubovic","denisoa","dittoslash","dlederle","Draknek","dubajj","ducky007","eigenbom","eshnil2000","Farbs","fourks","francoisvn","gabrielcury","gamebytes","gdavid04","guerre50","HaoDrang","harrycode","ianfitzpatrick","idunnowhat2do","instr3","JackLance","jcmiller11","JoeOsborn","dvehar","eichwulf","Johnicholas","jojoee","jtpercon","kaspal","lazerwalker","Legrandk","lsouza-daitan","luckyluc156","madewokherd","MakingBrowserGames","MarcinKonowalczyk","marcosdon","mcanthony","mechturk","milksob","mjunaidi","mq30","mrbohnke","MSylvia","ndrake","niilante","nwhitehead","olaron","oranebeast","otherlibrary","PBMCube","pedoc","pedropsi","philschatz","raggy","richlocke87","rikkiprince","rmmh","ronanroquais","roryokane","salty-horse","samanthaeschaffer","samfromcadott","sarvex","sfiera","sftrabbit","shangzuoyan","shuding","stefanita","Stephen-Gose-Game-Studio","ThatScar","timknauf","tmoritaa","Tophwells","tripodsan","v21","vibster","weeble","what-gophers-go-for","won21kr","zarawesome"]
	PuzzlescriptForks=["puzzlescript.net"].concat(PuzzlescriptForks);//Default fork

function InForkF(file){//Matches a particular readme file, in case the right fork is mentioned there
	return function(fork){return In(file,fork)&&In(file,"this game by pasting the script")};
}


///////////////////////////////////////////////////////////////////////////////
//Load the Modules (asynchronously)

function PuzzlescriptPage(id){
	// Add the game container to the top of the page
	PreAddElement(	`<div id="puzzlescript-game" class="game">
						<canvas id="gameCanvas">Loading...</canvas>
					</div>`,
				"body");
	//Load the game
	ConsoleAdd("Loading "+PageTitle()+"...");
	if(!id)
		LoadInternalGame(PageIdentifier());
	else
		LoadExternalGame(id);
}


function LoadInternalGame(id){//From Pedro PSI
	LoaderInFolder("codes/game/puzzlescript")(id);
	LoadModulesAndCompileASAP()
}

function LoadExternalGame(id){//From Github Gist
	var url='https://api.github.com/gists/'+id;

	LoadData(url,RetrieveGameSource,"application/x-www-form-urlencoded");

	function RetrieveGameSource(data){
		var data=JSON.parse(data);
		var fileObjects=data["files"];
		var fileNames=Keys(fileObjects);
		
		var foundSource=false;
		var foundFork=false;
		for(var i=0;i<fileNames.length;i++){
			fileContent=fileObjects[fileNames[i]]["content"];

			if(!foundSource)
				if(foundSource=In(fileContent,"COLLISIONLAYERS"))
					sourceCode=fileContent;

			if(!foundFork){
				sourceFork=PuzzlescriptForks.filter(InForkF(fileContent));
				if(foundFork=sourceFork.length>0)
					sourceFork=sourceFork[0];
				else
					sourceFork="puzzlescript.net";
			}

			console.log(sourceFork);

		}
	
		if(foundSource){
			sourceYear=data["created_at"].replace(/\-.*/g,"");
		}

		LoadModulesAndCompileASAP(sourceFork);
	}
}

function LoadModulesAndCompileASAP(fork){
	PuzzleScriptCoreModules(fork).map(LoadSource);
	PuzzleScriptExtraModules().map(LoadSource);
	CompileGameASAP();
}


// Compile the game, as soon as possible (i.e. the modules have loaded)
function CompileGameASAP(){
	function ReadyToCompile(){try{return compile&&sourceCode}catch(e){}};
	function CompileGameSource(){compile(["restart"],sourceCode);};
	DelayUntil(ReadyToCompile,CompileGameSource);
	
	function PrepareGameBar(){PrepareGame()};
	function ReadyToGameBar(){try{return ReadyToCompile()&&PrepareGame&&canvasResize&&state}catch(e){}};
	DelayUntil(ReadyToGameBar,PrepareGameBar);

	function ReadyToMobile(){return (typeof Mobile!=="undefined");}
	function EnableMobile(){Mobile.enable(true);}
	function ReEnableMobile(){ListenOnce('mousedown',EnableMobile,GetElement("gameCanvas"));}
	DelayUntil(ReadyToMobile,ReEnableMobile);
}


///////////////////////////////////////////////////////////////////////////////
// Start the game

if(PageIdentifier()=="game-console"){
	LoaderInFolder("data")("puzzlescript-database");
	var game=PageSearch("game");
	if(game!=="")
		PuzzlescriptPage(game);
}
else
	PuzzlescriptPage();