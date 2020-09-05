////////////////////////////////////////////////////////////////////////////////
// Search Index Build

RegisterNgram=function(Ngrams,ngram,link){
	if(!ngram.length){
		var links=(Ngrams&&Ngrams.links)||[];
		if(links.indexOf(link)<0)
			links.push(link);
		return {...Ngrams,links:links};
	}

	var f=ngram[0];
	//Ngrams[f].links=(Ngrams[f].links||[]).concat(link);
	Ngrams[f]=RegisterNgram(Ngrams[f]||{},Rest(ngram),link);
	return Ngrams;
}

function BuildSearchTree(text,name,Ngrams){
	Ngrams=Ngrams||{};

	var text=text.replace(/(?:\n|\s|'|\\|\!\:\=\?\,\;\{\})+/ig," ");
	var l=text.length;
	var i=0;
	var n=3 //ngram length

	while(i<l-n){
		RegisterNgram(Ngrams,text.slice(i,i+n),name);
		i++;
	}

	return Ngrams;
}

function AppendSearchTree(text,name,Database){
	var Database=Database||{};
	if(!Database.links)
		Database.links=[];
	if(!In(Database.links,name))
		Database.links.push(name);
	var p=Database.links.indexOf(name);

	var Ngrams=Database.ngrams||{};
		Ngrams=BuildSearchTree(text,p,Ngrams);
		Database.ngrams=Ngrams;
	return Database;
}

////////////////////////////////////////////////////////////////////////////////
// Search Index Use

WordSearchPages=function(word,Database){
	var n=3;
	if(word.length<n)
		return [];
	var i=0;
	var trigrams=[];
	while(i<=word.length-n){
		trigrams.push(word.slice(i,i+n))
		i++
	}
	var links=trigrams.map(t=>AccessSearchTree(t,Database));
	return links.reduce(Intersection).map(n=>Database.links[n]);
}

AccessSearchTree=function(trigram,Database){
	var i=0;
	var links=Database.links;
	var Ngrams=Database.ngrams;
	var exit=false;
	while(i<trigram.length&&!exit){
		exit=!(Ngrams=Ngrams[trigram[i]]||false);	
		i++;
	}
	return Ngrams.links||[];
}