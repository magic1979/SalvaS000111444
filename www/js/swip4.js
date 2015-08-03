document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
	document.addEventListener("resume", onResume, false);
	
	ionic.Platform.isFullScreen = true
	
	$.mobile.defaultPageTransition = 'none';
	$.mobile.defaultDialogTransition = 'none';
	
	$.support.cors = true;
	$.mobile.allowCrossDomainPages = true;
	$.mobile.phonegapNavigationEnabled = true
	$.mobile.pushStateEnabled = false;
	
	
	$(document).on('focus', 'select, input, textarea', function () {
		$('#myfooter').css({'position': 'absolute', 'bottom': '0px' });
	});
	$(document).on('blur', 'select, input, textarea', function () {
		$('#myfooter').css({ 'position': 'fixed' });
	});
	
	
	var story;
    $(".spinner").hide();
	var IDPage;
	var IDPitch;
	
	$(".spinner").hide();
	
	verificatoken()
	
	IDPage = getParameterByName('id');
	IDPitch = getParameterByName('idPitch');
	
	//alert(IDPage)

	//$("#ispirazione").attr("href", "swip3.html?IDPage="+ IDPage +"");
	$("#salvatutto").attr("href", "javascript:salvasteps("+ IDPage +")");
	//$("#totalshuffle").attr("href", "javascript:shuffletotal("+ IDPage +")");
	//$("#ava").attr("href", "javascript:salvasteps("+ IDPage +",2)");
	
	$(document).on("click touch", "#ava", function(e){
		salvasteps(IDPage,2)
	});
	
	$(document).on("click touch", "#indi", function(e){
		window.location.href = "swip2.html";
	});
	
	$(document).on("click touch", "#ispirazione", function(e){
		window.location.href = "swip3.html?IDPage="+IDPage;
	});
	
	$(document).on("click touch", "#totalshuffle", function(e){
		javascript:shuffletotal(IDPage)
	});
	
	
	/*$( "#ava" ).bind( "tap", function( e ){
		salvasteps("+ id +",2);
	});
	
	$( "#dietro" ).bind( "tap", function( e ){
		 window.location.href = "swip2.html";
	});*/

	
	if (IDPitch==0){
		editstory(IDPage,IDPitch)
		
		localStorage.setItem("locco1", 0);
		localStorage.setItem("locco2", 0);
		localStorage.setItem("locco3", 0);
		localStorage.setItem("locco4", 0);
		localStorage.setItem("locco5", 0);
		localStorage.setItem("locco6", 0);
		localStorage.setItem("locco7", 0);
		localStorage.setItem("locco8", 0);
		localStorage.setItem("locco9", 0);
		localStorage.setItem("locco10", 0);
		localStorage.setItem("locco11", 0);
		localStorage.setItem("locco12", 0);
		
		localStorage.setItem("myTextarea1", 0);
		localStorage.setItem("myTextarea2", 0);
		localStorage.setItem("myTextarea3", 0);
		localStorage.setItem("myTextarea4", 0);
		localStorage.setItem("myTextarea5", 0);
		localStorage.setItem("myTextarea6", 0);
		localStorage.setItem("myTextarea7", 0);
		localStorage.setItem("myTextarea8", 0);
		localStorage.setItem("myTextarea9", 0);
		localStorage.setItem("myTextarea10", 0);
		localStorage.setItem("myTextarea11", 0);
		localStorage.setItem("myTextarea12", 0);
		
	}
	else{
		//alert(IDPitch);
		
		editstory(IDPage,IDPitch)
		
		//locco1 = localStorage.getItem("locco1");
	}
	
	
	//settare campo
	//document.getElementById("email").value = item.Email;

}

function buildstory() {
	var story;
	story = "<table width='100%' border='0' cellpadding='0' cellspacing='0'><tr><td class='trtabella2' colspan='4'><br><br></td></tr><tr><td class='trtabella' width='100%'><table width='90%'><tr><td width='10%'></td><td width='90%' align='left'><b>Titolo<b></td></tr><tr><td width='10%'></td><td width='90%' align='left'>Your first story.</td></tr></table></td></tr><tr><td class='trtabella2' colspan='4'><hr></td></tr> <tr><td class='trtabella2' colspan='4'><br><br></td></tr>";
	
	var length = 2,
	element = null;
	var conto = 1;
	
	for (var i = 0; i < length; i++) {
		//alert(conto)
		
		story = story + "<tr><td class='trtabella' width='90%'><table width='100%' border='0'><tr><td width='10%'></td><td width='90%' align='left'><b>"+ conto +"</b></td></tr><tr><td width='10%'></td><td width='90%' align='left'><textarea name='myTextarea"+ conto +"' id='myTextarea"+ conto +"' rows='4' cols='60' class='textarea1' style='background-color: transparent;'>Write your 1 step.</textarea></td></tr><tr><td width='10%'></td><td width='90%' align='left'><br></td></tr><tr><td width='10%'></td><td width='90%' align='left'><table width='100%'><tr><td width='55px'><a id='sin"+ conto +"' href='#' rel='external'><div width='52px' class='sinistra'></div></a></td><td width='55px'><a id='des"+ conto +"' href='#' rel='external'><div width='52px' class='destra'></div></a></td><td width='55px'><a href='javascript:abilita"+ conto +"()' rel='external'><div width='52px' class='edita'></div></a></td><td width='55px'><a href='#' rel='external'><div width='52px' class='lucchetto'></div></a></td><td width='55px'><a href='#' rel='external'><div width='52px' class='infinito'></div></a></td><td width='55px'><a href='javascript:salva()' rel='external'><div width='52px' class='salva'></div></a></td></tr></table></td></tr></table></td></tr><tr><td class='trtabella2' colspan='4'><hr></td></tr>"
		
		conto = conto+1;
	}
	
	story = story + "</table>";
	
	$("#contenuto").html(story);
	
	$("#ava").attr("href", "javascript:salvasteps(0)");
	
	$( "#ava" ).bind( "tap", function( e ){
		 salvasteps(0);
	});
	
}

