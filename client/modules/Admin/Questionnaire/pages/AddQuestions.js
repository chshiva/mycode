import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

import AuthClient from '../../../../components/AuthController';
import { isLoggedIn } from '../../../Login/LoginActions';
import { loggedInData } from '../../../Login/LoginReducer';
import Validator from '../../../../components/Validator';

import { getQuestionnaireData, ClearQuestionnaire, showModal, getQuestionnaireResult  } from '../QuestionnaireActions';
import { questionnaireData } from '../QuestionnaireReducer';

import ContainerComponent from '../../../../components/ContainerComponent';

import ListQuestions from '../components/ListQuestions';
import QuestionPopup from '../components/QuestionPopup';

import {questionnaireViewSubMenu, questionsViewMainMenu} from '../schema/QuestionnaireMenu';

import SubMenu from '../../../../components/SubMenu';
import TopMenu from '../../../../components/TopMenu';

// Import Style
import styles from '../../../../components/component.css';
import style from '../../Admin.css';
import { loginLanguage } from '../../../Intl/IntlActions';
import {Col, Row, Grid, Modal} from 'react-bootstrap';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import { intlData } from '../../../Intl/IntlReducer';
import {Header, Title, Body, Footer} from 'react-bootstrap/lib/Modal';


var dataObject = {};
var userObject = {};
var userRole = {};

class AddQuestions extends Component {
  constructor(props){
    super(props);
    // this.form = null;
    this.state = {
      loading  : true,
      showModal: false,
    };
    this.datareceive = this.datareceive.bind(this);

    this.res = {};

    this.submenu = Validator.activeSubMenu(questionnaireViewSubMenu, "lnkViewQuestions");  
    this.mainmenu = questionsViewMainMenu;

    this.mainmenu.menus[0].action = this.showAddQuestions.bind(this);
    this.submenu.menus[0].action = this.viewQuestionnaire.bind(this);
    this.submenu.menus[1].action = this.viewQuestions.bind(this)  

    // this.confObject = new WoogeenManager();

  }

  viewQuestionnaire = () => {
    var questionnaireId = this.props.params.cid;
    browserHistory.push('/admin/questionnaire/view/'+questionnaireId);
  }

  viewQuestions = () => {
    var questionnaireId = this.props.params.cid;
    browserHistory.push('/admin/questionnaire/questions/'+questionnaireId);
  }

  showAddQuestions(e){
    this.setState({showModal : true});    
  }

  componentDidMount() {
    this.setdata(this.props.loggedInData);    
  }

  setdata(result){
    if (result && result.data && result.data._id) {
      this.props.dispatch(loginLanguage(result.data, this.props.intlData.setlocale));
      // Change By - Najib, Desc - Calling setLoading in promise to set state after receiving response from server
      if(_.isEmpty(this.props.questionnaireData.data) || this.props.params.cid != this.props.questionnaireData.data._id) {
        this.setState({loading : true}); 
      } else {       
        this.setState({loading : false});
      }
      var questionnaireId = this.props.params.cid;
      let obj = { 
        uid : result.data._id,
        questionnaireId : questionnaireId
      };
      this.props.dispatch(getQuestionnaireData(obj, '/admin/questionnaire/questions/'+questionnaireId)).then(res=>this.setresponse(res));
      this.props.dispatch(getQuestionnaireResult(questionnaireId)).then(res => this.setResultResponse(res));  
    }
  }

  setresponse = (response) => {
    if(this.state.loading) {
      this.setState({loading : false});  
    }
  }

  setResultResponse = (response) => {
    if(this.state.loading) {
      this.setState({loading : false});  
    }
  }

  datareceive(data) {
    this.form = data;
  }

  viewQuestionnaire(row){
    let link = "/admin/questionnaire/view/"+row._id;
    return (
      <Link id="viewQuestionnaire" to={link}><i className="fa fa-eye"></i></Link>
    );
  }

  hideAddQuestionModal = () => {  
    this.setState({  
      showModal: !this.state.showModal     
    })    
  }

  

  render() {
    //console.log("loggin data", this.props.loggedInData);
    if(this.props.questionnaireData && this.props.questionnaireData.data){
      dataObject = this.props.questionnaireData.data;
    }
    if(this.props.loggedInData && this.props.loggedInData.data){
      userObject = this.props.loggedInData.data;
    }
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
              <li><Link id="allQuestionnaire" to="/admin/questionnaire/list"><FormattedMessage id='all_questionnaire'/></Link></li>
              <li>/</li>
              <li><Link id="viewQuestionnaireBtn" onClick={this.viewQuestionnaire}>{this.props.questionnaireData.data.questionnaireName}</Link></li>
              <li>/</li>
              <li><FormattedMessage id='add_question'/></li>
            </ul>
          </div>
          {
            this.props.questionnaireData && this.props.questionnaireData.questionnaireResult && this.props.questionnaireData.questionnaireResult.submittedFlag  &&  this.props.questionnaireData.questionnaireResult.submittedFlag == true ?
              <TopMenu data={questionsViewMainMenu} />
            : null
          }
        </div>
        <div className={cls_isubmenu}>
          <SubMenu data={questionnaireViewSubMenu} />
        </div>
        <Modal show={this.state.showModal} onHide={this.hideAddQuestionModal.bind(this)}>                           
          <QuestionPopup hideAddQuestionModal={this.hideAddQuestionModal} questionnaireId={this.props.params.cid} uid={userObject._id} questionnaireData={dataObject} />                    
        </Modal> 
        <ListQuestions hideAddQuestionModal={this.hideAddQuestionModal} questionnaireData={dataObject} success={this.props.questionnaireData.success} uid={userObject._id} questionnaireId={this.props.params.cid} role={userObject.role} loading = {this.state.loading}/>
      </div>
    );
  }
}


// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    questionnaireData : questionnaireData(state),
    loggedInData : loggedInData(state),
    intlData: intlData(state)
  };
}

AddQuestions.propTypes = {
  questionnaireData : PropTypes.object,
  loggedInData : PropTypes.object,
  dispatch : PropTypes.func.isRequired
};

AddQuestions.contextTypes = {
  router : React.PropTypes.object
};

export default connect(mapStateToProps)(AddQuestions);
