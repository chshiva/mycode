import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

import AuthClient from '../../../../components/AuthController.js';
import { isLoggedIn } from '../../../Login/LoginActions';
import { ClearRoom ,SaveRoomAssignment, getAssignmentDataRequest, getTopicDataRequest, deleteAssignmentUploadedFile, getRoomData} from '../RoomActions';
import { roomData } from '../RoomReducer';
import { loggedInData } from '../../../Login/LoginReducer';
import RoomView from '../components/RoomView';
import Validator from '../../../../components/Validator';
import SubMenu from '../../../../components/SubMenu';
import TopMenu from '../../../../components/TopMenu';
import { intlData } from '../../../Intl/IntlReducer';
import {roomEditSubMenu, roomNoTopicSubMenu, roomAssignmentAddMainMenu} from '../schema/RoomMenu';
import { loginLanguage } from '../../../Intl/IntlActions';
// Import Style
import styles from '../../../../components/component.css';
import dashStyles from '../../../Dashboard/Dashboard.css';

import {Col, Row, Grid} from 'react-bootstrap';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import FontAwesome from 'react-fontawesome';
import Uploading from '../../../../components/Uploading';


class EditAssignment extends Component {
  constructor(props){
    super(props);
    this.quill = false;
    this.currentuser = '';
    this.imageData = {};
    
    this.mainmenu = roomAssignmentAddMainMenu;

    this.mainmenu.menus[1].action = this.save.bind(this);//this.save.bind(this);
    this.mainmenu.menus[0].action = this.cancel.bind(this);
    this.submenu = Validator.activeSubMenu(roomNoTopicSubMenu, "lnkAssignments"); 

    //createdBy : pranathi, disc: added submenu click events
    this.submenu.menus[0].action = this.viewroom.bind(this);
    this.submenu.menus[1].action = this.adduser.bind(this);
    // this.submenu.menus[2].action = this.listtopic.bind(this);
    this.submenu.menus[2].action = this.feedbackList.bind(this); 
    this.submenu.menus[3].action = this.roomConfiguration.bind(this);
    this.submenu.menus[4].action = this.listAssignments.bind(this);
    this.submenu.menus[5].action = this.courseReports.bind(this);

    this.state = {
      assignmentName: '',
      assignedTo: '',
      updating: false,
      fileName: false
    }

    this.setDeleteResponse = this.setDeleteResponse.bind(this)
  }

