InString=function(string,n){
	var s=string;
	return n===""||s.replace(n,"")!==string;
}

Today=function(){return new Date()};

Year=function(date){
	var date=date||Today();
	return date.getFullYear();
}

ReadGameData=function(){
	var data=false;
	if(InString(document.URL,"itch.io")){
		var T=document.getElementsByTagName("TITLE")[0].innerHTML;
		data={
		"title":T.replace(/\sby\s.*/,""),
		"author":T.replace(/.*\sby\s/,""),
		"link":document.URL,
		"page":document.URL.replace(/itch.io\/.*/,"itch.io")
		};
	}else if(InString(document.URL,"gist.github.com")){
		var D=Array.from(document.querySelectorAll(".js-file-line")).map(function(x){return x.innerHTML});
		var T=D.filter(function(l){return /title/i.test(l)})[0].replace(/title\s*/i,"");
		var A=D.filter(function(l){return /author/i.test(l)});
		var P=D.filter(function(l){return /homepage/i.test(l)});
		
		var id=document.URL.replace(/.*gist\.github\.com\/.*\//,"");
				
		if(P.length>0)
			P=P[0].replace(/homepage\s*/i,"");
		else
			var P=document.URL.replace(id,"");
				
		if(A.length>0)
			A=A[0].replace(/author\s*/i,"");
		else
			A=P.replace(/.*gist\.github\.com/,"").replace(/\//g,"");
		
		document.getElementsByTagName("TITLE")[0].innerHTML;
		data={
		"title":T,
		"author":A,
		"link":"https://www.puzzlescript.net/play.html?p="+id,
		"page":P
		};
	}else if(InString(document.URL,"increpare.com")){
		var T=document.getElementsByTagName("TITLE")[0].innerHTML;
		data={
		"title":T.replace(/\s\-\s.*/,""),
		"author":"Stephen Lavelle",
		"link":document.URL,
		"page":"https://increpare.com/"
		};
	}else if(InString(document.URL,"pedropsi.github.io/game-console")&&InString(document.URL,"game=")){
		if(state&&state.metadata){
			data={
			"title":state.metadata.title,
			"author":state.metadata.author,
			"link":"https://www.puzzlescript.net/play.html?p="+document.URL.replace(/.*game\=/,"").replace(/\#.*/,""),
			"page":state.metadata.homepage?state.metadata.homepage:""
			};
		}
	}else{
		
		var link=document.URL;
		if(InString(link,"hack")&&InString(link,"puzzlescript"))
			link=link.replace("hack=","p=").replace("editor.html","play.html");
		
		if(state&&state.metadata){
			data={
			"title":state.metadata.title,
			"author":state.metadata.author,
			"link":link,
			"page":state.metadata.homepage?state.metadata.homepage:""
			};
		}
	}

	data["year-edit"]=String(Year());
	data["is-duplicate"]="example";
	return data;
};

function SubmitGameData(){
	var data=ReadGameData();

	if(data){
		data.post=true;
		data.docId="158LEND9dCQF53UFvB5BEWjQmgm47PUv2jBXdr8W3xWc";
		data.sheetName="PGD";
	
		LoadDataFromNetwork(MacroURL(data),Identity);
		alert("Game "+data.title+" by "+data.author+" submitted, if not already!");
	}
	else
		alert("Sorry, no game could be found in this page. Please tell Pedro PSI whether this is an error.");
}

//

MacroURL=function(parameters){
	return MacroBareURL("AKfycbyvKrxqk9mHkpmVqsmHN0y2jO-8x40zurf4tdS7p2H-KExfnvM",parameters);
}

MacroBareURL=function(c,parametersObject){
	var p="";
	if(parametersObject)
		p=ParameterString(parametersObject);
	if(p)
		p="?"+p;
	return "https://script.google.com/macros/s/"+c+"/exec"+p;
};

ParameterPairString=function(key,value){
	return encodeURIComponent(key)+'='+encodeURIComponent(value);
}

ThreadKeysValues=function(Obj,KeyValuer){
	return Keys(Obj).map(k=>KeyValuer(k,Obj[k]));
}

ParameterString=function(parametersObject){
	return ThreadKeysValues(parametersObject,ParameterPairString).join("&");
}

Keys=function(Obj){
	return Object.keys(Obj)||[];
};

Identity=function(a){return a;}

LoadDataFromNetwork=function(url,SuccessF,header,FailureF){
	var FailureF=FailureF||Identity;
	var rawFile=new XMLHttpRequest();
	rawFile.open("GET",url,true);
	rawFile.onreadystatechange=function(){
		if(rawFile.readyState===4){
			if(rawFile.status===404){
				console.log("Nothing found at: ",url,", not necessarily an error!");
				FailureF();
			}
			else if(rawFile.status===200||rawFile.status==0){
				var data=rawFile.responseText;
				if(data===""){
					console.log("No data received from: ",url,". Connection problems?");
					FailureF();
				}
				else{
					Memory(url,rawFile.responseText,Today());
					SuccessF(data);
				}
			}
		}
	}
	if(header)
		rawFile.setRequestHeader("Content-type", header);
	rawFile.send(null);
};

SubmitGameData();