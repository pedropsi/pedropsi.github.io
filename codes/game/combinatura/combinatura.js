///////////////////////////////////////////////////////////////////////////////
//Combinatura (c) Pedro PSI, 2014-2019.
//All rights reserved
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function LoadGameHTML(frameHTML){
	PrependElement(frameHTML,".main");
}

function GameFrameHTML(){
	return "<div class='game-supra-Canvas'><div class='game' id='gameCanvas'>\
			<div class='top'>\
				<h1 class='goal'>Combinatura</h1>\
				<h2 class='credits'>by Pedro PSI (2014-2019)</h1>\
			</div></div>\
		</div>\
		<h1>Combinadex <a><div class='button' id='button-DexBar' onclick='OpenToggle(\'DexBar\',\'Gallery\')'>▼</div></a></h1>\
<div id='DexBar'>\
	<div  id='Dex' class='Gallery Dex invisible'></div>\
</div>";
}


///////////////////////////////////////////////////////////////////////////////
// Game module hooks

//Colour
function ObtainBGColor(){return window.getComputedStyle(document.body)["background-color"];}
function ObtainFGColor(){return window.getComputedStyle(document.body)["color"];}

//Restart and Undo
var ObtainRestartAllowed=True;
var ObtainUndoAllowed=False;

var ObtainLevelSelectorAllowed=False;

//Echo moves
function ObtainIsUndoMove(move){return false;}
function ObtainIsRestartMove(move){return false;}
var ObtainReadMove=Identity;

//Level navigation
function ObtainNewGameCondition(){
	return VisibleCards(StartCards()).map(CardNumber)===SolvedLevels();
};
function ObtainStateScreens(){
	return StartCards().map(CardNumber);
}
function ObtainLevelTitle(l){return "Combinatura";}
var ObtainLevelLoader=LevelLoader;

///////////////////////////////////////////////////////////////////////////////
//Keybinding
function ObtainKeyActionsGame(){
	var keyactions={
		"Escape":ObtainTitleScreenReLoader,
		
		"Shift R":ObtainRestart,
		"Alt R":ObtainRestart,
		"R":ObtainRestart
	};
	
	keyactions[StringSymbol("restart")]=ObtainRestart;
	
	keyactions=FuseObjectArray([
		keyactions,
		LanguageKeyActions("D","DE"),
		LanguageKeyActions("E","EN"),
		LanguageKeyActions("F","FR"),
		LanguageKeyActions("P","PT"),
		LanguageKeyActions("Z","ZEN")
	]);
	
	return keyactions;
};

function ObtainKeyActionsGameBar(){
	return {
	// Game bar menus
	"E"			:RequestGameFeedback,
	"F"			:RequestGameFullscreen
	};
};

function LanguageKeyActions(key,lang){
	var key=key.toUpperCase();
	var actions={};
		actions["Alt "+key]=InstructLanguage(lang);
		actions["Shift "+key]=InstructLanguage(lang);
	return actions;
}

function InstructLanguage(lang){
	return function(event){
		event.preventDefault();
		LanguageToggle(lang);
	}
}


///////////////////////////////////////////////////////////////////////////////
// Load the game bar & prepare game

var gameModules=[
"data-game-colours",
"data-game-fullscreen",
"data-game-extras",
"data-game-moves"
]

gameModules.map(LoaderInFolder("codes/game/modules"));

var gameModulesExtra=[
"combinatura-cards",
"combinatura-languages"
]

gameModulesExtra.map(LoaderInFolder("codes/game/combinatura"));


function StartGame(){
	PrepareGame();
	ResumeCapturingKeys(CaptureComboKey);
	Class(gameSelector,"Gallery");
	ObtainLoadGame();
	ObtainTitleScreenReLoader();
	GameFocus();
	StartLevelFromTitle();
};

DelayUntil(function(){return (typeof PrepareGame!=="undefined")},StartGame);

LoadAsync("cacher",".");
ServiceWorker();
LoadGameHTML(GameFrameHTML());
LoadStyle("codes/game/combinatura/combinatura.css");


//////////////////////////////////////////////////////////////////////////////
// Game Logic

function Card(n){
	if(IsObject(n))
		return n; //The card itself;
	else if(typeof n==="number")
		return CardGetBy("number",n);
	else
		return CardGetBy("name",n);
}
function CardGetBy(property,k){//Get Cards by properties "name" or "number"
	return cards.find(PropertyEqualsF(property,k));
}

