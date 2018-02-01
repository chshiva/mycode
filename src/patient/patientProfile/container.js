import React from 'react';
import { connect } from 'react-redux';
import MyProfile from './form';
import { patientProfileAction } from './actions';

class PatientProfileContainer extends React.Component {
    constructor(props) {
        super(props);
        
    }
    componentDidMount(){
        this.props.patientProfileAction();
    }

    render() {
        return (
            <div>
                <MyProfile patientProfile={this.props.patientProfileDetails} userDetails={this.props.userDetails} history={this.props.history}/>
            </div>
        )
    }
};

/**
 * Map the state to props.
 */
const mapStateToProps = function (state) {
    return {
        patientProfileDetails: state.patientProfileDetails.onRequestPatientProfileSuccess,
        userDetails:state.user.userDetails
    }
}


/**
 * Map the actions to props.
 */
const mapDispatchToProps = (dispatch) => {
    return {
        patientProfileAction: () => dispatch(patientProfileAction())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientProfileContainer);