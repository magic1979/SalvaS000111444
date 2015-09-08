/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
		
		
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
		
		if(PushbotsPlugin.isiOS()){
			PushbotsPlugin.initializeiOS("55eef2521779597d478b456a");
		}
		if(PushbotsPlugin.isAndroid()){
			PushbotsPlugin.initializeAndroid("55eef2521779597d478b456a", "1068247241830");
		}
		
		var hoverDelay = $.mobile.buttonMarkup.hoverDelay = 0;
	
		$.support.cors = true;
		$.mobile.allowCrossDomainPages = true;
		$.mobile.phonegapNavigationEnabled = true
		$.mobile.pushStateEnabled = false;
		
		$.mobile.defaultPageTransition = 'none';
		$.mobile.defaultDialogTransition = 'none';
		
		
		$(document).on("click touchstart", "#loginbutton", function(e){
			e.preventDefault();
			Login();
			e.stopPropagation()
		});
		
		$(document).on("click touchstart", "#sigbutton", function(e){
			e.preventDefault();
			vai();
			e.stopPropagation()
		});
		
		$(document).on("click touchstart", "#getbutton", function(e){
			e.preventDefault();
			VerificaLogin();
			e.stopPropagation()
		});
		
		$(document).on("click touchstart", "#getbutton2", function(e){
			e.preventDefault();
			VerificaLogin();
			e.stopPropagation()
		});
		
		$(document).on("click touchstart", "#siguppo", function(e){
			e.preventDefault();
			window.location.href = "#article3";
			e.stopPropagation()
		});
		
		$(document).on("click touchstart", "#loginno", function(e){
			e.preventDefault();
			window.location.href = "#article4";
			e.stopPropagation()
		});
		
		$(document).on("click touchstart", "#showHide", function(e){
			e.preventDefault();
					   if ($(".password").attr("type") == "password") {
								$(".password").attr("type", "text");
							 
								} else {
							 $(".password").attr("type", "password");
								}
		});
		
		$(document).on("click touchstart", "#For", function(e){
			e.preventDefault();
			forgot()
			e.stopPropagation()
		});

		// Per il video.@
		
		//setTimeout (function(){
		$("#myTable").show();
		VerificaLogin()
		//}, 5500);
		
		
		$(".spinner").hide();
		
		//$(document).keydown(function (eventObj){
		//getKey(eventObj);
		//});
		
		//$("#showHide").click(function() {
							
							// });
		
		
		var parentElement = document.getElementById(id);
		

		$(".spinner").hide();



    }
};

function getKey(key){
	if ( key == null ) {
		keycode = event.keyCode;
		
	} else {
		keycode = key.keyCode;
	}
	
	if (keycode ==13){
		
		document.activeElement.blur();
		$("input").blur()
		return false;
		
	}
	
}

