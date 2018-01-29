import React, { PropTypes, Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';
import DateRangePicker from 'react-daterange-picker';
import { connect } from 'react-redux';

import {Col, Row, Grid, Carousel, Modal, Button} from 'react-bootstrap';
import {Header, Title, Body, Footer} from 'react-bootstrap/lib/Modal';
import styles from '../../Dashboard.css';
import dashboardStyles from '../../../Layouts/DashLayout/components/ConfSettings.css';
import InviteBox from '../../components/InviteBox';
import Scheduler from '../../components/Scheduler';

var moment = require('moment');
import { setWorkDashboard } from './WorkDashboardActions';
import { dashboardData } from '../UserDashboardReducer';
import { intlData } from '../../../Intl/IntlReducer';
import { setDashboard, getScheduleDates, getMyDateSchedules, getMyPastSchedules, clearSchedule, setSchedule, updateSchedule, getSchedule, updateSlotSchedule, deleteMySchedule, deleteMyReucrringSchedule } from '../UserDashboardActions';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import { Roles } from '../../../../roles';

import DateTimeField from 'react-bootstrap-datetimepicker';


export class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate : moment().utc().toDate(),
      upcoming : [],
      past : [],
      active : true,
      showInviteBox: false,
      roomId : null,
      scheduleId : null,
      editshow : false,
      deleteshow : false,
      recordId : null,
      slotId : null,
      refresh : false,
      roomKey : 'No Link',
      showScheduler : false,
      data : null,
      startTime : '',
      hours : 0,
      minutes : 0,
      error : '',
      errorStatus: false,
      showEditSlot: false
    }
  }

  componentDidMount() {
    this.reloadScheedule();
  }

  handleSelect(value, states){
    let val = value.utc().toDate();
    this.props.dispatch(setDashboard({ selectedDate : val }));
    this.setState({ selectedDate : val, active : true, refresh : true });
    let obj = {
      startDate : Number(moment(val).startOf('day').utc().format('x')),
      endDate : Number(moment(val).endOf('day').utc().format('x'))
    }
    this.props.dispatch(getMyDateSchedules(obj)).then(res => this.setState({ refresh : false }));
  }

  upcomingEvent(){
    this.setState({ active: true });
    let obj = {
      startDate : Number(moment(this.state.selectedDate).startOf('day').utc().format('x')),
      endDate : Number(moment(this.state.selectedDate).endOf('day').utc().format('x'))
    }
    this.props.dispatch(getMyDateSchedules(obj));
  }

  reloadScheedule = () => {
    this.setState({ active: true, refresh : true });
    let obj = {
      startDate : Number(moment(this.state.selectedDate).startOf('day').utc().format('x')),
      endDate : Number(moment(this.state.selectedDate).endOf('day').utc().format('x'))
    }
    this.props.dispatch(getScheduleDates());
    this.props.dispatch(getMyDateSchedules(obj)).then(res => this.setState({ refresh : false }));
  }

  pastEvent(){
    this.setState({ active: false });
    let obj = {
      currentDate : Number(moment(this.state.selectedDate).startOf('day').utc().format('x')),
    };
    this.props.dispatch(getMyPastSchedules(obj));
  }

  createSchedule(obj, id){
    if (id == null) {
      this.props.dispatch(setSchedule(obj)).then(res => {
        this.setResponse(res);
      });
    } else {
      this.props.dispatch(updateSchedule(obj, id)).then(res => {
        this.setResponse(res);
      });
    }
  }

  setResponse(res){
    if(res.status){
      this.refs.schedulecontainer.success(`${res.message} `, ``);
      this.showOrHideScheduler();
      this.props.dispatch(getScheduleDates()).then(res => this.setState({ errorStatus : false }));
    }else if(res.error){
      this.setState({ errorStatus : true });
      if(res.error.errors){
        let err = [];
        _.forIn(res.error.errors, function(obj, key){
          err.push(obj.message);
        });
        this.refs.schedulecontainer.error(`${err} `, ``);
      }else{
        this.refs.schedulecontainer.error(`${res.error} `, ``);
      }
    }
  }

  deleteEvent(schid, recurring, e){
    let id = e.currentTarget.id.substr(16);
    let props = this.props;
    let self = this;
    alertify.confirm(this.props.intlData.messages.warning, props.role == Roles.Instructor || props.role == Roles.Lmsadmin ? props.intlData.messages.delete_class_alert : props.intlData.messages.delete_schedule_alert, 
      function (result) {
        if(result) { 
          if (recurring) {
            self.setState({ deleteshow : true, recordId : id, slotId : schid});
          } else {
            props.dispatch(deleteMySchedule(id, schid)).then(res => self.setDelResponse(res) );
          }
        }
      },
      function() {

      }
    ).setting('labels',{'ok': this.props.intlData.messages.ok,'cancel': this.props.intlData.messages.cancel});   
  }

  setDelResponse(res){
    if(res.status){
      this.refs.schedulecontainer.success(`${res.message} `, ``);
      let obj = {
        startDate : moment(this.state.selectedDate).startOf('day').utc().format('x'),
        endDate : moment(this.state.selectedDate).endOf('day').utc().format('x')
      }
      this.props.dispatch(getMyDateSchedules(obj));
      this.props.dispatch(getScheduleDates());
    }else if(res.error){
      this.refs.schedulecontainer.error(`${res.error} `, ``);
    }
  }

  editEvent(slotid, recurring, e){
    let id = e.currentTarget.id.substr(14);
    let props = this.props;
    let self = this;
    alertify.confirm(props.intlData.messages.warning, props.role == Roles.Instructor || props.role == Roles.Lmsadmin ? props.intlData.messages.edit_class_alert : props.intlData.messages.edit_schedule_alert, 
      function (result) {
        if(result) {
          if (recurring) {
            self.setState({ editshow : true, recordId : id, slotId : slotid });
          } else {
            props.dispatch(getSchedule(id)).then(res => self.setSchResponse(res, null) );
          }
        }
      },
      function() {

      }
    ).setting('labels',{'ok': this.props.intlData.messages.ok,'cancel': this.props.intlData.messages.cancel});   
  }

  setSchResponse(response, slotId){
    if(response.status){
      this.setState({ data : response.data, slotId : slotId });
      if (slotId != null) {
        let dates = response.data.dates;
        let index = _.findIndex(dates, function(o) { return o._id == slotId; });
        if (index > -1) {
          let startTime = moment(dates[index].startTime, 'x');
          let endTime = moment(dates[index].endTime, 'x');
          let duration = moment.duration(endTime.diff(startTime));
          let min = duration.asMinutes();
          let h = Math.floor(min/60);
          let m = min - (h * 60);
          this.setState({ startTime : startTime.format('x'), hours : h, minutes : m });
          this.showOrHideEditScheduler();
        }
      } else {
        this.showOrHideScheduler();
      }
    }else if(response.error){
      this.setState({ errorStatus : true });
      this.refs.schedulecontainer.error(`${response.error} `, ``);
    }
  }

  handleUpdate = () => {
    let h = this.state.hours != '' ? (this.state.hours * 60) : 0;
    let m = this.state.minutes != '' ? this.state.minutes : 0;
    let duration = Number(h) + Number(m);
    if (duration > 0){
      if (this.state.startTime != '' && moment(this.state.startTime, 'x').isValid()) {
        let endtime = moment(this.state.startTime, 'x');
          endtime.add(duration, 'minutes');
        let obj = {
          _id : this.state.slotId,
          startTime : Number(moment(this.state.startTime, 'x').utc().format('x')),
          endTime : Number(endtime.utc().format('x'))
        };
        let now = Number(moment().utc().format('x'));
        if ( obj.endTime > now) {
          this.setState({ error : ''});
          this.props.dispatch(updateSlotSchedule(obj, this.state.data._id)).then(res => this.setUpdateResponse(res) );
        } else {
          this.setState({ error: <FormattedMessage id='duration_time_should_be_greaterthan_current_time' />});
        }
      } else {
        this.setState({ error: <FormattedMessage id='Please_select_the_valid_starttime' />})
      }
    } else {
      this.setState({ error: <FormattedMessage id='Please_select_the_duration' />});
    }
  }

  setUpdateResponse(res) {
    if (res.status) {
      this.refs.schedulecontainer.success(`${res.message} `, ``);
      let obj = {
        startDate : moment(this.state.selectedDate).startOf('day').utc().format('x'),
        endDate : moment(this.state.selectedDate).endOf('day').utc().format('x')
      }
      this.props.dispatch(getMyDateSchedules(obj));
      this.showOrHideEditScheduler();
      this.setState({ error: '' });
    } else {
      this.refs.schedulecontainer.error(`${res.error}`, ``);
    }
  }

  handleCancle = () => {
    this.setState({ error: '' });
    this.showOrHideEditScheduler();
  }

  inviteEvent(roomkey, roomid, slotId, e){
    // console.log("current sch slot -- ", slotId, e);
    let obj = {
      roomid : roomid,
      scheduleid : e.currentTarget.id.substr(16),
      slotId : slotId,
      roomkey : roomkey,
      date : this.state.selectedDate
    }
    this.props.invite(obj);
  }


  showResponse(response){
    if(response.status){
      this.refs.schedulecontainer.success(response.message, ``);
    }else if(response.error){
      this.refs.schedulecontainer.error(response.error, ``);
    }
  }

  scheduleOptions(userId, data, role){
    let cls_imgcontrol = `${styles.iconCircle} ${styles.bgStart}`;
    let now = Number(moment().utc().format('x'));
    let start = data.dates.startTime;
    let date = data.dates.endTime;
    let recurring = data.pattern && data.pattern != '' ? true : false;
    if(userId == data.createdBy._id && start <= now && now <= date){
      return(
        <ul className="clearfix">
          { !this.props.getConnection ? 
            <li>
              <Link onClick={this.handleStart} id={data.roomId && data.roomId.roomKey ? ("start_schedule_"+data.roomId.roomKey) : "start_schedule_#"} title={role == Roles.Student ? this.props.intlData.messages.join_class : role == Roles.Instructor || role == Roles.Lmsadmin ? this.props.intlData.messages.start_class : this.props.intlData.messages.start_conference}>
                <div className={cls_imgcontrol}>
                  <img src="/images/white-icons/white-join-conference.png" />
                </div>
                <p><FormattedMessage id = 'start'/></p>
              </Link>
            </li>
          : null}
          {/*<li className={styles.editSchedule}>
            <Link title={role == Roles.Instructor || role == Roles.Lmsadmin ? this.props.intlData.messages.edit_class : this.props.intlData.messages.edit_schedule} id={data._id} onClick={this.editEvent.bind(this, data.dates._id, recurring)} >
              <div className={cls_imgcontrol}>
                <img src="/images/white-icons/white-edit.png" />
              </div>
              <p><FormattedMessage id = 'edit'/></p>
            </Link>
          </li>
          <li className={styles.deleteSchedule}>
                      <Link title={role == Roles.Instructor || role == Roles.Lmsadmin ? this.props.intlData.messages.delete_class : this.props.intlData.messages.delete_schedule} id={data._id} onClick={this.deleteEvent.bind(this, data.dates._id, recurring)}>
                        <div className={cls_imgcontrol}>
                          <img src="/images/white-icons/white-delete.png" />
                        </div>
                        <p><FormattedMessage id = 'delete'/></p>
                      </Link>
          </li>*/}
          <li className={styles.inviteContacts}>
            <Link onClick={this.inviteEvent.bind(this, data.roomId.roomKey, data.roomId._id, data.dates._id)} id={"invite_schedule_"+data._id} title={this.props.intlData.messages.invite_contacts}>
              <div className={styles.iconCircle}>
                <img src="/images/white-icons/white-add-contacts.png" />
              </div>
              <p><FormattedMessage id = 'invite'/></p>
            </Link>
          </li>
        </ul>
      );
    }
    if(userId == data.createdBy._id && now < start){
      return(
        <ul className="clearfix">
          <li className={styles.editSchedule}>
            <Link title={this.props.intlData.messages.edit_schedule} id={"edit_schedule_"+data._id} onClick={this.editEvent.bind(this, data.dates._id, recurring)} >
              <div className={styles.iconCircle}>
                <img src="/images/white-icons/white-edit.png" />
              </div>
              <p><FormattedMessage id = 'edit'/></p>
            </Link>
          </li>
          <li className={styles.deleteSchedule}>
            <Link title={this.props.intlData.messages.delete_schedule} id={"delete_schedule_"+data._id} onClick={this.deleteEvent.bind(this, data.dates._id, recurring)}>
              <div className={styles.iconCircle}>
                <img src="/images/white-icons/white-delete.png" />
              </div>
              <p><FormattedMessage id = 'delete'/></p>
            </Link>
          </li>
          <li className={styles.inviteContacts}>
            <Link onClick={this.inviteEvent.bind(this, data.roomId.roomKey, data.roomId._id, data.dates._id)} id={"invite_schedule_"+data._id} title={this.props.intlData.messages.invite_contacts}>
              <div className={styles.iconCircle}>
                <img src="/images/white-icons/white-add-contacts.png" />
              </div>
              <p><FormattedMessage id = 'invite'/></p>
            </Link>
          </li>
        </ul>
      );
    } else if( start <= now && now <= date && !this.props.getConnection){
      return(
        <ul className="clearfix">
          <li style={role == Roles.Student ? { width : "100%"} : {}}>
            <Link onClick={this.handleStart} id={data.roomId && data.roomId.roomKey ? ("start_schedule_"+data.roomId.roomKey) : "start_schedule_#"} title={role == Roles.Student ? this.props.intlData.messages.join_class : role == Roles.Instructor || role == Roles.Lmsadmin ? this.props.intlData.messages.start_class : this.props.intlData.messages.start_conference}>
              <div className={cls_imgcontrol}>
                <img src="/images/white-icons/white-join-conference.png" />
              </div>
              <p><FormattedMessage id ='join'/></p>
            </Link>
          </li>
        </ul>
      );
    }else{
      return;
    } 
  }

  handleStart = (event) => {
    let link = event.currentTarget.id.substr(15);
    this.props.startConference(link);
  }

  handleEvent() {
    console.log("handleEvent trigger");
  }

  viewUser(id) {
    browserHistory.push('/profile/'+id)
  }

  closeEdit = () => {
    this.setState({ editshow : false, slotId : null, recordId : null });
  }
  editCurrentDay = () => {
    let id = this.state.recordId;
    let slotId = this.state.slotId;
    this.props.dispatch(getSchedule(id)).then(res => this.setSchResponse(res, slotId) );
    this.setState({ editshow : false, slotId : null, recordId : null });
  }
  editRecurring = () => {
    let id = this.state.recordId;
    this.props.dispatch(getSchedule(id)).then(res => this.setSchResponse(res, null) );
    this.setState({ editshow : false, slotId : null, recordId : null });
  }

  closeDelete = () => {
    this.setState({ deleteshow : false, slotId : null, recordId : null });
  }
  deleteCurrentDay = () => {
    let id = this.state.recordId;
    let slotId = this.state.slotId;
    this.props.dispatch(deleteMySchedule(id, slotId)).then(res => this.setDelResponse(res) );
    this.setState({ deleteshow : false, slotId : null, recordId : null });
  }
  deleteRecurring = () => {
    let obj = {
      recordId : this.state.recordId,
      currentDate  : moment(this.state.selectedDate).startOf('day').utc().format('x')
    }
    this.props.dispatch(deleteMyReucrringSchedule(obj)).then(res => this.setDelResponse(res) );
    this.setState({ deleteshow : false, slotId : null, recordId : null });
  }

  updateRooms(response){
    if(response){
      this.props.updateRoomsWithNewKey(response);
    }
  }

  showOrHideScheduler() {
    if(this.state.showScheduler) {
      this.setState({ showScheduler : false, data : null, errorStatus: false });
      this.props.dispatch(clearSchedule());
    } else {
      let toDate = moment().startOf('day').utc().toDate();
      if(this.state.selectedDate < toDate) {
        this.refs.schedulecontainer.error("Selected date should be greater than or equal to current date");
      } else {
        this.setState({ showScheduler : true });
      }
    }
  }

  showOrHideEditScheduler = () => {
    if (this.state.showEditSlot) {
      this.setState({ data : null, showEditSlot : false, slotId : null, scheduleId : null, startTime : '', hours : 0, minutes : 0 });
    } else {
      this.setState({ showEditSlot : true });
    }
  }

  handleStartTimeChange = (newTime) => {
    if (moment(newTime, "x").isValid()) {
      let nt = moment(newTime, "x");
      let st = moment(this.state.startTime, 'x');
      st.hours(nt.hours()).minutes(nt.minutes()).seconds(0);
      this.setState({startTime : st.format('x')});
    }
  }

  handleHours = (event) => {
    this.setState({ hours : event.target.value});
  }

  handleMinutes = (event) => {
    this.setState({ minutes : event.target.value}); 
  }

  render(){
    if(this.props.role) {
      var role = this.props.role
    }
    // console.log("in schedule === ",this.props.pastData);
    let cls_imgcontrol = `${styles.iconCircle} ${styles.bgStart}`;
    let cls_scheduFullBlock = `${dashboardStyles.modNoContacts} ${dashboardStyles.scheduFullBlock}`;
    let cls_noschedule = `${dashboardStyles.scheduImgBlock} ${dashboardStyles.noContactsCircle} ${dashboardStyles.topMrgZero}`;
    let cls_calendarInlineBlock = `${dashboardStyles.calendarInlineBlock} clearfix`;
    let cls_btnSaveEdit = `btn btn-success btn-icon btn-sm`;
    const mins = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
    const hrs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    
    let stateDefinitions = {
          available: {
            color: null,
          },
          enquire: {
            color: '#00af50',
          },
          past: {
            color: '#c4c6cb'
          }
        };

    // console.log("dateranges ==== ", this.props.dashboardData.scheduledDates);
    var schedulesList = <li> 
        <Row>
          <Col md={12}>
            <div className={cls_scheduFullBlock}>
              <div className={cls_noschedule}>
                <img src="/images/profile-pics/no-schedule.png" />
              </div>
                <h2><FormattedMessage id = 'no_schedules'/>
                  <p><FormattedMessage id = 'create_schedule'/></p>
                </h2>
            </div>
          </Col>
        </Row>

      </li>;
    let upcomingClass = '';
    let pastClass = '';
    let newSchedules = [];
    if(this.state.active){
      upcomingClass = styles.current;
    }else{
      pastClass = styles.current;
    }
    if(this.props.dashboardData.upcoming){
      let userId = this.props.userId;
      let docs = this.props.dashboardData.upcoming;
      if(docs.length > 0){
        schedulesList = docs.map((doc) => {
              if (doc.dates.endTime >= Number(moment().utc().format('x')) ){
                newSchedules.push(
                  <li key={doc.dates._id}>
                    <Row>
                      <div className={role == Roles.Student ? "col-xs-9" : "col-md-6"}>
                        <div className={styles.modMeetingDetails}>
                          <h2 className={styles.meetingTitle}>{doc.meetingName}</h2>
                          <div className={styles.organizerDetials}>
                            <img id="viewprofile" src={doc.createdBy && doc.createdBy.profile && doc.createdBy.profile.profileImage != undefined && doc.createdBy.profile.profileImage !='' && doc.createdBy.profile.profileImage !=null ? "/uploads/"+doc.createdBy.profile.profileImage : "/images/profile-pics/defaultStudent.jpg"} 
                            onClick={this.viewUser.bind(this, doc.createdBy._id)} title={this.props.intlData.messages.viewprofile} />
                            <p> {moment(doc.dates.startTime, 'x').format('ddd')}, {moment(doc.dates.startTime, 'x').format('YYYY-DD-MM')}, {moment(doc.dates.startTime, 'x').format('hh:mm')}<span className={styles.adjustTime}>{moment(doc.dates.startTime, 'x').format('A')}</span> - {moment(doc.dates.endTime, 'x').format('hh:mm')}<span className={styles.adjustTime}>{moment(doc.dates.endTime, 'x').format('A')}</span></p>
                            <p><FormattedMessage id = 'room'/> : {doc.roomId.roomName}</p>
                            <p><FormattedMessage id = 'organizer'/> : {doc.createdBy.firstname}</p>
                          </div>
                        </div>
                      </div>
                      <div className={role == Roles.Student ? "col-xs-3" : "col-md-6"}>
                        <div className={styles.modScheduleControls}>
                          {this.scheduleOptions(userId, doc, role)}
                        </div>
                      </div>
                    </Row>
                  </li>

                  );
                return null;
              } else {               
                return (<li key={doc.dates._id}>
                  <Row>
                    <div className={role == Roles.Student ? "col-xs-9" : "col-md-6"}>
                      <div className={styles.modMeetingDetails}>
                        <h2 className={styles.meetingTitle}>{doc.meetingName}</h2>
                        <div className={styles.organizerDetials}>
                          <img id="viewprofile" src={doc.createdBy && doc.createdBy.profile && doc.createdBy.profile.profileImage != undefined && doc.createdBy.profile.profileImage !='' && doc.createdBy.profile.profileImage !=null ? "/uploads/"+doc.createdBy.profile.profileImage : "/images/profile-pics/defaultStudent.jpg"} 
                          onClick={this.viewUser.bind(this, doc.createdBy._id)} title={this.props.intlData.messages.viewprofile} />
                          <p> {moment(doc.dates.startTime, 'x').format('ddd')}, {moment(doc.dates.startTime, 'x').format('YYYY-DD-MM')}, {moment(doc.dates.startTime, 'x').format('hh:mm')}<span className={styles.adjustTime}>{moment(doc.dates.startTime, 'x').format('A')}</span> - {moment(doc.dates.endTime, 'x').format('hh:mm')}<span className={styles.adjustTime}>{moment(doc.dates.endTime, 'x').format('A')}</span></p>
                          <p><FormattedMessage id = 'room'/> : {doc.roomId.roomName}</p>
                          <p><FormattedMessage id = 'organizer'/> : {doc.createdBy.firstname}</p>
                        </div>
                      </div>
                    </div>
                    <div className={role == Roles.Student ? "col-xs-3" : "col-md-6"}>
                      <div className={styles.modScheduleControls}>
                        {this.scheduleOptions(userId, doc, role)}
                      </div>
                    </div>
                  </Row>
                </li>);
              }
            }
        );
      }
    }
    if(this.props.dashboardData.past){
      let docs = this.props.dashboardData.past;
      // newSchedules = [];
      if(docs.length > 0){
        schedulesList = docs.map((doc) => 
                <li key={doc.dates._id}>
                  <Row>
                    <Col md={6}>
                      <div className={styles.modMeetingDetails}>
                        <h2 className={styles.meetingTitle}>{doc.meetingName}</h2>
                        <div className={styles.organizerDetials}>
                          <img id="viewprofile" src={doc.createdBy && doc.createdBy.profile && doc.createdBy.profile.profileImage ? "/uploads/"+doc.createdBy.profile.profileImage : "/images/profile-pics/defaultStudent.jpg"} onClick={this.viewUser.bind(this, doc.createdBy._id)} title={this.props.intlData.messages.viewprofile} />
                          <p> {moment(doc.dates.startTime, 'x').format('ddd')}, {moment(doc.dates.startTime, 'x').format('YYYY-DD-MM')}, {moment(doc.dates.startTime, 'x').format('hh:mm')}<span className={styles.adjustTime}>{moment(doc.dates.startTime, 'x').format('A')}</span> - {moment(doc.dates.endTime, 'x').format('hh:mm')}<span className={styles.adjustTime}>{moment(doc.dates.endTime, 'x').format('A')}</span></p>
                          <p><FormattedMessage id = 'room'/> : {doc.roomId.roomName}</p>
                          <p><FormattedMessage id = 'organizer'/> : {doc.createdBy.firstname}</p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </li>
        );
      }
    }

    return (
      <div className={styles.tableBox}>
        <ToastContainer
            toastMessageFactory={ToastMessageFactory}
            ref="schedulecontainer"
            className="toast-bottom-right"
           />
        <Scheduler showModal={this.state.showScheduler} calenderDate={this.state.selectedDate}
              hidecallback={this.showOrHideScheduler.bind(this)} saveSchedule={this.createSchedule.bind(this)} scheduleData={this.state.data}
              errorStatus={this.state.errorStatus} role={this.props.role} selectedDate={this.props.dashboardData.selectedDate}/>
        <Modal show={this.state.showEditSlot} onHide={this.showOrHideEditScheduler}>
          <Header closeButton>
            <Title className={styles.popHeadingAll} >
              {this.props.intlData.create_edit_class}
            </Title>
          </Header>
          <Body>
            <div className={dashboardStyles.meetingDetails}>
              <div className={dashboardStyles.meetingInfoBlock}>
                <form>
                  <div className={cls_calendarInlineBlock}>
                    <ul className="clearfix">
                      <li style={{width : "40%"}}>
                        <p><FormattedMessage id = 'set_start_time'/></p>
                        <div id="startTime" className={dashboardStyles.dateTimePickerBlock}>
                          <DateTimeField mode="time" id="startTime" onChange={this.handleStartTimeChange} dateTime={this.state.startTime}/>
                        </div>
                      </li>
                      <li style={{width : "30%"}}>
                        <p><FormattedMessage id = 'set_hours'/></p>
                        <div className={dashboardStyles.dateTimePickerBlock}>
                          <select id="setHours" className="form-control" onChange={this.handleHours} defaultValue={this.state.hours}>
                            {hrs.map( value => {
                              return <option value={value} key={value}>{value} hrs</option>
                            })}
                          </select>
                        </div>
                      </li>
                      <li style={{width : "30%"}}>
                        <p><FormattedMessage id = 'set_minutes'/></p>
                        <div className={dashboardStyles.dateTimePickerBlock}>
                          <select id="setMinites" className="form-control" onChange={this.handleMinutes} defaultValue={this.state.minutes}>
                            {mins.map( value => {
                              return <option value={value} key={value}>{value} mins</option>
                            })}
                          </select>
                        </div>
                      </li>
                    </ul>
                  </div>
                </form>
              </div>
            </div>
          </Body>
          <Footer>
            <div className={styles.errorSetDuration} >
              <label>{this.state.error}</label>
            </div>
            <div className={styles.blockSaveAssign} >
              <button id="cancel" onClick={this.handleCancle} ><FormattedMessage id = 'cancel'/></button>
              <button id="save" className={styles.btnSaveAssign} onClick={this.handleUpdate}><FormattedMessage id = 'save'/></button>
            </div>
          </Footer>
        </Modal>
        <Modal
          show={this.state.editshow}
          onHide={this.closeEdit}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title" className={styles.popHeadingAll} ><FormattedMessage id='edit_current_day_recurring' /></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormattedMessage id='want_to_edit_current_day_or_recurring_schedule' />
          </Modal.Body>
          <Modal.Footer>
            <Button id="current" className={styles.btnApplyAll} onClick={this.editCurrentDay}><FormattedMessage id='current' /></Button>
            <Button id="recurring" className={styles.btnApplyAll} onClick={this.editRecurring}><FormattedMessage id='recurring' /></Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={this.state.deleteshow}
          onHide={this.closeDelete}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title" className={styles.popHeadingAll} ><FormattedMessage id='delete_current_day_recurring' /></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormattedMessage id='want_to_delete_current_day_or_recurring_schedule' />
          </Modal.Body>
          <Modal.Footer>
            <Button id="current" className={styles.btnApplyAll} onClick={this.deleteCurrentDay}><FormattedMessage id='current' /></Button>
            <Button id="recurring" className={styles.btnApplyAll} onClick={this.deleteRecurring}><FormattedMessage id='recurring' /></Button>
          </Modal.Footer>
        </Modal>
        <div className={styles.modCardHeader}>
          {
            role == Roles.Student
            ?
              <h2><FormattedMessage id = 'my_classes'/></h2>
            : role == Roles.Instructor || role == Roles.Lmsadmin
            ?
              <h2><FormattedMessage id = 'create_a_class'/></h2>
            : <h2><FormattedMessage id = 'calendar'/></h2>
          }
          <div className={styles.modRoomControls}>
            <ul>
              <li className="hidden-xs">
                <Link id="reloadScheedule" onClick={this.reloadScheedule}> 
                <img src="/images/black-icons/black-regenerate.png" className = {this.state.refresh == true ? styles.spinAnimation : null} title={this.props.intlData.messages.refresh_schedules}/> 
                </Link>
              </li>
              {
                role == Roles.Admin || role == Roles.Moderator || role == Roles.User ?
                  <div id="scheduleMeeting" className={styles.headerActionBtn} title={this.props.intlData.messages.schedule_meeting} onClick={this.showOrHideScheduler.bind(this)}>
                    <span>{this.props.intlData.messages.schedule_meeting}</span>
                  </div>
                : (role != Roles.Student
                  ?
                  <li><Link id="showOrHideScheduler" onClick={this.showOrHideScheduler.bind(this)}>
                    <img src="/images/icons/green-schedule.png" title={role == Roles.Instructor || role == Roles.Lmsadmin ? this.props.intlData.messages.create_a_class : this.props.intlData.messages.schedule_meeting}/>
                    </Link>
                  </li>
                  : null
                  )
              }
            </ul>
          </div>
        </div>
        <div className={styles.modCardCalendarClock}>
          <div id="scheduleDate" className={styles.calendarBox}>
              <DateRangePicker
                  firstOfWeek={1}
                  numberOfCalendars={1}
                  selectionType='single'
                  stateDefinitions={stateDefinitions}
                  dateStates={this.props.dashboardData.scheduledDates}
                  defaultState="available"
                  locale={moment().locale()}
                  value={moment(this.state.selectedDate)}
                  onSelect={this.handleSelect.bind(this)}
                  onEvent={this.handleEvent.bind(this)} />
                  <ul className={styles.datePicLegend}>
                    <li>
                      <span className={styles.selected}></span>
                      <span className={styles.txtDisplay}><FormattedMessage id = 'your_selected_date'/></span>
                    </li>
                    <li>
                      <span className={styles.scheduled}></span>
                      <span className={styles.txtDisplay}>{role == Roles.Student || role == Roles.Instructor || role == Roles.Lmsadmin ? <FormattedMessage id = 'have_class'/> : <FormattedMessage id = 'have_schedule'/>}</span>
                    </li>
                    <li>
                      <span className={styles.pastschedule}></span>
                      <span className={styles.txtDisplay}><FormattedMessage id = 'past_classes'/></span>
                    </li>
                  </ul>
          </div>
        </div>
        <div className={styles.modCardNav}>
          <ul className="clearfix">
            <li className={upcomingClass} id="mySchedules">
              <a id="upcomingEvent" onClick={this.upcomingEvent.bind(this)}>
                <FontAwesome name="calendar-check-o" />&nbsp;
                <span className="hidden-xs hidden-sm">
                  <FormattedMessage id = 'schedules'/> 
                </span>&nbsp;
                ({moment(this.state.selectedDate).format('YYYY-DD-MM')})
                <span className="hidden-md hidden-lg sm-h2">Schedules</span>
              </a>
            </li>
            <li id="pastSchedules" className={pastClass}>
              <a id="pastEvent" onClick={this.pastEvent.bind(this)}>
                <FontAwesome name="history" />&nbsp;
                <span className="hidden-xs hidden-sm">
                  {
                    role == Roles.Student || role == Roles.Instructor || role == Roles.Lmsadmin
                    ?
                      <FormattedMessage id = 'past_classes'/>
                    : <FormattedMessage id = 'past_schedules'/>
                  }
                </span>
                <span className="hidden-md hidden-lg sm-h2">History</span>
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.modCardBody}> 
          <div className={styles.modCardChild}>
            <div className={styles.modScheduleListBlock}>
              <ul>
                {newSchedules}
                {schedulesList}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    dashboardData: dashboardData(state)
  };
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    dashboardData: dashboardData(state),
    intlData: intlData(state)
  };
}

Schedule.contextTypes = {
  router: React.PropTypes.object,
  // intl: React.PropTypes.object.isRequired
};

Schedule.propTypes = {
  hideCallback: PropTypes.func,
  hideorshowInvite: PropTypes.func,
  // intl: PropTypes.object,
  getUpcomingSchedules: PropTypes.func,
  deleteSchedule: PropTypes.func,
  editSchedule : PropTypes.func,
  upcomingEvent: PropTypes.func,
  pastEvent: PropTypes.func,
  // intl: intlShape.isRequired,
  dashboardData: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};


export default connect(mapStateToProps)(Schedule);

// export default injectIntl(Schedule);


/*<li><Link onClick={this.showOrHideScheduler.bind(this)}>
                <img src="/images/icons/green-schedule.png" title={role == Roles.Instructor || role == Roles.Lmsadmin ? this.props.intlData.messages.create_a_class : this.props.intlData.messages.my_schedules}/>
                </Link>
              </li>*/