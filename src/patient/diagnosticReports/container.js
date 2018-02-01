import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DiagnosticReports from './form';
import * as diagnosticReportsService from './services';
import {diagnosticReportsAction} from './actions';

class PatientDiagnosticReportsContainer extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <DiagnosticReports />
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
        isDiagnosticReportsLoading: state.requestDiagnosticReports.isDiagnosticReportsLoading,
        onRequestDiagnosticReportsSuccess: state.requestDiagnosticReports.onRequestDiagnosticReportsSuccess,
        onRequestDiagnosticReportsError: state.requestDiagnosticReports.onRequestDiagnosticReportsError,
    }
}


/**
 * Map the actions to props.
 */
const mapDispatchToProps = (dispatch) => {
    return {
        diagnosticReportsAction: () => dispatch(diagnosticReportsAction()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientDiagnosticReportsContainer);