import React, {PropTypes } from 'react';
import Highcharts from 'highcharts';
// require('highcharts/modules/exporting')(Highcharts);
// require('highcharts/modules/no-data-to-display')(Highcharts);
// require('highcharts/highcharts-3d')(Highcharts);  

class Chart extends React.Component {
  componentDidMount() {
    this.chart = new Highcharts[this.props.type || "Chart"](
      this.refs.chart,
      this.props.options
    );
  }
  
  componentWillReceiveProps(nextProps) {
    this.chart.destroy();
    this.chart = new Highcharts[nextProps.type || "Chart"](
      this.refs.chart,
      nextProps.options
    );
  }
  
  componentWillUnmount() {
    this.chart.destroy();
  }

  render() {
    return (
      <div ref="chart"></div>
    )
  }
}

export default Chart;