import React from 'react';
import { connect } from 'react-redux';
import PendingApproval from './form';

export default class DoctorPendingApprovalContainer extends React.Component {
    constructor(props) {
        super(props);
       
    }

    
    render() {
        return (
            <div>
                <PendingApproval/>
            </div>
        )
    }
};