import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import update from 'react-addons-update';
import { Link, browserHistory } from 'react-router';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { loggedInData } from '../../../Login/LoginReducer';
import { intlData } from '../../../Intl/IntlReducer';
import { questionnaireListSubMenu } from '../schema/QuestionnaireMenu';
import FontAwesome from 'react-fontawesome';
import Validator from '../../../../components/Validator';
import SubMenu from '../../../../components/SubMenu';
import TopMenu from '../../../../components/TopMenu';
import { saveGrades, getQuestionnaireGradesData, ClearQuestionnaire } from '../QuestionnaireActions.js';
import { questionnaireData } from '../QuestionnaireReducer';
import styles from '../../../../components/component.css';
import style from '../../Admin.css';
import {Col, Row, Grid} from 'react-bootstrap';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
var _ = require('lodash');

class EditGradeConfiguration extends Component {
  constructor(props){
    super(props);
    
    this.submenu = Validator.activeSubMenu(questionnaireListSubMenu, "gradeConfiguration");
    this.submenu.menus[0].action = this.questionnaireList.bind(this);
    this.submenu.menus[1].action = this.gradeConfiguration.bind(this);
    this.state = {
      UIArray : [],
      activeGrid : false                     
    }        
  }

  
  componentDidMount() {
    this.setdata(this.props.loggedInData)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.questionnaireData.success != ''){
      this.refs.questionnaire_container.success(`${nextProps.questionnaireData.success} `, ``);
      this.props.dispatch(ClearQuestionnaire());
    }
  }

  setdata(result){
    this.props.dispatch(getQuestionnaireGradesData()).then(res => this.setGrades(res)) 
  } 

  saveGradeConfiguration(e) {
    e.preventDefault();
    let gradesArray = this.state.UIArray;
    let length = gradesArray.length;
    let count = 0;
    loop1:for(var index=0;index<length;index++) { 
      let gradeInfo = gradesArray[index];
      count += gradeInfo.to-gradeInfo.from+1; 
      if((gradeInfo.from === '' || gradeInfo.to === '' || gradeInfo.grade === '' || gradeInfo.result === '')) {
        this.refs.questionnaire_container.error("Please fill all fields");
        count = 0;
        break loop1;
      } else if (gradeInfo.from.length >3 || gradeInfo.to.length >3) {
        this.refs.questionnaire_container.error("Numbers should be from 0 to 100 only");
        count = 0;
        break loop1;
      } else if(/^[0-9]+$/.test(gradeInfo.from) == false || /^[0-9]+$/.test(gradeInfo.to) == false) {
        this.refs.questionnaire_container.error("Only numbers are allowed in from and to value");
        count = 0;
        break loop1;
      } else if (gradeInfo.result.length >12) {
        this.refs.questionnaire_container.error("Length of results can't be greater than 12 characters");
        count = 0;
        break loop1;
      } else if(gradeInfo.grade.length >4) {
        this.refs.questionnaire_container.error("Length of grade can't be greater than 4 characters");
        count = 0;
        break loop1;
      } else if(/^[a-zA-Z]+$/.test(gradeInfo.result) == false) {
        this.refs.questionnaire_container.error("Only Characters are allowed in results");
        count = 0;
        break loop1;
      } else if(gradeInfo.from > gradeInfo.to) {
        this.refs.questionnaire_container.error("From value can't be greater than To value");
        count = 0;
        break loop1;
      } else if(/^[a-zA-Z0-9+-]+$/.test(gradeInfo.grade) == false) {
        this.refs.questionnaire_container.error("Only alphanumeric values and special characters(+,-) are allowed in grades");
        count = 0;
        break loop1;
      } else if(length > 1){
        let array = _.clone(this.state.UIArray);
        array.splice(index,1);
        let arrayLength = array.length;
        for(var index2=0;index2<arrayLength;++index2){ 
          let secondObj = array[index2];
          if(secondObj.result !== '' && secondObj.grade !== '' && secondObj.from !== '' && secondObj.to !== '') {
            if(gradeInfo.result == secondObj.result) {
              this.refs.questionnaire_container.error("Results Can't be same");
              count = 0;
              break loop1;
            } else if(gradeInfo.grade == secondObj.grade) {
              this.refs.questionnaire_container.error("Grades Can't be same");
              count = 0;
              break loop1;
            } else if(gradeInfo.from>=secondObj.from && gradeInfo.from<=secondObj.to) {
              this.refs.questionnaire_container.error(gradeInfo.from+" Value Cannot be in between or equal to assigned values "+secondObj.from+" and "+secondObj.to);
              count = 0;
              break loop1;
            } else if(gradeInfo.to>=secondObj.from && gradeInfo.to<=secondObj.to) {
              this.refs.questionnaire_container.error(gradeInfo.to+" Value Cannot be in between or equal to assigned values "+secondObj.from+" and "+secondObj.to);
              count = 0;
              break loop1;
            } else if(index2 == arrayLength-1 && index == length-1){
              if(count === 101) {
                this.props.dispatch(saveGrades(this.state.UIArray)).then(res => this.setGrades(res)); 
              } else {
                this.refs.questionnaire_container.error('Should have grades for all percentage in range 0 to 100')
              }
            }
          }          
        }
      } else {
        if(count == 101) {
          this.props.dispatch(saveGrades(this.state.UIArray)).then(res => this.setGrades(res)); 
        } else {
          this.refs.questionnaire_container.error('Should have grades for all percentage in range 0 to 100')
        }
      }
    } 
  } 

  setGrades(res){
    if(res.status) {
      let gradesArray = res.data;
      this.setState({
        UIArray : _.cloneDeep(gradesArray),
        activeGrid : false       
      })           
    }
  }

  addOption = (e) => {
    e.preventDefault();
    let obj = {
      from : '',
      to : '',
      result : '',
      grade : ''
    }
    let addFieldOption = this.state.UIArray;
    addFieldOption.push(obj);
    this.setState({
      UIArray : addFieldOption      
    })    
  }

  removeOption = (index, e) => {
    e.preventDefault();
    if(this.state.activeGrid) {
      let removeFieldOption = this.state.UIArray;
      let length = removeFieldOption.length; 
      if(length >1) {
        if(removeFieldOption[index]['from'] !== '' && removeFieldOption[index]['to'] !== ''){
          if(index == length-1) {
            removeFieldOption[index-1]['from'] = removeFieldOption[index]['from'];
            removeFieldOption[index-1]['grade'] = '';
          } else {
            removeFieldOption[index+1]['to'] = removeFieldOption[index]['to'];
            removeFieldOption[index+1]['grade'] = '';
          }
        }
        removeFieldOption.splice(index,1);
      } else {
        this.refs.questionnaire_container.error('Should have grades for all percentage in range 0 to 100')
      }    
      this.setState({
        UIArray : removeFieldOption
      })
    }
  } 

  handleInputTo(index, e) {
    e.preventDefault();
    let addFieldValue = this.state.UIArray;
    let length = addFieldValue.length;
    if(e.target.value != '' && e.target.value <=100) {      
      let value = parseInt(e.target.value);
      let findIndex = _.findIndex(addFieldValue, function(o) {
        return value>=o.from && value<o.to
      });
      if(length > 1 && findIndex !=-1 && value!==addFieldValue[index]['from']) {
        if(value != 99 && index!=findIndex) {
          addFieldValue[index]['to'] = value;             
          if(index != 0) {
            addFieldValue[findIndex]['from'] = value+1;           
          } 
        } else if(value != 99 && index==findIndex) {
          addFieldValue[findIndex]['to'] = value;
        }
      } else if(value<addFieldValue[index]['from']) {
        addFieldValue[index]['to'] = addFieldValue[index]['from'];
        addFieldValue[index]['from'] = value;
      } else if(addFieldValue[index]['from']!==value){
        addFieldValue[index]['to'] = value;
      }       
      this.setState({
        UIArray : _.reverse(_.sortBy(addFieldValue, function(elements) {return elements.to}))
      }) 
    } else {
      this.refs.questionnaire_container.error('Should contain number ranging from 0 t0 100')
    }
  }

  handleInputFrom(index, e) {  
    e.preventDefault();
    let addFieldValue = this.state.UIArray;
    let length = addFieldValue.length;
    if(e.target.value != '' && e.target.value <=100) { 
      let value = parseInt(e.target.value);
      let findIndex = _.findIndex(addFieldValue, function(o) {
        return value>=o.from && value<o.to
      });
      if(length > 1 && findIndex !=-1 && addFieldValue[index]['to']!==value) {
        if(value !== 0 && value != 100) {
          addFieldValue[findIndex]['from'] = value; 
          if(index != length-1) {
            addFieldValue[findIndex+1]['to'] = value-1 
          }
          // addFieldValue[index+1]['to'] = value-1          
        } else if(value!==addFieldValue[index]['to']){
          addFieldValue[index]['from'] = value;
        }  
      } else if(value == 100 || value>addFieldValue[index]['to']){
        addFieldValue[index]['from'] = addFieldValue[index]['to'];
        addFieldValue[index]['to'] = value;
      } else if(value!==addFieldValue[index]['to']){
        addFieldValue[index]['from'] = value;
      } 
      this.setState({
        UIArray : _.reverse(_.sortBy(addFieldValue, function(elements) {return elements.to}))
      })
    } else {
      this.refs.questionnaire_container.error('Should contain number ranging from 0 t0 100')
    }
  }

  handleInputResult(index, e) {
    e.preventDefault();
    this.state.UIArray[index]['result'] = e.target.value.toUpperCase()   
  }

  handleInputGrade(index, e) {
    e.preventDefault();
    this.state.UIArray[index]['grade'] = e.target.value.toUpperCase()    
  }

  editOption = (e) => {
    e.preventDefault();
    this.setState({
      activeGrid : true      
    })    
  }

  cancelOption = (e) => {
    e.preventDefault();
    this.setState({
      activeGrid : false,
      UIArray : _.cloneDeep(this.props.questionnaireData.gradeData)      
    })
  }  

  questionnaireList = () => {
    browserHistory.push('/admin/questionnaire/list');
  }

  gradeConfiguration = () => {
    browserHistory.push('/admin/grade-configuration');
  }

  render() {
    let cls_container = `${styles.iContainer} ${styles.oContainer} pull-right`;
    let cls_topmenu = `${styles.iTopMenu} ${styles.oTopMenu}`;
    let cls_isubmenu = `${styles.iSubMenu} {styles.oSubMenu}`;
    let cls_flexItem = `${style.flexItem} clearfix`;
    let cls_smalldevice_closebtn = `${style.actionRightAbs} hidden-xs hidden-sm`;
    let cls_flexContainer = `${style.flexContainer} ${style.headerAdustPd}`;
    let cls_largeDevice = `${style.qgHeader} hidden-lg hidden-md`;
    let cls_qgHeader = `${style.qgHeader} hidden-lg hidden-md`;
    let cls_formH5 = `${style.formH5} hidden-lg hidden-md`;
    let cls_formControl = this.state.activeGrid ? `${style.editableFormControl}`:`${style.editableFormControl} ${style.formControl}`;
    let cls_deleteBtn = this.state.activeGrid ? `${style.closebtn}`:`${style.editClosebtn} ${style.closebtn}`;
    let cls_btnCancelGrade = ` ${style.btnCancelGrade} `;
    let cls_btnSaveGrade = ` ${style.btnSaveGrade} `;
    let cls_blockAddGrade = ` ${style.blockAddGrade} `;
    let cls_btnAddGrade = ` ${style.btnAddGrade} `;
    
    return (
      <div>
        <div className={cls_container}>
          <ToastContainer
            toastMessageFactory={ToastMessageFactory}
            ref="questionnaire_container"
            className="toast-top-right"
          />
          <div className={cls_topmenu}>
            <h3 className=""><FormattedMessage id='grade_configuration' /></h3>
              <div className={styles.dynamicBreadCrumb}>
                  <ul>
                    <li> 
                      <Link id="allQuestionnaire" onClick={this.questionnaireList}><FormattedMessage id = 'all_questionnaire'/></Link>
                    </li>
                    <li>/</li>
                    <li>
                      <FormattedMessage id ='grade_configuration'/>
                    </li>
                  </ul>
                </div>
            {/*<TopMenu data={this.mainmenu} />*/}
          </div> 
          <div className={cls_isubmenu}>
            <SubMenu data={this.submenu} />
          </div>
          <div className={style.midContainer}>
            <div className={style.whiteTile}>
              <div className={style.infoTxt}>
                <div className={style.headerActionBlock}>
                  <div className={style.headerTxt}>
                    <p><FormattedMessage id='title_grade_configuration' /></p>
                  </div>
                  <div className={style.headerAction}>
                    <div className={style.actionBtnGroup}>
                      <div className={style.blockSaveGrade}>
                        {this.state.activeGrid == false
                        ?
                          <div>
                            <a href="#" id="gradeManage" className={cls_btnSaveGrade} onClick={this.editOption.bind(this)}> <FormattedMessage id='manage' /></a>                 
                          </div>
                        :
                          <div>
                            <a href="#" id="gradeCancel" className={cls_btnCancelGrade} onClick={this.cancelOption.bind(this)} ><FormattedMessage id='cancel' /></a>
                            <a href="#" id="gradeSave" className={cls_btnSaveGrade} onClick={this.saveGradeConfiguration.bind(this)} ><FormattedMessage id='save' /></a>
                          </div>
                        }
                      </div>  
                    </div>
                  </div>
                </div>                                
              </div>
              <form className="form-inline" role="form">
                <ul className={style.inLine}>
                  <li className="hidden-xs hidden-sm">
                    <div className={cls_flexContainer}>
                      <div className={cls_flexItem}>
                        <h5 className={style.formH5}><FormattedMessage id='from' /></h5>
                      </div>
                      <div className={cls_flexItem}>
                        <h5 className={style.formH5}><FormattedMessage id='to' /></h5>
                      </div>
                      <div className={cls_flexItem}>
                        <h5 className={style.formH5}><FormattedMessage id='grade' /></h5>
                      </div>
                      <div className={cls_flexItem}>
                        <h5 className={style.formH5}><FormattedMessage id='questionnaire_result' /></h5>
                      </div>
                    </div>
                  </li>
                  {this.props && this.props.questionnaireData && this.props.questionnaireData.gradeData && this.props.questionnaireData.gradeData.length > 0
                    ?
                    this.state.UIArray.map(function(data, i){
                    let randomNumber = Math.floor(Math.random(0-9)*1000000000);
                    return <li key={randomNumber}>
                      <div className={cls_qgHeader}>
                        <div className={cls_deleteBtn}>                          
                          <span><i id="removeGrade" className="fa fa-trash-o" onClick={this.removeOption.bind(this, i)}></i></span>
                        </div>
                      </div>
                      <div className={style.flexContainer}>
                        <div className={cls_flexItem}>
                          <h5 className={cls_formH5}>From</h5>
                          <div className={style.formInputBox}>
                            <input type="text" className={cls_formControl} id="sevenPer"  placeholder="From Marks" defaultValue={data.from != undefined?data.from:''} onBlur={this.handleInputFrom.bind(this, i)} readOnly={this.state.activeGrid ==true?false:true}  ref={(input)=> this.myinput = input} maxLength="3"/>
                          </div>
                        </div>
                        <div className={cls_flexItem}>
                          <h5 className={cls_formH5}>To</h5>
                          <div className={style.formInputBox}>
                            <input type="text" className={cls_formControl} id="hundPer" placeholder="To Marks" defaultValue={data.to != undefined?data.to:''} onBlur={this.handleInputTo.bind(this, i)} readOnly={this.state.activeGrid ==true?false:true} maxLength="3"/>
                          </div>
                        </div>
                        <div className={cls_flexItem}>
                          <h5 className={cls_formH5}>Grade</h5>
                            <div className={style.formInputBox}>
                              <input type="text" className={cls_formControl} id="grade1"  placeholder="Grade" defaultValue={data.grade != undefined?data.grade:''} onBlur={this.handleInputGrade.bind(this, i)} readOnly={this.state.activeGrid ==true?false:true} maxLength="4"/>
                            </div>
                        </div>
                        <div className={cls_flexItem}>
                          <h5 className={cls_formH5}>Result</h5>
                          <div className={style.formInputBox}>
                            <input type="text" className={cls_formControl} id="resultsD"  placeholder="Result" defaultValue={data.result != undefined?data.result:''} onBlur={this.handleInputResult.bind(this, i)} readOnly={this.state.activeGrid ==true?false:true} maxLength="12"/>
                          </div>
                        </div>
                        <div className={cls_smalldevice_closebtn}>
                          <div className={cls_deleteBtn}>                            
                            <span><i className="fa fa-trash-o" id="removeGrade" onClick={this.removeOption.bind(this, i)}></i></span>                
                          </div>
                        </div>
                      </div>
                    </li>
                    }.bind(this))
                    :null} 
                </ul>
              </form>
              {this.state.activeGrid
              ?
              <div className={cls_blockAddGrade} >
                <a href="#" id="addGrade" className={cls_btnAddGrade} onClick={this.addOption.bind(this)}>{this.props.intlData.messages.add_another_field}</a>
              </div>
              :null}
            </div>
          </div>      
        </div>        
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    loggedInData: loggedInData(state),
    intlData: intlData(state),
    questionnaireData : questionnaireData(state)
  };
}

EditGradeConfiguration.propTypes = {
  loggedInData: PropTypes.object,
  questionnaireData : PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(EditGradeConfiguration);
