/** 
* @Author: "Prudhvi",
* @Purpose: "CRUD oprations on schedule."
*/

import Users from '../models/users';
import Schedule from '../models/schedule';
import Room from '../models/room';
import { Roles } from './admin.user.controller';
import Student from '../models/students';
import Topic from '../models/topic';

import serverConfig from '../config';
import { checkValidRequest } from '../authorization';
import * as EmailForUserCreation from '../emailFunctions';
import {addSlash} from './slashesActions';
import { sendPushNotificationAndroid } from './mobile.controller';

var _ = require('lodash');
var mongoose = require('mongoose');
var moment = require('moment');
var validator = require('validator');

export function fetchMyRoomsSchedule(req, res){
  let header = req.headers;

  // Varifying request is valid or not
  checkValidRequest(header, function(person){
    try{
      //code added by - Najib, Desc - Checking company Id is set or not as per change made in "checkValidRequest"
      
      if (person != null && person.role == Roles.Superadmin) {
        let objEntity = {
          uid : person._id,
          role : person.role,
          cid : null
        }
        // get selector for fetch rooms according to role
        fetchRoomSelector(objEntity, function(selector, instructorIds){
          if(selector != null){
            let query = Room.find(selector).select('roomName selPackage').populate('selPackage', 'features');
            executeRoomQuery(query, function(err, doc, ids){
              if(doc != null){
                getTopics(ids, doc, function(response){
                  if(response == null)
                    res.json({ status: true, data: doc, topics : {} });
                  else
                    res.json({ status: true, data: doc, topics : response });
                });
              }else res.json({ status: false });
            });
          } else res.json({ status : false });
        });
      } else if (person != null && person.profile.companyid && person.profile.companyid._id) {
        let objEntity = {
          uid : person._id,
          role : person.role,
          cid : person.profile.companyid._id
        }
        // get selector for fetch rooms according to role
        fetchRoomSelector(objEntity, function(selector, instructorIds){
          if(selector != null){
            let query = Room.find(selector).select('roomName selPackage').populate('selPackage', 'features');
            executeRoomQuery(query, function(err, doc, ids){
              if(doc != null){
                getTopics(ids, doc, function(response){
                  if(response == null)
                    res.json({ status: true, data: doc, topics : {} });
                  else
                    res.json({ status: true, data: doc, topics : response });
                });
              }else res.json({ status: false });
            });
          } else res.json({ status : false });
        });
      } else res.json({status : false/*, error : "Invalid request."*/});
    } catch(e){
      console.log("error in fetchMyRoomsSchedule",e);
      res.json({status : false/*, error : "Internal server error."*/});
    }
  });
}


/**
* @Function Name: "createSchedule",
* @Purpose: "To create new schedule.",
* @Request Object: obj : {uid, startDate, endDate, todayStart, todayEnd, password, roomId, meetingName, topicId, recurring, type, repeatDuration, repeatOn, no_of_ocurence, endDateType },
* @Response Object: Success- {status : true, data : data_schedules, message }, Failure- {status : false, error},
* @Author: "Prudhvi"
*/
export function createSchedule (req, res) {
  let header = req.headers;
  
  // Varifying request is valid or not
  checkValidRequest(header, function(person){
    try{
      if (person != null && req.body && req.body.data && req.body.data.roomId && mongoose.Types.ObjectId.isValid(req.body.data.roomId) && req.body.data.duration && req.body.data.startDate) {
        let obj = req.body.data;
        let entity = {
          roomId : obj.roomId,
          meetingName : obj.meetingName,
          createdBy : mongoose.Types.ObjectId(person._id),
          modifiedBy : mongoose.Types.ObjectId(person._id),
          createdAt : Number(moment().utc().format('x')),
          modifiedAt : Number(moment().utc().format('x')),
          duration : Number(obj.duration)
        };
        if (obj.topicId) {
          entity['topicId'] = obj.topicId;
        }
        if (obj.password) {
          entity['password'] = obj.password;
        }

        setEntity(obj, function(newError, newEntity) {
          if (newEntity != null) {
            entity = Object.assign({ }, entity, newEntity);
            
            let checkValidityData = {
              roomid : entity.roomId,
              date : entity.endDate
            }

            // check the current room expire date validity with schdule date 
            checkRoomValidity(checkValidityData, function(validity, roomName){
          
              /* if response true
                  schedule date before the expire date of the room package 
                else
                  schedule date After the expire date of the room package */
              if (validity == true) {

                let schedule_selector = {
                  roomId : obj.roomId, 
                  startDate : { $lte : entity.endDate }, 
                  endDate : { $gte : entity.startDate }
                };

                let fullname = person.firstname + ' ';
                  fullname += person.lastname != undefined ? person.lastname : '';

                //code added by - Najib, Desc - Checking company Id is set or not as per change made in "checkValidRequest"  
                let saveEntity = {
                  entity : entity,
                  role : person.role,
                  cid : person.profile.companyid && person.profile.companyid._id ? person.profile.companyid._id : '', 
                  fullname : fullname,
                  email : person.email,
                  roomid : entity.roomId,
                  roomName : roomName,
                  uid : person._id,
                  start : obj.todayStart,
                  end : obj.todayEnd
                };

                let roomSchQuery = Schedule.find(schedule_selector);
                roomSchQuery.exec(function(roomerror, roomSchedules){
                  if (roomerror) {
                    res.json({ status : false, error : roomerror });
                  } else if(roomSchedules && roomSchedules.length > 0){
                      let objEntity = {
                        data : roomSchedules,
                        newdata : entity.dates,
                        roomName : roomName
                      }

                      // check and get the conflicted schedule data 
                      checkRoomSchedule(objEntity, function(checkresponse){

                        /* if response is null 
                                new schedule is not conflicted with other schedules and it will update the schedule
                            else
                              response as conflicted schedule data */
                        if (checkresponse != null) {
                          if (checkresponse.msg) res.json({ status : false, error : checkresponse.msg });
                          else res.json({ status : false, error : 801, object : checkresponse });
                        } else {

                          // not conflict with exiting schedules, create new schedule
                          saveScheduleCallback(saveEntity, function(scherr, schData){
                            if (scherr) res.json({ status : false, error : scherr });
                            else if (schData) res.json({ status : true, data : schData, message : "Schedule created successfully." });      
                            else res.json({ status : false, error : "Internal server error"});
                          });
                        }
                      });

                  } else {
                    
                    saveScheduleCallback(saveEntity, function(scherr, schData){
                      if (scherr) res.json({ status : false, error : scherr });
                      else if (schData) res.json({ status : true, data : schData, message : "Schedule created successfully." });
                      else res.json({ status : false, error : "Internal server error"});   
                    });
                  }
                });
              } else if(validity == false) {

                 //code changed by - Najib, Desc- Relevent message in response based on businessType
                let roomType = null;
                if(person.profile.companyid && person.profile.companyid.businessType && person.profile.companyid.businessType == 'LMS') {
                  roomType = "Course";
                } else {
                  roomType = "Room";
                }
                res.json({ status : false, error : "Your" + ' ' + roomType + ' ' + "will be expired before this schedule" });;
              } else {
                res.json({ status : false, error : validity });
              }
            });
          } else {
            res.json({ status : false, error : newError });
          }
        });
      } else {
        res.json({ status : false, error : "Invalid request." });
      }
    } catch(e) {
      console.log("error in createSchedule ", e);
      res.json({ status : false, error : "Internal server error." });
    }
  });
}

/**
* @Function Name: "updateSchedule",
* @Purpose: "To update schedule.",
* @Request Object: obj : {uid, startTime, endTime, date, password, roomId, meetingName, topicId, _id},
* @Response Object: Success- {status : true, data : data_schedules, message }, Failure- {status : false, error},
* @Author: "Prudhvi"
*/
export function updateSchedule (req, res) {
  let header = req.headers;
  
  // Varifying request is valid or not
  checkValidRequest(header, function(person){
    try{
      
      if (person != null && req.body.data && req.params.id && mongoose.Types.ObjectId.isValid(req.params.id)) {
        let obj = req.body.data;
        let validschedule = Schedule.findOne({ _id : req.params.id});
        validschedule.exec( function(validerr, schedule){
          if (validerr) {
            res.json({ status : false, error : "Internal server error, Please try again." });
          } else if (schedule) {
            let entity = {
              roomId : obj.roomId,
              meetingName : obj.meetingName,
              createdBy : mongoose.Types.ObjectId(person._id),
              modifiedBy : mongoose.Types.ObjectId(person._id),
              createdAt : Number(moment().utc().format('x')),
              modifiedAt : Number(moment().utc().format('x')),
              duration : Number(obj.duration),
              // startDate : obj.startDate
            };
            if (obj.topicId) {
              entity['topicId'] = obj.topicId;
            }
            if (obj.password) {
              entity['password'] = obj.password;
            }
            let temp_startDate = obj.startDate;
            if (obj.recurring == true) {
              obj['startDate'] = obj.edit_start_date;
            }

            // console.log("obj === ", obj);
            setEntity(obj, function(newError, newEntity) {
              if (newEntity != null) {
                entity = Object.assign({ }, entity, newEntity);
                
                let checkValidityData = {
                  roomid : entity.roomId,
                  date : entity.endDate
                }

                // check the current room expire date validity with schdule date 
                checkRoomValidity(checkValidityData, function(validity, roomName){
              
                  /* if response true
                      schedule date before the expire date of the room package 
                    else
                      schedule date After the expire date of the room package */
                  if (validity == true) {

                    let schedule_selector = {
                      _id : { $ne : req.params.id},
                      roomId : obj.roomId, 
                      startDate : { $lte : entity.endDate }, 
                      endDate : { $gte : entity.startDate }
                    };

                    // console.log("entity 1 ==== ", entity);

                    let fullname = person.firstname + ' ';
                      fullname += person.lastname != undefined ? person.lastname : '';
                    entity['startDate'] = temp_startDate;
                    let now = Number(moment().seconds(0).utc().format('x'));
                    function checkdates (dates) {
                      return (dates.startTime < obj.edit_start_date || dates.startTime < now);
                    }
                    let pastdates = entity.pattern && entity.pattern != '' && entity.pattern != 'undefined' && entity.pattern != undefined ? schedule.dates.filter(checkdates) : [];
                    // let pastdates = schedule.pattern && schedule.pattern != '' && schedule.pattern != 'undefined' && schedule.pattern != undefined ? schedule.dates.filter(checkdates) : [];
                    let temp_dates = entity.dates;
                    entity['dates'] = temp_dates.concat(pastdates);
                    // console.log("error ========= ", asasasas);

                    // console.log("entity ==== ", entity);
                    //code added by - Najib, Desc - Checking company Id is set or not as per change made in "checkValidRequest"
                    let saveEntity = {
                      entity : entity,
                      role : person.role,
                      cid : person.profile.companyid && person.profile.companyid._id ? person.profile.companyid._id : '',
                      fullname : fullname,
                      email : person.email,
                      roomid : entity.roomId,
                      roomName : roomName,
                      uid : person._id,
                      start : obj.todayStart,
                      end : obj.todayEnd
                    };
                    let roomSchQuery = Schedule.find(schedule_selector);
                    roomSchQuery.exec(function(roomerror, roomSchedules){
                      if (roomerror) {
                        res.json({ status : false, error : roomerror });
                      } else if(roomSchedules && roomSchedules.length > 0){
                        let objEntity = {
                          data : roomSchedules,
                          newdata : entity.dates,
                          roomName : roomName
                        }

                        // check and get the conflicted schedule data 
                        checkRoomSchedule(objEntity, function(checkresponse){

                          /* if response is null 
                                  new schedule is not conflicted with other schedules and it will update the schedule
                              else
                                response as conflicted schedule data */
                          if (checkresponse != null) {
                            if (checkresponse.msg) res.json({ status : false, error : checkresponse.msg });
                            else res.json({ status : false, error : 801, object : checkresponse });
                          } else {

                            // not conflict with exiting schedules, create new schedule
                            updateScheduleCallback(saveEntity, schedule, function(scherr, schData){
                              if (scherr) res.json({ status : false, error : scherr });
                              else if (schData) res.json({ status : true, data : schData, message : "Schedule updated successfully." });      
                              else res.json({ status : false, error : "Internal server error" });
                            });
                          }
                        });
                      } else {
                      
                        updateScheduleCallback(saveEntity, schedule, function(scherr, schData){
                          if (scherr) res.json({ status : false, error : scherr });
                          else if (schData) res.json({ status : true, data : schData, message : "Schedule updated successfully." });      
                          else res.json({ status : false, error : "Internal server error" });
                        });
                      }
                    });
                  } else if(validity == false) {

                    //code changed by - Najib, Desc- Relevent message in response based on businessType
                    let roomType = null;
                    if(person.profile.companyid && person.profile.companyid.businessType && person.profile.companyid.businessType == 'LMS') {
                      roomType = "Course";
                    } else {
                      roomType = "Room";
                    }
                    res.json({ status : false, error : "Your" + ' ' + roomType + ' ' + "will be expired before this schedule" });
                  } else {
                    res.json({ status : false, error : validity });
                  }
                });
              } else {
                res.json({ status : false, error : newError });
              }
            });
          } else {
            res.json({ status : false, error : "Invalid schedule." });
          }
        });
      } else res.json({ status : false, error : "Invalid request." });
    } catch(e) {
      console.log("e in updateSchedule === ",e);
      res.json({ status : false, error : "Internal server error." });
    }
  });
}

