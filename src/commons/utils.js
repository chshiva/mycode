/**
    * httpRequest method will call the back end api services, input as endpoint, method and body
    * @param body: Payload details to make API calls
    * @param cb : to return response
    * @author  Madhusudhan
    * @version 1.0
*/

class Utils {
  constructor() {
  }

  httpRequest(endpoint, method, data, cb) {

    var xmlhttp;
    var self = this;

    var token = localStorage.getItem('userAuthToken');

    // const host = 'https://gppserver.ngrok.io/api';
    const host = process.env.API_URL;
    var url = host + "/api/" + endpoint;

    if (window.XMLHttpRequest) {
      // code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp = new XMLHttpRequest();
    } else {
      // code for IE6, IE5
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    console.log("httpRequest 4");
    if (xmlhttp) {
      xmlhttp.open(method, url, true);
      xmlhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4) {
          // console.log(" ---------------- ");
          // console.log("xmlhttp ", xmlhttp);
          // console.log("xmlhttp.status ", xmlhttp.status);
          // console.log(" ---------------- ");
          if(xmlhttp.status != 0 ){
            if (xmlhttp.response != "") {
              var response = JSON.parse(xmlhttp.response);
              cb && cb(response);
            }
          } else {
            var response = { status: false, result: { message: "Connection Refused"} };
            cb && cb(response);
          }
          
        }
      }
      // xmlhttp.timeout = 10000; 
      // xmlhttp.ontimeout = function (e) {
      //   var response = { status: false, result: { message: "Connection Timeout" } }
      //   cb && cb(response);
      //   // XMLHttpRequest timed out. Do something here.
      // };
      xmlhttp.setRequestHeader('x-access-token', token || '');
      xmlhttp.send(JSON.stringify(data));
    }
  }
}

var utils = new Utils();
export default utils;