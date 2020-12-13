News={
	N_60:{
		DATE:"2020-11-28",
		HEADER:()=>"New level",
		PIECE:()=>`
		<p>${AHTML("puzzle-type")} received new level: POL***.</p>
	`,ID:"puzzle-type"},
	N_59:{
		DATE:"2020-11-21",
		HEADER:()=>"New levels + Sound fix",
		PIECE:()=>`
		<p>${AHTML("puzzle-type")} received three new levels: RES***, РУС*** and WHI*** (a nice remake of a wrongly discarded level).</p>
		<p>Fixed a minor sound bug. Other bugfixes. Major update and new trailer planned.</p>
	`,ID:"puzzle-type"},
	N_58:{
		DATE:"2020-11-15",
		HEADER:()=>"Starkoban + bugfixes",
		PIECE:()=>`
		<p>${AHTML("starkoban")}, a puzzly mix of star battle and sokoban, was released!</p>		
		<p>Controls in the landscape mode are now working correcly in all puzzlescript games. Thanks ${v.WELLS()}!</p>
	`,ID:"index"},
	N_57:{
		DATE:"2020-10-04",
		HEADER:()=>"Star battle Interactive",
		PIECE:()=>`
		<p>${AHTML("star-battle")} now integrates the ${v.A_HYPERROGUE()} engine. Thanks ${v.ZENOROGUE()}!</p>
		<p>${AHTML("Puzzle 13","star-battle.html?c=-sb&1=starbattle-cube-13.lev")} added.</p>
	`,ID:"index"},
N_56:{
		DATE:"2020-09-25",
		HEADER:()=>"Autumn update",
		PIECE:()=>`
		<p>To mark the beginning of Autumn, a new colour theme was applied across the ${v.SITE_NAME()}.</p>
		<p>${AHTML("puzzle-type")} colours were adjusted, and a tutorial mode added.</p>
		<p>${AHTML("Gravirinth [mini]","gravirinth.html")} added.</p>
		<p>Wide refactoring and bugfixes.</p>
	`,ID:"index"},
N_55:{
		DATE:"2020-09-19",
		HEADER:()=>"Reorderings, bugfix",
		PIECE:()=>`
		<p>${AHTML("puzzle-type")} levels were reordered after playtesting feedback, and new labels ${ObtainSymbol("structure")} and  ${ObtainSymbol("math")} were added. Some bugfixes. Thanks ${v.HEDEHOLM()} and ${v.DEUSOVI()}!
		<p>Levels LOO*** added.</p>
	`,ID:"puzzle-type"},
N_54:{
		DATE:"2020-08-30",
		HEADER:()=>"Level transitions, new levels, etc...",
		PIECE:()=>`
		<p>New animated transitions when entering/exiting a level and the title screen. Instructions mode added. Several changes and fixes.</p>
		<p>Levels MAG*** and TEL*** added.</p>
	`,ID:"puzzle-type"},
N_53:{
		DATE:"2020-08-01",
		HEADER:()=>"Keystroke list, letter animation, better sound notes",
		PIECE:()=>`
		<p>${AHTML("puzzle-type")} now sports a hangman-style keystroke list with three different types of strokes: normal, invalid and special.</p>
		<p>Also, the sound feedback for invalid strokes as well as the notes in level DEA*** were improved.</p>
		<p>Level STA*** letter insertion animated. Hints improved.</p>
		<p>All hints were completed.</p>
		<p>Thanks ${v.HEDEHOLM()}, ${v.COLLINEYE()}, ${v.BLUBBERQUARK()}, ${v.BUILDER17()} for your help!</p>
	`,ID:"puzzle-type"},
N_52:{
		DATE:"2020-07-19",
		HEADER:()=>"Hint module & extras",
		PIECE:()=>`
		<p>The hint module was expanded to add hints to some levels in ${AHTML("puzzle-type")}.</p>
		<p>Thanks ${v.HEDEHOLM()} for the suggestions !</p>
	`,ID:"puzzle-type"},
N_51:{
		DATE:"2020-06-14",
		HEADER:()=>"Progress saving small fix",
		PIECE:()=>`
		<p>The progress saving system In ${AHTML("puzzle-type")} now withstands changes in level ordering. Thanks ${v.HEDEHOLM()} and ${v.COLLINEYE()}!</p>
	`,ID:"puzzle-type"},
N_50:{
		DATE:"2020-06-06",
		HEADER:()=>"Difficulty stars & symbols, trailer, new level",
		PIECE:()=>`
		<p>In ${AHTML("puzzle-type")}, ${ObtainSymbol("asterisk-heavy")} indicates level difficulty, other symbols have different meanings: ${ObtainSymbol("eye")} ${ObtainSymbol("search")} ${ObtainSymbol("book")}. Thanks ${v.HEDEHOLM()} and ${v.THINKY()}!</p>
		<p>A small trailer was added.</p>
		<p>New level! STA***. Level MON*** became LA****, provisionally.</p>
	`,ID:"puzzle-type"},
N_49:{
		DATE:"2020-05-30",
		HEADER:()=>"Typographic excursion + fixes",
		PIECE:()=>`
		<p>Level TOP*** was overhauled with morphing letters.</p>
		<p>Diverse minor fixes, related to the undo queue and the arrow keys.</p>
	`,ID:"puzzle-type"},
	N_48:{
DATE:"2020-05-24",
HEADER:()=>"Redo support",
PIECE:()=>`
	<p>As this feature was needed for ${AHTML("puzzle-type")}, the ${AHTML("game-bar")} now has a nice ${KB("redo")} redo button - a suggestion by ${v.COLLINEYE()} and ${v.HEDEHOLM()}!</p>
	`,ID:"puzzle-type"},
	N_47:{
DATE:"2020-05-24",
HEADER:()=>"Global hall of fame",
PIECE:()=>`
	<p>There is now a ${AHTML("global Hall of Fame","hall-of-fame-global")} for winners of any puzzlescript game played in the game-console. Have a try!</p>
	`,ID:"hall-of-fame-global"},
	N_46:{
DATE:"2020-05-23",
HEADER:()=>"Puzzle type Gamma",
PIECE:()=>`
	<p>The Gamma Phase has started, with a fresh round of videoplaytests. Contact ${v.NAME()} to join!</p>
	<p>More updates: level FUCHSIA (formerly WHITE) removed.</p>
	`,ID:"puzzle-type"},
	N_45:{
DATE:"2020-05-17",
HEADER:()=>"Puzzle type beta changes V",
PIECE:()=>`
<p>More updates: level CAR*** became IRO***, adding a couple twists. DEA*** was expanded and synthesised sounds added. Many thanks, ${v.COLLINEYE()}!</p>
<p>New level MON*** added, still experimental!</p>
	`,ID:"puzzle-type"},
	N_44:{
DATE:"2020-05-10",
HEADER:()=>"Puzzle type beta changes IV",
PIECE:()=>`
<p>More updates: levels THI*** and COP*** added; TEN*** became CAR***, a more interesting clue. Reordering of later levels. Major fix to the undo queue. Minor bugs.</p>
	`,ID:"puzzle-type"},
	N_43:{
DATE:"2020-05-07",
HEADER:()=>"Game stats & other improvements",
PIECE:()=>`
<p>Most games now display a chart with the number of wins per level.</p>
<p>Also, it is now possible to jump directly to any level by adding the URL parameter: e.g. ?level=levelTitle or e.g. ?level=2.</p>
<p>Major refactoring and minor scattered fixes.</p>
	`,ID:"index"},
	N_42:{
DATE:"2020-04-26",
HEADER:()=>"Puzzle type beta changes III",
PIECE:()=>`
<p>Ongoing beta playtesting changes: NUC*** became TEN*** a less ambiguous clue, added new puzzle GEN*** but removed TAN***, a critical synonym was added to LAT***, WAS*** was recentered.</p>
	`,ID:"puzzle-type"},
	N_41:{
DATE:"2020-04-18",
HEADER:()=>"Puzzle type beta changes II",
PIECE:()=>`
<p>Ongoing beta playtesting changes: a clearer deduction path was added to DVO***, the NOK*** space display was improved, SYM*** operates now at word level, minor additions to ANA***, NIG*** was expanded, MOR*** was fully redesigned, and the clue in WEI*** changed to LAT***. Number and space input was allowed where helpful. Replaced SUP*** with APA***. Added FIL***,  DEA*** and WAS*** so the total number of levels is now 29. Many thanks, ${v.COLLINEYE()}!</p>
	`,ID:"puzzle-type"},
	N_40:{
DATE:"2020-04-10",
HEADER:()=>"Puzzle type beta changes I",
PIECE:()=>`
<p>Ongoing beta playtesting changes: clue HOMEOMORPHIC became TOP*** (with new rules); CHERISHEDWOMAN became SHE*** (expanded ruleset, same logic); O** received a new keyword; NOK*** lost the backspace glitch; small CSS tweaks and spacebar inputs support. Many thanks, ${v.PLURMORANT()}!</p>
	`,ID:"puzzle-type"},
	N_39:{
DATE:"2020-04-07",
HEADER:()=>"Puzzle type fix (for the Safari browser)",
PIECE:()=>`
<p>"Hoisting of functions inside conditionals" was the Javascript inconsistency blocking ${AHTML("puzzle-type")} on Safari - not anymore!</p>
	`,ID:"puzzle-type"},
	N_38:{
DATE:"2020-04-06",
HEADER:()=>"Game Console Fork support",
PIECE:()=>`
<p>The ${AHTML("game-console")} learned to request the appropriate PS fork for each game.</p>
	`,ID:"game-console"},
	N_37:{
DATE:"2020-03-31",
HEADER:()=>"Puzzle type +1 level, new screenshots",
PIECE:()=>`
<p>One new level replaced an older one, keeping the total number constant. New screenshots were also added.</p>
	`,ID:"puzzle-type"},
	N_36:{
DATE:"2019-11-20",
HEADER:()=>"On-screen keyboard",
PIECE:()=>`
<p>There is now an on-screen keyboard ${KB("keyboard")} for easier input on mobile devices. ${KB("undo")}/${KB("restart")} buttons included.</p>
	`,ID:"puzzle-type"},
	N_35:{
DATE:"2020-01-05",
HEADER:()=>"Related games in game console",
PIECE:()=>`
<p>Two new buttons: ${KB("more")} (more games by the same author) and ${KB("wrench")} (edit source).</p>
	`,ID:"game-console"},
	N_34:{
DATE:"2020-01-02",
HEADER:()=>"Puzzle Type new levels",
PIECE:()=>`
<p>Two new levels. Thanks ${v.MINOTALEN()} for testing!</p>
	`,ID:"puzzle-type"},
	N_33:{
DATE:"2020-02-14",
HEADER:()=>"Puzzle Type Colourisation",
PIECE:()=>`
<p>Each level now has its own colour.</p>
<p>With two new levels and after major level reordering, the milestone of 26 levels (one per letter of the latin alphabet) was reached.</p>
	`,ID:"puzzle-type"},
	N_AT_1:{
DATE:"2018-10-08",
HEADER:()=>"Abxtract Tractx update",
PIECE:()=>`
<p>Shortening of canvas size in <em>level 5</em>; improvements to colour contrast.</p>`,ID:"abxtract-tractx"},
	N_PT_3:{
DATE:"2019-09-30",
HEADER:()=>"Hints in Platformer-template",
PIECE:()=>`
<p>Hints added to most levels!</p>`,ID:"platformer-template"},
	N_PT_2:{
DATE:"2019-06-30",
HEADER:()=>"Plaformer Template minor update",
PIECE:()=>`
<ul>
<li><b>level 31:</b> displaced a dash to remove one unintended solution; reduced level size by rearranging elements; simplified lesson;</li>
<li><b>level 32:</b> switched places with former level 31.</li>
</ul>
	`,ID:"platformer-template"},
	N_PT_3:{
DATE:"2019-05-30",
HEADER:()=>"Data-driven changes to Plaformer Template",
PIECE:()=>`
<p>Major data-driven changes to selected levels, based on average time required to win a level, plus several minor tweaks:
<ul>
<li><b>level 10:</b> displacement of a single block to try to guide players towards the elusive solution;</li>
<li><b>level 26:</b> major redesign to make it easier;</li>
<li><b>level 43:</b> major redesign and simplification while retaining the core ideas;</li>
<li><b>level 44:</b> reduction of level size;</li>
<li><b>level 46:</b> reduction of level size and decluttering;</li>
<li><b>level 48:</b> major redesign to declutter and ramp up the challenge;</li>
<li><b>level 50:</b> remotion of one single dash causing one unintended solution.</li>
</ul>
</p>
	`,ID:"platformer-template"},
	N_PMGRP_2:{
DATE:"2018-05-30",
HEADER:()=>"PMGRP further improvements",
PIECE:()=>`
<p>Redesign of <em>level 0</em>; layout changes to <em>levels 6 and 7</em>; improvements in <b>replay mode</b> (highlighting, slowing down); future and present self no longer swap colours.</p>
	`,ID:"pmgrp"},
	N_PMGRP_1:{
DATE:"2018-05-20",
HEADER:()=>"PMGRP update",
PIECE:()=>`
<p>Aesthetical changes (including a redesign of respawn and goal animations);  improvement of multi-crate pile physics and dropping; suppression of <em>level 11</em>; all level numbers incremented by 1.</p>
	`,ID:"pmgrp"},
	N_PUZZTY_1:{
DATE:"2019-11-15",
HEADER:()=>"Puzzle type alpha",
PIECE:()=>`
<p>Puzzle type's alpha version was shared privately, 21 levels in total.</p>
	`,ID:"puzzle-type"},
	N_SH_1:{
DATE:"2020-03-29",
HEADER:()=>"Strata Hedges mechanics draft",
PIECE:()=>`
<p>A first draft of ${AHTML("strata-hedges")} was shared privately, showcasing the novel tridimensional mechanics.</p>
	`,ID:"strata-hedges"},
	N_TA_1:{
DATE:"2018-09-29",
HEADER:()=>"Tiaradventur updates",
PIECE:()=>`
<p>Redesign of <em>level 3</em> to prevent unintended solution; minor tweaks to <em>levels 1, 2 and 4</em>; two crates removed from near the secret item; minor graphic changes (polishing margins, choosing smaller trees in key positions, fixing lamp flame animation); dialogue flow fix; player falling unintentionally into water disallowed; burning message added; diverse improvements of princess behaviour; fixes to auto-save system including a golden flash; new restart trigger; golden win animation.</p>
	`,ID:"tiaradventur"},
	N_TA_2:{
DATE:"2019-01-30",
HEADER:()=>"Tiaradventur princess behaviour",
PIECE:()=>`
<p>The princess now stubbornly refuses to be left behind! On the last level, she will now consistently flee from the wolves and cause a fire - and gives clearer hints. It is also no longer possible to push an extra wolf into the last level.</p>
	`,ID:"tiaradventur"},
	N_WP_1:{
DATE:"2019-01-30",
HEADER:()=>"Whirpuzzle physics fix",
PIECE:()=>`
<p>Blocks that are stuck at some point in a sequence now won't push blocks located further away in the same sequence.</p>
	`,ID:"whirlpuzzle"},
N_27:{
DATE:`2020-03-28`,
HEADER:()=>`${v.SITE_NAME()} Generator Update`,
PIECE:()=>`
<p>The ${v.SITE_NAME()} is now 100% generated in Javascript, thus bringing faster editing speeds. The new Generator uses <b>String Templates</b>.</p>
<p>Good side effects include reduced page size, plus new functionalities such as multiple ${v.A_TAG()} filtering.</p>
<p>Bugs are to be expected.</p>
`,ID:"generator"},
N_26:{
DATE:`2020-03-27`,
HEADER:()=>`Night mode VS Dark Theme`,
PIECE:()=>`
<p>Night mode will now activate when the operating system prefers a dark theme. Its colour tones are now nicer: slighly less red/black, and now more orange/dark gray.</p>
`},
N_25:{
DATE:`2020-02-02`,
HEADER:()=>`PuzzleScript Editor + Game Bar`,
PIECE:()=>`
<p>There is now a convenient ${v.A_EDITOR()} which exports any PuzzleScript game with game bar by default.</p>
`,ID:"game-bar"},
N_23:{
DATE:`2020-01-25`,
HEADER:()=>`Puzzlescript Components Database`,
PIECE:()=>`
<p>A database of Puzzlescript components, prototypes and mechanic demonstrations was added to ${AHTML("game-tools")} to complement the ${AHTML("puzzlescript-games-database")}.</p>
`},
N_24:{
DATE:`2020-01-24`,
HEADER:()=>`Gravirinth major update`,
PIECE:()=>`
<p>${AHTML("gravirinth-legacy")} now runs much faster thanks to ${v.A_LANCE_PS_FORK()}.</p>
`,ID:"gravirinth-legacy"},
N_22:{
DATE:`2020-01-12`,
HEADER:()=>`Database Search + submission options`,
PIECE:()=>`
<p>The ${AHTML("puzzlescript-games-database")} underwent several improvements. Among them, there are now more submission options, and search was added across all data categories. Search can be triggered by user input and indicated in the URL.</p>
`,ID:"puzzlescript-games-database"},
N_28:{
	DATE:`2020-01-11`,
	HEADER:()=>`Game bar icon embellishment`,
	PIECE:()=>`
<p>The ${v.A_GAME_BAR()} now sports cross-platform icons, which activate a nice typewriter tooltip effect on hover, revealing the button function plus the corresponding keyboard shortcut.</p>
`,ID:"game-bar"},
N_21:{
	DATE:`2019-12-14`,
	HEADER:()=>`Diverse improvements`,
	PIECE:()=>`
<p>All ${v.SITE_NAME()}'s PWAs are now are playable offline, so this feature is out of beta.</p>
<p>TOCs show now collapsed by default.</p>
`},
N_31:{
	DATE:`2019-12-13`,
	HEADER:()=>`LUL development ongoing`,
	PIECE:()=>`
<p> ${v.A_LUL()} parser is being developed, an interesting challenge.</p>`,
ID:"lul"},
N_31:{
	DATE:`2019-12-11`,
	HEADER:()=>`Puzzlescript games database expansion`,
	PIECE:()=>`
<p>The ${AHTML("puzzlescript-games-database")} now sports over 1300 titles.</p>
`,ID:"puzzlescript-games-database"},
N_20:{
	DATE:`2019-12-07`,
	HEADER:()=>`Store opens`,
	PIECE:()=>`
<p>The ${v.SITE_NAME()} now has a dedicated ${v.A_STORE()}, featuring pearls such as ${AHTML("puzzle-type")}.${LabelHTML("Experimental")}</p>`,
ID:"store"},
N_32:{
	DATE:`2019-12-06`,
	HEADER:()=>`Game bar Minor changes`,
	PIECE:()=>`<p>Layout colour changes, especially in headers, and font variation added. Minor game bar updates.</p>
	`,ID:"game-bar"},
N_19:{
	DATE:`2019-12-01`,
	HEADER:()=>`LUL in development`,
	PIECE:()=>`
<p>The ${v.A_LUL()} draft is released for discussion.</p>`,
	ID:"lul"},
N_30:{
	DATE:`2019-11-30`,
HEADER:()=>`Status page`,
PIECE:()=>`
<p>Users may now perform self-checks by visiting the ${AHTML("status")} page, which performs automatic tests.</p>
`,ID:"status"},
N_18:{
DATE:`2019-11-24`,
HEADER:()=>`Tables of Contents`,
PIECE:()=>`
<p>Most ${v.SITE_NAME()} pages now have an auto-generated <b>Table of Contents</b>. This will be especially useful to document projects like the ${v.A_GAME_BAR()} - whose features are also now better documented.</p>`},
N_18:{
DATE:`2019-11-23`,
HEADER:()=>`Level titles & selector improvements`,
PIECE:()=>`
<p>The ${v.A_GAME_BAR()} now supports assigning level titles from within the hints file. These titles will be shown atop the level selector window, which received some extra polish.</p>
`,ID:"game-bar"},
N_17:{
DATE:`2019-11-09`,
HEADER:()=>`Progressive Web Apps (beta)`,
PIECE:()=>`
<p>All ${v.NAME()}'s games are now (Progressive) Web Apps, so you can now add them to your device's homescreen and play offline!</p>
`},
N_16:{
DATE:`2019-11-02`,
HEADER:()=>`Nicer tables`,
PIECE:()=>`
<p>All tables in the ${v.SITE_NAME()} are now sortable.</p>
`},
N_15:{
DATE:`2019-10-26`,
HEADER:()=>`Towards Progressive Web Apps (PWA)`,
PIECE:()=>`
<p>The ${v.SITE_NAME()} has suffered diverse optimisations towards transforming several pages into independent PWAs. Games, for instance, load faster. Plus diverse small accessibility improvements, as suggested by the Lighthouse tool.</p>
`},
N_29:{DATE:`2019-10-25`,
HEADER:()=>`Puzzle-type (alpha)`,
PIECE:()=>`
<p>This upcoming cryptic puzzle is gaining shape. Animated logo. Sound effects. 14 levels, and counting.</p>
`,ID:"puzzle-type"},
N_14:{
DATE:`2019-10-19`,
HEADER:()=>`Game-bar extension and auto-rotation`,
PIECE:()=>`
<p>The game-bar has been extended to work with any vanilla javascript game (besides puzzlescript), so it fits the upcoming minigame "Puzzle Type".</p>
<p>On small screens, such as in mobile devices, the screen will rotate to landscape.</p>
`,ID:"game-bar"},
N_13:{
DATE:`2019-10-12`,
HEADER:()=>`Puzzlescript game database & tools`,
PIECE:()=>`
<p>The world's largest public puzzlescript game database was released for the first time.</p>
<p>Some game making tools were listed, for future reference.</p>
`,ID:"puzzlescript-games-database"},
N_12:{
DATE:`2019-10-02`,
HEADER:()=>`Game bar keyboard shortcuts system`,
PIECE:()=>`
<p>A better keyboard shortcut system was added. Menu navigation using (${KB("ctrl")}) ${KB("enter")}, ${KB("space")}, (${KB("shift")})${KB("tab")} and <kbd>arrows</kbd> has improved.</p>
<p>GIF hints can now be played/paused with ${KB("enter")} or ${KB("space")}.</p>
`,ID:"game-bar"},
N_11:{
DATE:`2019-09-21`,
HEADER:()=>`Skilleblokker launches`,
PIECE:()=>`
<p>${AHTML("skilleblokker")} spillet utgitt!</p>
`,ID:"skilleblokker"},
N_10:{
DATE:`2019-09-19`,
HEADER:()=>`Bookmarklet`,
PIECE:()=>`
<p>The game bar now can be applied to any online puzzlescript game by means of a ${v.A_BOOKMARKLET()}, a suggestion by ${v.MINOTALEN()}.</p>
`,ID:"game-bar"},
N_9:{
DATE:`2019-09-11`,
HEADER:()=>`Hints system`,
PIECE:()=>`
<p>The game bar now includes support for Hints, a suggestion by ${v.MINOTALEN()}. Hints were added to ${AHTML("platformer-template")}.</p>
`,ID:"game-bar"},
N_8:{
DATE:`2019-09-07`,
HEADER:()=>`Keyboard Keys styling`,
PIECE:()=>`
<p>Keyboard keys across the ${v.SITE_NAME()} are now nicely <kbd>S</kbd> <kbd>T</kbd> <kbd>Y</kbd> <kbd>L</kbd> <kbd>E</kbd> <kbd>D</kbd>.</p>
`},
N_7:{
DATE:`2019-09-02`,
HEADER:()=>`Undo: press and hold`,
PIECE:()=>`
<p>The game bar's undo button now supports <kbd>press and hold</kbd> to undo several moves at once, useful in touch devices.</p>
`,ID:"game-bar"},
N_6:{
DATE:`2019-08-13`,
HEADER:()=>`Custom linear level progressions`,
PIECE:()=>`
<p>The game bar's level selector now supports linear level progression and boss levels.</p>
`,ID:"game-bar"},
N_5:{
DATE:`2019-08-08`,
HEADER:()=>`Colour matching`,
PIECE:()=>`
<p>The game bar's colour now adapts automatically to the color scheme of the current game.</p>
`,ID:"game-bar"},
N_4:{
DATE:`2019-08-03`,
HEADER:()=>`Fullscreen`,
PIECE:()=>`
<p>The game bar's now has a fullscreen mode. Activate it by pressing the button or <kbd>F</kbd>.</p>
`,ID:"game-bar"},
N_3:{
DATE:`2019-08-01`,
HEADER:()=>`Logo hovering`,
PIECE:()=>`
<p>After a mathematical simplification, the ${v.SITE_NAME()}'s logo, converted to a svg vector, reveals a different pattern on hover.</p>
`},
N_2:{
DATE:`2019-07-12`,
HEADER:()=>`Burokku Konekuta launches`,
PIECE:()=>`
<p>${AHTML("burokku-konekuta")} がリリースされました!</p>
`,ID:"burokku-konekuta"},
N_1:{
DATE:`2019-05-19`,
HEADER:()=>`Platformer-template launches`,
PIECE:()=>`
<p>${AHTML("platformer-template")} matures into its final version.</p>
`,ID:"platformer-template"}
}



