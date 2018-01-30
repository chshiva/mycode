import React, { PropTypes, Component } from 'react';
import callApi from '../../../../util/apiCaller';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {  injectIntl, intlShape, FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';
import {Col, Row, Grid, Carousel} from 'react-bootstrap';
import styles from '../../Dashboard.css';
import PollSubmissionData from './PollSubmissionData';
import { workDashboardData } from './WorkDashboardReducer';
import { setWorkDashboard } from './WorkDashboardActions';
import { dashboardData } from '../UserDashboardReducer';
import { Roles } from  '../../../../roles';
import Highcharts from 'highcharts';

try {
require('highcharts/modules/exporting')(Highcharts);
} catch(e) {
  console.log('error in pollReports');
}
// require('highcharts/modules/no-data-to-display')(Highcharts);
// require('highcharts/highcharts-3d')(Highcharts);  


class Chart extends Component {
  componentDidMount() {
    this.chart = new Highcharts[this.props.type || "Chart"](
      this.refs.chart,
      this.props.options
    );
  }

  componentWillUnmount() {
    this.chart.destroy();
  }

  render() {
    return (
        <div ref="chart"></div>
    )
  }
}


class PollReports extends Component{

	constructor(props) {
		super(props)
	}

	handleList(){
		let obj = {current : 'pollList', pollContent: false, pollList : true, pollContentData : null, pollContentIndex : null, createPoll: false, submissionList : false, pollReports : false};
		this.handleWorkDashboard(obj);
	}

	handleWorkDashboard = (obj) => {
		this.props.imHost == true && this.props.workDashboardData.sync == true ?
    		this.props.syncCallback(obj)
		: this.props.dispatch(setWorkDashboard(obj));
	}

	syncCallback(obj){
		this.props.syncCallback(obj);
	}

	handlePollContent() {
		let obj = {current : 'pollList', pollContent: true, pollList : false, createPoll: false, submissionList : false, pollReports : false};
		this.handleWorkDashboard(obj);
	}

	render() {
    let cls_areaTabs = `clearfix ${styles.presenterTabs}`;
    let cls_topicAuthor = `clearfix ${styles.topicAuthor}`;
    let cls_authorsBox = `clearfix ${styles.authorsBox}`;

    let submissionData = this.props.workDashboardData ? this.props.workDashboardData.pollContentData ? this.props.workDashboardData.pollContentData.submissions : '' : ''
    let optionData = this.props.workDashboardData ? this.props.workDashboardData.pollContentData ? this.props.workDashboardData.pollContentData.options : '' : ''

    var finalData = []

    optionData.forEach(function(option) {
  	  var count = 0
      submissionData.forEach(function(answerData) {
        if (option == answerData.answer) {
        	count=count+1
        }
      })
      var percentage = (count/ submissionData.length)*100;
      if (!isNaN(percentage)) {
      	finalData.push({
	        name: option, 
	        y: percentage
	      })
      } else {
      	finalData.push({
	        name: option, 
	        y: count
	      })
      }
    })

    const options = {
      chart: {
        type: 'column'
      },  

      title: {
        text: this.props.workDashboardData.pollContentData.question,
        widthAdjust: -100,
        style: {"text-align": "justify"}
      },

      xAxis: {
        type: 'category'
      },

      yAxis: {
        min: 0,
        max: 100,
        title: {
          text: this.props.intl.messages.total_percentage
        }
      },

      credits: {
        enabled: false
      },

      tooltip: {
        // headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.1f}% polls</b><br/>'
      },

      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: '{point.y:.1f}%'
          },
          animation: {
            duration: 1000
          }
        }
      },

      series: [{
        name: this.props.intl.messages.options,
        colorByPoint: true,
        data: finalData
      }],
    };

    let data = this.props.workDashboardData
    if(data.pollContentData && data.pollContentData.question && data.pollContentData.question.length > 10) {
      var question = data.pollContentData.question.substring(0,10) + '...'
    } else {
      var question = data.pollContentData.question
    }

		return (
			<div className={styles.whiteCard}>
				<div className={styles.breadCrum}>
		      <ul>
		        <li>
		          <Link id="roomName"><span>{this.props.roomName}</span></Link>
		        </li>
		        <li><span>/</span></li>
		        <li>
							<Link id="pollList" onClick={this.handleList.bind(this)}><span><FormattedMessage id ="poll_list"/></span></Link>
						</li>
						<li><span>/</span></li>
						<li>
							<Link id="pollContent" onClick={this.handlePollContent.bind(this)}><span title={this.props.workDashboardData.pollContentData.question}>{question}</span></Link>
						</li>
						<li><span>/</span></li>
						<li><span><FormattedMessage id = 'reports'/></span></li>
		      </ul>
		    </div>
		    <div className={styles.topicsListheader}>
		      <p><FormattedMessage id = 'poll_analysis'/></p>
		    </div>
		    <div className={styles.topicsListBody}>
		    	<Chart container={'chart'} options={options} question={this.props.workDashboardData.pollContentData.question}/>
	  		</div>
		  </div>
		)		
	}
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
  	dashboardData : dashboardData(state),
    workDashboardData : workDashboardData(state),
    intl: state.intl,
  };
}

PollReports.propTypes = {
	dashboardData: PropTypes.object,
  workDashboardData: PropTypes.object
};

export default connect(mapStateToProps)(PollReports);