import React, { PropTypes, Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';

import Validator from '../../../../components/Validator';
import { loggedInData } from '../../../Login/LoginReducer';
import { intlData } from '../../../Intl/IntlReducer';
import { getCourseTopicsData, getTopicUsersData, getRoomData } from '../RoomActions';
import { roomData } from '../RoomReducer';
import { roomReportsMainMenu, roomReportsSubMenu} from '../schema/RoomMenu';
import SubMenu from '../../../../components/SubMenu';
import TopMenu from '../../../../components/TopMenu';

// Import Style
import styles from '../../../../components/component.css';
import adminStyles from '../../Admin.css';

import {Col, Row, Grid} from 'react-bootstrap';
import TopicViewedUsers from './TopicViewedUsersReport';
import AllTopicsViewedUsers from './AllTopicsViewedUsersReport';
import UserViewedTopics from './UserViewedTopics.js';
import AllUsersViewedTopics from './AllUsersViewedTopicsReport';

class RoomTopicsReport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterData : [],
      type : 'TOPICS',
      topicId : 'ALL',
      topicName : this.props.intlData.messages.all,
      userName : this.props.intlData.messages.all,
      showDropdowns : true,
      showIndividualTopicUsersChart : false,
      data : {
        topicId : 'ALL',
        topicName : this.props.intlData.messages.all,
        userId : 'ALL',
        userName : this.props.intlData.messages.all
      },
      showReport : 'ALLTOPICS'
    }

    this.submenu = Validator.activeSubMenu(roomReportsSubMenu, "lnkTopics");
    this.submenu.menus[0].action = this.attendanceReport.bind(this);
    this.submenu.menus[1].action = this.topicsReport.bind(this);

  }

  componentDidMount() {
    let obj = {
      roomId:this.props.params.cid
    };
    this.props.dispatch(getRoomData(obj,''));
    this.setState({data : this.state.data});
    this.props.dispatch(getCourseTopicsData(this.props.params.cid)).then(res => this.setOptionData(res) );
  }

  topicsReport = () => {
    var roomId = this.props.params.cid;
    browserHistory.push('/admin/room/reports/topic/'+roomId);
  }

  attendanceReport = () => {
    var roomId = this.props.params.cid;
    browserHistory.push('/admin/room/attendance/'+roomId);
  }

  handleTypeChange = (e) => {
    this.setState({ type: e.target.value });
    if(e.target.value == 'TOPICS') {
      this.setState({ topicId : 'ALL' });
      this.props.dispatch(getCourseTopicsData(this.props.params.cid)).then(res => this.setOptionData(res) );
    } else {
      this.setState({ userId : 'ALL' });
      this.props.dispatch(getTopicUsersData(this.props.params.cid)).then(res => this.setOptionData(res) ); 
    }
  }

  handleSelectChange = (e) => {

    if(this.state.type == 'TOPICS') {
      if(e.target.value == 'ALL') {
        let index = e.target.selectedIndex;
        this.setState({
          topicId : e.target.value,
          topicName : e.target.options[index].text
        });
      } else {
        let index = e.target.selectedIndex;
        this.setState({
          topicId : e.target.value,
          topicName : e.target.options[index].text
        });
      }
    } else if(this.state.type == 'USERS') {
      if(e.target.value == 'ALL') {
        let index = e.target.selectedIndex;

        this.setState({
          userId : e.target.value,
          userName : e.target.options[index].text,
        });

      } else {
        let index = e.target.selectedIndex;
        this.setState({
          userId : e.target.value,
          userName : e.target.options[index].text
        });
      }
    }
  }


  handleSubmit =(e) => {
    if(this.state.type == 'TOPICS') {
      this.setState({
        userName : 'ALL'
      });
      if(this.state.topicId == 'ALL') {
        let obj = {
          topicId : this.state.topicId,
          topicName : this.state.topicName,
          userName : this.props.intlData.messages.all
        }

        this.setState({
          data : obj,
          showReport : "ALLTOPICS",
        });

      } else {

        let obj = {
          topicId : this.state.topicId,
          topicName : this.state.topicName,
          userName : this.props.intlData.messages.all
        }

        this.setState({
          data : obj,
          showReport : "TOPIC"
        });
      }
    } else if (this.state.type == 'USERS') {

      this.setState({
        topicName : this.props.intlData.messages.all
      });

      if(this.state.userId == 'ALL') {

        let obj = {
          userId : this.state.userId,
          userName : this.state.userName,
          topicName : this.state.topicName 
        }
        this.setState({
          data : obj,
          showReport : "ALLUSERS",
        });

      } else {
        let obj = {
          userId : this.state.userId,
          userName : this.state.userName,
          topicName : this.state.topicName 
        }
        this.setState({
          data : obj,
          showReport : "USER"
        });
      }
    }
  }


  setOptionData(res) {
    if(res.data && res.data.length > 0) {
      this.setState({ filterData: res.data });
    } else {
      this.setState({ filterData: [] });
    }
  }

  hideDropDowns = (data) => {
    this.setState({ showDropdowns : data });
  }

  handleViewedTopicUsers = (event) => {
    if(event.point.listIds && event.point.listIds.length > 0 ) {
      this.setState ({
        listIds : event.point.listIds,
        showViewedTopicUserList : true
      });
      this.props.hideDropDowns(false);
    } 
  }

  render() {
    let cls_container = `${styles.iContainer} ${styles.oContainer} pull-right`;
    let cls_topmenu = `${styles.iTopMenu} ${styles.oTopMenu}`;
    let cls_isubmenu = `${styles.iSubMenu} {styles.oSubMenu}`;
    let cls_btnApplyAll = `${adminStyles.btnApplyAll} `;

    let removePdng  = `${adminStyles.removePdng} control-label col-md-9`;
    let addpdng  = `${adminStyles.addpdng} form-group clearfix`;
    let rangeLabel = `${adminStyles.lineHight32} control-label col-md-3`;
    let applyBtn = `${adminStyles.applyBtn} ${adminStyles.addpdng}`;

    let fileterTypeOptions = [
          {'id':'TOPICS','name':this.props.intlData.messages.topics},
          {'id':'USERS','name':this.props.intlData.messages.topic_users}
      ];

    let courseId = this.props.params.cid;
    let link = "/admin/room/view/"+courseId;


    return (
      <div className={cls_container}>
        <div className={cls_topmenu}>
          <h3 className=""><FormattedMessage id='room_management' /></h3>
          <div className={styles.dynamicBreadCrumb}>
            <ul>
              <li> 
                <Link to="/admin/room/list">{this.props.intlData.messages.all_rooms}</Link>
              </li>
              <li>/</li>
              <li> 
                <Link to={link}>{this.props.roomData.data.roomName}</Link>
              </li>
              <li>/</li>
              <li>
               {this.props.intlData.messages.reports}
              </li>
            </ul>
          </div>
          <TopMenu data={roomReportsMainMenu} />
        </div>
        <div className={cls_isubmenu}>
          <SubMenu data={ roomReportsSubMenu } />
        </div>
        <div className={adminStyles.midContainer }>
          <div>
            {
              this.state.showDropdowns == true ?
              <Grid fluid={true}>
                <Row>
                  <Col md={12}>
                    <div className={adminStyles.dateControls}>
                      <div className={adminStyles.dateRange}>
                        <div className={addpdng}>
                          <label className="control-label"> {this.props.intlData.messages.type} :</label>
                          <select id="topicReportType" className="form-control" onChange={this.handleTypeChange} value={this.state.type} >
                            {
                              fileterTypeOptions.map((data)=> {
                              return (<option key = {data.id} value = {data.id}  > {data.name} </option>)
                                })
                              }
                          </select>
                        </div>
                      </div>
                      <div className={adminStyles.dateRange}>
                        <div className={addpdng}>
                          <label className="control-label"> {this.props.intlData.messages.select} :</label>
                          <select id="topicDropdown" className="form-control" onChange={this.handleSelectChange} value = {this.state.type == 'TOPICS' ?  this.state.topicId : this.state.userId} >
                            <option value="ALL">{this.props.intlData.messages.all}</option>
                              {
                                this.state.filterData.map((data) => {
                                  return (
                                    this.state.type == 'TOPICS' ?
                                        <option key={data._id} value={data._id} > {data.topicName}</option>
                                      : 
                                        <option key={data._id} value={data._id} > {data.firstname}</option>
                                  )
                                })
                              }
                          </select>
                        </div>
                      </div>
                      <div className={adminStyles.dateRange}>
                        <div className = {applyBtn}>
                          <input id="save" type='submit' value={this.props.intlData.messages.apply} className={cls_btnApplyAll} onClick={this.handleSubmit}/>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Grid>
            :
                null
            }
          </div>
          <div>
            {
              this.state.showReport == "TOPIC" ?
                <TopicViewedUsers  data = {this.state.data}  hideDropDowns = {this.hideDropDowns} courseId = {courseId}/>
              : ( this.state.showReport == "ALLUSERS" ?
                    <AllUsersViewedTopics data={this.state.data} courseId={courseId} hideDropDowns = {this.hideDropDowns} />
                  : ( this.state.showReport == "USER" ? 
                      <UserViewedTopics data = {this.state.data} courseId = {courseId}  hideDropDowns = {this.hideDropDowns} />
                    : 
                      <AllTopicsViewedUsers  data = {this.state.data} courseId = {courseId} hideDropDowns = {this.hideDropDowns} />
                  )
                )
            }
          </div>
        </div>
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    roomData : roomData(state),
    loggedInData: loggedInData(state),
    intlData: intlData(state)
  };
}

RoomTopicsReport.propTypes = {
  loggedInData: PropTypes.object,
  roomData : PropTypes.object,
  dispatch : PropTypes.func.isRequired
};

RoomTopicsReport.contextTypes = {
  router : React.PropTypes.object
};

export default connect(mapStateToProps)(RoomTopicsReport);
/*value={this.state.topicId || this.state.userId} */