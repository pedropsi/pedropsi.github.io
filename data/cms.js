NoImage={IMAGE_NAME:()=>"splash",IMAGE_EXT:()=>"svg"};
WithImage={IMAGE_NAME:(v)=>v.LINK(v),IMAGE_EXT:()=>"svg",IMAGE_ALT:(v)=>v.TITLE(v)};
WithImagePNG=Merge(WithImage,{IMAGE_EXT:()=>"png"});

CMSGame=Merge(WithImage,{POSTSCRIPT:()=>v.PUZZLE_SCRIPT(),TYPE:()=>`Game`,CATEGORIES:()=>[`entertainment`,`kids`,`games`],TYPEGRAPH:()=>`game`,MANIFEST:()=>v.PWA_MANIFEST(),IMAGE_EXT:()=>`png`});


CMS={
"index":Merge(NoImage,{BODY:()=>v.POST(),TITLE:()=>v.SITE_NAME(),DATE:()=>"2017-12-01",TYPE:()=>`Home`,TAGS:()=>[`Sitemap`],DESCRIPTION:()=>`${v.SITE_NAME()} home page.`,TYPEGRAPH:()=>`website`}),
"purpose":Merge(NoImage,{TITLE:()=>`The purpose of the ${v.SITE_NAME()}`,SHORTNAME:()=>`Purpose`,DATE:()=>"2017-12-01",TAGS:()=>[`Creative-Archive`,`Post`],ONE_LINER:()=>`${v.SITE_NAME()}'s first post!`}),
"support":Merge(NoImage,{TITLE:()=>`Support the ${v.SITE_NAME()}`,SHORTNAME:()=>`Suport`,DATE:()=>"2018-02-08",TAGS:()=>[`Creative-Archive`,`Finance`,`Post`],ONE_LINER:()=>`Support the ${v.SITE_NAME()}!`}),
"making-of":Merge(NoImage,{TITLE:()=>`The making of the ${v.SITE_NAME()}`,SHORTNAME:()=>`making-of`,DATE:()=>"2019-12-15",TAGS:()=>[`Creative-Archive`,`Finance`,`Post`],ONE_LINER:()=>`Support the ${v.SITE_NAME()}!`}),

"selected-puzzlescript-games":Merge(WithImage,{FEATURED:()=>true,TITLE:()=>`Selected Puzzlescript Games 2014-${Year()}`,SHORTNAME:()=>`Selected PS Games`,DATE:()=>"2019-01-31",TAGS:()=>[`List`,`Post`,`Puzzlescript`],ONE_LINER:()=>`This is a <em>short</em> list of <em>very good</em> puzzlescript games, in ${v.MY()} opinion. It serves as a <em>${v.PERSONAL()}</em>, yet publicly shared, reference (to be updated whenever needed).`}),
"11-lessons-from-11-games":Merge(WithImage,{TITLE:()=>`11 Lessons from a 11-game-making journey`,SHORTNAME:()=>`Lessons`,DATE:()=>"2019-04-14",TAGS:()=>[`Game`,`Learning`,`List`,`Post`]}),
"a-game-making-journey":Merge(WithImage,{TITLE:()=>`A game-making journey`,SHORTNAME:()=>`Journey`,DATE:()=>"2019-04-14",TAGS:()=>[`Game`,`Learning`,`List`,`Log`,`Post`,`Puzzlescript`]}),
"game-bar":Merge(WithImage,{FEATURED:()=>true,TITLE:()=>`Game Bar`,DATE:()=>"2019-07-27",TAGS:()=>[`Resource`,`Tutorial`,`Puzzlescript`]}),
"puzzlescript-games-database":Merge(WithImage,{FEATURED:()=>true,BODY:()=>v.PAGE_BARE(),CONTENT:()=>v.SECTION_OUT()+v.SECTION_OUT(v.WHITEBOARD()),POSTSCRIPT:()=>[`data/puzzlescript-database-game.js`],PRESCRIPT:()=>[`data/puzzlescript-database.js`],TITLE:()=>`Puzzlescript games database`,SHORTNAME:()=>`PS database`,DATE:()=>"2019-10-10",TAGS:()=>[`Community`,`List`,`Puzzlescript`],ONE_LINER:()=>`This aims to be the definitive list of all (public) puzzlescript games, ever made, worldwide. Even the terrible ones qualify!`,DESCRIPTION:()=>`The complete list of all puzzlescript games, good or bad.`}),
"game-tools":Merge(WithImage,{FEATURED:()=>true,POSTSCRIPT:()=>[`data/puzzlescript-database-component.js`],PRESCRIPT:()=>[`data/puzzlescript-database.js`],TITLE:()=>`Game tools`,DATE:()=>"2019-10-12",TAGS:()=>[`Community`,`List`,`Log`,`Post`,`Puzzlescript`,`Resource`],ONE_LINER:()=>`Useful tools to make games, including puzzlescript forks, wrappers and puzzlescript sprite editors.`}),
"game-console":Merge(CMSGame,{POSTSCRIPT:()=>v.PUZZLE_SCRIPT().concat([`data/puzzlescript-database-game.js`]),PRESCRIPT:()=>[`data/puzzlescript-database.js`],TITLE:()=>`Game Console`,DATE:()=>"2019-10-29",TYPE:()=>`Console`,TAGS:()=>[`Community`,`Puzzlescript`,`Resource`],ONE_LINER:()=>`Load any puzzlescript game in ${v.NAME()}'s console and to use the game bar!`,TYPEGRAPH:()=>`website`,IMAGE_EXT:()=>"svg"}),

"status":Merge(WithImage,{POSTSCRIPT:()=>["codes/test/test.js"],TITLE:()=>`Status`,DATE:()=>"2019-11-25",TAGS:()=>[`Creative-Archive`,`Resource`,`Sitemap`],ONE_LINER:()=>`Test whether every ${v.SITE_NAME()} function is supported in your browser.`}),
"lul":Merge(WithImage,{TITLE:()=>`Level unlocking language`,SHORTNAME:()=>`LUL`,DATE:()=>"2019-11-30",TAGS:()=>[`Prototype`,`Resource`,`Tutorial`],ONE_LINER:()=>`${v.TITLE()} (LUL) is a simple language to express level precedence rules, also known as level unlocking conditions.`}),
"store":Merge(WithImage,{BODY:()=>v.PAGE_BARE(),CONTENT:()=>v.POST(),PRESCRIPT:()=>["data/store.js"],STYLE:()=>`store`,TITLE:()=>`Store`,DATE:()=>"2019-11-27",TYPE:()=>`Store`,TAGS:()=>[`Creative-Archive`,`Finance`,`List`,`Sitemap`],ONE_LINER:()=>`Shop for exclusive ${v.NAME()} games and more!`,TYPEGRAPH:()=>`site`}),
"press":Merge(WithImage,{TITLE:()=>`Press kit`,DATE:()=>"2019-02-02",TYPE:()=>`Post`,TAGS:()=>[`Creative-Archive`,`Press`,`Sitemap`],TYPEGRAPH:()=>`site`}),
"news":Merge(WithImage,{TITLE:()=>`News`,DATE:()=>"2019-09-20",TYPE:()=>`Archive`,TAGS:()=>[`Creative-Archive`,`Log`,`Post`,`Press`,`Sitemap`],IMAGE_ALT:()=>`${v.SITE_NAME()} News`,TYPEGRAPH:()=>`site`}),

"mosaic":Merge(WithImage,{IMAGE_NAME:()=>"fleur-de-lis",IMAGE_EXT:()=>"png",TITLE:()=>`Mosaic wallpaper gallery`,DATE:()=>"2018-02-14",TAGS:()=>[`Art`,`Travel`,`Wallpaper`],IMAGE_ALT:()=>`Wallpaper gallery`}),

"about":Merge(NoImage,{CONTENT:()=>v.POST(),TITLE:()=>`About`,DATE:()=>"2018-02-02",TAGS:()=>[`Creative-Archive`,`Post`],TYPEGRAPH:()=>`profile`}),
"404":Merge(NoImage,{BODY:()=>v.PAGE_SIMPLE(),CONTENT:()=>v.POST(),TITLE:()=>`Page not found….`,SHORTNAME:()=>`404`,DATE:()=>"2017-12-01",TYPE:()=>`Backend`,TAGS:()=>[`Sitemap`],DESCRIPTION:()=>`Page not found in ${v.SITE_NAME()}.`,TYPEGRAPH:()=>`website`}),
"guestbook":Merge(WithImage,{BODY:()=>v.PAGE_BARE(),CONTENT:()=>v.GUESTBOOK_AREA(),TITLE:()=>`Guestbook`,DATE:()=>"2018-07-22",TYPE:()=>`Guestbook`,TAGS:()=>[`Creative-Archive`],IMAGE_ALT:()=>`Write your message on the ${v.SITE_NAME()}'s guestbook!`,DESCRIPTION:()=>`The Guestbook of the ${v.SITE_NAME()}!`,TYPEGRAPH:()=>`website`}),
"contact":Merge(NoImage,{TITLE:()=>`Contact`,TYPE:()=>`Backend`,TAGS:()=>[`Sitemap`],DESCRIPTION:()=>`Leave a message to contact ${v.NAME()}`,TYPEGRAPH:()=>`website`}),
"hall-of-fame":Merge(WithImage,{BODY:()=>v.PAGE_BARE(),CONTENT:()=>v.TABULAR_AREA(),POSTSCRIPT:()=>["data/hof.js"],TITLE:()=>`Hall of Fame`,SHORTNAME:()=>`HOF`,DATE:()=>"2018-03-26",TYPE:()=>`Hall of Fame`,TAGS:()=>[`Creative-Archive`,`Community`],IMAGE_ALT:()=>`Hall of fame of the ${v.SITE_NAME()}. Laurel and stars.`,ONE_LINER:()=>`<p>Puzzlers who solved any of the puzzles in the ${v.SITE_NAME()} earn the right to record their name (or alias) for posterity in the ${A("hall-of-fame")}.</p>`,DESCRIPTION:()=>`Hall of fame: winners of ${v.NAME()}'s challenges.`,TYPEGRAPH:()=>`website`}),
"hall-of-fame-global":Merge(WithImage,{BODY:()=>v.PAGE_BARE(),CONTENT:()=>v.TABULAR_AREA(),POSTSCRIPT:()=>["data/hof.js"],TITLE:()=>`Hall of Fame (global)`,SHORTNAME:()=>`HOFG`,DATE:()=>"2020-05-24",TYPE:()=>`Hall of Fame`,TAGS:()=>[`Community`],IMAGE_ALT:()=>`Hall of fame (global). Laurel and stars.`,ONE_LINER:()=>`<p>After beating a game listed in the ${A("puzzlescript-games-database")}, puzzlers anywhere in the globe may add their name (or alias) to this ${v.TITLE_BOLD()}.</p>`,DESCRIPTION:()=>`Hall of fame: global winners.`,TYPEGRAPH:()=>`website`}),
"tetrastrophe":Merge(CMSGame,{CONTENT:()=>`f60664326442967c1fcd97bb36f1af94`,THEMECOLOUR:()=>`rgb(112,84,0)`,TITLE:()=>`Tetrastrophe`,DATE:()=>"2014-05-14",TAGS:()=>[`Game`,`Platformer`,`Puzzle`,`Puzzlescript`],ONE_LINER:()=>`<p>Blocks are falling from the sky! Reach the <em>flag</em> to avoid a catastrophe! There are 10 levels before reaching absolute safety.</p>`}),
"blockworks":Merge(CMSGame,{CONTENT:()=>`f9eb8a3e60ba1328a84c3e84db27563a`,THEMECOLOUR:()=>`rgb(69,0,0)`,TITLE:()=>`Blockworks`,DATE:()=>"2018-02-04",TAGS:()=>[`Game`,`Platformer`,`Puzzle`,`Puzzlescript`],ONE_LINER:()=>`<p>Place the blue <em>X Block</em> at the <em>goal</em> (white arrow).Take advantage of auxiliary blocks by thinking creatively and acting timely.</p><p>8 levels only comprise this action puzzle. Good luck!</p>`}),
"whirlpuzzle":Merge(CMSGame,{CONTENT:()=>`8c5602f47f158af57a2db271a8bf5185`,THEMECOLOUR:()=>`rgb(3,2,48)`,TITLE:()=>`Whirlpuzzle`,DATE:()=>"2018-03-01",TAGS:()=>[`Game`,`Puzzle`,`Puzzlescript`],ONE_LINER:()=>`<p>Find a path to the goal, by rotating the puzzle to displace obstacles and reach inaccessible locations! But beware, whirling too much will only confuse you… </p><p>Can you solve all 7 levels in ${v.TITLE_BOLD()}? Good luck!</p>`}),
"unlucky-unlock":Merge(CMSGame,{CONTENT:()=>`9ad4b5559a3e39d9ae0aa5829b02b473`,THEMECOLOUR:()=>`rgb(28,38,50)`,TITLE:()=>`Unlucky Unlock`,DATE:()=>"2014-07-18",TAGS:()=>[`Game`,`Puzzle`,`Puzzlescript`],FEATURED:()=>true,ONE_LINER:()=>`<p>${v.TITLE_BOLD()} is a simple mini game of the sliding block type. Moving the pieces to the right positions unlocks each next level.</p> <p>There are four easier levels + three harder levels.</p>`}),
"pmgrp":Merge(CMSGame,{CONTENT:()=>`de00799ea3c9bfb0be74d1030a04c142`,THEMECOLOUR:()=>`rgb(4,71,0)`,TITLE:()=>`Play Mini Gemini Replay (PMGRP)`,SHORTNAME:()=>`PMGRP`,DATE:()=>"2018-03-20",TAGS:()=>[`Game`,`Platformer`,`Puzzle`,`Puzzlescript`],FEATURED:()=>true,ONE_LINER:()=>`<p>${v.TITLE_BOLD()} is a mini puzzle platformer about cooperating with your future self to reach your goals.</p><p>Plan your limited moves wisely, play and replay all 11 levels!</p>`}),
"combinatura":Merge(WithImage,{IMAGE_EXT:()=>"png",POSTSCRIPT:()=>v.GAME_SCRIPT(),TITLE:()=>`Combinatura`,DATE:()=>"2018-07-06",TYPE:()=>`Game`,TAGS:()=>[`Game`,`Prototype`,`Nature`,`Travel`],ONE_LINER:()=>`<p>${v.TITLE_BOLD()} is an exploration game that emphasises <b>learning</b> and <b>curiosity</b> about <b>natural phenomena</b>, especially in the domains of astronomy, geology, meteorology and ecology. As many obscure phenomena are discoverable in-Game, ${v.TITLE_BOLD()} teaches everyone something about the natural word.</p>`,TAGLINE:()=>"a game of exploration"}),
"hastefulll":Merge(CMSGame,{CONTENT:()=>`8b10ae059158c0c4a93c05c9437d0706`,THEMECOLOUR:()=>`rgb(6,71,117)`,TITLE:()=>`Hastefulll`,DATE:()=>"2018-07-12",TAGS:()=>[`Game`,`Platformer`,`Puzzle`,`Puzzlescript`],FEATURED:()=>true,ONE_LINER:()=>`<p>${v.TITLE_BOLD()} is a simple 7-level puzzle platformer about trying to leave a mark everywhere, as fast as possible. However, too much haste may have negative consequences!</p><p>Fill the board, but plan wisely. Haste makes waste!</p>`}),
"tiaradventur":Merge(CMSGame,{CONTENT:()=>`04e9b3dc13d2708e64a0adc4ddb916a0`,THEMECOLOUR:()=>`rgb(133,0,38)`,TITLE:()=>`Tiaradventur`,DATE:()=>"2018-08-28",TAGS:()=>[`Game`,`Puzzle`,`Role-playing`,`Puzzlescript`],FEATURED:()=>true,ONE_LINER:()=>`<p>A desperate Princess, on a quest to find seven stolen tiaras, asks for your help. As a Hero in the making, you must not refuse, even in the face of danger! As the story unfolds, you may get to know the Princess better and understand what really is at stake.</p><p>The <em>legend of</em> ${v.TITLE_BOLD()} is yours to write! How much intelligence you dedicate to this <b>role-playing puzzle</b> is up to you...</p>`}),
"abxtract-tractx":Merge(CMSGame,{CONTENT:()=>`44de3ef66dcfdce30c1eec78c3ea201c`,THEMECOLOUR:()=>`rgb(255,215,162)`,TITLE:()=>`Abxtract Tractx`,DATE:()=>"2018-10-04",TAGS:()=>[`Art`,`Game`,`Puzzle`,`Puzzlescript`],FEATURED:()=>true,ONE_LINER:()=>`<p>Do you think Abstract Art is too simple to be considered art? Try reproducing all 6 iconic abstract paintings in the very puzzling ${v.TITLE_BOLD()}!</p>`}),
"gravirinth-legacy":Merge(CMSGame,{CONTENT:()=>`c29dda29b38d830d4f48e6578494fb35`,THEMECOLOUR:()=>`rgb(25,4,52)`,TITLE:()=>`Gravirinth Legacy`,DATE:()=>"2019-01-07",TAGS:()=>[`Game`,`Platformer`,`Puzzle`,`Puzzlescript`],FEATURED:()=>false,ONE_LINER:()=>`<p>According to legend, a forgotten civilization once mastered the power of gravity, which they used to travel across the Milky Way, in search for alien life. Eager at first to share their wisdom, soon they became aware that most alien life forms were not ready to receive this great power...</p><p>So an enigma was devised to test the intelligence of alien societies, a puzzle marvelous yet so obscure that finding it would be a challenge in the first place. Thus the <b>Gravirinth</b> were born, each hidden into the most promising solar systems.</p><p>In the next millennia, few <b>Gravirinth</b> were ever found, and even fewer yielded their secrets, a rare moment of great joy where two civilisations found they were not alone in the vast cosmos. In the Solar System too had once a <b>Gravirinth</b> been found, but its location was lost to mankind...</p><p><b>...until Xeno, the Exoarchaeologist, arrived.</b> Will the <b>Gravirinth</b> reveal its mysteries?</p>`,TRAILER:()=>"nq4ljKWdwsU",TRAILER_IMAGE:()=>"gravirinth/gravirinth-trailer.png",TAGLINE:()=>"an exoarchaeology expedition"}),
"gravirinth":Merge(CMSGame,{CONTENT:()=>`598580a1d8dbeb9b4a7e338527b44804`,THEMECOLOUR:()=>`rgb(25,4,52)`,TITLE:()=>`Gravirinth`,DATE:()=>"2020-09-26",TAGS:()=>[`Game`,`Platformer`,`Puzzle`,`Puzzlescript`],FEATURED:()=>true,ONE_LINER:()=>`<p>Inside the ${v.TITLE_BOLD()}, gravity is local. Manipulate it to collect all orbs!</p><p>This is a remake of the old ${AHTML("Gravirinth [Legacy]","gravirinth-legacy.html")}.</p>`,TAGLINE:()=>"Gravirinth remastered."}),
"gravirinth-log":Merge(WithImage,{TITLE:()=>`Gravirinth changelog`,SHORTNAME:()=>`Grav. Log`,DATE:()=>"2018-11-22",TAGS:()=>[`Creative-Archive`,`Log`,`Post`,`Puzzlescript`],IMAGE_EXT:()=>"png"}),
"platformer-template":Merge(CMSGame,{CONTENT:()=>`a59cd8147d80041f87181599f5d6cd2e`,THEMECOLOUR:()=>`rgb(96,197,154)`,TITLE:()=>`Platformer Template`,DATE:()=>"2019-04-22",TAGS:()=>[`Game`,`Platformer`,`Puzzle`,`Puzzlescript`],ONE_LINER:()=>`<p>${v.TITLE_BOLD()} is a puzzle about making puzzles. A meta-game that teaches players how to design a puzzle-platformer step by step.</p>`}),
"burokku-konekuta":Merge(CMSGame,{CONTENT:()=>`96384ea6851a66ff30c89a18995f5b8b`,THEMECOLOUR:()=>`rgb(55,199,199)`,TITLE:()=>`Burokku Konekuta`,DATE:()=>"2019-07-10",TAGS:()=>[`Game`,`Puzzle`,`Puzzlescript`],FEATURED:()=>true,ONE_LINER:()=>`<p>Tidiness rules in ${v.TITLE_BOLD()}. Connect all the scattered pieces together to regain the harmony within your puzzled mind. </p>`}),
"skilleblokker":Merge(CMSGame,{CONTENT:()=>`d4716388dfe54118a82d4e1ec5d60bc4`,THEMECOLOUR:()=>`rgb(189,224,255)`,TITLE:()=>`Skilleblokker`,DATE:()=>"2019-09-21",TAGS:()=>[`Game`,`Puzzle`,`Puzzlescript`],ONE_LINER:()=>`<p>It is time to disconnect with ${v.TITLE_BOLD()}, the opposite twin of Burokku Konekuta. Can you chill out and isolate every block or will you slip astray on the ice?</p>`}),
"strata-hedges":Merge(CMSGame,{CONTENT:()=>`74e3b230123627da73d1466eea865f5b`,THEMECOLOUR:()=>`rgb(0,101,101)`,TITLE:()=>`Strata Hedges`,DATE:()=>"2020-03-29",TAGS:()=>[`3D`,`Game`,`Prototype`,`Puzzle`,`Puzzlescript`],ONE_LINER:()=>`<p>The gardens in ${v.TITLE_BOLD()} have many dimensions. Sharpen your eyes and keep all in perspective!</p>`}),
"starkoban":Merge(CMSGame,{CONTENT:()=>`f20996db777cfb6f5725fd27c4268cf3`,THEMECOLOUR:()=>`rgb(55,55,55)`,TITLE:()=>`Starkoban`,DATE:()=>"2020-11-14",TAGS:()=>[`Game`,`Puzzle`,`Puzzlescript`],FEATURED:()=>true,ONE_LINER:()=>`<p>${v.TITLE_BOLD()} is a challenging mix of star battle and sokoban, for stark puzzlers.</p>`}),
"puzzle-type":Merge(CMSGame,{PRESCRIPT:()=>["data/store.js"],POSTSCRIPT:()=>v.GAME_SCRIPT(),TITLE:()=>`Puzzle type`,DATE:()=>"2019-11-10",TAGS:()=>[`Game`,`Puzzle`],FEATURED:()=>true,IMAGE_EXT:()=>`gif`,ONE_LINER:()=>`<p>A <b>single clue</b> reveals the <b>hidden typing rule</b>. Explore each puzzle to discover its rule. To win, type the clue exactly as shown: <b>every symbol counts</b>!</p>`,ORIENTATION:()=>`portrait`,FEEDBACK_KEY:()=>`${KB("Ctrl E")}`,FULLSCREEN_KEY:()=>`${KB("Ctrl F")}`,HINT_KEY:()=>`${KB("Ctrl H")}`,LEVEL_KEY:()=>`${KB("Ctrl L")}`,MUSIC_KEY:()=>`${KB("Ctrl M")}`}),
"terms-of-use":Merge(NoImage,{TITLE:()=>`Terms of use`,DATE:()=>"2017-11-30",TAGS:()=>[`Creative-Archive`,`Post`]}),
"privacy-policy":Merge(NoImage,{TITLE:()=>`Privacy Policy`,DATE:()=>"2018-02-10",TAGS:()=>[`Creative-Archive`,`Post`]}),
"subscribe":Merge(WithImage,{TITLE:()=>`Subscribe`,DATE:()=>"2018-12-06",TAGS:()=>[`Creative-Archive`,`Post`],IMAGE_ALT:()=>`Subscribe to ${v.SITE_NAME()} news!`,DESCRIPTION:()=>`Curious about the next project by ${v.NAME()}? Subscribe to ${v.SITE_NAME()}!`}),
"rss":Merge(NoImage,{BODY:()=>`${v.RSS()}`,TYPE:()=>`RSS`,TYPEGRAPH:()=>`website`,EXT:()=>`xml`}),
"tag":Merge(NoImage,{BODY:()=>v.PAGE_SIMPLE(),CONTENT:()=>TagPageHTML(),STYLE:()=>`archive`,TITLE:()=>PageTagText(),FREQ:()=>`monthly`,TYPE:()=>`Tag`,TAGS:()=>[`Class`],DESCRIPTION:()=>`All tagged posts in the ${v.SITE_NAME()}`,TYPEGRAPH:()=>"site"}),
"generator":Merge(NoImage,{POSTSCRIPT:()=>["data/news.js"],TITLE:()=>`${v.SITE_NAME()} Generator`,DATE:()=>"2020-03-26",TAGS:()=>[`Creative-Archive`,`Sitemap`],ONE_LINER:()=>`Generate ${v.SITE_NAME()}'s pages such as sitemap, rss and more!`}),
"analytics":Merge(NoImage,{FEATURED:()=>false,POSTSCRIPT:()=>["codes/game/modules/data-game-colours.js","data/worldmap.js"],TITLE:()=>`Analytics dashboard`,DATE:()=>"2020-05-05",TYPE:()=>`Backend`,TAGS:()=>[`Creative-Archive`,`Sitemap`],ONE_LINER:()=>`Analytics dashboard of the ${v.SITE_NAME()}`}),
"videoplaytesting-tips":Merge(WithImagePNG,{TITLE:()=>`Videoplaytesting Tips`,DATE:()=>"2020-08-29",TAGS:()=>[`List`,`Post`],ONE_LINER:()=>`Would you like to videoplaytest a game but not sure how to go about it? Here are some tips!`}),

"star-battle":Merge(WithImagePNG,{POSTSCRIPT:()=>["codes/game/star-battle/hyper-loader.js"],TITLE:()=>`Star Battle geometries`,DATE:()=>"2020-06-18",TYPE:()=>`Post`,TAGS:()=>[`Paper`,`Puzzle`],ONE_LINER:()=>`What if you could play <b>Star Battle</b> on <em>different geometries</em>? Now you can!`}),
"kudamono":Merge(WithImagePNG,{TITLE:()=>`Kudamono fruit puzzles`,DATE:()=>"2020-12-18",TYPE:()=>`Post`,TAGS:()=>[`Paper`,`Puzzle`],ONE_LINER:()=>`Kudamono (fruits) is a paper puzzle, where you draw lines to connect fruits, with different rules for different fruit types.`}),
"thinky-collective":Merge(WithImagePNG,{TITLE:()=>`Thinky Collective`,DATE:()=>"2019-10-21",TYPE:()=>`Post`,TAGS:()=>[`Post`,`List`],ONE_LINER:()=>`The ${v.TITLE_BOLD()} is a distributed group of puzzle enthusiasts, that produced a puzzlescript game series using an "exquisite corpse" methodology.`}),
"bonsai":Merge(WithImagePNG,{TITLE:()=>`Bonsai Gardening puzzles`,DATE:()=>"2021-01-30",TYPE:()=>`Post`,TAGS:()=>[`Paper`,`Puzzle`],ONE_LINER:()=>`Bonsai Gardening is a paper puzzle where you must draw the perfect bonsai.`}),

}

