import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

import AuthClient from '../../../../components/AuthController';
import { isLoggedIn } from '../../../Login/LoginActions';
import { loggedInData } from '../../../Login/LoginReducer';
import Validator from '../../../../components/Validator';
import { getRoomData, RoomTopicList, RoomTopicStore, UpdateRoomSchema, ClearRoom, DeleteFile, DeleteMultipleFile, getRoomTopicData,RoomTopicFileList, NewFileUpload, setUploadFileDescRequest, handleFileEnable } from '../RoomActions';
//import { addRoomUser, getRoomData, , getRoomUserData, ClearRoom,UpdateRoomSchema } from '../RoomActions';
import { roomData } from '../RoomReducer';


import ContainerComponent from '../../../../components/ContainerComponent';

import ListUserToRoom from '../components/ListUserToRoom';
import DataTable from '../../../../components/DataTable/DataTable';

// import {roomSchema} from '../schema/RoomSchema';
import {roomTopicSchema} from '../schema/RoomSchema';
import {roomEditSubMenu, roomTopicMainMenuUpload} from '../schema/RoomMenu';

import SubMenu from '../../../../components/SubMenu';
import TopMenu from '../../../../components/TopMenu';

// Import Style
import styles from '../../../../components/component.css';
// import styles from '../../Admin.css';

 import { Roles } from '../../../../roles.js';
import {Col, Row, Grid, Modal} from 'react-bootstrap';
import {Header, Title, Body, Footer} from 'react-bootstrap/lib/Modal';
import  {ToastContainer, ToastMessage} from '../../../../lib';
import isServer from 'detect-node';

import { intlData } from '../../../Intl/IntlReducer';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
const FileAPI = !isServer ? require('fileapi') : null;
import { loginLanguage } from '../../../Intl/IntlActions';
import Uploading from '../../../../components/Uploading';
import { setWorkDashboard } from '../../../Dashboard/UserDashboard/components/WorkDashboardActions';
import WoogeenManager from '../../../Communication/WoogeenManager';
import { workDashboardData } from '../../../Dashboard/UserDashboard/components/WorkDashboardReducer';

var dataObject = {};
var deletingIDs = [];

