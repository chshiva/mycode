import React, { PropTypes,Component } from 'react';
import { Link } from 'react-router';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';
import AuthClient from '../../../components/AuthController';
import mainStyle from '../../../main.css';
import { toggleLeftMenu } from '../../App/AppActions';
//import adminStyles from '../Admin.css';
import { loggedInData } from '../../Login/LoginReducer';
import styles from './LeftMenu.css';
import { connect } from 'react-redux';
import { Roles } from '../../../roles';
import { browserHistory } from 'react-router';
import { ClearImage } from '../../Login/LoginActions';
import WoogeenManager from '../../Communication/WoogeenManager';
import callApi from '../../../util/apiCaller';

export class LeftMenu extends Component {
  
  constructor(props) {
    super(props);
    this.clsContainerBlock = `${styles.containerBlock} ${mainStyle.bgPrimaryDarkA} pull-left`;
    this.clsBlockLeftHeader = `${styles.blockLeftHeader} ${mainStyle.bgPrimaryDarkB}`;
    this.clsIconBox = `${styles.iconBox}`;
    this.clsHeading = `${styles.heading}`;
    this.WoogeenObject = new WoogeenManager();
    this.state = {
      value : '',
      activeLink : 'profile'
    }
  }

  // logOut = () => {
  //   // console.log("logout--", this.WoogeenObject.getConnectionStatus());
  //   if(this.WoogeenObject.getConnectionStatus()) {
  //     let that = this;
  //     alertify.confirm(this.props.intl.messages.warning,this.props.intl.messages.logout_confirm_incall, 
  //       function (result) {
  //         if(result) {
  //           if (that.props.loggedInData.data.guest) {
  //             callApi ('delete-guest/'+that.props.confRoom, 'delete');
  //           };
  //           AuthClient.deleteSession();
  //           browserHistory.push('/');
  //         }
  //       },
  //       function() { }
  //     ).setting('labels', {'ok': this.props.intl.messages.ok, 'cancel': this.props.intl.messages.cancel});
  //   } else {
  //     if (this.props.loggedInData.data.guest) {
  //       callApi ('delete-guest/'+this.props.confRoom, 'delete');
  //     };
  //     AuthClient.deleteSession();
  //     browserHistory.push('/');
  //     // End Call
  //     this.WoogeenObject.endConference();
  //     this.props.dispatch( ClearImage());

  //   }
  // }

  componentwillmount() {
    console.log("In will mount");
  } 

  componentDidMount() {
    this.setdata(this.props.loggedInData);
  }

  setdata(res){ 

    //Code changed by-Najib, Desc - Highlight left navigation links when clicked
    let urlLink = location.pathname;
    //console.log("At componet did mount, urlLink", urlLink);
    
    // let profilePatrn = '/admin/profile';
    // let corporatePatrn = '/admin/corporate';
    // let usersPatrn = '/admin/users';
    // let packagePatrn = '/admin/package';
    // let roomPatrn = '/admin/room';
    // let categoryPatrn = '/admin/category';
    // let participantsPatrn = '/admin/participants-group';
    // let questionnairePatrn = '/admin/questionnaire';
    // let settingsPatrn = '/admin/settings';
    // let ldapsettingsPatrn = '/admin/ldapsettings';
    // let reportsPatrn = '/admin/reports';
    // let coursePatrn = '/course/reports';
    // let courseAttndPatrn = '/course/attendance';
    // let locationPatrn = '/admin/location';

    let profileRegex = new RegExp('/admin/profile');
    let corporateRegex = new RegExp('/admin/corporate');
    let usersRegex = new RegExp('/admin/users');
    let packageRegex = new RegExp('/admin/package');
    let roomRegex = new RegExp('/admin/room');
    let categoryRegex = new RegExp('/admin/category');
    let participantsRegex = new RegExp('/admin/participants-group');
    let questionnaireRegex = new RegExp('/admin/questionnaire');
    let settingsRegex = new RegExp('/admin/settings');
    let ldapsettingsRegex = new RegExp('/admin/ldapsettings');
    let reportsRegex = new RegExp('/admin/reports');
    let attndRegex = new RegExp('/course/reports');
    let courseRegex = new RegExp('/course/attendance');
    let locationRegex = new RegExp('/admin/location');

    if(profileRegex.test(urlLink)){
      this.setState({activeLink : 'profile'})
    }else if(corporateRegex.test(urlLink)){
      this.setState({activeLink : 'corporate'})
    }else if(usersRegex.test(urlLink)){
      this.setState({activeLink : 'users'})
    }else if(packageRegex.test(urlLink)){
      this.setState({activeLink : 'package'})
    }else if(roomRegex.test(urlLink)){
      this.setState({activeLink : 'room'})
    }else if(categoryRegex.test(urlLink)){
      this.setState({activeLink : 'category'})
    }else if(participantsRegex.test(urlLink)){
      this.setState({activeLink : 'participants'})
    }else if(questionnaireRegex.test(urlLink)){
      this.setState({activeLink : 'questionnaire'})
    }else if(settingsRegex.test(urlLink)){
      this.setState({activeLink : 'settings'})
    }else if(ldapsettingsRegex.test(urlLink)){
      this.setState({activeLink : 'ldapsettings'})
    }else if(reportsRegex.test(urlLink)){
      this.setState({activeLink : 'reports'})
    }else if(courseRegex.test(urlLink)  || attndRegex.test(urlLink)){
      this.setState({activeLink : 'course'})
    }else if(locationRegex.test(urlLink)){
      this.setState({activeLink : 'location'})
    } 
    this.setState({value : res.data.role})
  }

