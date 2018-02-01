import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ForgotPasswordConfirmationForm from './form';
import * as ResetConfService from './services';


class ForgotPasswordConfirmationContainer extends React.Component {
    constructor(props) {
        super(props);
        this.redirectToLogin = this.redirectToLogin.bind(this);
    }

    componentWillMount () {
        if (this.props.forgotpasswordEmail == null) {
            this.props.history.push('/');            
        }
    }

    redirectToLogin () {
        this.props.history.push('/');
    }


    render() {
        console.log("this.props.forgotpasswordEmail ", this.props.forgotpasswordEmail);
        return (
            <div>
                <ForgotPasswordConfirmationForm forgotpasswordEmail={this.props.forgotpasswordEmail} redirectToLogin={this.redirectToLogin} />
            </div>
        )
    }
};



/**
 * Map the state to props.
 */
const mapStateToProps = function (state) {
  return {
    forgotpasswordEmail: state.forgotPassword.forgotpasswordEmail
  }
}


/**
 * Map the actions to props.
 */

 const mapDispatchToProps = (dispatch) => {
  return { };
}



export default connect(mapStateToProps , mapDispatchToProps)(ForgotPasswordConfirmationContainer);