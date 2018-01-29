import React, { PropTypes, Component } from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { isLoggedIn } from '../../../../Login/LoginActions';
import { loggedInData } from '../../../../Login/LoginReducer';
import styles from '../../../../Dashboard/Dashboard.css';
import {Col, Row, Grid} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import moment from 'moment';

export class ProfessionalData extends Component {  
  constructor(props) {
    super(props);
    this.state = {
      viewAllConnectionsLabel: <FormattedMessage id='View_all' />
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.viewAllConnectionsStatus) {
      this.setState({
        viewAllConnectionsLabel: <FormattedMessage id='Hide_all' />
      })
    } else {
      this.setState({
        viewAllConnectionsLabel: <FormattedMessage id='View_all' />
      })
    }
  }

  viewAllConnections() {
    this.props.viewAllConnectionsCallback()
  }

  render() {
    let userData = this.props.userData.profile;
    let userCount = 0;
    let contactData =  this.props.userData.contacts;
    let firstFourConnections = this.props.viewAllConnectionsData().splice(0,4);
    
    for(var i=0; i<contactData.length; i++){
      if(contactData[i].status === 1) {
        userCount = userCount+1;
      }
    }
    
    return (
      <div className={styles.infoIndiProfileBlodk}>
        <Row>
          <Col md={4}>
            <div className={styles.profileInfoBlock}>
              <h2><FormattedMessage id='work_education' />:</h2>
              <div className={styles.otherDetails}>
                <ul>
                  <h3><FormattedMessage id='Work_Places' />:</h3>
                    {userData.experience.workplace.length>0
                    ? userData.experience.workplace.map(function(workData,i) {
                        let key = i + "workplace";
                        return <li key = {key}>{workData.company}</li>
                      })
                    :"--"}                 
                </ul>
              </div>
              <div className={styles.otherDetails}>
                <ul>
                  <h3><FormattedMessage id='professionalSkills_title' />:</h3>
                  { userData.experience.professionalSkills.length>0
                  ? userData.experience.professionalSkills.map(function(skillsData,i) {
                      let key = i + "professionalSkills";
                      return <li key = {key}>{skillsData}</li>
                    })
                  :"--"} 
                </ul>
              </div>
              <div className={styles.otherDetails}>
                <ul>
                  <h3><FormattedMessage id='college_title' />:</h3>
                  {userData.education.college.length>0
                  ? userData.education.college.map(function(collegeData,i) {
                    let key = i + "college";
                    return <li key = {key}>{collegeData.university}</li>
                    })
                    :"--"}                   
                </ul>
              </div>
              <div className={styles.otherDetails}>
                <ul>
                  <h3><FormattedMessage id='work_education_school' />:</h3>
                  <li>
                    {userData.education.highSchool != undefined
                    ? userData.education.highSchool.school || '--'
                    :"--"}
                  </li>
                </ul>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className={styles.profileInfoBlock}>
              <h2><FormattedMessage id='contact_information' />:</h2>
              <div className={styles.otherDetails}>
                <ul>
                  <h3><FormattedMessage id='address' />:</h3>
                  <li className={styles.capitalize}>
                    {userData.contact != undefined && userData.contact.address
                    ?
                      userData.contact.address + ',' 
                      + userData.contact.city + ','
                      + userData.contact.landMark + ','
                      + userData.contact.zip + '.'
                    :"--"}
                  </li>
                </ul>
              </div>
              <div className={styles.otherDetails}>
                <ul>
                  <h3><FormattedMessage id='website' />:</h3>
                  <li><a id="website" href={userData.website} target="_blank">{userData.website || "--"}</a></li>
                </ul>
              </div>
              <div className={styles.otherDetails}>
                <ul>
                  <h3><FormattedMessage id='Social_Links' />:</h3>
                  <li><a id="socialLink" href={userData.socialLink} target="_blank">{userData.socialLink || "--"}</a></li>
                </ul>
              </div>
              <div className={styles.otherDetails}>
                <ul>
                  <h3><FormattedMessage id='basic_information' />:</h3>
                  <li><FormattedMessage id='dob' />: 
                    {userData.dateofbirth != null ? 
                      moment(userData.dateofbirth).format('DD-MM-YYYY')
                     :"--"}
                  </li>
                </ul>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className={styles.profileInfoBlock}>
              <h2><FormattedMessage id='Connections'/>: <span>({userCount})</span>
                <span className={styles.viewAll}><button id="viewAllConnections" className="btn btn-xs" onClick={this.viewAllConnections.bind(this)}>{this.state.viewAllConnectionsLabel}</button></span>
              </h2>
              <div className={styles.connectionList}>
                {firstFourConnections}                    
              </div>
            </div>              
          </Col>
        </Row>
      </div>
    );
  }
}


// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    loggedInData: loggedInData(state),
    intl: state.intl,
  };
}

ProfessionalData.propTypes = {
  loggedInData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

ProfessionalData.contextTypes = {
  router: React.PropTypes.object,
  intl: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps)(injectIntl(ProfessionalData));