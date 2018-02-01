import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { loggedInData } from '../../../Login/LoginReducer';
import { loginLanguage } from '../../../Intl/IntlActions';
import { intlData } from '../../../Intl/IntlReducer';
import { getTopicViewedUsersList, ClearRoom} from '../RoomActions';
import { roomData } from '../RoomReducer';
import DataTable from '../../../../components/DataTable/DataTable';

import {Col, Row, Grid} from 'react-bootstrap';
import  {ToastContainer, ToastMessage} from '../../../../lib';
import adminStyles from '../../Admin.css';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);


class TopicViewedUsersList extends Component {
  constructor(props) {
    super(props);
    this.state  = {
      searchValue : '',
      userData : [],
      loading : true
    }

    this.currentPage= 1;
    this.itemsPerPage= 5; 

    this.searchFilter = this.searchFilter.bind(this); 
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
    pageParam["searchKeyword"] = this.state.searchValue; 
    pageParam["listIds"] = this.props.listIds; 
    pageParam["courseId"] = this.props.courseId; 
    pageParam["topicId"] = this.props.topicId; 

    // Change By - Najib, Desc - Calling setLoading in promise to set state after receiving response from server    
    if(_.isEmpty(this.props.roomData.topicViewedList)) {
      this.setState({loading : true}); 
    } else {         
      this.setState({loading : false});
    }
    this.props.dispatch(getTopicViewedUsersList(pageParam, pageParam.currentPage)).then(res => this.pageData(res));
  }

  pageData(response) {
    if(this.state.loading) {
      this.setState({ loading : false })
    }
    if(response.status == false){
      this.refs.room_container.error(`${response.error} `, ``);
    }
  }

  searchFilter(e) {
    e.preventDefault();
    var expVal = e.target.value.trim();
    var pattern = new RegExp(/[+*()?]/);
    if(!pattern.test(expVal)){
      this.state.searchValue = e.target.value.trim();
      this.getData({
        currentPage  : this.currentPage,
        totalItems   : 0,
        itemsPerPage : this.itemsPerPage
      });
    }    
  }

  showUserName(row) {
    return (<a className={adminStyles.removeStyle}  >{row.firstname}  {row.lastname}</a>)
  }

  showEmail(row) {

    return (<div> {row.email}</div>)
  }

  render() {
    
   let cls_backButton = ` ${adminStyles.btnApplyAll} ${adminStyles.backButton} `
    var objDisp = [
      { title : <FormattedMessage id='user_name' />, type : "function", callback : this.showUserName },
      { title : <FormattedMessage id='email' />, type : "function", callback : this.showEmail.bind(this) }, 
    ];

    var filter = [
      {type : 'search',id:'userSearch', selectedfilter : this.searchFilter }
    ] 

    return (
        <div >
          <ToastContainer
            toastMessageFactory={ToastMessageFactory}
            ref="room_container"
            className="toast-top-right"
          />
          <Row>
            <Col md={12}>
              <button id="backToReports" className={cls_backButton} onClick={this.props.backToReport} style = {{marginLeft:"16px"}}>{this.props.intlData.messages.back_to_reports}</button>
            </Col>
            <Col md={12}>
              <div className={adminStyles.topicNameReport} >
                <p><FormattedMessage id='topic_name'/>: { this.props.topicName}</p> 
              </div>
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
            filter={filter}
            listDescreption={this.props.intl.messages.topic_viewed_users} 
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

TopicViewedUsersList.propTypes = {
  loggedInData: PropTypes.object,
  roomData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

TopicViewedUsersList.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(TopicViewedUsersList);