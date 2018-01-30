import React, { PropTypes, Component } from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { loggedInData } from '../../../../Login/LoginReducer';
import styles from '../../../../Dashboard/Dashboard.css';
import { getUserDataRequest } from '../ProfessionalProfileActions';
import { professionalProfileData } from '../ProfessionalProfileReducer'; 
import {Col, Row, Grid} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import PersonalData from '../components/PersonalData'
import ProfessionalData from '../components/ProfessionalData'
import AllConnections from '../components/AllConnections'


export class UserProfile extends Component {  
  constructor(props) {
    super(props);
    this.state = {
      allConnections : false,
      id : ''
    }
  }

  componentWillMount() { 
    this.setState({
      id: this.props.params.uid
    })
    this.props.dispatch(getUserDataRequest(this.props.params.uid))
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps == undefined) {
      return false
    }
    if (this.state.id != this.props.params.uid) {
       this.props.dispatch(getUserDataRequest(this.props.params.uid))
       this.setState({
        id: this.props.params.uid,
        allConnections : false
      })
    }
  }

  handleAllConnections() {
    this.setState({
      allConnections : !this.state.allConnections  //Flip boolean value
    })
  }

  viewConnections() {
    let contactData =  this.props.professionalProfileData.data.contacts;
    let viewConnectionsArray = [];
    contactData.map((contactData, i) => {
      if(contactData.status === 1) {
        let imgSrc;
        var randomNumber = Math.floor(Math.random(0-9)*1000*2);
        var currentCompanyObject =  _.find(contactData._id.profile.experience.workplace, ['present', true]);
        var currentRole;
        if(currentCompanyObject != undefined) {
          currentRole = currentCompanyObject.position;
        } else {
          currentRole = contactData._id.profile.position
        } 
        var image = contactData._id.profile.profileImage
        if(image == '' || image == undefined || image == null) {
          imgSrc = '/images/profile-pics/defaultStudent.jpg'
        } else {
          imgSrc = "/uploads/"+contactData._id.profile.profileImage;
        }
        viewConnectionsArray.push(
        <ul key={randomNumber}>
          <li>
            <a className="clearfix" >
              <div className={styles.avatarCircle32}>
                <img id="viewprofile" src={imgSrc} onClick={this.viewUser.bind(this, contactData._id._id)} title={this.props.intl.messages.viewprofile}/>
              </div>
              <div className={styles.connectionListDetails}>
                <h2>{contactData._id.firstname || ""} {contactData._id.lastname || ""}</h2>
                <p className={currentRole?"":styles.emptyString}>{currentRole || " "}</p>
              </div>
            </a>
          </li>
        </ul>)
      }
    })
    if(viewConnectionsArray.length>0) {
      return viewConnectionsArray
    } else {
      return ["No Connections"]
    }
  }

  viewUser(id) {
    browserHistory.push('/profile/'+id)
  }

  render() {
    let cls_profileAvatarBlock = `${styles.profileAvatarBlock} clearfix`;
    // console.log("props", this.props.professionalProfileData);

   	return (
      <div>
        {this.props.professionalProfileData && this.props.professionalProfileData.data && this.props.professionalProfileData.data.profile
        ?
          <Grid fluid={true}>
            <Row>
              <Col md={12}>
              	<div className={styles.fixedProfileContainer}>
                  <PersonalData data={this.props.professionalProfileData.data}/>
                  <ProfessionalData viewAllConnectionsCallback={this.handleAllConnections.bind(this)} userData = {this.props.professionalProfileData.data} viewAllConnectionsStatus={this.state.allConnections} viewAllConnectionsData={this.viewConnections.bind(this)}/>
                  {
                    this.state.allConnections
                    ?
                    <AllConnections hideAllConnectionsCallback={this.handleAllConnections.bind(this)} userData = {this.props.professionalProfileData.data} viewAllConnectionsData={this.viewConnections.bind(this)}/>
                    : null
                  }
                </div>
              </Col>
            </Row>
          </Grid>
        :null}
      </div>
    );    
  }
}


// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    loggedInData: loggedInData(state),
    professionalProfileData: professionalProfileData(state)
  };
}

UserProfile.propTypes = {
  loggedInData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  professionalProfileData: PropTypes.object
};

UserProfile.contextTypes = {
  router: React.PropTypes.object,
  intl: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps)(injectIntl(UserProfile));