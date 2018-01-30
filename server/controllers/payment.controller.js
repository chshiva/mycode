import Users from '../models/users';
import Package from '../models/package';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';
import md5 from 'md5';
import * as EmailForCorporateCreation from '../emailFunctions';
var _ = require('lodash');
var mongoose = require('mongoose');
var moment = require('moment');
var validator = require('validator');
import {addSlash} from './slashesActions';

export function websitePackageSelection(req, res){
	try {
	if(!req.body){
	    res.json({status: false, error : "Invalid request"});
	}else{

		let savingUserObject = {};
		let savingPackageObject ={};
		if(validator.isEmpty(req.body.email)){
			res.json({ status : false, error : "InValid user." });
		}else{
			Users.findOne({ email: addSlash(req.body.email) }, function(errorinFind, alreadyExists) {
			if(errorinFind){
				res.json({ status: false, error: errorinFind });
			} else if(alreadyExists){
				res.json({ status: false, error: "Email already existed" });
			}else{

				savingUserObject["modifiedAt"] 	= moment().utc().toDate();
				savingUserObject["dateAdded"] 	= moment().utc().toDate();
				savingUserObject["password"] 	= md5(req.body.password);
				savingUserObject["firstname"] 	= req.body.firstname;
				savingUserObject["lastname"] 	= req.body.lastname;
				savingUserObject["email"] 		= req.body.email;
				savingUserObject["profile.phone"] = req.body.phone;
				savingUserObject["profile.companyid"] = '';
				savingUserObject["profile.position"] = '';
				savingUserObject["profile.dept"] = '';
				savingUserObject["profile.roomid"] = '';
				savingUserObject["modifiedby"]	='self';
				savingUserObject["createdby"]	='self';
				savingUserObject['role'] = 2;
				
				const objUser = new Users(savingUserObject);
				Users.create([objUser], (error,data) => {
					if (!error) {
						Users.findOne({ _id : data[0]._id }, function(saveError, doc){
							if (saveError) {
								//console.log(error);
								res.json({ status: false, error : saveError });
							}else{
                             	doc.modifiedby 	= mongoose.Types.ObjectId(doc._id);
								doc.createdby 	= mongoose.Types.ObjectId(doc._id);
								doc.save();

								savingPackageObject['createdBy'] = mongoose.Types.ObjectId(doc._id);
					            savingPackageObject['modifiedBy'] = mongoose.Types.ObjectId(doc._id);
					            savingPackageObject['createdAt'] = moment().utc().toDate();
					            savingPackageObject['modifiedAt'] = moment().utc().toDate();
					            savingPackageObject['packageValidity'] = req.body.validity;
					            savingPackageObject['packageName'] = req.body.packageName;
					            savingPackageObject['packagePrice'] = req.body.packagePrice ;
					            savingPackageObject['userCount'] = req.body.userCount;
					            savingPackageObject['userPresence'] = req.body.userPresence;
					            savingPackageObject['serverLocation'] = req.body.serverLocation;
					            savingPackageObject['assignedTo'] = mongoose.Types.ObjectId(doc._id);
					            
					            savingPackageObject['payment_details.order_id'] = req.body.order_id;
					            savingPackageObject['payment_details.tracking_id'] = req.body.tracking_id;
					            savingPackageObject['payment_details.bank_ref_no'] = req.body.bank_ref_no ;
					            savingPackageObject['payment_details.order_status'] = req.body.order_status;
					            savingPackageObject['payment_details.failure_message'] = req.body.failure_message;
					            savingPackageObject['payment_details.card_name'] = req.body.card_name;
					            savingPackageObject['payment_details.status_code'] = req.body.status_code;
					            savingPackageObject['payment_details.status_message'] = req.body.status_message;
					            savingPackageObject['payment_details.currency'] = req.body.currency ;
					            savingPackageObject['payment_details.card_type'] = req.body.card_type;
					            savingPackageObject['payment_details.data_accept'] = req.body.data_accept;
					            savingPackageObject['payment_details.card_number'] = req.body.card_number;
					            savingPackageObject['payment_details.expiry_month'] = req.body.expiry_month;
					            savingPackageObject['payment_details.expiry_year'] = req.body.expiry_year;
					            savingPackageObject['payment_details.cvv_number'] = req.body.cvv_number ;
					            savingPackageObject['payment_details.issuing_bank'] = req.body.issuing_bank;
					            savingPackageObject['payment_details.mm_id'] = req.body.mm_id;
					            savingPackageObject['payment_details.promo_code'] = req.body.promo_code;
					            
					            var objEntity = new Package(savingPackageObject);
					            objEntity.save(function (err, documents) {
						            if (err){
						            	res.json({ status : false, error : err });
						            }else{


						            	Users.findOne({_id:  mongoose.Types.ObjectId(documents.createdBy)},function(errinFind,name){
						            		if(errinFind)
						            		{
						            			res.json({status:false,error:errinFind});
						            		} else {
						
					                        if(name && name.email){
					                          // var exchangeData = {
					                          //   to : name.email,
					                          //   whoCreated :name.email,
					                          //   subject : 'Package Purchased !! Get details',
					                          //   body : 'Package has been created with '+name.firstname+'. Your order number is '+req.body.order_id +' and password '+req.body.password+'. Kindly Login to your profile and change password.'
					                          // }
					                           var exchangeData = {
					                            to : name.email,
					                            whoCreated :name.email,
					                            subject : 'Package Purchased !! Get details',
					                            firstname : name.firstname,
					                            order_id : req.body.order_id ,
					                            password : req.body.password
					                          }
					                          EmailForCorporateCreation.createCorporateMail(exchangeData);
					                          res.json({ status : true, message : "Check your mail for detail" });
					                          
					                        }else{

					                          res.json({ status: false, error: "Data saved but Email not sent"});
					                        }
						           }
					                        
					                      });
						            	//res.json({ status : true, message : "Created successfully." });
						            }
					            });
								//res.json({ status: true, message : "Updated successfully." });
							}
						});
					} else {
						res.json({ status: false, error: error, message:'User not created'});
					}
				});
			}
		});
	}
} 
} catch(error) {
	console.log('error in websitePackageSelection',e);
	res.json({status:false,error:'Internal server error'})
}
}


export function websiteEmailValidation(req, res){	
	try {
		Users.findOne({ email: req.body.email }, function(err, doc) {
			if(doc){
				res.json({ status: false, error: "Email already existed" });
				
			} else {
				res.json({ status: true, error: "no error" });
			}
		});
	} catch (e) {
		console.log('error in websiteEmailValidation',e);
		res.json({
			status: false,
			error: 'Internal server error'
		});	
	}
}