import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';


import {Col, Row, Grid} from 'react-bootstrap';

import styles from '../../Admin.css';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import Loading from '../../../App/components/Loading';


export class CategoryView extends Component {

  componentWillReceiveProps(nextProps) {
    if(nextProps.success && nextProps.success != "") {
      this.refs.container.success(`${nextProps.success} `, ``);
    }else if(nextProps.error && nextProps.error.length > 0) {
      this.refs.container.error(`${nextProps.error} `, ``);
    }
    this.props.clear;
  }
  
  constructor(props) {
    super(props);    
  }
  
  render() {
    this.clsContainerRight = `${styles.containerRight} pull-right`;
    // console.log(this.props.categoryData.corporateId)
    if(this.props.categoryData.corporateId == null) {
      this.categoryName = this.props.categoryData.categoryName;
      this.categoryDesc = this.props.categoryData.categoryDesc;
      this.corporateName = "-"
    }
    else if(this.props.categoryData && this.props.categoryData.corporateId){
      this.categoryName = this.props.categoryData.categoryName;
      this.categoryDesc = this.props.categoryData.categoryDesc;
      this.corporateName = this.props.categoryData.corporateId.businessName
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
                    <p><FormattedMessage id='title_category_details' />.</p>
                  </div>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <div className={styles.formField}>
                  <h2><FormattedMessage id='category_details' /></h2>
                  <div className={styles.txtContainer}>
                    <div className={cls_inlineEditGroup}>
                      <label htmlFor="Corporate Name"><FormattedMessage id='corporate_name' />:</label>
                      <div className={styles.inlineEdit}>
                        {this.corporateName ? this.corporateName : "-"}
                      </div>
                    </div>
                    <div className={cls_inlineEditGroup}>
                      <label htmlFor="Category Name"><FormattedMessage id='category_name' />:</label>
                      <div className={styles.inlineEdit}>
                        {this.categoryName ?this.categoryName : "-"}
                      </div>
                    </div>
                    <div className={cls_inlineEditGroup}>
                      <label htmlFor="Category Desc"><FormattedMessage id='desc'/>:</label>
                      <div className={styles.inlineEdit}>
                        {this.categoryDesc ? this.categoryDesc : "-"}
                      </div>
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

CategoryView.contextTypes = {
  router: React.PropTypes.object,
};

CategoryView.propTypes = {
  categoryData: PropTypes.object,
  intl: PropTypes.object,
};

export default CategoryView;
