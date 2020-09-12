// function WinPaneHTML(){
// 	return `<div class='winpane'></div>`;
// }

// var WinTexts={
// 	"Direct":"Good!",				
// 	"Reverse":".iceN",
// 	"Follow":"Go on!",
// 	"Consonant":"C_NGR_TS!",
// 	"Second":"Well done. Well done.",
// 	"Rotate":"Ecxeellnt",
// 	//"Oppose":???,
// 	"Rise":"Sky-high.",
// 	"Falls":"Refreshing!",
// 	"Precedent":"Unprecedented!",		
// 	"Teleporter":"Far-fetched!",		
// 	"Superior":"Superb!",			
// 	//"Tangles":???,
// 	"Difference":"Distinction!",
// 	//"Photocopier":???,
// 	"Symmetries":"Spec(tac)ular",
// 	"Fillet":"You made the cut!",
// 	"Topological":"Logically!",
// 	"Wasd":"aMAZEing...",
// 	"Nokia 1998":"A classic!",
// 	"Dvorak":"Puzzle Typing since 1932",
// 	"ひらがな":"驚くばかり",
// 	"Nigeria":"Nawa oh!",
// 	"Anagram":"MAGNificient!",
// 	"Genetic.":"It's in your genes!",
// 	"Ironclad":"Elementary!",
// 	"Deaf":"Ace Badge#",
// 	"⠍⠕⠗⠎⠑":"⠁⠺⠑⠐⠎",
// 	"Dividi":"Ipsum bonum!",
// 	"Magnetism":"Electrifying!",
// 	//"Fuchsia":"Stunning!",
// 	"Odd":"EVEN better!",
// 	"Latent clones":"FOURmidable!",
// 	"Shepherdess hence unladylike":"cHERiSHEd!",
// 	"Starting buds":"Startling!",
// 	"La rapide surprise":"Très bien!",
// 	"Just cut and paste":"Very very very good.",
// 	"Order is all":"Steadfast!"
// };
//Extraordinary, Stupendous, fabulous, Astounding, captivating,Wondrous, Unbelievable, breathtaking

// function UpdateWinPane(title){
// 	RemoveChildren(".winpane");
// 	if(In(WinTexts,title))
// 		var text=WinTexts[title];
// 	else
// 		var text="Well done!";

// 	var winElements="12345678".split("").map(n=>`<div class="winlegend">${n==2?text:""}</div>`).join("\n")
// 	ReplaceChildren(winElements,".winpane");

// 	setTimeout(()=>UnHideElement(".winpane"),250);
// 	setTimeout(()=>ToggleClass(".winpane","animated"),500);
// 	setTimeout(()=>HideElement(".winpane"),3000);

// }