import React, { Component, PropTypes } from 'react';

import styles from './component.css';
import ReactTelephoneInput from 'react-telephone-input';
import isServer from 'detect-node';
const PhoneStyles = !isServer ? require('react-telephone-input/lib/withStyles') : null;

export default class Phone extends Component {
  constructor() {
    super();
    this.state = {
      value: ''
    };
  }
  
  componentDidMount(){
    if(this.props.datavalue){
        let val = this.props.datavalue;
        this.setState({value: val[1]});
    }
  }


  componentWillReceiveProps(nextProp){
    //console.log("nextProp ====== ",nextProp);
    if(nextProp.datavalue){
      let val = nextProp.datavalue;
      this.setState({value: val[1]});
    }
  }

  /*handleValue(telNumber, selectedCountry) {
	   return;
     console.log('input changed. number: ', telNumber, 'selected country: ', selectedCountry);
		this.setState({value: telNumber});
		let arr = [selectedCountry.iso2, telNumber];
    console.log("arrr =========== ",arr)
		this.props.data.countrycode = selectedCountry.iso2;
    this.props.data.value = arr;
    this.props.callback(this.props.data.datafield, arr);
	}*/

  handleInputChange(telNumber, selectedCountry) {
    /*console.log("selectedCountry.format === ", selectedCountry.format);
    console.log("telNumber === ", telNumber);
    if (selectedCountry.format.length <= telNumber.length) {
      this.setState({ value : telNumber });
    }*/
  }

  handleValue(telNumber, selectedCountry){
    this.setState({value: telNumber});
    let telNumberLength = telNumber.length-1;
    let dialCodeNumber = selectedCountry.dialCode;
    let arr;
    if(telNumberLength == dialCodeNumber.length) {
      arr = [];
    } else {
      arr = [selectedCountry.iso2, telNumber, selectedCountry.format];
    }    
    this.props.data.value = arr;
    this.props.callback(this.props.data.datafield, arr);
  }

  render() {
    var cls = `${styles.reactTelInput}`;
    var country = 'in';
    if(this.props && this.props.datavalue && this.props.datavalue.length > 0){
      country = this.props.datavalue[0];
    }
    return (
    		<ReactTelephoneInput
          fieldId={this.props.id}
          classNames={cls} 
    		  defaultCountry={country}
    		  flagsImagePath='/images/flags.png'
    		  data-field={this.props.data.datafield}
          onChange={this.handleInputChange.bind(this)}
          onBlur={this.handleValue.bind(this)}
        	value={this.state.value}
          autoComplete={true}
    		/>
    );
  }
}
 
Phone.propTypes = {
  data: PropTypes.object.isRequired,
  value: PropTypes.array,
  callback: PropTypes.func,
  required: PropTypes.bool,
  datavalue: PropTypes.node
};

Phone.defaultProps = { edit: true, value: [], required: false };

//preferredCountries={['us', 'ca', 'zz', 'hk']}
