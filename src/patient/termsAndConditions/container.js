import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TermsAgreement from './form';
import * as termsService from './services';


/**
 * Map the state to props.
 */
const mapStateToProps = state => ({
    token: state.login.token,
    isAuthenticated: state.login.isAuthenticated
});

/**
 * Map the actions to props.
 */
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, termsService), dispatch)
});

class TermsContainer extends React.Component {
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
                <TermsAgreement onSubmit={this.submitForm} />
            </div>
        )
    }
};

export default connect(mapStateToProps , mapDispatchToProps)(TermsContainer);