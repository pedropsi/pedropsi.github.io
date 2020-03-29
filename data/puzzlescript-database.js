//////////////////////////////////////////////////////////////////////
//Starter

ListenOnce('puzzlescript-database-game',StartPGD);
ListenOnce('puzzlescript-database-component',StartPGD);

function StartPGD(){
if(PageIdentifier()==="puzzlescript-games-database"){
	//var pgdtable=v.PGD();
	GetElement(".main .section .container").innerHTML=v.PGD();
	LoadPGDTable();
}
if(PageIdentifier()==="game-tools"){
	GetElement("puzzlescript-database-component").innerHTML=v.PCD();
	LoadPGDTable();
}

if(PageIdentifier()==="game-console"){
	LoadPGD();
	if(PageSearch("game")===""){
		LoadGameHTML(GameFrameHTML());
		ListenOnce("LoadPGD",LoadPGDMenu);
	}
	else if(PageSearch("submit")!==""){
		//auto-sub
		function AutoSub(){
			LoaderInFolder("codes/game")("puzzlescript-tagger");
		}
		DelayUntil(GameInfoRetrieved,AutoSub);
	}
	else
		ListenOnce("LoadPGD",function(){DelayUntil(GameInfoRetrieved,AutoCheckYear)});
}
}
/*
if(PageIdentifier()==="game-editor"){
	LoadPGD();
	ReplaceElement(PGDMenuHTML(),ParentElement("exampleDropdown")); //PS Editor Selector
	ListenOnce("LoadPGD",LoadPGDMenu);
}
*/

function GameInfoRetrieved(){return typeof state!=="undefined"&&state.levels.length>0;}

function PDGURL(){
	return "https://script.google.com/macros/s/AKfycbyp6yZrpw7TIiOE8fg0wUkI0SMtTWUpYlki53OGLg5Pgc6ppLM/exec";
}

//////////////////////////////////////////////////////////////////////
// PGD Loading functions, common

