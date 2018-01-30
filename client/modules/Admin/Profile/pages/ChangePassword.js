import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { browserHistory } from 'react-router';
import AuthClient from '../../../../components/AuthController.js';
import { loggedInData } from '../../../Login/LoginReducer';
import { ChangeUserPassword } from '../ProfileActions';
import SubMenu from '../../../../components/SubMenu';
import TopMenu from '../../../../components/TopMenu';
import  {ToastContainer, ToastMessage} from '../../../../lib';
import Validator from '../../../../components/Validator';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);

import { profileViewSubMenu, profileEditMainMenu } from '../schema/ProfileEditMenu';
import compStyles from '../../../../components/component.css';
import adminStyles from '../../Admin.css';

// Import Style
import styles from '../../../../components/component.css';
import { loginLanguage } from '../../../Intl/IntlActions';
import {Col, Row, Grid} from 'react-bootstrap';
import { intlData } from '../../../Intl/IntlReducer';
// import { Expressions } from '../../../../lib/expressions';

//Changes made by prateek for bug#3000
export function hasWhiteSpace(s) {
  return /\s/g.test(s);
}

class ChangePassword extends Component {
  constructor(props){
    super(props);
    this.submenu = profileViewSubMenu;   
    this.mainmenu = profileEditMainMenu;
    this.mainmenu.menus[1].action = this.save.bind(this);
    this.state = {
      validationError: {},
      oldPassword: '',
      newPassword: '',
      reNewPassword: ''
    }
  }

  componentDidMount() {
    this.setState({
      validationError: {}
    })
    if (this.props.loggedInData && this.props.loggedInData.data) 
      this.props.dispatch(loginLanguage(this.props.loggedInData.data, this.props.intlData.setlocale));
  }


  save = () => {
   let oldPassword = this.state.oldPassword;
   let newPassword = this.state.newPassword;
   let reNewPassword = this.state.reNewPassword;
   let errors = {}; 
   if (!oldPassword || oldPassword == '') errors['oldPassword'] = <FormattedMessage id='Please_enter_Current_Password' />;
   if (!newPassword || newPassword == '') errors['newPassword'] = <FormattedMessage id='Please_enter_New_Password' />;
   if (!reNewPassword || reNewPassword == '') errors['reNewPassword'] = <FormattedMessage id='Please_enter_Confirm_password' />;
   else if (newPassword != reNewPassword) errors['reNewPassword'] = <FormattedMessage id='New_Password_and_Confirm_password_should_be_same' />;
   if (!(_.isEmpty(errors))) {
     this.setState({
       validationError: errors
     });

   } else {
      this.setState({
        validationError: {}
      })
      let obj = {
        oldPassword: this.state.oldPassword,
        newPassword: this.state.newPassword,
        reNewPassword: this.state.reNewPassword,
        uid: this.props.loggedInData.data._id,
        token: this.props.loggedInData.token
      }     
      this.props.dispatch(ChangeUserPassword(obj)).then(res => this.setdata(res));
    }  
  }

  setdata(res){
    if(res.status){
      this.setState({oldPassword:'',newPassword:'',reNewPassword:''})
      this.refs.container.success(`${res.message} `, ``);      
    }else{
      if(res.error && res.error.length > 0){
        let errors = this.state.validationError;
        errors['reNewPassword'] = res.error;
        this.setState({validationError:errors})
        // this.refs.container.error(`${res.error} `, ``);
      }
    }
  }

  handleInput = (label, e) => {
    let val = e.target.value;
    if(!hasWhiteSpace(val)) {      
      this.setState({[label] : val})
    } else {
      let errorObj = this.state.validationError;
      errorObj[label] = "Password can't have spaces";
      this.setState({validationError: errorObj})
      // this.refs.container.error("Password can't have spaces");
    }
  }



