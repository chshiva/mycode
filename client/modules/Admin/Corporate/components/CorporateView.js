import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';


import {Col, Row, Grid} from 'react-bootstrap';

import styles from '../../Admin.css';
import Loading from '../../../App/components/Loading';

export class CorporateView extends Component {

  constructor(props) {
    super(props);    
  }
  
  render() {
    this.clsContainerRight = `${styles.containerRight} pull-right`;
    if(this.props.corporateData){
      this.businesId = this.props.corporateData.businessId;
      this.businessName = this.props.corporateData.businessName;
      this.businessType = this.props.corporateData.businessType;
      this.phoneNo = this.props.corporateData.phoneNo;
      this.website = this.props.corporateData.websiteAddr;
      this.companyStatus = this.props.corporateData.companyStatus;
      this.scheduleType = this.props.corporateData.scheduleType;
      if(this.props.corporateData.contactDetails){
        this.contactDetails = this.props.corporateData.contactDetails;
      }
      if(this.props.corporateData.address){
        this.address = this.props.corporateData.address;
      }
      // if(this.props.corporateData.licenses){
      //   this.licenses = this.props.corporateData.licenses;
      // }
      if(this.props.corporateData.legalDocuments){
        this.legalDocuments = this.props.corporateData.legalDocuments;
      }
    }
    let cls_inlineEditGroup = `${styles.inlineEditGroup} clearfix`;
    let loadType = 'list';
    
    return (
      <div className={styles.midContainer}>
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
                    <p><FormattedMessage id='title_company_details' />.</p>
                  </div>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <div className={styles.formField}>
                  <h2><FormattedMessage id='company_details' /></h2>
                  <div className={styles.txtContainer}>
                    <div className={cls_inlineEditGroup}>
                      <label htmlFor="Business Id"><FormattedMessage id='business_id' />:</label>
                      <div className={styles.inlineEdit}>{this.businesId ? this.businesId : "-"}</div>
                    </div>
                    <div className={cls_inlineEditGroup}>
                      <label htmlFor="Business Name"><FormattedMessage id='business_name' />:</label>
                      <div className={styles.inlineEdit}>{this.businessName ? this.businessName : "-"}</div>
                    </div>
                    <div className={cls_inlineEditGroup}>
                      <label htmlFor="Business Type"><FormattedMessage id='business_type' />:</label>
                      <div className={styles.inlineEdit}>{this.businessType ? this.businessType : "-"}</div>
                    </div>
                    <div className={cls_inlineEditGroup}>
                      <label htmlFor="Phone Number"><FormattedMessage id='phone' />:</label>
                      <div className={styles.inlineEdit}>{this.phoneNo ? this.phoneNo[1] : "-"}</div>
                    </div>
                    <div className={cls_inlineEditGroup}>
                      <label htmlFor="Web Site"><FormattedMessage id='website' />:</label>
                      <div className={styles.inlineEdit}>{this.website ? this.website : "-"}</div>
                    </div>
                    <div className={cls_inlineEditGroup}>
                      <label htmlFor="Company Status"><FormattedMessage id='company_status' />:</label>
                      <div className={styles.inlineEdit}>{this.companyStatus ? this.companyStatus : "-"}</div>
                    </div>
                    <div className={cls_inlineEditGroup}>
                      <label htmlFor="Schedule Type"><FormattedMessage id='schedule_type' />:</label>
                      <div className={styles.inlineEdit}>{this.scheduleType ? this.scheduleType : "-"}</div>
                    </div>
                  </div>
                </div>
                <div className={styles.formField}>
                  <h2><FormattedMessage id='contact_details' /></h2>
                  <div className={styles.txtContainer}>
                    <div className={cls_inlineEditGroup}>
                      <label htmlFor="Name"><FormattedMessage id='name' />:</label>
                      <div className={styles.inlineEdit}>{this.contactDetails ? (this.contactDetails.name ? this.contactDetails.name : "-") : "-"}</div>
                    </div>
                    <div className={cls_inlineEditGroup}>
                      <label htmlFor="Phone Number"><FormattedMessage id='phone' />:</label>
                      <div className={styles.inlineEdit}>{this.contactDetails ? (this.contactDetails.phoneNo ? this.contactDetails.phoneNo[1] : "-") : "-"}</div>
                    </div>
                    <div className={cls_inlineEditGroup}>
                      <label htmlFor="E-mail"><FormattedMessage id='email' />:</label>
                      <div className={styles.inlineEdit}>{this.contactDetails ? (this.contactDetails.email ? this.contactDetails.email : "-") : "-"}</div>
                    </div>
                  </div>
                </div>
              </Col>

              <Col md={6}>
                <div className={styles.formField}>
                  <h2><FormattedMessage id='address' /></h2>
                  <div className={styles.txtContainer}>
                    <div className={cls_inlineEditGroup}>
                      <label htmlFor="Street"><FormattedMessage id='street' />:</label>
                      <div className={styles.inlineEdit}>{this.address ? (this.address.street ? this.address.street : "-") : "-"}</div>
                    </div>
                    <div className={cls_inlineEditGroup}>
                      <label htmlFor="District"><FormattedMessage id='district' />:</label>
                      <div className={styles.inlineEdit}>{this.address ? (this.address.district ? this.address.district : "-") : "-"}</div>
                    </div>
                    <div className={cls_inlineEditGroup}>
                      <label htmlFor="State"><FormattedMessage id='state' />:</label>
                      <div className={styles.inlineEdit}>{this.address ? (this.address.state ? this.address.state : "-") : "-"}</div>
                    </div>
                    <div className={cls_inlineEditGroup}>
                      <label htmlFor="Country"><FormattedMessage id='country' />:</label>
                      <div className={styles.inlineEdit}>{this.address ? (this.address.country ? this.address.country : "-") : "-"}</div>
                    </div>
                    <div className={cls_inlineEditGroup}>
                      <label htmlFor="Pincode"><FormattedMessage id='pincode' />:</label>
                      <div className={styles.inlineEdit}>{this.address ? (this.address.pincode ? this.address.pincode : "-") : "-"}</div>
                    </div>
                  </div>
                </div>
                {/*<div className={styles.formField}>
                                  <h2><FormattedMessage id='license_details' /></h2>
                                  <div className={styles.txtContainer}>
                                    <div className={cls_inlineEditGroup}>
                                      <label htmlFor="Publish Limit"><FormattedMessage id='publish_limit' />:</label>
                                      <div className={styles.inlineEdit}>{this.licenses ? (this.licenses.publishLimit ? this.licenses.publishLimit : "-") : "-"}</div>
                                    </div>
                                    <div className={cls_inlineEditGroup}>
                                      <label htmlFor="Room Limit"><FormattedMessage id='room_limit' />:</label>
                                      <div className={styles.inlineEdit}>{this.licenses ? (this.licenses.roomLimit ? this.licenses.roomLimit : "-") : "-"}</div>
                                    </div>
                                    <div className={cls_inlineEditGroup}>
                                      <label htmlFor="No. of P2P"><FormattedMessage id='no_p2p' />:</label>
                                      <div className={styles.inlineEdit}>{this.licenses ? (this.licenses.noOfP2P ? this.licenses.noOfP2P : "-") : "-"}</div>
                                    </div>
                                    <div className={cls_inlineEditGroup}>
                                      <label htmlFor="Subscriber Limit"><FormattedMessage id='subscriber_limit' />:</label>
                                      <div className={styles.inlineEdit}>{this.licenses ? (this.licenses.subscriberLimit ? this.licenses.subscriberLimit : "-") : "-"}</div>
                                    </div>
                                    <div className={cls_inlineEditGroup}>
                                      <label htmlFor="Users Limit"><FormattedMessage id='users_limit' />:</label>
                                      <div className={styles.inlineEdit}>{this.licenses ? (this.licenses.usersLimit ? this.licenses.usersLimit : "-") : "-"}</div>
                                    </div>
                                  </div>
                                </div>*/}
                <div className={styles.formField}>
                  <h2><FormattedMessage id='legal_doc_details' /></h2>
                  <div className={styles.txtContainer}>
                    <div className={cls_inlineEditGroup}>
                      <label htmlFor="Pan Number"><FormattedMessage id='pan_number' />:</label>
                      <div className={styles.inlineEdit}>{this.legalDocuments ? (this.legalDocuments.panNumber ? this.legalDocuments.panNumber : "-") : "-"}</div>
                    </div>
                    <div className={cls_inlineEditGroup}>
                      <label htmlFor="Tan Id"><FormattedMessage id='tan_id' />:</label>
                      <div className={styles.inlineEdit}>{this.legalDocuments ? (this.legalDocuments.tanID ? this.legalDocuments.tanID : "-") : "-"}</div>
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

CorporateView.contextTypes = {
  router: React.PropTypes.object,
};

CorporateView.propTypes = {
  corporateData: PropTypes.object,
  intl: PropTypes.object,
};

export default CorporateView;