Keys(CMS).map(l=>CMS[l].LINK=()=>l);


//Labels

PageLabelsHTML=function(page){
	var tags=page.TAGS?page.TAGS():[];
	var time=`
		<time datetime="${page.DATE()}">
			${StringDateName(page.DATE())}
		</time>
	`;
	var date=!page.DATE?"":AnchorHTML(time,"posts.html",{"class":"tag button selectable"});

	return `
	<div class="tags buttonrow">
		${date}
		${tags.map(TagLabelHTML).join(`
		`)}
	</div>`

}

TagLabelHTML=function(tag){
	return AHTML(tag,"tag.html?search="+tag,{"class":"tag button"});
}



//Index pages

PageObj=function(id){
	return Values(FilterObject(CMS,p=>(p.LINK()===id)))[0];
}

Access=function(page,field){
	return PageObj(page)[field]();
}

CMSOptionsObj=function(){
	return{
		Source:CMS,
		Orderer:PageElapsedDays,
		ItemHTML:PageCardHTML
	};
}

PageElapsedDays=function(page){
	return -1*PageDate(Merge({DATE:()=>"01/01/0000"},page));
}

PageDate=function(page){
	if(!page||!page.DATE)
		return Today();
	return StringDate(page.DATE());
}


PageBiTagArray=function(){
	var tags=PageSearch("search");
		return Complement(tags.split("+"),["","Class"]);
}

