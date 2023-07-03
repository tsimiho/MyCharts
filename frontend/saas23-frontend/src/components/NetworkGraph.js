import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsNetworkgraph from 'highcharts/modules/networkgraph';

const NetworkGraph = () => {
  HighchartsNetworkgraph(Highcharts);
  const options = {
    chart: {
      type: 'networkgraph',
      height: 300,
    },
    title: {
      text: 'Network Graph',
    },
    plotOptions: {
        networkgraph: {
          keys: ['from', 'to'],
          layoutAlgorithm: {
            enableSimulation: true,
            integration: 'verlet',
            linkLength: 80,
          },
        },
      },
      series: [{
        data: [
          { from: 'A', to: 'B' },
          { from: 'B', to: 'C' },
          { from: 'C', to: 'D' },
          { from: 'D', to: 'E' },
          { from: 'E', to: 'F' },
          { from: 'F', to: 'G' },
          { from: 'G', to: 'A' },
          { from: 'D', to: 'G' },
        ],
      }],
      tooltip: {
        formatter: function () {
          return `From: ${this.point.from}<br>To: ${this.point.to}`;
        },
      },
      credits: {
        enabled: false,
      },
      exporting: {
        enabled: false,
      },
    };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default NetworkGraph;