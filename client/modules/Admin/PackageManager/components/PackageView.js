import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';


import {Col, Row, Grid} from 'react-bootstrap';

import styles from '../../Admin.css';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import Loading from '../../../App/components/Loading';


export class PackageView extends Component {

  componentWillReceiveProps(nextProps) {
    if(nextProps.success && nextProps.success != "") {
      this.refs.container.success(`${nextProps.success} `, ``);
    }
  }
  
  constructor(props) {
    super(props);    
  }
  
  render() {

    this.clsContainerRight = `${styles.containerRight} pull-right`;
    let features = '-';
    let loadType = 'list';
    if(this.props.packageData){
      this.packageName = this.props.packageData.packageName;
      this.packagePrice = this.props.packageData.packagePrice;
      this.userCount = this.props.packageData.userCount;
      this.roomCount = this.props.packageData.roomCount;
      this.topicCount = this.props.packageData.topicCount;
      this.continuousPresence = this.props.packageData.continuousPresence;
      this.packageStartDate = moment(this.props.packageData.createdAt).format('DD/MM/YYYY');
      // this.features = this.props.packageData.features;
      if(this.props.packageData.features){
        features = this.props.packageData.features.map(function(doc){
          return(<div key={doc}> {doc} </div>);
        });
      }
      
      let pkgVal = this.props.packageData.packageValidity;
      pkgVal = moment(pkgVal).format('DD/MM/YYYY');
      this.packageValidity = pkgVal;
      this.location = this.props.packageData.location;
      if (this.props.packageData && this.props.packageData.assignedTo && this.props.packageData.assignedTo != 'undefined') {
        this.assignedTo = this.props.packageData.assignedTo.firstname + " " + this.props.packageData.assignedTo.lastname;
      };
      // console.log(this.props.packageData);
      // this.assignedTo = this.props.packageData.assignedTo;
    }
    let cls_inlineEditGroup = `${styles.inlineEditGroup} clearfix`;
    return (
      <div className={styles.midContainer}>
        <ToastContainer
        toastMessageFactory={ToastMessageFactory}
        ref="container"
        className="toast-top-right"
       />
        <div className={styles.whiteCard}>

        {/*code added by - Najib, Desc - Checking state to set the loading spinner */}
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
                  <p><FormattedMessage id='title_about_package' /></p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <div className={styles.formField}>
                  <h2><FormattedMessage id='package_details' /></h2>
                  <div className={styles.txtContainer}>
                    <div className={cls_inlineEditGroup}>
                      <label htmlFor="Package Name"><FormattedMessage id='package_name' />:</label>
                      <div className={styles.inlineEdit}>{this.packageName ? this.packageName : "-"}</div>
                    </div>
                    {/*<div className={cls_inlineEditGroup}>
                                          <label htmlFor="Package Price"><FormattedMessage id='package_price' />:</label>
                                          <div className={styles.inlineEdit}>{this.packagePrice ? this.packagePrice : "-"}</div>
                                        </div>*/}
                    <div className={cls_inlineEditGroup}>
                      <label htmlFor="User Count"><FormattedMessage id='user_count' />:</label>
                      <div className={styles.inlineEdit}>{this.userCount ? this.userCount : "-"}</div>
                    </div>
                    <div className={cls_inlineEditGroup}>
                      <label htmlFor="Room Count"><FormattedMessage id='no_of_rooms' />:</label>
                      <div className={styles.inlineEdit}>{this.roomCount ? this.roomCount : "-"}</div>
                    </div>
                    {/*<div className={cls_inlineEditGroup}>
                                          <label htmlFor="Topic Count"><FormattedMessage id='no_of_topics' />:</label>
                                          <div className={styles.inlineEdit}>{this.topicCount ? this.topicCount : "-"}</div>
                                        </div>*/}
                    <div className={cls_inlineEditGroup}>
                      <label htmlFor="Continuous Presence"><FormattedMessage id='continuous_presence' />:</label>
                      <div className={styles.inlineEdit}>{this.continuousPresence ? this.continuousPresence : "-"}</div>
                    </div>
                    <div className={cls_inlineEditGroup}>
                      <label htmlFor="Package Valid From"><FormattedMessage id='package_validFrom' />:</label>
                      <div className={styles.inlineEdit}>{this.packageStartDate ? this.packageStartDate : "-"}</div>
                    </div>
                    <div className={cls_inlineEditGroup}>
                      <label htmlFor="Package Validity"><FormattedMessage id='package_validity' />:</label>
                      <div className={styles.inlineEdit}>{this.packageValidity ? this.packageValidity : "-"}</div>
                    </div>
                    <div className={cls_inlineEditGroup}>
                      <label htmlFor="Server Location"><FormattedMessage id='server_location' />:</label>
                      <div className={styles.inlineEdit}>{this.location ? this.location : "-"}</div>
                    </div>
                    <div className={cls_inlineEditGroup}>
                      <label htmlFor="Assigned To"><FormattedMessage id='assigned_to' />:</label>
                      <div className={styles.inlineEdit}>{this.assignedTo ? this.assignedTo : "-"}</div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <div className={styles.formField}>
                  <h2><FormattedMessage id='feature_info' /></h2>
                  <div className={styles.txtContainer}>
                    <div className={cls_inlineEditGroup}>
                      <label htmlFor="Features"><FormattedMessage id='features' />:</label>
                      <div className={styles.inlineEdit}>{features}</div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Grid> }
        </div>
      </div>
    );
  }
  
}

PackageView.contextTypes = {
  router: React.PropTypes.object,
};

PackageView.propTypes = {
  packageData: PropTypes.object,
  intl: PropTypes.object,
};

export default PackageView;