export function updateSlotScheule(req, res) {
  let header = req.headers;

  // Varifying request is valid or not
  checkValidRequest(header, function(person){
    try{
      if (person != null && req.body.data && req.body.data._id && mongoose.Types.ObjectId.isValid(req.body.data._id) && req.params.id && mongoose.Types.ObjectId.isValid(req.params.id)) {
        let obj = req.body.data;
        let checkschedule = Schedule.findOne({ _id : req.params.id, "dates._id" : obj._id}, {"dates.$._id" : 1, meetingName : 1, createdBy  : 1, roomId : 1, startDate : 1, endDate : 1})
                            .populate('roomId', 'roomName');
        checkschedule.exec( function(scherr, schedule) {
          if (schedule) {
            if (schedule.createdBy._str == person._id._str) {
              let updateEntity = {
                id : req.params.id,
                uid : person._id,
                email : person.email,
                role : person.role,
                roomId : schedule.roomId._id,
                firstname : person.firstname,
                starttime : schedule.dates[0].startTime,
                endtime : schedule.dates[0].endTime,
                startTime : obj.startTime,
                endTime : obj.endTime,
                slotId : obj._id,
                meetingName : schedule.meetingName,
                roomName : schedule.roomId.roomName
              };
              updateEntity['lastname'] = person.lastname ? person.lastname : null;
              if (obj.endTime > schedule.endDate) {
                let checkValidityData = {
                  roomid : schedule.roomId,
                  date : obj.endTime
                };

                // check the current room expire date validity with schdule date 
                checkRoomValidity(checkValidityData, function(validity, roomName){
              
                  /* if response true
                      schedule date before the expire date of the room package 
                    else
                      schedule date After the expire date of the room package */
                  if (validity == true) {
                    let schedule_selector = {
                      _id : { $ne : req.params.id},
                      roomId : schedule.roomId, 
                      startDate : { $lte : obj.endTime }, 
                      endDate : { $gte : obj.startTime }
                    };
                    updateEntity['endDate'] = obj.endTime;

                    let checkroomsch = Schedule.find(schedule_selector);
                    checkroomsch.exec(function(roomerror, roomSchedules){
                      if (roomerror) {
                        res.json({ status : false, error : roomerror });
                      } else if(roomSchedules && roomSchedules.length > 0){
                        let objEntity = {
                          data : roomSchedules,
                          newdata : [obj],
                          roomName : schedule.roomId.roomName
                        }

                        // check and get the conflicted schedule data 
                        checkRoomSchedule(objEntity, function(checkresponse){

                          /* if response is null 
                                  new schedule is not conflicted with other schedules and it will update the schedule
                              else
                                response as conflicted schedule data */
                          if (checkresponse != null) {
                            if (checkresponse.msg) res.json({ status : false, error : checkresponse.msg });
                            else res.json({ status : false, error : 801, object : checkresponse });
                          } else {

                            // not conflict with exiting schedules, create new schedule
                            updateSlotScheduleCallback(updateEntity, function(scherr, schres){
                              if (scherr != null) res.json({ status : false, error : scherr });
                              else res.json({ status : true, message : "Schedule updated successfully." });      
                            });
                          }
                        });
                      } else {
                        
                        // not conflict with exiting schedules, create new schedule
                        updateSlotScheduleCallback(updateEntity, function(scherr, schres){
                          if (scherr != null) res.json({ status : false, error : scherr });
                          else res.json({ status : true, message : "Schedule updated successfully." });      
                        });
                      }
                    });
                  } else if(validity == false) {
                    res.json({ status : false, error : "Your room will be expired before this schedule" });
                  } else {
                    res.json({ status : false, error : validity });
                  }
                });
              } else {
                let schedule_selector = {
                  _id : { $ne : req.params.id},
                  roomId : schedule.roomId, 
                  startDate : { $lte : schedule.endDate }, 
                  endDate : { $gte : obj.startTime }
                };

                let checkroomsch = Schedule.find(schedule_selector);
                checkroomsch.exec(function(roomerror, roomSchedules){
                  if (roomerror) {
                    res.json({ status : false, error : roomerror });
                  } else if(roomSchedules && roomSchedules.length > 0){
                    let objEntity = {
                      data : roomSchedules,
                      newdata : [obj],
                      roomName : schedule.roomId.roomName
                    }

                    // check and get the conflicted schedule data 
                    checkRoomSchedule(objEntity, function(checkresponse){

                      /* if response is null 
                              new schedule is not conflicted with other schedules and it will update the schedule
                          else
                            response as conflicted schedule data */
                      if (checkresponse != null) {
                        if (checkresponse.msg) res.json({ status : false, error : checkresponse.msg });
                        else res.json({ status : false, error : 801, object : checkresponse });
                      } else {

                        // not conflict with exiting schedules, create new schedule
                        updateSlotScheduleCallback(updateEntity, function(scherr, schres){
                          if (scherr != null) res.json({ status : false, error : scherr });
                          else res.json({ status : true, message : "Schedule updated successfully." });      
                        });
                      }
                    });
                  } else {
                    // not conflict with exiting schedules, create new schedule
                    updateSlotScheduleCallback(updateEntity, function(scherr, schres){
                      if (scherr != null) res.json({ status : false, error : scherr });
                      else res.json({ status : true, message : "Schedule updated successfully." });      
                    });
                  }
                });
              }
            } else {
              res.json({ status : false, error : "Access denied." });  
            }
          } else {
            res.json({ status : false, error : "Invalid schedule." });
          }
        });

      } else res.json({ status : false, error : "Invalid request." });
    } catch(e) {
      console.log("e in updateSlotScheule === ",e);
      res.json({ status : false, error : "Internal server error." });
    }
  });
}

/**
* @Function Name: "getScheduleDates",
* @Purpose: "To fetch scheduled dates.",
* @Request Object: {},
* @Response Object: Success- {dates : [Date]}, Failure- {dates : null},
* @Author: "Prudhvi"
* done with recurring
*/
export function getScheduleDates(req, res){
  
  let header = req.headers;

  // Varifying request is valid or not
  checkValidRequest(header, function(person){
    try{

      //code added by - Najib, Desc - Checking company Id is set or not as per change made in "checkValidRequest"
      if (person != null) {

        let objEntity = {
          role : person.role,
          cid : person.profile.companyid && person.profile.companyid._id ? person.profile.companyid._id : '',
          uid: person._id
        }

        // get selector for fetch room based on role 
        fetchRoomSelector(objEntity, function(selector, instructorIds){
          if (selector != null) {
            var roomQuery = Room.find(selector);
            roomQuery.lean().exec(function (roomerr, roomdoc) {
              if (roomerr) res.json({ dates : null });
              else if (roomdoc && roomdoc.length > 0) {
                let roomIds = [];
                _.forIn(roomdoc, function(value, key) {
                  roomIds.push(mongoose.Types.ObjectId(value._id));
                });
                let query = Schedule.aggregate([
                  {$project : { "dates" : 1,
                        "roomId": 1,
                         "createdBy":1
                        }},
                  {$match: {"roomId": {$in: roomIds}}},
                  {$unwind: '$dates'}
                  ]);
                query.exec( function(err, doc){
                  if (err) res.json({ dates : null });
                  if (doc && doc.length > 0) {
                    if (person.role == Roles.Student) {
                      let student_dates = [];
                      let  count = doc.length;
                      function processDates() {
                        let item = doc[count - 1];
                        if (item && item.createdBy && _.findIndex(instructorIds, function(o) { return o.instructor = item.createdBy } ) > -1 && item && item.dates) {
                          student_dates.push(item.dates.startTime);
                        }
                        count= count-1;
                        if(count > 0){
                          processDates();
                        } else {
                          // done
                          res.json({ dates : student_dates });
                        }
                      }
                      processDates();
                    } else {

                      // pass all schedule dates in an array format
                      var user_dates = [];
                      let  count = doc.length;
                      function processDates() {
                        let item = doc[count - 1];
                        if (item && item.dates) {
                          user_dates.push(item.dates.startTime);
                        }
                        count= count-1;
                        if(count > 0){
                          processDates();
                        } else {
                          // done
                          res.json({ dates : user_dates });
                        }
                      }
                      processDates();
                    }
                  } else {
                    res.json({ dates : null });
                  }
                });
              } else res.json({ dates : null });
            });
          } else  res.json({ dates : null });
        });
      } else res.json({ status : false, error : "Invalid request." });
    } catch(e) {
      console.log("e in getScheduleDates === ", e);
      res.json({ status : false, error : "Internal server error." });
    }
  });
  
}

/**
* @Function Name: "getCurrentDateSchedules",
* @Purpose: "To fetch selected date schedule.",
* @Request Object: params : { startDate , endDate},
* @Response Object: Success- {status : true, data : "date_schedules"}, Failure- {status : false, error},
* @Author: "Prudhvi"
* done with recurring
*/
export function getCurrentDateSchedules(req, res){
  let header = req.headers;

  // Varifying request is valid or not
  checkValidRequest(header, function(person){
    try{
      if (person != null && req.params.startDate && req.params.endDate ) {
        let obj = req.params;

        //code added by - Najib, Desc - Checking company Id is set or not as per change made in "checkValidRequest"
        let objEntity = {
          uid : person._id,
          start : Number(obj.startDate),
          end : Number(obj.endDate),
          role : person.role,
          cid : person.profile.companyid && person.profile.companyid._id ? person.profile.companyid._id : '',
        };

        // get current date schedules 
        getDateSchedules(objEntity, function(error, schData){
          if (error) {
            console.log("error ==== ",error);
            res.json({ status : false, error : error });
          } else if (schData) res.json({ status : true, data : schData });
          else res.json({ status : false, error : "Internal server error." }); 
        });
      } else res.json({ status : false, error : "Invalid request." });
    } catch(e) {
      console.log("e in getCurrentDateSchedules === ", e);
      res.json({ status : false, error : "Internal server error." });
    }
  });
  
}

