import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Roles } from '../../../../roles';

import { browserHistory } from 'react-router';
import FontAwesome from 'react-fontawesome';
import AuthClient from '../../../../components/AuthController.js';
import { isLoggedIn } from '../../../Login/LoginActions';
import { getQuestionnaire, saveFeedbackTypeRequest, getFeedbackTypeValue, saveCodecTypeRequest, saveEnableLiveRequest, ClearRoom, getRoomData } from '../RoomActions';
import { roomData } from '../RoomReducer';
import { loggedInData } from '../../../Login/LoginReducer';
import Validator from '../../../../components/Validator';

import SubMenu from '../../../../components/SubMenu';
import TopMenu from '../../../../components/TopMenu';

import {roomEditSubMenu, roomNoTopicSubMenu } from '../schema/RoomMenu';
import { loginLanguage } from '../../../Intl/IntlActions';
import styles from '../../Admin.css';
import style from '../../../../components/component.css';
import weStyles from '../../Profile/components/WorkEdu.css';
import dashboardStyles from '../../../Dashboard/Dashboard.css';
import { intlData } from '../../../Intl/IntlReducer';
import {Col, Row, Grid} from 'react-bootstrap';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import Loading from '../../../App/components/Loading';


class RoomConfiguration extends Component {
  constructor(props){
    super(props);
    
   /* this.mainmenu = roomViewMainMenu;
    
    this.mainmenu.menus[2].action = this.edit.bind(this);//this.save.bind(this);
    this.mainmenu.menus[1].action = this.deleteRoom.bind(this);*/

    /* default set submenu without topic */
    this.submenu = Validator.activeSubMenu(roomNoTopicSubMenu, "lnkRoomConfiguration");
    this.submenu.menus[0].action = this.viewroom.bind(this);
    this.submenu.menus[1].action = this.adduser.bind(this);
    this.submenu.menus[2].action = this.feedbackList.bind(this);
    this.submenu.menus[3].action = this.roomConfiguration.bind(this);
    this.submenu.menus[4].action = this.listAssignments.bind(this);
    this.submenu.menus[5].action = this.courseReports.bind(this);

    this.state = {
      questionaireDropdown : false,
      selectFeedbackBlock :false,
      selectCodecBlock : false,
      selectEnableLiveBlock : false,
      userRole : null,
      loading : true,
      questionnaireName : null
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.roomData && (nextProps.roomData.success && nextProps.roomData.success != "")) {
      if(nextProps.roomData && nextProps.roomData.data && nextProps.roomData.data.roomConfiguration && nextProps.roomData.data.roomConfiguration.feedback && nextProps.roomData.data.roomConfiguration.feedback.questionnaireId && nextProps.roomData.data.roomConfiguration.feedback.questionnaireId.questionnaireName) {
        this.setState({questionnaireName : nextProps.roomData.data.roomConfiguration.feedback.questionnaireId.questionnaireName});
      }
      this.refs.room_container.success(`${nextProps.roomData.success} `, ``);
      // this.setState({
      //   selectFeedbackBlock :false,
      //   questionaireDropdown : false,
      //   selectCodecBlock : false,
      //   selectEnableLiveBlock : false
      // });
      this.props.dispatch(ClearRoom());
    }
  }

  componentDidMount() {
    this.setdata(this.props.loggedInData);
    let obj = {
      roomId : this.props.params.cid
    };
    this.props.dispatch(getRoomData(obj, ''));  
  }

