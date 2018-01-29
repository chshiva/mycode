import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';


import {Col, Row, Grid} from 'react-bootstrap';

import styles from '../../Admin.css';

export class LocaleView extends Component {

  // componentWillReceiveProps(nextProps) {
  //   if(nextProps.success && nextProps.success != "") {
  //     this.refs.container.success(`${nextProps.success} `, ``);
  //   }
  // }
  
  constructor(props) {
    super(props); 
    this.strTimezone = '';
    this.strDateformat = '';
    this.strTimeformat = '';
    this.strCurrencyformat = '';
    this.strPreferedlanguage = '';
    
  }
  componentDidMount() {
    this.setdata(this.props.loggedInData)
  }

  setdata(result){
    if (result && result.data && result.data._id) {
      this.userID = result.data._id;
    }
  }

  /*Commented the date format, currency format, time format as per disuccsion with pradeep and prudhvi
  Responsible : Prateek*/ 
  
  render() {
 //console.log('this.props',this.props);
    this.clsContainerRight = `${styles.containerRight} pull-right`;
    if(this.props && this.props.profileData && this.props.profileData.locale){
      this.strTimezone = this.props.profileData.locale.timezone;
      this.strDateformat = this.props.profileData.locale.dateformat;
      this.strTimeformat = this.props.profileData.locale.timeformat;
      this.strCurrencyformat = this.props.profileData.locale.currencyformat;
      this.strPreferedlanguage = this.props.profileData.locale.preferedlanguage == 'en' ? "English" : (this.props.profileData.locale.preferedlanguage == 'hi' ? "Hindi" : this.props.profileData.locale.preferedlanguage );
      // let locVal = this.props.profileData.localeValidity;
      // locVal = moment(locVal).format('DD-MM-YYYY');
      // this.localeValidity = locVal;
      // this.serverLocation = this.props.profileData.serverLocation;
    
      // console.log(this.props.profileData);
      // this.assignedTo = this.props.profileData.assignedTo;
    }else{

    }
    let cls_inlineEditGroup = `${styles.inlineEditGroup} clearfix`;
    let cls_localHeadBlock = ` ${styles.infoTxt} ${styles.localHeadBlock} `;
    return (
      <div className={styles.midContainer}>
        <div className={styles.whiteCard}>
          <Grid fluid={true}>
            <Row>
              <Col md={12}>
                <div className={cls_localHeadBlock}>
                  <h2 className={styles.localHeadMain} ><FormattedMessage id='local_settings' /></h2>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <div className={styles.formField}>
                  <div className={styles.txtContainer}>
                    {//<div className={cls_inlineEditGroup}>
                    //   <label htmlFor="Time Zone"><FormattedMessage id='time_zone' />:</label>
                    //   <div className={styles.inlineEdit}>{this.strTimezone ? this.strTimezone : "-"}</div>
                    // </div>
                    }
                    {/*<div className={cls_inlineEditGroup}>
                      <label htmlFor="Date Format"> <FormattedMessage id='date_format' />:</label>
                      <div className={styles.inlineEdit}>{this.strDateformat ? this.strDateformat : "-"}</div>
                    </div>
                    <div className={cls_inlineEditGroup}>
                      <label htmlFor="Time Format"><FormattedMessage id='time_format' />:</label>
                      <div className={styles.inlineEdit}>{this.strTimeformat ? this.strTimeformat : "-"}</div>
                    </div>
                     <div className={cls_inlineEditGroup}>
                      <label htmlFor="Currency Format"><FormattedMessage id='currency_format' />:</label>
                      <div className={styles.inlineEdit}>{this.strCurrencyformat ? this.strCurrencyformat : "-"}</div>
                    </div>*/}
                    <div className={cls_inlineEditGroup}>
                      <label htmlFor="Prefered Language"><FormattedMessage id='prefered_language' />:</label>
                      <div className={styles.inlineEdit}>{this.strPreferedlanguage ? this.strPreferedlanguage : "-"}</div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
  
}

LocaleView.contextTypes = {
  router: React.PropTypes.object,
};

LocaleView.propTypes = {
  profileData: PropTypes.object,
  intl: PropTypes.object,
};

export default LocaleView;
