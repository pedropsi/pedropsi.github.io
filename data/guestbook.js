//////////////////////////////////////////////////
// Guestbook

LazyGuestbookLoad=function(){
	if(PageIdentifier()!=="guestbook")
		LazyLoader("guestbook-area",DisplayGuestbook);
	else
		DisplayGuestbook();
}

DisplayGuestbook=function(){
	var url=MacroURL(Inflows("guestbook"));
	LoadData(url,DeployGuestbook);
}

DeployGuestbook=function(jsonstring){
	var gb=GuestbookHTML(jsonstring);
	var targetID="guestbook-area";
	ReplaceChildren(gb,targetID);
};


CommentObject=function(dataline,dataarray){
	var Obj={};

	Obj.date=SafeString(dataline[0]);
	Obj.link=CMSAHTML(SafeString(dataline[1]||"guestbook"));
	Obj.author=SafeString(dataline[2]);
	Obj.quote=SafeString(dataline[3]);
	Obj.id=SafeString(dataline[4]);
	Obj.replyId=NextReplyMessageId(Obj.id,dataarray);
	Obj.title=CMSObject(SafeString(dataline[1]))
	if(Obj.title)
		Obj.title=UnFunction(Obj.title.TITLE);
	else
		Obj.title="Guestbook";

	console.log(Obj);
	return Obj;
};


CommentHTML=function(Obj){

	var b=ButtonOnClickHTML("Reply to "+Obj.author,'RequestMessageReply("'+Obj.replyId+'","'+Obj.title+'")');
	
	if(!Obj.quote)
		Obj.quote="...";

	return `<div class='comment' data-id='${Obj.id}' data-depth='${IdDepth(Obj.id)}'>
				<div>
					<p class='quote'>${Obj.quote}</p>
					<p>
						<span class='author'>${Obj.author}</span>, <span class='subject'>on ${Obj.link}</span>
					</p>
				</div>
				<div class='date'>
					${Obj.date}
					${b}
				</div>
			</div>`;
}

GuestbookHTML=function(jsonstring){
	var dataarray=JSON.parse(jsonstring);
		dataarray=dataarray.sort(CompareDatalineId);
	
	var CommHTML=function(dataline){
		if(!dataline||dataline[0]===""||(dataline[1]!==PageTitle()&&PageTitle()!=="Guestbook"))
			return "";
		return CommentHTML(CommentObject(dataline,dataarray))
	}

	return `<table>
				<tbody>
					${dataarray.map(CommHTML).join("\n")}
				</tbody>
			</table>`;
}

CompareDatalineId=function(dl1,dl2){
	return CompareId(SafeString(dl1[4]),SafeString(dl2[4]))
}

// Comment tree system
CompareId=function(a,b){
	if(a===b)
		return 0;
	else{
		var a1=UnAfterfix(a,"»");
		var b1=UnAfterfix(b,"»");
		
		if(a1!==b1)
			return Number(a1)<Number(b1)?1:-1;
		else if((ThreadId(a,a1)==="")||(ThreadId(b,b1)===""))
			return IdDepth(a)<IdDepth(b)?-1:1;
		else
			return CompareId(ThreadId(a,a1),ThreadId(b,b1));
	}
}

ThreadId=function(fullid,startid){return UnPrefix(UnPrefix(fullid,startid),"»")};
IdDepth=function(fullid){return String(fullid).split("»").length};
	
NextReplyMessageId=function(id,dataarray){
	//all comment ids
	var commentids=dataarray.map(function(dataline){return dataline[4]});
	//children comment ids (exactly depth + 1)
	function FollowingThreadIds(fullid){return ThreadId(fullid,id)};
	var childrenThreadIds=commentids.filter(function(fullid){return (ThreadId(fullid,id)!==fullid)&&(IdDepth(fullid)===(1+IdDepth(id)))});
	//+1 child comment;
	return id+"»"+String(childrenThreadIds.length+1);
}

Shout("guestbook")