  setdata(result){
    if (result && result.data && result.data._id) {
      this.props.dispatch(loginLanguage(result.data, this.props.intlData.setlocale));
      let uid = result.data._id;
      this.setState({userRole : result.data.role});
      let roomId = this.props.params.cid; 

      // Change By - Najib, Desc - Calling setLoading in promise to set state after receiving response from server    
      if(_.isEmpty(this.props.roomData.data.roomConfiguration)) {
        this.setState({loading : true}); 
      } else {        
        this.setState({loading : false});
      }
      this.props.dispatch(getQuestionnaire());

      this.props.dispatch(getFeedbackTypeValue(roomId)).then((result) => {       
        if (result.status) {
         // console.log("response", result);
          if(this.state.loading) {
            this.setState({loading : false});  
          }          
          if(result.listData.roomConfiguration.feedback.feedbackType == "Customize") {
            this.setState({
              questionaireDropdown : true, questionnaireName : result.listData.roomConfiguration.feedback.questionnaireId.questionnaireName 
            })
            //console.log("customise");
          }          
        } else {
          if(this.state.loading) {
            this.setState({loading : false});  
          }
        }
      });
    }
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

  locationList = () => {
    var roomId = this.props.params.cid;
    browserHistory.push('/admin/room/listlocation/'+roomId);
  }

  roomConfiguration = () => {
    var roomId = this.props.params.cid;
    browserHistory.push('/admin/room/configuration/'+roomId);
  }

  courseReports = (e) => {
    var roomId = this.props.params.cid;
    browserHistory.push('/admin/room/attendance/'+roomId);    
  }

  listCertificates = () => {
    const roomId = this.props.params.cid;
    browserHistory.push('/admin/room/certificates/'+roomId);
  }

  saveFeedbackType(e) {
    e.preventDefault();
    let feedbackValue = ReactDOM.findDOMNode(this.refs.feedbackTypeValue).value;
    let uid = this.props.loggedInData.data._id;
    let roomId = this.props.params.cid;
    if(feedbackValue == null || feedbackValue == "" || feedbackValue == undefined){
      this.refs.room_container.error('Please select any of the feedback type')
    } else if(feedbackValue == "Customize") {
      let index = ReactDOM.findDOMNode(this.refs.feedbackQuestionnaire).value;
      let customizeQuestionnaireData = index != undefined || index != ''?this.props.roomData.roomQuestionnaireList[index]:undefined;
      let customizeQuestionnaireId = customizeQuestionnaireData != undefined?customizeQuestionnaireData._id:undefined;
      let questionnaireQuestionsCount = customizeQuestionnaireData != undefined?customizeQuestionnaireData.questions.length:null;
      if(customizeQuestionnaireId == '' || customizeQuestionnaireId == undefined || customizeQuestionnaireId == null){
        this.refs.room_container.error('Please select any of the questionnaire')
      } else if(questionnaireQuestionsCount <=0) {
        this.refs.room_container.error('Please assign a questionnaire which has atleast one question in it')
      }else{
        this.props.dispatch(saveFeedbackTypeRequest({roomId,feedbackValue,customizeQuestionnaireId})).then(res=>this.setForm(4));
      }
    } else {
       this.props.dispatch(saveFeedbackTypeRequest({uid,roomId,feedbackValue})).then(res=>this.setForm(1));
    }
  }

  selectedFeedbackType(e) {
    e.preventDefault();
    let feedbackValue = ReactDOM.findDOMNode(this.refs.feedbackTypeValue).value;
    if(feedbackValue == "Customize") {
      this.setState({
        questionaireDropdown : true
      })
    } else if(feedbackValue == "None" || feedbackValue == "Default" || feedbackValue == ""){
      this.setState({
        questionaireDropdown : false
      })
    }
  }

  handleConfigureBlock(e){
    e.preventDefault();
    this.setState({
      selectFeedbackBlock : true
    })
  }

  cancelFeedbackType(e){
    e.preventDefault();
    this.setState({
      questionaireDropdown : false,
      selectFeedbackBlock : false
    })
  }

  handleFeedbackBlock(e){
    this.setState({
      selectFeedbackBlock : true
    });
    if(this.props.roomData.data.roomConfiguration.feedback.feedbackType == "Customize") {
      this.setState({
        questionaireDropdown :true
      });
    }
  }

  handleCodecBlock(e){
    this.setState({
      selectCodecBlock : true
    });
  }

  cancelCodecType(e){
    e.preventDefault();
    this.setState({
      selectCodecBlock : false
    })
  }

  saveCodecType(e) {
    e.preventDefault();
    let codecType = ReactDOM.findDOMNode(this.refs.codecTypeValue).value;
    let uid = this.props.loggedInData.data._id;
    let roomId = this.props.params.cid;
    this.props.dispatch(saveCodecTypeRequest({uid,roomId,codecType})).then(res=>this.setForm(2));
  }

  //code changed by -- Najib, Desc - un-setting the drop down of submitted functions  

  setForm(val) {
    if(val==1) {
      this.setState({
      selectFeedbackBlock : false
    })   
    }else if(val==2) {
      this.setState({
      selectCodecBlock : false
    })   
    }else if(val==3) {
      this.setState({
      selectEnableLiveBlock : false
    })   
    }else if(val==4) {
      this.setState({
      questionaireDropdown : false,
      selectFeedbackBlock : false
    })   
    }
  }

  handleEnableLiveBlock(e){
    this.setState({
      selectEnableLiveBlock : true
    });
  }

  cancelEnableLive(e){
    e.preventDefault();
    this.setState({
      selectEnableLiveBlock : false
    });
  }

  saveEnableLive(e) {
    e.preventDefault();
    let enableLive = this.refs.enableLiveValue.value;
    let uid = this.props.loggedInData.data._id;
    let roomId = this.props.params.cid;
    this.props.dispatch(saveEnableLiveRequest({uid,roomId,enableLive})).then(res=>this.setForm(3));
  }

  listAssignments = () => {
    var roomId = this.props.params.cid;
    browserHistory.push('/admin/room/assignments/'+roomId);
  }

  render() {
    let cls_container = `${style.iContainer} ${style.oContainer} pull-right`;
    let cls_topmenu = `${style.iTopMenu} ${styles.oTopMenu}`;
    let cls_isubmenu = `${style.iSubMenu} {styles.oSubMenu}`;
    let cls_inlineEditGroup = `${styles.inlineEditGroup} clearfix`;
    let addInfoBlock = `${weStyles.addInfoBlock} clearfix`;
    let iconBox = `${weStyles.iconBox} pull-left`;
    let addCategoryTxtBox = `${weStyles.addCategoryTxtBox} pull-left`;
    let cls_btnSaveChanges = `${weStyles.btnSpace} btn btn-primary`;
    let cls_btnCancle = `${weStyles.btnSpace} btn btn-default`;
    let cls_mailsDiv = `${dashboardStyles.wO} ${dashboardStyles.nr} ${dashboardStyles.l1}`;
    let cls_hiddenInput = `${dashboardStyles.wA}`;
    let displayInfoBlock = `${weStyles.displayInfoBlock} clearfix`;
    let moreInfoBlock = `${weStyles.moreInfoBlock} pull-right`;
    let singleInfoBox = `${weStyles.singleInfoBox} pull-left`;
    let loadType = 'list';
    let cls_btnSaveEdit = ` ${styles.btnSaveAssign} `;
    let cls_btnSaveEdit2 = ` ${styles.btnSaveAssign2} `;    
    let enableLiveType = '';
    var questionnaireName = null;
    //console.log("this.props.roomData", this.props.roomData);
    if(this.props.roomData && this.props.roomData.data && this.props.roomData.data.roomConfiguration && this.props.roomData.data.roomConfiguration.enableLive) {
      enableLiveType = this.props.roomData.data.roomConfiguration.enableLive;
      // if(this.props.roomData.data.roomConfiguration.feedback && this.props.roomData.data.roomConfiguration.feedback.questionnaireId && this.props.roomData.data.roomConfiguration.feedback.questionnaireId.questionnaireName) {
      //   console.log("questionnaireName", questionnaireName);
      // } else {
      // console.log("questionnaireName not loaded");
      // }
    }
    // var questionnaireName = null;
    // if(this.props.roomData && this.props.roomData.data && this.props.roomData.data.roomConfiguration && this.props.roomData.data.roomConfiguration.feedback && this.props.roomData.data.roomConfiguration.feedback.questionnaireId && this.props.roomData.data.roomConfiguration.feedback.questionnaireId.questionnaireName) {
    //   let questionnaireName = this.props.roomData.data.roomConfiguration.feedback.questionnaireId.questionnaireName;
    //   console.log("questionnaireName", questionnaireName);
    // } else {
    //   console.log("questionnaireName not loaded");
    // }

    //console.log("this.props.roomData", this.props.roomData);
    //console.log("enableLiveType", enableLiveType);

    /* if package have topics feature */
    if (this.props.roomData && this.props.roomData.data && !_.isEmpty(this.props.roomData.data)) {
      let roomData = this.props.roomData.data;
      if (roomData.selPackage && roomData.selPackage.features.indexOf("Topics") != -1) {
        this.submenu = Validator.activeSubMenu(roomEditSubMenu, "lnkRoomConfiguration");
        this.submenu.menus[0].action = this.viewroom.bind(this);
        this.submenu.menus[1].action = this.adduser.bind(this);
        this.submenu.menus[2].action = this.listtopic.bind(this);
        this.submenu.menus[3].action = this.feedbackList.bind(this);
        /* commented because of no functionality, need to implement */
        // this.submenu.menus[4].action = this.locationList.bind(this);

        this.submenu.menus[4].action = this.roomConfiguration.bind(this);
        this.submenu.menus[5].action = this.listAssignments.bind(this);
        this.submenu.menus[6].action = this.courseReports.bind(this);
        this.submenu.menus[7].action = this.listCertificates.bind(this);        
      }
    }

    return (
      <div className={cls_container}>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="room_container"
          className="toast-top-right"
        />

        <div className={cls_topmenu}>
          <h3 className=""><FormattedMessage id='room_management' /></h3>
            <div className={style.dynamicBreadCrumb}>
              <ul>
                <li> 
                  <Link to="/admin/room/list"><FormattedMessage id = 'all_rooms'/></Link>
                </li>
                <li>/</li>
                <li>
                  {this.props.roomData.data.roomName}
                </li>
              </ul>
            </div>
            {/*<TopMenu data={roomViewMainMenu} />*/}
        </div>

        <div className={cls_isubmenu}>
          <SubMenu data={this.submenu} />
        </div>
          <div className={styles.midContainer}>
            <div className={styles.whiteCard}>

            {/*Code added by - Najib, Desc - Added spinner code and moved checking of server response data under grid div */}
              { this.state.loading?
              <div className={styles.mainSpinBlock} >
                <div className={styles.innerSpinBlock} >
                  <Loading loadType = {loadType}/>
                </div>
              </div> :
              <Grid fluid={true}>
                {this.props.roomData && this.props.roomData.data != undefined && this.props.roomData.data.roomConfiguration
                ?   
                <div className={weStyles.userCategoryInfo}>
                  <h2 className={weStyles.categoryHeading}><FormattedMessage id='configration' /></h2>
                  <ul>
                    <li>
                      {this.state.selectFeedbackBlock == false?
                        <div>
                          <div className={displayInfoBlock}>
                            <div className={singleInfoBox}>
                              <div className="row">
                                <div className="col-md-2">
                                  <p className={weStyles.leftInfoTxt}><FormattedMessage id = 'feedbackType_title'/>:</p>
                                </div>
                                <div className="col-md-10">
                                  <ul className={weStyles.rightDetailInfo}>
                                    <li>{this.props.roomData.data.roomConfiguration.feedback.feedbackType}</li>
                                  </ul>
                                </div>                               
                              </div> 
                            </div>
                             <div className={moreInfoBlock}>
                              <div className={weStyles.moreIconBox}>
                                {/*<i className="fa fa-ellipsis-v" aria-hidden="true"></i>*/}
                                <FontAwesome name="pencil" onClick={this.handleFeedbackBlock.bind(this)}/>
                              </div>
                            </div>
                          </div>
                          {this.props.roomData.data.roomConfiguration.feedback.feedbackType == "Customize"?
                            <div className={displayInfoBlock}>
                              <div className={singleInfoBox}>
                                <div className="row">
                                  <div className="col-md-2">
                                    <p className={weStyles.leftInfoTxt}>Questionnaire:</p>
                                  </div>
                                  <div className="col-md-10">
                                    <ul className={weStyles.rightDetailInfo}>
                                      <li>{this.state.questionnaireName}</li>
                                    </ul>
                                  </div>                                          
                                </div> 
                              </div>                          
                            </div>
                          :null} 
                        </div>    
                      :null}                      
                      {this.state.selectFeedbackBlock && this.props.roomData && this.props.roomData.roomQuestionnaireList
                      ?
                      <div className={weStyles.profileEditBlock}>
                        <form className="form-horizontal">
                          <div className="form-group">
                            <label htmlFor="inputEmail" className="control-label col-md-3"><FormattedMessage id='feedbackType_title' />:</label>
                            <div className="col-md-9">
                              <div className={cls_mailsDiv}>
                                <input className={cls_hiddenInput} aria-hidden="true" autoFocus='true' />
                                <select id="feedbackType" className="form-control" ref="feedbackTypeValue" onChange={this.selectedFeedbackType.bind(this)}>
                                  <option value={this.props.roomData.data.roomConfiguration.feedback.feedbackType}>{this.props.roomData.data.roomConfiguration.feedback.feedbackType}
                                  </option>
                                  <option value={this.props.roomData.data.roomConfiguration.feedback.feedbackType == "Default" ? "None" : "Default"}>{this.props.roomData.data.roomConfiguration.feedback.feedbackType == "Default" ? "None" : "Default"}
                                  </option>
                                  <option value={this.props.roomData.data.roomConfiguration.feedback.feedbackType == "Default" ? "Customize":this.props.roomData.data.roomConfiguration.feedback.feedbackType == "None" ?"Customize":"None"}>{this.props.roomData.data.roomConfiguration.feedback.feedbackType == "Default" ? "Customize":this.props.roomData.data.roomConfiguration.feedback.feedbackType == "None" ?"Customize":"None"}
                                  </option>
                                </select>                              
                              </div>
                            </div>
                          </div>
                          {this.state.questionaireDropdown
                            ?
                            <div className="form-group">
                              <label htmlFor="inputEmail" className="control-label col-md-3"><FormattedMessage id='assign_questionaire' />:</label>
                              <div className="col-md-9">
                                <input className={cls_hiddenInput} aria-hidden="true"/>                                
                                <select id="assignQuestionaire" className="form-control" ref="feedbackQuestionnaire" onChange={this.selectedFeedbackType.bind(this)} >
                                <option value="">
                                  {this.props.roomData.data.roomConfiguration.feedback.questionnaireId == undefined 
                                    ?"Select Questionnaire" 
                                    :this.state.questionnaireName
                                  } 
                                </option>
                                {this.props.roomData.roomQuestionnaireList.map((questionnaireData, index) => {
                                  if(this.state.questionnaireName != questionnaireData.questionnaireName ) { 

                                      return (
                                        <option 
                                          value={index}
                                          key={questionnaireData._id}>
                                          {questionnaireData.questionnaireName}
                                        </option>
                                      )
                                  } else if(this.props.roomData.data.roomConfiguration.feedback.questionnaireId == undefined){
                                    return (
                                      <option 
                                        value={index}
                                        key={questionnaireData._id}>
                                        {questionnaireData.questionnaireName}
                                      </option> 
                                    )   
                                  }
                                })}
                                </select>                                       
                              </div>
                            </div>
                            : null
                          }                          
                          <div className="form-group">
                            <div className="col-md-offset-3 col-md-9">
                              <div className={styles.blockSaveAssign2}>
                                <button id="cancel" type="submit" className={cls_btnCancle} onClick={this.cancelFeedbackType.bind(this)}><FormattedMessage id='cancel' /></button>
                                <button id="save" type="submit" className={cls_btnSaveEdit2}  
                                onClick={this.saveFeedbackType.bind(this)}><FormattedMessage id='work_education_saveChanges' /></button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div> 
                      :null}
                    </li>
                    <li>
                      {
                        this.state.selectCodecBlock == false
                        ?
                        <div>
                          <div className={displayInfoBlock}>
                            <div className={singleInfoBox}>
                              <div className="row">
                                <div className="col-md-2">
                                  <p className={weStyles.leftInfoTxt}><FormattedMessage id = 'codecType_title'/>:</p>
                                </div>
                                <div className="col-md-10">
                                  <ul className={weStyles.rightDetailInfo}>
                                    <li>{this.props.roomData.data.roomConfiguration.codecType}</li>
                                  </ul>
                                </div>                               
                              </div> 
                            </div>
                             <div className={moreInfoBlock}>
                              <div className={weStyles.moreIconBox}>
                                {/*<i className="fa fa-ellipsis-v" aria-hidden="true"></i>*/}
                                <FontAwesome name="pencil" onClick={this.handleCodecBlock.bind(this)}/>
                              </div>
                            </div>
                          </div>
                        </div>    
                        :
                        <div className={weStyles.profileEditBlock}>
                          <form className="form-horizontal">
                            <div className="form-group">
                              <label htmlFor="inputEmail" className="control-label col-md-3"><FormattedMessage id='codecType_title' />:</label>
                              <div className="col-md-9">
                                <div className={cls_mailsDiv}>
                                  <input className={cls_hiddenInput} aria-hidden="true"/>

                                  {/*Code changed by - Najib, Desc -  "defaultValue" is not selecting already selected value, so using "selected" instead, althoug getting a warring for using the same
                                  */}
                                  <select  id="codecType" className="form-control" ref="codecTypeValue">
                                    <option value="vp8" selected = {this.props.roomData.data.roomConfiguration.codecType == 'vp8'}>Codec VP8</option>
                                    <option value="vp9" selected = {this.props.roomData.data.roomConfiguration.codecType == 'vp9'}>Codec VP9</option>
                                    <option value="h264" selected = {this.props.roomData.data.roomConfiguration.codecType == 'h264'}>Codec H.264</option>
                                  </select>                              
                                </div>
                              </div>
                            </div>                  
                            <div className="form-group">
                              <div className="col-md-offset-3 col-md-9">
                                <div className={styles.blockSaveAssign2}>
                                  <button id="codectypeCancel" type="submit" className={cls_btnCancle} onClick={this.cancelCodecType.bind(this)}><FormattedMessage id='cancel' /></button>
                                  <button id="codectypeSubmit" type="submit" className={cls_btnSaveEdit2}  
                                  onClick={this.saveCodecType.bind(this)}><FormattedMessage id='work_education_saveChanges' /></button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      }
                    </li>
                    <li>
                      {(this.state.userRole == Roles.Lmsadmin || this.state.userRole == Roles.Presenteradmin)
                        ?
                        (this.state.selectEnableLiveBlock == false
                          ?
                          <div>
                            <div className={displayInfoBlock}>
                              <div className={singleInfoBox}>
                                <div className="row">
                                  <div className="col-md-2">
                                    <p className={weStyles.leftInfoTxt}><FormattedMessage id = 'enableLive_title'/>:</p>
                                  </div>
                                  <div className="col-md-10">
                                    <ul className={weStyles.rightDetailInfo}>
                                      <li>{this.props.roomData.data.roomConfiguration.enableLive ? "True" : "False"}</li>
                                    </ul>
                                  </div>                               
                                </div> 
                              </div>
                               <div className={moreInfoBlock}>
                                <div className={weStyles.moreIconBox}>
                                  <FontAwesome name="pencil" onClick={this.handleEnableLiveBlock.bind(this)}/>
                                </div>
                              </div>
                            </div>
                          </div>    
                          :
                          <div className={weStyles.profileEditBlock}>
                            <form className="form-horizontal">
                              <div className="form-group">
                                <label htmlFor="inputEmail" className="control-label col-md-3"><FormattedMessage id='enableLive_title' />:</label>
                                <div className="col-md-9">
                                  <div className={cls_mailsDiv}>
                                    <input className={cls_hiddenInput} aria-hidden="true"/>
                                    <select id="enableLive" className="form-control" ref="enableLiveValue">

                                  {/*Code changed by - Najib, Desc -  "defaultValue" is not selecting already selected value, so using "selected" instead, althoug getting a warring for using the same
                                  */}
                                      <option value="true" selected={this.props.roomData.data.roomConfiguration.enableLive}>True</option>
                                      <option value="false" selected={!this.props.roomData.data.roomConfiguration.enableLive}>False</option>
                                    </select>
                                  </div>
                                </div>
                              </div>                  
                              <div className="form-group">
                                <div className="col-md-offset-3 col-md-9">
                                  <div className={styles.blockSaveAssign2}>
                                    <button id="enableliveCancel" type="submit" className={cls_btnCancle} onClick={this.cancelEnableLive.bind(this)}><FormattedMessage id='cancel' /></button>
                                    <button id="enableliveSubmit"  type="submit" className={cls_btnSaveEdit2}  
                                    onClick={this.saveEnableLive.bind(this)}><FormattedMessage id='work_education_saveChanges' /></button>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                        )
                        : null
                      }
                    </li>
                  </ul>
                </div> :null
                }
              </Grid> }
            </div>
          </div>
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    roomData : roomData(state),
    loggedInData: loggedInData(state),
    intlData: intlData(state)
  };
}

RoomConfiguration.propTypes = {
  loggedInData: PropTypes.object,
  roomData : PropTypes.object,
  dispatch : PropTypes.func.isRequired
};

RoomConfiguration.contextTypes = {
  router : React.PropTypes.object
};

export default connect(mapStateToProps)(RoomConfiguration);
