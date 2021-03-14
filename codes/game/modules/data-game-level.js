////////////////////////////////////////////////////////////////////////////////
// Winning Logic (non-linear level navigation "jumping")

function MarkWonLevel(lvl){
	var lvl=lvl||CurLevelNumber();
	
	AddToSolvedLevels(lvl);
	
	if(typeof ObtainLocalsaveLevel!=="undefined")
		ObtainLocalsaveLevel(lvl);

	if(typeof EchoLevelWin!=="undefined")
		EchoLevelWin(lvl);
	
	if(typeof RegisterLevelHonour!=="undefined")
		RegisterLevelHonour();
}

function NextLevel(){
	var curscreen=Min(CurrentScreen(),LastScreen()?LastScreen():CurrentScreen());
	CurrentScreen(curscreen);
	
	if (TitleScreen())
		StartLevelFromTitle();
	else if(GameEnded())
		AdvanceScreen();
	else {
		if(!SolvedAllLevels())
			AdvanceUnsolvedScreen();
		else if(curscreen<LastScreen())
			AdvanceEndScreen();
		else
			EndGame();
	}
}

function TitleScreen(t){
	if(typeof t==="undefined")
		return titleScreen;
	else
		return titleScreen=t?true:false;
}

/////////////////////////////////////////////////////////////////////////////////////
// Current Level

if(typeof curlevel==="undefined")
	var curlevel=0;

function CurrentScreen(s){
	if(typeof s==="undefined")
		return curlevel;
	else
		return curlevel=s;
}

////////////////////////////////////////////////////////////////////////////////
// Level/Message Screen navigation

// Keep track of solved levels

function ScreenMessage(lvlscreen){
	return ObtainStateScreens()[lvlscreen].message;
}
function CurrentScreenMessage(){
	return ScreenMessage(CurrentScreen());
}

function IsScreenMessage(lvlscreen){
	return typeof ScreenMessage(lvlscreen)!=="undefined"
}

function ScreenType(level){
	return typeof level.message==="undefined";	
}

function LevelScreens(){
	if(LevelScreens.l!==undefined)
		return LevelScreens.l;
	else{
		var l=[];
		for(var i=0;i<ObtainStateScreens().length;i++){
			if(ScreenType(ObtainStateScreens()[i]))
				l.push(i);
		}
		return LevelScreens.l=l;
	}
}

function MaxScreen(){
	return ObtainStateScreens().length-1;
}

function Levels(){
	return LevelScreens().map(LevelNumber);
}

function LevelScreen(n){
	return LevelScreens()[n-1];
}

function SolvedLevels(){
	if(SolvedLevels.levels===undefined)
		SolvedLevels.levels=[];
	return SolvedLevels.levels;
}

function UnSolvedLevels(){
	return Complement(Levels(),SolvedLevels());
}
function AddToSolvedLevels(lvl){
	if(!IsScreenMessage(LevelScreen(lvl))&&!LevelSolved(lvl)){
		SolvedLevels.levels.push(lvl);
		SolvedLevels.levels=Sort(SolvedLevels.levels);
	}
	return SolvedLevels();
}

function LevelSolved(n){
	return LevelScreenSolved(LevelScreen(n));
}

function LevelScreenSolved(curscreen){
	return In(SolvedLevels(),LevelNumber(curscreen));
}

function UnSolvedLevelScreens(){
	return LevelScreens().filter(function(l){return !LevelScreenSolved(l)});
}

function FirstUnsolvedScreen(){
	if(UnSolvedLevelScreens().length===0)
		return 1+LevelScreens()[MaxLevel()-1];
	else{
		var c=LevelScreens().indexOf(UnSolvedLevelScreens()[0]);
		if(c===0)
			return 0;
		else
			return 1+LevelScreens()[c-1];
	}
}

function NextUnsolvedScreen(curscreen){
	var firstusolve=UnSolvedLevelScreens().filter(function(x){return x>=curscreen;})[0];
	var lastsolvebefore=UnlockedLevelScreens().filter(function(x){return x<firstusolve;});
	return Last(lastsolvebefore)+1;
}

function LastScreen(){return ObtainStateScreens().length-1;};

function FinalLevelScreen(){
	var li=UnlockedLevelScreens(); 
	return Last(li);
};

function ClearSolvedLevelScreens(){
	return SolvedLevels.levels=[];
}

function SolvedAllLevels(){
	return LevelScreens().every(LevelScreenSolved);
}

