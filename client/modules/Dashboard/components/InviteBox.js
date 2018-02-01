import React, { PropTypes,Component } from 'react';
import { Link } from 'react-router';
import {injectIntl, intlShape, FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';
import DateTimeField from 'react-bootstrap-datetimepicker';
import moment from 'moment';
import validator from 'validator';

import {Col, Row, Grid, Modal} from 'react-bootstrap';
import {Header, Title, Body, Footer} from 'react-bootstrap/lib/Modal';

import styles from '../../Layouts/DashLayout/components/ConfSettings.css';
import adminStyles from '../../Admin/Admin.css';
import dashboardStyles from '../Dashboard.css';
import componentStyles from '../../../components/component.css';
import { getRoomData, sendInviteLink, RegenerateLink, ConformRegenarate } from '../UserDashboard/UserDashboardActions';

import  {ToastContainer, ToastMessage} from '../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);

export class InviteBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mailsList : [],
      value : '',
      error : '',
      disableInviteBtn: false
    }
    this.guestUrl = 'No link';
  }

  handleChange = (e) => {
    if (e.target.value != ',' && e.target.value != ' ') {
      this.setState({ value : e.target.value});
    }
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === ',') {
      let mail = e.target.value.trim();
      if(mail != ''){
        if(!validator.isEmail(mail)){
          this.setState({ error : <FormattedMessage id='invalid_mail_id' />});
        }else{
          let mails = this.state.mailsList;
          mails.push(mail.toLowerCase());
          this.setState({ mailsList : mails, value : '', error : '' });
        }
      }else{
        this.setState({ error : <FormattedMessage id='please_enter' />});
      }
    }
  }

  invitePeople(){
    if (this.state.disableInviteBtn == false) {
      
      let mail = this.state.value.trim();
      let mails = this.state.mailsList;
      if(mail != ''){
        if(!validator.isEmail(mail)){
          this.setState({ error : <FormattedMessage id='invalid_mail_id' />});
        }else{
          mails.push(mail.toLowerCase());
        }
      }
      if(mails.length > 0){

        let obj = {
          mails : mails,
          link : this.guestUrl,
          scheduleId : this.props.scheduleId,
          slotId : this.props.slotId,
          // roomId : this.props.roomId
        };
        this.setState({ mailsList : [], value : '', disableInviteBtn : true });
        sendInviteLink(obj).then(res => {
          if(res.status){
            this.props.hidecallback();
            //changeBy: pranathi, disc: onclick of sharelink button, changed  error  state to  empty 
            this.setState({ error : '', disableInviteBtn: false});
          }
          this.props.errorCallback(res);
        });
      }else{
        this.setState({ error : <FormattedMessage id='please_enter' />});
      }
    }
  }

  removemail(e) {
    let mails = this.state.mailsList;
    let index = mails.indexOf(e.target.id.toLowerCase());
    if (index > -1) {
        mails.splice(index, 1);
    }
    this.setState({ mailsList : mails });
  }

  regenerateLink = () => {
    if(this.props.roomId){
      let obj = {
        roomId : this.props.roomId,
        date : moment().utc().toDate()
      }
      RegenerateLink(obj).then(res => {
        if(res.status){
          this.setState({ link : res.link });
          this.props.getNewRooms(res);
          this.refs.invite_container.success(res.message, ``);
        }else{
          console.log("error == ",res.error);
          if(res.errorCode == 810){
            var props = this.props;    
            var response = this.setResponse;
            alertify.confirm(this.props.intl.messages.warning,this.props.intl.messages.generate_meeting_alert, 
              function (result) {
                if(result) {          
                  ConformRegenarate(obj).then(res => response(res));
                }
              },
              function() {

              }
            ).setting('labels',{'ok': this.props.intl.messages.ok,'cancel': this.props.intl.messages.cancel}); 
          }else
            this.refs.invite_container.error(res.error, ``);
        }
      });
    }
  }

  setResponse = (response) => {
    if(response.status){
      this.setState({ link : response.link });
      this.props.getNewRooms(response);
      this.refs.invite_container.success(response.message, ``);
    }else{
      console.log("error === ",response.error);
      this.refs.invite_container.error(response.error, ``);
    }
  }

  //Chnages made by prateek for handling bug#2999
  hideModal = () => {
    this.setState({error : '', mailsList : [], value : '', disableInviteBtn: false });
    this.props.hidecallback();    
  }

  render() { 
    // console.log("room id === ",this.props);
    let cls_btnSaveEdit = ` ${adminStyles.btnSaveAssign} `;
    let cls_invitationInfoBlock = `${adminStyles.invitationInfoBlock}`;
    let cls_table = `${dashboardStyles.GS}`;
    let cls_td = `${dashboardStyles.eV}`;
    let cls_mailsList = `${dashboardStyles.oj}`;
    let cls_mailsDiv = `${dashboardStyles.wO} ${dashboardStyles.nr} ${dashboardStyles.l1}`;
    let cls_hiddenInput = `${dashboardStyles.wA}`;
    let cls_input = `${dashboardStyles.vO}`;
    let cls_vr = `${dashboardStyles.vR}`;
    let cls_email = `${dashboardStyles.vN} ${dashboardStyles.bfK} ${dashboardStyles.a3q}`;
    let cls_vt = `${dashboardStyles.vT}`;
    let cls_vm = `${dashboardStyles.vM}`;
    let cls_errcls = `${componentStyles.error}`;
    let cls_imgRefreshMain = `${dashboardStyles.imgRefreshMain} ${dashboardStyles.actionIcon}`;

    let mails = '';

    let guestUrl = this.props.roomKey.split("/conf/");
    // console.log("guestUrl---- ", guestUrl);
    if (this.props.slotId) {
      guestUrl[1] = "/conf/guestScheduled/";
      guestUrl[2] = this.props.slotId;
    } else {
      let tmpRoomKey = guestUrl[1];
      guestUrl[1] = "/conf/guest/";
      guestUrl[2] = tmpRoomKey;
    }
    this.guestUrl = guestUrl.join("") ? guestUrl.join("") : "No link";

    if(this.state.mailsList && this.state.mailsList.length > 0){
      let docs = this.state.mailsList;
      let count = 10;
      mails = docs.map((doc) => 
              <div className={cls_vr} key={count++}>
                <span className={cls_email}>
                  <div className={cls_vt}>{doc}</div>
                  <div className={cls_vm} id={doc} onClick={this.removemail.bind(this)}></div>
                </span>
                <input name='to' type='hidden' value={doc}/>
              </div>
          ); 
    }
    return (
        <Modal show={this.props.showModal} onHide={this.hideModal}>
          <ToastContainer
            toastMessageFactory={ToastMessageFactory}
            ref="invite_container"
            className="toast-top-right"
           />
          <Header closeButton>
            <Title className={adminStyles.popHeadingAll} >{this.props.intl.messages.invite_people} </Title>
          </Header>
          <Body>
            <div className={adminStyles.modInvitation}>
              <div className={cls_invitationInfoBlock}>
                <h4><FormattedMessage id='join_meeting' />.</h4>
                <Row className={dashboardStyles.blockInvit}>
                  <Col md={3}>
                    <p className={adminStyles.inviteBlockTxt}><FormattedMessage id='conference_room_url'/>:</p>
                  </Col>
                  <Col md={7}>
                    <div className={adminStyles.roomLink}>
                      {/*{!this.props.confFlag ?
                        <Link href={this.guestUrl}>{this.guestUrl}</Link>
                      : <p style={{"color": "#008abc"}}>{this.guestUrl}</p>
                      }*/}
                      <p style={{"color": "#008abc"}}>{this.guestUrl}</p>
                    </div>
                  </Col>
                  {!this.props.confFlag ?
                    (!this.props.slotId
                      ?
                      <Col md={2}>
                        <Link id="regenerateLink" title={this.props.intl.messages.regenerate} onClick={this.regenerateLink}>
                          <div className={cls_imgRefreshMain}>
                            <img className={dashboardStyles.imgRefresh} src="/images/black-icons/black-regenerate.png"  alt="regenerate-icon"/>
                          </div>
                        </Link>
                      </Col>
                      : null
                    )
                    : null
                  }
                </Row>
              </div>
              <div className={cls_invitationInfoBlock}>
                <div className={adminStyles.multipleValInput}>
                  <table className={cls_table}>
                    <tbody>
                      <tr>
                        <td className={cls_td}>
                          <div id="mailsList" className={cls_mailsList}>
                            <div className={cls_mailsDiv}>
                              <input className={cls_hiddenInput} aria-hidden="true"/>
                              {mails}
                              <input id="email" type="text" placeholder={this.props.intl.messages.enter_email} className={cls_input} onKeyPress={this.handleKeyPress.bind(this)} onChange={this.handleChange.bind(this)} value={this.state.value} autoFocus='true' />
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <label className={cls_errcls}>{this.state.error}</label>
                </div>
              </div>
            </div>
          </Body>
          <Footer className={adminStyles.mainSaveAssign} >
            <div className={adminStyles.blockSaveAssign} >
              <button id="cancel" onClick={this.hideModal} ><FormattedMessage id='cancel' /></button>
              <button id="inviteSubmitBtn" className={cls_btnSaveEdit} onClick={this.invitePeople.bind(this)} disabled={this.state.disableInviteBtn}><FormattedMessage id='invite' /></button>
            </div>
          </Footer>
        </Modal>
      );
    }

}

InviteBox.contextTypes = {
  router: React.PropTypes.object,
};

InviteBox.propTypes = {
  intl: PropTypes.object,
  showModal: PropTypes.bool,
  hidecallback: PropTypes.func,
  intl: intlShape.isRequired,
};

InviteBox.defaultProps = { showModal: false };

export default injectIntl(InviteBox);
            
