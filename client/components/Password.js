import React, { Component, PropTypes } from 'react';

import styles from './component.css';

export default class Password extends Component {
  constructor() {
    super();
      this.handleValue = this.handleValue.bind(this);
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
     
    let value = e.target.value.trim();
    let val = value.replace(/ /g, '');
    this.setState({value: val});
    this.props.callback(this.props.data.datafield, val);
  }

  validate(){
    
  }

  render() {
     //var cls =`${styles.iElement} ${styles.oElement}`;
     const placeholder = this.context.intl.messages[this.props.data.text.props.id]
    return (
         <input id={this.props.data._id} type="password" className={this.props.classname} 
              placeholder={placeholder} 
              data-field={this.props.data.datafield} 
              onChange={this.handleValue} ref={this.props.data._id}
              data-allow-edit={this.props.edit} value ={this.state.value} maxLength = {this.props.data.limit ? this.props.data.limit : 30}  />
    );
  }
}
 
Password.propTypes = {
  data: PropTypes.object.isRequired,
  edit: PropTypes.bool,
  value: PropTypes.string,
  callback: PropTypes.func,
  required: PropTypes.bool
};

Password.defaultProps = { edit: true, value: '', required: false };

Password.contextTypes= {
    intl: React.PropTypes.object.isRequired,
};