function editstory(id,IDPitch) {
	//alert(id);
	//alert(IDPitch);
	
	var length = 2,
	element = null;
	var conto = 1;
	//$("#ava").attr("href", "swip5.html?id="+ id +"");
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"https://dev.storymatch.co/storymatch/search/stepsbyid",
		   data: {ID:id, token:localStorage.getItem("Token")},
		   contentType: "application/json; charset=utf-8",
		   json: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   story = "<table id='titolo1' width='100%' height='100%' border='0' cellpadding='0' cellspacing='0' style='display: none;'><tr><td class='trtabella2' colspan='4'><br><br></td></tr><tr><td class='trtabella' width='90%'><table width='90%'><tr><td width='10%'></td><td width='90%' align='left'><font size='4'><b><div id='titolo'>"+ result.title +"</div></b></font></td></tr>";
		   
		   //alert(result.title);
		   //$("#titolo").html(result.title);
		   
		   $.each(result.characters, function(i,item){
				  var fruits = item.detail["steps"]
				  var pitcho = "";
				  var crea=0;
				  var steppo;
				  var chiuso;
				  
				  if(conto==1){
				    pitcho = item.detail["pitch"].replace("'","");
					story = story + "<tr><td width='10%'></td><td width='90%' align='left'><font class='fontegrande'><div id='pitcho' style='fontegrande'>"+ item.detail["pitch"].replace("'","") +"</div></font></td></tr></table></td></tr><tr><td class='trtabella2' colspan='4'><hr></td></tr> <tr><td class='trtabella2' colspan='4'><br></td></tr>"
				  }
				  
				  
				  if ((pitcho=="")||(!pitcho)){
					  crea=1;
				  }
				  //$("#piccio").html(item.detail["pitch"].replace("'",""));
				  
				  //alert(fruits[0]["id"]);
				  
				  for ( i=0; i < fruits.length; i++ )
				  {
				  
					//if(fruits[i]["id"]==12){
					  //alert(fruits[i]["step"]);
					//}
				  
				  if((conto==1)||(conto==2)||(conto==3)||(conto==6)||(conto==7)){
				  //alert(conto);
				  //alert(fruits[i]["step"].replace("'",""));
				  
				  if (crea==1){
					   if(conto==7){
					   pitcho = pitcho + " and " + fruits[i]["step"].replace("'","")
					   }
					   else{
					    pitcho = pitcho + " " + fruits[i]["step"].replace("'","")
					    }
					 }
				  }
				  
				  //alert(localStorage.getItem("myTextarea"+ conto +""))
				  
				  if(localStorage.getItem("myTextarea"+ conto +"")!=0){
					steppo = localStorage.getItem("myTextarea"+ conto +"")
				  }
				  else{
					steppo = fruits[i]["step"].replace("'","")
				  }
				  
				  story = story + "<tr><td class='trtabella' width='90%'><table width='100%' border='0'><tr><td width='10%'></td><td width='90%' align='left'><b>"+ conto +"</b></td></tr><tr><td width='10%'></td><td width='90%' align='left'><input id='idLine"+ conto +"' value='"+ fruits[i]["id"] +"' type='hidden'><textarea name='myTextarea"+ conto +"' id='myTextarea"+ conto +"' rows='4' cols='60' class='textarea1' style='background-color: transparent;' placeholder='Write Step'>"+ steppo +"</textarea></td></tr><tr><td width='10%'></td><td width='90%' align='left'><br></td></tr><tr><td width='10%'></td><td width='90%' align='left'><table width='100%'><tr><td width='55px'><a id='sin"+ conto +"' href='#' rel='external'><div width='52px' class='sinistra'></div></a></td><td width='55px'><a id='des"+ conto +"' href='#' rel='external'><div width='52px' class='destra'></div></a></td><td width='55px'><a href='javascript:abilita"+ conto +"()' rel='external'><div id='edit"+ conto +"' width='52px' class='edita'></div></a></td><td width='55px'><a href='javascript:lucchetto("+ fruits[i]["id"] +","+ conto +","+ id +","+ IDPitch +")' rel='external'><div id='lock"+ conto +"' width='52px' class='lucchetto'></div></a></td><td width='55px'><a href='javascript:shuffle("+ fruits[i]["id"] +","+ conto +","+ id +","+ IDPitch +")' rel='external'><div width='52px' class='infinito'></div></a></td><td width='55px'></td></tr></table></td></tr></table></td></tr><tr><td class='trtabella2' colspan='4'><input type='hidden' id='locco"+ conto +"' name='locco"+ conto +"' value='0'><hr></td></tr>"
				  
				  
				  conto = conto+1;
				  
				  }
				  
				  story = story + "</table>";
				  $("#contenuto").html(story);
				  $("#pitcho").html(pitcho);
				  
				   $("#titolo1").fadeIn();
				  
				  localStorage.setItem("pitcho", pitcho);
				  
				  document.getElementById("myTextarea1").readOnly = true;
				  document.getElementById("myTextarea2").readOnly = true;
				  document.getElementById("myTextarea3").readOnly = true;
				  document.getElementById("myTextarea4").readOnly = true;
				  document.getElementById("myTextarea5").readOnly = true;
				  document.getElementById("myTextarea6").readOnly = true;
				  document.getElementById("myTextarea7").readOnly = true;
				  document.getElementById("myTextarea8").readOnly = true;
				  document.getElementById("myTextarea9").readOnly = true;
				  document.getElementById("myTextarea10").readOnly = true;
				  document.getElementById("myTextarea11").readOnly = true;
				  document.getElementById("myTextarea12").readOnly = true;
				  
				  $(".spinner").hide();
				  
				  if(IDPitch!=0){
					editstory2(IDPitch);
					//changestep()
				  }
				  
				  myScroll.refresh();
	  
				  
				  });
		   
		   },
		   error: function(){
		   $(".spinner").hide();
		   
		   alert("error");
		   
		   },
		   dataType:"json"});
	
	
	/*for (var i = 0; i < length; i++) {
		
		story = story + "<tr><td class='trtabella' width='90%'><table width='90%'><tr><td width='10%'></td><td width='90%' align='left'><b>"+ conto +"</b></td></tr><tr><td width='10%'></td><td width='90%' align='left'><textarea name='myTextarea"+ conto +"' id='myTextarea"+ conto +"' rows='4' cols='30' class='textarea1' style='background-color: transparent;'>Write your 1 step.</textarea></td></tr><tr><td width='10%'></td><td width='90%' align='left'><br></td></tr><tr><td width='10%'></td><td width='90%' align='left'><table width='100%'><tr><td width='55px'><a id='sin"+ conto +"' href='#' rel='external'><div width='52px' class='sinistra'></div></a></td><td width='55px'><a id='des"+ conto +"' href='#' rel='external'><div width='52px' class='destra'></div></a></td><td width='55px'><a href='javascript:abilita"+ conto +"()' rel='external'><div width='52px' class='edita'></div></a></td><td width='55px'><a href='#' rel='external'><div width='52px' class='lucchetto'></div></a></td><td width='55px'><a href='#' rel='external'><div width='52px' class='infinito'></div></a></td><td width='55px'><a href='javascript:salva()' rel='external'><div width='52px' class='salva'></div></a></td></tr></table></td></tr></table></td></tr><tr><td class='trtabella2' colspan='4'><hr></td></tr>"
		
		conto = conto+1;
	}*/
	
	
	
}

function editstory2(id) {
	
	var length = 2,
	element = null;
	var conto = 1;
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"https://dev.storymatch.co/storymatch/search/stepsbyid",
		   data: {ID:id, token:localStorage.getItem("Token")},
		   contentType: "application/json; charset=utf-8",
		   json: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   
		   $.each(result.characters, function(i,item){
				  var fruits = item.detail["steps"]
				  var pitcho = "";
				  var crea=0;
				  var steppo;
				  var chiuso;
				  
				  if(conto==1){
				  pitcho = item.detail["pitch"].replace("'","");
				  story = story + "<tr><td width='10%'></td><td width='90%' align='left'><font class='fontegrande'><div id='pitcho' style='fontegrande'>"+ item.detail["pitch"].replace("'","") +"</div></font></td></tr></table></td></tr><tr><td class='trtabella2' colspan='4'><hr></td></tr> <tr><td class='trtabella2' colspan='4'><br><br></td></tr>"
				  }
				  
				  
				  if ((pitcho=="")||(!pitcho)){
				  crea=1;
				  }

				  
				  for ( i=0; i < fruits.length; i++ )
				  {
				  
				  if((conto==1)||(conto==2)||(conto==3)||(conto==6)||(conto==7)){
				  //alert(conto);
				  //alert(fruits[i]["step"].replace("'",""));
				  
				  if (crea==1){
				  if(conto==7){
				  pitcho = pitcho + " and " + fruits[i]["step"].replace("'","")
				  }
				  else{
				  pitcho = pitcho + " " + fruits[i]["step"].replace("'","")
				  }
					 }
				  }

				  
				  if(localStorage.getItem("locco"+ conto +"")==0){
					 document.getElementById("myTextarea"+ conto +"").value = fruits[i]["step"].replace("'","");
				  }
				  else{
					$("#lock"+ conto +"").removeClass('lucchetto').addClass('lucchetto2');
					document.getElementById("locco"+ conto +"").value = 1;
				  }

				  //story = story + "<tr><td class='trtabella' width='90%'><table width='100%' border='0'><tr><td width='10%'></td><td width='90%' align='left'><b>"+ conto +"</b></td></tr><tr><td width='10%'></td><td width='90%' align='left'><textarea name='myTextarea"+ conto +"' id='myTextarea"+ conto +"' rows='4' cols='60' class='textarea1' style='background-color: transparent;' >"+ fruits[i]["step"].replace("'","") +"</textarea></td></tr><tr><td width='10%'></td><td width='90%' align='left'><br></td></tr><tr><td width='10%'></td><td width='90%' align='left'><table width='100%'><tr><td width='55px'><a id='sin"+ conto +"' href='#' rel='external'><div width='52px' class='sinistra'></div></a></td><td width='55px'><a id='des"+ conto +"' href='#' rel='external'><div width='52px' class='destra'></div></a></td><td width='55px'><a href='javascript:abilita"+ conto +"()' rel='external'><div width='52px' class='edita'></div></a></td><td width='55px'><a href='javascript:lucchetto("+ conto +")' rel='external'><div id='lock"+ conto +"' width='52px' class='lucchetto'></div></a></td><td width='55px'><a href='javascript:shuffle("+ conto +")' rel='external'><div width='52px' class='infinito'></div></a></td><td width='55px'><a href='javascript:salva("+ fruits[i]["id"] +","+ conto +","+ id +")' rel='external'><div width='52px' class='salva'></div></a></td></tr></table></td></tr></table></td></tr><tr><td class='trtabella2' colspan='4'><input type='hidden' id='locco"+ conto +"' name='locco"+ conto +"' value='0'><hr></td></tr>"
				  
				  
				  conto = conto+1;
				  
				  }
				  
				  $(".spinner").hide();
				  $("#pitcho").html(pitcho);
				  localStorage.setItem("pitcho", pitcho);
				  
				  myScroll.refresh();
				  
				  
				  //salvasteps(id,3)
				  
				  });
		   
		   },
		   error: function(){
		   $(".spinner").hide();
		   
		   alert("error");
		   
		   },
		   dataType:"json"});
	
	
}

