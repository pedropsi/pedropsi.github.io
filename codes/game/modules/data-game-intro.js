////////////////////////////////////////////////////////////////////////////////
// Intro animation

var NAME="Pedro PSI";

var LOGONAME=`
<div class="logoname-supra faded">
<div class="logoname">
	<div class="lightyellow">${NAME}</div>
	<div class="yellow">${NAME}</div>
	<div class="green">${NAME}</div>
	<div class="turquoise">${NAME}</div>
	<div class="lightblue">${NAME}</div>
	<div class="blue">${NAME}</div>
	<div class="darkblue">${NAME}</div>
</div></div>`;

var LOGO=`
<div class="logo">
<?xml version="1.0"?>
<svg viewBox="-16 -16 32 32" xmlns="http://www.w3.org/2000/svg" width=100 height=100>
	<rect x="-5" y="-5" width="10" height="10" class="faded darkblue"		fill="#070070"></rect>
	<rect x="-5" y="-5" width="10" height="10" class="faded darkblue"		fill="#070070" transform="rotate(45)"></rect>
	<rect x="-5" y="-5" width="10" height="10" class="faded blue"			fill="#000fff" transform="scale(0.765367) rotate(22.5)"></rect>
	<rect x="-5" y="-5" width="10" height="10" class="faded blue"			fill="#000fff" transform="scale(0.765367) rotate(67.5)"></rect>
	<rect x="-5" y="-5" width="10" height="10" class="faded lightblue"	fill="#1982ed" transform="scale(0.585786) rotate(0)"></rect>
	<rect x="-5" y="-5" width="10" height="10" class="faded lightblue"	fill="#1982ed" transform="scale(0.585786) rotate(45)"></rect>
	<rect x="-5" y="-5" width="10" height="10" class="faded turquoise"	fill="#3bf8de" transform="scale(0.448342) rotate(22.5)"></rect>
	<rect x="-5" y="-5" width="10" height="10" class="faded turquoise"	fill="#3bf8de" transform="scale(0.448342) rotate(67.5)"></rect>
	<rect x="-5" y="-5" width="10" height="10" class="faded green"		fill="#46f46f" transform="scale(0.343146) rotate(0)"></rect>
	<rect x="-5" y="-5" width="10" height="10" class="faded green"		fill="#46f46f" transform="scale(0.343146) rotate(45)"></rect>
	<rect x="-5" y="-5" width="10" height="10" class="faded yellow"		fill="#f0f8af" transform="scale(0.262632) rotate(22.5)"></rect>
	<rect x="-5" y="-5" width="10" height="10" class="faded yellow"		fill="#f0f8af" transform="scale(0.262632) rotate(67.5)"></rect>
	<rect x="-5" y="-5" width="10" height="10" class="faded lightyellow"	fill="#fff9c9" transform="scale(0.201010) rotate(0)"></rect>
	<rect x="-5" y="-5" width="10" height="10" class="faded lightyellow"	fill="#fff9c9" transform="scale(0.201010) rotate(45)"></rect>
</svg>
</div>`;
	
function PlayIntro(targetIDsel,SuccessF){
	PlayIntro.save=Children(targetIDsel);
	Class(targetIDsel,"intro");
	OpenElement(LOGO,".intro");
	OpenElement(LOGONAME,".intro");
	setTimeout(function(){UnPlayIntro(targetIDsel,SuccessF)},2500)
}

function UnPlayIntro(targetIDsel,SuccessF){
	CloseElement(".logo",".intro");
	CloseElement(".logoname-supra",".intro");
	setTimeout(function(){
		UnClass(targetIDsel,"intro");
		PlayIntro.save.map(UnFadeElement);
		setTimeout(SuccessF,1000);
	},1000);
}

//Game Area
function GameFrameHTML(){
	return `
		<div class='game-supra-Canvas'>
			<div class='game' id='gameCanvas'>
			</div>
		</div>`;
}

function GameIntro(Callback){
	RemoveElement("game-supra-Canvas");
	PreAddElement(GameFrameHTML(),"BODY");
	HearElement(".game-supra-Canvas",()=>PlayIntro(".game",()=>Clickwall(Callback)));
}

function Clickwall(Callback){
	AddElement(`
		<div class="clickwall faded">
			<div class="circular">${ObtainSymbol("play")}</div>
			<p>Please turn on the sound ${ObtainSymbol("music")}.</p><p><b>Click anywhere to start!</b></p>
		</div>`,".game");
	UnFadeElement(".clickwall",500);
	function Start(){
		CloseElement(".game .clickwall",500);
		setTimeout(Callback,500)
	}
	AttendOnce("click",Start,".clickwall");
}

////////////////////////////////////////////////////////////////////////////////
Shout("data-game-intro");