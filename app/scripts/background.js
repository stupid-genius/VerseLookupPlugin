'use strict';

var versePattern = /((?:[Ii\d]\s+)?\w{3,})\s+(\d{1,3})\s*:\s*(\d{1,3}(?:-\d{1,3})?)/g;

chrome.runtime.onInstalled.addListener(function(details) {
	console.log('previousVersion', details.previousVersion);
});

chrome.omnibox.onInputEntered.addListener(function(input, disposition){
	disposition = 'newForegroundTab';
	if(input.match(versePattern)){
		$.ajax({
			url: input.replace(versePattern, 'https://labs.bible.org/api/?passage=$1+$2:$3')
		})
		.done(function(verse){
			console.log(verse);
			console.log('omnibox command: %s', verse);
		});
	}
});

