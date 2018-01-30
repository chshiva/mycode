import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';
import {Col, Row, Grid} from 'react-bootstrap';
import styles from './component.css'


class Radio extends Component {
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


  changeHandler = (e) => {
    console.log(e.target.value);
    /*let data=[];
    let self = this;    
    let obj = {};
    data[self.props.data.id] = e.target.value; */
    this.setState({ value: e.target.value});
    this.props.callback(this.props.data.datafield, e.target.value);  
    // this.props.callback(data);
  }

  render() {
    //console.log("Inside radio com");
    let cls_radioNewProfile = ` ${styles.radioNewProfile} form-group `
    let renderButtons = null;
    if(this.props && this.props.data){
      let self = this;
      renderButtons = this.props.data.data.map(function(doc){
        return(
          <span className={cls_radioNewProfile} key={doc[0]}>
            <input type="radio" id={self.props.data._id} name ={self.props.data._id} value={doc[0]} onChange={self.changeHandler.bind(this)} checked={self.state.value == doc[0]}/> {doc[0]}
          </span>
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

Radio.propTypes = {
  intl: PropTypes.object,
};

Radio.contextTypes= {
    intl: React.PropTypes.object.isRequired,
};


export default connect(mapStateToProps)(Radio);
