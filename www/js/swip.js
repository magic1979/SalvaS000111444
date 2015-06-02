document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
	document.addEventListener("resume", onResume, false);

    $(".spinner").hide();
	
	
	iframme();
}

function closemenu() {
	document.getElementById('test1').click();
	
	//setTimeout (function(){
		//window.location.href = "#popupMap";
	//}, 1000);
	
}


function alertDismissed() {
	
}

function LogOut() {

	//alert(localStorage.getItem("Token"));
	//localStorage.setItem("email", 0);
	//localStorage.setItem("Token", "");
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"http://5.249.157.197:9000/storymatch/authentication/logout",
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
									 var size = scale( 680, 760, 0, 1 ),
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