  componentDidMount() {
    this.quill = new Quill(ReactDOM.findDOMNode(this.refs.editor), {
      modules: {
        toolbar: [
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'link', 'videoURL'],
          ['image', 'code-block'],['formula'],
          [{ 'size': ['small', false, 'large', 'huge'] }],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'script': 'sub'}, { 'script': 'super' }],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'align': [] }],
        ],
        formula:true,
      },
      bounds: document.body,
      placeholder: 'Compose an epic...',
      theme: 'snow'  
    }); 
    this.setdata(this.props.loggedInData); 
  }
  
  setdata(result){
    //console.log('result',result)
    if (result && result.data && result.data._id) {
      this.props.dispatch(loginLanguage(result.data, this.props.intlData.setlocale));
    }
    let obj = { 
      assignmentId : this.props.params.aid,
      roomId : this.props.params.cid,
    };
    this.props.dispatch(getTopicDataRequest(this.props.params.cid))
    this.props.dispatch(getAssignmentDataRequest(obj))
    this.props.dispatch(getRoomData(obj,''));
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.roomData.assignmentData != undefined) {
      this.quill.setContents(nextProps.roomData.assignmentData.content); 
      this.setState({
      	assignmentName : nextProps.roomData.assignmentData && nextProps.roomData.assignmentData.assignmentName ? nextProps.roomData.assignmentData.assignmentName : '',
      	assignedTo : nextProps.roomData.assignmentData && nextProps.roomData.assignmentData.assignedTo ? nextProps.roomData.assignmentData.assignedTo._id : ' ',
      })
    }
  }

  save() {
    if(this.state.assignmentName) {
      if (/^\s+$/.test(this.state.assignmentName)) {
        this.refs.assignment_container.error("Assignment name can't have only white spaces");
      } else {
        let content = this.quill.getContents().ops;
        var roomId = this.props.params.cid;
        let topicName = ReactDOM.findDOMNode(this.refs.topic).value
        let obj = { 
          roomId : roomId,
          content : content,
          assignmentName : this.state.assignmentName.trim(),
          assignedTo : topicName,
          uploadData : this.imageData,
          assignmentId : this.props.params.aid
        };
        this.props.dispatch(SaveRoomAssignment(obj)).then(res => this.saveResponse(res));
        this.setState({
          updating: true
        })
      }
    } else {
      this.refs.assignment_container.error('Please fill all the mandatory fields');
    }
  }

  saveResponse(response){
    if(response.status == false){
      this.setState({
        updating : false,
        fileName : false
      })
      this.refs.assignment_container.error(`${response.error} `, ``);

      let quillContent = this.quill.getContents().ops;
      this.quill = new Quill(ReactDOM.findDOMNode(this.refs.editor), {
        modules: {
          toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'link', 'videoURL'],
            ['image', 'code-block'],['formula'],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
          ],
          formula:true,
        },
        bounds: document.body,
        placeholder: 'Compose an epic...',
        theme: 'snow'  
      });
      this.quill.setContents(quillContent);
    }
  }

  cancel(){
    var roomId = this.props.params.cid;
    browserHistory.push('/admin/room/assignments/'+roomId);
  }

  viewroom = () => {
    // console.log("ViewRoomSubtab");
    var roomId = this.props.params.cid;
    browserHistory.push('/admin/room/view/'+roomId);
  }

  adduser = () => {
    // console.log("AddUserSubtab");
    var roomId = this.props.params.cid;
    browserHistory.push('/admin/room/adduser/'+roomId);
  }

  listtopic = () => {
    // console.log("AddUserSubtab");
    var roomId = this.props.params.cid;
    browserHistory.push('/admin/room/listtopic/'+roomId);
  }

  feedbackList = () => {
    // console.log("AddUserSubtab");
    var roomId = this.props.params.cid;
    browserHistory.push('/admin/room/room-feedback-list/'+roomId);
  }

  roomConfiguration = () => {
    var roomId = this.props.params.cid;
    browserHistory.push('/admin/room/configuration/'+roomId);
  }
  
  listAssignments = () => {
    var roomId = this.props.params.cid;
    browserHistory.push('/admin/room/assignments/'+roomId);
  }
  
  courseReports = (e) => {
    var roomId = this.props.params.cid;
    browserHistory.push('/admin/room/attendance/'+roomId);    
  }

  clear() {
    this.props.dispatch( ClearRoom());
  }

  handleAssignmentName(event) {
    this.setState({assignmentName: event.target.value});
  }

  handleUpload = (e) => {
    //console.log(e.target)
    var reader = new FileReader();
    var file = e.target.files[0];
    if (!file){
      return;
    } else if (file.size > 20971520) {
      alertify.alert(this.props.intl.messages.warning,this.props.intl.messages.topic_file_alert, 
        function() {
        }
      ).setting({'label': this.props.intl.messages.ok});
      return;
    } else if (file.type.substring(0, file.type.indexOf("/")) != 'application' && file.type.substring(0, file.type.indexOf("/")) != 'text') {
      alertify.alert(this.props.intl.messages.warning,this.props.intl.messages.invalid_file_format, 
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
      this.setState({
        fileName : this.imageData["fileName"]
      })
      // console.log(file.type)
      if(file.type == 'application/zip'){
        this.imageData["fileType"] = 'zip'
      }else{
        this.imageData["fileType"] = file.type.substring(0, file.type.indexOf("/"))
      }
      let data = this.imageData; 
    }.bind(this);
    reader.readAsDataURL(file);
  }

  handleAssignedTo(event) {
    this.setState({assignedTo: event.target.value});
  }

  deleteAssignment=(e)=>{
    var id = e.currentTarget.id;
    var props = this.props;    
    var response = this.setDeleteResponse

    alertify.confirm(this.props.intlData.messages.warning,this.props.intlData.messages.delete_file_alert, 
      function (result) {
        if(result) {          
          let obj = {
            roomId : props.params.cid,
            assignmentId : props.params.aid
          }
          props.dispatch(deleteAssignmentUploadedFile(obj)).then(res => response(res)); 
        }
      },
      function() {

      }
    ).setting('labels',{'ok': this.props.intlData.messages.ok,'cancel': this.props.intlData.messages.cancel});;    
  }

  setDeleteResponse(res) {
  	if(res.status == true) {
  		this.refs.assignment_container.success(`${res.message} `, ``);
  	} else {
  		this.refs.assignment_container.error(`${res.error} `, ``);
  	}
  }

  clearSelectedFile() {
    this.setState({
      fileName : false
    })
  }

  render() {
  
    //let clsContainerRight = `${styles.containerRight} pull-right`;
    let cls_container = `${styles.iContainer} ${styles.oContainer} pull-right`;
    let cls_topmenu = `${styles.iTopMenu} ${styles.oTopMenu}`;
    let cls_isubmenu = `${styles.iSubMenu} {styles.oSubMenu}`;
    let cls_formcontent = {height:'inherit', minHeight:'320px'};
    let clsForm   = `${styles.iForm} ${styles.oForm}`;
    var cls = `${styles.iFormGroup} ${styles.oFormGroup}`;
    var cls_fg = `${styles.iSubFormGroup} ${styles.oSubFormGroup}`;
    var cls_label=`${styles.iLabel} ${styles.oLabel}`;
    var cls_textbox = `${styles.iElement} ${styles.oElement}`;
    var cls_formfield = `${styles.iFormField} ${styles.oFormField}`;

    let listTopics = null
    if(this.props.roomData && this.props.roomData.assignmentTopicData && this.props.roomData.assignmentTopicData.length > 0) {
      let topics = this.props.roomData.assignmentTopicData;
      listTopics = topics.map((topic) => {
        return <option key={topic._id} value={topic._id}>{topic.topicName}</option>
      });
    }

    /* if package have topics feature */
    if (this.props.roomData && this.props.roomData.data && !_.isEmpty(this.props.roomData.data)) {
      let dataObject = this.props.roomData.data;
      // Assigned appropriate submenu schema 
      // Responsible : Prateek
      // Bug : #3065
      if (dataObject.selPackage && dataObject.selPackage.features.indexOf("Topics") != -1) {
        this.submenu = Validator.activeSubMenu(roomEditSubMenu, "lnkAssignments");
        this.submenu.menus[0].action = this.viewroom.bind(this);
        this.submenu.menus[1].action = this.adduser.bind(this);
        this.submenu.menus[2].action = this.listtopic.bind(this);
        this.submenu.menus[3].action = this.feedbackList.bind(this); 
        this.submenu.menus[4].action = this.roomConfiguration.bind(this);
        this.submenu.menus[5].action = this.listAssignments.bind(this);
        this.submenu.menus[6].action = this.courseReports.bind(this);
      }
    }

    if(this.props.roomData && this.props.roomData.assignmentData && this.props.roomData.assignmentData.uploadData) {
    	var link = '/uploads/'+this.props.roomData.assignmentData.uploadData.fileName
    }

    if(this.state.updating) {
      return(
        <Uploading type="update"/>
      );
    } else {
      return (
        <div className={cls_container}>
          <ToastContainer
            toastMessageFactory={ToastMessageFactory}
            ref="assignment_container"
            className="toast-top-right"
          />
          <div className={cls_topmenu}>
            <h3 className=""><FormattedMessage id='room_management' /></h3>
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
                  <Link onClick={this.cancel.bind(this)}><FormattedMessage id = 'assignment_list'/></Link>
                </li>
                <li>/</li>
                <li>
                  {this.props.roomData.assignmentData.assignmentName}
                </li>
              </ul>
            </div>
            <TopMenu data={roomAssignmentAddMainMenu} />
          </div>
    
          <div className={cls_isubmenu}>
            <SubMenu data={this.submenu} />
          </div>

          <div className={clsForm}>
            <div className={styles.whiteCard}>
              <Grid fluid={true}>
                <Row>
                  <form>
                    <div className='col-md-6'>
                      <div className={cls}>
                        <h2><i className="fa fa-caret-right" aria-hidden="true"></i>&nbsp;Assignment Information</h2>
                        <div className={cls_fg}>
                          <div className={cls_formfield}>
                            <formfield>
                              <label className={cls_label}>Assignment Name
                                <span className={styles.mandatory}>*</span>
                              </label>
                              <input  id="assignmentName" type="text" className={cls_textbox} ref="assignmentName" value={this.state.assignmentName} onChange={this.handleAssignmentName.bind(this)} placeholder="Assignment Name" maxLength={30} autoFocus='true' />
                            </formfield>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className={cls}>
                        <h2><i aria-hidden="true"></i>&nbsp;</h2>
                        <div className={cls_fg}>
                          <div className={cls_formfield}>
                            <formfield>
                              <label className={cls_label}>Assigned To
                              </label>
                              <select id="assignTopic" className={cls_textbox} ref="topic" value={this.state.assignedTo} onChange={this.handleAssignedTo.bind(this)}>
                                <option value=''>Select Topics</option>
                                {
                                  listTopics != null
                                  ?
                                  listTopics
                                  : <option value="">No topics present</option>
                                }
                              </select>
                            </formfield>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-12'>
                      <div className={cls}>
                        <div className={cls_fg}>
                          <div className={cls_formfield}>
                            <formfield>
                              <label className={cls_label}>Content
                                <span className={styles.mandatory}>*</span>
                              </label>
                              <div ref="editor" style={cls_formcontent}></div>
                            </formfield>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-12'>
                      <div className={cls}>
                        <div className={cls_fg}>
                          <div className={cls_formfield}>
  	                        {
  	                        	this.props.roomData && this.props.roomData.assignmentData && this.props.roomData.assignmentData.uploadData
  	                        	?
  	                        	<formfield>
  	                            <div>
  																<p>Uploaded File</p>
  																<a className={styles.fileUploadBreakWord} href={link} download>{this.props.roomData.assignmentData.uploadData.fileName.substring(this.props.roomData.assignmentData.uploadData.fileName.indexOf("_") + 1)}</a>
  																<span className={dashStyles.deleteAssignmentButton} onClick={this.deleteAssignment.bind(this)}><FontAwesome name="times"/></span>
  															</div>
  	                          </formfield>
  	                          :
  	                          <formfield>
                                {
                                  this.state.fileName
                                  ?
                                  <div>
                                    <p>Selected File</p>
                                    <span>{this.state.fileName}</span>
                                    <span className={dashStyles.deleteAssignmentButton} onClick={this.clearSelectedFile.bind(this)}><FontAwesome name="times"/></span>
                                  </div>
                                  : 
                                  <div className= {dashStyles.uploadAssignmentblock}>
                                    <label className={dashStyles.btnSaveGrade}>
                                      <input id="uploadFile" type="file" accept=".doc, .docx, .ppt, .pptx, .pdf" className = {dashStyles.uploadAssignmentButton} onChange={this.handleUpload.bind(this)} value={''}/>
                                      Upload File
                                    </label>
                                    <span className={dashStyles.msgFileTypes} >
                                      <span className={dashStyles.msgFileNote} >Note : </span> Supported file types are  .xlsx, .xls, .doc, .docx, .ppt, .pptx, .txt, .pdf, .odp, .ods
                                    </span>
                                  </div>
                                }
  	                          </formfield>
  	                        }
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </Row>
              </Grid>
            </div>
          </div>

        </div>
      );
    }
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    intl: state.intl,
    roomData : roomData(state),
    loggedInData: loggedInData(state),
    intlData: intlData(state)
  };
}

EditAssignment.propTypes = {
  loggedInData: PropTypes.object,
  roomData : PropTypes.object,
  dispatch : PropTypes.func.isRequired
};

EditAssignment.contextTypes = {
  router : React.PropTypes.object
};

export default connect(mapStateToProps)(EditAssignment);
