import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';

import AuthClient from '../../../../components/AuthController';
import Validator from '../../../../components/Validator';
import DataObject from '../../../../components/DataObject';
import { isLoggedIn } from '../../../Login/LoginActions';
import { loggedInData } from '../../../Login/LoginReducer';

import { SaveCategoryRequest, UpdateCategorySchema, CategoryStore, ClearCat } from '../CategoryActions';
import { categoryData } from '../CategoryReducer';

import ContainerComponent from '../../../../components/ContainerComponent';

import {categorySchema} from '../schema/CategorySchema';
import {categoryEditSubMenu, categoryEditMainMenu} from '../schema/CategoryMenu';

// Import Style
import styles from '../../Admin.css';

import {Col, Row, Grid} from 'react-bootstrap';
import  {ToastContainer, ToastMessage} from '../../../../lib';
import { loginLanguage } from '../../../Intl/IntlActions';
import { intlData } from '../../../Intl/IntlReducer';

const ToastMessageFactory = React.createFactory(ToastMessage.animation);

var dataObject = {};

class CreateCorporate extends Component {
  constructor(props){
    super(props);
    this.name = '';
    this.email = '';
    this.form = null;
    this.datareceive = this.datareceive.bind(this);

    this.schema = categorySchema;

    this.res = {};
    // this.state.schema = this.schema;

    this.submenu = Validator.activeSubMenu(categoryEditSubMenu, "lnkNewCategory");  
    this.mainmenu = categoryEditMainMenu;

    this.mainmenu.menus[1].action = this.save.bind(this);
    this.state = {
      activeIcon : null
    }
  }

  componentDidMount() {
      /*this.props.dispatch(isLoggedIn(AuthClient.getSession(), 
                    '/admin/category/new')).then(res => this.setdata(res));*/
    this.setdata(this.props.loggedInData)                
  }

  setdata(result){
    // console.log(result);
    if (result && result.data && result.data._id) {
      this.props.dispatch(loginLanguage(result.data, this.props.intlData.setlocale));
      this.props.dispatch(UpdateCategorySchema(this.schema));
      this.props.dispatch(CategoryStore({ uid: result.data._id }));
    }
  }

  clear(){
    this.props.dispatch(ClearCat());
  }

  save = (event) => {

    //console.log(this.form);

    var response = Validator.validate(this.form, this.schema, null, this.context.intl);
    if(response.error.length > 0){
      this.schema = response.schema;
      this.props.dispatch(UpdateCategorySchema(this.schema));
    }else{
      this.setState({ activeIcon : event.currentTarget.id});
      this.props.dispatch(SaveCategoryRequest(this.form)).then(res => this.setresponse(res));
    }
  }

  setresponse = (response) => {
    if(response.status){
      browserHistory.push('/admin/category/view/'+response.data._id);
    }else{
      this.setState({ activeIcon : null});
      this.refs.category_container.error(`${response.error} `, ``);
    }
  }

  datareceive(data) {
    this.form = data;
    //console.log("data === ",data);
  }

  render() {
    
    if(this.props.categoryData && this.props.categoryData.data){
        dataObject = this.props.categoryData.data;
    }
    return (
      <div>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="category_container"
          className="toast-top-right"
        />
        <ContainerComponent data={ this.props.categoryData.schema }
          submenu={ this.submenu }
          topmenu={ this.mainmenu }
          clear={this.clear}
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
    categoryData: categoryData(state),
    intlData: intlData(state)
  };
}

CreateCorporate.propTypes = {
  loggedInData: PropTypes.object,
  categoryData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

CreateCorporate.contextTypes = {
  router: React.PropTypes.object,
  intl: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps)(CreateCorporate);
