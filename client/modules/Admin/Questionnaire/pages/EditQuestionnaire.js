import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { browserHistory } from 'react-router';
import AuthClient from '../../../../components/AuthController';
import DataObject from '../../../../components/DataObject';
import { isLoggedIn } from '../../../Login/LoginActions';
import { loggedInData } from '../../../Login/LoginReducer';
import { UpdateQuestionnaireSchema, QuestionnaireStore, updateQuestionnaireRequest, ClearQuestionnaire, getQuestionnaireData, fetchQuestionnaire } from '../QuestionnaireActions';
import { questionnaireData } from '../QuestionnaireReducer';
import Validator from '../../../../components/Validator';
import ContainerComponent from '../../../../components/ContainerComponent';
import {editQuestionnaireSchema} from '../schema/QuestionnaireSchema';
import {questionnaireEditSubMenu, questionnaireEditMainMenu, scormQuestionnaireEditSubMenu } from '../schema/QuestionnaireMenu';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);

import componentStyles from '../../../../components/component.css';
import TopMenu from '../../../../components/TopMenu';
import SubMenu from '../../../../components/SubMenu';
import Label from '../../../../components/Label';

// Import Style
import styles from '../../Admin.css';
import style from '../../../../components/component.css';
import { loginLanguage } from '../../../Intl/IntlActions';
import {Col, Row, Grid} from 'react-bootstrap';
import { intlData } from '../../../Intl/IntlReducer';
import moment from 'moment';

//Chnages done in updateQuestionnaireRequest by Prateek for bug#2970

class EditQuestionnaire extends Component {
  constructor(props){
    super(props);

    this.state = {
      questionnaireName: '',
      description: '',
      isChecked: false,
      validationError: {},
      qId: ''

    }
    this.form = {};
    this.datareceive = this.datareceive.bind(this);
    this.schema = editQuestionnaireSchema;
    this.res = {};
    this.mainmenu = questionnaireEditMainMenu;
    this.submenu = Validator.activeSubMenu(questionnaireEditSubMenu, "lnkViewQuestionnaire");
    this.submenu.menus[0].action = this.viewQuestionnaire.bind(this);
    this.submenu.menus[1].action = this.viewQuestions.bind(this);
    this.mainmenu.menus[1].action = this.save.bind(this);//this.save.bind(this);

  }

  // componentWillMount() {
  //   var roomId = this.props.params.cid;
  //   this.props.dispatch(isLoggedIn(AuthClient.getSession(),
  //                       '/admin/room/edit/'+roomId)).then(res => this.setuserdata(res));
  // }

  componentDidMount() {
    this.setuserdata(this.props.loggedInData);
  }

  setuserdata(result){
    //console.log("result === ",result);
    if (result && result.data && result.data._id) {
      this.props.dispatch(loginLanguage(result.data, this.props.intlData.setlocale));
      var questionnaireId = this.props.params.cid;
      let obj = {
        // uid : result.data._id,
        questionnaireId : questionnaireId
      };
      this.props.dispatch(getQuestionnaireData(obj, '/admin/questionnaire/edit/'+obj.questionnaireId)).then(res => this.setdata(res));
      this.props.dispatch(QuestionnaireStore({ uid: result.data._id }));
      this.props.dispatch(fetchQuestionnaire(this.props.params.cid));
    }
  }

  setdata(result){
    if (result && result.data && result.data._id) {
      this.props.dispatch(QuestionnaireStore(new DataObject(result.data)));
      this.setState({ questionnaireName: this.props.questionnaireData.data.questionnaireName,
      description: this.props.questionnaireData.data.description,
      role : result.data.role });
    }
  }

  handleName(e) {
    e.preventDefault();
    this.setState({
      questionnaireName: e.target.value.trim()
    });
  }

  handleDescription(e) {
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

    if(this.state.qId == ""  &&  this.state.isChecked == true) {
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
        this.form['_id'] = this.props.params.cid;
        this.form['description'] = this.state.description;
        this.form['questionnaireName'] = this.state.questionnaireName;

        if(this.state.qId != "") {
          this.form['qId'] = this.state.qId;
        }
        this.props.dispatch(updateQuestionnaireRequest(this.form)).then(res => this.setresponse(res));
    }


    // console.log(this.form);
    // var response = Validator.validate(this.form, this.schema, this.state.role,this.context.intl);
    // // console.log('response.error.length',response.error.length)
    // if(response.error.length > 0){
    //   this.schema = response.schema;
    //   this.props.dispatch(UpdateQuestionnaireSchema(this.schema));
    // }else{

    // }
  }


