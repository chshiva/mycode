import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Link } from 'react-router';

import callApi from '../../util/apiCaller';

import styles from '../component.css';
import dashStyles from '../../modules/Dashboard/Dashboard.css'
import dataStyle from './DataTable.css';

import {Col, Row, Grid} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';


import SubMenu from '../SubMenu';
import TopMenu from '../TopMenu';
import Loading from '../../modules/App/components/Loading';
var Pagination = require('pagination-object');
/*import  {ToastContainer, ToastMessage} from '../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);*/

class DataTable extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      pagination: {},
      sortObj: {}
    };
    this.pageKey = 0;

  }

  /*componentWillReceiveProps(nextProps) {
    if(nextProps.success && nextProps.success != "") {
      this.refs.container.success(`${nextProps.success} `, ``);
    }
    if(nextProps.error && nextProps.error.length > 0) {
      this.refs.container.error(`${nextProps.error} `, ``);
    }
    //console.log("will receive props");
    //this.props.clear;
  }*/

  componentDidMount(){
    if(this.props.count > 0){
        this.state.pagination = new Pagination({
          currentPage  : this.props.currentPage,
          totalItems   : this.props.count,
          itemsPerPage : this.props.itemsPerPage
        });
    
        this.props.newDataCallback({
          currentPage  : this.props.currentPage,
          totalItems   : this.props.count,
          itemsPerPage : this.props.itemsPerPage
        });
    }
    // console.log(this.state.pagination);
  }

  changePage(page){
    if(this.props.count > 0){
      this.props.newDataCallback({
        currentPage  : page,
        totalItems   : this.props.count,
        itemsPerPage : this.props.itemsPerPage
      }, this.state.sortObj);
    }
  }

  handleValue(e){

  }
  
  renderRow(data){
    var dispfield = this.props.dispField;
    if(dispfield && data && data._id){
      let rowkey = data._id + Math.floor(Math.random(0-9)*1000*2);
      return (
       <div key={rowkey} className={dataStyle.row}>
              
                {
                  Object.keys(dispfield).map(function(key){
                    let keyid = data._id + key;
                    let subkey = data._id + "dfsd";
                    return (<div className={dataStyle.col} key={keyid}>
                        {dispfield[key].type == "text" ?
                          data[dispfield[key].fieldName]
                          :
                          dispfield[key].callback(data)
                        }
                            </div>);
                    })
                }
              </div>
        );
    }
  }

  handleUpload(e) {
    this.props.handleUpload(e)
  }
  handleMediaUpload(e) {
    this.props.handleMediaUpload(e);
  }

  handleMediaUpload(e) {
    this.props.handleMediaUpload(e);
  }

  handleUrlUpload() {
    this.props.handleUrlUpload(this.refs.url.value)
  }

  handleUrlValue(e) {
    this.props.handleUrlValue(e)
  }

  renderRange(objRange) {
    // console.log("obj", objRange);
    this.pageKey += 1;
    let _key= 'pageKey' + this.pageKey;
    let _link ='?' + objRange.page;
    var page = this.changePage;
    if(objRange.isFirst){
      return (<li key={_key} title={objRange.page} onClick={this.changePage.bind(this, objRange.page)} data-page={objRange.page}>{objRange.label}</li>);
    }else if(objRange.isNext){
      return (<li key={_key} title={objRange.page} onClick={this.changePage.bind(this, objRange.page)} data-page={objRange.page}>{objRange.label}</li>);
    }else if(objRange.isPrevious){
      return (<li key={_key} title={objRange.page} onClick={this.changePage.bind(this, objRange.page)} data-page={objRange.page}>{objRange.label}</li>);
    }else if(objRange.isLast){
      return (<li key={_key} title={objRange.page} onClick={this.changePage.bind(this, objRange.page)} data-page={objRange.page}>{objRange.label}</li>);
    }else if (objRange.isCurrent){
      return (<li className={dataStyle.current} title={objRange.page} key={_key} onClick={this.changePage.bind(this, objRange.page)} data-page={objRange.page}>{objRange.page}</li>);
    }else{
      return (<li key={_key} title={objRange.page} onClick={this.changePage.bind(this, objRange.page)} data-page={objRange.page}>{objRange.page}</li>);
    }
  }

  getoptions = (data) => {
    let self = this;
    //console.log('data....',self)
    let options = data.map(function(option){
            return(
              <option key={option[0]} value={option[0]}>{self.context.intl.messages[option[1]]}</option>
              );
    });
    return options;
  }

  filterOptions = () =>{
    if(this.props && this.props.filter){
      let filter = this.props.filter;
      let key = 1001;
      let that = this;
      let filterControls = filter.map(function(obj){
                  if(obj.type == 'dropdown'){
                    {/*Chnages made by prateek for bug#2732 reactivity 
                  Date : 15/09/2017*/}
                    return (                  
                    <div className="col-md-2 pull-right col-xs-12" key={key++}> 
                      <select id ={obj.id} className="form-control" onChange= {obj.selectedfilter} value={obj.value}>
                        {that.getoptions(obj.data)}
                      </select>
                    </div>
                    );
                  }else if(obj.type == "search"){
                    return(
                      <div className="col-md-2 pull-right col-xs-12" key={key++}>
                        <input type="text" id ={obj.id} className="form-control" style={{ "marginBottom": "8px" }} placeholder={that.props.intl.messages.search} onChange={obj.selectedfilter} maxLength={50}/>
                      </div>
                    );
                  }
                });
      return filterControls;
    }else{
      return ;
    }
  }

  Handlesort = (event) => {
    let id = event.currentTarget.id;
    let obj = this.state.sortObj;
    if(obj[id] == 1)
      obj[id] = -1;
    else if (obj[id] == -1)
      obj[id] = 1;
    else{
      obj = {};
      obj[id] = 1;
    }
    
    this.props.newDataCallback({
          currentPage  : this.props.currentPage,
          totalItems   : this.props.count,
          itemsPerPage : this.props.itemsPerPage
        }, obj);
    this.setState({ sortObj : obj });
  }

  render() {
    let cls_container = `${styles.iContainer} ${styles.oContainer} pull-right`;
    let clsForm   = `${styles.iForm} ${styles.oForm}`;
    let cls_topmenu = `${styles.iTopMenu} ${styles.oTopMenu}`;
    let cls_isubmenu = `${styles.iSubMenu} {styles.oSubMenu}`; 
    let cls_filesUpload = `${dashStyles.btnUpload} ${dashStyles.bgBlueUpload}`;
    let cls_mediaUpload = `${dashStyles.btnUpload} ${dashStyles.bgGreenUpload}`;
    let cls_socUpload = `${dashStyles.btnUpload} ${dashStyles.bgRedUpload}`;
    let cls_imagePrivew = `${dashStyles.imagePreviewInput}`;
    let cls_fileName = `form-control ${dashStyles.imagePreviewFilename}`;
    let loadType = 'list';

    if(this.props.count > 0){
    
      let objNewPage = new Pagination({
        currentPage  : this.props.currentPage,
        totalItems   : this.props.count,
        itemsPerPage : this.props.itemsPerPage
      });
      
      // let pagination = this.state.pagination;
      let range = objNewPage.range;
      let self = this;
      

      this.objContainer =  (
        <Row>
          <Col md={12}>
            <div className={dataStyle.responsivetable}>
              <div className={dataStyle.table}>                
                <div className={dataStyle.headerRow}>
                  {
                    Object.keys(this.props.dispField).map(function(key){
                        let headingID = key + 'heading';
                        let dbName = this.props.dispField[key].dbName ? this.props.dispField[key].dbName : '';
                        return (
                          <div key={headingID} id={dbName} className={dataStyle.col} onClick={this.props.dispField[key].sort ? this.Handlesort : null}>{this.props.dispField[key].title} {this.props.dispField[key].sort ? (this.state.sortObj[dbName] && this.state.sortObj[dbName] == 1 ? <FontAwesome name="sort-amount-desc" /> : <FontAwesome name="sort-amount-asc" />) : null}</div>
                        )
                    }, this)
                  }
                </div> 
                {
                  Object.keys(this.props.data).map(function(key){
                    return this.renderRow(this.props.data[key]);
                  }, this)
                }
                </div>
                <div>
              <ul className={dataStyle.pagination}>
                {objNewPage.range ? 
                  Object.keys(range).map(function(key) {
                      return self.renderRange(range[key]);
                  })
                : ''}
              </ul>
              </div>
            </div>
          </Col>
        </Row>
      );
    }else{
      this.objContainer =  (
      <Row>
        <div className={dataStyle.noDataBox}>          
            <h2>
              <FontAwesome name="frown-o" />
            </h2>
            <p><FormattedMessage id ="no_data_yet"/></p>
        </div>    
        </Row>
      );
                
    }


    if(this.props.listType == 'Reports') {
      return (
        <Grid fluid={true}>
          <Row>
            <Col md={12}>
              <div className={dataStyle.infoTxt}>
                <Row>
                  <div className="col-md-6">
                    <p><FormattedMessage id='title_list_details' />&nbsp;
                    {this.props.listDescreption}</p>
                  </div>
                  {this.filterOptions()}
                </Row>
              </div>
              
            </Col>
          </Row>
          
          {this.objContainer}
        </Grid>
      )
    } else {
    
      return(
           
        <div className={this.props.topmenu != null && this.props.submenu != null ? cls_container : ''}>
          {this.props.topmenu != null ?
            <div className={cls_topmenu}>
              <h3 className="">{this.props.pageTitle}</h3>
               {this.props.bredCrumb != null ?
                <div>
                  {this.props.bredCrumb}
                </div>
              :null }
              <TopMenu data={this.props.topmenu} />
            </div>
          : null}
          {this.props.submenu != null ?
            <div className={cls_isubmenu}>
              <SubMenu data={this.props.submenu} />
            </div>
          : null}

          <div className={clsForm}>

            {
              this.props.listType == 'Upload'
              ?
              <div className={dashStyles.grayCard}>
                <div className={dashStyles.grayCardHeader}>
                  <p><FormattedMessage id='uploadtotopic_title' /></p>
                </div>
                <div className={dashStyles.grayCardBody}>
                  <Row>
                    <Col md={6}>
                      <div className={dashStyles.filesBtnBlock}>
                        <ul>
                          <li>
                            <div className={dashStyles.uploadBtnBlock}>
                              <div className={dashStyles.helpTip}>
                                <p>
                                  <span className={dashStyles.heading}><FormattedMessage id='filetypes_title' /></span>
                                  <span className={dashStyles.uploadTxt}>
                                     .xlsx, .xls, .doc, .docx, .ppt, .pptx, .txt, .pdf, .odp, .ods , etc...
                                  </span>
                                </p>
                              </div>
                              <div className={cls_filesUpload}>
                                <input type="file" id="uploadFiles" accept=".xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf,.odp,.odt,.ods" onChange={this.handleUpload.bind(this)} value={''}/>
                                <img src="/images/white-icons/file.png" />
                              </div>
                              <p><FormattedMessage id='file_title' /></p>
                            </div>
                          </li>
                          <li>
                            <div className={dashStyles.uploadBtnBlock}>
                              <div className={dashStyles.helpTip}>
                                <p>
                                  <span className={dashStyles.heading}><FormattedMessage id='filetypes_title' /></span>
                                  <span className={dashStyles.uploadTxt}>
                                     .png, .jpeg, .jpg, .gif, .wav, .mp3,.mp4,.webm , .avi, .mkv, etc...
                                  </span>
                                </p>
                              </div>
                              <div className={cls_mediaUpload}>
                                <input type="file" id="mediaFiles" accept=".png,.jpeg,.jpg,.gif,.wav,.mp3,.mp4,.webm,.avi,.mkv,.vob" onChange={this.handleMediaUpload.bind(this)} value={''}/>
                                <img src="/images/white-icons/media.png" />
                              </div>
                              <p><FormattedMessage id='media_title' /></p>
                            </div>
                          </li>
                          <li>
                            <div className={dashStyles.uploadBtnBlock}>
                              <div className={dashStyles.helpTip}>
                                <p>
                                  <span className={dashStyles.heading}><FormattedMessage id='filetypes_title' /></span>
                                  <span className={dashStyles.uploadTxt}>
                                     .zip
                                  </span>
                                </p>
                              </div>
                              <div className={cls_socUpload}>
                                <input type="file" id="zipFiles" accept="application/zip" onChange={this.handleUpload.bind(this)} value={''}/>
                                <img src="/images/white-icons/zip.png" />
                              </div>
                              <p><FormattedMessage id='sco_title' /></p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className={dashStyles.urlConverterBlock}>
                        <div className={dashStyles.inputGroup}>
                          <Row>
                            <Col md={12}>  
                              <div className="input-group">
                                <input type="text" id="url" className={cls_fileName} value={this.props.urlInputValue} placeholder={this.props.intl.messages.youtube_url_placeholder} ref="url" onChange={this.handleUrlValue.bind(this)} autoFocus='true' />
                                <span className="input-group-btn">
                                  <button id="upload" type="button" className="btn btn-default image-preview-clear" style={{"display":"none"}}>
                                      <span className="glyphicon glyphicon-remove"></span> Clear
                                  </button>
                                  <div className={cls_imagePrivew} onClick={this.handleUrlUpload.bind(this)}>
                                    <FontAwesome name="upload"/>
                                    <span className={dashStyles.imagePreviewInputTitle}> <FormattedMessage id='upload_title' /></span>
                                  </div>
                                </span>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
              : null
            }
            
            <div className={dataStyle.whiteCard}>
              <Grid fluid={true}>
                <Row>
                  <Col md={12} >                  
                    <div className={dataStyle.infoTxt}>
                      <Row>
                        <div className="col-md-6">
                          <p><FormattedMessage id='title_list_details' />&nbsp;
                          {this.props.listDescreption}</p>
                        </div>
                        {this.filterOptions()}
                      </Row>
                    </div>                     
                  </Col>
                </Row>


                {/*code added by - Najib, Desc - Checking state to set the loading spinner */}  
                {this.props.loading ?
                 <div className={dataStyle.mainSpinBlock} >
                    <div className={dataStyle.innerSpinBlock} >
                      <Loading loadType = {loadType}/>
                    </div>
                  </div> :
                  this.objContainer}
              </Grid>
            </div> 

          </div>
        
        </div>
      );
    }
  }
}
 
DataTable.propTypes = {
  data: PropTypes.any,
  count: PropTypes.number,
  currentPage: PropTypes.number,
  submenu: PropTypes.object,
  topmenu: PropTypes.object,
  itemsPerPage: PropTypes.number,
  newDataCallback: PropTypes.func,
  dispField: PropTypes.array,
  pageTitle: PropTypes.string,
  listDescreption: PropTypes.string,
  success : PropTypes.string,
  error : PropTypes.array
};

DataTable.contextTypes = {
  intl: React.PropTypes.object.isRequired
};

DataTable.defaultProps = { itemsPerPage: 10, currentPage: 1, count: 0 };

export default injectIntl(DataTable);
