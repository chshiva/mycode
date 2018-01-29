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
import { saveFeedback } from '../UserDashboardActions';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import { browserHistory } from 'react-router';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Roles } from '../../../../roles.js';
var _ = require('lodash');

export class FeedbackTypeDefault extends Component {  
  constructor(props) {
    super(props);    
    this.form = {};
    this.roles = '';
  }

  componentDidMount() {
    this.setdata(this.props.loggedInData);    
  }

  setdata(data) {

  }

  handleRadioChange = (e) => {
    let name = e.currentTarget.name;
    let value = e.currentTarget.value;
    this.form[name] = [value];    
    //console.log("this.form === ",this.form );
  }

  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Submit value", this.form)
  // }

  handleSubmit = (e) => {
    e.preventDefault();     
    var data ={};
    let dataobj = this.form;
    //console.log("this.form === ",this.form);
    let isEmpty = _.isEmpty(dataobj);
    //console.log("is empty", isEmpty);
    if(isEmpty) {
      this.refs.feedback_container.error("Nothing to save");
    }else {
      data["feedbacks"] = this.form;
      data["roomKey"] = this.props.roomkey;
      var feedbackData = {
        data
      }
      console.log("feedbackData === ", feedbackData);
      this.props.dispatch(saveFeedback(feedbackData)).then(res => this.myUsers(res));
    }
  }

  // myUsers(res) { 

  //   if(res.status==true) {      
  //     this.refs.feedback_container.success(`${res.message} `, ``);        
  //     browserHistory.push('/dashboard');              
  //   }else if(res.status==false){
  //     this.refs.feedback_container.error(`${res.error} `, ``);          
  //   }         
  // } 

 myUsers(res) {    
    if(res){
      this.refs.feedback_container.success("Feedback submitted successfully");
      browserHistory.push('/dashboard'); 
    }                       
  }

  handleCancel = () => {
    browserHistory.push('/dashboard');  
  }

  renderOptions = (name) => {
    let cls_bgPoor = `${styles.ratingInfo} ${styles.bgPoor}`;
    let cls_bgAvg = `${styles.ratingInfo} ${styles.bgAvg}`;
    let cls_bgGood = `${styles.ratingInfo} ${styles.bgGood}`;
    let cls_fbInputRadio = `${styles.fbInput} ${styles.radio}`
    return(
      <li>                                  
        <label className={styles.radioBlock}>
          <div className={cls_bgPoor}><FormattedMessage id='poor' /></div>
          <input id="radioPoor" type="radio" name={name} value = "Poor" className={cls_fbInputRadio} onChange = {this.handleRadioChange} />
        </label>
        <label className={styles.radioBlock}>
          <div className={cls_bgAvg}><FormattedMessage id='average' /></div>
          <input id="radioAverage" type="radio" name={name} value = "Average" className={cls_fbInputRadio} onChange = {this.handleRadioChange} />
        </label>
        <label className={styles.radioBlock}>
          <div className={cls_bgGood}><FormattedMessage id='good' /></div>
          <input id="radioGood" type="radio" name={name} value = "Good" className={cls_fbInputRadio} onChange = {this.handleRadioChange} />
        </label>
        <label className={styles.radioBlock}>
          <div className={styles.ratingInfo}><FormattedMessage id='excellent' /></div>
          <input id="radioExcellent" type="radio" name={name} value ="Excellent" className={cls_fbInputRadio} onChange = {this.handleRadioChange} />
        </label> 
      </li>
    );
  }

