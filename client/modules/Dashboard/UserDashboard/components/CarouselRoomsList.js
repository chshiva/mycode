import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';

import {Col, Row, Grid, Carousel} from 'react-bootstrap';
import {Item} from 'react-bootstrap/lib/Carousel';
import styles from '../../Dashboard.css';
let moment = require('moment');
var _ = require('lodash');

export class CarouselRoomsList extends Component {

	showValidity = (expdate) => {
    let ipdate = moment(expdate).startOf('day');
    let now = moment().startOf('day');
    if(+ipdate < +now){
      return <span><FormattedMessage id = 'valid_untill'/>: <strong className={styles.expired}>Expired</strong></span>;
    }else{
      return <span><FormattedMessage id = 'valid_untill'/>: <strong>{ipdate.format("MMM Do YYYY")}</strong></span>;
    }
  }

  handle(index){
    this.props.roomIndex(index);
  }

	render(){
		let cls_roomInfoBlk = `${styles.modRoomInfoBlock} clearfix`;
		let listRooms = <Item key="no rooms" active={true}>
                      <div className={styles.roomItem}>
                        <h2><FormattedMessage id="no_rooms"/></h2>
                      </div>
                    </Item>;
    if(this.props.roomsList != null){
      let docs = this.props.roomsList;
      if(docs.length > 0){
        listRooms = docs.map((doc) => 
          <Item key={doc._id}>
            <div className={styles.roomItem}>
              <h2>{doc.roomName}.</h2>
              <p><FormattedMessage id = 'presenter_mode'/> {this.showValidity(doc.selPackage.packageValidity)}</p>
            </div>
          </Item>
        );
      }
    }

		return(
			<div className={cls_roomInfoBlk}>
	      <div className={styles.myRoomListBlock}>
	        <div className={styles.sliderWrapper}>
	          <p><FormattedMessage id = 'select_your_room'/></p>
	            <div className={styles.slider}>
	              <Carousel bsClass="roomCarousel" indicators={false} slide={true} interval={0} onSelect={this.handle.bind(this)} defaultActiveIndex={0}>
	                {listRooms}
	              </Carousel>                  
	            </div>
	        </div>
	      </div>
	    </div>
	  );
	}
}

CarouselRoomsList.contextTypes = {
  router: React.PropTypes.object,
};

CarouselRoomsList.propTypes = {
  // roomsList: PropTypes.Array,
  intl: PropTypes.object,
  intl: intlShape.isRequired,
};

export default injectIntl(CarouselRoomsList);
