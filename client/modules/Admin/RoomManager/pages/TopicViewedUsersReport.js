import React, { PropTypes, Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import { loggedInData } from '../../../Login/LoginReducer';
import { getTopicViewedUsersRequest } from '../RoomActions';
import { roomData } from '../RoomReducer';

import Chart from '../../../../components/Chart';
import { intlData } from '../../../Intl/IntlReducer';

// Import Style
import adminStyles from '../../Admin.css';
import styles from '../../../../components/component.css';
import dataStyle from '../../../../components/DataTable/DataTable.css';

import FontAwesome from 'react-fontawesome';
import TopicViewedUsersList from './TopicViewedUsersList';
var _ = require('lodash');
import Loading from '../../../App/components/Loading';

class TopicViewedUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showChart : false,
      chartData : '',
      loading : true,
      listIds: []
    }
  }

  componentDidMount() {
    let data = this.props.data;
    data['courseId'] = this.props.courseId;

    // Change By - Najib, Desc - Calling setLoading in promise to set state after receiving response from server    
    if(_.isEmpty(this.state.chartData)) {
      this.setState({loading : true}); 
    } else {         
      this.setState({loading : false});
    }
    this.props.dispatch(getTopicViewedUsersRequest(this.props.data)).then(res => this.setData(res));
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.data, this.props.data)) {
      let data = nextProps.data;
      data['courseId'] = nextProps.courseId;
      this.props.dispatch(getTopicViewedUsersRequest(data)).then(res => this.setData(res));
    }
  }
  
  setData(res) {
    if(this.state.loading) {
      this.setState({ loading : false });
    }
    this.setState({
      chartData: ''
    });

    if (res.status == true && res.data != null) {
      var tasksData = [];
    
      // tasksData used for displaying data in the charts 
      if( res.data.completedTopicUsersCount >= 1 ) {
        var x = {
          name:this.props.intlData.messages.completely_viewed_topic_users,
          color: "#00FF00",
          data:[{
            y: res.data.completedTopicUsersCount,
            name: this.props.intlData.messages.completely_viewed_topic_users,
            color: "#00FF00",
            listIds : res.data.completedTopicUsersIds
          }],
        }
        tasksData.push(x);
      } else {
        var x = {
          name:this.props.intlData.messages.completely_viewed_topic_users,
          color: "#00FF00",
          data:[{
            y: 0,
            name: this.props.intlData.messages.completely_viewed_topic_users,
            color: "#00FF00"
          }],
        }
        tasksData.push(x);
      }     

      if ( res.data.inprogressTopicUsersCount >= 1 ) {
        var y = {
          name:this.props.intlData.messages.partially_viewed_topic_users,
          color: "#FF7F50",
          data:[{ 
            y: res.data.inprogressTopicUsersCount,
            name: this.props.intlData.messages.partially_viewed_topic_users,
            color: "#FF7F50",
            listIds : res.data.inprogressTopicUsersIds
          }],
        }
        tasksData.push(y);
      } else {
        var y = {
          name:this.props.intlData.messages.partially_viewed_topic_users,
          color: "#FF7F50",
          data:[{ 
            y: 0,
            name: this.props.intlData.messages.partially_viewed_topic_users,
            color: "#FF7F50"
          }],
        }
        tasksData.push(y);
      }

      if ( res.data.notAtAllViewedTopicUsersCount >= 1 ) {
        var Z = {
          name:this.props.intlData.messages.not_AtAll_Viewed_Topic_Users,
          color: "#FF0000",
          data:[{ 
            y: res.data.notAtAllViewedTopicUsersCount,
            name: this.props.intlData.messages.not_AtAll_Viewed_Topic_Users,
            color: "#FF0000",
            listIds : res.data.notAtAllViewedTopicUsersIds
          }],
        }
        tasksData.push(Z);
      } else {
        var Z = {
          name:this.props.intlData.messages.not_AtAll_Viewed_Topic_Users,
          color: "#FF0000",
          data:[{ 
            y: 0,
            name: this.props.intlData.messages.not_AtAll_Viewed_Topic_Users,
            color: "#FF0000"
          }],
        }
        tasksData.push(Z);
      }

      this.setState({
        chartData: tasksData
      });
    }
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

  backToReport = (e) => {
    this.setState({
      listIds : [],
      showViewedTopicUserList : false
    });
    this.props.hideDropDowns(true);
  }

  render() {
    //console.log("this.state.chartData", this.state.chartData);
    let cls_container = `${styles.iContainer} ${styles.oContainer} pull-right`;
    let cls_topmenu = `${styles.iTopMenu} ${styles.oTopMenu}`;
    let cls_isubmenu = `${styles.iSubMenu} {styles.oSubMenu}`;
    let loadType = 'list';

    if(this.state.chartData != '' ) {

      let self  = this;
      let  title = self.props.data.topicName+' -'+this.props.intlData.messages.viewed_users;
      var options = {
        chart: {
          type: 'column'
        },  

        title: {
          text: title,
          style: {
          "color": "#96281B",
          "fontSize": "26px"
          }
        },

        xAxis: {
          type: 'category',
          tickInterval: 1
        },

        yAxis: {
          title: {
            text: this.props.intlData.messages.topic_viewed_users
          }
        },

        credits: {
          enabled: false
        },

        tooltip: {
          pointFormat: this.props.intlData.messages.count+': <b>{point.y}</b>'
        },

        plotOptions: {
          series: {
            borderWidth: 0,
            pointWidth: 50,
            animation: {
              duration: 1000
            },
            cursor: 'pointer',
            events: {
              click: function (event) {
                self.handleViewedTopicUsers(event)
              },
              //changeBy : pranathi ,disc: removing the legend click event
              legendItemClick: function () {
                return false
              }
            },
          },
          showInLegend: true,
        },
        series: this.state.chartData
      };
    }

    return (
      <div>
        { this.state.loading?
            <div className={adminStyles.whiteCard}>  
              <div className={adminStyles.mainSpinBlock} >
                <div className={adminStyles.innerSpinBlock} >
                  <Loading loadType = {loadType}/>
                </div>
              </div>
            </div> :
      <div>
      {
        this.state.showViewedTopicUserList == true ?
        <TopicViewedUsersList listIds = { this.state.listIds } courseId = { this.props.data.courseId } backToReport = { this.backToReport } topicId = {this.props.data.topicId} topicName = {this.props.data.topicName}/>
      :
        <div className={adminStyles.attendenceBlockControl}>
          <div>
            {
              this.state.chartData != ''  
              ?
                <div className={adminStyles.chartBlock}>
                  <Chart container={'chart'} options={options}  />
                </div>
              : 
                <div className={adminStyles.whiteCard}>
                  <div className={dataStyle.noDataBox}>
                    <h2>
                      <FontAwesome name="frown-o" />
                    </h2>
                    <p><FormattedMessage id ="no_data_yet"/></p>
                  </div>
                </div>
            }
          </div>
        </div>
      }
      </div>
      }
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

TopicViewedUsers.propTypes = {
  loggedInData: PropTypes.object,
  roomData : PropTypes.object,
  dispatch : PropTypes.func.isRequired
};

TopicViewedUsers.contextTypes = {
  router : React.PropTypes.object
};

export default connect(mapStateToProps)(TopicViewedUsers);
