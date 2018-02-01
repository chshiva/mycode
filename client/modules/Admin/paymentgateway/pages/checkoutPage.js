import React, { PropTypes, Component } from 'react';

import { connect } from 'react-redux';

import { Link } from 'react-router';

import AuthClient from '../../../../components/AuthController';

import DataObject from '../../../../components/DataObject';

import { isLoggedIn } from '../../../Login/LoginActions';

import { loggedInData } from '../../../Login/LoginReducer';

import ContainerComponent from '../../../../components/ContainerComponent';

import styles from '../../Admin.css';
import { paymentMainMenu, paymentSubMenu } from '../Schema/paymentMenu';
import { paymentSchema } from '../Schema/PaymentSchema';



import {Col, Row, Grid} from 'react-bootstrap';

var dataObject = {};

export class checkoutPage extends Component {
	constructor(props) {
		super(props);
    /*this.form = null;
    this.submenu = paymentSubMenu;   
    this.mainmenu = paymentMainMenu;
    this.schema = paymentSchema;
    this.res = {};
    this.mainmenu.menus[1].action = this.save.bind(this);
		*/
	}

	/*componentWillMount() {
      this.props.dispatch(isLoggedIn(AuthClient.getSession(), 
                    '/admin/corporate/new')).then(res => {
      	if(res) {
      		this.setdata(res)
      	}
      });
  }
   setdata(result){
    console.log(result);
    if(result){
        this.props.dispatch(PaymentStore({ uid: result.data._id }));
    }
  }

save = () => {
    this.props.dispatch(SaveCorporate(this.form));

  }
datareceive(data) {
    this.form = data;
  }
*/
render() {
  var center = "center"
  return ( 
    <form method="POST" name="customerData" action="/ccavRequestHandler">
    <table width="40%" height="100" border='1' align="center">
      <caption>
        <font size="4" color="blue"><b>Integration Kit</b></font>
      </caption>
    </table>
    <table width="40%" height="100" border='1' align={center}>
    <tbody>
      <tr>
        <td>Parameter Name:</td>
        <td>Parameter Value:</td>
      </tr>
      <tr>
        <td colspan="2">Compulsory information</td>
      </tr>
      <tr>
        <td>Merchant Id</td>
        <td><input type="text" name="merchant_id" id="merchant_id" value="74138" /> </td>
      </tr>
      <tr>
        <td>Order Id</td>
        <td><input type="text" name="order_id" value="dfdfdvdv1322ewr3wr" /></td>
      </tr>
      <tr>
        <td>Currency</td>
        <td><input type="text" name="currency" value="INR" /></td>
      </tr>
      <tr>
        <td>Amount</td>
        <td><input type="text" name="amount" value="1.00" /></td>
      </tr>
      <tr>
        <td>Redirect URL</td>
        <td><input type="text" name="redirect_url"
          value="http://127.0.0.1:8000/ccavResponseHandler" />
        </td>
      </tr>
      <tr>
        <td>Cancel URL</td>
        <td><input type="text" name="cancel_url"
          value="http://127.0.0.1:8000/ccavResponseHandler" />
        </td>
      </tr>
      <tr>
        <td>Language</td>
        <td><input type="text" name="language" id="language" value="EN" /></td>
      </tr>
      <tr>
        <td colspan="2">Billing information(optional):</td>
      </tr>
     
      <tr>
        <td></td>
        <td><input type="submit" value="Checkout" /></td>
      </tr>
      </tbody>
    </table>
  </form>
         );
	/*if(this.props.paymentData) {
		return (
		<ContainerComponent data={ this.props.corporateData.schema }
          submenu={ this.submenu }
          topmenu={ this.mainmenu }
          dataFun = { this.datareceive }
          dataobject = { dataObject }
       />
		);
	}
	else {
		return(
			<div>
			<h2>Loading...............</h2>
			</div>
			);
	}
*/	}
}

/*function mapStateToProps(state) {
  return {
    paymentData: paymentData(state)
  };
}
checkoutPage.propTypes = {
  paymentData: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};
checkoutPage.contextTypes = {
  router: React.PropTypes.object,
};*/

//export default connect(mapStateToProps)(checkoutPage);