/*export function getScheduleEvents(req, res) {
  let header = req.headers;

  // Varifying request is valid or not
  checkValidRequest(header, function(person){
    try{
      if (person != null && req.params.startDate && req.params.endDate ) {
        let obj = req.params;
        let objEntity = {
          uid : person._id,
          start : Number(obj.startDate),
          end : Number(obj.endDate),
          role : person.role,
          cid : person.profile.companyid
        };

        // get current date schedules 
        getDateSchedules(objEntity, function(error, schData){
          if (error) {
            console.log("error ==== ",error);
            res.json({ status : false, error : error });
          } else if (schData) res.json({ status : true, data : schData });
          else res.json({ status : false, error : "Internal server error." }); 
        });

      } else res.json({ status : false, error : "Invalid request." });
    } catch(e) {
      console.log("e in getScheduleEvents === ", e);
      res.json({ status : false, error : "Internal server error." });
    }
  });
};
*/
/**
* @Function Name: "getPastSchedules",
* @Purpose: "To fetch selected date schedule.",
* @Request Object: params : { currentDate : "Date"},
* @Response Object: Success- {status : true, data : "date_schedules"}, Failure- {status : false, error},
* @Author: "Prudhvi"
* done with recurring
*/
export function getPastSchedules(req, res){
  let header = req.headers;

  // Varifying request is valid or not
  checkValidRequest(header, function(person){
    try{
      if (person != null && req.params.currentDate) {

        //code added by - Najib, Desc - Checking company Id is set or not as per change made in "checkValidRequest"
        // let obj = req.query;
        let objEntity = {
          uid : person._id,
          role : person.role,
          cid : person.profile.companyid && person.profile.companyid._id ? person.profile.companyid._id : '',
        };
        fetchRoomSelector(objEntity, function(selector, instructorIds){
          if (selector) {
            var roomQuery = Room.find(selector);
            roomQuery.exec(function (roomerr, roomdoc) {
              if (roomerr) res.json({ status : false, error : roomerr });
              if (roomdoc) {
                let roomIds = [];
                let start = moment(req.params.currentDate, 'x').utc().toDate();
                _.forIn(roomdoc, function(value, key) {
                  roomIds.push(mongoose.Types.ObjectId(value._id));
                });

                Schedule.aggregate([
                    { $unwind: "$dates" },
                    { $match: { 
                      'dates.startTime' : {
                        $lt : Number(req.params.currentDate)
                      }, roomId : { $in : roomIds }
                    } },
                    { $limit : 30 },
                    { $sort : { 'dates.startTime' : 1 } }
                ], function(err, doc){
                  if (err) {
                    console.log("err in past schedule === ",err);
                    res.json({ status : false, error : err });
                  } else if (doc && doc.length > 0){
                    let mySchedule = [];
                    var  count = doc.length;
                    function processPast() {
                      let item = doc[count - 1];
                      Users.findOne({ _id : item.createdBy}, {firstname : 1, profile : 1}, function(usererr, user) {
                        if (user) {
                          item['createdBy'] = user;
                          Room.findOne({ _id : item.roomId}, {roomKey : 1, roomName : 1}, function(roomerr, room) {
                            if (room) {
                              item['roomId'] = room;
                              if (person.role == Roles.Student) {
                                if (item.createdBy && _.findIndex(instructorIds, function(o) { return o.instructor = item.createdBy._id } ) > -1 ) {
                                  mySchedule.push(item);
                                }
                              } else {
                                mySchedule.push(item);
                              }
                              count= count-1;
                              if(count > 0){
                                processPast();
                              } else {
                                // done
                                // console.log("mySchedule in past === ", mySchedule);
                                res.json({ status : true, data : mySchedule });
                              }
                            } else {
                              if(count > 0){
                                processPast();
                              } else {
                                res.json({ status : true, data : mySchedule });
                              }
                            }
                          });
                        } else {
                          if(count > 0){
                            processPast();
                          } else {
                            res.json({ status : true, data : mySchedule });
                          }
                        }
                      });
                    }
                    processPast();
                  } else {
                    res.json({ status : true, data : [] });
                  }
                });
              }
            });
          }else res.json({ status : false, error : "Internal server error" });
        });
      } else res.json({ status : false, error : "Invalid request." });
    } catch(e) {
      console.log("e in getPastSchedules === ", e);
      res.json({ status : false, error : "Internal server error." });
    }
  });
  
}

/**
* @Function Name: "deleteMyRecurringSchedule",
* @Purpose: "To dalete schedule.",
* @Request Object: obj : { uid : "userId", id : "schedule_id", scheduleid : "individual slot id", selectedDate : "Date"},
* @Response Object: Success- {status : true, data : "date_schedules", message}, Failure- {status : false, error},
* @Author: "Prudhvi"
*/
export function deleteMyRecurringSchedule(req, res){
  try{
    
    // Varifying request is valid or not
    checkValidRequest(req.headers, function(person){
      try{
        if (person != null && req.params.id && mongoose.Types.ObjectId.isValid(req.params.id) && req.params.date) {
          let schQuery = Schedule.findOne({ _id : req.params.id });
          schQuery.exec( function(scherr, schedule){
            if(schedule){
              if(person._id.str == schedule.createdBy.str){
                
                let lastname = person.lastname ? person.lastname : '';
                let d = Number(req.params.date);

                // check valid user or not to delete the schedule 
                let removeQuery = Schedule.update({ _id : req.params.id }, {$pull : {"dates" : { startTime : {$gte : d} } } }, { multi : true});
                removeQuery.exec(function( remerr, response){
                  if(remerr){
                    res.json({ status : false, error : "Internal server error." });
                  }else if(response){
                    // console.log("response === ",response);
                    res.json({ status : true, message : "Deleted successfully." });
                   
                   let createdBy = person.firstname + ' ' + person.lastname;
                    if (person.role == Roles.Instructor ) {
                        let instructorObj = {
                          instId : schedule.createdBy,
                          roomId : schedule.roomId,
                          subject : 'The Schedule Deleted',
                          userBody : 'The pre-scheduled class on '+'<b>' + schedule.meetingName + '</b> '+' has been successfully deleted by '+'<b>' + createdBy + '</b>'+'.',
                          operatorBody : 'The pre-scheduled class on '+'<b>' + schedule.meetingName + '</b> '+' has been successfully deleted by you.',
                          email : person.email,
                          message : 'The pre-scheduled meeting '+schedule.meetingName+' has been deleted successfully.'
                        };

                      sendInstructorSchEmail(instructorObj);
                    } else {
                      let schObj = {
                        roomId : schedule.roomId,
                        subject : 'The Schedule Deleted',
                        body : 'The pre-scheduled conference on '+'<b>' + schedule.meetingName + '</b> '+' has been successfully deleted by '+'<b>' + createdBy + '</b>'+'.',
                        createdBy : schedule.createdBy,
                        createdBody : 'The pre-scheduled conference on '+'<b>' + schedule.meetingName + '</b> '+' has been successfully deleted by '+'<b>' + 'you' + '</b>'+'.',
                        message : 'The pre-scheduled meeting '+schedule.meetingName+' has been deleted successfully.'
                      };
                      sendScheduleEmail(schObj);
                    }
                  }
                });
              }else{
                res.json({ status : false, error : "Access denied." });
              }
            }else{
              res.json({ status : false, error : "Invalid schedule." });
            }
          });
        } else res.json({ status : false, error : "Invalid request." });
      } catch(e) {
        console.log("e in deleteMyRecurringSchedule inner === ", e);
        res.json({ status : false, error : "Internal server error." });
      }
    });
  } catch(e) {
    console.log("e in deleteMyRecurringSchedule === ", e);
    res.json({ status : false, error : "Internal server error." });
  }
}



/**
* @Function Name: "deleteMySchedule",
* @Purpose: "To dalete schedule.",
* @Request Object: obj : { uid : "userId", id : "schedule_id", scheduleid : "individual slot id", selectedDate : "Date"},
* @Response Object: Success- {status : true, data : "date_schedules", message}, Failure- {status : false, error},
* @Author: "Prudhvi"
*/
export function deleteMySchedule(req, res){
  try{

    // Varifying request is valid or not
    checkValidRequest(req.headers, function(person){
      try{
        if (person != null && req.params.id && mongoose.Types.ObjectId.isValid(req.params.id) && req.params.scheduleid && mongoose.Types.ObjectId.isValid(req.params.scheduleid) ) {
          let schQuery = Schedule.findOne({ _id : req.params.id, "dates._id" : req.params.scheduleid }, {"dates.$._id" : 1, meetingName : 1, createdBy : 1, roomId : 1});
          schQuery.exec( function(scherr, schedule){
            if(schedule){
              if(person._id.str == schedule.createdBy.str){
                
                let lastname = person.lastname ? person.lastname : '';
                // check valid user or not to delete the schedule 
                let removeQuery = Schedule.update({ _id : req.params.id }, {$pull : {"dates" : { _id : req.params.scheduleid}}}, { multi : true});
                removeQuery.exec(function( remerr, response){
                  if(remerr){
                    res.json({ status : false, error : "Internal server error." });
                  }else if(response){
                    // console.log("response === ",response);
                    res.json({ status : true, message : "Deleted successfully." });
                   
                   let createdBy = person.firstname + ' ' + person.lastname;
                    if (person.role == Roles.Instructor ) {
                        let instructorObj = {
                          instId : schedule.createdBy,
                          roomId : schedule.roomId,
                          subject : 'The Schedule Deleted',
                          userBody : 'The pre-scheduled class on '+'<b>' + schedule.meetingName + '</b> '+' has been successfully deleted by '+'<b>' + createdBy + '</b>'+'.',
                          operatorBody : 'The pre-scheduled class on '+'<b>' + schedule.meetingName + '</b> '+' has been successfully deleted by you.',
                          email : person.email,
                          message : 'The pre-scheduled meeting '+schedule.meetingName+' has been  deleted successfully.'
                        };

                      sendInstructorSchEmail(instructorObj);
                    } else {
                      let schObj = {
                        roomId : schedule.roomId,
                        subject : 'The Schedule Deleted',
                        body : 'The pre-scheduled conference on '+'<b>' + schedule.meetingName + '</b> '+' has been successfully deleted by '+'<b>' + createdBy + '</b>'+'.',
                        createdBy : schedule.createdBy,
                        createdBody : 'The pre-scheduled conference on '+'<b>' + schedule.meetingName + '</b> '+' has been successfully deleted by '+'<b>' + 'you' + '</b>'+'.',
                        message : 'The pre-scheduled meeting '+schedule.meetingName+' has been deleted successfully.'
                      };
                      sendScheduleEmail(schObj);
                    }
                  }
                });
              }else{
                res.json({ status : false, error : "Access denied." });
              }
            }else{
              res.json({ status : false, error : "Invalid schedule." });
            }
          });
        } else res.json({ status : false, error : "Invalid request." });
      } catch(e) {
        console.log("e in deleteMySchedule inner === ", e);
        res.json({ status : false, error : "Internal server error." });
      }
    });
  } catch(e) {
    console.log("e in deleteMySchedule === ", e);
    res.json({ status : false, error : "Internal server error." });
  }
}

