///////////////////////////////////////////////////////////////////////////////
// Service workers

function PageType(){
	return GetElements("meta").filter(function(m){return m.getAttribute("property")==="og:type";})[0].content;
}

function ListDependencies(){
	
	var dependencies=[];
	var imgdependencies=GetElements("img").map(function(e){return PageRelativePath(e.src)});
	var audiodependencies=GetElements("audio").map(function(e){return PageRelativePath(e.src)});
	
	dependencies=dependencies.concat(imgdependencies).concat(audiodependencies);
	
	var name=PageIdentifier();
		
	if(PageType()!=="game"&&name!=="game-console")
		return dependencies;
	
	dependencies=dependencies.concat([
		name+".html",
		//Common game bar modules
		"codes/game/modules/data-game-extras.js",
		"codes/game/game.css"
	]);
	
	var psdependencies=[
		//PS loader
		"codes/game/puzzlescript-embed.js",
		//PS modules
		"codes/game/modules/globalVariables.js",
		"codes/game/modules/debug_off.js",
		"codes/game/modules/font.js",
		"codes/game/modules/rng.js",
		"codes/game/modules/riffwave.js",
		"codes/game/modules/sfxr.js",
		"codes/game/modules/codemirror.js",
		"codes/game/modules/colors.js",
		"codes/game/modules/graphics.js",
		"codes/game/modules/engine.js",
		"codes/game/modules/parser.js",
		"codes/game/modules/compiler.js",
		"codes/game/modules/inputoutput.js",
		"codes/game/modules/mobile.js",
		//PS game bar modules
		"codes/game/modules/data-game-colours.js",
		"codes/game/modules/data-game-overwrite.js",
		"codes/game/modules/data-game-moves.js"
	];
	
	
	if(name==="puzzle-type"){
		dependencies=dependencies.concat([
			"codes/game/puzzle-type/"+"puzzle-type"+".js",
			"codes/game/puzzle-type/"+"puzzle-type"+".css",
			"codes/game/modules/data-game-colours-names.js"
		])
	}
	else{
		if(name!=="game-console")				//Offline PS source
			dependencies=dependencies.concat(["codes/game/puzzlescript/"+name+".js"]);
		dependencies=dependencies.concat(psdependencies);
	}
	
	return dependencies;
}

function ServiceWorker(){
	function SWReady(registration){
		console.log('Service worker registration succeeded:',registration);
		return navigator.serviceWorker.ready;
	};
	
	if('serviceWorker' in navigator){
		navigator.serviceWorker.register('/cacher.js',{scope:'./'}).then(SWReady).then(ServiceWorkerCacheAddF(ListDependencies())).catch(function(error){
			console.log('Service worker registration failed:',error);
		});
	}
	else 
		console.log('Service workers are not supported.');
};

function SWReadyCacheAdd(registration,files){
	registration.active.postMessage({command:'SelectiveCache',parameters:files});
	//console.log("Registered specific dependencies in SW cache:");
	//files.map(console.log);
};
function ServiceWorkerCacheAddF(sourceArray){
	function SWDependencies(reg){
		SWReadyCacheAdd(reg,sourceArray);
	};
	return SWDependencies;
};


function ServiceWorkerCache(sourceArray){
	if('serviceWorker' in navigator){
		navigator.serviceWorker.ready.then(ServiceWorkerCacheAddF(sourceArray)).catch(function(error){
			console.log('SW Cache Add failed:',error);
		});
	}
	else 
		console.log('Service workers are not supported.');
};



///////////////////////////////////////////////////////////////////////////////
// Data transmission - JSON, to a script in url "url"

function Encode(key,value){
	return encodeURIComponent(key)+'='+encodeURIComponent(value);
}
function EncodeData(data){
	return MapKeys(FlipKeysValues(data),Encode).join("&");
}

