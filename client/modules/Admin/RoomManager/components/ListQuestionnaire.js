import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {injectIntl, intlShape, FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';

import {Col, Row, Grid} from 'react-bootstrap';
import ListItem from '../../../../components/ListItem';
import { ClearRoom, unassignQuestionnaireRequest, showModal, editModal, confirmedUnassignQuestionnaireRequest } from '../RoomActions';
import { roomData } from '../RoomReducer';
import styles from '../../Admin.css';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import { browserHistory } from 'react-router';
import { setWorkDashboard } from '../../../Dashboard/UserDashboard/components/WorkDashboardActions';
import WoogeenManager from '../../../Communication/WoogeenManager';
import { workDashboardData } from '../../../Dashboard/UserDashboard/components/WorkDashboardReducer';


export class ListQuestionnaire extends Component {
  constructor(props){
    super(props);

    this.confObject = new WoogeenManager();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.success != ''){
      this.refs.questionnaire_container.success(`${nextProps.success}`, ``);
      this.props.dispatch(ClearRoom());
    } 
  }

  setresponse = (response) => {
    if(response.status){
      this.refs.questions_container.success(`${response.message} `, ``);
    }else{
      this.refs.questions_container.error(`${response.error} `, ``);
    }
  }

  removeQuestionnaire(e) {
    let questionnaireId = e.target.id
    let topicId = this.props.topicId
    var props = this.props;
    // var response = this.setDeleteResponse;
    let self = this;   
    alertify.confirm(this.props.intl.messages.warning,this.props.intl.messages.unassign_question_alert, 
      function (result) {
        if(result) {          
          let obj = {
            questionnaireId : questionnaireId,
            topicId : topicId
          }
          props.dispatch(unassignQuestionnaireRequest(obj)).then(res => self.setDeleteResponse(res, obj.topicId, obj.questionnaireId ));         
        }
      },
      function() {

      }
    ).setting('labels',{'ok': this.props.intl.messages.ok,'cancel': this.props.intl.messages.cancel});
  }

  setDeleteResponse(response, tId, qId){
    //changeBy: pranathi, disc: at the time of deleting questionnaire, updating workDashboard store
    let obj = {
      command : 'RELOAD_TOPIC_QUESTIONNAIRES',
      content : { tid: tId },
      type : 'OBJECT'
    };

    this.confObject.sendMessage(obj, 0);

    let deleteQuestionnaireObj = {
      command : 'RELOAD_REMOVED_QUESTIONNAIRES',
      content : { tid: tId, questionnaireId: qId},
      type : 'OBJECT'
    }
    this.confObject.sendMessage(deleteQuestionnaireObj, 0);

    // console.log('response coming', response);
    if(response.httpStatusCode && !response.status) {
      let questionnaireId = response.questionnaireId;
      let topicId = this.props.topicId
      var props = this.props;
      var response = this.setresponse;      
      alertify.confirm(this.props.intl.messages.warning,this.props.intl.messages.confirm_unassign_questionnaire_topics, 
        function (result) {
          if(result) {          
            let obj = {
              questionnaireId : questionnaireId,
              topicId : topicId
            }
            props.dispatch(confirmedUnassignQuestionnaireRequest(obj))          
          }
        },
        function() {

        }
      ).setting('labels',{'ok': this.props.intl.messages.ok,'cancel': this.props.intl.messages.cancel});
    } else if(!response.status){
      this.refs.questions_container.error(`${response.error} `, ``);
    }    
  }

  handleEditQuestionnaire(id) {
    let editId = id
    let data = "true" 
    this.props.dispatch(showModal(data))
    this.props.dispatch(editModal(editId))
  }

  handleListResults(id){
    browserHistory.push("/admin/room/list-results/"+this.props.roomId+'/'+this.props.topicId+'/'+id)
  }

  render(){
    this.clsContainerRight = `${styles.containerRight} pull-right`;
    let listQuestionnaires = <FormattedMessage id ='No_Questionnaires_assigned_to_this_topic'/>;
    if(this.props.topicData && this.props.topicData.questionnaire && this.props.topicData.questionnaire.length > 0){
      let questionnaire = this.props.topicData.questionnaire;
      listQuestionnaires = questionnaire.map((questionnaire) => {
        return <li key={questionnaire._id}>
          <div className="clearfix" >
            <h4 className="pull-left">
            {questionnaire.questionnaireId.questionnaireName ? questionnaire.questionnaireId.questionnaireName : "-"}
            </h4>
            {
              this.props.role != 1
              ?
              <div id="listResults" className={styles.userAction2} title={this.props.intl.messages.list_results} >
                <FontAwesome name ="list-alt" id={questionnaire._id} onClick={() => this.handleListResults(questionnaire.questionnaireId._id)} />
              </div>
              : null
            }
            {
              this.props.role != 1
              ?
              <div id="viewEditQuestionnaire" className={styles.userAction1} title={this.props.intl.messages.view_edit_questionaire_from_topic}>
                <FontAwesome name ="pencil-square-o"  onClick={() => this.handleEditQuestionnaire(questionnaire._id)} />
              </div>
              : null
            }
            {
              this.props.role != 1
              ?
              <div id="removeQuestionnaire" className={styles.userAction} title={this.props.intl.messages.unassign_questionnaire_from_topic} >
                <FontAwesome name ="times" id={questionnaire.questionnaireId._id} onClick={this.removeQuestionnaire.bind(this)} />
              </div>
              : null
            }
          </div>
        </li>

      });
    }

    return (
      <div className={styles.midContainer}>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="questionnaire_container"
          className="toast-top-right"
        />
        <div className={styles.headingBlock}>
          <h2 className={styles.headingTxt}><FormattedMessage id='topic_name' /> - <b>{this.props.topicData.topicName}</b></h2>
        </div>
        <div className={styles.whiteCard}>
          <Grid fluid={true}>
          {
            listQuestionnaires != "No Questionnaires assigned to this topic."
            ?
            <Row>
              <Col md={12}>
                <div className={styles.infoTxt}>
                  <p><FormattedMessage id ='title_questionnaire_assigned'/>.</p>
                </div>
              </Col>
            </Row> : null
          }
            <Row>
              <Col md={12}>
                <div className={styles.userListGroup}>
                  <ul>
                    {listQuestionnaires}
                  </ul>
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    intl: state.intl,
    roomData : roomData(state),
    workDashboardData : workDashboardData(state)
  };
}

ListQuestionnaire.propTypes = {
  topicData: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  success : PropTypes.string
};

export default connect(mapStateToProps)(injectIntl(ListQuestionnaire));
