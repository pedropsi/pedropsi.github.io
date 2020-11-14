NoImage={IMAGE_NAME:()=>"splash",IMAGE_EXT:()=>"svg"};
WithImage={IMAGE_NAME:(v)=>v.LINK(v),IMAGE_EXT:()=>"svg",IMAGE_ALT:(v)=>v.TITLE(v)};

CMSMosaic={...WithImage,BODY:()=>v.PAGE_SIMPLE(),CONTENT:()=>v.FIGURE_MOSAIC(),POSTSCRIPT:()=>["data/communication-mosaic.js"],STYLE:()=>`visual`,TYPE:()=>`Mosaic`,TYPEGRAPH:()=>`image`,IMAGE_EXT:()=>`png`};
CMSGame={...WithImage,POSTSCRIPT:()=>v.PUZZLE_SCRIPT(),TYPE:()=>`Game`,CATEGORIES:()=>[`entertainment`,`kids`,`games`],TYPEGRAPH:()=>`game`,MANIFEST:()=>v.PWA_MANIFEST(),IMAGE_EXT:()=>`png`};


CMS={
P_index:{...NoImage,BODY:()=>v.POST(),LINK:()=>`index`,TITLE:()=>v.SITE_NAME(),DAY:()=>`1`,MONTH:()=>`12`,YEAR:()=>`2017`,TYPE:()=>`Home`,TAGS:()=>[`Sitemap`],DESCRIPTION:()=>`${v.SITE_NAME()} home page.`,TYPEGRAPH:()=>`website`},
P_purpose:{...NoImage,LINK:()=>`purpose`,TITLE:()=>`The purpose of the ${v.SITE_NAME()}`,SHORTNAME:()=>`Purpose`,DAY:()=>`1`,MONTH:()=>`12`,YEAR:()=>`2017`,TAGS:()=>[`Creative-Archive`,`Post`],ONE_LINER:()=>`${v.SITE_NAME()}'s first post!`},
P_support:{...NoImage,LINK:()=>`support`,TITLE:()=>`Support the ${v.SITE_NAME()}`,SHORTNAME:()=>`Suport`,DAY:()=>`8`,MONTH:()=>`2`,YEAR:()=>`2018`,TAGS:()=>[`Creative-Archive`,`Finance`,`Post`],ONE_LINER:()=>`Support the ${v.SITE_NAME()}!`},
P_making_of:{...NoImage,LINK:()=>`making-of`,TITLE:()=>`The making of the ${v.SITE_NAME()}`,SHORTNAME:()=>`making-of`,DAY:()=>`15`,MONTH:()=>`12`,YEAR:()=>`2019`,TAGS:()=>[`Creative-Archive`,`Finance`,`Post`],ONE_LINER:()=>`Support the ${v.SITE_NAME()}!`},
P_wikipedia_donation:{...NoImage,LINK:()=>`wikipedia-donation`,TITLE:()=>`My first wikipedia donation`,SHORTNAME:()=>`Donation`,DAY:()=>`4`,MONTH:()=>`1`,YEAR:()=>`2018`,TAGS:()=>[`Finance`,`Post`],ONE_LINER:()=>`My first wikipedia donation.`},
P_selected_puzzlescript_games:{...WithImage,LINK:()=>`selected-puzzlescript-games`,FEATURED:()=>true,PRESCRIPT:()=>["data/selected-puzzlescript-games.js"],TITLE:()=>`Selected Puzzlescript Games 2014-${Year()}`,SHORTNAME:()=>`Selected PS Games`,DAY:()=>`31`,MONTH:()=>`1`,YEAR:()=>`2019`,TAGS:()=>[`List`,`Post`,`Puzzlescript`],ONE_LINER:()=>`This is a <em>short</em> list of <em>very good</em> puzzlescript games, in ${v.MY()} opinion. It serves as a <em>${v.PERSONAL()}</em>, yet publicly shared, reference (to be updated whenever needed).`},
P_11_lessons_from_11_games:{...WithImage,LINK:()=>`11-lessons-from-11-games`,TITLE:()=>`11 Lessons from a 11-game-making journey`,SHORTNAME:()=>`Lessons`,DAY:()=>`14`,MONTH:()=>`4`,YEAR:()=>`2019`,TAGS:()=>[`Game`,`Learning`,`List`,`Post`]},
P_a_game_making_journey:{...WithImage,LINK:()=>`a-game-making-journey`,TITLE:()=>`A game-making journey`,SHORTNAME:()=>`Journey`,DAY:()=>`14`,MONTH:()=>`4`,YEAR:()=>`2019`,TAGS:()=>[`Game`,`Learning`,`List`,`Log`,`Post`,`Puzzlescript`]},
P_game_bar:{...WithImage,LINK:()=>`game-bar`,FEATURED:()=>true,TITLE:()=>`Game Bar`,DAY:()=>`27`,MONTH:()=>`7`,YEAR:()=>`2019`,TAGS:()=>[`Resource`,`Tutorial`,`Puzzlescript`]},
P_puzzlescript_games_database:{...WithImage,LINK:()=>`puzzlescript-games-database`,FEATURED:()=>true,BODY:()=>v.PAGE_BARE(),CONTENT:()=>v.SECTION_OUT()+v.SECTION_OUT(v.WHITEBOARD()),POSTSCRIPT:()=>[`data/puzzlescript-database-game.js`],PRESCRIPT:()=>[`data/puzzlescript-database.js`],TITLE:()=>`Puzzlescript games database`,SHORTNAME:()=>`PS database`,DAY:()=>`10`,MONTH:()=>`10`,YEAR:()=>`2019`,TAGS:()=>[`Community`,`List`,`Puzzlescript`],ONE_LINER:()=>`This aims to be the definitive list of all (public) puzzlescript games, ever made, worldwide. Even the terrible ones qualify!`,DESCRIPTION:()=>`The complete list of all puzzlescript games, good or bad.`},
P_game_tools:{...WithImage,LINK:()=>`game-tools`,POSTSCRIPT:()=>[`data/puzzlescript-database-component.js`],PRESCRIPT:()=>[`data/puzzlescript-database.js`],TITLE:()=>`Game tools`,DAY:()=>`12`,MONTH:()=>`10`,YEAR:()=>`2019`,TAGS:()=>[`Community`,`List`,`Log`,`Post`,`Puzzlescript`,`Resource`],ONE_LINER:()=>`Useful tools to make games, including puzzlescript forks, wrappers and puzzlescript sprite editors.`},
P_game_console:{...CMSGame,LINK:()=>`game-console`,POSTSCRIPT:()=>v.PUZZLE_SCRIPT().concat([`data/puzzlescript-database-game.js`]),PRESCRIPT:()=>[`data/puzzlescript-database.js`],TITLE:()=>`Game Console`,DAY:()=>`29`,MONTH:()=>`10`,YEAR:()=>`2019`,TYPE:()=>`Console`,TAGS:()=>[`Community`,`Puzzlescript`,`Resource`],ONE_LINER:()=>`Load any puzzlescript game in ${v.NAME()}'s console and to use the game bar!`,TYPEGRAPH:()=>`website`,IMAGE_EXT:()=>"svg"},
//P_game_editor:{...WithImage,LINK:()=>`game-editor`,HEAD:()=>v.HEAD_BARE(),BODY:()=>v.PAGE_UNSTYLED(),CONTENT:()=>v.POST(),TITLE:()=>`Game Editor`,SHORTNAME:()=>`Game Editor`,FREQ:()=>`monthly`,DAY:()=>`2`,MONTH:()=>`2`,YEAR:()=>`2020`,TYPE:()=>`Console`,TAGS:()=>[`Resource`,`Puzzlescript`],ONE_LINER:()=>`An adapted puzzlescript game editor, adding the game bar by default.`,DESCRIPTION:()=>`An adapted puzzlescript game editor, adding the game bar by default.`,TYPEGRAPH:()=>`site`},
P_status:{...WithImage,LINK:()=>`status`,POSTSCRIPT:()=>["codes/test/test.js"],TITLE:()=>`Status`,DAY:()=>`25`,MONTH:()=>`11`,YEAR:()=>`2019`,TAGS:()=>[`Creative-Archive`,`Resource`,`Sitemap`],ONE_LINER:()=>`Test whether every ${v.SITE_NAME()} function is supported in your browser.`},
P_lul:{...WithImage,LINK:()=>`lul`,TITLE:()=>`Level unlocking language`,SHORTNAME:()=>`LUL`,DAY:()=>`30`,MONTH:()=>`11`,YEAR:()=>`2019`,TAGS:()=>[`Prototype`,`Resource`,`Tutorial`],ONE_LINER:()=>`${v.TITLE()} (LUL) is a simple language to express level precedence rules, also known as level unlocking conditions.`},
P_store:{...WithImage,LINK:()=>`store`,BODY:()=>v.PAGE_BARE(),CONTENT:()=>v.POST(),PRESCRIPT:()=>[/*"https://js.stripe.com/v3",*/"data/store.js"],STYLE:()=>`store`,TITLE:()=>`Store`,DAY:()=>`27`,MONTH:()=>`11`,YEAR:()=>`2019`,TYPE:()=>`Store`,TAGS:()=>[`Creative-Archive`,`Finance`,`List`,`Sitemap`],ONE_LINER:()=>`Shop for exclusive ${v.NAME()} games and more!`,TYPEGRAPH:()=>`site`},
P_press:{...WithImage,LINK:()=>`press`,TITLE:()=>`Press kit`,DAY:()=>`2`,MONTH:()=>`2`,YEAR:()=>`2019`,TYPE:()=>`Post`,TAGS:()=>[`Creative-Archive`,`Press`,`Sitemap`],TYPEGRAPH:()=>`site`},
P_news:{...WithImage,LINK:()=>`news`,TITLE:()=>`News`,DAY:()=>`20`,MONTH:()=>`9`,YEAR:()=>`2019`,TYPE:()=>`Archive`,TAGS:()=>[`Creative-Archive`,`Log`,`Post`,`Press`,`Sitemap`],IMAGE_ALT:()=>`${v.SITE_NAME()} News`,TYPEGRAPH:()=>`site`},

P_mosaic:{...WithImage,IMAGE_NAME:()=>"fleur-de-lis",IMAGE_EXT:()=>"png",LINK:()=>`mosaic`,TITLE:()=>`Mosaic wallpaper gallery`,DAY:()=>`14`,MONTH:()=>`2`,YEAR:()=>`2018`,TAGS:()=>[`Art`,`Travel`,`Wallpaper`],IMAGE_ALT:()=>`Wallpaper gallery`},

P_about:{...NoImage,LINK:()=>`about`,CONTENT:()=>v.POST(),TITLE:()=>`About`,DAY:()=>`2`,MONTH:()=>`2`,YEAR:()=>`2018`,TAGS:()=>[`Creative-Archive`,`Post`],TYPEGRAPH:()=>`profile`},
P_404:{...NoImage,LINK:()=>`404`,BODY:()=>v.PAGE_SIMPLE(),CONTENT:()=>v.POST(),TITLE:()=>`Page not found….`,SHORTNAME:()=>`404`,DAY:()=>`1`,MONTH:()=>`12`,YEAR:()=>`2017`,TYPE:()=>`Backend`,TAGS:()=>[`Sitemap`],DESCRIPTION:()=>`Page not found in ${v.SITE_NAME()}.`,TYPEGRAPH:()=>`website`},
P_guestbook:{...WithImage,LINK:()=>`guestbook`,BODY:()=>v.PAGE_BARE(),CONTENT:()=>v.GUESTBOOK_AREA(),TITLE:()=>`Guestbook`,DAY:()=>`22`,MONTH:()=>`7`,YEAR:()=>`2018`,TYPE:()=>`Guestbook`,TAGS:()=>[`Creative-Archive`],IMAGE_ALT:()=>`Write your message on the ${v.SITE_NAME()}'s guestbook!`,DESCRIPTION:()=>`The Guestbook of the ${v.SITE_NAME()}!`,TYPEGRAPH:()=>`website`},
P_contact:{...NoImage,LINK:()=>`contact`,TITLE:()=>`Contact`,TYPE:()=>`Backend`,TAGS:()=>[`Creative-Archive`],DESCRIPTION:()=>`Leave a message to contact ${v.NAME()}`,TYPEGRAPH:()=>`website`},
P_hall_of_fame:{...WithImage,LINK:()=>`hall-of-fame`,BODY:()=>v.PAGE_BARE(),CONTENT:()=>v.TABULAR_AREA(),POSTSCRIPT:()=>["data/communication-hof.js"],TITLE:()=>`Hall of Fame`,SHORTNAME:()=>`HOF`,DAY:()=>`26`,MONTH:()=>`3`,YEAR:()=>`2018`,TYPE:()=>`Hall of Fame`,TAGS:()=>[`Creative-Archive`,`Community`],IMAGE_ALT:()=>`Hall of fame of the ${v.SITE_NAME()}. Laurel and stars.`,ONE_LINER:()=>`<p>Puzzlers who solved any of the puzzles in the ${v.SITE_NAME()} earn the right to record their name (or alias) for posterity in the ${AHTML("hall-of-fame")}.</p>`,DESCRIPTION:()=>`Hall of fame: winners of ${v.NAME()}'s challenges.`,TYPEGRAPH:()=>`website`},
P_hall_of_fame_global:{...WithImage,LINK:()=>`hall-of-fame-global`,BODY:()=>v.PAGE_BARE(),CONTENT:()=>v.TABULAR_AREA(),POSTSCRIPT:()=>["data/communication-hof.js"],TITLE:()=>`Hall of Fame (global)`,SHORTNAME:()=>`HOFG`,DAY:()=>`24`,MONTH:()=>`5`,YEAR:()=>`2020`,TYPE:()=>`Hall of Fame`,TAGS:()=>[`Community`],IMAGE_ALT:()=>`Hall of fame (global). Laurel and stars.`,ONE_LINER:()=>`<p>After beating a game listed in the ${AHTML("Puzzlescript Games Database","puzzlescript-games-database.html")}, puzzlers anywhere in the globe may add their name (or alias) to this ${v.TITLE_BOLD()}.</p>`,DESCRIPTION:()=>`Hall of fame: global winners.`,TYPEGRAPH:()=>`website`},
P_tetrastrophe:{...CMSGame,LINK:()=>`tetrastrophe`,CONTENT:()=>`f60664326442967c1fcd97bb36f1af94`,THEMECOLOUR:()=>`rgb(112,84,0)`,TITLE:()=>`Tetrastrophe`,DAY:()=>`14`,MONTH:()=>`5`,YEAR:()=>`2014`,TAGS:()=>[`Game`,`Platformer`,`Puzzle`,`Puzzlescript`],ONE_LINER:()=>`<p>Blocks are falling from the sky! Reach the <em>flag</em> to avoid a catastrophe! There are 10 levels before reaching absolute safety.</p>`},
P_blockworks:{...CMSGame,LINK:()=>`blockworks`,CONTENT:()=>`f9eb8a3e60ba1328a84c3e84db27563a`,THEMECOLOUR:()=>`rgb(69,0,0)`,TITLE:()=>`Blockworks`,DAY:()=>`4`,MONTH:()=>`2`,YEAR:()=>`2018`,TAGS:()=>[`Game`,`Platformer`,`Puzzle`,`Puzzlescript`],ONE_LINER:()=>`<p>Place the blue <em>X Block</em> at the <em>goal</em> (white arrow).Take advantage of auxiliary blocks by thinking creatively and acting timely.</p><p>8 levels only comprise this action puzzle. Good luck!</p>`},
P_whirlpuzzle:{...CMSGame,LINK:()=>`whirlpuzzle`,CONTENT:()=>`8c5602f47f158af57a2db271a8bf5185`,THEMECOLOUR:()=>`rgb(3,2,48)`,TITLE:()=>`Whirlpuzzle`,DAY:()=>`1`,MONTH:()=>`3`,YEAR:()=>`2018`,TAGS:()=>[`Game`,`Puzzle`,`Puzzlescript`],ONE_LINER:()=>`<p>Find a path to the goal, by rotating the puzzle to displace obstacles and reach inaccessible locations! But beware, whirling too much will only confuse you… </p><p>Can you solve all 7 levels in ${v.TITLE_BOLD()}? Good luck!</p>`},
P_unlucky_unlock:{...CMSGame,LINK:()=>`unlucky-unlock`,CONTENT:()=>`9ad4b5559a3e39d9ae0aa5829b02b473`,THEMECOLOUR:()=>`rgb(28,38,50)`,TITLE:()=>`Unlucky Unlock`,DAY:()=>`18`,MONTH:()=>`7`,YEAR:()=>`2014`,TAGS:()=>[`Game`,`Puzzle`,`Puzzlescript`],FEATURED:()=>true,ONE_LINER:()=>`<p>${v.TITLE_BOLD()} is a simple mini_Game of the sliding block type. Moving the pieces to the right positions unlocks each next level.</p> <p>There are four easier levels + three harder levels.</p>`},
P_pmgrp:{...CMSGame,LINK:()=>`pmgrp`,CONTENT:()=>`de00799ea3c9bfb0be74d1030a04c142`,THEMECOLOUR:()=>`rgb(4,71,0)`,TITLE:()=>`Play Mini Gemini Replay (PMGRP)`,SHORTNAME:()=>`PMGRP`,DAY:()=>`20`,MONTH:()=>`3`,YEAR:()=>`2018`,TAGS:()=>[`Game`,`Platformer`,`Puzzle`,`Puzzlescript`],FEATURED:()=>true,ONE_LINER:()=>`<p>${v.TITLE_BOLD()} is a mini puzzle platformer about cooperating with your future self to reach your goals.</p><p>Plan your limited moves wisely, play and replay all 11 levels!</p>`},
P_combinatura:{...WithImage,IMAGE_EXT:()=>"png",LINK:()=>`combinatura`,POSTSCRIPT:()=>v.GAME_SCRIPT(),TITLE:()=>`Combinatura`,DAY:()=>`6`,MONTH:()=>`7`,YEAR:()=>`2018`,TYPE:()=>`Game`,TAGS:()=>[`Game`,`Prototype`,`Nature`,`Travel`],ONE_LINER:()=>`<p>${v.TITLE_BOLD()} is an exploration game that emphasises <b>learning</b> and <b>curiosity</b> about <b>natural phenomena</b>, especially in the domains of astronomy, geology, meteorology and ecology. As many obscure phenomena are discoverable in-Game, ${v.TITLE_BOLD()} teaches everyone something about the natural word.</p>`,TAGLINE:()=>"a game of exploration"},
P_hastefulll:{...CMSGame,LINK:()=>`hastefulll`,CONTENT:()=>`8b10ae059158c0c4a93c05c9437d0706`,THEMECOLOUR:()=>`rgb(6,71,117)`,TITLE:()=>`Hastefulll`,DAY:()=>`12`,MONTH:()=>`7`,YEAR:()=>`2018`,TAGS:()=>[`Game`,`Platformer`,`Puzzle`,`Puzzlescript`],FEATURED:()=>true,ONE_LINER:()=>`<p>${v.TITLE_BOLD()} is a simple 7-level puzzle platformer about trying to leave a mark everywhere, as fast as possible. However, too much haste may have negative consequences!</p><p>Fill the board, but plan wisely. Haste makes waste!</p>`},
P_tiaradventur:{...CMSGame,LINK:()=>`tiaradventur`,CONTENT:()=>`04e9b3dc13d2708e64a0adc4ddb916a0`,THEMECOLOUR:()=>`rgb(133,0,38)`,TITLE:()=>`Tiaradventur`,DAY:()=>`28`,MONTH:()=>`8`,YEAR:()=>`2018`,TAGS:()=>[`Game`,`Puzzle`,`Role-playing`,`Puzzlescript`],FEATURED:()=>true,ONE_LINER:()=>`<p>A desperate Princess, on a quest to find seven stolen tiaras, asks for your help. As a Hero in the making, you must not refuse, even in the face of danger! As the story unfolds, you may get to know the Princess better and understand what really is at stake.</p><p>The <em>legend of</em> ${v.TITLE_BOLD()} is yours to write! How much intelligence you dedicate to this <b>role-playing puzzle</b> is up to you...</p>`},
P_abxtract_tractx:{...CMSGame,LINK:()=>`abxtract-tractx`,CONTENT:()=>`44de3ef66dcfdce30c1eec78c3ea201c`,THEMECOLOUR:()=>`rgb(255,215,162)`,TITLE:()=>`Abxtract Tractx`,DAY:()=>`4`,MONTH:()=>`10`,YEAR:()=>`2018`,TAGS:()=>[`Art`,`Game`,`Puzzle`,`Puzzlescript`],FEATURED:()=>true,ONE_LINER:()=>`<p>Do you think Abstract Art is too simple to be considered art? Try reproducing all 6 iconic abstract paintings in the very puzzling ${v.TITLE_BOLD()}!</p>`},
P_gravirinth_legacy:{...CMSGame,LINK:()=>`gravirinth-legacy`,CONTENT:()=>`c29dda29b38d830d4f48e6578494fb35`,THEMECOLOUR:()=>`rgb(25,4,52)`,TITLE:()=>`Gravirinth Legacy`,DAY:()=>`7`,MONTH:()=>`1`,YEAR:()=>`2019`,TAGS:()=>[`Game`,`Platformer`,`Puzzle`,`Puzzlescript`],FEATURED:()=>false,ONE_LINER:()=>`<p>According to legend, a forgotten civilization once mastered the power of gravity, which they used to travel across the Milky Way, in search for alien life. Eager at first to share their wisdom, soon they became aware that most alien life forms were not ready to receive this great power...</p><p>So an enigma was devised to test the intelligence of alien societies, a puzzle marvelous yet so obscure that finding it would be a challenge in the first place. Thus the <b>Gravirinth</b> were born, each hidden into the most promising solar systems.</p><p>In the next millennia, few <b>Gravirinth</b> were ever found, and even fewer yielded their secrets, a rare moment of great joy where two civilisations found they were not alone in the vast cosmos. In the Solar System too had once a <b>Gravirinth</b> been found, but its location was lost to mankind...</p><p><b>...until Xeno, the Exoarchaeologist, arrived.</b> Will the <b>Gravirinth</b> reveal its mysteries?</p>`,TRAILER:()=>"nq4ljKWdwsU",TRAILER_IMAGE:()=>"gravirinth/gravirinth-trailer.png",TAGLINE:()=>"an exoarchaeology expedition"},
P_gravirinth:{...CMSGame,LINK:()=>`gravirinth`,CONTENT:()=>`598580a1d8dbeb9b4a7e338527b44804`,THEMECOLOUR:()=>`rgb(25,4,52)`,TITLE:()=>`Gravirinth`,DAY:()=>`26`,MONTH:()=>`9`,YEAR:()=>`2020`,TAGS:()=>[`Game`,`Platformer`,`Puzzle`,`Puzzlescript`],FEATURED:()=>true,ONE_LINER:()=>`<p>Inside the ${v.TITLE_BOLD()}, gravity is local. Manipulate it to collect all orbs!</p><p>This is a remake of the old ${AHTML("Gravirinth [Legacy]","gravirinth-legacy.html")}.</p>`,TAGLINE:()=>"Gravirinth remastered."},
P_gravirinth_log:{...WithImage,LINK:()=>`gravirinth-log`,TITLE:()=>`Gravirinth changelog`,SHORTNAME:()=>`Grav. Log`,DAY:()=>`22`,MONTH:()=>`11`,YEAR:()=>`2018`,TAGS:()=>[`Creative-Archive`,`Log`,`Post`,`Puzzlescript`],IMAGE_EXT:()=>"png"},
P_platformer_template:{...CMSGame,LINK:()=>`platformer-template`,CONTENT:()=>`a59cd8147d80041f87181599f5d6cd2e`,THEMECOLOUR:()=>`rgb(96,197,154)`,TITLE:()=>`Platformer Template`,DAY:()=>`22`,MONTH:()=>`4`,YEAR:()=>`2019`,TAGS:()=>[`Game`,`Platformer`,`Puzzle`,`Puzzlescript`],FEATURED:()=>true,ONE_LINER:()=>`<p>${v.TITLE_BOLD()} is a puzzle about making puzzles. A meta-game that teaches players how to design a puzzle-platformer step by step.</p>`},
P_burokku_konekuta:{...CMSGame,LINK:()=>`burokku-konekuta`,CONTENT:()=>`96384ea6851a66ff30c89a18995f5b8b`,THEMECOLOUR:()=>`rgb(55,199,199)`,TITLE:()=>`Burokku Konekuta`,DAY:()=>`10`,MONTH:()=>`7`,YEAR:()=>`2019`,TAGS:()=>[`Game`,`Puzzle`,`Puzzlescript`],FEATURED:()=>true,ONE_LINER:()=>`<p>Tidiness rules in ${v.TITLE_BOLD()}. Connect all the scattered pieces together to regain the harmony within your puzzled mind. </p>`},
P_skilleblokker:{...CMSGame,LINK:()=>`skilleblokker`,CONTENT:()=>`d4716388dfe54118a82d4e1ec5d60bc4`,THEMECOLOUR:()=>`rgb(189,224,255)`,TITLE:()=>`Skilleblokker`,DAY:()=>`21`,MONTH:()=>`9`,YEAR:()=>`2019`,TAGS:()=>[`Game`,`Puzzle`,`Puzzlescript`],FEATURED:()=>true,ONE_LINER:()=>`<p>It is time to disconnect with ${v.TITLE_BOLD()}, the opposite twin of Burokku Konekuta. Can you chill out and isolate every block or will you slip astray on the ice?</p>`},
P_strata_hedges:{...CMSGame,LINK:()=>`strata-hedges`,CONTENT:()=>`74e3b230123627da73d1466eea865f5b`,THEMECOLOUR:()=>`rgb(0,101,101)`,TITLE:()=>`Strata Hedges`,DAY:()=>`29`,MONTH:()=>`3`,YEAR:()=>`2020`,TAGS:()=>[`3D`,`Game`,`Prototype`,`Puzzle`,`Puzzlescript`],ONE_LINER:()=>`<p>The gardens in ${v.TITLE_BOLD()} have many dimensions. Sharpen your eyes and keep all in perspective!</p>`},
P_starkoban:{...CMSGame,LINK:()=>`starkoban`,CONTENT:()=>`f20996db777cfb6f5725fd27c4268cf3`,THEMECOLOUR:()=>`rgb(55,55,55)`,TITLE:()=>`Starkoban`,DAY:()=>`14`,MONTH:()=>`11`,YEAR:()=>`2020`,TAGS:()=>[`Game`,`Puzzle`,`Puzzlescript`],ONE_LINER:()=>`<p>${v.TITLE_BOLD()} is a challenging mix of star battle and sokoban, for stark puzzlers.</p>`},
P_puzzle_type:{...CMSGame,LINK:()=>`puzzle-type`,PRESCRIPT:()=>["data/store.js"],POSTSCRIPT:()=>v.GAME_SCRIPT(),TITLE:()=>`Puzzle type`,DAY:()=>`10`,MONTH:()=>`11`,YEAR:()=>`2019`,TAGS:()=>[`Game`,`Puzzle`],FEATURED:()=>true,IMAGE_EXT:()=>`gif`,ONE_LINER:()=>`<p>A <b>single clue</b> reveals the <b>hidden typing rule</b>. Explore each puzzle to discover its rule. To win, type the clue exactly as shown: <b>every symbol counts</b>!</p>`,ORIENTATION:()=>`portrait`,FEEDBACK_KEY:()=>`${KB("Ctrl E")}`,FULLSCREEN_KEY:()=>`${KB("Ctrl F")}`,HINT_KEY:()=>`${KB("Ctrl H")}`,LEVEL_KEY:()=>`${KB("Ctrl L")}`,MUSIC_KEY:()=>`${KB("Ctrl M")}`},
P_terms_of_use:{...NoImage,LINK:()=>`terms-of-use`,TITLE:()=>`Terms of use`,DAY:()=>`30`,MONTH:()=>`11`,YEAR:()=>`2017`,TAGS:()=>[`Creative-Archive`,`Post`]},
P_privacy_policy:{...NoImage,LINK:()=>`privacy-policy`,TITLE:()=>`Privacy Policy`,DAY:()=>`10`,MONTH:()=>`2`,YEAR:()=>`2018`,TAGS:()=>[`Creative-Archive`,`Post`]},
P_subscribe:{...WithImage,LINK:()=>`subscribe`,TITLE:()=>`Subscribe`,DAY:()=>`6`,MONTH:()=>`12`,YEAR:()=>`2018`,TAGS:()=>[`Creative-Archive`,`Post`],IMAGE_ALT:()=>`Subscribe to ${v.SITE_NAME()} news!`,DESCRIPTION:()=>`Curious about the next project by ${v.NAME()}? Subscribe to ${v.SITE_NAME()}!`},
P_rss:{...NoImage,LINK:()=>`rss`,BODY:()=>`${v.RSS()}`,TYPE:()=>`RSS`,TYPEGRAPH:()=>`website`,EXT:()=>`xml`},
P_tag:{...NoImage,LINK:()=>`tag`,BODY:()=>v.PAGE_SIMPLE(),CONTENT:()=>TagPageHTML(),STYLE:()=>`archive`,TITLE:()=>Equal(PageTagArray(),[""])?"All Tags":`Classed as ${Enumerate(PageTagArray())}`,FREQ:()=>`monthly`,TYPE:()=>`Tag`,TAGS:()=>[`Class`],DESCRIPTION:()=>`All tagged posts in the ${v.SITE_NAME()}`,TYPEGRAPH:()=>"site"},
P_posts:{...NoImage,LINK:()=>`posts`,BODY:()=>v.PAGE_SIMPLE(),CONTENT:()=>PostPageHTML(),STYLE:()=>`archive`,TITLE:()=>`All posts`,FREQ:()=>`monthly`,TYPE:()=>`Archive`,TAGS:()=>[`Sitemap`],DESCRIPTION:()=>`Archive of All posts`,TYPEGRAPH:()=>`website`},
P_generator:{...NoImage,LINK:()=>`generator`,POSTSCRIPT:()=>["data/news.js"],TITLE:()=>`${v.SITE_NAME()} Generator`,DAY:()=>`26`,MONTH:()=>`03`,YEAR:()=>`2020`,TAGS:()=>[`Creative-Archive`,`Sitemap`],ONE_LINER:()=>`Generate ${v.SITE_NAME()}'s pages such as sitemap, rss and more!`},
P_analytics:{...NoImage,FEATURED:()=>false,LINK:()=>`analytics`,POSTSCRIPT:()=>["codes/game/modules/data-game-colours.js","data/worldmap.js"],TITLE:()=>`Analytics dashboard`,DAY:()=>`05`,MONTH:()=>`05`,YEAR:()=>`2020`,TYPE:()=>`Backend`,TAGS:()=>[`Creative-Archive`,`Sitemap`],ONE_LINER:()=>`Analytics dashboard of the ${v.SITE_NAME()}`},
P_videoplaytesting_tips:{...WithImage,LINK:()=>`videoplaytesting-tips`,TITLE:()=>`Videoplaytesting Tips`,DAY:()=>`29`,MONTH:()=>`8`,YEAR:()=>`2020`,TAGS:()=>[`List`,`Post`],ONE_LINER:()=>`Would you like to videoplaytest a game but not sure how to go about it? Here are some tips!`,IMAGE_EXT:()=>`png`},
P_star_battle:{...WithImage,LINK:()=>`star-battle`,POSTSCRIPT:()=>["codes/game/star-battle/hyper-loader.js"],TITLE:()=>`Star Battle geometries`,DAY:()=>`18`,MONTH:()=>`06`,YEAR:()=>`2020`,TYPE:()=>`Post`,TAGS:()=>[`Paper`,`Puzzle`],ONE_LINER:()=>`What if you could play <b>Star Battle</b> on <em>different geometries</em>? Now you can!`,IMAGE_EXT:()=>`png`}

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
		Sorter:SortPageByDate,
		ItemHTML:PageCardHTML
	};
}

