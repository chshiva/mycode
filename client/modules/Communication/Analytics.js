import ReactGA from 'react-ga';
import { createLogs, updateAttendance, saveVisiteTopic, markAsCompleteTopic } from './AnalyticsAction';

var moment = require('moment');

var initalizedStatus = false;
var thisObj = null;
var currentAttendance = null;
var topicsViewed = [];
var checkInTime = null;

export default class AnalyticsManager{

	constructor(single = false) {
		console.log("This Page", thisObj);
		if(thisObj){
			return thisObj;
		}else if(!single){
			thisObj = new AnalyticsManager(true);
			return thisObj;
		}
	}

	static destroyObj (){
		thisObj = null;
		initalizedStatus = false;
	}

	Initialize(GID, UID){
		if(!initalizedStatus){
			ReactGA.initialize(GID);
			ReactGA.set({ userId: UID });

			initalizedStatus = true;

			ReactGA.event({
			  category: 'User',
			  action: 'Log_In',
			  value: UID,
			  label: 'User Logged In'
			});

			this.LogData('User', 'Log_In', UID, 'User Logged In');
		}
	}

	LogData(category, action, uid, label){
		// logAnalytics
		var objData = {
			uid: uid,
			category: category,
			action: action,
			value: {logged: true, mode: 0},
			label: label
		}
		console.log(objData);
		store.dispatch(createLogs(objData, function(res){
			// console.log('Results here', res);	
		}));
		console.log('Log Data');
	}

	LogAttendance(mode, courseId, callback){
		console.log("Log Attendance", courseId);

		var objData = null;
		if(mode){
			objData = {
				uid: store.getState().login.data._id,
				category: 'Attendance',
				action: 'CheckIn',
				value: {checkOutTime: "", topicsViewed: [], courseId: courseId, schedule: mode, scheduleId: store.getState().conference.confData.scheduleData._id, slotId : store.getState().conference.confData.scheduleData.slotId},
				label: 'Checked into Course'
			}
		}else{
			objData = {
				uid: store.getState().login.data._id,
				category: 'Attendance',
				action: 'CheckIn',
				value: {checkOutTime: "", topicsViewed: [], courseId: courseId, schedule: mode, scheduleId: "", slotId : ""},
				label: 'Checked into Course'
			}
		}
		// console.log("objData === ", objData);
		store.dispatch(createLogs(objData, function(res){
			// console.log('currentAttendance ', res.log);
			currentAttendance = res.log._id;
			callback(res.log._id);
		}));
	}

	UpdateAttendance(logId, topicsViewed = []){
		console.log("Update Attendance", logId, topicsViewed);
		var objData = {
			_id: logId,	
			topicsViewed: topicsViewed, 
		}

		store.dispatch(updateAttendance(objData));
	}

	initiateTopicView(){
		topicsViewed = [];
	}

	addToViewList(topicId){
		
	}

/**
    *  @Function name : UpdateLog
    *  @Purpose : For UpdateLog when user visit topic
    *  @Author : Rajesh Goriga
    */
    UpdateLog(logObj) {

        // let checkTime = moment().utc().toDate()
        checkInTime = moment().utc().format("x"); 
        let TopicObj = {
            TopicId: logObj.topicId,
            checkInTime: checkInTime,
            roomId: logObj.roomId
        }
        store.dispatch(saveVisiteTopic(TopicObj, function (res) {
            // console.log('Results here', res);    
        }));
    }

    /**
    *  @Function name : UpdateTopicComplete
    *  @Purpose : For UpdateLog when user complete the  topic or exit the topic
    *  @Author : Rajesh Goriga
    */

    UpdateTopicComplete(topicId, marked,roomId,unmount) {
        // let checkOut = moment().utc().toDate()
        let CheckOutTime = moment().utc().format("x")
        let TopicObj = {
            TopicId: topicId,
            marked: marked,
            checkInTime: checkInTime,
            CheckOutTime: CheckOutTime,
						roomId: roomId,
						unmount:unmount
        }
        markAsCompleteTopic(TopicObj);
	}
}