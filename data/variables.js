//Variables

Variables={

YEAR_START					:	()=>	2010,
DATE_FOUNDED				:	()=>	`December, 2017`,
LOCATION					:	()=>	`a private location`,

YEAR						:	()=>	v.DATE?Year(StringDate(v.DATE())):v.YEAR_START(),
	
NAME						:	()=>	`Pedro PSI`,
NAME_LINK					:	()=>	AnchorHTML(v.NAME(),v.SITE()),
NAME_YEAR					:	()=>	`${v.NAME_LINK()}, ${v.YEAR()}`,
	
LANG						:	()=>	`en-US`,

ME							:	()=>	`me`,
MY							:	()=>	`my`,
I							:	()=>	`I`,
IM							:	()=>	`I'm`,
IVE							:	()=>	`I've`,
MYSELF						:	()=>	`myself`,
PERSONAL					:	()=>	`personal`,
	
ROOT						:	()=>	``,
PATH						:	()=>	v.ROOT(),
SITE_NAME					:	()=>	`Creative Archive`,
ALIAS						: 	()=>	`pedropsi`,
TWI_ALIAS					: 	()=>	`Pedro_PSI_`,
SITE_SHORT					:	()=>	`${v.ALIAS()}.github.io`,
SOURCE_URL					:	()=>	`https://github.com/${v.ALIAS()}`,
SITE						:	()=>	`https://${v.SITE_SHORT()}`,
SITE_LINK					:	()=>	AnchorHTML(v.SITE_NAME(),v.SITE()),
SITE_LINK_SELF				:	()=>	AnchorHTML(v.SITE(),v.SITE()),
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

TITLE						:	()=>	CapitalCase(PageIdentifier().replace("-"," ")),
LINK						:	()=>	PageIdentifier(),
HEAD_DATA_GRAPH				:	()=>	`${v.HEAD_TITLE()}${v.HEAD_OPENSEARCH()}${v.HEAD_DESCRIPTION()}${v.HEAD_IMAGE()}${v.HEAD_LINK()}${v.HEAD_TYPE()}${v.HEAD_COPYRIGHT()}${v.HEAD_SITENAME()}${v.HEAD_KEYWORDS()}`,
HEAD_TITLE					:	()=>	`<title>${v.TITLE()}</title><meta property="og:title" content="${v.TITLE()} by ${v.NAME()}"/><meta content="${v.TITLE()} by ${v.NAME()}" name="twitter:title">`,
HEAD_DESCRIPTION			:	()=>	`<meta name="description" content="${v.DESCRIPTION()}"/><meta property="og:description" content="${v.DESCRIPTION()}"/><meta content="${v.DESCRIPTION200()}" name="twitter:description">`,
HEAD_TYPE					:	()=>	`<meta property="og:type" content="${v.TYPEGRAPH()}"/><meta property="og:image:alt" content="${v.IMAGE_ALT(v)}"/>`,
HEAD_LINK					:	()=>	`<meta property="og:url" content="${v.SITE()}/${v.LINK()}.html"/>`,
HEAD_IMAGE					:	()=>	`<meta property="og:image" content="${v.SITE()}/${v.IMAGE_512()}"/><meta name="twitter:image" content="${v.SITE()}/${v.IMAGE_512()}"><meta name="twitter:card" content="summary_large_image">`,
HEAD_COPYRIGHT				:	()=>	`<meta itemprop="copyrightHolder" content="${v.NAME()}"><meta itemprop="copyrightYear" content="${v.YEAR()}"><meta itemprop="publisher" content="${v.NAME()}"><meta name="author" content="${v.NAME()}"><meta name="twitter:site" content="@${v.TWI_ALIAS()}"><meta name="twitter:creator" content="@${v.TWI_ALIAS()}">`,
HEAD_SITENAME				:	()=>	`<meta property="og:site_name" content="${v.TITLE()} | ${v.NAME()}"><meta content="${v.LINK_URL()}" name="twitter:url"></meta>`,
HEAD_KEYWORDS				:	()=>	`<meta name="keywords" content="${[v.TITLE()].concat(v.TAGS?v.TAGS():[]).join(", ")}"></meta>`,
HEAD_LD_JSON				:	()=>	`<script type="application/ld+json">{"@context":"http:\/\/schema.org\/","@type":"Product","name":"{v.NAME()})","description":"${v.DESCRIPTION()}"}</script>`,
HEAD_OPENSEARCH				:	()=>	(PageIdentifier()!=="index")?"":`<link rel="search" type="application/opensearchdescription+xml" title="PuzzleScriptDB" href="${v.SITE()}/opensearch.xml">`,

DISPLAY_EXTERNAL			:	()=>	`<div id="${v.LINK()}-area" class="external-area">Loading...</div>`,

AREA_PRE					:	()=>	`<div class="container">`,
TABULAR_AREA				:	()=>	`${v.AREA_PRE()}${v.DISPLAY_EXTERNAL()}${v.POST_PLUS_LABELS()}</div>`,
GUESTBOOK_AREA				:	()=>	`${v.AREA_PRE()}<h1 class="title">${v.TITLE()}</h1><div class="whiteboard"><div class="text ${v.STYLE()} post" id="post">${Evaluate(v.POST)}</div></div>${PageLabelsHTML(v)}${v.DISPLAY_EXTERNAL()}</div>`,
GUESTBOOK_COMMENTS			:	()=>	`<div id="guestbook-area"></div>`,


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


GAME_STYLE					:	()=>	`codes/game/game.css`,
GAME_SCRIPT_GAME			:	()=>	`codes/game/${v.LINK()}/${v.LINK()}.js`,
GAME_SCRIPT					:	()=>	[v.GAME_SCRIPT_GAME(),v.GAME_STYLE()],

PUZZLE_SCRIPT				:	()=>	[`codes/game/puzzlescript-embed.js`,`codes/game/puzzlescript/${v.LINK()}.js`,v.GAME_STYLE()],


GUESTBOOK_ADD				:	()=>	ButtonHTML({txt:"Leave your message!",onclick:"RequestGuestbook()"}),
BUTTON_SOON					:	()=>	`<div>Coming soon...</div>`,


BLANK						:	()=>	`target='_blank' rel="noopener noreferrer"`,


HTML_DOCTYPE				:	()=>	DoctypeHTML(v.LANG()),

PAGE_SIMPLE					:	()=>	v.MONO_OUT(v.WHITEBOARD_SIMPLE()),
PAGE_BARE					:	()=>	v.MONO_OUT(v.CONTENT()),
PAGE_POST					:	()=>	v.MAIN_OUT(v.WHITEBOARD())+v.SECTION_CHANGELOG()+v.SECTION_OUT(v.GUESTBOOK_COMMENTS())+FooterHTML(),

MAIN_OUT					:	(post)=>	`<div class="main">${NavbarHTML()}${post}</div>`,
MONO_OUT					:	(post)=>	`<div class="main">${NavbarHTML()}${post}</div>${FooterHTML()}`,
SECTION_OUT					:	(content)=>	`<section class="section"><div class="container">${content}</div></section>`,

PAGE_TITLE					:	()=>	`<h1 class="title">${v.TITLE()}</h1>`,
SHORTNAME					:	()=>	v.TITLE(),

WHITEBOARD_OUT				:	(post)=>	`<div class="whiteboard"><div class="text ${v.STYLE()} post" id="post">${post}</div></div>`,
WHITEBOARD					:	()=>		v.SECTION_OUT(v.POST_PLUS_LABELS(v)),
POST_PLUS_LABELS			:	()=>		v.PAGE_TITLE()+v.WHITEBOARD_OUT(Evaluate(v.POST))+PageLabelsHTML(v),
WHITEBOARD_SIMPLE			:	()=>		v.SECTION_OUT(v.PAGE_TITLE()+v.WHITEBOARD_OUT(v.CONTENT())+PageLabelsHTML(v)),




SUBSCRIBE_RSS				:	()=>	ButtonHTML({txt:"Subscribe to RSS feed","href":v.RSS_PATH(),"class":"button selectable",id:"rss"}),
SUBSCRIBE_EMAIL				:	()=>	ButtonHTML({txt:"Subscribe to email alerts.",onclick:"OpenModalSubscribe()"}),


MACRO_URL					:	()=>	`https://script.google.com/macros/s/`,


TITLE_BY					:	()=>	`${v.TITLE()} by ${v.NAME()} ${v.YEAR()}`,
TITLE_BY_AL					:	()=>	`${v.NAME()} et al., ${v.YEAR()}, <em>${v.TITLE()}</em>`,
TITLE_BOLD					:	()=>	`<b>${v.TITLE()}</b>`,


HEADER						:	()=>	`<header>${v.ABOUT_TEXT()}${v.ONE_LINER()}</header>`,

ABOUT_TEXT					:	()=>	`<h2>About ${v.TITLE_BOLD()}</h2>`,
HOWTO_TEXT					:	()=>	`${v.FIGURE_SIMPLE()}<h2>How to play</h2><h3>Controls</h3>`,



NUM_KEYS					:	()=>	Enumerate(Range(0,9).map(String).map(KB),"or"),
LEFT_KEY					:	()=>	Enumerate(["swipe-left","left","A"].map(KB),"or"),
UP_KEY						:	()=>	Enumerate(["swipe-up","up","W"].map(KB),"or"),
RIGHT_KEY					:	()=>	Enumerate(["swipe-right","right","D"].map(KB),"or"),
DOWN_KEY					:	()=>	Enumerate(["swipe-down","down","S"].map(KB),"or"),
ACTION_KEY					:	()=>	Enumerate(["tap","X","spacebar","enter"].map(KB),"or"),
UNDO_KEY					:	()=>	`<kbd>Z</kbd>`,
RESTART_KEY					:	()=>	`<kbd>R</kbd>`,
FEEDBACK_KEY				:	()=>	`<kbd>E</kbd>`,
FULLSCREEN_KEY				:	()=>	`<kbd>F</kbd>`,
HINT_KEY					:	()=>	`<kbd>H</kbd>`,
LEVEL_KEY					:	()=>	`<kbd>L</kbd>`,
MUSIC_KEY					:	()=>	`<kbd>M</kbd>`,


CREDITS						:	()=>	`<h2>Credits</h2>${v.CREDITS_AUTHORSHIP()}${v.CREDITS_MUSIC()}${v.CREDITS_ENGINE_SUPPORT()}`,
CREDITS_AUTHORSHIP			:	()=>	`<p><b>${AnchorHTML(v.TITLE(),v.LINK_URL()+".html")}</b> by ${v.NAME_YEAR()}.</p>`,
CREDITS_MUSIC				:	()=>	MusicCreditsHTML(v.LINK()),
CREDITS_ENGINE_SUPPORT		:	()=>	`<h3>Game Engine</h3><p>Made with ${v.A_PUZZLESCRIPT()} and ${A("game-bar")}!</p>${v.SOURCE_TEXT()}`,
CREDITS_ENGINE_VANILLA		:	()=>	`<p>Made with vanilla JS and CSS, including ${A("game-bar")}!</p>`,
SOURCE_TEXT					:	()=>	`<p>Inspect the ${v.A_SOURCE()} freely, but consider the option to ${v.A_SUPPORT()}!</p>`,
A_SOURCE					:	()=>	AnchorHTML("<b>source</b>",'http://puzzlescript.net/editor.html?hack='+v.CONTENT()),

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
OTHER_INQUIRIES				:	()=>	`<h3>Other inquiries</h3><p>Check also the ${A("press")} or ${v.A_CONTACT_ME()} for all unusual requests!</p>`,


TRAILER_LAUNCHER			:	()=>	`<img class="card" onclick='OpenVideoModal("${v.TRAILER()}")' src="images/${v.TRAILER_IMAGE()}" alt="${v.TITLE()}'s trailer" title="${v.TITLE()} - ${v.TAGLINE()} (trailer)" loading="lazy"/>`,


RSS_PATH					:	()=>	`${v.SITE()}/rss.xml`,

SECTION_CHANGELOG			:	()=>	ChangelogHTML()?v.SECTION_OUT(v.WHITEBOARD_OUT(ChangelogHTML())):"",


MANIFEST					:	()=>"",
PWA_MANIFEST				:	()=>	`<link rel="manifest" id="manifest" href='data:application/manifest+json,${v.PWA_MANIFEST_CONTENT()}'/>`,
PWA_MANIFEST_CONTENT		:	()=>	`{${v.PWA_NAME()},${v.PWA_DISPLAY()},${v.PWA_ICONS()},${v.PWA_DESC()},${v.PWA_LANG()},${v.PWA_SCOPE()},${v.PWA_WORKER()}}`,

DESCRIPTION200				:	()=>	DescriptionString(v.DESCRIPTION(),200),
DESCRIPTION					:	()=>	DescriptionString(Evaluate(v.POST),300),
PARSER_UNDERSCORE			:	(txt)=> StripHTML(txt).replace(/\s+/ig,"_").replace(/"/ig,""),

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

};


//Variables

DATA["variables"]=Variables;
DefinedShout("variables");
ExportNodeFunctions();