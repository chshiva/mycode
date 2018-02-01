import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';
import {Col, Row, Grid} from 'react-bootstrap';
import styles from '../../Dashboard.css';
import RenderQuestions from '../../../Admin/Questionnaire/components/RenderQuestions';


class Subjective extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li key={this.props.data._id}>
        <div className={styles.questionBlock}>
          <div className={styles.questionHeading}>
            <div className={styles.questionIconCircle}>
              <FontAwesome name="question" />
            </div>
            <RenderQuestions question={this.props.data.question} />
          </div>
          <div className={styles.chooseAnswerBlock}>
            <p>Type your answer</p>
            <form className="form-inline">
              <textarea id="answer" className="form-control" rows="5" id="" onChange={this.props.answer}></textarea>
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

Subjective.propTypes = {
  intl: PropTypes.object,
};

Subjective.contextTypes= {
    intl: React.PropTypes.object.isRequired,
};


export default connect(mapStateToProps)(Subjective);
