import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

import AuthClient from '../../../../components/AuthController';
import { isLoggedIn } from '../../../Login/LoginActions';
import { loggedInData } from '../../../Login/LoginReducer';
import Validator from '../../../../components/Validator';
import { getuserViewedALLTopicsList, ClearRoom} from '../RoomActions';
import { roomData } from '../RoomReducer';

import ContainerComponent from '../../../../components/ContainerComponent';

import ListUserToRoom from '../components/ListUserToRoom';
import DataTable from '../../../../components/DataTable/DataTable';

import {Col, Row, Grid} from 'react-bootstrap';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import { Roles } from '../../../../roles.js';
import { loginLanguage } from '../../../Intl/IntlActions';
var _ = require('lodash');
import moment from 'moment';
import { intlData } from '../../../Intl/IntlReducer';

import adminStyles from '../../Admin.css';


class AllUsersViewedTopics extends Component {
  constructor(props) {
    super(props);
    this.state  = {
      topicData : null,
      showViewedTopicsChart: false,
      loading : true
    }

    this.currentPage= 1;
    this.itemsPerPage= 5; 
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.roomData.success != ''){
      this.refs.room_container.success(`${nextProps.roomData.success} `, ``);
      this.props.dispatch(ClearRoom());
    }
  }

  componentDidMount() {
    this.setdata(this.props.loggedInData)
  }

  setdata(result) {
    if (result && result.data && result.data._id) {
      this.props.dispatch(loginLanguage(result.data, this.props.intlData.setlocale));
      var obj = {
      roomId : this.props.roomId
    }
    this.getData({
      currentPage  : this.currentPage,
      totalItems   : 0,
      itemsPerPage : this.itemsPerPage
    });
    }
  }

  getData(pageParam) {
    pageParam["uId"] = this.props.userId; 
    pageParam["rId"] = this.props.courseId;
    pageParam["listIds"] = this.props.listIds; 

    // Change By - Najib, Desc - Calling setLoading in promise to set state after receiving response from server    
    if(_.isEmpty(this.props.roomData.topicViewedList)) {
      this.setState({loading : true}); 
    } else {         
      this.setState({loading : false});
    }
    this.props.dispatch(getuserViewedALLTopicsList(pageParam, pageParam.currentPage)).then(res => this.pageData(res));
  }

  pageData(response) {
    if(this.state.loading) {
      this.setState({loading : false})
    }
    if(response.status == false){
      this.refs.room_container.error(`${response.error} `, ``);
    }
  }

  showTopicName(row) {
    //change by : pranathi, disc: only 50 charecters are showing in  topicName
    if(row.value && row.value.topicId && row.value.topicId != undefined &&  row.value.topicId.topicName ) {
      if(row.value.topicId.topicName.length > 50) {
        let topicName = row.value.topicId.topicName.substring(0,50) + '...'
        return(
          <div>{topicName}</div>
        );
      } else {
        return(
          <div>{row.value.topicId.topicName}</div>
        );
      }
    } else {
      return (<div> -- </div>)
    }
  }

  showStatus(row) {
    if(row.value && row.value.status == 1) {
      return (<div> Inprogress</div>)
    } else if( row.value && row.value.status == 2 ) {
      return (<div> Completed </div>)
    } else {
       return (<div> -- </div>)
    }
  }

  render() {
    let cls_backButton = ` ${adminStyles.btnApplyAll} ${adminStyles.backButton} `
     var objDisp = [
          { title : <FormattedMessage id='topic_name' />, type : "function", callback :this.showTopicName },
          { title : <FormattedMessage id='status'/>, type : "function", callback :this.showStatus }
      ];

    return (
      <div>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="room_container"
          className="toast-top-right"
        />
        <Row>
          <Col md={12}>
            <button id="backToReports" className={cls_backButton} onClick={this.props.backToReport} style = {{marginLeft:"16px"}} >{this.props.intlData.messages.back_to_reports}</button>
          </Col>
        </Row>
        <DataTable data={this.props.roomData.topicViewedList}
          count={this.props.roomData.topicListCount}
          currentPage = {this.props.roomData.currentListPage}
          submenu={null}
          topmenu={null}
          itemsPerPage={this.itemsPerPage}
          newDataCallback={this.getData.bind(this)}
          dispField={objDisp}
          pageTitle={null} 
          filter={null}
          listDescreption={this.props.intl.messages.viewed_topics}  
          loading = {this.state.loading}            
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

AllUsersViewedTopics.propTypes = {
  loggedInData: PropTypes.object,
  roomData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

AllUsersViewedTopics.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(AllUsersViewedTopics);