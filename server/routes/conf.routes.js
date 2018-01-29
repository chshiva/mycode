import { Router } from 'express';
import * as ConferenceController from '../controllers/conference.controller';
import * as HandraiseController from '../controllers/handraise.controller';
import * as ScreenShareController from '../controllers/screenShare.controller';

const confRoute = new Router();
const confGeneral = new Router();

confRoute.route('/requesttoken').post(ConferenceController.getToken);
confRoute.route('/fetch-conference-topic/:roomKey').get(ConferenceController.fetchConferenceTopic);
confRoute.route('/fetch-conference-topic-contentdata/:rid/:tid').get(ConferenceController.fetchConferenceTopicContentData);
confRoute.route('/fetch-conference-topic-files/:id').get(ConferenceController.fetchConferenceTopicFiles);
confRoute.route('/fetch-conference-topic-pdf-files/:tid/:fid').get(ConferenceController.fetchConferenceTopicPdfFiles);
confRoute.route('/fetch-conference-topic-questions/:tid/:id').get(ConferenceController.fetchConferenceTopicQuestions);
confRoute.route('/save-answers').post(ConferenceController.saveAnswers);
confRoute.route('/handraise').post(HandraiseController.createHandraise);
confRoute.route('/handraise/:id').put(HandraiseController.updateHandraise);
confRoute.route('/handraise-question/:key/:limit').get(HandraiseController.fetchHandraiseData);
confRoute.route('/handraise-question/:id').get(HandraiseController.getHandraiseQues)
																					.delete(HandraiseController.deleteHandraise);
confRoute.route('/handraise-question-answer/:id').put(HandraiseController.saveHandraiseAnswer);
confRoute.route('/handraise-answers/:id/:limit').get(HandraiseController.getAnswers);
confRoute.route('/handraise-answer-reply/:id').put(HandraiseController.saveReply);
confRoute.route('/answer-replies/:id/:replyOn').get(HandraiseController.getReplies);
//confGeneral.route('/conf/:rid');//.get(ConferenceController.confRequest);

confRoute.route('/create-log').post(ConferenceController.saveLog);


confRoute.route('/getice').get(ConferenceController.getIceServers);


// confRoute.route('/conf/feedback/:rid'); //cg

confRoute.route('/fetch-conference-assignment/:roomKey').get(ConferenceController.fetchConferenceAssignment);
confRoute.route('/delete-assignment-submitted-file/:rid/:aid/').delete(ConferenceController.deleteAssignmentSubmittedFile);
confRoute.route('/fetch-conference-poll/:roomKey').get(ConferenceController.fetchConferencePoll);
confRoute.route('/fetch-conference-pollcontentdata/:rid/:pid').get(ConferenceController.fetchConferencePollcontentdata);
confRoute.route('/create-poll').post(ConferenceController.createPoll);
confRoute.route('/update-poll/:id').put(ConferenceController.updateConferencePoll);
confRoute.route('/submit-poll/:id').put(ConferenceController.submitConferencePoll);
confRoute.route('/publish-poll').put(ConferenceController.publishConferencePoll);
confRoute.route('/delete-poll/:rid/:id').delete(ConferenceController.deleteConferencePoll);
confRoute.route('/fetch-poll-submissions/:rid/:id').get(ConferenceController.fetchPollSubmissions);

confRoute.route('/fetchToken').post(ScreenShareController.fetchToken);

confRoute.route('/conf/guestScheduled/:sid'); //cg

confRoute.route('/fetch-attendees/:rid').get(ConferenceController.getAttendees);

confRoute.route('/validate-schedule-password').post(ConferenceController.validateSchedulePassword);

confRoute.route('/remove-guest-room').put(ConferenceController.RemoveGuestFromRoom);

export {confRoute, confGeneral};