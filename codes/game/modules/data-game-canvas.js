///////////////////////////////////////////////////////////////////////////////
// Canvas Drawing

GetContext=function(targetIDsel){
	var targetIDsel=targetIDsel||"CANVAS";
	return GetElement(targetIDsel).getContext("2d");
}

DrawImage=function(opts){
	var ctx=GetContext(opts.target);
	if(!opts.elem)
		return console.log("no image element in",opts);

	var elem=opts.elem;
	var x=opts.x?opts.x:0;
	var y=opts.y?opts.y:0;
	var width=opts.width?opts.width:100; //Improve these defaults
	var height=opts.height?opts.height:100;

	ctx.drawImage(elem,x,y,width,height);
}

RegularPolygonPoints=function(opts){
	var x=opts.x?opts.x:0;								//centre y
	var y=opts.y?opts.y:0;								//centre X
	var size=opts.size?opts.size:100;					//Radius
	var n=opts.n?opts.n:3;								//Number of sides
	var startAngle=opts.startAngle?opts.startAngle:0;	//StartAngle
	var coordinates=[];
	var star=opts.star?true:false;
	var weight=opts.weight?opts.weight:0.5;
	if(n>=3){
		for (var i=0;i<n;i++){
			var angle=startAngle+i*PI*2/n;
			var xpos=x+size*Cos(angle);
			var ypos=y+size*Sin(angle);
			coordinates.push([xpos,ypos]);
			if(star)
				coordinates.push([x+size*weight*Cos(angle+PI/n),y+size*weight*Sin(angle+PI/n)]);
		}
	}
	return coordinates
}

DrawShape=function(opts){
	var ctx=opts.ctx||GetContext(opts.target);
	var strokeColor=opts.strokeColor?opts.strokeColor:getComputedStyle(document.body)["strokeColor"];
	var fillColor=opts.fillColor?opts.fillColor:getComputedStyle(document.body)["background-strokeColor"];

	var size=opts.size?opts.size:100;
	var lineWidth=opts.lineWidth?opts.lineWidth:size/20;

	var Drawer=opts.Drawer||Identity;

	ctx.beginPath();
	Drawer(opts);
	ctx.closePath();
	ctx.fillStyle=fillColor;
	ctx.fill();

	if(opts.lineWidth){
		ctx.lineWidth=lineWidth;
		ctx.strokeStyle=strokeColor;
		ctx.stroke();
	}
}

DrawStar=function(opts){
	var opts={...opts,star:true};
	DrawRegularPolygon(opts);
}

DrawRegularPolygon=function(opts){
	opts.coordinates=RegularPolygonPoints(opts);
	opts.ctx=opts.ctx||GetContext(opts.target);
	opts.Drawer=function(opts){
		opts.coordinates.map(xy=>opts.ctx.lineTo(xy[0],xy[1]));
	}
	DrawShape(opts)
}

DrawCircle=function(opts){
	opts.ctx=opts.ctx||GetContext(opts.target);
	opts.Drawer=function(opts){
		opts.ctx.arc(opts.x,opts.y,opts.size,0,PI*2);
	}
	DrawShape(opts);
}

DrawRectangles=function(opts,coordinates){
	opts.ctx=opts.ctx||GetContext(opts.target);
	opts.Drawer=function(opts){
		coordinates.map(abcd=>opts.ctx.rect(abcd[0],abcd[1],abcd[2],abcd[3]));
	}
	DrawShape(opts);
}


////////////////////////////////////////////////////////////////////////////////
Shout("data-game-canvas");