function Whitelist(){ //Sort descending by expected number of submissions
	return [
		/^https\:\/\/[^\#\^\~\\\/\|\.\:\;\,\s\?\=\}\{\[\]\&\'\"\@\!]*\.itch\.io\/.*/,
		/^https\:\/\/(www\.)?puzzlescript\.net\/play\.html\?p\=.*/,
		/^https\:\/\/(www\.)?puzzlescript\.net\/editor\.html\?hack\=.*/,
		/^https\:\/\/[^\#\^\~\\\/\|\.\:\;\,\s\?\=\}\{\[\]\&\'\"\@\!]*\.github\.io\/.*/i,
		/^http\:\/\/htmlpreview\.github\.io\/\?https\:\/\/raw\.githubusercontent\.com\/.*/i,
		/^https\:\/\/[^\#\^\~\\\/\|\.\:\;\,\s\?\=\}\{\[\]\&\'\"\@\!]*\.github\.io\/.*/i,
		/^https\:\/\/(www\.)?increpare\.com\/.*/,
		/^https?\:\/\/(www\.)?draknek\.org\/.*/,
		/^https?\:\/\/(www\.)?ludumdare\.com\/compo\/.*/,
		/^https\:\/\/(www\.)?newgrounds\.com\/portal\/view\/.*/,
		/^https?\:\/\/(www\.)?jackkutilek\.com\/puzzlescript\/.*/,
		/^https\:\/\/(www\.)?sokobond\.com\/.*/,
		/^https\:\/\/(www\.)?streamingcolour\.com\/liveapps\/puzzlescript\/.*/,
		/^https\:\/\/(www\.)?struct\.ca\/games\/.*/,
		/^https\:\/\/benjamindav\.is\/.*/,
		/^https\:\/\/axaxaxas\.herokuapp\.com\/games\/.*/,
		/^https?\:\/\/www\.colami\.com/
	];
}

function InWhitelist(string){
	function Verify(condition){return InString(string,condition)}
	return Whitelist().some(Verify);
}


function DaysUpdated(u){
	var updated="ages ago";
	if(u<365)
		updated="a year ago";
	if(u<=180)
		updated="last semester";
	if(u<=90)
		updated="last trimester";
	if(u<=60)
		updated="previous bimester";
	if(u<=30)
		updated="previous month";
	if(u<=15)
		updated="this fortnight";
	if(u<=7)
		updated="this week";
	if(u<2)
		updated="this yesterday";
	if(u<1)
		updated="today";
	return updated;
}

function MultiLabel(labelinfo){
	var notes=labelinfo;
	if(notes!==""){
		notes=notes.split(/\,\s*/);
		notes=notes.map(LabelHTML);
		notes=" "+notes.join("");
	}
	return notes;
}

function GameEntryData(dataline){
	if(dataline.join("")==="")
		return null;
	
	var isduplicate=dataline[6];
	if(isduplicate!==""&&PageIdentifier()!=="game-tools")
		return null;
	if(!In(["example","prototype"],isduplicate)&&PageIdentifier()==="game-tools")
		return null;
	
	if(isduplicate==="")
		isduplicate="game";
	
	var data={
		"classification":isduplicate,
	//DATE
		"days":Floor(Days(new Date(dataline[0].replace(".","")))),
		"updated":"",
	//From PS FILE
		"title":SafeString(dataline[1]),
		"author":SafeString(dataline[2]),
		"link":SafeUrl(dataline[3]),
		"page":SafeUrl(dataline[4]),
		"notes":SafeUrl(dataline[5]),
	//From PSI
		"titleReplacement":dataline[7],
		"authorReplacement":dataline[8],
		"linkReplacement":dataline[9],
		"pageReplacement":dataline[10],
		"notesReplacement":dataline[11],
	//From Community Edits
		"title-edit":SafeString(dataline[14]),
		"author-edit":SafeString(dataline[15]),
		"link-edit":SafeUrl(dataline[16]),
		"page-edit":SafeUrl(dataline[17]),
		"notes-edit":SafeString(dataline[18]),
		"year-edit":Number(SafeString(dataline[19])),
		"rank-edit":SafeString(dataline[20]),
	//ETC...
		"titleOriginal":dataline[12],
		"authorOriginal":dataline[13],
		"selected":dataline[21],
		"with-bar":dataline[22],
		"id":"",
		"playlink":"",
		"consolable":false
	}

	//Apply manual corrections
	function DataCorrection(type){
		data[type+"HTML"]=data[type];
		if(data[type+"Replacement"]!=="")
			data[type+"HTML"]=data[type+"Replacement"];
		if(data[type+"-edit"]!=="")
			data[type+"HTML"]=data[type+"-edit"];
		
		data[type+"-consensus"]=data[type+"HTML"];
	}
	
	["title","author","link","page","notes","year"].map(DataCorrection);
	
	data["pageHTML"]=data["pageHTML"].replace("https://www.puzzlescript.net","");

	//Generate the HTML entry
	if(typeof Whitelist!=="undefined"&&InWhitelist(data.linkHTML)){
		if(/.*puzzlescript\.net\/play.*/.test(data.linkHTML))
			data.playlink="game-console.html?game="+PageSearch("p",data.linkHTML);
		if(/.*puzzlescript\.net\/editor.*/.test(data.linkHTML))
			data.playlink="game-console.html?game="+PageSearch("hack",data.linkHTML);
		
		if(data.playlink!=="")
			data.consolable=true;
		
		if(data.consolable)
			data.titleHTML=AHTML(data.titleHTML,data.playlink)+" "+AHTML("◊",data.linkHTML);
		else
			data.titleHTML=AHTML(data.titleHTML,data.playlink=data.linkHTML);
		
		if(data.pageHTML&&data.authorHTML!=="undefined"){
			data.authorHTML=AHTML(data.authorHTML,data.pageHTML);
		}
	}
	
	data.notesHTML=MultiLabel(data.notesHTML);
	data.authorOriginalHTML=MultiLabel(data.authorOriginal);
	data.id=data.playlink.replace("game-console.html?game=","");
	
	//Display date

	function DisplayDate(days,year){
		var updated=(days<365)?DaysUpdated(days):"";
		var y=(year>0)?year:"0000 please add year";
		return updated+" ("+y+")";
	}
	
	data.yearHTML=DisplayDate(data.days,data["year-consensus"]);

	
	GameEntryData[data.playlink]=data; //data hook, to be accessed by id of each row
	
	if(!GameEntryData.list)
		GameEntryData.list=[];
	
	if(data.playlink!=="")
		GameEntryData.list.push(data.playlink);
	
	return data;
};


function LoadPGD(){
	LoadData(PDGURL(),SavePGD);
	function SavePGD(data){
		if(data!==""){
			data=JSON.parse(data);
			data.map(GameEntryData);
			Shout("LoadPGD");
		}
	}
}

//////////////////////////////////////////////////////////////////////
// PGD Table

function EditButtonTD(id){
	var bu=ButtonHTML({
		txt:ObtainSymbol("edit"),
		attributes:{onclick:"RequestPGDSubmission(\""+id+"\",true);"}});
	return "<td class='editTD'>"+bu+"</td>";
};

function GameRowHTML(id){
	var data=GameEntryData[id];
	if(!data)
		return "";
	return "\t<tr id='"+data.playlink+"'>\n"+TDHTML(data.titleHTML+data.notesHTML)+"\n"+TDHTML(data.authorHTML+data.authorOriginalHTML)+"\n"+TDHTML(data.yearHTML)+"\n"+EditButtonTD(id)+"</tr>";
}

function PrototypeExampleRowHTML(id){
	var data=GameEntryData[id];
	if(!data)
		return "";
	return "\t<tr id='"+data.playlink+"'>\n"+TDHTML(data.titleHTML)+"\n"+TDHTML(data.authorHTML)+"\n"+TDHTML(data.classification)+"\n"+TDHTML(data["notes-consensus"])+"\n"+EditButtonTD(id)+"</tr>";
}


function LoadPGDTable(){
	
	var targetID=PageIdentifier()+"-area";
	var placeholderID=Posfix(PageIdentifier(),"-area");
	var headers=["Title","Author","Date"];
	var RowGenerator=GameRowHTML;
	if(PageIdentifier()==="game-tools"){
		headers=["Title","Author","Type","Tags"];
		RowGenerator=PrototypeExampleRowHTML;
	}
	
	WaitingPGD();
	LoadPGD();
	Listen("LoadPGD",UpdatePGD);
	
	function WaitingPGD(){//◊ 
		ReplaceChildren("<b>Please wait while recent submissions are fetched...</b>",".discard");
		DynamicTable("TABLE");
		GetElement(targetID).id=placeholderID;
		var newe=GetElements(".new");
		if(newe.length>0)
			newe.map(function(e){Deselect(e,"new")});
	}
	
	function PGD(){
		var caption="<span class='discard'>"+PageTitle()+" <b>up-to-date</b>.</span>";
		var rowArray=GameEntryData.list.map(RowGenerator);
		return TableHTML(caption,headers,rowArray);
	}
		
	function UpdatePGD(){
			ReplaceChildren(PGD(),placeholderID);
			GetElement(placeholderID).id=targetID;
			headers.map(function(header){SortTable(targetID,header,true)});
			DynamicTables();
			ConsoleAdd(PageTitle()+" just refreshed!");
			OutLinks();
			ReplaceChildren(TableLength(targetID),'titlenumber'); //Update page game title count
	}
}


//////////////////////////////////////////////////////////////////////
// PGD Menu

function LoadGameHTML(frameHTML){
	PrependElement(frameHTML,".main");
}

function PGDMenuHTML(){
	return "<div class='pgd-menu'><p>Loading games list...</p></div>";
}

function GameFrameHTML(){
	return "<div class='game-container game-console'>\
				<p class='title'>Game Console</p>\
				<img alt='game-console' width='180' height='180' src='images/180/game-console.png'/>\
				"+PGDMenuHTML()+"\
			</div>";
}

function LoadPGDMenu(){
	var menu="<div class='drop-menu pgd-menu'><div class='drop-options'></div></table>";
	ReplaceElement(menu,".pgd-menu")
	PrependFilterInput(InputFilterPGDMenu,".pgd-menu .drop-options","drop-option",".drop-options");
}

function AutoCheckYear(){
	var year=Number(sourceYear);
	var data=GameEntryData["game-console.html?game="+PageSearch("game")];
	var yedit=data["year-edit"];
	console.log("YEARS",year,yedit);
	if(year>0&&year!==yedit){
		SubmitData({"year-edit":year,"title":data.title,"author":data.author,"mode":"edit"},GetDestination("PGD"));
	}
}

function GameDropDownButtonHTML(id,showauthor){
	var data=GameEntryData[id];
	var title=data["title-consensus"];
	author=" by "+data["author-consensus"];
	if(showauthor===false)
		var author="";
	return ButtonHTML({
		txt:(title+author),
		attributes:{class:"drop-option",onclick:'Navigate(\"'+data["playlink"]+'\",true)'}
	});
}

function InputFilterPGDMenu(parentSelector,filterselector,childSelector,subparentSelector){
	var patterntxt=GetElement(filterselector).value;
	var parentSelector=GetElement(parentSelector);
	
	function FilterDisplay10(children){
		function MatchData(id){
			var data=GameEntryData[id];
			return data&&data.consolable&&(InSimple(data["title-consensus"],patterntxt)||InSimple(data["author-consensus"],patterntxt));
		}
		var ch=GameEntryData.list.filter(MatchData);
		if(ch.length)
			ch=ch.map(GameDropDownButtonHTML)
		return ch;
	}

	ApplyChildren(FilterDisplay10,parentSelector,childSelector,subparentSelector);
}

function GameDropdownRowHTML(data){
	return "<div id='"+data.playlink+"'>"+data.titleHTML+data.notesHTML+" by "+data.authorHTML+data.authorOriginalHTML+"</div>";
}

//////////////////////////////////////////////////////////////////////
Shout("puzzlescript-database")