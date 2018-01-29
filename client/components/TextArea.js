import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import styles from './component.css';

export default class TextArea extends Component {
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
    if (this.props.error) {
      this.refs[this.props.data._id].focus();
    }
  }

  componentWillReceiveProps(nextProp){
    if(nextProp.datavalue){
        this.setState({value: nextProp.datavalue});
    }
    if (nextProp.error) {
      this.refs[this.props.data._id].focus();
    }
  }

  handleValue(e){
      this.setState({value: e.target.value});
      this.props.callback(this.props.data.datafield, e.target.value.trim());
  }

  validate(){
    
  }

  render() {
    const placeholder = this.context.intl.messages[this.props.data.text.props.id]
    return (
    	   <textarea id={this.props.data._id} ref={this.props.data._id} className={this.props.classname}
              placeholder={placeholder} 
              data-field={this.props.data.datafield} 
              onChange={this.handleValue.bind(this)}
              data-allow-edit={this.props.edit} value={this.state.value} maxLength = {this.props.data.limit ? this.props.data.limit : 250}/>
    );
  }
}
 
TextArea.propTypes = {
  data: PropTypes.object.isRequired,
  value: PropTypes.string,
  callback: PropTypes.func,
  required: PropTypes.bool,
  datavalue: PropTypes.string
};

TextArea.defaultProps = { edit: true, value: '', required: false };
TextArea.contextTypes= {
    intl: React.PropTypes.object.isRequired,
};