PageTagArray=function(){
	return PageBiTagArray().filter(t=>!Prefixed(t,"!"));
}

PageUnTagArray=function(){
	return PageBiTagArray().filter(t=>Prefixed(t,"!")).map(t=>UnPrefix(t,"!"));
}

PageTagText=function(){
	var tags=PageTagArray();
	var untags=PageUnTagArray();
	if(!tags.length&&!untags.length)
		return "All pages";
	if(!untags.length)
		return `Classed as ${Enumerate(tags)}`
	if(!tags.length)
		return `Not classed as ${Enumerate(untags)}`
	else
		return `Classed as ${Enumerate(tags)} but not as ${Enumerate(untags)}`
}


TagPageHTML=function(){
	var tags=PageTagArray();
	var untags=PageUnTagArray();
	function HasTag(PageObj){
		if(!PageObj.TAGS)
			return false;
		var pagetags=PageObj.TAGS().map(LowerSimpleString);
		return tags.every(tag=>In(pagetags,LowerSimpleString(tag)))&&
				untags.every(tag=>!In(pagetags,LowerSimpleString(tag)))
			;};
	return SectionHTML(Merge(CMSOptionsObj(),{FilterF:HasTag}));
}

PageCardHTML=function(page){
	var page=Merge(v,page);
	var size=180;
	var path=ImagePath(page.IMAGE_NAME(page),page.IMAGE_EXT(),size);
	
	var id=GenerateId();
	LazyImageLoader(id,path);
	
	var card=`
		<div class="card">
			<h3>${page.TITLE()}</h3>
			<img id="${id}" class="image" width="${size}" height="${size}" alt="${page.IMAGE_ALT(page)}" title="${page.IMAGE_ALT(page)}" loading="lazy"/>
		</div>`;

	return AnchorHTML(card,page.LINK()+".html",{"class":"card-supra underborderable"});
}

