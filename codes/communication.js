///////////////////////////////////////////////////////////////////////////////
// Service workers

PageType=function(){
	return GetElements("meta").filter(function(m){return m.getAttribute("property")==="og:type";})[0].content;
}

ListDependencies=function(){
	
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

ServiceWorker=function(){
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

SWReadyCacheAdd=function(registration,files){
	registration.active.postMessage({command:'SelectiveCache',parameters:files});
	//console.log("Registered specific dependencies in SW cache:");
	//files.map(console.log);
};
ServiceWorkerCacheAddF=function(sourceArray){
	function SWDependencies(reg){
		SWReadyCacheAdd(reg,sourceArray);
	};
	return SWDependencies;
};


ServiceWorkerCache=function(sourceArray){
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
	while(Connection.queue.length>0){
		EchoPureData(Connection.queue[0][0],Connection.queue[0][1]);
		Connection.queue.shift();
	}
};

BufferData=function(data,url){
	Connection.queue.push([data,url]);
}

DataBufferEmpty=function(){
	return Connection.queue.length<1;
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

Connection=function(){
	if(!Connection.queue)
		Connection.queue=[];
	
	ListenOnce('offline',MonitorConnection);
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

TableLength=function(idSel){
	var target=GetElementIn("TBODY",idSel);
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
	if(tables.length>0)
		tables.map(DynamicTable);
	setTimeout(FilterSearchURL,200);
}


//Fetch table
LoadTableHTML=function(jsondata,RowF,headers){
	if(!jsondata)
		return;
	if(!RowF)
		var RowF=Identity;
	var rowArray=JSON.parse(jsondata).map(RowF);
	return TableHTML(PageTitle(),headers,rowArray);
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
	"PGD":{
		docId:"158LEND9dCQF53UFvB5BEWjQmgm47PUv2jBXdr8W3xWc",
		sheetName:"PGD",
		rowStart:8
	}
	};
	if(name)
		return UnFunction(flows[name]);
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
			identifier:PageTitle(),
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
			address:FindData("address"),
			fiscalnumber:FindData("fiscalnumber"),
			country:FindData("country"),
			taxrate:FindData("taxrate")
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
			col:HasCheckpointed()?CurCheckpointString():CurLevelNumber(),
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
		}}
	};
	if(name)
		return UnFunction(flows[name]);
	else
		return flows;
}




//////////////////////////////////////////////////////////////////////
//Hall of Fame

RequestHallOfFame=function(){
	if(ConsoleExternal())
		return;
	RequestDataPack([
	['alias',{
		questionname:"Enter the Hall of Fame:",
		qplaceholder:"Your name or alias",
		qrequired:true,
		qerrorcustom:"The Hall of Fame's guards ask for at least 2 alphanumerics!"}
	]],
	{
		destination:"hall-of-fame",
		qonclose:RequestModalWinnerMessage,
		qonsubmit:RequestModalWinnerMessage
	});
}

RequestModalWinnerMessage=function(previousDP){
	
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

RequestGameFeedback=function(){

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

RequestMessageReply=function(nid){
	RequestMessageReply.currentid=nid;
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
//Purchase

Purchased=function(){
	return (PageSearch("source")==="stripe"&&PageSearch("result")==="success");
};

PurchasedConfirm=function(){
	if(!Purchased())
		return;
	ConsoleAddMany([
		"Thank you for your purchase. Enjoy!",
		"Pedro PSI stands available to answer any questions you may have...",
		"...yet no hints will be provided!",
		"<b>Important: please bookmark this URL</b> - you'll need it to return to the game!"]);
};

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
Shout("communication")
