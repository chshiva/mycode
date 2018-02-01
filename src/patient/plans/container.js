import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ChoosePlanForm from './form';
import { paymentAction, paymentSuccessAction, paymentErrorAction } from './actions';
import utils from '../../commons/utils';
import { callAccountApi,callRequestPaymentsApi } from './services';
import { callRequestAccountsApi } from '../dashboard/services';


class ChoosePlansContainer extends React.Component {
    constructor(props) {
        super(props);
        this.responsePayment = this.responsePayment.bind(this);
        this.openCheckout = this.openCheckout.bind(this);
        this.paymentSucess = null;
        this.state = {
            plans:[],
            payments: []
        }
    }
    responsePayment(paymentDetails) {
        this.props.paymentAction(paymentDetails);
    }

    componentDidMount() {
        this.props.paymentSuccessAction(null);
        this.props.paymentErrorAction(null);
        callAccountApi(response => {
            console.log("callAccountApi response ", response);
            if (response.status) {
                this.setState({ plans: response.result.data });
            } 
        })
        callRequestPaymentsApi(this.props.userDetails._id,response => {
            console.log("callRequestPaymentsApi response ", response);
            if (response.status) {
                this.setState({ payments: response.result.data });
            } 
        })
        // utils.httpRequest('accounts?offset=0&limit=10', 'get', {}, (response) => {
        //     console.log("callPaymentApi response ", response);
        //     if(response.status){
        //         this.setState({plans: response.result.data});
        //     }
        // });
    }

    openCheckout(amount, accountid) {
        var self = this;
        let options = {
            "key": "rzp_test_3xkOY25qAuStiT",
            "amount": amount * 100,
            "name": "NETIK",
            "description": "Quick Clinic",
            //"image": "/your_logo.png",
            "handler": (response) => {
                let paymentDetails = {
                    paymentId: response.razorpay_payment_id,
                    // paymentId: response.razorpay_payment_id,                    
                    amount: amount * 100
                    // amount:this.state.amount
                }
                // console.log('selfProps',self.props);
                self.responsePayment(paymentDetails);
            },
            "notes": {
                "accountid": accountid,
                "userid": this.props.userDetails._id
            },
            modal: {
                escape: false,
                ondismiss: function () {
                    console.log("dismiss");
                    self.props.history.push('/patient/payment-failure')

                }
            }

        };

        let rzp = new Razorpay(options);
        rzp.open();
    }

    componentDidReceiveProps(nextprops) {
        // this.setState({ paymentSucess: nextprops.paymentSucessData });
        // this.paymentSucess = null;

        if (nextprops.paymentSucessData) {
            this.setState({ paymentSucess: nextprops.paymentSucessData });
            this.props.history.push('/patient/payment-success');
        }
        if (nextprops.paymentErrorData) {
            this.props.history.push('/patient/payment-failure');
        }
    }


    render() {

        return (
            <div>
                <ChoosePlanForm openCheckout={this.openCheckout} plans={this.state.plans} payments={this.state.payments}/>
            </div>
        )
    }
};


/**
 * Map the state to props.
 */
const mapStateToProps = function (state) {
    return {
        isPlansLoading: state.requestPlans.isPlansLoading,
        onRequestPLansSuccess: state.requestPlans.onRequestPLansSuccess,
        onRequestPLansError: state.requestPlans.onRequestPLansError,
        isPaymentLoading: state.requestPlans.isPaymentLoading,
        paymentSucessData: state.requestPlans.paymentSucessData,
        paymentErrorData: state.requestPlans.paymentErrorData,
        userDetails: state.user.userDetails
    }
}


/**
 * Map the actions to props.
 */
const mapDispatchToProps = (dispatch) => {
    return {
        paymentAction: (paymentDetails) => dispatch(paymentAction(paymentDetails)),
        plansAction: () => dispatch(plansAction()),
        paymentSuccessAction: (data) => dispatch(paymentSuccessAction(data)),
        paymentErrorAction: (data) => dispatch(paymentErrorAction(data))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChoosePlansContainer);