import fileUpload from 'express-fileupload';
import path from 'path';
import Room from '../models/room';
import Users from '../models/users';
import Topic from '../models/topic';
import Uploads from '../models/upload';
import Assignment from '../models/assignment';
var multer  = require('multer');
import { Roles } from './admin.user.controller';
import md5 from 'md5';
var fs = require('fs');
var mongoose = require('mongoose');
var validator = require('validator');
var moment = require('moment');
var request = require('request');
var excel2Json = require('node-excel-to-json');
var shell = require('shelljs');
var _ = require('lodash');
import { checkUsersCount } from './admin.controller'
import { createRandomString } from '../randomstring'
import { checkValidRequest } from '../authorization';
var async = require("async");
import eachOf from 'async/eachOf';
import {processForPlagiarismCheck} from './plagiarismcheck.controller';
import serverConfig from '../config';
import { sendPushNotificationAndroid } from './mobile.controller';
import { roomStudentData } from './room.controller';
// var unoconv = require('better-unoconv');


// var listener = unoconv.listen({ port: 2002 });

// listener.stderr.on('data', function (data) {
//   console.log('stderr: ' + data.toString('utf8'));
// });


//Currently unused
export function upload(req, res) {
  //console.log("uploads");
  //console.log(req.body.userId);
  try {
    let files;
    if(req.body.userId =='undefined') {
      res.json({
      	status:false,
      	error:"Not Authorized"
      });
    }
    if (!req.files) {
      res.send('No files were uploaded.');
      return;
    }
    files = req.files.file;
    //console.log("name----",files.name);
    //console.log('files', files);

    files.mv(path.resolve('uploads', files.name), function (err) {
      if (err) {
        //console.log(err);
        res.status(500).send(err);
      } else {

        var uid = mongoose.Types.ObjectId(req.body.userId);

        Users.findOne({
        	_id:uid
        },function(findOneError,doc) {
          if(findOneError) {
            res.json({
            	status:false,
            	error:findOneError
            });
          } else if(doc) {
  					doc.profile.profileImage = files.name;
  					doc.save(function(updateFail,update) {
  						if(updateFail) {
  						  res.json({
  						  	status:false,
  						  	error:updateFail
  						  });
  						} else {
  						  //console.log('file uploaded');
  						  res.json({
  						  	status:false,
  						  	message:"file uploaded"
  						  });
  						}
  					});
          }
        });
      }
    });
  } catch(e) {
    console.log('error in upload',e);
    res.json({
      status: false,
      error: 'Internal server error'
    });
  }
}

/**
*  @Function name : profileUpload
*  @Purpose : For uploading profile image
*  @Request Object : { uid: 'user id', img: 'image data', name: 'image name' }
*  @Response Object : Success - Upload data, Failure - Error message
*  @Author : Aniket Gupta
*/

export function profileUpload(req, res) {
  try {
    //Verifying if request is valid or not
    if(!req.body.uid) { 
      // res.json({
      // 	status:false,
      // 	error:"Internal server error"
      // });
      console.log("Profile upload - 401");
      res.status(401).end();
    } else {
      let tempFileName = req.body.name.replace(/[ )(]+/g, '');
      let fileExt = tempFileName.substr(tempFileName.lastIndexOf(".") + 1);
      if ((req.body.type != 'image/png' && req.body.type != 'image/jpeg' && req.body.type != 'image/jpg') /* || (fileExt != 'png' && fileExt != 'jpeg' && fileExt != 'jpg' && fileExt != 'PNG' && fileExt != 'JPEG' && fileExt != 'JPG' ) */) {
        // res.json({
        //   status:false,
        //   error:"Invalid File Format:Only jpeg, jpg, png file formats supported"
        // });
        console.log("Profile upload - 415");
        res.status(415).send("Invalid File Format:Only jpeg, jpg, png file formats supported");
      } else if (!req.body.img) {
        // res.json({
        //   status:false,
        //   error:"No image added ... try again!"
        // });
        console.log("Profile upload - 204");
        res.status(204).end();
      } else if (req.body.size > 5242880) {
        console.log("Profile upload - 413");
        res.status(413).send("File Size should be less than 5MB.");
      } else {
        // console.log("success....", typeof req.body.img);

        //Creating buffer for upload file 
        var imageBuffer = new Buffer(req.body.img, "base64");

        var randomstring = '';

        //Function call for creating randomstring
        createRandomString(function (data) {
          randomstring = data
        });

        //Destination for upload file
        var dest = process.env.PWD + "/uploads/" + randomstring + "_" + req.body.name;

        //Creating new file at destination
        fs.writeFile(dest, imageBuffer, 'base64', function (uploadFailed, uploaded) {
          if (uploadFailed) {
            // res.json({
            //  status:true,
            //  error:uploadFailed
            // });
            console.log("Profile upload - 500");
            res.status(500).send({ error: uploadFailed });
          } else {
            var uid = mongoose.Types.ObjectId(req.body.uid);

            //Query for finding user data
            Users.findOne({
              _id: uid
            }, function (findOneError, doc) {
              if (findOneError) {
                // res.json({
                //   status:false,
                //   error:findOneError
                // });
                console.log("Profile upload - 500");
                res.status(500).send({ error: findOneError });
              } else if (doc) {
                doc.profile.profileImage = randomstring + "_" + req.body.name;

                //Saving profile image
                doc.save(function (updateFail, update) {
                  if (updateFail) {
                    // res.json({
                    //   status: false,
                    //   error: updateFail
                    // });
                    console.log("Profile upload - 500");
                    res.status(500).send({ error: updateFail });
                  } else {
                    //console.log('file uploaded');
                    // res.json({
                    //   status: true,
                    //   message: "File uploaded"
                    // });
                    res.status(200).send({ message: "File uploaded" });
                  }
                });
              }
            });
          }
        });
      }
    }   
  } catch(error) {
    // res.json({
    // 	status: false,
    // 	error: error
    // });
    console.log("Profile upload - 500", error);
    res.status(500).send({ error: error });
  }
}

