// import React, { PropTypes, Component } from 'react';
// import { connect } from 'react-redux';
// import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
// import { browserHistory } from 'react-router';

// import { loggedInData } from '../../../Login/LoginReducer';
// import Validator from '../../../../components/Validator';
// import Chart from '../../../../components/Chart';
// import SubMenu from '../../../../components/SubMenu';
// import TopMenu from '../../../../components/TopMenu';

// import { loginLanguage } from '../../../Intl/IntlActions';
// import { intlData } from '../../../Intl/IntlReducer';
// import { getStudentsAssignmentDataRequest } from '../RoomActions';
// import { roomData } from '../RoomReducer';

// import {roomSchema} from '../schema/RoomSchema';
// import {submissionListSubMenu, listSubmissionMainMenu} from '../schema/RoomMenu';

// // Import Style
// import styles from '../../../../components/component.css';
// import adminStyles from '../../Admin.css';
// import dataStyle from '../../../../components/DataTable/DataTable.css';
// import FontAwesome from 'react-fontawesome';

// class studentsAssignmentReport extends Component {
//   constructor(props){
//     super(props);

//     this.submenu = submissionListSubMenu;
//     this.mainmenu = listSubmissionMainMenu; 

//     this.submenu.menus[0].action = this.backToAssignments.bind(this);
//     this.submenu.menus[1].action = this.listAssignments.bind(this);
//     // this.submenu.menus[2].action = this.listAssignmentsReport.bind(this);

//     this.state = {
//       showChart: false,
//       chartData: ''
//     }
//   }

//   backToAssignments = () => {
//     var roomId = this.props.params.cid;
//     browserHistory.push('/admin/room/assignments/'+roomId);
//   }

//   listAssignments = () => {
//     browserHistory.push('/admin/room/assignment/submissions/'+this.props.params.cid+'/'+this.props.params.aid);
//   }

//   // listAssignmentsReport = () => {
//   //   browserHistory.push('/admin/room/assignment/submissions/view/'+this.props.params.cid+'/'+this.props.params.aid);
//   // }

//   componentDidMount() {

//     let obj = { 
//       roomId : this.props.params.cid,
//       assignmentId : this.props.params.aid
//     };
//     this.props.dispatch(getStudentsAssignmentDataRequest(obj)).then(res => this.setData(res));
//   }

//   setData(res) {

//     if (res.status == true) {
//       var tasksData = [];
//       var totalstudents = res.data.totalRecords,
//       assignmentSubmittedStudents = res.data.submittedStudents,
//       assignmentNotSubmittedStudents= res.data.notSubmittedStudents;

//       // tasksData used for displaying data in the charts 
//       if ( assignmentNotSubmittedStudents >= 1 ) {
//         var x = {
//            y: assignmentNotSubmittedStudents,
//            name: "Not Submitted",
//            color: "#c0392b"  //yellow: "#F5D76E"
//         }
//         tasksData.push(x);
//       }

//       if ( assignmentSubmittedStudents >= 1 )  {
//         var y = {
//            y: assignmentSubmittedStudents,
//            name: "Submitted",
//            color: "#26A65B",
//            url:"/admin/room/assignment/submissions/"+this.props.params.cid+"/"+ this.props.params.aid
//         }
//         tasksData.push(y);
//       }

//       this.setState({
//         showChart: true,
//         chartData: tasksData
//       })
//     }
//   }

  
//   render() {
//     let cls_container = `${styles.iContainer} ${styles.oContainer} pull-right`;
//     let cls_topmenu = `${styles.iTopMenu} ${styles.oTopMenu}`;
//     let cls_isubmenu = `${styles.iSubMenu} {styles.oSubMenu}`;

//     // let assignmentName = this.props.roomData.assignmentList[0].assignmentName;

//     if(this.state.showChart) {
//       let chartTitle = "assignment"+' -'+' Submission Students'
//       var options = {
//         chart: {
//           plotBackgroundColor: null,
//           plotBorderWidth: null,
//           plotShadow: false,
//           type: 'pie',
//           options3d: {
//             enabled: true,
//             alpha: 45,
//             beta: 0
//           }
//         },  
//         title: {
//           text: chartTitle,
//           style: {
//           "color": "#96281B",
//           "fontSize": "26px"
//           }
//         },
//         credits: {
//           enabled: false
//         },
//         tooltip: {
//           pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
//         },
//         plotOptions: {
//           pie: {
//             allowPointSelect: true,
//             cursor: 'pointer',
//             depth: 25,
//             events: {
//               click: function (event) {
//                 browserHistory.push(event.point.url);
//               }
//             },
//             series: {
//               animation: {
//                 duration: 2000
//               }
//             },
//             dataLabels: {
//               enabled: true,
//               format: '{point.name}: {point.percentage:.1f}%',    // for percentage display use ({point.percentage:.1f} %)
//             },
//             showInLegend: true
//           }
//         },  
//         series: [{
//           name: "Percentage",
//           colorByPoint: true,
//           type: 'pie',
//           data: this.state.chartData
//         }],
//       };
//     }

//     return (
//       <div className={cls_container}>
//         <div className={cls_topmenu}>
//           <h3 className=""><FormattedMessage id='room_management'/></h3>
//           {//<TopMenu data={listSubmissionMainMenu} />
//           }
//         </div>
//         <div className={cls_isubmenu}>
//           <SubMenu data={submissionListSubMenu} />
//         </div>
//         <div className={adminStyles.midContainer}>
//           <div className={adminStyles.whiteCard}>
//           {
//             this.state.showChart == true
//             ?
//             <Chart container={'chart'} options={options} />
//             : 
//             <div className={adminStyles.whiteCard}>
//               <div className={dataStyle.noDataBox}>
//                 <h2>
//                   <FontAwesome name="frown-o" />
//                 </h2>
//                 <p><FormattedMessage id ="no_data_yet"/></p>
//               </div>
//             </div>
//           } 
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// // Retrieve data from store as props
// function mapStateToProps(state) {
//   return {
//     loggedInData: loggedInData(state),
//     roomData : roomData(state),
//     intlData: intlData(state)
//   };
// }

// studentsAssignmentReport.propTypes = {
//   loggedInData: PropTypes.object,
//   roomData : PropTypes.object,
//   dispatch : PropTypes.func.isRequired
// };

// studentsAssignmentReport.contextTypes = {
//   router : React.PropTypes.object
// };

// export default connect(mapStateToProps)(studentsAssignmentReport);