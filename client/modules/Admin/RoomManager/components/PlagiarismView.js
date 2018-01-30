import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';

import {Col, Row, Grid} from 'react-bootstrap';

import styles from '../../Admin.css';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);

export class PlagiarismView extends Component {

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
    let plagiarismData = this.props.plagiarismData;
    this.clsContainerRight = `${styles.containerRight} pull-right`;
    if(this.props.roomData){
      
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
          <Grid fluid={true}>
            <Row>
              <Col md={12}>
                <div className={styles.infoTxt}>
                  <p><FormattedMessage id='title_created_plagiarism_details' /></p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <div className={styles.formField}>
                  <h2><FormattedMessage id='plagiarism_info' /></h2>
                  <div className={styles.txtContainer}>
                    <ul className={styles.plagiarism}>
                      {plagiarismData.length > 0 ?
                        plagiarismData.map((plagiarismInfo,i) => {
                          return <li key={i}>
                            <div className={cls_inlineEditGroup}>
                              <label htmlFor="URL"><FormattedMessage id='url' />:</label>
                              <div className={styles.inlineEdit}>{plagiarismInfo.URL}</div>
                            </div>
                             <div className={cls_inlineEditGroup}>
                              <label htmlFor="Percents"><FormattedMessage id='percents' />:</label>
                              <div className={styles.inlineEdit}>{plagiarismInfo.Percents}</div>
                            </div>
                            <div className={cls_inlineEditGroup}>
                              <label htmlFor="Number Of CopiedWords"><FormattedMessage id='copied_words' />:</label>
                              <div className={styles.inlineEdit}>{plagiarismInfo.NumberOfCopiedWords}</div>
                            </div>
                            <div className={cls_inlineEditGroup}>
                              <label htmlFor="Comparison Report"><FormattedMessage id='comparison_report' />:</label>
                              <div className={styles.inlineEdit}>{plagiarismInfo.ComparisonReport}</div>
                            </div>
                            <div className={cls_inlineEditGroup}>
                              <label htmlFor="CachedVersion"><FormattedMessage id='cached_version' />:</label>
                              <div className={styles.inlineEdit}>{plagiarismInfo.CachedVersion}</div>
                            </div>
                              <div className={cls_inlineEditGroup}>
                              <label htmlFor="Title"><FormattedMessage id='title' />:</label>
                              <div className={styles.inlineEdit}>{plagiarismInfo.Title}</div>
                            </div>
                            <div className={cls_inlineEditGroup}>
                              <label htmlFor="Introduction"><FormattedMessage id='introduction' />:</label>
                              <div className={styles.inlineEdit}>{plagiarismInfo.Introduction}</div>
                            </div>
                             <div className={cls_inlineEditGroup}>
                              <label htmlFor="Embeded Comparison"><FormattedMessage id='embeded_comparison' />:</label>
                              <div className={styles.inlineEdit}>{plagiarismInfo.EmbededComparison}</div>
                            </div>
                          </li>
                        })
                        :<span>No Data Copied</span>
                      }                      
                    </ul>
                  </div>


                  <hr className={styles.mobHr} />
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    );    
  }
}

PlagiarismView.contextTypes = {
  router: React.PropTypes.object,
};

PlagiarismView.propTypes = {
  roomData: PropTypes.object,
  intl: PropTypes.object,
  error : PropTypes.array,
  success : PropTypes.string,
  clear: PropTypes.func
};

export default PlagiarismView;