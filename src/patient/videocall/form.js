import React, { Component } from 'react';
import Button from 'material-ui/Button';
import css from './videocall.css';
import Progress, { CircularProgress } from 'material-ui/Progress';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';

export default class PatientVideoCallForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatBox: false,
      message: ''
    };
  }

  handleClickOpen = () => {
    this.setState({ endCall: true });
  };

  handleClose = () => {
    this.setState({ endCall: false });
  };

  componentWillReceiveProps (nextProps) {
    if (nextProps.messages && nextProps.messages.length) this.setState({ chatBox: true });
  }

  openChatBox() {
    this.setState({ chatBox: true });
  }

  closeChatBox() {
    this.setState({ chatBox: false });
  }

  handleChangeMessage(e) {
    this.setState({ message: e.target.value });
  }

  sendMessage() {
    this.props.sendMessage(this.state.message);
    this.setState({ message: ''});
  }

  render() {
    return (
      <div>
        <div className="noAccess">
          <p>Rotate to portrait for better usage.</p>
        </div>

        {/* ----- CHAT BLOCK */}
        {this.state.chatBox &&
          <div className="chatBlock">
            <div className="chatHeader">
              <div className="chatCloseBox" onClick={this.closeChatBox.bind(this)}>
                <i className="material-icons">close</i>
              </div>
              <div className="chatHeadingTxt"> Chat </div>
            </div>



            <div className="chatBody">
              { this.props.messages && this.props.messages.map ( (data) => {
                if (data.from.userid == this.props.user.userDetails._id) {
                  return (
                    <div className="chatMsgBoxSelf">
                      <div className="msgContainer"> {data.message} </div>
                      <div className="msgTimeBlock"> <time>10:21</time> </div>
                    </div>
                  );
                } else {
                  return (
                    <div className="chatMsgBox">
                      <div className="nameHeading otherColor">{data.from.name}</div>
                      <div className="msgContainer"> {data.message} </div>
                      <div className="msgTimeBlock"> <time>10:20</time> </div>
                    </div>
                  );
                }
              })}

              {/* For Multimedia Files*/}
              { /* <div className="chatMsgBox">
                <div className="nameHeading otherColor">Dr. Name</div>
                <div className="msgContainer"> How do you do! </div>
                  <div className="msgMedia">
                    <img src="/public/images/report.jpg" alt="report" />
                    <div className="dowloadMedia"> <i className="material-icons">file_download</i> </div>
                  </div>
                <div className="msgTimeBlock">
                  <time>10:20</time>
                </div>
              </div> */}
            </div>



            <div className="chatFooterBox">
              <div className="chatAddPinBlock">
                <input type="file" className="inputFile" id="chatFileUpload" name="fileUploadChat" />
                <label htmlFor="chatFileUpload" >
                  <i className="material-icons">attach_file</i>
                </label>
              </div>
              <div className="typeMsgBlock">
                <input type="text" className="inputTxt" value={this.state.message} onChange={this.handleChangeMessage.bind(this)} />
              </div>

              <div className="sendMsg" onClick={this.sendMessage.bind(this)}>
                <Button className="muiRedBtn">Send</Button>
              </div>
            </div>
          </div>}
        {/* ----- CHAT BLOCK */}

        <div className="conferenceContainer">
          <div className="videoContainer">
            {/* VC timer section */}
            {/*Asked to Hide the timer by SriRam- Hided By Keerthi*/}
            {/*<div className="countDownBlock">
                          <h3 className="timeTxt">10:00</h3>
                          <CircularProgress className="circularTimer" color="primary" size={80} mode="determinate" value={100} min={0} max={100} />
                        </div>*/}
            {/* VC section */}
            <div className="otherVideo">
              <video autoPlay loop className="fullWidth" >
                <source src="/public/videos/doctor.mp4" type="video/mp4" />
              </video>
              {/*<div className="noData">
                <i className="material-icons">videocam_off</i> <span>Video muted</span>
              </div>*/}
            </div>
            <div className="selfVideo">
              <div className="videoBox">
                <video autoPlay loop className="fullWidth" >
                  <source src="/public/videos/patient.mp4" type="video/mp4" />
                </video>
                {/*<div className="noData">
                <i className="material-icons">videocam_off</i> <span>Video muted</span>
              </div>*/}
              </div>
            </div>
          </div>
          <div className="videoControllers">
            <div className="videoBtnBlock">
              <Button fab color="primary" className="confBtn">
                <i className="material-icons">mic</i>
                {/*<i class="material-icons">mic_off</i>*/}
              </Button>
              <Button fab color="primary" className="confBtn">
                <i className="material-icons">videocam</i>
                {/*<i class="material-icons">videocam_off</i>*/}
              </Button>
              <Button fab className="confBtn muiRedBtn" onClick={this.handleClickOpen.bind(this)} >
                <i className="material-icons">call_end</i>
              </Button>
              <Dialog open={this.state.endCall} onClose={this.handleClose.bind(this)} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" >

                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Do you want to end the call?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    No
                  </Button>
                  <Button onClick={this.handleClose} color="primary" autoFocus>
                    Yes
                  </Button>
                </DialogActions>
              </Dialog>
              <Button fab color="primary" className="confBtn" onClick={this.openChatBox.bind(this)}>
                <i className="material-icons">chat</i>
              </Button>
            </div>
            {/*<div className="chatBtnBlock">
                           <Button fab color="primary" className="confBtn">
                            <i className="material-icons">chat</i>
                          </Button>
                        </div>*/}
          </div>
        </div>
      </div>
    );
  }
};