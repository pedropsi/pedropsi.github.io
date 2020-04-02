var Store={
PROD_PUZZLE_TYPE:{
	AVAILABLE:()=>true,
	PRICE:()=>"5€",
	ACTION:()=>"Buy",
	TITLE:()=>"Puzzle type",
	TAGLINE:()=>"a cryptic typing puzzle",
	CALL:()=>"Find out whether you're the <b>Puzzle type</b>!",
	ONE_LINER:()=>"<p>Are you the <b>Puzzle-type</p>? Find out in this cryptic keyboard typing puzzle!</p>",
	DETAILS:()=>`<p>Desktop version.</p><p>All information in the official ${v.A_PUZZLE_TYPE()} page.</p>`,
	IMAGE_NAME:()=>"puzzle-type",
	IMAGE_EXT:()=>"gif",
	IMAGE_ALT:()=>"Puzzle type",
	PRODUCT_KEY:()=>"sku_GE9y0FHJHS0rtN",
	STRIPE_KEY:()=>"pk_test_w0G0ENTYZ67hs4uUfdO7HYcp00whShrwUN",
	SUCCESS_LINK:()=>"https://pedropsi.github.io/puzzle-type",
	ERROR_LINK:()=>"https://pedropsi.github.io/puzzle-type",
	ACTION_BUTTON:v.BUTTON_SOON,//StripeButtonHTML,
	INTEGRATION:StripeIntegrationHTML
	},
PROD_GIFT:{
	AVAILABLE:()=>true,
	PRICE:()=>"10€",
	ACTION:()=>"Gift",
	TITLE:()=>"Gift",
	TAGLINE:()=>"a token of appreciation",
	CALL:()=>"Spread the good karma.",
	ONE_LINER:()=>`<p>Do you like the ${v.SITE_NAME()}</p>? This is an option to show your appreciation!</p>`,
	DETAILS:()=>`<p>Presents?</p>`,
	IMAGE_NAME:()=>"store",
	CALL:()=>"Ho ho ho!",
	IMAGEALT:()=>"Coming soon.",
	ACTION_BUTTON:v.BUTTON_SOON,
	INTEGRATION:()=>""
	}
}


function StoreHTML(){
	var products=Values(Store);
	return products.map(ProductHTML).join("\n");
}

function ProductHTML(ProdObj){
	var ProdObj={...v,...ProdObj};
	return `<div class="product-container">
		<h2 class="product-title">${ProdObj.TITLE()}</h2>
		<p class="product-tagline">${ProdObj.TAGLINE()}</p>
		<div class="product_IMAGE">${v.PICTURE(ProdObj,180)}</div>
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

try{v={...v,...Store}}
catch{v=Store}
Shout("store");