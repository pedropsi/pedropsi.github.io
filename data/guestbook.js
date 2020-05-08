//////////////////////////////////////////////////
// Guestbook

DisplayGuestbook=function(){
	var url=MacroURL(Inflows("guestbook"));
	LoadData(url,DeployGuestbook);
}

DeployGuestbook=function(jsonstring){
	var gb=MakeGuestbook(jsonstring);
	var targetID="guestbook-area";
	ReplaceChildren(gb,targetID);
};


MakeGuestbook=function(jsonstring){
	var dataarray=JSON.parse(jsonstring);
	function MakeComment(dataline){
		if(dataline[0]===""||(dataline[1]!==PageTitle()&&PageTitle()!=="Guestbook")) 
			return "";
		var au=SafeString(dataline[2]);
		var id=SafeString(dataline[4]);
		var rid=NextReplyMessageId(id,dataarray); //may duplicate in high traffic times
		
		var b=ButtonOnClickHTML("Reply to "+au,'RequestMessageReply("'+rid+'")');
		var datereply="<div class='date'>"+SafeString(dataline[0])+b+"</div>";
		var c="<p class='quote'>"+SafeString(dataline[3])+"</p>";
		var a="<span class='author'>"+au+"</span>";
		var o="<span class='subject'>, on "+SafeString(dataline[1])+"</span>";
		
		var html="<div class='comment' data-id='"+id+"' data-depth='"+IdDepth(id)+"'><div>"+c+"<p>"+a+o+"</p></div>"+datereply+"</div>";
		return 	html;
	};
	return "<table><tbody>\n"+dataarray.sort(function(dl1,dl2){return CompareId(SafeString(dl1[4]),SafeString(dl2[4]))}).map(MakeComment).join("\n")+"</tbody></table>";
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