document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
	document.addEventListener("resume", onResume, false);
	
	$.support.cors = true;
	$.mobile.allowCrossDomainPages = true;
	$.mobile.phonegapNavigationEnabled = true
	$.mobile.pushStateEnabled = false;
	
	$.mobile.defaultPageTransition = 'none';
	$.mobile.defaultDialogTransition = 'none';
	
	$(function() {
	  FastClick.attach(document.body);
	});

    $(".spinner").hide();
	var lista;
	
	//listaStory()
	
	/*$('body').bind("touchmove",function(event){
	  event.preventDefault();
	});
		
	
	$('#contenuto').bind("touchmove",function(e){
		e.stopPropagation();
	});*/
	
	var IDPage = getParameterByName('id');
	
	
	
	var connectionStatus = false;
	connectionStatus = navigator.onLine ? 'online' : 'offline';
	
	if(connectionStatus=='online'){
		
		notifiche()
		
		setTimeout (function(){
			$("#menu1").fadeIn()
		}, 300);
		
		//Verifica Token
		
		if (IDPage==1){
			verificatoken(1)
		}
		else if (IDPage==3){
			verificatoken(3)
		}
		else{
			verificatoken(0)
		}
		
		Token = localStorage.getItem("Token");
		//document.getElementById("email").value = localStorage.getItem("email");
		
		//listaStory()
	}
	else{
	 // Che Faccio @
	}


}

function listaStory() {
	Token = localStorage.getItem("Token");
	$("#creamsg").hide();
	$("#creaimg").show();

	
	//QUI@
	 lista = "<table id='storie' width='100%' border='0' cellpadding='0' cellspacing='0'>"
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"https://dev.storymatch.co/storymatch/userstories/list",
		   data: {token:Token},
		   contentType: "application/json; charset=utf-8",
		   json: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		$.each(result, function(i,item){
		   
		   if (result.id!=0){
			   //alert(item.id)
		   
			  lista = lista + "<tr><td class='trtabella' width='20%'><a href='swip4.html?id="+ item.id +"&idPitch=0' rel='external' class='testo'><table width='90%'><tr><td width='10%'></td><td width='90%' align='left'><b><font color='#000'>"+ item.title +"</b><br></font><font size='1' color='#000'>Today 00:00 pm</font></td></tr></table></a></td><td class='trtabella' width='5%' align='center'><a href='swip4.html?id="+ item.id +"&idPitch=0' rel='external' class='testo'><img src='img/user.png' width='20'></a></td><td class='trtabella' width='65%' align='left'><span id='swippe"+ item.id +"' style='display: none;'><table width='80%' height='80px' align='center' border='0'><tr><td width='30%' align='center'><a href='javascript:clonestory("+ item.id +")' class='btn'><font color='#000000'>Duplicate</font></a></td><td width='30%' align='center'><a href='javascript:share("+ item.id +")' class='btn'><font color='#000000'>Share</font></a></td><td width='30%' align='center'><a href='javascript:deletestory("+ item.id +")' class='btn'><font color='#000000'>Trash</font></a></td><td width='10%' align='left'></td></tr></table></span><span id='delete"+ item.id +"'><table width='80%' height='80px' align='center' border='0'><tr><td width='30%' align='center'></td><td width='30%' align='center'></td><td width='10%' align='center'></td><td width='30%' align='left'>|||</td></tr></table></span></td></tr><tr><td class='trtabella2' colspan='3'><hr></td></tr>"
		   
		   }
		   else{
		   navigator.notification.alert(
										result.msg,  // message
										exitapp,         // callback
										'Logout',            // title
										'OK'                  // buttonName @
										);
		   }

			   
		});
		   
		   lista = lista + "</table>"
		   
		   $("#contenuto").html(lista);
		   
		   $("#contenuto").fadeIn();
		   
		   $(".spinner").hide();
		   
		   $("span").on("swipeleft",function(){
				var numlist = this.id
				 numlist = numlist.substring(6)
							
				 //alert(numlist);
							
				$("#delete"+ numlist +"").hide();
				$("#swippe"+ numlist +"").fadeIn();
			});
		   
		   $("span").on("swiperight",function(){
				var numlist = this.id
				 numlist = numlist.substring(6)
							
				 //alert(numlist);
							
				$("#swippe"+ numlist +"").hide();
				$("#delete"+ numlist +"").fadeIn();
			});
		   
		   
		   listaShare();
		   
		   
		   },
		   error: function(){
		   $(".spinner").hide();
		   
		   navigator.notification.alert(
										'possible network error',  // message
										alertDismissed,         // callback
										'Error',            // title
										'OK'                  // buttonName
										);
		   
		   },
		   dataType:"json"});
	
}

