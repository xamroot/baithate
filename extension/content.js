let alreadySearched = [];
let currentTitles = [];
let elementToAppend;
let buttons = [];
let targetUrl = "https://baithateapi.azurewebsites.net/api/BaitHate";
let readyToLoad = true;
let loadedUrl = "";
let displayCss = "";

let pointerImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANkAAADZCAMAAACaYGVEAAAAaVBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8G612AAAAInRSTlMAChjy+SU2m1DiEC11zUOFv+m41VlspZI9sNzGjH1KZWCroD1X+QAAEKJJREFUeAHUmQuOszgQhH+33/iBAfNOgOH+h1yNtCvtrh0yIQYydYAmn6pTiOo/hwsBVaz7lpi6bzFFAf35xULAhL/zr95VssD/kpSV6xuuxcR+HSFQobkzBSHrhgiWpmxrQbNfQtVpPkq8/lh4KNuZwWdTZWzhBpP1ZZFibD1Fn2qWzV2x7heRpWbZ57llc4PXt1WUmn2Uc7Qud2MFzn0t8Cl2TXwga0IRk3+CcTAnsCuQbARcvYaGrIcIl/5CNtAhV0I2dxUbpPcr9C27IDf8+DMuQjAupByqvzUMssCYkJ+x9RadDGa/8HMmLCtTNvyW63qe/T9aZn3PW947I/HzIQVXZ3LRW/EMahh7nutF2E4pSuG/opQqZsWib42riif2DRrO4kLePKFyPK+FZd9EGULxIQhlAFRZUd96s0lHSnsOmOIbO0Tk2OSzYBQgjhQQZkDZVLflsDFV5nCCYXO1hcW17xTAc6iAzucbcMRNR4PRh4YRbBot2N4iAGXfcO7hWsr7sbZN4+NPkHzpXsYK4GZe4QdP6NlxXJl+EIm4arRQgFK0QSIfH7BVCzpsE0mcy/DaJqujMrB3F2fDBwVJ5za4srSll46zkYYeAOaH+B4m4grY4js52tRcSBfR3GhScQVsXV7Fln/wKG125HgNVbj7lI4rYBNcxuK/TokGsewgpvXqyJcMorPDx+YI7SNgRa87QEf3l7mMoLWQCqyMGFbdzmitEfiShA/nadCUi33tHmZYYFtbHJH+cTAycK/O+o5HtDbhL/ii74ONsT7QAjqzVo/8z99Goy6yifXJlxOkWhxfyKThUTT+9IMXonoI0eCtuA/AJBdXXIPAm5QJCU0k7C1cdD1w5P8/Zvd7DbXBLHPvruqkURfkCL6jfaPuAdioL7y6ItUEaPUutBoHNUutNied35pJv2OM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";
let baitImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJoAAAEqCAMAAADanLnkAAABC1BMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+JPameAAAAWHRSTlMAAgQGCQwOEBMUFhkaHSAjJyouMjQ4PD4/QUJFSU1RVlxfY2Zpa29xdXh8f4SIi46Rk5SWmp6jp6uvs7i7vL7BxcnNztHV2d3g4uXo6u7v8PL09vf5+/z+zwqIFgAACr9JREFUeAHs3dteGkkQx/FuQEQUQUWN8YCbeFAMq4lIBIwBFBCE5cA4/3r/J9lPdBimcdzLrbro3xN8PzZVSl+0irvYxvGN4xA5v/Lbi0pQiVy5+0JEBCL0q1+XpcBiufsJBYJbz0VFyNI3IwIZNoyukgJkO3UA8zRQJc0u23+i8KqrzLK9Dn1UiXdS15v0UXDOI5xLowJ8SMPzFp9Mn738F40qcb7jfHqDgch1HMedZ45zXLLIdx/x8OXz58+HVYfM7uJMtLXOdNXW1tSfFvNDQ4bxARPt1PUI/uc9cjpCkEa3URbZQpW8rrTyil66FKy7znOeXXoNwx3lt2ouOpyw0HKOtyQaCTXr3DX2STnGQfsGj1bSxmwEaWhnGGSRW3oLP1SgWJWCtBHHjMZ/h9L0tUGjCwba8uMbASZNncGg/WKgpTsUSjsmUCCHgZZ5Dj1QdQKDRhxrzacVtTm4ARpAjD81oBxVs3SRDBoYaOnudAwel4PLoxKkEQst1fYI6G8GB7cJg0YMtETd/zh9VbO2B+by4KDF7nzAjQ4MKIF9eUR++oSHpJoWvSUjlBVDBZo23J4NR5vMvnHQjskvr6YdOgYMk0MO2u7IB9wtTE+5REZ43uCgZbo+oDcFZDowabUEB22x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";

window.onload = function() {
	console.log("loaded")
	scrapePage();
	setInterval(checkEnabledScrape, 1000);
}();

function checkEnabledScrape(){
	chrome.storage.sync.get({
		enabled: true,
	  }, function(items) {
		if(items.enabled){
			scrapePage();
		}
	  });
}

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
			function vote(title, isGood, index) {
				$.ajax({
					type: "POST",
					url: "https://baithateapi.azurewebsites.net/api/BaitHate/AddUserFeedback?title=" + title + "&isGood=" + isGood,
					success: function() {
						$('#innerContentElem' + index).html('<label style="line-height:50px">Thanks for your feedback!</label>');
					},
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
	} else if(location == "https://www.buzzfeed.com/"){
		titleElements = $(".js-card__link.link-gray");
		elementToAppend = BuzzfeedHome;
	} else if (location.includes("news.ycombinator.com")){
		titleElements = $(".storylink");
		elementToAppend = HackerNews;
		displayCss = "margin-left:10px;";
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
								<div style='text-align:center;' id='innerContentElem${i}'> 
									<span style='text-align:center;display:inline-block;color:green;cursor:pointer;' onclick='vote("${newItems[i].replace(/(\r\n|\n|\r)/gm, "").trim().replace("\"", "").replace("'", "")}", true, ${i})'>
										<img width=35 height=35 src='${pointerImage}'/> <br/>
										Not Clickbait
									</span>
									<span style='display:inline-block;padding:3px;'>&nbsp;</span>
									<span style='text-align:center;display:inline-block;color:red;cursor:pointer;' onclick='vote("${newItems[i].replace(/(\r\n|\n|\r)/gm, "").trim().replace("\"", "").replace("'", "")}", false, ${i})'>
										<img width=20 height=35 src='${baitImage}'/> <br/> 
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
	return titleElement.parentElement.parentElement.parentElement.parentElement;
}

function BuzzfeedHome(titleElement){
	return titleElement.parentElement.parentElement.parentElement;
}

function HackerNews(titleElement){
	return titleElement.parentElement;
}

function killAll(){
	$('[id*="buttonElem"]').remove();
	$('[id*="containerElemBox"]').remove();
	$('[id*="spanItemPercentElem"]').remove();
}