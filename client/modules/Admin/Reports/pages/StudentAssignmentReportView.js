import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import FontAwesome from 'react-fontawesome';  

import SubMenu from '../../../../components/SubMenu';
import TopMenu from '../../../../components/TopMenu';

import AuthClient from '../../../../components/AuthController';
import Validator from '../../../../components/Validator';
import DataObject from '../../../../components/DataObject';
import { isLoggedIn } from '../../../Login/LoginActions';
import { loggedInData } from '../../../Login/LoginReducer';

import { getStudentAssignmentResultData } from '../ReportsActions';
import { reportsData } from '../ReportsReducer';


import { reportsMainMenu,courseReportsSubMenu } from '../schema/ReportsMenu';

// Import Style
import styles from '../../Admin.css';
import componentStyles from '../../../../components/component.css';
import dataStyle from '../../../../components/DataTable/DataTable.css';
import { loginLanguage } from '../../../Intl/IntlActions';
import {Col, Row, Grid} from 'react-bootstrap';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import { intlData } from '../../../Intl/IntlReducer';
import Loading from '../../../App/components/Loading';
var moment = require('moment');


class StudentAssignmentReportView extends Component {
  constructor(props){
    super(props);
    this.submenu = Validator.activeSubMenu(courseReportsSubMenu, "linkAssignment");   
    this.submenu.menus[0].action = this.attendanceReport.bind(this);
    this.submenu.menus[1].action = this.topicsReport.bind(this);
    this.submenu.menus[2].action = this.assignmentReportList.bind(this);

    this.state = {
      loading : true,
      resultData : {},      
    }
  }

  componentDidMount() {
    this.setdata(this.props.loggedInData);    
  }

  setdata = (result) =>  {
    let assignmentId = this.props.params.aid;
    this.props.dispatch(getStudentAssignmentResultData(assignmentId)).then(res => this.setResponse(res));
  }

  setResponse = (res) => {
    if(res.status) {
      this.setState({
        loading : false,
        resultData : res.data,        
      })
    } else {
      this.refs.room_container.error(res.error);
      this.setState({
        loading : false,
        resultData : {}
      })
    }
  }

  attendanceReport = () => {
    browserHistory.push('/course/attendance/'+this.props.params.rid);
  }

  topicsReport = () => {
    browserHistory.push('/course/topics/report/'+this.props.params.rid);
  }

  assignmentReportList = () => {
    browserHistory.push('/course/assignment-report-list/'+this.props.params.rid);
  }

