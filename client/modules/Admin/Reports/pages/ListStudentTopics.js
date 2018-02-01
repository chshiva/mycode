import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { loggedInData } from '../../../Login/LoginReducer';
import { getStudentTopicsList} from '../ReportsActions';
import { reportsData } from '../ReportsReducer';
import { loginLanguage } from '../../../Intl/IntlActions';
import { intlData } from '../../../Intl/IntlReducer';
// Import Style
import styles from '../../../../components/component.css';
import adminStyles from '../../Admin.css';
import {Col, Row, Grid} from 'react-bootstrap';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import DataTable from '../../../../components/DataTable/DataTable';

class ListStudentTopics extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      searchValue : '',
      loading : true
    });

    this.currentPage= 1;
    this.itemsPerPage= 5; 

    this.searchFilter = this.searchFilter.bind(this); 
  }

  componentDidMount() {
    this.setdata(this.props.loggedInData)
  }

  setdata(result) {
    if (result && result.data && result.data._id) {
      this.props.dispatch(loginLanguage(result.data, this.props.intlData.setlocale));

	    this.getData({
	      currentPage  : this.currentPage,
	      totalItems   : 0,
	      itemsPerPage : this.itemsPerPage
	    });
    }
  }

  getData(pageParam) {
      pageParam["searchKeyword"] = this.state.searchValue; 
      pageParam["listIds"] = this.props.listIds; 
      pageParam["rId"] = this.props.courseId;

      // Change By - Najib, Desc - Calling setLoading in promise to set state after receiving response from server    
      if(_.isEmpty(this.props.reportsData.topicsList)) {
        this.setState({loading : true}); 
      } else {         
        this.setState({loading : false});
      }
      this.props.dispatch(getStudentTopicsList(pageParam, pageParam.currentPage)).then(res => this.pageData(res));
  }

  pageData(response) {
    if(this.state.loading) {
      this.setState({ loading : false });
    }
    if(response.status == false) {
      this.refs.room_container.error(`${response.error} `, ``);
    }
  }

  searchFilter(e) {
    e.preventDefault();
    var expVal = e.target.value.trim();
    var pattern = new RegExp(/[+*()?]/);
    if(!pattern.test(expVal)){
      this.state.searchValue = e.target.value.trim();
      this.getData({
        currentPage  : this.currentPage,
        totalItems   : 0,
        itemsPerPage : this.itemsPerPage
      });
    }    
  }

  showTopicName = (row) => {
    //change by : pranathi, disc: only 50 charecters are showing in  topicName
    if(row.topicName && row.topicName.length > 50) {
      let topicName = row.topicName.substring(0,50) + '...'
      return(
        <div>{topicName}</div>
      );
    } else {
      return(
        <div>{row.topicName}</div>
      );
    }
  }

  showDescription = (row) => {
    //change by : pranathi, disc: only 50 charecters are showing in  description
    if(row.description && row.description.length > 50) {
      let description = row.description.substring(0,50) + '...'
      return(
        <div>{description}</div>
      );
    } else {
      return(
        <div>{row.description}</div>
      );
    }
  }

	render() {
        var objDisp = [
            { title: <FormattedMessage id='topic_name' />, type: "function", callback: this.showTopicName },
            { title: <FormattedMessage id='description' />, type: "function", callback: this.showDescription }  
        ];

        var filter = [
            {type : 'search',id:'topicSearch', selectedfilter : this.searchFilter }
        ] 

    return (
      <div>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="room_container"
          className="toast-top-right"
        />
        <Row>
          <Col md={12}>
            <button  id="backToReports" className={adminStyles.btnApplyAll} onClick={this.props.backToReports} style = {{marginLeft:"16px"}}> {this.props.intlData.messages.back_to_reports}</button>
          </Col>
        </Row>        
        <DataTable data={this.props.reportsData.topicsList}
          count={this.props.reportsData.topicsCount}
          currentPage = {this.props.reportsData.currentTopicsPage}
          submenu={null}
          topmenu={null}
          itemsPerPage={this.itemsPerPage}
          newDataCallback={this.getData.bind(this)}
          dispField={objDisp}
          pageTitle={null} 
          filter={filter}
          listDescreption={this.props.intl.messages.course_attendance}  
          loading = {this.state.loading}            
        />
      </div>
		);
	}
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    intl: state.intl,
    loggedInData: loggedInData(state),
    reportsData: reportsData(state),
    intlData: intlData(state)
  };
}

ListStudentTopics.propTypes = {
  loggedInData: PropTypes.object,
  reportsData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

ListStudentTopics.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(ListStudentTopics);