import React, { PropTypes,Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {  injectIntl, intlShape, FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';
import {Col, Row, Grid, Modal} from 'react-bootstrap';
import {Header, Title, Body, Footer} from 'react-bootstrap/lib/Modal';
import styles from '../../../Layouts/DashLayout/components/ConfSettings.css';
import componentStyles from '../../../../components/component.css';
import WoogeenManager from '../../../Communication/WoogeenManager';
import { conferenceDetails } from '../../../Communication/ConferenceReducer';

export class HostControl extends Component {
  constructor(props) {
    super(props);
    this.confObject = new WoogeenManager();
    this.cls_btnSaveEdit = `btn btn-success btn-icon btn-sm`;
    this.cls_errcls = `${componentStyles.error}`;
    this.setHostPwd = null;
    this.state = {
      error : '',
      password : '',
      setHostPwd : null,
      imHost : false
    };
  }

  componentDidMount() {
    this.setHostPassword(this.props.conferenceDetails);
  }

  closeModal() {
    this.setState({
      error : '',
      password : '',      
    });
    this.props.closeHost();
  }

  setHostPassword(conferenceDetails) {
    if(conferenceDetails && conferenceDetails.confData && conferenceDetails.confData.hostPassword) {
      this.setState({ setHostPwd : conferenceDetails.confData.hostPassword });
      this.setState({ imHost : conferenceDetails.imHost });
    }
  }

  handlePasswordChange = (e) => {
    if(e.target.value == ''){
      this.setState({
        error : '',
        password : '',      
      });
    } else {
      this.setState({ password : e.target.value });
    }
  }
  
  handleSave(e){
    e.preventDefault();
    if (this.props.conferenceDetails && this.props.conferenceDetails.imHost == false && this.props.conferenceDetails.hostId && this.props.conferenceDetails.hostId != '') {
      alertify.alert('Access Denied', 'Host already exist, at a time one host is allowed.', function(){ });
    } else if(this.state.imHost) {
      this.confObject.offPresenter();
      this.confObject.offSpeaker();
      this.confObject.setHostPassword(false);      
      this.props.closeHost();
      this.setState({ imHost : false, password : '' });
    } else {
      let password = this.state.password;
      if(password != this.state.setHostPwd) {
        this.setState({ error : this.props.intl.messages.host_error})
      // } else if(conferenceDetails && conferenceDetails.confData && conferenceDetails.confData.host){
        //multi-host won't allowed case
      } else {
        // Change By - pranathi, Desc - updating the state error as empty
        this.confObject.setHostPassword(true);
        this.setState({ imHost : true, password : '', error : '' });
        this.props.presenterfunc();
        this.props.closeHost();
      }
    }
  }

  render() { 
    let bodyData = null;
    let buttonLabel = null;
    if(this.state.imHost) {
      buttonLabel = <FormattedMessage id = 'revoke'/>;
      bodyData = (
                  <div className={styles.setConfPassword}>
                    <h2><FormattedMessage id = 'revoke_error'/></h2>
                    <div className={styles.iconBlock}>
                      <img src="/images/black-icons/black-lock.png" />
                    </div>
                  </div>                                  
                );
    } else {
      buttonLabel = <FormattedMessage id = 'become_host'/>;
      bodyData = (
                  <div className={styles.setConfPassword}>
                    <h2><FormattedMessage id = 'enter_host_password'/></h2>
                    <div className={styles.iconBlock}>
                      <img src="/images/black-icons/black-lock.png" />
                    </div>
                    <div className={styles.passWordBlock}>
                      <input id="password" type="password" name="password" value={this.state.password} onChange={this.handlePasswordChange} autoFocus="autofocus" maxLength={15} />
                    </div>                   
                  </div>                          
                );
    }
    return (
      <Modal show={this.props.showModal} onHide={this.closeModal.bind(this)} >
        <Header closeButton>
          <Title className={styles.popHeadingAll} ><FormattedMessage id = 'host_access'/></Title>
        </Header>
        <form>
          <Body>
            {bodyData}
          </Body>
          <Footer>
            <label className={this.cls_errcls}>{this.state.error}</label>
            <button id="saveSubmit" type="submit" className={styles.btnApplyAll} onClick={this.handleSave.bind(this)}>{buttonLabel}</button> 
          </Footer>
        </form>
      </Modal>
    );
  }

}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    intl: state.intl,
    conferenceDetails: conferenceDetails(state),
  };
}

HostControl.contextTypes = {
  router: React.PropTypes.object,
  intl: React.PropTypes.object.isRequired,
};

HostControl.propTypes = {
  intl: PropTypes.object,
  showModal: PropTypes.bool,
  closeHost: PropTypes.func,
  conferenceDetails: PropTypes.object,
  presenterfunc: PropTypes.func,
};

HostControl.defaultProps = { showModal: false };

export default connect(mapStateToProps)(HostControl);
