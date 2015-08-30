document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
	
	screen.lockOrientation('portrait');

}




function onResume() {
	
	onDeviceReady();
}



function undor() {
	
	document.execCommand('undo', false, null);
	
}

function redor() {
	
	document.execCommand('redo', false, null);
	
}