function listaShare() {
	Token = localStorage.getItem("Token");
	$("#creamsg").hide();
	$("#creaimg").show();
	//alert();
	
	//QUI@
	lista = "<table id='storie' width='100%' border='0' cellpadding='0' cellspacing='0'>"
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"https://dev.storymatch.co/storymatch/userstories/listshared",
		   data: {token:Token},
		   contentType: "application/json; charset=utf-8",
		   json: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
				  
				  if (result.id!=0){
			   //alert(item.id)
				  
				  lista = lista + "<tr><td class='trtabella' width='20%'><a href='swip4.html?id="+ item.id +"&idPitch=0' rel='external' class='testo'><table width='90%'><tr><td width='10%'></td><td width='90%' align='left'><b><font color='#000'>"+ item.title +"</b><br></font><font size='1' color='#000'>Today 00:00 pm</font></td></tr></table></a></td><td class='trtabella' width='5%' align='center'><a href='swip4.html?id="+ item.id +"&idPitch=0' rel='external' class='testo'><img src='img/users.png' width='25'></a></td><td class='trtabella' width='65%' align='left'><span id='swippe"+ item.id +"' style='display: none;'><table width='80%' height='80px' align='center' border='0'><tr><td width='30%' align='center'><a href='javascript:clonestory("+ item.id +")' class='btn'><font color='#000000'>Duplicate</font></a></td><td width='30%' align='center'><a href='javascript:share("+ item.id +")' class='btn'><font color='#000000'>Share</font></a></td><td width='30%' align='center'><a href='javascript:deletestory("+ item.id +")' class='btn'><font color='#000000'>Trash</font></a></td><td width='10%' align='left'></td></tr></table></span><span id='delete"+ item.id +"'><table width='80%' height='80px' align='center' border='0'><tr><td width='30%' align='center'></td><td width='30%' align='center'></td><td width='10%' align='center'></td><td width='30%' align='left'>|||</td></tr></table></span></td></tr><tr><td class='trtabella2' colspan='3'><hr></td></tr>"
				  
				  }
				  else{
				  navigator.notification.alert(
											   result.msg,  // message
											   exitapp,         // callback
											   'Logout',            // title
											   'OK'                  // buttonName @
											   );
				  }
				  
			   
				  });
		   
		   lista = lista + "</table>"
		   
		   $("#contenuto").append(lista);
		   
		   $(".spinner").hide();
		   
		   $("span").on("swipeleft",function(){
						var numlist = this.id
						numlist = numlist.substring(6)
						
						//alert(numlist);
						
						$("#delete"+ numlist +"").hide();
						$("#swippe"+ numlist +"").fadeIn();
						});
		   
		   $("span").on("swiperight",function(){
						var numlist = this.id
						numlist = numlist.substring(6)
						
						//alert(numlist);
						
						$("#swippe"+ numlist +"").hide();
						$("#delete"+ numlist +"").fadeIn();
						});
		   
		   
		   },
		   error: function(){
		   $(".spinner").hide();
		   
		   navigator.notification.alert(
										'possible network error',  // message
										alertDismissed,         // callback
										'Error',            // title
										'OK'                  // buttonName
										);
		   
		   },
		   dataType:"json"});
	
}