SortNewsByDate=function(pageA,pageB){
	return Days(StringDate(pageA.DATE),StringDate(pageB.DATE));
}

ChangelogEntryHTML=function(change){
	return `
	<h3>${DateNamer(StringDate(change.DATE))}</h3>
	${change.PIECE()}
	`;
}

ChangelogHTML=function(){
	return SectionHTML({
		Source:News,
		header:"<h2 class>Changelog</h2>",
		include:{ID:PageIdentifier()},
		FilterF:NonFutureItem,
		ItemHTML:ChangelogEntryHTML,
		Sorter:SortNewsByDate
	})
}

NonFutureItem=function(npObj){//news or page Object
	if(npObj.DATE)
		return Days(StringDate(npObj.DATE))>=0
	if(npObj.DAY){
		var d=DateDate(UnFunction(npObj.DAY),UnFunction(npObj.MONTH),UnFunction(npObj.YEAR));
		console.log(d);
		return d>=0;
	}
};

NewsEntryHTML=function(change,Opts){
	var d=Opts.depth||2;
	var DateNamer=Opts.DateNamer||DateNamer;
	return `
	<h${d}>${DateNamer(StringDate(change.DATE))}</h${d}>
	${change.HEADER?`<h${d+1}>${UnFunction(change.HEADER)}</h${d+1}>`:""}
	${UnFunction(change.PIECE)}
	`;
}

