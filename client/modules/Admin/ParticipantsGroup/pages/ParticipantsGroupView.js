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
import { getGroupStudents, deleteStudentGroup, deleteStudentInGroup, saveGroupName } from '../ParticipantsGroupActions';
import { groupData } from '../ParticipantsGroupReducer';

/*import { getRoomLocations, ClearRoom, deleteRoomLocation,deleteRoomLocationParticipant } from '../RoomActions';
*/import FontAwesome from 'react-fontawesome';
// import { roomData } from '../RoomReducer';
import style from '../../Admin.css';
import TopMenu from '../../../../components/TopMenu';
import SubMenu from '../../../../components/SubMenu';
import styles from '../../../../components/component.css';
import { participantsSubMenu, viewParticipantsMainMenu} from '../schema/ParticipantsGroupMenu';

import {Col, Row, Grid} from 'react-bootstrap';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import EditGroupName from '../components/EditGroupName';
import AddMoreParticipants from '../components/AddMoreParticipants';
import { Roles } from '../../../../roles.js';
var _ = require('lodash');
import Loading from '../../../App/components/Loading';
import dataStyle from '../../../../components/DataTable/DataTable.css'

class ListRoomLocation extends Component {
  constructor(props){
    super(props);
    this.state={
      uid : '',
      showAddGroup : false,
      showAddParticipants : false,
      loading : true,
      searchVal : ''
    }
    this.role = false;
    this.mainmenu = viewParticipantsMainMenu;
    // this.mainmenu.menus[0].action = this.ParticipantsGroupList.bind(this);    
    this.submenu = Validator.activeSubMenu(participantsSubMenu, "lnkparticipantsResult");
    
  }

  componentDidMount() {
    this.setdata(this.props.loggedInData);
  }

  // componentWillReceiveProps(nextProps) {
  //   if(nextProps.groupData.success != ''){
  //     let uid = this.props.loggedInData.data._id;
  //     let id = this.props.params.gid;
  //     this.props.dispatch(getGroupStudents({uid,id})).then((result) => {
  //       if(result){
  //         this.refs.room_container.success(`${nextProps.roomData.success} `, ``);             
  //       }
  //     })      
  //   }
  // }


  setdata(result){
    if (result && result.data && result.data._id) {
      //this.props.dispatch(loginLanguage(result.data, this.props.intlData.setlocale));
      let id = this.props.params.gid;
      this.setState({uid : result.data._id});
      let obj = {        
        id : id
      };

      // Change By - Najib, Desc - Calling setLoading in promise to set state after receiving response from server
    if(_.isEmpty(this.props.groupData.dataList.participants) || id != this.props.groupData.dataList.participants._id) {
      this.setState({loading : true}); 
    } else {        
      this.setState({loading : false});
    }
      this.props.dispatch(getGroupStudents(obj, '/admin/participants-group/view/'+id)).then(res => this.setLoading());
    }
  }

  setLoading() {
    //console.log("At set loading");    
    if(this.state.loading) {
      this.setState({loading : false});  
    }
  }

  ParticipantsGroupEdit = () => {
    browserHistory.push('/admin/participants-group/list');
  }  

  groupDelete() {
    let self = this;
    let props = this.props;
    let id = this.props.params.gid;        
    alertify.confirm(this.props.intl.messages.warning,this.props.intl.messages.delete_group_alert, 
      function (result) {
        if(result) {          
          let obj = {            
            id : id
          }
          props.dispatch(deleteStudentGroup(obj)).then(res=> self.deleteGroupResponse(res));
        }
      },
      function() {

      }
    ).setting('labels',{'ok': this.props.intl.messages.ok,'cancel': this.props.intl.messages.cancel}); ;     
  }

  deleteGroupResponse(res) {
    if(res.status) {
      //this.refs.room_container.success('Deleted Successfully');
      browserHistory.push('/admin/participants-group/list');
    }
  }

  deleteStudent(studentId) {
    ////console.log("studentId",studentId);
    let self = this;
    let props = this.props;
    let id = this.props.params.gid;        
    alertify.confirm(this.props.intl.messages.warning,this.props.intl.messages.delete_participant_alert, 
      function (result) {
        if(result) {          
          let obj = {            
            id : id,
            sid : studentId
          }
          props.dispatch(deleteStudentInGroup(obj)).then(res => self.deleteResponse(res));
        }
      },
      function() {

      }
    ).setting('labels',{'ok': this.props.intl.messages.ok,'cancel': this.props.intl.messages.cancel}); ;     
  }

