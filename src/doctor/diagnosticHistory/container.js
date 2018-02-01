import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DiagnosticHistory from './form';
import * as diagnosticHistoryService from './services';
import {diagnosticHistoryAction } from './actions';

class DoctorDiagnosticHistoryContainer extends React.Component {
    constructor(props) {
        super(props);
        
    }
    componentWillMount(){
        this.props.diagnosticHistoryAction();
    }

    render() {
        return (
            <div>
                <DiagnosticHistory diagnosticHistory={this.props.onRequestDiagnosticHistorySuccess}/>
            </div>
        )
    }
};

/**
 * Map the state to props.
 */
const mapStateToProps = function (state) {
    console.log('states',state)
    return {
        isDiagnosticHistoryLoading: state.requestDiagnosticHistory.isDiagnosticHistoryLoading,
        onRequestDiagnosticHistorySuccess: state.requestDiagnosticHistory.onRequestDiagnosticHistorySuccess,
        onRequestDiagnosticHistoryError: state.requestDiagnosticHistory.onRequestDiagnosticHistoryError,
    }
}


/**
 * Map the actions to props.
 */
const mapDispatchToProps = (dispatch) => {
    return {
        diagnosticHistoryAction : () => dispatch(diagnosticHistoryAction()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorDiagnosticHistoryContainer);