import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { questionnaireData } from '../../Questionnaire/QuestionnaireReducer';
import AuthClient from '../../../../components/AuthController.js';
import { isLoggedIn } from '../../../Login/LoginActions';
import { getResultData, ClearRoom } from '../RoomActions';
import { roomData } from '../RoomReducer';
import { loggedInData } from '../../../Login/LoginReducer';
import ResultView from '../components/ResultView';
import Validator from '../../../../components/Validator';
import {roomSchema} from '../schema/RoomSchema';
import SubMenu from '../../../../components/SubMenu';
import TopMenu from '../../../../components/TopMenu';

import {viewResultSubMenu, listResultMainMenu} from '../schema/RoomMenu';

// Import Style
import styles from '../../../../components/component.css';

import {Col, Row, Grid} from 'react-bootstrap';
import { loginLanguage } from '../../../Intl/IntlActions';
import { intlData } from '../../../Intl/IntlReducer';
var _ = require('lodash');

class ViewResults extends Component {
  constructor(props){
    super(props);
    
    this.mainmenu = listResultMainMenu;
    this.schema = roomSchema;

    this.submenu = viewResultSubMenu
    this.submenu.menus[0].action = this.listResults.bind(this);
  }

  componentDidMount() {
    this.setdata(this.props.loggedInData);    
  }

  setdata(result){
    if (result && result.data && result.data._id) {
      this.props.dispatch(loginLanguage(result.data, this.props.intlData.setlocale));
      var resultId = this.props.params.cid;
      this.props.dispatch(getResultData(resultId))      
    }
  }

  clear() {
    this.props.dispatch(ClearRoom());
  }

  listtopic = () => {
    //console.log("AddUserSubtab");
    var roomId = this.props.params.rid;
    browserHistory.push('/admin/room/listtopic/'+roomId);
  }

  listResults = () => {
    var roomId = this.props.params.rid;
    var topicId = this.props.params.tid;
    var questionnaireId = this.props.params.qid;
    browserHistory.push('/admin/room/list-results/'+roomId+'/'+topicId+'/'+questionnaireId);
  }

  viewQuestionnaire = () => {
    var roomId = this.props.params.rid;
    var topicId = this.props.params.tid;
    browserHistory.push('/admin/room/questionnaire/'+topicId+'/'+roomId);
  }
  viewroom = () => {
    // console.log("ViewRoomSubtab");
    var roomId = this.props.params.cid;
    browserHistory.push('/admin/room/view/'+roomId);
  }
  /*componentWillUnmount() {
    this.props.dispatch(ClearGradesData())
  }*/


  render() {
    //let clsContainerRight = `${styles.containerRight} pull-right`;
    let cls_container = `${styles.iContainer} ${styles.oContainer} pull-right`;
    let cls_topmenu = `${styles.iTopMenu} ${styles.oTopMenu}`;
    let cls_isubmenu = `${styles.iSubMenu} {styles.oSubMenu}`;
    return (
      <div className={cls_container}>    
          
        <div className={cls_topmenu}>
          <h3 className=""><FormattedMessage id='room_management' /></h3>
           <div className={styles.dynamicBreadCrumb}>
            <ul>
              <li> 
                <Link to="/admin/room/list"><FormattedMessage id = 'all_rooms'/></Link>
              </li>
              <li>/</li>
              <li>
              <Link onClick={this.viewroom}>{this.props.roomData.data.roomName}</Link>
              </li>
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
                <Link onClick={this.listResults}><FormattedMessage id = 'result_list'/></Link>
              </li>
              <li>/</li>
              <li>
                <FormattedMessage id = 'result_details'/>
              </li>
            </ul>
          </div>
          <TopMenu data={listResultMainMenu} />
        </div>
  

        <div className={cls_isubmenu}>
          <SubMenu data={viewResultSubMenu} />
        </div>

        <ResultView resultData={this.props.roomData.resultData} error = {this.props.roomData.error} success = {this.props.roomData.success} clear = {this.clear} />          
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    roomData : roomData(state),
    loggedInData: loggedInData(state),
    intlData: intlData(state),
    questionnaireData: questionnaireData(state)
  };
}

ViewResults.propTypes = {
  loggedInData: PropTypes.object,
  roomData : PropTypes.object,
  questionnaireData : PropTypes.object,
  dispatch : PropTypes.func.isRequired
};

ViewResults.contextTypes = {
  router : React.PropTypes.object
};

export default connect(mapStateToProps)(ViewResults);
