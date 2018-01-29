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

import { studentCourseList, RoomStore, UpdateRoomSchema, ClearRoom } from '../RoomActions';
import { roomData } from '../RoomReducer';

import DataTable from '../../../../components/DataTable/DataTable';

import {roomSchema} from '../schema/RoomSchema';
import {roomMainMenu, roomSubMenu, roomEditMainMenu} from '../schema/RoomMenu';

// Import Style
import styles from '../../Admin.css';
import { loginLanguage } from '../../../Intl/IntlActions';
import {Col, Row, Grid} from 'react-bootstrap';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import { intlData } from '../../../Intl/IntlReducer';

class StudentListRoom extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchValue : '',
    }
    
    this.schema = roomSchema;
    this.res = {};

    this.submenu = Validator.activeSubMenu(roomSubMenu, "lnkRoom");   
    this.mainmenu = roomMainMenu;
    this.getData = this.getData.bind(this);
    //this.clear = this.clear.bind(this);
    this.currentPage= 1;
    this.itemsPerPage= 5;
  
    this.viewRoom = this.viewRoom.bind(this);
    this.mainmenu.menus[0].action = this.clearError.bind(this);
    this.searchFilter = this.searchFilter.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.roomData.deleteSuccess != ''){
      this.refs.room_container.success(`${nextProps.roomData.deleteSuccess} `, ``);
      this.props.dispatch(ClearRoom());
    }
  }

  componentDidMount() {
    this.setdata(this.props.loggedInData);    
  }

  setdata(result){
    if (result && result.data && result.data._id) {
      this.props.dispatch(loginLanguage(result.data, this.props.intlData.setlocale));
      this.props.dispatch(RoomStore({uid: result.data._id }));
      this.getData({
        currentPage  : this.currentPage,
        totalItems   : 0,
        itemsPerPage : this.itemsPerPage
      });
    }
  }

  getData(pageParam) {       
    pageParam["searchKeyword"] = this.state.searchValue;
    this.props.dispatch(studentCourseList(pageParam, pageParam.currentPage)).then(res => this.pageData(res));
  }

  pageData(response){
    if(response.status == false){
      this.refs.room_container.error(`${response.error} `, ``);
    }
  }

  viewRoom(row){
    var link = "/admin/room/view/"+row._id;
    //console.log("link === ",link)
    return (
      <Link to={link}><i className="fa fa-eye"></i></Link>
    );
  }

  clearError(){
    var response = Validator.freeValue(this.schema);
    if(response){
      this.props.dispatch(UpdateRoomSchema(response));
      browserHistory.push('/admin/room/new');
    }
  }

  searchFilter(e){
    e.preventDefault();
    var expVal = e.target.value.trim();
    var pattern = new RegExp(/[+*()?\\]/);
    if(!pattern.test(expVal)){
      this.state.searchValue = e.target.value.trim();
      this.getData({
        currentPage  : this.currentPage,
        totalItems   : 0,
        itemsPerPage : this.itemsPerPage
      });
    }    
  }

  pageData(response){
    //console.log("pageData---", res);
    if(response.status == false){
      this.refs.room_container.error(`${response.error} `, ``);
    }
  }

  showRoomName(row){
    var link = "/admin/room/view/"+row._id;
    return (
      <Link className={styles.removeStyle} to={link}><div>{row.roomName} </div></Link>
    );
  }

  render() {
    var objDisp = [
          { title : <FormattedMessage id='room_name' />, type : "function", callback :this.showRoomName },
          { fieldName : "roomType", title : <FormattedMessage id='room_type' />, type : "text" },
          { title : <FormattedMessage id='view' />, type : "function", callback : this.viewRoom }
        ];

    var filter = [
      {type : 'search', selectedfilter : this.searchFilter }
    ]    

    return (
      <div>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="room_container"
          className="toast-top-right"
        />
        <DataTable data={this.props.roomData.dataList}
            count={this.props.roomData.count}
            currentPage = {this.props.roomData.currentPage}
            submenu={this.submenu}
            topmenu={this.mainmenu}
            itemsPerPage={this.itemsPerPage}
            newDataCallback={this.getData}
            dispField={objDisp}
            pageTitle={this.props.intl.messages.room_management} 
            listDescreption={this.props.intl.messages.rooms}
            filter={filter}
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
    roomData: roomData(state),
    intlData: intlData(state)
  };
}

StudentListRoom.propTypes = {
  loggedInData: PropTypes.object,
  roomData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

StudentListRoom.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(StudentListRoom);
