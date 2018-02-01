import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';

import {Col, Row, Grid} from 'react-bootstrap';

import styles from '../../Admin.css';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import { Roles } from '../../../../roles.js';
var _ = require('lodash');
import Loading from '../../../App/components/Loading';
import RenderQuestions from '../../Questionnaire/components/RenderQuestions.js';

export class ViewUserFeedback extends Component {

  componentWillReceiveProps(nextProps) {
    if(nextProps.success && nextProps.success != "") {
      this.refs.container.success(`${nextProps.success} `, ``);
    }
    if(nextProps.error && nextProps.error.length > 0) {
      this.refs.container.error(`${nextProps.error} `, ``);
    }
    this.props.clear;
  }

  renderGivenFeedback = (feedback) => {
    /*let cls_inlineEditGroup = `${styles.inlineEditGroupFlex} clearfix`;*/
    let cls_fdListBlock = `${styles.fdListBlock} clearfix`;
    let givenFeedback = [];
    feedback.map(function(feedbackData) {
      let randomNumber = Math.floor(Math.random(0-9)*1000*2);
      givenFeedback.push(
        <div className={cls_fdListBlock} key={randomNumber}>
          <label htmlFor={feedbackData.question} className={styles.fdQues}>
            <RenderQuestions question={feedbackData.question} />
          </label>
            <ul className={styles.fdAns}>
              {typeof feedbackData.answer == 'object'
              ?
                feedbackData.answer.length > 0
                ?
                feedbackData.answer .map((answeredOption, i) => {
                  return <li key={i} className={styles.labelResultFlex}>{answeredOption}</li>
                })
                :
                <li>{feedbackData.answer}</li>
              :<li>{feedbackData.answer}</li>}
            </ul>
          </div>
      )      
    })
    // for(var list in feedback) {
    //   let randomNumber = Math.floor(Math.random(0-9)*1000*2);
    //   if(feedback.hasOwnProperty(list)){
    //     var regex = new RegExp('Unicode46','g');
    //     var dotIndex = list.search(regex);
    //     var dollarIndex = list.search('Unicode36');
        
    //     if(dotIndex != -1) {
    //       var replacedQuestion = list.replace(regex, '.');
    //       if(dollarIndex == 0) {
    //         replacedQuestion = replacedQuestion.replace('Unicode36', '$');
    //       }
    //       feedback[replacedQuestion] = feedback[list] ;
    //       delete feedback[list];         
    //     } else if(dollarIndex == 0) {
    //       var replacedQuestion = list.replace('Unicode36', '$');
    //       feedback[replacedQuestion] = feedback[list] ;
    //       delete feedback[list]          
    //     }
    //     //Changes made by prateek just to handle previous records
    //     givenFeedback.push(
            // <div className={cls_fdListBlock} key={randomNumber}>
    //        <label htmlFor={list} className={styles.fdQues}>{list}:</label>
    //        <ul className={styles.fdAns}>
    //           {typeof feedback[list] == 'object'
    //           ?
    //             feedback[list].length > 0
    //             ?
    //             feedback[list].map((answeredOption,i) => {
    //               return <li key={i} className={styles.labelResultFlex}>{feedback[list][i]}</li>
    //             })
    //             :
    //             <li>{feedback[list][0]}</li>
    //           :<li>{feedback[list]}</li>}
    //        </ul>
    //      </div>
    //     );        
    //   }
    // }
    return givenFeedback;
  }

  render(){
    this.clsContainerRight = `${styles.containerRight} pull-right`;
    let cls_fdInfoBlock = `${styles.fdInfoBlock} clearfix`;
    if( this.props.userFeedbackData && this.props.roomdata && this.props.userData){      
      let roleObj = _.invert(Roles);
      let role = this.props.role;
      if(role == Roles.Lmsadmin || role == Roles.Student || role == Roles.Instructor) {
        this.role = true;
      }
      this.roomName = this.props.roomdata.roomName;
      this.userName = this.props.userData.firstname + ' ' + this.props.userData.lastname;      
    }
    let cls_inlineEditGroup = `${styles.inlineEditGroupFlex} clearfix`;
    let loadType = 'list';
    
    return (
      <div className={styles.midContainer}>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="container"
          className="toast-top-right"
         />
         <div className={styles.whiteCard}>
         {/*Code added by - Najib, Desc - condition for adding a loader */}
          { this.props.loading?
            <div className={styles.mainSpinBlock} >
              <div className={styles.innerSpinBlock} >
                <Loading loadType = {loadType}/>
              </div>
            </div> :
          <Grid fluid={true}>
            <Row>
              <Col md={12}>
                <div className={styles.infoTxt}>
                  <p><FormattedMessage id='individual_feedback' /></p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <div className={styles.formField}>
                  {/*<h2><FormattedMessage id='user_feedback_data' /></h2>*/}
                  <div className={styles.txtContainer}>
                    <div className={cls_fdInfoBlock}>
                      <div className={styles.fdInfo}>
                        <label htmlFor="Room Name"><FormattedMessage id='room_name' />:</label>
                        <div className={styles.fdName}>{this.roomName ? this.roomName : "-"}</div>
                      </div>
                      <div className={styles.fdInfo}>
                        <label htmlFor="User Name"><FormattedMessage id='submitted_by' />:</label>
                        <div className={styles.fdName}>{this.userName ? this.userName : "-"}</div>
                      </div>
                  </div>                 
                  {this.renderGivenFeedback(this.props.userFeedbackData)}
                  </div>
                  {/*<hr className={styles.mobHr} />*/}
                </div>
              </Col>
            </Row>
          </Grid> }
        </div>
      </div>
    );
  }
}

ViewUserFeedback.contextTypes = {
  router: React.PropTypes.object,
};

ViewUserFeedback.propTypes = {
  roomdata: PropTypes.object,
  userFeedbackData: PropTypes.array,
  intl: PropTypes.object,
  error : PropTypes.array,
  success : PropTypes.string,
  clear: PropTypes.func
};

export default ViewUserFeedback;