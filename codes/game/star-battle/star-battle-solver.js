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
		].map(n=>Round(n,1));
	else
		return [
			(w+d/divisions)*cwidth/width,
			h*cheight/height,
			(1/divisions)*cwidth/width,
			(1)*cheight/height
		].map(n=>Round(n,1));
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
//Initialise

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
	highlights:[],
	colours:{},
	colour:"white",
	stars:{},
	crosses:{},
	starmode:true,
	crossmode:false,
	fromstar:true,
	regionmode:true,
	errormode:true
}

function InitialiseGraph(graph){
	var graph=graph;
	var CWIDTH=graph.CWIDTH;
	var CHEIGHT=graph.CHEIGHT;
	var W=graph.W;
	var H=graph.H;
	var D=graph.D;
	var P=graph.P;

	graph.LW=Max(1,Floor((CWIDTH/W/100*CHEIGHT/H/100)**0.5));
	graph.starsize=Min(CWIDTH/W/D/4,CHEIGHT/H/D/4);
	graph.polygons=BWPolygons(W,H,D,P,CWIDTH,CHEIGHT);
	Keys(graph.polygons).map(k=>graph.colours[k]=graph.colour);

	var gra=BWGraph(W,H,D,P);
	graph={...gra,...graph};
	graph= FinaliseGraph(graph);
	return graph
}

function FinaliseGraph(graph){
	graph.Regions=function(){return ColoursRegions(SBGRAPH.colours)};
	return graph;
}

SBGRAPH=InitialiseGraph(SBGRAPH);

///////////////////////////////////////////////////////////////////////////////
//Validator

function StarBattleFull(graph){
	return Keys(graph.adjacencies).every(cell=>In(graph.stars,cell)||In(graph.crosses,cell));
}


function StarBattleSolved(graph){
	return StarBattleLinesSolved(graph)&&StarBattleRegionsSolved(graph)&&StarBattleAdjacenciesValid(graph);
}

//Regions
function StarBattleRegionsApply(Transform,graph){
	var stars=Keys(graph.stars);
	var n=graph.conditions.regions;
	var groups=Values(graph.Regions());
	return Transform(groups,stars,n);
}

function StarBattleRegionsSolved(graph){
	function Test(regionstars,stars,n){return regionstars.every(region=>Count(region,cell=>In(stars,cell))===n)}
	return StarBattleRegionsApply(Test,graph);
}

function StarBattleLongRegions(graph){
	var FilterSB=function(regionstars,stars,n){return regionstars.filter(region=>Count(region,cell=>In(stars,cell))>n)}
	return StarBattleRegionsApply(FilterSB,graph);
}

function StarBattleShortRegions(graph){
	var FilterSB=function(regionstars,stars,n){return regionstars.filter(region=>Count(region,cell=>In(stars,cell))<n)}
	return StarBattleRegionsApply(FilterSB,graph);
}

//Adjacencies
function StarBattleAdjacenciesApply(Transform,graph){
	var stars=Keys(graph.stars);
	var n=graph.conditions.adjacencies;
	var groups=stars.map(s=>graph.adjacencies[s]);
	return Transform(groups,stars,n);
}

function StarBattleAdjacenciesValid(graph){
	function Test(activeadjacencies,stars,n){return activeadjacencies.every(adja=>Count(adja,cell=>In(stars,cell))===n);}
	return StarBattleAdjacenciesApply(Test,graph);
}

function StarBattleInvalidAdjacencies(graph){
	function Filter(activeadjacencies,stars,n){
		adjacencies=activeadjacencies.filter(adja=>Count(adja,cell=>In(stars,cell))>n);
		return Intersection(Union(...adjacencies),stars);
	}
	return StarBattleAdjacenciesApply(Filter,graph);
}


//Lines
function StarBattleLinesSolved(graph){
	return Keys(graph.lines).every(type=>StarBattleLinesValid(graph,graph.lines[type]));
}

function StarBattleLinesApply(Transform,graph,lines){
	var stars=Keys(graph.stars);
	var n=graph.conditions.lines;
	var lines=Values(lines);
	return Transform(lines,stars,n);
}

