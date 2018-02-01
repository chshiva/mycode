import React from 'react';
import { connect } from 'react-redux';
import PatientHistory from './form';

export default class DoctorPatientHistoryContainer extends React.Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        return (
            <div>
                <PatientHistory />
            </div>
        )
    }
};