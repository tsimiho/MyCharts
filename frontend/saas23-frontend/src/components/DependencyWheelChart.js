import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsAccessibility from "highcharts/modules/accessibility";
import HighchartsDependencyWheel from "highcharts/modules/dependency-wheel";
import Sankey from "highcharts/modules/sankey";

const DependencyWheelChart = ({ height, opts = null }) => {
    HighchartsExporting(Highcharts);
    HighchartsAccessibility(Highcharts);
    Sankey(Highcharts);
    HighchartsDependencyWheel(Highcharts);

    const options = opts
        ? opts
        : {
              chart: {
                  type: "dependencywheel",
              },
              title: {
                  text: "Dependency wheel chart",
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

    const test = {
        chart: {
            type: "dependencywheel",
        },
        title: {
            text: "Dependency wheel title",
        },
        subtitle: {
            text: "Your Chart Subtitle",
        },
        accessibility: {
            point: {
                valueDescriptionFormat:
                    "{index}. From {point.from} to {point.to}: {point.weight}.",
            },
        },
        _id: "64a5af24a665f69d422634a8",
        series: [
            {
                dataLabels: {
                    color: "black",
                    format: "{point.fromNode.name} ? {point.toNode.name}: {point.weight}",
                    nodeFormat: "{point.name}",
                },
                keys: ["from", "to", "weight"],
                data: [
                    ["A", "B", "1"],
                    ["A", "C", "1"],
                    ["A", "D", "2"],
                    ["B", "C", "2"],
                    ["C", "D", "1"],
                    ["E", "D", "3"],
                    ["E", "F", "1"],
                ],
                linkWeight: 5,
                centeredLinks: true,
                _id: "64a5af24a665f69d422634a9",
            },
        ],
        __v: 0,
    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default DependencyWheelChart;