function StarBattleLinesValid(graph,lines){
	function Test(lines,stars,n){return lines.every(line=>Count(line,cell=>In(stars,cell))===n)};
	return StarBattleLinesApply(Test,graph,lines);
}

function StarBattleLongSubLines(graph,lines){
	function Filter(lines,stars,n){return lines.filter(line=>Count(line,cell=>In(stars,cell))>n)};
	return StarBattleLinesApply(Filter,graph,lines);
}

function StarBattleShortSubLines(graph,lines){
	function Filter(lines,stars,n){return lines.filter(line=>Count(line,cell=>In(stars,cell))<n)};
	return StarBattleLinesApply(Filter,graph,lines);
}

function StarBattleLongLines(graph){
	return Keys(graph.lines).map(type=>StarBattleLongSubLines(graph,graph.lines[type]));
}

function StarBattleShortLines(graph){
	return Keys(graph.lines).map(type=>StarBattleShortSubLines(graph,graph.lines[type]));
}


//Highlight errors

function MarkWrongCell(cell){
	if(In(SBGRAPH.highlights,cell))
		return;
	SBGRAPH.highlights.push(cell);
	var colour=SBGRAPH.colours[cell];
	MarkPolygons([cell],{
		strokeColor:HEX(Lighten(colour,2)).colour,
		fillColor:HEX(Darken(colour,2)).colour
	})

	if(SBGRAPH.stars[cell])
		MarkStar(cell);
	if(SBGRAPH.crosses[cell])
		MarkCross(cell);
}

function UnMarkWrongCell(cell){
	if(!In(SBGRAPH.highlights,cell))
		return;
	SBGRAPH.highlights=Complement(SBGRAPH.highlights,[cell]);
	var colour=SBGRAPH.colours[cell];
	MarkPolygons([cell],{
		strokeColor:HEX(Darken(colour,2)).colour,
		fillColor:colour
	})

	if(SBGRAPH.stars[cell])
		MarkStar(cell);
	if(SBGRAPH.crosses[cell])
		MarkCross(cell);
}

function MarkWrongArea(area){
	return area.map(MarkWrongCell);
}
function UnMarkWrongArea(area){
	return area.map(UnMarkWrongCell);
}


function MarkWrongLines(){
	MarkWrongArea(StarBattleLongLines(SBGRAPH).flat().flat());
	MarkWrongArea(StarBattleShortLines(SBGRAPH).flat().flat());
}
function MarkWrongRegions(){
	StarBattleLongRegions(SBGRAPH).map(MarkWrongArea);
	StarBattleShortRegions(SBGRAPH).map(MarkWrongArea);
}
function UnMarkWrongLines(){
	UnMarkWrongArea(StarBattleLongLines(SBGRAPH).flat().flat());
	UnMarkWrongArea(StarBattleShortLines(SBGRAPH).flat().flat());
}
function UnMarkWrongRegions(){
	StarBattleLongRegions(SBGRAPH).map(UnMarkWrongArea);
	StarBattleShortRegions(SBGRAPH).map(UnMarkWrongArea);
}

function MarkWrongAdjacencies(){
	MarkWrongArea(StarBattleInvalidAdjacencies(SBGRAPH));
}
function UnMarkWrongAdjacencies(){
	UnMarkWrongArea(StarBattleInvalidAdjacencies(SBGRAPH));
}

function MarkErrors(){
	if(!SBGRAPH.errormode)
		return;
	MarkWrongAdjacencies();
	MarkWrongLines();
	MarkWrongRegions();
}

function UnMarkErrors(){
	UnMarkWrongAdjacencies();
	UnMarkWrongLines();
	UnMarkWrongRegions();
}


///////////////////////////////////////////////////////////////////////////////
//Interactive UI (for quick iteration)


