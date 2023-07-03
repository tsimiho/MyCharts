import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsAccessibility from "highcharts/modules/accessibility";
import HighchartsDependencyWheel from "highcharts/modules/dependency-wheel";
import Sankey from "highcharts/modules/sankey";


const DependencyWheelChart = ({height}) => {
  HighchartsExporting(Highcharts);
  HighchartsAccessibility(Highcharts);
  Sankey(Highcharts);
  HighchartsDependencyWheel(Highcharts);

  const options = {
    chart: {
      type: "dependencywheel",
      height: height, // Set the desired height for the chart
    },
    title: {
        text:"Dependency wheel chart",
    },
    series: [
        {
            keys: ["from", "to", "weight"],
            linkWeight: 5,
            centeredLinks: true,
            dataLabels: {
                format: "{point.fromNode.name} → {point.toNode.name}: {point.weight}",
                nodeFormat: "{point.name}",
                color: "black",
            },
            data: [
                ["A", "B", 1],
                ["A", "C", 1],
                ["A", "D", 2],
                ["B", "C", 2],
                ["C", "D", 1],
                ["E", "D", 3],
                ["E", "F", 1],
            ],
        },
    ],
    credits: {
        enabled: false,
    },
    exporting: {
      enabled: false,
    },
};

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default DependencyWheelChart;