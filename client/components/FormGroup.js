import React, { Component, PropTypes } from 'react';

import styles from './component.css';

export default class FormGroup extends Component {
  render() {
    var cls = `${styles.iFormGroup} ${styles.oFormGroup}`;
    var cls_fg = `${styles.iSubFormGroup} ${styles.oSubFormGroup}`;
    return (
    	 <div className={cls}>
      		<h2><i className={this.props.titleObject.icon} aria-hidden="true"></i>&nbsp;{this.props.titleObject.title}</h2>
      		<div className={cls_fg}>
					     {this.props.data}
      		</div>
    	 </div>
    );
  }
}
 
FormGroup.propTypes = {
  data: PropTypes.array.isRequired,
  titleObject: PropTypes.object
};

FormGroup.defaultProps = { titleObject: {title: "", icon: ""} };
