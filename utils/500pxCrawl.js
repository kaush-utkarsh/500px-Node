var request = require("request");
var cheerio = require('cheerio');


var doLogin = function (credentials, callback) {    
    var cookieJar = request.jar();
    request.get({
        url: 'https://500px.com/login',
        jar: cookieJar
    }, function getCallBack(err, httpResponse, body1) {
        if (err) {
            callback(err, {"success": false})
        }
        $ = cheerio.load(body1);
        var authenticity_token = $('meta[name="csrf-token"]').attr('content');
        var formData = {'session[email]':credentials.username, 'session[password]':credentials.password,authenticity_token:authenticity_token}
        var headers = {}
        headers['Connection'] = "keep-alive"
        headers['Content-Type'] = "application/x-www-form-urlencoded"
        headers["User-Agent"]="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/48.0.2564.116 Chrome/48.0.2564.116 Safari/537.36"
        headers["Accept"] = "application/json, text/javascript, */*; q=0.01"
        headers['Accept-Encoding'] = 'gzip, deflate'
        headers['Accept-Language'] = 'en-US,en;q=0.8'
        headers['Origin'] = 'https://500px.com'
        request.post({
            url: 'https://api.500px.com/v1/session', 
            jar: cookieJar,
            form: formData,
            headers: headers
        }, function postCallback(err, httpResponse, body2) {
	        	if(httpResponse.hasOwnProperty('headers') && httpResponse.headers.hasOwnProperty('status') && httpResponse.headers.status=='200 OK')
			        callback(err, {"success": true, responseObj: body2, cookieJar:cookieJar})
	    		else
			        callback(err, {"success": false})
        });
    });
}

var fetchAllImages = function (credentials, callback) {    
    var cookieJar = credentials.cookieJar;
    request.get({
        url: 'https://500px.com/manage/public',
        jar: cookieJar
    }, function getCallBack(err, httpResponse, body1) {
        if (err) {
            callback(err, {"success": false})
        }
        $ = cheerio.load(body1);
        var authenticity_token = $('meta[name="csrf-token"]').attr('content');
        var headers = {}
        headers['Connection'] = "keep-alive"
        headers['Content-Type'] = "application/x-www-form-urlencoded"
        headers["User-Agent"]="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/48.0.2564.116 Chrome/48.0.2564.116 Safari/537.36"
        headers["Accept"] = "application/json, text/javascript, */*; q=0.01"
        headers["AUTHORIZATION"] = "PxToken "+authenticity_token
        headers['Accept-Encoding'] = 'gzip, deflate, sdch'
        headers['Accept-Language'] = 'en-US,en;q=0.8'
        headers['Origin'] = 'https://500px.com'
    	request.get({
	        url: 'https://webapi.500px.com/organizer/library?sort=created_at&only_profile=true&page=1&rpp=100',
            headers: headers,
	        jar: cookieJar
	    }, function getCallBack(err, httpResponse, body2) {
	    	console.log('fetched data')
	    	console.log(body2)
	    });

    });
}

module.exports = {
    doLogin:doLogin,
    fetchAllImages:fetchAllImages
};