function LevelNumber(curscreen){
	var lvl=LevelScreens().filter(function(l){return l<curscreen}).length+1;
	return Min(lvl,MaxLevel());
}

function CurLevelNumber(){
	return LevelNumber(CurrentScreen())
}


function LevelTitles(){
	return Levels().map(ObtainLevelTitle);
}

function LevelTitleNumber(title){
	return LevelTitles().indexOf(title)+1;
}

function UnlockedLevels(){
	var LevelLookahead=ObtainLevelLookahead();
	var gateLevels=ObtainGateLevels(); 
	
	if(LevelLookahead<1){
		return Levels();
	}else{
		var showlevels=SolvedLevels();
		var lvl=LevelNumber(FirstUnsolvedScreen());
		var lookahead=1;
		while(lookahead<=LevelLookahead&&lvl<=Levels().length){
			if(In(gateLevels,lvl)&&lookahead>1) //Don't reveal gate level until all previous levels are solved
				break;
			else if(!LevelSolved(lvl)){
				showlevels=showlevels.concat(lvl);
				if(In(gateLevels,lvl))		  //Don't reveal more levels while gate level unsolved
					break;
				else
					lookahead++;
			}
			lvl++;
		}
		//console.log(showlevels);
		return Sort(showlevels);
	}
}

function UnlockedLevelScreens(){
	return UnlockedLevels().map(LevelScreen);
}

function MaxLevel(){
	return LevelScreens().length;
}


//Level Title
function LevelDescription(lvl){
	var leveltitles=LevelTitles();
	if(!leveltitles||!leveltitles[lvl-1])
		return UnnamedLevelDescription(lvl);
	else
		return leveltitles[lvl-1];
}

function UnnamedLevelDescription(lvl){
	return "Select level "+LevelNumberFromTotal(lvl);
}

function LevelGatedDescription(lvl){
	if(!lvl)
		return "";
	var LevelLookahead=ObtainLevelLookahead();
	if(In(ObtainGateLevels(),lvl)&&!SolvedAllLevelsBefore(lvl))
		return "Level locked: all previous levels required.";
	else if(LevelLookahead>0&&!SolvedRequiredLevelsBefore(lvl,LevelLookahead))
		return "Level locked: all but "+(LevelLookahead-1)+" earlier levels required.";
	else
		return LevelDescription(lvl);
}

function LevelsBefore(lvl,howmany){
	return Levels().filter(function(l){return lvl-howmany<=l&&l<lvl});
}

function SolvedAllLevelsBefore(lvl){
	return LevelsBefore(lvl,lvl).every(function(lvl){return In(SolvedLevels(),lvl)});
}

function SolvedRequiredLevelsBefore(lvl,howmany){
	return LevelsBefore(lvl,lvl).length-LevelsBefore(lvl,lvl).filter(function(lvl){return In(SolvedLevels(),lvl)}).length<howmany;
}


// Level Selector

function LevelDescriptionHTML(lvl){
	var title=ObtainLevelDescriptionTitle(lvl);
	var notes=ObtainLevelNotes(lvl);
	
	title=title?`<p>${title}</p>`:"";
	notes=notes?`<p class='notes'>${notes}</p>`:"";
	
	return `${title}
			${notes}`;
}

function ChosenLevelDescriptionHTML(){
	var DP=CurrentDatapack();
	if(DP){
		var l=FindData("level",CurrentDatapack().qid);
		if(l)
			return ChosenLevelDescriptionHTML.last=LevelDescriptionHTML(UnstarLevel(l));
	}
	
	if(ChosenLevelDescriptionHTML.last)
		return ChosenLevelDescriptionHTML.last;
	else
		return LevelDescriptionHTML(CurLevelNumber());
}

function LevelSelectorMessage(){
	if(UnlockedLevels().length!==MaxLevel())
		return "Select from "+UnlockedLevels().length+" out of "+MaxLevel()+" levels";
	else
		return "Select one of the "+MaxLevel()+" levels";
}

if(typeof ObtainLevelSelectorField==="undefined")
	var ObtainLevelSelectorField=LevelSelectorField;

function LevelSelectorField(){
	return {
		questionname:ChosenLevelDescriptionHTML(),
		qchoices:UnlockedLevels().map(StarLevelNumber),
		qchoicesViewF:ObtainLevelNumberDisplay,
		defaultChoice:function(i,c){return UnstarLevel(c)===CurLevelNumber()}
	};
}

