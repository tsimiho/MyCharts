import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsNetworkgraph from "highcharts/modules/networkgraph";

const NetworkGraph = ({ height, opts = null }) => {
    HighchartsNetworkgraph(Highcharts);

    const options = opts
        ? opts
        : {
              chart: {
                  type: "networkgraph",
                  height: height,
              },
              title: {
                  text: "Network Graph",
              },
              plotOptions: {
                  networkgraph: {
                      keys: ["from", "to"],
                      layoutAlgorithm: {
                          enableSimulation: true,
                          integration: "verlet",
                          linkLength: 80,
                      },
                      dataLabels: {
                          enabled: true, // Enable data labels
                          format: "{point.name}", // Display the name of each point
                      },
                  },
              },
              series: [
                  {
                      data: [
                          { from: "A", to: "B", name: "Link AB" },
                          { from: "B", to: "C", name: "Link BC" },
                          { from: "C", to: "D", name: "Link CD" },
                          { from: "D", to: "E", name: "Link DE" },
                          { from: "E", to: "F", name: "Link EF" },
                          { from: "F", to: "G", name: "Link FG" },
                          { from: "G", to: "A", name: "Link GA" },
                          { from: "D", to: "G", name: "Link DG" },
                      ],
                  },
              ],
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
