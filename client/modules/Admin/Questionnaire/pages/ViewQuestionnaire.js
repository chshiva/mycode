import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

import AuthClient from '../../../../components/AuthController.js';
import { isLoggedIn } from '../../../Login/LoginActions';
import { getQuestionnaireData, DeleteQuestionnaire, ClearQuestionnaire, ConfirmDeleteQuestionnaire } from '../QuestionnaireActions';
import { questionnaireData } from '../QuestionnaireReducer';
import { loggedInData } from '../../../Login/LoginReducer';
import QuestionnaireView from '../components/QuestionnaireView';
import Validator from '../../../../components/Validator';
import {editQuestionnaireSchema} from '../schema/QuestionnaireSchema';

import SubMenu from '../../../../components/SubMenu';
import TopMenu from '../../../../components/TopMenu';

import {questionnaireViewSubMenu, questionnaireViewMainMenu, scormQuestionnaireViewSubMenu } from '../schema/QuestionnaireMenu';

// Import Style
import styles from '../../../../components/component.css';
import { loginLanguage } from '../../../Intl/IntlActions';
import {Col, Row, Grid} from 'react-bootstrap';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import { intlData } from '../../../Intl/IntlReducer';
import moment from 'moment';

class ViewQuestionnaire extends Component {
  constructor(props){
    super(props);
    this.state = {loading : true};
    this.mainmenu = questionnaireViewMainMenu;
    this.schema = editQuestionnaireSchema;

    this.mainmenu.menus[2].action = this.editQuestionnaire.bind(this);//this.save.bind(this);
    this.mainmenu.menus[1].action = this.deleteQuestionnaire.bind(this);

    this.submenu = Validator.activeSubMenu(questionnaireViewSubMenu, "lnkViewQuestionnaire");
    this.submenu.menus[0].action = this.viewQuestionnaire.bind(this);
    this.submenu.menus[1].action = this.viewQuestions.bind(this);
  }

  componentDidMount() {
    this.setdata(this.props.loggedInData);    
  }

  setdata(result){
    if (result && result.data && result.data._id) {
      var questionnaireId = this.props.params.cid;
      let obj = { 
        // uid : result.data._id,
        questionnaireId : questionnaireId
      };
      this.props.dispatch(loginLanguage(result.data, this.props.intlData.setlocale));

      // Change By - Najib, Desc - Calling setLoading in promise to set state after receiving response from server
      if(_.isEmpty(this.props.questionnaireData.data) || questionnaireId != this.props.questionnaireData.data._id) {
        this.setState({loading : true}); 
      } else {         
        this.setState({loading : false});
      }
      this.props.dispatch(getQuestionnaireData(obj, '/admin/questionnaire/view/'+questionnaireId)).then(res=>this.setLoading());
    }
  }

  setLoading() {
    //console.log("At set loading");
    this.props.dispatch(ClearQuestionnaire())
    if(this.state.loading) {
      this.setState({loading : false});  
    }
  }

  clear() {
    this.props.dispatch( ClearQuestionnaire());
  }

  editQuestionnaire = () => {
    var response = Validator.freeError(this.schema);
    if(response){
      // this.props.dispatch(UpdateQuestionnaireSchema(response));
      var questionnaireId = this.props.params.cid;  
      browserHistory.push('/admin/questionnaire/edit/'+questionnaireId);
    }
  }

  deleteQuestionnaire = () => {
    var questionnaireId = this.props.params.cid;
    var props = this.props;
    var response = this.setDeleteResponse

    alertify.confirm(this.props.intlData.messages.warning,this.props.intlData.messages.delete_questionaire_alert, 
      function (result) {
        if(result) {          
          let obj = {
            questionnaireId : questionnaireId
          }
          props.dispatch(DeleteQuestionnaire(obj, '/admin/questionnaire/view/'+questionnaireId)).then(res => response(res)); 
        }
      },
      function() {

      }
    ).setting('labels',{'ok': this.props.intlData.messages.ok,'cancel': this.props.intlData.messages.cancel});;
  }

