import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PaymentSuccessForm from './form';
import * as registrationService from './services';


// @connect(mapStateToProps, mapDispatchToProps)
class paymentSuccessContainer extends React.Component {
    constructor(props) {
        super(props);
        this.navigateDashboard = this.navigateDashboard.bind(this);

        
    }
    navigateDashboard() {
        console.log('prowefsd', this.props)
        this.props.history.push('/patient/dashboard');
    }


    render() {
        return (
            <div>
                <PaymentSuccessForm navigateDashboard={this.navigateDashboard}/>
            </div>
        )
    }
};

/**
 * Map the state to props.
 */
const mapStateToProps = function (state) {
    return {

    }
}

/**
 * Map the actions to props.
 */

const mapDispatchToProps = (dispatch) => {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(paymentSuccessContainer);
