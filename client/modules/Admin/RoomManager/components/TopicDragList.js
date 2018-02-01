import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import FontAwesome from 'react-fontawesome';
import callApi from '../../../../util/apiCaller';
import {Col, Row, Grid, Modal} from 'react-bootstrap';
import {Header, Title, Body, Footer} from 'react-bootstrap/lib/Modal';
import { isLoggedIn } from '../../../Login/LoginActions';
import { loggedInData } from '../../../Login/LoginReducer';
import AuthClient from '../../../../components/AuthController';
import styles from '../../Admin.css';
import { getCourseTopicsData } from '../RoomActions';
import { roomData } from '../RoomReducer'; 


var placeholder = document.createElement("li");
// placeholder.className = "placeholder";
placeholder.className = "placeholder";

class TopicDragList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...props};
  }
  componentDidMount() {
    this.props.setIndex(this.state.topicData);
  }
  dragStart(e) {
    this.dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.dragged);
  }
  dragEnd(e) {
    this.dragged.style.display = 'block';
    // this.dragged.parentNode.removeChild(placeholder);
    
    // update state
    var data = this.state.topicData;
    var from = Number(this.dragged.dataset.id);
    var to = Number(this.over.dataset.id);
    // if(from < to) to--;
    data.splice(to, 0, data.splice(from, 1)[0]);
    this.setState({topicData: data});
    this.props.setIndex(data);
  }
  dragOver(e) {
    e.preventDefault();
    this.dragged.style.display = "none";
    if(e.target.className === 'placeholder') return;
    this.over = e.target;
    e.target.parentNode.insertBefore(placeholder, e.target);
  }

	render() {
    if(this.state.topicData){
      this.state.topicData.map((item,i) => {
        return this.state.topicData[i]["index"] = ++i
      });
    }  
    var listItems = this.state.topicData.map((item, i) => {
      return (
          <li className= {styles.dragList}
            id={item._id}
            data-id={i}
            key={i}
            draggable='true'
            onDragEnd={this.dragEnd.bind(this)}
            onDragStart={this.dragStart.bind(this)} >
              <p className={styles.topicTxt}>{item.index}{".  "} {item.topicName}</p> 
            </li>
      )
     });
		return (
			<ul className={styles.dragBlockList} onDragOver={this.dragOver.bind(this)}>
        {listItems}
      </ul>
		)
	}
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    // packageData : packageData(state),
    loggedInData: loggedInData(state),
    intl: state.intl,
    roomData: roomData(state),
  };
}

TopicDragList.propTypes = {
  loggedInData: PropTypes.object,
  roomData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(TopicDragList);
