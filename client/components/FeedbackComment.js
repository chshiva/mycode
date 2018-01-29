import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';
import {Col, Row, Grid} from 'react-bootstrap';
import CSSstyles from './component.css';


class FeedbackComment extends Component {
  constructor(props) {
    super(props);
  }

  changeHandler = (e) => {
    //console.log(e.target.value);
    var data = [];
    let obj = {};
    data[this.props.data.id] = e.target.value;    
    this.props.callback(data);
  }

  render() {
    //console.log("Inside Feedback comment");
    var cls = `${CSSstyles.iElement} ${CSSstyles.feedbackTextArea}`;
    let renderTextArea = null;
    if(this.props){
      let self = this;      
        renderTextArea = (          
          <div className={cls} key={self.props.data.id}>
            <textarea  name ={self.props.data.id} className="col-xs-12" onChange={self.changeHandler}/> 
          </div>)    
      
    }
    return (
      <div>
        {renderTextArea}
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    
  };
}

FeedbackComment.propTypes = {
  intl: PropTypes.object,
};

FeedbackComment.contextTypes= {
    intl: React.PropTypes.object.isRequired,
};


export default connect(mapStateToProps)(FeedbackComment);
