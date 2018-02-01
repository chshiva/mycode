import { OnlineStatus } from './ConferenceActions';
import { getChatData, chatNotifications } from '../Dashboard/components/group/ChatActions';
import { getMyContacts } from '../Dashboard/UserDashboard/UserDashboardActions';

export default class SocketHandler{

	constructor(){
		this.p2p = null;
		this.activeChat = null;
	}
  
	static subscribeStatus(uid){
		this.p2p.subscribe(uid);
	}

	static sendInstaMessage(objMessage, uid){
		// console.log("sendMsgSocket---- ", objMessage, uid);
		this.p2p.sendInstaMessage(objMessage, uid);	
	}
	
	static disconnectServer(){
		if(this.p2p){
			this.p2p.disconnect();
		}		
	}

	static setActiveChat(activeId){
		this.activeChat = activeId;
		// console.log(this.activeChat);
	}

	static clearActiveChat(){
		this.activeChat = null;
		// console.log(this.activeChat);
	}

	static connectServer(uid, socketServer, iceServers, callback){
		let online = [];
		let that = this;
		this.p2p = new Woogeen.PeerClient({
	    iceServers : iceServers
		});

  		this.p2p.on('server-disconnected',function(e){  // server-disconnected.
			console.log("Disconnected...");
		});

		this.p2p.on('chat-invited',function(e){  // chat-invited.
			console.log("Chat Invited...");
		});

		this.p2p.on('chat-denied',function(e){  // chat-denied.
			console.log("Chat Denied...");
		});

		this.p2p.on('chat-started',function(e){  // chat-started.
			console.log("Chat Started...");
		});

		this.p2p.on('chat-stopped',function(e){  // chat-stopped.
			console.log("Chat Stoped...");
		});

		this.p2p.on('stream-added',function(e){  // stream-added.
			console.log("stream-added...");
		});

		this.p2p.on('insta-message', function(data){
			console.log("Insta Message Received", data);
			if(data.data && data.data.data && data.data.data.command) {
				if(data.data.data.command == 'IND-CHAT') {
					// console.log(that.activeChat, data.data.from);
					let chatData = data.data.data.chatData;
	          		let obj = { /*sentBy : chatData.sentBy,*/
	                      sentTo : chatData.sentBy,
	                      chatType : chatData.chatType,
	                      // from : true
	                    }
					if (that.activeChat && that.activeChat == data.data.from) {
	  		    		store.dispatch(getChatData(obj));
					} else{
						//Notification
						store.dispatch(chatNotifications(obj));
						console.log("Notification block");
					}
				} else if(data.data.data.command == 'ADD-CONT' || data.data.data.command == 'CONT-RES') {
					if (data.data.data && data.data.data.obj) {
						let contactData = data.data.data.obj;
	  		  			store.dispatch(getMyContacts(contactData.userId));
			  		}
				}
			}
		});

		this.p2p.on('data-received',function(e){  // data-received.
			console.log("data-received...", e);
			//Parser Values 
			//{type: 'IMG | TXT | VID', content: '', command: 'INDCHAT | GRPCHAT | ETC'}
		});

		this.p2p.on('status-changed', function(e){
			console.log("Status Received", e.data);
			if(e.data && e.data.data && e.data.data!='online') {
				let findUser = _.indexOf(online, e.data.from);
	      		let removeUser  = _.pullAt(online, [findUser]);
  		  		store.dispatch(OnlineStatus(online));
	    	} else {
	    		online.push(e.data.from);
  		  		store.dispatch(OnlineStatus(online));
	    	}
		});

		// Initialize a Peer object
		this.p2p.connect({host:socketServer, token:uid}, function(res){
			callback(true);
		}, function(err){
			// console.log("Raja ", err);
			callback(false);
		});

	}

	// console.log("this.online2---", this..online);

	static SendMessage(message, toUID){
		//Message Format {type: 'IMG | TXT | VID', content: '', command: 'INDCHAT | GRPCHAT | ETC'}
		this.p2p.send(message, toUID);
	}

	//This function denies a remote client's invitation.
	static DenyCall(uid, successCallback, failureCallback){
		this.p2p.deny(uid, successCallback, failureCallback);
	}

	//This function accepts a remote client to establish a connection for chatting/call.
	static AcceptCall(peerid, successCallback, failureCallback){
		this.p2p.accept(peerid, successCallback, failureCallback);
	}
}

