import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';
import {Col, Row, Grid, Modal} from 'react-bootstrap';
import {Header, Title, Body, Footer} from 'react-bootstrap/lib/Modal';
import { AssignQuestionnaireRequest, showModal, editModal } from '../RoomActions';
var _ = require('lodash');
import style from '../../Admin.css';
import moment from 'moment';
import DateTimeField from 'react-bootstrap-datetimepicker';
import ReactDOM from 'react-dom';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import WoogeenManager from '../../../Communication/WoogeenManager';

class QuestionnairePopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
        uid: null,
        showModal: false,
        editId : '',
        openFrom: moment().format('DD/MM/YYYY hh:mm A'),
        openFromFormat: "DD/MM/YYYY hh:mm A",
        openFromInputFormat: "DD/MM/YYYY hh:mm A",
        // openFromMode: "date",  
        closeFrom: moment().format('DD/MM/YYYY hh:mm A'),     
        minDate: moment(),
        inputFromDate : null,
        inputCloseDate : null,
        timeLimit: false,
        showResult : false  
    };

    this.confObject = new WoogeenManager();
  }

  componentWillReceiveProps(nextProps) {
    // console.log("next", nextProps)
    if(nextProps.showModal == "true") {
      this.setState({
        showModal: true
      })
    } 
    if(nextProps.editModal != undefined && nextProps.editModal != true ) {
      for(var i = 0; i < nextProps.topicData.questionnaire.length; i++) {
        if(nextProps.topicData.questionnaire[i]._id == nextProps.editModal) {
          var data = nextProps.topicData.questionnaire[i]
          if((data.openFrom == undefined && data.closeFrom == undefined) || (data.openFrom == null && data.closeFrom == null)) {
            this.setState({
              uid: null,
              openFrom: moment().format('DD/MM/YYYY hh:mm A'),
              closeFrom: moment().format('DD/MM/YYYY hh:mm A'),
              openFromFormat: "DD/MM/YYYY hh:mm A",
              openFromInputFormat: "DD/MM/YYYY hh:mm A",
              // openFromMode: "date",  
              minDate: moment(),  
              editId : nextProps.editModal,
              timeLimit : false,
              showResult : data.showResult == true?true:false
            });
          } else {
            this.setState({
              uid: null,
              openFrom: moment(data.openFrom).format('DD/MM/YYYY hh:mm A'),
              closeFrom: moment(data.closeFrom).format('DD/MM/YYYY hh:mm A'),
              openFromFormat: "DD/MM/YYYY hh:mm A",
              openFromInputFormat: "DD/MM/YYYY hh:mm A",
              // openFromMode: "date",  
              minDate: moment(),  
              editId : nextProps.editModal,
              timeLimit : true,
              showResult : data.showResult == true?true:false
            });
          }
        }
      }
    } 
  }

  hideAssignQuestionnaireModal() {
    //console.log('coming');
    this.setState({
      uid: null,
      showModal: false,
      editId : '',
      openFrom: moment().format('DD/MM/YYYY hh:mm A'),
      openFromFormat: "DD/MM/YYYY hh:mm A",
      openFromInputFormat: "DD/MM/YYYY hh:mm A",
      // openFromMode: "date",  
      closeFrom: moment().format('DD/MM/YYYY hh:mm A'),     
      minDate: moment(),
      timeLimit : false,
      showResult : false 
    });
    
    //Changed made by prateek for clearing modal on cancel edit 
    //Date : 12th Sep 2017
    let data = "" 
    let editId = ''
    this.props.dispatch(showModal(data))
    this.props.dispatch(editModal(editId))
  }

  assignQuestionnaire = () => {
    const index = ReactDOM.findDOMNode(this.refs.questionnaire).value;
    let questionnaireId = null;
    let questionnaireQuestionCount = null;
    if(this.props.editModal == undefined || this.props.editModal == true){    
      const questionnaireData = index != ''?this.props.questionnaireData[index]:null;
      questionnaireQuestionCount = questionnaireData != null?questionnaireData.questions.length:null;
      questionnaireId = questionnaireData != null?questionnaireData._id:'';
    } else {
      questionnaireId = index;  
    } 
    // const questionnaireName = questionnaireData.split(',')[1]
    var ipstime = moment(this.state.openFrom, "DD/MM/YYYY hh:mm A")
    var ipetime = moment(this.state.closeFrom, "DD/MM/YYYY hh:mm A")
    var now = moment()

    if(questionnaireId != "") {
      if(this.state.timeLimit) {        
        if(this.state.inputFromDate == false) {
          this.refs.questionnaire_container.error("Invalid Start Time");
        } else if(this.state.inputCloseDate == false) {
          this.refs.questionnaire_container.error("Invalid End Time");
        } else if(+ipstime < +now && this.props.editModal == undefined) {
          this.refs.questionnaire_container.error("Start time should be greater than current time");
        } else if (+ipstime == +ipetime) {
          this.refs.questionnaire_container.error("Start and end time cannot be same");
        } else if (+ipstime > +ipetime) {
          this.refs.questionnaire_container.error("End time should be greater than Start time");
        } else if ((this.props.editModal == undefined && questionnaireQuestionCount <= 0) || (this.props.editModal == true && questionnaireQuestionCount <= 0)) {
          this.refs.questionnaire_container.error("Please assign a questionnaire which has atleast one question in it");
        } else {
          var questionnaire = {
            openFrom: moment(this.state.openFrom, "DD/MM/YYYY hh:mm A").utc().toDate(),
            closeFrom: moment(this.state.closeFrom, "DD/MM/YYYY hh:mm A").utc().toDate(),
            uid: this.props.uid,
            questionnaireId: questionnaireId,
            topicId: this.props.topicData._id,
            editId : this.state.editId,
            showResult : this.state.showResult
          }
          this.props.dispatch(AssignQuestionnaireRequest({questionnaire})).then(res => this.setresponse(res,questionnaire.topicId, questionnaire.questionnaireId));
        }        
      } else {
        if ((this.props.editModal == undefined && questionnaireQuestionCount <= 0) || (this.props.editModal == true && questionnaireQuestionCount <= 0)) {
          this.refs.questionnaire_container.error("Please assign a questionnaire which has atleast one question in it");
        } else {
          var questionnaire = {
            uid: this.props.uid,
            questionnaireId: questionnaireId,
            topicId: this.props.topicData._id,
            editId : this.state.editId,
            showResult : this.state.showResult
          }
          this.props.dispatch(AssignQuestionnaireRequest({questionnaire})).then(res => this.setresponse(res, questionnaire.topicId, questionnaire.questionnaireId));
        }
      }
    } else {
      this.refs.questionnaire_container.error("Please assign a questionnaire");
    }
  }

  setresponse = (response, tId, qId) => {
    if(response.status){
      this.setState({
      uid: null,
      showModal: false,
      openFrom: moment().format('DD/MM/YYYY hh:mm A'),
      openFromFormat: "DD/MM/YYYY hh:mm A",
      openFromInputFormat: "DD/MM/YYYY hh:mm A",
      // openFromMode: "date",  
      closeFrom: moment().format('DD/MM/YYYY hh:mm A'),     
      minDate: moment(),
      inputFromDate : null,
      inputCloseDate : null,
      timeLimit: false,
      showResult : false 
    });
    let data = ""; 
    let editId = '';
    this.props.dispatch(showModal(data));
    this.props.dispatch(editModal(editId));

    let obj = {
      command : 'RELOAD_TOPIC_QUESTIONNAIRES',
      content : { tid: tId },
      type : 'OBJECT'
    };
    this.confObject.sendMessage(obj, 0);

    let conductQuestionObj = {
      command : 'RELOAD_REMOVED_QUESTIONNAIRES',
      content : { tid: tId, questionnaireId: qId },
      type : 'OBJECT'
    };
    this.confObject.sendMessage(conductQuestionObj, 0);

    }else{
      if(response.error[0] == 409) {
        this.refs.questionnaire_container.error("Time Conflict: Already questionnaire is assigned from " + moment(response.openFrom).format("DD/MM/YYYY hh:mm A") + " " + "to" + " " + moment(response.closeFrom).format("DD/MM/YYYY hh:mm A"));
      } else {
        this.refs.questionnaire_container.error(`${response.error} `, ``);
      }
    }
  }

  handleQuestionnaire() {

  }

  handleOpenFrom(newDate) {
    moment(newDate, "DD/MM/YYYY hh:mm A").isValid() 
    ? this.setState({
        openFrom : newDate,
        inputFromDate : null
      })
    : this.setState({inputFromDate: false});
  }

  handleCloseFrom(newDate) {
    moment(newDate, "DD/MM/YYYY hh:mm A").isValid() 
    ? this.setState({
        closeFrom : newDate,
        inputCloseDate : null
      })
    : this.setState({inputCloseDate: false});
  }

  handleTimeLimit() {
    this.setState({
      timeLimit: !this.state.timeLimit // flip boolean value
    });
  }

  handleShowResult() {
    this.setState({
      showResult: !this.state.showResult 
    });    
  }

  render() {
    let cls_btnSaveAssign = ` ${style.btnSaveAssign} `;
    let listQuestionnaires = null
    let disabledListQuestionnaire = null
    if(this.props.questionnaireData && this.props.questionnaireData.length > 0){
      let questionnaire = this.props.questionnaireData;
      listQuestionnaires = questionnaire.map((questionnaire, index) => {
        return <option key={questionnaire._id} value={index}>{questionnaire.questionnaireName}</option>
      });
    } 

    if (this.props.editModal != undefined && this.props.editModal != true) {
      for(var i = 0; i < this.props.topicData.questionnaire.length; i++) {
        if(this.props.topicData.questionnaire[i]._id == this.props.editModal) {
          var questionnaire = this.props.topicData.questionnaire[i]
          disabledListQuestionnaire = (
            <select className="form-control" onChange={this.handleQuestionnaire.bind(this)} ref="questionnaire" disabled>
              <option key={questionnaire.questionnaireId._id} value={questionnaire.questionnaireId._id}>{questionnaire.questionnaireId.questionnaireName}</option>
            </select>
          )
        }
      }
    }

    const {openFrom, openFromFormat, openFromInputFormat, openFromMode, closeFrom, minDate} = this.state;

    return (
      <div>
        <ToastContainer
            toastMessageFactory={ToastMessageFactory}
            ref="questionnaire_container"
            className="toast-top-right"
          />
        <Modal show={this.state.showModal} onHide={this.hideAssignQuestionnaireModal.bind(this)}>
          <Header closeButton>
            <Title className={style.popHeadingAll} ><FormattedMessage id = 'assign_questionnaire'/></Title>
          </Header>
          <Body>
            <form className="form-horizontal">
              <div className="form-group">
                <label htmlFor="inputType" className="control-label col-md-2" ><FormattedMessage id ='questionnaire'/>:</label>
                <div className="col-md-10">
                {
                  disabledListQuestionnaire != null
                  ?
                  disabledListQuestionnaire
                  :              
                  <select id="questionnaire" className="form-control" onChange={this.handleQuestionnaire.bind(this)} ref="questionnaire">
                  {
                    listQuestionnaires != null
                    ?
                    listQuestionnaires
                    : <option value="">No questionnaires present</option>
                  }
                  </select>
                }

                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-offset-2 col-sm-10">
                  <Row>
                    <Col sm={4}>
                      <div className="checkbox">
                        <label htmlFor="inputCheck"><input type="checkbox" id="timeLimit" className={style.checkAssignQues} checked={this.state.timeLimit} onChange={this.handleTimeLimit.bind(this)}/><FormattedMessage id='time_limit' /></label>
                      </div>                      
                    </Col>
                    <Col sm={4}>
                      <div className="checkbox">
                        <label htmlFor="ResultCheck"><input type="checkbox" id="showResult" className={style.checkAssignQues} checked={this.state.showResult} onChange={this.handleShowResult.bind(this)}/><FormattedMessage id='show_result' /></label>
                      </div>
                    </Col>
                  </Row>                              
                </div>                
              </div>
              {
                this.state.timeLimit
                ?
                <div className="form-group">
                  <label htmlFor="inputType" className="control-label col-md-2 " ><FormattedMessage id ='start_time'/>:</label>
                  <div className="col-md-10" id="startTime">
                    <DateTimeField                
                      dateTime={openFrom}
                      format={openFromFormat}
                      inputFormat={openFromInputFormat}
                      onChange={this.handleOpenFrom.bind(this)}
                      mode={openFromMode}
                      minDate={minDate}
                      />
                  </div>
                </div>
                : null
              }
              {
                this.state.timeLimit
                ?
                <div className="form-group">
                  <label htmlFor="inputType" className="control-label col-md-2" ><FormattedMessage id ='end_time'/>:</label>
                  <div className="col-md-10" id="endTime">
                    <DateTimeField                
                      dateTime={closeFrom}
                      format={openFromFormat}
                      inputFormat={openFromInputFormat}
                      onChange={this.handleCloseFrom.bind(this)}
                      mode={openFromMode}
                      minDate={minDate}
                      />
                  </div>
                </div>
                : null 
              }
            </form>
          </Body>
          <Footer className={style.mainSaveAssign}>
            <div className={style.blockSaveAssign} >
              <button id="cancel" onClick={this.hideAssignQuestionnaireModal.bind(this)}><FormattedMessage id='cancel'/></button>
              <button id="save" className={cls_btnSaveAssign} onClick={this.assignQuestionnaire} ><FormattedMessage id='save'/></button>
            </div>
          </Footer>
        </Modal>
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    
  };
}

QuestionnairePopup.propTypes = {
  intl: PropTypes.object,
  showModal: PropTypes.string,
  hidecallback: PropTypes.func,
  // dispatch: PropTypes.func.isRequired,
};

QuestionnairePopup.contextTypes= {
    intl: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(QuestionnairePopup);
