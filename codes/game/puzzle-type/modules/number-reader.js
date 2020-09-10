var NumberPairs={
	"0":"zero",
	"1":"one",
	"2":"two",
	"3":"three",
	"4":"four",
	"5":"five",
	"6":"six",
	"7":"seven",
	"8":"eight",
	"9":"nine",
	"10":"ten",
	"11":"eleven",
	"12":"twelve",
	"13":"thirteen",
	"14":"fourteen",
	"15":"fifteen",
	"16":"sixteen",
	"17":"seventeen",
	"18":"eighteen",
	"19":"nineteen",
	"20":"twenty",
	"30":"thirty",
	"40":"fourty",
	"50":"fifty",
	"60":"sixty",
	"70":"seventy",
	"80":"eighty",
	"90":"ninety",
	"100":"hundred",
	"1000":"thousand",
	"1000000":"million",
	"1000000000":"billion",
	"1000000000000":"trillion",
	"1000000000000000":"quadrillion",
	"1000000000000000000":"quintillion" /*,
	"1000000000000000000000":"sexillion",
	"1000000000000000000000000":"septillion",
	"1000000000000000000000000000":"octillion",
	"1000000000000000000000000000000":"nonillion",
	"1000000000000000000000000000000000":"decillion",
	"1000000000000000000000000000000000000":"undecillion",
	"1000000000000000000000000000000000000000":"duodecillion",
	"1000000000000000000000000000000000000000000":"tredecillion",
	"1000000000000000000000000000000000000000000000":"quattuordecillion",
	"1000000000000000000000000000000000000000000000000":"quindecillion",
	"1000000000000000000000000000000000000000000000000000":"sexdecillion",
	"1000000000000000000000000000000000000000000000000000000":"septendecillion",
	"1000000000000000000000000000000000000000000000000000000000":"octodecillion",
	"1000000000000000000000000000000000000000000000000000000000000":"novemdecillion",
	"1000000000000000000000000000000000000000000000000000000000000000":"vingtillion",
	"10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000":"gogol"*/
};

NumberDigits=Keys(NumberPairs);

NumberPairsReversed={};
Keys(NumberPairs).map(function(d){
	NumberPairsReversed[NumberPairs[d]]=Number(d);
	NumberPairsReversed["minus"+NumberPairs[d]]=-Number(d);
});

NumberNames=Sorter(a=>Number(NumberPairsReversed[a]))(Keys(NumberPairsReversed));

function NameNumber(n){return NumberPairsReversed[n];}

function ReadPositiveNumber(n){

	var m=Number(n);
	
	if(In(NumberDigits,String(m)))
		return NumberPairs[n];
	
	var biggest=Number(NumberDigits[0]);
	var i=0;
	while(biggest<m&&i<NumberDigits.length-1){
		if(Number(NumberDigits[i])<m)
			biggest=Number(NumberDigits[i]);
		i++;
	}
	var times=Quotient(m,biggest);
	var remainder=Remainder(m,biggest);
	
	times=ReadPositiveNumber(times);
	
	return (times==="one"?"":times)+ReadPositiveNumber(biggest)+ReadPositiveNumber(remainder);
}

function ReadNumber(n){
	var m=Number(n);
	if(m>0)
		return ReadPositiveNumber(m);
	else if(m<0)
		return "minus"+ReadPositiveNumber(-m);
	else
		return "zero";
}


function Positions(string,pattern){
	var p=[];
	var s=string;
	while(In(s,pattern)){
		s=s.replace(pattern,"~"+Rest(pattern));
		p.push(s.indexOf("~"));
		s=s.replace("~","§");
	}
	return p;
}

function NumberPositions(name){
	var name=name.toLowerCase();
	var positions=[];
	
	NumberNames.map(function(n){return Positions(name,n).map(function(p){positions.push([n,p]);})});
	
	positions=Sorter(x=>First(x).length,Last)(positions);
	
	var i=0;
	while(i+1<positions.length){
		if(positions[i][1]===positions[i+1][1])
			positions[i]=null;
		i++;
	}
	
	positions=positions.filter(function(p){return p!==null});
	
	positionsduplicate=positions.map(function(p){
		if(Prefixed(p[0],"minus"))return [UnPrefix(p[0],"minus"),p[1]+5]}
	)//"minus" length is 5
		
	positions=Complement(positions,positionsduplicate);

	return Sorter(Last)(positions);
}

function NumberDivisions(text){
	var positions=NumberPositions(text);
	
	var divisions=[];
	
	var i=0;
	var prev=0;
	while(i+1<positions.length){
		if(positions[i][0].length+positions[i][1]<positions[i+1][1]){
			divisions.push(text.slice(prev,positions[i+1][1]));
			prev=positions[i+1][1];
		}
		i++;
	}
	divisions.push(text.slice(prev,text.length));
	return divisions;
}
	
function InterpretPositiveNumber(name){
	var digits=NumberPositions(name).map(function(p){return NameNumber(p[0])});
	var r=0;
	while(digits.length>1){
		if(digits[0]<digits[1]){
			digits[1]=digits[0]*digits[1];
			r=r*digits[1];
		}
		else
			r=r+digits[0];
		
		digits=Rest(digits);
	}
	return (r+Last(digits));
};

function InterpretNumber(name){
	if(Prefixed(name,"minus")){
		var name=UnPrefix(name,"minus");
		return -1*InterpretNumber(name);
	}
	else
		return InterpretPositiveNumber(name);
}

function FuseAdjacentNumberPositions(numberpositions,text){
	if(numberpositions.length<2)
		return numberpositions;

	var groups=[numberpositions[0]];
	var g=0;
	var interstart;
	var interend;
	for(var i=1;i<numberpositions.length;i++){
		interstart=numberpositions[i-1][1]+numberpositions[i-1][0].length;
		interend=numberpositions[i][1];
		if(text.slice(interstart,interend).replace(/\s*(and)?\s*/,"")==="")
			groups[g][0]=groups[g][0]+numberpositions[i][0]
		else{
			g=g+1;
			groups.push(numberpositions[i])
		}
	}
	return groups;
}

function InflateNumber(text){
	var text=text.replace(/negative/g,"minus").replace(/minusminus/g,"").replace(/positive/g,"").replace(/plus/g,"");//synonyms

	var numberpositions=NumberPositions(text);
		numberpositions=FuseAdjacentNumberPositions(numberpositions,text);

	var numberstring=NumberPositions(text).map(function(p){return p[0]}).join("");
	
	if(numberstring==="")
		return text;
	else{
		return text.replace(numberstring,ReadNumber(InterpretNumber(numberstring)+1));
	}
}

function InflateNumbers(text){
	return NumberDivisions(text).map(InflateNumber).join("");
}
