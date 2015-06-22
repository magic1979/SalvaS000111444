document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
	document.addEventListener("resume", onResume, false);
	var out;
	var out2;
	var Addvariabile="";
	var Rimvariabile="";
	
    $(".spinner").hide();
	
	var IDStep = getParameterByName('id');
	
	
	buildout(IDStep);
	editstory2(IDStep)
	
	$("#salvataggio").attr("href", "javascript:salva("+ IDStep +")");
	$("#indietro").attr("href", "swip4.html?id="+ IDStep +"");
	$("#avanti").attr("href", "advanced.html?id="+ IDStep +"");
}


function buildout(id) {
	
	var outi = 1;
	var conto = 1;
	var ciccio;
	
	var out = "<table width='100%' border='0' cellpadding='0' cellspacing='0'><tr><td class='trtabella2' colspan='4'><br><br></td></tr>";
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"https://www.storymatch.co/storymatch/search/stepsbyid",
		   data: {ID:id, token:localStorage.getItem("Token")},
		   contentType: "application/json; charset=utf-8",
		   json: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   out = out + "<table width='100%' border='0' cellpadding='0' cellspacing='0' style='background-color: #ebd8dc;'><tr><td class='trtabella' width='95%'><table width='90%' border='0'><tr><td width='10%'></td><td width='90%' align='left'><b>"+ result.title +"</b></td></tr><tr><td width='10%'></td><td width='90%' align='left'>"+ localStorage.getItem("pitcho"); +"<br></td></tr><tr><td colspan='2'><hr></td></tr></table></td><td class='trtabella' width='15%' align='center'></td></tr><tr><td class='trtabella2' colspan='5'><hr></td></tr></table>";
		   
		   //$("#titolo").html(result.title);
		   
		  $.each(result.characters, function(i,item){
				 var idOutline = item.detail["outline"]
				 

				 for ( i=0; i < idOutline.length; i++ )
				 {
				  
				  document.getElementById("contaout").value=conto;
				 
				 
				  out = out + "<table width='100%' border='0' cellpadding='0' cellspacing='0' style='background-color: #ebd8dc;'><tr><td class='trtabella' width='95%'><table width='90%' border='0'><tr><td width='10%'></td><td width='90%' align='left'>"+ outi +"</td></tr><tr><td width='10%'></td><td width='90%' align='left'><input id='idLine"+ outi +"' value='"+ idOutline[i]["id"] +"' type='hidden'><textarea name='myTextarea"+ outi +"' id='myTextarea"+ outi +"' rows='4' cols='60' class='textarea1' style='background-color: transparent;'>"+ idOutline[i]["outline"] +"</textarea></td></tr><tr><td width='10%'></td><td width='90%' align='left'><br></td></tr><tr><td width='10%'></td><td width='95%' align='left'><table width='100%' border='0'><tr><td width='15%'><a href='javascript:undor()' rel='external'><div width='52px' class='sinistra'></div></a></td><td width='15%' align='left'><a href='javascript:redor()' rel='external'><div width='52px' class='destra'></div></a></td><td width='70%' align='right'><table id='swippe"+ outi +"' width='50%' border='0'><tr><td align='right' valign='center'><a href='javascript:aggiungi("+ id +","+ outi +")' rel='external'><div width='30px' class='plus'></div></a></td><td align='center' valign='center'><a href='javascript:rimuovi("+ id +","+ outi +")' rel='external'><div width='30px' class='minus'></div></a></td></tr></table><table id='delete"+outi+"' width='50%' height='38px' border='0' style='display: none;'><tr><td align='right' valign='center' colspan='2'><a href='javascript:cancella("+ id +","+ outi +")' rel='external' class='btn'><font color='#000000'>Cancel</font></a></td></tr></table></td><td width='10%'></td></tr></table></td></tr></table></td><td class='trtabella' width='15%' align='center'></td></tr><tr><td class='trtabella2' colspan='5'><hr></td></tr></table>";
				 
				 //<table id='delete"outi"' width='50%' border='1' style='display: none;'><tr><td align='right' valign='center' colspan='2'><a href='javascript:cancella("+ id +","+ outi +")' rel='external'><div width='30px' class='plus'></div></a></td></tr></table>
				 

				  conto = conto+1;
				  outi = outi+1;
				 
				 }
				 
				 //localStorage.setItem("outline", outi);
				 //alert(document.getElementById("contaout").value)
				 
				 //buildjson(id)
				 

			});
		   
		   
		   $(".spinner").hide();
		   $("#contenuto").html(out);
		   
		   //var list = document.getElementById("textarea");
		   //new SwipeOut(list);
		   
		   $("textarea").on("swipeleft",function(){
				var numlist = String(this.id)
				 numlist = numlist.substring(10)
				
				//alert(numlist);
				
				$("#swippe"+ numlist +"").hide();
				$("#delete"+ numlist +"").show();
		   });
		   
		   $("textarea").on("swiperight",function(){
				var numlist = String(this.id)
				 numlist = numlist.substring(10)
							
				//alert(numlist);
							
				$("#swippe"+ numlist +"").show();
				$("#delete"+ numlist +"").hide();
			});
		   
		   },
		   error: function(){
		   $(".spinner").hide();
		   
		   alert("Errore");
		   
		   },
		   dataType:"json"});
	
	
}

