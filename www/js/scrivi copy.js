document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
	document.addEventListener("resume", onResume, false);
	
	cordova.plugins.Keyboard.disableScroll(true);

	var IDPage = getParameterByName('id');
	
	
	/*if(window.devicePixelRatio !== undefined) {
		dpr = window.devicePixelRatio;
	} else {
		dpr = 1;
	}
	
	var screen_width = window.screen.width * dpr;
	var screen_height = window.screen.height * dpr;*/
	
	//alert(screen_height)
	
	
	//alert(IDPage)

	$("#indietro").attr("href", "swip5.html?id="+ IDPage +"");
	//$("#salvataggio").attr("href", "javascript:scrivi("+ IDPage +")");
	//$("#pdf").attr("href", "javascript:costruzione()");


	if(connectionStatus=='online'){
		//alert()
		//Verifica Token
		//verificatoken(IDPage)
		//$(".spinner").hide();

	}
	else{
	 // Che Faccio
	}
}


function leggi(id) {
	var outi = 1;
	var conto = 1;
	var ciccio;
	
	var out = " ";
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"https://www.storymatch.co/storymatch/search/stepsbyid",
		   data: {ID:id, token:localStorage.getItem("Token")},
		   contentType: "application/json; charset=utf-8",
		   json: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $("#tito").html(result.title);
		   
		   $.each(result.characters, function(i,item){
				  var script = item.detail["script"]
				  
				  //alert(script)
				  
				  if((script=="")||(!script)){
					//alert("Null")
					leggioutline(id)
				  }
				  
				  out = script;
				  
				  /*for ( i=0; i < idOutline.length; i++ )
				  {
				  
				  out = out + "<table width='100%' border='0' cellpadding='0' cellspacing='0' style='background-color: #ebd8dc;'><tr><td class='trtabella' width='95%'><table width='90%' border='0'><tr><td width='10%'></td><td width='90%' align='left'>"+ outi +"</td></tr><tr><td width='10%'></td><td width='90%' align='left'><input id='idLine"+ outi +"' value='"+ idOutline[i]["id"] +"' type='hidden'><textarea name='myTextarea"+ outi +"' id='myTextarea"+ outi +"' rows='4' cols='60' class='textarea1' style='background-color: transparent;'>"+ idOutline[i]["outline"] +"</textarea></td></tr><tr><td width='10%'></td><td width='90%' align='left'><br></td></tr><tr><td width='10%'></td><td width='95%' align='left'><table width='100%' border='0'><tr><td width='15%'><a href='javascript:undor()' rel='external'><div width='52px' class='sinistra'></div></a></td><td width='15%' align='left'><a href='javascript:redor()' rel='external'><div width='52px' class='destra'></div></a></td><td width='70%' align='right'><table id='swippe"+ outi +"' width='50%' border='1'><tr><td align='right' valign='center'><a href='javascript:aggiungi("+ id +","+ outi +")' rel='external'><div width='30px' class='plus'></div></a></td><td align='center' valign='center'><a href='javascript:cancella("+ id +","+ outi +")' rel='external'><div width='30px' class='minus'></div></a></td></tr></table><table id='delete"+outi+"' width='50%' height='38px' border='1' style='display: none;'><tr><td align='right' valign='center' colspan='2'><a href='javascript:cancella("+ id +","+ outi +")' rel='external' class='btn'><font color='#000000'>Cancel</font></a></td></tr></table></td><td width='10%'></td></tr></table></td></tr></table></td><td class='trtabella' width='15%' align='center'></td></tr><tr><td class='trtabella2' colspan='5'><hr></td></tr></table>";
				  
				  }*/
				  
				  
				  
				  });
		   
		   
		   $(".spinner").hide();
		   
		   out = out.replace(/<dialolg>/g,"<ul>").replace(/<\/dialog>/g,"</ul>");
		   out = out.replace(/<character>/g,"<s>").replace(/<\/character>/g,"</s>");
		   out = out.replace(/<parenth>/g,"<ol>").replace(/<\/parenth>/g,"</ol>");
		   
		   //alert(out)
		   
		   advancedEditor.setHTML(out);
		   
		   },
		   error: function(){
		   $(".spinner").hide();
		   
		   //alert("Errore Caricamento leggi");
		   
		   },
		   dataType:"json"});

}


