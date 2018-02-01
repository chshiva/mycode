import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

import AuthClient from '../../../../components/AuthController.js';
import { isLoggedIn } from '../../../Login/LoginActions';
import { getCorporateData, UpdateCorporateSchema, DeleteCorporate, ClearCrop } from '../CorporateActions';
import { corporateData } from '../CorporateReducer';
import { loggedInData } from '../../../Login/LoginReducer';
import CorporateView from '../components/CorporateView';
import Validator from '../../../../components/Validator';
import {editCorporateSchema} from '../schema/CorporateSchema';

import SubMenu from '../../../../components/SubMenu';
import TopMenu from '../../../../components/TopMenu';

import {corporateinfoSubMenu, corporateViewMainMenu} from '../schema/CorporateMenu';

// Import Style
import styles from '../../../../components/component.css';

import {Col, Row, Grid} from 'react-bootstrap';
import  {ToastContainer, ToastMessage} from '../../../../lib';
import { loginLanguage } from '../../../Intl/IntlActions';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import { intlData } from '../../../Intl/IntlReducer';  

class ViewCorporate extends Component {
  constructor(props){
    super(props);
    this.state = {loading : true};
    this.mainmenu = corporateViewMainMenu;
    this.schema = editCorporateSchema;

    this.mainmenu.menus[2].action = this.edit.bind(this);//this.save.bind(this);
    this.mainmenu.menus[1].action = this.deleteCorporate.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.corporateData && (nextProps.corporateData.success && nextProps.corporateData.success != "")) {
      this.refs.corporate_container.success(`${nextProps.corporateData.success} `, ``);
    }
  }

  // componentWillMount() {
  //   var corporateId = this.props.params.cid;
  //   this.props.dispatch(isLoggedIn(AuthClient.getSession(), '/admin/corporate/view/'+corporateId)).then(res => this.setdata(res));
  // }

  componentDidMount() {
    this.setdata(this.props.loggedInData);

    // Change By - Najib, Desc - Calling setLoading in promise to set state after receiving response from server
    if(_.isEmpty(this.props.corporateData.data) || this.props.params.cid != this.props.corporateData.data._id) {
      this.setState({loading : true}); 
    } else {         
      this.setState({loading : false});
    }
    this.props.dispatch(getCorporateData(this.props.params.cid))
        .then(res=>this.setLoading());
  }

  setLoading() {
    //console.log("At set loading");
    this.props.dispatch(ClearCrop())
    this.setState({ loading : false });
  }

  setdata(result){
    if (result && result.data && result.data._id) {
      this.props.dispatch(loginLanguage(result.data, this.props.intlData.setlocale));
    }
    if(this.state.loading) {
      this.setState({loading : false});  
    }
  }

  clear(){
    this.props.dispatch(ClearCrop());
  }

  edit = () => {
    var response = Validator.freeError(this.schema);
    if(response){
      this.props.dispatch(UpdateCorporateSchema(response));
      var corporateId = this.props.params.cid;  
      browserHistory.push('/admin/corporate/edit/'+corporateId);
    }
  }

  deleteCorporate = () => {
    var corporateId = this.props.params.cid;
    var props = this.props;    
    var response = this.setdeleteresponse

    alertify.confirm(this.props.intl.messages.warning,this.props.intl.messages.delete_corporate_alert, 
      function (result) {
        if(result) {          
          props.dispatch(DeleteCorporate(corporateId)).then(res => response(res)); 
        }
      },
      function() {

      }
    ).setting('labels',{'ok': this.props.intl.messages.ok,'cancel': this.props.intl.messages.cancel});
  }

  setdeleteresponse = (response) => {
    /*console.log("deleted enter");
    console.log("response on delete === ",response);*/
    if(response.status){
      browserHistory.push('/admin/corporate/list');
    }else if(response.error){
      this.refs.corporate_container.error(`${response.error} `, ``);
    }
  }

  render() {
    //let clsContainerRight = `${styles.containerRight} pull-right`;
    let cls_container = `${styles.iContainer} ${styles.oContainer} pull-right`;
    let cls_topmenu = `${styles.iTopMenu} ${styles.oTopMenu}`;
    let cls_isubmenu = `${styles.iSubMenu} {styles.oSubMenu}`;
    let submenu = Validator.activeSubMenu(corporateinfoSubMenu, "lnkCorporate");
    return (
      
      <div className={cls_container}>
        <div className={cls_topmenu}>
          <h3 className=""><FormattedMessage id='corporate_directory'/></h3>
          <div className={styles.dynamicBreadCrumb}>
            <ul>
              <li><Link to="/admin/corporate/list"><FormattedMessage id='all_corporates'/></Link></li>
              <li>/</li>
              <li>{this.props.corporateData && this.props.corporateData.data ? this.props.corporateData.data.businessName :null}</li>
            </ul>
          </div>
          <TopMenu data={corporateViewMainMenu} />
        </div>
  

        <div className={cls_isubmenu}>
          <SubMenu data={submenu} />
        </div>

        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="corporate_container"
          className="toast-top-right"
        />
        <CorporateView corporateData={this.props.corporateData.data} loading={this.state.loading} />      
      </div> 
      
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    intl: state.intl,
    loggedInData: loggedInData(state),
    corporateData : corporateData(state),
    intlData: intlData(state)
  };
}

ViewCorporate.propTypes = {
  loggedInData: PropTypes.object,
  corporateData : PropTypes.object,
  dispatch : PropTypes.func.isRequired
};

ViewCorporate.contextTypes = {
  router : React.PropTypes.object,
  intl: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps)(ViewCorporate);
