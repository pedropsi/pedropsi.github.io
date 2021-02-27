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
	
function PlayIntro(targetIDsel,SuccessF){
	var LOGO=`<div class="logo">${LogoSVG({rectclass:"faded",viewBox:"-16 -16 32 32"})}</div>`;
	PlaySound("media/Intro.mp3");
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
	PrependToElement(GameFrameHTML(),"BODY");
	HearElement(".game-supra-Canvas",()=>Clickwall(Callback));
}

function Clickwall(Callback){
	AppendToElement(`
		<div class="clickwall faded">
			<div class="circular">${Glyph("play")}</div>
			<p>Please turn on the sound ${Glyph("music")}.</p><p><b>Click anywhere to start!</b></p>
		</div>`,".game");
	UnFadeElement(".clickwall",500);
	function Start(){
		CloseElement(".game .clickwall",500);
		setTimeout(()=>PlayIntro(".game",Callback),1000);
		return true;
	}
	AttendOnce("click",Start,".clickwall");
}

////////////////////////////////////////////////////////////////////////////////
DefinedShout("data-game-intro");