function vai(){
	
	var connectionStatus = false;
	connectionStatus = navigator.onLine ? 'online' : 'offline';
	
	if(connectionStatus=='online'){
	
	var emailreg = self.document.formia.email.value.toLowerCase();
	var pinreg = self.document.formia.myInput.value;
	
	if (emailreg == "") {
		navigator.notification.alert(
									 'inserire Email',  // message
									 alertDismissed,         // callback
									 'Email',            // title
									 'OK'                  // buttonName
									 );
		return;
	}
	
	
	if (pinreg == "") {
		navigator.notification.alert(
									 'inserire un Pin',  // message
									 alertDismissed,         // callback
									 'Pin',            // title
									 'OK'                  // buttonName
									 );
		return;
	}
	
	//pinreg = encode64(pinreg);
	
	//alert(pinreg);
	
	EmailAddr = self.document.formia.email.value;
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
	
	//chiamo paco
	
	$(".spinner").show();
	$.ajax({
		   url: "https://staging.storymatch.co/storymatch/authentication/signup",
		   dataType: "json",
		   type: "post",
		   contentType: "application/json",
		   data: JSON.stringify( { "username": ""+ emailreg +"", "password": ""+ pinreg +"", "name":"","surname":"" } ),
		   processData: false,
		   timeout: 7000,
		   crossDomain: true,
		   success:function(result){
		   
		   if (result.ID==1024){
			  navigator.notification.alert(
										   result.msg,  // message
										   alertDismissed,         // callback
										   'SigUp',            // title
										   'OK'                  // buttonName
										   );
		   
		   //window.location.href = "swip.html";
			  
		   }
		   else{
			  navigator.notification.alert(
										   result.msg,  // message
										   alertDismissed,         // callback
										   'SigUp',            // title
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
		   $(".spinner").hide();
		   
		   },
		   dataType:"json"});

	}
	else{
		navigator.notification.alert(
										'possible network error',  // message
									 alertDismissed,         // callback
										'Error',            // title
										'OK'                  // buttonName
										);
	}

}


function Login(){
	
	var connectionStatus = false;
	connectionStatus = navigator.onLine ? 'online' : 'offline';
	
	if(connectionStatus=='online'){
	
	var emailreg = self.document.formia2.emailL.value.toLowerCase();
	var pinreg = self.document.formia2.myInputL.value.toLowerCase();
	
	if (emailreg == "") {
		navigator.notification.alert(
									 'inserire Email',  // message
									 alertDismissed,         // callback
									 'Email',            // title
									 'OK'                  // buttonName
									 );
		return;
	}
	
	
	if (pinreg == "") {
		navigator.notification.alert(
									 'inserire un Pin',  // message
									 alertDismissed,         // callback
									 'Pin',            // title
									 'OK'                  // buttonName
									 );
		return;
	}
	
	//pinreg = encode64(pinreg);
	
	
	EmailAddr = self.document.formia2.emailL.value;
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
	
	
	//chiamo paco @
	/*$(".spinner").show();
	$.ajax({
		   type:"POST",
		   url:"https://staging.storymatch.co/storymatch/authentication/login",
		   data: {username:emailreg,password:pinreg},
		   contentType: "application/json; charset=utf-8",
		   json: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
			if (result.ID==1024){
			  //alert(result.token);
			  localStorage.setItem("email", emailreg);
			  localStorage.setItem("Token", result.token);
			  window.location.href = "swip.html";
			  
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
		   
		   },
		   error: function(jqXhr, textStatus, errorThrown ){
		   $(".spinner").hide();
		   
			  navigator.notification.alert(
										    errorThrown,  // message
										    alertDismissed,         // callback
										   'Error',            // title
										   'OK'                  // buttonName
										   );
		   
		   },
		   dataType:"json"});*/
	
	$(".spinner").show();
	$.ajax({
		   url: "https://staging.storymatch.co/storymatch/authentication/login",
		   dataType: "json",
		   type: "post",
		   contentType: "application/json",
		   data: JSON.stringify( { "username": ""+ emailreg +"", "password": ""+ pinreg +"" } ),
		   processData: false,
		   timeout: 7000,
		   crossDomain: true,
		   success: function( result, textStatus, jQxhr ){
		   if (result.ID==1024){
			  //alert(result.token);
			  localStorage.setItem("email", emailreg);
		   localStorage.setItem("emailMemoria", emailreg);
			  localStorage.setItem("Token", result.token);
			  window.location.href = "swip.html";
			  
		   }
		   else{
			  navigator.notification.alert(
										   result.msg,  // message
										   alertDismissed,         // callback
										   'Email',            // title
										   'OK'                  // buttonName
										   );
		   $(".spinner").hide();
		   }

		   },
		   error: function( jqXhr, textStatus, errorThrown ){
			navigator.notification.alert(
										'possible network error',  // message
										alertDismissed,         // callback
										'Error',            // title
										'OK'                  // buttonName
										);
		   $(".spinner").hide();
		   }
		   });

	}
	else{
		navigator.notification.alert(
										'possible network error',  // message
									 alertDismissed,         // callback
										'Error',            // title
										'OK'                  // buttonName
										);
	
	}

}

function alertDismissed() {
	
}

function LogOut() {
	localStorage.setItem("email", "");
	localStorage.setItem("Token", "");
}

function VerificaLogin(){
	
	var connectionStatus = false;
	connectionStatus = navigator.onLine ? 'online' : 'offline';
	
	if(connectionStatus=='online'){

	if (localStorage.getItem("email") === null || typeof(localStorage.getItem("email")) == 'undefined' || localStorage.getItem("email")==0) {
		
		self.document.formia2.emailL.value = localStorage.getItem("emailMemoria");
		window.location.href = "#article4";
		$(".spinner").hide();
	}
	else{

		//alert(localStorage.getItem("email") + "-" + localStorage.getItem("Token"));
		verificatoken()
	}
		
	}
	else{
		navigator.notification.alert(
										'possible network error',  // message
										 alertDismissed,         // callback
										'Error',            // title
										'OK'                  // buttonName
										);
	}
}

function verificatoken() {
	
	$(".spinner").show();
	$.ajax({
		   type:"GET",
		   url:"https://staging.storymatch.co/storymatch/authentication/validatetoken",
		   data: {token:localStorage.getItem("Token")},
		   contentType: "application/json; charset=utf-8",
		   json: 'callback',
		   timeout: 7000,
		   crossDomain: true,
		   success:function(result){
		   
		   if (result.ID==1024){
		   //OK
		   //alert(result.ID);
		   
		   window.location.href = "swip.html";
		   }
		   else{
			//alert(result.msg);
		    //window.location.href = "Froala/basic.html";
		    self.document.formia2.emailL.value = localStorage.getItem("emailMemoria");
			window.location.href = "#article4";
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
		   
		   window.location.href = "#article4";
		   
		   },
		   dataType:"json"});
	
}


function forgot() {
	navigator.notification.prompt(
								  'Inserisci il tuo indirizzo email',  // message
								  onPrompt,                  // callback to invoke
								  'Recupera la Password',            // title
								  ['Invia','Annulla'],             // buttonLabels
								  'Email'                 // defaultText
								  );
}

function onPrompt(results) {
	if(results.buttonIndex==1){
		if (results.input1 == "") {
			navigator.notification.alert(
										 'inserire indirizzo email',  // message
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
		
		$(".spinner").show();
		$.ajax({
			   url: "https://staging.storymatch.co/storymatch/authentication/asktoreset",
			   dataType: "json",
			   type: "post",
			   contentType: "application/json",
			   data: JSON.stringify( { "username": ""+ results.input1 +"" } ),
			   processData: false,
			   crossDomain: true,
			   success:function(result){
			   
			   if (result.ID==1024){
				navigator.notification.alert(
											result.msg,  // message
											alertDismissed,         // callback
											'Reset Password',            // title
											'OK'                  // buttonName
											);
			   
		    }
			   else{
			   navigator.notification.alert(
											result.msg,  // message
											alertDismissed,         // callback
											'Reset Password',            // title
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
	
}




