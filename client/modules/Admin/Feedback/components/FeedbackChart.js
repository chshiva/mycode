import React, { PropTypes ,Component} from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';
import { isLoggedIn,getProfileImage } from '../../../Login/LoginActions';
import { loggedInData } from '../../../Login/LoginReducer';
//import { ProfileStore } from '../ProfileActions';
import AuthClient from '../../../../components/AuthController';
import { connect } from 'react-redux';
import { Roles } from '../../../../roles.js';
import {Col, Row, Grid} from 'react-bootstrap';
import styles from '../../Admin.css';
var _ = require('lodash');
import ReactHighcharts from 'react-highcharts'; 

export class FeedbackChart extends Component {
   constructor(props) {
    super(props);
    this.state = {
      config:{
        /* HighchartsConfig */
        xAxis: {
          categories: ['Poor','Average','Good','Excellent']
        },
          series: [{
            data: [3, 4, 1, 5]
        }]
      }
    }

  this.strName       = '';
  this.strEmail      = '';
  this.strAboutMe    = '';
  this.strPhone      = '';
  this.strGender     = '';
  this.strPosition   = '';
  this.strDepartment = '';
  this.srcUrl = '';
  this.userID = '';
  this.roles = '';
   }  

  componentDidMount() {
    this.setdata(this.props.loggedInData);
    
  }

  setdata(result){
    if (result && result.data && result.data._id) {
      this.dispatch(getChartData(roomId));
      let self = this;      
        setTimeout(function () {
            self.setState({
                config:{
                    /* HighchartsConfig */
                    xAxis: {
                      categories: ['Poor','Average','Good','Excellent']
                    },
                      series: [{
                        data: [3, 4, 1, 5]
                    }]
                },
            })
            // chart.xAxis[0].setCategories(['Jan', 'Feb', 'Mar', 'Apr', 'May'],true)
            // chart.series.addPoint({x: 10, y: 12});
            // chart.series.setData([29.9, 71.5, 106.4, 129.2, 144.0],true)
        }, 3000);
      this.userID = result.data._id;
      // this.props.dispatch(getProfileImage({ uid: result.data._id })).then(res => {       
      // });
      //this.props.dispatch(ProfileStore(result.data));
    }
  }

  getInitialState(){
        return({
            config:{
                /* HighchartsConfig */
                xAxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                },
                series: [{
                    data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
                }]
            },
        })
    }   

  render () {
    // console.log(this.props.loggedInData)

    if(this.props.profileData){
      this.strName = this.props.profileData.firstname + ' ' + this.props.profileData.lastname;
      this.strEmail = this.props.profileData.email;
      /*need to convert into string value from roles object*/
      let roleObj = _.invert(Roles);
      this.role = roleObj[this.props.profileData.role];
      if(this.props.profileData.profile){
            this.strAboutMe  = this.props.profileData.profile.aboutme;
            this.strPhone    = this.props.profileData.profile.phone[1];
            this.strGender   = this.props.profileData.profile.gender;
            this.strPosition = this.props.profileData.profile.position;
            this.strDepartment = this.props.profileData.profile.dept;
      }
       
  }
  this.clsContainerRight = `${styles.containerRight} pull-right`;
  let cls_inlineEditGroup = `${styles.inlineEditGroup} clearfix`;
    return (
    <div className={this.clsContainerRight}>
      <div className={cls_inlineEditGroup}>
        <Grid fluid={true}>
            <Row>              
              <Col md={8}>
                <div className={styles.formField}>
                  
                  <ReactHighcharts config = {this.state.config} ref="chart"/>
                </div>
              </Col>
            </Row>            
        </Grid>
      </div>
    </div>
  );
  }
}

function mapStateToProps(state) {
  return {
    loggedInData: loggedInData(state),
    /*UploadsData: UploadsData(state),*/
  };
}

FeedbackChart.contextTypes = {
  router: React.PropTypes.object,
};

FeedbackChart.propTypes = {
  loggedInData: PropTypes.object,
 /* UploadsData: PropTypes.object,*/
  dispatch: PropTypes.func.isRequired,
};

//export default ProfileView;
export default connect(mapStateToProps)(FeedbackChart);
