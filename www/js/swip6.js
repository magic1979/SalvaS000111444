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

function LogOut2() {
	alert("Logout");
}

function LogOut() {
	
	//alert(localStorage.getItem("Token"));
	//localStorage.setItem("email", 0);
	//localStorage.setItem("Token", "");
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"http://5.249.157.197:9000/storymatch/authentication/logout",
		   data: {token:localStorage.getItem("Token")},
		   contentType: "application/json; charset=utf-8",
		   json: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   if (result.ID==1024){
		   
		   localStorage.setItem("email", 0);
		   localStorage.setItem("Token", "");
		   window.location.href = "index.html";
		   
		   }
		   else{
		   navigator.notification.alert(
										result.msg,  // message
										alertDismissed,         // callback
										'Logout',            // title
										'OK'                  // buttonName
										);
		   }
		   
		   $(".spinner").hide();
		   
		   },
		   error: function(){
		   $(".spinner").hide();
		   
		   navigator.notification.alert(
										'Possibile errore di rete, riprova tra qualche minuto',  // message
										alertDismissed,         // callback
										'Errore',            // title
										'OK'                  // buttonName
										);
		   
		   },
		   dataType:"json"});
	
}
