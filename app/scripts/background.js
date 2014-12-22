'use strict';

var versePattern = /((?:[Ii\d]\s+)?\w{3,})\s+(\d{1,3})\s*:\s*(\d{1,3}(?:-\d{1,3})?)/g;

chrome.runtime.onInstalled.addListener(function(details) {
	console.log('previousVersion', details.previousVersion);
});

chrome.omnibox.onInputEntered.addListener(function(input, disposition){
	if(input.match(versePattern)){
		chrome.tabs.create({url: input.replace(versePattern, 'https://labs.bible.org/api/?passage=$1+$2:$3')});
	}
});

