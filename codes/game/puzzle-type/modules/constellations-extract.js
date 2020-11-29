/* For pages like:"https://en.wikipedia.org/wiki/List_of_stars_in_Andromeda"*/
/*In: https://en.wikipedia.org/wiki/Lists_of_stars_by_constellation*/

var constellation=document.getElementById("firstHeading").textContent.replace("List of stars in ","");

function GetCell(i,j){
	return Array.from(Array.from(document.getElementsByTagName("tr"))[i].getElementsByTagName("td"))[j]
}

function RowNames(r){
	
	var name=r.querySelector("td").textContent;
	var cell=Array.from(r.querySelectorAll("td"));
	cell=cell[cell.length-1];

	return ParseNames(cell,name)
		
  }

function ParseNames(cell,name){
	var extranames=cell.childNodes[0];
	if(extranames.tagName)
		return "";
	extranames=extranames.textContent;
	extranames=extranames.replaceAll(/\(|\)|\&/g,", ").split(/\;/g);
   var descs=["binary","member","group","prototype","double","star","galaxy","variabl","naked ","has "," a "," of ","not ","system","component","amplitude","magnitude","suspected","nebula","dwarf","pulsar","cepheid","nova","supernova","x-ray","giant","cluster"," and ","nickname","metal-rich","near","prototy","moved","motion","discover","straggler","lmc","spectrum","point","mislabeled","often","exor","that","ellips","lacaille","candidate","sibling","smc",constellation];
    	extranames=extranames.filter(name=>!descs.some(d=>name.toLowerCase().replace(d,"")!==name.toLowerCase()||name!==name.replace(/\d|\(/g,"")));
                                                 
	extranames=extranames.join(",").split(",");
	extranames=extranames.map(name=>name.replaceAll(/(\s+$)|(^(\s|\=)+)/g,"")).filter(n=>n.length>1&&n.toLowerCase()!==n);
	
	return extranames.length?extranames.map(n=>`	'${n}':'${name}',`).join(`
`):'';
}

function PageRows(sup){
	if(!sup)
		Array.from(document.querySelectorAll("sup")).map(node=>node.remove());
	var rows=Array.from(document.querySelectorAll(".wikitable>tbody>tr"));
	/*Remove empty rows*/ rows=rows.filter(r=>r.querySelector("td").textContent!=="");
   return rows;
}

function ExtractStarAliases(){
  data=PageRows().map(RowNames);
  return `'${constellation}':{
${data.join(`
`).replace(/^\n+/,"").replace(/\n+/g,`
`).replace(/\,\s*$/g,``)}
},
`;}
  
function StarName(r){
	var name=r.querySelector("td").textContent;
	var cell=Array.from(r.querySelectorAll("td"));
	cell=cell[0].textContent.replaceAll(/\(|\).*/g,"");
	return `"${cell}"`;
}

function ExtractStarList(){
	data=PageRows(true).map(StarName);
	return `'${constellation}':[${data.join(`,`)}],
  `;}
  //ExtractStarAliases()

  ExtractStarList()