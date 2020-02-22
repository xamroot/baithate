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
	if (result != "N/A") {
		value = parseInt(result);
		if (value > 75)
			color = "red";
		else if (value > 50)
			color = "orange";
		else if (value > 25)
			color = "yellow";
		else if (value >= 0)
			color = "green";
	}
	currentPopup.setAttribute("style", "background-color:" + color + "; height:10vh; width:25vw; position:absolute; z-index:5000; right:10%; top: 25%;");
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
	popupThumbsdown.innerText = "�")
	popupThumbsdown.setAttribute("style", "position:relative; z-index:10000; height:25px; width: 25px");
	currentPopup.appendChild(popupThumbsdown);
	// add current popup to the parent (what you are clicking on)
	currentPopupParent = event.target;
	currentPopupParent.appendChild(currentPopup);

}

// function that runs after async http request gets a response
let xhttpCallback = () => {
	// runs when the response is done
    if (xhttp.readyState == 4) {
		// turn response from string into jso
		let x = JSON.parse(xhttp.responseText);
		// loop through all response json text
        for (let i=0; i<x.length; ++i) {
        	let buttonElem = document.getElementById("buttonElem" + i);
        	buttonElem.setAttribute("result", parseInt(x[i] * 100));
        }

    }
}

window.onload = function() {
	let titleElements = document.querySelectorAll("#video-title");

	for (let i=0; i<titleElements.length; ++i) {
        titles.push(titleElements[i].innerHTML);

        var buttonElem = document.createElement("BUTTON");
		titleElements[i].parentElement.parentElement.appendChild(buttonElem);
		buttonElem.innerHTML = "clickme";
        buttonElem.addEventListener("click", displayPopup);
        buttonElem.setAttribute("result", "N/A");
		buttonElem.setAttribute("id", "buttonElem" + i);
		buttonElem.setAttribute("style", "border:1px,1px,1px");
		buttons.push(buttonElem);
	}
	xhttp.onreadystatechange = xhttpCallback;
	xhttp.open("POST", "https://baithateapi.azurewebsites.net/api/BaitHate/GetPrediction", true);
	xhttp.setRequestHeader("Content-type", "application/json");
	console.log(JSON.stringify(titles));
	xhttp.send(JSON.stringify(titles));	
}();