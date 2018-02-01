import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import css from './doctorConference.css';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Add from 'material-ui-icons/Add';
import Red from 'material-ui/colors';
import Progress, { CircularProgress } from 'material-ui/Progress';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import { connect } from 'react-redux';

const styles = {

};

class DoctorConference extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false,
      endCall: false
    };
  }


  openChat () {
    console.log("openChat");
    this.props.openChatBox();
  }

  // closeChat () {
  //   this.props.closeChatBox();
  // }
  menuOpen = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  menuClose = () => {
    this.setState({ open: false });
  };
  handleClickOpen = () => {
    this.setState({ endCall: true });
  };

  handleClose = () => {
    this.setState({ endCall: false });
  };

  render() {
    return (
      <div>
        <div className="videoMainBlock">
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
                <source src="/public/videos/patient1.mp4" type="video/mp4" />
              </video>
              {/*<div className="noData">
                    <i className="material-icons">videocam_off</i> <span>Video muted</span>
                  </div>*/}
            </div>
            <div className="selfVideo">
              <div className="videoBox">
                <video autoPlay loop className="fullWidth" >
                  <source src="/public/videos/doctor.mp4" type="video/mp4" />
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

              <Button fab className="confBtn muiRedBtn" onClick={this.props.hanldeEndCall} >
                <i className="material-icons">call_end</i>
              </Button>

              <Dialog open={this.state.endCall} onClose={this.handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" >

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
              <Button fab color="primary" className="confBtn" onClick={this.openChat.bind(this)}>
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
        {/*<div className="layoutHeader">
                          <Button className="buttonStyle">
                            <LibraryBooks className="btnIcon" /><span className="btnTxt">Historical Medical Records</span>
                          </Button>
                          <Button className="buttonStyle">
                            <Receipt className="btnIcon"/><span className="btnTxt">Historical Diagnostics reports</span>
                          </Button>
                          <Button className="buttonStyle">
                            <Description className="btnIcon"/> <span className="btnTxt">Allergies</span>
                          </Button>
                          <div className="btnpullRight">
                            <Button className="buttonStyle">
                              <Add className="btnIcon"/><span className="btnTxt">Add Prescription</span>
                            </Button>
                            <Button className="buttonStyle">
                              <Add className="btnIcon"/><span className="btnTxt">Add Diagnostics</span>
                            </Button>
                          </div>
                        </div>
            */}
      </div>
    );
  }
};


const mapStateToProps = function (state) {
  return {}
}
export default connect(mapStateToProps)(DoctorConference);