MiniCardHTML=function(page){
	var page=Merge(v,page);

	var size=180;
	var path=ImagePath(page.IMAGE_NAME(page),page.IMAGE_EXT(),size);
	var id=GenerateId();
	LazyImageLoader(id,path);
	var img=`<img id=${id} class="image" width="${size}" height="${size}" alt="${page.IMAGE_ALT(page)}" title="${page.IMAGE_ALT(page)}" loading="lazy"/>`;
		img=AnchorHTML(img,link)

	var link=page.LINK()+".html";
	var title=AnchorHTML(`<h3>${page.TITLE()}</h3>`,link);
	
	return`
	<div class="mini selectable underborderable">
		<div>
			${title}
			${PageLabelsHTML(page)}
		</div>
		${img}
	</div>`;
}

ImagePath=function(name,ext,size){
	var folder="images/";
	var size=size?size+"/":"";
	if(ext!=="svg")
		folder=folder+size;
	return `${folder}${name}.${ext}`;
}

LatestHTML=function(){
	var CMSOptions=CMSOptionsObj();
	return SectionHTML(Merge(CMSOptions,{
		exclude:{FEATURED:()=>false},
		header:`<h1 class="title">Latest posts</h1>`,
		ItemHTML:MiniCardHTML,
		max:12,
		InnerWrapper:(latest)=>`<div class="latest">${latest}</div>`,
		footer:`<div class="whiteboard"><div class="text"><p>See all ${AHTML("older posts","tag.html?search=!sitemap+!class")}.</div></div>`,
	}))
}

