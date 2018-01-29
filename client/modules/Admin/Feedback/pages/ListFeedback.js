import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

import AuthClient from '../../../../components/AuthController';
import DataObject from '../../../../components/DataObject';
import { isLoggedIn } from '../../../Login/LoginActions';
import { loggedInData } from '../../../Login/LoginReducer';
import Validator from '../../../../components/Validator';
import Feedback from '../../../../components/Feedback';

import { FeedbackListRequest, FeedbackStore, UpdateFeedbackSchema, ClearRoom } from '../FeedbackActions';
import { feedbackData } from '../../RoomManager/FeedbackReducer';

import DataTable from '../../../../components/DataTable/DataTable';

//import {roomSchema} from '../schema/RoomSchema';
import {feedbackListMainMenu, feedbackListSubMenu} from '../schema/FeedbackMenu';

// Import Style
import styles from '../../Admin.css';

import {Col, Row, Grid} from 'react-bootstrap';
import  {ToastContainer, ToastMessage} from '../../../../lib';
import { Roles } from  '../../../../roles';
import { loginLanguage } from '../../../Intl/IntlActions';
//import StarRating from 'react-star-rating';
//import stylesheet from '../../../../../node_modules/react-star-rating/dist/css/react-star-rating.min.css'
import { intlData } from '../../../Intl/IntlReducer';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);

class ListFeedback extends Component {
  constructor(props){
    super(props);  
    this.state = { 
    	showFeedback:false,
      isLmsadmin:false,
      values:['Poor', 'Average', 'Good', 'Excellent'],        
      labelArrayLMS:[
      {label : 'Video Quality', id : 'videoQuality'},
      {label : 'Audio Quality', id : 'audioQuality'},
      {label : 'Content Sharing', id : 'contentSharing'},
      {label : 'Knowledgeable Session', id : 'knowlegableSession'},
      {label : 'Instructor Skills', id : 'instructorSkills'}],
      labelArrayCONF:[
      {label : 'Video Quality', id : 'videoQuality'},
      {label : 'Audio Quality', id : 'audioQuality'},
      {label : 'Content Sharing', id : 'contentSharing'}      
      ],

      numberValuesLabel:[{label: 'Over All Rating', id:'rating'}],
      numberValues:[1,2,3,4,5],
      feedbackComment:[{label: 'Your Comment', id:'comment'}],
      virtualRoomName:'PPL'
  	}
    this.res = {};
    this.submenu = feedbackListSubMenu;   
    this.mainmenu = feedbackListMainMenu;
    this.getData = this.getData.bind(this);
    //this.clear = this.clear.bind(this);
    this.currentPage= 1;
    this.itemsPerPage= 5;
  
    this.viewFeedback = this.viewFeedback.bind(this);
    this.mainmenu.menus[0].action = this.showOrHideFeedback.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.feedbackData.success != ''){
      this.refs.feedback_container.success(`${nextProps.feedbackData.success} `, ``);
      this.props.dispatch(ClearRoom());
    }
  }

  componentWillMount() {
      // this.props.dispatch(isLoggedIn(AuthClient.getSession(), 
      //               '/admin/room/list')).then(res => this.setdata(res));
  }

  componentDidMount() {
    this.setdata(this.props.loggedInData);    
  }

  setdata(result){
    if (result && result.data && result.data._id) {
      this.props.dispatch(loginLanguage(result.data, this.props.intlData.setlocale));
      // console.log("Label array--->", this.state.labelArray);
      if(Roles.Lmsadmin == this.props.loggedInData.data.role) { 
        this.setState({isLmsadmin:true});
      }     
      //this.props.dispatch(FeedbackStore({uid: result.data._id }));
      this.getData({
        currentPage  : this.currentPage,
        totalItems   : 0,
        itemsPerPage : this.itemsPerPage
      });
    }
  }

  getData(pageParam){
    pageParam["uid"] = this.props.loggedInData.data._id;
    // this.props.dispatch(FeedbackListRequest(pageParam, pageParam.currentPage)).then(res => this.pageData(res));
  }

  pageData(response){
    //console.log("pageData---", res);
    if(response.status == false){
      this.refs.room_container.error(`${response.error} `, ``);
    }
  }


  viewFeedback(row){
    var link = "/admin/feedback/view/"+row._id;
    //console.log("link === ",link)
    return (
      <Link to={link}><i className="fa fa-eye"></i></Link>
    );
  }

  clearError(){
    var response = Validator.freeValue(this.schema);
    if(response){
      this.props.dispatch(UpdateFeedbackSchema(response));
      browserHistory.push('/admin/feedback/list');
    }
  }
  showOrHideFeedback() {
  	this.setState({showFeedback: !this.state.showFeedback})
  }
  
  handleValue(userId){
    this.setState({showFeedback: !this.state.showFeedback});
  }
  // handleRatingClick() {

  // }
  render() {
    // console.log("Label array--->", this.state.labelArray);
    // console.log("value array--->", this.state.values);

    console.log("Admin Role---->", this.state.adminRole);
    var objDisp = [
      { fieldName : "firstname", title : <FormattedMessage id='first_name' />, type : "text" },
      { fieldName : "rating", title : <FormattedMessage id='rating' />, type : "text" },
      { fieldName : "comment", title : <FormattedMessage id='comment' />, type : "text" },
      { title : <FormattedMessage id='view' />, type : "function", callback : this.viewFeedback }
        ];
    let startRatingNumber = 1;
    let endRatingNumber = 5;      
    return (
      <div>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="room_container"
          className="toast-top-right"
        />
        <DataTable data={this.props.feedbackData.data}
          count={0}
          currentPage = {this.props.feedbackData.currentPage}
          submenu={this.submenu}
          topmenu={this.mainmenu}
          itemsPerPage={this.itemsPerPage}
          newDataCallback={this.getData}
          dispField={objDisp}
          pageTitle={this.props.intl.messages.room_feedback}
        />
        <Feedback showModal={this.state.showFeedback} radioButtonOptions = {this.state.values}  radioGroupLabels={this.state.isLmsadmin?this.state.labelArrayLMS:this.state.labelArrayCONF} overAllRatingLabel={this.state.numberValuesLabel} overAllRatingRadioOptions={this.state.numberValues} feedbackCommentLabel={this.state.feedbackComment}    userId={this.props.loggedInData.data._id} roomName={this.props.virtualRoomName} hidecallback={this.showOrHideFeedback.bind(this)} />  
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    intl: state.intl,
    loggedInData: loggedInData(state),
    feedbackData: feedbackData(state),
    intlData: intlData(state)
  };
}

ListFeedback.propTypes = {
  loggedInData: PropTypes.object,
  feedbackData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

ListFeedback.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(ListFeedback);
