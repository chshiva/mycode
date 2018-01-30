import React, { PropTypes,Component } from 'react';
import { Expressions } from '../lib/expressions.js';
import validator from 'validator';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

var _ = require('lodash');

export default class Validator {
	constructor(){

	}

	static activeSubMenu(menu, key){
		_.forIn(menu.menus, function(obj, index){
			if(obj._id == key)
				obj.active = 'active';
			else
				obj.active = '';
		});
		return menu;
	}

	static freeError (schema){
		_.forIn(schema.schemas, function(schemaObj, schemakey){
			_.forIn(schemaObj, function(colObj, colVal){
				_.forIn(colObj, function(fieldObj, fieldVal){
					if(fieldObj.type != "hidden" || fieldObj.type != "title"){
						fieldObj.error = "";
					}
				});
			});
		});
		return schema; 
	}

	static freeValue (schema){
		_.forIn(schema.schemas, function(schemaObj, schemakey){
			_.forIn(schemaObj, function(colObj, colVal){
				_.forIn(colObj, function(fieldObj, fieldVal){
					if(fieldObj.type != "hidden" || fieldObj.type != "title"){
						fieldObj.error = "";
					}
					if(fieldObj.type == "text" || fieldObj.type == "textarea" || fieldObj.type == "password" || fieldObj.type == "search" || fieldObj.type == "date" || fieldObj.type == "email"){
						fieldObj.value = "";
					}else if(fieldObj.type == "phone" || fieldObj.type == "checkbox"){
						fieldObj.value = [];
					}else if(fieldObj.type == "dropdown"){
						//console.log("text === ",fieldObj.text);
						//console.log("data === ",fieldObj.data);
						/*let val;
						if(fieldObj.value)
							val = fieldObj.value;
						else*/
						let val = fieldObj.data[0][0];
						fieldObj.value = val;
					}
				});
			});
		});
		return schema;
	}

	static validate (dataObj, schema, role, intl) {

		/*_.forIn(dataObj, function(value, key) {
		  console.log("key === ",key);
		  console.log("value === ",value);

		});*/
		//console.log(intl);

		var errmsg = [];

		_.forIn(schema.schemas, function(schemaObj, schemakey){
			_.forIn(schemaObj, function(colObj, colVal){
				_.forIn(colObj, function(fieldObj, fieldVal){
					if(!fieldObj.role || (fieldObj.role && fieldObj.role.length <= 0) || (fieldObj.role && _.indexOf(fieldObj.role, role) != -1)){
						if(fieldObj.type != "hidden" || fieldObj.type != "title" || fieldObj.type != "view"){
							var val = _.result(dataObj, fieldObj.datafield);
							// console.log(fieldObj.text+" ======   "+val);

							//Code changed by - Najib Hasnain, Desc - Required error messages are shown based on input field type  
							if(fieldObj.required){
								if(val == "" || val == undefined){
									if(fieldObj.type == 'dropdown' || fieldObj.type == 'dynamicdropdown') {
										let newMsg = '';
										if(!intl.messages[fieldObj.text.props.id].match(/select/i)) {
											newMsg = intl.messages['select_dropdown'] + ' ' + intl.messages[fieldObj.text.props.id]; 
					          } else {
					          	newMsg = intl.messages[fieldObj.text.props.id];
					          }
										fieldObj.error = intl.messages['requiedField'] +' '+newMsg;
										errmsg.push(fieldObj.error);	
									} else if (fieldObj.type == 'date') {
										fieldObj.error = intl.messages['requiedFieldDate'] +' '+intl.messages[fieldObj.text.props.id];
											errmsg.push(fieldObj.error);
									} else {
										fieldObj.error = intl.messages['requiedFieldText'] +' '+intl.messages[fieldObj.text.props.id];
											errmsg.push(fieldObj.error);
									}									
								} else {
									fieldObj.error = "";
								}
							}
							if(val == "" || val == undefined){
								if(fieldObj.type == "phone")
									fieldObj.value = [];
								else
									fieldObj.value = "";
							}else{
								fieldObj.value = val;
							}
							//console.log("fieldObj === ",fieldObj);
							//console.log(fieldObj.text+" ======   "+fieldObj.value);
							if(fieldObj.exp != undefined && fieldObj.exp != ""){
								if(val.length > 0){
									var strRegExp = RegExp(Expressions.get(fieldObj.exp));
									if(String(strRegExp) != "/(?:)/" ){
							          	if(!strRegExp.test(val)){
							          		if(fieldObj.errormsg){
								            	fieldObj.error = fieldObj.errormsg;
								            	errmsg.push(fieldObj.errormsg);
								            }else{
								            	fieldObj.error = intl.messages['validInputData'] +' '+intl.messages[fieldObj.text.props.id];
															errmsg.push(fieldObj.error);
								            	// fieldObj.error = "Invalid Format.";
								            	// errmsg.push("Invalid Format.");
								            }
							          	}else{
							          		fieldObj.error = "";
							          	}
							        }
							    }
							} else if(fieldObj.type == "phone"){
								if(val.length > 0){
									let number = val[1];
									let code = val[0];
									let format = val[2];
									let check = true;
									if(number && format){
									    if(number.length == format.length){
									      for (var i = 0; i < format.length - 1; i++) {
									        if(format[i] != number[i] && format[i] != '.' && /^[0-9]$/.test(+number[i])){
									            check = false;
									        }
									      }
									    }else{
									      check = false;
									    }
									}
							   	if(!check && number != '+91'){
							   		fieldObj.error = intl.messages['validInputData'] +' '+intl.messages[fieldObj.text.props.id];
														errmsg.push(fieldObj.error);
							    }else
							   		fieldObj.error = '';
						    }
							} else if (fieldObj.type == "date" && val == "false") {
								fieldObj.error = intl.messages['validInputData'] +' '+intl.messages[fieldObj.text.props.id];
								errmsg.push(fieldObj.error);
							}
						}
					}
				});
			});
		});

		// console.log("schema === ",schema.schemas);

		return { schema : schema, error : errmsg };
	}

}