  deleteResponse(res) {
    this.setState({searchVal : ''});
    if(res.status) {
      this.refs.room_container.success(`${res.message} `, ``);
    }else {
      this.refs.room_container.success(`${res.error} `, ``);
    }
  }

  handleEditModel(e){
    this.setState({showAddGroup: !this.state.showAddGroup});
  }

  saveEditData(obj) {
    //obj['uid'] = this.state.uid;
    obj['id'] = this.props.params.gid;
    this.props.dispatch(saveGroupName(obj)).then(res=> this.resposeData(res));
    ////console.log("edit object", obj);
  }

  resposeData(res) {
    //console.log("res at viw--", res);
    if(res.status) {
      this.setState({showAddGroup: !this.state.showAddGroup});
      this.refs.room_container.success(`${res.message} `, ``);
    } else if(res.error){
      this.refs.room_container.error(`${res.error} `, ``);
    }
  }

  handleAddModel(e) {
    this.setState({showAddParticipants: !this.state.showAddParticipants}); 
  }

  // saveAddData(obj) {
  //   obj['uid'] = this.state.uid;
  //   obj['id'] = this.props.params.gid;
  //   //this.props.dispatch(saveGroupName(obj)).then(res=> this.resposeDara(res));
  //   ////console.log("edit object", obj);
  // }
  responsecallback(res){
    if(res.status) {
      this.setState({showAddParticipants: !this.state.showAddParticipants}); 
      this.refs.room_container.success(`${res.message} `, ``);       
    } else if(res.status == "close") {      
      this.setState({showAddParticipants: !this.state.showAddParticipants}); 
    }
  }

  viewUser(id) {
    browserHistory.push('/profile/'+id)
  }

  searchFilter = (e) => {
    e.preventDefault();
    let id = this.props.params.gid;
    this.setState({searchVal : e.target.value});
    let obj = {        
      id : id,
      searchKeyword : e.target.value
    };
    this.props.dispatch(getGroupStudents(obj, '/admin/participants-group/view/'+id));
  }