function cestino() {
	$("#creamsg").hide();
	$("#creaimg").show();
	
	//QUI@
	lista = "<table id='storie' width='100%' border='0' cellpadding='0' cellspacing='0'>"
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"https://dev.storymatch.co/storymatch/userstories/listtrash",
		   //data: {token:Token},
		   contentType: "application/json; charset=utf-8",
		   json: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
				  
				  if (result.id!=0){
				  //alert(item.id)
				  
				  lista = lista + "<tr><td class='trtabella' width='20%'><a href='swip4.html?id="+ item.id +"&idPitch=0' rel='external' class='testo'><table width='90%'><tr><td width='10%'></td><td width='90%' align='left'><b><font color='#000'>"+ item.title +"</b><br></font><font size='1' color='#000'>Today 00:00 pm</font></td></tr></table></a></td><td class='trtabella' width='5%' align='center'><a href='swip4.html?id="+ item.id +"&idPitch=0' rel='external' class='testo'><img src='img/Comunity2.png' width='25'></a></td><td class='trtabella' width='65%' align='left'><span id='swippe"+ item.id +"' style='display: none;'><table width='80%' height='80px' align='center' border='0'><tr><td width='30%' align='center'><a href='javascript:clonestory("+ item.id +")' class='btn'><font color='#000000'>Duplicate</font></a></td><td width='30%' align='center'><a href='javascript:share("+ item.id +")' class='btn'><font color='#000000'>Share</font></a></td><td width='30%' align='center'><a href='javascript:deletestory("+ item.id +")' class='btn'><font color='#000000'>Trash</font></a></td><td width='10%' align='left'></td></tr></table></span><span id='delete"+ item.id +"'><table width='80%' height='80px' align='center' border='0'><tr><td width='30%' align='center'></td><td width='30%' align='center'></td><td width='10%' align='center'></td><td width='30%' align='left'></td></tr></table></span></td></tr><tr><td class='trtabella2' colspan='3'><hr></td></tr>"
				  
				  }
				  else{
				  navigator.notification.alert(
											   result.msg,  // message
											   exitapp,         // callback
											   'Logout',            // title
											   'OK'                  // buttonName @
											   );
				  }
				  
			   
				  });
		   
		   lista = lista + "</table>"
		   
		   $("#contenuto").html(lista);
		   
		   $("#contenuto").fadeOut();
		   $("#contenuto").fadeIn();
		   
		   $(".spinner").hide();
		   
		   $("span").on("swipeleft",function(){
						var numlist = this.id
						numlist = numlist.substring(6)
						
						//alert(numlist);
						
						$("#delete"+ numlist +"").hide();
						$("#swippe"+ numlist +"").fadeIn();
						});
		   
		   $("span").on("swiperight",function(){
						var numlist = this.id
						numlist = numlist.substring(6)
						
						//alert(numlist);
						
						$("#swippe"+ numlist +"").hide();
						$("#delete"+ numlist +"").fadeIn();
						});
		   
		   
		   },
		   error: function(){
		   $(".spinner").hide();
		   
		   navigator.notification.alert(
										'possible network error',  // message
										alertDismissed,         // callback
										'Error',            // title
										'OK'                  // buttonName
										);
		   
		   },
		   dataType:"json"});
	
}

function alertDismissed() {
	
}

function verificatoken(id) {
	Token = localStorage.getItem("Token");
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"https://dev.storymatch.co/storymatch/authentication/validatetoken",
		   data: {token:Token},
		   contentType: "application/json; charset=utf-8",
		   json: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   if (result.ID==1024){
		   //OK
		     if(id==1){
		       cestino()
		     }
		     else if (id==3){
			  notifichelist()
		     }
			  else{
			   listaStory()
			  }
		   
		   }
		   else{
		   navigator.notification.alert(
										result.msg,  // message
										exitapp,         // callback
										'Logout',            // title
										'OK'                  // buttonName
										);
		   }
		   
		   $(".spinner").hide();
		   
		   },
		   error: function(){
		   $(".spinner").hide();
		   
		   navigator.notification.alert(
										'possible network error',  // message
										alertDismissed,         // callback
										'Error',            // title
										'OK'                  // buttonName
										);
		   
		   },
		   dataType:"json"});
	
}

function deletestory(id) {
	Token = localStorage.getItem("Token");
	
	$(".spinner").show();
	$.ajax({
		   url: "https://dev.storymatch.co/storymatch/userstories/delete",
		   dataType: "json",
		   type: "post",
		   contentType: "application/json",
		   data: JSON.stringify( { "token": ""+ localStorage.getItem("Token") +"", "storyid":""+ id +""} ),
		   processData: false,
		   crossDomain: true,
		   success:function(result){
		   
		   if (result.ID==1024){
		   //OK
		   navigator.notification.alert(
				result.msg,  // message
				alertDismissed,         // callback
				'Delete Story',            // title
				'OK'                  // buttonName
			);
		   
		   listaStory()
		   }
		   else{
		   navigator.notification.alert(
										result.msg,  // message
										alertDismissed,         // callback
										'Delete Story',            // title
										'OK'                  // buttonName
										);
		   }
		   
		   $(".spinner").hide();
		   
		   },
		   error: function(){
		   $(".spinner").hide();
		   
		   navigator.notification.alert(
										'possible network error',  // message
										alertDismissed,         // callback
										'Error',            // title
										'OK'                  // buttonName
										);
		   
		   },
		   dataType:"json"});

}


