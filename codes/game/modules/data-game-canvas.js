///////////////////////////////////////////////////////////////////////////////
// Canvas Drawing

GetContext=function(targetIDsel){
	return GetContextElement(targetIDsel).getContext("2d");
}

GetContextElement=function(targetIDsel){
	var targetIDsel=targetIDsel||"CANVAS";
	return GetElement(targetIDsel);
}


function Width(element){
	var e=GetContextElement(element);
	var w=e.width;
	if(w==="undefined")
		w=e.getBoundingClientRect().width;
	return w;
}

function Height(element){
	var e=GetContextElement(element);
	var h=e.height;
	if(h==="undefined")
		h=e.getBoundingClientRect().height;
	return h;
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
	var e=GetContextElement(opts.target)
	var W=Width(e);
	var H=Height(e);
	var ctx=opts.ctx||GetContext(opts.target);
	
	var strokeColor=opts.strokeColor?opts.strokeColor:getComputedStyle(document.body)["strokeColor"]||"black";

	var lineWidth=opts.lineWidth?opts.lineWidth:(2/100);

	var x0=(typeof opts.x0!=="undefined")?opts.x0:0;
	var x1=(typeof opts.x1!=="undefined")?opts.x1:1;
	var y0=(typeof opts.y0!=="undefined")?opts.y0:0;
	var y1=(typeof opts.y1!=="undefined")?opts.y1:1;

	ctx.beginPath();
	ctx.moveTo(x0*W,y0*H);
	ctx.lineTo(x1*W,y1*H);

	if(opts.dash)
		ctx.setLineDash(opts.dash);/*px convert to relative*/

	ctx.lineCap=opts.lineCap||"round";
	ctx.lineWidth=lineWidth;
	ctx.strokeStyle=strokeColor;
	ctx.lineJoin=opts.lineJoin||"round";//"bevel|round|miter";

	ctx.stroke();
}

DrawSegmentLine=function(opts){
	var rows=opts.rows||10;
	var cols=opts.cols||10;
	var x0=opts.x0||0;
	var y0=opts.y0||0;
	var x1=opts.x1||1;
	var y1=opts.y1||1;

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

	for(var i=0;i<cols;i++)
		for(var j=0;j<rows;j++){

			DrawLine({
				...opts,
				x0:x0+i/cols*(x1-x0),
				x1:x0+(i+dx)/cols*(x1-x0),
				y0:y0+j/rows*(y1-y0),
				y1:y0+(j+dy)/rows*(y1-y0)
			})
		}
}

DrawGrid=function(opts){
	var x0=opts.x0;
	var x1=opts.x1;
	var y0=opts.y0;
	var y1=opts.y1;

	var s=opts.lineScale||4;

	var dash=[2*s,2*s];
	var lineWidth=s/4;
	DrawSegmentLine({...opts,vertical:true,dash:dash,lineWidth:lineWidth});
	DrawSegmentLine({...opts,horizontal:true,dash:dash,lineWidth:lineWidth});

	var frameOpts={...opts,dash:[1,1],lineWidth:lineWidth*2};
	DrawLine({...frameOpts,x0:x1});
	DrawLine({...frameOpts,y0:y1});
	DrawLine({...frameOpts,x1:x0});
	DrawLine({...frameOpts,y1:y0});	
}


GridExtremes=function(opts){
	var opts={...opts};
	var rows=opts.rows;
	var cols=opts.cols;
	if(typeof opts.border==="undefined")
		opts.border=1;
	var b=opts.border*2;

	if(typeof opts.canvasWidth==="undefined")
		opts.canvasWidth=Width(opts.target);
	
	if(typeof opts.canvasHeight==="undefined")
		opts.canvasHeight=Height(opts.target);
	
	var width=opts.canvasWidth;
	var height=opts.canvasHeight;

	var square=height/(rows+b);
	if(width/(cols+b)<square)
		square=width/(cols+b);

	var	x0=(width/2-square*cols/2);
	var	y0=(height/2-square*rows/2);
	var	x1=(width/2+square*cols/2);
	var	y1=(height/2+square*rows/2);

	var lineScale=Power((y1-y0)*(x1-x0)/(width*height)/(rows*cols),0.5)*50

	return {
		x0:x0,
		x1:x1,
		y0:y0,
		y1:y1,
		square:square,
		width:width,
		height:height,
		lineScale:lineScale
	};
}

