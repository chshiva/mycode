import React, { Component } from 'react';
import Menu, { MenuItem } from 'material-ui/Menu';
import Input, { InputLabel } from 'material-ui/Input';
import Select from 'material-ui/Select';
import utils from '../commons/utils';
import lodash from 'lodash';

export default class PPL_Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems: []
    };
    this.handleOnchange = this.handleOnchange.bind(this);
    this.getData = this.getData.bind(this);
    this.buildUrl = this.buildUrl.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data != this.props.param) {
      var url = this.buildUrl(nextProps.api, nextProps.data, nextProps.isParam, nextProps.isQuery);
      if(url)
        this.getData(url);
    }
  }

  componentDidMount() {
    if (this.props.api) {
      var url = this.buildUrl(this.props.api, this.props.data, this.props.param, this.props.isParam, this.props.isQuery);
      if(url)
        this.getData(url);
    }
  }

  handleOnchange(e) {
    this.props.onChange(e.target.value);
  }

  buildUrl(endpoint, data, isParam, isQuery) {
    var url = endpoint;
    if (isParam) {
      if(!data)
        return null;
      url = endpoint + '/' + data;
    } else if (isQuery) {
      if(!data)
        return null;
      url = endpoint + '?' + data;
    }
    return url;
  }

  getData(url) {
    utils.httpRequest(url, 'get', {}, (response) => {
      if (response.status) {
        var result = response.result;
        for (var key in result) {
          this.setState({ menuItems: result[key] });
        }
      }
    });
  }

  render() {
    return (
      <Select
        className={this.props.className}
        value={this.props.value || ""}
        onChange={this.handleOnchange}
        input={<Input name={this.props.placeholder} id={this.props.placeholder}/>}
      >
        {this.state.menuItems.map((item, i) => {
          return (
            <MenuItem value={item[this.props.keyValue]} key={i}>{item[this.props.nameValue]}</MenuItem>
          )
        })}
      </Select>
    );
  }
};