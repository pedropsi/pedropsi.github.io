///////////////////////////////////////////////////////////////////////////////
//Star Battle Solver (c) Pedro PSI, 2020-2021.
//MIT License
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////
//Basket Weave: BW
// w: iterates horizontally
// h: iterates vertically
// d: iterates within each square - horizontally or vertically, depending on wheter HorizontallyDivided yields true or false


function BWCellId(w,h,d,horizDivided){
	return ""+w+" "+h+" "+d+" "+(HorizontallyDivided(w,h,horizDivided)?"-":"|");
}

function BWCellPolygon(w,h,d,width,height,divisions,horizDivided,cwidth,cheight){
	if(HorizontallyDivided(w,h,horizDivided))
		return [
			w*cwidth/width,
			(h+d/divisions)*cheight/height,
			(1)*cwidth/width,
			(1/divisions)*cheight/height
		];
	else
		return [
			(w+d/divisions)*cwidth/width,
			h*cheight/height,
			(1/divisions)*cwidth/width,
			(1)*cheight/height
		];
}

function BWPolygons(width,height,divisions,horizDivided,cwidth,cheight){
	var polygons={};
	for(var w=0;w<width;w++){
		for(var h=0;h<height;h++){
			for(var d=0;d<divisions;d++){
				polygons[BWCellId(w,h,d,horizDivided)]=BWCellPolygon(w,h,d,width,height,divisions,horizDivided,cwidth,cheight);
			}
		}
	}
	return polygons;
}

function HorizontallyDivided(w,h,horizDivided){
	return horizDivided&&(w+h)%2===1||!horizDivided&&(w+h)%2!==1
}

function BWCellAdjacencies(w,h,d,width,height,divisions,horizDivided){
	var adjacencies=[];
	function AdjPush(ww,hh,dd){
		adjacencies.push(BWCellId(ww,hh,dd,horizDivided));
	}
	if(HorizontallyDivided(w,h,horizDivided)){ //horizontal
		if(h>=1&&d===0){
			//above, prev line
			Range(0,divisions-1).map(di=>AdjPush(w,h-1,di));
			//corners
			if(w>0)
				AdjPush(w-1,h-1,0);
			if(w<width-1)
				AdjPush(w+1,h-1,0);
			
		}
		if(d>=1)//above, within
			AdjPush(w,h,d-1);
		if(h<height-1&&d===divisions-1){
			//below, next line
			Range(0,divisions-1).map(di=>AdjPush(w,h+1,di));
			//corners
			if(w>0)
				AdjPush(w-1,h+1,0);
			if(w<width-1)
				AdjPush(w+1,h+1,0);
			
		}
		if(d<divisions-1)//below, within
			AdjPush(w,h,d+1);

		if(w>=1)//left
			AdjPush(w-1,h,divisions-1);
		if(w<width-1)//right
			AdjPush(w+1,h,0);
	
	}else{ //vertically divided
		if(w>=1&&d===0){
			//left, prev column
			Range(0,divisions-1).map(di=>AdjPush(w-1,h,di));
			//corners
			if(h>0)
				AdjPush(w-1,h-1,divisions-1);
			if(h<height-1)
				AdjPush(w-1,h+1,divisions-1);
		}
		if(d>=1)//left, within
			AdjPush(w,h,d-1);
		if(w<width-1&&d===divisions-1){
			//right, next column
			Range(0,divisions-1).map(di=>AdjPush(w+1,h,di));
			//corners
			if(h>0)
				AdjPush(w+1,h-1,divisions-1);
			if(h<height-1)
				AdjPush(w+1,h+1,divisions-1);
		}
		if(d<divisions-1)//right, within
			AdjPush(w,h,d+1);

		if(h>=1)//above
			AdjPush(w,h-1,divisions-1);
		if(h<height-1)//below
			AdjPush(w,h+1,0);
	}

	return adjacencies;
}

