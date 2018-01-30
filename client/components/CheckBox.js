import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';
import {Col, Row, Grid} from 'react-bootstrap';


class CheckBox extends Component {
  constructor() {
    super();
    this.state = {
      value: []
    };
  }

  componentDidMount(){
   
    if(this.props.datavalue){
      this.setState({value: this.props.datavalue});
    }
  }

  componentWillReceiveProps(nextProp){
    if(nextProp.datavalue){
      this.setState({value: nextProp.datavalue});
    }
  }

  handleValue(e){
    let val = this.state.value;
    let index = _.indexOf(val, e.target.value);
    if(index > -1){
      val.splice(index, 1);
    }else{
      val.push(e.target.value);
    }
    this.setState({ value: val });
    this.props.callback(this.props.data.datafield, val);
  }

  render() {
    //console.log("Inside radio com");
    let renderButtons = null;
    if(this.props && this.props.data){
      let self = this;
      renderButtons = this.props.data.data.map(function(doc){
        return(
          <div className="form-group" key={doc[0]}>
            <input type="checkbox"  name ={self.props.data._id} className="col-xs-2"  value={doc[0]} onChange={self.handleValue.bind(self)} checked={_.indexOf(self.state.value, doc[0]) > -1 ? true : false}/> {self.context.intl.messages[doc[1]]}
          </div>
          )
      });
    }
    return (
      <div>
        {renderButtons}
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    
  };
}

CheckBox.propTypes = {
  data: PropTypes.object.isRequired,
  edit: PropTypes.bool,
  value: PropTypes.node,
  callback: PropTypes.func,
  required: PropTypes.bool,
  datavalue: PropTypes.node
};

CheckBox.contextTypes= {
    intl: React.PropTypes.object.isRequired,
};


export default connect(mapStateToProps)(CheckBox);
