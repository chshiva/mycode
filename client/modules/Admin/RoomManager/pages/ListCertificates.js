import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Link, browserHistory } from 'react-router';
import _ from 'underscore';

import Validator from '../../../../components/Validator';
import { roomData } from '../RoomReducer';
import DataTable from '../../../../components/DataTable/DataTable';
import { roomEditSubMenu, roomCertificatesMainMenu } from '../schema/RoomMenu';


// Import Style
import styles from '../../../../components/component.css';

import { ClearRoom, getCertificateData, toggleCertificateDownload } from '../RoomActions';
import { intlData } from '../../../Intl/IntlReducer';
import { ToastContainer, ToastMessage } from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);

class ListCertificates extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
      loading: false,
    };

    this.currentPage = 1;
    this.itemsPerPage = 5;

    this.submenu = Validator.activeSubMenu(roomEditSubMenu, 'lnkCertificates');
    this.mainmenu = roomCertificatesMainMenu;
    this.getData = this.getData.bind(this);
    this.approveCertificate = this.approveCertificate.bind(this);
    this.searchFilter = this.searchFilter.bind(this);
    this.pageData = this.pageData.bind(this);
    this.toggleCertificate = this.toggleCertificate.bind(this);

    this.submenu.menus[0].action = this.viewroom.bind(this);
    this.submenu.menus[1].action = this.adduser.bind(this);
    this.submenu.menus[2].action = this.listtopic.bind(this);
    this.submenu.menus[3].action = this.feedbackList.bind(this);
    this.submenu.menus[4].action = this.roomConfiguration.bind(this);
    this.submenu.menus[5].action = this.listAssignments.bind(this);
    this.submenu.menus[6].action = this.courseReports.bind(this);
    this.submenu.menus[7].action = this.listCertificates.bind(this);
  }

  componentDidMount() {
    this.getData({
      currentPage: this.currentPage,
      totalItems: 0,
      itemsPerPage: this.itemsPerPage,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.roomData.success !== '') {
      this.refs.room_container.success(`${nextProps.roomData.success} `, '');
      this.props.dispatch(ClearRoom());
    }
  }


  viewroom = () => {
    const roomId = this.props.params.cid;
    browserHistory.push('/admin/room/view/'+roomId);
  }

  adduser = () => {
    const roomId = this.props.params.cid;
    browserHistory.push('/admin/room/adduser/'+roomId);
  }

  listtopic = () => {
    const roomId = this.props.params.cid;
    browserHistory.push('/admin/room/listtopic/'+roomId);
  }

  feedbackList = () => {
    const roomId = this.props.params.cid;
    browserHistory.push('/admin/room/room-feedback-list/'+roomId);
  }

  roomConfiguration = () => {
    const roomId = this.props.params.cid;
    browserHistory.push('/admin/room/configuration/'+roomId);
  }

  courseReports = () => {
    const roomId = this.props.params.cid;
    browserHistory.push('/admin/room/attendance/'+roomId);    
  }

  listAssignments = () => {
    const roomId = this.props.params.cid;
    browserHistory.push('/admin/room/assignments/'+roomId);
  }

  listCertificates = () => {
    const roomId = this.props.params.cid;
    browserHistory.push('/admin/room/certificates/'+roomId);
  }

  getData(pageParam, sort = { 'student.firstname': 1 }) {
    if (sort != null) {
      pageParam.sortObj = sort;
    }
    pageParam.roomId = this.props.params.cid;
    pageParam.searchKeyword = this.state.searchValue;
    

    if (_.isEmpty(this.props.roomData.certificateData)) {
      this.setState({ loading: true });
    } else {
      this.setState({ loading: false });
    }
    this.props.dispatch(getCertificateData(pageParam, pageParam.currentPage))
  .then((res) => { this.pageData(res); });
  }

  pageData(response) {
    if (response.status === false) {
      this.refs.room_container.error(`${response.error} `, '');
    }
    this.forceUpdate();
    if (this.state.loading) {
      this.setState({ loading: false });
    }
  }

  approveCertificate(row) {
    return (<input
      type="checkbox"
      id={row._id}
      value={row.isCertificateEligible}
      checked={row.isCertificateEligible}
      onChange={this.toggleCertificate}
    />);
  }

  toggleCertificate(e) {
    const roomId = this.props.params.cid;
    const studentId = e.currentTarget.id;

    this.props.dispatch(toggleCertificateDownload(roomId, studentId))
    .then((res) => {
      if (res.status !== true) {
        this.refs.room_container.error(`${res.error} `, '');
      }
    });
  }

  showStudentName(row) {
    const name = row.name;
    return <div>{name}</div>;
  }

  showTopicsCompleted(row) {
    const topicsCompleted = row.topicsCompletedPercentage;

    return <div>{topicsCompleted}%</div>;
  }

  showQuestionnaireCompleted(row) {
    const questionnairePercentage = row.questionnairePercentage;
    const questionnaireCount = row.questionnaireCount;
    const totalQuestionnaire = row.totalQuestionnaire;
    return <div>{questionnairePercentage}%, {questionnaireCount}/{totalQuestionnaire} completed</div>;
  }

  searchFilter = (e) => {
    e.preventDefault();
    const expVal = e.target.value.trim();
    const pattern = new RegExp(/[+*()?\\]/);
    if (!pattern.test(expVal)) {
      this.state.searchValue = e.target.value.trim();
      this.getData({
        currentPage: this.currentPage,
        totalItems: 0,
        itemsPerPage: this.itemsPerPage,
      });
    }
  }

  showQuestionnaireGrade(row) {
    return <div>{row.questionnaireGrade}</div>
  }

  render() {
    const objDisp = [
        { title: <FormattedMessage id="student_name" />, type: 'function', callback: this.showStudentName, sort: true, dbName: 'student.firstname' },
        { title: <FormattedMessage id="topics_completed" />, type: 'function', callback: this.showTopicsCompleted },
        { title: <FormattedMessage id="questionnaire" />, type: 'function', callback: this.showQuestionnaireCompleted },
        { title: <FormattedMessage id="grade" />, type: 'function', callback: this.showQuestionnaireGrade },
        { title: <FormattedMessage id="certificate_approved" />, type: 'function', callback: this.approveCertificate },
    ];

    const filter = [
        { type: 'search', id: 'studentSearch', selectedfilter: this.searchFilter },
    ];

    const breadcrumb = (
      <div className={styles.dynamicBreadCrumb}>
        <ul>
          <li>
            <Link to="/admin/room/list"><FormattedMessage id="all_rooms" /></Link>
          </li>
          <li>/</li>
          <li>
            {this.props.roomData.data.roomName}
          </li>
        </ul>
      </div>
    );

    return (
      <div>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="room_container"
          className="toast-top-right"
        />
        <DataTable
          data={this.props.roomData.certificateData}
          count={this.props.roomData.studentsCount}
          currentPage={this.props.roomData.currentCertificatePage}
          submenu={this.submenu}
          bredCrumb={breadcrumb}
          topmenu={this.mainmenu}
          itemsPerPage={this.itemsPerPage}
          newDataCallback={this.getData}
          dispField={objDisp}
          pageTitle={this.props.intl.messages.room_management}
          listDescreption={this.props.intl.messages.list_certificates}
          filter={filter}
          loading={this.state.loading}
        />
      </div>
    );
  }
}

ListCertificates.propTypes = {
  roomData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    intl: state.intl,
    roomData: roomData(state),
    intlData: intlData(state),
  };
}

export default connect(mapStateToProps)(ListCertificates);
