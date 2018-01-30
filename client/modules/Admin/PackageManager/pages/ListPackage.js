import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

import AuthClient from '../../../../components/AuthController';
import DataObject from '../../../../components/DataObject';
import { isLoggedIn } from '../../../Login/LoginActions';
import { loggedInData } from '../../../Login/LoginReducer';
import Validator from '../../../../components/Validator';

import { PackageList, PackageStore, UpdatePackageSchema, ClearPackage } from '../PackageActions';
import { packageData } from '../PackageReducer';

import DataTable from '../../../../components/DataTable/DataTable';

import {packageSchema} from '../schema/PackageSchema';
import {packageListSubMenu, packageMainMenu} from '../schema/PackageMenu';

// Import Style
import styles from '../../Admin.css';
import compstyles from '../../../../components/component.css';
import {Col, Row, Grid} from 'react-bootstrap';
import { loginLanguage } from '../../../Intl/IntlActions';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import moment from 'moment';
import { intlData } from '../../../Intl/IntlReducer';

class ListPackage extends Component {
  constructor(props){
    super(props);
    this.state  = {
      searchValue : '',
      loading : true
    }
    this.form = null;

    this.schema = packageSchema;
    this.res = {};

    this.submenu = Validator.activeSubMenu(packageListSubMenu, "lnkPackage");   
    this.mainmenu = packageMainMenu;
    this.getData = this.getData.bind(this);

    this.currentPage= 1;
    this.itemsPerPage= 5;
  
    this.viewPackage = this.viewPackage.bind(this);
    this.mainmenu.menus[0].action = this.clearError.bind(this);
    this.searchFilter = this.searchFilter.bind(this);
  }

  /*componentWillMount() {
      this.props.dispatch(isLoggedIn(AuthClient.getSession(), 
                    '/admin/package/list')).then(res => this.setdata(res));
  }*/

  componentWillReceiveProps(nextProps) { 
    if(nextProps.packageData.deleteSuccess != ''){
      this.refs.user_container.success(`${nextProps.packageData.deleteSuccess} `, ``);
    }
  }

  componentDidMount() {
    this.getData({
      currentPage  : this.currentPage,
      totalItems   : 0,
      itemsPerPage : this.itemsPerPage
    });
    this.setdata(this.props.loggedInData)
  }

  setdata(result){
    if (result && result.data && result.data._id) {
      this.props.dispatch(loginLanguage(result.data, this.props.intlData.setlocale));
      //this.props.dispatch(PackageStore({uid: result.data._id }));   
    }
  }


  getData(pageParam, sort = null){
    if(sort !=null)
    // pageParam["uid"] = this.props.loggedInData.data._id;
    pageParam['sortObj'] = sort;
    pageParam["searchKeyword"] = this.state.searchValue;

    // Change By - Najib, Desc - Calling setLoading in promise to set state after receiving response from server
    if(_.isEmpty(this.props.packageData.dataList)) {
      this.setState({loading : true}); 
    } else {         
      this.setState({loading : false});
    }
    this.props.dispatch(PackageList(pageParam, pageParam.currentPage)).then(res => this.pageData(res));
  }

  pageData(res){
    // console.log(res);
    this.props.dispatch(ClearPackage());
    if(this.state.loading) {
      this.setState({loading : false});  
    }
  }

  viewPackage(row){
    let link = "/admin/package/view/"+row._id;
    return (
      <Link id="viewPackage" to={link}><i className="fa fa-eye"></i></Link>
    );
  }

  createdByName(row){
    return row.createdBy.firstname + " " + row.createdBy.lastname;
  }

  clearError(){
    var response = Validator.freeValue(this.schema);
    if(response){
      this.props.dispatch(UpdatePackageSchema(response));
      browserHistory.push('/admin/package/new');
    }
  }

  showFormattedDate(row){
    return(
      <div>{moment(row.packageValidity).format('DD-MM-YYYY')}</div>
    );
  }

  searchFilter(e){
    e.preventDefault();
    var expVal = e.target.value.trim();
    var pattern = new RegExp(/[+*()?\\]/);
    if(!pattern.test(expVal)){
      this.state.searchValue = e.target.value.trim();
      this.getData({
        currentPage  : this.currentPage,
        totalItems   : 0,
        itemsPerPage : this.itemsPerPage
      });
    }    
  }

  showPackageName(row){
    let link = "/admin/package/view/"+row._id;
    return (
      <Link id="viewPackage" className = {styles.removeStyle} to={link}><div>{row.packageName} </div></Link>
    );
  }

  render() {
      // console.log("package list data", this.props.packageData.dataList);

      var bredcrumb = (
        <div className={compstyles.dynamicBreadCrumb}>
          <ul>
            <li><FormattedMessage id='you_are_in_package_list_panel'/></li>
          </ul>
        </div>
            )
    var objDisp = [

          { title : <FormattedMessage id='package_name' />, type : "function", sort : true, callback : this.showPackageName, dbName : "packageName"},
          { title : <FormattedMessage id='package_validity' />, type : "function", sort : true, callback : this.showFormattedDate, dbName : "packageValidity" },
          { fieldName : "userCount", title : <FormattedMessage id='user_count' />, type : "text", sort : true, dbName : "userCount" },
          { fieldName : "continuousPresence", title : <FormattedMessage id='continuous_presence' />, type : "text", sort : true, dbName : "continuousPresence" },
          { fieldName : "serverLocation", title : <FormattedMessage id='server_location' />, sort : true, type : "text", dbName : "serverLocation" },
          { title : <FormattedMessage id='view' />, type : "function", callback : this.viewPackage },

        ];
    var filter = [
      {type : 'search', selectedfilter : this.searchFilter }
    ]     

    return (
      <div>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="user_container"
          className="toast-top-right"
         />
        <DataTable data={this.props.packageData.dataList}
            success = {this.props.packageData.success}
            error = {this.props.packageData.error}
            count={this.props.packageData.count}
            currentPage = {this.props.packageData.currentPage}
            submenu={this.submenu}
            bredCrumb={bredcrumb}
            topmenu={this.mainmenu}
            itemsPerPage={this.itemsPerPage}
            newDataCallback={this.getData}
            dispField={objDisp}
            pageTitle={this.props.intl.messages.package_management} 
            listDescreption={this.props.intl.messages.packages}
            filter={filter}
            loading={this.state.loading}
        />
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    intl: state.intl,
    loggedInData: loggedInData(state),
    packageData: packageData(state),
    intlData: intlData(state)
  };
}

ListPackage.propTypes = {
  loggedInData: PropTypes.object,
  packageData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

ListPackage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(ListPackage);
