import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PatientCall from './form';
import * as registrationService from './services';


class DoctorPatientCallContainer extends React.Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        return (
            <div>
                <PatientCall />
            </div>
        )
    }
};

/**
 * Map the state to props.
 */
const mapStateToProps = function (state) {
    return {}
}


/**
 * Map the actions to props.
 */
const mapDispatchToProps = (dispatch) => {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorPatientCallContainer);