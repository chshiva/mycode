import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import {Col, Row, Grid, Carousel, Modal, ProgressBar} from 'react-bootstrap';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Link, browserHistory } from 'react-router';
import FontAwesome from 'react-fontawesome';
import styles from '../../Dashboard.css';
import compStyles from '../../../../components/component.css';
import confStyles from '../../../Layouts/DashLayout/components/ConfSettings.css';
import { sendRoomMessage, getRoomChatData, clearRoomChat } from '../../components/group/ChatActions';
import moment from 'moment';
import {Header, Title, Body, Footer} from 'react-bootstrap/lib/Modal';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import { loggedInData } from '../../../Login/LoginReducer';
import { chatData } from '../../components/group/ChatReducer';
import callApi from '../../../../util/apiCaller';

class RoomChat extends Component{
	constructor(props) {
		super(props);
    this.runOnce =  true;
    this.chatType = 'Room';
    this.state = {
      roomKey : null,
      msgContent : '',
      chatData : null,
      showImageModal : false,
      message : '',
      fileType : '',
      progress : '',
      progressBar : false,
      displayName : '',
      fileName : '',
      fileId :'',
      download:false         
    };
    this.temp = '';
    this.imageData = {};
		this.FetchRoomChatData = this.FetchRoomChatData.bind(this);
   	this.props.confObject.RoomChatListener(this.FetchRoomChatData);
	}

