import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import ScormAPI from './ScormAPI';
import Loading from '../../../App/components/Loading';
import callApi, { API_URL } from '../../../../util/apiCaller';
import styles from '../../Dashboard.css';
import { workDashboardData } from './WorkDashboardReducer';

class ScormPlayer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.fetchManifest = this.fetchManifest.bind(this);
  }

  handleTopicList() {
    this.props.topicListCallback();
  }

  handleTopicName() {
    this.props.contantCallback(this.props.workDashboardData.topicContentDataDetails);
  }

  componentDidMount() {
    window.API = new ScormAPI(this.props.id, this.props.roomId, this.props.topicId, this.props.questionnaireId);
    this.fetchManifest(this.props.id);
  }

  fetchManifest(id) {
    callApi(`fetch-manifest/${id}`, 'get')
        .then(json => {
          fetch(`${API_URL}/load-scorm-package/${this.props.id}/${json.imsmanifest.resources[0].resource[0].$.href}`)
          .then(res => this.setState({ src: res.url }));
        });
  }

  render() {
    const frameStyle = {
      width: '800px',
      height: '600px',
    };

    const cls_breadCrum = `${styles.breadCrum} ${styles.flexHeader} `;

    { const breadCrumb = !this.props.questionnaireId || this.props.questionnaireId === undefined ?
      <div className={styles.whiteCard}>
        <div className={cls_breadCrum}>
          <ul>
            <li>
              <Link id="roomName"><span>{this.props.roomName}</span></Link>
            </li>
            <li><span>/</span></li>
            <li>
              <Link id="topicList" onClick={this.handleTopicList.bind(this)}><span><FormattedMessage id="topics_list" /></span></Link>
            </li>
            <li><span>/</span></li>
            <li></li>
            <li>
              <Link id="topicName" onClick={this.handleTopicName.bind(this)}>
                <span title={this.props.workDashboardData.topicContentDataDetails.topicName}>{this.props.workDashboardData && this.props.workDashboardData.topicContentDataDetails && this.props.workDashboardData.topicContentDataDetails.topicName && this.props.workDashboardData.topicContentDataDetails.topicName.length > 20 ? (this.props.workDashboardData.topicContentDataDetails.topicName.substring(0, 20) + '...') : this.props.workDashboardData.topicContentDataDetails.topicName}</span>
              </Link>
            </li>
            <li><span>/</span></li>
            <li>
              <span>{this.props.workDashboardData.scormFileName.split('.')[0]}</span>
            </li>
          </ul>
        </div>
      </div>
        : null; }

    if (this.state.src) {
      return (
      <div className={styles.whiteCard}>
      {!this.props.questionnaireId || this.props.questionnaireId === undefined ?
        <div className={cls_breadCrum}>
          <ul>
            <li>
              <Link id="roomName"><span>{this.props.roomName}</span></Link>
            </li>
            <li><span>/</span></li>
            <li>
              <Link id="topicList" onClick={this.handleTopicList.bind(this)}><span><FormattedMessage id="topics_list" /></span></Link>
            </li>
            <li><span>/</span></li>
            <li></li>
            <li>
              <Link id="topicName" onClick={this.handleTopicName.bind(this)}>
                <span title={this.props.workDashboardData.topicContentDataDetails.topicName}>{this.props.workDashboardData 
                  && this.props.workDashboardData.topicContentDataDetails 
                  && this.props.workDashboardData.topicContentDataDetails.topicName 
                  && this.props.workDashboardData.topicContentDataDetails.topicName.length > 20 ? (this.props.workDashboardData.topicContentDataDetails.topicName.substring(0, 20) + '...') : this.props.workDashboardData.topicContentDataDetails.topicName}</span>
              </Link>
            </li>
            <li><span>/</span></li>
            <li>
              <span>{this.props.workDashboardData.scormFileName.split('.')[0]}</span>
            </li>
          </ul>
        </div>
        : null}
        <div className={styles.scormContainer}>
          <iframe
            id="scorm_object"
            type="text/html"
            style={frameStyle}
            src={this.state.src}
          />
        </div>
      </div>
      );
    }

    return (
      <Loading loadType="list" />
    );
  }
}

function mapStateToProps(state) {
  return {
    workDashboardData: workDashboardData(state),
  };
}

ScormPlayer.propTypes = {
  id: React.PropTypes.string,
  roomId: React.PropTypes.string,
  topicId: React.PropTypes.string,
  questionnaireId: React.PropTypes.string,
};

export default connect(mapStateToProps)(ScormPlayer);
