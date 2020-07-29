var swipeThreshold = 10; //10px
var swipeTimeout = 1000; //1000ms

var xStart = null;
var yStart = null;
var xDiff = null;
var yDiff = null;
var timeStart = null;
var targStart = null;
var xEnd = null;
var yEnd = null;

CartesianSwipe=function(target){
	var horizontal=Abs(xDiff)>Abs(yDiff);
	
	if(horizontal)
		var swipeLength=xDiff;
	else
		var swipeLength=yDiff;

	var swipetype=false;

	if(Abs(swipeLength)<swipeThreshold){
		swipetype="tap";
	}
	else if(horizontal){
		if(swipeLength<0)
			swipetype="left";
		else
			swipetype="right";
	}
	else {
		if(swipeLength<0)
			swipetype="up";
		else
			swipetype="down";
	}
	var target=target||window;
	Shout("swipe-"+swipetype,target);
	return swipetype;
}


HandleTouchEnder=function(F){return function(e){
	if (e.target!==targStart)
		return;

	var deltaTime=Date.now()-timeStart;
	if(deltaTime<swipeTimeout)
		CartesianSwipe(e.target)
	
	if(F) 	//need throttling
		PolarSwipe(F)

	// reset values
	xStart = null;
	yStart = null;
	timeStart = null;
}}

HandleTouchStart=function(e){
	targStart = e.target;
	timeStart = Date.now();
	xStart = e.touches[0].clientX;
	yStart = e.touches[0].clientY;
	xDiff = 0;
	yDiff = 0;
}

HandleTouchMover=function(F){return function(e){
	if (!xStart||!yStart) 
		return;
	
	var deltaTime=Date.now()-timeStart;
	if(deltaTime>=swipeTimeout){
		CartesianSwipe(e.target);
		timeStart=Date.now();
	}
	
	xEnd=e.touches[0].clientX;
	yEnd=e.touches[0].clientY;
	xDiff=xEnd-xStart;
	yDiff=yEnd-yStart;

	if(F) 	//need throttling
		PolarSwipe(F)
}}

PolarSwipe=function(F){
	xCenter=xEnd-window.innerWidth/2;
	yCenter=yEnd-window.innerHeight/2;
	var swipeRadius=Power(xCenter*xCenter+yCenter*yCenter,0.5);
	var swipeAngle=-Math.atan2(yCenter,xCenter);

	F(swipeRadius,swipeAngle);
}


Shout("data-game-swipe")

//Tests
// Listen("swipe-left",function(){ConsoleAdd("swipe-LEFT")})
// Listen("swipe-up",function(){ConsoleAdd("swipe-UP")})
// Listen("swipe-right",function(){ConsoleAdd("swipe-RIGHT")})
// Listen("swipe-down",function(){ConsoleAdd("swipe-DOWN")})


