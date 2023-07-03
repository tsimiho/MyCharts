import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const LineChartWithAnnotations = ({height}) => {
    const options = {
        chart: {
          type: 'line',
          height: height,
        },
        title: {
          text: 'Line Chart with Annotations',
        },
        xAxis: {
          categories: ['Apples', 'Bananas', 'Oranges'],
        },
        yAxis: {
          title: {
            text: 'Fruit Eaten',
          },
        },
        series: [
          {
            name: 'Jane',
            data: [1, 0, 4],
          },
          {
            name: 'John',
            data: [5, 7, 3],
          },
        ],
        exporting: {
          enabled: false,
        },
        annotations: [{
          labelOptions: {
            shape: 'connector',
            align: 'right',
            justify: false,
            crop: true,
            style: {
              fontSize: '0.8em',
              textOutline: '1px white',
            },
          },
          labels: [{
            point: {
              x: 0,
              y: 1,
              xAxis: 0,
              yAxis: 0,
            },
            text: 'Annotation 1',
          }, {
            point: {
              x: 2,
              y: 4,
              xAxis: 0,
              yAxis: 0,
            },
            text: 'Annotation 2',
          }],
        }],
      };
  
    return <HighchartsReact highcharts={Highcharts} options={options} />;
  };
  
  export default LineChartWithAnnotations;