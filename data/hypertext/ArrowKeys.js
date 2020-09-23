ArrowGridKB=function(direction,i){
	return `<kbd class="key-${Directions[i]}">${ObtainSymbol(direction)}</kbd>`;
}	
ArrowKeysGridHTML=function(LURDArray){
	return `<span class="grid controls-arrow">${LURDArray.map(ArrowGridKB).join("")}</span>`;
}
ArrowKeysHyperText=function(){
	var grids=[
		ArrowKeysGridHTML(Directions),
		ArrowKeysGridHTML(["A","W","D","S"]),
		ArrowKeysGridHTML(Directions.map(d=>Prefix(d,"swipe")))];
	return	Enumerate(grids,"or");
}

HyperText("ArrowKeys",ArrowKeysHyperText)
