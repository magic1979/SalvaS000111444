document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
	//document.addEventListener("resume", onResume, false);
	
	$.support.cors = true;
	$.mobile.allowCrossDomainPages = true;
	$.mobile.phonegapNavigationEnabled = true
	$.mobile.pushStateEnabled = false;
	
	$.mobile.defaultPageTransition = 'none';
	$.mobile.defaultDialogTransition = 'none';
	
    $(".spinner").hide();
	var lista;
	var vuoto = 0;
	
	//listaStory()
	
	var IDPage = getParameterByName('id');
	
	
	var connectionStatus = false;
	connectionStatus = navigator.onLine ? 'online' : 'offline';
	
	if(connectionStatus=='online'){
		$("#VerConnessione").hide()
		
		$(document).on("click touchstart", "#creamsg", function(e){
			e.preventDefault();
			createmessaggio();
		});
		
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
		
		var Token = localStorage.getItem("Token");
		//document.getElementById("email").value = localStorage.getItem("email");
		
		//listaStory()
	}
	else{
		navigator.notification.alert(
										'possible network error',  // message
									     alertDismissed,         // callback
										'Error',            // title
										'OK'                  // buttonName
										);
		$("#VerConnessione").show()
		
	}

}

function listaStory() {
	
	Token = localStorage.getItem("Token");
	$("#creamsg").hide();
	$("#creaimg").show();
	
	var vuoto;
	var conta = 1;

	
	//QUI@
	lista = " <table height='52px' width='60%' border='0' cellpadding='0' cellspacing='0'><tr><td width='90%' class='trtabella2' align='right'><font size='4' color='#a4a4a4'><div id='Titolotbl'>Drafts</div></font></td></tr></table><table id='storie' width='100%' border='0' cellpadding='0' cellspacing='0'><tr><td class='trtabella2' colspan='3'><hr></td></tr>"
	
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"https://staging.storymatch.co/storymatch/userstories/list",
		   data: {token:Token},
		   contentType: "application/json; charset=utf-8",
		   json: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   if(result === null || typeof(result) == 'undefined' || result ==""){
			 vuoto = 1;
		   }
		   else{
			 vuoto = 0;
		   }
		   
		   $.each(result, function(i,item){
		   
		   if (result.id!=0){
			   //alert(item.id)
		   
			  lista = lista + "<tr id='riga"+ item.id +"'><td class='trtabella' width='20%'><a href='swip4.html?id="+ item.id +"&idPitch=0' rel='external' class='testo'><table width='90%'><tr><td width='10%'></td><td width='90%' align='left'><b><font color='#000'>"+ item.title +"</b><br></font><font size='1.5' color='#000'>"+ item.day +"."+ item.month +"."+ item.year +"</font></td></tr></table></a></td><td class='trtabella' width='5%' align='center'><a href='swip4.html?id="+ item.id +"&idPitch=0' rel='external' class='testo'><img src='img/user.png' width='20'></a></td><td class='trtabella' width='65%' align='left'><span id='swippe"+ item.id +"' style='display: none;'><input id='idLine"+ conta +"' value='"+ item.id +"' type='hidden'><input id='swippo"+ item.id +"' value='"+ item.id +"' type='hidden'><table id='ciccio2' width='80%' height='80px' align='center' border='0'><tr><td width='30%' align='center'><a href='javascript:clonestory("+ item.id +")' class='btn'><font color='#000000'>Duplicate</font></a></td><td width='30%' align='center'><a href='javascript:share("+ item.id +")' class='btn'><font color='#000000'>Share</font></a></td><td width='30%' align='center'><a href='javascript:deletestory("+ item.id +")' class='btn'><font color='#000000'>Trash</font></a></td><td width='10%' align='left'></td></tr></table></span><span id='delete"+ item.id +"'><table id='ciccio' width='80%' height='80px' align='center' border='0'><tr><td width='30%' align='center'></td><td width='30%' align='center'></td><td width='10%' align='center'></td><td width='30%' align='left'>|||</td></tr></table></span></td></tr><tr><td class='trtabella2' colspan='3'><hr></td></tr>"
				  
				  conta = conta + 1;
		   
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
		   $("#Titolotbl").html("List Stories");
		   
		   /*$("span").on("swipeleft",function(){
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
			});*/
			var tocco=0;
			
			$(document).on("touchmove", "span", function(e){
				e.preventDefault();
				var numlist = this.id
				numlist = numlist.substring(6)
				
				var numero = document.getElementById("swippo"+ numlist +"").value
				
				alert(numlist);
				
				if (numero != 0){
					$("#delete"+ numlist +"").hide();
					$("#swippe"+ numlist +"").show();
					document.getElementById("swippo"+ numlist +"").value = 0;
				}
				else{
					$("#swippe"+ numlist +"").hide();
					$("#delete"+ numlist +"").show();
					document.getElementById("swippo"+ numlist +"").value = "swippo"+ numlist
				}
				
				
			});	

		   
		   /*for ( k=1; k < conta; k++ )
		   {

		     iddOut = document.getElementById("idLine"+ contasalva +"").value
			 alert(iddOut)
		   
			 $("#riga"+ iddOut +"").on("click", function() {
				alert(iddOut)
				window.location.href = "swip4.html?id="+ iddOut +"&idPitch=0";
			 
			 });
		   
		   $(document).on("click", "#riga"+ iddOut +"", function(e){
				e.preventDefault();
				alert(iddOut)
				window.location.href = "swip4.html?id="+ iddOut +"&idPitch=0";
			});
		   
		   contasalva = contasalva + 1;

		   }*/
		   
		   
		   listaShare(vuoto);
		   
		   
		   },
		   error: function(){
		   $(".spinner").hide();
		   
		   navigator.notification.alert(
										'possible network error 2',  // message
										alertDismissed,         // callback
										'Error',            // title
										'OK'                  // buttonName
										);
		   
		   },
		   dataType:"json"});
	
}

