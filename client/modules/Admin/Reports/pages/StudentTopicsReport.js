import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';

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
import {Col, Row, Grid} from 'react-bootstrap';

import { courseReportsSubMenu, reportsListMainMenu } from '../schema/ReportsMenu';
import { getTopicsReportRequest } from '../ReportsActions';
import { reportsData } from '../ReportsReducer';
import ListStudentTopics from './ListStudentTopics.js';
import Loading from '../../../App/components/Loading';
import { intlData } from '../../../Intl/IntlReducer';


class studentTopicsReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: '',
      listIds: [],
      showList: false,
      loading : true,
    };

    this.submenu = courseReportsSubMenu;
    this.submenu = Validator.activeSubMenu(courseReportsSubMenu, "linkTopics");
    this.submenu.menus[0].action = this.attendanceReport.bind(this);
    this.submenu.menus[1].action = this.topicsReport.bind(this);
  }

  componentDidMount() {
  	let obj = {
  		courseId : this.props.params.rid,
  	}

    // Change By - Najib, Desc - Calling setLoading in promise to set state after receiving response from server    
    if(_.isEmpty(this.state.chartData)) {
      this.setState({loading : true}); 
    } else {         
      this.setState({loading : false});
    }
  	this.props.dispatch(getTopicsReportRequest(obj)).then(res => this.setData(res)); 
  }

  attendanceReport = () => {
    browserHistory.push('/course/attendance/'+this.props.params.rid);
  }

  topicsReport = () => {
    browserHistory.push('/course/topics/report/'+this.props.params.rid);
  }

  setData(res) {
    if(this.state.loading) {
      this.setState({ loading : false })
    }
    if (res.status == true && res.data != null) {
      var tasksData = [];

      // tasksData used for displaying data in the charts 
      if ( res.data.completelyViewedTopicsCount >= 1 )  {
        var y = {
         y: res.data.completelyViewedTopicsCount,
         name: this.props.intlData.messages.completely_viewed_topics,
         color: "#00FF00",
         listData : res.data.completelyViewedTopicsIds
        }
        tasksData.push(y);
      } else {
        var y = {
         y: 0,
         name: this.props.intlData.messages.completely_viewed_topics,
         color: "#00FF00"
        }
        tasksData.push(y);
      }

      if ( res.data.InPrograssTopicsCount >= 1 ) {
        var x = {
          y: res.data.InPrograssTopicsCount,
          name: this.props.intlData.messages.partially_viewed_topics,
          color: "#FF7F50",
          listData:res.data.inprogressTopicsIds
        }
        tasksData.push(x);
      } else {
        var x = {
          y: 0,
          name: this.props.intlData.messages.partially_viewed_topics,
          color: "#FF7F50",
        }
        tasksData.push(x);
      }

      if ( res.data.notAtAllViewedTopicsCount >= 1 )  {
        var z = {
         y: res.data.notAtAllViewedTopicsCount,
         name: this.props.intlData.messages.notAtAll_Viewed_Topics,
         color: "#FF0000",
         listData : res.data.notAtAllViewedTopicsIds
        }
        tasksData.push(z);
      } else {
        var z = {
         y: 0,
         name: this.props.intlData.messages.notAtAll_Viewed_Topics,
         color: "#FF0000"
        }
        tasksData.push(z);
      }

      this.setState({
        chartData: tasksData
      });
    } else {
      this.setState({
        chartData: ''
      });
    }
  }

  handleTopicsList = (event) => {
    if( event.point.listData && event.point.listData.length > 0 ) {
      this.setState ({
        listIds : event.point.listData,
        showList : true
      });
    } 
  }

  backToReport = () => {
  	this.setState({
  		listIds : [],
	    showList : false
  	});
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
          text: this.props.intlData.messages.topics,
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
                self.handleTopicsList(event)
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
        { this.state.showList == true ?
          	<div className={adminStyles.midContainer}>
              <Row>
                <Col md={12}>
                 <ListStudentTopics listIds = {this.state.listIds} courseId = {this.props.params.rid} backToReports = {this.backToReport} />
                </Col>
              </Row>
            </div>
        	:
		        <div className={adminStyles.midContainer} >
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

studentTopicsReport.propTypes = {
  loggedInData: PropTypes.object,
  reportsData:PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

studentTopicsReport.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(studentTopicsReport);


