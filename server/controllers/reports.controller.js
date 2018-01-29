import Room from '../models/room';
import Corporate from '../models/corporate';
import Users from '../models/users';
import Topic from '../models/topic';
import Package from '../models/package';
import Questionnaire from '../models/questionnaire';
import Student from '../models/students';
import Schedule from '../models/schedule';
import Category from '../models/category';
import Assignment from '../models/assignment';
import Logger from '../models/logger';
import dataLog from '../models/datalog'
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';
import { Roles } from './admin.user.controller';
import { checkValidRequest } from '../authorization';
import { addSlash } from './slashesActions';

var moment = require('moment');
var mongoose = require('mongoose');
var validator = require('validator');
var _ = require('lodash');
var async = require("async");
import reflect from 'async/reflect';
import parallel from 'async/parallel';
import eachOf from 'async/eachOf';
var multer  = require('multer');
var fs = require('fs');
var shell = require('shelljs');
var path = require('path');
var htmlPdf = require('html-pdf');

/**
*  @Function name : studentSubmissionAssignments
*  @Purpose : For fetching  student submission assignments Report
*  @Request Object : params : { rid: "room id" }
*  @Response Object : Success - assignment report data, Failure - Error message
*  @Author : pranathi
*/

// export function studentSubmissionAssignments(req, res) {
//   checkValidRequest(req.headers, function(person) {

//     try {

//       //Verifying if request is valid or not
//       if (person == null || !req.params.rid) {
//         res.json({
//           status: false, 
//           error : "Invalid request."  
//         });
//       } else {

//         //Validating if room id is valid or not
//         if (!req.params.rid || validator.isEmpty(req.params.rid) || !mongoose.Types.ObjectId.isValid(req.params.rid)) {
//           res.json({
//             status: false, 
//             error : "Invalid room"
//           });
//         } else {
//           var recordId = req.params.rid;

//           // For finding int id  based on room id and student id
//           var query = Student.find({ 
//             roomId : recordId,
//             students : { $in :[person._id] }
//           });

//           query.select('instId')
//           .exec(function (insErr, insDoc) {
//             if (insErr) { 
//               res.json({ 
//                 status: false, 
//                 error : insErr.message, 
//                 message : "Error while retriving instructor data." 
//               });
//             } 
//             if (insDoc.length > 0) {

//               var TotalAssignments = 0;
//               var SubmittedAssignments = 0;

//               var instId = insDoc.map(function(d){ return d.instId });

//               let selector = {
//                 roomId : recordId,
//                 createdBy : { $in :instId} 
//               }

//               Assignment.count(selector).exec(function(error, count) {
//                 if (error) {
//                   res.json({ 
//                     status : false, 
//                     error : error.message
//                   });
//                 } else {

//                   Assignment.find(
//                   {
//                     roomId : recordId,
//                     createdBy : { $in :instId} ,
//                     $and:[ {submissions: { $exists: true, $ne: [] }}, { submissions: { $elemMatch: { studentId: person._id } } }]
//                   })
//                   .select('submissions._id')
//                   .exec(function (assignErr, assignData) {
//                     if (assignErr) {
//                       res.json({ 
//                         status: false, 
//                         error: assignErr.message, 
//                       });
//                     }
//                     if (_.isEmpty(assignData)) {
//                       res.json({ 
//                         status: false, 
//                         error: 'No data', 
//                       });
//                     } else {

//                       SubmittedAssignments += assignData.length;
//                       TotalAssignments = count;
//                       var NotSubmittedAssignments = TotalAssignments - SubmittedAssignments;

//                       let obj = {
//                         notSubmittedAssignments : (NotSubmittedAssignments/TotalAssignments)*100,
//                         submittedAssignments : (SubmittedAssignments/TotalAssignments)*100,
//                         totalAssignments : (TotalAssignments/TotalAssignments)*100
//                       }

//                       res.json({ 
//                         status: true, 
//                         data: obj, 
//                       });
//                     }
//                   }); 
//                 }
//               });
//             } else {
//               res.json({ 
//                 status: false, 
//                 data: 'No Instructors', 
//               });
//             }
//           })
//         }
//       }
//     } catch(e) {
//       console.log("Error in fetch student submission assignments ", e);
//       res.json({
//         status : false, 
//         error : "Internal server error."
//       });
//     }
//   });
// }

/**
*  @Function name : studentCourseList
*  @Purpose : For fetching complete course data in student side
*  @Request Object : query : { page, items, search }
*  @Response Object : Success - course data and count, Failure - Error message
*  @Author : pranathi
*/

