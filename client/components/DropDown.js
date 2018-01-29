import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import styles from './component.css';

export default class DropDown extends Component {
  constructor() {
    super();
    this.state = {
      value: ''
    };
  }

  componentDidMount() {
    if (this.props.datavalue) {
      this.setState({ value: this.props.datavalue });
    }
    if (this.props.error) {
      this.refs[this.props.data._id].focus();
    }
  }


  componentWillReceiveProps(nextProp) {
    if (nextProp.datavalue) {
      this.setState({ value: nextProp.datavalue });
    }
    if (nextProp.error) {
      this.refs[this.props.data._id].focus();
    }
  }

  handleValue(e){
    this.setState({ value: e.target.value });
    this.props.callback(this.props.data.datafield, e.target.value);
  }

  validate(){
    
  }
  
  getOptionValues(options){
    let self = this
    let objElements;
    if(this.props.data.datafrom && this.props.data.datafrom == 'server'){
      objElements = options.map(function(option) {
        let key = option[0] == "" ? self.props.data._id+"key" : option[0];
        return (<option key={key} value={option[0]}>{option[1]}</option>);
      });
    }else{
      objElements = options.map(function(option) {
        let key = option[0] == "" ? self.props.data._id+"key" : option[0];
        return (<option key={key} value={option[0]}>{self.context.intl.messages[option[1]]}</option>);
      });
    }
    
    return objElements;
  }

  render() {
    //var cls = `${styles.iElement} ${styles.oElement}`;
    // this.state = {value: statVal};
    //this.props.callback(this.props.data.datafield, this.props.datavalue);
    
    return (
        <select id={this.props.data._id} className={this.props.classname} ref={this.props.data._id}
            onChange={this.handleValue.bind(this)} data-field={this.props.data.datafield} value={this.state.value}>{this.getOptionValues(this.props.data.data)}}
        </select>);
  }
}
 
DropDown.propTypes = {
  data: PropTypes.object.isRequired,
  edit: PropTypes.bool,
  value: PropTypes.node,
  callback: PropTypes.func,
  required: PropTypes.bool,
  datavalue: PropTypes.node
};

DropDown.contextTypes = {
  intl: React.PropTypes.object.isRequired
};

DropDown.defaultProps = { edit: true, value: '', required: false };