SortPageByDate=function(pageA,pageB){
	
	var pageA={...v,...pageA};
	var pageB={...v,...pageB};
	return Days(PageDate(pageA),PageDate(pageB));
}

PageDate=function(page){
	if(!page||!page.DAY||!page.MONTH||!page.YEAR)
		return Today();
	return DateDate(page.DAY(),page.MONTH(),page.YEAR());
}

PageDateYMD=function(page){
	if(!page||!page.DAY||!page.MONTH||!page.YEAR)
		return `${Year()}-${Month()}-${Day()}`;
	return `${page.YEAR()}-${page.MONTH()}-${page.DAY()}`;
}


PageTagArray=function(){
	var tags=PageSearch("search");
		return Complement(tags.split("+"),["","Class"]);
}

TagPageHTML=function(){
	var tags=PageTagArray();
	function HasTag(PageObj){
		if(!PageObj.TAGS)
			return false;
		var pagetags=PageObj.TAGS().map(LowerSimpleString);
		return tags.every(
			tag=>In(pagetags,LowerSimpleString(tag))
			);};
	var CMSOptions=CMSOptionsObj();
	return SectionHTML({
		...CMSOptions,
		FilterF:HasTag,
	})
}

PageCardHTML=function(page){
	var page={...v,...page};
	var size=180;
	var path=ImagePath(page.IMAGE_NAME(page),page.IMAGE_EXT(),size);
	
	var id=GenerateId();
	LazyImageLoader(id,path);
	
	return`
	<a href="${page.LINK()}.html" class="card-supra">
		<div class="card">
			<h3>${page.TITLE()}</h3>
				<img id="${id}" class="image" width="${size}" height="${size}" alt="${page.IMAGE_ALT(page)}" title="${page.IMAGE_ALT(page)}" loading="lazy"/>
		</div>
	</a>`;
}

