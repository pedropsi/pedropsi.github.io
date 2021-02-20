////////////////////////////////////////////////////////////////////////////////
// Echo

function EchoLevelData(leveldata){
	if(GameAnalyticsAllowed()){
		EchoData(leveldata,leveldataURL);
	}
}

function GameAnalyticsAllowed(){
	return (typeof AnalyticsAllowed!=="undefined")&&AnalyticsAllowed()&&PageIdentifier()!=="game-console";
}

function GameIdentifier(){
	return PageIdentifier();
}

// Echo specifics
function EchoLevelWin(lvl){
	if(!GameAnalyticsAllowed())
		return;

	EchoData(Outflows("won"));

	var leveldata=UpdateLevelData(lvl);
	EchoLevelData(leveldata);
}

if(typeof ObtainWonColumn==="undefined")
	var ObtainWonColumn=function(){
		return CurLevelNumber();
	}

function EchoCheckpoint(){
	if(!GameAnalyticsAllowed())
		return;
	
	EchoData(Outflows("won"));

	var leveldata=UpdateLevelCheckpointData(curlevel);
	EchoLevelData(leveldata);
	ClearLevelRecord();
}

function EchoSelect(lvlch,type){
	var selectdata=UpdateSelectData(lvlch,type);
	EchoLevelData(selectdata);
	ClearLevelRecord();
}

function EchoHint(lvl,hintN){
	var hintdata=UpdateHintData(lvl,hintN);
	EchoLevelData(hintdata);
}

function EchoLevelClose(curlevel){
	var leveldata=Merge(UpdateLevelData(curlevel),{
		"winsequence":"-",
		"type":"close"});
	EchoLevelData(leveldata);
}

function UnloadEventName(){
	return "onpagehide" in self ?"pagehide":"unload";
}

ListenOnce(UnloadEventName(),function(){EchoLevelClose(curlevel)});


////////////////////////////////////////////////////////////////////////////////
/// Level Data, recording moves

function LevelData(){
	return {
		formDataNameOrder:"[\"name\",\"level\",\"identifier\",\"timing\",\"winsequence\",\"moves\",\"type\"]",
		formGoogleSendEmail:"",
		formGoogleSheetName:"leveltimes",
		identifier:GameIdentifier(),
		level:"0",
		moves:"-",
		winsequence:"-",
		name: UserId(),
		timing: "0",
		type:"-"
	}
};

var leveldataURL="https://script.google.com/macros/s/AKfycbwuyyGb7XP7H91GH_8tZrXh6y_fjbZg4vSxl6S8xvAAEdyoIHcS/exec";

function UpdateLevelData(lvl){
	return Merge(LevelData(),{
		"timing":LevelTime(),//Math.floor(ms.reduce(function(x,y){return (x+y[1])},0)/1000),
		"level":LevelNumber(LevelScreen(lvl)),
		"moves":JSON.stringify(RegisterMove.moveseq),
		"winsequence":JSON.stringify(RegisterMove.winseq),
		"type":"win"
	});
}

function ClearLevelRecord(){
	ClearMoves();
	ResetLevelTime();
	ResetDeltaTime();
}


//Moves
function ClearMoves(){
	RegisterMove.moveseq=[];
	RegisterMove.winseq=[];
}

if(typeof ObtainIsUndoMove==="undefined")
	var ObtainIsUndoMove=False;
if(typeof ObtainIsRedoMove==="undefined")
	var ObtainIsRedoMove=False;
if(typeof ObtainIsRestartMove==="undefined")
	var ObtainIsRestartMove=False;
if(typeof ObtainReadMove==="undefined")
	var ObtainReadMove=Identity;

function RegisterMove(move){
	var delta = DeltaTime();
	var move=ObtainReadMove(move);
	
	if(!RegisterMove.moveseq)
		RegisterMove.moveseq=[];
	RegisterMove.moveseq.push([move,delta]);
	
	if(!RegisterMove.winseq)
		RegisterMove.winseq=[];
	
	if(ObtainIsUndoMove(move))
		RegisterMove.winseq.pop();
	else if(ObtainIsRestartMove(move))
		RegisterMove.winseq=[];
	else
		RegisterMove.winseq.push([move,delta]);
}



//Timing
function DeltaTime(){
	if(!DeltaTime.last){
		ResetDeltaTime();
		return 0;
	}
	DeltaTime.delta=(Date.now()-DeltaTime.last);
	DeltaTime.last=Date.now();
	return DeltaTime.delta;
}

function ResetDeltaTime(){
	DeltaTime.last=Date.now();
}

function LevelTime(){
	if(!LevelTime.start){
		ResetLevelTime();
		return 0;
	}
	else
		return Date.now()-LevelTime.start; //Time difference in ms
}

function ResetLevelTime(){
	LevelTime.start=Date.now();
}

//Checkpoint
function CheckpointString(curlevel,curcheckpoint){
	return String(curlevel)+"»"+String(curcheckpoint);
}
function CurCheckpointString(){
	return CheckpointString(CurLevelNumber(),curcheckpoint)
}

function UpdateLevelCheckpointData(curlevel){
	return Merge(UpdateLevelData(curlevel),{
		"type":"checkpoint",
		"level":CheckpointString(curlevel,curcheckpoint+1)
	});
}

//Hint
function UpdateHintData(lvl,hintN){
	return Merge(LevelData(),{
		"type":"hint",
		"level":lvl,
		"timing":LevelTime(),
		"moves":hintN
	});
}

//Select
function UpdateSelectData(lvlch,type){
	return Merge(LevelData(),{
		"type":"goto-"+type,
		"level":(type==="checkpoint")?CheckpointString(curlevel,lvlch):lvlch,
		"timing":LevelTime()
	});
}

//Best moves

if(typeof ObtainCanonicalTitle==="undefined")
	var ObtainCanonicalTitle=Identity;

function BestMoves(){
	if(!BestMoves.moves){
		BestMoves.moves=LocalStorage("bestmoves");
		if(IsArray(BestMoves.moves)){
			BestMoves.moves={};
			LocalStorage("bestmoves",{});
		}
		else{
			BestMoves.moves=CanonicalObject(BestMoves.moves,ObtainCanonicalTitle);
			LocalStorage("bestmoves",BestMoves.moves);
		}
	}
	return BestMoves.moves;
}


function BestMove(title,newmove){
	if(!title)
		return ;
	var bestmoves=BestMoves();
	var oldmove=bestmoves[title];
	if(!newmove)
		return bestmoves[title];
	if(ObtainBestMoveSurpassed(newmove,oldmove)){
		if(oldmove)
			ConsoleAdd(`You solution for level ${title} improved!`);
		BestMoves.moves[title]=newmove;
		LocalStorage("bestmoves",BestMoves.moves);
		return newmove;
	}
}

if(typeof ObtainBestMoveSurpassed==="undefined")
	ObtainBestMoveSurpassed=function(newMove,oldMove){
		if(!oldMove)
			return true;
		return oldMove.length>newMove.length;
	}

////////////////////////////////////////////////////////////////////////////////
DefinedShout("data-game-moves");