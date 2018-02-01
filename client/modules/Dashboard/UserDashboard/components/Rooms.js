import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';
import RoomOptions from './RoomOptions';
import CarouselRoomsList from './CarouselRoomsList';


import {Col, Row, Grid, Carousel} from 'react-bootstrap';
import {Item} from 'react-bootstrap/lib/Carousel';
import styles from '../../Dashboard.css';
import adminStyles from '../../../Admin/Admin.css';
import confStyles from '../../../Layouts/DashLayout/components/ConfSettings.css';
let moment = require('moment');
var _ = require('lodash');
import { Roles } from '../../../../roles';
import { dashboardData } from '../UserDashboardReducer';
import { searchMyRooms, setMyRooms, getMyRooms } from '../UserDashboardActions';
import { setWorkDashboard } from './WorkDashboardActions';
import { intlData } from '../../../Intl/IntlReducer';
import { browserHistory } from 'react-router';
import Loading from '../../../App/components/Loading';

export class Rooms extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchcss :  `${styles.searchBox}`,
      value : '',
      currentId : '',
      roomRefresh : false,
    }
  }

  updateRooms(response){
    if(response){
      this.props.getSchedules();
      this.props.dispatch(setMyRooms(response));
    }
  }

  getnewRooms(){
    this.setState({roomRefresh : true});
    this.props.dispatch(getMyRooms()).then(res => {
      this.setState({roomRefresh : false})
    });
  }

  showOrhideSearchbox(){
    if(this.state.searchcss == `${styles.searchBox} ${styles.showSearchBox}`){
      this.setState({ searchcss : `${styles.searchBox}`, value : ''});
      this.props.dispatch(searchMyRooms(''));

    }else{
      this.setState({ searchcss : `${styles.searchBox} ${styles.showSearchBox}` });
    }
  }

  showValidity = (expdate) => {
    let ipdate = moment(expdate);
    let now = moment();
    if(+ipdate < +now){
      return <span>{this.props.intlData.messages.valid_untill} : <strong className={styles.expired}>Expired</strong></span>;
    }else {
      return <span>{this.props.intlData.messages.valid_untill} : <strong>{ipdate.format("MMM Do YYYY")}</strong></span>;
    } 
  }

  startConference = (e) => {
    let roomKey = e.currentTarget.id;
    // this.props.dispatch(setWorkDashboard({ current : "roomchat" }));
    browserHistory.push(roomKey);
  }

  handleChange(e){
    this.props.dispatch(searchMyRooms(e.target.value));
    this.setState({ currentId : '', value : e.target.value});
  }

  showRoomOptions(e) {
    let id = e.currentTarget.id;
    this.setState({ currentId : id });
  }

  handleAssignment = (key) => {
    this.props.dispatch(setWorkDashboard({ current : "assignmentList" }));
    // let link = '/' + key;
    browserHistory.push(key);
  }

  render(){
    let cls_roomInfoBlk = `${styles.modRoomInfoBlock} clearfix`;
    let cls_roomLinkHide = `${styles.roomLinkBlock} ${styles.roomLinkBlockHide}`;
    let cls_roomLinkBlock = `${styles.roomLinkBlock}`;
    let cls_contactContainer = `${confStyles.contactContainer} clearfix`;

    let myRooms = <div className={confStyles.modNoContacts}>
                    <div className={confStyles.noContactsCircle}>
                      <img src="/images/black-icons/black-manage-room.png" />
                    </div>
                    <h2>{this.props.intlData.messages.no_rooms}</h2>
                    {this.props.userData && (this.props.userData.role == Roles.Superadmin || this.props.userData.role == Roles.Admin ||this.props.userData.role == Roles.Lmsadmin ||this.props.userData.role == Roles.CRMadmin || this.props.userData.role == Roles.Presenteradmin)?
                      <div className={styles.createBlock}>
                        <Link id="createNewRoom" to="admin/room/new" title={this.props.intlData.messages.create_new_room}>{this.props.intlData.messages.create_a_room} <FontAwesome name="angle-double-right" />
                        </Link>
                      </div>
                      : null}
                </div>;
    if (this.props.dashboardData && this.props.dashboardData.myrooms && this.props.dashboardData.myrooms.length > 0) {
      let index = 0;
      let background_color_active = { "backgroundColor" : "#eee" };
      let background_color = { "backgroundColor" : "#fff" }
      myRooms = this.props.dashboardData.myrooms.map((doc) => {
          index++;
          return (<li key={doc._id} style={index == 1 && this.state.currentId == '' ? background_color_active : (this.state.currentId == doc._id ? background_color_active : background_color)}>
            { !this.props.getConnection ?
              <div className={styles.roomListactionBlock} id={doc.roomKey} onClick={this.startConference}>
                <span className={styles.roomListactionStart} 
                      title={this.props.userData && this.props.userData.role == Roles.Student ? this.props.intlData.messages.join_class : ( this.props.userData && (this.props.userData.role == Roles.Instructor || this.props.userData.role == Roles.Lmsadmin) ? this.props.intlData.messages.start_class : this.props.intlData.messages.start_conference)} 
                      >
                  <FormattedMessage id='join' />
                </span>
              </div>
            : null}
            <Link className="clearfix" id={doc._id} onClick={this.showRoomOptions.bind(this)}>
              <div className={cls_contactContainer}>
                <div className={confStyles.avatarBox}>
                  <img src='/images/profile-pics/default-group.jpg' />
                </div>
                <div className={confStyles.contactInfoBox}>
                  <h3>{doc.roomName}.
                    <p><span className="hidden-xs">{doc.corporateId ? (doc.corporateId.businessType == 'Conference' || doc.corporateId.businessType == 'CRM' ?  this.props.intlData.messages.conference_mode  : this.props.intlData.messages.presenter_mode) : this.props.intlData.messages.presenter_mode}</span> {doc.expiryDate != null ? this.showValidity(doc.expiryDate) : null}</p>
                  </h3>
                </div>
              </div>
            </Link>
            <div className={index == 1 && this.state.currentId == '' ? cls_roomLinkBlock : ( this.state.currentId == doc._id ? cls_roomLinkBlock : cls_roomLinkHide)}>
              <RoomOptions getNewRooms={this.updateRooms.bind(this)} roomData={doc} userId={ this.props.userData ? this.props.userData._id : null } role={this.props.userData ? this.props.userData.role : -1} handleAssignment={this.handleAssignment} invite={this.props.showInviteBox}/>
            </div>
          </li>)
        });
    }
    return (
      <div className={styles.tableBox}>
        <div className={styles.modCardHeader}>
          <div className={this.state.searchcss}>
            <div className="clearfix">
              <input id="search" type="search" style={{'display' : 'none'}}/>
              <input id="search" type="search" className={styles.searchInput} placeholder={this.props.intlData.messages.search_rooms} onChange={this.handleChange.bind(this)} value={this.state.value} maxLength={50} autoFocus='true' />
              <div id="closeSearchInput" className={styles.closeSearchInput} onClick={this.showOrhideSearchbox.bind(this)}>
                <FontAwesome name="times" />
              </div>
            </div>
          </div>
          <h2><span>{this.props.intlData.messages.my_rooms}</span></h2>
          <div className={styles.modRoomControls}>
            <ul>
              <li className="hidden-xs">
                <Link id="newRooms" onClick = {this.getnewRooms.bind(this)} > 
                <img src="/images/black-icons/black-regenerate.png" className = {this.state.roomRefresh == true ? styles.spinAnimation :null } title={this.props.intlData.messages.refresh_rooms} /> 
                </Link>
              </li>
              <li><Link id="showOrhideSearchbox" onClick={this.showOrhideSearchbox.bind(this)}>
                <img src="/images/black-icons/black-search.png" title={this.props.intlData.messages.search_room}/>
                </Link>
              </li> 
            </ul>
          </div>
        </div>
        <div className={styles.modCardBody}>
          <div className={confStyles.modAsideListBody}>
            <div className={confStyles.modContactList}>
            {this.props.dashboardData && this.props.dashboardData.myrooms != null ?
              <ul>
                {myRooms}
              </ul>
            : <div className={adminStyles.mainSpinBlock} >
              <div className={adminStyles.innerSpinBlock} >
                <Loading loadType = "list"/>
              </div>
            </div>}
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
    dashboardData: dashboardData(state),
    intlData : intlData(state)
  };
}

Rooms.propTypes = {
  dashboardData: PropTypes.object,
  userData : PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

Rooms.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(Rooms);