function EchoPureData(data,url){
	if(!data||!url)
		return;
	
	var encoded=EncodeData(data);
	var xhr=new XMLHttpRequest();
		xhr.open('POST',url);
		xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		xhr.onreadystatechange=function(){
			console.log(xhr.status, xhr.statusText);
			console.log(xhr.responseText);
			return;
		};
		xhr.send(encoded);
}

function EchoData(data,url){
	if(Online())
		EchoPureData(data,url);
	else
		BufferData(data,url);
}

function EchoDataBuffer(){
	while(Connection.queue.length>0){
		EchoPureData(Connection.queue[0][0],Connection.queue[0][1]);
		Connection.queue.shift();
	}
};

function BufferData(data,url){
	Connection.queue.push([data,url]);
}

function DataBufferEmpty(){
	return Connection.queue.length<1;
}

//Network status

function MonitorConnection(){
	if(Online()){
		var message="Network status:<b>Online</b>";
		if(!DataBufferEmpty()){
			message=message+" re-sending data...";
			EchoDataBuffer();
		}
		ListenOnce('offline',MonitorConnection);
	}else{
		var message="Network status:<b>Offline</b>";
		ListenOnce('online',MonitorConnection);
	}
	ConsoleAdd(message);
}

function Connection(){
	if(!Connection.queue)
		Connection.queue=[];

ListenOnce('offline',MonitorConnection);
}

Connection();


//////////////////////////////////////////////////
//Tables

//Sort
function ColumnNumber(tableSelector,n){
	var headers=GetElements("TH",tableSelector);
	if(typeof n==="number"&&n>-1&&n<=headers.length-1)
		return n;
	
	if(typeof n!=="string")
		return -1;
	else{
		headers=headers.map(function(th){return th.textContent.toLowerCase()});
		return headers.indexOf(n.toLowerCase());
	}
}

function CompareRow(n,descending){
	function CompareAscending(rowA,rowB){
		
		var A=Array.from(rowA.children);
		var B=Array.from(rowB.children);
		
		if(A.length<n-1)
			if(B.length<n-1)
				return 0;
			else
				return 1;
		
		if(B.length<n-1)
			return -1;

		var Atext=A[n]?A[n].textContent.toLowerCase():"";
		var Btext=B[n]?B[n].textContent.toLowerCase():"";
		
		if(Atext<Btext)
			return -1;
		else
			return 1;
	}
	
	if(!descending)
		return CompareAscending;
	else
		return function(rowA,rowB){return 0-CompareAscending(rowA,rowB)};
}

function SortTable(tableSelector,n,descending){
	var tbody=GetElement("TBODY",tableSelector);
	var rows=GetElements("TR",tbody);
	var descending=descending||false;
	var n=ColumnNumber(tableSelector,n);
	function SortRows(rows){
		return rows.sort(CompareRow(n,descending));
	}
	ApplyChildren(SortRows,tbody,rows);
}

function SortableTable(tableSelector){
	var headers=GetElements("TH",tableSelector);
	
	function SortByHeader(header){
		var table=ParentElement(header,"TABLE");
		var column=header.textContent;
		function SortByThis(){
			Toggle(header,"Ascending");
			var descending=!Classed(header,"Ascending")
			if(descending)
				Class(header,"Descending");
			else
				UnClass(header,"Descending");
			SortTable(tableSelector,column,descending);
		}
		Listen('click',SortByThis,header);
	}
	
	headers.map(SortByHeader)
}

function TableLength(idSel){
	var target=GetElementIn("TBODY",idSel);
	if(target&&target.childNodes)
		return Array.from(target.childNodes).filter(function(e){return e.childNodes.length>0}).length;
	else
		return "quite a good number of";
}

//Filter

function FilterSearchURL(tableSelector){
	var search=PageSearch("search");
	if(search!==""&&GetElements("TABLE").length===1){
		TextFilterChildren(search,tableSelector,"TR","TBODY");
		GetElement("INPUT").value=search;
	}
}

