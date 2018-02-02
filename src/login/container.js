import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LoginForm from './form';
import * as loginService from './services';


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
    actions: bindActionCreators(Object.assign({}, loginService), dispatch)
});

@connect(mapStateToProps, mapDispatchToProps)
export default class LoginContainer extends React.Component {
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
                <LoginForm onSubmit={this.submitForm} />
            </div>
        )
    }
};