import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { loggedInData } from '../../../Login/LoginReducer';
import Chart from '../../../../components/Chart';
import { getIndividualAttendance } from '../RoomActions';
import { roomData } from '../RoomReducer';
import { intlData } from '../../../Intl/IntlReducer';
// Import Style
// import styles from '../../../../components/component.css';
import adminStyles from '../../Admin.css';
import dataStyle from '../../../../components/DataTable/DataTable.css';
import FontAwesome from 'react-fontawesome';
import {Col, Row, Grid} from 'react-bootstrap';

import ListIndividualAttendance from './ListIndividualAttendance';
import ListTotalSchedules from './ListTotalSchedulesAttendance';
import Loading from '../../../App/components/Loading';

class IndividualAttendance extends React.Component {
	constructor(props) {
    super(props);

    this.state = {
      chartData : '',
      listIds : [],
      showIndividualAttendedList : false,
      showTotalSchedulesList : false,
      loading : true
    };
	}

  componentDidMount() {
  	let obj = {
  		userId : this.props.userData._id,
  		courseId : this.props.courseId,
  		fromDate : this.props.fromDate,
  		toDate : this.props.toDate
  	}

    // Change By - Najib, Desc - Calling setLoading in promise to set state after receiving response from server    
    if(_.isEmpty(this.state.chartData)) {
      this.setState({loading : true}); 
    } else {         
      this.setState({loading : false});
    }
    this.props.dispatch(getIndividualAttendance(obj)).then(res => this.setData(res));
  }

  setData(res) {
    if(this.state.loading) {
      this.setState({ loading : false})
    }
    if (res.status == true && res.data != null ) {
      var tasksData = [];

      // tasksData used for displaying data in the charts 
      if ( res.data.offlineVisitsCount >= 1 ) {
        var x = {
          name:this.props.intlData.messages.offline_visits,
          color: "#FFFF00",
          data:[{
            y: res.data.offlineVisitsCount,
            name: this.props.intlData.messages.offline_visits,
            color: "#FFFF00",
            listIds: res.data.offlineVisitsIds,
            reqType: "Offline"
          }],
        }
        tasksData.push(x);
      } else {
        var x = {
          name:this.props.intlData.messages.offline_visits,
          color: "#FFFF00",
          data:[{
            y: 0,
            name: this.props.intlData.messages.offline_visits,
            color: "#FFFF00"
          }],
        }
        tasksData.push(x);
      }    

      if ( res.data.onlineVisitsCount >= 1 ) {
        var y = {
          name:this.props.intlData.messages.online_visits,
          color: "#009900",
          data:[{ 
            y: res.data.onlineVisitsCount,
            name: this.props.intlData.messages.online_visits,
            color: "#009900" , //yellow: "#F5D76E"
            listIds : res.data.onlineVisitsIds,
            reqType: "Online"
          }],
        }
        tasksData.push(y);
      } else {
        var y = {
          name:this.props.intlData.messages.online_visits,
          color: "#009900",
          data:[{ 
            y: 0,
            name: this.props.intlData.messages.online_visits,
            color: "#009900" 
          }],
        }
        tasksData.push(y);
      }

      if ( res.data.absentSchedulesCount >= 1 ) {
        var z = {
          name: this.props.intlData.messages.absent_schedules,
          color: "#FF0000",        
          data:[{
            y: res.data.absentSchedulesCount,
            name: this.props.intlData.messages.absent_schedules,
            color: "#FF0000",
            listIds : res.data.absentSchedulesIds,
            reqType: "Absent"
          }]
        }
        tasksData.push(z);
      } else {
        var z = {
          name: this.props.intlData.messages.absent_schedules,
          color: "#FF0000",        
          data:[{
            y: 0,
            name: this.props.intlData.messages.absent_schedules,
            color: "#FF0000"
          }]
        }
        tasksData.push(z);
      }

      if ( res.data.totalVisitsCount >= 1 ) {
        var a = {
          name: this.props.intlData.messages.total_schedules,
          color: "#0000CC",         
          data:[{
            y: res.data.totalVisitsCount,
            name: this.props.intlData.messages.total_schedules,
            color: "#0000CC",
            listIds : res.data.totalVisitsIds,
            reqType : "TS"
          }]
        }
        tasksData.push(a);
      } else {
        var a = {
          name: this.props.intlData.messages.total_schedules,
          color: "#0000CC",         
          data:[{
            y: 0,
            name: this.props.intlData.messages.total_schedules,
            color: "#0000CC"
          }]
        }
        tasksData.push(a);
      }

      this.setState({
        chartData: tasksData
      });
    } else {
    console.log('err in individual Attendance response'); 
    } 
  } 

  handleIndividualAttendanceList(event) {
    if( event.point.reqType == "Online" || event.point.reqType == "Offline") {
      if(event.point.listIds && event.point.listIds.length > 0 ) {
        this.setState ({
        showTotalSchedulesList : false,
        listIds : event.point.listIds,
        showIndividualAttendedList :true
      })
      } 
    } else if(event.point.reqType == "TS" || event.point.reqType == "Absent") {
      if(event.point.listIds && event.point.listIds.length > 0 ) {
        this.setState ({
          showTotalSchedulesList :true,
          showIndividualAttendedList : false,
          listIds : event.point.listIds,
        });
      }
    }
  }

  backToReports = (e) => {
    this.setState({
      listIds: [],
      showIndividualAttendedList: false
    })
  }
  backToReport = (e) => {
    this.setState({
      listIds: [],
      showTotalSchedulesList: false
    })
  }

	render() {

    let titleName = this.props.userData.firstname+''+this.props.userData.lastname+' - '+this.props.intlData.messages.attendance;
    let loadType = 'list';
    let self = this;
    if(this.state.chartData != '') {
      var options = {
        chart: {
          type: 'column'
        },  

        title: {
          text: titleName,
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
            text: this.props.intlData.messages.total_attendance
          }
        },

        credits: {
          enabled: false
        },

        tooltip: {
          pointFormat: this.props.intlData.messages.count+' : <b>{point.y}</b>'
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
                self.handleIndividualAttendanceList(event)
              },
              //changeBy : pranathi ,disc: removing the legend click event
              legendItemClick: function () {
                return false
              }
            },
          },
          showInLegend: true
          
        },
        series: this.state.chartData,
      };
    }
		return(
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
          this.state.showIndividualAttendedList == true 
          ?
            <Row>
              <Col md={12}>
                <ListIndividualAttendance listIds={this.state.listIds} courseId={this.props.courseId} backToReports={this.backToReports}/>
              </Col>
            </Row> 
          :(this.state.showTotalSchedulesList == true 
            ?
              <div className={adminStyles.midContainer}>
                <Row>
                  <Col md={12}>
                    <ListTotalSchedules listIds={this.state.listIds} backToReport={this.backToReport}/>
                  </Col>
                </Row>
              </div> 
            :
              <div>
                <Row>
                  <Col md={12}>
                    <button id="btnBacktolist" className={adminStyles.btnApplyAll} onClick={this.props.backToList} >{this.props.intlData.messages.back_to_list}</button>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
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
                  </Col>
                </Row>
              </div>
            )
        }
        </div>
      }
      </div>
		)
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

IndividualAttendance.propTypes = {
  loggedInData: PropTypes.object,
  roomData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

IndividualAttendance.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(IndividualAttendance);