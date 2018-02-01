import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
var _ = require('lodash');

import styles from './component.css';

class TextBox extends Component {
  constructor() {
    super();
    this.state = {
      value: ''
    };
  }
  
  componentDidMount(){
    if(this.props.datavalue){
        this.setState({value: this.props.datavalue});
    }
    if (this.props.error ) {
      this.refs[this.props.data._id].focus();
    }
  }


  componentWillReceiveProps(nextProp){
    if(nextProp.datavalue){
        this.setState({value: nextProp.datavalue});
    }
    if (nextProp.error ) {
      this.refs[this.props.data._id].focus();
    }
  }

  handleValue(e) {  
    let val = this.props.data.caps ? _.startCase(_.toLower(e.target.value)) : e.target.value;
    val = val.length != e.target.value.length ? e.target.value : val;
    this.setState({ value: val });
    this.props.callback(this.props.data.datafield, val.trim());    
  }

  handleKeyPress(e) {
    if(e.key == 'Enter') {
      e.preventDefault();  
    } 
  }

  validate(){
    
  }

  render() {
    //var cls = `${styles.iElement} ${styles.oElement}`;
   
    const placeholder = this.context.intl.messages[this.props.data.text.props.id];
    return (
    	   <input id={this.props.data._id} ref={this.props.data._id} type="text" className={this.props.classname} 
              placeholder={placeholder} 
              data-field={this.props.data.datafield} 
              onChange={this.handleValue.bind(this)}
              onKeyDown={this.handleKeyPress.bind(this)}
              data-allow-edit={this.props.edit} value={this.state.value} maxLength = {this.props.data.limit ? this.props.data.limit : 100}/>
    );
  }
}
 
TextBox.propTypes = {
  data: PropTypes.object.isRequired,
  // value: PropTypes.string,
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  callback: PropTypes.func,
  required: PropTypes.bool,
  datavalue: PropTypes.node
};

TextBox.contextTypes= {
    intl: React.PropTypes.object.isRequired,
};

TextBox.defaultProps = { edit: true, value: '', required: false };

export default TextBox;