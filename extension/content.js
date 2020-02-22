let titles = [];
try {
	window.onload = function() {
		let titleElements = document.querySelectorAll("#video-title");

		for (let i=0; i<titleElements.length; ++i) {
            titles.push(titleElements[i].innerHTML);
            var buttonElem = document.createElement("BUTTON");
			titleElements[i].parentElement.parentElement.parentElement.parentElement.appendChild(buttonElem);
            buttonElem.innerHTML = "clickme";
            buttonElem.addEventListener("click", function() {alert("FUCKKK")});
		}

		console.log(titles);
	}();
}
catch (e) {
	console.log("PROBLEM! ");
	console.log(e);
}