function BWCellVLine(w,h,d,width,height,divisions,horizDivided){
	var lines=[];
	function LinePush(ww,hh,dd){
		lines.push(BWCellId(ww,hh,dd,horizDivided));
	}
	if(HorizontallyDivided(w,h,horizDivided)){
		//Vertical line
		for(var hi=0;hi<height;hi++){
			Range(0,divisions-1).map(di=>LinePush(w,hi,di));
		}
	}
	else{
		//Vertical line
		for(var hi=0;hi<height;hi++){
			if(!HorizontallyDivided(w,hi,horizDivided))
				LinePush(w,hi,d)
			else
				Range(0,divisions-1).map(di=>LinePush(w,hi,di));
		}
	}
	return lines;
}

function BWCellHLine(w,h,d,width,height,divisions,horizDivided){
	var lines=[];
	function LinePush(ww,hh,dd){
		lines.push(BWCellId(ww,hh,dd,horizDivided));
	}
	if(HorizontallyDivided(w,h,horizDivided)){
		//Horizontal line
		for(var wi=0;wi<width;wi++){
			if(HorizontallyDivided(wi,h,horizDivided))
				LinePush(wi,h,d)
			else
				Range(0,divisions-1).map(di=>LinePush(wi,h,di));
		}
	}
	else{
		//Horizontal line
		for(var wi=0;wi<width;wi++){
			Range(0,divisions-1).map(di=>LinePush(wi,h,di));
		}
	}
	return lines;
}

function BWGraph(width,height,divisions,horizDivided){
	var graph={
		vlines:{},
		hlines:{},
		adjacencies:{}
	};
	var cell="";
	var horizDivided=horizDivided?1:0;
	for(var w=0;w<width;w++){
		for(var h=0;h<height;h++){
			for(var d=0;d<divisions;d++){
				cell=BWCellId(w,h,d,horizDivided);
				graph.adjacencies[cell]=BWCellAdjacencies(w,h,d,width,height,divisions,horizDivided);
				if(!Values(graph.vlines).some(line=>In(line,cell)))
					graph.vlines[cell]=BWCellVLine(w,h,d,width,height,divisions,horizDivided);
				if(!Values(graph.hlines).some(line=>In(line,cell)))
					graph.hlines[cell]=BWCellHLine(w,h,d,width,height,divisions,horizDivided);
			}
		}
	}
	return graph;
}


//UI

var W=6;
var H=6;
var D=2;
var P=true;
var CWIDTH=800;
var CHEIGHT=300;


var polygons=BWPolygons(W,H,D,P,CWIDTH,CHEIGHT);

function PolygonIntersections(x,y){
	return Keys(polygons).filter(function(k){
		var p=polygons[k];
		return (x>=p[0])&&(x<=(p[0]+p[2]))&&(y>=p[1])&&(y<=(p[1]+p[3]))
	});
}

var LW=Max(1,Floor((CWIDTH/W/100*CHEIGHT/H/100)**0.5));

function HighlightPolygons(cells,opts){
	var opts={
		lineWidth:`${LW}px`,
		fillColor:"rgba(255,100,100,0.05)",
		strokeColor:"rgba(255,100,100,1)",
		...opts
	};
	DrawRectangles(opts,cells.map(k=>polygons[k])
	)
}

function HighlightStar(cell,opts){
	var opts={
		lineWidth:`${LW}px`,
		fillColor:"black",
		strokeColor:"transparent",
		star:true,
		n:7,
		size:Min(CWIDTH/W/D/4,CHEIGHT/H/D/4),
		...opts,
		...StarXY(cell)
	};
	DrawStar(opts);
}

function UnHighlightStar(cell,opts){
	HighlightStar(cell,{
		...opts,
		lineWidth:`${2*LW}px`,
		fillColor:colours[cell],
		strokeColor:colours[cell]
	})
}


function HighlightCross(cell,opts){
	var opts={
		lineWidth:`${LW}px`,
		fillColor:"red",
		strokeColor:"transparent",
		cross:true,
		n:4,
		size:Min(CWIDTH/W/D/4,CHEIGHT/H/D/4),
		...opts,
		...StarXY(cell)
	};
	DrawStar(opts);
}