  setresponse = (response) => {
    // console.log('response->',response)
    //Changes made by prateek for bug#2970
    if(response.status){
      browserHistory.push('/admin/questionnaire/view/'+response.data._id);
    }else{
      if(response.error[0] == 409 && response.openFrom != undefined) {
        this.refs.questionnaire_container.error("Can't Edit: Already questionnaire is assigned from " + moment(response.openFrom).format("DD/MM/YYYY hh:mm A") + " " + "to" + " " + moment(response.closeFrom).format("DD/MM/YYYY hh:mm A"));
        this.form["_id"] = this.props.params.cid
      } else if(response.error[0] == 409 && response.openFrom == undefined) {
        this.refs.questionnaire_container.error("Can't Edit: Already questionnaire is assigned");
      } else {
        this.refs.questionnaire_container.error(`${response.error} `, ``);
      }
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

  datareceive(data) {
   //console.log("datareceived ----- ", data);
    this.form = data;
  }

  handleKeyPress(e) {
    if(e.key == 'Enter') {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  render() {
     var bredcrumb = (
       <div className={style.dynamicBreadCrumb}>
          <ul>
             <li><Link to="/admin/questionnaire/list"><FormattedMessage id='all_questionnaire'/></Link></li>
              <li>/</li>
              <li><Link onClick={this.viewQuestionnaire}>{this.props.questionnaireData && this.props.questionnaireData.data ? this.props.questionnaireData.data.questionnaireName : null}</Link></li>
              <li>/</li>
              <li><FormattedMessage id ='edit_questionnaire'/></li>
          </ul>
        </div>
        )
    /*if(this.props.loggedInData.data){

        this.name = this.props.loggedInData.data.firstname + ' ' + this.props.loggedInData.data.lastname;
        this.email = this.props.loggedInData.data.email;
        // console.log(strName);
    }
*/
    this.submenu = this.props.questionnaireData.data.questionnaireType === 'scorm' ?
    scormQuestionnaireEditSubMenu :
    Validator.activeSubMenu(questionnaireEditSubMenu, "lnkViewQuestionnaire");

    let clsContainerRight = `${styles.containerRight} pull-right`;
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

    if(this.props.questionnaireData && this.props.questionnaireData.data){

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
                            <input id="questionnaire_name" ref="questionnari_name" type="text"
                              className={this.state.validationError && this.state.validationError.nameError ? cls_error_element : cls_element}
                              placeholder="Questionnaire Name"
                              onChange={this.handleName.bind(this)}
                              onKeyDown={this.handleKeyPress.bind(this)}
                              value = {this.state.questionnaireName}
                              maxLength = {250}/>
                            <label id="questionnaireNameError" className={errcls} >{this.state.validationError && this.state.validationError.nameError ? this.state.validationError.nameError : ''}</label>
                          </formfield>
                        </div>
                        {
                          this.props.questionnaireData.data.questionnaireType === 'scorm' ? null :
                          <div className={cls}>
                            <formfield>
                              <input type="checkbox"
                              onChange={this.handleToggleChange.bind(this)}
                              checked={this.state.isChecked}
                              />&nbsp;
                              {this.props.intlData.messages.clone_from_previoues_questionnaire}
                            </formfield>
                          </div>
                        }
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
                            <textarea id="Description" ref="description"
                              className={this.state.validationError && this.state.validationError.descriptionError ? cls_error_element : cls_element}
                              placeholder="Description"
                              onChange={this.handleDescription.bind(this)}
                              value = {this.state.description}
                              maxLength = {250}/>
                            <label id="DescriptionError" className={errcls} >{this.state.validationError && this.state.validationError.descriptionError ? this.state.validationError.descriptionError : ''}</label>
                          </formfield>
                        </div>
                        {this.props.questionnaireData.data.questionnaireType === 'scorm' && this.props.questionnaireData.data['scormId.fileName'] ?
                          <div className={cls}>
                          <Label data={{text: <FormattedMessage id ="scorm_filename"/> }} required={false} />
                              <div>{this.props.questionnaireData.data['scormId.fileName'].split('_')[1]} </div>
                          </div> : null
                        }
                      </div>
                    </div>
                  </div>
                </form>
              </Row>
            </Grid>
          </div>
        </div>







         {//  <ContainerComponent data={this.schema}
         //    submenu={this.submenu}
         //    topmenu={this.mainmenu}
         //    bredCrumb={bredcrumb}
         //    dataFun = {this.datareceive}
         //    dataobject = {this.props.questionnaireData.data}
         // />
       }
        </div>
      );
    }else{
      return (
        <div>Loading...</div>
      );
    }

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

EditQuestionnaire.propTypes = {
  loggedInData: PropTypes.object,
  questionnaireData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

EditQuestionnaire.contextTypes = {
  router: React.PropTypes.object,
  intl: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps)(EditQuestionnaire);
