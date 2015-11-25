document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
	
	//document.addEventListener("resume", onResume, false);
	
	
	$.fn.extend({
				donetyping: function(callback,timeout){
				timeout = timeout || 1e3; // 1 second default timeout
				var timeoutReference,
				doneTyping = function(el){
				if (!timeoutReference) return;
				timeoutReference = null;
				callback.call(el);
				};
				return this.each(function(i,el){
								 var $el = $(el);
								 
								 $el.is(':input') && $el.on('keyup keypress',function(e){
															
															if (e.type=='keyup' && e.keyCode!=8) return;
															
															if (timeoutReference) clearTimeout(timeoutReference);
															timeoutReference = setTimeout(function(){
																						  
															doneTyping(el);
															}, timeout);
															}).on('blur',function(){
																  doneTyping(el);
																  });
								 });
				}
    });
	
	
    $(".spinner").hide();
	
	var IDPage = getParameterByName('IDPage');
	var IDPagina = localStorage.setItem("IDPage", IDPage);
	
	var IDRated = getParameterByName('IDRated');
	var PrevGenere = getParameterByName('MyGenere');
	

	var connectionStatus = false;
	connectionStatus = navigator.onLine ? 'online' : 'offline';
	
	if(connectionStatus=='online'){
	
	verificatoken()
	
		if(IDRated==1) {
			listarated(IDPage,1,"All")
		}
		else if(IDRated==2){
			preferiti(IDPage,1,"All")
		}
		else{
			if (PrevGenere === null || typeof(PrevGenere) == 'undefined' || PrevGenere=="") {
				listapitch(IDPage,1,"All")
			}
			else{
				listapitch(IDPage,1,PrevGenere)
			}
		}

	//$("#indietro").attr("href", "swip4.html?id="+ IDPage +"");
	
	$(document).on("click touchstart", "#indietro", function(e){
		e.preventDefault();
		window.location.href = "swip4.html?id="+ IDPage +"&idPitch=0";
	});
	
	localStorage.setItem("Preferred", 0);

	}
	else{
		navigator.notification.alert(
										'possible network error',  // message
									     alertDismissed,         // callback
										'Error',            // title
										'OK'                  // buttonName
										);
	}

	
	var pagine;
	var conta;
	var conta1;
	var conta2;
	var conta3;
	var goop;
	var gopagina;
		
	
}