function InputFilter(parentSelector,filterselector,childrenSelector,subparentSelector){
	var textfilter=GetElement(filterselector).value;
	var parentSelector=GetElement(parentSelector);
	TextFilterChildren(textfilter,parentSelector,childrenSelector,subparentSelector);
}

function FilterableTable(tableSelector){
	if(GetElements("TR",tableSelector).length>10){//Only big tables need filtering
		PrependFilterInput(InputFilter,tableSelector,"TR","TBODY");
		FilterSearchURL(tableSelector);
	}
}

// Dynamic Tables

function DynamicTable(tableSelector){
	SortableTable(tableSelector);
	FilterableTable(tableSelector);
}

function DynamicTables(){
	var tables=GetElements("TABLE");
	if(tables.length>0)
		tables.map(DynamicTable);
}

ListenOnce('load',DynamicTables);

//Fetch table
function LoadTableHTML(jsondata,RowF,headers){
	if(!jsondata)
		return;
	if(!RowF)
		var RowF=Identity;
	var rowArray=JSON.parse(jsondata).map(RowF);
	return TableHTML(PageTitle(),headers,rowArray);
}


//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//Form Types

var DESTINATIONS={}; 

var DESTINATION_HOF={
	url:"https://script.google.com/macros/s/AKfycbzgwZUKFmuNQin6Kq4-kTMBSZtz9TapE6kxpZyk7p2tRaanLD1w/exec",
	headers:"[\"identifier\",\"name\",\"honour\"]",
	sheet:"Hall of fame",
	name:"HOF",
	Data:function(qid){return{
		identifier:PageTitle(),
		name:FindData("name",qid),
		honour:ObtainHonour()
		}}
	}

// Honour
if(!ObtainHonour){
	function ObtainHonour(){return HintsHonour()}; 
}

var who=UserId();	
var DESTINATION_FEEDBACK={
	url:"https://script.google.com/macros/s/AKfycbwB-a8j-INbkzTiQFJ55qETLYkdZrRvSg2s8urj9bPbG0XkBg9z/exec",
	headers:"[\"identifier\",\"context\",\"question\",\"answer\",\"name\",\"state\"]",
	sheet:"Feedback",
	name:"Feedback",
	Data:function(qid){
		return{
			identifier:document.body.id,
			context:String(CurLevelNumber()),
			question:GetElement(".question",qid).innerHTML,
			answer:FindData("answer",qid),
			name:who,
			state:FindData("snapshot",qid)==="yes"?PrintGameState():"---"
			}}
}

function AnonimiseBlank(name){
	if(name!==undefined&&SomeTextValidate(name))
		return name;
	else
		return "Anonymous fan "+RandomChoice("♩♬♪♬♫")+RandomChoice("♩♬♪♬♫")+RandomChoice("♩♬♪♬♫");
}

var DESTINATION_GUESTBOOK={
	url:DESTINATION_HOF.url,
	headers:"[\"name\",\"identifier\",\"comment\",\"id\"]",
	sheet:"Guestbook",
	name:"Guestbook",
	Data:function(qid){return{
		identifier:PageTitle(),
		comment:FindData("answer",qid),
		name:AnonimiseBlank(FindData("name",qid)),
		id:RequestMessageReply.currentid
		}}
	}

function commentID(){return "no comment yet!"};
var DESTINATION_COMMENT={
	url:DESTINATION_GUESTBOOK.url,
	headers:DESTINATION_GUESTBOOK.headers,
	sheet:DESTINATION_GUESTBOOK.sheet,
	name:"Comments",
	Data:function(qid){return{
		identifier:commentID(),
		comment:FindData("answer",qid),
		name:FindData("name",qid),
		}}
	}
	

var DESTINATION_CONTACT={
	url:DESTINATION_HOF.url,
	headers:"[\"email\",\"name\",\"identifier\",\"message\",\"subject\",\"id\"]",
	sheet:"Contact",
	name:"Contact",
	Data:function(qid){return{
		identifier:PageIdentifier(),
		message:FindData("message",qid),
		name:FindData("name",qid),
		email:FindData("email",qid),
		subject:FindData("subject",qid)
		}}
	}

