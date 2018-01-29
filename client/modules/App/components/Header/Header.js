import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';
import AuthClient from '../../../../components/AuthController';
import mainStyle from '../../../../main.css';
import styles from './Header.css';
import { browserHistory } from 'react-router';
import { ClearImage, logoutUser } from '../../../Login/LoginActions';
import WoogeenManager from '../../../Communication/WoogeenManager';
import AnalyticsManager from '../../../Communication/Analytics';
import callApi from '../../../../util/apiCaller';
import { conferenceDetails } from '../../../Communication/ConferenceReducer';
import { loginLanguage } from '../../../Intl/IntlActions';

export function Header(props, context) {
  if(props && props.loggedStatus && props.loggedStatus.status) {
    var loggedIn = props.loggedStatus.status;
  }
  // const loggedIn = props.loggedStatus.status;
  function logOut(e){
    
    let WoogeenObject = new WoogeenManager();
    AnalyticsManager.destroyObj();
    console.log("logout--", WoogeenObject.getConnectionStatus());
    if(WoogeenObject.getConnectionStatus()) {
      alertify.confirm(props.intl.messages.warning,props.intl.messages.logout_confirm_incall, 
        function (result) {
          if(result) {
            // End Call
            if (props.loggedStatus.data.guest) {
              callApi ('delete-guest/'+props.confRoom, 'delete');
            };
            WoogeenObject.endConference();
            store.dispatch(loginLanguage(props.loggedStatus.data, null));
            store.dispatch( ClearImage());
            //store.dispatch( logoutUser()); 
            AuthClient.deleteSession();
            browserHistory.push('/');           
          }
        },
        function() { }
      ).setting('labels', {'ok': props.intl.messages.ok, 'cancel': props.intl.messages.cancel});
    } else {
      if (props.loggedStatus.data.guest) {
        callApi ('delete-guest/'+props.confRoom, 'delete');
      };
      store.dispatch(loginLanguage(props.loggedStatus.data, null));
      store.dispatch(ClearImage());
      //store.dispatch( logoutUser());  
      AuthClient.deleteSession();
      browserHistory.push('/');
    }
  }
  
  
  const languageNodes = props.intl.enabledLanguages.map(
    lang => <li id="lang" key={lang[1]} onClick={() => props.switchLanguage(lang[1])} className={lang[1] === props.intl.locale ? mainStyle.selected : ''}>{lang[0]}</li>
  );
  
  let cls = `${styles.header} ${mainStyle.bgPrimary}`;
  let url = window.location.href;
  let path = url.split('/')[3];
  
  if(loggedIn){
    cls = `${styles.header} ${mainStyle.bgPrimaryDark}`;
  }
  const cls_ln = `${styles.languageSelect}`;
  const cls_mob = `${styles.mobMenu} hidden-lg hidden-md`;
  let cls_Online = `${mainStyle.statusCircle} ${mainStyle.bgOnline}`;
  let cls_Offline = `${mainStyle.statusCircle} ${mainStyle.bgOffline}`;
  let cls_DntDistrub = `${mainStyle.statusCircle} ${mainStyle.bgDntDistrub}`;
  let cls_Away = `${mainStyle.statusCircle} ${mainStyle.bgAway}`;
  let cls_statusCircleOnline = `${mainStyle.statusCircle} ${mainStyle.bgOnline}`;
  let cls_statusCircleAway = `${mainStyle.statusCircle} ${mainStyle.bgAway}`;
  let cls_statusCircleOffline = `${mainStyle.statusCircle} ${mainStyle.bgOffline}`;
  let cls_statusCircleDntDistrub = `${mainStyle.statusCircle} ${mainStyle.bgDntDistrub}`;
  let cls_userNameCap = ` ${mainStyle.userNameCap} hidden-xs hidden-sm `
  
  var cls_popClass = `${mainStyle.infoBlock}`;
  if(props.showPop){
    cls_popClass = `${mainStyle.infoBlock} ${mainStyle.showInfoBlock}`;
  }
  if(props && props.loggedStatus && props.loggedStatus.headerFlag){
    // console.log("Inside conf-------------------");
    cls = `${styles.header} ${styles.conf} ${mainStyle.bgPrimaryDark}`;
  }

  var image = '';
  if(props && props.loggedStatus && props.loggedStatus.data && props.loggedStatus.data.profile && props.loggedStatus.data.profile.profileImage){
    image = "/uploads/"+props.loggedStatus.data.profile.profileImage;
  } else {
    image = "/images/profile-pics/defaultStudent.jpg"
  }

  let cls_imgLogo = path && path !== "dashboard" && path !== "conf" && path !== "broadcast-news" && path !== "full-calendar" ? `${styles.imgLogo}` : `${styles.imgLogo} ${styles.imgLogo_dashboard}`;
  // <FormattedMessage id="switchLanguage" />
  if(loggedIn){
    return (
      <div className={cls}>
        {path && path !== "dashboard" && path !== "conf" && path !== "broadcast-news" && path !== "full-calendar" ? 
          <div id="instaLink" className={cls_mob} onClick={props.toggleLeft}>
            <img src="/images/sub-nav-bars.png" />
          </div>
        : null}
        <div className={cls_imgLogo} >
          { props.isGuest ? 
            <img src="/images/logo/logos.png" />
          : <Link id="dashboard" to="/dashboard">
              <img src="/images/logo/logos.png" />
            </Link>
          }
        </div>
        <div className={cls_ln}>
          {props.isGuest ?
            <div className={mainStyle.modDropDown}>
              <ul>
                <li>
                  <span className="hidden-xs hidden-sm">{props.fullName} &nbsp;</span>
                </li>
              </ul>
            </div>
          :
          <div id="mainDropdown" className={mainStyle.modDropDown} onClick={props.showPopCallback}>
            <div className={cls_popClass}>
              <ul>
                <li>
                  {/*<Link to="/dashboard"><FontAwesome name="tachometer" /> <FormattedMessage id='dashboard' /></Link>*/}
                  <Link id="profile" to="/admin/profile"><FontAwesome name="th" /> <FormattedMessage id='manage' /></Link>
                  <Link id="logout" onClick={logOut}><FontAwesome name="sign-out" /> <FormattedMessage id='logout' /></Link>
                  {/*<a><span className={cls_Online}></span><FormattedMessage id='online' /></a>*/}
                  {/*<Link to="#"><span className={cls_Away}></span><FormattedMessage id='away' /></Link>*/}
                  {/*<a><span className={cls_Offline}></span><FormattedMessage id='offline' /></a>*/}
                  {/*<Link to="#"><span className={cls_DntDistrub}></span><FormattedMessage id='do_not_disturb' /></Link>*/}
                </li>
              </ul>
            </div>
            <ul>
             <li>
              <div className={cls_statusCircleOnline}></div>
               <span className={cls_userNameCap}>{props.fullName} &nbsp;
                <FontAwesome name="angle-down" />
               </span>
               <img src={image}/>
              </li>
            </ul>
          </div>}
        </div>
      </div>
    );
  }else{
    return (<div></div>);
  }
}



Header.contextTypes = {
  router: React.PropTypes.object,
};

Header.propTypes = {
  loggedStatus: PropTypes.object,
  toggleLeft: PropTypes.func,
  switchLanguage: PropTypes.func.isRequired,
  showPopCallback: PropTypes.func,
  showPop: PropTypes.bool,
  intl: PropTypes.object.isRequired,
};



export default Header;