function buildjson(id) {
	var conto = 1;
	var stringa = "[";
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"https://www.storymatch.co/storymatch/search/stepsbyid",
		   data: {ID:id, token:localStorage.getItem("Token")},
		   contentType: "application/json; charset=utf-8",
		   json: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result.characters, function(i,item){
				  var idOutline = item.detail["outline"]
				  
				  
				  for ( i=0; i < idOutline.length; i++ )
				  {
				  
				  if (conto==1){
					stringa = stringa + "{%22id%22:"+ idOutline[i]["id"] +",%22outline%22:%22"+ idOutline[i]["outline"] +"%22}";
				  }
				  else{
					stringa = stringa + Addvariabile + ",{%22id%22:"+ idOutline[i]["id"] +",%22outline%22:%22"+ idOutline[i]["outline"] +"%22}" + RimVariabile;
				  }
				 
				  conto = conto+1;
				  
				  }

			});
		   
		   stringa = stringa + "]";
		   alert(stringa);
		   
		   
		   $(".spinner").hide();
		   
		   },
		   error: function(){
		   $(".spinner").hide();
		   
		   alert("Errore");
		   
		   },
		   dataType:"json"});
	
	
}

function aggiungi(id,outo) {
	var outi = outo;
	
	//alert(outi)
	
	Token = localStorage.getItem("Token");
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"https://www.storymatch.co/storymatch/userstories/save/outline",
		   data: {token:Token,storyid:id,outline:outi},
		   contentType: "application/json; charset=utf-8",
		   json: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   if (result.ID==1024){
		   //OK
		   
		   buildout(id)
		   }
		   else{
		   navigator.notification.alert(
										result.msg,  // message
										alertDismissed,         // callback
										'New Outline',            // title
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

function ricalcola(record,outi) {
	record = parseInt(record)
	var aggiunta;
	//alert(record);
	
	for ( i=outi; i < record; i++ )
	{
		alert("text"+ outi +"")
		$("#text"+ outi +"").attr("value", outi);
		outi = outi+1
		
	}
}

function rimuovi(id,outo) {
	
	var outi = outo-1;
	
	//alert(outi)
	
	Token = localStorage.getItem("Token");
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"https://www.storymatch.co/storymatch/userstories/save/outline",
		   data: {token:Token,storyid:id,outline:outi},
		   contentType: "application/json; charset=utf-8",
		   json: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   if (result.ID==1024){
		   //OK
		   buildout(id)
		   }
		   else{
		   navigator.notification.alert(
										result.msg,  // message
										alertDismissed,         // callback
										'New Outline',            // title
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

function cancella(id,outo) {
	
	var outi = outo-1;
	
	//alert(outi)
	
	Token = localStorage.getItem("Token");
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"https://www.storymatch.co/storymatch/userstories/delete/outline",
		   data: {token:Token,storyid:id,outline:outi},
		   contentType: "application/json; charset=utf-8",
		   json: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   if (result.ID==1024){
		   //OK
		   
		   buildout(id)
		   }
		   else{
		   navigator.notification.alert(
										result.msg,  // message
										alertDismissed,         // callback
										'New Outline',            // title
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

function editstory2(id) {
	
	var length = 2,
	element = null;
	var conto = 1;
	var bollicina = "<table width='100%'>"
	
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"https://www.storymatch.co/storymatch/search/stepsbyid",
		   data: {ID:id, token:localStorage.getItem("Token")},
		   contentType: "application/json; charset=utf-8",
		   json: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   bollicina = bollicina = "<tr><td width='10%'></td><td width='100%' align='left'><b>"+ result.title +"</b></td></tr><tr><td colspan='2'><hr></td></tr>"
		   
		   $.each(result.characters, function(i,item){
				  var fruits = item.detail["steps"]
				  
				  
				  for ( i=0; i < fruits.length; i++ )
				  {
				  
				 bollicina = bollicina + "<tr><td width='10%'></td><td width='100%' align='left'>"+ fruits[i]["step"].replace("'","") +"</td></tr><tr><td><hr></td></tr>"
				  
				  //story = story + "<tr><td class='trtabella' width='90%'><table width='100%' border='0'><tr><td width='10%'></td><td width='90%' align='left'><b>"+ conto +"</b></td></tr><tr><td width='10%'></td><td width='90%' align='left'><textarea name='myTextarea"+ conto +"' id='myTextarea"+ conto +"' rows='4' cols='60' class='textarea1' style='background-color: transparent;' >"+ fruits[i]["step"].replace("'","") +"</textarea></td></tr><tr><td width='10%'></td><td width='90%' align='left'><br></td></tr><tr><td width='10%'></td><td width='90%' align='left'><table width='100%'><tr><td width='55px'><a id='sin"+ conto +"' href='#' rel='external'><div width='52px' class='sinistra'></div></a></td><td width='55px'><a id='des"+ conto +"' href='#' rel='external'><div width='52px' class='destra'></div></a></td><td width='55px'><a href='javascript:abilita"+ conto +"()' rel='external'><div width='52px' class='edita'></div></a></td><td width='55px'><a href='javascript:lucchetto("+ conto +")' rel='external'><div id='lock"+ conto +"' width='52px' class='lucchetto'></div></a></td><td width='55px'><a href='javascript:shuffle("+ conto +")' rel='external'><div width='52px' class='infinito'></div></a></td><td width='55px'><a href='javascript:salva("+ fruits[i]["id"] +","+ conto +","+ id +")' rel='external'><div width='52px' class='salva'></div></a></td></tr></table></td></tr></table></td><td class='trtabella' width='15%' align='center'></td></tr><tr><td class='trtabella2' colspan='4'><input type='hidden' id='locco"+ conto +"' name='locco"+ conto +"' value='0'><hr></td></tr>"
				  
				  
				  conto = conto+1;
				  
				  }
				  
				  $(".spinner").hide();
				  bollicina = bollicina + "</table>"
				  
				  $("#bollicina").html(bollicina);
				  
				  
				  });
		   
		   },
		   error: function(){
		   $(".spinner").hide();
		   
		   alert("Errore");
		   
		   },
		   dataType:"json"});
	
	
}


function salva(id) {
	var contasalva = 1;
	var stringa = "["
	var iddOut;
	var OutOutline;
	
	var numout = document.getElementById("contaout").value;
	
	//alert(numout);
	
	for ( i=0; i < numout; i++ )
	{
		if(document.getElementById("idLine"+ contasalva +"").value==0){
		   iddOut = null
		}
		else{
			iddOut = document.getElementById("idLine"+ contasalva +"").value
		}
		
		OutOutline = document.getElementById("myTextarea"+ contasalva +"").value;
		OutOutline.replace(' ','%20');
			
		
		if (contasalva==1){
			stringa = stringa + "{%22id%22:"+ iddOut +",%22outline%22:%22"+ OutOutline +"%22}";
		}
		else{
			stringa = stringa + ",{%22id%22:"+ iddOut +",%22outline%22:%22"+ OutOutline +"%22}";
		}
		
		contasalva = contasalva + 1;
	}
	
	stringa = stringa + "]";
	
	//stringa = "[{%22id%22:44,%22outline%22:%22questa%20e%20la%20modifica%20ok%205%22}]"
	
	//stringa = JSON.stringify(stringa);
	
	//alert(stringa);
	
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"https://www.storymatch.co/storymatch/userstories/update/outlines?outline="+stringa+"",
		   data: {token:localStorage.getItem("Token"),storyid:id},
		   contentType: "application/json; charset=utf-8",
		   json: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   if (result.ID==1024){
		   navigator.notification.alert(
										'Saved Outline',  // message
										alertDismissed,         // callback
										'Outline',            // title
										'OK'                  // buttonName
										);
		   
		   }
		   else{
		   navigator.notification.alert(
										result.ID + "-" + result.msg,  // message
										alertDismissed,         // callback
										'Modifica Outline',            // title
										'OK'                  // buttonName
										);
		   }
		   
		   $(".spinner").hide();
		   buildout(id)
		   
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
	
	//[{%22id%22:181,%22outline%22:%22questa%20e%20la%20modifica%22},{%22id%22:182,%22outline%22:%22questa%20e%20la%20creazione%22},{%22id%22:null,%22outline%22:%22questa%20e%20la%20modifica%20del%20null%22}]
	
}

function myFocusFunction() {
	alert("Entro");
}

function myBlurFunction() {
	alert("Esco");
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

function visbolla() {
	 $("#bolla").fadeIn();
	 $("#visbollicina").attr("href", "javascript:NOvedi()");
}

function NOvedi() {
	$("#bolla").fadeOut()
	$("#visbollicina").attr("href", "javascript:visbolla()");
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