export function studentCourseList(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {
      // Verifying if request is valid or not
      if (person == null || !req.query.items || !req.query.page ) {
        res.json({
          status: false, 
          error : "Invalid request."
        });
      } else {

        let room_selector = {
          corporateId: person.profile.companyid._id
        };

        if (req.query.search && req.query.search  != '') {
            let slash_search = addSlash(req.query.search );
            let searchKey = RegExp(slash_search,'i');
            room_selector['roomName'] = searchKey;
        } 

        Room.find(room_selector).select('_id')
        .exec(function(roomIdErr,roomIdsData) {
          if(roomIdErr) {
            res.json({ status: false, error: roomIdErr.message});
          } else if(roomIdsData && roomIdsData.length > 0) {
            let roomIds = roomIdsData.map(function(d) { return d._id });

            let listroom = req.query;  
            let find_query = Student.aggregate(
              [
                { $match : {
                    students : { $in :[person._id] },
                    roomId: { $in:roomIds }
                  }
                },
                {
                  $group:{_id:'$roomId'},
                },
                {
                  $skip:Number(listroom.items) * (Number(listroom.page)-1)
                },
                {
                 $limit:Number(listroom.items)
                },
                {
                  $sort:{createdOn: -1}
                }
              ]);

            let count_query = Student.aggregate(
                          [
                            { $match : {
                                students : { $in :[person._id] },
                                roomId: { $in:roomIds }
                              }
                            },
                            {
                              $group:{_id:'$roomId'},
                            }
                          ]);

            find_query.exec( function (err, result) {
              if (err) {
                res.json({ status : false, error : err.message });
              } else if (result && result.length > 0) {
                let len = result.length;

                //function for populate roomName rommType from Room collection
                function processResult() {
                  let data = result[len -1];
                      
                  Room.findOne({_id:data._id}, { roomName : 1, roomType : 1, createdOn : 1, expiryDate : 1 }, function (roomerr, room) {
                    if(roomerr) {
                      res.json({ status:false, error: roomerr.message});
                    } else if (room) {
                      data['roomId'] = room;
                      len = len - 1;
                      if (len > 0) {
                        processResult();
                      } else {
                        count_query.exec( function(error, countData) {
                          let count = countData ? countData.length : 0;
                          res.json({ status : true, data : result, count : count });
                        }); 
                      }
                    } 
                  });
                }
                processResult();
              } else {
                res.json({ status : true, data : [], count : 0 });
              }
            });
          } else {
            res.json( { status: false, error: 'No Room Data'});
          }
        });
      }
    } catch(e) {
      console.log("Error in student course list", e)
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}


/**
*  @Function name : studentsSubmissionAssignment
*  @Purpose : For fetching particular assignment submitted sudents count 
*  @Request Object : params : { rid: "room id", id: 'assignment id' }
*  @Response Object : Success - assignment report data, Failure - Error message
*  @Author : pranathi
*/

// export function studentsSubmissionAssignment(req, res) {
//   checkValidRequest(req.headers, function(person) {

//     try {

//       //Verifying if request is valid or not
//       if (person == null || !req.params.id || !req.params.rid) {
//         res.json({
//           status: false, 
//           error : "Invalid request."  
//         });
//       } else {

//         //Validating if room id is valid or not
//         if (!req.params.rid || validator.isEmpty(req.params.rid) || !mongoose.Types.ObjectId.isValid(req.params.rid)) {
//           res.json({
//             status: false, 
//             error : "Invalid room"
//           });
//         } else {
//           var recordId = req.params.rid;
//           var assignmentId = mongoose.Types.ObjectId(req.params.id);

//           //For finding student data based on room id and inst id
//           var query = Student.findOne({ 
//             roomId : recordId,
//             instId : person._id
//           });

//           query.select('students')
//           .exec(function (stuErr, stuDoc) {
//             if (stuErr){ 
//               res.json({ 
//                 status: false, 
//                 error : stuErr.message, 
//                 message : "Error while retriving student data." 
//               });
//             } 
//             if (stuDoc) {
//               var totalStudents = 0;
//               var assignmentSubmittedStudents = 0;

//               //Verifying if student array length is greater than zero or not
//               if (stuDoc.students.length > 0) {
//                 totalStudents += stuDoc.students.length

//                 //Query for finding  students data for those students who have submitted assignment
//                 let selector = {
//                   roomId : recordId,
//                   createdBy : person._id, 
//                   _id:assignmentId
//                 }

//                 Assignment.findOne(selector)
//                 .select('submissions')
//                 .exec(function (assignErr, assignData) {
//                   if (assignErr) {
//                     res.json({ 
//                       status: false, 
//                       error: assignErr.message, 
//                     });
//                   }
//                   if (_.isEmpty(assignData.submissions)) {
//                     res.json({ 
//                       status: false, 
//                       error: 'No data', 
//                     });
//                   } else {
//                     assignmentSubmittedStudents += assignData.submissions.length;
//                     var assignmentNotSubmittedStudents = totalStudents - assignmentSubmittedStudents;

//                     let obj = {
//                       notSubmittedStudents : (assignmentNotSubmittedStudents/totalStudents)*100,
//                       submittedStudents : (assignmentSubmittedStudents/totalStudents)*100,
//                       totalRecords : (totalStudents/totalStudents)*100
//                     }

//                     res.json({ 
//                       status: true, 
//                       data: obj, 
//                     });
//                   }
//                 });
//               }

//             } else {
//               res.json({ 
//                 status: false, 
//                 data: 'No students', 
//               });
//             }
//           })
//         }
//       }
//     } catch(e) {
//       console.log("Error in students submission assignment", e);
//       res.json({
//         status : false, 
//         error : "Internal server error."
//       });
//     }
//   });
// }

/**
*  @Function name : activeUsers
*  @Purpose : For fetching login users report 
*  @Request Object : query : { companyId, fromDate ,toDate }
*  @Response Object : Success - obj , Failure - Error message
*  @Author : pranathi
*/

export function activeUsers (req,res) {
  checkValidRequest(req.headers, function(person) {

    try {
      //Verifying if request is valid or not
      if (person == null || !req.query.companyId || !mongoose.Types.ObjectId.isValid(req.query.companyId)) {
        res.json({
          status: false, 
          error : "Invalid request."  
        });
      } else {

        let selector = {};
        if (person.role == Roles.Superadmin ) {
            selector = {
              _id :{$ne : person._id},
              'guest' : false,
              'userStatus' : 'Active'
            };
        } else if(person.role == Roles.Admin || person.role == Roles.Lmsadmin || person.role == Roles.Presenteradmin  ) {
            selector = {
              _id :{$ne : person._id}, 
              'profile.companyid':req.query.companyId,
              'guest' : false,
              'userStatus' : 'Active'
            };
        }

        //finding corporate users id's  based on corporateid or uId
        Users.find(selector)
        .select('_id')
        .exec(function (usersErr, usersData) {
          if (usersErr) {
            res.json({ 
              status: false, 
              error: usersErr.message, 
            });
          } else if(usersData && usersData.length > 0) { 

            let userIds = usersData.map(function(d){ return d._id.toString() });
            let obj = {};

            dataLog.find({
              uid:{ $in : userIds},
              category: 'User',
              action: 'Log_In',
              'value.logged': true,
              dateAdded :{$gte:req.query.fromDate,$lte:req.query.toDate}
            }).distinct('uid')
            .exec(function (loginUserErr, loginUserData) {
              if (loginUserErr) {
                res.json({ 
                  status: false, 
                  error: loginUserErr.message, 
                });
              } else {
                let activeUsersIds = [];
                loginUserData.forEach(function(value) {
                  activeUsersIds.push(value.toString());
                });
                obj['TotalUsersCount'] = (userIds.length/userIds.length)*100;
                obj['ActiveUsersCount'] = (loginUserData.length/userIds.length)*100;

                let inactiveUsersIds = _.difference(userIds,activeUsersIds);
                obj['InactiveUsersCount'] = (inactiveUsersIds.length/userIds.length)*100;
                obj['ActiveUsersIds'] = activeUsersIds;
                obj['InactiveUsersIds'] = inactiveUsersIds;
                obj['TotalUserIds'] = userIds;

                res.json({ 
                  status: true, 
                  data: obj, 
                });
              }
            });           
          } else {
            res.json({
              status:true,
              data: null
            });
          }
        });      
      } 
    } catch(e) {
      console.log("Error in activeUsers", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });     
    }
  })
}

/**
*  @Function name : listActiveUsers
*  @Purpose : For fetching login users list data 
*  @Request Object : usersData : { usersData }
*  @Response Object : Success - active users  data and count, Failure - Error message
*  @Author : pranathi
*/

export function listActiveUsers (req,res) {
  checkValidRequest(req.headers, function(person) {
    try {
      let usersData = req.body.usersData;
      // Verifying if request is valid or not
      if (person == null || !usersData.itemsPerPage || !usersData.currentPage || !usersData.listIds) {
        res.json({
          status: false, 
          error : "Invalid request."
        });
      } else {    

        let selector = {
          _id : { $in : usersData.listIds }
        };

        //If search is not empty then create RegExp

        if (usersData.searchKeyword && usersData.searchKeyword  != '') {
          let slash_search = addSlash(usersData.searchKeyword);
          let searchKey = RegExp(slash_search,'i');

          selector['$or'] = [
            { 'firstname' : {$regex: searchKey} },
            { 'lastname' : {$regex: searchKey} },
           ];
        }

        let query = Users.find(selector)
        .select('firstname lastname email role profile')
        .populate('profile.companyid', 'businessId _id')
        .limit(Number(usersData.itemsPerPage))
        .skip(Number(usersData.itemsPerPage) * (Number(usersData.currentPage )-1))
        .sort({createdOn: -1});

        //Query for counting complete active users data based on selector
        let usersCount = Users.count(selector);

        query.exec(function(err, result) {
          if (err) {
            res.json({ status : false, error : err.message });
          } else {
            usersCount.exec(function(error, count){
              res.json({ status : true, data : result, count : count });
            });
          }
        });
      }      
    } catch(e) {
      console.log("Error in listActiveUsers", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });     
    }
  })
}

/**
*  @Function name : courseAttendance
*  @Purpose : For fetching course users attendance report 
*  @Request Object : query : { rId, fromDate ,toDate }
*  @Response Object : Success - obj , Failure - Error message
*  @Author : pranathi
*/

