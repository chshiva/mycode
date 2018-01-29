//import React, { Component, PropTypes } from 'react';

export default class DataObject {
	constructor(obj){
		this.res = {};
		this.revObj = {};
		this.recurse(obj);
		return this.res;
	}

	recurse(obj, current) {
		for(var key in obj) {
	      var value = obj[key];
	      var newKey = (current ? current + "." + key : key);  // joined key with dot
	      if(value && typeof value === "object") {
	      	if (Array.isArray){
	      		if(Array.isArray(value)){
	      			/*for(var i = 0; i < value.length; i++){
	      				let index = newKey+"["+i+"]";
	      				this.res[index] = value[i];
	      			}*/
	      			this.res[newKey] = value;
	      		}else{
	      			this.recurse(value, newKey);  // it's a nested object, so do it again
	      		}
	      	}
	      } else {
	        this.res[newKey] = value;  // it's not an object, so set the property
	      }
	    }
	}

	// static reverseObject = function(objTest){
	// 	var objTemp = {};
	// 	for(var key in objTest) {
	//       var value = objTest[key];
	//       // console.log(key)
	//       if(key.indexOf(".") !== -1){

	//       	let arr = key.split('.'),
	// 		obj, o = obj = {};

	// 		arr.forEach(vkey=>{o=o[vkey]={}});
	// 		_.set(obj, key, objTest[key]);
	// 		// this.revObj[arr[0]] = this.revObj[arr[1]] = objTest[key];      	
	// 		console.log("Arr", obj);
	//       }else{
	//       	console.log(objTemp);
	//       	// this.revObj = Object.assign({}, this.revObj, objTest[key] );
	//       	objTemp[key] = objTest[key];
	//       	console.log("NOR", objTemp);
	//       }
	//       // var newKey = (current ? current + "." + key : key);  // joined key with dot
	//       // if(value && typeof value === "object") {
	//       //   this.recurse(value, newKey);  // it's a nested object, so do it again
	//       // } else {
	//       //   this.res[newKey] = value;  // it's not an object, so set the property
	//       // }
	//     }
	// 	// let str = objTest,
	// 	// arr = str.split('.'),
	// 	// obj, o = obj = {};

	// 	// arr.forEach(key=>{o=o[key]={}});

	// 	// console.log(this.revObj);
	// }
}