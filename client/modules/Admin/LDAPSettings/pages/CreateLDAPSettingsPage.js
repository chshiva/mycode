import React ,{ PropTypes,Component } from 'react';
import { connect } from 'react-redux';
import AuthClient from '../../../../components/AuthController';
import { isLoggedIn } from '../../../Login/LoginActions';
import { loggedInData } from '../../../Login/LoginReducer';
import { LDAPSettingsSchema } from '../Schema/LDAPSettingsSchema';
import { saveLDAPSettings, LDAPSettingsStore, getLDAPSettings, UpdateLDAPSchema, ClearLDAP, deleteLDAPSettings } from '../LDAPSettingsActions';
import { LDAPSettingsData } from '../LDAPSettingsReducer';
import ContainerComponent from '../../../../components/ContainerComponent';
import Validator from '../../../../components/Validator';

import { LDAPSettingsEditMainMenu, LDAPSettingsEditSubMenu } from '../Schema/LDAPSettingsMenu';
import  {ToastContainer, ToastMessage} from '../../../../lib';
import { loginLanguage } from '../../../Intl/IntlActions';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import { intlData } from '../../../Intl/IntlReducer';

class LDAPSettingsComponent extends Component {
	constructor(props) {
		super(props);
    this.form = null; 
    this.submenu = Validator.activeSubMenu(LDAPSettingsEditSubMenu, "lnkNewUsers");   
    this.mainmenu = LDAPSettingsEditMainMenu;
    this.schema = LDAPSettingsSchema;
    this.res = {};
    this.mainmenu.menus[0].action = this.save.bind(this);//this.save.bind(this);
    this.mainmenu.menus[1].action = this.deleteLDAPSettings.bind(this);
    this.state = {
      activeIcon : null
    }
	}

	// componentWillMount() {
	// 	 this.props.dispatch(isLoggedIn(AuthClient.getSession(), 
 //                    '/admin/ldapsettings')).then(res => {
 //      this.setdata(res);
 //      this.props.dispatch(getLDAPSettings(res.data._id)); // to get the LDAP Settings data when component mounts

 //    });
	// }

  // componentWillReceiveProps(nextProps) {
  //   if(nextProps.LDAPSettingsData.success != ''){
  //     this.refs.ldap_container.success(`${nextProps.LDAPSettingsData.success} `, ``);
  //     this.props.dispatch(ClearLDAP());
  //   }
  // }

  componentDidMount() {
    this.setdata(this.props.loggedInData)
    this.props.dispatch(getLDAPSettings(this.props.loggedInData.data._id)); // to get the LDAP Settings data when component mounts
  }

	setdata(result){
    if (result && result.data && result.data._id) {
      this.props.dispatch(loginLanguage(result.data, this.props.intlData.setlocale));
      var response = Validator.freeError(this.schema);
      if(response){
        this.schema = response;
        this.props.dispatch( UpdateLDAPSchema(this.schema) );
        this.props.dispatch( LDAPSettingsStore({ uid : result.data._id }) );
      }
    }
  }

  save = (event) => {
    var response = Validator.validate(this.form, this.schema,null,this.context.intl);
    if(response.error.length > 0){
      this.schema = response.schema;
      this.props.dispatch(UpdateLDAPSchema(this.schema));
    }else{
      this.setState({ activeIcon : event.currentTarget.id});
      this.props.dispatch(saveLDAPSettings(this.form)).then(res => this.getresponse(res));
    }
  }
  getresponse(res){
    this.setState({ activeIcon : null});
    if(res.status){
        this.refs.ldap_container.success(`${res.message} `, ``);
    }else{
      this.refs.ldap_container.error(`${res.error} `, ``);
    }
  }
  deleteLDAPSettings = () => {
    const userID = this.props.loggedInData.data._id;
    var self = this;
    var props = this.props
    alertify.confirm(this.props.intlData.messages.warning,this.props.intlData.messages.delete_LDAPSettings_alert, 
      function (result) {
        if(result) {
          props.dispatch(deleteLDAPSettings(/*{ userID}*/)).then(res => self.clearresponse(res));
        }
      },
      function() {

      }
    ).setting('labels',{'ok': this.props.intlData.messages.ok,'cancel': this.props.intlData.messages.cancel}); ;
  }

  clearresponse = () => {
    var response = Validator.freeValue(this.schema);
    if(response){
      this.props.dispatch( ClearLDAP());
      this.props.dispatch( UpdateLDAPSchema (response));
      this.props.dispatch(LDAPSettingsStore({ uid : this.props.loggedInData.data._id }));
    }   
  }

  componentWillUnmount() {
    this.props.dispatch( ClearLDAP());
  }

  datareceive =(data) => {
    this.form = data;
  }

  render () {
    
  	return (
      <div>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="ldap_container"
          className="toast-top-right"
         />
        <ContainerComponent data={this.props.LDAPSettingsData.schema}
          submenu={this.submenu}
          topmenu={this.mainmenu}
          dataFun = {this.datareceive}
          dataobject = {this.props.LDAPSettingsData.data}
          activeIcon = {this.state.activeIcon}
        />  
      </div>		
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedInData: loggedInData(state),
    LDAPSettingsData: LDAPSettingsData(state),
    intlData: intlData(state)
  };
}
LDAPSettingsComponent.propTypes = {
	loggedInData :PropTypes.object,
	LDAPSettingsData :PropTypes.object,
	dispatch: PropTypes.func.isRequired,
}
LDAPSettingsComponent.contextTypes = {
  intl: React.PropTypes.object.isRequired
};
export default connect(mapStateToProps)(LDAPSettingsComponent);
