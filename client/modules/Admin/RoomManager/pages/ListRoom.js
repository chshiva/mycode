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

import { RoomList, RoomStore, UpdateRoomSchema, ClearRoom } from '../RoomActions';
import { roomData } from '../RoomReducer';

import DataTable from '../../../../components/DataTable/DataTable';

import {roomSchema} from '../schema/RoomSchema';
import {roomMainMenu, roomSubMenu, roomEditMainMenu} from '../schema/RoomMenu';
import { Roles } from '../../../../roles.js';
import Loading from '../../../App/components/Loading';
// Import Style
import styles from '../../Admin.css';
import compstyles from '../../../../components/component.css';

import { loginLanguage } from '../../../Intl/IntlActions';
import {Col, Row, Grid} from 'react-bootstrap';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import { intlData } from '../../../Intl/IntlReducer';
var _ = require('lodash');

class ListRoom extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchValue : '',
      loading : true
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

  // shouldComponentUpdate() {
  //   if(this.state.loading==false) {
  //     return false
  //   } else {
  //     return true
  //   }
  // }

  //componentWillMount() {
      // this.props.dispatch(isLoggedIn(AuthClient.getSession(), 
      //               '/admin/room/list')).then(res => this.setdata(res));
  //}

  componentDidMount() {
    this.setdata(this.props.loggedInData);    
  }

  setdata(result){
    if (result && result.data && result.data._id) {
      this.props.dispatch(loginLanguage(result.data, this.props.intlData.setlocale));
      //this.props.dispatch(RoomStore({uid: result.data._id }));
      this.getData({
        currentPage  : this.currentPage,
        totalItems   : 0,
        itemsPerPage : this.itemsPerPage
      });
    }
  }

  getData(pageParam, sort = null){
    
    // pageParam["uid"] = this.props.loggedInData.data._id; 
    if(sort != null)
    pageParam['sortObj'] = sort;    
    pageParam["searchKeyword"] = this.state.searchValue;
    
    // Change By - Najib, Desc - Calling setLoading in promise to set state after receiving response from server    
    if(_.isEmpty(this.props.roomData.dataList)) {
      this.setState({loading : true}); 
    } else {        
      this.setState({loading : false});
    }
    this.props.dispatch(RoomList(pageParam, pageParam.currentPage)).then(res => this.pageData(res));
  }

  pageData(response){
    // console.log(" Page data");
    //console.log("pageData---", res);
    
    if(response.status == false){
      this.refs.room_container.error(`${response.error} `, ``);
    }
    if(this.state.loading) {
      this.setState({loading : false});  
    }
  }  

  packageName(row){
    if (row.selPackage && row.selPackage.packageName) {
      return(
          <div>{row.selPackage.packageName}</div>
        );
    }
  }

  corporateName(row){
    if (row.corporateId && row.corporateId.businessName) {
      return(
          <div>{row.corporateId.businessName}</div>
        );
    }
  }

  viewRoom(row){
    var link = "/admin/room/view/"+row._id;
    //console.log("link === ",link)
    return (
      <Link id="viewRoom" to={link}><i className="fa fa-eye"></i></Link>
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

  // getData(pageParam){
  //   pageParam["uid"] = this.props.loggedInData.data._id;    
  //   pageParam["searchKeyword"] = this.state.searchValue;
  //   //this.props.dispatch(RoomTopicFileList(pageParam, pageParam.currentPage)).then(res => this.pageData(res));
  // }

  showRoomName(row){
    var link = "/admin/room/view/"+row._id;
    return (
      <Link className={styles.removeStyle} to={link}><div>{row.roomName} </div></Link>
    );
  }

  showReports = (row) => {
    let roleId = this.props.loggedInData.data.role;
    if( Roles.Lmsadmin == roleId || Roles.Instructor == roleId) {
      var link = "/admin/room/attendance/"+row._id;
      return (
        <Link id="viewReports" to={link}><i className="fa fa-pie-chart"></i></Link>
      );
    }
  }

  render() {
    var bredcrumb = (
      <div className={compstyles.dynamicBreadCrumb}>
        <ul>
          <li><FormattedMessage id='you_are_in_room_list_panel'/></li>
        </ul>
      </div>
      )
    let loggedInData = this.props.loggedInData;
    if(loggedInData && loggedInData.data && loggedInData.data.profile && loggedInData.data.profile.companyid && loggedInData.data.profile.companyid.businessType && loggedInData.data.profile.companyid.businessType == 'LMS') {
      var objDisp = [
            { title : <FormattedMessage id='room_name' />, type : "function", callback :this.showRoomName, sort :true, dbName : "roomName" },
            { fieldName : "roomType", title : <FormattedMessage id='room_type' />, type : "text", sort : true, dbName : "roomType" },
            { title : <FormattedMessage id='package_name' />, type : "function", callback: this.packageName },
            { title : <FormattedMessage id='corporate_name' />, type : "function", callback : this.corporateName },
            { title : <FormattedMessage id='view' />, type : "function", callback : this.viewRoom },
            { title : <FormattedMessage id='reports' />, type : "function", callback : this.showReports.bind(this) },
          ];
      var filter = [
        {type : 'search', id:'roomSearch', selectedfilter : this.searchFilter }
      ]   
    } else {
      var objDisp = [
              { title : <FormattedMessage id='room_name' />, type : "function", callback :this.showRoomName, sort :true, dbName : "roomName" },
              { fieldName : "roomType", title : <FormattedMessage id='room_type' />, type : "text", sort : true, dbName : "roomType" },
              { title : <FormattedMessage id='package_name' />, type : "function", callback: this.packageName },
              { title : <FormattedMessage id='corporate_name' />, type : "function", callback : this.corporateName },
              { title : <FormattedMessage id='view' />, type : "function", callback : this.viewRoom }
            ];
        var filter = [
          {type : 'search', id:'roomSearch', selectedfilter : this.searchFilter }
      ] 
    }
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
            bredCrumb={bredcrumb}
            topmenu={this.mainmenu}
            itemsPerPage={this.itemsPerPage}
            newDataCallback={this.getData}
            dispField={objDisp}
            pageTitle={this.props.intl.messages.room_management} 
            listDescreption={this.props.intl.messages.rooms}
            filter={filter}
            loading = {this.state.loading}
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

ListRoom.propTypes = {
  loggedInData: PropTypes.object,
  roomData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

ListRoom.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(ListRoom);
