import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';

import {Col, Row, Grid} from 'react-bootstrap';

import styles from '../../Admin.css';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import Loading from '../../../App/components/Loading';

export class LocationView extends Component {

  // componentWillReceiveProps(nextProps) {
  //   if(nextProps.success && nextProps.success != "") {
  //     this.refs.location_container.success(`${nextProps.success} `, ``);
  //   }
  //   if(nextProps.error && nextProps.error.length > 0) {
  //     this.refs.location_container.error(`${nextProps.error} `, ``);
  //   }
  //   this.props.clear;
  // }

  render(){
    this.clsContainerRight = `${styles.containerRight} pull-right`;
    if(this.props.locationData){
      this.locationName = this.props.locationData.locationName;
      this.description = this.props.locationData.description;
    }
    let cls_inlineEditGroup = `${styles.inlineEditGroup} clearfix`;
    let loadType = 'list';

    return (
      <div className={styles.midContainer}>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="container"
          className="toast-top-right"
         />
         <div className={styles.whiteCard}>
         { this.props.loading?
            <div className={styles.mainSpinBlock} >
              <div className={styles.innerSpinBlock} >
                <Loading loadType = {loadType}/>
              </div>
            </div> :
          <Grid fluid={true}>
            <Row>
              <Col md={12}>
                <div className={styles.infoTxt}>
                  <p><FormattedMessage id='title_created_location_details' /></p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <div className={styles.formField}>
                  <h2><FormattedMessage id='location_info' /></h2>
                  <div className={styles.txtContainer}>
                    
                    <div className={cls_inlineEditGroup}>
                      <label htmlFor="Location Name"><FormattedMessage id='location_name' />:</label>
                      <div className={styles.inlineEdit}>{this.locationName ? this.locationName : "-"}</div>
                    </div>
                    <div className={cls_inlineEditGroup}>
                      <label htmlFor="Description"><FormattedMessage id='desc' />:</label>
                      <div className={styles.inlineEdit}>{this.description ? this.description : "-"}</div>
                    </div>
                  </div>
                  <hr className={styles.mobHr} />
                </div>
              </Col>
            </Row>
          </Grid> }
        </div>
      </div>
    );
  }
}

LocationView.contextTypes = {
  router: React.PropTypes.object,
};

LocationView.propTypes = {
  locationData: PropTypes.object,
  intl: PropTypes.object,
  error : PropTypes.array,
  success : PropTypes.string,
  clear: PropTypes.func
};

export default LocationView;