import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router'; 

import AuthClient from '../../../../components/AuthController.js';
import { isLoggedIn } from '../../../Login/LoginActions';
import { getPackageData, UpdatePackageSchema, DeletePackage, ClearPackage } from '../PackageActions';
import { packageData } from '../PackageReducer';
import { loggedInData } from '../../../Login/LoginReducer';
import PackageView from '../components/PackageView';
import Validator from '../../../../components/Validator';
import {packageSchema} from '../schema/PackageSchema';

import SubMenu from '../../../../components/SubMenu';
import TopMenu from '../../../../components/TopMenu';

import {packageViewSubMenu, packageViewMainMenu} from '../schema/PackageMenu';

// Import Style
import styles from '../../../../components/component.css';
import { loginLanguage } from '../../../Intl/IntlActions';
import {Col, Row, Grid} from 'react-bootstrap';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import { intlData } from '../../../Intl/IntlReducer';
import Loading from '../../../App/components/Loading';

class ViewPackage extends Component {
  constructor(props){
    super(props);
    
    this.state = {loading : true};
    this.mainmenu = packageViewMainMenu;
    this.schema = packageSchema;

    this.mainmenu.menus[2].action = this.edit.bind(this);//this.save.bind(this);
    this.mainmenu.menus[1].action = this.deletePackage.bind(this);
  }

/*  componentWillMount() {
    var packageId = this.props.params.pid;
    this.props.dispatch(isLoggedIn(AuthClient.getSession(), '/admin/package/view/'+packageId)).then(res => this.setdata(res));
  }*/

  componentWillReceiveProps(nextProps) {
    if(nextProps.packageData && (nextProps.packageData.success && nextProps.packageData.success != "")) {
      this.refs.package_container.success(`${nextProps.packageData.success} `, ``);
    }
  }

  componentDidMount() {

    //Changed by - Najib, Showing loader while making request to server
    if(_.isEmpty(this.props.packageData.data) || this.props.params.pid != this.props.packageData.data._id) {
      this.setState({loading : true}); 
    } else {        
      this.setState({loading : false});
    }
    this.props.dispatch(getPackageData(this.props.params.pid)).then(res => this.setLoading());
    this.setdata(this.props.loggedInData)
  }

  setLoading() {
    //console.log("At set loading");
    this.props.dispatch(ClearPackage())
    if(this.state.loading) {
      this.setState({loading : false});  
    }
  }

//code added by - Najib, Desc - Method to unset state post response from server for loading spinner
  setdata(result){
    if (result && result.data && result.data._id) {
      this.props.dispatch(loginLanguage(result.data, this.props.intlData.setlocale));      
    }
  }

  edit = () => {
    var response = Validator.freeError(this.schema);
    if(response){
      //this.props.dispatch(UpdatePackageSchema(response));
      var packageId = this.props.params.pid;  
      browserHistory.push('/admin/package/edit/'+packageId);
    }
  }

  deletePackage = () => {
    var packageId = this.props.params.pid;
    var props = this.props;    
    var response = this.setresponse

    alertify.confirm(this.props.intl.messages.warning,this.props.intl.messages.delete_package_alert, 
      function (result) {
        if(result) {          
          props.dispatch(DeletePackage(packageId)).then(res => response(res));
        }
      },
      function() {

      }
    ).setting('labels',{'ok': this.props.intl.messages.ok,'cancel': this.props.intl.messages.cancel});
  }

  setresponse = (response) => {
    // console.log("response in view package:", response);
    if(response.status){
      browserHistory.push('/admin/package/list')
    }else{
      this.refs.package_container.error(`${response.error} `, ``);
    }
  }

  render() {
    //let clsContainerRight = `${styles.containerRight} pull-right`;
    let cls_container = `${styles.iContainer} ${styles.oContainer} pull-right`;
    let cls_topmenu = `${styles.iTopMenu} ${styles.oTopMenu}`;
    let cls_isubmenu = `${styles.iSubMenu} {styles.oSubMenu}`;
    let submenu = packageViewSubMenu
    return (
      
      <div className={cls_container}>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="package_container"
          className="toast-top-right"
        />
        <div className={cls_topmenu}>
          <h3 className=""><FormattedMessage id='package_management' /></h3>
           <div className={styles.dynamicBreadCrumb}>
            <ul>
              <li><Link  to="/admin/package/list"><FormattedMessage id='all_packages'/></Link></li>
              <li>/</li>
              <li>{this.props.packageData && this.props.packageData.data ? this.props.packageData.data.packageName : null}</li>
            </ul>
          </div>
          <TopMenu data={packageViewMainMenu} />
        </div>
        <div className={cls_isubmenu}>
          <SubMenu data={submenu} />
        </div>
        <PackageView packageData={this.props.packageData.data} success = {this.props.packageData.success} loading={this.state.loading}/>
      </div>
      
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    intl: state.intl,
    packageData : packageData(state),
    loggedInData : loggedInData(state),
    intlData: intlData(state)
  };
}

ViewPackage.propTypes = {
  packageData : PropTypes.object,
  loggedInData : PropTypes.object,
  dispatch : PropTypes.func.isRequired
};

ViewPackage.contextTypes = {
  router : React.PropTypes.object,
  intl: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps)(ViewPackage);
