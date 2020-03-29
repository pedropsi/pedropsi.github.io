// Background Toggle

function ToggleBGMode(bg){
	if(document.body.style.backgroundImage!='url("images/512/mosaic/'+bg+'.png")')
		ActivateBGMode(bg)
	else
		UnActivateBGMode(bg)
}

function ActivateBGMode(bg){
	document.body.style.backgroundImage='url("images/512/mosaic/'+bg+'.png")';
	document.body.style.backgroundSize='150px';
	Memory("background",'url("images/512/mosaic/'+bg+'.png")')
}

function UnActivateBGMode(bg){
	document.body.style.backgroundImage='';
	Memory("background",false)
}