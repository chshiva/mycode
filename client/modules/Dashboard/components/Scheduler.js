import React, { PropTypes,Component } from 'react';
import { Link } from 'react-router';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';
import DateTimeField from 'react-bootstrap-datetimepicker';
import moment from 'moment';
import componentStyles from '../../../components/component.css';

import {Col, Row, Grid, Modal} from 'react-bootstrap';
import {Header, Title, Body, Footer} from 'react-bootstrap/lib/Modal';

import { getMyScheduleRooms } from '../UserDashboard/UserDashboardActions';
import styles from '../../Layouts/DashLayout/components/ConfSettings.css';
import adminStyles from '../../Admin/Admin.css';
import { Roles } from '../../../roles';

export class Scheduler extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: moment().format('DD/MM/YYYY'),
      error : '',
      inputDate : moment().format('x'),
      startTime : moment().format('x'),
      endDate : moment().format('DD/MM/YYYY'),
      no_of_occurence : '',
      type : 'D',
      repeatDuration : 1,
      days : [],
      meetingName : '',
      password : '',
      topic : false,
      roomId : '',
      topicId : '',
      waiting : false,
      recurring : false,
      endsOn : 0,
      repeatBy : 0,
      repeatByDay : null,
      repeatByCount : null,
      hours : '',
      minutes : '',
      topicsList : {},
      rooms : null
    };
    this.form = {};
    this.id = null;
    this.cls_block50_l     = `${styles.block50} pull-left`;
    this.cls_btnSaveEdit = ` ${adminStyles.btnSaveAssign} `;
    this.cls_formControlOverwrite = `${styles.formControlOverwrite} form-control `;
    // this.cls_formControlOverwrite = `${styles.formControlOverwrite} ${adminStyles.inputAllCap} form-control `;
    this.cls_calendarInlineBlock = `${styles.calendarInlineBlock} clearfix`;
    this.cls_endsOnBlock = `${styles.endsOnBlock} clearfix`;
    this.cls_inputGroupAddonOverwrite = `${styles.inputGroupAddonOverwrite} input-group-addon`;
    this.cls_confDatePicker = `${styles.setDueDateOverwrite} set-due-date form-control confDatepicker`;
    this.cls_confTimePicker = `${styles.setDueDateOverwrite} set-due-date form-control confTimeTpicker`;
    this.cls_errcls = `${componentStyles.scheduleerror}`;
    this.topicField = null;
      
  }

  componentDidMount() {
    getMyScheduleRooms().then(res => { 
      this.setState({ rooms : res.data, topicsList : res.topics }); 
    });
  }

  componentWillReceiveProps(nextProps) {
    
    if (nextProps.showModal) {
      getMyScheduleRooms().then(res => { 
        this.setState({ rooms : res.data, topicsList : res.topics }); 
      });
    }
    if(nextProps.scheduleData && nextProps.scheduleData != null && nextProps.errorStatus == false && this.state.waiting == false){
      let topicOptions = null;
      let topics = this.state.topicsList[nextProps.scheduleData.roomId];
      if (topics != false) {
        let values = [['', 'Select Topic']];
        _.each(topics, function(doc){
          values.push([doc._id, doc.topicName]);
        });
        topicOptions = values.map((doc) => {
          return (<option key={doc[0]} value={doc[0]}>{doc[1]}</option>);
        });
      }
      if (nextProps.scheduleData.pattern && nextProps.scheduleData.pattern != '' && nextProps.scheduleData.pattern != 'undefined') {
        let pattern = nextProps.scheduleData.pattern;
        let recurring = pattern.split('#')[0].split('-')[5];
        let res = pattern.substring(8).split("-")[0];
        let d = [];
        for(let j = 0; j < res.length; j++) {
          if (res[j] != ",") {
            d.push(parseInt(res[j]));       
          }
        }
        let obj = {
          recurring : true,
          type : pattern[0],
          repeatDuration : Number(pattern[2]),
          repeatBy : 0,
          days : d
        }
        if (recurring != '_') {
          obj["no_of_occurence"] = recurring;
          obj["endsOn"] = 1;
          this.form["endsOn"] = 1;
          this.form["no_of_occurence"] =  recurring;
          this.form["endDateType"] = 'C';
        } else {
          delete this.form['endDateType'];
          obj["no_of_occurence"] = '';
          obj["endsOn"] = 2;
          this.form["endsOn"] = 2;
          this.form["no_of_occurence"] = '';
        }
        this.setState(obj);
        this.form["repeatBy"] = 0;
        this.form["repeatDuration"] = Number(pattern[2]);
        this.form["type"] = pattern[0];
      }

      let h = Math.floor(Number(nextProps.scheduleData.duration)/60);
      let m = Number(nextProps.scheduleData.duration) - (h * 60);

      this.setState({ 
        date : moment(nextProps.scheduleData.startDate, 'x').format('DD/MM/YYYY'),
        inputDate : moment(nextProps.scheduleData.startDate, 'x'), 
        startTime : moment(nextProps.scheduleData.startDate, 'x').format('x'),
        hours : h,
        minutes : m,
        meetingName : nextProps.scheduleData.meetingName,
        password : (nextProps.scheduleData.password && nextProps.scheduleData.password != 'undefined' ? nextProps.scheduleData.password : ''),
        topicId : nextProps.scheduleData.topicId,
        roomId : nextProps.scheduleData.roomId,
        topic : topicOptions != null ? true : false,
        topicOptions : topicOptions,
        endDate : moment(nextProps.scheduleData.endDate, 'x').format('DD/MM/YYYY'),
        error : ''
      });

      this.form["endDate"] = nextProps.scheduleData.endDate;
      // this.form["_id"] = nextProps.scheduleData._id;
      this.id = nextProps.scheduleData._id;
      this.form["roomId"] = nextProps.scheduleData.roomId;
      this.form["topicId"] = nextProps.scheduleData.topicId;
      this.form["duration"] = nextProps.scheduleData.duration;

    } else if(nextProps.errorStatus != true && this.state.waiting != true){
      // delete this.form["_id"];
      delete this.form["roomId"];
      delete this.form["topicId"];
      let newState = {};
      if(nextProps.calenderDate){
        let now = moment().startOf('day');
        let date = moment(nextProps.calenderDate).endOf('day');
        
        if(+now < +date){
          newState["date"] = moment(nextProps.calenderDate).format('DD/MM/YYYY');
          newState["inputDate"] = nextProps.calenderDate;
          newState["startTime"] = moment().format('x');
        }else{
          newState["date"] = moment().format('DD/MM/YYYY');
          newState["inputDate"] = nextProps.calenderDate;
          newState["startTime"] = moment(nextProps.calenderDate).format('x');
        }
        newState["hours"] = '';
        newState["minutes"] = '';
        newState["roomId"] = '';
        newState["days"] = [];
        newState["repeatDuration"] = 1;
        newState["recurring"] = false;
        newState["no_of_occurence"] = '';
        newState["type"] = 'D';
        // newState["duration"] = 10;
        newState["endsOn"] = 0;
        newState["repeatBy"] = 0;
        newState["repeatByDay"] = null;
        newState["repeatByCount"] = null;
        newState["meetingName"] = '';
        newState["password"] = '';
        newState["error"] = '';
        newState["topicId"] = '';
        newState["topic"] = false;
        newState["endDate"] = moment().format('DD/MM/YYYY');
      }
      this.id = null;
      this.setState(newState);
    } else{
      this.setState({ waiting : false });
    }
  }

  handleNameChange = (e) => {
    this.setState({ meetingName : e.target.value });
  }

  handlePasswordChange = (e) => {
    this.setState({ password : e.target.value });
  }
  

  handleTopicChange = (e) => {
    this.setState({ topicId : e.target.value });
  }

  handleRoomChange = (e) => {
    if(e.target.value != ''){
      let topics = this.state.topicsList[e.target.value];
      if (topics != false) {
        let values = [['', 'Select Topic']];
        _.each(topics, function(doc){
          values.push([doc._id, doc.topicName]);
        });
        let topicOptions = values.map((doc) => {
          return (<option key={doc[0]} value={doc[0]}>{doc[1]}</option>);
        });
        this.setState({ topic : true, topicOptions : topicOptions, topicId : '', roomId : e.target.value});
      } else {
        this.setState({ topic : false, topicOptions : null, topicId : '', roomId : e.target.value});
      }
    }else{
      this.setState({ topic : false, topicOptions : null, topicId : '', roomId : '' });
    }
  }

  handleDateChange = (newDate) => {
    if (moment(newDate, "DD/MM/YYYY").isValid()) {
      let d = moment(newDate, "DD/MM/YYYY").format('x');
      if (this.state.type == 'W') {
        let day = moment(newDate, "DD/MM/YYYY").day();
        this.setState({inputDate : d, days : [day]});
      } else {
        this.setState({inputDate : d});
      }
      if (this.state.type == 'M') {
        this.findWeekDay(d, this.state.repeatBy);
      }
    } else {
      this.setState({inputDate : false});
    }
  }

  handleStartTimeChange = (newTime) => {
    moment(newTime, "x").isValid() ? 
    this.setState({startTime : moment(newTime, "x").format('x')})
    :
    this.setState({startTime : false});
  }

  handleEndTimeChange = (newTime) => {
    moment(newTime, "x").isValid() ?
    this.setState({endTime : moment(newTime, "x").utc().toDate()})
    :
    this.setState({endTime : false});
  }

  handleRepeats = (event) => {
    if (event.target.value == 'W') {
      let day = moment(this.state.inputDate, 'x').day();
      this.setState({ days : [day] });
    } else if (event.target.value == 'M') {
      this.setState({ repeatBy : 0 });
    }
    if (event.target.value != 'W') {
      this.setState({ days : [], type : event.target.value });
    } else if (event.target.value != 'M') {
      this.setState({ repeatBy : null, type : event.target.value});
      this.findWeekDay(this.state.inputDate, 0);
    } else {
      this.setState({ type : event.target.value });
    }
  }
  handleRepeatEvery = (event) => {
    this.setState({ repeatDuration : Number(event.target.value) })
  }

  /*handleDuration = (event) => {
    this.setState({ duration : event.target.value });
  }*/

  handleRecurring = (event) => {
    this.setState({ recurring : !this.state.recurring });
  }

  handleDays = (event) => {
    let val = this.state.days;
    let value = Number(event.target.value);
    let index = _.indexOf(val, value);
    if(index > -1){
      val.splice(index, 1);
    }else{
      val.push(value);
    }
    this.setState({ days: val });
  }

  handleEndson = (event) => {
    let val = Number(event.target.value);
    if (val == 1) {
      this.setState({endsOn : val});
    } else if (val == 2) {
      this.setState({endsOn : val});
    }
  }

  handleEndDate = (newDate) => {
    moment(newDate, "DD/MM/YYYY").isValid() ?
      this.setState({endDate : newDate})
    :
      this.setState({endDate : moment().format("DD/MM/YYYY")});
  }

  handleOccurence = (event) => {
    this.setState({ no_of_occurence : event.target.value});
  }

  findWeekDay = (input, val) => {
    if (val == 0) {
      let d = moment(input, 'x').date();
    } else if (val == 1) {
      let d = moment(input, 'x');
      let t = moment();
        t.date(1).month(d.month()).year(d.year());
      t = t.subtract(t.day(), 'days')
      let st = 0;
      for (let i = t; (i.isSame(moment().year(d.get('year')).month(d.get('month')).date(d.get('date'))) ||i.isBefore(moment().year(d.get('year')).month(d.get('month')).date(d.get('date')))) ; i.add(1, 'days')) {
        if(i.get('month') == d.get('month') && i.day() == d.day()){
          st++;
        } 
      }
      this.setState({repeatByDay : d.day(), repeatByCount : st});      
    }
  }

  handleRepeatBy = (event) => {
    let val = Number(event.target.value);
    this.findWeekDay(this.state.inputDate, val);
    this.setState({ repeatBy : val});
  }

  handleHours = (event) => {
    this.setState({ hours : event.target.value});
  }

  handleMinutes = (event) => {
    this.setState({ minutes : event.target.value}); 
  }

  handleSave () {
    let now = Number(moment().seconds(0).format('x'));
    if(this.state.inputDate == false)
      this.setState({error : <FormattedMessage id='invalid_date' />});
    else if(this.state.startTime == false)
      this.setState({error : <FormattedMessage id='invalid_start_time' />});
    else {
      let inputDate = moment(this.state.inputDate, 'x').endOf('day');
      let sTime = moment(this.state.startTime, 'x');
      let startTime = inputDate.clone();
          startTime.hour(sTime.hour()).minute(sTime.minute()).second(0).format('x');
          inputDate.format('x');
      let h = this.state.hours != '' ? (this.state.hours * 60) : 0;
      let m = this.state.minutes != '' ? this.state.minutes : 0;
      this.form = {
        meetingName : this.state.meetingName,
        roomId : this.state.roomId,
        topicId : this.state.topicId,
        duration : Number(h) + Number(m),
        recurring : this.state.recurring,
        password : this.state.password,
        todayStart : Number(moment(this.state.date, 'DD/MM/YYYY').startOf('day').utc().format('x')),
        todayEnd : Number(moment(this.state.date, 'DD/MM/YYYY').endOf('day').utc().format('x'))
      }

      if (this.id != null) {
        let edit_start_date = moment(this.props.selectedDate).startOf('day');
        edit_start_date.hour(sTime.hour()).minute(sTime.minute()).second(0).utc().format('x');
        this.form['edit_start_date'] = Number(edit_start_date);
        this.form['todayStart'] = Number(moment(this.props.selectedDate).startOf('day').utc().format('x'));
        this.form['todayEnd'] = Number(moment(this.props.selectedDate).endOf('day').utc().format('x'))
      } else {
        delete this.form['edit_start_date'];
      }
      
      //changed by jyothi for mandatory fields to enter meeting name & select room name.
      if(this.state.meetingName == '' && this.state.roomId == '') {
        this.setState({error : null}) 
      } else if(!this.form.meetingName || this.form.meetingName == ""){
        this.refs.meetingName.focus()
        this.setState({error :  'meetingName'});
      } else if(!this.form.roomId || this.form.roomId == ""){
        this.refs.roomId.focus()
        this.setState({error : 'roomId'});
      } else if(/*(this.id != null && this.state.recurring == false && Number(inputDate) < now) ||*/(this.id != null && Number(inputDate) < now) || (this.id == null && Number(inputDate) < now)){
        this.setState({error : <FormattedMessage id='minimum_date' />});
      } else if(/*(this.id != null && this.state.recurring == false && Number(startTime) < now) || */ (this.id == null && Number(startTime) < now)){
        this.setState({error : <FormattedMessage id='start_time_greater' />});
      } else if (this.form.duration == 0) {
        this.setState({error : <FormattedMessage id='select_duration' />});
      } else{
        let startDate = moment(startTime, 'x');
        this.form['startDate'] = Number(moment(startTime, 'x').utc().format('x'));
        this.setState({error : ''});
        if (this.state.recurring == false) {
          let endDate = startDate.clone();
            endDate.add(this.form.duration, 'minutes').utc().format('x'); 
          this.form['endDate'] = Number(endDate);
          this.setState({ waiting : true });
          this.props.saveSchedule(this.form, this.id);
        } else {
          this.form['type'] = this.state.type;
          this.form['repeatDuration'] = this.state.repeatDuration;
          if (this.state.endsOn == 1) {
            delete this.form['endDate'];
            if (this.state.no_of_occurence == '') {
              this.setState({error : <FormattedMessage id='enter_occurence' />});
            } else {
              this.form['endDateType'] = 'C';
              this.form['no_of_occurence'] = Number(this.state.no_of_occurence);
              if (this.state.type == 'W' && this.state.days.length <= 0) {
                this.setState({error : <FormattedMessage id='select_the_days' />});
              } else if (this.state.type == 'W') {
                this.form['repeatOn'] = this.state.days;
                this.setState({ waiting : true });
                this.props.saveSchedule(this.form, this.id);
              } else if (this.state.type == 'M' && this.state.repeatBy == 0) {
                this.form['repeatBy'] = this.state.repeatBy;
                this.setState({ waiting : true });
                this.props.saveSchedule(this.form, this.id);
              } else if (this.state.type == 'M' && this.state.repeatBy == 1){
                this.form['repeatBy'] = this.state.repeatBy;
                this.form['repeatByDay'] = this.state.repeatByDay;
                this.form['repeatByCount'] = this.state.repeatByCount;
                this.setState({ waiting : true });
                this.props.saveSchedule(this.form, this.id);
              } else {
                delete this.form['repeatOn'];
                // console.log("form ==== ", this.form);
                this.setState({ waiting : true });
                this.props.saveSchedule(this.form, this.id);
              }
            }
          } else if (this.state.endsOn == 2) {
            delete this.form['endDateType'];
            delete this.form['no_of_occurence'];
            delete this.form['repeatOn'];
            /*delete this.form['repeatByDay'];
            delete this.form['repeatByCount'];*/
            delete this.form['repeatBy'];

            if (this.state.endDate == false) {
              this.setState({error : <FormattedMessage id='invalid_enddate' />});
            } else {
              let endDate = moment(this.state.endDate, 'DD/MM/YYYY');
                endDate.hour(startDate.hour()).minute(startDate.minute()).second(0);
                endDate.add(this.form.duration, 'minutes');
              this.form['endDate'] = Number(endDate.utc().format('x'));
              if (this.state.type == 'W' && this.state.days.length <= 0) {
                this.setState({error : <FormattedMessage id='select_the_days' />});
              } else if (this.state.type == 'W') {
                this.form['repeatOn'] = this.state.days;
                this.setState({ waiting : true });
                this.props.saveSchedule(this.form, this.id);
              } else if (this.state.type == 'M' && this.state.repeatBy == 0) {
                this.form['repeatBy'] = this.state.repeatBy;
                this.setState({ waiting : true });
                this.props.saveSchedule(this.form, this.id);
              } else if (this.state.type == 'M' && this.state.repeatBy == 1) {
                this.form['repeatBy'] = this.state.repeatBy;
                this.form['repeatByDay'] = this.state.repeatByDay;
                this.form['repeatByCount'] = this.state.repeatByCount;
                this.setState({ waiting : true });
                this.props.saveSchedule(this.form, this.id);
              } else {
                this.setState({ waiting : true });
                // console.log("id ==== ", this.id);
                this.props.saveSchedule(this.form, this.id);
              }
            }
          } else {
            this.setState({error : <FormattedMessage id='select_the_endson' />});
          }
        }
      }
    }
  }


