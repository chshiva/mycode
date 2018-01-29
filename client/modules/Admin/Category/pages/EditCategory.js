import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';

import AuthClient from '../../../../components/AuthController';
import DataObject from '../../../../components/DataObject';
import { isLoggedIn } from '../../../Login/LoginActions';
import { loggedInData } from '../../../Login/LoginReducer';
import Validator from '../../../../components/Validator';

import { SaveCategoryRequest, CategoryStore, getCategoryData, UpdateCategorySchema, ClearCat } from '../CategoryActions';
import { categoryData } from '../CategoryReducer';

import ContainerComponent from '../../../../components/ContainerComponent';
import { categorySchema } from '../schema/CategorySchema';
import { categoryViewToEditSubMenu, categoryViewToEditMainMenu } from '../schema/CategoryMenu';

// Import Style
import styles from '../../Admin.css';

import {Col, Row, Grid} from 'react-bootstrap';
import  {ToastContainer, ToastMessage} from '../../../../lib';
import { loginLanguage } from '../../../Intl/IntlActions';
import { intlData } from '../../../Intl/IntlReducer';

const ToastMessageFactory = React.createFactory(ToastMessage.animation);

class EditCategory extends Component {
  constructor(props){
    super(props);
    this.form = null;
    this.datareceive = this.datareceive.bind(this);
    this.schema = categorySchema;
    this.res = {};    
    this.submenu = Validator.activeSubMenu(categoryViewToEditSubMenu, "editNewCategory");   
    this.mainmenu = categoryViewToEditMainMenu;
    this.mainmenu.menus[1].action = this.save.bind(this);//this.save.bind(this);
    this.mainmenu.menus[0].action = this.view.bind(this);
    this.state = {
      activeIcon : null
    }
  }

  componentDidMount() {
    /*var categoryId = this.props.params.cid;
    this.props.dispatch( isLoggedIn(AuthClient.getSession(), 
                        '/admin/category/edit/'+categoryId) ).then(res => this.setuserdata(res));*/
    this.setuserdata(this.props.loggedInData)                    
  }

  setuserdata(result){
    //console.log("result === ",result);
    if (result && result.data && result.data._id) {
      this.props.dispatch(loginLanguage(result.data, this.props.intlData.setlocale));
      var obj = {
        // uid : result.data._id,
        categoryId : this.props.params.cid
      };
      this.props.dispatch( getCategoryData(obj, '/admin/category/edit/'+obj.categoryId) ).then(res => this.setdata(res));
      this.props.dispatch( CategoryStore({ uid: result.data._id }) );
    }
  }

  setdata(result){
    //console.log("Data from DB", result.data);
    this.props.dispatch( CategoryStore(new DataObject(result.data)) );
  }

  clear(){
    this.props.dispatch(ClearCat());
  }

  save = (event) => {
    //console.log("this.form === ",this.form);
    var response = Validator.validate(this.form, this.schema, null, this.context.intl);
    if(response.error.length > 0){
      this.schema = response.schema;
      this.props.dispatch( UpdateCategorySchema(this.schema) );
    }else{
      this.setState({ activeIcon : event.currentTarget.id});
      this.props.dispatch( SaveCategoryRequest(this.form) ).then(res => this.setresponse(res));
    }
  }

  setresponse = (response) => {
    if(response.status){
      browserHistory.push('/admin/category/view/'+response.data._id);
    }else{
      this.setState({ activeIcon : null});
      this.refs.corporate_container.error(`${response.error} `, ``);
      this.props.dispatch(ClearCat());
    }
  }

  view = () => {
    var categoryId = this.props.params.cid;
    browserHistory.push('/admin/category/view/'+categoryId);
  }

  datareceive(data) {
   // console.log(data);
    this.form = data;
  }

  render() {

    /*if(this.props.loggedInData.data){

        this.name = this.props.loggedInData.data.firstname + ' ' + this.props.loggedInData.data.lastname;
        this.email = this.props.loggedInData.data.email;
        // console.log(strName);
    }
*/
    let clsContainerRight = `${styles.containerRight} pull-right`;

    if(this.props.categoryData.data){
      //console.log("this.props.corporateData.data === ",this.props.corporateData.data);
        return (
          <div>
            <ToastContainer
              toastMessageFactory={ToastMessageFactory}
              ref="corporate_container"
              className="toast-top-right"
            />
            <ContainerComponent data={this.schema}
              submenu={this.submenu}
              topmenu={this.mainmenu}
              dataFun = {this.datareceive}
              dataobject = {this.props.categoryData.data}
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
    categoryData: categoryData(state),
    intlData: intlData(state)
  };
}

EditCategory.propTypes = {
  loggedInData: PropTypes.object,
  categoryData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

EditCategory.contextTypes = {
  router: React.PropTypes.object,
  intl: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps)(EditCategory);
