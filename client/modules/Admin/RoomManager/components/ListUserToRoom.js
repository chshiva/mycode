import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {injectIntl, intlShape, FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';

import {Col, Row, Grid} from 'react-bootstrap';
import ListItem from '../../../../components/ListItem';
import { getRoomData, removeRoomUser, ClearRoom } from '../RoomActions';
import { roomData } from '../RoomReducer';
import styles from '../../Admin.css';
import { loggedInData } from '../../../Login/LoginReducer';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import Loading from '../../../App/components/Loading';

export class ListUserToRoom extends Component {

  constructor(props){
    super(props);
    this.state = {loading : true};
  }
    
  componentWillReceiveProps(nextProps) {
    if(nextProps.success != ''){
      this.refs.room_container.success(`${nextProps.success}`, ``);
      this.props.dispatch(ClearRoom());
    }
  }

  componentDidMount() {
    this.setdata(this.props.loggedInData); 
  }

  setdata(result){
    if (result.data && result.data._id) {
      var obj = {
        // uid : result.data._id,
        roomId : this.props.roomData.data._id
      }
      this.props.dispatch(getRoomData(obj,'')).then(res => this.setLoading());
    }
  }

  //code added by- Najib, Desc - Unset the state of loader after response received from server
  setLoading() {
    //console.log("At set loading");
    this.setState({ loading : false });
  }

  removeUser(userId) {
    var roomId = this.props.roomData.data._id;
    var props = this.props;
    var response = this.setresponse

    alertify.confirm(this.props.intl.messages.warning,this.props.intl.messages.delete_room_user_alert,
      function (result) {
        if(result) {          
          let obj = { 
            userId : userId,
            roomId : roomId
          };
          props.dispatch(removeRoomUser(obj)).then(res => response(res));
        }
      },
      function() {

      }
    ).setting('labels',{'ok': this.props.intl.messages.ok,'cancel': this.props.intl.messages.cancel});
  }

  setresponse = (response) => {
    if(response.status){
      this.refs.room_container.success(`${response.message} `, ``);
    }else{
      this.refs.room_container.error(`${response.error} `, ``);
    }
  }

  render(){    
    
    this.clsContainerRight = `${styles.containerRight} pull-right`;
    let listUsers = <FormattedMessage id='no_user_added'/>;
    let mydata = null;
    let loadType = 'list';
    if(this.props.roomData && this.props.roomData.data && this.props.roomData.data.users && this.props.roomData.data.users.length > 0){
      let roomUsers = this.props.roomData.data.users;
      let roomId = this.props.roomData.data._id;
      let uid = this.props.loggedInData.data._id;
      
      // console.log("---", roomUsers);
      listUsers = roomUsers.map((roomUser) => {
        if(roomUser._id == uid){
          mydata = <ListItem key={roomUser._id}
                value={roomUser} roomId={roomId} addStud='true' getUserId={this.removeUser.bind(this)} classname='times' classTitle={this.props.intl.messages.remove_user_from_room} />
          return null;
        }else{
          return <ListItem key={roomUser._id}
                value={roomUser} roomId={roomId} addStud='true' getUserId={this.removeUser.bind(this)} classname='times' classTitle={this.props.intl.messages.remove_user_from_room} />
        }        
      });
    }
    return (
      <div className={styles.midContainer}>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="room_container"
          className="toast-top-right"
        />
        <div className={styles.headingBlock}>
          <h2 className={styles.headingTxt}><FormattedMessage id='room_name' /> - <b>{this.props.roomData.data.roomName}</b></h2>
        </div>
        <div className={styles.whiteCard}>
        { this.state.loading?
            <div className={styles.mainSpinBlock} >
              <div className={styles.innerSpinBlock} >
                <Loading loadType = {loadType}/>
              </div>
            </div> :
          <Grid fluid={true}>
            <Row>
              <Col md={12}>
                <div className={styles.infoTxt}>
                  <p><FormattedMessage id ='title_contact_details'/>.</p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <div className={styles.userListGroup}>
                  <ul>
                    {mydata}
                    {listUsers}
                  </ul>
                </div>
              </Col>
            </Row>
          </Grid> }
        </div>
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    intl: state.intl,
    roomData : roomData(state),
    loggedInData: loggedInData(state),
  };
}

ListUserToRoom.propTypes = {
  loggedInData: PropTypes.object,
  roomData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  success : PropTypes.string
};

export default connect(mapStateToProps)(injectIntl(ListUserToRoom));
