import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {injectIntl, intlShape,FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';

import {Col, Row, Grid} from 'react-bootstrap';
import ListItem from '../../../../components/ListItem';
import { ClearQuestionnaire, removeQuestionRequest, confirmedRemoveQuestionRequest, showModal, editModal, getQuestionnaireResult } from '../QuestionnaireActions';
import { questionnaireData } from '../QuestionnaireReducer';
import styles from '../../Admin.css';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import Loading from '../../../App/components/Loading';
import WoogeenManager from '../../../Communication/WoogeenManager';
import RenderQuestions from './RenderQuestions.js';

export class ListQuestions extends Component {
  constructor(props) {
    super(props);

    this.confObject = new WoogeenManager()  
  }
  componentDidMount() {
    let questionnaireId = this.props.questionnaireData.data._id;
    this.props.dispatch(getQuestionnaireResult(questionnaireId));;  
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.success != ''){
      this.refs.questions_container.success(`${nextProps.success}`, ``);
      this.props.dispatch(ClearQuestionnaire());
    } else if(nextProps.questionnaireData.deleteSuccess != ''){
      this.refs.questions_container.success(`${nextProps.questionnaireData.deleteSuccess}`, ``);
      this.props.dispatch(ClearQuestionnaire());
    } 
  }

  removeQuestion(e) {
    let questionnaireId = this.props.questionnaireData.data._id;
    let questionId = e.target.id
    var props = this.props;
    var response = this.confirmDeltetion;
    alertify.confirm(this.props.intl.messages.warning,this.props.intl.messages.delete_question_alert, 
      function (result) {
        if(result) {          
          let obj = {
            questionnaireId : questionnaireId,
            questionId : questionId
          }
          props.dispatch(removeQuestionRequest(obj)).then(res => response(res, questionnaireId, questionId))
        }
      },
      function() {

      }
    ).setting('labels',{'ok': this.props.intl.messages.ok,'cancel': this.props.intl.messages.cancel}); 
  }
  //Chnaged by prateek for delete questions bug#2924
  confirmDeltetion = (response, questionnaireId, questionId) => {

    //createdBy: pranathi, disc: reloading the conduct question component in conference side

    let deleteQuestionnaireObj = {
      command : 'RELOAD_CONDUCT_QUESTION',
      content : { questionnaireId:  questionnaireId },
      type : 'OBJECT'
    }

    this.confObject.sendMessage(deleteQuestionnaireObj, 0);
    var props = this.props;
    if(response.httpStatusCode != '' && response.httpStatusCode != undefined) {
      alertify.confirm(this.props.intl.messages.warning,this.props.intl.messages.confirm_delete_question_from_questionnaire, 
        function (result) {
          if(result) {          
            let obj = {
              questionnaireId : questionnaireId,
              questionId : questionId
            }
            props.dispatch(confirmedRemoveQuestionRequest(obj));
          }
        },
        function() {

        }
      ).setting('labels',{'ok': this.props.intl.messages.ok,'cancel': this.props.intl.messages.cancel});
    }
  }

  handleEditQuestion(id) { 
    let questionId = id;    
    this.props.dispatch(editModal(questionId));
    this.props.hideAddQuestionModal();
  }

  render(){
    let loadType = 'list';
    this.clsContainerRight = `${styles.containerRight} pull-right`;
    let listQuestions = <FormattedMessage id ='no_questions_added_to_this_questionnaire'/>;
    if(this.props.questionnaireData && this.props.questionnaireData.data && this.props.questionnaireData.data.questions && this.props.questionnaireData.data.questions.length > 0){
      let questions = this.props.questionnaireData.data.questions;
      listQuestions = questions.map((question, index) => {                         
        return <li key={question._id}>
          <div className="clearfix">  
            <RenderQuestions question={question.question} />             
            {
              this.props.role != 1  
              ?
                this.props.questionnaireData && this.props.questionnaireData.questionnaireResult && this.props.questionnaireData.questionnaireResult.submittedFlag  &&  this.props.questionnaireData.questionnaireResult.submittedFlag == true ?
                  <div className={styles.userAction1} title={this.props.intl.messages.view_edit_question_from_questionnaire} >
                    <FontAwesome name ="pencil-square-o"  onClick={() => this.handleEditQuestion(question._id)} />
                  </div>
                  : null
              :null
            }
            {
              this.props.role != 1 
              ?
              this.props.questionnaireData && this.props.questionnaireData.questionnaireResult && this.props.questionnaireData.questionnaireResult.submittedFlag  &&  this.props.questionnaireData.questionnaireResult.submittedFlag == true ?
                <div className={styles.userAction} title={this.props.intl.messages.remove_question_from_questionnaire} >
                  <FontAwesome name ="times" id={question._id} onClick={this.removeQuestion.bind(this)} />
                </div>
                : null
              :null
            }
          </div>                           
        </li>        
      });
    }

    return (
      <div className={styles.midContainer}>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="questions_container"
          className="toast-top-right"
        />
        <div className={styles.headingBlock}>
          <h2 className={styles.headingTxt}><FormattedMessage id='questionnaire_name' /> - <b>{this.props.questionnaireData.data.questionnaireName}</b></h2>
        </div>
        <div className={styles.whiteCard}>
        { this.props.loading?
            <div className={styles.mainSpinBlock} >
              <div className={styles.innerSpinBlock} >
                <Loading loadType = {loadType}/>
              </div>
            </div> :
          <Grid fluid={true}>
          {
            listQuestions != <FormattedMessage id='no_questions_added_to_this_questionnaire'/>
            ?
            <Row>
              <Col md={12}>
                <div className={styles.infoTxt}>
                  <p><FormattedMessage id ='title_question_details'/>.</p>
                </div>
              </Col>
            </Row> : null
          }
            <Row>
              <Col md={12}>
                <div className={styles.userListGroup}>
                  <ul>
                    {listQuestions}
                  </ul>
                </div>
              </Col>
            </Row>
          </Grid> }
        </div>
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    intl: state.intl,
    questionnaireData : questionnaireData(state),
  };
}

ListQuestions.propTypes = {
  questionnaireData: PropTypes.object,
  success : PropTypes.string
};

export default connect(mapStateToProps)(injectIntl(ListQuestions));
