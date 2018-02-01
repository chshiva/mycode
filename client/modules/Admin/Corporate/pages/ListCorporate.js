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


import { CorporateList, CorporateStore, UpdateCorporateSchema, ClearCrop } from '../CorporateActions';
import { corporateData } from '../CorporateReducer';

import DataTable from '../../../../components/DataTable/DataTable';

import {corporateSchema} from '../schema/CorporateSchema';
import {corporateViewSubMenu, corporateMainMenu} from '../schema/CorporateMenu';

// Import Style
import styles from '../../Admin.css';
import compstyles from '../../../../components/component.css';

import {Col, Row, Grid} from 'react-bootstrap';
import  {ToastContainer, ToastMessage} from '../../../../lib';
import { loginLanguage } from '../../../Intl/IntlActions';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import { intlData } from '../../../Intl/IntlReducer';

class ListCorporate extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchValue:'',
      loading : true
    }
    this.form = null;

    this.schema = corporateSchema;
    this.res = {};

    this.submenu = Validator.activeSubMenu(corporateViewSubMenu, "lnkCorporate");   
    this.mainmenu = corporateMainMenu;
    this.getData = this.getData.bind(this);

    this.currentPage= 1;
    this.itemsPerPage= 5;
  
    this.viewCorporate = this.viewCorporate.bind(this);
    this.mainmenu.menus[0].action = this.clearError.bind(this);
    this.searchFilter = this.searchFilter.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.corporateData.deleteSuccess != ''){
      this.refs.corporate_container.success(`${nextProps.corporateData.deleteSuccess} `, ``);
      this.props.dispatch(ClearCrop());
    }
  }

  componentWillMount() {
      // this.props.dispatch(isLoggedIn(AuthClient.getSession(), 
      //               '/admin/corporate/list')).then(res => this.setdata(res));
      
  }
  componentDidMount() {
    this.setdata(this.props.loggedInData);
    this.getData({
      currentPage  : this.currentPage,
      totalItems   : 0,
      itemsPerPage : this.itemsPerPage
    });
  }

  setdata(result){
    if (result && result.data && result.data._id) {
      this.props.dispatch(loginLanguage(result.data, this.props.intlData.setlocale));
      //this.props.dispatch(CorporateStore({uid: result.data._id }));
    }
  }

  getData(pageParam, sort = null){
    // console.log("sort === ",sort);
    if (sort != null)
      pageParam['sortObj'] = sort;
    pageParam["searchKeyword"] = this.state.searchValue;

    // Change By - Najib, Desc - Calling setLoading in promise to set state after receiving response from server
    if(_.isEmpty(this.props.corporateData.dataList)) {      
      this.setState({loading : true}); 
    } else {       
      this.setState({loading : false});
    }
    this.props.dispatch(CorporateList(pageParam, pageParam.currentPage)).then(res => this.pageData(res))
  }

  pageData(response){
    // console.log(res);
    if(response.status == false){
      this.refs.corporate_container.error(`${response.error} `, ``);
    }
    if(this.state.loading) {
      this.setState({loading : false});  
    }
  }

  viewCorporate(row){
    let link = "/admin/corporate/view/"+row._id;
    return (
      <Link id="viewCorporate" to={link}><i className="fa fa-eye"></i></Link>
    );
  }

  address(row){
    return(
        <div >{row.address.state}, {row.address.country}</div>
      );
  }

  contactName(row){
    return(
        <div>{row.contactDetails.name}</div>
      );
  }
  contactPhoneNumber(row){
    return(
        <div>{row.contactDetails.phoneNo[1]}</div>
      );
  }

  clearError(){
    var response = Validator.freeValue(this.schema);
    if(response){
      this.props.dispatch(UpdateCorporateSchema(response));
      browserHistory.push('/admin/corporate/new');
    }
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

  showCorporateDetails(row){
    let link = "/admin/corporate/view/"+row._id;
    return (
      <Link id="view" className = {styles.removeStyle} to={link}><div>{row.businessName} </div></Link>
    );
  }

  render() {
    var bredcrumb = (
      <div className={compstyles.dynamicBreadCrumb}>
        <ul>
          <li><FormattedMessage id='you_are_in_corporate_list_panel'/></li>
        </ul>
      </div>
      )
    // console.log("corporate data", this.props.corporateData.dataList);
    var objDisp = [
          { fieldName : "businessId", title : <FormattedMessage id='business_id' />, type : "text", sort : true, dbName : "businessId" },
          { title : <FormattedMessage id='business_name'/>, type : "function", callback : this.showCorporateDetails, sort : true, dbName : "businessName" },
          { fieldName : "businessType", title : <FormattedMessage id='business_type'/>, type : "text", sort : true, dbName : "businessType" },
          { title : <FormattedMessage id='contact_name'/>, type : "function", callback : this.contactName, sort : true, dbName : "contactDetails.name" },
          { title : <FormattedMessage id='contact_phone_number'/>, type : "function", callback : this.contactPhoneNumber },
          { title : <FormattedMessage id='address'/>, type : "function", callback : this.address, sort : true, dbName : "address.state" },
          { title : <FormattedMessage id='view'/>, type : "function", callback : this.viewCorporate },
        ];

    var filter = [
      {type : 'search', selectedfilter : this.searchFilter }
    ]    

    return (      
      <div>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="corporate_container"
          className="toast-top-right"
        />
        <DataTable data={this.props.corporateData.dataList}
            success = {this.props.corporateData.success}
            error = {this.props.corporateData.error}
            count={this.props.corporateData.count}
            currentPage = {this.props.corporateData.currentPage}
            submenu={this.submenu}
            bredCrumb={bredcrumb}
            topmenu={this.mainmenu}
            itemsPerPage={this.itemsPerPage}
            newDataCallback={this.getData}
            dispField={objDisp}
            pageTitle={this.props.intl.messages.corporate_directory} 
            listDescreption={this.props.intl.messages.corporates}
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
    corporateData: corporateData(state),
    intlData: intlData(state)
  };
}

ListCorporate.propTypes = {
  loggedInData: PropTypes.object,
  corporateData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.object,
};

ListCorporate.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(ListCorporate);
