import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import AuthClient from '../../../../components/AuthController';
import { isLoggedIn } from '../../../Login/LoginActions';
import { loggedInData } from '../../../Login/LoginReducer';
import Validator from '../../../../components/Validator';
import { getResultData, TopicResultList, ClearRoom, getRoomData } from '../RoomActions';

import { roomData } from '../RoomReducer';

import DataTable from '../../../../components/DataTable/DataTable';

// import {roomSchema} from '../schema/RoomSchema';
import {roomTopicSchema} from '../schema/RoomSchema';
import {listResultMainMenu, listResultSubMenu} from '../schema/RoomMenu';

import SubMenu from '../../../../components/SubMenu';
import TopMenu from '../../../../components/TopMenu';

// Import Style
import styles from '../../../../components/component.css';
// import styles from '../../Admin.css';
import { loginLanguage } from '../../../Intl/IntlActions';
import {Col, Row, Grid} from 'react-bootstrap';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import { intlData } from '../../../Intl/IntlReducer';
var dataObject = {};

class ListResults extends Component {
  constructor(props){
    super(props);
    
    this.schema = roomTopicSchema;
    this.res = {};

    this.submenu = listResultSubMenu
    this.mainmenu = listResultMainMenu;
    this.getData = this.getData.bind(this);
    //this.clear = this.clear.bind(this);
    this.currentPage= 1;
    this.itemsPerPage= 5;

    this.submenu.menus[0].action = this.viewQuestionnaire.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.roomData.success != ''){
      this.refs.result_container.success(`${nextProps.roomData.success} `, ``);
      this.props.dispatch(ClearRoom());
    }
  }

  componentDidMount() {
    this.setdata(this.props.loggedInData)
  }

  setdata(result){
    if (result && result.data && result.data._id) {
      this.props.dispatch(loginLanguage(result.data, this.props.intlData.setlocale));
      var obj = {
        uid : result.data._id,
        roomId : this.props.params.rid,
        topicId : this.props.params.tid,
        questionnaireId : this.props.params.qid
      }
      //this.props.dispatch(RoomStore({obj}));
      this.getData({
        currentPage  : this.currentPage,
        totalItems   : 0,
        itemsPerPage : this.itemsPerPage
      });
      this.props.dispatch(getRoomData(obj,''));
    }
  }

  getData(pageParam){
    // pageParam["uid"] = this.props.loggedInData.data._id;
    pageParam["roomId"] = this.props.params.rid;
    pageParam["topicId"] = this.props.params.tid;
    pageParam["questionnaireId"] = this.props.params.qid;
    this.props.dispatch(TopicResultList(pageParam, pageParam.currentPage)).then(res => this.pageData(res));
  }

  pageData(response){
    //console.log("pageData---", res);
    if(response.status == false){
      this.refs.result_container.error(`${response.error} `, ``);
    }
  }

  viewQuestionnaire = () => {
    var roomId = this.props.params.rid;
    var topicId = this.props.params.tid;
    browserHistory.push('/admin/room/questionnaire/'+topicId+'/'+roomId);
  }

  viewroom = () => {
    // console.log("ViewRoomSubtab");
    var roomId = this.props.params.rid;
    browserHistory.push('/admin/room/view/'+roomId);
  }

  listtopic = () => {
    //console.log("AddUserSubtab");
    var roomId = this.props.params.rid;
    browserHistory.push('/admin/room/listtopic/'+roomId);
  }

  questionnaireName(row){
    if(row.questionnaireId == null) {
      return (
          <div>-</div>
        )
    } else {
      return(
          <div>{row.questionnaireId.questionnaireName}</div>
        );
    }
  }

  candidateName(row){
    if(row.submittedBy == null) {
      return (
          <div>-</div>
        )
    } else {
      var candidateName = row.submittedBy.firstname + " " + row.submittedBy.lastname
      return(
          <div>{candidateName}</div>
        );
    }
  }

  roomName(row){
    if(row.roomId == null) {
      return (
          <div>-</div>
        )
    } else {
      var roomName = row.roomId.roomName
      return(
          <div>{roomName}</div>
        );
    }
  }

  viewResults(row){
    var roomId = row.roomId._id;
    var topicId = row.topicId;
    var questionnaireId = row.questionnaireId._id;
    var link = "/admin/room/view-results/"+roomId+'/'+topicId+'/'+questionnaireId+'/'+row._id

    if (row.questionnaireId.questionnaireType === 'scorm') {
      return (<div> &nbsp;&nbsp;- </div>);
    }
    return (
      <Link id="questionnaireResult" to={link}><i className="fa fa-eye"></i></Link>
    );
  }

  questionnaireResult(row){
    return (
      <div>
        <span>{row.questionnairePercentage}% </span>
        <span>Grade {row.grade}</span>        
      </div>
    )
  }

  render() {

    let cls_failColor = `${styles.gradeColor} ${styles.red}`;

    var bredcrumb = (
      <div className={styles.dynamicBreadCrumb}>
        <ul>
          <li> 
            <Link to="/admin/room/list"><FormattedMessage id = 'all_rooms'/></Link>
          </li>
          <li>/</li>
            <li><Link onClick={this.viewroom}>{this.props.roomData.data.roomName}</Link></li>
          <li>/</li>
          <li>
            <Link onClick={this.listtopic}><FormattedMessage id = 'topic_list'/></Link>
          </li>
           <li>/</li>
          <li>
           <Link onClick={this.viewQuestionnaire}>{this.props.roomData.topicdata.topicName}</Link>
          </li>
            <li>/</li>
          <li>
            <FormattedMessage id='result_list'/>
          </li>
        </ul>
      </div>
      )

    var objDisp = [
          { title : <FormattedMessage id='candidate_name' />, type : "function", callback : this.candidateName },
          { title : <FormattedMessage id='questionnaire_name' />, type : "function", callback : this.questionnaireName },
          { title : <FormattedMessage id='room_name' />, type : "function", callback : this.roomName },
          { title : <FormattedMessage id='questionnaire_result' />, type : "function", callback : this.questionnaireResult},
          { title : <FormattedMessage id='view' />, type : "function", callback : this.viewResults },
        ];

    return (      
      <div>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="result_container"
          className="toast-top-right"
        />
        <DataTable data={this.props.roomData.resultList}
            count={this.props.roomData.resultCount}
            currentPage = {this.props.roomData.currentResultPage}
            submenu={this.submenu}
            bredCrumb={bredcrumb}
            topmenu={this.mainmenu}
            itemsPerPage={this.itemsPerPage}
            newDataCallback={this.getData}
            dispField={objDisp}
            pageTitle={this.props.intl.messages.result_list}
            listDescreption={this.props.intl.messages.results} 
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
    roomData: roomData(state),
    intlData: intlData(state)    
  };
}

ListResults.propTypes = {
  loggedInData: PropTypes.object,
  roomData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

ListResults.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(ListResults);
