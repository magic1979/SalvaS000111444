document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
	document.addEventListener("resume", onResume, false);

    $(".spinner").hide();

}



function alertDismissed() {
	
}

function LogOut() {
	localStorage.setItem("email", 0);
	localStorage.setItem("Token", "");
	//alert("out");
	
	window.location.href = "index.html";
}

function onResume() {
	onDeviceReady();
}

function alertDismissed() {
	
}