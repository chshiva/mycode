import React, { PropTypes, Component } from 'react';
import styles from './ViewCalendar.css';
import dashboard_styles from '../../../Dashboard/Dashboard.css';
import Confstyles from '../../../Layouts/DashLayout/components/ConfSettings.css';
import { FormattedMessage } from 'react-intl';
import { intlData } from '../../../Intl/IntlReducer';

import {Col, Row, Grid, Modal, Button} from 'react-bootstrap';
import {Header, Title, Body, Footer} from 'react-bootstrap/lib/Modal';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { CalendarEventsList, getMyRooms } from '../FullCalendarActions';
import { FullCalendarEventsData } from '../FullCalendarReducer';
import { setSchedule, updateSchedule, deleteMySchedule, deleteMyReucrringSchedule } from '../../../Dashboard/UserDashboard/UserDashboardActions';
import Draggable from 'react-draggable';
import WoogeenManager from '../../../Communication/WoogeenManager';
import Scheduler from '../../../Dashboard/components/Scheduler';
import { loggedInData } from '../../../Login/LoginReducer';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import  {ToastContainer, ToastMessage} from '../../../../lib';
import { Roles } from '../../../../roles';
import DateTimeField from 'react-bootstrap-datetimepicker';
import { setRightBar } from '../../../Layouts/DashLayout/RightBarActions';


class FullCalendar extends React.Component {
  constructor(props){
    super(props);
    this.state  = { 
      currentYear: moment().year(),
      activeDrags: 0,
      mixStream: false,
      showScheduler : false,
      selectedDate : moment().endOf('day').utc().toDate(),
      errorStatus : false,
      data : null,
      showEvent : false,
      editshow : false,
      deleteshow : false,
      recordId : null,
      slotId : null,
      showEditSlot : false,
      startTime : Number(moment().format('x')),
      hours : 0,
      minutes : 0
    };
    this.confObject = new WoogeenManager();
  }
  
  componentDidMount () {
    this.getData({ year: this.state.currentYear });
    $('.fc-next-button').click(function () {
      var dateAttribute = $('.fc-day,.fc-future').not('.fc-other-month')[0].getAttribute('data-date');
      var month = Number(dateAttribute.split("-")[1]);
      var year = Number(dateAttribute.split("-")[0]);

      if (year !== self.state.currentYear) {
        self.setState({currentYear: year});
        self.getData({ year: self.state.currentYear });        
      };
      // console.log("dateAttribute ", dateAttribute);
    });

    $('.fc-prev-button').click(function (prevData) {
      var dateAttribute = $('.fc-day,.fc-future').not('.fc-other-month')[0].getAttribute('data-date');

      var month = Number(dateAttribute.split("-")[1]);
      var year = Number(dateAttribute.split("-")[0]);
      if (year !== self.state.currentYear) {
        self.setState({currentYear: year});
        self.getData({ year: self.state.currentYear })
      };      
    });

    //Check till conference is going on not!
    if(this.confObject.getConnectionStatus()){
      var that = this;
      //Subscribe Mix Stream
      this.confObject.trySubscribeMixStream(function(stream){
        // console.log("Mix Stream Got", stream);
        that.setState({mixStream: true});
        that.showVideo(stream);
      })
    }
    this.updateEvents();
  }

  componentDidUpdate(prevProps, prevState) {
    this.updateEvents();
  }

  componentWillUnmount() { 
    this.props.dispatch(setRightBar({current : null}));
  }

  showVideo(stream){
    let _video = document.getElementById("objMixVideo");
    if(_video){
      //Create URL
      let _streamURL = (window.URL || webkitURL).createObjectURL(stream.mediaStream);
      _video.src = _streamURL;
      // _video.volume = 0;
    }
  }

  getData(data) {
    this.props.dispatch(CalendarEventsList(data['year']));
  }

  onStart() {
    this.setState({activeDrags: ++this.state.activeDrags});
  }

  onStop() {
    this.setState({activeDrags: --this.state.activeDrags});
  }

  navigateBack(){
    browserHistory.push("/conf/"+this.confObject.getRoomKey());
  }

  showOrHideScheduler() {
    if(this.state.showScheduler){
      this.setState({ showScheduler : false, editshow : false });
    }else{
      this.setState({ showScheduler : true, editshow : false });
    }
  }

