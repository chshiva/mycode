import { Router } from 'express';
import * as ScheduleController from '../controllers/schedule.controller';

const scheduleRoute = new Router();

scheduleRoute.route('/schedule-dates').get(ScheduleController.getScheduleDates);
scheduleRoute.route('/schedules').post(ScheduleController.createSchedule);
																// .put(ScheduleController.updateSchedule);
scheduleRoute.route('/date-schedules/:startDate/:endDate').get(ScheduleController.getCurrentDateSchedules);
scheduleRoute.route('/date-schedules/:currentDate').get(ScheduleController.getPastSchedules);
scheduleRoute.route('/delete-slot/:id/:scheduleid').delete(ScheduleController.deleteMySchedule);
scheduleRoute.route('/schedules/:id').get(ScheduleController.getSchedule)
																		.put(ScheduleController.updateSchedule);
scheduleRoute.route('/delete-schedule/:id/:date').delete(ScheduleController.deleteMyRecurringSchedule);
scheduleRoute.route('/schedule-slot/:id').put(ScheduleController.updateSlotScheule);
// scheduleRoute.route('/get-full-calendar-events/:startDate/:endDate').get(ScheduleController.getScheduleEvents);
scheduleRoute.route('/schedule-fetch-room').get(ScheduleController.fetchMyRoomsSchedule);

export default scheduleRoute;