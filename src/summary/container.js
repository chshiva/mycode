import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SummaryForm from './form';
import * as registrationService from './services';

export default class Summary extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <SummaryForm />
            </div>
        )
    }
};

/**
 * Map the state to props.
 */
const mapStateToProps = function (state) {
    return {};
}


/**
 * Map the actions to props.
 */
const mapDispatchToProps = (dispatch) => {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Summary);