import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DoctorDashboardForm from './form';
import * as registrationService from './services';
import { doctorDashboardAction } from './actions';
import socketService from '../../commons/pplsocket/socketService';

class DoctorDashboardContainer extends React.Component {
    constructor(props) {
        super(props);

    }
    componentWillMount() {
        this.props.doctorDashboardAction();
    }

    handleDoctorStatus(status) {
        socketService.changeDoctorStatus(status, (response) => {
            console.log('doctor status:', response);
        });
    }

    render() {
        return (
            <div>
                <DoctorDashboardForm doctorDashboard={this.props.onRequestdoctorDashboardSuccess} handleDoctorStatus={this.handleDoctorStatus.bind(this)} />
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
        isDoctorDashboardLoading: state.requestDoctorDashboard.isDoctorDashboardLoading,
        onRequestDoctorDashboardSuccess: state.requestDoctorDashboard.onRequestDoctorDashboardSuccess,
        onRequestDoctorDashboardError: state.requestDoctorDashboard.onRequestDoctorDashboardError,
    }
}

/**
 * Map the actions to props.
 */
const mapDispatchToProps = (dispatch) => {
    return {
        doctorDashboardAction: () => dispatch(doctorDashboardAction()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorDashboardContainer);