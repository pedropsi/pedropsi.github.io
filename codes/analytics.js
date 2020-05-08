////////////////////////////////////////////////////////////////////////////////
// Analytics and Actions
var analyticsURL="https://script.google.com/macros/s/AKfycbwuyyGb7XP7H91GH_8tZrXh6y_fjbZg4vSxl6S8xvAAEdyoIHcS/exec";
var dataHeaders={
	"analytics":	"[\"identifier\",\"language\",\"timezone\",\"screen\",\"agent\",\"from\",\"campaign\",\"name\"]",
	"actions":		"[\"identifier\",\"type\",\"target\",\"name\"]",
	"status":		"[\"identifier\",\"agent\",\"errors\",\"name\"]"
}

DataUnitHeaders=function(){
	return {
		formGoogleSendEmail:"",
		"identifier":PageIdentifier(),
		"name":UserId()
	};		
}

DataUnit=function(datatype){
	var type=datatype.toLowerCase();
	var headers=dataHeaders[type];
	if(headers)
		return FuseObjects(DataUnitHeaders(),{
			formDataNameOrder:headers,
			formGoogleSheetName:type
			});
}

 function FingerprintOpen(){
	var data=DataUnit("Analytics");
	
	var referrer=document.referrer;
	
	var source=PageSearch("source");
		source=source?source:PageFragment();
	
	return FuseObjects(data,{
		"language":LangUpperCase(window.navigator.language),
		"timezone":Date(),
		"screen":[	window.screen.height,
					window.screen.width,
					window.screen.colorDepth].join("x"),
		"agent":window.navigator.userAgent,
		"from":InnerLinked(referrer)?PageIdentifier(referrer):referrer,
		"campaign":source?source:"none"
		});		
}

LangUpperCase=function(s){
	var pos=s.replace(/(.*-)/,"").replace(s,"");
	var pre=s.replace(/(-.*)/,"").replace(s,"");
	return pos.length?(pre+"-"+pos.toUpperCase()):s
};

UserLanguageCountryCode=function(){
	return window.navigator.language.replace(/(.*-)/,"").toUpperCase();
}

UserCountry=function(){
	var code=UserLanguageCountryCode();
	if(In(CodeCountry(),code))
		return CodeCountry()[code];
	else 
		return window.navigator.language;//fallback to analise
}

FingerprintAction=function(type,target){
	var data=DataUnit("Actions");
	return FuseObjects(data,{
		"target":target,
		"type":type
	});
}

FingerprintLink=function(ref){
	var p=PageIdentifier(ref);
	if(p==="game-console")
		p=p+"?game="+PageSearch("game",ref);
	
	return FingerprintAction(
		InnerLinked(ref)?"InLink":"OutLink",
		InnerLinked(ref)?p:ref
	)
}

FingerprintStatus=function(error){
	var data=DataUnit("Status");
	return FuseObjects(data,{
		"errors":error,
		"agent":window.navigator.userAgent
	});
}

// Echoes
 
EchoAnalytics=function(data){
	if(AnalyticsAllowed())
		EchoData(data,analyticsURL);
}
 
RegisterOpen=function(){
	//EchoAnalytics(FingerprintOpen());
	EchoData(Outflows("visit"));
	EchoData(Outflows("country"));
}
RegisterLink=function(l){
	EchoAnalytics(FingerprintLink(l));
};
RegisterElementClicked=function(b){
	EchoAnalytics(FingerprintAction("Click",b.innerText));
}
RegisterMosaicToggled=function(b){ //Mosaic change
	EchoAnalytics(FingerprintAction("BG toggle","---"));
}
RegisterNightModeToggled=function(b){
	EchoAnalytics(FingerprintAction("NM toggle",b.innerText));
}

RegisterPWA=function(status){
	EchoAnalytics(FingerprintAction("PWA Prompt",status));
}

RegisterStatus=function(errordata){
	EchoAnalytics(FingerprintStatus(JSON.stringify(errordata)));
}

////////////////////////////////////////////////////////////////////////////////
// Links Management

MapLinks=function(f){
	GetElements("a").map(f);
}

OutLinks=function(){
	function PrepareLink(l){
		var ref=l.href;
		if(OuterLinked(ref)){
			l.setAttribute("target","_blank");};
		l.addEventListener("mousedown", (function(){RegisterLink(ref)}),false);
	};
	MapLinks(PrepareLink);
};