function editstory3(id) {
	
	var length = 2,
	element = null;
	var conto = 1;
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"https://dev.storymatch.co/storymatch/search/stepsbyid",
		   data: {ID:id, token:localStorage.getItem("Token")},
		   contentType: "application/json; charset=utf-8",
		   json: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   
		   $.each(result.characters, function(i,item){
				  var fruits = item.detail["steps"]
				  var pitcho = "";
				  var crea=0;
				  var steppo;
				  var chiuso;
				  
				  if(conto==1){
				  pitcho = item.detail["pitch"].replace("'","");
				  story = story + "<tr><td width='10%'></td><td width='90%' align='left'><font class='fontegrande'><div id='pitcho' style='fontegrande'>"+ item.detail["pitch"].replace("'","") +"</div></font></td></tr></table></td></tr><tr><td class='trtabella2' colspan='4'><hr></td></tr> <tr><td class='trtabella2' colspan='4'><br><br></td></tr>"
				  }
				  
				  
				  if ((pitcho=="")||(!pitcho)){
				  crea=1;
				  }
				  
				  
				  for ( i=0; i < fruits.length; i++ )
				  {
				  
				  if((conto==1)||(conto==2)||(conto==3)||(conto==6)||(conto==7)){
				  
				  if (crea==1){
				  if(conto==7){
				  pitcho = pitcho + " and " + fruits[i]["step"].replace("'","")
				  }
				  else{
				  pitcho = pitcho + " " + fruits[i]["step"].replace("'","")
				  }
					 }
				  }
				  
				  
				  if(localStorage.getItem("locco"+ conto +"")==0){
					 //document.getElementById("myTextarea"+ conto +"").value = fruits[i]["step"].replace("'","");
				  }
				  else{
				  $("#lock"+ conto +"").removeClass('lucchetto').addClass('lucchetto2');
				  document.getElementById("locco"+ conto +"").value = 1;
				  }

				  conto = conto+1;
				  
				  }
				  
				  $(".spinner").hide();
				  $("#pitcho").html(pitcho);
				  localStorage.setItem("pitcho", pitcho);
				  
				  myScroll.refresh();
				  
				  
				  });
		   
		   },
		   error: function(){
		   $(".spinner").hide();
		   
		   alert("error");
		   
		   },
		   dataType:"json"});
	
	
}

function editstory4(id) {
	
	alert("2")
	var length = 2,
	element = null;
	var conto = 1;
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"https://dev.storymatch.co/storymatch/search/stepsbyid",
		   data: {ID:id, token:localStorage.getItem("Token")},
		   contentType: "application/json; charset=utf-8",
		   json: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   
		   $.each(result.characters, function(i,item){
				  var fruits = item.detail["steps"]
				  var pitcho = "";
				  var crea=0;
				  var steppo;
				  var chiuso;
				  
				  if(conto==1){
				  pitcho = item.detail["pitch"].replace("'","");
				  story = story + "<tr><td width='10%'></td><td width='90%' align='left'><font class='fontegrande'><div id='pitcho' style='fontegrande'>"+ item.detail["pitch"].replace("'","") +"</div></font></td></tr></table></td></tr><tr><td class='trtabella2' colspan='4'><hr></td></tr> <tr><td class='trtabella2' colspan='4'><br><br></td></tr>"
				  }
				  
				  
				  if ((pitcho=="")||(!pitcho)){
				  crea=1;
				  }
				  
				  
				  for ( i=0; i < fruits.length; i++ )
				  {
				  
				  if((conto==1)||(conto==2)||(conto==3)||(conto==6)||(conto==7)){
				  //alert(conto);
				  //alert(fruits[i]["step"].replace("'",""));
				  
				  if (crea==1){
				  if(conto==7){
				  pitcho = pitcho + " and " + fruits[i]["step"].replace("'","")
				  }
				  else{
				  pitcho = pitcho + " " + fruits[i]["step"].replace("'","")
				  }
					 }
				  }
				  
				  
				  if(localStorage.getItem("locco"+ conto +"")==0){
					 document.getElementById("myTextarea"+ conto +"").value = fruits[i]["step"].replace("'","");
				  }
				  else{
				  $("#lock"+ conto +"").removeClass('lucchetto').addClass('lucchetto2');
				  document.getElementById("locco"+ conto +"").value = 1;
				  }
				  
				  //story = story + "<tr><td class='trtabella' width='90%'><table width='100%' border='0'><tr><td width='10%'></td><td width='90%' align='left'><b>"+ conto +"</b></td></tr><tr><td width='10%'></td><td width='90%' align='left'><textarea name='myTextarea"+ conto +"' id='myTextarea"+ conto +"' rows='4' cols='60' class='textarea1' style='background-color: transparent;' >"+ fruits[i]["step"].replace("'","") +"</textarea></td></tr><tr><td width='10%'></td><td width='90%' align='left'><br></td></tr><tr><td width='10%'></td><td width='90%' align='left'><table width='100%'><tr><td width='55px'><a id='sin"+ conto +"' href='#' rel='external'><div width='52px' class='sinistra'></div></a></td><td width='55px'><a id='des"+ conto +"' href='#' rel='external'><div width='52px' class='destra'></div></a></td><td width='55px'><a href='javascript:abilita"+ conto +"()' rel='external'><div width='52px' class='edita'></div></a></td><td width='55px'><a href='javascript:lucchetto("+ conto +")' rel='external'><div id='lock"+ conto +"' width='52px' class='lucchetto'></div></a></td><td width='55px'><a href='javascript:shuffle("+ conto +")' rel='external'><div width='52px' class='infinito'></div></a></td><td width='55px'><a href='javascript:salva("+ fruits[i]["id"] +","+ conto +","+ id +")' rel='external'><div width='52px' class='salva'></div></a></td></tr></table></td></tr></table></td></tr><tr><td class='trtabella2' colspan='4'><input type='hidden' id='locco"+ conto +"' name='locco"+ conto +"' value='0'><hr></td></tr>"
				  
				  
				  conto = conto+1;
				  
				  }
				  
				  $(".spinner").hide();
				  $("#pitcho").html(pitcho);
				  localStorage.setItem("pitcho", pitcho);
				  
				  myScroll.refresh();
				  
				  
				  });
		   
		   },
		   error: function(){
		   $(".spinner").hide();
		   
		   alert("error");
		   
		   },
		   dataType:"json"});
	
	
}


