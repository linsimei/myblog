var http = {
    post: function (url, data, callback) {
        var request = new XMLHttpRequest();
        // request.open('GET', '/my/url', true);

        request.onload = function () {
            if (this.status >= 200 && this.status < 400) {
                // Success!
                var json = JSON.parse(this.response);
                callback(json)
            } else {
                // We reached our target server, but it returned an error

            }
        };

        request.onerror = function () {
            // There was a connection error of some sort
        };
        request.open('POST', url, true);
        request.send(data);
    },
    get: function (url, callback) {
        var request = new XMLHttpRequest();

        request.onload = function () {
            if (this.status >= 200 && this.status < 400) {
                // Success!
                var json = JSON.parse(this.response);
                callback(json)
            } else {
                // We reached our target server, but it returned an error

            }
        };

        request.onerror = function () {
            // There was a connection error of some sort
        };
        request.open('get', url, true);
        request.send();
    }
}