  render() {
    let roleObj = _.invert(Roles);
      let role = this.props.loggedInData.data.role;
      //this.role = roleObj[role];
      if(role == Roles.Lmsadmin || role == Roles.Student || role == Roles.Instructor) {
        this.role = true;
      }

    let cls_bgPoor = `${styles.ratingInfo} ${styles.bgPoor}`;
    let cls_bgAvg = `${styles.ratingInfo} ${styles.bgAvg}`;
    let cls_bgGood = `${styles.ratingInfo} ${styles.bgGood}`;
    let cls_fbInputRadio = `${styles.fbInput} ${styles.radio}`;
  	return (
      <div className="row">
        <div className="col-md-12">
          <div className={styles.wrapperContainer}>
            <div className={styles.whiteCard}>
              <div className={styles.listDisplayBlock}>
                <div className={styles.ldHeader}>
                  <div className={styles.feebackText}>
                    <p><FormattedMessage id='please_provide_your_valuable_feedback' /></p>
                  </div>
                  <div className={styles.feedbackButton}>
                    <button className={styles.btnApplyAll} type="button" id="skipFeebBack" onClick = {this.handleCancel}><FormattedMessage id='skip'/></button>
                  </div>
                </div>
                <div className={styles.ldBody}>
                  <div className={styles.feedbackBlock}>
                    <form>
                      <div className={styles.feedbackRow}>
                        <Row>
                          <Col md={6}>
                            <div className={styles.feedbackContent}>
                              <h2><FormattedMessage id='video_quality' /></h2>
                              <p><FormattedMessage id='rate_the_quality_of_the_video_you_experienced' /></p>
                              <div className={styles.circle104}>
                                <img src="/images/black-icons/black-video.png" />
                              </div>
                            </div>
                          </Col>
                          <Col md={6}>
                            <div className={styles.feedbackContent}>
                              <ul>
                                {this.renderOptions('Video Quality')}
                                
                              </ul>
                            </div>
                          </Col>
                        </Row>
                      </div>

                      <div className={styles.feedbackRow}>
                        <Row>
                          <Col md={6}>
                            <div className={styles.feedbackContent}>
                              <h2><FormattedMessage id='audio_quality' /></h2>
                              <p><FormattedMessage id='rate_the_quality_of_the_audio_you_experienced' /></p>
                              <div className={styles.circle104}>
                                <img src="/images/black-icons/audio.png" />
                              </div>
                            </div>
                          </Col>
                          <Col md={6}>
                            <div className={styles.feedbackContent}>
                              <ul>
                                {this.renderOptions('Audio Quality')}
                                
                              </ul>                              
                            </div>
                          </Col>
                        </Row>
                      </div>

                      <div className={styles.feedbackRow}>
                        <Row>
                          <Col md={6}>
                            <div className={styles.feedbackContent}>
                              <h2><FormattedMessage id='content_sharing'/></h2>
                              <p><FormattedMessage id='rate_the_quality_of_the_content_sharing_you_experienced'/></p>
                              <div className={styles.circle104}>
                                <img src="/images/black-icons/content-share-black.png" />
                              </div>
                            </div>
                          </Col>
                          <Col md={6}>
                            <div className={styles.feedbackContent}>
                              <ul>
                                {this.renderOptions('Content Sharing')}
                                
                              </ul>
                            </div>
                          </Col>
                        </Row>
                      </div>
                      { this.role ?
                      <div className={styles.feedbackRow}>
                        <Row>
                          <Col md={6}>
                            <div className={styles.feedbackContent}>
                              <h2><FormattedMessage id='knowlegeable_session'/></h2>
                              <p><FormattedMessage id='rate_how_Knowlegeable_this_session_was'/></p>
                              <div className={styles.circle104}>
                                <img src="/images/black-icons/knowSession.png" />
                              </div>
                            </div>
                          </Col>
                          <Col md={6}>
                            <div className={styles.feedbackContent}>
                              <ul>
                                {this.renderOptions('Knowlegable Session')}
                                
                              </ul>                              
                            </div>
                          </Col>
                        </Row>
                      </div>
                      :null}
                      { this.role ?
                      <div className={styles.feedbackRow}>
                        <Row>
                          <Col md={6}>
                            <div className={styles.feedbackContent}>
                              <h2><FormattedMessage id='instructor_skills'/></h2>
                              <p><FormattedMessage id='rate_how_good_instructor_presented_the_subject'/></p>
                              <div className={styles.circle104}>
                                <img src="/images/black-icons/presnterSkills.png" />
                              </div>
                            </div>
                          </Col>
                          <Col md={6}>
                            <div className={styles.feedbackContent}>
                              <ul>
                                {this.renderOptions('Instructor Skills')}
                                
                              </ul>
                            </div>
                          </Col>
                        </Row>
                      </div>
                      :null}
                      <div className={styles.feedbackRow}>
                        <Row>
                          <Col md={6}>
                            <div className={styles.feedbackContent}>
                              <h2><FormattedMessage id='overall_rating'/></h2>
                              <p><FormattedMessage id='provide_the_overall_rating'/></p>
                              <div className={styles.feedbackContent}>
                                <ul>
                                  <li>
                                      <label className={styles.ratingNumInput}>
                                        <input id="rating1" type="radio" value="1" name="Rating" onChange = {this.handleRadioChange}className={cls_fbInputRadio} />
                                        <span className={styles.ratingNum}>1</span>
                                      </label>
                                      <label className={styles.ratingNumInput}>
                                        <input id="rating2" type="radio" value="2" name="Rating"  onChange = {this.handleRadioChange}className={cls_fbInputRadio} />
                                        <span className={styles.ratingNum}>2</span>
                                      </label>
                                      <label className={styles.ratingNumInput}>
                                        <input id="rating3" type="radio" value="3" name="Rating" onChange = {this.handleRadioChange}className={cls_fbInputRadio} />
                                        <span className={styles.ratingNum}>3</span>
                                      </label>
                                      <label className={styles.ratingNumInput}>
                                        <input id="rating4" type="radio" value="4" name="Rating" onChange = {this.handleRadioChange}className={cls_fbInputRadio} />
                                        <span className={styles.ratingNum}>4</span>
                                      </label>
                                      <label className={styles.ratingNumInput}>
                                        <input id="rating5" type="radio" value="5" name="Rating" onChange = {this.handleRadioChange} className={cls_fbInputRadio} />
                                        <span className={styles.ratingNum}>5</span>
                                      </label> 
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </Col>
                          <Col md={6}>
                          <ToastContainer
                            toastMessageFactory={ToastMessageFactory}
                            ref="feedback_container"
                            className="toast-top-right"
                           />
                            <div className={styles.feedbackContent}>
                              <h2><FormattedMessage id='your_comments'/></h2>
                              <p><FormattedMessage id='your_comments_are_highly_appreciated'/></p>
                              <ul>
                                <li>
                                  <textarea id="comment" rows="5" name ="Comment" onChange = {this.handleRadioChange} className={styles.fbTextarea}></textarea> 
                                  <div className={styles.fbSubmitAction}>
                                    <div className={styles.blockSaveAssign}>
                                      <button type="button" id="skipFeebBack" onClick = {this.handleCancel}><FontAwesome name="smile-o"></FontAwesome> <FormattedMessage id='no_thanks'/></button>
                                      <button className={styles.btnSaveAssign} type="button" id="sumitFeebBack" onClick = {this.handleSubmit}>
                                        <FontAwesome name="paper-plane"></FontAwesome> <FormattedMessage id='feedback_submit'/>
                                      </button>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </Col>
                        </Row>
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
  };
}

FeedbackTypeDefault.propTypes = {
  loggedInData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

FeedbackTypeDefault.contextTypes = {
  router: React.PropTypes.object,
  intl: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps)(injectIntl(FeedbackTypeDefault));