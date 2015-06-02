document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
	document.addEventListener("resume", onResume, false);
	
	document.addEventListener("showkeyboard", function(){ $("[data-role=footer]").hide();}, false);
	document.addEventListener("hidekeyboard", function(){ $("[data-role=footer]").show();}, false);
	
	advancedEditor.setHTML('<div><b>Hello</b>&euro;</div>');
	
}



function onResume() {
	onDeviceReady();
}

function alertDismissed() {
	
}


function scrivere() {
	var variabile = '<div>&lt;b&gt;Hello&#39;&lt;&#47;b&gt;&euro;&quot;</div>'
	variabile = variabile.replace(/&lt;/g,'<');
	variabile = variabile.replace(/&gt;/g,'>');
	variabile = variabile.replace(/&#47;/g,'/');
	
	advancedEditor.setHTML(variabile);
}

function leggere() {
	var html = advancedEditor.getHTML();
	
	navigator.notification.alert(
								 html,  // message
								 alertDismissed,         // callback
								 'Errore',            // title
								 'OK'                  // buttonName
								 );
}
