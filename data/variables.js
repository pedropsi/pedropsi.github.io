var Variables={
YEAR_NOW					:	()=>	Year(),
YEAR_START					:	()=>	2010,
DATE_FOUNDED				:	()=>	`December, 2017`,
YEAR_SPAN					:	()=>	`${v.YEAR_START()}-${v.YEAR_NOW()}`,
	
LOCATION					:	()=>	`a private location`,
	
NAME						:	()=>	`Pedro PSI`,
NAME_LINK					:	()=>	`<a href="${v.SITE()}">${v.NAME()}</a>`,
NAME_YEAR					:	()=>	`${v.NAME_LINK()}, ${v.YEAR()}`,
	
MOSAIC_TEXT					:	()=>	`<kbd>Click</kbd> on the mosaic above to change this page's background. Try it!`,
	
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
SITE_HTTP					:	()=>	`http://${v.SITE_SHORT()}`,
SITE_LINK					:	()=>	`<a href="${v.SITE()}">${v.SITE_NAME()}</a>`,
SITE_LINK_SELF				:	()=>	`<a href="${v.SITE()}">${v.SITE()}</a>`,
LINK_URL					:	()=>	`${v.SITE()}/${v.LINK()}`,
LINK_URL_SEARCH				:	()=>	`${v.LINK_URL()}.html?search=`,
	
LOGO_PATH					:	()=>	ImagePath("logo","svg"),
LOGO_DESC					:	()=>	`${v.NAME()}'s ${v.LOGO_NAME()} logo, of the ${v.SITE_NAME()}`,
LOGO_NAME					:	()=>	`${v.THEME_NAME()}`,
THEMECOLOUR					:	()=>	`rgb(7,0,112)`,//THEMECOLOUR_DEFAULT
THEME_NAME					:	()=>	`octaflower`,
CSS_NAME					:	()=>	`${v.A_THEME()} by ${v.NAME_LINK()}`,
CSS_PATH					:	()=>	`${v.CODES_FOLDER()}/index.css`,
CSS_TAG						:(path)=>`<link href="${path}" rel="stylesheet" type="text/css"/>`,
CSS_REL						:	()=>	v.CSS_TAG(v.CSS_PATH()),
CSS_ABS						:	()=>	v.CSS_TAG(`${v.SITE()}/${v.CSS_PATH()}`),
	
CODES_FOLDER 				:	()=>	`codes`,
CODES_FOLDER_URL			:	()=>	`${v.SITE()}/${v.CODES_FOLDER()}/`,

IMAGE_180					:	()=>	ImagePath(v.IMAGE_NAME(v),v.IMAGE_EXT(),180),
IMAGE_192					:	()=>	ImagePath(v.IMAGE_NAME(v),v.IMAGE_EXT(),192),
IMAGE_512					:	()=>	ImagePath(v.IMAGE_NAME(v),v.IMAGE_EXT(),520),

IMAGE_NAME					:	()=>	`splash`,
IMAGE_EXT					:	()=>	`svg`,
IMAGE_ALT					:	()=>	`Octaflower, the ${v.SITE_NAME()}'s logo. A geometric lotus flower composed of eight rows of eight petals in rainbow progression.`,

APPLEICON					:	()=>	ImagePath(v.IMAGE_NAME(v),v.IMAGE_EXT(),180),
FAVICON32					:	()=>	ImagePath("favicon-32x32","png"),

BODY						:	()=>v.PAGE_POST(),

HEAD						:	()=>	v.HEAD_SIMPLE(),
HEAD_SIMPLE					:	()=>	`${v.HEAD_ITEMS()}${v.CSS_REL()}`,
HEAD_BARE					:	()=>	v.HEAD_ITEMS(),

HEAD_ITEMS					:	()=>	`${v.HEAD_VIEWPORT()}${v.HEAD_THEME()}${v.HEAD_ICONS()}${v.HEAD_DATA_GRAPH()}${v.MANIFEST()}`,
HEAD_VIEWPORT				:	()=>	`<meta http-equiv="content-type" content="text/html; charset=UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/>`,
HEAD_ICONS					:	()=>	`<link href="${v.FAVICON32()}" rel="icon" type="image/png"/><link href="${v.FAVICON32()}" rel="shortcut icon" type="image/x-icon"/><link href="${v.APPLEICON()}" rel="apple-touch-icon"/>`,
HEAD_THEME					:	()=>	`<meta name="theme-color" content="${v.THEMECOLOUR()}">`,

TITLE						:	()=>	Capitalise(PageIdentifier().replace("-"," ")),
LINK						:	()=>	PageIdentifier(),
HEAD_DATA_GRAPH				:	()=>	`${v.HEAD_TITLE()}${v.HEAD_DESCRIPTION()}${v.HEAD_IMAGE()}${v.HEAD_LINK()}${v.HEAD_TYPE()}`,
HEAD_TITLE					:	()=>	`<title>${v.TITLE()}</title><meta property="og:title" content="${v.TITLE()}"/>`,
HEAD_DESCRIPTION			:	()=>	`<meta name="description" content="${v.DESCRIPTION()}"/><meta property="og:description" content="${v.DESCRIPTION()}"/>`,
HEAD_IMAGE					:	()=>	`<meta property="og:type" content="${v.TYPEGRAPH()}"/><meta property="og:image:alt" content="${v.IMAGE_ALT(v)}"/>`,
HEAD_LINK					:	()=>	`<meta property="og:url" content="${v.SITE()}/${v.LINK()}.html"/>`,
HEAD_TYPE					:	()=>	`<meta property="og:image" content="${v.SITE()}/${v.IMAGE_512()}"/>`,
	
SITEMAP_PATH				:	()=>	`sitemap.xml`,
	
CONTACT_FORM_URL			:	()=>	`${v.DOC_URL()}/forms/d/e/1FAIpQLSc7pMuScBJIJesW4LMXdegzH2nJh5tbnwR8PmqZvyMhNrUl8A/viewform?embedded=true`,
CONTACT_FORM_CUSTOM			:	()=>	`${v.MACRO_URL()}AKfycbzJnrnkaamwSWZbNKhgNxX4bNRx53A14LpaRQcGWQ/exec`,
CONTACTAREA					:	()=>	`<iframe src="${v.CONTACT_FORM_URL()}" ${v.IFRAME_OPTS()}>Loading...</iframe>`,
	
SHEET_URL_RECORD			:	()=>	`${v.SHEET_URL()}e/2PACX-1vQwd7CTU3k1HsrT4fPLljY9HSW5eWbOv118H3zn5nsRg6Uc1b_aTg577hjFoHLPCUbKAEmht603qmc7/pubhtml?gid=`,
SHEET_URL_GAMES_LIST		:	()=>	`${v.SHEET_URL()}e/2PACX-1vQIyh0-r33j0GqPOAtttQEP-MiOZ2Zk_hggfcFMH5_hiclaUCZu30MRaO58h1Hty9UGWefP25gBB56a/pubhtml?gid=`,

DISPLAY_LEGACY				:(idcode)=>`${v.SHEET_URL_RECORD()}${idcode}${v.SHEET_OPT()}`,
DISPLAY_EXTERNAL_OLD			:	()=>	`<div id="${v.LINK()}-area" class="external-area">${v.DISPLAY_IFRAME()}</div>`,
DISPLAY_EXTERNAL			:	()=>	`<div id="${v.LINK()}-area" class="external-area">Loading...</div>`,
DISPLAY_IFRAME				:	()=>	`<div class="section"><iframe src="${v.DISPLAY_LEGACY(v.DISPLAY_LEGACY_CODE())}" ${v.IFRAME_OPTS()}></iframe></div>`,

DISPLAY_SCRIPT				:	()=>	`<script>DisplayTable()</script>`,

AREA_PRE					:	()=>	`<div class="container">`,
TABULAR_AREA				:	()=>	`${v.AREA_PRE()}${v.DISPLAY_EXTERNAL()}${v.POST_PLUS_LABELS()}</div>`,
GUESTBOOK_AREA				:	()=>	`${v.AREA_PRE()}<h1 class="title">${v.TITLE()}</h1><div class="whiteboard"><div class="text ${v.STYLE()} post" id="post">${v.POST()}</div></div>${v.LABELS(v)}${v.DISPLAY_EXTERNAL()}</div>`,
GUESTBOOK_COMMENTS			:	()=>	`<div id="guestbook-area"></div>`,

BUTTON_SOON					:	()=>	`<div>Coming soon...</div>`,

RAINBOWLINE					:	()=>	`<div class="rainbowline"></div>`,

NAVOPTION					:	()=>	"",
NAVBAR_SELECTION			:	()=>	["about","news",{NAME:"Puzzles",LINK:"tag.html?search=Puzzle"},"posts","contact","guestbook","hall-of-fame","store"],
NAV_LINK					:	(link)=>(`<a href="${IsString(link)?link+".html":link.LINK}" class="nav-link" style="max-width: 728px;">${IsString(link)?Access(link,"TITLE"):link.NAME}</a>`),
NAVBAR						:	()=>	`<div class="nav">${v.NAV_LOGO()}<nav>${v.NAVBAR_SELECTION().map(v.NAV_LINK).join("\n")}${v.NIGHTMODE()}</nav>${v.RAINBOWLINE()}</div>`,
NAV_LOGO					:	()=>	`<a href="index.html"><div class="logo">${v.LOGO_SVG()}</div></a>`,

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
PICTURE						:(v,size)=>`<img src="${ImagePath(v.LINK(),v.IMAGE_EXT(),size)}" width="${size}" height="${size}" alt="${v.IMAGE_ALT(v)}" title="${v.IMAGE_ALT(v)}" loading="lazy"/>`,
PICTURE_RSS					:(v,size)=>`<img src="${v.SITE()}/images/${size}/${v.IMAGE_NAME(v)}.${v.IMAGE_EXT()}" width="${size}" height="${size}" alt="${v.IMAGE_ALT(v)}" title="${v.IMAGE_ALT(v)}"/>`,
PICTURE_DYNAMIC				:function(){if(window.innerWidth<512||window.innerHeight<512){return v.PICTURE(v,180)}else{return v.PICTURE(v,512)}},

FIGURE						:	()=>	`<figure class="figure">${v.PICTURE_DYNAMIC()}<figcaption class="legend">${v.CONTENT()}</figcaption></figure>`,
FIGURE_SIMPLE				:	()=>	`<figure class="figure">${v.PICTURE_DYNAMIC()}</figure>`,
FIGURE_MOSAIC				:	()=>	`<figure class="figure mosaic" onclick="(function(){ToggleBGMode('${v.LINK()}')})()">${v.PICTURE_DYNAMIC()}<figcaption class="legend">${v.POST()}</figcaption><p>${v.MOSAIC_TEXT()}</p></figure>`,

GIF							:	()=>	`<video autoplay loop muted playsinline><source src="${v.IMAGE_180()}" type="video/mp4"></source></video>`,

PUZZLE_SCRIPT_GAME			:	()=>	`codes/game/${v.LINK()}.js`,
PUZZLE_SCRIPT_EMBED			:	()=>	`codes/game/puzzlescript-embed.js`,
PUZZLE_SCRIPT				:	()=>	[v.PUZZLE_SCRIPT_EMBED(),v.PUZZLE_SCRIPT_GAME(),v.GAME_STYLE()],

GAME_STYLE					:	()=>	`codes/game/game.css`,
GAME_SCRIPT_GAME			:	()=>	`codes/game/${v.LINK()}/${v.LINK()}.js`,
GAME_SCRIPT					:	()=>	[v.GAME_SCRIPT_GAME(),v.GAME_STYLE()],

GUESTBOOK_ADD				:	()=>	`<div class="button centered" onclick="RequestGuestbook()" tabindex="0">Leave your message!</div>`,
BUTTON_GET					:	()=>	`<div class="button centered buy" tabindex="0">Get it now!</div>`,
//BUTTON_PREORDER				:	()=>	`<div class="button centered buy" tabindex="0">Preorder now!</div>`,
BUTTON_COMMENT				:	()=>	`<div class="button button-comment" onclick="RequestComment('${v.TITLE()}',this)" tabindex="0">Comment!</div>`,
BUTTON_SUBSCRIBE			:	()=>	`<div class="button centered" tabindex="0">${v.A_SUBSCRIBE()}</div>`,


COPYRIGHT					:	()=>	`Copyright ${v.NAME()} ${v.YEAR_SPAN()}, all rights reserved`,
COPYRIGHT_TEXT				:	()=>	`© ${v.NAME()} ${v.YEAR_START()}-${v.YEAR_NOW()}`,
LICENSE						:	()=>	`${v.LICENSE_CC_BY_4()}`,

LICENSE_MIT					:	()=>	`<a href="https://opensource.org/licenses/MIT" ${v.BLANK()}>MIT</a>`,
LICENSE_CC_BY_3				:	()=>	`<a href="https://creativecommons.org/licenses/by/3" ${v.BLANK()}>CC_BY 3.0</a>`,
LICENSE_CC_BY_4				:	()=>	`<a href="https://creativecommons.org/licenses/by/3.0" ${v.BLANK()}>CC_BY 4.0</a>`,
LICENSE_CC_BY_NC_SA_4		:	()=>	`<a href="https://creativecommons.org/licenses/BY_nc_SA/4.0/">CC BY_NC_SA 4.0</a>`,

DISCLAIMER					:	()=>	`<p class="disclaimer">THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>`,


BLANK						:	()=>	`target='_blank' rel="noopener noreferrer"`,


HTML_DOCTYPE				:	()=>	`<!DOCTYPE html>${v.HTML_PREFIX()}`,
HTML_PREFIX					:	()=>	`<html lang="${v.LANG()}" xml:lang="${v.LANG()}" prefix="og: http://ogp.me/ns#">`,

HTML_OUT					:(content)=>	`${v.HTML_DOCTYPE()}${v.HEAD()}<body class="body" id="${v.LINK()}">${content}${v.FOOTER_AREA()}</body></html>`,

PAGE_SIMPLE					:	()=>	v.MONO_OUT(v.WHITEBOARD_SIMPLE()),
PAGE_BARE					:	()=>	v.MONO_OUT(v.CONTENT()),
PAGE_POST					:	()=>	v.MAIN_OUT(v.WHITEBOARD())+v.SECTION_CHANGELOG()+v.SECTION_OUT(v.GUESTBOOK_COMMENTS())+v.FOOTER_AREA(),

PAGE_UNSTYLED				:	()=>	`${v.HTML_DOCTYPE()}${v.HEAD_BARE()}<body class="body" id="${v.LINK()}">${v.CONTENT()}${v.FOOTER_AREA()}</body></html>`,

MAIN_OUT					:	(post)=>	`<div class="main">${v.NAVBAR()}${post}</div>`,
MONO_OUT					:	(post)=>	`<div class="main">${v.NAVBAR()}${post}</div>${v.FOOTER_AREA()}`,
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

FOOTER_AREA					:	()=>	`<footer class="footer">${v.FOOTER_LINES()}</footer>`,
FOOTER_LINES				:	()=>	`<p>${v.COPYRIGHT_TEXT()}. ${v.A_TERMS()}. ${v.A_PRIVACY_POLICY()}. ${v.A_STATUS()}.</p><p> ${v.A_PRESS()}. ${v.A_SUBSCRIBE()} and ${v.A_SUPPORT()}!</p>`,


LOG_LINK					:	()=>	`<b><a href="${v.LINK()}-log.html">${v.TITLE_BOLD()}'s log</a></b>`,
LOG_COMMENTS				:	()=>	`<script>AddAfterElement('${v.BUTTON_COMMENT()}',"h2")</script>`,

SECTION_SUBSCRIBE			:	()=>	v.SECTION_OUT(`<div class="container">${v.SUBSCRIBE_ANNOUNCE()}</div>`),
SUBSCRIBE_ANNOUNCE			:	()=>	`<div class="announce"><p>Learn first-hand about ${v.NAME()}'s next project!</p>${v.BUTTON_SUBSCRIBE()}</div>`,
SUBSCRIBE_RSS				:	()=>	`<a href="${v.RSS_PATH()}" id="rss">Subscribe to RSS feed.</a>`,
SUBSCRIBE_EMAIL				:	()=>	`<a onclick="OpenModalSubscribe()">Subscribe to email alerts.</a>`,

DO_COMMENT					:	()=>	`<a href="#" onclick="RequestGuestbook()">Leave a comment!</a>`,

GOOGLE_PLUS_URL				:	()=>	`https://plus.google.com/u/0/`,
TWITTER_URL					:	()=>	`https://twitter.com/`,
GITHUB_IO_URL				:	()=>	`.github.io/`,
GITHUB_COM_URL				:	()=>	`.github.com/`,
PUZZLESCRIPT_URL			:	()=>	`https://www.puzzlescript.net/`,
PUZZLESCRIPT_URL_PLAY		:	()=>	`${v.PUZZLESCRIPT_URL()}play.html?p=`,
CONSOLE_URL_PLAY			:	()=>	`${v.SITE()}/game-console.html?game=`,
ITCH_URL					:	()=>	`.itch.io/`,

YT_URL						:	()=>	`https://www.youtube.com/watch?v=`,

DOC_URL						:	()=>	`https://docs.google.com`,
MACRO_URL					:	()=>	`https://script.google.com/macros/s/`,
SHEET_URL					:	()=>	`${v.DOC_URL()}/spreadsheets/d/`,
SHEET_OPT					:	()=>	`&single=true&widget=false&chrome=false&headers=false`,
IFRAME_OPTS					:	()=>	`width="100%" height="500px" frameborder="0" marginheight="0" marginwidth="0"`,
				
TITLE_BY					:	()=>	`${v.TITLE()} by ${v.NAME()} ${v.YEAR()}`,
TITLE_BY_AL					:	()=>	`${v.NAME()} et al., ${v.YEAR()}, <em>${v.TITLE()}</em>`,
TITLE_YEAR					:	()=>	`${v.TITLE()} (${v.YEAR()}) `,
TITLELONG					:	()=>	`${v.TITLE()} - ${v.TAGLINE()}`,
TITLE_BOLD					:	()=>	`<b>${v.TITLE()}</b>`,
				
TITLE_CLEAN					:	()=>	`${v.TITLE()}`,
TITLE_BY_CLEAN				:	()=>	`${v.TITLE_BY()}`,


HEADER						:	()=>	`<header>${v.ABOUT_TEXT()}${v.ONE_LINER()}</header>`,

ABOUT_TEXT					:	()=>	`<h2>About ${v.TITLE_BOLD()}</h2>`,
HOWTO_TEXT					:	()=>	`${v.FIGURE_SIMPLE()}<h2>How to play</h2><h3>Controls - keyboard</h3>`,
GAME_EXTRAS_TEXT			:	()=>	`${v.TOUCHSCREEN_TEXT()}${v.FEEDBACK_TEXT()}${v.NAVIGATION_TEXT()}${v.FULLSCREEN_TEXT()}${v.COMMUNITY()}`,
GAME_EXTRAS_HINTS_TEXT		:	()=>	`${v.TOUCHSCREEN_TEXT()}${v.FEEDBACK_TEXT()}${v.HINTS_TEXT()}${v.NAVIGATION_TEXT()}${v.FULLSCREEN_TEXT()}${v.COMMUNITY()}`,
NAVIGATION_TEXT				:	()=>	`<h3>Level navigation</h3><p>Press ${v.LEVEL_KEY()} or <kbd>click</kbd> <em>Level X/Y</em> or <em>Select level</em> in the game bar to navigate freely ${v.NAVOPTION()}.</p><p>Type the level number directly with ${v.NUM_KEYS()}, press <kbd>Tab</kbd>/<kbd>Shift</kbd>+<kbd>Tab</kbd> or <kbd>Left</kbd>/<kbd>Right</kbd> to <em>cycle through levels</em>, <kbd>Enter</kbd> or <kbd>Click</kbd> to <em>confirm</em>, <kbd>Esc</kbd> or <kbd>L</kbd> to <em>cancel</em>.</p>`,
NAVIGATION_TEXT_FREE		:	()=>	`between all levels.`,
NAVIGATION_TEXT_CHECKPOINT	:	()=>	` to previous checkpoints, or return to the most recent one. Please be aware that saving after going to a past checkpoint will erase your most recent checkpoint saves.`,
TOUCHSCREEN_TEXT			:	()=>	`<h3>Controls - touchscreen</h3><p><kbd>Tap</kbd> to simulate <em>pressing <kbd>X</kbd></em> and <kbd>swipe</kbd> to simulate an <em><kbd>arrow</kbd> keypress</em>.`,
UNDO_TOUCH_TEXT				:	()=>	`<em>undo</em>, `,
UNDO_RESTART_TEXT			:	()=>	`<p>${v.UNDO_TEXT()} ${v.RESTART_TEXT()}</p>`,
RESTART_TEXT				:	()=>	`Press ${v.RESTART_KEY()} to restart the level.`,
UNDO_TEXT					:	()=>	`Press ${v.UNDO_KEY()} to undo a move.`,
FEEDBACK_TEXT				:	()=>	`<h3>E-mail ${v.NAME()} real-time feedback</h3><p>Press ${v.FEEDBACK_KEY()} anytime to e-mail real-time feedback to ${v.NAME()}! Much appreciated!</p>`,
FULLSCREEN_TEXT				:	()=>	`<h3>Fullscreen</h3><p>Toggle Fullscreen by pressing ${v.FULLSCREEN_KEY()}.</p>`,
HINTS_TEXT					:	()=>	`<h3>Hints</h3><p>Request a <em>hint</em> by pressing ${v.HINT_KEY()}, but use them sparingly to preserve your standing, shall you enter ${v.A_HOF()}!</p>`,
AVATAR_TEXT					:	()=>	`<p>Control your <em>avatar</em> with the ${v.ARROWKEYS()}.</p>`,

ARROWKEYS					:	()=>	`<kbd>left</kbd> <kbd>up</kbd> <kbd>right</kbd> <kbd>down</kbd> or <kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd>`,
LEFT_KEY					:	()=>	`<kbd>left</kbd> or <kbd>A</kbd>`,
UP_KEY						:	()=>	`<kbd>up</kbd> or <kbd>W</kbd>`,
RIGHT_KEY					:	()=>	`<kbd>right</kbd> or <kbd>D</kbd>`,
DOWN_KEY					:	()=>	`<kbd>down</kbd> or <kbd>S</kbd>`,
NUM_KEYS					:	()=>	`<kbd>0</kbd> <kbd>1</kbd> <kbd>2</kbd> <kbd>3</kbd> <kbd>4</kbd> <kbd>5</kbd> <kbd>6</kbd> <kbd>7</kbd> <kbd>8</kbd> <kbd>9</kbd>`,
ACTION_KEY					:	()=>	`<kbd>X</kbd>, <kbd>Spacebar</kbd> or <kbd>Enter</kbd>`,
UNDO_KEY					:	()=>	`<kbd>Z</kbd>`,
RESTART_KEY					:	()=>	`<kbd>R</kbd>`,
FEEDBACK_KEY				:	()=>	`<kbd>E</kbd>`,
FULLSCREEN_KEY				:	()=>	`<kbd>F</kbd>`,
HINT_KEY					:	()=>	`<kbd>H</kbd>`,
LEVEL_KEY					:	()=>	`<kbd>L</kbd>`,
MUSIC_KEY					:	()=>	`<kbd>M</kbd>`,
CLICK						:	()=>	`<kbd>tap</kbd> or <kbd>click</kbd>`,

ICON						:(name)=>	`<kbd>${ObtainSymbol(name)}</kbd>`,

CREDITS						:	()=>	`<h2>Credits</h2>${v.CREDITS_AUTHORSHIP()}${v.CREDITS_MUSIC()}${v.CREDITS_ENGINE_SUPPORT()}`,
CREDITS_AUTHORSHIP			:	()=>	`<p><a href="${v.LINK_URL()}.html">${v.TITLE_BOLD()}</a> by ${v.NAME_YEAR()}.</p>`,
CREDITS_MUSIC				:	()=>	MusicCreditsHTML(v.LINK()),
CREDITS_ENGINE_SUPPORT		:	()=>	`<h3>Game Engine</h3>${v.PUZZLESCRIPT_TEXT()}${v.SOURCE_TEXT()}`,
CREDITS_ENGINE_VANILLA		:	()=>	`<p>Made with vanilla JS and CSS, including ${v.A_GAME_BAR()}!</p>`,
CREDITS_ENGINE_CLOSED		:	()=>	`<h3>Game Engine</h3>${v.PUZZLESCRIPT_TEXT()} The source will be available some time after the release.`,
PUZZLESCRIPT_TEXT			:	()=>	`<p>Made with ${v.A_PUZZLESCRIPT()} and ${v.A_GAME_BAR()}!</p>`,
SOURCE_TEXT					:	()=>	`<p>Inspect the ${v.A_SOURCE()} freely, but consider the option to ${v.A_SUPPORT()}!</p>`,
A_SOURCE					:	()=>	`<a ${v.BLANK()} href='http://puzzlescript.net/editor.html?hack=${v.CONTENT()}'><b>source</b></a>`,

MENTIONS					:	()=>v.MENTIONS_LINKS()?`<h3>Mentions</h3><ul>${v.MENTIONS_LINKS()}</ul>`:"",
MENTIONS_LINKS				:	()=>LinkGroupHTML({GROUP:"mentioned",ID:v.LINK()}),

HALL_OF_FAME_TEXT_SHORT		:	()=>	`<h3>Hall of fame</h3><p>Once you beat ${v.TITLE_BOLD()}, you'll be invited to enter ${v.A_HOF()}! As soon as you pass the final credits screen after winning, you'll be able to type your name in a new window. Make sure you are connected to the internet, then <em>press Submit</em> to be <b>remembered forever</b> or <em>close the window</em> to <b>forsake your glory</b>.</p>`,
HALL_OF_FAME_TEXT			:	()=>	`${v.HALL_OF_FAME_TEXT_SHORT()} <p>Record-keeping started March 26th 2018, so if you've beaten this game before this date you'll have to beat it again to enter ${v.A_HOF()}</p>.`,

COMMUNITY					:	()=>	`<h2>Community</h2>${v.HALL_OF_FAME_TEXT_SHORT()}${v.GUESTBOOK_MESSAGE()}${v.MENTIONS()}`,

GUESTBOOK_POST_TEXT			:	()=>	`<p>Enjoyed ${v.TITLE_BOLD()}? Add <b>your message</b> below to the ${v.A_GUESTBOOK()}!</p>`,
GUESTBOOK_MESSAGE			:	()=>	`<h3>Guestbook</h3>${v.GUESTBOOK_POST_TEXT()}${v.GUESTBOOK_ADD()}`,

FEEDBACK					:	()=>	`<h2>Feedback</h2><h3>Problems? Suggestions?</h3><p>Please ${v.A_LET_ME_KNOW()} !</p><h3>Praise?</h3>${v.GUESTBOOK_POST_TEXT()}${v.GUESTBOOK_ADD()}`,

PRESS_TEXT					:	()=>	`${v.PRESS_INTRO()}${v.PRESS_USAGE()}${ScreenshotGalleryHTML(v.LINK())}${v.OTHER_INQUIRIES()}`,
PRESS_INTRO					:	()=>	`<h2>Press</h2><p class="centre">Would you like....<ul><li>to write an article about ${v.TITLE_BOLD()}?</li><li>to feature ${v.TITLE_BOLD()} in a curated collection?</li><li>to record a playthrough video or livestream?</li></ul></p>`,
PRESS_USAGE					:	()=>	`<p>Feel free to use and edit, for those purposes, all material on this page, including:<ul> <li>text;</li><li>screenshots and logo below;</li><li>recorded gameplay footage;</li></ul>...as long as you provide appropriate credit and a direct link to this page.</p>`,

OTHER_INQUIRIES				:	()=>	`<h3>Other inquiries</h3><p class="centre">Check also the ${v.A_PRESS()} or ${v.A_CONTACT_ME()} for all unusual requests!</p>`,

VIDEO_SRC					:	()=>	`media/${v.LINK()}/${v.LINK()}.mp4`,
TRAILER_LAUNCHER			:	()=>	`<img class="card" onclick='OpenVideoModal("${v.TRAILER()}")' src="images/${v.TRAILER_IMAGE()}" alt="${v.TITLE()}'s trailer" title="${v.TITLELONG()} (trailer)" loading="lazy"/>`,

REDACTED					:	()=>	`<s>Redacted</s> `,

TH							:	()=>	`<th scope="col">`,

GAME_TABLE_ITEM				:	()=>	`<tr><td><a href="${v.GAME_LINK()}" ${v.BLANK()}>${v.TITLE()}</a> ${v.GAME_LINK_PS()}</td><td>${v.Author()}</td><td>${v.YEAR()}</td><td>${v.TAGS()}</td></tr>`,
GAME_TABLE_HEAD				:	()=>	`<thead><tr>${v.TH()}Title</th>${v.TH()}Author</th>${v.TH()}Year</th>${v.TH()}Tags</th></tr></thead>`,
GAME_LIST					:	()=>	`<table class="top-left"><caption>${v.NAME()}'s selected puzzlescript games</caption>${v.GAME_TABLE_HEAD()}${v.GAME_TABLE_BODY()}</table>`,
			
MOD_TABLE_ITEM				:	()=>	`<tr><td><a href="${v.GAME_LINK()}" ${v.BLANK()}>${v.TITLE()}</a></td><td>${v.Author()}</td><td>${v.YEAR()}</td><td>${v.USE()}</td></tr>`,
			
MOD_TABLE_HEAD				:	()=>	`<thead><tr>${v.TH()}Title</th>${v.TH()}Author</th>${v.TH()}Year</th>${v.TH()}Usage</th></tr></thead>`,
MOD_LIST					:	()=>	`<table class="top-left"><caption>Useful puzzlescript mods and forks</caption>${v.MOD_TABLE_HEAD()}${v.MOD_TABLE_BODY()}</table>`,
			
TOOL_TABLE_ITEM				:	()=>	`<tr><td><a href="${v.TOOL_LINK()}" ${v.BLANK()}>${v.TITLE()}</a></td><td>${v.Author()}</td><td>${v.YEAR()}</td><td>${v.USE()}</td><td>${v.TAGS()}</td></tr>`,
			
TOOL_TABLE_HEAD				:	()=>	`<thead><tr>${v.TH()}Title</th>${v.TH()}Author</th>${v.TH()}Year</th>${v.TH()}Usage</th>${v.TH()}Tags</th></tr></thead>`,
TOOL_LIST					:	()=>	`<table class="top-left"><caption>Useful puzzlescript tools</caption>${v.TOOL_TABLE_HEAD()}${v.TOOL_TABLE_BODY()}</table>`,

L_NEW						:	()=>	LabelHTML("New"),
L_DONE						:	()=>	LabelHTML("Done"),
L_PART						:	()=>	LabelHTML("Partly"),
L_PROBLEM					:	()=>	LabelHTML("Problem"),
L_SLOW						:	()=>	LabelHTML("Slow"),
L_OK						:	()=>	LabelHTML("OK","DOne"),
L_EXP						:	()=>	LabelHTML("Experimental","Problem"),


MANIFEST					:	()=>"",
PWA_MANIFEST				:	()=>	`<link rel="manifest" id="manifest" href='data:application/manifest+json,${console.log(v.PWA_MANIFEST_CONTENT()),v.PWA_MANIFEST_CONTENT()}'/>`,
PWA_MANIFEST_CONTENT		:	()=>	`{${v.PWA_NAME()},${v.PWA_DISPLAY()},${v.PWA_ICONS()},${v.PWA_DESC()},${v.PWA_LANG()},${v.PWA_SCOPE()},${v.PWA_WORKER()}}`,

DESCRIPTION					:	()=>	v.PARSER_MARKSHORT(v.POST()),
WORD_LIMIT_SHORT			:	()=>300,

PARSER_MARKSHORT			:(txt)=> StripHTML(txt).slice(0,v.WORD_LIMIT_SHORT()),
PARSER_UNDERSCORE			:(txt)=> StripHTML(txt).replace(/\s+/ig,"_"),

ONE_LINER_U					:	()=>	v.PARSER_UNDERSCORE(v.ONE_LINER()),
TITLE_BY_U					:	()=>	v.PARSER_UNDERSCORE(v.TITLE_BY()),
SHORTNAME_U					:	()=>	v.PARSER_UNDERSCORE(v.SHORTNAME()),
DESCRIPTION_U				:	()=>	v.PARSER_UNDERSCORE(v.DESCRIPTION()),

ORIGIN						:	()=>	v.SITE(),

PWA_DISPLAY					:	()=>	`"theme_color":"${v.THEMECOLOUR()}","background_color":"${v.THEMECOLOUR()}","display":"standalone","orientation":"${v.ORIENTATION()}"`,
PWA_DESC					:	()=>	`"description":"${v.DESCRIPTION_U()}","categories":[${v.CATEGORIES()}]`,
PWA_NAME					:	()=>	`"short_name":"${v.SHORTNAME_U()}","name":"${v.TITLE_BY_U()}"`,
PWA_LANG					:	()=>	`"dir":"ltr","lang":${v.LANG()}`,
PWA_SCOPE					:	()=>	`"start_url":"${v.ORIGIN()}/${v.LINK()}.html?source=homescreen","scope":"${v.ORIGIN()}"`,
PWA_WORKER					:	()=>	`"serviceworker":{"src":"${v.ORIGIN()}/cacher.js"}`,

ORIENTATION					:()=>`landscape`,

PWA_ICON_OBJ				:(size)=>`{"src":"${v.ORIGIN()}/${ImagePath(v.IMAGE_NAME(v),v.IMAGE_EXT(),size)}","type":"image/${v.IMAGE_EXT()}","sizes":"${size}x${size}"}`,
PWA_ICONS					:	()=>	`"icons":[${v.PWA_ICON_OBJ(512)},${v.PWA_ICON_OBJ(192)},${v.PWA_ICON_OBJ(180)}]`,

NEWS_LIMIT_RECENT			:	()=>	3,
LATEST_LIMIT				:	()=>	12,
RSS_LIMIT					:	()=>	60,
RSS_PATH					:	()=>	`${v.SITE()}/rss.xml`,
RSS_SITE_DESCRIPTION		:	()=>	`Don't miss out on novelties from The ${v.SITE_NAME()}!`,
RSS_SVG						:	()=>	`<svg viewBox="0 0 98.918 100" xml:space="preserve"><ellipse cx="13.566" cy="86.286" rx="13.566" ry="13.714"/><path d="M65.569,100H46.35c0-25.879-20.752-46.858-46.35-46.858l0,0V33.715C36.214,33.715,65.569,63.391,65.569,100z"/><path d="M79.135,100c0-44.183-35.429-80-79.135-80V0c54.631,0,98.918,44.772,98.918,100H79.135z"/></svg>`,
RSS_CHANNEL_IMAGE			:	()=>	`<image><link>${v.SITE()}</link><title>${v.SITE_NAME()}</title><url>${v.SITE()}/${v.LOGO_PATH()}</url></image>`,
XML							:	()=>	`<?xml version="1.0" encoding="UTF-8"?>`,

CHANGELOG					:	()=>	ChangelogHTML(),
SECTION_CHANGELOG			:	()=>	v.CHANGELOG()?v.SECTION_OUT(v.WHITEBOARD_OUT(v.CHANGELOG())):"",


BOOKMARKLET_BROWSER_TEXT	:	()=>	`<h3>In Chrome</h3><p><kbd>Drag</kbd> the above bookmarklet link to your bookmarks toolbar.</p><h3>In Firefox</h3><p><kbd>Right click</kbd> on the above bookmarklet link, then select "bookmark this link".</p><h3>If nothing else works</h3><p>Replace the content of an old bookmark with the above link content. Or you could run the bookmarklet js code directly in a game page (it'd still be quicker than manual alternatives).</p>`,

LOZ_SYMBOL_TEXT				:	()=>	`<h3>What is the ◊ symbol?</h3><p>When available, links are opened in the ${v.A_GAME_CONSOLE()}, which loads the ${v.A_GAME_BAR()} by default. This is indicated by the ◊ symbol. Clicking this symbol directly will, however, direct you to the original ${v.A_PUZZLESCRIPT()} game page!</p><p><b>NB:</b> To add a <em>level selector</em> and <em>fullscreen</em> option  on the fly to other games, just use the ${v.A_BOOKMARKLET()}!</p>`,
LOZ_SYMBOL					:	()=>	`&loz`,

A_SELF_LINK					:	()=>	`<a href="${v.SITE()}/${v.LINK()}">${v.LINK()}</a>`,
A_SELF_LINK_FULL			:	()=>	`<a href="${v.SITE()}/${v.LINK()}">${v.SITE()}/${v.LINK()}</a>`,
AUTO_CITATION				:	()=>	`<p class="reference">${v.TITLE_BY_AL()}, accessed ${v.TODAY_DATE()}, ${v.A_SELF_LINK_FULL()}</p>`,
TODAY_DATE					:	()=>	`<span class="update-today">${DateNamer()}</span>`,

DATE						:	(page)=>	`${page.DAY()}-${page.MONTH()}-${page.YEAR()}`,
DATE_YMD					:	(page)=>	`${page.YEAR()}-${page.MONTH()}-${page.DAY()}`,
DATE_TEXT					:	(page)=>	page&&page.DAY&&page.MONTH&&page.YEAR?DateName(page.DAY(),page.MONTH(),page.YEAR()):"",
DATE_DATE					:	(page)=>	page&&page.DAY&&page.MONTH&&page.YEAR?DateDate(page.DAY(),page.MONTH(),page.YEAR()):Today(),

SL							:	()=>	`<span class="legal-term">`,
EULA_COMPANY				:	()=>	`${v.SL()}${v.NAME()}</span>`,
EULA_CUSTOMER_SERVICE		:	()=>	`${v.EULA_COMPANY()} `,
EULA_SOFTWARE				:	()=>	`${v.SL()}software</span>`,
EULA_DEVICE					:	()=>	`${v.SL()}device</span>`,
EULA_IP						:	()=>	`${v.SL()}Intellectual Property</span>`,
EULA_YOU					:	()=>	`${v.SL()}you</span>`,
EULA_YOUR					:	()=>	`${v.SL()}your</span>`,
EULA_EMAIL					:	()=>	`${v.SL()}${v.SITE_SHORT()}</span>${v.AT_M()}`,
EULA_WRITE_ADDRESS			:	()=>	`${v.EULA_EMAIL()}`,
AT_M						:	()=>	`<img alt="at a popular provider" src="images/m.png"/ class="contact-at">`,
EULA_JURISDICTION			:	()=>	`the state of Washington`,
EULA_COURT					:	()=>	`King County, Washington`,
EULA_AGREEMENT				:	()=>	`this ${v.SL()}Agreement</span>`,
EULA_SUDDENLY				:	()=>	`${v.SL()}suddenly</span>`,
EULA_WHEN_POSSIBLE			:	()=>	`${v.SL()}This applies where legally permissible.</span>`,
EULA_WHEN_POSSIBLE_FULL		:	()=>	`Please note, however, that some states or provinces do not permit certain limitations like these, so these limits on other damages may not fully apply to ${v.EULA_YOU()}.`,
EULA_BINDING_DELAY			:	()=>	`30 days after publication`,
EULA_LEGAL_ACTION_DELAY		:	()=>	`one year`,
EULA_REFUND_PERIOD			:	()=>	`30 days`,

FILTER_TEXT_CODE			:	(keyword)=>	`<code>?search=<b>${keyword}</b></code>`,
FILTER_TEXT					:	()=>	`<h3>Filtering</h3><p>Filter the ${v.TITLE_BOLD()} by keywords such as <b>name</b>, <b>author</b> and <b>date added</b>. Just type a keyword in the search field atop the table. Keywords are space- and case-insensitive.</p><p>To save and link to a specific filtered view of the table, ensure this page's URL ends with ${v.FILTER_TEXT_CODE("keywords")}.</p><p>All saved filtered views update whenever the ${v.TITLE_BOLD()} updates.</p>`,

CSI							:	()=>	`<code><span><</span>`,
CSF							:	()=>	`<span>></span></code>`

};

try{v={..Variables,...v}}
catch{v=Variables}
Shout("variables");

//Variables
function Functionalise(data){
	if (typeof data==="function")
		return data;
	else
		return function(){return data;};
}


function Unfunctionalise(data){
	if (typeof data==="function")
		return data();
	else
		return data;
}

function NormaliseVariables(Variables,TemplateFunction) {
	return MapObject(Variables,function (v,k,o){
		o[k]=(()=>TemplateFunction(v));
	})
}