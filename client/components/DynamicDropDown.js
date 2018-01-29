import React, { Component, PropTypes } from 'react';

import styles from './component.css';
import callApi from '../util/apiCaller';
import AuthClient from './AuthController';
export default class DynamicDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      optionsData : ''
    };
  }

  componentDidMount(){
    if(this.props.datavalue && this.props.datavalue.trim() != ''){
        this.state = {value: this.props.datavalue};
    }
    if(this.props.data){
      this.getOptionValues(this.props.data);
    }
    if (this.props.error) {
      this.refs[this.props.data._id].focus();
    }
  }

  componentWillReceiveProps(nextProp){
    if(nextProp.datavalue && nextProp.datavalue.trim() != ''){
      this.state = {value: nextProp.datavalue};
    }
    if(nextProp.data){
      this.getOptionValues(nextProp.data);
    }
    if (nextProp.error) {
      this.refs[this.props.data._id].focus();
    }
  }

  getOptionValues = (obj) => {
    /*var conditions = {
      token : AuthClient.getSession()
    }*/
    // return callApi(obj.apicall, 'post', conditions ).then(res => {
    return callApi(obj.apicall, 'get' ).then(res => {
      // console.log("res === ",res);
      var options;
      
      options = res.data.map(function(option) {
                      return (<option key={option[0]} value={option[0]}>{option[1]}</option>);  
                      });
      
      let val = res.data[0];
      //this.props.data.value = val[0];
      let value = val[0];
      if(this.props.datavalue && this.props.datavalue.trim() != ''){
        value = this.props.datavalue;
        this.props.callback(this.props.data.datafield, value);
        this.setState({ optionsData : options, value : value });
      } else if (this.state.value.trim() != '' && value.trim() != this.state.value.trim()) {
        this.props.callback(this.props.data.datafield, this.state.value);
        this.setState({ optionsData : options, value : this.state.value });
      } else {
        this.props.callback(this.props.data.datafield, value);
        this.setState({ optionsData : options });
      }
    });
  }

  handleValue(e){
    this.setState({value: e.target.value});
    this.props.callback(this.props.data.datafield, e.target.value);
  }

  render() {
    //var cls = `${styles.iElement} ${styles.oElement}`;
    // this.state = {value: statVal};
    //this.props.callback(this.props.data.datafield, this.props.datavalue);
    if(this.state.optionsData != ''){
      
      return (
        <select id={this.props.data._id} className={this.props.classname}
          onChange={this.handleValue.bind(this)} value={this.state.value}
          ref={this.props.data._id} data-field={this.props.data.datafield}>
             {this.state.optionsData}
        </select>
      );
    }else{
      return null;
    }
  }
}
 
DynamicDropDown.propTypes = {
  data: PropTypes.object.isRequired,
  edit: PropTypes.bool,
  value: PropTypes.node,
  callback: PropTypes.func,
  required: PropTypes.bool,
  //datavalue: PropTypes.node
  datavalue : React.PropTypes.oneOfType([
      React.PropTypes.node,
      React.PropTypes.object
    ])
};

DynamicDropDown.defaultProps = { edit: true, value: '', required: false };