var NewsOptions={
	ItemHTML:NewsEntryHTML,
	Sorter:SortNewsByDate,
	FilterF:NonFutureItem
}

NewsMonthSectionHTML=function(MonthNews){
	var month=MonthYearNamer(StringDate(First(MonthNews).DATE));
	var daysObj=Gather(MonthNews,piece=>StringDate(piece.DATE));
	var daily=Values(daysObj).map(NewsDaySectionHTML).join("");
	return `
		<h2>${month}</h2>
		${daily}`
}

NewsDaySectionHTML=function(DayNews){
	var day=DayNamer(StringDate(First(DayNews).DATE));
	return SectionHTML({
		Source:DayNews,
		header:`<h3>${day}</h3>`,
		ItemHTML:function(item){return`
			${item.HEADER?`<h4>${UnFunction(item.HEADER)}</h4>`:""}
			${UnFunction(item.PIECE)}`;}
	})
}

NewsHTML=function(){
	var monthsObj=Gather(News,piece=>Month(StringDate(piece.DATE))/13+Year(StringDate(piece.DATE)));
	var monthly=Reverse(Values(monthsObj)).map(NewsMonthSectionHTML).join("");
	return HTMLIder("news")(monthly) //for auto-update
}

RecentNewsHTML=function(){
	return SectionHTML({
		...NewsOptions,
		Source:News,
		max:v.NEWS_LIMIT_RECENT(),
		header:`<h1 class="title">Recent changes</h1>`,
		InnerWrapper:v.WHITEBOARD_OUT,
	})
}