HighlightsHTML=function(){
	var CMSOptions=CMSOptionsObj();
	return SectionHTML(Merge(CMSOptions,{
		include:{FEATURED:()=>true,TYPE:()=>`Game`},
		header:`<h1 class="title">Chosen games</h1>`,
		InnerWrapper:(latest)=>`<div class="featured">${latest}</div>`,
		footer:`<div class="whiteboard"><div class="text"><p> Chosen from the full list of ${v.A_GAMES()}.</div></div>`,
	}))
}

PopularHTML=function(){
	var CMSOptions=CMSOptionsObj();
	
	return SectionHTML(Merge(CMSOptions,{
		FilterF:function(PageObj){ var PageObj=Merge(v,PageObj); return PageObj.TYPE()!=="Game"&&PageObj.FEATURED&&PageObj.FEATURED();},
		header:`<h1 class="title">Popular projects</h1>`,
		InnerWrapper:(latest)=>`<div class="featured">${latest}</div>`
	}))
}

CMSTags=function(){
	tags=[];
	Values(CMS).map(p=>(tags=Union(tags,p.TAGS?p.TAGS():[])));
	return tags;
}

ArchiveYearHTML=function(year){
	function InYear(PageObj){return PageObj.YEAR&&PageObj.YEAR()===year;};
	var CMSOptions=CMSOptionsObj();
	return SectionHTML(Merge(CMSOptions,{
		header:`<h2 class="archive-year">${year}</h2>`,
		FilterF:InYear,
		InnerWrapper:(latest)=>`<div class="featured">${latest}</div>`,
	}))
}

