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
	var cross=opts.cross?true:false;
	var star=opts.star?true:cross;
	var weight=opts.weight?opts.weight:0.5;
	if(n>=3){
		for (var i=0;i<n;i++){
			var angle=startAngle+i*PI*2/n;
			var xpos=x+size*Cos(angle);
			var ypos=y+size*Sin(angle);
			coordinates.push([xpos,ypos]);
			if(star)
				coordinates.push([x+size*weight*Cos(angle+PI/n),y+size*weight*Sin(angle+PI/n)]);
			if(cross){
				coordinates.push([x+size*weight*Cos(angle+PI/2/n),y+size*weight*Sin(angle+PI/2/n)]);
				coordinates.push([x+size*weight*Cos(angle-PI/2/n),y+size*weight*Sin(angle-PI/2/n)]);
			}
		}
	}
	return coordinates
}

DrawLine=function(opts){
	var ctx=opts.ctx||GetContext(opts.target);
	var strokeColor=opts.strokeColor?opts.strokeColor:getComputedStyle(document.body)["strokeColor"]||"black";

	var size=opts.size?opts.size:100;
	var lineWidth=opts.lineWidth?opts.lineWidth:size/20;

	var x0=(typeof opts.x0!=="undefined")?opts.x0:0;
	var x1=(typeof opts.x1!=="undefined")?opts.x1:(x0+100);
	var y0=(typeof opts.y0!=="undefined")?opts.y0:0;
	var y1=(typeof opts.y1!=="undefined")?opts.y1:(y0+100);

	ctx.beginPath();
	ctx.moveTo(x0,y0);
	ctx.lineTo(x1,y1);

	if(opts.dash)
		ctx.setLineDash(opts.dash);/*dashes are 5px and spaces are 3px*/

	ctx.lineCap=opts.lineCap||"round";
	ctx.lineWidth=lineWidth;
	ctx.strokeStyle=strokeColor;
	ctx.lineJoin=opts.lineJoin||"round";//"bevel|round|miter";

	ctx.stroke();
}

DrawGrid=function(opts){
	var rows=opts.rows||10;
	var cols=opts.cols||10;
	var x0=opts.x0||0;
	var y0=opts.y0||0;
	var x1=opts.x1||500;
	var y1=opts.y1||500;

	var w=x1-x0;
	var h=y1-y0;

	var dx=1;
	var dy=1;

	if(typeof opts.dx!=="undefined")
		dx=opts.dx;
	if(typeof opts.dy!=="undefined")
		dy=opts.dy;

	if(opts.vertical){
		dx=0;dy=1;
	} else if(opts.horizontal){
		dx=1;dy=0;
	}

	var spacex=(opts.space||0)*dx;
	var spacey=(opts.space||0)*dy;

	for(var i=0;i<cols;i++)
		for(var j=0;j<rows;j++){

			DrawLine({
				...opts,
				x0:(x0+spacex/2)+i/cols*w,
				x1:(x0-spacex/2)+(i+dx)/cols*w,
				y0:(y0+spacey/2)+j/rows*h,
				y1:(y0-spacey/2)+(j+dy)/rows*h
			})
		}

}


DrawShape=function(opts){
	var ctx=opts.ctx||GetContext(opts.target);
	var strokeColor=opts.strokeColor?opts.strokeColor:getComputedStyle(document.body)["strokeColor"]||"black";
	var fillColor=opts.fillColor?opts.fillColor:getComputedStyle(document.body)["background-strokeColor"]||"white";

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

DrawSVG=function(opts){
	ctx=opts.ctx||GetContext(opts.target);
	if(!opts.path)
		return;
	let p = new Path2D(opts.path);
	var fillColor=opts.colour?opts.colour:getComputedStyle(document.body)["background-strokeColor"]||"black";
	ctx.fillStyle=fillColor;
	ctx.fill(p);
}



////////////////////////////////////////////////////////////////////////////////
Shout("data-game-canvas");