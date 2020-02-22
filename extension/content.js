console.log("hit");
try {
	window.onload = function() {
		console.log("HIT");
		let titleElements = document.querySelectorAll("#video-title");

		console.log("beginning");
		console.log(titleElements.length);
		for (let i=0; i<titleElements.length; ++i) {
			console.log(titleElements[i]);	
		}

		console.log("ending");
	}();
}
catch (e) {
	console.log("PROBLEM! ");
	console.log(e);
}
