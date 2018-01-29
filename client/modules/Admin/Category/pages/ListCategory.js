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


import { SaveCategoryRequest, UpdateCategorySchema, CategoryStore, CategoryListRequest, ClearCat } from '../CategoryActions';
import { categoryData } from '../CategoryReducer';

import DataTable from '../../../../components/DataTable/DataTable';

import {categorySchema} from '../schema/CategorySchema';
import {categoryListSubMenu, categoryListMainMenu} from '../schema/CategoryMenu';

// Import Style
import styles from '../../Admin.css';
import compStyles from '../../../../components/component.css';

import {Col, Row, Grid} from 'react-bootstrap';
import  {ToastContainer, ToastMessage} from '../../../../lib';
import { loginLanguage } from '../../../Intl/IntlActions';
import { intlData } from '../../../Intl/IntlReducer';

const ToastMessageFactory = React.createFactory(ToastMessage.animation);   


class ListCategory extends Component {
  constructor(props){
    super(props);
    this.state  = {
      searchValue : '',
      loading : true
    }
    this.form = null;

    this.schema = categorySchema;
    this.res = {};

    this.submenu = Validator.activeSubMenu(categoryListSubMenu, "lnkCategory"); 
    this.mainmenu = categoryListMainMenu;
    this.getData = this.getData.bind(this);

    this.currentPage= 1;
    this.itemsPerPage= 5;
  
    this.viewCategory = this.viewCategory.bind(this);
    this.mainmenu.menus[0].action = this.clearError.bind(this);
    this.searchFilter = this.searchFilter.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.categoryData.deleteSuccess != ''){
      this.refs.category_container.success(`${nextProps.categoryData.deleteSuccess} `, ``);
      this.props.dispatch(ClearCat());
    }
  }

  componentDidMount() {
      /*this.props.dispatch(isLoggedIn(AuthClient.getSession(), 
                    '/admin/category/list')).then(res => this.setdata(res));*/
    this.setdata(this.props.loggedInData)                
  }

  componentWillUnmount(){
    this.props.dispatch(ClearCat());
  }

  setdata(result){
    if (result && result.data && result.data._id) {
      this.props.dispatch(loginLanguage(result.data, this.props.intlData.setlocale));
      //this.props.dispatch(CategoryStore({uid: result.data._id }));
      this.getData({
        currentPage  : this.currentPage,
        totalItems   : 0,
        itemsPerPage : this.itemsPerPage
      });
    }
  }


  getData(pageParam, sort = null){
    // pageParam["uid"] = this.props.loggedInData.data._id;
    if(sort != null)
      pageParam["sortObj"] = sort;
    pageParam["searchKeyword"] = this.state.searchValue;

    // Change By - Najib, Desc - Calling setLoading in promise to set state after receiving response from server
    if(_.isEmpty(this.props.categoryData.dataList)) {
      this.setState({loading : true}); 
    } else {         
      this.setState({loading : false});
    }
    this.props.dispatch(CategoryListRequest(pageParam, pageParam.currentPage)).then(res => this.pageData(res));
  }

  pageData(res){
    // console.log(res);
    this.props.dispatch(ClearCat());
    if(this.state.loading) {
      this.setState({loading : false});  
    }
  }

  viewCategory(row){
    let link = "/admin/category/view/"+row._id;
    return (
      <Link to={link}><i className="fa fa-eye"></i></Link>
    );
  }

  corporateName(row){
    if(row.corporateId == null) {
      return (
          <div>-</div>
        )
    } else {
      let link = "/admin/category/view/"+row._id;
      return (
      <Link className = {styles.removeStyle} to={link}><div>{row.corporateId.businessName} </div></Link>
    );
    }
  }

  categoryDesc(row){
    
    if(row.categoryDesc.length > 10) {
      var categoryDesc = row.categoryDesc.substring(0,10) + '...'
      return(
        <div>{categoryDesc}</div>
      );
    } else {
      return(
        <div>{row.categoryDesc}</div>
      );
    }

  }

  clearError(){
    var response = Validator.freeValue(this.schema);
    if(response){
      this.props.dispatch(UpdateCategorySchema(response));
      browserHistory.push('/admin/category/new');
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



  render() {
    var bredcrumb = (
        <div className={compStyles.dynamicBreadCrumb}>
          <ul>
            <li><FormattedMessage id='you_are_in_category_list_panel'/></li>
          </ul>
        </div>
      )
    var objDisp = [
          { title : <FormattedMessage id='corporate_name' />, type : "function", callback : this.corporateName },
          { fieldName : "categoryName", title : <FormattedMessage id='category_name'/>, type : "text", sort : true, dbName : 'categoryName' },
          { title : <FormattedMessage id='category_desc'/>, type : "function", callback : this.categoryDesc, sort : true, dbName : 'categoryDesc'  },
          { title : <FormattedMessage id='view'/>, type : "function", callback : this.viewCategory },
        ];

    var filter = [
      {type : 'search', selectedfilter : this.searchFilter }
    ]      

    return (
      <div>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="category_container"
          className="toast-top-right"
        />
        <DataTable data={this.props.categoryData.dataList}
            success = {this.props.categoryData.success}
            error = {this.props.categoryData.error}
            count={this.props.categoryData.count}
            currentPage = {this.props.categoryData.currentPage}
            submenu={this.submenu}
            bredCrumb={bredcrumb}
            topmenu={this.mainmenu}
            itemsPerPage={this.itemsPerPage}
            newDataCallback={this.getData}
            dispField={objDisp}
            pageTitle={this.props.intl.messages.category_management} 
            listDescreption={this.props.intl.messages.categories}
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
    categoryData: categoryData(state),
    intlData: intlData(state)
  };
}

ListCategory.propTypes = {
  loggedInData: PropTypes.object,
  categoryData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

ListCategory.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(ListCategory);
