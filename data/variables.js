//Functions

SubscribeHTML=function(opts){
	var opts=opts||{};
	var description=opts.description||`Learn first-hand about ${v.NAME()}'s next project!`
	var button=opts.button||v.BUTTON_SUBSCRIBE();
	
	return `<div class="announce">
				${description}
				${button}
			</div>`;
}

//
//Variables

Variables={
YEAR_NOW					:	()=>	Year(),
YEAR_START					:	()=>	2010,
DATE_FOUNDED				:	()=>	`December, 2017`,
YEAR_SPAN					:	()=>	`${YearsString(v.YEAR_START(),v.YEAR_NOW())}`,
	
LOCATION					:	()=>	`a private location`,
	
NAME						:	()=>	`Pedro PSI`,
NAME_LINK					:	()=>	`<a href="${v.SITE()}">${v.NAME()}</a>`,
NAME_YEAR					:	()=>	`${v.NAME_LINK()}, ${v.YEAR()}`,
	
LANG						:	()=>	`en-US`,

PERSON_LANG					:	()=>	1,
NUMBER_LANG					:	()=>	1,
PERSON_LANG_FULL			:	()=>	v.PERSON_LANG()+(v.NUMBER_LANG()-1)*3,
THIRD_PERSON				:	()=>	(v.PERSON_LANG()===3&&v.NUMBER_LANG()===1)?2:1,
GENDER_LANG					:	()=>	1,
LANG_CHOOSE					:	function(opts,type){return opts[type-1]},
HIM_OPTS					:	()=>	["him","her"],
HIS_OPTS					:	()=>	["his","her"],
HE_OPTS						:	()=>	["he","she"],
HIM_LANG					:	()=>	v.LANG_CHOOSE(v.HIM_OPTS(),v.GENDER_LANG()),
HIS_LANG					:	()=>	v.LANG_CHOOSE(v.HIS_OPTS(),v.GENDER_LANG()),
HE_LANG						:	()=>	v.LANG_CHOOSE(v.HE_OPTS(),v.GENDER_LANG()),
ME_OPTS						:	()=>	["me","you",`${v.HIM_LANG()}`,"us","you","them"],
MY_OPTS						:	()=>	["my","your",`${v.HIS_LANG()}`,"our","your","their"],
I_OPTS						:	()=>	["I","you",`${v.HE_LANG()}`,"we","you","they"],
AM_OPTS						:	()=>	["am","are","is","are","are","are"],
SELF_OPTS					:	()=>	["self","selves"],
HAVE_OPTS					:	()=>	["have","has"],
ME							:	()=>	v.LANG_CHOOSE(v.ME_OPTS(),v.PERSON_LANG_FULL()),
MY							:	()=>	v.LANG_CHOOSE(v.MY_OPTS(),v.PERSON_LANG_FULL()),
I							:	()=>	v.LANG_CHOOSE(v.I_OPTS(),v.PERSON_LANG_FULL()),
AM							:	()=>	v.LANG_CHOOSE(v.AM_OPTS(),v.PERSON_LANG_FULL()),
HAVE						:	()=>	v.LANG_CHOOSE(v.HAVE_OPTS(),v.THIRD_PERSON()),
SELF 						:	()=>	v.LANG_CHOOSE(v.SELF_OPTS(),v.NUMBER_LANG()),
IM							:	()=>	`${v.I()} ${v.AM()}`,
IVE							:	()=>	`${v.I()} ${v.HAVE()}`,
MYSELF						:	()=>	`${v.MY()}${v.SELF()}`,
PERSONAL					:	()=>	`personal`,
	
ROOT						:	()=>	``,
PATH						:	()=>	v.ROOT(),
SITE_NAME					:	()=>	`Creative Archive`,
ALIAS						: 	()=>	`pedropsi`,
SITE_SHORT					:	()=>	`${v.ALIAS()}.github.io`,
SOURCE_URL					:	()=>	`https://github.com/${v.ALIAS()}`,
SITE						:	()=>	`https://${v.SITE_SHORT()}`,
SITE_LINK					:	()=>	`<a href="${v.SITE()}">${v.SITE_NAME()}</a>`,
SITE_LINK_SELF				:	()=>	`<a href="${v.SITE()}">${v.SITE()}</a>`,
LINK_URL					:	()=>	`${v.SITE()}/${v.LINK()}`,
LINK_URL_SEARCH				:	()=>	`${v.LINK_URL()}.html?search=`,
	
LOGO_PATH					:	()=>	ImagePath("logo","svg"),
LOGO_DESC					:	()=>	`${v.NAME()}'s ${v.LOGO_NAME()} logo, of the ${v.SITE_NAME()}`,
LOGO_NAME					:	()=>	`${v.THEME_NAME()}`,
THEMECOLOUR					:	()=>	`rgb(7,0,112)`,//THEMECOLOUR_DEFAULT
THEME_NAME					:	()=>	`Lotus`,
CSS_NAME					:	()=>	`${v.A_THEME()} by ${v.NAME_LINK()}`,
CSS_PATH					:	()=>	`${v.CODES_FOLDER()}/lotus.css`,
CSS_TAG						:(path)=>`<link href="${path}" rel="stylesheet" type="text/css"/>`,
CSS_REL						:	()=>	v.CSS_TAG(v.CSS_PATH()),
CSS_ABS						:	()=>	v.CSS_TAG(`${v.SITE()}/${v.CSS_PATH()}`),
	
CODES_FOLDER 				:	()=>	`codes`,
CODES_FOLDER_URL			:	()=>	`${v.SITE()}/${v.CODES_FOLDER()}/`,

IMAGE_NAME					:	()=>	`splash`,
IMAGE_EXT					:	()=>	`svg`,
IMAGE_ALT					:	()=>	`A geometric lotus flower composed of eight rows of eight petals in rainbow progression - ${v.SITE_NAME()}'s logo`,

IMAGE_512					:	()=>	ImagePath(v.IMAGE_NAME(v),v.IMAGE_EXT(),512),
APPLEICON					:	()=>	ImagePath(v.IMAGE_NAME(v),v.IMAGE_EXT(),180),
FAVICON32					:	()=>	ImagePath("favicon-32x32","png"),

BODY						:	()=>	v.PAGE_POST(),

HEAD						:	()=>	`${v.HEAD_ITEMS()}${v.CSS_REL()}`,

HEAD_ITEMS					:	()=>	`${v.HEAD_CHARSET()}${v.HEAD_VIEWPORT()}${v.HEAD_THEME()}${v.HEAD_ICONS()}${v.HEAD_DATA_GRAPH()}${v.MANIFEST()}`,
HEAD_CHARSET				:	()=>	`<meta http-equiv="content-type" content="text/html; charset=UTF-8"><meta charset="utf-8">`,
HEAD_VIEWPORT				:	()=>	`<meta name="viewport" content="width=device-width, initial-scale=1.0"/>`,
HEAD_ICONS					:	()=>	`<link href="${v.FAVICON32()}" rel="icon" type="image/png"/><link href="${v.FAVICON32()}" rel="shortcut icon" type="image/x-icon"/><link href="${v.APPLEICON()}" rel="apple-touch-icon"/>`,
HEAD_THEME					:	()=>	`<meta name="theme-color" content="${v.THEMECOLOUR()}">`,

TITLE						:	()=>	Capitalise(PageIdentifier().replace("-"," ")),
LINK						:	()=>	PageIdentifier(),
HEAD_DATA_GRAPH				:	()=>	`${v.HEAD_TITLE()}${v.HEAD_DESCRIPTION()}${v.HEAD_IMAGE()}${v.HEAD_LINK()}${v.HEAD_TYPE()}`,
HEAD_TITLE					:	()=>	`<title>${v.TITLE()}</title><meta property="og:title" content="${v.TITLE()}"/>`,
HEAD_DESCRIPTION			:	()=>	`<meta name="description" content="${v.DESCRIPTION()}"/><meta property="og:description" content="${v.DESCRIPTION()}"/>`,
HEAD_TYPE					:	()=>	`<meta property="og:type" content="${v.TYPEGRAPH()}"/><meta property="og:image:alt" content="${v.IMAGE_ALT(v)}"/>`,
HEAD_LINK					:	()=>	`<meta property="og:url" content="${v.SITE()}/${v.LINK()}.html"/>`,
HEAD_IMAGE					:	()=>	`<meta property="og:image" content="${v.SITE()}/${v.IMAGE_512()}"/><meta name="twitter:image" content="${v.SITE()}/${v.IMAGE_512()}">`,
	
DISPLAY_EXTERNAL			:	()=>	`<div id="${v.LINK()}-area" class="external-area">Loading...</div>`,

AREA_PRE					:	()=>	`<div class="container">`,
TABULAR_AREA				:	()=>	`${v.AREA_PRE()}${v.DISPLAY_EXTERNAL()}${v.POST_PLUS_LABELS()}</div>`,
GUESTBOOK_AREA				:	()=>	`${v.AREA_PRE()}<h1 class="title">${v.TITLE()}</h1><div class="whiteboard"><div class="text ${v.STYLE()} post" id="post">${v.POST()}</div></div>${v.LABELS(v)}${v.DISPLAY_EXTERNAL()}</div>`,
GUESTBOOK_COMMENTS			:	()=>	`<div id="guestbook-area"></div>`,

BUTTON_SOON					:	()=>	`<div>Coming soon...</div>`,

RAINBOWLINE					:	()=>	`<div class="rainbowline"></div>`,

NAVOPTION					:	()=>	"",
NAVBAR_SELECTION			:	()=>	["news","posts",{NAME:"Puzzles",LINK:"tag.html?search=Puzzle"},"hall-of-fame"+(In(["selected-puzzlescrpt-games","puzzlescript-games-database","game-console","hall-of-fame"],PageIdentifier())?"-global":""),"about","contact","guestbook","store"],
NAV_LINK					:	(link)=>(`<a href="${IsString(link)?link+".html":link.LINK}" class="nav-link">${IsString(link)?Access(link,"TITLE"):link.NAME}</a>`),
NAVBAR						:	()=>	`<div class="navbar">${v.NAV_LOGO()}<nav>${v.NAVBAR_SELECTION().map(v.NAV_LINK).join("\n")}${v.NIGHTMODE()}</nav>${v.RAINBOWLINE()}</div>`,
NAV_LOGO					:	()=>	`<a href="index.html"><div class="logo">${v.LOGO_SVG()} Home</div></a>`,

NIGHTMODE					:	()=>	`<div class="nav-link" id="NightMode" onclick='ToggleNightMode()'>${ObtainSymbol("moon")}</div>`,

LOGO_DIMS					:	()=>	`x="-5" y="-5" width="10" height="10"`,
LOGO_DIMS_DISPLAY			:	()=>	"width=100 height=100",
LOGO_SVG					:	()=>	`<?xml version="1.0"?>
<svg viewBox="-8 -8 16 16" xmlns="http://www.w3.org/2000/svg" ${v.LOGO_DIMS_DISPLAY()}>
	<rect ${v.LOGO_DIMS()} class="darkblue"		fill="#070070"></rect>
	<rect ${v.LOGO_DIMS()} class="darkblue"		fill="#070070" transform="rotate(45)"></rect>
	<rect ${v.LOGO_DIMS()} class="blue"			fill="#000fff" transform="scale(0.765367) rotate(22.5)"></rect>
	<rect ${v.LOGO_DIMS()} class="blue"			fill="#000fff" transform="scale(0.765367) rotate(67.5)"></rect>
	<rect ${v.LOGO_DIMS()} class="lightblue"	fill="#1982ed" transform="scale(0.585786) rotate(0)"></rect>
	<rect ${v.LOGO_DIMS()} class="lightblue"	fill="#1982ed" transform="scale(0.585786) rotate(45)"></rect>
	<rect ${v.LOGO_DIMS()} class="turquoise"	fill="#3bf8de" transform="scale(0.448342) rotate(22.5)"></rect>
	<rect ${v.LOGO_DIMS()} class="turquoise"	fill="#3bf8de" transform="scale(0.448342) rotate(67.5)"></rect>
	<rect ${v.LOGO_DIMS()} class="green"		fill="#46f46f" transform="scale(0.343146) rotate(0)"></rect>
	<rect ${v.LOGO_DIMS()} class="green"		fill="#46f46f" transform="scale(0.343146) rotate(45)"></rect>
	<rect ${v.LOGO_DIMS()} class="yellow"		fill="#f0f8af" transform="scale(0.262632) rotate(22.5)"></rect>
	<rect ${v.LOGO_DIMS()} class="yellow"		fill="#f0f8af" transform="scale(0.262632) rotate(67.5)"></rect>
	<rect ${v.LOGO_DIMS()} class="lightyellow"	fill="#fff9c9" transform="scale(0.201010) rotate(0)"></rect>
	<rect ${v.LOGO_DIMS()} class="lightyellow"	fill="#fff9c9" transform="scale(0.201010) rotate(45)"></rect>
</svg>`,

STYLE						:()=>`prose`,
TYPEGRAPH					:()=>`article`,
TYPE						:()=>`Post`,

IMAGE_ALT					:()=>v.TITLE(),
PICTURE						:function(v,size){
								var id=GenerateId();
								var src=ImagePath(v.LINK(),v.IMAGE_EXT(),size);
								LazyImageLoader(id,src);							
								return `<img id="${id}" class="image" width="${size}" height="${size}" alt="${v.IMAGE_ALT(v)}" title="${v.IMAGE_ALT(v)}" loading="lazy"/>`},
PICTURE_RSS					:(v,size)=>`<img src="${v.SITE()}/images/${size}/${v.IMAGE_NAME(v)}.${v.IMAGE_EXT()}" width="${size}" height="${size}" alt="${v.IMAGE_ALT(v)}" title="${v.IMAGE_ALT(v)}"/>`,
PICTURE_DYNAMIC				:function(){return v.PICTURE(v,v.PICTURE_DYNAMIC_SIZE())},
PICTURE_DYNAMIC_SIZE		:function(){
								if(NodejsDetected()||window.innerWidth<512)
									return 180;
								else
									return 512;
							},

FIGURE_SIMPLE				:	()=>	`<figure class="figure">${v.PICTURE_DYNAMIC()}</figure>`,

PUZZLE_SCRIPT_GAME			:	()=>	`codes/game/puzzlescript/${v.LINK()}.js`,
PUZZLE_SCRIPT_EMBED			:	()=>	`codes/game/puzzlescript-embed.js`,
PUZZLE_SCRIPT				:	()=>	[v.PUZZLE_SCRIPT_EMBED(),v.PUZZLE_SCRIPT_GAME(),v.GAME_STYLE()],

GAME_STYLE					:	()=>	`codes/game/game.css`,
GAME_SCRIPT_GAME			:	()=>	`codes/game/${v.LINK()}/${v.LINK()}.js`,
GAME_SCRIPT					:	()=>	[v.GAME_SCRIPT_GAME(),v.GAME_STYLE()],

GUESTBOOK_ADD				:	()=>	`<div class="button centered" onclick="RequestGuestbook()" tabindex="0">Leave your message!</div>`,

BUTTON_SUBSCRIBE			:	()=>	NavigationButtonHTML("subscribe"),


BLANK						:	()=>	`target='_blank' rel="noopener noreferrer"`,


HTML_DOCTYPE				:	()=>	DoctypeHTML(v.LANG()),

PAGE_SIMPLE					:	()=>	v.MONO_OUT(v.WHITEBOARD_SIMPLE()),
PAGE_BARE					:	()=>	v.MONO_OUT(v.CONTENT()),
PAGE_POST					:	()=>	v.MAIN_OUT(v.WHITEBOARD())+v.SECTION_CHANGELOG()+v.SECTION_OUT(v.GUESTBOOK_COMMENTS())+FooterHTML(),

MAIN_OUT					:	(post)=>	`<div class="main">${v.NAVBAR()}${post}</div>`,
MONO_OUT					:	(post)=>	`<div class="main">${v.NAVBAR()}${post}</div>${FooterHTML()}`,
SECTION_OUT					:	(content)=>	`<section class="section"><div class="container">${content}</div></section>`,

PAGE_TITLE					:	()=>	`<h1 class="title">${v.TITLE()}</h1>`,
SHORTNAME					:	()=>	v.TITLE(),

WHITEBOARD_OUT				:	(post)=>	`<div class="whiteboard"><div class="text ${v.STYLE()} post" id="post">${post}</div></div>`,
WHITEBOARD					:	()=>		v.SECTION_OUT(v.POST_PLUS_LABELS(v)),
POST_PLUS_LABELS			:	()=>		v.PAGE_TITLE()+v.WHITEBOARD_OUT(v.POST())+v.LABELS(v),
WHITEBOARD_SIMPLE			:	()=>		v.SECTION_OUT(v.PAGE_TITLE()+v.WHITEBOARD_OUT(v.CONTENT())+v.LABELS(v)),

LABELS						:	(page)=>	`<div class="tags buttonrow">${v.LABEL_DATE(page)}${v.LABEL_TAGS(page)}</div>`,
LABEL_DATE					:	(page)=>	!page.DAY?"":`<a class="tag button" href="posts.html"><time datetime="${v.DATE(page)}">${v.DATE_TEXT(page)}</time></a>`,
LABEL_TAGS					:	(page)=>	page.TAGS?page.TAGS().map(v.LABEL_TAG).join("\n"):"",
LABEL_TAG					:	(tag)=>		`<a class="tag button" href="tag.html?search=${tag}">${tag}</a>`,



SECTION_SUBSCRIBE			:	()=>	v.SECTION_OUT(`<div class="container">${v.SUBSCRIBE_ANNOUNCE()}</div>`),
SUBSCRIBE_ANNOUNCE			:	()=>	`<div class="announce"><p>Learn first-hand about ${v.NAME()}'s next project!</p>${v.BUTTON_SUBSCRIBE()}</div>`,
SUBSCRIBE_RSS				:	()=>	`<a href="${v.RSS_PATH()}" id="rss">Subscribe to RSS feed.</a>`,
SUBSCRIBE_EMAIL				:	()=>	`<a onclick="OpenModalSubscribe()">Subscribe to email alerts.</a>`,


MACRO_URL					:	()=>	`https://script.google.com/macros/s/`,


TITLE_BY					:	()=>	`${v.TITLE()} by ${v.NAME()} ${v.YEAR()}`,
TITLE_BY_AL					:	()=>	`${v.NAME()} et al., ${v.YEAR()}, <em>${v.TITLE()}</em>`,
TITLELONG					:	()=>	`${v.TITLE()} - ${v.TAGLINE()}`,
TITLE_BOLD					:	()=>	`<b>${v.TITLE()}</b>`,


HEADER						:	()=>	`<header>${v.ABOUT_TEXT()}${v.ONE_LINER()}</header>`,

ABOUT_TEXT					:	()=>	`<h2>About ${v.TITLE_BOLD()}</h2>`,
HOWTO_TEXT					:	()=>	`${v.FIGURE_SIMPLE()}<h2>How to play</h2><h3>Controls</h3>`,



NUM_KEYS					:	()=>	Enumerate(Range(0,9).map(String).map(KB),"or"),
LEFT_KEY					:	()=>	Enumerate(["swipeleft","left","A"].map(KB),"or"),
UP_KEY						:	()=>	Enumerate(["swipeup","up","W"].map(KB),"or"),
RIGHT_KEY					:	()=>	Enumerate(["swiperight","right","D"].map(KB),"or"),
DOWN_KEY					:	()=>	Enumerate(["swipedown","down","S"].map(KB),"or"),
ACTION_KEY					:	()=>	Enumerate(["tap","X","spacebar","enter"].map(KB),"or"),
UNDO_KEY					:	()=>	`<kbd>Z</kbd>`,
RESTART_KEY					:	()=>	`<kbd>R</kbd>`,
FEEDBACK_KEY				:	()=>	`<kbd>E</kbd>`,
FULLSCREEN_KEY				:	()=>	`<kbd>F</kbd>`,
HINT_KEY					:	()=>	`<kbd>H</kbd>`,
LEVEL_KEY					:	()=>	`<kbd>L</kbd>`,
MUSIC_KEY					:	()=>	`<kbd>M</kbd>`,


CREDITS						:	()=>	`<h2>Credits</h2>${v.CREDITS_AUTHORSHIP()}${v.CREDITS_MUSIC()}${v.CREDITS_ENGINE_SUPPORT()}`,
CREDITS_AUTHORSHIP			:	()=>	`<p><a href="${v.LINK_URL()}.html">${v.TITLE_BOLD()}</a> by ${v.NAME_YEAR()}.</p>`,
CREDITS_MUSIC				:	()=>	MusicCreditsHTML(v.LINK()),
CREDITS_ENGINE_SUPPORT		:	()=>	`<h3>Game Engine</h3>${v.PUZZLESCRIPT_TEXT()}${v.SOURCE_TEXT()}`,
CREDITS_ENGINE_VANILLA		:	()=>	`<p>Made with vanilla JS and CSS, including ${A("game-bar")}!</p>`,
PUZZLESCRIPT_TEXT			:	()=>	`<p>Made with ${v.A_PUZZLESCRIPT()} and ${A("game-bar")}!</p>`,
SOURCE_TEXT					:	()=>	`<p>Inspect the ${v.A_SOURCE()} freely, but consider the option to ${v.A_SUPPORT()}!</p>`,
A_SOURCE					:	()=>	`<a ${v.BLANK()} href='http://puzzlescript.net/editor.html?hack=${v.CONTENT()}'><b>source</b></a>`,

MENTIONS					:	()=>v.MENTIONS_LINKS()?`<h3>Mentions</h3><ul>${v.MENTIONS_LINKS()}</ul>`:"",
MENTIONS_LINKS				:	()=>LinkGroupHTML({GROUP:"mentioned",ID:v.LINK()}),

HALL_OF_FAME_TEXT_SHORT		:	()=>	`<h3>Hall of fame</h3><p>Once you beat ${v.TITLE_BOLD()}, you'll be invited to enter ${v.HOF_SEARCH()}! As soon as you pass the final credits screen after winning, you'll be able to type your name in a new window. Make sure you are connected to the internet, then <em>press Submit</em> to be <b>remembered forever</b> or <em>close the window</em> to <b>forsake your glory</b>.</p>`,
HOF_SEARCH					:	()=> AHTML("Hall of fame","hall-of-fame.html?search="+PageIdentifier()),

COMMUNITY					:	()=>	`<h2>Community</h2>${v.GUESTBOOK_MESSAGE()}${v.HALL_OF_FAME_TEXT_SHORT()}${v.STATS()}${v.MENTIONS()}`,
STATS						:	()=>	`<h3>Game stats</h3><p class="won-area">Do you wonder how you compare with other players? Find out in the game stats below.</p>`,

GUESTBOOK_POST_TEXT			:	()=>	`<p>Enjoyed ${v.TITLE_BOLD()}? Add <b>your message</b> below to the ${A("guestbook")}!</p>`,
GUESTBOOK_MESSAGE			:	()=>	`<h3>Guestbook</h3>${v.GUESTBOOK_POST_TEXT()}${v.GUESTBOOK_ADD()}`,

FEEDBACK					:	()=>	`<h2>Feedback</h2><h3>Problems? Suggestions?</h3><p>Please ${v.A_LET_ME_KNOW()} !</p><h3>Praise?</h3>${v.GUESTBOOK_POST_TEXT()}${v.GUESTBOOK_ADD()}`,

PRESS_TEXT					:	()=>	`${v.PRESS_USAGE()}${ScreenshotGalleryHTML(v.LINK())}${v.OTHER_INQUIRIES()}`,
PRESS_USAGE					:	()=>	`<h2>Editorial uses</h2><p>All the material on this page is ${HyperText("Copyright")}, but you are granted permission to use it for editorial purposes, as long as you provide appropriate credit (including a direct link to this page) and do not spoil other people's enjoyment.</p>`,
OTHER_INQUIRIES				:	()=>	`<h3>Other inquiries</h3><p>Check also the ${v.A_PRESS()} or ${v.A_CONTACT_ME()} for all unusual requests!</p>`,

TRAILER_LAUNCHER			:	()=>	`<img class="card" onclick='OpenVideoModal("${v.TRAILER()}")' src="images/${v.TRAILER_IMAGE()}" alt="${v.TITLE()}'s trailer" title="${v.TITLELONG()} (trailer)" loading="lazy"/>`,


MANIFEST					:	()=>"",
PWA_MANIFEST				:	()=>	`<link rel="manifest" id="manifest" href='data:application/manifest+json,${v.PWA_MANIFEST_CONTENT()}'/>`,
PWA_MANIFEST_CONTENT		:	()=>	`{${v.PWA_NAME()},${v.PWA_DISPLAY()},${v.PWA_ICONS()},${v.PWA_DESC()},${v.PWA_LANG()},${v.PWA_SCOPE()},${v.PWA_WORKER()}}`,

DESCRIPTION					:	()=>	v.PARSER_MARKSHORT(v.POST().replace(/\n+/g,"\t")),
WORD_LIMIT_SHORT			:	()=>300,

PARSER_MARKSHORT			:(txt)=> StripHTML(txt).slice(0,v.WORD_LIMIT_SHORT()),
PARSER_UNDERSCORE			:(txt)=> StripHTML(txt).replace(/\s+/ig,"_").replace(/"/ig,""),

ONE_LINER					:	()=>"",
ONE_LINER_U					:	()=>	v.PARSER_UNDERSCORE(v.ONE_LINER()),
TITLE_BY_U					:	()=>	v.PARSER_UNDERSCORE(v.TITLE_BY()),
SHORTNAME_U					:	()=>	v.PARSER_UNDERSCORE(v.SHORTNAME()),
DESCRIPTION_U				:	()=>	v.PARSER_UNDERSCORE(v.DESCRIPTION()),

ORIGIN						:	()=>	v.SITE(),

PWA_DISPLAY					:	()=>	`"theme_color":"${v.THEMECOLOUR()}","background_color":"${v.THEMECOLOUR()}","display":"standalone","orientation":"${v.ORIENTATION()}"`,
PWA_DESC					:	()=>	`"description":"${v.DESCRIPTION_U()}","categories":[${v.CATEGORIES().map(c=>`"${c}"`)}]`,
PWA_NAME					:	()=>	`"short_name":"${v.SHORTNAME_U()}","name":"${v.TITLE_BY_U()}"`,
PWA_LANG					:	()=>	`"dir":"ltr","lang":"${v.LANG()}"`,
PWA_SCOPE					:	()=>	`"start_url":"${v.ORIGIN()}/${v.LINK()}.html?source=homescreen","scope":"${v.ORIGIN()}"`,
PWA_WORKER					:	()=>	`"serviceworker":{"src":"${v.ORIGIN()}/cacher.js"}`,

ORIENTATION					:()=>`landscape`,

PWA_ICON_OBJ				:(size)=>`{"src":"${v.ORIGIN()}/${ImagePath(v.IMAGE_NAME(v),v.IMAGE_EXT(),size)}","type":"image/${v.IMAGE_EXT()}","sizes":"${size}x${size}","purpose":"any maskable"}`,
PWA_ICONS					:	()=>	`"icons":[${v.PWA_ICON_OBJ(512)},${v.PWA_ICON_OBJ(192)},${v.PWA_ICON_OBJ(180)}]`,

NEWS_LIMIT_RECENT			:	()=>	3,
LATEST_LIMIT				:	()=>	12,
RSS_LIMIT					:	()=>	60,
RSS_PATH					:	()=>	`${v.SITE()}/rss.xml`,
RSS_SITE_DESCRIPTION		:	()=>	`Don't miss out on the ${v.SITE_NAME()}!`,
RSS_CHANNEL_IMAGE			:	()=>	`<image><link>${v.SITE()}</link><title>${v.SITE_NAME()}</title><url>${v.SITE()}/${v.LOGO_PATH()}</url></image>`,
XML							:	()=>	`<?xml version="1.0" encoding="UTF-8"?>`,

SECTION_CHANGELOG			:	()=>	ChangelogHTML()?v.SECTION_OUT(v.WHITEBOARD_OUT(ChangelogHTML())):"",



DATE						:	(page)=>	`${page.DAY()}-${page.MONTH()}-${page.YEAR()}`,

DATE_TEXT					:	(page)=>	page&&page.DAY&&page.MONTH&&page.YEAR?DateName(page.DAY(),page.MONTH(),page.YEAR()):"",


};


//Variables


NormaliseVariables=function(Variables,TemplateFunction) {
	return MapObject(Variables,function (v,k,o){
		o[k]=(()=>TemplateFunction(v));
	})
}


DATA["variables"]=Variables;
Shout("variables");
ExportNodeFunctions();