import serverConfig from './config';

// var Mailgun = require('mailgun-js')({apiKey: 'key-0cc25d966ca39450c408884c0dfa0b49', domain: 'mg.instavc.com'});
// var Email = require('../node_modules/email').Email;
var fs = require('fs');

const nodemailer = require('nodemailer');


// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: serverConfig.smtp.host,
    port: serverConfig.smtp.port,
    secure: false, // secure:true for port 465, secure:false for port 587
    auth: {
      user: serverConfig.smtp.username,
      pass: serverConfig.smtp.password
    }
});

var head_url = serverConfig.mail_head_url;
var head_logo = serverConfig.mail_head_logo;
var body_logo = serverConfig.mail_body_logo;
var mail_body_title = serverConfig.mail_body_title;
var head = '';
var mail_body_logo = '';
if (head_logo && head_logo != '') {
	head = '<div> <a href=' + head_url + ' target="#"> <img src=' + head_logo + '> </a> <p style="font-family: monospace;">Make your conference Simple & Easy </p> </div>';
}

if (body_logo && body_logo != '') {
	mail_body_logo = '<img src=' + body_logo + ' style="width: 100%;">';
}
//var test =  fs.readFileSync(process.env.PWD+'/public/EMAIL_TEMPLATES/emailforPayment.html', "utf8");

/*export function createUserMail(exchangeData, response) {
	fs.readFile(process.env.PWD+'/public/EMAIL_TEMPLATES/createuser.html', "utf8", function(err, file) {
		if (err) throw err;
		file = file.replace('[MAIL_CONTENT]', exchangeData.body);
		file = file.replace('[MAIL_HEADER]', head);
		file = file.replace('[MAIL_BODY_TITLE]', mail_body_title);
		file = file.replace('[MAIL_BODY_LOGO]', mail_body_logo);

		var data = {
			from: serverConfig.mail_from_address,
			to: exchangeData.to,
			subject: exchangeData.subject,
			html: file,
		};
		Mailgun.messages().send(data, function (error, body) {
			if (error) {
				console.log(error)
				response({status:false});
			}
			else {
				console.log("attachment sent");
				response({status:true});
			}
		});
	})
}*/


export function createUserMail(exchangeData, response) {
	if (!process.env.PWD) {
	  process.env.PWD = process.cwd();
	}
	console.log("1", process.env.PWD);
	fs.readFile(process.env.PWD+'/public/EMAIL_TEMPLATES/createuser.html', "utf8", function(err, file) {
		if (err) throw err;
		file = file.replace('[MAIL_CONTENT]', exchangeData.body);
		file = file.replace('[MAIL_HEADER]', head);
		file = file.replace('[MAIL_BODY_TITLE]', mail_body_title);
		file = file.replace('[MAIL_BODY_LOGO]', mail_body_logo);
		// var myMsg = new Email(
		// { from: serverConfig.mail_from_address, 
		// 	to: exchangeData.to,
		// 	subject: exchangeData.subject,
		// 	body: file,
		// 	bodyType : 'html'
		// });
		// console.log("myMsg === ", myMsg);
		// myMsg.send(function(error){
		// 	if (error) {
		// 		console.log(error)
		// 		response({status:false});
		// 	} else {
		// 		console.log("attachment sent");
		// 		response({status:true});
		// 	}
		// });
		let mailOptions = {
		    from: serverConfig.mail_from_address,
		    to: exchangeData.to,
		    subject: exchangeData.subject,
		    // text: 'Hello world ?',
		    html: file
		};
		try {

			// send mail with defined transport object
			transporter.sendMail(mailOptions, (error, info) => {
				try {
			    if (error) {
						console.log(error)
						response({status:false});
					}	else {
						console.log("attachment sent");
						response({status:true});
					}
			    console.log('Message %s sent: %s', info.messageId, info.response);
			  } catch(e) {
					console.log("inner invalid smtp settings in createUserMail === ", e);
				}  
			});
		} catch(e) {
			console.log("invalid smtp settings in createUserMail === ", e);
		}
	})
}

export function createCorporateMail(exchangeData, response) {

	fs.readFile(process.env.PWD+'/public/EMAIL_TEMPLATES/emailforPayment.html', "utf8", function(err, userFile) {
        if (err) throw err;

	/*file=file.replace('[RECIVER_NAME]',exchangeData.name);
	file= file.replace('[SENDER_NAME]',exchangeData.creatorName);*/
	userFile = userFile.replace('[MAIL_CONTENT_FNAME]', exchangeData.firstname);
	userFile = userFile.replace('[MAIL_CONTENT_ORDERID]', exchangeData.order_id);
	userFile = userFile.replace('[MAIL_CONTENT_PASSWORD]', exchangeData.password);

	var data = {
	          from: serverConfig.mail_from_address,
	          to: exchangeData.to,
	          subject: exchangeData.subject,
	          html: userFile,
	          bcc : exchangeData.whoCreated
                  
            };
	// Mailgun.messages().send(data, function (error, body) {
 //      	if (error) {
 //      		response({status:false});
 //        }
 //       	else {
 //             console.log("User created and mail sent successfully");
 //             response({status:true});
                        
 //        }
 //    });

})


}



