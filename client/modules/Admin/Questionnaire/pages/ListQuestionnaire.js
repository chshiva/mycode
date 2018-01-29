import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import AuthClient from '../../../../components/AuthController';
import { isLoggedIn } from '../../../Login/LoginActions';
import { loggedInData } from '../../../Login/LoginReducer';
import Validator from '../../../../components/Validator';
import { QuestionnaireStore, QuestionnaireListRequest, ClearQuestionnaire } from '../QuestionnaireActions';
import { questionnaireData } from '../QuestionnaireReducer';
import ContainerComponent from '../../../../components/ContainerComponent';
import DataTable from '../../../../components/DataTable/DataTable';
import {questionnaireSchema} from '../schema/QuestionnaireSchema';
import {questionnaireListSubMenu, questionnaireListMainMenu} from '../schema/QuestionnaireMenu';
import SubMenu from '../../../../components/SubMenu';
import TopMenu from '../../../../components/TopMenu';

// Import Style
import styles from '../../../../components/component.css';
 import style from '../../Admin.css';
import { loginLanguage } from '../../../Intl/IntlActions';
import {Col, Row, Grid} from 'react-bootstrap';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import { intlData } from '../../../Intl/IntlReducer';
var dataObject = {};

class ListQuestionnaire extends Component {
  constructor(props){
    super(props);
    this.state  = {
      searchValue : '',
      loading : true
    }
    this.schema = questionnaireSchema;
    this.res = {};

    this.submenu = Validator.activeSubMenu(questionnaireListSubMenu, "lnkQuestionnaire");
    this.submenu.menus[0].action = this.questionnaireList.bind(this);
    this.submenu.menus[1].action = this.gradeConfiguration.bind(this);  
    this.mainmenu = questionnaireListMainMenu;
    this.getData = this.getData.bind(this);
    //this.clear = this.clear.bind(this);
    this.currentPage= 1;
    this.itemsPerPage= 5;
  
    this.viewQuestionnaire = this.viewQuestionnaire.bind(this);

    this.mainmenu.menus[0].action = this.addQuestionnaire.bind(this);
    this.searchFilter = this.searchFilter.bind(this);

  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.questionnaireData.deleteSuccess != ''){
      this.refs.questionnaire_container.success(`${nextProps.questionnaireData.deleteSuccess} `, ``);
      this.props.dispatch(ClearQuestionnaire());
    }
  }

  componentDidMount() {
    this.setdata(this.props.loggedInData)
  }

  setdata(result){
    if (result && result.data && result.data._id) {
      this.props.dispatch(loginLanguage(result.data, this.props.intlData.setlocale));
      //this.props.dispatch(QuestionnaireStore({ uid: result.data._id }));
      this.getData({
        currentPage  : this.currentPage,
        totalItems   : 0,
        itemsPerPage : this.itemsPerPage
      });
    }
  }

  questionnaireList = () => {
    browserHistory.push('/admin/questionnaire/list');
  }

  gradeConfiguration = () => {
    browserHistory.push('/admin/grade-configuration');
  }

  getData(pageParam, sort = null){
    // pageParam["uid"] = this.props.loggedInData.data._id;
    if(sort != null)
      pageParam["sortObj"] = sort;
    pageParam["searchKeyword"] = this.state.searchValue;

    // Change By - Najib, Desc - Calling setLoading in promise to set state after receiving response from server
    if(_.isEmpty(this.props.questionnaireData.questionnaireList)) {
      this.setState({loading : true}); 
    } else {       
      this.setState({loading : false});
    }
    this.props.dispatch(QuestionnaireListRequest(pageParam, pageParam.currentPage)).then(res => this.pageData(res));
  }

  pageData(response){
    //console.log("pageData---", res);
    if(response.status == false){
      this.refs.questionnaire_container.error(`${response.error} `, ``);
    }
    if(this.state.loading) {
      this.setState({loading : false});  
    }
  }

  viewQuestionnaire(row){
    let link = "/admin/questionnaire/view/"+row._id;
    return (
      <Link id="questionnaireView" to={link}><i className="fa fa-eye"></i></Link>
    );
  }
  
  addQuestionnaire = () =>{
    var response = Validator.freeValue(this.schema);
    if(response){
      browserHistory.push('/admin/questionnaire/add');
    }    
  }

  description(row){
    if(row.description.length > 10) {
      var description = row.description.substring(0,10) + '...'
      return(
        <div>{description}</div>
      );
    } else {
      return(
        <div>{row.description}</div>
      );
    }
  }

  searchFilter(e){
    e.preventDefault();
    var expVal = e.target.value.trim();
    var pattern = new RegExp(/[+*()?\\]/);
    if(!pattern.test(expVal)){
      this.state.searchValue = e.target.value.trim();
      this.getData({
        currentPage  : this.currentPage,
        totalItems   : 0,
        itemsPerPage : this.itemsPerPage
      });
    }    
  }

  showQuestionnaireDetails(row){
    let link = "/admin/questionnaire/view/"+row._id;
    return (
      <Link id="showQuestionnaire" className = {style.removeStyle} to={link}><div>{row.questionnaireName} </div></Link>
    );
  }

  render() {
    var bredcrumb = (
     <div className={styles.dynamicBreadCrumb}>
        <ul>
          <li><FormattedMessage id='you_are_in_questionarie_list_panel'/></li>
        </ul>
      </div>
    )
    var objDisp = [
          { title : <FormattedMessage id='questionnaire_name' />, type : "function", callback : this.showQuestionnaireDetails, sort : true, dbName : 'questionnaireName'},
          { title : <FormattedMessage id='description' />, type : "function", callback : this.description, sort : true, dbName : 'description' },
          { title : <FormattedMessage id='view' />, type : "function", callback : this.viewQuestionnaire },
        ];

    var filter = [
      {type : 'search', selectedfilter : this.searchFilter }
    ]
       

    return (
      <div>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="questionnaire_container"
          className="toast-top-right"
        />
        <DataTable data={this.props.questionnaireData.questionnaireList}
            count={this.props.questionnaireData.questionnaireCount}
            currentPage = {this.props.questionnaireData.currentQuestionnairePage}
            submenu={this.submenu}
            bredCrumb={bredcrumb}
            topmenu={this.mainmenu}
            itemsPerPage={this.itemsPerPage}
            newDataCallback={this.getData}
            dispField={objDisp}
            pageTitle={this.props.intl.messages.questionnaire} 
            listDescreption={this.props.intl.messages.questionnaires}            
            filter={filter}
            loading={this.state.loading}
        />
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    intl: state.intl,
    loggedInData: loggedInData(state),
    questionnaireData: questionnaireData(state),
    intlData: intlData(state)
  };
}

ListQuestionnaire.propTypes = {
  loggedInData: PropTypes.object,
  questionnaireData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

ListQuestionnaire.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(ListQuestionnaire);
