import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { intlData } from '../../../Intl/IntlReducer';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import {Col, Row, Grid} from 'react-bootstrap';

import { loggedInData } from '../../../Login/LoginReducer';
import Validator from '../../../../components/Validator';
import SubMenu from '../../../../components/SubMenu';
import TopMenu from '../../../../components/TopMenu';
import Chart from '../../../../components/Chart';

// Import Style
import styles from '../../../../components/component.css';
import adminStyles from '../../Admin.css';
import dataStyle from '../../../../components/DataTable/DataTable.css';
import FontAwesome from 'react-fontawesome';

import { courseReportsSubMenu, reportsListMainMenu } from '../schema/ReportsMenu';

import { getStudentAttendanceRequest } from '../ReportsActions';
import { reportsData } from '../ReportsReducer';
import moment from 'moment';
import ListAttendance from './ListStudentAttendance'; 
import ListTotalSchedules from './ListTotalSchedules';
import DateRangePicker from '../../../../components/DateRangePicker';
import Loading from '../../../App/components/Loading';


class studentCourseAttendance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData : '',
      showStudentAttendanceList: false,
      listIds : [],
      showTotalSchedulesList : false,
      loading : true
    };

    this.startDate = moment().startOf('day').utc().toDate();
    this.endDate = moment().endOf('day').utc().toDate();

    this.submenu = courseReportsSubMenu;
    
    this.submenu = Validator.activeSubMenu(courseReportsSubMenu, "linkAttendance");
    this.submenu.menus[0].action = this.attendanceReport.bind(this);
    this.submenu.menus[1].action = this.topicsReport.bind(this);
    this.submenu.menus[2].action = this.assignmentReportList.bind(this);
  }

  componentDidMount() {
    let obj = {
      fromDate : this.startDate,
      toDate : this.endDate
    }
    this.getDates(obj);   
  }

  attendanceReport = () => {
    browserHistory.push('/course/attendance/'+this.props.params.rid);
  }

  topicsReport = () => {
    browserHistory.push('/course/topics/report/'+this.props.params.rid);
  }

  assignmentReportList = () => {
    browserHistory.push('/course/assignment-report-list/'+this.props.params.rid);
  }

  getDates = (obj) => {
    this.setState({ chartData:'' });
    obj['courseId'] = this.props.params.rid;
    obj['userId'] = this.props.loggedInData.data._id;

    // Change By - Najib, Desc - Calling setLoading in promise to set state after receiving response from server    
    this.setState({loading : true});
    this.props.dispatch(getStudentAttendanceRequest(obj)).then(res => this.setData(res));
  }

  setData(res) {
    if(this.state.loading) {
      this.setState({ loading : false })
    }
    if (res.status == true && res.data != null) {
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
            listIds : res.data.offlineVisitsIds,
            reqType : "Offline"
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
            color: "#009900" ,
            listIds : res.data.onlineVisitsIds,
            reqType : "Online"
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
            listIds: res.data.absentSchedulesIds,
            reqType : "Absent"
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

      if ( res.data.totalVisitsCount  >= 1 ) {
        var a = {
          name: this.props.intlData.messages.total_schedules,
          color: "#0000CC",         
          data:[{
            y: res.data.totalVisitsCount ,
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
      })
    } else {
      console.log('err in Course Attendance response', res.error); 
    } 
  }

  handleIndividualAttendanceList(event) {
    if( event.point.reqType  == "Online" || event.point.reqType == "Offline") {
      if(event.point.listIds && event.point.listIds.length > 0 ) {
        this.setState ({
          showStudentAttendanceList : true,
          listIds : event.point.listIds,
          showTotalSchedulesList : false
        });
      } 
    } else if(event.point.reqType == "TS" || event.point.reqType == "Absent" ) {
      this.setState ({
        showTotalSchedulesList :true,
        showStudentAttendanceList : false,
        listIds : event.point.listIds,
      });
    }
  }

  backToReports = (e) => {
    this.setState({
      showStudentAttendanceList: false
    })
  }
  backToReport = (e) => {
    this.setState({
      showTotalSchedulesList :false,
    })
  }
  render() {
    let cls_container = `${styles.iContainer} ${styles.oContainer} pull-right`;
    let cls_topmenu = `${styles.iTopMenu} ${styles.oTopMenu}`;
    let cls_isubmenu = `${styles.iSubMenu} {styles.oSubMenu}`;
    let loadType = 'list';

    if(this.state.chartData != '') {
    let self = this;
      var options = {
        chart: {
          type: 'column'
        },  

        title: {
          text: this.props.intlData.messages.attendance,
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
          showInLegend: true,
        },
        series: this.state.chartData,
      };
    }

  	return (
  		<div className={cls_container}>
        <div className={cls_topmenu}>
          <h3 className=""><FormattedMessage id='reports'/></h3>
            <div className={styles.dynamicBreadCrumb}>
            <ul>
              <li> 
                <Link to="/course/reports"><FormattedMessage id='room_list'/></Link>
              </li>
              <li>/</li>
               <li> 
                <FormattedMessage id='attendance_reports'/>
              </li>
            </ul>
          </div>
          <TopMenu data={reportsListMainMenu} />
        </div>
        <div className={cls_isubmenu}>
          <SubMenu data={courseReportsSubMenu} />
        </div>
        <div className={adminStyles.midContainer} style={(!this.state.showStudentAttendanceList && !this.state.showTotalSchedulesList) ? {'display' : 'block'} : {'display' : 'none'}} >
          <DateRangePicker getDates = {this.getDates } />  
          <div className={adminStyles.midContainer}>
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
        </div>
        {
          this.state.showStudentAttendanceList
        ?
          <div className={adminStyles.midContainer}>
            <Row>
              <Col md={12}>
                <ListAttendance listIds={this.state.listIds} backToReports={this.backToReports}/>
              </Col>
            </Row>
          </div> 
        : (this.state.showTotalSchedulesList  
          ?
            <div className={adminStyles.midContainer}>
              <Row>
                <Col md={12}>
                  <ListTotalSchedules listIds={this.state.listIds} backToReport={this.backToReport}/>
                </Col>
              </Row>
            </div> 
          : null )
        }
      </div>
  	);
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    loggedInData: loggedInData(state),
    reportsData:reportsData(state),
    intlData: intlData(state)
  };
}

studentCourseAttendance.propTypes = {
  loggedInData: PropTypes.object,
  reportsData:PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

studentCourseAttendance.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(studentCourseAttendance);
