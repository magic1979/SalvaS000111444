var scriptActions = {
    HEADING: 0,
    ACTION: 1,
    CHARACTER: 2,
    DIALOG: 3,
    PARENTHETICAL: 4,
    TRANSITION: 5,
    SHOT: 6,
    TEXT: 7
};

var scriptClasses = [
    'heading',
    'action',
    'character',
    'dialog',
    'parenthetical',
    'transition',
    'shot',
    'text'
];

var nextClass = '';
var currentClass = '';
var totalWords = 0;
var ignoreContentUpdates = false;
var maxLettersPerLine = 65;
var maxLines = 56;
var shiftDown = false;

$.Editable.DEFAULTS.key = 'pzB-9dB-7tcndrzD1wz==';

// Codefoundry.it
// $.Editable.DEFAULTS.key = 'UwzrrB-9vouxogE4iu==';

var width = screen.width;
var height = screen.height;

$('#edit').editable({
    inlineMode: false,
    height: height,
    editorClass: 'custom-class',
    alwaysBlank: true,
    paragraphy: true,
    // buttons: ['html'],
    buttons: [],
    tabSpaces: false,
    trackScroll: true,
	scrollableContainer: '#scrollable',
    placeholder: 'Write here your screenplay, your novel, your short story, your poem, your commercial, your song...' 
});

$('#btn-group > li').mousedown(function(e) {
    var id = e.target.id;
    e.preventDefault();
    e.stopPropagation();
    switch (id) {
        case 'heading':
            setCurrentClass(scriptActions.HEADING);
        break;
        case 'action':
            setCurrentClass(scriptActions.ACTION);
        break;
        case 'character':
            setCurrentClass(scriptActions.CHARACTER);
        break;
        case 'dialog':
            setCurrentClass(scriptActions.DIALOG);
        break;
        case 'parenthetical':
            setCurrentClass(scriptActions.PARENTHETICAL);
        break;
        case 'transition':
            setCurrentClass(scriptActions.TRANSITION);
        break;
        case 'shot':
            setCurrentClass(scriptActions.SHOT);
        break;
        case 'text':
            setCurrentClass(scriptActions.TEXT);
        break;
    }
    $('#edit').editable('focus');
});

$('#edit').on('editable.contentChanged', function(event, editor) {
    if (! ignoreContentUpdates) {
        var ps = editor.getText();
        var words = countWords(ps);

        if (totalWords !== words) {
            totalWords = words;
        }

        setTimeout(function() {
            updatePages();
        }, 0);

        ignoreContentUpdates = true;
    }
});

$(document).ready(function() {

    var IDPage = getParameterByName('id');

    installNewLineCallback();
    installKeyDownCallback();
    installMouseCallback();
				  
	 //cordova.plugins.Keyboard.disableScroll(true);

    var script = 0;
    // METTER IL CONTENUTO DELLO SCRIPT DENTRO LA VARIABILE

    	  $(".spinner").show();
	  $.ajax({
			 type:"GET",
			 url:"https://dev.storymatch.co/storymatch/userstories/getscript",
			 data: {storyid:IDPage},
			 contentType: "application/json; charset=utf-8",
			 json: 'callback',
			 crossDomain: true,
			 success:function(result){
			 
					script = result.script;

			 $(".spinner").hide();

			 
			 },
			 error: function(){
			 $(".spinner").hide();
			 
			 //alert("Errore Caricamento leggi");
			 
			 },
			 dataType:"json"});



             //var script = "<br>jkljkj j kj<br><br>jkljkj j kj<br><br>jkljkj j kj<br><br>jkljkj j kj<br><br>jkljkj j kj<br><br>jkljkj j kj<br><br>jkljkj j kj<br><br>jkljkj j kj<br><br>jkljkj j kj<br><br>jkljkj j kj<br><br>jkljkj j kj<br><br>jkljkj j kj<br><br>jkljkj j kj<br><br>jkljkj j kj<br><br>jkljkj j kj<br><br>jkljkj j kj<br><br>jkljkj j kj<br><br>jkljkj j kj<br><br>jkljkj j kj<br><br>jkljkj j kj<br><br>jkljkj j kj<br><br>jkljkj j kj<br><br>jkljkj j kj<br><br>jkljkj j kj<br><br>jkljkj j kj<br><br>jkljkj j kj<br><br>jkljkj j kj<br><br>jkljkj j kj<br><br>jkljkj j kj<br><br>jkljkj j kj<br><br>jkljkj j kj<br><br>jkljkj j kj<br><br>jkljkj j kj<br><br>jkljkj j kj<br>"


    if (! script) {
        setCurrentClass(scriptActions.TEXT);
    } else {
        $("#edit").data('fa.editable').setHTML(script);
    }

    $("#edit").editable('focus');

    highlightCurrentClassButton();
    updatePages();
});


function installMouseCallback() {
	//alert()
    $("#edit").click(function() {
        highlightCurrentClassButton();
    });
}


$('#edit').data('fa.editable').$element.on('press mousedown touchstart', function (e) {
										   
		var blocks = $('#edit').data('fa.editable').getSelectionElements();

		highlightCurrentClassButton();
										   
});