DrawSquaresGrid=function(opts){
	var gridOpts={
		...opts,
		...GridExtremes(opts)
	};
	DrawRectangle(gridOpts);
	gridOpts.x0=gridOpts.x0/gridOpts.width;
	gridOpts.x1=gridOpts.x1/gridOpts.width;
	gridOpts.y0=gridOpts.y0/gridOpts.height;
	gridOpts.y1=gridOpts.y1/gridOpts.height;
	DrawGrid(gridOpts);	
}

DrawGridLine=function(opts){
	var gridOpts=GridExtremes(opts);
	var x0=gridOpts.x0/gridOpts.width;
	var x1=gridOpts.x1/gridOpts.width;
	var y0=gridOpts.y0/gridOpts.height;
	var y1=gridOpts.y1/gridOpts.height;
	var rows=opts.rows;
	var cols=opts.cols;

	var newopts={
		...opts,
		x0:x0+opts.px0/cols*(x1-x0),
		y0:y0+opts.py0/rows*(y1-y0),
		x1:x0+opts.px1/cols*(x1-x0),
		y1:y0+opts.py1/rows*(y1-y0)
	}
	DrawLine(newopts);	
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


DrawRectangle=function(opts){
	opts.ctx=opts.ctx||GetContext(opts.target);
	opts.Drawer=function(opts){
		opts.ctx.rect(opts.x0,opts.y0,(opts.x1-opts.x0),(opts.y1-opts.y0));
	}
	DrawShape(opts);
}



RescalePath=function(opts){
	var opts={square:1,scale:1,...opts};
	var viewBox=ViewboxCoordinates(opts.viewBox);
	var Rescale=function(x,y){return RescaleWidthXYer(opts.square*opts.scale)(x,y,viewBox)};
	opts.path=SVGPathDirectTransform(opts.path,Rescale,viewBox);
	opts.viewBox=ViewboxString(Rescale(viewBox[0],viewBox[1]).concat(Rescale(viewBox[2],viewBox[3])));
	return opts;
}

DisplacePath=function(opts){
	var opts={shiftx:0,shifty:0,...opts};
	var dx=(opts.x0+(opts.x1-opts.x0)*(opts.px-opts.shiftx)/opts.cols)*opts.width;
	var dy=(opts.y0+(opts.y1-opts.y0)*(opts.py-opts.shifty)/opts.rows)*opts.height;
	var viewBox=ViewboxCoordinates(opts.viewBox);
	var Displace=function(x,y){return DisplaceXYer(dx,dy)(x,y)};
	opts.path=SVGPathDirectTransform(opts.path,Displace,viewBox);
	opts.viewBox=ViewboxString(Displace(viewBox[0],viewBox[1]).concat(Displace(viewBox[2],viewBox[3])));
	return opts;
}

DrawSVG=function(opts){
	opts.ctx=GetContext(opts.target);
	if(!opts.path)
		return;

	opts={...opts,...GridExtremes(opts)}	//loads x0,x1,y0,y1
	opts.x0=opts.x0/opts.width;
	opts.x1=opts.x1/opts.width;
	opts.y0=opts.y0/opts.height;
	opts.y1=opts.y1/opts.height;
	
	var opts=RescalePath(opts);
		opts=DisplacePath(opts);
	
	let p = new Path2D(opts.path);
	
	if(!opts.dash)
		opts.dash=[];

	if(opts.strokeStyle){
		opts.ctx.setLineDash(opts.dash)
		opts.ctx.strokeStyle=opts.strokeStyle;
		opts.ctx.lineWidth=opts.lineWidth*opts.lineScale;
		opts.ctx.stroke(p);
	}

	var fillColor=opts.colour?opts.colour:getComputedStyle(document.body)["background-strokeColor"]||"black";
	opts.ctx.fillStyle=fillColor;
	opts.ctx.fill(p);
}

//
UnDraw=function(opts){
	var opts=opts||{}
	var canvas=GetContextElement(opts.target);
	GetContext(opts.target).clearRect(0,0,Width(canvas),Height(canvas));
}

////////////////////////////////////////////////////////////////////////////////
Shout("data-game-canvas");