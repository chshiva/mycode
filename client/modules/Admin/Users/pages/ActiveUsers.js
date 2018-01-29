import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { loggedInData } from '../../../Login/LoginReducer';
import Validator from '../../../../components/Validator';
import Chart from '../../../../components/Chart';
import { userListSubMenu, loggedInUsersMainMenu } from '../schema/UserMenu';
import SubMenu from '../../../../components/SubMenu';
import TopMenu from '../../../../components/TopMenu';
import { getActiveUsersReportRequest,UpdateUserSchema } from '../UsersActions';
import ActiveUsersList from './ActiveUsersList';

// Import Style
import styles from '../../Admin.css';
import compstyles from '../../../../components/component.css';
import dataStyle from '../../../../components/DataTable/DataTable.css';
import FontAwesome from 'react-fontawesome';
import { userSchema } from '../schema/UserSchema';

import { Roles } from '../../../../roles.js';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import DateRangePicker from '../../../../components/DateRangePicker';
import moment from 'moment';
import Loading from '../../../App/components/Loading';
import { injectIntl, intlShape,FormattedMessage } from 'react-intl';
import { intlData } from '../../../Intl/IntlReducer';

class ActiveUsersReport extends React.Component  {
  constructor(props) {
    super(props);

    this.state = {
      fromDate : moment().startOf('day').utc().toDate(),
      toDate : moment().endOf('day').utc().toDate(),
      chartData: '',
      fileName : '',
      showList : false,
      listIds : [],
      loading : true
    };

    this.startDate = moment().startOf('day').utc().toDate();
    this.endDate = moment().endOf('day').utc().toDate();

    this.schema = userSchema;
    this.submenu = Validator.activeSubMenu(userListSubMenu, "lnkUsersActivity");
    this.mainmenu = loggedInUsersMainMenu;
     
    this.mainmenu.menus[0].action = this.clearError.bind(this);
  }

  clearError() {
    var response = Validator.freeValue(this.schema);
    if(response){
      this.props.dispatch(UpdateUserSchema(response));
      browserHistory.push('/admin/users/new');
    }
  }

  componentDidMount() {
    let obj = {
      fromDate : this.startDate,
      toDate : this.endDate
    }
    this.getDates(obj);
  }

  getDates = (obj) => {
    this.setState({chartData:'', fromDate : obj.fromDate, toDate : obj.toDate });
    let companyId ="";
    let roleId = this.props.loggedInData.data.role;
    if(Roles.Superadmin == roleId) {
      companyId = this.props.loggedInData.data._id;
    } else if (Roles.Lmsadmin == roleId || Roles.Admin == roleId || Roles.Presenteradmin == roleId) {
      companyId = this.props.loggedInData.data.profile.companyid._id;
    }
    // console.log("chart data at getDate", this.state.chartData);
    // console.log("ISEmpty---", _.isEmpty(this.state.chartData))
    // // Change By - Najib, Desc - Calling setLoading in promise to set state after receiving response from server
    // if(!this.state.chartData) {
    //   this.setState({loading : true});
    //   console.log("Empty"); 
    // } else {       
    //   this.setState({loading : false});
    //   console.log("not Empty");
    // }
    this.setState({loading : true});
    this.props.dispatch(getActiveUsersReportRequest(companyId, obj['fromDate'], obj['toDate'])).then(res => this.setData(res));
  }

  handleActiveUsersList(event) {
    if(event.point.listData && event.point.listData.length > 0 ) {
      this.setState({
        showList : true,
        listIds : event.point.listData
      });
    }
  }

  backToReprots = () => {
    this.setState({
      showList : false,
      listIds :[]
    });   
  }

  // Change By - Najib, Desc - Calling setLoading in promise to set state after receiving response from server
  setData (res) {
    if(this.state.loading) {
      this.setState({loading : false});  
    }
    if (res.status == true && res.data != null ) {
      var tasksData = [];

      // tasksData used for displaying data in the charts 
      if ( res.data.InactiveUsersCount >= 1 ) {
        var x = {
          y: res.data.InactiveUsersCount,
          name: this.props.intlData.messages.not_loggedin_users,
          color: "#FF0000",
          listData : res.data.InactiveUsersIds
        }
        tasksData.push(x);
      } else {
        var x = {
          y: 0,
          name: this.props.intlData.messages.not_loggedin_users,
          color: "#FF0000"
        }
        tasksData.push(x);
      }

      if ( res.data.ActiveUsersCount >= 1 )  {
        var y = {
          y:  res.data.ActiveUsersCount,
          name: this.props.intlData.messages.loggedin_users,
          color: "#00FF00",//Lime 
          listData :res.data.ActiveUsersIds
         
        }
        tasksData.push(y);
      } else {
        var y = {
          y: 0,
          name: this.props.intlData.messages.loggedin_users,
          color: "#00FF00"
        }
        tasksData.push(y);
      }
      
      this.setState({
        chartData: tasksData
      });
    }
  }

  render() {
    let cls_container = `${compstyles.iContainer} ${compstyles.oContainer} pull-right`;
    let cls_topmenu = `${compstyles.iTopMenu} ${compstyles.oTopMenu}`;
    let cls_isubmenu = `${compstyles.iSubMenu} ${compstyles.oSubMenu}`;
    let cls_btnApplyAll = `${styles.btnApplyAll} `;

    let removePdng  = `${styles.removePdng} control-label col-md-7`;
    let addpdng  = `${styles.addpdng} form-group clearfix`;

    let rangeLabel = `${styles.lineHight32} control-label col-md-5 `;
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
          text: this.props.intlData.messages.loggedin_users_status,
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
                  self.handleActiveUsersList(event);
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
    
    return(
        <div className={cls_container}>
          <ToastContainer
            toastMessageFactory={ToastMessageFactory}
            ref="activeuser_container"
            className="toast-top-right"
          />
          <div className={cls_topmenu}>
            <h3 className={compstyles.capitalize}><FormattedMessage id='manage_user' /></h3>
              <div className={compstyles.dynamicBreadCrumb}>
                <ul>
                  <li><FormattedMessage id='you_are_in_mange_users_panel'/></li>
                </ul>
              </div>
            <TopMenu data={this.mainmenu} />
          </div>
          <div className={cls_isubmenu}>
            <SubMenu data={this.submenu} />
          </div>

          <div className={styles.midContainer} style={(!this.state.showList) ? {'display' : 'block'} : {'display' : 'none'}}>
            <DateRangePicker getDates = {this.getDates } />  
            { this.state.loading?
            <div className={styles.whiteCard}>  
              <div className={styles.mainSpinBlock} >
                <div className={styles.innerSpinBlock} >
                  <Loading loadType = {loadType}/>
                </div>
              </div>
            </div>
             :   
              <div>
              {
                this.state.chartData != ''
                ?
                  <div className={styles.chartBlock}>
                    <Chart container={'chart'} options={options}  />
                  </div>
                :
                  <div className={styles.whiteCard}> 
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
          {
            this.state.showList ?
              <div className={styles.midContainer} >
                <button className={styles.btnApplyAll} id="backToReprots" onClick={this.backToReprots} style = {{marginLeft:"16px"}} >{this.props.intlData.messages.back_to_reports}</button>
                <ActiveUsersList listIds={this.state.listIds} />   
              </div>
            : 
              null
          }          
        </div>  
      )
  }
}


// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    loggedInData: loggedInData(state),
    intlData: intlData(state)
  };
}

ActiveUsersReport.propTypes = {
  loggedInData: PropTypes.object
};

ActiveUsersReport.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(ActiveUsersReport);