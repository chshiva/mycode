import React, { PropTypes, Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import moment from 'moment';

import AuthClient from '../../../../components/AuthController';
import DataObject from '../../../../components/DataObject';
import { isLoggedIn } from '../../../Login/LoginActions';
import { loggedInData } from '../../../Login/LoginReducer';
import Validator from '../../../../components/Validator';


import { LocationList, LocationStore, UpdateLocationSchema, ClearLocation } from '../LocationActions';
import { locationData } from '../LocationReducer';

import DataTable from '../../../../components/DataTable/DataTable';

import {participantLocationSchema} from '../schema/LocationSchema';
import {locationlistSubMenu, locationListMainMenu} from '../schema/LocationMenu';

// Import Style
import styles from '../../Admin.css';
import componentstyles from '../../../../components/component.css';

import SubMenu from '../../../../components/SubMenu';
import TopMenu from '../../../../components/TopMenu';

import {Col, Row, Grid} from 'react-bootstrap';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);


class ListLocation extends Component {
  constructor(props){
    super(props);
    this.state = {loading : true}
    this.form = null;

    this.schema = participantLocationSchema;
    this.res = {};

    this.submenu = Validator.activeSubMenu(locationlistSubMenu, "lnkListLocation");    
    this.mainmenu = locationListMainMenu;
    this.getData = this.getData.bind(this);

    this.currentPage= 1;
    this.itemsPerPage= 5;
  
    this.userView = this.userView.bind(this);
    this.mainmenu.menus[0].action = this.clearError.bind(this);
  }

  // componentWillMount() {
  //     this.props.dispatch(isLoggedIn(AuthClient.getSession(), 
  //                   '/admin/users/list')).then(res => this.setdata(res));
  // }

  componentDidMount() {
    this.setdata(this.props.loggedInData);    
  }

  /*componentWillReceiveProps(nextProps) {
    console.log("enter will receive");
    let msg = nextProps.success;
    let err = nextProps.error;
    console.log("this---");
    console.log(this);
    console.log(this.refs);
    console.log(msg, err);
    if(msg && msg != "") {
      this.refs.container.success({msg}, '');
    }
    if(err && err.length > 0) {
      this.refs.container.error({err}, '');
    }
  }*/

  componentWillReceiveProps(nextProps) {
    if(nextProps.locationData.success != ''){
      this.refs.user_container.success(`${nextProps.locationData.success} `, ``);
      this.props.dispatch(ClearLocation());
    }
  }

  setdata(result){
    if (result && result.data && result.data._id) {
      //this.props.dispatch(LocationStore({uid: result.data._id }));
      this.getData({
        currentPage  : this.currentPage,
        totalItems   : 0,
        itemsPerPage : this.itemsPerPage,
        uid:result.data._id
      });
    }
  }


  getData(pageParam){
    //pageParam["uid"] = this.props.loggedInData.data._id;

    // Change By - Najib, Desc - Calling setLoading in promise to set state after receiving response from server
    if(_.isEmpty(this.props.locationData.dataList)) {
      this.setState({loading : true}); 
    } else {      
      this.setState({loading : false});
    }
    this.props.dispatch(LocationList(pageParam, pageParam.currentPage)).then(res => this.pageData(res));
  }

  pageData(response){
     //console.log(res);
    if(response.status == false){
      this.refs.user_container.error(`${response.error} `, ``);
    }
    if(this.state.loading) {
      this.setState({loading : false});  
    }
  }

  userView(row){
    let rowId = row._id;
    let viewlink = "/admin/location/view/"+rowId;
    return (
      <Link to={viewlink}><i className="fa fa-eye"></i></Link>
    );
  }
  
  
  showFormattedDate(row){
    return(
      <div>{moment(row.dateAdded).format('DD-MM-YYYY')}</div>
    );
  }
  clearError(){
    var response = Validator.freeValue(this.schema);
    if(response){
      this.props.dispatch(UpdateLocationSchema(response));
      browserHistory.push('/admin/location/new');
    }
  }

  locationDesc(row){
    if(row.description.length > 10) {
      var locationDesc = row.description.substring(0,10) + '...'
      return(
        <div>{locationDesc}</div>
      );
    } else {
      return(
        <div>{row.description}</div>
      );
    }

  }

  showLocationDetails(row){
    let rowId = row._id;
    let link = "/admin/location/view/"+rowId;
    return (
      <Link className = {styles.removeStyle} to={link}><div>{row.locationName} </div></Link>
    );
  }

  render() {
    var bredcrumb = (
       <div className={componentstyles.dynamicBreadCrumb}>
          <ul>
            <li><FormattedMessage id='you_are_in_location_list_panel'/></li>
          </ul>
        </div>
      )
    var objDisp = [
          { title: <FormattedMessage id='location_name' />, type: "function", callback : this.showLocationDetails},
          { title : <FormattedMessage id='description'/>, type : "function", callback : this.locationDesc },
          {title: <FormattedMessage id='view' />, type: "function", callback: this.userView},
        ]; 
    
    return (
      <div>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="user_container"
          className="toast-top-right"
         />
        <DataTable data={this.props.locationData.dataList}
            count={this.props.locationData.count}
            currentPage = {this.props.locationData.currentPage}
            submenu={this.submenu}
            bredCrumb={bredcrumb}
            topmenu={this.mainmenu}
            itemsPerPage={this.itemsPerPage}
            newDataCallback={this.getData}
            dispField={objDisp}
            pageTitle={this.props.intl.messages.location}
            listDescreption={this.props.intl.messages.locations} 
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
    locationData: locationData(state),
  };
}

ListLocation.propTypes = {
  loggedInData: PropTypes.object,
  locationData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

ListLocation.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(ListLocation);