RSSXML=function(){
	return SectionHTML({
		...NewsOptions,
		Source:News,
		ItemHTML:RSSItemXML,
		max:v.RSS_LIMIT(),
		header:RSSHeadXML(),
		OuterWrapper:function(body){return `${v.XML()}<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" >
			<channel>
				${body}
			</channel>
		</rss>`}
	})
}

RSSHeadXML=function(){
	return `
		<atom:link href="${v.RSS_PATH()}" rel="self" type="application/rss+xml" />
		<title>${v.SITE_NAME()}</title>
		<link>${v.SITE()}</link>
		<description>${v.RSS_SITE_DESCRIPTION()}</description>
		<language>${v.LANG()}</language> 
		<docs>https://cyber.harvard.edu/rss/rss.html</docs>
		<copyright>${v.COPYRIGHT_TEXT()}</copyright>
		<image>
			<link>${v.SITE()}</link>
			<title>${v.SITE_NAME()}</title>
			<url>${v.SITE()}/${v.LOGO_PATH()}</url>
		</image>`;
}

RSSItemXML=function(change){
	var page=PageObj(change.ID);
	v={...v,...page};
	return `
	<item>
		<title><![CDATA[${change.HEADER()}]]></title>
		<link>${v.SITE()}/${change.ID}.html#RSS</link>
		<guid>${v.SITE()}/${change.ID}.html?guid=${change.DATE}</guid>
		<pubDate>${DateRSS(StringDate(change.DATE))} 07:06:05 GMT</pubDate>
		<description>
		<![CDATA[
			${v.PICTURE_RSS(v,180)}
			${change.PIECE()}
		]]>
		</description>
		${v.TAGS().map(t=>`<category><![CDATA[${t}]]></category>`).join("\n")}
	</item>
	`;
}

