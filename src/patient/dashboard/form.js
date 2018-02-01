import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Hidden from 'material-ui/Hidden';
import Avatar from 'material-ui/Avatar';
import css from './dashboard.css';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import { CircularProgress } from 'material-ui/Progress';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle, withMobileDialog, } from 'material-ui/Dialog';

export default class DashboardForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endCall: false,
      clinicalRecords: []
    }
  }

  handleClickOpen = () => {
    this.setState({ endCall: true });
  }

  handleClose = () => {
    this.setState({ endCall: false });
  }

  callnow(e) {
    this.props.callNow();
  }

  render() {
    const { fullScreen } = this.props;
    return (
      <div>
        <div className="dashboardMain">
          <div className="dashboardContainer">
            {/************************ CLINICAL RECORDS <START> **************************/}
            <div className="cardDisplayBlock">
              <Card className="cardBtmSpace">
                <div className="dCardHeadline">September 14, 2016</div>
                <Grid container spacing={24}>
                  <Grid item xs={12} md={5}>
                    <CardHeader
                      avatar={
                        <Avatar alt="user one" src="/public/images/user.jpeg" className="" />
                      }
                      title="Dr. John Williams"
                      subheader="Call Duration: 10:00 min"
                    />
                  </Grid>
                  <Grid item xs={12} md={7}>
                    <CardContent>
                      <h2 className="noteHeadlineTxt">
                        Clinical Note
                    </h2>
                      <Typography component="p">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
                    </Typography>
                    </CardContent>
                  </Grid>
                </Grid>
                <CardActions>
                  <Button color="primary">Summary</Button>
                  <Button color="primary">Prescription</Button>
                </CardActions>
              </Card>
            </div>
            {/************************ CLINICAL RECORDS <END> **************************/}
            {/************************ No Data<START> ************************/}
            <div className="noDataBlock">
              <div className="nodDataScreen">
                <div className="circle240">
                  <img src="/public/images/black-icons/medicalRecords.png" alt="medicalRecords" />
                </div>
                <h2 className="nodataTxt">No Data</h2>
              </div>
            </div>
            {/************************ No Data<END> **************************/}
            {(this.props.userDetails && this.props.userDetails.isMedicalFormFilled) ?
              <div>
                <div className="btmCallBlock">
                  <Hidden smDown >
                    <div className="callActionBlock">
                      <Button raised className="callBtn" onClick={this.callnow.bind(this)}><i className="material-icons">call</i>Call Now</Button>
                    </div>
                  </Hidden>

                  <div className="btmCallTxt">
                    <h2 className="callLeftTxt">Calls Left</h2>
                  </div>

                  {this.props.rules && this.props.rules.length > 0 ?
                    this.props.rules.map((data, i) => {
                      return (
                        (data && data.ruleCode == 'CALL' ? <Hidden smDown key={i}>
                          <div className="callCircle"> {data.ruleValue}</div>
                        </Hidden> : null)
                      );
                    })
                    :
                    <Hidden smDown >
                      <div className="callCircle"> 0</div>
                    </Hidden>
                  }
                </div>

                {/************************ CALL DIALOG <START> **************************/}
                <Dialog fullScreen={fullScreen} open={this.props.isCalling} onClose={this.modelOnClose}>
                  <DialogTitle id="alert-dialog-title" className="dialogHeader">
                    <div className="rippleHeadline">
                      <h2 className="rippleheadlineTxt">Connecting you to the right Doctor!<br /> Please wait.</h2>
                      <div className="bufferBlock">
                        <h3 className="bufferCount">10 min</h3>
                        <CircularProgress className="" size={80} mode="determinate" value={100} min={0} max={100} />
                      </div>
                    </div>
                  </DialogTitle>
                  <DialogContent>
                    <div className="rippleContainer">
                      <div className="rippleBlock">
                        <div className="imageCircle">
                          <div className="circleRipple">
                            <img src="/public/images/white-icons/doctor-white.png" alt="doctor" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                  <DialogActions className="callBtmBtm">
                    <Button onClick={this.handleClickOpen} id="paymentFailure" raised className="redCallBtn" type="submit"> <i className="material-icons">call_end</i> End Call</Button>
                    {/**************** END CALL <START> *******************/}
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
                        <Button onClick={this.modelOnClose} color="primary" autoFocus>
                          Yes
                      </Button>
                      </DialogActions>
                    </Dialog>
                    {/**************** END CALL<END> *******************/}
                  </DialogActions>
                </Dialog>
                {/************************ CALL DIALOG <END> **************************/}
              </div>
              :
              <div className="fillFormBlock">
                <div className="fillFormLeft">
                  <h2 className="gotoFormHeading">Fill Your Medical Form</h2>
                  <p className="gotoFormTxt">Your Medical Form has not been Submitted yet. Please ensure that you fill the form to proceed further.</p>
                </div>
                <div className="fillFormRight">
                  <Button raised color="primary" className="gotoFormBtn" component={Link} to="/patient/medical-form-filling">Go to Medical Form <i className="material-icons">trending_flat</i></Button>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
}