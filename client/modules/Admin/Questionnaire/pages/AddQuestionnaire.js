import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

import AuthClient from '../../../../components/AuthController';
import DataObject from '../../../../components/DataObject';
import { isLoggedIn } from '../../../Login/LoginActions';
import { loggedInData } from '../../../Login/LoginReducer';
import Validator from '../../../../components/Validator';

import { QuestionnaireStore, SaveQuestionnaireRequest, ClearQuestionnaire, getCloneQuestionnaires} from '../QuestionnaireActions';
import { questionnaireData } from '../QuestionnaireReducer';

import {questionnaireAddSubMenu, questionnaireAddMainMenu} from '../schema/QuestionnaireMenu';
// Import Style
import styles from '../../Admin.css';
import style from '../../../../components/component.css';
import { loginLanguage } from '../../../Intl/IntlActions';
import {Col, Row, Grid} from 'react-bootstrap';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import { intlData } from '../../../Intl/IntlReducer';

import componentStyles from '../../../../components/component.css';
import TopMenu from '../../../../components/TopMenu';
import SubMenu from '../../../../components/SubMenu';
import Label from '../../../../components/Label';


var dataObject = {};

class AddQuestionnaire extends Component {
  constructor(props){
    super(props);
    this.state = {
      questionnaireName:'',
      description: '',
      validationError: {},
      isChecked: false,
      qId: ''

    }
    this.form = {};
    this.res = {};

    this.submenu = questionnaireAddSubMenu;   
    this.mainmenu = questionnaireAddMainMenu;

    this.mainmenu.menus[1].action = this.save.bind(this);//this.save.bind(this);
  }

  componentDidMount() {
    this.setdata(this.props.loggedInData)
  }

  setdata(result) {
    if (result && result.data && result.data._id) {
      this.props.dispatch(loginLanguage(result.data, this.props.intlData.setlocale));
      this.props.dispatch(QuestionnaireStore({ uid: result.data._id }));
      this.setState({ role : result.data.role });
      this.props.dispatch(getCloneQuestionnaires());
    }
  }

  handleName(e) {
    e.preventDefault();
    this.setState({
      questionnaireName: e.target.value.trim()
    });
  }

  handleDescription (e) {
    e.preventDefault();
    this.setState({
      description: e.target.value.trim()
    });
  }

  handleToggleChange (e) {
    if(e.target.checked == false ) {
      this.setState({
        qId : ''
      });
    }

    this.setState({
      isChecked : e.target.checked
    });
  }

  handleQuestionnaire (e) {
    e.preventDefault();
    this.setState({
      qId: e.target.value
    });
  }

  save = () => {
    let errors = {};
    if(this.state.questionnaireName == "") {
      errors['nameError'] = <FormattedMessage id='questionnaire_name_error' />;
    } 
    if(this.state.description == "" ) {
       errors['descriptionError'] = <FormattedMessage id='questionnaire_description_error' />;
    }

    if(this.state.qId == '' && this.state.isChecked == true ) {
       errors['selectQidError'] = <FormattedMessage id='select_questionnaire' />;
    }

    if (!(_.isEmpty(errors))) {
       this.setState({
         validationError: errors
       });
     } else {
        this.setState({
           validationError: {}
         });
        this.form['questionnaireName'] = this.state.questionnaireName;
        this.form['description'] = this.state.description;
        if(this.state.qId != '') {   
          this.form['qId'] = this.state.qId;
         }
        this.props.dispatch(SaveQuestionnaireRequest(this.form)).then(res => this.setresponse(res));
    }
  }

  setresponse = (response) => {
    if(response.status){
      browserHistory.push('/admin/questionnaire/view/'+response.data._id);
    }else{
      this.refs.questionnaire_container.error(`${response.error} `, ``);
    }
  }

  handleKeyPress(e) {
    if(e.key == 'Enter') {
      e.preventDefault();  
    } 
  }