////////////////////////////////////////////////////////////////////////////////
// Link reformatting
/*
AnonimiseLinks=function(){
	function PrepareLink(l){
		var ref=l.href;
		if(InnerLinked(ref))
			l.href= PageUnFragment(ref)+"#"+clearance;
		};
	MapLinks(PrepareLink);
}
 
AbsolutiseLinks=function(){
	function PrepareLink(l){
		var ref=l.href;
		console.log("ABS!",ref);
		if(AbsolutableLinked(ref))
			l.href=PageAbsolute(PageUnTag(ref));
		};
	MapLinks(PrepareLink);
}



////////////////////////////////////////////////////////////////////////////////
// Analytics: custom actions

ElementClicked=function(b){Listen("click", function(){RegisterElementClicked(this)},b); return b};
MosaicToggled=function(b){Listen("click", function(){RegisterMosaicToggled(this)},b); return b};
NightModeToggled=function(b){Listen("click", function(){RegisterNightModeToggled(this)},b); return b};


///////////////////////////////////////////////////////////////////////////////
// Analytics Behaviour


AnalyticsAllowed=StatusReporter(
	"AnalyticsAllowed",
	function(){return !PageSearch("test")&&!PageSearch("debug")&&!LocalLinked()}
)

AnalyticsStart=function(){
	DisplayViewCounter();
	if(AnalyticsAllowed()){
		RegisterOpen();
		//setTimeout(3000,DisplayViewCounter);//Update with own number
		GetElements(".button").map(ElementClicked);
		GetElements(".mosaic").map(MosaicToggled);
		GetElements("#NightMode").map(NightModeToggled);
		OutLinks();
	}
	else{
	////AnonimiseLinks();
	};
}

//////////////////////////////////////////////////////////////////////
//View Counter

DisplayViewCounter=function(){
	var url=MacroURL(Inflows("visit"));
	LoadData(url,DeployViewCounter);
}

DeployViewCounter=function(viewdata){
	var viewdata=JSON.parse(viewdata);
		viewdata=viewdata.filter(function(pair){return pair[0]===PageIdentifier()});
	
	if(!viewdata.length)
		viewdata=0;
	else
		viewdata=viewdata[0][1];
	
	DynamicText("view-counter",ObtainSymbol("eye")+"\n"+viewdata+" (analytics are "+TogglerButtonHTML("AnalyticsAllowed")+")");
}

//////////////////////////////////////////////////////////////////////
// Country Counter and World map

CodeCountry=function(){
	return {
"AD":"Andorra",
"AE":"United Arab Emirates",
"AF":"Afghanistan",
"AG":"Antigua and Barbuda",
"AI":"Anguilla",
"AL":"Albania",
"AM":"Armenia",
"AO":"Angola",
"AQ":"Antarctica",
"AR":"Argentina",
"AS":"American Samoa",
"AT":"Austria",
"AU":"Australia",
"AW":"Aruba",
"AX":"Åland Islands",
"AZ":"Azerbaijan",
"BA":"Bosnia and Herzegovina",
"BB":"Barbados",
"BD":"Bangladesh",
"BE":"Belgium",
"BF":"Burkina Faso",
"BG":"Bulgaria",
"BH":"Bahrain",
"BI":"Burundi",
"BJ":"Benin",
"BL":"Saint Barthélemy",
"BM":"Bermuda",
"BN":"Brunei Darussalam",
"BO":"Bolivia",
"BQ":"Bonaire, Sint Eustatius and Saba",
"BR":"Brazil",
"BS":"Bahamas",
"BT":"Bhutan",
"BV":"Bouvet Island",
"BW":"Botswana",
"BY":"Belarus",
"BZ":"Belize",
"CA":"Canada",
"CC":"Cocos Islands",
"CD":"Democratic Republic of the Congo",
"CF":"Central African Republic",
"CG":"Republic of the Congo",
"CH":"Switzerland",
"CI":"Côte d'Ivoire",
"CK":"Cook Islands",
"CL":"Chile",
"CM":"Cameroon",
"CN":"China",
"CO":"Colombia",
"CR":"Costa Rica",
"CU":"Cuba",
"CV":"Cabo Verde",
"CW":"Curaçao",
"CX":"Christmas Island",
"CY":"Cyprus",
"CZ":"Czech Republic",
"DE":"Germany",
"DJ":"Djibouti",
"DK":"Denmark",
"DM":"Dominica",
"DO":"Dominican Republic",
"DZ":"Algeria",
"EC":"Ecuador",
"EE":"Estonia",
"EG":"Egypt",
"EH":"Western Sahara",
"ER":"Eritrea",
"ES":"Spain",
"ET":"Ethiopia",
"FI":"Finland",
"FJ":"Fiji",
"FK":"Falkland Islands",
"FM":"Micronesia",
"FO":"Faroe Islands",
"FR":"France",
"GA":"Gabon",
"GB":"United Kingdom",
"GD":"Grenada",
"GE":"Georgia",
"GF":"French Guiana",
"GG":"Guernsey",
"GH":"Ghana",
"GI":"Gibraltar",
"GL":"Greenland",
"GM":"Gambia",
"GN":"Guinea",
"GP":"Guadeloupe",
"GQ":"Equatorial Guinea",
"GR":"Greece",
"GS":"South Georgia and the South Sandwich Islands",
"GT":"Guatemala",
"GU":"Guam",
"GW":"Guinea-Bissau",
"GY":"Guyana",
"HK":"Hong Kong",
"HM":"Heard Island and McDonald Islands",
"HN":"Honduras",
"HR":"Croatia",
"HT":"Haiti",
"HU":"Hungary",
"ID":"Indonesia",
"IE":"Ireland",
"IL":"Israel",
"IM":"Isle of Man",
"IN":"India",
"IO":"British Indian Ocean Territory",
"IQ":"Iraq",
"IR":"Iran",
"IS":"Iceland",
"IT":"Italy",
"JE":"Jersey",
"JM":"Jamaica",
"JO":"Jordan",
"JP":"Japan",
"KE":"Kenya",
"KG":"Kyrgyzstan",
"KH":"Cambodia",
"KI":"Kiribati",
"KM":"Comoros",
"KN":"Saint Kitts and Nevis",
"KP":"North Korea",
"KR":"South Korea",
"KW":"Kuwait",
"KY":"Cayman Islands",
"KZ":"Kazakhstan",
"LA":"Laos",
"LB":"Lebanon",
"LC":"Saint Lucia",
"LI":"Liechtenstein",
"LK":"Sri Lanka",
"LR":"Liberia",
"LS":"Lesotho",
"LT":"Lithuania",
"LU":"Luxembourg",
"LV":"Latvia",
"LY":"Libya",
"MA":"Morocco",
"MC":"Monaco",
"MD":"Moldova",
"ME":"Montenegro",
"MF":"Saint Martin",
"MG":"Madagascar",
"MH":"Marshall Islands",
"MK":"Republic of North Macedonia",
"ML":"Mali",
"MM":"Myanmar",
"MN":"Mongolia",
"MO":"Macao",
"MP":"Northern Mariana Islands",
"MQ":"Martinique",
"MR":"Mauritania",
"MS":"Montserrat",
"MT":"Malta",
"MU":"Mauritius",
"MV":"Maldives",
"MW":"Malawi",
"MX":"Mexico",
"MY":"Malaysia",
"MZ":"Mozambique",
"NA":"Namibia",
"NC":"New Caledonia",
"NE":"Niger",
"NF":"Norfolk Island",
"NG":"Nigeria",
"NI":"Nicaragua",
"NL":"Netherlands",
"NO":"Norway",
"NP":"Nepal",
"NR":"Nauru",
"NU":"Niue",
"NZ":"New Zealand",
"OM":"Oman",
"PA":"Panama",
"PE":"Peru",
"PF":"French Polynesia",
"PG":"Papua New Guinea",
"PH":"Philippines",
"PK":"Pakistan",
"PL":"Poland",
"PM":"Saint Pierre and Miquelon",
"PN":"Pitcairn",
"PR":"Puerto Rico",
"PS":"Palestine",
"PT":"Portugal",
"PW":"Palau",
"PY":"Paraguay",
"QA":"Qatar",
"RE":"Réunion",
"RO":"Romania",
"RS":"Serbia",
"RU":"Russian Federation",
"RW":"Rwanda",
"SA":"Saudi Arabia",
"SB":"Solomon Islands",
"SC":"Seychelles",
"SD":"Sudan",
"SE":"Sweden",
"SG":"Singapore",
"SH":"Saint Helena, Ascension and Tristan da Cunha",
"SI":"Slovenia",
"SJ":"Svalbard and Jan Mayen",
"SK":"Slovakia",
"SL":"Sierra Leone",
"SM":"San Marino",
"SN":"Sénégal",
"SO":"Somalia",
"SR":"Suriname",
"SS":"South Sudan",
"ST":"Sao Tome and Principe",
"SV":"El Salvador",
"SX":"Sint Maarten",
"SY":"Syrian Arab Republic",
"SZ":"Eswatini",
"TC":"Turks and Caicos Islands",
"TD":"Chad",
"TF":"French Southern Territories",
"TG":"Togo",
"TH":"Thailand",
"TJ":"Tajikistan",
"TK":"Tokelau",
"TL":"Timor-Leste",
"TM":"Turkmenistan",
"TN":"Tunisia",
"TO":"Tonga",
"TR":"Turkey",
"TT":"Trinidad and Tobago",
"TV":"Tuvalu",
"TW":"Taiwan",
"TZ":"Tanzania",
"UA":"Ukraine",
"UG":"Uganda",
"UM":"United States Minor Outlying Islands",
"US":"United States of America",
"UY":"Uruguay",
"UZ":"Uzbekistan",
"VA":"Vatican",
"VC":"Saint Vincent and the Grenadines",
"VE":"Venezuela",
"VG":"British Virgin Islands",
"VI":"United States Virgin Islands",
"VN":"Vietnam",
"VU":"Vanuatu",
"WF":"Wallis and Futuna",
"WS":"Samoa",
"YE":"Yemen",
"YT":"Mayotte",
"ZA":"South Africa",
"ZM":"Zambia",
"ZW":"Zimbabwe"};
}

CountryCode=function(){
	return FlipKeysValues(CodeCountry());
}

//////////////////////////////////////////////////////////////////////

Shout("analytics")