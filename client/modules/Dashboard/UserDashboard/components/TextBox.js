import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';
import {Col, Row, Grid} from 'react-bootstrap';


class TextBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    var number = this.props.index + 1

    return (
      <div className="form-group">
        <label htmlFor="option" className="control-label col-md-2" ><FormattedMessage id = 'option'/> {number}</label>
        <div className="col-md-10">
          <input id="value" type="text" className="form-control" value={this.props.value} placeholder="" onChange={this.props.change} maxLength={150}/>
        </div>
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    
  };
}

TextBox.propTypes = {
  intl: PropTypes.object,
};

TextBox.contextTypes= {
  intl: React.PropTypes.object.isRequired,
};


export default connect(mapStateToProps)(TextBox);
