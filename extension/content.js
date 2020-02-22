let alreadySearched = [];
let currentTitles = [];
let elementToAppend;
let buttons = [];
let targetUrl = "https://baithateapi.azurewebsites.net/api/BaitHate";
let readyToLoad = true;
let loadedUrl = "";
let displayCss = "";

let thumbUp = "data:image/png;base64,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";
let thumbDown = "data:image/png;base64,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";

$('#buttonElem').click(function() {
	alert('boo');
}

);

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
		var jquery = document.createElement("script");
		jquery.setAttribute("src", "https://code.jquery.com/jquery-3.4.1.min.js");
		var thumbsAction = document.createElement("script");

		thumbsAction.innerHTML = `
			function vote(title, isGood) {
				$.ajax({
					type: "POST",
					url: "https://baithateapi.azurewebsites.net/api/BaitHate/AddUserFeedback?title=" + title + "&isGood=" + isGood,
					success: function() {alert("Feedback recorded.");},
					error: function() {alert("Error");}
				})
			} 
		`;
		
		document.body.prepend(jquery);
		document.body.prepend(thumbsAction);

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
			titleElements = $("div.nDgy9d");
			elementToAppend = GoogleNews;
			displayCss = "";
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

					var containerElem = document.createElement("div");
					var buttonElem = document.createElement("BUTTON");
					var percent = document.createElement("span");
					
					containerElem.style = "display:inline-block;cursor:pointer;" + displayCss;
					containerElem.appendChild(buttonElem);
					containerElem.appendChild(percent);


					percent.setAttribute("id", "spanItemPercentElem" + i);
					
					
					elementToAppend(titleElements[currentDomOffset + i]).appendChild(containerElem);
					
					containerElem.setAttribute("id", "containerElemBox" + i);
					buttonElem.setAttribute("result", "N/A");
					buttonElem.setAttribute("id", "buttonElem" + i);
					buttonElem.setAttribute("style", "border:1px,1px,1px;");
					let val = parseInt(x[i] * 100)
					percent.innerText = "  " + val + "%";
					let color = "blue"
					buttonElem.setAttribute("result", val)
					color = getColorGradient(x[i]);
	
					buttonElem.setAttribute("style", "border:None; border-radius:100%; height:2vh; width:2vh; background-color:"+color+";display:inline-block;");
					
					var containerItem = $(`#containerElemBox${i}`);

					
					// initializae Tippy
					tippy('#containerElemBox' + i, {
						content: val + `% chance of clickbait <br/> 
								<div style='text-align:center;'> 
									<span style='text-align:center;display:inline-block;color:green;cursor:pointer;' onclick='vote("${newItems[i]}", true)'>
										<img width=35 height=35 src='${thumbUp}'/> <br/>
										Not Clickbait
									</span>
									<span style='display:inline-block;padding:3px;'>&nbsp;</span>
									<span style='text-align:center;display:inline-block;color:red;cursor:pointer;' onclick='vote("${newItems[i]}", false)'>
										<img width=35 height=35 src='${thumbDown}'/> <br/> 
										Clickbait
									</span>
								</div>`,
						trigger: 'mouseenter', //'focus',
						interactive: true
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
	return titleElement.parentElement.parentElement.parentElement.parentElement.parentElement;
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
	return titleElement.parentElement.parentElement.parentElement;
}

function killAll(){
	$('[id*="buttonElem"]').remove();
	$('[id*="containerElemBox"]').remove();
	$('[id*="spanItemPercentElem"]').remove();
}