MiniCardHTML=function(page){
	var page={...v,...page};
	var size=180;
	var path=ImagePath(page.IMAGE_NAME(page),page.IMAGE_EXT(),size);
	var id=GenerateId();
	LazyImageLoader(id,path);

	return`
	<div class="mini">
		<div>
			<a href="${page.LINK()}.html">
				<h3>${page.TITLE()}</h3>
			</a>
			${v.LABELS(page)}
		</div>
		<a href="${page.LINK()}.html">
			<img id=${id} class="image" width="${size}" height="${size}" alt="${page.IMAGE_ALT(page)}" title="${page.IMAGE_ALT(page)}" loading="lazy"/>
		</a>
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
	return SectionHTML({
		...CMSOptions,
		exclude:{FEATURED:()=>false},
		header:`<h1 class="title">Latest posts</h1>`,
		ItemHTML:MiniCardHTML,
		max:v.LATEST_LIMIT(),
		InnerWrapper:(latest)=>`<div class="latest">${latest}</div>`,
	})
}

HighlightsHTML=function(){
	var CMSOptions=CMSOptionsObj();
	return SectionHTML({
		...CMSOptions,
		include:{FEATURED:()=>true,TYPE:()=>`Game`},
		header:`<h1 class="title">Chosen games</h1>`,
		InnerWrapper:(latest)=>`<div class="featured">${latest}</div>`,
		footer:`<div class="whiteboard"><div class="text"><p> Chosen from the full list of ${v.A_GAMES()}.</div></div>`,
	})
}

PopularHTML=function(){
	var CMSOptions=CMSOptionsObj();
	
	return SectionHTML({
		...CMSOptions,
		FilterF:function(PageObj){ var PageObj={...v,...PageObj}; return PageObj.TYPE()!=="Game"&&PageObj.FEATURED&&PageObj.FEATURED();},
		header:`<h1 class="title">Popular projects</h1>`,
		InnerWrapper:(latest)=>`<div class="featured">${latest}</div>`
	})
}

CMSTags=function(){
	tags=[];
	Values(CMS).map(p=>(tags=Union(tags,p.TAGS?p.TAGS():[])));
	return tags;
}

// PageMinimalCodeStyleHTML=function(){
// 	return `
// 	<link href="codes/index.css" rel="stylesheet" type="text/css"/>
// 	<script src="codes/data-transfer.js"></script>`
// }

// PageMinimalPosHTML=function(){
// 	return `</html>`
// }

// TagPageHTML=function(){
// 	return `${DoctypeHTML()}
// ${PageMinimalCodeStyleHTML()}
// <script id="post">var Post={POST:()=>""};
// try{v={...v,...Post}}catch{v=Post}</script>
// ${PageMinimalPosHTML()}`;
// }

// GenerateTagPage=function(tag){
// 	var page=TagPageHTML();
// 	var name=`tag-${tag}.html`;
// 	Download(page,name,"html");
// }

// GenerateTagPages=function(){
// 	CMSTags().map(GenerateTagPage);
// }

ArchiveYearHTML=function(year){
	function InYear(PageObj){return PageObj.YEAR&&PageObj.YEAR()===year;};
	var CMSOptions=CMSOptionsObj();
	return SectionHTML({
		...CMSOptions,
		header:`<h2 class="archive-year">${year}</h2>`,
		FilterF:InYear,
		InnerWrapper:(latest)=>`<div class="featured">${latest}</div>`,
	})
}

PostPageHTML=function(){
	var years=[];
	function GetYear(PageObj){
		if(PageObj.YEAR)
			years=Union(years,[PageObj.YEAR()])
	}
	FilterObject(CMS,GetYear);
	years=years.sort((a,b)=>a<b);
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

CMSAHTML=function(title){
	var o=CMSObject(title);
	return AHTML(UnFunction(o.TITLE),UnFunction(o.LINK)+".html");
}

CMSObject=function(title){
	var o=BaseFilter(CMS,o=>UnFunction(o.TITLE)&&LowerSimpleString(UnFunction(o.TITLE))===LowerSimpleString(title));
	if(o.length)
		return First(o);
}


// Keyboard Instuctions



ExportCMSProperties=function(){
	Page=PageObj(PageIdentifier());
	DATA["page"]=Page;
	DATA["cms"]=CMS;
}

ExportCMSProperties();
Shout("cms");
ExportNodeFunctions();