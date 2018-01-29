import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';
import {Col, Row, Grid, Modal} from 'react-bootstrap';
import {Header, Title, Body, Footer} from 'react-bootstrap/lib/Modal';
import MultipleChoice from './MultipleChoice';
import MultipleResponse from './MultipleResponse';
import { SaveQuestionRequest, showModal, editModal } from '../QuestionnaireActions';
var _ = require('lodash');
import style from '../../Admin.css';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import compStyles from '../../../../components/component.css';
import WoogeenManager from '../../../Communication/WoogeenManager';
import { questionnaireData } from '../QuestionnaireReducer';
import Loading from '../../../App/components/Loading';

//Chnages done in SaveQuestionRequest by Prateek for bug#2970

var dataObject = {};

class QuestionPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
        uid: null,
        marks: '',
        type: '',
        values: [''],
        radioAnswer: '',
        checkboxAnswer: [''],
        true: false,
        false: false,        
        questionId : '',
        enableSWOT : false,
        swotValue: [''],
        validationError:{},
        submitted : false,
        Loading : false
    };
    this.confObject = new WoogeenManager();
    this.quill = null;  
  }

  componentDidMount() {
    this.quill = new Quill(ReactDOM.findDOMNode(this.refs.editor), {
      modules: {
        toolbar: [
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline',  'videoURL'],
          ['image', 'code-block'],['formula'],
          [{ 'size': ['small', false, 'large', 'huge'] }],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'script': 'sub'}, { 'script': 'super' }],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'align': [] }],
        ],
        formula:true,
      },
      bounds: document.body,
      placeholder: 'Type question here...',
      theme: 'snow'  
    });
    if(this.props.questionnaireData.edit != undefined) {
      for(var i = 0; i < this.props.questionnaireData.data.questions.length; i++) {
        if(this.props.questionnaireData.data.questions[i]._id == this.props.questionnaireData.edit) {
          var data = this.props.questionnaireData.data.questions[i];
          let question = data.question;
          if(typeof question[0] === "string") {			
            question = [
              {
                "insert" : question[0]
              }
            ]
          }
          this.quill.setContents(question);
          if(data.swots.length > 0) {
            var swotStatus = true
          } else {
            var swotStatus = false
          }
          if(data.questionType == "Radio" || data.questionType == "Subjective") {
            var answer = data.answers[0]
            this.setState({
              uid: null,
              type: data.questionType,
              values: _.clone(data.options),
              radioAnswer: answer,
              checkboxAnswer: [''],
              questionId : this.props.questionnaireData.edit,
              swotValue : data.swots,
              enableSWOT : swotStatus,
              marks : data.marks === null?'':data.marks
            });
          } else if (data.questionType == "Checkbox") {
            this.setState({
              uid: null,
              type: data.questionType,
              values: _.clone(data.options),
              radioAnswer: '',
              checkboxAnswer: _.clone(data.answers),
              questionId : this.props.questionnaireData.edit,
              swotValue : data.swots,
              enableSWOT : swotStatus,
              marks : data.marks === null?'':data.marks
            });
          } else if (data.questionType == "TF") {
            var answer = data.answers[0]
            var index = _.indexOf(data.options, answer);
            if(index == 0) {
              var status = true
              var status1 = false
            } else {
              var status = false
              var status1 = true
            }
            this.setState({
              uid: null,
              type: data.questionType,
              values: _.clone(data.options),
              radioAnswer: answer,
              checkboxAnswer: [''],
              questionId : this.props.questionnaireData.edit,
              true: status,
              false: status1,
              swotValue : data.swots,
              enableSWOT : swotStatus,
              marks : data.marks === null?'':data.marks
            });
          }
        }
      }
    }  
  }

  componentWillUnmount() { 
    this.props.dispatch(editModal(''));
  }


  handleQuestion = (e) => { 
    this.setState({question: e.target.value})    
  }

  handleType (event) {
    if(event.target.value === 'TF') {
      this.setState({values : ["True", "False"]})
    } else {
      this.setState({values : ['', '']})
    }
    this.setState({type: event.target.value});
  }

  handleOption(index, e){
    const oldState = this.state.values;
    oldState[index] = e.target.value
    this.setState({values: oldState})
  }

  handleAddOption(){
    const oldState = this.state.values
    oldState.push('');
    this.setState({values: oldState})
  }

  handleRemoveOption(){
    const oldState = this.state.values;
    let length = oldState.length-1; 
    if(this.state.type == 'Radio' || this.state.type == 'TF'){
      this.state.radioAnswer = oldState[length] == this.state.radioAnswer?'':this.state.radioAnswer
    } else {
      if(this.state.checkboxAnswer.includes(oldState[length])){
        let checkboxAnswer = this.state.checkboxAnswer;
        checkboxAnswer.pop();
        this.state.checkboxAnswer = checkboxAnswer
      } 
    }
    const oldSwotState = this.state.swotValue;    
    oldSwotState.pop();       
    oldState.pop();    
    this.setState({
      values: oldState, 
      swotValue: oldSwotState      
    })      
  }

  handleRadioAnswer(index, e){
    this.setState({radioAnswer: e.target.value})
  }

  handleCheckboxAnswer(index, e){
    const oldState = this.state.checkboxAnswer;
    if(oldState[index] == e.target.value) {
      oldState[index] = ''
      this.setState({checkboxAnswer: oldState})
    } else {
      oldState[index] = e.target.value
      this.setState({checkboxAnswer: oldState})
    }
  }

  handleTrue(index, e) {
    this.setState({
      true: !this.state.true,
      false: false,
      radioAnswer: e.target.value
    })
  }

  handleFalse(index, e) {
    this.setState({
      false: !this.state.false,
      true: false,
      radioAnswer: e.target.value
    })
  }

  

  setresponse = (response) => {
    if(response.status){
      this.setState({
        uid: null,        
        type: '',
        values: [''],
        radioAnswer: '',
        checkboxAnswer: [''],
        true: false,
        false: false,
        questionId : '',
        enableSWOT : false,
        swotValue : [''],
        marks : '',
        loading : false
      });

      this.props.hideAddQuestionModal();
      

      //changeBy: pranathi, disc: reloading conduct question component in conferencd side 
      let addQuestionseObj = {
        command : 'RELOAD_CONDUCT_QUESTION',
        content : { questionnaireId:  this.props.questionnaireId },
        type : 'OBJECT'
      }
      //  console.log('create question');
      this.confObject.sendMessage(addQuestionseObj, 0);
    }else{
      let error = {};
      error['answerError'] = response.error[0] == 'Resulting document after update is larger than 16777216' || response.error[0] == 'Attempt to write outside buffer bounds'?'File Size Exceeded : Please try again with other file':response.error[0];
      this.setState({validationError: error, submitted : false})      
    }
  }

  handleSWOT() {
    this.setState({
      enableSWOT: !this.state.enableSWOT // flip boolean value
    });
  }

  handleSwotValue(index, e){
    const oldState = this.state.swotValue;
    oldState[index] = e.target.value
    this.setState({swotValue: oldState})
  }

  handleMarks = (e) => {
    this.setState({
      marks : e.target.value
    })  
  }

  createQuestion = () => {
    let errors={} 
    if (this.quill.getLength() <= 1) errors['questionError'] = <FormattedMessage id='Please_enter_Question' />;
    if (this.state.type == '') errors['typeError'] = <FormattedMessage id='please_select_type' />;
    // if(this.state.type == '' || this.state.question == '') {
    //   this.refs.questions_container.error("Please fill all the fields");
    // } else {
    if(this.state.type == "Radio" || this.state.type == "TF") {
      var emptyOptions = _.includes(this.state.values, '');
      for(var i = 0; i < this.state.values.length; i++) {
        if (/^\s+$/.test(this.state.values[i])) {
          var whitespaceOptions = true
        } else {
          var whitespaceOptions = false;
        }
      }
      var trimValues = _.map(this.state.values, _.trim);
      var duplicateValues =  _.uniq(trimValues).length !== trimValues.length;
      if (emptyOptions) {
        errors['answerError'] = <FormattedMessage id='Please_enter_Options' />;
      }  if (/^\s+$/.test(this.state.question)) {
        errors['questionError'] = <FormattedMessage id='Please_enter_Question' />;         
      }  if (this.state.values.length < 2) {
        errors['answerError'] = <FormattedMessage id='Provide_atleast_Two_Options' />;              
      }  if (whitespaceOptions) {
        errors['answerError'] = <FormattedMessage id='Please_enter_Options' />;                   
      }  if (duplicateValues) {
        errors['answerError'] = <FormattedMessage id='Options_cannot_be_same' />;  
      }  if (this.state.enableSWOT == false && this.state.radioAnswer == '') {
        errors['answerError'] = <FormattedMessage id='Please_select_an_Answer' />;          
      }  if (this.state.marks == '' && this.state.enableSWOT == false) {
        errors['marksError'] = <FormattedMessage id='Marks_cannot_be_empty' />;                  
      }  if (/^\d+$/.test(this.state.marks) == false && this.state.enableSWOT == false) {
        errors['marksError'] = <FormattedMessage id='Marks_can_only_have_Numbers' />;                               
        // this.refs.questions_container.error("Marks can only have numbers");
      }
      if (!(_.isEmpty(errors))) {
        this.setState({
          validationError: errors
        })
      } else {
        this.setState({
          validationError: {},
          submitted : true,
          loading : true
        })
        var answers = []
        answers.push(this.state.radioAnswer)
        var question = {
          question: this.quill.getContents().ops,
          questionType: this.state.type,
          options: trimValues,
          answers: answers,
          uid: this.props.uid,
          _id: this.props.questionnaireId,
          questionId : this.state.questionId            
        }
        //console.log("typed question", question);
        if(this.state.enableSWOT) {
          question['swots'] = this.state.swotValue,
          question['marks'] = null         
        } else {
          question['swots'] = [];
          question['marks'] = this.state.marks
        }
        this.props.dispatch(SaveQuestionRequest({question})).then(res => this.setresponse(res));
      }
    } else if (this.state.type == "Checkbox") {
      var emptyOptions = _.includes(this.state.values, '');
      var emptyAnswers = _.without(this.state.checkboxAnswer, '');
      var trimValues = _.map(this.state.values, _.trim);
      var duplicateValues =  _.uniq(trimValues).length !== trimValues.length;
      for(var i = 0; i < this.state.values.length; i++) {
        if (/^\s+$/.test(this.state.values[i])) {
          var whitespaceOptions = true;
        } else {
          var whitespaceOptions = false;
        }
      }
      if (emptyOptions) {
        errors['answerError'] = <FormattedMessage id='Please_enter_Options' />;
      }  if (/^\s+$/.test(this.state.question)) {
        errors['questionError'] = <FormattedMessage id='Please_enter_Question' />;         
      }  if (this.state.values.length < 2) {
        errors['answerError'] = <FormattedMessage id='Provide_atleast_Two_Options' />;         
      }  if (whitespaceOptions) {
        errors['answerError'] = <FormattedMessage id='Please_enter_Options' />;                    
      }  if (duplicateValues) {
        errors['answerError'] = <FormattedMessage id='Options_cannot_be_same' />;
      }  if (_.isEmpty(emptyAnswers) && this.state.enableSWOT == false) {
        errors['answerError'] = <FormattedMessage id='Please_select_an_Answer' />;            
      }  if (this.state.marks == '' && this.state.enableSWOT == false) {
        errors['marksError'] = <FormattedMessage id='Marks_cannot_be_empty' />;                 
      }  if (/^\d+$/.test(this.state.marks) == false && this.state.enableSWOT == false) {
        errors['marksError'] = <FormattedMessage id='Marks_can_only_have_Numbers' />;          
      }
      if (!(_.isEmpty(errors))) {
        this.setState({
          validationError: errors
        })
      } else {
        this.setState({
          validationError: {},
          submitted : true,
          loading : true
        })
        // let checkboxAnswer = _.compact(this.state.checkboxAnswer)
        var question = {
          question: this.quill.getContents().ops,
          questionType: this.state.type,
          options: trimValues,
          answers: this.state.checkboxAnswer,
          uid: this.props.uid,
          _id: this.props.questionnaireId,
          questionId : this.state.questionId            
        }
        if(this.state.enableSWOT) {
          question['swots'] = this.state.swotValue;
          question['marks'] = null;
        } else {
          question['swots'] = [];
          question['marks'] = this.state.marks
        }
        this.props.dispatch(SaveQuestionRequest({question})).then(res => this.setresponse(res));
      }
    } else if (this.state.type == "Subjective") {
      if (this.state.radioAnswer == '') {
        errors['questionError'] = <FormattedMessage id='Please_select_an_Answer' />;                       
      } 
      if (this.state.marks == '' && this.state.enableSWOT == false) {
        errors['marksError'] = <FormattedMessage id='Marks_cannot_be_empty' />;                                      
      } 
      if (/^\d+$/.test(this.state.marks) == false && this.state.enableSWOT == false) {
        errors['marksError'] = <FormattedMessage id='Marks_can_only_have_Numbers' />;                      
      } 
      if (!(_.isEmpty(errors))) {
        this.setState({
          validationError: errors
        })
      } else {
        this.setState({
          validationError: {},
          submitted : true,
          loading : true
        })
        var answers = []
        answers.push(this.state.radioAnswer)
        var question = {
          question: this.quill.getContents().ops,
          questionType: this.state.type,
          options: '',
          answers: answers,
          uid: this.props.uid,
          _id: this.props.questionnaireId,
          questionId : this.state.questionId,
          marks : this.state.marks
        }
        this.props.dispatch(SaveQuestionRequest({question})).then(res => this.setresponse(res));
      }
    } else {
        this.setState({
          validationError: errors          
        })
    }
    // }
  }

  handleQuill = (e) => {
    this.refs.marks.focus()

  }

  

  render() {
    
    let cls_btnSaveAssign = ` ${style.btnSaveAssign} `;
    let cls_editor = `${style.qleditor} form-control`;
    let loadType = 'save';

    if(this.props){
      dataObject = this.props;
    }

    const Radio = this.state.type == "Radio"
    ?
    <div>
      <div className="form-group">
        <div className="col-xs-2">
        </div>
        {
          this.state.enableSWOT
          ?
            <p className="col-xs-10"><FormattedMessage id ='select_an_answer_otherwise_it_will_not_be_considered_for_evaluation'/></p>
          : 
            <p className="col-xs-10"><FormattedMessage id ='enter_the_answer_choices_and_mark_which_answer_is_correct'/></p>
        }
      </div>
      {
        this.state.values.map((item, index)=>{
          return  <MultipleChoice key={index} value={item} index={index} change={this.handleOption.bind(this, index)} checked={this.state.radioAnswer} answer={this.handleRadioAnswer.bind(this, index)} enableSWOT={this.state.enableSWOT} swotValue={this.state.swotValue} handleSwotValue={this.handleSwotValue.bind(this, index)}/>
        })
      }
      <div className="form-group">
        <div className="col-xs-2">
        </div>
        <p className="col-xs-10"><a id="addOption" onClick={this.handleAddOption.bind(this)}><FormattedMessage id ='add'/></a> / <a id="removeOption" onClick={this.handleRemoveOption.bind(this)}><FormattedMessage id ='remove'/></a> <FormattedMessage id='answer_choice'/></p>
      </div>
    </div>: null

    const Checkbox = this.state.type == "Checkbox"
    ?
    <div>
      <div className="form-group">
        <div className="col-xs-2">
        </div>
        {
          this.state.enableSWOT
          ?
            <p className="col-xs-10"><FormattedMessage id ='select_an_answer_otherwise_it_will_not_be_considered_for_evaluation'/></p>
          : 
            <p className="col-xs-10"><FormattedMessage id ='enter_the_answer_choices_and_mark_which_answer_is_correct'/></p>
        }
      </div>
      {
        this.state.values.map((item, index)=>{
          return  <MultipleResponse key={index} value={item} index={index} change={this.handleOption.bind(this, index)} checked={this.state.checkboxAnswer} answer={this.handleCheckboxAnswer.bind(this, index)} enableSWOT={this.state.enableSWOT} swotValue={this.state.swotValue} handleSwotValue={this.handleSwotValue.bind(this, index)}/>
        })
      }
      <div className="form-group">
        <div className="col-xs-2">
        </div>
        <p className="col-xs-10"><a id="addOption" onClick={this.handleAddOption.bind(this)}><FormattedMessage id ='add'/></a> / <a id="removeOption" onClick={this.handleRemoveOption.bind(this)}><FormattedMessage id='remove'/></a> <FormattedMessage id='answer_choice'/></p>
      </div>
    </div>: null

    const TF = this.state.type == "TF"
    ?
    <div>
      <div className="form-group">
        <div className="col-xs-2">
        </div>
        {
          this.state.enableSWOT
          ?
            <p className="col-xs-10"><FormattedMessage id ='select_an_answer_otherwise_it_will_not_be_considered_for_evaluation'/></p>
          : 
            <p className="col-xs-10"><FormattedMessage id ='mark_correct_answer'/></p>
        }
      </div>
      <div className="form-group">
        <input id="radioTrue" type="radio" className="col-xs-2"  checked={this.state.true} value='True' onChange={this.handleTrue.bind(this, 0)} />
        {
          this.state.enableSWOT
          ? <div>
              <div className="col-xs-7">
                <input id="optionswot" type="text" className="form-control" value={this.state.values[0]} onChange={this.handleOption.bind(this, 0)} />
              </div>
              <div className="col-xs-3">
                  <select id="swot" className="form-control" value={this.state.swotValue[0]} onChange={this.handleSwotValue.bind(this, 0)} >
                  <option value="">None</option>              
                  <option value="Strength">Strength</option>
                  <option value="Weakness">Weakness</option>
                  <option value="Opportunity">Opportunity</option>
                  <option value="Threat">Threat</option>
                </select>
              </div>
            </div>
          : <div className="col-xs-10">
              <input id="optionvalue" type="text" className="form-control" value='True' onChange={this.handleOption.bind(this, 0)} readOnly/>
            </div>
        }
      </div>
      <div className="form-group">
        <input id="radioFalse" type="radio" className="col-xs-2" checked={this.state.false} value='False' onChange={this.handleFalse.bind(this, 1)}  />
        {
          this.state.enableSWOT
          ? <div>
              <div className="col-xs-7">
                <input id="optionswot" type="text" className="form-control" value={this.state.values[1]} onChange={this.handleOption.bind(this, 1)} />
              </div>
              <div className="col-xs-3">
                <select id="swot" className="form-control" value={this.state.swotValue[1]} onChange={this.handleSwotValue.bind(this, 1)} >
                  <option value="">None</option>              
                  <option value="Strength">Strength</option>
                  <option value="Weakness">Weakness</option>
                  <option value="Opportunity">Opportunity</option>
                  <option value="Threat">Threat</option>
                </select>
              </div>
            </div>
          : <div className="col-xs-10">
              <input id="answerValue" type="text" className="form-control" value='False' onChange={this.handleOption.bind(this, 1)} readOnly/>
            </div>
        }
      </div>
    </div>
    : null

    const Subjective = this.state.type == "Subjective"
    ?
    <div>
      <div className="form-group">
        <div className="col-xs-2">
        </div>
        <p className="col-xs-10">Enter the correct answer</p>
      </div>
      <div className="form-group">
        <input type="radio" className="col-xs-2"  defaultChecked />
        <div className="col-xs-10">
          <textarea id="radioAnswer" className="form-control" value={this.state.radioAnswer} onChange={this.handleRadioAnswer.bind(this, 0)} ref="desc" maxLength={300}/>
        </div>
      </div>
    </div>
    : null

    
    return (
      <div>
        
      {/*code added by - Najib, Desc - Checking state to set the loading spinner */}
        { this.state.loading?
            <div className={style.mainSpinBlock} >
              <div className={style.innerSpinBlock} >
                <Loading loadType = {loadType}/>
              </div>
            </div> :
        <div>
          <Header closeButton>
            {
              this.state.questionId != ''
              ?
              <Title className={style.popHeadingAll} ><FormattedMessage id = 'edit_question'/></Title>
              :
              <Title className={style.popHeadingAll} ><FormattedMessage id = 'add_question'/></Title>
            }
          </Header> 
          <Body>                       
            <form className="form-horizontal">
              <div className="form-group">
                <label htmlFor="inputType" className="control-label col-xs-2" ><FormattedMessage id = 'question'/>:</label>
                <div className="col-xs-10">                 
                  <div ref='editor' className={cls_editor}></div>
                  {/* <textarea id="question" className="form-control" placeholder="" value={this.state.question} style={this.state.validationError && this.state.validationError.questionError ? { borderColor: "#ff0000" } : {}}
                  onChange={this.handleQuestion.bind(this)} ref="question" maxLength={300} autoFocus='true' /> */}
                  <label id="questionError" className={compStyles.errorPre} >{this.state.validationError && this.state.validationError.questionError ? this.state.validationError.questionError : ''}</label>
                </div>
              </div> 
              <div className="form-group">
                <label htmlFor="inputType" className="control-label col-xs-2" ><FormattedMessage id = 'type'/>:</label>
                <div className="col-xs-10">
                  <select id="questionType" className="form-control" value={this.state.type} style={this.state.validationError && this.state.validationError.typeError ? { borderColor: "#ff0000" } : {}}
                    onChange={this.handleType.bind(this)}>
                    <option value=""><FormattedMessage id='select_type'/></option>              
                    <option value="Radio">Multiple Choice</option>
                    <option value="Checkbox">Multiple Response</option>
                    <option value="TF">True/false</option>
                    {/*<option value="Subjective">Subjective</option>*/}
                  </select>
                  <label id="typeError" className={compStyles.errorPre} >{this.state.validationError && this.state.validationError.typeError ? this.state.validationError.typeError : ''}</label>                  
                </div>
              </div>
              <div className="form-group">                
                <label htmlFor="marks" className="control-label col-xs-2"><FormattedMessage id = 'Marks'/>:</label>
                <Col sm={6}>
                  <input type="text" id="marks" value={this.state.marks} ref='marks' onClick={this.handleQuill} onChange={this.handleMarks.bind(this)} style={this.state.validationError && this.state.validationError.marksError ? { borderColor: "#ff0000" } : {}}
                    className="form-control" maxLength={3} />
                  <label id="marksError" className={compStyles.errorPre} >{this.state.validationError && this.state.validationError.marksError ? this.state.validationError.marksError : ''}</label>                                    
                </Col> 
                {/*<Col sm={3}>
                  <input type="checkbox" checked={this.state.enableSWOT} onChange={this.handleSWOT.bind(this)} />
                  &nbsp;
                  <label htmlFor="inputCheck" className="control-label"><FormattedMessage id='enable_swot' /></label>
                </Col>*/}                              
              </div>
              {Radio}
              {Checkbox}
              {TF}
              {Subjective}
              <label id="Error" className={compStyles.errorPre} >{this.state.validationError && this.state.validationError.answerError ? this.state.validationError.answerError : ''}</label>              
            </form> 
          </Body>
          {!this.state.submitted
          ?
          <Footer className={style.mainSaveAssign}>      
            <div className={style.blockSaveAssign} >
              <button id="questionCancelBtn" onClick={this.props.hideAddQuestionModal}><FormattedMessage id = 'cancel'/></button>
              <button id="questionSaveBtn" className={cls_btnSaveAssign} onClick={this.createQuestion}>{this.state.questionId != '' ? <FormattedMessage id = 'Update'/>:<FormattedMessage id = 'save'/>}</button>
            </div>
          </Footer>
          :null}
        </div> }
      </div>
    )  
  }
}
 


// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    questionnaireData : questionnaireData(state)  
  };
}

QuestionPopup.propTypes = {
  questionnaireData : PropTypes.object,
  intl: PropTypes.object,
  showModal: PropTypes.string,
  hidecallback: PropTypes.func,
  // dispatch: PropTypes.func.isRequired,
};

QuestionPopup.contextTypes= {
    intl: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(QuestionPopup);