/**
* @Function Name: "getSchedule",
* @Purpose: "To fetch requested schedule.",
* @Request Object: obj : { uid : "userId", id : "schedule_id"},
* @Response Object: Success- {status : true, data : "schedule_record"}, Failure- {status : false, error},
* @Author: "Prudhvi"
*/
export function getSchedule(req, res){
  let header = req.headers;

  // Varifying request is valid or not
  checkValidRequest(header, function(person){
    try{
      if (person != null && req.params.id && mongoose.Types.ObjectId.isValid(req.params.id)) {
        let schQuery = Schedule.findOne({ _id : req.params.id });
        schQuery.exec( function(scherr, schedule){
          if(scherr){
            res.json({ status : false, error : "Invalid schedule." });
          } else if(schedule){
            res.json({ status : true, data : schedule });
          } else res.json({ status : true, error : "Invalid schedule" });
        });
      } else res.json({ status : false, error : "Invalid request." });
    } catch(e) {
      console.log("e in getSchedule === ", e);
      res.json({ status : false, error : "Internal server error." });
    }
  });
}

/* ---------------  callback functions -------------------- */

/**
* @Function Name: "executeRoomQuery",
* @Purpose: "execute the query, update roomkey.",
* @Request Object: query, cb
* @Response Object: Success- {null, docs, ids }, Failure- {error, null, null},
* @Author: "Prudhvi"
*/
export function executeRoomQuery(query, cb){
  try{
    query.lean().exec(function (err, doc) {
      if (err) cb(err, null, null);
      else if(doc){
        let ids = [];
        _.each(doc, function(data){
          ids.push(data._id);
        });
        cb(null, doc, ids);
      }
    });
  } catch(e) {
    console.log("e in executeRoomQuery === ",e);
    cb("Internal server error", null, null);
  }
}

/**
* @Function Name: "getTopics",
* @Purpose: "fetch topics data.",
* @Request Object: roomids, cb,
* @Response Object: Success- {topics }, Failure- {null},
* @Author: "Prudhvi"
*/
export function getTopics(roomids, roomdata, cb){
  try{  
    let query = Topic.find({ roomId : {$in : roomids }, topicEnable : true}).select('roomId topicName');
    query.exec( function(error, doc){
      if(doc){
        let topics = {};
        for (let i in roomdata) {
          let features = roomdata[i] && roomdata[i].selPackage && roomdata[i].selPackage.features ? roomdata[i].selPackage.features : [];
          if (features.indexOf("Topics") == -1) {
            let id = roomdata[i]._id;
            topics[id] = false;
          }
        }
        for(let i in doc) {
          let data = doc[i];
          if (topics[data.roomId] != false || topics[data.roomId] == undefined) {
            if (topics[data.roomId])
              topics[data.roomId].push(data);
            else
              topics[data.roomId] = [data];
          }
        } 
        cb(topics);
      } else cb(null);
    });
  } catch(e) {
    console.log("e in getTopics === ",e);
    cb(null);
  }   
}
/**
* @Function Name: "checkRoomSchedule",
* @Purpose: "To check new schedule is conflict with previous schedules.",
* @Request Object: obj : { data : "roomSchedules", startTime : "new_startTime", endTime : "new_endTime", roomId : "roomId"},
* @Response Object: Success- null, Failure- Confilcted schedule Data {roomName, startTime, endTime},
* @Author: "Prudhvi"
*/
export function checkRoomSchedule(obj, cb){
  try{
    let resObject = null;
        
    // check the new schedule time with db schedule time 
    cond1:
    for (let i in obj.data) {
      let record = obj.data[i];
      cond2:
      for (let j in record.dates) {
        let current = record.dates[j];
        let index = _.findIndex(obj.newdata, function(o) { return (o.startTime >= current.startTime && o.startTime <= current.endTime) || (o.endTime >= current.startTime && o.endTime <= current.endTime); });
        
        if (index > -1) {
          resObject = {
            meetingName : record.meetingName,
            roomName : obj.roomName,
            startTime : current.startTime,
            endTime : current.endTime
          }
          break cond1;
        }
      }
    }
    cb(resObject);
  } catch(e){
    console.log("e in checkRoomSchedule === ",e);
    cb({msg : "Internal server error"});
  }
}

function setEntity(obj, cb) {
  try {
    if (obj.recurring == true) {
      if (obj.type && obj.repeatDuration && (obj.endDate || (obj.endDateType && obj.no_of_occurence))) {
        if (obj.type == 'W' && (!obj.repeatOn || (obj.repeatOn && obj.repeatOn.length < 0))) {
          cb("Invalid Request", null);
        } else {
          let pattern = getPattern(obj);
          let datesentity = getPossibleDates(obj, pattern);
          if (datesentity.dates && datesentity.dates.length > 0){
            cb(null, datesentity);
          } else {
            cb("No possible dates for this schedule", null);
          }
        }
      } else {
        cb("Invalid Request", null);
      }
    } else {
      let dates = {
        startTime : obj.startDate,
        endTime : obj.endDate
      };
      let entity = {
        startDate : obj.startDate,
        endDate : obj.endDate,
        dates : [dates]
      }
      cb(null, entity);
    }
  } catch (e) {
    console.log('error in setEntity');
    cb('Internal server error',null);
  }
}

/**
* @Function Name: "updateSchedule",
* @Purpose: "To update existed schedule.",
* @Request Object: obj : "Client_Object, role, cid ="corporateId",
* @Response Object: Success- {null, data : "Selected date schedules"}, Failure- {error, null},
* @Author: "Prudhvi"
*/

function updateScheduleCallback(obj, schedule, cb) {
  try{
    // update schedule 
    let updatequery = Schedule.update({ _id : schedule._id },{$set : obj.entity});
    updatequery.exec( function(err, doc) {
      if (err) {
        console.log("err === ",err);
        cb(err, null);
      } else {
        let objEntity = {
          uid : obj.uid,
          start : obj.start,
          end : obj.end,
          role : obj.role,
          cid : obj.cid
        }

        // console.log("objEntity in save callback === ", objEntity);
        
        // get all schedules of selected date 
        getDateSchedules(objEntity, function(error, data){
          if (error) {
            console.log("error ==== ",error);
            cb(error, null);
          } else {
            cb(null, data);
            if (objEntity.role == Roles.Instructor ) {
              let instructorObj = {
                instId : schedule.createdBy,
                roomId : schedule.roomId,
                subject : 'The Schedule Updated',
                userBody : 'The class on '+'<b>' + schedule.meetingName + '</b>'+' has been updated from '+'<b>' +  moment(schedule.startDate).utc().format('DD-MM-YYYY hh:mm A') + '</b>(UTC)<b> - ' + moment(schedule.endDate).utc().format('DD-MM-YYYY hh:mm A') + '</b>(UTC) to <b>' +  moment(obj.entity.startDate).utc().format('DD-MM-YYYY hh:mm A') + '</b>(UTC)<b> - ' + moment(obj.entity.endDate).utc().format('DD-MM-YYYY hh:mm A') + '</b>(UTC) by <b>' + obj.fullname + '</b>.',
                operatorBody : 'The class on '+'<b>' + schedule.meetingName + '</b>'+' has been updated from '+'<b>' +  moment(schedule.startDate).utc().format('DD-MM-YYYY hh:mm A') + '</b>(UTC)<b> - ' + moment(schedule.endDate).utc().format('DD-MM-YYYY hh:mm A') + '</b>(UTC) to <b>' +  moment(obj.entity.startDate).utc().format('DD-MM-YYYY hh:mm A') + '</b>(UTC)<b> - ' + moment(obj.entity.endDate).utc().format('DD-MM-YYYY hh:mm A') + '</b>(UTC)<b> by you.',
                email : obj.email,
                message :'The class '+schedule.meetingName+' has been updated to Course '+ obj.roomName +' at ' +moment(obj.entity.startDate).utc().format('DD-MM-YYYY hh:mm A')+'(UTC) -  to '+moment(obj.entity.endDate).utc().format('DD-MM-YYYY hh:mm A') + '(UTC).'
              };
              if (obj.entity && obj.entity.pattern) {
                instructorObj["message"] = 'The class '+schedule.meetingName+' has been updated to Course '+ obj.roomName+'  from ' +moment(obj.entity.startDate).utc().format('DD-MM-YYYY')+' to '+moment(obj.entity.endDate).utc().format('DD-MM-YYYY') + ' :: ' +moment(obj.entity.startDate).utc().format('hh:mm A')+ ' - ' + moment(obj.entity.endDate).utc().format('hh:mm A')+ ' ('+ serverConfig.mail_timezone.code +').';
              }
              if (serverConfig.mail_timezone && serverConfig.mail_timezone.zone) {
                instructorObj["userBody"] = 'The class on '+'<b>' + schedule.meetingName + '</b>'+' has been updated from '+'<b>' +  moment(schedule.startDate).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A') + '</b>('+ serverConfig.mail_timezone.code +')<b> - ' + moment(schedule.endDate).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A') + '</b>('+ serverConfig.mail_timezone.code +') to <b>' +  moment(obj.entity.startDate).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A') + '</b>('+ serverConfig.mail_timezone.code +')<b> - ' + moment(obj.entity.endDate).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A') + '</b>('+ serverConfig.mail_timezone.code +') by <b>' + obj.fullname + '</b>.',
                instructorObj["operatorBody"] = 'The class on '+'<b>' + schedule.meetingName + '</b>'+' has been updated from '+'<b>' +  moment(schedule.startDate).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A') + '</b>('+ serverConfig.mail_timezone.code +')<b> - ' + moment(schedule.endDate).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A') + '</b>('+ serverConfig.mail_timezone.code +') to <b>' +  moment(obj.entity.startDate).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A') + '</b>('+ serverConfig.mail_timezone.code +')<b> - ' + moment(obj.entity.endDate).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A') + '</b>('+ serverConfig.mail_timezone.code +')<b> by you.';
                instructorObj["message"] = 'The class '+schedule.meetingName+' has been updated to Room '+ obj.roomName +' at ' +moment(obj.entity.startDate).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A')+'('+serverConfig.mail_timezone.code +') to '+moment(obj.entity.endDate).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A') + '('+ serverConfig.mail_timezone.code +').';
                if (obj.entity && obj.entity.pattern) {
                  instructorObj["message"] = 'The class '+schedule.meetingName+' has been updated to Course '+ obj.roomName+'  from ' +moment(obj.entity.startDate).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY')+' to '+moment(obj.entity.endDate).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY') + ' :: ' +moment(obj.entity.startDate).tz(serverConfig.mail_timezone.zone).format('hh:mm A')+ ' - ' + moment(obj.entity.endDate).tz(serverConfig.mail_timezone.zone).format('hh:mm A')+ ' ('+ serverConfig.mail_timezone.code +').';
                }
              }
              sendInstructorSchEmail(instructorObj);
            } else {
              let schObj = {
                roomId : schedule.roomId,
                subject : 'The Schedule Updated',
                body : 'The conference on '+'<b>' + schedule.meetingName + '</b>'+' has been updated at '+'<b>' +  moment(schedule.startDate).utc().format('DD-MM-YYYY hh:mm A') + '</b>(UTC)<b> - ' + moment(schedule.endDate).utc().format('DD-MM-YYYY hh:mm A') + '</b>(UTC) to <b>' +  moment(obj.entity.startDate).utc().format('DD-MM-YYYY hh:mm A') + '</b>(UTC)<b> - ' + moment(obj.entity.endDate).utc().format('DD-MM-YYYY hh:mm A') + '</b>(UTC) <b> by <b>' + obj.fullname + '</b>.',
                createdBy : schedule.createdBy,
                createdBody : 'The conference on '+'<b>' + schedule.meetingName + '</b>'+' has been updated at '+'<b>' +  moment(schedule.startDate).utc().format('DD-MM-YYYY hh:mm A') + '</b>(UTC)<b> - ' + moment(schedule.endDate).utc().format('DD-MM-YYYY hh:mm A') + '</b>(UTC) to <b>' +  moment(obj.entity.startDate).utc().format('DD-MM-YYYY hh:mm A') + '</b>(UTC)<b> - ' + moment(obj.entity.endDate).utc().format('DD-MM-YYYY hh:mm A') + '</b>(UTC) <b> by <b>' + 'you' + '</b>.',
                message :'The conference meeting '+schedule.meetingName+' has been updated to Room '+ obj.roomName +' at ' +moment(obj.entity.startDate).utc().format('DD-MM-YYYY hh:mm A')+'(UTC) - to '+moment(obj.entity.endDate).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A') + '(UTC).'
              };
              if (obj.entity && obj.entity.pattern) {
                schObj["message"] = 'The conference meeting '+schedule.meetingName+' has been updated to Room '+ obj.roomName+'  from ' +moment(obj.entity.startDate).utc().format('DD-MM-YYYY')+' to '+moment(obj.entity.endDate).utc().format('DD-MM-YYYY') + ' :: ' +moment(obj.entity.startDate).utc().format('hh:mm A')+ ' - ' + moment(obj.entity.endDate).utc().format('hh:mm A')+ ' ('+ serverConfig.mail_timezone.code +').';
              }
              if (serverConfig.mail_timezone && serverConfig.mail_timezone.zone) {
                schObj["body"] = 'The class on '+'<b>' + schedule.meetingName + '</b>'+' has been updated from '+'<b>' +  moment(schedule.startDate).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A') + '</b>('+ serverConfig.mail_timezone.code +')<b> - ' + moment(schedule.endDate).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A') + '</b>('+ serverConfig.mail_timezone.code +') to <b>' +  moment(obj.entity.startDate).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A') + '</b>('+ serverConfig.mail_timezone.code +')<b> - ' + moment(obj.entity.endDate).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A') + '</b>('+ serverConfig.mail_timezone.code +') by <b>' + obj.fullname + '</b>.';
                schObj["createdBody"] = 'The class on '+'<b>' + schedule.meetingName + '</b>'+' has been updated at '+'<b>' +  moment(schedule.startDate).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A') + '</b>('+ serverConfig.mail_timezone.code +')<b> - ' + moment(schedule.endDate).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A') + '</b>('+ serverConfig.mail_timezone.code +') to <b>' +  moment(obj.entity.startDate).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A') + '</b>('+ serverConfig.mail_timezone.code +')<b> - ' + moment(obj.entity.endDate).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A') + '</b>('+ serverConfig.mail_timezone.code +')<b> by you.';
                schObj["message"] = 'The conference meeting '+schedule.meetingName+' has been updated to Room '+ obj.roomName +' at ' +moment(obj.entity.startDate).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A')+'('+serverConfig.mail_timezone.code +') to '+moment(obj.entity.endDate).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A') + '('+ serverConfig.mail_timezone.code +').';
                if (obj.entity && obj.entity.pattern) {
                  schObj["message"] = 'The conference meeting '+schedule.meetingName+' has been updated to Course '+ obj.roomName+'  from ' +moment(obj.entity.startDate).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY')+' to '+moment(obj.entity.endDate).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY') + ' :: ' +moment(obj.entity.startDate).tz(serverConfig.mail_timezone.zone).format('hh:mm A')+ ' - ' + moment(obj.entity.endDate).tz(serverConfig.mail_timezone.zone).format('hh:mm A')+ ' ('+ serverConfig.mail_timezone.code +').';
                }
              }
              sendScheduleEmail(schObj);
            }
          }
        });
      }
    });
  } catch(e) {
    console.log("e in updateScheduleCallback === ", e);
    cb("Internal server error", null);
  }     
}

