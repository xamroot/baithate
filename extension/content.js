let titles = [];
let buttons = [];
let targetUrl = "https://baithateapi.azurewebsites.net/api/BaitHate";
let currentPopupParent = 0;
let currentPopup = 0;
let xhttp = new XMLHttpRequest();

let displayPopup = (event) => {
	// check to make sure no pop up is running yet
	if (currentPopup) {
		currentPopupParent.removeChild(currentPopup);
		currentPopupParent = 0;
		currentPopup = 0;
		return;
	}
	// set up the current popup div
	currentPopup = document.createElement("DIV");
	color = "blue";
	result = event.target.getAttribute("result")
	
	value = parseInt(result);
	color = getColorGradient(value / 100);

	currentPopup.setAttribute("style", "background-color:" + color + "; height:10vh; width:25vw; position:absolute; z-index:5000; right:10%; top: 25%; border: 1px solid black; border-radius: 3px;");
	// set up pop message
	let popupMessage = document.createElement("H3");
	popupMessage.innerHTML = event.target.getAttribute("result");
	if (event.target.getAttribute("result") != "N/A") {
		popupMessage.innerHTML = event.target.getAttribute("result") + "% clickbait";
	}
	popupMessage.setAttribute("style", "position:relative; z-index:10000;")
	currentPopup.appendChild(popupMessage);
	// set up thumbs up
	let popupThumbsup = document.createElement("a");
	popupThumbsup.innerText = "👍";
	popupThumbsup.setAttribute("style", "position:relative; z-index:10000; height:25px; width: 25px");
	currentPopup.appendChild(popupThumbsup);
	// set up thumbs down
	let popupThumbsdown = document.createElement("a");
	popupThumbsdown.innerText = "👎";
	popupThumbsdown.setAttribute("style", "position:relative; z-index:10000; height:25px; width: 25px");
	currentPopup.appendChild(popupThumbsdown);
	// add current popup to the parent (what you are clicking on)
	currentPopupParent = event.target;
	currentPopupParent.appendChild(currentPopup);

}


window.onload = function() {
	var location = window.location.toString()
	let titleElements = []
	let elementToAppend;
	
	if (location.includes("youtube.com")) {
		// init titleElements
		let titleElements = document.querySelectorAll("#video-title");
		
		// search results page
		if (location.includes("/results?")) {
			elementToAppend = YoutubeSearchpage;
		// video player page
		} else if (location.includes("/watch?v=")) {
			elementToAppend = YoutubeWatchpage;
		// home page
		} else {
			elementToAppend = YoutubeHomepage;
		}
	} 

	for (let i=0; i<titleElements.length; ++i) {
		titles.push(titleElements[i].innerText);
	}

	$.ajax({
		type: "POST",
		url: "https://baithateapi.azurewebsites.net/api/BaitHate/GetPrediction",
		data: JSON.stringify(titles),
		contentType: "application/json",
		success: function(data){
			let x = data;
			// loop through all response json text
			for (let i=0; i<x.length; ++i) {
				var buttonElem = document.createElement("BUTTON");
				var percent = document.createElement("span");
				
				elementToAppend(titleElements[i]).appendChild(buttonElem);
				elementToAppend(titleElements[i]).appendChild(percent);

				buttonElem.addEventListener("click", displayPopup);
				buttonElem.setAttribute("result", "N/A");
				buttonElem.setAttribute("id", "buttonElem" + i);
				buttonElem.setAttribute("style", "border:1px,1px,1px");
				let val = parseInt(x[i] * 100)
				percent.innerText = "  " + val + "%";
				let color = "blue"
				buttonElem.setAttribute("result", val)
				console.log(val)
				color = getColorGradient(x[i]);

				buttonElem.setAttribute("style", "border:None; border-radius:100%; height:2vh; width:2vh; background-color:"+color+";");
			}
		}
	});
}();

let getColorGradient = (value) => {
    var hue=((1-value)*120).toString(10);
    return ["hsl(",hue,",100%,50%)"].join("");
}


let YoutubeHomepage = (titleElement) => {
	return titleElement.parentElement.parentElement;
}

let YoutubeSearchpage = (titleElement) => {
	return titleElement.parentElement.parentElement;
}

let YoutubeWatchPage = (titleElement) => {
	return titleElement.parentElement.parentElement;
}