import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const PolarChart = () => {
  const options = {
    chart: {
      polar: true,
      type: 'line',
      height: 250,
    },
    title: {
      text: 'Polar Chart',
    },
    xAxis: {
      categories: ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'],
    },
    yAxis: {
      gridLineInterpolation: 'polygon',
    },
    series: [{
      name: 'Series 1',
      data: [5, 10, 6, 7, 8],
    }],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default PolarChart;