  componentWillReceiveProps(nextProp){
    if(nextProp.role){
      this.setState({value: nextProp.role});
    }
    if(!nextProp.isVisible){
      this.clsContainerBlock = `${styles.containerBlock} ${mainStyle.bgPrimaryDarkA} pull-left`;
    }else{
      this.clsContainerBlock = `${styles.containerBlock} ${mainStyle.bgPrimaryDarkA} ${styles.slideIn} pull-left`;
    }
    if(nextProp.urlLink == '/admin/profile') {
      this.setState({activeLink : 'profile'})
    }
  }


  handleLink(e) {
    //console.log("this.props.location.pathname", location.pathname);
    //console.log("e.target.id--", e.target.id);
    this.setState({activeLink : e.currentTarget.id});
  }
  renderMenu(value){
    return (
      <ul id="sideMenu" onClick={this.toggleLeft.bind(this)}>
        <li id ="dashboard">
          <Link to="/dashboard"><FormattedMessage id='dashboard' /></Link>
        </li>
        <li onClick = {this.handleLink.bind(this)} id = "profile">
          <Link  className={this.state.activeLink=='profile'?styles.active:''}  to="/admin/profile"><FormattedMessage id ='my_account'/></Link>
        </li>
        { value == Roles.Superadmin ? <li onClick = {this.handleLink.bind(this)} id = "corporate"> <Link  className={this.state.activeLink=='corporate'?styles.active:''}  to="/admin/corporate/list"><FormattedMessage id ='corporate_directory'/></Link> </li> : null }
        { (value == Roles.Superadmin || value == Roles.Admin || value == Roles.Presenteradmin || value == Roles.Lmsadmin || value == Roles.CRMadmin) ? <li onClick = {this.handleLink.bind(this)} id = "users"> <Link className={this.state.activeLink=='users'?styles.active:''}  to="/admin/users/list"><FormattedMessage id ='manage_user'/></Link> </li>: null}
        { (value == Roles.Superadmin || value == Roles.Admin || value == Roles.Presenteradmin || value == Roles.Lmsadmin || value == Roles.CRMadmin) ? <li onClick = {this.handleLink.bind(this)} id = "package"> <Link className={this.state.activeLink=='package'?styles.active:''}  to="/admin/package/list"><FormattedMessage id ='package_management'/></Link> </li>: null}
        { (value == Roles.Superadmin || value == Roles.Admin || value == Roles.Presenteradmin || value == Roles.Lmsadmin || value == Roles.CRMadmin || value == Roles.Presenter || value == Roles.Instructor || value == Roles.Moderator) ? <li onClick = {this.handleLink.bind(this)} id = "room"> <Link className={this.state.activeLink=='room'?styles.active:''}  to="/admin/room/list"><FormattedMessage id ='room_management'/></Link> </li> : null }
        
        {/* commented because of no functionality, need to implement */
        /* { (value == Roles.Superadmin || value == Roles.Admin || value == Roles.Presenteradmin || value == Roles.Lmsadmin || value == Roles.CRMadmin) ? <li onClick = {this.handleLink.bind(this)} id = "category"> <Link className={this.state.activeLink=='category'?styles.active:''}  to="/admin/category/list"><FormattedMessage id ='category_management'/></Link> </li>: null}*/}
        { (value == Roles.Superadmin || value == Roles.Lmsadmin || value == Roles.Instructor) ? <li onClick = {this.handleLink.bind(this)} id = "participants"><Link className={this.state.activeLink=='participants'?styles.active:''}  to="/admin/participants-group/list"><FormattedMessage id ='participants_group'/></Link></li>: null}
        { (value == Roles.Superadmin || value == Roles.Admin || value == Roles.Presenteradmin || value == Roles.Lmsadmin || value == Roles.Presenter || value == Roles.Instructor || value == Roles.CRMadmin) ? <li onClick = {this.handleLink.bind(this)} id = "questionnaire"> <Link className={this.state.activeLink=='questionnaire'?styles.active:''}  to="/admin/questionnaire/list"><FormattedMessage id ='questionnaire'/></Link> </li>: null}
        
        {/* commented because of no functionality, need to implement */
        /*{ value == Roles.Superadmin ? <li onClick = {this.handleLink.bind(this)} id = "settings"> <Link className={this.state.activeLink=='settings'?styles.active:''}  to="/admin/settings/new"><FormattedMessage id ='smtp_setting'/></Link> </li> : null }
                { value == Roles.Superadmin ? <li onClick = {this.handleLink.bind(this)} id = "ldapsettings"> <Link className={this.state.activeLink=='ldapsettings'?styles.active:''}  to="/admin/ldapsettings"><FormattedMessage id ='ldap_settings'/></Link> </li> : null }        
                { value == Roles.Superadmin ? <li onClick = {this.handleLink.bind(this)} id = "reports"> <Link className={this.state.activeLink=='reports'?styles.active:''}  to="/admin/reports" ><FormattedMessage id ='reports'/></Link> </li> : null }*/}
        { value == Roles.Student ? <li onClick = {this.handleLink.bind(this)} id = "course"> <Link className={this.state.activeLink=='course'?styles.active:''}  to="/course/reports" ><FormattedMessage id ='my_reports'/></Link> </li> : null }
        { /*value == Roles.Admin || value == Roles.Presenteradmin || value == Roles.Lmsadmin ? <li onClick = {this.handleLink.bind(this)} id = "location"> <Link className={this.state.activeLink=='location'?styles.active:''}  to="/admin/location/list" ><FormattedMessage id ='location'/></Link> </li> : null */}
        
        {/*<li>
                  <Link id ="logout" onClick={this.logOut.bind(this)}>
                  <FormattedMessage id ='logout'/>
                  </Link>
                </li>  */}
      </ul>
      );
  }

  toggleLeft(e){
    this.props.dispatch(toggleLeftMenu());
  }

  render () {
    // console.log(" render--this.state.activeLink", this.state.activeLink);
    // console.log(" render--this.state.activeLink", this.state.activeLink);
    return (
      <div className={this.clsContainerBlock}>
        <div className={this.clsBlockLeftHeader}>
          <div className={this.clsIconBox} onClick={this.toggleLeft.bind(this)}>
            <img src="/images/white-icons/white-left-arrow.png" className="hidden-lg hidden-md" />
          </div>
          <h2 className={this.clsHeading}><FormattedMessage id ='settings'/></h2>
        </div>
        <div className={styles.menuItems}>
         {this.renderMenu(this.state.value)}
        </div>
      </div>
    );
  }

}

LeftMenu.contextTypes = {
  router: React.PropTypes.object,
};

LeftMenu.propTypes = {
  intl: PropTypes.object,
  isVisible: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  loggedInData: PropTypes.object, 
};

function mapStateToProps(store) {
  return {
    intl: store.intl,
    loggedInData: store.login
  };
}

export default connect(mapStateToProps)(LeftMenu);

// export default LeftMenu;