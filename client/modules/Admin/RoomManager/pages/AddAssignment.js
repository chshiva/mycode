import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

import AuthClient from '../../../../components/AuthController.js';
import { isLoggedIn } from '../../../Login/LoginActions';
import { ClearRoom ,SaveRoomAssignment, getTopicDataRequest, getRoomData} from '../RoomActions';
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
import Uploading from '../../../../components/Uploading';
import FontAwesome from 'react-fontawesome';
import Loading from '../../../App/components/Loading';
import compStyles from '../../../../components/component.css';



class AddAssignment extends Component {
  constructor(props){
    super(props);
    this.quill = false;
    this.currentuser = '';
    this.imageData = {};
    
    this.mainmenu = roomAssignmentAddMainMenu;

    this.mainmenu.menus[1].action = this.save.bind(this);//this.save.bind(this);
    this.mainmenu.menus[0].action = this.cancel.bind(this);

    /* default set submenu without topic */
    this.submenu = Validator.activeSubMenu(roomNoTopicSubMenu, "lnkAssignments");
    this.submenu.menus[0].action = this.viewroom.bind(this);
    this.submenu.menus[1].action = this.adduser.bind(this);
    this.submenu.menus[2].action = this.feedbackList.bind(this);
    this.submenu.menus[3].action = this.roomConfiguration.bind(this);
    this.submenu.menus[4].action = this.listAssignments.bind(this);
    this.submenu.menus[5].action = this.courseReports.bind(this);

    this.state = {
      assignmentName: '',
      creating: false,
      fileName: false,
      validationError:{}
    }
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

     let obj = { 
      roomId : this.props.params.cid,
    };
    //console.log('result',result)
    if (result && result.data && result.data._id) {
      this.props.dispatch(loginLanguage(result.data, this.props.intlData.setlocale));
    }
    this.props.dispatch(getTopicDataRequest(this.props.params.cid))
    this.props.dispatch(getRoomData(obj,''));
  }

  save() {
    let errors={}
    if(this.state.assignmentName) {
      if (/^\s+$/.test(this.state.assignmentName)) {
        errors['assignmentError'] = <FormattedMessage id='Assignment_name_cannot_have_only_white_spaces' />
        this.setState({ validationError: errors });
        // this.refs.assignment_container.error("Assignment name can't have only white spaces");
      } else {
        this.setState({ validationError: {} });
        let content = this.quill.getContents().ops;
        var roomId = this.props.params.cid;
        let topicName = ReactDOM.findDOMNode(this.refs.topic).value
        let obj = { 
          roomId : roomId,
          content : content,
          assignmentName : this.state.assignmentName.trim(),
          assignedTo : topicName,
          uploadData : this.imageData
        };
        this.props.dispatch(SaveRoomAssignment(obj)).then(res => this.saveResponse(res));
        this.setState({
          creating : true
        })
      }
    } else {
      errors['assignmentError'] = <FormattedMessage id='Please_enter_Assignment_Name' />;
      this.setState({ validationError: errors });
      // this.refs.assignment_container.error('Please fill all the mandatory fields');
    }
  }

