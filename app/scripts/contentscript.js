'use strict';

var versePattern = /((?:[Ii\d]\s+)?\w{3,})\s+(\d{1,3})\s*:\s*(\d{1,3}(?:-\d{1,3})?)/g;

$(document).ready(function(){
	console.log('content script running');

	/*
	need to add tests
	support more than one ref per node
	create options page
	*/

	var count = 1;
	$('body *:not("script")').contents().filter(function(){
		return this.nodeType == Node.TEXT_NODE; //3
	}).each(function(){
		var elem = $(this);
		var parent = elem.parent();
		var txt = elem.text();
		if(txt!==undefined && !txt.match(/^\s*$/)){
			if(txt.match(versePattern)){
				var refs = txt.match(versePattern);
				for(var i in refs){
					console.log(refs[i]);
					// perform lookup
					$.ajax({
						url: refs[i].replace(versePattern, 'https://labs.bible.org/api/?passage=$1+$2:$3')
					})
					.done(function(text){
						// build tooltip
						var verseId = 'verse'+count++;
						var inject = '<span id="'+ verseId + '">' + refs[i] + '</span>';
						console.log(text);
						parent.html(parent.html().replace(refs[i], inject));
						// create tooltip
						console.log(elem.get(0));
						Tipped.create('#'+verseId, text);
					});
				}
			}
		}
	});
});
