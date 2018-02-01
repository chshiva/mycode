import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DoctorForm from './form';
import * as DoctorFormService from './services';
import * as DoctorDetailsFormUpdateActions from './actions';


class DoctorFormContainer extends React.Component {
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
            this.props.dispatch(DoctorDetailsFormUpdateActions.getDoctorDetailsFormAction());
        } else {
            this.props.history.push('/');
        }

    }
    componentWillUnmount() {
        this.props.dispatch(DoctorDetailsFormUpdateActions.setDoctorDetailsFormStepIndex(0));

    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    handleNext(stepData, stepIndex) {
        console.log("next click on ", stepIndex);
        console.log("handleNext ", stepData);
        if (stepIndex == 0) { //  step zero
            this.props.dispatch(DoctorDetailsFormUpdateActions.setp0DoctorDetailsFormAction(stepData));
        } else if (stepIndex == 1) { //  step one
            this.props.dispatch(DoctorDetailsFormUpdateActions.setp1DoctorDetailsFormAction(stepData));
        } else if (stepIndex == 2) { //  step two
            this.props.dispatch(DoctorDetailsFormUpdateActions.setp2DoctorDetailsFormAction(stepData));
        } else if (stepIndex == 3) { //  step three
            this.props.dispatch(DoctorDetailsFormUpdateActions.setp3DoctorDetailsFormAction(stepData));
        } else if (stepIndex == 4) { //  step four
            this.props.history.push('/dashboard');
        } else {
            console.log("No step has been selected");
        }
    }

    handlePrevious(stepData, stepIndex) {
        console.log("Back click on ", stepIndex);
        if (stepIndex == 0) {
            console.log("No Previous Step");
        } else if (stepIndex > 0 && stepIndex <= 3) {
            this.props.dispatch(DoctorDetailsFormUpdateActions.setDoctorDetailsFormStepIndex(stepIndex - 1));
        } else {
            console.log("Step Index Doesn't Exists");
        }
    }

    render() {
        return (
            <div>
                <DoctorForm handleNext={this.handleNext} handlePrevious={this.handlePrevious} history={this.props.history}/>
            </div>
        )
    }
};

/**
 * Map the state to props.
 */
const mapStateToProps = function (state) {
    return {
        user: state.user,
        doctorDetailsForm: state.doctorDetailsForm
    }
}


// /**
//  * Map the actions to props.
//  */
// const mapDispatchToProps = (dispatch) => {
//     return {
//         user: state.user,
//         doctorDetailsForm: state.doctorDetailsForm
//     };
// }

export default connect(mapStateToProps)(DoctorFormContainer);