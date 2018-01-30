import React, {Component} from 'react';
import Highcharts from 'highcharts';

// Import Style
import styles from '../../../../components/component.css';
import adminStyles from '../../Admin.css';

class Chart extends Component {
    componentDidMount() {
        this.chart = new Highcharts[this.props.type || "Chart"](
            this.refs.chart,
            this.props.options
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

class ReportsPage extends Component {
    render() {
      let cls_container = `${styles.iContainer} ${styles.oContainer} pull-right`;

        const options = {
          chart: {
            type: 'column'
          },  

          title: {
            text: 'Questionnaire',
            style: {
            "color": "#96281B",
            "fontSize": "26px"
            }
          },

          xAxis: {
            type: 'category',
            // categories: mySeries
          },

          yAxis: {
            min: 0,
            max: 100,
            title: {
              text: 'Total percent marks'
            }
          },

          credits: {
            enabled: false
          },

          tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.1f}% aggregate</b><br/>'
          },

          plotOptions: {
            series: {
              borderWidth: 0,
              dataLabels: {
                enabled: true,
                format: '{point.y:.1f}%'
              },
              animation: {
                duration: 1000
              }
            }
          },
   
          series: [{
            name: "Marks",
            colorByPoint: true,
            data: [{
              name : 'lala',
              y : 30
            },{
              name : 'jkdsfks',
              y : 60
            },{
              name : 'ladjkfnkla',
              y : 90
            }]
          }],
        };

        return (
            <div className={cls_container}>
              <div className={adminStyles.midContainer}>
                <div className={adminStyles.whiteCard}>
                  <Chart container={'chart'} options={options} />
                </div>
              </div>
            </div>
        );
    }
}

export default ReportsPage;