import React, { Component, PropTypes } from 'react';

import DateTimeField from 'react-bootstrap-datetimepicker';
import styles from './component.css';
import moment from 'moment';

export default class MyDTPicker extends Component {
  constructor() {
    super();
    // super(props);
    this.state = {
      value: moment().format('DD/MM/YYYY'),
      format: "DD/MM/YYYY",
      inputFormat: "DD/MM/YYYY",
      mode: "date"
    };
  }
  
  componentDidMount(){
    // console.log("PROPS data ==== ", this.props);
    if(this.props.datavalue){
        this.setState({value: this.props.datavalue});
    }
  }


  componentWillReceiveProps(nextProp){
    // console.log("Next PROPS data ==== ", nextProp);
    if(nextProp.datavalue && nextProp.datavalue != 'false'){
        let dateFormat = moment(nextProp.datavalue).format('DD/MM/YYYY');
        this.setState({value: dateFormat});
    } else if (nextProp.datavalue == undefined) {
        this.setState({value: moment().format('DD/MM/YYYY')})
    }
  }

  handleChange = (newDate) => {
    // console.log("newDate - ", newDate);
    //console.log("conv newDate - ", moment(newDate, "DD/MM/YYYY").utc().toDate());
    if(moment(newDate, "DD/MM/YYYY").isValid()){
      this.props.callback(this.props.data.datafield, moment(newDate, "DD/MM/YYYY").utc().toDate());
    } else {
      this.props.callback(this.props.data.datafield, 'false');
    }
    
    // return this.setState({value: newDate});
      // this.setState({value: e.target.value});
      // this.props.callback(this.props.data.datafield, e.target.value);
  }

  validate(){
    
  }

  render() {
    //var cls = `${styles.iElement} ${styles.oElement}`;
    const {value, format, mode, inputFormat} = this.state;
    return (
            <DateTimeField
              dateTime={value}
              format={format}
              viewMode={mode}
              mode={mode}
              inputFormat={inputFormat}
              minDate={moment()}
              onChange={this.handleChange.bind(this)}
              value={this.state.value}              
            />
        );
  }
}
 
MyDTPicker.propTypes = {
  data: PropTypes.object.isRequired,
  value: PropTypes.oneOfType([PropTypes.string,PropTypes.instanceOf(Date)]),
  callback: PropTypes.func,
  required: PropTypes.bool,
  datavalue: PropTypes.oneOfType([PropTypes.node,PropTypes.object])
};

MyDTPicker.defaultProps = { edit: true, value: '', required: true };
  
 