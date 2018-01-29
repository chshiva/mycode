import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { loggedInData } from '../../../Login/LoginReducer';
import Validator from '../../../../components/Validator';
// Import Style
import styles from '../../../../components/component.css';
import {Col, Row, Grid} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import SubMenu from '../../../../components/SubMenu';
import { browserHistory } from 'react-router';
import {uploadListSubMenu, submissionViewSubMenu} from '../schema/RoomMenu';
import { getPlagiarismCredits, getRoomData, getAssignmentData, saveEvaluatedAssignment, saveAssignmentGradeConfiguration, ClearIndidvidualAssignmentData, ClearRoom } from '../RoomActions';
import Uploading from '../../../../components/Uploading';
import { intlData } from '../../../Intl/IntlReducer';
import { roomData } from '../RoomReducer';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
/*
let path = '';*/
// if(typeof window !=="undefined" && typeof window.navigator !== "undefined"){
//   /*path = window.location.hostname;*/
// }
import PDF from 'react-pdf-js';


class ViewPDF extends Component {
  constructor(props){
    super(props);
 
    this.onDocumentComplete = this.onDocumentComplete.bind(this);
    this.onPageComplete = this.onPageComplete.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
    this.handleNext = this.handleNext.bind(this);

    if(this.props.params.tid && this.props.params.tid != undefined) {  
      uploadListSubMenu.menus[0].action = this.back.bind(this);
    }

    this.state  = {
      page:1,
      pages:1,
      scale: 0.9,
      assignmentConfiguration : [],
      isEdit : false,
      submitted : false,
      comment : '' ,
      credits : null   
    }

    Validator.activeSubMenu(submissionViewSubMenu, "evaluateAssignment");
    submissionViewSubMenu.menus[0].action = this.back.bind(this);
    submissionViewSubMenu.menus[1].action = this.fileView.bind(this);
    submissionViewSubMenu.menus[2].action = this.plagiarism.bind(this)
  }

  componentDidMount() {
    this.setdata(this.props.loggedInData);    
  }

  setdata(result){
    let roomId = this.props.params.rid;
    var obj = {
      roomId : roomId
    }
    if (result && result.data && result.data._id && this.props.params.aid && this.props.params.aid != undefined) {
      this.props.dispatch(getPlagiarismCredits()).then(res => this.setPlagiarism(res));
      let obj = {
        assignmentId : this.props.params.aid,
        studentID : this.props.params.sid
      }
      this.props.dispatch(getAssignmentData(obj)).then((res) => this.setGrades(res))
    }
    this.props.dispatch(getRoomData(obj, ''))
  }

  setPlagiarism(res) {
    submissionViewSubMenu.menus[2].text = this.props.intlData.messages.plagiarism+'('+res.creditData+')';
    this.setState({credits : res.creditData})
  }

  setGrades(res) {
    // console.log('label', res);
    if(res.status) {
      if(res.data.submissions[0].result != undefined && res.data.submissions[0].result.length>0) {        
        this.setState({
          assignmentConfiguration : _.cloneDeep(res.data.submissions[0].result),
          submitted : true,
          comment : res.data.submissions[0].comment
        })
      } else if(res.data.configuration.length>0){
        this.setState({assignmentConfiguration : _.cloneDeep(res.data.configuration)
        })
      } else {
        this.setState({
          assignmentConfiguration : [
            {
            title : 'Spellings',
            maximumMarks : 20 
            },
            {
              title : 'Insight',
              maximumMarks : 20
            },
            {
              title : 'Grammar',
              maximumMarks : 20
            }
          ]
        })
      }
    }
  }

  onDocumentComplete(pages) {
    this.setState({ page: 1, pages });
  }
 
  onPageComplete(page) {
    this.setState({ page });
  }
 
  handlePrevious() {
    this.setState({ page: this.state.page - 1 });
  }
 
  handleNext() {
    this.setState({ page: this.state.page + 1 });
  }

  back = () => {
    if(this.props.params.aid) {
      var rid = this.props.params.rid;
      var aid = this.props.params.aid;
      browserHistory.push('/admin/room/assignment/submissions/'+rid+'/'+aid);
    } else {
      var rid = this.props.params.rid;
      var tpid = this.props.params.tpid;
      browserHistory.push('/admin/room/uploadtotopic/'+tpid+'/'+rid);
    }
  }

