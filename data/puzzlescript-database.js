//////////////////////////////////////////////////////////////////////
//Starter

var targetID=Posfix(PageIdentifier(),"-area");
var databaseTitle=PageTitle()||Capitalise(PageIdentifier());

if(PageIdentifier()==="puzzlescript-games-database"){
	var headers=["Title","Author","Date"];
	var RowGenerator=GameRowHTML;
	function StartPGD(){
		GetElement(".main .section .container").innerHTML=v.PGD();
		LoadPGDTable();
	}
	HearOnce('puzzlescript-database-game',StartPGD);
}
else if(PageIdentifier()==="game-tools"){
	var headers=["Title","Author","Type","Tags"];
	var RowGenerator=PrototypeExampleRowHTML;
	function StartPGD(){
		GetElement("puzzlescript-database-component").innerHTML=v.PCD();
		LoadPGDTable();
	}
	HearOnce('puzzlescript-database-component',StartPGD);
}
else if(PageIdentifier()==="game-console"){
	function StartPGD(){
		LoadPGD();
		if(PageSearch("game")===""){
			LoadGameHTML(GameFrameHTML());
			LoadPGDMenu();
			HearOnce("LoadPGD",LoadPGDMenu);
		}
		else if(PageSearch("submit")!==""){	//auto-submission
			
			function AutoSub(){LoaderInFolder("codes/game")("puzzlescript-tagger");};
			DelayUntil(GameInfoRetrieved,AutoSub);
		}
		else{
			if(GameInfoRetrieved()){
				AutoCheckYear();
				console.log("checked");
			}else{
				console.log("waiting");
				HearOnce("LoadPGD",function(){DelayUntil(GameInfoRetrieved,AutoCheckYear)});
			}
		}
	}

	HearOnce('puzzlescript-database-game',StartPGD);
	
}

GameInfoRetrieved=function(){
	return typeof state!=="undefined"&&state.levels.length>0;
};

/*else if(PageIdentifier()==="game-editor"){
	LoadPGD();
	ReplaceElement(PGDMenuHTML(),ParentElement("exampleDropdown")); //PS Editor Selector
	HearOnce("LoadPGD",LoadPGDMenu);
}*/





//////////////////////////////////////////////////////////////////////
// PGD Table

function LoadPGDTable(){
	ReplaceChildren("<b>Please wait while recent submissions are fetched...</b>",".discard");	
	HearOnce("LoadPGD",OverwritePGD);
	LoadPGD();
}

function LoadPGD(){
	var PGDURL=MacroURL(Inflows("PGD"));
	LoadData(PGDURL,RegisterPGDEntries);
}

function RegisterPGDEntries(data){
	if(data!==""){
		data=JSON.parse(data);
		data.map(GameEntryData);
		Shout("LoadPGD");
	}
}

function OverwritePGD(){
	DeployPGD(headers,RowGenerator,targetID);
	ConsoleAdd(databaseTitle+" just refreshed!");
	PageFeaturesDOM();
	ReplaceChildren(TableLength(targetID),'titlenumber'); //Update page game title count
}

function DeployPGD(headers,RowGenerator,targetID){
	var caption="<span class='discard caption'>"+databaseTitle+" <b>up-to-date</b>.</span>";
	var rowArray=Memory("PGD").map(RowGenerator);
	var table=TableHTML({caption:caption,headers:headers,rows:rowArray});
	ReplaceChildren(table,targetID);
	function TableSorter(header){SortTable(targetID,header,true)};
	headers.map(TableSorter);
}





//////////////////////////////////////////////////////////////////////
// Formatting Entries