/**
*  @Function name : uploadRoomTopicFile
*  @Purpose : For uploading and converting files to pdf in topic
*  @Request Object : { uid: 'user id', roomId: 'room id', topicId: 'topic id', file: 'file data', fileName: 'file name', fileType: 'file type' }
*  @Response Object : Success - Upload data, Failure - Error message
*  @Author : Aniket Gupta
*/

export function uploadRoomTopicFile(req, res) {
  try {
    // console.log("req.headers.cookie", req.headers.cookie);
    // console.log("req body - ", req.body);
    if (req.headers.cookie) {
      let cookie = req.headers.cookie;
      let token = cookie.substring(cookie.indexOf("token=") + 6, cookie.indexOf("token=") + 38);
      let userQuery = Users.findOne({ token: token });
      userQuery.exec(function (errPerson, person) {
        if (errPerson) {
          res.json({ status: false, error: errPerson });
        } else {
          // console.log("req.body", req.body.uid);;
          // console.log("person", person);
          //Verifying if request is valid or not
          if (req.body) {
            var obj = req.body;
            // console.log('obj',obj)

            //Validating if user id and room id is valid or not
            if (!obj.roomId || validator.isEmpty(obj.roomId) || !mongoose.Types.ObjectId.isValid(obj.roomId)) {
              res.json({
                status: false,
                error: "Invalid Room."
              });
            } else if (person == null || !obj.uid || validator.isEmpty(obj.uid) || !mongoose.Types.ObjectId.isValid(obj.uid)) {
              res.json({
                status: false,
                error: "Invalid UserId."
              });
            } else if (obj.fileType != 'zip' && obj.fileType != 'application' && obj.fileType != 'image' && obj.fileType != 'video' && obj.fileType != 'audio' && obj.fileType != 'link' && obj.fileType != 'text') {
              console.log("Topic upload1 - Invalid File Extension");
              res.json({
                status: false,
                error: "Invalid File Extension."
              });
            } else if (obj.fileSize > 20971520) {
              console.log("Topic upload - File Size exceeded");
              res.json({
                status: false,
                error: "File Size should be less than 20MB."
              });
            } else {
              let tempFileName = obj.fileName.replace(/[ )(]+/g, '');
              let fileExt = tempFileName.substr(tempFileName.lastIndexOf(".") + 1);
              // console.log("fileExt----", fileExt);
              if (fileExt == 'exe' || fileExt == 'js' || fileExt == 'jar' || fileExt == 'bat' || fileExt == 'cmd' || fileExt == 'pif' || fileExt == 'app' || fileExt == 'bin' || fileExt == 'rbf' || fileExt == 'sh' || fileExt == 'py' || fileExt == 'dll' || fileExt == 'reg' || fileExt == 'inf' || fileExt == 'scf' || fileExt == 'cmd' || fileExt == 'application' || fileExt == 'com' || fileExt == 'html') {
                console.log("Topic upload2 - Invalid File Extension");
                res.json({
                  status: false,
                  error: "Invalid File Format."
                });
              } else if (obj.fileType == 'text' && fileExt != 'txt') {
                console.log("Topic upload3 - Invalid File Extension");
                res.json({
                  status: false,
                  error: "Invalid File Format."
                });
              } else {

                //Query for checking is room is present in database or not
                var query = Room.findOne({
                  _id: mongoose.Types.ObjectId(obj.roomId)
                });
                query.exec(function (err, docs) {
                  if (err) {
                    // console.log("err--", err);
                    res.json({
                      status: false,
                      error: "Room not found."
                    })
                  } else {

                    //Validating if topic id is valid or not
                    if (!obj.topicId || validator.isEmpty(obj.topicId) || !mongoose.Types.ObjectId.isValid(obj.topicId)) {
                      res.json({
                        status: false,
                        error: "Invalid Topic"
                      })
                    } else {
                      //Query for checking is topic is present in database or not
                      var topicQuery = Topic.findOne({
                        _id: mongoose.Types.ObjectId(obj.topicId)
                      });
                      //delete obj['uid'];

                      topicQuery.exec(function (error, data) {
                        if (error) {
                          res.json({
                            status: false,
                            error: "Topic not found"
                          })
                        } else {

                          //Verifying if fileType is link or not
                          if (obj.fileType !== 'link') {

                            //Creating buffer for upload file 
                            var imageBuffer = new Buffer(obj.file, "base64");
                            //console.log(process.env.PWD+"/uploads/");

                            var randomstring = '';

                            //Function call for creating randomstring
                            createRandomString(function (data) {
                              randomstring = data
                            });

                            // For removing spaces, parantheses in filename
                            var fileName = obj.fileName.replace(/[ )(]+/g, '');   //obj.fileName.replace(/\s+/g, '');

                            //Destination for upload file
                            var dest = process.env.PWD + "/uploads/" + randomstring + "_" + fileName;

                            //Creating new file at destination
                            fs.writeFile(dest, imageBuffer, 'base64', function (uploadFailed, uploaded) {
                              if (uploadFailed) {
                                res.json({
                                  status: false,
                                  error: uploadFailed
                                });
                              } else {
                                obj['createdAt'] = moment().utc().toDate();
                                obj['createdBy'] = mongoose.Types.ObjectId(obj.uid);
                                delete obj['uid'];
                                delete obj['file'];
                                obj['fileName'] = randomstring + "_" + fileName

                                //For finding extension of filename
                                let ext = fileName.substr(fileName.lastIndexOf(".") + 1);
                                //For converting files to pdf by unoconv command using shell package 
                                if ((ext == "doc") || (ext == "docx") || (ext == "odt") || (ext == 'xls') || (ext == 'xlsx') || (ext == 'ods') || (ext == 'ppt') || (ext == 'pptx') || (ext == "txt") || (ext == "jpg") || (ext == "png") || (ext == "jpeg") || (ext == "JPEG")) {
                                  if (shell.exec('unoconv -f pdf ' + dest).code !== 0) {
                                    shell.echo('Error: Converting failed');
                                  }
                                }
                                const objUser = new Uploads(obj);
                                //Create new upload data in database
                                Uploads.create([objUser], (error, data) => {
                                  if (!error) {
                                    res.json({
                                      status: true,
                                      data: data[0],
                                      message: "Upload successfully."
                                    });
                                  } else {
                                    //console.log(error)
                                    res.json({
                                      status: false,
                                      error: "Upload not Done."
                                    });
                                  }
                                });
                              }
                            });
                          } else {

                            //Options for calling youtube api
                            var options = {
                              url: 'https://www.googleapis.com/youtube/v3/videos?id=' + obj.fileName + '&key=AIzaSyD9fyjCqrqlYWvqSVCm-pzoAe6OjpBJYLU&part=snippet,contentDetails',
                              headers: {
                                'Content-Type': 'application/json'
                              }
                            };
                            /*request.get(options, function(error, response, body){
                              //console.log("error === ",error);
                              // console.log("response === ",response.body);
                              console.log("body === ",body);
                            });*/
                            obj['createdAt'] = moment().utc().toDate();
                            obj['createdBy'] = mongoose.Types.ObjectId(obj.uid);
                            delete obj['uid'];
                            const objUser = new Uploads(obj);

                            //Create new upload data in database
                            Uploads.create([objUser], (error, data) => {
                              if (!error) {

                                //Call the youtube api
                                request.get(options, function (error, response, body) {
                                  if (!response.error) {

                                    //Parse the body
                                    let videodata = JSON.parse(body);
                                    let items = videodata.items;
                                    let obj = {}

                                    //If title is there in body set the title for youtube video
                                    if (items[0].snippet && items[0].snippet.title)
                                      obj['title'] = items[0].snippet.title;

                                    //If duration is there in body set the duration for youtube video
                                    if (items[0].contentDetails && items[0].contentDetails.duration) {
                                      let str = items[0].contentDetails.duration;
                                      obj['duration'] = str;
                                    }

                                    //Update the upload data in database
                                    Uploads.update({
                                      _id: data[0]._id
                                    }, {
                                        $set: obj
                                      }).exec(function (updateerr, update) {

                                      });
                                  }
                                });
                                res.json({
                                  status: true,
                                  data: data[0],
                                  message: "Upload successfully."
                                });
                              } else {
                                //console.log(error)
                                res.json({
                                  status: false,
                                  error: "Upload not Done."
                                });
                              }
                            });
                          }
                        }
                      });
                    }
                  }
                });
              }
            }
          } else {
            res.json({
              status: false,
              error: "Invalid Request"
            })
          }
        }
      });
    } else {
      res.json({ status: false, error: "Invalid Request." })
    }
  } catch (error) {
    console.log("Error in uploadR", error)
    res.json({
      status: false,
      error: "Internal server error."
    });
  }
}

