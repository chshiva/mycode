import { Router } from 'express';

import * as AdminController from '../controllers/admin.controller';
import * as UserController from '../controllers/admin.user.controller';
import * as CorporateController from '../controllers/corporate.controller';
import * as SettingsController from '../controllers/settings.controller';
import * as LDAPSettingsController from '../controllers/ldapsettings.controller';
import authCheck from '../controllers/login.controller.js';
import * as RoomController from '../controllers/room.controller';
import * as PackageController from '../controllers/package.controller';
import * as CategoryController from '../controllers/category.controller';
import * as QuestionnaireController from '../controllers/questionnaire.controller';
import * as LocationController from '../controllers/location.controller';
import * as GroupController from '../controllers/studentgroup.controller';
import * as BroadcastController from '../controllers/broadcast.controller';
import * as MobileController from '../controllers/mobile.controller';
const adminRoute = new Router();

adminRoute.route('/updateprofile').put(AdminController.updateProfile);
adminRoute.route('/getProfileImage').post(AdminController.getProfileImage);
adminRoute.route('/remove-profile-image').delete(AdminController.removeProfileImage);
adminRoute.route('/saveUserAddress').post(AdminController.saveUserAddress);

//Currently unused route
// adminRoute.route('/fetchUserAddress').post(AdminController.fetchUserAddress);


adminRoute.route('/create-work-place').post(AdminController.createWorkPlace)
adminRoute.route('/get-work-edu-data').get(AdminController.getWorkEduData)
adminRoute.route('/delete-workplace/:id').delete(AdminController.deleteWorkPlace)
adminRoute.route('/save-user-website').post(AdminController.saveUserWebsite);
adminRoute.route('/save-user-sociallink').post(AdminController.saveUserSocialLink);
adminRoute.route('/save-user-basic-info').post(AdminController.saveUserBasicInfo);
adminRoute.route('/create-college').post(AdminController.createCollege)
adminRoute.route('/delete-college/:id').delete(AdminController.deleteCollege)
adminRoute.route('/delete-school').delete(AdminController.deleteSchool);
adminRoute.route('/delete-address').delete(AdminController.deleteAddress);
adminRoute.route('/delete-website').delete(AdminController.deleteWebsite);
adminRoute.route('/delete-social-link').delete(AdminController.deleteSocialLink);
adminRoute.route('/delete-birth-day').delete(AdminController.deleteBirthDay);
adminRoute.route('/delete-gender').delete(AdminController.deleteGender);
adminRoute.route('/create-professionalSkills').put(AdminController.createSkills);
adminRoute.route('/create-school').put(AdminController.createSchool);
adminRoute.route('/locale-settings').put(AdminController.updateLocaleSettings);
adminRoute.route('/delete-professional-skills').delete(AdminController.deleteProfessionalSkills);
adminRoute.route('/changepassword').post(AdminController.changePassword);
adminRoute.route('/resetpassword').post(AdminController.resetPassword);
adminRoute.route('/get-logs').get(AdminController.getLogs);

adminRoute.route('/corporates-list').get(CorporateController.listCorporate);
adminRoute.route('/corporates').post(CorporateController.createCorporate);
adminRoute.route('/corporates/:id').put(CorporateController.updateCorporate)
																	.get(CorporateController.fetchCorporate)
																	.delete(CorporateController.deleteCorporate);
adminRoute.route('/corporate-ids').get(CorporateController.getCorporateIds);


adminRoute.route('/viewUser').post(AdminController.viewUser);
adminRoute.route('/viewuserprofile').post(AdminController.viewUserProfile);
adminRoute.route('/getuserlocaledata').post(AdminController.getUserLocaleData);
adminRoute.route('/save-user').post(AdminController.saveUser);
adminRoute.route('/update-user/:id').put(AdminController.updateUser);
adminRoute.route('/fetch-user').get(AdminController.fetchUser);
adminRoute.route('/list-users').get(UserController.listUser);
adminRoute.route('/getroles/:cid').get(AdminController.getRoles);
adminRoute.route('/getrolesupdate/:userId').get(AdminController.getRolesUpdate);
adminRoute.route('/searchusers').post(UserController.myUsers);
// adminRoute.route('/getcompanyids').post(UserController.getCompanyIds);
adminRoute.route('/deleteuser').post(UserController.deleteUser);
adminRoute.route('/activate-user').put(UserController.activateUser);

// adminRoute.route('/getrooms/:cid').get(AdminController.getRooms);

adminRoute.route('/create-guest').post(UserController.createGuest);
adminRoute.route('/delete-guest/:roomkey').delete(UserController.deleteGuest);
adminRoute.route('/clear-deviceId').get(UserController.clearDeviceid)


adminRoute.route('/studentsGroup').post(GroupController.saveStudentsGroup);
adminRoute.route('/studentsGroup/:id').put(GroupController.updateStudentsGroup);
adminRoute.route('/listGroupStudents').get(GroupController.listStudentsGroup);
adminRoute.route('/fetchgroupstudents').get(GroupController.fetchGroupStudents);
adminRoute.route('/deleteGroupStudents/:id').delete(GroupController.deleteStudentsGroup);
adminRoute.route('/deleteStudent').delete(GroupController.deleteStudentInGroup);
adminRoute.route('/updategroupname/:id').put(GroupController.updateGroupName);
adminRoute.route('/searchgroupstudents').get(GroupController.searchGroupStudents);

