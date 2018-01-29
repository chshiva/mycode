import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';
import {Col, Row, Grid, Carousel} from 'react-bootstrap';
import styles from '../../Dashboard.css';
import PDF from 'react-pdf-js';
import { connect } from 'react-redux';
import { workDashboardData } from './WorkDashboardReducer';
import { setWorkDashboard, getPdfFileData} from './WorkDashboardActions';
import compStyles from '../../../../components/component.css';
import { loggedInData } from '../../../Login/LoginReducer';
import { workDashboardReload } from './WorkDashboardReloadReducer';


// for pdf annotation
// import __pdfjs from 'pdfjs-dist/build/pdf';
// import PDFJSAnnotate from 'pdfjs-annotate';
// import MyStoreAdapter from './myStoreAdapter';
// var PDFJS = require("pdf-annotate.js");

class PdfView extends Component{
	constructor(props) {
		super(props);
	  this.onDocumentComplete = this.onDocumentComplete.bind(this);
    this.onPageComplete = this.onPageComplete.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.state  = {page:1,pages:1,scale: 0.9}

    this.HandleSyncPdfPage = this.HandleSyncPdfPage.bind(this);
    this.props.confObject.SyncPdfPageListener(this.HandleSyncPdfPage);
    
	}

  componentDidMount() {
    //changeBy: pranathi, fetching questionnaire data
    let obj = {
      topicId: this.props.workDashboardData.tid,
      fileId: this.props.workDashboardData.fileId
    }
    this.props.dispatch(getPdfFileData(obj));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.workDashboardReload.pdfView != nextProps.workDashboardReload.pdfView) {
     let obj = {
        topicId: this.props.workDashboardData.tid,
        fileId: this.props.workDashboardData.fileId
      }
      this.props.dispatch(getPdfFileData(obj));
    }
  }

	onDocumentComplete(pages) {
    let obj = {
      page: 1, pages
    }
    if(this.props.imHost == true && this.props.workDashboardData.sync == true)
      this.syncPdfPage(obj);
    else
      this.setState(obj);
  }
 
  onPageComplete(page) {
    this.setState({ page });
  }
 
  handlePrevious() {
    let obj = {
      page : this.state.page - 1
    }
    if(this.props.imHost == true && this.props.workDashboardData.sync == true)
      this.syncPdfPage(obj);
    else
      this.setState(obj);
  }
 
  handleNext() {
    let obj = {
      page: this.state.page + 1
    }
    if(this.props.imHost == true && this.props.workDashboardData.sync == true) {
      this.syncPdfPage(obj);
    } else{
      this.setState(obj);
    }
  }

  handleTopicList() {
    this.props.topicListCallback();
  }

  handleTopicName() {
    this.props.contantCallback(this.props.workDashboardData.topicContentDataDetails);
  }

  handleClose = () => {
    let obj = { waitforview: false, ssPdfView : false, pdfFileName : '', ssUploadedby : '', fileName : this.props.fileName }
    this.props.closeCallback(obj);
  }

  renderPagination(page, pages) {
    let previousButton = <li id="previous" className="previous" onClick={this.handlePrevious}><a href="#"><i className="fa fa-arrow-left"></i><FormattedMessage id ='previous'/></a></li>;
    if (page === 1) {
      previousButton = <li className="previous disabled"><a href="#"><i className="fa fa-arrow-left"></i><FormattedMessage id ='previous'/></a></li>;
    }
    let nextButton = <li id="next" className="next" onClick={this.handleNext}><a href="#"><FormattedMessage id ='next'/> <i className="fa fa-arrow-right"></i></a></li>;
    if (page === pages) {
      nextButton = <li className="next disabled"><a href="#"><FormattedMessage id ='next'/> <i className="fa fa-arrow-right"></i></a></li>;
    }
     return (
      <nav>
        <ul className="pager">
          {previousButton}
          <li><a id="zoomIn" href="#" onClick={this.handleZoomIn}><i className="fa fa-search-plus"></i></a></li>
          <li><a id="zoomOut" href="#" onClick={this.handleZoomOut}><i className="fa fa-search-minus"></i></a></li>
          {nextButton}
        </ul>
      </nav>
      );
  }

  handleZoomIn = (e) => {
    e.preventDefault();
    this.setState({
      scale : this.state.scale+0.25
    })
  }

  handleZoomOut = (e) => {
    e.preventDefault();
    if(this.state.scale>1) {
      this.setState({
        scale : this.state.scale-0.25
      })
    }
  }

  //changeBy: pranathi, disc: added full screen functionality
  fullScreen() {
    var elem = document.getElementById("docFullscreen");
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
  }

  render() {
  	let cls_topicAuthor = `clearfix ${styles.topicAuthor}`;
    let pagination = null;
    let cls_breadCrum = `${styles.breadCrum} ${styles.flexHeader} `;

    if (this.state.pages) {
      pagination = this.renderPagination(this.state.page, this.state.pages);
    }
    var pdfFileName = null;
    var pathURL = null;
    var fileName = null;
    if(this.props.fileName) {    
      pdfFileName = this.props.fileName.substring(0, this.props.fileName.lastIndexOf(".")) + ".pdf"
      pathURL = "/uploads/sharing_docs/"+pdfFileName;
      fileName = this.props.fileName.substring(this.props.fileName.indexOf("_") + 1);
    } else if (!_.isEmpty(this.props.workDashboardData.topicPdfFileData)) {
      pdfFileName = this.props.workDashboardData.topicPdfFileData.fileName.substring(0, this.props.workDashboardData.topicPdfFileData.fileName.lastIndexOf(".")) + ".pdf";
      pathURL = "/uploads/"+pdfFileName;
      fileName = this.props.workDashboardData.topicPdfFileData.fileName.substring(this.props.workDashboardData.topicPdfFileData.fileName.indexOf("_") + 1);
    }

    // const { UI } = PDFJSAnnotate;
    // // const VIEWER = document.getElementById('viewer');
    // const VIEWER = this.refs.viewer;
    // const RENDER_OPTIONS = {
    //   documentId: pathURL,
    //   pdfDocument: null,
    //   scale: 1,
    //   rotate: 0
    // };

    // PDFJS.workerSrc = 'pdf.worker.js';
    // // PDFJSAnnotate.setStoreAdapter(MyStoreAdapter);
     
    // PDFJS.getDocument(RENDER_OPTIONS.documentId).then((pdf) => {
    //   RENDER_OPTIONS.pdfDocument = pdf;
    //   VIEWER.appendChild(UI.createPage(1));
    //   UI.renderPage(1, RENDER_OPTIONS);
    // });
    if (pdfFileName != null && pathURL != null && fileName != null) {
      return (
        <div className={styles.whiteCard}>
          {
            !this.props.fileName
            ?
            <div className={cls_breadCrum}>
              <ul>
                <li>
                  <Link id="roomName"><span>{this.props.roomName}</span></Link>
                </li>
                <li><span>/</span></li>
                <li>
                  <Link id="topicList" onClick={this.handleTopicList.bind(this)}><span><FormattedMessage id ="topics_list"/></span></Link>
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
                  <span>{fileName}</span>
                </li>
              </ul>
            </div>
            : ( this.props.imHost == true ? 
                <div className={cls_breadCrum}>
                  <div className={styles.pdfViewheader}>
                    <h1 title={fileName} className={styles.mainHeadingTxt}>{fileName}</h1>
                  </div>
                  <div className={styles.flexRightAction} > 
                    <div className={styles.flexActionList}>
                      <span id="fullScreen" className={styles.flexActionListSpan} onClick={this.fullScreen.bind(this)} title="Full screen"><FontAwesome name="arrows-alt" /></span>
                    </div>
                    <div className={styles.flexActionList} >
                      <span id="closePdf" className={styles.flexActionListSpan} onClick={this.handleClose} title="Close"><FontAwesome name="times"/></span>
                    </div>
                  </div>
                </div>
              : <div className={cls_breadCrum}>
                  <div className={styles.pdfViewheader}>
                    <h1 className={styles.mainHeadingTxt}>{fileName}</h1>
                  </div>
                  <div className={styles.flexRightAction} > 
                    <div className={styles.flexActionList}>
                      <span id="fullScreen" className={styles.flexActionListSpan} onClick={this.fullScreen.bind(this)} title="Full screen"><FontAwesome name="arrows-alt" /></span>
                    </div>
                    {this.props.workDashboardData.ssUploadedby == this.props.loggedInData.data._id ?
                     <div className={styles.flexActionList} >
                      <span id="closePdf" className={styles.flexActionListSpan} onClick={this.handleClose} title="Close"><FontAwesome name="times"/></span>
                    </div> : null}
                  </div>
                </div>
              )
          }
          {/*<div className={styles.topicsListBody}>
            <div ref="viewer"> </div>
            <PDF file={pathURL} onDocumentComplete={this.onDocumentComplete} onPageComplete={this.onPageComplete} page={this.state.page} scale={this.state.scale}/>
            {pagination}
          </div>*/}
          <Grid fluid={true}>
            <Row>
              <Col md={12}>
                <div id="docFullscreen">
                  <div className={compStyles.assTab} >
                    {pagination}
                  </div>
                  <div className={compStyles.pdfBlock} >
                    <div className={compStyles.assCanvas}>
                      <PDF file={pathURL} onDocumentComplete={this.onDocumentComplete} onPageComplete={this.onPageComplete} page={this.state.page} scale={this.state.scale}/>            
                    </div>                  
                  </div> 
                </div>               
              </Col>
            </Row>
          </Grid>
        </div>
      )
    } else {
      return null;
    }
  }

  //////////////////////////

  
  HandleSyncPdfPage(obj){
    this.setState(obj);
  }

  syncPdfPage = (objEntity) => {
    let obj = {
      command : 'SYNC-PDF-PAGE',
      content : { data: objEntity},
      type : 'OBJECT'
    };
    this.props.confObject.sendMessage(obj, 0);
  }
  ///////////////////////////
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    workDashboardData : workDashboardData(state),
    loggedInData : loggedInData(state),
    workDashboardReload: workDashboardReload(state)
  };
}

PdfView.propTypes = {
  workDashboardData: PropTypes.object,
  imHost: PropTypes.bool,
  loggedInData: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(PdfView);
