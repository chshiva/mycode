import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DiagnosticReports from './form';
import * as diagnosticReportsService from './services';


class DoctorAddDiagnosticCountainer extends React.Component {
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
    return { }
  }
  
  
  /**
   * Map the actions to props.
   */
   const mapDispatchToProps = (dispatch) => {
    return { };
  }
  
  export default connect(mapStateToProps , mapDispatchToProps)(DoctorAddDiagnosticCountainer);