var DESTINATION_SUBSCRIPTION={
	url:DESTINATION_FEEDBACK.url,
	headers:"[\"name\",\"address\"]",
	sheet:"Subscription",
	name:"Subscription",
	Data:function(qid){return{
		name:FindData("name",qid),
		address:FindData("address",qid)
		}}
	}

var DESTINATION_ORDER={
	url:DESTINATION_FEEDBACK.url,
	headers:"[\"identifier\",\"address\"]",
	sheet:"Order",
	name:"Order",
	Data:function(qid){return{
		identifier:PageTitle(),
		address:FindData("address",qid)
		}}
	}

var DESTINATION_KEYS={
	url:DESTINATION_FEEDBACK.url,
	headers:"[\"identifier\",\"key\"]",
	sheet:"Keys",
	name:"Keys",
	Data:function(qid){return{
		identifier:PageTitle(),
		key:FindData("answer",qid)
		}}
	}
	
var DESTINATION_PASS={
	url:DESTINATION_FEEDBACK.url,
	headers:"[\"identifier\",\"name\",\"address\",\"account\"]",
	sheet:"Pass",
	name:"Pass",
	Data:function(qid){return{
		identifier:PageTitle(),
		name:FindData("name",qid),
		address:FindData("address",qid),
		account:FindData("answer",qid),
		type:FindData("type",qid)
		}}
	}

var DESTINATION_PGD={
	url:"https://script.google.com/macros/s/AKfycbwl1oMrc36DizbST5TJAxCYMV-5hnGpHsVs_U8fsgZwBqBZnsWm/exec",
	headers:"[\"title\",\"author\",\"link\",\"page\",\"notes\",\"title-edit\",\"author-edit\",\"link-edit\",\"page-edit\",\"notes-edit\",\"year-edit\",\"mode\"]",
	sheet:"Games List",
	name:"PGD",
	Data:function(qid){
		var dc=Clone(RequestPGDSubmission['lastdata']);
		var data={};
		
		data.mode=FindData("mode",qid);
		if(!data.mode)
			data.mode="";
		
		data["year-edit"]=String(Year());
		
		if(data.mode!=="edit"){
			function SetDataF(type){
				data[type]=FindData(type,qid);
			}
		}
		else{
			function SetDataF(type){
				var d=FindData(type,qid);
				if(d!==data[type+"-consensus"])
					data[type+"-edit"]=d;
				data[type]=dc[type];
			}
		}
		['title','author','link','page','notes','year'].map(SetDataF);
		delete data['year'];
		
		console.log(data);
		return data;
	}
}


function RegisterDestination(DESTINATION){
	DESTINATIONS[DESTINATION.name]=DESTINATION;
}

[	DESTINATION_HOF,
	DESTINATION_GUESTBOOK,
	DESTINATION_COMMENT,
	DESTINATION_CONTACT,
	DESTINATION_FEEDBACK,
	DESTINATION_SUBSCRIPTION,
	DESTINATION_ORDER,
	DESTINATION_KEYS,
	DESTINATION_PASS,
	DESTINATION_PGD].map(RegisterDestination);

//////////////////////////////////////////////////////////////////////
//Hall of Fame

function RequestHallOfFame(){
	
	if(GameConsole())
		return;
	
	RequestDataPack([
	['alias',{
		questionname:"Enter the Hall of Fame:",
		qplaceholder:"Your name or alias",
		qrequired:true,
		qerrorcustom:"The Hall of Fame's guards ask for at least 2 alphanumerics!"}
	]],
	{
		destination:"HOF",
		qonclose:RequestModalWinnerMessage,
		qonsubmit:RequestModalWinnerMessage
	});
}

