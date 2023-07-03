import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const BarChart = () => {
  const options = {
    chart: {
      type: 'bar',
      height: 250,
    },
    title: {
      text: 'My Chart',
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
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default BarChart;