function salvasteps(id,prov) {
	$(".spinner").show();
	
	var contasalva = 1;
	var stringa = "["
	var iddOut;
	var OutOutline;
	
	var numout = 12;
	
	//alert("PROV:" + prov);
	
	for ( i=0; i < numout; i++ )
	{

		iddOut = document.getElementById("idLine"+ contasalva +"").value
		
		OutOutline = document.getElementById("myTextarea"+ contasalva +"").value;
		OutOutline.replace(' ','%20');
		
		
		if (contasalva==1){
			stringa = stringa + "{\"id\":\""+ iddOut +"\",\"step\":\""+ OutOutline +"\"}";
		}
		else{
			stringa = stringa + ",{\"id\":\""+ iddOut +"\",\"step\":\""+ OutOutline +"\"}";
		}
		
		contasalva = contasalva + 1;
	}
	
	stringa = stringa + "]";
	

	//alert(stringa);
	
	
	
	/*$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"https://dev.storymatch.co/storymatch/userstories/update/steps?steps="+stringa+"",
		   data: {token:localStorage.getItem("Token"),storyid:id},
		   contentType: "application/json; charset=utf-8",
		   json: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   if (result.ID==1024){
		   navigator.notification.alert(
										'Saved Steps',  // message
										alertDismissed,         // callback
										'Steps',            // title
										'OK'                  // buttonName
										);
		   editstory2(id)
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
										'possible network error',  // message
										alertDismissed,         // callback
										'error',            // title
										'OK'                  // buttonName
										);
		   
		   },
		   dataType:"json"});*/
	
	
	$.ajax({
		   url: "https://dev.storymatch.co/storymatch/userstories/update/steps",
		   dataType: "json",
		   type: "post",
		   contentType: "application/json",
		   data: JSON.stringify( { "storyid":id,"steps":""+stringa+"" } ),
		   processData: false,
		   crossDomain: true,
		   success:function(result){
		   
		   if (result.ID==1024){
		   /*navigator.notification.alert(
										'SALVA IN POST',  // message
										alertDismissed,         // callback
										'Steps',            // title
										'OK'                  // buttonName
										);*/
		   
		   if(prov==0){
		     editstory2(id)
		   }
		   else if(prov==3){
		   alert("1");
			editstory4(id)
		   }
		   else{
		     window.location.href = "swip5.html?id="+ id +"";
		   }

		   
		   
		   //
		   
		   }
		   else{
		   navigator.notification.alert(
										result.msg,  // message
										alertDismissed,         // callback
										'Modifica Steps',            // title
										'OK'                  // buttonName
										);
		   }
		   
		   $(".spinner").hide();
		   buildout(id)
		   
		   },
		   error: function(jqXhr, textStatus, errorThrown){
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


/*if (localStorage.getItem("locco"+ conto +"")==1){
	$("#lock"+ conto +"").removeClass('lucchetto').addClass('lucchetto2');
	document.getElementById("locco"+ conto +"").value = 1;
}

if (localStorage.getItem("myTextarea"+ conto +"")!=0){
	document.getElementById("myTextarea"+ conto +"").value = localStorage.getItem("myTextarea"+ conto +"")
}*/


function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
						  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
						  results = regex.exec(location.search);
						  return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
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



function undor() {
	
	document.execCommand('undo', false, null);
	
}

function redor() {
	
	document.execCommand('redo', false, null);
	
}


function salva(id,conto,idstory,idpitch) {
	//alert(id)
	//alert(conto)
	var step1 = document.getElementById("myTextarea"+ conto +"").value;

						  
	//alert(step1)
	//var step2 = self.document.formia.myTextarea2.value;
						  
						  $(".spinner").show();
						  $.ajax({
								 url: "https://dev.storymatch.co/storymatch/userstories/update/step",
								 dataType: "json",
								 type: "post",
								 contentType: "application/json",
								 data: JSON.stringify( { "token": ""+ localStorage.getItem("Token") +"", "stepid":""+ id +"","step":""+ step1 +""} ),
								 processData: false,
								 crossDomain: true,
								 success:function(result){
								 
								 if (result.ID==1024){

									editstory3(idstory)
								 
								 }
								 else{
								 navigator.notification.alert(
															  result.msg,  // message
															  alertDismissed,         // callback
															  'Modifica Step',            // title
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

function shuffle(id,conto,idstory,idpitch) {
var locco =  document.getElementById("locco"+ conto +"").value;
var conto2 = conto-1;

						  $(".spinner").show();
						  $.ajax({
								 type:"GET",
								 url:"https://dev.storymatch.co/storymatch/search/steprnd",
								 data: {token:localStorage.getItem("Token"),stepnum:conto2},
								 contentType: "application/json; charset=utf-8",
								 json: 'callback',
								 crossDomain: true,
								 success:function(result){
								 
								 if (result.id!=0){
									if(locco==0){
										document.getElementById("myTextarea"+ conto +"").value = result.step;
										salva(id,conto,idstory,idpitch)
									}
								 }
								 else{
								 navigator.notification.alert(
															  'nessuno step da associare',  // message
															  alertDismissed,         // callback
															  'Shuffle Step',            // title
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

						  
						  
	//alert(step1)
 }
						  

function shuffletotal(id) {
	//var locco1 =  document.getElementById("locco1").value;
	var conto = 1;
						  
			$(".spinner").show();
			$.ajax({
				type:"GET",
				url:"https://dev.storymatch.co/storymatch/search/stepsrnd",
				data: {token:localStorage.getItem("Token")},
				contentType: "application/json; charset=utf-8",
				json: 'callback',
				crossDomain: true,
				success:function(result){

					//alert(result.ID);
					//alert(result.obj["year"]);
				    var fruits = result.obj["steps"]
				   

				   for ( i=0; i < fruits.length; i++ )
				   {
				   
				   //if(fruits[i]["id"]==12){
					  if(document.getElementById("locco"+ conto +"").value==0){
					      //alert(conto + " step:" + fruits[i]["step"].replace("'",""));
					      document.getElementById("myTextarea"+ conto +"").value = fruits[i]["step"].replace("'","");
					   }
				   //
				   
				   
				   conto = conto+1;
				   
				   }
					$(".spinner").hide();
					salvasteps(id,0)
				   
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

						  

function lucchetto(id,conto,idstory,idpitch) {
	//alert(conto);
	//alert(id);
	var locco = document.getElementById("locco"+ conto +"").value;
						
	 if (locco==0) {
	   $("#lock"+ conto +"").removeClass('lucchetto').addClass('lucchetto2');
	   $("#edit"+ conto +"").removeClass('edita2').addClass('edita');
	   document.getElementById("locco"+ conto +"").value = 1;
	   localStorage.setItem("locco"+ conto +"", 1);
	   localStorage.setItem("myTextarea"+ conto +"", document.getElementById("myTextarea"+ conto +"").value);
	   document.getElementById("myTextarea"+ conto +"").readOnly = true;
	   salva(id,conto,idstory,idpitch)
						  
	   //alert(localStorage.getItem("locco"+ conto +""))
	   //alert(localStorage.getItem("myTextarea"+ conto +""))
	 }
	else{
		$("#lock"+ conto +"").removeClass('lucchetto2').addClass('lucchetto');
		document.getElementById("locco"+ conto +"").value = 0;
		localStorage.setItem("locco"+ conto +"", 0);
		localStorage.setItem("myTextarea"+ conto +"", 0);
		document.getElementById("myTextarea"+ conto +"").readOnly = true;
						  
		//alert(localStorage.getItem("locco"+ conto +""))
		//alert(localStorage.getItem("myTextarea"+ conto +""))
	}
						  

 }
						  
						  
						  
						  
						  function abilita1() {
						  
						  var locco =  document.getElementById("locco1").value;
						  
						  if(locco==0){
						  document.getElementById("myTextarea1").readOnly = false;
						  $("#edit1").removeClass('edita').addClass('edita2');
						  
						  $(function() {
							var data = $("#myTextarea1").val();
							var emoticon = ' ';
							$("#myTextarea1").focus();
							$("#myTextarea1").val(data + emoticon);
						  });
						  
						  $("#sin1").attr("href", "javascript:undor()");
						  $("#des1").attr("href", "javascript:redor()");
						  }
						  
						  document.getElementById("myTextarea2").readOnly = true;
						  document.getElementById("myTextarea3").readOnly = true;
						  document.getElementById("myTextarea4").readOnly = true;
						  document.getElementById("myTextarea5").readOnly = true;
						  document.getElementById("myTextarea6").readOnly = true;
						  document.getElementById("myTextarea7").readOnly = true;
						  document.getElementById("myTextarea8").readOnly = true;
						  document.getElementById("myTextarea9").readOnly = true;
						  document.getElementById("myTextarea10").readOnly = true;
						  document.getElementById("myTextarea11").readOnly = true;
						  document.getElementById("myTextarea12").readOnly = true;
						  
						  $("#edit2").removeClass('edita2').addClass('edita');
						  $("#edit3").removeClass('edita2').addClass('edita');
						  $("#edit4").removeClass('edita2').addClass('edita');
						  $("#edit5").removeClass('edita2').addClass('edita');
						  $("#edit6").removeClass('edita2').addClass('edita');
						  $("#edit7").removeClass('edita2').addClass('edita');
						  $("#edit8").removeClass('edita2').addClass('edita');
						  $("#edit9").removeClass('edita2').addClass('edita');
						  $("#edit10").removeClass('edita2').addClass('edita');
						  $("#edit11").removeClass('edita2').addClass('edita');
						  $("#edit12").removeClass('edita2').addClass('edita');
						  
						  $("#sin2").attr("href", "#");
						  $("#des2").attr("href", "#");
						  $("#sin3").attr("href", "#");
						  $("#des3").attr("href", "#");
						  $("#sin4").attr("href", "#");
						  $("#des4").attr("href", "#");
						  $("#sin5").attr("href", "#");
						  $("#des5").attr("href", "#");
						  $("#sin6").attr("href", "#");
						  $("#des6").attr("href", "#");
						  $("#sin7").attr("href", "#");
						  $("#des7").attr("href", "#");
						  $("#sin8").attr("href", "#");
						  $("#des8").attr("href", "#");
						  $("#sin9").attr("href", "#");
						  $("#des9").attr("href", "#");
						  $("#sin10").attr("href", "#");
						  $("#des10").attr("href", "#");
						  $("#sin11").attr("href", "#");
						  $("#des11").attr("href", "#");
						  $("#sin12").attr("href", "#");
						  $("#des12").attr("href", "#");
						  
						  
						  }
						  
						  function abilita2() {
						  var locco =  document.getElementById("locco2").value;
						  
						  if(locco==0){
						  $("#edit2").removeClass('edita').addClass('edita2');
						  document.getElementById("myTextarea2").readOnly = false;
						  
						  $(function() {
							var data = $("#myTextarea2").val();
							var emoticon = ' ';
							$("#myTextarea2").focus();
							$("#myTextarea2").val(data + emoticon);
							});
						  
						  $("#sin2").attr("href", "javascript:undor()");
						  $("#des2").attr("href", "javascript:redor()");
						  }
						  
						  document.getElementById("myTextarea1").readOnly = true;
						  document.getElementById("myTextarea3").readOnly = true;
						  document.getElementById("myTextarea4").readOnly = true;
						  document.getElementById("myTextarea5").readOnly = true;
						  document.getElementById("myTextarea6").readOnly = true;
						  document.getElementById("myTextarea7").readOnly = true;
						  document.getElementById("myTextarea8").readOnly = true;
						  document.getElementById("myTextarea9").readOnly = true;
						  document.getElementById("myTextarea10").readOnly = true;
						  document.getElementById("myTextarea11").readOnly = true;
						  document.getElementById("myTextarea12").readOnly = true;
						  
						  $("#edit1").removeClass('edita2').addClass('edita');
						  $("#edit3").removeClass('edita2').addClass('edita');
						  $("#edit4").removeClass('edita2').addClass('edita');
						  $("#edit5").removeClass('edita2').addClass('edita');
						  $("#edit6").removeClass('edita2').addClass('edita');
						  $("#edit7").removeClass('edita2').addClass('edita');
						  $("#edit8").removeClass('edita2').addClass('edita');
						  $("#edit9").removeClass('edita2').addClass('edita');
						  $("#edit10").removeClass('edita2').addClass('edita');
						  $("#edit11").removeClass('edita2').addClass('edita');
						  $("#edit12").removeClass('edita2').addClass('edita');
						  
						  $("#sin1").attr("href", "#");
						  $("#des1").attr("href", "#");
						  $("#sin3").attr("href", "#");
						  $("#des3").attr("href", "#");
						  $("#sin4").attr("href", "#");
						  $("#des4").attr("href", "#");
						  $("#sin5").attr("href", "#");
						  $("#des5").attr("href", "#");
						  $("#sin6").attr("href", "#");
						  $("#des6").attr("href", "#");
						  $("#sin7").attr("href", "#");
						  $("#des7").attr("href", "#");
						  $("#sin8").attr("href", "#");
						  $("#des8").attr("href", "#");
						  $("#sin9").attr("href", "#");
						  $("#des9").attr("href", "#");
						  $("#sin10").attr("href", "#");
						  $("#des10").attr("href", "#");
						  $("#sin11").attr("href", "#");
						  $("#des11").attr("href", "#");
						  $("#sin12").attr("href", "#");
						  $("#des12").attr("href", "#");
						  }
						  
						  function abilita3() {
						  var locco =  document.getElementById("locco3").value;
						  
						  if(locco==0){
						  $("#edit3").removeClass('edita').addClass('edita2');
						  document.getElementById("myTextarea3").readOnly = false;
						  
						  $(function() {
							var data = $("#myTextarea3").val();
							var emoticon = ' ';
							$("#myTextarea3").focus();
							$("#myTextarea3").val(data + emoticon);
							});
						  
						  $("#sin3").attr("href", "javascript:undor()");
						  $("#des3").attr("href", "javascript:redor()");
						  }
						  
						  document.getElementById("myTextarea2").readOnly = true;
						  document.getElementById("myTextarea1").readOnly = true;
						  document.getElementById("myTextarea4").readOnly = true;
						  document.getElementById("myTextarea5").readOnly = true;
						  document.getElementById("myTextarea6").readOnly = true;
						  document.getElementById("myTextarea7").readOnly = true;
						  document.getElementById("myTextarea8").readOnly = true;
						  document.getElementById("myTextarea9").readOnly = true;
						  document.getElementById("myTextarea10").readOnly = true;
						  document.getElementById("myTextarea11").readOnly = true;
						  document.getElementById("myTextarea12").readOnly = true;
						  
						  $("#edit1").removeClass('edita2').addClass('edita');
						  $("#edit2").removeClass('edita2').addClass('edita');
						  $("#edit4").removeClass('edita2').addClass('edita');
						  $("#edit5").removeClass('edita2').addClass('edita');
						  $("#edit6").removeClass('edita2').addClass('edita');
						  $("#edit7").removeClass('edita2').addClass('edita');
						  $("#edit8").removeClass('edita2').addClass('edita');
						  $("#edit9").removeClass('edita2').addClass('edita');
						  $("#edit10").removeClass('edita2').addClass('edita');
						  $("#edit11").removeClass('edita2').addClass('edita');
						  $("#edit12").removeClass('edita2').addClass('edita');
						  
						  $("#sin1").attr("href", "#");
						  $("#des1").attr("href", "#");
						  $("#sin2").attr("href", "#");
						  $("#des2").attr("href", "#");
						  $("#sin4").attr("href", "#");
						  $("#des4").attr("href", "#");
						  $("#sin5").attr("href", "#");
						  $("#des5").attr("href", "#");
						  $("#sin6").attr("href", "#");
						  $("#des6").attr("href", "#");
						  $("#sin7").attr("href", "#");
						  $("#des7").attr("href", "#");
						  $("#sin8").attr("href", "#");
						  $("#des8").attr("href", "#");
						  $("#sin9").attr("href", "#");
						  $("#des9").attr("href", "#");
						  $("#sin10").attr("href", "#");
						  $("#des10").attr("href", "#");
						  $("#sin11").attr("href", "#");
						  $("#des11").attr("href", "#");
						  $("#sin12").attr("href", "#");
						  $("#des12").attr("href", "#");
						  }
						  
						  function abilita4() {
						  var locco =  document.getElementById("locco4").value;
						  
						  if(locco==0){
						  $("#edit4").removeClass('edita').addClass('edita2');
						  document.getElementById("myTextarea4").readOnly = false;
						  
						  $(function() {
							var data = $("#myTextarea4").val();
							var emoticon = ' ';
							$("#myTextarea4").focus();
							$("#myTextarea4").val(data + emoticon);
							});
						  
						  $(function() {
							var data = $("#myTextarea4").val();
							$("#myTextarea4").focus();
							$("#myTextarea4").val(data);
							});
						  
						  $("#sin4").attr("href", "javascript:undor()");
						  $("#des4").attr("href", "javascript:redor()");
						  }
						  
						  document.getElementById("myTextarea2").readOnly = true;
						  document.getElementById("myTextarea1").readOnly = true;
						  document.getElementById("myTextarea3").readOnly = true;
						  document.getElementById("myTextarea5").readOnly = true;
						  document.getElementById("myTextarea6").readOnly = true;
						  document.getElementById("myTextarea7").readOnly = true;
						  document.getElementById("myTextarea8").readOnly = true;
						  document.getElementById("myTextarea9").readOnly = true;
						  document.getElementById("myTextarea10").readOnly = true;
						  document.getElementById("myTextarea11").readOnly = true;
						  document.getElementById("myTextarea12").readOnly = true;
						  
						  $("#edit1").removeClass('edita2').addClass('edita');
						  $("#edit3").removeClass('edita2').addClass('edita');
						  $("#edit2").removeClass('edita2').addClass('edita');
						  $("#edit5").removeClass('edita2').addClass('edita');
						  $("#edit6").removeClass('edita2').addClass('edita');
						  $("#edit7").removeClass('edita2').addClass('edita');
						  $("#edit8").removeClass('edita2').addClass('edita');
						  $("#edit9").removeClass('edita2').addClass('edita');
						  $("#edit10").removeClass('edita2').addClass('edita');
						  $("#edit11").removeClass('edita2').addClass('edita');
						  $("#edit12").removeClass('edita2').addClass('edita');
						  
						  $("#sin1").attr("href", "#");
						  $("#des1").attr("href", "#");
						  $("#sin2").attr("href", "#");
						  $("#des2").attr("href", "#");
						  $("#sin3").attr("href", "#");
						  $("#des3").attr("href", "#");
						  $("#sin5").attr("href", "#");
						  $("#des5").attr("href", "#");
						  $("#sin6").attr("href", "#");
						  $("#des6").attr("href", "#");
						  $("#sin7").attr("href", "#");
						  $("#des7").attr("href", "#");
						  $("#sin8").attr("href", "#");
						  $("#des8").attr("href", "#");
						  $("#sin9").attr("href", "#");
						  $("#des9").attr("href", "#");
						  $("#sin10").attr("href", "#");
						  $("#des10").attr("href", "#");
						  $("#sin11").attr("href", "#");
						  $("#des11").attr("href", "#");
						  $("#sin12").attr("href", "#");
						  $("#des12").attr("href", "#");
						  }
						  
						  function abilita5() {
						  var locco =  document.getElementById("locco5").value;
						  
						  if(locco==0){
						  $("#edit5").removeClass('edita').addClass('edita2');
						  document.getElementById("myTextarea5").readOnly = false;
						  
						  $("#sin5").attr("href", "javascript:undor()");
						  $("#des5").attr("href", "javascript:redor()");
						  }
						  
						  $(function() {
							var data = $("#myTextarea5").val();
							var emoticon = ' ';
							$("#myTextarea5").focus();
							$("#myTextarea5").val(data + emoticon);
							});
						  
						  document.getElementById("myTextarea2").readOnly = true;
						  document.getElementById("myTextarea1").readOnly = true;
						  document.getElementById("myTextarea3").readOnly = true;
						  document.getElementById("myTextarea4").readOnly = true;
						  document.getElementById("myTextarea6").readOnly = true;
						  document.getElementById("myTextarea7").readOnly = true;
						  document.getElementById("myTextarea8").readOnly = true;
						  document.getElementById("myTextarea9").readOnly = true;
						  document.getElementById("myTextarea10").readOnly = true;
						  document.getElementById("myTextarea11").readOnly = true;
						  document.getElementById("myTextarea12").readOnly = true;
						  
						  $("#edit1").removeClass('edita2').addClass('edita');
						  $("#edit3").removeClass('edita2').addClass('edita');
						  $("#edit4").removeClass('edita2').addClass('edita');
						  $("#edit2").removeClass('edita2').addClass('edita');
						  $("#edit6").removeClass('edita2').addClass('edita');
						  $("#edit7").removeClass('edita2').addClass('edita');
						  $("#edit8").removeClass('edita2').addClass('edita');
						  $("#edit9").removeClass('edita2').addClass('edita');
						  $("#edit10").removeClass('edita2').addClass('edita');
						  $("#edit11").removeClass('edita2').addClass('edita');
						  $("#edit12").removeClass('edita2').addClass('edita');
						  
						  $("#sin1").attr("href", "#");
						  $("#des1").attr("href", "#");
						  $("#sin2").attr("href", "#");
						  $("#des2").attr("href", "#");
						  $("#sin3").attr("href", "#");
						  $("#des3").attr("href", "#");
						  $("#sin4").attr("href", "#");
						  $("#des4").attr("href", "#");
						  $("#sin6").attr("href", "#");
						  $("#des6").attr("href", "#");
						  $("#sin7").attr("href", "#");
						  $("#des7").attr("href", "#");
						  $("#sin8").attr("href", "#");
						  $("#des8").attr("href", "#");
						  $("#sin9").attr("href", "#");
						  $("#des9").attr("href", "#");
						  $("#sin10").attr("href", "#");
						  $("#des10").attr("href", "#");
						  $("#sin11").attr("href", "#");
						  $("#des11").attr("href", "#");
						  $("#sin12").attr("href", "#");
						  $("#des12").attr("href", "#");
						  }
						  
						  function abilita6() {
						  var locco =  document.getElementById("locco6").value;
						  
						  if(locco==0){
						  $("#edit6").removeClass('edita').addClass('edita2');
						  document.getElementById("myTextarea6").readOnly = false;
						  
						  $(function() {
							var data = $("#myTextarea6").val();
							var emoticon = ' ';
							$("#myTextarea6").focus();
							$("#myTextarea6").val(data + emoticon);
							});
						  
						  $("#sin6").attr("href", "javascript:undor()");
						  $("#des6").attr("href", "javascript:redor()");
						  }
						  
						  document.getElementById("myTextarea2").readOnly = true;
						  document.getElementById("myTextarea1").readOnly = true;
						  document.getElementById("myTextarea3").readOnly = true;
						  document.getElementById("myTextarea5").readOnly = true;
						  document.getElementById("myTextarea4").readOnly = true;
						  document.getElementById("myTextarea7").readOnly = true;
						  document.getElementById("myTextarea8").readOnly = true;
						  document.getElementById("myTextarea9").readOnly = true;
						  document.getElementById("myTextarea10").readOnly = true;
						  document.getElementById("myTextarea11").readOnly = true;
						  document.getElementById("myTextarea12").readOnly = true;
						  
						  $("#edit1").removeClass('edita2').addClass('edita');
						  $("#edit3").removeClass('edita2').addClass('edita');
						  $("#edit4").removeClass('edita2').addClass('edita');
						  $("#edit5").removeClass('edita2').addClass('edita');
						  $("#edit2").removeClass('edita2').addClass('edita');
						  $("#edit7").removeClass('edita2').addClass('edita');
						  $("#edit8").removeClass('edita2').addClass('edita');
						  $("#edit9").removeClass('edita2').addClass('edita');
						  $("#edit10").removeClass('edita2').addClass('edita');
						  $("#edit11").removeClass('edita2').addClass('edita');
						  $("#edit12").removeClass('edita2').addClass('edita');
						  
						  $("#sin1").attr("href", "#");
						  $("#des1").attr("href", "#");
						  $("#sin2").attr("href", "#");
						  $("#des2").attr("href", "#");
						  $("#sin3").attr("href", "#");
						  $("#des3").attr("href", "#");
						  $("#sin5").attr("href", "#");
						  $("#des5").attr("href", "#");
						  $("#sin4").attr("href", "#");
						  $("#des4").attr("href", "#");
						  $("#sin7").attr("href", "#");
						  $("#des7").attr("href", "#");
						  $("#sin8").attr("href", "#");
						  $("#des8").attr("href", "#");
						  $("#sin9").attr("href", "#");
						  $("#des9").attr("href", "#");
						  $("#sin10").attr("href", "#");
						  $("#des10").attr("href", "#");
						  $("#sin11").attr("href", "#");
						  $("#des11").attr("href", "#");
						  $("#sin12").attr("href", "#");
						  $("#des12").attr("href", "#");
						  }
						  
						  function abilita7() {
						  var locco =  document.getElementById("locco7").value;
						  
						  if(locco==0){
						  $("#edit7").removeClass('edita').addClass('edita2');
						  document.getElementById("myTextarea7").readOnly = false;
						  
						  $(function() {
							var data = $("#myTextarea7").val();
							var emoticon = ' ';
							$("#myTextarea7").focus();
							$("#myTextarea7").val(data + emoticon);
							});
						  
						  $("#sin7").attr("href", "javascript:undor()");
						  $("#des7").attr("href", "javascript:redor()");
						  }
						  
						  document.getElementById("myTextarea2").readOnly = true;
						  document.getElementById("myTextarea1").readOnly = true;
						  document.getElementById("myTextarea3").readOnly = true;
						  document.getElementById("myTextarea5").readOnly = true;
						  document.getElementById("myTextarea6").readOnly = true;
						  document.getElementById("myTextarea4").readOnly = true;
						  document.getElementById("myTextarea8").readOnly = true;
						  document.getElementById("myTextarea9").readOnly = true;
						  document.getElementById("myTextarea10").readOnly = true;
						  document.getElementById("myTextarea11").readOnly = true;
						  document.getElementById("myTextarea12").readOnly = true;
						  
						  $("#edit1").removeClass('edita2').addClass('edita');
						  $("#edit3").removeClass('edita2').addClass('edita');
						  $("#edit4").removeClass('edita2').addClass('edita');
						  $("#edit5").removeClass('edita2').addClass('edita');
						  $("#edit6").removeClass('edita2').addClass('edita');
						  $("#edit2").removeClass('edita2').addClass('edita');
						  $("#edit8").removeClass('edita2').addClass('edita');
						  $("#edit9").removeClass('edita2').addClass('edita');
						  $("#edit10").removeClass('edita2').addClass('edita');
						  $("#edit11").removeClass('edita2').addClass('edita');
						  $("#edit12").removeClass('edita2').addClass('edita');
						  
						  $("#sin1").attr("href", "#");
						  $("#des1").attr("href", "#");
						  $("#sin2").attr("href", "#");
						  $("#des2").attr("href", "#");
						  $("#sin3").attr("href", "#");
						  $("#des3").attr("href", "#");
						  $("#sin5").attr("href", "#");
						  $("#des5").attr("href", "#");
						  $("#sin6").attr("href", "#");
						  $("#des6").attr("href", "#");
						  $("#sin4").attr("href", "#");
						  $("#des4").attr("href", "#");
						  $("#sin8").attr("href", "#");
						  $("#des8").attr("href", "#");
						  $("#sin9").attr("href", "#");
						  $("#des9").attr("href", "#");
						  $("#sin10").attr("href", "#");
						  $("#des10").attr("href", "#");
						  $("#sin11").attr("href", "#");
						  $("#des11").attr("href", "#");
						  $("#sin12").attr("href", "#");
						  $("#des12").attr("href", "#");
						  }
						  
						  function abilita8() {
						  $("#edit8").removeClass('edita').addClass('edita2');
						  var locco =  document.getElementById("locco8").value;
						  
						  $(function() {
							var data = $("#myTextarea8").val();
							var emoticon = ' ';
							$("#myTextarea8").focus();
							$("#myTextarea8").val(data + emoticon);
							});
						  
						  if(locco==0){
						  document.getElementById("myTextarea8").readOnly = false;
						  
						  $("#sin8").attr("href", "javascript:undor()");
						  $("#des8").attr("href", "javascript:redor()");
						  }
						  
						  document.getElementById("myTextarea2").readOnly = true;
						  document.getElementById("myTextarea1").readOnly = true;
						  document.getElementById("myTextarea3").readOnly = true;
						  document.getElementById("myTextarea5").readOnly = true;
						  document.getElementById("myTextarea6").readOnly = true;
						  document.getElementById("myTextarea7").readOnly = true;
						  document.getElementById("myTextarea4").readOnly = true;
						  document.getElementById("myTextarea9").readOnly = true;
						  document.getElementById("myTextarea10").readOnly = true;
						  document.getElementById("myTextarea11").readOnly = true;
						  document.getElementById("myTextarea12").readOnly = true;
						  
						  $("#edit1").removeClass('edita2').addClass('edita');
						  $("#edit3").removeClass('edita2').addClass('edita');
						  $("#edit4").removeClass('edita2').addClass('edita');
						  $("#edit5").removeClass('edita2').addClass('edita');
						  $("#edit6").removeClass('edita2').addClass('edita');
						  $("#edit7").removeClass('edita2').addClass('edita');
						  $("#edit2").removeClass('edita2').addClass('edita');
						  $("#edit9").removeClass('edita2').addClass('edita');
						  $("#edit10").removeClass('edita2').addClass('edita');
						  $("#edit11").removeClass('edita2').addClass('edita');
						  $("#edit12").removeClass('edita2').addClass('edita');
						  
						  $("#sin1").attr("href", "#");
						  $("#des1").attr("href", "#");
						  $("#sin2").attr("href", "#");
						  $("#des2").attr("href", "#");
						  $("#sin3").attr("href", "#");
						  $("#des3").attr("href", "#");
						  $("#sin5").attr("href", "#");
						  $("#des5").attr("href", "#");
						  $("#sin6").attr("href", "#");
						  $("#des6").attr("href", "#");
						  $("#sin7").attr("href", "#");
						  $("#des7").attr("href", "#");
						  $("#sin4").attr("href", "#");
						  $("#des4").attr("href", "#");
						  $("#sin9").attr("href", "#");
						  $("#des9").attr("href", "#");
						  $("#sin10").attr("href", "#");
						  $("#des10").attr("href", "#");
						  $("#sin11").attr("href", "#");
						  $("#des11").attr("href", "#");
						  $("#sin12").attr("href", "#");
						  $("#des12").attr("href", "#");
						  }
						  
						  function abilita9() {
						  var locco =  document.getElementById("locco9").value;
						  
						  if(locco==0){
						  $("#edit9").removeClass('edita').addClass('edita2');
						  document.getElementById("myTextarea9").readOnly = false;
						  
						  $(function() {
							var data = $("#myTextarea9").val();
							var emoticon = ' ';
							$("#myTextarea9").focus();
							$("#myTextarea9").val(data + emoticon);
							});
						  
						  $("#sin9").attr("href", "javascript:undor()");
						  $("#des9").attr("href", "javascript:redor()");
						  }
						  
						  document.getElementById("myTextarea2").readOnly = true;
						  document.getElementById("myTextarea1").readOnly = true;
						  document.getElementById("myTextarea3").readOnly = true;
						  document.getElementById("myTextarea5").readOnly = true;
						  document.getElementById("myTextarea6").readOnly = true;
						  document.getElementById("myTextarea7").readOnly = true;
						  document.getElementById("myTextarea8").readOnly = true;
						  document.getElementById("myTextarea4").readOnly = true;
						  document.getElementById("myTextarea10").readOnly = true;
						  document.getElementById("myTextarea11").readOnly = true;
						  document.getElementById("myTextarea12").readOnly = true;
						  
						  $("#edit1").removeClass('edita2').addClass('edita');
						  $("#edit3").removeClass('edita2').addClass('edita');
						  $("#edit4").removeClass('edita2').addClass('edita');
						  $("#edit5").removeClass('edita2').addClass('edita');
						  $("#edit6").removeClass('edita2').addClass('edita');
						  $("#edit7").removeClass('edita2').addClass('edita');
						  $("#edit8").removeClass('edita2').addClass('edita');
						  $("#edit2").removeClass('edita2').addClass('edita');
						  $("#edit10").removeClass('edita2').addClass('edita');
						  $("#edit11").removeClass('edita2').addClass('edita');
						  $("#edit12").removeClass('edita2').addClass('edita');
						  
						  $("#sin1").attr("href", "#");
						  $("#des1").attr("href", "#");
						  $("#sin2").attr("href", "#");
						  $("#des2").attr("href", "#");
						  $("#sin3").attr("href", "#");
						  $("#des3").attr("href", "#");
						  $("#sin5").attr("href", "#");
						  $("#des5").attr("href", "#");
						  $("#sin6").attr("href", "#");
						  $("#des6").attr("href", "#");
						  $("#sin7").attr("href", "#");
						  $("#des7").attr("href", "#");
						  $("#sin8").attr("href", "#");
						  $("#des8").attr("href", "#");
						  $("#sin4").attr("href", "#");
						  $("#des4").attr("href", "#");
						  $("#sin10").attr("href", "#");
						  $("#des10").attr("href", "#");
						  $("#sin11").attr("href", "#");
						  $("#des11").attr("href", "#");
						  $("#sin12").attr("href", "#");
						  $("#des12").attr("href", "#");
						  }
						  
						  function abilita10() {
						  var locco =  document.getElementById("locco10").value;
						  
						  if(locco==0){
						  $("#edit10").removeClass('edita').addClass('edita2');
						  document.getElementById("myTextarea10").readOnly = false;
						  
						  $(function() {
							var data = $("#myTextarea10").val();
							var emoticon = ' ';
							$("#myTextarea10").focus();
							$("#myTextarea10").val(data + emoticon);
							});
						  
						  $("#sin10").attr("href", "javascript:undor()");
						  $("#des10").attr("href", "javascript:redor()");
						  }
						  
						  document.getElementById("myTextarea2").readOnly = true;
						  document.getElementById("myTextarea1").readOnly = true;
						  document.getElementById("myTextarea3").readOnly = true;
						  document.getElementById("myTextarea5").readOnly = true;
						  document.getElementById("myTextarea6").readOnly = true;
						  document.getElementById("myTextarea7").readOnly = true;
						  document.getElementById("myTextarea8").readOnly = true;
						  document.getElementById("myTextarea9").readOnly = true;
						  document.getElementById("myTextarea4").readOnly = true;
						  document.getElementById("myTextarea11").readOnly = true;
						  document.getElementById("myTextarea12").readOnly = true;
						  
						  $("#edit1").removeClass('edita2').addClass('edita');
						  $("#edit3").removeClass('edita2').addClass('edita');
						  $("#edit4").removeClass('edita2').addClass('edita');
						  $("#edit5").removeClass('edita2').addClass('edita');
						  $("#edit6").removeClass('edita2').addClass('edita');
						  $("#edit7").removeClass('edita2').addClass('edita');
						  $("#edit8").removeClass('edita2').addClass('edita');
						  $("#edit9").removeClass('edita2').addClass('edita');
						  $("#edit2").removeClass('edita2').addClass('edita');
						  $("#edit11").removeClass('edita2').addClass('edita');
						  $("#edit12").removeClass('edita2').addClass('edita');
						  
						  $("#sin1").attr("href", "#");
						  $("#des1").attr("href", "#");
						  $("#sin2").attr("href", "#");
						  $("#des2").attr("href", "#");
						  $("#sin3").attr("href", "#");
						  $("#des3").attr("href", "#");
						  $("#sin5").attr("href", "#");
						  $("#des5").attr("href", "#");
						  $("#sin6").attr("href", "#");
						  $("#des6").attr("href", "#");
						  $("#sin7").attr("href", "#");
						  $("#des7").attr("href", "#");
						  $("#sin8").attr("href", "#");
						  $("#des8").attr("href", "#");
						  $("#sin9").attr("href", "#");
						  $("#des9").attr("href", "#");
						  $("#sin4").attr("href", "#");
						  $("#des4").attr("href", "#");
						  $("#sin11").attr("href", "#");
						  $("#des11").attr("href", "#");
						  $("#sin12").attr("href", "#");
						  $("#des12").attr("href", "#");
						  }
						  
						  function abilita11() {
						  var locco =  document.getElementById("locco11").value;
						  
						  if(locco==0){
						  $("#edit11").removeClass('edita').addClass('edita2');
						  document.getElementById("myTextarea11").readOnly = false;
						  
						  $(function() {
							var data = $("#myTextarea11").val();
							var emoticon = ' ';
							$("#myTextarea11").focus();
							$("#myTextarea11").val(data + emoticon);
							});
						  
						  $("#sin11").attr("href", "javascript:undor()");
						  $("#des11").attr("href", "javascript:redor()");
						  }
						  
						  document.getElementById("myTextarea2").readOnly = true;
						  document.getElementById("myTextarea1").readOnly = true;
						  document.getElementById("myTextarea3").readOnly = true;
						  document.getElementById("myTextarea5").readOnly = true;
						  document.getElementById("myTextarea6").readOnly = true;
						  document.getElementById("myTextarea7").readOnly = true;
						  document.getElementById("myTextarea8").readOnly = true;
						  document.getElementById("myTextarea9").readOnly = true;
						  document.getElementById("myTextarea10").readOnly = true;
						  document.getElementById("myTextarea4").readOnly = true;
						  document.getElementById("myTextarea12").readOnly = true;
						  
						  $("#edit1").removeClass('edita2').addClass('edita');
						  $("#edit3").removeClass('edita2').addClass('edita');
						  $("#edit4").removeClass('edita2').addClass('edita');
						  $("#edit5").removeClass('edita2').addClass('edita');
						  $("#edit6").removeClass('edita2').addClass('edita');
						  $("#edit7").removeClass('edita2').addClass('edita');
						  $("#edit8").removeClass('edita2').addClass('edita');
						  $("#edit9").removeClass('edita2').addClass('edita');
						  $("#edit10").removeClass('edita2').addClass('edita');
						  $("#edit2").removeClass('edita2').addClass('edita');
						  $("#edit12").removeClass('edita2').addClass('edita');
						  
						  $("#sin1").attr("href", "#");
						  $("#des1").attr("href", "#");
						  $("#sin2").attr("href", "#");
						  $("#des2").attr("href", "#");
						  $("#sin3").attr("href", "#");
						  $("#des3").attr("href", "#");
						  $("#sin5").attr("href", "#");
						  $("#des5").attr("href", "#");
						  $("#sin6").attr("href", "#");
						  $("#des6").attr("href", "#");
						  $("#sin7").attr("href", "#");
						  $("#des7").attr("href", "#");
						  $("#sin8").attr("href", "#");
						  $("#des8").attr("href", "#");
						  $("#sin9").attr("href", "#");
						  $("#des9").attr("href", "#");
						  $("#sin10").attr("href", "#");
						  $("#des10").attr("href", "#");
						  $("#sin4").attr("href", "#");
						  $("#des4").attr("href", "#");
						  $("#sin12").attr("href", "#");
						  $("#des12").attr("href", "#");
						  }
						  
						  function abilita12() {
						  var locco =  document.getElementById("locco12").value;
						  
						  if(locco==0){
						  $("#edit12").removeClass('edita').addClass('edita2');
						  document.getElementById("myTextarea12").readOnly = false;
						  
						  $(function() {
							var data = $("#myTextarea12").val();
							var emoticon = ' ';
							$("#myTextarea12").focus();
							$("#myTextarea12").val(data + emoticon);
							});
						  
						  $("#sin12").attr("href", "javascript:undor()");
						  $("#des12").attr("href", "javascript:redor()");
						  }
						  
						  document.getElementById("myTextarea2").readOnly = true;
						  document.getElementById("myTextarea1").readOnly = true;
						  document.getElementById("myTextarea3").readOnly = true;
						  document.getElementById("myTextarea5").readOnly = true;
						  document.getElementById("myTextarea6").readOnly = true;
						  document.getElementById("myTextarea7").readOnly = true;
						  document.getElementById("myTextarea8").readOnly = true;
						  document.getElementById("myTextarea9").readOnly = true;
						  document.getElementById("myTextarea10").readOnly = true;
						  document.getElementById("myTextarea11").readOnly = true;
						  document.getElementById("myTextarea4").readOnly = true;
						  
						  $("#edit1").removeClass('edita2').addClass('edita');
						  $("#edit3").removeClass('edita2').addClass('edita');
						  $("#edit4").removeClass('edita2').addClass('edita');
						  $("#edit5").removeClass('edita2').addClass('edita');
						  $("#edit6").removeClass('edita2').addClass('edita');
						  $("#edit7").removeClass('edita2').addClass('edita');
						  $("#edit8").removeClass('edita2').addClass('edita');
						  $("#edit9").removeClass('edita2').addClass('edita');
						  $("#edit10").removeClass('edita2').addClass('edita');
						  $("#edit11").removeClass('edita2').addClass('edita');
						  $("#edit2").removeClass('edita2').addClass('edita');
						  
						  $("#sin1").attr("href", "#");
						  $("#des1").attr("href", "#");
						  $("#sin2").attr("href", "#");
						  $("#des2").attr("href", "#");
						  $("#sin3").attr("href", "#");
						  $("#des3").attr("href", "#");
						  $("#sin5").attr("href", "#");
						  $("#des5").attr("href", "#");
						  $("#sin6").attr("href", "#");
						  $("#des6").attr("href", "#");
						  $("#sin7").attr("href", "#");
						  $("#des7").attr("href", "#");
						  $("#sin8").attr("href", "#");
						  $("#des8").attr("href", "#");
						  $("#sin9").attr("href", "#");
						  $("#des9").attr("href", "#");
						  $("#sin10").attr("href", "#");
						  $("#des10").attr("href", "#");
						  $("#sin11").attr("href", "#");
						  $("#des11").attr("href", "#");
						  $("#sin4").attr("href", "#");
						  $("#des4").attr("href", "#");
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