function updateSlotScheduleCallback (objEntity, cb) {
  try {
    let now = Number(moment().utc().format('x'));
    let setobj = {
      "modifiedBy" : objEntity.uid,
      "modifiedAt" : now,
      "dates.$.startTime" : objEntity.startTime,
      "dates.$.endTime" : objEntity.endTime
    };
    if (objEntity.endDate) {
      setobj['endDate'] = objEntity.endDate;
    }
    let removequery = Schedule.update({ _id : objEntity.id, "dates._id" : objEntity.slotId }, {$set : setobj}); 
    removequery.exec(function(removeerr, response){
      if(removeerr){
        console.log("updateerr === ", removeerr);
        cb(removeerr, null);
      }else if(response){
        cb(null, response);
        /*Schedule.update({ _id : objEntity.id }, {$set : setobj}, 
          function(error, result2) {
            if (error)
              console.log("error in slot update === ",error);
          }
        );*/
        let createdBy = objEntity.firstname;
          createdBy += objEntity.lastname ? objEntity.lastname : '';
        if (objEntity.role == Roles.Instructor ) {
          let instructorObj = {
            instId : objEntity.uid,
            roomId : objEntity.roomId,
            subject : 'Schedule Updated',
            userBody : 'The class on '+'<b>' + objEntity.meetingName + '</b>' + ' scheduling has been updated at '+ '<b>' + moment(objEntity.starttime, 'x').utc().format('DD-MM-YYYY hh:mm A') + '</b>(UTC)<b> - ' + moment(objEntity.endtime, 'x').utc().format('DD-MM-YYYY hh:mm A') + '</b>(UTC)' +' to ' + '<b>' + moment(objEntity.startTime).utc().format('DD-MM-YYYY hh:mm A') + '</b>(UTC)<b> - ' + moment(objEntity.endTime).utc().format('DD-MM-YYYY hh:mm A') + '</b>(UTC)' +' by '+ '<b>' + createdBy+ '</b>'+'.',
            operatorBody :  'The class on '+'<b>' + objEntity.meetingName + '</b>' + ' scheduling has been successfully updated at '+ '<b>' + moment(objEntity.starttime, 'x').utc().format('DD-MM-YYYY hh:mm A') + '</b>(UTC)<b> - ' + moment(objEntity.endtime, 'x').utc().format('DD-MM-YYYY hh:mm A') + '</b>(UTC)' +' to ' + '<b>' + moment(objEntity.startTime).utc().format('DD-MM-YYYY hh:mm A') + '</b>(UTC)<b> - ' + moment(objEntity.endTime).utc().format('DD-MM-YYYY hh:mm A') + '</b>(UTC)'+' by you.',
            email : objEntity.email,
            message :'The conference meeting '+objEntity.meetingName+' has been updated to Room '+ objEntity.roomName +' at ' +moment(objEntity.startTime,'x').utc().format('DD-MM-YYYY hh:mm A')+'(UTC) to '+moment(objEntity.endTime,'x').utc().format('DD-MM-YYYY hh:mm A') + '(UTC).'

          };
          if (serverConfig.mail_timezone && serverConfig.mail_timezone.zone) {
                instructorObj["userBody"] =  'The class on '+'<b>' + objEntity.meetingName + '</b>' + ' scheduling has been updated at '+ '<b>' + moment(objEntity.starttime).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A') + '('+serverConfig.mail_timezone.code +')' + moment(objEntity.endtime).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A') + '</b>('+serverConfig.mail_timezone.code +')' +' to ' + '<b>' + moment(objEntity.startTime).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A') + '</b>('+serverConfig.mail_timezone.code +')<b> - ' + moment(objEntity.endTime).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A') + '</b>('+serverConfig.mail_timezone.code +')' +' by '+ '<b>' + createdBy+ '</b>'+'.';
                instructorObj["operatorBody"] = 'The class on '+'<b>' + objEntity.meetingName + '</b>' + ' scheduling has been successfully updated at '+ '<b>' + moment(objEntity.starttime, 'x').tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A') + '</b>('+serverConfig.mail_timezone.code +')<b> - ' + moment(objEntity.endtime, 'x').tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A') + '</b>('+serverConfig.mail_timezone.code +')' +' to ' + '<b>' + moment(objEntity.startTime).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A') + '</b>('+serverConfig.mail_timezone.code +')<b> - ' + moment(objEntity.endTime).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A') + '</b>('+serverConfig.mail_timezone.code +')'+' by you.';
                instructorObj["message"] = 'The class '+objEntity.meetingName+' has been updated to Room '+ objEntity.roomName +' at ' +moment(objEntity.startTime).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A')+'('+serverConfig.mail_timezone.code +') to '+moment(objEntity.endTime).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A') + '('+ serverConfig.mail_timezone.code +').';
          }
          sendInstructorSchEmail(instructorObj);
        } else {
          let schObj = {
            roomId : objEntity.roomId,
            subject : 'The Schedule Updated',
            body : 'The conference on '+'<b>' + objEntity.meetingName + '</b>' + ' scheduling has been updated at '+ '<b>' + moment(objEntity.starttime, 'x').utc().format('DD-MM-YYYY hh:mm A') + '</b>(UTC)<b> - ' + moment(objEntity.endtime).utc().format('DD-MM-YYYY hh:mm A') + '</b>(UTC)<b>' +' to ' + '<b>' + moment(objEntity.startTime, 'x').utc().format('DD-MM-YYYY hh:mm A') + '</b>(UTC)<b> - ' + moment(objEntity.endTime, 'x').utc().format('DD-MM-YYYY hh:mm A') +'</b>(UTC)' + ' by '+ '<b>' + createdBy+ '</b>'+'.',
            createdBy  : objEntity.uid,
            createdBody : 'The conference on '+'<b>' + objEntity.meetingName + '</b>' + ' scheduling has been updated at '+ '<b>' + moment(objEntity.starttime, 'x').utc().format('DD-MM-YYYY hh:mm A') + '</b>(UTC)<b> - ' + moment(objEntity.endtime).utc().format('DD-MM-YYYY hh:mm A') + '</b>(UTC)<b>' +' to ' + '<b>' + moment(objEntity.startTime, 'x').utc().format('DD-MM-YYYY hh:mm A') + '</b>(UTC)<b> - ' + moment(objEntity.endTime, 'x').utc().format('DD-MM-YYYY hh:mm A') +'</b>(UTC)' + ' by '+ '<b>' + 'you'+ '</b>'+'.',
            message :'The conference meeting '+objEntity.meetingName+' has been updated to Room '+ objEntity.roomName +' at ' +moment(objEntity.startTime,'x').utc().format('DD-MM-YYYY hh:mm A')+'(UTC) to '+moment(objEntity.endTime).utc().format('DD-MM-YYYY hh:mm A') + '(UTC).'
          };
          if (serverConfig.mail_timezone && serverConfig.mail_timezone.zone) {
                schObj["body"] =  'The class on '+'<b>' + objEntity.meetingName + '</b>' + ' scheduling has been updated at '+ '<b>' + moment(objEntity.starttime).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A') + '('+serverConfig.mail_timezone.code +')' + moment(objEntity.endtime).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A') + '</b>('+serverConfig.mail_timezone.code +')' +' to ' + '<b>' + moment(objEntity.startTime).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A') + '</b>('+serverConfig.mail_timezone.code +')<b> - ' + moment(objEntity.endTime).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A') + '</b>('+serverConfig.mail_timezone.code +')' +' by '+ '<b>' + createdBy+ '</b>'+'.';
                schObj["createdBody"] = 'The class on '+'<b>' + objEntity.meetingName + '</b>' + ' scheduling has been successfully updated at '+ '<b>' + moment(objEntity.starttime, 'x').tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A') + '</b>('+serverConfig.mail_timezone.code +')<b> - ' + moment(objEntity.endtime, 'x').tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A') + '</b>('+serverConfig.mail_timezone.code +')' +' to ' + '<b>' + moment(objEntity.startTime).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A') + '</b>('+serverConfig.mail_timezone.code +')<b> - ' + moment(objEntity.endTime).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A') + '</b>('+serverConfig.mail_timezone.code +')'+' by you.';
                schObj["message"] = 'The class '+objEntity.meetingName+' has been updated to Room '+ objEntity.roomName +' at ' +moment(objEntity.startTime).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A')+'('+serverConfig.mail_timezone.code +') to '+moment(objEntity.endTime).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A') + '('+ serverConfig.mail_timezone.code +').';
          }
          sendScheduleEmail(schObj);
        }
      }
    });
  } catch(e) {
    console.log("e in updateSlotScheduleCallback === ", e);
    cb("Internal server error, Please try again", null);
  }
}