export function courseAttendance(req,res) {
 checkValidRequest(req.headers, function(person) {
   try {
      // Verifying if request is valid or not
      if (person == null || !req.query.rId || !mongoose.Types.ObjectId.isValid(req.query.rId) || !req.query.fromDate || !req.query.toDate ) {
        res.json({
          status: false, 
          error : "Invalid request."
        });
      } else {

        var fromDate = moment(req.query.fromDate,"x").utc().toDate();
        var toDate = moment(req.query.toDate,"x").utc().toDate();

        //fetching room users based on roomId
        Room.findOne({_id : req.query.rId})
        .select('users')
        .populate('users','_id role', { guest: false })
        .exec(function(courseErr,courseUsers) {
          if(courseErr) {
            res.json({ 
              status: false, 
              error : courseErr.message, 
            });
          } else if (courseUsers && courseUsers.users && courseUsers.users.length > 0 ) {
            let obj = {};

            //based on role showing reports 
            if( Roles.Lmsadmin == person.role ) {
              let totalInstructorIds = [];
              let stringTotalInsIds = [];

              //seperating instructor ids from total users 
              courseUsers.users.forEach(function(user) {
                if(Roles.Instructor == user.role) {
                  totalInstructorIds.push(user._id);
                  stringTotalInsIds.push(user._id.toString());
                } 
              });
              
              if(totalInstructorIds.length > 0) {
               let InsQuery = dataLog.aggregate([
                 {
                    $match:{
                      uid : {$in : totalInstructorIds },
                      category : 'Attendance',
                      action : 'CheckIn',
                      'value.courseId' : req.query.rId,
                      dateAdded :{$gte:fromDate,$lte:toDate} 
                    }
                  },
                  {
                      $group: { _id: '$uid' }
                  }
                ]);
               // fetching attended ins unique ids from dataLogs
                InsQuery.exec(function(insErr, insData) {
                  if(insErr) {
                    res.json({
                      status:false,
                      error:insErr.message
                    });
                  } else {
                    let presnetInsIds = insData.map(function(d){return d._id.toString()})
                    let absentInsIds = _.difference(stringTotalInsIds,presnetInsIds); 

                    obj['presentInsCount']=  (insData.length/totalInstructorIds.length)*100;
                    obj['presentInsIds'] = presnetInsIds;
                    obj['absentInsCount'] = (absentInsIds.length/totalInstructorIds.length)*100;
                    obj['absentInsIds'] = absentInsIds;

                    //fetching course students ids
                    studentAttendance(req.query.rId, fromDate, toDate ,function(err, studentData) {
                      if(studentData == null) {
                        obj['presentStuCount'] = 0;
                        obj['absentStuCount'] = 0;
                        res.json({
                          status:true ,
                          data: obj
                        });
                      } else if(studentData != null) {
                        let absentStudents =_.difference(studentData.totalStuIds, studentData.presentStuIds);
                        obj['presentStuCount'] = (studentData.presentStuIds.length/studentData.totalStuIds.length)*100;
                        obj['presentStuIds'] = studentData.presentStuIds;
                        obj['absentStuCount'] = (absentStudents.length/studentData.totalStuIds.length)*100;
                        obj['absentStuIds'] = absentStudents;

                        res.json({ status: true, data: obj });
                      } else {
                        res.json({
                          status: false,
                          error: err
                        });
                      } 
                    });
                  } 
                });
              } else {
                obj['presentInsCount']= 0;
                obj['absentInsCount'] = 0;
                obj['presentStuCount'] = 0;
                obj['absentStuCount'] = 0;

                res.json({ status: true, data: obj });
              }
            } else if (Roles.Instructor == person.role ) {
              studentAttendance(req.query.rId, fromDate, toDate ,function(err, studentData) {
                if(studentData == null) {
                  obj['presentStuCount'] = 0;
                  obj['absentStuCount'] = 0;
                  res.json({
                    status: true,
                    data: obj
                  });
                } else if(studentData != null) {
                  let absentStudents =_.difference(studentData.totalStuIds, studentData.presentStuIds);
                  obj['presentStuCount'] = (studentData.presentStuIds.length/studentData.totalStuIds.length)*100;
                  obj['presentStuIds'] = studentData.presentStuIds;
                  obj['absentStuCount'] = (absentStudents.length/studentData.totalStuIds.length)*100;
                  obj['absentStuIds'] = absentStudents;

                  res.json({ status: true, data: obj });
                } else{
                  res.json({
                    status: false,
                    error: err
                  });
                }
              });
            } else {
              res.json({ 
                status: false, 
                error: 'access denied', 
              });
            }
          } else {
            res.json({ 
              status: true, 
              data : null, 
            });
          }
        });
      }
   } catch(e) {
      console.log("Error in Course Attendance ", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });     
    }
  });
}


function studentAttendance(rId, fromDate, toDate, callBack) {

  Student.find({roomId : rId},{ '_id': 0,'students':1 })
  .populate('students','_id',{ guest: false })
  .lean().exec(function(stuErr,stuData) {
    if (stuErr) {
      callBack(stuErr.message, null);                 
    } else if(stuData && stuData.length > 0) {

      //changeBy : pranathi, disc: removing guest users from stuData
      //pushing multiple array ids in to one array
      let  studentDupArrayIds = [];
      stuData.forEach(function(data) {
        studentDupArrayIds = _.unionBy(data.students,studentDupArrayIds)
      });
      let studentDupIds = studentDupArrayIds.map(function(d) { return d._id});

      //getting unique student ids from stuData
      if( studentDupIds.length > 0 ) {
        //seperating unique studentIds from studentDupIds
        let stuIdObjData;
        stuIdObjData = new Set(studentDupIds.toString().split(","));
        
        let studentArrayData = Array.from(stuIdObjData)
        let studentIds = [];
        for(let i=0; i< studentArrayData.length; i++) {
          studentIds.push(mongoose.Types.ObjectId(studentArrayData[i]));
        }

        let StuQuery = dataLog.aggregate([
          {
            $match: {
              uid : {$in : studentIds},
              category : 'Attendance',
              action : 'CheckIn',
              'value.courseId':rId,
              dateAdded : {$gte:fromDate, $lte:toDate} 
            }
          },{
            $group: {_id:'$uid'}
          }
        ]);
        // fetching attended students unique ids from dataLogs
        StuQuery.exec(function(presentStuErr, presentStuData) {
          if(presentStuErr) {
            callBack(AttdStuErr.message, null);
          } else if(presentStuData && presentStuData.length > 0) {
            let presentStuIds = presentStuData.map(function(d) { return d._id.toString()})
            callBack(null,{"presentStuCount": presentStuIds.length,"presentStuIds":presentStuIds, "totalStuCount":studentIds.length,"totalStuIds": studentArrayData });
          } else  {
            callBack(null,{"presentStuCount":0, "presentStuIds":[], "totalStuCount":studentIds.length, "totalStuIds": studentArrayData });
          }
        });
      } else {
        callBack(null,null); 
      }
    } else {
      // callBack(null,{"presentStuCount":0, "totalStuCount":0});  
      callBack(null,null);     
    }
  });
}

/**
*  @Function name : individualAttendance
*  @Purpose : For fetching individual attendance data 
*  @Request Object : query : { rId, uId, fromDate, toDate }
*  @Response Object : Success - attendance data , Failure - Error message
*  @Author : pranathi
*/

export function individualAttendance (req,res) {

  checkValidRequest(req.headers, function(person) {
    try {
      //Verifying if request is valid or not
      if (person == null && !req.query.rId && !req.query.uId) {
        res.json({
          status: false, 
          error : "Invalid request."  
        });
      } else {
        //Validating if room id is valid or not
        if (!req.query.rId || validator.isEmpty(req.query.rId) || !mongoose.Types.ObjectId.isValid(req.query.rId)) {
          res.json({
            status: false, 
            error : "Invalid room"
          });
        } else {

          let  obj = {};

          var fromDate = moment(req.query.fromDate,"x").utc().toDate();
          var toDate = moment(req.query.toDate,"x").utc().toDate();
          
          let offlineVisitsSelector = {
            uid: mongoose.Types.ObjectId(req.query.uId),
            category: 'Attendance',
            action: 'CheckIn',
            'value.courseId' :req.query.rId,
            $or : [{'value.schedule': false}, {'value.schedule': 'false'}],
            dateAdded: {$gte:fromDate,$lte:toDate}
          }

          let onlineVisitsSelector = {
            uid: mongoose.Types.ObjectId(req.query.uId),
            category: 'Attendance',
            action: 'CheckIn',
            'value.courseId' :req.query.rId,
            $or : [{'value.schedule': true}, {'value.schedule': 'true'}],
            dateAdded: {$gte:fromDate,$lte:toDate}
          }
          //fetching offline attended room users in dataLog
          dataLog.find(offlineVisitsSelector)
          .select('_id')
          .lean().exec(function(offlineVisitErr,offlineVisitRes) {
            if(offlineVisitErr) {
              res.json({
                error: offlineVisitErr.message,
                status: false
              });
            } else {
              obj['offlineVisitsCount'] = offlineVisitRes.length;
              obj['offlineVisitsIds'] = offlineVisitRes.map(function(d){return d._id.toString()});
              //fetching conference attended users in datalog
              dataLog.find(onlineVisitsSelector).distinct('value.slotId')
              .lean().exec(function(onlineVisitErr,onlineVisitRes) {
                if(onlineVisitErr) {
                  res.json({
                    error: onlineVisitErr.message,
                    status: false
                  });
                } else {
                  obj['onlineVisitsCount'] = onlineVisitRes.length;

                  //fetching users multiple times attednded slot ids 
                  dataLog.find(onlineVisitsSelector).select('value.slotId')
                  .lean().exec(function(onlineIdsErr,onlineIdsRes) {
                    if(onlineIdsErr) {
                      res.json({ error: onlineIdsErr.message, status: false });
                    } else {
                      obj['onlineVisitsIds'] = onlineIdsRes.map(function(d){return d._id.toString()});

                      let totalQuery = Schedule.aggregate([
                        {
                          $unwind:'$dates'
                        },
                        {
                          $match:{
                            'dates.startTime':{$gte:Number(req.query.fromDate),$lte:Number(req.query.toDate)},
                            roomId : mongoose.Types.ObjectId(req.query.rId)
                          }
                        },
                        {
                          $group: { _id: '$dates._id' }
                        }
                      ]);
                      //fetching total schedules 
                      totalQuery.exec(function(totalSchedulesErr,totalSchedulesData) {
                        if(totalSchedulesErr) {
                          res.json({
                            error: totalSchedulesErr.message,
                            status: false
                          });
                        } else {
                          let TotalSchedulesIds = totalSchedulesData.map(function(d){return d._id.toString()}) 
                          obj['totalVisitsCount'] = totalSchedulesData.length;
                          obj['totalVisitsIds'] = totalSchedulesData.map(function(d){return d._id.toString()});

                          obj['absentSchedulesCount'] = totalSchedulesData.length-obj.onlineVisitsCount;
                          obj['absentSchedulesIds'] = _.difference(TotalSchedulesIds,onlineVisitRes);
                          if(obj.offlineVisitsCount != 0 || obj.onlineVisitsCount !=0 || obj.totalVisitsCount != 0 || obj.absentSchedulesCount != 0) {
                            res.json({ 
                              status : true,
                              data: obj 
                            });
                          } else {
                            res.json({ 
                              status : true,
                              data: null 
                            });
                          }
                        }
                      });
                    }
                  })
                }
              });
            }
          });
        }
      }
    } catch(e) {
      console.log("Error in Individual Attendance ", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });     
    }
  });
}

