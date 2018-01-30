import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {injectIntl, intlShape, FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';

import {Col, Row, Grid} from 'react-bootstrap';
import ListItem from '../../../../components/ListItem';
import { getStudentData, removeRoomStud, ClearRoom } from '../RoomActions';
import styles from '../../Admin.css';
import { loggedInData } from '../../../Login/LoginReducer';
import { studentData } from '../StudentReducer';
import { roomData } from '../RoomReducer';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);

export class ListStudentToRoom extends Component {
  constructor(props){
    super(props);
    this.uid = null;
  }
 
  componentDidMount() {
    this.setdata(this.props.loggedInData); 
  }

  setdata(response){
    if (response && response.data && response.data._id) {
      if (this.props && this.props.dataObj && this.props.dataObj.roomId && this.props.dataObj.instId) {
          var roomId = this.props.dataObj.roomId;
          var instId = this.props.dataObj.instId;
           this.uid = response.data._id;
            
          // console.log(obj);
          this.props.dispatch(getStudentData({roomId, instId}));
      }
    }
  }

  removeUser(studId) {
    let roomId = this.props.studentData.data.roomId._id;
    let instId = this.props.studentData.data.instId._id;
    this.props.dispatch(removeRoomStud({roomId, instId, studId})).then(res => this.setresponse(res));
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
    let listUsers = <FormattedMessage id = 'no_user_added'/>;
    let roomData = this.props.roomData
    let studData = this.props.studentData;
    if(roomData && roomData.data){
      var roomName = roomData.data.roomName;
      if(roomData.data.users) {
        for(var i = 0; i < this.props.roomData.data.users.length; i++) {
          if(this.props.roomData.data.users[i]._id == this.props.dataObj.instId) {
            var data = this.props.roomData.data.users[i]
            var instName = data.firstname + ' ' + data.lastname
          }
        }
      }
    }
    if(studData && studData.data && studData.data.roomId && studData.data.instId ){
      if(studData.data.students && studData.data.students.length > 0) {
        let roomUsers = studData.data.students;
        let roomId = studData.data.roomId._id;
        // console.log("inside---", studData);
        listUsers = roomUsers.map((roomUser) =>
          <ListItem key={roomUser._id}
                  value={roomUser} roomId={roomId} getUserId={this.removeUser.bind(this)} classname='times' classTitle={this.props.intl.messages.remove_user_from_room} />
        );
      }
    }
    return (
      <div className={styles.midContainer}>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="room_container"
          className="toast-top-right"
        />
        <div className={styles.headingBlock}>
          <h2 className={styles.headingTxt}><FormattedMessage id='room_name' /> - <b>{roomName}</b></h2>
          <h2 className={styles.headingTxt}><FormattedMessage id='instructor_name' /> - <b>{instName}</b></h2>
        </div>
        <div className={styles.whiteCard}>
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
                    {listUsers}
                  </ul>
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    studentData : studentData(state),
    loggedInData: loggedInData(state),
    roomData : roomData(state),
    intl: state.intl,
  };
}

ListStudentToRoom.propTypes = {
  loggedInData: PropTypes.object,
  studentData: PropTypes.object,
  success : PropTypes.string,
  intl: intlShape.isRequired,
};

export default connect(mapStateToProps)(injectIntl(ListStudentToRoom));
