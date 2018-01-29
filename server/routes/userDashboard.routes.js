import { Router } from 'express';

import * as UserDashboardController from '../controllers/userDashboard.controller';
import * as ChatController from '../controllers/chat.controller';
import * as BroadcastController from '../controllers/broadcast.controller';
const userDashboardRoute = new Router();

// userDashboardRoute.route('/dashboard');
userDashboardRoute.route('/fetch-my-rooms').get(UserDashboardController.fetchMyRooms);
userDashboardRoute.route('/fetch-my-rooms/:input').get(UserDashboardController.searchMyRooms)
userDashboardRoute.route('/regenerate-link').post(UserDashboardController.regenerateLink);
userDashboardRoute.route('/share-link').post(UserDashboardController.shareLink);
userDashboardRoute.route('/conform-regenarate').post(UserDashboardController.conformRegenarate);

userDashboardRoute.route('/creategroup').post(UserDashboardController.createGroup);
userDashboardRoute.route('/getmygroups').post(UserDashboardController.getMyGroups);
userDashboardRoute.route('/getmachedcontacts').post(UserDashboardController.getMachedContacts);
userDashboardRoute.route('/memberstogroup').post(UserDashboardController.memberstoGroup);
userDashboardRoute.route('/deletegroup').post(UserDashboardController.deleteGroup);

userDashboardRoute.route('/send-message').post(ChatController.sendMessage);
userDashboardRoute.route('/chat-data').get(ChatController.getMsgData);
userDashboardRoute.route('/export-room-chat/:roomkey').get(ChatController.exportRoomChat);
userDashboardRoute.route('/getchatnotification').post(ChatController.getChatNotification);
userDashboardRoute.route('/clear-roomchat').post(ChatController.clearRoomChat);

userDashboardRoute.route('/ind-chat-notifications').get(ChatController.indChatNotifications);
userDashboardRoute.route('/room-chat-notifications/:roomKey').get(ChatController.roomChatNotifications);

userDashboardRoute.route('/chatnotification').post(ChatController.getChatNotification);
userDashboardRoute.route('/fetchFeedbackType').get(UserDashboardController.fetchFeedbackType);
userDashboardRoute.route('/userProfile');

userDashboardRoute.route('/test-api').post(UserDashboardController.testApi);

userDashboardRoute.route('/broadcast').post(BroadcastController.createBroadcast);
userDashboardRoute.route('/broadcast/:id').put(BroadcastController.updateBroadcast);
userDashboardRoute.route('/broadcast-data/:limit').get(BroadcastController.fetchBroadcastData);
userDashboardRoute.route('/delete-broadcast/:id').delete(BroadcastController.deleteBroadcast);
userDashboardRoute.route('/broadcast-notifications').get(BroadcastController.broadcastNotifications);
userDashboardRoute.route('/update-user-status').get(BroadcastController.updateUserStatus);

// userDashboardRoute.route('/handraise-question/:id').post(BroadcastController.getHandraiseQues).delete(BroadcastController.deleteHandraise);
userDashboardRoute.route('/save-broadcast-comment/:id').put(BroadcastController.saveBroadcastComment);
userDashboardRoute.route('/get-broadcast-comments/:id/:limit').get(BroadcastController.getComments);
userDashboardRoute.route('/broadcast-comment-reply/:id').put(BroadcastController.saveReply);
userDashboardRoute.route('/comment-replies/:id/:replyOn').get(BroadcastController.getReplies);
userDashboardRoute.route('/update-likes').put(BroadcastController.updateLikes);
userDashboardRoute.route('/put-google-id').put(UserDashboardController.saveGoogleID);
userDashboardRoute.route('/disconnect-Social-media').put(UserDashboardController.removeSocailMedia);

userDashboardRoute.route('/config-settings').get(UserDashboardController.configApi);

userDashboardRoute.route('/fetch-room-details/:roomKey').get(UserDashboardController.fetchRoomDetails);


export default userDashboardRoute;