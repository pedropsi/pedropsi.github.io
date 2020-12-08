///////////////////////////////////////////////////////////////////////////////
//Star Battle Solver (c) Pedro PSI, 2020-2021.
//MIT License
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////
//Basket Weave Geometry
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
				AdjPush(w-1,h-1,divisions-1);
			if(w<width-1)
				AdjPush(w+1,h-1,divisions-1);
			
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
				AdjPush(w+1,h-1,0);
			if(h<height-1)
				AdjPush(w+1,h+1,0);
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
	var line=[];
	function LinePush(ww,hh,dd){
		line.push(BWCellId(ww,hh,dd,horizDivided));
	}
	if(HorizontallyDivided(w,h,horizDivided)){
		// //Vertical line
		// for(var hi=0;hi<height;hi++){
		// 	Range(0,divisions-1).map(di=>LinePush(w,hi,di));
		// }
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
	return line;
}

function BWCellHLine(w,h,d,width,height,divisions,horizDivided){
	var line=[];
	function LinePush(ww,hh,dd){
		line.push(BWCellId(ww,hh,dd,horizDivided));
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
		// //Horizontal line
		// for(var wi=0;wi<width;wi++){
		// 	Range(0,divisions-1).map(di=>LinePush(wi,h,di));
		// }
	}
	return line;
}

function BWGraph(width,height,divisions,horizDivided){
	var graph={
		geometry:"basket weave",
		Aligners:{
			vlines:BWCellVLine,
			hlines:BWCellHLine,
		},
		Polygoner:BWCellPolygon,
		lines:{},
		adjacencies:{}
	};
	var cell="";
	var horizDivided=horizDivided?1:0;
	var linetypes=Keys(graph.Aligners);
		linetypes.map(type=>graph.lines[type]={});
	for(var w=0;w<width;w++){
		for(var h=0;h<height;h++){
			for(var d=0;d<divisions;d++){
				cell=BWCellId(w,h,d,horizDivided);
				graph.adjacencies[cell]=BWCellAdjacencies(w,h,d,width,height,divisions,horizDivided);
				linetypes.map(function(type){
					if(!Values(graph.lines[type]).some(line=>In(line,cell)))
						graph.lines[type][cell]=graph.Aligners[type](w,h,d,width,height,divisions,horizDivided);
				})
			}
		}
	}
	linetypes.map(function(type){
		var l=graph.lines[type];
		var emptylines=Keys(l).filter(k=>l[k].length<1);
		emptylines.map(k=>delete l[k]);
	});

	return graph;
}


///////////////////////////////////////////////////////////////////////////////
//Interactive UI (for quick iteration)





function PolygonIntersections(x,y){
	return Keys(SBGRAPH.polygons).filter(function(k){
		var p=SBGRAPH.polygons[k];
		return (x>=p[0])&&(x<=(p[0]+p[2]))&&(y>=p[1])&&(y<=(p[1]+p[3]))
	});
}

function HighlightPolygons(cells,opts){
	var opts={
		lineWidth:`${SBGRAPH.LW}px`,
		fillColor:"rgba(255,100,100,0.05)",
		strokeColor:"rgba(255,100,100,1)",
		...opts
	};
	DrawRectangles(opts,cells.map(k=>SBGRAPH.polygons[k])
	)
}

function HighlightStar(cell,opts){
	var opts={
		lineWidth:`${SBGRAPH.LW}px`,
		fillColor:"black",
		strokeColor:"transparent",
		star:true,
		n:7,
		size:SBGRAPH.starsize,
		...opts,
		...StarXY(cell)
	};
	DrawStar(opts);
}

function UnHighlightStar(cell,opts){
	HighlightStar(cell,{
		...opts,
		lineWidth:`${2*SBGRAPH.LW}px`,
		fillColor:SBGRAPH.colours[cell],
		strokeColor:SBGRAPH.colours[cell]
	})
}


function HighlightCross(cell,opts){
	var opts={
		lineWidth:`${SBGRAPH.LW}px`,
		fillColor:"red",
		strokeColor:"transparent",
		cross:true,
		n:4,
		size:SBGRAPH.starsize,
		...opts,
		...StarXY(cell)
	};
	DrawStar(opts);
}

function UnHighlightCross(cell,opts){
	HighlightCross(cell,{
		...opts,
		lineWidth:`${2*SBGRAPH.LW}px`,
		fillColor:SBGRAPH.colours[cell],
		strokeColor:SBGRAPH.colours[cell]
	})
}

function StarXY(cell){
	var p=SBGRAPH.polygons[cell];
	return {x:p[0]+p[2]/2,y:p[1]+p[3]/2}
}



RegionModeActive=StatusReporter(
	"RegionModeActive",
	function(){return SBGRAPH.regionmode}
)

RegionModeToggle=function(mode){
	return SBGRAPH.regionmode=!mode;
}



function AddStarCells(x,y){
	var cell=First(PolygonIntersections(x,y));
	if(SBGRAPH.stars[cell])
		SBGRAPH.starmode=false;
	else
		SBGRAPH.starmode=true;
	SBGRAPH.fromstar=true;
	ContinueStarCrossCells(x,y);
}	

function AddCrossCells(x,y){
	var cell=First(PolygonIntersections(x,y));
	if(SBGRAPH.crosses[cell])
		SBGRAPH.crossmode=false;
	else
		SBGRAPH.crossmode=true;
	SBGRAPH.fromstar=false;
	ContinueStarCrossCells(x,y);
}