function listapitch(IDPage,page,genere) {
	
	var generiLista="";
	
	if(parseInt(page)==1)
	{
		conta = 1
	}
	else if(parseInt(page)==2)
	{
		conta = 6
	}
	else{
		conta = parseInt(page)-1
		
		conta = parseInt(conta)*5
		
		conta = parseInt(conta)+1
	}
	

	if (genere==1){
		genere="All"
	}
	
	if (genere=="All"){
	 var generi = "<option value='"+ genere +"' selected=true>All Genres</option>";
		 var primo = "<option value='1' selected=true>All Pitches</option><option value='2'>Preferred</option>";
    }
	else{
		var generi = "<option value='"+ genere +"' selected=true>"+ genere +"</option>";
		var primo = "<option value='0' selected=true>All Pitches</option><option value='1'>Back</option><option value='2'>Preferred</option>";
	}
	
	/*navigator.notification.alert(
								 IDPage+", Genere: "+genere,  // message
								 alertDismissed,         // callback
								 genere,            // title
								 'OK'                  // buttonName
								 );*/
	
	localStorage.setItem("Pagina", page);
	localStorage.setItem("Genere", genere);
	localStorage.setItem("Preferred", 0);

	
	if (page==1){
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"https://dev.storymatch/storymatch/search/genrelist",
		   data: {token:localStorage.getItem("Token")},
		   contentType: "application/json; charset=utf-8",
		   json: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){

			generi = generi + "<option value='"+ item.name +"'>"+ item.name +"</option>"

			});
		   
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
		   
		   window.location.href = "swip.html";
		   
		   },
		   dataType:"json"});
	}
	
	
	gopagina = parseInt(page)-1
	

	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"https://dev.storymatch/storymatch/search/stepsbygenres",
		   data: {token:localStorage.getItem("Token"),genre:genere,page:gopagina,pagesize:"5"},
		   contentType: "application/json; charset=utf-8",
		   json: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   var lista="";
		   
		  if (page==1){
		     lista = lista + "<table width='100%' border='0' cellpadding='0' cellspacing='0'><tr><td class='trtabella' width='70%'><table width='90%'><tr><td width='10%'></td><td width='90%' align='left'><font size='4'>Need some inspirations?<br>Trey with thrse ideas or start from scatch</font></td></tr></table></td><td class='trtabella' width='5%' align='center'></td><td class='trtabella' width='10%' align='left'><a href='javascript:showmessagge()' rel='external'><div width='52px' class='idea'></div></a></td><td class='trtabella' width='15%' align='center'></td></tr><tr><td class='trtabella2' colspan='4'><hr></td></tr><tr id='ricerca' style='display: none;'><td class='trtabella2' colspan='4' align='center'><table border='0'><tr><td><input type='text' id='example' size='70' placeholder='Write...'/></td></tr><tr><td><table width='100%' id='example-output' align='center'><tr><td></td><td></td></tr></table></td></tr></table></td></tr><tr><td class='trtabella3' colspan='4' align='center'><table width='100%' align='center'><tr><td align='center'> <select id='tutti' class='btn'>"+ primo +"</select></td><td align='center'><div id='select'><select id='mySelect' name='mySelect' class='btn'>"+ generi +"</select></div></td><td align='center'><a id='migliori' href='swip3.html?IDPage="+ IDPage +"&IDRated=1' rel='external' class='btn'><font color='#000000'>Best Rated</font></a></td></tr></table></td></tr><tr><td class='trtabella2' colspan='4'><hr></td></tr>"
		   }
		   else{
		     lista = lista + "<table width='100%' border='0' cellpadding='0' cellspacing='0'><tr><td class='trtabella2' colspan='4'></td></tr><tr><td class='trtabella2' colspan='4'><br></td></tr>"
		   }
		   
		   //alert(result.ID);
		   //$("#titolo").html(result.title);
		   
		   $.each(result.obj, function(i,item){
				  var fruits = item.genres
				  
				  //alert(fruits.length)
				  if(item.name==""){
					return;
				  }
				  
				  for ( i=0; i < fruits.length; i++ )
				  {
				  if (i==0){
					generiLista = generiLista + fruits[i]["name"] + ", "
				  }
				  else{
					generiLista = generiLista + ", " + fruits[i]["name"]
				  }
				  }
				  
				  generiLista = generiLista.replace(", ,",", ")
				  
				  lista = lista + "<tr><td class='trtabella' colspan='4' align='left'><table width='90%'><tr><td width='10%'></td><td width='90%' align='left'><font size='3'><b>"+ item.title +" - "+ item.name +"</b>&nbsp;("+ item.year +")<br>"+ item.pitch.replace("'","") +".</font></td></tr><tr><td width='10%'></td><td width='90%' align='left'><font size='3'><b><br>"+ generiLista +"</b></font></td></tr></table></td></tr><tr><td class='trtabella' width='70%'><table width='90%' border='0'><tr><td width='10%'></td><td align='center'><a href='javascript:AddPreferiti("+ IDPage +","+ item.storyid +",1)'><img src='img/Ratio.png' width='16'></a></td><td width='170' align='left'><input id='numrati"+ conta +"' type='hidden' value='"+ item.storyid +"'><input id='ratirati"+ conta +"' type='hidden' value='"+ item.rating +"'><div id='rati"+ item.storyid +"'></div></td><td align='left'>("+ item.voters +")</td></tr></table></td><td class='trtabella' width='5%' align='right'>Edit &nbsp;</td><td class='trtabella' width='10%' align='left'><a href='javascript:confirmLogout("+ IDPage +","+ item.storyid +")' rel='external'><div width='52px' class='edita'></div></a></td><td class='trtabella' width='15%' align='center'></td></tr>"
				 

				  /*if(conto==1){
				  story = story + "<tr><td width='10%'></td><td width='90%' align='left'>"+ item.detail["pitch"].replace("'","") +"</td></tr></table></td><td class='trtabella' width='15%' align='center'></td></tr><tr><td class='trtabella2' colspan='4'><hr></td></tr> <tr><td class='trtabella2' colspan='4'><br><br></td></tr>"
				  }
				  
				  //$("#piccio").html(item.detail["pitch"].replace("'",""));
				  
				  //alert(fruits[0]["id"]);
				  
				  for ( i=0; i < fruits.length; i++ )
				  {
				  
				  
				  if((conto==1)||(conto==2)){
				  
				  story = story + "<tr><td class='trtabella' width='90%'><table width='100%' border='0'><tr><td width='10%'></td><td width='90%' align='left'><b>"+ conto +"</b></td></tr><tr><td width='10%'></td><td width='90%' align='left'><textarea name='myTextarea"+ conto +"' id='myTextarea"+ conto +"' rows='4' cols='60' class='textarea1' style='background-color: transparent;' >"+ fruits[i]["id"] +","+ fruits[i]["step"].replace("'","") +"</textarea></td></tr><tr><td width='10%'></td><td width='90%' align='left'><br></td></tr><tr><td width='10%'></td><td width='90%' align='left'><table width='100%'><tr><td width='55px'><a id='sin"+ conto +"' href='#' rel='external'><div width='52px' class='sinistra'></div></a></td><td width='55px'><a id='des"+ conto +"' href='#' rel='external'><div width='52px' class='destra'></div></a></td><td width='55px'><a href='javascript:abilita"+ conto +"()' rel='external'><div width='52px' class='edita'></div></a></td><td width='55px'><a href='#' rel='external'><div width='52px' class='lucchetto'></div></a></td><td width='55px'><a href='#' rel='external'><div width='52px' class='infinito'></div></a></td><td width='55px'><a href='javascript:salva("+ fruits[i]["id"] +","+ conto +")' rel='external'><div width='52px' class='salva'></div></a></td></tr></table></td></tr></table></td><td class='trtabella' width='15%' align='center'></td></tr><tr><td class='trtabella2' colspan='4'><hr></td></tr>"
				  }
				  
				  conto = conto+1;
				  
				  }*/
				  
				  
				  //$("#rati"+ item.storyid +"").html("<img src='img/CuoreVuoto.png' width='20'> <img src='img/CuoreVuoto.png' width='20'> <img src='img/CuoreVuoto.png' width='20'> <img src='img/CuoreVuoto.png' width='20'> <img src='img/CuoreVuoto.png' width='20'>");
				
				  pagine = parseInt(item.pagecount);
				
				  conta = conta +1;
				  
				  
			});
		   
		   lista = lista + "</table><br><br>"

		   if (page==1){
			$("#contenuto").html(lista);
		   }
		   else
		   {
			$("#contenuto").append(lista);
		   }

		    $(".spinner").hide();
		   
		   
		   //alert(pagine)
		   var stringa = "<font size='4' color='#000'>Your current page: " + page + "/" + pagine + "</font>&nbsp;&nbsp;&nbsp;";
		   
		   /*for ( i=1; i < pagine; i++ )
		   {

		       stringa = stringa + " | " + "<a href='javascript:listapitch("+ IDPage +","+ i +",1)'><font size='5' color='#000'>"+ i +"</font></a>"

		   }*/
		   
		   $("#selector").html("&nbsp;&nbsp;"+stringa);
		   
		   
		   for ( k=1; k < conta; k++ )
		   {
		   
		     //$('#rati'+document.getElementById("numrati"+ k +"").value).raty({ score: 3 });

			 $('#rati'+document.getElementById("numrati"+ k +"").value).raty({
				score: document.getElementById("ratirati"+ k +"").value ,click: function(score, evt) {

				//alert(conta + ' ID: ' + this.id.slice(4) + "\nscore: " + score + "\nevent: " + evt);
																			 
																			 $(".spinner").show();
																			 $.ajax({
																					url: "https://dev.storymatch/storymatch/search/rate",
																					dataType: "json",
																					type: "post",
																					contentType: "application/json",
																					data: JSON.stringify( {rating:score,"storyid": ""+ this.id.slice(4) +""} ),
																					processData: false,
																					crossDomain: true,
																					success:function(result){
																					
																					if (result.ID==1024){
																					navigator.notification.alert(
																												 result.msg,  // message
																												 alertDismissed,         // callback
																												 'Prefiriti',            // title
																												 'OK'                  // buttonName
																												 );

																					
																					}
																					else{
																					navigator.notification.alert(
																												 result.msg,  // message
																												 alertDismissed,         // callback
																												 'Prefiriti',            // title
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
			  });
		   
		     //$('#rati'+document.getElementById("numrati"+ k +"").value).raty({ score: 3 });

		   }

		   $("#mySelect").on("change", function(){
							   
				//listapitch(IDPage,1,this.value);
							 
				window.location.href = "swip3.html?IDPage="+ IDPage +"&MyGenere="+ this.value +"&IDRated=0";
				return false;

			});
		   
		   $("#tutti").on("change", function(){
						 /* navigator.notification.alert(
													   this.value,  // message
													   alertDismissed,         // callback
													   'Qui',            // title
													   'OK'                  // buttonName
													   );*/
						  if(this.value==2){
							//preferiti(IDPage,1,1)
							window.location.href = "swip3.html?IDPage="+ IDPage +"&IDRated=2";
						  }
						  else{
							//listapitch(IDPage,page,1);
							window.location.href = "swip3.html?IDRated=0&IDPage="+IDPage;
						  }
						  
				
				//listapitch(IDPage,page,1);
				//href='javascript:listapitch("+ IDPage +","+ page +",1)'
							 
				//return false;
							 
			});
		   

		   //myScroll = new IScroll('#wrapper', { click: true });
		   localStorage.setItem("NPagine", pagine);

			setTimeout (function(){
				myScroll.refresh();
				myScroll.on('scrollEnd', updatePosition);
			}, 500);
		   
		   
		   if (genere=="All"){
		   $("#tutti").removeClass("btn").addClass("btn2");
		   $("#migliori").removeClass("btn2").addClass("btn");
		   $("#mySelect").removeClass("btn2").addClass("btn");
		   }
		   else
		   {
		   $("#tutti").removeClass("btn2").addClass("btn");
		   $("#migliori").removeClass("btn2").addClass("btn");
		   $("#mySelect").removeClass("btn").addClass("btn2");
		   }
 
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

function mandamessaggio(testo) {
	//$("#example-output").html("<tr><td>"+ testo +"</td></tr>");
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"https://dev.storymatch/storymatch/search/fts",
		   data: {q:testo},
		   contentType: "application/json; charset=utf-8",
		   json: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   var risultato="";
		   
		   $.each(result, function(i,item){

				  risultato = risultato + "<tr><td width='70%' align='left'><b>"+ item.storyName +"</b> - "+ item.characterName +" ("+ item.storyYear +")<br>"+ item.genres +"</td><td width='10%' align='right'>Edit</td><td width='20%' align='left'> <a href='javascript:confirmLogout("+  localStorage.getItem("IDPage") +","+ item.storyId +")' rel='external'><div width='25px' class='edita'></div></a></td></tr><tr><td colspan='3'><hr></td></tr>";
			});
		   
		   $(".spinner").hide();
		   $("#example-output").html(risultato);
		   
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


function updatePosition() {
	var pag = localStorage.getItem("IDPage");
	var pagina = localStorage.getItem("Pagina");
	var NPagine = localStorage.getItem("NPagine");
	var generee = localStorage.getItem("Genere");
	var preferred = localStorage.getItem("Preferred");
	//goop=1;
	
	//alert(pagina + "--" + NPagine)
	
	if(parseInt(pagina) < parseInt(NPagine)){
	
	if(preferred==0){
		var pagina = parseInt(pagina)+1

	if(Math.abs(this.maxScrollY) - Math.abs(this.y) < 1)
	{
		//alert(generee + " - " + pagina)
		
			setTimeout (function(){
				listapitch(pag,pagina,generee)
			}, 200);
		
		e.stopImmediatePropagation();
		e.preventDefault();
		return false;
		}
	}
		
	}
	else{
	 return;
	}
	
}

function updateRating() {
	var pag = localStorage.getItem("IDPage");
	var pagina = localStorage.getItem("Pagina");
	var NPagine = localStorage.getItem("NPagine");
	var generee = localStorage.getItem("Genere");
	var preferred = localStorage.getItem("Preferred");
	//goop=1;
	
	//alert(pagina + "--" + NPagine)
	
	if(parseInt(pagina) < parseInt(NPagine)){
		
		if(preferred==0){
			var pagina = parseInt(pagina)+1
			
			if(Math.abs(this.maxScrollY) - Math.abs(this.y) < 1)
			{
				//alert(generee + " - " + pagina)
				
				setTimeout (function(){
							listarated(pag,pagina,generee)
							}, 200);
				
				e.stopImmediatePropagation();
				e.preventDefault();
				return false;
			}
		}
		
	}
	else{
	 return;
	}
	
}

function updatePref() {
	var pag = localStorage.getItem("IDPage");
	var pagina = localStorage.getItem("Pagina");
	var NPagine = localStorage.getItem("NPagine");
	var generee = localStorage.getItem("Genere");
	var preferred = localStorage.getItem("Preferred");
	//goop=1;
	
	//alert(pagina + "--" + NPagine)
	
	if(parseInt(pagina) < parseInt(NPagine)){
		
		if(preferred==0){
			var pagina = parseInt(pagina)+1
			
			if(Math.abs(this.maxScrollY) - Math.abs(this.y) < 1)
			{
				//alert(generee + " - " + pagina)
				
				setTimeout (function(){
					preferiti(pag,pagina,generee)
				}, 200);
				
				e.stopImmediatePropagation();
				e.preventDefault();
				return false;
			}
		}
		
	}
	else{
	 return;
	}
	
}


function listapitch2(IDPage,page,genere) {

	$("#appendi").append("lista2");
	
}




function showmessagge() {
	$("#ricerca").show();			 
	var typingTimer;                
	var doneTypingInterval = 500;
	
	$(document).on('keyup', '#example', function() {
			clearTimeout(typingTimer);
			if ($('#example').val) {
				typingTimer = setTimeout(function(){
					//do stuff here e.g ajax call etc....
					
					 var v = $("#example").val();
					 mandamessaggio(v);
					 
					 //$("#example-output").html(v);
				}, doneTypingInterval);
			}

	});

	
}

function AddPreferiti(IDPage,IdStoria,genere) {
	
	$(".spinner").show();
	$.ajax({
		   url: "https://dev.storymatch/storymatch/search/bookmark",
		   dataType: "json",
		   type: "post",
		   contentType: "application/json",
		   data: JSON.stringify( { "storyid": ""+ IdStoria +"" } ),
		   processData: false,
		   crossDomain: true,
		   success:function(result){
		   
		   if (result.ID==1024){
		   navigator.notification.alert(
										result.msg,  // message
										alertDismissed,         // callback
										'Prefiriti',            // title
										'OK'                  // buttonName
										);
		   
		   
		   preferiti(IDPage,IdStoria,1)
		   
		   }
		   else{
		   navigator.notification.alert(
										result.msg,  // message
										alertDismissed,         // callback
										'Prefiriti',            // title
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


function confirmLogout(id,idpitch) {
	localStorage.setItem("id3", id);
	localStorage.setItem("idpitch3", idpitch);
	
	navigator.notification.confirm(
								   'You want save your story and work on this?',  // message
								   onConfirm,              // callback to invoke with index of button pressed
								   'Confirm',            // title
								   'Accept,No'      // buttonLabels
								   );
	
	
}

function onConfirm(button) {
	
	if (button==1){
		
		clonestory()

	}
}


function alertDismissed() {
	
}

function LogOut() {
	localStorage.setItem("email", 0);
	localStorage.setItem("Token", "");
	//alert("out");
	
	window.location.href = "index.html";
}

function rati() {
	$('#rati1').raty({ score: 3 });
}

function onResume() {
	onDeviceReady();
}

function alertDismissed() {
	
}

function clonestory() {
	Token = localStorage.getItem("Token");
	//alert(localStorage.getItem("IDPage"))
	
	$(".spinner").show();
	$.ajax({
		   url: "https://dev.storymatch/storymatch/userstories/clone",
		   dataType: "json",
		   type: "post",
		   contentType: "application/json",
		   data: JSON.stringify( { "token": ""+ localStorage.getItem("Token") +"", "storyid":""+ localStorage.getItem("IDPage") +""} ),
		   processData: false,
		   crossDomain: true,
		   success:function(result){
		   
		   if (result.ID==1024){
		   
			window.location.href = "swip4.html?id="+ localStorage.getItem("id3") +"&idPitch="+ localStorage.getItem("idpitch3") +"";
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


function listarated(IDPage,page,genere) {
	
	var generiLista="";
	
	if(parseInt(page)==1)
	{
		conta = 1
	}
	else if(parseInt(page)==2)
	{
		conta = 6
	}
	else{
		conta = parseInt(page)-1
		
		conta = parseInt(conta)*5
		
		conta = parseInt(conta)+1
	}
	
	
	if (genere==1){
		genere="All"
	}
	
	if (genere=="All"){
	 var generi = "<option value='"+ genere +"' selected=true>All Genres</option>";
		var primo = "<option value='0' selected=true>All Pitches</option><option value='1'>Back</option><option value='2'>Preferred</option>";
	}
	else{
		var generi = "<option value='"+ genere +"' selected=true>"+ genere +"</option>";
		var primo = "<option value='0' selected=true>All Pitches</option><option value='1'>Back</option><option value='2'>Preferred</option>";
	}
	
	localStorage.setItem("Pagina", page);
	localStorage.setItem("Genere", genere);
	localStorage.setItem("Preferred", 0);
	
	
	if (page==1){
		$(".spinner").show();
		$.ajax({
			   type:"GET",
			   url:"https://dev.storymatch/storymatch/search/genrelist",
			   data: {token:localStorage.getItem("Token")},
			   contentType: "application/json; charset=utf-8",
			   json: 'callback',
			   crossDomain: true,
			   success:function(result){
			   
			   $.each(result, function(i,item){
					  
					  generi = generi + "<option value='"+ item.name +"'>"+ item.name +"</option>"
					  
					  });
			   
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
			   
			   window.location.href = "swip.html";
			   
			   },
			   dataType:"json"});
	}
	
	
	gopagina = parseInt(page)-1
	
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"https://dev.storymatch/storymatch/search/stepshigrated",
		   data: {token:localStorage.getItem("Token"),genre:genere,page:gopagina,pagesize:"5"},
		   contentType: "application/json; charset=utf-8",
		   json: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   var lista="";
		   
		   if (page==1){
		   lista = lista + "<table width='100%' border='0' cellpadding='0' cellspacing='0'><tr><td class='trtabella' width='70%'><table width='90%'><tr><td width='10%'></td><td width='90%' align='left'><font size='4'>Need some inspirations?<br>Trey with thrse ideas or start from scatch</font></td></tr></table></td><td class='trtabella' width='5%' align='center'></td><td class='trtabella' width='10%' align='left'><a href='javascript:showmessagge()' rel='external'><div width='52px' class='idea'></div></a></td><td class='trtabella' width='15%' align='center'></td></tr><tr><td class='trtabella2' colspan='4'><hr></td></tr><tr id='ricerca' style='display: none;'><td class='trtabella2' colspan='4' align='center'><table border='0'><tr><td><input type='text' id='example' size='70' placeholder='Write...'/></td></tr><tr><td><table width='100%' id='example-output' align='center'><tr><td></td><td></td></tr></table></td></tr></table></td></tr><tr><td class='trtabella3' colspan='4' align='center'><table width='100%' align='center'><tr><td align='center'> <select id='tutti' class='btn'>"+ primo +"</select></td><td align='center'><div id='select'><select id='mySelect' name='mySelect' class='btn'>"+ generi +"</select></div></td><td align='center'><a id='migliori' href='#' class='btn'><font color='#000000'>Best Rated</font></a></td></tr></table></td></tr><tr><td class='trtabella2' colspan='4'><hr></td></tr>"
		   }
		   else{
		   lista = lista + "<table width='100%' border='0' cellpadding='0' cellspacing='0'><tr><td class='trtabella2' colspan='4'></td></tr><tr><td class='trtabella2' colspan='4'><br></td></tr>"
		   }
		   
		   
		   $.each(result.obj, function(i,item){
				  var fruits = item.genres
				  
				  if(item.name==""){
				  return;
				  }
				  
				  for ( i=0; i < fruits.length; i++ )
				  {
				  if (i==0){
				  generiLista = generiLista + fruits[i]["name"] + ", "
				  }
				  else{
				  generiLista = generiLista + ", " + fruits[i]["name"]
				  }
				  }
				  
				  generiLista = generiLista.replace(", ,",", ")
				  
				  lista = lista + "<tr><td class='trtabella' colspan='4' align='left'><table width='90%'><tr><td width='10%'></td><td width='90%' align='left'><font size='3'><b>"+ item.title +" - "+ item.name +"</b>&nbsp;("+ item.year +")<br>"+ item.pitch.replace("'","") +".</font></td></tr><tr><td width='10%'></td><td width='90%' align='left'><font size='3'><b><br>"+ generiLista +"</b></font></td></tr></table></td></tr><tr><td class='trtabella' width='70%'><table width='90%' border='0'><tr><td width='10%'></td><td align='center'><a href='javascript:AddPreferiti("+ IDPage +","+ item.storyid +",1)'><img src='img/Ratio.png' width='16'></a></td><td width='170' align='left'><input id='numrati"+ conta +"' type='hidden' value='"+ item.storyid +"'><input id='ratirati"+ conta +"' type='hidden' value='"+ item.rating +"'><div id='rati"+ item.storyid +"'></div></td><td align='left'>("+ item.voters +")</td></tr></table></td><td class='trtabella' width='5%' align='right'>Edit &nbsp;</td><td class='trtabella' width='10%' align='left'><a href='javascript:confirmLogout("+ IDPage +","+ item.storyid +")' rel='external'><div width='52px' class='edita'></div></a></td><td class='trtabella' width='15%' align='center'></td></tr>"
				  
				  
				  //alert(item.rating)
				  
				  pagine = parseInt(item.pagecount);
				  
				  conta = conta +1;
				  
				  
				  });
		   
		   lista = lista + "</table><br><br>"
		   
		   if (page==1){
		   $("#contenuto").html(lista);
		   }
		   else
		   {
		   $("#contenuto").append(lista);
		   }
		   
		   $(".spinner").hide();

		   var stringa = "<font size='4' color='#000'>Your current page: " + page + "/" + pagine + "</font>&nbsp;&nbsp;&nbsp;";
		   
		   /*for ( i=1; i < pagine; i++ )
			{
			
			stringa = stringa + " | " + "<a href='javascript:listapitch("+ IDPage +","+ i +",1)'><font size='5' color='#000'>"+ i +"</font></a>"
			
			}*/
		   
		   $("#selector").html("&nbsp;&nbsp;"+stringa);
		   
		   
		   for ( k=1; k < conta; k++ )
		   {
		   
		   //alert('#rati'+document.getElementById("numrati"+ k +"").value)
		   $('#rati'+document.getElementById("numrati"+ k +"").value).raty({
																		   score: document.getElementById("ratirati"+ k +"").value ,click: function(score, evt) {
																		   
																		   //alert(conta + ' ID: ' + this.id.slice(4) + "\nscore: " + score + "\nevent: " + evt);
																		   
																		   $(".spinner").show();
																		   $.ajax({
																				  url: "https://dev.storymatch/storymatch/search/rate",
																				  dataType: "json",
																				  type: "post",
																				  contentType: "application/json",
																				  data: JSON.stringify( {rating:score,"storyid": ""+ this.id.slice(4) +""} ),
																				  processData: false,
																				  crossDomain: true,
																				  success:function(result){
																				  
																				  if (result.ID==1024){
																				  navigator.notification.alert(
																											   result.msg,  // message
																											   alertDismissed,         // callback
																											   'Prefiriti',            // title
																											   'OK'                  // buttonName
																											   );
																				  
																				  
																				  }
																				  else{
																				  navigator.notification.alert(
																											   result.msg,  // message
																											   alertDismissed,         // callback
																											   'Prefiriti',            // title
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
																		   });

		   
		   }
		   
		   $("#mySelect").on("change", function(){
							 
				//listapitch(IDPage,1,this.value);
							 
				window.location.href = "swip3.html?IDPage="+ IDPage +"&MyGenere="+ this.value +"&IDRated=0";
				return false;
							 
			});
		   
		   $("#tutti").on("change", function(){

						  if(this.value==2){
							//preferiti(IDPage,1,1)
							window.location.href = "swip3.html?IDPage="+ IDPage +"&IDRated=2";
						  }
						  else{
							window.location.href = "swip3.html?IDRated=0&IDPage="+IDPage;
						  }
						  

							 
						  //return false;
							 
			});

		   localStorage.setItem("NPagine", pagine);
		   
		   setTimeout (function(){
					   myScroll.refresh();
					   myScroll.on('scrollEnd', updateRating);
					   }, 500);
		   
		   //alert("ok");

		   $("#tutti").removeClass("btn2").addClass("btn");
		   $("#migliori").removeClass("btn").addClass("btn2");
		   $("#mySelect").removeClass("btn2").addClass("btn");

		   
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



function preferiti(IDPage,page,genere) {
	//alert("ok")
	
	var generiLista="";
	
	if(parseInt(page)==1)
	{
		conta = 1
	}
	else if(parseInt(page)==2)
	{
		conta = 6
	}
	else{
		conta = parseInt(page)-1
		
		conta = parseInt(conta)*5
		
		conta = parseInt(conta)+1
	}
	
	
	if (genere==1){
		genere="All"
	}
	
	if (genere=="All"){
	 var generi = "<option value='"+ genere +"' selected=true>All Genres</option>";
		var primo = "<option value='0' selected=true>All Pitches</option><option value='1'>Back</option><option value='2'>Preferred</option>";
	}
	else{
		var generi = "<option value='"+ genere +"' selected=true>"+ genere +"</option>";
		var primo = "<option value='0' selected=true>All Pitches</option><option value='1'>Back</option><option value='2'>Preferred</option>";
	}
	
	localStorage.setItem("Pagina", page);
	localStorage.setItem("Genere", genere);
	localStorage.setItem("Preferred", 0);
	
	
	if (page==1){
		$(".spinner").show();
		$.ajax({
			   type:"GET",
			   url:"https://dev.storymatch/storymatch/search/genrelist",
			   data: {token:localStorage.getItem("Token")},
			   contentType: "application/json; charset=utf-8",
			   json: 'callback',
			   crossDomain: true,
			   success:function(result){
			   
			   $.each(result, function(i,item){
					  
					  generi = generi + "<option value='"+ item.name +"'>"+ item.name +"</option>"
					  
					  });
			   
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
			   
			   window.location.href = "swip.html";
			   
			   },
			   dataType:"json"});
	}
	
	
	gopagina = parseInt(page)-1
	
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"https://dev.storymatch/storymatch/search/stepspreferred",
		   //data: {token:localStorage.getItem("Token"),genre:genere,page:gopagina,pagesize:"5"},
		   contentType: "application/json; charset=utf-8",
		   json: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   var lista="";
		   
		   if (page==1){
		   lista = lista + "<table width='100%' border='0' cellpadding='0' cellspacing='0'><tr><td class='trtabella' width='70%'><table width='90%'><tr><td width='10%'></td><td width='90%' align='left'><font size='4'>Need some inspirations?<br>Trey with thrse ideas or start from scatch</font></td></tr></table></td><td class='trtabella' width='5%' align='center'></td><td class='trtabella' width='10%' align='left'><a href='javascript:showmessagge()' rel='external'><div width='52px' class='idea'></div></a></td><td class='trtabella' width='15%' align='center'></td></tr><tr><td class='trtabella2' colspan='4'><hr></td></tr><tr id='ricerca' style='display: none;'><td class='trtabella2' colspan='4' align='center'><table border='0'><tr><td><input type='text' id='example' size='70' placeholder='Write...'/></td></tr><tr><td><table width='100%' id='example-output' align='center'><tr><td></td><td></td></tr></table></td></tr></table></td></tr><tr><td class='trtabella3' colspan='4' align='center'><table width='100%' align='center'><tr><td align='center'> <select id='tutti' class='btn'>"+ primo +"</select></td><td align='center'><div id='select'><select id='mySelect' name='mySelect' class='btn'>"+ generi +"</select></div></td><td align='center'><a id='migliori' href='swip3.html?IDPage="+ IDPage +"&IDRated=1' rel='external' class='btn'><font color='#000000'>Best Rated</font></a></td></tr></table></td></tr><tr><td class='trtabella2' colspan='4'><hr></td></tr>"
		   }
		   else{
		   lista = lista + "<table width='100%' border='0' cellpadding='0' cellspacing='0'><tr><td class='trtabella2' colspan='4'></td></tr><tr><td class='trtabella2' colspan='4'><br></td></tr>"
		   }
		   
		   
		   $.each(result.obj, function(i,item){
				  var fruits = item.genres
				  
				  if(item.name==""){
				  return;
				  }
				  
				  for ( i=0; i < fruits.length; i++ )
				  {
				  if (i==0){
				  generiLista = generiLista + fruits[i]["name"] + ", "
				  }
				  else{
				  generiLista = generiLista + ", " + fruits[i]["name"]
				  }
				  }
				  
				  generiLista = generiLista.replace(", ,",", ")
				  
				  lista = lista + "<tr><td class='trtabella' colspan='4' align='left'><table width='90%'><tr><td width='10%'></td><td width='90%' align='left'><font size='3'><b>"+ item.title +" - "+ item.name +"</b>&nbsp;("+ item.year +")<br>"+ item.pitch.replace("'","") +".</font></td></tr><tr><td width='10%'></td><td width='90%' align='left'><font size='3'><b><br>"+ generiLista +"</b></font></td></tr></table></td></tr><tr><td class='trtabella' width='70%'><table width='90%' border='0'><tr><td width='10%'></td><td align='center'><a href='javascript:AddPreferiti("+ IDPage +","+ item.storyid +",1)'><img src='img/Ratio.png' width='16'></a></td><td width='170' align='left'><input id='numrati"+ conta +"' type='hidden' value='"+ item.storyid +"'><input id='ratirati"+ conta +"' type='hidden' value='"+ item.rating +"'><div id='rati"+ item.storyid +"'></div></td><td align='left'>("+ item.voters +")</td></tr></table></td><td class='trtabella' width='5%' align='right'>Edit &nbsp;</td><td class='trtabella' width='10%' align='left'><a href='javascript:confirmLogout("+ IDPage +","+ item.storyid +")' rel='external'><div width='52px' class='edita'></div></a></td><td class='trtabella' width='15%' align='center'></td></tr>"
				  
				  
				  //alert(item.rating)
				  
				  pagine = parseInt(item.pagecount);
				  
				  conta = conta +1;
				  
				  
				  });
		   
		   lista = lista + "</table><br><br>"
		   
		   if (page==1){
		   $("#contenuto").html(lista);
		   }
		   else
		   {
		   $("#contenuto").append(lista);
		   }
		   
		   $(".spinner").hide();
		   
		   var stringa = "<font size='4' color='#000'>Your current page: " + page + "/" + pagine + "</font>&nbsp;&nbsp;&nbsp;";
		   
		   /*for ( i=1; i < pagine; i++ )
			{
			
			stringa = stringa + " | " + "<a href='javascript:listapitch("+ IDPage +","+ i +",1)'><font size='5' color='#000'>"+ i +"</font></a>"
			
			}*/
		   
		   $("#selector").html("&nbsp;&nbsp;"+stringa);
		   
		   
		   for ( k=1; k < conta; k++ )
		   {
		   
		   //alert('#rati'+document.getElementById("numrati"+ k +"").value)
		   $('#rati'+document.getElementById("numrati"+ k +"").value).raty({
																		   score: document.getElementById("ratirati"+ k +"").value ,click: function(score, evt) {
																		   
																		   //alert(conta + ' ID: ' + this.id.slice(4) + "\nscore: " + score + "\nevent: " + evt);
																		   
																		   $(".spinner").show();
																		   $.ajax({
																				  url: "https://dev.storymatch/storymatch/search/rate",
																				  dataType: "json",
																				  type: "post",
																				  contentType: "application/json",
																				  data: JSON.stringify( {rating:score,"storyid": ""+ this.id.slice(4) +""} ),
																				  processData: false,
																				  crossDomain: true,
																				  success:function(result){
																				  
																				  if (result.ID==1024){
																				  navigator.notification.alert(
																											   result.msg,  // message
																											   alertDismissed,         // callback
																											   'Prefiriti',            // title
																											   'OK'                  // buttonName
																											   );
																				  
																				  
																				  }
																				  else{
																				  navigator.notification.alert(
																											   result.msg,  // message
																											   alertDismissed,         // callback
																											   'Prefiriti',            // title
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
																		   });
		   
		   
		   }
		   
		   $("#mySelect").on("change", function(){
							 
				//listapitch(IDPage,1,this.value);
							 
				window.location.href = "swip3.html?IDPage="+ IDPage +"&MyGenere="+ this.value +"&IDRated=0";
				return false;
							 
			});
		   
		   $("#tutti").on("change", function(){
						  
						  if(this.value==2){
						    //preferiti(IDPage,1,1)
						    window.location.href = "swip3.html?IDPage="+ IDPage +"&IDRated=2";
						  }
						  else{
							window.location.href = "swip3.html?IDRated=0&IDPage="+IDPage;
						  }
						  
						  
							 
						  //return false;
							 
						  });
		   
		   localStorage.setItem("NPagine", pagine);
		   
		   /*setTimeout (function(){
				myScroll.refresh();
				myScroll.on('scrollEnd', updatePref);
			}, 500);*/
		   
		   
		   $("#tutti").removeClass("btn").addClass("btn2");
		   $("#migliori").removeClass("btn2").addClass("btn");
		   $("#mySelect").removeClass("btn2").addClass("btn");
		   
		   
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




/*function preferiti(IDPage,page,genere) {
	conta = 1
	
	if (genere==1){
		genere="All"
	}
	
	if (genere=="All"){
	 var generi = "<option value='"+ genere +"' selected=true>All Genres</option>";
	}
	else{
		var generi = "<option value='"+ genere +"' selected=true>"+ genere +"</option>";
	}
	
	/*navigator.notification.alert(
	 IDPage+" P. "+page,  // message
	 alertDismissed,         // callback
	 genere,            // title
	 'OK'                  // buttonName
	 );*/
	
	
/*	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"https://dev.storymatch/storymatch/search/genrelist",
		   data: {token:localStorage.getItem("Token")},
		   contentType: "application/json; charset=utf-8",
		   json: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
				  
				  generi = generi + "<option value='"+ item.name +"'>"+ item.name +"</option>"
				  
				  });
		   
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
		   
		   window.location.href = "swip.html";
		   
		   },
		   dataType:"json"});
	
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"https://dev.storymatch/storymatch/search/stepspreferred",
		   //data: {token:localStorage.getItem("Token"),genre:genere,page:page,pagesize:"5"},
		   contentType: "application/json; charset=utf-8",
		   json: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   var lista = "<table width='100%' border='0' cellpadding='0' cellspacing='0'><tr><td class='trtabella' width='70%'><table width='90%'><tr><td width='10%'></td><td width='90%' align='left'><font size='4'>Need some inspirations?<br>Trey with thrse ideas or start from scatch</font></td></tr></table></td><td class='trtabella' width='5%' align='center'></td><td class='trtabella' width='10%' align='left'><a href='javascript:costruzione()' rel='external'><div width='52px' class='idea'></div></a></td><td class='trtabella' width='15%' align='center'></td></tr><tr><td class='trtabella2' colspan='4'><hr></td></tr><tr><td class='trtabella3' colspan='4' align='center'><table width='100%' align='center'><tr><td align='center'> <a id='tutti' href='javascript:listapitch("+ IDPage +","+ page +",1)' class='btn'><font color='#000000'>All Pitches</font></a></td><td align='center'><div id='select'><select id='mySelect' name='mySelect' class='btn'>"+ generi +"</select></div></td><td align='center'><a id='migliori' href='swip3.html?IDPage="+ IDPage +"&IDRated=1' rel='external' class='btn'><font color='#000000'>Best Rated</font></a></td></tr></table></td></tr><tr><td class='trtabella2' colspan='4' align='center'><hr><br><font color='#000' size='4'><b>ALL PREFERRED</b></font></td></tr>"
		   
		   
		   $.each(result.obj, function(i,item){
				  var fruits = item.genres
				  
				  //alert(fruits.length)
				  
				  for ( i=0; i < fruits.length; i++ )
				  {
				  if (i==0){
				  generi = generi + fruits[i]["name"]
				  }
				  else{
				  generi = generi + "," + fruits[i]["name"]
				  }
				  }
				  
				  generi = generi.replace(", ,",", ")
				  
				  lista = lista + "<tr><td class='trtabella' colspan='4' align='left'><table width='90%'><tr><td width='10%'></td><td width='90%' align='left'><font size='3'><b>"+ item.title +"</b>&nbsp;("+ item.year +")<br>"+ item.pitch.replace("'","") +".</font></td></tr><tr><td width='10%'></td><td width='90%' align='left'><font size='3'><b><br>"+ generi +"</b></font></td></tr></table></td></tr><tr><td class='trtabella' width='70%'><table width='90%' border='0'><tr><td width='10%'></td><td align='center'><img src='img/Ratio.png' width='16'></td><td width='170' align='left'><input id='numrati"+ conta +"' type='hidden' value='"+ item.storyid +"'><input id='ratirati"+ conta +"' type='hidden' value='"+ item.rating +"'><div id='rati"+ item.storyid +"'></div></td><td align='left'>("+ item.voters +")</td></tr></table></td><td class='trtabella' width='5%' align='right'>Edit &nbsp;</td><td class='trtabella' width='10%' align='left'><a href='javascript:confirmLogout("+ IDPage +","+ item.storyid +")' rel='external'><div width='52px' class='edita'></div></a></td><td class='trtabella' width='15%' align='center'></td></tr><tr><td class='trtabella2' colspan='4'><hr></td></tr>"
				  
				  pagine = parseInt(item.pagecount);
				  
				  conta = conta +1;
				  
				  
				  });
		   
		   lista = lista + "</table>"
		   $("#contenuto").html(lista);
		   
		   
		   $(".spinner").hide();
		   
		   
		   //alert(pagine)
		   var stringa = "<font size='4' color='#000'>Your current page: " + page + "</font>&nbsp;&nbsp;&nbsp;";
		   
		   for ( i=1; i < pagine; i++ )
		   {
		   if(page!=i){
		   stringa = stringa + " | " + "<a href='javascript:listapitch("+ IDPage +","+ i +",1)'><font size='5' color='#000'>"+ i +"</font></a>"
		   }
		   else{
			  
		   }
		   
		   }
		   
		   //$("#selector").html(stringa);
		   
		   
		   for ( k=1; k < conta; k++ )
		   {
		   
		   
		   $('#rati'+document.getElementById("numrati"+ k +"").value).raty({
																		   score: document.getElementById("ratirati"+ k +"").value ,click: function(score, evt) {
																		   //costruzione()
																		   //alert('ID: ' + this.id.slice(4) + "\nscore: " + score + "\nevent: " + evt);
																		   
																		   $(".spinner").show();
																		   $.ajax({
																				  url: "https://dev.storymatch/storymatch/search/rate",
																				  dataType: "json",
																				  type: "post",
																				  contentType: "application/json",
																				  data: JSON.stringify( {rating:score,"storyid": ""+ this.id.slice(4) +""} ),
																				  processData: false,
																				  crossDomain: true,
																				  success:function(result){
																				  
																				  if (result.ID==1024){
																				  navigator.notification.alert(
																											   result.msg,  // message
																											   alertDismissed,         // callback
																											   'Prefiriti',            // title
																											   'OK'                  // buttonName
																											   );
																				  
																				  
																				  }
																				  else{
																				  navigator.notification.alert(
																											   result.msg,  // message
																											   alertDismissed,         // callback
																											   'Prefiriti',            // title
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
																		   });
		   
		   
		   }
		   
		   localStorage.setItem("Preferred", 1);
		   
		   myScroll.refresh();
		   
		   $("#mySelect").on("change", function(){
							 
							 listapitch(IDPage,1,this.value);
							 
							 //return false;
							 
							 });
		   
		   
		   $("#tutti").removeClass("btn2").addClass("btn");
		   $("#migliori").removeClass("btn2").addClass("btn");
		   $("#mySelect").removeClass("btn2").addClass("btn");
		   
		   
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
	
}*/



function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
						  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
						  results = regex.exec(location.search);
						  return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
						  }



						  function verificatoken() {
						  Token = localStorage.getItem("Token");
						  
						  $(".spinner").show();
						  $.ajax({
								 type:"GET",
								 url:"https://dev.storymatch/storymatch/authentication/validatetoken",
								 data: {token:Token},
								 contentType: "application/json; charset=utf-8",
								 json: 'callback',
								 crossDomain: true,
								 success:function(result){
								 
								 if (result.ID==1024){
								 //OK
								 
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
															  'error',            // title
															  'OK'                  // buttonName
															  );
								 window.location.href = "index.html";
								 
								 },
								 dataType:"json"});
						  
						  }
						  
						  function exitapp() {
						  window.location.href = "index.html";
						  }
						  
						  
						  function costruzione() {
						  
						  navigator.notification.alert(
													   'Under Construction',  // message
													   alertDismissed,         // callback
													   'Stop',            // title
													   'OK'                  // buttonName
													   );
						  
						  }
