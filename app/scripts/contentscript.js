'use strict';

var versePattern = /((?:[Ii\d]\s+)?\w{3,})\s+(\d{1,3})\s*:\s*(\d{1,3})/g;

$(document).ready(function(){
	console.log('content script running');
	var count = 0;
	$('body *:not("script")').contents().filter(function(){
		return this.nodeType == Node.TEXT_NODE; //3
	}).each(function(){
		var elem = $(this);
		var txt = elem.text();
		if(txt!=undefined && !txt.match(/^\s*$/)){
			if(txt.match(versePattern)){
				//console.log('%d. Text: %s\nPosition:%o\nOffset:%o', ++count, txt, elem.parent().position(), elem.parent().offset());
				var refs = txt.match(versePattern)[0];
				// validation
				//console.log(refs.replace(versePattern, 'https://labs.bible.org/api/?passage=$1+$2:$3'));
				// perform lookup
				$.ajax({
					url: refs.replace(versePattern, 'https://labs.bible.org/api/?passage=$1+$2:$3')
				})
				.done(function(text){
					// build tooltip
					var verseId = 'verse'+ ++ count;
					var inject = '<span id="'+ verseId + '">' + refs + '</span>';
					elem.parent().html(elem.parent().html().replace(refs, inject));
					// create tooltip
					Tipped.create('#'+verseId, text);
				});
			}
		}
	});
});
