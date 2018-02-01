import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ResetPasswordConfirmationForm from './form';
import * as ResetConfService from './services';


export default class ResetPasswordConfirmationContainer extends React.Component {
    constructor(props) {
        super(props);
        this.redirectToLogin = this.redirectToLogin.bind(this);
    }

    redirectToLogin () {
        this.props.history.push('/');
    }


    render() {
        return (
            <div>
                <ResetPasswordConfirmationForm redirectToLogin={this.redirectToLogin} />
            </div>
        )
    }
};