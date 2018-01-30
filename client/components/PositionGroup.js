import React, { Component, PropTypes } from 'react';

import styles from './component.css';

export default class PositionGroup extends Component {
  render() {
    var divLengthClass = "col-md-" + this.props.length; 
    return (
        <div className={divLengthClass}>
            {this.props.data}
        </div>
    );
  }
}
 
PositionGroup.propTypes = {
  data: PropTypes.array.isRequired,
  length: PropTypes.number
};
