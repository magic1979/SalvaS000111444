document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
	document.addEventListener("resume", onResume, false);

    $(".spinner").hide();
	var lista;
	
	//listaStory()
	
	var connectionStatus = false;
	connectionStatus = navigator.onLine ? 'online' : 'offline';
	
	if(connectionStatus=='online'){
		//Verifica Token
		
		verificatoken()
	}
	else{
	 // Che Faccio @
	}


}

function listaStory() {
	
	//QUI
	 lista = "<table width='100%' border='0' cellpadding='0' cellspacing='0'>"
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"http://5.249.157.197:9000/storymatch/userstories/list",
		   data: {token:Token},
		   contentType: "application/json; charset=utf-8",
		   json: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		$.each(result, function(i,item){
		   
		   if (result.id!=0){
			   //alert(item.id)
		   
			  lista = lista + "<tr><td class='trtabella' width='20%'><a href='swip4.html?id="+ item.id +"&idPitch=0' rel='external' class='testo'><table width='90%'><tr><td width='10%'></td><td width='90%' align='left'><b><font color='#000'>"+ item.title +"</b><br></font><font size='1' color='#000'>Today 00:00 pm</font></td></tr></table></a></td><td class='trtabella' width='5%' align='center'><a href='swip4.html?id="+ item.id +"&idPitch=0' rel='external' class='testo'><img src='img/Comunity2.png' width='25'></a></td><td class='trtabella' width='65%' align='left'><span id='swippe"+ item.id +"'><table width='80%' height='80px' align='center' border='0'><tr><td width='30%' align='center'><a href='javascript:clonestory("+ item.id +")' class='btn'><font color='#000000'>Duplicate</font></a></td><td width='30%' align='center'><a href='javascript:share("+ item.id +")' class='btn'><font color='#000000'>Share</font></a></td><td width='30%' align='center'><a href='javascript:deletestory("+ item.id +")' class='btn'><font color='#000000'>Trash</font></a></td><td width='10%' align='left'></td></tr></table></span><span id='delete"+ item.id +"'><table width='80%' height='80px' align='center' border='0'><tr><td width='30%' align='center'></td><td width='30%' align='center'></td><td width='10%' align='center'></td><td width='30%' align='left'></td></tr></table></span></td></tr><tr><td class='trtabella2' colspan='3'><hr></td></tr>"
		   
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
										'Possibile errore di rete, riprova tra qualche minuto',  // message
										alertDismissed,         // callback
										'Errore',            // title
										'OK'                  // buttonName
										);
		   
		   },
		   dataType:"json"});
	
}

function alertDismissed() {
	
}

function verificatoken() {
	Token = localStorage.getItem("Token");
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"http://5.249.157.197:9000/storymatch/authentication/validatetoken",
		   data: {token:Token},
		   contentType: "application/json; charset=utf-8",
		   json: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   if (result.ID==1024){
		   //OK
		     listaStory()
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
										'Possibile errore di rete, riprova tra qualche minuto',  // message
										alertDismissed,         // callback
										'Errore',            // title
										'OK'                  // buttonName
										);
		   
		   },
		   dataType:"json"});
	
}

function deletestory(id) {
	Token = localStorage.getItem("Token");
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"http://5.249.157.197:9000/storymatch/userstories/delete",
		   data: {token:Token,storyid:id},
		   contentType: "application/json; charset=utf-8",
		   json: 'callback',
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
										'Possibile errore di rete, riprova tra qualche minuto',  // message
										alertDismissed,         // callback
										'Errore',            // title
										'OK'                  // buttonName
										);
		   
		   },
		   dataType:"json"});

}


function clonestory(id) {
	Token = localStorage.getItem("Token");
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"http://5.249.157.197:9000/storymatch/userstories/clone",
		   data: {token:Token,storyid:id},
		   contentType: "application/json; charset=utf-8",
		   json: 'callback',
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
										'Possibile errore di rete, riprova tra qualche minuto',  // message
										alertDismissed,         // callback
										'Errore',            // title
										'OK'                  // buttonName
										);
		   
		   },
		   dataType:"json"});

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

function share() {
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
		
		
		navigator.notification.alert(
		'succesfull',  // message
		 alertDismissed,         // callback
		 'Story Share OK',            // title
		 'OK'                  // buttonName
		 );
		return;

		
		
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
		
		$(".spinner").show();
		$.ajax({
			   type:"GET",
			   url:"http://5.249.157.197:9000/storymatch/userstories/create",
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
											'Possibile errore di rete, riprova tra qualche minuto',  // message
											alertDismissed,         // callback
											'Errore',            // title
											'OK'                  // buttonName
											);
			   
			   },
			   dataType:"json"});
		
	}
	
}