PostPageHTML=function(){
	var years=[];
	function GetYear(PageObj){
		if(PageObj.YEAR)
			years=Union(years,[PageObj.YEAR()])
	}
	FilterObject(CMS,GetYear);
	years=Reverse(Sort(years));
	return years.map(ArchiveYearHTML).join("\n");
}


InlineSVG=function(){
	var images=GetElements("img");
	function ReplaceSource(img){
		var src=img.src;
		var alt=img.alt;
		var title=img.title;
		function ReplaceSVG(svgHTML){
			var palette={
				"\"#002060\"":`"#002060- class="darkblue"`,
				"\"#1A00DA\"":`"#1A00DA- class="blue"`,
				"\"#0098F6\"":`"#0098F6- class="lightblue"`,
				"\"#0CFCBD\"":`"#0CFCBD- class="turquoise"`,
				"\"#5DFF61\"":`"#5DFF61- class="green"`,
				"\"#E9FE90\"":`"#E9FE90- class="yellow"`,
				"\"#FFF9C8\"":`"#FFF9C8- class="lightyellow"`,
				"\"#FFF0e5\"":`"#FFF0e5- class="beije"`
			}
			svgHTML=StringReplace(StringReplace(svgHTML,palette),{"- class":"\" class"});
			svgHTML=svgHTML.replace(/svg width=..?(\d*)..? height=..?(\d*)..?/g,`svg class="image" viewbox="0 0 1080 1080" width="100" height="100"`);
			ReplaceElement(svgHTML,img)
		};
		if(Posfixed(src,".svg")){
			LoadData(src,ReplaceSVG)
		}
	}
	images.map(ReplaceSource);
}

CMSObject=function(title){
	var o=BaseFilter(CMS,o=>Evaluate(o.TITLE)&&LowerSimpleString(Evaluate(o.TITLE))===LowerSimpleString(title)||LowerSimpleString(Evaluate(o.LINK))===LowerSimpleString(title));
	if(o.length)
		return First(o);
}

//Abreviation - Links
A=function(link){
	if(PageSimpleIdentifier(link)===PageSimpleIdentifier()&&PageFragment(link))
		return A(Prefix(PageFragment(link),"#"));
	
	var cmslink=CMSObject(PageSimpleIdentifier(link));
	if(cmslink){
		var fragment=PageFragment(link);
		if(fragment)
			return AHTML(CapitaliseSentence(fragment.replace("-"," ")),PageReFragment(Posfix(cmslink.LINK(),".html"),fragment));
		else
			return AHTML(cmslink.TITLE(),Posfix(cmslink.LINK(),".html"));
	}
	else
		return AHTML(link);
}




ExportCMSProperties=function(){
	Page=PageObj(PageIdentifier());
	DATA["page"]=Page;
	DATA["cms"]=CMS;
}

ExportCMSProperties();
Shout("cms");
ExportNodeFunctions();