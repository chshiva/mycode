import React from 'react';
import { connect } from 'react-redux';
import MedicalForm from './form';

import * as MedicalFormUpdateActions from './actions';



class MedicalFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      stepIndex: this.props.stepIndex || 0,
      errorMessage: ""
    };

    this.handleNext = this.handleNext.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem('userAuthToken')) {
      this.props.dispatch(MedicalFormUpdateActions.getmedicalFormDeatilsAction());
    } else {
      this.props.history.push('/');
    }

  }
  componentWillUnmount(){
    this.props.dispatch(MedicalFormUpdateActions.setMedicalFormStepIndex(0));
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;    
  }


  handleNext (stepData, stepIndex) {
    console.log("next click on ", stepIndex );
    console.log("handleNext ", stepData );
    if (stepIndex == 0) { //  step zero
      this.props.dispatch(MedicalFormUpdateActions.setp0medicalFormAction(stepData));
    } else if (stepIndex == 1) { //  step one
      this.props.dispatch(MedicalFormUpdateActions.setp1medicalFormAction(stepData));
    } else if (stepIndex == 2) { //  step two
      this.props.dispatch(MedicalFormUpdateActions.setp2medicalFormAction(stepData));
    } else if (stepIndex == 3) { //  step three
      this.props.dispatch(MedicalFormUpdateActions.setp3medicalFormAction(stepData));
    } else if (stepIndex == 4) { //  step four
      this.props.dispatch(MedicalFormUpdateActions.setp4medicalFormAction(stepData));
    } else if (stepIndex == 5) { //  step five
      this.props.dispatch(MedicalFormUpdateActions.setp5medicalFormAction(stepData));
    } else if (stepIndex == 6) { //  step six
      this.props.dispatch(MedicalFormUpdateActions.setp6medicalFormAction(stepData));
    } else if (stepIndex == 7) { //  step six
      this.props.history.push('/patient/dashboard');
    } else {
      console.log("No step has been selected");
    }
  }

  handlePrevious(stepData, stepIndex){
    console.log("Back click on ", stepIndex );
    if (stepIndex == 0) {
      console.log("No Previous Step");
    } else if (stepIndex > 0 && stepIndex <= 6) {
      this.props.dispatch(MedicalFormUpdateActions.setMedicalFormStepIndex(stepIndex-1));
    } else {
      console.log("Step Index Doesn't Exists");
    }
  }
  
  render() {
    return (
      <div>
        <MedicalForm handleNext={this.handleNext} handlePrevious={this.handlePrevious} history={this.props.history}/>
      </div>
    )
  }
};
/**  Map the state to props. */
const mapStateToProps = function (state) {
  return {
    user: state.user,
    medicalForm: state.medicalForm
  }
}
export default connect(mapStateToProps)(MedicalFormContainer);