class UploadToTopic extends Component {
  constructor(props){
    super(props);

    this.state = {
      showUploader: false,
      filerType : 0,
      filterValue : '',
      searchValue : '',
      checkValue :'',
      urlInputValue : '',   
      uploading : false,
      showAddDescriptionModal : false,
      desc : '',
      uploadId : '',
      loading : true
    }
    this.imageData = {};
    
    this.schema = roomTopicSchema;
    this.res = {};
 
    this.submenu = Validator.activeSubMenu(roomEditSubMenu, "lnkRoomTopic"); 
    this.mainmenu = roomTopicMainMenuUpload;
    this.getData = this.getData.bind(this);
    //this.clear = this.clear.bind(this);
    this.currentPage= 1;
    this.itemsPerPage= 5;
  
    this.viewRoomTopic = this.viewRoomTopic.bind(this);
    this.editRoomTopic = this.editRoomTopic.bind(this);
    this.downloadFile = this.downloadFile.bind(this);
    this.deleteFile = this.deleteFile.bind(this);
    this.fileFilter = this.fileFilter.bind(this);
    this.searchFilter = this.searchFilter.bind(this);
    this.showRecord = this.showRecord.bind(this);
    this.multipleDelete = this.multipleDelete.bind(this);
    this.pdfView = this.pdfView.bind(this);
    this.description = this.description.bind(this);
    this.fileEnable = this.fileEnable.bind(this)
    //this.mainmenu.menus[0].action = this.clearError.bind(this);

    this.mainmenu.menus[0].action = this.backButton.bind(this);
    this.mainmenu.menus[1].action = this.multidelete.bind(this);


    this.submenu.menus[0].action = this.viewroom.bind(this);
    this.submenu.menus[1].action = this.adduser.bind(this);
    this.submenu.menus[2].action = this.listtopic.bind(this);
    this.submenu.menus[3].action = this.feedbackList.bind(this); 
    this.submenu.menus[4].action = this.roomConfiguration.bind(this);
    this.submenu.menus[5].action = this.listAssignments.bind(this);
    this.submenu.menus[6].action = this.courseReports.bind(this);

    this.confObject = new WoogeenManager();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.roomData.success != ''){
      this.refs.room_container.success(`${nextProps.roomData.success} `, ``);
      this.props.dispatch(ClearRoom());
    }
  }

  /*componentWillMount() {
    //console.log('componentWillMount')
      this.props.dispatch(isLoggedIn(AuthClient.getSession(), 
                    '/admin/room/list')).then(res => this.setdata(res));
  }*/

  componentDidMount() {
    this.setdata(this.props.loggedInData)
  }

  setdata(result){
    if (result && result.data && result.data._id) {
      this.props.dispatch(loginLanguage(result.data, this.props.intlData.setlocale));
      var obj = {
      uid : result.data._id,
      roomId : this.props.params.rid
    }
    this.props.dispatch(RoomTopicStore({obj}));
    this.getData({
      currentPage  : this.currentPage,
      totalItems   : 0,
      itemsPerPage : this.itemsPerPage
    });
    this.props.dispatch(getRoomData(obj,''));
    }
  }



  /*setdata(result){
    //console.log('result')
    var obj = {
      uid : result.data._id,
      roomId : this.props.params.rid
    }
    this.props.dispatch(RoomStore({obj}));
    this.getData({
      currentPage  : this.currentPage,
      totalItems   : 0,
      itemsPerPage : this.itemsPerPage
    });
  }*/


  getData(pageParam){

    // pageParam["uid"] = this.props.loggedInData.data._id;
    pageParam["roomId"] = this.props.params.rid;
    pageParam["topicId"] = this.props.params.tid;
    pageParam["filterValue"] = this.state.filterValue;
    pageParam["searchKeyword"] = this.state.searchValue;

    // Change By - Najib, Desc - Calling setLoading in promise to set state after receiving response from server    
    if(_.isEmpty(this.props.roomData.topicFileList)) {
      this.setState({loading : true}); 
    } else {         
      this.setState({loading : false});
    }
    this.props.dispatch(RoomTopicFileList(pageParam, pageParam.currentPage)).then(res => this.pageData(res));
  }

  pageData(response){
    //console.log("pageData---", res);
    if(response.status == false){
      this.refs.room_container.error(`${response.error} `, ``);
    }
    if(this.state.loading) {
      this.setState({loading : false});  
    }
  }
   
  viewRoomTopic(row){
    var link = "/admin/room/listtopic/"+row._id+'/'+row.roomId;
    //console.log("link === ",link)
    return (
      <Link to={link}><i className="fa fa-eye"></i></Link>
    );
  }
  
  editRoomTopic(row){
    //console.log(row)
    var link = "/admin/room/edittopic/"+row._id+'/'+row.roomId;
    //console.log("link === ",link)
    return (
      <Link to={link}><i className="fa fa-pencil"></i></Link>
    );
  }

  // downloadFile(row){
  //   //console.log(row);
  //   var link = "/uploads/"+row.fileName;
  //   return (
  //     <a href={link} download><i className="fa fa-upload"></i></a>
  //   );
  // }

  downloadFile(row){
    //console.log(row);
      var link = "/uploads/"+row.fileName;
      if(row.fileType == 'link') {
        return (
          <p><FormattedMessage id ='not_allowed'/></p>
        );            
      } else {
        return (
        <a id="downloadFile" href={link} download><i className="fa fa-download"></i></a>
      );
    }
  }

  deleteFile(row){
  let deleteFileAccess = row.createdBy == this.props.loggedInData.data._id || this.props.loggedInData.data.role == Roles.Lmsadmin || this.props.loggedInData.data.role == Roles.Superadmin ?
    (
      <a id={row._id} onClick = {this.deletetopicFile} ><i className="fa fa-trash-o " ></i></a>
    ):"Not Allowed";
    return deleteFileAccess
  }

  multipleDelete(row){
    deletingIDs = [];
    if(deletingIDs.includes(row._id)){
      var checked = true
    }
    return(
      <input type="checkbox"
          id={row._id}
          value={row.fileName} onChange = {this.deleteMultipleTopicFile.bind(this, row)} checked = {checked}/>
    );
  }
  deleteMultipleTopicFile = (row, e)=>{
    if(row.createdBy == this.props.loggedInData.data._id || this.props.loggedInData.data.role == Roles.Lmsadmin || this.props.loggedInData.data.role == Roles.Superadmin){
      if(deletingIDs.includes(e.currentTarget.id)){
        var index = deletingIDs.indexOf(e.currentTarget.id);
        deletingIDs.splice(index, 1);
      }else{
        deletingIDs.push(e.currentTarget.id);
      }
    }else {
      var str = row.fileName;
      var a = str.split('_');
      this.refs.room_container.error('Permission denied; '+a[1]+' has been uploaded by Admin.');
    }
  }

  showRecord(row){
    if(row.fileType == 'link') {
      let youtube = "https://www.youtube.com/watch?v="+row.fileName;
      return youtube;
    } else {
      let fileName = row.fileName.substring(row.fileName.indexOf("_") + 1);
      return fileName
    }
  }

  deletetopicFile=(e)=>{
    var id = e.currentTarget.id;
    var props = this.props;    
    var response = this.setdeleteresponse

    alertify.confirm(this.props.intl.messages.warning,this.props.intl.messages.delete_file_alert, 
      function (result) {
        if(result) {          
          let obj = {
            roomId : props.params.rid,
            _id : id,
            topicId : props.params.tid
          }
          props.dispatch(DeleteFile(obj, '')).then(res => response(res, obj.topicId, obj._id)); 
        }
      },
      function() {

      }
    ).setting('labels',{'ok': this.props.intl.messages.ok,'cancel': this.props.intl.messages.cancel});;    
  }

  setdeleteresponse = (res, tId, fId) => {
    //changeBy: pranathi, disc: reloading the topic content component in conference side at the time of file deleting

    let obj = {
      command : 'RELOAD_UPLOAD_FILES',
      content : { tid: tId },
      type : 'OBJECT'
    };
    this.confObject.sendMessage(obj, 0);

    let pdfViewObj = {
      command : 'RELOAD_TOPIC_PDFVIEW',
      content : { tid: tId, fileId: fId},
      type : 'OBJECT'
    }
    
    this.confObject.sendMessage(pdfViewObj, 0);

    this.getData({
      currentPage  : this.currentPage,
      totalItems   : 0,
      itemsPerPage : this.itemsPerPage
    });
  }

  viewroom = () => {
    // console.log("ViewRoomSubtab");
    var roomId = this.props.params.rid;
    browserHistory.push('/admin/room/view/'+roomId);
  }

  adduser = () => {
    // console.log("AddUserSubtab");
    var roomId = this.props.params.rid;
    browserHistory.push('/admin/room/adduser/'+roomId);
  }

  listtopic = () => {
    // console.log("AddUserSubtab");
    var roomId = this.props.params.rid;
    browserHistory.push('/admin/room/listtopic/'+roomId);
  }

  feedbackList = () => {
    // console.log("AddUserSubtab");
    var roomId = this.props.params.rid;
    browserHistory.push('/admin/room/room-feedback-list/'+roomId);
  }

  roomConfiguration = () => {
    var roomId = this.props.params.rid;
    browserHistory.push('/admin/room/configuration/'+roomId);
  }
  
  courseReports = (e) => {
    var roomId = this.props.params.rid;
    browserHistory.push('/admin/room/attendance/'+roomId);    
  }

  listAssignments = () => {
    var roomId = this.props.params.rid;
    browserHistory.push('/admin/room/assignments/'+roomId);
  }

  showOrHideScheduler(){
    if(this.state.showUploader){
      this.setState({ showUploader : false});
      //this.props.dispatch(clearSchedule());
    }else{
      this.setState({ showUploader : true});
    }
  }

  backButton = () => {
    // console.log("AddUserSubtab");
    var roomId = this.props.params.rid;
    browserHistory.push('/admin/room/listtopic/'+roomId);
  }

  multidelete(){ 
    if(deletingIDs.length <= 0){
      this.refs.room_container.error('No file selected', ``);
    }else{
      var props = this.props;    
      var response = this.setmultipledeleteresponse

      alertify.confirm(this.props.intl.messages.warning,this.props.intl.messages.delete_all_files_alert, 
        function (result) {
          if(result) {          
            let obj= {
              topicId : props.params.tid,
              roomId : props.params.rid,
              // uid : props.loggedInData.data._id,
              idsDelete : deletingIDs
            }
            props.dispatch(DeleteMultipleFile(obj, '')).then(res => response(res, obj.topicId, obj.idsDelete)); 
          }
        },
        function() {

        }
      ).setting('labels',{'ok': this.props.intl.messages.ok,'cancel': this.props.intl.messages.cancel}); 
    } 
  }

  setmultipledeleteresponse = (res, tId, fileIds) => {
    let obj = {
      command : 'RELOAD_TOPICS_CONTENT',
      content : { tid: tId },
      type : 'OBJECT'
    };
    this.confObject.sendMessage(obj, 0);

    let pdfViewObj = {
      command : 'RELOAD_TOPIC_PDFVIEW',
      content : { tid: tId, fileIds: fileIds},
      type : 'OBJECT'
    }
    
    this.confObject.sendMessage(pdfViewObj, 0);
    

    this.getData({
      currentPage  : this.currentPage,
      totalItems   : 0,
      itemsPerPage : this.itemsPerPage
    });
    deletingIDs = []
  }

  saveFile(obj){
    //console.log(obj)
    this.setState({ 
      showUploader : false,
      uploading : true
    });
    obj['topicId'] =  this.props.params.tid,
    obj['roomId'] = this.props.params.rid,
    obj['uid'] = this.props.loggedInData.data._id;
    let data = obj;
    let url = "/api/uploadroomtopicfile";
    let self =  this;
    // console.log("data - -  - ", data);
    FileAPI.upload({
        data,
        url,
        complete:function(err,res) {
          //console.log(err)
          if(err) {
            console.log("err---",err);
            self.setState({
              uploading : false
            })
            self.refs.room_container.error(err);
          } else {
            // console.log("topic file upload success--- ", res);
            let resData = JSON.parse(res.response);
            // console.log('resData',resData);
            if(resData.status) {
              self.getData({
                currentPage  : self.currentPage,
                totalItems   : 0,
                itemsPerPage : self.itemsPerPage,
                filterType   : self.state.filterValue

              });
              self.setState({
                uploading : false
              })
              self.refs.room_container.success(`${resData.message} `, ``);
              self.props.dispatch(NewFileUpload(resData))

              /*data = JSON.parse(res.response);
              self.props.dispatch(newUpload(data))*/
            } else {
              self.setState({ uploading : false });
              self.refs.room_container.error(resData.error);
            }
          }
        }
      });
    /*obj["uid"] = this.state.userData._id;
    this.props.dispatch(setSchedule(obj, this.props.dashboardData.upcoming)).then(res => {
      this.setResponse(res);
    });*/
    //this.props.dispatch(UploadTopicFile(obj));
  }

  fileFilter = (e) =>{
     e.preventDefault();
    this.state.filterValue = e.target.value ;
    this.getData({
      currentPage  : this.currentPage,
      totalItems   : 0,
      itemsPerPage : this.itemsPerPage
    });
  }

  searchFilter(e){
    e.preventDefault();
    var expVal = e.target.value.trim();
    var pattern = new RegExp(/[+*()?\\]/);
    if(!pattern.test(expVal)){
      this.state.searchValue = e.target.value.trim();
      this.getData({
        currentPage  : this.currentPage,
        totalItems   : 0,
        itemsPerPage : this.itemsPerPage
      });
    }    
  }
  handleUpload = (e) => {
    //console.log(e.target)
    var reader = new FileReader();
    var file = e.target.files[0];
    if (!file){
      return;
    } else if (file.size>20971520) {
      alertify.alert(this.props.intl.messages.warning,this.props.intl.messages.topic_file_alert, 
        function() {
        }
      ).setting({'label': this.props.intl.messages.ok});
      return;
    } 
    //console.log(file)
    reader.onload = function(img) {
      //console.log(img)
      let dataURI = img.target.result;
      //console.log('dataURI')
      this.imageData["file"] = dataURI.split(',')[1];
      this.imageData["fileName"] = file.name;
      this.imageData["fileSize"] = file.size;
      // console.log(file.type)
      if(file.type == 'application/zip'){
        this.imageData["fileType"] = 'zip'
      }else{
        this.imageData["fileType"] = file.type.substring(0, file.type.indexOf("/"))
      }
      let data = this.imageData;
      this.saveFile(data);   
    }.bind(this);
    reader.readAsDataURL(file);
  }

  handleUrlUpload(value) {
    var url = value;
    if(url == ''){
      alertify.alert(this.props.intl.messages.warning,this.props.intl.messages.url_alert, function() {
        }).setting({'label': this.props.intl.messages.ok}); 
    }
    if (url != undefined || url != '') {        
      var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
      var match = url.match(regExp);
      if (match && match[2].length == 11) {
        url = url.substring( url.indexOf("=")+1).substring(0,11)
        this.imageData["fileName"] = url;
        this.imageData["fileType"] = 'link'
        let data = this.imageData;
        this.saveFile(data);       
        this.setState({
          urlInputValue : ''
        })  
      } else {
        if(url == '') {

        } else {
          alertify.alert(this.props.intl.messages.warning,this.props.intl.messages.valid_url_alert, function() {
            }).setting({'label': this.props.intl.messages.ok});
        }
      }
    }    
  }

  handleUrlValue(e) {
    this.setState({
      urlInputValue : e.target.value
    })
  }

  pdfView(row) {
    let tpid = this.props.params.tid;
    var pdfLink = "/admin/room/viewpdf/"+row._id+"/"+row.roomId+"/"+row.fileName+"/"+tpid;
    let ext = row.fileName.substr(row.fileName.lastIndexOf(".") + 1);
    if ((ext == "doc") || (ext == "docx") || (ext == "odt") || (ext == 'xls') || (ext == 'xlsx') || (ext == 'ods') || (ext == 'ppt') || (ext == 'pptx') || (ext == "txt") || (ext == "jpg") || (ext == "png") || (ext == "jpeg") || (ext == "JPEG")) {
      return <Link id="pdfLink" to={pdfLink}><i className="fa fa-file-pdf-o "></i></Link>
    } else {
      return <span><FormattedMessage id ='not_allowed'/></span>
    }
  }

  description(row) {
    if(row.fileType == 'link') {
      return <span><FormattedMessage id ='not_allowed'/></span>
    } else {
      return <Link id="setDescription" onClick={this.setDescription.bind(this, row._id, row.description)}><i className="fa fa-edit "></i></Link>
    }
  }

  setDescription(id, desc) {
    if(desc == undefined) {
      desc = ''
    }
    this.setState({
      showAddDescriptionModal : true,
      uploadId : id,
      desc : desc
    })
  }

  hideAddDescriptionModal() {
    this.setState({
      showAddDescriptionModal : false,
      uploadId : '',
      desc : ''
    })
  }

  handleDesc(e) {
    this.setState({desc: e.target.value});
    if(e.key == 'Enter'){
      this.setDesc(e);
    }
  }

  setDesc(e) {
    e.preventDefault()
    if(this.state.desc) {
      if (this.state.desc.length > 10) {
        this.refs.room_container.error("Description cannot be more than 10 characters");
      } else {
        let obj = {}
        obj['topicId'] =  this.props.params.tid,
        obj['roomId'] = this.props.params.rid,
        obj['uid'] = this.props.loggedInData.data._id;
        obj['desc'] = this.state.desc;
        obj['uploadId'] = this.state.uploadId;
        obj["filterValue"] = this.state.filterValue;
        obj["searchKeyword"] = this.state.searchValue;
        obj["currentPage"] = this.currentPage,
        obj["totalItems"] = 0,
        obj["itemsPerPage"] = this.itemsPerPage
        this.props.dispatch(setUploadFileDescRequest(obj, obj.currentPage)).then(res => this.descData(res));
      }
    } else {
      this.refs.room_container.error("Please fill the description");
    }
  }

  descData(response) {
    if(response.status == true) {
      this.setState({
        showAddDescriptionModal : false,
        desc : '',
        uploadId : ''
      })
    } else {
      this.refs.room_container.error(`${response.error} `, ``);
    }
  }

  viewDescription(row) {
    if(row.fileType == 'link') {
      return <span>{row.title}</span>
    } else {
      if(row.description) {
        return <span>{row.description}</span>
      } else {
        return <span>-</span>
      }
    }
  }
  handleEnableFile =(e)=> {
    let isEnable = e.currentTarget.value == "true" ? false : true;
    let id = e.currentTarget.id;
    this.props.dispatch(handleFileEnable(isEnable, id)).then(res => this.fileEnableResponse(res));
  }

  fileEnableResponse = (res) => {
    let tId = res && res.fileData && res.fileData.topicId ? res.fileData.topicId : '';
    let fId = res && res.fileData && res.fileData.id ? res.fileData.id : '';
    let topicContentObj = {
      command : 'RELOAD_TOPICS_CONTENT',
      content : { tid: tId },
      type : 'OBJECT'
    };
    this.confObject.sendMessage(topicContentObj, 0);

    let pdfViewObj = {
      command : 'RELOAD_TOPIC_PDFVIEW',
      content : { tid: tId, fileId: fId},
      type : 'OBJECT'
    }

    this.confObject.sendMessage(pdfViewObj, 0);
  }

  fileEnable(row){
    let viewFileEnable = row.createdBy == this.props.loggedInData.data._id ?
      (
        <input type="checkbox"
            id={row._id}
            value={row.isEnable} onChange = {this.handleEnableFile} checked = {row.isEnable}/>
      ): "Not Allowed";
      return viewFileEnable
  }
 
  render() {
    var bredcrumb = (
        <div className={styles.dynamicBreadCrumb}>
            <ul>
              <li> 
                  <Link to="/admin/room/list"><FormattedMessage id = 'all_rooms'/></Link>
              </li>
               <li>/</li>
              <li>
                <Link onClick={this.viewroom}>{this.props.roomData.data.roomName}</Link>
              </li>
              <li>/</li>
              <li>
                <Link onClick={this.listtopic}><FormattedMessage id='topic_list'/></Link>
              </li>
              <li>/</li>
              <li>
                <FormattedMessage id ='upload_list'/>
              </li>
            </ul>
          </div>
        )
    var objDisp = [
          { title : <FormattedMessage id='select' />, type : "function", callback : this.multipleDelete },
          { fieldName : "fileName", title : <FormattedMessage id='file' />, type : "function", callback : this.showRecord },
          { title : <FormattedMessage id='openfile' />, type : "function", callback : this.downloadFile },
          { title : <FormattedMessage id='delete' />, type : "function", callback : this.deleteFile },
          { title : <FormattedMessage id='view' />, type : "function", callback : this.pdfView },
          { title : <FormattedMessage id='desc' />, type : "function", callback : this.viewDescription },
          { title : <FormattedMessage id='set_desc' />, type : "function", callback : this.description },
          { title : <FormattedMessage id='enable' />, type : "function", callback : this.fileEnable },
        ];
        var filter = [
          {type : 'search', id:'fileSearch', selectedfilter : this.searchFilter},
          {type : 'dropdown', id:'fileType', data:[['','all'], ['image','image'], ['zip','zip'], ['audio','audio'], ['video','video']], selectedfilter : this.fileFilter, value:this.state.filterValue}
        ]

    const showAddDescriptionModal = this.state.showAddDescriptionModal
    ?
    <Modal show={this.state.showAddDescriptionModal} onHide={this.hideAddDescriptionModal.bind(this)}>
      <Header closeButton>
        <Title className={styles.popHeadingAll} ><FormattedMessage id='set_desc' /></Title>
      </Header>
      <Body>
        <form className="form-horizontal">
          <div className="form-group">
            <label htmlFor="inputDescription" className="control-label col-md-2" ><FormattedMessage id='desc' /></label>
            <div className="col-md-10">
              <input id="discriptionField" type="text" className="form-control" placeholder={this.props.intl.messages.desc} value={this.state.desc}  onChange={this.handleDesc.bind(this)} ref="description" onKeyPress={this.handleDesc.bind(this)} />
            </div>
          </div>
        </form>
      </Body>
      <Footer>
        <label ></label>
        <button id="save" className={styles.btnApplyAll} onClick={this.setDesc.bind(this)} ><FormattedMessage id='save' /></button>
      </Footer>
    </Modal>
    : null

    if(this.state.uploading) {
      return(
        <Uploading />
      );
    } else {
      return (
        <div>
          <ToastContainer
            toastMessageFactory={ToastMessageFactory}
            ref="room_container"
            className="toast-top-right"
          />

          <DataTable data={this.props.roomData.topicFileList}
              count={this.props.roomData.topicfilecount}
              currentPage = {this.props.roomData.currentFilePage}
              submenu={this.submenu}
              bredCrumb={bredcrumb}
              topmenu={this.mainmenu}
              itemsPerPage={this.itemsPerPage}
              newDataCallback={this.getData}
              dispField={objDisp}
              pageTitle={this.props.intl.messages.room_management}
              listDescreption={this.props.intl.messages.list_files}
              filter={filter}
              listType="Upload"
              handleUpload={this.handleUpload.bind(this)}
              handleUrlUpload={this.handleUrlUpload.bind(this)}
              urlInputValue={this.state.urlInputValue}
              handleUrlValue={this.handleUrlValue.bind(this)}
              loading = {this.state.loading}
          />
          {showAddDescriptionModal}
        </div>
      );
    }
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    intl: state.intl,
    loggedInData: loggedInData(state),
    roomData: roomData(state),
    intlData: intlData(state),
    workDashboardData : workDashboardData(state)
  };
}

UploadToTopic.propTypes = {
  loggedInData: PropTypes.object,
  roomData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

UploadToTopic.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(UploadToTopic);