/*export function resetRequestMail(exchangeData, response) {
	fs.readFile(process.env.PWD+'/public/EMAIL_TEMPLATES/resetRequest.html', "utf8", function(err, file) {
		if (err) throw err;
		file = file.replace('[MAIL_CONTENT]', exchangeData.body);
		var data = {
			from: serverConfig.mail_from_address,
			to: exchangeData.to,
			subject: exchangeData.subject,
			html: file,
		};
		Mailgun.messages().send(data, function (error, body) {
			if (error) {
				console.log(error)
				response({status:false});
			}
			else {
				console.log("attachment sent");
				response({status:true});
			}
		});
	})
}*/

export function resetRequestMail(exchangeData, response) {
	fs.readFile(process.env.PWD+'/public/EMAIL_TEMPLATES/resetRequest.html', "utf8", function(err, file) {
		if (err) throw err;
		file = file.replace('[MAIL_CONTENT]', exchangeData.body);
		file = file.replace('[MAIL_HEADER]', head);
		let mailOptions = {
		    from: serverConfig.mail_from_address,
		    to: exchangeData.to,
		    subject: exchangeData.subject,
		    // text: 'Hello world ?',
		    html: file
		};
		try {
			// send mail with defined transport object
			transporter.sendMail(mailOptions, (error, info) => {
				try {
			    if (error) {
						console.log(error)
						response({status:false});
					}	else {
						console.log("attachment sent");
						response({status:true});
					}
			    console.log('Message %s sent: %s', info.messageId, info.response);
			  } catch(e) {
					console.log("inner invalid smtp settings in createUserMail === ", e);
				} 
			});
		} catch(e) {
			console.log("invalid smtp settings in resetRequestMail === ", e);
		}
	});
}


/*export function defaultUserMail(exchangeData, response) {
	fs.readFile(process.env.PWD+'/public/EMAIL_TEMPLATES/defaultMail.html', "utf8", function(err, file) {
		if (err) throw err;
		file = file.replace('[MAIL_CONTENT]', exchangeData.body);
		file = file.replace('[MAIL_DESCREPTION]', exchangeData.descreption);
		file = file.replace('[MAIL_HEADER]', head);
		file = file.replace('[MAIL_BODY_TITLE]', mail_body_title);
		var data = {
			from: serverConfig.mail_from_address,
			to: exchangeData.to,
			subject: exchangeData.subject,
			html: file,
		};
		// Mailgun.messages().send(data, function (error, body) {
		// 	if (error) {
		// 		console.log(error)
		// 		response({status:false});
		// 	}
		// 	else {
		// 		//console.log("attachment sent");
		// 		response({status:true});
		// 	}
		// });
	})
}*/

export function defaultUserMail(exchangeData, response) {
	fs.readFile(process.env.PWD+'/public/EMAIL_TEMPLATES/defaultMail.html', "utf8", function(err, file) {
		if (err) throw err;
		file = file.replace('[MAIL_CONTENT]', exchangeData.body);
		file = file.replace('[MAIL_DESCREPTION]', exchangeData.descreption);
		file = file.replace('[MAIL_HEADER]', head);
		file = file.replace('[MAIL_BODY_TITLE]', mail_body_title);
		let mailOptions = {
		    from: serverConfig.mail_from_address,
		    to: exchangeData.to,
		    subject: exchangeData.subject,
		    // text: 'Hello world ?',
		    html: file
		};
		try {
			// send mail with defined transport object
			transporter.sendMail(mailOptions, (error, info) => {
				try {
			    if (error) {
						console.log(error)
						response({status:false});
					}	else {
						console.log("attachment sent");
						response({status:true});
					}
			    console.log('Message %s sent: %s', info.messageId, info.response);
			  } catch(e) {
					console.log("inner invalid smtp settings in createUserMail === ", e);
				} 
			});
		} catch(e) {
			console.log("invalid smtp settings in defaultUserMail === ", e);
		}
	})
}

export function createuserAndResetpassword(exchangeData, response) {
	fs.readFile(process.env.PWD+'/public/EMAIL_TEMPLATES/resetUserPassword.html', "utf8", function(err, file) {
		if (err) throw err;

		file = file.replace('[MAIL_CONTENT]', exchangeData.body);
		file = file.replace('[MAIL_HEADER]', head);
		file = file.replace('[MAIL_BODY_TITLE]', mail_body_title);
		file = file.replace('[MAIL_BODY_LOGO]', mail_body_logo);

		let mailOptions = {
		    from: serverConfig.mail_from_address,
		    to: exchangeData.to,
		    subject: exchangeData.subject,
		    html: file
		};
		try {
			// send mail with defined transport object
			transporter.sendMail(mailOptions, (error, info) => {
				try {
			    if (error) {
						console.log(error)
						response({status:false});
					}	else {
						console.log("attachment sent");
						response({status:true});
					}
			    console.log('Message %s sent: %s', info.messageId, info.response);
			  } catch(e) {
					console.log("inner invalid smtp settings in createUserMail === ", e);
				} 
			});
		} catch(e) {
			console.log("invalid smtp settings in resetRequestMail === ", e);
		}
	});
}
