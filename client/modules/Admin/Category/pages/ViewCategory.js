import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

import AuthClient from '../../../../components/AuthController.js';
import { isLoggedIn } from '../../../Login/LoginActions';
import { getCategoryData, UpdateCategorySchema, DeleteCategory, ClearCat } from '../CategoryActions';
import { categoryData } from '../CategoryReducer';
import { loggedInData } from '../../../Login/LoginReducer';
import CategoryView from '../components/CategoryView';
import Validator from '../../../../components/Validator';
import {categorySchema} from '../schema/CategorySchema';

import SubMenu from '../../../../components/SubMenu';
import TopMenu from '../../../../components/TopMenu';

import {categoryViewSubMenu, categoryViewMainMenu} from '../schema/CategoryMenu';

// Import Style
import styles from '../../../../components/component.css';

import {Col, Row, Grid} from 'react-bootstrap';
import  {ToastContainer, ToastMessage} from '../../../../lib';
import { loginLanguage } from '../../../Intl/IntlActions';
import { intlData } from '../../../Intl/IntlReducer';

import Loading from '../../../App/components/Loading';

const ToastMessageFactory = React.createFactory(ToastMessage.animation);   


class ViewCategory extends Component {
  constructor(props){
    super(props);
    this.state = {loading : true};
    this.mainmenu = categoryViewMainMenu;
    this.schema = categorySchema;

    this.mainmenu.menus[1].action = this.edit.bind(this);//this.save.bind(this);
    this.mainmenu.menus[2].action = this.deleteCategory.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.categoryData.success != ''){
      this.refs.category_container.success(`${nextProps.categoryData.success} `, ``);
      // this.props.dispatch(ClearCat());
    }
  }

  componentDidMount() {
    /*var categoryId = this.props.params.cid;
    this.props.dispatch(isLoggedIn(AuthClient.getSession(), '/admin/category/view/'+categoryId)).then(res => this.setdata(res));*/
    this.setdata(this.props.loggedInData)  
  }

  setdata(result){
    if (result && result.data && result.data._id) {
      this.props.dispatch(loginLanguage(result.data, this.props.intlData.setlocale));
      var categoryId = this.props.params.cid;
      let obj = { 
        // uid : result.data._id,
        categoryId : categoryId
      };

      // Change By - Najib, Desc - Calling setLoading in promise to set state after receiving response from server
      if(_.isEmpty(this.props.categoryData.data) || categoryId != this.props.categoryData.data._id) {
        this.setState({loading : true}); 
      } else {         
        this.setState({loading : false});
      }
      this.props.dispatch(getCategoryData(obj, '/admin/category/view/'+categoryId)).then(res=>this.setLoading());
      // this.props.dispatch(ClearCat());
    }
  }


//code added by - Najib, Desc - Method to unset state post response from server for loading spinner
  setLoading() {
    //console.log("At set loading");
    this.props.dispatch(ClearCat())
    if(this.state.loading) {
      this.setState({loading : false});  
    }
  }

  clear(){
    this.props.dispatch(ClearCat());
  }

  edit = () => {
    var response = Validator.freeError(this.schema);
    if(response){
      this.props.dispatch(UpdateCategorySchema(response));
      var categoryId = this.props.params.cid;  
      browserHistory.push('/admin/category/edit/'+categoryId);
    }
  }

  deleteCategory = () => {
    var categoryId = this.props.params.cid;
    var props = this.props;    
    var response = this.setDeleteResponse

    alertify.confirm(this.props.intl.messages.warning,this.props.intl.messages.delete_category_alert, 
      function (result) {
        if(result) {          
          let obj = {
            categoryId : categoryId
          }
          props.dispatch(DeleteCategory(obj, '/admin/category/view/'+categoryId)).then(res => response(res)); 
        }
      },
      function() {

      }
    ).setting('labels',{'ok': this.props.intl.messages.ok,'cancel': this.props.intl.messages.cancel});
  }

  setDeleteResponse = (response) => {
    if(response.status){
      browserHistory.push('/admin/category/list');
    }else if(response.error){
      this.refs.category_container.error(`${response.error} `, ``);
    }
  }

  render() {
    //let clsContainerRight = `${styles.containerRight} pull-right`;
    let cls_container = `${styles.iContainer} ${styles.oContainer} pull-right`;
    let cls_topmenu = `${styles.iTopMenu} ${styles.oTopMenu}`;
    let cls_isubmenu = `${styles.iSubMenu} {styles.oSubMenu}`;
    let submenu = categoryViewSubMenu
    return (
      <div>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="category_container"
          className="toast-top-right"
        />
        <div className={cls_container}>
          <div className={cls_topmenu}>
            <h3 className=""><FormattedMessage id='category_management' /></h3>
             <div className={styles.dynamicBreadCrumb}>
              <ul>
                <li><Link to="/admin/category/list"><FormattedMessage id='all_categories'/></Link></li>
                <li>/</li>
                <li>{this.props.categoryData && this.props.categoryData.data ? this.props.categoryData.data.categoryName : null}</li>
              </ul>
            </div>
            <TopMenu data={categoryViewMainMenu} />
          </div>


          <div className={cls_isubmenu}>
            <SubMenu data={submenu} />
          </div>
          <CategoryView categoryData={this.props.categoryData.data} success = {this.props.categoryData.success} error = {this.props.categoryData.error} clear = {this.clear} loading = {this.state.loading}/>
        </div>
      </div>
      );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    intl: state.intl,
    categoryData : categoryData(state),
    loggedInData : loggedInData(state),
    intlData: intlData(state)
  };
}

ViewCategory.propTypes = {
  categoryData : PropTypes.object,
  loggedInData : PropTypes.object,
  success : PropTypes.string,
  error : PropTypes.string,
  dispatch : PropTypes.func.isRequired
};

ViewCategory.contextTypes = {
  router : React.PropTypes.object,
  intl: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps)(ViewCategory);
