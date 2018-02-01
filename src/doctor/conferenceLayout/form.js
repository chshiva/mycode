import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Tabs, { Tab } from 'material-ui/Tabs';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle, } from 'material-ui/Dialog';
import Add from 'material-ui-icons/Add';
import AddBox from 'material-ui-icons/AddBox';
import Close from 'material-ui-icons/Close';
import { connect } from 'react-redux';
import css from './layout.css';
import DoctorMedicalRecordsContainer from '../medicalRecords/container';
import DoctorDiagnosticHistoryContainer from '../diagnosticHistory/container';
import DoctorAllergyTypesContainer from '../allergies/container';
import DoctorAddPrescriptionContainer from '../addPrescription/container';
import DoctorAddDiagnosticCountainer from '../addDiagnostic/container';
import DoctorConferenceContainer from '../doctorConference/container';
import DoctorPatientHistoryContainer from '../patientHistory/container';

class ConferenceLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false,
      value: 0,
      prescModalIsOpen: false,
      diagModalIsOpen: false,
      chatBox: false
    };
  }

  openChatBox() {
    this.setState({ chatBox: true });
  }

  closeChatBox() {
    this.setState({ chatBox: false });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.messages && nextProps.messages.length) this.setState({ chatBox: true });
  }

  menuOpen = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  menuClose = () => {
    this.setState({ open: false });
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  openPrescriptionModal = () => {
    this.setState({ prescModalIsOpen: true });
  }
  openDiagnosticModal = () => {
    this.setState({ diagModalIsOpen: true });
  }

  closeModal = () => {
    this.setState({ prescModalIsOpen: false, diagModalIsOpen: false });
  }

  handleonMessageChange = (e) => {
    this.setState({ message: e.target.value });
  }

  sendMessage = () => {
    this.props.sendMessage(this.state.message);
    this.setState({ message: "" });
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <div>
        <div className="noAccess">
          <p>Rotate to portrait for better usage.</p>
        </div>
        <div className="layoutMain">
          <div className="layoutLeftContainer">
            <div>
              <div className="tabHeader" position="static">
                <Tabs value={value} onChange={this.handleChange}>
                  <Tab className="tabLabel" label="Video Call" />
                  <Tab className="tabLabel" label="Consult History" />
                  <Tab className="tabLabel" label="Diagnostics reports" />
                  <Tab className="tabLabel" label="Patient History" />
                  <Tab className="tabLabel" label="Allergies" />
                </Tabs>
              </div>
              {value === 0 && <div className="mainLayout"><DoctorConferenceContainer openChatBox={this.openChatBox.bind(this)} /></div>}
              {value === 1 && <div className="mainLayout"><DoctorMedicalRecordsContainer /></div>}
              {value === 2 && <div className="mainLayout"><DoctorDiagnosticHistoryContainer /></div>}
              {value === 3 && <div className="mainLayout"><DoctorPatientHistoryContainer /></div>}
              {value === 4 && <div className="mainLayout"><DoctorAllergyTypesContainer /></div>}
            </div>
            {/*Modal Box for Add Prescription*/}
            <Dialog open={this.state.prescModalIsOpen} onClose={this.closeModal} aria-labelledby="form-dialog-title">
              <div className="dialogHeading">
                <div className="dialogIcon">
                  <img src="/public/images/black-icons/addpres.png" alt="prescripton icon" />
                </div>
                <DialogTitle id="form-dialog-title" className="dialogHeadingTxt">
                  <span>Medical Prescription Form</span>
                </DialogTitle>
              </div>
              <IconButton aria-label="Close" className="closeIcon" onClick={this.closeModal}>
                <Close />
              </IconButton>

              <DialogContent>
                <DialogContentText>
                </DialogContentText>
                <DoctorAddPrescriptionContainer />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.closeModal} color="primary">
                  Cancel
              </Button>
                <Button onClick={this.closeModal} color="primary">
                  Prescribe
              </Button>
              </DialogActions>
            </Dialog>
            {/*Modal Box for Add Diagnostics*/}
            <Dialog open={this.state.diagModalIsOpen} onClose={this.closeModal} aria-labelledby="form-dialog-title">
              <div className="dialogHeading">
                <div className="dialogIcon">
                  <img src="/public/images/black-icons/addpres.png" alt="prescripton icon" />
                </div>
                <DialogTitle id="form-dialog-title" className="dialogHeadingTxt">
                  <span>Medical Diagnostics Form</span>
                </DialogTitle>
              </div>
              <IconButton aria-label="Close" className="closeIcon" onClick={this.closeModal}>
                <Close />
              </IconButton>
              <DialogContent>
                <DialogContentText>
                </DialogContentText>
                <DoctorAddDiagnosticCountainer />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.closeModal} color="primary">
                  Cancel
              </Button>
                <Button onClick={this.closeModal} color="primary">
                  Prescribe
              </Button>
              </DialogActions>
            </Dialog>
          </div>
          <div className="layoutRightBlock">
            <div className="layoutRightHeader">
              <Button className="buttonStyle" raised color="primary" onClick={this.openPrescriptionModal} >
                <span>Add Prescription</span>
              </Button>
              <Button className="buttonStyle" raised color="primary" onClick={this.openDiagnosticModal}>
                <span>Add Diagnostics</span>
              </Button>
            </div>
            <div className="layoutRightContainer">
              <div className="writeNotes">
                <h2 className="noteHeading"> Clinical Notes for Patient</h2>
                <p className="subNote">Available for patient</p>
                <TextField fullWidth placeholder="Write Notes..." multiline rows="4" className="textArea" /><br />
                <Button raised color="primary" type="submit" >Save</Button>
              </div>
              <div className="writeNotes">
                <h2 className="noteHeading"> Diagnosis</h2>
                <p className="subNote">Available for patient</p>
                <TextField fullWidth placeholder="Write Notes..." multiline rows="4" className="textArea" /><br />
                <Button raised color="primary" type="submit" >Save</Button>
              </div>
              <div className="writeNotes">
                <h2 className="noteHeading"> Personal Notes</h2>
                <p className="subNote">Not Available for patient</p>
                <TextField fullWidth placeholder="Write Notes..." multiline rows="4" className="textArea" /><br />
                <Button raised color="primary" type="submit" >Save</Button>
              </div>
            </div>
          </div>
        </div>

        { /* ----------------------- CHAT BLOCK */}
        {this.state.chatBox && <div className="chatBlock">
          <div className="chatHeader">
            <div className="chatCloseBox" onClick={this.closeChatBox.bind(this)}>
              <i className="material-icons">close</i>
            </div>
            <div className="chatHeadingTxt">
              Chat
          </div>
          </div>

          <div className="chatBody">
            {this.props.messages && this.props.messages.map((data) => {
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
          </div>

          <div className="chatFooterBox">
            <div className="chatAddPinBlock">
              <input type="file" className="inputFile" id="chatFileUpload" name="fileUploadChat" />
              <label htmlFor="chatFileUpload" >
                <i className="material-icons">attach_file</i>
              </label>
            </div>
            <div className="typeMsgBlock">
              <input type="text" className="inputTxt" value={this.state.message} onChange={this.handleonMessageChange.bind(this)} />
            </div>
            <div className="sendMsg" onClick={this.sendMessage.bind(this)}>
              <Button className="muiRedBtn">Send</Button>
            </div>
          </div>
        </div>}
        { /* ----------------------- CHAT BLOCK */}
        {/* <div className="floatingWindow">
          <video autoPlay loop className="fullWidth" >
            <source src="/public/videos/patient1.mp4" type="video/mp4" />
          </video>
        </div> */}
      </div>
    );
  }
};


const mapStateToProps = function (state) {
  return {

  }
}
export default connect(mapStateToProps)(ConferenceLayout);