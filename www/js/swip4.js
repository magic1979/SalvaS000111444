document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
	document.addEventListener("resume", onResume, false);
	
    $(".spinner").hide();

	
//$("#contenuto").html("<table width='100%' border='0' cellpadding='0' cellspacing='0'><tr><td class='trtabella2' colspan='4'><br><br></td></tr><tr><td class='trtabella' width='90%'><table width='90%'><tr><td width='10%'></td><td width='90%' align='left'><b>Hollow Hill</b></td></tr><tr><td width='10%'></td><td width='90%' align='left'>Ehendebi squamus tionseq uaspici ipid quad esed mo conseque doloreferum unt essi rent recerib eaquas ex expla ipit magnimendus, occatiam nobit audante.Ehendebi squamus tionseq uaspici ipid quad esed mo conseque doloreferum unt essi rent recerib eaquas ex expla ipit magnimendus, occatiam nobit audante.</td></tr></table></td><td class='trtabella' width='15%' align='center'></td></tr><tr><td class='trtabella2' colspan='4'><hr></td></tr></table>");
						 
document.getElementById("myTextarea").readOnly = true;
document.getElementById("myTextarea2").readOnly = true;

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



function abilita() {
	document.getElementById("myTextarea").readOnly = false;
	
	$("#sin").attr("href", "javascript:undor()");
	$("#des").attr("href", "javascript:redor()");
	
	document.getElementById("myTextarea2").readOnly = true;
	$("#sin2").attr("href", "#");
	$("#des2").attr("href", "#");
	
	
}
function abilita2() {
	document.getElementById("myTextarea2").readOnly = false;
	
	$("#sin2").attr("href", "javascript:undor()");
	$("#des2").attr("href", "javascript:redor()");
	
	document.getElementById("myTextarea").readOnly = true;
	$("#sin").attr("href", "#");
	$("#des").attr("href", "#");
}



function undor() {
	
	document.execCommand('undo', false, null);
	
}

function redor() {
	
	document.execCommand('redo', false, null);
	
}