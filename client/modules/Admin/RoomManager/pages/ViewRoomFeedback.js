import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

import AuthClient from '../../../../components/AuthController.js';
import { isLoggedIn } from '../../../Login/LoginActions';
import { getRoomFeedbackData, UpdateRoomSchema, DeleteRoom, ClearRoom } from '../RoomActions';
import { roomData } from '../RoomReducer';
import { feedbackData } from '../FeedbackReducer';
import { loggedInData } from '../../../Login/LoginReducer';
import RoomView from '../components/RoomView';
import Validator from '../../../../components/Validator';
import {roomSchema} from '../schema/RoomSchema';
import SubMenu from '../../../../components/SubMenu';
import TopMenu from '../../../../components/TopMenu';
import {viewFeedbackSubMenu, viewFeedbackMainMenu} from '../schema/RoomMenu';

// Import Style
import styles from '../../../../components/component.css';
import ViewUserFeedback from '../components/ViewUserFeedback';
import {Col, Row, Grid} from 'react-bootstrap';


class ViewRoomFeedback extends Component {
  constructor(props){
    super(props);  
    this.state = {loading : true}  
    this.mainmenu = viewFeedbackMainMenu;
    this.schema = roomSchema;

    this.mainmenu.menus[0].action = this.feedback.bind(this);//this.save.bind(this);
    // this.mainmenu.menus[1].action = this.deleteRoom.bind(this);
     this.submenu = Validator.activeSubMenu(viewFeedbackSubMenu, "lnkMyRoom");
    // this.submenu.menus[0].action = this.viewroom.bind(this);
    // this.submenu.menus[1].action = this.adduser.bind(this);
    // this.submenu.menus[2].action = this.listtopic.bind(this);
    this.submenu.menus[0].action = this.feedback.bind(this);
  }

   componentWillMount() {
   // console.log("Component mounted ViewRoomFeedback");
  //   var roomId = this.props.params.cid;
  //   this.props.dispatch(isLoggedIn(AuthClient.getSession(), '/admin/room/view/'+roomId)).then(res => this.setdata(res));;
   }

  componentDidMount() {
    this.setdata(this.props.loggedInData);    
  }

  setdata(result){
    //console.log("Inside view room feedback");
    if (result && result.data && result.data._id) {
      //console.log(this.props.params)
      var feedbackId = this.props.params.cid;

    // Change By - Najib, Desc - Calling setLoading in promise to set state after receiving response from server    
    if(_.isEmpty(this.props.feedbackData.data.feedbacks) || feedbackId != this.props.feedbackData.data.feedbacks._id) {
      this.setState({loading : true}); 
    } else {        
      this.setState({loading : false});
    }
      this.props.dispatch(getRoomFeedbackData(feedbackId, '/admin/room/view-feedback/'+feedbackId)).then(res=>this.setLoading());
    }
  }

  setLoading() {
    if(this.state.loading) {
      this.setState({loading : false});        
    }
  }

  clear() {
    this.props.dispatch(ClearRoom());
  }  

  feedback = () => {
     //var fdId = this.props.feedbackData.data[0]._id;

     if(this.props.feedbackData.data && this.props.feedbackData.data.roomId._id) {
        var roomId = this.props.feedbackData.data.roomId._id;
        browserHistory.push('/admin/room/room-feedback-list/'+roomId);
     }    
  }
  viewroom = () => {
    // console.log("ViewRoomSubtab");
    var roomId = this.props.feedbackData.data.roomId._id;
    browserHistory.push('/admin/room/view/'+roomId);
  }

  render() {
 
    let courseName = '';
    if(this.props && this.props.feedbackData && this.props.feedbackData.data && this.props.feedbackData.data.roomId) {
      courseName = this.props.feedbackData.data.roomId.roomName;
    }
   
     //console.log("Room user data ----", this.props.feedbackData.data);
    // console.log("ID______", this.props.roomData.dataList[0]._id);
    //let clsContainerRight = `${styles.containerRight} pull-right`;
    let cls_container = `${styles.iContainer} ${styles.oContainer} pull-right`;
    let cls_topmenu = `${styles.iTopMenu} ${styles.oTopMenu}`;
    let cls_isubmenu = `${styles.iSubMenu} {styles.oSubMenu}`;

    return (
      <div className={cls_container}>
        <div className={cls_topmenu}>
          <h3 className=""><FormattedMessage id='room_management' /></h3>
          <div className={styles.dynamicBreadCrumb}>
            <ul>
              <li> 
                <Link to="/admin/room/list"><FormattedMessage id = 'all_rooms'/></Link>
              </li>
              <li>/</li>
              <li>
                <Link onClick={this.viewroom}>{courseName}</Link>
              </li>
              <li>/</li>
              <li>
                <Link onClick={this.feedback}><FormattedMessage id='room_feedback'/></Link>
              </li>
              <li>/</li>
              <li>
                <FormattedMessage id = 'feedback_details'/>
              </li>
            </ul>
          </div>
          <TopMenu data={viewFeedbackMainMenu} />
        </div>
  

        <div className={cls_isubmenu}>
          <SubMenu data={viewFeedbackSubMenu} />
        </div>

        
        <ViewUserFeedback userFeedbackData = {this.props.feedbackData.data.feedbacks} roomdata = {this.props.feedbackData.data.roomId} userData = {this.props.feedbackData.data.userId} error = {this.props.feedbackData.error} key ={this.props.feedbackData.roomId} success = {this.props.feedbackData.success} clear = {this.clear} role = {this.props.loggedInData.data.role} loading = {this.state.loading}/>

      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    roomData : roomData(state),
    loggedInData: loggedInData(state),
    feedbackData: feedbackData(state)
  };
}

ViewRoomFeedback.propTypes = {
  loggedInData: PropTypes.object,
  roomData : PropTypes.object,
  dispatch : PropTypes.func.isRequired
};

ViewRoomFeedback.contextTypes = {
  router : React.PropTypes.object
};

export default connect(mapStateToProps)(ViewRoomFeedback);
