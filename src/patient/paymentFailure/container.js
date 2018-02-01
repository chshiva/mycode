import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PaymentFailureForm from './form';


class paymentFailureContainer extends React.Component {
    constructor(props) {
        super(props);
        this.navigatePlans = this.navigatePlans.bind(this);
        
    }

    navigatePlans() {
        console.log('prowefsd', this.props)
        this.props.history.push('/patient/choose-plans');
    }

    render() {
        return (
            <div>
                <PaymentFailureForm navigatePlans={this.navigatePlans}/>
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



export default connect(mapStateToProps, mapDispatchToProps)(paymentFailureContainer);