//for schedule
render() { 
    if(this.props.role) {
      var role = this.props.role
    }
    let cls_callpadding1 = `${styles.onCalPadding1} col-sm-3 `;
    let cls_callpadding2 = `${styles.onCalPadding2} col-sm-9 `;
    let cls_colForinput1 = `${styles.colForinput1} col-sm-5 `;
    let cls_colForinput2 = `${styles.colForinput2} col-sm-7 `;

    let cls_schedlHour = `${styles.schedlHour} col-sm-6 `;
    let cls_schedlMins = `${styles.schedlMins} col-sm-6 `;

    const {date} = this.state;
    const mins = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
    const hrs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    const repeats = [
                      { key : 'D', value : 'Daily'},
                      { key : 'W', value : 'Weekly'},
                      { key : 'M', value : 'Monthly'},
                      { key : 'Y', value : 'Yearly'}
                    ];
    const days = [
                    {key : 0, value : 'S', keyvalue : '0Sun'},
                    {key : 1, value : 'M', keyvalue : '1Mon'},
                    {key : 2, value : 'T', keyvalue : '2Tue'},
                    {key : 3, value : 'W', keyvalue : '3Wed'},
                    {key : 4, value : 'T', keyvalue : '4Thu'},
                    {key : 5, value : 'F', keyvalue : '5Fri'},
                    {key : 6, value : 'S', keyvalue : '6Sat'},
                ];
    let repeat_every = [];
    for (let i = 1; i <= 30; i++) {
      repeat_every.push(i);
    }
    let summary = '';
    let d = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let n = ['first', 'second', 'third', 'fourth', 'fifth'];
    if (this.state.type == 'D') {
      summary = 'Summary : ';
      summary += this.state.repeatDuration == 1 ? 'Daily' : ( 'Every ' + this.state.repeatDuration + ' days');
    } else if (this.state.type == 'W') {
      summary = 'Summary : ';
      summary += this.state.repeatDuration == 1 ? 'Weekly' : ( 'Every ' + this.state.repeatDuration + ' weeks');
      summary += ' on';
      for ( let i = 0; i < this.state.days.length; i++) {
        summary += ' ' + d[this.state.days[i]];
      }
    } else if (this.state.type == 'M') {
      summary = 'Summary : ';
      summary += this.state.repeatDuration == 1 ? 'Monthly' : ( 'Every ' + this.state.repeatDuration + ' months');
      summary += this.state.repeatBy == 0 ? (' on day ' + moment(this.state.inputDate, 'x').date()) : (this.state.repeatBy == 1 ? (' on ' + n[this.state.repeatByCount - 1] + ' ' + d[this.state.repeatByDay]) : '');
    } else if (this.state.type == 'Y') {
      summary = 'Summary : ';
      summary += this.state.repeatDuration == 1 ? 'Yearly' : ( 'Every ' + this.state.repeatDuration + ' years');
    }
    summary += (this.state.endsOn == 1 && this.state.no_of_occurence != '') ? 
                          (', ' + this.state.no_of_occurence + ' times') : 
                          (this.state.endsOn == 1 ? 
                            ', 0 times' : 
                            (this.state.endsOn == 2 ? 
                              (', until ' + moment(this.state.endDate, 'DD/MM/YYYY').format('MMM Do YYYY') ) : ''
                            )
                          );

    let roomsList = <option value="">No room</option>
    if(this.state.rooms){
      let docs = this.state.rooms;
      let myRooms = [{ _id : '', name : <FormattedMessage id = 'selectroom'/>}];
      if(docs.length > 0){
        let index = 0;
        docs.map((doc) => {
            myRooms.push({_id : doc._id, name : doc.roomName});
        });
      }
      roomsList = myRooms.map((doc) => {
        return (<option key={doc._id} value={doc._id}>{doc.name}</option>);
      });
    }
    let now = moment();
    let currentdate = this.state.date;

    var inpStyle = {
      "float": "left",
      "marginTop": "2px"
    }
    var spanRecurring = {
      "marginLeft": "8px"
    }
    var onRadioo = {
      "float": "left",
      "marginTop": "2px"
    }

    return (
      <Modal show={this.props.showModal} onHide={this.props.hidecallback}>
        <Header closeButton>
        <Title className={adminStyles.popHeadingAll} >
          {
            role == Roles.Instructor || role == Roles.Lmsadmin
            ?
              <FormattedMessage id = 'create_edit_class'/>
            : <FormattedMessage id = 'create_edit_conference'/>
          }
          </Title>
        </Header>
        <Body>
          <div className={styles.meetingDetails}>
            <div className={styles.meetingInfoBlock}>
              <form>
                <div className="form-group">
                  {/*<label className={styles.mandatoryText}>All the fields are mandatory.</label>*/}
                  <input id="meetingName" type="text" name="meetingName" ref="meetingName" className={this.cls_formControlOverwrite} placeholder={role == Roles.Instructor || role == Roles.Lmsadmin ? this.props.intl.messages.please_enter_class_name : this.props.intl.messages.please_enter_meeting_name} value={this.state.meetingName} onChange={this.handleNameChange} maxLength={30} autoFocus='true' />
                  <small id="meetingError" className={styles.inputError}>
                    {this.state.error == 'meetingName' || this.state.error == null ? <FormattedMessage id='enter_meeting_name' />:null}
                  </small>
                  <select id="roomId" name="roomId" ref="roomId" className={this.cls_formControlOverwrite} defaultValue={ this.state.roomId} onChange={this.handleRoomChange.bind(this)}>
                    {roomsList}
                  </select>
                  <small id="roomIdError" className={styles.inputError}>
                    {this.state.error == 'roomId' || this.state.error == null? <FormattedMessage id='select_room' />:null}
                  </small>
                  {this.state.topic == true ?
                    <select id="topic" key="topic" ref="topic" className={this.cls_formControlOverwrite} value={ this.state.topicId } onChange={this.handleTopicChange.bind(this)}>
                      {this.state.topicOptions}
                    </select> : null
                  }
                  {this.state.topicField}
                </div>
                
                <div className={this.cls_calendarInlineBlock}>
                  <ul className="clearfix">
                    <li className={styles.schedlDate}>
                      <p><FormattedMessage id = 'choose_anavailable_date'/></p>
                      <div id="currentDate" className={styles.dateTimePickerBlock}>                        
                          <DateTimeField
                            dateTime={moment().format('DD/MM/YYYY')}
                            format="DD/MM/YYYY"
                            viewMode="date"
                            mode ="date"
                            inputFormat="DD/MM/YYYY"
                            onChange={this.handleDateChange}
                            minDate={now}
                            defaultText={currentdate}
                          />                        
                      </div>
                    </li>
                    <li className={styles.schedlTime}>
                      <p><FormattedMessage id = 'set_start_time'/></p>
                      <div id="startTime" className={styles.dateTimePickerBlock}>
                        <DateTimeField mode="time" onChange={this.handleStartTimeChange} dateTime={this.state.startTime}/>
                      </div>
                    </li>
                    <li className={styles.schedlDuration}>
                      <p><FormattedMessage id = 'set_duration'/></p>
                      <div className={styles.dateTimePickerBlock}>
                        <div className="form-group">
                          <div className="row">
                            <div className={cls_schedlHour}>
                              <select id="schedlHour" className="form-control" onChange={this.handleHours} defaultValue={this.state.hours}>
                                {hrs.map( value => {
                                  return <option value={value} key={value}>{value} hrs</option>
                                })}
                              </select>
                            </div>
                            <div className={cls_schedlMins}>
                              <select id="schedMinits" className="form-control" onChange={this.handleMinutes} defaultValue={this.state.minutes}>
                                {mins.map( value => {
                                  return <option value={value} key={value}>{value} mins</option>
                                })}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="form-group">
                  <input id="recuringCheckbox" style={inpStyle} type="checkbox" ref="recurring" onChange={this.handleRecurring} value="true" checked={this.state.recurring} /> <span style={spanRecurring}> {this.props.intl.messages.recurring_schedule} </span>
                </div>
                { 
                  this.state.recurring == true ?
                    <div style={{clear : "both"}}>
                      <div className={this.cls_calendarInlineBlock}>
                        <ul className="clearfix">
                          <li className={styles.repeatsList1}>
                            <p ><FormattedMessage id = 'repeats'/></p>
                              <div className={styles.dateTimePickerBlock}>
                                <select id="repeat" className="form-control" onChange={this.handleRepeats} defaultValue={this.state.type}>
                                  {repeats.map( option => {
                                    return <option value={option.key} key={option.key}>{option.value}</option>
                                  })}
                                </select>
                              </div>
                          </li>
                          <li className={styles.repeatsList2}>
                            <p><FormattedMessage id = 'repeat_every'/></p>
                              <div id="repeatEvery" className={styles.dateTimePickerBlock} onChange={this.handleRepeatEvery}>
                                <select id="repeatDuration" className="form-control" defaultValue={this.state.repeatDuration}>
                                  {repeat_every.map( value => {
                                    return <option value={value} key={value}>{value} {this.state.type == "D" ? "days" : (this.state.type == "W" ? "weeks" : (this.state.type == "M" ? "months" : (this.state.type == "Y" ? "years" : "")))}</option>
                                  })}
                                </select>
                              </div>
                          </li>
                        </ul>
                      </div>
                      {this.state.type == 'W' ?
                        <div className={this.cls_endsOnBlock}>
                          <p><FormattedMessage id ='repeat_on'/></p>
                          <ul className="clearfix">
                            {days.map( day => {
                              return (
                                <li key={day.keyvalue}>
                                  <div className="form-group">
                                    <div className="col-sm-12">
                                      <input id="daysCheckbox" type="checkbox" name="days" value={day.key} onChange={this.handleDays} checked={_.indexOf(this.state.days, day.key ) > -1 ? true : false}/> {day.value}
                                    </div>
                                  </div>
                                </li>
                              )
                            })}
                          </ul>
                        </div>
                      : (this.state.type == 'M' ?
                          <div className={this.cls_endsOnBlock}>
                            <p>Repeat By</p>
                            <ul className="clearfix">
                              <li>
                                <div className="form-group">
                                  <div className="col-sm-12">
                                    <input id="monthType0" type="radio" name="monthtype" value="0" onChange={this.handleRepeatBy} checked={this.state.repeatBy == 0 ? true : false}/> day of the month
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div className="form-group">
                                  <div className="col-sm-12">
                                    <input id="monthType1" type="radio" name="monthtype" value="1" onChange={this.handleRepeatBy} checked={this.state.repeatBy == 1 ? true : false}/> day of the week
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        :null)
                      }

                      <div className={this.cls_endsOnBlock}>
                        <p className={styles.endOnPara}><FormattedMessage id='ends_on'/></p>
                        <ul className="clearfix">
                          <li>
                            <div className="form-group">
                              <div className={cls_colForinput1}>
                                <input id="endsOn1" style={{ float: "left" }} type="radio" value="1" name="ends_on" onChange={this.handleEndson} checked={this.state.endsOn == 1 ? true : false} /><span style={{ "marginLeft": "4px" }}><FormattedMessage id='after'/></span> <span style={{ "marginLeft": "8px" }}><input type="text" style={{ width: "30px" }} value={this.state.no_of_occurence} onChange={this.handleOccurence} disabled={this.state.endsOn == 1 ? false : true} maxLength={3}/><span style={{"marginLeft" : "4px"}}><FormattedMessage id='occurences'/></span></span>
                              </div>
                              <div className={cls_colForinput2}>
                                <div className={cls_callpadding1}>
                                  <span className={styles.onSpan} ><input id="endsOn2" style={onRadioo} type="radio" value="2" name="ends_on" onChange={this.handleEndson} checked={this.state.endsOn == 2 ? true : false}/><span style={{"marginLeft" : "4px"}}><FormattedMessage id='On'/></span> </span>
                                </div>
                                <div id="endDate" className={cls_callpadding2}>
                                  <DateTimeField
                                    dateTime={date}
                                    format="DD/MM/YYYY"
                                    viewMode="date"
                                    mode ="date"
                                    inputFormat="DD/MM/YYYY"
                                    onChange={this.handleEndDate}
                                    minDate={now}
                                    defaultText={this.state.endDate}
                                  />
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <p style={{textAlign: "center", fontWeight : '600'}}>{summary}</p>
                      </div>
                    </div>
                  : null
                }
              </form>
            </div>
          </div>
          {/* Change by Rajesh Commenting these for removing ConfPassword */}
          <div className={styles.setConfPassword}>
            <h2>
              {
                role == Roles.Instructor || role == Roles.Lmsadmin
                ?
                  <FormattedMessage id = 'set_class_password'/>
                : <FormattedMessage id = 'set_conference_password'/>
              }
            </h2>
            <div className={styles.iconBlock}>
              <img src="/images/black-icons/black-lock.png" />
            </div>
            <div className={styles.passWordBlock}>
              <div>
                <input id="password" type="password" name="password" ref="password" value={this.state.password} onChange={this.handlePasswordChange} maxLength={30}/>
              </div>
            </div>
          </div>
        </Body>
        <Footer className={adminStyles.mainSaveAssign}>
          <div className={adminStyles.errorSaveAssign}>
            <label id="error" className={this.cls_errcls}>
            {this.state.error != '' && this.state.error != 'meetingName' && this.state.error != 'roomId'
            ?
            this.state.error
            :null
            }
            </label>
          </div>
          <div className={adminStyles.blockSaveAssign} >
            <button id="cancel" onClick={this.props.hidecallback} ><FormattedMessage id = 'cancel'/></button>
            <button id="saveBtn" className={this.cls_btnSaveEdit} onClick={this.handleSave.bind(this)}><FormattedMessage id = 'save'/></button>
          </div>
        </Footer>
      </Modal>
    );
  }

}

Scheduler.contextTypes = {
  router: React.PropTypes.object,
  intl: React.PropTypes.object.isRequired
};

Scheduler.propTypes = {
  intl: PropTypes.object,
  showModal: PropTypes.bool,
  hidecallback: PropTypes.func,
  saveSchadule: PropTypes.func,
};

Scheduler.defaultProps = { showModal: false };

export default injectIntl(Scheduler);

/*<select className="form-control" onChange={this.handleDuration} defaultValue={this.state.duration}>
                          {duration.map( value => {
                            return <option value={value} key={value}>{value} mins</option>
                          })}
                        </select>*/