export function sendScheduleMobileNotification(message, sentBy, sentTo) {
  Users.findOne({ _id : sentTo }, function(err, user) {
    if (user && user.deviceType == 'ANDROID' && user.deviceId != "") {
      sendPushNotificationAndroid("SCHEDULE", message, user.deviceId, sentBy, sentTo);
    }
  });
}

export function sendInstructorSchEmail(obj){
  Student.findOne({
    "instId" : obj.instId, 
    "roomId": mongoose.Types.ObjectId(obj.roomId)
  })
    .select('students')
    .populate('students','email') 
    .exec(function(err, doc){

    if (err){ 
      res.json({ 
        status: false, 
        error : err.message, 
        message : "Error while retriving students data." 
      });
    } else if (doc && doc.students && doc.students.length > 0) {
      let emailData = [];
      for(let i = 0; i < doc.students.length; i++) {
        emailData.push(doc.students[i].email);
        sendScheduleMobileNotification(obj.message, obj.instId, doc.students[i]._id);
      } 

      let exchangeData = {
        to : emailData,
        subject : obj.subject,
        body : obj.userBody,
        descreption : 'Ignore mail if not relevant.'
      };

      // Note : Commented for temporary bases for sending email notification to students under instructor 
      // when Create Schedule, Update Schedule and Delete Schedule
     
      // EmailForUserCreation.defaultUserMail(exchangeData, function(emailerror, emailsuccess) {
      //   //console.log(emailerror.status)
      //   if (emailerror.status == false) {
      //     console.log("Email not sent");
      //     } else {
      //     //console.log('email sent')
      //   }
      // });
    
      let myMailData = {
        to : obj.email,
        subject : obj.subject,
        body : obj.operatorBody,
        descreption : 'Ignore mail if not relevant.'
      };

      // Note : Commented for temporary bases for sending email notification to instructor 
      // when Create Schedule, Update Schedule, Delete Schedule, Create Assignment, 
      // Update Assignment, Delete Assignment, Craete Questionarie, Update Questionarie, 
      // Delete Questionarie
      
      // EmailForUserCreation.defaultUserMail(myMailData, function(emailerror, emailsuccess) {
      //   //console.log(emailerror.status)
      //   if (emailerror.status == false) {
      //     console.log("Email not sent");
      //   } else {
      //     //console.log('email sent')
      //   }
      // });
    }
  });
}

export function sendScheduleEmail (obj) {
  try {
    let query = Room.findOne({ 
          _id : mongoose.Types.ObjectId(obj.roomId) 
        });
    query.populate('users', 'email role')
    .exec(function (err, doc) {
        if (err){ 
          res.json({ 
            status: false, 
            error : err.message, 
            message : "Error while retriving room data." 
          });
        } else if (doc) {
          let emailData = [];
          let exchangeData = {
            subject : obj.subject,
            body : obj.body,
            descreption : 'Ignore mail if not relevant.'
          };
          for(let i = 0; i < doc.users.length; i++) {      
            var docId = doc.users[i]._id;
            if(obj.createdBy && obj.createdBy._str == docId._str) {
              let createdByUserData = {
                to : doc.users[i].email,
                subject : obj.subject,
                body : obj.createdBody,
                descreption : 'Ignore mail if not relevant.'
              };
                      
              
              // EmailForUserCreation.defaultUserMail(createdByUserData, function(emailerror, emailsuccess) {
              //   if (emailerror.status == false) {
              //     console.log("Email not sent");
              //     } else {
              //     //console.log('email sent')
              //   }
              // });

            } else {
              exchangeData['body'] = obj.body;
              emailData.push(doc.users[i].email);
              sendScheduleMobileNotification(obj.message, obj.createdBy, doc.users[i]._id);
            }
            let studentMails = [];
            if (doc.users[i].role == Roles.Instructor) {
              let studentquery = Student.findOne({instId : doc.users[i]._id, roomId : obj.roomId }).populate('students', 'email');
              studentquery.lean().exec( function(studenterr, studentData){
                if (studentData) {
                  _.each(studentData.students, function(student) {
                    studentMails.push(student.email);
                    sendScheduleMobileNotification(obj.message, obj.createdBy, student._id);
                  });
                }
                //console.log('studentMails', studentMails)
                let studentObjData = {
                  to : studentMails,
                  subject : obj.subject,
                  body : obj.body,
                  descreption : 'Ignore mail if not relevant.'
                }            
                // Note : Commented for temporary bases for sending email notification to all students under the instructor
                // when Create Schedule, Update Schedule, Delete Schedule, Create Assignment, 
                // Update Assignment, Delete Assignment, Craete Questionarie, Update Questionarie, 
                // Delete Questionarie

                // EmailForUserCreation.defaultUserMail(studentObjData, function(emailerror, emailsuccess) {
                //   //console.log(emailerror.status)
                //   if (emailerror.status == false) {
                //     console.log("Email not sent");
                //     } else {
                //      studentMails = [];
                //     //console.log('email sent')
                //   }
                // });
              });
            }
          }
          exchangeData['to'] = emailData;

          // Note : Commented for temporary bases for sending email notification to all room users
          // when Create Schedule, Update Schedule, Delete Schedule, Create Assignment, 
          // Update Assignment, Delete Assignment, Craete Questionarie, Update Questionarie, 
          // Delete Questionarie

          // EmailForUserCreation.defaultUserMail(exchangeData, function(emailerror, emailsuccess) {
          //   //console.log(emailerror.status)
          //   if (emailerror.status == false) {
          //     console.log("Email not sent");
          //     } else {
          //     //console.log('email sent')
          //   }
          // });
        } else {
          res.json({ 
            status: false, 
            error : "Internal server error", 
            message : "Error while retriving room data." 
          });
        }
    });
  } catch (e) {
    console.log("e in sendScheduleEmail === ", e);
    res.json({ 
      status: false, 
      message : "Internal server error, Please try again." 
    });
  }
}


/**
* @Function Name: "saveSchedule",
* @Purpose: "To create new schedule.",
* @Request Object: obj : "Client_Object, role, cid ="corporateId",
* @Response Object: Success- {null, data : "Selected date schedules"}, Failure- {error, null},
* @Author: "Prudhvi"
*/
export function saveScheduleCallback(obj, cb){
  try{
    // create new schedule 
    var objEntity = new Schedule(obj.entity);
    objEntity.save(function (err, doc) {
      if (err) {
        console.log("err === ",err);
        cb(err, null);
      } else {

        let objEntity = {
          uid : obj.uid,
          start : obj.start,
          end : obj.end,
          role : obj.role,
          cid : obj.cid
        }

        // console.log("objEntity in save callback === ", objEntity);
        
        // get all schedules of selected date 
        getDateSchedules(objEntity, function(error, data){
          if (error) {
            console.log("error ==== ",error);
            cb(error, null);
          } else {
            cb(null, data);
            if (objEntity.role == Roles.Instructor ) {
              let instructorObj = {
                instId : doc.createdBy,
                roomId : doc.roomId,
                subject : 'The Schedule Created',
                userBody : 'The class on '+'<b>' + doc.meetingName + '</b>'+' has been scheduled at '+'<b>' +  moment(doc.startDate).utc().format('DD-MM-YYYY hh:mm A') + '</b>(UTC)<b> - ' + moment(doc.endDate).utc().format('DD-MM-YYYY hh:mm A') + '</b>(UTC)' + ' by '+'<b>' + obj.fullname + '</b>'+'.',
                operatorBody : 'The class on '+'<b>' + doc.meetingName + '</b>'+' has been successfully scheduled at '+'<b>' +  moment(doc.startDate).utc().format('DD-MM-YYYY hh:mm A') + '</b>(UTC)<b> - ' + moment(doc.endDate).utc().format('DD-MM-YYYY hh:mm A') + '</b>(UTC)' + ' by you.',
                email : obj.email,
                message : 'The class '+doc.meetingName+' has been scheduled to Course '+ obj.roomName+'  at ' +moment(doc.startDate).utc().format('DD-MM-YYYY hh:mm A')+'(UTC) to '+moment(doc.endDate).utc().format('DD-MM-YYYY hh:mm A') + '(UTC).'
              };

              if (obj.entity && obj.entity.pattern) {
                instructorObj["message"] = 'The class '+doc.meetingName+' has been scheduled to Course '+ obj.roomName+'  from ' +moment(doc.startDate).utc().format('DD-MM-YYYY')+' to '+moment(doc.endDate).utc().format('DD-MM-YYYY') + ' :: ' +moment(doc.startDate).utc().format('hh:mm A')+ ' - ' + moment(doc.endDate).utc().format('hh:mm A')+ ' ('+ serverConfig.mail_timezone.code +').';
              }
              if (serverConfig.mail_timezone && serverConfig.mail_timezone.zone) {
                instructorObj["userBody"] = 'The class on '+'<b>' + doc.meetingName + '</b>'+' has been scheduled at '+'<b>' +  moment(doc.startDate).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A') + '</b>('+ serverConfig.mail_timezone.code +')<b> - ' + moment(doc.endDate).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A') + '</b>('+ serverConfig.mail_timezone.code +')' + ' by '+'<b>' + obj.fullname + '</b>'+'.';
                instructorObj["operatorBody"] = 'The class on '+'<b>' + doc.meetingName + '</b>'+' has been successfully scheduled at '+'<b>' +  moment(doc.startDate).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A') + '</b>('+ serverConfig.mail_timezone.code +')<b> - ' + moment(doc.endDate).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A') + '</b>('+ serverConfig.mail_timezone.code +')' + ' by you.';
                instructorObj["message"] = 'The class '+doc.meetingName+' has been scheduled to Course '+ obj.roomName+'  at ' +moment(doc.startDate).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A')+'('+serverConfig.mail_timezone.code +') to '+moment(doc.endDate).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A') + '('+ serverConfig.mail_timezone.code +').';
                if (obj.entity && obj.entity.pattern) {
                instructorObj["message"] = 'The class '+doc.meetingName+' has been scheduled to Course '+ obj.roomName+'  from ' +moment(doc.startDate).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY')+' to '+moment(doc.endDate).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY') + ' :: ' +moment(doc.startDate).tz(serverConfig.mail_timezone.zone).format('hh:mm A')+ ' - ' + moment(doc.endDate).tz(serverConfig.mail_timezone.zone).format('hh:mm A')+ ' ('+ serverConfig.mail_timezone.code +').';
                }
              }

              sendInstructorSchEmail(instructorObj);
            } else {
              let schObj = {
                roomId : obj.roomid,
                subject : 'The Schedule Created',
                body : 'The conference on '+'<b>' + doc.meetingName + '</b>'+' has been scheduled at '+'<b>' +  moment(doc.startDate).utc().format('DD-MM-YYYY hh:mm A') + '</b>(UTC)<b> - ' + moment(doc.endDate).utc().format('DD-MM-YYYY hh:mm A') + '</b>(UTC)' + ' by '+'<b>' + obj.fullname + '</b>'+'.',
                // message : 'The conference on ' + doc.meetingName + ' has been scheduled at ' +  moment(doc.startDate).utc().format('DD-MM-YYYY hh:mm A') + '(UTC) - ' + moment(doc.endDate).utc().format('DD-MM-YYYY hh:mm A') + '(UTC).',
                message : 'The conference meeting name '+doc.meetingName+' has been scheduled to Room '+ obj.roomName+'  at ' +moment(doc.startDate).utc().format('DD-MM-YYYY hh:mm A')+'(UTC) to '+moment(doc.endDate).utc().format('DD-MM-YYYY hh:mm A') + '(UTC).',
                createdBy  : doc.createdBy,
                createdBody : 'The conference on '+'<b>' + doc.meetingName + '</b>'+' has been scheduled at '+'<b>' +  moment(doc.startDate).utc().format('DD-MM-YYYY hh:mm A') + '</b>(UTC)<b> - ' + moment(doc.endDate).utc().format('DD-MM-YYYY hh:mm A') + '</b>(UTC)' + ' by '+'<b>' + 'you' + '</b>'+'.',
              };

              if (obj.entity && obj.entity.pattern) {
                schObj["message"] = 'The conference meeting name '+doc.meetingName+' has been scheduled to Course '+ obj.roomName+'  from ' +moment(doc.startDate).utc().format('DD-MM-YYYY')+' to '+moment(doc.endDate).utc().format('DD-MM-YYYY') + ' :: ' +moment(doc.startDate).utc().format('hh:mm A')+ ' - ' + moment(doc.endDate).utc().format('hh:mm A')+ ' ('+ serverConfig.mail_timezone.code +').';
              }
              if (serverConfig.mail_timezone && serverConfig.mail_timezone.zone) {
                schObj["body"] = 'The conference on '+'<b>' + doc.meetingName + '</b>'+' has been scheduled at '+'<b>' +  moment(doc.startDate).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A') + '</b>('+ serverConfig.mail_timezone.code +')<b> - ' + moment(doc.endDate).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A') + '</b>('+ serverConfig.mail_timezone.code +')' + ' by '+'<b>' + obj.fullname + '</b>'+'.';
                schObj["createdBody"] = 'The conference on '+'<b>' + doc.meetingName + '</b>'+' has been scheduled at '+'<b>' +  moment(doc.startDate).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A') + '</b>('+ serverConfig.mail_timezone.code +')<b> - ' + moment(doc.endDate).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A') + '</b>('+ serverConfig.mail_timezone.code +')' + ' by '+'<b>' + 'you' + '</b>'+'.';
                schObj["message"] = 'The conference meeting name '+doc.meetingName+' has been scheduled to Room '+ obj.roomName+'  at ' +moment(doc.startDate).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A')+'('+serverConfig.mail_timezone.code +') to '+moment(doc.endDate).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY hh:mm A') + '('+ serverConfig.mail_timezone.code +').';
                if (obj.entity && obj.entity.pattern) {
                  schObj["message"] = 'The conference meeting name '+doc.meetingName+' has been scheduled to Course '+ obj.roomName+'  from ' +moment(doc.startDate).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY')+' to '+moment(doc.endDate).tz(serverConfig.mail_timezone.zone).format('DD-MM-YYYY') + ' :: ' +moment(doc.startDate).tz(serverConfig.mail_timezone.zone).format('hh:mm A')+ ' - ' + moment(doc.endDate).tz(serverConfig.mail_timezone.zone).format('hh:mm A')+ ' ('+ serverConfig.mail_timezone.code +').';
                }
              }
              sendScheduleEmail(schObj);
            }
          }
        });
      }
    });
  } catch(e) {
    console.log("e in saveScheduleCallback === ", e);
    cb("Internal server error", null);
  }
}

