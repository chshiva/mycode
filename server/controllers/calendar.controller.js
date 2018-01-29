import Users from '../models/users';
import Room from '../models/room';
import { checkValidRequest } from '../authorization';
import { scheduleRoomSelector } from './schedule.controller';

// console.log("scheduleRoomSelector ", scheduleRoomSelector);


/**
*  @Function name : getEvents
*  @Purpose : To fetcht the events to show on calendar
*  @Request Object : userdata :  { uid : "user id" } 
*  @Response Object : Success - Success message, events data, Failure - Error message
*  @Author : "Madhusudhan Reddy"
*/

export function getEvents(req, res) {
	// console.log("req.query ", req.query);
	checkValidRequest(req.headers, (user) => {
		try {
			if (user == null) {   // Verify requested user
				res.json({ status: false, error : "Require User Authentication" });
			} else {
				var obj = {
					uid: user['_id'],
					role: user['role'],
					cid: user['profile']['companyid']
				};
				scheduleRoomSelector(obj, (selector, instructorIds) => {
					if (selector && selector['corporateId']) {
						Room.find({corporateId: selector['corporateId']}, {_id: 1}, (error, rooms) => {
							// console.log("rooms " ,rooms);
						});
					} else {
						console.log("can't find rooms")
					}
					// console.log("selector ", selector);
					// console.log("instructorIds ", instructorIds);						
				});
				var data =  { name: "Madhusudhan Reddy", events: [ { startTime: "", endTime: "" }] };
				res.json({ status: true, error : null, data: data });
			}				
		} catch (e) {
			console.log('error in getEvents',e);
			res.json({ status: false, error : 'Internal Server Error', data: null })
		}
	});
};