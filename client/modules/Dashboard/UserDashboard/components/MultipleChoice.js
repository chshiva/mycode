import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';
import {Col, Row, Grid} from 'react-bootstrap';
import styles from '../../Dashboard.css';
import RenderQuestions from '../../../Admin/Questionnaire/components/RenderQuestions';
var _ = require('lodash');

var correctAns = null;
var swotWithoutAns = null;

class MultipleChoice extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let cls_formInline = `${styles.formInline} form-inline`;
    let cls_marksInline = `${styles.marksCss} pull-right`;
    return (
      <li key={this.props.data._id} >
        <div className={styles.questionBlock}>
          <div className={styles.questionHeading}>
            <div className={styles.questionIconCircle}>
              <FontAwesome name="question" />
            </div>
            <RenderQuestions question={this.props.data.question} />
          </div>
          <div className={styles.chooseAnswerBlock}>
            <p><FormattedMessage id = 'multiple_choice_answers'/>
              {this.props.data.marks != undefined || this.props.data.marks != null?
                <span className={cls_marksInline}>
                  <FormattedMessage id = 'Marks'/>:{this.props.data.marks}
                </span>
              :null}
            </p>            
            <form className={cls_formInline}>
              <div className="radio">
                { 
                  this.props.wrong || this.props.correct
                  ?
                  this.props.data.options.map((item, index)=>{

                    var wrongAnsArr = null
                    for(var i = 0; i < this.props.wrong.length; i++) {
                      if(this.props.wrong[i].questionId == this.props.data._id) {
                        var data = this.props.wrong[i]
                        wrongAnsArr = data.answers
                        swotWithoutAns = data.swotWithoutAns
                      }
                    }

                    var correctAnsArr = null
                    for(var i = 0; i < this.props.correct.length; i++) {
                      if(this.props.correct[i].questionId == this.props.data._id) {
                        var data = this.props.correct[i]
                        correctAnsArr = data.answers
                        swotWithoutAns = data.swotWithoutAns
                      }
                    }

                    if(correctAnsArr != null) {
                      var correctStatus = _.includes(correctAnsArr, item)
                      correctAns = true
                    } else if (wrongAnsArr != null) {
                      var wrongStatus = _.includes(wrongAnsArr, item)
                      correctAns = false
                    } else {
                      correctAns = false
                    }

                    if(this.props.data.answers != null) {
                      var answersArray = _.map(this.props.data.answers, _.trim);
                      var itemElement = _.trim(item);
                      var correctLabel = _.includes(answersArray, itemElement)
                    }
                    
                    if(correctStatus == true) {
                      var checked = true
                    } else if (wrongStatus == true) {
                      var checked = true
                    } else {
                      var checked = false
                    }

                    var number = index + 1
                    return <label className="radio-inline" key={index}>
                      { 
                        this.props.showResult != undefined
                        ?
                          correctLabel == true
                          ?
                          <span className={styles.rightAns}></span>
                          : null
                        :null
                      }
                      <input id="optradio" type="radio" name="optradio" value={item} checked={checked} disabled /><span>{number})</span> {item}
                    </label>
                  })
                  :
                  this.props.data.options.map((item, index)=>{
                    if(item == '' && this.props.checked[this.props.data._id] == '') {
                      var checked = false
                    } else {
                      if(this.props.checked[this.props.data._id] == item) {
                        var checked = true
                      } else {
                        var checked = false
                      }
                    }
                    var number = index + 1
                    return <label className="radio-inline" key={index}>
                      <input id="optradio" type="radio" name="optradio" value={item} checked={checked} onChange={this.props.answer} /><span>{number})</span> {item}
                    </label>
                  })                  
                }
              </div>
              {
                this.props.showResult != undefined
                ?
                  this.props.wrong || this.props.correct
                  ?
                  correctAns == true
                  ?
                    <div className={styles.answerStatus}>
                      <img src="/images/icons/green-check.png" />  
                    </div>
                  :
                    <div className={styles.answerStatus}>
                      <img src="/images/icons/red-cross.png" />  
                    </div>
                  : null
                :null
              }
              {
                swotWithoutAns == true
                ?
                  <div className={styles.answerStatus}>
                    <span>N/A</span>  
                  </div>
                : null
              }
            </form>
          </div>
        </div>
      </li>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    
  };
}

MultipleChoice.propTypes = {
  intl: PropTypes.object,
};

MultipleChoice.contextTypes= {
    intl: React.PropTypes.object.isRequired,
};


export default connect(mapStateToProps)(MultipleChoice);
