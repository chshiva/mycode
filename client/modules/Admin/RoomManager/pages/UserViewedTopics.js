import React, { PropTypes, Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import { getUserViewedTopics } from '../RoomActions';
import { roomData } from '../RoomReducer';
import { loggedInData } from '../../../Login/LoginReducer';
import Chart from '../../../../components/Chart';

// Import Style
import styles from '../../../../components/component.css';
import adminStyles from '../../Admin.css';
import dataStyle from '../../../../components/DataTable/DataTable.css';
import { intlData } from '../../../Intl/IntlReducer';
import FontAwesome from 'react-fontawesome';
import UserViewedTopicsList from './UserViewedTopicsList';
var _ = require('lodash');
import Loading from '../../../App/components/Loading';

class UserViewedTopics extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showChart: false,
            chartData: '',
            ShowUserViewedTopicsList: false,
            listIds:[],
            Loading : true
        }
    }


    componentDidMount() {
        let data = this.props.data;
        data['courseId'] = this.props.courseId;
        
        // Change By - Najib, Desc - Calling setLoading in promise to set state after receiving response from server    
        if(_.isEmpty(this.state.chartData)) {
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
            this.props.dispatch(getUserViewedTopics(nextProps.data)).then(res => this.setData(res));
        }
    }

    setData(res) {
        if(this.state.loading) {
            this.setState({ loading : false });
        }
        this.setState({
          showChart: false,
          chartData: ''
        });

        if (res.status == true && res.data != null) {
            var tasksData = [];
            var completedTopicUsersCount = res.data.CompletedTopicsCount,
                inprogressTopicUsersCount = res.data.InPrograssTopicsCount;

            // tasksData used for displaying data in the charts 
            if (completedTopicUsersCount >= 1) {
                var x = {
                    name: this.props.intlData.messages.completely_viewed_topics,
                    color: "#00FF00",
                    data: [{
                        y: completedTopicUsersCount,
                        name: this.props.intlData.messages.completely_viewed_topics,
                        color: "#00FF00",
                        listIds: res.data.CompletedTopics
                    }],
                }
                tasksData.push(x);
            } else {
                var x = {
                    name: this.props.intlData.messages.completely_viewed_topics,
                    color: "#00FF00",
                    data: [{
                        y: 0,
                        name: this.props.intlData.messages.completely_viewed_topics,
                        color: "#00FF00"
                    }],
                }
                tasksData.push(x);
            }

            if (inprogressTopicUsersCount >= 1) {
                var y = {
                    name: this.props.intlData.messages.partially_viewed_topics,
                    color: "#FF7F50",
                    data: [{
                        y: inprogressTopicUsersCount,
                        name: this.props.intlData.messages.partially_viewed_topics,
                        color: "#FF7F50",
                        listIds: res.data.InPrograssTopics
                    }],
                }
                tasksData.push(y);
            } else {
                var y = {
                    name: this.props.intlData.messages.partially_viewed_topics,
                    color: "#FF7F50",
                    data: [{
                        y: 0,
                        name: this.props.intlData.messages.partially_viewed_topics,
                        color: "#FF7F50"
                    }],
                }
                tasksData.push(y);
            }

            if (res.data.NotAtAllVisitedTopicsCount >= 1) {
                var Z = {
                    name:  this.props.intlData.messages.notAtAll_Viewed_Topics,
                    color: "#FF0000",
                    data: [{
                        y: res.data.NotAtAllVisitedTopicsCount,
                        name:  this.props.intlData.messages.notAtAll_Viewed_Topics,
                        color: "#FF0000",
                        listIds: res.data.NotAtAllVisitedTopics
                    }],
                }
                tasksData.push(Z);
            } else {
                var Z = {
                    name: this.props.intlData.messages.notAtAll_Viewed_Topics,
                    color: "#FF0000",
                    data: [{
                        y: 0,
                        name: this.props.intlData.messages.notAtAll_Viewed_Topics,
                        color: "#FF0000"
                    }],
                }
                tasksData.push(Z);
            }
            this.setState({
                // showChart: true,
                chartData: tasksData
            })
        }
    }



    handleUserViewedTopics(event) {
    if (event.point.listIds && event.point.listIds.length > 0) {
        this.setState ({
            ShowUserViewedTopicsList : true,
            listIds : event.point.listIds
        });
        this.props.hideDropDowns(false);
        } 
    }

    backToReports =(e) => {
        this.setState({
        ShowUserViewedTopicsList : false,
            listIds : []
        })
        this.props.hideDropDowns(true);
    }
  
    
    render() {

        let cls_container = `${styles.iContainer} ${styles.oContainer} pull-right`;
        let cls_topmenu = `${styles.iTopMenu} ${styles.oTopMenu}`;
        let cls_isubmenu = `${styles.iSubMenu} {styles.oSubMenu}`;
        let loadType = 'list';

        if (this.state.chartData != '') {

            let self = this;
            let  title = self.props.data.userName+' - '+  this.props.intlData.messages.viewed_topics;
            var options = {
                chart: {
                    type: 'column'
                },

                title: {
                    text: title,
                    style: {
                        "color": "#96281B",
                        "fontSize": "26px"
                    }
                },

                xAxis: {
                    type: 'category',
                    tickInterval: 1
                },

                yAxis: {
                    title: {
                        text: this.props.intlData.messages.user_viewed_topics
                    }
                },

                credits: {
                    enabled: false
                },

                tooltip: {
                    pointFormat: this.props.intlData.messages.count+': <b>{point.y}</b>'
                },

                plotOptions: {
                    series: {
                        borderWidth: 0,
                        pointWidth: 50,
                        animation: {
                            duration: 1000
                        },
                        cursor: 'pointer',
                        events: {
                            click: function (event) {
                                self.handleUserViewedTopics(event)
                            },
                            //changeBy : pranathi ,disc: removing the legend click event
                            legendItemClick: function () {
                                return false
                            }
                        },
                    },
                    showInLegend: true,
                },
                series: this.state.chartData
            };
        }

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
                this.state.ShowUserViewedTopicsList == true ?
                        <UserViewedTopicsList listIds={this.state.listIds} courseId={this.props.data.courseId} backToReports={this.backToReports} userId={this.props.data.userId} userName = {this.props.data.userName} />
                    :
  
                    <div className={adminStyles.attendenceBlockControl}>
                        {
                            this.state.chartData != ''
                                ?
                        
                                <div className={adminStyles.chartBlock}>
                                    <Chart container={'chart'} options={options} />
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

UserViewedTopics.propTypes = {
    loggedInData: PropTypes.object,
    roomData: PropTypes.object,
    dispatch: PropTypes.func.isRequired
};

UserViewedTopics.contextTypes = {
    router: React.PropTypes.object
};

export default connect(mapStateToProps)(UserViewedTopics);