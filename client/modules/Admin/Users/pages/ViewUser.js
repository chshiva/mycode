import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import AuthClient from '../../../../components/AuthController.js';
import { isLoggedIn } from '../../../Login/LoginActions';
import { viewUser, UpdateUserSchema, ClearUser, DeleteUser, ActivateUser } from '../UsersActions'
import { userData } from '../UsersReducer';
import Validator from '../../../../components/Validator';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';

import { loggedInData } from '../../../Login/LoginReducer';
import {ViewUserContainer} from '../components/ViewUserContainer';
import SubMenu from '../../../../components/SubMenu';
import TopMenu from '../../../../components/TopMenu';
import { userViewSubMenu, userViewMainMenu, inActiveUserViewMainMenu, guestUserViewMainMenu } from '../schema/UserMenu';
import styles from '../../../../components/component.css';
import { browserHistory } from 'react-router';
import { viewUserSchema } from '../schema/UserSchema';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import { loginLanguage } from '../../../Intl/IntlActions';
import { intlData } from '../../../Intl/IntlReducer';

class ViewUserComponent extends Component {

  constructor(props) {
     super(props);    
        this.state = {loading  : true};
       this.mainmenu = userViewMainMenu; 
       this.inactiveMainMenu =  inActiveUserViewMainMenu;
       this.guestMainMenu = guestUserViewMainMenu;

       this.mainmenu.menus[0].action = this.clearError.bind(this); 
       this.mainmenu.menus[1].action = this.viewprofile.bind(this); 
       this.mainmenu.menus[3].action = this.edit.bind(this);
       this.mainmenu.menus[4].action = this.delete.bind(this);
       
       this.inactiveMainMenu.menus[1].action = this.viewprofile.bind(this);    
       this.inactiveMainMenu.menus[3].action = this.activate.bind(this);

       
       this.SubMenu = userViewSubMenu    
       this.schema = viewUserSchema;
       this.userId = this.props.params.rowId;
 
  }

  // componentWillMount() {
  //  this.props.dispatch(isLoggedIn(AuthClient.getSession())).then(res =>{
  //    if(res.status) {
  //      var viewUserId = this.props.params.rowId;
  //      this.props.dispatch(viewUser(viewUserId)).then(res => this.setresponse(res));
  //    }
  //  });
  // }

  componentWillReceiveProps(nextProps) {
    if(nextProps.userData.success != ''){
      this.refs.user_container.success(`${nextProps.userData.success} `, ``);
    }
  }

  componentDidMount() {
    this.setdata(this.props.loggedInData);  
      
  }

  setdata(result) {
    if (result && result.data && result.data._id) {
      this.props.dispatch(loginLanguage(result.data, this.props.intlData.setlocale));

      // Change By - Najib, Desc - Calling setLoading in promise to set state after receiving response from server
      if(_.isEmpty(this.props.userData.data) || this.props.params.rowId != this.props.userData.data._id) {
        this.setState({loading : true}); 
      } else {       
        this.setState({loading : false});
      }
      this.props.dispatch(viewUser(this.userId)).then(res => this.setLoading())
    }
  }

  //code added by - Najib, Desc - Method to unset state post response from server for loading spinner
  setLoading() { 
    this.props.dispatch(ClearUser()); 
    if(this.state.loading) {
      this.setState({loading : false});  
    }
  }

  setresponse = (response) => {
    if(response.status){
      // this.refs.user_container.success(`${response.message} `, ``);
      // browserHistory.push('/admin/users/list');
    }else{
      this.refs.user_container.error(`${response.error} `, ``);
    }
  }

  edit = () => {
    var response = Validator.freeValue(this.schema);
    if(response){
      this.props.dispatch(UpdateUserSchema(response));
      browserHistory.push("/admin/users/edit/"+this.userId);
    }
  }

  clearError(){
    var response = Validator.freeValue(this.schema);
    if(response){
      this.props.dispatch(UpdateUserSchema(response));
      browserHistory.push('/admin/users/new');
    }
  }

  delete = () => {
    var userId = this.userId;
    var props = this.props;    
    var response = this.setDeleteResponse

    alertify.confirm(this.props.intlData.messages.warning,this.props.intlData.messages.delete_user_alert, 
      function (result) {
        if(result) {          
          let obj = {
            userId : userId
          }
          props.dispatch(DeleteUser(obj, '/admin/users/view/'+userId)).then(res => response(res)); 
        }
      },
      function() {

      }
    ).setting('labels',{'ok': this.props.intlData.messages.ok,'cancel': this.props.intlData.messages.cancel});;
  } 

  setDeleteResponse = (response) => {
    if(response.status){
      browserHistory.push('/admin/users/list');
    }else if(response.error){
      this.refs.user_container.error(`${response.error} `, ``);
    }
  }

  activate = () => {
    var userId = this.userId;    
    this.props.dispatch(ActivateUser(userId), '/admin/users/view/'+userId).then(res=>this.activateResponse(res)); 
  }

  activateResponse(response) {
   if(response.status){
      this.refs.user_container.success(`${response.message} `, ``);
      this.props.dispatch(viewUser(this.userId));
    }else if(response.error){
      this.refs.user_container.error(`${response.error} `, ``);
    } 
  }

  viewprofile = () => {
    browserHistory.push("/admin/users/profile/"+this.userId);
  } 
  

  render () {
    var userStatus = 'Active';
    if(this.props.userData.data && this.props.userData.data.userStatus!='') {
      var userStatus = this.props.userData.data.userStatus;
    }
    let cls_container = `${styles.iContainer} ${styles.oContainer} pull-right`;
    let cls_topmenu = `${styles.iTopMenu} ${styles.oTopMenu}`;
    let cls_isubmenu = `${styles.iSubMenu} {styles.oSubMenu}`;
     return (
      <div className={cls_container}>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="user_container"
          className="toast-top-right"
        />
        <div className={cls_topmenu}>
          <h3 className=""><FormattedMessage id='manage_user' /></h3>
            <div className={styles.dynamicBreadCrumb}>
              <ul>
                <li> 
                  <Link to="admin/users/list"><FormattedMessage id = 'all_users'/></Link>
                </li>
                <li>/</li>
                <li>{this.props.userData.data.firstname}</li>
              </ul>
            </div>
          <TopMenu data={ this.props.userData.data.guest == true ? this.guestMainMenu : (this.props.userData.data.userStatus == 'Active' ? this.mainmenu : this.inactiveMainMenu) } />
        </div>
        <div className={cls_isubmenu}>
          <SubMenu data={this.SubMenu} />
        </div>
          <ViewUserContainer viewUserData={this.props.userData.data} loading = {this.state.loading} />
      </div>
    );

  }
}

function mapStateToProps(state) {
  return {
   loggedInData: loggedInData(state),
    userData: userData(state),
    intlData: intlData(state)
  };
}
ViewUserComponent.propTypes = {
  loggedInData: PropTypes.object,
  userData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
}
ViewUserComponent.contextTypes = {
  router : React.PropTypes.object
};

export default connect(mapStateToProps)(ViewUserComponent);