function DrawGraph(){
	var regions=SBGRAPH.Regions();
	Keys(regions).map(
		colour=>MarkPolygons(regions[colour],{
			strokeColor:HEX(Darken(colour,2)).colour,
			fillColor:colour
		})
	);
	Keys(SBGRAPH.stars).map(MarkStar);
	Keys(SBGRAPH.crosses).map(MarkCross);
}

function LoadGraph(graph){
	SBGRAPH=FinaliseGraph(graph);
	DrawGraph();
}


function PolygonIntersections(x,y){
	return Keys(SBGRAPH.polygons).filter(function(k){
		var p=SBGRAPH.polygons[k];
		return (x>=p[0])&&(x<=(p[0]+p[2]))&&(y>=p[1])&&(y<=(p[1]+p[3]))
	});
}

function MarkPolygons(cells,opts){
	var opts={
		lineWidth:`${SBGRAPH.LW}px`,
		fillColor:"rgba(255,100,100,0.05)",
		strokeColor:"rgba(255,100,100,1)",
		...opts
	};
	DrawAbsRectangles(opts,cells.map(k=>SBGRAPH.polygons[k])
	)
}

function MarkStar(cell,opts){
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
	StarDraw(opts);
}

function UnMarkStar(cell,opts){
	MarkStar(cell,{
		...opts,
		lineWidth:`${2*SBGRAPH.LW}px`,
		fillColor:SBGRAPH.colours[cell],
		strokeColor:SBGRAPH.colours[cell]
	})
}


function MarkCross(cell,opts){
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
	StarDraw(opts);
}

function UnMarkCross(cell,opts){
	MarkCross(cell,{
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

ErrorModeActive=StatusReporter(
	"ErrorModeActive",
	function(){return SBGRAPH.errormode}
)

ErrorModeToggle=function(mode){
	if(SBGRAPH.errormode)
		UnMarkErrors();
	else
		MarkErrors();
	return SBGRAPH.errormode=!mode;
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
	UnMarkErrors();
	cells.map(function(cell){
		if(SBGRAPH.fromstar&&SBGRAPH.starmode){
			if(SBGRAPH.crosses[cell]){
				delete SBGRAPH.crosses[cell];
				UnMarkCross(cell);
			}
			SBGRAPH.stars[cell]=true;
			MarkStar(cell);
		}else if(SBGRAPH.fromstar&&!SBGRAPH.starmode){
			if(SBGRAPH.stars[cell]){
				delete SBGRAPH.stars[cell];
				UnMarkStar(cell);
			}
		}
		else if(!SBGRAPH.fromstar&&SBGRAPH.crossmode){
			if(SBGRAPH.stars[cell]){
				delete SBGRAPH.stars[cell];
				UnMarkStar(cell);
			}
			SBGRAPH.crosses[cell]=true;
			MarkCross(cell);
		}
		else{
			if(SBGRAPH.crosses[cell]){
				delete SBGRAPH.crosses[cell];
				UnMarkCross(cell);
			}
		}
	})
	MarkErrors();
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
	UnMarkErrors();
	SBGRAPH.selected=SBGRAPH.selected.concat(cells);
	cells.map(c=>SBGRAPH.colours[c]=colour);
	MarkPolygons(cells,{
		strokeColor:HEX(Darken(colour,2)).colour,
		fillColor:colour
	});
	cells.map(
		cell=>SBGRAPH.stars[cell]?MarkStar(cell):SBGRAPH.crosses[cell]?MarkCross(cell):Identity
	)
	MarkErrors();
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
	"drag-on":StarActionStarter,
	"drag-on-alt":StarActionAltStarter,
	"drag-continue":StarActionContinuer,
	"drag-end":StarActionEnder
}

setTimeout(function(){
	PreAddElement(`<canvas id="test" oncontextmenu="return false;" width="${SBGRAPH.CWIDTH}" height="${SBGRAPH.CHEIGHT}"></div>`,"body");
	AttendDrag(StarDragActions,"canvas");
	DrawGraph();
},100)



function CopyGraph(graph){
	ClipboardCopy(JSON.stringify(graph),"Graph copied!")
}



// function GraphSerial(graph){

// }

// function SerialGraph(serial){

// }