function CardNumber(n){
	return Card(n).number;
}
function CardName(n){
	return Card(n).name;
}

function CardNumberToName(n){return Card(Number(n)).name};

function CardSelect(name,event){
	event.stopPropagation();
	Toggle(name,"combi");
	CombinationCheck();
}

function CardAdd(card){
	RevealDisplayCard(card);
	//ReplaceElement(CardThumbHTML(card),"dexcard-"+k);
	SolvedLevels.levels=cards.filter(PropertyEqualsF("visible",1)).map(CardNumber);
	LocalsaveLevel();
};

function CardHide(name){
	if(!IsTerminalCard(Card(name))){
		RemoveElement(name);
		Message("AllCombos",Card(name))
	};
}

function RevealCard(n){
	Card(n).visible=1;
}
function DisplayCard(n){
	if(!GetElement("combina"-CardNumber(Card(n))))
		AddElement(CardHTML(Card(n)),gameSelector);
}

function RevealDisplayCard(n){
	RevealCard(n);
	DisplayCard(n);
}

//////////////////////////////////////////////////////////////////////////////
//Language

function LanguageToggle(lang){
	if(lang==="ZEN"){
		if(!zen){
			ZenModeOn();
			LanguageToggle.last=languages;
			languages=[];
		}
		else{
			ZenModeOff();
			languages=LanguageToggle.last;
		}
	}	
	else if(In(languages,lang)){
		if(languages.length==1)
			ZenModeOn(); //Before removing languages
		else{
			languages.push(lang);
			Message("languageremoved");
			languages.pop();
		}
		
		languages.splice(languages.indexOf(lang),1);
	}
	else
	{
		languages.push(lang);
		if(languages.length>3) //Limit to 3 languages
			languages.shift();
		if(languages.length==1) //Limit to 3 languages
			ZenModeOff();
		Message("languageadded"); //After turning Zen Off
	}
	
	UpdateLevelSecretly();
}

function ZenModeOff(){
	zen=false;
	UnClass(gameSelector,"zen");
}

function ZenModeOn(){
	Message("zen");
	zen=true;
	Class(gameSelector,"zen");
}

function CardTranslate(card){
	names=Translate(card.number,languages);
	return names.join("</p><p>");
}


function LanguageBar(){return '\
<div id="Options">\
	<div id="Language" class="buttonrow">\
		<a><div id="DE" class="lang button" onclick="LanguageToggle(\'DE\')">Deutsch </div></a>\
		<a><div id="EN" class="lang button" onclick="LanguageToggle(\'EN\')">English</div></a>\
		<a><div id="FR" class="lang button" onclick="LanguageToggle(\'FR\')">Français</div></a>\
		<a><div id="PT" class="lang button" onclick="LanguageToggle(\'PT\')">Português</div></a>\
	</div>\
</div>'
};

function LangSelect(){
	languages.map(Select)
}

function LangUpdate(){
	GetElements(".lang").map(Deselect);
	LangSelect();
}



//////////////////////////////////////////////////////////////////////////////
// Card Dex

function CardThumbHTML(card){
	var bg='style=\'background-image:url("images/combinatura/'+card.number+'.jpg")\'';
	var des=Translate(card.number,languages).join(" / ");
	if(card.visible==0){bg='';des=''}
	return '\
		<div class="dexcard" id="dexcard-'+card.number+'">\
			<div class="dexthumb" '+bg+'></div>\
			<div class="dexnumber">'+card.number+'</div>\
		</div><p class="Name">'+des+'</p>'
}

function OpenerHTML(number){
	return '<div class="button" id="button-dex-'+number+'" onclick="OpenToggle(\'dex-'+number+'\',\'Dex\')">△</div>'
}


function DexAdd(card,id){
	var idthis="dex-"+card.number;
	var dexcard='<div class="Dex" id="'+idthis+'"><div class="Header">'+CardThumbHTML(card)+'</div></div>';
	var i="dex-"+id;
	if(id===0){i="Dex"};
	AppendElement(dexcard,i);
	/*if($(i+" > .Header > .button").length===0)
		$(i+" > .Header").append(OpenerHTML(id));*/
}

function DexAddIf(card,id){
	if(!GetElement("dex-"+id))//?? or children
		DexSubAdd(Card(id));
	DexAdd(card,id);
}