function clonestory(id) {
	Token = localStorage.getItem("Token");
	
	$(".spinner").show();
	$.ajax({
		   url: "https://dev.storymatch.co/storymatch/userstories/clone",
		   dataType: "json",
		   type: "post",
		   contentType: "application/json",
		   data: JSON.stringify( { "token": ""+ localStorage.getItem("Token") +"", "storyid":""+ id +""} ),
		   processData: false,
		   crossDomain: true,
		   success:function(result){
		   
		   if (result.ID==1024){
		   //OK
		   navigator.notification.alert(
										'ok',  // message
										alertDismissed,         // callback
										'Clone Story',            // title
										'OK'                  // buttonName
										);
		   
		   listaStory()
		   }
		   else{
		   navigator.notification.alert(
										'error',  // message
										alertDismissed,         // callback
										'Clone Story',            // title
										'OK'                  // buttonName
										);
		   }
		   
		   $(".spinner").hide();
		   
		   },
		   error: function(){
		   $(".spinner").hide();
		   
		   navigator.notification.alert(
										'possible network error',  // message
										alertDismissed,         // callback
										'error',            // title
										'OK'                  // buttonName
										);
		   
		   },
		   dataType:"json"});

}


function notifiche() {
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"https://dev.storymatch.co/storymatch/notify/check",
		   contentType: "application/json; charset=utf-8",
		   json: 'callback',
		   crossDomain: true,
		   success:function(result){
			
		   
		   if (result.obj["notifyNumber"]==0){
			 $("#badde").removeClass("badge1").addClass("badge2");
		   }
		   else{
			 $("#badde").removeClass("badge2").addClass("badge1");
			 $("#badde").attr("data-badge", result.obj["notifyNumber"])
		   }
		   //alert(result.obj["notifyNumber"])
		
		   
		   $(".spinner").hide();
		   
		   },
		   error: function(){
		   $(".spinner").hide();
		   
		   navigator.notification.alert(
										'possible network error',  // message
										alertDismissed,         // callback
										'error',            // title
										'OK'                  // buttonName
										);
		   
		   },
		   dataType:"json"});

	
	//$("#badde").removeClass("badge1").addClass("badge2"); @
	
	//$("#badde").attr("data-badge", Badge10);
	
	
}

function notifichelist() {
	
	notifiche()
	
	$("#creaimg").hide();
	$("#creamsg").show();
	
	
	lista = "<table id='storie' width='100%' border='0' cellpadding='0' cellspacing='0'>"
	var conto = 1;
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"https://dev.storymatch.co/storymatch/notify/list",
		   contentType: "application/json; charset=utf-8",
		   json: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result.obj, function(i,item){
				  

				  lista = lista + "<tr><td class='trtabella' width='20%'><table width='90%'><tr><td width='10%'></td><td width='90%' align='left'><a href='javascript:riepiemail("+ conto +")' class='collegamento'><b><font size='2' color='#000'>"+ item.fromuser +"</font></b></a></td></tr></table></td><td class='trtabella' width='65%' align='left'><a href='javascript:riepiemail("+ conto +")' class='collegamento'><font size='2' color='#000'>"+ item.message +"</font></a></td><td class='trtabella' width='15%'><a href='javascript:riepiemail("+ conto +")'><img src='img/letter.png' width='20px'></a><td></tr><tr><td class='trtabella2' colspan='3'><hr></td></tr><tr id='babbo"+ conto +"' style='display: none;'><td colspan='2' align='center'><form id='formia"+ conto +"' name='formia"+ conto +"' action='entra.asp' method='post'><input placeholder='Email address' id='email"+ conto +"' type='text' name='email"+ conto +"' size='60' value='"+ item.fromuser +"'><br><textarea rows='4' cols='60' id='messaggio"+ conto +"' name='messaggio"+ conto +"'></textarea><br><a href='javascript:closemessaggio("+ conto +")' class='btn'><font color='#000'>Cancella</font></a><a href='javascript:mandamessaggio("+ conto +")' class='btn'><font color='#000'>Invia</font></a></form><br><hr></td></tr>"
				  
				conto = conto+1
			});
		   
		   
		   /*if (result.ID==1024){
			//OK
			navigator.notification.alert(
			result.ID,  // message
			alertDismissed,         // callback
			'Logout',            // title
			'OK'                  // buttonName
			);
			
			}
			else{
			navigator.notification.alert(
			result.msg,  // message
			alertDismissed,         // callback
			'Logout',            // title
			'OK'                  // buttonName
			);
			}*/
		   
		   lista = lista + "</table>"
		   
		   $("#contenuto").html(lista);
		   
		   $("#contenuto").fadeIn();
		   
		   $(".spinner").hide();
		   
		   
		   },
		   error: function(){
		   $(".spinner").hide();
		   
		   navigator.notification.alert(
										'possible network error',  // message
										alertDismissed,         // callback
										'error',            // title
										'OK'                  // buttonName
										);
		   
		   },
		   dataType:"json"});
	
	
	//$("#badde").removeClass("badge1").addClass("badge2"); @
	
	//$("#badde").attr("data-badge", Badge10);
	
	
}


