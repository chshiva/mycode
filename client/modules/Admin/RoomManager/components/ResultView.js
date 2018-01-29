import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Link, browserHistory } from 'react-router';
import FontAwesome from 'react-fontawesome';
import {Col, Row, Grid} from 'react-bootstrap';
// import { ClearGradesData } from '../../Questionnaire/QuestionnaireActions';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import styles from '../../../Dashboard/Dashboard.css';
import compStyles from '../../../../components/component.css';
import adminStyles from '../../Admin.css';
import MultipleChoice from '../../../Dashboard/UserDashboard/components/MultipleChoice';
import TrueFalse from '../../../Dashboard/UserDashboard/components/TrueFalse';
import MultipleResponsive from '../../../Dashboard/UserDashboard/components/MultipleResponsive';
var _ = require('lodash');


export class ResultView extends Component {

  constructor(props) {
    super(props)  
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.success && nextProps.success != "") {
      this.refs.container.success(`${nextProps.success} `, ``);
    }
    if(nextProps.error && nextProps.error.length > 0) {
      this.refs.container.error(`${nextProps.error} `, ``);
    }
    this.props.clear;    
  }

  viewUser() {
    browserHistory.push('/profile/'+this.props.resultData.submittedBy._id)
  }

  render(){
    let cls_resultsUserName = `${styles.resultsUserName} text-center`;
    
    if(this.props.resultData && this.props.resultData.questionnaireId && this.props.resultData.questionnaireId.questions) {
      var resultData = this.props.resultData;
      var resultDataQuestions = this.props.resultData.questionnaireId.questions
      let profileImage = resultData ? resultData.submittedBy ? resultData.submittedBy.profile ? resultData.submittedBy.profile.profileImage:'':'':'';
      if(profileImage == '' || profileImage == undefined || profileImage == null) {
        var imagePath = '/images/profile-pics/defaultStudent.jpg'
      } else {
        var imagePath = '/uploads/'+profileImage
      }
    }
    

    return (

      <div className={adminStyles.midContainer}>
        <div className={styles.whiteCard}>
          <div className={styles.topicViewheader}>
            <h1 className={styles.mainHeadingTxt}><FormattedMessage id='answer_sheet'/>              
            </h1>
            <h4>
              {this.props.resultData.totalMarks !=0?
                <span className={styles.marksCss}>
                  <FormattedMessage id='Marks'/>: <span className={styles.optainMarks}>{this.props.resultData.obtainedMarks}</span> / <span>{this.props.resultData.totalMarks}</span>
                </span>
              :null}
            </h4>
            <p>
              <FormattedMessage id ='answer_sheet_details'/>                
            </p>
          </div>
          <div className={styles.resultsBlock}>

          </div>
           <div className={styles.resultsBlock}>
            <div className={styles.resultsBody}>
              <div className={styles.userInfoBlock}>
                <Row>
                  <Col md={2}>
                    <div className={styles.resultsAvatar}  onClick={this.viewUser.bind(this)} title={this.props.intl.messages.viewprofile}>
                      <img src={imagePath}/>
                    </div>
                  </Col>
                  <Col md={7}>
                    <div className={styles.resultUserDetails}>
                      <h2 className={styles.resultsUserName}>{resultData ? (resultData.submittedBy ? resultData.submittedBy.firstname : "-") : "-"} {resultData ? (resultData.submittedBy ? resultData.submittedBy.lastname : "-") : "-"}</h2>
                      <div className={styles.resCourseDtl}>
                        <span className={styles.spanNames}><FormattedMessage id ='room'/>: </span>
                        <span>{resultData ? (resultData.roomId ? resultData.roomId.roomName : "-") : "-"}</span>
                      </div>
                      <div className={styles.resCourseDtl}>
                        <span className={styles.spanNames}><FormattedMessage id ='questionnaire'/>: </span>
                        <span>{resultData ? (resultData.questionnaireId ? resultData.questionnaireId.questionnaireName : "-") : "-"}</span>
                      </div>
                    </div>
                  </Col>
                  <Col md={1}>
                    <div className={styles.resultUserDetails}>
                      <h2 className={cls_resultsUserName}><FormattedMessage id ='grade'/></h2>
                      <div className={styles.gradeVal}>
                        <h2>{this.props.resultData.grade}</h2>
                      </div>
                    </div>
                  </Col>
                  <Col md={2}>
                    <div className={styles.resultUserDetails}>
                      <h2 className={cls_resultsUserName}><FormattedMessage id ='questionnaire_result'/></h2>
                      <div className={styles.precentageVal}>
                        <h2>{this.props.resultData.questionnairePercentage}<span>%</span></h2>
                      </div>
                      <div className={styles.resultBg}>
                        <span className={styles.resultTxt}>{this.props.resultData.result}</span>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
          <div className={styles.topicsListBody}>
            <ul>
              {
                resultDataQuestions
                ?
                resultDataQuestions.length > 0
                ?
                resultDataQuestions.map((data, index) => {
                  var indexQuestion = index
                  if(data.questionType == "Radio") {
                    return <MultipleChoice data = {data} key={indexQuestion} wrong = {this.props.resultData.wrongAns} correct = {this.props.resultData.correctAns} showResult={true}/>
                  } else if (data.questionType == "Checkbox") {
                    return <MultipleResponsive data = {data} key={indexQuestion} wrong = {this.props.resultData.wrongAns} correct = {this.props.resultData.correctAns} showResult={true}/>
                  } else if (data.questionType == "TF") {
                    return <TrueFalse data = {data} key={indexQuestion} wrong = {this.props.resultData.wrongAns} correct = {this.props.resultData.correctAns} showResult={true}/>
                  } else if (data.questionType == "Subjective") {
                    // return <Subjective data = {data} key={indexQuestion} answer={this.handleRadioAnswer.bind(this, data)} />
                  }
                  }) 
                   : <p>
                      <span><FormattedMessage id ='no_questions_yet'/></span>
                    </p> : null
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    
  };
}

ResultView.contextTypes = {
  router: React.PropTypes.object,
};

ResultView.propTypes = {
  roomData: PropTypes.object,
  intl: PropTypes.object,
  error : PropTypes.array,
  success : PropTypes.string,
  clear: PropTypes.func
};

export default connect(mapStateToProps)(injectIntl(ResultView));