function DexSubAdd(card){
	if(!GetElement("dex-"+card.number))//?? or children
		return;
	if(card.number===card.group)
		DexAdd(card,0);
	else
		DexAddIf(card,card.group);
}

function DexDisplay(){
	RemoveChildren("Dex");
	cards.map(DexSubAdd);
}



/*/Collapsable

function OpenToggle(id,contentclass){
	$("#"+id+" > ."+contentclass).toggleClass("invisible");
	if( $("#"+id+" > ."+contentclass).hasClass("invisible"))
		ReplaceChildren("▼","button-"+id);
	else
		ReplaceChildren("△","button-"+id);
}

function CloseForce(id,contentclass){
	if( !($("#"+id+" > ."+contentclass).hasClass("invisible")))
		OpenToggle(id,contentclass);
}

function CloseDex(cards){
	if(cards)
		cards.map(x=>CloseForce("dex-"+x.number,"Dex"));
}
*/


//////////////////////////////////////////////////////////////////////////////
//Cards and Board

function CardHTML(card){
	return'<div class="Combinacard" id=\"combina-'+card.number+'\" onclick=\'CardSelect(\"combina-'+card.number+'\",event)\' qty=0 tabindex="0">\
		<div class="image" style=\'background-image:url("images/combinatura/'+card.number+'.jpg")\'></div>\
		<div class="card-names"><p>'+CardTranslate(card)+'</p></div>\
	</div>';
}

function BoardClear(){
	RemoveChildren(gameSelector);
}

function UpdateLevelSecretly(){ 
	BoardClear();
	VisibleCards(cards).map(CardAdd);
	LangUpdate();
	DexDisplay();
}

function ObtainResizeCanvas(){
	UnClass(gameSelector,"size-medium");
	UnClass(gameSelector,"size-mini");
	var s=0;
	cards.map(function(x){return s=s+x.visible});
	if(s>25){
		if(s<100)
			Class(gameSelector,"size-medium");
		else
			Class(gameSelector,"size-mini");
	}
};

function BoardDeselectAll(){ 
	GetElements(".combi").map(function(e){UnClass(e,"combi")});
}


//////////////////////////////////////////////////////////////////////////////
//Cards Combination

//1. Look to all combos requiring the card

function AllRequiredCombos(requirednumber){
	var evos=cards.map(function(c){return CardRequiredCombo(c,requirednumber)});
	return evos.reduce(function(x,y){return x.concat(y)});
}

function CardRequiredCombo(card,requirednumber){
	if(typeof ((card.evo)[0].length)!=="undefined")
		return [];
	else
		return card.evo.filter(function(e){return In(e.combo,requirednumber)});
}


//2. List those combos' results

function AllResults(cardnumber){
	return AllRequiredCombos(cardnumber).map(PropertyF("result"));
}

//3. Check whether any result remains invisible
function IsTerminalNumber(cardnumber){
	var r=AllResults(cardnumber).map(
		function(n){
			var c=Card(n);
			if(typeof(c)==="undefined"){
				return 1;}
			else 
				return c.visible;});
	return(!In(r,0));
}

function IsTerminalCard(card){
	return IsTerminalNumber(card.number);
}

function CardTerminalHide(cardname){
	if(IsTerminalCard(Card(cardname)))
		CardHide(cardname);
}

function CombineFind(comb) {
// Returns the combination of selected cards, or false
	function ElementMatch(card){
		return In(comb,card.name);
	};
	
	var selectedcards=cards.filter(ElementMatch);
	var possiblecombos=[];
	
	function RegisterCombo(card){
		if(Equal(card.evo,[[]]))
			return;
		else
			possiblecombos=possiblecombos.concat(card.evo);
	};
	
	selectedcards.map(RegisterCombo);
	
	function PossibleCombo(c){return Equal(comb,c.combo.map(CardNumberToName).sort());}
	
	var finalcombo=possiblecombos.filter(PossibleCombo);
	
	if(finalcombo.length<1)
		return false;
	else{
		Message("Plus",[selectedcards,Card(finalcombo[0].result)]);
		return finalcombo[0];
	}
};


