import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ChatHistoryForm from './form';
import * as registrationService from './services';

class chatHistory extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <ChatHistoryForm />
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

export default connect(mapStateToProps, mapDispatchToProps)(chatHistory);