  setDeleteResponse = (response) => {
    // console.log('response in setDeleteResponse', response);
    var questionnaireId = this.props.params.cid;
    var props = this.props;
    var confirmedDelete = this.setConfirmedDeleteResponse
    if(response.httpstatuscode){
      alertify.confirm(this.props.intlData.messages.warning, `${response.error}`, 
      function (result) {
        if(result) {          
          let obj = {
            questionnaireId : questionnaireId,
            dependentModule : response.dependentModule
          }
          props.dispatch(ConfirmDeleteQuestionnaire(obj, '/admin/questionnaire/view/'+questionnaireId)).then(res => confirmedDelete(res)); 
        }
      },
      function() {

      }
    ).setting('labels',{'ok': this.props.intlData.messages.ok,'cancel': this.props.intlData.messages.cancel});      
    }  else if(response.status) {
      browserHistory.push('/admin/questionnaire/list')      
    } else {
      this.refs.questionnaire_container.error(`${response.error} `, ``);
      this.props.dispatch(ClearQuestionnaire())      
    }
  }

  setConfirmedDeleteResponse = (response) => {
    // console.log('response in setConfirmedDeleteResponse', response);
    if(response.status) {
      browserHistory.push('/admin/questionnaire/list')      
    } else {
      this.refs.questionnaire_container.error(`${response.error} `, ``);
      this.props.dispatch(ClearQuestionnaire()) 
    }    
  } 

  viewQuestionnaire = () => {
    var questionnaireId = this.props.params.cid;
    browserHistory.push('/admin/questionnaire/view/'+questionnaireId);
  }

  viewQuestions = () => {
    var questionnaireId = this.props.params.cid;
    browserHistory.push('/admin/questionnaire/questions/'+questionnaireId);
  }


  render() {

    //let clsContainerRight = `${styles.containerRight} pull-right`;
    let cls_container = `${styles.iContainer} ${styles.oContainer} pull-right`;
    let cls_topmenu = `${styles.iTopMenu} ${styles.oTopMenu}`;
    let cls_isubmenu = `${styles.iSubMenu} {styles.oSubMenu}`;

    return (     
      
      <div className={cls_container}>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="questionnaire_container"
          className="toast-top-right"
        />
        <div className={cls_topmenu}>
          <h3 className=""><FormattedMessage id='questionnaire' /></h3>
           <div className={styles.dynamicBreadCrumb}>
            <ul>
              <li><Link to="/admin/questionnaire/list"><FormattedMessage id='all_questionnaire'/></Link></li>
              <li>/</li>
              <li>{this.props.questionnaireData && this.props.questionnaireData.data ? this.props.questionnaireData.data.questionnaireName : null}</li>
            </ul>
          </div>
          <TopMenu data={questionnaireViewMainMenu} />
        </div>
  
        <div className={cls_isubmenu}>
          <SubMenu data={this.props.questionnaireData.data && this.props.questionnaireData.data.questionnaireType === 'scorm' ? scormQuestionnaireViewSubMenu : questionnaireViewSubMenu} />
        </div>
        <QuestionnaireView questionnaireData={this.props.questionnaireData.data} error = {this.props.questionnaireData.error} success = {this.props.questionnaireData.success} clear = {this.clear} loading = {this.state.loading}/>
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    questionnaireData : questionnaireData(state),
    loggedInData: loggedInData(state),
    intlData: intlData(state)
  };
}

ViewQuestionnaire.propTypes = {
  loggedInData: PropTypes.object,
  questionnaireData : PropTypes.object,
  dispatch : PropTypes.func.isRequired
};

ViewQuestionnaire.contextTypes = {
  router : React.PropTypes.object
};

export default connect(mapStateToProps)(ViewQuestionnaire);