function exitapp() {
	window.location.href = "index.html";
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

function share(id) {
	localStorage.setItem("sharestory", id);
	
	navigator.notification.prompt(
								  'Share your story',  // message
								  sharestory,                  // callback to invoke
								  'Share Story',            // title
								  ['Invia','Annulla'],             // buttonLabels
								  ''                 // defaultText
								  );
}

function sharestory(results) {
	if(results.buttonIndex==1){
		if (results.input1 == "") {
			navigator.notification.alert(
										 'insert email',  // message
										 alertDismissed,         // callback
										 'Email',            // title
										 'OK'                  // buttonName
										 );
			return;
		}
		
		EmailAddr = results.input1;
		Filtro = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-]{2,})+\.)+([a-zA-Z0-9]{2,})+$/;
		if (Filtro.test(EmailAddr)) {
			
		}
		else {
			navigator.notification.alert(
										 'Caratteri email non consentiti',  // message
										 alertDismissed,         // callback
										 'Email',            // title
										 'OK'                  // buttonName
										 );
			return;
		}
		
		
		$(".spinner").show();
		$.ajax({
			   url: "https://dev.storymatch.co/storymatch/userstories/share",
			   dataType: "json",
			   type: "post",
			   contentType: "application/json",
			   data: JSON.stringify( { "storyid": ""+ localStorage.getItem("sharestory") +"", "usernametoshare":""+ results.input1 +""} ),
			   processData: false,
			   crossDomain: true,
			   success:function(result){
			   
			   if (result.ID==1024){
			   //OK
			   navigator.notification.alert(
											result.msg,  // message
											alertDismissed,         // callback
											'Share Story',            // title
											'OK'                  // buttonName
											);
			   
			   //listaStory()
			   }
			   else{
			   navigator.notification.alert(
											result.msg,  // message
											alertDismissed,         // callback
											'Share Story',            // title
											'OK'                  // buttonName
											);
			   }
			   
			   $(".spinner").hide();
			   
			   },
			   error: function(){
			   $(".spinner").hide();
			   
			   navigator.notification.alert(
											'possible network error',  // message
											alertDismissed,         // callback
											'error',            // title
											'OK'                  // buttonName
											);
			   
			   },
			   dataType:"json"});


		
		
	}
	
}

function forgot() {
	navigator.notification.prompt(
								  'Insert email address',  // message
								   onPrompt,                  // callback to invoke
								  'Share',            // title
								  ['Send','Cancel'],             // buttonLabels
								  'Email'                 // defaultText
								  );
}

function onPrompt(results) {
	if(results.buttonIndex==1){
		if (results.input1 == "") {
			navigator.notification.alert(
										 'insert email',  // message
										 alertDismissed,         // callback
										 'Email',            // title
										 'OK'                  // buttonName
										 );
			return;
		}
		
		EmailAddr = results.input1;
		Filtro = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-]{2,})+\.)+([a-zA-Z0-9]{2,})+$/;
		if (Filtro.test(EmailAddr)) {
			
		}
		else {
			navigator.notification.alert(
										 'Caratteri email non consentiti',  // message
										 alertDismissed,         // callback
										 'Email',            // title
										 'OK'                  // buttonName
										 );
			return;
		}
		
		//Recupera la Password
		//alert("You selected button number " + results.buttonIndex + " and entered " + results.input1);
		
		
	
	}
	
}


