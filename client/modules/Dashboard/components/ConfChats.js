import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { injectIntl, intlShape,FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';
import { loggedInData } from '../../Login/LoginReducer';
import {chatData} from './group/ChatReducer';
import { sendMessage, getChatData, clearChatData/*, setActiveChat*/ } from './group/ChatActions';
import moment from 'moment';
import {Col, Row, Modal, ProgressBar} from 'react-bootstrap';
import SocketHandler from '../../Communication/SocketHandler';

import mainStyles from '../../Layouts/DashLayout/DashLayout.css';
import styles from '../../Layouts/DashLayout/components/ConfSettings.css';
import style from '../Dashboard.css';
import {Header, Title, Body, Footer} from 'react-bootstrap/lib/Modal';
import dashStyles from '../Dashboard.css';
import { browserHistory } from 'react-router';
import  {ToastContainer, ToastMessage} from '../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);

class ConfChats extends Component {

  constructor() {
      super();
      this.state = {
        msgContent : '',
        showImageModal : false,
        fileName : '',
        fileType : '',
        progress : '',
        progressBar : false,
        fileName : '',
        fileId :'',
      };
      this.imageData = {};
      this.temp = '';
  }

  componentDidMount() {
    if (this.props.chatData && this.props.chatData.activeData) {
      let obj = { sentTo : this.props.chatData.activeData._id,
                  chatType : this.props.chatData.chatType
                }
      SocketHandler.setActiveChat(obj.sentTo);
      this.props.dispatch(getChatData(obj));
      this.refs.chatinput.focus();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    var objDiv = document.getElementById("chatBody");
    if(objDiv != undefined) {
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  }

  handleChange = (e) => {
    this.setState({ msgContent : e.target.value });
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
      var retVal = new RegExp(regexQuery,"i");
      if(retVal.test(url)) {  
        url.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);        
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
        //console.log("messageType", messageType);  
      } else {
        messageType = "TXT";        
      }
      let obj = {
        command : "IND-CHAT",
        chatData : {
                    sentBy : this.props.loggedInData.data._id,
                    chatType : this.props.chatData.chatType,
                    messageType : messageType,
                    message : url,
                    fileName : fileName
                  }
      }
      //console.log("sent chatdata", chatData);
      if(this.props.chatData.chatType == 'Indi') {
        obj.chatData['sentTo'] = this.props.chatData.activeData._id;
      } else if (this.props.chatData.chatType == 'Group') {
        obj.chatData['sentToGroup'] = this.props.chatData.activeData._id;
      }
      //console.log("obj before send === ",obj);
      // SocketHandler.sendInstaMessage(obj, this.state.userId);
      //Chnaged by rajesh for clearing the chat message
      this.temp = this.state.msgContent;
      this.setState({ msgContent: '' });
      this.props.dispatch(sendMessage(obj.chatData)).then(res => this.clearInput(res, obj));
    }
  }

  clearInput(res, obj) {
    if(res.status) {
      // this.setState({ msgContent : '' });
      SocketHandler.sendInstaMessage(obj, this.props.chatData.activeData._id);
    } else {
      //assign previous value when error come from res
      this.setState({ msgContent: this.temp });
      this.refs.chatscontainer.error(res.error);
    }
  }

  handleUpload = (e) => {
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
      if (data.lengthComputable) {                                            
          var progress = parseInt( ((data.loaded / data.total) * 100), 10 );
          // console.log(progress);
          if (progress == 100) {
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
      command : "IND-CHAT",
      chatData : {
        sentBy : this.props.loggedInData.data._id,
        chatType : this.props.chatData.chatType,
        messageType : messageType,
        message : data.fileName,
        file : data.file,
        fileSize : data.fileSize
      }
    }
    if(this.props.chatData.chatType == 'Indi') {
      obj.chatData['sentTo'] = this.props.chatData.activeData._id;
    } else if (this.props.chatData.chatType == 'Group') {
      obj.chatData['sentToGroup'] = this.props.chatData.activeData._id;
    }
    // console.log(obj.chatData);
    this.props.dispatch(sendMessage(obj.chatData)).then(res => this.clearInput(res, obj));
  }

  handleImage(imageName, fileType){
    this.setState({
      showImageModal : true,
      fileName : imageName,
      fileType : fileType
    })    
  }

  hideImageModal() {
    this.setState({
      showImageModal : false,
      fileName : '',
      fileType : ''
    })
  }

  hideCallback = () => {
    let obj = {};
    if(this.props.chatData.chatType == 'Indi') {
      obj['current'] = 'contacts';
    } else if (this.props.chatData.chatType == 'Group') {
      obj['current'] = 'groups';
    }
    this.props.handleMenu(obj);
    this.props.dispatch(clearChatData());
    SocketHandler.clearActiveChat();
  }

  viewUser(id) {
    if(this.props.loggedInData && this.props.loggedInData.data && !this.props.loggedInData.data.guest){
      browserHistory.push('/profile/'+id)      
    }
  }

  handleURLVideo(fileName, fileType) {
    this.setState({
      showImageModal : true,
      fileId : fileName.fileId,
      fileType : fileType.messageType,     
    });
  }

  render(){
    
    let cls_headerList = `${styles.modHeaderList} clearfix`;
    let cls_midTitle    = `${styles.midTitle} pull-left`;
    let cls_block50     = `${styles.block50} pull-right`;
    // let cls_block50_l     = `${styles.block50} pull-left`;
    let cls_block50_mob_back = `${styles.block50} pull-left`;
    let cls_headerText  = `${styles.headerText} pull-left`;
    let cls_optionBlock = `${styles.optionsBlock} pull-right`;
    let cls_settingsOptions = `${styles.settingsOptionInput} ${styles.radio}`;
    let cls_elasticBar = `${mainStyles.elasticSideBar}`;
    let cls_modChatFooter  = `${styles.modChatFooter} clearfix`;
    let cls_chatWrite       = `${styles.chatWrite} pull-left`;
    let cls_formControl     = `${styles.formControl} ${styles.formControlChatOverwrite}`;
    let cls_sendMessage = `pull-right ${styles.sendMessage}`;

    let cls_chatsList = `${styles.indiChatFixed} ${styles.openIndiChat}`;

    //code changed by - Najib, Desc - Checking guest user and setting status variable 
    let guestStatus = false;
    if(this.props.loggedInData && this.props.loggedInData.data && this.props.loggedInData.data.guest){
      guestStatus = true;         
    }
    let varLink = '';
    if(this.state.fileType == "YOUTUBE") {
      varLink = "https://www.youtube.com/embed/"+this.state.fileId;
    } else if (this.state.fileType == "VIMEO") {
      varLink = "https://vimeo.com/"+this.state.fileId;
    } else {
      let showFileName = '';
      let extn = '';
      showFileName  = this.state.fileName.substring(this.state.fileName.indexOf("_") + 1);

      //code changed by - Najib, Desc- Limiting file name if exceeds 35 character 
      extn = showFileName.substring(showFileName.lastIndexOf('.')+1, showFileName.length) || showFileName; 
      if(showFileName.length>35) {
        varLink = showFileName.substr(0,35) + '...' + extn; 
      } else {
        varLink = showFileName;
      } 
    }

    const youTubeLink = "https://www.youtube.com/embed/"+this.state.fileId;
      const vimeoLink = "https://player.vimeo.com/video/"+this.state.fileId+"?api=1&player_id=player_1"

    let chats = 'Start chatting....!';
    let chatData = this.props.chatData;
    // console.log("chatData----", chatDatas);
    const fileURL = "/uploads/"+this.state.fileName;
    const fileName = this.state.fileName.substring(this.state.fileName.indexOf("_") + 1);
    const showImageModal = this.state.showImageModal
    ?
      <div>
        <Modal show={this.state.showImageModal} onHide={this.hideImageModal.bind(this)}>
          <Header closeButton>
              <Title className={style.popHeadingAllExtra} >{varLink}</Title>
            </Header>
            <Body>
              <div className={style.mediaView}>
                {
                  (this.state.fileType == "VIDEO" ?   
                    <div className={style.videoWrapper}> 
                      <video src={fileURL} controls/> 
                    </div>
                  :  
                    (this.state.fileType == "IMG" ? 
                      <img alt="document image" src={fileURL}/>
                    :
                      (this.state.fileType == "YOUTUBE" ? 
                        <div className={style.videoWrapper}>
                          <iframe src={youTubeLink}></iframe>
                        </div> 
                      :
                        (this.state.fileType == "VIMEO" ? 
                          <div className={style.videoWrapper}>
                            <iframe src={vimeoLink}></iframe>
                          </div> 
                        : null)
                      )
                    )
                  )
                }
              </div>
            </Body>
          <Footer>
          </Footer>
        </Modal>
      </div>
    : null

    const now = this.state.progress;
    const progressBar = this.state.progressBar
    ?
    <ProgressBar bsStyle="success" now={now} label={`${now}%`} />
    : null

    if (chatData && chatData.chatData && chatData.chatData.length > 0) {
      chats = chatData.chatData.map((chat) => {
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
                        <img id="image" src={src} key={chat.message} title={chatMessage} onClick={this.handleImage.bind(this,chat.message, chat.messageType)}/>
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
                    message = <div className={style.mediaListBlock}>
                              <ul>
                                <li key={chat._id}>
                                  <Link>
                                    <div className={style.videoThubBox}>
                                      <div className={style.timeDisplay}><p>{duration}</p></div>
                                      <img id="vimeo" src={src} key={fileId} onClick={this.handleURLVideo.bind(this,{fileId},{messageType})} title={title}/>
                                    </div>
                                  </Link>
                                  <label title={title}>{title}</label>
                                </li>
                              </ul> 
                            </div>  
                  } else if(chat.messageType == 'YOUTUBE'){          
                    let src = "http://img.youtube.com/vi/"+fileId+"/1.jpg";
                    let title = chat.title ? chat.title : 'No Name';
                    message = <div className={style.mediaListBlock}>
                              <ul>
                                <li key={chat._id}>
                                  <Link>
                                    <div className={style.videoThubBox}>
                                      <div className={style.timeDisplay}><p>{chat.duration ? moment.duration(chat.duration).minutes()+":"+moment.duration(chat.duration).seconds() : null}</p></div>
                                      <img id="youtube" src={src} width="100" height="100" key={fileId} onClick={this.handleURLVideo.bind(this,{fileId},{messageType})} title={title}/>
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
                  let currDate = moment().endOf('day');
                  let msgDate = moment(chat.createdOn).endOf('day');
                  let sentOn = moment(chat.createdOn).seconds(0).format('hh:mm A');
                  if(+currDate > +msgDate)
                    sentOn = moment(chat.createdOn).format('DD-MM-YY hh:mm A');
                  if(chat.sentBy._id == this.props.chatData.activeData._id){

                    if (chat.sentBy && chat.sentBy.profile && chat.sentBy.profile.profileImage)
                      pic = "/uploads/" + chat.sentBy.profile.profileImage;
                    return (<div className={styles.selfChatBox} key={chat._id}>
                              <Link className={ guestStatus ? styles.avatarCircleGuest : styles.avatarCircle}>
                                <img id="viewprofile" src={pic} onClick={this.viewUser.bind(this, chat.sentBy._id)} title={this.props.intl.messages.viewprofile}/>
                              </Link>
                              <p>{chat.sentBy.firstname} {chat.sentBy.lastname}</p>
                              <h6>{sentOn}</h6>
                              <div className={styles.messageBox}>
                                {message}
                              </div>
                            </div>)
                  } else {                    
                    if (chat.sentBy && chat.sentBy.profile && chat.sentBy.profile.profileImage)
                      pic = "/uploads/" + chat.sentBy.profile.profileImage;
                    return (<div className={styles.otherChatBox} key={chat._id}>
                              <Link className={styles.avatarCircle}>
                                <img id="viewprofile" src={pic} onClick={this.viewUser.bind(this, chat.sentBy._id)} title={this.props.intl.messages.viewprofile}/>
                              </Link>
                              <p>{chat.sentBy.firstname} {chat.sentBy.lastname}</p>
                              <h6>{sentOn}</h6>
                              <div className={styles.messageBox}>
                                {message}
                              </div>
                            </div>)
                  }
              });
    }
    let lastname = chatData.activeData && chatData.activeData.lastname ? chatData.activeData.lastname : '';
    let headName = chatData.chatType == 'Indi' ? (chatData.activeData.firstname+" "+lastname) : chatData.activeData.groupName;
    return (
      <aside className={cls_chatsList} id="blockIndiChat">
        {progressBar}
        <div className={styles.tableBlock}>
          <div className={styles.modAsideHeader}>
            <ToastContainer
              toastMessageFactory={ToastMessageFactory}
              ref="chatscontainer"
              className={styles.toastTop}
             />
            <div className={cls_headerList}>
              <div className={cls_block50_mob_back} title={this.props.intl.messages.close} id="closeIndiChat" onClick={this.hideCallback}>
                <img src="/images/black-icons/black-left-arrow.png" />
              </div>
              <Link id="viewprofile" className={cls_midTitle} onClick={this.viewUser.bind(this, this.props.chatData.activeData._id)} title={this.props.intl.messages.viewprofile}><h2>{headName}</h2></Link>
              <div className={cls_block50} title={this.props.intl.messages.attach_file}>
                <div className={styles.fileUpload}>
                  <label htmlFor="fileInput">
                    <FontAwesome name="paperclip" />
                  </label>
                  <input type="file" ref="fileInput" id="fileInput" accept=".xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf,.odp,.odt,.ods,.png,.jpeg,.jpg,.gif,.wav,.mp3,.wmv,application/zip,.mp4,.mkv" onChange={this.handleUpload.bind(this)} value={''}/>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.modChatBody} id="chatBody">
            <div className={styles.modChatContainer}>
              {chats}
            </div>
          </div>              
          <div className={cls_modChatFooter}>
            <div className={cls_chatWrite}>
              <input id="chatInput" type="text" ref="chatinput" className={cls_formControl} placeholder={this.props.intl.messages.say_something} onChange={this.handleChange} value={this.state.msgContent} onKeyPress={this.handleChange} />
            </div>
            <div id="sendBtn" className={cls_sendMessage} title={this.props.intl.messages.push_the_message} onClick={this.sendMsg} >
              <img src="/images/black-icons/black-paper-plane.png" />
            </div>
          </div>
        </div>
        {showImageModal}
      </aside>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    intl: state.intl,
    loggedInData : loggedInData(state),
    chatData: chatData(state),
  };
}

ConfChats.propTypes = {
  intl: PropTypes.object,
  handleMenu: PropTypes.func,
  loggedInData: PropTypes.object,
  chatData: PropTypes.object,
};

export default connect(mapStateToProps)(ConfChats);