adminRoute.route('/export-users').get(UserController.exportUsers);
adminRoute.route('/import-users').post(UserController.importUsers);




adminRoute.route('/searchstudents').get(UserController.myStudents);
adminRoute.route('/searchgroups').get(UserController.myGroups); 



adminRoute.route('/smtp-settings').post(SettingsController.saveSMTPSettings)
																	.get(SettingsController.getSettings)
																	.delete(SettingsController.deleteSMTPSettings);
adminRoute.route('/ldap-Settings').post(LDAPSettingsController.saveLDAPSettings)
																	.get(LDAPSettingsController.getLDAPSettings)
																	.delete(LDAPSettingsController.deleteLdapSettings);


adminRoute.route('/list-room').get(RoomController.listRoom);
adminRoute.route('/fetch-room/:id').get(RoomController.fetchRoom);
adminRoute.route('/delete-room/:id').delete(RoomController.deleteRoom);
adminRoute.route('/save-room').post(RoomController.saveRoom);
adminRoute.route('/update-room/:id').put(RoomController.updateRoom);

adminRoute.route('/package-ids').get(RoomController.getPackageIds);

adminRoute.route('/add-room-user').post(RoomController.addRoomUser);
adminRoute.route('/remove-room-user/:rid/:id').delete(RoomController.removeRoomUser); 

adminRoute.route('/save-room-topic').post(RoomController.saveRoomTopic);
adminRoute.route('/update-room-topic/:id').put(RoomController.updateRoomTopic);
adminRoute.route('/list-room-topic').get(RoomController.listRoomTopic);
adminRoute.route('/fetch-room-topic/:rid/:id').get(RoomController.fetchRoomTopic);
adminRoute.route('/delete-room-topic/:rid/:id').delete(RoomController.deleteTopic);
adminRoute.route('/enable-room-topic/:id').put(RoomController.roomTopicEnable);


adminRoute.route('/addroomstudent').post(RoomController.addRoomStudent);
adminRoute.route('/addGroupStudent').post(RoomController.addGroupStudent);
adminRoute.route('/fetchstudent/:roomId/:instId').get(RoomController.fetchstudent);
adminRoute.route('/removeroomstud/:roomId/:instId/:studId').delete(RoomController.removeRoomStud); 


adminRoute.route('/room-feedback-list').get(RoomController.listRoomFeedback);
adminRoute.route('/fetch-room-feedback/:id').get(RoomController.fetchRoomFeedback);
adminRoute.route('/save-feedback').post(RoomController.saveFeedback);

//Room Side Locations
adminRoute.route('/getLocationList').get(RoomController.getLocationList);
adminRoute.route('/getRoomInstructorStudentsList').get(RoomController.getRoomInstructorStudentsList);
adminRoute.route('/saveRoomLocation').post(RoomController.saveRoomLocation);
adminRoute.route('/getRoomLocations').get(RoomController.getRoomLocations);
adminRoute.route('/delete-room-location').delete(RoomController.deleteRoomLocation);
adminRoute.route('/delete-room-location-participant').delete(RoomController.deleteRoomLocationParticipant);

adminRoute.route('/list-room-assignment').get(RoomController.listRoomAssignment);
adminRoute.route('/save-room-assignment').post(RoomController.saveRoomAssignment);
adminRoute.route('/update-room-assignment/:id').put(RoomController.updateRoomAssignment);
adminRoute.route('/fetch-topic-data/:id').get(RoomController.fetchTopicData);
adminRoute.route('/list-assignment-submission').get(RoomController.listAssignmentSubmission);
adminRoute.route('/fetch-assignment-data/:rid/:id').get(RoomController.fetchAssignmentData);
adminRoute.route('/delete-assignment-uploaded-file/:rid/:aid').delete(RoomController.deleteAssignmentUploadedFile);
adminRoute.route('/delete-assignment/:rid/:aid').delete(RoomController.deleteAssignment);

adminRoute.route('/getQuestionnaireData').get(RoomController.getQuestionnaireDataList);
adminRoute.route('/saveRoomFeedbackType/:roomId').put(RoomController.saveRoomFeedbackType);
adminRoute.route('/getRoomFeedbackType').get(RoomController.getRoomFeedbackType);
adminRoute.route('/saveRoomCodecType/:roomId').put(RoomController.saveRoomCodecType);
adminRoute.route('/saveRoomEnableLive/:roomId').put(RoomController.saveRoomEnableLive);


adminRoute.route('/fetch-topic-questionnaire/:rid/:id').get(RoomController.fetchTopicQuestionnaire)