  saveResponse(response){
    if(response.status == false){
      this.setState({
        creating : false,
        fileName : false
      });
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
    } else if (file.size>20971520) {
      alertify.alert(this.props.intl.messages.warning,this.props.intl.messages.topic_file_alert, 
        function() {
        }
      ).setting({'label': this.props.intl.messages.ok});
      return;
    } else if (file.type.substring(0, file.type.indexOf("/")) != 'application' && file.type.substring(0, file.type.indexOf("/")) != 'text') {
      console.log(file.type);
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

  clearSelectedFile() {
    this.setState({
      fileName : false
    })
  }

  viewroom = () => {
    let roomId = this.props.params.cid;
    browserHistory.push('/admin/room/view/'+roomId);
  }

  adduser = () => {
    let roomId = this.props.params.cid;
    browserHistory.push('/admin/room/adduser/'+roomId);
  }

  listtopic = () => {
    let roomId = this.props.params.cid;
    browserHistory.push('/admin/room/listtopic/'+roomId);
  }

  feedbackList = () => {
    let roomId = this.props.params.cid;
    browserHistory.push('/admin/room/room-feedback-list/'+roomId);
  }

  roomConfiguration = () => {
    let roomId = this.props.params.cid;
    browserHistory.push('/admin/room/configuration/'+roomId);
  }

  listAssignments = () => {
    let roomId = this.props.params.cid;
    browserHistory.push('/admin/room/assignments/'+roomId);
  }

  courseReports = (e) => {
    let roomId = this.props.params.cid;
    browserHistory.push('/admin/room/attendance/'+roomId);    
  }

  render() {
    //let clsContainerRight = `${styles.containerRight} pull-right`;
    let cls_container = `${styles.iContainer} ${styles.oContainer} pull-right`;
    let cls_topmenu = `${styles.iTopMenu} ${styles.oTopMenu}`;
    let cls_isubmenu = `${styles.iSubMenu} {styles.oSubMenu}`;
    let cls_formcontent = {height:'calc(100vh - 262px)'};
    let clsForm   = `${styles.iForm} ${styles.oForm}`;
    let cls = `${styles.iFormGroup} ${styles.oFormGroup}`;
    let cls_fg = `${styles.iSubFormGroup} ${styles.oSubFormGroup}`;
    let cls_label=`${styles.iLabel} ${styles.oLabel}`;
    let cls_textbox = `${styles.iElement} ${styles.oElement}`;
    let cls_formfield = `${styles.iFormField} ${styles.oFormField}`;
    let loadType = 'list';
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
      if (dataObject.selPackage && dataObject.selPackage.features.indexOf("Topics") != -1) {
        this.submenu = Validator.activeSubMenu(roomEditSubMenu, "lnkAssignments");
        this.submenu.menus[0].action = this.viewroom.bind(this);
        this.submenu.menus[1].action = this.adduser.bind(this);
        this.submenu.menus[2].action = this.listtopic.bind(this);
        this.submenu.menus[3].action = this.feedbackList.bind(this);
        /* commented because of no functionality, need to implement */
        // this.submenu.menus[4].action = this.locationList.bind(this);

        this.submenu.menus[4].action = this.roomConfiguration.bind(this);
        this.submenu.menus[5].action = this.listAssignments.bind(this);
        this.submenu.menus[6].action = this.courseReports.bind(this);
      }
    }

    // if(this.state.creating) {
      return(
        <div>
          <ToastContainer
            toastMessageFactory={ToastMessageFactory}
            ref="assignment_container"
            className="toast-top-right"
          />

            <div>
              <div className={cls_container}>
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
                        <FormattedMessage id = 'add_assignment'/>
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
                  {this.state.creating
                  ?       
                  <div className={styles.mainSpinBlock} >
                    <div className={styles.innerSpinBlock} >
                      <Loading loadType = {loadType}/>
                    </div>
                  </div>
                  :
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
                                      <span className={styles.mandatory}>*</span>:
                                    </label>
                                    <input type="text" id="assignmentName" className={cls_textbox} ref="assignmentName" style={this.state.validationError && this.state.validationError.assignmentError ? { borderColor: "#ff0000" } : {}}
                                       value={this.state.assignmentName} onChange={this.handleAssignmentName.bind(this)} placeholder="Assignment Name" maxLength={30} autoFocus='true' />
                                    <label className={compStyles.errorPre} >{this.state.validationError && this.state.validationError.assignmentError ? this.state.validationError.assignmentError : ''}</label>
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
                                    <label className={cls_label}>Assigned To:
                                    </label>
                                    <select id="assignTopic" className={cls_textbox} ref="topic">
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
                                      <span className={styles.mandatory}>*</span>:
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
                                          <input id="uploadFile" type="file" accept=".doc, .docx, .ppt, .pptx, .pdf,.txt" className = {dashStyles.uploadAssignmentButton} onChange={this.handleUpload.bind(this)} value={''}/>
                                          Upload File
                                        </label>
                                        <span className={dashStyles.msgFileTypes} >
                                          <span className={dashStyles.msgFileNote} >Note : </span> Supported file types are .xlsx, .xls, .doc, .docx, .ppt, .pptx, .txt, .pdf, .odp, .ods
                                        </span>
                                      </div>
                                    }
                                  </formfield>
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </Row>
                    </Grid>
                  }
                  </div>
                </div>
                
              </div>  
            </div>
          
        </div>
      );
    // }
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

AddAssignment.propTypes = {
  loggedInData: PropTypes.object,
  roomData : PropTypes.object,
  dispatch : PropTypes.func.isRequired
};

AddAssignment.contextTypes = {
  router : React.PropTypes.object
};

export default connect(mapStateToProps)(AddAssignment);
