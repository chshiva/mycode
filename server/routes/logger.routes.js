import { Router } from 'express';
import * as LogController from '../controllers/datalog.controller';

const logRoute = new Router();


logRoute.route('/logAnalytics').post(LogController.saveLog);
logRoute.route('/updateAttendance').post(LogController.updateAttendance);
logRoute.route('/saveVisiteTopic').put(LogController.saveVisiteTopic);
logRoute.route('/markAsCompleteTopic').put(LogController.markAsCompleteTopic);
logRoute.route('/get-topic-status/:roomId/:topicId').get(LogController.getTopicStatus);


export default logRoute;
