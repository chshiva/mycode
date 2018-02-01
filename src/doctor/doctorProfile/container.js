import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DoctorProfile from './form';
import * as registrationService from './services';
import { doctorProfileAction ,changePasswordAction} from './actions';


class DoctorProfileContainer extends React.Component {
    constructor(props) {
        super(props);

    }
    componentDidMount(){
        this.props.doctorProfileAction();
    }
    submitChangePasswordForm (data) {
        this.props.changePasswordAction(data);

    }

    render() {
        let messages = {
            changePasswordLoading: this.props.changePasswordLoading,
            ChangePasswordSuccess: this.props.ChangePasswordSuccess,
            ChangePasswordError: this.props.ChangePasswordError
        };
        return (
            <div>
                <DoctorProfile doctorProfile={this.props.doctorProfileDetails} submitChangePasswordForm={this.submitChangePasswordForm.bind(this)} messages={messages} history={this.props.history}/>
            </div>
        )
    }
};

/**
 * Map the state to props.
 */
const mapStateToProps = function (state) {
    return {
        doctorProfileDetails: state.doctorProfileDetails.onRequestDoctorProfileSuccess,
        changePasswordLoading: state.doctorProfileDetails.isChangePasswordLoading,
        ChangePasswordSuccess: state.doctorProfileDetails.onChangePasswordSuccess,
        ChangePasswordError: state.doctorProfileDetails.onChangePasswordError

    }
}


/**
 * Map the actions to props.
 */
const mapDispatchToProps = (dispatch) => {
    return {
        doctorProfileAction: () => dispatch(doctorProfileAction()),
        changePasswordAction: (data) => dispatch(changePasswordAction())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorProfileContainer);