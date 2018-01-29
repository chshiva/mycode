import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';

import {Col, Row, Grid} from 'react-bootstrap';
import moment from 'moment';
import styles from '../../Admin.css';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import Loading from '../../../App/components/Loading';

export class RoomView extends Component {

  componentWillReceiveProps(nextProps) {
    // if(nextProps.success && nextProps.success != "") {
    //   this.refs.container.success(`${nextProps.success} `, ``);
    // }
    // if(nextProps.error && nextProps.error.length > 0) {
    //   this.refs.container.error(`${nextProps.error} `, ``);
    // }
    // this.props.clear;
  }

  render(){
    this.clsContainerRight = `${styles.containerRight} pull-right`;
    if(this.props.roomData){
      this.selPackage = this.props.roomData.selPackage;
      this.roomName = this.props.roomData.roomName;
      this.roomType = this.props.roomData.roomType;
      this.roomPassword = this.props.roomData.roomPassword;
      this.corporateId = this.props.roomData.corporateId;
      this.hostPassword = this.props.roomData.hostPassword;
      // this.bridgeNumber = this.props.roomData.bridgeNumber;
      this.categoryId = this.props.roomData.categoryId;
      this.expiryDate = this.props.roomData.expiryDate;
    }
    let cls_inlineEditGroup = `${styles.inlineEditGroup} clearfix`;
    let cls_inlineNoCapitalize = `${styles.inlineEdit} ${styles.emailTransCap}`
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
                  <p><FormattedMessage id='title_created_room_details' /></p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <div className={styles.formField}>
                  <h2><FormattedMessage id='basic_info' /></h2>
                  <div className={styles.txtContainer}>
                    <div className={cls_inlineEditGroup}>
                      <label htmlFor="Select Package"><FormattedMessage id='select_package' />:</label>
                      <div className={styles.inlineEdit}>{this.selPackage ? (this.selPackage.packageName ? this.selPackage.packageName : "-") : "-"}</div>
                    </div>
                    <div className={cls_inlineEditGroup}>
                      <label htmlFor="Room Name"><FormattedMessage id='room_name' />:</label>
                      <div className={styles.inlineEdit}>{this.roomName ? this.roomName : "-"}</div>
                    </div>
                    <div className={cls_inlineEditGroup}>
                      <label htmlFor="Room Type"><FormattedMessage id='room_type' />:</label>
                      <div className={styles.inlineEdit}>{this.roomType ? this.roomType : "-"}</div>
                    </div>
                    {/*<div className={cls_inlineEditGroup}>
                                          <label htmlFor="Room Password"><FormattedMessage id='room_password' />:</label>
                                          <div className={styles.inlineEdit}>{this.roomPassword ? this.roomPassword : "-"}</div>
                                        </div>*/}
                  </div>
                  <hr className={styles.mobHr} />
                </div>
              </Col>

              <Col md={6}>
                <div className={styles.formField}>
                  <h2><FormattedMessage id='other_details' /></h2>
                  <div className={styles.txtContainer}>
                    <div className={cls_inlineEditGroup}>
                      <label htmlFor="Corporate Name"><FormattedMessage id='corporate_name' />:</label>
                      <div className={styles.inlineEdit}>{this.corporateId ? (this.corporateId.businessName ? this.corporateId.businessName : "-") : "-"}</div>
                    </div>
                    {/*<div className={cls_inlineEditGroup}>
                                          <label htmlFor="Category Name"><FormattedMessage id='category_name' />:</label>
                                          <div className={styles.inlineEdit}>{this.categoryId ? (this.categoryId.categoryName ? this.categoryId.categoryName : "-") : "-"}</div>
                    </div>*/}
                    <div className={cls_inlineEditGroup}>
                      <label htmlFor="Host Password"><FormattedMessage id='host_password' />:</label>
                      <div className={cls_inlineNoCapitalize}>{this.hostPassword ? this.hostPassword : "-"}</div>
                    </div>
                    <div className={cls_inlineEditGroup}>
                      <label htmlFor="Expiry Date"><FormattedMessage id='expiry_Date' />:</label>
                      <div className={styles.inlineEdit}>{this.expiryDate ? moment(this.expiryDate).format('DD/MM/YYYY') : "-"}</div>
                    </div>
                    {/*<div className={cls_inlineEditGroup}>
                        <label htmlFor="Bridge Number"><FormattedMessage id='bridge_number' />:</label>
                        <div className={styles.inlineEdit}>{this.bridgeNumber ? this.bridgeNumber : "-"}</div>
                      </div>*/}
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

RoomView.contextTypes = {
  router: React.PropTypes.object,
};

RoomView.propTypes = {
  roomData: PropTypes.object,
  intl: PropTypes.object,
  error : PropTypes.array,
  success : PropTypes.string,
  clear: PropTypes.func
};

export default RoomView;