import { Router } from 'express';
import * as   ReportsController from '../controllers/reports.controller';

const reports = new Router();

// reports.route('/fetch-students-assignment/:rid/:id').get(ReportsController.studentsSubmissionAssignment);

// reports.route('/fetch-student-assignments/:rid').get(ReportsController.studentSubmissionAssignments);
reports.route('/student-course-list').get(ReportsController.studentCourseList);

reports.route('/getactiveusers').get(ReportsController.activeUsers);
reports.route('/list-activeusers').post(ReportsController.listActiveUsers);

reports.route('/fetch-course-attendance').get(ReportsController.courseAttendance);
reports.route('/fetch-individual-attendance').get(ReportsController.individualAttendance);
reports.route('/list-individual-attendance').post(ReportsController.listIndividualAttendance);
reports.route('/list-total-schedules').post(ReportsController.listTotalSchedules);

reports.route('/fetch-course-topics/:rId').get(ReportsController.courseTopics);
reports.route('/fetch-topic-viewed-users').get(ReportsController.topicViewedUsers);
reports.route('/list-topic-viewed-users').post(ReportsController.listTopicViewedUsers);

reports.route('/fetch-course-users/:rId').get(ReportsController.courseUsers);
reports.route('/fetch-user-viewed-topics').get(ReportsController.userViewedTopics);

reports.route('/list-course-topics').post(ReportsController.listCourseTopics);
reports.route('/list-user-viewed-allTopics').post(ReportsController.listUserViewedAllTopics);

reports.route('/fetch-student-topics').get(ReportsController.studentTopics);
reports.route('/student-assignment-list').get(ReportsController.studentAssignmentList);
reports.route('/student-assignment-result-data').get(ReportsController.studentAssignmentResultData);

reports.route('/check-certificate-eligibility').get(ReportsController.checkCertificteEligibility);
reports.route('/fetch-certificate').get(ReportsController.generateCertificate);

export default reports;