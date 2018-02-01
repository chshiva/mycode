import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MedicalRecords from './form';
import * as medicalRecordsService from './services';


class DoctorMedicalRecordsContainer extends React.Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        return (
            <div>
                <MedicalRecords />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorMedicalRecordsContainer);