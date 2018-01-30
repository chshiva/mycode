import React ,{PropTypes,Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import {connect } from 'react-redux';
import { browserHistory } from 'react-router';  
import AuthClient from '../../../../components/AuthController';
import { isLoggedIn } from '../../../Login/LoginActions';
import { loggedInData } from '../../../Login/LoginReducer';
import { SettingsSchema } from '../Schema/SettingSchema';
import { saveSettings, settingsStore, getSettings, UpdateSettingsSchema, ClearSMTP, deleteSMTPSettings } from '../SettingsActions';
import { settingsData } from '../SettingsReducer';
import ContainerComponent from '../../../../components/ContainerComponent';
import { settingsEditMainMenu, settingsEditSubMenu } from '../Schema/SettingsMenu';
import Validator from '../../../../components/Validator';
import { loginLanguage } from '../../../Intl/IntlActions';
import { intlData } from '../../../Intl/IntlReducer';

class SetingsComponent extends Component {
	constructor(props) {
	super(props);
	  this.form = null;
    this.submenu = Validator.activeSubMenu(settingsEditSubMenu, "lnkNewUsers");   
    this.mainmenu = settingsEditMainMenu;
    this.schema = SettingsSchema;
    this.res = {};
    this.mainmenu.menus[0].action = this.save.bind(this);
    this.mainmenu.menus[1].action = this.deleteSMTPSettings.bind(this);

  }

  // componentWillMount () {
  //   this.props.dispatch(isLoggedIn(AuthClient.getSession(), 
  //               '/admin/settings/new')).then(res => {
  //     this.setdata(res)
  //     this.props.dispatch(getSettings());
  //   });
  // }

  componentDidMount() {
    this.setdata(this.props.loggedInData); 
    this.props.dispatch(getSettings());   
  }


  setdata(result){
  /*console.log("userID");
  console.log(result.data._id);*/
    if (result && result.data && result.data._id) {
      this.props.dispatch(loginLanguage(result.data, this.props.intlData.setlocale));
      var response = Validator.freeError(this.schema);
      if(response){
        this.schema = response;
        this.props.dispatch( UpdateSettingsSchema(this.schema) );
        this.props.dispatch(settingsStore({ uid : result.data._id }));
      }
    }
  }
  save = () => {
    var response = Validator.validate(this.form, this.schema,null,this.context.intl);
    if(response.error.length > 0){
      this.schema = response.schema;
      this.props.dispatch(UpdateSettingsSchema(this.schema));
    }else{
      this.props.dispatch(saveSettings(this.form));
    }
  }

  deleteSMTPSettings = () => {
    // var response = this.clearresponse;
   let self = this;
    var props = this.props
    alertify.confirm(this.props.intlData.messages.warning,this.props.intlData.messages.delete_SMTPSettings_alert, 
      function (result) {
        if(result) {
          props.dispatch(deleteSMTPSettings()).then(res => self.clearresponse(res));
        }
      },
      function() {

      }
    ).setting('labels',{'ok': this.props.intlData.messages.ok,'cancel': this.props.intlData.messages.cancel}); ;
  }

  clearresponse = (res) => {
    if(res.status){
      var response = Validator.freeValue(this.schema);
      if(response){
        this.props.dispatch( ClearSMTP());
        this.props.dispatch( UpdateSettingsSchema (response));
        this.props.dispatch(settingsStore({ uid : this.props.loggedInData.data._id }));
      }   
    }
  }

  componentWillUnmount() {
    this.props.dispatch( ClearSMTP());
  }
  datareceive =(data) => {
    this.form = data;
  }
  render () {
  	return (
       <div>
        <ContainerComponent error = {this.props.settingsData.error}
        success = {this.props.settingsData.success} 
        data={this.props.settingsData.schema}
          submenu={this.submenu}
          topmenu={this.mainmenu}
          dataFun = {this.datareceive}
          dataobject = {this.props.settingsData.data}
          />  
        </div>		
          );
  }
}

function mapStateToProps(state) {
  return {
    loggedInData: loggedInData(state),
    settingsData: settingsData(state),
    intlData: intlData(state)
  };
}

SetingsComponent.propTypes = {
  loggedInData: PropTypes.object,
  settingsData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

SetingsComponent.contextTypes = {
  intl: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps)(SetingsComponent);
