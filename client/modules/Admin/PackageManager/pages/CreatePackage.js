import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'; 
import { Link, browserHistory } from 'react-router';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import AuthClient from '../../../../components/AuthController';
import Validator from '../../../../components/Validator';
import DataObject from '../../../../components/DataObject';
import { isLoggedIn } from '../../../Login/LoginActions';
import { loggedInData } from '../../../Login/LoginReducer';

import { SavePackage, PackageStore, UpdatePackageSchema } from '../PackageActions';
import { packageData } from '../PackageReducer';

import ContainerComponent from '../../../../components/ContainerComponent';

import {packageSchema} from '../schema/PackageSchema';
import {packageNewSubMenu, packageNewMainMenu} from '../schema/PackageMenu';

// Import Style
import styles from '../../Admin.css';
import style from '../../../../components/component.css';
import {Col, Row, Grid} from 'react-bootstrap';
import { loginLanguage } from '../../../Intl/IntlActions';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import { intlData } from '../../../Intl/IntlReducer';
var moment = require('moment');
var dataObject = {};

class CreatePackage extends Component {
  constructor(props){
    super(props);
    this.name = '';
    this.email = '';
    this.form = null;
    this.datareceive = this.datareceive.bind(this);

    this.schema = packageSchema;

    this.res = {};
    // this.state.schema = this.schema;

    this.submenu = Validator.activeSubMenu(packageNewSubMenu, "lnkPackage");      
    this.mainmenu = packageNewMainMenu;

    this.mainmenu.menus[1].action = this.save.bind(this);
    this.state = {
      activeIcon : null
    };
  }

  /*componentWillMount() {
      this.props.dispatch(isLoggedIn(AuthClient.getSession(), 
                    '/admin/package/new')).then(res => this.setdata(res));
  }*/

  componentDidMount() {
    this.setdata(this.props.loggedInData)
  }

  setdata(result){
    // console.log(result);
    if (result && result.data && result.data._id) {
      this.props.dispatch(loginLanguage(result.data, this.props.intlData.setlocale));
        this.props.dispatch(UpdatePackageSchema(this.schema));
        this.props.dispatch(PackageStore({ uid: result.data._id }));
    }
  }
  
  // Changed by jyothi for showing validation for expiry date
  save = (event) => {
    // console.log(this.form);
    if (this.form.packageValidity == "") {
      this.form['packageValidity'] = moment().endOf('day').utc().toDate();
    }
    var response = Validator.validate(this.form, this.schema, null, this.context.intl);
    if(response.error.length > 0){
      this.schema = response.schema;
      this.props.dispatch(UpdatePackageSchema(this.schema));
    }else{
      if (this.form.packageValidity) {
        this.form['packageValidity'] = moment(this.form.packageValidity).endOf('day').utc().toDate();
      }
      this.setState({ activeIcon : event.currentTarget.id});
      this.props.dispatch(SavePackage(this.form)).then(res => this.setresponse(res));
    }
  }

  setresponse = (response) => {
    if(response.status){
      browserHistory.push('/admin/package/view/'+response.id);
    }else{
      this.setState({ activeIcon : null});
      this.refs.package_container.error(`${response.error} `, ``);
    }
  }

  datareceive(data) {
    this.form = data;
  }

  render() {
    var bredcrumb = (
     <div className={style.dynamicBreadCrumb}>
        <ul>
           <li><Link to="/admin/package/list"><FormattedMessage id='all_packages'/></Link></li>
            <li>/</li>
            <li><FormattedMessage id ='new_package'/></li>
        </ul>
      </div>
      )
    if(this.props.packageData && this.props.packageData.data){
        dataObject = this.props.packageData.data;
    }
    return (
      <div>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="package_container"
          className="toast-top-right"
        />
        <ContainerComponent data={ this.props.packageData.schema }
          submenu={ this.submenu }
          topmenu={ this.mainmenu }
          bredCrumb={bredcrumb}
          dataFun = { this.datareceive }
          dataobject = { dataObject }
          activeIcon = {this.state.activeIcon}
       />
      </div>
    );
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

CreatePackage.propTypes = {
  loggedInData: PropTypes.object,
  packageData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

CreatePackage.contextTypes = {
  router: React.PropTypes.object,
  intl: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps)(CreatePackage);
