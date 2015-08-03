document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
	
	document.addEventListener("resume", onResume, false);
	document.addEventListener("showkeyboard", function(){ $("[data-role=footer]").hide();}, false);
	document.addEventListener("hidekeyboard", function(){ $("[data-role=footer]").show();}, false);
	
    $(".spinner").hide();
	
	var IDPage = getParameterByName('IDPage');
	
	verificatoken()
	
	listapitch(IDPage,1)

	pagina()
	

	$("#indietro").attr("href", "swip4.html?id="+ IDPage +"");
	
	
	$("#btn2").bind("click", function (event){
					 
		alert(self.document.formia.mySelect.value)
					 
	});



	
	/*$(window).scroll(function() {
	  if($(window).scrollTop() + $(window).height() > $(document).height() - 1) {
		 alert();
		}
	});*/
	
	var pagine;
	var conta;
}


function listapitch(IDPage,page) {
	conta = 1
	 var generi = "";
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"https://dev.storymatch.co/storymatch/search/stepsbygenres",
		   data: {token:localStorage.getItem("Token"),genre:"All",page:page,pagesize:"5"},
		   contentType: "application/json; charset=utf-8",
		   json: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   var lista = "<table width='100%' border='0' cellpadding='0' cellspacing='0'><tr><td class='trtabella' width='70%'><table width='90%'><tr><td width='10%'></td><td width='90%' align='left'><font size='4'>Need some inspirations?<br>Trey with thrse ideas or start from scatch</font></td></tr></table></td><td class='trtabella' width='5%' align='center'></td><td class='trtabella' width='10%' align='left'><a href='javascript:costruzione()' rel='external'><div width='52px' class='idea'></div></a></td><td class='trtabella' width='15%' align='center'></td></tr><tr><td class='trtabella2' colspan='4'><hr></td></tr><tr><td class='trtabella3' colspan='4' align='center'><table width='100%' align='center'><tr><td align='center'> <a href='javascript:costruzione()' class='btn'><font color='#000000'>All Pitches</font></a></td><td align='center'><div id='select'><select id='mySelect' name='mySelect' class='btn'><option value='01' selected=true>Room.it</option><option value='Drama'>Drama</option></select></div></td><td align='center'><a href='javascript:costruzione()' data-rel='popup' data-position-to='window' class='btn'><font color='#000000'>Best Rated</font></a></td></tr></table></td></tr><tr><td class='trtabella2' colspan='4'><hr></td></tr>"
		   
		   //alert(result.ID);
		   //$("#titolo").html(result.title);
		   
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
				  
				lista = lista + "<tr><td class='trtabella' colspan='4' align='left'><table width='90%'><tr><td width='10%'></td><td width='90%' align='left'><font size='3'><b>"+ item.title +"</b>&nbsp;("+ item.year +")<br>"+ item.pitch.replace("'","") +".</font></td></tr><tr><td width='10%'></td><td width='90%' align='left'><font size='3'><b><br>"+ generi +"</b></font></td></tr></table></td></tr><tr><td class='trtabella' width='70%'><table width='90%' border='0'><tr><td width='10%'></td><td align='center'><img src='img/Ratio.png' width='16'></td><td width='170' align='left'><input id='numrati"+ conta +"' type='hidden' value='"+ item.storyid +"'><input id='ratirati"+ conta +"' type='hidden' value='"+ item.rating +"'><div id='rati"+ item.storyid +"'></div></td><td align='left'>("+ item.voters +")</td></tr></table></td><td class='trtabella' width='5%' align='right'>Edit &nbsp;</td><td class='trtabella' width='10%' align='left'><a href='javascript:confirmLogout("+ IDPage +","+ item.storyid +")' rel='external'><div width='52px' class='edita'></div></a></td><td class='trtabella' width='15%' align='center'></td></tr><tr><td class='trtabella2' colspan='4'><hr></td></tr>"
				  
				  
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
		   
		   lista = lista + "</table>"
		   $("#contenuto").html(lista);
		   
		   
		    $(".spinner").hide();
		   
		   
		   //alert(pagine)
		   var stringa = "<font size='4' color='#000'>Your current page: " + page + "</font>&nbsp;&nbsp;&nbsp;";
		   
		   for ( i=1; i < pagine; i++ )
		   {
			 if(page!=i){
		       stringa = stringa + " | " + "<a href='javascript:listapitch("+ IDPage +","+ i +")'><font size='4' color='#000'>"+ i +"</font></a>"
			 }
		     else{
			  
			 }
		   
		   }
		   
		   $("#selector").html(stringa);
		   
		   
		   for ( k=1; k < conta; k++ )
		   {
		   
		     //$('#rati'+document.getElementById("numrati"+ k +"").value).raty({ score: 3 });

			 $('#rati'+document.getElementById("numrati"+ k +"").value).raty({
				score: document.getElementById("ratirati"+ k +"").value ,click: function(score, evt) {
				alert('ID: ' + this.id.slice(4) + "\nscore: " + score + "\nevent: " + evt);
				}
			  });
		   
		     //$('#rati'+document.getElementById("numrati"+ k +"").value).raty({ score: 3 });

		   }
		   
		   myScroll.refresh();
		   
		   },
		   error: function(){
		   $(".spinner").hide();
		   
		   alert("Errore");
		   
		   },
		   dataType:"json"});
	
	
}


function confirmLogout(id,idpitch) {
	localStorage.setItem("id3", id);
	localStorage.setItem("idpitch3", idpitch);
	
	navigator.notification.confirm(
								   'You want to overwrite your story',  // message
								   onConfirm,              // callback to invoke with index of button pressed
								   'Confirm',            // title
								   'Accept,Reject'      // buttonLabels
								   );
	
	
}

function onConfirm(button) {
	
	if (button==1){
		
		 window.location.href = "swip4.html?id="+ localStorage.getItem("id3") +"&idPitch="+ localStorage.getItem("idpitch3") +"";
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

function pagina() {
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
										 var size = scale( 600, 400, 0, 1 ),
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




						  function verificatoken() {
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
						  
						  
						  function costruzione() {
						  
						  navigator.notification.alert(
													   'Under Construction',  // message
													   alertDismissed,         // callback
													   'Stop',            // title
													   'OK'                  // buttonName
													   );
						  
						  }