  render() {
    let cls_topmenu = `${componentStyles.iTopMenu} ${componentStyles.oTopMenu}`;
    let clsForm   = `${componentStyles.iForm} ${componentStyles.oForm}`;
    let cls = `${componentStyles.iFormField} ${componentStyles.oFormField}`;
    let errcls = `${componentStyles.error}`;
    let cls_isubmenu = `${componentStyles.iSubMenu} ${componentStyles.oSubMenu}`; 
    let cls_container = `${componentStyles.iContainer} ${componentStyles.oContainer} pull-right`;
    let cls_group = `${componentStyles.iFormGroup} ${componentStyles.oFormGroup}`;
    let cls_fg = `${componentStyles.iSubFormGroup} ${componentStyles.oSubFormGroup}`;
    let cls_element = `${componentStyles.iElement} ${componentStyles.oElement}`;
    let cls_error_element = `${componentStyles.iElement} ${componentStyles.oElement} ${componentStyles.errorclass}`;
    
    var bredcrumb = (
     <div className={style.dynamicBreadCrumb}>
        <ul>
           <li><Link to="/admin/questionnaire/list"><FormattedMessage id='all_questionnaire'/></Link></li>
            <li>/</li>
            <li><FormattedMessage id ='new_questionnaire'/></li>
        </ul>
      </div>
      )
    if(this.props.questionnaireData && this.props.questionnaireData.data){
        dataObject = this.props.questionnaireData.data;
    }
    return (
      <div className={cls_container}>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="questionnaire_container"
          className="toast-top-right"
        />
        <div className={cls_topmenu}>
          <h3 className=""><FormattedMessage id ="questionnaire"/></h3>
          <div>
            <div>
              {bredcrumb}
            </div>
          </div>
          <TopMenu data={this.mainmenu} activeIcon={null}/>
        </div>
        <div className={cls_isubmenu}>
          <SubMenu data={this.submenu} />
        </div>
        <div className={clsForm}>
          <div className={styles.whiteCard}>
            <Grid fluid={true}>
              <Row>
                <form id="AddQuestionnaire">
                  <div className="col-md-6">
                    <div className={cls_group}>
                      <h2><i className="fa fa-caret-right" aria-hidden="true"></i>&nbsp;<FormattedMessage id='questionnaire_details' /></h2>
                      <div className={cls_fg}>
                        <div className={cls}>
                          <formfield>
                            <Label data={{text: <FormattedMessage id ="questionnaire_name"/> }} required={true} />
                              <input id="questionnaire_name" ref="questionnari_name" type="text" className={this.state.validationError && this.state.validationError.nameError ? cls_error_element : cls_element} 
                              placeholder="Questionnaire Name" 
                              onChange={this.handleName.bind(this)}
                              onKeyDown={this.handleKeyPress.bind(this)}
                              maxLength = {100}/>
                            <label id="questionnaireNameError" className={errcls} >{this.state.validationError && this.state.validationError.nameError ? this.state.validationError.nameError : ''}</label>  
                          </formfield>
                        </div>
                        <div className={cls}>
                          <formfield>
                            <input type="checkbox" 
                             onChange={this.handleToggleChange.bind(this)}
                             checked={this.state.isChecked}
                             />&nbsp;
                            {this.props.intlData.messages.clone_from_previoues_questionnaire}
                          </formfield>
                        </div>
                        {
                          this.state.isChecked == true ?
                            <div className={cls}>
                               <formfield>
                                 <select id="selectQuestionnaire" className={this.state.validationError && this.state.validationError.selectQidError ? cls_error_element : cls_element} 
                                   onChange={this.handleQuestionnaire.bind(this)} >
                                  {
                                    this.props.questionnaireData && this.props.questionnaireData.questionnaireCloneData &&  this.props.questionnaireData.questionnaireCloneData.length > 0?
                                      this.props.questionnaireData.questionnaireCloneData.map((data,i)=> {
                                       return (<option key={i} value={data[0]} > {data[1]} </option>)
                                      })
                                      : null
                                    }
                                </select>
                                <label id="questionnaireDropdownError" className={errcls} >{this.state.isChecked && this.state.validationError && this.state.validationError.selectQidError ? this.state.validationError.selectQidError : ''}</label>  
                             </formfield>
                            </div>
                          : 
                          null
                      }
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className={cls_group}>
                      <h2><i className="" aria-hidden="true"></i>&nbsp;</h2>
                      <div className={cls_fg}>
                        <div className={cls}>
                          <formfield>
                            <Label data={{text: <FormattedMessage id ="description"/> }} required={true} />
                            <textarea id="Description" ref="description" className={this.state.validationError && this.state.validationError.descriptionError ? cls_error_element : cls_element}
                              placeholder="Description"
                              onChange={this.handleDescription.bind(this)} 
                               maxLength = {150}/>
                            <label id="DescriptionError" className={errcls} >{this.state.validationError && this.state.validationError.descriptionError ? this.state.validationError.descriptionError : ''}</label>  
                          </formfield>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </Row>
            </Grid>
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
    questionnaireData: questionnaireData(state),
    intlData: intlData(state)
  };
}

AddQuestionnaire.propTypes = {
  loggedInData: PropTypes.object,
  questionnaireData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

AddQuestionnaire.contextTypes = {
  router: React.PropTypes.object,
  intl: React.PropTypes.object.isRequired
};


export default connect(mapStateToProps)(AddQuestionnaire);