function DaysUpdated(u){ //Lexicographic-chronologic
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


function LinkWhitelist(){ //Sort descending by expected number of submissions
	return [
		/^https\:\/\/(www\.)?puzzlescript\.net\/play\.html\?p\=.*/,
		/^https\:\/\/[^\#\^\~\\\/\|\.\:\;\,\s\?\=\}\{\[\]\&\'\"\@\!]*\.itch\.io\/.*/,
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

function InLinkWhitelist(string){
	function Verify(condition){return InString(string,condition)}
	return LinkWhitelist().some(Verify);
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
	if(typeof LinkWhitelist!=="undefined"&&InLinkWhitelist(data.linkHTML)){
		var fork=""
		if(In(data.linkHTML,".github.io"))
			fork="&fork="+new URL(data.linkHTML).host.replace(/\.github\.io.*/g,"");

		if(PageSearch("p",data.linkHTML))
			data.playlink="game-console.html?game="+PageSearch("p",data.linkHTML)+fork;
		if(PageSearch("hack",data.linkHTML))
			data.playlink="game-console.html?game="+PageSearch("hack",data.linkHTML)+fork;
		
		if(data.playlink!=="")
			data.consolable=true;
		
		if(data.consolable)
			data.titleHTML=AHTML(data.titleHTML,data.playlink)+" "+AHTML(ObtainSymbol("loz"),data.linkHTML);
		else
			data.titleHTML=AHTML(data.titleHTML,data.playlink=data.linkHTML);
		
		//data.playlink=data.playlink.replace(fork,"");
		
		if(data.pageHTML&&data.authorHTML!=="undefined"){
			data.authorHTML=AHTML(data.authorHTML,data.pageHTML);
		}
	}
	
	data.notesHTML=MultiLabel(data.notesHTML);
	data.authorOriginalHTML=MultiLabel(data.authorOriginal);
	data.id=data.playlink.replace("game-console.html?game=","").replace(fork,""); //Both external and forks
	
	//Display date

	function DisplayDate(days,year){
		var updated=(days<365)?DaysUpdated(days):"";
		var y=(year>0)?year:"0000 please add year";
		return updated+" ("+y+")";
	}
	
	data.yearHTML=DisplayDate(data.days,data["year-consensus"]);

	var gameList=Memory("PGD");

	if(!gameList){
		gameList=[];
		Memory("PGD",gameList);
	}

	if(data.id!==""&&!In(gameList,data.id)){
		gameList.push(data.id);
		Memory("PGD",gameList);
		Memory(data.id,data);
	}

	return data;
};


function EditButtonTD(id){
	var bu=ButtonHTML({
		txt:ObtainSymbol("edit"),
		attributes:{onclick:"RequestPGDSubmission(\""+id+"\",true);"}});
	return "<td class='editTD'>"+bu+"</td>";
};

function GameRowHTML(id){
	var data=Memory(id);
	if(!data)
		return "";
	return "\t<tr id='"+id+"'>\n"+TDHTML(data.titleHTML+data.notesHTML)+"\n"+TDHTML(data.authorHTML+data.authorOriginalHTML)+"\n"+TDHTML(data.yearHTML)+"\n"+EditButtonTD(id)+"</tr>";
}

function PrototypeExampleRowHTML(id){
	var data=Memory(id);
	if(!data)
		return "";
	return "\t<tr id='"+id+"'>\n"+TDHTML(data.titleHTML)+"\n"+TDHTML(data.authorHTML)+"\n"+TDHTML(data.classification)+"\n"+TDHTML(data["notes-consensus"])+"\n"+EditButtonTD(id)+"</tr>";
}





//////////////////////////////////////////////////////////////////////
// PGD Menu

function LoadGameHTML(frameHTML){
	//RemoveElement(".game-console");
	PrependElement(frameHTML,".main");
}

function PGDMenuHTML(){
	return "<div class='pgd-menu'><p>Loading games list...</p></div>";
}

function GameFrameHTML(){
	return `
	<div class='game-container game-console' style=' background-color: var(--beije);	display: flex;	flex-direction: column;	align-items: center;	justify-content: center}'>
		<h2>Game Console</h2>
		<img class='image' alt='game-console' style='width:180px;height:180px' src='images/game-console.svg'/>
		${PGDMenuHTML()}
	</div>`;
}

function LoadPGDMenu(){
	var menu="<div class='drop-menu pgd-menu'><div class='drop-options'></div></div>";
	ReplaceElement(menu,".pgd-menu")
	PrependFilterInput(InputFilterPGDMenu,".pgd-menu .drop-options","drop-option",".drop-options");
}

function AutoCheckYear(){
	var year=Number(sourceYear);
	var data=Memory("game-console.html?game="+PageSearch("game"));
	var yedit=data["year-edit"];
	console.log("YEARS",year,yedit);
	if(year>0&&year!==yedit){
		data=FuseObjects(data,{
			"year-edit":year,
			"title":data.title,
			"author":data.author,
			"mode":"edit"
			});
		data=FuseObjects(data,Outflows("PGD_default"));
		SubmitData(data);
	}
}


function GameDropDownButtonHTML(id,showauthor){
	var data=Memory(id);
	var title=data["title-consensus"];
	author=" by "+data["author-consensus"];
	if(showauthor===false)
		var author="";
	return ButtonHTML({
		txt:(title+author),
		attributes:{class:"drop-option",onclick:'Navigate(\"'+data["playlink"]+'\")'}
	});
}

function InputFilterPGDMenu(parentSelector,filterselector,childSelector,subparentSelector){
	var patterntxt=GetElement(filterselector).value;
	var parentSelector=GetElement(parentSelector);
	
	function FilterDisplay10(children){
		function MatchData(id){
			var data=Memory(id);
			return data&&data.consolable&&(InSimple(data["title-consensus"],patterntxt)||InSimple(data["author-consensus"],patterntxt));
		}
		var ch=Memory("PGD").filter(MatchData);
		if(ch.length)
			ch=ch.map(GameDropDownButtonHTML)
		return ch;
	}

	ApplyChildren(FilterDisplay10,parentSelector,childSelector,subparentSelector);
}

function GameDropdownRowHTML(data){
	return "<div id='"+data.playlink+"'>"+data.titleHTML+data.notesHTML+" by "+data.authorHTML+data.authorOriginalHTML+"</div>";
}

function GameTitle(){
	return Memory(PageSearch("game"))["title-consensus"];
}

//////////////////////////////////////////////////////////////////////
Shout("puzzlescript-database")