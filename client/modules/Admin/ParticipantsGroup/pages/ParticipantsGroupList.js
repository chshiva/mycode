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
import AddParticipantsGroup from '../components/AddParticipantsGroup';

import { listStudentsGroup, clearParticipantsGroup } from '../ParticipantsGroupActions';
import { groupData } from '../ParticipantsGroupReducer';

import DataTable from '../../../../components/DataTable/DataTable';

//import {roomSchema} from '../schema/RoomSchema';
import {participantsSubMenu, participantsMainMenu} from '../schema/ParticipantsGroupMenu';

// Import Style
import styles from '../../Admin.css';
import compstyles from '../../../../components/component.css';
import { loginLanguage } from '../../../Intl/IntlActions';
import {Col, Row, Grid} from 'react-bootstrap';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import { intlData } from '../../../Intl/IntlReducer';

class ParticipantsGroupList extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchValue : '',
      showAddGroup: false,
      loading : true
    }
    
    //this.schema = roomSchema;
    this.res = {};
    this.submenu = Validator.activeSubMenu(participantsSubMenu, "lnkparticipantsResult");
    this.mainmenu = participantsMainMenu;
    this.mainmenu.menus[0].action = this.showOrHideAddGroups.bind(this);
    this.getData = this.getData.bind(this);
    //this.clear = this.clear.bind(this);
    this.currentPage= 1;
    this.itemsPerPage= 5;  
    this.viewParticipants = this.viewParticipants.bind(this);
    //this.mainmenu.menus[0].action = this.clearError.bind(this);
    this.searchFilter = this.searchFilter.bind(this);
  }

  componentWillReceiveProps(nextProps) {
     if(nextProps.groupData.deleteSuccess != ''){
       this.refs.room_container.success(`${nextProps.groupData.deleteSuccess} `, ``);
       this.props.dispatch(clearParticipantsGroup());
     }
  }

  componentWillMount() {
      // this.props.dispatch(isLoggedIn(AuthClient.getSession(), 
      //               '/admin/room/list')).then(res => this.setdata(res));
  }

  componentDidMount() {
    this.setdata(this.props.loggedInData);    
  }

  componentWillUnmount() {
  	this.props.dispatch(clearParticipantsGroup())
  }

  setdata(result){
    if (result && result.data && result.data._id) {
      this.props.dispatch(loginLanguage(result.data, this.props.intlData.setlocale));
      this.getData({
        currentPage  : this.currentPage,
        totalItems   : 0,
        itemsPerPage : this.itemsPerPage
      });
    }
  }

  getData(pageParam){
    //pageParam["uid"] = this.props.loggedInData.data._id; 
    pageParam["searchKeyword"] = this.state.searchValue;
    //console.log("this.props.groupData.dataList", this.props.groupData.dataList);
    // Change By - Najib, Desc - Calling setLoading in promise to set state after receiving response from server
    if(_.isEmpty(this.props.groupData.dataList)) {
      this.setState({loading : true}); 
    } else {         
      this.setState({loading : false});
    } 
    this.props.dispatch(listStudentsGroup(pageParam, pageParam.currentPage)).then(res => this.pageData(res));          
  }

  viewParticipants(row){
  	////console.log("row data", row);
  	var link = "/admin/participants-group/view/"+row._id;
    return (
      <Link id="viewGroup" to={link}><i className="fa fa-eye"></i></Link>
    );
  }

  createdByName(row){
    let createdBy = '';
    if(row && row.createdBy){
      createdBy += row.createdBy.firstname;
      createdBy += row.createdBy.lastname ? (' ' + row.createdBy.lastname) : '';
    }
    return (
      <div>{createdBy} </div>
    );
  }

  groupCount(row) {
    let count = '';
    if(row && row.participants) {
      count = row.participants.length;
    }
    return (
      <div>{count}</div>
    )
  }

  // clearError(){
  //   var response = Validator.freeValue(this.schema);
  //   if(response){
  //     this.props.dispatch(UpdateRoomSchema(response));
  //     browserHistory.push('/admin/room/new');
  //   }
  // }

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

  showOrHideAddGroups(e){
    this.setState({showAddGroup: !this.state.showAddGroup});
  }

  // getData(pageParam){
  //   pageParam["uid"] = this.props.loggedInData.data._id;    
  //   pageParam["searchKeyword"] = this.state.searchValue;
  //   //this.props.dispatch(RoomTopicFileList(pageParam, pageParam.currentPage)).then(res => this.pageData(res));
  // }

  pageData(response){
    ////console.log("pageData---", res);
    if(response.status == false){
      this.refs.room_container.error(`${response.error} `, ``);
    }
    if(this.state.loading) {
      this.setState({loading : false});  
    }
  }

  handleModel(res){
    if(res.status) {
      this.setState({showAddGroup: false}); 
      this.refs.room_container.success(`${res.message} `, ``);  
    } else if(res.status == "close") {
       this.setState({showAddGroup: false});
    } else if(!res.status) {
      this.refs.room_container.success(`${res.error} `, ``);
    }
  }

  showGroupDetails(row){
    var link = "/admin/participants-group/view/"+row._id;
    return (
      <Link id="viewGroup" className = {styles.removeStyle} to={link}><div>{row.groupName} </div></Link>
    );
  }

  render() {
    //console.log("list data----", this.props.groupData.dataList);
   var bredcrumb = (
     <div className={compstyles.dynamicBreadCrumb}>
        <ul>
          <li><FormattedMessage id='you_are_in_participant_group_list_panel'/></li>
        </ul>
      </div>
    )
    var objDisp = [
          { title : <FormattedMessage id='group_name' />, type : "function", callback : this.showGroupDetails }, 
          { title : <FormattedMessage id='created_by' />, type : "function", callback : this.createdByName },
          { title : <FormattedMessage id='user_count' />, type : "function", callback : this.groupCount },
          { title : <FormattedMessage id='view'/>, type : "function", callback : this.viewParticipants }
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
        <DataTable data={this.props.groupData.dataList}
          count={this.props.groupData.count}
          currentPage = {this.props.groupData.currentPage}
          submenu={this.submenu}
          bredCrumb={bredcrumb}
          topmenu={this.mainmenu}
          itemsPerPage={this.itemsPerPage}
          newDataCallback={this.getData}
          dispField={objDisp}
          pageTitle={this.props.intl.messages.participants_group} 
          listDescreption={this.props.intl.messages.participants}
          filter={filter}    
          loading={this.state.loading}   
        />
        <AddParticipantsGroup showModal={this.state.showAddGroup} hidecallback={this.showOrHideAddGroups.bind(this)} callback = {this.handleModel.bind(this)}/>
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    intl: state.intl,
    loggedInData: loggedInData(state),
    groupData: groupData(state),
    intlData: intlData(state)
  };
}

ParticipantsGroupList.propTypes = {
  loggedInData: PropTypes.object,
  groupData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

ParticipantsGroupList.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(ParticipantsGroupList);
