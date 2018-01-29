import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

import AuthClient from '../../../../components/AuthController.js';
import { isLoggedIn } from '../../../Login/LoginActions';
import { getLocationData, UpdateLocationSchema, DeleteLocation, ClearLocation } from '../LocationActions';
import { locationData } from '../LocationReducer';
import { loggedInData } from '../../../Login/LoginReducer';
import LocationView from '../components/LocationView';
import Validator from '../../../../components/Validator';
import {participantLocationSchema} from '../schema/LocationSchema';

import SubMenu from '../../../../components/SubMenu';
import TopMenu from '../../../../components/TopMenu';

import {locationViewSubMenu, locationViewMainMenu} from '../schema/LocationMenu';

// Import Style
import styles from '../../../../components/component.css';

import {Col, Row, Grid} from 'react-bootstrap';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);   
import  {ToastContainer, ToastMessage} from '../../../../lib';

class ViewLocation extends Component {
  constructor(props){
    super(props);
    this.state = {loading : true};
    this.mainmenu = locationViewMainMenu;
    this.schema = participantLocationSchema;

    this.mainmenu.menus[2].action = this.edit.bind(this);//this.save.bind(this);
    this.mainmenu.menus[1].action = this.deleteLocation.bind(this);

    this.submenu = Validator.activeSubMenu(locationViewSubMenu, "lnkviewLocation");
    this.submenu.menus[0].action = this.locationview.bind(this);
  
  }

  componentDidMount() {
    this.setdata(this.props.loggedInData);    
  }

  setdata(result){
    if (result && result.data && result.data._id) {
      var locationId = this.props.params.cid;

      // Change By - Najib, Desc - Calling setLoading in promise to set state after receiving response from server
    if(_.isEmpty(this.props.locationData.data) || locationId != this.props.locationData.data._id) {
      this.setState({loading : true}); 
    } else {       
      this.setState({loading : false});
    }
      this.props.dispatch(getLocationData(locationId, '/admin/location/view/'+locationId)).then(res =>this.setResponse(res));
    }
  }

  setResponse = (response) => {
    if(!response.status){
      this.refs.location_container.error(`${response.error} `, ``);
    }
    if(this.state.loading) {
      this.setState({loading : false});  
    }
  }

  clear() {
    this.props.dispatch( ClearLocation());
  }

  edit = () => {
    var response = Validator.freeError(this.schema);
    if(response){
      this.props.dispatch(UpdateLocationSchema(response));
      var locationId = this.props.params.cid;  
      browserHistory.push('/admin/location/edit/'+locationId);
    }
  }

  deleteLocation = () => {
    var locationId = this.props.params.cid;
    var props = this.props;
    
    alertify.confirm(this.props.intl.messages.warning,this.props.intl.messages.delete_location_alert, 
      function (result) {
        if(result) {          
          let obj = {
            // uid : props.loggedInData.data._id,
            locationId : locationId
          }
          props.dispatch(DeleteLocation(obj, '/admin/location/view/'+locationId))
        }
      },
      function() {

      }
    ).setting('labels',{'ok': this.props.intl.messages.ok,'cancel': this.props.intl.messages.cancel});
  }

  locationview = () => {
    // console.log("ViewRoomSubtab");
    var locationId = this.props.params.cid;
    browserHistory.push('/admin/location/view/'+locationId);
  }


  render() {
    //let clsContainerRight = `${styles.containerRight} pull-right`;
    let cls_container = `${styles.iContainer} ${styles.oContainer} pull-right`;
    let cls_topmenu = `${styles.iTopMenu} ${styles.oTopMenu}`;
    let cls_isubmenu = `${styles.iSubMenu} {styles.oSubMenu}`;

    return (
      
      <div className={cls_container}>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="location_container"
          className="toast-top-right"
        />
        <div className={cls_topmenu}>
          <h3 className=""><FormattedMessage id='location' /></h3>
          <div className={styles.dynamicBreadCrumb}>
            <ul>
              <li><Link to="/admin/location/list"><FormattedMessage id='all_locations'/></Link></li>
              <li>/</li>
              <li>{this.props.locationData.data.locationName}</li>
            </ul>
          </div>
          <TopMenu data={locationViewMainMenu} />
        </div>
        <div className={cls_isubmenu}>
          <SubMenu data={locationViewSubMenu} />
        </div>
        <LocationView locationData={this.props.locationData.data} error = {this.props.locationData.error} success = {this.props.locationData.success} clear = {this.clear} loading = {this.state.loading}/>
      </div>

    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    intl: state.intl,
    locationData : locationData(state),
    loggedInData: loggedInData(state),
  };
}

ViewLocation.propTypes = {
  loggedInData: PropTypes.object,
  locationData : PropTypes.object,
  dispatch : PropTypes.func.isRequired
};

ViewLocation.contextTypes = {
  router : React.PropTypes.object,
  intl: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps)(ViewLocation);