function createstory() {
	navigator.notification.prompt(
								  'Insert Name',  // message
								  creastoria,                  // callback to invoke
								  'Create Story',            // title
								  ['Invia','Annulla'],             // buttonLabels
								  ''                 // defaultText
								  );
}

function creastoria(results) {
	if(results.buttonIndex==1){
		if (results.input1 == "") {
			navigator.notification.alert(
										 'insert name',  // message
										 alertDismissed,         // callback
										 'Create Story',            // title
										 'OK'                  // buttonName
										 );
			return;
		}
		
		
		//Nome Storia
		//alert("You selected button number " + results.buttonIndex + " and entered " + results.input1);
		
		/*$(".spinner").show();
		$.ajax({
			   type:"GET",
			   url:"https://dev.storymatch.co/storymatch/userstories/create",
			   data: {token:localStorage.getItem("Token"),title:results.input1},
			   contentType: "application/json; charset=utf-8",
			   json: 'callback',
			   crossDomain: true,
			   success:function(result){
			   
			   if (result.ID==1024){
			   navigator.notification.alert(
											result.msg,  // message
											alertDismissed,         // callback
											'Create Story',            // title
											'OK'                  // buttonName
											);
			   
			   window.location.href = "swip2.html";
			   
		    }
			   
			   
			   
			   else{
			   navigator.notification.alert(
											result.msg,  // message
											alertDismissed,         // callback
											'Create Story',            // title
											'OK'                  // buttonName
											);
			   }
			   
			   $(".spinner").hide();
			   
			   },
			   error: function(){
			   $(".spinner").hide();
			   
			   navigator.notification.alert(
											'possible network error',  // message
											alertDismissed,         // callback
											'error',            // title
											'OK'                  // buttonName
											);
			   
			   },
			   dataType:"json"});*/
		
		$(".spinner").show();
		$.ajax({
			   url: "https://dev.storymatch.co/storymatch/userstories/create",
			   dataType: "json",
			   type: "post",
			   contentType: "application/json",
			   data: JSON.stringify( { "token":localStorage.getItem("Token"),"title":results.input1 } ),
			   processData: false,
			   crossDomain: true,
			   success:function(result){
			   
			   if (result.ID==1024){
			   navigator.notification.alert(
											result.msg,  // message
											alertDismissed,         // callback
											'Create Story',            // title
											'OK'                  // buttonName
											);
			   
			   window.location.href = "swip2.html";
		    }
			   else{
			   navigator.notification.alert(
											result.msg,  // message
											alertDismissed,         // callback
											'Create Story',            // title
											'OK'                  // buttonName
											);
			   }
			   
			   $(".spinner").hide();
			   
			   },
			   error: function( jqXhr, textStatus, errorThrown ){
			   $(".spinner").hide();
			   
			   alert(errorThrown)
			   
			   navigator.notification.alert(
											'possible network error',  // message
											alertDismissed,         // callback
											'error',            // title
											'OK'                  // buttonName
											);
			   
			   },
			   dataType:"json"});
		
	}
	
}

function confirmLogout() {
	
	
	navigator.notification.confirm(
								   'confirm the logout',  // message
								   onConfirm,              // callback to invoke with index of button pressed
								   'Logout',            // title
								   'Accept,No'      // buttonLabels
								   );
	
	
}

function onConfirm(button) {
	
	if (button==1){
		LogOut()
	}
}

function costruzione() {
	
	navigator.notification.alert(
								 'Under Construction',  // message
								 alertDismissed,         // callback
								 'Stop',            // title
								 'OK'                  // buttonName
								 );
	
}