function RequestModalWinnerMessage(previousDP){
	
	function DestinationChoice(choice){
		if(choice==="Public message in Guestbook")
			return "Guestbook";
		else
			return "Feedback";
	}
	
	RequestDataPack([
		['answer',{
			questionname:"As a winner, what would you tell Pedro PSI?",
		}],
		['exclusivechoice',{
			questionname:"",
			qfield:"whence",
			qchoices:["Private message","Public message in Guestbook"],
			executeChoice:function(choice,id){
				SetData("destination",DestinationChoice(choice),id);
			}
		}]
	],
	{
		thanksmessage:"Thank you for your message.",
		qonclose:GameFocus,
		qonsubmit:GameFocus,
		findDestination:function(DP){return DestinationChoice(FindData("whence",DP.qid));}
	}
	);
}


//////////////////////////////////////////////////////
// Real time Feedback Requests

function RequestGameFeedback(){

	if(!RequestGameFeedback.requests)
		RequestGameFeedback.requests=[];
	  
	function RecordAndLaunchThanksBalloon(DP){
		RequestGameFeedback.requests.push(CurrentScreen());
		LaunchConsoleThanks(DP);
		FocusAndResetFunction(RequestGameFeedback,GameFocus)();};
	
	var DPsettingsObj={
		qtargetid:ParentSelector(gameSelector),
		qdisplay:LaunchAvatarBalloon,
		qonsubmit:RecordAndLaunchThanksBalloon,
		qonclose:FocusAndResetFunction(RequestGameFeedback,GameFocus),
		shortcutExtras:FuseObjects(ObtainKeyActionsGameBar?ObtainKeyActionsGameBar():{},{"E":CloseFeedback}),
		thanksmessage:"★ Thank you for your feedback! ★",
		buttonSelector:"FeedbackButton",
	};
	
	var DFsettingsObj={};
	var DFSnapshot=['snapshot',{}];
	  
	function HasFeedback(){return In(RequestGameFeedback.requests,CurrentScreen());};
	
	if(CurrentDatapack()&&CurrentDatapack().buttonSelector==="FeedbackButton")
		CloseCurrentDatapack();
	else if(TitleScreen()){
		DFsettingsObj.questionname="<p>Press "+ObtainSymbol("feedback")+" or <kbd>"+ObtainMainKey("feedback")+"</kbd> as soon as you start the game to Email Pedro PSI real-time feedback. Much appreciated!</p>";
		RequestDataPack([['plain',DFsettingsObj]],DPsettingsObj);
	}
	else if(HasFeedback()){
		DFsettingsObj.questionname="<p>Any further comments on <b>"+ObtainLevelTitle(CurLevelNumber())+"</b>?</p>";
		RequestDataPack([['answer',DFsettingsObj],DFSnapshot],DPsettingsObj);
	}
	else if(!IsScreenMessage(CurrentScreen())){
		DFsettingsObj.questionname="<p>What do you think of <b>"+ObtainLevelTitle(CurLevelNumber())+"</b>, so far?</p>";
		RequestDataPack([['answer',DFsettingsObj],DFSnapshot],DPsettingsObj);
	}
	else{
		DFsettingsObj.questionname="<p>Comments or ideas?</p>";
		RequestDataPack([['answer',DFsettingsObj],DFSnapshot],DPsettingsObj);
	}

}

function CloseFeedback(){
	if(CurrentDatapack().buttonSelector==="FeedbackButton")
		CloseCurrentDatapack();
	GameFocus();
}

function PrintGameState(){
	return GetElement("gameCanvas").toDataURL();
}

///////////////////////////////////////////////////////////////////////////////
// Guestbook & Comments

function RequestGuestbook(){
	RequestDataPack([
		['answer',{
			questionname:"Your message",
			thanksmessage:"Thank you for your message in the Guestbook!"}],
		['alias',{}]
	],{
		destination:'Guestbook'
		}
	)
}

