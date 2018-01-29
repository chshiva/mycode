import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import AuthClient from '../../../../components/AuthController.js';
import { isLoggedIn } from '../../../Login/LoginActions';
import { getUserViewedTopics } from '../RoomActions';
import { roomData } from '../RoomReducer';
import { loggedInData } from '../../../Login/LoginReducer';
import Validator from '../../../../components/Validator';
import Chart from '../../../../components/Chart';

import { loginLanguage } from '../../../Intl/IntlActions';
// Import Style
import styles from '../../../../components/component.css';
import adminStyles from '../../Admin.css';
import dataStyle from '../../../../components/DataTable/DataTable.css';
import { intlData } from '../../../Intl/IntlReducer';
import { Col, Row, Grid } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import AllUsersViewedTopicsList from './AllUsersViewedTopicsList';
var _ = require('lodash');
import Loading from '../../../App/components/Loading';


class AllUsersViewedTopics extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showChart: false,
            prorassData: '',
            totalTopicsCount : '',
            showList : false,
            userId : null,
            loading : true,
            listIds: null
        }
    }

    componentDidMount() {
        let data = this.props.data;
        data['courseId'] = this.props.courseId;

        // Change By - Najib, Desc - Calling setLoading in promise to set state after receiving response from server    
        if(_.isEmpty(this.state.prorassData)) {
          this.setState({loading : true}); 
        } else {         
          this.setState({loading : false});
        }
        this.props.dispatch(getUserViewedTopics(this.props.data)).then(res => this.setData(res));
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(nextProps.data, this.props.data)) {
            let data = nextProps.data;
            data['courseId'] = nextProps.courseId;
            this.props.dispatch(getUserViewedTopics(data)).then(res => this.setData(res));
        }
    }
    
    setData(res) {
        if(this.state.loading) {
             this.setState({ loading : false });
        }
        if (res.status == true && res.data != null ) {            
            if(res.data.AllUsersResult.length >= 1) {
                this.setState({
                    showChart: true,
                    prorassData: res.data.AllUsersResult,
                    totalTopicsCount: res.data.totalTopicsCount, 
                });
            } else {
                this.setState({
                    showChart: false,
                    prorassData: '',
                    totalTopicsCount: '' 
                });
            }
        }
    }

    handleList = (userId,listIds,percent,e) => {
        if(percent > 0) {
          this.setState ({
            showList : true,
            userId : userId,
            listIds : listIds
          });
          this.props.hideDropDowns(false);
        }
    }

    backToReport = () => {
        this.setState ({
            showList : false,
            userId : null,
            listIds : null
          });
        this.props.hideDropDowns(true);
    }

    render() {
        let cls_container = `${styles.iContainer} ${styles.oContainer} pull-right`;
        let cls_topmenu = `${styles.iTopMenu} ${styles.oTopMenu}`;
        let cls_isubmenu = `${styles.iSubMenu} {styles.oSubMenu}`;

        let progressLabel = `${adminStyles.progressLabel} progress-label col-md-2 `;
        let progress = `${adminStyles.progress } progress col-md-10`;
        let progressBar = `${adminStyles.progressBar } progress-bar progress-bar-striped progress-bar-info`;

        let dataForList = this.state.prorassData;
        let topicsCount = this.state.totalTopicsCount;
        let loadType = 'list';

        return (
            <div>
            { this.state.loading?
            <div className={adminStyles.whiteCard}>  
              <div className={adminStyles.mainSpinBlock} >
                <div className={adminStyles.innerSpinBlock} >
                  <Loading loadType = {loadType}/>
                </div>
              </div>
            </div> :
            <div>
                {
                    this.state.showList == true ?
                        <AllUsersViewedTopicsList userId ={this.state.userId} listIds= {this.state.listIds}  backToReport = {this.backToReport} courseId ={this.props.courseId}/>

                    :
                        <div className={adminStyles.attendenceBlockControl}>
                        <p>{this.props.intlData.messages.topics_viewed}</p>
                        {   
                            this.state.showChart == true ?
                                <div className={adminStyles.whiteCard}>
                                    {
                                            
                                            dataForList.map((data,index) => {

                                                let percentage = (((1 / topicsCount) * data.countOfCompleted) + ((1 / (topicsCount * 2)) * data.countOfInProgress))*100;

                                                let percent = percentage +'%';
                                                return (
                                                    <div className={adminStyles.progressBox} key={index}>
                                                      <ul>
                                                        <li className="clearfix">
                                                          <row>
                                                            <div className={progressLabel}> {data.username} :</div> 
                                                            <div className={progress}>
                                                                <div className={progressBar} 
                                                                    style={{width : percent}} 
                                                                    onClick = {this.handleList.bind(this,data.userId,data.viewedTopicIds,percentage)} 
                                                                    max="100">
                                                                        {percent}
                                                                </div> 
                                                            </div>
                                                          </row>
                                                        </li>
                                                      </ul>
                                                    </div>
                                                   )

                                            })
                                           
                                            }
                                </div>

                                :
                                    <div className={adminStyles.whiteCard}>
                                        <div className={dataStyle.noDataBox}>
                                            <h2>
                                                <FontAwesome name="frown-o" />
                                            </h2>
                                            <p><FormattedMessage id="no_data_yet" /></p>
                                        </div>
                                    </div>
                            }
                        </div>
                }
            </div>
            }
            </div>
        );
    }
}

// Retrieve data from store as props
function mapStateToProps(state) {
    return {
        roomData: roomData(state),
        loggedInData: loggedInData(state),
        intlData: intlData(state)
    };
}

AllUsersViewedTopics.propTypes = {
    loggedInData: PropTypes.object,
    roomData: PropTypes.object,
    dispatch: PropTypes.func.isRequired
};

AllUsersViewedTopics.contextTypes = {
    router: React.PropTypes.object
};

export default connect(mapStateToProps)(AllUsersViewedTopics);