function iframme() {
	// popup examples
	$( document ).on( "pagecreate", function() {
					 // The window width and height are decreased by 30 to take the tolerance of 15 pixels at each side into account
					 function scale( width, height, padding, border ) {
					 var scrWidth = $( window ).width() - 30,
					 scrHeight = $( window ).height() - 30,
					 ifrPadding = 2 * padding,
					 ifrBorder = 2 * border,
					 ifrWidth = width + ifrPadding + ifrBorder,
					 ifrHeight = height + ifrPadding + ifrBorder,
					 h, w;
					 if ( ifrWidth < scrWidth && ifrHeight < scrHeight ) {
					 w = ifrWidth;
					 h = ifrHeight;
					 } else if ( ( ifrWidth / scrWidth ) > ( ifrHeight / scrHeight ) ) {
					 w = scrWidth;
					 h = ( scrWidth / ifrWidth ) * ifrHeight;
					 } else {
					 h = scrHeight;
					 w = ( scrHeight / ifrHeight ) * ifrWidth;
					 }
					 return {
					 'width': w - ( ifrPadding + ifrBorder ),
					 'height': h - ( ifrPadding + ifrBorder )
					 };
					 };
					 $( ".ui-popup iframe" )
					 .attr( "width", 0 )
					 .attr( "height", "auto" );
					 $( "#popupMap iframe" ).contents().find( "#map_canvas" )
					 .css( { "width" : 0, "height" : 0 } );
					 $( "#popupMap" ).on({
										 popupbeforeposition: function() {
										 var size = scale( 600, 760, 0, 1 ),
										 w = size.width,
										 h = size.height;
										 $( "#popupMap iframe" )
										 .attr( "width", w )
										 .attr( "height", h );
										 $( "#popupMap iframe" ).contents().find( "#map_canvas" )
										 .css( { "width": w, "height" : h } );
										 },
										 popupafterclose: function() {
										 $( "#popupMap iframe" )
										 .attr( "width", 0 )
										 .attr( "height", 0 );
										 $( "#popupMap iframe" ).contents().find( "#map_canvas" )
										 .css( { "width": 0, "height" : 0 } );
										 }
										 });
					 });
	
}


function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
						  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
						  results = regex.exec(location.search);
						  return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
						  }


						  function mandamessaggio(num) {
						  //alert()
						  var email = document.getElementById("email"+ num +"").value.toLowerCase();
						  var messaggio = document.getElementById("messaggio"+ num +"").value.toLowerCase();
						  
						  if (email == "") {
						  navigator.notification.alert(
													   'inserire Email',  // message
													   alertDismissed,         // callback
													   'Email',            // title
													   'OK'                  // buttonName
													   );
						  return;
						  }
						  
						  
						  if (messaggio == "") {
						  navigator.notification.alert(
													   'inserire un messaggio',  // message
													   alertDismissed,         // callback
													   'Pin',            // title
													   'OK'                  // buttonName
													   );
						  return;
						  }
						  
						  //pinreg = encode64(pinreg);
						  
						  
						  EmailAddr = email;
						  Filtro = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-]{2,})+\.)+([a-zA-Z0-9]{2,})+$/;
						  if (Filtro.test(EmailAddr)) {
						  
						  }
						  else {
						  navigator.notification.alert(
													   'Caratteri email non consentiti',  // message
													   alertDismissed,         // callback
													   'Email',            // title
													   'OK'                  // buttonName
													   );
						  return;
						  }
						  
						  //alert(email)
						  //alert(messaggio)
						  
						  $(".spinner").show();
						  $.ajax({
								 url: "https://dev.storymatch.co/storymatch/notify/sendmessage",
								 dataType: "json",
								 type: "post",
								 contentType: "application/json",
								 data: JSON.stringify( { "usernametoshare": ""+ email +"", "message": ""+ messaggio +"" } ),
								 processData: false,
								 crossDomain: true,
								 success: function( result, textStatus, jQxhr ){
								 if (result.ID==1024){
								 //alert(result.token);
								 navigator.notification.alert(
															  result.msg,  // message
															  alertDismissed,         // callback
															  'Email',            // title
															  'OK'                  // buttonName
															  );
								 
								 }
								 else{
								 navigator.notification.alert(
															  result.msg,  // message
															  alertDismissed,         // callback
															  'Email',            // title
															  'OK'                  // buttonName
															  );
								 }
								 $(".spinner").hide();

								 $("#babbo"+ num +"").hide();
								 

								 },
								 error: function( jqXhr, textStatus, errorThrown ){
								 navigator.notification.alert(
															  'possible network error',  // message
															  alertDismissed,         // callback
															  'error',            // title
															  'OK'                  // buttonName
															  );		   }
								 });
						  
						  
						  
						  }
						  
						  function riepiemail(mail) {
						  
						  //alert(mail);
						  $("#babbo"+ mail +"").show();
						  
						  //document.getElementById("email").value = mail //document.getElementById("locco"+  +"").value;
						  
						   //$("#apri").click();
						  }
						  
						  function closemessaggio(mail) {

							$("#babbo"+ mail +"").hide();

						  }
						  
						  function createmessaggio(mail) {
						  
							$("#babbo0").show();
						  
						  }
						  
						  function closemessaggio0() {
						  
						   $("#babbo0").hide();
						  
						  }