  //changeBy: pranathi, disc: added pdf view  tab in submenu
  fileView = () => {
    var rid = this.props.params.rid;
    var aid = this.props.params.aid;
    var sid = this.props.params.sid;
    var filename = this.props.params.filename;
    browserHistory.push('/admin/room/assignment/submission/view/'+rid+'/'+aid+'/'+sid+'/'+filename);
  }

  plagiarism = () => {
    var rid = this.props.params.rid;
    var aid = this.props.params.aid;
    var sid = this.props.params.sid;
    browserHistory.push('/admin/room/assignment/submission/plagiarism/'+rid+'/'+aid+'/'+sid);
  } 

  viewroom = () => {
    // console.log("ViewRoomSubtab");
   var rid = this.props.params.rid;
    browserHistory.push('/admin/room/view/'+rid);
  }

  listtopic = () => {
    // console.log("AddUserSubtab");
    var roomId = this.props.params.rid;
    browserHistory.push('/admin/room/listtopic/'+roomId);
  }

  backToAssignments = () => {
    var rid = this.props.params.rid;
    var aid = this.props.params.aid;
    browserHistory.push('/admin/room/assignments/'+rid);
  }

  renderPagination(page, pages) {
    let previousButton = <li className="previous" onClick={this.handlePrevious}><a href="#"><i className="fa fa-arrow-left"></i><span className="hidden-xs"><FormattedMessage id ='previous'/></span></a></li>;
    if (page === 1) {
      previousButton = <li className="previous disabled"><a href="#"><i className="fa fa-arrow-left"></i><span className="hidden-xs"><FormattedMessage id ='previous'/></span></a></li>;
    }
    let nextButton = <li className="next" onClick={this.handleNext}><a href="#"><span className="hidden-xs"><FormattedMessage id ='next'/></span><i className="fa fa-arrow-right"></i></a></li>;
    if (page === pages) {
      nextButton = <li className="next disabled"><a href="#"><span className="hidden-xs"><FormattedMessage id ='next'/></span><i className="fa fa-arrow-right"></i></a></li>;
    }
    return (
      <nav>
        <ul className="pager">
          {previousButton}
          <li><a href="#" onClick={this.handleZoomIn}><i className="fa fa-search-plus"></i></a></li>
          <li><a href="#" onClick={this.handleZoomOut}><i className="fa fa-search-minus"></i></a></li>
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

  handleEdit = (e) => {
    if(this.props.roomData.individualAssigmentData.configuration.length>0) {
      this.setState({
        assignmentConfiguration : _.cloneDeep(this.props.roomData.individualAssigmentData.configuration),
        isEdit : true
      }) 
    } else {
      this.setState({
        assignmentConfiguration : [
          {
          title : 'Spellings',
          maximumMarks : 20 
          },
          {
            title : 'Insight',
            maximumMarks : 20
          },
          {
            title : 'Grammar',
            maximumMarks : 20
          }
        ],
        isEdit : true
      })
    }  
  } 

  handleInputTitle(index, e) {
    // console.log('value', e.target.value);
    var gradesArray = this.state.assignmentConfiguration;
    gradesArray[index]['title'] = e.target.value;
    this.setState({
      assignmentConfiguration : gradesArray
    })
  }

  handleInputMaximumMarks(index, e) {
    var gradesArray = this.state.assignmentConfiguration;
    gradesArray[index]['maximumMarks'] = e.target.value;
    this.setState({
      assignmentConfiguration : gradesArray
    })
  }

  handleCancel(e) {
    e.preventDefault();
    if(this.state.isEdit == false && this.state.submitted != true) {
      var cancelArray = _.map(this.state.assignmentConfiguration, function(data){
        if(data.score !=undefined) {
          delete data['score'];
          delete data['inputCSS']          
        }
        return data;
      })
      this.setState({
        assignmentConfiguration : cancelArray
      })
    } else if(this.state.isEdit) {
      if(this.props.roomData.individualAssigmentData.submissions[0].result != undefined && this.props.roomData.individualAssigmentData.submissions[0].result.length>0) {
        this.setState({
          assignmentConfiguration : _.cloneDeep(this.props.roomData.individualAssigmentData.submissions[0].result),
          submitted : true,
          comment : this.props.roomData.individualAssigmentData.submissions[0].comment
        })
      } else if(this.props.roomData.individualAssigmentData.configuration.length>0){
        this.setState({assignmentConfiguration : _.cloneDeep(this.props.roomData.individualAssigmentData.configuration)
        })
      } else {
        this.setState({
          assignmentConfiguration : [
            {
            title : 'Spellings',
            maximumMarks : 20 
            },
            {
              title : 'Insight',
              maximumMarks : 20
            },
            {
              title : 'Grammar',
              maximumMarks : 20
            }
          ],
          comment : ''
        })
      }
    }
    this.setState({
      submitted : this.state.submitted?true:false, 
      isEdit : false,
      //assignmentConfiguration : _.cloneDeep(this.props.)
    })
  }

  handleSave(e) {
    e.preventDefault();
    if(this.state.isEdit) {
      let gradesArray = this.state.assignmentConfiguration;
      for(var i=0;i<gradesArray.length;i++) {
        delete gradesArray['score'];
        delete gradesArray['_id'];
        if(gradesArray[i].title === '' && gradesArray[i].maximumMarks === '') {
          this.refs.pdf_container.error('Please fill all fields');
          break;
        } else if(gradesArray[i].title === '') {
          this.refs.pdf_container.error("Evaluation criteria can't be empty");
          break;
        } else if(gradesArray[i].maximumMarks === '') {
          this.refs.pdf_container.error("Maximum marks can't be empty");
          break;
        } else if(gradesArray[i].maximumMarks<=0) {
          this.refs.pdf_container.error("Maximum marks should be greater than 0");
          break;
        } else if(!/^\d+$/.test(gradesArray[i].maximumMarks)) {
          this.refs.pdf_container.error("Maximum marks can only have digits");
          break;
        } else if(!/^[a-zA-Z ]*$/.test(gradesArray[i].title)) {
          this.refs.pdf_container.error("Evaluation criteria can only have alpahabets and spaces");
          break;
        } else if(i == gradesArray.length-1){
          let obj = {
            configuration : gradesArray,
            assignmentId : this.props.params.aid,
            studentID : this.props.params.sid
          }
          this.props.dispatch(saveAssignmentGradeConfiguration(obj)).then(res => this.setConfigurationResponse(res))
        }
      }
    } else {
      let gradesArray = this.state.assignmentConfiguration;
      for(var i=0;i<gradesArray.length;i++) {
        if(gradesArray[i].score === '' || gradesArray[i].score === undefined) {
          this.refs.pdf_container.error('Please evaluate all fields')
          break
        } else if(i == gradesArray.length-1){
          this.setState({submitted : true});
          let obj = {
            result : gradesArray,
            comment : this.state.comment,
            assignmentId : this.props.params.aid,
            studentID : this.props.params.sid
          }
          this.props.dispatch(saveEvaluatedAssignment(obj)).then(res => this.setResponse(res))
        }
      }  
    }
  }

  setConfigurationResponse = (res) => {
    if(res.status) {
      this.refs.pdf_container.success(res.message);
      this.props.dispatch(ClearRoom());
      this.setState({isEdit : false});
      this.setGrades(res)
    }
  }

  setResponse = (res) => {
    if(res.status) {
      browserHistory.push("/admin/room/assignment/submissions/"+this.props.params.rid+"/"+this.props.params.aid);
      this.props.dispatch(ClearIndidvidualAssignmentData())      
    }
  }

  handleBtnSelection(index, maxMarks, value) {
    if(this.state.isEdit == false && this.state.submitted != true) {
      var gradesArray = this.state.assignmentConfiguration;
      gradesArray[index]['score'] = Math.floor(maxMarks*value/100);
      this.setState({
        assignmentConfiguration : gradesArray 
      })
    }
  }

  addEvalutionOptions(e) {
    e.preventDefault();
    var gradesArray = this.state.assignmentConfiguration;
    gradesArray.push({
      title : '',
      maximumMarks : 0
    });
    this.setState({
      assignmentConfiguration : gradesArray
    })
  }

  deleteEvalutionOption(index, e) {
    var gradesArray = this.state.assignmentConfiguration;
    if(gradesArray.length>1) {
      gradesArray.splice(index,1);
    }
    this.setState({
      assignmentConfiguration : gradesArray
    })
  }

  handleComment = (e) => {
    this.setState({comment : e.target.value})
  }

 

  render() {
   // console.log('roomData', this.props)
    let cls_container = `${styles.iContainer} ${styles.oContainer} pull-right`;
    let cls_topmenu = `${styles.iTopMenu} ${styles.oTopMenu}`;
    let cls_isubmenu = `${styles.iSubMenu} {styles.oSubMenu}`;
    let clsForm   = `${styles.iForm} ${styles.oForm}`;
    let clsFormNext   = `${styles.iForm} ${styles.oForm} ${styles.formNext}`;
    var cls = `${styles.iFormGroup} ${styles.oFormGroup}`;
    var cls_fg = `${styles.iSubFormGroup} ${styles.oSubFormGroup}`;
    var clslabel=`${styles.iLabel} ${styles.oLabel}`;
    var clstext = `${styles.iElement} ${styles.oElement}`;
    var clsformfield = `${styles.iFormField} ${styles.oFormField}`;
    let cls_badStyle = this.state.submitted?`${styles.gradeDisabledBox} ${styles.red}`:`${styles.gradeBox} ${styles.red}`;
    let cls_poorStyle = this.state.submitted?`${styles.gradeDisabledBox} ${styles.orange}`:`${styles.gradeBox} ${styles.orange}`;
    let cls_averageStyle = this.state.submitted?`${styles.gradeDisabledBox} ${styles.yellow}`:`${styles.gradeBox} ${styles.yellow}`;
    let cls_goodStyle = this.state.submitted?`${styles.gradeDisabledBox} ${styles.blue}`:`${styles.gradeBox} ${styles.blue}`;
    let cls_excellentStyle =  this.state.submitted?`${styles.gradeDisabledBox} ${styles.green}`:`${styles.gradeBox} ${styles.green}`;

    let pagination = null;
    var totalMarks = 0;
    var securedScore = 0;
    if (this.state.pages) {
      pagination = this.renderPagination(this.state.page, this.state.pages);
    }

    let pdfFileName = this.props.params.filename.substring(0, this.props.params.filename.lastIndexOf(".")) + ".pdf"
    let pathURL = "/uploads/"+pdfFileName;
    let fileName = this.props.params.filename.substring(this.props.params.filename.indexOf("_") + 1);
    
    return (
      <div>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="pdf_container"
          className="toast-top-right"
        />
        {(this.state.credits != '' && this.state.credits != null && this.state.credits != undefined) || (this.props.params.tid && this.props.params.tid != undefined)?
          <div>
            <div className={cls_container}>         
              <div className={cls_topmenu}>
                <h3 className="">{fileName}</h3>
                {this.props.params.tid && this.props.params.tid != undefined?
                  <div>
                    <div className={styles.dynamicBreadCrumb}>
                      <ul>
                        <li> 
                          <Link to="/admin/room/list"><FormattedMessage id = 'all_rooms'/></Link>
                        </li>
                         <li>/</li>
                        <li>
                          <Link onClick={this.viewroom}>{this.props.roomData.data.roomName}</Link>
                        </li>
                        <li>/</li>
                        <li>
                          <Link onClick={this.listtopic}><FormattedMessage id='topic_list'/></Link>
                        </li>
                        <li>/</li>
                        <li>
                          <Link onClick={this.back}><FormattedMessage id ='upload_list'/></Link>
                        </li>
                        <li>/</li>
                        <li>
                          <FormattedMessage id ='pdf_view'/>
                        </li>
                      </ul>
                    </div>
                    <div className={cls_isubmenu}>
                      <SubMenu data={uploadListSubMenu} />
                    </div>
                    <div className={clsForm}>
                      <div className={styles.whiteCard}>
                        <Grid fluid={true}>
                          <Row>
                            <Col md={12}>
                              <div className={styles.assTab}>
                                {pagination}
                              </div>
                              <div className={styles.pdfBlock}>
                                <div className={styles.assCanvas}>
                                  <PDF file={pathURL} onDocumentComplete={this.onDocumentComplete} onPageComplete={this.onPageComplete} page={this.state.page} scale={this.state.scale}/>            
                                </div>
                              </div>                        
                            </Col>
                          </Row>
                        </Grid>
                      </div>
                    </div>
                  </div>
                  :
                  <div>
                    <div className={styles.dynamicBreadCrumb}>
                      <ul>
                        <li> 
                          <Link to="/admin/room/list"><FormattedMessage id = 'all_rooms'/></Link>
                        </li>
                        <li>/</li>
                        <li>
                          <Link onClick={this.viewroom}>{this.props.roomData.data.roomName}</Link>
                        </li>
                        <li>/</li>
                        <li>
                          <Link onClick={this.backToAssignments}><FormattedMessage id ='assignment_list'/></Link>
                        </li>
                        <li>/</li>
                        <li>
                          <Link onClick={this.back}><FormattedMessage id ='submission_list'/></Link>
                        </li>
                        <li>/</li>
                        <li>
                          <FormattedMessage id ='pdf_view'/>
                        </li>
                      </ul>
                    </div>
                    <div className={cls_isubmenu}>
                      <SubMenu data={submissionViewSubMenu} />
                    </div>
                    <div className={clsFormNext}>
                      <div className={styles.greyCard}>
                        <Row>
                          <Col md={7}>
                            <div className={styles.assTab}>
                              {pagination}
                            </div>
                            <div className={styles.pdfBlock}>
                              <div className={styles.assCanvas}>
                                <PDF file={pathURL} onDocumentComplete={this.onDocumentComplete} onPageComplete={this.onPageComplete} page={this.state.page} scale={this.state.scale}/>            
                              </div>
                            </div>                        
                          </Col>
                          <Col md={5}>
                            <div className={styles.rightBox}>
                              <div className={styles.gradeBlock}>              
                                <div className={styles.actionBoxTop}>
                                  {this.state.isEdit?
                                  null
                                  :<a href="#" id="edit" className={styles.btnApplyAll} onClick={this.handleEdit.bind(this)}><FormattedMessage id ="edit"/></a>
                                  }
                                </div>                              
                                <div className={styles.gradeBody}>              
                                  <form className={styles.gradeGroup}>
                                    {this.state.assignmentConfiguration.map(function(data, index){  
                                    let randomNumber = Math.floor(Math.random()*100000000000000); 
                                    totalMarks = data.maximumMarks+totalMarks;
                                    let score = null;
                                    let value = null;
                                    let inputCSS = null;
                                    if(data.score!=undefined) {
                                      score = data.score;
                                      value = Math.floor((data.score/data.maximumMarks)*100);
                                      if(value<=100 && value>80){
                                        inputCSS = `${styles.scoreInput} ${styles.txtGreen}`
                                      } else if(value<=80 && value>60) {
                                        inputCSS = `${styles.scoreInput} ${styles.txtBlue}`
                                      } else if(value<=60 && value>40) {
                                        inputCSS = `${styles.scoreInput} ${styles.txtYellow}`
                                      } else if(value<=40 && value>20) {
                                        inputCSS = `${styles.scoreInput} ${styles.txtOrange}`
                                      } else {
                                        inputCSS = `${styles.scoreInput} ${styles.txtRed}`
                                      }
                                    }                                  
                                    securedScore = score+securedScore;              
                                    return <div className={styles.tile} key={randomNumber}>
                                      <div className={styles.tileItems}>
                                        <div className={styles.tileHeader}>
                                          <div className={styles.tileHeaderLeft}>  
                                            <input type="text" defaultValue={data.title} placeholder='Evaluation Criteria' onBlur={this.handleInputTitle.bind(this, index)} readOnly={!this.state.isEdit} className={styles.category} ref="input" maxLength={16}/>     
                                          </div>
                                          <div className={styles.innerScoreBoth} >
                                            {data.score == undefined || this.state.isEdit?null:
                                            <div className={styles.scored}>
                                              <input type="text" className={inputCSS} defaultValue={data.score} readOnly/>
                                              <label htmlFor="inputValue"><FormattedMessage id ="scored_marks"/></label>
                                            </div>}
                                            <div className={styles.maxScore}>
                                              <input type="text" className={styles.maxScoreInput} defaultValue={data.maximumMarks} onBlur={this.handleInputMaximumMarks.bind(this, index)} readOnly={!this.state.isEdit} maxLength={3}/>
                                              <label htmlFor="inputValue"><FormattedMessage id ="maximum_marks"/></label>
                                            </div>
                                          </div> 
                                          {this.state.isEdit
                                          ?
                                          <div className={styles.remTile} onClick={this.deleteEvalutionOption.bind(this, index)}>
                                            <FontAwesome name="times"></FontAwesome>
                                          </div>
                                          :null
                                          } 
                                        </div>
                                        {this.state.isEdit
                                        ?null
                                        :          
                                        <div className={styles.tileBody}>  
                                          <div className={styles.tileRatings}>
                                            <div className={value<=20 && value!=null?`${cls_badStyle} ${styles.assignmentResultActive}`:cls_badStyle} onClick={this.handleBtnSelection.bind(this, index, data.maximumMarks, 20)}>Bad</div>
                                            <div className={value<=40 && value>20 && value!=null?`${cls_poorStyle} ${styles.assignmentResultActive}`:cls_poorStyle} onClick={this.handleBtnSelection.bind(this, index, data.maximumMarks, 40)}>Poor</div>
                                            <div className={value<=60 && value>40 && value!=null?`${cls_averageStyle} ${styles.assignmentResultActive}`:cls_averageStyle} onClick={this.handleBtnSelection.bind(this, index, data.maximumMarks, 60)}>Average</div>
                                            <div className={value<=80 && value>60 && value!=null?`${cls_goodStyle} ${styles.assignmentResultActive}`:cls_goodStyle} onClick={this.handleBtnSelection.bind(this, index, data.maximumMarks, 80)}>Good</div>
                                            <div className={value<=100 && value>80 && value!=null?`${cls_excellentStyle} ${styles.assignmentResultActive}`:cls_excellentStyle} onClick={this.handleBtnSelection.bind(this, index, data.maximumMarks, 100)} >Excellent</div>
                                          </div>
                                        </div>
                                        }
                                      </div>
                                    </div>
                                    }.bind(this))}                           

                                    {this.state.isEdit?
                                    <div className={styles.addTile} onClick={this.addEvalutionOptions.bind(this)}>
                                      <div className={styles.addContral}>
                                        <span className={styles.addIconCircle}>
                                          <i className="fa fa-plus" ></i>
                                        </span>                           
                                        <span><FormattedMessage id ="add_another_field"/></span>          
                                      </div>
                                    </div>
                                    :null}
                                    {this.state.isEdit?
                                    null
                                    :
                                    <div className={styles.commentBox}>
                                      <ul>
                                      <li>                                        
                                          <div className={styles.totalScore}>
                                            <span className={styles.totalScoreText} ><FormattedMessage id ="total_score"/></span>
                                            <span className={styles.totalScoreInput}><span className={`${styles.scoreInput} ${styles.txtppl}`}>{securedScore == 0 ?0:securedScore}</span> <span className={styles.totalScoreSpan} >/<span> {totalMarks}</span></span></span>
                                          </div>                              
                                        </li>
                                        {this.state.submitted && (this.state.comment == undefined || this.state.comment == '')
                                        ?
                                        null:
                                        <li>
                                          <div className={styles.textBox}>
                                            <textarea className="form-control" rows="3" cols="20" id="comment" placeholder="Comment" readOnly={this.state.submitted} onChange={this.handleComment} value={this.state.comment} maxLength={130}></textarea>
                                          </div>
                                        </li>}                                  
                                      </ul>
                                    </div> 
                                    }         
                                  </form>
                                </div>
                                {this.state.submitted && this.state.isEdit == false?
                                null
                                :
                                  <div className={styles.actionBoxBottom}>
                                    <button id="cancel" onClick={this.handleCancel.bind(this)}><FormattedMessage id ="cancel"/></button>
                                    <button id="save" className={styles.morePref} onClick={this.handleSave.bind(this)}><FormattedMessage id ="save"/></button>
                                  </div>                                
                                }
                              </div>            
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </div>
                }
              </div>               
              
            </div>  
          </div>
        :<div className={styles.spinnerCss}><Uploading type="loading"/></div>}
      </div>     
    )
    
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    loggedInData : loggedInData(state),
    intlData: intlData(state),
    roomData : roomData(state),
  };
}

ViewPDF.propTypes = {
  loggedInData : PropTypes.object,
  roomData : PropTypes.object,
  dispatch : PropTypes.func.isRequired
};

ViewPDF.contextTypes = {
  router : React.PropTypes.object
};

export default connect(mapStateToProps)(ViewPDF);

//export default ViewPDF;
