import React, { PropTypes, Component } from 'react';
import ReactDom from 'react-dom';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import FeedbackTypeDefault from './FeedbackTypeDefault';
import FeedbackTypeCustomize from './FeedbackTypeCustomize';
import { getFeedbackTypeRequest, clearDashboardRooms } from '../UserDashboardActions';
import { dashboardData } from '../UserDashboardReducer';
import AuthClient from '../../../../components/AuthController.js';
import { isLoggedIn } from '../../../Login/LoginActions';
import { loggedInData } from '../../../Login/LoginReducer';
import Loading from '../../../App/components/Loading';
import { intlData } from '../../../Intl/IntlReducer';
var _ = require('lodash');


export class Feedback extends Component {  
  constructor(props) {
    super(props);    
  }

  componentDidMount() {
    this.setdata(this.props.loggedInData);    
  }

  componentWillUnmount() {
    this.props.dispatch(clearDashboardRooms());
  }

  setdata(data) {
    if (data.data.guest) {
      browserHistory.push('/');
    } else {
      let uid = this.props.loggedInData.data._id;
      let rid = this.props.params.rid;
      this.props.dispatch(getFeedbackTypeRequest(rid)).then((res) => {
        if(!res.status) {
          browserHistory.push('/dashboard');
        }
      });
    }
  }

  //Chnages made by prateek  
  //date : 15/09/2017
  

  render(){
    if(this.props.dashboardData && this.props.dashboardData.data != undefined && _.isEmpty(this.props.dashboardData.data) == false) {
      return(
        <div>
          {this.props.dashboardData.data.roomConfiguration.feedback.feedbackType == 'None'
            ?
            browserHistory.push('/dashboard')
            :
            this.props.dashboardData.data.roomConfiguration.feedback.feedbackType == 'Default'
            ?
            <FeedbackTypeDefault roomkey={this.props.params.rid}/>
            :
            <FeedbackTypeCustomize roomkey={this.props.params.rid} questions={this.props.dashboardData.questionnaireData.questions}/>
          }
        </div>
      )
    } else {
      return <Loading message={this.props.intlData.messages.loading_please_wait}/>
    }
  }    
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    loggedInData: loggedInData(state),
    dashboardData: dashboardData(state),
    intlData: intlData(state)
  };
}

Feedback.propTypes = {
  loggedInData: PropTypes.object,
  dashboardData: PropTypes.object,
  intlData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

Feedback.contextTypes = {
  router: React.PropTypes.object,
  intl: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Feedback);