import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';
import {Col, Row, Grid} from 'react-bootstrap';


class MultipleResponse extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    var checked;
    if(this.props.value == '' && this.props.checked[this.props.index] == '') {
      checked = false
    } else {
      // console.log("index", this.props.index)
      if(this.props.checked[this.props.index] == this.props.value) {
        var checked = true
      } else {
        checked = false
      }
    }
    var swotValue;
    if(this.props.value == '' && this.props.swotValue[this.props.index] == '') {
      swotValue = ''
    } else {
      swotValue = this.props.swotValue[this.props.index]
    }
    return (
      <div className="form-group">
        <input id="checkboxAnswer" type="checkbox" className="col-xs-2"  value={this.props.value} checked={checked} onChange={this.props.answer} />
        {
          this.props.enableSWOT
          ?
            <div>
              <div className="col-xs-7">
                <input id="enableSWOT" type="text" className="form-control" value={this.props.value} placeholder="" onChange={this.props.change} />
              </div>
              <div className="col-xs-3">
                <select id="swotOptions" className="form-control" value={swotValue} onChange={this.props.handleSwotValue}>
                  <option value="">None</option>              
                  <option value="Strength">Strength</option>
                  <option value="Weakness">Weakness</option>
                  <option value="Opportunity">Opportunity</option>
                  <option value="Threat">Threat</option>
                </select>
              </div>
            </div>
          : <div className="col-xs-10">
              <input id="answerValue" type="text" className="form-control" value={this.props.value} placeholder="" onChange={this.props.change} />
            </div>
        }
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    
  };
}

MultipleResponse.propTypes = {
  intl: PropTypes.object,
};

MultipleResponse.contextTypes= {
    intl: React.PropTypes.object.isRequired,
};


export default connect(mapStateToProps)(MultipleResponse);