function RequestMessageReply(nid){
	RequestMessageReply.currentid=nid;
	RequestDataPack([
		['answer',{
			questionname:"Your polite reply",
			qplaceholder:"I concur/beg to differ ...",
			thanksmessage:"Your reply has been posted! Thank you."}],
		['alias',{}]
	],{
		destination:'Guestbook'
		}
	)
}


function commentAddress(e){
	var f=1;
	var title=e;
	while(f!=0&&f<=100){
		f++;
		title=title.nextSibling;
		if(title.tagName==="H3"){f=0}
	}
	return title.innerText;
}



function RequestComment(title,elemsubtitle){
	commentID=function(){return title+": "+commentAddress(elemsubtitle);}; 	//redefine this global function dynamically
	
	RequestDataPack([
		['answer',{
			questionname:"Your comment"
		}],
		['alias',{}]
	],{
		destination:'Comments'
	});
}

//////////////////////////////////////////////////////////////////////
//Subscribe

function OpenModalSubscribe(){
	RequestDataPack([
		['email',{
			destination:'Subscription',
			questionname:"Subscribe to be the first to know about Pedro PSI's next project!",
			thanksmessage:"Thank you for subscribing!"
		}],
		['name',{}]],
		{
			destination:'Subscription'}
	)
}

//////////////////////////////////////////////////////////////////////
//Order

function OpenModalPreOrder(campaigntext){
	
	RequestDataPack([['email',{questionname:campaigntext}]],{
			destination:'Order',
			thanksmessage:"Your booking was placed. Thank you!"
		});
}



//////////////////////////////////////////////////////////////////////
//Media Pass

function RequestMediaPass(){
	RequestDataPack([
		['name',{
			qrequired:true,
			questionname:"What's your name?",
			qplaceholder:"(real or artistic name)"}],
		['answer',{
			questionname:"Through which channels do you intend to review this game?",
			qplaceholder:"e.g. which blog, magazine, youtube channel, twitch account, etc..."}],
		['email',{
			questionname:"Your email(to receive the key)"
		}]],
		{
			thanksmessage:"Your request is being processed - please allow 1-2 business days.",
			destination:'Pass'
			}
		)
}

//////////////////////////////////////////////////////////////////////
//PWA Install

function RequestPWAInstall(){
	RequestDataPack([
		['exclusivechoice',{
			questionname:"Add "+PageTitle()+" to your homescreen (offline)?",
			qchoices:["Maybe later...","Yes, please!"],
			executeChoice:InstallPWAMaybe,
			qsubmittable:false
			}]
		],
		{
			qdisplay:LaunchConsoleMessage
		}
	)
}

var installPWAEvent=false;
window.addEventListener('beforeinstallprompt',function(e){
	installPWAEvent=e;
	if(!In(PageSearch("source"),"homescreen"))
		RequestPWAInstall();
});

function InstallPWAMaybe(choice,id){
	if(choice==="Yes, please!"){
		if(!installPWAEvent.prompt){
			ConsoleAdd("Sorry, your browser is unable to ask for PWA installation - reporting back to Pedro PSI...");
			RegisterPWA('BrowserCannot');
		}
		else{
			installPWAEvent.prompt();
			installPWAEvent.userChoice.then(function(choiceResult){
				if(choiceResult.outcome==='accepted'){
					RegisterPWA('Install');
				}else{
					RegisterPWA('Dismiss');
				}
				deferredPrompt = null;
			});
		}
	}
	CloseCurrentDatapack();
}

window.addEventListener('appinstalled',function(event){
	ConsoleAddMany([
		PageTitle()+" added to the homescreen.",
		"To enable offline access, please refresh the App once, so all files be cached.",
		"Enjoy!"
	]);
});


//////////////////////////////////////////////////////////////////////
//Purchase

function Purchased(){
	return (PageSearch("source")==="stripe"&&PageSearch("result")==="success")
};

