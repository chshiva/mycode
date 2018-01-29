import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import AuthClient from '../../../../components/AuthController';
import DataObject from '../../../../components/DataObject';
import { isLoggedIn } from '../../../Login/LoginActions';
import { loggedInData } from '../../../Login/LoginReducer';
import { SaveLocation, LocationStore, getLocationData, UpdateLocationSchema } from '../LocationActions';
import { locationData } from '../LocationReducer';
import Validator from '../../../../components/Validator';

import ContainerComponent from '../../../../components/ContainerComponent';
import { participantEditLocationSchema } from '../schema/LocationSchema';
import { locationEditSubMenu, locationEditMainMenu } from '../schema/LocationMenu';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);

// Import Style
import styles from '../../Admin.css';

import {Col, Row, Grid} from 'react-bootstrap';


class EditLocation extends Component {
  constructor(props){
    super(props);
    this.form = null;
    this.datareceive = this.datareceive.bind(this);

    this.schema = participantEditLocationSchema;
    this.res = {};
    
    this.submenu = Validator.activeSubMenu(locationEditSubMenu, "lnkMyLocation");   
    this.mainmenu = locationEditMainMenu;

    this.mainmenu.menus[1].action = this.save.bind(this);//this.save.bind(this);
    this.mainmenu.menus[0].action = this.cancel.bind(this);
    this.state = {
      activeIcon : null
    };
  }

  componentDidMount() {
    this.setlocationdata(this.props.loggedInData);    
  }
  
  setlocationdata(result){
    //console.log("result === ",result);
    if (result && result.data && result.data._id) {
      let locationId = this.props.params.cid
      this.props.dispatch(getLocationData(locationId, '/admin/location/edit/' + locationId)).then(res => this.setdata(res));
      this.props.dispatch(LocationStore({ uid: result.data._id, _id : locationId }));
    }
  }

  setdata(result){
    // console.log("SETDATA----", result.data)
    this.props.dispatch(LocationStore(new DataObject(result.data)));
  }

  save = (event) => {
    var response = Validator.validate(this.form, this.schema,null,this.context.intl);
    if(response.error.length > 0){
      this.schema = response.schema;
      this.props.dispatch(UpdateLocationSchema(this.schema));
    }else{
      this.setState({ activeIcon : event.currentTarget.id});
      this.props.dispatch(SaveLocation(this.form)).then(res => this.setresponse(res));
    }
  }

  setresponse = (response) => {
    if(!response.status){
      this.refs.location_container.error(`${response.error} `, ``);
    }
    this.setState({ activeIcon : null});
  }

  cancel = () => {
    var locationId = this.props.params.cid;
    browserHistory.push('/admin/location/view/'+locationId);
  }

  datareceive(data) {
   //console.log("datareceived ----- ", data);
    this.form = data;
    this.form["locationId"] = this.props.params.cid;
  }

  render() {
    
    let clsContainerRight = `${styles.containerRight} pull-right`;

    if(this.props.locationData.data){
      return (
        <div>
          <ToastContainer
            toastMessageFactory={ToastMessageFactory}
            ref="location_container"
            className="toast-top-right"
          />
          <ContainerComponent data={this.schema}
            submenu={this.submenu}
            topmenu={this.mainmenu}
            dataFun = {this.datareceive}
            dataobject = {this.props.locationData.data}
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
    locationData: locationData(state),
  };
}

EditLocation.propTypes = {
  loggedInData: PropTypes.object,
  locationData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

EditLocation.contextTypes = {
  router: React.PropTypes.object,
  intl: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps)(EditLocation);