  componentDidMount() {
    if(this.props && this.props.roomKey) {
	    this.setState({ roomKey : this.props.roomKey });
	    this.reqDataObj();
	  }
    if (!this.props.noConference) {
      this.refs.roomchatinput.focus();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let objDiv = document.getElementById("roomChatBody");
    if(objDiv != undefined) {
    	objDiv.scrollTop = objDiv.scrollHeight;
    }
  }

	componentWillReceiveProps(nextProps) {
    if(nextProps && nextProps.roomKey && this.state.roomKey == null) {
	    this.setState({ roomKey : nextProps.roomKey });
	    if (this.runOnce) {
	    	this.reqDataObj();
	      this.runOnce = false;
	    }
	  }
	}

	reqDataObj = () => {
    let roomKey = this.state.roomKey != null ? this.state.roomKey : this.props.roomKey;
	  let obj = { /*sentBy : this.props.uid,*/
	              sentTo : roomKey,
	              chatType : 'Room'
	            }
	  console.log("obj in reqDataObj === ",obj);
	  getRoomChatData(obj).then(res => this.setChatData(res));
  }

	setChatData = (res) => {
		// console.log("res in room chat === ", res);
    if(res.status && res.data){
		  this.setState({ chatData : res.data });
    } else if(res && res.errorCode == 208) {
      browserHistory.push('/');
    } else {
      this.refs.chatscontainer.error(res.error);
    }
	}

  handleChange = (e) => {
    this.setState({ msgContent : e.target.value});
    if(e.key == 'Enter'){
      this.sendMsg();
    }
  }

  sendMsg = (e) => {
    if(this.state.msgContent.trim() != '') {
      var fileName = '';
      var messageType = '';
      var url = this.state.msgContent.trim();
      var regexQuery = /(http(s)?:\\)?([\w-]+\.)+[\w-]+[.com|.in|.org]+(\[\?%&=]*)?/;
      var retVal = new RegExp(regexQuery);
      if(retVal.test(url)) {  
        var reg = new RegExp(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/, "g");
        url.match(reg);         
        if (RegExp.$3.indexOf('youtu') > -1){
          fileName = RegExp.$6;
          messageType = "YOUTUBE"; 
        } else if (RegExp.$3.indexOf('vimeo') > -1) {          
          fileName = RegExp.$6;
          messageType = "VIMEO";  
        } else {          
          messageType = "URL";          
        }
        //console.log("fileName", fileName);
        console.log("messageType", messageType);  
      } else {
        messageType = "TXT";        
      }
      let obj = {
                  /*sentBy : this.state.uid,*/
                  roomKey : this.state.roomKey,
                  chatType : this.chatType,
                  messageType : messageType,
                  message : url,
                  fileName : fileName                  
                }
                // console.log("client obj", obj)
      //Chnaged by rajesh for clearing the chat message
      this.temp = this.state.msgContent;
      this.setState({ msgContent: '' });
    	sendRoomMessage(obj).then(res => this.clearInput(res));
    }
  }

exportChat = () => {

 let roomKey = this.state.roomKey != null ? this.state.roomKey : this.props.roomKey; 
 return callApi('export-room-chat/' + roomKey, 'get').then(res => this.exportData(res));

}
exportData(response){
  if(response.status == true){
    this.setState({
      download: true,
      fileName: "/"+response.fileName
    })
    document.getElementById("export").click();
    this.refs.chatscontainer.success('Exported Successfully');
  } else {
    this.refs.chatscontainer.error(`${response.error} `, ``);
  }
}
  clearInput = (res) => {
    let that = this;
		 // console.log("response", res);
    if(res.status) {
      // this.setState({ msgContent : '' });
			this.setState({ chatData : res.data });
      this.newChatDataRequest();
    } else if(res && res.errorCode == 208) {
      browserHistory.push('/');
    } else {
      //assign previous value when error come from res
      this.setState({ msgContent: this.temp });
      this.refs.chatscontainer.error(res.error);
    }
  }

	newChatDataRequest = () => {
		let obj = {
			command : 'ROOM-CHAT',
			content : { chatData : {} },
			type : 'OBJECT'
		};
		this.props.confObject.sendMessage(obj, 0);
	}

	FetchRoomChatData() {
		this.reqDataObj();
	}

	handleUpload = (e) => {
    //console.log(e.target)
    var reader = new FileReader();
    var file = e.target.files[0];

    if (!file){
      return;
    } else if (file.size>20971520) {
      alertify.alert(this.props.intl.messages.warning,this.props.intl.messages.chat_file_alert, function() {
        }).setting({'label': this.props.intl.messages.ok}); 
      return;
    } 

    // For progress bar 
    const that = this
    reader.onprogress = function(data) {

      // code changed by - Najib, On firefox, progress(percentage data) never reaches 100 so progress bar always visible. To work around, hiding progress bar(only for firefox) if progress(percentage data) is greater than 95.  
      var ua = navigator.userAgent.toLowerCase();
      //console.log("browser type", ua);
      var br = /firefox/;
      if (data.lengthComputable) {                                           
          var progress = parseInt(((data.loaded / data.total) * 100), 10);
          
        if (progress == 100) {
          that.setState({
            progressBar : false,
            progress : ''
          })
        } else if(br.test(ua) && progress >= 95 ) {
          that.setState({
            progressBar : false,
            progress : ''
          })
        } else if(that.state.progressBar == true) {
          that.setState({
            progress : progress
          })
        } else {
          that.setState({
            progressBar : true,
            progress : progress
          })
        }          
      }
    }
    
    //console.log(file)
    reader.onload = function(img) {
      let dataURI = img.target.result;
      this.imageData["file"] = dataURI.split(',')[1];
      this.imageData["fileName"] = file.name;
      this.imageData["fileSize"] = file.size;
      if(file.type == 'application/zip'){
        this.imageData["fileType"] = 'zip'
      }else if(file.type != ""){
        this.imageData["fileType"] = file.type.substring(0, file.type.indexOf("/"))
      } 
      let fileFormat = file.name.split(".");
      let length = fileFormat.length;
      let typeOfFile = _.trim(fileFormat[length-1]);
      let allowedFormats = _.map(['xlsx','xls','doc','docx','ppt','pptx','txt','pdf','odp','odt','ods','png','jpeg','jpg','gif','wav','mp3','wmv','mp4','mkv','avi'], _.trim);
      let data = this.imageData;
      if(allowedFormats.includes(typeOfFile) || file.type == 'application/zip') {
        this.saveFile(data);        
      } else {
        this.refs.chatscontainer.error('Sorry File Not Supported');
      }             
    }.bind(this);
    reader.readAsDataURL(file);
  }

  saveFile(data){
    var messageType;
    if(data.fileType == "application" || data.fileType == "zip" || data.fileType == "text") {
    	messageType = 'FILE'
    } else if (data.fileType == "image") {
    	messageType = 'IMG'
    } else if (data.fileType == "audio") {
    	messageType = 'MEDIA'
    } else if (data.fileType == "video") {
    	messageType = 'VIDEO'
    }
   	let obj = {
      /*sentBy : this.state.uid,*/
      roomKey : this.state.roomKey,
      chatType : this.chatType,
      messageType : messageType,
      message : data.fileName,
      file : data.file,
      fileSize : data.fileSize
    }
  	sendRoomMessage(obj).then(res => this.clearInput(res));
  }

  handleImage(imageName, fileType){
		this.setState({
			showImageModal : true,
			fileName : imageName,
			fileType : fileType,
      displayName : imageName
		})		
	}

	hideImageModal() {
		this.setState({
			showImageModal : false,
			fileName : '',
			fileType : ''
		})
	}

  handleURLVideo(fileName, fileType) {
    this.setState({
      showImageModal : true,
      fileId : fileName.fileId,
      fileType : fileType.messageType,     
    });
  }  

  viewUser(id) {
    if(id && this.props.loggedInData && this.props.loggedInData.data && !this.props.loggedInData.data.guest) {
      browserHistory.push('/profile/'+id);
    }
  }

  handleClearChat() {
    let self = this;
    alertify.confirm(this.props.intl.messages.warning,this.props.intl.messages.delete_room_chat_alert, 
      function (result) {
        if(result) {          
          clearRoomChat(self.state.roomKey).then(res => self.clearChat(res));
        }
      },
      function() {

      }
    ).setting('labels',{'ok': this.props.intl.messages.ok,'cancel': this.props.intl.messages.cancel});
  }

  clearChat(res) {
    console.log("res--", res);
    if(res.status) {
      this.setState({ chatData : res.data });
      this.newChatDataRequest();
    } else {
      this.refs.chatscontainer.error(res.error);
    }
  }

	render(){

    //console.log("chat data----", this.state.chatData);
    let varLink = '';
    if(this.state.fileType == "YOUTUBE") {
      varLink = "https://www.youtube.com/embed/"+this.state.fileId;
    } else if (this.state.fileType == "VIMEO") {
      varLink = "https://vimeo.com/"+this.state.fileId;
    } else {
      let showFileName = '';
      let extn = '';
      showFileName = this.state.fileName.substring(this.state.fileName.indexOf("_") + 1);  

      //code changed by - Najib, Desc- Limiting file name if exceeds 35 character 
      extn = showFileName.substring(showFileName.lastIndexOf('.')+1, showFileName.length) || showFileName; 
      if(showFileName.length>35) {
        varLink = showFileName.substr(0,35) + '...' + extn; 
      } else {
        varLink = showFileName;
      } 
    }

    let guestStatus = null
    if(this.props.loggedInData && this.props.loggedInData.data && this.props.loggedInData.data.guest) {
      guestStatus = true
    }
    
    let cls_selfPostMsg = `${styles.selfPostMsg} clearfix`;
    let cls_selfPostMsgGuest = `${styles.selfPostMsgGuest} clearfix`;
    let chats = <li> <FormattedMessage id ='start_chating'/> </li>;
    let self = this;

    const fileURL = "/uploads/"+this.state.fileName;
    //const fileName = this.state.fileName.substring(this.state.fileName.indexOf("_") + 1);
    const youTubeLink = "https://www.youtube.com/embed/"+this.state.fileId;
    const vimeoLink = "https://player.vimeo.com/video/"+this.state.fileId+"?api=1&player_id=player_1"
      const showImageModal = this.state.showImageModal
    ?
      <div>
        <Modal show={this.state.showImageModal} onHide={this.hideImageModal.bind(this)}>
          <Header closeButton>
            <Title className={styles.popHeadingAll} >{varLink}</Title>
          </Header>
          <Body>
            <div className={styles.mediaView}>
              {
                this.state.fileType == "VIDEO"  
                ?   
                  <div className={styles.videoWrapper}> 
                    <video src={fileURL} controls/> 
                  </div>
                :  
                  this.state.fileType == "IMG" 
                ? 
                  <img src={fileURL}/>
                :
                this.state.fileType == "YOUTUBE" ? 
                <div className={styles.videoWrapper}>
                  <iframe src={youTubeLink}></iframe>
                </div> 
                :
                this.state.fileType == "VIMEO" ? 
                <div className={styles.videoWrapper}>
                  <iframe src={vimeoLink}></iframe>
                </div> 
                :null
              }
            </div>
          </Body>
          <Footer>
          </Footer>
        </Modal>
      </div>
      : null

    const now = this.state.progress;
    const progressBar = this.state.progressBar ?
                          <ProgressBar bsStyle="success" now={now} label={`${now}%`} />
                        : null

    if (this.state.chatData && this.state.chatData.length > 0) {
      chats = this.state.chatData.map((chat) => {
        var messageType = chat.messageType;
        let fileName = chat.message;
        let fileId = chat.fileName; 
				var message;
				if(chat.messageType == 'FILE' || chat.messageType == 'MEDIA') {
          let chatMessage = chat.message.substring(chat.message.indexOf("_") + 1);
					let link = "/uploads/"+chat.message;
					let ext = chatMessage.split('.').pop()	
		    	let src = "/images/icons/"+ext+".png" 
			    message =  <div>
              <img src={src} />
              <span className={styles.textField}>{chatMessage}</span>
              <Link id="download" href={link} download>
              	<span className={styles.downloadFile}><FontAwesome name="arrow-circle-o-down"></FontAwesome></span>
              </Link>
            </div>
				} else if(chat.messageType == 'IMG') {
          let chatMessage = chat.message.substring(chat.message.indexOf("_") + 1);
		    	let src = "/uploads/"+chat.message;
          message = <div>
            <div className={styles.chatMediaBox}>
            	<img id="Image" src={src} key={chat.message} title={chatMessage} onClick={this.handleImage.bind(this,chat.message, chat.messageType)}/>
            </div>
            <Link id="download" href={src} download> 
            	<span className={styles.downloadMedia}><FontAwesome name="arrow-circle-o-down"></FontAwesome></span>
            </Link>
          </div>
				} else if(chat.messageType == 'VIDEO') {
          let chatMessage = chat.message.substring(chat.message.indexOf("_") + 1);
		    	let src = "/uploads/"+chat.message;
        	message = <div>
            <div className={styles.chatMediaBox}>
            	<video id="video" src ={src} key={chat.message} title={chatMessage} onClick={this.handleImage.bind(this,chat.message, chat.messageType)}/>
            </div>
            <Link id="download" href={src} download> 
            	<span className={styles.downloadMedia}><FontAwesome name="arrow-circle-o-down"></FontAwesome></span>
            </Link>
          </div>
				} else if(chat.messageType == 'VIMEO'){
          var duration = '';
          if(chat.duration) {
            var m = chat.duration / 60 | 0;
            var s = chat.duration % 60 | 0;
            duration = moment.utc().minutes(m).seconds(s).format("mm:ss");  
          }          
          let src=chat.vimeoThumbnail?chat.vimeoThumbnail : "/images/black-icons/black-start.png";
          let title = chat.title ? chat.title : 'No Name';
          message = <div className={styles.mediaListBlock}>
                    <ul>
                      <li key={chat._id}>
                        <Link>
                          <div className={styles.videoThubBox}>
                            <div className={styles.timeDisplay}><p>{duration}</p></div>
                            <img id="urlVideo" src={src} key={fileId} onClick={this.handleURLVideo.bind(this,{fileId},{messageType})} title={title}/>
                          </div>
                        </Link>
                        <label title={title}>{title}</label>
                      </li>
                    </ul> 
                  </div>  
        } else if(chat.messageType == 'YOUTUBE'){          
          let src = "http://img.youtube.com/vi/"+fileId+"/1.jpg";
          let title = chat.title ? chat.title : 'No Name';
          message = <div className={styles.mediaListBlock}>
                    <ul>
                      <li key={chat._id}>
                        <Link>
                          <div className={styles.videoThubBox}>
                            <div className={styles.timeDisplay}><p>{chat.duration ? moment.duration(chat.duration).minutes()+":"+moment.duration(chat.duration).seconds() : null}</p></div>
                            <img id="urlVideo" src={src} width="100" height="100" key={fileId} onClick={this.handleURLVideo.bind(this,{fileId},{messageType})} title={title}/>
                        </div>
                        </Link>
                        <label title={title}>{title}</label>
                      </li>
                    </ul> 
                  </div>
        } else if (chat.messageType == 'URL') {
          if(!fileName.match(/http/g)) {
            var addHead = "https://";
            var url = addHead + fileName;    
            
          } else {
            var url = fileName;
          }
          message = <a id="file" href={url} target = "_blank" ><p>{fileName}</p></a>
        } 
        else {
					message = <p>{chat.message}</p>
				}
      
        var pic = '/images/profile-pics/defaultStudent.jpg';
        // console.log("this.state.progressBar", this.state.progressBar);
        let currDate = moment().endOf('day');
        let msgDate = moment(chat.createdOn).endOf('day');
        let sentOn = moment(chat.createdOn).seconds(0).format('hh:mm A');
        if(+currDate > +msgDate)
          sentOn = moment(chat.createdOn).format('DD-MM-YY hh:mm A');
        if (chat.sentBy && chat.sentBy.profile && chat.sentBy.profile.profileImage)
          pic = "/uploads/" + chat.sentBy.profile.profileImage;

        return (
          chat.sentBy && chat.sentBy._id ?
          <li key={chat._id}>
					<div className={cls_selfPostMsg}>
						<Link id="viewprofile" className={guestStatus ? styles.avatarCircle40Guest : styles.avatarCircle40} onClick={this.viewUser.bind(this, chat.sentBy._id)} title={this.props.intl.messages.viewprofile} >
							<img src={pic} />
						</Link>
						<div className={styles.listedMsgBlock}>
							<div className={styles.avatarNameBlock}>
								<h2>{chat.sentBy.firstname} {chat.sentBy.lastname}</h2>
								<p>
									<FontAwesome name="clock-o"></FontAwesome> {sentOn}
								</p>
							</div>
							<div className={styles.listedMsg}>
								{message}
							</div>
						</div>
					</div>
				  </li> : null
        );
      });
    } else {
      chats = <li> <FormattedMessage id ='start_chating'/> </li>;
    }


		return(
			<div className={styles.whiteboard}>
      <ToastContainer
        toastMessageFactory={ToastMessageFactory}
        ref="chatscontainer"
        className="toast-bottom-right"
       />
			<div className={styles.whiteBoardContainer}>
				<div className={styles.roomChatContainer}>

					<div className={styles.roomChatMsnger} id="roomChatBody">

						<div className={styles.roomChatList}>
							<ul>
								{chats}
							</ul>
						</div>
					</div>
          {(!this.props.noConference) ?
  					<div className={styles.roomChatTypeMsg}>
  						<div className={styles.writeMsg}>
  							<div className={styles.attachIcon} title={self.context.intl.messages.attach_file}>
  								<label htmlFor="fileRoomInput">
  									<FontAwesome name="paperclip"></FontAwesome>
  								</label>
  								<input id="fileRoomInput" type="file" ref="fileRoomInput" id="fileRoomInput" accept=".xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf,.odp,.odt,.ods,.png,.jpeg,.jpg,.gif,.wav,.mp3,.wmv,application/zip,.mp4,.mkv" onChange={this.handleUpload.bind(this)} value={''}/>
  							</div>
  							<div className={styles.msgInput}>
  								<input id="roomchatinput" type="text" ref="roomchatinput" className={styles.msgInputTxt} placeholder={this.props.intl.messages.say_something} onChange={this.handleChange} value={this.state.msgContent} onKeyPress={this.handleChange} />
  							</div>
  							<div id="sendMessage" className={styles.attachIcon} title={this.props.intl.messages.push_the_message} onClick={this.sendMsg}>
  								<img src="/images/black-icons/black-paper-plane.png" />
  							</div>
                {this.props.imHost ?
                  <span>
                    <div id="exportChat" className={styles.attachIcon}  title={this.props.intl.messages.export_chat} onClick={this.exportChat}>
                    <label htmlFor="exportChat">
                      <img src="/images/black-icons/black-export.png" alt="Export Chat" />
                      </label>
                    </div>
                    <div id="clearChat" className={styles.attachIcon} title={self.context.intl.messages.clear_room_chat} onClick={this.handleClearChat.bind(this)}>
                      <label htmlFor="clearChat">
                      <img src="/images/black-icons/delete-box-black.png" alt="Clear Chat" />
                    {/*<FontAwesome name="trash" size="2x"></FontAwesome>*/}
                      </label>
                    </div>
                  </span>
                  : null
                }
  						</div>            
  					</div>
          : null}
				</div>
			</div>
			{showImageModal}
      {progressBar}
      {
          this.state.download
          ?
          <a href={this.state.fileName} id="export" download > </a>
          : null
        }
			</div>
			);

	}

}

RoomChat.contextTypes = {
  intl: React.PropTypes.object.isRequired
};

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    intl: state.intl,
    loggedInData: loggedInData(state)
  };
}

RoomChat.propTypes = {
  intl: PropTypes.object,
};

export default connect(mapStateToProps)(RoomChat);