  render() {
    //let clsContainerRight = `${styles.containerRight} pull-right`;
    let cls_container = `${styles.iContainer} ${styles.oContainer} pull-right`;
    let cls_topmenu = `${styles.iTopMenu} ${styles.oTopMenu}`;
    let cls_isubmenu = `${styles.iSubMenu} ${styles.oSubMenu}`;
    let submenu     = Validator.activeSubMenu(profileViewSubMenu, "lnkChangePassword");
    let clsForm   = `${styles.iForm} ${styles.oForm}`;
    let cls_localHeadBlock = ` ${adminStyles.infoTxt} ${adminStyles.localHeadBlock} `;
    var cls = `${styles.iFormGroup} ${styles.oFormGroup} ${adminStyles.changePassInner} `;
    var cls_fg = `${styles.iSubFormGroup} ${styles.oSubFormGroup}`;
    var clslabel=`${styles.iLabel} ${styles.oLabel}`;
    var clstext = `${styles.iElement} ${styles.oElement}`;
    var clsformfield = `${styles.iFormField} ${styles.oFormField}`;
    /*if(this.props.data.error && this.props.data.error != ""){
      clstext = `${styles.iElement} ${styles.oElement} ${styles.errorclass}`;
    }*/
    return (
      <div className={cls_container}>
        <div className={cls_topmenu}>
          <h3 className=""><FormattedMessage id='my_account' /></h3>
            <div className={styles.dynamicBreadCrumb}>
              <ul>
                <li><FormattedMessage id='you_are_in_my_profile_panel'/></li>
              </ul>
            </div>
          <TopMenu data={profileEditMainMenu} />
        </div>
  

        <div className={cls_isubmenu}>
            <SubMenu data={submenu} />
        </div>
        
          <ToastContainer
            toastMessageFactory={ToastMessageFactory}
            ref="container"
            className="toast-top-right"
           />
          <div className={clsForm}>
            <div className={styles.whiteCard}>
              <Grid fluid={true}>
                <Row>
                  <Col md={12}>
                    <div className={cls_localHeadBlock}>
                      <h2 className={adminStyles.localHeadMain} ><FormattedMessage id='change_password' /></h2>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <form id= 'changePassword'>
                    <div className='col-md-6'>
                      <div className={cls}>
                        <div className={cls_fg}>
                        <div className={clsformfield}>
                          <formfield>
                            <label className={clslabel} htmlFor='current_pwd'><FormattedMessage id='current_password' /><span className={styles.mandatory}>*</span>: </label>
                            <input type='password' id='current_pwd' ref='old_pwd' className={clstext} placeholder={this.props.intlData.messages.current_password} maxLength={30} autoFocus='true' value={this.state.oldPassword} onChange={this.handleInput.bind(this, 'oldPassword')}/> 
                            <label className={compStyles.errorPre} >{this.state.validationError && this.state.validationError.oldPassword ? this.state.validationError.oldPassword : ''}</label>							
                          </formfield>
                          </div>
                          <div className={clsformfield}>
                          <formfield>
                            <label className={clslabel} htmlFor='new_pwd'><FormattedMessage id='new_password' /><span className={styles.mandatory}>*</span>: </label>
                            <input type='password' id='new_pwd' ref='new_pwd' className={clstext} placeholder={this.props.intlData.messages.new_password} maxLength={30} value={this.state.newPassword} onChange={this.handleInput.bind(this, 'newPassword')}/> 
                            <label className={compStyles.errorPre} >{this.state.validationError && this.state.validationError.newPassword ? this.state.validationError.newPassword : ''}</label>							
                          </formfield>
                          </div>
                          <div className={clsformfield}>
                          <formfield>
                            <label className={clslabel} htmlFor='re_new_pwd'><FormattedMessage id='retype_new_password' /><span className={styles.mandatory}>*</span>: </label>
                            <input type='password' id='re_new_pwd' ref='re_new_pwd' className={clstext} placeholder={this.props.intlData.messages.retype_new_password} maxLength={30} value={this.state.reNewPassword} onChange={this.handleInput.bind(this, 'reNewPassword')}/> 
                            <label className={compStyles.errorPre} >{this.state.validationError && this.state.validationError.reNewPassword ? this.state.validationError.reNewPassword : ''}</label>							
                          </formfield>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </Row>
              </Grid>
            </div>
          </div>
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    dashboardData: null,
    loggedInData: loggedInData(state),
    intlData: intlData(state)
  };
}

ChangePassword.propTypes = {
  dashboardData: PropTypes.object,
  loggedInData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

ChangePassword.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(ChangePassword);
