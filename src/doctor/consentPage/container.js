import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ConsentPage from './form';
import { consentAgreeAction }  from './actions';



class DoctorConsentPageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.submitConsentForm = this.submitConsentForm.bind(this);
    }

    componentDidMount(){
        var token = localStorage.getItem('userAuthToken')
        if(!token){
            this.props.history.push('/');
        }
    }

  componentWillReceiveProps (nextprops) {
    console.log("componentWillReceiveProps ", nextprops);    
    if (nextprops.onSuccess && nextprops.onSuccess != null) {  
        this.props.history.push('/doctor/doctor-form');
    }
  }    

    submitConsentForm(formObject) {
        console.log("submitConsentForm formObject", formObject);
        this.props.consentAgreeAction(formObject);
    }

    render() {
        let messages = {
          isLoading: this.props.isLoading,
          onSuccess: this.props.onSuccess,
          onError: this.props.onError
        };

        return (
            <div>
                <ConsentPage submitConsentForm={this.submitConsentForm} messages={messages}/>
            </div>
        )
    }
};

/**
 * Map the state to props.
 */
const mapStateToProps = function (state) {
  return {
    isLoading: state.consentPage.isLoading,
    onSuccess: state.consentPage.onSuccess,
    onError: state.consentPage.onError,
    login: state.login
  }
};

/**
 * Map the actions to props.
 */
const mapDispatchToProps = dispatch => ({
    consentAgreeAction: (consentPageForm) => dispatch(consentAgreeAction(consentPageForm))
});

export default connect(mapStateToProps, mapDispatchToProps)(DoctorConsentPageContainer);
// export default connect(mapStateToProps)(ConsentPageContainer);