DownloadRSS=function(){
	var data=RSSXML();
	var filename="rss.xml";
	var type="text/xml";//application/rss+xml
	Download(data,filename,type);
}

SitemapXML=function(){
	return SectionHTML({
		Source:CMS,
		ItemHTML:SitemapItemXML,
		Sorter:SortPageByDate,
		FilterF:NonFutureItem,
		OuterWrapper:function(body){return`${v.XML()}<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`;}
	});
}

FrequencyName=function(days){
	if(days<=7*2)
		return "weekly";
	else if(days<=31*2)
		return"monthly";
	else if(days<=365*2)
		return"yearly";
	else
		return"never";
}

SitemapItemXML=function(PageObj){
	
	var PageObj={...v,...PageObj};

	var lastdate=PageDateYMD(PageObj);
	
	var id=PageObj.LINK();console.log(id,lastdate)
	var changes=BaseFilter(News,{ID:id}).sort(SortNewsByDate).map(ch=>ch.DATE);
		lastdate=changes[0]||lastdate;
	var freq=FrequencyName(Days(new Date(lastdate)));//Days since last modification
	
	return `
	<url>
		<loc>${v.SITE()}/${PageObj.LINK()}</loc>
		<lastmod>${lastdate}</lastmod>
		<changefreq>${freq}</changefreq>
	</url>`;
}

