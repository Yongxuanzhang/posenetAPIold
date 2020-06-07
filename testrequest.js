
var request = require('request');

var headers = {
    'Content-Type': 'application/json'
};
var dataString = '{"api_key": "62c88183-f43d-4e90-8219-4a1aa1dc4287"}';
var options = {
    url: 'https://api.wrnch.ai/v1/login',
    method: 'POST',
    headers: headers,
    body: dataString
};
function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
}
request(options, callback);