/**
*  @Function name : importUsersFile
*  @Purpose : For importing users and converting from excel to json
*  @Request Object : { uid: 'user id', companyId: 'company id', file: 'file data', fileName: 'file name', fileType: 'file type' }
*  @Response Object : Success - Converted JSON data, Failure - Error message
*  @Author : Aniket Gupta
*/

export function importUsersFile(req, res) {
  try {
  	//Verifying if request is valid or not
    if(req.body) {
      var obj = req.body;

      //Validating if user is valid or not
      if(!obj.uid || validator.isEmpty(obj.uid) || !mongoose.Types.ObjectId.isValid(obj.uid)) {
        res.json({
        	status: false, 
        	error : "Invalid UserId."
        });
      } else if (obj.fileType != 'application') {
        res.json({
          status: false,
          error: "Invalid File Format."
        });
      } else if(obj.fileSize > 20971520) {
        console.log("importUsersFile upload - File Size exceeded");
        res.json({
          status: false, 
          error : "File Size should be less than 20MB."
        });
      } else {
        let tempFileName = obj.fileName.replace(/[ )(]+/g, '');
        let fileExt = tempFileName.substr(tempFileName.lastIndexOf(".") + 1);
        // console.log("fileExt----", fileExt);
        if (fileExt != 'xlsx' && fileExt != 'xlsm' && fileExt != 'xls' && fileExt != 'ods' && fileExt != 'ots' && fileExt != 'xlt'  ) {
          console.log("importUsersFile upload - Invalid File Extension");
          res.json({
            status: false, 
            error : "Invalid File Format."
          });
        
        } else {

        	//Creating buffer for upload file 	
          var imageBuffer = new Buffer(obj.file, "base64");
          //console.log(process.env.PWD+"/uploads/");

          var randomstring = '';
        
          //Function call for creating randomstring
          createRandomString(function(data) {
            randomstring = data
          });

          // For removing spaces, parantheses in filename
          var fileName = obj.fileName.replace(/[ )(]+/g, '');   //obj.fileName.replace(/\s+/g, '');

          //Destination for upload file
          var dest = process.env.PWD+"/uploads/"+randomstring+"_"+fileName;

          //Creating new file at destination
          fs.writeFile(dest,imageBuffer,'base64',function(uploadFailed,uploaded) {
            if(uploadFailed) {
              res.json({
              	status:false,
              	error:uploadFailed
              });
            } else {

            	//Converting excel to json using excel-to-json package
              excel2Json(dest, function(err, output) {
    						if(err) {
    							console.log("err", err)
    							res.json({ 
    								status: false, 
    								error: err.message 
    							});
    						} 
                if(output && output.Sheet1) {

                	//Total count of importing users
                  let importCount = output.Sheet1.length

                  //Function call for getting available limit of users
                  checkUsersCount(obj.uid, obj.role, null, obj.companyId, null, function(status, userCount) {

                  	//Checking if user can import more users than available limit or not 
                    if(importCount <= userCount || userCount == -1) {

                    	//Remove the uploaded file and send converted json data
                      fs.unlink(dest, function(err, result) {
                        if(err) {
                          //console.log("err1", err)
                          res.json({ 
                          	status: false, 
                          	error: err.message 
                          });
                        } else {
                          // console.log("res", result)
                          res.json({
                          	status: true, 
                          	data: output.Sheet1  
                         	});
                        }
                      })
                    } else {
                      res.json({ 
                      	status: false, 
                      	error: "Cannot import more than "+userCount+" "+"users" 
                      });
                    }
                  });
                }
              });
            }
          });
        }
      }
    } else {
      res.json({
      	status: false, 
      	error: "Invalid Request"
      })
    }
  } catch(e) {
    console.log('error in importUsersFile',e);
    res.json({
      status: false,
      error: 'Internal server error'
    });
  }
}

