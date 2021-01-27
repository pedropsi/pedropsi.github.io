///////////////////////////////////////////////////////////////////////////////
// Data transmission - JSON, to a script in url "url"

EchoPureData=function(data,url){
	if(!data)
		return;

	if(!url){//special case 
		if(data.post)
			return LoadData(MacroURL(data),console.log);
		return;
	}
	//General case
	UploadData(data,url);
}

UploadData=function(data,url){
	var encoded=ParameterString(data);
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

EchoData=function(data,url){
	if(Online())
		EchoPureData(data,url);
	else
		BufferData(data,url);
}

EchoDataBuffer=function(){
	var queue=ConnectionQueue();
	while(queue.length>0){
		EchoPureData(queue[0][0],queue[0][1]);
		queue.shift();
	}
};

BufferData=function(data,url){
	ConnectionQueue().push([data,url]);
}

DataBufferEmpty=function(){
	return ConnectionQueue().length<1;
}

//Network status

MonitorConnection=function(){
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

ConnectionQueue=function(){
	if(!ConnectionQueue.queue)
		ConnectionQueue.queue=[];
	return ConnectionQueue.queue;
}


//////////////////////////////////////////////////
//Tables

//Sort
ColumnNumber=function(tableSelector,n){
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

CompareRow=function(n,descending){
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

SortTable=function(tableSelector,n,descending){
	var tbody=GetElement("TBODY",tableSelector);
	var rows=GetElements("TR",tbody);
	var descending=descending||false;
	var n=ColumnNumber(tableSelector,n);
	function SortRows(rows){
		return rows.sort(CompareRow(n,descending));
	}
	ApplyChildren(SortRows,tbody,rows);
}

SortableTable=function(tableSelector){
	var headers=GetElements("TH",tableSelector);
	
	function SortByHeader(header){
		var table=ParentElement(header,"TABLE");
		var column=header.textContent;
		function SortByThis(){
			Toggle(header,"Ascending");
			var descending=!Classed(header,"Ascending");
			if(descending)
				Class(header,"Descending");
			else
				UnClass(header,"Descending");
			SortTable(tableSelector,column,descending);
		}
		function ClickSort(){
			Throttle(SortByThis,500,"SortByThis")
		}

		Listen('click',ClickSort,header);
	}
	
	headers.map(SortByHeader)
}

TableLength=function(idSel){
	var target=GetInElement("TBODY",idSel);
	if(target&&target.childNodes)
		return Array.from(target.childNodes).filter(function(e){return e.childNodes.length>0}).length;
	else
		return "quite a good number of";
}


// Dynamic Tables

DynamicTable=function(tableSelector){
	SortableTable(tableSelector);
	FilterableTable(tableSelector);
}

DynamicTables=function(){
	var tables=GetElements("TABLE");
	if(tables.length>0){
		MapThen(tables,DynamicTable,FilterSearchURL)
	}
}


//Fetch table
LoadTableHTML=function(jsondata,RowF,headers){
	if(!jsondata)
		return;
	if(!RowF)
		var RowF=Identity;
	var rowArray=JSON.parse(jsondata).map(RowF);
	return TableHTML({caption:PageTitle(),headers:headers,rows:rowArray});
}


//////////////////////////////////////////////////////////////////////

AnonimiseBlank=function(name){
	if(name!==undefined&&SomeTextValidate(name))
		return name;
	else
		return "Anonymous fan "+RandomChoice("♩♬♪♬♫")+RandomChoice("♩♬♪♬♫")+RandomChoice("♩♬♪♬♫");
}


//////////////////////////////////////////////////////////////////////
//Form Types

Inflows=function(name){
	var flows={
	"hall-of-fame":{
		docId:"1tp42m_9MoMN4IHzO6H9aqTkU2wt_FtdWGK3Q7Uwb9hw",
		sheetName:"Hall-of-Fame",
		rowStart:8
		},
	"guestbook":{
		docId:"1tp42m_9MoMN4IHzO6H9aqTkU2wt_FtdWGK3Q7Uwb9hw",
		sheetName:"Guestbook",
		rowStart:8
		},
	"visit":{
		docId:"1y5KANZWMYJglC8v3VdUm-V__aiMe2q3zvRWNS3BI9IM",
		sheetName:"Visit",
		rowStart:3,
		colEnd:2
	},
	"country":{
		docId:"1y5KANZWMYJglC8v3VdUm-V__aiMe2q3zvRWNS3BI9IM",
		sheetName:"Country",
		rowStart:3,
		colEnd:2
	},
	"won":{
		docId:"1y5KANZWMYJglC8v3VdUm-V__aiMe2q3zvRWNS3BI9IM",
		sheetName:"Won",
		rowStart:2
	},
	"PGD":{
		docId:"158LEND9dCQF53UFvB5BEWjQmgm47PUv2jBXdr8W3xWc",
		sheetName:"PGD",
		rowStart:8
	},
	"secret":{
		docId:"1JnxJM0LcFyl7XvF-P2MlBi6q3lKRlqVMEY-V8i9zWng",
		sheetName:"Source",
		rowStart:1
		},
	"hall-of-fame-global":{
		docId:"1UiBHdCU_JBJNyDZCVdbxYBHn5jbORfKwSexNixeyu0w",
		sheetName:"Hall-of-Fame-Global",
		rowStart:3
		}
	};
	if(name)
		return Evaluate(flows[name]);
	else
		return flows;
}

Outflows=function(name){
	var flows={
		"hall-of-fame":function(){return{
			post:true,
			docId:"1tp42m_9MoMN4IHzO6H9aqTkU2wt_FtdWGK3Q7Uwb9hw",
			sheetName:"Hall-of-Fame",
			rowStart:8,
			identifier:PageTitle(),
			name:FindData("name"),
			honour:HintsHonour?HintsHonour():""
		}},
		"guestbook":function(){return{
			post:true,
			docId:"1tp42m_9MoMN4IHzO6H9aqTkU2wt_FtdWGK3Q7Uwb9hw",
			sheetName:"Guestbook",
			rowStart:8,
			identifier:PageTitle()==="Guestbook"?RequestMessageReply.title:PageTitle(),
			comment:FindData("answer"),
			name:AnonimiseBlank(FindData("name")),
			id:RequestMessageReply.currentid
		}},
		"feedback":function(){return{
			post:true,
			docId:"170q-TzTN7uita_7Jn8CS05DdU2VRjb4HRZYAOlf4AVE",
			sheetName:"Feedback",
			identifier:PageIdentifier(),
			context:String(CurLevelNumber()),
			question:GetElement(".question").innerHTML,
			answer:FindData("answer"),
			name:UserId(),
			state:FindData("snapshot")==="yes"?PrintGameState():"---"
		}},
		"contact":function(){return{
			post:true,
			docId:"170q-TzTN7uita_7Jn8CS05DdU2VRjb4HRZYAOlf4AVE",
			sheetName:"Contact",
			identifier:PageIdentifier(),
			message:FindData("message"),
			name:FindData("name"),
			email:FindData("email"),
			subject:FindData("subject")
		}},
		"subscription":function(){return{
			post:true,
			docId:"170q-TzTN7uita_7Jn8CS05DdU2VRjb4HRZYAOlf4AVE",
			sheetName:"Subscription",
			name:FindData("name"),
			email:FindData("address"),
			updates:FindData("updates"),
			message:FindData("message")
		}},
		"preorder":function(){return{
			post:true,
			docId:"170q-TzTN7uita_7Jn8CS05DdU2VRjb4HRZYAOlf4AVE",
			sheetName:"Order",
			type:"preorder",
			product:FindData("product"),
			price:FindData("price"),
			name:FindData("name"),
			email:FindData("email"),
			comment:FindData("answer"),
			// address:FindData("address"),
			// fiscalnumber:FindData("fiscalnumber"),
			// country:FindData("country"),
			// taxrate:FindData("taxrate")
		}},
		"purchase":function(){return{
			post:true,
			docId:"170q-TzTN7uita_7Jn8CS05DdU2VRjb4HRZYAOlf4AVE",
			sheetName:"Order",
			type:"purchase",
			product:FindData("product"),
			price:FindData("price"),
			name:FindData("name"),
			email:FindData("email"),
			comment:FindData("answer"),
			address:FindData("address"),
			fiscalnumber:FindData("fiscalnumber"),
			country:FindData("country"),
			taxrate:FindData("taxrate")
		}},
		"PGD_default":{
				post:true,
				docId:"158LEND9dCQF53UFvB5BEWjQmgm47PUv2jBXdr8W3xWc",
				sheetName:"PGD"
		},
		"PGD":function(){
			var data={};
		
			data.mode=FindData("mode");
			if(!data.mode)
				data.mode="";
		
			data["year-edit"]=String(Year());
		
			if(data.mode!=="edit"){
				function SetDataF(type){
					data[type]=FindData(type);
				}
			}
			else{
				var dc=Clone(RequestPGDSubmission['lastdata']);
				function SetDataF(type){
					var d=FindData(type);
					if(d!==data[type+"-consensus"])
						data[type+"-edit"]=d;
						data[type]=dc[type];
				}
			}
			['title','author','link','page','notes','year'].map(SetDataF);
		
			delete data['year'];
		
			return FuseObjects(data,Outflows("PGD_default"));
			},
		"won":function(){return{
			post:true,
			docId:"1y5KANZWMYJglC8v3VdUm-V__aiMe2q3zvRWNS3BI9IM",
			sheetName:"Won",
			rowStart:3,
			colStart:4,
			col:ObtainWonColumn(),
			identifier:PageIdentifier()
		}},
		"visit":function(){return{
			post:true,
			docId:"1y5KANZWMYJglC8v3VdUm-V__aiMe2q3zvRWNS3BI9IM",
			rowStart:3,
			sheetName:"Visit",
			identifier:PageIdentifier(),
			uid:navigator.userAgent||UserId()
		}},
		"country":function(){return{
			post:true,
			docId:"1y5KANZWMYJglC8v3VdUm-V__aiMe2q3zvRWNS3BI9IM",
			rowStart:3,
			sheetName:"Country",
			identifier:UserCountry(),
			uid:navigator.userAgent||UserId()
		}},
		"hall-of-fame-global":function(){return{
			post:true,
			docId:"1UiBHdCU_JBJNyDZCVdbxYBHn5jbORfKwSexNixeyu0w",
			sheetName:"Hall-of-Fame-Global",
			rowStart:3,
			identifier:GameTitle(),
			name:FindData("name")
		}},
	};
	if(name)
		return Evaluate(flows[name]);
	else
		return flows;
}




//////////////////////////////////////////////////////////////////////
//Hall of Fame

var ConsoleExternal=function(){return PageIdentifier()==="game-console"};


RequestHallOfFame=function(){
	if(LocalStorage("hall-of-fame")===true)
		return RequestWinnerMessage();

	var awaitwinner=true;

	if(ConsoleExternal())
		RequestDataPack([
		['alias',{
			questionname:"Enter the Global Hall of Fame:",
			qplaceholder:"Your name or alias",
			qrequired:true,
			qerrorcustom:"The Hall of Fame's guards ask for at least 2 alphanumerics!"}
		]],
		{
			destination:"hall-of-fame-global",
			qonsubmit:SuccessF
		});
	else
		RequestDataPack([
	['alias',{
		questionname:"Enter the Hall of Fame:",
		qplaceholder:"Your name or alias",
		qrequired:true,
		qerrorcustom:"The Hall of Fame's guards ask for at least 2 alphanumerics!"}
	]],
	{
		destination:"hall-of-fame",
		qonclose:function(){
			if(awaitwinner){
				awaitwinner=false;
				RequestWinnerMessage();
				//console.log(1);
			}
			
		},
		qonsubmit:function(){
			if(awaitwinner){
				awaitwinner=false;
				RequestWinnerMessage();
				//console.log(2);
			}				
			LocalStorage("hall-of-fame",true);
		}
	});
}

RequestWinnerMessage=function(){
	if(LocalStorage("winner-message")===true)
		return;
	
	function DestinationChoice(choice){
		if(choice==="Public message in Guestbook")
			return "guestbook";
		else
			return "feedback";
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
		qonsubmit:function(){
			LocalStorage("winner-message",true);
			GameFocus();
		},
		findDestination:function(DP){return DestinationChoice(FindData("whence",DP.qid));}
	}
	);
}


//////////////////////////////////////////////////////
// Real time Feedback Requests

RequestGameFeedback=function(){

	if(!RequestGameFeedback.requests)
		RequestGameFeedback.requests=[];
	  
	function RecordAndLaunchThanksBalloon(DP){
		RequestGameFeedback.requests.push(CurrentScreen());
		LaunchConsoleThanks(DP);
		FocusAndResetFunction(RequestGameFeedback,GameFocus)();};
	
	var DPsettingsObj={
		qtargetid:ParentSelector(gameSelector),
		qdisplay:LaunchBalloon,
		qonsubmit:RecordAndLaunchThanksBalloon,
		qonclose:FocusAndResetFunction(RequestGameFeedback,GameFocus),
		shortcutExtras:FuseObjects(ObtainKeyActionsGameBar?ObtainKeyActionsGameBar():{},{"E":CloseFeedback}),
		thanksmessage:"★ Thank you for your feedback! ★",
		buttonSelector:"FeedbackButton",
		shortcutTarget:"FeedbackWindow"
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

CloseFeedback=function(){
	if(CurrentDatapack().buttonSelector==="FeedbackButton")
		CloseCurrentDatapack();
	GameFocus();
}

PrintGameState=function(){
	return GetElement("gameCanvas").toDataURL();
}

///////////////////////////////////////////////////////////////////////////////
// Guestbook & Comments

RequestGuestbook=function(){
	RequestDataPack([
		['answer',{
			questionname:"Your message",
			thanksmessage:"Thank you for your message in the Guestbook!"}],
		['alias',{}]
	],{
		destination:'guestbook'
		}
	)
}

RequestMessageReply=function(nid,title){
	RequestMessageReply.currentid=nid;
	RequestMessageReply.title=title;
	RequestDataPack([
		['answer',{
			questionname:"Your polite reply",
			qplaceholder:"I concur/beg to differ ...",
			thanksmessage:"Your reply has been posted! Thank you."}],
		['alias',{}]
	],{
		destination:'guestbook'
		}
	)
}




//////////////////////////////////////////////////////////////////////
//Subscribe

OpenModalSubscribe=function(){
	RequestDataPack([
		['exclusivechoice',{
			qfield:"updates",
			questionname:"Be the first to know about Pedro PSI's next project!",
			qchoices:["New games only","All projects"]
		}],
		['email',{}],
		['name',{}]
	],
		{destination:'subscription',
		thanksmessage:"Thank you for subscribing!"
		}
	)
}

//////////////////////////////////////////////////////////////////////
//Order

OpenModalPreOrder=function(campaigntext){
	RequestDataPack([
		['email',{questionname:campaigntext}]],{
			destination:'preorder',
			thanksmessage:"Your booking was placed. Thank you!"
		});
}


//////////////////////////////////////////////////////////////////////
//PWA Install

RequestPWAInstall=function(){
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

InstallPWAMaybe=function(choice,id){
	if(choice==="Yes, please!"){
		if(!PWAInstallAsk.event.prompt){
			ConsoleAdd("Sorry, your browser is unable to ask for PWA installation - reporting back to Pedro PSI...");
			RegisterPWA('BrowserCannot');
		}
		else{
			PWAInstallAsk.event.prompt();
			PWAInstallAsk.event.userChoice.then(function(choiceResult){
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

PWAInstallAsk=function(ev){
	PWAInstallAsk.event=ev;
	if(!In(PageSearch("source"),"homescreen"))
		RequestPWAInstall();
}

PWAInstallConfirm=function(ev){
	ConsoleAddMany([
		PageTitle()+" added to the homescreen.",
		"To enable offline access, please refresh the App once, so all files be cached.",
		"Enjoy!"
	]);
}


//////////////////////////////////////////////////////////////////////
//Password

function RequestProductKey(SuccessF){
	RequestDataPack([
		['password',{
			questionname:"Your purchased product key"
		}],
		],{
			actionText:'Verify',
			actionvalid:function(){SubmitPassword(SuccessF)},
			thanksmessage:"Key submitted! Verifying..."
		}
	)
}

function SubmitPassword(SuccessF){
	function VerifyPassword(data){
		var d=JSON.parse(data);
		if(d.length<1)
			return ConsoleAdd("Invalid key. Retry?");
		else{
			SuccessF(d);
		}
	}

	LoadData(MacroURL(Inflows('secret'))+"&key="+FindData("password"),VerifyPassword);
}

//////////////////////////////////////////////////////////////////////
// Editor

if(PageIdentifier()==="game-editor"){

	StopCapturingKeys(ComboKeyPressHandler);//bug
	
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

RequestPGDSubmission=function(editData,editmode){
	if(editData){
		if(IsString(editData))
			editData=Memory(editData);// game hook
	
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

RequestContact=function(){
	var DFOpts=[
		['answer',{
			qfield:"message",
			questionname:"Your message"
		}],
		['email',{
			qfield:"email",
			questionname:"Your email address",
			qrequired:false,
			qplaceholder:'opti@n.al'
		}],
		['shortanswer',{
			qfield:"name",
			questionname:"Your name",
			// questioninfo:"Optional as well.",
			qrequired:false,
			qplaceholder:'Op. Tiona Laswell'
		}]
		// ['exclusivechoice',{
		// 	questionname:"Message Subject",
		// 	qfield:"subject",
		// 	qchoices:["Common goals","Help request","Problem or bug","Praise & criticism","Advertising","Other"],
		// 	executeChoice:function(choice,id){
		// 		SetData("subject",choice,id);
		// 	}
		// }]
	];
	RequestDataPack(DFOpts,{
		destination:"contact",
		qtargetid:"contact-request",
		qdisplay:LaunchEmbed,
		closeonblur:false,
		thanksmessage:"★ Thank you. Please await your reply! ★"
	});
}



////////////////////////////////////////////////////////////////////////////////
// Night Mode

StartNightMode=function(){
	if(Memory("nightmode")===null){
		//if(window.matchMedia('(prefers-color-scheme: dark)').matches)
		//	ActivateNightMode();
		//else
			UnActivateNightMode();
	}
	else if(Memory("nightmode"))
		ActivateNightMode();
	else
		UnActivateNightMode();
}

ActivateNightMode=function(){
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

UnActivateNightMode=function(){
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

ToggleNightMode=function(){
	if(Memory("nightmode"))
		UnActivateNightMode();
	else
		ActivateNightMode();
}


///////////////////////////////////////////////////////////////////////////////
// Debug tools

RequestDebugger=function(){
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
		closeonblur:false,
		actionText:'Evaluate',
		action:DebuggerEvaluate,
		requireConnection:false
		}
	)
}

DebuggerEvaluate=function(){
	try{
		var result=window.eval(FindData('code'));
		ConsoleAdd(String(result));
	}catch(err){
		ConsoleAdd(String(err));
	}
}

//////////////////////////////////////////////////////////////////////
Shout("intercom")
