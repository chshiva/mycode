import Users from '../models/users';
import Corporate from '../models/corporate';
import { Roles } from './admin.user.controller';
var mongoose = require('mongoose');
var validator = require('validator');
import md5 from 'md5';
import * as EmailForUserCreation from '../emailFunctions';
import download from 'image-downloader';
import { createRandomString } from '../randomstring';
import moment from 'moment';
import serverConfig from '../config';
import { addSlash } from './slashesActions';

export function searchCorporate(req, res) {
	try {
		//console.log("req.body.searchData", req.body.searchData);
		// let obj = req.body.searchData;
		if(req.params.input || req.params.input.trim()!='') {
			let selector = {
				businessName : {
					"$regex" : addSlash(req.params.input),
					"$options" : "i"
				}
			}
			if (serverConfig.bussinessType && serverConfig.bussinessType != '') {
				selector["businessType"] = serverConfig.bussinessType;
			}
			let query = Corporate.find(selector).select('_id businessName');
			query.exec(function(err, corp) {
				if(err) {
					//console.log("error while Searching", err);
					res.json({status: false, error: err })
				} else {
					// console.log("corporate name", corp);
					res.json({status : true, data : corp});
				}
			});	
		} else {
			res.json({status: false, error : "Invalid Request"})
		}
	} catch(e) {
		console.log('error in searchCorporate',e);
		res.json({
			status: false,
			error: 'Internal server error'
		});
	}
}

export function saveRegistData(req, res) {
	// console.log("save data", req.body.data);
	try {
		if(req.body.data && req.body.data && req.body.data['profile.companyid'] && mongoose.Types.ObjectId.isValid(req.body.data['profile.companyid'])) {
			let obj = req.body.data;
			// console.log("save data", obj);
			// console.log("save data companyid", obj.companyid);
			// console.log("password", obj.userPassword);
			let corporatequery = Corporate.findOne({ _id : obj['profile.companyid'] }).select('businessType');
			corporatequery.exec( function(corperr, company) {
				if (company) {
					let checkrole = Roles.Admin;
					let role = Roles.User;
					if (company.businessType == 'Conference') {
						checkrole = Roles.Admin;
						role = Roles.User;
					} else if (company.businessType == 'LMS') {
						checkrole = Roles.Lmsadmin
						role = Roles.Student;
					} else if (company.businessType == 'Presenter') {
						checkrole = Roles.Presenteradmin
						role = Roles.Attendee;
					} else if (company.businessType == 'CRM') {
						checkrole = Roles.CRMadmin
						role = Roles.CRMuser;
					}
					let slash_email = addSlash(obj.email);
					var chkUser = Users.findOne({ $or: [{ email: slash_email }, { gmail: slash_email }, { faceboookMail: slash_email }]});	
					chkUser.exec(function(chkError, personExists) {
						if (chkError) {
							res.json({status : false, error : chkError});
						} else if (personExists == null) {
							var userQuery = Users.findOne({ "profile.companyid": company._id, "role": checkrole });
							userQuery.exec(function(personErr, person){
								if (personErr) {
									// console.log("personErr", personErr);
									res.json({status: false, error: personErr });
								} else if(person) {
									if (((obj['loginType'] === 'Google') && obj['googleId']) || ((obj['loginType'] === 'Facebook') && obj['facebookId'])) {
										// console.log(1,"Application signup")		

										
									} else {
										let slashsPassword = addSlash(obj.userPassword);
										obj["password"] = md5(slashsPassword);
										obj['loginType'] = 'Application';
										var dob = obj['dateofbirth'];
										//Verifying if requestedUserDateOfBirthData is there or not
										if (dob) var dob = moment(dob, "DD/MM/YYYY");
										 else dob = '';
										obj["profile.dateofbirth"] = dob;
									}
									obj["role"] = role;
									obj["dateAdded"] = moment().utc().toDate();
									obj["createdby"] = mongoose.Types.ObjectId(person._id);
									obj["modifiedby"] = mongoose.Types.ObjectId(person._id);
									obj["userStatus"] = 'Registered';

									var randomstring = '';
									
								  //Function call for creating randomstring
								  createRandomString(function(data) {
										randomstring = data
								  });
									// console.log(obj['profile']['profileImage'])
									//options for save image from google 

									const createUserFunction = (obj) =>{
										var dob = obj.dateofbirth;
										//Verifying if requestedUserDateOfBirthData is there or not
										if(dob) {
											var dob = moment(dob, "DD/MM/YYYY");
										} else {
											dob = '';
										}
										obj["profile.dateofbirth"] = dob;								
										obj["role"] = role;
										obj["dateAdded"] =moment().utc().toDate();
										obj["createdby"] = mongoose.Types.ObjectId(person._id);
										obj["modifiedby"] = mongoose.Types.ObjectId(person._id);
										
										//  console.log(obj['profile']['profileImage'])

										//var stuObj = new Users(obj);
										Users.create([obj], function(err, corp) {
											if(err) {
												console.log("error while Creating", err);
												res.json({status: false, error: err.message });
											} else if(corp) {
												// console.log("corp data", corp);
												
												var exchangeData = {
												to : person.email,
												whoCreated :obj.email,
												subject : 'New Student Registered',
												body : 'Student with name '+obj.firstname+' has been registered'
											}
				
											//Email will be sent to user after creating user successfully
											EmailForUserCreation.createUserMail(exchangeData, function(emailerror, emailsuccess) {
												//console.log(emailerror.status)
												if (emailerror.status == false) {
													console.log("Email not sent");
												} else {
													console.log('email sent')
													res.json({status : true, message:"Registered successfully"});
												}
											});
											}
										});
									}	
									
									if (!((obj['loginType']==='Google' && obj['googleId'])|| (obj['loginType'] === 'Facebook' && obj['facebookId']))) {					
										let slashsPassword = addSlash(obj.userPassword);
										obj["password"] = md5(slashsPassword);
										obj['loginType'] = 'Application';
										createUserFunction(obj);				
									} else {
										const options = {
											url: obj['profileImage'],
											dest: process.env.PWD+'/uploads/'+randomstring+'.jpg'
										};
										download.image(options)
										.then(({ filename, image }) => {
										  filename = filename.replace(process.env.PWD+'/uploads/', '');
										  obj['profile'] = {};
										  obj['profile']['profileImage'] = filename
										  obj['profile']['dateofbirth'] = obj['dateofbirth']
										  createUserFunction(obj);
										}).catch((err) => {
											console.log(err)
										  createUserFunction(obj)
										  throw err
										});
									}
								} else if(person == null) {
									//console.log("person undifined", person);
									res.json({status : false, error : "Admin does not exist. Please contact your institute"});		
								}
							})
						} else {
							// console.log("Email Id already exists")
							res.json({status : false, error : "Email Id already exists"});
						}
					});
				} else {
					res.json({status : false, error : "Invalid institute"});
				}
			});	
					
		} else {
			res.json({status: false, error: "Invalid Request"});
		} 
	} catch(e) {
		console.log('error in saveRegistData',e);
		res.json({ status : false, error : "Internal server error" });
	}
}