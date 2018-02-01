import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MyPatients from './form';
import * as registrationService from './services';


class DoctorMyPatientsContainer extends React.Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        return (
            <div>
                <MyPatients />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorMyPatientsContainer);