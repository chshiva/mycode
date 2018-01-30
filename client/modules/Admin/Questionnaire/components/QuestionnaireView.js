import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';

import {Col, Row, Grid} from 'react-bootstrap';

import styles from '../../Admin.css';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import moment from 'moment';
import Loading from '../../../App/components/Loading';

export class QuestionnaireView extends Component {

  componentWillReceiveProps(nextProps) {
    if(nextProps.success && nextProps.success != "") {
      this.refs.container.success(`${nextProps.success} `, ``);
    }
    // if(nextProps.error && nextProps.error.length > 0) {
    //   if(nextProps.error[0] == 409) {
    //     this.refs.container.error("Can't Delete: Already questionnaire is assigned from " + moment(nextProps.openFrom).format("DD/MM/YYYY hh:mm A") + " " + "to" + " " + moment(nextProps.closeFrom).format("DD/MM/YYYY hh:mm A"));
    //   } else {
    //     this.refs.container.error(`${nextProps.error} `, ``);
    //   }
    // }
    this.props.clear;
  }

  render(){
    this.clsContainerRight = `${styles.containerRight} pull-right`;
    if(this.props.questionnaireData){
      this.questionnaireName = this.props.questionnaireData.questionnaireName;
      this.description = this.props.questionnaireData.description;
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
                  <p><FormattedMessage id='title_questionnaire_details' /></p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <div className={styles.formField}>
                  <h2><FormattedMessage id='questionnaire_details' /></h2>
                  <div className={styles.txtContainer}>
                    <div className={cls_inlineEditGroup}>
                      <label htmlFor="Questionnaire Name"><FormattedMessage id='name' />:</label>
                      <div className={styles.inlineEdit}>{this.questionnaireName ? this.questionnaireName : "-"}</div>
                    </div>
                    <div className={cls_inlineEditGroup}>
                      <label htmlFor="Description"><FormattedMessage id='description' />:</label>
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

QuestionnaireView.contextTypes = {
  router: React.PropTypes.object,
};

QuestionnaireView.propTypes = {
  questionnaireData: PropTypes.object,
  intl: PropTypes.object,
  error : PropTypes.array,
  success : PropTypes.string,
  clear: PropTypes.func
};

export default QuestionnaireView;