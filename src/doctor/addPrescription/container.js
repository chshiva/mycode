import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AddPrescription from './form';
import * as prescriptionService from './services';


class DoctorAddPrescriptionContainer extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <AddPrescription />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorAddPrescriptionContainer);