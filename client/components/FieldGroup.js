import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';

import {FormGroup, ControlLabel, FormControl, HelpBlock, InputGroup} from 'react-bootstrap';

import mainStyle from '../main.css';

export default class FieldGroup extends Component {
  constructor(props){
    // console.log(props);
    super(props);
  }
  render(){
    // console.log(this.props);
    const inputGroupCls = `input-group ${mainStyle.inputGroup}`;
    const inputFieldCls = `form-control ${mainStyle.inputField}`;
  
    return (
     <FormGroup controlId={this.props.id}>
       <InputGroup bsClass={inputGroupCls}>
            <span className={mainStyle.inputGroupAddon}><FontAwesome name={this.props.icon} /></span>
            <input className={inputFieldCls} {...this.props} />
            {this.props.help && <HelpBlock>{this.props.help}</HelpBlock>}
        </InputGroup>
      </FormGroup>   
    );
  }
}


/*
<FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>*/