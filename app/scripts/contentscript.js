'use strict';

var versePattern = /((?:[Ii\d]\s+)?\w{3,})\s+(\d{1,3})\s*:\s*(\d{1,3}(?:-\d{1,3})?)/g;
function getTextNodes(){
	return this.nodeType === Node.TEXT_NODE; //3
}

function breakWords(string, n, br){
	var pat = new RegExp('(.{1,'+n+'})','g');
	var frags = string.match(pat);
	var fragCount = frags.length;
	for(var i=0;i<fragCount;++i){
		var cur = frags[i];
		if(cur.length<n){
			continue;	// TODO: fancy schmancy get words from next fragment
		}
		if(cur.match(/[^\s]+$/)){
			var words = cur.split(/\s+/);
			var last = words[words.length-1];
			if(i+1<fragCount){
				frags[i+1] = last+frags[i+1];
			}
			else{
				frags.push(last);
			}
			frags[i] = words.slice(0, words.length-1).join(' ');
		}
	}
	return frags.join(br);
}

$(document).ready(function(){
	console.log('content script running');

	var count = 1;
	$('body *:not("script")').contents().filter(getTextNodes).each(function(){
		var elem = $(this);
		var parent = elem.parent();
		var txt = elem.text();
		if(txt!==undefined && !txt.match(/^\s*$/)){
			var refs = txt.match(versePattern);
			if(refs!==null){
				//var i = 0;
				for(var i in refs){
					var verseId = 'verse'+count++;
					var inject = '<span id="'+ verseId + '">' + refs[i] + '</span>';
					var cache = [];
					(function(){
						var lVerseId = verseId;
						var r = i;
						var lRef = refs[r];
						var lInject = inject;
						// perform lookup
						$.ajax({
							url: lRef.replace(versePattern, 'https://labs.bible.org/api/?passage=$1+$2:$3')
						})
						.done(function(text){
							cache[lVerseId] = breakWords(text, 70, '<br/>');
							// build tooltip
							parent.html(parent.html().replace(lRef, lInject));
							// create tooltip
							parent.children().each(function(){
								var id = $(this).attr('id');
								Tipped.create('#'+id, cache[id]);
							});
						});
					})();
				}
			}
		}
	});
});