function CombineMatch(comb) {
	var finalcombo=CombineFind(comb);
	if(finalcombo!==false){
		var newcard=Card(finalcombo.result);
		if(!newcard.visible){
			lastNewCard=newcard;
			Message("FoundNew",newcard);
			BoardDeselectAll();
		}
		CardAdd(newcard.number,false);
		UpdateLevelSecretly();
	}
	return;
};

function CombineSelected(){
	var combo=[];
	var selected=GetElements(".combi");
	selected.map(
		function(cardE){
			cardid=cardE.id.replace("combina-","");
			combo.push(CardNumberToName(cardid));
		});
	combo=combo.sort();
	return combo;
}

function CombinationCheck(){
	CombineMatch(CombineSelected());
};


function HiddenCards(){
	return cards.filter(PropertyEqualsF("visible",0));
}

function VisibleCards(cards){
	return cards.filter(PropertyEqualsF("visible",1));
}

//////////////////////////////////////////////////////////////////////////////
//Messages

function Message(messagecode,options){
	if(zen)
		return;
	else
		ConsoleAdd(BuildMessage(messagecode,options));
};

function BuildMessage(messagecode,options){
	if(!options)
		return MessagePick(messagecode);
	
	switch (messagecode){
		case "Plus":
			return Translate(options[0][0].number)+" + "+Translate(options[0][1].number)+" = "+Translate(options[1].number);
		break;
		case "FoundNew":
			return Translate(options.number)+" "+MessagePick(messagecode);
		break;
		case "AllCombos":
			return Translate(options.number)+" "+MessagePick(messagecode);
		break;
		
		default:
			return options+" "+MessagePick(messagecode);
	}
}



///////////////////////////////////////////////////////////////////////////////
//Game execution


var cards=[];
var zen=false;
var languages=["EN"];


function ObtainRestart(){
	Restart();
	UpdateLevelSecretly();
	Message("GameReset");
	//CloseDex(cards);
};

function ObtainGameCredits(){
	return "by Pedro PSI (2014-2019)";
}
function ObtainGameTitle(){
	return PageTitle();
}

function ObtainTitleScreenReLoader(){
	TitleScreen(true);
	ReplaceChildren("<div class='top'><div class='title'></div><div class='credits'></div></div>",".top");
	ReplaceChildren(ObtainGameTitle(),".title");
	ReplaceChildren(ObtainGameCredits(),".credits");

	if(cards.length<1)
		cards=StartCards();
	if(LocalStorage("SolvedLevels").length>0){
		SolvedLevels.levels=LocalStorage("SolvedLevels");
	}
	
	UpdateBoard();
	UpdateLevelSecretly();
	Message("GameLoad");
	ReplaceChildren(cards.length,"CardCounter");
	
};

function UpdateBoard(){
	BoardClear();
	SolvedLevels().map(RevealDisplayCard);
	ObtainResizeCanvas();
}

function LevelLoader(){
	TitleScreen(false);
	UndoClear();
}

function CurLevelName(){return LevelGoals[CurrentScreen()]};//placeholder

function CheckWin(){
	return HiddenCards().length===0;
}

function ObtainPlayEndGameSound(){
	return;
}

function UpdateLevel(){
	UpdateLevelSecretly();
	SaveLevelState();
}

///////////////////////////////////////////////////////////////////////////////
//Undo
function Undo(){
	if(!Undo.backups)
		SaveLevelState();
	
	if(Undo.backups.length>=2){
		var u=Undo.backups.pop(); //Pop the current state
		LoadLevelState(Last(Undo.backups));
	}
	
	PulseSelect("UndoButton");
}

function SaveLevelState(){
	if(!Undo.backups)
		UndoClear();
	Undo.backups.push(LevelState());
}

function LoadLevelState(levelstate){
	cards=Clone(levelstate['cards']);
	languages=Clone(levelstate['languages']);
	zen=levelstate['zen'];
	lastNewCard=levelstate['lastNewCard'];
	UpdateLevelSecretly();
}

function UndoClear(){
	Undo.backups=[LevelZeroState()];
}


function LevelZeroState(){
	var state={
		'cards':StartCards(),
		'zen':false,
		'languages':["EN"],
		'lastNewCard':0
	};
	return state;
}

function LevelState(){
	var state={
		'cards':Clone(cards),
		'zen':zen,
		'languages':Clone(languages),
		'lastNewCard':lastNewCard
	};
	return state;
}

function Restart(){
	LoadLevelState(LevelZeroState());
	PulseSelect("RestartButton");
}