function installKeyDownCallback() {
    $("#edit").keyup(function(e) {
        highlightCurrentClassButton();

        switch (e.which) {
            case 16: // SHIFT
                shiftDown = false;
            break;
        }
    });

    $("#edit").keydown(function(e) {
        ignoreContentUpdates = false;

        switch (e.which) {
            case 16: // SHIFT
                shiftDown = true;
            break;

            case 9: // TAB
                e.preventDefault();

                var currentElement = getCurrentElement();
                var currentClassName = currentElement.className;
                if (currentClassName === '') {
                    currentClassName = 'text';
                }
                var currentClassId = scriptClasses.indexOf(currentClassName);
                var nextClassId = -1;

                if (shiftDown) {
                    if (currentClassId === 0) {
                        nextClassId = scriptClasses.length - 1;
                    } else {
                        nextClassId = currentClassId - 1;
                    }
                } else {
                    if (currentClassId + 1 >= scriptClasses.length) {
                        nextClassId = 0;
                    } else {
                        nextClassId = currentClassId + 1;
                    }
                }

                setCurrentClass(nextClassId);
            break;
        }
    });
}

function markPos() {
    // TODO: find all 'heading' Ps and store their position
}

function highlightClassButton(className) {
    // Highlight selection button
    $('.sel-edit').removeClass('sel-edit');
    if (className && className !== '') {
        $('#' + className).addClass('sel-edit');
    }

    // Store current class name
    currentClass = className;
}

function highlightCurrentClassButton() {
    // Get current class name
    var className = getCurrentElement().className;

    // Highlight current selection button
    highlightClassButton(className);
}

function setCurrentClass(newClassId) {
    // Get current class name by id
    var newClassName = scriptClasses[newClassId];

    if (currentClass !== newClassName) {
        // Highlight button
        highlightClassButton(newClassName);

        // Change style for current block
        $("#edit").editable('blockStyle', newClassName);
    }
}

function getCurrentElement() {
    var instance = $("#edit").data('fa.editable');
    var el = instance.getSelectionElement();
    if (el.tagName === 'BR') {
        el = el.parentElement;
    }
    return el;
}

function countWords(s) {
    //exclude  start and end white-space
    s = s.replace(/(^\s*)|(\s*$)/gi,"");

    //2 or more space to 1
    s = s.replace(/[ ]{2,}/gi," ");

    // exclude newline with a start spacing
    s = s.replace(/\n /,"\n");

    return s.split(' ').length; 
}

function installNewLineCallback() {
    $.Editable.prototype.breakEnd = function (parentEl, breakBefore) {
        // Get empty string.
        var text = this.markers_html + this.br;

        // Check for next action and build string
        var currentClassId = scriptClasses.indexOf(currentClass);
        if (currentClassId === -1) {
            currentClassId = scriptActions.TEXT;
        }

        var nextClassId = getNextClass(currentClassId);
        var nextClass = scriptClasses[nextClassId];

        // Build string
        var str = "";
        if (currentClassId !== scriptActions.CHARACTER) {
            str = "<" + parentEl.tagName + " " + "class='text'></" + parentEl.tagName + ">";
        }
        str += "<" + parentEl.tagName + " " + "class='" + nextClass + "'" + ">" + text + "</" + parentEl.tagName + ">";

        return str;
    };
}

function getNextClass(currentClassId) {
    switch (currentClassId) {
        case scriptActions.HEADING:
            return scriptActions.ACTION;

        case scriptActions.ACTION:
            return scriptActions.ACTION;

        case scriptActions.DIALOG:
            return scriptActions.ACTION;

        case scriptActions.CHARACTER:
            return scriptActions.DIALOG;

        case scriptActions.PARENTHETICAL:
            return scriptActions.DIALOG;

        case scriptActions.TRANSITION:
            return scriptActions.HEADING;

        case scriptActions.SHOT:
            return scriptActions.TEXT;

        case scriptActions.TEXT:
            return scriptActions.TEXT;
    }
}

function updatePages() {
    $("#edit div.break-container").remove();

    var currPage = 1;
    var totLines = 0;
    var elems = $("#edit p");

    elems.each(function(i) {
        var pContent = $(this).text();
        if (pContent && pContent.length > maxLettersPerLine) {
            var tmpLines = parseInt(pContent.length / maxLettersPerLine);
            var rem = ((pContent.length % maxLettersPerLine) !== 0) ? 1 : 0;
            tmpLines += rem;
            totLines += tmpLines;
        } else {
            totLines++;
        }

        if (totLines > maxLines) {
            currPage++;
            totLines = 0;
            var pString = currPage.toString() + ".";
            $(this).before(
               //"<div class='unselectable break-container' contenteditable='false'><div class='break'>&nbsp;</div><div class='page-number'>" + pString + "</div></div>"
				"<div class='unselectable' contenteditable='false'><div class='break'>&nbsp;</div><div class='page-number'>" + pString + "</div></div>"
            );                       
        }

    });
	
	$('#edit').editable('focus');

}

function oneFingerScroll() {
	var scrollStartPos = 0;
	$(this).bind('touchstart', function(event) {
				 // jQuery clones events, but only with a limited number of properties for perf reasons. Need the original event to get 'touches'
				 var e = event.originalEvent;
				 scrollStartPos = $(this).scrollTop() + e.touches[0].pageY;
				 e.preventDefault();
				 });
	$(this).bind('touchmove', function(event) {
				 var e = event.originalEvent;
				 $(this).scrollTop(scrollStartPos - e.touches[0].pageY);
				 e.preventDefault();
				 });
	return this;
};

function getParameterByName(name) {
		name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
							  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
							  results = regex.exec(location.search);
							  return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
							  }

