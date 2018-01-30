import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import AuthClient from '../../../../components/AuthController';
import DataObject from '../../../../components/DataObject';
import { isLoggedIn } from '../../../Login/LoginActions';
import { loggedInData } from '../../../Login/LoginReducer';
import Validator from '../../../../components/Validator';

import { UpdatePackage, PackageStore, getPackageData, UpdatePackageSchema } from '../PackageActions';
import { packageData } from '../PackageReducer';

import ContainerComponent from '../../../../components/ContainerComponent';
import { packageSchema } from '../schema/PackageSchema';
import { packageEditSubMenu, packageEditMainMenu } from '../schema/PackageMenu';

// Import Style
import styles from '../../Admin.css';
import style from '../../../../components/component.css';
import {Col, Row, Grid} from 'react-bootstrap';
import { loginLanguage } from '../../../Intl/IntlActions';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import { intlData } from '../../../Intl/IntlReducer';
var moment = require('moment');

class EditPackage extends Component {
  constructor(props){
    super(props);
    this.form = null;
    this.datareceive = this.datareceive.bind(this);

    this.schema = packageSchema;
    this.res = {};
    
    this.submenu = Validator.activeSubMenu(packageEditSubMenu, "lnkPackage");   
    this.mainmenu = packageEditMainMenu;

    this.mainmenu.menus[1].action = this.save.bind(this);//this.save.bind(this);
    this.mainmenu.menus[0].action = this.view.bind(this);
    this.state = {
      activeIcon : null
    };
  }

  /*componentWillMount() {
    var packageId = this.props.params.pid;
    this.props.dispatch( isLoggedIn(AuthClient.getSession(), 
                        '/admin/package/edit/'+packageId) ).then(res => this.setuserdata(res));
  }*/

  componentDidMount() {
    this.props.dispatch( getPackageData(this.props.params.pid) ).then(res => this.setdata(res));
    this.setuserdata(this.props.loggedInData)
  }

  setuserdata(result){
    //console.log("result === ",result);
    if (result && result.data && result.data._id) {
      this.props.dispatch(loginLanguage(result.data, this.props.intlData.setlocale));
      this.props.dispatch( PackageStore({ uid: result.data._id }) );
    }
  }

  setdata(result){
    this.props.dispatch( PackageStore(result.data) );
  }

  // Changed by jyothi for showing validation for expiry date
  save = () => {
    //console.log("this.form === ",this.form);
    if (this.form.packageValidity == "") {
      this.form['packageValidity'] = moment().endOf('day').utc().toDate();
    }
    var response = Validator.validate(this.form, this.schema, null, this.context.intl);
    if(response.error.length > 0){
      this.schema = response.schema;
      this.props.dispatch( UpdatePackageSchema(this.schema) );
    }else{
      if (this.form.packageValidity) {
        this.form['packageValidity'] = moment(this.form.packageValidity).endOf('day').utc().toDate();
      }
      this.setState({ activeIcon : event.currentTarget.id});
      this.props.dispatch( UpdatePackage(this.form, this.props.params.pid) ).then(res => this.setresponse(res));
    }
  }

  setresponse = (response) => {
    // console.log("response === ",response);
    if(response.status){
      browserHistory.push('/admin/package/view/'+response.id);
    }else{
      this.setState({ activeIcon : null});
      this.refs.package_container.error(`${response.error}`, ``);
    }
  }

  view = () => {
    var packageId = this.props.params.pid;
    browserHistory.push('/admin/package/view/'+packageId);
  }

  datareceive(data) {
   // console.log(data);
    this.form = data;
  }

  render() {
    var bredcrumb = (
     <div className={style.dynamicBreadCrumb}>
        <ul>
           <li><Link to="/admin/package/list"><FormattedMessage id='all_packages'/></Link></li>
            <li>/</li>
            <li><Link onClick={this.view}>{this.props.packageData && this.props.packageData.data ? this.props.packageData.data.packageName : null}</Link></li>
            <li>/</li>
            <li><FormattedMessage id ='edit_package'/></li>
        </ul>
      </div>
      )
    /*if(this.props.loggedInData.data){

        this.name = this.props.loggedInData.data.firstname + ' ' + this.props.loggedInData.data.lastname;
        this.email = this.props.loggedInData.data.email;
        // console.log(strName);
    }
*/
    let clsContainerRight = `${styles.containerRight} pull-right`;

    if(this.props.packageData.data){
      //console.log("this.props.packageData.data === ",this.props.packageData.data);
        return (
          <div>
            <ToastContainer
              toastMessageFactory={ToastMessageFactory}
              ref="package_container"
              className="toast-top-right"
            />
            <ContainerComponent data={this.schema}
              submenu={this.submenu}
              topmenu={this.mainmenu}
              bredCrumb={bredcrumb}
              dataFun = {this.datareceive}
              dataobject = {this.props.packageData.data}
              activeIcon = {this.state.activeIcon}
           />
          </div>
        );
    }else{
      return (
        <div>Loading...</div>
      );
    }

  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    loggedInData: loggedInData(state),
    packageData: packageData(state),
    intlData: intlData(state)
  };
}

EditPackage.propTypes = {
  loggedInData: PropTypes.object,
  packageData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

EditPackage.contextTypes = {
  router: React.PropTypes.object,
  intl: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps)(EditPackage);