  render() {
 
    if( this.props.loggedInData && this.props.loggedInData.data &&this.props.loggedInData.data.role){ 
      let roleObj = _.invert(Roles);
        let role = this.props.loggedInData.data.role;
        
        //this.role = roleObj[role];
        if(role == Roles.Lmsadmin  || role == Roles.Instructor || role == Roles.Presenteradmin || role == Roles.Presenter) {
          this.role = true;          
        }else {
          this.role = false;
        }
      }
    let groupName = null;  
    if(this.props.groupData && this.props.groupData.dataList && this.props.groupData.dataList.groupName) {
      groupName = this.props.groupData.dataList.groupName;
    }  
    //console.log("this.props.groupData -- ", this.props.groupData);
    let cls_container = `${styles.iContainer} ${styles.oContainer} pull-right`;
    let cls_topmenu = `${styles.iTopMenu} ${styles.oTopMenu}`;
    let cls_isubmenu = `${styles.iSubMenu} {styles.oSubMenu}`; 
    let cls_gropListInfoContainer = `${style.gropListInfoHeader} clearfix`;  
    let loadType = 'list';

    return (
      
      <div>
        <div className={cls_container}>
          <ToastContainer
            toastMessageFactory={ToastMessageFactory}
            ref="room_container"
            className="toast-top-right"
          />  
          <div className={cls_topmenu}>
            <h3 className=""><FormattedMessage id='participants_group'/></h3>
              <div className={styles.dynamicBreadCrumb}>
              <ul>
                <li><Link id="allParticipants" to="/admin/participants-group/list"><FormattedMessage id='all_participants_groups'/></Link></li>
                <li>/</li>
                <li>{groupName}</li>
              </ul>
            </div>
            <TopMenu data={this.mainmenu} />
          </div>
          <div className={cls_isubmenu}>
            <SubMenu data={this.submenu} />
          </div> 
          <div className={style.midContainer}>
            <div className={cls_gropListInfoContainer}>
              <div className={style.gropListInfoHeadingTxt}>
                <h3><span>Group Name </span> - <b className={style.gropListName}>{groupName}</b>
                </h3>
              </div>
              { this.role ?
                <div className={style.groupListActionBlock}>
                  <ul className="clearfix">
                    <li id="deleteGroupBtn" onClick = {this.groupDelete.bind(this)} title={this.props.intl.messages.delete_this_group}>
                      <FontAwesome name="trash-o"></FontAwesome>
                    </li>
                    <li id="editGroupBtn" onClick = {this.handleEditModel.bind(this)} title={this.props.intl.messages.edit_group_name}>
                      <FontAwesome name="pencil-square-o"></FontAwesome>
                    </li>
                    <li id="addMemberBtn" onClick = {this.handleAddModel.bind(this)} title={this.props.intl.messages.add_participants_group}>
                      <FontAwesome name="user-plus"></FontAwesome>
                    </li>
                  </ul>
                </div>
              :null }
             
            </div>

            <div className={style.whiteCard}>

            {/*Code added by - Najib, Desc - condition for adding a loader */}
            { this.state.loading?
            <div className={style.mainSpinBlock} >
              <div className={style.innerSpinBlock} >
                <Loading loadType = {loadType}/>
              </div>
            </div> :
              <div>
                
                <Grid fluid={true}>
                  <Row>
                    <Col md={12}>
                      <div className="col-md-2 pull-right col-xs-12">
                        <input id="searchStudent" type="text" value = {this.state.searchVal} className="form-control" placeholder={this.props.intl.messages.search} onChange={this.searchFilter.bind(this)} maxLength={50} />
                      </div>
                      <div className={style.infoTxt}>
                        <p><FormattedMessage id ='title_groupParticipants_details'/>.</p>                      
                      </div>                                        
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <div className={style.locationBlock}>
                        <div className={style.gropListInfoBlock}>
                                     
                          { this.props.groupData && this.props.groupData.dataList && this.props.groupData.dataList.participants != undefined ?
                          <div className={style.gropListInfoBody}>
                            <div className={style.groupUsersList}>
                            {this.props.groupData.dataList.participants.length>0?
                              <div className={style.groupUsersList}>
                                <ul>
                                {this.props.groupData.dataList.participants.map((participantData)=> {
                                  if(participantData.profile && participantData.profile.profileImage!=undefined && participantData.profile.profileImage!='' && participantData.profile.profileImage!=null){
                                  imgSrc = "/uploads/"+participantData.profile.profileImage
                                  } else {
                                    var imgSrc = "/images/profile-pics/defaultStudent.jpg";  
                                  } 
                                  return <li className="clearfix" key={participantData._id}>                            
                                    <Link id="viewUser" className={style.avatarBox}>
                                      <img src= {imgSrc} onClick={this.viewUser.bind(this, participantData._id)} title={this.props.intl.messages.viewprofile}/>
                                    </Link>
                                    <div className={style.avatarNameBlock}>
                                      <h4 id="viewUser" className={style.viewUserCurser} onClick={this.viewUser.bind(this, participantData._id)} title={this.props.intl.messages.viewprofile}>{participantData.firstname} {participantData.lastname}</h4>
                                      <p>{participantData.email}</p>
                                    </div>
                                    { this.role ?
                                    <div id="removeGroupUser" className={style.removeGroupUser} onClick = {this.deleteStudent.bind(this,participantData._id)} title={this.props.intl.messages.remove_participants_from_group}>
                                     <FontAwesome name ='times' />
                                    </div>
                                    :null}
                                  </li>
                                  })}                                
                                </ul>
                                {/*<div className={style.userAction} title={this.props.intl.messages.remove_participants_from_group} >
                                      <img src="/images/icons/red-cross.png" />
                                    </div>*/}
                              </div>
                              :null}
                            </div>
                          </div>
                          : <div className={dataStyle.noDataBox}>          
                              <h2>
                                <FontAwesome name="frown-o" />
                              </h2>
                              <p><FormattedMessage id ="no_data_yet"/></p>
                          </div> } 
                        </div>
                      </div>                          
                    </Col>
                  </Row>
                </Grid>
              </div> }
            </div>
          </div>
        </div> 
        <EditGroupName hidecallback = {this.handleEditModel.bind(this)} showModal={this.state.showAddGroup} value = {groupName} savecallback = {this.saveEditData.bind(this)}/> 
        <AddMoreParticipants hidecallback = {this.handleAddModel.bind(this)} showModal={this.state.showAddParticipants} groupName = {groupName}  participantData = {this.props.groupData} gid = {this.props.params.gid} responsecallback = {this.responsecallback.bind(this)}/>    
      </div>      
              
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    intl: state.intl,
    loggedInData: loggedInData(state),  
    groupData : groupData(state)
  };
}

ListRoomLocation.propTypes = {
  loggedInData: PropTypes.object, 
  groupData : PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

ListRoomLocation.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(ListRoomLocation);

