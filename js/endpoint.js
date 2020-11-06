(function (w) {
    const myHost = "localhost";
    const port = "7264";


    w.py_getDestPath = function (callback) {
        chrome.runtime.sendMessage({
            method: 'POST',
            action: 'fetch',
            url: `http://${myHost}:${port}/getPathList`
        }, function (data) {
            console.log(data)
            callback(JSON.parse(data))
        })
    }

    w.py_sendData = function (request, callback) {
        chrome.runtime.sendMessage({
            method: 'POST',
            action: 'fetch',
            url: `http://${myHost}:${port}/makePicture`,
            data: request
        }, function (data) {
            callback(JSON.parse(data))

        });

    }

    w.py_openPathFolder = function (request) {
        chrome.runtime.sendMessage({
            method: 'POST',
            action: 'fetch',
            url: `http://${myHost}:${port}/openPathFolder`,
            data: request
        }, function (responseText) { });

    }
})(window);