import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';

import AuthClient from '../../../../components/AuthController';
import DataObject from '../../../../components/DataObject';
import { isLoggedIn } from '../../../Login/LoginActions';
import { loggedInData } from '../../../Login/LoginReducer';
import Validator from '../../../../components/Validator';

import { SaveRoom, RoomStore, UpdateRoomSchema, ClearRoom } from '../RoomActions';
import { roomData } from '../RoomReducer';

import ContainerComponent from '../../../../components/ContainerComponent';

import {roomSchema} from '../schema/RoomSchema';
import {roomNewSubMenu, roomNewMainMenu} from '../schema/RoomMenu';

// Import Style
import styles from '../../Admin.css';
import compstyles from '../../../../components/component.css';
import {Col, Row, Grid} from 'react-bootstrap';
import  {ToastContainer, ToastMessage} from '../../../../lib';
import { loginLanguage } from '../../../Intl/IntlActions';
import { intlData } from '../../../Intl/IntlReducer';
import { Roles } from '../../../../roles';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
var moment = require('moment');
var dataObject = {};

class CreateRoom extends Component {
  constructor(props){
    super(props);
    this.form = null;
    this.datareceive = this.datareceive.bind(this);
    
    this.schema = roomSchema;
    this.res = {};
    // this.state.schema = this.schema;

    this.submenu = Validator.activeSubMenu(roomNewSubMenu, "lnkNewRoom");     
    this.mainmenu = roomNewMainMenu;

    this.mainmenu.menus[1].action = this.save.bind(this);//this.save.bind(this);
    this.state = {
      role : -1,
      activeIcon : null
    };
  }

  // componentWillMount() {
  //     this.props.dispatch(isLoggedIn(AuthClient.getSession(), 
  //                   '/admin/room/new')).then(res => this.setdata(res));
  // }

  componentDidMount() {
    this.setdata(this.props.loggedInData);    
  }

  setdata(result){
    if (result && result.data && result.data._id) {
      this.props.dispatch(loginLanguage(result.data, this.props.intlData.setlocale));
      this.props.dispatch(UpdateRoomSchema(this.schema));
      this.props.dispatch(RoomStore({uid: result.data._id }));
      this.setState({ role : result.data.role });
    }
  }

// Changed by jyothi for showing validation for expiry date
  save = (event) => {
    // console.log("this.form === ", this.form);
    if (this.form.expiryDate == "") {
      this.form['expiryDate'] = moment().endOf('day').utc().toDate();
    }
    var response = Validator.validate(this.form, this.schema, this.state.role,this.context.intl);
    if(response.error.length > 0){
      this.schema = response.schema;
      this.props.dispatch(UpdateRoomSchema(this.schema));
      //console.log("error in response ===  ",response);
    }else{
      this.setState({ activeIcon : event.currentTarget.id});
      this.form['expiryDate'] = moment(this.form['expiryDate']).endOf('day').utc().toDate();
      this.props.dispatch(SaveRoom(this.form)).then(res => this.setresponse(res));
    }
  }

  setresponse = (response) => {
    if(response.status){
      browserHistory.push('/admin/room/adduser/'+response.data._id);
      // this.refs.room_container.success(`${response.message} `, ``);
    }else{
      this.setState({ activeIcon : null});
      let errMsg = "";
      errMsg = response.error.toString();

      //Code changed By - Najib, Based on corporate type, relevent error message is shown
      if(this.state.role == Roles.Lmsadmin || this.state.role == Roles.Instructor || this.state.role == Roles.Student) {
        let ShowErrMsg = '';
        let RegEx = new RegExp('Room', 'g');
        ShowErrMsg = errMsg.replace(RegEx, 'Course');        
        this.refs.room_container.error(`${ShowErrMsg} `, ``);
      } else {
        this.refs.room_container.error(`${errMsg} `, ``); 
      }      
    }
  }

  datareceive(data) {
    this.form = data;
  }

  render() {
    var bredcrumb = (
    <div className={compstyles.dynamicBreadCrumb}>
      <ul>
        <li> 
          <Link to="/admin/room/list"><FormattedMessage id = 'all_rooms'/></Link>
        </li>
        <li>/</li>
        <li><FormattedMessage id = 'new_room'/></li>
      </ul>
    </div>)
    if(this.props.roomData && this.props.roomData.data){
        dataObject = this.props.roomData.data;
    }
    return (
      <div>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="room_container"
          className="toast-top-right"
        />
        <ContainerComponent  data={this.props.roomData.schema}
          submenu={this.submenu}
          topmenu={this.mainmenu}
          bredCrumb={bredcrumb}
          dataFun = {this.datareceive}
          dataobject = {this.props.roomData.data}
          activeIcon = {this.state.activeIcon}
       />
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    loggedInData: loggedInData(state),
    roomData: roomData(state),
    intlData: intlData(state)
  };
}

CreateRoom.propTypes = {
  loggedInData: PropTypes.object,
  roomData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

CreateRoom.contextTypes = {
  router: React.PropTypes.object,
  intl: React.PropTypes.object.isRequired
};


export default connect(mapStateToProps)(CreateRoom);
