import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EmailConfirmation from './form';
import * as EmailConfService from './services';

export default class EmailConfContainer extends React.Component {
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
                <EmailConfirmation onSubmit={this.submitForm} />
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

export default connect(mapStateToProps, mapDispatchToProps)(EmailConfContainer);