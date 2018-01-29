import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
//import { Link } from 'react-router';

import AuthClient from '../../../../components/AuthController';
import DataObject from '../../../../components/DataObject';
import { isLoggedIn } from '../../../Login/LoginActions';
import { loggedInData } from '../../../Login/LoginReducer';
import Validator from '../../../../components/Validator';

import { SaveLocation, LocationStore, UpdateLocationSchema, ClearLocation } from '../LocationActions';
import { locationData } from '../LocationReducer';

import ContainerComponent from '../../../../components/ContainerComponent';

import {participantLocationSchema} from '../schema/LocationSchema';
import {locationNewSubMenu, locationNewMainMenu} from '../schema/LocationMenu';

// Import Style
import styles from '../../Admin.css';

import {Col, Row, Grid} from 'react-bootstrap';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);

var dataObject = {};

class CreateLocation extends Component {
  constructor(props){
    super(props);
    this.form = null;
    this.datareceive = this.datareceive.bind(this);
    
    this.schema = participantLocationSchema;
    this.res = {};
    // this.state.schema = this.schema;

    this.submenu = Validator.activeSubMenu(locationNewSubMenu, "lnkNewLocation");     
    this.mainmenu = locationNewMainMenu;

    this.mainmenu.menus[1].action = this.save.bind(this);//this.save.bind(this);
    this.state = {
      role : -1,
      activeIcon : null
    }
  }

  // componentWillMount() {
  //     this.props.dispatch(isLoggedIn(AuthClient.getSession(), 
  //                   '/admin/room/new')).then(res => this.setdata(res));
  // }

  componentDidMount() {
    this.setdata(this.props.loggedInData);    
  }

  setdata(result){
    if (result && result.data && result.data._id) {
      this.props.dispatch(UpdateLocationSchema(this.schema));
      this.props.dispatch(LocationStore({uid: result.data._id }));
      this.setState({ role : result.data.role });
    }
  }

  save = (event) => {
    //console.log(this.form);
    var response = Validator.validate(this.form, this.schema, this.state.role,this.context.intl);
    if(response.error.length > 0){
      this.schema = response.schema;
      this.props.dispatch(UpdateLocationSchema(this.schema));
      //console.log("error in response ===  ",response);
    }else{
      this.setState({ activeIcon : event.currentTarget.id});
      this.props.dispatch(SaveLocation(this.form)).then(res => this.setresponse(res));
    }
  }

  setresponse = (response) => {
    if(response.status){
      this.refs.location_container.success(`${response.message} `, ``);
    }else{
      this.refs.location_container.error(`${response.error} `, ``);
    }
    this.setState({ activeIcon : null});
  }

  datareceive(data) {
    this.form = data;
  }

  render() {
    if(this.props.locationData && this.props.locationData.data){
        dataObject = this.props.locationData.data;
    }
    return (
      <div>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="location_container"
          className="toast-top-right"
        />
        <ContainerComponent data={this.props.locationData.schema }
          submenu={this.submenu}
          topmenu={this.mainmenu}
          dataFun = {this.datareceive}
          dataobject = {this.props.locationData.data}
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
    locationData: locationData(state),
  };
}

CreateLocation.propTypes = {
  loggedInData: PropTypes.object,
  locationData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

CreateLocation.contextTypes = {
  router: React.PropTypes.object,
  intl: React.PropTypes.object.isRequired
};


export default connect(mapStateToProps)(CreateLocation);
