///////////////////////////////////////////////////////////////////////////////
// Canvas Drawing

GetContext=function(targetIDsel){
	var targetIDsel=targetIDsel||"CANVAS";
	return GetElement(targetIDsel).getContext("2d");
}

DrawImage=function(txtObj){
	var ctx=GetContext(txtObj.ctx);
	if(!txtObj.elem)
		return console.log("no image element in",txtObj);

	var elem=txtObj.elem;
	var x=txtObj.x?txtObj.x:0;
	var y=txtObj.y?txtObj.y:0;
	var width=txtObj.width?txtObj.width:100; //Improve these defaults
	var height=txtObj.height?txtObj.height:100;

	ctx.drawImage(elem,x,y,width,height);
}

DrawPolygon=function(txtObj){
	var ctx=GetContext(txtObj.ctx);
	var strokeColor=txtObj.strokeColor?txtObj.strokeColor:getComputedStyle(document.body)["strokeColor"];
	var fillColor=txtObj.fillColor?txtObj.fillColor:getComputedStyle(document.body)["background-strokeColor"];

	var x=txtObj.x?txtObj.x:0;
	var y=txtObj.y?txtObj.y:0;
	var size=txtObj.size?txtObj.size:100;

	var lineWidth=txtObj.lineWidth?txtObj.lineWidth:size/20;

	var n=txtObj.n?txtObj.n:3;				//Number of sides
	var startAngle=txtObj.startAngle?txtObj.startAngle:0;		//StartAngle

	ctx.beginPath();
	if(n>=3){
		for (var i=0;i<n;i++){
			var angle=startAngle+i*PI*2/n;
			var xpos=x+size*Cos(angle);
			var ypos=y+size*Sin(angle);
			ctx.lineTo(xpos,ypos);
		}
	}
	else{
		ctx.arc(x,y,size,0,PI*2);
	}
	ctx.closePath();
	ctx.fillStyle=fillColor;
	ctx.fill();

	if(txtObj.lineWidth){
		ctx.lineWidth=lineWidth;
		ctx.strokeStyle=strokeColor;
		ctx.stroke();
	}
}

////////////////////////////////////////////////////////////////////////////////
Shout("data-game-canvas");