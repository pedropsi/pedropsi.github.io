var Store={
"puzzle-type":{
	AVAILABLE:()=>true,
	PRICE:()=>"10€",
	ACTION:()=>"Buy",
	TITLE:()=>"Puzzle type",
	TAGLINE:()=>"an inductive typing  puzzle",
	CALL:()=>"Find out whether you're the <b>Puzzle type</b>!",
	DETAILS:()=>`<p>Desktop version.</p><p>All information in the official ${AHTML("puzzle-type")} page.</p>`,
	LINK:"puzzle-type",
	IMAGE_EXT:()=>"gif",
	IMAGE_ALT:()=>"Puzzle type",
	ACTION_BUTTON:v.BUTTON_SOON,
	INTEGRATION:()=>""
	},
"gift":{
	AVAILABLE:()=>true,
	PRICE:()=>"5€",
	ACTION:()=>"Gift",
	TITLE:()=>"Gift",
	TAGLINE:()=>"a token of appreciation",
	CALL:()=>"Spread the good karma.",
	DETAILS:()=>`<p>What is in the box?</p>`,
	LINK:"store",
	CALL:()=>`Send ${v.NAME()} a small gift!`,
	IMAGE_ALT:()=>"Present",
	ACTION_BUTTON:v.BUTTON_SOON,
	}
}


function StoreHTML(){
	var products=Values(Store);
	return products.map(ProductHTML).join("\n");
}

function StoreImageHTML(obj){
	var id=GenerateId();
	var size=180;
	var src=ImagePath(obj.LINK,obj.IMAGE_EXT()||v.IMAGE_EXT(),size);
	LazyImageLoader(id,src);							
	return `<img id="${id}" 
				class="image" 
				width="${size}" 
				height="${size}" 
				alt="${obj.IMAGE_ALT(v)}" 
				title="${obj.IMAGE_ALT(v)}" 
				loading="lazy"/>`
}

function ProductHTML(ProdObj){
	var ProdObj={...v,...ProdObj};
	return `<div class="product-container">
		<h2 class="product-title">${ProdObj.TITLE()}</h2>
		<p class="product-tagline">${ProdObj.TAGLINE()}</p>
		<div class="product-image">
		${StoreImageHTML(ProdObj)}</div>
		<div class="product-details text">${ProdObj.DETAILS()}</div>
		<div class="checkout">
			<div class="product-call text">${ProdObj.CALL()}</div>
			${ProdObj.ACTION_BUTTON(ProdObj)}
		</div>
	</div>`
}


if(DATA){DATA["Store"]=Store}else{var DATA={"Store":Store}}
DefinedShout("store");