function RequestLevelSelector(){	
	//Add dialing shortcuts
	var LevelSelectorShortcuts=Merge(ObtainKeyActionsGameBar(),{});
		AlphanumericCharacters.map(function(C){LevelSelectorShortcuts[C]=function(){DialFocus(C)}});
		LevelSelectorShortcuts[ObtainMainKey("levelselector")]=CloseLevelSelector;
	
	var fields={
		'exclusivechoice':Merge(ObtainLevelSelectorField(),{
			qsubmittable:false,
			qfield:"level",
			qclass:"level-selector",
			executeChoice:ChooseLevelClose,
			qtype:ExclusiveChoiceSectionsHTML(LevelSections())
		})
	}
	
	RequestDataPack(fields,{
			action:LoadFromLevelSelectorButton,
			qonsubmit:CloseLevelSelector,
			qonclose:GameFocus,
			qdisplay:LaunchBalloon,
			qtargetid:".game-container",
			shortcutExtras:LevelSelectorShortcuts,
			requireConnection:false,
			buttonSelector:"LevelselectorButton",
			shortcutTarget:"LevelselectorButtonWindow",
			spotlight:gameSelector
	});
}

function CloseLevelSelector(){
	if(CurrentDatapack().buttonSelector==="LevelselectorButton")
		CloseCurrentDatapack();
	GameFocus();
}


function MaxLevelDigits(){
	if(MaxLevelDigits.m)
		return MaxLevelDigits.m;
	return MaxLevelDigits.m=Ceiling(Math.log10(1+MaxLevel()));
};

function PadLevelNumber(n){
	return PadLeft(String(n),"0",MaxLevelDigits());
}

function LevelHintStar(n){
	var star="★";
	if(ObtainHints()&&UsedHints(n)!==0)
		star="☆";
	return LevelSolved(n)?star:"";
}

function StarLevelNumber(n){
	return PadLevelNumber(n)+LevelHintStar(n);
}

function StarLevel(l){
	var n=LevelNumber(l);
	return StarLevelNumber(n);
}
function UnstarLevel(l){
	return Number(l.replace("★","").replace("☆",""));
}

function UpdateAccessLevelMessage(){
	ReplaceChildren(ChosenLevelDescriptionHTML(),".question");
}

Listen("Set level",UpdateAccessLevelMessage);

function LevelNumberFromTotal(lvl){
	return PadLevelNumber(lvl)+"/"+MaxLevel()+LevelHintStar(lvl)
}

function UpdateLevelSelectorButton(lvl){
	if(!lvl)
		lvl=CurLevelNumber(); 
	if(TitleScreen())
		var leveltext="Select level";
	else if(lvl<=MaxLevel())
		var leveltext="Level "+LevelNumberFromTotal(lvl)
	else
		var leveltext="★ All levels ★";
	ReplaceChildren(leveltext,"LevelselectorButton");
}

function LoadFromLevelSelectorButton(qid){
	var levelChoice=FindData("level",qid);
	ChooseLevelClose(levelChoice,qid);
}

function ChooseLevelClose(choice,pid){
	ChooseLevel(choice);
	Close(pid,GameFocus);
	GameFocus();
};

function ChooseLevel(choice){
	SelectLevel(UnstarLevel(choice));
};

function SelectLevelFromPage(){
	var level=PageSearch("level");
	if(!level)
		return;
	if(Naned(Number(level)))
		SelectLevelFromTitle(level);
	else
		SelectLevel(Round(Number(level),0));
}

function SelectLevelFromTitle(leveltitle){
	var level=-Infinity;
	Levels().map(
		function(n){
			if(LowerSimpleString(ObtainLevelTitle(n))===LowerSimpleString(leveltitle))
				level=n;
		}
	);
	if(level>0)
		SelectLevel(level);
}

function SelectLevel(lvl){
	if(typeof ObtainSelectLevel!=="undefined")
		return ObtainSelectLevel(lvl);
	else
		return SelectPureLevel(lvl);
}

function SelectPureLevel(lvl){
	if(In(UnlockedLevels(),lvl))
		SelectUnlockedLevel(lvl);
	else
		console.log("Level "+lvl+" locked!");
}

function SelectPreviousLevel(){
	SelectLevel(LevelNumber(CurrentScreen()-1));
}

function SelectCurrentLevel(){
	SelectLevel(LevelNumber(CurrentScreen()));
}

function SelectNextLevel(){
	SelectLevel(LevelNumber(CurrentScreen()+1));
}

