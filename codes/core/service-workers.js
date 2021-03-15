///////////////////////////////////////////////////////////////////////////////
// Service workers

PageType=function(){
	return GetElements("meta").filter(function(m){return m.getAttribute("property")==="og:type";})[0].content;
}

ListDependencies=function(){
	
	var dependencies=[];
	var imgdependencies=GetElements("img").map(function(e){return PageRelativeFolder(e.src)});
	var audiodependencies=GetElements("audio").map(function(e){return PageRelativeFolder(e.src)});
	
	dependencies=dependencies.concat(imgdependencies).concat(audiodependencies);
	
	var name=PageIdentifier();
		
	if(PageType()!=="game"&&name!=="game-console")
		return dependencies;
	
	dependencies=dependencies.concat([
		name+".html",
		//Common game bar modules
		"codes/game/modules/data-game-bar.js",
		"codes/game/game.css"
	]);
	
	var psdependencies=[
		//PS loader
		"codes/game/puzzlescript-embed.js",
		//PS modules
		"codes/game/modules/globalVariables.js",
		"codes/game/modules/debug_off.js",
		"codes/game/modules/font.js",
		"codes/game/modules/rng.js",
		"codes/game/modules/riffwave.js",
		"codes/game/modules/sfxr.js",
		"codes/game/modules/stringstream.js",
		"codes/game/modules/colors.js",
		"codes/game/modules/graphics.js",
		"codes/game/modules/engine.js",
		"codes/game/modules/parser.js",
		"codes/game/modules/compiler.js",
		"codes/game/modules/inputoutput.js",
		"codes/game/modules/mobile.js",
		//PS game bar modules
		"codes/game/modules/data-game-colours.js",
		"codes/game/modules/data-game-overwrite-puzzlescript.js",
		"codes/game/modules/data-game-moves.js"
	];
	
	
	if(name==="puzzle-type"){
		dependencies=dependencies.concat([
			"codes/game/puzzle-type/"+"puzzle-type"+".js",
			"codes/game/puzzle-type/"+"puzzle-type"+".css",
			"codes/game/modules/data-game-colours-names.js"
		])
	}
	else{
		if(name!=="game-console")				//Offline PS source
			dependencies=dependencies.concat(["codes/game/puzzlescript/"+name+".js"]);
		dependencies=dependencies.concat(psdependencies);
	}
	
	return dependencies;
}

ServiceWorker=function(){
	function SWReady(registration){
		console.log('Service worker registration succeeded:',registration);
		return navigator.serviceWorker.ready;
	};
	
	if('serviceWorker' in navigator){
		navigator.serviceWorker.register('/cacher.js',{scope:'./'}).then(SWReady).then(ServiceWorkerCacheAddF(ListDependencies())).catch(function(error){
			console.log('Service worker registration failed:',error);
		});
	}
	else 
		console.log('Service workers are not supported.');
};

SWReadyCacheAdd=function(registration,files){
	registration.active.postMessage({command:'SelectiveCache',parameters:files});
	//console.log("Registered specific dependencies in SW cache:");
	//files.map(console.log);
};
ServiceWorkerCacheAddF=function(sourceArray){
	function SWDependencies(reg){
		SWReadyCacheAdd(reg,sourceArray);
	};
	return SWDependencies;
};


ServiceWorkerCache=function(sourceArray){
	if('serviceWorker' in navigator){
		navigator.serviceWorker.ready.then(ServiceWorkerCacheAddF(sourceArray)).catch(function(error){
			console.log('SW Cache Add failed:',error);
		});
	}
	else 
		console.log('Service workers are not supported.');
};