function scrivi(id) {
	var html = advancedEditor.getHTML();
	var righe;
	html = html.replace(/<ul>/g,"<dialolg>").replace(/<\/ul>/g,"</dialog>");
	html = html.replace(/<s>/g,"<character>").replace(/<\/s>/g,"</character>");
	html = html.replace(/<ol>/g,"<parenth>").replace(/<\/ol>/g,"</parenth>");
	
	//alert(html);
	
	//dividi
	//righe = html.split(/<\/div>/);
	//alert(parseInt((righe.length+0.5)/2));
	
	Token = localStorage.getItem("Token");
	
	$(".spinner").show();
	$.ajax({
		   url: "https://www.storymatch.co/storymatch/userstories/update/script",
		   dataType: "json",
		   type: "post",
		   contentType: "application/json",
		   data: JSON.stringify( { "storyid": ""+ id +"","script":""+ html +""} ),
		   processData: false,
		   crossDomain: true,
		   success:function(result){
		   
		   if (result.ID==1024){
		   //OK
		   navigator.notification.alert(
										'Saved Script',  // message
										alertDismissed,         // callback
										'Script',            // title
										'OK'                  // buttonName
										);
		   
		   }
		   else{
		   navigator.notification.alert(
										result.msg,  // message
										alertDismissed,         // callback
										'Save Script',            // title
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


function creapdf(id) {
	var html = advancedEditor.getHTML();
	html = html.replace(/<ul>/g,"<dialolg>").replace(/<\/ul>/g,"</dialog>");
	html = html.replace(/<s>/g,"<character>").replace(/<\/s>/g,"</character>");
	html = html.replace(/<ol>/g,"<parenth>").replace(/<\/ol>/g,"</parenth>");
	
	//alert(html);
	
	Token = localStorage.getItem("Token");
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"https://www.storymatch.co/storymatch/userstories/createpdf",
		   data: {token:Token,storyid:id,script:html},
		   contentType: "application/json; charset=utf-8",
		   json: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   if (result.ID==1024){
		   //OK
		   navigator.notification.alert(
										'ok',  // message
										alertDismissed,         // callback
										'PDF',            // title
										'OK'                  // buttonName
										);
		   
		   }
		   else{
		   navigator.notification.alert(
										result.msg,  // message
										alertDismissed,         // callback
										'PDF',            // title
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



function costruzione() {
	navigator.notification.alert(
								 'Under Construction',  // message
								 alertDismissed,         // callback
								 'Stop',            // title
								 'OK'                  // buttonName
								 );
}


function leggioutline(id) {
	var outi = 1;
	var conto = 1;
	var ciccio;
	
	var out = "";
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"https://www.storymatch.co/storymatch/search/stepsbyid",
		   data: {ID:id, token:localStorage.getItem("Token")},
		   contentType: "application/json; charset=utf-8",
		   json: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   //$("#titolo").html(result.title);
		   
		   $.each(result.characters, function(i,item){
				  var idOutline = item.detail["outline"]
				  
				  
				  for ( i=0; i < idOutline.length; i++ )
				   {
				   
					 out = out + " " + idOutline[i]["outline"] + "<br><br>";
				   
				   }
				  
				  
				  });
		   
		   
		   $(".spinner").hide();
		   
		   
		   advancedEditor.setHTML(out);
		   
		   },
		   error: function(){
		   $(".spinner").hide();
		   
		   //alert("Errore Leggi Outline");
		   
		   },
		   dataType:"json"});
	
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



function undor() {
	
	document.execCommand('undo', false, null);
	
}

function redor() {
	
	document.execCommand('redo', false, null);
	
}

function cancella() {
	
	document.execCommand('removeFormat');
	
	$("#act").click();
	
}

function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
						  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
						  results = regex.exec(location.search);
						  return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
						  }
						  
						  function undor() {
						  
						  document.execCommand('undo', false, null);
						  
						  }
						  
						  function redor() {
						  
						  document.execCommand('redo', false, null);
						  
						  }
						  
						  
						  function verificatoken(IDPage) {
						  Token = localStorage.getItem("Token");
						  
						  $(".spinner").show();
						  $.ajax({
								 type:"GET",
								 url:"https://www.storymatch.co/storymatch/authentication/validatetoken",
								 data: {token:Token},
								 contentType: "application/json; charset=utf-8",
								 json: 'callback',
								 crossDomain: true,
								 success:function(result){
								 
								 if (result.ID==1024){
								 //OK
								 leggi(IDPage);
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
								 window.location.href = "index.html";
								 
								 },
								 dataType:"json"});
						  
						  }
						  
						  function exitapp() {
						  window.location.href = "index.html";
						  }