/**
*  @Function name : listTopicFiles
*  @Purpose : For fetching complete uploads data
*  @Request Object : query : { roomId, topicId, page, items, filter, search }
*  @Response Object : Success - Upload data and count, Failure - Error message
*  @Author : Aniket Gupta
*/

export function listTopicFiles(req, res) {
  //console.log("inside listTopicFiles", req.query);
  checkValidRequest(req.headers, function(person) {
    //console.log("person", person);
    try {
      //console.log("inside try condition");
      //Verifying if request is valid or not
      if (person == null || !req.query.items || !req.query.page || !req.query.roomId || !req.query.topicId) {
        //console.log("inside person condition");
        res.json({
        	status: false, 
        	error : "Invalid request."
        });
      } else {
        let listroom = req.query;
        //console.log("inside else condition");
        //If user has a valid role
        if (person.role == Roles.Superadmin || person.role == Roles.Admin || person.role == Roles.Lmsadmin || person.role == Roles.Instructor || person.role == Roles.Moderator || person.role == Roles.Presenter || person.role == Roles.User || person.role == Roles.Presenteradmin) {
          var uploadQuery;
          var countQuery;
          let selector = {
            topicId : listroom.topicId,
            roomId : listroom.roomId,
            $or:[{ createdBy : person._id },{isEnable : true }]
          };
          
          //Search selector based on user role
          if (listroom.filter && listroom.filter != ''){
            selector['fileType'] = listroom.filter;
          }

           //If search is not empty then create RegExp
          if (listroom.search && listroom.search != ''){
            var searchKey = RegExp(listroom.search,'i');
            selector['fileName'] = { $regex: searchKey };
          }

          //Query for fetching complete upload data based on selector and skip items based on itemsPerPage on previous page
          uploadQuery = Uploads.find(selector)
            .limit(Number(listroom.items))
            .select('fileName description roomId fileType title isEnable createdBy')
            .skip(Number(listroom.items) * (Number(listroom.page)-1))
            .sort({
              createdAt: -1
            });

          //Query for counting complete upload data based on selector
          countQuery = Uploads.count(selector);

          uploadQuery.exec(function(err, result) {
            if (err) {
              //console.log("err", err.message);
              res.json({ 
              	status : false, 
              	error : err.message 
              });
            } else {
              //console.log("file list", result);
              countQuery.exec(function(error, count) {
                //console.log("count", count);
                res.json({ 
                	status : true, 
                	data : result, 
                	count : count 
                });
              });
            }
          });
        } else {
          res.json({ 
          	status: false, 
          	error : "Access denied." 
          });
        }
      }
    } catch(e) {
      console.log("Error in list topic files", e)
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/**
*  @Function name : deleteFile
*  @Purpose : For deleting particular upload data
*  @Request Object : params : { rid: "room id", tid: 'topic id', id: 'upload id' }
*  @Response Object : Success - Success message, Failure - Error message
*  @Author : Aniket Gupta
*/

export function deleteFile(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if (person != null || req.params.rid || req.params.tid || req.params.id) {

        //Validating if requested upload id is valid or not
        if (!req.params.id || validator.isEmpty(req.params.id) || !mongoose.Types.ObjectId.isValid(req.params.id)) {
          res.json({
          	status: false, 
          	error : "Invalid file."
          });
        } else {
          var recordId = mongoose.Types.ObjectId(req.params.id);

          //Query for checking if the upload id is present in database
          var query = Uploads.findOne({ 
          	_id : recordId 
          });
          query.populate('topicId','topicEnable')
          .exec(function (err, doc) {
            if (err) { 
            	res.json({ 
            		status: false, 
            		error : err.message 
            	}); 
            } else {

              //Function calling for deleting files from uploads folder
              deleteFilesFromDest(doc, function(status) {
                if (status == true) {

                  //Query for removing the upload data
                  var innerquery = Uploads.remove({ 
                   _id : recordId 
                  });
                  innerquery.exec(function (error, response) {
                    if (error) { 
                     res.json({ 
                       status : false, 
                       error : error.message 
                     }); 
                    } else {
                      res.json({ 
                       status : true, 
                       message : "Deleted successfully." 
                      });

                      //createdBy: pranathi, disc: push notifications for android students
                      if(doc && doc.isEnable && doc.topicId && doc.topicId.topicEnable) {
                        let message = "The File "+doc.fileName.substring(doc.fileName.indexOf("_")+1)+" has been deleted from Topic.";
                        roomStudentData(req.params.rid,function(err,studentIds) {
                          if(studentIds != null) {
                            Users.find({_id:{$in:studentIds}})
                            .select('deviceType deviceId')
                            .exec(function(error, result){
                              if (result && result.length > 0) {
                                for (var i = 0; i <= result.length - 1; i++) {
                                 if (result[i].deviceType == 'ANDROID') {
                                    sendPushNotificationAndroid("DELETE-FILE", message, result[i].deviceId, person._id, result[i]._id)
                                  }
                                }
                              }
                            });
                          }
                        });
                      }
                    }
                  });
                } else {
                  res.json({ 
                    status : false, 
                    error : "Error in deleting file" 
                  }); 
                }
              });
            }
          });
        }
      } else {
        res.json({
        	status: false, 
        	error : "Invalid request."
        });
      }
    } catch(e) {
      console.log("Error in delete file", e)
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/**
*  @Function name : deleteMultipleFiles
*  @Purpose : For deleting multiple upload data
*  @Request Object : params : { rid: "room id", tid: 'topic id', ids: 'upload ids array' }
*  @Response Object : Success - Success message, Failure - Error message
*  @Author : Aniket Gupta
*/

export function deleteMultipleFiles(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if (person != null && req.params.rid && req.params.tid && req.params.ids) {

        //Verifying if ids array is empty or not
        if (req.params.ids.length <= 0) {
          res.json({
          	status: false, 
          	error : "No file selected to delete."
          });
        } else {
          var idsArr = req.params.ids.split(',');

          //Query for checking if the upload id is present in database
          var query = Uploads.find({ 
            _id : {
              $in: idsArr
            } 
          });
          query.populate('topicId','topicEnable')
          .exec(function (err, doc) {
            console.log('doc',doc);
            if (err) { 
              res.json({ 
                status: false, 
                error : err.message 
              }); 
            } else {

              //Async.forEachOf iteratee to each item in doc, in parallely
              async.forEachOf(doc, function (data, key, callback) {

                //Function calling for deleting files from uploads folder
                deleteFilesFromDest(data, function(status) {
                  if (status == true) {
                    callback()
                  } else {
                    return callback('Error in deleting file');
                  }
                });
              }, function (err) {
                if (err) {
                 // console.log("Error in deleting file", err)
                  res.json({ 
                    status : false, 
                    error : err 
                 });
                } else {

                  //Query for removing the multiple upload data
                  var innerquery = Uploads.remove({ 
                   _id : {
                     '$in':  idsArr
                   }
                  });
                  innerquery.exec(function (error, response) {
                    if (error) { 
                     res.json({ 
                        status : false, 
                        error : error.message 
                     }); 
                    } else {
                      res.json({ 
                        status : true, 
                        message : "Deleted successfully." 
                      });

                      //createdBy: pranathi, disc: push notifiactions for android students
                      for(let i = 0; i < doc.length; i++) {
                        if(doc && doc[i].isEnable && doc[i].topicId && doc[i].topicId.topicEnable) {
                          let message = "The File "+doc[i].fileName.substring(doc[i].fileName.indexOf("_")+1)+" has been deleted from Topic.";
                          roomStudentData(req.params.rid,function(err,studentIds) {
                            if(studentIds != null) {
                              Users.find({_id:{$in:studentIds}})
                              .select('deviceType deviceId')
                              .exec(function(error, result){
                                if (result && result.length > 0) {
                                  for (var i = 0; i <= result.length - 1; i++) {
                                   if (result[i].deviceType == 'ANDROID') {
                                      sendPushNotificationAndroid("DELETE-MULTIFILES", message, result[i].deviceId, person._id, result[i]._id)
                                    }
                                  }
                                }
                              });
                            }
                          });
                        }
                      }
                    }
                  });
                }
              });
            }
          });
        }
      } else {
        res.json({
        	status: false, 
        	error : "Invalid request."
        });
      }
    } catch(e) {
      console.log("Error in delete multiple files", e)
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/**
*  @Function name : deleteFilesFromDest
*  @Purpose : For deleting files from uploads folder
*  @doc : { Data of uploaded files }
*  @Callback : true, false
*  @Author : Aniket Gupta
*/

export function deleteFilesFromDest(doc, callback) {
  var status;
  try {
    //Verifying if document has fileType link or not
    if (doc.fileType != 'link') {
      let path = doc.from && doc.from == 'Shared' ? (process.env.PWD + "/uploads/sharing_docs/") : (process.env.PWD + "/uploads/");
      
      //Path for original file
      let dest = path + doc.fileName;

      let fileExist = fs.existsSync(dest)

      if (fileExist == true) {

        //Remove the original uploaded file
        fs.unlink(dest, function(err, result) {
          if (err) {
            console.log("Error in original file deletion", err)
            status = false
            callback(status)
          } else {
            status = true 

            //For finding extension of filename
            let ext = doc.fileName.substr(doc.fileName.lastIndexOf(".") + 1);

            //Verifying if extension is pdf or not
            if ( (ext != "pdf") && (ext != "gif") && (ext != "wav") && (ext != 'mp3') && (ext != 'wmv') && (ext != 'mp4') && (ext != 'mkv') && (ext != 'zip')) {

              //Filename for file converted to pdf
              let pdfFileName = doc.fileName.substring(0, doc.fileName.lastIndexOf(".")) + ".pdf"

              //Path for converted file
              let dest = path + pdfFileName;

              let fileExist = fs.existsSync(dest)

              if (fileExist == true) {

                //Remove the converted upload file
                fs.unlink(dest, function(err, result) {
                  if (err) {
                    console.log("Error in converted file deletion", err)
                    status = false  
                    callback(status)
                  } else {
                    status = true   
                    callback(status)
                  }
                })
              } else {
                status = true   
                callback(status)
              }
            } else {
              callback(status)
            }
          }
        })
      } else {
        status = true   
        callback(status)
      }
    } else {
      callback(true)
    }
  } catch(e) {
    console.log('error in deleteFilesFromDest',e);
    res.json({
      status: false,
      error: 'Internal server error'
    });
  }
}

/**
*  @Function name : uploadAssignmentSubmission
*  @Purpose : For uploading assignment submission
*  @Request Object : { studentId: 'student id', roomId: 'room id', file: 'file data', fileName: 'file name', fileType: 'file type' }
*  @Response Object : Success - Success message, Failure - Error message
*  @Author : Aniket Gupta
*/

export function uploadAssignmentSubmission(req, res) {
  try {
    //Verifying if request is valid or not
    if (req.body) {
      var obj = req.body;
      // console.log("body---- ", req.body);

      let tempFileName = obj.fileName.replace(/[ )(]+/g, '');
      let fileExt = tempFileName.substr(tempFileName.lastIndexOf(".") + 1);

      //Validating if user id and room id is valid or not
      if (!obj.roomId || validator.isEmpty(obj.roomId) || !mongoose.Types.ObjectId.isValid(obj.roomId)) {
        res.json({
          status: false, 
          error : "Invalid Room."
        });
      } else if (!obj.studentId || validator.isEmpty(obj.studentId) || !mongoose.Types.ObjectId.isValid(obj.studentId)) {
        res.json({
          status: false, 
          error : "Invalid Student."
        });
      } else if (!obj.assignmentId || validator.isEmpty(obj.assignmentId) || !mongoose.Types.ObjectId.isValid(obj.assignmentId)) {
        res.json({
          status: false, 
          error : "Invalid Assignment."
        });
      } else if(obj.fileType !='application' && obj.fileType != 'text') {
        console.log("Assignment upload - Invalid File Extension");
        res.json({
          status: false, 
          error : "Invalid File Format."
        });
      } else if(obj.fileSize > 20971520) {
        console.log("Topic upload - File Size exceeded");
        res.json({
          status: false, 
          error : "File Size should be less than 20MB."
        });
      } else {
        // console.log("fileExt----", fileExt);
        if (fileExt == 'exe' || fileExt == 'js' || fileExt == 'jar' || fileExt == 'bat' || fileExt == 'cmd' || fileExt == 'pif' || fileExt == 'app' || fileExt == 'bin' || fileExt == 'rbf' || fileExt == 'sh' || fileExt == 'py' || fileExt == 'reg' || fileExt == 'inf' || fileExt == 'scf' || fileExt == 'cmd' || fileExt == 'application' || fileExt == 'com' || fileExt == 'html') {
          console.log("Assignment upload - Invalid File Extension");
          res.json({
            status: false, 
            error : "Invalid File Format."
          });
        } else if(obj.fileType =='text' && fileExt != 'txt') {
          console.log("Assignment upload3 - Invalid File Extension");
          res.json({
            status: false, 
            error : "Invalid File Format."
          });
        } else if(obj.file == undefined){
          res.json({
            status: false, 
            error : "File is Empty or unsupported."
          });
        } else {
          //Query for checking is room is present in database or not
          var query = Room.findOne({ 
            _id : mongoose.Types.ObjectId(obj.roomId) 
          });
          query.exec(function(err, docs) {
            if (err) {
              // console.log("err--", err);
              res.json({
                status: false, 
                error: "Room not found."
              })
            } else {


              //Query for checking is assignment is present in database or not
              var assignmentQuery = Assignment.findOne({
                _id : mongoose.Types.ObjectId(obj.assignmentId), 
                roomId : mongoose.Types.ObjectId(obj.roomId) 
              });

              assignmentQuery.exec(function(error,data) {
                if (error) {
                  res.json({
                    status: false,
                    error: "Assignment not found"
                  })
                } else {

                  //Creating buffer for upload file 
                  var imageBuffer = new Buffer(obj.file, "base64");
                  // console.log(imageBuffer);
                  //console.log(process.env.PWD+"/uploads/");

                  var randomstring = '';
        
                  //Function call for creating randomstring
                  createRandomString(function(data) {
                    randomstring = data
                  });

                  // For removing spaces, parantheses in filename
                  var fileName = obj.fileName.replace(/[ )(]+/g, '');
                  //obj.fileName.replace(/\s+/g, '');

                  //Destination for upload file
                  var dest = process.env.PWD+"/uploads/"+randomstring+"_"+fileName;
                  //var url = 'https://'+serverConfig.domin+"/uploads/"+randomstring+"_"+fileName;
                  // var url = 'https://cloud.instavc.com/uploads/VopWn5Dc_HealthcareDomainKnowledge_SoftwareTesting.pdf';
                  
                  
                  //Creating new file at destination
                  fs.writeFile(dest,imageBuffer,'base64',function(uploadFailed,uploaded){
                    if (uploadFailed) {
                      res.json({
                        status:false,
                        error:uploadFailed
                      });
                    } else {

                      delete obj['file'];
                      obj['fileName'] = randomstring+"_"+fileName
                      var assignmentId = obj.assignmentId
                      delete obj['assignmentId']
                      obj['submittedAt'] = moment().utc().toDate();
                      Assignment.update({ 
                        _id : mongoose.Types.ObjectId(assignmentId), 
                        roomId : mongoose.Types.ObjectId(obj.roomId) 
                      },{ 
                        $push : {
                          "submissions":obj
                        } 
                      },{ runValidators: true },function (err, doc) {
                        // console.log("update err == ",err);
                        // console.log("update doc == ",doc);
                        if (err) {
                          res.json({ 
                            status : false, 
                            error : err.message 
                          });
                        } else {
                          Assignment.findOne({
                            _id : mongoose.Types.ObjectId(assignmentId), 
                            roomId : mongoose.Types.ObjectId(obj.roomId) 
                          })
                          .populate('createdBy',  'profile.profileImage firstname lastname -_id')
                          .exec(function(error,assDoc) {
                            if (error) {
                              res.json({
                                status: false,
                                error: "Assignment not found"
                              })
                            } else {
                              res.json({ 
                                status: true, 
                                data: assDoc, 
                                message : "Upload successfully."  
                              });

                              //For finding extension of filename
                              let ext = fileName.substr(fileName.lastIndexOf(".") + 1);

                              //For converting files to pdf by unoconv command using shell package 
                              if( (ext != "pdf") && (ext != "gif") && (ext != "wav") && (ext != 'mp3') && (ext != 'wmv') && (ext != 'mp4') && (ext != 'mkv') && (ext != 'zip')) {
                                if (shell.exec('unoconv -f pdf '+dest).code !== 0) {
                                  shell.echo('Error: Converting failed');
                                } else {
                                  
                                  // PlagiarismCheck

                                //   processForPlagiarismCheck(url, function(errPlagiarism, resPlagiarism) {
                                //     // console.log("Plagiarism cb1 --- ", resPlagiarism);
                                //     if(resPlagiarism) {
                                //       Assignment.update({ 
                                //         _id : mongoose.Types.ObjectId(assignmentId), 
                                //         roomId : mongoose.Types.ObjectId(obj.roomId),
                                //         "submissions.studentId" : obj.studentId
                                //       },
                                //       {
                                //         $set : {
                                //           "submissions.$.plagiarismId" : resPlagiarism
                                //         }
                                //       }).exec(function(err, result){
                                //         if (err) {
                                //           // console.log("err", err);
                                //         } else {
                                //           // console.log("result", result);
                                //         }
                                //       })
                                //     }
                                //   });
                                }
                              } else {
                                 // PlagiarismCheck
                                 
                                  // processForPlagiarismCheck(url, function(errPlagiarism, resPlagiarism) {
                                  //   // console.log("Plagiarism cb2 --- ", resPlagiarism);
                                  //   if(resPlagiarism) {
                                  //     Assignment.update({ 
                                  //       _id : mongoose.Types.ObjectId(assignmentId), 
                                  //       roomId : mongoose.Types.ObjectId(obj.roomId),
                                  //       "submissions.studentId" : obj.studentId
                                  //     },
                                  //     {
                                  //       $set : {
                                  //         "submissions.$.plagiarismId" : resPlagiarism
                                  //       }
                                  //     }).exec(function(err, result){
                                  //       if (err) {
                                  //         // console.log("err", err);
                                  //       } else {
                                  //         // console.log("result", result);
                                  //       }
                                  //     });
                                  //   }
                                  // });
                              }
                            }
                          })
                        }
                      })
                    }
                  });
                }
              });        
            }
          });
        }
      }
    } else {
      res.json({
        status: false, 
        error: "Invalid Request"
      })
    }
  } catch(e) {
    console.log('error in uploadAssignmentSubmission',e);
    res.json({
      status: false,
      error: 'Internal server error'
    });
  }
}

/**
*  @Function name : uploadSharingDocument
*  @Purpose : For uploading sharing document
*  @Request Object : { file: 'file data', fileName: 'file name', fileType: 'file type' }
*  @Response Object : Success - Success message, Failure - Error message
*  @Author : Aniket Gupta
*/

export function uploadSharingDocument(req, res) {
  try {
    //Verifying if request is valid or not
    if (req.body) {
      var obj = req.body;
      // console.log("uploadSharingDocument req obj-  ", obj);

      let tempFileName = obj.fileName.replace(/[ )(]+/g, '');
      let fileExt = tempFileName.substr(tempFileName.lastIndexOf(".") + 1);
      console.log("obj.fileType === ", obj.fileType);
      if(obj.fileType !='application' && obj.fileType != 'application/pdf') {
        console.log("SharingDocument upload - Invalid File Extension");
        res.json({
          status: false, 
          error : "Invalid File Format."
        });
      } else if(obj.fileSize > 10485760) {
        console.log("Topic upload - File Size exceeded");
        res.json({
          status: false, 
          error : "File Size should be less than 10MB."
        });
      } else {
        // console.log("fileExt----", fileExt);
        if (fileExt == 'exe' || fileExt == 'js' || fileExt == 'jar' || fileExt == 'bat' || fileExt == 'cmd' || fileExt == 'pif' || fileExt == 'app' || fileExt == 'bin' || fileExt == 'rbf' || fileExt == 'sh' || fileExt == 'py' || fileExt == 'reg' || fileExt == 'inf' || fileExt == 'scf' || fileExt == 'cmd' /*|| fileExt == 'application'*/ || fileExt == 'com' || fileExt == 'html') {
          console.log("SharingDocument upload - Invalid File Extension");
          res.json({
            status: false, 
            error : "Invalid File Format."
          });
        } else if(obj.file == undefined){
          res.json({
            status: false, 
            error : "File is Empty or unsupported."
          });
        } else {

          //Creating buffer for upload file 
          var imageBuffer = new Buffer(obj.file, "base64");
          //console.log(process.env.PWD+"/uploads/");

          var randomstring = '';

          //Function call for creating randomstring
          createRandomString(function(data) {
            randomstring = data
          });

          // For removing spaces, parantheses in filename
          var fileName = obj.fileName.replace(/[ )(]+/g, '');   //obj.fileName.replace(/\s+/g, '');

          //Destination for upload file
          var dest = process.env.PWD+"/uploads/sharing_docs/"+randomstring+"_"+fileName;

          //Creating new file at destination
          fs.writeFile(dest,imageBuffer,'base64',function(uploadFailed,uploaded){
            if (uploadFailed) {
              res.json({
                status:false,
                error:uploadFailed
              });
            } else {
              delete obj['file'];
              obj['fileName'] = randomstring+"_"+fileName;
              obj["fileExt"] = fileExt;

              res.json({ 
                status: true, 
                data: obj, 
                message : "Upload successfully."  
              });

              //For finding extension of filename
              let ext = fileName.substr(fileName.lastIndexOf(".") + 1);

              // For converting files to pdf by unoconv command using shell package 
              if( (ext != "pdf") && (ext != "gif") && (ext != "wav") && (ext != 'mp3') && (ext != 'wmv') && (ext != 'mp4') && (ext != 'mkv') && (ext != 'zip')) {
                if (shell.exec('unoconv -f pdf '+dest).code !== 0) {
                  shell.echo('Error: Converting failed');
                }
              }
              /*res.json({ 
                status: true, 
                data: obj, 
                message : "Upload successfully."  
              });*/
            }
          });
        }
      }
    } else {
      res.json({
        status: false, 
        error: "Invalid Request"
      })
    }
  } catch (e) {
    console.log("error in uploadSharingDocument === ", e);
    res.json({
      status: false, 
      error: "Internal server error"
    });
  }
}



/**
*  @Function name : convertPDF
*  @Purpose : convert files to pdf
*  @Request Object : file object
*  @Response Object : Success - convertfile 
*  @Author : Rajesh Goriga */

export function convertPDF(req, res) {
  checkValidRequest(req.headers, function (person) {
    try {
      var obj = req.body;
      if (person != null && obj.data && obj.data.fileName) {
        var dest = process.env.PWD + "/uploads/sharing_docs/" + obj["data"]["fileName"];
      let fileExt = dest.substr(dest.lastIndexOf(".") + 1);        
        // var listener = unoconv.listen({ port: 2002 });

        // listener.stderr.on('data', function (data) {
        //   console.log('stderr: ' + data.toString('utf8'));
        // });
      if (fileExt != 'pdf') {
          unoconv.convert(dest, 'pdf', function (err, result) {
            if (err) {
              console.log('err', err);
              res.json({
                status: false,
                error: "Internal server error, Please try again"
              });
            } else {
              let path = dest.substring(-1, dest.lastIndexOf(".") + 0)
              fs.writeFile(path + '.pdf', result, (error) => {
                /* handle error */
                if (error) {
                  console.log('error', error)
                  res.json({
                    status: false,
                    error: error
                  });
                } else {
                  console.log("converted successfully.")
                  res.json({
                    status: true,
                    data: obj.data,
                    message: "converted successfully.",
                  });
                }
              });
            }
          });

        } else {
          res.json({
            status: true,
            data: obj.data,
            message: "converted successfully.",
          });

        }
        
      } else {
        res.json({ status: false, error: "Invalid request." });
      }  
    } catch (e) {
      console.log("Error in converting file", e);
      res.json({ status: false, error: "Internal server error." });
    }
  });
}

export function deleteSharingDocument (req, res) {
  try {
    if (!req.params.name) {
      res.json({
        status: false, 
        error : "Invalid file."
      });
    } else {
      let obj = {
        from : 'Shared',
        fileType : 'application',
        fileName : req.params.name
      };
      deleteFilesFromDest(obj, function(status) {
        if (status == true) {
          res.json({ 
            status : true, 
            error : "Closed successfully" 
          });
        } else {
          res.json({ 
            status : false, 
            error : "Error in deleting file" 
          });
        }
      });
    }
  } catch (e) {
    console.log("error in deleteSharingDocument", e);
    res.json({
      status: false, 
      error: "Internal server error"
    });
  }
}

/**
*  @Function name : uploadFileEnable
*  @Purpose : For enabling & disabling upload files
*  @Request Object : fileEnable { id : uploadId, isEnable :isEnable }
*  @Response Object : Success - fileEnable, Failure - Error message
*  @Author : Jyothi & Pranathi */

export function uploadFileEnable (req, res) {
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if (person == null || !req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id) || !req.body || !req.body.fileEnable) {
        res.json({ status : false, error : "InValid request." });
      } else {
        let obj = req.body.fileEnable;

          let uploadId = mongoose.Types.ObjectId(req.params.id);
          obj['updatedBy'] = mongoose.Types.ObjectId(person._id);
          
          //Fetching upload details from the upload collection
          Uploads.findOne({ _id : uploadId })
          .populate('topicId','topicEnable')
          .exec(function(err, data) {
            if (data) {
              if (data.createdBy._str == person._id._str) {

                //Query for update status in the uploads collection
                Uploads.findOneAndUpdate({ _id : uploadId },
                  { $set : obj
                  },function (err, response) {
                    if (err) { res.json({ status : false, error : err.message });
                    } else {
                      res.json({ status: true, id: uploadId, res: response });

                     //createdBy: pranathi,disc: push notifications //
                      let message;
                      if(response.isEnable == false) {
                        message = "The File "+data.fileName.substring(data.fileName.indexOf("_")+1)+"  has been added to Topic.";
                      } else {
                        message = "The File "+data.fileName.substring(data.fileName.indexOf("_")+1)+" has been removed from Topic.";
                      }

                      //createdBy: pranathi, disc: push notifications for android students
                      if(data && data.topicId && data.topicId.topicEnable) {
                        roomStudentData(response.roomId,function(err,studentIds) {
                          if(studentIds != null) {
                            Users.find({_id:{$in:studentIds}})
                            .select('deviceType deviceId')
                            .exec(function(error, result){
                              if (result && result.length > 0) {
                                for (var i = 0; i <= result.length - 1; i++) {
                                 if (result[i].deviceType == 'ANDROID') {
                                    sendPushNotificationAndroid("FILE-ENABLE", message, result[i].deviceId, person._id, result[i]._id)
                                  }
                                }
                              }
                            });
                          }
                        });
                      }
                  }
                });
              } else {
                res.json({ status : false, error : "Access denied." });
              }
            } else {
              res.json({ status : false, error : "Invalid File." });
            }
          });
        }
    } catch(e) {
      console.log("Error in update uploadFileEnable", e);
      res.json({ status : false, error : "Internal server error." });
    }
  });
}
