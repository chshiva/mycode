import React, { PropTypes, Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import Chart from '../../../../components/Chart';
import { loggedInData } from '../../../Login/LoginReducer';
import { getTopicViewedUsersRequest } from '../RoomActions';
import { roomData } from '../RoomReducer';
// Import Style
import styles from '../../../../components/component.css';
import adminStyles from '../../Admin.css';
import dataStyle from '../../../../components/DataTable/DataTable.css';
import { intlData } from '../../../Intl/IntlReducer';
import FontAwesome from 'react-fontawesome';
import ShowAllTopicsList from './AllTopicsViewedUsersList';
import Loading from '../../../App/components/Loading';
var _ = require('lodash');

class AllTopicsViewedUsers extends Component {
  constructor(props){
    super(props);

    this.state = {
      // showChart : false,
      chartData : '',
      showAllTopicsList : false,
      loading : true
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
      // showChart: false,
      chartData: ''
    });
    if (res.status == true && res.data != null ) {
      var tasksData = [];
    
      // tasksData used for displaying data in the charts 
      if( res.data.completedTopicsCount >= 1 ) {
        var x = {
          name:this.props.intlData.messages.completely_viewed_topics,
          color: "#00FF00",
          y: res.data.completedTopicsCount,
          listIds : res.data.completedTopicsIds
        }
        tasksData.push(x);
      } else {
        var x = {
          name:this.props.intlData.messages.completely_viewed_topics,
          color: "#00FF00",
          y: 0
        }
        tasksData.push(x);
      }     

      if ( res.data.inprogressTopicsCount >= 1 ) {
        var y = {
          name:this.props.intlData.messages.partially_viewed_topics,
          color: "#FF7F50",
          y: res.data.inprogressTopicsCount,
          listIds : res.data.inprogressTopicsIds
        }
        tasksData.push(y);
      } else {
        var y = {
          name:this.props.intlData.messages.partially_viewed_topics,
          color: "#FF7F50",
          y: 0
        }
        tasksData.push(y);
      }

      if ( res.data.notAtAllViewedTopicsCount >= 1 ) {
        var Z = {
          name:this.props.intlData.messages.notAtAll_Viewed_Topics,
          color: "#FF0000",
          y: res.data.notAtAllViewedTopicsCount,
          listIds : res.data.notAtAllViewedTopicsIds
        }
        tasksData.push(Z);
      } else {
        var Z = {
          name:this.props.intlData.messages.notAtAll_Viewed_Topics,
          color: "#FF0000",
          y: 0
        }
        tasksData.push(Z);
      }

      this.setState({
        // showChart: true,
        chartData: tasksData
      });
    }
  } 


  handleAllTopicsList = (event) => {
    if(event.point.listIds && event.point.listIds.length > 0 ) {
      this.setState ({
        listIds : event.point.listIds,
        showAllTopicsList : true
      });
      this.props.hideDropDowns(false);
    } 
  } 

  backToReport = (e) => {
    this.setState({
      listIds : [],
      showAllTopicsList : false
    });
    this.props.hideDropDowns(true);
  }

  render() {

    let cls_container = `${styles.iContainer} ${styles.oContainer} pull-right`;
    let cls_topmenu = `${styles.iTopMenu} ${styles.oTopMenu}`;
    let cls_isubmenu = `${styles.iSubMenu} {styles.oSubMenu}`;
    let loadType = 'list';
     
    if(this.state.chartData != '') {

      let self  = this;
      let  title = self.props.data.topicName+' - '+this.props.intlData.messages.viewed_users;
      var options = {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie',
          options3d: {
            enabled: true,
            alpha: 45,
            beta: 0
          }
        },  
        title: {
          text: title,
          style: {
          "color": "#96281B",
          "fontSize": "26px"
          }
        },
        credits: {
          enabled: false
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            depth: 25,
            events: {
              click: function (event) {
                self.handleAllTopicsList(event)
              }
            },
            series: {
              animation: {
                duration: 2000
              },
              
            },
            dataLabels: {
              enabled: true,
              format: '{point.name}: {point.percentage:.1f}%',    // for percentage display use ({point.percentage:.1f} %)
            },
            showInLegend: true,
            //changeBy : pranathi ,disc: removing the legend click event
            point: {
              events : {
                legendItemClick : function() {
                  return false
                }
              }
            }
          }
        },  
        series: [{
          name: this.props.intlData.messages.percentage,
          colorByPoint: true,
          type: 'pie',
          data: this.state.chartData
        }],
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
        this.state.showAllTopicsList == true ?
          <ShowAllTopicsList listIds = {this.state.listIds} courseId ={this.props.courseId } backToReport = {this.backToReport}  />
        :
          <div className={adminStyles.attendenceBlockControl}>
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

AllTopicsViewedUsers.propTypes = {
  loggedInData: PropTypes.object,
  roomData : PropTypes.object,
  dispatch : PropTypes.func.isRequired
};

AllTopicsViewedUsers.contextTypes = {
  router : React.PropTypes.object
};

export default connect(mapStateToProps)(AllTopicsViewedUsers);
