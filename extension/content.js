let alreadySearched = [];
let currentTitles = [];
let elementToAppend;
let buttons = [];
let targetUrl = "https://baithateapi.azurewebsites.net/api/BaitHate";
let readyToLoad = true;
let loadedUrl = "";


window.onload = function() {
	console.log("loaded")
	scrapePage();
	setInterval(scrapePage, 1000);
}();

function scrapePage(){

	console.log(window.location.toString());
	if(loadedUrl !== window.location.toString()){
		loadedUrl = window.location.toString();
		alreadySearched = [];
		currentTitles = [];
		console.log("has changed");
		readyToLoad = true;
		killAll();
		return;
	}

	var location = window.location.toString()
	let titleElements = [];
	currentTitles = [];

	if (location.includes("youtube.com")) {
		// init titleElements
		titleElements = document.querySelectorAll("#video-title");
		
		// search results page
		if (location.includes("/results?")) {
			elementToAppend = YoutubeSearchpage;
		// video player page
		} else if (location.includes("/watch?v=")) {
			elementToAppend = YoutubeWatchPage;
		// home page
		} else {
			elementToAppend = YoutubeHomepage;
		}
	} else if(location.includes("www.google.com/search?")){
		if(location.includes("tbm=nws")){
			titleElements = $("div.dbsr");
			elementToAppend = GoogleNews;
		}
		else
		{
			titleElements = $("h3, .nDgy9d").not('[role="heading"]');
			elementToAppend = GoogleSearch;
		}
	}

	for (let i=0; i<titleElements.length; ++i) {
		currentTitles.push(titleElements[i].innerText);
	}
	
	updateDifferences(titleElements);
}
 
function updateDifferences(titleElements){
	let currentDomOffset = alreadySearched.length;
	let newItems = currentTitles.slice(alreadySearched.length);
	alreadySearched = currentTitles;
	
	if(newItems.length){
		$.ajax({
			type: "POST",
			url: "https://baithateapi.azurewebsites.net/api/BaitHate/GetPrediction",
			data: JSON.stringify(newItems),
			contentType: "application/json",
			success: function(data){
				let x = data;
				console.log(data);
				// loop through all response json text
				for (let i=0; i<x.length; ++i) {
					var buttonElem = document.createElement("BUTTON");
					var percent = document.createElement("span");
					percent.setAttribute("id", "spanItemPercentElem" + i);
					elementToAppend(titleElements[currentDomOffset + i]).appendChild(buttonElem);
					elementToAppend(titleElements[currentDomOffset + i]).appendChild(percent);
	
					buttonElem.setAttribute("result", "N/A");
					buttonElem.setAttribute("id", "buttonElem" + i);
					buttonElem.setAttribute("data-tippy-content", "Tooltips");
					buttonElem.setAttribute("style", "border:1px,1px,1px;");
					let val = parseInt(x[i] * 100)
					percent.innerText = "  " + val + "%";
					let color = "blue"
					buttonElem.setAttribute("result", val)
					color = getColorGradient(x[i]);
	
					buttonElem.setAttribute("style", "border:None; border-radius:100%; height:2vh; width:2vh; background-color:"+color+";display:inline-block;");
					
					// initializae Tippy
					tippy('#buttonElem' + i, {
						content: '<h1> HELLO WORLD </h1>',
						trigger: 'focus'
					});

				}

				readyToLoad = true;
			},
			error: function(){
				readyToLoad = true;
			}
		});	
	}
}

function getColorGradient(value) {
    var hue=((1-value)*120).toString(10);
	return ["hsl(",hue,",100%,50%)"].join("");
}

function YoutubeHomepage(titleElement) {
	return titleElement.parentElement.parentElement;
}

function YoutubeSearchpage (titleElement) {
	return titleElement.parentElement.parentElement.parentElement;
}

function YoutubeWatchPage(titleElement) {
	return titleElement.parentElement.parentElement.parentElement.parentElement;
}

function GoogleSearch(titleElement){
	return titleElement.parentElement.parentElement.parentElement;
}

function GoogleNews(titleElement){
	return titleElement.parentElement;
}

function killAll(){
	$('[id*="buttonElem"]').remove();
	$('[id*="spanItemPercentElem"]').remove();
}