/**
*  @Function name : listIndividualAttendance
*  @Purpose : For fetching individual attendance list data 
*  @Request Object : attendanceData : { attendanceData }
*  @Response Object : Success - attendance data and count, Failure - Error message
*  @Author : pranathi
*/

export function listIndividualAttendance(req,res) {
  checkValidRequest(req.headers, function(person) {
    try {

      let attendanceData = req.body.attendanceData;
      
      // Verifying if request is valid or not
      if (person == null || !attendanceData.itemsPerPage || !attendanceData.currentPage || !attendanceData.listIds) {
        res.json({
          status: false, 
          error : "Invalid request."
        });
      } else { 
        let selector = {
          _id: {$in:attendanceData.listIds}
        }

        //Query for fetching checkInTime checkOutTime dates from dataLogs 
        let query = dataLog.find(selector)
        .select('dateAdded value.checkOutTime')
        .limit(Number(attendanceData.itemsPerPage))
        .skip(Number(attendanceData.itemsPerPage) * (Number(attendanceData.currentPage)-1))
        .sort({dateAdded: -1});

        //Query for counting attendance data from dataLogs 
        let countQuery = dataLog.count(selector);
        query.exec(function(err,result) {
          if(err) {
            res.json({
              error: err.message,
              status: false
            });
          } else {
            countQuery.exec(function(countErr,countData) {
              res.json({ status : true, data : result, count : countData });
            });
          }
        });
      }
    }  catch(e) {
      console.log("Error in List Individual Attendance ", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });   
    }
  });
}

/**
*  @Function name : listTotalSchedules
*  @Purpose : For fetching Total Schedules list data 
*  @Request Object : scheduleData : { scheduleData }
*  @Response Object : Success - schedule data and count, Failure - Error message
*  @Author : pranathi
*/

export function listTotalSchedules(req,res) {
  checkValidRequest(req.headers, function(person) {
    try {
      
      let scheduleData = req.body.scheduleData;

      // Verifying if request is valid or not
      if (person == null || !scheduleData.itemsPerPage || !scheduleData.currentPage || !scheduleData.listIds) {
        res.json({
          status: false, 
          error : "Invalid request."
        });
      } else {
        let listIds = [];
        scheduleData.listIds.forEach(function(value) {
          listIds.push(mongoose.Types.ObjectId(value));
        });

        //Query for fetching complete schedules 
        let ScheduleQuery = Schedule.aggregate([
          {
            $unwind:'$dates'
          },
          {
            $match:{
              'dates._id': { $in:listIds }
            }
          },
          {
            $group: { 
              _id: { 
                  startTime: '$dates.startTime',
                  endTime:'$dates.endTime'
                }  
            }
          },
          {
            $skip:Number(scheduleData.itemsPerPage) * (Number(scheduleData.currentPage)-1)
          },
          {
            $limit:Number(scheduleData.itemsPerPage)
          },
          {
            $sort:{createdAt: -1}
          }
        ]);

        //Query for counting complete schedules  
        let ScheduleCount = Schedule.aggregate([
          {
            $unwind:'$dates'
          },
          {
            $match:{
              'dates._id': { $in:listIds }
            }
          },
          {
            $group:{ _id:'$dates._id'}
          }
        ]);

        ScheduleQuery.exec(function(scheduleErr,scheduleData) {
          if(scheduleErr) {
            res.json({
              status: false,
              error: scheduleErr.message
            });
          } else {
            ScheduleCount.exec(function(countErr,countData) {
              let count = countData ? countData.length : 0;
              res.json({ status : true, data : scheduleData, count : count });
            });
          }
        });
      }
    }  catch(e) {
      console.log("Error in List TotalSchedules ", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });   
    }
  });
}

