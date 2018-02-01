import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ResetPwdConfirmation from './form';
import * as ResetConfService from './services';

export default class ResetConfContainer extends React.Component {
    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm(formProps) {
        this.props.actions.login(formProps);
    }

    render() {
        return (
            <div>
                <ResetPwdConfirmation onSubmit={this.submitForm} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ResetConfContainer);