  render() {
    let cls_text = `${componentStyles.txtppl} ${componentStyles.txtSize}`;
    let cls_button = `${componentStyles.resScored} ${componentStyles.blue}`;
    let cls_container = `${componentStyles.iContainer} ${componentStyles.oContainer} pull-right`;
    let cls_topmenu = `${componentStyles.iTopMenu} ${componentStyles.oTopMenu}`;
    let cls_isubmenu = `${componentStyles.iSubMenu} {componentStyles.oSubMenu}`;
    let totalMarks = 0;
    let marksObtained = 0;
    if(!_.isEmpty(this.state.resultData)) {
      this.state.resultData.submissions[0].result.map(function(data) {
        totalMarks += data.maximumMarks;
        marksObtained += data.score
      })
    }
        
    
    return (
      <div>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="room_container"
          className="toast-top-right"
        />
        <div className={cls_container}>
          <div className={cls_topmenu}>
            <h3 className=""><FormattedMessage id='reports'/></h3>
              <div className={componentStyles.dynamicBreadCrumb}>
              <ul>
                <li> 
                  <Link to="/course/reports"><FormattedMessage id='room_list'/></Link>
                </li>
                <li>/</li>
                <li> 
                  <Link to={"/course/assignment-report-list/"+this.state.resultData.roomId}><FormattedMessage id = 'assignment_list'/></Link>
                </li>
                <li>/</li>
                <li> 
                  {this.state.resultData.assignmentName}
                </li>
              </ul>
            </div>
            <TopMenu data={reportsMainMenu} />
          </div>
          <div className={cls_isubmenu}>
            <SubMenu data={courseReportsSubMenu} />
          </div>
          <div className={styles.midContainer}>
            <div className={styles.whiteCard}>
              {!this.state.loading
              ?
                this.state.resultData.submissions[0].result.length>0
                ?
                  <div className="container-fluid">
                    <div className={componentStyles.wrapper}>
                      <Grid fluid={true}>
                        <Row>
                          <Col md={7}>                            
                            <div className={componentStyles.resultBox}>
                              <div className={componentStyles.resultBlock}>
                                <div className={componentStyles.resultHeader}>
                                  <div className={componentStyles.headingTxt}>
                                    <h2><FormattedMessage id='total_assignment_marks'/></h2>
                                  </div>
                                  
                                  <div className={componentStyles.scoreBox}>
                                    <div className={componentStyles.scoreInput}>
                                     <span className={componentStyles.txtplBlue}>{marksObtained}</span> / 
                                     <span>{totalMarks}</span>
                                     </div>
                                  </div>
                                </div>
                                {this.state.resultData.submissions[0].result.map(function(data, i) {  
                                let value = Math.floor(data.score/data.maximumMarks*100);
                                let FieldValue = '';
                                if(value<=100 && value>80){
                                  cls_text = `${componentStyles.txtGreen} ${componentStyles.txtSize}`;
                                  FieldValue = 'Excellent';
                                  cls_button = `${componentStyles.resScored} ${componentStyles.green}`;
                                } else if(value<=80 && value>60) {
                                  cls_text = `${componentStyles.txtBlue} ${componentStyles.txtSize}`;
                                  FieldValue = 'Good';
                                  cls_button = `${componentStyles.resScored} ${componentStyles.blue}`;
                                } else if(value<=60 && value>40) {
                                  cls_text = `${componentStyles.txtYellow} ${componentStyles.txtSize}`;
                                  FieldValue = 'Average';
                                  cls_button = `${componentStyles.resScored} ${componentStyles.yellow}`;
                                } else if(value<=40 && value>20) {
                                  cls_text = `${componentStyles.txtOrange} ${componentStyles.txtSize}`;
                                  FieldValue = 'Poor';
                                  cls_button = `${componentStyles.resScored} ${componentStyles.orange}`;
                                } else {
                                  cls_text = `${componentStyles.txtRed} ${componentStyles.txtSize}`;
                                  FieldValue = 'Bad';
                                  cls_button = `${componentStyles.resScored} ${componentStyles.red}`;
                                }
                                console.log('FieldValue', FieldValue);
                                console.log('cls_text', cls_text);
                                console.log('cls_button', cls_button);
                                return (
                                  <div className={componentStyles.resultBody} key={i}>
                                    <div className={componentStyles.resGroup}>
                                      <div className={componentStyles.resTile}>
                                        <div className={componentStyles.resCriteria}>
                                          <h4>{data.title}</h4>
                                        </div>
                                        <div className={componentStyles.resRating}>
                                          <p><FormattedMessage id='grade'/></p>
                                          <div className={cls_text}>{FieldValue}</div>                               
                                        </div>
                                        <div className={cls_button}>
                                          <p><FormattedMessage id='scored_marks'/></p>
                                          <div className={componentStyles.resInput}>
                                            <span className={componentStyles.activeTxt}>{data.score}</span> / 
                                            <span>{data.maximumMarks}</span>
                                          </div>
                                        </div>
                                      </div>                                      
                                    </div>
                                  </div>
                                )})}
                              </div>
                            </div>                            
                          </Col>
                          <Col md={5}>
                            <div className={componentStyles.feedbackBox}>
                              <div className={componentStyles.fbHeader}>
                                <h2><FormattedMessage id='instructor_feedback'/></h2>
                              </div>
                              <div className={componentStyles.feedbackGroup}>
                                <div className={componentStyles.profileBox}>
                                  <div className={componentStyles.profileImg}>
                                    {this.state.resultData.submissions[0].evaluatedBy.profile == undefined || this.state.resultData.submissions[0].evaluatedBy.profile.profileImage == ''
                                    ?
                                    <img src="/images/profile-pics/defaultStudent.jpg" />
                                    :
                                    <img src={"/uploads/"+this.state.resultData.submissions[0].evaluatedBy.profile.profileImage} />
                                  }
                                  </div>
                                  <div className={componentStyles.profileDetails}>
                                    <span className="name">{this.state.resultData.submissions[0].evaluatedBy.firstname} {this.state.resultData.submissions[0].evaluatedBy.lastname}</span><br/>        
                                    <span>{this.state.resultData.submissions[0].evaluatedBy.email}</span>
                                  </div>
                                </div>
                                {this.state.resultData.submissions[0].comment!= '' && this.state.resultData.submissions[0].comment!= undefined                                
                                ?
                                <div className={componentStyles.commentBox}>
                                  <p><FormattedMessage id='post_comment'/> :</p>
                                  <span className={componentStyles.commentTxt}>
                                    {this.state.resultData.submissions[0].comment}
                                  </span>
                                </div>
                                :null}
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Grid>
                    </div>
                  </div>
                :
                  <div className={dataStyle.noDataBox}>          
                    <h2>
                      <FontAwesome name="frown-o" />
                    </h2>
                    <p><FormattedMessage id ="evaluation_not_yet_done"/></p>
                  </div>
              :<Loading loadType = 'list'/>}
            </div>
          </div>
        </div>
      </div>        
    );       
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    intl: state.intl,
    loggedInData: loggedInData(state),
    intlData: intlData(state),
    reportsData:reportsData(state)
  };
}

StudentAssignmentReportView.propTypes = {
  loggedInData: PropTypes.object,
  reportsData:PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

StudentAssignmentReportView.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(StudentAssignmentReportView);