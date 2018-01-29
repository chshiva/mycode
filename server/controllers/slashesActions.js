var slashes = require('slashes');

export function addSlash(msg) {
	// console.log("msg---- ", msg);
	/*var newMsg = slashes.add(msg);
	console.log("newMsg---- ", newMsg);
	return newMsg;*/
	return slashes.add(msg);
}

export function stripSlash(msg) {
	// console.log("strip msg1---- ", msg);
	return (msg != undefined ? slashes.strip(msg, 2) : msg);
	/*var newMsg = slashes.strip(msg, 2);
	console.log("strip newMsg2---- ", newMsg);
	console.log("after === ", (newMsg != 'undefined' ? newMsg : ''));
	return (newMsg != 'undefined' ? newMsg : '');*/
}