function SelectUnlockedLevel(lvl){
	//Don't return to same level
	if(lvl===CurLevelNumber()&&!TitleScreen())
		return console.log("stay in lvl ",lvl);
		
	//Go to exactly after the level prior to the chosen one, to read all useful messages, including level title
	var n=lvl<2?0:(LevelScreens()[lvl-2]+1);
	GoToScreen(n);
	
	EchoSelect(lvl,"level");
};


function GoToScreen(lvl){
	CurrentScreen(lvl);
	AdvanceLevel();
	ObtainResizeCanvas();
};

// Keyboard to Pick Level - records multiple digits/letters within a 2000 ms timeframe to select the level number or title

function DialedLevel(S){
	if(!Naned(Number(S))){
		var lvl=Number(S);
		return In(UnlockedLevels(),lvl)?lvl:false;
	}
	else{
		var title=LevelTitles().filter(function(title){return Prefixed(title.toLowerCase(),S.toLowerCase())});
		if(!title.length)
			return false;
		else
			return LevelTitleNumber(First(title));
	}
}

function LevelDialed(S){
	return DialedLevel(S)!==false;
}

function DialFocus(S){
	clearTimeout(DialFocus.timer);
	var t=Date.now();
	if((!DialFocus.lastTime)||(t-DialFocus.lastTime>2000)||!LevelDialed(DialFocus.level+""+S)){ 
		DialFocus.level=""+S;//Restart
	}
	else{
		DialFocus.level=DialFocus.level+""+S;
	}
	
	DialFocus.lastTime=Date.now();
	var S=DialFocus.level;

	if(!LevelDialed(S))
		return;
	else
		FocusElement("choice-"+StarLevelNumber(DialedLevel(S)));
}	
	

// Level Progression

function ObtainNewGameCondition(){
	return !(SolvedLevels().length>0||CurLevelNumber()!==1)
};

function StartLevelFromTitle(){
	if(ObtainNewGameCondition()){//new game
		ObtainResetLevel();
	}
	LoadLevel();
}

function ResetLevel(){
	CurrentScreen(0);
	ClearSolvedLevelScreens();
	ClearLevelRecord();
}

if(typeof ObtainResetLevel==="undefined")
	var ObtainResetLevel=ResetLevel;




function EndGame(){
	if(!EndGame.ended)
		EndGame.ended=true;
	ClearLevelRecord();
	UpdateLevelSelectorButton();
	if(typeof ObtainPlayEndGameSound!=="undefined")
		ObtainPlayEndGameSound();
	RequestHallOfFame();
	CurrentScreen(0);//TODO CHECK IF BETTER BEHAVIOUR
	ObtainTitleScreenReLoader();
}

function GameEnded(){
	return EndGame.ended||false;
}


function ResetGame(){
	EraseLocalsave();
	ClearSolvedLevelScreens();
	ObtainResetLevel();
	ObtainTitleScreenReLoader();
}

if(typeof ObtainLevelTransition==="undefined")
	var ObtainLevelTransition=Identity;

function AdvanceLevel(){
	ObtainLevelTransition();
	LoadLevel();
	ClearLevelRecord();
	UpdateLevelSelectorButton();
}

function AdvanceScreen(){
	CurrentScreen((CurrentScreen()+1)%(MaxScreen()+1));
	AdvanceLevel();	
}

function AdvanceUnsolvedScreen(){
	var curscreen=CurrentScreen();
	if(IsScreenMessage(curscreen)&&curscreen<FinalLevelScreen()){
		//console.log("from message");
		CurrentScreen(curscreen+1);
	}
	else if(curscreen>=FinalLevelScreen()||!NextUnsolvedScreen(curscreen)){
		//console.log("from last level");
		CurrentScreen(FirstUnsolvedScreen());
	}
	else{
		//console.log("from anywhere in the middle");
		CurrentScreen(NextUnsolvedScreen(curscreen));
	}		
	AdvanceLevel();	
}

function AdvanceEndScreen(){
	if(CurrentScreen()>=FinalLevelScreen())
		CurrentScreen(CurrentScreen()+1);
	else
		CurrentScreen(FinalLevelScreen()+1);
	
	AdvanceLevel();		
}

function LoadLevel(){
	if(ObtainLevelLoader){
		ObtainLevelLoader();
		if(ObtainLocalsaveLevel)
			ObtainLocalsaveLevel();
	}
	else
		console.log("Please define ObtainLevelLoader");
}


DefinedShout("data-game-level")