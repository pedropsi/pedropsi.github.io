////////////////////////////////////////////////////////////////////////////////
// Intro animation

var LOGO=`<?xml version="1.0"?>
<svg viewBox="-16 -16 32 32" xmlns="http://www.w3.org/2000/svg" width=100 height=100>
	<rect x="-5" y="-5" width="10" height="10" class="darkblue"		fill="#070070"></rect>
	<rect x="-5" y="-5" width="10" height="10" class="darkblue"		fill="#070070" transform="rotate(45)"></rect>
	<rect x="-5" y="-5" width="10" height="10" class="blue"			fill="#000fff" transform="scale(0.765367) rotate(22.5)"></rect>
	<rect x="-5" y="-5" width="10" height="10" class="blue"			fill="#000fff" transform="scale(0.765367) rotate(67.5)"></rect>
	<rect x="-5" y="-5" width="10" height="10" class="lightblue"	fill="#1982ed" transform="scale(0.585786) rotate(0)"></rect>
	<rect x="-5" y="-5" width="10" height="10" class="lightblue"	fill="#1982ed" transform="scale(0.585786) rotate(45)"></rect>
	<rect x="-5" y="-5" width="10" height="10" class="turquoise"	fill="#3bf8de" transform="scale(0.448342) rotate(22.5)"></rect>
	<rect x="-5" y="-5" width="10" height="10" class="turquoise"	fill="#3bf8de" transform="scale(0.448342) rotate(67.5)"></rect>
	<rect x="-5" y="-5" width="10" height="10" class="green"		fill="#46f46f" transform="scale(0.343146) rotate(0)"></rect>
	<rect x="-5" y="-5" width="10" height="10" class="green"		fill="#46f46f" transform="scale(0.343146) rotate(45)"></rect>
	<rect x="-5" y="-5" width="10" height="10" class="yellow"		fill="#f0f8af" transform="scale(0.262632) rotate(22.5)"></rect>
	<rect x="-5" y="-5" width="10" height="10" class="yellow"		fill="#f0f8af" transform="scale(0.262632) rotate(67.5)"></rect>
	<rect x="-5" y="-5" width="10" height="10" class="lightyellow"	fill="#fff9c9" transform="scale(0.201010) rotate(0)"></rect>
	<rect x="-5" y="-5" width="10" height="10" class="lightyellow"	fill="#fff9c9" transform="scale(0.201010) rotate(45)"></rect>
</svg>`;

var NAME="Pedro PSI";
var LOGONAME=`
<div class="logoname-supra">
<div class="logoname">
	<div class="lightyellow">${NAME}</div>
	<div class="yellow">${NAME}</div>
	<div class="green">${NAME}</div>
	<div class="turquoise">${NAME}</div>
	<div class="lightblue">${NAME}</div>
	<div class="blue">${NAME}</div>
	<div class="darkblue">${NAME}</div>
</div></div>`;
	
function PlayIntro(){
	RemoveChildren(".game");
	Class(".game","intro");
	GetElement(".game").innerHTML=LOGO;
	AddElement(LOGONAME,".game");
}
