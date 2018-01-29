import React, {PropTypes, Component} from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { roomReportsSubMenu, roomReportsNoTopicsSubMenu } from '../schema/RoomMenu';
import TopMenu from '../../../../components/TopMenu';
import SubMenu from '../../../../components/SubMenu';
import Validator from '../../../../components/Validator';
import Chart from '../../../../components/Chart';
import { FormattedMessage } from 'react-intl';
import { getCourseAttendanceRequest, getRoomData } from '../RoomActions';
import { roomData } from '../RoomReducer';
import { loggedInData } from '../../../Login/LoginReducer';
import { intlData } from '../../../Intl/IntlReducer';
import FontAwesome from 'react-fontawesome';
// Import Style
import styles from '../../../../components/component.css';
import adminStyles from '../../Admin.css';
import dataStyle from '../../../../components/DataTable/DataTable.css';
import ListAttendance from './ListAttendance.js';

import moment from 'moment';
import DateRangePicker from '../../../../components/DateRangePicker';
import { Roles } from '../../../../roles.js';
import Loading from '../../../App/components/Loading';


class CourseAttendance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fromDate : moment().startOf('day').utc().toDate(),
      toDate : moment().endOf('day').utc().toDate(),
      insChartData : '',
      stuChartData : '',
      showList : false,
      listIds : [],
      reqType : null,
      loading : true,
      noInstructor : false,
      noStudents: false
    };

    this.startDate = moment().startOf('day').utc().toDate();
    this.endDate = moment().endOf('day').utc().toDate();
    
    this.submenu = Validator.activeSubMenu(roomReportsNoTopicsSubMenu, "lnkAttendance");
    this.submenu.menus[0].action = this.attendanceReport.bind(this);
  }

  topicsReport = () => {
    var roomId = this.props.params.cid;
    browserHistory.push('/admin/room/reports/topic/'+roomId);
  }

  attendanceReport = () => {
    var roomId = this.props.params.cid;
    browserHistory.push('/admin/room/attendance/'+roomId);
  }

  componentDidMount() {

    let roomObj = {
      roomId:this.props.params.cid
    };
    this.props.dispatch(getRoomData(roomObj,'')).then(res => this.setRoomData(res));

    let obj = {
      fromDate : this.startDate,
      toDate : this.endDate
    }
    this.getDates(obj); 
  }

  setRoomData (res) {
    if (res.status && res.data && res.data.selPackage && res.data.selPackage.features.indexOf("Topics") != -1) {
      this.submenu = Validator.activeSubMenu(roomReportsSubMenu, "lnkAttendance");
      this.submenu.menus[0].action = this.attendanceReport.bind(this);
      this.submenu.menus[1].action = this.topicsReport.bind(this);
    }
  }
  
  setData (res) {
    if(this.state.loading) {
      this.setState({ loading : false });
    }
    if (res.status == true && res.data != null) {
      var tasksInsData = [];
      var tasksStuData = [];
      // tasksData used for displaying data in the charts 

      if (res.data.absentInsCount <= 0 && res.data.presentInsCount <=0) {
        this.setState({ noInstructor : true });
      } else {
        if ( res.data.presentInsCount >= 1 ) {
          var x = {
            y: res.data.presentInsCount,
            name: this.props.intlData.messages.present_instructors,
            color: "#00FF00",
            listData: res.data.presentInsIds,
            reqType: 'Present'
          }
          tasksInsData.push(x);
        } else {
          var x = {
            y: 0,
            name: this.props.intlData.messages.present_instructors,
            color: "#00FF00",
          }
          tasksInsData.push(x);
        }

        if ( res.data.absentInsCount >= 1 )  {
          var y = {
            y: res.data.absentInsCount,
            name: this.props.intlData.messages.absent_instructors,
            color: "#FF0000",
            listData : res.data.absentInsIds,
            reqType: 'Absent'
          }
          tasksInsData.push(y);
        } else {
          var y = {
           y: 0,
           name: this.props.intlData.messages.absent_instructors,
           color: "#FF0000"
          }
          tasksInsData.push(y);
        }
      } 

      if(res.data.presentStuCount <=0 && res.data.absentStuCount <=0) {
        this.setState({ noStudents : true });
      } else {
        if ( res.data.presentStuCount >= 1 )  {
          var z = {
           y: res.data.presentStuCount,
           name: this.props.intlData.messages.present_students,
           color: "#00FF00",
           listData : res.data.presentStuIds,
           reqType: 'Present'
          }
          tasksStuData.push(z);
        } else {
          var z = {
           y: 0,
           name: this.props.intlData.messages.present_students,
           color: "#00FF00"
          }
          tasksStuData.push(z);
        }

        if ( res.data.absentStuCount >= 1 ) {
          var a = {
           y: res.data.absentStuCount,
           name: this.props.intlData.messages.absent_students,
           color: "#FF0000",
           listData : res.data.absentStuIds,
           reqType : 'Absent'
          }
          tasksStuData.push(a);
        } else {
          var a = {
           y: 0,
           name: this.props.intlData.messages.absent_students,
           color: "#FF0000"
          }
          tasksStuData.push(a);
        }
      }

      this.setState({
        insChartData : tasksInsData,
        stuChartData : tasksStuData
      });
    } else {
      console.log('err in Course Attendance response', res.error); 
    } 
  }

  getDates = (obj) => {
    this.setState({ insChartData:'', stuChartData:'', fromDate : obj.fromDate, toDate : obj.toDate, noStudents : false, noInstructor: false });
    let courseId = this.props.params.cid; 
    this.setState({loading : true});
    this.props.dispatch(getCourseAttendanceRequest(courseId, obj['fromDate'], obj['toDate'])).then(res => this.setData(res));
  }

  backToReprots = (e) => {
    this.setState({
      showList : false,
      listIds :[],
      reqType : null
    });
  }

  handleAttendance(event) {
    if(event.point.listData && event.point.listData.length > 0 ) {
      this.setState({
        showList : true,
        listIds : event.point.listData,
        reqType : event.point.reqType,
        backButton : true
     });
    }
  }

  render() {
    let link = "/admin/room/view/"+this.props.params.cid;

    let cls_container = `${styles.iContainer} ${styles.oContainer} pull-right`;
    let cls_topmenu = `${styles.iTopMenu} ${styles.oTopMenu}`;
    let cls_isubmenu = `${styles.iSubMenu} {styles.oSubMenu}`;
    let cls_chartBlockCust = ` ${adminStyles.chartBlockCust} ${adminStyles.chartBlock} `
    let cls_midContainer = ` ${adminStyles.midContainer} clearfix `
    let role = this.props.loggedInData.data.role;
    let loadType = 'list';
    let self = this;

    /* if package have topics feature */
    if (this.props.roomData && this.props.roomData.data && !_.isEmpty(this.props.roomData.data)) {
      let dataObject = this.props.roomData.data;
      if (dataObject.selPackage && dataObject.selPackage.features.indexOf("Topics") != -1) {
        this.submenu = Validator.activeSubMenu(roomReportsSubMenu, "lnkAttendance");
        this.submenu.menus[0].action = this.attendanceReport.bind(this);
        this.submenu.menus[1].action = this.topicsReport.bind(this);
      }
    }
    if(this.state.insChartData != '') {
      var insChartOptions = {
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
          text: this.props.intlData.messages.instructors_attendance,
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
                self.handleAttendance(event)
              }
            },
            series: {
              animation: {
                duration: 2000
              },
              
            },
            dataLabels: {
              enabled: true,
              format: '{point.percentage:.1f}%',    // for percentage display use ({point.percentage:.1f} %)
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
          data: this.state.insChartData
        }],
      };
    }

    if(this.state.stuChartData != '') {
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
          text: this.props.intlData.messages.students_attendance,
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
                self.handleAttendance(event)
              }
            },
            series: {
              animation: {
                duration: 2000
              },
              
            },
            dataLabels: {
              enabled: true,
              format: '{point.percentage:.1f}%',    // for percentage display use ({point.percentage:.1f} %)
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
          data: this.state.stuChartData
        }],
      };
    }

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
        </div>

        <div className={cls_isubmenu}>
          <SubMenu data={this.submenu} />
        </div>
          <div className={adminStyles.midContainer} style={(!this.state.showList) ? {'display' : 'block'} : {'display' : 'none'}}>
            <DateRangePicker getDates = {this.getDates } />  
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
                role == Roles.Lmsadmin ? 
                  <div className={cls_midContainer}>
                    {
                      this.state.insChartData != '' && !this.state.noInstructor
                      ?
                      <div className={cls_chartBlockCust}>
                        <Chart container={'chart'} options={insChartOptions}  />
                      </div>
                      : 
                      <div className={cls_chartBlockCust}>
                        <div className={adminStyles.whiteCard}>
                          <div className={dataStyle.noDataBox}>
                            <h2>
                              <FontAwesome name="frown-o" />
                            </h2>
                            <p><FormattedMessage id ="no_data_yet"/></p>
                          </div>
                        </div>
                      </div>
                    }
                    {
                      this.state.stuChartData != '' && !this.state.noStudents
                      ?
                      <div className={cls_chartBlockCust}>
                        <Chart container={'chart'} options={options}  />
                      </div>
                      : 
                      <div className={cls_chartBlockCust}>
                        <div className={adminStyles.whiteCard}>
                          <div className={dataStyle.noDataBox}>
                            <h2>
                              <FontAwesome name="frown-o" />
                            </h2>
                            <p><FormattedMessage id ="no_data_yet"/></p>
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                : (role == Roles.Instructor ? 
                    <div className={adminStyles.midContainer}>
                      {
                        this.state.stuChartData != '' && !this.state.noStudents
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
                  : null)

              }
          </div> 
          }    
          </div>
          { this.state.showList ? 
            <div className={adminStyles.midContainer}>                
              <ListAttendance listIds={this.state.listIds} fromDate={this.state.fromDate} toDate={this.state.toDate} courseId ={this.props.params.cid} backToReport={this.backToReprots} reqType = {this.state.reqType}/>   
            </div>
          : null}
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    loggedInData: loggedInData(state),
    roomData : roomData(state),
    intlData: intlData(state)
  };
}

CourseAttendance.propTypes = {
  loggedInData: PropTypes.object,
  roomData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

CourseAttendance.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(CourseAttendance);