function UnHighlightCross(cell,opts){
	HighlightCross(cell,{
		...opts,
		lineWidth:`${2*LW}px`,
		fillColor:colours[cell],
		strokeColor:colours[cell]
	})
}

function StarXY(cell){
	var p=polygons[cell];
	return {x:p[0]+p[2]/2,y:p[1]+p[3]/2}
}



var selected=[];
var colours={};
function RandomHEX(){
	return HEX(Huen("#FFAAAA",RandomChoice(Range(0,360)))).colour;
}
var colour="white";
Keys(polygons).map(k=>colours[k]=colour);


var stars={};
var starmode=true;
var crosses={};
var crossmode=true;

var fromstar=true;

RegionModeActive=StatusReporter(
	"RegionModeActive",
	function(){return true}
)



function AddStarCells(x,y){
	var cell=First(PolygonIntersections(x,y));
	if(stars[cell])
		starmode=false;
	else
		starmode=true;
	fromstar=true;
	ContinueStarCrossCells(x,y);
}	

function AddCrossCells(x,y){
	var cell=First(PolygonIntersections(x,y));
	if(crosses[cell])
		crossmode=false;
	else
		crossmode=true;
	fromstar=false;
	ContinueStarCrossCells(x,y);
}


function ContinueStarCrossCells(x,y){
	var cells=Complement(PolygonIntersections(x,y),selected);
	selected=selected.concat(cells);
	cells.map(function(cell){
		if(fromstar&&starmode){
			if(crosses[cell]){
				delete crosses[cell];
				UnHighlightCross(cell);
			}
			stars[cell]=true;
			HighlightStar(cell);
		}else if(fromstar&&!starmode){
			if(stars[cell]){
				delete stars[cell];
				UnHighlightStar(cell);
			}
		}
		else if(!fromstar&&crossmode){
			if(stars[cell]){
				delete stars[cell];
				UnHighlightStar(cell);
			}
			crosses[cell]=true;
			HighlightCross(cell);
		}
		else{
			if(crosses[cell]){
				delete crosses[cell];
				UnHighlightCross(cell);
			}
		}
	})
}



function AddRegionCells(x,y){
	colour=RandomHEX();
	ContinueRegionCells(x,y);
}

function PickRegionCells(x,y){
	colour=colours[First(PolygonIntersections(x,y))];
	ContinueRegionCells(x,y);
}

function ContinueRegionCells(x,y){
	var cells=Complement(PolygonIntersections(x,y),selected);
	selected=selected.concat(cells);
	cells.map(c=>colours[c]=colour);
	HighlightPolygons(cells,{
		strokeColor:HEX(Darken(colour,2)).colour,
		fillColor:colour
	});
	cells.map(
		cell=>stars[cell]?HighlightStar(cell):Identity
	)
}

function ClearSelectedCells(x,y){
	selected=[];
}


function StarActionStarter(x,y){
	return RegionModeActive()?AddRegionCells(x,y):AddStarCells(x,y);
}
function StarActionAltStarter(x,y){
	return 	RegionModeActive()?PickRegionCells(x,y):AddCrossCells(x,y);
}
function StarActionContinuer(x,y){
	return RegionModeActive()?ContinueRegionCells(x,y):ContinueStarCrossCells(x,y);
}
function StarActionEnder(x,y){
	return ClearSelectedCells(x,y);	
}

var StarDragActions={
	Starter:StarActionStarter,
	AltStarter:StarActionAltStarter,
	Executer:StarActionContinuer,
	Ender:StarActionEnder
}

setTimeout(function(){
	PreAddElement(`<canvas id="test" width="${CWIDTH}" height="${CHEIGHT}"></div>`,"body");
	AttendDrag(StarDragActions,"canvas");
	// OverwriteShortcuts("canvas",{
	// 	"R":function(){RegionModeActive=RegionModeActive()?False:True}
	// })
},1000)