function RequestPurchased(){
	ConsoleAddMany([
		"Thank you for your purchase. Enjoy!",
		"Pedro PSI stands available to answer any questions you may have...",
		"...yet no hints will be provided!",
		"<b>Important: please bookmark this URL</b> - you'll need it to return to the game!"]);
};

if(Purchased())
	RequestPurchased();

//////////////////////////////////////////////////////////////////////
// Editor

if(PageIdentifier()==="game-editor"){

	StopCapturingKeys(CaptureComboKey);//bug
	
	function tryLoadFile(fileName) {
		var fileOpenClient = new XMLHttpRequest();
		fileOpenClient.open('GET', 'PuzzleScript/demo/'+fileName+".txt");
		fileOpenClient.onreadystatechange = function() {
			
			if(fileOpenClient.readyState!=4) {
				return;
			}
			
			editor.setValue(fileOpenClient.responseText);
			setEditorClean();
			unloadGame();
			compile(["restart"]);
		}
	fileOpenClient.send();
	}

}

//////////////////////////////////////////////////////////////////////
// Database sub

function RequestPGDSubmission(editData,editmode){
	if(editData){
		if(IsString(editData))
			editData=GameEntryData[editData];
	
		if(editmode===true)
			editData.mode="edit";
		else
			var editmode=(editData.mode==="edit");
	}
	else
		var editData={"classification":"game"};
	
	var Game=Capitalise(editData.classification);
	RequestPGDSubmission['lastdata']=editData;
	var O=editData;
	
	var DFOpts=[
		['plain',{
			questionname:"Thank you for improving the "+PageTitle()+(editmode?(". You're editing <b>"+(O.titleHTML)+"</b> by <b>"+O.authorHTML+"</b>"):". You're adding a <b>new "+Game+"</b>."),
			qvalue:O.mode,
			qfield:"mode"
			}],
		['url',{
			qfield:"link",
			questionname:Game+" page",
			questioninfo:(Game==="Game"?"Playable":"Hackable")+" "+Game+" link - associates with the "+Game+" title.",
			qplaceholder:'https://puzzlescript.net/play.html?p=PUZZLESCRIPT_ID',
			qvalue:O["link-consensus"]||""}],
		['shortanswer',{
			qfield:"title",
			questionname:Game+" Title",
			questioninfo:"Title only - any extra info belongs to the <em>Labels</em> field, below.",
			qplaceholder:Game+' title',
			qvalue:O["title-consensus"]||""}],
		['shortanswer',{
			qfield:"author",
			questionname:Game+" Author(s)",
			questioninfo:"Name of Author(s), without specifying roles.",
			qplaceholder:'Author 1 (pseudonym1), Author 2...',
			qvalue:O["author-consensus"]||""}],
		['url',{
			qfield:"page",
			questionname:"Author(s) contact page",
			questioninfo:"Single contact page - associates with the "+Game+" Author(s).",
			qplaceholder:'e.g. https://example.com/AUTHOR1',
			qrequired:false,
			qvalue:O["page-consensus"]||""}]
	];
	
	if(Game==="Game")
		var DFOptsExtra=[
			['shortanswer',{
				qfield:"year",
				questionname:"Release Year",
				questioninfo:"Year the "+Game+" was first released (ignoring future updates).",
				qplaceholder:String(Year()),
				qrequired:false,
				qvalue:O["year-consensus"]||""}],
			['shortanswer',{
				qfield:"notes",
				questionname:"Labels",
				questioninfo:"Extra info to label the "+Game+". <b>Please follow the current database conventions (search for examples)!</b> For example: Version number (when indicated), beta (prototypes or works in progress), mod (heavily modified games), demake (ports from other formats). Comma-separated values will be displayed as individual tags. ",
				qplaceholder:'v0.1.2, beta, mod, demake, your comments',
				qrequired:false,
				qvalue:O["notes-consensus"]||""}]
		];
	else
		var DFOptsExtra=[
			['shortanswer',{
				qfield:"notes",
				questionname:"Tags",
				questioninfo:"Tags that apply to the "+Game+". <b>Please follow the current database conventions (search for examples)!</b>",
				qplaceholder:'counter, ice, gravity, pathfinding, line of sight',
				qrequired:false,
				qvalue:O["notes-consensus"]||""}]
			];
		
	DFOpts=DFOpts.concat(DFOptsExtra);
	RequestDataPack(DFOpts,{
		destination:"PGD"
	});
}