/**
*  @Function name : courseTopics
*  @Purpose : For fetching course topics  data 
*  @Request Object : params : rId
*  @Response Object : Success - topics data , Failure - Error message
*  @Author : pranathi
*/
export function courseTopics(req,res) {

  checkValidRequest(req.headers, function(person) {
    try {

      // Verifying if request is valid or not
      if (person == null || !req.params.rId || !mongoose.Types.ObjectId.isValid(req.params.rId)) {
        res.json({
          status: false, 
          error : "Invalid request."
        });
      } else {
          //fetching topic names based on the courseId and topicEnable
        Topic.find({roomId:req.params.rId,topicEnable:true})
        .select('_id topicName')
        .exec(function(topicErr,topicData) {
          if(topicErr) {
            res.json({
              status: false,
              error: topicErr.message
            });
          } else {
            res.json({
              status: true,
              data:topicData
            });
          }
        });
      }
    } catch (e) {
      console.log("Error in Course Topics ", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/**
*  @Function name : courseUsers
*  @Purpose : For fetching course Users  data 
*  @Request Object:params : rId
*  @Response Object : Success - users data , Failure - Error message
*  @Author : Rajesh Goriga
*/
export function courseUsers(req, res) {
  checkValidRequest(req.headers, function (person) {
    try {

      // Verifying if request is valid or not
      if (person == null || !req.params.rId || !mongoose.Types.ObjectId.isValid(req.params.rId)) {
        res.json({
          status: false, 
          error : "Invalid request."
        });
      } else {
        let obj = {
          uid: person._id,
          role: person.role,
          rid: req.params.rId
        }
        let selector = null;
        if (obj.role == Roles.Lmsadmin) {
          selector = {
            roomId: mongoose.Types.ObjectId(obj.rid)
          }
        } else if (obj.role == Roles.Instructor) {
          selector = {
            roomId: mongoose.Types.ObjectId(obj.rid),
            instId: mongoose.Types.ObjectId(obj.uid)
          }
        }

        if (selector != null) {
          let query = Student.aggregate([
            { $unwind: "$students" },
            { $match: selector },
            { $group: { _id: null, stds: { $addToSet : "$students" } } },
            { $project: { _id: 0, students: "$stds" } }
          ]);
          query.exec(function (stuErr, stuData) {
              if (stuErr) res.json({ status: false, error: stuErr.message });
              else if (stuData && stuData.length > 0) {
               Users.find({ _id: { $in: stuData[0].students },"guest" : false}, { firstname: 1 }, function (err, students) {
                  if (err) {
                    res.json({ status: false, error: err.message });
                  }  
                  else {
                    res.json({ status: true, data: students });
                  } 
                })
              } else {
                res.json({ status: false, error : 'users not found' });
              }
          });
        } 
      }
    } catch (e) {
      res.json({
        status: false,
        error: "Internal server error."
      });
    }
  });
}

/**
*  @Function name : topicViewedUsers
*  @Purpose : For fetching topic Viewed Users Data
*  @Request Object : query : { topicId,rId}
*  @Response Object : Success -  obj , Failure - Error message
*  @Author : pranathi
*/
export function topicViewedUsers(req,res) {
  checkValidRequest(req.headers, function(person) {
    try {

      //Verifying if request is valid or not
      if (person == null && !req.query.topicId && !req.query.rId ) {
        res.json({
          status: false, 
          error : "Invalid request."  
        });
      } else {

        let objEntity = {
          uid : person._id,
          role : person.role,
          rid : req.query.rId
        };

        //fetching students ids based on role
        getStudentsList(objEntity, function(studenterr, students) {
          if (students != null) {

            let obj = {};

            //checking whether req is  ALL topics  or individula topics based on topicId
            if(req.query.topicId == 'ALL') {

              //fetching all topic ids based on roomId and topicEnable
              Topic.find({ roomId:objEntity.rid, topicEnable:true })
              .select('_id')
              .exec(function(topicErr,topicData) {
                if(topicErr) {
                  res.json({
                    status : false,
                    error : topicErr.message
                  });
                } else if(topicData && topicData.length > 0 ) {

                    let topicIds = topicData.map(function(d) { return d._id.toString() });

                    let viewedTopicsSelector = dataLog.aggregate([
                      {
                        $match:{
                          uid: { $in:students.studentIds },
                          category: 'Topic_Status',
                          'value.roomId': objEntity.rid,
                          'value.topicId':{ $in:topicIds }
                        }
                      },
                      {
                        $group:{
                          _id:'$value.topicId'
                        }
                      },
                    ]);

                    //fetching unique viewed topic ids from dataLog
                    viewedTopicsSelector.exec(function(viewedTopicsErr, viewedTopicsIds) {
                      if(viewedTopicsErr) {
                        res.json({ status: false, error: viewedTopicsErr.error });
                      } else if(viewedTopicsIds && viewedTopicsIds.length > 0) {
                        let ViewedTopicsIds = viewedTopicsIds.map(function(d) { return d._id.toString() })

                        let completedTopicsSelector = {
                          uid: { $in:students.studentIds },
                          category: 'Topic_Status',
                          'value.status':2,
                          'value.roomId': objEntity.rid,
                          'value.topicId':{ $in:topicIds }
                        }

                        //finding the completely viewed topics users data
                        dataLog.find(completedTopicsSelector)
                        .select('uid value.topicId')
                        .exec(function(completedTopicsErr,completedTopicsIds) {
                          if(completedTopicsErr) {
                            res.json({ status: false, error:completedTopicsErr.error })
                          } else if(completedTopicsIds && completedTopicsIds.length > 0) {

                            let tpIds = {};

                            //creating object topic id with users
                            for (let i in completedTopicsIds) {
                              let id = completedTopicsIds[i].value.topicId;
                              let uid = completedTopicsIds[i].uid;
                              if (tpIds[id]) {
                                let index = tpIds[id].indexOf(uid);
                                if (index <= -1) {
                                  tpIds[id].push(uid);
                                }
                              } else {
                                tpIds[id] = [uid];
                              }
                            }

                            let completedIds = [];
                            
                            //checking completely viewed topics ids with student ids
                            for (var key in tpIds) {
                              if (tpIds.hasOwnProperty(key)) {
                                let value = tpIds[key];
                                if (value.length == students.studentIds.length) {
                                  completedIds.push(key);
                                } 
                              }
                            }

                            let inprogressTopicsIds = _.difference(ViewedTopicsIds,completedIds);
                            let notAtAllViewedTopicsIds = _.difference(topicIds,ViewedTopicsIds);

                            obj['notAtAllViewedTopicsCount'] =  (topicIds.length-ViewedTopicsIds.length)/(topicIds.length)*100;
                            obj['notAtAllViewedTopicsIds'] = notAtAllViewedTopicsIds; 

                            obj['inprogressTopicsCount'] = (inprogressTopicsIds.length/ topicIds.length)*100;
                            obj['inprogressTopicsIds'] = inprogressTopicsIds;

                            obj['completedTopicsCount'] = (completedIds.length/topicIds.length)*100;
                            obj['completedTopicsIds'] = completedIds;

                            res.json({ status : true, data : obj });
                          } else {
                            let notAtAllViewedTopicsIds = _.difference(topicIds,ViewedTopicsIds);
                            obj['notAtAllViewedTopicsCount'] = (topicIds.length-ViewedTopicsIds.length)/(topicIds.length)*100;
                            obj['notAtAllViewedTopicsIds'] = notAtAllViewedTopicsIds;

                            obj['inprogressTopicsCount'] = (ViewedTopicsIds.length/topicIds.length)*100;
                            obj['inprogressTopicsIds'] = ViewedTopicsIds;

                            obj['completedTopicsCount'] = 0;

                            res.json({ status : true, data : obj });
                          }
                        });
                      } else {
                        obj['notAtAllViewedTopicsCount'] = (topicIds.length /topicIds.length) * 100;
                        obj['notAtAllViewedTopicsIds'] = topicIds;
                        obj['inprogressTopicsCount'] = 0;
                        obj['completedTopicsCount'] = 0;

                        res.json({ status: true, data: obj });
                      }
                    });
                } else {
                    res.json({
                      status: true,
                      data: null
                    });
                }
              });
            } else {

              let completedTopicSelector = {
                uid: {$in:students.stringStudentIds},
                category: 'Topic_Status',
                'value.status': 2,
                'value.roomId' : objEntity.rid,
                'value.topicId': req.query.topicId
              }
              let inprogressTopicSelector = {
                uid: {$in:students.stringStudentIds},
                category: 'Topic_Status',
                'value.status': 1,
                'value.roomId' : objEntity.rid,
                'value.topicId': req.query.topicId
              }
              let notAtAllViewedTopicSelector = {
                uid: {$in:students.stringStudentIds},
                category: 'Topic_Status',
                'value.roomId' : objEntity.rid,
                'value.topicId': req.query.topicId
              }

              //fetching the completly viewed topic users data 
              dataLog.find(completedTopicSelector).select('uid')
              .exec(function(completedTopicUserIdsErr,completedTopicUserIds) {
                if(completedTopicUserIdsErr) {
                  res.json({ status: false, error: completedTopicUserIdsErr.message });
                } else {

                  //fetching the inprogress topic viewed users data
                  dataLog.find(inprogressTopicSelector).select('uid')
                  .exec(function(inprogressTopicUserIdsErr,inprogressTopicUserIds) {
                    if(inprogressTopicUserIdsErr) {
                      res.json({ status: false, error: inprogressTopicUserIdsErr.message });
                    } else {

                      //fetching the not at all viewed topic users data
                      dataLog.find(notAtAllViewedTopicSelector).select('uid')
                      .exec(function(notAtAllViewedTopicUsersErr,notAtAllViewedTopicUsersData) {
                        if(notAtAllViewedTopicUsersErr) {
                          res.json({ status: false, error: notAtAllViewedTopicUsersErr.message });
                        } else {

                          let ViewedUserIds = notAtAllViewedTopicUsersData.map(function (d) { return d.uid.toString() });
                          let CompletedUserIds = completedTopicUserIds.map(function (d) { return d.uid.toString() });
                          let InprogressUserIds = inprogressTopicUserIds.map(function (d) { return d.uid.toString() });

                          let notAtAllViewedUsers = _.difference(students.stringStudentIds,ViewedUserIds);

                          obj['completedTopicUsersCount'] = CompletedUserIds.length;
                          obj['completedTopicUsersIds'] = CompletedUserIds;

                          obj['inprogressTopicUsersCount'] = InprogressUserIds.length;
                          obj['inprogressTopicUsersIds'] = InprogressUserIds;

                          obj['notAtAllViewedTopicUsersCount'] = notAtAllViewedUsers.length;
                          obj['notAtAllViewedTopicUsersIds'] = notAtAllViewedUsers;

                          res.json({ status: true, data: obj });
                        }
                      });
                    }
                  });
                } 
              });
            }
          } else if(students == null) {
            res.json({
              status: true,
              data : null
            });
          }else {
            res.json({
              status: false, 
              error : studenterr  
            });
          }
        });
      }
    } catch(e) {
      console.log("Error in Topic Viewed Users", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });   
    }
  });
}

function getStudentsList(obj, callback) {
  let selector = null;

  //based on role fetching studentIds
  if( obj.role == Roles.Lmsadmin ) {
    selector = {
      roomId: obj.rid
    }
  } else if( obj.role == Roles.Instructor) {
    selector = {
      roomId: obj.rid,
      instId: obj.uid
    }
  }

  if (selector != null) {
    Student.find(selector,{ '_id': 0,'students':1 })
    .populate('students','_id',{ guest: false })
    .lean().exec(function(stuErr,stuData) {
      if (stuErr) {
        callback(stuErr.message, null);                 
      } else if(stuData && stuData.length >0 ) {
        //pushing multiple array ids in to one array
        let  studentDupArrayIds = [];
          stuData.forEach(function(data) {
           studentDupArrayIds = _.unionBy(data.students,studentDupArrayIds)
        });

        let studentDupIds = studentDupArrayIds.map(function(d) { return d._id});

        if(studentDupIds.length > 0) {
            //seperating unique studentIds from studentDupIds array
            let stuIdObjData = new Set(studentDupIds.toString().split(","))
            let studentArrayData = Array.from(stuIdObjData)
            let studentIds = [];
            let stringStudentIds = [];
              for(let i=0; i< studentArrayData.length; i++) {
                studentIds.push(mongoose.Types.ObjectId(studentArrayData[i]));
                stringStudentIds.push(studentArrayData[i]);
              }

            callback(null, {"studentIds":studentIds,"stringStudentIds":stringStudentIds});
        } else {
          callback(null, null);
        }
      } else {
        callback(null, null);
      }
    });
  }
}

/**
*  @Function name : listTopicViewedUsers
*  @Purpose : For fetching  topic viewed  users data list 
*  @Request Object : topicViewedUsersData : { topicViewedUsersData }
*  @Response Object : Success -  viewed topics list and count, Failure - Error message
*  @Author : pranathi
*/
export function listTopicViewedUsers(req,res) {
  checkValidRequest(req.headers, function(person) {
    try {
      
      let data = req.body.topicViewedUsersData;

      // Verifying if request is valid or not
      if (person == null || !data.itemsPerPage || !data.currentPage || !data.listIds) {
        res.json({
          status: false, 
          error : "Invalid request."
        });
      } else {
        let selector = {
          _id: { $in: data.listIds},

        };
        //If search is not empty then create RegExp
        if (data.searchKeyword && data.searchKeyword != '') {
          let searchKey = RegExp(data.searchKeyword,'i');
          selector['$or'] = [
            { 'firstname' : {$regex: searchKey} },
            { 'lastname' : {$regex: searchKey} }
           ];
        }

        let usersQuery = Users.find(selector)
        .select( 'firstname lastname email' )
        .limit( Number(data.itemsPerPage) )
        .skip( Number(data.itemsPerPage) * (Number(data.currentPage)-1) )
        .sort( {dateAdded: -1} );

        //Query for counting complete active users data based on selector
        let usersCount = Users.count(selector);

        usersQuery.exec(function(err, result) {
          if (err) {
            res.json({ status : false, error : err.message });
          } else {
            usersCount.exec(function(error, count){
              res.json({ status : true, data : result, count : count });
            });
          }
        });
      }
    } catch(e) {
      console.log("Error in List Topic Viewed Users", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });   
    }
  })
}

/**
*  @Function name : userViewedTopics
*  @Purpose : For fetching  Users Viewed   data 
*  @Request Object : query : { uId, rId, fromDate, toDate }
*  @Response Object : Success - users data , Failure - Error message
*  @Author : Rajesh Goriga
*/

export function userViewedTopics(req, res) {
  checkValidRequest(req.headers, function (person) {
    try {
      if (person == null && !req.query.rId && !req.qury.fromDate && !req.query.toDate) {
        res.json({
          status: false,
          error: "Invalid request."
        });
      } else {
        if (req.query.uId == "ALL") {
          let objEntity = {
            uid: person._id,
            role: person.role,
            rid: req.query.rId
          };
          getStudentsList(objEntity, function (studenterr, students) {
            if (students != null) {
              let obj = {};            
                Topic.find({ roomId: objEntity.rid, topicEnable: true })
                  .select('_id')
                  .exec(function (topicErr, topicData) {
                    if (topicErr) {
                      res.json({
                        status: false,
                        error: topicErr.message
                       });
                    } else {
                      if (topicData && topicData.length > 0) {
                        let totalTopicsIds = topicData.map(function (d) { return d._id.toString() });
                        let stdId = students.studentIds;
                        let query = dataLog.aggregate([
                          {
                            $match: {
                              category: "Topic_Status",
                              uid: {
                                $in:stdId
                              },
                              'value.topicId':{$in:totalTopicsIds}
                            }
                          },
                          {
                            $group: {
                              '_id': {
                                'userId': '$uid',
                                'status': '$value.status',
                                'topicId': '$value.topicId'
                              }
                            }
                          }
                        ]);
                        query.exec(function (error, CmTpc) {
                          if (error) {
                            res.json({
                              status: false,
                              error: error.message
                            });
                          } else {
                            Users.populate(CmTpc, {
                              path: '_id.userId', select: 'firstname'  }, function (err, populatedTransactions) {
                              if (err) {
                                res.json({ status: false, error: err.message });
                              } else if(populatedTransactions && populatedTransactions.length > 0)  {
                                let TopicsArray = populatedTransactions.map(function (d) { return d._id });
                                let topicViewedUserIds = TopicsArray.map(function (d) { return d.userId._id.toString()});
                                let topicViewedUserUniqIds =  [... new Set(topicViewedUserIds)];

                                let notAtAllViewedUsers = _.difference(students.stringStudentIds,topicViewedUserUniqIds);
                                let viewedUsersObj = arrangeResults(TopicsArray);

                                let notAtllViewedUsersObj = arrangeNotViewedUsers(notAtAllViewedUsers,function(err,data) {
                                   
                                  if(data && data.length > 0) {
                                      data.forEach(function(item) {
                                      viewedUsersObj.array.push(item);
                                    });
                                  }

                                  obj['AllUsersResult'] = viewedUsersObj.array;
                                  obj['totalTopicsCount'] = totalTopicsIds.length;
                            
                                    res.json({
                                      status: true,
                                      data: obj
                                    });
                                  });

                              } else {
                                Users.find({_id:{$in:students.studentIds}})
                                .select('firstname')
                                .exec(function(stuErr,stuData) {
                                  if(stuErr) {
                                    res.json({status:false,error:stuErr.message});
                                  } else {

                                    var newArray = [];
                                    for (var index in stuData) {
                                      var object = {};
                                      object['userId'] = stuData[index]['_id'].toString();
                                      object['values'] = [];
                                      object['username'] = stuData[index]['firstname'];
                                      object['countOfCompleted'] = 0;
                                      object['countOfInProgress'] = 0;
                                      newArray.push(object);
                                    }
                                    obj['AllUsersResult'] = newArray;
                                    obj['totalTopicsCount'] = totalTopicsIds.length;

                                    res.json({
                                      status: true,
                                      data: obj
                                    });
                                  }
                                })
                              }
                            });
                          }
                        });
                      } else {
                        res.json({
                          status: true,
                          data: null
                        });
                      } 
                    }
                  });
            } else if(students == null) {
              res.json({
                status: true,
                data: null
              });
            } else {
              res.json({
                status: false,
                error: studenterr
              });
            } 
          });
        } else { 
          //changeBy: pranathi, disc: topics are empty sending data as null      
          let objEntity = {
            courseId: req.query.rId,
            uid: mongoose.Types.ObjectId(req.query.uId)
          };

          let obj = {}

          let topicsQuery = Topic.find({ roomId: objEntity.courseId,topicEnable: true }, { _id: 1 });
          topicsQuery.exec(function (topicsErr, topicsData) {
            if (topicsErr) {
              res.json({ status: false, error: topicsErr.message })
            } else if(topicsData && topicsData.length > 0) {
              let totalTopics = topicsData.map(function (d) { return d._id.toString() });

              let completedTopicsSelector = dataLog.find(
                  {             
                    uid: objEntity.uid, category: 'Topic_Status', 'value.roomId': objEntity.courseId,'value.status':2, 'value.topicId': {$in: totalTopics}
                  },{
                      _id: 0, "value.topicId": 1
                  }
              );
              completedTopicsSelector.exec(function (completedTopicsErr, completedTopicsData) {
                if (completedTopicsErr) {
                  res.json({ status: false, error: completedTopicsErr.message })
                } else {
                  let CompletedTopics = completedTopicsData.map(function (d) { return d.value.topicId })
                  obj['CompletedTopics'] = CompletedTopics;
                  obj['CompletedTopicsCount'] = obj['CompletedTopics'].length;

                  let inprogressTopicsSelector = dataLog.find(
                    {
                      uid: objEntity.uid, category: 'Topic_Status', 'value.roomId': objEntity.courseId, 'value.status': 1, 'value.topicId': {$in: totalTopics}
                    }, {
                      _id: 0, "value.topicId": 1
                    }
                  );

                  inprogressTopicsSelector.exec(function (inPrograssTopicsErr, inPrograssTopicsData) {
                    if (inPrograssTopicsErr) {
                      res.json({ status: false, error: inPrograssTopicsErr.message })
                    } else {
                      let InPrograssTopics = inPrograssTopicsData.map(function (d) { return d.value.topicId });
                      obj['InPrograssTopics'] = InPrograssTopics;
                      obj['InPrograssTopicsCount'] = obj['InPrograssTopics'].length;

                      let visitedTopicsSelector = dataLog.find(
                        {
                          uid: objEntity.uid, category: 'Topic_Status', 'value.roomId': objEntity.courseId, 'value.topicId': {$in: totalTopics}
                        }, {
                          _id: 0, "value.topicId": 1
                        }
                      );

                      visitedTopicsSelector.exec(function (visitedTopicsErr, visitedTopicsData) {
                        if (visitedTopicsErr) {
                          res.json({ status: false, error: visitedTopicsErr.message })
                          
                        } else {
                          let VisitedTopics = visitedTopicsData.map(function (d) { return d.value.topicId })                          
                          
                          obj['NotAtAllVisitedTopics'] = _.difference(totalTopics, VisitedTopics)
                          obj['NotAtAllVisitedTopicsCount'] = obj['NotAtAllVisitedTopics'].length;
                          res.json({
                            status: true,
                            data: obj
                          });
                        }   
                      });
                    };
                  });
                }
              });
            } else {
              res.json({
                status: true,
                data: null
              });
            }
          });
        }
      }
    } catch (e) {
      console.log("Error   List Viewed Topic Users", e);
      res.json({
        status: false,
        error: "Internal server error."
      });
    }
  });
}

/**
*  @Function name : arrangeResults
*  @Purpose : For Arrrange array values
*  @Author : Rajesh Goriga
*/
function arrangeResults(results,users) {
  var newArray = [];
  for (var index in results) {
    var object = {};
    object['userId'] = results[index]['userId']['_id'].toString();
    object['values'] = [];
    object['viewedTopicIds'] = [];
    object['username'] = results[index]['userId']['firstname'];
    if (!isThisUserIdExistsInNewArray(newArray, results[index]['userId']['_id'])) {
      for (var j in results) {
        if (results[j]['userId']['_id'] == object['userId']) {
          object['values'].push(results[j]['status']);
          object['viewedTopicIds'].push(results[j]['topicId']); 
        }
      }
      newArray.push(object);
    }

  };
  return formatData(newArray)
}

/**
*  @Function name : isThisUserIdExistsInNewArray
*  @Purpose : For Check user exists or not
*  @Author : Rajesh Goriga
*/
function isThisUserIdExistsInNewArray(array, value) {
  for (var index in array) {
    if (value == array[index]['userId']) return true;
  }

  return false;
};
/**
*  @Function name : formatData
*  @Purpose : For Format users data 
*  @Author : Rajesh Goriga
*/

function formatData(array) {
  var users = [];

  for (var index in array) {
    users.push(array[index]['userId']);

    var countOfCompleted = 0;
    array[index]['values'].forEach(function (item) {
      if (item == 2) countOfCompleted++;
    });
    array[index]['countOfCompleted'] = countOfCompleted

    var countOfInProgress = 0;
    array[index]['values'].forEach(function (item) {
      if (item == 1) countOfInProgress++;
    });
    array[index]['countOfInProgress'] = countOfInProgress

    var countOfNotTouched = array[index]['values'].length - (countOfCompleted + countOfInProgress);
  };
  return {
    array: array,
    users:users
    
  }

}

function arrangeNotViewedUsers (users,callBack) {
  var array = [];
  if(users && users.length > 0) {

    Users.find({_id:{$in:users}})
    .select('firstname')
    .exec(function(userErr,userData) {
      if(userErr) {
        callBack(userErr.message,null);
      } else {
        array = userData.map(function(d) {
            return {
              'userId' : d._id,
              'values' : [],
              'username': d.firstname,
              'countOfCompleted' : 0,
              'countOfInProgress' : 0

            }  
          });
          callBack(null,array)
        }
    })
  } else {
    callBack(null,array);

  }
}

/**
*  @Function name : listCourseTopics
*  @Purpose : For fetching viewed topics list data 
*  @Request Object : topicsData : { topicsData }
*  @Response Object : Success -  viewed topics list and count, Failure - Error message
*  @Author : pranathi
*/
export function listCourseTopics(req,res) {
  checkValidRequest(req.headers, function(person) {
    try {
      
      let topicsData = req.body.topicsData;

      // Verifying if request is valid or not
      if (person == null || !topicsData.itemsPerPage || !topicsData.currentPage || !topicsData.listIds || !topicsData.rId) {
        res.json({
          status: false, 
          error : "Invalid request."
        });
      } else {

        let selector = {
          _id: { $in: topicsData.listIds },
          roomId: topicsData.rId,
          topicEnable: true  
        };

        // If search is not empty then create RegExp
        if (topicsData.searchKeyword && topicsData.searchKeyword != '') {
          let searchKey = RegExp(topicsData.searchKeyword,'i');
            selector ['topicName'] = {$regex: searchKey};
        }

        let topicsQuery = Topic.find(selector)
        .select('topicName description')
        .limit( Number(topicsData.itemsPerPage) )
        .skip( Number(topicsData.itemsPerPage) * (Number(topicsData.currentPage)-1) )
        .sort( {dateAdded: -1} );

        //Query for counting complete active users data based on selector
        let topicsCount = Topic.count(selector);

        topicsQuery.exec(function(err, result) {
          if (err) {
            res.json({ status : false, error : err.message });
          } else {
            topicsCount.exec(function(error, count){
              res.json({ status : true, data : result, count : count });
            });
          }
        });
      }
    } catch(e) {
      console.log("Error in List Viewed Topic Users", e);
      res.json({
        status : false, 
        error : "Internal server error."
      });   
    }
  })
}

/**
*  @Function name : listUserViewedAllTopics
*  @Purpose : For fetching user viewed topic list data 
*  @Request Object : query : { rId,uId,items,page }
*  @Response Object : Success -  viewed topics list and count, Failure - Error message
*  @Author : pranathi
*/

export function listUserViewedAllTopics(req,res) {
  checkValidRequest(req.headers, function(person) {
    try {
       // Verifying if request is valid or not
      let topicsData = req.body.topicsData;
      if (person == null || !topicsData.rId || !topicsData.uId || !topicsData.itemsPerPage || !topicsData.currentPage ) {
        res.json({
          status: false, 
          error : "Invalid request."
        });
      } else {
        let selector = {
            category: "Topic_Status",
            uid: topicsData.uId,
            'value.roomId' : topicsData.rId,
            'value.topicId' : {$in:topicsData.listIds}
        };
        
        let query = dataLog.find(selector)
        .select('value.status value.topicId')
        .limit(Number(topicsData.itemsPerPage))
        .skip(Number(topicsData.itemsPerPage) * (Number(topicsData.currentPage)-1))
        .sort({dateAdded: -1});

        let count_query = dataLog.count(selector);

        query.exec(function (error, topicData) {
          if (error) {
            res.json({
              status: false,
              error: error.message
            });
          } else {
            Topic.populate(topicData, { path: 'value.topicId', select: 'topicName'  }, function (err, result) {
              count_query.exec( function(error, countData) {
                res.json({ status : true, data : result, count : countData });
              });
            });
          }
        });
      }

    } catch(e) {
      console.log("Error in List User Viewed AllTopics", e);
      res.json({
        status : false, 
        error : "Internal server error."
      }); 
    };
  });
}

/**
*  @Function name : topicsReport
*  @Purpose : For fetching topicsReport data 
*  @Request Object : query : { rId }
*  @Response Object : Success -  obj, Failure - Error message
*  @Author : pranathi
*/
export function studentTopics (req,res) {
  checkValidRequest(req.headers, function(person) {
    try {
      // Verifying if request is valid or not
      if (person == null || !req.query.rId || !mongoose.Types.ObjectId.isValid(req.query.rId) ) {
        res.json({
          status: false, 
          error : "Invalid request."
        });
      } else {
        //fetcing total topics ids 
        Topic.find({ roomId: req.query.rId, topicEnable: true })
        .select('_id')
        .exec(function(topicsErr, topicsData) {
          if(topicsErr) {
            res.json({
              status: false,
              error: topicsErr.message
            });
          } else if(topicsData && topicsData.length > 0) {
            let topicIds = topicsData.map(function(d) {return d._id.toString()});
            let obj = {};

            let viewedTopics = {
                uid: mongoose.Types.ObjectId(person._id),
                category: 'Topic_Status',
                'value.roomId': req.query.rId,
                'value.topicId': {$in:topicIds} 
              }

            let completedTopicSelector = {
                uid: mongoose.Types.ObjectId(person._id),
                category: 'Topic_Status',
                'value.status': 2,
                'value.roomId' : req.query.rId,
                'value.topicId': {$in:topicIds} 
              }

            let inprogressTopicSelector = {
                uid: mongoose.Types.ObjectId(person._id),
                category: 'Topic_Status',
                'value.status': 1,
                'value.roomId': req.query.rId,
                'value.topicId': {$in:topicIds} 
              }

            //fetching total viewed topics ids from datalogs
            dataLog.find( viewedTopics, { _id: 0, "value.topicId": 1 })
            .exec(function(viewedTopicErr, viewedTopicData) {
              if(viewedTopicErr) {
                res.json({
                  status: false,
                  error: viewedTopicErr.message
                });
              } else if( viewedTopicData && viewedTopicData.length > 0 ) {
                  let viewedTopicsIds = viewedTopicData.map(function (d) { return d.value.topicId });

                  //fetching completely viewed topics ids from datalogs
                  dataLog.find( completedTopicSelector,{ _id: 0, "value.topicId": 1 })
                  .select('value.TopicId')
                  .exec(function(completedTopicErr,completedTopicData){
                    if(completedTopicErr) {
                      res.json({
                        status: false,
                        error: completedTopicErr.message
                      });
                    } else {
                      let completedTopics = completedTopicData.map(function(d) {return d.value.topicId});
                      obj['completelyViewedTopicsCount'] = (completedTopics.length / topicIds.length)*100;
                      obj['completelyViewedTopicsIds'] = completedTopics;

                      //fetching inprogress viewed topcis ids from datalogs
                      dataLog.find(inprogressTopicSelector,{ _id: 0, "value.topicId": 1 })
                      .select('value.TopicId')
                      .exec(function(inprogErr,inprogData) {
                        if(inprogErr) {
                          res.json({
                            status: false,
                            error: inprogErr.message
                          });
                        } else {
                          let inprogressTopicsIds = inprogData.map(function(d){return d.value.topicId});
                          let notAtAllViewedTopicsIds= _.difference(topicIds,viewedTopicsIds);

                          obj['InPrograssTopicsCount'] = (inprogressTopicsIds.length/topicIds.length)*100;
                          obj['inprogressTopicsIds'] = inprogressTopicsIds;

                          obj['notAtAllViewedTopicsCount'] = (notAtAllViewedTopicsIds.length/topicIds.length)*100;
                          obj['notAtAllViewedTopicsIds'] = notAtAllViewedTopicsIds;

                          res.json({
                            status: true,
                            data: obj
                          });
                        }
                      });
                    }
                  });

              } else {
                obj['notAtAllViewedTopicsCount'] = topicIds.length;
                obj['notAtAllViewedTopicsIds'] = topicIds;

                obj['inprogressTopicsCount'] = 0;
                obj['completedTopcisCount'] = 0;

                res.json({
                  status: true,
                  data: obj
                });
              }
            });
          } else {
            res.json({
              status: true,
              data : null
            });
          }
        });
      } 
    }  catch(e) {
      console.log("Error in topics Report ", e);
      res.json({
        status : false, 
        error : "Internal server error."
      }); 
    };
  });
}


/**
*  @Function name : studentAssignmentList
*  @Purpose : For fetching complete course data in student side
*  @Request Object : query : { page, items, search }
*  @Response Object : Success - course data and count, Failure - Error message
*  @Author : prateek
*/

export function studentAssignmentList(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {

      // Verifying if request is valid or not
      if (person == null || !req.query.items || !req.query.page ) {
        res.json({
          status: false, 
          error : "Invalid request."
        });
      } else {
        let listAssignment = req.query;

        let selector = {
          'submissions.studentId' : person._id,
          roomId : listAssignment.roomId
        };
        if(req.query.search) {
          let slash_search = addSlash(req.query.search);
          let searchKey = new RegExp(slash_search,'i');
          selector['assignmentName'] = searchKey
        }
        
        let query = Assignment.find(selector,{
          'submissions.$':1,
          'assignmentName' : 1          
        })
        .limit(Number(listAssignment.items))
        .skip(Number(listAssignment.items) * (Number(listAssignment.page)-1))
        .sort({ 'submissions.$.submittedAt' : -1})
        .populate('roomId', 'roomName')
        .exec(function(err, assignmentData) {
          if (err) {
            res.json({
              status : false,
              error : err.message
            })
          } else if(assignmentData && assignmentData.length>0) {
            
            Assignment.count({
              'submissions.studentId' : person._id,
              roomId : listAssignment.roomId              
            }).exec(function(err, count){
              res.json({ 
                status : true, 
                data : assignmentData, 
                count : count
              })
            })            
          } else {
            res.json({ 
              status : true, 
              data : [], 
              count : 0 
            })
          }
        })
      }
    } catch(e) {
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}


/**
*  @Function name : studentAssignmentResultData
*  @Purpose : For fetching assingment result at student side
*  @Request Object : query : {assingmentId}
*  @Response Object : Success - assignment Data, Failure - Error message
*  @Author : Prateek
*/

export function studentAssignmentResultData(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {

      // Verifying if request is valid or not
      if (person == null || !req.query.assignmentId) {
        res.json({
          status: false, 
          error : "Invalid request."
        });
      } else {
        let assignmentId = req.query.assignmentId;

        Assignment.findOne({
          _id : assignmentId,
          'submissions.studentId' : person._id
        }, {
          'submissions.$' : 1,
          'roomId' : 1,
          'assignmentName' : 1
        })
        .populate('submissions.evaluatedBy', 'firstname lastname profile.profileImage email')
        .exec(function(err, assignmentData) {
          if(err) {
            res.json({
              status : false,
              error : err.message
            })
          } else if(assignmentData) {
            res.json({
              status : true,
              data : assignmentData
            })
          } else {
            res.json({
              status : false,
              error : 'Assingment Not Found'
            })
          }
        })        
      }
    } catch(e) {
      res.json({
        status : false, 
        error : "Internal server error."
      });
    }
  });
}

/**
*  @Function name : checkCertificateEligibility
*  @Purpose : For checking if student is allowed to download certificate for a course
*  @Request Object : NA
*  @Response Object : Success - iseligible : true/false, Failure - Error message
*  @Author : Shantanu Paul
*/

export function checkCertificteEligibility(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {
      // Verifying if request is valid or not
      if (person == null) {
        res.json({
          status: false, 
          error : "Invalid request."
        });
      } else {
        Student.find({ certificateEligible: person.id }).select('roomId').exec((err, roomIds) => {
          if (err) throw err;

          res.json({
            status: true,
            roomIds
          });
        }); 
      }
    }
    catch(e){
      console.log("Error in student check certificate eligibility", e);
      res.json({
        status: false,
        error: "Internal server error."
      });
    }
  });
};

