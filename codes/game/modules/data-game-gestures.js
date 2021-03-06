var swipeThreshold = 10; //10px
var swipeTimeout = 250; //1000ms

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
	
	Shout("swipe-"+swipetype,target);
	
	return swipetype;
}


HandleTouchEnder=function(target){return function(e){

	var deltaTime=Date.now()-timeStart;
	if(deltaTime<swipeTimeout)
		CartesianSwipe(target)

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

HandleTouchMover=function(target){return function(e){
	if (!xStart||!yStart) 
		return;
	
	var deltaTime=Date.now()-timeStart;
	if(deltaTime>=swipeTimeout){
		CartesianSwipe(target);
		timeStart=Date.now();
	}
	
	xEnd=e.touches[0].clientX;
	yEnd=e.touches[0].clientY;
	xDiff=xEnd-xStart;
	yDiff=yEnd-yStart;

}}

PolarSwipe=function(F){
	xCenter=xEnd-window.innerWidth/2;
	yCenter=yEnd-window.innerHeight/2;
	var swipeRadius=SquareRoot(xCenter*xCenter+yCenter*yCenter);
	var swipeAngle=-Math.atan2(yCenter,xCenter);

	F(swipeRadius,swipeAngle);
}

//Launch Touch Actions

//Default
DefaultHandler=function(Handler){
	var Handler=Handler||Identity;
	return function(e){  
		e.preventDefault();
		return Handler(e);
	}
}

LaunchTouchActions=function(touchSel,actions){
	UnLaunchTouchActions(touchSel,actions);
	Attend(
		'touchmove',
		DefaultHandler(HandleTouchMover(touchSel)),
		touchSel);

	Attend(
		'touchend',
		DefaultHandler(HandleTouchEnder(touchSel)),
		touchSel);

	Attend(
		'touchstart',
		DefaultHandler(HandleTouchStart)
		,touchSel);

	Keys(actions).map(
		key=>Attend(key,actions[key],touchSel)
	)
}

UnLaunchTouchActions=function(touchSel,actions){

	UnAttend('touchmove',touchSel);

	UnAttend('touchend',touchSel);

	UnAttend('touchstart',touchSel);

	Keys(actions).map(
		key=>UnAttend(key,touchSel)
	)
}

DefinedShout("data-game-gestures")

//Tests
// Listen("swipe-left",function(){ConsoleAdd("swipe-LEFT")})
// Listen("swipe-up",function(){ConsoleAdd("swipe-UP")})
// Listen("swipe-right",function(){ConsoleAdd("swipe-RIGHT")})
// Listen("swipe-down",function(){ConsoleAdd("swipe-DOWN")})


