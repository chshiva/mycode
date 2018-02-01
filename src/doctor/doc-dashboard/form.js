import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Avatar from 'material-ui/Avatar';
import css from './docDashboard.css';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import { FormControl, FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import green from 'material-ui/colors/green';
import ExpansionPanel, { ExpansionPanelDetails, ExpansionPanelSummary, } from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Checkbox from 'material-ui/Checkbox';

const styles = {
  bar: {},
  defaultChecked: {
    color: green[500],
    '& + $bar': {
      backgroundColor: green[500],
    },
  },
};

class DoctorDashboardForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false,
      status: false,
      expanded: 'panel1'
    }
  }
  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  handleChangeStatus = (event) => {
    this.setState({ status: event.target.checked });
    this.props.handleDoctorStatus(event.target.checked);
  }

  menuOpen = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  menuClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { expanded } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <div className="noAccess">
          <p>Rotate to portrait for better usage.</p>
        </div>
        <div className="dashboardMain">
          <div className="dashboardContainer">
            <div className="displayCardBlock">
              <p className="subHeadingRegular">My Past 5 Appointments</p>
              <div className="expansionsBlock">
                <ExpansionPanel defaultExpanded expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Grid container spacing={24}>
                      <Grid item xs={12} md={12}>
                        <Typography className="yearTxt">2018</Typography>
                      </Grid>
                    </Grid>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className="detailsBox">
                    <Grid container spacing={24}>
                      <Card className="cardInfoBox">
                        <div className="dCardHeadline">September 14, 2016</div>
                        <Grid container spacing={24}>
                          <Grid item xs={12} md={5}>
                            <CardHeader
                              avatar={
                                <Avatar alt="user one" src="/public/images/user.jpeg" className="" />
                              }
                              title="Patient Name"
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
                      <Card className="cardInfoBox">
                        <div className="dCardHeadline">September 14, 2016</div>
                        <Grid container spacing={24}>
                          <Grid item xs={12} md={5}>
                            <CardHeader
                              avatar={
                                <Avatar alt="user one" src="/public/images/doctorl1.jpeg" className="" />
                              }

                              title="Patient Name"
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
                    </Grid>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Grid container spacing={24}>
                      <Grid item xs={12} md={12}>
                        <Typography className="yearTxt">2017</Typography>
                      </Grid>
                    </Grid>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className="detailsBox">
                    <Grid container spacing={24}>
                      <Card className="cardInfoBox">
                        <div className="dCardHeadline">September 14, 2016</div>
                        <Grid container spacing={24}>
                          <Grid item xs={12} md={5}>
                            <CardHeader
                              avatar={
                                <Avatar alt="user one" src="/public/images/doctorl2.jpeg" className="" />
                              }

                              title="Patient Name"
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
                      <Card className="cardInfoBox">
                        <div className="dCardHeadline">September 14, 2016</div>
                        <Grid container spacing={24}>
                          <Grid item xs={12} md={5}>
                            <CardHeader
                              avatar={
                                <Avatar alt="user one" src="/public/images/doctorm1.jpeg" className="" />
                              }

                              title="Patient Name"
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
                    </Grid>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Grid container spacing={24}>
                      <Grid item xs={12} md={12}>
                        <Typography className="yearTxt">2016</Typography>
                      </Grid>
                    </Grid>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className="detailsBox">
                    <Grid container spacing={24}>
                      <Card className="cardInfoBox">
                        <div className="dCardHeadline">September 14, 2016</div>
                        <Grid container spacing={24}>
                          <Grid item xs={12} md={5}>
                            <CardHeader
                              avatar={
                                <Avatar alt="user one" src="/public/images/user.jpeg" className="" />
                              }

                              title="Patient Name"
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
                      <Card className="cardInfoBox">
                        <div className="dCardHeadline">September 14, 2016</div>
                        <Grid container spacing={24}>
                          <Grid item xs={12} md={5}>
                            <CardHeader
                              avatar={
                                <Avatar alt="user one" src="/public/images/doctorl1.jpeg" className="" />
                              }

                              title="Patient Name"
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
                      <Card className="cardInfoBox">
                        <div className="dCardHeadline">September 14, 2016</div>
                        <Grid container spacing={24}>
                          <Grid item xs={12} md={5}>
                            <CardHeader
                              avatar={
                                <Avatar alt="user one" src="/public/images/doctorl2.jpeg" className="" />
                              }

                              title="Patient Name"
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
                      <Card className="cardInfoBox">
                        <div className="dCardHeadline">September 14, 2016</div>
                        <Grid container spacing={24}>
                          <Grid item xs={12} md={5}>
                            <CardHeader
                              avatar={
                                <Avatar alt="user one" src="/public/images/doctorm1.jpeg" className="" />
                              }

                              title="Patient Name"
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
                    </Grid>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </div>
            </div>

            <div className="swicthToggle">
              <Grid container spacing={24}>
                <Grid item xs={12} sm={6}>
                  <div className="toggleInfoBlock">
                    <div className="avacircle80">
                      <img src="/public/images/doctorl1.jpeg" alt="doctor" />
                    </div>
                    <div className="docDetails">
                      <h2 className="docName">Dr. Mary Jones</h2>
                      <p className="callTxt">Specialization: <span>Orthopedic</span></p>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className="toggleInfoBlock">
                    <div className="switchBtn" >
                      <h2 className="switchTxt">Doctor's Availability :</h2>
                      <FormControlLabel className="toggleBtn" control={<Switch classes={{ checked: classes.defaultChecked, bar: classes.bar, }} checked={this.state.status} onChange={this.handleChangeStatus.bind(this)} />} />
                    </div>
                    <div>
                      <input className="tgl tgl-skewed" id="cb3" type="checkbox" defaultChecked={this.state.status} />
                      <label className="tgl-btn" data-tg-off="NOT AVAILABLE" data-tg-on="AVAILABLE" htmlFor="cb3"></label>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
export default (withStyles(styles)(DoctorDashboardForm));