document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
	document.addEventListener("resume", onResume, false);
	
	var hoverDelay = $.mobile.buttonMarkup.hoverDelay = 0;
	
	$.mobile.defaultPageTransition = 'none';
	$.mobile.defaultDialogTransition = 'none';

    $(".spinner").hide();
	var Token;
	
	setTimeout (function(){
		document.getElementById('test1').click();
	}, 500);
	
	iframme();
	
	var connectionStatus = false;
	connectionStatus = navigator.onLine ? 'online' : 'offline';
	
	if(connectionStatus=='online'){
		//Verifica Token
		
		verificatoken()
	}
	else{
	 // Che Faccio
	}
	
}

function closemenu() {
	document.getElementById('test1').click();
	
	//setTimeout (function(){
		//window.location.href = "#popupMap";
	//}, 1000);
	
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
			   url:"https://www.storymatch.co/storymatch/userstories/create",
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


function verificatoken() {
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

function esempio(){
	var conta = 1;
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"https://www.storymatch.co/storymatchsearch/stepsbyid",
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
		   
		   alert("Errore");
		   
		   },
		   dataType:"json"});
}


function alertDismissed() {
	
}

function exitapp() {
	 window.location.href = "index.html";
}

function LogOut() {

	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"https://www.storymatch.co/storymatch/authentication/logout",
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
		   
		   window.location.href = "index.html";
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