/**
* @Function Name: "checkRoomValidity",
* @Purpose: "To check room package expired date with schdule date.",
* @Request Object: obj = { roomid : "roomId", date : "schedule_endTime"},
* @Response Object: Success- true, Failure- false,
* @Author: "Prudhvi"
*/
export function checkRoomValidity(obj, cb){
	try{
    //console.log("obj === ",obj);
  	// check room package expired date with shedule date 
    if (obj.roomid && obj.date) {
      let query = Room.findOne({ _id : obj.roomid })
                  .populate('selPackage', 'packageValidity');
      query.exec(function(err, response){
        if (err) cb(false, null);
        else if (response){
          let expDate = response.expiryDate && response.expiryDate != '' ? moment(response.expiryDate).utc().format('x') : (response.selPackage && response.selPackage.packageValidity ? moment(response.selPackage.packageValidity).utc().format('x') : null);
          if (expDate != null) {
            if (Number(expDate) < obj.date) cb(false);
            else cb(true, response.roomName);
          } else {
            console.log("error");
            cb("Internal server error", null);
          }
        } else {
          cb('Invalid room', null);
        }
      });
    } else cb("Invalid request", null);
  } catch(e) {
    console.log("e in checkRoomValidity === ", e);
    cb("Internal server error", null);
  }
}

function scheduleEvents (obj, cb) {
  try{
    fetchRoomSelector(obj, function(selector, instructorIds){
      if (selector) {
        var roomQuery = Room.find(selector);
        roomQuery.exec(function (roomerr, roomdoc) {
          if (roomerr) cb(roomerr, null);
          if (roomdoc && roomdoc.length > 0) {
            let roomIds = [];
            _.forIn(roomdoc, function(value, key) {
              roomIds.push(mongoose.Types.ObjectId(value._id));
            });

            // query for selected date schedule 
            // let query = Schedule.find({$or : [{startDate: {$gte: obj.start, $lte: obj.end }}, {endDate : {$gte: obj.end, $lte: obj.start }} ] , roomId : { $in : roomIds }});
            
            Schedule.aggregate([
                  { $unwind: "$dates" },
                  { $match: { 
                    'dates.startTime' : {
                      $gte: obj.start, $lte: obj.end
                    }, roomId : {$in : roomIds }
                  } },
                  { $sort : { 'dates.startTime' : -1 } }
            ], function(err, doc){                    
            // query.lean().exec(function(err, doc){
              if (err) {
                console.log("err === ",err);
                cb(err, null);
              } else if (doc && doc.length > 0){
                if (obj.role == Roles.Student) {
                  let mySchedule = [];
                  _.each(doc, function(data){
                    
                    if (data.dates) {
                      // update room key value with confetence link 
                      if (data.createdBy && _.findIndex(instructorIds, function(o) { return o.instructor = data.createdBy._id } ) > -1 ) {
                        mySchedule.push(data);
                      }
                    }
                  });
                  cb(null, mySchedule);
                } else {
                  cb(null, doc);
                }                
              } else {
                cb(null, []);
              }
            });
          } else cb(null, null);
        });
      }else cb(null, null);
    });
  } catch(e) {
    console.log("e in scheduleEvents === ",e);
    cb(null, null);
  }
}

/**
* @Function Name: "getDateSchedules",
* @Purpose: "To fetch selected date schedules.",
* @Request Object: obj = { uid : "userId", flag : "CURRENT/PAST", role, cid : "CorporateId"},
* @Response Object: Success- {null, doc:"Selected_date_schedules"}, Failure- {error, null},
* @Author: "Prudhvi"
*/

export function getDateSchedules(obj, cb){
  try{
    fetchRoomSelector(obj, function(selector, instructorIds){
      if (selector) {
        var roomQuery = Room.find(selector);
        roomQuery.exec(function (roomerr, roomdoc) {
          if (roomerr) cb(roomerr, null);
          if (roomdoc && roomdoc.length > 0) {
            let roomIds = [];
            _.forIn(roomdoc, function(value, key) {
              roomIds.push(mongoose.Types.ObjectId(value._id));
            });

            Schedule.aggregate([
                    { $unwind: "$dates" },
                    { $match: { 
                      'dates.startTime' : {
                        $gte: obj.start, $lte: obj.end
                      }, roomId : {$in : roomIds }
                    } },
                    { $sort : { 'dates.startTime' : -1 } }
              ], function(err, doc){
                if (err) {
                  console.log("err === ",err);
                  cb(err, null);
                } else if (doc && doc.length > 0){
                  let mySchedule = [];
                  var count= doc.length;
                  function processItem() {
                    let item = doc[count - 1];
                    Users.findOne({ _id : item.createdBy}, {firstname : 1, profile : 1}, function(usererr, user) {
                      if (user) {
                        Room.findOne({ _id : item.roomId}, {roomKey : 1, roomName : 1}, function(roomerr, room) {
                          if (room) {
                            let key = 'conf/' + room.roomKey;
                            room['roomKey'] = serverConfig.confLink.concat(key);
                            item['createdBy'] = user;
                            item['roomId'] = room;
                            if (obj.role == Roles.Student) {
                              if (item && item.createdBy && _.findIndex(instructorIds, function(o) { return o.instructor = item.createdBy._id } ) > -1 ) {
                                mySchedule.push(item);
                              }
                            } else {
                              mySchedule.push(item);
                            }
                            count= count-1;
                            if(count > 0){
                              processItem();
                            } else {
                              // done
                              // console.log("mySchedule === ", mySchedule);
                              cb(null, mySchedule);
                            }
                          } else {
                            if(count > 0){
                              processItem();
                            } else {
                              // done
                              // console.log("mySchedule === ", mySchedule);
                              cb(null, mySchedule);
                            }
                          }
                        });
                      } else {
                        if(count > 0){
                          processItem();
                        } else {
                          // done
                          // console.log("mySchedule === ", mySchedule);
                          cb(null, mySchedule);
                        }
                      }
                    });
                  }
                  processItem();
                } else {
                  cb(null, []);
                }
              });
          } else cb(null, null);
        });
      }else cb(null, null);
    });
  } catch(e) {
    console.log("e in getDateSchedules === ",e);
    cb(null, null);
  }
}

/**
* @Function Name: "fetchRoomSelector",
* @Purpose: "To get selector for fetch room schedules based on their role.",
* @Request Object: obj = { uid : "userId", role, cid : "CorporateId"},
* @Response Object: Success- selector, Failure- null,
* @Author: "Prudhvi"
*/
export function fetchRoomSelector(obj, cb){
  try{
  	if (obj.role == Roles.Student || obj.role == Roles.Attendee ) {
    	
    	// if student fetch his student record ids 
      let studentquery = Student.find({ students : {$in : [obj.uid]}}).select('roomId instId');
      studentquery.lean().exec( function(studenterr, student){
        if (student && student.length > 0) {
          let roomIds = [];
          let instructorIds = [];
          _.each(student, function(stu){
            roomIds.push(stu.roomId);
            instructorIds.push({instructor : stu.instId});
          });
          let selector = { _id : {$in : roomIds}};
          cb(selector, instructorIds);
        } else cb(null, null);
      });
    } else if (obj.role == Roles.Admin || obj.role == Roles.Lmsadmin || obj.role == Roles.Presenteradmin || obj.role == Roles.CRMadmin) {
      
      // if admins check with corporate ids 
      let selector = { corporateId : obj.cid };
      cb(selector, null);

      // if superadmin all rooms
    } else if (obj.role == Roles.Superadmin) {
      cb({});
    } else {
    	
    	// for others created by and if they are participants in that room 
      let selector = {$or : [ { createdBy : obj.uid },{ users : { $in :[obj.uid] } } ] };
      cb(selector, null);
    }
  } catch(e){
    console.log("e in fetchRoomSelector === ", e);
    cb(null, null);
  }
}



/*----------------------------- Recuring Schedule ----------------------------------*/


/*var repeatEvent = {
  type : 'D',
  repeatDuration : 2,
  // endDateType : 'C',
  startDate : Number(moment().add(10, 'minutes').utc().format('x')),
  endDate : Number(moment().add(10, 'days').utc().format('x')),
  duration : 10,
  // no_of_occurence : 12
}*/

// return pattern === D-2-_-_-_-5#0