DownloadSitemap=function(){
	var data=SitemapXML();
	var filename="sitemap.xml";
	var type="text/xml";//application/rss+xml
	Download(data,filename,type);
}




ImportNewsObject=function(newsObj){
	function AddNews(Obj){
		Keys(Obj).map(k=>News[k]=newsObj.Transformer(Obj[k],k));
		ReplaceElement(NewsHTML(),".news")
	}
	LoadHTMLObject(newsObj,AddNews);	
}

var NewsSources={
	starbattle:{
		name:"starbattlesData",
		source:"https://pedropsi.github.io/star-battle.html",
		Transformer:function(item,key){
			var number=UnAfterfix(key,"-");
			var title=item.legend||key;
			var stars=item.stars?(item.stars+ObtainSymbol("star")):"";
			var suffix=(item.variant?(" - "+item.variant):"");
				title=title+suffix;
			var link=AHTML(title,item.href?item.href:"star-battle.html");
				title=title+(stars?(", "+stars):"");

			return {
				DATE:item.date,
				HEADER:title,
				PIECE:`
				<p>${link}, puzzle #${number} in the ${AHTML("star battle collection","star-battle.html")}, now released.</p>`,
			}
		}
	}
}


DATA["news"]=News;
Shout("news");
ExportNodeFunctions();