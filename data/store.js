var Store={
"puzzle-type":{
	AVAILABLE:()=>true,
	PRICE:()=>"10€",
	ACTION:()=>"Buy",
	TITLE:()=>"Puzzle type",
	TAGLINE:()=>"an inductive typing  puzzle",
	CALL:()=>"Find out whether you're the <b>Puzzle type</b>!",
	DETAILS:()=>`<p>Desktop version.</p><p>All information in the official ${AHTML("puzzle-type")} page.</p>`,
	LINK:()=>"puzzle-type",
	IMAGE_EXT:()=>"gif",
	IMAGE_ALT:()=>"Puzzle type",
	PRODUCT_KEY:()=>"sku_GE9y0FHJHS0rtN",
	STRIPE_KEY:()=>"pk_test_w0G0ENTYZ67hs4uUfdO7HYcp00whShrwUN",
	SUCCESS_LINK:()=>"https://pedropsi.github.io/puzzle-type",
	ERROR_LINK:()=>"https://pedropsi.github.io/puzzle-type",
	ACTION_BUTTON:v.BUTTON_SOON,
	OWL:()=>"78269703/8AB38B13",
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
	LINK:()=>"store",
	CALL:()=>`Send ${v.NAME()} a small gift!`,
	IMAGE_ALT:()=>"Present",
	ACTION_BUTTON:v.BUTTON_SOON,
	OWL:()=>"78269976/1FDC655D",
	INTEGRATION:()=>""
	}
}


function StoreHTML(){
	var products=Values(Store);
	return products.map(ProductHTML).join("\n");
}

function StoreImageHTML(obj){
	var id=GenerateId();
	var size=180;
	var src=ImagePath(obj.LINK(),obj.IMAGE_EXT()||v.IMAGE_EXT(),size);
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
		${ProdObj.INTEGRATION(ProdObj)}
	</div>`
}

function StripeButtonHTML(ProdObj){
	return `
	<div id="checkout_BUTTON-${ProdObj.PRODUCT_KEY()}" class="button centered buy" tabindex="0">
		${ProdObj.ACTION()} (${ProdObj.PRICE()})
	</div>`;
}

function StripeIntegrationHTML(ProdObj){
return `
<div id="error-message-${ProdObj.PRODUCT_KEY()}"></div>
<script>
	function Integrate_${ProdObj.PRODUCT_KEY()}(){
		var stripe=Stripe('${ProdObj.STRIPE_KEY()}');
		var checkoutButton=document.getElementById('checkout-button-${ProdObj.PRODUCT_KEY()}');
		checkoutButton.addEventListener('click',function(){
			stripe.redirectToCheckout({
				items:[{sku:'${ProdObj.PRODUCT_KEY()}',quantity:1}],
				successUrl:'${ProdObj.SUCCESS_LINK()}?source=stripe&result=success',
				cancelUrl:'${ProdObj.ERROR_LINK()}?source=stripe&result=failure'
			})
			.then(function(result){
				if(result.error){
					var displayError=document.getElementById('error-message-${ProdObj.PRODUCT_KEY()}');
					displayError.textContent=result.error.message;
				}
			});
		});
	};
	
	DelayUntil(function(){return typeof Stripe!=="undefined";},Integrate_${ProdObj.PRODUCT_KEY()});
	</script>`;
}

if(DATA){DATA["Store"]=Store}else{var DATA={"Store":Store}}
Shout("store");