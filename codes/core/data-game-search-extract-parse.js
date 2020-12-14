function ExtractColumns(titles,headers){//tiles: the column to extract; headers: heades to identify the table
	var titles=IsString(titles)?[titles]:titles;
	var table=GetTable(headers||titles);
		RemoveElements("sup",table);
		return titles.map(title=>GetColumn(table,title));
}

function GetTable(titles){
	var titles=IsString(titles)?[titles]:titles;
	var table=GetElements("table").filter(t=>GetElements("th",t).some(e=>titles.every(title=>In(e.innerText.toLowerCase(),title.toLowerCase()))));
	return First(table);
};


function GetColumn(table,title){
	var col=GetElements("th",table).map((td,i)=>In(td.innerHTML.toLowerCase(),title.toLowerCase())?i:false).filter(x=>x!==false)[0];
	return GetElements("tr",table).map(tr=>GetElements("td",tr)[col]).filter(Identity).map(e=>e.innerText);
}

function LoadClearPage(link){
	LoadData(link,function(x){
		RemoveElements("div");
		AddElement(x,"body");})
}