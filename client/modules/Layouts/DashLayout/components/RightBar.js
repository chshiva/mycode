import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import {Col, Row} from 'react-bootstrap';

import styles from './RightBar.css';
import { Roles } from '../../../../roles.js';
import WoogeenManager from '../../../Communication/WoogeenManager';
import { rightBar } from '../RightBarReducer';
import { loggedInData } from '../../../Login/LoginReducer';
import { setHeaderFlag } from '../../../Login/LoginActions';


export function RightBar(props, context) {  
  let btmVerticalNav = `${styles.btmVerticalNav} hidden-xs hidden-sm`;
  let presenterActive = '';
  let conferenceActive = '';
  let teleActive = '';
  let cls_hideShow = `${styles.mobSlide} hidden-lg hidden-md`;

  let rightNave = `${styles.navRightFixed}`;
  if (props && props.headerFlag) {
    // console.log("Inside conf nav-------------------");
    rightNave = `${styles.confNavMobile}`;
  };
  
  let rightNave_css = {};
  if(props.conferenceDetails.confStatus > 0 && props.menuData.arrow){
    // rightNave = `${styles.navRightFixed} ${styles.hide}`;
    rightNave_css = {
      transition: "all 0.4s ease",
      height : "106px !important"
    };
  }

  if(props.loggedInData && props.loggedInData.showHeaderFlag && props.conferenceDetails.confStatus == 2){
    // console.log("Inside conf layout-------TRUE------------", props.loggedInData.showHeaderFlag);
    rightNave = `${styles.navRightFixed} ${styles.show}`;
    // setTimeout(function(){
    //   console.log("1234567890---------------------------------")
    //   props.dispatch(setHeaderFlag(true, false));
    //   // rightNave = `${styles.navRightFixed} ${styles.hide}`;
    // }, 2500);
  } else if(props.loggedInData && !props.loggedInData.showHeaderFlag && props.conferenceDetails.confStatus == 2){
    // console.log("Inside conf layout---------FALSE----------", props.loggedInData.showHeaderFlag);
    rightNave = `${styles.navRightFixed} ${styles.hide}`;
  }

  if(props.conferenceDetails.confStatus == 1 && props.conferenceDetails.confData && props.conferenceDetails.confData.businessType=='LMS') {
    presenterActive = `${styles.active}`;
    conferenceActive = '';
  } else if (props.conferenceDetails.confStatus == 2 && props.conferenceDetails.confData.businessType=='Conference') {
    presenterActive = '';
    conferenceActive = `${styles.active}`;
  } else if(props.conferenceDetails.confStatus == 1){
    presenterActive = `${styles.active}`;
    conferenceActive = '';
    teleActive = '';
  }else if(props.conferenceDetails.confStatus == 2){
    presenterActive = '';
    conferenceActive = `${styles.active}`;
    teleActive = '';
  }else if(props.conferenceDetails.confStatus == 3){
    presenterActive = '';
    conferenceActive = '';
    teleActive = `${styles.active}`;
  }  


  function handleMenu(event) {
    //console.log("handleMEnu", event.currentTarget);
    let obj = {
      current : event.currentTarget.id
    }
    if(obj.current=="contacts") {         
      obj['indChatCount'] = null;    
      props.handleMenu(obj); 
    } else if (obj.current=="settings") {
      props.handleMenu(obj);
    } else if (obj.current=="broadcast") {
      obj['newsCount'] = null;
      obj['current'] = null;
      props.handleMenu(obj);
    } else {
      props.handleMenu({ current : null });
    }        
  }
  
  let WoogeenObject = new WoogeenManager();

  let ul_css = `${styles.presenterAdjust} clearfix`;
  // let ul_css = props.conferenceDetails.confStatus == 1 ? `${styles.presenterAdjust} clearfix` : `clearfix` ;
  let noConference = false;
  if (props.conferenceDetails.confStatus == 1 && props.conferenceDetails.confData && props.conferenceDetails.confData.enableLive != true ) {
    ul_css = `clearfix`;
    noConference = true;
  } else if ((props.role == Roles.Student || props.role == Roles.Attendee) && props.conferenceDetails.confStatus == 1 && props.conferenceDetails.confData && props.conferenceDetails.confData.haveSchedule != true) {
    ul_css = `clearfix`;
    noConference = true;
  } else if (props.conferenceDetails.confStatus == 1) {
    ul_css = `clearfix`;
    noConference = true;
  } else if (!WoogeenObject.getConnectionStatus()) {
    ul_css = `clearfix`;
    noConference = true;
  }

  function startRecord(event){
    console.log('start recording')
    WoogeenObject.recordConference();
    props.setrecording(true)
  }

  function stopRecord(event){
    console.log('stop recording')
    WoogeenObject.stopRecord();
    props.setrecording(false)
  }


  // console.log("props.menuData.current", props.menuData.current);
  // console.log(" confStatus === ", props.conferenceDetails.confStatus);
  let route = location.pathname.split('/');
  let pathname = route[1];

  if(!WoogeenObject.getConnectionStatus() && props.isRecording)
    props.setrecording(false)
  return (
    <div className={rightNave} style={rightNave_css}>
      <div className={styles.modVerticalNav}>
        <ul className={ul_css}>
          <li id="dashboard" onClick={handleMenu}>
            <Link title={props.intl.messages.dashboard} className={location.pathname=="/dashboard"?props.rightBar.current==null?styles.active:'':''} to="/dashboard">
              <img src="/images/white-icons/white-dashboard.png" />
            </Link>
          </li>      
          <li id="contacts" onClick={handleMenu}>
            <Link title={props.intl.messages.my_contacts} className={props.rightBar.current=="contacts"?styles.active:''} >
              <img src="/images/white-icons/my-contacts-white.png" />
              {props.menuData.current != 'contacts' && props.individualCount > 0 ? <span className={styles.chatNotification}> {props.individualCount} </span>: null}
            </Link>

          </li>
          {/*{props.loggedInData && props.loggedInData.data && props.loggedInData.data.profile && props.loggedInData.data.profile.companyid && props.loggedInData.data.profile.companyid.businessType == 'LMS'
                      ?*/}
          {props.broadCast ?
            <li id="broadcast" onClick={handleMenu}>
              <Link title={props.intl.messages.broadcast} className={location.pathname == "/broadcast-news" ? props.rightBar.current == null ? styles.active : '' : ''} to="/broadcast-news">
                <img src="/images/white-icons/white-news-feed.png" />
                {location.pathname!="/broadcast-news" && props.broadcastCount > 0 ? <span className={styles.chatNotification}> {props.broadcastCount} </span>: null}
              </Link>
            </li>
            : null}
           {/* : null
                     }*/}
         { /*<li id="groups" onClick={handleMenu}>
                     <Link title={props.intl.messages.my_groups} onClick={props.myGroups}>
                       <img src="/images/white-icons/white-group.png" />
                     </Link>
                   </li>*/}
          <li id="settings" onClick={handleMenu}>
            <Link title={props.intl.messages.settings} className={props.rightBar.current=="settings"?styles.active:''}>
              <img src="/images/white-icons/white-settings.png" />
            </Link>
          </li>
					{props.fullCalendar ?
	          <li id="fullcalender" onClick={handleMenu}>
	            <Link title={props.intl.messages.fullcalender} className={location.pathname=="/full-calendar"?props.rightBar.current==null?styles.active:'':''} to="/full-calendar">
	              <img src="/images/white-icons/white-calendar.png" />
	            </Link>
	          </li>
          : null}
          {WoogeenObject.getConnectionStatus() && (pathname != 'conf' || props.conferenceDetails.confStatus == 2) ?
            <li id="openRoomChat" className="hidden-lg hidden-md">
              <Link title={props.intl.messages.room_chat} onClick={props.setRoomChat.bind(this)}>
                {props.roomChatCount > 0 ? <span className={styles.chatNotiConf}>{props.roomChatCount}</span> : null}
                <img src="/images/white-icons/white-chat.png" />
              </Link>
            </li>
          : null}
          {WoogeenObject.getConnectionStatus() ?
	          <li id="openPresenter" className="hidden-lg hidden-md" onClick={props.setLayoutStatus.bind(this, 1)}>
	            <Link title={props.intl.messages.presenter} className={presenterActive}>
	              <img src="/images/white-icons/presenter-whtie.png" />
	            </Link>
	          </li>
	        : null}
          {WoogeenObject.getConnectionStatus() && props.conferenceDetails && props.conferenceDetails.confData && props.conferenceDetails.confData.packageData && props.conferenceDetails.confData.packageData.features.indexOf("Video Conference") != -1 && props.role != Roles.Student ?
           <li id="openConference" className="hidden-lg hidden-md" onClick={props.setLayoutStatus.bind(this, 2)}>
              <Link title={props.intl.messages.conference} id="openMyGroups" className={conferenceActive}>
                <img src="/images/white-icons/conference-white.png" />
              </Link>
            </li>
          : null}
          {/*{props.role != Roles.Student && props.role != Roles.Attendee && props.conferenceDetails && props.conferenceDetails.confData && props.conferenceDetails.confData.packageData && props.conferenceDetails.confData.packageData.features.indexOf("TelePresence") != -1 ?
            <li id="openTelePresence"  className="hidden-lg hidden-md" onClick={props.setLayoutStatus.bind(this, 3)}>
              <Link title={props.intl.messages.telepresence} className={teleActive}>
                <img src="/images/white-icons/telepresence-white.png" />
              </Link>
            </li>
          : null}*/}
          {WoogeenObject.getConnectionStatus() && props.conferenceDetails && props.conferenceDetails.imHost == true && props.conferenceDetails.confData && props.conferenceDetails.confData.packageData && props.conferenceDetails.confData.packageData.features.indexOf("Server Recording") != -1 && props.isRecording == false?
            <li id="btnRecord" className="hidden-lg hidden-md" onClick={startRecord}>
              <Link title={props.intl.messages.record}>
                <img src="/images/white-icons/white-recording.png" />
              </Link>
            </li>
          : null}
            
          {/*<li id="openSettingOptions" className="hidden-lg hidden-md">
                      <Link title={props.intl.messages.expand_contract}>
                        <img src="/images/white-icons/white-expand.png" />
                      </Link>
                    </li>*/}
        </ul>
      </div>
      <div className={btmVerticalNav}>
        <ul className="clearfix">
          {WoogeenObject.getConnectionStatus() && (pathname != 'conf' || props.conferenceDetails.confStatus == 2) ?      
          <li id="openRoomChat">
            <Link title={props.intl.messages.room_chat} onClick={props.setRoomChat.bind(this)}>
              {props.roomChatCount > 0 ? <span className={styles.chatNotiConf}>{props.roomChatCount}</span> : null}
              <img src="/images/white-icons/white-chat.png" />
            </Link>
          </li>
          : null }
        	{WoogeenObject.getConnectionStatus() ?      
          <li id="openPresenter" onClick={props.setLayoutStatus.bind(this, 1)}>
            <Link title={props.intl.messages.presenter} className={presenterActive}>
              <img src="/images/white-icons/presenter-whtie.png" />
            </Link>
          </li>
          : null }
          {WoogeenObject.getConnectionStatus() && props.conferenceDetails && props.conferenceDetails.confData && props.conferenceDetails.confData.packageData && props.conferenceDetails.confData.packageData.features.indexOf("Video Conference") != -1 && props.role != Roles.Student ?
            <li id="openConference" onClick={props.setLayoutStatus.bind(this, 2)}>
              <Link title={props.intl.messages.conference} id="openMyGroups" className={conferenceActive}>
                <img src="/images/white-icons/conference-white.png" />
              </Link>
            </li>
          : null}
          {/*{props.role != Roles.Student && props.role != Roles.Attendee && props.conferenceDetails && props.conferenceDetails.confData && props.conferenceDetails.confData.packageData && props.conferenceDetails.confData.packageData.features.indexOf("TelePresence") != -1 ?
            <li id="openTelePresence" onClick={props.setLayoutStatus.bind(this, 3)}>
              <Link title={props.intl.messages.telepresence} className={teleActive}>
                <img src="/images/white-icons/telepresence-white.png" />
              </Link>
            </li>
          : null}*/}
          {WoogeenObject.getConnectionStatus() && props.conferenceDetails && props.conferenceDetails.imHost == true && props.conferenceDetails.confData && props.conferenceDetails.confData.packageData && props.conferenceDetails.confData.packageData.features.indexOf("Server Recording") != -1 && props.isRecording == false?
            <li id="btnRecord" onClick={startRecord}>
              <Link title={props.intl.messages.record}>
                <img src="/images/white-icons/white-recording.png" />
              </Link>
            </li>
            : null}


          {WoogeenObject.getConnectionStatus() && props.conferenceDetails && props.conferenceDetails.imHost == true && props.conferenceDetails.confData && props.conferenceDetails.confData.packageData && props.conferenceDetails.confData.packageData.features.indexOf("Server Recording") != -1 && props.isRecording?
            <li id="btnRecord" onClick={stopRecord}>
              <Link title={props.intl.messages.record}>
                <img src="/images/white-icons/red-stop.png" />
              </Link>
            </li>
            : null}
          
          {/*<li id="openSettingOptions">
                      <Link title={props.intl.messages.expand_contract}>
                        <img src="/images/white-icons/white-expand.png" />
                      </Link>
                    </li>*/}
        </ul>
      </div>
      { WoogeenObject.getConnectionStatus() && props.conferenceDetails.confStatus != 2 ?
        <div className={cls_hideShow}>
          <ul>
            <li>
              <Link id="hideShow" onClick={props.handleArrow}>
                {props.menuData.arrow ?
                  <img src="/images/white-icons/white-list-items.png"/>
                :  <img src="/images/white-icons/white-presenter-conference.png"/>
                }
              </Link>
            </li>
          </ul>
        </div>
      : null}
    </div>
  );
}


// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    loggedInData : loggedInData(store),
    rightBar : rightBar(store)
  };
}

RightBar.contextTypes = {
  router: React.PropTypes.object,
};


RightBar.propTypes = {
  conferenceDetails: PropTypes.object,
  setLayoutStatus: PropTypes.func,
  myGroups: PropTypes.func,
  menuData: PropTypes.object,
  intl: PropTypes.object,
  // dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(RightBar);

