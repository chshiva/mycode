import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import css from './medicalform.css';
import ExpansionPanel, { ExpansionPanelDetails, ExpansionPanelSummary, ExpansionPanelActions, } from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import { FormLabel, FormControl, FormGroup, FormControlLabel, FormHelperText, } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import Button from 'material-ui/Button';
import utils from '../../commons/utils';
import lodash from 'lodash';
import { setStepError } from './actions';

const styles = theme => ({

});

class Step7 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stepIndex: 6,
      expanded: 'panel1',
      reqallergies: [],
      foodAllergies: [],
      environmentalAllergies: [],
      drugAllergies: []
    };

    // this.handleCheck = this.handleCheck.bind(this);
    this.updateCheckedItems = this.updateCheckedItems.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePreviousStep = this.handlePreviousStep.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(setStepError(null));
    utils.httpRequest('allergies', 'get', {}, (response) => {
      if (response.status) {
        var allergies = response.result && response.result.allergies;
        var props = lodash.clone(this.props.allergies);
        this.setState({ reqallergies: lodash.clone(this.props.allergies || []) });
        this.updateCheckedItems(allergies, props);
        var foodAllergies = allergies.filter(function (obj) {
          return obj.type == 'FOOD';
        });

        var drugAllergies = allergies.filter(function (obj) {
          return obj.type == 'DRUG';
        });

        var environmentalAllergies = allergies.filter(function (obj) {
          return obj.type == 'ENVIRONMENTAL';
        });
        this.setState({ foodAllergies: foodAllergies, drugAllergies: drugAllergies, environmentalAllergies: environmentalAllergies });
      } else {
        console.log("step 7 get allergies error:", response);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    var props = lodash.clone(nextProps.allergies);
    this.setState({ reqallergies: lodash.clone(nextProps.allergies || []) });
  }

  updateCheckedItems(parent, child) {
    parent.map((obj) => {
      obj.isChecked = false;
      return obj;
    });

    if (child != null) {
      lodash.each(child, (item) => {
        var index = lodash.findIndex(parent, { code: item });
        if (index >= 0) {
          parent[index].isChecked = true;
        }
      });
    }
  }


  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  handleCheck(name, itemIndex, type, event) {
    var allergies = [];
    if (event.target.checked) {
      allergies = this.state.reqallergies;
      allergies.push(name);
    } else {
      allergies = this.state.reqallergies;
      var index = allergies.indexOf(name);
      if (index > -1) {
        allergies.splice(index, 1);
      }
    }
    if (type == 'FOOD') {
      var foodAllergies = this.state.foodAllergies;
      foodAllergies[itemIndex].isChecked = event.target.checked;
      this.setState({ foodAllergies: foodAllergies });
    }
    if (type == 'DRUG') {
      var drugAllergies = this.state.drugAllergies;
      drugAllergies[itemIndex].isChecked = event.target.checked;
      this.setState({ drugAllergies: drugAllergies });
    }
    if (type == 'ENVIRONMENTAL') {
      var environmentalAllergies = this.state.environmentalAllergies;
      environmentalAllergies[itemIndex].isChecked = event.target.checked;
      this.setState({ environmentalAllergies: environmentalAllergies });
    }
    var reqallergies = lodash.union(this.props.allergies, allergies);
    console.log("extend:", allergies);
    this.setState({ reqallergies: allergies });
  }

  handleSubmit(e) {
    console.log("handleSubmit 6 ", this.state);
    this.props.handleNext(this.state.reqallergies, 6);
  }

  handlePreviousStep(e) {
    e.preventDefault();
    console.log("handlePreviousStep ", this.state.stepIndex);
    this.props.handlePrevious(this.state, this.state.stepIndex);
  }

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;
    return (
      <div className="stepContent">
        <h2 className="h2">7. Allergy Types</h2>
        <div className="expansionsBlock">
          <ExpansionPanel className="expandedBox" defaultExpanded expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Grid container spacing={24}>
                <Grid item xs={6} md={4}>
                  <Typography className="stepTxt">Food Allergies</Typography>
                </Grid>
                <Grid item xs={6} md={6}>
                  <Typography className="secondaryHeading">Select allergetic foods items.</Typography>
                </Grid>
              </Grid>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className="detailsBox">
              <Grid container className={classes.demo} justify="flex-start" spacing={16}>
                {this.state.foodAllergies.map((value, i) => (
                  <Grid item key={i} xs={6} md={3}>
                    <FormControlLabel
                      control={<Checkbox checked={value.isChecked} onChange={this.handleCheck.bind(this, value.code, i, 'FOOD')} value={value.code} />}
                      label={value.title}
                    />
                  </Grid>
                ))}
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel className="expandedBox" defaultExpanded expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Grid container spacing={24}>
                <Grid item xs={6} md={4}>
                  <Typography className="heading">Drug Allergies</Typography>
                </Grid>
                <Grid item xs={6} md={6}>
                  <Typography className="secondaryHeading">Select allergetic foods items.</Typography>
                </Grid>
              </Grid>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className="detailsBox">
              <Grid container className={classes.demo} justify="flex-start" spacing={16}>
                {this.state.drugAllergies.map((value, j) => (
                  <Grid item key={j} xs={6} md={3}>
                    <FormControlLabel
                      control={<Checkbox checked={value.isChecked} onChange={this.handleCheck.bind(this, value.code, j, 'DRUG')} value={value.code} />}
                      label={value.title}
                    />
                  </Grid>
                ))}
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel className="expandedBox" defaultExpanded expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Grid container spacing={24}>
                <Grid item xs={6} md={4}>
                  <Typography className="heading">Environmental Allergies</Typography>
                </Grid>
                <Grid item xs={6} md={6}>
                  <Typography className="secondaryHeading">Select allergetic foods items.</Typography>
                </Grid>
              </Grid>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className="detailsBox">
              <Grid container className={classes.demo} justify="flex-start" spacing={16}>
                {this.state.environmentalAllergies.map((value, k) => (
                  <Grid item key={k} xs={6} md={3}>
                    <FormControlLabel
                      control={<Checkbox checked={value.isChecked} onChange={this.handleCheck.bind(this, value.code, k, 'ENVIRONMENTAL')} value={value.code} />}
                      label={value.title}
                    />
                  </Grid>
                ))}
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
        <ul className="listInline">
          <li>
            <Button id="prev-step" raised color="default" type="submit" onClick={this.handlePreviousStep}>Back</Button>
          </li>
          <li>
            <Button id="next-step" raised color="primary" type="submit" onClick={this.handleSubmit}>Submit</Button>
          </li>
        </ul>
      </div>
    );
  }
};

Step7.propTypes = {
  classes: PropTypes.object.isRequired,
};

/** Map the state to props. */
const mapStateToProps = function (state) {
  return {
    user: state.user,
  }
};

export default connect(mapStateToProps)(withStyles(styles)(Step7));