import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PriscriptionForm from './form';
import * as registrationService from './services';
import { prescriptionAction } from './actions';

class PatientPrescriptionContainer extends React.Component {
    constructor(props) {
        super(props);

    }
    componentWillMount(){
        this.props.prescriptionAction();
    }

    render() {
        return (
            <div>
                <PriscriptionForm prescription={this.props.onRequestPrescriptionSuccess} />
            </div>
        )
    }
};

/**
 * Map the state to props.
 */
const mapStateToProps = function (state) {
    console.log('states', state);
    return {
        isPrescriptionLoading: state.requestPrescription.isPrescriptionLoading,
        onRequestPrescriptionSuccess: state.requestPrescription.onRequestPrescriptionSuccess,
        onRequestPrescriptionError: state.requestPrescription.onRequestPrescriptionError,
    }
}


/**
 * Map the actions to props.
 */
const mapDispatchToProps = (dispatch) => {
    return {
        prescriptionAction: () => dispatch(prescriptionAction()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientPrescriptionContainer);