
import React, { Component } from 'react';

import Highcharts from 'highcharts';
import regression from 'regression';

class ActiveUsersMonthly extends Component {

  getSeriesData() {

    const series = [];
    for (let i=0; i<this.props.data[1].series[0].length; i++) {
      series.push(this.props.data[1].series[0][i].value);
    }

    return series;
  }

  componentDidMount() {

    this.drawGraph();
  }

  componentDidUpdate() {
    this.drawGraph();
  }

  drawGraph() {
    const series = this.getSeriesData();
    const {xValues} = this.props.data[1];

    // //const result = regression.linear([[0, 1], [32, 67], [12, 79]]);
    // let regressionData = [];
    //
    // for(let a=0; a<series.length; a++) {
    //   regressionData.push([xValues[a], series[a].value]);
    // }
    //
    // const result = regression.linear(regressionData);
    // let regressionSeries = [];
    //
    // for(let a=0; a<result.points.length; a++) {
    //   regressionSeries.push(result.points[a][1]);
    // }

    //
    // console.log('final output');
    // console.log(regressionSeries);

    setTimeout(()=>{

      Highcharts.chart(this.target, {
        chart: {
            type: 'line',
            backgroundColor: null,
        },
        legend: {
          enabled: false,
        },
        title: {
            text: null
        },
        credits: {
            enabled: false
        },
        colors: ['#e8430e', '#ffffff'],
        xAxis: {
            allowDecimals: false,
            labels: {
                formatter: function () {
                    const str = xValues[this.value - 1].substr(5).split('-');

                    return str[1] + '-' + str[0];
                },

                style: {"color": "#ffffff", "cursor": "default", "fontSize": "1vw"},
            },
            gridLineWidth: 0,
            lineWidth:4,
            lineColor: '#ffffff',

        },
        yAxis: {
            title: {
                text: null,
            },
            labels: {
                formatter: function () {
                    return this.value;
                },
                style: {"color": "#ffffff", "cursor": "default", "fontSize": "1vw"},
            },


          gridLineWidth: 0,
          lineWidth:4,
          lineColor: '#ffffff'

        },
        plotOptions: {
            line: {
                pointStart: 1,
                lineWidth: 4,
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 4,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series: [{
            name: `Data`,
            fillOpacity: 1,
            data: series,
            dataLabels: {
                  enabled: true,
                  style: {"color": "#ffffff", "cursor": "default", "fontSize": "1vw"},
                },
        },]
      });

    }, 5000);
  }

  render() {
    const obj = (
        <div style={{height: '100%'}}>
          <div style={{position: 'absolute', top: '2%', left: '15%'}}><span className="box-title"></span></div>

          <div style={{height: '100%'}} ref={(element) => {this.target = element;}}>

          </div>
        </div>


      );

    return (
      <div> {obj} </div>
    );
  }
}

export default ActiveUsersMonthly;