function ContinueStarCrossCells(x,y){
	var cells=Complement(PolygonIntersections(x,y),SBGRAPH.selected);
	SBGRAPH.selected=SBGRAPH.selected.concat(cells);
	cells.map(function(cell){
		if(SBGRAPH.fromstar&&SBGRAPH.starmode){
			if(SBGRAPH.crosses[cell]){
				delete SBGRAPH.crosses[cell];
				UnHighlightCross(cell);
			}
			SBGRAPH.stars[cell]=true;
			HighlightStar(cell);
		}else if(SBGRAPH.fromstar&&!SBGRAPH.starmode){
			if(SBGRAPH.stars[cell]){
				delete SBGRAPH.stars[cell];
				UnHighlightStar(cell);
			}
		}
		else if(!SBGRAPH.fromstar&&SBGRAPH.crossmode){
			if(SBGRAPH.stars[cell]){
				delete SBGRAPH.stars[cell];
				UnHighlightStar(cell);
			}
			SBGRAPH.crosses[cell]=true;
			HighlightCross(cell);
		}
		else{
			if(SBGRAPH.crosses[cell]){
				delete SBGRAPH.crosses[cell];
				UnHighlightCross(cell);
			}
		}
	})
}



function AddRegionCells(x,y){
	var colour=First(SBGRAPH.colours)||"white";
	while(In(SBGRAPH.colours,colour)&&SBGRAPH.colours.length<359);
		colour=RandomHuenHEX();
	SBGRAPH.colour=colour;
	ContinueRegionCells(x,y);
}

function PickRegionCells(x,y){
	SBGRAPH.colour=SBGRAPH.colours[First(PolygonIntersections(x,y))];
	ContinueRegionCells(x,y);
}

function ContinueRegionCells(x,y){
	var cells=Complement(PolygonIntersections(x,y),SBGRAPH.selected);
	var colour=SBGRAPH.colour;
	SBGRAPH.selected=SBGRAPH.selected.concat(cells);
	cells.map(c=>SBGRAPH.colours[c]=colour);
	HighlightPolygons(cells,{
		strokeColor:HEX(Darken(colour,2)).colour,
		fillColor:colour
	});
	cells.map(
		cell=>SBGRAPH.stars[cell]?HighlightStar(cell):SBGRAPH.crosses[cell]?HighlightCross(cell):Identity
	)
}

function ClearSelectedCells(x,y){
	SBGRAPH.selected=[];
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
	PreAddElement(`<canvas id="test" width="${SBGRAPH.CWIDTH}" height="${SBGRAPH.CHEIGHT}"></div>`,"body");
	AttendDrag(StarDragActions,"canvas");
},100)


// function LoadGraph(graph){

// }

function CopyGraph(graph){
	ClipboardCopy(JSON.stringify(graph),"Graph copied!")
}



// function GraphSerial(graph){

// }

// function SerialGraph(serial){

// }

///////////////////////////////////////////////////////////////////////////////
//Solver

function ColoursRegions(colours){
	var regions={};
	Unique(Values(colours)).map(c=>regions[c]=[]);
	Keys(colours).map(k=>regions[colours[k]].push(k));
	return regions;
}

var SBGRAPH={
	conditions:{ //How many stars per line, region, adjacent area;
		lines:1,
		regions:1,
		adjacencies:0
	},
	W:6,
	H:6,
	D:2,
	P:true,
	CWIDTH:800,
	CHEIGHT:300,
	selected:[],
	colours:{},
	colour:"white",
	stars:{},
	crosses:{},
	starmode:true,
	crossmode:false,
	fromstar:true,
	regionmode:true
}

SBGRAPH.LW=Max(1,Floor((SBGRAPH.CWIDTH/SBGRAPH.W/100*SBGRAPH.CHEIGHT/SBGRAPH.H/100)**0.5));
SBGRAPH.starsize=Min(SBGRAPH.CWIDTH/SBGRAPH.W/SBGRAPH.D/4,SBGRAPH.CHEIGHT/SBGRAPH.H/SBGRAPH.D/4);
SBGRAPH.polygons=BWPolygons(SBGRAPH.W,SBGRAPH.H,SBGRAPH.D,SBGRAPH.P,SBGRAPH.CWIDTH,SBGRAPH.CHEIGHT);
Keys(SBGRAPH.polygons).map(k=>SBGRAPH.colours[k]=SBGRAPH.colour);

function StarBattleGraph(opts){
	var graph=BWGraph(SBGRAPH.W,SBGRAPH.H,SBGRAPH.D,SBGRAPH.P);
		graph={...graph,...SBGRAPH}
		graph.regions=ColoursRegions(colours);
		graph.solvable="?";
	return graph;
}

function StarBattleFull(graph){
	return Keys(graph.adjacencies).every(cell=>In(graph.stars,cell)||In(graph.crosses,cell));
}


function StarBattleSolved(graph){
	return StarBattleLinesSolved(graph)&&StarBattleRegionsSolved(graph)&&StarBattleAdjacenciesValid(graph);
}


function StarBattleRegionsSolved(graph){
	var stars=Keys(graph.stars);
	var n=graph.conditions.regions;
	var regionstars=Values(graph.regions);
	return regionstars.every(region=>Count(region,cell=>In(stars,cell))===n);
}

function StarBattleAdjacenciesValid(graph){
	var stars=Keys(graph.stars);
	var n=graph.conditions.adjacencies;
	var activeadjacencies=stars.map(s=>graph.adjacencies[s]);
	return activeadjacencies.every(adja=>Count(adja,cell=>In(stars,cell))===n);
}

function StarBattleLinesSolved(graph){
	return Keys(graph.lines).every(type=>StarBattleLinesValid(graph,graph.lines[type]));
}

function StarBattleLinesValid(graph,lines){
	var stars=Keys(graph.stars);
	var n=graph.conditions.lines;
	var lines=Values(lines);
	return lines.every(line=>Count(line,cell=>In(stars,cell))===n);
}
