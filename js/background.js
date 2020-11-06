chrome.runtime.onMessage.addListener(function (request, sender, callback) {
	if (request.action == "xhttp") {
		var xhttp = new XMLHttpRequest();
		var method = request.method ? request.method.toUpperCase() : 'GET';

		xhttp.onload = function () {
			callback(xhttp.responseText);
		};
		xhttp.onerror = function () {
			// Do whatever you want on error. Don't forget to invoke the
			// callback to clean up the communication port.
			callback();
		};
		xhttp.open(method, request.url, true);
		if (method == 'POST') {
			xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		}
		xhttp.send(request.data);
		return true; // prevents the callback from being called too early on return
	} else if (request.action == "fetch") {
		var method = request.method ? request.method.toUpperCase() : 'GET';

		fetch(request.url, {
			method: method,
			body: request.data
		}).then(function (rep) {
			return rep.text()
		}).then(function (res) {
			callback(res)
		}).catch(function () {
			callback()
		})

		return true;
	} else if (request.action == "blobUrlData") {
		var objectUrl = request.data;
		var xhr = new XMLHttpRequest;
		xhr.onload = function () {
			URL.revokeObjectURL(objectUrl)
			var realData = xhr.response;
			var method = request.method ? request.method.toUpperCase() : 'GET';

			fetch(request.url, {
				method: method,
				body: realData
			}).then(function (rep) {
				return rep.text()
			}).then(function (res) {
				callback(res)
			}).catch(function () {
				callback()
			})

		};

		xhr.open('GET', objectUrl);
		xhr.send();

		return true;
	}
});

function eer() {
	console.log('123');
}