/*var repeatEvent = {
  type : 'W',
  repeatDuration : 2,
  repeatOn : [1, 3, 5],
  startDate : Number(moment().add(10, 'minutes').utc().format('x')),
  // endDate : Number(moment().add(30, 'days').utc().format('x')),
  duration : 10,
  endDateType : 'C',
  no_of_occurence : 5
}*/

// return pattern ===== W-2-_-_-1,3,5-_#0

/*var repeatEvent = {
  type : 'M',
  repeatDuration : 2,
  repeatBy : 0,         // or  1,  "0" for day of the month and "1" for day of the week
  repeatByDay : 1,              // if 0 we need to add "repeatByDay" day of the week and "repeatByCount" for week of the month
  repeatByCount : 3
}*/

// return pattern ==== M-2-_-3-1-_#0

/*var repeatEvent = {
  type : 'Y',
  repeatDuration : 2,
  startDate : Number(moment().add(10, 'minutes').utc().format('x')),
  // endDate : Number(moment().add(5, 'years').utc().format('x')),
  duration : 10,
  endDateType : 'C',
  no_of_occurence : 4
}
*/
// return pattern ==== Y-2-S-_-_-_#0


// getPattern(repeatEvent);


function getPattern (repeatEvent) {
  var pattern = '_-_-_-_-_-_#0';
  try {

    pattern = pattern.substring(0,0)+repeatEvent.type+pattern.substring(1);
    pattern = pattern.substring(0,2)+repeatEvent.repeatDuration+pattern.substring(3);
    if(repeatEvent.endDateType == 'C'){
        pattern = pattern.substring(0,10)+repeatEvent.no_of_occurence+pattern.substring(11);
    }
        
    if(repeatEvent.type == 'W') {
        pattern = pattern.substring(0,8)+repeatEvent.repeatOn+pattern.substring(9);
    } else if(repeatEvent.type == 'M' && repeatEvent.repeatBy == 1) {
        pattern =  pattern.substring(0,8)+repeatEvent.repeatByDay+pattern.substring(9);
        pattern = pattern.substring(0,6)+repeatEvent.repeatByCount+pattern.substring(7);
    } else if(repeatEvent.type == 'M' && repeatEvent.repeatBy == 0) {
        pattern = pattern.substring(0,4)+'S'+pattern.substring(5);
    } else if(repeatEvent.type == 'Y'){
        pattern = pattern.substring(0,4)+'S'+pattern.substring(5);
    }
    // console.log("pattern === ", pattern);
    return  pattern;
  } catch(e){
    console.log("e in getPattern === ", e);
    return pattern;
  }
};


function getPossibleDates (objEntity, pattern) {
  // console.log("objEntity === ",objEntity);

  // let st = moment(objEntity.startDate, 'x');
  let now = moment().seconds(0).utc().format('x');
  let scheduleDates = [];
  let recurring = pattern.split('#')[0].split('-')[5];

  let new_obj = {
    pattern : pattern,
    startDate : objEntity.startDate
  }
  
  //daily recursive    
  if (pattern[0] == 'D') {
    let c = 1;
    if (objEntity.startDate < Number(now)) {
      let st = moment(objEntity.startDate, 'x').add(pattern[2], 'days').utc().format('x');
      objEntity['startDate'] = Number(st);
      c++;
    }
    if (recurring !== '_') {
      for (let i = c; i <= Number(recurring); i++ ) {
        let ed = moment(objEntity.startDate, 'x').add(objEntity.duration, 'minutes').utc().format('x');
        let obj = {
          startTime : objEntity.startDate,
          endTime : Number(ed)
        };
        scheduleDates.push(obj);
        let nextDate = moment(objEntity.startDate, 'x').add(pattern[2], 'days').utc().format('x');
        objEntity['startDate'] = Number(nextDate);
        new_obj['endDate'] = obj.endTime;
      }
    } else {
      let d = objEntity.startDate;
      while ( d <= objEntity.endDate ) {
        let ed = moment(objEntity.startDate, 'x').add(objEntity.duration, 'minutes').utc().format('x');
        let obj = {
          startTime : objEntity.startDate,
          endTime : Number(ed)
        };
        scheduleDates.push(obj);
        let nextDate = moment(objEntity.startDate, 'x').add(pattern[2], 'days').utc().format('x');
        objEntity['startDate'] = d = Number(nextDate);
      }
      new_obj['endDate'] = objEntity.endDate;
    }
    new_obj['dates'] = scheduleDates;
    return new_obj;
  } else if (pattern[0] == 'W') {
    //weekly recursive

    let res = pattern.substring(8).split("-")[0];
    let d = [];
    for(let j = 0; j < res.length; j++) {
      if (res[j] != ",") {
        d.push(parseInt(res[j]));       
      }
    }

    if (d.length > 0) {
      let wd = [];
      let start_day = objEntity.startDate;
      let c = 1;
      let patternLength = pattern.length;
      if (recurring !== '_') {
        let len = d.length;
        let nextDate = Number(moment(start_day, 'x').day(d[len - 1]).utc().format('x'));
        let endDate = moment(nextDate, 'x').add((pattern[2] * 7) * (Number(recurring) - 1) , 'days');
        objEntity['endDate'] = Number(endDate.add(objEntity.duration , 'minutes').utc().format('x'));
      }

      for (let i = 0; i < d.length; i++) {
        let st_day = moment(start_day, 'x').day(d[i]).utc().format('x');
        start_day = Number(st_day);
        wd.push(start_day);
        if( start_day >= objEntity.startDate && start_day <= objEntity.endDate && start_day > Number(now)) {
          let obj = {
            startTime : start_day,
            endTime : Number(moment(start_day, 'x').add(objEntity.duration, 'minutes').utc().format('x'))
          }
          scheduleDates.push(obj);
        }
      }
      cond1:
        while (1) {
          cond2:    
            for (let i = 0; i < wd.length; i++) {
              wd[i] = Number(moment(wd[i], 'x').add((pattern[2] * 7) , 'days').utc().format('x'));
              if (wd[i] > objEntity.endDate) {
                  break cond1;
              }
              if(wd[i] > Number(now)){
                let obj = {
                  startTime : wd[i],
                  endTime : Number(moment(wd[i], 'x').add(objEntity.duration, 'minutes').utc().format('x'))
                }
                scheduleDates.push(obj);
              }
            }
        }
        new_obj['endDate'] = objEntity.endDate;
        new_obj['dates'] = scheduleDates;
        return new_obj;
    } else {
      console.log("weekly days are not selected");
    }
  } else if (pattern[0] == 'M' && pattern[6] != '_' && pattern[8] != '_') {
    let d = moment(objEntity.startDate, 'x');
    let day = parseInt(pattern[8]);
    let week = parseInt(pattern[6]);
    let st = moment().date(1).month(d.month()).year(d.year()).hours(d.hours()).minutes(d.minutes()).seconds(0);
    let c = 1;
    let flag = true;
    let endDate = null;
    let _n = objEntity.endDate == undefined ? moment().utc().format('x') : objEntity.endDate;
    while(flag) {
      let _w = 1;
      let _d = st.day();
      let month = st.month();
      if (_d > day) {
        let diff = (7 + day) - _d;
        st.add(diff, 'days');
      } else if (_d < day) {
        let diff = day - _d;
        st.add(diff, 'days');
      }

      while (week > _w) {
        st.add(7, 'days');
        _w++;
      }

      let ed = null;

      if (month == st.month()) {
        let startTime = st.clone();
        let endTime = st.clone();
        endTime.add(objEntity.duration, 'minutes');
        let obj = {
          startTime : startTime.utc().format('x'),
          endTime : endTime.utc().format('x')
        }
        ed = obj.startTime;
        if (objEntity.endDate == undefined || objEntity.endDate > obj.startTime){
          if (now <= obj.startTime) {
            endDate = obj.endTime;
            scheduleDates.push(obj);
          }
        } else {
          new_obj['dates'] = scheduleDates;
          flag = false;
        }
      } else if (month < st.month()){
        st.subtract(1, 'months');
      }

      if (recurring != '_') {
        if (recurring == c) {
          new_obj['dates'] = scheduleDates;
          new_obj['endDate'] = endDate;
          flag = false;
        } else {
          st.add(objEntity.repeatDuration, 'months');
          st.date(1);
          c++;
        }
      } else if (objEntity.endDate <= ed) {
        new_obj['dates'] = scheduleDates;
        new_obj['endDate'] = objEntity.endDate;
        flag = false;
      } else {
        st.add(objEntity.repeatDuration, 'months');
        st.date(1);
      }
    }

    // console.log("new_obj === ", new_obj.dates);
    return new_obj;
  } else if (pattern[0] == 'M') {
    // var dayInMonth = st.date();
    let st = moment(objEntity.startDate, 'x');
    let d = st.date();
    let j = Number(st.utc().format('x'));
    if (recurring != '_') {
      let c = 1;
      while (c <= recurring) {
        let monthdates = st.daysInMonth();
        if (monthdates >= d) { 
          if (j >= now) {
            st.date(d);
            let starttime = st.clone();
            let endtime = st.clone();
              endtime.add(objEntity.duration, 'minutes');
            let dates = {
              startTime : Number(starttime.utc().format('x')),
              endTime : Number(endtime.utc().format('x'))
            };
            new_obj['endDate'] = dates.endTime;
            scheduleDates.push(dates);
          }
        } 
        st.add((pattern[2]*1),'months');
        j = Number(st.utc().format('x'));
        c++;
      }
    } else {
      while (j <= objEntity.endDate) {
        let monthdates = st.daysInMonth();
        if (monthdates >= d) { 
          if (j >= now) {
            st.date(d);
            let starttime = st.clone();
            let endtime = st.clone();
              endtime.add(objEntity.duration, 'minutes');
            let dates = {
              startTime : Number(starttime.utc().format('x')),
              endTime : Number(endtime.utc().format('x'))
            };
            scheduleDates.push(dates);
          }
        } 
        st.add((pattern[2]*1),'months');
        j = Number(st.utc().format('x'));
      }
      new_obj['endDate'] = objEntity.endDate;
    }
    new_obj['dates'] = scheduleDates;
    return new_obj;
  } else if (pattern[0] == 'Y') { 
    let c = 1;
    let st = moment(objEntity.startDate, 'x');
    if ((st.get('year')%4 == 0 ||st.get('year')%400 == 0)  && st.get('month') == 1 && st.get('date') == 29) {
        //Need to test condition
      if(pattern[2] > 4){
        loopYear(4*Math.ceil(pattern[2]/4));
      } 
    } else {
      loopYear((1*pattern[2]));
    }

    function loopYear(duration){
      let nextDate = objEntity.startDate;
      if (recurring !== '_') {
        while (c <= recurring) {
          if (nextDate >= Number(now)) {
            let obj = {
              startTime : nextDate,
              endTime : Number(moment(nextDate, 'x').add(objEntity.duration, 'minutes').utc().format('x'))
            };
            scheduleDates.push(obj);
            new_obj['endDate'] = obj.endTime;
          }
          nextDate = Number(moment(nextDate, 'x').add(duration, 'year').utc().format('x'));
          c++;
        }
      } else {
        while (nextDate <= objEntity.endDate) {
          if (nextDate >= Number(now)) {
            let obj = {
              startTime : nextDate,
              endTime : Number(moment(nextDate, 'x').add(objEntity.duration, 'minutes').utc().format('x'))
            };
            scheduleDates.push(obj);
            new_obj['endDate'] = obj.endTime;
          }
          nextDate = Number(moment(nextDate, 'x').add(duration, 'year').utc().format('x'));
        }
        new_obj['endDate'] = objEntity.endDate;
      }
    }
    // console.log("scheduleDates === ",scheduleDates);
    new_obj['dates'] = scheduleDates;
    return new_obj;
  }
}
