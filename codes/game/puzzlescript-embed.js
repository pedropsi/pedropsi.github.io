LoadAsync("cacher",".");
HearOnce('load',ServiceWorker);

///////////////////////////////////////////////////////////////////////////////
//Find the Modules

function JLRequire(){return (PageIdentifier()==="gravirinth-legacy")?"-JL":"";};
var CoreModules=[
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
	];

var InnerModules=[
	"data-game-save",	
	"data-game-colours",
	"data-game-fullscreen",
	"data-game-checkpoint",
	"data-game-bar",
	"data-game-level",
	"data-game-overwrite-puzzlescript",
];

var OuterModules=[
	"data-game-moves",
	"data-game-hints",
	"data-game-stats",
	"data-game-macros"
];

var ConsoleModules=[
	"data-game-console"
];

if(!ConsoleExternal())
	var ExtraModules=InnerModules.concat(OuterModules)
else
	var ExtraModules=InnerModules.concat(ConsoleModules)


//Forks in April 2020 (todo - remove need to update this list)
///API  repos/{owner}/{repo}/forks  //https://docs.github.com/en/rest/reference/repos#forks
var PuzzlescriptForks=["AbhijeetKrishnan","adparadise","aidansean","arpitgarg481","ASmallLemon","AStox","atapia2","Ayelis","baagii04","ben-reilly","BentSm","Bhanditz","bqqbarbhg","bvoq","calebjenkins","campugnatus","ckriech","ClementCariou","ColtonPhillips","crb233","crust","cyatheatree","dario-zubovic","denisoa","dittoslash","dlederle","Draknek","dubajj","ducky007","eigenbom","eshnil2000","Farbs","fourks","francoisvn","gabrielcury","gamebytes","gdavid04","guerre50","HaoDrang","harrycode","ianfitzpatrick","idunnowhat2do","instr3","JackLance","jcmiller11","JoeOsborn","dvehar","eichwulf","Johnicholas","jojoee","jtpercon","kaspal","lazerwalker","Legrandk","lsouza-daitan","luckyluc156","madewokherd","MakingBrowserGames","MarcinKonowalczyk","marcosdon","mcanthony","mechturk","milksob","mjunaidi","mq30","mrbohnke","MSylvia","ndrake","niilante","nwhitehead","olaron","oranebeast","otherlibrary","PBMCube","pedoc","pedropsi","philschatz","raggy","richlocke87","rikkiprince","rmmh","ronanroquais","roryokane","salty-horse","samanthaeschaffer","samfromcadott","sarvex","sfiera","sftrabbit","shangzuoyan","shuding","stefanita","Stephen-Gose-Game-Studio","ThatScar","timknauf","tmoritaa","Tophwells","tripodsan","v21","vibster","weeble","what-gophers-go-for","won21kr","zarawesome"]
	PuzzlescriptForks=["puzzlescript.net"].concat(PuzzlescriptForks);//Default fork

function InForkF(file){//Matches a particular readme file, in case the right fork is mentioned there
	return function(fork){return In(file,fork)&&In(file,"this game by pasting the script")};
}


///////////////////////////////////////////////////////////////////////////////
//Internal Load

function LoadInternalModule(source,folder){
	LoadSource("codes/game/"+Posfix(UnPrefix(folder,"/"),"/")+source+".js");
}

function LoadPSModule(source){
	LoadInternalModule(source,"puzzlescript/modules");
}

function LoadModule(source){
	LoadInternalModule(source,"modules");
}

function InternalCompileASAP(){
	CoreModules.map(LoadPSModule);
	ExtraModules.map(LoadModule);
	CompileGameASAP();
}


function CompileGameASAP(){
	function ReadyToCompile(){try{return compile&&sourceCode}catch(e){}};
	DelayUntil(ReadyToCompile,CompileGameSource);
	
	function ReadyToGameBar(){try{return ReadyToCompile()&&PrepareGame&&canvasResize&&state}catch(e){}};
	DelayUntil(ReadyToGameBar,PrepareGameBar);

	function ReadyToMobile(){return (typeof Mobile!=="undefined");}
	DelayUntil(ReadyToMobile,ReEnableMobile);
}

function CompileGameSource(){compile(["restart"],sourceCode);};
function PrepareGameBar(){PrepareGame()};
function ReEnableMobile(){ListenOnce('mousedown',EnableMobile,GetElement("gameCanvas"));}
function EnableMobile(){Mobile.enable(true);}

///////////////////////////////////////////////////////////////////////////////
//External Load

function LoadExternalModule(source,fork){
	var externalsource="https://api.github.com/repos/"+fork+"/PuzzleScript/contents/js/"+source+".js";
	
	function ScheduleExternalEvaluation(data){ExternalSchedule(source,data)}
	function LoadInternalFallback(){InternalSchedule(source)};
	
	LoadData(externalsource,ScheduleExternalEvaluation,undefined,LoadInternalFallback);
}

function TameCode(codetxt){//Removes problematic code fragments (add more as needed)
	return codetxt.replace("canSetHTMLColors=true","canSetHTMLColors=false");
}

function ExternalSchedule(source,data){
	var data=atob(JSON.parse(data)["content"]);
		data=TameCode(data);
	EvaluateScheduled[source]=function(){LoadCode(data)};
	Shout(source);
}

function InternalSchedule(source){
	EvaluateScheduled[source]=function(){LoadInternalModule(source)};
	Shout(source);
};

function EvaluateScheduled(sourceArray){
	var options;
	for(var i=0;i<sourceArray.length;i++){
		function O(i){return function(){

			EvaluateScheduled[sourceArray[i]]();
		
		}}
		setTimeout(O(i),i*250)
	}
}

function ExternalCompileASAP(fork){
	ConsoleAdd("<p>Requesting Puzzlescript Fork from <b>"+fork+"</b></p>");

	var modules=CoreModules.concat(["COMPILE"]).concat(ExtraModules).concat(["GAMEBAR"/*,"MOBILE"*/]);//This is the order of evaluation
	HearAll(modules,function(){EvaluateScheduled(modules)});

	function LoadExternalModuleF(source){LoadExternalModule(source,fork)};
	CoreModules.map(LoadExternalModuleF);
	ExtraModules.map(InternalSchedule);
	EvaluateScheduled["COMPILE"]=CompileGameSource;
	Shout("COMPILE");
	EvaluateScheduled["GAMEBAR"]=PrepareGameBar;
	Shout("GAMEBAR");
	//EvaluateScheduled["MOBILE"]=ReEnableMobile;
	//Shout("MOBILE");

	
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
	InternalCompileASAP();
}

function LoadExternalGame(id){//From Github Gist
	var url='https://api.github.com/gists/'+id;
	LoadData(url,RetrieveSourceAndFork,"application/x-www-form-urlencoded");
}

function RetrieveSourceAndFork(data){
	var data=JSON.parse(data);
	var fileObjects=data["files"];
	var fileNames=Keys(fileObjects);

	var foundSource=false;
	var sourceFork=PageSearch("fork");
	var foundFork=sourceFork!=="";
	
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
	}
	if(foundSource)
		sourceYear=data["created_at"].replace(/\-.*/g,"");

	if(sourceFork==="puzzlescript.net")
		InternalCompileASAP();
	else
		ExternalCompileASAP(sourceFork);
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