  createSchedule(obj, id) {
    //console.log("obj == ",obj);
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
      this.refs.calendar_container.success(`${res.message} `, ``);
      // this.showOrHideScheduler();
      this.setState({showScheduler : false, editshow : false, deleteshow : false, slotId : null, recordId : null});
      this.getData({ year: this.state.currentYear });
    }else if(res.error){
      this.setState({ errorStatus : true });
      console.log("err ========= ",res.error);
      if(res.error.errors){
        let err = [];
        _.forIn(res.error.errors, function(obj, key){
          err.push(obj.message);
        });
        this.refs.calendar_container.error(`${err} `, ``);
      }else{
        console.log("error === ",res.error);
        this.refs.calendar_container.error(`${res.error} `, ``);
      }
    }
  }

  handleday = (date) => {
    let d = moment(date, 'DD/MM/YYYY').startOf('day').format('x');
    let now = moment().startOf('day').format('x');
    if (Number(d) >= Number(now)) {
      this.setState({ selectedDate : moment(date, 'DD/MM/YYYY').utc().toDate(), showScheduler : true})
    } else {
      this.setState({ selectedDate : moment().endOf('day').utc().toDate(), showScheduler : true})
    }
  }

  showOrHideEvent = (data) => {
    if (this.state.showEvent) {
      this.setState({ showEvent : false, data : null });
    } else {
      this.setState({ showEvent : true, data : data });
    }
  }

  updateEvents = (eventsList) => {
    let self = this;
    $('#calendar').fullCalendar('destroy');
    $('#calendar').fullCalendar({
      events: self.props.FullCalendarEventsData.data,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      navLinks: false,

      // editable: true,      // Edit events 
      // droppable: true,     // drop events from one day to other
      // drop: function() {   // drop events from other div
      //   if ($('#drop-remove').is(':checked')) {
      //     $(this).remove();
      //   }
      // },

      eventClick: function(calEvent, jsEvent, view) {    // click on any event
        /*console.log("calEvent === ", calEvent);
        self.showOrHideEvent(calEvent.data);*/
      },
      dayClick: function(date, jsEvent, view) {
        // self.handleday(date.format('DD/MM/YYYY'));
      }
    });
  }

  handleStart = () => {
    console.log("start");
  }

  editEvent(schid, recurring, e){
    let id = e.currentTarget.id;
    let props = this.props;
    let self = this;
    alertify.confirm(props.intlData.messages.warning, props.role == Roles.Instructor || props.role == Roles.Lmsadmin ? props.intlData.messages.edit_class_alert : props.intlData.messages.edit_schedule_alert, 
      function (result) {
        if(result) {
          if (recurring) {
            self.setState({ editshow : true, recordId : id, slotId : schid });
          } else {
            self.showOrHideScheduler();
          }
        }
      },
      function() {

      }
    ).setting('labels',{'ok': this.props.intlData.messages.ok,'cancel': this.props.intlData.messages.cancel});   
  }

  deleteEvent(schid, recurring, e){
    let id = e.currentTarget.id;
    let props = this.props;
    let self = this;
    alertify.confirm(this.props.intlData.messages.warning, props.role == Roles.Instructor || props.role == Roles.Lmsadmin ? props.intlData.messages.delete_class_alert : props.intlData.messages.delete_schedule_alert, 
      function (result) {
        if(result) { 
          if (recurring) {
            self.setState({ deleteshow : true, recordId : id, slotId : schid});
          } else {
            if (schid != null) {
              props.dispatch(deleteMySchedule(id, schid)).then(res => self.setResponse(res) );
            } else {
              let obj = {
                recordId : id,
                currentDate  : moment(self.state.selectedDate).startOf('day').utc().format('x')
              }
              props.dispatch(deleteMyReucrringSchedule(obj)).then(res => self.setResponse(res) );
            } 
          }
        }
      },
      function() {

      }
    ).setting('labels',{'ok': this.props.intlData.messages.ok,'cancel': this.props.intlData.messages.cancel});   
  }

  closeEdit = () => {
    this.setState({ editshow : false, slotId : null, recordId : null });
  }

  editCurrentDay = () => {
    let dates = this.state.data.dates;
    let startTime = moment(dates.startTime, 'x');
    let endTime = moment(dates.endTime, 'x');
    let duration = moment.duration(endTime.diff(startTime));
    let min = duration.asMinutes();
    let h = Math.floor(min/60);
    let m = min - (h * 60);
    this.setState({ startTime : startTime.format('x'), hours : h, minutes  : m });
    this.showOrHideEditScheduler();
  }
  editRecurring = () => {
    this.showOrHideScheduler();
  }

  showOrHideEditScheduler = () => {
    if (this.state.showEditSlot) {
      this.setState({ showEditSlot : false, editshow : false, startTime : Number(moment().format('x')), hours : 0, minutes : 0 });
    } else {
      this.setState({ showEditSlot : true, editshow : false });
    }
  }

  closeDelete = () => {
    this.setState({ deleteshow : false, slotId : null, recordId : null });
  }

  deleteCurrentDay = () => {
    this.props.dispatch(deleteMySchedule(this.state.recordId, this.state.slotId)).then(res => this.setResponse(res) );
    this.setState({ deleteshow : false, slotId : null, recordId : null });
  }
  deleteRecurring = () => {
    let obj = {
      recordId : this.state.recordId,
      currentDate  : moment(this.state.selectedDate).startOf('day').utc().format('x')
    }
    this.props.dispatch(deleteMyReucrringSchedule(obj)).then(res => this.setResponse(res) );
  }

  inviteEvent() {
    console.log("invite");
  }

  scheduleOptions = () => {
    
    let cls_imgcontrol = `${dashboard_styles.iconCircle} ${dashboard_styles.bgStart}`;
    let cls_ul = `clearfix ${styles.calendar_schedule_options}`;
    let data = this.state.data;
    if (data != null) {
      let userId = this.props.loggedInData.data._id;
      let role = this.props.loggedInData.data.role;
      let now = Number(moment().utc().format('x'));
      let start = data.dates.startTime;
      let date = data.dates.endTime;
      let recurring = data.pattern ? true : false;
      if(userId == data.createdBy._id && start <= now && now <= date){
        return(
          <ul className={cls_ul}>
            <li>
              <button type="button" className="btn btn-success" onClick={this.handleStart} id={data.roomId && data.roomId.roomKey ? data.roomId.roomKey : "#"} title={role == Roles.Student ? this.props.intlData.messages.join_class : role == Roles.Instructor || role == Roles.Lmsadmin ? this.props.intlData.messages.start_class : this.props.intlData.messages.start_conference}>
                <div className={cls_imgcontrol}>
                  <img src="/images/white-icons/white-join-conference.png" />
                </div>
                <p><FormattedMessage id = 'start'/></p>
              </button>
            </li>
            <li className={dashboard_styles.editSchedule}>
              <button type="button" className="btn btn-warning" title={role == Roles.Instructor || role == Roles.Lmsadmin ? this.props.intlData.messages.edit_class : this.props.intlData.messages.edit_schedule} id={data._id} onClick={this.editEvent.bind(this, data.dates._id, recurring)}>
                <div className={cls_imgcontrol}>
                  <img src="/images/white-icons/white-edit.png" />
                </div>
                <p><FormattedMessage id = 'edit'/></p>
              </button>
            </li>
            <li className={dashboard_styles.deleteSchedule}>
              <button type="button" className="btn btn-danger" title={role == Roles.Instructor || role == Roles.Lmsadmin ? this.props.intlData.messages.delete_class : this.props.intlData.messages.delete_schedule} id={data._id} onClick={this.deleteEvent.bind(this, data.dates._id, recurring)}>
                <div className={cls_imgcontrol}>
                  <img src="/images/white-icons/white-delete.png" />
                </div>
                <p><FormattedMessage id = 'delete'/></p>
              </button>
            </li>
            <li className={dashboard_styles.inviteContacts}>
              <button type="button" className="btn btn-primary" onClick={this.inviteEvent.bind(this)} id={data._id} name={data.roomId._id} title={this.props.intlData.messages.invite_contacts}>
                <div className={cls_imgcontrol}>
                  <img src="/images/white-icons/white-add-contacts.png" />
                </div>
                <p><FormattedMessage id = 'invite'/></p>
              </button>
            </li>
          </ul>
        );
      }
      if(userId == data.createdBy._id && now < start){
        return(
          <ul className={cls_ul}>
            <li className={dashboard_styles.editSchedule}>
              <button type="button" className="btn btn-warning" title={role == Roles.Instructor || role == Roles.Lmsadmin ? this.props.intlData.messages.edit_class : this.props.intlData.messages.edit_schedule} id={data._id} onClick={this.editEvent.bind(this, data.dates._id, recurring)}>
                <div className={cls_imgcontrol}>
                  <img src="/images/white-icons/white-edit.png" />
                </div>
                <p><FormattedMessage id = 'edit'/></p>
              </button>
            </li>
            <li className={dashboard_styles.deleteSchedule}>
              <button type="button" className="btn btn-danger" title={role == Roles.Instructor || role == Roles.Lmsadmin ? this.props.intlData.messages.delete_class : this.props.intlData.messages.delete_schedule} id={data._id} onClick={this.deleteEvent.bind(this, data.dates._id, recurring)}>
                <div className={cls_imgcontrol}>
                  <img src="/images/white-icons/white-delete.png" />
                </div>
                <p><FormattedMessage id = 'delete'/></p>
              </button>
            </li>
            <li className={dashboard_styles.inviteContacts}>
              <button type="button" className="btn btn-primary" onClick={this.inviteEvent.bind(this)} id={data._id} name={data.roomId._id} title={this.props.intlData.messages.invite_contacts}>
                <div className={cls_imgcontrol}>
                  <img src="/images/white-icons/white-add-contacts.png" />
                </div>
                <p><FormattedMessage id = 'invite'/></p>
              </button>
            </li>
          </ul>
        );
      }else if(userId == data.createdBy._id){
        return(
          <ul className={cls_ul}>
            <li className={dashboard_styles.deleteSchedule}>
              <button type="button" className="btn btn-danger" title={role == Roles.Instructor || role == Roles.Lmsadmin ? this.props.intlData.messages.delete_class : this.props.intlData.messages.delete_schedule} id={data._id} onClick={this.deleteEvent.bind(this, data.dates._id, recurring)}>
                <div className={cls_imgcontrol}>
                  <img src="/images/white-icons/white-delete.png" />
                </div>
                <p><FormattedMessage id = 'delete'/></p>
              </button>
            </li>
          </ul>
        );
      }else if( start <= now && now <= date){
        return(
          <ul className={cls_ul}>
            <li style={role == Roles.Student ? { width : "100%"} : {}}>
              <button type="button" className="btn btn-success" onClick={this.handleStart} id={data.roomId && data.roomId.roomKey ? data.roomId.roomKey : "#"} title={role == Roles.Student ? this.props.intlData.messages.join_class : role == Roles.Instructor || role == Roles.Lmsadmin ? this.props.intlData.messages.start_class : this.props.intlData.messages.start_conference}>
                <div className={cls_imgcontrol}>
                  <img src="/images/white-icons/white-join-conference.png" />
                </div>
                <p><FormattedMessage id = 'start'/></p>
              </button>
            </li>
          </ul>
        );
      }else{
        return;
      }
    } else {
      return;
    }
  }

  handleStartTimeChange = (newTime) => {
    moment(newTime, "x").isValid() ? 
    this.setState({startTime : moment(newTime, "x").format('x')})
    :
    this.setState({startTime : false});
  }

  handleHours = (event) => {
    this.setState({ hours : event.target.value});
  }

  handleMinutes = (event) => {
    this.setState({ minutes : event.target.value}); 
  }

  handleUpdate () {

  }
 
  render () {
    let self = this;
    // console.log("data in render === ", this.props.FullCalendarEventsData.data);
    const dragHandlers = {onStart: this.onStart.bind(this), onStop: this.onStop.bind(this)};
    let cls_mixStream = `${dashboard_styles.mixStream} ${dashboard_styles.hideObject}`;
    if(this.state.mixStream){
      cls_mixStream = `${dashboard_styles.mixStream}`;
    }
    let data = this.state.data;
    const mins = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
    const hrs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    let cls_calendarInlineBlock = `${Confstyles.calendarInlineBlock} clearfix`;
    
    return (
      <div>
        <div id="calendar" className={styles.calendarRender}> </div>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="calendar_container"
          className="toast-top-right"
        />
        <Modal show={this.state.showEditSlot} onHide={this.showOrHideEditScheduler}>
          <Header closeButton>
            <Title className={styles.popHeadingAll} >
              {this.props.intlData.create_edit_class}
            </Title>
          </Header>
          <Body>
            <div className={Confstyles.meetingDetails}>
              <div className={Confstyles.meetingInfoBlock}>
                <form>
                  <div className={cls_calendarInlineBlock}>
                    <ul className="clearfix">
                      <li style={{width : "40%"}}>
                        <p><FormattedMessage id = 'set_start_time'/></p>
                        <div className={Confstyles.dateTimePickerBlock} id="startTime">
                          <DateTimeField mode="time" onChange={this.handleStartTimeChange} dateTime={this.state.startTime}/>
                        </div>
                      </li>
                      <li style={{width : "30%"}}>
                        <p><FormattedMessage id = 'set_hours'/></p>
                        <div className={Confstyles.dateTimePickerBlock}>
                          <select className="form-control" onChange={this.handleHours} defaultValue={this.state.hours}>
                            {hrs.map( value => {
                              return <option value={value} key={value}>{value} hrs</option>
                            })}
                          </select>
                        </div>
                      </li>
                      <li style={{width : "30%"}}>
                        <p><FormattedMessage id = 'set_minutes'/></p>
                        <div className={Confstyles.dateTimePickerBlock}>
                          <select className="form-control" onChange={this.handleMinutes} defaultValue={this.state.minutes}>
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
            <label>{this.state.error}</label>
            <button className="btn btn-success btn-icon btn-sm" onClick={this.handleUpdate.bind(this)}><FormattedMessage id = 'save'/></button>
          </Footer>
        </Modal>
        <Modal
          show={this.state.editshow}
          onHide={this.closeEdit}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title" className={styles.popHeadingAll} >Edit Current Day / Recurring</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Do you want to Edit Current day (or) recurring schedule?
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.editCurrentDay}>Current</Button>
            <Button onClick={this.editRecurring}>Recurring</Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={this.state.deleteshow}
          onHide={this.closeDelete}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title" className={styles.popHeadingAll} >Delete Current Day / Recurring</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Do you want to delete Current day (or) recurring schedule?
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.deleteCurrentDay}>Current</Button>
            <Button onClick={this.deleteRecurring}>Recurring</Button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.showEvent} onHide={this.showOrHideEvent}>
          <Header closeButton>
            <Title className={styles.popHeadingAll} >
              {this.props.intlData.room}
            </Title>
          </Header>
          <Body>
            <div>
              <p>Meeting Name :: {data && data.meetingName ? data.meetingName : ''}</p>
              <p>Room Name :: {data && data.roomId ? data.roomId.roomName : ''}</p>
              <p>Date :: {data && data.dates ? moment(data.dates.startTime, 'x').format('DD/MM/YYYY') : ''}</p>
              <p>Start Time :: {data && data.dates ? moment(data.dates.startTime, 'x').format('hh:mm A') : ''}</p>
              <p>End Time :: {data && data.dates ? moment(data.dates.endTime, 'x').format('hh:mm A') : ''}</p>
              <p>Organizer :: {data && data.createdBy ? data.createdBy.firstname : ''}</p>
            </div>
          </Body>
          <Footer>
            {this.scheduleOptions()}
          </Footer>
        </Modal>
        { this.props.loggedInData.data.role != Roles.Student
          ?
          <Draggable handle=".handle" {...dragHandlers}>
            <div className={cls_mixStream} title={this.props.intlData.messages.drag}>
              <video className="handle" id="objMixVideo" autoPlay></video>
              <span className={dashboard_styles.videoBackButton} onClick={this.navigateBack.bind(this)} title={this.props.intlData.messages.back}>
                <img src="/images/white-icons/white-expand.png" />
              </span>
            </div>
          </Draggable>
          : null
        }
        <Scheduler showModal={this.state.showScheduler} calenderDate={this.state.selectedDate}
          hidecallback={this.showOrHideScheduler.bind(this)} saveSchedule={this.createSchedule.bind(this)} 
          scheduleData={this.state.data} errorStatus={this.state.errorStatus} role={this.props.loggedInData.data.role}/>
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    FullCalendarEventsData: FullCalendarEventsData(state),
    loggedInData: loggedInData(state),
    intlData: intlData(state),
  };
}

FullCalendar.propTypes = {
  FullCalendarEventsData: PropTypes.object,
  loggedInData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  // intl: PropTypes.object,
  // confObject: PropTypes.object,
};

FullCalendar.contextTypes = {
  router: React.PropTypes.object,
  // intl: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps)(FullCalendar);























// https://stackoverflow.com/questions/41981994/force-update-jquery-fullcalendar-after-prop-change-in-react-js

 






// import React, { PropTypes, Component } from 'react';
// // import $ from 'jquery';
// import moment from 'moment';

// class Calendar extends React.Component {

//   componentDidMount() {
//     $('#calendar').fullCalendar({
//       header: {
//         left: 'prev,next today',
//         center: 'title',
//         right: 'month,agendaWeek,agendaDay'
//       },
//       editable: true,
//       droppable: true,
//       drop: function() {
//         if ($('#drop-remove').is(':checked')) {
//           $(this).remove();
//         }
//       }
//     })
//   }

//   render() {
//     return (<div id="calendar"></div>);
//   }  
// }

// export default Calendar;
