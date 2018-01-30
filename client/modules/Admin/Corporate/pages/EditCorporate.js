import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import AuthClient from '../../../../components/AuthController';
import DataObject from '../../../../components/DataObject';
import { isLoggedIn } from '../../../Login/LoginActions';
import { loggedInData } from '../../../Login/LoginReducer';
import Validator from '../../../../components/Validator';

import { SaveCorporate, CorporateStore, getCorporateData, UpdateCorporateSchema, ClearCrop } from '../CorporateActions';
import { corporateData } from '../CorporateReducer';

import ContainerComponent from '../../../../components/ContainerComponent';
import { editCorporateSchema } from '../schema/CorporateSchema';
import { corporateEditSubMenu, corporateEditMainMenu } from '../schema/CorporateMenu';

// Import Style
import styles from '../../Admin.css';
import style from '../../../../components/component.css';
import {Col, Row, Grid} from 'react-bootstrap';
import  {ToastContainer, ToastMessage} from '../../../../lib';
import { loginLanguage } from '../../../Intl/IntlActions';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import { intlData } from '../../../Intl/IntlReducer';

class EditCorporate extends Component {
  constructor(props){
    super(props);
    this.form = null;
    this.datareceive = this.datareceive.bind(this);

    this.schema = editCorporateSchema;
    this.res = {};
    this.roomName = '';
    
    this.submenu = Validator.activeSubMenu(corporateEditSubMenu, "lnkCorporate");    
    this.mainmenu = corporateEditMainMenu;

    this.mainmenu.menus[1].action = this.save.bind(this);//this.save.bind(this);
    this.mainmenu.menus[0].action = this.view.bind(this);
    this.state = {
      activeIcon : null
    }
  }

  // componentWillMount() {
  //   var corporateId = this.props.params.cid;
  //   this.props.dispatch( isLoggedIn(AuthClient.getSession(), 
  //                       '/admin/corporate/edit/'+corporateId) ).then(res => this.setuserdata(res));
  // }

  componentDidMount() {
    this.setuserdata(this.props.loggedInData);
    this.props.dispatch( getCorporateData(this.props.params.cid) ).then(res => this.setdata(res));
  }

  setuserdata(result){
    //console.log("result === ",result);
    if (result && result.data && result.data._id) {
      this.props.dispatch(loginLanguage(result.data, this.props.intlData.setlocale));
      this.props.dispatch( CorporateStore({ uid: result.data._id }) );
    }
  }

  setdata(result){
    this.roomName = result.data.businessName;
    //console.log("Data from DB", result.data);
    this.props.dispatch( CorporateStore(new DataObject(result.data)) );
  }

  save = (event) => {
    //console.log("this.form === ",this.form);
    var response = Validator.validate(this.form, this.schema,null, this.context.intl);
    if(response.error.length > 0){
      this.schema = response.schema;
      let data = {};
      data['businessType'] = this.props.corporateData.data.businessType;

      this.props.dispatch( UpdateCorporateSchema(this.schema, data) );
    } else {
      this.setState({ activeIcon : event.currentTarget.id});
      let phno = this.form['phoneNo'];
      phno.splice(2, 1);
      let cphno = this.form['contactDetails.phoneNo'];
      cphno.splice(2, 1);
      this.form['phoneNo'] = phno;
      this.form['contactDetails.phoneNo'] = cphno;
      this.props.dispatch( SaveCorporate(this.form) ).then(res => this.setresponse(res));
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

  view = () => {
    var corporateId = this.props.params.cid;
    browserHistory.push('/admin/corporate/view/'+corporateId);
  }

  datareceive(data) {
   // console.log(data);
    this.form = data;
  }

  render() {
      var bredcrumb = (
     <div className={style.dynamicBreadCrumb}>
        <ul>
           <li><Link to="/admin/corporate/list"><FormattedMessage id='all_corporates'/></Link></li>
            <li>/</li>
            <li><Link onClick={this.view}>{this.roomName ? this.roomName :null}</Link></li>
            <li>/</li>
            <li><FormattedMessage id ='edit_corporate'/></li>
        </ul>
      </div>
      )
    
    let clsContainerRight = `${styles.containerRight} pull-right`;

    if(this.props.corporateData.data){
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
              bredCrumb={bredcrumb}
              dataFun = {this.datareceive}
              dataobject = {this.props.corporateData.data}
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
    corporateData: corporateData(state),
    intlData: intlData(state)
  };
}

EditCorporate.propTypes = {
  loggedInData: PropTypes.object,
  corporateData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

EditCorporate.contextTypes = {
  router: React.PropTypes.object,
  intl: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps)(EditCorporate);
