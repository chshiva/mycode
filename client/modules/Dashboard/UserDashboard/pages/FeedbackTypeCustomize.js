import React, { PropTypes, Component } from 'react';
import ReactDom from 'react-dom';

import { connect } from 'react-redux';
import { Link } from 'react-router';

import AuthClient from '../../../../components/AuthController.js';
import { isLoggedIn } from '../../../Login/LoginActions';
import { loggedInData } from '../../../Login/LoginReducer';
import styles from '../../Dashboard.css';

import {Col, Row, Grid} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import Loading from '../../../App/components/Loading';
import callApi from '../../../../util/apiCaller';
import { saveFeedback, ClearFeeadback } from '../UserDashboardActions';
import { dashboardData } from '../UserDashboardReducer';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import { browserHistory } from 'react-router';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Roles } from '../../../../roles.js';
import { intlData } from '../../../Intl/IntlReducer';
var _ = require('lodash');

export class FeedbackTypeCustomize extends Component {  
  constructor(props) {
    super(props);    
    this.form = {};
    this.roles = '';  
  }

  componentWillMount() {
    //Chnaged made by prateek 
    //Logic for questionnaire as feedback whenever there are no questions in assigned then it will be redirected to dashboard
     
    if(this.props.questions.length<=0) {
      browserHistory.push('/dashboard')
    }
    // this.setdata(this.props.loggedInData);    
  }

  /*setdata(data) {
    let uid = this.props.loggedInData.data._id;
    let questionnaireId = this.props.questionnaireId;
    this.props.dispatch(getQuestionnaireDataRequest(questionnaireId)).then(res => {
      console.log('res', res);
      if(res.data.questions.length<=0) {
        browserHistory.push('/')
      }
    })
  }*/

  handleRadioChange = (question, questionType, e) => {
    let name = question;
    let value = e.target.value.trim();
    if(this.form[name] == undefined) {
      this.form[name] = [value]
    } else if(questionType == 'Checkbox'){
      if(this.form[name].includes(value)) {
        let index = _.findIndex(this.form[name], value);
        this.form[name].splice(index,1);
      } else {
        this.form[name].push(value)
      }      
    } else {
      this.form[name] = [value]
    }        
  }

  handleSubmit = (e) => {
    e.preventDefault();     
    var data ={};
    let dataobj = this.form;
    let isEmpty = _.isEmpty(dataobj);
    if(isEmpty) {
      this.refs.feedback_container.error("Select atleast One Feedback to submit");
    }else {
      data["feedbacks"] = this.form;      
      data["roomKey"] = this.props.roomkey;
      var feedbackData = {
        data
      } 
      this.props.dispatch(saveFeedback(feedbackData)).then(res => this.myUsers(res));
    }
  }

  myUsers(res) {    
    if(res){
      this.refs.feedback_container.success("Feedback submitted successfully");
       browserHistory.push('/dashboard');
    }                       
  }

  handleCancel = () => {
    browserHistory.push('/dashboard');  
  }

  renderOptions = (questionOptions, question, questionType) => {
    let cls_custfbInputRadio = `${styles.custFbInput} ${styles.radio}`
    let cls_custfbInputCheckbox = `${styles.custFbInput} ${styles.checkbox}`
    return (
      <li>
        {questionOptions.map((optionData,i) => {
          var randomNumber = Math.floor(Math.random(0, 9)*1000*2);
          return <label className={styles.custRadioBlock} key = {randomNumber}>
            <input type={questionType == 'Radio' || questionType == 'TF'?"radio":'checkbox'} name = {question} value = {optionData} className={questionType == 'Radio' || questionType == 'TF'?cls_custfbInputRadio:cls_custfbInputCheckbox} onClick = {this.handleRadioChange.bind(this, question, questionType)} />
            <div className={styles.custRatingOptions}>{optionData}</div>
            </label> 
        })}            
      </li>
    );
  }

  render() {
    /*let roleObj = _.invert(Roles);
      let role = this.props.loggedInData.data.role;
      if(role == Roles.Lmsadmin || role == Roles.Student || role == Roles.Instructor) {
        this.role = true;
      }*/
    
    let cls_bgPoor = `${styles.ratingInfo} ${styles.bgPoor}`;
    let cls_bgAvg = `${styles.ratingInfo} ${styles.bgAvg}`;
    let cls_bgGood = `${styles.ratingInfo} ${styles.bgGood}`;
    let cls_custfbInputRadio = `${styles.custFbInput} ${styles.radio}`;
    let cls_feebCustAll = `${styles.feedbackContent} ${styles.feebCustAll} `

    return (
      <div className="row">          
        <div className="col-md-12">
          <div className={styles.wrapperContainer}>
            <div className={styles.whiteCard}>
              <div className={styles.customFeedback}>
                <div className={styles.header}>
                  <div className={styles.fdText}>
                    <p><FormattedMessage id='please_provide_your_valuable_feedback' /></p>
                  </div>
                  <div className={styles.fdButton}>
                    <button className={styles.btnApplyAll} type="button" id="skipFeebBack" onClick = {this.handleCancel}><FormattedMessage id='skip'/></button>
                  </div>
                </div>
                <div className={styles.fdBody}>
                  <div className={styles.midChoice}>
                    <form>
                      {this.props.dashboardData.questionnaireData.questions.map((questionData) => {
                        return <div className={styles.fdBlock} key={questionData._id}>
                          <Row>
                            <Col md={12}>
                              <div className={styles.fbQuestion}>
                                <p>{questionData.question}</p>
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={12}>
                              <div className={styles.fbOptions}>
                                <ul>
                                  {this.renderOptions(questionData.options, questionData.question, questionData.questionType)}                      
                                </ul>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      })}  
                      <ToastContainer
                        toastMessageFactory={ToastMessageFactory}
                        ref="feedback_container"
                        className="toast-top-right"
                      />
                      <div className={styles.feedbackFooter}>
                        <div className={styles.blockSaveAssign}>
                          <button type="button" id="skipFeebBack" onClick = {this.handleCancel}><FormattedMessage id='no_thanks'/></button>
                          <button type="button" id="sumitFeebBack" onClick = {this.handleSubmit} className={styles.btnSaveAssign} ><FormattedMessage id='feedback_submit'/></button>
                        </div>
                      </div>                          
                    </form>
                  </div>
                </div>
              </div>
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
    loggedInData: loggedInData(state),
    dashboardData: dashboardData(state),
    intlData: intlData(state)
  };
}

FeedbackTypeCustomize.propTypes = {
  loggedInData: PropTypes.object,
  dashboardData: PropTypes.object,
  intlData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

FeedbackTypeCustomize.contextTypes = {
  router: React.PropTypes.object,
  intl: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps)(injectIntl(FeedbackTypeCustomize));