/**
*  @Function name : generateCertificate
*  @Purpose : For dynamically generating course completion certificate
*  @Request Object : query : {roomId}
*  @Response Object : Success - PDF file as binary Buffer, Failure - Error message
*  @Author : Shantanu Paul
*/

export function generateCertificate(req, res) {
  checkValidRequest(req.headers, function(person) {
    try {
      // Verifying if request is valid or not
      if (person == null || !req.query.rId || !mongoose.Types.ObjectId.isValid(req.query.rId)) {
        res.json({
          status: false, 
          error : "Invalid request."
        });
      } else {
        Room.findOne({_id: req.query.rId}).select('roomName corporateId').exec(function(err, roomData){
          if(err) throw err;

          Corporate.findOne({_id: roomData.corporateId}).select('businessName').exec(function(err, businessData){
            if(err) throw err;

            fs.readFile(process.env.PWD + '/public/CERT_TEMPLATE/certificate.html', 'utf-8', function(err, file){
              if(err) throw err;

              file = file.replace('[CORPORATE_NAME]',businessData.businessName);
              file = file.replace('[COURSE_NAME]', roomData.roomName);
              file = file.replace('[CANDIDATE_NAME]', person.firstname + ' ' + person.lastname);
              file = file.replace('[CORPORATE_NAME]',businessData.businessName);
              file = file.replace('[COURSE_NAME]', roomData.roomName);
              file = file.replace('[COMPLETION_DATE]', moment().utc().format('DD/MM/YYYY'));
              file = file.replace('[EXPIRY_DATE]', moment().add(1,'years').utc().format('DD/MM/YYYY'));

              var options = {
                format: 'A4',
                orientation: "landscape",
                base: 'file://' + path.join(process.env.PWD) + '/public/CERT_TEMPLATE/'
              };
              htmlPdf.create(file, options).toBuffer(function(err, fileBuffer){
              res.json({body: fileBuffer});
              });
            });
          });
        });
      }
    }
    catch(e) {
      console.log("Error in student download certificate", e);
      res.json({
        status: false,
        error: "Internal server error."
      });
    }
  });
}