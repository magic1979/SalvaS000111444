document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
	//document.addEventListener("resume", onResume, false);
	
	var width = screen.width;
	var height = screen.height;
	
	
	if(width > 500 && width < 640){
		$(".myTableStyle").attr("width", "200px")
	}
	
	var hoverDelay = $.mobile.buttonMarkup.hoverDelay = 0;
	
	$.support.cors = true;
	$.mobile.allowCrossDomainPages = true;
	$.mobile.phonegapNavigationEnabled = true
	$.mobile.pushStateEnabled = false;
	
	$.mobile.defaultPageTransition = 'none';
	$.mobile.defaultDialogTransition = 'none';
	
	$(function() {
	  FastClick.attach(document.body);
	  });
	
	$('body').on('touchmove', function (e) {
		e.preventDefault();
	});

    $(".spinner").hide();
	var Token;
	
	setTimeout (function(){
		//document.getElementById("test1").click();
	}, 500);
	
	var IDPage = getParameterByName('id');
	
	var connectionStatus = false;
	connectionStatus = navigator.onLine ? 'online' : 'offline';
	
	if(connectionStatus=='online'){
		verificatoken()
		$("#VerConnessione").hide()
		
		notifiche()
		
		if (IDPage==2){
			vedicrediti()
		}
		else{
			listaStory()
		}

		
		setTimeout (function(){
			$("#menu1").fadeIn()
		}, 300);
		
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
	
	$(function() {
	  $("#riga").on("click", function() {
			Showabbonamento()
		});
	  
	});
	
	
	
}

function closemenu() {
	
	$("#myTable").removeClass("myTableStyle2").addClass("myTableStyle");
	$("#num1").fadeIn()
	$("#num2").fadeIn()
	$("#abbonamento").hide()
	$("#crediti").hide()
	
	window.location.href = "swip2.html";
}

function closeabbonamento() {
	
	$("#myTable").removeClass("myTableStyle").addClass("myTableStyle2");
	$("#num1").hide()
	$("#num2").hide()
	$("#abbonamento").hide()
	$("#crediti").fadeIn()
}

function Showabbonamento() {
	
	$("#myTable").removeClass("myTableStyle").addClass("myTableStyle2");
	$("#num1").hide()
	$("#num2").hide()
	$("#abbonamento").fadeIn()
	$("#crediti").hide()

}

function createstory() {
	navigator.notification.prompt(
								  'Insert Name',  // message
								  onPrompt,                  // callback to invoke
								  'Create Story',            // title
								  ['Invia','Annulla'],             // buttonLabels
								  ''                 // defaultText
								  );
}

function onPrompt(results) {
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
											'Errore',            // title
											'OK'                  // buttonName
											);
			   
			   },
			   dataType:"json"});*/
		
		var connectionStatus = false;
		connectionStatus = navigator.onLine ? 'online' : 'offline';
		
		if(connectionStatus=='online'){
		
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
											'possible network error 3',  // message
											alertDismissed,         // callback
											'Error',            // title
											'OK'                  // buttonName
											);
			   
			   },
			   dataType:"json"});
		
		}
		else{
			navigator.notification.alert(
											'possible network error 4',  // message
											alertDismissed,         // callback
											'Error',            // title
											'OK'                  // buttonName
											);
		}
		
	}
	
}


function verificatoken() {
	var Token = localStorage.getItem("Token");
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"https://staging.storymatch.co/storymatch/authentication/validatetoken",
		   data: {token:Token},
		   contentType: "application/json; charset=utf-8",
		   json: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   if (result.ID==1024){
			 //OK
			 $(".spinner").hide();
			 $("#emailutente").html(localStorage.getItem("email"));
		   
			 
		   
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
										'possible network error 5',  // message
										alertDismissed,         // callback
										'Error',            // title
										'OK'                  // buttonName
										);
		   window.location.href = "index.html";
		   
		   },
		   dataType:"json"});
	
}

function esempio(){
	var conta = 1;
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"http://5.249.157.197:9000/storymatchsearch/stepsbyid",
		   data: {ID:2},
		   contentType: "application/json; charset=utf-8",
		   json: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   alert("Title: " + result.title);
		   
		   $.each(result.characters, function(i,item){
				  var fruits = item.detail["steps"]
				  
				  alert("Pitch:" + item.detail["pitch"])
				  
				  //alert("stepsID: " + fruits[0]["id"]);
				  
				  alert(fruits.length);
				  
				  for ( i=0; i < fruits.length; i++ )
				  {
				  
					if(fruits[i]["id"]==49){
					  //alert(fruits[i]["step"]);
				    }
					
					if((conta==1)||(conta==2)){
				       alert(fruits[i]["step"]);
					}
				  
				  conta = conta+1;
				  }
				  
				   //alert(item.detail["steps"]);
				  });
		   
		   },
		   error: function(){
		   $(".spinner").hide();
		   
		   navigator.notification.alert(
										'possible network error 6',  // message
										alertDismissed,         // callback
										'Error',            // title
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

function exitapp() {
	 window.location.href = "index.html";
}

function LogOut() {
	
	$(".spinner").show();
	$.ajax({
		   url: "https://staging.storymatch.co/storymatch/authentication/logout",
		   dataType: "json",
		   type: "post",
		   contentType: "application/json",
		   data: JSON.stringify( { "token": ""+ localStorage.getItem("Token") +""} ),
		   processData: false,
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
		   
		   window.location.href = "index.html";
		   }
		   
		   $(".spinner").hide();
		   
		   },
		   error: function(){
		   $(".spinner").hide();
		   
		   navigator.notification.alert(
										'possible network error 7',  // message
										alertDismissed,         // callback
										'Error',            // title
										'OK'                  // buttonName
										);
		   
		   },
		   dataType:"json"});

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


function onResume() {
	onDeviceReady();
}

function alertDismissed() {
	
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

function vedi() {
	$("#framme").show()
}

function novedi() {
	$("#framme").hide()
}

function VerificaConnessione() {
	onDeviceReady();
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
										'possible network error',  // message
										alertDismissed,         // callback
										'Error',            // title
										'OK'                  // buttonName
										);
		   
		   },
		   dataType:"json"});
	
	
	//$("#badde").removeClass("badge1").addClass("badge2"); @
	
	//$("#badde").attr("data-badge", Badge10);
	
	
}

function vedicrediti() {
	$("#myTable").removeClass("myTableStyle").addClass("myTableStyle2");
	$("#num1").hide()
	$("#num2").hide()
	$("#abbonamento").hide()
	$("#crediti").fadeIn()
}

function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
						  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
						  results = regex.exec(location.search);
						  return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
						  }
						  
						  
						  function listaStory() {
						  
						  
						  $(".spinner").show();
						  $.ajax({
								 type:"GET",
								 url:"https://staging.storymatch.co/storymatch/userstories/list",
								 data: {token:localStorage.getItem("Token")},
								 contentType: "application/json; charset=utf-8",
								 json: 'callback',
								 crossDomain: true,
								 success:function(result){
								 
								 $.each(result, function(i,item){
										
									if (result.id!=0){
										//alert("go 2")
										window.location.href = "swip2.html";
									}
									else{
										//listaShare();
									}
										
										
								});
								 
								 
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