function listaShare(vuoto) {
	Token = localStorage.getItem("Token");
	$("#creamsg").hide();
	$("#creaimg").show();
	//alert(vuoto);
	
	//QUI@
	lista = "<table id='storie' width='100%' border='0' cellpadding='0' cellspacing='0'>"
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"https://staging.storymatch.co/storymatch/userstories/listshared",
		   data: {token:Token},
		   contentType: "application/json; charset=utf-8",
		   json: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   if(result === null || typeof(result) == 'undefined' || result ==""){
		     //alert("Vuoto");
			  if(vuoto==1){
		        window.location.href = "swip.html";
			  }
		   }
		   else{
		   
		   $.each(result, function(i,item){
				  
				  if (result.id!=0){
			      //alert(item.id)
				  
				  lista = lista + "<tr><td class='trtabella' width='20%'><a href='swip4.html?id="+ item.id +"&idPitch=0' rel='external' class='testo'><table width='90%'><tr><td width='10%'></td><td width='90%' align='left'><b><font color='#000'>"+ item.title +"</b><br></font><font size='1.5' color='#000'>"+ item.day +"."+ item.month +"."+ item.year +"</font></td></tr></table></a></td><td class='trtabella' width='5%' align='center'><a href='swip4.html?id="+ item.id +"&idPitch=0' rel='external' class='testo'><img src='img/users.png' width='25'></a></td><td class='trtabella' width='65%' align='left'><div id='swippe"+ item.id +"' style='display: none;'><input id='swippo"+ item.id +"' value='"+ item.id +"' type='hidden'><table width='80%' height='80px' align='center' border='0'><tr><td width='30%' align='center'><a href='javascript:clonestory("+ item.id +")' class='btn'><font color='#000000'>Duplicate</font></a></td><td width='30%' align='center'><a href='javascript:share("+ item.id +")' class='btn'><font color='#000000'>Share</font></a></td><td width='30%' align='center'><a href='javascript:deletestory("+ item.id +")' class='btn'><font color='#000000'>Trash</font></a></td><td width='10%' align='left'></td></tr></table></div><div id='delete"+ item.id +"'><table width='80%' height='80px' align='center' border='0'><tr><td width='30%' align='center'></td><td width='30%' align='center'></td><td width='10%' align='center'></td><td width='30%' align='left'>|||</td></tr></table></div></td></tr><tr><td class='trtabella2' colspan='3'><hr></td></tr>"
				  
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
		   
		   }
		   
		   lista = lista + "</table>"
		   
		   $("#contenuto").append(lista);
		   
		   $(".spinner").hide();
		   
		   $(document).on("touchmove", "div", function(e){
				e.preventDefault();
				var numlist = this.id
				numlist = numlist.substring(6)
				
				var numero = document.getElementById("swippo"+ numlist +"").value
				
				alert(numlist);
				
				if (numero != 0){
					$("#delete"+ numlist +"").hide();
					$("#swippe"+ numlist +"").show();
					document.getElementById("swippo"+ numlist +"").value = 0;
				}
				else{
					$("#swippe"+ numlist +"").hide();
					$("#delete"+ numlist +"").show();
					document.getElementById("swippo"+ numlist +"").value = "swippo"+ numlist
				}
				
				
			});	
		   
		   
		   },
		   error: function(){
		   $(".spinner").hide();
		   
		   navigator.notification.alert(
										'possible network error 3',  // message
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
	$("#babbo0").hide();
	$("#intestazione").html("Trash");
	
	
	//window.onscroll=function(){window.scrollTo(52, 52);};
	
	//QUI@
	lista = " <table height='52px' width='60%' border='0' cellpadding='0' cellspacing='0'><tr><td width='90%' class='trtabella2' align='right'><font size='4' color='#a4a4a4'><div id='Titolotbl'>Drafts</div></font></td></tr></table><table id='storie' width='100%' border='0' cellpadding='0' cellspacing='0'><tr><td class='trtabella2' colspan='3'><hr></td></tr>"
	
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"https://staging.storymatch.co/storymatch/userstories/listtrash",
		   //data: {token:Token},
		   contentType: "application/json; charset=utf-8",
		   json: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
				  
				  if (result.id!=0){
				  //alert(item.id) AGGIUNGERE LA DATA.
				  
				  lista = lista + "<tr><td class='trtabella' width='20%'><a href='swip4.html?id="+ item.id +"&idPitch=0' rel='external' class='testo'><table width='90%'><tr><td width='10%'></td><td width='90%' align='left'><b><font color='#000'>"+ item.title +"</b><br></font><font size='1.5' color='#000'>"+ item.day +"."+ item.month +"."+ item.year +"</font></td></tr></table></a></td><td class='trtabella' width='5%' align='center'><a href='swip4.html?id="+ item.id +"&idPitch=0' rel='external' class='testo'><img src='img/delete.png' width='25'></a></td><td class='trtabella' width='65%' align='left'><span id='swippe"+ item.id +"' style='display: none;'><table width='80%' height='80px' align='center' border='0'><tr><td width='30%' align='center'><a href='javascript:clonestory("+ item.id +")' class='btn'><font color='#000000'>Duplicate</font></a></td><td width='30%' align='center'><a href='javascript:share("+ item.id +")' class='btn'><font color='#000000'>Share</font></a></td><td width='30%' align='center'><a href='javascript:deletestory("+ item.id +")' class='btn'><font color='#000000'>Trash</font></a></td><td width='10%' align='left'></td></tr></table></span><span id='delete"+ item.id +"'><table width='80%' height='80px' align='center' border='0'><tr><td width='30%' align='center'></td><td width='30%' align='center'></td><td width='10%' align='center'></td><td width='30%' align='left'></td></tr></table></span></td></tr><tr><td class='trtabella2' colspan='3'><hr></td></tr>"
				  
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
		   $("#Titolotbl").html("Story Eliminated");
		   
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
	
	//alert(id);
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"https://staging.storymatch.co/storymatch/authentication/validatetoken",
		   data: {token:Token},
		   contentType: "application/json; charset=utf-8",
		   json: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   //alert(result.ID)
		   
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
										'possible network error 1',  // message
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
		   url: "https://staging.storymatch.co/storymatch/userstories/delete",
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
		   
		   window.location.href = "swip2.html?id=1";
		   //listaStory()
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
		   url: "https://staging.storymatch.co/storymatch/userstories/clone",
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
		   
		    
			window.location.href = "swip2.html?id=2";
		   //listaStory()
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
		   url:"https://staging.storymatch.co/storymatch/notify/check",
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
										'possible network error 4',  // message
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
	$("#Titolotbl").html("My Messagge");
	
	lista = "<table height='52px' width='60%' border='0' cellpadding='0' cellspacing='0'><tr><td width='90%' class='trtabella2' align='right'><font size='4' color='#a4a4a4'><div id='Titolotbl'>Drafts</div></font></td></tr></table><table id='storie' width='100%' border='0' cellpadding='0' cellspacing='0'><tr><td class='trtabella2' colspan='3'><hr></td></tr>"
	var conto = 1;
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"https://staging.storymatch.co/storymatch/notify/list",
		   contentType: "application/json; charset=utf-8",
		   json: 'callback',
		   crossDomain: true,
		   success:function(result){

		   if(result.obj === null || typeof(result.obj) == 'undefined' || result.obj==""){
			//verificatoken(0)
		    createmessaggio()
			//document.getElementById("email0").value = localStorage.getItem("email")
		   
			//lista = lista + "<tr id='babbo"+ conto +"'><td colspan='2' align='center'><form id='formia"+ conto +"' name='formia"+ conto +"' action='entra.asp' method='post'><input placeholder='Email address' id='email"+ conto +"' type='text' name='email"+ conto +"' size='60' value='"+ localStorage.getItem("email") +"'><br><textarea rows='4' cols='60' id='messaggio"+ conto +"' name='messaggio"+ conto +"'></textarea><br><a href='javascript:verificatoken(0)' class='btn'><font color='#000'>Cancella</font></a><a href='javascript:mandamessaggio("+ conto +")' class='btn'><font color='#000'>Invia</font></a></form><br><hr></td></tr>"
		   }
		   else{
		   
		   $.each(result.obj, function(i,item){

				lista = lista + "<tr><td class='trtabella' width='70%'><table width='90%'><tr><td width='10%'><font size='2' color='#000'>Da:</font></td><td width='90%' align='left'><a href='javascript:riepiemail("+ conto +")' class='collegamento'><b><font size='2' color='#000'>"+ item.fromuser +"</font></b></a></td></tr><tr><td width='10%'><font size='2' color='#000'>R:</font></td><td width='90%' align='left'><a href='javascript:riepiemail("+ conto +")' class='collegamento2'><font size='2' color='#000' class='collegamento2'>"+ item.message +"</font></a></td></tr></table></td><td class='trtabella' width='10%' align='left'> </td><td class='trtabella' width='20%'><a href='javascript:riepiemail("+ conto +")'><img src='img/letter.png' width='20px'></a><td></tr><tr><td class='trtabella2' colspan='3'><hr></td></tr><tr id='babbo"+ conto +"' style='display: none;'><td colspan='2' align='center'><form id='formia"+ conto +"' name='formia"+ conto +"' action='entra.asp' method='post'><input placeholder='Email address' id='email"+ conto +"' type='text' name='email"+ conto +"' size='60' value='"+ item.fromuser +"'><br><textarea rows='4' cols='60' id='messaggio"+ conto +"' name='messaggio"+ conto +"'></textarea><br><a href='javascript:closemessaggio("+ conto +")' class='btn'><font color='#000'>Cancella</font></a><a href='javascript:mandamessaggio("+ conto +")' class='btn'><font color='#000'>Invia</font></a></form><br><hr></td></tr>"
				  
				conto = conto+1

			});
		   
		   }

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
		   
		   $("#Titolotbl").html("My messages");
		   
		   
		   setTimeout (function(){
			 notifiche()
		   }, 1000);
		   
		   
		   
		   },
		   error: function(){
		   $(".spinner").hide();
		   
		   navigator.notification.alert(
										'possible network error 5',  // message
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

function VerificaConnessione() {
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
			   url: "https://staging.storymatch.co/storymatch/userstories/share",
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
			   url:"https://staging.storymatch.co/storymatch/userstories/create",
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
			   url: "https://staging.storymatch.co/storymatch/userstories/create",
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
								 url: "https://staging.storymatch.co/storymatch/notify/sendmessage",
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

								 
								 if(num!=0){
									$("#babbo"+ num +"").hide();
								 }
								 

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
						  
						    if(mail==0){
							  verificatoken(0)
							}

						  }
						  
						  function createmessaggio(mail) {
						  
							$("#babbo0").show();
						  
						  }
						  
						  function closemessaggio0() {
						  
						   $("#babbo0").hide();
						  
						  }