//////////////////////////////////////////////////////////////////////
// Contact

function RequestContact(){
	var DFOpts=[
		['email',{
			qfield:"email",
			questionname:"Your email address",
			questioninfo:"Optional, so you can receive a reply.",
			qrequired:false,
			qplaceholder:'lunussolariel@universe'
		}],
		['shortanswer',{
			qfield:"name",
			questionname:"Your name",
			questioninfo:"Optional as well.",
			qrequired:false,
			qplaceholder:'Lunus Solariel'
		}],
		['exclusivechoice',{
			questionname:"Message Subject",
			qfield:"subject",
			qchoices:["Common goals","Help request","Problem or bug","Praise & criticism","Advertising","Other"],
			executeChoice:function(choice,id){
				SetData("subject",choice,id);
			}
		}],
		['answer',{
			qfield:"message",
			questionname:"Your message"
		}]
	];
	RequestDataPack(DFOpts,{
		destination:"Contact",
		qtargetid:"contact-request",
		qdisplay:LaunchEmbed,
		closeonblur:false,
		thanksmessage:"★ Thank you. Please await your reply! ★"
	});
}

if(PageIdentifier()==="contact"){
	RequestContact()
}

////////////////////////////////////////////////////////////////////////////////
// Night Mode

function StartNightMode(){
	if(Memory("nightmode")===null){
		if(window.matchMedia('(prefers-color-scheme: dark)').matches)
			ActivateNightMode();
		else
			UnActivateNightMode();
	}
	else if(Memory("nightmode"))
		ActivateNightMode();
	else
		UnActivateNightMode();
}

function ActivateNightMode(){
	Memory("nightmode",true);
	Class(document.body,"nightmode");
	UnClass(document.body,"daymode");
	if(!Memory("nightmode_on")){
		Memory("nightmode_on",true);
		ConsoleAddMany([
		"Night mode active.",
		`Find the ${ObtainSymbol("sun")} to change.`
		]);
	}
	GetElement("NightMode").innerHTML=ObtainSymbol("sun");
}

function UnActivateNightMode(){
	Memory("nightmode",false);
	Class(document.body,"daymode");
	UnClass(document.body,"nightmode");
	if(!Memory("nightmode_off")){
		Memory("nightmode_off",true);
		ConsoleAddMany([
			`Bright mode active.`,
			`Find the ${ObtainSymbol("moon")} to revert.`
		]);
	}
	GetElement("NightMode").innerHTML=ObtainSymbol("moon");
}

function ToggleNightMode(){
	if(Memory("nightmode"))
		UnActivateNightMode();
	else
		ActivateNightMode();
}

StartNightMode();

///////////////////////////////////////////////////////////////////////////////
// Debug tools

function RequestDebugger(){
	RequestDataPack([
		['answer',{
			questionname:"Javascript code to be evaluated:",
			questioninfo:"(for cross-browser testing)",
			thanksmessage:"Evaluated",
			qplaceholder:`alert("It works!")`,
			qfield:"code",
			qid:"debugger"
		}]
	],{
		destination:'',
		closeonblur:false,
		actionText:'Evaluate',
		action:DebuggerEvaluate,
		requireConnection:false
		}
	)
}

function DebuggerEvaluate(){
	try{
		var result=eval(FindData('code'));
		ConsoleAdd(String(result));
	}catch(err){
		ConsoleAdd(String(err));
	}
}

//////////////////////////////////////////////////////////////////////
Shout("communication")
