import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import AuthClient from '../../../../components/AuthController';
import Validator from '../../../../components/Validator';
import DataObject from '../../../../components/DataObject';
import { isLoggedIn } from '../../../Login/LoginActions';
import { loggedInData } from '../../../Login/LoginReducer';

import { SaveCorporate, CorporateStore, UpdateCorporateSchema, ClearCrop } from '../CorporateActions';
import { corporateData } from '../CorporateReducer';

import ContainerComponent from '../../../../components/ContainerComponent';

import {corporateSchema} from '../schema/CorporateSchema';
import {corporateNewSubMenu, corporateNewMainMenu} from '../schema/CorporateMenu';

// Import Style
import styles from '../../Admin.css';
import style from '../../../../components/component.css';

import {Col, Row, Grid} from 'react-bootstrap';
import  {ToastContainer, ToastMessage} from '../../../../lib';
import { loginLanguage } from '../../../Intl/IntlActions';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import { intlData } from '../../../Intl/IntlReducer';

var dataObject = {};

class CreateCorporate extends Component {
  constructor(props){
    super(props);
    this.name = '';
    this.email = '';
    this.form = null;
    this.datareceive = this.datareceive.bind(this);

    this.schema = corporateSchema;

    this.res = {};
    // this.state.schema = this.schema;

    this.submenu = Validator.activeSubMenu(corporateNewSubMenu, "lnkCorporate");   
    this.mainmenu = corporateNewMainMenu;

    this.mainmenu.menus[1].action = this.save.bind(this);//this.save.bind(this);
    this.state = {
      activeIcon : null
    }
  }

  componentDidMount() {
      // this.props.dispatch(isLoggedIn(AuthClient.getSession(), 
      //               '/admin/corporate/new')).then(res => this.setdata(res));
      this.setdata(this.props.loggedInData);
  }

  setdata(result){
    if (result && result.data && result.data._id) {
      this.props.dispatch(loginLanguage(result.data, this.props.intlData.setlocale));
        this.props.dispatch(UpdateCorporateSchema(this.schema));
        this.props.dispatch(CorporateStore({ uid: result.data._id }));
    }
  }

  save = (event) => {
    var response = Validator.validate(this.form, this.schema, null, this.context.intl);
    if(response.error.length > 0){
      this.schema = response.schema;
      this.props.dispatch(UpdateCorporateSchema(this.schema));
    }else{
      this.setState({ activeIcon : event.currentTarget.id});
      let phno = this.form['phoneNo'];
      phno.splice(2, 1);
      let cphno = this.form['contactDetails.phoneNo'];
      cphno.splice(2, 1);
      this.form['phoneNo'] = phno;
      this.form['contactDetails.phoneNo'] = cphno;
      this.props.dispatch(SaveCorporate(this.form)).then(res => this.setresponse(res));
    }
  }

  setresponse = (response) => {
    if(response.status){
      browserHistory.push('/admin/corporate/view/'+response.id);
    }else{
      this.setState({ activeIcon : null});
      this.refs.corporate_container.error(`${response.error} `, ``);
    }
  }

  datareceive(data) {
    this.form = data;
    //console.log("data === ",data);
  }

  render() {
      var bredcrumb = (
     <div className={style.dynamicBreadCrumb}>
        <ul>
           <li><Link to="/admin/corporate/list"><FormattedMessage id='all_corporates'/></Link></li>
            <li>/</li>
            <li><FormattedMessage id ='new_corporate'/></li>
        </ul>
      </div>
      )
    if(this.props.corporateData && this.props.corporateData.data){
        dataObject = this.props.corporateData.data;
    }
    return (
      <div>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="corporate_container"
          className="toast-top-right"
        />
        <ContainerComponent data={ this.props.corporateData.schema }
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
    corporateData: corporateData(state),
    intlData: intlData(state)
  };
}

CreateCorporate.propTypes = {
  loggedInData: PropTypes.object,
  corporateData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

CreateCorporate.contextTypes = {
  router: React.PropTypes.object,
  intl: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps)(CreateCorporate);