adminRoute.route('/assign-questionnaire').post(RoomController.assignQuestionnaire)
adminRoute.route('/update-assigned-questionnaire').put(RoomController.updateAssignedQuestionnaire)
adminRoute.route('/unassign-questionnaire/:qid/:tid').delete(RoomController.unassignQuestionnaire)
adminRoute.route('/confirmed-unassign-questionnaire/:qid/:tid').delete(RoomController.confirmedUnassignQuestionnaireFromTopic)
adminRoute.route('/categoryids').get(RoomController.getCategoryIds);

adminRoute.route('/list-result-topic').get(RoomController.listResultTopic);
adminRoute.route('/fetch-result/:rid').get(RoomController.fetchResult);

adminRoute.route('/set-upload-file-desc').post(RoomController.setUploadFileDesc);

adminRoute.route('/packages').post(PackageController.createPackage)
														.get(PackageController.listPackage);

adminRoute.route('/packages/:id').get(PackageController.fetchPackage)
															.put(PackageController.updatePackage)
														.delete(PackageController.deletePackage);

adminRoute.route('/server-list').get(PackageController.getserverlist);

adminRoute.route('/save-category').post(CategoryController.saveCategory);
adminRoute.route('/update-category/:id').put(CategoryController.updateCategory);
adminRoute.route('/fetch-category/:id').get(CategoryController.fetchCategory);
adminRoute.route('/delete-category/:id').delete(CategoryController.deleteCategory);
adminRoute.route('/list-category').get(CategoryController.listCategory);


adminRoute.route('/save-questionnaire').post(QuestionnaireController.saveQuestionnaire);
adminRoute.route('/update-questionnaire').put(QuestionnaireController.updateQuestionnaire);
adminRoute.route('/save-question/:id').put(QuestionnaireController.saveQuestion);
adminRoute.route('/list-questionnaire').get(QuestionnaireController.listQuestionnaire);
adminRoute.route('/fetch-questionnaire/:id').get(QuestionnaireController.fetchQuestionnaire);
adminRoute.route('/get-questionnaire-result/:id').get(QuestionnaireController.fetchQuestionnaireResult);
adminRoute.route('/delete-questionnaire/:id').delete(QuestionnaireController.deleteQuestionnaire);
adminRoute.route('/confirm-delete-questionnaire/:id/:dependency').delete(QuestionnaireController.confirmDeleteQuestionnaire);
adminRoute.route('/fetch-clone-questionnaire/:id').get(QuestionnaireController.fetchCloneQuestionnaire);
adminRoute.route('/questionnaire-scorm-upload/:token').post(QuestionnaireController.uploadScormQuestionnaire);

adminRoute.route('/delete-question/:qid/:id').delete(QuestionnaireController.deleteQuestion)
adminRoute.route('/confirm-delete-question/:qid/:id').delete(QuestionnaireController.confirmedDeleteQuestion)

adminRoute.route('/save-grades-questionnaire').post(QuestionnaireController.saveQuestionnaireGrades);
adminRoute.route('/get-questionnaire-grades').get(QuestionnaireController.getQuestionnaireGrades);

adminRoute.route('/questionnaire-list').get(QuestionnaireController.fetchQuestionnairesData);

adminRoute.route('/locations').post(LocationController.saveLocation)
								.get(LocationController.listLocation);
adminRoute.route('/locations/:id').put(LocationController.updateLocation)
								.get(LocationController.fetchLocation)
								.delete(LocationController.deleteLocation);

adminRoute.route('/getUserData/:uid').get(AdminController.getUserData);

// adminRoute.route('/save-broadcast').post(BroadcastController.saveBroadcast);
// adminRoute.route('/broadcast-data/:limit').get(BroadcastController.fetchBroadcastData);
// adminRoute.route('/updateBroadcast/:id').put(BroadcastController.updateBroadcastData);
// adminRoute.route('/delete-broadcastdata/:id').delete(BroadcastController.deleteBroadcast);

//DSS - Android push notification
adminRoute.route('/androidDeviceId').post(AdminController.setAndroidId);

adminRoute.route('/fetch-plagiarism-data/:rid/:id/:sid').get(RoomController.fetchPlagiarismData);
adminRoute.route('/fetch-plagiarism-credits').get(RoomController.fetchPlagiarismCredits);
adminRoute.route('/fetch-individual-assignment-data/').get(RoomController.fetchIndividualAssignmentData);
adminRoute.route('/save-evaluated-assignment-result').post(RoomController.saveEvaluatedAssignmentResult);
adminRoute.route('/save-assignment-grade-configuration').post(RoomController.saveAssignmentGradeConfiguration);

adminRoute.route('/show-hide-rooms-ios').get(MobileController.showHideRoomsIOS);

adminRoute.route('/set-deviceid-ios').post(MobileController.setDeviceIdIOS);

adminRoute.route('/get-certificate-data').get(RoomController.listRoomCertificateData);
adminRoute.route('/toggle-certificate-download').put(RoomController.toggleCertificateDownload);

adminRoute.route('/set-index-topics').put(RoomController.setIndexTopics);


function requirAuth (req, res, next) {
 console.log("at requireAuth");
      //  return next();
    // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
  // adminRoute.route('/login');
  res.send("Logged out");
}
export default adminRoute;
