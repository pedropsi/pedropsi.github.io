function UnRoman(s){
	return UnRomanMulti(s);
};

var uniNumerals={
	"M":1000,
	"D":500,
	"C":100,
	"L":50,
	"X":10,
	"V":5,
	"I":1,
	"":0
};

function UnRomanUni(s){
	return uniNumerals[s];
};

function UnRomanBi(n){
	return function(ss){return n+UnRomanMulti(ss)};
}

var biNumerals={
	"CM":900,
	"CD":400,
	"XC":90,
	"XL":40,
	"IX":9,
	"IV":4
}

function UnRomanMulti(s){
	if(s.length<=1)
		return UnRomanUni(s);
	
	var head=s.slice(0,2);
	var tail=s.slice(2,s.length);
	
	if(In(biNumerals,head))
		return UnRomanBi(biNumerals[head])(tail);
	else{
		head=s.slice(0,1);
		tail=s.slice(1,s.length);
		return UnRomanUni(head)+UnRomanMulti(tail);
	}
}

var numerals=Merge(uniNumerals,biNumerals);
var thresholdValues=Values(numerals).sort(function(a,b){return a<b?1:a>b?-1:0});
var	TN=FlipKeysValues(numerals);

function Roman(n,s){
	var s=s||"";
	var i=0;
	while(n<thresholdValues[i]&&i<thresholdValues.length){i++;}
	
	n=n-thresholdValues[i];
	s=s+TN[thresholdValues[i]];
	if(n>0)
		return Roman(n,s);
	else
		return s;
}

function ValidRoman(s){
	//Max out at MMMCMXCIX
	return UnRoman(s)<4000&&Roman(UnRoman(s))===s;
}

function LastValidRoman(s){
	var i=s.length-1;
	var r="";
	while(i>=0&&ValidRoman(s[i]+r)){
		r=s[i]+r;
		i--
	}
	return r;
}

function SplitValidRoman(s,r){
	var r=r||[];
	if(s==="")
		return r;
	
	var i=1;
	var last;
	while(i<=s.length&&ValidRoman(s.slice(0,i))){
		last=s.slice(0,i);
		i++;
	}
	
	if(last)
		r.push(last);
	
	if(i>s.length)
		return r;
	else
		return SplitValidRoman(s.slice(i-1,s.length),r);
}


////////////////////////////////////////////////////////////////////////////////
DefinedShout("data-game-roman")