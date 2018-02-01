import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Hidden from 'material-ui/Hidden';
import css from './medicalform.css';
import Stepper, { Step, StepLabel } from 'material-ui/Stepper';
import { CircularProgress } from 'material-ui/Progress';

import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import Step4 from './step4';
import Step5 from './step5';
import Step6 from './step6';
import Step7 from './step7';
import { connect } from 'react-redux';
import { setStepError } from './actions';


const styles = theme => ({
  formControl: {
    minWidth: 120,
  },

});

class MedicalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prefix: '',
      suffix: '',
      finished: false,
      stepIndex: this.props.medicalForm.stepIndex || 0,
      medicalForm: null,

      isLoading: this.props.medicalForm.isLoading || null,
      onError: this.props.medicalForm.error || null,
    };
  }

  componentDidMount() {
    this.props.dispatch(setStepError(null));
    if (this.props.medicalForm) {
      this.setState({medicalForm:this.props.medicalForm});
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps");
    console.log("componentWillReceiveProps ",nextProps.medicalForm.stepIndex);

    this.setState({ isLoading: nextProps.medicalForm.isLoading });

    if (nextProps.medicalForm.error) {
      if (parseInt(nextProps.medicalForm.stepIndex) < parseInt(this.props.medicalForm.stepIndex)) {
        this.setState({ onError: nextProps.medicalForm.error });
        var stepIndex = nextProps.medicalForm.stepIndex;
        this.setState({
          onError: nextProps.medicalForm.error,
          stepIndex: stepIndex,
          medicalForm: nextProps.medicalForm
        });
      } else {
        console.log("nextProps.medicalForm.error ", nextProps.medicalForm.error);
        this.setState({ onError: nextProps.medicalForm.error });
      // this.setState({ onError: "Error" });
      }

    }

    if (!nextProps.medicalForm.error) {
      var stepIndex = nextProps.medicalForm.stepIndex;

      this.setState({
        onError: nextProps.medicalForm.error,
        stepIndex: stepIndex,
        medicalForm: nextProps.medicalForm
      });

    } else {
      this.setState({ errorMessage: nextProps.medicalForm.error });
    }
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <Step1 handleNext={this.props.handleNext} basicdetails={this.state.medicalForm && this.state.medicalForm.basicdetails} />;
      case 1:
        return <Step2 handlePrevious={this.props.handlePrevious} handleNext={this.props.handleNext} address={this.state.medicalForm && this.state.medicalForm.address}/>;
      case 2:
        return <Step3 handlePrevious={this.props.handlePrevious} handleNext={this.props.handleNext} alternatecontactdetails={this.state.medicalForm && this.state.medicalForm.alternatecontactdetails}/>;
      case 3:
        return <Step4 handlePrevious={this.props.handlePrevious} handleNext={this.props.handleNext} emergencycontact={this.state.medicalForm && this.state.medicalForm.emergencycontact}/>;
      case 4:
        return <Step5 handlePrevious={this.props.handlePrevious} handleNext={this.props.handleNext} insurancedonarstatus={this.state.medicalForm && this.state.medicalForm.insurancedonarstatus}/>;
      case 5:
        return <Step6 handlePrevious={this.props.handlePrevious} handleNext={this.props.handleNext} information={this.state.medicalForm && this.state.medicalForm.information}/>;
      case 6:
        return <Step7 handlePrevious={this.props.handlePrevious} handleNext={this.props.handleNext} allergies={this.state.medicalForm && this.state.medicalForm.allergies}/>;
      case 7:
        this.props.history.push('/patient/dashboard');
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  render() {
    const { classes } = this.props;
    const { finished, stepIndex } = this.state;
    // const contentStyle = {padding: '0 16px'};
    console.log("this.state.onError ", this.state.onError);

    return (
      <div>
        <div className="noAccess">
          <p>Rotate to portrait for better usage.</p>
        </div>
        <div className="mainContainer">
          <Grid container spacing={24} >
            <Grid item xs={12} md={12}>
              <div className="block24px">
                <h2 className="headlineTxt">Medical Form Filling</h2>
                <Stepper activeStep={stepIndex} alternativeLabel className="stepsBox">
                  <Step>
                    <StepLabel><Hidden smDown>Basic Details</Hidden></StepLabel>
                  </Step>
                  <Step>
                    <StepLabel><Hidden smDown>Address</Hidden></StepLabel>
                  </Step>
                  <Step>
                    <StepLabel><Hidden smDown>Email & Phone</Hidden></StepLabel>
                  </Step>
                  <Step>
                    <StepLabel><Hidden smDown>Emergency Contact</Hidden></StepLabel>
                  </Step>
                  <Step>
                    <StepLabel><Hidden smDown>Insurance &amp; Donor Status</Hidden></StepLabel>
                  </Step>
                  <Step>
                    <StepLabel><Hidden smDown>Primary Doctor &amp; Hospital Information</Hidden></StepLabel>
                  </Step>
                  <Step>
                    <StepLabel><Hidden smDown>Allergies</Hidden></StepLabel>
                  </Step>
                </Stepper>
                
                  {this.state.onError && <div className="errorBox"> {this.state.onError} </div>}
                  {this.state.isLoading && <div className="circularProgress"> <CircularProgress /> </div> }
         
                <div className="contentStyle">
                  {finished ? (
                    <div>
                      <a href="#" onClick={(event) => {
                        event.preventDefault();
                        this.setState({ stepIndex: 0, finished: false });
                      }}
                      >
                        Click here
                      </a> to reset the example.
                    </div>
                  ) : (
                      <div>
                        <div>{this.getStepContent(stepIndex)}</div>
                        {/* <div style={{marginTop: 12}}>
                      <Button label="Back"
                          disabled={stepIndex === 0}
                          onClick={this.handlePrev}
                          style={{marginRight: 12, color: '#000'}}
                        />
                        <Button raised
                          label={stepIndex === 2 ? 'Finish' : 'Next'}
                          primary={true}
                          onClick={this.handleNext}
                        />
                      </div>*/}
                      </div>
                    )}
                </div>
              </div>
            </Grid>
          </Grid>
        </div>

      </div>
    );
  }
};


/**  Map the state to props. */
const mapStateToProps = function (state) {
  return {
    user: state.user,
    medicalForm: state.medicalForm
  }
}
export default connect(mapStateToProps)(MedicalForm);