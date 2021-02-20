///////////////////////////////////////////////////////////////////////////////
//Fullscreen

FullscreenAllowed=function(){
	return (document.exitFullscreen||document.mozCancelFullScreen||document.webkitExitFullscreen||document.msExitFullscreen||(document.webkitFullscreenElement&&document.webkitExitFullscreen)||false)!==false;
}

FullscreenActivate=function(browserprefix){
	function Deactivate(){
		if(!(document.fullscreenElement||document.webkitFullscreenElement)){
			Deselect("FullscreenButton");
			FreeFullscreenCursor();
		}
	}
	//If a change is detected within the next 512 ms, trigger the button
	[0,1,2,4,8,16,32,64,128,256,512].map(function(timedelay){
		setTimeout(function(){ListenOnce(browserprefix,Deactivate,document)},timedelay);
	});
	return
};

FullscreenOpen=function(targetIDsel){
	var e=GetElement(targetIDsel);
	var f;
	if(f=e.requestFullscreen){
		e.requestFullscreen();
		FullscreenActivate("fullscreenchange");
	} else if(f=e.mozRequestFullScreen){ /* Firefox */
		e.mozRequestFullScreen();
		FullscreenActivate("mozfullscreenchange");
	} else if(f=e.webkitRequestFullscreen){ /* Chrome, Safari and Opera */
		e.webkitRequestFullscreen();
		FullscreenActivate("webkitfullscreenchange");
	} else if(f=e.msRequestFullscreen){ /* IE/Edge */
		e.msRequestFullscreen();
		FullscreenActivate("msfullscreenchange");
	} 

	//Place the console correctly
	if(f){
		Select("FullscreenButton");
		ConsoleLoad(targetIDsel);
		ShowFullscreenCursor();
	};
}

FullscreenClose=function(){
	var f;
	if(document.fullscreenElement){
		if(f=document.exitFullscreen){
			document.exitFullscreen();
		} else if(f=document.mozCancelFullScreen){ /* Firefox */
			document.mozCancelFullScreen();
		} else if(f=document.webkitExitFullscreen){ /* Chrome, Safari and Opera */
			document.webkitExitFullscreen();
		} else if(f=document.msExitFullscreen){ /* IE */
			document.msExitFullscreen();
		}
	}
	if(document.webkitFullscreenElement&&document.webkitExitFullscreen){ /*Edge*/
		document.webkitExitFullscreen();
		f=true;
	}

	if(f) {
		Deselect("FullscreenButton");
		FreeFullscreenCursor();
	};
}

FullscreenToggle=function(targetIDsel){
	FullscreenElement.selector=targetIDsel;
	if(FullscreenAllowed()){
		if(document.fullscreenElement||document.webkitFullscreenElement){
			FullscreenClose();
		}
		else{
			FullscreenOpen(targetIDsel);
		}
	}
	else
		ConsoleAdd("Fullscreen: Please inform Pedro PSI that your browser is not yet supported!");
};

FullscreenElement=function(){
	return GetElement(FullscreenElement.selector);
}

//Fullscreen cursor
HiddenFullscreenCursor=function(){
	return Classed(FullscreenElement(),"hideCursor");
}
HideFullscreenCursor=function(){
	if(!HiddenFullscreenCursor()){
		Class(FullscreenElement(),"hideCursor");
		HideFullscreenCursor.last=ListenOnce('mousemove',ShowFullscreenCursor,FullscreenElement());
	}
}
ShowFullscreenCursor=function(){
	UnClass(FullscreenElement(),"hideCursor");
	FreeFullscreenCursor.timeout=setTimeout(HideFullscreenCursor,3000);
}
FreeFullscreenCursor=function(){
	UnClass(FullscreenElement(),"hideCursor");
	clearTimeout(FreeFullscreenCursor.timeout);
	if(HideFullscreenCursor.last)
		UnListen(HideFullscreenCursor.last);
}

DefinedShout("data-game-fullscreen");