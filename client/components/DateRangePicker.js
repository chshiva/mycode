import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import styles from './component.css';
import {Col, Row, Grid} from 'react-bootstrap';
import  {ToastContainer, ToastMessage} from '../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import DateTimeField from 'react-bootstrap-datetimepicker';
import moment from 'moment';
import { injectIntl, intlShape,FormattedMessage } from 'react-intl';
import { intlData } from '../modules/Intl/IntlReducer';

class DateRangePicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filterWith: 'T',
      filterStr : this.props.intl.messages.today+' : ' + moment().format("DD/MM/YYYY"),
    };

    this.startDate = moment().startOf('day').utc().toDate();
    this.endDate = moment().endOf('day').utc().toDate();
  }

  handleChange = (e) => {
    
      this.setState({
        filterWith: e.target.value
      });

      if (e.target.value == 'T') {
        this.startDate = moment().startOf('day').utc().toDate();
        this.endDate = moment().endOf('day').utc().toDate();
        
        this.setState({
          filterStr: this.props.intl.messages.today+' : ' + moment(this.startDate).format('DD/MM/YYYY')
        });

        let obj = {
          fromDate : this.startDate,
          toDate : this.endDate,
        }

        this.props.getDates(obj);

      } else if (e.target.value == 'Y') {
        this.startDate = moment().subtract(1, 'days').startOf('day').utc().toDate();
        this.endDate = moment().subtract(1, 'days').endOf('day').utc().toDate();;

        this.setState({
          filterStr: this.props.intl.messages.yesterday +' : ' + moment(this.startDate).format('DD/MM/YYYY')
        })

        let obj = {
          fromDate : this.startDate,
          toDate : this.endDate
        }

        this.props.getDates(obj);

      } else if(e.target.value == 'L7') {
        this.startDate = moment().subtract(6, 'days').startOf('day').utc().toDate();
        this.endDate = moment().endOf('day').utc().toDate();

        this.setState({
          filterStr: this.props.intl.messages.start_date +' : ' + moment(this.startDate).format('DD/MM/YYYY') +' - '+ this.props.intl.messages.end_date+' : '+moment(this.endDate).format('DD/MM/YYYY')
        });

        let obj = {
          fromDate : this.startDate,
          toDate : this.endDate
        }

        this.props.getDates(obj);

      } else if(e.target.value == 'L30') {
        this.startDate =moment().subtract(29, 'days').startOf('day').utc().toDate();
        this.endDate = moment().endOf('day').utc().toDate();

        this.setState({
          filterStr: this.props.intl.messages.start_date+' : ' + moment(this.startDate).format("DD/MM/YYYY") +' - '+ this.props.intl.messages.end_date+' : '+moment(this.endDate).format('DD/MM/YYYY')
        });

        let obj = {
          fromDate : this.startDate,
          toDate : this.endDate
        }

        this.props.getDates(obj);

      } else if(e.target.value == 'C') {
        this.startDate = moment().startOf('day').utc().toDate();
        this.endDate = moment().endOf('day').utc().toDate();
      }
  }

  handleFromDateChange = (fromDate) => {
    moment(fromDate,"x").isValid() ?
      this.startDate = moment(fromDate, 'x').startOf('day').utc().toDate()
    :
      this.startDate = false;
  }

  handleToDateChange = (toDate) => {
    moment(toDate,"x").isValid() ?
      this.endDate = moment(toDate, 'x').endOf('day').utc().toDate()
    :
      this.endDate = false;
  }

  handleDateSubmit =() => {
    let toDate = moment().startOf('day').utc().toDate();
    let endDate = moment().endOf('day').utc().toDate()

    if(this.startDate == false && this.endDate == false || this.startDate == false || this.endDate == false) {
      this.refs.container.error(" Invalid Date");
    }else if( this.startDate > toDate && this.endDate > endDate || this.startDate > toDate || this.endDate > endDate ) {
      this.refs.container.error(" Future Dates are not Allowed");
    } else if(this.startDate > this.endDate) {
      this.refs.container.error("Start Date should be less than End Date");
    } else {
      let obj = {
          fromDate : this.startDate,
          toDate : this.endDate
        }
      this.props.getDates(obj);
    }
  }

	render() {

		let removePdng  = `${styles.removePdng} control-label col-md-7`;
    let addpdng  = `${styles.addpdng} form-group clearfix`;
    let rangeLabel = `${styles.lineHight32} control-label `;
    let applyBtn = `${styles.applyBtn} ${styles.addpdng}`;
    let cls_btnApplyAll = `${styles.btnApplyAll} `;

    let fileterOptions = [
          {'id':'T','name':this.props.intl.messages.today},
          {'id':'Y','name':this.props.intl.messages.yesterday},
          {'id':'L7','name':this.props.intl.messages.last_seven_days},
          // {'id':'LW','name':'Last Week'},
          {'id':'L30','name':this.props.intl.messages.last_thirty_days},
          {'id':'C','name':this.props.intl.messages.custom}
      ]
		return(
			<div>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="container"
          className="toast-top-right"
        />
        <Grid fluid={true}>
          <Row>
          <Col md={4}>
            <div className= {styles.dateControls}>
              <div className= {styles.dateRange}>
                <div className = {addpdng}>
                  <label className = "control-label"> {this.props.intl.messages.date_range} : </label>
                  <select  id="dateDropdown" className="form-control" onChange={this.handleChange} value={this.state.filterWith}>
                  {
                  fileterOptions.map((data,i)=> {
                   return (<option key={i} value={data.id} > {data.name} </option>)
                  })
                  }
                  </select>
                </div>
              </div>
            </div>
          </Col>
          <Col md={8}>
              {this.state.filterWith == 'C' ?
              <div className= {styles.dateControls}>
                <div className= {styles.dateRange}>
                  <div className = {addpdng}>
                    <label className = "control-label"> {this.props.intl.messages.start_date} : </label>
                    <DateTimeField mode="date" className="form-control" maxDate={moment()} onChange={this.handleFromDateChange}/>
                  </div>
                </div>
                <div className= {styles.dateRange}>
                  <div className = {addpdng}>
                    <label className = "control-label"> {this.props.intl.messages.end_date} : </label>
                    <DateTimeField mode="date" className="form-control" maxDate={moment()} onChange={this.handleToDateChange}/>
                  </div>
                </div>
                <div className= {styles.dateRange}>
                  <div className = {applyBtn}>
                    <input id="submit" type='submit' value={this.props.intl.messages.apply} className={cls_btnApplyAll} onClick={this.handleDateSubmit}/>
                  </div>
                </div>
              </div>
              : 
              <div className = {styles.filterTxt}>
                    <span>{this.state.filterStr }</span>
              </div>
              }
            </Col>
          </Row>
        </Grid> 
     </div>       
		)
	}
}

//Retrieve data from store as props
function mapStateToProps(state) {
  return {
    intlData: intlData(state)
  };
}

export default injectIntl(DateRangePicker);