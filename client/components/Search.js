import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import SearchPopup from './SearchPopup';
import styles from './component.css';
import DropDown from './DropDown';

var dataObject = {};

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      showAddContacts: false 
    };
  }
  
  componentDidMount(){
    // console.log("field default value----",this.props);
    if(this.props.datavalue){
        this.setState({value: this.props.datavalue});
    }
  }

  showOrHideAddContacts(e){
    this.setState({showAddContacts: !this.state.showAddContacts});
  }

  componentWillReceiveProps(nextProp){
    if(nextProp.datavalue && nextProp.datavalue.firstname){
        this.setState({value: nextProp.datavalue.firstname + " " + nextProp.datavalue.lastname});
    } else {

    }
  }

  handleValue(userId, userName){
    this.setState({showAddContacts: !this.state.showAddContacts});
    this.setState({value: userName});
    this.props.callback(this.props.data.datafield, userId);
  }

  validate(){
    
  }

  render() {
    //var cls = `${styles.iElement} ${styles.oElement}`;
    const placeholder = this.context.intl.messages[this.props.data.text.props.id]
    return (
      <div>
  	    <input id={this.props.data._id} ref={this.props.data._id} type="text" className={this.props.classname} 
            placeholder={placeholder} 
            data-field={this.props.data.datafield} 
            onClick={this.showOrHideAddContacts.bind(this)}
            data-allow-edit={this.props.edit} value={this.state.value} />
        <SearchPopup showModal={this.state.showAddContacts} getUserId={this.handleValue.bind(this)} packageId={this.handleValue.bind(this)} hidecallback={this.showOrHideAddContacts.bind(this)} />
      </div>
    );
  }
}
 
Search.propTypes = {
  data: PropTypes.object.isRequired,
  value: PropTypes.string,
  callback: PropTypes.func,
  required: PropTypes.bool,
  datavalue: PropTypes.oneOfType([PropTypes.node,PropTypes.object])
};

Search.contextTypes= {
    intl: React.PropTypes.object.isRequired,
};

Search.defaultProps = { edit: true, value: '', required: false };