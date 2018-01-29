import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import { loggedInData } from '../../../Login/LoginReducer';

import { addRoomStudent, addGroupStudentRequest, ClearRoom, getRoomData} from '../RoomActions';
import SearchStudentPopup from '../components/SearchStudentPopup';
import ListStudentToRoom from '../components/ListStudentToRoom';
// import {roomSchema} from '../schema/RoomSchema';
import {addUserSubMenu, addStudentMainMenu} from '../schema/RoomMenu';
import { roomData } from '../RoomReducer';

import SubMenu from '../../../../components/SubMenu';
import TopMenu from '../../../../components/TopMenu';

// Import Style
import styles from '../../../../components/component.css';

import {Col, Row, Grid} from 'react-bootstrap';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);

var dataObject = {};

class AddStudent extends Component {
  constructor(props){
    super(props);
    // this.datareceive = this.datareceive.bind(this);
    // this.res = {};
    this.submenu = addUserSubMenu;   
    this.mainmenu = addStudentMainMenu;
    this.mainmenu.menus[0].action = this.showOrHideAddContacts.bind(this);
    this.submenu.menus[0].action = this.backToRoom.bind(this);
    // this.dataObj = null;
    this.state = {
      showAddContacts: false,
      dataObj: {
        roomId : this.props.params.rid,
        instId : this.props.params.iid          
      }
    };
  }

  backToRoom = () => {
    var roomId = this.props.params.rid;
    browserHistory.push('/admin/room/adduser/'+roomId);
  }

  viewroom = () => {
    // console.log("ViewRoomSubtab");
    var roomId = this.props.params.rid;
    browserHistory.push('/admin/room/view/'+roomId);
  }

  componentDidMount() {
    this.setdata(this.props.loggedInData);    
  }

  setdata(result){
    if (result && result.data && result.data._id) {
      //console.log(this.props.params);
      this.setState({
        dataObj: { 
          uid : result.data._id,
          roomId : this.props.params.rid,
          instId : this.props.params.iid 
        }
      });
       this.props.dispatch(getRoomData(this.state.dataObj, ''));
    }
  }

  showOrHideAddContacts(e){
    this.setState({showAddContacts: !this.state.showAddContacts});
  }

  handleValue(toBeAddedId,addUserType){
    let roomId = this.props.params.rid;
    let instId = this.props.params.iid;

    if(addUserType == 'GROUP'){
      let groupId = toBeAddedId;
      this.props.dispatch(addGroupStudentRequest({roomId, instId, groupId})).then(res => this.setresponse(res));
    } else if(addUserType == 'INDIVIDUAL USER'){
      let userId = toBeAddedId;
      this.props.dispatch(addRoomStudent({roomId, instId, userId})).then(res => this.setresponse(res));
    }
  }

  setresponse = (response) => {
    if(response.status){
      this.refs.room_container.success(`${response.message} `, ``);
    }else{
      this.refs.room_container.error(`${response.error} `, ``);
    }
  }

  // datareceive(data) {
  //   this.form = data;
  // }

  render() {
    // console.log(this.state.dataObj);
    // if(this.props.roomData && this.props.roomData.data){
    //   dataObject = this.props.roomData.data;
    // }
    let cls_container = `${styles.iContainer} ${styles.oContainer} pull-right`;
    let cls_topmenu = `${styles.iTopMenu} ${styles.oTopMenu}`;
    let cls_isubmenu = `${styles.iSubMenu} {styles.oSubMenu}`;
    return (
      <div className={cls_container}>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="room_container"
          className="toast-top-right"
        />
        <div className={cls_topmenu}>
          <h3 className=""><FormattedMessage id='room_management' /></h3>
        <div className={styles.dynamicBreadCrumb}>
          <ul>
            <li> 
              <Link to="/admin/room/list"><FormattedMessage id = 'all_rooms'/></Link>
            </li>
            <li>/</li>
            <li>
              <Link onClick={this.viewroom}>{this.props.roomData.data.roomName}</Link>
            </li>
            <li>/</li>
              <li>
                <Link onClick={this.backToRoom}><FormattedMessage id = 'room_users'/></Link>
              </li>
            <li>/</li>
              <li>
                <FormattedMessage id = 'room_students'/>
              </li>
          </ul>
        </div>
         <TopMenu data={this.mainmenu} />
        </div>
        
        <div className={cls_isubmenu}>
          <SubMenu data={this.submenu} />
        </div>
        <SearchStudentPopup showModal={this.state.showAddContacts} getUserId={this.handleValue.bind(this)} dataObj={this.state.dataObj} hidecallback={this.showOrHideAddContacts.bind(this)} />
        <ListStudentToRoom dataObj={this.state.dataObj} />
      </div>
    );
  }
}


// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    loggedInData: loggedInData(state),
    roomData : roomData(state),
  };
}

AddStudent.propTypes = {
  loggedInData: PropTypes.object,
  roomData : PropTypes.object,
  dispatch : PropTypes.func.isRequired
};

AddStudent.contextTypes = {
  router : React.PropTypes.object
};

export default connect(mapStateToProps)(AddStudent);
